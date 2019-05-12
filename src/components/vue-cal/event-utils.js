import Vue from 'vue'
import { formatDate } from './date-utils'

export const eventDefaults = {
  _eid: null,
  start: '', // Externally given formatted date & time.
  startDate: '', // Date object.
  startDateF: '', // Formatted date no time.
  startTimeMinutes: 0,
  end: '', // Externally given formatted date & time.
  endDate: '', // Date object.
  endDateF: '', // Formatted date no time.
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
  const formattedDateEnd = '2018-11-23'
  const start = formattedDate + (vuecal.time ? ` ${formattedHours}:${formattedMinutes}` : '')
  const end = formattedDate + (vuecal.time ? ` ${formattedHours}:${formattedMinutes}` : '')

  let event = {
    ...eventDefaults,
    // Nested objects need to be reinitialized or they will be shared across all instances.
    overlapped: {},
    overlapping: {},
    simultaneous: {},
    segments: null,

    _eid: `${vuecal._uid}_${vuecal.eventIdIncrement++}`,
    start,
    startDate: new Date(start),
    startDateF: formattedDate,
    startTimeMinutes,
    end,
    endDate: new Date(end),
    endDateF: formattedDateEnd,
    endTimeMinutes,
    ...eventOptions
  }

  if (typeof vuecal.onEventCreate === 'function') {
    vuecal.onEventCreate(event, () => deleteAnEvent(event, vuecal))
  }


  // The event may have been edited on the fly to become a multiple-day event.
  if (event.startDateF !== event.endDateF) {
    if (!('multiple-day' in vuecal.mutableEvents)) Vue.set(vuecal.mutableEvents, 'multiple-day', [])
    vuecal.mutableEvents['multiple-day'].push(event)

    // Add the new event to the current view.
    vuecal.addMultipleDayEventsToView(event)
  }
  else {
    // Add event to the mutableEvents array.
    // Make array reactive for future events creations & deletions.
    if (!(event.startDateF in vuecal.mutableEvents)) Vue.set(vuecal.mutableEvents, event.startDateF, [])
    vuecal.mutableEvents[event.startDateF].push(event)

    // Add the new event to the current view.
    vuecal.view.events.push(event)
  }

  vuecal.emitWithEvent('event-create', event)
  vuecal.emitWithEvent('event-change', event)

  // After creating a new event, check if it overlaps any other in current cell OR split.
  const cellEvents = vuecal.mutableEvents[event.startDateF]
  if (vuecal.time) {
    // @todo check overlaps on event creation.
    // checkCellOverlappingEvents(eventOptions.split ? cellEvents.filter(e => e.split === eventOptions.split) : cellEvents)
  }

  return event
}

const dayMilliseconds = 24 * 3600 * 1000
export const createEventSegments = (e, viewStartDate, viewEndDate) => {
  const eventStart = e.startDate.getTime()
  const eventEnd = e.endDate.getTime()

  Vue.set(e, 'segments', {})

  // Create 1 segment per day in the event, but only within the current view.
  let timestamp = Math.max(viewStartDate.getTime(), eventStart)
  const end = Math.min(viewEndDate.getTime(), eventEnd)

  while (timestamp <= end) {
    const nextMidnight = (new Date(timestamp + dayMilliseconds)).setHours(0, 0, 0)
    const isFirstDay = timestamp === eventStart
    const isLastDay = end === eventEnd && nextMidnight > end
    const startDate = isFirstDay ? e.startDate : new Date(timestamp)
    const formattedDate = isFirstDay ? e.startDateF : formatDate(startDate)

    e.segments[formattedDate] = {
      startDate,
      startDateF: formattedDate,
      startTimeMinutes: isFirstDay ? e.startTimeMinutes : 0,
      endTimeMinutes: isLastDay ? e.endTimeMinutes : (24 * 60),
      overlapping: {},
      overlapped: {},
      simultaneous: {},
      isFirstDay,
      isLastDay,
      height: 0,
      top: 0
    }

    timestamp = nextMidnight
  }

  return e
}

export const deleteAnEvent = (event, vuecal) => {
  vuecal.emitWithEvent('event-delete', event)

  const eventDate = (event.segments && event.segments.startDateF) || event.startDateF
  const index = event.segments ? 'multiple-day' : eventDate

  // Delete the event globally.
  vuecal.mutableEvents[index] = vuecal.mutableEvents[index].filter(e => e._eid !== event._eid)
  // Delete the event in the current view.
  vuecal.view.events = vuecal.view.events.filter(e => e._eid !== event._eid)

  // @todo: delete from overlapping events array.
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
    if (!eventOverlaps[e._eid]) eventOverlaps[e.startDateF][e._eid] = []
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
