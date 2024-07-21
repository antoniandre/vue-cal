import { computed, ref } from 'vue'

export const useEvents = vuecal => {
  const { dateUtils } = vuecal
  let uid = 0 // Internal unique ID events counter.

  const events = computed(() => {
    const events = {
      byDate: {}, // A map of single-day events indexed by date.
      recurring: [], // An array of events IDs that are recurring.
      multidays: [], // An array of events IDs that are multi-days.
      byId: {} // A map of all the events indexed by ID for fast lookup.
    }

    vuecal.config.events.forEach(event => {
      // Makes sure the dates are valid Date objects, and add formatted start date in `event._`.
      normalizeEventDates(event)
      const isMultiDays = !dateUtils.isSameDate(event.start, event.end)

      // Inject a unique ID in each event.
      if (!event._) event._ = {}
      event._.id = event.id || event._.id || ++uid

      events.byId[event._.id] = event // Save and index the event in the byId map.

      if (event.recurring) {
        events.recurring.push(event._.id)
        // @todo: Possibly do other things here.
      }
      else if (isMultiDays) {
        events.multidays.push(event._.id)
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
    event._.startFormatted = dateUtils.formatDate(event.start) // yyyy-mm-dd formatted date string.
    event._.startMinutes = ~~dateUtils.dateToMinutes(event.start) // Integer (minutes).
    event._.endMinutes = ~~dateUtils.dateToMinutes(event.end) // Integer (minutes).
    event._.startMinutesFormatted = `${(~~(event._.startMinutes / 60)).toString().padStart(2, 0)}:${(event._.startMinutes % 60).toString().padStart(2, 0)}`
    event._.endMinutesFormatted = `${(~~(event._.endMinutes / 60)).toString().padStart(2, 0)}:${(event._.endMinutes % 60).toString().padStart(2, 0)}`
    event._.duration = event._.endMinutes - event._.startMinutes // Integer (minutes).
  }

  const getEvent = id => events.value.byId[id]
  const getEventsByDate = dateFormatted => events.value.byDate[dateFormatted]

  return {
    events,
    getEvent,
    getEventsByDate
  }
}
