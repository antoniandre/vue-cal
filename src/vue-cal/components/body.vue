<template lang="pug">
.vue-cal__body
  VueCalCell(v-for="i in cellsCount" :index="i")
</template>

<script setup>
import { computed, inject } from 'vue'
import VueCalCell from './cell.vue'

const view = inject('view')
const gridLayoutPerView = inject('gridLayoutPerView')

const cellsCount = computed(() => gridLayoutPerView[view.value.id].cols * gridLayoutPerView[view.value.id].rows)
</script>

<style lang="scss">
.vue-cal__body {
  display: grid;
  grid-template-columns: repeat(var(--vue-cal-grid-columns), 1fr);
  grid-template-rows: repeat(var(--vue-cal-grid-rows), 1fr);
  height: 100%;
}
</style>
