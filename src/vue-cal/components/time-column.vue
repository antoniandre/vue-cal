<template lang="pug">
.vuecal__time-column
  .vuecal__all-day-label(v-if="config.allDayEvents")
    slot(name="all-day-label") {{ vuecal.texts.allDay }}

  .vuecal__time-cell(v-for="(time, i) in timeCells" :key="i" :style="{ height: time.height || null }")
    slot(
      name="time-cell"
      :index="i"
      :minutes="time.minutes"
      :hours="time.hours"
      :minutes-sum="time.minutesSum"
      :format12="time.formatted12"
      :format24="time.formatted24")
      label {{ config.twelveHour ? time.formatted12 : time.formatted24 }}
</template>

<script setup>
import { computed, inject } from 'vue'

const vuecal = inject('vuecal')
const { config, texts } = vuecal

const timeCells = computed(() => {
  const cells = []
  const noon = 12 * 60

  for (let i = config.timeFrom; i < config.timeTo; i += config.timeStep) {
    const isLastCell = i + config.timeStep > config.timeTo
    const hours = ~~(i / 60) // 0 to 23.
    const mins = i % 60
    const amPm = texts[i < noon ? 'am' : 'pm']

    let cellHeight = null
    // If last cell, check if the cell is full or truncated.
    // E.g. timeStep = 1h, timeTo = 19h30. -> The last cell will be --vuecal-time-cell-height * 0.5%.
    if (isLastCell) {
      const percentageOfFullCell = (config.timeTo - i) / config.timeStep
      cellHeight = `calc(var(--vuecal-time-cell-height) * ${percentageOfFullCell})`
    }

    cells.push({
      minutesSum: i, // The sum of hours + minutes in minutes.
      hours,
      minutes: mins,
      formatted12: `${!(hours % 12) ? 12 : (hours % 12)}${mins ? `:${mins.toString().padStart(2, 0)}` : ''}${amPm}`,
      formatted24: `${hours.toString().padStart(2, 0)}:${mins.toString().padStart(2, 0)}`,
      height: cellHeight
    })
  }
  return cells
})
</script>

<style lang="scss">
.vuecal__time-column {
  display: flex;
  flex-direction: column;
  align-self: flex-start; // Fill height.
  padding-top: calc(var(--vuecal-headings-bar-height) + var(--vuecal-all-day-height));
  background-color: var(--vuecal-secondary-color);
  position: sticky;
  left: 0;
  z-index: 5; // Above the cells, headings bar and hovered events.
  border-right: 0.5px solid var(--vuecal-border-color);
  // Smoothen transition between day view and days or week view.
  transition: padding-top 0.3s ease-in-out;

  .vuecal__scrollable--day-view & {padding-top: 0;}
  // Always use .vuecal__scrollable for view specific override for Vue transition to be smooth.
  .vuecal--has-schedules .vuecal__scrollable--day-view & {padding-top: calc(var(--vuecal-headings-bar-height) + var(--vuecal-all-day-height));}
}

.vuecal__all-day-label {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--vuecal-time-cell-height);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 0.5px solid var(--vuecal-border-color);
  line-height: 1;
  font-size: 0.85em;
}

.vuecal__time-cell {
  position: relative;
  display: flex;
  flex: 1 0 auto;
  font-size: 0.85em;
  height: var(--vuecal-time-cell-height);

  &:before {
    content: '';
    position: absolute;
    right: 0;
    width: 5px;
    top: 0.5px;
    border-top: 0.5px solid var(--vuecal-border-color);
  }

  label {
    opacity: 0.5;
    padding-left: 4px;
    padding-right: 8px;
    line-height: 0;
  }
  // Always use .vuecal__scrollable for view specific override for Vue transition to be smooth.
  .vuecal__scrollable--day-view:not(.vuecal__scrollable--has-schedules) &:first-child label {
    margin-top: 0.6em;
    font-size: 0.9em;
    opacity: 0.4;
  }
}
</style>
