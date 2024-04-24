import { ref, reactive, computed } from 'vue'
import { defaults, useConfig } from './config'
import { useView } from './view'
import DateUtils from '../utils/date'

/**
 * This is the main class of the calendar, it is instantiated once from the index.vue and
 * inject-provided to all the components.
 * There is no use of Date prototypes in the codebase, because the user may choose to disable them
 * (using them would make things a lot simpler).
 */
export default class {
  #props = {}
  emit = null // The Vue emit function from the root component.
  config = null
  texts = ref({ ...defaults.texts }) // Make texts reactive before a locale is loaded.
  now = new Date()
  // The date utils class.
  // A class is needed in order to access the user locale in all the methods, and independently of
  // other potential Vue Cal instances on the same page.
  dateUtils = null

  // At any time this object will be filled with current view details and visible events.
  view = null

  constructor (props, emit) {
    this.#props = props
    this.emit = emit
    this.dateUtils = new DateUtils(this.texts, this.#props.datePrototypes)
    this.config = useConfig(props)
    this.view = useView(this)

    this.loadTexts(props.locale || 'en-us')
  }

  async loadTexts (locale) {
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
    this.texts.value = Object.assign({}, defaults.texts, translations)
  }

  switchView (id) {
    const availableViews = this.#props.views || Object.keys(this.config.availableViews)
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
    const { cols, rows } = this.config.availableViews[this.view.value.id]

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
    if (!this.dateUtils.isSameDate(date, this.#props.viewDate)) {
      date.setHours(0, 0, 0, 0)
      this.emit('update:viewDate', date)
    }
  }

  updateSelectedDate (date) {
    if (!this.dateUtils.isSameDate(date, this.#props.selectedDate)) {
      date.setHours(0, 0, 0, 0)
      this.emit('update:selectedDate', date)
    }
  }
}
