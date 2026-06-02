/**
 * Date utils & prototypes.
 */

import { ref } from 'vue'

const PARTS_CACHE_MAX = 500
const DAY_BOUNDS_CACHE_MAX = 200
const WEEKDAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HAS_ISO_OFFSET = /(?:Z|[+-]\d{2}:?\d{2})\s*$/i
const HAS_ISO_T = /T/

export const useDateUtils = (initTexts, EnUs) => {
  let now, todayDate, todayF
  let _dateObject = {}
  let _timeObject = {}
  const texts = ref(initTexts)

  let resolvedTimeZone = ''
  let intlLocale = 'en-US'
  let invalidTzWarned = false

  const partsCache = new Map()
  const dayBoundsCache = new Map()
  const formatterCache = new Map()

  const clearCaches = () => {
    partsCache.clear()
    dayBoundsCache.clear()
    formatterCache.clear()
    _dateObject = {}
    _timeObject = {}
    todayF = null
  }

  const cacheSet = (map, key, value, max) => {
    if (map.size >= max) map.clear()
    map.set(key, value)
  }

  const hasTimeZone = () => !!resolvedTimeZone

  const resolveTimeZone = tz => {
    if (!tz) return ''
    try {
      Intl.DateTimeFormat(undefined, { timeZone: tz })
      return tz
    }
    catch {
      if (!invalidTzWarned) {
        invalidTzWarned = true
        console.warn(`Vue Cal: invalid timezone "${tz}", falling back to local.`)
      }
      return ''
    }
  }

  const setTimeZone = tz => {
    const next = resolveTimeZone(tz || '')
    if (next === resolvedTimeZone) return
    resolvedTimeZone = next
    clearCaches()
  }

  const setIntlLocale = locale => {
    const next = locale || 'en-US'
    if (next === intlLocale) return
    intlLocale = next
    formatterCache.clear()
    _dateObject = {}
  }

  const getFormatter = () => {
    const key = `${intlLocale}|${resolvedTimeZone}`
    if (!formatterCache.has(key)) {
      formatterCache.set(key, new Intl.DateTimeFormat(intlLocale, {
        timeZone: resolvedTimeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        weekday: 'short'
      }))
    }
    return formatterCache.get(key)
  }

  const _parseFormatterParts = parts => {
    let year = 0
    let month = 0
    let day = 0
    let hour = 0
    let minute = 0
    let second = 0
    let weekdayShort = 'Sun'

    for (let i = 0; i < parts.length; i++) {
      const p = parts[i]
      if (p.type === 'year') year = parseInt(p.value, 10)
      else if (p.type === 'month') month = parseInt(p.value, 10)
      else if (p.type === 'day') day = parseInt(p.value, 10)
      else if (p.type === 'hour') hour = parseInt(p.value, 10) % 24
      else if (p.type === 'minute') minute = parseInt(p.value, 10)
      else if (p.type === 'second') second = parseInt(p.value, 10)
      else if (p.type === 'weekday') weekdayShort = p.value.slice(0, 3)
    }

    const weekdaySunFirst = Math.max(0, WEEKDAY_SHORT.indexOf(weekdayShort))

    return { year, month, day, hour, minute, second, weekdaySunFirst }
  }

  const getZonedParts = date => {
    const time = date.getTime()
    const cacheKey = `${time}|${resolvedTimeZone}`
    if (partsCache.has(cacheKey)) return partsCache.get(cacheKey)

    const parts = _parseFormatterParts(getFormatter().formatToParts(date))
    cacheSet(partsCache, cacheKey, parts, PARTS_CACHE_MAX)
    return parts
  }

  const _compareWall = (a, b) => {
    if (a.year !== b.year) return a.year - b.year
    if (a.month !== b.month) return a.month - b.month
    if (a.day !== b.day) return a.day - b.day
    if (a.hour !== b.hour) return a.hour - b.hour
    if (a.minute !== b.minute) return a.minute - b.minute
    return a.second - b.second
  }

  const zonedDateToInstant = (wall, preferLater = false) => {
    if (!hasTimeZone()) {
      return new Date(wall.year, wall.month - 1, wall.day, wall.hour || 0, wall.minute || 0, wall.second || 0, wall.ms || 0)
    }

    if (!_isValidWall(wall)) return new Date(NaN)

    const target = {
      year: wall.year,
      month: wall.month,
      day: wall.day,
      hour: wall.hour || 0,
      minute: wall.minute || 0,
      second: wall.second || 0
    }

    let low = Date.UTC(wall.year, wall.month - 1, wall.day - 1, 0, 0, 0)
    let high = Date.UTC(wall.year, wall.month - 1, wall.day + 1, 23, 59, 59)

    for (let i = 0; i < 48; i++) {
      const mid = Math.floor((low + high) / 2)
      const cmp = _compareWall(getZonedParts(new Date(mid)), target)
      if (cmp === 0) return new Date(mid)
      if (cmp < 0) low = mid + 1
      else high = mid - 1
    }

    // Spring-forward gap: snap to next valid instant.
    let snap = preferLater ? low : high
    if (snap < low) snap = low
    if (snap > high) snap = high
    return new Date(snap)
  }

  const startOfZonedDay = date => {
    if (!isValid(date)) return new Date(NaN)

    if (!hasTimeZone()) {
      const d = new Date(date.valueOf())
      d.setHours(0, 0, 0, 0)
      return d
    }

    const p = getZonedParts(date)
    const cacheKey = `s|${p.year}|${p.month}|${p.day}|${resolvedTimeZone}`
    if (dayBoundsCache.has(cacheKey)) return new Date(dayBoundsCache.get(cacheKey))

    const ms = zonedDateToInstant({ year: p.year, month: p.month, day: p.day, hour: 0, minute: 0, second: 0 }).getTime()
    cacheSet(dayBoundsCache, cacheKey, ms, DAY_BOUNDS_CACHE_MAX)
    return new Date(ms)
  }

  const endOfZonedDay = date => {
    if (!isValid(date)) return new Date(NaN)

    if (!hasTimeZone()) {
      const d = new Date(date.valueOf())
      d.setHours(23, 59, 59, 999)
      return d
    }

    const p = getZonedParts(date)
    const cacheKey = `e|${p.year}|${p.month}|${p.day}|${resolvedTimeZone}`
    if (dayBoundsCache.has(cacheKey)) return new Date(dayBoundsCache.get(cacheKey))

    // Last instant still on this civil day (23:59:59.999 + 999ms can roll into the next day).
    const dayStart = startOfZonedDay(date).getTime()
    const nextDayStart = startOfZonedDay(addZonedDays(startOfZonedDay(date), 1)).getTime()
    let low = dayStart
    let high = nextDayStart

    while (high - low > 1) {
      const mid = Math.floor((low + high) / 2)
      const zp = getZonedParts(new Date(mid))
      if (zp.year === p.year && zp.month === p.month && zp.day === p.day) low = mid
      else high = mid
    }

    cacheSet(dayBoundsCache, cacheKey, low, DAY_BOUNDS_CACHE_MAX)
    return new Date(low)
  }

  const startOfZonedMonth = date => {
    if (!hasTimeZone()) {
      const d = new Date(date.valueOf())
      d.setDate(1)
      d.setHours(0, 0, 0, 0)
      return d
    }
    const p = getZonedParts(date)
    return zonedDateToInstant({ year: p.year, month: p.month, day: 1, hour: 0, minute: 0, second: 0 })
  }

  const endOfZonedMonth = date => {
    if (!hasTimeZone()) {
      const d = new Date(date.valueOf())
      d.setMonth(d.getMonth() + 1, 0)
      d.setHours(23, 59, 59, 999)
      return d
    }
    const p = getZonedParts(date)
    const lastDay = new Date(Date.UTC(p.year, p.month, 0)).getUTCDate()
    return endOfZonedDay(zonedDateToInstant({ year: p.year, month: p.month, day: lastDay, hour: 12, minute: 0, second: 0 }))
  }

  const addZonedDays = (date, days) => {
    if (!hasTimeZone()) return addDays(date, days)

    const p = getZonedParts(date)
    const cd = new Date(Date.UTC(p.year, p.month - 1, p.day + days))
    return zonedDateToInstant({
      year: cd.getUTCFullYear(),
      month: cd.getUTCMonth() + 1,
      day: cd.getUTCDate(),
      hour: 0,
      minute: 0,
      second: 0
    })
  }

  const getZonedWeekdaySunFirst = date => {
    if (!hasTimeZone()) return date.getDay()
    return getZonedParts(date).weekdaySunFirst
  }

  const getZonedWeekdayMonFirst = date => {
    const d = getZonedWeekdaySunFirst(date)
    return d === 0 ? 7 : d
  }

  const _localYmd = date => {
    const m = date.getMonth() + 1
    const d = date.getDate()
    return `${date.getFullYear()}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`
  }

  const _zonedYmd = date => {
    const p = getZonedParts(date)
    return `${p.year}-${p.month < 10 ? '0' : ''}${p.month}-${p.day < 10 ? '0' : ''}${p.day}`
  }

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
    const current = hasTimeZone() ? _zonedYmd(new Date()) : _localYmd(new Date())
    const dayKey = hasTimeZone() ? getZonedParts(new Date()).day : (new Date()).getDate()

    if (todayDate !== dayKey || todayF !== current) {
      now = new Date()
      todayDate = dayKey
      todayF = current
    }

    return todayF
  }

  // UTILITIES.
  // ====================================================================
  const addDays = (date, days) => {
    if (hasTimeZone()) return addZonedDays(date, days)
    const d = new Date(date.valueOf())
    d.setDate(d.getDate() + days)
    return d
  }

  const subtractDays = (date, days) => addDays(date, -days)

  const addHours = (date, hours) => {
    const d = new Date(date.valueOf())
    if (hasTimeZone()) d.setTime(d.getTime() + hours * 3600000)
    else d.setHours(d.getHours() + hours)
    return d
  }

  const subtractHours = (date, hours) => addHours(date, -hours)

  const addMinutes = (date, minutes) => {
    const d = new Date(date.valueOf())
    if (hasTimeZone()) d.setTime(d.getTime() + minutes * 60000)
    else d.setMinutes(d.getMinutes() + minutes)
    return d
  }

  const subtractMinutes = (date, minutes) => addMinutes(date, -minutes)

  /**
   * Adjusts the given input to the nearest interval.
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
      let totalMinutes = adjustMinutes(dateToMinutes(input))
      let hours = Math.floor(totalMinutes / 60)
      let minutes = totalMinutes % 60
      if (hasTimeZone()) {
        const p = getZonedParts(input)
        const snapped = zonedDateToInstant({ year: p.year, month: p.month, day: p.day, hour: hours, minute: minutes, second: 0 }, true)
        input.setTime(snapped.getTime())
      }
      else input.setHours(hours, minutes, 0, 0)
    }
  }

  const getWeek = (date, weekStartsOnSunday = false) => {
    const y = hasTimeZone() ? getZonedParts(date).year : date.getFullYear()
    const m = hasTimeZone() ? getZonedParts(date).month : date.getMonth() + 1
    const d = hasTimeZone() ? getZonedParts(date).day : date.getDate()
    const utc = new Date(Date.UTC(y, m - 1, d))
    const dayNum = utc.getUTCDay() || 7
    utc.setUTCDate(utc.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1))
    return Math.ceil((((utc - yearStart) / 86400000) + 1) / 7) + (weekStartsOnSunday ? 1 : 0)
  }

  const isToday = date => {
    if (!isValid(date)) return false
    if (hasTimeZone()) return _zonedYmd(date) === _todayFormatted()
    return _localYmd(date) === _todayFormatted()
  }

  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return console.warn(`Vue Cal: missing date${!date1 ? '1' : '2'} parameter for comparison with \`isSameDate(date1, date2)\`.`)
    else if (!isValid(date1)) return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${date1}\`.`)
    else if (!isValid(date2)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${date2}\`.`)

    if (hasTimeZone()) return _zonedYmd(date1) === _zonedYmd(date2)

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  /**
   * True when start and end fall on different civil days. An end at the next day's
   * midnight (exclusive) still counts as a single day — unlike end - 1ms with zoned instants.
   */
  const spansMultipleDays = (start, end) => {
    if (!isValid(start) || !isValid(end)) return false

    const startDay = startOfZonedDay(start).getTime()
    const endDay = startOfZonedDay(end).getTime()
    if (endDay <= startDay) return false

    const nextDayStart = startOfZonedDay(addDays(startOfZonedDay(start), 1)).getTime()
    if (end.getTime() <= nextDayStart) return false

    return true
  }

  /**
   * At which zoned calendar day does this range end?
   * Start of the last civil day included by a range ending at `end`.
   * When `end` is exactly at a day's midnight (exclusive end), returns the previous day —
   * same rule as spansMultipleDays / countDays.
   */
  const exclusiveEndLastDay = end => {
    if (!isValid(end)) return console.warn(`Vue Cal: invalid date provided to \`exclusiveEndLastDay(end)\`: \`${end}\`.`)

    const endMs = end.getTime()
    const endDayStart = startOfZonedDay(end).getTime()
    if (endMs <= endDayStart) return startOfZonedDay(addDays(end, -1))
    return startOfZonedDay(end)
  }

  const isInRange = (date, rangeStart, rangeEnd) => {
    if (!isValid(date)) return console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${date}\`.`)

    return date.getTime() >= rangeStart && date.getTime() <= rangeEnd
  }

  const isLeapYear = date => {
    const year = hasTimeZone() ? getZonedParts(date).year : date.getFullYear()
    return !(year % 400) || (year % 100 && !(year % 4))
  }

  const getPreviousFirstDayOfWeek = (date = null, weekStartsOnSunday) => {
    const base = (date && new Date(date.valueOf())) || new Date()
    if (!hasTimeZone()) {
      const prevFirstDayOfWeek = base
      const dayModifier = weekStartsOnSunday ? 7 : 6
      prevFirstDayOfWeek.setDate(prevFirstDayOfWeek.getDate() - (prevFirstDayOfWeek.getDay() + dayModifier) % 7)
      return prevFirstDayOfWeek
    }

    const p = getZonedParts(base)
    const cd = new Date(Date.UTC(p.year, p.month - 1, p.day))
    const dayModifier = weekStartsOnSunday ? 7 : 6
    const weekday = cd.getUTCDay()
    cd.setUTCDate(cd.getUTCDate() - (weekday + dayModifier) % 7)
    return startOfZonedDay(zonedDateToInstant({
      year: cd.getUTCFullYear(),
      month: cd.getUTCMonth() + 1,
      day: cd.getUTCDate(),
      hour: 0,
      minute: 0,
      second: 0
    }))
  }

  const _parseZoneLessString = str => {
    const normalized = String(str).replace(/-/g, '/').trim()
    const [datePart, timePart = '00:00'] = normalized.split(/\s+/)
    const [y, mo, d] = datePart.split('/').map(Number)
    const [h = 0, mi = 0, s = 0] = timePart.split(':').map(Number)
    return { year: y, month: mo, day: d, hour: h || 0, minute: mi || 0, second: s || 0 }
  }

  const _isValidWall = wall => wall && Number.isFinite(wall.year) && Number.isFinite(wall.month) && Number.isFinite(wall.day)

  const stringToDate = date => {
    if (date instanceof Date) return date

    if (typeof date === 'string' && (HAS_ISO_T.test(date) || HAS_ISO_OFFSET.test(date))) {
      const parsed = new Date(date)
      if (!isNaN(parsed.getTime())) return parsed
    }

    if (hasTimeZone()) {
      const wall = _parseZoneLessString(date.length === 10 ? `${date} 00:00` : date)
      const instant = zonedDateToInstant(wall)
      if (!isValid(instant)) return new Date(NaN)
      return instant
    }

    if (date.length === 10) date += ' 00:00'
    return new Date(date.replace(/-/g, '/')) // replace '-' with '/' for Safari.
  }

  const dateToMinutes = date => {
    if (hasTimeZone()) {
      const p = getZonedParts(date)
      return p.hour * 60 + p.minute
    }
    return date.getHours() * 60 + date.getMinutes()
  }

  const countDays = (start, end) => {
    if (hasTimeZone()) {
      if (typeof start === 'string') start = stringToDate(start)
      if (typeof end === 'string') end = stringToDate(end)
      let cursor = startOfZonedDay(start)
      const last = startOfZonedDay(end).getTime()
      let count = 0
      while (cursor.getTime() <= last) {
        count++
        cursor = addDays(cursor, 1)
      }
      return count
    }

    // replace '-' with '/' for Safari.
    if (typeof start === 'string') start = start.replace(/-/g, '/')
    if (typeof end === 'string') end = end.replace(/-/g, '/')

    start = (new Date(start)).setHours(0, 0, 0, 0)
    end = (new Date(end)).setHours(0, 0, 1, 0)

    const timezoneDiffMs = (new Date(end).getTimezoneOffset() - new Date(start).getTimezoneOffset()) * 60 * 1000
    return Math.ceil((end - start - timezoneDiffMs) / (24 * 3600 * 1000))
  }

  const datesInSameTimeStep = (date1, date2, timeStep) => {
    return Math.abs(date1.getTime() - date2.getTime()) <= timeStep * 60 * 1000
  }

  const isValid = date => (date && date instanceof Date && !isNaN(date))

  const instantFromZonedMinutes = (dayStart, minutes) => {
    if (!hasTimeZone()) {
      const d = new Date(dayStart.valueOf())
      d.setHours(0, 0, 0, 0)
      d.setMinutes(minutes)
      return d
    }
    const p = getZonedParts(dayStart)
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return zonedDateToInstant({ year: p.year, month: p.month, day: p.day, hour: h, minute: m, second: 0 }, true)
  }

  // FORMATTERS.
  // ====================================================================
  const formatDate = (date, format = 'YYYY-MM-DD', txts = null) => {
    if (!txts) txts = texts.value
    if (!format) format = 'YYYY-MM-DD' // Allows passing null for default format.
    if (format === 'YYYY-MM-DD') return formatDateLite(date)

    // Reinit the date and time object on each function call.
    _dateObject = {}
    _timeObject = {}

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

  const formatDateLite = date => {
    if (hasTimeZone()) return _zonedYmd(date)
    const m = date.getMonth() + 1
    const d = date.getDate()
    return `${date.getFullYear()}-${m < 10 ? '0' : ''}${m}-${d < 10 ? '0' : ''}${d}`
  }

  const formatTime = (date, format = 'HH:mm', txts = null, round = false) => {
    let shouldRound = false
    if (round) {
      const p = hasTimeZone() ? getZonedParts(date) : null
      const h = p ? p.hour : date.getHours()
      const m = p ? p.minute : date.getMinutes()
      const s = p ? p.second : date.getSeconds()
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

    return shouldRound ? formatted.replace('23:59', '24:00') : formatted
  }

  const formatTimeLite = date => {
    if (hasTimeZone()) {
      const p = getZonedParts(date)
      return `${(p.hour < 10 ? '0' : '') + p.hour}:${(p.minute < 10 ? '0' : '') + p.minute}`
    }
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

    let YYYY, M, D, dayNumber

    if (hasTimeZone()) {
      const p = getZonedParts(date)
      YYYY = p.year
      M = p.month
      D = p.day
      dayNumber = (p.weekdaySunFirst - 1 + 7) % 7
    }
    else {
      YYYY = date.getFullYear()
      M = date.getMonth() + 1
      D = date.getDate()
      dayNumber = (date.getDay() - 1 + 7) % 7
    }

    _dateObject = {
      YYYY,
      YY: () => YYYY.toString().substring(2),
      M,
      MM: () => M.toString().padStart(2, 0),
      MMM: () => txts.months[M - 1].substring(0, 3),
      MMMM: () => txts.months[M - 1],
      MMMMG: () => (txts.monthsGenitive || txts.months)[M - 1],
      D,
      DD: () => D.toString().padStart(2, 0),
      S: () => _nth(D),
      d: dayNumber + 1,
      dd: () => txts.weekDaysShort.length ? txts.weekDaysShort[dayNumber] : txts.weekDays[dayNumber][0],
      ddd: () => txts.weekDaysShort.length ? txts.weekDaysShort[dayNumber] : txts.weekDays[dayNumber].substr(0, 3),
      dddd: () => txts.weekDays[dayNumber]
    }

    return _dateObject
  }

  const _hydrateTimeObject = (date, txts) => {
    if (_timeObject.am) return _timeObject

    let H, m, s
    if (date instanceof Date) {
      if (hasTimeZone()) {
        const p = getZonedParts(date)
        H = p.hour
        m = p.minute
        s = p.second
      }
      else {
        H = date.getHours()
        m = date.getMinutes()
        s = date.getSeconds()
      }
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
    setTimeZone,
    setIntlLocale,
    hasTimeZone,
    getZonedParts,
    zonedDateToInstant,
    startOfZonedDay,
    endOfZonedDay,
    startOfZonedMonth,
    endOfZonedMonth,
    addZonedDays,
    getZonedWeekdaySunFirst,
    getZonedWeekdayMonFirst,
    instantFromZonedMinutes,
    clearCaches,
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
    spansMultipleDays,
    exclusiveEndLastDay,
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
