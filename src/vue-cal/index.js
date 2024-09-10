import { reactive, ref } from 'vue'
import { defaults, useConfig } from './core/config'
import { useDateUtils } from './utils/date'
import { useEvents } from './core/events'
import { useView } from './core/view'
import VueCal from './components/index.vue'

let dateUtils = null

const useLocale = texts => {
  dateUtils = reactive(useDateUtils(Object.assign({}, defaults.texts, texts)))
}

const loadTexts = async locale => {
  // Vite can't resolve imports that have more than 1 variable and no extension.
  // https://vitejs.dev/guide/features.html#dynamic-import
  // So this glob is much more convenient and not penalizing as all the matches are
  // lazy-loaded by default. E.g. { comp1: () => import('path/to/comp1.vue' }
  // https://vitejs.dev/guide/features.html#glob-import
  let translations = import.meta.glob('./i18n/*.json')

  if (!translations[`./i18n/${locale}.json`]) {
    console.warn(`Vue Cal: the locale \`${locale}\` does not exist. Falling back to \`en-us\`.`)
    locale = 'en-us'
  }
  translations = await translations[`./i18n/${locale}.json`]?.() // Load this translation file.
  return Object.assign({}, defaults.texts, translations)
}

const addDatePrototypes = () => {
  dateUtils.addDatePrototypes()
}

const removeDatePrototypes = () => {
  dateUtils.removeDatePrototypes()
}

/**
 * This is the main class of the calendar, it is instantiated once from the index.vue and
 * inject-provided to all the components.
 *
 * GLOBAL IMPORTANT NOTES
 * ----------------------
 * - There is no (and there shouldn't be) any use of Date prototypes in the codebase: even if using them
 *   would simplify things a lot, the user may choose to disable them and nothing would work anymore.
 *
 * - Computed variables should only manage one thing (or a small group of vars) at a time:
 *   Every recomputing can become very expensive when handling a large amount of cells per view
 *   with a large amount of calendar events. So the more a computed is specific, the less it will have
 *   expensive impact.
 *   E.g. we definitely don't want that switching locale, or xs/sm prop would redraw the cells and
 *   recalculate all the events rendering in each cell.
 */
const _vc = class {
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
    this.emit = emit
    this.dateUtils = reactive(dateUtils)
    this.config = reactive(useConfig(this, props))
    this.eventsManager = reactive(useEvents(this))
    this.view = reactive(useView(this))
  }
}

export {
  VueCal,
  useLocale,
  addDatePrototypes,
  removeDatePrototypes,
  _vc
}
