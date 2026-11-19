/**
 * Given a list of outer-flagged ranges (the "open" regions), compute the complement segments
 * — i.e. the gaps before, between, and after those ranges within [timeFrom, timeTo].
 *
 * @param {Array<{ from: number, to: number }>} outerRanges - Open ranges in day-minutes (raw, may extend outside visible time).
 * @param {number} timeFrom - Visible timeline start in day-minutes.
 * @param {number} timeTo - Visible timeline end in day-minutes.
 * @returns {Array<{ from: number, to: number }>} Complement segments clamped to [timeFrom, timeTo].
 */
export const computeOuterSegments = (outerRanges, timeFrom, timeTo) => {
  if (!outerRanges.length) return []

  // Single pass: collect only ranges that overlap the visible window, then sort in place.
  // If none overlap, the entire visible window is treated as "outside" open hours.
  const visible = []
  for (let i = 0; i < outerRanges.length; i++) {
    const r = outerRanges[i]
    if (r.from < timeTo && r.to > timeFrom) visible.push(r)
  }
  visible.sort((a, b) => a.from - b.from)

  const segments = []
  let cursor = timeFrom

  for (let i = 0; i < visible.length; i++) {
    const r = visible[i]
    const gapEnd = r.from < timeTo ? r.from : timeTo
    if (cursor < gapEnd) segments.push({ from: cursor, to: gapEnd })
    const rEnd = r.to < timeTo ? r.to : timeTo
    if (rEnd > cursor) cursor = rEnd
  }

  if (cursor < timeTo) segments.push({ from: cursor, to: timeTo })

  return segments
}
