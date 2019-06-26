import Vue from 'vue'
import { formatDate } from './date-utils'
const dayMilliseconds = 24 * 3600 * 1000

export const eventDefaults = {
  _eid: null,
  start: '', // Externally given formatted date & time.
  startDate: '', // Date object.
  startTimeMinutes: 0,
  end: '', // Externally given formatted date & time.
  endDate: '', // Date object.
  endTimeMinutes: 0,
  title: '',
  content: '',
  background: false,
  allDay: false,
  overlapped: {},
  overlapping: {},
  simultaneous: {},
  segments: null,
  daysCount: 1,
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
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes
  const start = formattedDate + (vuecal.time ? ` ${formattedHours}:${formattedMinutes}` : '')
  const end = formattedDate + (vuecal.time ? ` ${formattedHours}:${formattedMinutes}` : '')

  let event = {
    ...eventDefaults,
    // Nested objects need to be reinitialized or they will be shared across all instances.
    overlapped: {},
    overlapping: {},
    simultaneous: {},

    _eid: `${vuecal._uid}_${vuecal.eventIdIncrement++}`,
    start,
    startDate: new Date(start),
    startTimeMinutes,
    end,
    endDate: new Date(end),
    endTimeMinutes,
    segments: null,
    ...eventOptions
  }

  if (typeof vuecal.onEventCreate === 'function') {
    vuecal.onEventCreate(event, () => deleteAnEvent(event, vuecal))
  }

  // Check if event is a multiple day event and update days count.
  if (event.start.substr(0, 10) !== event.end.substr(0, 10)) {
    event.daysCount = countEventDays(event)
  }

  // Add event to the mutableEvents array.
  vuecal.mutableEvents.push(event)

  // Add the new event to the current view.
  // The event may have been edited on the fly to become a multiple-day event,
  // the method addEventsToView makes sure the segments are created.
  vuecal.addEventsToView(event)

  vuecal.emitWithEvent('event-create', event)
  vuecal.emitWithEvent('event-change', event)

  // After creating a new event, check if it overlaps any other in current cell OR split.
  if (vuecal.time) {
    // const cellEvents = vuecal.mutableEvents[event.startDateF]
    // @todo check overlaps on event creation.
    // checkCellOverlappingEvents(eventOptions.split ? cellEvents.filter(e => e.split === eventOptions.split) : cellEvents, formattedDate)
  }

  return event
}

export const createEventSegments = (e, viewStartDate, viewEndDate) => {
  const eventStart = e.startDate.getTime()
  let eventEnd = e.endDate.getTime()
  if (!e.endDate.getHours() && !e.endDate.getMinutes()) eventEnd -= 1000

  Vue.set(e, 'segments', {})

  // Create 1 segment per day in the event, but only within the current view.
  let timestamp = Math.max(viewStartDate.getTime(), eventStart)
  const end = Math.min(viewEndDate.getTime(), eventEnd)

  while (timestamp <= end) {
    const nextMidnight = (new Date(timestamp + dayMilliseconds)).setHours(0, 0, 0)
    const isFirstDay = timestamp === eventStart

    // const isLastDay = end === eventEnd && nextMidnight > end
    // @todo: testing this:
    const isLastDay = end === eventEnd && nextMidnight >= end

    const startDate = isFirstDay ? e.startDate : new Date(timestamp)
    const formattedDate = isFirstDay ? e.start.substr(0, 10) : formatDate(startDate)

    e.segments[formattedDate] = {
      startDate,
      start: formattedDate,
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

  // Delete the event globally.
  vuecal.mutableEvents = vuecal.mutableEvents.filter(e => e._eid !== event._eid)
  // Delete the event from the current view.
  vuecal.view.events = vuecal.view.events.filter(e => e._eid !== event._eid)

  // @todo: delete from overlapping events array.
}

// EVENT OVERLAPS.
// ===================================================================
// @todo.
// Only for the current view, recreated on view change.
let comparisonArray = []
// Will recalculate all the overlaps of the current cell OR split.
// cellEvents will contain only the current split events if in a split.
export const checkCellOverlappingEvents = (cellEvents, cellOverlaps = {}) => {
  if (!cellEvents.length || cellEvents[0].start.indexOf('2018-11-21') < 0) return [[], 1]
  comparisonArray = cellEvents.slice(0)

  // @todo: filter !e.background && !e.allDay directly on cellEvents.
  // @todo: try recalculating while dragging (try force update).
  // @todo: implement case when dragging event across multiple cells.
  cellEvents.forEach(e => {
    // Never compare the current event in the next loops. the array is refined as we loop.
    comparisonArray.shift()

    if (!cellOverlaps[e._eid]) Vue.set(cellOverlaps, e._eid, { overlaps: [], start: e.start, position: 0 })
    cellOverlaps[e._eid].position = 0

    if (!e.background && !e.allDay) {
      comparisonArray.forEach(e2 => {
        if (!cellOverlaps[e2._eid]) Vue.set(cellOverlaps, e2._eid, { overlaps: [], start: e2.start, position: 0 })

        // Add to the overlaps array if overlapping.
        if (eventInRange(e2, e.startDate, e.endDate, e)) {
          cellOverlaps[e._eid].overlaps.push(e2._eid)
          cellOverlaps[e._eid].overlaps = [...new Set(cellOverlaps[e._eid].overlaps)] // Dedupe, most performant way.

          cellOverlaps[e2._eid].overlaps.push(e._eid)
          cellOverlaps[e2._eid].overlaps = [...new Set(cellOverlaps[e2._eid].overlaps)] // Dedupe, most performant way.
          cellOverlaps[e2._eid].position++
        }
        // Remove from the overlaps array if not overlapping.
        else {
          let pos1, pos2
          if ((pos1 = (cellOverlaps[e._eid] || { overlaps: [] }).overlaps.indexOf(e2._eid)) > -1) cellOverlaps[e._eid].overlaps.splice(pos1, 1)
          if ((pos2 = (cellOverlaps[e2._eid] || { overlaps: [] }).overlaps.indexOf(e._eid)) > -1) cellOverlaps[e2._eid].overlaps.splice(pos2, 1)
          cellOverlaps[e2._eid].position--
        }
      })
    }
  })

  // Overlaps streak is the longest horizontal set of simultaneous events.
  // This is determining the width of events in a streak.
  // e.g. 3 overlapping events [1, 2, 3]; 1 overlaps 2 & 3; 2 & 3 don't overlap;
  //      => streak = 2; each width = 50% not 33%.
  let longestStreak = 0
  for (const id in cellOverlaps) {
    const item = cellOverlaps[id]

    // Calculate the position of event in current streak (determines CSS left property).
    const overlapsRow = item.overlaps.map(id2 => ({ id: id2, start: cellOverlaps[id2].start }))
    overlapsRow.push({ id, start: item.start })
    overlapsRow.sort((a, b) => a.start < b.start ? -1 : 1)
    item.position = overlapsRow.findIndex(e => e.id === id)

    // const overlapsCount = cellOverlaps[id].overlaps.length
    // longestStreak = Math.max(overlapsCount, longestStreak) + 1
    longestStreak = Math.max(getOverlapsStreak(id, item, cellOverlaps), longestStreak)
  }
  console.log(cellOverlaps, longestStreak)

  return  [cellOverlaps, longestStreak]
}

export const getOverlapsStreak = (id, event, cellOverlaps = {}) => {
  let streak = event.overlaps.length + 1
  let removeFromStreak = []
  event.overlaps.forEach(id2 => {
    if (!removeFromStreak.includes(id2)) {
      let overlapsWithoutSelf = event.overlaps.filter(id3 => id3 !== id2)
      // if (!cellOverlaps[id2].includes()) streak--
      overlapsWithoutSelf.forEach(id4 => {
        if (!cellOverlaps[id4].overlaps.includes(id2)) removeFromStreak.push(id4)
      })
    }
  })

  removeFromStreak = [...new Set(removeFromStreak)]
  streak -= removeFromStreak.length
  return streak
}

/* export const checkCellOverlappingEvents_old = cellEvents => {
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
} */

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

// export const deleteOverlaps = event => {
// }

export const eventInRange = (event, start, end) => {
  const startTimestamp = new Date(event.start).getTime()
  const endTimestamp = new Date(event.end).getTime()
  return startTimestamp < end.getTime() && endTimestamp > start.getTime()
}
