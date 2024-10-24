import { ref, computed, watch, onBeforeUnmount } from 'vue'

export const useView = ({ config, dateUtils, emit, texts, eventsManager }) => {
  const { availableViews } = config
  const viewId = ref(config.view && availableViews[config.view] ? config.view : config.defaultView)
  const selectedDate = ref(config.selectedDate || null)

  // Preset at now date on load, but updated every minute if watchRealTime,
  // or updated at least on each cells rerender, in order to keep Today's date accurate.
  let now = ref(new Date())

  // The view date is the one given in prop. It can be any date within the view that will be
  // computed around it - not necessarily the first day of the view range.
  // E.g. [start, ..., viewDate, ..., end]
  const viewDate = ref(new Date(config.viewDate || now.value))
  viewDate.value.setHours(0, 0, 0, 0)
  const start = ref(viewDate)
  const end = ref(null)
  // For the now line when watchRealTime is true. 2 timeouts: 1 to snap to round minutes, then 1 every minute.
  let timeTickerId = null

  // Transition when switching view. Left when going toward the past, right when going toward future.
  const transitionDirection = ref('right')

  /**
   * {String|undefined} The next available broader view from the current view.
   */
  const broaderView = computed(() => {
    const availableViews = Object.keys(config.availableViews)
    return availableViews[availableViews.indexOf(viewId.value) + 1]
  })

  /**
   * {String|undefined} The next available narrower view from the current view.
   */
  const narrowerView = computed(() => {
    const availableViews = Object.keys(config.availableViews)
    return availableViews[availableViews.indexOf(viewId.value) - 1]
  })

  const title = computed(() => {
    const { dateFormat, truncations } = texts

    switch (viewId.value) {
      case 'day':
        return dateUtils.formatDate(start.value, dateFormat)
      case 'days': {
        let format = dateFormat.replace(/(\s|^)[^a-zA-Z]*?d{2,4}[^a-zA-Z]*?(\s|$)/, '') // Remove week day.
        // Always shorten month if the locale doesn't forbid it.
        if (truncations !== false) format = format.replace('MMMM', 'MMM')
        const startDateFormatted = dateUtils.formatDate(firstCellDate.value, format)
        const endDateFormatted = dateUtils.formatDate(lastCellDate.value, format)

        return `${startDateFormatted} - ${endDateFormatted}`
      }
      case 'week': {
        const weekNumber = dateUtils.getWeek(start.value, config.startWeekOnSunday && !config.hideWeekdays[7])
        // Shorten month if xs and the locale doesn't forbid it.
        const format = `${config.xs && truncations !== false ? 'MMM' : 'MMMM'} YYYY`
        return dateUtils.formatDate(start.value, format) + ` <small>${texts.week} ${weekNumber}</small>`
      }
      case 'month': {
        // Shorten month if xs and the locale doesn't forbid it.
        const format = `${config.xs && truncations !== false ? 'MMM' : 'MMMM'} YYYY`
        return dateUtils.formatDate(start.value, format)
      }
      case 'year':
        return start.value.getFullYear()
      case 'years':
        return `${start.value.getFullYear()} - ${end.value.getFullYear()}`
    }
  })

  const cols = computed(() => {
    // Includes all the weekdays, but some may need to be hidden.
    let cols = config.availableViews[viewId.value].cols
    // In Week and month views only, the grid rows must be decreased from 7 to `7 - all hidden weekdays`.
    if (config.hasHiddenDays && ['week', 'month'].includes(viewId.value)) cols -= config.hasHiddenDays
    return cols
  })
  const rows = computed(() => config.availableViews[viewId.value].rows)

  // Create as many grid cells as defined in the availableViews map (cols * rows).
  const cellsCount = computed(() => cols.value * rows.value)

  const firstCellDate = computed(() => {
    if (viewId.value === 'month') {
      // By default, the month view has 6 rows of 7 days. If the first day of the month is not
      // a Monday (or Sunday if startWeekOnSunday), then pad the preceding cells with days from the
      // previous month. E.g.
      // M  T  W  T  F  S  S
      // 28 29 30 1  2  3  4
      let weekday = start.value.getDay() || 7 // 1-7, starting from Monday.

      if (config.startWeekOnSunday && !config.hideWeekdays[7]) weekday += 1
      if (config.viewDayOffset) weekday -= config.viewDayOffset
      return dateUtils.subtractDays(start.value, weekday - 1)
    }
    else if (viewId.value === 'week') {
      const visibleDays = '1234567'.split('').filter(day => !Object.keys(config.hideWeekdays).includes(day))
      let firstVisibleDay = Math.min(...visibleDays)
      if (config.startWeekOnSunday && !config.hideWeekdays[7]) firstVisibleDay = 1
      if (config.viewDayOffset) firstVisibleDay += config.viewDayOffset

      return dateUtils.addDays(start.value, firstVisibleDay - 1)
    }

    else return start.value
  })

  // Generates an array of dates for each cell in the view: 1 cell = 1 date range [start, end].
  // IMPORTANT NOTES:
  // - Better performance here than in each cell.
  // - This computed should only manage pure dates: no text, no event, nothing likely to be
  //   triggering recomputing due to a change in the reactivity chain.
  //   Every recomputing can become very expensive when handling a large amount of cells per view
  //   with a large amount of calendar events.
  const cellDates = computed(() => {
    console.log('recomputing view dates')
    const dates = []
    const isDaysWeekOrMonthView = ['days', 'week', 'month'].includes(viewId.value)

    // Every time a weekday is removed from the generated array of cells dates, this modifier is
    // incremented so we always keep the number of cells specified in the availableViews object if the
    // view is days, or month.
    let modifier = 0

    for (let i = 0; i < (cellsCount.value + modifier); i++) {
      switch (viewId.value) {
        case 'day':
        case 'days':
        case 'week':
        case 'month': {
          const start = dateUtils.addDays(firstCellDate.value, i)
          const weekday = start.getDay() || 7 // 1-7, starting from Monday.

          // If hiding specific weekday or weekend and the current cell is one of these hidden days skip
          // it and add one more date at the end to fill up the cells.
          if (isDaysWeekOrMonthView && config.hasHiddenDays && config.hideWeekdays[weekday]) {
            modifier++
            continue
          }

          const end = new Date(start)
          end.setHours(23, 59, 59, 999)
          dates.push({ start, startFormatted: dateUtils.formatDate(start), end })
          break
        }
        case 'year':
          dates.push({
            start: new Date(firstCellDate.value.getFullYear(), i, 1, 0, 0, 0, 0),
            end: new Date(firstCellDate.value.getFullYear(), i + 1, 0, 23, 59, 59, 999)
          })
          break
        case 'years':
          dates.push({
            start: new Date(firstCellDate.value.getFullYear() + i, 0, 1, 0, 0, 0, 0),
            end: new Date(firstCellDate.value.getFullYear() + i + 1, 0, 0, 23, 59, 59, 999)
          })
          break
      }
    }

    return dates
  })

  const lastCellDate = computed(() => cellDates.value[cellDates.value.length - 1].end)

  const containsToday = computed(() => firstCellDate.value.getTime() <= now.value.getTime() && now.value.getTime() <= lastCellDate.value.getTime())

  // Array of IDs inside an object indexed by cell dates.
  const events = computed(() => {
    if (viewId.value === 'month' && !config.eventsOnMonthView) return []
    return eventsManager.getViewEvents(cellDates.value)
  })

  /**
   * This function is called after each view variable update and will recompute the theoretical view
   * [start-end] date range.
   * The practical view date range may differ when hiding weekdays, or on month view due to out of
   * scope dates.
   */
  function updateView () {
    start.value = new Date(viewDate.value || now.value)
    start.value.setHours(0, 0, 0, 0)

    switch (viewId.value) {
      case 'day':
        end.value = new Date(start.value)
        end.value.setHours(23, 59, 59, 999)
        break
      case 'days':
        end.value = dateUtils.addDays(start.value, cellsCount.value)
        end.value.setMilliseconds(-1)
        break
      case 'week':
        start.value = dateUtils.getPreviousFirstDayOfWeek(start.value, config.startWeekOnSunday && !config.hideWeekdays[7])
        end.value = dateUtils.addDays(start.value, 7)
        end.value.setMilliseconds(-1)
        break
      case 'month':
        start.value = new Date(start.value.getFullYear(), start.value.getMonth(), 1, 0, 0, 0, 0)
        end.value = new Date(start.value.getFullYear(), start.value.getMonth() + 1, 0, 23, 59, 59, 999)
        break
      case 'year':
        start.value = new Date(start.value.getFullYear(), 0, 1, 0, 0, 0, 0)
        end.value = new Date(start.value.getFullYear() + 1, 0, 0, 23, 59, 59, 999)
        break
      case 'years':
        // The modulo is only here to always cut off at the same years regardless of the current year.
        // E.g. always [1975-1999], [2000-2024], [2025-2099] for the default 5*5 grid.
        start.value = new Date(start.value.getFullYear() - (start.value.getFullYear() % cellsCount.value), 0, 1, 0, 0, 0, 0)
        end.value = new Date(start.value.getFullYear() + cellsCount.value, 0, 0, 23, 59, 59, 999)
        break
    }

    console.log('🙆‍♂️', 'updateView', { start: start.value, end: end.value })
  }

  function switchView (id, emitUpdate = true) {
    const availableViews = Object.keys(config.availableViews)

    if (viewId.value === id) return
    if (availableViews.includes(id)) {
      transitionDirection.value = availableViews.indexOf(id) < availableViews.indexOf(viewId.value) ? 'left' : 'right'
      viewId.value = id
      emit('update:view', id)
      updateView()
    }
    else !!console.warn(`Vue Cal: the \`${id}\` view is not available.`)
  }

  function switchToBroaderView () {
    if (broaderView.value) switchView(broaderView.value)
    else console.warn('Vue Cal: no broader view is available.')
  }

  function switchToNarrowerView () {
    if (narrowerView.value) switchView(narrowerView.value)
    else console.warn('Vue Cal: no narrower view is available.')
  }

  function previous () {
    navigate(false)
  }

  function next () {
    navigate(true)
  }

  /**
   * Navigate to the next or previous similar view.
   *
   * @param {bool} forward
   */
  function navigate (forward = true) {
    let newViewDate = viewDate.value
    const { cols, rows } = config.availableViews[viewId.value]

    switch (viewId.value) {
      case 'day':
      case 'days':
        // In days view, hiding weekdays will extend the date range of as many skipped days, so
        // navigating to the next range should take in account the last calculated cell date.
        newViewDate = new Date(dateUtils[forward ? 'addDays' : 'subtractDays'](forward ? lastCellDate.value : firstCellDate.value, 1))
        break
      case 'week': {
        const prevFirstDayOfWeek = dateUtils.getPreviousFirstDayOfWeek(newViewDate, config.startWeekOnSunday && !config.hideWeekdays[7])
        newViewDate = dateUtils[forward ? 'addDays' : 'subtractDays'](prevFirstDayOfWeek, cols * rows)
        break
      }
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

    updateViewDate(newViewDate)
  }

  function goToToday () {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    updateViewDate(today)
  }

  /**
   * Takes the view to a given date.
   * If the date is already in the view range, nothing will
   * happen, unless the forceUpdate bool is set to true. For instance, when switching the
   * startWeekOnSunday, we want to update the view and force the first day of the view to
   * switch between Sunday and Monday, even if it may already be in view.
   *
   * @param {Date} date the new Date to bring to the view.
   * @param {Boolean} emitUpdate emits the update:viewDate event (not wanted from watcher)
   * @param {Boolean} forceUpdate By default if the date is in view range, nothing happens.
   * @returns void
   */
  function updateViewDate (date, emitUpdate = true, forceUpdate = false) {
    if (!dateUtils.isValid(date)) return console.warn('Vue Cal: can\'t navigate to the given date: invalid date provided to `updateViewDate(date)`.')

    // If the provided date is already in the view range, we don't need/want to update the view and
    // recompute all the cells! But if forced (forceUpdate), just do it.
    // Before checking if the date is in view range, use the firstCellDate and lastCellDate unless on month view
    // (where we still want to navigate when clicking a cell that is out of range).
    let [viewStart, viewEnd] = [firstCellDate.value, lastCellDate.value]
    if (viewId.value === 'month') ([viewStart, viewEnd] = [start.value, end.value])
    if (!dateUtils.isInRange(date, viewStart, viewEnd) || forceUpdate) {
      date.setHours(0, 0, 0, 0)
      transitionDirection.value = date.getTime() < viewStart.getTime() ? 'left' : 'right'
      viewDate.value = date
      if (emitUpdate) emit('update:viewDate', date)
      updateView()
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

  /**
   * When switching the startWeekOnSunday prop, update the view.
   *
   * @param {Boolean} bool start the week on Sunday or not.
   */
  function switchWeekStart (bool) {
    if (!bool && !start.value.getDay()) updateViewDate(dateUtils.addDays(start.value, 1), true, true)
    else {
      transitionDirection.value = 'left'
      updateView()
    }
  }

  /**
   * When toggling the hideWeekends prop, update the view.
   *
   * @param {Boolean} hide hide weekends or not.
   */
  function toggleWeekends (hide) {
    console.log('😮', hide, config.startWeekOnSunday, start.value)
    if (hide && config.startWeekOnSunday && !start.value.getDay()) updateViewDate(dateUtils.addDays(start.value, 1), true, true)
    else if (!hide && config.startWeekOnSunday && start.value.getDay() === 1) updateViewDate(dateUtils.subtractDays(start.value, 1), true, true)
  }

  /**
   * When toggling weekdays, update the view.
   */
  function toggleWeekdays () {
    console.log('toggling weekdays', config.hideWeekdays)
  }

  /**
   * Only if watchRealTime is true.
   * Pull the current time from user machine every minute to keep vue-cal accurate even when idle.
   * This will redraw the now line every minute and ensure that Today's date is always accurate.
   */
  function timeTick () {
    // Updating `now` will re-trigger the computed `todaysTimePosition` in cell.vue.
    now.value = new Date()
    timeTickerId = setTimeout(timeTick, 60 * 1000) // Every minute.
  }

  watch(() => config.view, view => switchView(view, false))
  watch(() => config.availableViews, updateView)
  watch(() => config.viewDate, date => updateViewDate(date, false))
  watch(() => config.selectedDate, date => updateSelectedDate(date, false))
  watch(() => config.startWeekOnSunday, bool => switchWeekStart(bool))
  watch(() => config.hideWeekends, bool => toggleWeekends(bool))
  watch(() => config.hideWeekdays, toggleWeekdays)

  updateView()

  // Timers are expensive, this should only trigger on demand.
  if (config.time && config.watchRealTime) {
    // Snap the time ticker on round minutes (when seconds = 0), so that we can set
    // the time ticker interval to 60 seconds and spare some function calls.
    timeTickerId = setTimeout(timeTick, (60 - now.value.getSeconds()) * 1000)
  }

  onBeforeUnmount(() => (timeTickerId = clearTimeout(timeTickerId))) // Stop the time ticker.

  // ! \ IMPORTANT NOTE:
  // If the selectedDate prop would be added to the view, any click on any cell (triggering an emit
  // of the selectedDate), would trigger a re-rendering of all the cells of the view.
  return {
    now,
    id: viewId,
    broaderView,
    narrowerView,
    title,
    viewDate,
    start,
    end,
    firstCellDate,
    lastCellDate,
    containsToday,
    selectedDate,
    cellDates,
    cols,
    rows,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events,
    switch: switchView,
    broader: switchToBroaderView,
    narrower: switchToNarrowerView,
    previous,
    next,
    navigate,
    goToToday,
    updateViewDate,
    updateSelectedDate,
    transitionDirection,
    // Getters.
    get isDay () { return viewId.value === 'day' },
    get isDays () { return viewId.value === 'days' },
    get isWeek () { return viewId.value === 'week' },
    get isMonth () { return viewId.value === 'month' },
    get isYear () { return viewId.value === 'year' },
    get isYears () { return viewId.value === 'years' }
  }
}
