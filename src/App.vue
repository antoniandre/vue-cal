<template lang="pug">
  v-app.white(:class="{ ready: ready }")
    v-container
      .text-xs-center
        .logo
          img(alt="Vue logo" src="./assets/logo.png" width="50")
          v-icon.calendar event
          v-icon.time access_time

        p
          .headline Vue Cal#[br]
          | A Vue JS full calendar, no dependency, no BS. :metal:

        div(style="margin: 7em auto;max-width: 800px")
          h2.mt-5 To do...
          p Here is my ongoing to do list.
          div(style="transform: scale(0.8);opacity: 0.7;")
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | default active view
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Enable / disable views
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Hide / show weekends
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Add timeline w/ timerange &amp; increment
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Add timeline
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | time format 12/24 h
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Support for i18n
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Split days
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Support events
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Background events
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Overlap events
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Keep only default style in CSS
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Allow custom arrows
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Default active date
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              | Double tap on touch devices
            v-chip.pr-1(color="green" outline small disabled)
              v-icon.mr-2 check
              strong First NPM Release!
          //- v-chip.pr-1(color="amber darken-1" outline small disabled)
          //-   v-icon.mr-2 timer
          .mb-2 Then
          v-chip.pr-1(color="amber darken-1" outline small disabled)
            v-icon.mr-2 timer
            | Multiple-days events
          v-chip.pr-1(color="amber darken-1" outline small disabled)
            v-icon.mr-2 timer
            | Built-in themes
          v-chip.pr-1(color="deep-orange" outline small disabled)
            v-icon.mr-2 access_time
            | Resize events
          v-chip.pr-1(color="deep-orange" outline small disabled)
            v-icon.mr-2 access_time
            | Drag events
          v-chip.pr-1(color="deep-orange" outline small disabled)
            v-icon.mr-2 access_time
            | Recurring events
          v-chip.pr-1(color="deep-orange" outline small disabled)
            v-icon.mr-2 access_time
            | More control on all date formats
          v-chip.pr-1.white--text(color="deep-orange" outline small disabled)
            v-icon.mr-2 access_time
            | Highlight current time
          v-chip.pr-1.white--text(color="deep-orange" outline small disabled)
            v-icon.mr-2 access_time
            | Event indicator on month view

      h2.mt-5.mb-3.title Github project
      v-layout.mb-5(align-center shrink)
        v-icon.pr-4.lightgrey--text(x-large) fab fa-github
        a(href="https://github.com/antoniandre/vue-cal" target="_blank") //github.com/antoniandre/splitpanes #[v-icon(small color="primary") open_in_new]

      highlight-message(type="info")
        strong Important Notes#[br]
        | As this is a new component, options &amp; CSS classes may change a bit with new version release.#[br]
        | Keep checking the #[a(href="#release-notes") Release Notes]!#[br]#[br]
        strong Philosophy:&nbsp;
        | Vue Cal tries to separate logic &amp; styles.#[br]
        | For performance, simplified logic, readability, structure &amp; maintenance of your own code,
        | what can be done via CSS should be done via CSS. CSS classes will help you style your events, cells, splits, etc.

      h2.mt-5
        a(href="#installation") Installation
        a(name="installation")
      p You have 2 options: #[em NPM] #[strong.mx-2 or] #[span.code &lt;script&gt;] tag.
      h3 Via NPM
      sshpre(language="shell" label="Shell") npm install vue-cal --save-dev
      p Then import the component and use it:
      sshpre(language="js" label="Javascript").
        // In your VueJS component.
        import { Vuecal } from 'vue-cal'
        import 'vue-cal/dist/vuecal.css'
        ...

        export default {
          components: { Vuecal },
          data: () => ({
            ...
          }),
          ...
        }

      h3 Via #[span.code &lt;script&gt;] tag
      p Include the Vue Cal script in your document #[span.code &lt;head&gt;] as follows:
      sshpre(language="html" label="HTML").
        &lt;head&gt;
          ...
          &lt;script src="https://unpkg.com/vue/"&gt;&lt;/script&gt;
          &lt;script src="https://unpkg.com/vue-cal/"&gt;&lt;/script&gt;
          &lt;link href="https://unpkg.com/vue-cal/dist/vuecal.css" rel="stylesheet"&gt;
        &lt;/head&gt;

      h2.mt-5
        a(href="#how-to-use") How to use
        a(name="how-to-use")
      highlight-message(type="warning")
        p.mr-4.shrink.
          Wait! Before you dive in, make sure you place Vue cal in a container that has a set height!#[br]
          By default Vue Cal will take the full width &amp; height of its container if it has a height.#[br]
          You are also free to put a wrapping border or not, or box-shadow, anything you like.
        vue-cal(small :time-from="8 * 60" :time-to="22 * 60" :time-step="60" hide-weekends style="height: 250px;border: 1px solid #eee")
        sshpre(language="html-vue").
          &lt;!-- If the container has no height, set a height on vue-cal --&gt;
          &lt;vue-cal style="height: 250px;border: 1px solid #eee"&gt;&lt;/vue-cal&gt;

      h2.mt-5
        a(href="#examples") Examples
        a(name="examples")

      //- Example.
      h3.mt-3 # Example 1
      p
        | Given time range (8 - 22) and time step (1 hour), 24-hour format, hide weekends.
        | Double click cell to go narrower view.#[br]
        | By default the calendar theme is grey to match with most of web pages.#[br]
        | You can easily change the color theme (#[a(href="#css-notes") learn how]): try this
        v-btn(dark small :color="example1theme === 'green' ? 'rgba(66, 163, 185, 0.8)' : 'primary'" @click="example1theme = example1theme === 'green' ? 'blue' : 'green'") {{ example1theme === "green" ? 'blue theme' : 'green theme' }}
      v-card.my-2.ma-auto.main-content(:class="`${example1theme}-theme`")
        vue-cal(:time-from="8 * 60" :time-to="22 * 60" :time-step="60" hide-weekends)
      sshpre(language="html-vue" label="Vue Template").
        &lt;!-- Time start &amp; time end are expected in minutes. --&gt;
        &lt;vue-cal :time-from="8 * 60" :time-to="22 * 60" :time-step="60" hide-weekends&gt;&lt;/vue-cal&gt;
      highlight-message For all the options details, refer to the #[a(href="#api") API] section.

      //- Example.
      h3.mt-5 # Example 2
      p.
        Smaller view, 12-hour time format, hidden header, default month view.#[br]
        Simple click cell to go narrower view. Pre-selected date: 1st of January, 2000.
      v-card.green-theme.my-2.ma-auto.main-content(style="width: 460px;height: 400px;max-width: 100%")
        vue-cal(small hide-view-selector 12-hour default-view="month" click-to-navigate selected-date="2000-01-01 00:01")
      sshpre(language="html-vue" label="Vue Template").
        &lt;vue-cal small hide-view-selector 12-hour default-view="month" click-to-navigate&gt;&lt;/vue-cal&gt;

      highlight-message For all the options details, refer to the #[a(href="#api") API] section.

      //- Example.
      h3.mt-5 # Example 3
      p.
        Extra-small, no timeline, custom arrows (using the reserved slots `arrowPrev` &amp; `arrowNext`).#[br]
      v-card.green-theme.my-2.ma-auto.main-content(style="width: 250px;height: 260px;")
        vue-cal(hide-view-selector :time="false" default-view="month" xsmall)
          v-icon(slot="arrowPrev") arrow_back
          v-icon(slot="arrowNext") arrow_forward
      sshpre(language="html-vue" label="Vue Template").
        &lt;vue-cal hide-view-selector :time="false" default-view="month" xsmall&gt;
          &lt;i slot="arrowPrev" aria-hidden="true" class="v-icon material-icons"&gt;arrow_back&lt;/i&gt;
          &lt;i slot="arrowNext" aria-hidden="true" class="v-icon material-icons"&gt;arrow_forward&lt;/i&gt;
        &lt;/vue-cal&gt;

      highlight-message For all the options details, refer to the #[a(href="#api") API] section.

      //- Example.
      h3.mt-5 # Example 4
      p.
        i18n.#[br]
        Refer to the #[span.code locale] option in the #[a(href="#api") API] section.
      v-card.green-theme.my-2.ma-auto.main-content(style="width: 500px;height: 340px;max-width: 100%")
        vue-cal(:time="false" small default-view="year" locale="fr")
      sshpre(language="html-vue" label="Vue Template").
        &lt;vue-cal hide-view-selector :time="false" small default-view="year" locale="fr"&gt;&lt;/vue-cal&gt;

      //- Example.
      h3.mt-5 # Example 5
      p.
        Different layout. Week view disabled.
      v-layout.ma-auto(row justify-center wrap)
        v-card.blue-theme.ma-2.main-content.round(style="width: 280px;height: 300px;")
          vue-cal(xsmall hide-view-selector 12-hour :time="false" default-view="month" :disable-views="['week']")
        v-card.green-theme.ma-2.main-content.round(style="width: 280px;height: 300px;")
          vue-cal(xsmall hide-view-selector 12-hour :time="false" default-view="month" :disable-views="['week']")
      sshpre(language="html-vue" label="Vue Template").
        &lt;vue-cal xsmall hide-view-selector 12-hour :time="false" default-view="month" :disable-views="['week']"&gt;&lt;/vue-cal&gt;
      highlight-message Refer to the #[span.code disableViews] option in the #[a(href="#api") API] section.

      //- Example.
      h3.mt-5 # Example 6
      p.
        Flat events (undraggable, uneditable) with custom HTML content and css class (for event types).#[br]
        Disabled views: years, year, month.
      v-card.green-theme.my-2.ma-auto.main-content
        vue-cal(selected-date="2018-11-19" :time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="events")
      sshpre(language="html-vue" label="Vue Template").
        &lt;vue-cal selected-date="2018-11-19"
                 :time-from="7 * 60"
                 :time-to="23 * 60"
                 :time-step="60"
                 :disable-views="['years', 'year', 'month']"
                 hide-weekends
                 :events="events"&gt;
        &lt;/vue-cal&gt;
      highlight-message Refer to the #[span.code events] option in the #[a(href="#api") API] section.

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

      //- Example.
      h3.mt-5 # Example 7
      p.
        Overlapping events. Up to 3 overlapping events starting at the same time.
      v-card.green-theme.my-2.ma-auto.main-content
        vue-cal(selected-date="2018-11-19" :time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="overlappingEvents")
      sshpre(language="html-vue" label="Vue Template").
        &lt;vue-cal selected-date="2018-11-19"
                 :time-from="7 * 60"
                 :time-to="23 * 60"
                 :time-step="60"
                 :disable-views="['years', 'year', 'month']"
                 hide-weekends
                 :events="events"&gt;
        &lt;/vue-cal&gt;
      highlight-message Refer to the #[span.code events] option in the #[a(href="#api") API] section.

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

      //- Example.
      h3.mt-5 # Example 8
      p.mb-4
        | Split days passing a CSS class &amp; a label per split,
        | disabled views: years, year, month, and allow split-specific events.#[br]
        | You can also overflow your content using a min-width on cells, like in this example, or fit to container#[br]
        | Refer to the #[span.code splitDays] option in the #[a(href="#api") API] section.
        v-btn(small color="primary" @click="splitsExampleMinCellWidth = splitsExampleMinCellWidth ? 0 : 400")
          v-icon.mr-2 {{ splitsExampleMinCellWidth ? 'remove' : 'add' }}
          | {{ splitsExampleMinCellWidth ? ' fit to container ' : 'min cell width 400px' }}
      v-card.green-theme.my-2.ma-auto.main-content
        vue-cal(selected-date="2018-11-19" :time-from="8 * 60" :time-step="30" :disable-views="['years', 'year', 'month']" :split-days="[{ class: 'him', label: 'Him' }, { class: 'her', label: 'Her' }]" :events="splitEvents" :min-cell-width="splitsExampleMinCellWidth")
      sshpre(language="html-vue" label="Vue Template" v-pre).
        &lt;button @click="minCellWidth = minCellWidth ? 0 : 400"&gt;
          {{ minCellWidth ? ' fit to container ' : 'min cell width 400px' }}
        &lt;/button&gt;
        &lt;vue-cal selected-date="2018-11-19"
                 :time-from="8 * 60"
                 :time-step="30"
                 :disable-views="['years', 'year', 'month']"
                 :split-days="[{ class: 'him', label: 'Him' }, { class: 'her', label: 'Her' }]"
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
      h3.mt-5 # Example 9
      p.
        Background events.#[br]
        Refer to the #[span.code events] option in the #[a(href="#api") API] section.
      v-card.green-theme.my-2.ma-auto.main-content
        vue-cal(selected-date="2018-11-19" :time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="backgroundEvents")
      sshpre(language="html-vue" label="Vue Template").
        &lt;vue-cal selected-date="2018-11-19"
                 :time-from="7 * 60"
                 :time-to="23 * 60"
                 :time-step="60"
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
      h3.mt-5 # Example 10
      p.
        Timeless Events. Dates but no time information.#[br]
        Refer to the #[span.code events] option in the #[a(href="#api") API] section.
      v-card.green-theme.my-2.ma-auto.main-content(style="height: 350px;")
        vue-cal(selected-date="2018-11-19" :time="false" :disable-views="['years', 'year', 'month']" hide-weekends :events="timelessEvents")
      sshpre(language="html-vue" label="Vue Template").
        &lt;vue-cal selected-date="2018-11-19"
                 :time="false"
                 :disable-views="['years', 'year', 'month']"
                 hide-weekends
                 :events="events"&gt;
        &lt;/vue-cal&gt;
      highlight-message Refer to the #[span.code events] option in the #[a(href="#api") API] section.

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

      h2.mt-5.pt-5
        a(href="#api") API
        a(name="api")
      p Here is the list of all the available views.
      sshpre.mt-2(language="js").
        ['years', 'year', 'month', 'week', 'day']
      p Here is the list of all the parameters available.
      sshpre.mt-2(language="js").
        locale:             [String],  default: 'en'
        hideViewSelector:   [Boolean], default: false
        hideWeekends:       [Boolean], default: false
        disableViews:       [Array],   default: []
        defaultView:        [String],  default: 'week'
        selectedDate:       [String],  default: ''
        small:              [Boolean], default: false
        xsmall:             [Boolean], default: false
        clickToNavigate:    [Boolean], default: false
        dblClickToNavigate: [Boolean], default: true
        time:               [Boolean], default: true
        timeFrom:           [Number],  default: 0 // In minutes.
        timeTo:             [Number],  default: 24 * 60 // In minutes.
        timeStep:           [Number],  default: 30 // In minutes.
        timeCellHeight:     [Number],  default: 40 // In pixels.
        12Hour:             [Boolean], default: false
        minCellWidth:       [Number],  default: 0 // In pixels.
        splitDays:          [Array],   default: []
        events:             [Array],   default: []

      ul.pl-0.api-options
        li
          code.mr-2 locale
          span.code [String], default: 'en'
          p.
            Allows you to translate the calendar texts in a given language.#[br]
          highlight-message(type="info")
            | Currently available languages are English, French, Italian.#[br]
            | If you are interested in providing a language support please do a pull request with a json file into the i18n directory.#[br]
            | this is what a language json looks like.

            sshpre.my-2(language="json").
              {
                "weekDays": ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
                "months": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
                "years": "Années",
                "year": "Année",
                "month": "Mois",
                "week": "Semaine",
                "day": "Jour",
                "today": "Aujourd'hui",
                "noEvent": "Aucun événement",
                "dateFormat": "DDDD d mmmm yyyy"
              }
        li
          code.mr-2 hideViewSelector
          span.code [Boolean], default: false
          p.
            When set to true, the top view selector will disappear.#[br]
            You can still navigate from a view to another by clicking a cell (narrower view) or the view title (broader view).
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
            With #[span.code 12Hour] set to true (use #[span.code 12-hour] in template), the time format will show 12 hours suffixed with am/pm.
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

      h2.mt-5.pt-5
        a(href="#css-notes") CSS Notes
        a(name="css-notes")
      p You can easily change the calendar design with CSS.

      h3.mt-5 # Color Theme
      p.
        This is what a standard color theme looks like.
        You can copy and change any color to quickly get a nice render.#[br]
        Of course you can change even more in your CSS.

      sshpre(language="css" label="CSS").
        /* Green-theme. */
        .vuecal__menu {background-color: #42b983;}
        .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
        .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
        .vuecal__title {background-color: #e4f5ef;}
        .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
        .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
        .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}

      h3.mt-5 # Responsiveness &amp; Media Queries
      p.
        This calendar is fully responsive.#[br]
        To help you in making the calendar always look perfect,
        3 media queries (to keep it simple) are in place for small screens.#[br]
        The media queries operate downward from 550px, 450px &amp; 350px, and they mostly truncate the text
        of the days of the week from full day name to 3 letters and to 1 letter according to the space.#[br]#[br]

        If this is not enough for your particular use, you can add your own in your CSS.#[br]
        Additionally, you can use the options #[span.code small] &amp; #[span.code xsmall]
        to truncate week days at any size.

      h3.mt-5 # Disabled Text Selection
      p.
        By default the selection is disabled in the whole calendar except in the events.
        you can override this by CSS.

      h2.mt-5.pt-5.mb-2
        a(href="#release-notes") Release Notes
        a(name="release-notes")
      div #[strong version 1.0.0] First public release

    v-footer.mt-4.pa-2.pb-4(color="#fff")
      v-layout.max-widthed(row wrap align-center justify-center)
        v-flex.xs12.sm6.text-xs-center.text-sm-left.copyright.
          Copyright © 2018 Antoni André, all rights reserved.
        v-flex.xs12.sm6.text-xs-center.text-sm-right.made-with.
          This documentation is made with #[v-icon fab fa-vuejs], #[v-icon fab fa-html5], #[v-icon fab fa-css3], #[v-icon fab fa-sass] &amp; #[v-icon.heart favorite]#[br]
          View project on #[a(href="https://github.com/antoniandre/vue-cal" target="_blank") #[v-icon fab fa-github] Github].</template>

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
    start: '2018-11-22 19:30',
    end: '2018-11-22 21:00',
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
  name: 'app',
  components: {
    VueCal,
    Sshpre,
    highlightMessage
  },
  data: () => ({
    ready: false,
    splitsExampleMinCellWidth: 400,
    example1theme: 'green',
    now: new Date(),
    events,
    overlappingEvents: [
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
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Eat pop corns',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure',
        split: 2
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Enjoy the movie',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure',
        split: 2
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
        end: '2018-11-23',
        title: 'Need to go shopping',
        content: '<i class="v-icon material-icons">shopping_cart</i>',
        class: 'leisure'
      },
      {
        start: '2018-11-21',
        end: '2018-11-23',
        title: 'Golf with John',
        content: '<i class="v-icon material-icons">golf_course</i>',
        class: 'sport'
      },
      {
        start: '2018-11-22',
        end: '2018-11-23',
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
  created () {
    setTimeout(() => (this.ready = true), 500)
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

* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: $primary !important;

  &[name] {
    position: relative;
    top: -4em;
    display: block;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.logo {
  position: relative;
  display: inline-block;

  img {z-index: 1;position: relative;}

  .v-icon {
    position: absolute;
    left: 50%;
    font-size: 3em;
    opacity: 0;
    transition: 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    transform: rotate(0deg) scale(0.3);
    z-index: 0;
    color: #ddd;
  }

  .v-icon.calendar {
    margin-left: -25px;
    transform-origin: 75% 100%;

    .ready & {
      transform: translateX(-75%) rotate(-30deg) scale(0.8);
    }
  }

  .v-icon.time {
    margin-left: -19px;
    transform-origin: 25% 100%;

    .ready & {
      transform: translateX(75%) rotate(30deg) scale(0.8);
    }
  }

  .ready & .v-icon {
    opacity: 1;
  }
}

.main-content {
  max-width: 800px;
  height: 650px;
}

.code {
  font-family: monospace, sans-serif;
}

.api-options {list-style-type: none;}
.api-options > li {margin-top: 2em;}
.api-options p {margin-left: 1.5em;margin-top: 0.5em;}

.v-footer {
  font-size: 0.9em;

  .v-icon {
    font-size: 1.2em;
  }
}

// Default vue-cal demo style.
.green-theme {
  .vuecal__menu {background-color: #42b983;}
  .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title {background-color: #e4f5ef;}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
}

// Default blue vue-cal demo style.
.blue-theme {
  .vuecal__menu {background-color: rgba(66, 163, 185, 0.8);}
  .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title {background-color: rgba(0, 165, 188, 0.3);}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  .vuecal:not(.vuecal--day-view) .vuecal__cell.selected {background-color: rgba(235, 253, 255, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(115, 191, 204, 0.5);}
}

// Rounded cells example.
.round {
  .vuecal__weekdays-headings {border: none;}
  .vuecal__heading {font-size: 12px;}
  .vuecal__title {font-size: 1.3em;}
  .vuecal__cell, .vuecal:not(.vuecal--day-view) .vuecal__cell:before {background: none;border: none;}
  .vuecal__cell.out-of-scope {opacity: 0.4;}
  .vuecal__cell-content {
    width: 32px;
    height: 32px;
    font-size: 12px;
    background: #f1faf7;
    border: 1px solid transparent;
    color: #333;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vuecal--day-view .vuecal__cell-content {width: auto;background: none;}
  .vuecal--year-view .vuecal__cell {width: 33.33%;}
  .vuecal--year-view .vuecal__cell-content {width: 85px;}
  .vuecal--years-view .vuecal__cell-content {width: 52px;}
  .vuecal__cell {background-color: transparent !important;}

  &.green-theme {
    .vuecal:not(.vuecal--day-view) .today .vuecal__cell-content {background-color: #42b983;color: #fff;}
    .vuecal--day-view .vuecal__cell.today:before {background-color: rgba(66, 185, 131, 0.05);}
    .vuecal:not(.vuecal--day-view) .selected .vuecal__cell-content {border-color: #42b983;}
  }

  &.blue-theme {
    .vuecal:not(.vuecal--day-view) .vuecal__cell-content {background-color: rgba(100, 182, 255, 0.2);}
    .vuecal:not(.vuecal--day-view) .vuecal__cell.today .vuecal__cell-content {background-color: #8fb7e4;color: #fff;}
    .vuecal--day-view .vuecal__cell.today:before {background-color: rgba(143, 183, 228, 0.1);}
    .vuecal:not(.vuecal--day-view) .selected .vuecal__cell-content {border-color: #61a9e0;}
  }
}

// Split days example.
.vuecal__cell-split.him {background-color: rgba(221, 238, 255, 0.6);}
.vuecal__cell-split.him .split-label {color: rgba(0, 84, 194, 0.1);font-size: 30px;font-weight: 500;}
.vuecal__cell-split.her {background-color: rgba(255, 232, 251, 0.6);}
.vuecal__cell-split.her .split-label {color: rgba(255, 0, 106, 0.1);font-size: 30px;font-weight: 500;}

.vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
.vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}

.vuecal__event.lunch {
  background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);
  color: #999;
  display: flex;
  justify-content: center;
  align-items: center;
}
.vuecal__event.lunch .vuecal__event-time {display: none;align-items: center;}
</style>
