<template lang="pug">
h1.title1 API

h2.w-flex.justify-space-between.mb2
  title-link(tag="div" anchor="views") Calendar Views
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
  title-link(tag="div" anchor="options") Options
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
      strong.default.code undefined
    template(#content)
      p Setting to false will force it off on date-picker.
      p.
        When set to #[span.code true] a single click (or tap for touch devices) will take you to a
        narrower view if available.#[br]
        You can always go back to a broader view by clicking the view title or selecting another view
        from the view selector if enabled.#[br]
        The navigation to narrower view can be disabled by setting both #[span.code clickToNavigate]
        and #[span.code dblclickToNavigate] to false.

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
      p Shorthand for xs: true, views: [month, year, years], clickToNavigate: true.

  w-accordion-item
    template(#title)
      strong.code datePrototypes
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p Wether or not to add some useful methods to the native Date class.

  w-accordion-item
    template(#title)
      strong.code events
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code () => []
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code eventsOnMonthView
      .type [Boolean, String]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p Allows displaying all events on month view.

  w-accordion-item
    template(#title)
      strong.code hideWeekdays
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code () => []
    template(#content)
      p Accepts an array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.
      p Hide specific weekdays in month &amp; week and days views.

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
      strong.code selectedDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p

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
        read on in the #[a(href="#css-notes") CSS Notes].

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

  w-accordion-item
    template(#title)
      strong.code schedules
      .type [Array]
      | ,
      .body.grey.mx1 default:
      strong.default.code () => []
    template(#content)
      p Split a day in different persons/rooms/locations schedules.

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
      p

  w-accordion-item
    template(#title)
      strong.code timeFrom
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p Start time of the time column, in minutes.

  w-accordion-item
    template(#title)
      strong.code timeStep
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 60
    template(#content)
      p Step amount for the time in the time column, in minutes.

  w-accordion-item
    template(#title)
      strong.code timeTo
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code minutesInADay
    template(#content)
      p End time of the time column, in minutes.

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
      p Show or hide the header today button.

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
      p 12 or 24 hour format are respectively written like 1pm and 13:00.

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
      p

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
      p More expensive, so only trigger on demand.

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
      strong.code dblclickToNavigate
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p.
        When set to #[span.code true] a double click (or double tap for touch devices) will take you to a
        narrower view if available.#[br]
        You can always go back to a broader view by clicking the view title or selecting another view
        from the view selector if enabled.#[br]
        The navigation to narrower view can be disabled by setting both #[span.code clickToNavigate]
        and #[span.code dblclickToNavigate] to false.

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
      strong.code cellClickHold
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code dragToCreateEvent
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code true
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code dragToCreateThreshold
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 15
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code editableEvents
      .type [Boolean, Object]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code onEventCreate
      .type [Function, null]
      | ,
      .body.grey.mx1 default:
      strong.default.code null
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code showWeekNumbers
      .type [Boolean, String]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code snapToTime
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p








  //- TO DO LATER.
  w-accordion-item
    template(#title)
      strong.code eventsCountOnYearView
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code maxDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code minDate
      .type [String, Date]
      | ,
      .body.grey.mx1 default:
      strong.default.code ''
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code minEventWidth
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code minScheduleWidth
      .type [Number]
      | ,
      .body.grey.mx1 default:
      strong.default.code 0
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code overlapsPerTimeStep
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code resizeX
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code showAllDayEvents
      .type [Boolean, String]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
      p

  w-accordion-item
    template(#title)
      strong.code showTimeInCells
      .type [Boolean]
      | ,
      .body.grey.mx1 default:
      strong.default.code false
    template(#content)
    p
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import { useAppStore } from '@/store'
import EnUs from '@/vue-cal/i18n/fr.json'
import { useLocale, addDatePrototypes } from '@/vue-cal'
import TitleLink from '@/documentation/components/title-link.vue'
import HighlightMessage from '@/documentation/components/highlight-message.vue'

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
