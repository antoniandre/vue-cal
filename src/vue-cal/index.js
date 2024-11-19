import { globalState } from './core'
import { defaults } from './core/config'
import VueCal from './components/index.vue'

const useLocale = texts => {
  globalState.texts = { ...defaults.texts, ...texts }
  globalState.dateUtils.updateTexts(globalState.texts)
}

// Export the required functions directly from `globalState.dateUtils`
export const {
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
  isValid: isValidDate,
  formatDate,
  formatDateLite,
  formatTime,
  formatTimeLite,
  formatMinutes
} = globalState.dateUtils

export { VueCal, useLocale }
