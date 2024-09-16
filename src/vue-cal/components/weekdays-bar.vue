<template lang="pug">
.vuecal__weekdays-bar(v-if="isDaysWeekOrMonthView")
  .vuecal__weekday(
    v-for="(day, i) in weekDays"
    :key="i"
    @click="domEvents.click(day.date)") {{ day[labelsSize] }}
    .vuecal__cell-splits(v-if="config.daySplits")
      .vuecal__cell-split.vuecal__cell-split--label(
        v-for="(split, i) in config.daySplits"
        :key="i"
        :class="split.class"
        v-html="split.label")
</template>

<script setup>
import { computed, inject } from 'vue'

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
      date: start,
      label: dateUtils.formatDate(start, 'dddd') + dateNumber,
      'label-sm': dateUtils.formatDate(start, 'ddd') + dateNumber,
      'label-xs': dateUtils.formatDate(start, 'dd') + dateNumber
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
.vuecal__weekdays-bar {
  position: sticky;
  top: 0;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  z-index: 1;
  background-color: var(--vuecal-secondary-color);
  height: var(--vuecal-weekdays-bar-height);
}

.vuecal__weekday {
  flex: 1 1 0;
  text-align: center;
  opacity: 0.8;
}
</style>
