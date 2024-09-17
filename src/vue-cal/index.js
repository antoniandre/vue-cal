import { state } from './core'
import { defaults } from './core/config'
import { useDateUtils } from './utils/date'
import VueCal from './components/index.vue'

state.dateUtils = useDateUtils(defaults.texts)

const useLocale = texts => {
  state.texts = Object.assign(defaults.texts, texts)
  state.dateUtils.updateTexts(state.texts)
}

const {
  addDatePrototypes,
  removeDatePrototypes,
  updateTexts,
  addDays,
  subtractDays,
  addHours,
  subtractHours,
  addMinutes,
  subtractMinutes,
  getWeek,
  isToday,
  isSameDate,
  isInRange,
  isLeapYear,
  getPreviousFirstDayOfWeek,
  stringToDate,
  dateToMinutes,
  countDays,
  datesInSameTimeStep,
  isValid,
  formatDate,
  formatDateLite,
  formatTime,
  formatTimeLite
} = state.dateUtils

export {
  VueCal,
  useLocale,
  addDatePrototypes,
  removeDatePrototypes,
  updateTexts,
  addDays,
  subtractDays,
  addHours,
  subtractHours,
  addMinutes,
  subtractMinutes,
  getWeek,
  isToday,
  isSameDate,
  isInRange,
  isLeapYear,
  getPreviousFirstDayOfWeek,
  stringToDate,
  dateToMinutes,
  countDays,
  datesInSameTimeStep,
  isValid as isValidDate,
  formatDate,
  formatDateLite,
  formatTime,
  formatTimeLite
}
