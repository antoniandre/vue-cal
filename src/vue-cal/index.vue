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

@import './default-theme.scss';
</style>
