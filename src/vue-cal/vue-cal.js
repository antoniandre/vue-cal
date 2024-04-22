import { ref, computed } from 'vue'
import DateUtils from './utils/date'

const defaults = {
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
    days: { cols: 5, rows: 1 },
    week: { cols: 7, rows: 1 },
    month: { cols: 7, rows: 6 },
    year: { cols: 3, rows: 4 },
    years: { cols: 5, rows: 5 } // Arbitrarily range of quarters of century (25y).
  }
}

/**
 * This is the main class of the calendar, it is instantiated once from the index.vue and
 * inject-provided to all the components.
 * There is no use of Date prototypes in the codebase, because the user may choose to disable them
 * (using them would make things a lot simpler).
 */
export default class {
  props = {}
  emit = null // The Vue emit function from the root component.
  ready = ref(false) // Is vue-cal ready.
  texts = ref({ ...defaults.texts }) // Make texts reactive before a locale is loaded.
  now = new Date()
  // The date utils class.
  // A class is needed in order to access the user locale in all the methods, and independently of
  // other potential Vue Cal instances on the same page.
  dateUtils = null

  availableViews = ref({ ...defaults.availableViews })

  // At any time this object will be filled with current view details, visible events and selected date.
  view = computed(() => {
    const view = this.props.view || 'week'
    const isXs = this.props.xsmall
    const isSm = this.props.small
    let startDate = new Date(this.props.viewDate || this.now)
    startDate.setHours(0, 0, 0, 0)
    let endDate = null
    let firstCellDate = null
    let lastCellDate = null
    let title = ''
    const cellsCount = this.availableViews.value[view].cols * this.availableViews.value[view].rows

    switch (view) {
      case 'day': {
        endDate = new Date(startDate)
        endDate.setHours(23, 59, 59, 999)

        // Truncate long week day and month texts to 3 letters if xs or sm.
        let format = this.texts.value.dateFormat
        if (isXs || isSm) format = format.replace(/dddd|MMMM/g, m0 => m0.substring(0, 3))
        title = this.dateUtils.formatDate(startDate, format)
        break
      }
      case 'days':
        endDate = this.dateUtils.addDays(startDate, cellsCount - 1)
        endDate.setHours(23, 59, 59, 999)
        title = startDate.format(this.texts.value.dateFormat)
        break
      case 'week': {
        startDate = this.dateUtils.getPreviousFirstDayOfWeek(startDate, this.props.startWeekOnSunday)
        endDate = this.dateUtils.addDays(startDate, cellsCount - 1)
        endDate.setHours(23, 59, 59, 999)

        const weekNumber = this.dateUtils.getWeek(startDate)
        let format = `${isXs ? 'MMM' : 'MMMM'} YYYY` // Truncate to 3 letters if xs.
        title = this.dateUtils.formatDate(startDate, format) + ` <small>${this.texts.value.week} ${weekNumber}</small>`
        break
      }
      case 'month': {
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1, 0, 0, 0, 0)
        let dayOfWeek = startDate.getDay()
        dayOfWeek = (!dayOfWeek ? 7 : dayOfWeek) - 1 // 0-6 starting from Monday.
        firstCellDate = this.dateUtils.subtractDays(startDate, dayOfWeek)

        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 999)
        lastCellDate = firstCellDate.addDays(cellsCount - 1)
        lastCellDate.setHours(23, 59, 59, 999)

        let format = `${isXs ? 'MMM' : 'MMMM'} YYYY` // Truncate to 3 letters if xs.
        title = this.dateUtils.formatDate(startDate, format)
        break
      }
      case 'year':
        startDate = new Date(startDate.getFullYear(), 0, 1, 0, 0, 0, 0)
        endDate = new Date(startDate.getFullYear() + 1, 0, 0, 23, 59, 59, 999)
        title = startDate.getFullYear()
        break
      case 'years':
        // The modulo is only here to always cut off at the same years regardless of the current year.
        // E.g. always [1975-1999], [2000-2024], [2025-2099] for the default 5*5 grid.
        startDate = new Date(startDate.getFullYear() - (startDate.getFullYear() % cellsCount), 0, 1, 0, 0, 0, 0)
        endDate = new Date(startDate.getFullYear() + cellsCount, 0, 0, 23, 59, 59, 999)
        title = `${startDate.getFullYear()} - ${endDate.getFullYear()}`
        break
    }

    // ! \ IMPORTANT NOTE:
    // If the selectedDate prop would be added to the view, any click on any cell
    // (triggering an emit of the selectedDate), would trigger a re-rendering of all the
    // cells of the view.
    return {
      id: this.props.view,
      title,
      startDate,
      endDate,
      firstCellDate: firstCellDate || new Date(startDate),
      lastCellDate: lastCellDate || new Date(endDate),
      containsToday: startDate.getTime() <= this.now.getTime() && this.now.getTime() <= endDate.getTime(),
      // All the events are stored in the mutableEvents array, but subset of visible ones are passed
      // Into the current view for fast lookup and manipulation.
      events: []
    }
  })

  constructor (props, emit) {
    this.props = props
    this.emit = emit
    this.dateUtils = new DateUtils(this.texts, this.props.disableDatePrototypes)
    this.loadTexts(props.locale || 'en-us')
  }

  async loadTexts (locale) {
    // Vite can't resolve imports that have more than 1 variable and no extension.
    // https://vitejs.dev/guide/features.html#dynamic-import
    // So this glob is much more convenient and not penalizing as all the matches are
    // lazy-loaded by default. E.g. { comp1: () => import('path/to/comp1.vue' }
    // https://vitejs.dev/guide/features.html#glob-import
    let translations = import.meta.glob('./i18n/*.json')
    translations = await translations[`./i18n/${locale}.json`]?.() // Load this translation file.
    this.texts.value = Object.assign({}, defaults.texts, translations)
  }

  switchView (id) {
    const availableViews = this.props.views || Object.keys(this.availableViews)
    if (availableViews.includes(id)) this.emit('update:view', id)
    else console.warn(`Vue Cal: the \`${id}\` view is not available.`)
  }

  previous () {
    this.navigate(false)
  }

  next () {
    this.navigate(true)
  }

  navigate (forward = true) {
    let newViewDate = this.view.value.startDate
    const { cols, rows } = this.availableViews.value[this.view.value.id]

    switch (this.view.value.id) {
      case 'day':
      case 'days':
      case 'week':
        newViewDate = new Date(this.dateUtils[forward ? 'addDays' : 'subtractDays'](newViewDate, cols * rows))
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

    this.emit('update:viewDate', newViewDate)
  }

  goToToday () {
    this.updateViewDate(new Date())
  }

  updateViewDate (date) {
    if (!this.dateUtils.isSameDate(date, this.props.viewDate)) {
      date.setHours(0, 0, 0, 0)
      this.emit('update:viewDate', date)
    }
  }

  updateSelectedDate (date) {
    if (!this.dateUtils.isSameDate(date, this.props.selectedDate)) {
      date.setHours(0, 0, 0, 0)
      this.emit('update:selectedDate', date)
    }
  }
}
