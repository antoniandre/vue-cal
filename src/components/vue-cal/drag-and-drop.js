export const eventDragStart = (e, event, vuecal) => {
  const { clickHoldAnEvent, dragAnEvent } = vuecal.domEvents
  dragAnEvent._eid = event._eid
  console.log('Event drag started')
}

export const eventDragEnd = (e, event, vuecal) => {
  const { dragAnEvent } = vuecal.domEvents
  dragAnEvent._eid = null
  console.log('Event drag ended')
}

export const cellDragOver = (e, cell, vuecal) => {
  e.preventDefault()
  console.log('Cell drag over')
}

export const cellDragEnter = (e, cell, vuecal) => {
  console.log('Cell drag enter')
  cell.highlighted = true
}

export const cellDragLeave = (e, cell, vuecal) => {
  console.log('Cell drag leave')
  cell.highlighted = false
}

export const cellDragDrop = (e, cell, vuecal) => {
  console.log('Cell drag drop')
  cell.highlighted = false
}