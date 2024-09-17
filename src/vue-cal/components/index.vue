<template lang="pug">
.vuecal(
  :data-locale="locale"
  :class="wrapperClasses"
  :style="wrapperStyles")
  p Start-end: {{ view.start.format('YYYY-MM-DD HH:mm') }} - {{ view.end.format('YYYY-MM-DD HH:mm') }}
  p firstCell-lastCell: {{ view.firstCellDate.format('YYYY-MM-DD HH:mm') }} - {{ view.lastCellDate.format('YYYY-MM-DD HH:mm') }}
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

    .vuecal__transition-wrap
      transition(:name="`vuecal-slide-fade--${view.transitionDirection}`")
        .vuecal__scrollable(
          :class="scrollableElClasses"
          :key="view.id + view.start.getTime()")
          TimeColumn(v-if="hasTimeColumn")
            template(v-if="$slots['time-cell']" #time-cell="{ index, minutes, format12, format24 }")
              slot(name="time-cell" :index="index" :minutes="minutes" :format12="format12" :format24="format24")
          .w-flex.column.grow
            WeekdaysBar
            .vuecal__cell-splits(v-if="config.daySplits && view.isDay")
              .vuecal__cell-split.vuecal__cell-split--label(
                v-for="(split, i) in config.daySplits"
                :key="i"
                :class="split.class"
                v-html="split.label")

            VueCalBody
              template(v-if="$slots.cell" #cell="{ start, end, index, events }")
                slot(name="cell" :start="start" :end="end" :index="index" :events="events")
              template(v-if="!$slots.cell && $slots['cell-date']" #cell-date="{ start, end, events }")
                slot(name="cell-date" :start="start" :end="end" :events="events")
              template(v-if="!$slots.cell && $slots['cell-content']" #cell-content="{ start, end, events }")
                slot(name="cell-content" :start="start" :end="end" :events="events")
              template(v-if="!$slots.cell && $slots['cell-events']" #cell-events="{ start, end, events }")
                slot(name="cell-events" :start="start" :end="end" :events="events")
</template>

<script setup>
import { computed, provide, watch } from 'vue'
import { props as propsDefinitions } from '../core/props-definitions'
import { useVueCal } from '../core/index'
import VueCalHeader from './header.vue'
import VueCalBody from './body.vue'
import WeekdaysBar from './weekdays-bar.vue'
import TimeColumn from './time-column.vue'

const props = defineProps(propsDefinitions)
const emit = defineEmits(['update:view', 'update:selectedDate', 'update:viewDate', 'cell-click'])

const vuecal = useVueCal(props, emit)
const { config, view } = vuecal

const hasTimeColumn = computed(() => config.time && (view.isDay || view.isDays || view.isWeek))

const wrapperClasses = computed(() => ({
  'vuecal--ready': config.ready,
  [`vuecal--${config.size}`]: true,
  'vuecal--date-picker': config.datePicker,
  'vuecal--dark': config.dark,
  [`vuecal--${view.id}-view`]: true,
  'vuecal--view-has-time': hasTimeColumn.value,
  'vuecal--has-splits': config.daySplits
}))

const wrapperStyles = computed(() => ({
  '--vuecal-time-cell-height': config.timeCellHeight && `${config.timeCellHeight}px`
}))

const scrollableElClasses = computed(() => ({
  'vuecal__scrollable--row': hasTimeColumn.value,
  [`vuecal__scrollable--${view.id}-view`]: true
}))

watch(() => config.locale, newLocale => config.loadTexts(newLocale))

// Share the vuecal object across all the Vue components.
provide('vuecal', vuecal)
</script>

<style lang="scss">
.vuecal {
  --vuecal-grid-columns: 7; // Default value, overridden dynamically on view change.
  --vuecal-grid-rows: 6; // Default value, overridden dynamically on view change.
  --vuecal-weekdays-bar-height: 1.6rem;
  --vuecal-time-cell-height: 50px; // Default value, can be overridden from props.
  // When there are too many day cells to fit in the view, setting a min cell width will help
  // visualizing and a horizontal scrollbar will be added.
  --vuecal-min-cell-width: 0;

  display: flex;
  flex-direction: column;
  user-select: none;

  &--has-splits {--vuecal-weekdays-bar-height: 2.2rem;}
  &--has-splits.vuecal--day-view {--vuecal-weekdays-bar-height: 1.2rem;}

  &, *, :before, :after {box-sizing: border-box;}

  &__transition-wrap {
    position: relative;
    flex: 1;
    min-height: 1px; // Fix the famous issue of the container overflowing the flex parent.
  }

  &__scrollable {
    position: relative; // For the time cells lines to fill up the whole calendar width.
    overflow: auto;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;

    &--row {flex-direction: row;}
  }

  .grow {flex-grow: 1;}

  // Shared in headers and cells.
  &__cell-splits {display: flex;}
  &__cell-split {
    position: relative;
    display: flex;
    flex-grow: 1;
    flex-basis: 0;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
  }
  &__cell-split--label {
    font-size: 12px;
    align-items: center;
  }
  &--has-splits.vuecal--day-view &__cell-split--label {height: var(--vuecal-weekdays-bar-height);}
}

// Transitions.
// --------------------------------------------------------
.vuecal-slide-fade--left-enter-active, .vuecal-slide-fade--left-leave-active,
.vuecal-slide-fade--right-enter-active, .vuecal-slide-fade--right-leave-active {
  transition: 0.25s ease-in-out;
}

.vuecal-slide-fade--left-enter-from,
.vuecal-slide-fade--right-leave-to {
  transform: translateX(-12px);
  opacity: 0;
}

.vuecal-slide-fade--left-leave-to,
.vuecal-slide-fade--right-enter-from {
  transform: translateX(12px);
  opacity: 0;
}

.vuecal-slide-fade--left-enter-active,
.vuecal-slide-fade--right-enter-active,
// When navigating hyper fast, make sure that any left-over 3rd animated container is positioned absolute
// so it does not briefly appear below the calendar.
.vuecal-slide-fade--left-leave-active ~ .vuecal-slide-fade--left-leave-active,
.vuecal-slide-fade--right-leave-active ~ .vuecal-slide-fade--right-leave-active {
  position: absolute !important;
  inset: 0;
}

@import '../default-theme.scss'; // Keep at the end.
</style>
