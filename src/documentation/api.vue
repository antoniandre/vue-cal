<template lang="pug">
h1.title1 API

h2.w-flex.justify-space-between.mb2
  title-link(tag="div" anchor="views") Existing Views
  w-switch.my1.body(@update:model-value="expandedViews = [...views].fill($event)") Expand All

w-accordion(
  v-model="expandedViews"
  :items="views"
  title-class="pl0 bd0"
  content-class="pt0 pb3"
  expand-icon-rotate90)
  template(#item-title="{ item }")
    strong.code {{ item.label }}

h2.w-flex.justify-space-between.mt12.mb2
  title-link(tag="div" anchor="options") Options
  w-switch.my1.body(@update:model-value="expandedOptions = Array(99).fill($event)") Expand All

p.caption.size--md.lh1.
  Options can be provided to &lg;vue-cal&gt; using a v-bind="configObject" or added one by one.#[br]
  In the latter case, both #[code.base-color camelCase] and #[code.base-color kebab-case] will work.

w-accordion.mt2(
  expand-icon-rotate90
  v-model="expandedOptions"
  title-class="pl0"
  content-class="pt1 pr0 pb6 pl7")
  w-accordion-item
    template(#title)
      strong.code view
      .type [String]
      | ,
      .body.grey.mx1 default:
      strong.default.code 'week'
    template(#content)
      span.code [String], default: 'week'
      p.
        Sets a default active view, for the first time you load the calendar.#[br]
        Then control the active view from outside of Vue Cal.#[br]
        Accepts one of 'years', 'year', 'month', 'week', 'days', 'day'.#[br]
        The active view has a two-way binding: you can use a v-model to keep your variable up to date.

  w-accordion-item
    template(#title)
      strong.code allDayBarHeight
      .type [String, Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code '25px'
    template(#content)

  w-accordion-item
    template(#title)
      strong.code cellClickHold
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)

  w-accordion-item
    template(#title)
      strong.code cellContextmenu
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code clickToNavigate
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code dblclickToNavigate
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)

  w-accordion-item
    template(#title)
      strong.code disableDatePrototypes
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code disableDays
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code []
    template(#content)

  w-accordion-item
    template(#title)
      strong.code disableViews
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code []
    template(#content)

  w-accordion-item
    template(#title)
      strong.code dragToCreateEvent
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)

  w-accordion-item
    template(#title)
      strong.code dragToCreateThreshold
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 15
    template(#content)

  w-accordion-item
    template(#title)
      strong.code editableEvents
      .type [Boolean, Object]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code events
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code []
    template(#content)

  w-accordion-item
    template(#title)
      strong.code eventsCountOnYearView
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code eventsOnMonthView
      .type [Boolean, String]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code hideBody
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code hideTitleBar
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code hideViewsBar
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code hideWeekdays
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code []
    template(#content)
      p.
        Hide particular days of the week. This option accepts an array of days (day numbers) to hide,
        #[strong starting at #[span.code 1] for Monday, to #[span.code 7] for Sunday].#[br]
        This option will apply on month &amp; week views.#[br]#[br]
        If you want to hide Saturday and Sunday you can put #[span.code 6, 7] in the array or use
        #[span.code hideWeekends] in supplement of #[span.code hideWeekdays].

  w-accordion-item
    template(#title)
      strong.code hideWeekends
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p.
        Hide the weekend and shows only Monday to Friday on month view and week view.#[br]
        The weekend are still visible in day view not to break the behavior of the arrows.#[br]
        Note that by hiding the arrows you won't be able to see a weekend day in day view if hideWeekends
        is true.

  w-accordion-item
    template(#title)
      strong.code locale
      .type [String]
      | ,
      .body.grey.mx1 default:
      strong.default.code 'en'
    template(#content)
      p.
        Allow translation of the calendar texts in a given language.#[br]
        Use a 2 letter locale code
        (#[a(href="https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes" target="_blank") ISO 639-1])
        unless a distinction is needed. E.g. #[span.code 'pt-br'] for Portuguese-Brasilian.
      highlight-message(type="info")
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

      highlight-message(type="tips").
        Note that 2 media queries will shorten the days of the week to 3 letters then 1 letter when it does not fit.
        #[br]You can read more about it in the # Responsiveness &amp; Media Queries section in the
        #[a(href="#css-notes") CSS Notes].

  w-accordion-item
    template(#title)
      strong.code maxDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)

  w-accordion-item
    template(#title)
      strong.code minCellWidth
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0 // In pixels.
    template(#content)

  w-accordion-item
    template(#title)
      strong.code minDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)

  w-accordion-item
    template(#title)
      strong.code minEventWidth
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0 // In percent.
    template(#content)

  w-accordion-item
    template(#title)
      strong.code minScheduleWidth
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0 // In pixels.
    template(#content)

  w-accordion-item
    template(#title)
      strong.code onEventClick
      .type [Function]
      | ,
      .body.grey.mx1 default:
      strong.default.code null
    template(#content)

  w-accordion-item
    template(#title)
      strong.code onEventCreate
      .type [Function]
      | ,
      .body.grey.mx1 default:
      strong.default.code null
    template(#content)

  w-accordion-item
    template(#title)
      strong.code onEventDblclick
      .type [Function]
      | ,
      .body.grey.mx1 default:
      strong.default.code null
    template(#content)

  w-accordion-item
    template(#title)
      strong.code overlapsPerTimeStep
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code resizeX
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code selectedDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p.
        Accepts a formatted string or plain JS Date object.#[br]
        Set a selected date, for the first time you load the calendar.#[br]
        This day will be highlighted and the first view will naturally show this date.#[br]
        E.g. setting a date in year 2000 with a activeView of week, will show you that week of year 2000.#[br]#[br]
        Updating the #[span.code selectedDate] programmatically after the first calendar load,
        will update the view if needed to show this date.#[br]
        Refer to the #[a(href="#ex--sync-two-calendars") Sync two vue-cal instances] example.#[br]
        The selected date has a two-way binding: you can use a v-model (or #[code .sync] on Vue 2) on it to
        keep your variable up to date.
      highlight-message(type="warning").
        A correct string date format is #[code {{ todayFormatted }}] or
        #[code="{{ todayFormatted.split(' ')[0] }}"] if you don't need the time.
        Only these formats will work as a string. You can also provide a native Javascript Date object.

  w-accordion-item
    template(#title)
      strong.code showAllDayEvents
      .type [Boolean, String]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code showTimeInCells
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code showWeekNumbers
      .type [Boolean, String]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code small
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code snapToTime
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code null
    template(#content)

  w-accordion-item
    template(#title)
      strong.code specialHours
      .type [Object]
      | ,
      .body.grey.mx1 default:
      strong.default.code {}
    template(#content)

  w-accordion-item
    template(#title)
      strong.code schedules
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code []
    template(#content)

  w-accordion-item
    template(#title)
      strong.code startWeekOnSunday
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code time
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)

  w-accordion-item
    template(#title)
      strong.code timeCellHeight
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 40 // In pixels.
    template(#content)

  w-accordion-item
    template(#title)
      strong.code timeFormat
      .type [String]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)

  w-accordion-item
    template(#title)
      strong.code timeFrom
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0 // In minutes.
    template(#content)

  w-accordion-item
    template(#title)
      strong.code timeStep
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 60 // In minutes.
    template(#content)

  w-accordion-item
    template(#title)
      strong.code timeTo
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 24 * 60 // In minutes.
    template(#content)

  w-accordion-item
    template(#title)
      strong.code todayButton
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code transitions
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)

  w-accordion-item
    template(#title)
      strong.code twelveHour
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code xs
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)

  w-accordion-item
    template(#title)
      strong.code watchRealTime
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)






  li
    code.mr2 hideViewsBar
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], the top view selector will disappear.#[br]
      You can still navigate from a view to another by clicking a cell (narrower view) or
      the view title (broader view).
  li
    code.mr2 hideTitleBar
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], the title bar with navigating arrows will disappear.#[br]
      You can still navigate from a view to another with the view selector and clicking
      a cell (narrower view).
  li
    code.mr2 hideBody
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], the whole calendar body will disappear - cells and timeline.#[br]
      Also means that all the logic usually triggered from the calendar's body won't run at all.
  li
    code.mr2 disableDays
    span.code [Array], default: []
    p Allows you to provide an array of formatted dates (e.g. #[span.code 2020-09-18]) to disable.
  li
    code.mr2 disableViews
    span.code [Array], default: []
    p.
      Allows you to totally disable one or more of the available views.#[br]
      Accepted view names are 'years', 'year', 'month', 'week', 'day'.#[br]
      Note that the navigation between views via cells click or title click won't
      break and will only navigate to views you have allowed.
  li
    code.mr2 dragToCreateEvent
    span.code [Boolean], default: true
    p.
      When events are editable and if #[span.code time] and #[span.code dragToCreateEvent] are set to
      #[span.code true], clicking and dragging on a cell will create an event.#[br]
      Note: if this option is set to true, it will prevent event creation from cell click &amp; hold.#[br]
      Refer to the #[a(href="#ex--create-events") Create events] example.
  li
    code.mr2 dragToCreateThreshold
    span.code [Number], default: 15
    p.
      When events are editable and #[span.code time] and #[span.code dragToCreateEvent] are set to
      #[span.code true], this option controls the minimum dragging distance before an event is created.#[br]
      This option might be useful when you can navigate with cell click to prevent unwanted event creation in
      case of slipping cursor while clicking.#[br]
      With option gets to a positive integer, and you can set it to #[span.code 0] to disable it.
      Refer to the #[a(href="#ex--create-events") Create events] example.
  li
    code.mr2 allDayBarHeight
    span.code [String, Number], default: '25px'
    p.
      When the all day bar is visible and Vue Cal is also scrollable horizontally (due to
      #[span.code minCellWidth] or day schedules with #[span.code minScheduleWidth]),
      the all-day bar must have a fixed height for this particular layout.#[br]
      Only if these conditions are fulfilled, the height provided through this option will be
      used. If none is provided the default height will be used.#[br]
      The height can be any valid CSS height (as a string) or an integer for an amount of pixels.
  li
    code.mr2 todayButton
    span.code [Boolean], default: false
    p Adds a Today button in the title bar to quickly go to Today's date.#[br]
  li
    code.mr2 showAllDayEvents
    span.code [Boolean, String], default: false
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
  li
    code.mr2 showWeekNumbers
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], the weeks numbers will show in the first column on the
      #[span.code month] view (only).#[br]
      You can also provide a custom renderer to the weeks numbers cells through the
      #[span.code week-number-cell] slot.
    highlight-message
      a#there-can-be-53-weeks-in-a-year
      strong Did you know there can be 53 weeks in the year?#[br]
      | This happens every time the year starts a Thursday, or starts a Wednesday of a leap year.
      | In this case the week number will be 53 instead of 1.
  li
    code.mr2 minDate
    span.code [String, Date], default: ''
    p.
      Accepts a formatted string or plain JS Date object.#[br]
      Set a minimum date for the cells to be selectable.#[br]
      By default the cell will be grayed out when out of range but CSS classes let you customize this.
  li
    code.mr2 maxDate
    span.code [String, Date], default: ''
    p.
      Accepts a formatted string or plain JS Date object.#[br]
      Set a maximum date for the cells to be selectable.#[br]
      By default the cell will be grayed out when out of range but CSS classes let you
      customize this.
  li
    code.mr2 specialHours
    span.code [Object], default: {}
    p.
      Allows an individual highlighted time range for each day of the week.#[br]
      For instance, it could represent the business hours.#[br]
      The object must contain indexed days, #[strong from 1 for Monday to 7 for Sunday], of the
      days you want to highlight.#[br]
      Each day must contain an object with a #[span.code from] and #[span.code to] properties
      defining the beginning and the end of the time range #[strong in minutes].#[br]
      In addition, you can set a CSS class for each day of the week.#[br]
      It is also possible to provide an array of special hours for the same day.#[br]
      A #[span.code label] can also be provided per special hour block, and styled via CSS.#[br]#[br]

    p.subtitle-1 Example for Wednesday: #[span.code :special-hours="specialHours"]
    p
      span.ml3 With a single range of special hours:
      ssh-pre.mt1.ml3(language="js" label="JavaScript" :dark="store.darkMode").
        // In the component's data.
        specialHours: {
          3: { from: 8 * 60, to: 20 * 60, class: 'open' }
        }
      br
      span.ml3 With multiple ranges of special hours:
      ssh-pre.mt1.ml3(language="js" label="JavaScript" :dark="store.darkMode").
        // In the component's data.
        specialHours: {
          3: [
            { from: 8 * 60, to: 12 * 60, class: 'open' },
            { from: 14 * 60, to: 20 * 60, class: 'open' }
          ]
        }

  li
    code.mr2 startWeekOnSunday
    span.code [Boolean], default: false
    p.
      By default weeks start on Monday but with this option you can start the week on Sunday.
  li
    code.mr2 small
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], the days of the week headings will be truncated to 3 letters.#[br]
      Does not apply to the title of the day view.#[br]
      2 media queries are truncating the days of the week below 450px,
      read on in the #[a(href="#css-notes") CSS Notes].
  li
    code.mr2 xs
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], the days of the week headings will be truncated to 1 letter.#[br]
      Does not apply to the title of the day view.#[br]
      In Addition, the whole calendar gets applied a smaller font size of 0.9em,
      and the current view title is also reduced.#[br]
      2 media queries are truncating the days of the week below 450px,
      read on in the #[a(href="#css-notes") CSS Notes].
  li
    code.mr2 transitions
    span.code [Boolean], default: true
    p Enable / disable the CSS transitions between all the views and view states.
  li
    code.mr2 clickToNavigate
    span.code [Boolean], default: false
    p.
      When set to #[span.code true] a single click (or tap for touch devices) will take you to a
      narrower view if available.#[br]
      You can always go back to a broader view by clicking the view title or selecting another view
      from the view selector if enabled.#[br]
      The navigation to narrower view can be disabled by setting both #[span.code clickToNavigate]
      and #[span.code dblclickToNavigate] to false.
  li
    code.mr2 dblclickToNavigate
    span.code [Boolean], default: true
    p.
      When set to #[span.code true] a double click (or double tap for touch devices) will take you to a
      narrower view if available.#[br]
      You can always go back to a broader view by clicking the view title or selecting another view
      from the view selector if enabled.#[br]
      The navigation to narrower view can be disabled by setting both #[span.code clickToNavigate]
      and #[span.code dblclickToNavigate] to false.
  li
    code.mr2 cellClickHold
    span.code [Boolean], default: true
    p.
      Allows you to disable the default event creation on cell click &amp; hold which only
      happens if #[span.code editableEvents.create] is set to #[span.code true].
  li
    code.mr2 cellContextmenu
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], a right click on a cell will emit the #[span.code cell-contextmenu] event,
      providing an object containing: the date and time at cursor, the x and y position of cursor, and the full original DOM event.
  li
    code.mr2 time
    span.code [Boolean], default: true
    p.
      Whether you want to display the timeline and handle events with time or only date.#[br]
      Note that time is made of #[span.code hours:minutes] #[strong.ml2 and no second].
  li
    code.mr2 timeFrom
    span.code [Number], default: 0
    p.
      If #[span.code time] is enabled, set the start of the timeline in minutes.
      By default it starts at midnight.
  li
    code.mr2 showTimeInCells
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], the time labels will be visible in
      each cell, in each time slot of the #[code day] and #[code week] views.
      You can then use CSS to style to taste.
      For instance, you could hide all the labels and show only the one that
      is being hovered.#[br]
      Will have no effect if #[span.code time] is set to false.
  li
    code.mr2 timeTo
    span.code [Number], default: 24 * 60
    p.
      If #[span.code time] is enabled, set the end of the timeline in minutes.
      By default it ends at 24:00.
  li
    code.mr2 timeStep
    span.code [Number], default: 60
    p.
      If #[span.code time] is enabled, set the time increment in minutes.
  li
    code.mr2 timeCellHeight
    span.code [Number], default: 40
    p.
      If #[span.code time] is enabled, set the time cell height in pixels.#[br]
      this is very important as it is used to calculate the events position in the day.
  li
    code.mr2 twelveHour
    span.code [Boolean], default: false
    p.
      If #[span.code time] is enabled, the default time format is 24 hour.#[br]
      With #[span.code twelveHour] set to #[span.code true] (use #[span.code twelve-hour] in template),
      the time format will show 12 hours suffixed with am/pm.
  li
    a(id="time-format" name="time-format")
    code.mr2 timeFormat
    span.code [String], default: ''
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
  li
    code.mr2 watchRealTime
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], the current time line in today's cell, on #[span.code week] and
      #[span.code day] views, will stay in sync with real time.#[br]
      #[span.grey (This requires a #[span.code setTimeout] every minute)]
  li
    code.mr2 minEventWidth
    span.code [Number], default: 0
    p.
      When a number is set, in percent, each event within a cell will have a minimum width.#[br]
      If the provided percentage is bigger than what it would naturally be, the events will partially overlap.
  li
    code.mr2 overlapsPerTimeStep
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], each event of the same cell will have a width of
      #[span.code 100% / [number of simultaneous events]] only if these events are within the same time step.#[br]
      Refer to #[a(href="https://github.com/antoniandre/vue-cal/pull/182" target="_blank") this use case].
  li
    code.mr2 minCellWidth
    span.code [Number], default: 0
    p.
      When a number is set, in pixels, each cell #[strong of the #[span.code week] view (only)]
      will have this minimum width.#[br]
      If it does not fit in the calendar body, the overflow will be scrollable.
      If #[span.code minScheduleWidth] is also set, it will override #[span.code minCellWidth].
  li
    code.mr2 minScheduleWidth
    span.code [Number], default: 0
    p.
      This is for day schedules only, and it applies to the
      #[strong #[span.code week] and #[span.code day] views (only)].#[br]
      When a number is set, in pixels, each schedule of each cell will have this minimum width.#[br]
      If it does not fit in the calendar body, the overflow will be scrollable.#[br]
      If #[span.code minCellWidth] is also set, #[span.code minScheduleWidth] will override it on
      #[span.code week] view.
  li
    code.mr2 schedules
    span.code [Array], default: []
    p
      | Split each day into multiple vertical schedules.#[br]
      | Accepts an array of schedule objects with attributes.#[br]
      | Each schedule object can have these attributes, they are all optional:
      ssh-pre(language="js" :dark="store.darkMode").
        {
          id: {Integer | String}, // All ids must be set if using `hide`.
          class: {String},
          label: {String},
          hide: {Boolean} // You can toggle the column on and of with this.
        }
  li
    code.mr2 editableEvents
    span.code [Boolean, Object], default: false
    p When #[span.code editableEvents] is set to #[span.code true], it allows:
    ul
      li Dragging and dropping events
      li Resizing events by dragging the handle showing at the bottom of each event if #[span.code time] is set to #[span.code true],
      li Deleting events by click and hold an event.
      li Editing events title
    highlight-message
      ul
        li
          | You can set more accurately which edition you want to allow by passing an object.#[br]
          | For instance, this object will allow all the above editions except the drag &amp; drop:
          div.code.base-color { title: true, drag: false, resize: true, delete: true, create: true }
        li.
          You can still force an event to be undeletable or unresizable from the #[span.code deletable] &amp; #[span.code resizable] event attributes.
  li
    code.mr2 resizeX
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], allows resizing an event across multiple days.#[br]
      Resizing on the X axis is only available on #[span.code week] view.
  li
    code.mr2 snapToTime
    span.code [Number], default: 0
    p.
      Accepts a number of minutes from 0 to 60 to snap a dropped event or an event end time while resizing.#[br]
      For instance, with a #[span.code snapToTime] of 15 min, an event dropped at a start of 10:05,
      will snap to 10:00, and dropped at 10:11 will snap to 10:15.#[br]
      This option affects event resizing, event drag &amp; dropping, and event drag-creation.
  li
    code.mr2 eventsOnMonthView
    span.code [Boolean, String], default: false
    p.
      When set to #[span.code true], the events will also be displayed on month view
      (including events from visible out of scope days).#[br]
      When set to the string '#[span.code short]', only the event's title will be displayed.
  li
    code.mr2 eventsCountOnYearView
    span.code [Boolean], default: false
    p.
      When set to #[span.code true], the events count will also be displayed on #[span.code years]
      &amp; #[span.code year] views.
  li
    code.mr2 onEventClick
    span.code [Function], default: null
    p.
      A callback function to execute when an event is clicked.#[br]
      this function receives 2 parameters: #[span.code event], the clicked calendar event,
      and #[span.code e], the associated JavaScript DOM event.
  li
    code.mr2 onEventDblclick
    span.code [Function], default: null
    p.
      A callback function to execute when an event is double clicked.#[br]
      this function receives 2 parameters: #[span.code event], the double clicked calendar event,
      and #[span.code e], the associated JavaScript DOM event.
  li
    code.mr2 onEventCreate
    span.code [Function], default: null
    p.
      A callback function to execute when an event is created.#[br]
      This function receives 2 parameters: #[span.code event], the created event,
      and #[span.code deleteEvent], a function to delete the created event.#[br]
      You can modify and override the received #[span.code event] and return it to vue-cal.#[br]
      If this function returns #[span.code false], the event creation will be cancelled.
  li
    code.mr2 events
    span.code [Array], default: []
    p.
      Allows you to place events in the calendar.#[br]
      Accepts an array of event objects.#[br]
      This is what an event object must look like:
    div
      ssh-pre.mt2(language="js" :dark="store.darkMode").
        {
          start: '2018-11-19 12:00', // Required.
          end: '2018-11-19 14:00', // Required.
          // Instead of formatted dates, you can also provide Javascript Date objects:
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

    highlight-message(type="warning")
      strong Important notes
      ul
        li.
          The events are internally identified by the key #[span.code `_eid`].
          #[strong This is a reserved keyword.]
        li.mt2
          | Correct date formats are #[code {{ todayFormatted }}],
          | or #[code="{{ todayFormatted.split(' ')[0] }}"] if you don't want any time in the whole calendar,
          | or a JavaScript #[code Date] object. Only these formats will work.#[br]
          strong.
            You can't mix events with time and events without, and you can only remove time if the #[span.code time]
            option is set to #[span.code false].
        li.mt2.
          You can set an event end at #[span.code 24:00] or #[span.code 00:00] (for the next midnight),
          #[strong but internally the date will be set at #[span.code 23:59:59]] so the date stays the same instead
          of natural behavior of taking the next day at #[span.code 00:00:00].#[br]
          When returned from emitted events, this event #[span.code end] will contain a date ending at #[span.code 23:59:59].
  li
    code.mr2 disableDatePrototypes
    span.code [Boolean], default: false
    p.
      If you really don't want the Date prototypes to be added, you can disable them with this option.#[br]
      Refer to #[a(href="https://github.com/antoniandre/vue-cal/issues/259" target="_blank" style="text-decoration: underline;color: inherit") This Vue Cal issue on Github].
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import { useAppStore } from '@/store'
import EnUs from '@/vue-cal/i18n/fr.json'
import { VueCal, useLocale, addDatePrototypes } from '@/vue-cal'
import TitleLink from '@/documentation/components/title-link.vue'
import HighlightMessage from '@/documentation/components/highlight-message.vue'

useLocale(EnUs)
addDatePrototypes()

const store = useAppStore()
const locales = inject('locales')

const now = new Date()
const nowFormatted = computed(() => Date.prototype.format && now.format('YYYY{MM}DD'))
const todayFormatted = computed(() => `${now.format()} ${now.formatTime()}`)

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
</script>

<style lang="scss">
.main--api {
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
