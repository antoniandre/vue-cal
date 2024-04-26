<template lang="pug">
.vuecal__weekdays-bar(v-if="isDaysWeekOrMonthView")
  .vuecal__weekday(v-for="day in weekDays") {{ day[labelsSize] }}
</template>

<script setup>
import { computed, inject } from 'vue'

const vuecal = inject('vuecal')
const { view, config: { props: options, availableViews }, dateUtils } = vuecal

const labelsSize = computed(() => {
  if (options.xs) return 'label-xs'
  else if (options.sm || view.isDays || view.isMonth) return 'label-sm'
  else return 'label'
})

const isDaysWeekOrMonthView = computed(() =>  view.isDays || view.isWeek || view.isMonth)

// Only for days, week and month views.
// The props sm and xs are not used in the computed so switching doesn't recompute.
const weekDays = computed(() => {
  const viewId = view.id
  const { cols, rows } = availableViews[viewId]
  // If more than 2 rows, it will look like a month view so there should only be weekdays
  // without numbers.
  const cellsCount = rows === 1 ? cols * rows : cols

  return Array(cellsCount).fill({}).map((item, i) => {
    const date = dateUtils.addDays(view.firstCellDate, i)
    const dateNumber = rows === 1 ? ' ' + date.getDate() : ''

    return {
      date,
      label: dateUtils.formatDate(date, 'dddd') + dateNumber,
      'label-sm': dateUtils.formatDate(date, 'ddd') + dateNumber,
      'label-xs': dateUtils.formatDate(date, 'dd') + dateNumber
    }
  })
})
</script>

<style lang="scss">
.vuecal__weekdays-bar {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 1;
  background-color: var(--vuecal-secondary-color);
}

.vuecal__weekday {
  flex: 1 1 0;
  text-align: center;
}
</style>
