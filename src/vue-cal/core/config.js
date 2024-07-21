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

  return {
    ...toRefs(props),
    defaultView,
    availableViews,
    ready,
    props,
    sm,
    xs,
    clickToNavigate,
    hideWeekdays,
    hideWeekends,
    // Getters.
    get hasHiddenDays () { return Object.keys(hideWeekdays.value).length },
    get size () { return xs.value ? 'xs' : (sm.value ? 'sm' : 'lg') }
  }
}
