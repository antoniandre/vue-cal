let changeViewTimeout = null
let pressPrevOrNextInterval = null
let viewBeforeDrag = { id: null, date: null } // To go back if cancelling.
let viewChanged = false
let cancelViewChange = true
let dragOverCell = { el: null, cell: null, timeout: null }

export const eventDragStart = (e, event, vuecal) => {
  const { clickHoldAnEvent, dragAnEvent } = vuecal.domEvents
  // Remove delete button if held for too long.
  setTimeout(() => {
    clickHoldAnEvent._eid = null
    clearTimeout(clickHoldAnEvent.timeoutId)
    event.deleting = false
  }, 0)

  dragAnEvent._eid = event._eid
  event.dragging = true
  viewBeforeDrag = { id: vuecal.view.id, date: vuecal.view.startDate }

  const minutes = vuecal.minutesAtCursor(e).minutes
  // When click and drag an event the cursor can be anywhere in the event,
  // when later dropping the event, we need to subtract the cursor position in the event.
  dragAnEvent.cursorGrabAt = minutes - event.startTimeMinutes
  console.log('event drag start')

  cancelViewChange = true // Re-init the cancel view: should cancel unless a cell received the event.
}

export const eventDragEnd = (e, event, vuecal) => {
  const { dragAnEvent } = vuecal.domEvents
  dragAnEvent._eid = null
  event.dragging = false
  console.log('event drag end')

  // When dropping the event, cancel view change if no cell received the event (in cellDragDrop).
  if (viewChanged && cancelViewChange && viewBeforeDrag.id) vuecal.switchView(viewBeforeDrag.id, viewBeforeDrag.date, true)
}

export const cellDragEnter = (e, cell, cellDate, vuecal) => {
  const target = e.currentTarget

  // Cancel dragEnter event if hovering a child.
  if (e.currentTarget.contains(e.relatedTarget)) return
  if (target === dragOverCell.el || !target.className.includes('vuecal__cell-content')) return false

  console.log('cellDragEnter')
  // Un-highlight the previous cell.
  if (dragOverCell.el) dragOverCell.cell.highlighted = false

  dragOverCell = { el: target, cell, timeout: clearTimeout(dragOverCell.timeout) }
  cell.highlighted = true

  // On `years` & `year` views go to narrower view on drag and hold.
  if (vuecal.view.id.includes('year')) {
    dragOverCell.timeout = setTimeout(() => {
      vuecal.switchToNarrowerView(cellDate)
    }, 2000)
  }
}

// When starting to drag event on the same cell it's in.
export const cellDragOver = (e, cell, cellDate, vuecal) => {
  e.preventDefault()
  cell.highlighted = true
}

// Warning: cell dragleave event happens AFTER another cell dragenter!
export const cellDragLeave = (e, cell, cellDate, vuecal) => {
  e.preventDefault()

  if (e.currentTarget.contains(e.relatedTarget)) return

  // Only cancel the timer if leaving the current cell to no other one.
  // If leaving this cell to enter another, a cancel is done in cellDragEnter,
  // and a new timer is started.
  if (dragOverCell.cell === cell) {
    clearTimeout(dragOverCell.timeout)
    cell.highlighted = false
    dragOverCell = { el: null, cell: null, timeout: null }
  }

  console.log('cellDragLeave')
}

export const cellDragDrop = (e, cell, cellDate, vuecal) => {
  const { dragAnEvent } = vuecal.domEvents
  let event = vuecal.view.events.find(e => e._eid === dragAnEvent._eid)
  const eventInView = !!event
  if (!event) event = (vuecal.mutableEvents.find(e => e._eid === dragAnEvent._eid) || {})
  const eventDuration = event.endTimeMinutes - event.startTimeMinutes
  const startTimeMinutes = vuecal.minutesAtCursor(e).minutes - dragAnEvent.cursorGrabAt
  event.startTimeMinutes = startTimeMinutes
  event.endTimeMinutes = Math.min(startTimeMinutes + eventDuration, 24 * 60)
  event.startDate = new Date(new Date(cellDate).setMinutes(startTimeMinutes))
  event.endDate = new Date(new Date(cellDate).setMinutes(event.endTimeMinutes))
  event.dragging = false
  cell.highlighted = false
  cancelViewChange = false
  if (!eventInView) vuecal.addEventsToView([event])
  console.log('event dropped in cell')
}

// On drag enter on a view button or on prev & next buttons.
export const viewSelectorDragEnter = (e, id, vuecal, headerData) => {
  if (e.currentTarget.contains(e.relatedTarget)) return

  console.log('viewSelectorDragEnter')
  headerData.highlightedControl = id
  clearTimeout(changeViewTimeout)
  changeViewTimeout = setTimeout(() => {
    if (['previous', 'next'].includes(id)) {
      vuecal[id]()
      // Keep pressing on previous or next button until user goes away.
      clearInterval(pressPrevOrNextInterval)
      pressPrevOrNextInterval = setInterval(() => {
        vuecal[id]()
      }, 800)
    }
    else vuecal.switchView(id, null, true)
    viewChanged = true
  }, 800)
}

export const viewSelectorDragLeave = (e, id, vuecal, headerData) => {
  if (e.currentTarget.contains(e.relatedTarget)) return
  console.log('viewSelectorDragLeave')

  // Only cancel the timer if leaving the current nav button to no other one.
  // If leaving this nav button to enter another, a cancel is done in viewSelectorDragEnter,
  // and a new timer is started.
  if (headerData.highlightedControl === id) {
    headerData.highlightedControl = null
    if (changeViewTimeout) changeViewTimeout = clearTimeout(changeViewTimeout)
    if (pressPrevOrNextInterval) pressPrevOrNextInterval = clearInterval(pressPrevOrNextInterval)
  }
}
