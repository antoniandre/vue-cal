<template lang="pug">
.vuecal__cell(:class="classes")
  template(v-if="$slots.cell")
    slot(name="cell" :date="date" :index="index" :events="view.events") #cell
  template(v-else)
    template(v-if="$slots['cell-events']")
      slot(name="cell-events")

    .vuecal__cell-date(v-if="cellDate || $slots['cell-date']")
      slot(name="cell-date" :date="date" :events="view.events") {{ cellDate }}
    .vuecal__cell-content(v-if="$slots['cell-content']")
      slot(name="cell-content" :date="date" :events="view.events")
    .vuecal__cell-events(v-if="view.events.length")
      slot(name="cell-events" :date="date" :events="view.events") {{ events }}
</template>

<script setup>
import { computed, inject } from 'vue'

const vuecal = inject('vuecal')
const { view, config, config: { props: options } } = vuecal

const props = defineProps({
  // Even with time=false, the date of the cell will still be provided in order to attach
  // events to a specific date.
  date: { type: Date, required: true },
  index: { type: Number, required: true }
})

const classes = computed(() => {
  const now = new Date()
  const viewYear = view.startDate.value.getFullYear()
  const viewMonth = view.startDate.value.getMonth()
  const y = props.date.getFullYear()
  const m = props.date.getMonth()

  return {
    [`vuecal__cell--today`]: vuecal.dateUtils.isToday(props.date),
    [`vuecal__cell--current-month`]: view.id === 'year' && y === now.getFullYear() && m === now.getMonth(),
    [`vuecal__cell--current-year`]: view.id === 'years' && y === now.getFullYear(),
    [`vuecal__cell--out-of-range`]: view.id === 'month' && (y !== viewYear || m !== viewMonth),
    [`vuecal__cell--selected`]: options.selectedDate && vuecal.dateUtils.isSameDate(options.selectedDate, props.date),
    [`vuecal__cell--has-events`]: false
  }
})

const cellDate = computed(() => {
  // ! \ IMPORTANT NOTE:
  // If the selectedDate prop would be added to the vuecal.view, any click on any cell
  // (triggering an emit of the selectedDate), would trigger a rerendering of all the
  // cells of the view. The following marker is here to monitor that this does not happen
  // with any prop while developing.
  console.log('recomputing cell') // @todo: remove this marker after dev.

  switch (view.id) {
    case 'day':
      return ''
    case 'days':
      if (config.availableViews.days.rows > 1) {
        return vuecal.dateUtils.formatDate(props.date, 'D')
      }
      return ''
    case 'week':
      return ''
    case 'month':
      return vuecal.dateUtils.formatDate(props.date, 'D')
    case 'year':
      return vuecal.dateUtils.formatDate(props.date, options.value.xs ? 'MMM' : 'MMMM')
    case 'years':
      return vuecal.dateUtils.formatDate(props.date, 'YYYY')
  }
})
</script>

<style lang="scss">
.vuecal__cell {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;

  &--today,
  &--current-month,
  &--current-year,
  &--selected {
    position: relative;

    &:before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--vuecal-primary-color);
      filter: saturate(5);
      opacity: 0.04;
    }
  }

  &--out-of-range {opacity: 0.5;}
  &--selected:before {background-color: var(--vuecal-primary-color);opacity: 0.08;}
}
</style>
