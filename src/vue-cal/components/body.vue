<template lang="pug">
.vuecal__body(:style="bodyStyles")
  VueCalCell(
    v-for="(date, i) in view.cellDates"
    :key="i"
    :start="date.start"
    :end="date.end"
    :index="i"
    @cell-drag-start="emit('cell-drag-start')"
    @cell-drag-end="emit('cell-drag-end')"
    @event-drag-start="emit('event-drag-start')"
    @event-drag-end="emit('event-drag-end')")
    template(v-if="$slots.cell" #cell="params")
      slot(name="cell" v-bind="params")
    template(v-if="$slots['cell-date']" #cell-date="params")
      slot(name="cell-date" v-bind="params")
    template(v-if="$slots['cell-content']" #cell-content="params")
      slot(name="cell-content" v-bind="params")
    template(v-if="$slots['cell-events']" #cell-events="params")
      slot(name="cell-events" v-bind="params")
    template(v-else-if="$slots.event" #event="params")
      slot(name="event" v-bind="params")
</template>

<script setup>
import { computed, inject } from 'vue'
import VueCalCell from './cell.vue'

const emit = defineEmits(['cell-drag-start', 'cell-drag-end', 'event-drag-start', 'event-drag-end'])

const vuecal = inject('vuecal')
let { view, config } = vuecal

// These CSS variables must stay at this level and not at the root, because they need to be "dead"
// and frozen with the animated container when leaving in a vue transition, for a successful smooth
// transition. In other terms, there can be 2 vuecal__scrollable elements that are animated with
// different values of these CSS variables at the same time. Beautiful :)
const bodyStyles = computed(() => {
  console.log('recomputing bodyStyles', view.id)
  return {
    '--vuecal-grid-columns': view.cols,
    '--vuecal-grid-rows': view.rows
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
