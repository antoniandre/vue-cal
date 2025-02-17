import { reactive } from 'vue'
import { pxToPercentage, percentageToMinutes } from '../utils/conversions'

/**
 * Events drag and drop composable.
 */

const holdOverTimeout = 800 // How long we should hold over an element before it reacts.
let changeViewTimeout = null
let pressPrevOrNextInterval = null
const viewBeforeDrag = reactive({ id: null, date: null }) // To go back if cancelling.
let viewChanged = false
let cancelViewChange = true
const dragOverCell = reactive({ el: null, cell: null, timeout: null })
const dragging = reactive({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
})

export function useDragAndDrop (vuecal) {
  const { config, view, eventsManager, emit, uid: vuecalUid } = vuecal

  /**
   * Calculate event start time based on cursor position.
   * When click and drag an event the cursor can be anywhere in the event,
   * when dropping the event, we need to subtract the cursor position in the event.
   *
   * @param {Object} e The associated DOM event.
   */
  const getEventStart = e => {
    const { timeStep, timeCellHeight, timeFrom } = config

    const clientY = (e.touches?.[0] || e).clientY
    // currentTarget is the cell DOM node, whereas target is whatever DOM node we drop the event on.
    const { top } = e.currentTarget.getBoundingClientRect()
    const y = clientY - top - ~~e.dataTransfer.getData('cursor-grab-at')
    return percentageToMinutes(pxToPercentage(y, e.currentTarget), config)
  }

  /**
   * On drop, update event start and end times in the event.
   * When the event comes from an external source, it may contain a duration in minutes without dates.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} transferData The transfer data from the HTML5 dragging event.
   * @param {Date} cellDate The hovered cell starting date.
   */
  const computeNewEventStartEnd = (e, transferData, cellDate) => {
    // If no duration calculate it from event end - event start
    // before we modify the start and end.
    const duration = transferData.duration || deltaMinutes(transferData.start, transferData.end) || config.timeStep

    // Force the start of the event at previous midnight minimum.
    let startTimeMinutes = Math.max(getEventStart(e), 0)

    // On drop, snap to time every X minutes if the option is on.
    if (config.snapToTime) {
      const plusHalfSnapTime = startTimeMinutes + config.snapToTime / 2
      startTimeMinutes = plusHalfSnapTime - (plusHalfSnapTime % config.snapToTime)
    }

    const start = new Date(new Date(cellDate).setMinutes(startTimeMinutes))
    // Force the end of the event at next midnight maximum.
    const endTimeMinutes = Math.min(startTimeMinutes + duration, 24 * 60)
    const end = new Date(new Date(cellDate).setMinutes(endTimeMinutes))

    return { start, end }
  }

  // Convert milliseconds to minutes.
  const deltaMinutes = (date1, date2) => Math.round((date2 - date1) / 60000)

  /**
   * On event drag start, only possible if editableEvent is true.
   * /!\ This is using the native HTML5 drag & drop, not supported on touch devices.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} event The event being dragged.
   */
  const eventDragStart = (e, event) => {
    console.log('eventDragStart')

    // Cancel the drag if trying to drag event from a text selection or from the resizer.
    if (e.target.nodeType === 3 || vuecal.touch.isResizingEvent) return e.preventDefault()

    e.dataTransfer.dropEffect = 'move'
    // Transfer the event's data to the receiver (when successfully drag & dropping out of Vue Cal).
    // Notice: in Firefox the drag is prevented if there is no dataTransfer.setData().
    const cleanEvent = { ...event, _: { id: event._.id } }
    e.dataTransfer.setData('event', JSON.stringify(cleanEvent))
    // When click and drag an event the cursor can be anywhere in the event,
    // when later dropping the event, we need to subtract the cursor position in the event.
    e.dataTransfer.setData('cursor-grab-at', e.offsetY) // In pixels.

    dragging.eventId = event._.id
    dragging.fromVueCal = vuecalUid
    event._.dragging = true

    // Controls the CSS class of the fixed event that remains while a copy is being dragged.
    // Thanks to this class added at next Vue frame, the event being dragged can have a different style.
    setTimeout(() => (event._.draggingGhost = true), 0)

    viewChanged = false
    Object.assign(viewBeforeDrag, { id: view.id, date: view.firstCellDate })

    cancelViewChange = true // Re-init the cancel view: should cancel unless a cell received the event.

    vuecal.touch.isDraggingEvent = true // For the global dragging class and cursor.
  }

  /**
   * On event drag end, when releasing the event.
   *
   * @param {Object} event The event being dragged.
   */
  const eventDragEnd = event => {
    console.log('eventDragEnd')
    dragging.eventId = null
    event._.dragging = false
    event._.draggingGhost = false

    // If an event is dragged from a Vue Cal instance and dropped in a different one, remove the
    // event from the first one.
    const { fromVueCal, toVueCal } = dragging
    if (toVueCal && fromVueCal !== toVueCal) eventsManager.deleteEvent(event._.id, 3)

    dragging.fromVueCal = null
    dragging.toVueCal = null

    // When dropping the event, cancel view change if no cell received the event (in cellDragDrop).
    if (viewChanged && cancelViewChange && viewBeforeDrag.id) {
      view.switchView(viewBeforeDrag.id, viewBeforeDrag.date, true)
    }

    vuecal.touch.isDraggingEvent = false // For the global dragging class and cursor.
  }

  /**
   * On cell/schedule enter with a dragging event.
   * Highlight the cell, and if on `years`, `year`, `month` view,
   * set a timer to go deeper on drag hold over this cell.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} cell The cell component's $data.
   * @param {Date} cellDate The hovered cell starting date.
   */
  const cellDragEnter = (e, cell) => {
    const { start: cellDate } = cell
    console.log('cellDragEnter')
    const target = e.currentTarget

    // Cancel dragEnter event if hovering a child.
    if (e.currentTarget.contains(e.relatedTarget)) return
    if (target === dragOverCell.el || !target.className.includes('vuecal__cell-content')) return false

    // Un-highlight the previous cell.
    if (dragOverCell.el) dragOverCell.cell.highlighted = false

    Object.assign(dragOverCell, { el: target, cell, timeout: clearTimeout(dragOverCell.timeout) })
    cell.highlighted = true

    // On `years`, `year` & `month` views, go to narrower view on drag and hold.
    if (['years', 'year', 'month'].includes(view.id)) {
      dragOverCell.timeout = setTimeout(() => vuecal.switchToNarrowerView(cellDate), 2000)
    }
  }

  /**
   * On cell/schedule drag over, highlight the cell being hovered,
   * Useful when starting to drag event on the same cell/schedule it's in.
   * Warning: This is fired repeatedly as long as you stay over this cell/schedule.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} cell The cell component's $data.
   * @param {Date} cellDate The hovered cell starting date.
   * @param {Number|String} schedule The optional schedule being hovered if any.
   */
  const cellDragOver = (e, cell) => {
    const { start: cellDate, schedule } = cell
    console.log('cellDragOver')
    e.preventDefault()
    cell.highlighted = true
    if (schedule || schedule === 0) cell.highlightedSchedule = schedule
  }

  /**
   * When event drag leaves a cell/schedule.
   * Remove the cell/schedule highlighted state.
   * Warning: cell dragleave event happens AFTER another cell dragenter!
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} cell The cell component's $data.
   */
  const cellDragLeave = (e, cell) => {
    console.log('cellDragLeave')
    e.preventDefault()

    if (e.currentTarget.contains(e.relatedTarget)) return

    cell.highlightedSchedule = false

    // Only cancel the timer if leaving the current cell to no other one.
    // If leaving this cell to enter another, a cancel is done in cellDragEnter,
    // and a new timer is started.
    if (dragOverCell.cell === cell) {
      clearTimeout(dragOverCell.timeout)
      Object.assign(dragOverCell, { el: null, cell: null, timeout: null })
      cell.highlighted = false
    }
  }

  /**
   * On successful event drop into a cell/schedule.
   * Change the event start and end time and remove the event dragging state
   * and cell/schedule highlighted state.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} cell The cell component's $data.
   * @param {Date} cellDate The hovered cell starting date.
   * @param {Number|String} schedule The optional schedule being dropped into, if any.
   */
  const cellDragDrop = async (e, cell) => {
    // Needed to prevent navigation to the text set in dataTransfer from eventDragStart().
    e.preventDefault()

    clearTimeout(dragOverCell.timeout) // Clear the timer if dropping before it fires.
    Object.assign(dragOverCell, { el: null, cell: null, timeout: null })

    // Step 1: Extract the event data from the dataTransfer and cell data from the cell param.
    // ----------------------------------------------------
    const incomingEvent = JSON.parse(e.dataTransfer.getData('event') || '{}')
    if (incomingEvent.start) incomingEvent.start = new Date(incomingEvent.start)
    if (incomingEvent.end) incomingEvent.end = new Date(incomingEvent.end)

    // Step 2: Compute the new event start and end times from the dropped coords in cell.
    // ----------------------------------------------------
    let event
    const { start: newStart, end: newEnd } = computeNewEventStartEnd(e, incomingEvent, cell.start)

    // Step 3: Create or update the event in the config.events array (source of truth).
    // ----------------------------------------------------
    // The event is coming from this Vue Cal, find it in the events array.
    if (dragging.fromVueCal === vuecalUid) {
      event = eventsManager.getEvent(incomingEvent._.id)

      if (event) {
        event._.dragging = false

        let acceptDrop = true
        const { drop: dropEventHandler } = config.eventListeners?.event
        // Call external validation of event drop. If successful, update the event details.
        if (dropEventHandler) {
          acceptDrop = await dropEventHandler({
            event: { ...event, start: newStart, end: newEnd },
            overlaps: event.getOverlappingEvents({ start: newStart, end: newEnd })
          })
          // Can externally use event.isOverlapping() to check if the event overlaps with other events.
        }
        if (acceptDrop) {
          event.start = newStart
          event.end = newEnd
          // Can drop on any DOM node, but look for a `schedule` in the ancestors and apply it if any.
          const schedule = e.target.closest('[data-schedule]')
          if (schedule) event.schedule = ~~schedule.dataset.schedule
        }
      }
      else {
        // Case where events are fetched from the backend and removed from the array when not in the view.
        // So it won't be found in the config.events array.
        // const duration = incomingEvent.endTimeMinutes - incomingEvent.startTimeMinutes
        // // Pass exactly the same event as it was before the view change (same eventId as well) except dates.
        // const { start, end, ...cleanIncomingEvent } = incomingEvent
        // event = eventsManager.createEvent(cellDate, duration, { ...cleanIncomingEvent, schedule })
      }
    }
    // If the event is not coming from this Vue Cal but from another Vue Cal or an external source,
    // create the event in this Vue Cal.
    else {
      // Removing the eventId is mandatory! It prevents the event to be duplicated when drag and
      // dropping to another calendar then back to the original place.
      // const { eventId, start, end, duration, ...cleanIncomingEvent } = incomingEvent
      // event = eventsManager.createEvent(cellDate, duration, { ...cleanIncomingEvent, schedule })
      event = eventsManager.createEvent({
        ...incomingEvent,
        start: newStart,
        end: newEnd,
        ...((cell.schedule || cell.schedule === 0) && { schedule: cell.schedule }),
        _: { id: incomingEvent._?.id || incomingEvent.id }
      })
    }

    cell.highlighted = false
    cell.highlightedSchedule = null
    cancelViewChange = false
    dragging.toVueCal = vuecalUid

    // Emit `event-dropped` & `event-change` events and return the updated event.
    // `external` is when the event is not coming from this Vue Cal instance.
    emit('event-dropped', { event, originalEvent: incomingEvent, external: !dragging.fromVueCal })
    emit('event-change', { event, originalEvent: incomingEvent })
  }

  /**
   * On drag enter on a view button or on today, prev & next buttons.
   * Sets a highlighted state on the hovered button, and go to requested view.
   *
   * @param {Object} e The associated DOM event.
   * @param {String} id The id of the header element being hovered. One of:
   *                    previous, next, today, years, year, month, week, day.
   * @param {Object} headerData The header component's $data.
   */
  const viewSelectorDragEnter = (e, id, headerData) => {
    console.log('viewSelectorDragEnter')
    if (e.currentTarget.contains(e.relatedTarget)) return

    headerData.highlightedControl = id
    clearTimeout(changeViewTimeout)
    changeViewTimeout = setTimeout(() => {
      if (['previous', 'next'].includes(id)) {
        vuecal[id]()
        // Keep pressing on previous or next button until user goes away.
        clearInterval(pressPrevOrNextInterval)
        pressPrevOrNextInterval = setInterval(vuecal[id], holdOverTimeout)
      }
      else if (id === 'today') {
        clearInterval(pressPrevOrNextInterval)
        let viewId
        if (view.id.includes('year')) {
          // If hovering today from a year or years view go to narrower view from month view.
          viewId = vuecal.enabledViews.filter(view => !view.includes('year'))[0]
        }
        view.switchView(viewId || view.id, new Date(new Date().setHours(0, 0, 0, 0)), true)
      }
      else view.switchView(id, null, true)
      viewChanged = true
    }, holdOverTimeout)
  }

  /**
   * On drag leave on a view button or on today, prev & next buttons.
   * Removes the highlighted state on the hovered button, and cancel the timer to
   * go to the requested view.
   *
   * @param {Object} e The associated DOM event.
   * @param {String} id The id of the header element being hovered. One of:
   *                    previous, next, today, years, year, month, week, day.
   * @param {Object} headerData The header component's $data.
   */
  const viewSelectorDragLeave = (e, id, headerData) => {
    console.log('viewSelectorDragLeave')
    if (e.currentTarget.contains(e.relatedTarget)) return

    // Only cancel the timer if leaving the current nav button to no other one.
    // If leaving this nav button to enter another, a cancel is done in viewSelectorDragEnter,
    // and a new timer is started.
    if (headerData.highlightedControl === id) {
      headerData.highlightedControl = null
      if (changeViewTimeout) changeViewTimeout = clearTimeout(changeViewTimeout)
      if (pressPrevOrNextInterval) pressPrevOrNextInterval = clearInterval(pressPrevOrNextInterval)
    }
  }

  return {
    eventDragStart,
    eventDragEnd,
    cellDragEnter,
    cellDragOver,
    cellDragLeave,
    cellDragDrop,
    viewSelectorDragEnter,
    viewSelectorDragLeave
  }
}
