<template lang="pug">
.vuecal__body
  VueCalCell(
    v-for="(date, i) in cellsDates"
    :key="i"
    :date="date"
    :index="i"
    @click="vuecal.updateSelectedDate(date)")
    template(v-if="$slots.cell" #cell="{ date, index, events }")
      slot(name="cell" :date="date" :index="index" :events="events")
    template(v-if="$slots['cell-date']" #cell-date="{ date, events }")
      slot(name="cell-date" :date="date" :events="events")
    template(v-if="$slots['cell-content']" #cell-content="{ date, events }")
      slot(name="cell-content" :date="date" :events="events")
    template(v-if="$slots['cell-events']" #cell-events="{ date, events }")
      slot(name="cell-events" :date="date" :events="events")
</template>

<script setup>
import { computed, inject } from 'vue'
import VueCalCell from './cell.vue'

const vuecal = inject('vuecal')
const options = computed(() => vuecal.props)
const view = computed(() => vuecal.view.value.id)

// Create as many grid cells as defined in the availableViews map (cols*rows).
const cellsCount = computed(() => vuecal.availableViews.value[view.value].cols * vuecal.availableViews.value[view.value].rows)

// Fill in the dates for each grid cell and return an array of dates.
// Better performance here than in each cell.
const cellsDates = computed(() => {
  const dates = []
  const { firstCellDate } = vuecal.view.value
  for (let i = 0; i < cellsCount.value; i++) {
    switch (view.value) {
      case 'day':
      case 'days':
      case 'week':
      case 'month':
        dates.push(vuecal.dateUtils.addDays(firstCellDate, i))
        break
      case 'year':
        dates.push(new Date(firstCellDate.getFullYear(), i, 1, 0, 0, 0, 0))
        break
      case 'years':
        dates.push(new Date(firstCellDate.getFullYear() + i, 0, 1, 0, 0, 0, 0))
        break
    }
  }

  return dates
})
</script>

<style lang="scss">
.vuecal__body {
  display: grid;
  grid-template-columns: repeat(var(--vuecal-grid-columns), 1fr);
  grid-template-rows: repeat(var(--vuecal-grid-rows), 1fr);
  height: 100%;
}
</style>
