import { computed, ref, unref, toRefs } from 'vue'

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
    pm: 'pm'
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

export const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
export const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

const weekdaysMap = weekdays.reduce((obj, day, i) => { // 1 - 7, from Mon to Sun.
  obj[day] = i || 7
  return obj
}, {})

export const useConfig = (vuecal, props) => {
  const { dateUtils } = vuecal
  const ready = false
  const sm = computed(() => props.sm && !props.xs)
  const xs = computed(() => props.xs || props.datePicker)
  const clickToNavigate = computed(() => props.clickToNavigate || (props.datePicker && props.clickToNavigate !== false))

  // An object consisting of only the weekdays to hide, given their index (1-7, Mon - Sun).
  // E.g. { 1: true, 6: true, 7 true } will hide the Mondays and weekends.
  const hideWeekdays = computed(() => {
    const weekDays = {} // 1-7, Mon - Sun.
    if (props.hideWeekends) (weekDays[6] = true) && (weekDays[7] = true)
    if (props.hideWeekdays?.length) props.hideWeekdays.forEach(day => weekDays[weekdaysMap[day]] = true)

    return weekDays
  })
  const hideWeekends = computed(() => props.hideWeekends || (hideWeekdays.value[6] && hideWeekdays.value[7]))

  const views = props.views

  const availableViews = computed(() => {
    const datePicker = props.datePicker
    let invalidViews = 0
    let availViews = {} // The new object to return.

    if (datePicker) return {
      month: { ...defaults.availableViews.month },
      year: { ...defaults.availableViews.year },
      years: { ...defaults.availableViews.years }
    }
    else if (views) {
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
      }
    }
    else availViews = { ...defaults.availableViews }

    return availViews
  })

  const defaultView = computed(() => {
    console.log('recomputing defaultView')
    if (props.datePicker) return 'month'
    else if (availableViews.week) return 'week'
    else return Object.keys(availableViews)[0]
  })

  const loadTexts = async locale => {
    // Vite can't resolve imports that have more than 1 variable and no extension.
    // https://vitejs.dev/guide/features.html#dynamic-import
    // So this glob is much more convenient and not penalizing as all the matches are
    // lazy-loaded by default. E.g. { comp1: () => import('path/to/comp1.vue' }
    // https://vitejs.dev/guide/features.html#glob-import
    let translations = import.meta.glob('../i18n/*.json')

    if (!translations[`../i18n/${locale}.json`]) {
      console.warn(`Vue Cal: the locale \`${locale}\` does not exist. Falling back to \`en-us\`.`)
      locale = 'en-us'
    }
    translations = await translations[`../i18n/${locale}.json`]?.() // Load this translation file.
    // Update the texts in the reactive store for all the components to use.
    vuecal.texts = Object.assign(vuecal.texts, Object.assign({ ...defaults.texts }, translations))
  }

  const daySplits = computed(() => {
    const { view } = vuecal
    return (props.splitDays.length && (view.isDay || view.isDays || view.isWeek) && props.splitDays)
  })

  return {
    ...toRefs(props),
    defaultView,
    availableViews,
    ready,
    sm,
    xs,
    clickToNavigate,
    hideWeekdays,
    hideWeekends,
    daySplits,
    // Getters.
    get hasHiddenDays () { return Object.keys(hideWeekdays.value).length },
    get size () { return xs.value ? 'xs' : (sm.value ? 'sm' : 'lg') },
    loadTexts
  }
}
