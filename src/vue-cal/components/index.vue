<template lang="pug">
.vuecal(
  ref="vuecal-el"
  :data-locale="locale"
  :class="wrapperClasses"
  :style="wrapperStyles")
  slot(
    v-if="$slots.diy"
    name="diy"
    :vuecal="vuecal"
    :view="view"
    :available-views="config.availableViews")
  template(v-else)
    VueCalHeader
      template(v-if="$slots.header" #header="header")
        slot(name="header" v-bind="header")
      template(v-if="!$slots.header && $slots['previous-button']" #previous-button)
        slot(name="previous-button")
      template(v-if="!$slots.header && $slots['next-button']" #next-button)
        slot(name="next-button")
      template(v-if="!$slots.header && $slots['today-button']" #today-button)
        slot(name="today-button")
      template(v-if="!$slots.header && $slots.title" #title="title")
        slot(name="title" v-bind="title")

    .vuecal__scrollable-wrap
      transition(:name="`vuecal-slide-fade--${view.transitionDirection}`")
        .vuecal__scrollable(
          :class="scrollableElClasses"
          :key="view.id + view.start.getTime()")
          TimeColumn(v-if="hasTimeColumn")
            template(v-if="$slots['time-cell']" #time-cell="timeCell")
              slot(name="time-cell" v-bind="timeCell")
          .vuecal__body-wrap
            WeekdaysBar
            .vuecal__cell-schedules(v-if="config.schedules && view.isDay")
              .vuecal__cell-schedule.vuecal__cell-schedule--label(
                v-for="(schedule, i) in config.schedules"
                :key="i"
                :class="schedule.class"
                v-html="schedule.label")

            VueCalBody(@drag-start="isDragging = true" @drag-end="isDragging = false")
              template(v-if="$slots.cell" #cell="cell")
                slot(name="cell" v-bind="cell")
              template(v-if="!$slots.cell && $slots['cell-date']" #cell-date="cellDate")
                slot(name="cell-date" v-bind="cellDate")
              template(v-if="!$slots.cell && $slots['cell-content']" #cell-content="cellContent")
                slot(name="cell-content" v-bind="cellContent")
              template(v-if="!$slots.cell && $slots['cell-events']" #cell-events="cellEvents")
                slot(name="cell-events" v-bind="cellEvents")
</template>

<script setup>
import { computed, nextTick, onMounted, provide, ref, useAttrs, useTemplateRef, watch } from 'vue'
import { props as propsDefinitions } from '../core/props-definitions'
import { useVueCal } from '../core/index'
import VueCalHeader from './header.vue'
import VueCalBody from './body.vue'
import WeekdaysBar from './weekdays-bar.vue'
import TimeColumn from './time-column.vue'
import '../index.scss'
import '../default-theme.scss'

const props = defineProps(propsDefinitions)

// In addition to the following emitted events, there are other manually-handled events that are forwarded
// to specific components, allowing the user to have full flexibility and control on their own events:
// cell-click, cell-xxxx, where xxxx is an existing DOM event name given by the end user;
// event-click, event-xxxx, where xxxx is an existing DOM event name given by the end user.
const emit = defineEmits(['ready', 'update:view', 'update:selectedDate', 'update:viewDate'])

const vuecalEl = useTemplateRef('vuecal-el')
const vuecal = useVueCal(props, emit, useAttrs(), vuecalEl)
const { config, view } = vuecal
const isDragging = ref(false)
const hasTimeColumn = computed(() => config.time && (view.isDay || view.isDays || view.isWeek))

const wrapperClasses = computed(() => ({
  'vuecal--ready': config.ready,
  [`vuecal--${config.theme}-theme`]: config.theme,
  [`vuecal--${config.size}`]: true,
  'vuecal--date-picker': config.datePicker,
  'vuecal--dark': config.dark,
  'vuecal--light': !config.dark,
  [`vuecal--${view.id}-view`]: true,
  'vuecal--view-has-time': hasTimeColumn.value,
  'vuecal--dragging': isDragging.value,
  'vuecal--has-schedules': config.schedules
}))

const wrapperStyles = computed(() => ({
  '--vuecal-time-cell-height': config.timeCellHeight && `${config.timeCellHeight}px`
}))

const scrollableElClasses = computed(() => ({
  'vuecal__scrollable--row': hasTimeColumn.value,
  [`vuecal__scrollable--${view.id}-view`]: true
}))

onMounted(async () => {
  await nextTick()
  emit('ready', { config, view })
})

watch(() => config.locale, newLocale => config.loadTexts(newLocale))

// Share the vuecal object across all the Vue components.
provide('vuecal', vuecal)
</script>

<style lang="scss">
.vuecal {
  &__body-wrap {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    // Crucial for the content not to overflow when using --vuecal-min-cell-width or --vuecal-min-schedule-width.
    min-width: 0;
  }

  &__scrollable--days-view &__cell-schedule,
  &__scrollable--week-view &__cell-schedule {min-width: var(--vuecal-min-schedule-width, 0);}
}
</style>
