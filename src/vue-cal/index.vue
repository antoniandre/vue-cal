<template lang="pug">
.vuecal(:data-locale="locale" :class="wrapperClasses" :style="wrapperStyles")
  slot(v-if="$slots.diy" name="diy" :view="view" :vuecal="vuecal")
  template(v-else)
    VueCalHeader
      template(v-if="$slots.header" #header="{ view, availableViews, vuecal }")
        slot(name="header" :view="view" :available-views="availableViews" :vuecal="vuecal")
      template(v-if="!$slots.header && $slots['previous-button']" #previous-button)
        slot(name="previous-button")
      template(v-if="!$slots.header && $slots['next-button']" #next-button)
        slot(name="next-button")
      template(v-if="!$slots.header && $slots['today-button']" #today-button)
        slot(name="today-button")
      template(v-if="!$slots.header && $slots.title" #title)
        slot(name="title" v-bind="view")

    .vuecal__scrollable(:class="{ 'vuecal__scrollable--row': hasTimeColumn }")
      TimeColumn(v-if="hasTimeColumn")
        template(v-if="$slots['time-cell']" #time-cell="{ index, minutes, format12, format24 }")
          slot(name="time-cell" :index="index" :minutes="minutes" :format12="format12" :format24="format24")
      .w-flex.column.grow
        WeekdaysBar
        VueCalBody
          template(v-if="$slots.cell" #cell="{ date, index, events }")
            slot(name="cell" :date="date" :index="index" :events="events")
          template(v-if="!$slots.cell && $slots['cell-date']" #cell-date="{ date, events }")
            slot(name="cell-date" :date="date" :events="events")
          template(v-if="!$slots.cell && $slots['cell-content']" #cell-content="{ date, events }")
            slot(name="cell-content" :date="date" :events="events")
          template(v-if="!$slots.cell && $slots['cell-events']" #cell-events="{ date, events }")
            slot(name="cell-events" :date="date" :events="events")
</template>

<script setup>
import { computed, provide, watch } from 'vue'
import VueCal from './core/index'
import { props as propsDefinitions } from './core/props-definitions'
import VueCalHeader from './components/header.vue'
import VueCalBody from './components/body.vue'
import WeekdaysBar from './components/weekdays-bar.vue'
import TimeColumn from './components/time-column.vue'

const props = defineProps(propsDefinitions)
const emit = defineEmits(['update:view', 'update:selectedDate', 'update:viewDate', 'cell-click'])
const vuecal = new VueCal(props, emit)
const { config, view } = vuecal

const hasTimeColumn = computed(() => props.time && (view.isDay || view.isDays || view.isWeek))

const wrapperClasses = computed(() => ({
  'vuecal--ready': config.ready,
  [`vuecal--${config.size}`]: true,
  'vuecal--date-picker': props.datePicker,
  [`vuecal--${view.id}-view`]: true,
  'vuecal--view-has-time': hasTimeColumn.value
}))

const wrapperStyles = computed(() => {
  console.log('recomputing wrapperStyles', config.availableViews, view.id)
  return {
    '--vuecal-grid-columns': config.availableViews[view.id].cols,
    '--vuecal-grid-rows': config.availableViews[view.id].rows
  }
})

watch(() => props.locale, newLocale => vuecal.loadTexts(newLocale))

// Share the vuecal object across all the Vue components.
provide('vuecal', vuecal)
</script>

<style lang="scss">
.vuecal {
  --vuecal-grid-columns: 7; // Default value, overridden dynamically on view change.
  --vuecal-grid-rows: 6; // Default value, overridden dynamically on view change.
  --vuecal-weekdays-bar-height: 1.6em;
  --vuecal-time-cell-height: 40px;
  // When there are too many day cells to fit in the view, setting a min cell height will help
  // visualizing and a horizontal scrollbar will be added.
  --vuecal-min-cell-width: 0;
  --vuecal-primary-color: #1976D2;
  --vuecal-secondary-color: #fff;
  --vuecal-border-color: #{rgba(#000, 0.08)};

  display: flex;
  flex-direction: column;
  height: 100%;
  user-select: none;

  &__scrollable {
    position: relative; // For the time cells lines to fill up the whole calendar width.
    overflow: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__scrollable--row {flex-direction: row;}

  .grow {flex-grow: 1;}
}

.vuecal--default-theme {
  border-radius: 6px;
  color: #000;

  // Calendar Header.
  // ------------------------------------------------------
  .vuecal__header {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-color: var(--vuecal-primary-color);
    color: var(--vuecal-secondary-color);
  }

  .vuecal__views-bar,
  .vuecal__title-bar {
    padding-top: 4px;
    padding-bottom: 4px;

    &:first-child {
      border-top-left-radius: inherit;
      border-top-right-radius: inherit;
    }
  }

  .vuecal__title-bar {
    position: relative;
    background-color: var(--vuecal-primary-color);
    color: var(--vuecal-secondary-color);
    padding-left: 0.6em;
    padding-right: 0.6em;

    &:before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: var(--vuecal-secondary-color);
      opacity: 0.2;
    }
  }

  .vuecal__view-button {
    text-transform: uppercase;
    font-size: 0.9em;
  }

  .vuecal__view-button,
  .vuecal__nav,
  button.vuecal__title,
  .vuecal__nav--today {
    transition: 0.3s;
    border: 1px solid transparent;
    padding: 6px 12px;
    border-radius: 4px;
    align-self: center;

    &:hover {background-color: rgba(#fff, 0.12);}
    &--active, &--active:hover {background-color: rgba(#fff, 0.25);}
    &:active {background-color: rgba(#fff, 0.25);}
    &:focus-visible {border-color: rgba(#fff, 0.75);}
  }

  .vuecal__nav--prev,
  .vuecal__nav--next {
    width: 2em;
    aspect-ratio: 1;
    border-radius: 99em;
  }

  .vuecal__nav--today {
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 3px;
    font-size: 0.85em;
  }

  // Calendar Weekdays Headers.
  // ------------------------------------------------------
  .vuecal__scrollable {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
    border: 1px solid var(--vuecal-border-color);
    border-top: none;
    display: grid;
    grid-template-columns: 1fr 0fr;
  }
  &.vuecal--view-has-time .vuecal__scrollable,
  &.vuecal--day-view .vuecal__scrollable {grid-template-columns: 0fr 1fr;}

  &.vuecal--lg .vuecal__weekdays-bar,
  &.vuecal--sm .vuecal__weekdays-bar {border-bottom: 0.5px solid var(--vuecal-border-color);}
  .vuecal__weekday {
    padding: 2px 1px;
    white-space: nowrap;
    overflow: hidden;
    letter-spacing: -0.03em;
    text-overflow: ellipsis;
    display: block;
    font-size: 0.95em;
  }

  // Calendar Body.
  // ------------------------------------------------------
  .vuecal__cell {overflow: hidden;}
  &.vuecal--lg .vuecal__cell {
    box-shadow: 0 0 0 0.5px var(--vuecal-border-color) inset;
  }
  &.vuecal--lg.vuecal--month-view .vuecal__cell {
    justify-content: flex-end;
    align-items: flex-start;

    &:before {display: none;}
    &--selected .vuecal__cell-date {
      background: var(--vuecal-primary-color);
      color: var(--vuecal-secondary-color);
    }
  }

  .vuecal__cell-date {
    position: sticky;
    top: 0;
    font-weight: bold;
  }

  &.vuecal--lg.vuecal--month-view .vuecal__cell-date {
    padding: 4px;
    border-radius: 99em;
    width: 2em;
    aspect-ratio: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    font-size: 13px;
    letter-spacing: -0.5px;

    &:before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--vuecal-primary-color);
      opacity: 0.1;
      filter: saturate(2);
    }
  }
  .vuecal__cell--out-of-scope .vuecal__cell-date {opacity: 0.4;}
  &.vuecal--lg .vuecal__cell--today .vuecal__cell-date:before {opacity: 0.3;}

  // Time column.
  // ------------------------------------------------------
  .vuecal__time-cell {
    display: flex;
    justify-content: flex-end;
  }

  .vuecal__time-cell-label {
    font-size: 11px;
    letter-spacing: -0.5px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: -1px;
    margin-top: -7.5px;
    background: #fff;
    width: 98%;
    z-index: 1;
    padding-right: 2px;
    align-self: flex-start;
  }
  .vuecal__time-cell:nth-child(1) .vuecal__time-cell-label {
    margin-top: -1px;
    font-size: 10px;
    background: none;
  }

  // Calendar events.
  // ------------------------------------------------------
  .vuecal__event {
    max-width: 94%;
    background-color: var(--w-primary-color);
    color: rgb(var(--w-contrast-color-rgb));
    border-radius: 5px;
    border: 1px solid currentColor;
    padding: 4px 6px;
    text-align: center;
    font-size: 12px;
    line-height: 1;

    &-time {
      white-space: nowrap;
      line-height: 1;
      letter-spacing: -0.5px;
    }
  }

  .vuecal--month-view .vuecal__event {
    padding-top: 1px;
    padding-bottom: 1px;
  }

  // Date picker.
  // ------------------------------------------------------
  &.vuecal--date-picker {
    font-size: 12px;

    .vuecal__views-bar, .vuecal__title-bar {padding-top: 2px;padding-bottom: 2px;}
    .vuecal__title-bar {padding-left: 0.3em;padding-right: 0.3em;}
    .vuecal__nav--today, .vuecal__view-button {font-size: 0.9em;}
    .vuecal__nav--prev, .vuecal__nav--next {width: 1.6em;}
    .vuecal__nav--prev:before, .vuecal__nav--next:before {padding: 0.22em;}
    .vuecal__weekday {font-size: 0.95em;}
    .vuecal__body {padding: 2px;gap: 2px;}
    &.vuecal--date-picker.vuecal--year-view .vuecal__body {padding: 0.6em;gap: 0.8em;}
    &.vuecal--month-view .vuecal__cell,
    &.vuecal--date-picker.vuecal--month-view .vuecal__cell,
    &.vuecal--date-picker.vuecal--years-view .vuecal__cell {font-size: 0.9em;}
    &.vuecal--month-view .vuecal__body,
    &.vuecal--date-picker.vuecal--year-view .vuecal__body,
    &.vuecal--date-picker.vuecal--years-view .vuecal__body {align-items: center;}

    .vuecal__cell {
      aspect-ratio: 1;
      border-radius: 99em;
      font-weight: bold;
      font-size: 1em;
      padding: 8px;
    }
    .vuecal__cell-date {font-weight: bold;}
  }

  // Sm and xs layouts.
  // ------------------------------------------------------
  &.vuecal--sm {
    .vuecal__view-button,
    .vuecal__nav,
    .vuecal__title button,
    .vuecal__nav--today {padding: 6px 8px;}
  }
  &.vuecal--xs {
    width: 210px;
    height: 262px;

    .vuecal__view-button,
    .vuecal__nav,
    .vuecal__title button,
    .vuecal__nav--today {padding: 2px 4px;}

    .vuecal__title {gap: 4px;}
    .vuecal__title small {padding-left: 3px;padding-right: 3px;}

    &.vuecal--year-view .vuecal__body,
    &.vuecal--years-view .vuecal__body {margin: auto;}
  }
}

// Transitions.
// --------------------------------------------------------
// .vuecal-slide-fade--left-enter-active, .vuecal-slide-fade--left-leave-active,
// .vuecal-slide-fade--right-enter-active, .vuecal-slide-fade--right-leave-active {
//   transition: 0.25s ease-out;
// }

// .vuecal-slide-fade--left-enter-from,
// .vuecal-slide-fade--right-leave-to {
//   transform: translateX(-15px);
//   opacity: 0;
// }

// .vuecal-slide-fade--left-leave-to,
// .vuecal-slide-fade--right-enter-from {
//   transform: translateX(15px);
//   opacity: 0;
// }

// .vuecal-slide-fade--left-leave-active,
// .vuecal-slide-fade--right-leave-active {position: absolute !important;height: 100%;}
// .vuecal__title-bar .vuecal-slide-fade--left-leave-active,
// .vuecal__title-bar .vuecal-slide-fade--right-leave-active {left: 0;right: 0;height: auto;}
// .vuecal__heading .vuecal-slide-fade--left-leave-active,
// .vuecal__heading .vuecal-slide-fade--right-leave-active {display: flex;align-items: center;}
</style>
