<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div.test-view
  .w-flex.align-center.gap6.no-grow
    w-switch.mb4.no-grow(v-model="mainVuecalConfig.twelveHour") 12h format
    w-switch.mb4.no-grow(v-model="mainVuecalConfig.startWeekOnSunday") Start Week On Sunday
    w-switch.mb4.no-grow(v-model="mainVuecalConfig.hideWeekends") Hide Weekends
    w-select.mb4.no-grow(v-model="mainVuecalConfig.locale" :items="locales") Locale:
    w-switch.mb4.no-grow(v-model="mainVuecalConfig.clickToNavigate") click-to-navigate
    w-switch.mb4.no-grow(v-model="mainVuecalConfig.daySplits") Day Splits

    w-input(v-model="mainVuecalConfig.viewDayOffset" type="number") View Day Offset

    w-radios.mb4(
      v-model="mainVuecalConfig.view"
      :items="viewsArray"
      return-values
      inline)

    w-radios.mb4(
      v-model="size"
      :items="sizes"
      return-values
      inline)

    w-select.mb4(
      v-model="hideWeekdays"
      :items="weekdays"
      multiple)
  .w-flex
    w-button(@click="addEvent") Add event

  VueCal.no-shrink(
    date-picker
    v-model:selected-date="mainVuecalConfig.selectedDate"
    v-bind="mainVuecalConfig")

  VueCal.no-shrink(
    v-model:view="view"
    v-model:selected-date="mainVuecalConfig.selectedDate"
    v-model:view-date="mainVuecalConfig.viewDate"
    v-bind="mainVuecalConfig"
    @event-create.stop="(e, event) => log('event-create', { e, event })")
    //- @event-click.stop="(e, event) => log('event-click', { e, event })"
    //- @event-dblclick.stop="(e, event) => log('event-dblclick', { e, event })"
    //- @event-mouseover.stop="(e, event) => log('event-mouseover', { e, event })"
    //- @event-mouseout.stop="(e, event) => log('event-mouseout', { e, event })"
    //- @event-contextmenu.prevent="(e, event) => log('event-contextmenu', { e, event })"
    //- @cell-click="(e, cell) => log('cell-click', { e, cell })"
    //- @cell-mousedown="(e, cell) => log('cell-mousedown', { e, cell })"
    //- @cell-touchstart="(e, cell) => log('cell-touchstart', { e, cell })"
    //- @cell-mouseover="(e, cell) => log('cell-mouseover', { e, cell })"
    //- @cell-mouseout="(e, cell) => log('cell-mouseout', { e, cell })")

    //- template(#title="view") {{ view }}
    //- template(#cell="{ start, index }") ({{ start }}, {{ index }})
    //- template(#diy="{ vuecal, view }") {{ view }}<br><br>{{ vuecal }}
    //- template(#header="{ view, availableViews, vuecal }")
      w-button.ma1(
        v-for="(grid, viewName) in availableViews"
        type="button"
        @click="vuecal.switchView(viewName)"
        :outline="view !== viewName") {{ viewName }}

  p selected Date: {{ mainVuecalConfig.selectedDate }}
  p View Date: {{ mainVuecalConfig.viewDate }}
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import EnUs from '@/vue-cal/i18n/en-us.json'
import { VueCal, addDatePrototypes, useLocale } from '@/vue-cal'
import { useAppStore } from '@/store'

useLocale(EnUs)
addDatePrototypes()

const store = useAppStore()

const locales = [
  { value: 'ko', label: 'ko' },
  { value: 'en-gb', label: 'en-gb' },
  { value: 'en-us', label: 'en-us' },
  { value: 'ja', label: 'ja' },
  { value: 'zh-cn', label: 'zh-cn' },
  { value: 'ar', label: 'ar' },
  { value: 'fr', label: 'fr' },
  { value: 'ca', label: 'ca' }
]

const views = {
  day: { label: 'Day' },
  days: { label: 'Days', cols: 365, rows: 1 },
  week: { label: 'Week' },
  month: { label: 'Month' },
  year: { label: 'Year' },
  years: { label: 'Years' }
}
const viewsArray = Object.entries(views).map(([viewId, obj]) => ({ ...obj, value: viewId }))
const view = ref('week')

const size = ref(null)
const sizes = [
  { value: null, label: 'Normal' },
  { value: 'sm', label: 'small' },
  { value: 'xs', label: 'Extra small' }
]

const weekdays = [{ label: 'mon' }, { label: 'tue' }, { label: 'wed' }, { label: 'thu' }, { label: 'fri' }, { label: 'sat' }, { label: 'sun' }]
const hideWeekdays = ref([])

const mainVuecalConfig = reactive({
  views,
  dark: computed(() => store.darkMode),
  selectedDate: ref(null),
  viewDate: ref(new Date(2023, 11, 1)),
  locale: ref(''),
  startWeekOnSunday: ref(false),
  todayButton: ref(true),
  xs: computed(() => size.value === 'xs'),
  sm: computed(() => size.value === 'sm'),
  // timeFrom: 7 * 60,
  // timeTo: 20 * 60,
  timeStep: 60,
  twelveHour: ref(false),
  hideWeekends: ref(false),
  hideWeekdays,
  viewDayOffset: ref(0),
  clickToNavigate: ref(false),
  watchRealTime: ref(true),
  events: ref([]),
  daySplits: ref(false),
  splitDays: computed(() => {
    return mainVuecalConfig.daySplits ? [{ label: 'Dr 1', class: 'dr-1' }, { label: 'Dr 2', class: 'dr-2' }] : undefined
  }),
  eventsOnMonthView: true,
  specialHours: {
    mon: { from: 0 * 60, to: 23 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><em>Full day shift</em>' },
    tue: { from: 4 * 60, to: 5 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><em>Full day shift</em>' },
    wed: [
      { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><em>Morning shift</em>' },
      { from: 14 * 60, to: 19 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><em>Afternoon shift</em>' }
    ],
    thu: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><em>Full day shift</em>' },
    fri: { from: 9 * 60, to: 18 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><em>Full day shift</em>' },
    sat: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><em>Full day shift</em>' },
    sun: { from: 7 * 60, to: 20 * 60, class: 'closed', label: '<strong>Closed</strong>' }
  }
})

// Pretend a call to a backend.
setTimeout(() => {
  mainVuecalConfig.events = [
    { title: 'Event 1', start: '2024-09-20 10:00', end: '2024-09-20 10:30' },
    { title: 'Event 2', start: '2024-09-20 11:00', end: '2024-09-20 11:30' }
  ]
}, 1000)

const addEvent = () => {
  mainVuecalConfig.events.push({ title: 'Event 1', start: (new Date()).subtractHours(4), end: (new Date()).subtractHours(3) })
}

const log = (...args) => console.log(...args)

// events: [
//   {
//     start: new Date(new Date(now).setHours(1, 0, 0)),
//     end: new Date(new Date(now).setHours(4, 0, 0)),
//     allDay: true,
//     title: 'Event 1',
//     split: 2
//   },
//   {
//     start: new Date(new Date(now).setHours(1, 0, 0)),
//     end: new Date(new Date(now).setHours(4, 0, 0)),
//     title: 'Event 2',
//     split: 1
//   },
//   {
//     start: new Date(new Date(now).setHours(3, 0, 0)),
//     end: new Date(new Date(now).setHours(5, 0, 0)),
//     title: 'Event 3',
//     split: 2
//   }
// ]
</script>

<style lang="scss">
.test-view {
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 4px;
}

// Global.
.w-app {margin: 0;padding: 0;}
.top-bar, footer {display: none !important;}

// Min cell width example.
// --------------------------------------------------------
// .vuecal__weekdays-bar {margin: auto;} // So it will fill up the whole available space.
// .vuecal__weekday,
// .vuecal--week-view .vuecal__cell,
// .vuecal--days-view .vuecal__cell {min-width: 300px;}
// .vuecal--week-view .vuecal__cell,
// .vuecal--days-view .vuecal__cell {min-height: 3000px;}
// --------------------------------------------------------

.vuecal__special-hours {
  // .business-hours {background-color: rgba(117, 176, 255, 0.2);color: hsl(217, 80%, 67%);}
  &.doctor-1 {background-color: hsl(127deg 43% 60% / 15%);color: hsl(127, 50%, 67%);}
  &.doctor-2 {background-color: hsl(217deg 43% 60% / 15%);color: hsl(217, 80%, 67%);}
  &.doctor-3 {background-color: hsl(287deg 43% 60% / 15%);color: hsl(287, 80%, 67%);}
  &.closed {
    background: repeating-linear-gradient(-45deg, rgba(#fff, 0) 0 6px, rgba(#ffa257, 0.15) 6px 20px);
    color: hsl(27, 90%, 63%);
  }

  em {font-size: 0.9em;color: #999;}
}

.theme-switch {
  position: absolute;
  top: 10px;
  right: 24px;

  .w-switch__thumb {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.vuecal__cell-split {
  &.dr-1 {background-color: rgba(134, 192, 253, 0.1);}
  &.dr-2 {background-color: rgba(187, 148, 255, 0.15);}
  .vuecal--dark &.dr-1 {background-color: rgba(143, 158, 196, 0.1);}
  .vuecal--dark &.dr-2 {background-color: rgba(131, 184, 255, 0.1);}
}
</style>
