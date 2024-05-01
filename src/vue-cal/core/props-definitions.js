export const minutesInADay = 24 * 60 // Don't do the maths every time.

export const props = {
  // HANDLED:
  datePicker: { type: Boolean, default: false }, // Shorthand for xs: true, views: [month, year, years].
  datePrototypes: { type: Boolean, default: true },
  locale: { type: [String, Object], default: 'en-us' },
  selectedDate: { type: [String, Date], default: '' },
  sm: { type: Boolean, default: false },
  startWeekOnSunday: { type: Boolean, default: false },
  time: { type: Boolean, default: true },
  timeFormat: { type: String, default: '' },
  timeFrom: { type: Number, default: 0 }, // In minutes.
  timeStep: { type: Number, default: 60 }, // In minutes.
  timeTo: { type: Number, default: minutesInADay }, // In minutes.
  titleBar: { type: Boolean, default: true },
  todayButton: { type: Boolean, default: true },
  twelveHour: { type: Boolean, default: false },
  view: { type: String, default: 'week' },
  viewDate: { type: [String, Date], default: '' }, // The view will automatically set its start and end to present this date.
  views: { type: [Array, Object], default: ['day', 'days', 'week', 'month', 'year', 'years'] },
  viewsBar: { type: Boolean, default: true },
  xs: { type: Boolean, default: false },

  // TODO NEXT:
  transitions: { type: Boolean, default: true },
  watchRealTime: { type: Boolean, default: false }, // Expensive, so only trigger on demand.
  clickToNavigate: { type: Boolean, default: false },
  dblclickToNavigate: { type: Boolean, default: true },
  hideWeekdays: { type: Array, default: () => [] },
  hideWeekends: { type: Boolean, default: false },
  disableDays: { type: Array, default: () => [] },

  // TODO:
  cellClickHold: { type: Boolean, default: true },
  cellContextmenu: { type: Boolean, default: false },
  dragToCreateEvent: { type: Boolean, default: true },
  // Start a drag creation after dragging a certain amount of pixels.
  // This prevents drag creation by mistake when you want to navigate.
  dragToCreateThreshold: { type: Number, default: 15 },
  editableEvents: { type: [Boolean, Object], default: false },
  events: { type: Array, default: () => [] },
  eventsCountOnYearView: { type: Boolean, default: false },
  eventsOnMonthView: { type: [Boolean, String], default: false },
  maxDate: { type: [String, Date], default: '' },
  minDate: { type: [String, Date], default: '' },
  minEventWidth: { type: Number, default: 0 },
  minSplitWidth: { type: Number, default: 0 },
  onEventClick: { type: [Function, null], default: null },
  onEventCreate: { type: [Function, null], default: null },
  onEventDblclick: { type: [Function, null], default: null },
  overlapsPerTimeStep: { type: Boolean, default: false },
  resizeX: { type: Boolean, default: false },
  showAllDayEvents: { type: [Boolean, String], default: false },
  showTimeInCells: { type: Boolean, default: false },
  showWeekNumbers: { type: [Boolean, String], default: false },
  snapToTime: { type: Number, default: 0 },
  specialHours: { type: Object, default: () => ({}) },
  splitDays: { type: Array, default: () => [] },
  stickySplitLabels: { type: Boolean, default: false },
}
