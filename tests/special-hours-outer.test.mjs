import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { computeOuterSegments } from '../src/vue-cal/utils/special-hours-outer.js'

const timeFrom = 0
const timeTo = 24 * 60 // 1440

describe('computeOuterSegments', () => {
  it('returns empty array when no outer ranges given', () => {
    assert.deepEqual(computeOuterSegments([], timeFrom, timeTo), [])
  })

  it('single range in the middle → 2 complement segments (before + after)', () => {
    const result = computeOuterSegments([{ from: 480, to: 1080 }], timeFrom, timeTo)
    assert.deepEqual(result, [
      { from: 0, to: 480 },
      { from: 1080, to: 1440 }
    ])
  })

  it('two ranges → 3 complement segments', () => {
    const result = computeOuterSegments(
      [{ from: 480, to: 720 }, { from: 840, to: 1080 }],
      timeFrom,
      timeTo
    )
    assert.deepEqual(result, [
      { from: 0, to: 480 },
      { from: 720, to: 840 },
      { from: 1080, to: 1440 }
    ])
  })

  it('range starting at timeFrom → no leading segment', () => {
    const result = computeOuterSegments([{ from: 0, to: 720 }], timeFrom, timeTo)
    assert.deepEqual(result, [{ from: 720, to: 1440 }])
  })

  it('range ending at timeTo → no trailing segment', () => {
    const result = computeOuterSegments([{ from: 480, to: 1440 }], timeFrom, timeTo)
    assert.deepEqual(result, [{ from: 0, to: 480 }])
  })

  it('range covering full timeline → no segments', () => {
    const result = computeOuterSegments([{ from: 0, to: 1440 }], timeFrom, timeTo)
    assert.deepEqual(result, [])
  })

  it('range fully before timeFrom (outside visible window) → full range painted', () => {
    const result = computeOuterSegments([{ from: -120, to: -60 }], timeFrom, timeTo)
    assert.deepEqual(result, [{ from: 0, to: 1440 }])
  })

  it('range fully after timeTo (outside visible window) → full range painted', () => {
    const result = computeOuterSegments([{ from: 1500, to: 1560 }], timeFrom, timeTo)
    assert.deepEqual(result, [{ from: 0, to: 1440 }])
  })

  it('range extending before timeFrom is clamped → leading segment omitted', () => {
    // Open range starts before visible time — no gap before it
    const result = computeOuterSegments([{ from: -60, to: 720 }], timeFrom, timeTo)
    assert.deepEqual(result, [{ from: 720, to: 1440 }])
  })

  it('range extending past timeTo is clamped → trailing segment omitted', () => {
    const result = computeOuterSegments([{ from: 480, to: 1500 }], timeFrom, timeTo)
    assert.deepEqual(result, [{ from: 0, to: 480 }])
  })

  it('visible window smaller than 24h (custom timeFrom/timeTo)', () => {
    // Visible: 8am (480) to 6pm (1080). Open: 10am-14pm (600-840).
    const result = computeOuterSegments([{ from: 600, to: 840 }], 480, 1080)
    assert.deepEqual(result, [
      { from: 480, to: 600 },
      { from: 840, to: 1080 }
    ])
  })

  it('unsorted input is handled correctly', () => {
    const result = computeOuterSegments(
      [{ from: 840, to: 1080 }, { from: 480, to: 720 }],
      timeFrom,
      timeTo
    )
    assert.deepEqual(result, [
      { from: 0, to: 480 },
      { from: 720, to: 840 },
      { from: 1080, to: 1440 }
    ])
  })
})
