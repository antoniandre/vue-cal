<template lang="pug">
.documentation
  //- Main demo.
  main-demo

  //- Github project.
  h2.headline.mt-12.pt-12.mb-8.title Github project &nbsp;&amp;&nbsp; important notes
  v-layout.mb-3(align-center)
    v-icon.pl-2.pr-1.mr-4.grey--text.text--lighten-1(x-large) fab fa-github
    a(href="https://github.com/antoniandre/vue-cal" target="_blank") github.com/antoniandre/vue-cal #[v-icon(small color="primary") open_in_new]

  v-layout.mt-8(align-center)
    v-icon.mr-4(size="50" color="amber lighten-2") info
    v-alert.ma-0(dense border="left" text color="yellow")
      div.black--text
        p.mb-2
          strong Important Notes: Always check the #[a(href="#release-notes") Release Notes] when you upgrade!
        strong Philosophy:&nbsp;
        | Vue Cal tries to separate logic &amp; styles.#[br]
        .body-2.
          For performance, simplified logic, readability, structure &amp; maintenance of your own code,
          what can be done via CSS should be done via CSS. CSS classes will help you style your events, cells, splits, etc.#[br]#[br]
          Vue Cal provides the minimum needed CSS styles, not the nicest one: that makes it highly customizable for all the scenarii
          and a breeze to override, you most likely don't need the #[code !important] flag.

  v-layout.my-8(align-center)
    v-icon.mr-4(size="50" color="pink lighten-3") favorite
    v-alert.ma-0(dense border="left" text color="pink")
      | If you like Vue Cal, you can
      a.pink--text.ml-2(href="https://www.paypal.me/antoniandre1" target="_blank" style="text-decoration: underline") #[strong Support the project]!
      div Thank you so much to all the supporters! #[span.headline.ml-1 🙏]

  //- To Do list.
  h2.headline.mt-12.pt-12
    a(href="#to-do-list") To do...
    a#to-do-list(name="to-do-list")
  p.mb-4 Here is my ongoing to do list.

  .layout.wrap.align-center
    strong.mr-3 Earlier
    todo-list-item default active view
    todo-list-item Enable / disable views
    todo-list-item Hide / show weekends
    todo-list-item Add timeline w/ timerange &amp; increment
    todo-list-item Add timeline
    todo-list-item time format 12/24 h
    todo-list-item Support for i18n
    todo-list-item Split days
    todo-list-item Support events
    todo-list-item Background events
    todo-list-item Overlap events
    todo-list-item Keep only default style in CSS
    todo-list-item Allow custom arrows
    todo-list-item Default active date
    todo-list-item Double tap on touch devices
    todo-list-item 1st NPM Release!
    todo-list-item Built-in themes
    todo-list-item Resize events
    todo-list-item Delete events
    todo-list-item Emit DOM events
    todo-list-item Event indicator on month view
    todo-list-item Custom time format
    todo-list-item Highlight current time
    todo-list-item Show events on month view
    todo-list-item sync 2 vue-cal instances
    todo-list-item Add CSS transitions
    todo-list-item Multiple day events
    todo-list-item Custom events rendering
    todo-list-item Custom callback on event click
    todo-list-item Option to start week on Sunday
    todo-list-item All day events in top bar
    todo-list-item Custom cell rendering
    todo-list-item Events count on year(s) views
    todo-list-item Create new event
    todo-list-item min &amp; max dates
    todo-list-item Today button
    todo-list-item Externalize locales
    todo-list-item Support more simultaneous events
    todo-list-item Sticky day splits labels
    todo-list-item Hide particular weekdays
    todo-list-item Optional week number
    todo-list-item Date prototypes
    todo-list-item Business hours
    todo-list-item Drag &amp; drop events
    todo-list-item Resize events snap to time
    todo-list-item Drag events snap to time
    todo-list-item Drop external events into Vue Cal

  .layout.wrap.align-center.mt-4
    strong.mr-3 Current backlog
    todo-list-item(status="doing") Recurring events
    todo-list-item(status="todo") Drag &amp; drop multiple day events
    todo-list-item(status="todo") Drag &amp; drop events on touch devices
    todo-list-item(status="todo")
      a(href="https://github.com/antoniandre/vue-cal/issues/168" target="_blank" style="text-decoration: underline;color: inherit") Full Typescript support
    todo-list-item(status="todo")
      a(href="https://github.com/antoniandre/vue-cal/issues/127" target="_blank" style="text-decoration: underline;color: inherit") Full SSR support
    todo-list-item(status="todo") Improve multiple day events Month view
    todo-list-item(status="todo") Prevent event intersect. on drag/resize
    todo-list-item(status="todo") Horizontal timeline
    //- TODO:
      General
      - do all the @todo in the codebase
      - check overlaps only on the cell that has changed on event create/drag/background change
      Multiple-day events:
      - Fix event segments when dragging too fast on x axis.
      - multiple days on month view like google calendar
      - if more than 24 hour duration, consider as all-day

  //- Installation
  h2.headline.mt-12.pt-12
    a(href="#installation") Installation
    a#installation(name="installation")
  strong.black--text Vue.js 2.6.7 or later is required.
  p.mt-2 You have 2 options: using NPM or #[span.code &lt;script&gt;] tag.
  h3.mt-8 Via NPM
  sshpre.mt-2(language="shell" label="Shell") npm i --S vue-cal
  p Then import the component and use it:
  sshpre.mt-2(language="js" label="Javascript").
    // In your Vue.js component.
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
  sshpre.mt-6(language="html" label="HTML").
    &lt;head&gt;
      ...
      &lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
      &lt;script src="https://unpkg.com/vue-cal"&gt;&lt;/script&gt;
      &lt;link href="https://unpkg.com/vue-cal/dist/vuecal.css" rel="stylesheet"&gt;
    &lt;/head&gt;
  p Then define the component to use in your template:
  sshpre.mt-6(language="js" label="Javascript").
    // In your Vue.js component.
    export default {
      components: { 'vue-cal': vuecal },
      ...
    }

  h2.headline.mt-12.pt-12
    a(href="#how-to-use") How to use
    a#how-to-use(name="how-to-use")
  highlight-message(type="warning")
    p.
      Wait! Before you dive in, make sure you place Vue Cal in a container that #[strong has a set height]! (not auto or initial)#[br]
      By default Vue Cal will take the full width &amp; height of its container if it has a set height.
    sshpre.mt-2(language="html-vue").
      &lt;!-- If the container has no height, set a height on vue-cal --&gt;
      &lt;vue-cal style="height: 250px" /&gt;
    vue-cal(small :time="false" hide-view-selector style="height: 250px")

  //- Examples.
  examples(:locales-list="localesList")

  //- API.
  api(:locales-list="localesList")

  //- Date prototypes.
  h2.headline.mt-12.pt-12
    a(href="#date-prototypes") #[strong.code Date] Prototypes
    a#date-prototypes(name="date-prototypes")
  p
    | Vue Cal has no dependency and performs date operations through a few notable useful and efficient functions that
    | have been added to the native #[span.code Date] class for your convenience.#[br]
    strong.mr-2.
      With this set of functions, you will most likely not need #[em Moment.js] or any other additional Date library!#[br]#[br]
      Once Vue Cal is loaded, you can access the following functions from anywhere in your code
      just like a simple #[span.code Date] function.
    | E.g. #[span.code (new Date()).addDays(2)]

  ul
    li.mt-3
      code.mr-2 .addDays(days)
      | Adds days to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code days]` is an integer.
    li.mt-3
      code.mr-2 .subtractDays(days)
      | Subtracts days to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code days]` is an integer.
    li.mt-3
      code.mr-2 .addHours(hours)
      | Adds hours to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code hours]` is an integer.
    li.mt-3
      code.mr-2 .subtractHours(hours)
      | Subtracts hours to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code hours]` is an integer.
    li.mt-3
      code.mr-2 .addMinutes(minutes)
      | Adds minutes to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code minutes]` is an integer.
    li.mt-3
      code.mr-2 .subtractMinutes(minutes)
      | Subtracts minutes to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
      | `#[span.code minutes]` is an integer.
    li.mt-3
      code.mr-2 .getWeek()
      | Returns the week number (1 #[a(href="#there-can-be-53-weeks-in-a-year") to 53]) of a date.
    li.mt-3
      code.mr-2 .isToday()
      | Returns #[span.code true] if the date is Today.
    li.mt-3
      code.mr-2 .isLeapYear()
      | Returns #[span.code true] if the date is in a leap year.

  h3.mt-4 And because everyone needs a Date/time formatting function...
  p.
    It is now available directly from the Date object, with your loaded locale!

  ul
    li.mt-3
      code.mr-2 .format(format)
      div.
        Returns a formatted date string.
        Default format is #[span.code 'YYYY-MM-DD'], but you can use any formatting keyword from
        this list, and add any character not present in this mapping:
      ul
        li #[strong.code.black--text YYYY]: full year. #[span.grey--text.ml-2 E.g. `2019`]
        li #[strong.code.black--text YY]: 2 last digits of the year. #[span.grey--text.ml-2 E.g. `19`]
        li #[strong.code.black--text MMMM]: month in full. #[span.grey--text.ml-2 E.g. `January`]
        li #[strong.code.black--text MMM]: 3 first letters of the month. #[span.grey--text.ml-2 E.g. `Jan`]
        li #[strong.code.black--text MM]: month number with leading zero. (01-12) #[span.grey--text.ml-2 E.g. `01`]
        li #[strong.code.black--text M]: month number without leading zero. (1-12) #[span.grey--text.ml-2 E.g. `1`]
        li #[strong.code.black--text DD]: date of the month with leading zero. (01-31) #[span.grey--text.ml-2 E.g. `01`]
        li #[strong.code.black--text D]: date of the month without leading zero. (1-31) #[span.grey--text.ml-2 E.g. `1`]
        li.
          #[strong.code.black--text S]: (usually with surrounding #[span.code `{ }`]) only in English,
          will output #[span.code `st`], #[span.code `nd`], #[span.code `rd`] or #[span.code `th`].
        li #[strong.code.black--text dddd]: day of the week in full. #[span.grey--text.ml-2 E.g. `Monday`]
        li #[strong.code.black--text ddd]: 3 first letters of the day of the week. #[span.grey--text.ml-2 E.g. `Mon`]
        li #[strong.code.black--text dd]: first letter of the day of the week. #[span.grey--text.ml-2 E.g. `M`]
        li #[strong.code.black--text d]: number of the day of the week. (1-7) #[span.grey--text.ml-2 E.g. `1` for Monday]
        li #[strong.black--text And also all the keywords from the following #[span.code formatTime()] function.]

    li.mt-3
      code.mr-2 .formatTime(format)
      div.
        Returns a formatted time string.#[br]
        The #[span.code format()] function can also do this, but this might be a shortcut if you just want
        the default time formatting.#[br]
        E.g. `#[span.code formatTime()]`).#[br]
        This function will also be slightly faster than #[span.code format()] as lighter in functionality.#[br]
        Default format is #[span.code 'HH:mm'], but you can use any formatting keyword from
        this list, and add any character not present in this mapping:
      ul
        li #[strong.code.black--text HH]: Hours with leading zero, 24-hour format. (00-24)#[span.grey--text.ml-2 E.g. `20`]
        li #[strong.code.black--text H]: Hours without leading zero, 24-hour format. (0-24)#[span.grey--text.ml-2 E.g. `20`]
        li #[strong.code.black--text hh]: Hours with leading zero, 12-hour format. #[span.grey--text.ml-2 E.g. `08`]
        li #[strong.code.black--text h]: Hours without leading zero, 12-hour format. #[span.grey--text.ml-2 E.g. `8`]
        li #[strong.code.black--text mm]: Minutes with leading zero. #[span.grey--text.ml-2 E.g. `08`]
        li #[strong.code.black--text m]: Minutes without leading zero. #[span.grey--text.ml-2 E.g. `8`]
        li #[strong.code.black--text am]: (usually with surrounding #[span.code `{ }`]) am or pm (also localized if any)

  highlight-message.my-4(type="tips")
    ul
      li.
        To separate 2 keywords or a keyword and another text not from this list without adding spaces or
        any separation, you can use the delimiters #[span.code `{ }`].#[br]
        For instance #[span.code `new Date().format('YYYY{MM}DD')`] (or even #[span.code `{YYYY}{MM}{DD}`]) will produce:
        "#[span.code {{ nowFormatted }}]".
      li.mt-4.
        The Date functions are added when Vue Cal loads, you can always check if you have it before you use it:#[br]
        #[span.code Date.prototype.format &amp;&amp; new Date().format()]
      li.mt-4.
        If you really don't want the Date prototypes to be added, you can disable them with this option:
        #[span.code disable-date-prototypes].#[br]
        Refer to #[a(href="https://github.com/antoniandre/vue-cal/issues/259" target="_blank" style="text-decoration: underline;color: inherit") This Vue Cal issue on Github].

  //- CSS notes.
  h2.headline.mt-12.pt-12
    a(href="#css-notes") CSS Notes
    a#css-notes(name="css-notes")
  p You can easily change the calendar design with CSS.

  h3.mt-12 # Color themes &amp; rounded theme
  p.
    Currently 2 color themes (green &amp; blue) are available, in addition to the standard grey theme.#[br]
    You can apply a green or blue theme by using the CSS class #[span.code vuecal--green-theme]
    or #[span.code vuecal--blue-theme].
  p.
    If you want another color theme, you can define your own easily.#[br]
    This is what a standard color theme looks like.
    You can copy and change any color to quickly get a nice render.#[br]
    If that is still not doing what you want you can change even more in your own CSS.

  sshpre(language="css" label="CSS").
    /* Green-theme. */
    .vuecal__menu, .vuecal__cell-events-count {background-color: #42b983;}
    .vuecal__title-bar {background-color: #e4f5ef;}
    .vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
    .vuecal:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(235, 255, 245, 0.4);}
    .vuecal__cell--selected:before {border-color: rgba(66, 185, 131, 0.5);}
    /* Cells and buttons get highlighted when an event is dragged over it. */
    .vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
    .vuecal__cell-split--highlighted {background-color: rgba(195, 255, 225, 0.5);}
    .vuecal__arrow.vuecal__arrow--highlighted,
    .vuecal__view-btn.vuecal__view-btn--highlighted {background-color: rgba(136, 236, 191, 0.25);}

  p
    strong Rounded theme#[br]
    | You can use the rounded cells theme like in the Example
    | #[a(href="#ex--calendar-themes") Calendar themes - Rounded cells],
    | by applying the CSS class #[span.code vuecal--rounded-theme] to the Vue Cal wrapper.

  h3.mt-12 # Responsiveness &amp; media queries
  p.
    This calendar is fully responsive.#[br]
    To help you in making the calendar always look perfect,
    2 media queries (to keep it simple) are in place for small screens.#[br]
    The media queries operate downwards from 550px &amp; 450px, to truncate the text
    of the days of the week from full day name to 3 letters and to 1 letter according to the available space.#[br]#[br]

    If this is not enough for your particular use, you can add your own in your CSS.#[br]
    Additionally, you can use the options #[span.code small] &amp; #[span.code xsmall]
    to truncate week days at any size.

  h3.mt-12 # Disabled text selection
  p.
    Notice that on Windows machines, and on devices where the scrollbar takes some space and
    pushes the calendar main content (#[span.code week] and #[span.code day] views), the
    weekdays headings and the all-day bar get an added padding right to align well with the main content.#[br]
    This is done once, in the #[span.code mounted] hook.

  h3.mt-12 # Disabled text selection
  p.
    By default the selection is disabled in the whole calendar except in the events.
    you can override this by CSS.

  //- Release notes.
  h2.headline.mt-12.pt-12.mb-4
    a(href="#release-notes") Release notes
    a#release-notes(name="release-notes")
  release-notes
</template>

<script>
import VueCal from '@/vue-cal'
import Sshpre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import HighlightMessage from './components/highlight-message'
import TodoListItem from './components/todo-list-item'
import MainDemo from './main-demo'
import Examples from './examples'
import Api from './api'
import ReleaseNotes from './release-notes'
import './scss/index.scss'

const localesList = [
  { code: 'sq', label: 'Albanian' },
  { code: 'ar', label: 'Arabic' },
  { code: 'bn', label: 'Bangla' },
  { code: 'bs', label: 'Bosnian' },
  { code: 'bg', label: 'Bulgarian' },
  { code: 'ca', label: 'Catalan' },
  { code: 'cs', label: 'Czech' },
  { code: 'zh-cn', label: 'Chinese (Simplified)' },
  { code: 'zh-hk', label: 'Chinese (Traditional)' },
  { code: 'hr', label: 'Croatian' },
  { code: 'da', label: 'Danish' },
  { code: 'nl', label: 'Dutch' },
  { code: 'en', label: 'English' },
  { code: 'fa', label: 'Farsi' },
  { code: 'fr', label: 'French' },
  { code: 'ka', label: 'Georgian' },
  { code: 'de', label: 'German' },
  { code: 'el', label: 'Greek' },
  { code: 'he', label: 'Hebrew' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'is', label: 'Icelandic' },
  { code: 'it', label: 'Italian' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'lt', label: 'Lithuanian' },
  { code: 'no', label: 'Norwegian' },
  { code: 'pl', label: 'Polish' },
  { code: 'pt-br', label: 'Portuguese Brasilian' },
  { code: 'ro', label: 'Romanian' },
  { code: 'ru', label: 'Russian' },
  { code: 'sr', label: 'Serbian' },
  { code: 'sk', label: 'Slovak' },
  { code: 'sl', label: 'Slovenian' },
  { code: 'es', label: 'Spanish' },
  { code: 'sv', label: 'Swedish' },
  { code: 'tr', label: 'Turkish' },
  { code: 'uk', label: 'Ukrainian' },
  { code: 'vi', label: 'Vietnamese' }
]

export default {
  components: {
    VueCal,
    Sshpre,
    HighlightMessage,
    TodoListItem,
    MainDemo,
    Examples,
    Api,
    ReleaseNotes
  },

  data: () => ({
    localesList
  }),

  computed: {
    nowFormatted () {
      return Date.prototype.format && (new Date()).format('YYYY{MM}DD')
    }
  }
}
</script>
