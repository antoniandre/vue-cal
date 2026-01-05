import {
  DefineSetupFnComponent
} from 'vue';

type VueCalDateString = `${number}${number}${number}${number}-${number}${number}-${number}${number}`
type VueCalDateTimeString = `${VueCalDateString} ${number}${number}:${number}${number}`

type VueCalWeekdays = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
type VueCalLanguages =
  'ar'
  | 'bg'
  | 'bn'
  | 'bs'
  | 'ca'
  | 'cs'
  | 'da'
  | 'de'
  | 'el'
  | 'en-gb'
  | 'en-us'
  | 'es'
  | 'et'
  | 'fa'
  | 'fi'
  | 'fr'
  | 'he'
  | 'hr'
  | 'hu'
  | 'id'
  | 'is'
  | 'it'
  | 'ja'
  | 'kaa'
  | 'ka'
  | 'kk'
  | 'ko'
  | 'ky'
  | 'lt'
  | 'mn'
  | 'nl'
  | 'no'
  | 'pl'
  | 'pt-br'
  | 'pt-pt'
  | 'ro'
  | 'ru'
  | 'sk'
  | 'sl'
  | 'sq'
  | 'sr'
  | 'sv'
  | 'tr'
  | 'uk'
  | 'uz'
  | 'uz-cryl'
  | 'vi'
  | 'zh-cn'
  | 'zh-hk'

type VueCalViewKeys = 'day' | 'days' | 'week' | 'month' | 'year' | 'years'
type VueCalViewsLayout = Partial<Record<VueCalViewKeys, {
  cols: number
  rows: number
}>>

export interface VueCalSpecialHoursConfigs {
  from: number
  to: number
  class: string
  label?: string
}

type VueCalSpecialHours = Partial<Record<VueCalWeekdays, VueCalSpecialHoursConfigs | VueCalSpecialHoursConfigs[]>>

export type VueCalSchedules = {
  id?: number
  class?: string
  label?: string
  hide?: false
}
export type VueCalSchedulesHidden = {
  id: number
  class?: string
  label?: string
  hide?: boolean
}

export interface VueCalEvent {
  _eid?: undefined,
  _?: undefined,
  start: Date | VueCalDateTimeString,
  end: Date | VueCalDateTimeString,
  id?: string,
  title?: string,
  content?: string
  class?: string,
  background?: number,
  schedule?: number,
  allDay?: boolean,
  resizable?: boolean,
  draggable?: boolean,
  deletable?: boolean,
}

export interface VueCalConfig {
  allDayEvents?: boolean,
  clickToNavigate?: boolean, // Setting to false will force it off on date-picker.
  dark?: boolean, // Dark theme.
  datePicker?: boolean, // Shorthand for xs: true, views: [month, year, years], clickToNavigate: true.
  disableDays?: (Date | VueCalDateString)[], // Array of specific dates to disable.
  // // Can be true false or a finer grain permissions object like:
  // // { drag: bool, resize: bool, create: bool, delete: bool }
  editableEvents?: boolean | { drag?: boolean, resize?: boolean, create?: boolean, delete?: boolean },
  // The array of events to display in Vue Cal.
  // Can hold just the view events and be updated or the full array of all events available.
  eventCount?: boolean | VueCalViewKeys[], // Displays an events counter in each cell on month view.
  events?: VueCalEvent[],
  // Minimum drag distance in pixels to create an event (prevents accidental event creation when trying to navigate).
  eventCreateMinDrag?: number, // The minimum drag distance in pixels to create an event.
  eventsOnMonthView?: boolean | 'short', // Displays events in full on month view.
  hideWeekdays?: VueCalWeekdays[], // An array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.
  hideWeekends?: boolean, // Show or hide both Saturday and Sunday in days, week and month views.
  // en-us is the default and fallback if locale is not supported.
  // The locale can also be provided externally to avoid using Promises.
  locale?: VueCalLanguages, // A language to use for all the texts.
  maxDate?: Date | VueCalDateString | VueCalDateTimeString, // Mostly for date pickers, sets a maximum date for cell interactions.
  minDate?: Date | VueCalDateString | VueCalDateTimeString, // Mostly for date pickers, sets a minimum date for cell interactions.
  // A 2-way binding that highlights the selected date in the calendar but does not navigate to it.
  selectedDate?: (Date | VueCalDateString | VueCalDateTimeString),
  sm?: boolean, // Small size (truncates texts + specific styles).
  specialHours?: VueCalSpecialHours, // Highlight a particular time range on each day of the week, individually.
  schedules?: VueCalSchedules[] | VueCalSchedulesHidden[], // Split a day in different persons/rooms/locations schedules.
  snapToInterval?: number, // Snap the event start and end to a specific interval in minutes.
  startWeekOnSunday?: boolean, // Shows Sunday before Monday in days, week and month views.
  stackEvents?: boolean,
  theme?: boolean | string,
  time?: boolean, // Show or hide the time column.
  timeCellHeight?: number, // In pixels.
  timeFormat?: string, // Overrides the default time format.
  timeFrom?: number, // Start time of the time column, in minutes.
  timeStep?: number, // Step amount for the time in the time column, in minutes.
  timeTo?: number, // End time of the time column, in minutes.
  titleBar?: boolean, // Show or hide the header title bar.
  todayButton?: boolean, // Show or hide the header today button.
  twelveHour?: boolean, // 12 or 24 hour format are respectively written like 1pm and 13:00.
  // Sets the calendar view to one of: 'day', 'days', 'week', 'month', 'year', 'years'. Default 'week' or 'month' if datePicker.
  // Gets updated on view navigation.
  view?: VueCalViewKeys,
  viewDate?: Date | VueCalDateString | VueCalDateTimeString, // The view will automatically set its start and end to present this date.
  // Only available for month and day views, this will shift the start of the view (left or right) by x days (signed integer).
  viewDayOffset?: number,
  // The list of all the view that will be available in this calendar.
  views?: VueCalViewKeys[] | VueCalViewsLayout,
  viewsBar?: boolean, // Show or hide the headers view selection bar.
  watchRealTime?: false, // More expensive, so only trigger on demand.
  weekNumbers?: boolean, // Show the weeks numbers in a column on month view.
  xs?: boolean, // Extra small size for date pickers (truncates texts + specific styles).
}

export interface VueCalView {
  // ID, Title
  id: VueCalViewKeys
  title: string
  // Ranges
  start: Date
  end: Date
  fullRangeStart: Date
  fullRangeEnd: Date
  // Cell dates
  cellDates: {
    start: Date,
    end: Date,
    startFormatted: VueCalDateString
  }[],
  // Events
  events: VueCalEvent[]
  // Methods
  switch: (view: VueCalViewKeys, date?: Date) => void
  broader: () => void
  narrower: () => void
  previous: () => void
  next: () => void
  goToToday: () => void
  updateViewDate: (date: Date) => void
  updateSelectedDate: (date: Date) => void
  createEvent: (event: VueCalEvent) => void
  deleteEvent: (eventId: number, forceStage?: number) => void
  scrollToCurrentTime: () => void
  scrollToTime: (minutes: number, scrollToOptions?: ScrollToOptions) => void
  scrollTop: () => void
  // Others
  viewDate: Date
  selectedDate: Date
  now: Date
  broaderView: VueCalViewKeys
  containsToday: boolean
  cols: number
  rows: number
  isDay: boolean
  isDays: boolean
  isWeek: boolean
  isMonth: boolean
  isYear: boolean
  isYears: boolean
}

export interface VueCalCell {
  broader: VueCalViewKeys
  narrower: VueCalViewKeys
  goBroader: () => void
  goNarrower: () => void
  start: Date
  end: Date
}

export interface VueCalCellEvents {
  cell: VueCalCell
  cursor: {
    x: number
    y: number
    date: Date
  }
  e: PointerEvent
}

export interface VueCalEventEvents {
  event: VueCalEvent
  e: PointerEvent
}

export interface VueCalEmits extends Record<string, ((...args: any[]) => any)> {
  // Core Events
  'ready': (value: { config: VueCalConfig, view: VueCalView }) => any
  'viewChange': (value: VueCalView) => any // possible change to custom view
  'update:view': (value: VueCalViewKeys) => any
  'update:selectedDate': (value: Date) => any
  'update:viewDate': (value: Date) => any
  'update:events': (value: VueCalEvent[]) => any
  // Cell-related Events
  'cell-click': (value: VueCalCellEvents) => any
  'cell-drag-start': (value: VueCalCellEvents) => any
  'cell-drag': (value: VueCalCellEvents) => any
  'cell-drag-end': (value: VueCalCellEvents) => any
  'cell-hold': (value: VueCalCellEvents) => any
  // Event-related Events
  'event-hold': (value: VueCalEventEvents) => any
  'event-create': (value: VueCalEventEvents & VueCalCellEvents) => any
  'event-created': (value: VueCalEventEvents) => any
  'event-delete': (value: VueCalEvent) => any
  'event-drag-start': (value: VueCalEventEvents) => any
  'event-drag': (value: VueCalEventEvents) => any
  'event-drag-end': (value: VueCalEventEvents) => any
  'event-resize-start': (value: VueCalEventEvents) => any
  'event-resize': (value: VueCalEventEvents & {overlaps: VueCalEvent[]}) => any
  'event-resize-end': (value: VueCalEventEvents & {original: VueCalEvent, overlaps: VueCalEvent[]}) => any
  'event-drop': (value: VueCalEventEvents & {overlaps: VueCalEvent[], cell: VueCalCell, external: boolean}) => any
  'event-dropped': (value: VueCalEventEvents & {originalEvent: VueCalEvent, cell: VueCalCell, external: boolean}) => any
}

export declare const VueCal: DefineSetupFnComponent<VueCalConfig, VueCalEmits>


export declare function addDatePrototypes(): void

declare global {
  interface Date {
    addDays(days: number): Date

    addHours(hours: number): Date

    addMinutes(minutes: number): Date

    subtractDays(days: number): Date

    subtractHours(hours: number): Date

    subtractMinutes(minutes: number): Date

    getWeek(): number

    isToday(): boolean

    isLeapYear(): boolean

    format(format: string): string

    formatTime(format: string): string
  }
}

