<template lang="pug">
.vuecal__event(
  v-on="eventListeners"
  ref="eventEl"
  :class="classes"
  :style="styles"
  :draggable="isDraggable ? 'true' : undefined"
  @dragstart="isDraggable && dnd.eventDragStart($event, event)"
  @dragend="isDraggable && dnd.eventDragEnd($event, event)")
  .vuecal__event-details
    slot(v-if="$slots['event.all-day']" name="event.all-day" :event="event")
    slot(v-else-if="$slots[`event.${view.id}`]" :name="`event.${view.id}`" :event="event")
    slot(v-else name="event" :event="event")
      .vuecal__event-title {{ event.title }}
      .vuecal__event-time(v-if="config.time && !inAllDayBar && !(event._.multiday && !eventStartsInThisCell)")
        span.vuecal__event-comma(v-if="view.isMonth") ,
        span.vuecal__event-start {{ event._[`startTimeFormatted${config.twelveHour ? 12 : 24}`] }}
        span.vuecal__event-end(v-if="!view.isMonth")
          | &nbsp;-&nbsp;{{ event._[`endTimeFormatted${config.twelveHour ? 12 : 24}`] }}
          span(v-if="event._.multiday && eventStartsInThisCell") +{{ eventDurationInDays - 1 }}d
      .vuecal__event-content(v-if="!inAllDayBar" v-html="event.content")
  .vuecal__event-resizer(v-if="isResizable" @dragstart.prevent.stop)
  transition(name="vuecal-delete-btn")
    .vuecal__event-delete(v-if="event._.deleting" @click.stop="event.delete(3)") Delete
</template>

<script setup>
/**
 * This component renders an event in full in a cell if the event is not multi-day.
 * If the event is multi-day, it renders a fragment of the event only.
 */

import { computed, inject, onMounted, reactive, ref, onBeforeUnmount } from 'vue'
import { minutesToPercentage, percentageToMinutes } from '@/vue-cal/utils/conversions'

const emit = defineEmits(['event-drag-start', 'event-drag-end', 'event-resize-start', 'event-resize-end'])
const { config, view, dnd, touch: globalTouchState, dateUtils } = inject('vuecal')

const props = defineProps({
  event: { type: Object, required: true },
  inAllDayBar: { type: Boolean, default: false },
  cellStart: { type: Date, required: true },
  cellEnd: { type: Date, required: true }
})

const eventEl = ref(null)
const event = reactive(props.event)

const touch = reactive({
  dragging: false,
  resizing: false,
  fromResizer: false, // If the drag originates from the resizer element.
  holding: false, // When the event is clicked and hold for a certain amount of time.
  holdTimer: null, // event click and hold detection.
  canTouchAndDrag: null, // Wait for 500ms before allowing an event to be dragged after touchstart.
  touchAndDragTimer: null, // Timer for canTouchAndDrag.
  startX: 0, // The X coords at the start of the drag.
  startY: 0, // The Y coords at the start of the drag.
  startPercentageX: 0, // The X coords in percentage at the start of the drag.
  startPercentageY: 0, // The Y coords in percentage at the start of the drag.
  moveX: 0, // The X coords while dragging.
  moveY: 0, // The Y coords while dragging.
  movePercentageX: 0, // The X coords in percentage while dragging.
  movePercentageY: 0, // The Y coords in percentage while dragging.
  resizeStartDate: null, // When resizing and going above the start date (end before start) update the start instead of the end.
  resizingOriginalEvent: null, // Store the original event details while resizing.
  resizingLastAcceptedEvent: null, // Store the last accepted event details while resizing.
  cellEl: null, // Store the cell DOM node for a more efficient resizing calc in mousemove/touchmove.
  schedule: null
})

const isDraggable = computed(() => {
  return config.editableEvents.drag && event.draggable !== false && !event.background && touch.canTouchAndDrag !== false
})

const isResizable = computed(() => {
  if (view.isMonth || view.isYear || view.isYears || props.inAllDayBar) return false
  if (event._.multiday && !eventEndsInThisCell.value) return false
  return config.time && config.editableEvents.resize && event.resizable !== false && !event.background
})
const isDeletable = computed(() => config.editableEvents.delete && event.deletable !== false && !event.background)

const classes = computed(() => {
  return {
    [`vuecal__event--${event._.id}`]: true,
    [event.class]: !!event.class,
    'vuecal__event--recurring': !!event.recurring,
    'vuecal__event--background': !!event.background,
    'vuecal__event--all-day': event.allDay || event._?.startMinutes === 0 && event._?.duration === 24 * 60,
    'vuecal__event--multiday': !!event._?.multiday,
    'vuecal__event--cut-top': !props.inAllDayBar && (event._?.startMinutes < config.timeFrom || (event._.multiday && !eventStartsInThisCell.value)),
    'vuecal__event--cut-bottom': !props.inAllDayBar && (event._?.endMinutes > config.timeTo || (event._.multiday && !eventEndsInThisCell.value)),
    // Only apply the dragging class on the event copy that is being dragged.
    'vuecal__event--dragging': !event._.draggingGhost && event._.dragging,
    // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
    // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
    // invisible, so if dragging is false, disable the dragging-ghost class as well.
    // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
    // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
    // deletion.
    'vuecal__event--dragging-ghost': event._.draggingGhost,
    'vuecal__event--resizing': touch.resizing
  }
})

const eventStartsInThisCell = computed(() => {
  if (event._.multiday) {
    return new Date(event.start).setHours(0, 0, 0, 0) === props.cellStart.getTime()
  }
  return true
})

const eventEndsInThisCell = computed(() => {
  if (event._.multiday) {
    return dateUtils.isSameDate(new Date(new Date(event.end).setMilliseconds(-1)), props.cellEnd)
  }
  return true
})

const eventDurationInDays = computed(() => {
  if (event._.multiday) return Math.ceil((event.end - event.start) / (1000 * 60 * 60 * 24))
  return 1
})

const styles = computed(() => {
  const hasPosition = (view.isDay || view.isDays || view.isWeek) && config.time && !props.inAllDayBar

  if (!hasPosition && !event.backgroundColor && !event.color) return false

  const styles = {
    backgroundColor: event.backgroundColor || null,
    color: event.color || null
  }

  if (hasPosition) {
    let startMinutes = event._.startMinutes
    let endMinutes = event._.endMinutes

    if (event._.multiday) {
      if (!eventStartsInThisCell.value) startMinutes = 0
      if (!eventEndsInThisCell.value) endMinutes = 24 * 60
    }

    // Ensure that the event start and end stay in range.
    const from = Math.max(config.timeFrom, startMinutes)
    const to = Math.min(config.timeTo, endMinutes) + (event._.duration && !endMinutes ? 24 * 60 : 0)
    const top = minutesToPercentage(from, config)
    const height = minutesToPercentage(to, config) - top

    styles.top = `${top}%`
    styles.height = `${height}%`
  }

  return styles
})

// Automatically forwards any event listener attached to vuecal starting with @event- to the
// (calendar) event.
const eventListeners = computed(() => {
  const eventListeners = { ...config.eventListeners.event }

  // Inject the event details in each eventListener handler call as 2nd param.
  for (const [eventListener, handler] of Object.entries(eventListeners)) {
    // `event-resize-end` is handled in `onDocMouseup` in this file.
    if (!['resize-end'].includes(eventListener)) {
      eventListeners[eventListener] = e => {
        // SHOULD NOT PREVENT BUBBLING UP TO THE CELL WHEN INTERACTING WITH THE EVENT:
        // if we stop bubbling, we will not receive the onMouseup listened from document if releasing
        // on the event. Instead, in the cell don't call the mouseup handler if releasing on the event.
        // e.stopPropagation()

        // Check if e.type to not rewrap the DOM event in an object if already done.
        // `event-drop` is handled in the drag-and-drop composable.
        if (e.type !== 'drop') handler(e.type ? { e, event } : e)
      }
    }
  }

  // Store a copy of any potential external handler to combine with internal handlers like click,
  // touchstart, mousedown.
  const externalHandlers = { ...eventListeners }

  eventListeners.touchstart = e => {
    e.stopPropagation()
    touch.touchAndDragTimer = setTimeout(() => {
      touch.canTouchAndDrag = true
    }, 500)
    onMousedown(e)

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
  // Make the event listener non-passive if resizing so we can prevent default scrolling.
  attachDocumentListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', onDocMousemove, { passive: !touch.fromResizer })
  attachDocumentListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', onDocMouseup, { once: true })

  touch.holdTimer = setTimeout(() => {
    touch.holding = true
    // If there's an @event-hold external listener, call it after holding 1s.
    eventListeners.value.hold?.({ e, event })
  }, 1000)
}

const onDocMousemove = async e => {
  const domEvent = e.touches?.[0] || e // Handle click or touch event.

  // Only the first touchmove to set the dragging flag.
  if (touch.fromResizer && !touch.resizing) {
    touch.resizing = true
    touch.resizingOriginalEvent = { ...event, _: { ...event._ } }
    globalTouchState.isResizingEvent = true // Add a CSS class on wrapper while resizing.

    // If there's an @event-resize-start external listener, call it.
    eventListeners.value['resize-start']?.({ e, event })
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
    const { newStart, newEnd } = computeStartEnd(event)

    // If there's an @event-resize external listener, call it and ask for resizing approval.
    let acceptResize = true
    const { resize: resizeEventHandler } = config.eventListeners?.event
    // Call external validation of event resizing. If successful, update the event details.
    if (resizeEventHandler) {
      acceptResize = await resizeEventHandler({
        e,
        event: { ...event, start: newStart, end: newEnd },
        overlaps: event.getOverlappingEvents({ start: newStart, end: newEnd })
      })
    }
    // If the event resizing is accepted, apply to new time range to the event.
    if (acceptResize !== false) {
      event.start = newStart
      event.end = newEnd
      // Reset last accepted event details if existing and accepting again.
      if (touch.resizingLastAcceptedEvent) touch.resizingLastAcceptedEvent = null

      // Prevent scrolling while resizing.
      // Can only be done when event handler is not passive.
      e.preventDefault()
    }
    else {
      // If the event resizing is refused, store the last accepted original event details
      // so it can be used to revert to this stage on event-resize-end (in `onDocMouseup`).
      if (resizeEventHandler) touch.resizingLastAcceptedEvent = { ...event, _: { ...event._ } }
    }
  }
}

const onDocMouseup = async e => {
  touch.holdTimer = clearTimeout(touch.holdTimer)
  touch.holding = false

  if (touch.resizing) {
    const { newStart, newEnd } = computeStartEnd(event)

    // If there's an @event-resize-end external listener, call it.
    let acceptResize = true
    const resizeEndHandler = eventListeners.value['resize-end']
    // Call external validation of event resize-end. If successful, update the event details.
    if (resizeEndHandler) {
      acceptResize = await resizeEndHandler({
        e,
        event,
        original: touch.resizingOriginalEvent, // Original event details before resizing.
        overlaps: event.getOverlappingEvents({ start: newStart, end: newEnd })
      })
    }

    // If the event resize is accepted apply new range, if refused (SPECIFICALLY FALSE) revert to original.
    event.start = acceptResize === false ? (touch.resizingLastAcceptedEvent || touch.resizingOriginalEvent).start : (touch.resizingLastAcceptedEvent?.start || newStart)
    event.end = acceptResize === false ? (touch.resizingLastAcceptedEvent || touch.resizingOriginalEvent).end : (touch.resizingLastAcceptedEvent?.end || newEnd)
    // If resizing to less than 1 minute, revert to original.
    if (event._.duration < 1) {
      event.start = touch.resizingOriginalEvent.start
      event.end = touch.resizingOriginalEvent.end
    }
    globalTouchState.isResizingEvent = false // Add a CSS class on wrapper while resizing.
  }

  document.removeEventListener(e.type === 'touchend' ? 'touchmove' : 'mousemove', onDocMousemove, { passive: !touch.fromResizer })
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
  touch.resizingOriginalEvent = null
  touch.resizingLastAcceptedEvent = null
  touch.schedule = null
}

/**
 * Compute the new start and end of the event based on the touch move percentage while resizing.
 * @param {Object} event - The event object.
 * @returns {Object} - The new start and end of the event.
 */
const computeStartEnd = event => {
  let minutes = percentageToMinutes(touch.movePercentageY, config)

  // While resizing, cap the newEnd between the previous midnight and next midnight.
  minutes = Math.max(0, Math.min(minutes, 24 * 60))

  // On drop, snap to time every X minutes if the option is on.
  if (config.snapToInterval) {
    const plusHalfSnapTime = minutes + config.snapToInterval / 2
    minutes = plusHalfSnapTime - (plusHalfSnapTime % config.snapToInterval)
  }

  let newStart = event.start
  let newEnd = new Date(props.cellStart.getTime() + minutes * 60000)

  // While resizing and event end is before event start.
  if (newEnd < touch.resizeStartDate) {
    newStart = newEnd
    newEnd = touch.resizeStartDate
  }

  return { newStart, newEnd }
}

const documentListeners = []
const attachDocumentListener = (event, handler, options) => {
  document.addEventListener(event, handler, options)
  documentListeners.push({ event, handler, options })
}

// Register the DOM node within the event in order to emit `event-deleted` to the cell.
onMounted(() => event._.register(eventEl.value))

onBeforeUnmount(() => {
  event._.unregister()

  // Clean up all document event listeners to prevent memory leaks
  for (const { event, handler, options } of documentListeners) {
    document.removeEventListener(event, handler, options)
  }
})
</script>

<style lang="scss">
.vuecal__event {
  position: absolute;
  left: 0;
  right: 0;

  &--resizing {z-index: 100;}
  &--dragging-ghost {z-index: 100;} // The clone at cursor.
  &--dragging-original {opacity: 0;transition: opacity 0.1s;} // The original event at original position.

  .vuecal__scrollable--month-view &,
  .vuecal__all-day & {position: relative;}

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
