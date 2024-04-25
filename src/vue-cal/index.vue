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
      template(v-if="!$slots.header" #title)
        slot(name="title" :title="viewTitle" :view="view") {{ viewTitle }}

    .vuecal__scrollable
      WeekdaysBar
      VueCalBody
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
import { computed, provide, watch } from 'vue'
import VueCal from './core/index'
import { props as propsDefinitions } from './core/props-definitions'
import VueCalHeader from './components/header.vue'
import VueCalBody from './components/body.vue'
import WeekdaysBar from './components/weekdays-bar.vue'

const props = defineProps(propsDefinitions)
const emit = defineEmits(['update:view', 'update:selectedDate', 'update:viewDate'])
const vuecal = new VueCal(props, emit)
const { config, view } = vuecal

const wrapperClasses = computed(() => ({
  'vuecal--ready': config.ready,
  'vuecal--xs': config.xs,
  'vuecal--sm': config.sm,
  'vuecal--date-picker': props.datePicker,
  [`vuecal--${view.id}-view`]: true
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
  --vuecal-primary-color: #1976D2;
  --vuecal-secondary-color: #fff;

  display: flex;
  flex-direction: column;
  height: 100%;

  &__scrollable {
    overflow: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
}

.vuecal--default-theme {
  // Calendar Header.
  // ------------------------------------------------------
  border-radius: 6px;

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
  .vuecal__title button,
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
    border: 1px solid rgba(#000, 0.1);
    border-top: none;
  }

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
  .vuecal__cells.month-view .vuecal__cell {height: 16.66%;}

  .vuecal--month-view .vuecal__cell-content {
    justify-content: flex-start;
    height: 100%;
    align-items: flex-end;
    overflow: auto;
  }

  .vuecal__cell-date {
    position: sticky;
    top: 0;
  }

  .vuecal--month-view .vuecal__cell-date {
    padding: 4px;
    border-radius: 99em;
    width: 2em;
    aspect-ratio: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eaf5ff;
    color: rgb(0 0 0 / 60%);
    margin: 4px;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: -0.5px;
  }
  .vuecal__cell--out-of-scope .vuecal__cell-date {opacity: 0.4;}

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

  // Sm and xs layouts.
  // ------------------------------------------------------
  &.vuecal--sm {
    .vuecal__view-button,
    .vuecal__nav,
    .vuecal__title button,
    .vuecal__nav--today {padding: 6px 8px;}
  }
  &.vuecal--xs {
    .vuecal__view-button,
    .vuecal__nav,
    .vuecal__title button,
    .vuecal__nav--today {padding: 2px 4px;}

    .vuecal__title {gap: 4px;}
    .vuecal__title small {padding-left: 3px;padding-right: 3px;}
  }
}

// Transitions.
// --------------------------------------------------------
.vuecal-slide-fade--left-enter-active, .vuecal-slide-fade--left-leave-active,
.vuecal-slide-fade--right-enter-active, .vuecal-slide-fade--right-leave-active {
  transition: 0.25s ease-out;
}

.vuecal-slide-fade--left-enter-from,
.vuecal-slide-fade--right-leave-to {
  transform: translateX(-15px);
  opacity: 0;
}

.vuecal-slide-fade--left-leave-to,
.vuecal-slide-fade--right-enter-from {
  transform: translateX(15px);
  opacity: 0;
}

.vuecal-slide-fade--left-leave-active,
.vuecal-slide-fade--right-leave-active {position: absolute !important;height: 100%;}
.vuecal__title-bar .vuecal-slide-fade--left-leave-active,
.vuecal__title-bar .vuecal-slide-fade--right-leave-active {left: 0;right: 0;height: auto;}
.vuecal__heading .vuecal-slide-fade--left-leave-active,
.vuecal__heading .vuecal-slide-fade--right-leave-active {display: flex;align-items: center;}

</style>
