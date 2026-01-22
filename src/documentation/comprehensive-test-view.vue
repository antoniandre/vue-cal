<template lang="pug">
.comprehensive-test-view
  .controls-panel
    h2 Vue Cal - Comprehensive Test View
    p.subtitle All Props Testing Interface

    .control-sections
      //- Basic Props
      section.control-section
        h3 Basic Props
        .controls
          .control
            label view:
            select(v-model="config.view" data-testid="view-select")
              option(value="years") Years
              option(value="year") Year
              option(value="month") Month
              option(value="week") Week
              option(value="day") Day
              option(value="days") Days

          .control
            label selectedDate:
            input(type="date" v-model="selectedDateInput" data-testid="selected-date-input")

          .control
            label viewDate:
            input(type="date" v-model="viewDateInput" data-testid="view-date-input")

          .control
            label locale:
            select(v-model="config.locale" data-testid="locale-select")
              option(value="") Default (en-us)
              option(value="fr") French
              option(value="es") Spanish
              option(value="de") German
              option(value="it") Italian
              option(value="ja") Japanese
              option(value="zh-cn") Chinese

          .control
            label minDate:
            input(type="date" v-model="minDateInput" data-testid="min-date-input")

          .control
            label maxDate:
            input(type="date" v-model="maxDateInput" data-testid="max-date-input")

          .control
            label
              input(type="checkbox" v-model="config.startWeekOnSunday" data-testid="start-week-sunday")
              | startWeekOnSunday

          .control
            label
              input(type="checkbox" v-model="config.todayButton" data-testid="today-button")
              | todayButton

          .control
            label
              input(type="checkbox" v-model="config.titleBar" data-testid="title-bar")
              | titleBar

          .control
            label
              input(type="checkbox" v-model="config.viewsBar" data-testid="views-bar")
              | viewsBar

          .control
            label
              input(type="checkbox" v-model="config.clickToNavigate" data-testid="click-to-navigate")
              | clickToNavigate

          .control
            label
              input(type="checkbox" v-model="config.watchRealTime" data-testid="watch-real-time")
              | watchRealTime

          .control
            label
              input(type="checkbox" v-model="config.weekNumbers" data-testid="week-numbers")
              | weekNumbers

      //- Display Props
      section.control-section
        h3 Display Props
        .controls
          .control
            label theme:
            select(v-model="config.theme" data-testid="theme-select")
              option(value="default") Default
              option(:value="false") None

          .control
            label
              input(type="checkbox" v-model="config.dark" data-testid="dark-mode")
              | dark

          .control
            label
              input(type="checkbox" v-model="config.sm" data-testid="sm-size")
              | sm (small)

          .control
            label
              input(type="checkbox" v-model="config.xs" data-testid="xs-size")
              | xs (extra small)

          .control
            label
              input(type="checkbox" v-model="config.datePicker" data-testid="date-picker")
              | datePicker

          .control
            label
              input(type="checkbox" v-model="config.horizontal" data-testid="horizontal")
              | horizontal

      //- Time Props
      section.control-section
        h3 Time Props
        .controls
          .control
            label
              input(type="checkbox" v-model="config.time" data-testid="time-enabled")
              | time

          .control
            label timeFrom (minutes):
            input(type="number" v-model.number="config.timeFrom" min="0" max="1440" step="60" data-testid="time-from")

          .control
            label timeTo (minutes):
            input(type="number" v-model.number="config.timeTo" min="0" max="1440" step="60" data-testid="time-to")

          .control
            label timeStep (minutes):
            input(type="number" v-model.number="config.timeStep" min="1" max="120" data-testid="time-step")

          .control
            label timeCellHeight (px):
            input(type="number" v-model.number="config.timeCellHeight" min="20" max="100" data-testid="time-cell-height")

          .control
            label
              input(type="checkbox" v-model="config.twelveHour" data-testid="twelve-hour")
              | twelveHour

          .control
            label
              input(type="checkbox" v-model="config.timeAtCursor" data-testid="time-at-cursor")
              | timeAtCursor

          .control
            label timeFormat:
            input(type="text" v-model="config.timeFormat" placeholder="HH:mm" data-testid="time-format")

      //- Event Props
      section.control-section
        h3 Event Props
        .controls
          .control
            label
              input(type="checkbox" v-model="config.allDayEvents" data-testid="all-day-events")
              | allDayEvents

          .control
            label
              input(type="checkbox" v-model="config.multidayEvents" data-testid="multiday-events")
              | multidayEvents

          .control
            label
              input(type="checkbox" v-model="config.eventsOnMonthView" data-testid="events-on-month-view")
              | eventsOnMonthView

          .control
            label
              input(type="checkbox" v-model="config.stackEvents" data-testid="stack-events")
              | stackEvents

          .control
            label
              input(type="checkbox" v-model="editableEventsEnabled" data-testid="editable-events")
              | editableEvents

          .control
            label
              input(type="checkbox" v-model="eventCountEnabled" data-testid="event-count")
              | eventCount

          .control
            label eventCreateMinDrag (px):
            input(type="number" v-model.number="config.eventCreateMinDrag" min="0" max="100" data-testid="event-create-min-drag")

          .control
            label snapToInterval (minutes):
            input(type="number" v-model.number="config.snapToInterval" min="0" max="60" data-testid="snap-to-interval")

      //- Weekday Props
      section.control-section
        h3 Weekday Props
        .controls
          .control
            label
              input(type="checkbox" v-model="config.hideWeekends" data-testid="hide-weekends")
              | hideWeekends

          .control
            label hideWeekdays:
            .checkbox-group
              label(v-for="day in [1,2,3,4,5,6,7]" :key="day")
                input(type="checkbox" :value="day" v-model="config.hideWeekdays" :data-testid="`hide-weekday-${day}`")
                | {{ ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][day-1] }}

          .control
            label disableDays:
            .checkbox-group
              label(v-for="day in [1,2,3,4,5,6,7]" :key="day")
                input(type="checkbox" :value="day" v-model="config.disableDays" :data-testid="`disable-day-${day}`")
                | {{ ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][day-1] }}

          .control
            label viewDayOffset:
            input(type="number" v-model.number="config.viewDayOffset" min="0" max="6" data-testid="view-day-offset")

      //- Schedules & Special Hours
      section.control-section
        h3 Schedules & Special Hours
        .controls
          .control
            label
              input(type="checkbox" v-model="schedulesEnabled" data-testid="schedules-enabled")
              | Enable Schedules

          .control(v-if="schedulesEnabled")
            label Number of Schedules:
            input(type="number" v-model.number="scheduleCount" min="1" max="10" data-testid="schedule-count")

          .control
            label
              input(type="checkbox" v-model="specialHoursEnabled" data-testid="special-hours-enabled")
              | Enable Special Hours

      //- Event Actions
      section.control-section
        h3 Event Actions
        .controls
          button(@click="addEvent" data-testid="add-event-btn") Add Random Event
          button(@click="addAllDayEvent" data-testid="add-all-day-event-btn") Add All-Day Event
          button(@click="clearEvents" data-testid="clear-events-btn") Clear All Events
          button(@click="loadSampleEvents" data-testid="load-sample-events-btn") Load Sample Events

  .calendar-container
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
import { ref, reactive, computed, watch } from 'vue'
import { VueCal, addDatePrototypes } from '@/vue-cal'

addDatePrototypes()

const vueCalRef = ref(null)

// Config state
const config = reactive({
  view: 'week',
  selectedDate: null,
  viewDate: new Date(),
  locale: '',
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
  disableDays: [],
  viewDayOffset: 0,
  schedules: [],
  specialHours: {},
  events: []
})

// Helper states
const editableEventsEnabled = ref(false)
const eventCountEnabled = ref(false)
const schedulesEnabled = ref(false)
const scheduleCount = ref(3)
const specialHoursEnabled = ref(false)

// Date inputs (for easier date picking)
const selectedDateInput = ref('')
const viewDateInput = ref(new Date().toISOString().split('T')[0])
const minDateInput = ref('')
const maxDateInput = ref('')

// Watch date inputs
watch(selectedDateInput, (val) => {
  config.selectedDate = val ? new Date(val) : null
})

watch(viewDateInput, (val) => {
  config.viewDate = val ? new Date(val) : new Date()
})

watch(minDateInput, (val) => {
  config.minDate = val ? new Date(val) : ''
})

watch(maxDateInput, (val) => {
  config.maxDate = val ? new Date(val) : ''
})

// Watch editable events
watch(editableEventsEnabled, (val) => {
  config.editableEvents = val ? { title: true, drag: true, resize: true, delete: true, create: true } : false
})

// Watch event count
watch(eventCountEnabled, (val) => {
  config.eventCount = val
})

// Watch schedules
watch([schedulesEnabled, scheduleCount], ([enabled, count]) => {
  if (enabled) {
    config.schedules = Array.from({ length: count }, (_, i) => ({
      label: `Schedule ${i + 1}`,
      class: `schedule-${i + 1}`
    }))
  } else {
    config.schedules = []
  }
})

// Watch special hours
watch(specialHoursEnabled, (enabled) => {
  if (enabled) {
    config.specialHours = {
      mon: { from: 8 * 60, to: 17 * 60, class: 'special-mon', label: 'Mon Special' },
      wed: [
        { from: 8 * 60, to: 12 * 60, class: 'special-wed-am', label: 'Wed AM' },
        { from: 14 * 60, to: 18 * 60, class: 'special-wed-pm', label: 'Wed PM' }
      ],
      fri: { from: 9 * 60, to: 16 * 60, class: 'special-fri', label: 'Fri Special' }
    }
  } else {
    config.specialHours = {}
  }
})

// Computed calendar props
const calendarProps = computed(() => {
  const props = { ...config }
  // Remove helper properties
  delete props.view
  delete props.selectedDate
  delete props.viewDate
  return props
})

// Event handlers
const onReady = (event) => {
  console.log('ready', event)
}

const onViewChange = (view) => {
  console.log('view-change', view)
}

const onEventCreate = (event) => {
  console.log('event-create', event)
  config.events.push(event)
}

const onEventClick = (event) => {
  console.log('event-click', event)
}

const onEventDrag = (event) => {
  console.log('event-drag', event)
}

const onEventDragEnd = (event) => {
  console.log('event-drag-end', event)
}

const onEventDrop = (event) => {
  console.log('event-drop', event)
}

const onEventResizeStart = (event) => {
  console.log('event-resize-start', event)
}

const onEventResize = (event) => {
  console.log('event-resize', event)
}

const onEventResizeEnd = (event) => {
  console.log('event-resize-end', event)
}

const onCellClick = (event) => {
  console.log('cell-click', event)
}

const onCellDrag = (event) => {
  console.log('cell-drag', event)
}

const onCellDragEnd = (event) => {
  console.log('cell-drag-end', event)
}

// Event actions
const addEvent = () => {
  const now = new Date()
  const start = new Date(now.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)
  start.setMinutes(0, 0, 0)
  const end = new Date(start.getTime() + (1 + Math.floor(Math.random() * 3)) * 60 * 60 * 1000)

  const event = {
    title: `Event ${config.events.length + 1}`,
    start,
    end,
    content: 'Sample event content',
    class: ['event-class-' + (Math.floor(Math.random() * 3) + 1)][0]
  }

  if (config.schedules.length > 0) {
    event.schedule = Math.floor(Math.random() * config.schedules.length) + 1
  }

  config.events.push(event)
}

const addAllDayEvent = () => {
  const now = new Date()
  const start = new Date(now.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000)
  start.setHours(0, 0, 0, 0)
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1)

  const event = {
    title: `All-Day Event ${config.events.filter(e => e.allDay).length + 1}`,
    start,
    end,
    allDay: true,
    class: 'all-day-event'
  }

  if (config.schedules.length > 0) {
    event.schedule = Math.floor(Math.random() * config.schedules.length) + 1
  }

  config.events.push(event)
}

const clearEvents = () => {
  config.events = []
}

const loadSampleEvents = () => {
  const now = new Date()
  const events = []

  // Add 10 regular events
  for (let i = 0; i < 10; i++) {
    const dayOffset = Math.floor(Math.random() * 7) - 3
    const hourOffset = Math.floor(Math.random() * 10) + 8
    const start = new Date(now)
    start.setDate(start.getDate() + dayOffset)
    start.setHours(hourOffset, 0, 0, 0)
    const end = new Date(start.getTime() + (1 + Math.floor(Math.random() * 2)) * 60 * 60 * 1000)

    const event = {
      title: `Event ${i + 1}`,
      start,
      end,
      content: `Content for event ${i + 1}`,
      class: `event-${(i % 3) + 1}`
    }

    if (config.schedules.length > 0) {
      event.schedule = (i % config.schedules.length) + 1
    }

    events.push(event)
  }

  // Add 3 all-day events if enabled
  if (config.allDayEvents) {
    for (let i = 0; i < 3; i++) {
      const dayOffset = Math.floor(Math.random() * 7) - 3
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

      if (config.schedules.length > 0) {
        event.schedule = (i % config.schedules.length) + 1
      }

      events.push(event)
    }
  }

  config.events = events
}

// Initialize with some sample events
setTimeout(() => {
  loadSampleEvents()
}, 500)
</script>

<style lang="scss" scoped>
.comprehensive-test-view {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.controls-panel {
  width: 350px;
  padding: 20px;
  background: #f5f5f5;
  overflow-y: auto;
  border-right: 1px solid #ddd;

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

.control-section {
  h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    padding-bottom: 5px;
    border-bottom: 2px solid #1976D2;
  }
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control {
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 13px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;

    input[type="checkbox"] {
      margin: 0;
    }
  }

  input[type="text"],
  input[type="number"],
  input[type="date"],
  select {
    padding: 5px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 13px;

    &:focus {
      outline: none;
      border-color: #1976D2;
    }
  }

  button {
    padding: 8px 12px;
    background: #1976D2;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;

    &:hover {
      background: #1565C0;
    }

    &:active {
      background: #0D47A1;
    }
  }
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 5px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;

  label {
    font-size: 12px;
    font-weight: normal;
  }
}

.calendar-container {
  flex: 1;
  padding: 20px;
  overflow: auto;

  .vuecal {
    height: calc(100vh - 40px);
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .controls-panel {
    background: #2a2a2a;
    border-right-color: #444;

    h2, h3 {
      color: #fff;
    }

    .subtitle {
      color: #aaa;
    }
  }

  .control {
    label {
      color: #ddd;
    }

    input[type="text"],
    input[type="number"],
    input[type="date"],
    select {
      background: #333;
      border-color: #555;
      color: #ddd;
    }
  }

  .checkbox-group {
    background: #333;
    border-color: #555;

    label {
      color: #ddd;
    }
  }
}

// Event classes for testing
:deep(.event-1) {
  background: #42A5F5;
}

:deep(.event-2) {
  background: #66BB6A;
}

:deep(.event-3) {
  background: #FFA726;
}

:deep(.all-day-event) {
  background: #AB47BC;
}

:deep(.special-mon),
:deep(.special-wed-am),
:deep(.special-wed-pm),
:deep(.special-fri) {
  background: rgba(255, 235, 59, 0.2);
}
</style>
