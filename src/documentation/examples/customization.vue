<template lang="pug">
alert.mt6
  | Here is the list of available slots:
  ul
    li #[span.code title]
    li #[span.code arrow-prev]
    li #[span.code arrow-next]
    li #[span.code today-button]
    li #[span.code weekday-heading]
    li #[span.code schedule-label]
    li #[span.code time-cell]
    li #[span.code week-number-cell]
    li #[span.code cell-content]
    li #[span.code no-event]
    li #[span.code events-count]
    li #[span.code event]

alert.mt6(tip).
  If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it in the
  #[a(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank") official Vue documentation #[w-icon(color="primary") mdi mdi-open-in-new]]

//- Example.
example(title="Custom Today Button" anchor="custom-today-button")
  template(#desc)
    p.
      By default the selected date is today. But if you get lost in time travel, you can add
      a Today button to select Today's date with the option #[span.code today-button].#[br]
      Like navigation arrows, there is also a slot to customize as you want.#[br]
      below are the default Today button on the left and a custom one with icon and tooltip on the right.
    p
      | You can also place the button outside of Vue Cal like so:
      w-button.ma1.today-button(color="primary" outline round @click="selectedDate = new Date()") Another Today Button
      | #[br]You might want to change view as well when going to Today's date, here is an example how:
      a.mx1(href="https://codepen.io/antoniandre/pen/yrREOL?editors=1010" target="_blank") Today Button
      w-icon(color="green lighten-2") mdi mdi-codepen

  template(#code-html).
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
  template(#code-js).
    data: () => ({
      // Default to next new year eve.
      selectedDate: new Date(new Date().getFullYear(), 11, 31)
    })

  .w-flex.justify-center.wrap
    vue-cal.ex--adding-a-today-button(
      :dark="store.darkMode"
      ref="vuecal2"
      xs
      hide-weekends
      :disable-views="['years']"
      :time="false"
      today-button
      view="month"
      :selected-date="selectedDate || new Date(new Date().getFullYear(), 11, 31)"
      style="max-width: 280px;height: 250px")
    vue-cal.ex--adding-a-today-button(
      :dark="store.darkMode"
      ref="vuecal2"
      xs
      hide-weekends
      :disable-views="['years']"
      :time="false"
      today-button
      view="month"
      :selected-date="selectedDate || new Date(new Date().getFullYear(), 11, 31)"
      style="max-width: 280px;height: 250px")
      template(#today-button)
        w-tooltip(bottom)
          template(#activator="{ on }")
            w-button(x-Programmatically fab text v-on="on")
              w-icon(color="primary" size="20") mdi mdi-map-marker-outline
          span Go to Today's date

//- Example.
example(title="Custom arrows" anchor="custom-arrows")
  template(#desc)
    p.
      Custom arrows using the #[span.code arrow-prev] &amp; #[span.code arrow-next] slots.#[br]
  template(#code-html).
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
  template(#desc2)
    vue-cal(
      :views-bar="false"
      :time="false"
      view="month"
      xs
      :dark="store.darkMode"
      style="width: 250px;height: 260px")
      template(#arrow-prev)
        w-icon mdi mdi-arrow-left
      template(#arrow-next)
        w-icon mdi mdi-arrow-right

//- Example.
example(title="Custom Events Count" anchor="custom-events-count")
  template(#desc)
    alert(tip).
      Using Vue.js scoped slots, you can also override the counting events method if you need.#[br]
      If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
      #[a(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank") vuejs.org/guide/components/slots.htm #[w-icon(color="primary") mdi mdi-open-in-new]]
    p.
      In the following example, we only count the events which have the custom
      #[span.code leisure] CSS class (orange color).
  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      xs
      :time-from="10 * 60"
      :time-step="2 * 60"
      date-picker
      view="month"
      events-count-on-year-view
      :events="events"&gt;
      &lt;template #events-count="{ events, view }"&gt;
        &lt;span v-if="customEventsCount(events)"&gt;
          {{ '\{\{ customEventsCount(events) \}\}' }}
        &lt;/span&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;
  template(#desc2)
    p.
      Alternatively, you could also use the #[span.code cell-content] slot
      instead of the #[span.code events-count] slot to perform the same task:#[br]
      (Refer to the next example to know more:
      #[a(href="#ex--custom-title-and-cells") Custom title &amp; cells])
    ssh-pre.mt2(language="html-vue" :dark="store.darkMode").
      &lt;template #cell-content="{ cell, view, events }"&gt;
        &lt;span class="vuecal__cell-date"&gt;
          {{ '\{\{ cell.content \}\}' }}
        &lt;/span&gt;
        &lt;span
          class="vuecal__cell-events-count"
          v-if="['years', 'year', 'month'].includes(view.id) &amp;&amp; customEventsCount(events)"&gt;
          {{ '\{\{ customEventsCount(events) \}\}' }}
        &lt;/span&gt;
      &lt;/template&gt;

    ssh-pre(language="js" :dark="store.darkMode").
      // In your Vue component.
      methods: {
        customEventsCount: events => {
          return events ? events.filter(e => e.class === 'leisure').length : 0
        }
      }

    ssh-pre(language="css" :dark="store.darkMode").
      .vuecal__cell-events-count {background: transparent;}
      .vuecal__cell-events-count span {
        background: #fd9c42;
        height: 100%;
        min-width: 12px;
        padding: 0 3px;
        border-radius: 12px;
        display: block;
      }

  vue-cal.ex--custom-events-count(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    xs
    :time-from="10 * 60"
    :time-step="2 * 60"
    view="month"
    date-picker
    events-count-on-year-view
    :events="events")
    template(#events-count="{ events, view }"
    style="width: 300px;height: 360px;max-width: 100%")
      span(v-if="customEventsCount(events)") {{ customEventsCount(events) }}



//- Example.
example(title="Custom Title & Cells" anchor="custom-title-and-cells")
  template(#desc)
  template(#code-html).
  template(#desc2)

alert(tip).
  Using Vue.js scoped slots, you can override the calendar main date title and calendar cells.#[br]
  If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
  #[a(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank") vuejs.org/guide/components/slots.htm #[w-icon(color="primary") mdi mdi-open-in-new]]
h5.mt6.subtitle-1.font-weight-medium
  w-icon(size="22") mdi mdi-arrow-right
  | Custom title
p.ml2.mb2.
  2 arguments are available through the scoped slot: #[span.code #title="{ title, view }"]
ul
  li
    | #[span.code title], the formatted title (different on all the views). E.g.
    em.ml2 "Week 2 (January 2019)"
  li
    | #[span.code view], an object containing the active view info.
    ssh-pre(language="js" :dark="store.darkMode").mt2.mb3.
      {
        id: {String}, // Current view, one of: years, year, month, week, day.
        start: {Date}, // JavaScript Date object.
        end: {Date}, // JavaScript Date object.
        selectedDate: {Date} // JavaScript Date object.
      }
p.
  You can use one or the other to format the title as you wish.#[br]
  Using the pre-formatted #[span.code title] will be easy but not very flexible.#[br]
  If you render the date yourself from #[span.code view.start], don't forget
  the different formats for all the views: years, year, month, week, day.

h5.mt6.subtitle-1.font-weight-medium
  w-icon(size="22") mdi mdi-arrow-right
  | Custom cells
p.ml2.mb2.
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
        today: {Boolean}
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

    &lt;!-- Will be added if schedules and schedule labels are set --&gt;
    &lt;div class="schedule-label" /&gt;
    &lt;!-- Will be added on years, year &amp; month view --&gt;
    &lt;div class="vuecal__cell-date" /&gt;
    &lt;!-- Will be added on month view --&gt;
    &lt;div class="vuecal__cell-events-count" /&gt;
    &lt;!-- Will be added on week and day view if no event --&gt;
    &lt;div class="vuecal__no-event" /&gt;
  ssh-pre.my1(language="html-vue" :dark="store.darkMode").
        &lt;div class="vuecal__cell-events" /&gt;
    &lt;/div&gt;

.example.my2.mxa(style="height: 400px")
  vue-cal.ex--custom-title-and-cells(
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
    //- template(#cell-content="{ cell, view, events, goNarrower }")
      span.vuecal__cell-date.clickable(v-if="view.id !== 'day'" :class="view.id" @click="goNarrower") {{ cell.content }}
      .vuecal__cell-events-count(v-if="['years', 'year', 'month'].includes(view.id) && events.length") {{ events.length }}
      .vuecal__no-event(v-if="['week', 'day'].includes(view.id) && !events.length") Nothing here 👌

ssh-pre(language="html-vue" :dark="store.darkMode").
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

    &lt;!-- Alternatively to custom cells if you just want custom no-event text: --&gt;
    &lt;!-- &lt;template #no-event&gt;Nothing here 👌&lt;/template&gt; --&gt;
  &lt;/vue-cal&gt;

//- Example.
example(title="Custom event Rendering" anchor="custom-event-rendering")
  template(#desc)
  template(#code-html).
  template(#desc2)

p.mb2 Using Vue.js scoped slots, you can override the events rendering.

alert.my2(tip).
  If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
  #[a(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank") vuejs.org/guide/components/slots.htm #[w-icon(color="primary") mdi mdi-open-in-new]].
alert.my3(info)
  | By default an event is rendered as follows.#[br]
  | It is a good idea to reuse the same CSS classes as the different elements have associated styles:#[br]
  ssh-pre.mt3.mb1(language="html-vue" :dark="store.darkMode").
    &lt;div class="vuecal__event"&gt;
        &lt;!-- Will be added if `editable-events` option is set to `true` --&gt;
        &lt;div class="vuecal__event-delete" /&gt;
  ssh-pre.my2.ml5(language="html-vue" style="background-color: rgba(0, 177, 255, 0.08)" :dark="store.darkMode").
    Now this is the part you can customize:

    &lt;!-- Will be added if a title is set --&gt;
    &lt;div class="vuecal__event-title" /&gt;
    &lt;!-- or if title is set and `editable-events` option is set to `true` --&gt;
    &lt;div class="vuecal__event-title vuecal__event-title--edit" contenteditable /&gt;

    &lt;!-- Will be added if `time` option is set to `true` --&gt;
    &lt;div class="vuecal__event-time" /&gt;

    &lt;!-- Will be added if a content is set --&gt;
    &lt;div class="vuecal__event-content" /&gt;
  ssh-pre.my1(language="html-vue" :dark="store.darkMode").
        &lt;!-- Will be added if `editable-events` option is set to `true` --&gt;
        &lt;div class="vuecal__event-resize-handle" /&gt;
    &lt;/div&gt;
p.mb2.
  Two parameters are passed through the scoped slot:
ul
  li #[span.code event]: The event full object containing dates, time, title, content and custom attributes.
  li #[span.code view]: The current selected view id.
p.mt2.
  You can set any custom attribute you want on an event, they will then be accessible in your custom event renderer!#[br]
  Note that #[span.code _eid] is a reserved keyword.

.example.my2.mxa(style="height: 520px")
  vue-cal.ex--custom-event-rendering(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="9 * 60"
    :time-to="19 * 60"
    hide-weekends
    :events="eventsCopy")
    template(#event="{ event, view }")
      w-icon.mt2(color="white" xl) {{ event.icon }}
      .vuecal__event-title.mb6(v-html="event.title")
      small.vuecal__event-time
        strong.mr1 Event start:
        span {{ event.start.formatTime('h O\'clock') }}
        br
        strong.mr1 Event end:
        span {{ event.end.formatTime('h O\'clock') }}
ssh-pre(language="html-vue" :dark="store.darkMode").
  &lt;vue-cal
    :selected-date="stringToDate('2018-11-19')"
    :time-from="9 * 60"
    :time-to="19 * 60"
    hide-weekends
    :events="events"&gt;
    &lt;template #event="{ event, view }"&gt;
      &lt;v-icon&gt;{{ '\{\{ event.icon \}\}' }}&lt;/v-icon&gt;

      &lt;div class="vuecal__event-title" v-html="event.title" /&gt;
      &lt;!-- Or if your events are editable: --&gt;
      &lt;div class="vuecal__event-title vuecal__event-title--edit"
            contenteditable
            @blur="event.title = $event.target.innerHTML"
            v-html="event.title" /&gt;

      &lt;small class="vuecal__event-time"&gt;
        &lt;!-- Using Vue Cal Date prototypes (activated by default) --&gt;
        &lt;strong&gt;Event start:&lt;/strong&gt; &lt;span&gt;{{ '\{\{ event.start.formatTime("h O\'clock") \}\}' }}&lt;/span&gt;&lt;br/&gt;
        &lt;strong&gt;Event end:&lt;/strong&gt; &lt;span&gt;{{ '\{\{ event.end.formatTime("h O\'clock") \}\}' }}&lt;/span&gt;
      &lt;/small&gt;
    &lt;/template&gt;
  &lt;/vue-cal&gt;

ssh-pre(language="js" :dark="store.darkMode").
  events: [
    {
      start: '2018-11-20 14:00',
      end: '2018-11-20 18:00',
      title: 'Need to go shopping',
      icon: 'mdi mdi-cart-outline', // Custom attribute.
      class: 'leisure'
    },
    {
      start: '2018-11-22 10:00',
      end: '2018-11-22 15:00',
      title: 'Golf with John',
      icon: 'mdi mdi-golf', // Custom attribute.
      class: 'sport'
    }
  ]

//- Example.
example(title="Custom Day Schedule Labels" anchor="custom-schedule-labels")
  template(#desc)
  template(#code-html).
  template(#desc2)

p.mb6 You can provide a custom schedule label when a simple label is not enough.

.example.my2.mxa(style="height: 250px")
  vue-cal.ex--custom-schedule-labels(
    :dark="store.darkMode"
    :views="['day', 'week']"
    view="day"
    :schedules="customDayScheduleLabels"
    :hide-weekdays="[5, 6, 7]"
    sticky-schedule-labels)
    template(#no-event) &nbsp;
    template(#schedule-label="{ schedule, view }")
      w-icon(:color="schedule.color" size="18") mdi mdi-account
      strong(:style="`color: ${schedule.color}`") {{ schedule.label }}

ssh-pre(language="html-vue" :dark="store.darkMode").
  &lt;vue-cal
    :views="['day', 'week']"
    view="day"
    :schedules="schedules"
    :hide-weekdays="[5, 6, 7]"
    sticky-schedule-labels&gt;
    &lt;template #schedule-label="{ schedule, view }"&gt;
      &lt;i class="icon mdi mdi-account"&gt;&lt;/i&gt;
      &lt;strong :style="`color: ${schedule.color}`"&gt;{{ '\{\{ schedule.label \}\}' }}&lt;/strong&gt;
    &lt;/template&gt;
  &lt;/vue-cal&gt;

ssh-pre(language="js" :dark="store.darkMode").
  // In data.
  customDayScheduleLabels: [
    { label: 'John', color: 'blue', class: 'schedule1' },
    { label: 'Tom', color: 'green', class: 'schedule2' },
    { label: 'Kate', color: 'orange', class: 'schedule3' },
    { label: 'Jess', color: 'red', class: 'schedule4' }
  ]

ssh-pre(language="css" :dark="store.darkMode").
  .vuecal .schedule-header {font-size: 11px;}
  .vuecal__body .schedule1 {background-color: rgba(226, 242, 253, 0.7);}
  .vuecal__body .schedule2 {background-color: rgba(232, 245, 233, 0.7);}
  .vuecal__body .schedule3 {background-color: rgba(255, 243, 224, 0.7);}
  .vuecal__body .schedule4 {background-color: rgba(255, 235, 238, 0.7);}
  .vuecal__no-event {display: none;}

w-dialog(v-model="showDialog" width="600" dialog-class="bdrs2" title-class="primary--bg white py2")
  template(#title)
    w-icon.mr3 {{ selectedEvent.icon }}
    span.title3.text-upper {{ selectedEvent.title }}
    .spacer
    strong {{ selectedEvent.start && selectedEvent.start.format('DD/MM/YYYY') }}

  p(v-html="selectedEvent.contentFull")
  .text-bold.mt3 Event details:
  ul
    li Event starts at: {{ selectedEvent.start && selectedEvent.start.formatTime() }}
    li Event ends at: {{ selectedEvent.end && selectedEvent.end.formatTime() }}

w-dialog(
  v-model="showEventCreationDialog"
  persistent
  width="420"
  title-class="primary--bg white px5"
  content-class="pa5")
  template(#title)
    w-input.ma0.pa0(v-model="selectedEvent.title" placeholder="Event Title" color="white")
  div
    w-textarea.pa0(v-model="selectedEvent.content" placeholder="Event Content" rows="3")
    .w-flex.justify-space-between.mt4
      w-select(
        :items="eventsCssClasses"
        placeholder="Event CSS Class"
        @input="selectedEvent.class = $event"
        :model-value="selectedEvent.class"
        style="max-width: 170px")
      w-switch.no-grow(
        v-model="selectedEvent.background"
        label="Background Event"
        label-color="grey")
  .w-flex.mt6
    .spacer
    w-button.ma1(bg-color="light-grey" @click="cancelEventCreation") Cancel
    w-button.ma1(@click="closeCreationDialog") Save
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, stringToDate } from '@/vue-cal'

const store = useAppStore()

const customDayScheduleLabels = [
  { label: 'John', color: 'blue', class: 'schedule1' },
  { label: 'Tom', color: 'green', class: 'schedule2' },
  { label: 'Kate', color: 'orange', class: 'schedule3' },
  { label: 'Jess', color: 'red', class: 'schedule4' }
]
const selectedDate = ref(null)
const selectedEvent = ref({})
const showDialog = ref(false)
const showEventCreationDialog = ref(false)
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
const customEventsCount = events => events ? events.filter(e => e.class === 'leisure').length : 0
</script>

<style lang="scss" scoped>
</style>
