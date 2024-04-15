<template lang="pug">
.vue-cal__body
  VueCalCell(
    v-for="(date, i) in cellsDates"
    :key="i"
    :date="date"
    :index="i")
</template>

<script setup>
import { computed, inject } from 'vue'
import VueCalCell from './cell.vue'

const vuecal = inject('vuecal')

const cellsCount = computed(() => vuecal.availableViews.value[vuecal.view.value.id].cols * vuecal.availableViews.value[vuecal.view.value.id].rows)
const cellsDates = computed(() => {
  const dates = []
  const { startDate } = vuecal.view.value
  for (let i = 0; i < cellsCount.value; i++) {
    switch (vuecal.view.value.id) {
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
        dates.push(new Date(startDate.getFullYear() + i, 0, 1, 0, 0, 0, 0))
        break
    }
  }
  console.log(dates)
  return dates
})
</script>

<style lang="scss">
.vue-cal__body {
  display: grid;
  grid-template-columns: repeat(var(--vue-cal-grid-columns), 1fr);
  grid-template-rows: repeat(var(--vue-cal-grid-rows), 1fr);
  height: 100%;
}
</style>
