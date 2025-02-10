<template lang="pug">
.vuecal__cell(ref="cellEl" :class="classes" v-on="cellEventListeners")
  slot(
    v-if="$slots.cell"
    name="cell"
    :start="start"
    :end="end"
    :index="index"
    :events="cellEvents")

  template(v-if="specialHours")
    .vuecal__special-hours(
      v-for="(range, i) in specialHours"
      :style="range.style"
      :class="range.class"
      v-html="range.label || ''")

  template(v-if="!$slots.cell && config.schedules")
    .vuecal__schedule.vuecal__schedule--cell(
      v-for="schedule in config.schedules"
      :key="schedule.id"
      :class="schedule.class"
      :style="schedule.style || null"
      :data-schedule="schedule.id")
      template(v-if="$slots['cell-events']")
        slot(name="cell-events" :start="start" :end="end" :events="cellEvents")
      .vuecal__cell-date(v-if="formattedCellDate || $slots['cell-date']")
        slot(name="cell-date" :start="start" :end="end" :events="cellEvents") {{ formattedCellDate }}
      .vuecal__cell-content(v-if="$slots['cell-content']")
        slot(name="cell-content" :start="start" :end="end" :events="cellEvents")
      .vuecal__cell-events(v-if="$slots['cell-events'] && cellEvents.length")
        slot(
          name="cell-events"
          :start="start"
          :end="end"
          :events="cellEvents")
      //- Animate event deletions.
      transition-group.vuecal__cell-events(
        v-else-if="cellEvents.length || transitioning"
        name="vuecal-event-delete"
        @before-leave="transitioning = true"
        @after-leave="afterDelete"
        tag="div")
        event(
          v-for="event in cellEventsPerSchedule[schedule.id]"
          :key="event._.id"
          :event="event"
          @event-drag-start="emit('event-drag-start')"
          @event-drag-end="emit('event-drag-end')"
          @event-resize-start="emit('event-resize-start')"
          @event-resize-end="emit('event-resize-end')"
          @event-deleted="onEventDelete")
          template(v-if="$slots.event" #event="params")
            slot(name="event" v-bind="params")
      .vuecal__event-placeholder(
        v-if="isCreatingEvent && touch.schedule === schedule.id"
        :style="eventPlaceholder.style")
        | {{ eventPlaceholder.start }} - {{ eventPlaceholder.end }}

  template(v-if="!$slots.cell && !config.schedules")
    template(v-if="$slots['cell-events']")
      slot(name="cell-events")
    .vuecal__cell-date(v-if="formattedCellDate || $slots['cell-date']")
      slot(name="cell-date" :start="start" :end="end" :events="cellEvents") {{ formattedCellDate }}
    .vuecal__cell-content(v-if="$slots['cell-content']")
      slot(name="cell-content" :start="start" :end="end" :events="cellEvents")
    .vuecal__cell-events(v-if="$slots['cell-events'] && cellEvents.length")
      slot(
        name="cell-events"
        :start="start"
        :end="end"
        :events="cellEvents")
    //- Animate event deletions.
    transition-group.vuecal__cell-events(
      v-else-if="(cellEvents.length || transitioning) && !(view.isMonth && !config.eventsOnMonthView)"
      name="vuecal-event-delete"
      @before-leave="transitioning = true"
      @after-leave="afterDelete"
      tag="div")
      event(
        v-for="event in cellEvents"
        :key="event._.id"
        :event="event"
        @event-drag-start="emit('event-drag-start')"
        @event-drag-end="emit('event-drag-end')"
        @event-resize-start="emit('event-resize-start')"
        @event-resize-end="emit('event-resize-end')"
        @event-deleted="onEventDelete")
        template(v-if="$slots.event" #event="params")
          slot(name="event" v-bind="params")
    .vuecal__event-placeholder(v-if="isCreatingEvent" :style="eventPlaceholder.style")
      | {{ eventPlaceholder.start }} - {{ eventPlaceholder.end }}

  slot(v-if="$slots['event-count']" name="event-count" :events="cellEvents")
  .vuecal__cell-events-count(v-else-if="showCellEventsCount") {{ cellEvents.length }}

  .vuecal__now-line(
    v-if="nowLine.show"
    :style="nowLine.style"
    :title="nowLine.currentTime")
    span {{ nowLine.currentTime }}
</template>

<script setup>
import { computed, inject, nextTick, onBeforeUnmount, reactive, ref } from 'vue'
import { months, weekdays } from '@/vue-cal/core/config'
import { minutesToPercentage, percentageToMinutes } from '@/vue-cal/utils/conversions'
import Event from './event.vue'

const props = defineProps({
  // Even with time=false, the date of the cell will still be provided in order to attach
  // events to a specific date.
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  index: { type: Number, required: true }
})

// These emits are only internal to the root component.
// External emits are not using `emit` and manually call any listener handler directly (more flexible).
const emit = defineEmits([
  'cell-drag-start',
  'cell-drag-end',
  'event-drag-start',
  'event-drag-end',
  'event-resize-start',
  'event-resize-end'
])

const vuecal = inject('vuecal')
const { view, config, dateUtils, eventsManager, dnd } = vuecal
const isToday = computed(() => dateUtils.isToday(props.start))

const cellEl = ref(null)
// Store deleted events per cell and filter them out in that specific cell.
// Only delete the events for good when unmounting the cell, in order to avoid re-rendering all the
// cells in the view when deleting in the source of truth.
const eventsDeleted = ref([])
// Wait for the event deletion transition end before unmounting the events container if no event.
const transitioning = ref(false)
const onEventDelete = e => {
  eventsDeleted.value.push(e.detail)
  transitioning.value = true
}
const afterDelete = () => setTimeout(() => (transitioning.value = false), 300)

// The touch/mouse events listeners are always attached to the cell, but if the event.target is a schedule,
// display the event placeholder in that schedule.
const touch = reactive({
  dragging: false,
  holding: false, // When the cell is clicked and hold for a certain amount of time.
  holdTimer: null, // Cell click and hold detection.
  thresholdPassed: false, // If the drag threshold has been passed.
  startX: 0, // The x position at the start of the drag (mousedown or touchstart).
  startY: 0, // The y position at the start of the drag (mousedown or touchstart).
  moveX: 0,
  moveY: 0,
  startPercentageX: 0, // The x position in percentage at the start of the drag (mousedown or touchstart).
  startPercentageY: 0, // The y position in percentage at the start of the drag (mousedown or touchstart).
  movePercentageX: 0,
  movePercentageY: 0,
  schedule: null
})
const awaitingEventCreation = ref(false)

// While dragging in the cell render an event placeholder, before it becomes a normal calendar event.
// The calendar creation could be canceled for different wanted reasons at the end of dragging.
const eventPlaceholder = computed(() => {
  let startPercentage = Math.min(touch.startPercentageY, touch.movePercentageY)
  let endPercentage = Math.max(touch.startPercentageY, touch.movePercentageY)
  let startMinutes = percentageToMinutes(startPercentage, config)
  let endMinutes = percentageToMinutes(endPercentage, config)

  // Snap the event to the nearest interval if set.
  if (config.snapToInterval) {
    startMinutes = dateUtils.snapToInterval(startMinutes, config.snapToInterval)
    endMinutes = dateUtils.snapToInterval(endMinutes, config.snapToInterval)
    startPercentage = minutesToPercentage(startMinutes, config)
    endPercentage = minutesToPercentage(endMinutes, config)
  }

  return {
    style: {
      top: startPercentage + '%',
      height: Math.abs(endPercentage - startPercentage) + '%'
    },
    startMinutes,
    endMinutes,
    start: dateUtils.formatMinutes(startMinutes),
    end: dateUtils.formatMinutes(endMinutes),
    ...(touch.schedule ? { schedule: touch.schedule } : {})
  }
})

const isCreatingEvent = computed(() => {
  const isCreating = config.editableEvents.create && (touch.dragging || awaitingEventCreation.value)
  const hasPassedMinDrag = ((config.eventCreateMinDrag && touch.thresholdPassed) || !config.eventCreateMinDrag)
  return isCreating && hasPassedMinDrag
})

const classes = computed(() => {
  const now = new Date()
  const viewYear = view.start.getFullYear()
  const viewMonth = view.start.getMonth()
  const y = props.start.getFullYear()
  const m = props.start.getMonth()
  const weekday = weekdays[props.start.getDay()]

  return {
    [`vuecal__cell--${weekday}`]: view.isDay || view.isDays || view.isWeek || view.isMonth,
    [`vuecal__cell--${months[m]}`]: view.isYear,
    [`vuecal__cell--${y}`]: view.isYears,
    'vuecal__cell--today': isToday.value,
    'vuecal__cell--current-month': view.isYear && y === now.getFullYear() && m === now.getMonth(),
    'vuecal__cell--current-year': view.isYears && y === now.getFullYear(),
    'vuecal__cell--out-of-range': view.isMonth && (y !== viewYear || m !== viewMonth),
    'vuecal__cell--before-min': isDisabled.value && isBeforeMinDate.value,
    'vuecal__cell--after-max': isDisabled.value && isAfterMaxDate.value,
    'vuecal__cell--disabled': isDisabled.value,
    'vuecal__cell--selected': view.selectedDate && view.selectedDate.getTime() >= props.start.getTime() && view.selectedDate.getTime() <= props.end.getTime(),
    'vuecal__cell--has-schedules': config.schedules?.length,
    'vuecal__cell--dragging': touch.dragging,
    'vuecal__cell--has-events': cellEvents.value.length
  }
})

// Note: This will recompute when the locale changes (from formatDate) or xs prop changes for instance.
// So it needs to be a distinct computed from the events.
const formattedCellDate = computed(() => {
  // ! \ IMPORTANT NOTE:
  // If the selectedDate prop would be added to the vuecal.view, any click on any cell
  // (triggering an emit of the selectedDate), would trigger a rerendering of all the
  // cells of the view. The following marker is here to monitor that this does not happen
  // with any prop while developing.
  console.log('recomputing cell') // @todo: remove this marker after dev.

  switch (view.id) {
    case 'day':
      return ''
    case 'days':
      if (config.availableViews.days.rows > 1) dateUtils.formatDate(props.start, 'D')
      return ''
    case 'week':
      return ''
    case 'month':
      return dateUtils.formatDate(props.start, 'D')
    case 'year':
      return dateUtils.formatDate(props.start, config.xs ? 'MMM' : 'MMMM')
    case 'years':
      return dateUtils.formatDate(props.start, 'YYYY')
  }
})

const cellEvents = computed(() => {
  if (config.datePicker) return []
  return (view.events[dateUtils.formatDate(props.start)] || [])
    .map(eventsManager.getEvent)
    .filter(event => !eventsDeleted.value.includes(event._.id))
})

/**
 * Generates an object containing events grouped by schedule ID.
 *
 * @returns {Object} An object where keys are schedule IDs, and values are arrays of event IDs
 *                   that correspond to each schedule.
 */
const cellEventsPerSchedule = computed(() => {
  return config.schedules?.reduce((obj, schedule) => {
    obj[schedule.id] = cellEvents.value.filter(event => event.schedule === schedule.id)
    return obj
  }, {})
})

const showCellEventsCount = computed(() => {
  return view.isMonth && config.eventCount && !config.eventsOnMonthView && cellEvents.value.length
})

/**
 * The special hours of the current cell day.
 * returns an array if the view is day, days, week and the specialHours prop is set correctly.
 */
const specialHours = computed(() => {
  if (!config.specialHours || view.isMonth || view.isYear || view.isYears) return
  const weekday = weekdays[props.start.getDay()]

  // The special hours ranges for the current cell day.
  let daySpecialHours = config.specialHours?.[weekday]
  if (!daySpecialHours) return

  if (!Array.isArray(daySpecialHours)) daySpecialHours = [daySpecialHours]

  // Foreach of the given ranges, return an object with CSS positioning in percentage.
  return daySpecialHours.map(dayRanges => {
    let { from, to, class: classes, label } = dayRanges

    // Return if the special hours are incorrect or completely out of range.
    if (isNaN(from) || isNaN(to) || config.timeFrom >= to || config.timeTo <= from) return

    from = Math.max(config.timeFrom, from) // Ensure that from is in range.
    to = Math.min(config.timeTo, to) // Ensure that to is in range.

    const top = minutesToPercentage(from, config)
    const height = minutesToPercentage(to, config) - top

    return {
      style: { top: `${top}%`, height: `${height}%` },
      label,
      class: classes
    }
  }).filter(specialRanges => !!specialRanges)
})

const isBeforeMinDate = computed(() => {
  return config.minTimestamp !== null && config.minTimestamp > props.end.getTime()
})

const isAfterMaxDate = computed(() => {
  return config.maxTimestamp && config.maxTimestamp < props.start.getTime()
})

// Is the current cell disabled or not (disabled date or before min date or after max date).
const isDisabled = computed(() => {
  const { disableDays } = config
  const isYearsOrYearView = view.isYear || view.isYears
  if (disableDays.length && disableDays.includes(dateUtils.formatDate(props.start)) && !isYearsOrYearView) return true
  return isBeforeMinDate.value || isAfterMaxDate.value
})

// Draw a line in today's cell at the exact current time.
const nowLine = reactive({
  show: computed(() => {
    if (!view.isDay && !view.isDays && !view.isWeek) return
    if (!isToday.value || !config.time) return
    if (config.timeFrom > dateUtils.dateToMinutes(view.now)) return
    if (dateUtils.dateToMinutes(view.now) > config.timeTo) return
    return true
  }),
  nowInMinutes: computed(() => dateUtils.dateToMinutes(view.now)),
  todaysTimePosition: computed(() => minutesToPercentage(nowLine.nowInMinutes, config)),
  style: computed(() => `top: ${nowLine.todaysTimePosition}%`),
  currentTime: computed(() => dateUtils.formatTime(view.now))
})

// Automatically forwards any event listener attached to vuecal starting with @cell- to the cell.
const cellEventListeners = computed(() => {
  if (isDisabled.value) return {} // If the cell is disabled, completely disable any interaction.

  const eventListeners = { ...config.eventListeners.cell }

  // Inject the cell details in each eventListener handler call as 2nd param.
  Object.entries(eventListeners).forEach(([eventListener, handler]) => {
    eventListeners[eventListener] = e => {
      // When interacting with an event, skip calling the cell DOM event handler.
      // The DOM event bubbles up to the cell from the event but we don't stop it on purpose so
      // we can receive the on mouseup from the document and stop event drag&drop.
      if ((e.target || e.e?.target).closest?.('.vuecal__event')) return

      // Check if e.type to not rewrap the DOM event in an object if already done.
      handler(e.type ? { e, cell: cellInfo.value, cursor: cursorInfo.value } : e)
    }
  })

  // Store a copy of any potential external handler to combine with internal handlers like click,
  // touchstart, mousedown.
  const externalHandlers = { ...eventListeners }

  // `cell-delayed-click` is only fired after 400ms if there was no dblclick.
  let clickTimeout = null
  eventListeners.click = e => {
    onCellClick()
    externalHandlers.click?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })

    if (clickTimeout) clickTimeout = clearTimeout(clickTimeout)
    else {
      clickTimeout = setTimeout(() => {
        clickTimeout = null
        // Handle delayed single click.
        externalHandlers['delayed-click']?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
      }, 400)
    }
  }

  if (config.time && view.isDay || view.isDays || view.isWeek) {
    eventListeners.touchstart = e => {
      onMousedown(e.e || e)
      externalHandlers.touchstart?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
    }
    eventListeners.mousedown = e => {
      onMousedown(e.e || e)

      externalHandlers.mousedown?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
    }
  }

  // @todo: detach the listeners on unmount.
  eventListeners.dragenter = e => dnd.cellDragEnter(e, cellInfo.value)
  eventListeners.dragover = e => dnd.cellDragOver(e, cellInfo.value)
  eventListeners.dragleave = e => dnd.cellDragLeave(e, cellInfo.value)
  eventListeners.drop = e => dnd.cellDragDrop(e, cellInfo.value)

  return eventListeners
})

const cellInfo = computed(() => ({
  start: props.start,
  end: props.end,
  events: cellEvents,
  ...(touch.schedule ? { schedule: touch.schedule } : {})
}))

// Get cursor information including position and date.
const cursorInfo = computed(() => {
  const minutes = percentageToMinutes(touch.movePercentageY || touch.startPercentageY, config)
  const date = new Date(props.start)
  date.setMinutes(minutes)

  return {
    x: touch.movePercentageX || touch.startPercentageX,
    y: touch.movePercentageY || touch.startPercentageY,
    date
  }
})

// Functions.
// --------------------------------------------------------
const onCellClick = () => {
  view.updateSelectedDate(props.start)
  view.updateViewDate(props.start)

  if (config.clickToNavigate) {
    if ((view.isMonth || view.isDays || view.isWeek) && config.availableViews.day) view.switch('day')
    else if (view.isYear && config.availableViews.month) view.switch('month')
    else if (view.isYears && config.availableViews.year) view.switch('year')
    view.updateViewDate(props.start)
  }
}

// On mousedown OR TOUCHSTART of the cell.
const onMousedown = e => {
  touch.schedule = ~~e.target.dataset.schedule
  const rect = cellEl.value.getBoundingClientRect()
  touch.startX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
  touch.startY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
  touch.startPercentageX = touch.startX * 100 / rect.width
  touch.startPercentageY = touch.startY * 100 / rect.height
  touch.thresholdPassed = false

  document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', onDocMousemove)
  document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', onDocMouseup, { once: true })

  touch.holdTimer = setTimeout(() => {
    touch.holding = true
    // If there's a @cell-hold external listener, call it.
    cellEventListeners.value.hold?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
  }, 1000)
}

const onDocMousemove = e => {
  // Internal emit to the root component to add a CSS class on wrapper while dragging.
  if (!touch.dragging) {
    emit('cell-drag-start')

    // If there's a @cell-drag-start external listener, call it.
    cellEventListeners.value.dragStart?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
  }
  touch.dragging = true
  touch.holdTimer = clearTimeout(touch.holdTimer)
  touch.holding = false

  const rect = cellEl.value.getBoundingClientRect()
  touch.moveX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
  touch.moveY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
  touch.movePercentageX = touch.moveX * 100 / rect.width
  touch.movePercentageY = touch.moveY * 100 / rect.height
  if (config.eventCreateMinDrag && (Math.abs(touch.startY - touch.moveY) > config.eventCreateMinDrag)) {
    touch.thresholdPassed = true
  }

  // If there's a @cell-drag external listener, call it.
  cellEventListeners.value.drag?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
}

const onDocMouseup = async e => {
  document.removeEventListener(e.type === 'touchend' ? 'touchmove' : 'mousemove', onDocMousemove, { passive: false })

  if (touch.dragging) {
    // If there's a @cell-drag-end external listener, call it.
    cellEventListeners.value.dragEnd?.({ e, cell: cellInfo.value, cursor: cursorInfo.value })
    emit('cell-drag-end') // Internal emit to the root to add a CSS class on wrapper while dragging.

    if (config.editableEvents.create) {
      awaitingEventCreation.value = true
      await createEventIfAllowed(e)
      awaitingEventCreation.value = false
    }
  }

  touch.holdTimer = clearTimeout(touch.holdTimer)
  touch.holding = false
  touch.dragging = false
  touch.startX = 0
  touch.startY = 0
  touch.moveX = 0
  touch.moveY = 0
  touch.startPercentageX = 0
  touch.startPercentageY = 0
  touch.movePercentageX = 0
  touch.movePercentageY = 0
  touch.thresholdPassed = false
  touch.schedule = null
}

const createEventIfAllowed = async e => {
  if (!isCreatingEvent.value) return

  let { start, end, startMinutes, endMinutes } = eventPlaceholder.value
  start = new Date(props.start)
  start.setMinutes(startMinutes)
  end = new Date(props.start)
  end.setMinutes(endMinutes)

  let eventToCreate = { ...eventPlaceholder.value, start, end }

  // If there's a @event-create listener, call it and check if it returns true to accept the event
  // creation or false to cancel it. If no listener, create the event.
  // The call to the handler is wrapped in a promise so the user may open an event editor and modify
  // the event before sending in back and resolving the promise.
  const { create: createListener } = config.eventListeners.event

  if (typeof createListener === 'function') {
    const eventCopy = eventToCreate
    eventToCreate = await new Promise(resolve => createListener({ e, event: eventToCreate, cell: cellInfo.value, resolve, cursor: cursorInfo.value }))
    // eventToCreate may be true, false or an updated event object to create.
    if (eventToCreate && typeof eventToCreate === 'object') view.createEvent(eventToCreate)
    if (eventToCreate && typeof eventToCreate === 'boolean') view.createEvent(eventCopy)
  }
  else view.createEvent(eventToCreate)
}

onBeforeUnmount(async () => {
  // Removing the calendar events will trigger a rerender of all the cells in the view because the array
  // of events is a reactive object. So only remove them from the source of truth when the cell is unmounted.
  eventsDeleted.value.forEach(eventId => eventsManager.deleteEvent(eventId, 3))
  await nextTick() // Batch updates to avoid multiple re-renders.
})
</script>

<style lang="scss">
.vuecal__cell {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  touch-action: none; // Prevents browser default touch handling.

  .vuecal__scrollable--days-view &,
  .vuecal__scrollable--week-view & {min-width: var(--vuecal-min-cell-width, 0);}

  &--has-schedules {align-items: stretch;}
  &--out-of-range {opacity: 0.4;}
  &--disabled {cursor: not-allowed;}
}

.vuecal__special-hours {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  pointer-events: none; // Under the day schedules if enabled.
}

.vuecal__now-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 0;
  border-top: 1px solid;
  border-color: rgba(red, 0.6);
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: 0;
    border: 5px solid transparent;
    border-left-color: inherit;
  }

  span {
    position: absolute;
    right: 1px;
    font-size: 10px;
    opacity: 0.7;
    pointer-events: none; // Let interactions go through on events.
  }
}

.vuecal__scrollable--day-view {
  .vuecal__cell--today:before,
  .vuecal__cell--selected:before {display: none;}
}

.vuecal__event-placeholder {
  background-color: rgb(35, 181, 181);
  position: absolute;
  left: 0;
  right: 0;
  padding-top: 2px;
  padding-left: 4px;
  border-radius: 4px;
  font-size: 11px;
  line-height: 1;
}
</style>
