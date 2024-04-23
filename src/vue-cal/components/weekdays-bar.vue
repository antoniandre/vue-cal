<template lang="pug">
.vuecal__weekdays-bar(v-if="isWeekOrDaysView")
  .vuecal__weekday(v-for="day in weekDays") {{ day[labelsSize] }}
</template>

<script setup>
import { computed, inject } from 'vue'

const vuecal = inject('vuecal')
const options = vuecal.props

const labelsSize = computed(() => {
  if (options.xsmall) return 'label-xs'
  else if (options.small || vuecal.view.value.id === 'days') return 'label-sm'
  else return 'label'
})

const isWeekOrDaysView = computed(() => ['week', 'days'].includes(vuecal.view.value.id))

// Only for days and week views.
// The props small and xsmall are not used in the computed so the switch does not need to recompute.
const weekDays = computed(() => {
  const view = vuecal.view.value.id
  const { cols, rows } = vuecal.availableViews.value[view]

  return Array(cols * rows).fill({}).map((item, i) => {
    const date = vuecal.dateUtils.addDays(vuecal.view.value.startDate, i)
    const dateNumber = date.getDate()
    return {
      date,
      label: `${vuecal.dateUtils.formatDate(date, 'dddd')} ${dateNumber}`,
      'label-sm': `${vuecal.dateUtils.formatDate(date, 'ddd')} ${dateNumber}`,
      'label-xs': `${vuecal.dateUtils.formatDate(date, 'dd')} ${dateNumber}`
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
