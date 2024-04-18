<template lang="pug">
.vue-cal(:data-locale="locale" :class="wrapperClasses" :style="wrapperStyles")
  slot(v-if="$slots.diy" name="diy" :view="vuecal.view" :vuecal="vuecal")
  template(v-else)
    VueCalHeader
      template(v-if="$slots.header" #header="{ view, availableViews, vuecal }")
        slot(name="header" :view="view" :available-views="availableViews" :vuecal="vuecal")
      template(v-if="!$slots.header && $slots['arrow-prev']" #arrow-prev)
        slot(name="arrow-prev")
      template(v-if="!$slots.header && $slots['arrow-next']" #arrow-next)
        slot(name="arrow-next")
      template(v-if="!$slots.header" #today-button)
        slot(name="today-button")
      template(v-if="!$slots.header" #title)
        slot(name="title" :title="viewTitle" :view="view") {{ viewTitle }}

    VueCalBody
      template(v-if="$slots.cell" #cell="{ date, index, events }")
        slot(name="cell" :date="date" :index="index" :events="events")
      template(v-if="$slots['cell-date-time']" #cell-date-time="{ date, events }")
        slot(name="cell-date-time" :date="date" :events="events")
      template(v-if="$slots['cell-content']" #cell-content="{ date, events }")
        slot(name="cell-content" :date="date" :events="events")
      template(v-if="$slots['cell-events']" #cell-events="{ date, events }")
        slot(name="cell-events" :date="date" :events="events")
</template>

<script setup>
import { computed, ref, provide, defineEmits } from 'vue'
import VueCal from './vue-cal'
import { props as propsDefinitions } from './components/props-definitions'
import VueCalHeader from './components/header.vue'
import VueCalBody from './components/body.vue'

const props = defineProps(propsDefinitions)
const emit = defineEmits(['update:view', 'update:selectedDate', 'update:viewDate'])
const vuecal = new VueCal(props, emit)

const wrapperClasses = computed(() => ({
  'vue-cal--ready': vuecal.ready,
  [`vue-cal--${vuecal.view.value.id}-view`]: true
}))

const wrapperStyles = computed(() => {
  return {
    '--vue-cal-grid-columns': vuecal.availableViews.value[vuecal.view.value.id].cols,
    '--vue-cal-grid-rows': vuecal.availableViews.value[vuecal.view.value.id].rows
  }
})

provide('vuecal', vuecal) // Share the Vue Cal object across all the Vue components.
</script>

<style lang="scss">
.vue-cal {
  --vue-cal-grid-columns: 7; // Default value, overridden dynamically on view change.
  --vue-cal-grid-rows: 6; // Default value, overridden dynamically on view change.

  height: 100%;
}
</style>
