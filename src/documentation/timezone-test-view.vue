<template lang="pug">
.test-view--timezone(
  :data-cell-span-ms="cellSpanMs"
  :data-exclusive-multiday="String(exclusiveMultiday)"
  :data-count-days-dst="countDaysDst"
  data-testid="timezone-test-root")
  vue-cal(
    ref="vueCalRef"
    timezone="America/New_York"
    view="day"
    view-date="2026-06-09"
    :events="events"
    :views="{ day: {} }"
    :views-bar="false"
    @ready="onReady"
    @view-change="onViewChange")
</template>

<script setup>
import { ref } from 'vue'
import { VueCal, countDays, spansMultipleDays, stringToDate, setTimeZone } from '@/vue-cal'

const vueCalRef = ref(null)
const cellSpanMs = ref(0)

setTimeZone('America/New_York')
const exclusiveMultiday = spansMultipleDays(stringToDate('2026-06-10'), stringToDate('2026-06-11'))
const countDaysDst = countDays('2026-06-08', '2026-06-10')

const events = [
  {
    title: 'Late',
    start: '2026-06-09 23:30',
    end: '2026-06-09 23:45',
    class: 'tz-test-event'
  },
  {
    title: 'All day',
    start: '2026-06-10',
    end: '2026-06-10',
    allDay: true,
    class: 'tz-test-allday'
  },
  {
    title: 'Exclusive end',
    start: '2026-06-10',
    end: '2026-06-11',
    allDay: true,
    class: 'tz-test-exclusive-allday'
  }
]

const applyCellSpan = cellDates => {
  if (!cellDates?.length) return
  const cell = cellDates[0]
  cellSpanMs.value = cell.end.getTime() - cell.start.getTime()
  window.__TZ_TEST__ = {
    cellSpanMs: cellSpanMs.value,
    cellStart: cell.start.getTime(),
    cellEnd: cell.end.getTime(),
    exclusiveMultiday,
    countDaysDst
  }
}

const onReady = ({ view }) => applyCellSpan(view.cellDates)

const onViewChange = ({ cellDates }) => applyCellSpan(cellDates)
</script>

<style lang="scss">
.test-view--timezone { padding: 1rem; }
.test-view--timezone .vuecal { height: 400px; }
.tz-test-event { background: #06c !important; }
.tz-test-allday { background: #393 !important; }
</style>
