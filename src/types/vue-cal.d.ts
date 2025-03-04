import {DefineComponent} from 'vue';

type DateString = `${number}${number}${number}${number}-${number}${number}-${number}${number}`
type DateTimeString = `${DateString} ${number}${number}:${number}${number}`

type Weekdays = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
type Languages = 'ar' | 'bg' | 'bn' | 'bs' | 'ca' | 'cs' | 'da' | 'de' | 'el' | 'en-gb' | 'en-us' | 'es' | 'et' | 'fa' | 'fi' | 'fr' | 'he' | 'hr' | 'hu' | 'id' | 'is' | 'it' | 'ja' | 'ka' | 'ko' | 'lt' | 'mn' | 'nl' | 'no' | 'pl' | 'pt-br' | 'pt-pt' | 'ro' | 'ru' | 'sk' | 'sl' | 'sq' | 'sr' | 'sv' | 'tr' | 'uk' | 'vi' | 'zh-cn' | 'zh-hk'

type Views = 'day' | 'days' | 'week' | 'month' | 'year' | 'years'
type ViewsLayout = Partial<Record<Views, {
    cols: number
    rows: number
}>>

type SpecialConfigs = {
    from: number
    to: number
    class: string
    label?: string
}
type SpecialHours = Partial<Record<WeekDays, SpecialConfigs | SpecialConfigs[]>>

type Event = {
    start: Date,
    end: Date,
    id?: string,
    title?: string,
    draggable?: boolean,
    resizable?: boolean,
    deletable?: boolean,
    allDay?: boolean,
    recurring?: number,
    schedule?: number,
    background?: number,
    class?: string
}

export interface VueCalProps {
  // HANDLED:
  clickToNavigate?: boolean, // Setting to false will force it off on date-picker.
  dark?: boolean, // Dark theme.
  datePicker?: boolean, // Shorthand for xs: true, views: [month, year, years], clickToNavigate: true.
  disableDays?: (Date | DateString)[], // Array of specific dates to disable.
  // // Can be true false or a finer grain permissions object like:
  // // { drag: bool, resize: bool, create: bool, delete: bool }
  editableEvents?: boolean | { drag: boolean, resize: boolean, create: boolean, delete: boolean },
  // Minimum drag distance in pixels to create an event (prevents accidental event creation when trying to navigate).
  eventCreateMinDrag?: number, // The minimum drag distance in pixels to create an event.
  // The array of events to display in Vue Cal.
  // Can hold just the view events and be updated or the full array of all events available.
  events?: Event[],
  eventCount?: boolean, // Displays an events counter in each cell on month view.
  eventsOnMonthView?: boolean, // Displays events in full on month view.
  hideWeekdays?: Weekdays[], // An array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.
  hideWeekends?: boolean, // Show or hide both Saturday and Sunday in days, week and month views.
  // en-us is the default and fallback if locale is not supported.
  // The locale can also be provided externally to avoid using Promises.
  locale?: Languages, // A language to use for all the texts.
  maxDate?: Date | DateString | DateTimeString, // Mostly for date pickers, sets a maximum date for cell interactions.
  minDate?: Date | DateString | DateTimeString, // Mostly for date pickers, sets a minimum date for cell interactions.
  // A 2-way binding that highlights the selected date in the calendar but does not navigate to it.
  selectedDate?: (Date | DateString),
  sm?: boolean, // Small size (truncates texts + specific styles).
  specialHours?: SpecialHours, // Highlight a particular time range on each day of the week, individually.
  // schedules: { type: Array, default: () => [] }, // Split a day in different persons/rooms/locations schedules.
  snapToInterval?: number, // Snap the event start and end to a specific interval in minutes.
  startWeekOnSunday?: boolean, // Shows Sunday before Monday in days, week and month views.
  // theme: { type: [String, Boolean], default: 'default' }, // Only adds a CSS class when set to default.
  time?: boolean, // Show or hide the time column.
  timeAtCursor?: boolean, // Show or hide the "time at cursor" line.
  timeCellHeight?: number, // In pixels.
  timeFormat?: string, // Overrides the default time format.
  timeFrom?: number, // Start time of the time column, in minutes.
  timeStep?: number, // Step amount for the time in the time column, in minutes.
  timeTo?: number, // End time of the time column, in minutes.
  titleBar?: boolean, // Show or hide the header title bar.
  todayButton?: boolean, // Show or hide the header today button.
  transitions?: boolean, // Enables/disables the navigation transitions.
  twelveHour?: boolean, // 12 or 24 hour format are respectively written like 1pm and 13:00.
  // Sets the calendar view to one of: 'day', 'days', 'week', 'month', 'year', 'years'. Default 'week' or 'month' if datePicker.
  // Gets updated on view navigation.
  view?: Views | ViewsLayout,
  viewDate?: Date | DateString, // The view will automatically set its start and end to present this date.
  // Only available for month and day views, this will shift the start of the view (left or right) by x days (signed integer).
  viewDayOffset?: number,
  // The list of all the view that will be available in this calendar.
  views?: Views[] | ViewsLayout,
  viewsBar?: boolean, // Show or hide the headers view selection bar.
  watchRealTime?: false, // More expensive, so only trigger on demand.
  weekNumbers?: boolean, // Show the weeks numbers in a column on month view.
  xs?: boolean, // Extra small size for date pickers (truncates texts + specific styles).
  minEventWidth?: number,
  minScheduleWidth?: number,
  overlapsPerTimeStep?: boolean,
  resizeX?: boolean,
  allDayEvents?: { type: [Boolean, String], default: false }
}

export interface VueCalSlots {

}

export interface VueCalEmits {

}

export declare const VueCal: DefineComponent<VueCalProps, VueCalSlots, VueCalEmits>
