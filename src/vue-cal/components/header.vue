<template lang="pug">
.vue-cal__header
  slot(
    name="header"
    :view="vuecal.view.value.id"
    :available-views="vuecal.availableViews.value"
    :vuecal="vuecal")
  .vue-cal__view-selector(v-if="!$slots.header")
    button(
      v-for="(view, id) in vuecal.availableViews.value"
      type="button"
      @click="vuecal.switchView(id)") {{ vuecal.texts.value[id] }}
  .vue-cal__title {{ vuecal.view.title }}
</template>

<script setup>
import { inject } from 'vue'

const vuecal = inject('vuecal')
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
