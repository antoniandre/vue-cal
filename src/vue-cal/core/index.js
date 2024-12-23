import { reactive } from 'vue'
import { defaults, useConfig } from './config'
import { useDateUtils } from '../utils/date'
import { useEvents } from './events'
import { useView } from './view'

// Shared global reactive store: common to all the VueCal instances.
// The global store is also used when the user wants to use Date prototypes with localized texts
// before or without the Vue Cal component.
export const globalState = reactive({
  texts: { ...defaults.texts }, // Make texts reactive before a locale is loaded.
  dateUtils: useDateUtils(defaults.texts) // Some Date utils functions need localized texts.
})

/**
 * This is the main composable of the calendar - the heart :)
 * It is used one single time, from the index.vue and it's inject-provided to all the components.
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
 *
 * @param {object} props The Vue props definition from the root VueCal component (index.vue).
 * @param {function} emit The Vue emit function from the root VueCal component (index.vue).
 */
export const useVueCal = (props, emit, attrs, vuecalEl) => {
  // This reactive store is the one and only source of truth.
  const state = reactive({
    emit,
    texts: { ...globalState.texts }, // Make texts reactive before a locale is loaded.
    // The date utils composable.
    // A class/composable is needed in order to access the user locale in all the methods, and
    // independently of other potential Vue Cal instances on the same page.
    dateUtils: { ...globalState.dateUtils },
    now: new Date(),
    config: {},
    eventsManager: {},
    view: {} // At any time this object will be filled with current view details and visible events.
  })

  state.dateUtils = useDateUtils(Object.assign(defaults.texts, state.texts))
  state.config = useConfig(state, props, attrs)
  state.eventsManager = useEvents(state)
  state.view = useView(state, vuecalEl)

  return state
}
