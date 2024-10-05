<template lang="pug">
.vuecal__cell(ref="cellEl" :class="classes" v-on="cellEventListeners")
  template(v-if="$slots.cell")
    slot(name="cell" :start="start" :end="end" :index="index" :events="cellEvents")
  template(v-else-if="config.daySplits")
    .vuecal__cell-split(v-for="(split, i) in config.daySplits" :key="i" :class="split.class")
      template(v-if="$slots['cell-events']")
        slot(name="cell-events" :start="start" :end="end" :events="cellEvents")
      .vuecal__cell-date(v-if="formattedCellDate || $slots['cell-date']")
        slot(name="cell-date" :start="start" :end="end" :events="cellEvents") {{ formattedCellDate }}
      .vuecal__cell-content(v-if="$slots['cell-content']")
        slot(name="cell-content" :start="start" :end="end" :events="cellEvents")
      .vuecal__cell-events(v-if="cellEvents.length")
        slot(
          v-if="$slots['cell-events']"
          name="cell-events"
          :start="start"
          :end="end"
          :events="cellEvents")
        template(v-else)
          event(v-for="eventId in cellEvents" :key="eventId" :id="eventId")
  template(v-else-if="!config.daySplits")
    template(v-if="$slots['cell-events']")
      slot(name="cell-events")
    .vuecal__cell-date(v-if="formattedCellDate || $slots['cell-date']")
      slot(name="cell-date" :start="start" :end="end" :events="cellEvents") {{ formattedCellDate }}
    .vuecal__cell-content(v-if="$slots['cell-content']")
      slot(name="cell-content" :start="start" :end="end" :events="cellEvents")
    .vuecal__cell-events(v-if="cellEvents.length")
      slot(
        v-if="$slots['cell-events']"
        name="cell-events"
        :start="start"
        :end="end"
        :events="cellEvents")
      template(v-else)
        event(v-for="eventId in cellEvents" :key="eventId" :id="eventId")

  .vuecal__event-placeholder(v-if="touch.dragging" :style="touch.newEventStyle")
  template(v-if="specialHours")
    .vuecal__special-hours(
      v-for="(range, i) in specialHours"
      :style="range.style"
      :class="range.class"
      v-html="range.label || ''")
  .vuecal__now-line(
    v-if="nowLine.show"
    :style="nowLine.style"
    :title="nowLine.currentTime")
    span {{ nowLine.currentTime }}
</template>

<script setup>
import { computed, inject, reactive, ref } from 'vue'
import { months, weekdays } from '@/vue-cal/core/config'
import Event from './event.vue'

const props = defineProps({
  // Even with time=false, the date of the cell will still be provided in order to attach
  // events to a specific date.
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  index: { type: Number, required: true }
})

const vuecal = inject('vuecal')
const { view, config, dateUtils, eventsManager } = vuecal
const isToday = computed(() => dateUtils.isToday(props.start))

const cellEl = ref(null)
const touch = reactive({
  dragging: false,
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0,
  startPercentageX: 0,
  startPercentageY: 0,
  movePercentageX: 0,
  movePercentageY: 0,
  newEventStyle: computed(() => ({
    top: Math.min(touch.startPercentageY, touch.movePercentageY) + '%',
    height: Math.abs(touch.movePercentageY - touch.startPercentageY) + '%'
  }))
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
    'vuecal__cell--selected': view.selectedDate && view.selectedDate.getTime() >= props.start.getTime() && view.selectedDate.getTime() <= props.end.getTime(),
    'vuecal__cell--has-splits': config.daySplits,
    'vuecal__cell--has-events': false
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
  if (config.datePicker || config.xs) return []
  return view.events[dateUtils.formatDate(props.start)] || []
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

    const top = minutesToPercentage(from)
    const height = minutesToPercentage(to) - top

    return {
      style: { top: top + '%', height: height + '%' },
      label,
      class: classes
    }
  }).filter(specialRanges => !!specialRanges)
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
  todaysTimePosition: computed(() => minutesToPercentage(nowLine.nowInMinutes)),
  style: computed(() => `top: ${nowLine.todaysTimePosition}%`),
  currentTime: computed(() => dateUtils.formatTime(view.now))
})

/**
 * Converts minutes in the day to a percentage position.
 *
 * @param {Number} minutes time in minutes
 */
const minutesToPercentage = minutes => {
  const dayRangeMinutes = config.timeTo - config.timeFrom
  return (minutes - config.timeFrom) * 100 / dayRangeMinutes
}

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

const trackMousemove = e => {
  const rect = cellEl.value.getBoundingClientRect()
  touch.startX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
  touch.startY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
  touch.startPercentageX = touch.startX * 100 / rect.width
  touch.startPercentageY = touch.startY * 100 / rect.height

  document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', onDocMousemove)
  document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', onDocMouseup, { once: true })
}

const onDocMousemove = e => {
  touch.dragging = true
  const rect = cellEl.value.getBoundingClientRect()
  touch.moveX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
  touch.moveY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
  touch.movePercentageX = touch.moveX * 100 / rect.width
  touch.movePercentageY = touch.moveY * 100 / rect.height
}

const onDocMouseup = e => {
  touch.dragging = false
  touch.startX = 0
  touch.startY = 0
  touch.moveX = 0
  touch.moveY = 0
  touch.startPercentageX = 0
  touch.startPercentageY = 0
  touch.movePercentageX = 0
  touch.movePercentageY = 0
  touch.newEventStyle.value = {}

  document.removeEventListener(e.type === 'touchmove' ? 'touchmove' : 'mousemove', onDocMousemove)
}

// Automatically forwards any event listener attached to vuecal starting with @cell- to the cell.
const cellEventListeners = computed(() => {
  const eventListeners = { ...config.eventListeners.cell }

  // Inject the cell details in each eventListener handler call as 2nd param.
  Object.entries(eventListeners).forEach(([eventListener, handler]) => {
    eventListeners[eventListener] = e => handler(e, { start: props.start, end: props.end, events: cellEvents })
  })

  // Store a potential onclick to combine with internal onclick, below.
  const externalOnClick = eventListeners.click

  eventListeners.click = e => {
    onCellClick({ start: props.start, end: props.end }, e)
    externalOnClick?.(e)
  }

  eventListeners.touchstart = trackMousemove
  eventListeners.mousedown = trackMousemove

  return eventListeners
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

  &--has-splits {align-items: stretch;}
  &--out-of-range {opacity: 0.5;}
}

.vuecal__special-hours {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 0;
  right: 0;
  z-index: -1; // Under the day splits if enabled.
}

.vuecal__now-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 0;
  border-top: 1px solid;
  border-color: red;
  opacity: 0.6;
  z-index: 1;

  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: 0;
    border: 5px solid transparent;
    border-left-color: inherit;
  }

  &:after {
    content: "";
    position: absolute;
    inset: -6px 0;
  }

  span {
    position: absolute;
    right: 1px;
    font-size: 10px;
    opacity: 0.7;
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
}
</style>
