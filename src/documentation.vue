<template lang="pug">
.documentation
  .text-xs-center.todo(style="margin: 0 auto 7em;max-width: 900px")
    h2.title.mt-5 To do...
    p.mb-2 Here is my ongoing to do list.

    div Earlier
    div(style="transform: scale(0.85);opacity: 0.8")
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | default active view
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Enable / disable views
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Hide / show weekends
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Add timeline w/ timerange &amp; increment
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Add timeline
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | time format 12/24 h
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Support for i18n
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Split days
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Support events
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Background events
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Overlap events
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Keep only default style in CSS
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Allow custom arrows
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Default active date
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Double tap on touch devices
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        strong 1st NPM Release!
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Built-in themes
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Resize events
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Delete events
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Emit DOM events
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Event indicator on month view
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Custom time format
      v-chip.pr-1(color="green" outline small disabled)
        v-icon.mr-1 check
        | Highlight current time
    .mb-2 Current backlog
    v-chip.pr-1(color="green" outline small disabled)
      v-icon.mr-1 check
      | Show events on month view
    v-chip.pr-1(color="green" outline small disabled)
      v-icon.mr-1 check
      | Multiple day events
    v-chip.pr-1(color="amber darken-1" outline small disabled)
      v-icon.mr-1 timer
      | Create an event
    v-chip.pr-1(color="amber darken-1" outline small disabled)
      v-icon.mr-1 timer
      | Support more simultaneous events
    v-chip.pr-1(color="deep-orange" outline small disabled)
      v-icon.mr-1 access_time
      | Drag events
    v-chip.pr-1(color="deep-orange" outline small disabled)
      v-icon.mr-1 access_time
      | Optional tooltip on events
    v-chip.pr-1(color="deep-orange" outline small disabled)
      v-icon.mr-1 access_time
      | Option to start week on Sunday
    v-chip.pr-1(color="deep-orange" outline small disabled)
      v-icon.mr-1 access_time
      | Highlight all day events
    v-chip.pr-1(color="deep-orange" outline small disabled)
      v-icon.mr-1 access_time
      | Resize events snap to time
    v-chip.pr-1(color="deep-orange" outline small disabled)
      v-icon.mr-1 access_time
      | Drag events snap to time
    v-chip.pr-1(color="deep-orange" outline small disabled)
      v-icon.mr-1 access_time
      | Recurring events
    v-chip.pr-1(color="deep-orange" outline small disabled)
      v-icon.mr-1 access_time
      | More control on events rendering

  h2.headline.mt-5.mb-3.title Github project
  v-layout.mb-5(align-center shrink)
    v-icon.pr-4.lightgrey--text(x-large) fab fa-github
    a(href="https://github.com/antoniandre/vue-cal" target="_blank") //github.com/antoniandre/vue-cal #[v-icon(small color="primary") open_in_new]

  highlight-message(type="info")
    strong Important Notes#[br]
    | Options &amp; CSS classes may change a bit with new version release.
    | Keep checking the #[a(href="#release-notes") Release Notes]!#[br]#[br]
    strong Philosophy:&nbsp;
    | Vue Cal tries to separate logic &amp; styles.#[br]
    | For performance, simplified logic, readability, structure &amp; maintenance of your own code,
    | what can be done via CSS should be done via CSS. CSS classes will help you style your events, cells, splits, etc.

  h2.headline.mt-5
    a(href="#installation") Installation
    a#installation(name="installation")
  p You have 2 options: #[em NPM] #[strong.mx-2 or] #[span.code &lt;script&gt;] tag.
  h3 Via NPM
  sshpre.mt-2(language="shell" label="Shell") npm install vue-cal --save-dev
  p Then import the component and use it:
  sshpre.mt-2(language="js" label="Javascript").
    // In your VueJS component.
    import VueCal from 'vue-cal'
    import 'vue-cal/dist/vuecal.css'
    ...

    export default {
      components: { VueCal },
      data: () => ({
        ...
      }),
      ...
    }

  h3 Via #[span.code &lt;script&gt;] tag
  p Include the Vue Cal script in your document #[span.code &lt;head&gt;] as follows:
  sshpre.mt-4(language="html" label="HTML").
    &lt;head&gt;
      ...
      &lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
      &lt;script src="https://unpkg.com/vue-cal"&gt;&lt;/script&gt;
      &lt;link href="https://unpkg.com/vue-cal/dist/vuecal.css" rel="stylesheet"&gt;
    &lt;/head&gt;
  p Then define the component to use in your template:
  sshpre.mt-4(language="js" label="Javascript").
    // In your VueJS component.
    export default {
      components: { 'vue-cal': vuecal },
      ...
    }

  h2.headline.mt-5.pt-5
    a(href="#how-to-use") How to use
    a#how-to-use(name="how-to-use")
  highlight-message(type="warning")
    p.
      Wait! Before you dive in, make sure you place Vue cal in a container that #[strong has a set height] (not auto or initial)!#[br]
      By default Vue Cal will take the full width &amp; height of its container if it has set a height.
    sshpre.mt-2(language="html-vue").
      &lt;!-- If the container has no height, set a height on vue-cal --&gt;
      &lt;vue-cal style="height: 250px"&gt;&lt;/vue-cal&gt;
    vue-cal(small :time="false" hide-view-selector style="height: 250px")

  h2.headline.mt-5.pt-5
    a(href="#examples") Examples
    a#examples(name="examples")
  highlight-message.mt-3(type="success" no-icon)
    v-layout(align-center)
      v-icon.ml-1.mr-3(color="green lighten-2") fab fa-codepen
      | Try it yourself:
      a.ml-2(href="https://codepen.io/antoniandre/pen/pGJWjL") //codepen.io/antoniandre/pen/pGJWjL

  //- Example.
  h3.title.mt-5.mb-2
    a(href="#ex--basic") # Basic with no timeline &amp; hidden weekends
    a#ex--basic(name="ex--basic")
  p
    | Double click cell to go to a narrower view and click the title to go to a broader view.#[br]
    | By default the calendar theme is grey to match with most of web pages.#[br]
    | You can easily change the color theme (#[a(href="#css-notes") learn how]): try this
    v-btn(dark small :color="example1theme === 'green' ? 'rgba(66, 163, 185, 0.8)' : 'primary'" @click="example1theme = example1theme === 'green' ? 'blue' : 'green'") {{ example1theme === "green" ? 'blue theme' : 'green theme' }}
  v-card.my-2.ma-auto.main-content(style="height: 450px;")
    vue-cal(:class="`vuecal--${example1theme}-theme`" :time="false" hide-weekends)
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal :time="false" hide-weekends&gt;&lt;/vue-cal&gt;
  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--small-cal") # Small calendar, no time, hidden view selector &amp; custom arrows
    a#ex--small-cal(name="ex--small-cal")
  p.
    Extra-small, no timeline, hidden view selector &amp; custom arrows (using the reserved slots #[span.code arrowPrev] &amp; #[span.code arrowNext]).#[br]
    With a hidden view selector, you can still navigate between the different views: double click cell to go to a narrower view, click title to go to a broader view.
  v-card.my-2.ma-auto.main-content(style="width: 250px;height: 260px;")
    vue-cal.vuecal--green-theme(hide-view-selector :time="false" default-view="month" xsmall)
      v-icon(slot="arrowPrev") arrow_back
      v-icon(slot="arrowNext") arrow_forward
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal hide-view-selector :time="false" default-view="month" xsmall&gt;
      &lt;i slot="arrowPrev" aria-hidden="true" class="v-icon material-icons"&gt;arrow_back&lt;/i&gt;
      &lt;i slot="arrowNext" aria-hidden="true" class="v-icon material-icons"&gt;arrow_forward&lt;/i&gt;
    &lt;/vue-cal&gt;

  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--calendar-themes") # Calendar themes - Rounded cells
    a#ex--calendar-themes(name="ex--calendar-themes")
  p.
    You can easily change the calendar color theme or use the rounded-cells theme
    by applying the corresponding CSS class on the #[span.code &lt;vuecal&gt;] tag.#[br]
    E.g. #[span.code vuecal--rounded-theme], #[span.code vuecal--green-theme], #[span.code vuecal--blue-theme].
    Read more about calendar themes in the
    #[a(href="#css-notes") CSS Notes] section.

  v-layout.ma-auto(row justify-center wrap)
    v-card.ma-2.main-content(style="width: 280px;height: 300px")
      vue-cal.vuecal--rounded-theme.vuecal--blue-theme(xsmall hide-view-selector 12-hour :time="false" default-view="month" :disable-views="['week']")
    v-card.ma-2.main-content(style="width: 280px;height: 300px")
      vue-cal.vuecal--rounded-theme.vuecal--green-theme(xsmall hide-view-selector 12-hour :time="false" default-view="month" :disable-views="['week']")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal class="vuecal--rounded-theme vuecal--green-theme"
             xsmall
             hide-view-selector
             :time="false"
             default-view="month"
             :disable-views="['week']"&gt;
    &lt;/vue-cal&gt;
  highlight-message Refer to the #[span.code disableViews] option in the #[a(href="#api") API] section.

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--custom-title-and-no-event-text") # Custom vue-cal title &amp; "no event" text
    a#ex--custom-title-and-no-event-text(name="ex--custom-title-and-no-event-text")
  highlight-message(type="tips").
    Using Vue.js scoped slots, you can override the main date title.#[br]
    if you are not familiar with scoped slots and destructuring slot-scope, first read about it on
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]]
  p.mb-2.
    In the following example, we set a custom title with Emoji.#[br]
    2 arguments are available from the scope:
  ul
    li
      | #[span.code title], the formatted title. E.g.
      em.ml-2 "Week 2 (January 2019)"
    li
      | #[span.code view], an object containing the active view info. E.g.
      sshpre(language="js").mt-3.
        {
          id: "week",
          startDate: "2019-01-07T10:38:21.721Z", // Javscript Date object.
          selectedDate: "2019-01-10T10:38:21.721Z" // Javscript Date object.
        }
  p.
    You can use one or the other to format the title as you wish.
    As #[span.code title] is already formatted it is not as flexible as manipulating
    the #[span.code view.startDate] yourself.#[br]
    The down side if you use the #[span.code view] object is that you have to handle
    all the calendar views date cases yourself (years, year, month, week, day have different titles).

  v-card.my-2.ma-auto.main-content(style="height: 350px;")
    vue-cal.vuecal--green-theme(:time="false" :disable-views="['years', 'year', 'month', 'day']")
      div(slot="title" slot-scope="{ title, view }")
        | 🎉 {{ view.startDate.getFullYear() }}-{{ view.startDate.getMonth() + 1 }} - week {{ view.startDate.getWeek() }} 🎉
      div(slot="no-event") Nothing here 👌
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time="false"
             :disable-views="['years', 'year', 'month', 'day']"
             hide-weekends
             :events="events"&gt;
      &lt;div slot="title" slot-scope="{ title, view }"&gt;
        🎉 {{ '\{\{ view.startDate.getFullYear() \}\}' }} - {{ '\{\{ view.startDate.getMonth() + 1 \}\}' }}
        - week {{ '\{\{ view.startDate.getWeek() \}\}' }} 🎉
      &lt;/div&gt;
      &lt;div slot="no-event"&gt;Nothing here 👌&lt;/div&gt;
    &lt;/vue-cal&gt;

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--internationalization") # Internationalization (i18n)
    a#ex--internationalization(name="ex--internationalization")
  p.
    Let you translate the calendar texts into your own language (#[span.code locale]).#[br]
    Refer to the #[span.code locale] option in the #[a(href="#api") API] section.
  v-card.my-2.ma-auto.main-content(style="width: 500px;height: 340px;max-width: 100%")
    vue-cal.vuecal--green-theme(:time="false" small default-view="year" locale="zh-cn")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal hide-view-selector :time="false" small default-view="year" locale="zh-cn"&gt;&lt;/vue-cal&gt;

  //- Example.
  h3.title.mt-3.mb-2.pt-4
    a(href="#ex--timeline") # Timeline
    a#ex--timeline(name="ex--timeline")
  p.
    Timelines are visible on week view and day view.#[br]
    This examples has a set time range from 08:00 to 22:00, time step of 30 minutes (1 hour by default), 24-hour format, and hidden weekends.
  v-card.my-2.ma-auto.main-content(style="height: 450px")
    vue-cal.vuecal--green-theme(:time-from="8 * 60" :time-to="22 * 60" :time-step="30" hide-weekends)
  sshpre(language="html-vue" label="Vue Template").
    &lt;!-- Time-start time-end &amp; time-step are expected in minutes. --&gt;
    &lt;vue-cal :time-from="8 * 60" :time-to="22 * 60" :time-step="30" hide-weekends&gt;&lt;/vue-cal&gt;
  highlight-message For all the options details, refer to the #[a(href="#api") API] section.

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--timeline-tweaking") # Timeline tweaking
    a#ex--timeline-tweaking(name="ex--timeline-tweaking")
  p.mb-0.
    If you want to have more fancy time cells, you can override them with the
    #[span.code time-cell-height] option (in pixels) and scoped slots.#[br]
    For even more flexibility, the horizontal lines are painted when you set the CSS class #[span.code line] on the tag you choose.
    So if you don't set this class you are free to paint the lines yourself or not.
  v-card.my-2.ma-auto.main-content(style="width: 360px;height: 360px")
    vue-cal.vuecal--green-theme(xsmall :time-from="5 * 60" :time-step="15" :time-cell-height="18" default-view="day" :disable-views="['years', 'year', 'month']")
      div.line(:class="{ hours: !minutes }" slot="time-cell" slot-scope="{ hours, minutes }")
        strong.primary--text(v-if="!minutes" style="font-size: 15px;line-height: 18px") {{hours}}
        span(v-else style="font-size: 11px;line-height: 18px") {{ minutes }}
  highlight-message(type="tips").
    if you are not familiar with scoped slots and destructuring slot-scope, first read about it on
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]]

  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal xsmall
             :time-from="5 * 60"
             :time-step="15"
             :time-cell-height="18"
             default-view="day"
             :disable-views="['years', 'year', 'month']"&gt;
      &lt;div class="{ line: true, hours: !minutes }"
           slot="time-cell"
           slot-scope="{ hours, minutes }"&gt;
        &lt;strong v-if="!minutes" style="font-size: 15px"&gt;{{ '\{\{ hours \}\}' }}&lt;/strong&gt;
        &lt;span v-else style="font-size: 11px"&gt;{{ '\{\{ minutes \}\}' }}&lt;/span&gt;
      &lt;/div&gt;
    &lt;/vue-cal&gt;

  sshpre.mt-4(language="css" label="CSS").
    .vuecal__time-cell .hours.line:before {border-color: #42b983;}

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--today-current-time") # Today's current time
    a#ex--today-current-time(name="ex--today-current-time")
  p.mb-0.
    When you choose to show the time in vue-cal, the current time of today's date will
    be marked with a line (scroll to the current time to see it).#[br]
    The line position will be updated every time the calendar current view is re-rendered (by interacting).#[br]
    You can easily customize the now-line as you wish via CSS.
    Changing the line and arrow color is as easy as:#[br]
  sshpre.mt-4(language="css" label="CSS").
    .vuecal__now-line {color: #f00;}
  p.
    If you don't want this feature you can simply hide it: #[span.code .vuecal__now-line {display: none;}].#[br]
    This feature has no impact on performance.
  v-card.my-2.ma-auto.main-content(style="width: 360px;height: 360px")
    vue-cal.vuecal--green-theme(xsmall :time-cell-height="26" default-view="day" :disable-views="['years', 'year', 'month']")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal xsmall
             default-view="day"
             :disable-views="['years', 'year', 'month']"&gt;
    &lt;/vue-cal&gt;

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--disabled-views-and-calendar-events") # Disabled views, calendar events
    a#ex--disabled-views-and-calendar-events(name="ex--disabled-views-and-calendar-events")
  p.
    Read-only events (by default events are uneditable) with custom HTML content and css class (for event types).#[br]
    Note that the events are always selectable (drop shadow and higher z-index), even when uneditable.#[br]
    Disabled views: years, year, month.
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="7 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="events")
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
          start: '2018-11-19 10:35',
          end: '2018-11-19 11:30',
          title: 'Doctor appointment',
          content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
          class: 'health'
        },
        {
          start: '2018-11-19 18:30',
          end: '2018-11-19 19:15',
          title: 'Dentist appointment',
          content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
          class: 'health'
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
  highlight-message Refer to the #[span.code events] option in the #[a(href="#api") API] section.

  sshpre(language="css" label="CSS").
    /* Different color for different event types. */
    .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
    .vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
    .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--events-indicators-on-month-view") # Month view with events indicators
    a#ex--events-indicators-on-month-view(name="ex--events-indicators-on-month-view")
  p.mb-0.
    When you define events the month view will display an events count per day.#[br]
    You can customize this as you wish via CSS.
  p.layout.align-center
    span.mr-2 Choose an indicator style:
    v-radio-group.ma-0.pt-0.d-inline-block(v-model="indicatorStyle" hide-details row)
      v-radio(label="count (default)" value="count" color="primary")
      v-radio(label="dash" value="dash" color="primary")
      v-radio(label="dot" value="dot" color="primary")
      v-radio(label="cell background" value="cell" color="primary")
  v-layout.ma-auto(row justify-center wrap)
    v-card.ma-2.my-2.ma-auto.main-content(style="width: 300px;height: 380px")
      vue-cal.vuecal--green-theme(
        :class="'event-indicator--' + indicatorStyle"
        selected-date="2018-11-19"
        xsmall
        :time-from="10 * 60"
        default-view="month"
        :disable-views="['years', 'year', 'day']"
        :events="events")
    v-card.ma-2.my-2.ma-auto.main-content(style="width: 300px;height: 380px")
      vue-cal.vuecal--yellow-theme(
        :class="'event-indicator--' + indicatorStyle"
        selected-date="2018-11-19"
        xsmall
        :time-from="10 * 60"
        :disable-views="['years', 'year', 'day']"
        default-view="month"
        :events="events")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             xsmall
             :time-from="10 * 60"
             :disable-views="['years', 'year', 'day']"
             default-view="month"
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
      height: 4px;
      color: transparent;
    }

    /* Cell background indicator */
    .vuecal__cell--has-events {background-color: #fffacd;}
    .vuecal__cell-events-count {display: none;}

  p.mt-5.title Custom events count on Month view.
  highlight-message(type="tips").
    Using Vue.js scoped slots, you can also override the counting events method if you need.#[br]
    if you are not familiar with scoped slots and destructuring slot-scope, first read about it on
    #[a(href="https://vuejs.org/v2/guide/components-slots.html#Scoped-Slots" target="_blank") vuejs.org/v2/guide/components-slots.html #[v-icon(small color="primary") open_in_new]]
  p.
    In the following example, we only count the events which have the custom
    #[span.code leisure] CSS class.
  v-card.my-2.ma-auto.main-content(style="width: 300px;height: 380px")
    vue-cal.vuecal--green-theme(
      :class="`event-indicator--${indicatorStyle}`"
      selected-date="2018-11-19"
      xsmall
      :time-from="10 * 60"
      default-view="month"
      :disable-views="['years', 'year', 'day']"
      :events="events")
      div(slot-scope="{ events }" slot="events-count-month-view")
        span.vuecal__cell-events-count(v-if="countEventsMonthView(events)") {{ countEventsMonthView(events) }}
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             xsmall
             :time-from="10 * 60"
             :disable-views="['years', 'year', 'day']"
             default-view="month"
             :events="events"&gt;
        &lt;div slot-scope="{ events }" slot="events-count-month-view"&gt;
          &lt;span class="vuecal__cell-events-count" v-if="countEventsMonthView(events)"&gt;
            {{ '\{\{ countEventsMonthView(events) \}\}' }}
          &lt;/span&gt;
        &lt;/div&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    // In your Vue component.
    methods: {
      countEventsMonthView: events => {
        return events ? events.filter(e => e.class === 'leisure').length : 0
      }
    }

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--events-on-month-view") # Display events on month view
    a#ex--events-on-month-view(name="ex--events-on-month-view")
  p.
    With the option #[span.code events-on-month-view], you can choose whether to display the events on the month view or not.#[br]
    #[span.code events-on-month-view] accepts a Boolean to show or hide, or the string '#[span.code short]' to show only the event's title.#[br]
    If #[span.code events-on-month-view] is set to #[span.code true], all the informations are displayed, you can then hide
    any event information via CSS.#[br]
    If you want all the cells to have the same height on this view, this is also your call, you can do it via CSS.
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.vuecal--full-height-delete(
      selected-date="2018-11-19"
      :time-from="9 * 60"
      :disable-views="['years', 'year']"
      default-view="month"
      hide-weekends
      events-on-month-view="short"
      :events="events")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="9 * 60"
             :disable-views="['years', 'year']"
             default-view="month"
             hide-weekends
             events-on-month-view="short"
             :events="events"
             class="vuecal--full-height-delete"&gt;
    &lt;/vue-cal&gt;
  sshpre(language="css" label="CSS").
    .vuecal--month-view .vuecal__no-event {display: none;}
  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--timeless-events") # Timeless Events
    a#ex--timeless-events(name="ex--timeless-events")
  p.
    The events have associated dates but no time information.#[br]
    Timeless events cannot be resized as they have no time or duration information.#[br]
    Refer to the #[span.code events] option in the #[a(href="#api") API] section.
  v-card.my-2.ma-auto.main-content(style="height: 350px;")
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
          end: '2018-11-23',
          title: 'Need to go shopping',
          content: '&lt;i class="v-icon material-icons"&gt;shopping_cart&lt;/i&gt;',
          class: 'leisure'
        },
        {
          start: '2018-11-21',
          end: '2018-11-23',
          title: 'Golf with John',
          content: '&lt;i class="v-icon material-icons"&gt;golf_course&lt;/i&gt;',
          class: 'sport'
        },
        {
          start: '2018-11-22',
          end: '2018-11-23',
          title: 'Dad\'s birthday!',
          content: '&lt;i class="v-icon material-icons"&gt;cake&lt;/i&gt;',
          class: 'sport'
        }
      ]

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--editable-deletable-events") # Editable / deletable events
    a#ex--editable-deletable-events(name="ex--editable-deletable-events")
  p.
    Allow editing title, deleting (by clicking and holding an event), and resizing (by dragging handle).#[br]
    Only week view is enabled here.#[br]
    Vue Cal emits events on calendar event change, read more about it in the #[strong # Vue Cal emitted events] example.
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.vuecal--full-height-delete(
      selected-date="2018-11-19"
      :time-from="10 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month', 'day']"
      hide-view-selector
      hide-weekends
      editable-events
      :events="events")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="10 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month', 'day']"
             hide-view-selector
             hide-weekends
             editable-events
             :events="events"
             class="vuecal--full-height-delete"&gt;
    &lt;/vue-cal&gt;
  highlight-message(type="tips").
    By default the delete button only appears at the top of the event with a set height (1.4em).
    If you want a full-height delete button like in this example, you can apply the CSS class #[span.code .vuecal--full-height-delete] to your &lt;vue-cal&gt; tag.
  highlight-message Refer to the #[span.code editableEvents] option in the #[a(href="#api") API] section.

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--multiple-day-events") # Multiple day events
    a#ex--multiple-day-events(name="ex--multiple-day-events")
  p.
    Multiple day events are working like a set of single day events linked together.#[br]
    Deleting one of the day of a multiple day event, will also delete all the other days.#[br]
    Updating the duration by dragging or changing the title will also update on all the days.#[br]
    Try to resize, rename and delete the events.
  highlight-message(type="tips").
    3 CSS classes are available to target the event first day, the last day and all the days in between:
    #[span.code event-start], #[span.code event-middle], #[span.code event-end].
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.ex--multiple-day-events.vuecal--full-height-delete(
      selected-date="2018-11-19"
      :time-from="8 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      editable-events
      :events="multipleDayEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="8 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             editable-events
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      events: [
        {
          start: '2018-11-19 08:30',
          end: '2018-11-20 20:00',
          title: 'Running Marathon',
          content: '&lt;i class="v-icon material-icons"&gt;directions_run&lt;/i&gt;',
          class: 'sport'
        },
        {
          start: '2018-11-20 13:00',
          end: '2018-11-20 14:30',
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
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--overlapping-events") # Overlapping events
    a#ex--overlapping-events(name="ex--overlapping-events")
  p.
    Overlapping, editable  &amp; deletable events.#[br]
    #[strong Up to 3 overlapping events starting or running at the same time]. Try to resize &amp; delete events to see the overlapping redrawn.#[br]
    You can also use the option #[span.code no-event-overlaps] to show #[strong up to 3 events side by side] (splitting the cell width) instead of overlapping.
  v-btn.ma-0(color="primary" small @click="overlapEvents = !overlapEvents;$forceUpdate()") #[span.code :no-event-overlaps="{{ overlapEvents ? 'false' : 'true' }}"]

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme.vuecal--full-height-delete(
      selected-date="2018-11-19"
      :time-from="10 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      editable-events
      :events="overlappingEvents"
      :no-event-overlaps="!overlapEvents")
  sshpre(language="html-vue" label="Vue Template").
    &lt;v-btn @click="overlapEvents = !overlapEvents;$forceUpdate()"&gt;
      :no-event-overlaps="{{ '\{\{ overlapEvents ? \'false\' : \'true\' \}\}' }}"
    &lt;/v-btn&gt;

    &lt;vue-cal selected-date="2018-11-19"
             :time-from="10 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             editable-events
             :no-event-overlaps="!overlapEvents"
             :events="events"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      overlapEvents: true,
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
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--background-events") # Background events
    a#ex--background-events(name="ex--background-events")
  p.
    Just add the property #[span.code background: true] to your events.#[br]
    The particularity of background events is that they can fully be overlapped but not overlapping.#[br]
    And they don't overlap like other events: when overlapping both events won't change width.#[br]
    Note that you can still select a background event to put it on top of others and see it.
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
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--splitting-days") # Splitting days &amp; split events
    a#ex--splitting-days(name="ex--splitting-days")
  p.mb-4
    | Split each day into multiple containers passing a CSS class &amp; a label per split, and allow split-specific events.#[br]
    | disabled views: years, year, month.#[br]
    | You can also overflow your content using a min-width on cells, like in this example, or fit to container#[br]
    | Refer to the #[span.code splitDays] option in the #[a(href="#api") API] section.
    v-btn(small color="primary" @click="splitsExampleMinCellWidth = splitsExampleMinCellWidth ? 0 : 400")
      v-icon.mr-2 {{ splitsExampleMinCellWidth ? 'remove' : 'add' }}
      | {{ splitsExampleMinCellWidth ? ' fit to container ' : 'min cell width 400px' }}
  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="8 * 60"
      :time-step="30"
      :disable-views="['years', 'year', 'month']"
      :split-days="[{ class: 'him', label: 'Him' }, { class: 'her', label: 'Her' }]"
      editable-events
      :events="splitEvents"
      :min-cell-width="splitsExampleMinCellWidth")
  sshpre(language="html-vue" label="Vue Template").
    &lt;button @click="minCellWidth = minCellWidth ? 0 : 400"&gt;
      {{ '\{\{ minCellWidth ? \'fit to container\' : \'min cell width 400px\' \}\}' }}
    &lt;/button&gt;
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="8 * 60"
             :time-step="30"
             :disable-views="['years', 'year', 'month']"
             :split-days="[{ class: 'him', label: 'Him' }, { class: 'her', label: 'Her' }]"
             editable-events
             :events="events"
             :min-cell-width="minCellWidth"&gt;
    &lt;/vue-cal&gt;

  sshpre(language="js" label="Javascript").
    data: () => ({
      minCellWidth: 400,
      events: [
        {
          start: '2018-11-19 10:35',
          end: '2018-11-19 11:30',
          title: 'Doctor appointment',
          content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
          class: 'health',
          split: 1
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
          split: 2
        },
        ...
      ]
    })

  sshpre(language="css" label="CSS").
    /* You can easily set a different style for each split of your days. */
    .vuecal__cell-split.him {background-color: rgba(221, 238, 255, 0.6);}
    .vuecal__cell-split.him .split-label {color: rgba(0, 84, 194, 0.1);font-size: 30px;}
    .vuecal__cell-split.her {background-color: rgba(255, 232, 251, 0.6);}
    .vuecal__cell-split.her .split-label {color: rgba(255, 0, 106, 0.1);font-size: 30px;}

    /* Different color for different event types. */
    .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
    .vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
    .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--modifying-events-from-outside") # Modifying the array of events outside of Vue Cal
    a#ex--modifying-events-from-outside(name="ex--modifying-events-from-outside")
  highlight-message(type="tips").
    It is possible to modify the array of events like adding or removing an event
    after the first load, but be aware that by doing so all the events in Vue Cal
    will be replaced by the new array of events. You may lose your changes if you
    modified events within Vue Cal.
  v-btn(color="primary" small @click="eventsCopy.push({ start: '2018-11-20 12:00', end: '2018-11-20 17:00', title: 'A new event', class: 'blue-event' })")
    v-icon.mr-2 add
    | Add an event
  v-btn(color="primary" small @click="eventsCopy.pop()")
    v-icon.mr-2 remove
    | Remove last event
  p.mb-0 Here is the live array of event titles:
  pre {{ eventsCopy.map(e => e.title) }}

  v-card.my-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="7 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="eventsCopy")
  sshpre(language="html-vue" label="Vue Template").
    &lt;v-btn @click="events.push({
           start: '2018-11-20 12:00',
           end: '2018-11-20 17:00',
           title: 'A new event',
           class: 'blue-event'
    })"&gt;Add an event&lt;/v-btn&gt;
    &lt;v-btn @click="events.pop()"&gt;Remove last event&lt;/v-btn&gt;

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
          start: '2018-11-19 10:35',
          end: '2018-11-19 11:30',
          title: 'Doctor appointment',
          content: '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;',
          class: 'health'
        },
        ...
      ]
    })

  //- Example.
  h3.title.mt-5.mb-2.pt-4
    a(href="#ex--emitted-events") # Vue Cal emitted events
    a#ex--emitted-events(name="ex--emitted-events")
  p.mb-0.
    Vue Cal emits events that you can listen to, to trigger an action outside of Vue Cal.#[br]
    If you are not familiar with Vue JS events, you should read about it here:
    #[a(href="https://vuejs.org/v2/guide/events.html" target="_blank") vuejs.org/v2/guide/events.html #[v-icon(small color="primary") open_in_new]]#[br]#[br]
    Here is the list of emitted events:
  h4.mt-2 View-related
  ul
    li #[span.code ready]
    li #[span.code view-change]
    li #[span.code day-focus] - is a JS native #[span.code Date] object
  highlight-message(no-icon)
    | The emitted events #[span.code ready] &amp; #[span.code view-change] return an object:#[br]
    sshpre.mt-2.mb-0(language="js").
      {
        view: [String],
        startDate: [Date], // View start - JS native Date object.
        endDate: [Date], // View end - JS native Date object.
        events: [Array], // All the events in the current view.
        week: [Integer] // Week number. Only returned if view is 'week'.
      }

  h4.mt-2 Events-related
  p.mb-0 In all events, properties #[span.code startDate] &amp; #[span.code endDate] are JS native #[span.code Date] objects:
  ul
    li #[span.code event-focus]
    li #[span.code event-mouse-enter]
    li #[span.code event-mouse-leave]
    li #[span.code event-delete]
    li #[span.code event-change]
    li #[span.code event-title-change]
    li #[span.code event-content-change]
    li #[span.code event-duration-change]
  highlight-message(type="tips")
    ul
      li.
        The #[span.code event-change] emitted event groups all the events triggered on a calendar event property change:
        #[span.code event-title-change], #[span.code event-content-change],
        #[span.code event-duration-change]. So you have the choice to listen to
        #[span.code event-change] to cover any calendar event change or listen to a specific action emitted event.
      li.mt-3.
        To help you manipulate an event's date, vue-cal returns native #[span.code Date]
        objects in the event properties #[span.code startDate] &amp; #[span.code endDate].#[br]
        So for instance, you can easily access the day of the week of an event with #[span.code event.startDate.getDay()].
  p.mb-0 Watch the list of emitted events (latest on top) as you play with Vue Cal:
  pre.mt-2.ssh-pre.mb-2
    v-layout(wrap)
      div.grey--text //&nbsp;
        strong event-name:&nbsp;
        span arguments-list
      v-spacer
      v-btn.ma-0(color="primary" outline small @click="clearEventsLog")
        v-icon(small).mr-1 clear
        | Clear log
      v-btn.my-0.mr-0.ml-2(color="primary" outline small @click="logMouseEvents = !logMouseEvents")
        v-icon(small).mr-1 {{ logMouseEvents ? 'remove' : 'add' }}
        | {{ logMouseEvents ? 'Hide' : 'Track' }} mouse hover events
    div.scrollable
      div.mt-2.pt-2(v-for="(l, i) in log" :key="i" :style="i && 'border-top: 1px solid #ddd'")
        strong.mr-1 {{ l.name }}:
        span {{ l.args }}
  v-card.mt-4.mb-2.ma-auto.main-content
    vue-cal.vuecal--green-theme(
      selected-date="2018-11-19"
      :time-from="7 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      editable-events
      :events="eventsCopy2"
      @ready="logEvents('ready', $event)"
      @view-change="logEvents('view-change', $event)"
      @day-focus="logEvents('day-focus', $event)"
      @event-focus="logEvents('event-focus', $event)"
      @event-mouse-enter="logEvents('event-mouse-enter', $event)"
      @event-mouse-leave="logEvents('event-mouse-leave', $event)"
      @event-title-change="logEvents('event-title-change', $event)"
      @event-content-change="logEvents('event-content-change', $event)"
      @event-duration-change="logEvents('event-duration-change', $event)"
      @event-delete="logEvents('event-delete', $event)")

  sshpre(language="html-vue" label="Vue Template").
    &lt;vue-cal selected-date="2018-11-19"
             :time-from="7 * 60"
             :time-to="23 * 60"
             :disable-views="['years', 'year', 'month']"
             hide-weekends
             editable-events
             :events="events"
             @ready="logEvents('ready', $event)"
             @view-change="logEvents('view-change', $event)"
             @day-focus="logEvents('day-focus', $event)"
             @event-focus="logEvents('event-focus', $event)"
             @event-mouse-enter="logEvents('event-mouse-enter', $event)"
             @event-mouse-leave="logEvents('event-mouse-leave', $event)"
             @event-title-change="logEvents('event-title-change', $event)"
             @event-content-change="logEvents('event-content-change', $event)"
             @event-duration-change="logEvents('event-duration-change', $event)"
             @event-delete="logEvents('event-delete', $event)"&gt;
    &lt;/vue-cal&gt;

  h2.headline.mt-5.pt-5
    a(href="#api") API
    a#api(name="api")
  p Here is the list of all the available views.
  sshpre.mt-2(language="js").
    ['years', 'year', 'month', 'week', 'day']
  p Here is the list of all the parameters available.
  sshpre.mt-2(language="js").
    locale:             [String],          default: 'en'
    hideViewSelector:   [Boolean],         default: false
    hideTitleBar:       [Boolean],         default: false
    hideBody:           [Boolean],         default: false
    hideWeekends:       [Boolean],         default: false
    disableViews:       [Array],           default: []
    defaultView:        [String],          default: 'week'
    selectedDate:       [String],          default: ''
    small:              [Boolean],         default: false
    xsmall:             [Boolean],         default: false
    clickToNavigate:    [Boolean],         default: false
    dblClickToNavigate: [Boolean],         default: true
    time:               [Boolean],         default: true
    timeFrom:           [Number],          default: 0 // In minutes.
    timeTo:             [Number],          default: 24 * 60 // In minutes.
    timeStep:           [Number],          default: 30 // In minutes.
    timeCellHeight:     [Number],          default: 40 // In pixels.
    12Hour:             [Boolean],         default: false
    timeFormat:         [String],          default: ''
    minCellWidth:       [Number],          default: 0 // In pixels.
    splitDays:          [Array],           default: []
    events:             [Array],           default: []
    editableEvents      [Boolean],         default: false
    noEventOverlaps     [Boolean],         default: false
    eventsOnMonthView   [Boolean, String], default: false

  ul.pl-0.api-options
    li
      code.mr-2 locale
      span.code [String], default: 'en'
      p.
        Allows you to translate the calendar texts in a given language.#[br]
        Use a 2 letter locale code (ISO 639-1) unless a distinction is needed. E.g. #[span.code 'pt-br'] for Portuguese-Brasilian.
      highlight-message(type="info")
        | Currently available languages are English, Croatian, Dutch, French, Georgian,
        | German, Italian, Portuguese-Brasilian, Russian, Slovak, Spanish, Swedish &amp; Simplified Chinese.#[br]
        | If you are interested in providing a language support please do a pull request with a json file into the i18n directory.#[br]
        | this is what a language json looks like.

        sshpre.my-2(language="json").
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
            "deleteEvent": "Delete",
            "createEvent": "Create an event",
            "dateFormat": "DDDD d mmmm yyyy"
          }
        p.
          Regarding the #[span.code dateFormat] translation, this is the format of the full
          date you can see in a single day view title.#[br]
          #[span.code DDDD] stands for the full-letter day of week, #[span.code mmmm] stands for
          full-letter month, #[span.code d] stands for the date of the month (0-31),
          #[span.code yyyy] stands for full year, #[span.code {S}] stands for st/nd/rd/th and only in English.

      highlight-message(type="tips").
        Note that 3 media queries will shorten the days of the week to 3 letters then 1 letter when it does not fit.#[br]
        You can read more about it in the # Responsiveness &amp; Media Queries section in the #[a(href="#css-notes") CSS Notes].
    li
      code.mr-2 hideViewSelector
      span.code [Boolean], default: false
      p.
        When set to true, the top view selector will disappear.#[br]
        You can still navigate from a view to another by clicking a cell (narrower view) or
        the view title (broader view).
    li
      code.mr-2 hideTitleBar
      span.code [Boolean], default: false
      p.
        When set to true, the title bar with navigating arrows will disappear.#[br]
        You can still navigate from a view to another with the view selector and clicking
        a cell (narrower view).
    li
      code.mr-2 hideBody
      span.code [Boolean], default: false
      p.
        When set to true, the whole calendar body will disappear - cells and timeline.#[br]
        Also means that all the logic usually triggered from the calendar's body won't run at all.
    li
      code.mr-2 hideWeekends
      span.code [Boolean], default: false
      p.
        Hide the weekend and shows only Monday to Friday on month view and week view.#[br]
        The weekend are still visible in day view not to break the behavior of the arrows.#[br]
        Note that by hiding the arrows you won't be able to see a weekend day in day view if hideWeekends is true.
    li
      code.mr-2 disableViews
      span.code [Array], default: []
      p.
        Allows you to totally disable one or more of the available views.#[br]
        Accepted view names are 'years', 'year', 'month', 'week', 'day'.#[br]
        Note that the navigation between views via cells click or title click won't
        break and will only navigate to views you have allowed.
    li
      code.mr-2 defaultView
      span.code [String], default: 'week'
      p.
        Allows you to set a default view, for the first time you load the calendar.#[br]
        Accepts one of 'years', 'year', 'month', 'week', 'day'.
    li
      code.mr-2 selectedDate
      span.code [String], default: ''
      p.
        Set a selected date, for the first time you load the calendar.#[br]
        This day will be highlighted and the first view will naturally show this date.#[br]
        E.g. setting a date in year 2000 with a defaultView of week, will show you that week of year 2000.
      highlight-message(type="warning").
        A correct date format is #[code {{ currentDateFormatted }}] or
        #[code="{{ currentDateFormatted.split(' ')[0] }}"] if you don't need the time.
        Only these formats will work.
    li
      code.mr-2 small
      span.code [Boolean], default: false
      p.
        When set to true, the days of the week headings will be truncated to 3 letters.#[br]
        Does not apply to the title of the day view.#[br]
        3 media queries are truncating the days of the week bellow 450px,
        read on in the #[a(href="#css-notes") CSS Notes].
    li
      code.mr-2 xsmall
      span.code [Boolean], default: false
      p.
        When set to true, the days of the week headings will be truncated to 1 letter.#[br]
        Does not apply to the title of the day view.#[br]
        In Addition, the whole calendar gets applied a smaller font size of 0.9em,
        and the current view title is also reduced.#[br]
        3 media queries are truncating the days of the week bellow 450px,
        read on in the #[a(href="#css-notes") CSS Notes].
    li
      code.mr-2 clickToNavigate
      span.code [Boolean], default: false
      p.
        When set to true a single click (or tap for touch devices) will take you to a narrower view if available.#[br]
        You can always go back to a broader view by clicking the view title or selecting another view from the view selector if enabled.#[br]
        The navigation to narrower view can be disabled by setting both #[span.code clickToNavigate] and #[span.code dblClickToNavigate] to false.
    li
      code.mr-2 dblClickToNavigate
      span.code [Boolean], default: true
      p.
        When set to true a double click (or double tap for touch devices) will take you to a narrower view if available.#[br]
        You can always go back to a broader view by clicking the view title or selecting another view from the view selector if enabled.#[br]
        The navigation to narrower view can be disabled by setting both #[span.code clickToNavigate] and #[span.code dblClickToNavigate] to false.
    li
      code.mr-2 time
      span.code [Boolean], default: true
      p.
        Whether you want to display the timeline and handle events with time or only date.#[br]
        Note that time is made of #[span.code hours:minutes] #[strong.ml-2 and no second].
    li
      code.mr-2 timeFrom
      span.code [Number], default: 0
      p.
        If #[span.code time] is enabled, set the start of the timeline in minutes.
        By default it starts at midnight.
    li
      code.mr-2 timeTo
      span.code [Number], default: 24 * 60
      p.
        If #[span.code time] is enabled, set the end of the timeline in minutes.
        By default it ends at 23.59.
    li
      code.mr-2 timeStep
      span.code [Number], default: 30
      p.
        If #[span.code time] is enabled, set the time increment in minutes.
    li
      code.mr-2 timeCellHeight
      span.code [Number], default: 40
      p.
        If #[span.code time] is enabled, set the time cell height in pixels.#[br]
        this is very important as it is used to calculate the events position in the day.
    li
      code.mr-2 12Hour
      span.code [Boolean], default: false
      p.
        If #[span.code time] is enabled, the default time format is 24hour.#[br]
        With #[span.code 12Hour] set to true (use #[span.code 12-hour] in template),
        the time format will show 12 hours suffixed with am/pm.
    li
      code.mr-2 timeFormat
      span.code [String], default: ''
      p.mb-2.
        When defined, overrides the default time format in time cells and events.#[br]
        Formatted time can contain any character but the following characters will be replaced:
      ul.ml-3
        li #[strong.code H]: Hours no leading zero, 24-hour format
        li #[strong.code HH]: Hours with leading zero, 24-hour format
        li #[strong.code h]: Hours no leading zero, 12-hour format
        li #[strong.code hh]: Hours with leading zero, 12-hour format
        li #[strong.code m]: Minutes no leading zero
        li #[strong.code mm]: Minutes with leading zero
        li #[strong.code {am}]: am or pm
        li.
          The characters #[strong.code {], #[strong.code }] are removed and used only to
          separate characters with no space.#[br]
          E.g. #[span.code "h:mm{am}"].
    li
      code.mr-2 minCellWidth
      span.code [Number], default: 0
      p.
        In the current version, this is for day splits only.#[br]
        When a number is set, in pixels, the calendar body will have a horizontal
        scrollbar if the cells don't fit naturally in the calendar container.
    li
      code.mr-2 splitDays
      span.code [Array], default: []
      p.
        Split each day into multiple vertical splits.#[br]
        Accepts an array of split objects with attributes.#[br]
        Each split object can have these attributes: #[span.code { class: 'string', label: 'string' }]
    li
      code.mr-2 editableEvents
      span.code [Boolean], default: false
      p
        | When #[span.code editableEvents] set to true, allows:
        ul
          li Dragging events (this feature is coming soon)
          li Resizing events by dragging the handle showing at the bottom of each event if #[span.code time] is set to true,
          li Deleting events by click and hold an event
          li Editing events title
    li
      code.mr-2 noEventOverlaps
      span.code [Boolean], default: false
      p When #[span.code noEventOverlaps] is set to true, all the overlapping events will not overlap but instead split the cell width in 2 or 3.
    li
      code.mr-2 eventsOnMonthView
      span.code [Boolean, String], default: false
      p.
        When set to true, the events will also be displayed on month view.#[br]
        When set to the string '#[span.code short]', only the event's title will be displayed.
    li
      code.mr-2 events
      span.code [Array], default: []
      p.
        Allows you to place events in the calendar.#[br]
        Accepts an array of event objects.#[br]
        This is what an event object must look like:
      p
        sshpre.mt-2(language="js").
          {
            start: '2018-11-19 12:00', // Required.
            end: '2018-11-19 14:00', // Required.
            title: 'String', // Optional.
            content: 'String', // Optional.
            class: 'String', // Optional.
            background: [Boolean] // Optional. (Event type not CSS property)
            split: [Number] // Optional.
          }
        ul
          li If no #[span.code title] is provided, no title will be displayed.
          li.
            #[span.code content] accepts free HTML, for instance:
            '&lt;i class="v-icon material-icons"&gt;local_hospital&lt;/i&gt;'.#[br]
            If no #[span.code content] is provided, no content will be displayed.
          li.
            You may need an event CSS #[span.code class] to handle different event types
            for instance. With different classes you can apply different styles to the events.#[br]
            E.g. backgrounds, images, borders, etc.
          li.
            The #[span.code background] attribute sets an event as a background event,
            which allows overlapping and disable the ability to drag &amp; resize.
          li.
            When using #[span.code splitDays], the #[span.code split] attribute accepts a number,
            starting from 1, corresponding to the split you want the event to appear in.

      highlight-message(type="warning")
        | Correct date formats are #[code {{ currentDateFormatted }}] or
        | #[code="{{ currentDateFormatted.split(' ')[0] }}"] if you don't want any time in the whole calendar.
        | Only these formats will work.#[br]
        strong You can't mix events with time and events without, and you can only remove time if the time option is set to false.

      highlight-message(type="info")
        | Recurring events will be available in a next release.

  h2.headline.mt-5.pt-5
    a(href="#css-notes") CSS Notes
    a#css-notes(name="css-notes")
  p You can easily change the calendar design with CSS.

  h3.mt-5 # Color &amp; rounded Themes
  p.
    Currently 2 color themes (green &amp; blue) are available, in addition to the standard grey theme.#[br]
    You can apply a green or blue theme by using the CSS class #[span.code vuecal--green-theme] or  #[span.code vuecal--blue-theme].
  p.
    If you want another color theme, you can define your own easily.#[br]
    This is what a standard color theme looks like.
    You can copy and change any color to quickly get a nice render.#[br]
    If that is still not doing what you want you can change even more in your own CSS.

  sshpre(language="css" label="CSS").
    /* Green-theme. */
    .vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
    .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
    .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
    .vuecal__title {background-color: #e4f5ef;}
    .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
    .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
    .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}

  p
    strong Rounded Theme#[br]
    | You can apply the rounded cells theme like in Example #[strong # Calendar themes - Rounded cells], with the CSS class #[span.code vuecal--rounded-theme].

  h3.mt-5 # Responsiveness &amp; Media Queries
  p.
    This calendar is fully responsive.#[br]
    To help you in making the calendar always look perfect,
    3 media queries (to keep it simple) are in place for small screens.#[br]
    The media queries operate downward from 550px, 450px &amp; 350px, and they mostly truncate the text
    of the days of the week from full day name to 3 letters and to 1 letter according to the available space.#[br]#[br]

    If this is not enough for your particular use, you can add your own in your CSS.#[br]
    Additionally, you can use the options #[span.code small] &amp; #[span.code xsmall]
    to truncate week days at any size.

  h3.mt-5 # Disabled Text Selection
  p.
    By default the selection is disabled in the whole calendar except in the events.
    you can override this by CSS.

  h2.headline.mt-5.pt-5.mb-2
    a(href="#release-notes") Release Notes
    a#release-notes(name="release-notes")

  div
    | #[strong Version 1.27.0] Allow overriding 'No event' text
    highlight-message(type="success").
      The #[span.code events-on-month-view] option now also accepts the string '#[span.code short]'.#[br]
      Ref. #[a(href="#ex--events-on-month-view") # Display events on month view].
  div
    | #[strong Version 1.26.0] Emitted events #[span.code ready] &amp; #[span.code view-change] return events
  div
    | #[strong Version 1.25.0] Support multiple day events
  div
    | #[strong Version 1.24.0] Allow hiding the calendar body
    highlight-message(type="success").
      Week days headings now have a today CSS class when equals to today's date.
  div
    | #[strong Version 1.22.0] Add Slovak language
  div
    | #[strong Version 1.21.0] Add Georgian language
  div
    | #[strong Version 1.20.0] Allow displaying events on month view
  div
    | #[strong Version 1.19.0] Emit events on mouse-enter &amp; mouse-leave an event
  div
    | #[strong Version 1.18.0] Allow overriding indicators in month view
  div
    | #[strong Version 1.17.0] Allow overriding time cells &amp; title
  div
    | #[strong Version 1.16.0] Highlight Today's current time
  div
    | #[strong Version 1.15.0] Add German language
  div
    | #[strong Version 1.14.0] Add custom time format &amp; emit event on #[span.code day-focus]
    highlight-message(type="success")
      ul
        li The emitted #[span.code view-change] event now returns an object with a view name and startDate.
        li The emitted events-related events now also return native JS Date objects.
        li Refer to the emitted events example.
  div
    | #[strong Version 1.13.0] Add Swedish language
  div
    | #[strong Version 1.12.0] Add Croatian language
  div
    | #[strong Version 1.11.0] Add events indicators in month view
    highlight-message(type="tips").
      If you have created a theme, update it with the new indicator:
      #[span.code .vuecal__cell-events-count]. Refer to the updated theme example in the #[a(href="#css-notes") CSS Notes].
    highlight-message(type="success").
      The default #[span.code time-step] option value is now 60 minutes (previously 30).
  div
    | #[strong Version 1.10.0] Allow no event overlaps
  div
    | #[strong Version 1.9.0] Add Dutch language
  div
    | #[strong Version 1.8.0] Display up to 3 simultaneous events &amp; redraw overlaps on event resize &amp; delete
  div
    | #[strong Version 1.7.0] Vue Cal emits events
  div
    | #[strong Version 1.6.0] Allow event deletion on touch devices
  div
    | #[strong Version 1.5.0] Add Russian language
  div
    | #[strong Version 1.4.0] Allow editing events title
    highlight-message(type="success")
      ul
        li The delete button now appears on click and hold.
        li All the events are now read-only by default you can add the option #[span.code editableEvents] to allow edition.
        li.
          The #[span.code editableEvents] option triggers all the editing features on and off.#[br]
          Refer to the #[span.code editableEvents] option in the #[a(href="#api") API] section.
  div
    | #[strong Version 1.3.0] Add Simplified Chinese language &amp; bug fixes
  div
    | #[strong Version 1.2.0] Allow event deletion
    highlight-message(type="success").
      You now have the ability to select an event independently of a cell.#[br]
      On event focus the event z-index is increased and a delete button appears to delete the event.#[br]
      Hovering an event also increases its z-index so you can see the event more easily in case of overlaps.
  div.mt-3 #[strong Version 1.1.0] Allow event resizing + Spanish &amp; Portuguese-Brasil languages.
  div.mt-3 #[strong Version 1.0.0] First public release
</template>

<script>
import VueCal from '@/components/vue-cal'
import Sshpre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import highlightMessage from '@/components/highlight-message'

const events = [
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
    split: 1
  },
  {
    start: '2018-11-21 11:00',
    end: '2018-11-21 13:00',
    title: 'Brunch with Jane',
    content: '<i class="v-icon material-icons">local_cafe</i>',
    class: 'leisure',
    split: 1
  },
  {
    start: '2018-11-21 19:30',
    end: '2018-11-21 23:00',
    title: 'Swimming lesson',
    content: '<i class="v-icon material-icons">pool</i>',
    class: 'sport',
    split: 1
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
  }
]

export default {
  components: { VueCal, Sshpre, highlightMessage },
  data: () => ({
    splitsExampleMinCellWidth: 400,
    example1theme: 'green',
    overlapEvents: true,
    indicatorStyle: 'count',
    now: new Date(),
    log: [],
    events,
    logMouseEvents: false,
    overlappingEvents: [
      ...events,
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
      ...events,
      {
        start: '2018-11-21 12:00',
        end: '2018-11-21 12:30',
        title: 'Call mum',
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
      ...events
    ],
    multipleDayEvents: [
      {
        start: '2018-11-19 08:30',
        end: '2018-11-20 20:00',
        title: 'Running Marathon',
        content: '<i class="v-icon material-icons">directions_run</i>',
        class: 'sport'
      },
      {
        start: '2018-11-20 13:00',
        end: '2018-11-20 14:30',
        title: 'Drink water!',
        content: '<i class="v-icon material-icons">local_drink</i>',
        class: 'health'
      },
      {
        start: '2018-11-21 19:00',
        end: '2018-11-23 11:30',
        title: 'Trip to India',
        content: '<i class="v-icon material-icons">flight</i>',
        class: 'leisure'
      }
    ],
    splitEvents: [
      ...events,
      {
        start: '2018-11-21 12:00',
        end: '2018-11-21 12:30',
        title: 'Call mum',
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
        split: 2
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
      ...events,
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
    ]
  }),
  methods: {
    logEvents (emittedEventName, params) {
      if (!this.logMouseEvents && ['event-mouse-enter', 'event-mouse-leave'].indexOf(emittedEventName) !== -1) {
        return
      }
      this.log.unshift({ name: emittedEventName, args: JSON.stringify(params) })
    },
    clearEventsLog () {
      this.log = []
    },
    countEventsMonthView: events => events ? events.filter(e => e.class === 'leisure').length : 0
  },
  computed: {
    currentDateFormatted () {
      const y = this.now.getFullYear()
      const m = this.now.getMonth()
      const d = this.now.getDate()
      const h = this.now.getHours()
      const min = this.now.getMinutes()
      return `${y}-${(m < 10 ? '0' : '') + m}-${(d < 10 ? '0' : '') + d} ${(h < 10 ? '0' : '') + h}:${(min < 10 ? '0' : '') + min}`
    }
  }
}
</script>

<style lang="scss">
$primary: #42b983;

.scrollable {
  height: 200px;
  overflow-y: scroll;
  padding-right: 1.8em;
}

.main-content {
  max-width: 800px;
  height: 650px;
}

.todo .v-chip__content {
  padding: 0 3px;
}

.documentation h3 a {
  color: inherit !important;
}

.api-options {list-style-type: none;}
.api-options > li {margin-top: 2em;}
.api-options p {margin-left: 1.5em;margin-top: 0.5em;}

// Yellow theme.
.vuecal--yellow-theme {
  .vuecal__menu, .vuecal__cell-events-count {background-color: rgba(255, 179, 0, 0.8);color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title {background-color: rgba(255, 236, 202, 0.5);}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  &:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(255, 236, 202, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(235, 216, 182, 0.5);}
}

// Events on month view example.
.event-indicator--dash .vuecal__cell-events-count {
  width: 18px;
  height: 2px;
  color: transparent;
}

.event-indicator--dot .vuecal__cell-events-count {
  width: 4px;
  height: 4px;
  color: transparent;
}

.event-indicator--cell .vuecal__cell--has-events {background-color: #fffacd;}
.event-indicator--cell .vuecal__cell-events-count {display: none;}

.vuecal--month-view .vuecal__no-event {display: none;}

// Split days example.
.vuecal__cell-split.him {background-color: rgba(221, 238, 255, 0.5);}
.vuecal__cell-split.him .split-label {color: rgba(0, 84, 194, 0.1);font-size: 30px;font-weight: 500;}
.vuecal__cell-split.her {background-color: rgba(255, 232, 251, 0.5);}
.vuecal__cell-split.her .split-label {color: rgba(255, 0, 106, 0.1);font-size: 30px;font-weight: 500;}

.vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.85);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
.vuecal__event.sport {background-color: rgba(255, 102, 102, 0.85);border: 1px solid rgb(235, 82, 82);color: #fff;}
.vuecal__event.blue-event {background-color: rgba(100, 200, 255, 0.8);border: 1px solid rgb(80, 180, 235);color: #fff;}

.vuecal__event.lunch {
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vuecal__event.lunch .vuecal__event-time {display: none;align-items: center;}

.vuecal__time-cell .hours.line:before {border-color: $primary;}

.ex--multiple-day-events .vuecal__event {
  border-radius: 5px;

  &.sport {
    background-color: rgba(255, 185, 185, 0.8);
    border: none;
    border-left: 3px solid rgba(230, 55, 55, 0.3);
    color: #c55656;
  }
  &.leisure {
    background-color: rgba(255, 202, 154, 0.8);
    border: none;
    border-left: 3px solid rgba(250, 118, 36, 0.3);
    color: #b57335;
  }
  &.health {
    background-color: rgba(200, 248, 233, 0.8);
    border: none;
    border-left: 3px solid rgba(99, 186, 139, 0.4);
    color: #219671;
  }

  &.event-start {border-radius: 5px 5px 0 0;}
  &.event-middle {border-radius: 0;}
  &.event-end {border-radius: 0 0 5px 5px;}
}
</style>
