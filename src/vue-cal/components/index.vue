<template lang="pug">
.vuecal(
  ref="vuecal-el"
  :data-locale="locale"
  :class="wrapperClasses"
  :style="wrapperStyles")
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

    .vuecal__scrollable-wrap
      transition(:name="`vuecal-slide-fade--${view.transitionDirection}`")
        .vuecal__scrollable(
          :class="scrollableElClasses"
          :key="view.id + view.start.getTime()")
          TimeColumn(v-if="hasTimeColumn")
            template(v-if="$slots['time-cell']" #time-cell="{ index, minutes, format12, format24 }")
              slot(name="time-cell" :index="index" :minutes="minutes" :format12="format12" :format24="format24")
          .w-flex.column.grow
            WeekdaysBar
            .vuecal__cell-schedules(v-if="config.schedules && view.isDay")
              .vuecal__cell-schedule.vuecal__cell-schedule--label(
                v-for="(schedule, i) in config.schedules"
                :key="i"
                :class="schedule.class"
                v-html="schedule.label")

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
import { computed, nextTick, onMounted, provide, useAttrs, useTemplateRef, watch } from 'vue'
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
