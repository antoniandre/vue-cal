import { ref, computed } from 'vue'

const textsDefaults = {
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
}

export default class {
  props = {}
  emit = null // The Vue emit function from the root component.
  ready = ref(false) // Is vue-cal ready.
  texts = ref({ ... textsDefaults }) // Make texts reactive before a locale is loaded.

  availableViews = {
    years: { cols: 5, rows: 5 },
    year: { cols: 3, rows: 4 },
    month: { cols: 7, rows: 6 },
    week: { cols: 7, rows: 1 },
    days: { cols: 5, rows: 1 },
    day: { cols: 1, rows: 1 }
  }

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
    this.texts.value = Object.assign({}, textsDefaults, translations)
  }

  switchView (id) {
    this.emit('update:activeView', id)
  }
}
