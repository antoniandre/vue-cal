<template lang="pug">
.vue-cal__cell(:class="classes")
  template(v-if="$slots.cell")
    slot(name="cell" :date="date" :index="index" :events="events") #cell
  template(v-else)
    template(v-if="$slots['cell-events']")
      slot(name="cell-events")

    .vue-cal__cell-date-time(v-if="cellDate || $slots['cell-date-time']")
      slot(name="cell-date-time" :date="date" :events="events") {{ cellDate }}
    .vue-cal__cell-content(v-if="$slots['cell-content']")
      slot(name="cell-content" :date="date" :events="events")
    .vue-cal__cell-events(v-if="events.length")
      slot(name="cell-events" :date="date" :events="events") {{ events }}
</template>

<script setup>
import { computed, inject } from 'vue'

const vuecal = inject('vuecal')
const options = computed(() => vuecal.props)
const view = computed(() => vuecal.view.value.id)
const events = computed(() => vuecal.view.value.events)

const props = defineProps({
  // Even with time=false, the date of the cell will still be provided in order to attach
  // events to a specific date.
  date: { type: Date, required: true },
  index: { type: Number, required: true }
})

const classes = computed(() => {
  const now = new Date()
  const thisYear = now.getFullYear()
  const thisMonth = now.getMonth()
  const y = props.date.getFullYear()
  const m = props.date.getMonth()

  return {
    [`vue-cal__cell--today`]: vuecal.dateUtils.isToday(props.date),
    [`vue-cal__cell--current-month`]: view.value === 'year' && y === thisYear && m === thisMonth,
    [`vue-cal__cell--current-year`]: view.value === 'years' && y === thisYear,
    [`vue-cal__cell--out-of-range`]: view.value === 'month' && (y !== thisYear || m !== thisMonth),
    [`vue-cal__cell--selected`]: options.value.selectedDate && vuecal.dateUtils.isSameDate(options.value.selectedDate, props.date),
    [`vue-cal__cell--has-events`]: false
  }
})

const cellDate = computed(() => {
  // ! \ IMPORTANT NOTE:
  // If the selectedDate prop would be added to the vuecal.view, any click on any cell
  // (triggering an emit of the selectedDate), would trigger a rerendering of all the
  // cells of the view. The following marker is here to monitor that this does not happen
  // with any prop while developing.
  console.log('recomputing cell') // @todo: remove this marker after dev.

  switch (view.value) {
    case 'day':
    case 'days':
    case 'week':
      return ''
    case 'month':
      return vuecal.dateUtils.formatDate(props.date, 'D')
    case 'year':
      return vuecal.dateUtils.formatDate(props.date, 'MMMM')
    case 'years':
      return vuecal.dateUtils.formatDate(props.date, 'YYYY')
  }
})
</script>

<style lang="scss">
.vue-cal__cell {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;

  &--today, &--current-month, &--current-year {background-color: rgb(152 214 255 / 10%);}
  &--selected {background-color: rgb(152 214 255 / 20%);}
  &--out-of-range {opacity: 0.5;}
}
</style>
