<template lang="pug">
.vuecal__header
  slot(
    name="header"
    :view="vuecal.view.value.id"
    :available-views="vuecal.availableViews.value"
    :vuecal="vuecal")

  .vuecal__views-bar(v-if="!$slots.header")
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
  .vuecal__weekdays-bar(v-if="isWeekOrDaysView")
    .vuecal__weekday(v-for="day in weekDays") {{ day }}

</template>

<script setup>
import { computed, inject } from 'vue'

const vuecal = inject('vuecal')

const isWeekOrDaysView = computed(() => ['week', 'days'].includes(vuecal.view.value.id))

// Only for days and week views.
const weekDays = computed(() => vuecal.texts.value.weekDays.map((day, i) => {
  day = vuecal.props.small || vuecal.props.xsmall ? day.substring(0, 3) : day
  const date = vuecal.dateUtils.addDays(vuecal.view.value.startDate, i)
  return `${day} ${date.getDate()}`
}))
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

.vuecal__weekdays-bar {
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-width: 0 1px;
}

.vuecal__weekday {
  flex: 1 1 0;
  text-align: center;
}
</style>
