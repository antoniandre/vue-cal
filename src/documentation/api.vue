<template lang="pug">
h1.title1 API

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

h2.w-flex.justify-space-between.mt12.mb2
  title-link(div anchor="view") The View Object
  .todo-tag.ml2.mra TO REVIEW
  w-switch.my1.body(@update:model-value="expandedViewVars = [...views].fill($event)") Expand All
p.caption.size--md.
  You can use the #[code.base-color view] object to access accurate information about the current view at any time.
  This is what it contains:
w-accordion.mt3(
  v-model="expandedViewVars"
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
          transitionDirection: "right",
          isDay: false,
          isDays: false,
          isWeek: false,
          isMonth: true,
          isYear: false,
          isYears: false,

          // Methods.
          scrollToCurrentTime, // Scrolls the calendar body to the current time.
          scrollToTime, // Scrolls the calendar body to the given time in minutes.
          scrollTop // Scrolls the calendar body to the top.
        }

h2.w-flex.justify-space-between.mt12.mb2
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
      strong.code clickToNavigate
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
      strong.code dark
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p Dark theme.

  w-accordion-item
    template(#title)
      strong.code datePicker
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        Sets the date picker format CSS-wise and logic as well.
        This option act like a shorthand for:
        #[code="{ xs: true, views: ['month', 'year', 'years'], clickToNavigate: true }"].

  w-accordion-item
    template(#title)
      strong.code events
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
            schedule: {Number|String} // Optional.
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
            you have to use the same #[span.code id] here (Integer or String).
          li.
            When the #[span.code showAllDayEvents] and #[span.code time] options are set to
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
      strong.code eventsOnMonthView
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
      strong.code hideWeekdays
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code () => []
    template(#content)
      p Accepts an array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.
      p Hide specific weekdays in month, week and days views.

  w-accordion-item
    template(#title)
      strong.code hideWeekends
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p Show or hide both Saturday and Sunday in days, week and month views.

  w-accordion-item
    template(#title)
      strong.code locale
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

      alert(tip).
        Note that 2 media queries will shorten the days of the week to 3 letters then 1 letter when it does not fit.
        #[br]You can read more about it in the # Responsiveness &amp; Media Queries section in the
        #[router-link(to="/getting-started#css-notes") CSS Notes].

  w-accordion-item
    template(#title)
      strong.code maxDate
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
      strong.code minDate
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
      strong.code selectedDate
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
      strong.code sm
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        Small size (truncates texts + specific styles).
        When set to #[span.code true], the days of the week headings will be truncated to 3 letters.#[br]
        Does not apply to the title of the day view.#[br]
        2 media queries are truncating the days of the week below 450px,
        read on in the #[router-link(to="/getting-started#css-notes") CSS Notes].

  w-accordion-item
    template(#title)
      strong.code specialHours
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
      strong.code schedules
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
          id: {Integer | String}, // All ids must be set if using `hide`.
          class: {String},
          label: {String},
          hide: {Boolean} // You can toggle the column on and of with this.
        }

  w-accordion-item
    template(#title)
      strong.code startWeekOnSunday
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p Shows Sunday before Monday in days, week and month views. By default the week starts on Monday.

  w-accordion-item
    template(#title)
      strong.code theme
      .type [String, Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code 'default'
    template(#content)
      p Only adds a CSS class when set to default.

  w-accordion-item
    template(#title)
      strong.code time
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
      strong.code timeCellHeight
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 40
    template(#content)
      p In pixels.

  w-accordion-item
    template(#title)
      strong.code timeFormat
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
      strong.code timeFrom
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
      strong.code timeStep
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
      strong.code timeTo
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
      strong.code titleBar
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p Show or hide the header title bar.

  w-accordion-item
    template(#title)
      strong.code todayButton
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p Show or hide the header today button that allows to quickly navigate to Today's date.

  w-accordion-item
    template(#title)
      strong.code transitions
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p Enables/disables the navigation CSS transitions between all the views and view states.

  w-accordion-item
    template(#title)
      strong.code twelveHour
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
      strong.code view
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
      strong.code viewDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p The view will automatically set its start and end to present this date.

  w-accordion-item
    template(#title)
      strong.code viewDayOffset
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code views
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
      strong.code viewsBar
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p Show or hide the headers view selection bar.

  w-accordion-item
    template(#title)
      strong.code watchRealTime
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
      strong.code xs
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











  //- TO DO NEXT.
  w-accordion-item
    template(#title)
      strong.code disableDays
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code () => []
    template(#content)
      p Accepts an array of formatted dates (e.g. #[span.code 2024-09-18]) of days to disable.

  w-accordion-item
    template(#title)
      strong.code dragToCreateThreshold
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 15
    template(#content)
      p.
        When events are editable and #[span.code time] and #[span.code editableEvents.create] are set to
        #[span.code true], this option controls the minimum dragging distance before an event is created.#[br]
        This option might be useful when you can navigate with cell click to prevent unwanted event creation in
        case of slipping cursor while clicking.#[br]
        With option gets to a positive integer, and you can set it to #[span.code 0] to disable it.
        Refer to the #[a(href="#ex--create-events") Create events] example.

  w-accordion-item
    template(#title)
      strong.code editableEvents
      .type [Boolean, Object]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p When #[span.code editableEvents] is set to #[span.code true], it allows:
      ul
        li Dragging and dropping events
        li Resizing events by dragging the handle showing at the bottom of each event if #[span.code time] is set to #[span.code true],
        li Deleting events by click and hold an event.
        li Editing events title
      alert
        ul
          li
            | You can set more accurately which edition you want to allow by passing an object.#[br]
            | For instance, this object will allow all the above editions except the drag &amp; drop:
            div.code.base-color { title: true, drag: false, resize: true, delete: true, create: true }
          li.
            You can still force an event to be undeletable or unresizable from the #[span.code deletable] &amp; #[span.code resizable] event attributes.
      ul
        li
          code.mr2 create
          p.
            When events are editable and if #[span.code time] is set to #[span.code true],
            clicking and dragging on a cell will create an event.#[br]
            Note: if this option is set to true, it will prevent event creation from cell click &amp; hold.#[br]
            Refer to the #[a(href="#ex--create-events") Create events] example.

  w-accordion-item
    template(#title)
      strong.code onEventCreate
      .type [Function, null]
      | ,
      .body.grey.mx1 default:
      strong.default.code null
    template(#content)
      p.
        A callback function to execute when an event is created.#[br]
        This function receives 2 parameters: #[span.code event], the created event,
        and #[span.code deleteEvent], a function to delete the created event.#[br]
        You can modify and override the received #[span.code event] and return it to vue-cal.#[br]
        If this function returns #[span.code false], the event creation will be cancelled.

  w-accordion-item
    template(#title)
      strong.code showWeekNumbers
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
      strong.code snapToTime
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p.
        Accepts a number of minutes from 0 to 60 to snap a dropped event or an event end time while resizing.#[br]
        For instance, with a #[span.code snapToTime] of 15 min, an event dropped at a start of 10:05,
        will snap to 10:00, and dropped at 10:11 will snap to 10:15.#[br]
        This option affects event resizing, event drag &amp; dropping, and event drag-creation.








  //- TO DO LATER.
  w-accordion-item
    template(#title)
      strong.code eventsCount
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        When set to #[code true], the events will be counted on #[code month], #[code year] &amp;
        #[code years] views and a number will appear in each cell that contain one or more events.#[br]
        You can customize the events count via CSS or via the #[code #events-count] slot.

  w-accordion-item
    template(#title)
      strong.code minEventWidth
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p.
        When a number is set, in percent, each event within a cell will have a minimum width.#[br]
        If the provided percentage is bigger than what it would naturally be, the events will partially overlap.


  w-accordion-item
    template(#title)
      strong.code overlapsPerTimeStep
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        When set to #[span.code true], each event of the same cell will have a width of
        #[span.code 100% / [number of simultaneous events]] only if these events are within the same time step.#[br]
        Refer to #[a(href="https://github.com/antoniandre/vue-cal/pull/182" target="_blank") this use case].

  w-accordion-item
    template(#title)
      strong.code resizeX
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        When set to #[span.code true], allows resizing an event across multiple days.#[br]
        Resizing on the X axis is only available on #[span.code week] view.

  w-accordion-item
    template(#title)
      strong.code showAllDayEvents
      .type [Boolean, String]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      ul
        li.mb2.
          When the #[span.code showAllDayEvents] is set to #[span.code true] the events with an
          #[span.code allDay] attribute set to #[span.code true] will be displayed in a fixed top
          bar on the #[span.code week] &amp; #[span.code day] views.#[br]
          The all day events bar will only show up if the options #[span.code showAllDayEvents] &amp;
          #[span.code time] are set to #[span.code true].#[br]
          #[span.code time] is important since without time information every event is an all-day
          event there is no point in separating them then.
        li.mb2.
          When #[span.code showAllDayEvents] is set to #[span.code false], all the all day events
          (#[span.code allDay] attribute set to #[span.code true]), will show up as a normal
          background event.
        li.mb2.
          On month view, switching #[span.code showAllDayEvents] on and off will not have any impact
          since both should display the all day events.
        li.mb2.
          #[span.code showAllDayEvents] accepts a #[span.code Boolean] or the string
          #[span.code 'short'], to display only the event title.

.todo-tag.d-iflex.mt6 ADD SLOTS &amp; EMITTED EVENTS?
</template>

<script setup>
import { inject, ref } from 'vue'
import { useAppStore } from '@/store'
import EnUs from '@/vue-cal/i18n/fr.json'
import { useLocale, addDatePrototypes } from '@/vue-cal'

useLocale(EnUs)
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
const expandedOptions = ref(Array(99).fill(false))
const expandedViewVars = ref(Array(99).fill(false))
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
