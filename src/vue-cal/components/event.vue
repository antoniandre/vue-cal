<template lang="pug">
.vuecal__event(
  v-on="eventListeners"
  ref="eventEl"
  :class="classes"
  :style="styles"
  :draggable="isDraggable"
  @dragstart="isDraggable && dnd.eventDragStart($event, event)"
  @dragend="isDraggable && dnd.eventDragEnd(event)")
  .vuecal__event-details
    slot(name="event" :event="event")
      .vuecal__event-title {{ event.title }}
      .vuecal__event-time(v-if="config.time")
        | {{ event._[`startTimeFormatted${config.twelveHour ? 12 : 24}`] }}
        | - {{ event._[`endTimeFormatted${config.twelveHour ? 12 : 24}`] }}
      .vuecal__event-content(v-html="event.content")
  .vuecal__event-resizer(v-if="isResizable" @dragstart.prevent.stop)
  transition(name="vuecal-delete-btn")
    .vuecal__event-delete(v-if="event._.deleting" @click.stop="onDelete") Delete
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted, reactive, ref } from 'vue'
import { minutesToPercentage, percentageToMinutes } from '@/vue-cal/utils/conversions'

const emit = defineEmits(['event-drag-start', 'event-drag-end', 'event-resize-start', 'event-resize-end'])
const { config, view, dnd, touch: globalTouchState } = inject('vuecal')

const props = defineProps({
  event: { type: Object, required: true }
})

const eventEl = ref(null)
const event = reactive(props.event)

const touch = reactive({
  dragging: false,
  resizing: false,
  fromResizer: false, // If the drag originates from the resizer element.
  holding: false, // When the event is clicked and hold for a certain amount of time.
  holdTimer: null, // event click and hold detection.
  startX: 0, // The X coords at the start of the drag.
  startY: 0, // The Y coords at the start of the drag.
  startPercentageX: 0, // The X coords in percentage at the start of the drag.
  startPercentageY: 0, // The Y coords in percentage at the start of the drag.
  moveX: 0, // The X coords while dragging.
  moveY: 0, // The Y coords while dragging.
  movePercentageX: 0, // The X coords in percentage while dragging.
  movePercentageY: 0, // The Y coords in percentage while dragging.
  resizeStartDate: null, // When resizing and going above the start date (end before start) update the start instead of the end.
  cellEl: null, // Store the cell DOM node for a more efficient resizing calc in mousemove/touchmove.
  schedule: null
})

const isDraggable = computed(() => config.editableEvents.drag && event.draggable !== false && !event.background)
const isResizable = computed(() => config.time && config.editableEvents.resize && event.resizable !== false && !event.background)
const isDeletable = computed(() => config.editableEvents.delete && event.deletable !== false && !event.background)

const classes = computed(() => ({
  [`vuecal__event--${event._.id}`]: true,
  [event.class]: !!event.class,
  'vuecal__event--recurring': !!event.recurring,
  'vuecal__event--background': !!event.background,
  'vuecal__event--multiday': !!event._?.multiday,
  'vuecal__event--cut-top': event._?.startMinutes < config.timeFrom,
  'vuecal__event--cut-bottom': event._?.endMinutes > config.timeTo,
  // Only apply the dragging class on the event copy that is being dragged.
  'vuecal__event--dragging': !event._.draggingGhost && event._.dragging,
  // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
  // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
  // invisible, so if dragging is false, disable the dragging-ghost class as well.
  'vuecal__event--dragging-ghost': event._.dragging && event._.draggingGhost,
  'vuecal__event--resizing': touch.resizing
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
    externalHandlers.touchstart?.({ e, event })
  }
  eventListeners.mousedown = e => {
    e.stopPropagation()
    onMousedown(e)

    externalHandlers.mousedown?.({ e, event })
  }

  // `event-delayed-click` is only fired after 400ms if there was no dblclick.
  let clickTimeout = null
  eventListeners.click = e => {
    externalHandlers.click?.({ e, event }) // Handle single click.

    // Handle double click in eventListeners.dblclick.
    if (clickTimeout) clickTimeout = clearTimeout(clickTimeout)
    else {
      clickTimeout = setTimeout(() => {
        clickTimeout = null
        externalHandlers['delayed-click']?.({ e, event }) // Handle delayed single click.
      }, 400)
    }
  }
  eventListeners.dblclick = e => {
    if (externalHandlers.dblclick) externalHandlers.dblclick({ e, event })
    // Show delete button on event on double click by default except if dblclick is used externally.
    else event.delete(1)
  }

  return eventListeners
})

// On mousedown OR TOUCHSTART on the event.
const onMousedown = e => {
  const domEvent = e.touches?.[0] || e // Handle click or touch event.
  // If the event target is the resizer, set the resizing flag.
  touch.fromResizer = domEvent.target.matches('.vuecal__event-resizer, .vuecal__event-resizer *')

  const rect = eventEl.value.getBoundingClientRect()
  touch.startX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
  touch.startY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
  touch.startPercentageX = touch.startX * 100 / rect.width
  touch.startPercentageY = touch.startY * 100 / rect.height
  // Store the cell DOM node for a more efficient resizing calc in mousemove/touchmove.
  touch.cellEl = eventEl.value.closest('.vuecal__cell')
  // Store the event start to apply on event end when resizing and end < start.
  touch.resizeStartDate = event.start

  document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', onDocMousemove)
  document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', onDocMouseup, { once: true })

  touch.holdTimer = setTimeout(() => {
    touch.holding = true
    // If there's an @event-hold external listener, call it after holding 1s.
    eventListeners.value.hold?.({ e, event })
  }, 1000)
}

const onDocMousemove = e => {
  const domEvent = e.touches?.[0] || e // Handle click or touch event.

  if (touch.fromResizer && !touch.resizing) {
    touch.resizing = true
    globalTouchState.isResizingEvent = true // Add a CSS class on wrapper while resizing.

    // If there's an @event-resize-start external listener, call it.
    eventListeners.value.resizeStart?.({ e, event })
  }

  touch.holdTimer = clearTimeout(touch.holdTimer)
  touch.holding = false

  if (touch.cellEl) {
    const { top, left, width, height } = touch.cellEl.getBoundingClientRect()
    touch.moveX = domEvent.clientX - left
    touch.moveY = domEvent.clientY - top
    touch.movePercentageX = touch.moveX * 100 / width
    touch.movePercentageY = touch.moveY * 100 / height
  }

  if (touch.fromResizer) {
    const newEnd = new Date(new Date(event.end).setHours(0, percentageToMinutes(touch.movePercentageY, config), 0 , 0))
    // Store the event start to apply on event end when resizing and end < start.
    if (newEnd < touch.resizeStartDate) {
      event.start = newEnd
      event.end = touch.resizeStartDate
    }
    else event.end = newEnd
  }

  // If there's an @event-drag external listener, call it.
  eventListeners.value.drag?.({ e, event })
}

const onDocMouseup = async e => {
  touch.holdTimer = clearTimeout(touch.holdTimer)
  touch.holding = false

  if (touch.resizing) {
    // If there's an @event-resize-end external listener, call it.
    eventListeners.value.resizeEnd?.({ e, event })
    globalTouchState.isResizingEvent = false // Add a CSS class on wrapper while resizing.
  }

  document.removeEventListener(e.type === 'touchmove' ? 'touchmove' : 'mousemove', onDocMousemove)
  touch.resizing = false
  touch.fromResizer = false
  touch.dragging = false

  touch.startX = 0
  touch.startY = 0
  touch.moveX = 0
  touch.moveY = 0
  touch.startPercentageX = 0
  touch.startPercentageY = 0
  touch.movePercentageX = 0
  touch.movePercentageY = 0
  touch.cellEl = null
  touch.resizeStartDate = null
  touch.schedule = null
}

const onDelete = () => {
  // Fire the DOM event manually as it needs to be triggered from events.js on deletion as well.
  // `detail` is the native expected object wrapper.
  eventEl.value.dispatchEvent(new CustomEvent('event-deleted', { detail: event._.id }))
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

  &--dragging {opacity: 1;z-index: 100;}
  &--dragging-ghost {opacity: 0;transition: opacity 0.1s;}

  .vuecal__scrollable--month-view & {position: relative;}

  &--resizing {z-index: 100;}
  &-resizer {
    position: absolute;
    inset: auto 0 0;
    height: 8px;
    background-color: #fff;
    opacity: 0.1;
    transition: 0.25s;
    cursor: ns-resize;

    &:hover {opacity: 0.25;}
  }
}

.vuecal-delete-btn-enter-active {transition: 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);}
.vuecal-delete-btn-enter-from {transform: scale(0) rotate(-90deg);}
.vuecal-delete-btn-enter-to {transform: scale(1);}
.vuecal-delete-btn-leave-active {
  transition: 0.3s ease-in-out;
  transform: scale(0);
}
</style>
