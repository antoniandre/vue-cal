<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
.test-view
  .w-flex.gap2
    w-button(@click="addEventFromOutside") Add event
    w-button(@click="addEventFromVueCal") Add event

  .w-flex.gap2.mt4.ovh
    //- aside.no-shrink.no-grow
      vue-cal.no-shrink.no-grow(
        v-model:selected-date="pickerConfig.selectedDate"
        v-bind="pickerConfig")

      .w-flex.align-center.gap1.body.wrap.no-grow
        span View Date:
        template(v-if="mainVuecalConfig.viewDate")
          span.code {{ mainVuecalConfig.viewDate.format('DD/MM/YYYY') }}
          w-icon.grey.mx-1(xs) mdi mdi-clock-outline
          span.code {{ mainVuecalConfig.viewDate.formatTime() }}
        .grey(v-else) N/A
      .w-flex.align-center.gap1.wrap.size--sm.no-grow
        span Selected Date:
        template(v-if="mainVuecalConfig.selectedDate")
          span.code {{ mainVuecalConfig.selectedDate.format('DD/MM/YYYY') }}
          w-icon.grey.mx-1(xs) mdi mdi-clock-outline
          span.code {{ mainVuecalConfig.selectedDate.formatTime() }}
        .grey(v-else) N/A

    vue-cal.grow(
      ref="vueCalRef"
      v-model:view="mainVuecalConfig.view"
      v-model:selected-date="mainVuecalConfig.selectedDate"
      v-model:view-date="mainVuecalConfig.viewDate"
      v-bind="mainVuecalConfig"
      @event-create="log('event-create', $event)"
      @event-click="log('event-click', $event)"
      @event-drag="log('event-drag', $event)"
      @event-drag-end="log('event-drag', $event)"
      @event-drop="log('event-drop', $event)"
      @event-resize="log('event-resize', $event)"
      @event-resize-end="log('event-resize-end', $event)"
      @cell-drag="log('cell-drag', $event)"
      @cell-drag-end="log('cell-drag-end', $event)")
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { VueCal, addDatePrototypes } from '@/vue-cal'
import { useAppStore } from '@/store'

addDatePrototypes()

const store = useAppStore()
const vueCalRef = ref(null)

const views = {
  day: { label: 'Day' },
  days: { label: 'Days', cols: 365, rows: 1 },
  week: { label: 'Week' },
  month: { label: 'Month' },
  year: { label: 'Year' },
  years: { label: 'Years' }
}
const viewsArray = Object.entries(views).map(([viewId, obj]) => ({ ...obj, value: viewId }))

const size = ref(null)
const sizes = [
  { value: null, label: 'Normal' },
  { value: 'sm', label: 'small' },
  { value: 'xs', label: 'Extra small' }
]

const weekdays = [{ label: 'mon' }, { label: 'tue' }, { label: 'wed' }, { label: 'thu' }, { label: 'fri' }, { label: 'sat' }, { label: 'sun' }]
const hideWeekdays = ref([])

const pickerConfig = reactive({
  datePicker: true,
  dark: computed(() => store.darkMode),
  selectedDate: computed(() => mainVuecalConfig.selectedDate),
  locale: computed(() => mainVuecalConfig.locale),
  startWeekOnSunday: computed(() => mainVuecalConfig.startWeekOnSunday),
  todayButton: computed(() => mainVuecalConfig.todayButton),
  hideWeekends: computed(() => mainVuecalConfig.hideWeekends),
  hideWeekdays: computed(() => mainVuecalConfig.hideWeekdays),
  viewDayOffset: computed(() => mainVuecalConfig.viewDayOffset)
})

const mainVuecalConfig = reactive({
  views,
  view: ref('week'),
  dark: computed(() => store.darkMode),
  selectedDate: ref(null),
  viewDate: ref(new Date()),
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
  showSchedules: ref(false),
  schedules: computed(() => {
    return mainVuecalConfig.showSchedules ? [{ label: 'Dr 1', class: 'dr-1' }, { label: 'Dr 2', class: 'dr-2' }] : undefined
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
  },
  editableEvents: ref(false)
})

// Pretend a call to a backend.
setTimeout(() => {
  mainVuecalConfig.events = [
    { title: 'Event 1', start: '2024-09-20 10:00', end: '2024-09-20 10:30' },
    { title: 'Event 2', start: '2024-09-20 11:00', end: '2024-09-20 11:30' }
  ]
}, 1000)

const addEventFromOutside = () => {
  mainVuecalConfig.events.push({ title: 'Event 1', start: (new Date()).subtractHours(4), end: (new Date()).subtractHours(3) })
}

const addEventFromVueCal = () => {
  vueCalRef.value.view.createEvent({
    title: 'Event New!!',
    start: '2024-11-20 10:00',
    end: '2024-11-20 10:30'
  })
}

const log = (...args) => console.log(...args)

// events: [
//   {
//     start: new Date(new Date(now).setHours(1, 0, 0)),
//     end: new Date(new Date(now).setHours(4, 0, 0)),
//     allDay: true,
//     title: 'Event 1',
//     schedule: 2
//   },
//   {
//     start: new Date(new Date(now).setHours(1, 0, 0)),
//     end: new Date(new Date(now).setHours(4, 0, 0)),
//     title: 'Event 2',
//     schedule: 1
//   },
//   {
//     start: new Date(new Date(now).setHours(3, 0, 0)),
//     end: new Date(new Date(now).setHours(5, 0, 0)),
//     title: 'Event 3',
//     schedule: 2
//   }
// ]
</script>

<style lang="scss">
.page--test {
  padding-top: 60px;
  padding-left: 12px;
  padding-right: 12px;
  border-left: none;
  overflow: hidden;
  max-width: none;

  // Global.
  ~ footer, aside {display: none;}

  main {
    overflow: auto;
    display: flex;
    flex-direction: column;
    border: none;
    padding: 0;
    flex-grow: 1;
  }

  main aside {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 215px;
    padding: 0;
  }

  .test-view {
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  // Global.
  .w-app {margin: 0;padding: 0;}
  footer {display: none !important;}

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

  .vuecal__cell-schedule {
    &.dr-1 {background-color: rgba(134, 192, 253, 0.1);}
    &.dr-2 {background-color: rgba(187, 148, 255, 0.15);}
    .vuecal--dark &.dr-1 {background-color: rgba(143, 158, 196, 0.1);}
    .vuecal--dark &.dr-2 {background-color: rgba(131, 184, 255, 0.1);}
  }
}
</style>
