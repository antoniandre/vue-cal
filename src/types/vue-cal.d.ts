import {DefineComponent} from 'vue';

export interface VueCalProps {
  // HANDLED:
  clickToNavigate?: boolean, // Setting to false will force it off on date-picker.
  dark?: boolean, // Dark theme.
  datePicker?: boolean, // Shorthand for xs: true, views: [month, year, years], clickToNavigate: true.
  // disableDays: { type: Array, default: () => [] }, // Array of specific dates to disable.
  // // Can be true false or a finer grain permissions object like:
  // // { drag: bool, resize: bool, create: bool, delete: bool }
  // editableEvents: { type: [Boolean, Object], default: false },
  // // Minimum drag distance in pixels to create an event (prevents accidental event creation when trying to navigate).
  // eventCreateMinDrag: { type: Number, default: 15 }, // The minimum drag distance in pixels to create an event.
  // // The array of events to display in Vue Cal.
  // // Can hold just the view events and be updated or the full array of all events available.
  // events: { type: Array, default: () => [] },
  // eventCount: { type: Boolean, default: false }, // Displays an events counter in each cell on month view.
  // eventsOnMonthView: { type: Boolean, default: false }, // Displays events in full on month view.
  // hideWeekdays: { type: Array, default: () => [] }, // An array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.
  // hideWeekends: { type: Boolean, default: false }, // Show or hide both Saturday and Sunday in days, week and month views.
  // // en-us is the default and fallback if locale is not supported.
  // // The locale can also be provided externally to avoid using Promises.
  // locale: { type: String, default: '' }, // A language to use for all the texts.
  // maxDate: { type: [String, Date], default: '' }, // Mostly for date pickers, sets a maximum date for cell interactions.
  // minDate: { type: [String, Date], default: '' }, // Mostly for date pickers, sets a minimum date for cell interactions.
  // // A 2-way binding that highlights the selected date in the calendar but does not navigate to it.
  // selectedDate: { type: [String, Date], default: '' },
  // sm: { type: Boolean, default: false }, // Small size (truncates texts + specific styles).
  // specialHours: { type: Object, default: () => ({}) }, // Highlight a particular time range on each day of the week, individually.
  // schedules: { type: Array, default: () => [] }, // Split a day in different persons/rooms/locations schedules.
  // snapToInterval: { type: Number, default: 0 }, // Snap the event start and end to a specific interval in minutes.
  // startWeekOnSunday: { type: Boolean, default: false }, // Shows Sunday before Monday in days, week and month views.
  // theme: { type: [String, Boolean], default: 'default' }, // Only adds a CSS class when set to default.
  // time: { type: Boolean, default: true }, // Show or hide the time column.
  // timeAtCursor: { type: Boolean, default: false }, // Show or hide the "time at cursor" line.
  // timeCellHeight: { type: Number, default: 40 }, // In pixels.
  // timeFormat: { type: String, default: '' }, // Overrides the default time format.
  // timeFrom: { type: Number, default: 0 }, // Start time of the time column, in minutes.
  // timeStep: { type: Number, default: 60 }, // Step amount for the time in the time column, in minutes.
  // timeTo: { type: Number, default: minutesInADay }, // End time of the time column, in minutes.
  // titleBar: { type: Boolean, default: true }, // Show or hide the header title bar.
  // todayButton: { type: Boolean, default: true }, // Show or hide the header today button.
  // transitions: { type: Boolean, default: true }, // Enables/disables the navigation transitions.
  // twelveHour: { type: Boolean, default: false }, // 12 or 24 hour format are respectively written like 1pm and 13:00.
  // // Sets the calendar view to one of: 'day', 'days', 'week', 'month', 'year', 'years'. Default 'week' or 'month' if datePicker.
  // // Gets updated on view navigation.
  // view: { type: String, default: '' },
  // viewDate: { type: [String, Date], default: '' }, // The view will automatically set its start and end to present this date.
  // // Only available for month and day views, this will shift the start of the view (left or right) by x days (signed integer).
  // viewDayOffset: { type: Number, default: 0 },
  // // The list of all the view that will be available in this calendar.
  // views: { type: [Array, Object], default: ['day', 'days', 'week', 'month', 'year', 'years'] },
  // viewsBar: { type: Boolean, default: true }, // Show or hide the headers view selection bar.
  // watchRealTime: { type: Boolean, default: false }, // More expensive, so only trigger on demand.
  // weekNumbers: { type: [Boolean, String], default: false }, // Show the weeks numbers in a column on month view.
  // xs: { type: Boolean, default: false }, // Extra small size for date pickers (truncates texts + specific styles).
  //
  // // TODO:
  // minEventWidth: { type: Number, default: 0 },
  // minScheduleWidth: { type: Number, default: 0 },
  // overlapsPerTimeStep: { type: Boolean, default: false },
  // resizeX: { type: Boolean, default: false },
  // allDayEvents: { type: [Boolean, String], default: false }
}

export interface VueCalSlots {

}

export interface VueCalEmits {

}

export declare const VueCal: DefineComponent<VueCalProps, VueCalSlots, VueCalEmits>
