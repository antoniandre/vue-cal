<template lang="pug">
.vue-cal(
  :data-locale="locale"
  :class="wrapperClasses"
  :style="wrapperStyles")
  VueCalHeader
  VueCalBody
</template>

<script setup>
import { computed, ref, provide, defineEmits } from 'vue'
import VueCal from './vue-cal'
import { props as propsDefinitions } from './components/props-definitions'
import VueCalHeader from './components/header.vue'
import VueCalBody from './components/body.vue'

const props = defineProps(propsDefinitions)
const emit = defineEmits(['update:view'])
const vuecal = new VueCal(props, emit)

const wrapperClasses = computed(() => ({
  'vue-cal--ready': vuecal.ready,
  [`vue-cal--${vuecal.view.id}-view`]: true
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
