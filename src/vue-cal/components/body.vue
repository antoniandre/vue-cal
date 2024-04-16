<template lang="pug">
.vue-cal__body
  VueCalCell(
    v-for="(date, i) in cellsDates"
    :key="i"
    :date="date"
    :index="i"
    @click="emitSelectedDate(date)")
    template(v-if="$slots.cell" #cell="{ date, index, events }")
      slot(name="cell" :date="date" :index="index" :events="events")
    template(v-if="$slots['cell-date-time']" #cell-date-time="{ date, events }")
      slot(name="cell-date-time" :date="date" :events="events")
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
  const { startDate } = vuecal.view.value
  for (let i = 0; i < cellsCount.value; i++) {
    switch (view.value) {
      case 'day':
      case 'days':
      case 'week':
      case 'month':
        dates.push(vuecal.dateUtils.addDays(startDate, i))
        break
      case 'year':
        dates.push(new Date(startDate.getFullYear(), i, 1, 0, 0, 0, 0))
        break
      case 'years':
        // Arbitrarily slice the years picker by quarters of century (25y).
        // The modulo is only here to always cut off at the same years regardless of the current year.
        // E.g. always [1975-1999], [2000-2024], [2025-2099].
        dates.push(new Date((startDate.getFullYear() - (startDate.getFullYear() % 25)) + i, 0, 1, 0, 0, 0, 0))
        break
    }
  }

  return dates
})

const emitSelectedDate = date => {
  if (!vuecal.dateUtils.isSameDate(date, options.value.selectedDate)) vuecal.emit('update:selectedDate', date)
}
</script>

<style lang="scss">
.vue-cal__body {
  display: grid;
  grid-template-columns: repeat(var(--vue-cal-grid-columns), 1fr);
  grid-template-rows: repeat(var(--vue-cal-grid-rows), 1fr);
  height: 100%;
}
</style>
