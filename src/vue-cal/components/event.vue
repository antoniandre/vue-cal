<template lang="pug">
.vuecal__event(:class="classes" :style="styles")
  .vuecal__event-title
    | {{ event.title }}
  .vuecal__event-content
    | {{ event.content }}
  .vuecal__event-time
    | {{ event._[`startTimeFormatted${config.twelveHour ? 12 : 24}`] }}
    | - {{ event._[`endTimeFormatted${config.twelveHour ? 12 : 24}`] }}
</template>

<script setup>
import { computed, inject } from 'vue'

const vuecal = inject('vuecal')
const { config, eventsManager } = vuecal

const props = defineProps({
  id: { type: Number, required: true }
})

const event = computed(() => eventsManager.getEvent(props.id))

const classes = computed(() => ({
  [`vuecal__event--${props.id}`]: true,
  [event.value.class]: !!event.value.class,
  'vuecal__event--recurring': !!event.recurring,
  'vuecal__event--multiday': !!event._?.multiday
}))

const styles = computed(() => {
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
}
</style>
