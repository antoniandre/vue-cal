import Vue from 'vue'

export const deleteAnEvent = function ({ event, vuecal }) {
  vuecal.emitWithEvent('event-delete', event)

  // Filtering from vuecal.mutableEvents since current cell might only contain all day events or vice-versa.
  let cellEvents = vuecal.mutableEvents[event.startDate]
  // Delete the event.
  vuecal.mutableEvents[event.startDate] = cellEvents.filter(e => e.id !== event.id)
  cellEvents = vuecal.mutableEvents[event.startDate]

  // If deleting a multiple-day event, delete all the events pieces (days).
  if (event.multipleDays.daysCount) {
    event.linked.forEach(e => {
      let dayToModify = vuecal.mutableEvents[e.date]
      let eventToDelete = dayToModify.find(e2 => e2.id === e.id)
      vuecal.mutableEvents[e.date] = dayToModify.filter(e2 => e2.id !== e.id)

      if (!e.background) {
        // Remove this event from possible other overlapping events of the same cell.
        Object.keys(eventToDelete.overlapped).forEach(id => (delete dayToModify.find(item => item.id === id).overlapping[eventToDelete.id]))
        Object.keys(eventToDelete.overlapping).forEach(id => (delete dayToModify.find(item => item.id === id).overlapped[eventToDelete.id]))
        Object.keys(eventToDelete.simultaneous).forEach(id => (delete dayToModify.find(item => item.id === id).simultaneous[eventToDelete.id]))
      }
    })
  }

  // Remove this event from possible other overlapping events of the same cell, then
  // after mutableEvents has changed, rerender will start & checkCellOverlappingEvents()
  // will be run again.
  if (!event.background) {
    Object.keys(event.overlapped).forEach(id => (delete cellEvents.find(item => item.id === id).overlapping[event.id]))
    Object.keys(event.overlapping).forEach(id => (delete cellEvents.find(item => item.id === id).overlapped[event.id]))
    Object.keys(event.simultaneous).forEach(id => (delete cellEvents.find(item => item.id === id).simultaneous[event.id]))
  }
}

export const onResizeEvent = function ({ vuecal, cellEvents }) {
  let { eventId, newHeight } = vuecal.domEvents.resizeAnEvent
  let event = cellEvents.filter(e => e.id === eventId)[0]

  if (event) {
    event.height = Math.max(newHeight, 10)
    updateEndTimeOnResize({ event, vuecal })

    if (!event.background) checkCellOverlappingEvents({ split: event.split || 0, cellEvents, vuecal })
  }
}

export const updateEndTimeOnResize = function ({ event, vuecal }) {
  const bottom = event.top + event.height
  const endTime = (bottom / vuecal.timeCellHeight * vuecal.timeStep + vuecal.timeFrom) / 60
  const hours = parseInt(endTime)
  const minutes = parseInt((endTime - hours) * 60)

  event.endTimeMinutes = endTime * 60
  event.endTime = `${hours}:${(minutes < 10 ? '0' : '') + minutes}`
  event.end = event.end.split(' ')[0] + ` ${event.endTime}`

  if (event.multipleDays.daysCount) {
    event.multipleDays.endTimeMinutes = event.endTimeMinutes
    event.multipleDays.endTime = event.endTime
    event.multipleDays.end = event.end

    event.linked.forEach(e => {
      let dayToModify = vuecal.mutableEvents[e.date]
      let eventToModify = dayToModify.find(e2 => e2.id === e.id)

      eventToModify.endTimeMinutes = event.endTimeMinutes
      eventToModify.endTime = event.endTime
      eventToModify.end = event.end
    })
  }
}

// Will recalculate all the overlaps of the current cell OR split.
// cellEvents will contain only the current split events if in a split.
export const checkCellOverlappingEvents = function ({ cellEvents, vuecal }) {
  if (cellEvents) {
    const foregroundEventsList = cellEvents.filter(item => !item.background)

    if (foregroundEventsList.length) {
      // Do the mapping outside of the next loop if not split cell.
      // If split need the whole event object to compare splits.
      const foregroundEventsIdList = foregroundEventsList.map(item => item.id)
      let comparisonArray = {}

      cellEvents.forEach(event => {
        if (!event.background) {
          let comparisonArrayKeys = Object.keys(comparisonArray)

          // Unique comparison of events.
          comparisonArray[event.id] = cellEvents.length
            ? foregroundEventsList.filter(item => (
              item.id !== event.id && comparisonArrayKeys.indexOf(item.id) === -1)
            ).map(item => item.id)
            : foregroundEventsIdList.filter(id => (id !== event.id && comparisonArrayKeys.indexOf(id) === -1))

          if (comparisonArray[event.id].length) {
            checkOverlappingEvents({ event, comparisonArray: comparisonArray[event.id], cellEvents })
          }
        }
      })
    }
  }

  return cellEvents
}

export const checkOverlappingEvents = function ({ event, comparisonArray, cellEvents }) {
  const src = (event.multipleDays.daysCount && event.multipleDays) || event
  const { startTimeMinutes: startTimeMinE1, endTimeMinutes: endTimeMinE1 } = src

  comparisonArray.forEach((event2id, i) => {
    let event2 = cellEvents.find(item => item.id === event2id)
    const src2 = (event2.multipleDays.daysCount && event2.multipleDays) || event2
    const { startTimeMinutes: startTimeMinE2, endTimeMinutes: endTimeMinE2 } = src2

    const event1startsFirst = startTimeMinE1 < startTimeMinE2
    const event1overlapsEvent2 = !event1startsFirst && endTimeMinE2 > startTimeMinE1
    const event2overlapsEvent1 = event1startsFirst && endTimeMinE1 > startTimeMinE2

    if (event1overlapsEvent2) {
      Vue.set(event.overlapping, event2.id, true)
      Vue.set(event2.overlapped, event.id, true)
    }

    else {
      delete event.overlapping[event2.id]
      delete event2.overlapped[event.id]
    }

    if (event2overlapsEvent1) {
      Vue.set(event2.overlapping, event.id, true)
      Vue.set(event.overlapped, event2.id, true)
    }

    else {
      delete event2.overlapping[event.id]
      delete event.overlapped[event2.id]
    }

    // If up to 3 events start at the same time.
    if (startTimeMinE1 === startTimeMinE2 || (event1overlapsEvent2 || event2overlapsEvent1)) {
      Vue.set(event.simultaneous, event2.id, true)
      Vue.set(event2.simultaneous, event.id, true)
    }

    else {
      delete event.simultaneous[event2.id]
      delete event2.simultaneous[event.id]
    }
  })
}

export const updateEventPosition = function ({ event, vuecal }) {
  const src = (event.multipleDays.daysCount && event.multipleDays) || event
  const { startTimeMinutes, endTimeMinutes } = src

  let minutesFromTop = startTimeMinutes - vuecal.timeFrom
  const top = Math.round(minutesFromTop * vuecal.timeCellHeight / vuecal.timeStep)

  minutesFromTop = Math.min(endTimeMinutes, vuecal.timeTo) - vuecal.timeFrom
  const bottom = Math.round(minutesFromTop * vuecal.timeCellHeight / vuecal.timeStep)

  event.top = Math.max(top, 0)
  event.height = bottom - event.top
}
