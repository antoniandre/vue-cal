<template lang="pug">
p Calendar
.vuecal(ref="vuecal" :data-locale="locale" :class="wrapperClasses")
  .vuecal__cell(v-for="i in 42" :class="cellClasses")
    | {{ i }}
</template>

<script></script>
<script setup>
import { ref } from 'vue'
import './styles.scss'

const minutesInADay = 24 * 60 // Don't do the maths every time.

const textsDefaults = {
  weekDays: Array(7).fill(''),
  weekDaysShort: [],
  months: Array(12).fill(''),
  years: '',
  year: '',
  month: '',
  week: '',
  day: '',
  today: '',
  noEvent: '',
  allDay: '',
  deleteEvent: '',
  createEvent: '',
  dateFormat: 'dddd MMMM D, YYYY',
  am: 'am',
  pm: 'pm'
}

const validViews = ['years', 'year', 'month', 'week', 'day']


const props = defineProps({
  activeView: { type: String, default: 'week' },
  // Only used if there are daySplits with minSplitWidth, to add the same height top spacer on time column.
  allDayBarHeight: { type: [String, Number], default: '25px' },
  cellClickHold: { type: Boolean, default: true },
  cellContextmenu: { type: Boolean, default: false },
  clickToNavigate: { type: Boolean, default: false },
  dblclickToNavigate: { type: Boolean, default: true },
  disableDatePrototypes: { type: Boolean, default: false },
  disableDays: { type: Array, default: () => [] },
  disableViews: { type: Array, default: () => [] },
  dragToCreateEvent: { type: Boolean, default: true },
  // Start a drag creation after dragging a certain amount of pixels.
  // This prevents drag creation by mistake when you want to navigate.
  dragToCreateThreshold: { type: Number, default: 15 },
  editableEvents: { type: [Boolean, Object], default: false },
  events: { type: Array, default: () => [] },
  eventsCountOnYearView: { type: Boolean, default: false },
  eventsOnMonthView: { type: [Boolean, String], default: false },
  hideBody: { type: Boolean, default: false },
  hideTitleBar: { type: Boolean, default: false },
  hideViewSelector: { type: Boolean, default: false },
  hideWeekdays: { type: Array, default: () => [] },
  hideWeekends: { type: Boolean, default: false },
  locale: { type: [String, Object], default: 'en' },
  maxDate: { type: [String, Date], default: '' },
  minCellWidth: { type: Number, default: 0 },
  minDate: { type: [String, Date], default: '' },
  minEventWidth: { type: Number, default: 0 },
  minSplitWidth: { type: Number, default: 0 },
  onEventClick: { type: [Function, null], default: null },
  onEventCreate: { type: [Function, null], default: null },
  onEventDblclick: { type: [Function, null], default: null },
  overlapsPerTimeStep: { type: Boolean, default: false },
  resizeX: { type: Boolean, default: false },
  selectedDate: { type: [String, Date], default: '' },
  showAllDayEvents: { type: [Boolean, String], default: false },
  showTimeInCells: { type: Boolean, default: false },
  showWeekNumbers: { type: [Boolean, String], default: false },
  snapToTime: { type: Number, default: 0 },
  small: { type: Boolean, default: false },
  specialHours: { type: Object, default: () => ({}) },
  splitDays: { type: Array, default: () => [] },
  startWeekOnSunday: { type: Boolean, default: false },
  stickySplitLabels: { type: Boolean, default: false },
  time: { type: Boolean, default: true },
  timeCellHeight: { type: Number, default: 40 }, // In pixels.
  timeFormat: { type: String, default: '' },
  timeFrom: { type: Number, default: 0 }, // In minutes.
  timeStep: { type: Number, default: 60 }, // In minutes.
  timeTo: { type: Number, default: 24 * 60 }, // In minutes.
  todayButton: { type: Boolean, default: false },
  transitions: { type: Boolean, default: true },
  twelveHour: { type: Boolean, default: false },
  watchRealTime: { type: Boolean, default: false }, // Expensive, so only trigger on demand.
  xsmall: { type: Boolean, default: false }
})

const ready = ref(false) // Is vue-cal ready.
// Make texts reactive before a locale is loaded.
const texts = ref({ ...textsDefaults })

// At any time this object will be filled with current view details, visible events and selected date.
const view = {
  id: '',
  title: '',
  startDate: null,
  endDate: null,
  firstCellDate: null,
  lastCellDate: null,
  selectedDate: null,
  // All the events are stored in the mutableEvents array, but subset of visible ones are passed
  // Into the current view for fast lookup and manipulation.
  events: []
}

// const eventIdIncrement = 1 // Internal unique id.

// Preset at now date on load, but updated every minute if watchRealTime,
// or updated at least on each cells rerender, in order to keep Today's date accurate.
const now = new Date()
// Useful when watchRealTime = true, 2 timeouts: 1 to snap to round minutes, then 1 every minute.
const timeTickerIds = [null, null]

// All the possible events/cells interractions:
// e.g. focus, click, click & hold, resize, drag & drop (coming).
const domEvents = {
  resizeAnEvent: {
    _eid: null, // Only one at a time.
    start: null,
    split: null,
    segment: null,
    originalEndTimeMinutes: 0,
    originalEnd: null,
    end: null,
    startCell: null,
    endCell: null
  },
  dragAnEvent: {
    // Only one at a time, only needed for vuecal dragging-event class.
    _eid: null
  },
  dragCreateAnEvent: {
    startCursorY: null,
    start: null, // The cell date where we start the drag.
    split: null,
    event: null
  },
  focusAnEvent: {
    _eid: null, // Only one at a time.
    // Useful to detect a full click (mousedown + mouseup on same event).
    // E.g. Only call onEventClick function (if any) on full click.
    mousedUp: false
  },
  clickHoldAnEvent: {
    _eid: null, // Only one at a time.
    timeout: 1200, // Hold for 1.2s to delete an event.
    timeoutId: null
  },
  dblTapACell: {
    taps: 0,
    timeout: 500 // Allowed latency between first and second click.
  },
  clickHoldACell: {
    cellId: null,
    split: null,
    timeout: 1200, // Hold for 1.2s to create an event.
    timeoutId: null,
    eventCreated: false
  },
  // A single click can trigger event creation if the user decides so.
  // But prevent this to happen on click & hold, on event click and on resize event.
  cancelClickEventCreation: false
}

// Transition when switching view. left when going toward the past, right when going toward future.
const transitionDirection = 'right'
</script>
