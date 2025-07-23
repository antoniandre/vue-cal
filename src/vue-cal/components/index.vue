<template lang="pug">
.vuecal(
  ref="vuecal-el"
  :data-locale="locale"
  :class="wrapperClasses"
  :style="wrapperStyles")
  slot(
    v-if="$slots.diy"
    name="diy"
    :vuecal="vuecal")
  template(v-else)
    VueCalHeader
      template(v-if="$slots.header" #header="params")
        slot(name="header" v-bind="params")
      template(v-if="!$slots.header && $slots['previous-button']" #previous-button="params")
        slot(name="previous-button" v-bind="params")
      template(v-if="!$slots.header && $slots['next-button']" #next-button="params")
        slot(name="next-button" v-bind="params")
      template(v-if="!$slots.header && $slots['today-button']" #today-button="params")
        slot(name="today-button" v-bind="params")
      template(v-if="!$slots.header && $slots.title" #title="params")
        slot(name="title" v-bind="params")
      template(v-if="!$slots.header && $slots['title.day']" #title.day="params")
        slot(name="title.day" v-bind="params")
      template(v-if="!$slots.header && $slots['title.days']" #title.days="params")
        slot(name="title.days" v-bind="params")
      template(v-if="!$slots.header && $slots['title.week']" #title.week="params")
        slot(name="title.week" v-bind="params")
      template(v-if="!$slots.header && $slots['title.month']" #title.month="params")
        slot(name="title.month" v-bind="params")
      template(v-if="!$slots.header && $slots['title.year']" #title.year="params")
        slot(name="title.year" v-bind="params")
      template(v-if="!$slots.header && $slots['title.years']" #title.years="params")
        slot(name="title.years" v-bind="params")
      template(v-if="!$slots.header && $slots['schedule-heading']" #schedule-heading="params")
        slot(name="schedule-heading" v-bind="params")

    .vuecal__scrollable-wrap
      transition(:name="`vuecal-slide-fade--${view.transitionDirection}`")
        .vuecal__scrollable(
          :class="scrollableElClasses"
          :key="view.id + view.start.getTime()")
          TimeColumn(v-if="hasTimeColumn")
            template(v-if="$slots['time-cell']" #time-cell="params")
              slot(name="time-cell" v-bind="params")
          .vuecal__week-numbers(v-if="config.weekNumbers && view.isMonth")
            .vuecal__week-number(v-for="i in weekNumbers")
              slot(name="week-number")
                small {{ i }}
          .vuecal__body-wrap
            HeadingsBar
              template(v-if="$slots['weekday-heading']" #weekday-heading="params")
                slot(name="weekday-heading" v-bind="params")
              template(v-if="$slots['schedule-heading']" #schedule-heading="params")
                slot(name="schedule-heading" v-bind="params")
              template(v-if="$slots['event.all-day']" #event.all-day="params")
                slot(name="event.all-day" v-bind="params")
              template(v-if="$slots.event" #event="params")
                slot(name="event" v-bind="params")

            VueCalBody
              template(v-if="$slots.cell" #cell="params")
                slot(name="cell" v-bind="params")
              template(v-if="!$slots.cell && $slots['cell-date']" #cell-date="params")
                slot(name="cell-date" v-bind="params")
              template(v-if="!$slots.cell && $slots['cell-content']" #cell-content="params")
                slot(name="cell-content" v-bind="params")
              template(v-if="!$slots.cell && $slots['cell-events']" #cell-events="params")
                slot(name="cell-events" v-bind="params")
              template(v-if="!$slots.cell && !$slots['cell-events'] && $slots['event.all-day']" #event.all-day="params")
                slot(name="event.all-day" v-bind="params")
              template(v-if="!$slots.cell && !$slots['cell-events'] && $slots[`event.${view.id}`]" #[`event.${view.id}`]="params")
                slot(:name="`event.${view.id}`" v-bind="params")
              template(v-if="!$slots.cell && !$slots['cell-events'] && $slots.event" #event="params")
                slot(name="event" v-bind="params")
              template(v-if="!$slots.cell && $slots['event-count']" #event-count="params")
                slot(name="event-count" v-bind="params")
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, provide, useAttrs, useId, useTemplateRef } from 'vue'
import { props as propsDefinitions } from '../core/props-definitions'
import { useVueCal } from '../core/index'
import VueCalHeader from './header.vue'
import HeadingsBar from './headings-bar.vue'
import TimeColumn from './time-column.vue'
import VueCalBody from './body.vue'
import '../index.scss'
import '../default-theme.scss'

const props = defineProps(propsDefinitions)

// In addition to the following emitted events, there are other manually-handled events that are forwarded
// to specific components, allowing the user to have full flexibility and control on their own events:
// cell-click, cell-xxxx, where xxxx is an existing DOM event name given by the end user;
// event-click, event-xxxx, where xxxx is an existing DOM event name given by the end user.
const emit = defineEmits([
  'ready',
  'view-change',
  'update:view',
  'update:selectedDate',
  'update:viewDate',
  'update:events',
  'event-delete',
  'event-created',
  'event-dropped',
  'event-drag-start',
  'event-drag-end'
])

const vuecalEl = useTemplateRef('vuecal-el')
const vuecal = useVueCal({ props, emit, attrs: useAttrs(), vuecalEl, uid: useId() })
const { config, view, dateUtils, touch: touchState } = vuecal
const hasTimeColumn = computed(() => config.time && (view.isDay || view.isDays || view.isWeek))

const weekNumbers = computed(() => {
  return Array(view.rows).fill().map((v, i) => {
    return dateUtils.getWeek(dateUtils.addDays(view.firstCellDate, 7 * i))
  })
})

const wrapperClasses = computed(() => ({
  'vuecal--ready': config.ready,
  [`vuecal--${config.theme}-theme`]: config.theme,
  [`vuecal--${config.size}`]: true,
  'vuecal--date-picker': config.datePicker,
  'vuecal--dark': config.dark,
  'vuecal--light': !config.dark,
  [`vuecal--${view.id}-view`]: true,
  'vuecal--view-has-time': hasTimeColumn.value,
  'vuecal--timeless': !config.time,
  'vuecal--dragging-cell': touchState.isDraggingCell,
  'vuecal--dragging-event': touchState.isDraggingEvent,
  'vuecal--resizing-event': touchState.isResizingEvent,
  'vuecal--has-schedules': config.schedules?.length
}))

const wrapperStyles = computed(() => ({
  '--vuecal-time-cell-height': config.timeCellHeight && `${config.timeCellHeight}px`
}))

const scrollableElClasses = computed(() => ({
  'vuecal__scrollable--row': hasTimeColumn.value || (config.weekNumbers && view.isMonth),
  // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
  [`vuecal__scrollable--${view.id}-view`]: true,
  'vuecal__scrollable--has-schedules': config.schedules?.length,
  'vuecal__scrollable--no-schedules': !config.schedules?.length,
  'vuecal__scrollable--no-all-day-bar': !config.allDayEvents,
  'vuecal__scrollable--has-all-day-bar': config.allDayEvents
}))

const contextMenuHandler = e => {
  if (e.target.closest('.vuecal__cell')) e.preventDefault()
}

onMounted(async () => {
  // If touch device, prevent contextmenu on the cell so we can scroll on the cell on touch devices
  // or create an event on long press.
  if (typeof window !== 'undefined' && window.hasOwnProperty('ontouchstart')) {
    vuecalEl.value.addEventListener('contextmenu', contextMenuHandler)
  }

  await nextTick()
  config.ready = true
  emit('ready', { config, view })
})

onBeforeUnmount(() => {
  vuecalEl?.value?.removeEventListener('contextmenu', contextMenuHandler)
})

// Share the vuecal object across all the Vue components.
provide('vuecal', vuecal)
provide('$vuecalEl', vuecalEl)

defineExpose({ view: vuecal.view })
</script>
