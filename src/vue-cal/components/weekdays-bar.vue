<template lang="pug">
.vuecal__weekdays-bar(v-if="isDaysWeekOrMonthView")
  .vuecal__weekday(
    v-for="(day, i) in weekDays"
    :key="i"
    @click="domEvents.click(day.date)"
    :class="{ 'vuecal__weekday--today': day.isToday }")
    slot(
      name="weekday-heading"
      :label="day[labelsSize]"
      :id="day.id"
      :date="day.date") {{ day[labelsSize] }}
    .vuecal__schedule-headings(v-if="config.schedules")
      template(v-for="(schedule, i) in config.schedules" :key="i")
        .vuecal__schedule.vuecal__schedule--heading(
          v-if="$slots['schedule-heading']"
          :class="schedule.class")
          slot(name="schedule-heading" :schedule="schedule" :view="view")
        .vuecal__schedule.vuecal__schedule--heading(
          v-else
          :class="schedule.class"
          v-html="schedule.label")
</template>

<script setup>
import { computed, inject } from 'vue'
import { weekdays } from '../core/config'

const vuecal = inject('vuecal')
const { view, config, dateUtils } = vuecal

const labelsSize = computed(() => {
  if (config.xs) return 'label-xs'
  else if (config.sm || view.isDays || view.isMonth) return 'label-sm'
  else return 'label'
})

const isDaysWeekOrMonthView = computed(() =>  view.isDays || view.isWeek || view.isMonth)

// Only for days, week and month views.
// The props sm and xs are not used in the computed so switching doesn't recompute.
const weekDays = computed(() => {
  // Regardless of how many view rows, we always want to display a maximum of view cols headings,
  // hence the slice(0, view.cols).
  return view.cellDates.slice(0, view.cols).map(({ start }) => {
    const dateNumber = view.rows === 1 ? ' ' + start.getDate() : ''

    return {
      id: weekdays[start.getDay()],
      date: start,
      label: dateUtils.formatDate(start, 'dddd') + dateNumber,
      'label-sm': dateUtils.formatDate(start, 'ddd') + dateNumber,
      'label-xs': dateUtils.formatDate(start, 'dd') + dateNumber,
      isToday: dateUtils.isToday(start)
    }
  })
})

const domEvents = {
  click: date => {
    if (view.isDays || view.isWeek) view.updateSelectedDate(date)
  }
}
</script>

<style lang="scss">
.vuecal {
  &__weekdays-bar {
    position: sticky;
    top: 0;
    display: flex;
    flex-shrink: 0;
    align-items: center;
    z-index: 1;
    background-color: var(--vuecal-secondary-color);
    height: var(--vuecal-weekdays-bar-height);
    white-space: nowrap;
  }

  &__weekday {
    flex: 1 1 0;
    text-align: center;
    opacity: 0.8;
    background-color: inherit;

    &--today {
      color: color-mix(in srgb, var(--vuecal-primary-color) 80%, var(--vuecal-base-color));
      font-weight: bold;
    }

    .vuecal__scrollable--days-view &,
    .vuecal__scrollable--week-view & {min-width: var(--vuecal-min-cell-width, 0);}
  }
}
</style>
