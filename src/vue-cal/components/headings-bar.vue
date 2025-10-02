<template lang="pug">
.vuecal__headings(v-if="showHeadings")
  .vuecal__weekdays-headings(v-if="!view.isDay")
    .vuecal__weekday(
      v-for="(day, i) in weekDays"
      :key="i"
      @click="domEvents.click(day.date)"
      :class="{ 'vuecal__weekday--today': day.isToday }")
      slot(
        name="weekday-heading"
        :label="day[dayLabelSize]"
        :id="day.id"
        :date="day.date")
        span.vuecal__weekday-day {{ day[dayLabelSize] }}
        strong.vuecal__weekday-date(v-if="!view.isMonth") {{ day.dateNumber }}
  .vuecal__schedules-headings.w-flex.grow(v-if="config.schedules")
    template(v-for="(day, i) in weekDays" :key="i")
      template(v-for="(schedule, j) in config.schedules" :key="j")
        .vuecal__schedule.vuecal__schedule--heading(
          v-if="$slots['schedule-heading']"
          :class="schedule.class")
          slot(name="schedule-heading" :schedule="schedule" :view="view")
        .vuecal__schedule.vuecal__schedule--heading(
          v-else
          :class="schedule.class"
          v-html="schedule.label")
  .vuecal__all-day.w-flex.grow(v-if="config.allDayEvents")
    cell.vuecal__all-day-cell(
      v-for="(day, i) in weekDays"
      :key="i"
      :class="{ 'vuecal__weekday--today': day.isToday }"
      :start="day.date"
      :end="new Date(day.date.getTime() + 24 * 60 * 60 * 1000 - 1)"
      :index="i"
      all-day)
      template(v-if="$slots['event.all-day']" #event.all-day="params")
        slot(name="event.all-day" v-bind="params")
      template(v-else #event="params")
        slot(name="event" v-bind="params")
    .vuecal__all-day-resizer(
      @mousedown="allDayResizer.handleMouseDown"
      @touchstart="allDayResizer.handleTouchStart")
</template>

<script setup>
import { computed, inject, ref, onBeforeUnmount } from 'vue'
import { weekdays } from '../core/config'
import Cell from './cell.vue'

const vuecal = inject('vuecal')
const $vuecalEl = inject('$vuecalEl')
const { view, config, dateUtils } = vuecal

const dayLabelSize = computed(() => {
  if (config.xs) return 'day-xs'
  if (config.sm || view.isDays || view.isMonth) return 'day-sm'
  return 'day'
})

const showHeadings = computed(() => {
  const isDayDaysWeekOrMonthView = view.isDay || view.isDays || view.isWeek || view.isMonth
  return isDayDaysWeekOrMonthView && !(view.isDay && !config.schedules && !config.allDayEvents)
})

// Only for days, week and month views.
// The props sm and xs are not used in the computed so switching doesn't recompute.
const weekDays = computed(() => {
  // Regardless of how many view rows, we always want to display a maximum of view cols headings,
  // hence the slice(0, view.cols).
  return view.cellDates.slice(0, config.horizontal ? view.rows : view.cols).map(({ start }) => ({
    id: weekdays[start.getDay()],
    date: start,
    dateNumber: start.getDate(),
    day: dateUtils.formatDate(start, 'dddd'),
    'day-sm': dateUtils.formatDate(start, 'ddd'),
    'day-xs': dateUtils.formatDate(start, 'dd'),
    isToday: dateUtils.isToday(start)
  }))
})

const domEvents = {
  click: date => {
    if (view.isDays || view.isWeek) view.updateSelectedDate(date)
  }
}

const allDayResizer = {
  isResizing: ref(false),
  startY: ref(0),
  initialHeight: ref(0),
  defaultHeight: 25, // Default height in pixels.

  // Or in the case of horizontal layout.
  startX: ref(0),
  initialWidth: ref(0),
  defaultWidth: 25, // Default width in pixels.

  // Cleanup event listeners.
  cleanup () {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousemove', allDayResizer.handleMouseMove)
      document.removeEventListener('mouseup', allDayResizer.cleanup)
      document.removeEventListener('touchmove', allDayResizer.handleTouchMove, { passive: false })
      document.removeEventListener('touchend', allDayResizer.cleanup)
    }
    allDayResizer.isResizing.value = false
  },

  startResize (clientX, clientY) {
    this.isResizing.value = true
    const isHzl = config.horizontal
    this[isHzl ? 'startX' : 'startY'].value = isHzl ? clientX : clientY

    // Get actual computed height/width from element.
    const allDayEl = $vuecalEl.value?.querySelector('.vuecal__all-day')
    if (allDayEl) {
      this[isHzl ? 'initialWidth' : 'initialHeight'].value = allDayEl[isHzl ? 'offsetWidth' : 'offsetHeight']
    }

    // Add document event listeners.
    document.addEventListener('mousemove', allDayResizer.handleMouseMove)
    document.addEventListener('mouseup', allDayResizer.cleanup)
    document.addEventListener('touchmove', allDayResizer.handleTouchMove, { passive: false })
    document.addEventListener('touchend', allDayResizer.cleanup)
  },

  // Update height/width based on mouse/touch movement.
  updateSize (clientX, clientY) {
    if (!this.isResizing.value) return

    const isHzl = config.horizontal
    const delta = isHzl ? (clientX - this.startX.value) : (clientY - this.startY.value)
    // Minimum height/width of 20px.
    const newSize = Math.max(20, this[isHzl ? 'initialWidth' : 'initialHeight'].value + delta)

    $vuecalEl.value?.style.setProperty('--vuecal-all-day-bar-height', `${newSize}px`)
  },

  // Mouse event handlers.
  handleMouseDown (e) {
    this.startResize(e.clientX, e.clientY)
  },

  handleMouseMove (e) {
    allDayResizer.updateSize(e.clientX, e.clientY)
  },

  // Touch event handlers.
  handleTouchStart (e) {
    e.touches?.[0] && this.startResize(e.touches[0].clientX, e.touches[0].clientY)
  },

  handleTouchMove (e) {
    if (e.touches?.[0]) {
      allDayResizer.updateSize(e.touches[0].clientX, e.touches[0].clientY)
      e.preventDefault() // Prevent scrolling while resizing.
    }
  }
}

// Clean up on component unmount.
onBeforeUnmount(() => {
  allDayResizer.cleanup()
})
</script>

<style lang="scss">
.vuecal {
  &__headings {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    z-index: 4; // Keep it above the now-line and hovered events.
    height: calc(var(--vuecal-weekday-bar-height) + var(--vuecal-schedules-bar-height) + var(--vuecal-all-day-bar-height));
    white-space: nowrap;
    background-color: var(--vuecal-secondary-color);
  }

  &__weekdays-headings {display: flex;}

  &__weekday {
    flex: 1 1 0;
    align-items: center;
    background-color: inherit;

    .vuecal__scrollable--days-view &,
    .vuecal__scrollable--week-view & {min-width: var(--vuecal-min-cell-width, 0);}
  }

  &__schedules-headings {display: flex;}
  &__schedule-heading {height: 12px;}

  &__all-day {
    position: relative;
    display: flex;
    height: var(--vuecal-all-day-bar-height);
  }
  &__all-day-cell {
    display: flex;
    flex: 1 1 0;
    background-color: var(--vuecal-secondary-color);
  }
  &__all-day-resizer {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 1px;
    cursor: row-resize;
    background-color: var(--vuecal-secondary-color);
    z-index: 10;

    &:hover {
      height: 2px;
      background-color: var(--vuecal-primary-color);
    }

    &:before {
      content: '';
      position: absolute;
      inset: -5px 0;
    }
  }
}
</style>
