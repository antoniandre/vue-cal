<template lang="pug">
alert.mb2
  | If you're not familiar with slots and scoped slots, first read about it in the
  a.ml1(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank")
    strong official Vue documentation
    w-icon.primary.ml1 mdi mdi-open-in-new
  | .

alert
  | Here is the list of available slots:
  ul
    li #[span.code title]
    li #[span.code title.day]
    li #[span.code title.days]
    li #[span.code title.week]
    li #[span.code title.month]
    li #[span.code title.year]
    li #[span.code title.years]
    li #[span.code previous-button]
    li #[span.code next-button]
    li #[span.code today-button]
    li #[span.code weekday-heading]
    li #[span.code schedule-heading]
    li #[span.code time-cell]
    li #[span.code week-number-cell]
    li #[span.code cell]
    li #[span.code cell-content]
    li #[span.code cell-events]
    li #[span.code event]
    li #[span.code event.all-day]
    li #[span.code event.day]
    li #[span.code event.days]
    li #[span.code event.week]
    li #[span.code event.month]
    li #[span.code event.year]
    li #[span.code event.years]
    li #[span.code events-count]

//- Example.
example(ref="exSlotsExampleEl" title="Simple Slots" anchor="slots")
  template(#desc)
    p.
      Vue Cal is designed to be as flexible and customizable as possible, offering a variety of slots to
      help you go beyond the standard features and tailor it to your needs.#[br]
      This example highlights the simplest and most commonly used slots.

    .w-flex.column.gap1.mt2
      w-switch(v-model="exSlots.title" :disabled="exSlots.header || exSlots.diy") Custom title via #[code.mx1 title] slot
      w-switch(v-model="exSlots.prevNextButtons" :disabled="exSlots.header || exSlots.diy") Custom arrows via #[code.mx1 previous-button] &amp; #[code.mx1 next-button] slots
      w-switch(v-model="exSlots.todayButton" :disabled="exSlots.header || exSlots.diy") Custom today button via #[code.mx1 today-button] slot
      w-switch(v-model="exSlots.weekdayHeading" :disabled="exSlots.header || exSlots.diy") Custom weekday labels via #[code.mx1 weekday-heading] slot
      w-switch(v-model="exSlots.header" :disabled="exSlots.diy") Custom header via #[code.mx1 header] slot
      w-switch(v-model="exSlots.timeCell" :disabled="exSlots.diy") time cell labels via #[code.mx1 time-cell] slot
      w-switch(v-model="exSlots.cellContent" :disabled="exSlots.diy") Custom cell content via #[code.mx1 cell-content] slot
      w-switch(v-model="exSlots.diy") DIY via #[code.mx1 diy] slot: you've got the power, build something nice!

  template(#code-html)
    | &lt;vue-cal :time-from="9 * 60" :time-to="14 * 60"&gt;
    template(v-if="exSlots.diy")
      |
      |
      |   &lt;template #diy="{ vuecal, view }"&gt;
      |     {{ '\{\{ view \}\}' }}<br><br>{{ '\{\{ vuecal \}\}' }}
      |   &lt;/template&gt;
    template(v-else)
      template(v-if="exSlots.header")
        |
        |
        |   &lt;template #header="{ view, availableViews }"&gt;
        |     &lt;i class="icon mdi mdi-chevron-left" @click="view.previous"&gt;&lt;/i&gt;
        |     &lt;div v-html="view.title"&gt;&lt;/div&gt;
        |     &lt;i class="icon mdi mdi-chevron-right" @click="view.next"&gt;&lt;/i&gt;
        |
        |     &lt;button
        |       v-for="(grid, viewId) in availableViews"
        |       @click="view = viewId"
        |       :class="{ active: view.id === viewId }"&gt;
        |       {{ '\{\{ viewId \}\}' }}
        |     &lt;/button&gt;
        |   &lt;/template&gt;
      template(v-else)

        template(v-if="exSlots.title")
          |
          |
          |   &lt;template #title="view"&gt;
          |     &lt;code v-html="view.title"&gt;&lt;/code&gt;
          |   &lt;/template&gt;
        template(v-else)

        template(v-if="exSlots.prevNextButtons")
          |
          |
          |   &lt;template #previous-button&gt;
          |     &lt;i class="icon mdi mdi-arrow-left"&gt;&lt;/i&gt;
          |   &lt;/template&gt;
          |
          |   &lt;template #next-button&gt;
          |     &lt;i class="icon mdi mdi-arrow-right"&gt;&lt;/i&gt;
          |   &lt;/template&gt;
        template(v-else)

        template(v-if="exSlots.todayButton")
          |
          |
          |   &lt;template #today-button&gt;
          |     &lt;!-- Using Wave UI --&gt;
          |     &lt;w-tooltip&gt;
          |       &lt;template #activator="{ on }"&gt;
          |         &lt;w-btn v-on="on" icon="mdi mdi-calendar-today"&gt;
          |         &lt;/w-btn&gt;
          |         &lt;span&gt;Go to Today's date&lt;/span&gt;
          |       &lt;/template&gt;
          |     &lt;/w-tooltip&gt;
          |   &lt;/template&gt;
        template(v-else)

        template(v-if="exSlots.weekdayHeading")
          |
          |
          |   &lt;template #weekday-heading="{ label, id }"&gt;
          |     &lt;strong&gt;{{ '\{\{ label \}\}' }}&lt;/strong&gt;
          |   &lt;/template&gt;
        template(v-else)

      template(v-if="exSlots.timeCell")
        |
        |
        |   &lt;template #time-cell="{ format24 }"&gt;
        |     &lt;strong&gt;{{ '\{\{ format24 \}\}' }}&lt;/strong&gt;
        |   &lt;/template&gt;
      template(v-else)

      template(v-if="exSlots.cellContent")
        |
        |
        |   &lt;template #cell-content&gt;
        |     &lt;i class="icon mdi mdi-party-popper"&gt;&lt;/i&gt;
        |   &lt;/template&gt;
      template(v-else)

    |
    | &lt;/vue-cal&gt;

  vue-cal.grow(
    v-model:view="exSlots.view"
    :time-from="9 * 60"
    :time-to="15 * 60"
    :dark="store.darkMode"
    style="height: 331px")
    template(#today-button="{ navigate, active }" v-if="exSlots.todayButton")
      w-tooltip(left)
        template(#activator="{ on }")
          w-button(
            v-on="{ ...on, click: navigate }"
            @click="navigate"
            :disabled="active"
            color="orange-light2"
            text
            icon="mdi mdi-calendar-today"
            :icon-props="{ size: '1.2rem' }")
        span Go to Today's date
    template(#header="{ view, availableViews }" v-if="exSlots.header")
      .w-flex.gap2.pa1.align-center(:class="store.darkMode ? 'orange-dark3--bg' : 'orange-light5--bg'")
        w-button(color="base-color" icon="wi-chevron-left" @click="view.previous")
        .base-color(v-html="view.title")
        w-button(color="base-color" icon="wi-chevron-right" @click="view.next")
        .w-flex.gap2.mla.no-grow
          w-button.text-upper(
            v-for="(grid, viewId) in availableViews"
            @click="exSlots.view = viewId"
            color="base-color"
            :outline="view.id === viewId"
            sm) {{ viewId }}
    template(#title="{ title }" v-if="exSlots.title")
      code.orange-light2(v-html="title")
    template(#weekday-heading="{ label, id }" v-if="exSlots.weekdayHeading")
      strong.orange-light2(v-html="label" :class="id")
    template(#previous-button v-if="exSlots.prevNextButtons")
      w-icon.orange-light2(md) mdi mdi-arrow-left
    template(#next-button v-if="exSlots.prevNextButtons")
      w-icon.orange-light2(md) mdi mdi-arrow-right
    template(#time-cell="{ format24 }" v-if="exSlots.timeCell")
      strong.orange-light2 {{ format24 }}
    template(#cell-content v-if="exSlots.cellContent")
      w-icon.orange-light2(lg) mdi mdi-party-popper
    template(#diy="{ vuecal }" v-if="exSlots.diy") {{ vuecal }}

//- Example.
example(title="Custom Title Per View" anchor="custom-title-per-view")
  template(#desc)
    p.
      If you need a custom title only on a specific view and want to keep it simple,
      you can define a custom title for that view by using the #[code.mx1="title.[view]"] slot where #[code.mx1="[view]"] is the view id.
    p.
      The view object is available through the slot-scope, and you can use the #[code.mx1 view.id] property to
      check the current view.

    .w-flex.gap2.my2.justify-end
      span.text-right Override title only on:
      w-radios(
        v-model="exCustomTitlePerView.view"
        :items="['day', 'days', 'week', 'month', 'year', 'years'].map(v => ({ label: v, value: v }))"
        inline)
      span view.

  template(#code-html).
    &lt;vue-cal&gt;
      &lt;template #title.{{ exCustomTitlePerView.view }}="view"&gt;
        {{ '\{\{ view.start.format("D MMMM YYYY") \}\}' }} ❤️
      &lt;/template&gt;
    &lt;/vue-cal&gt;

  vue-cal(:dark="store.darkMode" :view="exCustomTitlePerView.view")
    template(#[`title.${exCustomTitlePerView.view}`]="view") {{ view.start.format('D MMMM YYYY') }} ❤️

//- Example.
example(title="Custom Cells" anchor="custom-cells")
  template(#desc)
    .todo-tag.d-iflex.prod TO BE UPDATED SOON
    alert(tip).
      Using Vue.js scoped slots, you can override the calendar cells.#[br]
      If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
      #[a(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank") vuejs.org/guide/components/slots.htm #[w-icon(color="primary") mdi mdi-open-in-new]]

    p.mt6.mb2 Accessible payload through the #[span.code #cell-content] scoped slot:
    ul
      li #[span.code cell], object containing the cell date range and the cell events.
    p.
      In this example, only the cell number is clickable on month view.#[br]
      5 arguments are available through the scoped slot:#[br]
      #[span.code #cell-content="{ cell, view, schedule, events, goNarrower }"]
    ul
      li #[span.code cell], object containing the cell date.
        ssh-pre(language="js" :dark="store.darkMode").mt2.mb2.
          {
            content: {String}, // Pre-formatted cell content if any.
            start: {Date}, // JavaScript Date object.
            end: {Date}, // JavaScript Date object.
            formattedDate: {String}, // formatted start date. E.g. "2019-04-05".
            today: {Boolean}, // Whether the cell is today.
            broader: {Function}, // Function to navigate to broader view if possible.
            narrower: {Function}, // Function to navigate to narrower view if possible.
            broaderView: {String}, // String containing the broader view ID.
            narrowerView: {String}, // String containing the narrower view ID.
          }
      li #[span.code view], object containing the active view info.
        ssh-pre(language="js" :dark="store.darkMode").mt2.mb2.
          {
            id: {String}, // Current view, one of: years, year, month, week, day.
            start: {Date}, // JavaScript Date object.
            end: {Date}, // JavaScript Date object.
            selectedDate: {Date} // JavaScript Date object.
          }
      li #[span.code schedule], when schedules, object containing the current schedule info.
      li #[span.code events], array containing all the events of the current cell or schedule.
      li #[span.code goNarrower], function to navigate to narrower view if possible.
    alert.my3(info)
      | By default a cell is rendered as follows.#[br]
      | It is a good idea to reuse the same CSS classes as the different elements have associated styles:#[br]
      ssh-pre.mt3.mb1(language="html-vue" :dark="store.darkMode").
        &lt;div class="vuecal__flex vuecal__cell-content"&gt;
      ssh-pre.my2.ml5(language="html-vue" style="background-color: rgba(0, 177, 255, 0.08)" :dark="store.darkMode").
        Now this is the part you can customize:

        &lt;!-- Will be added if schedules are set --&gt;
        &lt;div class="vuecal__schedule" /&gt;
        &lt;!-- Will be added on years, year &amp; month view --&gt;
        &lt;div class="vuecal__cell-date" /&gt;
        &lt;!-- Will be added on month view --&gt;
        &lt;div class="vuecal__cell-events-count" /&gt;
      ssh-pre.my1(language="html-vue" :dark="store.darkMode").
            &lt;div class="vuecal__cell-events" /&gt;
        &lt;/div&gt;
  template(#code-html).
    &lt;vue-cal
      :time="false"
      :dblclick-to-navigate="false"
      view="month"
      :events="events"&gt;

      &lt;!-- Custom title --&gt;
      &lt;template #title="view"&gt;
        🎉
        &lt;span v-if="view.id === 'years'"&gt;Years&lt;/span&gt;
        &lt;!-- Using Vue Cal injected Date prototypes --&gt;
        &lt;span v-else-if="view.id === 'year'"&gt;{{ "\{\{ view.start.format('YYYY') \}\}" }}&lt;/span&gt;
        &lt;span v-else-if="view.id === 'month'"&gt;{{ "\{\{ view.start.format('MMMM YYYY') \}\}" }}&lt;/span&gt;
        &lt;span v-else-if="view.id === 'week'"&gt;w{{ "\{\{ view.start.getWeek() \}\} (\{\{ view.start.format('MMM YYYY') \}\}" }})&lt;/span&gt;
        &lt;span v-else-if="view.id === 'days'"&gt;{{ "\{\{ view.start.format('D MMMM YYYY') \}\}" }} - {{ "\{\{ view.end.format('D MMMM YYYY') \}\}" }}&lt;/span&gt;
        &lt;span v-else-if="view.id === 'day'"&gt;{{ "\{\{ view.start.format('dddd D MMMM YYYY') \}\}" }}&lt;/span&gt;
        🎉
      &lt;/template&gt;

      &lt;!-- Custom cells --&gt;
      &lt;template #cell-content="{ cell, view, events, goNarrower }"&gt;
        &lt;span class="vuecal__cell-date" :class="view.id" v-if="view.id === 'day'" @click="goNarrower"&gt;
          {{ '\{\{ cell.date.getDate() \}\}' }}
        &lt;/span&gt;
        &lt;span class="vuecal__cell-events-count" v-if="view.id === 'month' &amp;&amp; events.length"&gt;{{ '\{\{ events.length \}\}' }}&lt;/span&gt;
        &lt;span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) &amp;&amp; !events.length"&gt;Nothing here 👌&lt;/span&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;
  template(#desc2)

  vue-cal(
    :dark="store.darkMode"
    :time="false"
    :dblclick-to-navigate="false"
    view="month"
    :events="events")
    template(#title="view")
      | 🎉&nbsp;
      span(v-if="view.id === 'years'") Years
      span(v-else-if="view.id === 'year'") {{ view.start.format('YYYY') }}
      span(v-else-if="view.id === 'month'") {{ view.start.format('MMMM YYYY') }}
      span(v-else-if="view.id === 'week'") w{{ view.start.getWeek() }} ({{ view.start.format('MMM YYYY') }})
      span(v-else-if="view.id === 'days'") {{ view.start.format('D MMMM YYYY') }} - {{ view.end.format('D MMMM YYYY') }}
      span(v-else-if="view.id === 'day'") {{ view.start.format('dddd D MMMM YYYY') }}
      | &nbsp;🎉
    template(#cell-date="{ cell }")
      button(@click="cell.goBroader") {{ cell.start.format() }}

    //- template(#cell-content="{ cell, view, events, goNarrower }")
      span.vuecal__cell-date.clickable(v-if="view.id !== 'day'" :class="view.id" @click="goNarrower") {{ cell.content }}
      .vuecal__cell-events-count(v-if="['years', 'year', 'month'].includes(view.id) && events.length") {{ events.length }}

//- Example.
example(title="Custom Event Rendering" anchor="custom-event-rendering")
  template(#desc)
    p.mb2 Using Vue.js scoped slots, you can customize the event rendering through the following slots.

    alert.my2(tip).
      If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it in the
      #[a(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank") Vue.js official documentation #[w-icon(color="primary") mdi mdi-open-in-new]].
    ul
      li #[span.code event]: Override the event rendering for all the cases.
      li #[span.code event.all-day]: Override the event rendering when the event is all-day.
      li #[span.code event.day]: Override the event rendering when the event is on day view.
      li #[span.code event.days]: Override the event rendering when the event is on days view.
      li #[span.code event.week]: Override the event rendering when the event is on week view.
      li #[span.code event.month]: Override the event rendering when the event is on month view.
      li #[span.code event.year]: Override the event rendering when the event is on year view.
      li #[span.code event.years]: Override the event rendering when the event is on years view.
    p.mt2.
      You can set any custom attribute on an event, they will then be accessible in the custom event renderer.
  template(#code-html).
    &lt;vue-cal
      :events="events"&gt;
      &lt;template #event="{ event }"&gt;
        &lt;pre&gt;{{ '\{\{ event \}\}' }}&lt;/pre&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
    const events = [
      {
        start: new Date(new Date().subtractDays(1).setHours(9, 0, 0, 0)),
        end: new Date(new Date().subtractDays(1).setHours(12, 0, 0, 0)),
        title: 'Golf with John',
        icon: 'mdi mdi-golf',
        class: 'text-center sport'
      },
      {
        start: new Date(new Date().addDays(1).setHours(12, 0, 0, 0)),
        end: new Date(new Date().addDays(1).setHours(15, 0, 0, 0)),
        title: 'Shopping',
        icon: 'mdi mdi-cart-outline',
        class: 'text-center leisure'
      },
      {
        start: '{{ new Date().format() }}',
        end: '{{ new Date().addDays(1).format() }}',
        allDay: true,
        title: 'Day off!',
        content: '&lt;i class="icon mdi mdi-umbrella-beach-outline"&gt;&lt;/i&gt;',
        class: 'yellow-event'
      },
      {
        start: '{{ new Date().addDays(1).format() }}',
        end: '{{ new Date().addDays(2).format() }}',
        allDay: true,
        title: 'Anniversary ❤️',
        content: '&lt;i class="icon mdi mdi-heart-outline"&gt;&lt;/i&gt;',
        class: 'pink-event'
      }
    ]

  vue-cal(
    :time-from="9 * 60"
    :time-to="15 * 60"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :view-date="exCustomEventRendering.viewDate"
    :views-bar="false"
    :events="exCustomEventRendering.events"
    :dark="store.darkMode")
    template(#event="{ event }")
      w-icon.ma2(color="white" xl) {{ event.icon }}
      .title3.mb2(v-html="event.title")
      .mt2.w-flex.wrap.justify-center.lh0
        span From
        strong.mx1 {{ event.start.formatTime('h{am}') }}
        span to
        strong.ml1 {{ event.end.formatTime('h{am}') }}

//- Example.
example(title="Custom Day Schedules Headings" anchor="custom-schedules-headings")
  template(#desc)
    p.mb6 You can define a custom schedule heading through slot.
  template(#code-html).
    &lt;vue-cal
      :views="['day', 'week']"
      view="day"
      :schedules="schedules"
      :hide-weekdays="['fri', 'sat', 'sun']"&gt;
      &lt;template #schedule-heading="{ schedule, view }"&gt;
        &lt;i class="icon mdi mdi-account"&gt;&lt;/i&gt;
        &lt;strong :style="`color: ${schedule.color}`"&gt;{{ '\{\{ schedule.label \}\}' }}&lt;/strong&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
    customDayScheduleHeadings: [
      { label: 'John', color: 'blue', class: 'schedule1' },
      { label: 'Tom', color: 'green', class: 'schedule2' },
      { label: 'Kate', color: 'orange', class: 'schedule3' },
      { label: 'Jess', color: 'red', class: 'schedule4' }
    ]
  template(#code-css).
    .vuecal__schedule--heading {font-size: 11px;}
    .vuecal__body .schedule1 {background-color: rgba(226, 242, 253, 0.7);}
    .vuecal__body .schedule2 {background-color: rgba(232, 245, 233, 0.7);}
    .vuecal__body .schedule3 {background-color: rgba(255, 243, 224, 0.7);}
    .vuecal__body .schedule4 {background-color: rgba(255, 235, 238, 0.7);}

  vue-cal(
    :dark="store.darkMode"
    :views="['day', 'week']"
    view="day"
    :schedules="customDayScheduleHeadings"
    :hide-weekdays="['fri', 'sat', 'sun']")
    template(#schedule-heading="{ schedule, view }")
      w-icon(:color="schedule.color" size="18") mdi mdi-account
      strong(:style="`color: ${schedule.color}`") {{ schedule.label }}

//- Example.
example(title="Events on Month View" anchor="events-on-month-view")
  template(#desc)
    p.
      You can define a custom schedule look when displaying a lot of events on the month view
      with a little bit of CSS.
      In this example, all the cells have the same adaptive height with an overflow: auto.

  template(#code-html).
    &lt;vue-cal
      :events="events"
      v-model:view="view"
      :views="['day', 'days', 'week', 'month']"
      :time-from="9 * 60"
      :time-to="18 * 60"
      :time-cell-height="view === 'day' ? 59.4 : 56.6"
      events-on-month-view
      @ready="({ view }) => onViewChange(view)"
      @view-change="onViewChange"
      style="height: 600px"&gt;
    &lt;/vue-cal&gt;

  template(#code-js).
    import { ref } from 'vue'
    import { VueCal, countDays } from '@/vue-cal'

    const events = ref([])
    const view = ref('month')
    const onViewChange = view => {
      events.value = generateRandomEvents(view.start, view.end)
    }

    /**
      * Generate random events for a given date range as if they were returned from a backend.
      *
      * @param {Date} startDate - The start date.
      * @param {Date} endDate - The end date.
      * @returns {Array} The events.
      */
    const generateRandomEvents = (startDate, endDate) => {
      const daysRange = countDays(startDate, endDate)
      const events = []
      for (let i = 0; i < daysRange; i++) {
        for (let j = 0; j < 10; j++) {
          // Set random start and end time in the day, events last 1 hour.
          // The random start and end time is between 9am and 5pm.
          const start = new Date(startDate.addDays(i).setHours(Math.floor(Math.random() * 8) + 9, Math.floor(Math.random() * 60), 0, 0))
          const end = start.addHours(1)
          events.push({ title: `Event ${j}`, start, end })
        }
      }
      return events
    }

  template(#code-css).
    .vuecal__body-wrap {overflow: hidden;}
    .vuecal__body {
      aspect-ratio: 13 / 9;
      overflow: auto;
    }
    .vuecal__cell {overflow: auto;}
    .vuecal__event {padding: 0 2px;}
    .vuecal__scrollable--month-view .vuecal__cell-date {
      font-size: 11px;
      margin: 1px;
      width: 1.7em;
    }

  vue-cal(
    :dark="store.darkMode"
    :events="exEventsMonthView.events"
    v-model:view="exEventsMonthView.view"
    :views="['day', 'days', 'week', 'month']"
    :time-from="9 * 60"
    :time-to="18 * 60"
    :time-cell-height="exEventsMonthView.view === 'day' ? 59.4 : 56.6"
    events-on-month-view
    @ready="({ view }) => exEventsMonthView.onViewChange(view)"
    @view-change="exEventsMonthView.onViewChange"
    style="height: 600px;")
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, stringToDate, countDays  } from '@/vue-cal'

const store = useAppStore()

const cl = (...args) => console.log(...args)
const exSlotsExampleEl = ref(null)
const exSlots = reactive({
  title: ref(false),
  prevNextButtons: ref(false),
  nextButton: ref(false),
  todayButton: ref(false),
  weekdayHeading: ref(false),
  timeCell: ref(false),
  cellContent: ref(false),
  header: ref(false),
  diy: ref(false),
  view: ref('week')
})
watch(
  () => `${exSlots.title} ${exSlots.prevNextButtons} ${exSlots.nextButton} ${exSlots.todayButton} ${exSlots.weekdayHeading} ${exSlots.timeCell} ${exSlots.cellContent} ${exSlots.header} ${exSlots.diy}`,
  () => exSlotsExampleEl.value?.refreshHeight?.()
)

const customDayScheduleHeadings = [
  { label: 'John', color: 'blue', class: 'schedule1' },
  { label: 'Tom', color: 'green', class: 'schedule2' },
  { label: 'Kate', color: 'orange', class: 'schedule3' },
  { label: 'Jess', color: 'red', class: 'schedule4' }
]
const selectedDate = ref(null)
const selectedEvent = ref({})
const eventsCssClasses = ref([{ label: 'leisure' }, { label: 'sport' }, { label: 'health' }])

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
    title: 'Cross-fit',
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
const eventsCopy = events.slice(0)

const cancelEventCreation = () => {
  closeCreationDialog()
  (deleteEventFunction.value || deleteDragEventFunction.value)()
}
const customEventCount = events => events ? events.filter(e => e.class === 'leisure').length : 0

const exCustomTitlePerView = reactive({
  view: ref('day')
})

const exCustomEventRendering = reactive({
  viewDate: new Date().subtractDays(2),
  events: [
    {
      start: new Date(new Date().subtractDays(1).setHours(9, 0, 0, 0)),
      end: new Date(new Date().subtractDays(1).setHours(12, 0, 0, 0)),
      title: 'Golf with John',
      icon: 'mdi mdi-golf',
      class: 'text-center sport'
    },
    {
      start: new Date(new Date().addDays(1).setHours(12, 0, 0, 0)),
      end: new Date(new Date().addDays(1).setHours(15, 0, 0, 0)),
      title: 'Shopping',
      icon: 'mdi mdi-cart-outline',
      class: 'text-center leisure'
    }
  ]
})

const exEventsMonthView = reactive({
  events: [...events],
  view: ref('month'),
  onViewChange: view => {
    exEventsMonthView.fetchEvents(view.start.format(), view.end.format())
  },
  fetchEvents: async (start, end) => {
    const startDate = stringToDate(start)
    const endDate = stringToDate(end)
    exEventsMonthView.events = exEventsMonthView.generateRandomEvents(startDate, endDate)
  },
  /**
   * Generate random events for a given date range as if they were returned from a backend.
   *
   * @param {Date} startDate - The start date.
   * @param {Date} endDate - The end date.
   * @returns {Array} The events.
   */
  generateRandomEvents: (startDate, endDate) => {
    const daysRange = countDays(startDate, endDate)
    const events = []
    for (let i = 0; i < daysRange; i++) {
      for (let j = 0; j < 10; j++) {
        // Set random start and end time in the day, events last 1 hour.
        // The random start and end time is between 9am and 5pm.
        const start = new Date(startDate.addDays(i).setHours(Math.floor(Math.random() * 8) + 9, Math.floor(Math.random() * 60), 0, 0))
        const end = start.addHours(1)
        events.push({ title: `Event ${j}`, start, end })
      }
    }
    return events
  }
})
</script>

<style lang="scss">
.main--examples-customization {
  // Custom vue-cal title & "no event" text example.
  .example--custom-title-and-cells {
    .vuecal__cell-events-count {margin-top: -2px;}

    .vuecal__cell .clickable {display: block;}

    .vuecal__cell .clickable.month {
      position: absolute;
      top: 0;
      right: 0;
      color: var(--w-primary-color);
      font-size: 1.2em;
      padding: 0 4px;
      text-decoration: underline;
      display: inline-block;
    }

    .vuecal__cell .vuecal__cell-content {height: 100%;}
  }

  .example--events-on-month-view {
    .vuecal__body-wrap {overflow: hidden;}
    .vuecal__body {
      aspect-ratio: 13 / 9;
      overflow: auto;
    }
    .vuecal__cell {overflow: auto;}
    .vuecal__event {padding: 0 2px;}
    .vuecal__scrollable--month-view .vuecal__cell-date {
      font-size: 11px;
      margin: 1px;
      width: 1.7em;
    }
  }
}
</style>
