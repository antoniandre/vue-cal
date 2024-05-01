<template lang="pug">
.vuecal__time-column
  .vuecal__time-cell(v-for="(time, i) in timeCells" :key="i")
    label {{ options.twelveHour ? time.formatted12 : time.formatted24 }}
</template>

<script setup>
import { computed, inject } from 'vue'

const vuecal = inject('vuecal')
const { config: { props: options }, texts } = vuecal

const timeCells = computed(() => {
  const cells = []
  const noon = 12 * 60
  for (let i = 0; i < 24 * 60; i += options.timeStep) {
    const hours = ~~(i / 60)
    const mins = i % 60
    const amPm = texts.value[i < noon ? 'am' : 'pm']

    cells.push({
      minutes: i,
      formatted12: `${!(hours % 12) ? 12 : (hours % 12)}${mins ? ':' + mins.toString().padStart(2, 0) : ''}${amPm}`,
      formatted24: `${hours.toString().padStart(2, 0)}:${mins.toString().padStart(2, 0)}`
    })
  }
  return cells
})
</script>

<style lang="scss">
.vuecal__time-column {
  display: flex;
  flex-direction: column;
  margin-top: var(--vuecal-weekdays-bar-height);
  font-size: 0.85em;

  .vuecal--day-view & {margin-top: 0;}
}

.vuecal__time-cell {
  flex: 1 0 auto;
  display: flex;
  height: var(--vuecal-time-cell-height);

  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    border-top: 1px solid var(--vuecal-border-color);
  }

  label {opacity: 0.5;}
}
</style>
