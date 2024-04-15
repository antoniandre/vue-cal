<template lang="pug">
.vue-cal__body
  VueCalCell(v-for="i in cellsCount" :index="i")
</template>

<script setup>
import { computed, inject } from 'vue'
import VueCalCell from './cell.vue'

const vuecal = inject('vuecal')

const cellsCount = computed(() => vuecal.availableViews[vuecal.view.value.id].cols * vuecal.availableViews[vuecal.view.value.id].rows)
</script>

<style lang="scss">
.vue-cal__body {
  display: grid;
  grid-template-columns: repeat(var(--vue-cal-grid-columns), 1fr);
  grid-template-rows: repeat(var(--vue-cal-grid-rows), 1fr);
  height: 100%;
}
</style>
