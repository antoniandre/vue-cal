<template lang="pug">
.vuecal__body(:style="bodyStyles")
  VueCalCell(v-for="(date, i) in cellsDates" :key="i" :date="date" :index="i")
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
let { view, config, config: { availableViews }, dateUtils } = vuecal

// Create as many grid cells as defined in the availableViews map (cols*rows).
const cellsCount = computed(() => {
  return availableViews[view.id].cols * availableViews[view.id].rows
})

// Fill in the dates for each grid cell and return an array of dates.
// Better performance here than in each cell.
// Also this computed should only manage pure dates: no text, no event, nothing likely to be
// triggering recomputing due to a change in the reactivity chain.
// Every recomputing can become very expensive when handling a large amount of cells per view
// with a large amount of calendar events.
const cellsDates = computed(() => {
  console.log('recomputing cellsDates')
  const dates = []
  for (let i = 0; i < cellsCount.value; i++) {
    switch (view.id) {
      case 'day':
      case 'days':
      case 'week':
      case 'month':
        dates.push(dateUtils.addDays(view.firstCellDate, i))
        break
      case 'year':
        dates.push(new Date(view.firstCellDate.getFullYear(), i, 1, 0, 0, 0, 0))
        break
      case 'years':
        dates.push(new Date(view.firstCellDate.getFullYear() + i, 0, 1, 0, 0, 0, 0))
        break
    }
  }

  return dates
})

// These CSS variables must stay at this level and not at the root, because they need to be "dead"
// and frozen with the animated container when leaving in a vue transition, for a successful smooth
// transition. In other terms, there can be 2 vuecal__scrollable elements that are animated with
// different values of these CSS variables at the same time. Beautiful :)
const bodyStyles = computed(() => {
  console.log('recomputing bodyStyles', config.availableViews, view.id)
  return {
    '--vuecal-grid-columns': config.availableViews[view.id].cols,
    '--vuecal-grid-rows': config.availableViews[view.id].rows
  }
})
</script>

<style lang="scss">
.vuecal__body {
  display: grid;
  grid-template-columns: repeat(var(--vuecal-grid-columns), 1fr);
  grid-template-rows: repeat(var(--vuecal-grid-rows), 1fr);
  height: 100%;

  .vuecal--view-has-time & {
    background: linear-gradient(0deg, var(--vuecal-border-color) 0, transparent 1px var(--vuecal-time-cell-height)) 0 1px;
    background-size: 100% var(--vuecal-time-cell-height);
  }
}
</style>
