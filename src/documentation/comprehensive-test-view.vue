<template lang="pug">
.comprehensive-test-view.ovh.fill-height(:class="{ 'drawer-open': drawerOpen }")
  w-button.controls-toggle(
    v-if="$waveui.breakpoint.xs"
    round
    :icon="drawerOpen ? 'mdi mdi-close' : 'mdi mdi-menu'"
    @click="drawerOpen = !drawerOpen"
    data-testid="controls-toggle")
  controls-panel-wrapper(
    :drawer-open="drawerOpen"
    @update:drawer-open="drawerOpen = $event")
    h2 Vue Cal - Comprehensive Test View
    p.subtitle All Props Testing Interface

    .control-sections
      //- Basic Props
      section.control-section
        h3 Basic Props
        .controls
          .control
            w-select(
              v-model="config.view"
              :items="config.availableViews"
              data-testid="view-select"
              label-position="left"
              outline) View:

          .control
            w-input(
              v-model="selectedDateInput"
              type="date"
              data-testid="selected-date-input"
              label-position="left"
              outline) Selected Date:

          .control
            w-input(
              v-model="viewDateInput"
              type="date"
              data-testid="view-date-input"
              label-position="left"
              outline) View Date:

          .control
            w-select(
              v-model="config.locale"
              :items="config.locales"
              data-testid="locale-select"
              label-position="left"
              outline) Locale:

          .control
            w-input(
              v-model="minDateInput"
              type="date"
              data-testid="min-date-input"
              label-position="left"
              outline) Min Date:

          .control
            w-input(
              v-model="maxDateInput"
              type="date"
              data-testid="max-date-input"
              label-position="left"
              outline) Max Date:

          .control
            w-switch(
              v-model="config.startWeekOnSunday"
              thin
              label-on-left
              data-testid="start-week-sunday") Start Week On Sunday

          .control
            w-switch(
              v-model="config.todayButton"
              thin
              label-on-left
              data-testid="today-button") Today Button

          .control
            w-switch(
              v-model="config.watchRealTime"
              thin
              label-on-left
              data-testid="watch-real-time") Watch Real Time

          .control
            w-switch(
              v-model="config.weekNumbers"
              thin
              label-on-left
              data-testid="week-numbers") Week Numbers (month view only)

          .control
            w-switch(
              v-model="config.titleBar"
              thin
              label-on-left
              data-testid="title-bar") Title Bar

          .control
            w-switch(
              v-model="config.viewsBar"
              thin
              label-on-left
              data-testid="views-bar") Views Bar

          .control
            w-switch(
              v-model="config.clickToNavigate"
              thin
              label-on-left
              data-testid="click-to-navigate") Click To Navigate

      //- Display Props.
      section.control-section
        h3 Display Props
        .controls
          .w-flex.row.gap2
            label.no-grow.body Theme:
            w-radios.no-grow(
              v-model="config.theme"
              :items="config.themes"
              data-testid="theme-select"
              inline)

          .control
            w-switch(
              v-model="config.dark"
              thin
              label-on-left
              data-testid="dark-mode") Dark Mode

          .control
            w-switch(
              v-model="config.datePicker"
              thin
              label-on-left
              data-testid="date-picker") Date Picker

          .control
            w-switch(
              v-model="config.horizontal"
              thin
              label-on-left
              data-testid="horizontal") Horizontal

          .control
            w-switch(
              v-model="config.sm"
              thin
              label-on-left
              data-testid="sm-size") Small (sm)

          .control
            w-switch(
              v-model="config.xs"
              thin
              label-on-left
              data-testid="xs-size") Extra Small (xs)

      //- Time Props.
      section.control-section
        h3 Time Props
        .controls
          .control
            w-switch(
              v-model="config.time"
              thin
              label-on-left
              data-testid="time-enabled") Time

          .control
            w-input(
              v-model.number="config.timeFrom"
              type="number"
              min="0"
              max="1440"
              step="60"
              data-testid="time-from"
              label-position="left"
              outline) Time From (minutes):

          .control
            w-input(
              v-model.number="config.timeTo"
              type="number"
              min="0"
              max="1440"
              step="60"
              data-testid="time-to"
              label-position="left"
              outline) Time To (minutes):

          .control
            w-input(
              v-model.number="config.timeStep"
              type="number"
              min="1"
              max="120"
              data-testid="time-step"
              label-position="left"
              outline) Time Step (minutes)

          .control
            w-input(
              v-model.number="config.timeCellHeight"
              type="number"
              min="20"
              max="100"
              data-testid="time-cell-height"
              label-position="left"
              outline) Time Cell Height (px)

          .control
            w-switch(
              v-model="config.twelveHour"
              thin
              label-on-left
              data-testid="twelve-hour") Twelve Hour

          .control
            w-switch(
              v-model="config.timeAtCursor"
              thin
              label-on-left
              data-testid="time-at-cursor") Time At Cursor

          .control
            w-input(
              v-model="config.timeFormat"
              placeholder="HH:mm"
              data-testid="time-format"
              label-position="left"
              outline) Time Format

      //- Event Props.
      section.control-section
        h3 Event Props
        .controls
          .control
            w-switch(
              v-model="config.allDayEvents"
              thin
              label-on-left
              data-testid="all-day-events") All-Day Events

          .control
            w-switch(
              v-model="config.multidayEvents"
              thin
              label-on-left
              data-testid="multiday-events") Multiday Events

          .control
            w-switch(
              v-model="config.eventsOnMonthView"
              thin
              label-on-left
              data-testid="events-on-month-view") Events On Month View

          .control
            w-switch(
              v-model="config.stackEvents"
              thin
              label-on-left
              data-testid="stack-events") Stack Events

          .control
            w-switch(
              v-model="editableEventsEnabled"
              thin
              label-on-left
              data-testid="editable-events") Editable Events

          .control
            w-switch(
              v-model="eventCountEnabled"
              thin
              label-on-left
              data-testid="event-count") Event Count

          .control
            w-input(
              v-model.number="config.eventCreateMinDrag"
              type="number"
              min="0"
              max="100"
              data-testid="event-create-min-drag"
              label-position="left"
              outline) Event Create Min Drag (px):

          .control
            w-input(
              v-model.number="config.snapToInterval"
              type="number"
              min="0"
              max="60"
              data-testid="snap-to-interval"
              label-position="left"
              outline) Snap To Interval (minutes):

      //- Weekday Props.
      section.control-section
        h3 Weekday Props
        .controls
          .control
            w-switch(
              v-model="config.hideWeekends"
              thin
              label-on-left
              data-testid="hide-weekends") Hide Weekends

          .control.w-flex.pa2.bdrs1.bd1.contrast-o05--bg(data-testid="hide-weekdays")
            w-checkboxes(
              v-model="config.hideWeekdays"
              :items="config.weekdays"
              multiple
              inline
              label-position="left") Hide Weekdays

          .control.w-flex.pa2.bdrs1.bd1.contrast-o05--bg
            w-checkboxes(
              v-model="config.disableDays"
              :items="config.weekdays"
              multiple
              inline
              label-position="left") Disable Days

          .control
            w-input(
              v-model.number="config.viewDayOffset"
              type="number"
              min="0"
              max="6"
              data-testid="view-day-offset"
              label-position="left"
              outline) View Day Offset

      //- Schedules & Special Hours.
      section.control-section
        h3 Schedules &amp; Special Hours
        .controls
          .control
            w-switch(
              v-model="schedulesEnabled"
              thin
              label-on-left
              data-testid="schedules-enabled") Enable Schedules

          .control(v-if="schedulesEnabled")
            w-input(
              v-model.number="scheduleCount"
              type="number"
              min="1"
              max="10"
              data-testid="schedule-count"
              label-position="left"
              outline) Number of Schedules

          .control
            w-switch(
              v-model="specialHoursEnabled"
              thin
              label-on-left
              data-testid="special-hours-enabled") Enable Special Hours

      //- Event Actions.
      section.control-section
        h3 Event Actions
        .controls.w-flex.column.gap2
          .w-flex.gap2
            w-button.grow(@click="addEvent" data-testid="add-event-btn")
              w-icon.mr1 wi-plus
              small Rand. Evt.
            w-button.grow(@click="addAllDayEvent" data-testid="add-all-day-event-btn")
              w-icon.mr1 wi-plus
              small All-Day Evt.
            w-button.grow(@click="addBackgroundEvent" data-testid="add-background-event-btn")
              w-icon.mr1 wi-plus
              small Bgd Evt.
          .w-flex.gap2.basis-zero
            w-button(
              @click="clearEvents"
              bg-color="orange-light1"
              color="white"
              data-testid="clear-events-btn")
                w-icon.mr1 wi-minus
                small Clear All Events
            w-button(
              @click="loadSampleEvents"
              bg-color="info"
              data-testid="load-sample-events-btn")
                w-icon.mr1 mdi mdi-wand
                small Load Sample Events

  .calendar-wrap
    vue-cal(
      ref="vueCalRef"
      v-model:view="config.view"
      v-model:selected-date="config.selectedDate"
      v-model:view-date="config.viewDate"
      v-bind="calendarProps"
      @ready="onReady"
      @view-change="onViewChange"
      @event-create="onEventCreate"
      @event-click="onEventClick"
      @event-drag="onEventDrag"
      @event-drag-end="onEventDragEnd"
      @event-drop="onEventDrop"
      @event-resize-start="onEventResizeStart"
      @event-resize="onEventResize"
      @event-resize-end="onEventResizeEnd"
      @cell-click="onCellClick"
      @cell-drag="onCellDrag"
      @cell-drag-end="onCellDragEnd"
      data-testid="vue-cal")
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, inject } from 'vue'
import { VueCal, addDatePrototypes } from '@/vue-cal'
import ControlsPanelWrapper from '@/documentation/components/controls-panel-wrapper.vue'

addDatePrototypes()
const $waveui = inject('$waveui')

const vueCalRef = ref(null)
const drawerOpen = ref(false)

// Config state.
const config = reactive({
  view: 'week',
  availableViews: [
    { label: 'Years', value: 'years' },
    { label: 'Year', value: 'year' },
    { label: 'Month', value: 'month' },
    { label: 'Week', value: 'week' },
    { label: 'Day', value: 'day' },
    { label: 'Days', value: 'days' }
  ],
  selectedDate: null,
  viewDate: new Date(),
  locale: 'en-us',
  locales: [
    { label: 'Default (en-us)', value: 'en-us' },
    { label: 'French', value: 'fr' },
    { label: 'Spanish', value: 'es' },
    { label: 'German', value: 'de' },
    { label: 'Italian', value: 'it' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Chinese', value: 'zh-cn' }
  ],
  minDate: '',
  maxDate: '',
  startWeekOnSunday: false,
  todayButton: true,
  titleBar: true,
  viewsBar: true,
  clickToNavigate: false,
  watchRealTime: false,
  weekNumbers: false,
  theme: 'default',
  themes: [
    { label: 'Default', value: 'default' },
    { label: 'None', value: false }
  ],
  dark: false,
  sm: false,
  xs: false,
  datePicker: false,
  horizontal: false,
  time: true,
  timeFrom: 0,
  timeTo: 24 * 60,
  timeStep: 60,
  timeCellHeight: 40,
  twelveHour: false,
  timeAtCursor: false,
  timeFormat: '',
  allDayEvents: false,
  multidayEvents: true,
  eventsOnMonthView: false,
  stackEvents: false,
  editableEvents: false,
  eventCount: false,
  eventCreateMinDrag: 15,
  snapToInterval: 0,
  hideWeekends: false,
  hideWeekdays: [],
  hideWeekdaysLabels: [],
  weekdays: [
    { label: 'Mon', value: 'mon' },
    { label: 'Tue', value: 'tue' },
    { label: 'Wed', value: 'wed' },
    { label: 'Thu', value: 'thu' },
    { label: 'Fri', value: 'fri' },
    { label: 'Sat', value: 'sat' },
    { label: 'Sun', value: 'sun' }
  ],
  viewDayOffset: 0,
  schedules: [],
  specialHours: {},
  events: []
})

// Helper states.
const editableEventsEnabled = ref(false)
const eventCountEnabled = ref(false)
const schedulesEnabled = ref(false)
const scheduleCount = ref(3)
const specialHoursEnabled = ref(false)

// Date inputs (for easier date picking).
const selectedDateInput = ref('')
const viewDateInput = ref(new Date().toISOString().split('T')[0])
const minDateInput = ref('')
const maxDateInput = ref('')

// Event handlers.
const onReady = event => console.log('ready', event)
const onViewChange = view => console.log('view-change', view)
const onEventCreate = event => {
  console.log('event-create', event)
  config.events.push(event)
}
const onEventClick = event => console.log('event-click', event)
const onEventDrag = event => console.log('event-drag', event)
const onEventDragEnd = event => console.log('event-drag-end', event)
const onEventDrop = event => console.log('event-drop', event)
const onEventResizeStart = event => console.log('event-resize-start', event)
const onEventResize = event => console.log('event-resize', event)
const onEventResizeEnd = event => console.log('event-resize-end', event)
const onCellClick = event => console.log('cell-click', event)
const onCellDrag = event => console.log('cell-drag', event)
const onCellDragEnd = event => console.log('cell-drag-end', event)

// Computed props.
// --------------------------------------------------------
// Computed calendar props.
const calendarProps = computed(() => {
  const props = { ...config }
  // Remove helper properties.
  delete props.view
  delete props.selectedDate
  delete props.viewDate
  return props
})

// Methods.
// --------------------------------------------------------
// Event actions.
const addEvent = () => {
  // Create event TODAY so it's visible in current view (for testing).
  const now = new Date()
  const start = new Date(now)
  start.setHours(10 + Math.floor(Math.random() * 6), 0, 0, 0) // Random hour between 10am and 3pm.
  const end = new Date(start.getTime() + (1 + Math.floor(Math.random() * 2)) * 60 * 60 * 1000)

  const event = {
    title: `Event ${config.events.length + 1}`,
    start,
    end,
    content: 'Sample event content',
    class: ['event-class-' + (Math.floor(Math.random() * 3) + 1)][0]
  }

  if (config.schedules.length) {
    event.schedule = Math.floor(Math.random() * config.schedules.length) + 1
  }

  config.events.push(event)
}

const addAllDayEvent = () => {
  // Create all-day event TODAY so it's visible in current view (for testing).
  const now = new Date()
  const start = new Date(now)
  start.setHours(0, 0, 0, 0)
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1)

  const event = {
    title: `All-Day Event ${config.events.filter(e => e.allDay).length + 1}`,
    start,
    end,
    allDay: true,
    class: 'all-day-event'
  }

  if (config.schedules.length) {
    event.schedule = Math.floor(Math.random() * config.schedules.length) + 1
  }

  config.events.push(event)
}

const addBackgroundEvent = () => {
  const now = new Date()
  const start = new Date(now)
  start.setHours(10, 0, 0, 0)
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000)

  const event = {
    title: `Background ${config.events.filter(e => e.background).length + 1}`,
    start,
    end,
    background: true,
    class: 'background-event'
  }

  if (config.schedules.length) {
    event.schedule = Math.floor(Math.random() * config.schedules.length) + 1
  }

  config.events.push(event)
}

const clearEvents = () => config.events = []

const loadSampleEvents = () => {
  const baseDate = config.viewDate || config.selectedDate || new Date()
  const now = baseDate instanceof Date ? baseDate : new Date(baseDate)
  const events = []

  // Add 10 regular events - deterministic day offsets (-3 to 3) so they always fall in the visible week.
  for (let i = 0; i < 10; i++) {
    const dayOffset = (i % 7) - 3
    const hourOffset = 8 + (i % 10)
    const start = new Date(now)
    start.setDate(start.getDate() + dayOffset)
    start.setHours(hourOffset, 0, 0, 0)
    const end = new Date(start.getTime() + (1 + (i % 2)) * 60 * 60 * 1000)

    const event = {
      title: `Event ${i + 1}`,
      start,
      end,
      content: `Content for event ${i + 1}`,
      class: `event-${(i % 3) + 1}`
    }

    if (config.schedules.length) event.schedule = (i % config.schedules.length) + 1

    events.push(event)
  }

  // Add 3 all-day events if enabled - deterministic days (-2, 0, 2) to ensure visibility in week view.
  if (config.allDayEvents) {
    for (let i = 0; i < 3; i++) {
      const dayOffset = (i - 1) * 2
      const start = new Date(now)
      start.setDate(start.getDate() + dayOffset)
      start.setHours(0, 0, 0, 0)
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1)

      const event = {
        title: `All-Day ${i + 1}`,
        start,
        end,
        allDay: true,
        class: 'all-day-event'
      }

      if (config.schedules.length) event.schedule = (i % config.schedules.length) + 1

      events.push(event)
    }
  }

  config.events = events
}

// Watchers.
// --------------------------------------------------------
// Watch date inputs.
watch(selectedDateInput, val => config.selectedDate = val ? new Date(val) : null)

watch(viewDateInput, val => config.viewDate = val ? new Date(val) : new Date())

watch(minDateInput, val => config.minDate = val ? new Date(val) : '')

watch(maxDateInput, val => config.maxDate = val ? new Date(val) : '')

// Watch editable events.
watch(editableEventsEnabled, val => {
  config.editableEvents = val ? { title: true, drag: true, resize: true, delete: true, create: true } : false
})

// Watch event count.
watch(eventCountEnabled, val => {
  config.eventCount = val
})

// Watch schedules.
watch([schedulesEnabled, scheduleCount], ([enabled, count]) => {
  if (enabled) {
    config.schedules = Array.from({ length: count }, (_, i) => ({
      label: `Schedule ${i + 1}`,
      class: `schedule-${i + 1}`
    }))
  }
  else config.schedules = []
})

// Watch special hours.
watch(specialHoursEnabled, enabled => {
  if (enabled) {
    config.specialHours = {
      mon: { from: 8 * 60, to: 17 * 60, class: 'special-mon', label: 'Mon Special' },
      wed: [
        { from: 8 * 60, to: 12 * 60, class: 'special-wed-am', label: 'Wed AM' },
        { from: 14 * 60, to: 18 * 60, class: 'special-wed-pm', label: 'Wed PM' }
      ],
      fri: { from: 9 * 60, to: 16 * 60, class: 'special-fri', label: 'Fri Special' }
    }
  }
  else config.specialHours = {}
})

watch(() => $waveui.theme, theme => config.dark = theme === 'dark')

// Lifecycle hooks.
// --------------------------------------------------------
setTimeout(loadSampleEvents, 500) // Initialize with some sample events.

onMounted(() => {
  config.dark = (localStorage.theme || $waveui.theme) === 'dark'
})
</script>

<style lang="scss">
.w-app:has(.page--test-comprehensive) {
  height: 100vh;
  overflow: hidden;
}
.page--test-comprehensive {
  overflow: hidden;

  ~ footer {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
    font-size: 0.8rem;
  }

  > aside {display: none;}

  main {
    padding-left: 0;
    border: none;
    overflow: hidden;
  }
}

.comprehensive-test-view {
  display: flex;
  height: 100vh;
  overflow: hidden;
  gap: 20px;

  .controls-toggle {
    position: fixed;
    top: 36px;
    right: 4px;
    z-index: 600;
  }
 &.drawer-open .controls-toggle {transform: translateY(-110%);}

  // w-switch hides its checkbox with `position: absolute; opacity: 0`, but the browser's
  // focus-triggered scroll-into-view still scrolls ancestors to bring it into view.
  // Using `position: fixed` makes the element always "in the viewport", so no scroll occurs.
  .controls-panel .w-switch input[type="checkbox"] {position: fixed;}

  .controls-panel {
    width: 350px;
    padding: 20px;
    overflow-y: auto;
    border-right: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 8%, transparent);
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background-color: color-mix(in srgb, var(--w-contrast-bg-color) 5%, transparent);

    &.w-drawer {background-color: #fff;}

    h2 {
      margin: 0 0 5px 0;
      font-size: 20px;
    }

    .subtitle {
      margin: 0 0 20px 0;
      font-size: 12px;
      color: #666;
    }
  }

  .control-sections {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .control-section h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    border-bottom: 2px solid #1976D2;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .w-button {align-self: stretch;}

  .control {
    display: flex;
    flex-direction: column;
    gap: 5px;

    // Don't override Wave UI component internals (w-switch, w-checkbox, etc.)
    label:not([class*="w-switch"]):not([class*="w-checkbox"]):not([class*="w-radio"]) {
      font-size: 13px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 5px;

      input[type="checkbox"] {margin: 0;}
    }

    input[type="text"],
    input[type="number"],
    input[type="date"],
    select {
      font-size: 13px;
    }

    button {
      padding: 8px 12px;
      background: #1976D2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;

      &:hover {background: #1565C0;}
      &:active {background: #0D47A1;}
    }
  }

  .w-checkbox__label {width: 2.5rem;}

  .calendar-wrap {
    flex: 1;
    overflow: hidden;

    .vuecal {height: 100%;}
  }

  // Event classes for testing.
  .vuecal__event.event-1 {background: #42A5F5;}
  .vuecal__event.event-2 {background: #66BB6A;}
  .vuecal__event.event-3 {background: #FFA726;}
  .vuecal__event.all-day-event {background: #AB47BC;}
  .vuecal__event.background-event {
    background: repeating-linear-gradient(45deg, transparent 0 8px, rgba(0, 0, 0, 0.08) 8px 16px);
    border: none;
  }

  .vuecal__special-hours.special-mon,
  .vuecal__special-hours.special-wed-am,
  .vuecal__special-hours.special-wed-pm,
  .vuecal__special-hours.special-fri {
    background: rgba(255, 235, 59, 0.2);
  }
}

// Media queries.
// --------------------------------------------------------
@media screen and (max-width: $xs) {
  .page--test-comprehensive {padding: 8px;}
}
</style>
