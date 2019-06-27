import Vue from 'vue'
import { formatDate } from './date-utils'
const dayMilliseconds = 24 * 3600 * 1000
const defaultEventDuration = 2 // In hours.

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
  const hoursEnd = hours + defaultEventDuration
  const endTimeMinutes = startTimeMinutes + 120
  const formattedHours = (hours < 10 ? '0' : '') + hours
  const formattedHoursEnd = (hoursEnd < 10 ? '0' : '') + hoursEnd
  const formattedMinutes = (minutes < 10 ? '0' : '') + minutes
  const start = formattedDate + (vuecal.time ? ` ${formattedHours}:${formattedMinutes}` : '')
  const end = formattedDate + (vuecal.time ? ` ${formattedHoursEnd}:${formattedMinutes}` : '')

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
  // checkCellOverlappingEvents() will be re-run automatically from the cell computed events.
  vuecal.view.events = vuecal.view.events.filter(e => e._eid !== event._eid)
}

// EVENT OVERLAPS.
// ===================================================================
// Only for the current view, recreated on view change.
let comparisonArray = []
// Will recalculate all the overlaps of the current cell OR split.
// cellEvents will contain only the current split events if in a split.
export const checkCellOverlappingEvents = (cellEvents, cellOverlaps = {}) => {
  // if (!cellEvents.length || cellEvents[0].start.indexOf('2018-11-21') < 0) return [[], 1]
  comparisonArray = cellEvents.slice(0)

  // @todo: filter !e.background && !e.allDay directly on cellEvents.
  // @todo: try recalculating while dragging (try force update).
  // @todo: implement case when dragging event across multiple cells.
  cellEvents.forEach(e => {
    // Never compare the current event in the next loops. the array is refined as we loop.
    comparisonArray.shift()

    if (!e.background && !e.allDay) {
      if (!cellOverlaps[e._eid]) Vue.set(cellOverlaps, e._eid, { overlaps: [], start: e.start, position: 0 })
      cellOverlaps[e._eid].position = 0

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
    overlapsRow.sort((a, b) => a.start < b.start ? -1 : (a.start > b.start ? 1 : (a.id > b.id ? -1 : 1)))
    item.position = overlapsRow.findIndex(e => e.id === id)

    longestStreak = Math.max(getOverlapsStreak(id, item, cellOverlaps), longestStreak)
  }

  return  [cellOverlaps, longestStreak]
}

export const getOverlapsStreak = (id, event, cellOverlaps = {}) => {
  let streak = event.overlaps.length + 1
  let removeFromStreak = []
  event.overlaps.forEach(id2 => {
    if (!removeFromStreak.includes(id2)) {
      let overlapsWithoutSelf = event.overlaps.filter(id3 => id3 !== id2)
      overlapsWithoutSelf.forEach(id4 => {
        if (!cellOverlaps[id4].overlaps.includes(id2)) removeFromStreak.push(id4)
      })
    }
  })

  removeFromStreak = [...new Set(removeFromStreak)] // Dedupe, most performant way.
  streak -= removeFromStreak.length
  return streak
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

export const eventInRange = (event, start, end) => {
  const startTimestamp = new Date(event.start).getTime()
  const endTimestamp = new Date(event.end).getTime()
  return startTimestamp < end.getTime() && endTimestamp > start.getTime()
}
