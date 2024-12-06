<template lang="pug">
.vuecal__event(
  v-on="eventListeners"
  ref="eventEl"
  :class="classes"
  :style="styles")
  .vuecal__event-title
    | {{ event.title }}
  .vuecal__event-content(v-html="event.content")
  .vuecal__event-time(v-if="config.time")
    | {{ event._[`startTimeFormatted${config.twelveHour ? 12 : 24}`] }}
    | - {{ event._[`endTimeFormatted${config.twelveHour ? 12 : 24}`] }}
</template>

<script setup>
import { computed, inject, reactive, ref } from 'vue'
import { minutesToPercentage } from '@/vue-cal/utils/cell'

const emit = defineEmits(['event-drag-start', 'event-drag-end'])
const { config, eventsManager, view } = inject('vuecal')

const props = defineProps({
  id: { type: Number, required: true }
})

const eventEl = ref(null)
const event = computed(() => eventsManager.getEvent(props.id))

const touch = reactive({
  dragging: false,
  holding: false, // When the event is clicked and hold for a certain amount of time.
  holdTimer: null, // event click and hold detection.
  startX: 0,
  startY: 0,
  moveX: 0,
  moveY: 0,
  startPercentageX: 0,
  startPercentageY: 0,
  movePercentageX: 0,
  movePercentageY: 0,
  schedule: null
})

const classes = computed(() => ({
  [`vuecal__event--${props.id}`]: true,
  [event.value.class]: !!event.value.class,
  'vuecal__event--recurring': !!event.value.recurring,
  'vuecal__event--background': !!event.value.background,
  'vuecal__event--multiday': !!event.value._?.multiday,
  'vuecal__event--cut-top': event.value._?.startMinutes < config.timeFrom,
  'vuecal__event--cut-bottom': event.value._?.endMinutes > config.timeTo
}))

const styles = computed(() => {
  if (!config.time || view.isMonth) return false

  // Ensure that the event start and end stay in range.
  const from = Math.max(config.timeFrom, event.value._.startMinutes)
  const to = Math.min(config.timeTo, event.value._.endMinutes)

  const top = minutesToPercentage(from, config)
  const height = minutesToPercentage(to, config) - top

  return { top: `${top}%`, height: `${height}%` }
})

// Automatically forwards any event listener attached to vuecal starting with @event- to the
// (calendar) event.
const eventListeners = computed(() => {
  const eventListeners = { ...config.eventListeners.event }

  // Inject the event details in each eventListener handler call as 2nd param.
  Object.entries(eventListeners).forEach(([eventListener, handler]) => {
    eventListeners[eventListener] = e => handler({ e, event: event.value })
  })

  // Store a copy of any potential external handler to combine with internal handlers like click,
  // touchstart, mousedown.
  const externalHandlers = { ...eventListeners }

  eventListeners.touchstart = e => {
    onMousedown(e)
    externalHandlers.touchstart?.({ e })
  }
  eventListeners.mousedown = e => {
    onMousedown(e)
    externalHandlers.mousedown?.({ e })
  }

  return eventListeners
})

// On mousedown OR TOUCHSTART on the event.
const onMousedown = e => {
  const rect = eventEl.value.getBoundingClientRect()
  touch.startX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
  touch.startY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
  touch.startPercentageX = touch.startX * 100 / rect.width
  touch.startPercentageY = touch.startY * 100 / rect.height

  document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', onDocMousemove)
  document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', onDocMouseup, { once: true })

  touch.holdTimer = setTimeout(() => {
    touch.holding = true
    // If there's an @event-hold external listener, call it.
    eventListeners.value.hold?.({ e, event: event.value })
  }, 1000)
}

const onDocMousemove = e => {
  // Internal emit to the root component to add a CSS class on wrapper while dragging.
  if (!touch.dragging) {
    emit('event-drag-start')
    // If there's an @event-drag-start external listener, call it.
    eventListeners.value.dragStart?.({ e, event: event.value })
  }
  touch.dragging = true
  touch.holdTimer = clearTimeout(touch.holdTimer)
  touch.holding = false

  const rect = eventEl.value.getBoundingClientRect()
  touch.moveX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
  touch.moveY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
  touch.movePercentageX = touch.moveX * 100 / rect.width
  touch.movePercentageY = touch.moveY * 100 / rect.height

  // If there's an @event-drag external listener, call it.
  eventListeners.value.drag?.({ e, event: event.value })
}

const onDocMouseup = async e => {
  touch.holdTimer = clearTimeout(touch.holdTimer)
  touch.holding = false

  if (touch.dragging) {
    // If there's an @event-drag-end external listener, call it.
    eventListeners.value.dragEnd?.({ e, event: event.value })
    emit('event-drag-end') // Internal emit to the root to add a CSS class on wrapper while dragging.
  }
  document.removeEventListener(e.type === 'touchmove' ? 'touchmove' : 'mousemove', onDocMousemove)
  touch.dragging = false

  touch.startX = 0
  touch.startY = 0
  touch.moveX = 0
  touch.moveY = 0
  touch.startPercentageX = 0
  touch.startPercentageY = 0
  touch.movePercentageX = 0
  touch.movePercentageY = 0
  touch.schedule = null
}
</script>

<style lang="scss">
.vuecal__event {
  position: absolute;
  left: 0;
  right: 0;

  .vuecal__scrollable--month-view & {position: relative;}
}
</style>
