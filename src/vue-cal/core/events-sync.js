const MERGE_KEYS = [
  'start', 'end', 'title', 'content', 'class', 'background', 'schedule',
  'allDay', 'id', 'draggable', 'resizable', 'deletable', 'recurring', 'status'
]

const DATE_KEYS = new Set(['start', 'end'])

function fieldValue(event, key) {
  const v = event[key]
  if (key === 'id') return v === undefined || v === null ? v : String(v)
  if (key === 'start' || key === 'end') {
    if (v instanceof Date) return v.getTime()
    if (typeof v === 'string') return v
    return v
  }
  return v
}

/** True when incoming would change visible event data on target. */
export function incomingEventChanged(target, incoming, { isDatesChanged } = {}) {
  for (let i = 0; i < MERGE_KEYS.length; i++) {
    const key = MERGE_KEYS[i]
    if (DATE_KEYS.has(key)) continue
    if (!(key in incoming) && !(key in target)) continue
    const a = fieldValue(target, key)
    const b = fieldValue(incoming, key)
    if (a !== b) return true
  }
  if (isDatesChanged?.(target, incoming)) return true
  if (!isDatesChanged) {
    for (const key of DATE_KEYS) {
      if (!(key in incoming) && !(key in target)) continue
      const a = fieldValue(target, key)
      const b = fieldValue(incoming, key)
      if (a !== b) return true
    }
  }
  return false
}

function listsSameRefs(a, b) {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false
  return true
}

/** Public id for merge; null if missing/invalid. */
export function getPublicEventId(event) {
  const id = event?.id
  if (id === undefined || id === null || id === '') return null
  return String(id)
}

/** Strip keys that must not be patched from host partials. */
export function sanitizeEventPartial(partial, { warn } = {}) {
  if (!partial || typeof partial !== 'object') return {}
  const clean = {}
  let stripped = false
  for (const key of Object.keys(partial)) {
    if (key === '_' || key.startsWith('_')) {
      stripped = true
      continue
    }
    clean[key] = partial[key]
  }
  if (stripped && warn) warn('Vue Cal: event.patch / updateEvent ignores internal "_" fields.')
  return clean
}

/**
 * @param {Array} target - config.events (mutated in place)
 * @param {Array|null|undefined} incoming - props.events
 * @param {object} opts
 * @param {function} [opts.warn]
 * @param {function} [opts.isChanged] - (target, incoming) => boolean
 * @returns {{ mode: 'noop'|'merge'|'replace', changed: Array, removed: Array }}
 */
export function syncEventsFromProp(target, incoming, { warn = null, isChanged } = {}) {
  const list = incoming || []
  const empty = { mode: 'noop', changed: [], removed: [] }
  const hasChanged = (target, inc) => {
    if (isChanged) return isChanged(target, inc)
    return incomingEventChanged(target, inc)
  }

  if (list === target) return empty

  if (target.length === 0) {
    target.splice(0, target.length, ...list)
    return { mode: 'replace', changed: list.slice(), removed: [] }
  }

  const existingByPublicId = new Map()
  const noIdOrphans = []
  for (let i = 0; i < target.length; i++) {
    const ev = target[i]
    const pid = getPublicEventId(ev)
    if (pid !== null) {
      if (existingByPublicId.has(pid) && warn)
        warn(`Vue Cal: duplicate public id "${pid}" in calendar; merge uses first match.`)
      else if (!existingByPublicId.has(pid)) existingByPublicId.set(pid, ev)
    }
    else noIdOrphans.push(ev)
  }

  const seenPublicIds = new Set()
  const ordered = []
  const changed = []
  let incomingHadNoIds = true

  for (const inc of list) {
    const pid = getPublicEventId(inc)
    if (pid !== null) {
      incomingHadNoIds = false
      if (seenPublicIds.has(pid) && warn)
        warn(`Vue Cal: duplicate public id "${pid}" in events prop; last wins.`)
      seenPublicIds.add(pid)

      const existing = existingByPublicId.get(pid)
      if (existing) {
        if (hasChanged(existing, inc)) {
          Object.assign(existing, inc)
          changed.push(existing)
        }
        ordered.push(existing)
      }
      else {
        ordered.push(inc)
        changed.push(inc)
      }
    }
    else {
      if (warn) warn('Vue Cal: event without "id" cannot merge; treating as new. Always set id for server-driven events.')
      ordered.push(inc)
      changed.push(inc)
    }
  }

  const orderedSet = new Set(ordered)
  const stillOrphans = []
  for (let i = 0; i < noIdOrphans.length; i++) {
    if (!orderedSet.has(noIdOrphans[i])) stillOrphans.push(noIdOrphans[i])
  }

  const removed = []
  if (!incomingHadNoIds) {
    for (const [pid, existing] of existingByPublicId) {
      if (!seenPublicIds.has(pid)) removed.push(existing)
    }
  }

  const finalList = [...ordered, ...stillOrphans]
  if (!changed.length && !removed.length && listsSameRefs(target, finalList)) return empty

  target.splice(0, target.length, ...finalList)

  return { mode: 'merge', changed, removed }
}
