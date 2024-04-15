<template lang="pug">
.vue-cal(
  ref="vueCalRef"
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
import DateUtils from './utils/date'
import VueCalHeader from './components/header.vue'
import VueCalBody from './components/body.vue'

const props = defineProps(propsDefinitions)
const emit = defineEmits(['update:activeView'])
const vuecal = new VueCal(props, emit)
// const vueCalRef = ref(null)
const du = new DateUtils()

const wrapperClasses = computed(() => ({
  'vue-cal--ready': vuecal.ready,
  [`vue-cal--${vuecal.view.value.id}-view`]: true
}))

const wrapperStyles = computed(() => ({
  '--vue-cal-grid-columns': vuecal.availableViews[vuecal.view.value.id].cols,
  '--vue-cal-grid-rows': vuecal.availableViews[vuecal.view.value.id].rows
}))

if (!props.disableDatePrototypes) du._initDatePrototypes()

provide('vuecal', vuecal) // Share the Vue Cal object accross all the Vue components.
</script>

<style lang="scss">
.vue-cal {
  --vue-cal-grid-columns: 7; // Default value, overridden dynamically on view change.
  --vue-cal-grid-rows: 6; // Default value, overridden dynamically on view change.

  height: 100%;
}
</style>
