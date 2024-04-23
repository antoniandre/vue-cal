export const minutesInADay = 24 * 60 // Don't do the maths every time.

export const props = {
  // Only used if there are daySplits with minSplitWidth, to add the same height top spacer on time column.
  allDayBarHeight: { type: [String, Number], default: '25px' },
  cellClickHold: { type: Boolean, default: true },
  cellContextmenu: { type: Boolean, default: false },
  clickToNavigate: { type: Boolean, default: false },
  datePrototypes: { type: Boolean, default: true },
  dblclickToNavigate: { type: Boolean, default: true },
  disableDays: { type: Array, default: () => [] },
  dragToCreateEvent: { type: Boolean, default: true },
  // Start a drag creation after dragging a certain amount of pixels.
  // This prevents drag creation by mistake when you want to navigate.
  dragToCreateThreshold: { type: Number, default: 15 },
  editableEvents: { type: [Boolean, Object], default: false },
  events: { type: Array, default: () => [] },
  eventsCountOnYearView: { type: Boolean, default: false },
  eventsOnMonthView: { type: [Boolean, String], default: false },
  hideBody: { type: Boolean, default: false },
  hideTitleBar: { type: Boolean, default: false },
  hideViewSelector: { type: Boolean, default: false },
  hideWeekdays: { type: Array, default: () => [] },
  hideWeekends: { type: Boolean, default: false },
  locale: { type: [String, Object], default: 'en-us' },
  maxDate: { type: [String, Date], default: '' },
  minCellWidth: { type: Number, default: 0 },
  minDate: { type: [String, Date], default: '' },
  minEventWidth: { type: Number, default: 0 },
  minSplitWidth: { type: Number, default: 0 },
  onEventClick: { type: [Function, null], default: null },
  onEventCreate: { type: [Function, null], default: null },
  onEventDblclick: { type: [Function, null], default: null },
  overlapsPerTimeStep: { type: Boolean, default: false },
  resizeX: { type: Boolean, default: false },
  selectedDate: { type: [String, Date], default: '' },
  showAllDayEvents: { type: [Boolean, String], default: false },
  showTimeInCells: { type: Boolean, default: false },
  showWeekNumbers: { type: [Boolean, String], default: false },
  snapToTime: { type: Number, default: 0 },
  small: { type: Boolean, default: false },
  specialHours: { type: Object, default: () => ({}) },
  splitDays: { type: Array, default: () => [] },
  startWeekOnSunday: { type: Boolean, default: false },
  stickySplitLabels: { type: Boolean, default: false },
  time: { type: Boolean, default: true },
  timeCellHeight: { type: Number, default: 40 }, // In pixels.
  timeFormat: { type: String, default: '' },
  timeFrom: { type: Number, default: 0 }, // In minutes.
  timeStep: { type: Number, default: 60 }, // In minutes.
  timeTo: { type: Number, default: minutesInADay }, // In minutes.
  todayButton: { type: Boolean, default: false },
  transitions: { type: Boolean, default: true },
  twelveHour: { type: Boolean, default: false },
  view: { type: String, default: 'week' },
  viewDate: { type: [String, Date], default: '' }, // The view will automatically set its start and end to present this date.
  views: { type: Array, default: ['day', 'days', 'week', 'month', 'year', 'years'] },
  watchRealTime: { type: Boolean, default: false }, // Expensive, so only trigger on demand.
  xsmall: { type: Boolean, default: false }
}
