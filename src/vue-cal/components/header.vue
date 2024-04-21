<template lang="pug">
.vuecal__header
  slot(
    name="header"
    :view="vuecal.view.value.id"
    :available-views="vuecal.availableViews.value"
    :vuecal="vuecal")
  .vuecal__view-selector(v-if="!$slots.header")
    button.vuecal__view-button(
      v-for="(view, id) in vuecal.availableViews.value"
      @click="vuecal.switchView(id)"
      v-html="vuecal.texts.value[id]"
      :class="{ 'vuecal__view-button--active': vuecal.view.value.id === id }"
      type="button")

  nav.vuecal__title-bar
    button.vuecal__nav.vuecal__nav--prev(
      @click="vuecal.previous"
      :class="{ 'vuecal__nav--default': !$slots['previous-button'] }"
      type="button")
      slot(name="previous-button")
    component.vuecal__title(:is="'button'" v-html="vuecal.view.value.title")
    button.vuecal__nav.vuecal__nav--today(
      @click="vuecal.goToToday"
      :class="{ 'vuecal__nav--active': vuecal.view.value.containsToday }"
      type="button")
      slot(name="today-button")
        span.default(v-html="vuecal.texts.value.today")
    button.vuecal__nav.vuecal__nav--next(
      @click="vuecal.next"
      :class="{ 'vuecal__nav--default': !$slots['next-button'] }"
      type="button")
      slot(name="next-button")
</template>

<script setup>
import { inject } from 'vue'

const vuecal = inject('vuecal')
</script>

<style lang="scss">
.vuecal__header {
  position: relative;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
  }
}

.vuecal__view-selector {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
}

.vuecal__title-bar {display: flex;}

.vuecal__title {
  position: relative;
  justify-content: center;
  background-color: rgba(#fff, 0.1);
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
  font-size: 1.1em;

  small {
    display: inline-flex;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(#000, 0.15);
  }
}

.vuecal__header nav {background-color: rgba(#fff, 0.2);}

.vuecal__nav {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &--prev {margin-left: 0.6em;}
  &--next {margin-right: 0.6em;}
  &--today {
    position: relative;
    align-items: center;
    display: flex;
  }

  &--default:before {
    content: '';
    border: solid currentColor;
    border-width: 0 2px 2px 0;
    padding: 0.25em;
    transform: translateX(-1px) rotate(-45deg);
  }

  &--prev.vuecal__nav--default:before {
    border-width: 2px 0 0 2px;
    transform: translateX(1px) rotate(-45deg);
  }
}
</style>
