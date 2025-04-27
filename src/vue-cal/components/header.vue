<template lang="pug">
.vuecal__header
  slot(
    name="header"
    :view="view"
    :available-views="config.availableViews"
    :vuecal="vuecal")

  template(v-if="!$slots.header")
    .vuecal__views-bar(v-if="config.viewsBar")
      button.vuecal__view-button(
        v-for="(obj, id) in config.availableViews"
        @click="view.switch(id)"
        v-html="vuecal.texts[id]"
        :class="{ 'vuecal__view-button--active': view.id === id }"
        type="button")

    nav.vuecal__title-bar(v-if="config.titleBar")
      button.vuecal__nav.vuecal__nav--prev(
        @click="view.previous"
        :class="{ 'vuecal__nav--default': !$slots['previous-button'] }"
        type="button")
        slot(name="previous-button")
      .vuecal__transition-wrap
        transition(:name="`vuecal-slide-fade--${view.transitionDirection}`")
          div(:key="view.id + view.start.getTime()")
            component.vuecal__title(
              v-if="$slots.title || $slots[`title.${view.id}`]"
              :is="config.clickToNavigate && view.broaderView ? 'button' : 'div'"
              v-on="titleEventHandlers")
              slot(v-if="$slots[`title.${view.id}`]" :name="`title.${view.id}`" v-bind="view")
              slot(v-else name="title" v-bind="view")
            component.vuecal__title(
              v-else
              :is="config.clickToNavigate && view.broaderView ? 'button' : 'div'"
              v-on="titleEventHandlers"
              v-html="view.title")
      template(v-if="config.todayButton")
        slot(
          v-if="$slots['today-button']"
          name="today-button"
          :navigate="() => !view.containsToday && view.goToToday()"
          :active="view.containsToday")
        button.vuecal__nav.vuecal__nav--today.vuecal__nav--default(
          v-else
          @click="!view.containsToday && view.goToToday()"
          :disabled="!!view.containsToday"
          :class="{ 'vuecal__nav--active': view.containsToday }"
          type="button"
          v-html="vuecal.texts.today")
      button.vuecal__nav.vuecal__nav--next(
        @click="view.next"
        :class="{ 'vuecal__nav--default': !$slots['next-button'] }"
        type="button")
        slot(name="next-button")
</template>

<script setup>
import { computed, inject } from 'vue'

const vuecal = inject('vuecal')
const { view, config } = vuecal

const onTitleClick = () => {
  if (config.clickToNavigate) view.broader()
}

const titleEventHandlers = computed(() => config.clickToNavigate ? { click: onTitleClick } : {})
</script>

<style lang="scss">
.vuecal__header {
  position: relative;
  user-select: none;
}

.vuecal__views-bar {
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
}

.vuecal__title-bar {display: flex;}

.vuecal__header .vuecal__transition-wrap {
  position: relative;
  flex-grow: 1;
  min-height: 1px; // Fix the famous issue of the container overflowing the flex parent.

  & > div {
    position: absolute;
    inset: 0;
    white-space: nowrap;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }
}

.vuecal__title {
  position: relative;
  justify-content: center;
  margin: auto; // If the title is a button (when navigation is enabled), better have it fit to the content.
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: inherit;
  font-weight: bold;
  font-size: 1.05em;

  // The week number label.
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

    &[disabled] {cursor: default;}

    &.vuecal__nav--default {text-transform: uppercase;}
  }

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
