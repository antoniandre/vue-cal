<template lang="pug">
h1.title1 API

//- Calendar Views.
h2.w-flex.justify-space-between.mb2
  title-link(div anchor="views") Calendar Views
  w-switch.my1.body(@update:model-value="expandedViews = [...views].fill($event)") Expand All

w-accordion(
  v-model="expandedViews"
  :items="views"
  expand-icon-rotate90
  title-class="pl0 bd0"
  content-class="pt0 pb3")
  template(#item-title="{ item }")
    strong.code {{ item.label }}

//- View Object.
h2.w-flex.justify-space-between.mb2
  title-link(div anchor="view") The View Object
  .todo-tag.ml2.mra TO REVIEW
  w-switch.my1.body(@update:model-value="expandedViewObject = Array(10).fill($event)") Expand All
p.caption.size--md.lh1.
  You can use the #[code.base-color view] object to access accurate information about the current view at any time.
  This is what it contains:
w-accordion.mt3(
  v-model="expandedViewObject"
  expand-icon-rotate90
  title-class="pl0 bd0"
  content-class="pt1 pr0 pb6 pl7")
  w-accordion-item
    template(#title)
      h3.title4.mt0.pt0 ID, Title
    template(#content)
      p.
        The ID of the current view, as well as its computed title that you may use in slots.<br>
        Example:
      ssh-pre(language="js" :dark="store.darkMode").
        {
          id: "month",
          title: "October 2024",
          ...
        }

  w-accordion-item
    template(#title)
      h3.title4.mt0.pt0 Ranges
    template(#content)
      p In order to be flexible, straightforward and not confusing, two ranges are available:
      ul
        li
          h4.mt2.mb0 Primary Range (Actual visible/active days):
          p.
            What most users will need when fetching events from an API. It will ignore out-of-scope days in the month
            view and trim the hidden days in the week.

          p Example:
          ssh-pre.mt0(language="js" :dark="store.darkMode").
            {
              start: "2024-09-30T22:00:00.000Z", // Standard JS Date object.
              end: "2024-10-31T22:59:59.999Z", // Standard JS Date object.
              ...
            }
        li
          h4.mt2.mb0 Extended full range (including out-of-scope or hidden days):
          p.
            It will include out-of-scope days in the month view (e.g., from the previous month or the next
            month) and return a full 7-day week range in the week view regardless of the hidden days.

          p Example:
          ssh-pre.mt0(language="js" :dark="store.darkMode").
            {
              fullRangeStart: "2024-09-29T22:00:00.000Z", // Standard JS Date object.
              fullRangeEnd: "2024-11-10T22:59:59.999Z", // Standard JS Date object.
              ...
            }

  w-accordion-item
    template(#title)
      h3.title4.mt0.pt0 Cell Dates
    template(#content)
      p A complete list of all the visible cells dates (start and end).<br>Example:
      ssh-pre(language="js" :dark="store.darkMode").
        {
          cellDates: [
            {
              start: "2024-09-29T22:00:00.000Z", // Standard JS Date object.
              startFormatted: "2024-09-30", // Standard JS Date object.
              end: "2024-09-30T21:59:59.999Z" // Standard JS Date object.
            },
            ...
          ],
          ...
        }

  w-accordion-item
    template(#title)
      h3.title4.mt0.pt0 Events
    template(#content)
      p All the calendar events that the current view contains.<br>Example:
      ssh-pre(language="js" :dark="store.darkMode").
        {
          events: [],
          ...
        }

  w-accordion-item
    template(#title)
      h3.title4.mt0.pt0 Methods
    template(#content)
      p Methods that you can use from the Vue Cal instance's view (you can use a template ref).
      div
        | Example:
        ssh-pre.d-iblock.pr5.py0.ml1.my0(language="js" :dark="store.darkMode").
          vuecalRef.value.view.next()
        | .
      ssh-pre(language="js" :dark="store.darkMode").
        switch, // Switches to a different view given in param (day, days, month, year, years).
        broader, // Navigates to the next available broader view.
        narrower, // Navigates to the next available narrower view.
        previous, // Navigates to the previous range of the same view.
        next, // Navigates to the next range of the same view.
        goToToday, // Goes to today.
        updateViewDate, // Updates the view date to the date given in param.
        updateSelectedDate, // Updates the selected date to the date given in param.
        createEvent, // Creates an event given in params (requires `start`, `end`).
        deleteEvent, // Deletes an event given its ID and a deletion stage (1, 2, 3).
        scrollToCurrentTime, // Scrolls the calendar body to the current time.
        scrollToTime, // Scrolls the calendar body to the given time in minutes.
        scrollTop // Scrolls the calendar body to the top.

  w-accordion-item
    template(#title)
      h3.title4.mt0.pt0 Other Utilities
    template(#content)
      p Other utilities that you may find useful.
      p Example:
      ssh-pre(language="js" :dark="store.darkMode").
        {
          viewDate: "2024-09-30T22:00:00.000Z", // Standard JS Date object.
          selectedDate: "2024-10-22T19:56:41.104Z", // Standard JS Date object.
          now: "2024-10-22T19:56:41.107Z", // Standard JS Date object.
          broaderView: "year",
          containsToday: true,
          cols: 7,
          rows: 6,
          isDay: false,
          isDays: false,
          isWeek: false,
          isMonth: true,
          isYear: false,
          isYears: false
        }

//- Event Object.
h2.w-flex.justify-space-between.mb2
  title-link(div anchor="view") The Event Object
  w-switch.my1.body(@update:model-value="expandedEventObject = Array(15).fill($event)") Expand All
p.caption.size--md.lh1.
  The calendar event object contains all the information about a calendar event and is used to render
  it in the calendar.
p Minimum required properties: #[span.code start] and #[span.code end].

p First look at an example of a complete event object and below the list of all the available properties:
ssh-pre(language="js" :dark="store.darkMode").
  {
    start: new Date(),
    end: new Date().addHours(1), // Using Vue Cal's Date prototypes.
    id: 'event-1',
    title: 'Meeting with Alice',
    draggable: true,
    resizable: true,
    deletable: true,
    allDay: false,
    recurring: { frequency: 'week', amount: 1, start: new Date() },
    schedule: 1,
    background: false,
    class: 'meeting',

    customField: '...', // Your custom fields.
    _: { ... } // Internal Fields.
  }

w-accordion.mt3(
  v-model="expandedEventObject"
  expand-icon-rotate90
  title-class="pl0 bd0"
  content-class="pt1 pr0 pb6 pl7")
  w-accordion-item
    template(#title)
      strong.code.title5 start
      .type [Date]
      w-tag.error--bg.ml1(round sm) REQUIRED
    template(#content) The start date and time of the event, given as a JavaScript Date.
  w-accordion-item
    template(#title)
      strong.code.title5 end
      .type [Date]
      w-tag.error--bg.ml1(round sm) REQUIRED
    template(#content) The end date and time of the event, given as a JavaScript Date.
  w-accordion-item
    template(#title)
      strong.code.title5 id
      .type [String]
    template(#content) The unique identifier of the event. If not provided, it will be internally identified by the key #[span.code _.id].
  w-accordion-item
    template(#title)
      strong.code.title5 title
      .type [String]
    template(#content) The title of the event. If not provided, no title will be displayed.
  w-accordion-item
    template(#title)
      strong.code.title5 draggable
      .type [Boolean]
    template(#content) Indicates if this specific event can be dragged and dropped. This property overrides the global setting.
  w-accordion-item
    template(#title)
      strong.code.title5 resizable
      .type [Boolean]
    template(#content) Indicates if this specific event can be resized. This property overrides the global setting.
  w-accordion-item
    template(#title)
      strong.code.title5 deletable
      .type [Boolean]
    template(#content) Indicates if this specific event can be deleted. This property overrides the global setting.
  w-accordion-item
    template(#title)
      strong.code.title5 allDay
      .type [Boolean]
    template(#content) Indicates if the event is an all-day event.
  w-accordion-item
    template(#title)
      strong.code.title5 background
      .type [Boolean]
    template(#content) Indicates if the event is a background event (allows no user interaction).
  w-accordion-item
    template(#title)
      strong.code.title5 schedule
      .type [Number]
    template(#content) Must be an integer of less than 10 digits.<br>The schedule ID the event belongs to, when multiple schedules are defined through the #[code schedules] prop. Ignored if no schedules are defined.
  w-accordion-item
    template(#title)
      strong.code.title5 recurring
      .type [Number]
      w-tag.error--bg.ml1(round sm) COMING SOON
    template(#content) Indicates if the event is recurring and its recurrence rule.
  w-accordion-item
    template(#title)
      strong.code.title5 class
      .type [String]
    template(#content) The CSS class of the event.
  w-accordion-item
    template(#title)
      strong.code.title5 _
      .type [Object]
    template(#content)
      p.
        Internal fields that are used by Vue Cal to manage the event. These fields are reserved and should not be modified.<br>
        You may still access them for convenience or debugging purposes.<br>
        Example:
      ssh-pre(language="js" :dark="store.darkMode").
        _: {
          id, // Number.
          startMinutes, // Number.
          endMinutes, // Number.
          multiday, // Boolean.
          startFormatted, // String.
          startTimeFormatted12, // String.
          startTimeFormatted24, // String.
          endTimeFormatted12, // String.
          endTimeFormatted24, // String.
          duration, // Number.
          deleting, // Boolean.
          deleted // Boolean.
        }

//- Options list.
h2.w-flex.justify-space-between.mb2
  title-link(div anchor="options") Options
  .todo-tag.ml2.mra TO REVIEW
  w-switch.my1.body(@update:model-value="expandedOptions = Array(99).fill($event)") Expand All

p.caption.size--md.lh1.
  Options can be provided to &lt;vue-cal&gt; using a #[code.base-color v-bind="configObject"] or added one by one.#[br]
  In the latter case, both #[code.base-color camelCase] and #[code.base-color kebab-case] will work.

w-accordion.mt2(
  v-model="expandedOptions"
  expand-icon-rotate90
  title-class="pl0 bd0"
  content-class="pt1 pr0 pb6 pl7")
  w-accordion-item
    template(#title)
      strong.code.title5 allDayEvents
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      ul
        li.mb2.
          When the #[span.code allDayEvents] is set to #[span.code true] the events with an
          #[span.code allDay] attribute set to #[span.code true] will be displayed in a fixed top
          bar on the #[span.code day], #[span.code days] &amp; #[span.code week] views.#[br]
          The all day events bar will only show up if the options #[span.code allDayEvents] &amp;
          #[span.code time] are set to #[span.code true].#[br]
          If #[span.code time] is set to #[span.code false], every event is an all-day
          event.
        li.mb2.
          When #[span.code allDayEvents] is set to #[span.code false], all the all-day events
          (#[span.code allDay] attribute set to #[span.code true]), will show up as normal
          events.

  w-accordion-item
    template(#title)
      strong.code.title5 clickToNavigate
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        When set to #[span.code true] a single click (or tap for touch devices) will take you to a
        narrower view if available.#[br]
        You can always go back to a broader view by clicking the view title or selecting another view
        from the view selector if enabled.#[br]
        The navigation to narrower view can be disabled by setting #[span.code clickToNavigate]
        to false.
      p Setting to false will force it off on date-picker where it is on by default.

  w-accordion-item
    template(#title)
      strong.code.title5 dark
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p Dark theme.

  w-accordion-item
    template(#title)
      strong.code.title5 datePicker
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        Sets the date picker format CSS-wise and logic as well.
        This option acts like a shorthand for:
        #[code="{ xs: true, views: ['month', 'year', 'years'], clickToNavigate: true }"].

  w-accordion-item
    template(#title)
      strong.code.title5 disableDays
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code () => []
    template(#content)
      p Accepts an array of formatted dates (e.g. #[span.code {{ new Date().format() }}]) or JavaScript dates (where the time is useless) of days to disable.

  w-accordion-item
    template(#title)
      strong.code.title5 editableEvents
      .type [Boolean, Object]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p When set to #[span.code true], it allows:
      ul
        li Dragging and dropping events.
        li Resizing events by dragging their bottom handle, when #[span.code time] is set to #[span.code true].
        li Deleting events by double click/tap by default.
        li Creating events by click and drag (refer to the #[router-link(to="/examples/calendar-events--interactions#ex--create-events") Create events] example).
      alert
        ul
          li
            | You can set more accurately which edition you want to allow by passing an object.#[br]
            | For instance, this object will allow all the above editions except the drag &amp; drop:
            div.code.base-color { drag: false, resize: true, delete: true, create: true }
          li.
            You can also set the #[span.code deletable], #[span.code resizable] and #[span.code draggable] properties
            directly in the event object to override the global setting.

  w-accordion-item
    template(#title)
      strong.code.title5 eventCount
      .type [Boolean, Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        When set to #[code true], the events will be counted on the #[code month] views and a number will appear in each cell that contain one or more events.#[br]
        You can customize the events count via CSS or via the #[code #events-count] slot.#[br]
        You can also set the #[code eventCount] prop to an array of views to individually show the count in. E.g. #[code=":event-count=\"['month', 'year']\""]

  w-accordion-item
    template(#title)
      strong.code.title5 events
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code () => []
    template(#content)
      p.
        Allows you to place events in the calendar.#[br]
        Accepts an array of event objects.#[br]
        This is what an event object must look like:
      div
        ssh-pre.mt2(language="js" :dark="store.darkMode").
          {
            start: '2018-11-19 12:00', // Required.
            end: '2018-11-19 14:00', // Required.
            // Instead of formatted dates, you can also provide JavaScript Date objects:
            // start: new Date(2018, 11 - 1, 19, 12, 0),
            // end: new Date(2018, 11 - 1, 19, 14, 0),
            title: {String}, // Optional.
            content: {String}, // Optional.
            class: {String}, // Optional - space-separated css classes.
            background: {Boolean} // Optional. (Event type not CSS property)
            schedule: {Number} // Optional.
            allDay: {Boolean} // Optional.
            deletable: false // optional - force undeletable when events are editable.
            resizable: false // optional - force unresizable when events are editable.
          }
        ul
          li If no #[span.code title] is provided, no title will be displayed.
          li.
            #[span.code content] accepts free HTML, for instance:
            '&lt;i class="icon mdi mdi-hospital-box-outline"&gt;&lt;/i&gt;'.#[br]
            If no #[span.code content] is provided, no content will be displayed.
          li.
            You may need an event CSS #[span.code class] to handle different event types
            for instance. With different classes you can apply different styles to the events.#[br]
            E.g. backgrounds, images, borders, etc.
          li.
            The #[span.code background] attribute sets an event as a background event,
            which allows overlapping and disable the ability to drag &amp; resize.
          li.
            When using #[span.code schedules], the #[span.code schedule] attribute accepts a number,
            starting from 1, corresponding to the schedule you want the event to appear in.#[br]
            Optionally, if you have set the #[span.code id] property in #[span.code schedules],
            you have to use the same #[span.code id] here (Integer of less than 10 digits).
          li.
            When the #[span.code allDayEvents] and #[span.code time] options are set to
            #[span.code true], all the events with an attribute #[span.code allDay] set to
            #[span.code true] will show up in a fixed bar (week &amp; day views).

      alert(warning)
        strong Important notes
        ul
          li.
            The events are internally identified by the key #[span.code `_eid`].
            #[strong This is a reserved keyword.]
          li.mt2
            | Correct date formats are #[code {{ (new Date()).format() }} {{ (new Date()).formatTime() }}],
            | or #[code="{{ (new Date()).format() }}"] if you don't want any time in the whole calendar,
            | or a JavaScript #[code Date] object. Only these formats will work.#[br]
            strong.
              You can't mix events with time and events without, and you can only remove time if the #[span.code time]
              option is set to #[span.code false].
          li.mt2.
            You can set an event end at #[span.code 24:00] or #[span.code 00:00] (for the next midnight),
            #[strong but internally the date will be set at #[span.code 23:59:59]] so the date stays the same instead
            of natural behavior of taking the next day at #[span.code 00:00:00].#[br]
            When returned from emitted events, this event #[span.code end] will contain a date ending at #[span.code 23:59:59].

  w-accordion-item
    template(#title)
      strong.code.title5 eventCreateMinDrag
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 15
    template(#content)
      p.
        When events are editable and #[span.code time] and #[span.code editableEvents.create] are set to
        #[span.code true], this option controls the minimum dragging distance before an event is created.#[br]
        This option might be useful to prevent unwanted event creation.#[br]
        Setting it to #[span.code 0] disables it.

  w-accordion-item
    template(#title)
      strong.code.title5 eventsOnMonthView
      .type [Boolean, String]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        When set to #[span.code true], the events will also be displayed on month view
        (excluding events of out-of-scope days).#[br]
        When set to the string '#[span.code short]', only the events titles will be displayed.

  w-accordion-item
    template(#title)
      strong.code.title5 hideWeekdays
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code () => []
    template(#content)
      p Accepts an array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.
      p Hide specific weekdays in #[span.code month], #[span.code week] and #[span.code days] views.

  w-accordion-item
    template(#title)
      strong.code.title5 hideWeekends
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p Show or hide both Saturday and Sunday in #[span.code days], #[span.code week] and #[span.code month] views.

  w-accordion-item
    template(#title)
      strong.code.title5 locale
      .type [String]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p A language to use for all the texts.
      p.
        Allow translation of the calendar texts in a given language.#[br]
        Use a 2 letter locale code
        (#[a(href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank") ISO 639-1])
        unless a distinction is needed. E.g. #[span.code 'pt-br'] for Portuguese-Brasilian.
      alert(info)
        | Currently available languages are {{ locales.map(l => l.label).join(', ') }}.#[br]
        | If you are interested in providing a language support please do a pull request with a json file
        | into the i18n directory.#[br]
        | this is what a language json looks like.

        ssh-pre.my2(language="json" :dark="store.darkMode").
          {
            "weekDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "years": "Years",
            "year": "Year",
            "month": "Month",
            "week": "Week",
            "day": "Day",
            "today": "Today",
            "noEvent": "No Event",
            "allDay": "All day",
            "deleteEvent": "Delete",
            "createEvent": "Create an event",
            "dateFormat": "dddd D MMMM YYYY"
          }
        p.
          Regarding the #[span.code dateFormat] translation, this is the format of the full
          date you can see in a single day view title.#[br]
          #[span.code dddd] stands for the full-letter day of week, #[span.code MMMM] stands for
          full-letter month, #[span.code D] stands for the date of the month (0-31),
          #[span.code YYYY] stands for full year, #[span.code {S}] stands for st/nd/rd/th and only in English.

  w-accordion-item
    template(#title)
      strong.code.title5 maxDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p.
        Accepts a formatted string or plain JavaScript Date object.#[br]
        Set a maximum date for the cells to be selectable.#[br]
        By default the cell will be grayed out when out of range but CSS classes let you
        customize this.

  w-accordion-item
    template(#title)
      strong.code.title5 minDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p.
        Accepts a formatted string or plain JavaScript Date object.#[br]
        Set a minimum date for the cells to be selectable.#[br]
        By default the cell will be grayed out when out of range but CSS classes let you customize this.

  w-accordion-item
    template(#title)
      strong.code.title5 selectedDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p.
        Accepts a JavaScript Date or a formatted string like #[code {{ (new Date()).format() }} {{ (new Date()).formatTime() }}].#[br]
        Preselects a date and navigates to it on calendar load or whenever it changes.#[br]
        The selected date is a two-way binding: you can use it in a v-model to keep your variable
        up to date.

  w-accordion-item
    template(#title)
      strong.code.title5 sm
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        Small size (truncates texts + set specific styles).
        When set to #[span.code true], the days of the week headings will be truncated to 3 letters.#[br]
        Does not apply to the title of the day view.#[br]
        2 media queries are truncating the days of the week below 450px,
        read on in the #[router-link(to="/getting-started#css-notes") CSS Notes].

  w-accordion-item
    template(#title)
      strong.code.title5 specialHours
      .type [Object]
      | ,
      .body.grey.mx1 default:
      strong.default.code () => ({})
    template(#content)
      p Highlight a particular time range on each day of the week, individually.
      p.
        Allows an individual highlighted time range for each day of the week.#[br]
        For instance, it could represent the business hours.#[br]
        The object must contain days definitions indexed by a 3-letter day ID in English, #[strong from #[code mon] to #[code sun]], of the
        days you want to highlight.#[br]
        Each day must contain an object with a #[span.code from] and #[span.code to] properties
        defining the beginning and the end of the time range #[strong in minutes].#[br]
        In addition, you can set a CSS class for each day of the week.#[br]
        It is also possible to provide an array of special hours for the same day.#[br]
        A #[span.code label] can also be provided per special hour block, and styled via CSS.#[br]#[br]

      p.subtitle-1 Example for Wednesday: #[span.code :special-hours="specialHours"]
      p
        span.ml3 With a single range of special hours:
        ssh-pre.mt1.ml3(language="js" :dark="store.darkMode").
          // In the component's data.
          specialHours: {
            wed: { from: 8 * 60, to: 20 * 60, class: 'open' }
          }
        br
        span.ml3 With multiple ranges of special hours:
        ssh-pre.mt1.ml3(language="js" :dark="store.darkMode").
          // In the component's data.
          specialHours: {
            wed: [
              { from: 8 * 60, to: 12 * 60, class: 'open' },
              { from: 14 * 60, to: 20 * 60, class: 'open' }
            ]
          }

  w-accordion-item
    template(#title)
      strong.code.title5 schedules
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code () => []
    template(#content)
      p.
        Split a day and its events in different persons/rooms/locations schedules.#[br]
        Each calendar event is exclusively owned and displayed in one of them.
        Accepts an array of objects defined like follows, where all attributes are optional:#[br]
      ssh-pre(language="js" :dark="store.darkMode").
        {
          id: {Integer}, // All ids must be set if using `hide`.
          class: {String},
          label: {String},
          hide: {Boolean} // You can toggle the column on and of with this.
        }

  w-accordion-item
    template(#title)
      strong.code.title5 snapToInterval
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p.
        Accepts an integer number of minutes from 0 to snap a dropped event or an event end time while resizing.#[br]
        For instance, with a #[span.code snapToInterval] of 15 min, an event dropped at 10:05,
        will snap to 10:00, and if dropped at 10:11 it will snap to 10:15.#[br]
        This option affects event resizing, event drag &amp; dropping, and event drag-creation.

  w-accordion-item
    template(#title)
      strong.code.title5 startWeekOnSunday
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p Shows Sunday before Monday in days, week and month views. By default the week starts on Monday.

  w-accordion-item
    template(#title)
      strong.code.title5 stackEvents
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p Stack events on top of each other when they overlap.
      alert(tip).
        Alternatively, you can use the event stacking class (based on the stack position and length) to override
        the default stacking behavior to your liking via CSS (you will need to use #[code !important]).#[br]
        Example of classes for three overlapping events: #[code vuecal__event--stack-1-3], #[code vuecal__event--stack-2-3], #[code vuecal__event--stack-3-3].

  w-accordion-item
    template(#title)
      strong.code.title5 theme
      .type [String, Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code 'default'
    template(#content)
      p Only adds a CSS class when set to default.

  w-accordion-item
    template(#title)
      strong.code.title5 time
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p.
        Whether you want to display the timeline and handle events with time or only date.#[br]
        Note that time is made of #[span.code hours:minutes] #[strong.ml2 and no second].

  w-accordion-item
    template(#title)
      strong.code.title5 timeCellHeight
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 40
    template(#content)
      p In pixels.

  w-accordion-item
    template(#title)
      strong.code.title5 timeFormat
      .type [String]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p.mb2.
        When defined, overrides the default time format in time cells and events.#[br]
        Formatted time can contain any character but the following characters will be replaced:
      ul.ml3
        li #[strong.code H]: Hours no leading zero, 24-hour format
        li #[strong.code HH]: Hours with leading zero, 24-hour format
        li #[strong.code h]: Hours no leading zero, 12-hour format
        li #[strong.code hh]: Hours with leading zero, 12-hour format
        li #[strong.code m]: Minutes no leading zero
        li #[strong.code mm]: Minutes with leading zero
        li #[strong.code {am}]: am or pm
        li.
          The characters `#[strong.code {]` and `#[strong.code }]` are removed and used only to
          delimit keywords when there is no space.#[br]
          E.g. #[span.code "h:mm{am}"].

  w-accordion-item
    template(#title)
      strong.code.title5 timeFrom
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p.
        Start time (in minutes) displayed in the timeline for each day in the schedule
        view. By default it starts at midnight.

  w-accordion-item
    template(#title)
      strong.code.title5 timeStep
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 60
    template(#content)
      p.
       Granularity of the time intervals (in minutes) displayed in the timeline for each day in the
       schedule view.

  w-accordion-item
    template(#title)
      strong.code.title5 timeTo
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 24 * 60
    template(#content)
      p.
        Final time (in minutes) displayed in the timeline for each day in the schedule
        view. By default it ends at midnight.

  w-accordion-item
    template(#title)
      strong.code.title5 titleBar
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p Show or hide the header title bar.

  w-accordion-item
    template(#title)
      strong.code.title5 todayButton
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p Show or hide the header today button that allows to quickly navigate to Today's date.

  w-accordion-item
    template(#title)
      strong.code.title5 twelveHour
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        12-hour or 24-hour formats are respectively written like 7am and 07:00 or like 1pm and 13:00.#[br]
        The default time format is 24-hour.

  w-accordion-item
    template(#title)
      strong.code.title5 view
      .type [String]
      | ,
      .body.grey.mx1 default:
      strong.default.code 'week'
    template(#content)
      p.
        Sets a default active view, for the first time you load the calendar.#[br]
        Then control the active view from outside of Vue Cal.#[br]
        Accepts one of 'years', 'year', 'month', 'week', 'days', 'day'.#[br]
        The active view has a two-way binding: you can use a v-model to keep your variable up to date.

  w-accordion-item
    template(#title)
      strong.code.title5 viewDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p The view will automatically set its start and end to present this date.

  w-accordion-item
    template(#title)
      strong.code.title5 viewDayOffset
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code.title5 views
      .type [Array, Object]
      | ,
      .body.grey.mx1 default:
      strong.default.code ['day', 'days', 'week', 'month', 'year', 'years']
    template(#content)
      p.
        Accepts an array of strings among these values: 'day', 'days', 'week', 'month', 'year', 'years'.#[br]
        It will dictate which view is available and can be navigated to.
        You can also provide an object with the same keys ('day', 'days', 'week', 'month', 'year', 'years')
        if you want to override its default grid layout.
        For instance, this is the defaults:
      ssh-pre(language="js" :dark="store.darkMode").
        availableViews: {
          day: { cols: 1, rows: 1 },
          days: { cols: 10, rows: 1 },
          week: { cols: 7, rows: 1 },
          month: { cols: 7, rows: 6 },
          year: { cols: 4, rows: 3 },
          years: { cols: 5, rows: 5 } // Arbitrary range of quarters of century (25y).
        }

  w-accordion-item
    template(#title)
      strong.code.title5 viewsBar
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p Show or hide the headers view selection bar.

  w-accordion-item
    template(#title)
      strong.code.title5 watchRealTime
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        More expensive, so only trigger on demand.#[br]
        When set to #[span.code true], the current time line in today's cell, on #[span.code week] and
        #[span.code day] views, will stay in sync with real time.#[br]
        #[span.grey (This requires a #[span.code setTimeout] every minute)]

  w-accordion-item
    template(#title)
      strong.code.title5 weekNumbers
      .type [Boolean, String]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        When set to #[span.code true], the weeks numbers will show in the first column on the
        #[span.code month] view (only).#[br]
        You can also provide a custom renderer to the weeks numbers cells through the
        #[span.code week-number-cell] slot.
      alert
        a#there-can-be-53-weeks-in-a-year
        strong Did you know there can be 53 weeks in the year?#[br]
        | This happens every time the year starts a Thursday, or starts a Wednesday of a leap year.
        | In this case the week number will be 53 instead of 1.

  w-accordion-item
    template(#title)
      strong.code.title5 xs
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        Extra small size for date pickers (truncates texts + specific styles).#[br]
        When set to #[span.code true], the days of the week headings will be truncated to 1 letter.#[br]
        Does not apply to the title of the day view.#[br]
        In Addition, the whole calendar gets applied a smaller font size
        and the current view title size is also reduced.

  //- TO DO LATER.
  //- w-accordion-item
    template(#title)
      strong.code.title5 minEventWidth
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p.
        When a number is set, in percent, each event within a cell will have a minimum width.#[br]
        If the provided percentage is bigger than what it would naturally be, the events will partially overlap.

  //- w-accordion-item
    template(#title)
      strong.code.title5 overlapsPerTimeStep
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        When set to #[span.code true], each event of the same cell will have a width of
        #[span.code 100% / [number of simultaneous events]] only if these events are within the same time step.#[br]
        Refer to #[a(href="https://github.com/antoniandre/vue-cal/pull/182" target="_blank") this use case].

  //- w-accordion-item
    template(#title)
      strong.code.title5 resizeX
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        When set to #[span.code true], allows resizing an event across multiple days.#[br]
        Resizing on the X axis is only available on #[span.code week] view.

h2.w-flex.justify-space-between.mb2
  title-link(div anchor="emitted-events") Emitted Events
  w-switch.my1.body(@update:model-value="expandedEmittedEvents = Array(50).fill($event)") Expand All

w-accordion(
  v-model="expandedEmittedEvents"
  expand-icon-rotate90
  title-class="pa0 bd0 body"
  content-class="pt1 pr0 pb6 pl7")
  h5.mt2.base-color Core Events
  w-accordion-item
    template(#title)
      strong.code.title5 ready
    template(#content)
      p Fired as soon as Vue Cal is mounted in the DOM and ready.
      p Returns an object containing:
      ul
        li #[code config]: The Vue Cal configuration object.
        li #[code view]: The Vue Cal view object.
  w-accordion-item
    template(#title)
      strong.code.title5 view-change
    template(#content)
      p Fired on every view change, navigation, or when events are added/removed.
      p Returns an object containing:
      ul
        li #[code id] #[code {String}]: The view ID. Possible values: 'day', 'days', 'week', 'month', 'year', 'years'.
        li #[code title] #[code {String}]: The view computed title, e.g. "October 2024".
        li #[code start] #[code {Date}]: The view primary start date (active days only).
        li #[code end] #[code {Date}]: The view primary end date (active days only).
        li #[code fullRangeStart] #[code {Date}]: The view extended start date including out-of-scope days.
        li #[code fullRangeEnd] #[code {Date}]: The view extended end date including out-of-scope days.
        li #[code cellDates] #[code {Array}]: An array of objects containing start and end dates for each cell in view.
        li #[code containsToday] #[code {Boolean}]: Whether the view contains the current date.
        li #[code events] #[code {Array}]: An array containing all the events in the current view.
        li #[code viewDate] #[code {Date}]: The reference date used to calculate the view.
        li #[code selectedDate] #[code {Date}]: The currently selected date (if any).
        li #[code now] #[code {Date}]: The current date and time.
        li View-specific flags: #[code isDay], #[code isDays], #[code isWeek], #[code isMonth], #[code isYear], #[code isYears]
  w-accordion-item
    template(#title)
      strong.code.title5 update:view
    template(#content)
      p Fired when the view changes. Part of v-model binding for the view property.
      p Returns: #[code {String}] The ID of the current view (e.g. 'day', 'week', 'month', etc.)
  w-accordion-item
    template(#title)
      strong.code.title5 update:selectedDate
    template(#content)
      p Fired when a date is selected in the calendar. Part of v-model binding for the selectedDate property.
      p Returns: #[code {Date}] The selected date as a JavaScript Date object.
  w-accordion-item
    template(#title)
      strong.code.title5 update:viewDate
    template(#content)
      p Fired when the view date changes (e.g., when navigating to different dates). Part of v-model binding for the viewDate property.
      p Returns: #[code {Date}] The new view date as a JavaScript Date object.
  w-accordion-item
    template(#title)
      strong.code.title5 update:events
    template(#content)
      p Fired when events are created, modified, or deleted. Part of v-model binding for the events property.
      p Returns: #[code {Array}] The updated array of calendar events.

  h5.mt2.base-color Cell-related Events
  w-accordion-item
    template(#title)
      strong.code.title5 cell-*
    template(#content)
      p Vue Cal forwards any DOM event on cells, where * can be any valid DOM event name.
      p Returns: The native event object plus cell date information.
  w-accordion-item
    template(#title)
      strong.code.title5 cell-drag-start
    template(#content)
      p Fired when starting to drag on a cell (when creating events by dragging).
      p Returns: #[code {Date}] The cell's date with time at cursor position.
  w-accordion-item
    template(#title)
      strong.code.title5 cell-drag
    template(#content)
      p Fired continuously while dragging on cells (when creating events by dragging).
      p Returns: #[code {Date}] The current cell's date with time at cursor position.
  w-accordion-item
    template(#title)
      strong.code.title5 cell-drag-end
    template(#content)
      p Fired when ending a drag on cells (when creating events by dragging).
      p Returns: #[code {Date}] The final cell's date with time at cursor position.
  w-accordion-item
    template(#title)
      strong.code.title5 cell-hold
    template(#content)
      p Fired when a cell is clicked and held for a specific duration.
      p Returns: #[code {Date}] The cell's date.

  h5.mt2.base-color Event-related Events
  w-accordion-item
    template(#title)
      strong.code.title5 event-*
    template(#content)
      p Vue Cal forwards any DOM event on events, where * can be any valid DOM event name.
      p Returns: The native event object plus the calendar event object.
  w-accordion-item
    template(#title)
      strong.code.title5 event-hold
    template(#content)
      p Fired when an event is clicked and held for a specific duration.
      p Returns: #[code {Object}] The associated calendar event object.
  w-accordion-item
    template(#title)
      strong.code.title5 event-create
    template(#content)
      p Fired when an event is created via drag creation or programmatically via the Vue Cal #[code view.createEvent()] method.
      p Returns: #[code {Object}] The newly created calendar event object.
  w-accordion-item
    template(#title)
      strong.code.title5 event-created
    template(#content)
      p Fired after an event has been created and its DOM node has been mounted. Useful for UI operations like scrolling to the new event.
      p Example use:
      ssh-pre.mt1(language="js" :dark="store.darkMode").
        @event-created="event => event._.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })")
      p Returns: #[code {Object}] The created calendar event object with its DOM node reference accessible via #[code event._.$el].
  w-accordion-item
    template(#title)
      strong.code.title5 event-delete
    template(#content)
      p Fired when an event is being deleted.
      p Returns: #[code {Object}] The calendar event object being deleted.
  w-accordion-item
    template(#title)
      strong.code.title5 event-drag-start
    template(#content)
      p Fired when starting to drag an existing event.
      p Returns: #[code {Object}] The calendar event object with current cursor position information.
  w-accordion-item
    template(#title)
      strong.code.title5 event-drag
    template(#content)
      p Fired continuously while dragging an event.
      p Returns: #[code {Object}] The calendar event object with current cursor position information.
  w-accordion-item
    template(#title)
      strong.code.title5 event-drag-end
    template(#content)
      p Fired when ending the drag of an event.
      p Returns: #[code {Object}] The calendar event object with final position information.
  w-accordion-item
    template(#title)
      strong.code.title5 event-resize-start
    template(#content)
      p Fired when starting to resize an event.
      p Returns an object containing:
      ul
        li #[code e]: The native DOM event object.
        li #[code event]: The calendar event object being resized.
  w-accordion-item
    template(#title)
      strong.code.title5 event-resize
    template(#content)
      p Fired repeatedly while resizing an event.
      p.grey For performance reasons, returns a lighter object containing:
      ul
        li #[code _eid]: The calendar event internal ID.
        li #[code end]: The calendar event new end Date.
        li #[code endTimeMinutes]: The calendar event new end time in minutes.
      alert(warning).
        You should only listen to this event if you have no choice. In most cases you should
        listen to #[code event-resize-end] instead (fired only once at the end of the resizing).
  w-accordion-item
    template(#title)
      strong.code.title5 event-resize-end
    template(#content)
      p Fired when the event resizing is ended.
      p Returns an object containing:
      ul
        li #[code e]: The native DOM event object.
        li #[code event]: The calendar event object with updated start, end and schedule properties.
        li #[code overlaps]: An array of all the overlapping events, or empty array if none.
        li #[code cell]: The cell object where the event was resized.
        li #[code external]: Boolean indicating if the event is from an external Vue Cal instance.
  w-accordion-item
    template(#title)
      strong.code.title5 event-drop
    template(#content)
      p.
        Fired as soon as the event is dropped. If there is a listener, it must return true or false to
        accept or reject the event drop at the new position.
      p Returns an object containing:
      ul
        li #[code e]: The native DOM event object.
        li #[code event]: The calendar event object with updated start, end and schedule properties.
        li #[code overlaps]: An array of all the overlapping events, or empty array if none.
        li #[code cell]: The cell object where the event was dropped.
        li #[code external]: Boolean indicating if the event is from an external Vue Cal instance.

  w-accordion-item
    template(#title)
      strong.code.title5 event-dropped
    template(#content)
      p.
        Fired after an event has been successfully dropped and the drop has been accepted. Unlike #[code event-drop],
        this event is purely informational and doesn't expect a return value.
      p Returns an object containing:
      ul
        li #[code e]: The native DOM event object.
        li #[code event]: The updated calendar event object.
        li #[code originalEvent]: The original event object before it was dropped.
        li #[code cell]: The cell object where the event was dropped.
        li #[code external]: Boolean indicating if the event is from an external Vue Cal instance.

  h5.mt2.base-color Event Payload Structure Details

  w-accordion-item
    template(#title)
      strong.code.title5 Cell Event Payload Structure
    template(#content)
      p All cell-related events (like #[code cell-click], #[code cell-drag], etc.) return a consistent payload with:
      ssh-pre(language="js" :dark="store.darkMode").
        {
          e: {Event}, // The native DOM event
          cell: {
            start: {Date}, // The cell start date & time
            end: {Date}, // The cell end date & time
            events: {ComputedRef}, // List of events in this cell
            schedule: {Number}, // (if applicable) The schedule ID
            // Navigation methods
            goNarrower: {Function},
            goBroader: {Function},
            broader: {String}, // ID of the broader view
            narrower: {String} // ID of the narrower view
          },
          cursor: {
            x: {Number}, // Cursor X position in percentage within cell
            y: {Number}, // Cursor Y position in percentage within cell
            date: {Date} // Date at cursor position (includes time)
          }
        }
      p.
        For events triggered by the cell's DOM events (like #[code cell-click], #[code cell-dblclick], etc.), the cursor
        position is calculated at the moment of the event, providing the exact time at the click position.
      p.
        For drag events (#[code cell-drag-start], #[code cell-drag], #[code cell-drag-end]), the cursor position is
        continuously tracked during the drag operation.

  w-accordion-item
    template(#title)
      strong.code.title5 Event Event Payload Structure
    template(#content)
      p All event-related events (like #[code event-click], #[code event-drag], etc.) return a consistent payload with:
      ssh-pre(language="js" :dark="store.darkMode").
        {
          e: {Event}, // The native DOM event
          event: {Object} // The full calendar event object
        }
      p.
        The event object contains all the properties of the calendar event, including both custom properties
        and internal properties (accessible via the #[code _] property).
      p For specialized events like #[code event-resize], the payload contains additional context:
      ssh-pre(language="js" :dark="store.darkMode").
        // event-resize-start and event-resize-end
        {
          e: {Event}, // The native DOM event
          event: {Object}, // The event being resized
          original: {Object}, // For resize-end: Original event before resizing
          overlaps: {Array} // Events that overlap with the resized event
        }

        // event-resize (during resize)
        {
          _eid: {Number}, // Internal event ID
          end: {Date}, // New end date during resize
          endTimeMinutes: {Number} // New end time in minutes
        }

      p For drag &amp; drop operations, the payload includes context about the source and destination:
      ssh-pre(language="js" :dark="store.darkMode").
        // event-drop
        {
          e: {Event}, // The native DOM event
          event: {Object}, // The event being dropped with updated properties
          overlaps: {Array}, // Events that overlap with the dropped event
          cell: {Object}, // The cell where the event is being dropped
          external: {Boolean} // If the event comes from another Vue Cal instance
        }

  w-accordion-item
    template(#title)
      .title5 Additional Notes About The Internal Manual Event Forwarding
    template(#content)
      p.
        Vue Cal uses two different mechanisms for event handling: the standard Vue event emission system
        and direct DOM event forwarding.
      p.
        For DOM events on cells and events (like click, dblclick, mousedown, etc.), Vue Cal automatically
        forwards these events by adding listeners to the cell and event elements. When these events occur,
        Vue Cal enriches them with additional context (cell info, event info, cursor position) before
        passing them to your handlers.
      ssh-pre(language="js" :dark="store.darkMode").
        // Example of what happens internally:
        eventListeners.click = e => {
          // First process internal logic
          onCellClick();

          // Then forward to external handler with enriched context
          externalHandlers.click?.({
            e,
            cell: cellInfo.value,
            cursor: getTimeAtCursor(e)
          });
        }
      p.
        This approach allows Vue Cal to provide a consistent, rich API for all events while still
        maintaining the natural DOM event behavior. It also enables advanced features like the
        "delayed-click" event that waits to ensure it's not part of a double-click.

h2.w-flex.justify-space-between.mb2
  title-link(div anchor="slots") Slots
  w-switch.my1.body(@update:model-value="expandedSlots = Array(50).fill($event)") Expand All

w-accordion(
  v-model="expandedSlots"
  expand-icon-rotate90
  title-class="pa0 bd0 body"
  content-class="pt1 pr0 pb6 pl7")
  w-accordion-item
    template(#title)
      strong.code.title5 diy
    template(#content)
      p The "Do It Yourself" slot allows complete customization of the calendar. When this slot is used, the default calendar structure is replaced entirely by your custom content.
      p This is useful for creating entirely custom calendar interfaces while still utilizing Vue Cal's core functionality.
      p Available parameters:
      ul
        li
          | #[code.base-color vuecal] - The core Vue Cal object with all methods and properties.
          p The core Vue Cal object contains:
          ul
            li #[code.base-color available-views] - An object containing all the available views
            li #[code.base-color config] - The calendar configuration object
            li #[code.base-color dateUtils] - The date utilities methods
            li #[code.base-color eventsManager] - The events manager object containing the events array and methods to manipulate it
            li #[code.base-color dnd] - The drag and drop manager object
            li #[code.base-color now] - The current date
            li #[code.base-color texts] - The localized texts
            li #[code.base-color touch] - The gestures and interactions manager object
            li #[code.base-color uid] - The unique identifier of the calendar instance
            li #[code.base-color view] - The current view object with all its properties

  w-accordion-item
    template(#title)
      strong.code.title5 header
    template(#content)
      p Allows complete customization of the calendar's header section, replacing the title bar and views bar.
      p Available parameters:
      ul
        li #[code.base-color view] - The current view object
        li #[code.base-color available-views] - An object containing all the available views
        li #[code.base-color vuecal] - If you really need more, the Vue Cal object contains everything
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #header="{ view, availableViews, vuecal }"&gt;
          &lt;div class="custom-header"&gt;
            &lt;h2&gt;{{ '\{\{ view.title \}\}' }}&lt;/h2&gt;
            &lt;div class="view-buttons"&gt;
              &lt;button
                v-for="(grid, viewId) in availableViews"
                @click="vuecal.view.switch(viewId)"
                :class="{ active: view.id === viewId }"&gt;
                {{ '\{\{ viewId \}\}' }}
              &lt;/button&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 title
    template(#content)
      p Customizes the title display in the calendar header. This slot is ignored if the header slot is used.
      p Available parameters:
      p This slot receives the full #[code.base-color view] object which contains:
      ul
        li #[code.base-color title] - The formatted title string for the current view
        li #[code.base-color id] - The ID of the current view (e.g., 'day', 'week', 'month')
        li #[code.base-color start] - The start date of the view
        li #[code.base-color end] - The end date of the view
        li View-specific flags like #[code.base-color isDay], #[code.base-color isWeek], etc.
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #title="view"&gt;
          &lt;code&gt;{{ '\{\{ view.title \}\}' }}&lt;/code&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 title.[view]
    template(#content)
      p.
        Customizes the title display in the calendar header for a specific view only.
        This slot is ignored if the header slot is used.
      p Available parameters:
      p This slot receives the full #[code.base-color view] object which contains:
      ul
        li #[code.base-color title] - The formatted title string for the current view
        li #[code.base-color id] - The ID of the current view (e.g., 'day', 'week', 'month')
        li #[code.base-color start] - The start date of the view
        li #[code.base-color end] - The end date of the view
        li View-specific flags like #[code.base-color isDay], #[code.base-color isWeek], etc.
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #title.day="view"&gt;
          &lt;em&gt;{{ '\{\{ view.title \}\}' }} ❤️&lt;/em&gt;
        &lt;/template&gt;

        &lt;template #title.month="view"&gt;
          &lt;strong&gt;{{ '\{\{ view.title \}\}' }} 📆&lt;/strong&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 previous-button
    template(#content)
      p Customizes the previous navigation button. This slot is ignored if the header slot is used.
      p Example:
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #previous-button&gt;
          &lt;i class="icon mdi mdi-arrow-left"&gt;&lt;/i&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 next-button
    template(#content)
      p Customizes the next navigation button. This slot is ignored if the header slot is used.
      p Example:
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #next-button&gt;
          &lt;i class="icon mdi mdi-arrow-right"&gt;&lt;/i&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 today-button
    template(#content)
      p Customizes the "Today" button. This slot is ignored if the header slot is used.
      p Available parameters:
      ul
        li #[code.base-color navigate] - A function to navigate to today's date
        li #[code.base-color active] - Boolean indicating if the current view already contains today
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #today-button="{ navigate, active }"&gt;
          &lt;button @click="navigate" :disabled="active" class="custom-today-btn"&gt;
            Today
          &lt;/button&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 weekday-heading
    template(#content)
      p Customizes the weekday headings in day, days, week, and month views.
      p Available parameters:
      ul
        li #[code.base-color label] - The day label (varies based on calendar size - full, abbreviated, or single letter)
        li #[code.base-color id] - The day identifier (mon, tue, wed, etc.)
        li #[code.base-color date] - The date of this particular day
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #weekday-heading="{ label, id, date }"&gt;
          &lt;strong :class="id"&gt;{{ '\{\{ label \}\}' }}&lt;/strong&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 schedule-heading
    template(#content)
      p Customizes the schedule headings when schedules are enabled.
      p Available parameters:
      ul
        li #[code.base-color schedule] - The schedule object containing id, label, and class
        li #[code.base-color view] - The current view object
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #schedule-heading="{ schedule, view }"&gt;
          &lt;i class="icon mdi mdi-account"&gt;&lt;/i&gt;
          &lt;strong :style="`color: ${schedule.color}`"&gt;{{ '\{\{ schedule.label \}\}' }}&lt;/strong&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 time-cell
    template(#content)
      p Customizes the time column cells in views that display time (day, days, week).
      p Available parameters:
      ul
        li #[code.base-color index] - The index of the time cell
        li #[code.base-color minutes] - Minutes component of the time (0-59)
        li #[code.base-color hours] - Hours component of the time (0-23)
        li #[code.base-color minutesSum] - The total time in minutes
        li #[code.base-color format12] - Formatted 12-hour time string (e.g., "7am")
        li #[code.base-color format24] - Formatted 24-hour time string (e.g., "07:00")
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #time-cell="{ format24, format12 }"&gt;
          &lt;strong&gt;{{ '\{\{ format24 \}\}' }}&lt;/strong&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 week-number-cell
    template(#content)
      p Customizes the week number cells when the weekNumbers option is enabled.
      p By default, this slot has no parameters and simply displays the week number.
      p Example:
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #week-number-cell&gt;
          &lt;span class="custom-week-number"&gt;W{{ '\{\{ weekNumber \}\}' }}&lt;/span&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 cell
    template(#content)
      p Completely customizes a calendar cell. This is a powerful slot that replaces the entire cell content.
      p Available parameters:
      ul
        li #[code.base-color cell] - The cell object containing date information and events
      p The cell object contains:
      ul
        li #[code.base-color start] - Start date and time of the cell
        li #[code.base-color end] - End date and time of the cell
        li #[code.base-color events] - Array of events in this cell
        li #[code.base-color formattedDate] - Formatted date string
        li #[code.base-color view] - The current view object
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #cell="{ cell }"&gt;
          &lt;div class="custom-cell"&gt;
            &lt;div class="date"&gt;{{ '\{\{ cell.formattedDate \}\}' }}&lt;/div&gt;
            &lt;div v-for="event in cell.events" class="event"&gt;
              {{ '\{\{ event.title \}\}' }}
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 cell-date
    template(#content)
      p Customizes the date display in a calendar cell. This slot is ignored if the cell slot is used.
      p Available parameters:
      ul
        li #[code.base-color cell] - The cell object with all its properties
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #cell-date="{ cell }"&gt;
          &lt;div class="custom-date-display"&gt;{{ '\{\{ cell.formattedDate \}\}' }}&lt;/div&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 cell-content
    template(#content)
      p Customizes additional content in a calendar cell. This slot is ignored if the cell slot is used.
      p Available parameters:
      ul
        li #[code.base-color cell] - The cell object with all its properties
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #cell-content="{ cell }"&gt;
          &lt;div class="custom-content"&gt;
            &lt;i class="icon mdi mdi-party-popper"&gt;&lt;/i&gt;
          &lt;/div&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 cell-events
    template(#content)
      p Customizes how events are displayed within a cell. This slot is ignored if the cell slot is used.
      p Available parameters:
      ul
        li #[code.base-color cell] - The cell object containing the events array
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #cell-events="{ cell }"&gt;
          &lt;div v-for="event in cell.events" class="custom-event"&gt;
            {{ '\{\{ event.title \}\}' }} ({{ '\{\{ event.start.formatTime() \}\}' }})
          &lt;/div&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 event
    template(#content)
      p Customizes the display of individual events. This slot is ignored if the cell-events slot is used.
      p Available parameters:
      ul
        li #[code.base-color event] - The full event object
      p This allows you to access any custom properties you've added to your events.
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #event="{ event }"&gt;
          &lt;div class="custom-event-content"&gt;
            &lt;i v-if="event.icon" :class="event.icon"&gt;&lt;/i&gt;
            &lt;div class="title"&gt;{{ '\{\{ event.title \}\}' }}&lt;/div&gt;
            &lt;div v-if="event.location" class="location"&gt;
              &lt;i class="mdi mdi-map-marker"&gt;&lt;/i&gt; {{ '\{\{ event.location \}\}' }}
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 event.all-day
    template(#content)
      p Customizes the display of all-day events. This slot is ignored if the cell-events slot is used.
      p Available parameters:
      ul
        li #[code.base-color event] - The full event object
      p This allows you to access any custom properties you've added to your events.
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #event.all-day="{ event }"&gt;
          &lt;div class="custom-event-content"&gt;
            &lt;i v-if="event.icon" :class="event.icon"&gt;&lt;/i&gt;
            &lt;div class="title"&gt;{{ '\{\{ event.title \}\}' }}&lt;/div&gt;
            &lt;div v-if="event.location" class="location"&gt;
              &lt;i class="mdi mdi-map-marker"&gt;&lt;/i&gt; {{ '\{\{ event.location \}\}' }}
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 event.[view]
    template(#content)
      p Customizes the display of events in a specific view where #[code="[view]"] is one of: day, days, week, month, year, years.<br>This slot is ignored if the cell-events slot is used.
      p Available parameters:
      ul
        li #[code.base-color event] - The full event object
      p This allows you to access any custom properties you've added to your events.
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #event.day="{ event }"&gt;
          &lt;div class="custom-event-content"&gt;
            &lt;i v-if="event.icon" :class="event.icon"&gt;&lt;/i&gt;
            &lt;div class="title"&gt;{{ '\{\{ event.title \}\}' }}&lt;/div&gt;
            &lt;div v-if="event.location" class="location"&gt;
              &lt;i class="mdi mdi-map-marker"&gt;&lt;/i&gt; {{ '\{\{ event.location \}\}' }}
            &lt;/div&gt;
          &lt;/div&gt;
        &lt;/template&gt;

  w-accordion-item
    template(#title)
      strong.code.title5 event-count
    template(#content)
      p Customizes the event count display when the #[code event-count] prop is enabled.
      p Available parameters:
      ul
        li #[code.base-color events] - Array of events in the cell
      p This allows you to modify how events are counted or displayed, such as counting only specific types of events.
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;template #event-count="{ events }"&gt;
          &lt;div v-if="events.length" class="custom-events-count"&gt;
            {{ '\{\{ events.filter(e => e.class === \'important\').length \}\}' }} important
            /
            {{ '\{\{ events.length \}\}' }} total
          &lt;/div&gt;
        &lt;/template&gt;
</template>

<script setup>
import { inject, ref } from 'vue'
import { useAppStore } from '@/store'
import { addDatePrototypes } from '@/vue-cal'

addDatePrototypes()

const store = useAppStore()
const locales = inject('locales')

const views = [
  { label: 'day', content: 'Displays a given single day in a a single cell.' },
  { label: 'days', content: 'Displays a given custom unlimited range of days, from 1 to x. Be aware that the more days displayed, the heavier work for the calendar and consumed API.' },
  { label: 'week', content: 'Displays a given 7-day week in 7 cells by default and at most, starting from Monday by default.<br>Other options can modify the order or number of days.' },
  { label: 'month', content: 'Displays a given month in a 6x7 cell grid by default and at most.' },
  { label: 'year', content: 'Displays a given year\'s months in a 4x3 cell grid. Usually for a date picker.<br>No event can be displayed on this view by default - only events counter - but you could use slots to build a custom UI.' },
  { label: 'years', content: 'Displays a range of 25 years in a 5x5 cell grid. Usually for date pickers.' }
]
const expandedViews = ref([...views].fill(false))
const expandedViewObject = ref(Array(10).fill(false))
const expandedEventObject = ref(Array(15).fill(false))
const expandedOptions = ref(Array(99).fill(false))
const expandedEmittedEvents = ref(Array(50).fill(false))
const expandedSlots = ref(Array(50).fill(false))
</script>

<style lang="scss">
.main--api {
  .w-accordion__item-title {flex-wrap: wrap;}
  .w-accordion__item-title code,
  .w-accordion__item-title .code {
    background-color: transparent;
    padding: 0;
  }
  .type {
    margin-left: 2px;
    color: #33c;
    font: 600 0.8em monospace;
    letter-spacing: -0.5px;
    word-spacing: -3px;
  }
  .default {color: #df5151;}
  [data-theme="dark"] & .type {color: #e67ad2;}
  [data-theme="dark"] & .default {color: #adcfa4;}
}
</style>
