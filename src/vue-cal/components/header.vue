<template lang="pug">
.vue-cal__header
  slot(
    name="header"
    :view="vuecal.view.value.id"
    :available-views="vuecal.availableViews.value"
    :vuecal="vuecal")
  .vue-cal__view-selector(v-if="!$slots.header")
    button.vuecal__view-btn(
      v-for="(view, id) in vuecal.availableViews.value"
      @click="vuecal.switchView(id)"
      :class="{ 'vuecal__view-btn--active': vuecal.view.value.id === id }"
      type="button") {{ vuecal.texts.value[id] }}
  component.vue-cal__title(:is="'button'") {{ vuecal.view.title }}

  nav
    button.vue-cal__nav.vue-cal__nav--prev(@click="vuecal.previous" type="button")
      slot(name="arrow-prev")
        i.angle
    button.vue-cal__nav.vue-cal__nav--today(@click="vuecal.today" type="button")
      slot(name="today-button")
        span.default {{ vuecal.texts.value.today }}
    button.vue-cal__nav.vue-cal__nav--next(@click="vuecal.next" type="button")
      slot(name="arrow-next")
        i.angle
</template>

<script setup>
import { inject } from 'vue'

const vuecal = inject('vuecal')
</script>

<style lang="scss">
.vue-cal__header {
  position: relative;
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

.vue-cal__title {
  position: relative;
  justify-content: center;

  button {
    cursor: pointer;
    background: none;
    border: none;
  }
}

.vue-cal__today-btn {
  position: relative;
  align-items: center;
  display: flex;
  font-size: 0.8em;
  background: none;
  border: none;
  cursor: pointer;

  .default {
    width: 1em;
    aspect-ratio: 1;
    background: none;
    border: 1px solid currentColor;
  }
}

.vue-cal__nav {
  cursor: pointer;
  position: relative;
  z-index: 1;
  background: none;
  border: none;

  &--prev {margin-left: 0.6em;}
  &--next {margin-right: 0.6em;}

  i.angle {
    display: inline-flex;
    border: solid currentColor;
    border-width: 0 2px 2px 0;
    padding: 0.25em;
    transform: rotate(-45deg);
  }

  &--prev i.angle {border-width: 2px 0 0 2px;}
}
</style>
