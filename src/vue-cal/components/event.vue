<template lang="pug">
.vuecal__event(:class="classes" :style="styles")
  .vuecal__event-title
    | {{ event.title }}
  .vuecal__event-content
    | {{ event.content }}
  .vuecal__event-time
    | {{ event._.startMinutesFormatted }}-{{ event._.endMinutesFormatted }}
</template>

<script setup>
import { computed, inject } from 'vue'

const vuecal = inject('vuecal')

const props = defineProps({
  id: { type: Number, required: true }
})

const classes = computed(() => ({
  [`vuecal__event--${props.id}`]: true,
  [event.class]: !!event.class
}))

const styles = computed(() => ({
  top: `0px`,
  height: `0px`
}))

const event = computed(() => vuecal.eventsManager.getEvent(props.id))
</script>

<style lang="scss">
.vuecal__event {
  position: absolute;
  left: 0;
  width: 90%;
}
</style>
