import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { useEventsIndex } from '../src/vue-cal/core/events-index.js'
import { useDateUtils } from '../src/vue-cal/utils/date.js'
import EnUs from '../src/vue-cal/i18n/en-us.json' with { type: 'json' }

describe('events-index multiday', () => {
  const dateUtils = useDateUtils(EnUs, EnUs)
  dateUtils.setTimeZone('America/New_York')

  const prepareEvent = event => {
    if (!event._) event._ = {}
    event._.id = event._.id || 1
    event._.startFormatted = dateUtils.formatDateLite(event.start)
    event._.multiday = dateUtils.spansMultipleDays(event.start, event.end)
    return true
  }

  const eventsIndexApi = useEventsIndex({ config: { multidayEvents: true }, dateUtils }, prepareEvent)

  it('indexes each civil day of a multiday event in zoned timezone', () => {
    const start = dateUtils.stringToDate('2026-06-10')
    const end = dateUtils.stringToDate('2026-06-12')
    eventsIndexApi.rebuild([{ start, end, title: 'Span' }])

    const index = eventsIndexApi.index.value
    assert.equal(index.byDate['2026-06-10']?.length, 1)
    assert.equal(index.byDate['2026-06-11']?.length, 1)
    assert.equal(index.byDate['2026-06-12'], undefined)
  })
})
