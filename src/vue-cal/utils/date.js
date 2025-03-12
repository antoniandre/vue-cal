/**
 * Date utils & prototypes.
 */

import { ref } from 'vue'

export const useDateUtils = (initTexts, EnUs) => {
  let now, todayDate, todayF
  let _dateObject = {}
  let _timeObject = {}
  const texts = ref(initTexts)

  const addDatePrototypes = () => {
    if (!texts.value.today) texts.value = EnUs // If no texts, use EnUs.

    /* eslint-disable no-extend-native */
    Date.prototype.addDays = function (days) { return addDays(this, days || 0) }
    Date.prototype.subtractDays = function (days) { return subtractDays(this, days || 0) }
    Date.prototype.addHours = function (hours) { return addHours(this, hours || 0) }
    Date.prototype.subtractHours = function (hours) { return subtractHours(this, hours || 0) }
    Date.prototype.addMinutes = function (minutes) { return addMinutes(this, minutes || 0) }
    Date.prototype.subtractMinutes = function (minutes) { return subtractMinutes(this, minutes || 0) }
    Date.prototype.getWeek = function () { return getWeek(this) }
    Date.prototype.isToday = function () { return isToday(this) }
    Date.prototype.isLeapYear = function () { return isLeapYear(this) }
    Date.prototype.format = function (format = 'YYYY-MM-DD') { return formatDate(this, format) }
    Date.prototype.formatTime = function (format = 'HH:mm') { return formatTime(this, format) }
    /* eslint-enable no-extend-native */
  }

  const removeDatePrototypes = () => {
    delete Date.prototype.addDays
    delete Date.prototype.subtractDays
    delete Date.prototype.addHours
    delete Date.prototype.subtractHours
    delete Date.prototype.addMinutes
    delete Date.prototype.subtractMinutes
    delete Date.prototype.getWeek
    delete Date.prototype.isToday
    delete Date.prototype.isLeapYear
    delete Date.prototype.format
    delete Date.prototype.formatTime
  }

  const updateTexts = newTexts => {
    texts.value = newTexts
    // If the prototypes are already added, override them.
    // Otherwise, the user did not use the `useDatePrototypes` option.
    if (Date.prototype.subtractDays) addDatePrototypes()
  }

  // Cache Today's date (to a maximum) for better isToday() performances. Formatted without leading 0.
  // We still need to update Today's date when Today changes without page refresh.
  const _todayFormatted = () => {
    if (todayDate !== (new Date()).getDate()) {
      now = new Date()
      todayDate = now.getDate()
      todayF = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
    }

    return todayF
  }

  // UTILITIES.
  // ====================================================================
  const addDays = (date, days) => {
    const d = new Date(date.valueOf())
    d.setDate(d.getDate() + days)
    return d
  }

  const subtractDays = (date, days) => {
    const d = new Date(date.valueOf())
    d.setDate(d.getDate() - days)
    return d
  }

  const addHours = (date, hours) => {
    const d = new Date(date.valueOf())
    d.setHours(d.getHours() + hours)
    return d
  }

  const subtractHours = (date, hours) => {
    const d = new Date(date.valueOf())
    d.setHours(d.getHours() - hours)
    return d
  }

  const addMinutes = (date, minutes) => {
    const d = new Date(date.valueOf())
    d.setMinutes(d.getMinutes() + minutes)
    return d
  }

  const subtractMinutes = (date, minutes) => {
    const d = new Date(date.valueOf())
    d.setMinutes(d.getMinutes() - minutes)
    return d
  }

  /**
   * Adjusts the given input to the nearest interval.
   *
   * @param {number|Date} input - The input to be adjusted. Can be a number representing minutes or a Date object.
   * @param {number} interval - The interval to snap to.
   * @returns {number|void} - Returns the adjusted minutes if the input is a number. If the input is a Date object, it modifies the Date object in place.
   */
  const snapToInterval = (input, interval) => {
    const adjustMinutes = minutes => {
      const remainder = minutes % interval
      if (remainder !== 0) {
        minutes += remainder >= interval / 2 ? interval - remainder : -remainder
      }
      return minutes
    }

    if (typeof input === 'number') return adjustMinutes(input)
    else if (input instanceof Date) {
      let minutes = adjustMinutes(input.getMinutes())
      if (minutes >= 60) {
        input.setHours(input.getHours() + 1)
        minutes = 0
      }
      input.setMinutes(minutes, 0, 0)
    }
  }

  /**
   * Get the week number for the given date.
   * Note: If starting the week on Sunday, 1 is added to the result because it's the first day
   * of the next week - compared to start from Monday where the Sunday is in the past week.
   *
   * @param {Date} date the date to know the week for.
   * @param {Boolean} weekStartsOnSunday if the week starts on Sunday. Default Monday.
   * @returns {Number} the week number ranging from 1 to 53.
   */
  const getWeek = (date, weekStartsOnSunday = false) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7) + (weekStartsOnSunday ? 1 : 0)
  }

  const isToday = date => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` === _todayFormatted()
  }

  /**
   * Compares 2 dates and returns true if they are the same day (does not care about the time).
   *
   * @param {Date} date1
   * @param {Date} date2
   * @returns {Boolean}
   */
  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return console.warn(`Vue Cal: missing date${!date1 ? '1' : '2'} parameter for comparison with \`isSameDate(date1, date2)\`.`)
    else if (!isValid(date1)) return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${date1}\`.`)
    else if (!isValid(date2)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${date2}\`.`)

    // Most efficient way to compare dates without time.
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const isInRange = (date, rangeStart, rangeEnd) => {
    if (!isValid(date)) return console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${date}\`.`)

    return date.getTime() >= rangeStart && date.getTime() <= rangeEnd
  }

  const isLeapYear = date => {
    const year = date.getFullYear()
    return !(year % 400) || (year % 100 && !(year % 4))
  }

  // Returns the last Monday or Sunday (depending on weekStartsOnSunday) before a date or that date if it is.
  // If no date is given, today is used.
  const getPreviousFirstDayOfWeek = (date = null, weekStartsOnSunday) => {
    const prevFirstDayOfWeek = (date && new Date(date.valueOf())) || new Date()
    const dayModifier = weekStartsOnSunday ? 7 : 6
    prevFirstDayOfWeek.setDate(prevFirstDayOfWeek.getDate() - (prevFirstDayOfWeek.getDay() + dayModifier) % 7)
    return prevFirstDayOfWeek
  }

  /**
   * Converts a string to a Javascript Date object. If a Date object is passed, return it as is.
   *
   * @param {String | Date} date the string to convert to Date.
   * @return {Date} the equivalent Javascript Date object.
   */
  const stringToDate = date => {
    if (date instanceof Date) return date
    // Regexp way is less performant: https://jsperf.com/string-to-date-regexp-vs-new-date
    // const [, y, m, d, h = 0, min = 0] = date.match(/(\d{4})-(\d{2})-(\d{2})(?: (\d{2}):(\d{2}))?/)
    // return new Date(y, parseInt(m) - 1, d, h, min)

    if (date.length === 10) date += ' 00:00'
    return new Date(date.replace(/-/g, '/')) // replace '-' with '/' for Safari.
  }

  /**
   * Simply takes a Date and returns the associated time in minutes (sum of hours + minutes).
   *
   * @param {Date} date the JavaScript Date to extract minutes from.
   * @return {Number} the number of minutes (total of hours plus minutes).
   */
  const dateToMinutes = date => date.getHours() * 60 + date.getMinutes()

  /**
   * Count the number of days this date range spans onto.
   * E.g. countDays(2019-11-02 18:00, 2019-11-03 02:00) = 2
   *
   * @param {String | Date} start the start date
   * @param {String | Date} end the end date
   * @return {Integer} The number of days this date range involves
   */
  const countDays = (start, end) => {
    // replace '-' with '/' for Safari.
    if (typeof start === 'string') start = start.replace(/-/g, '/')
    if (typeof end === 'string') end = end.replace(/-/g, '/')

    // Set start & end at midnight then compare the delta. Don't modify the original dates.
    start = (new Date(start)).setHours(0, 0, 0, 0)
    // Set end at midnight plus 1 sec, so Math.ceil will round it up to a full day.
    end = (new Date(end)).setHours(0, 0, 1, 0)

    // Remove the potential daylight saving delta.
    const timezoneDiffMs = (new Date(end).getTimezoneOffset() - new Date(start).getTimezoneOffset()) * 60 * 1000
    return Math.ceil((end - start - timezoneDiffMs) / (24 * 3600 * 1000))
  }

  /**
   * Take 2 dates and check if within the same time step (useful in overlapping events).
   *
   * @return {Boolean} `true` if their time is included in the same time step,
   *                   this means these 2 dates are very close.
   */
  const datesInSameTimeStep = (date1, date2, timeStep) => {
    return Math.abs(date1.getTime() - date2.getTime()) <= timeStep * 60 * 1000
  }

  const isValid = date => (date && date instanceof Date && !isNaN(date))
  // ====================================================================

  // FORMATTERS.
  // ====================================================================
  /**
   * Formats a date/time to the given format and returns the formatted string.
   *
   * @param {Date} date a JavaScript Date object to format.
   * @param {String} format the wanted format.
   * @param {Object} texts Optional: the localized texts object to override the vue-cal one in this.#texts.
   *                       This becomes useful when showing multiple instances with different languages,
   *                       like in the documentation page.
   * @return {String} the formatted date.
   */
  const formatDate = (date, format = 'YYYY-MM-DD', txts = null) => {
    if (!txts) txts = texts.value
    if (!format) format = 'YYYY-MM-DD' // Allows passing null for default format.
    if (format === 'YYYY-MM-DD') return formatDateLite(date)

    // Reinit the date and time object on each function call.
    _dateObject = {}
    _timeObject = {}

    // Each keyword is a function to load the dateObject or timeObject on demand: no wasted resource.
    const dateObj = {
      YYYY: () => _hydrateDateObject(date, txts).YYYY,
      YY: () => _hydrateDateObject(date, txts).YY(),
      M: () => _hydrateDateObject(date, txts).M,
      MM: () => _hydrateDateObject(date, txts).MM(),
      MMM: () => _hydrateDateObject(date, txts).MMM(),
      MMMM: () => _hydrateDateObject(date, txts).MMMM(),
      MMMMG: () => _hydrateDateObject(date, txts).MMMMG(),
      D: () => _hydrateDateObject(date, txts).D,
      DD: () => _hydrateDateObject(date, txts).DD(),
      S: () => _hydrateDateObject(date, txts).S(),
      d: () => _hydrateDateObject(date, txts).d,
      dd: () => _hydrateDateObject(date, txts).dd(),
      ddd: () => _hydrateDateObject(date, txts).ddd(),
      dddd: () => _hydrateDateObject(date, txts).dddd(),
      HH: () => _hydrateTimeObject(date, txts).HH,
      H: () => _hydrateTimeObject(date, txts).H,
      hh: () => _hydrateTimeObject(date, txts).hh,
      h: () => _hydrateTimeObject(date, txts).h,
      am: () => _hydrateTimeObject(date, txts).am,
      AM: () => _hydrateTimeObject(date, txts).AM,
      mm: () => _hydrateTimeObject(date, txts).mm,
      m: () => _hydrateTimeObject(date, txts).m,
      s: () => _hydrateTimeObject(date, txts).s
    }

    return format.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (m, contents) => {
      const result = dateObj[contents.replace(/\{|\}/g, '')]
      return result !== undefined ? result() : contents
    })
  }

  // More performant function to convert a Date to `YYYY-MM-DD` formatted string only.
  const formatDateLite = date => {
    const m = date.getMonth() + 1
    const d = date.getDate()
    return `${date.getFullYear()}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`
  }

  /**
   * Formats a time (from Date or number of mins) to the given format and returns the formatted string.
   *
   * @param {Date | Number} date a JavaScript Date object or a time in minutes.
   * @param {String} format the wanted format.
   * @param {Object} texts Optional: the localized texts object to override the vue-cal one in this.#texts.
   *                       This becomes useful when showing multiple instances with different languages,
   *                       like in the documentation page.
   * @param {Boolean} round if time is 23:59:59, rounds up to 24:00 for formatting only.
   * @return {String} the formatted time.
   */
  const formatTime = (date, format = 'HH:mm', txts = null, round = false) => {
    let shouldRound = false
    if (round) {
      const [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()]
      if ((h + m + s) === (23 + 59 + 59)) shouldRound = true
    }

    if (date instanceof Date && format === 'HH:mm') return shouldRound ? '24:00' : formatTimeLite(date)

    _timeObject = {} // Reinit the time object on each function call.
    if (!txts) txts = texts.value
    const timeObj = _hydrateTimeObject(date, txts)

    const formatted = format.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (m, contents) => {
      const result = timeObj[contents.replace(/\{|\}/g, '')]
      return result !== undefined ? result : contents
    })

    // Round 23:59:59 to 24:00. For 12-hour format there is nothing to replace: as both are 12am.
    // Also don't return `24:00` straight away as the user format may be different.
    return shouldRound ? formatted.replace('23:59', '24:00') : formatted
  }

  /**
   * Formats a time to 'HH:mm' from a Date and returns the formatted string.
   *
   * @param {Date} date a JavaScript Date object to format.
   * @return {String} the formatted time.
   */
  const formatTimeLite = date => {
    const h = date.getHours()
    const m = date.getMinutes()
    return `${(h < 10 ? '0' : '') + h}:${(m < 10 ? '0' : '') + m}`
  }

  const formatMinutes = minutes => {
    const h = Math.floor(minutes / 60).toString().padStart(2, 0)
    const m = (minutes % 60).toString().padStart(2, 0)
    return `${h}:${m}`
  }

  const _nth = d => {
    if (d > 3 && d < 21) return 'th'
    switch (d % 10) {
      case 1: return 'st'
      case 2: return 'nd'
      case 3: return 'rd'
      default: return 'th'
    }
  }

  const _hydrateDateObject = (date, txts) => {
    if (_dateObject.D) return _dateObject

    const YYYY = date.getFullYear()
    const M = date.getMonth() + 1
    const D = date.getDate()
    const day = date.getDay() // Day of the week.
    const dayNumber = (day - 1 + 7) % 7 // Day of the week. 0 to 6 with 6 = Sunday.
    // Some of this props are functions, to only calculate on demand.
    _dateObject = {
      // Year.
      YYYY, // 2024.
      YY: () => YYYY.toString().substring(2), // 24.

      // Month.
      M, // 1 to 12.
      MM: () => M.toString().padStart(2, 0), // 01 to 12.
      MMM: () => txts.months[M - 1].substring(0, 3), // Jan to Dec.
      MMMM: () => txts.months[M - 1], // January to December.
      MMMMG: () => (txts.monthsGenitive || txts.months)[M - 1], // January to December in genitive form (Greek...)

      // Day.
      D, // 1 to 31.
      DD: () => D.toString().padStart(2, 0), // 01 to 31.
      S: () => _nth(D), // st, nd, rd, th.

      // Day of the week.
      d: dayNumber + 1, // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => txts.weekDaysShort.length ? txts.weekDaysShort[dayNumber] : txts.weekDays[dayNumber][0], // M to S.
      ddd: () => txts.weekDaysShort.length ? txts.weekDaysShort[dayNumber] : txts.weekDays[dayNumber].substr(0, 3), // Mon to Sun.
      dddd: () => txts.weekDays[dayNumber] // Monday to Sunday.
    }

    return _dateObject
  }

  const _hydrateTimeObject = (date, txts) => {
    if (_timeObject.am) return _timeObject

    let H, m, s
    if (date instanceof Date) {
      H = date.getHours()
      m = date.getMinutes()
      s = date.getSeconds()
    }
    else {
      H = Math.floor(date / 60)
      m = Math.floor(date % 60)
    }

    const h = H % 12 ? H % 12 : 12
    const am = (txts || { am: 'am', pm: 'pm' })[H === 24 || H < 12 ? 'am' : 'pm']
    _timeObject = {
      H,
      h,
      HH: H.toString().padStart(2, 0),
      hh: h.toString().padStart(2, 0),
      am,
      AM: am.toUpperCase(),
      m,
      mm: m.toString().padStart(2, 0),
      s
    }

    return _timeObject
  }
  // ====================================================================

  return {
    addDatePrototypes,
    removeDatePrototypes,
    updateTexts,
    addDays,
    subtractDays,
    addHours,
    subtractHours,
    addMinutes,
    subtractMinutes,
    snapToInterval,
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
  }
}
