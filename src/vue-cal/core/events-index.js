import { shallowRef, triggerRef } from 'vue'

export function createEventsIndex() {
  return {
    byId: {},
    byDate: {},
    byYear: {},
    multiday: [],
    recurring: []
  }
}

function removeIdFromArray(arr, id) {
  const i = arr.indexOf(id)
  if (i !== -1) arr.splice(i, 1)
}

/**
 * Per-instance events index (vuecal config + dateUtils + prepareEvent from useEvents).
 */
export const useEventsIndex = (vuecal, prepareEvent) => {
  const { config, dateUtils } = vuecal
  const eventsIndex = shallowRef(createEventsIndex())
  let multidayWarned = false

  const removeIdFromDateKey = (index, id, dateKey) => {
    if (!dateKey) return
    if (index.byDate[dateKey]) removeIdFromArray(index.byDate[dateKey], id)

    const year = dateKey.substring(0, 4)
    const month = dateKey.substring(5, 7)
    const day = dateKey.substring(8, 10)
    const yearMap = index.byYear[year]
    if (yearMap?.[month]?.[day]) removeIdFromArray(yearMap[month][day], id)
  }

  // Walk each civil day the event spans (exclusive end at midnight).
  const eachZonedDayInEventRange = (event, fn) => {
    if (!event?.start || !event?.end) return
    let day = dateUtils.startOfZonedDay(event.start)
    const endMs = event.end.getTime()
    while (true) {
      fn(day)
      const nextDayStart = dateUtils.startOfZonedDay(dateUtils.addDays(day, 1)).getTime()
      if (nextDayStart >= endMs) break
      day = new Date(nextDayStart)
    }
  }

  const removeEventFromDateBuckets = (index, event) => {
    const id = event._.id
    if (!id) return

    if (event.start && event.end) {
      eachZonedDayInEventRange(event, day => removeIdFromDateKey(index, id, dateUtils.formatDateLite(day)))
      return
    }

    removeIdFromDateKey(index, id, event._.startFormatted)
  }

  const remove = event => {
    if (!event?._?.id) return
    const index = eventsIndex.value
    const id = event._.id
    removeEventFromDateBuckets(index, event)
    removeIdFromArray(index.multiday, id)
    removeIdFromArray(index.recurring, id)
    delete index.byId[id]
  }

  const addEventIdToDateKey = (index, id, dateKey) => {
    if (!dateKey) return
    if (!index.byDate[dateKey]) index.byDate[dateKey] = []
    if (!index.byDate[dateKey].includes(id)) index.byDate[dateKey].push(id)

    const year = dateKey.substring(0, 4)
    const month = dateKey.substring(5, 7)
    const day = dateKey.substring(8, 10)
    if (!index.byYear[year]) index.byYear[year] = {}
    if (!index.byYear[year][month]) index.byYear[year][month] = {}
    if (!index.byYear[year][month][day]) index.byYear[year][month][day] = []
    if (!index.byYear[year][month][day].includes(id)) index.byYear[year][month][day].push(id)
  }

  const addEventToDateBuckets = (index, event) => {
    const id = event._.id
    if (event._.multiday) {
      eachZonedDayInEventRange(event, day => addEventIdToDateKey(index, id, dateUtils.formatDateLite(day)))
      return
    }
    addEventIdToDateKey(index, id, event._.startFormatted)
  }

  const indexOneEvent = (index, event) => {
    index.byId[event._.id] = event

    if (event.recurring) {
      if (!index.recurring.includes(event._.id)) index.recurring.push(event._.id)
      return
    }

    if (dateUtils.spansMultipleDays(event.start, event.end)) {
      event._.multiday = config.multidayEvents
      if (!config.multidayEvents) {
        if (!multidayWarned) {
          console.info('Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight.')
          multidayWarned = true
        }
        event.end = dateUtils.endOfZonedDay(event.start)
      }
      else if (!index.multiday.includes(event._.id)) index.multiday.push(event._.id)

      addEventToDateBuckets(index, event)
      return
    }

    addEventToDateBuckets(index, event)
  }

  /**
   * Full rebuild of the events index from config.events.
   */
  const rebuild = (eventsArray = config.events) => {
    const index = eventsIndex.value
    index.byId = {}
    index.byDate = {}
    index.byYear = {}
    index.multiday = []
    index.recurring = []
    multidayWarned = false

    const sorted = eventsArray.slice().sort((a, b) => (a.start < b.start ? -1 : 1))
    for (let i = 0; i < sorted.length; i++) {
      const event = sorted[i]
      if (!prepareEvent(event)) continue
      indexOneEvent(index, event)
    }
  }

  /**
   * Add or update one event in the index (call after metadata is current).
   * @param {string|null} oldStartFormatted - previous start date key when the event moved
   */
  const addOrUpdate = (event, oldStartFormatted = null) => {
    const index = eventsIndex.value
    const id = event._.id
    const wasInIndex = !!index.byId[id]
    const startChanged = oldStartFormatted && oldStartFormatted !== event._.startFormatted

    if (wasInIndex && startChanged) {
      removeEventFromDateBuckets(index, index.byId[id])
      removeIdFromArray(index.multiday, id)
      removeIdFromArray(index.recurring, id)
      delete index.byId[id]
    }
    else if (wasInIndex && !startChanged) return

    if (!prepareEvent(event)) {
      if (wasInIndex) remove(event)
      return
    }

    indexOneEvent(index, event)
  }

  return {
    index: eventsIndex,
    touch: () => triggerRef(eventsIndex),
    rebuild,
    addOrUpdate,
    remove
  }
}
