import { ref, computed } from 'vue'

// export const useView = vuecal => {
//   const now = new Date()
//   const { config, config: { props }, texts, dateUtils } = vuecal

//   return computed(() => {
//     const { availableViews, defaultView } = config
//     let view = 'week'

//     const { sm, xs } = config
//     let startDate = new Date(props.viewDate || now)
//     startDate.setHours(0, 0, 0, 0)
//     let endDate = null
//     let firstCellDate = null
//     let lastCellDate = null
//     let title = ''
//     const cellsCount = availableViews[view].cols * availableViews[view].rows
//     // For some locales it doesn't make sense to truncate texts.
//     let { dateFormat, truncations } = texts.value

//     switch (view) {
//       case 'day': {
//         endDate = new Date(startDate)
//         endDate.setHours(23, 59, 59, 999)

//         // Truncate long week day and month texts to 3 letters if xs or sm.
//         if ((xs || sm) && truncations !== false) {
//           // Note: when replacing dddd with ddd, the weekDaysShort will be used in formatDate() if defined.
//           dateFormat = dateFormat.replace(/dddd|MMMM/g, m0 => m0.substring(0, 3))
//         }
//         title = dateUtils.formatDate(startDate, dateFormat)
//         break
//       }
//       case 'days':
//         endDate = dateUtils.addDays(startDate, cellsCount - 1)
//         endDate.setHours(23, 59, 59, 999)

//         const startMonth = startDate.getMonth()
//         const endMonth = endDate.getMonth()
//         let format = dateFormat.replace(/(\s|^)[^a-zA-Z]*?d{2,4}[^a-zA-Z]*?(\s|$)/, '') // Remove week day.
//         // Always shorten month if the locale doesn't forbid it.
//         if (truncations !== false) format = format.replace('MMMM', 'MMM')
//         const startDateFormatted = dateUtils.formatDate(startDate, format)
//         const endDateFormatted = dateUtils.formatDate(endDate, format)

//         title = `${startDateFormatted} - ${endDateFormatted}`
//         break
//       case 'week': {
//         startDate = dateUtils.getPreviousFirstDayOfWeek(startDate, props.startWeekOnSunday)
//         endDate = dateUtils.addDays(startDate, cellsCount - 1)
//         endDate.setHours(23, 59, 59, 999)

//         const weekNumber = dateUtils.getWeek(startDate)
//         // Shorten month if xs and the locale doesn't forbid it.
//         let format = `${xs && truncations !== false ? 'MMM' : 'MMMM'} YYYY`
//         title = dateUtils.formatDate(startDate, format) + ` <small>${texts.value.week} ${weekNumber}</small>`
//         break
//       }
//       case 'month': {
//         startDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1, 0, 0, 0, 0)
//         let dayOfWeek = startDate.getDay()
//         dayOfWeek = (!dayOfWeek ? 7 : dayOfWeek) - 1 // 0-6 starting from Monday.
//         firstCellDate = dateUtils.subtractDays(startDate, dayOfWeek)

//         endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0, 23, 59, 59, 999)
//         lastCellDate = dateUtils.addDays(firstCellDate, cellsCount - 1)
//         lastCellDate.setHours(23, 59, 59, 999)

//         // Shorten month if xs and the locale doesn't forbid it.
//         let format = `${xs && truncations !== false ? 'MMM' : 'MMMM'} YYYY`
//         title = dateUtils.formatDate(startDate, format)
//         break
//       }
//       case 'year':
//         startDate = new Date(startDate.getFullYear(), 0, 1, 0, 0, 0, 0)
//         endDate = new Date(startDate.getFullYear() + 1, 0, 0, 23, 59, 59, 999)
//         title = startDate.getFullYear()
//         break
//       case 'years':
//         // The modulo is only here to always cut off at the same years regardless of the current year.
//         // E.g. always [1975-1999], [2000-2024], [2025-2099] for the default 5*5 grid.
//         startDate = new Date(startDate.getFullYear() - (startDate.getFullYear() % cellsCount), 0, 1, 0, 0, 0, 0)
//         endDate = new Date(startDate.getFullYear() + cellsCount, 0, 0, 23, 59, 59, 999)
//         title = `${startDate.getFullYear()} - ${endDate.getFullYear()}`
//         break
//     }

//     // ! \ IMPORTANT NOTE:
//     // If the selectedDate prop would be added to the view, any click on any cell
//     // (triggering an emit of the selectedDate), would trigger a re-rendering of all the
//     // cells of the view.
//     return {
//       id: view,
//       title,
//       startDate,
//       endDate,
//       firstCellDate: firstCellDate || new Date(startDate),
//       lastCellDate: lastCellDate || new Date(endDate),
//       containsToday: startDate.getTime() <= now.getTime() && now.getTime() <= endDate.getTime(),
//       // All the events are stored in the mutableEvents array, but subset of visible ones are passed
//       // Into the current view for fast lookup and manipulation.
//       events: []
//     }
//   })
// }

export const useView = vuecal => {
  const now = new Date()
  const { config, config: { props }, texts, dateUtils } = vuecal

  const id = computed(() => config.props.view || config.defaultView)
  const title = ref('Vue Cal')
  const startDate = ref(now)
  const endDate = ref(now)
  const firstCellDate = ref(now)
  const lastCellDate = ref(now)
  const containsToday = ref(false)
  const events = ref([])

  return {
    id,
    title,
    startDate,
    endDate,
    firstCellDate,
    lastCellDate,
    containsToday,
    // All the events are stored in the mutableEvents array, but subset of visible ones are passed
    // Into the current view for fast lookup and manipulation.
    events
  }
}
