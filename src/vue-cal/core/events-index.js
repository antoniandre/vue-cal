export function createEventsIndex() {
  return {
    byId: {},
    byDate: {},
    byYear: {},
    multiday: [],
    recurring: []
  }
}

function removeIdFromArray(arr, id) {
  const i = arr.indexOf(id)
  if (i !== -1) arr.splice(i, 1)
}

function removeEventFromDateBuckets(index, event) {
  const id = event._.id
  const startKey = event._.startFormatted
  if (!startKey) return
  if (index.byDate[startKey]) removeIdFromArray(index.byDate[startKey], id)

  const year = startKey.substring(0, 4)
  const month = startKey.substring(5, 7)
  const day = startKey.substring(8, 10)
  const yearMap = index.byYear[year]
  if (yearMap?.[month]?.[day]) removeIdFromArray(yearMap[month][day], id)
}

export function removeEventFromIndex(index, event) {
  if (!event?._?.id) return
  const id = event._.id
  removeEventFromDateBuckets(index, event)
  removeIdFromArray(index.multiday, id)
  removeIdFromArray(index.recurring, id)
  delete index.byId[id]
}

function addEventToDateBuckets(index, event) {
  const id = event._.id
  const startKey = event._.startFormatted
  if (!index.byDate[startKey]) index.byDate[startKey] = []
  if (!index.byDate[startKey].includes(id)) index.byDate[startKey].push(id)

  const year = startKey.substring(0, 4)
  const month = startKey.substring(5, 7)
  const day = startKey.substring(8, 10)
  if (!index.byYear[year]) index.byYear[year] = {}
  if (!index.byYear[year][month]) index.byYear[year][month] = {}
  if (!index.byYear[year][month][day]) index.byYear[year][month][day] = []
  if (!index.byYear[year][month][day].includes(id)) index.byYear[year][month][day].push(id)
}

function indexOneEvent(index, event, ctx) {
  index.byId[event._.id] = event

  if (event.recurring) {
    if (!index.recurring.includes(event._.id)) index.recurring.push(event._.id)
    return
  }

  const { config, dateUtils } = ctx
  if (dateUtils.spansMultipleDays(event.start, event.end)) {
    event._.multiday = config.multidayEvents
    if (!config.multidayEvents) {
      if (!ctx.multidayWarned.value) {
        console.info('Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight.')
        ctx.multidayWarned.value = true
      }
      event.end = dateUtils.endOfZonedDay(event.start)
    }
    else if (!index.multiday.includes(event._.id)) index.multiday.push(event._.id)

    addEventToDateBuckets(index, event)
    return
  }

  addEventToDateBuckets(index, event)
}

/**
 * Full rebuild of the events index from config.events.
 */
export function rebuildEventsIndex(index, eventsArray, ctx) {
  index.byId = {}
  index.byDate = {}
  index.byYear = {}
  index.multiday = []
  index.recurring = []
  ctx.multidayWarned = { value: false }

  const sorted = eventsArray.slice().sort((a, b) => (a.start < b.start ? -1 : 1))
  for (let i = 0; i < sorted.length; i++) {
    const event = sorted[i]
    if (!ctx.processEventForIndex(event)) continue
    indexOneEvent(index, event, ctx)
  }
}

/**
 * Add or update one event in the index (call after metadata is current).
 * @param {string|null} oldStartFormatted - previous start date key when the event moved
 */
export function addOrUpdateEventInIndex(index, event, ctx, oldStartFormatted = null) {
  const id = event._.id
  const wasInIndex = !!index.byId[id]
  const startChanged = oldStartFormatted && oldStartFormatted !== event._.startFormatted

  if (wasInIndex && startChanged) {
    removeEventFromDateBuckets(index, { _: { id, startFormatted: oldStartFormatted } })
    removeIdFromArray(index.multiday, id)
    removeIdFromArray(index.recurring, id)
    delete index.byId[id]
  }
  else if (wasInIndex && !startChanged) return

  if (!ctx.processEventForIndex(event)) {
    if (wasInIndex) removeEventFromIndex(index, event)
    return
  }

  indexOneEvent(index, event, ctx)
}
