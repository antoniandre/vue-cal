<template lang="pug">
.vuecal__cell(:class="classes" v-on="cellEventHandlers")
  template(v-if="$slots.cell")
    slot(name="cell" :date="date" :index="index" :events="view.events") #cell
  template(v-else)
    template(v-if="$slots['cell-events']")
      slot(name="cell-events")
    .vuecal__cell-date(v-if="formattedCellDate || $slots['cell-date']")
      slot(name="cell-date" :start="start" :end="end" :events="view.events") {{ formattedCellDate }}
    .vuecal__cell-content(v-if="$slots['cell-content']")
      slot(name="cell-content" :start="start" :end="end" :events="view.events")
    .vuecal__cell-events(v-if="view.events.length")
      slot(name="cell-events" :start="start" :end="end" :events="view.events") {{ events }}

  .vuecal__now-line(
    v-if="nowLine.show"
    :style="`top: ${nowLine.todaysTimePosition}px`"
    :title="nowLine.currentTime")
    span {{ nowLine.currentTime }}
</template>

<script setup>
import { computed, inject, reactive } from 'vue'
import { months, weekdays } from '@/vue-cal/core/config'

const vuecal = inject('vuecal')
const { view, config, dateUtils } = vuecal

const props = defineProps({
  // Even with time=false, the date of the cell will still be provided in order to attach
  // events to a specific date.
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  index: { type: Number, required: true }
})

const isToday = computed(() => dateUtils.isToday(props.start))

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

// Draw a line in today's cell at the exact current time.
const nowLine = reactive({
  show: computed(() => (view.isDay || view.isDays || view.isWeek) && isToday.value && config.time),
  nowInMinutes: computed(() => dateUtils.dateToMinutes(view.now)),
  todaysTimePosition: computed(() => Math.round((nowLine.nowInMinutes - config.timeFrom) * nowLine.timeScale)),
  timeScale: computed(() => config.timeCellHeight / config.timeStep),
  currentTime: computed(() => dateUtils.formatTime(view.now))
})

const onCellClick = () => {
  view.updateSelectedDate(props.start)
  view.updateViewDate(props.start)

  if (config.clickToNavigate) {
    if ((view.isMonth || view.isDays || view.isWeek) && config.availableViews.day) view.switch('day')
    else if (view.isYear && config.availableViews.month) view.switch('month')
    else if (view.isYears && config.availableViews.year) view.switch('year')
    view.updateViewDate(props.start)
  }
  vuecal.emit('cell-click', { date: props.start, view })
}

const cellEventHandlers = {
  click: onCellClick
}
</script>

<style lang="scss">
.vuecal__cell {
  display: flex;
  justify-content: center;
  align-items: center;

  .vuecal__scrollable--days-view &,
  .vuecal__scrollable--week-view & {min-width: var(--vuecal-min-cell-width, 0);}

  &--today,
  &--current-month,
  &--current-year,
  &--selected {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--vuecal-primary-color);
      filter: saturate(5);
      opacity: 0.04;
    }
  }

  &--out-of-range {opacity: 0.5;}
  &--selected:before {background-color: var(--vuecal-primary-color);opacity: 0.08;}
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
</style>
