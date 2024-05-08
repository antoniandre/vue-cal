import { computed, ref, unref } from 'vue'

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

export const useConfig = props => {
  const ready = false
  const sm = computed(() => props.sm && !props.xs)
  const xs = computed(() => props.xs || props.datePicker)
  const clickToNavigate = computed(() => props.clickToNavigate || (props.datePicker && props.clickToNavigate !== false))
  const views = (props.views)

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
    defaultView,
    availableViews,
    ready,
    props,
    sm,
    xs,
    clickToNavigate,
    get size () { return xs.value ? 'xs' : (sm.value ? 'sm' : 'lg') }
  }
}
