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
      byDate: {}, // A map of single-day events indexed by date.
      recurring: [], // An array of events IDs that are recurring.
      multiday: [], // An array of events IDs that are multiday.
      byId: {} // A map of all the events indexed by ID for fast lookup.
    }

    config.events.forEach(event => {
      // Makes sure the dates are valid Date objects, and add formatted start date in `event._`.
      normalizeEventDates(event)

      // Inject a unique ID in each event.
      if (!event._) event._ = {}
      event._.id = event._.id || event.id || ++uid

      // Inject a delete function in each event and set the deleting flag to false.
      if (!event.delete) event.delete = forcedStage => deleteEvent(event._.id, forcedStage)
      event._.deleting = false
      event._.deleted = false

      // Register the event DOM node in the event in order to emit DOM events.
      event._.register = domNode => (event._.$el = domNode)
      event._.unregister = () => (event._.$el = null)

      events.byId[event._.id] = event // Save and index the event in the byId map.

      if (event.recurring) {
        events.recurring.push(event._.id)
        // @todo: Possibly do other things here.
      }
      else if (event._.multiday) {
        events.multiday.push(event._.id)
        // @todo: Possibly do other things here.
      }
      else {
        // Index this event by its start date.
        if (!events.byDate[event._.startFormatted]) events.byDate[event._.startFormatted] = []
        events.byDate[event._.startFormatted].push(event._.id)
      }
    })
    return events
  })

  // Normalize event dates to ensure they are valid Date objects and add formatted dates.
  const normalizeEventDates = event => {
    if (typeof event.start === 'string') event.start = dateUtils.stringToDate(event.start)
    if (typeof event.end === 'string') event.end = dateUtils.stringToDate(event.end)
    if (isNaN(event.start) || isNaN(event.end)) {
      if (isNaN(event.start)) console.error(`Vue Cal: invalid start date for event "${event.title}".`, event.start)
      else console.error(`Vue Cal: invalid end date for event "${event.title}".`, event.end)
      return
    }
    else if (event.end.getTime() < event.start.getTime()) console.error(`Vue Cal: invalid event dates for event "${event.title}". The event ends before it starts.`, event.start, event.end)

    if (!event._) event._ = {}
    event._.multiday = !dateUtils.isSameDate(event.start, event.end)
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
    event._.duration = event._.endMinutes - event._.startMinutes // Integer (minutes).
  }

  // Retrieve an event by its ID.
  const getEvent = id => events.value.byId[id]

  // Retrieve events by a formatted date.
  const getEventsByDate = dateFormatted => events.value.byDate[dateFormatted]

  // Get events for the view based on cell dates.
  const getViewEvents = cellDates => {
    console.log('👗', 'getViewEvents')

    const events = {}
    cellDates.forEach(({ startFormatted }) => {
      events[startFormatted] = []
      const eventsByDate = getEventsByDate(startFormatted)
      if (eventsByDate?.length) events[startFormatted].push(...eventsByDate)
    })
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

    config.events.push(newEvent) // Add the new event to the source of truth.
    return true
  }

  /**
   * Deletes an event based on the provided eventId and forcedStage.
   *
   * @param {string} eventId - The ID of the event to delete.
   * @param {number} [forcedStage=0] - The stage of deletion to force.
   *    0: Initial deletion stage, toggles deleting and deleted flags.
   *    1: Sets the deleting flag to true.
   *    2: Sets the deleted flag to true and dispatches 'event-deleted' event.
   *    3: Removes the event from the source of truth, emits 'update:events' and 'event-delete' events, and dispatches 'event-deleted' event.
   * @returns {boolean} - Returns true for chaining.
   */
  const deleteEvent = (eventId, forcedStage = 0) => {
    if (!eventId) return console.warn(`Vue Cal: Cannot delete unknown event \`${eventId}\`.`)

    const index = config.events.findIndex(item => item._.id === eventId)
    if (index === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${eventId}\`.`)

    const event = config.events[index]
    if (event.deletable === false) return console.warn(`Vue Cal: Can't delete event \`${eventId}\` since it was explicitely set to \`delete: false\`.`)

    switch (forcedStage) {
      case 0:
        if (!event._.deleting) event._.deleting = true
        else if (!event._.deleted) event._.deleted = true
        else config.events.splice(index, 1) // Remove the event from the source of truth.
        break
      // Display the delete button.
      case 1:
        event._.deleting = true
        config.events[index]._.deleting = true
        break
      // Visual deletion + external DOM event firing.
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
        console.log('😫', 'deleting the event!', event)
        vuecal.emit('update:events', config.events)
        vuecal.emit('event-delete', event)
        break
    }

    return true // For chaining.
  }

  return {
    events,
    getEvent,
    getEventsByDate,
    getViewEvents,
    createEvent,
    deleteEvent
  }
}
