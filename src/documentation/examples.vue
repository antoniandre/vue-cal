<template lang="pug">
div
  h2.headline.mt-12.pt-12
    a(href="#examples") Examples
    a#examples(name="examples")
  highlight-message.mt-3(type="success" no-icon)
    v-layout
      v-icon.ml-1.mr-3(color="green lighten-2") fab fa-codepen
      div
        .title Try it yourself on Codepen. Here is a set of frequent use cases:
        ul
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/pGJWjL" target="_blank") Basic calendar],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/rPzWOJ" target="_blank") Calendar with events],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/jJbygw?editors=1010" target="_blank") Calendar with custom events on month view],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/abbVQLy?editors=1010" target="_blank") Calendar with custom title],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/WWRLgG?editors=1010" target="_blank") Calendar with custom cells],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/dxXvwv?editors=1010" target="_blank") Localized calendar (i18n)],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/MWWbZgK" target="_blank") 2 Vue Cal instances to show 2 weeks],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/jOOmxzo" target="_blank") 12 Vue Cal instances to show a full year view (slower - not recommended)],
          li #[a.ml-2(href="https://codepen.io/antoniandre/pen/rbpPab?editors=1010" target="_blank") How to fetch events from a back-end].

  h3.title
    a(href="#ex--basic")
      v-icon.mr-2 done
      | Basic
  //- Example.
  h4.title
    a(href="#ex--basic") # Basic with no timeline &amp; hidden weekends
    a#ex--basic(name="ex--basic")
  p
    | Double click cell to go to a narrower view and click the title to go to a broader view.#[br]
    | By default the calendar theme is grey to match with most of web pages.#[br]
    | You can easily change the color theme (#[a(href="#css-notes") learn how]): try this
    v-btn.ma-1(dark small :color="example1theme === 'green' ? 'rgba(66, 163, 185, 0.8)' : 'primary'" @click="example1theme = example1theme === 'green' ? 'blue' : 'green'") {{ example1theme === "green" ? 'blue theme' : 'green theme' }}
  v-card.my-2.ma-auto.main-content(style="height: 450px")
    vue-cal(:class="`vuecal--${example1theme}-theme`" :time="false" hide-weekends)
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal :time="false" hide-weekends /&gt;
  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h4.title
    a(href="#ex--small-cal") # Small calendar, no time, hidden view selector &amp; custom arrows
    a#ex--small-cal(name="ex--small-cal")
  p.
    Extra-small, no timeline, hidden view selector &amp; custom arrows (using the reserved slots #[span.code arrow-prev] &amp; #[span.code arrow-next]).#[br]
    With a hidden view selector, you can still navigate between the different views: double click cell to go to a narrower view, click title to go to a broader view.
  v-card.my-2.ma-auto.main-content(style="width: 250px;height: 260px")
    vue-cal.vuecal--green-theme(hide-view-selector :time="false" active-view="month" xsmall)
      template(v-slot:arrow-prev)
        v-icon arrow_back
      template(v-slot:arrow-next)
        v-icon arrow_forward
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal hide-view-selector :time="false" active-view="month" xsmall&gt;
      &lt;i v-slot:arrow-prev aria-hidden="true" class="v-icon material-icons"&gt;arrow_back&lt;/i&gt;
      &lt;i v-slot:arrow-next aria-hidden="true" class="v-icon material-icons"&gt;arrow_forward&lt;/i&gt;
    &lt;/vue-cal&gt;

  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h4.title
    a(href="#ex--calendar-themes") # Calendar themes - Rounded cells &amp; date picker
    a#ex--calendar-themes(name="ex--calendar-themes")
  p.
    You can easily change the calendar color theme or use the rounded-cells theme
    by applying the corresponding CSS class on the #[span.code &lt;vuecal&gt;] tag.#[br]
    E.g. #[span.code vuecal--rounded-theme], #[span.code vuecal--green-theme], #[span.code vuecal--blue-theme].
    Read more about calendar themes in the #[a(href="#css-notes") CSS Notes] section.
  p.
    Because Vue Cal has the potential out of the box, you can also use it as a date picker.#[br]
    Apply the css class #[span.code vuecal--date-picker] to have the date picker look bellow.#[br]
    you can also disable the transitions to have a fast effect.

  v-layout.ma-auto(justify-center wrap)
    v-card.ma-2.main-content(style="width: 270px;height: 300px")
      vue-cal.vuecal--rounded-theme.vuecal--blue-theme(
        xsmall
        hide-view-selector
        :time="false"
        active-view="month"
        :disable-views="['week']")
    v-card.ma-2.main-content(style="width: 270px;height: 300px")
      vue-cal.vuecal--rounded-theme.vuecal--green-theme(
        xsmall
        hide-view-selector
        :time="false"
        active-view="month"
        :disable-views="['week']")
    .layout.column.justify-center.shrink.pl-5
      v-card.ma-2.main-content(style="width: 210px;height: 230px")
        vue-cal.vuecal--date-picker(
          xsmall
          hide-view-selector
          :time="false"
          :transitions="false"
          active-view="month"
          :disable-views="['week']")
      .grey--text.text-center
        v-icon.pr-1(style="padding-bottom: 2px") keyboard_arrow_up
        | Date picker like
  .layout.wrap
    sshpre.flex.mr-2(language="html-vue" label="Vue Template - Rounded Cell").
      &lt;vue-cal
          class="vuecal--rounded-theme vuecal--green-theme"
          xsmall
          hide-view-selector
          :time="false"
          active-view="month"
          :disable-views="['week']"
          style="width: 270px;height: 300px"&gt;
      &lt;/vue-cal&gt;
    sshpre.flex(language="html-vue" label="Vue Template - Date Picker").
      &lt;vue-cal
          class="vuecal--date-picker"
          xsmall
          hide-view-selector
          :time="false"
          :transitions="false"
          active-view="month"
          :disable-views="['week']"
          style="width: 210px;height: 230px"&gt;
      &lt;/vue-cal&gt;
  highlight-message Refer to the #[a(href="#api") API] section to read more about all the options.

  //- Example.
  h4.title
    a(href="#ex--disable-views") # Disable views, active view
    a#ex--disable-views(name="ex--disable-views")
  p.
    To hide views, you can use the #[span.code disable-views] option and provide an array of views
    to disable.#[br]
    The views are not only hidden from the menu bar, they are totally disabled,
    even when navigating from cells and title bar clicks.#[br]#[br]
    By default all the views are visible and the default active view is the #[span.code week] view.
  v-card.mx-auto.main-content(style="height: 350px")
    vue-cal.vuecal--green-theme.ex--disable-views(
      :time="false"
      active-view="month"
      :disable-views="['years', 'year', 'week']")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal :time="false" active-view="month" :disable-views="['years', 'year', 'week']" /&gt;

  //- Example.
  h4.title
    a(href="#ex--min-max-dates") # Minimum / maximum dates &amp; single click to navigate
    a#ex--min-max-dates(name="ex--min-max-dates")
  p.
    With the options #[span.code minDate] &amp; #[span.code maxDate], you can set a
    time range of selectable cells. All the cells before and after are still visible but
    will be disabled and not selectable.#[br]
    You can still navigate through them with arrows.#[br]
    In this example, the minimum date is set to 10 days behind and the maximum date to
    10 days ahead.#[br]
  highlight-message(type="tips")
    strong.ml-2 Notes:
    ul
      li the min and max options accept a formatted string or plain Javascript Date object.
      li.
        2 different CSS class are available on out of range cells: #[span.code .before-min]
        &amp; #[span.code .after-max].
  v-card.my-2.ma-auto.main-content(style="width: 250px;height: 260px")
    vue-cal.vuecal--green-theme.ex--min-max-dates(
      xsmall
      hide-view-selector
      click-to-navigate
      :time="false"
      active-view="month"
      :min-date="minDate"
      :max-date="maxDate")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal
      xsmall
      hide-view-selector
      click-to-navigate
      :time="false"
      active-view="month"
      :min-date="minDate"
      :max-date="maxDate"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    // Using Vue Cal Date Prototypes.
    computed: {
      minDate () {
        return new Date().subtractDays(10)
      },
      maxDate () {
        return new Date().addDays(10)
      }
    }

  sshpre(language="css" label="CSS").
    .vuecal__cell--disabled {text-decoration: line-through;}
    .vuecal__cell--before-min {color: #b6d6c7;}
    .vuecal__cell--after-max {color: #008b8b;}

  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h4.title
    a(href="#ex--hiding-particular-week-days") # Hide particular week days &amp; show the weeks numbers
    a#ex--hiding-particular-week-days(name="ex--hiding-particular-week-days")
  p.
    If you want to hide particular days of the week, you can use the #[span.code hide-weekdays]
    option.#[br]It accepts an array of days to hide (day numbers),
    #[strong starting at #[span.code 1] for Monday, to #[span.code 7] for Sunday].#[br]
    This option will apply on #[span.code month] &amp; #[span.code week] views.#[br]#[br]
    If you want to hide Saturday and Sunday you can put `#[span.code 6, 7]` in the array or use
    #[span.code hide-weekends] in supplement of #[span.code hide-weekdays].#[br]#[br]
    You can show the weeks numbers column on the #[span.code month] view with the #[span.code show-week-numbers] option.#[br]
    You can also provide a custom renderer to the weeks numbers cells through the #[span.code week-number-cell] slot.

  highlight-message.
    Refer to the #[a(href="#api") API] section to read more about all the options.#[br]

  v-card.mx-auto.main-content(style="height: 350px")
    vue-cal.vuecal--green-theme(
      :time="false"
      show-week-numbers
      :hide-weekdays="[2, 3, 5]"
      :disable-views="['years', 'year']")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal :time="false"
             show-week-numbers
             :hide-weekdays="[2, 3, 5]"
             :disable-views="['years', 'year']"&gt;
    &lt;/vue-cal&gt;

  //- Example.
  h3.title
    a(href="#ex--internationalization")
      v-icon.mr-2 translate
      | Internationalization (i18n)
  v-layout(align-end wrap)
    h4.title.mt-6
      a(href="#ex--internationalization") # Internationalization
    v-spacer
    v-layout.shrink(align-center)
      v-icon.mr-2(color="primary") translate
      span.mr-2 Current language:
      v-select.pa-0.ma-0.shrink(
        :items="localesList"
        item-value="code"
        item-text="label"
        v-model="locale"
        hide-details single-line
        style="width: 250px")
        template(v-slot:selection="{ item }")
          span.mr-2 {{ item.label }}
          v-chip.code.ma-0(small color="#ddd") {{ item.code }}
  a#ex--internationalization(name="ex--internationalization")
  p.
    Let you translate the calendar texts into your own language (#[span.code locale]).#[br]
    Refer to the #[span.code locale] option in the #[a(href="#api") API] section to know more or if you want to provide a translation.#[br]
    Try it in Codepen: #[a(href="https://codepen.io/antoniandre/pen/dxXvwv" target="_blank") Vue Cal - Internationalization].
  v-card.my-2.ma-auto.main-content(style="width: 500px;height: 340px;max-width: 100%")
    vue-cal.vuecal--green-theme(
      :time="false"
      small
      active-view="year"
      :locale="locale"
      @ready="overrideDateTexts")
  sshpre(language="html-vue" label="Vue Template" reactive).
    &lt;vue-cal :time="false" small active-view="year" locale="{{ locale }}" /&gt;
  highlight-message(type="warning") Don't forget to import the locale file you want as follows:
  sshpre(language="js" label="Javascript" reactive).
    // In your Vue.js component import the locale file in your component:
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/i18n/{{ locale }}.js'
    import 'vue-cal/dist/vuecal.css'

  h3.title
    a(href="#ex--timeline")
      v-icon.mr-2 access_time
      | Timeline, business hours &amp; Today

  //- Example.
  h4.title
    a(href="#ex--timeline") # Timeline
    a#ex--timeline(name="ex--timeline")
  p.
    Timelines are only visible on #[span.code week] and #[span.code day] view.#[br]
    This example has a set time range from 08:00 to 19:00, time step of 30 minutes (1 hour by default), 24-hour format, and hidden weekends.
  v-card.my-2.ma-auto.main-content(style="height: 450px")
    vue-cal.vuecal--green-theme(:time-from="8 * 60" :time-to="19 * 60" :time-step="30" hide-weekends)
  sshpre(language="html-vue" label="Vue Template").
    &lt;!-- Time-start time-end &amp; time-step are expected in minutes. --&gt;
    &lt;vue-cal :time-from="8 * 60" :time-to="19 * 60" :time-step="30" hide-weekends /&gt;
  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h4.title
    a(href="#ex--special-hours") # Special hours (or business hours)
    a#ex--special-hours(name="ex--special-hours")
  p.
    The special hours are visible on #[span.code week] and #[span.code day] views and allow
    you to highlight a particular time range on each day of the week individually.#[br]
  highlight-message.
    Refer to the #[a(href="#api") API] section to read more about the
    #[span.code special-hours] option.
  v-card.my-2.ma-auto.main-content(style="height: 450px")
    vue-cal.vuecal--green-theme.ex--special-hours(
      :time-from="8 * 60"
      :time-to="20 * 60"
      :disable-views="['years', 'year', 'month']"
      :special-hours="specialHours")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal :time-from="8 * 60" :time-to="20 * 60" :special-hours="specialHours" /&gt;
  sshpre(language="js" label="JavaScript").
    // `from` and `to` are expected in minutes.
    const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' }

    // In your component's data, special hours from Monday to Friday.
    specialHours: {
      1: dailyHours,
      2: dailyHours,
      3: dailyHours,
      4: dailyHours,
      5: dailyHours
    }
  sshpre(language="css" label="CSS").
    .business-hours {
      background-color: rgba(255, 255, 0, 0.2);
      border: solid rgba(255, 210, 0, 0.6);
      border-width: 2px 0;
    }

  //- Example.
  h4.title
    a(href="#ex--today-current-time") # Today's current time
    a#ex--today-current-time(name="ex--today-current-time")
  p.mb-0.
    When you choose to show the time in vue-cal, the current time of today's date will
    be marked with a line (scroll to the current time to see it).#[br]
    The line position will be updated every time the calendar current view is re-rendered (by interacting).#[br]
    You can easily customize the now-line as you wish via CSS.
    Changing the line and arrow color is as easy as:#[br]
  sshpre.mt-6(language="css" label="CSS").
    .vuecal__now-line {color: #06c;}
  p.
    If you don't want this feature you can simply hide it: #[span.code .vuecal__now-line {display: none}].#[br]
    This feature has no impact on performance.

  p.
    If you want the now line to keep accurate position even while your calendar is iddle, you can use the option
    #[span.code watchRealTime] (see more in the #[a(href="#api") API] section).
  v-card.my-2.ma-auto.main-content(style="width: 360px;height: 360px;max-width: 100%")
    vue-cal.vuecal--green-theme.ex--today-current-time(
      xsmall
      :time-cell-height="26"
      active-view="day"
      :disable-views="['years', 'year', 'month']"
      @ready="scrollToCurrentTime('.ex--today-current-time')")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal xsmall active-view="day" :disable-views="['years', 'year', 'month']" /&gt;

  //- Example.
  h4.title
    a(href="#ex--adding-a-today-button") # Adding a Today button
    a#ex--adding-a-today-button(name="ex--adding-a-today-button")
  p.
    By default the selected date is today. But if you get lost in time travel, you can add
    a Today button to select Today's date with the option #[span.code today-button].#[br]
    Like navigation arrows, there is also a slot to customize as you want.#[br]
    Bellow are the default Today button on the left and a custom one with icon and tooltip on the right.
  p.ex--adding-a-today-button
    | If you are not satisfied with the position of this button, you can also place it
    | outside of Vue Cal like so:
    v-btn.ma-1.today-button(small color="primary" outlined rounded @click="selectedDate = new Date()") Another Today Button
    | #[br]You might want to change view as well when going to Today's date, here is an example how:
    a.mx-1(href="https://codepen.io/antoniandre/pen/yrREOL?editors=1010" target="_blank") Today Button
    v-icon(small color="green lighten-2") fab fa-codepen
  v-layout(justify-center)
    v-card.my-2.mr-3.main-content(style="max-width: 280px;height: 250px")
      vue-cal.vuecal--green-theme.ex--adding-a-today-button(
        ref="vuecal2"
        xsmall
        hide-weekends
        :disable-views="['years']"
        :time="false"
        today-button
        active-view="month"
        :selected-date="selectedDate || new Date(new Date().getFullYear(), 11, 31)")
    v-card.my-2.main-content(style="max-width: 280px;height: 250px")
      vue-cal.vuecal--green-theme.ex--adding-a-today-button(
        ref="vuecal2"
        xsmall
        hide-weekends
        :disable-views="['years']"
        :time="false"
        today-button
        active-view="month"
        :selected-date="selectedDate || new Date(new Date().getFullYear(), 11, 31)")
        template(v-slot:today-button)
          v-tooltip(bottom)
            template(v-slot:activator="{ on }")
              v-btn(x-Programmatically small fab text v-on="on")
                v-icon(color="primary" size="20") my_location
            span Go to Today's date
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal ref="vuecal"
             xsmall
             hide-weekends
             :disable-views="['years']"
             :time="false"
             today-button
             active-view="month"
             :selected-date="selectedDate"&gt;
      &lt;!-- Optional slot for the custom button. --&gt;
      &lt;template v-slot:today-button&gt;
        &lt;!-- Using Vuetify --&gt;
        &lt;v-tooltip&gt;
          &lt;template v-slot:activator="{ on }"&gt;
            &lt;v-btn v-on="on"&gt;
              &lt;v-icon&gt;my_location&lt;/v-icon&gt;
            &lt;/v-btn&gt;
            &lt;span&gt;Go to Today's date&lt;/span&gt;
          &lt;/template&gt;
        &lt;/v-tooltip&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;

    &lt;button @click="selectedDate = new Date()"&gt;ANOTHER TODAY BUTTON&lt;/button&gt;
  sshpre(language="js" label="Javascript").
    data: () => ({
      // Default to next new year eve.
      selectedDate: new Date(new Date().getFullYear(), 11, 31)
    })

  h3.title
    a(href="#ex--timeless-events")
      v-icon.mr-2 event
      | Events

  //- Example.
  h4.title
    a(href="#ex--timeless-events") # Timeless events
    a#ex--timeless-events(name="ex--timeless-events")
  p.
    The events have associated dates but no time information.#[br]
    Timeless events cannot be resized as they have no time or duration information.#[br]
    Refer to the #[span.code events] option in the #[a(href="#api") API] section.
  v-card.my-2.ma-auto.main-content(style="height: 350px")
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time="false"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="timelessEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time="false"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      events: [
        {
          start: '2018-11-21',
          end: '2018-11-21',
          title: 'Need to go shopping',
          content: '&lt;i class="v-icon material-icons"&gt;shopping_cart&lt;/i&gt;',
          class: 'leisure'
        },
        {
          start: '2018-11-21',
          end: '2018-11-21',
          title: 'Golf with John',
          content: '&lt;i class="v-icon material-icons"&gt;golf_course&lt;/i&gt;',
          class: 'sport'
        },
        {
          start: '2018-11-22',
          end: '2018-11-22',
          title: 'Dad\'s birthday!',
          content: '&lt;i class="v-icon material-icons"&gt;cake&lt;/i&gt;',
          class: 'sport'
        }
      ]
  sshpre(language="css" label="CSS").
    /* Different color for different event types. */
    .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
    .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}

  //- Example.
  h4.title
    a(href="#ex--events-with-time") # Events with time information
    a#ex--events-with-time(name="ex--events-with-time")
  p.
    Read-only events (by default events are not editable) with custom HTML content and css class (for event types).#[br]
    Note that the events are always selectable (drop shadow and higher z-index), even when uneditable.
    The difference with timeless events is that a time is set in the #[span.code start] and #[span.code end] attributes of the events.

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="9 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="events")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="9 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             :events="events"&gt;
    &lt;/vue-cal&gt;
  sshpre(language="js" label="Javascript").
    events: [
    {
      start: '2018-11-16 10:30',
      end: '2018-11-16 11:30',
      // You can also define event dates with Javascript Date objects:
      // start: new Date(2018, 11 - 1, 16, 10, 30),
      // end: new Date(2018, 11 - 1, 16, 11, 30),
      title: 'Doctor appointment',
      content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
      class: 'health'
    },
    ...

  //- Example.
  h4.title
    a(href="#ex--open-dialog-on-event-click") # Open a dialog box on event click / dblclick
    a#ex--open-dialog-on-event-click(name="ex--open-dialog-on-event-click")
  p.mb-2.
    By passing a function to the option #[span.code on-event-click] or #[span.code on-event-dblclick],
    you can control what happens when you click or double click an event - on any view where the events are displayed.#[br]
    The callback function you provide will receive 2 arguments:
  ul
    li #[span.code event]: the clicked calendar event's object
    li #[span.code e]: the associated javascript DOM event
  highlight-message.mt-3(type="tips") You can set any custom attribute you want on an event, you will then be able to access it in the dialog box!#[br]
  v-card.my-2.ma-auto.main-content(style="height: 520px")
    vue-cal.vuecal--green-theme.ex--open-dialog-on-event-click(
      selected-date="2018-11-19"
      :time-from="9 * 60"
      :time-to="19 * 60"
      :disable-views="['years', 'year']"
      hide-weekends
      :events="eventsToPop"
      :on-event-click="onEventClick")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="9 * 60"
             :time-to="19 * 60"
             :disable-views="['years', 'year']"
             hide-weekends
             :events="events"
             :on-event-click="onEventClick"&gt;
    &lt;/vue-cal&gt;

    &lt;!-- Using Vuetify --&gt;
    &lt;v-dialog v-model="showDialog"&gt;
      &lt;v-card&gt;
        &lt;v-card-title&gt;
          &lt;v-icon&gt;{{ '\{\{ selectedEvent.icon \}\}' }}&lt;/v-icon&gt;
          &lt;span&gt;{{ '\{\{ selectedEvent.title \}\}' }}&lt;/span&gt;
          &lt;v-spacer/&gt;
          &lt;strong&gt;{{ "\{\{ selectedEvent.start && selectedEvent.start.format('DD/MM/YYYY') \}\}" }}&lt;/strong&gt;
        &lt;/v-card-title&gt;
        &lt;v-card-text&gt;
          &lt;p v-html="selectedEvent.contentFull"/&gt;
          &lt;strong&gt;Event details:&lt;/strong&gt;
          &lt;ul&gt;
            &lt;li&gt;Event starts at: {{ '\{\{ selectedEvent.start && selectedEvent.start.formatTime() \}\}' }}&lt;/li&gt;
            &lt;li&gt;Event ends at: {{ '\{\{ selectedEvent.end && selectedEvent.end.formatTime() \}\}' }}&lt;/li&gt;
          &lt;/ul&gt;
        &lt;/v-card-text&gt;
      &lt;/v-card&gt;
    &lt;/v-dialog&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      selectedEvent: {},
      showDialog: false,
      events: [
        {
          start: '2018-11-20 14:00',
          end: '2018-11-20 18:00',
          title: 'Need to go shopping',
          icon: 'shopping_cart', // Custom attribute.
          content: 'Click to see my shopping list',
          contentFull: 'My shopping list is rather long:&lt;br&gt;&lt;ul&gt;&lt;li&gt;Avocados&lt;/li&gt;&lt;li&gt;Tomatoes&lt;/li&gt;&lt;li&gt;Potatoes&lt;/li&gt;&lt;li&gt;Mangoes&lt;/li&gt;&lt;/ul&gt;', // Custom attribute.
          class: 'leisure'
        },
        {
          start: '2018-11-22 10:00',
          end: '2018-11-22 15:00',
          title: 'Golf with John',
          icon: 'golf_course', // Custom attribute.
          content: 'Do I need to tell how many holes?',
          contentFull: 'Okay.&lt;br&gt;It will be a 18 hole golf course.', // Custom attribute.
          class: 'sport'
        }
      ]
    }),
    methods: {
      onEventClick (event, e) {
        this.selectedEvent = event
        this.showDialog = true

        // Prevent navigating to narrower view (default vue-cal behavior).
        e.stopPropagation()
      }
    }

  sshpre(language="css" label="CSS").
    .vuecal__event {cursor: pointer;}

    .vuecal__event-title {
      font-size: 1.2em;
      font-weight: bold;
      margin: 4px 0 8px;
    }

    .vuecal__event-time {
      display: inline-block;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    .vuecal__event-content {
      font-style: italic;
    }

  //- Example.
  h4.title
    a(href="#ex--events-indicators") # Events indicators - #[span.code years], #[span.code year] &amp; #[span.code month] views
    a#ex--events-indicators(name="ex--events-indicators")
  p.mb-0.
    When you define events the #[span.code month] view will display an events count per day.#[br]
    You can use the option #[span.code eventsCountOnYearView] to show the events count on
    #[span.code years] &amp; #[span.code year] views as well.#[br]
    You can customize the events count as you wish via CSS.
  p.mt-3.layout.align-center
    span.mr-2 Choose an indicator style:
    v-radio-group.ma-0.pt-0.d-inline-block(v-model="indicatorStyle" hide-details row)
      v-radio(label="count (default)" value="count" color="primary")
      v-radio(label="dash" value="dash" color="primary")
      v-radio(label="dot" value="dot" color="primary")
      v-radio(label="cell background" value="cell" color="primary")
  v-layout.ma-auto(justify-center wrap)
    v-card.ma-2.my-2.main-content(style="width: 300px;height: 360px")
      vue-cal.vuecal--green-theme(
        :class="'event-indicator--' + indicatorStyle"
        selected-date="2018-11-19"
        xsmall
        :time-from="10 * 60"
        active-view="month"
        :disable-views="['day']"
        events-count-on-year-view
        :events="events")
    v-card.ma-2.my-2.main-content(style="width: 300px;height: 360px")
      vue-cal.vuecal--yellow-theme(
        :class="'event-indicator--' + indicatorStyle"
        selected-date="2018-11-19"
        xsmall
        :time-from="10 * 60"
        :disable-views="['day']"
        events-count-on-year-view
        active-view="month"
        :events="events")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             xsmall
             :time-from="10 * 60"
             :disable-views="['day']"
             events-count-on-year-view
             active-view="month"
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="css" label="CSS").
    /* Default indicator is count, but you can override it with one of the following rules. */

    /* Dash indicator */
    .vuecal__cell-events-count {
      width: 18px;
      height: 2px;
      color: transparent;
    }

    /* Dot indicator */
    .vuecal__cell-events-count {
      width: 4px;
      min-width: 0;
      height: 4px;
      padding: 0;
      color: transparent;
    }

    /* Cell background indicator */
    .vuecal__cell--has-events {background-color: #fffacd;}
    .vuecal__cell-events-count {display: none;}

  //- Example.
  h4.title
    a(href="#ex--events-on-month-view") # Display events on month view
    a#ex--events-on-month-view(name="ex--events-on-month-view")
  p.
    With the option #[span.code events-on-month-view], you can choose whether to display the events on the month view or not.#[br]
    #[span.code events-on-month-view] accepts a Boolean to show or hide, or the string '#[span.code short]' to show only the event's title.#[br]
    If #[span.code events-on-month-view] is set to #[span.code true], all the informations are displayed, you can then hide
    any event information via CSS.#[br]
    If you want all the cells to have the same height on this view, this is also your call, you can do it via CSS.
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.vuecal--full-height-delete.ex--events-on-month-view(
      selected-date="2018-11-19"
      :time-from="9 * 60"
      :disable-views="['years', 'year']"
      active-view="month"
      hide-weekends
      events-on-month-view="short"
      :events="events"
      style="height: 600px")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="9 * 60"
             :disable-views="['years', 'year']"
             active-view="month"
             hide-weekends
             events-on-month-view="short"
             :events="events"
             style="height: 600px"&gt;
    &lt;/vue-cal&gt;
  sshpre(language="css" label="CSS").
    .vuecal--month-view .vuecal__cell {height: 80px;}

    .vuecal--month-view .vuecal__cell-content {
      justify-content: flex-start;
      height: 100%;
      align-items: flex-end;
    }

    .vuecal--month-view .vuecal__cell-date {padding: 4px;}
    .vuecal--month-view .vuecal__no-event {display: none;}

  //- Example.
  h4.title
    a(href="#ex--edit-and-delete-events") # Edit &amp; delete events
    a#ex--edit-and-delete-events(name="ex--edit-and-delete-events")
  p.mb-2.
    The #[span.code editable-events] option allows or prevent all these actions when it is set to
    #[span.code true] or #[span.code false]:
  ul
    li Edit the event title
    li.
      Resize an event by dragging the resizer handle.
      #[strong Not available if no timeline, not possible on background events.]
    li.
      Drag &amp; drop an event (not from the editable title text selection and not from the resizer).
      #[strong Not possible on background events.]
    li Delete an event (by clicking and holding an event)
    li.
      Create a new event (by clicking and dragging on a cell or clicking and holding on a cell)#[br]
      Learn more about event creation in the #[a(href="#ex---create-events") create events]
      example.

  div.mt-4
    strong.
      But the #[span.code editable-events] option also accept an object to specifically allow or deny any of the
      previously listed actions.
    div For instance this object only denies the drag action:
  sshpre.mt-1(language="js").
    { title: true, drag: false, resize: true, delete: true, create: true }
  highlight-message(type="tips")
    ul
      li.mb-2.
        On top of the global actions allowance, you can deny each of these actions individually for each event with the event
        attributes #[span.code titleEditable: false], #[span.code deletable: false],
        #[span.code draggable: false] &amp; #[span.code resizable: false].
      li.
        By default the delete button only appears at the top of the event with a set height (1.4em).
        If you want a full-height delete button like in this example, you can apply the CSS class
        #[span.code .vuecal--full-height-delete] to your &lt;vue-cal&gt; tag.

  p In this example, the event creation and drag ability are disabled to focus on edition and deletion.
  v-card.my-2.ma-auto.main-content(style="height: 599px")
    vue-cal.vuecal--green-theme.vuecal--full-height-delete(
      selected-date="2018-11-19"
      :time-from="10 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year']"
      hide-view-selector
      hide-weekends
      :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
      :events="editableEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="10 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year']"
             hide-view-selector
             hide-weekends
             :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
             :events="events"
             class="vuecal--full-height-delete"&gt;
    &lt;/vue-cal&gt;
  sshpre(language="js" label="Javascript").
    // In data.
    events: [
      {
        start: '2018-11-20 14:00',
        end: '2018-11-20 17:30',
        title: 'Boring event',
        content: '&lt;i class="icon material-icons"&gt;block&lt;/i&gt;&lt;br&gt;I am not draggable, not resizable and not deletable.',
        class: 'blue-event',
        deletable: false,
        resizable: false,
        draggable: false
      },
      // other events.
    ]
  sshpre(language="css" label="CSS").
    .vuecal__event {background-color: rgba(76, 172, 175, 0.35);}

  //- Example.
  h4.title
    a(href="#ex--create-events") # Create events
    a#ex--create-events(name="ex--create-events")

  p.
    The event creation is only possible on a day cell, so not on years &amp; year views.#[br]
    There are multiple ways to create an event, let's start with the default one.#[br]#[br]
    You may also want to observe the emitted events in the
    #[a(href="#ex--emitted-events") emitted events example].
  highlight-message.
    With the #[span.code snapToTime] option, you can make sure the event starts and end at specific
    intervals of minutes.#[br]
    E.g. #[span.code :snap-to-time="15"] will snap the event to the closest :00, :15, :30, :45 while dragging.#[br]
    This option also applies on event resizing after the drag-creation.
  .layout.align-center.wrap
    | Click and drag on a cell to create an event, downwards or upwards.
    .spacer
    v-btn.mr-1(
      color="primary"
      small
      :outlined="!snapToTime15"
      @click="snapToTime15 = !snapToTime15")
      | Snap to time: 15min
    v-btn(
      color="primary"
      small
      outlined
      @click="$refs.vuecalCreateEx.mutableEvents = [];$refs.vuecalCreateEx.view.events = []")
      | Clear all the events
  v-card.flex.mt-3(style="height: 280px")
    vue-cal.ex--create-events.vuecal--green-theme.vuecal--full-height-delete(
      ref="vuecalCreateEx"
      hide-view-selector
      hide-title-bar
      hide-weekends
      :time-from="10 * 60"
      :time-to="16 * 60"
      :snap-to-time="snapToTime15 ? 15 : 0"
      :disable-views="['years', 'year', 'month', 'day']"
      :editable-events="{ title: false, drag: false, resize: true, delete: true, create: true }"
      :drag-to-create-threshold="0")
  sshpre.my-2(language="html-vue").
    &lt;vue-cal
      hide-view-selector
      hide-title-bar
      hide-weekends
      :time-from="10 * 60"
      :time-to="16 * 60"
      :disable-views="['years', 'year', 'month', 'day']"
      :editable-events="{ title: false, drag: false, resize: true, delete: true, create: true }"
      :drag-to-create-threshold="0"&gt;
    &lt;/vue-cal&gt;

  p.mt-6.
    This event creation method can cause difficulty when the calendar allows a click on a cell to
    navigate: a slightly slipping click would create an event instead of navigating.#[br]
    For this reason, the #[span.code dragToCreateThreshold] option default is 15 pixels.
    So if you try to click or double click, it will not create an event.
  p.mb-1.
    In this example, the event "drag-creation" only starts after dragging 15 pixels, which allows navigating
    even with an accidental move while double-clicking.
  p try to double click to go to the day view with both #[span.code dragToCreateThreshold] to 15 and 0.
  .layout.wrap.align-center.justify-end
    span.subtitle-1 Current dragToCreateThreshold:
    span.code.mr-2 {{ dragToCreateThreshold }}
    v-btn(
      color="primary"
      small
      @click="dragToCreateThreshold = dragToCreateThreshold ? 0 : 15")
        | Set threshold to
        span.ml-2 {{ dragToCreateThreshold ? 0 : 15 }}
  v-card.flex.mt-3(style="height: 280px")
    vue-cal.ex--create-events.vuecal--green-theme.vuecal--full-height-delete(
      :time-from="10 * 60"
      :time-to="16 * 60"
      hide-weekends
      :disable-views="['years', 'year', 'month']"
      :editable-events="{ title: false, drag: false, resize: true, delete: true, create: true }"
      :drag-to-create-threshold="dragToCreateThreshold")

  //- Example.
  h4.title
    a(href="#ex--other-event-creation-methods") # Other event creation methods
    a#ex--other-event-creation-methods(name="ex--other-event-creation-methods")

  p.
    There are 3 other ways to create an event: on cell click &amp; hold, on cell single/double click,
    or programmatically.
  highlight-message Event creation will not trigger with a single/double click or click &amp; hold #[strong if your cursor is on an event].
  p Let's see the 3 cases in order of complexity:

  ol.pl-3
    li.mt-3
      h5.subtitle-1.font-weight-bold On cell single or double click
      p.
        As the #[span.code cell-click] &amp; #[span.code cell-dblclick] emitted
        events return a date and time at cursor position (refer to the
        #[a(href="#ex--emitted-events") emitted events example]),
        you simply need to call the #[span.code createEvent()] function straight
        away from #[span.code cell-dblclick]:
      v-layout(wrap)
        v-card.flex.my-2.mr-3(style="height: 280px")
          vue-cal.vuecal--green-theme.vuecal--full-height-delete(
            ref="vuecal3"
            small
            hide-view-selector
            hide-title-bar
            hide-weekends
            :time-from="10 * 60"
            :time-to="16 * 60"
            :disable-views="['years', 'year', 'month', 'day']"
            :cell-click-hold="false"
            :drag-to-create-event="false"
            editable-events
            @cell-dblclick="$refs.vuecal3.createEvent($event, 120, { title: 'New Event', class: 'blue-event' })")
        sshpre.my-2(language="html-vue" style="font-size: 0.8em").
          &lt;vue-cal
            ref="vuecal"
            small
            hide-view-selector
            hide-weekends
            hide-title-bar
            :time-from="10 * 60"
            :time-to="16 * 60"
            :disable-views="['years', 'year']"
            :cell-click-hold="false"
            :drag-to-create-event="false"
            editable-events
            @cell-dblclick="$refs.vuecal.createEvent(
              $event,
              120,
              { title: 'New Event', class: 'blue-event' }
            )"&gt;
          &lt;/vue-cal&gt;
      p You may then want to disable the default event creation on cell click &amp; hold by setting #[span.code :cell-click-hold="false"]
    li.mt-12
      h5.subtitle-1.font-weight-bold Programmatically &amp; externally
      p.my-2.
        To allow an external button to create events, you will need to call the
        vue-cal #[span.code createEvent()] function from a Vue ref.
      v-layout.mb-3(align-center)
        | This
        v-btn.mx-1(x-small color="primary" @click="customEventCreation") button
        | will prompt you to choose a date and time as the event start.

      v-layout(align-top wrap)
        v-card.flex.my-2.mr-3(style="height: 280px")
          vue-cal.vuecal--green-theme.vuecal--full-height-delete(
            ref="vuecal"
            small
            :time-from="10 * 60"
            :time-to="16 * 60"
            :disable-views="['years', 'year']"
            hide-view-selector
            hide-title-bar
            hide-weekends
            editable-events
            :cell-click-hold="false"
            :drag-to-create-event="false")
        sshpre.my-2(language="html-vue" style="font-size: 0.8em").
          &lt;button @click="customEventCreation"&gt;
              button
          &lt;/button&gt;

          &lt;vue-cal ref="vuecal"
                   small
                   :time-from="10 * 60"
                   :time-to="16 * 60"
                   :disable-views="['years', 'year']"
                   hide-view-selector
                   hide-title-bar
                   hide-weekends
                   editable-events
                   :cell-click-hold="false"
                   :drag-to-create-event="false"&gt;
          &lt;/vue-cal&gt;
      p Then you can give custom event attributes as you wish:
      sshpre.mt-3(language="js" label="Javascript").
        // In methods.
        customEventCreation () {
            const dateTime = prompt('Create event on (YYYY-MM-DD HH:mm)', '{{ todayFormattedNotWeekend }}')

            // Check if date format is correct before creating event.
            if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateTime)) {
              this.$refs.vuecal.createEvent(
                // Formatted start date and time or JavaScript Date object.
                dateTime,
                // Event duration in minutes (Integer).
                120,
                // Custom event props (optional).
                { title: 'New Event', content: 'yay! 🎉', class: 'blue-event' }
              )
            } else if (dateTime) alert('Wrong date format.')
        }

    li.mt-12
      h5.subtitle-1.font-weight-bold Adding a dialog box to the #[strong cell click &amp; hold] behavior
      p.mt-3.
        By default, event will be created with these attributes:
      sshpre.mt-0(language="js" label="Javascript").
        {
            start: {Date}, // Starting from the cursor position in the clicked day cell.
            end: {Date}, // Event start + 2 hours.
            title: '',
            content: '',
            split /* if any */: {Integer | String} // The current day split id that was clicked.
        }

      p.
        If you want to customize those attributes you can modify the event directly through
        the callback function that you provide to #[span.code :on-event-create] as follows:#[br]
      sshpre.mt-6(language="js" label="Javascript").
        // :on-event-create="onEventCreate", in template.

        /**
        * @param event {Object} The newly created event that you can override.
        * @param deleteEventFunction {Function} Allows you to delete this event programmatically.
        * @return {Object | false} The event to be passed back to Vue Cal, or false to reject creation.
        */
        onEventCreate (event, deleteEventFunction) {
            // You can modify event here and return it.
            // You can also return false to reject the event creation.
            return event
        }

      p.
        In this example, we are adding a dialog box to the cell click &amp; hold.#[br]
        The dialog box will allow you to set all the event attributes.
      v-layout(wrap)
        v-card.flex.my-2.mr-3(style="height: 280px")
          vue-cal.flex.vuecal--green-theme.vuecal--full-height-delete(
            small
            :time-from="10 * 60"
            :time-to="16 * 60"
            :disable-views="['years', 'year']"
            hide-view-selector
            hide-title-bar
            hide-weekends
            editable-events
            :drag-to-create-event="false"
            :on-event-create="onEventCreate")
        sshpre.my-2(language="html-vue" style="font-size: 0.8em").
          &lt;vue-cal
              small
              :time-from="10 * 60"
              :time-to="16 * 60"
              :disable-views="['years', 'year']"
              hide-view-selector
              hide-title-bar
              hide-weekends
              editable-events
              :drag-to-create-event="false"
              :on-event-create="onEventCreate"&gt;
          &lt;/vue-cal&gt;
    sshpre(language="html-vue" label="Vue Template - dialog box").
      &lt;!-- Using Vuetify --&gt;
      &lt;v-dialog v-model="showEventCreationDialog" :persistent="true" max-width="420"&gt;
        &lt;v-card&gt;
          &lt;v-card-title&gt;
            &lt;v-text-field v-model="selectedEvent.title" placeholder="Event Title"/&gt;
          &lt;/v-card-title&gt;
          &lt;v-card-text&gt;
            &lt;v-textarea v-model="selectedEvent.content" placeholder="Event Content"/&gt;
            &lt;v-layout&gt;
              &lt;v-select
                :items="eventsCssClasses"
                placeholder="Event CSS Class"
                @change="selectedEvent.class = $event"
                :value="selectedEvent.class"/&gt;
              &lt;v-switch v-model="selectedEvent.background" label="background Event"/&gt;
            &lt;/v-layout&gt;
            &lt;v-layout&gt;
              &lt;v-btn @click="cancelEventCreation()"&gt;Cancel&lt;/v-btn&gt;
              &lt;v-btn @click="closeCreationDialog()"&gt;Save&lt;/v-btn&gt;
            &lt;/v-layout&gt;
          &lt;/v-card-text&gt;
        &lt;/v-card&gt;

    sshpre(language="js" label="Javascript").
      data: () => ({
        selectedEvent: null,
        showEventCreationDialog: false,
        eventsCssClasses: ['leisure', 'sport', 'health']
      }),
      methods: {
        onEventCreate (event, deleteEventFunction) {
          this.selectedEvent = event
          this.showEventCreationDialog = true
          this.deleteEventFunction = deleteEventFunction

          return event
        },
        cancelEventCreation () {
          this.closeCreationDialog()
          this.deleteEventFunction()
        },
        closeCreationDialog () {
          this.showEventCreationDialog = false
          this.selectedEvent = {}
        }
      }

    p With the same method, you can open a dialog at the end of the event drag-creation.
    v-card.my-2(style="height: 280px")
      vue-cal.vuecal--green-theme.vuecal--full-height-delete(
        small
        :time-from="10 * 60"
        :time-to="16 * 60"
        :disable-views="['years', 'year']"
        hide-view-selector
        hide-title-bar
        hide-weekends
        editable-events
        :on-event-create="onEventDragStartCreate"
        @event-drag-create="showEventCreationDialog = true")
    p.
      This example uses the same dialog box and #[span.code cancelEventCreation] &amp;
      #[span.code closeCreationDialog] functions as the previous example.#[br]
      Note that #[span.code event-drag-create] gets fired on mouseup of the drag-create,
      whereas #[span.code onEventCreate] gets called as soon as the event appears on screen, while dragging.
    sshpre(language="html-vue" label="Vue Template").
      &lt;vue-cal small
                :time-from="10 * 60"
                :time-to="16 * 60"
                :disable-views="['years', 'year']"
                hide-view-selector
                hide-title-bar
                hide-weekends
                editable-events
                :on-event-create="onEventCreate"
                @event-drag-create="showEventCreationDialog = true"&gt;
      &lt;/vue-cal&gt;
    sshpre(language="js" label="Javascript").
      data: () => ({
        selectedEvent: null,
        showEventCreationDialog: false
      }),
      methods: {
        // Called when drag-create threshold is reached (when the event appears on screen),
        // but before releasing the drag; so, it should not open the dialog box yet.
        onEventCreate (event, deleteEventFunction) {
          this.selectedEvent = event
          this.deleteEventFunction = deleteEventFunction

          return event
        }
      }

  //- Example.
  h4.title
    a(href="#ex--drag-and-drop") # Event drag &amp; drop
    v-chip.ml-3.px-2(color="error" small outlined) Not available on touch devices for now
    a#ex--drag-and-drop(name="ex--drag-and-drop")
  p.mb-2.
    In addition to the obvious event dragging itself, there are quite a few things that are good
    to know about the drag &amp; drop.

  highlight-message(type="warning")
    ul
      li.
        Drag &amp; drop is a module (to keep Vue Cal light weight) and must be loaded
        separately: #[br]#[span.code import 'vue-cal/dist/drag-and-drop.js']
      li
        strong Drag &amp; drop is only available on single day events for now.
  h5 Dragging over header
  ul
    li.
      While you drag an event over the view selector buttons, or the previous and next arrows,
      or even the today button, they will get into a highlighted state and if you hold over for
      a few milliseconds they will change the view so you can drop the event you are holding
      on another date of the calendar.
    li.
      while dragged over, the previous and next buttons will keep changing the view until you go
      away from the button.
    li.
      Dragging an event over the today button will take you to Today's date, and if you're in
      a #[span.code years] or #[span.code year] view it will also go to the next available
      narrower view from #[span.code month] downwards.
  h5 Dragging over a cell
  ul
    li.
      If you drag an event over a cell or a split
      (ref. #[a(href="#ex--splitting-days") splitting days]), the cell/split gets into a
      highlighted state, showing you where the event would go if you drop it.
    li.
      You can drop an event in any cell. But because it does not make much sense to drop it into a
      #[span.code years] or #[span.code year] view, if you hold over a cell
      in these views or in #[span.code month] view, it will go to the next available narrower
      view so you can at least see a day cell.
  h5 Dropping the event into a cell or somewhere not allowed
  ul
    li.
      If you drop the event outside of the calendar or anywhere it's not possible,
      it will snap back to its original place and the original view will be restored if it
      was changed by navigating away.
    li.
      If you drop the event in a cell and it would start before midnight (00:00), it is placed at
      midnight, keeping its duration.
    li.
      If you drop the event in a cell and it would end after midnight (24:00), its duration will
      be truncated to end at midnight (24:00).
    li.
      By default, when you drop the event it will start exactly where you dropped it,
      but if you prefer you can use the #[span.code snapToTime] option to dictate where it should
       snap to (refer to #[span.code snapToTime] in the #[a(href="#api") API section]).#[br]
      If you wonder why it does not represent the snapping while dragging, it's not possible to do it with
      the native HTML5 drag &amp; drop.
  h5 Emitted events
  ul
    li
      | When dropping an event into a cell, the
      a.ml-1(href="#ex--emitted-events") #[span.code event-drop] and #[span.code event-change] events are emitted.
  h5 CSS styles
  ul
    li
      | You can change the highlighted style of the header buttons or cells through these CSS classes:
      ul
        li #[span.code .vuecal__view-btn--highlighted]
        li #[span.code .vuecal__today-btn--highlighted]
        li #[span.code .vuecal__arrow--highlighted]
        li #[span.code .vuecal__cell--highlighted]
        li #[span.code .vuecal__cell-split--highlighted]
    li.
      You can change the style of the event being dragged through the
      #[span.code .vuecal__event--dragging] CSS class.
    li.
      While dragging, a copy of the original event is made and that's what you drag
      (native HTML5 drag &amp; drop behavior). The original event receive the
      #[span.code .vuecal__event--static] CSS class which hides it with #[span.code opacity: 0].#[br]
      You can use that class to give it a different style.

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.vuecal--full-height-delete(
      selected-date="2018-11-19"
      today-button
      :time-from="10 * 60"
      :time-to="23 * 60"
      hide-weekends
      :snap-to-time="15"
      editable-events
      :events="eventsToDrag"
      :split-days="[{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             today-button
             :time-from="10 * 60"
             :time-to="23 * 60"
             hide-weekends
             :snap-to-time="15"
             editable-events
             :events="events"
             :split-days="[{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]"
             class="vuecal--full-height-delete"&gt;
    &lt;/vue-cal&gt;
  sshpre(language="css" label="CSS").
    .vuecal__event--dragging {background-color: rgba(60, 60, 60, 0.3);}

  //- Example.
  h4.title
    a(href="#ex--external-events-drag-and-drop") # External events drag &amp; drop
    v-chip.ml-3.px-2(color="error" small outlined) Not available on touch devices for now
    a#ex--external-events-drag-and-drop(name="ex--external-events-drag-and-drop")
  p.mb-2.
    You can drag &amp; drop events from an external source as long as they are HTML5 draggable (this will change when touch devices are supported).#[br]
    It is also possible to move an event from one calendar to another.#[br]#[br]
    In the external event, you can set a #[span.code duration] property: it will be used to represent the duration of the event on Vue Cal when it has no date.#[br]
    If the #[span.code duration] is missing, the default will be 2 hours.

  highlight-message(type="tips")
    strong Important note when dragging external events into Vue Cal:
    div.
      With HTML5 drag &amp; drop, when you drop a DOM element to another location, you have to move
      the element yourself. Now especially because Vue is data driven and a DOM update does not
      modify the data, you will also have to remove the event from its original data source yourself
      - unless you want to create a copy.#[br]
      Learn how in the example source code bellow.
  v-layout.mt-4(wrap)
    div.mr-2
      .external-event(
        v-for="(item, i) in draggables"
        :key="i"
        draggable="true"
        @dragstart="onEventDragStart($event, item)")
          strong.mr-2 {{ item.title }}
          span ({{ item.duration ? `${item.duration} min` : 'no duration' }})
          div {{ item.content }}
    vue-cal.mr-1.flex.external-events-drag-and-drop.vuecal--blue-theme(
      small
      hide-view-selector
      hide-weekends
      :disable-views="['years', 'year', 'month', 'day']"
      :time-from="9 * 60"
      :time-to="16 * 60"
      editable-events
      @event-drop="onEventDrop")
    vue-cal.ml-1.flex.external-events-drag-and-drop.vuecal--green-theme(
      small
      hide-view-selector
      hide-weekends
      :disable-views="['years', 'year', 'month', 'day']"
      :time-from="9 * 60"
      :time-to="16 * 60"
      editable-events
      @event-drop="onEventDrop")

  sshpre(language="html-vue" label="Vue Template").
    &lt;!-- Three HTML5 draggable events. --&gt;
    &lt;div class="external-event"
         v-for="(item, i) in draggables"
         :key="i"
         draggable="true"
         @dragstart="onEventDragStart($event, item)"&gt;
         &lt;strong&gt;{{ '\{\{ item.title \}\}' }}&lt;/strong&gt;
         ({{ "\{\{ item.duration ? `${item.duration} min` : 'no duration' \}\}" }})
      &lt;div&gt;{{ '\{\{ item.content \}\}' }}&lt;/div&gt;
    &lt;/div&gt;

    &lt;vue-cal small
             hide-view-selector
             hide-weekends
             :disable-views="['years', 'year', 'month', 'day']"
             :time-from="9 * 60"
             :time-to="16 * 60"
             editable-events
             @event-drop="onEventDrop"&gt;
    &lt;/vue-cal&gt;
  sshpre(language="js" label="Javascript - Vue Component").
    export default {
      data: () => ({
        draggables: [
          {
            // The id (or however you name it), will help you find which event to delete
            // from the callback triggered on drop into Vue Cal.
            id: 1,
            title: 'Ext. Event 1',
            content: 'content 1',
            duration: 60
          },
          {
            id: 2,
            title: 'Ext. Event 2',
            content: 'content 2',
            duration: 30
          },
          {
            id: 3,
            title: 'Ext. Event 3',
            content: 'content 3'
            // No defined duration here: will default to 2 hours.
          }
        ]
      }),
      methods: {
        onEventDragStart (e, draggable) {
          // Passing the event's data to Vue Cal through the DataTransfer object.
          e.dataTransfer.setData('event', JSON.stringify(draggable))
          e.dataTransfer.setData('cursor-grab-at', e.offsetY)
        },
        // The 3 parameters are destructured from the passed $event in @event-drop="onEventDrop".
        // `event` is the final event as Vue Cal understands it.
        // `originalEvent` is the event that was dragged into Vue Cal, it can come from the same
        //  Vue Cal instance, another one, or an external source.
        // `external` is a boolean that lets you know if the event is not coming from any Vue Cal.
        onEventDrop ({ event, originalEvent, external }) {
          // If the event is external, delete it from the data source on drop into Vue Cal.
          // If the event comes from another Vue Cal instance, it will be deleted automatically in there.
          if (external) {
            const extEventToDeletePos = this.draggables.findIndex(item => item.id === originalEvent.id)
            if (extEventToDeletePos > -1) this.draggables.splice(extEventToDeletePos, 1)
          }
        }
      }
    }

  //- Example.
  h4.title
    a(href="#ex--multiple-day-events") # Multiple day events
    a#ex--multiple-day-events(name="ex--multiple-day-events")
  p.
    Multiple day events work like a set of single day events linked together.#[br]
    Deleting one of the day of a multiple day event, will also delete all the other days.#[br]
    Updating the duration by dragging or changing the title will also update on all the days.#[br]
    Try to resize, rename and delete the events.#[br]You can also resize horizontally thanks to
    the option #[span.code resize-x].
  strong Drag &amp; drop is not available on multiple day events for now.

  highlight-message(type="tips").
    3 CSS classes are available to target the event first day, the last day and all the days in between:
    #[span.code event-start], #[span.code event-middle], #[span.code event-end].
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.ex--multiple-day-events.vuecal--full-height-delete(
      selected-date="2018-11-19"
      :time-from="8 * 60"
      :time-to="23 * 60"
      hide-weekends
      events-count-on-year-view
      editable-events
      resize-x
      :events="multipleDayEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="8 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             editable-events
             resize-x
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      events: [
        {
          start: '2018-11-16 10:00',
          end: '2018-11-20 12:37',
          title: 'Running Marathon',
          content: '&lt;i class="v-icon material-icons"&gt;directions_run&lt;/i&gt;',
          class: 'sport'
        },
        {
          start: '2018-11-20 10:00',
          end: '2018-11-20 10:25',
          title: 'Drink water!',
          content: '&lt;i class="v-icon material-icons"&gt;local_drink&lt;/i&gt;',
          class: 'health'
        },
        {
          start: '2018-11-21 19:00',
          end: '2018-11-23 11:30',
          title: 'Trip to India',
          content: '&lt;i class="v-icon material-icons"&gt;flight&lt;/i&gt;',
          class: 'leisure'
        }
      ]
    })

  //- Example.
  h4.title
    a(href="#ex--recurring-events")
      | # Recurring events
      v-chip.ml-2.white--text(small color="red") Coming soon - Delayed
    a#ex--recurring-events(name="ex--recurring-events")
  .mt-4 #[strong When it will be ready, this is how it will work.]
  .mb-2 You can repeat an event:
  ul
    li Every day - by providing a #[span.code every: "day"] property.
    li Every week - by providing a #[span.code every: "week"] property.
    li Every month - by providing a #[span.code every: "month"] property.
    li Every year - by providing a #[span.code every: "year"] property.
    li Every specific week days - by providing a #[span.code weekdays] array containing the weekdays numbers (1 to 7 for Sunday).
    li Every `x` days - by providing a #[span.code every: x] property, with #[span.code x] being an integer.
    li Forever; Or until an expiry date if you provide an #[span.code until: {String | Date}] property.
    li Whether it's single-day, multiple-day, background, all-day, with time or timeless.
  sshpre(language="js" label="Still to do...").
    // month view event count => OK.
    // @todo: check years/year views event counts.
    // @todo: repeated multiple-day events does not appear if the first day is not in view (e.g. hide weekend).
    // @todo: on month view with show events, occurrences don't appear on out of scope days.
    // @todo: overlapping does not work.
    // @todo: if 2 occurences are in the same day (multiple-day events), only one is shown.
    // @todo: check all the above points one by one.

  p.
    Recurrring events work like a set of single day events linked together.#[br]
    That means, deleting, resizing or editing one of the day will apply to all the other days.
  v-card.my-4.ma-auto.py-12.grey.lighten-5.elevation-1
    .text-center.headline.grey--text Demo coming soon.
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="8 * 60"
             :time-to="23 * 60"
             hide-weekends
             events-count-on-year-view
             editable-events
             show-all-day-events
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      events: [
        {
          start: '2018-11-19 22:00',
          end: '2018-11-20 11:00',
          title: 'Nightclub',
          content: '&lt;i class="v-icon material-icons"&gt;local_drink&lt;/i&gt;',
          class: 'leisure',
          repeat: {
            weekdays: [1, 3], // You can repeat on multiple days of the week.
            until: '2020-11-30' // Don't need a time here as it will take the same as original event date.
          }
        },
        {
          start: '2018-11-23', // You can put time or not, will be discarded if all-day.
          end: '2018-11-23',
          title: 'Pizza day!',
          content: '&lt;i class="v-icon material-icons"&gt;local_pizza&lt;/i&gt;',
          class: 'pink-event',
          allDay: true,
          repeat: {
            weekdays: [5] // If original event day is not in these days, original event will still show up.
            // Without `until` property, it will go on forever.
          }
        },
        {
          start: '2018-11-22 10:00',
          end: '2018-11-22 12:00',
          title: 'Piano lesson',
          content: '&lt;i class="v-icon material-icons"&gt;queue_music&lt;/i&gt;',
          class: 'leisure',
          repeat: {
            every: 'week',
            until: new Date('2019/06/01') // You can also use a Javascript Date.
          }
        },
        {
          start: '2018-11-20 18:00',
          end: '2018-11-20 20:00',
          title: 'Tennis tournament',
          content: '&lt;i class="v-icon material-icons"&gt;sports_tennis&lt;/i&gt;',
          class: 'sport',
          repeat: {
            every: 14,
            until: '2019-01-20'
          }
        },
        {
          start: '2018-11-01',
          end: '2018-11-01',
          title: 'Crêpes day',
          content: '&lt;i class="v-icon material-icons"&gt;restaurant&lt;/i&gt;',
          class: 'yellow-event',
          allDay: true,
          repeat: {
            every: 'month',
            until: '2019-12-26'
          }
        },
        {
          start: '2015-06-15',
          end: '2015-06-15',
          title: 'My Birthday',
          content: '&lt;i class="v-icon material-icons"&gt;cake&lt;/i&gt;&lt;br&gt;I am 4.',
          class: 'blue-event',
          allDay: true,
          repeat: {
            every: 'year'
          }
        }
      ]
    })

  //- Example.
  h4.title
    a(href="#ex--overlapping-events") # Overlapping events
    a#ex--overlapping-events(name="ex--overlapping-events")
  p.
    Overlapping, editable &amp; deletable events.#[br]
    Try to resize &amp; delete events to see the overlapping redrawn.

  v-layout.mb-3(align-center)
    | Optionally you can set a min width (in percent) to the events:
    v-btn.ml-2(small color="primary" @click="minEventWidth = minEventWidth ? 0 : 50")
      v-icon {{ minEventWidth ? 'close' : 'add' }}
      | {{ minEventWidth ? 'min-event-width="50"' : 'Add min-event-width' }}
  div(style="min-height: 40px")
    v-slide-y-transition
      .grey--text(v-if="minEventWidth").
        #[span.code min-event-width="50"] will only apply a min width of 50% on events that
        would be smaller than that.
  highlight-message.mb-6.
    In some cases you may want to set the events overlaps calculation only per same time step
    (default time step is 1 hour), like in
    #[a(href="https://github.com/antoniandre/vue-cal/pull/182" target="_blank") this use case].#[br]
    You can achieve this event overlaps grouping with the option #[span.code overlaps-per-time-step].

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.vuecal--full-height-delete(
      selected-date="2018-11-19"
      :time-from="10 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      editable-events
      :min-event-width="minEventWidth"
      :events="overlappingEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="10 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             editable-events
             :min-event-width="minEventWidth"
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      minEventWidth: 0,
      events: [
        {
          start: '2018-11-21 14:00',
          end: '2018-11-21 22:00',
          title: 'A big thing',
          content: '&lt;i class="v-icon material-icons"&gt;sentiment_satisfied_alt&lt;/i&gt;',
          class: 'health'
        },
        {
          start: '2018-11-21 16:00',
          end: '2018-11-21 19:00',
          title: 'Another thing',
          content: '&lt;i class="v-icon material-icons"&gt;thumb_up&lt;/i&gt;',
          class: 'blue-event'
        },
        {
          start: '2018-11-20 18:30',
          end: '2018-11-20 20:30',
          title: 'Crossfit',
          content: '&lt;i class="v-icon material-icons"&gt;fitness_center&lt;/i&gt;',
          class: 'sport'
        },
        ...
      ]
    })

  //- Example.
  h4.title
    a(href="#ex--background-events") # Background events
    a#ex--background-events(name="ex--background-events")
  p.
    Just add the property #[span.code background: true] to your events.#[br]
    The particularity of the background events is that they can fully be overlapped but not overlapping.#[br]
    They are not affected by other events: they stay in the background occupying the whole cell/split width.#[br]
    Note that you can still temporarily raise a background event on top of others (z-index) by hovering it or clicking it.
    Refer to the #[span.code events] option in the #[a(href="#api") API] section.
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="7 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="backgroundEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="7 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      events: [
        {
          start: '2018-11-19 12:00',
          end: '2018-11-19 14:00',
          title: 'LUNCH',
          class: 'lunch',
          background: true
        },
        {
          start: '2018-11-20 12:00',
          end: '2018-11-20 14:00',
          title: 'LUNCH',
          class: 'lunch',
          background: true
        },
        ...
      ]
    })

  sshpre(language="css" label="CSS").
    .vuecal__event.lunch {
      background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);/* IE 10+ */
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .vuecal__event.lunch .vuecal__event-time {display: none;align-items: center;}

  //- Example.
  h4.title
    a(href="#ex--all-day-events") # All day events
    a#ex--all-day-events(name="ex--all-day-events")

  ul
    li.mb-2.
      When the #[span.code showAllDayEvents] is set to #[span.code true] the events with an
      #[span.code allDay] attribute set to #[span.code true] will be displayed in a fixed top
      bar on the #[span.code week] &amp; #[span.code day] views.#[br]
      The all day events bar will only show up if the options #[span.code showAllDayEvents] &amp;
      #[span.code time] are set to #[span.code true].#[br]
      #[span.code time] is important since without time information every event is an all-day
      event there is no point in separating them then.
    li.mb-2.
      When #[span.code showAllDayEvents] is set to #[span.code false], all the all day events
      (#[span.code allDay] attribute set to #[span.code true]), will show up as a normal
      #[strong background event].
    li.mb-2.
      On month view, switching #[span.code showAllDayEvents] on and off will not have any impact
      since both should display the all day events.
    li.mb-2.
      #[span.code showAllDayEvents] accepts a #[span.code Boolean] or the string
      #[span.code 'short'], to display only the event title.

  highlight-message.
    Multiple-day events feature will be improved in a future version to display across
    multiple cells in the all day bar.

  v-btn.ma-1(small color="primary" @click="showAllDayEvents = (showAllDayEvents + 1) % 3")
    span.white--text.code :show-all-day-events="{{ ["'short'", 'true', 'false'][showAllDayEvents] }}"
  v-btn.ma-1(small color="primary" @click="shortEventsOnMonthView = !shortEventsOnMonthView")
    span.white--text.code :events-on-month-views="{{ ['true', "'short'"][shortEventsOnMonthView * 1] }}"

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.ex--all-day-events(
      selected-date="2019-02-11"
      :time-from="7 * 60"
      :disable-views="['years', 'year']"
      hide-weekends
      :show-all-day-events="['short', true, false][showAllDayEvents]"
      :events-on-month-view="[true, 'short'][shortEventsOnMonthView * 1]"
      :events="allDayEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;button @click="showAllDayEvents = (showAllDayEvents + 1) % 3"&gt;
      :show-all-day-events="{{ "\{\{ [\"'short'\", 'true', 'false'][showAllDayEvents] \}\}" }}"
    &lt;/button&gt;
    &lt;button @click="shortEventsOnMonthView = !shortEventsOnMonthView"&gt;
      :events-on-month-views="{{ "\{\{ ['true', \"'short'\"][shortEventsOnMonthView * 1] \}\}" }}"
    &lt;/button&gt;

    &lt;vue-cal selected-date="2019-02-11"
             :time-from="7 * 60"
             :disable-views="['years', 'year']"
             hide-weekends
             :show-all-day-events="['short', true, false][showAllDayEvents]"
             :events-on-month-view="[true, 'short'][shortEventsOnMonthView * 1]"
             :events="events"&gt;
    &lt;/vue-cal&gt;
  sshpre(language="js" label="Javascript").
    showAllDayEvents: 0,
    shortEventsOnMonthView: false,
    events: [
      {
        start: '2019-02-12',
        end: '2019-02-12',
        title: 'Day off!',
        content: '&lt;i class="v-icon material-icons"&gt;beach_access&lt;/i&gt;',
        class: 'yellow-event',
        allDay: true
      },
      {
        start: '2019-02-14',
        end: '2019-02-14',
        title: 'Valentine\'s day',
        content: '&lt;i class="v-icon material-icons"&gt;favorite_outline&lt;/i&gt;',
        class: 'pink-event',
        allDay: true
      },
      ...
    ]

  sshpre(language="css" label="CSS").
    .vuecal__cell-content {align-self: flex-start;}
    .vuecal__cell-date {text-align: right;padding: 4px;}

    .vuecal--week-view .vuecal__bg .vuecal__event--all-day.pink-event,
    .vuecal--day-view .vuecal__bg .vuecal__event--all-day.pink-event {right: 50%;}
    .vuecal--week-view .vuecal__bg .vuecal__event--all-day.leisure,
    .vuecal--day-view .vuecal__bg .vuecal__event--all-day.leisure {left: 50%;}

  //- Example.
  h4.title
    a(href="#ex--splitting-days") # Splitting days &amp; split events
    a#ex--splitting-days(name="ex--splitting-days")
  p.mb-6
    | Split each day into multiple containers passing a CSS class &amp; a label per split, and allow split-specific events.
    br
    br
    | By default the body of the calendar will fit the container.#[br]
    | But with the options #[span.code min-cell-width] or #[span.code min-split-width], you can increase the calendar
    | body width and it will become scrollable horizontally.
    ul
      li #[span.code min-cell-width.black--text] will only be activated on week view, since there is only 1 cell in day view.
      li If both #[span.code min-cell-width] and #[span.code min-split-width] are set, #[span.code min-split-width] will be used.

    | #[br]You can also use the option #[span.code sticky-split-labels] to place the split labels in the header.#[br]#[br]

    | You can toggle the splits thanks to the #[span.code hide] property of each split in #[span.code splitDays].#[br]#[br]

    | Refer to the #[span.code min-cell-width.black--text], #[span.code min-split-width] and #[span.code splitDays] option in the #[a(href="#api") API] section.#[br]#[br]

    v-layout(align-center)
      v-btn.px-2.mr-2(
        small
        color="primary"
        :outlined="!splitsExample.minCellWidth"
        @click="splitsExample.minCellWidth = splitsExample.minCellWidth ? 0 : 400")
        v-icon.mr-2 {{ splitsExample.minCellWidth ? 'close' : 'add' }}
        | {{ splitsExample.minCellWidth ? `Min cell width: ${splitsExample.minCellWidth}px` : 'Add min cell width' }}

      v-btn.px-2.mr-2(
        small
        color="primary"
        :outlined="!splitsExample.minSplitWidth"
        @click="splitsExample.minSplitWidth = splitsExample.minSplitWidth ? 0 : 200")
        v-icon.mr-2 {{ splitsExample.minSplitWidth ? 'close' : 'add' }}
        | {{ splitsExample.minSplitWidth ? `Min split width: ${splitsExample.minSplitWidth}px` : 'Add min split width' }}

      v-btn.px-2.mr-2(
        small
        color="primary"
        :outlined="!splitsExample.stickySplitLabels"
        @click="splitsExample.stickySplitLabels = !splitsExample.stickySplitLabels")
        v-icon.mr-2 {{ splitsExample.stickySplitLabels ? 'close' : 'add' }}
        | Sticky Split Labels

      v-btn.px-2(
        small
        color="primary"
        :outlined="splitsExample.splitDays[1].hide"
        @click="splitsExample.splitDays[1].hide = !splitsExample.splitDays[1].hide")
        v-icon.mr-2 {{ splitsExample.splitDays[1].hide ? 'add' : 'remove' }}
        | {{ splitsExample.splitDays[1].hide ? 'Show' : 'Hide' }} Dad

  v-card.my-2.ma-auto(style="height: 600px")
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="8 * 60"
      :time-step="30"
      :disable-views="['years', 'year']"
      editable-events
      :events="splitEvents"
      :split-days="splitsExample.splitDays"
      :sticky-split-labels="splitsExample.stickySplitLabels"
      :min-cell-width="splitsExample.minCellWidth"
      :min-split-width="splitsExample.minSplitWidth")
  sshpre(language="html-vue" label="Vue Template").
    &lt;button @click="minCellWidth = minCellWidth ? 0 : 400"&gt;
      {{ '\{\{ minCellWidth ? \'min cell width: 400px\' : \'Add min cell width\' \}\}' }}
    &lt;/button&gt;
    &lt;button @click="minSplitWidth = minSplitWidth ? 0 : 200"&gt;
      {{ '\{\{ minSplitWidth ? \'min split width: 200px\' : \'Add min split width\' \}\}' }}
    &lt;/button&gt;
    &lt;button @click="stickySplitLabels = !stickySplitLabels"&gt;
      Sticky Split Labels
    &lt;/button&gt;
    &lt;button @click="splitDays[1].hide = !splitDays[1].hide"&gt;
      Show/Hide Dad
    &lt;/button&gt;

    &lt;vue-cal selected-date="2018-11-19"
             :time-from="8 * 60"
             :time-step="30"
             :disable-views="['years', 'year', 'month']"
             editable-events
             :events="events"
             :split-days="splitDays"
             :sticky-split-labels="stickySplitLabels"
             :min-cell-width="minCellWidth"
             :min-split-width="minSplitWidth"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      stickySplitLabels: false,
      minCellWidth: 400,
      minSplitWidth: 0,
      splitDays: [
        // The id property is added automatically if none (starting from 1), but you can set a custom one.
        // If you need to toggle the splits, you must set the id explicitly.
        { id: 1, class: 'mom', label: 'Mom' },
        { id: 2, class: 'dad', label: 'Dad', hide: false },
        { id: 3, class: 'kid1', label: 'Kid 1' },
        { id: 4, class: 'kid2', label: 'Kid 2' },
        { id: 5, class: 'kid3', label: 'Kid 3' }
      ]
      events: [
        {
          start: '2018-11-19 10:35',
          end: '2018-11-19 11:30',
          title: 'Doctor appointment',
          content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
          class: 'health',
          split: 1 // Has to match the id of the split you have set (or integers if none).
        },
        {
          start: '2018-11-19 18:30',
          end: '2018-11-19 19:15',
          title: 'Dentist appointment',
          content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
          class: 'health',
          split: 2
        },
        {
          start: '2018-11-20 18:30',
          end: '2018-11-20 20:30',
          title: 'Crossfit',
          content: '&lt;i class="v-icon material-icons"&gt;fitness_center&lt;/i&gt;',
          class: 'sport',
          split: 1
        },
        ...
      ]
    })

  sshpre(language="css" label="CSS").
    /* You can easily set a different style for each split of your days. */
    .vuecal__cell-split.dad {background-color: rgba(221, 238, 255, 0.5);}
    .vuecal__cell-split.mom {background-color: rgba(255, 232, 251, 0.5);}
    .vuecal__cell-split.kid1 {background-color: rgba(221, 255, 239, 0.5);}
    .vuecal__cell-split.kid2 {background-color: rgba(255, 250, 196, 0.5);}
    .vuecal__cell-split.kid3 {background-color: rgba(255, 206, 178, 0.5);}
    .vuecal__cell-split .split-label {color: rgba(0, 0, 0, 0.1);font-size: 26px;}

    /* Different color for different event types. */
    .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
    .vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
    .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}

  h3.title
    a(href="#ex--emitted-events")
      v-icon.mr-2(medium) swap_horiz
      | Communicating with Vue Cal

  //- Example.
  h4.title
    a(href="#ex--emitted-events") # Vue Cal emitted events
    a#ex--emitted-events(name="ex--emitted-events")
  p.mb-0.
    Vue Cal emits events that you can listen to, to trigger an action outside of Vue Cal.#[br]
    If you are not familiar with Vue JS events, you should read about it here:
    #[a(href="https://vuejs.org/v2/guide/events.html" target="_blank") vuejs.org/v2/guide/events.html #[v-icon(small color="primary") open_in_new]]#[br]#[br]
    Here is the list of emitted events:
  h4.mt-2 View-related
  ul
    li #[code ready]
    li #[code view-change]
    li #[code cell-click] - returns a JS native #[span.code Date] object
    li #[code cell-dblclick] - returns a JS native #[span.code Date] object
    li #[code cell-contextmenu] - returns a JS native #[span.code Date] object and x, y: the cursor coordinates.
    li #[code cell-keypress-enter] - returns a JS native #[span.code Date] object
    li #[code cell-focus] - returns a JS native #[span.code Date] object
  highlight-message(type="tips")
    ul
      li.
        #[span.code cell-click] is fired every time you click a day, whereas
        #[span.code cell-focus] is fired only when the selected day changes.
      li.
        #[span.code cell-click], #[span.code cell-dblclick], #[span.code cell-contextmenu]
        and #[span.code cell-focus] return the time at cursor position, unless the cell
        was focused from tab key.
        It would then return the cell start date (at midnight).
      li.
        If split-days is provided, #[span.code cell-click], #[span.code cell-dblclick], #[span.code cell-keypress-enter]
        and #[span.code cell-focus] emitted events will return an object containing the date and the clicked split id.

  highlight-message
    | The emitted events #[span.code ready] &amp; #[span.code view-change] return an object:#[br]
    sshpre.mt-2(language="js").
      {
        view: [String],
        startDate: [Date], // View start - JS native Date object.
        endDate: [Date], // View end - JS native Date object.
        firstCellDate: [Date], // Month view only, in case cell is out of current month - JS native Date object.
        lastCellDate: [Date], // Month view only, in case cell is out of current month - JS native Date object.
        outOfScopeEvents: [Array], // Month view only, all the events that are out of the current month.
        events: [Array], // All the events in the current view.
        week: [Integer] // Week number. Only returned if view is 'week'.
      }
    strong.
      Note that on a month view, the events from the out of scope days
      (cells before and after the current month) are also returned in the array.

  h4.mt-2 Events-related
  ul
    li.mt-3 #[code.mr-1 event-focus] - returns the associated calendar event object.
    li.mt-3 #[code.mr-1 event-mouse-enter] - returns the associated calendar event object.
    li.mt-3 #[code.mr-1 event-mouse-leave] - returns the associated calendar event object.
    li.mt-3 #[code.mr-1 event-create] - returns the associated calendar event object.
    li.mt-3
      code.mr-1 event-drag-create
      span.grey--text (only fired on mouseup after the event drag creation)
      p Returns the associated calendar event object.
    li.mt-3 #[code.mr-1 event-delete] - returns the associated calendar event object.
    li.mt-2 #[code event-title-change] - returns an object containing:
      ul
        li #[span.code event], the calendar event object that was dropped
        li #[span.code oldTitle], the title of the event before it was edited

    //- li #[span.code event-content-change]
    li.mt-2
      code.mr-1 event-duration-change
      span.grey--text (only fired at the end of the event resizing)
      | #[br]Returns an object containing:
      ul
        li #[span.code event], the calendar event object that was resized
        li #[span.code oldDate], the Javascript Date the event was ending at before resize
        li #[span.code originalEvent], the same calendar event before the change
    li.mt-2
      code.mr-1 event-resizing
      span.grey--text Fired repeatedly while resizing
      | #[br]For performance while dragging, returns a lighter object containing:
      ul
        li #[span.code _eid], the calendar event internal id.
        li #[span.code end], the calendar event new end Date.
        li #[span.code endTimeMinutes], the calendar event new end time in minutes.
      highlight-message(type="warning").
        You should only listen to this event if you have no choice. In most of cases you should
        listen to #[span.code event-duration-change] instead (fired only once at the end of the resizing).
    li.mt-2
      code.mr-1 event-drop
      | - returns an object containing:
      ul
        li #[span.code event], the calendar event object that was dropped
        li #[span.code oldDate], the Javascript Date the event was starting from before drag
        li #[span.code newDate], the Javascript Date the event is now starting from
        li #[span.code oldSplit] only if splitting days, the id of the split the event came from
        li #[span.code newSplit] only if splitting days, the id of the split the event is dropped into
    li.mt-3 #[code.mr-1 event-change] - returns an object containing:
      ul
        li #[span.code event], the calendar event object that was changed
        li.
          #[span.code originalEvent], the same calendar event before the change
          (#[span.code null] when creating event)

  highlight-message(type="tips")
    ul
      li.
        The #[span.code event-change] emitted event groups all the events triggered on a calendar event property change:
        #[span.code event-title-change], #[span.code event-drop],
        #[span.code event-duration-change] and #[span.code event-create]. So you have the choice to listen to
        #[span.code event-change] to cover any calendar event change or listen to a specific action emitted event.
      li.mt-3.
        To help you manipulate an event's date, Vue Cal returns native #[span.code Date]
        objects in the event properties #[span.code start] &amp; #[span.code end].#[br]
        So for instance, you can easily access the day of the week of an event with #[span.code event.start.getDay()].#[br]
        You can then use Vue Cal #[a(href="#date-prototypes") Date prototypes] to manipulate and format the Date as you want.

  p.mb-0 Watch the list of emitted events (#[strong latest on top]) as you play with Vue Cal:
  pre.mt-2.ssh-pre.mb-2
    v-layout(wrap align-center)
      .grey--text //&nbsp;
        strong event-name:&nbsp;
        span arguments-list
      v-spacer
      v-btn(color="primary" outlined small @click="clearEventsLog")
        v-icon(small).mr-1 clear
        | Clear log
      v-btn.ml-2(color="primary" outlined small @click="logMouseEvents = !logMouseEvents")
        v-icon(small).mr-1 {{ logMouseEvents ? 'remove' : 'add' }}
        | {{ logMouseEvents ? 'Hide' : 'Track' }} mouse hover events
    .scrollable
      .mt-1(v-for="(l, i) in reversedLogs" :key="i")
        .v-divider.mb-1.grey.lighten-2(v-if="i")
        strong.mr-1 {{ l.name }}:
        span {{ l.args }}
  v-card.mt-6.mb-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="7 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year']"
      hide-weekends
      editable-events
      :events="eventsCopy3"
      cell-contextmenu
      @ready="logEvents('ready', $event)"
      @view-change="logEvents('view-change', $event)"
      @cell-click="logEvents('cell-click', $event)"
      @cell-dblclick="logEvents('cell-dblclick', $event)"
      @cell-contextmenu="logEvents('cell-contextmenu', $event)"
      @cell-focus="logEvents('cell-focus', $event)"
      @event-focus="logEvents('event-focus', $event)"
      @event-mouse-enter="logMouseEvents && logEvents('event-mouse-enter', $event)"
      @event-mouse-leave="logMouseEvents && logEvents('event-mouse-leave', $event)"
      @event-title-change="logEvents('event-title-change', $event)"
      @event-content-change="logEvents('event-content-change', $event)"
      @event-duration-change="logEvents('event-duration-change', $event)"
      @event-drop="logEvents('event-drop', $event)"
      @event-create="logEvents('event-create', $event)"
      @event-drag-create="logEvents('event-drag-create', $event)"
      @event-delete="logEvents('event-delete', $event)")

  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="7 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year']"
             hide-weekends
             editable-events
             :events="events"
             cell-contextmenu
             @ready="logEvents('ready', $event)"
             @view-change="logEvents('view-change', $event)"
             @cell-click="logEvents('cell-click', $event)"
             @cell-dblclick="logEvents('cell-dblclick', $event)"
             @cell-contextmenu="logEvents('cell-contextmenu', $event)"
             @cell-focus="logEvents('cell-focus', $event)"
             @event-focus="logEvents('event-focus', $event)"
             @event-mouse-enter="logEvents('event-mouse-enter', $event)"
             @event-mouse-leave="logEvents('event-mouse-leave', $event)"
             @event-title-change="logEvents('event-title-change', $event)"
             @event-content-change="logEvents('event-content-change', $event)"
             @event-duration-change="logEvents('event-duration-change', $event)"
             @event-drop="logEvents('event-drop', $event)"
             @event-create="logEvents('event-create', $event)"
             @event-drag-create="logEvents('event-drag-create', $event)"
             @event-delete="logEvents('event-delete', $event)"&gt;
    &lt;/vue-cal&gt;

  //- Example.
  h4.title
    a(href="#ex--external-controls") # External controls &amp; use of Vue Cal methods
    a#ex--external-controls(name="ex--external-controls")
  p.
    You can access any #[strong Vue Cal] internal method through Vue refs.#[br]
    This example shows how to control the Previous, Next and Today functions and the view selections
    from external buttons.#[br]
    One important thing to notice is that using the #[span.code .sync] keyword on #[span.code active-view]
    keeps it updated when Vue Cal changes the view internally. For instance when you click the title to go
    to a broader view.

  v-layout.my-2.mx-auto(align-center style="max-width: 500px")
    v-btn.mx-1.px-2.flex(small color="primary darken-1" @click="activeView = 'day'")
      v-icon.ml-n2.mr-1(small v-if="activeView === 'day'") check
      | Day
    v-btn.mx-1.px-2.flex(small color="primary darken-1" @click="activeView = 'week'")
      v-icon.ml-n2.mr-1(small v-if="activeView === 'week'") check
      | Week
    v-btn.mx-1.px-2.flex(small color="primary darken-1" @click="activeView = 'month'")
      v-icon.ml-n2.mr-1(small v-if="activeView === 'month'") check
      | Month
    v-btn.mx-1.px-2.flex(small color="primary darken-1" @click="activeView = 'year'")
      v-icon.ml-n2.mr-1(small v-if="activeView === 'year'") check
      | Year
    v-btn.mx-1.px-2.flex(small color="primary darken-1" @click="activeView = 'years'")
      v-icon.ml-n2.mr-1(small v-if="activeView === 'years'") check
      | Years

  v-layout.mt-2.mb-6.mx-auto(justify-center style="max-width: 500px")
    v-btn.mx-1.flex(small color="primary lighten-1" @click="$refs.vuecal4.previous()")
      v-icon.mr-1 keyboard_arrow_left
      | Previous
    v-btn.mx-1.flex(small color="primary lighten-1" @click="$refs.vuecal4.switchView('day', new Date())")
      v-icon.mr-1(small) my_location
      | Today
    v-btn.mx-1.flex(small color="primary lighten-1" @click="$refs.vuecal4.next()")
      | Next
      v-icon.ml-1 keyboard_arrow_right

  v-layout(align-center justify-center)
    vue-cal.vuecal--green-theme(
      small
      ref="vuecal4"
      :active-view.sync="activeView"
      :time="false"
      hide-view-selector
      :selected-date="selectedDate"
      style="max-width: 500px;height: 260px")
  sshpre(language="html-vue" label="Vue Template").
    &lt;button @click="activeView = 'day'"&gt;Day&lt;/button&gt;
    &lt;button @click="activeView = 'week'"&gt;Week&lt;/button&gt;
    &lt;button @click="activeView = 'month'"&gt;Month&lt;/button&gt;
    &lt;button @click="activeView = 'year'"&gt;Year&lt;/button&gt;
    &lt;button @click="activeView = 'years'"&gt;Years&lt;/button&gt;
    &lt;br /&gt;
    &lt;button @click="$refs.vuecal.previous()"&gt;Previous&lt;/button&gt;
    &lt;button @click="$refs.vuecal.switchView('day', new Date())"&gt;Today&lt;/button&gt;
    &lt;button @click="$refs.vuecal.next()"&gt;Next&lt;/button&gt;

    &lt;vue-cal small
      ref="vuecal"
      :active-view.sync="activeView"
      :time="false"
      hide-view-selector
      :selected-date="selectedDate"&gt;
    &lt;/vue-cal&gt;

  h5.subtitle-1.font-weight-bold Other useful Vue Cal internal methods &amp; Date prototypes
  highlight-message(type="tips")
    | Along with these Vue Cal internal methods that you can use externally,
    | you can also call other useful Vue Cal methods.
    ul
      li
        code switchToNarrowerView()
        p Will drilldown the current view on selected date if there is a narrower view available.
      li
        code minutesAtCursor(e)
        p.
          Will return the time (in minutes) at the cursor position when a DOM event occurs.
          `e` is the DOM event.

    strong Useful #[span.code Date] prototypes
    p.
      Don't miss out on these convenient functions! Read on in the
      #[a(href="date-prototypes") #[span.code Date] prototypes section].

  //- Example.
  h4.title
    a(href="#ex--sync-two-calendars") # Sync two vue-cal instances
    a#ex--sync-two-calendars(name="ex--sync-two-calendars")
  p.
    In this example the right calendar is used as a date picker and the selected date is
    updated on the left calendar via the #[span.code @cell-focus] event listener.#[br]
    To know more about emitted events refer to the
    #[a(href="#ex--emitted-events") emitted events example].

  v-layout(align-center justify-center)
    vue-cal.vuecal--blue-theme(
      small
      :time="false"
      hide-view-selector
      active-view="week"
      :disable-views="['years', 'year', 'month']"
      :selected-date="selectedDate"
      style="max-width: 360px;height: 260px")
    vue-cal.vuecal--blue-theme.vuecal--rounded-theme(
      xsmall
      :time="false"
      hide-view-selector
      active-view="month"
      :disable-views="['years', 'year', 'week', 'day']"
      @cell-focus="selectedDate = $event"
      style="max-width: 270px;height: 290px;transform: scale(0.9)")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal small
      :time="false"
      hide-view-selector
      active-view="week"
      :disable-views="['years', 'year', 'month']"
      :selected-date="selectedDate"
      class="vuecal--blue-theme"
      style="max-width: 360px;height: 260px"&gt;
    &lt;/vue-cal&gt;
    &lt;vue-cal xsmall
      :time="false"
      hide-view-selector
      active-view="month"
      :disable-views="['years', 'year', 'week', 'day']"
      @cell-focus="selectedDate = $event"
      class="vuecal--blue-theme vuecal--rounded-theme"
      style="max-width: 270px;height: 290px"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      selectedDate: null
    })

  //- Example.
  h4.title
    a(href="#ex--modifying-events-from-outside") # Modifying the array of events outside of Vue Cal
    a#ex--modifying-events-from-outside(name="ex--modifying-events-from-outside")
  highlight-message(type="tips").
    It is possible to modify the array of events like adding or removing an event
    after the first load, but be aware that by doing so all the events in Vue Cal
    will be replaced by the new array of events. You may lose your changes if you
    modified events within Vue Cal.
  v-btn.ma-1(color="primary" small @click="eventsCopy.push({ start: '2018-11-20 12:00', end: '2018-11-20 17:00', title: 'A new event', class: 'blue-event' })")
    v-icon.mr-2 add
    | Add an event
  v-btn.ma-1(color="primary" small @click="eventsCopy.pop()")
    v-icon.mr-2 remove
    | Remove last event
  p.mb-0 Here is the live array of event titles:
  pre {{ eventsCopy.map(e => e.title) }}

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="9 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="eventsCopy")
  sshpre(language="html-vue" label="Vue Template").
    &lt;button @click="events.push({
        start: '2018-11-20 12:00',
        end: '2018-11-20 17:00',
        title: 'A new event',
        class: 'blue-event'
    })"&gt;Add an event&lt;/button&gt;
    &lt;button @click="events.pop()"&gt;Remove last event&lt;/button&gt;

    &lt;vue-cal selected-date="2018-11-19"
             :time-from="9 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      events: [
        {
          start: '2018-11-19 10:35',
          end: '2018-11-19 11:30',
          title: 'Doctor appointment',
          content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
          class: 'health'
        },
        ...
      ]
    })

  h3.title
    a(href="#ex--timeline-tweaking")
      v-icon.mr-2 tune
      | Advanced Vue Cal customization
      small.ml-2 #[em="- when CSS won't do it"]

  highlight-message.mt-6
    | Here is the list of available slots:
    ul
      li #[span.code title]
      li #[span.code arrow-prev]
      li #[span.code arrow-next]
      li #[span.code today-button]
      li #[span.code weekday-heading]
      li #[span.code split-label]
      li #[span.code time-cell]
      li #[span.code week-number-cell]
      li #[span.code cell-content]
      li #[span.code no-event]
      li #[span.code events-count]
      li #[span.code event]

  //- Example.
  h4.title
    a(href="#ex--scroll-to-time") # Scroll the view to a particular time
    a#ex--scroll-to-time(name="ex--scroll-to-time")
  p.mb-0.
    It is quite easy to scroll to a particular time, and the user has the choice to add this outside of Vue Cal.
  highlight-message(type="tips")
    | Bear in mind that IE11 needs a polyfill before you can use the scrollTo method on a DOM element, this single line will do.
    sshpre.mt-2.mb-0.flex(language="js").
      // For IE11. Adds this to your page once (in `created` hook for instance).
      if (!HTMLElement.prototype.scrollTo) HTMLElement.prototype.scrollTo = function ({ top }) { this.scrollTop = top }

  v-btn.mt-2.mr-2(small color="primary" @click="scrollToCurrentTime('.ex--scroll-to-time')")
    v-icon vertical_align_bottom
    | Scroll to current time
  v-btn.mt-2.mr-2(small color="primary" @click="scrollToTop('.ex--scroll-to-time')")
    v-icon vertical_align_top
    | Scroll to top
  v-layout(wrap)
    v-card.my-4.mr-2.flex(style="width: 360px;height: 360px;max-width: 100%")
      vue-cal.ex--scroll-to-time.vuecal--green-theme(
        small
        active-view="day"
        :disable-views="['years', 'year', 'month', 'week']"
        hide-view-selector
        :time-cell-height="timeCellHeight"
        @ready="scrollToCurrentTime('.ex--scroll-to-time')")
    .flex
      sshpre.mt-4.flex(language="html-vue" label="Vue Template").
        &lt;vue-cal id="vuecal"
                 :time-cell-height="timeCellHeight"
                 @ready="scrollToCurrentTime"&gt;
        &lt;/vue-cal&gt;
      sshpre.mt-4.flex(language="js" label="Javascript").
        // `timeCellHeight` is set to 26 in the component data.
        scrollToCurrentTime () {
          const calendar = document.querySelector('#vuecal .vuecal__bg')
          const hours = this.now.getHours() + this.now.getMinutes() / 60
          calendar.scrollTo({ top: hours * this.timeCellHeight, behavior: 'smooth' })
        },
        scrollToTop () {
          const calendar = document.querySelector('#vuecal .vuecal__bg')
          calendar.scrollTo({ top: 0, behavior: 'smooth' })
        }

  //- Example.
  h4.title
    a(href="#ex--timeline-tweaking") # Timeline tweaking
    a#ex--timeline-tweaking(name="ex--timeline-tweaking")
  p.mb-0.
    If you want to have more fancy time cells, you can override them with the
    #[span.code time-cell-height] option (in pixels) and scoped slots.#[br]
    For even more flexibility, the horizontal lines are painted when you set the CSS class #[span.code line] on the tag you choose.
    So if you don't set this class you are free to paint the lines yourself or not.
  v-card.my-2.ma-auto.main-content(style="width: 360px;height: 360px;max-width: 100%")
    vue-cal.vuecal--green-theme(
      small
      :time-from="5 * 60"
      :time-step="15"
      :time-cell-height="18"
      active-view="day"
      :disable-views="['years', 'year', 'month']"
      hide-weekends)
      template(v-slot:time-cell="{ hours, minutes }")
        .vuecal__time-cell-line(:class="{ hours: !minutes }")
          strong.primary--text(v-if="!minutes" style="font-size: 15px;line-height: 18px") {{ hours }}
          span(v-else style="font-size: 11px;line-height: 18px") {{ minutes }}
  highlight-message.mt-6(type="tips").
    If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]]
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal small
             :time-from="5 * 60"
             :time-step="15"
             :time-cell-height="18"
             active-view="day"
             :disable-views="['years', 'year', 'month']"
             hide-weekends&gt;
      &lt;template v-slot:time-cell="{ hours, minutes }"&gt;
        &lt;div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }"&gt;
          &lt;strong v-if="!minutes" style="font-size: 15px"&gt;{{ '\{\{ hours \}\}' }}&lt;/strong&gt;
          &lt;span v-else style="font-size: 11px"&gt;{{ '\{\{ minutes \}\}' }}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;

  sshpre.mt-6(language="css" label="CSS").
    .vuecal__time-cell-line.hours:before {border-color: #42b983;}

  //- Example.
  h4.title
    a(href="#ex--custom-events-count") # Custom events count
    a#ex--custom-events-count(name="ex--custom-events-count")

  highlight-message(type="tips").
    Using Vue.js scoped slots, you can also override the counting events method if you need.#[br]
    If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]]
  p.
    In the following example, we only count the events which have the custom
    #[span.code leisure] CSS class (orange color).

  v-card.my-2.ma-auto.main-content(style="width: 300px;height: 360px;max-width: 100%")
    vue-cal.vuecal--green-theme.ex--custom-events-count(
      selected-date="2018-11-19"
      xsmall
      :time-from="10 * 60"
      :time-step="2 * 60"
      active-view="month"
      :disable-views="['day']"
      events-count-on-year-view
      :events="events")
      template(v-slot:events-count="{ events, view }")
        span(v-if="customEventsCount(events)") {{ customEventsCount(events) }}

  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             xsmall
             :time-from="10 * 60"
             :time-step="2 * 60"
             :disable-views="['day']"
             active-view="month"
             events-count-on-year-view
             :events="events"&gt;
        &lt;template v-slot:events-count="{ events, view }"&gt;
          &lt;span v-if="customEventsCount(events)"&gt;
            {{ '\{\{ customEventsCount(events) \}\}' }}
          &lt;/span&gt;
        &lt;/template&gt;
    &lt;/vue-cal&gt;

  p.
    Alternatively, you could also use the #[span.code cell-content] slot
    instead of the #[span.code events-count] slot to perform the same task:#[br]
    (Refer to the next example to know more:
    #[a(href="#ex--custom-title-and-cells" v-scroll-to="'#ex--custom-title-and-cells'") Custom title &amp; cells])
  sshpre.mt-2(language="html-vue" label="Vue Template").
    &lt;template v-slot:cell-content="{ cell, view, events }"&gt;
      &lt;span class="vuecal__cell-date"&gt;{{ '\{\{ cell.content \}\}' }}&lt;/span&gt;
      &lt;span class="vuecal__cell-events-count" v-if="['years', 'year', 'month'].includes(view.id) &amp;&amp; customEventsCount(events)"&gt;
        {{ '\{\{ customEventsCount(events) \}\}' }}
      &lt;/span&gt;
    &lt;/template&gt;

  sshpre(language="js" label="Javascript").
    // In your Vue component.
    methods: {
      customEventsCount: events => {
        return events ? events.filter(e => e.class === 'leisure').length : 0
      }
    }

  sshpre(language="css" label="CSS").
    .vuecal__cell-events-count {background: transparent;}
    .vuecal__cell-events-count span {
      background: #fd9c42;
      height: 100%;
      min-width: 12px;
      padding: 0 3px;
      border-radius: 12px;
      display: block;
    }

  //- Example.
  h4.title
    a(href="#ex--custom-title-and-cells") # Custom title &amp; cells
    a#ex--custom-title-and-cells(name="ex--custom-title-and-cells")
  highlight-message(type="tips").
    Using Vue.js scoped slots, you can override the calendar main date title and calendar cells.#[br]
    If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]]
  h5.mt-6.subtitle-1.font-weight-medium
    v-icon(size="22") keyboard_arrow_right
    | Custom title
  p.ml-2.mb-2.
    2 arguments are available through the scoped slot: #[span.code v-slot:title="{ title, view }"]
  ul
    li
      | #[span.code title], the formatted title (different on all the views). E.g.
      em.ml-2 "Week 2 (January 2019)"
    li
      | #[span.code view], an object containing the active view info.
      sshpre(language="js").mt-2.mb-3.
        {
          id: {String}, // Current view, one of: years, year, month, week, day.
          startDate: {Date}, // JavaScript Date object.
          endDate: {Date}, // JavaScript Date object.
          selectedDate: {Date} // JavaScript Date object.
        }
  p.
    You can use one or the other to format the title as you wish.#[br]
    Using the pre-formatted #[span.code title] will be easy but not very flexible.#[br]
    If you render the date yourself from #[span.code view.startDate], don't forget
    the different formats for all the views: years, year, month, week, day.

  h5.mt-6.subtitle-1.font-weight-medium
    v-icon(size="22") keyboard_arrow_right
    | Custom cells
  p.ml-2.mb-2.
    In this example, only the cell number is clickable on month view.#[br]
    5 arguments are available through the scoped slot:#[br]
    #[span.code v-slot:cell-content="{ cell, view, split, events, goNarrower }"]
  ul
    li #[span.code cell], object containing the cell date.
      sshpre(language="js").mt-2.mb-2.
        {
          content: {String}, // Pre-formatted cell content if any.
          startDate: {Date}, // JavaScript Date object.
          endDate: {Date}, // JavaScript Date object.
          formattedDate: {String}, // formatted start date. E.g. "2019-04-05".
          today: {Boolean}
        }
    li #[span.code view], object containing the active view info.
      sshpre(language="js").mt-2.mb-2.
        {
          id: {String}, // Current view, one of: years, year, month, week, day.
          startDate: {Date}, // JavaScript Date object.
          endDate: {Date}, // JavaScript Date object.
          selectedDate: {Date} // JavaScript Date object.
        }
    li #[span.code split], when splitting days, object containing the current split info.
    li #[span.code events], array containing all the events of the current cell or split.
    li #[span.code goNarrower], function to navigate to narrower view if possible.
  highlight-message.my-3(type="info")
    | By default a cell is rendered as follows.#[br]
    | It is a good idea to reuse the same CSS classes as the different elements have associated styles:#[br]
    sshpre.mt-3.mb-1(language="html-vue").
      &lt;div class="vuecal__flex vuecal__cell-content"&gt;
    sshpre.my-2.ml-5(language="html-vue" style="background-color: rgba(0, 177, 255, 0.08)").
      Now this is the part you can customize:

      &lt;!-- Will be added if splitting days and split labels are set --&gt;
      &lt;div class="split-label" /&gt;
      &lt;!-- Will be added on years, year &amp; month view --&gt;
      &lt;div class="vuecal__cell-date" /&gt;
      &lt;!-- Will be added on month view --&gt;
      &lt;div class="vuecal__cell-events-count" /&gt;
      &lt;!-- Will be added on week and day view if no event --&gt;
      &lt;div class="vuecal__no-event" /&gt;
    sshpre.my-1(language="html-vue").
          &lt;div class="vuecal__cell-events" /&gt;
      &lt;/div&gt;

  v-card.my-2.ma-auto.main-content(style="height: 400px")
    vue-cal.vuecal--green-theme.ex--custom-title-and-cells(
      :time="false"
      :dblclick-to-navigate="false"
      active-view="month"
      :events="events")
      template(v-slot:title="{ title, view }")
        | 🎉&nbsp;
        span(v-if="view.id === 'years'") Years
        span(v-else-if="view.id === 'year'") {{ view.startDate.format('YYYY') }}
        span(v-else-if="view.id === 'month'") {{ view.startDate.format('MMMM YYYY') }}
        span(v-else-if="view.id === 'week'") w{{ view.startDate.getWeek() }} ({{ view.startDate.format('MMM YYYY') }})
        span(v-else-if="view.id === 'day'") {{ view.startDate.format('dddd D MMMM (YYYY)') }}
        | &nbsp;🎉
      template(v-slot:cell-content="{ cell, view, events, goNarrower }")
        span.vuecal__cell-date.clickable(v-if="view.id !== 'day'" :class="view.id" @click="goNarrower") {{ cell.content }}
        .vuecal__cell-events-count(v-if="['years', 'year', 'month'].includes(view.id) && events.length") {{ events.length }}
        .vuecal__no-event(v-if="['week', 'day'].includes(view.id) && !events.length") Nothing here 👌

  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal :time="false"
             :dblclick-to-navigate="false"
             active-view="month"
             :events="events"&gt;

      &lt;!-- Custom title --&gt;
      &lt;template v-slot:title="{ title, view }"&gt;
        🎉
        &lt;span v-if="view.id === 'years'"&gt;Years&lt;/span&gt;
        &lt;!-- Using Vue Cal injected Date prototypes --&gt;
        &lt;span v-else-if="view.id === 'year'"&gt;{{ "\{\{ view.startDate.format('YYYY') \}\}" }}&lt;/span&gt;
        &lt;span v-else-if="view.id === 'month'"&gt;{{ "\{\{ view.startDate.format('MMMM YYYY') \}\}" }}&lt;/span&gt;
        &lt;span v-else-if="view.id === 'week'"&gt;w{{ "\{\{ view.startDate.getWeek() \}\} (\{\{ view.startDate.format('MMM YYYY') \}\}" }})&lt;/span&gt;
        &lt;span v-else-if="view.id === 'day'"&gt;{{ "\{\{ view.startDate.format('dddd D MMMM (YYYY)') \}\}" }}&lt;/span&gt;
        🎉
      &lt;/template&gt;

      &lt;!-- Custom cells --&gt;
      &lt;template v-slot:cell-content="{ cell, view, events, goNarrower }"&gt;
        &lt;span class="vuecal__cell-date" :class="view.id" v-if="view.id === 'day'" @click="goNarrower"&gt;
          {{ '\{\{ cell.date.getDate() \}\}' }}
        &lt;/span&gt;
        &lt;span class="vuecal__cell-events-count" v-if="view.id === 'month' &amp;&amp; events.length"&gt;{{ '\{\{ events.length \}\}' }}&lt;/span&gt;
        &lt;span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) &amp;&amp; !events.length"&gt;Nothing here 👌&lt;/span&gt;
      &lt;/template&gt;

      &lt;!-- Alternatively to custom cells if you just want custom no-event text: --&gt;
      &lt;!-- &lt;template v-slot:no-event&gt;Nothing here 👌&lt;/template&gt; --&gt;
    &lt;/vue-cal&gt;

  //- Example.
  h4.title
    a(href="#ex--custom-event-rendering") # Custom event rendering
    a#ex--custom-event-rendering(name="ex--custom-event-rendering")
  p.mb-2 Using Vue.js scoped slots, you can override the events rendering.

  highlight-message.my-2(type="tips").
    If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]].
  highlight-message.my-3(type="info")
    | By default an event is rendered as follows.#[br]
    | It is a good idea to reuse the same CSS classes as the different elements have associated styles:#[br]
    sshpre.mt-3.mb-1(language="html-vue").
      &lt;div class="vuecal__event"&gt;
          &lt;!-- Will be added if `editable-events` option is set to `true` --&gt;
          &lt;div class="vuecal__event-delete" /&gt;
    sshpre.my-2.ml-5(language="html-vue" style="background-color: rgba(0, 177, 255, 0.08)").
      Now this is the part you can customize:

      &lt;!-- Will be added if a title is set --&gt;
      &lt;div class="vuecal__event-title" /&gt;
      &lt;!-- or if title is set and `editable-events` option is set to `true` --&gt;
      &lt;div class="vuecal__event-title vuecal__event-title--edit" contenteditable /&gt;

      &lt;!-- Will be added if `time` option is set to `true` --&gt;
      &lt;div class="vuecal__event-time" /&gt;

      &lt;!-- Will be added if a content is set --&gt;
      &lt;div class="vuecal__event-content" /&gt;
    sshpre.my-1(language="html-vue").
          &lt;!-- Will be added if `editable-events` option is set to `true` --&gt;
          &lt;div class="vuecal__event-resize-handle" /&gt;
      &lt;/div&gt;
  p.mb-2.
    Two parameters are passed through the scoped slot:
  ul
    li #[span.code event]: The event full object containing dates, time, title, content and custom attributes.
    li #[span.code view]: The current selected view id.
  p.mt-2.
    You can set any custom attribute you want on an event, they will then be accessible in your custom event renderer!#[br]
    Note that #[span.code _eid] is a reserved keyword.

  v-card.my-2.ma-auto.main-content(style="height: 520px")
    vue-cal.vuecal--green-theme.ex--custom-event-rendering(
      selected-date="2018-11-19"
      :time-from="9 * 60"
      :time-to="19 * 60"
      hide-weekends
      :events="eventsToPop")
      template(v-slot:event="{ event, view }")
        v-icon.mt-2(color="white" x-large) {{ event.icon }}
        .vuecal__event-title.mb-6(v-html="event.title")
        small.vuecal__event-time
          strong.mr-1 Event start:
          span {{ event.start.formatTime('h O\'clock') }}
          br
          strong.mr-1 Event end:
          span {{ event.end.formatTime('h O\'clock') }}
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="9 * 60"
             :time-to="19 * 60"
             hide-weekends
             :events="events"&gt;
      &lt;template v-slot:event="{ event, view }"&gt;
        &lt;v-icon&gt;{{ '\{\{ event.icon \}\}' }}&lt;/v-icon&gt;

        &lt;div class="vuecal__event-title" v-html="event.title" /&gt;
        &lt;!-- Or if your events are editable: --&gt;
        &lt;div class="vuecal__event-title vuecal__event-title--edit"
             contenteditable
             @blur="event.title = $event.target.innerHTML"
             v-html="event.title" /&gt;

        &lt;small class="vuecal__event-time"&gt;
          &lt;!-- Using Vue Cal injected Date prototypes --&gt;
          &lt;strong&gt;Event start:&lt;/strong&gt; &lt;span&gt;{{ '\{\{ event.start.formatTime("h O\'clock") \}\}' }}&lt;/span&gt;&lt;br/&gt;
          &lt;strong&gt;Event end:&lt;/strong&gt; &lt;span&gt;{{ '\{\{ event.end.formatTime("h O\'clock") \}\}' }}&lt;/span&gt;
        &lt;/small&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    events: [
      {
        start: '2018-11-20 14:00',
        end: '2018-11-20 18:00',
        title: 'Need to go shopping',
        icon: 'shopping_cart', // Custom attribute.
        class: 'leisure'
      },
      {
        start: '2018-11-22 10:00',
        end: '2018-11-22 15:00',
        title: 'Golf with John',
        icon: 'golf_course', // Custom attribute.
        class: 'sport'
      }
    ]

  //- Example.
  h4.title
    a(href="#ex--custom-day-split-labels") # Custom day split labels
    a#ex--custom-day-split-labels(name="ex--custom-day-split-labels")
  p.mb-6 You can provide a custom split label when a simple label is not enough.

  v-card.my-2.ma-auto.main-content(style="height: 250px")
    vue-cal.ex--custom-day-split-labels.vuecal--green-theme(
      :disable-views="['years', 'year', 'month']"
      active-view="day"
      :split-days="customDaySplitLabels"
      :hide-weekdays="[5, 6, 7]"
      sticky-split-labels)
      template(v-slot:no-event) &nbsp;
      template(v-slot:split-label="{ split, view }")
        v-icon(:color="split.color" size="18") person
        strong(:style="`color: ${split.color}`") {{ split.label }}

  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal :disable-views="['years', 'year', 'month']"
             active-view="day"
             :split-days="daySplits"
             :hide-weekdays="[5, 6, 7]"
             sticky-split-labels&gt;
      &lt;template v-slot:split-label="{ split, view }"&gt;
        &lt;i class="icon material-icons"&gt;person&lt;/i&gt;
        &lt;strong :style="`color: ${split.color}`"&gt;{{ '\{\{ split.label \}\}' }}&lt;/strong&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    // In data.
    customDaySplitLabels: [
      { label: 'John', color: 'blue', class: 'split1' },
      { label: 'Tom', color: 'green', class: 'split2' },
      { label: 'Kate', color: 'orange', class: 'split3' },
      { label: 'Jess', color: 'red', class: 'split4' }
    ]

  sshpre(language="css" label="CSS").
    .vuecal .day-split-header {font-size: 11px;}
    .vuecal__body .split1 {background-color: rgba(226, 242, 253, 0.7);}
    .vuecal__body .split2 {background-color: rgba(232, 245, 233, 0.7);}
    .vuecal__body .split3 {background-color: rgba(255, 243, 224, 0.7);}
    .vuecal__body .split4 {background-color: rgba(255, 235, 238, 0.7);}
    .vuecal__no-event {display: none;}

  v-dialog(v-model="showDialog" max-width="600")
    v-card
      v-card-title.primary.white--text.py-2
        v-icon.mr-3(color="white") {{ selectedEvent.icon }}
        span.headline.text-uppercase {{ selectedEvent.title }}
        v-spacer
        strong {{ selectedEvent.start && selectedEvent.start.format('DD/MM/YYYY') }}
      v-card-text.py-4
        p(v-html="selectedEvent.contentFull")
        strong Event details:
        ul
          li Event starts at: {{ selectedEvent.start && selectedEvent.start.formatTime() }}
          li Event ends at: {{ selectedEvent.end && selectedEvent.end.formatTime() }}

  v-dialog(v-model="showEventCreationDialog" :persistent="true" max-width="420")
    v-card
      v-card-title.pa-2.primary.white--text
        v-text-field.ma-0.pa-0(v-model="selectedEvent.title" placeholder="Event Title" hide-details color="white")
      v-card-text.pa-2
        v-textarea.pa-0(v-model="selectedEvent.content" placeholder="Event Content" rows="3" hide-details)
        v-layout.justify-space-between
          v-select.flex.shrink(
            :items="eventsCssClasses"
            placeholder="Event CSS Class"
            @change="selectedEvent.class = $event"
            :value="selectedEvent.class"
            hide-details
            style="max-width: 170px")
          v-switch.flex.shrink(v-model="selectedEvent.background" label="Background Event" color="primary")
        v-layout.mt-2
          v-spacer
          v-btn.ma-1(small @click="cancelEventCreation()") Cancel
          v-btn.ma-1(small color="primary" @click="closeCreationDialog()") Save
</template>

<script>
import VueCal from '@/vue-cal'
import Sshpre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import HighlightMessage from './components/highlight-message'
import './scss/examples.scss'

const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' }

const events = [
  {
    start: '2018-10-30 10:30',
    end: '2018-10-30 11:30',
    title: 'Doctor appointment',
    content: '<i class="v-icon material-icons">local_hospital</i>',
    class: 'health',
    split: 1
  },
  {
    start: '2018-11-16 10:30',
    end: '2018-11-16 11:30',
    title: 'Doctor appointment',
    content: '<i class="v-icon material-icons">local_hospital</i>',
    class: 'health',
    split: 1
  },
  {
    start: '2018-11-19 10:35',
    end: '2018-11-19 11:30',
    title: 'Doctor appointment',
    content: '<i class="v-icon material-icons">local_hospital</i>',
    class: 'health',
    split: 1
  },
  {
    start: '2018-11-19 18:30',
    end: '2018-11-19 19:15',
    title: 'Dentist appointment',
    content: '<i class="v-icon material-icons">local_hospital</i>',
    class: 'health',
    split: 2
  },
  {
    start: '2018-11-20 18:30',
    end: '2018-11-20 20:30',
    title: 'Crossfit',
    content: '<i class="v-icon material-icons">fitness_center</i>',
    class: 'sport',
    split: 2
  },
  {
    start: '2018-11-21 11:00',
    end: '2018-11-21 13:00',
    title: 'Brunch with Jane',
    content: '<i class="v-icon material-icons">local_cafe</i>',
    class: 'leisure',
    split: 1,
    background: false
  },
  {
    start: '2018-11-21 19:30',
    end: '2018-11-21 23:00',
    title: 'Swimming lesson',
    content: '<i class="v-icon material-icons">pool</i>',
    class: 'sport',
    split: 2
  },
  {
    start: '2018-11-23 12:30',
    end: '2018-11-23 13:00',
    title: 'Macca\'s with Mark',
    content: '<i class="v-icon material-icons">fastfood</i>',
    class: 'leisure',
    split: 2
  },
  {
    start: '2018-11-23 21:00',
    end: '2018-11-23 23:30',
    title: 'Movie time',
    content: '<i class="v-icon material-icons">local_play</i>',
    class: 'leisure',
    split: 1
  },
  {
    start: '2018-11-30 21:00',
    end: '2018-11-30 23:30',
    title: 'Another movie tonight',
    content: '<i class="v-icon material-icons">local_play</i>',
    class: 'leisure',
    split: 1
  }
]

export default {
  components: { VueCal, Sshpre, HighlightMessage },

  props: {
    localesList: { type: Array }
  },

  data: () => ({
    locale: 'zh-cn',
    splitsExample: {
      minCellWidth: 400,
      minSplitWidth: 0,
      stickySplitLabels: false,
      splitDays: [
        { id: 1, class: 'mom', label: 'Mom' },
        { id: 2, class: 'dad', label: 'Dad', hide: false },
        { id: 3, class: 'kid1', label: 'Kid 1' },
        { id: 4, class: 'kid2', label: 'Kid 2' },
        { id: 5, class: 'kid3', label: 'Kid 3' }
      ]
    },
    example1theme: 'green',
    minEventWidth: 0,
    timeCellHeight: 26,
    indicatorStyle: 'count',
    now: new Date(),
    logs: [],
    showDialog: false,
    showEventCreationDialog: false,
    showAllDayEvents: 0,
    shortEventsOnMonthView: false,
    events,
    selectedEvent: {},
    eventsCssClasses: ['leisure', 'sport', 'health'],
    selectedDate: null,
    activeView: 'week',
    logMouseEvents: false,
    snapToTime15: false,
    dragToCreateThreshold: 15,
    customDaySplitLabels: [
      { label: 'John', color: 'blue', class: 'split1' },
      { label: 'Tom', color: 'green', class: 'split2' },
      { label: 'Kate', color: 'orange', class: 'split3' },
      { label: 'Jess', color: 'red', class: 'split4' }
    ],
    editableEvents: [
      ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
      {
        start: '2018-11-20 14:00',
        end: '2018-11-20 17:30',
        title: 'Boring event',
        content: '<i class="v-icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
        class: 'blue-event',
        deletable: false,
        resizable: false,
        draggable: false
      }
    ],
    overlappingEvents: [
      ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
      {
        start: '2018-11-21 14:00',
        end: '2018-11-21 22:00',
        title: 'A big thing',
        content: '<i class="v-icon material-icons">sentiment_satisfied_alt</i>',
        class: 'health'
      },
      {
        start: '2018-11-21 16:00',
        end: '2018-11-21 19:00',
        title: 'Another thing',
        content: '<i class="v-icon material-icons">thumb_up</i>',
        class: 'blue-event'
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Eat pop corns',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure'
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Enjoy the movie',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure'
      }
    ],
    eventsCopy: [
      ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
      {
        start: '2018-11-21 12:00',
        end: '2018-11-21 12:30',
        title: 'Recall Dave',
        content: '<i class="v-icon material-icons">local_cafe</i>',
        class: 'leisure'
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Eat pop corns',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure'
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Enjoy the movie',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure'
      }
    ],
    eventsCopy2: [
      ...events.map(e => ({ ...e })) // Clone when reusing, so events are independent.
    ],
    eventsCopy3: [
      ...events.map(e => ({ ...e })) // Clone when reusing, so events are independent.
    ],
    multipleDayEvents: [
      {
        start: '2018-11-16 10:00',
        end: '2018-11-20 12:37',
        title: 'Running Marathon',
        content: '<i class="v-icon material-icons">directions_run</i>',
        class: 'sport'
      },
      {
        start: '2018-11-20 10:00',
        end: '2018-11-20 10:25',
        title: 'Drink water!',
        content: '<i class="v-icon material-icons">local_drink</i>',
        class: 'health drink-water'
      },
      {
        start: '2018-11-21 19:00',
        end: '2018-11-23 11:30',
        title: 'Trip to India',
        content: '<i class="v-icon material-icons">flight</i>',
        class: 'leisure'
      }
    ],
    recurringEvents: [],
    allDayEvents: [
      {
        start: '2019-02-12',
        end: '2019-02-12',
        title: 'Day off!',
        content: '<i class="v-icon material-icons">beach_access</i>',
        class: 'yellow-event',
        allDay: true
      },
      {
        start: '2019-02-14',
        end: '2019-02-14',
        title: 'Valentine\'s day',
        content: '<i class="v-icon material-icons">favorite_outline</i>',
        class: 'pink-event',
        allDay: true
      },
      {
        start: '2019-02-14',
        end: '2019-02-14',
        title: 'Need to go shopping',
        content: '<i class="v-icon material-icons">shopping_cart</i>',
        class: 'leisure',
        allDay: true
      },
      {
        start: '2019-02-11 10:35',
        end: '2019-02-11 11:30',
        title: 'Doctor appointment',
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: 'health',
        split: 1
      },
      {
        start: '2019-02-11 18:30',
        end: '2019-02-11 19:15',
        title: 'Dentist appointment',
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: 'health',
        split: 2
      },
      {
        start: '2019-02-12 18:30',
        end: '2019-02-12 20:30',
        title: 'Crossfit',
        content: '<i class="v-icon material-icons">fitness_center</i>',
        class: 'sport',
        split: 1
      },
      {
        start: '2019-02-13 11:00',
        end: '2019-02-13 13:00',
        title: 'Brunch with Jane',
        content: '<i class="v-icon material-icons">local_cafe</i>',
        class: 'leisure',
        split: 1
      },
      {
        start: '2019-02-13 19:30',
        end: '2019-02-13 23:00',
        title: 'Swimming lesson',
        content: '<i class="v-icon material-icons">pool</i>',
        class: 'sport',
        split: 2
      },
      {
        start: '2019-02-15 12:30',
        end: '2019-02-15 13:00',
        title: 'Macca\'s with Mark',
        content: '<i class="v-icon material-icons">fastfood</i>',
        class: 'leisure',
        split: 2
      },
      {
        start: '2019-02-15 21:00',
        end: '2019-02-15 23:30',
        title: 'Movie time',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure',
        split: 1
      }
    ],
    splitEvents: [
      ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
      {
        start: '2018-11-21 12:00',
        end: '2018-11-21 12:30',
        title: 'Recall Dave',
        content: '<i class="v-icon material-icons">local_cafe</i>',
        class: 'leisure',
        split: 1
      },
      {
        start: '2018-11-21 20:00',
        end: '2018-11-21 22:00',
        title: 'Salsa',
        content: '<i class="v-icon material-icons">directions_walk</i>',
        class: 'sport',
        split: 1
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Movie time',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure',
        split: 2
      }
    ],
    backgroundEvents: [
      ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
      {
        start: '2018-11-19 12:00',
        end: '2018-11-19 14:00',
        title: 'LUNCH',
        class: 'lunch',
        background: true
      },
      {
        start: '2018-11-20 12:00',
        end: '2018-11-20 14:00',
        title: 'LUNCH',
        class: 'lunch',
        background: true
      },
      {
        start: '2018-11-21 12:00',
        end: '2018-11-21 14:00',
        title: 'LUNCH',
        class: 'lunch',
        background: true
      },
      {
        start: '2018-11-22 12:00',
        end: '2018-11-22 14:00',
        title: 'LUNCH',
        class: 'lunch',
        background: true
      },
      {
        start: '2018-11-23 12:00',
        end: '2018-11-23 14:00',
        title: 'LUNCH',
        class: 'lunch',
        background: true
      }
    ],
    timelessEvents: [
      {
        start: '2018-11-21',
        end: '2018-11-21',
        title: 'Need to go shopping',
        content: '<i class="v-icon material-icons">shopping_cart</i>',
        class: 'leisure'
      },
      {
        start: '2018-11-21',
        end: '2018-11-21',
        title: 'Golf with John',
        content: '<i class="v-icon material-icons">golf_course</i>',
        class: 'sport'
      },
      {
        start: '2018-11-22',
        end: '2018-11-22',
        title: 'Dad\'s birthday!',
        content: '<i class="v-icon material-icons">cake</i>',
        class: 'sport'
      },
      {
        start: '2018-11-23',
        end: '2018-11-23',
        title: 'Black Friday',
        content: '<i class="v-icon material-icons">shopping_cart</i>',
        class: 'leisure'
      }
    ],
    eventsToDrag: [
      {
        start: '2018-11-21 14:00',
        end: '2018-11-21 16:30',
        title: 'Surgery',
        content: '<i class="v-icon material-icons">restaurant</i>',
        class: 'health',
        split: 2
      }
    ],
    eventsToPop: [
      {
        start: '2018-11-20 14:00',
        end: '2018-11-20 18:00',
        title: 'Need to go shopping',
        icon: 'shopping_cart',
        content: 'Click to see my shopping list',
        contentFull: 'My shopping list is rather long:<br><ul><li>Avocados</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>',
        class: 'leisure'
      },
      {
        start: '2018-11-22 10:00',
        end: '2018-11-22 15:00',
        title: 'Golf with John',
        icon: 'golf_course',
        content: 'Do I need to tell how many holes?',
        contentFull: 'Okay.<br>It will be a 18 hole golf course.',
        class: 'sport'
      }
    ],
    draggables: [
      {
        id: 1,
        title: 'Ext. Event 1',
        content: 'content 1',
        duration: 60
      },
      {
        id: 2,
        title: 'Ext. Event 2',
        content: 'content 2',
        duration: 30
      },
      {
        id: 3,
        title: 'Ext. Event 3',
        content: 'content 3'
      }
    ],
    deleteEventFunction: null,
    deleteDragEventFunction: null
  }),

  methods: {
    logEvents (emittedEventName, params) {
      if (!this.logMouseEvents && emittedEventName.includes('event-mouse')) return

      this.logs.push({ name: emittedEventName, args: JSON.stringify(params) })
    },
    clearEventsLog () {
      this.logs = []
    },
    customEventsCount: events => events ? events.filter(e => e.class === 'leisure').length : 0,
    scrollToCurrentTime (vuecal) {
      const calendar = document.querySelector(`${vuecal} .vuecal__bg`)
      const hours = this.now.getHours() + this.now.getMinutes() / 60
      calendar.scrollTo({ top: hours * this.timeCellHeight, behavior: 'smooth' })
    },
    scrollToTop (vuecal) {
      const calendar = document.querySelector(`${vuecal} .vuecal__bg`)
      calendar.scrollTo({ top: 0, behavior: 'smooth' })
    },
    onEventClick (event, e) {
      this.selectedEvent = event
      this.showDialog = true
      e.stopPropagation()
    },
    cancelEventCreation () {
      this.closeCreationDialog();
      (this.deleteEventFunction || this.deleteDragEventFunction)()
    },
    closeCreationDialog () {
      this.showEventCreationDialog = false
      this.selectedEvent = {}
    },
    onEventCreate (event, deleteEventFunction) {
      this.selectedEvent = event
      this.showEventCreationDialog = true
      this.deleteEventFunction = deleteEventFunction

      return event
    },
    onEventDragStartCreate (event, deleteEventFunction) {
      this.selectedEvent = event
      this.deleteEventFunction = deleteEventFunction

      return event
    },
    customEventCreation () {
      let today = new Date(new Date().setHours(13, 15))
      // If today is on weekend subtract 2 days for the event to always be visible with hidden weekends.
      if (!today.getDay() || today.getDay() > 5) today = today.subtractDays(2)
      const dateTime = prompt('Create event on (YYYY-MM-DD HH:mm)', today.format('YYYY-MM-DD HH:mm'))
      if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateTime)) {
        this.$refs.vuecal.createEvent(dateTime, 120, { title: 'New Event', content: 'yay! 🎉', class: 'blue-event' })
      }
      else if (dateTime) alert('Wrong date format.')
    },
    overrideDateTexts () {
      // In Vue Cal documentation Chinese texts are loaded last.
      // Override Date texts with english for prototype formatting functions.
      setTimeout(this.$refs.vuecal.updateDateTexts, 3000)
    },
    onEventDragStart (e, draggable) {
      e.dataTransfer.setData('event', JSON.stringify(draggable))
      e.dataTransfer.setData('cursor-grab-at', e.offsetY)
    },
    onEventDrop ({ event, originalEvent, external }) {
      if (external) {
        const extEventToDeletePos = this.draggables.findIndex(item => item.id === originalEvent.id)
        if (extEventToDeletePos > -1) this.draggables.splice(extEventToDeletePos, 1)
      }
    }
  },

  computed: {
    reversedLogs () {
      return this.logs.slice(0).reverse()
    },
    todayFormattedNotWeekend () {
      let today = new Date(new Date().setHours(13, 15))
      // If today is on weekend subtract 2 days for the event to always be visible with hidden weekends.
      if (!today.getDay() || today.getDay() > 5) today = today.subtractDays(2)
      return today.format('YYYY-MM-DD HH:mm')
    },
    minDate () {
      return new Date().subtractDays(10)
    },
    maxDate () {
      return new Date().addDays(10)
    },
    specialHours: () => Array(5).fill('').reduce((obj, item, i) => (obj[i + 1] = dailyHours) && obj, {})
  },

  created () {
    if (!HTMLElement.prototype.scrollTo) HTMLElement.prototype.scrollTo = function ({ top }) { this.scrollTop = top }
  }
}
</script>
