import { state } from './core'
import { defaults } from './core/config'
import { useDateUtils } from './utils/date'
import VueCal from './components/index.vue'

const useLocale = texts => {
  state.texts = Object.assign(defaults.texts, texts)
  state.dateUtils = useDateUtils(state.texts)
}

const addDatePrototypes = () => {
  state.dateUtils.addDatePrototypes()
}

const removeDatePrototypes = () => {
  state.dateUtils.removeDatePrototypes()
}

export {
  VueCal,
  useLocale,
  addDatePrototypes,
  removeDatePrototypes
}
