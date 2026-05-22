import { weekdays } from '../core/config'

const dayStartMs = (date, dateUtils) => dateUtils.startOfZonedDay(date).getTime()

const nextCalendarDay = (date, dateUtils) => dateUtils.addDays(date, 1)

const weekdayKey = (date, dateUtils) => {
  const i = dateUtils.getZonedWeekdaySunFirst(date)
  return weekdays[i]
}

/**
 * @param {Date} start
 * @param {Date} end
 * @param {number|string|undefined|null} schedule
 * @param {{ hasAny: boolean, byWeekday: Record<string, { default?: { from: number, to: number }[], schedules?: Record<string, { from: number, to: number }[]> }> }} disallowed
 * @param {boolean} hasSchedules
 * @param {object} dateUtils Vue Cal date utils instance
 * @returns {boolean} true if [start, end) overlaps any disallowed segment
 */
export const eventRangeViolatesAllowEvents = ({ start, end, schedule, disallowed, hasSchedules, dateUtils }) => {
  if (!disallowed?.hasAny || !start || !end) return false

  const byWeekday = disallowed.byWeekday
  const startMs = start.getTime()
  const endMs = end.getTime()
  if (endMs <= startMs) return false

  let d = dateUtils.startOfZonedDay(start)
  const endDayMs = dayStartMs(end, dateUtils)

  while (d.getTime() <= endDayMs) {
    const weekday = weekdayKey(d, dateUtils)
    const dayBlock = byWeekday[weekday]
    if (dayBlock) {
      let ranges = dayBlock.default
      if (hasSchedules && schedule !== undefined && schedule !== null && dayBlock.schedules) {
        const sk = String(schedule)
        if (Object.prototype.hasOwnProperty.call(dayBlock.schedules, sk)) ranges = dayBlock.schedules[sk]
      }
      if (!ranges || !ranges.length) {
        d = nextCalendarDay(d, dateUtils)
        continue
      }
      const day0 = d.getTime()
      for (let i = 0; i < ranges.length; i++) {
        const { from, to } = ranges[i]
        const absB0 = day0 + from * 60000
        const absB1 = day0 + to * 60000
        if (startMs < absB1 && endMs > absB0) return true
      }
    }
    d = nextCalendarDay(d, dateUtils)
  }
  return false
}

const MIN_STEP_MS = 60000

/**
 * Largest end in (start, endCandidate] such that [start, end) is allowed; falls back toward start if needed.
 */
export const maxValidEndForFixedStart = (start, endCandidate, schedule, disallowed, hasSchedules, dateUtils) => {
  if (!disallowed?.hasAny) return endCandidate
  const sMs = start.getTime()
  const eMs = endCandidate.getTime()
  if (eMs <= sMs) return endCandidate
  if (!eventRangeViolatesAllowEvents({ start, end: endCandidate, schedule, disallowed, hasSchedules, dateUtils }))
    return endCandidate
  let lo = sMs + MIN_STEP_MS
  let hi = eMs
  let best = sMs
  while (lo <= hi) {
    const mid = Math.floor((lo + hi + 1) / 2)
    if (!eventRangeViolatesAllowEvents({ start, end: new Date(mid), schedule, disallowed, hasSchedules, dateUtils })) {
      best = mid
      lo = mid + 1
    }
    else hi = mid - 1
  }
  return new Date(best)
}

/**
 * Smallest start in [startCandidate, end) such that [start, end) is allowed; returns startCandidate if none found in range.
 */
export const minValidStartForFixedEnd = (end, startCandidate, schedule, disallowed, hasSchedules, dateUtils) => {
  if (!disallowed?.hasAny) return startCandidate
  const eMs = end.getTime()
  const sMs = startCandidate.getTime()
  if (eMs <= sMs) return startCandidate
  if (!eventRangeViolatesAllowEvents({ start: startCandidate, end, schedule, disallowed, hasSchedules, dateUtils }))
    return startCandidate
  let lo = sMs
  let hi = eMs - MIN_STEP_MS
  let ans = sMs
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    if (!eventRangeViolatesAllowEvents({ start: new Date(mid), end, schedule, disallowed, hasSchedules, dateUtils })) {
      ans = mid
      hi = mid - 1
    }
    else lo = mid + 1
  }
  return new Date(ans)
}

/**
 * Clamps [snappedLow, snappedHigh] day minutes (same calendar day as cellDate) so the range does not overlap disallowed special hours.
 */
export const clampDragCreateDayMinutes = ({
  anchorDayMinutes,
  cursorDayMinutes,
  snappedLow,
  snappedHigh,
  cellDate,
  schedule,
  disallowed,
  hasSchedules,
  dateUtils
}) => {
  let low = snappedLow
  let high = snappedHigh
  if (!disallowed?.hasAny || high <= low) return { low, high }

  const day0 = dateUtils.startOfZonedDay(cellDate)
  const at = m => dateUtils.instantFromZonedMinutes(day0, m)

  const start = at(low)
  const end = at(high)
  if (!eventRangeViolatesAllowEvents({ start, end, schedule, disallowed, hasSchedules, dateUtils })) return { low, high }

  const dayMs = day0.getTime()
  const toDayMinutes = dt => Math.round((dt.getTime() - dayMs) / 60000)

  if (anchorDayMinutes <= cursorDayMinutes) {
    const maxEnd = maxValidEndForFixedStart(start, end, schedule, disallowed, hasSchedules, dateUtils)
    high = toDayMinutes(maxEnd)
  }
  else {
    const minStart = minValidStartForFixedEnd(end, start, schedule, disallowed, hasSchedules, dateUtils)
    low = toDayMinutes(minStart)
  }
  return { low, high }
}

/**
 * After an external resize proposal, clamp so the range stays within allowEvents:true segments.
 */
export const clampResizeProposedRange = ({
  proposedStart,
  proposedEnd,
  prevStart,
  prevEnd,
  schedule,
  disallowed,
  hasSchedules,
  dateUtils
}) => {
  if (!disallowed?.hasAny) return { start: proposedStart, end: proposedEnd }

  let s = proposedStart
  let e = proposedEnd
  if (e.getTime() <= s.getTime()) return { start: s, end: e }

  if (!eventRangeViolatesAllowEvents({ start: s, end: e, schedule, disallowed, hasSchedules, dateUtils })) return { start: s, end: e }

  const pS = prevStart.getTime()
  const pE = prevEnd.getTime()
  const nS = s.getTime()
  const nE = e.getTime()
  const endMoved = nE !== pE
  const startMoved = nS !== pS

  if (endMoved && !startMoved) {
    e = maxValidEndForFixedStart(s, e, schedule, disallowed, hasSchedules, dateUtils)
    return { start: s, end: e }
  }
  if (startMoved && !endMoved) {
    s = minValidStartForFixedEnd(e, s, schedule, disallowed, hasSchedules, dateUtils)
    return { start: s, end: e }
  }

  const e2 = maxValidEndForFixedStart(s, e, schedule, disallowed, hasSchedules, dateUtils)
  if (!eventRangeViolatesAllowEvents({ start: s, end: e2, schedule, disallowed, hasSchedules, dateUtils })) return { start: s, end: e2 }

  s = minValidStartForFixedEnd(e, s, schedule, disallowed, hasSchedules, dateUtils)
  return { start: s, end: e }
}
