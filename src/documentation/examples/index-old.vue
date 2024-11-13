<template lang="pug">
p
  | Double click cell to go to a narrower view and click the title to go to a broader view.#[br]
  | By default the calendar theme is grey to match with most of web pages.#[br]
  | You can easily change the color theme (#[a(href="#css-notes") learn how]): try this
  w-button.ma1(
    :bg-color="example1theme === 'green' ? 'vuecal-blue' : 'primary'"
    color="white"
    @click="example1theme = example1theme === 'green' ? 'blue' : 'green'")
    | {{ example1theme === "green" ? 'blue theme' : 'green theme' }}
.example.my2.mxa(style="height: 450px")
  vue-cal(:class="`vuecal--${example1theme}-theme`" :time="false" hide-weekends :dark="store.darkMode")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal :time="false" hide-weekends /&gt;
alert For all the options details, refer to the #[a(href="#api") API] section.

//- Example.
title-link(h4 anchor="ex--small-cal") # Small calendar, no time, hidden view selector &amp; custom arrows
p.
  Extra-small, no timeline, hidden view selector &amp; custom arrows (using the reserved slots #[span.code arrow-prev] &amp; #[span.code arrow-next]).#[br]
  With a hidden view selector, you can still navigate between the different views: double click cell to go to a narrower view, click title to go to a broader view.
.example.my2.mxa(style="width: 250px;height: 260px")
  vue-cal(
    :dark="store.darkMode"
    :views-bar="false"
    :time="false"
    view="month"
    xs)
    template(#arrow-prev)
      w-icon mdi mdi-arrow-left
    template(#arrow-next)
      w-icon mdi mdi-arrow-right
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    :views-bar="false"
    :time="false"
    view="month"
    xs&gt;
    &lt;template #arrow-prev&gt;
      &lt;i class="icon mdi mdi-arrow-left"&gt;&lt;/i&gt;
    &lt;/template&gt;
    &lt;template #arrow-next&gt;
      &lt;i class="icon mdi mdi-arrow-right"&gt;&lt;/i&gt;
    &lt;/template&gt;
  &lt;/vue-cal&gt;

alert For all the options details, refer to the #[a(href="#api") API] section.

//- Example.
title-link(h4 anchor="ex--calendar-themes") # Calendar themes - Rounded cells &amp; date picker
p.
  You can easily change the calendar color theme or use the rounded-cells theme
  by applying the corresponding CSS class on the #[span.code &lt;vuecal&gt;] tag.#[br]
  E.g. #[span.code vuecal--rounded-theme], #[span.code vuecal--green-theme], #[span.code vuecal--blue-theme].#[br]
  Read more about calendar themes in the #[a(href="#css-notes") CSS Notes] section.
p.
  Because Vue Cal has the potential out of the box, you can also use it as a date picker.#[br]
  Apply the css class #[span.code vuecal--date-picker] to have the date picker layout below.#[br]
  you can also disable the transitions to have a faster effect.

.w-flex.maa.justify-center.wrap
  .example.ma2(style="width: 270px;height: 300px")
    vue-cal.vuecal--rounded-theme(
      xs
      :views-bar="false"
      :time="false"
      view="month"
      :disable-views="['week']"
      :dark="store.darkMode")
  .example.ma2(style="width: 270px;height: 300px")
    vue-cal.vuecal--rounded-theme(
      :dark="store.darkMode"
      xs
      :views-bar="false"
      :time="false"
      view="month"
      :disable-views="['week']")
  .w-flex.column.justify-center.no-grow.pl5
    .example.ma2(style="width: 210px;height: 230px")
      vue-cal.vuecal--date-picker(
        xs
        :views-bar="false"
        :time="false"
        :transitions="false"
        view="month"
        :disable-views="['week']")
    .grey.text-center
      w-icon.pr1(style="padding-bottom: 2px") mdi mdi-arrow-up
      | Date picker layout, no transition
.w-flex.wrap
  ssh-pre.grow.mr2(language="html-vue" label="Vue Template - Rounded Cell" :dark="store.darkMode").
    &lt;vue-cal
        class="vuecal--rounded-theme vuecal--green-theme"
        xs
        :views-bar="false"
        :time="false"
        view="month"
        :disable-views="['week']"
        style="width: 270px;height: 300px"&gt;
    &lt;/vue-cal&gt;
  ssh-pre.grow(language="html-vue" label="Vue Template - Date Picker" :dark="store.darkMode").
    &lt;vue-cal
        class="vuecal--date-picker"
        xs
        :views-bar="false"
        :time="false"
        :transitions="false"
        view="month"
        :disable-views="['week']"
        style="width: 210px;height: 230px"&gt;
    &lt;/vue-cal&gt;
alert Refer to the #[a(href="#api") API] section to read more about all the options.

//- Example.
title-link(h4 anchor="ex--disable-views") # Disable views, active view
p.
  To hide views, you can use the #[span.code disable-views] option and provide an array of views
  to disable.#[br]
  The views are not only hidden from the menu bar, they are totally disabled,
  even when navigating from cells and title bar clicks.#[br]#[br]
  By default all the views are visible and the default active view is the #[span.code week] view.
.example.mxa.mt2(style="height: 350px")
  vue-cal.ex--disable-views(
    :dark="store.darkMode"
    :time="false"
    view="month"
    :disable-views="['years', 'year', 'week']")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal :time="false" view="month" :disable-views="['years', 'year', 'week']" /&gt;

//- Example.
title-link(h4 anchor="ex--min-max-dates") # Minimum / maximum dates &amp; single click to navigate
p.
  With the options #[span.code minDate] &amp; #[span.code maxDate], you can set a
  time range of selectable cells. All the cells before and after are still visible but
  will be disabled and not selectable.#[br]
  You can still navigate through them with arrows.#[br]
  In this example, the minimum date is set to 10 days behind and the maximum date to
  10 days ahead.
alert.my4(tip)
  strong Notes
  ul
    li the min and max options accept a formatted string or plain Javascript Date object.
    li.
      2 different CSS class are available on out of range cells: #[span.code .before-min]
      &amp; #[span.code .after-max].
.example.my2.mxa(style="width: 250px;height: 260px")
  vue-cal.ex--min-max-dates(
    :dark="store.darkMode"
    xs
    :views-bar="false"
    click-to-navigate
    :time="false"
    view="month"
    :min-date="minDate"
    :max-date="maxDate")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    xs
    :views-bar="false"
    click-to-navigate
    :time="false"
    view="month"
    :min-date="minDate"
    :max-date="maxDate"&gt;
  &lt;/vue-cal&gt;

ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
  // Using Vue Cal Date Prototypes (activated by default).
  computed: {
    minDate () {
      return new Date().subtractDays(10)
    },
    maxDate () {
      return new Date().addDays(10)
    }
  }

ssh-pre(language="css" label="CSS" :dark="store.darkMode").
  .vuecal__cell--disabled {text-decoration: line-through;}
  .vuecal__cell--before-min {color: #b6d6c7;}
  .vuecal__cell--after-max {color: #008b8b;}

alert For all the options details, refer to the #[a(href="#api") API] section.

//- Example.
title-link(h4 anchor="ex--disable-days") # Disable days
p.
  You can use the #[span.code disable-days] option to provide an array of formatted dates
  (e.g. #[span.code 2020-09-18]) to disable.#[br]
.example.my2.mxa(style="width: 250px;height: 260px")
  vue-cal.ex--disable-days(
    :dark="store.darkMode"
    xs
    :views-bar="false"
    click-to-navigate
    :time="false"
    view="month"
    :disable-views="['week']"
    :disable-days="[new Date().subtractDays(2).format(), new Date().format(), new Date().addDays(2).format()]")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;!-- Using Vue Cal Date Prototypes (activated by default): subtractDays, format, addDays --&gt;
  &lt;vue-cal
    xs
    :views-bar="false"
    click-to-navigate
    :time="false"
    view="month"
    :disable-views="['week']"
    :disable-days="[
      new Date().subtractDays(2).format(),
      new Date().format(),
      new Date().addDays(2).format()
    ]"
  &gt;&lt;/vue-cal&gt;

ssh-pre(language="css" label="CSS" :dark="store.darkMode").
  .vuecal__cell--disabled {text-decoration: line-through;color: #bbb;}

alert For all the options details, refer to the #[a(href="#api") API] section.

//- Example.
title-link(h4 anchor="ex--hiding-particular-week-days") # Hide particular week days &amp; show the weeks numbers
p.
  If you want to hide particular days of the week, you can use the #[span.code hide-weekdays]
  option.#[br]It accepts an array of days to hide (day numbers),
  #[strong starting at #[span.code 1] for Monday, to #[span.code 7] for Sunday].#[br]
  This option will apply on #[span.code month] &amp; #[span.code week] views.#[br]#[br]
  If you want to hide Saturday and Sunday you can put `#[span.code 6, 7]` in the array or use
  #[span.code hide-weekends] in supplement of #[span.code hide-weekdays].#[br]#[br]
  You can show the weeks numbers column on the #[span.code month] view with the #[span.code show-week-numbers] option.#[br]
  You can also provide a custom renderer to the weeks numbers cells through the #[span.code week-number-cell] slot.

alert.
  Refer to the #[a(href="#api") API] section to read more about all the options.#[br]

.example.mxa(style="height: 350px")
  vue-cal(
    :dark="store.darkMode"
    :time="false"
    show-week-numbers
    :hide-weekdays="[2, 3, 5]"
    :disable-views="['years', 'year']")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal :time="false"
            show-week-numbers
            :hide-weekdays="[2, 3, 5]"
            :disable-views="['years', 'year']"&gt;
  &lt;/vue-cal&gt;








//- Example.
h3
  a(href="#ex--internationalization")
    w-icon.mr2 mdi mdi-translate
    | Internationalization (i18n)
.w-flex.align-end.wrap
  h4.title2.mt6
    a(href="#ex--internationalization") # Internationalization
  .spacer
  .w-flex.no-grow.align-center.wrap
    w-icon.mr2(color="primary") mdi mdi-translate
    span.mr2 Current language:
    w-select.pa0.mla.no-grow(
      v-model="locale"
      :items="locales"
      item-value-key="code"
      style="width: 200px")
      template(#selection="{ item }")
        span.mr2 {{ item.label }}
        w-tag.code.ma0(bg-color="grey-light5" round) {{ item.code }}
a#ex--internationalization(name="ex--internationalization")
p.
  Let you translate the calendar texts into your own language (#[span.code locale]).#[br]
  Refer to the #[span.code locale] option in the #[a(href="#api") API] section to know more or if you want to provide a translation.#[br]
  Try it in Codepen: #[a(href="https://codepen.io/antoniandre/pen/dxXvwv" target="_blank") Vue Cal - Internationalization].
.example.my2.mxa(style="width: 500px;height: 340px;max-width: 100%")
  vue-cal(
    :dark="store.darkMode"
    :time="false"
    small
    view="year"
    :locale="locale"
    @ready="overrideDateTexts")
ssh-pre(language="html-vue" label="Vue Template" reactive :dark="store.darkMode").
  &lt;vue-cal :time="false" small view="year" locale="{{ locale }}" /&gt;

alert.
  For Vue Cal versions that don't support ESM (prior 4.3.4 on Vue 3 or 3.11.0 on Vue 2),
  the locale file must be loaded separately: #[br]#[span.code import 'vue-cal/dist/i18n/{{ locale }}.js'].

h4 Alternative
p.
  If you need full control on the texts, you can alternatively provide an object containing all the
  texts (start from the locale JSON file matching your language).#[br]
  Keep in mind this is not the recommended way: texts may be added / modified / removed in the library
  and your provided custom texts may not work anymore.#[br]
  Always prefer the standard locales!








h3
  a(href="#ex--timeline")
    w-icon.mr2 mdi mdi-clock-outline
    | Timeline, business hours &amp; Today

//- Example.
title-link(h4 anchor="ex--timeline") # Timeline
p.
  Timelines are only visible on #[span.code week] and #[span.code day] views.#[br]
  This example has a set time range from #[code 08:00] to #[code 19:00], time step of #[code 30] minutes (1 hour by default),
  24-hour format, and hidden weekends.
.example.my2.mxa(style="height: 450px")
  vue-cal(
    :dark="store.darkMode"
    :time-from="8 * 60"
    :time-to="19 * 60"
    :time-step="30"
    hide-weekends)
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;!-- Time-start time-end &amp; time-step are expected in minutes. --&gt;
  &lt;vue-cal
    :time-from="8 * 60"
    :time-to="19 * 60"
    :time-step="30"
    hide-weekends&gt;
  &lt;/vue-cal&gt;
alert For all the options details, refer to the #[a(href="#api") API] section.

//- Example.
title-link(h4 anchor="ex--show-time-in-cells") # Showing time labels in cells
p.
  You can choose to display the time labels in every cells by enabling the
  #[span.code showTimeInCells] option.
.example.my2.mxa(style="height: 450px")
  vue-cal(
    :dark="store.darkMode"
    :time-from="8 * 60"
    :time-to="19 * 60"
    :time-step="30"
    show-time-in-cells
    hide-weekends)
    template(#no-event) &nbsp;
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    :time-from="8 * 60"
    :time-to="19 * 60"
    :time-step="30"
    hide-weekends
    show-time-in-cells&gt;
  &lt;/vue-cal&gt;
alert For all the options details, refer to the #[a(href="#api") API] section.

//- Example.
title-link(h4 anchor="ex--special-hours") # Special hours (or business hours)
p.
  The special hours are visible on #[span.code week] and #[span.code day] views and allow
  you to highlight a particular time range on each day of the week individually.#[br]
alert.
  Refer to the #[a(href="#api") API] section to read more about the
  #[span.code special-hours] option.
.example.my2.mxa(style="height: 450px")
  vue-cal.ex--special-hours(
    :dark="store.darkMode"
    :time-from="8 * 60"
    :time-to="20 * 60"
    :disable-views="['years', 'year', 'month']"
    :special-hours="specialHours")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    :disable-views="['years', 'year', 'month']"
    :time-from="8 * 60"
    :time-to="20 * 60"
    :special-hours="specialHours" /&gt;
ssh-pre(language="js" label="JavaScript" :dark="store.darkMode").
  // `from` and `to` are expected in minutes.
  const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' }

  // In your component's data, special hours from Monday to Friday.
  // Note that you can provide an array of multiple blocks for the same day.
  specialHours: {
    mon: dailyHours,
    tue: dailyHours,
    wed: [
      { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
      { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
    ],
    thu: dailyHours,
    fri: dailyHours
  }
ssh-pre(language="css" label="CSS" :dark="store.darkMode").
  .business-hours {
    background-color: rgba(255, 255, 0, 0.15);
    border: solid rgba(255, 210, 0, 0.3);
    border-width: 2px 0;
  }

p With the same principle, you could also build a lot more complex layout such as the following one.
.example.my2.mxa(style="height: 550px")
  vue-cal.ex--doctor-hours(
    :dark="store.darkMode"
    :disable-views="['years', 'year', 'month']"
    :time-from="7 * 60"
    :time-to="20 * 60"
    :special-hours="specialDoctorHours")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    :disable-views="['years', 'year', 'month']"
    :time-from="7 * 60"
    :time-to="20 * 60"
    :special-hours="specialHours" /&gt;
ssh-pre(language="js" label="JavaScript" :dark="store.darkMode").
  // In your component's data, special hours from Monday to Sunday (1 to 7).
  // Note that you can provide an array of multiple blocks for the same day.
  specialHours: {
    mon: {
      from: 8 * 60,
      to: 17 * 60,
      class: 'doctor-1',
      label: '<strong>Doctor 1</strong><br><em>Full day shift</em>'
    },
    tue: {
      from: 9 * 60,
      to: 18 * 60,
      class: 'doctor-2',
      label: '<strong>Doctor 2</strong><br><em>Full day shift</em>'
    },
    wed: [
      {
        from: 8 * 60,
        to: 12 * 60,
        class: 'doctor-1',
        label: '<strong>Doctor 1</strong><br><em>Morning shift</em>'
      },
      {
        from: 14 * 60,
        to: 19 * 60,
        class: 'doctor-3',
        label: '<strong>Doctor 3</strong><br><em>Afternoon shift</em>'
      }
    ],
    thu: {
      from: 8 * 60,
      to: 17 * 60,
      class: 'doctor-1',
      label: '<strong>Doctor 1</strong><br><em>Full day shift</em>'
    },
    fri: {
      from: 9 * 60,
      to: 18 * 60,
      class: 'doctor-3',
      label: '<strong>Doctor 3</strong><br><em>Full day shift</em>'
    },
    sat: {
      from: 9 * 60,
      to: 18 * 60,
      class: 'doctor-2',
      label: '<strong>Doctor 2</strong><br><em>Full day shift</em>'
    },
    sun: {
      from: 7 * 60,
      to: 20 * 60,
      class: 'closed',
      label: '<strong>Closed</strong>'
    }
  }
ssh-pre(language="css" label="CSS" :dark="store.darkMode").
  .vuecal__special-hours {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;

    em {font-size: 0.9em;color: #999;}
  }

  .doctor-1 {background-color: #f0fff1;color: #81d58b;}
  .doctor-2 {background-color: #f0f6ff;color: #689bee;}
  .doctor-3 {background-color: #fcf0ff;color: #d168ee;}
  .closed {
    background:
      #fff7f0
      repeating-linear-gradient(
        -45deg,
        rgba(255, 162, 87, 0.25),
        rgba(255, 162, 87, 0.25) 5px,
        rgba(255, 255, 255, 0) 5px,
        rgba(255, 255, 255, 0) 15px
      );
    color: #f6984c;
  }

//- Example.
title-link(h4 anchor="ex--adding-a-today-button") # Adding a Today button
p.
  By default the selected date is today. But if you get lost in time travel, you can add
  a Today button to select Today's date with the option #[span.code today-button].#[br]
  Like navigation arrows, there is also a slot to customize as you want.#[br]
  below are the default Today button on the left and a custom one with icon and tooltip on the right.
p
  | If you are not satisfied with the position of this button, you can also place it
  | outside of Vue Cal like so:
  w-button.ma1.today-button(color="primary" outline round @click="selectedDate = new Date()") Another Today Button
  | #[br]You might want to change view as well when going to Today's date, here is an example how:
  a.mx1(href="https://codepen.io/antoniandre/pen/yrREOL?editors=1010" target="_blank") Today Button
  w-icon(color="green lighten-2") mdi mdi-codepen
.w-flex.justify-center.wrap
  .example.my2.mr3(style="max-width: 280px;height: 250px")
    vue-cal.ex--adding-a-today-button(
      :dark="store.darkMode"
      ref="vuecal2"
      xs
      hide-weekends
      :disable-views="['years']"
      :time="false"
      today-button
      view="month"
      :selected-date="selectedDate || new Date(new Date().getFullYear(), 11, 31)")
  .example.my2(style="max-width: 280px;height: 250px")
    vue-cal.ex--adding-a-today-button(
      :dark="store.darkMode"
      ref="vuecal2"
      xs
      hide-weekends
      :disable-views="['years']"
      :time="false"
      today-button
      view="month"
      :selected-date="selectedDate || new Date(new Date().getFullYear(), 11, 31)")
      template(#today-button)
        w-tooltip(bottom)
          template(#activator="{ on }")
            w-button(x-Programmatically fab text v-on="on")
              w-icon(color="primary" size="20") mdi mdi-map-marker-outline
          span Go to Today's date
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    ref="vuecal"
    xs
    hide-weekends
    :disable-views="['years']"
    :time="false"
    today-button
    view="month"
    :selected-date="selectedDate"&gt;
    &lt;!-- Optional slot for the custom button. --&gt;
    &lt;template #today-button&gt;
      &lt;!-- Using Vuetify (but we prefer Wave UI 🤘) --&gt;
      &lt;v-tooltip&gt;
        &lt;template #activator="{ on }"&gt;
          &lt;v-btn v-on="on"&gt;
            &lt;v-icon&gt;my_location&lt;/v-icon&gt;
          &lt;/v-btn&gt;
          &lt;span&gt;Go to Today's date&lt;/span&gt;
        &lt;/template&gt;
      &lt;/v-tooltip&gt;
    &lt;/template&gt;
  &lt;/vue-cal&gt;

  &lt;button @click="selectedDate = new Date()"&gt;ANOTHER TODAY BUTTON&lt;/button&gt;
ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
  data: () => ({
    // Default to next new year eve.
    selectedDate: new Date(new Date().getFullYear(), 11, 31)
  })
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useAppStore } from '@/store'
import EnUs from '@/vue-cal/i18n/en-us.json'
import { VueCal, addDatePrototypes, useLocale, stringToDate } from '@/vue-cal'
import ViewExamples from './view.vue'

useLocale(EnUs)
addDatePrototypes()

const store = useAppStore()
const locales = inject('locales')
const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' }

const events = [
  {
    start: '2018-10-30 10:30',
    end: '2018-10-30 11:30',
    title: 'Doctor appointment',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 1
  },
  {
    start: '2018-11-16 10:30',
    end: '2018-11-16 11:30',
    title: 'Doctor appointment',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 1
  },
  {
    start: '2018-11-19 10:35',
    end: '2018-11-19 11:30',
    title: 'Doctor appointment',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 1
  },
  {
    start: '2018-11-19 18:30',
    end: '2018-11-19 19:15',
    title: 'Dentist appointment',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 2
  },
  {
    start: '2018-11-20 18:30',
    end: '2018-11-20 20:30',
    title: 'Crossfit',
    content: '<i class="w-icon mdi mdi-dumbbell"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    start: '2018-11-21 11:00',
    end: '2018-11-21 13:00',
    title: 'Brunch with Jane',
    content: '<i class="w-icon mdi mdi-coffee-outline"></i>',
    class: 'leisure',
    schedule: 1,
    background: false
  },
  {
    start: '2018-11-21 19:30',
    end: '2018-11-21 23:00',
    title: 'Swimming lesson',
    content: '<i class="w-icon mdi mdi-pool"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    start: '2018-11-23 12:30',
    end: '2018-11-23 13:00',
    title: 'Macca\'s with Mark',
    content: '<i class="w-icon mdi mdi-food"></i>',
    class: 'leisure',
    schedule: 2
  },
  {
    start: '2018-11-23 21:00',
    end: '2018-11-23 23:30',
    title: 'Movie time',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure',
    schedule: 1
  },
  {
    start: '2018-11-30 21:00',
    end: '2018-11-30 23:30',
    title: 'Another movie tonight',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure',
    schedule: 1
  }
]

const vuecalEl = ref(null)
const locale = ref('zh-cn')
const schedulesExample = ref({
  minCellWidth: 400,
  minScheduleWidth: 0,
  stickyScheduleLabels: false,
  schedules: [
    { id: 1, class: 'mom', label: 'Mom' },
    { id: 2, class: 'dad', label: 'Dad', hide: false },
    { id: 3, class: 'kid1', label: 'Kid 1' },
    { id: 4, class: 'kid2', label: 'Kid 2' },
    { id: 5, class: 'kid3', label: 'Kid 3' }
  ]
})
const example1theme = ref('green')
const minEventWidth = ref(0)
const timeCellHeight = ref(26)
const indicatorStyle = ref('count')
const indicatorStyleOptions = ref([
  { label: 'count (default)', value: 'count' },
  { label: 'dash', value: 'dash' },
  { label: 'dot', value: 'dot' },
  { label: 'cell background', value: 'cell' }
])
const now = ref(new Date())
const logs = ref([])
const showDialog = ref(false)
const showEventCreationDialog = ref(false)
const showAllDayEvents = ref(0)
const shortEventsOnMonthView = ref(false)
const selectedEvent = ref({})
const eventsCssClasses = ref([{ label: 'leisure' }, { label: 'sport' }, { label: 'health' }])
const selectedDate = ref(null)
const activeView = ref('week')
const logMouseEvents = ref(false)
const snapToTime15 = ref(false)
const dragToCreateThreshold = ref(15)
const dragToCreateThresholdOpts = ref([{ label: '0' }, { label: '15' }])
const customDayScheduleLabels = [
  { label: 'John', color: 'blue', class: 'schedule1' },
  { label: 'Tom', color: 'green', class: 'schedule2' },
  { label: 'Kate', color: 'orange', class: 'schedule3' },
  { label: 'Jess', color: 'red', class: 'schedule4' }
]
const editableEvents = [
  ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
  {
    start: '2018-11-20 14:00',
    end: '2018-11-20 17:30',
    title: 'Boring event',
    content: '<i class="w-icon mdi mdi-cancel"></i><br>I am not draggable, not resizable and not deletable.',
    class: 'blue-event',
    deletable: false,
    resizable: false,
    draggable: false
  }
]
const overlappingEvents = [
  ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
  {
    start: '2018-11-21 14:00',
    end: '2018-11-21 22:00',
    title: 'A big thing',
    content: '<i class="w-icon mdi mdi-emoticon-outline"></i>',
    class: 'health'
  },
  {
    start: '2018-11-21 16:00',
    end: '2018-11-21 19:00',
    title: 'Another thing',
    content: '<i class="w-icon mdi mdi-thumb-up-outline"></i>',
    class: 'blue-event'
  },
  {
    start: '2018-11-23 21:00',
    end: '2018-11-23 23:30',
    title: 'Eat pop corns',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure'
  },
  {
    start: '2018-11-23 21:00',
    end: '2018-11-23 23:30',
    title: 'Enjoy the movie',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure'
  }
]
const eventsCopy = [
  ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
  {
    start: '2018-11-21 12:00',
    end: '2018-11-21 12:30',
    title: 'Recall Dave',
    content: '<i class="w-icon mdi mdi-coffee-outline"></i>',
    class: 'leisure'
  },
  {
    start: '2018-11-23 21:00',
    end: '2018-11-23 23:30',
    title: 'Eat pop corns',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure'
  },
  {
    start: '2018-11-23 21:00',
    end: '2018-11-23 23:30',
    title: 'Enjoy the movie',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure'
  }
]
const eventsCopy2 = [
  ...events.map(e => ({ ...e })) // Clone when reusing, so events are independent.
]
const eventsCopy3 = [
  ...events.map(e => ({ ...e })) // Clone when reusing, so events are independent.
]
const multipleDayEvents = [
  {
    start: '2018-11-16 10:00',
    end: '2018-11-20 12:37',
    title: 'Running Marathon',
    content: '<i class="w-icon mdi mdi-run"></i>',
    class: 'sport'
  },
  {
    start: '2018-11-20 10:00',
    end: '2018-11-20 10:25',
    title: 'Drink water!',
    content: '<i class="w-icon mdi mdi-glass-cocktail"></i>',
    class: 'health drink-water'
  },
  {
    start: '2018-11-21 19:00',
    end: '2018-11-23 11:30',
    title: 'Trip to India',
    content: '<i class="w-icon mdi mdi-airplane"></i>',
    class: 'leisure'
  }
]
const recurringEvents = []
const allDayEvents = [
  {
    start: '2019-02-12',
    end: '2019-02-12',
    title: 'Day off!',
    content: '<i class="w-icon mdi mdi-umbrella-beach-outline"></i>',
    class: 'yellow-event',
    allDay: true
  },
  {
    start: '2019-02-14',
    end: '2019-02-14',
    title: 'Valentine\'s day',
    content: '<i class="w-icon mdi mdi-heart-outline"></i>',
    class: 'pink-event',
    allDay: true
  },
  {
    start: '2019-02-14',
    end: '2019-02-14',
    title: 'Need to go shopping',
    content: '<i class="w-icon mdi mdi-cart-outline"></i>',
    class: 'leisure',
    allDay: true
  },
  {
    start: '2019-02-11 10:35',
    end: '2019-02-11 11:30',
    title: 'Doctor appointment',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 1
  },
  {
    start: '2019-02-11 18:30',
    end: '2019-02-11 19:15',
    title: 'Dentist appointment',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 2
  },
  {
    start: '2019-02-12 18:30',
    end: '2019-02-12 20:30',
    title: 'Crossfit',
    content: '<i class="w-icon mdi mdi-dumbbell"></i>',
    class: 'sport',
    schedule: 1
  },
  {
    start: '2019-02-13 11:00',
    end: '2019-02-13 13:00',
    title: 'Brunch with Jane',
    content: '<i class="w-icon mdi mdi-coffee-outline"></i>',
    class: 'leisure',
    schedule: 1
  },
  {
    start: '2019-02-13 19:30',
    end: '2019-02-13 23:00',
    title: 'Swimming lesson',
    content: '<i class="w-icon mdi mdi-pool"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    start: '2019-02-15 12:30',
    end: '2019-02-15 13:00',
    title: 'Macca\'s with Mark',
    content: '<i class="w-icon mdi mdi-food"></i>',
    class: 'leisure',
    schedule: 2
  },
  {
    start: '2019-02-15 21:00',
    end: '2019-02-15 23:30',
    title: 'Movie time',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure',
    schedule: 1
  }
]
const scheduleEvents = [
  ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
  {
    start: '2018-11-21 12:00',
    end: '2018-11-21 12:30',
    title: 'Recall Dave',
    content: '<i class="w-icon mdi mdi-coffee-outline"></i>',
    class: 'leisure',
    schedule: 1
  },
  {
    start: '2018-11-21 20:00',
    end: '2018-11-21 22:00',
    title: 'Salsa',
    content: '<i class="w-icon mdi mdi-walk"></i>',
    class: 'sport',
    schedule: 1
  },
  {
    start: '2018-11-23 21:00',
    end: '2018-11-23 23:30',
    title: 'Movie time',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure',
    schedule: 2
  }
]
const backgroundEvents = [
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
]
const timelessEvents = [
  {
    start: '2018-11-21',
    end: '2018-11-21',
    title: 'Need to go shopping',
    content: '<i class="w-icon mdi mdi-cart-outline"></i>',
    class: 'leisure'
  },
  {
    start: '2018-11-21',
    end: '2018-11-21',
    title: 'Golf with John',
    content: '<i class="w-icon mdi mdi-golf"></i>',
    class: 'sport'
  },
  {
    start: '2018-11-22',
    end: '2018-11-22',
    title: 'Dad\'s birthday!',
    content: '<i class="w-icon mdi mdi-cake-variant-outline"></i>',
    class: 'sport'
  },
  {
    start: '2018-11-23',
    end: '2018-11-23',
    title: 'Black Friday',
    content: '<i class="w-icon mdi mdi-cart-outline"></i>',
    class: 'leisure'
  }
]
const eventsToDrag = [
  {
    start: '2018-11-21 14:00',
    end: '2018-11-21 16:30',
    title: 'Surgery',
    content: '<i class="w-icon mdi silverware-fork-knife"></i>',
    class: 'health',
    schedule: 2
  }
]
const eventsToPop = [
  {
    start: '2018-11-20 14:00',
    end: '2018-11-20 18:00',
    title: 'Need to go shopping',
    icon: 'mdi mdi-cart-outline',
    content: 'Click to see my shopping list',
    contentFull: 'My shopping list is rather long:<br><ul><li>Avocados</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>',
    class: 'leisure'
  },
  {
    start: '2018-11-22 10:00',
    end: '2018-11-22 15:00',
    title: 'Golf with John',
    icon: 'mdi mdi-golf',
    content: 'Do I need to tell how many holes?',
    contentFull: 'Okay.<br>It will be a 18 hole golf course.',
    class: 'sport'
  }
]
const draggables = ref([
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
])
const deleteEventFunction = ref(null)
const deleteDragEventFunction = ref(null)
const specialDoctorHours = {
  mon: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Full day shift</em>' },
  tue: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><br><em>Full day shift</em>' },
  wed: [
    { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Morning shift</em>' },
    { from: 14 * 60, to: 19 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><br><em>Afternoon shift</em>' }
  ],
  thu: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Full day shift</em>' },
  fri: { from: 9 * 60, to: 18 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><br><em>Full day shift</em>' },
  sat: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><br><em>Full day shift</em>' },
  sun: { from: 7 * 60, to: 20 * 60, class: 'closed', label: '<strong>Closed</strong>' }
}

// Computed.
const reversedLogs = computed(() => logs.value.slice(0).reverse())
const todayFormattedNotWeekend = computed(() => {
  let today = new Date(new Date().setHours(13, 15))
  // If today is on weekend subtract 2 days for the event to always be visible with hidden weekends.
  if (!today.getDay() || today.getDay() > 5) today = today.subtractDays(2)
  return today.format('YYYY-MM-DD HH:mm')
})
const minDate = computed(() => new Date().subtractDays(10))
const maxDate = computed(() => new Date().addDays(10))
const specialHours = computed(() => ({
  mon: dailyHours,
  tue: dailyHours,
  wed: [
    { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
    { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
  ],
  thu: dailyHours,
  fri: dailyHours
}))

// Methods.
const logEvents = (emittedEventName, params) => {
  if (!logMouseEvents && emittedEventName.includes('event-mouse')) return

  logs.value.push({ name: emittedEventName, args: JSON.stringify(params) })
}
const clearEventsLog = () => (logs.value = [])

const customEventsCount = events => events ? events.filter(e => e.class === 'leisure').length : 0

const onEventClick = (event, e) => {
  selectedEvent.value = event
  showDialog.value = true
  e.stopPropagation()
}
const cancelEventCreation = () => {
  closeCreationDialog()
  (deleteEventFunction.value || deleteDragEventFunction.value)()
}
const closeCreationDialog = () => {
  showEventCreationDialog.value = false
  selectedEvent.value = {}
}
const onEventCreate = (event, deleteEventFunction) => {
  selectedEvent.value = event
  showEventCreationDialog.value = true
  deleteEventFunction.value = deleteEventFunction

  return event
}
const onEventDragStartCreate = (event, deleteEventFunction) => {
  selectedEvent.value = event
  deleteEventFunction.value = deleteEventFunction

  return event
}
const customEventCreation = () => {
  let today = new Date(new Date().setHours(13, 15))
  // If today is on weekend subtract 2 days for the event to always be visible with hidden weekends.
  if (!today.getDay() || today.getDay() > 5) today = today.subtractDays(2)
  const dateTime = prompt('Create event on (YYYY-MM-DD HH:mm)', today.format('YYYY-MM-DD HH:mm'))
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateTime)) {
    vuecalEl.value.createEvent(dateTime, 120, { title: 'New Event', content: 'yay! 🎉', class: 'blue-event' })
  }
  else if (dateTime) alert('Wrong date format.')
}
const overrideDateTexts = () => {
  // In Vue Cal documentation Chinese texts are loaded last.
  // Override Date texts with english for prototype formatting functions.
  setTimeout(vuecalEl.value.updateDateTexts, 3000)
}
const onEventDragStart = (e, draggable) => {
  e.dataTransfer.setData('event', JSON.stringify(draggable))
  e.dataTransfer.setData('cursor-grab-at', e.offsetY)
}
const onEventDrop = ({ event, originalEvent, external }) => {
  if (external) {
    const extEventToDeletePos = draggables.value.findIndex(item => item.id === originalEvent.id)
    if (extEventToDeletePos > -1) draggables.value.splice(extEventToDeletePos, 1)
  }
}
</script>

<style lang="scss">
@use '@/scss/examples.scss';

.main--examples {
  // Yellow theme.
  .vuecal--yellow-theme {
    .vuecal__menu, .vuecal__cell-events-count {background-color: rgba(255, 179, 0, 0.8);}
    .vuecal__menu {color: #fff;}
    .vuecal__title-bar {background-color: rgba(255, 236, 202, 0.5);}
    .vuecal__cell--today, .vuecal__cell--current {background-color: rgba(240, 240, 255, 0.4);}
    &:not(.vuecal--day-view) .vuecal__cell--selected {background-color: rgba(255, 236, 202, 0.4);}
    .vuecal__cell--selected:before {border-color: rgba(235, 216, 182, 0.5);}
  }

  .vuecal-blue--bg {background-color: rgba(66, 163, 185, 0.8);}
}
</style>
