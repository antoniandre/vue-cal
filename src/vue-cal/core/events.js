import { computed, ref } from 'vue'

export const useEvents = vuecal => {
  const { dateUtils } = vuecal
  let uid = 0 // Internal unique ID events counter.

  const events = computed(() => {
    const events = {
      byDate: {}, // A map of single-day events indexed by date.
      recurring: [], // An array of events IDs that are recurring.
      multiday: [], // An array of events IDs that are multiday.
      byId: {} // A map of all the events indexed by ID for fast lookup.
    }

    vuecal.config.events.forEach(event => {
      // Makes sure the dates are valid Date objects, and add formatted start date in `event._`.
      normalizeEventDates(event)

      // Inject a unique ID in each event.
      if (!event._) event._ = {}
      event._.id = event.id || event._.id || ++uid

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

  const getEvent = id => events.value.byId[id]
  const getEventsByDate = dateFormatted => events.value.byDate[dateFormatted]

  const getViewEvents = cellDates => {
    const events = {}
    cellDates.forEach(({ startFormatted }) => {
      events[startFormatted] = []
      const eventsByDate = getEventsByDate(startFormatted)
      if (eventsByDate?.length) events[startFormatted].push(...eventsByDate)
    })
    return events
  }

  return {
    events,
    getEvent,
    getEventsByDate,
    getViewEvents
  }
}
