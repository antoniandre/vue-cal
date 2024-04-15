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
  availableViews = ref({ ...defaults.availableViews })

  // At any time this object will be filled with current view details, visible events and selected date.
  view = computed(() => ({
    id: this.props.activeView,
    title: '',
    startDate: null,
    endDate: null,
    firstCellDate: null,
    lastCellDate: null,
    selectedDate: null,
    // All the events are stored in the mutableEvents array, but subset of visible ones are passed
    // Into the current view for fast lookup and manipulation.
    events: []
  }))

  constructor (props, emit) {
    this.props = props
    this.emit = emit
    this.loadTexts('en')
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
    else console.warn(`Vue Cal: the view \`${id}\` is not available.`)
  }
}
