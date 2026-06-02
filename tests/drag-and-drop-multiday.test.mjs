import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { useDateUtils } from '../src/vue-cal/utils/date.js'
import EnUs from '../src/vue-cal/i18n/en-us.json' with { type: 'json' }

// Mirror of shiftEventRangeByDelta exported from drag-and-drop.js (pure, no DOM).
const shiftEventRangeByDelta = (start, end, deltaMs) => ({
  start: new Date(start.getTime() + deltaMs),
  end: new Date(end.getTime() + deltaMs)
})

describe('drag-and-drop multiday', () => {
  const dateUtils = useDateUtils(EnUs, EnUs)

  it('shift preserves the span duration', () => {
    const start = new Date('2026-06-09T10:00:00')
    const end = new Date('2026-06-13T12:37:00')
    const durationMs = end - start
    const delta = 2 * 24 * 60 * 60 * 1000 // +2 days

    const result = shiftEventRangeByDelta(start, end, delta)
    assert.equal(result.end - result.start, durationMs)
    assert.equal(result.start.getTime(), start.getTime() + delta)
    assert.equal(result.end.getTime(), end.getTime() + delta)
    assert.ok(dateUtils.spansMultipleDays(result.start, result.end))
  })

  it('zero delta leaves dates unchanged', () => {
    const start = new Date('2026-06-09T10:00:00')
    const end = new Date('2026-06-11T18:00:00')

    const result = shiftEventRangeByDelta(start, end, 0)
    assert.equal(result.start.getTime(), start.getTime())
    assert.equal(result.end.getTime(), end.getTime())
  })

  it('negative delta shifts backwards while preserving span', () => {
    const start = new Date('2026-06-09T10:00:00')
    const end = new Date('2026-06-13T12:37:00')
    const durationMs = end - start
    const delta = -(3 * 24 * 60 * 60 * 1000) // -3 days

    const result = shiftEventRangeByDelta(start, end, delta)
    assert.equal(result.end - result.start, durationMs)
    assert.equal(result.start.getTime(), start.getTime() + delta)
  })
})
