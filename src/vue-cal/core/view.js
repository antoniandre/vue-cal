import { ref, computed, watch } from 'vue'

export const useView = vuecal => {
  const now = new Date()
  const { config, dateUtils, emit, texts } = vuecal
  const { sm, xs, availableViews, defaultView, props } = config
  const viewId = ref(props.view && availableViews[props.view] ? props.view : defaultView)
  let selectedDate = ref(props.selectedDate || null)
  let startDate = ref(new Date(props.viewDate || now))
  startDate.value.setHours(0, 0, 0, 0)
  let endDate = ref(null)
  let firstCellDate = ref(startDate.value)
  let lastCellDate = ref(null)
  let events = ref([])
  let containsToday = ref(false)

  const title = computed(() => {
    const { dateFormat, truncations } = texts.value

    switch (viewId.value) {
      case 'day':
        return dateUtils.formatDate(startDate.value, dateFormat)
      case 'days': {
        let format = dateFormat.replace(/(\s|^)[^a-zA-Z]*?d{2,4}[^a-zA-Z]*?(\s|$)/, '') // Remove week day.
        // Always shorten month if the locale doesn't forbid it.
        if (truncations !== false) format = format.replace('MMMM', 'MMM')
        const startDateFormatted = dateUtils.formatDate(startDate.value, format)
        const endDateFormatted = dateUtils.formatDate(endDate.value, format)

        return `${startDateFormatted} - ${endDateFormatted}`
      }
      case 'week': {
        const weekNumber = dateUtils.getWeek(startDate.value)
        // Shorten month if xs and the locale doesn't forbid it.
        const format = `${xs && truncations !== false ? 'MMM' : 'MMMM'} YYYY`
        return dateUtils.formatDate(startDate.value, format) + ` <small>${texts.value.week} ${weekNumber}</small>`
      }
      case 'month': {
        // Shorten month if xs and the locale doesn't forbid it.
        const format = `${xs && truncations !== false ? 'MMM' : 'MMMM'} YYYY`
        return dateUtils.formatDate(startDate.value, format)
      }
      case 'year':
        return startDate.value.getFullYear()
      case 'years':
        return `${startDate.value.getFullYear()} - ${endDate.value.getFullYear()}`
    }
  })

  function updateView () {
    startDate.value = new Date(props.viewDate || now)
    startDate.value.setHours(0, 0, 0, 0)
    const cellsCount = availableViews[viewId.value].cols * availableViews[viewId.value].rows
    // For some locales it doesn't make sense to truncate texts.
    let { dateFormat, truncations } = texts.value
    firstCellDate.value = null
    lastCellDate.value = null

    switch (viewId.value) {
      case 'day': {
        endDate.value = new Date(startDate.value)
        endDate.value.setHours(23, 59, 59, 999)

        // Truncate long week day and month texts to 3 letters if xs or sm.
        if ((xs || sm) && truncations !== false) {
          // Note: when replacing dddd with ddd, the weekDaysShort will be used in formatDate() if defined.
          dateFormat = dateFormat.replace(/dddd|MMMM/g, m0 => m0.substring(0, 3))
        }
        title.value = dateUtils.formatDate(startDate.value, dateFormat)
        break
      }
      case 'days':
        endDate.value = dateUtils.addDays(startDate.value, cellsCount - 1)
        endDate.value.setHours(23, 59, 59, 999)
        break
      case 'week': {
        startDate.value = dateUtils.getPreviousFirstDayOfWeek(startDate.value, props.startWeekOnSunday)
        endDate.value = dateUtils.addDays(startDate.value, cellsCount - 1)
        endDate.value.setHours(23, 59, 59, 999)
        break
      }
      case 'month': {
        startDate.value = new Date(startDate.value.getFullYear(), startDate.value.getMonth(), 1, 0, 0, 0, 0)
        let dayOfWeek = startDate.value.getDay()
        dayOfWeek = (!dayOfWeek ? 7 : dayOfWeek) - 1 // 0-6 starting from Monday.
        firstCellDate.value = dateUtils.subtractDays(startDate.value, dayOfWeek)

        endDate.value = new Date(startDate.value.getFullYear(), startDate.value.getMonth() + 1, 0, 23, 59, 59, 999)
        lastCellDate.value = dateUtils.addDays(firstCellDate.value, cellsCount - 1)
        lastCellDate.value.setHours(23, 59, 59, 999)
        break
      }
      case 'year':
        startDate.value = new Date(startDate.value.getFullYear(), 0, 1, 0, 0, 0, 0)
        endDate.value = new Date(startDate.value.getFullYear() + 1, 0, 0, 23, 59, 59, 999)
        break
      case 'years':
        // The modulo is only here to always cut off at the same years regardless of the current year.
        // E.g. always [1975-1999], [2000-2024], [2025-2099] for the default 5*5 grid.
        startDate.value = new Date(startDate.value.getFullYear() - (startDate.value.getFullYear() % cellsCount), 0, 1, 0, 0, 0, 0)
        endDate.value = new Date(startDate.value.getFullYear() + cellsCount, 0, 0, 23, 59, 59, 999)
        break
    }

    firstCellDate.value = firstCellDate.value || startDate.value
    lastCellDate.value = lastCellDate.value || endDate.value
    containsToday.value = startDate.value.getTime() <= now.getTime() && now.getTime() <= endDate.value.getTime()
  }

  function switchView (id) {
    const availableViews = Object.keys(config.availableViews)
    if (availableViews.includes(id)) {
      viewId.value = id
      emit('update:view', id)
    }
    else console.warn(`Vue Cal: the \`${id}\` view is not available.`)
  }

  function previous () {
    navigate(false)
  }

  function next () {
    navigate(true)
  }

  function navigate (forward = true) {
    let newViewDate = startDate.value
    const { cols, rows } = config.availableViews[viewId.value]

    switch (viewId.value) {
      case 'day':
      case 'days':
      case 'week':
        newViewDate = new Date(dateUtils[forward ? 'addDays' : 'subtractDays'](newViewDate, cols * rows))
        break
      case 'month': {
        const increment = forward ? 1 : -1
        newViewDate = new Date(newViewDate.getFullYear(), newViewDate.getMonth() + increment, 1, 0, 0, 0, 0)
        break
      }
      case 'year': {
        const increment = forward ? 1 : -1
        newViewDate = new Date(newViewDate.getFullYear() + increment, 1, 1, 0, 0, 0, 0)
        break
      }
      case 'years': {
        const increment = forward ? cols * rows : - (cols * rows)
        newViewDate = new Date(newViewDate.getFullYear() + increment, 1, 1, 0, 0, 0, 0)
        break
      }
    }

    emit('update:viewDate', newViewDate)
  }

  function goToToday () {
    updateViewDate(new Date())
  }

  function updateViewDate (date) {
    if (!dateUtils.isSameDate(date, startDate.value)) {
      date.setHours(0, 0, 0, 0)
      startDate.value = date
      emit('update:viewDate', date)
    }
  }

  function updateSelectedDate (date, emitUpdate = true) {
    if (!dateUtils.isValid(date)) return console.warn('Vue Cal: can\'t update the selected date: invalid date provided to `updateSelectedDate(date)`.')

    else if (!selectedDate.value || !dateUtils.isSameDate(date, selectedDate.value)) {
      date.setHours(0, 0, 0, 0)
      selectedDate.value = date
      if (emitUpdate) emit('update:selectedDate', date)
    }
  }

  watch(() => config.availableViews.value, updateView)
  watch(() => props.view, updateView)
  watch(() => props.viewDate, updateView)
  watch(() => props.selectedDate, date => updateSelectedDate(date, false))

  updateView()

  // ! \ IMPORTANT NOTE:
  // If the selectedDate prop would be added to the view, any click on any cell
  // (triggering an emit of the selectedDate), would trigger a re-rendering of all the
  // cells of the view.
  return {
    id: viewId,
    title,
    startDate,
    endDate,
    firstCellDate,
    lastCellDate,
    containsToday,
    selectedDate,
    // All the events are stored in the mutableEvents array, but subset of visible ones are passed
    // Into the current view for fast lookup and manipulation.
    events,
    updateView,
    switchView,
    previous,
    next,
    navigate,
    goToToday,
    updateViewDate,
    updateSelectedDate
  }
}
