// Cache Today's date (to a maximum) for better isDateToday() performances. Formatted without leading 0.
// We still need to update Today's date when Today changes without page refresh.
let now, todayDate, todayF
const todayFormatted = () => {
  if (todayDate !== (new Date()).getDate()) {
    now = new Date()
    todayDate = now.getDate()
    todayF = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
  }

  return todayF
}

// eslint-disable-next-line
Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

// eslint-disable-next-line
Date.prototype.subtractDays = function (days) {
  let date = new Date(this.valueOf())
  date.setDate(date.getDate() - days)
  return date
}

// eslint-disable-next-line
Date.prototype.getWeek = function () {
  let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
}

export const isDateToday = date => {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` === todayFormatted()
}

// Returns today if it's FirstDayOfWeek (Monday or Sunday) or previous FirstDayOfWeek otherwise.
export const getPreviousFirstDayOfWeek = (date = null, weekStartsOnSunday) => {
  let prevFirstDayOfWeek = (date && new Date(date.valueOf())) || new Date()
  let dayModifier = weekStartsOnSunday ? 7 : 6
  prevFirstDayOfWeek.setDate(prevFirstDayOfWeek.getDate() - (prevFirstDayOfWeek.getDay() + dayModifier) % 7)
  return prevFirstDayOfWeek
}

const nth = d => {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}

// Time in minutes.
export const formatTime = (time, format = 'HH:mm', texts) => {
  const H = Math.floor(time / 60)
  const h = H % 12 ? H % 12 : 12
  const am = (texts || { am: 'am', pm: 'pm' })[H < 12 ? 'am' : 'pm']
  const m = Math.floor(time % 60)
  const timeObj = {
    H,
    h,
    HH: (H < 10 ? '0' : '') + H,
    hh: (h < 10 ? '0' : '') + h,
    am,
    AM: am.toUpperCase(),
    m,
    mm: (m < 10 ? '0' : '') + m
  }

  return format.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (m, contents) => timeObj[contents.replace(/\{|\}/g, '')])
}

export const formatDate = (date, format = 'yyyy-mm-dd', texts) => {
  if (!format) format = 'yyyy-mm-dd' // Allows passing null for default format.

  const d = date.getDate()
  const m = date.getMonth() + 1
  const dateObj = {
    D: date.getDay(), // 0 to 6.
    DD: texts.weekDays[(date.getDay() - 1 + 7) % 7][0], // M to S.
    DDD: texts.weekDays[(date.getDay() - 1 + 7) % 7].substr(0, 3), // Mon to Sun.
    DDDD: texts.weekDays[(date.getDay() - 1 + 7) % 7], // Monday to Sunday.
    d, // 1 to 31.
    dd: (d < 10 ? '0' : '') + d, // 01 to 31.
    S: nth(d), // st, nd, rd, th.
    m, // 1 to 12.
    mm: (m < 10 ? '0' : '') + m, // 01 to 12.
    mmm: texts.months[m - 1].substr(0, 3), // Jan to Dec.
    mmmm: texts.months[m - 1], // January to December.
    mmmmG: (texts.monthsGenitive || texts.months)[m - 1], // January to December in genitive form (Greek...)
    yyyy: date.getFullYear(), // 2018.
    yy: date.getFullYear().toString().substr(2, 4) // 18.
  }

  return format.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (m, contents) => {
    const result = dateObj[contents.replace(/\{|\}/g, '')]
    return result !== undefined ? result : contents
  })
}

export const stringToDate = string => {
  const [, y, m, d, h = 0, min = 0] = string.match(/(\d{4})-(\d{2})-(\d{2})(?: (\d{2}):(\d{2}))?/)
  return new Date(y, parseInt(m) - 1, d, h, min)
}

/**
 * Count the number of days this date range spans onto.
 * E.g. countDays(2019-11-02 18:00, 2019-11-03 02:00) = 2
 *
 * @param {String, Date} start the start date
 * @param {String, Date} end the end date
 * @return {Integer} The number of days this date range involves
 */
export const countDays = (start, end) => {
  // replace '-' with '/' for Safari.
  if (typeof start === 'string') start = start.replace(/-/g, '/')
  if (typeof end === 'string') end = end.replace(/-/g, '/')

  // set start & end at midnight then compare the delta.
  start = (new Date(start)).setHours(0, 0, 0)
  // set end at midnight plus 1 min, so Math.ceil will round it up to a full day.
  end = (new Date(end)).setHours(0, 0, 1)

  // Remove the potential daylight saving delta.
  let timezoneDiffMs = (new Date(end).getTimezoneOffset() - new Date(start).getTimezoneOffset()) * 60 * 1000
  return Math.ceil((end - start - timezoneDiffMs) / (24 * 3600 * 1000))
}
