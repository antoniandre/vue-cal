import { computed } from 'vue'

/**
 * useEvents is a composable function that manages events for the Vue Cal component.
 * It provides methods to create, delete, and retrieve events, as well as normalize event dates.
 *
 * @param {Object} vuecal - The Vue Cal instance.
 * @returns {Object} An object containing methods and computed properties for managing events.
 */
export const useEvents = vuecal => {
  const { dateUtils, config } = vuecal
  let uid = 0 // Internal unique ID events counter.

  // Computed property to manage and organize events.
  const events = computed(() => {
    const events = {
      // A map of events indexed by { YYYY: { MM: { DD: [] } } }.
      // Each year contains a map of 12 months starting from 1, each containing a map of days starting from 1, each containing an array of event IDs.
      byYear: {},
      byDate: {}, // A map of single-day events indexed by date.
      recurring: [], // An array of events IDs that are recurring.
      multiday: [], // An array of events IDs that are multiday.
      byId: {} // A map of all the events indexed by ID for fast lookup. Each event is the original full event object.
    }

    // First sort the events by start date so the latest comes last in the DOM and has a natural
    // higher z-index for readability when overlapping.
    const sortedEvents = config.events.sort((a, b) => a.start - b.start < 0 ? -1 : 1)

    for (const event of sortedEvents) {
      // Makes sure the dates are valid Date objects, and add formatted start date in `event._`.
      normalizeEventDates(event)

      injectInEvent(event) // Inject core logic and utilities in each event.

      events.byId[event._.id] = event // Save and index the event in the byId map.

      if (event.recurring) {
        events.recurring.push(event._.id)
        // @todo: Possibly do other things here.
      }
      else if (event._.multiday) {
        events.multiday.push(event._.id)
        // @todo: handle multiday events. For now, index the event by its start date.
        if (!events.byDate[event._.startFormatted]) events.byDate[event._.startFormatted] = []
        events.byDate[event._.startFormatted].push(event._.id)
      }
      else {
        // Index this event by its start date.
        if (!events.byDate[event._.startFormatted]) events.byDate[event._.startFormatted] = []
        events.byDate[event._.startFormatted].push(event._.id)

        // Index this event by its start year and month.
        const year = event._.startFormatted.substring(0, 4)
        const month = event._.startFormatted.substring(5, 7)
        const day = event._.startFormatted.substring(8, 10)
        if (!events.byYear[year]) events.byYear[year] = {}
        if (!events.byYear[year][month]) events.byYear[year][month] = {}
        if (!events.byYear[year][month][day]) events.byYear[year][month][day] = []
        events.byYear[year][month][day].push(event._.id)
      }
    }

    return events
  })

  // Normalize event dates to ensure they are valid Date objects and add formatted dates.
  const normalizeEventDates = event => {
    if (typeof event.start === 'string') event.start = dateUtils.stringToDate(event.start)
    if (typeof event.end === 'string') event.end = dateUtils.stringToDate(event.end)

    event.start.setSeconds(0, 0) // For more accurate range and overlap comparison.
    // Set the event end to the next minute if the end time is 59 seconds.
    if (event.end.getSeconds() >= 59) event.end.setMinutes(60, 0, 0)
    else event.end.setSeconds(0, 0) // For more accurate range and overlap comparison.

    if (isNaN(event.start) || isNaN(event.end) || (event.end.getTime() < event.start.getTime())) {
      if (isNaN(event.start)) console.error(`Vue Cal: invalid start date for event "${event.title}".`, event.start)
      else if (isNaN(event.end)) console.error(`Vue Cal: invalid end date for event "${event.title}".`, event.end)
      else console.error(`Vue Cal: invalid event dates for event "${event.title}". The event ends before it starts.`, event.start, event.end)
      return
    }

    if (!event._) event._ = {}
    event._.multiday = !dateUtils.isSameDate(event.start, new Date(event.end.getTime() - 1)) // Remove 1ms if end is equal to next midnight.
    event._.startFormatted = dateUtils.formatDate(event.start) // yyyy-mm-dd formatted date string.
    event._.startMinutes = ~~dateUtils.dateToMinutes(event.start) // Integer (minutes).
    event._.endMinutes = ~~dateUtils.dateToMinutes(event.end) // Integer (minutes).
    const startHours = event.start.getHours()
    const startMinutes = event.start.getMinutes().toString().padStart(2, 0)
    const endHours = event.end.getHours()
    const endMinutes = event.end.getMinutes().toString().padStart(2, 0)
    event._.startTimeFormatted24 = `${startHours.toString().padStart(2, 0)}:${startMinutes}`
    event._.startTimeFormatted12 = `${(startHours % 12) || 12}${startMinutes ? `:${startMinutes}` : ''} ${startHours < 12 ? 'AM' : 'PM'}`
    event._.endTimeFormatted24 = `${endHours.toString().padStart(2, 0)}:${endMinutes}`
    event._.endTimeFormatted12 = `${(endHours % 12) || 12}${endMinutes ? `:${endMinutes}` : ''} ${endHours < 12 ? 'AM' : 'PM'}`
    event._.duration = Math.abs(~~((event.end - event.start) / 60000)) // Integer (minutes).
  }

  // Inject core logic and utilities in each event.
  const injectInEvent = event => {
    // Inject a unique ID in each event.
    if (!event._) event._ = {}
    event._.id = event._.id || ++uid

    // Inject a delete function in each event and set the deleting flag to false.
    if (!event.delete) event.delete = forcedStage => deleteEvent(event._.id, forcedStage)
    event._.deleting = false
    event._.deleted = false

    /**
     * Inject a function to check if the event is overlapping with any another event.
     *
     * @param {Object} at - An optional object with start and end dates to check the overlap at.
     *                      If not provided, the event's own start and end dates will be used.
     * @returns {Boolean} - True if the event is overlapping with another event.
     */
    event.isOverlapping = (at = null) => event.getOverlappingEvents(at).length
    event.getOverlappingEvents = (at = null) => {
      return getEventsInRange(
        at?.start || event.start,
        at?.end || event.end,
        { excludeIds: [event._.id], schedule: config.schedules?.length ? ~~(at?.schedule || event.schedule) : null }
      )
    }

    // Register the event DOM node in the event in order to emit DOM events.
    event._.register = domNode => {
      event._.$el = domNode
      if (event._.fireCreated) {
        vuecal.emit('event-created', event)
        delete event._.fireCreated
      }
    }
    // Unregister the event DOM node and cleanup preventing potential memory leaks.
    event._.unregister = () => {
      // Break any circular references in the event object.
      event._.$el = null
      event._.register = null
      // Clear any methods that might create closures.
      event.isOverlapping = null
      event.getOverlappingEvents = null
      event.delete = null
    }
  }

  // Retrieve an event by its ID.
  const getEvent = id => events.value.byId[id]

  // Get events for the view based on cell dates.
  // Returns an object of cell events arrays indexed by the cell string date.
  const getViewEvents = cellDates => {
    const events = []
    for (const { start, end } of cellDates) {
      const eventsByDate = getEventsInRange(start, end)
      if (eventsByDate.length) events.push(...eventsByDate)
    }
    return events
  }

  // Create a new event and add it to the events list.
  const createEvent = newEvent => {
    if (!newEvent.start || !newEvent.end) {
      console.error('Vue Cal: Cannot create an event without valid start and end dates.')
      return
    }

    // If `snapToInterval` is enabled in the configuration, adjust the `start` and `end` times to the
    // nearest interval specified by `config.snapToInterval`.
    if (config.snapToInterval) {
      dateUtils.snapToInterval(newEvent.start, config.snapToInterval)
      dateUtils.snapToInterval(newEvent.end, config.snapToInterval)
    }

    // Create a clean deep copy of the event to prevent reference issues.
    newEvent = { ...newEvent }

    // Always override any existing ID when created: it could come from an external source
    // with an existing _.id, but we need to ensure it's unique for internal management.
    if (!newEvent._) newEvent._ = {}
    newEvent._.id = ++uid

    newEvent._.fireCreated = true // Flag to fire the 'event-created' event on first mounted.
    config.events.push(newEvent) // Add the new event to the source of truth.
    return newEvent
  }

  /**
   * Deletes an event based on the provided eventId or criteria and forcedStage.
   *
   * @param {string|number|Object} eventIdOrCriteria - The ID of the event to delete or an object with criteria to find the event.
   * @param {number} [forcedStage=0] - The stage of deletion to force.
   *    0: Initial deletion stage, toggles deleting and deleted flags.
   *    1: Sets the deleting flag to true.
   *    2: Sets the deleted flag to true and dispatches 'event-deleted' event.
   *    3: Removes the event from the source of truth, emits 'update:events' and 'event-delete' events, and dispatches 'event-deleted' event.
   * @returns {boolean} - Returns true for chaining.
   */
  const deleteEvent = async (eventIdOrCriteria, forcedStage = 0) => {
    if (!eventIdOrCriteria) return console.warn('Vue Cal: Cannot delete event without its ID or criteria.')
    let eventId = typeof eventIdOrCriteria === 'string' || !isNaN(eventIdOrCriteria) ? eventIdOrCriteria : null
    const eventCriteria = typeof eventIdOrCriteria === 'object' ? Object.entries(eventIdOrCriteria) : null
    if (eventCriteria) {
      const [criteriaKey, criteriaValue] = eventCriteria[0]
      eventId = config.events.find(event => event[criteriaKey] === criteriaValue)?._.id
    }

    if (!config.editableEvents.delete) {
      return console.info('Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.')
    }
    if (!eventId) return console.warn('Vue Cal: Cannot delete event without its ID.')

    const index = config.events.findIndex(item => item._.id === eventId)
    if (index === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${eventId}\`.`)

    const event = config.events[index]
    if (event.deletable === false) return console.warn(`Vue Cal: Can't delete event \`${eventId}\` since it was explicitely set to \`delete: false\`.`)

    switch (forcedStage) {
      case 0:
        if (!event._.deleting) event._.deleting = true
        // If the event is already marked as deleting, delete completely from the source of truth
        // by default, and skip the stage 2. Stage 2 (for visual deletion) will stay on specific demand.
        else config.events.splice(index, 1) // Remove the event from the source of truth.
        break
      // Display the delete button.
      case 1:
        event._.deleting = true
        break
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        event._.deleted = true
        config.events[index]._.deleted = true
        // Internal emit to the cell (`detail` is the native expected object wrapper).
        event._.$el?.dispatchEvent(new CustomEvent('event-deleted', { detail: event._.id }))
        break
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        // Removing the event from the source of truth causes a reactivity update cascade that rerenders
        // all the cells and sub-components. This is not a bug, but in most cases, not the ideal behavior.
        config.events.splice(index, 1) // Remove the event from the source of truth.
        vuecal.emit('update:events', config.events)
        vuecal.emit('event-delete', event)
        break
    }

    return true // For chaining.
  }

  // Will recalculate all the overlaps of the current cell OR schedule.
  // cellEvents will contain only the current schedule events if in a schedule.
  const getCellOverlappingEvents = (cellStart, cellEnd) => {
    const cellEvents = getEventsInRange(cellStart, cellEnd)
    if (!cellEvents.length) return { cellOverlaps: {}, longestStreak: 0 }

    const cellOverlaps = {}
    let activeEvents = []
    // Overlaps streak is the longest horizontal set of simultaneous events.
    // This is determining the width of events in a streak.
    // e.g. 3 overlapping events in a cell:
    //  ___   ___
    // | 1 | |_2_|  1 overlaps 2 & 3; 2 & 3 don't overlap;
    // |   |  ___   => streak = 2; each width = 50% not 33%.
    // |___| |_3_|
    let maxConcurrent = 0

    // Sort events by start time, then by duration (shorter first).
    cellEvents.sort((a, b) => a.start - b.start || (a.end - a.start) - (b.end - b.start))

    for (const e of cellEvents) {
      const id = e._.id

      if (!cellOverlaps[id]) cellOverlaps[id] = { overlaps: new Set(), maxConcurrent: 1, position: 0 }

      // Remove expired events from active tracking list.
      activeEvents = activeEvents.filter(active => active.end > e.start)

      // Find all current overlaps in the current cell or schedule.
      const currentOverlaps = activeEvents.filter(active => {
        const sameSchedule = !config.schedules?.length || e.schedule === active.schedule
        return sameSchedule && active.start < e.end
      })
      const takenPositions = new Set(currentOverlaps.map(ev => cellOverlaps[ev._.id]?.position ?? 0))

      // Assign the lowest available column position.
      let position = 0
      while (takenPositions.has(position)) position++

      cellOverlaps[id].position = position
      activeEvents.push(e)

      // Calculate inherited maxConcurrent from overlaps.
      const inheritedMax = Math.max(1, ...currentOverlaps.map(ev => cellOverlaps[ev._.id]?.maxConcurrent ?? 1))

      // Set maxConcurrent for this event.
      cellOverlaps[id].maxConcurrent = Math.max(currentOverlaps.length + 1, inheritedMax)

      // Update all overlapping events to match the new maxConcurrent.
      for (const activeEvent of currentOverlaps) {
        cellOverlaps[activeEvent._.id].overlaps.add(id)
        cellOverlaps[id].overlaps.add(activeEvent._.id)
        cellOverlaps[activeEvent._.id].maxConcurrent = cellOverlaps[id].maxConcurrent
      }

      // Track the longest streak of overlapping events.
      maxConcurrent = Math.max(maxConcurrent, cellOverlaps[id].maxConcurrent)
    }

    // Convert Sets to Arrays.
    for (const id in cellOverlaps) cellOverlaps[id].overlaps = [...cellOverlaps[id].overlaps]

    return { cellOverlaps, longestStreak: maxConcurrent }
  }

  /**
   * Returns a list of events that are in the provided date range.
   * Optionally exclude some events by their IDs and optionally filter by schedule.
   * Optimized implementation that avoids unnecessary computations.
   *
   * @param {Date} start Start date of the range
   * @param {Date} end End date of the range
   * @param {Object} options Additional options for filtering
   *                         options.excludeIds An array of event IDs to exclude from the results.
   *                         options.schedule The schedule to filter events by.
   *                         options.background Whether to include background events.
   *                         options.allDay Whether to include all-day events.
   * @returns {Array} Array of events in the range
   */
  const getEventsInRange = (start, end, { excludeIds = [], schedule = null, background = true, allDay = false } = {}) => {
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()
    const startMonth = start.getMonth() + 1
    const endMonth = end.getMonth() + 1
    const startDay = start.getDate()
    const endDay = end.getDate()
    const startTime = start.getTime()
    const endTime = end.getTime()

    const result = []
    const excludeSet = new Set(excludeIds)

    for (let year = startYear; year <= endYear; year++) {
      const yearStr = `${year}`
      const months = events.value.byYear[yearStr]
      if (!months) continue

      const monthFrom = year === startYear ? startMonth : 1
      const monthTo = year === endYear ? endMonth : 12

      for (let month = monthFrom; month <= monthTo; month++) {
        const monthStr = String(month).padStart(2, '0')
        const days = months[monthStr]
        if (!days) continue

        for (const dayStr in days) {
          const day = +dayStr
          if ((year === startYear && month === startMonth && day < startDay) ||
              (year === endYear && month === endMonth && day > endDay)) continue

          const dayEventIds = days[dayStr]
          for (let i = 0; i < dayEventIds.length; i++) {
            const e = events.value.byId[dayEventIds[i]]
            if (!e || excludeSet.has(e._.id)) continue
            if (schedule !== null && schedule !== e.schedule) continue
            if (background === false && e.background) continue
            if ((allDay && !e.allDay) || (!allDay && e.allDay)) continue
            if (e.end.getTime() > startTime && e.start.getTime() < endTime) result.push(e)
          }
        }
      }
    }

    // Also check multiday and recurring events
    // for (const id of [...store.multiday, ...store.recurring]) {
    //   if (excludeSet.has(id)) continue
    //   const e = store.byId[id]
    //   if (!e) continue
    //   if (schedule !== null && schedule !== e.schedule) continue
    //   if (background === false && e.background) continue

    //   if (e.end.getTime() > startTime && e.start.getTime() < endTime) {
    //     // Avoid duplicates
    //     if (!result.some(event => event._.id === e._.id)) {
    //       result.push(e)
    //     }
    //   }
    // }

    return result
  }

  /**
   * Returns true if an event is in a given date range, even partially, or false otherwise.
   *
   * @param {Object} event The event to test.
   * @param {Date} start The start of range date object.
   * @param {Date} end The end of range date object.
   * @return {Boolean} true if in range, even partially.
   */
  const isEventInRange = (event, start, end) => {
    // Check if all-day or timeless event (if date but no time there won't be a `:` in event.start),
    // and discard the time from the date if any,
    const allDayOrTimeless = event.allDay || !config.time

    const startTimestamp = allDayOrTimeless ? new Date(event.start).setHours(0, 0, 0, 0) : event.start.getTime()
    const endTimestamp = allDayOrTimeless ? new Date(event.end).setHours(23, 59, 59, 999) : event.end.getTime()
    const rangeStart = allDayOrTimeless ? new Date(start).setHours(0, 0, 0, 0) : start.getTime()
    const rangeEnd = allDayOrTimeless ? new Date(end).setHours(23, 59, 59, 999) : end.getTime()
    // Check the event is within the range, considering at least one second overlap.
    return endTimestamp > rangeStart && startTimestamp < rangeEnd
  }

  return {
    events,
    getEvent,
    getViewEvents,
    getCellOverlappingEvents,
    getEventsInRange,
    createEvent,
    deleteEvent,
    isEventInRange
  }
}
