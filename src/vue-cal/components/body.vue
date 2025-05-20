<template lang="pug">
.vuecal__body(ref="bodyEl" :style="bodyStyles")
  transition(name="vuecal-shrink")
    .vuecal__time-at-cursor(
      v-if="config.timeAtCursor && cursorYPercent !== null"
      :style="timeAtCursor.style")
      label {{ timeAtCursor.time }}
  VueCalCell(
    v-for="(date, i) in view.cellDates"
    :key="i"
    :start="date.start"
    :end="date.end"
    :index="i")
    template(v-if="$slots.cell" #cell="params")
      slot(name="cell" v-bind="params")
    template(v-if="$slots['cell-date']" #cell-date="params")
      slot(name="cell-date" v-bind="params")
    template(v-if="$slots['cell-content']" #cell-content="params")
      slot(name="cell-content" v-bind="params")
    template(v-if="$slots['cell-events']" #cell-events="params")
      slot(name="cell-events" v-bind="params")
    template(v-if="$slots[`event.${view.id}`]" #[`event.${view.id}`]="params")
      slot(:name="`event.${view.id}`" v-bind="params")
    template(v-if="$slots['event.all-day']" #event.all-day="params")
      slot(name="event.all-day" v-bind="params")
    template(v-if="$slots.event" #event="params")
      slot(name="event" v-bind="params")
    template(v-if="$slots['event-count']" #event-count="params")
      slot(name="event-count" v-bind="params")
</template>

<script setup>
import { computed, inject, onBeforeUnmount, onMounted, ref } from 'vue'
import { percentageToMinutes, pxToPercentage } from '@/vue-cal/utils/conversions'
import VueCalCell from './cell.vue'

const vuecal = inject('vuecal')
const { view, config, dateUtils } = vuecal

const bodyEl = ref(null)
const cursorYPercent = ref(null)

// These CSS variables must stay at this level and not at the root, because they need to be "dead"
// and frozen with the animated container when leaving in a vue transition, for a successful smooth
// transition. In other terms, there can be 2 vuecal__scrollable elements that are animated with
// different values of these CSS variables at the same time. Beautiful :)
const bodyStyles = computed(() => ({
  '--vuecal-grid-columns': view.cols,
  '--vuecal-grid-rows': view.rows,
  '--vuecal-body-max-height': config.time ? `${config.timeCellHeight * (config.timeTo - config.timeFrom) / config.timeStep}px` : null
}))

// Computes the time at the current cursor position.
const timeAtCursor = computed(() => {
  const time = dateUtils.formatTime(percentageToMinutes(cursorYPercent.value, config))
  return {
    style: { top: `${cursorYPercent.value}%` },
    time
  }
})

const onMousemove = e => {
  if (view.isMonth || view.isYear || view.isYears) return

  const clientY = (e.touches?.[0] || e).clientY
  const { top } = bodyEl.value.getBoundingClientRect()
  cursorYPercent.value = pxToPercentage(clientY - top, bodyEl.value)
}

const onMouseleave = () => {
  cursorYPercent.value = null
}

onMounted(() => {
  bodyEl.value.addEventListener('mousemove', onMousemove)
  bodyEl.value.addEventListener('touchmove', onMousemove)
  bodyEl.value.addEventListener('mouseleave', onMouseleave)
  bodyEl.value.addEventListener('touchend', onMouseleave)
})

onBeforeUnmount(() => {
  if (bodyEl.value) {
    bodyEl.value.removeEventListener('mousemove', onMousemove)
    bodyEl.value.removeEventListener('touchmove', onMousemove)
    bodyEl.value.removeEventListener('mouseleave', onMouseleave)
    bodyEl.value.removeEventListener('touchend', onMouseleave)
  }
})
</script>

<style lang="scss">
.vuecal__body {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--vuecal-grid-columns), 1fr);
  grid-template-rows: repeat(var(--vuecal-grid-rows), 1fr);
  height: 100%;
}

.vuecal__time-at-cursor {
  position: absolute;
  left: 0;
  right: 0;
  border-top: 1px dashed var(--vuecal-border-color);
  pointer-events: none;
  z-index: 10;

  label {
    display: block;
    position: absolute;
    top: 0;
    right: 100%;
    transform: translateY(-50%);
    margin-right: 4px;
    padding: 0 3px;
    font-size: 0.7rem;
    backdrop-filter: blur(10px);
    border-radius: 99em;
  }
}
</style>
