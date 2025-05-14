import { computed, reactive, toRefs, watch } from 'vue'

export const defaults = {
  texts: {
    weekDays: Array(7).fill(''),
    weekDaysShort: [],
    months: Array(12).fill(''),
    years: '',
    year: '',
    month: '',
    week: '',
    day: '',
    today: '',
    noEvent: '',
    allDay: '',
    deleteEvent: '',
    createEvent: '',
    dateFormat: 'dddd MMMM D, YYYY',
    am: 'am',
    pm: 'pm',
    truncations: true
  },

  availableViews: {
    day: { cols: 1, rows: 1 },
    days: { cols: 10, rows: 1 },
    week: { cols: 7, rows: 1 },
    month: { cols: 7, rows: 6 },
    year: { cols: 4, rows: 3 },
    years: { cols: 5, rows: 5 } // Arbitrary range of quarters of century (25y).
  }
}

// Short labels for CSS classes.
export const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
export const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const weekdaysMap = weekdays.reduce((obj, day, i) => { // 1 - 7, from Mon to Sun.
  obj[day] = i || 7
  return obj
}, {})

export const useConfig = (vuecal, props, attrs) => {
  const { dateUtils } = vuecal
  const ready = false
  const view = computed(() => {
    if (availableViews.value[props.view]) return props.view

    const fallbackView = props.datePicker ? 'month' : 'week'
    const view = props.view || fallbackView
    if (availableViews.value[view]) return view

    console.warn(
      `Vue Cal: the provided or default view \`${view}\` is either invalid or not in the list of available views.` +
      ` The first available view will be chosen: \`${Object.keys(availableViews.value)[0]}\`.`)
    return Object.keys(availableViews.value)[0]
  })
  const sm = computed(() => props.sm && !props.xs)
  const xs = computed(() => props.xs || props.datePicker)
  const clickToNavigate = computed(() => props.clickToNavigate || (props.datePicker && props.clickToNavigate !== false))

  /**
   * Extract all the Vue Cal external event listeners for cells and events, and prepare an object to
   * pass to the cell component which will v-on this object of listeners.
   */
  const eventListeners = computed(() => {
    const listeners = {
      cell: {}, // All possible event listeners to attach to cells.
      event: {} // All possible event listeners to attach to calendar events.
    }

    const kebabize = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    // Forward any cell and calendar-events event listener attached to VueCal to the cell and event components.
    // For instance, convert vuecal.onCellMouseenter to cell.mouseenter.
    for (const [attr, value] of Object.entries(attrs)) {
      const [m0, m1, m2] = attr.match(/^on(Cell|Event)(.+)$/) || []
      // Allow both camelCase and kebab-case for event handlers names, but store as kebab-case.
      if (m0) listeners[m1.toLowerCase()][kebabize(m2).replace(/^-+|-+$/g, '')] = value
    }

    return listeners
  })

  // An object consisting of only the weekdays to hide, given their index (1-7, Mon - Sun).
  // E.g. { 1: true, 6: true, 7 true } will hide the Mondays and weekends.
  const hideWeekdays = computed(() => {
    const weekDays = {} // 1-7, Mon - Sun.
    if (props.hideWeekends) (weekDays[6] = true) && (weekDays[7] = true)
    if (props.hideWeekdays?.length) props.hideWeekdays.forEach(day => weekDays[weekdaysMap[day]] = true)

    return weekDays
  })
  const hideWeekends = computed(() => props.hideWeekends || (hideWeekdays.value[6] && hideWeekdays.value[7]))

  const availableViews = computed(() => {
    const datePicker = props.datePicker
    let invalidViews = 0
    let availViews = {} // The new object to return.
    const views = props.views

    // Default views for date picker layout: ['month', 'year', 'years'].
    if (datePicker && !views) return {
      month: { ...defaults.availableViews.month },
      year: { ...defaults.availableViews.year },
      years: { ...defaults.availableViews.years }
    }
    if (views) {
      if (Array.isArray(views)) {
        availViews = views.reduce((obj, view) => {
          if (typeof view === 'string' && defaults.availableViews[view]) obj[view] = defaults.availableViews[view]
          else invalidViews++
          return obj
        }, {})
      }
      else if (typeof views === 'object') {
        availViews = Object.entries(views).reduce((obj, [id, size]) => {
          const { cols, rows } = defaults.availableViews[id]
          obj[id] = { cols: size.cols || cols, rows: size.rows || rows }
          return obj
        }, {})
      }
      // Else case handled by unauthorized Vue props definition error.

      if (invalidViews) {
        console.warn('Vue Cal: the provided `views` prop contains invalid views that will be ignored.')
      }
      if (!Object.keys(availViews).length) {
        console.warn('Vue Cal: No valid view in the provided `views` prop. Falling back to default views.')
        availViews = { ...defaults.availableViews }
      }
    }
    // Default views for normal layout: ['day', 'days', 'week', 'month', 'year', 'years'] }.
    else availViews = { ...defaults.availableViews }

    return availViews
  })

  const defaultView = computed(() => {
    if (props.datePicker) return 'month'
    if (availableViews.value.week) return 'week'
    return Object.keys(availableViews.value)[0]
  })

  const selectedDate = computed(() => {
    if (typeof props.selectedDate === 'string') return dateUtils.stringToDate(props.selectedDate)
    if (props.selectedDate instanceof Date) return props.selectedDate
    if (!props.selectedDate) console.log('Vue Cal: Info - The provided selected date is undefined.')
    else console.warn('Vue Cal: The provided selected date is invalid:', props.selectedDate)
  })

  // An array of specific dates to disable.
  // The dates can be provided as 'YYYY-MM-DD' strings or Date objects and the dates are validated
  // or ignored.
  const disableDays = computed(() => {
    if (!props.disableDays) return []

    const validDates = []
    if (Array.isArray(props.disableDays)) {
      for (let date of props.disableDays) {
        let jsDate = date
        if (typeof date === 'string') jsDate = dateUtils.stringToDate(date)
        else if (date instanceof Date) date = dateUtils.formatDate(date, 'YYYY-MM-DD')

        if (jsDate instanceof Date && !isNaN(jsDate.getTime())) {
          validDates.push(date)
          // Don't return here, we need to process all dates in the array.
        }
        else {
          console.warn('Vue Cal: The provided `disableDays` prop contains an invalid date:', date)
        }
      }
    }
    else console.warn('Vue Cal: The provided `disableDays` prop is invalid:', props.disableDays)

    return validDates
  })

  /**
   * Mostly for date pickers, sets a minimum date for cell interactions.
   */
  const minTimestamp = computed(() => {
    let date = null
    if (props.minDate && typeof props.minDate === 'string') date = dateUtils.stringToDate(props.minDate)
    else if (props.minDate && props.minDate instanceof Date) date = props.minDate
    return date?.getTime() || null
  })

  /**
   * Mostly for date pickers, sets a maximum date for cell interactions.
   */
  const maxTimestamp = computed(() => {
    let date = null
    if (props.maxDate && typeof props.maxDate === 'string') date = dateUtils.stringToDate(props.maxDate)
    else if (props.maxDate && props.maxDate instanceof Date) date = props.maxDate
    return date?.getTime() || null
  })

  const schedules = computed(() => {
    const { view } = vuecal
    const show = props.schedules.length && (view.isDay || view.isDays || view.isWeek)
    // Inject an id in each schedule if not present.
    return (show && props.schedules?.map((s, i) => ({ ...s, id: s.id ?? (i + 1) }))) || undefined
  })

  const editableEvents = computed(() => {
    const defaults = {
      drag: true,
      resize: true,
      delete: true,
      create: true
    }
    if (props.editableEvents === true) return defaults
    if (props.editableEvents === false) return Object.keys(defaults).map(key => defaults[key] = false)
    return { ...defaults, ...props.editableEvents }
  })

  const showCellEventCount = computed(() => {
    const { view } = vuecal
    const { eventCount } = props
    const showEventCount = Array.isArray(eventCount) ? eventCount.includes(view.id) : eventCount
    return showEventCount && ((view.isMonth && !props.eventsOnMonthView) || view.isYear)
  })

  const allDayEvents = computed(() => props.allDayEvents && props.time !== false && !view.isMonth)

  const timeAtCursor = computed(() => props.timeAtCursor && props.time !== false)

  /**
   * Asynchronously loads translation texts for the given locale.
   *
   * Uses Vite's `import.meta.glob` to lazy load translation JSON files on client-side.
   * On server-side (SSR), it reads the JSON files directly from the file system.
   * Falls back to 'en-us' if the requested locale does not exist.
   *
   * @async
   * @function loadTexts
   * @param {string} locale - The locale identifier (e.g., 'en-us') for which to load translation texts.
   * @throws {Error} Throws an error if the locale file is not found on the server-side.
   * @returns {Promise<void>} Resolves when the translation texts are successfully loaded and applied.
   */
  const loadTexts = async locale => {
    // Vite can't resolve imports that have more than 1 variable and no extension.
    // https://vitejs.dev/guide/features.html#dynamic-import
    // So this glob is much more convenient and not penalizing as all the matches are
    // lazy-loaded by default. E.g. { comp1: () => import('path/to/comp1.vue' }
    // https://vitejs.dev/guide/features.html#glob-import
    let translations = import.meta.glob('../i18n/*.json', { import: 'default' })

    if (import.meta.env.SSR) {
      let fs
      (async () => (fs = await import('node:fs').then(mod => mod.promises)))()

      const filePath = new URL(`../i18n/${locale}.json`, import.meta.url).pathname
      try {
        const data = await fs.readFile(filePath, 'utf-8')
        translations = JSON.parse(data)
      }
      catch (_) {
        throw new Error(`Vue Cal: the locale \`${locale}\` does not exist. Falling back to \`en-us\`.`)
      }
    }
    else {
      if (!translations[`../i18n/${locale}.json`]) {
        console.warn(`Vue Cal: the locale \`${locale}\` does not exist. Falling back to \`en-us\`.`)
        locale = 'en-us'
        return
      }
      translations = await translations[`../i18n/${locale}.json`]?.() // Load this translation file.
    }

    // Update the texts in the reactive store for all the components to use.
    vuecal.texts = Object.assign(vuecal.texts, Object.assign({ ...defaults.texts }, translations))
    dateUtils.updateTexts(vuecal.texts)
  }

  // Keep a local copy of the events so the prop is not mandatory.
  const events = reactive(props.events || [])
  watch(() => props.events, evts => events.splice(0, events.length, ...evts))
  watch(() => props.locale, newLocale => loadTexts(newLocale || 'en-us'))

  // If a locale is requested via prop, load it (async call).
  // But if a locale is directly provided from external source using useLocale(),
  // the locale is ready right away.
  if (props.locale || !vuecal.texts.today) loadTexts(props.locale || 'en-us')

  return {
    ...toRefs(props),
    events,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners,
    defaultView,
    availableViews,
    disableDays,
    ready,
    sm,
    xs,
    clickToNavigate,
    hideWeekdays,
    hideWeekends,
    minTimestamp,
    maxTimestamp,
    schedules,
    selectedDate,
    editableEvents,
    showCellEventCount,
    allDayEvents,
    timeAtCursor,
    view,
    // Getters.
    get hasHiddenDays () { return Object.keys(hideWeekdays.value).length },
    get size () { return xs.value ? 'xs' : (sm.value ? 'sm' : 'lg') },
    loadTexts
  }
}
