<template lang="pug">
.vuecal__header
  slot(
    name="header"
    :view="view.id"
    :available-views="availableViews"
    :vuecal="vuecal")

  template(v-if="!$slots.header")
    .vuecal__views-bar(v-if="!options.hideViewsBar")
      button.vuecal__view-button(
        v-for="(obj, id) in availableViews"
        @click="view.switchView(id)"
        v-html="vuecal.texts.value[id]"
        :class="{ 'vuecal__view-button--active': view.id === id }"
        type="button")

    nav.vuecal__title-bar(v-if="!options.hideTitleBar")
      button.vuecal__nav.vuecal__nav--prev(
        @click="view.previous"
        :class="{ 'vuecal__nav--default': !$slots['previous-button'] }"
        type="button")
        slot(name="previous-button")
      component.vuecal__title(:is="'button'" v-html="view.title")
      button.vuecal__nav.vuecal__nav--today(
        v-if="$slots['today-button']"
        @click="view.goToToday"
        :class="{ 'vuecal__nav--active': view.containsToday }"
        type="button")
        slot(name="today-button")
      button.vuecal__nav.vuecal__nav--today.vuecal__nav--default(
        @click="view.goToToday"
        :class="{ 'vuecal__nav--active': view.containsToday }"
        type="button"
        v-html="vuecal.texts.value.today")
      button.vuecal__nav.vuecal__nav--next(
        @click="view.next"
        :class="{ 'vuecal__nav--default': !$slots['next-button'] }"
        type="button")
        slot(name="next-button")
</template>

<script setup>
import { inject } from 'vue'

const vuecal = inject('vuecal')
const { view, config: { props: options, availableViews } } = vuecal
</script>

<style lang="scss">
.vuecal__header {
  position: relative;
  user-select: none;

  button {
    background: none;
    border: none;
    cursor: pointer;
    color: inherit;
  }
}

.vuecal__views-bar {
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
  gap: 6px;
  font-weight: bold;
  font-size: 1.05em;

  small {
    display: inline-flex;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: normal;
    font-size: 0.8em;
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

  &--today {
    position: relative;
    align-items: center;
    display: flex;

    &.vuecal__nav--default {text-transform: uppercase;}
  }
  &--prev {margin-left: 0.6em;}
  &--next {margin-right: 0.6em;}

  &--prev.vuecal__nav--default:before,
  &--next.vuecal__nav--default:before {
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
