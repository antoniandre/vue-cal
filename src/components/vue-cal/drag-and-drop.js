export const eventDragStart = (e, event, vuecal) => {
  const { clickHoldAnEvent, dragAnEvent } = vuecal.domEvents
  dragAnEvent._eid = event._eid
  event.dragging = true

  const minutes = vuecal.minutesAtCursor(e).minutes
  // When click and drag an event the cursor can be anywhere in the event,
  // when later dropping the event, we need to subtract the cursor position in the event.
  dragAnEvent.cursorGrabAt = minutes - event.startTimeMinutes
}

export const eventDragEnd = (e, event, vuecal) => {
  const { dragAnEvent } = vuecal.domEvents
  dragAnEvent._eid = null
  event.dragging = false
}

export const cellDragOver = (e, cell, cellDate, vuecal) => {
  e.preventDefault()
}

export const cellDragEnter = (e, cell, cellDate, vuecal) => {
  cell.highlighted = true
}

export const cellDragLeave = (e, cell, cellDate, vuecal) => {
  cell.highlighted = false
}

export const cellDragDrop = (e, cell, cellDate, vuecal) => {
  const { dragAnEvent } = vuecal.domEvents
  const event = (vuecal.view.events.find(e => e._eid === dragAnEvent._eid) || {})
  const startTimeMinutes = vuecal.minutesAtCursor(e).minutes - dragAnEvent.cursorGrabAt
  console.log('Cell drag drop', event, cell, cellDate, startTimeMinutes)
  event.startDate = new Date(new Date(cellDate).setMinutes(startTimeMinutes))
  event.endDate = new Date(new Date(cellDate).setMinutes(startTimeMinutes + 120))
  event.startTimeMinutes = startTimeMinutes
  event.endTimeMinutes = startTimeMinutes + 120
  event.dragging = false
  cell.highlighted = false
}