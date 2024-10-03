export const minutesInADay = 24 * 60 // Don't do the maths every time.

export const props = {
  // HANDLED:
  clickToNavigate: { type: Boolean, default: undefined }, // Setting to false will force it off on date-picker.
  dark: { type: Boolean, default: false }, // Dark theme.
  datePicker: { type: Boolean, default: false }, // Shorthand for xs: true, views: [month, year, years], clickToNavigate: true.
  datePrototypes: { type: Boolean, default: true }, // Wether or not to add some useful methods to the native Date class.
  // The array of events to display in Vue Cal.
  // Can hold just the view events and be updated or the full array of all events available.
  events: { type: Array, default: () => [] },
  eventsOnMonthView: { type: [Boolean, String], default: false }, // Allows displaying all events on month view.
  hideWeekdays: { type: Array, default: () => [] }, // An array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.
  hideWeekends: { type: Boolean, default: false }, // Show or hide both Saturday and Sunday in days, week and month views.
  // en-us is the default and fallback if locale is not supported.
  // The locale can also be provided externally to avoid using Promises.
  locale: { type: [String, Object], default: '' }, // A language to use for all the texts.
  // A 2-way binding that highlights the selected date in the calendar but does not navigate to it.
  selectedDate: { type: [String, Date], default: '' },
  sm: { type: Boolean, default: false }, // Small size (truncates texts + specific styles).
  specialHours: { type: Object, default: () => ({}) }, // Highlight a particular time range on each day of the week, individually.
  splitDays: { type: Array, default: () => [] }, // Split a day in different persons/rooms/locations schedules.
  startWeekOnSunday: { type: Boolean, default: false }, // Shows Sunday before Monday in days, week and month views.
  theme: { type: [String, Boolean], default: 'default' }, // Only adds a CSS class when set to default.
  time: { type: Boolean, default: true },
  timeCellHeight: { type: Number, default: 40 }, // In pixels.
  timeFormat: { type: String, default: '' },
  timeFrom: { type: Number, default: 0 }, // Start time of the time column, in minutes.
  timeStep: { type: Number, default: 60 }, // Step amount for the time in the time column, in minutes.
  timeTo: { type: Number, default: minutesInADay }, // End time of the time column, in minutes.
  titleBar: { type: Boolean, default: true }, // Show or hide the header title bar.
  todayButton: { type: Boolean, default: true }, // Show or hide the header today button.
  transitions: { type: Boolean, default: true }, // Enables/disables the navigation transitions.
  twelveHour: { type: Boolean, default: false }, // 12 or 24 hour format are respectively written like 1pm and 13:00.
  // Tells the first view to show among 'day', 'days', 'week', 'month', 'year', 'years'.
  // Also a 2-way binding that gets updated with the new view on navigation.
  view: { type: String, default: 'week' },
  viewDate: { type: [String, Date], default: '' }, // The view will automatically set its start and end to present this date.
  // Only available for month and day views, this will shift the start of the view (left or right) by x days (signed integer).
  viewDayOffset: { type: Number, default: 0 },
  // The list of all the view that will be available in this calendar.
  views: { type: [Array, Object], default: ['day', 'days', 'week', 'month', 'year', 'years'] },
  viewsBar: { type: Boolean, default: true }, // Show or hide the headers view selection bar.
  watchRealTime: { type: Boolean, default: false }, // More expensive, so only trigger on demand.
  xs: { type: Boolean, default: false }, // Extra small size for date pickers (truncates texts + specific styles).

  // TODO NEXT:
  dblclickToNavigate: { type: Boolean, default: true },
  disableDays: { type: Array, default: () => [] }, // Array of specific dates to disable.

  // TODO:
  cellClickHold: { type: Boolean, default: true },
  dragToCreateEvent: { type: Boolean, default: true },
  // Start a drag creation after dragging a certain amount of pixels.
  // This prevents drag creation by mistake when you want to navigate.
  dragToCreateThreshold: { type: Number, default: 15 },
  editableEvents: { type: [Boolean, Object], default: false },
  eventsCountOnYearView: { type: Boolean, default: false },
  maxDate: { type: [String, Date], default: '' },
  minDate: { type: [String, Date], default: '' },
  minEventWidth: { type: Number, default: 0 },
  minSplitWidth: { type: Number, default: 0 },
  onEventCreate: { type: [Function, null], default: null },
  overlapsPerTimeStep: { type: Boolean, default: false },
  resizeX: { type: Boolean, default: false },
  showAllDayEvents: { type: [Boolean, String], default: false },
  showTimeInCells: { type: Boolean, default: false },
  showWeekNumbers: { type: [Boolean, String], default: false },
  snapToTime: { type: Number, default: 0 },
  stickySplitLabels: { type: Boolean, default: false }
}
