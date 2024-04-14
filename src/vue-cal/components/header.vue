<template lang="pug">
.vue-cal__header
  .vue-cal__view-selector
    button(
      v-for="(view, id) in availableViews"
      type="button"
      @click="switchView(id)") {{ id }}
  .vue-cal__title {{ id }}
</template>

<script setup>
const availableViews = {
  years: { cols: 5, rows: 5 },
  year: { cols: 3, rows: 4 },
  month: { cols: 7, rows: 6 },
  week: { cols: 7, rows: 1 },
  days: { cols: 5, rows: 1 },
  day: { cols: 1, rows: 1 }
}
</script>

<style lang="scss">
.vue-cal__header {
  display: flex;
}

.vue-cal__view-selector {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;

  button {
    border: none;
    background: none;
    cursor: pointer;
  }
}
</style>
