import { reactive } from 'vue'

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
  const { view, eventsManager, uid: vuecalUid } = vuecal
  /**
   * Calculate event start time based on cursor position.
   * When click and drag an event the cursor can be anywhere in the event,
   * when dropping the event, we need to subtract the cursor position in the event.
   *
   * @param {Object} e The associated DOM event.
   */
  const getEventStart = e => {
    const { timeStep, timeCellHeight, timeFrom, utils } = vuecal
    let { y } = utils.cell.getPosition(e)
    y -= Number(e.dataTransfer.getData('cursor-grab-at'))
    return Math.round((y * timeStep) / parseInt(timeCellHeight) + timeFrom)
  }

  /**
   * On drop, update event start and end times in the event.
   * @param {Object} e The associated DOM event.
   * @param {Object} event The event being dragged.
   * @param {Object} transferData The transfer data from the HTML5 dragging event.
   * @param {Date} cellDate The hovered cell starting date.
   */
  const updateEventStartEnd = (e, event, transferData, cellDate) => {
    console.log('updateEventStartEnd')
    // If no duration calculate it from event.endTimeMinutes - event.startTimeMinutes
    // before we modify the start and end.
    const eventDuration = transferData.duration * 1 || (event.endTimeMinutes - event.startTimeMinutes)

    // Force the start of the event at previous midnight minimum.
    let startTimeMinutes = Math.max(getEventStart(e), 0)

    // On drop, snap to time every X minutes if the option is on.
    if (vuecal.snapToTime) {
      const plusHalfSnapTime = startTimeMinutes + vuecal.snapToTime / 2
      startTimeMinutes = plusHalfSnapTime - (plusHalfSnapTime % vuecal.snapToTime)
    }

    event.startTimeMinutes = startTimeMinutes
    event.start = new Date(new Date(cellDate).setMinutes(startTimeMinutes))
    // Force the end of the event at next midnight maximum.
    event.endTimeMinutes = Math.min(startTimeMinutes + eventDuration, 24 * 60)
    event.end = new Date(new Date(cellDate).setMinutes(event.endTimeMinutes))
  }

  /**
   * On event drag start, only possible if editableEvent is true.
   * /!\ This is using the native HTML5 drag & drop, not supported on touch devices.
   *
   * @param {Object} e The associated DOM event.
   * @param {Object} event The event being dragged.
   */
  const eventDragStart = (e, event) => {
    console.log('eventDragStart')
    debugger
    // Cancel the drag if trying to drag event from a text selection.
    if (e.target.nodeType === 3) return e.preventDefault()

    e.dataTransfer.dropEffect = 'move'
    // Transfer the event's data to the receiver (when successfully drag & dropping out of Vue Cal).
    // Notice: in Firefox the drag is prevented if there is no dataTransfer.setData().
    const cleanEvent = { ...event }
    delete cleanEvent._
    e.dataTransfer.setData('event', JSON.stringify(cleanEvent))
    // When click and drag an event the cursor can be anywhere in the event,
    // when later dropping the event, we need to subtract the cursor position in the event.
    e.dataTransfer.setData('cursor-grab-at', e.offsetY) // In pixels.

    dragging.eventId = event._.id
    dragging.fromVueCal = vuecalUid
    event._.dragging = true
    // Controls the CSS class of the static event that remains while a copy is being dragged.
    // Thanks to this class, the event being dragged can have a different style.
    setTimeout(() => (event._.draggingStatic = true), 0)

    viewChanged = false
    Object.assign(viewBeforeDrag, { id: vuecal.view.id, date: vuecal.view.startDate })

    cancelViewChange = true // Re-init the cancel view: should cancel unless a cell received the event.
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
    event._.draggingStatic = false

    // If an event is dragged from a Vue Cal instance and dropped in a different one, remove the
    // event from the first one.
    const { fromVueCal, toVueCal } = dragging
    if (toVueCal && fromVueCal !== toVueCal) eventsManager.deleteEvent(event)

    dragging.fromVueCal = null
    dragging.toVueCal = null

    // When dropping the event, cancel view change if no cell received the event (in cellDragDrop).
    if (viewChanged && cancelViewChange && viewBeforeDrag.id) {
      view.switchView(viewBeforeDrag.id, viewBeforeDrag.date, true)
    }
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
  const cellDragEnter = (e, cell, cellDate) => {
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
    if (['years', 'year', 'month'].includes(vuecal.view.id)) {
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
  const cellDragOver = (e, cell, cellDate, schedule) => {
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
  const cellDragDrop = (e, cell, cellDate, schedule) => {
    console.log('cellDragDrop')
    // Needed to prevent navigation to the text set in dataTransfer from eventDragStart().
    e.preventDefault()

    clearTimeout(dragOverCell.timeout)
    Object.assign(dragOverCell, { el: null, cell: null, timeout: null })

    const transferData = JSON.parse(e.dataTransfer.getData('event') || '{}')
    let event
    let addToView = false

    // If the event is not coming from this Vue Cal it means that we are accepting a new event.
    // So create the event in this Vue Cal.
    if (dragging.fromVueCal !== vuecalUid) {
      // Removing the eventId is mandatory! It prevents the event to be duplicated when drag and
      // dropping to another calendar then back to the original place.
      const { eventId, start, end, duration, ...cleanTransferData } = transferData
      // Note: createEvent adds the event to the view.
      event = eventsManager.createEvent(cellDate, duration, { ...cleanTransferData, schedule })
    }
    else {
      // Find the dragged event from its eventId in the view or mutableEvents array.
      // If dragging the event to another day, the event is not in the view array but in the
      // mutableEvents one.
      event = this._vuecal.view.events.find(evt => evt.eventId === dragging.eventId)

      if (!event) {
        event = vuecal.mutableEvents.find(evt => evt.eventId === dragging.eventId)
        addToView = !!event
      }

      // Case where events are fetched from the backend and removed from the array when not in the view.
      // So it won't be found in the mutableEvents array.
      if (!event) {
        const duration = transferData.endTimeMinutes - transferData.startTimeMinutes
        // Pass exactly the same event as it was before the view change (same eventId as well) except dates.
        const { start, end, ...cleanTransferData } = transferData
        event = eventsManager.createEvent(cellDate, duration, { ...cleanTransferData, schedule })
        // Note: createEvent adds the event to the view.
      }
    }

    const { start: oldDate, schedule: oldSchedule } = event
    updateEventStartEnd(e, event, transferData, cellDate)

    // Only add the event to view after the start and end are modified otherwise
    // it would be filtered out from the function if not in range.
    if (addToView) vuecal.addEventsToView([event])

    event._.dragging = false
    if (schedule || schedule === 0) event.schedule = schedule

    cell.highlighted = false
    cell.highlightedSchedule = null
    cancelViewChange = false
    dragging.toVueCal = vuecalUid

    // Emit `event-drop` & `event-change` events and return the updated event.
    const params = {
      event: vuecal.cleanupEvent(event),
      oldDate,
      newDate: event.start,
      ...((schedule || schedule === 0) && { oldSchedule, newSchedule: schedule }),
      originalEvent: vuecal.cleanupEvent(transferData),
      external: !dragging.fromVueCal // If external event, not coming from any Vue Cal.
    }
    vuecal.$emit('event-drop', params)
    vuecal.$emit('event-change', { event: params.event, originalEvent: params.originalEvent })

    // Sometimes the event dragend does not trigger (?!), so manually trigger it if it didn't.
    setTimeout(() => {
      if (dragging.eventId) eventDragEnd(event)
    }, 300)
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
        if (vuecal.view.id.includes('year')) {
          // If hovering today from a year or years view go to narrower view from month view.
          viewId = vuecal.enabledViews.filter(view => !view.includes('year'))[0]
        }
        view.switchView(viewId || vuecal.view.id, new Date(new Date().setHours(0, 0, 0, 0)), true)
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
