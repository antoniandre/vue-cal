import { ref, computed, watch, onBeforeUnmount, nextTick } from 'vue'

export const useView = ({ config, dateUtils, emit, texts, eventsManager }, vuecalEl) => {
  const { availableViews } = config
  const viewId = ref(config.view && availableViews[config.view] ? config.view : config.defaultView)
  const selectedDate = ref(config.selectedDate || null)

  // Dates.
  // ------------------------------------------------------
  // Preset at now date on load, but updated every minute if watchRealTime,
  // or updated at least on each cells rerender, in order to keep Today's date accurate.
  const now = ref(new Date())

  // The view date is the one given in prop. It can be any date within the view that will be
  // computed around it - not necessarily the first day of the view range.
  // E.g. [start, ..., viewDate, ..., end]
  const viewDate = ref(new Date(config.viewDate || now.value))
  viewDate.value.setHours(0, 0, 0, 0)
  // The starting point of all the calculations.
  // on created and on navigation, two date ranges are computed:
  // [start-end]: the common date range to use.
  // [firstCellDate-endCellDate]: the full visible range including out-of-scope days in month view.
  const startTheoretical = ref(new Date(viewDate))

  // For the now line when watchRealTime is true. 2 timeouts: 1 to snap to round minutes, then 1 every minute.
  let timeTickerId = null

  const start = computed(() => {
    if (viewId.value === 'month') return startTheoretical.value
    return firstCellDate.value
  })
  const end = computed(() => {
    if (viewId.value === 'month') return new Date(startTheoretical.value.getFullYear(), startTheoretical.value.getMonth() + 1, 0, 23, 59, 59, 999)
    return lastCellDate.value
  })

  const extendedStart = computed(() => {
    if (viewId.value === 'week') return dateUtils.getPreviousFirstDayOfWeek(firstCellDate.value, config.startWeekOnSunday)
    if (viewId.value === 'month') return firstCellDate.value
    return start.value
  })
  const extendedEnd = computed(() => {
    if (viewId.value === 'week') {
      const endWeek = dateUtils.addDays(extendedStart.value, 7)
      endWeek.setMilliseconds(-1)
      return endWeek
    }
    if (viewId.value === 'month') return lastCellDate.value
    return end.value
  })

  const containsToday = computed(() => {
    const nowTime = now.value.getTime()

    if (viewId.value === 'week') {
      return extendedStart.value.getTime() <= nowTime && nowTime <= extendedEnd.value.getTime()
    }

    const firstCellTime = firstCellDate.value.getTime()
    const lastCellTime = lastCellDate.value.getTime()
    return firstCellTime <= nowTime && nowTime <= lastCellTime
  })

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

  function initTimeTicker () {
    // Snap the time ticker on round minutes (when seconds = 0), so that we can set
    // the time ticker interval to 60 seconds and spare some function calls.
    timeTickerId = setTimeout(timeTick, (60 - new Date().getSeconds()) * 1000)

    timeTick()
  }
  // ------------------------------------------------------

  // Cells.
  // ------------------------------------------------------
  const cols = computed(() => {
    // When switching to date-picker from week view, the first computation is done before the
    // availableViews object is updated, so we need to check if the view is available.
    if (!config.availableViews[viewId.value]) return 1

    // Includes all the weekdays, but some may need to be hidden.
    let cols = config.availableViews[viewId.value].cols
    // In Week and month views only, the grid rows must be decreased from 7 to `7 - all hidden weekdays`.
    if (config.hasHiddenDays && ['week', 'month'].includes(viewId.value)) cols -= config.hasHiddenDays
    return cols
  })
  const rows = computed(() => config.availableViews[viewId.value]?.rows || 1)

  // Create as many grid cells as defined in the availableViews map (cols * rows).
  const cellsCount = computed(() => cols.value * rows.value)

  const firstCellDate = computed(() => {
    if (viewId.value === 'month') {
      // By default, the month view has 6 rows of 7 days. If the first day of the month is not
      // a Monday (or Sunday if startWeekOnSunday), then pad the preceding cells with days from the
      // previous month. E.g.
      // M  T  W  T  F  S  S
      // 28 29 30 1  2  3  4
      let weekday = startTheoretical.value.getDay() || 7 // 1-7, starting from Monday.

      if (config.startWeekOnSunday && !config.hideWeekdays[7]) weekday += 1
      if (config.viewDayOffset) weekday -= config.viewDayOffset
      return dateUtils.subtractDays(startTheoretical.value, weekday - 1)
    }
    if (viewId.value === 'week') {
      const visibleDays = '1234567'.split('').filter(day => !Object.keys(config.hideWeekdays).includes(day))
      let firstVisibleDay = Math.min(...visibleDays)
      if (config.startWeekOnSunday && !config.hideWeekdays[7]) firstVisibleDay = 1
      if (config.viewDayOffset) firstVisibleDay += config.viewDayOffset

      return dateUtils.addDays(startTheoretical.value, firstVisibleDay - 1)
    }

    return startTheoretical.value
  })

  // Generates an array of dates for each cell in the view: 1 cell = 1 date range [start, end].
  // IMPORTANT NOTES:
  // - Better performance here than in each cell.
  // - This computed should only manage pure dates: no text, no event, nothing likely to be
  //   triggering recomputing due to a change in the reactivity chain.
  //   Every recomputing can become very expensive when handling a large amount of cells per view
  //   with a large amount of calendar events.
  const cellDates = computed(() => {
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
  // ------------------------------------------------------

  // Navigation.
  // ------------------------------------------------------
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

  /**
   * Gets a month name with optional truncation.
   *
   * @param {number} monthIndex - The 0-based month index.
   * @param {Array} monthsArray - Array of month names.
   * @param {boolean} shouldTruncate - Whether to truncate the month name.
   * @returns {string} The formatted month name.
   */
  function getMonthName(monthIndex, monthsArray, shouldTruncate = false) {
    if (!monthsArray || !monthsArray[monthIndex]) return monthIndex + 1 // Numeric fallback.

    const name = monthsArray[monthIndex]
    return shouldTruncate && typeof name === 'string' ? name.substring(0, 3) : name
  }

  /**
   * Formats a date range between two dates.
   *
   * @param {Date} start - The start date.
   * @param {Date} end - The end date.
   * @param {Object} options - Formatting options.
   * @returns {string} The formatted date range.
   */
  function formatDateRange(start, end, options) {
    const { monthsArray, monthBeforeDay, canTruncate, xs } = options

    const startMonth = start.getMonth()
    const startYear = start.getFullYear()
    const endMonth = end.getMonth()
    const endYear = end.getFullYear()
    const crossingMonth = startMonth !== endMonth
    const crossingYear = startYear !== endYear

    // Should we truncate month names?.
    const shouldTruncate = canTruncate && (xs || crossingMonth)

    // Get day numbers directly.
    const startDay = start.getDate()
    const endDay = end.getDate()

    if (crossingYear) {
      // Different years.
      if (monthBeforeDay) return `${getMonthName(startMonth, monthsArray, shouldTruncate)} ${startDay}, ${startYear} - ${getMonthName(endMonth, monthsArray, shouldTruncate)} ${endDay}, ${endYear}`
      return `${startDay} ${getMonthName(startMonth, monthsArray, shouldTruncate)} ${startYear} - ${endDay} ${getMonthName(endMonth, monthsArray, shouldTruncate)} ${endYear}`
    }
    if (crossingMonth) {
      // Same year, different months.
      if (monthBeforeDay) return `${getMonthName(startMonth, monthsArray, shouldTruncate)} ${startDay} - ${getMonthName(endMonth, monthsArray, shouldTruncate)} ${endDay}, ${startYear}`
      return `${startDay} ${getMonthName(startMonth, monthsArray, shouldTruncate)} - ${endDay} ${getMonthName(endMonth, monthsArray, shouldTruncate)} ${startYear}`
    }
    // Same month and year.
    if (monthBeforeDay) return `${getMonthName(startMonth, monthsArray, shouldTruncate)} ${startDay}-${endDay}, ${startYear}`
    return `${startDay}-${endDay} ${getMonthName(startMonth, monthsArray, shouldTruncate)} ${startYear}`
  }

  const title = computed(() => {
    const { dateFormat, months, monthsGenitive, week: weekText, truncations } = texts
    const locale = config.locale
    const canTruncate = truncations !== false

    // Determine date format style (month-first or day-first).
    const monthBeforeDay = dateFormat.indexOf('M') < dateFormat.indexOf('D')

    // Use genitive case for Greek if available and appropriate.
    const monthsArray = (monthsGenitive && locale === 'el') ? monthsGenitive : months

    switch (viewId.value) {
      case 'day':
        return dateUtils.formatDate(firstCellDate.value, dateFormat)

      case 'days':
      case 'week': {
        const options = {
          monthsArray,
          monthBeforeDay,
          canTruncate,
          xs: config.xs
        }

        let result = formatDateRange(firstCellDate.value, lastCellDate.value, options)

        // Add week number for week view.
        if (viewId.value === 'week') {
          const weekNumber = dateUtils.getWeek(
            firstCellDate.value,
            config.startWeekOnSunday && !config.hideWeekdays[7]
          )
          result += ` <small>${weekText} ${weekNumber}</small>`
        }

        return result
      }

      case 'month': {
        // Shorten month if xs and the locale doesn't forbid it.
        const format = `${config.xs && canTruncate ? 'MMM' : 'MMMM'} YYYY`
        return dateUtils.formatDate(start.value, format)
      }

      case 'year':
        return firstCellDate.value.getFullYear()

      case 'years':
        return `${firstCellDate.value.getFullYear()} - ${end.value.getFullYear()}`
    }
  })

  /**
   * This function is called after each view variable update and will recompute the theoretical view
   * [start-end] date range.
   * `startTheoretical` is updated
   *  > triggers a recomputation of `firstCellDate`
   *    > triggers a recomputation of `cellDates`
   *      > triggers a recomputation of `events`.
   * The practical view date range may differ when hiding weekdays, or on month view due to out of
   * scope dates.
   */
  async function updateView () {
    startTheoretical.value = new Date(viewDate.value || now.value)
    startTheoretical.value.setHours(0, 0, 0, 0)

    switch (viewId.value) {
      case 'day':
        break
      case 'days':
        break
      case 'week':
        startTheoretical.value = dateUtils.getPreviousFirstDayOfWeek(startTheoretical.value, config.startWeekOnSunday && !config.hideWeekdays[7])
        break
      case 'month':
        startTheoretical.value = new Date(startTheoretical.value.getFullYear(), startTheoretical.value.getMonth(), 1, 0, 0, 0, 0)
        break
      case 'year':
        startTheoretical.value = new Date(startTheoretical.value.getFullYear(), 0, 1, 0, 0, 0, 0)
        break
      case 'years':
        // The modulo is only here to always cut off at the same years regardless of the current year.
        // E.g. always [1975-1999], [2000-2024], [2025-2099] for the default 5*5 grid.
        startTheoretical.value = new Date(startTheoretical.value.getFullYear() - (startTheoretical.value.getFullYear() % cellsCount.value), 0, 1, 0, 0, 0, 0)
        break
    }

    // Updating `now` will re-trigger the computed `todaysTimePosition` in cell.vue.
    // Does not cost much to update when not watching real time as it is only computed when the view
    // is updated.
    now.value = new Date()

    if (config.ready) {
      // Use nextTick to emit after the current update cycle is complete,
      // to ensure all computed values are up to date and to prevent cascading updates.
      await nextTick()
      emit('view-change', {
        id: viewId.value,
        title: title.value,
        start: start.value,
        end: end.value,
        extendedStart: extendedStart.value,
        extendedEnd: extendedEnd.value,
        cellDates: cellDates.value,
        containsToday: containsToday.value,
        events: events.value
      })
    }
  }

  /**
   * Only call the updateView function (which redraws the cells) if the current view changes.
   *
   * @param {Object} views the new available views object.
   */
  function updateViewIfNeeded (views) {
    const currView = viewId.value
    const currViewLayout = config.availableViews[currView] // cols * rows.
    if (!(views[currView] && JSON.stringify(views[currView]) === JSON.stringify(currViewLayout))) {
      updateView()
    }
  }

  function switchView (id, emitUpdate = true) {
    const availableViews = Object.keys(config.availableViews)

    if (viewId.value === id) return
    if (availableViews.includes(id)) {
      transitionDirection.value = availableViews.indexOf(id) < availableViews.indexOf(viewId.value) ? 'left' : 'right'
      viewId.value = id
      if (emitUpdate) emit('update:view', id)
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
    let newViewDate = new Date(viewDate.value)

    switch (viewId.value) {
      case 'day':
      case 'days':
        // In days view, hiding weekdays will extend the date range of as many skipped days, so
        // navigating to the next range should take in account the last calculated cell date.
        if (forward) newViewDate = dateUtils.addDays(lastCellDate.value, 1)
        else newViewDate = dateUtils.subtractDays(firstCellDate.value, cellsCount.value)
        break
      case 'week': {
        if (forward) {
          newViewDate = dateUtils.addDays(extendedEnd.value, 1)
          newViewDate.setHours(0, 0, 0, 0)
        }
        else newViewDate = dateUtils.subtractDays(extendedStart.value, cellsCount.value)
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
        const increment = forward ? cellsCount.value : - (cellsCount.value)
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

    const { isValid, isSameDate } = dateUtils
    if (!selectedDate.value || !isValid(selectedDate.value) || !isSameDate(date, selectedDate.value)) {
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
    if (!bool && !startTheoretical.value.getDay()) updateViewDate(dateUtils.addDays(startTheoretical.value, 1), true, true)
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
    if (hide && config.startWeekOnSunday && !startTheoretical.value.getDay()) updateViewDate(dateUtils.addDays(startTheoretical.value, 1), true, true)
    else if (!hide && config.startWeekOnSunday && startTheoretical.value.getDay() === 1) updateViewDate(dateUtils.subtractDays(startTheoretical.value, 1), true, true)
  }

  /**
   * When toggling weekdays, update the view.
   */
  function toggleWeekdays () {
    console.log('toggling weekdays', config.hideWeekdays)
    updateView()
  }

  function scrollToTime (minutes) {
    const scrollableEl = vuecalEl.value?.querySelector('.vuecal__scrollable')
    const anchor = minutes ? minutes * config.timeCellHeight / config.timeStep : 0
    scrollableEl?.scrollTo({ top: anchor, behavior: 'smooth' })
  }

  function scrollToCurrentTime () {
    const now = new Date()
    scrollToTime(now.getHours() * 60 + now.getMinutes())
  }

  function scrollTop () {
    scrollToTime(0)
  }
  // ------------------------------------------------------

  // Array of IDs inside an object indexed by cell dates.
  const events = computed(() => eventsManager.getViewEvents(cellDates.value))

  const createEvent = eventsManager.createEvent

  const deleteEvent = eventsManager.deleteEvent
  // ------------------------------------------------------

  watch(() => config.view, view => switchView(view, false))
  watch(() => config.availableViews, updateViewIfNeeded)
  watch(() => config.datePicker, () => switchView('month'))
  watch(() => config.viewDate, date => updateViewDate(date, false))
  watch(() => config.selectedDate, date => updateSelectedDate(date, false))
  watch(() => config.startWeekOnSunday, bool => switchWeekStart(bool))
  watch(() => config.hideWeekends, bool => toggleWeekends(bool))
  watch(() => config.hideWeekdays, toggleWeekdays)
  watch(() => cellsCount.value, () => {
    if (cellsCount.value > 90) console.warn('Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.')
  })
  watch(() => config.watchRealTime, watchRealTime => {
    if (watchRealTime && config.time) initTimeTicker()
    else timeTickerId = clearTimeout(timeTickerId)
  })

  updateView()

  // Timers are expensive, this should only trigger on demand.
  if (config.time && config.watchRealTime) initTimeTicker()

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
    extendedStart, // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd, // Full range, including out of scope month days, and hidden leading/trailing days.
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
    transitionDirection,
    switch: switchView,
    broader: switchToBroaderView,
    narrower: switchToNarrowerView,
    previous,
    next,
    navigate,
    goToToday,
    updateViewDate,
    updateSelectedDate,
    scrollToCurrentTime,
    scrollToTime,
    scrollTop,
    createEvent,
    deleteEvent,
    // Getters.
    get isDay () { return viewId.value === 'day' },
    get isDays () { return viewId.value === 'days' },
    get isWeek () { return viewId.value === 'week' },
    get isMonth () { return viewId.value === 'month' },
    get isYear () { return viewId.value === 'year' },
    get isYears () { return viewId.value === 'years' }
  }
}
