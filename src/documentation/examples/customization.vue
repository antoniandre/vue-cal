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
    li #[span.code previous-button]
    li #[span.code next-button]
    li #[span.code today-button]
    li #[span.code weekday-heading]
    li #[span.code schedule-heading]
    li #[span.code time-cell]
    li #[span.code week-number-cell]
    li #[span.code cell-content]
    li #[span.code events-count]
    li #[span.code event]

//- Example.
example(title="Simple Slots" anchor="slots")
  template(#desc)
    .todo-tag.d-iflex UPDATE THE EXAMPLE SOURCE CODE
    p.
      Vue Cal is designed to be as flexible and customizable as possible, offering a variety of slots to
      help you go beyond the standard features and tailor it to your needs.#[br]
      This example highlights the simplest and most commonly used slots.

    .w-flex.column.gap1
      w-switch(v-model="exSlots.title" :disabled="exSlots.header || exSlots.diy") Custom title via #[code.mx1 title] slot
      w-switch(v-model="exSlots.prevNextButtons" :disabled="exSlots.header || exSlots.diy") Custom arrows via #[code.mx1 previous-button] &amp; #[code.mx1 next-button] slots
      w-switch(v-model="exSlots.todayButton" :disabled="exSlots.header || exSlots.diy") Custom today button via #[code.mx1 today-button] slot
      w-switch(v-model="exSlots.weekdayHeading" :disabled="exSlots.header || exSlots.diy") Custom weekday labels via #[code.mx1 weekday-heading] slot
      w-switch(v-model="exSlots.header" :disabled="exSlots.diy") Custom header via #[code.mx1 header] slot
      w-switch(v-model="exSlots.timeCell" :disabled="exSlots.diy") time cell labels via #[code.mx1 time-cell] slot
      w-switch(v-model="exSlots.cellContent" :disabled="exSlots.diy") Custom cell content via #[code.mx1 cell-content] slot
      w-switch(v-model="exSlots.diy") DIY via #[code.mx1 diy] slot: you've got the power, build something nice!

  template(#code-html).
    &lt;vue-cal
      ref="vuecal"
      xs
      :views="['day', 'month', 'year']"
      today-button
      date-picker
      :selected-date="selectedDate"&gt;
      &lt;!-- Optional slot for the custom button. --&gt;
      &lt;template #today-button&gt;
        &lt;!-- Using Wave UI --&gt;
        &lt;w-tooltip&gt;
          &lt;template #activator="{ on }"&gt;
            &lt;w-btn v-on="on" icon="mdi mdi-calendar-today"&gt;
            &lt;/w-btn&gt;
            &lt;span&gt;Go to Today's date&lt;/span&gt;
          &lt;/template&gt;
        &lt;/w-tooltip&gt;
      &lt;/template&gt;

      &lt;template #title="view"&gt;
        &lt;code v-html="view.title"&gt;&lt;/code&gt;
      &lt;/template&gt;

      &lt;template #previous-button&gt;
        &lt;i class="icon mdi mdi-arrow-left"&gt;&lt;/i&gt;
      &lt;/template&gt;

      &lt;template #next-button&gt;
        &lt;i class="icon mdi mdi-arrow-right"&gt;&lt;/i&gt;
      &lt;/template&gt;

      &lt;template #time-cell="{ format24 }"&gt;
        &lt;strong&gt;{{ '\{\{ format24 \}\}' }}&lt;/strong&gt;
      &lt;/template&gt;

      &lt;template #cell-content&gt;
        &lt;i class="icon mdi mdi-party-popper"&gt;&lt;/i&gt;
      &lt;/template&gt;

      &lt;template #diy="{ vuecal, view }"&gt;
        {{ '\{\{ view \}\}' }}<br><br>{{ '\{\{ vuecal \}\}' }}
      &lt;/template&gt;
    &lt;/vue-cal&gt;

  template(#code-js).
    data: () => ({
      // Default to next new year eve.
      selectedDate: new Date(new Date().getFullYear(), 11, 31)
    })

  vue-cal.grow(
    ref="vuecal2"
    :dark="store.darkMode"
    :time-from="9 * 60"
    :time-to="14 * 60"
    v-model:view="exSlots.view"
    style="overflow: auto")
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
        w-button(color="base-color" icon="wi-chevron-left")
        .base-color(v-html="view.title")
        w-button(color="base-color" icon="wi-chevron-right")
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
      :time-from="10 * 60"
      :time-step="2 * 60"
      date-picker
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
    :selected-date="stringToDate('2018-11-19')"
    :time-from="10 * 60"
    :time-step="2 * 60"
    date-picker
    events-count-on-year-view
    :dark="store.darkMode"
    :events="events")
    template(#events-count="{ events, view }"
    style="width: 300px;height: 360px;max-width: 100%")
      span(v-if="customEventsCount(events)") {{ customEventsCount(events) }}

//- Example.
example(title="Custom Title & Cells" anchor="custom-title-and-cells")
  template(#desc)
    .todo-tag.d-iflex TO REVIEW
    alert(tip).
      Using Vue.js scoped slots, you can override the calendar main date title and calendar cells.#[br]
      If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
      #[a(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank") vuejs.org/guide/components/slots.htm #[w-icon(color="primary") mdi mdi-open-in-new]]
    h3.title3.mt6
      w-icon(size="22") wi-chevron-right
      | Custom Title
    p.ml2.mb2 Accessible payload through the #[span.code #title] scoped slot:
    ul
      li.
        #[strong.code view]:
        the object containing the active view info, the precomputed formatted title, the start and end dates.
    p.
      If you plan a custom title, you can use the pre-formatted #[span.code view.title] or build your own.#[br]
      The Vue Cal's Date prototypes will help you go faster.#[br]
      Remember to handle all the different views: #[code.mx1 day], #[code.mx1 days], #[code.mx1 week],
      #[code.mx1 month], #[code.mx1 year], #[code.mx1 years].#[br]
      In the view object, you can use the #[code.mx1 view.isDay], #[code.mx1 view.isWeek], etc. properties to
      check the current view, or use #[code.mx1 view.id].

    h3.title3.mt6
      w-icon(size="22") wi-chevron-right
      | Custom Cells
    p.ml2.mb2 Accessible payload through the #[span.code #cell-content] scoped slot:
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
    template(#cell-date="{ cell }")
      button(@click="cell.goBroader") {{ cell.start.format() }}

    //- template(#cell-content="{ cell, view, events, goNarrower }")
      span.vuecal__cell-date.clickable(v-if="view.id !== 'day'" :class="view.id" @click="goNarrower") {{ cell.content }}
      .vuecal__cell-events-count(v-if="['years', 'year', 'month'].includes(view.id) && events.length") {{ events.length }}

//- Example.
example(title="Custom event Rendering" anchor="custom-event-rendering")
  template(#desc)
    .todo-tag.d-iflex.prod TO BE UPDATED SOON
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
  template(#code-html).
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
  template(#code-js).
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
  template(#desc2)

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
    // In data.
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

  w-dialog(
    v-model="showDialog"
    width="600"
    dialog-class="bdrs2"
    title-class="primary--bg white py2")
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
import { reactive, ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, stringToDate } from '@/vue-cal'

const store = useAppStore()

const cl = (...args) => console.log(...args)
const exSlots = reactive({
  todayButton: ref(false),
  prevNextButtons: ref(false),
  nextButton: ref(false),
  weekdayHeading: ref(false),
  timeCell: ref(false),
  cellContent: ref(false),
  header: ref(false),
  diy: ref(false),
  view: ref('week')
})

const customDayScheduleHeadings = [
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

<style lang="scss">
.main--examples-customization {
  // Custom vue-cal title & "no event" text example.
  .ex--custom-title-and-cells {
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
}
</style>
