<template lang="pug">
.vuecal__event(
  v-on="eventListeners"
  ref="eventEl"
  :class="classes"
  :style="styles")
  .vuecal__event-details
    .vuecal__event-title {{ event.title }}
    .vuecal__event-content(v-html="event.content")
    .vuecal__event-time(v-if="config.time")
      | {{ event._[`startTimeFormatted${config.twelveHour ? 12 : 24}`] }}
      | - {{ event._[`endTimeFormatted${config.twelveHour ? 12 : 24}`] }}
  .vuecal__event-resizer
  transition(name="vuecal-delete-btn")
    .vuecal__event-delete(v-if="event._.deleting" @click="emit('event-deleted', event._.id)") Delete
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted, reactive, ref } from 'vue'
import { minutesToPercentage } from '@/vue-cal/utils/cell'

const emit = defineEmits(['event-drag-start', 'event-drag-end'])
const { config, view } = inject('vuecal')

const props = defineProps({
  event: { type: Object, required: true }
})

const eventEl = ref(null)
const event = reactive(props.event)

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
  [`vuecal__event--${event._.id}`]: true,
  [event.class]: !!event.class,
  'vuecal__event--recurring': !!event.recurring,
  'vuecal__event--background': !!event.background,
  'vuecal__event--multiday': !!event._?.multiday,
  'vuecal__event--cut-top': event._?.startMinutes < config.timeFrom,
  'vuecal__event--cut-bottom': event._?.endMinutes > config.timeTo,
  'vuecal__event--dragging': touch.dragging
}))

const styles = computed(() => {
  if (!config.time || view.isMonth) return false

  // Ensure that the event start and end stay in range.
  const from = Math.max(config.timeFrom, event._.startMinutes)
  const to = Math.min(config.timeTo, event._.endMinutes)

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
    eventListeners[eventListener] = e => {
      // SHOULD NOT PREVENT BUBBLING UP TO THE CELL WHEN INTERACTING WITH THE EVENT:
      // if we stop bubbling, we will not receive the onMouseup listened from document if releasing
      // on the event. Instead, in the cell don't call the mouseup handler if releasing on the event.
      // e.stopPropagation()

      // Check if e.type to not rewrap the DOM event in an object if already done.
      handler(e.type ? { e, event } : e)
    }
  })

  // Store a copy of any potential external handler to combine with internal handlers like click,
  // touchstart, mousedown.
  const externalHandlers = { ...eventListeners }

  eventListeners.touchstart = e => {
    e.stopPropagation()
    externalHandlers.touchstart?.({ e })
  }
  eventListeners.mousedown = e => {
    e.stopPropagation()
    onMousedown(e)

    externalHandlers.mousedown?.({ e })
  }
  eventListeners.dblclick = e => {
    onDblclick()

    externalHandlers.dblclick?.({ e })
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
    eventListeners.value.hold?.({ e, event })
  }, 1000)
}

const onDocMousemove = e => {
  // Internal emit to the root component to add a CSS class on wrapper while dragging.
  if (!touch.dragging) {
    emit('event-drag-start')
    // If there's an @event-drag-start external listener, call it.
    eventListeners.value.dragStart?.({ e, event })
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
  eventListeners.value.drag?.({ e, event })
}

// Delete event on double click by default.
const onDblclick = () => event.delete(1)

const onDocMouseup = async e => {
  touch.holdTimer = clearTimeout(touch.holdTimer)
  touch.holding = false

  if (touch.dragging) {
    // If there's an @event-drag-end external listener, call it.
    eventListeners.value.dragEnd?.({ e, event })
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

// Register the DOM node within the event in order to emit `event-deleted` to the cell.
onMounted(() => event._.register(eventEl.value))

onUnmounted(() => event._.unregister())
</script>

<style lang="scss">
.vuecal__event {
  position: absolute;
  left: 0;
  right: 0;

  .vuecal__scrollable--month-view & {position: relative;}
}

.vuecal-delete-btn-enter-active {
  transition: 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.vuecal-delete-btn-enter-from {
  transform: scale(0) rotate(-90deg);
}
.vuecal-delete-btn-enter-to {
  transform: scale(1);
}
.vuecal-delete-btn-leave-active {
  transition: 0.3s ease-in-out;
  transform: scale(0);
}
</style>
