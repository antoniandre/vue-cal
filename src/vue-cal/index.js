import { globalState } from './core'
import { defaults } from './core/config'
import { useDateUtils } from './utils/date'
import VueCal from './components/index.vue'

const useLocale = texts => {
  globalState.texts = Object.assign({}, defaults.texts, texts)
  globalState.dateUtils.updateTexts(globalState.texts)
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
  formatTimeLite,
  formatMinutes
} = globalState.dateUtils

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
  formatTimeLite,
  formatMinutes
}
