import { computed, reactive } from 'vue'

export const useInteractions = (vuecal, vuecalEl) => {
  const { view, config } = vuecal

  // The touch/mouse events listeners are always attached to the cell, but if the event.target is a schedule,
  // display the event placeholder in that schedule.
  const touch = reactive({
    dragging: false,
    holding: false, // When the cell is clicked and hold for a certain amount of time.
    holdTimer: null, // Cell click and hold detection.
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

  const cells = reactive({
    // Automatically forwards any event listener attached to vuecal starting with @cell- to the cell.
    eventListeners: computed(() => {
      const eventListeners = { ...config.eventListeners.cell }

      // Inject the cell details in each eventListener handler call as 2nd param.
      Object.entries(eventListeners).forEach(([eventListener, handler]) => {
        eventListeners[eventListener] = e => {
          // Discard any action from event listener if not on a cell.
          if (!(e.target || e.e?.target).matches?.('.vuecal__cell, .vuecal__cell *')) return

          // When interacting with an event, skip calling the cell DOM event handler.
          // The DOM event bubbles up to the cell from the event but we don't stop it on purpose so
          // we can receive the on mouseup from the document and stop event click&drag.
          if ((e.target || e.e?.target).matches?.('.vuecal__event, .vuecal__event *')) return

          // Check if e.type to not rewrap the DOM event in an object if already done.
          handler(e.type ? { e, cell: cellInfo.value } : e)
        }
      })

      // Store a copy of any potential external handler to combine with internal handlers like click,
      // touchstart, mousedown.
      const externalHandlers = { ...eventListeners }

      eventListeners.click = e => {
        debugger
        if (!e.target.matches?.('.vuecal__cell, .vuecal__cell *')) return
        // cells.onCellClick()
        const cursor = { x: touch.startPercentageX, y: touch.startPercentageY }
        if (touch.schedule) cell.schedule = touch.schedule
        externalHandlers.click?.({ e, cell, cursor })
      }

      if (config.time && view.isDay || view.isDays || view.isWeek) {
        eventListeners.touchstart = e => {
          e.preventDefault()
          cells.onMousedown(e.e || e)
          externalHandlers.touchstart?.({ e, cell: cellInfo.value, cursor })
        }
        eventListeners.mousedown = e => {
          cells.onMousedown(e.e || e)

          externalHandlers.mousedown?.({ e, cell: cellInfo.value, cursor })
        }
      }

      return eventListeners
    }),

    bindEventListeners: () => {
      for (const name in cells.eventListeners) {
        const handler = cells.eventListeners[name]
        vuecalEl.value.addEventListener(name, handler, { passive: false })
      }
    },

    unbindEventListeners: () => {
      for (const name in cells.eventListeners) {
        const handler = cells.eventListeners[name]
        vuecalEl.value.removeEventListener(name, handler, { passive: false })
      }
    },

    // On mousedown OR TOUCHSTART of the cell.
    onMousedown: e => {
      touch.schedule = ~~e.target.dataset.schedule
      const rect = vuecalEl.value.getBoundingClientRect()
      touch.startX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
      touch.startY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
      touch.startPercentageX = touch.startX * 100 / rect.width
      touch.startPercentageY = touch.startY * 100 / rect.height

      document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', cells.onDocMousemove/* , { passive: false } */)
      document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', cells.onDocMouseup, { once: true,/*  passive: false */ })

      touch.holdTimer = setTimeout(() => {
        touch.holding = true
        // If there's a @cell-hold external listener, call it.
        // cellEventListeners.value.hold?.({ e, cell: cellInfo.value })
      }, 1000)
    },

    onDocMousemove: e => {
      // Internal emit to the root component to add a CSS class on wrapper while dragging.
      if (!touch.dragging) {
        emit('cell-drag-start')

        // If there's a @cell-drag-start external listener, call it.
        // cellEventListeners.value.dragStart?.({ e, cell: cellInfo.value })
      }
      touch.dragging = true
      touch.holdTimer = clearTimeout(touch.holdTimer)
      touch.holding = false

      const rect = vuecalEl.value.getBoundingClientRect()
      touch.moveX = (e.touches?.[0] || e).clientX - rect.left // Handle click or touch event coords.
      touch.moveY = (e.touches?.[0] || e).clientY - rect.top // Handle click or touch event coords.
      touch.movePercentageX = touch.moveX * 100 / rect.width
      touch.movePercentageY = touch.moveY * 100 / rect.height

      // If there's a @cell-drag external listener, call it.
      // cellEventListeners.value.drag?.({ e, cell: cellInfo.value })
    },

    onDocMouseup: async e => {
      document.removeEventListener(e.type === 'touchend' ? 'touchmove' : 'mousemove', cells.onDocMousemove, { passive: false })

      if (touch.dragging) {
        // If there's a @cell-drag-end external listener, call it.
        // cellEventListeners.value.dragEnd?.({ e, cell: cellInfo.value })
        emit('cell-drag-end') // Internal emit to the root to add a CSS class on wrapper while dragging.

        if (config.editableEvents?.create) {
          awaitingEventCreation.value = true
          await createEventIfAllowed(e)
          awaitingEventCreation.value = false
        }
      }
    }
  })

  const events = {}

  return {
    cells,
    events
  }
}
