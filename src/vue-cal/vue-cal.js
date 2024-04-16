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
    years: { cols: 5, rows: 5 }
  }
}

export default class {
  props = {}
  emit = null // The Vue emit function from the root component.
  ready = ref(false) // Is vue-cal ready.
  texts = ref({ ...defaults.texts }) // Make texts reactive before a locale is loaded.
  now = new Date()
  dateUtils = null // The date utils class.

  availableViews = ref({ ...defaults.availableViews })

  // At any time this object will be filled with current view details, visible events and selected date.
  view = computed(() => {
    let startDate = new Date(this.props.viewDate || this.now)
    startDate.setHours(0, 0, 0, 0)
    let endDate = null

    switch (this.props.view || 'week') {
      case 'day':
        endDate = new Date(startDate)
        endDate.setHours(23, 59, 59, 999)
        break
      case 'days': // Arbitrary range of 10 days.
        endDate = this.dateUtils.addDays(startDate, 10)
        endDate.setHours(23, 59, 59, 999)
        break
      case 'week':
        startDate = this.dateUtils.getPreviousFirstDayOfWeek(startDate, this.props.startWeekOnSunday)
        endDate = this.dateUtils.addDays(startDate, 6)
        endDate.setHours(23, 59, 59, 999)
        console.log(startDate, endDate)
        break
      case 'month':
        startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1, 0, 0, 0, 0)
        endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 999)
        break
      case 'year':
        startDate = new Date(startDate.getFullYear(), 0, 1, 0, 0, 0, 0)
        endDate = new Date(startDate.getFullYear() + 1, 0, 0, 23, 59, 59, 999)
        break
      case 'years':
        startDate = new Date(startDate.getFullYear(), 0, 1, 0, 0, 0, 0)
        endDate = new Date(startDate.getFullYear() + 25, 0, 0, 23, 59, 59, 999)
        break
    }

    return {
      id: this.props.view,
      title: '',
      startDate,
      endDate,
      firstCellDate: startDate,
      lastCellDate: endDate,
      selectedDate: this.props.selectedDate,
      // All the events are stored in the mutableEvents array, but subset of visible ones are passed
      // Into the current view for fast lookup and manipulation.
      events: []
    }
  })

  constructor (props, emit) {
    this.props = props
    this.emit = emit
    this.loadTexts('en')
    this.dateUtils = new DateUtils(this.texts, this.props.disableDatePrototypes)
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
    if (availableViews.includes(id))this.emit('update:view', id)
    else console.warn(`Vue Cal: the \`${id}\` view is not available.`)
  }
}
