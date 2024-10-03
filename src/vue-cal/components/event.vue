<template lang="pug">
.vuecal__event(v-on="eventListeners" :class="classes" :style="styles")
  .vuecal__event-title
    | {{ event.title }}
  .vuecal__event-content(v-html="event.content")
  .vuecal__event-time
    | {{ event._[`startTimeFormatted${config.twelveHour ? 12 : 24}`] }}
    | - {{ event._[`endTimeFormatted${config.twelveHour ? 12 : 24}`] }}
</template>

<script setup>
import { computed, inject } from 'vue'

const { config, eventsManager, view } = inject('vuecal')

const props = defineProps({
  id: { type: Number, required: true }
})

const event = computed(() => eventsManager.getEvent(props.id))

// Automatically forwards any event listener attached to vuecal starting with @event- to the
// (calendar) event.
const eventListeners = computed(() => {
  return { ...config.eventListeners.event }
})

const classes = computed(() => ({
  [`vuecal__event--${props.id}`]: true,
  [event.value.class]: !!event.value.class,
  'vuecal__event--recurring': !!event.recurring,
  'vuecal__event--multiday': !!event._?.multiday
}))

const styles = computed(() => {
  if (!config.time || view.isMonth) return false
  const deltaTimeScale = config.timeTo - config.timeFrom
  return {
    top: `${(event.value._.startMinutes - config.timeFrom) * 100 / deltaTimeScale}%`,
    height: `${event.value._.duration * 100 / deltaTimeScale}%`
  }
})
</script>

<style lang="scss">
.vuecal__event {
  position: absolute;
  left: 0;
  width: 90%;

  .vuecal__scrollable--month-view & {position: relative;}
}
</style>
