<template lang="pug">
.vue-cal(ref="vueCalRef" :data-locale="locale" :class="wrapperClasses" :style="wrapperStyles")
  VueCalHeader
  VueCalBody
</template>

<script setup>
import { computed, ref, provide } from 'vue'
import { props as propsDefinitions } from './components/props-definitions'
import VueCalHeader from './components/header.vue'
import VueCalBody from './components/body.vue'

const props = defineProps(propsDefinitions)
const vueCalRef = ref(null)

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

const validViews = ['years', 'year', 'month', 'week', 'days', 'day']

const ready = ref(false) // Is vue-cal ready.
// Make texts reactive before a locale is loaded.
const texts = ref({ ...textsDefaults })

// At any time this object will be filled with current view details, visible events and selected date.
const view = computed(() => ({
  id: props.activeView,
  title: '',
  startDate: null,
  endDate: null,
  firstCellDate: null,
  lastCellDate: null,
  selectedDate: null,
  // All the events are stored in the mutableEvents array, but subset of visible ones are passed
  // Into the current view for fast lookup and manipulation.
  events: []
}))

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

const gridLayoutPerView = {
  years: { cols: 5, rows: 5 },
  year: { cols: 3, rows: 4 },
  month: { cols: 7, rows: 6 },
  week: { cols: 7, rows: 1 },
  days: { cols: 5, rows: 1 },
  day: { cols: 1, rows: 1 }
}

const wrapperClasses = computed(() => ({
  'vue-cal--ready': ready,
  [`vue-cal--${view.value.id}-view`]: true
}))

const wrapperStyles = computed(() => ({
  '--vue-cal-grid-columns': gridLayoutPerView[view.value.id].cols,
  '--vue-cal-grid-rows': gridLayoutPerView[view.value.id].rows
}))

provide('view', view)
provide('gridLayoutPerView', gridLayoutPerView)
</script>

<style lang="scss">
.vue-cal {
  --vue-cal-grid-columns: 7; // Default value, overridden dynamically on view change.
  --vue-cal-grid-rows: 6; // Default value, overridden dynamically on view change.

  height: 100%;
}
</style>
