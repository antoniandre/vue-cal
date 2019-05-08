import Vue from 'vue'

export const eventDefaults = {
  _eid: null,
  startDate: '',
  startTime: '',
  startTimeMinutes: 0,
  endDate: '',
  endTime: '',
  endTimeMinutes: 0,
  title: '',
  content: '',
  background: false,
  allDay: false,
  overlapped: {},
  overlapping: {},
  simultaneous: {},
  segments: null,
  height: 0,
  top: 0,
  deletable: true,
  deleting: false,
  resizable: true,
  resizing: false,
  focused: false,
  classes: []
}

// Create an event on formattedDate at the given startTimeMinutes, and allow overriding
// event attributes through the eventOptions object.
export const createAnEvent = (formattedDate, startTimeMinutes, eventOptions, vuecal) => {
  startTimeMinutes = parseInt(startTimeMinutes)
  const hours = parseInt(startTimeMinutes / 60)
  const minutes = parseInt(startTimeMinutes % 60)
  const endTimeMinutes = startTimeMinutes + 120
  const formattedHours = (hours < 10 ? '0' : '') + hours
  const formattedEndHours = (hours + 2 < 10 ? '0' : '') + (hours + 2)
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes

  let event = {
    ...eventDefaults,
    // Nested objects need to be reinitialized or they will be shared across all instances.
    overlapped: {},
    overlapping: {},
    simultaneous: {},
    segments: null,

    _eid: `${vuecal._uid}_${vuecal.eventIdIncrement++}`,
    start: formattedDate + (vuecal.time ? ` ${formattedHours}:${formattedMinutes}` : ''),
    startDate: formattedDate,
    startTime: (vuecal.time ? ` ${formattedHours}:${formattedMinutes}` : null),
    startTimeMinutes,
    end: formattedDate + (vuecal.time ? ` ${formattedEndHours}:${formattedMinutes}` : ''),
    endDate: formattedDate,
    endTime: (vuecal.time ? ` ${formattedEndHours}:${formattedMinutes}` : null),
    endTimeMinutes,
    ...eventOptions
  }

  if (typeof vuecal.onEventCreate === 'function') {
    vuecal.onEventCreate(event, () => deleteAnEvent(event, vuecal))
  }

  // Make array reactive for future events creations & deletions.
  if (!(event.startDate in vuecal.mutableEvents)) Vue.set(vuecal.mutableEvents, event.startDate, [])

  vuecal.mutableEvents[event.startDate].push(event)
  vuecal.emitWithEvent('event-create', event)
  vuecal.emitWithEvent('event-change', event)

  // After creating a new event, check if it overlaps any other in current cell OR split.
  const cellEvents = vuecal.mutableEvents[event.startDate]
  if (vuecal.time) {
    checkCellOverlappingEvents(eventOptions.split ? cellEvents.filter(e => e.split === eventOptions.split) : cellEvents)
  }

  return event
}

export const deleteAnEvent = (event, vuecal) => {
  vuecal.emitWithEvent('event-delete', event)

  const eventDate = (event.segments && event.segments.startDate) || event.startDate
  // Filtering from vuecal.mutableEvents since current cell might only contain all day events or vice-versa.
  let cellEvents = vuecal.mutableEvents[eventDate]
  // Delete the event.
  vuecal.mutableEvents[eventDate] = cellEvents.filter(e => e._eid !== event._eid)
  cellEvents = vuecal.mutableEvents[eventDate]

  // If deleting a multiple-day event, delete all the events pieces (days).
  if (event.segments) {
    // Do sth here?
  }
}

export const onResizeEvent = (event, date, vuecal) => {
  let { _eid, newHeight } = vuecal.domEvents.resizeAnEvent
  let segment = event.segments && event.segments[date] || null
  // debugger

  if (segment || event) {
    // let heightDelta = newHeight
    // if (segment) {
    //   console.log('we have', segment, heightDelta)
    //   segment.height += heightDelta
    // }
    // else event.height += heightDelta
    // console.log('we have', segment, event, newHeight)
    // const minEventHeight = Math.max(newHeight, 10)
    // const eventStart = Math.max((segment || event).startTimeMinutes, vuecal.timeFrom)

    // // While dragging event, prevent event to span beyond vuecal.timeTo.
    // let maxEventHeight = (vuecal.timeTo - eventStart) * vuecal.timeCellHeight / vuecal.timeStep
    // newHeight = Math.min(minEventHeight, maxEventHeight)
    // // debugger
    // if (segment) segment.height = newHeight
    // else event.height = newHeight

    // // Allow dragging until midnight but block height at vuecal.timeTo.
    // maxEventHeight = (24 * 60 - eventStart) * vuecal.timeCellHeight / vuecal.timeStep
    // newHeight = Math.min(minEventHeight, maxEventHeight)
    // if (segment) segment.height = newHeight
    // else event.height = newHeight

    // // updateEndTimeOnResize(event, date, vuecal)
  }
}

const updateEndTimeOnResize = (event, date, vuecal) => {
  // Segments are divisions of events when spanning on multiple days.
  let segment = event.segments && event.segments[date] || null
  let segmentOrEvent = segment || event

  // event.maxHeight is the maximum height the event can take, up to midnight.
  // But event.height is limited to vuecal.timeTo to prevent event overflowing the view.
  const bottom = segmentOrEvent.top + segmentOrEvent.maxHeight
  const endTime = (bottom / vuecal.timeCellHeight * vuecal.timeStep + vuecal.timeFrom) / 60
  const hours = parseInt(endTime)
  const minutes = parseInt((endTime - hours) * 60)

  if (segment) {
    segment.endTimeMinutes = endTime * 60
    segment.endTime = `${hours}:${(minutes < 10 ? '0' : '') + minutes}`
  }

  event.endTimeMinutes = endTime * 60
  event.endTime = `${hours}:${(minutes < 10 ? '0' : '') + minutes}`
  event.end = event.end.split(' ')[0] + ` ${segmentOrEvent.endTime}`
}

// EVENT OVERLAPS.
//===================================================================
// @todo.
// Only for the current view, recreated on view change.
let eventOverlaps = {

}

// Will recalculate all the overlaps of the current cell OR split.
// cellEvents will contain only the current split events if in a split.
export const checkCellOverlappingEvents = cellEvents => {
  cellEvents.forEach(e => {
    if (!eventOverlaps[e._eid]) eventOverlaps[e.startDate][e._eid] = []
  })
}

export const checkCellOverlappingEvents_old = cellEvents => {
  if (cellEvents) {
    const foregroundEventsList = cellEvents.filter(e => !e.background && !e.allDay)

    if (foregroundEventsList.length) {
      // Do the mapping outside of the next loop if not split cell.
      // If split need the whole event object to compare splits.
      const foregroundEventsIdList = foregroundEventsList.map(e => e._eid)
      let comparisonArray = {}

      cellEvents.forEach(event => {
        if (!event.background && !event.allDay) {
          let comparisonArrayKeys = Object.keys(comparisonArray)

          // Unique comparison of events.
          comparisonArray[event._eid] = cellEvents.length
            ? foregroundEventsList.filter(item => (
              item._eid !== event._eid && !comparisonArrayKeys.includes(item._eid))
            ).map(item => item._eid)
            : foregroundEventsIdList.filter(id => (id !== event._eid && !comparisonArrayKeys.includes(id)))

          if (comparisonArray[event._eid].length) {
            checkOverlappingEvents(event, comparisonArray[event._eid], cellEvents)
          }
        }
      })
    }
  }

  return cellEvents
}

export const checkOverlappingEvents = (event, comparisonArray, cellEvents) => {
  const src = event.segments || event
  const { startTimeMinutes: startTimeMinE1, endTimeMinutes: endTimeMinE1 } = src

  comparisonArray.forEach(event2id => {
    let event2 = cellEvents.find(item => item._eid === event2id)
    const src2 = event2.segments || event2
    const { startTimeMinutes: startTimeMinE2, endTimeMinutes: endTimeMinE2 } = src2

    const event1startsFirst = startTimeMinE1 < startTimeMinE2
    const event1overlapsEvent2 = !event1startsFirst && endTimeMinE2 > startTimeMinE1
    const event2overlapsEvent1 = event1startsFirst && endTimeMinE1 > startTimeMinE2

    if (event1overlapsEvent2) {
      Vue.set(event.overlapping, event2._eid, true)
      Vue.set(event2.overlapped, event._eid, true)
    }

    else {
      delete event.overlapping[event2._eid]
      delete event2.overlapped[event._eid]
    }

    if (event2overlapsEvent1) {
      Vue.set(event2.overlapping, event._eid, true)
      Vue.set(event.overlapped, event2._eid, true)
    }

    else {
      delete event2.overlapping[event._eid]
      delete event.overlapped[event2._eid]
    }

    // If up to 3 events start at the same time.
    if (startTimeMinE1 === startTimeMinE2 || (event1overlapsEvent2 || event2overlapsEvent1)) {
      Vue.set(event.simultaneous, event2._eid, true)
      Vue.set(event2.simultaneous, event._eid, true)
    }

    else {
      delete event.simultaneous[event2._eid]
      delete event2.simultaneous[event._eid]
    }
  })
}

export const updateEventPosition = (event, vuecal) => {
  const { startTimeMinutes, endTimeMinutes } = event

  // Top of event.
  let minutesFromTop = startTimeMinutes - vuecal.timeFrom
  const top = Math.round(minutesFromTop * vuecal.timeCellHeight / vuecal.timeStep)

  // Bottom of event.
  minutesFromTop = Math.min(endTimeMinutes, vuecal.timeTo) - vuecal.timeFrom
  const bottom = Math.round(minutesFromTop * vuecal.timeCellHeight / vuecal.timeStep)

  event.top = Math.max(top, 0)
  event.height = bottom - event.top
}

export const deleteOverlaps = event => {
}

export const eventInRange = (event, start, end) => {
  const startTimestamp = new Date(event.start).getTime()
  const endTimestamp = new Date(event.end).getTime()
  return startTimestamp < end.getTime() && endTimestamp > start.getTime()
}
