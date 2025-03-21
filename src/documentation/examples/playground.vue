<template lang="pug">
.config-panel.w-flex.gap6.no-grow
  .w-flex.column.gap1.no-grow
    w-switch.no-grow(v-model="mainVuecalConfig.twelveHour") 12h Format
    w-switch.lh0.no-grow(v-model="mainVuecalConfig.startWeekOnSunday") Start Week On Sunday
    w-switch.no-grow(v-model="mainVuecalConfig.hideWeekends") Hide Weekends
    w-switch.no-grow(v-model="mainVuecalConfig.clickToNavigate") Click to Navigate
    w-switch.no-grow(v-model="mainVuecalConfig.showSchedules") Day Schedules
    w-switch.no-grow(v-model="mainVuecalConfig.showSpecialHours") Business Hours
    w-switch.no-grow(v-model="mainVuecalConfig.editableEvents") Editable Events

  .w-flex.column.grow
    .w-flex.gap2.align-center.justify-end.no-grow
      w-radios(
        v-model="size"
        :items="sizes"
        return-values
        inline)
      w-icon.grey mdi mdi-translate
      .grey Locale
      w-select.no-grow(
        v-model="mainVuecalConfig.locale"
        :items="locales"
        style="width: 60px")

    .w-flex.gap2.align-center.justify-end.no-grow
        .grey View Day Offset
        w-input(
          v-model="mainVuecalConfig.viewDayOffset"
          type="number"
          label-position="left"
          style="max-width: 30px")
        .grey Week Days
        w-select.mb4(
          v-model="hideWeekdays"
          :items="weekdays"
          multiple
          fit-to-content)

    .mta.w-flex.justify-space-between.no-grow.gap2
      .w-flex.wrap.gap2
        w-button(
          @click="addEventFromOutside"
          tooltip="Add event to the<br>events array prop") Add Event Externally
        w-button(
          @click="addEventFromVueCal"
          tooltip="Add event via<br><code>$refs.vuecal.view.createEvent()</code>") Add Event Internally
      w-radios.justify-end(
        v-model="mainVuecalConfig.view"
        :items="viewsArray"
        inline)

.w-flex.gap2.mt2.mx2.ovh
  aside.no-shrink.no-grow
    vue-cal.no-shrink.no-grow(
      v-model:selected-date="mainVuecalConfig.selectedDate"
      @update:selected-date="mainVuecalConfig.viewDate = $event"
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

  vue-cal.vue-cal--main.grow(
    ref="vueCalRef"
    v-model:view="mainVuecalConfig.view"
    v-model:selected-date="mainVuecalConfig.selectedDate"
    v-model:view-date="mainVuecalConfig.viewDate"
    @update:view-date="pickerConfig.viewDate = $event"
    v-bind="mainVuecalConfig"
    @ready="log('ready', $event)"
    @view-change="log('view-change', $event)"
    @event-create="eventCreation.open"
    @event-mousedown="log('event-mousedown', $event)"
    @event-mouseup="log('event-mouseup', $event)"
    @event-click="log('event-click', $event)"
    @event-delayed-click="eventSelection.onEventDelayedClick"
    @event-hold="log('event-hold', $event)"
    @event-drag-start="log('event-drag-start', $event)"
    @event-drag="log('event-drag', $event)"
    @event-drag-end="log('event-drag-end', $event)"
    @event-drop="log('event-drop', $event)"
    @event-dropped="log('event-dropped', $event)"
    @event-resize="log('event-resize', $event)"
    @event-resize-end="log('event-resize-end', $event)"
    @event-contextmenu="log('event-contextmenu', $event)"
    @cell-click="log('cell-click', $event)"
    @cell-dblclick="log('cell-dblclick', $event)"
    @cell-drag-start="log('cell-drag-start', $event)"
    @cell-drag="log('cell-drag', $event)"
    @cell-drag-end="log('cell-drag-end', $event)"
    @cell-hold="log('cell-hold', $event)"
    @cell-mousedown="log('cell-mousedown', $event)"
    @cell-mouseup="log('cell-mouseup', $event)"
    @cell-touchstart="log('cell-touchstart', $event)"
    @cell-contextmenu="log('cell-contextmenu', $event)")

w-dialog(
  v-if="eventCreation.event"
  v-model="eventCreation.show"
  width="300"
  @close="eventCreation.cancel")
  w-input(v-model="eventCreation.event.title") Event Title
  w-select(v-model="eventCreation.event.class" :items="eventClasses") Event Class
  w-switch.my2(v-model="eventCreation.event.background") Background
  .w-flex.justify-end.mt2.gap2
    w-button(@click="eventCreation.cancel") Cancel
    w-button(@click="eventCreation.save") OK

w-dialog(
  v-if="eventSelection.event"
  v-model="eventSelection.showDialog"
  :title="eventSelection.event.title"
  width="380")
  .w-flex.align-center.justify-end.gap2
    w-icon.grey mdi mdi-calendar
    small {{ eventSelection.event.start.format() }}
    w-icon.grey.ml2 mdi mdi-clock-outline
    small {{ eventSelection.event.start.formatTime() }} - {{ eventSelection.event.end.formatTime() }}
  .w-flex.align-center.justify-center.title1.mt6.mb4
    w-icon.grey.ml2(size="3rem") mdi mdi-party-popper
  p.lh1.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore expedita veniam deleniti,
    labore corporis quas, aspernatur praesentium quia nisi, omnis quod autem.
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { VueCal, addDatePrototypes } from '@/vue-cal'
import { useAppStore } from '@/store'

addDatePrototypes()

const store = useAppStore()
const vueCalRef = ref(null)

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

const size = ref(null)
const sizes = [
  { value: null, label: 'Normal' },
  { value: 'sm', label: 'small' },
  { value: 'xs', label: 'Extra small' }
]

const weekdays = [{ label: 'mon' }, { label: 'tue' }, { label: 'wed' }, { label: 'thu' }, { label: 'fri' }, { label: 'sat' }, { label: 'sun' }]
const hideWeekdays = ref([])

const eventClasses = [
  { value: 'leisure', label: 'Leisure' },
  { value: 'health', label: 'Health' },
  { value: 'sport', label: 'Sport' }
]

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
  events: ref([
    { title: 'Event 1', start: new Date(new Date().setHours(8, 0, 0, 0)), end: new Date(new Date().setHours(8, 30, 0, 0)) },
    { title: 'Event 2', start: new Date(new Date().setHours(9, 0, 0, 0)), end: new Date(new Date().setHours(9, 30, 0, 0)) }
  ]),
  showSchedules: ref(false),
  schedules: computed(() => {
    return mainVuecalConfig.showSchedules ? [
      { label: 'Dr 1', class: 'dr-1', style: 'background-color: rgba(255, 0, 0, 0.1)' },
      { label: 'Dr 2', class: 'dr-2' }
    ] : undefined
  }),
  eventsOnMonthView: true,
  showSpecialHours: ref(false),
  specialHours: computed(() => {
    return mainVuecalConfig.showSpecialHours ? {
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
    } : undefined
  }),
  editableEvents: ref(false)
})

let eventCounter = 2 // Starts with 2 events in the array.
const addEventFromOutside = () => {
  mainVuecalConfig.events.push({
    title: 'Event ' + ++eventCounter,
    start: (new Date()).subtractHours(2),
    end: (new Date()).subtractHours(1),
    schedule: ((eventCounter - 1) % 2) + 1
  })
}

const addEventFromVueCal = () => {
  vueCalRef.value.view.createEvent({
    title: 'Event ' + ++eventCounter,
    start: new Date(),
    end: (new Date()).addHours(1),
    schedule: ((eventCounter - 1) % 2) + 1
  })
}

const log = (...args) => console.log(...args)

const eventSelection = reactive({
  onEventDelayedClick: e => {
    log('event-delayed-click', e)

    eventSelection.event = e.event
    eventSelection.showDialog = true
  },
  showDialog: ref(false),
  event: ref(null)
})

const eventCreation = reactive({
  show: ref(false),
  resolve: null,
  event: {
    title: '',
    background: false,
    class: ''
  },
  open: ({ event, resolve }) => {
    eventCreation.show = true
    eventCreation.event = event
    eventCreation.resolve = resolve
    log('event-create', { event, resolve })
  },
  cancel: () => {
    eventCreation.resolve(false)
    eventCreation.show = false
  },
  save: () => {
    eventCreation.resolve(eventCreation.event)
    eventCreation.show = false
  }
})
</script>

<style lang="scss">
.page--playground {
  padding: 40px 0 8px;
  border-left: none;
  overflow: hidden;
  max-width: none;
  height: 100dvh;

  // Global.
  ~ footer, aside, h1 {display: none;}
  .main--examples {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
  }

  main {
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

  .config-panel {
    padding: 12px;
    background-color: color-mix(in srgb, var(--w-contrast-bg-color) 5%, transparent);
    border-bottom: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 8%, transparent);
  }

  .vue-cal--main {--vuecal-height: 100%;}

  // Min cell width example.
  // --------------------------------------------------------
  // .vuecal__headings-bar {margin: auto;} // So it will fill up the whole available space.
  // .vuecal__weekday,
  // .vuecal--week-view .vuecal__cell,
  // .vuecal--days-view .vuecal__cell {min-width: 300px;}
  // .vuecal--week-view .vuecal__cell,
  // .vuecal--days-view .vuecal__cell {min-height: 3000px;}
  // --------------------------------------------------------

  .vuecal__special-hours {
    text-align: center;

    // .business-hours {background-color: rgba(117, 176, 255, 0.2);color: hsl(217, 80%, 67%);}
    &.doctor-1 {background-color: hsl(127deg 43% 60% / 15%);color: hsl(127, 50%, 67%);}
    &.doctor-2 {background-color: hsl(217deg 43% 60% / 15%);color: hsl(217, 80%, 67%);}
    &.doctor-3 {background-color: hsl(287deg 43% 60% / 15%);color: hsl(287, 80%, 67%);}
    &.closed {
      background: repeating-linear-gradient(-45deg, rgba(#fff, 0) 0 6px, rgba(#ffa257, 0.15) 6px 20px);
      color: hsl(27, 90%, 63%);
    }

    em {
      font-size: 0.9em;
      color: #999;
      line-height: 1.15;
    }
  }

  .vuecal__schedule {
    &.dr-1 {background-color: rgba(134, 192, 253, 0.1);}
    &.dr-2 {background-color: rgba(187, 148, 255, 0.15);}
    .vuecal--dark &.dr-1 {background-color: rgba(143, 158, 196, 0.1);}
    .vuecal--dark &.dr-2 {background-color: rgba(131, 184, 255, 0.1);}
  }

  .vuecal__event.leisure {background-color: #fd9c42d9;border-color: #e9882e;}
  .vuecal__event.health {background-color: #57cea9cc;border-color: #90d2be;}
  .vuecal__event.sport {background-color: #ff6666d9;border-color: #eb5252;}
}

// Media queries.
// --------------------------------------------------------
@media screen and (max-width: $sm) {
  .main--playground aside {
    position: absolute;
    bottom: 5px;
    left: 5px;
    z-index: 10;
    background: var(--w-base-bg-color);
  }
  .vue-cal--main {margin-left: 80px;}
}

@media screen and (max-width: $xs) {
  .main--playground aside {
    bottom: -8px;
    left: -8px;
    transform: scale(0.9);
  }
  .vue-cal--main {margin-left: 0;}
}
</style>
