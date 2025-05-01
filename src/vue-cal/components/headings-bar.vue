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
  .vuecal__all-day.w-flex.grow(v-if="config.allDayEvents && !view.isMonth")
    //- .vuecal__all-day-label
      slot(name="all-day-label") {{ vuecal.texts.allDay }}

    cell.vuecal__all-day-cell(
      v-for="(day, i) in weekDays"
      :key="i"
      :class="{ 'vuecal__weekday--today': day.isToday }"
      :start="day.date"
      :end="new Date(day.date.getTime() + 24 * 60 * 60 * 1000 - 1)"
      :index="i"
      all-day)
</template>

<script setup>
import { computed, inject } from 'vue'
import { weekdays } from '../core/config'
import Cell from './cell.vue'

const vuecal = inject('vuecal')
const { view, config, dateUtils } = vuecal

const dayLabelSize = computed(() => {
  if (config.xs) return 'day-xs'
  if (config.sm || view.isDays || view.isMonth) return 'day-sm'
  return 'day'
})

const showHeadings = computed(() => {
  const isDayDaysWeekOrMonthView = view.isDay || view.isDays || view.isWeek || view.isMonth
  return isDayDaysWeekOrMonthView && !(view.isDay && !config.schedules)
})

// Only for days, week and month views.
// The props sm and xs are not used in the computed so switching doesn't recompute.
const weekDays = computed(() => {
  // Regardless of how many view rows, we always want to display a maximum of view cols headings,
  // hence the slice(0, view.cols).
  return view.cellDates.slice(0, view.cols).map(({ start }) => ({
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
    height: calc(var(--vuecal-headings-bar-height) + var(--vuecal-all-day-height));
    white-space: nowrap;
    background-color: var(--vuecal-secondary-color);

    .vuecal__scrollable--month-view & {height: var(--vuecal-headings-bar-height);}
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
    display: flex;
    height: var(--vuecal-all-day-height);
    background-color: var(--vuecal-secondary-color);
  }
  &__all-day-cell {
    display: flex;
    flex: 1 1 0;
  }
}
</style>
