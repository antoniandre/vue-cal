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

        div(style="margin: 7em auto;max-width: 700px")
          h2.mt-5 To do...
          p Here is my ongoing to do list.
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
          v-chip.pr-1(color="amber darken-1" outline small disabled)
            v-icon.mr-2 timer
            | Double tap on touch devices
          v-chip.pr-1.white--text(color="deep-orange" small disabled)
            v-icon.mr-2 access_time
            strong First NPM Release
          .my-2 Then
          v-chip.pr-1(color="deep-orange" outline small disabled)
            v-icon.mr-2 access_time
            | Drag events
          v-chip.pr-1(color="deep-orange" outline small disabled)
            v-icon.mr-2 access_time
            | Resize events
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
            strong Second NPM Release

      highlight-message(type="warning")
        strong Important Notes#[br]
        | As this is a new component it is likely that options, CSS classes &amp; internal layout change with new version release.#[br]
        | But this is for the better! Keep checking the #[a(href="#release-notes") Release Notes]!

      highlight-message(type="info")
        strong Philosophy:&nbsp;
        | Vue Cal tries to separate logic &amp; styles.#[br]
        | For performance, simplified logic, readability, structure &amp; maintenance of your own code,
        | what can be done via CSS should be done via CSS. CSS classes will help you style your events, cells, splits, etc.

      h2.mt-5
        a(href="#installation") Installation
        a(name="installation")
      p You have 2 options: #[em NPM] #[strong.mx-2 or] #[span.code &lt;script&gt;] tag.
      h3 Via NPM - COMING END OF THIS WEEK!
      div(style="opacity: 0.25")
        ssh-pre(language="shell" label="Shell") npm install vue-cal --save-dev
        p Then import the component and use it:
        ssh-pre(language="js" label="Javascript").
          // In your VueJS component.
          import { VueCal } from 'vue-cal'
          import 'vue-cal/dist/vue-cal.min.css'
          ...

          export default {
            components: { VueCal },
            data: () => ({
              ...
            }),
            ...
          }

      h3 Via #[span.code &lt;script&gt;] tag - COMING END OF THIS WEEK!
      div(style="opacity: 0.25")
        p Include the Vue Cal script in your document #[span.code &lt;head&gt;] as follows:
        ssh-pre(language="html" label="HTML").
          &lt;head&gt;
            ...
            &lt;script src="https://unpkg.com/vue/dist/vue.min.js"&gt;&lt;/script&gt;
            &lt;script src="https://unpkg.com/vue-cal/dist/vue-cal.min.js"&gt;&lt;/script&gt;
            &lt;link href="https://unpkg.com/vue-cal/dist/vue-cal.min.css" rel="stylesheet"&gt;
          &lt;/head&gt;

      h2.mt-5
        a(href="#examples") Examples
        a(name="examples")

      //- Example.
      h3.mt-3 # Example 1
      p
        | Given time range (8 - 22) and time step (1 hour), 24-hour format, hide weekends.
        | Double click cell to go narrower view.#[br]
        | By the way, you can easily change the color theme of the calendar, which by default is grey.#[br]
        | before you look at the CSS code bellow try this
        v-btn(dark small :color="example1theme === 'green' ? 'rgba(66, 163, 185, 0.8)' : 'primary'" @click="example1theme = example1theme === 'green' ? 'blue' : 'green'") {{ example1theme === "green" ? 'blue theme' : 'green theme' }}
      v-card.my-2.ma-auto.main-content(:class="`${example1theme}-theme`")
        vue-cal(:time-from="8 * 60" :time-to="22 * 60" :time-step="60" hide-weekends)
      ssh-pre(language="html-vue" label="Vue Template").
        &lt;!-- Time start &amp; time end are expected in minutes. --&gt;
        &lt;vue-cal :time-from="8 * 60" :time-to="22 * 60" :time-step="60" hide-weekends&gt;&lt;/vue-cal&gt;
      p.
        So this is what a standard color theme looks like.
        You can copy and change any color to quickly get a nice render.#[br]
        Of course you can even change more in your CSS.

      ssh-pre(language="css" label="CSS").
        /* Green-theme. */
        .vuecal__menu {background-color: #42b983;}
        .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
        .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
        .vuecal__title {background-color: #e4f5ef;}
        .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
        .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
        .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}

      //- Example.
      h3.mt-5 # Example 2
      p.
        Smaller view, 12-hour time format, hidden header, default month view.#[br]
        Simple click cell to go narrower view. Pre-selected date: 1st of January, 2000.
      v-card.green-theme.my-2.ma-auto.main-content(style="width: 460px;height: 400px;max-width: 100%")
        vue-cal(small hide-view-selector 12-hour default-view="month" click-to-navigate selected-date="2000-01-01 00:01")
      ssh-pre(language="html-vue" label="Vue Template").
        &lt;vue-cal small hide-view-selector 12-hour default-view="month" click-to-navigate&gt;&lt;/vue-cal&gt;

      highlight-message(type="info")
        | The small parameter truncates the days of the week to 3 letters in month view and week view.#[br]

      highlight-message(type="tips")
        | The default-view parameter accepts one of the available views id: 'years', 'year', 'month', 'week', 'day'.#[br]

      //- Example.
      h3.mt-5 # Example 3
      p.
        Extra-small, no timeline, custom arrows (using the reserved slots `arrowPrev` &amp; `arrowNext`).#[br]
      v-card.green-theme.my-2.ma-auto.main-content(style="width: 250px;height: 260px;")
        vue-cal(hide-view-selector :time="false" xsmall)
          v-icon(slot="arrowPrev") undo
          v-icon(slot="arrowNext") redo
      ssh-pre(language="html-vue" label="Vue Template").
        &lt;vue-cal hide-view-selector :time="false" xsmall&gt;
          &lt;i slot="arrowPrev" aria-hidden="true" class="v-icon material-icons"&gt;undo&lt;/i&gt;
          &lt;i slot="arrowNext" aria-hidden="true" class="v-icon material-icons"&gt;redo&lt;/i&gt;
        &lt;/vue-cal&gt;

      //- Example.
      h3.mt-5 # Example 4
      p.
        i18n.
      v-card.green-theme.my-2.ma-auto.main-content(style="width: 500px;height: 340px;max-width: 100%")
        vue-cal(:time="false" small default-view="year" locale="fr")
      ssh-pre(language="html-vue" label="Vue Template").
        &lt;vue-cal hide-view-selector :time="false" small default-view="year" locale="fr"&gt;&lt;/vue-cal&gt;

      highlight-message(type="info")
        | Currently available languages are English, French, Italian.#[br]
        | If you are interested in providing a language support please do a pull request with a json file into the i18n directory.#[br]
        | this is what a language json looks like.

        ssh-pre(language="json").
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

      //- Example.
      h3.mt-5 # Example 5
      p.
        Different layout. Week view disabled.
      v-layout.ma-auto(row justify-center wrap)
        v-card.blue-theme.ma-2.main-content.round(style="width: 280px;height: 300px;")
          vue-cal(xsmall hide-view-selector 12-hour :time="false" default-view="month" :disable-views="['week']")
        v-card.green-theme.ma-2.main-content.round(style="width: 280px;height: 300px;")
          vue-cal(xsmall hide-view-selector 12-hour :time="false" default-view="month" :disable-views="['week']")
      ssh-pre(language="html-vue" label="Vue Template").
        &lt;vue-cal xsmall hide-view-selector 12-hour :time="false" default-view="month" :disable-views="['week']"&gt;&lt;/vue-cal&gt;

      highlight-message(type="tips")
        | The disable-views parameter accepts an array of available views id: 'years', 'year', 'month', 'week', 'day'.#[br]

      //- Example.
      h3.mt-5 # Example 6
      p.
        Flat events (undraggable, uneditable) with custom HTML content and css class (for event types).#[br]
        Disabled views: years, year, month.
      v-card.green-theme.my-2.ma-auto.main-content
        vue-cal(:time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="events")
      ssh-pre(language="html-vue" label="Vue Template").
        &lt;vue-cal :time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="events"&gt;&lt;/vue-cal&gt;

      ssh-pre(language="js" label="Javascript").
        data: () => ({
          events: [
            {
              start: '2018-11-19 10:35',
              end: '2018-11-19 11:30',
              title: 'Doctor appointment',
              content: '<i class="v-icon material-icons">local_hospital</i>',
              class: 'health'
            },
            {
              start: '2018-11-19 18:30',
              end: '2018-11-19 19:15',
              title: 'Dentist appointment',
              content: '<i class="v-icon material-icons">local_hospital</i>',
              class: 'health'
            },
            {
              start: '2018-11-20 18:30',
              end: '2018-11-20 20:30',
              title: 'Crossfit',
              content: '<i class="v-icon material-icons">fitness_center</i>',
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
        vue-cal(:time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="overlappingEvents")
      ssh-pre(language="html-vue" label="Vue Template").
        &lt;vue-cal :time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="events"&gt;&lt;/vue-cal&gt;

      ssh-pre(language="js" label="Javascript").
        data: () => ({
          events: [
            {
              start: '2018-11-19 10:35',
              end: '2018-11-19 11:30',
              title: 'Doctor appointment',
              content: '<i class="v-icon material-icons">local_hospital</i>',
              class: 'health'
            },
            {
              start: '2018-11-19 18:30',
              end: '2018-11-19 19:15',
              title: 'Dentist appointment',
              content: '<i class="v-icon material-icons">local_hospital</i>',
              class: 'health'
            },
            {
              start: '2018-11-20 18:30',
              end: '2018-11-20 20:30',
              title: 'Crossfit',
              content: '<i class="v-icon material-icons">fitness_center</i>',
              class: 'sport'
            },
            ...
          ]
        })

      //- Example.
      h3.mt-5 # Example 8
      p.mb-4
        | Split days passing a CSS class &amp; a label per split, disabled views: years, year, month, and allow split-specific events.#[br]
        | You can also overflow your content using a min-width on cells, like in this example, or fit to container
        v-btn(small color="primary" @click="splitsExampleMinCellWidth = splitsExampleMinCellWidth ? 0 : 400")
          v-icon.mr-2 {{ splitsExampleMinCellWidth ? 'remove' : 'add' }}
          | {{ splitsExampleMinCellWidth ? ' fit to container ' : 'min cell width 400px' }}
      v-card.green-theme.my-2.ma-auto.main-content
        vue-cal(:time-from="8 * 60" :time-step="30" :disable-views="['years', 'year', 'month']" :split-days="[{ class: 'him', label: 'Him' }, { class: 'her', label: 'Her' }]" :events="splitEvents" :min-cell-width="splitsExampleMinCellWidth")
      ssh-pre(language="html-vue" label="Vue Template" v-pre).
        &lt;button @click="minCellWidth = minCellWidth ? 0 : 400"&gt;
          {{ minCellWidth ? ' fit to container ' : 'min cell width 400px' }}
        &lt;/button&gt;
        &lt;vue-cal :time-from="8 * 60"
                 :time-step="30"
                 :disable-views="['years', 'year', 'month']"
                 :split-days="[{ class: 'him', label: 'Him' }, { class: 'her', label: 'Her' }]"
                 :events="events"
                 :min-cell-width="minCellWidth"&gt;
        &lt;/vue-cal&gt;

      ssh-pre(language="js" label="Javascript").
        data: () => ({
          splitsExampleMinCellWidth: 400,
          events: [
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
            ...
          ]
        })

      ssh-pre(language="css" label="CSS").
        /* You can easily set a different style for each split of your days. */
        .vuecal__cell-split.him {background-color: rgba(221, 238, 255, 0.6);}
        .vuecal__cell-split.him .split-label {color: rgba(0, 84, 194, 0.1);font-size: 30px;font-weight: 500;}
        .vuecal__cell-split.her {background-color: rgba(255, 232, 251, 0.6);}
        .vuecal__cell-split.her .split-label {color: rgba(255, 0, 106, 0.1);font-size: 30px;font-weight: 500;}

        /* Different color for different event types. */
        .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
        .vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
        .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}

      //- Example.
      h3.mt-5 # Example 9
      p.
        Background events.
      v-card.green-theme.my-2.ma-auto.main-content
        vue-cal(:time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="backgroundEvents")
      ssh-pre(language="html-vue" label="Vue Template").
        &lt;vue-cal :time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="events"&gt;&lt;/vue-cal&gt;

      ssh-pre(language="js" label="Javascript").
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

      ssh-pre(language="css" label="CSS").
        .vuecal__event.lunch {
          background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);/* IE 10+ */
          color: #999;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .vuecal__event.lunch .vuecal__event-time {display: none;align-items: center;}

      highlight-message(type="info")
        | Recurring events will be available in a next release.

      h2.mt-5.pt-5
        a(href="#release-notes") Release Notes
        a(name="release-notes")
      p No public release for the moment!

    v-footer.justify-end.px-3(color="white")
      em 2018 &copy; Antoni Andre.
</template>

<script>
import VueCal from '@/components/vue-cal'
import { simpleSyntaxHighlighter } from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/simple-syntax-highlighter.min.css'
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
    sshPre: simpleSyntaxHighlighter,
    highlightMessage
  },
  data: () => ({
    ready: false,
    splitsExampleMinCellWidth: 400,
    example1theme: 'green',
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
    ]
  }),
  created () {
    setTimeout(() => (this.ready = true), 500)
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

// Default vue-cal demo style.
.green-theme {
  .vuecal__menu {background-color: #42b983;}
  .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title {background-color: #e4f5ef;}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  .vuecal__cell.selected {background-color: rgba(235, 255, 245, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(66, 185, 131, 0.5);}
}

// Default blue vue-cal demo style.
.blue-theme {
  .vuecal__menu {background-color: rgba(66, 163, 185, 0.8);}
  .vuecal__menu li {border-bottom-color: #fff;color: #fff;}
  .vuecal__menu li.active {background-color: rgba(255, 255, 255, 0.15);}
  .vuecal__title {background-color: rgba(0, 165, 188, 0.3);}
  .vuecal__cell.today, .vuecal__cell.current {background-color: rgba(240, 240, 255, 0.4);}
  .vuecal__cell.selected {background-color: rgba(235, 253, 255, 0.4);}
  .vuecal__cell.selected:before {border-color: rgba(115, 191, 204, 0.5);}
}

// Rounded cells example.
.round {
  .vuecal__weekdays-headings {border: none;}
  .vuecal__heading {font-size: 12px;}
  .vuecal__title {font-size: 1.3em;}
  .vuecal__cell, .vuecal__cell:before {background: none;border: none;}
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
    .today .vuecal__cell-content {background-color: #42b983;color: #fff;}
    .selected .vuecal__cell-content {border-color: #42b983;}
  }

  &.blue-theme {
    .vuecal:not(.vuecal--day-view) .vuecal__cell-content {background-color: rgba(100, 182, 255, 0.2);}
    .vuecal__cell.today .vuecal__cell-content {background-color: #8fb7e4;color: #fff;}
    .selected .vuecal__cell-content {border-color: #61a9e0;}
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
