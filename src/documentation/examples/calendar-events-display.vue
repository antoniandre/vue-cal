<template lang="pug">
alert(info)
  h3.mt-2.mb2 Read First
  p Events are always rendered in cells, whether a time column is displayed or not.
  ul
    li.
      Events are defined essentially with #[code start] and #[code end] attributes, but can contain a
      lot more, even custom attributes.
    li.
      #[code start] and #[code end] can be defined (by you) as both a native JavaScript Date or a
      Formatted date time such as #[code {{ new Date().format() }} {{ new Date().formatTime() }}].
      But when Vue Cal gives you details about an appt., the #[code start] and #[code end] will
      always be JavaScript Dates.
    li.
      When the events are editable, they can be created, deleted, drag and dropped to a different
      date and time and resized. There's also a more granular control on what exactly should be editable.

//- Example.
example(title="Events & Background Events" anchor="events")
  template(#desc)
    p.
      Events are defined by a #[code start] and #[code end] dates, provided as a JavaScript Date object
      or a formatted date and time. Additionally, you can optionally add a title, content, and a CSS class.#[br]

      Adding a #[code background: true] property to the event object will make it behave like a background event:
      it can be overlapped without contstraint, and cannot be interacted with.#[br]
      The particularity of the background events is that they can fully be overlapped but not overlapping.#[br]
      They are not affected by other events: they stay in the background occupying the whole cell/schedule width.#[br]
      Note that you can still temporarily raise a background event on top of others (z-index) by hovering it or clicking it.

    .w-flex.justify-end.my2
      w-switch(v-model="exEvents.showBgEvents") Show Background Events
  template(#code-html).
    &lt;vue-cal :events="events" /&gt;
  template(#code-js)
    | const events = [
    |   {
    |     start: new Date(new Date().setHours(10, 30, 0, 0)),
    |     end: new Date(new Date().setHours(11, 30, 0, 0)),
    |     title: 'Doctor Appt.',
    |     content: '&lt;i class="icon mdi mdi-stethoscope"&gt;&lt;/i&gt;',
    |     class: 'health'
    |   },
    |
    span(v-if="exEvents.showBgEvents")
      |   {
      |     start: new Date(new Date().setHours(12, 0, 0, 0)),
      |     end: new Date(new Date().setHours(14, 0, 0, 0)),
      |     class: 'lunch',
      |     background: true
      |   },
      |
    span(v-else)
    |   ...
    | ]

  template(#code-css).
    .vuecal__event {color: #fff;border: 1px solid;}
    .vuecal__event.leisure {background-color: #fd9c42d9;}
    .vuecal__event.health {background-color: #57cea9cc;}
    .vuecal__event.sport {background-color: #ff6666d9;}
    .vuecal__event.lunch {
      background-color: repeating-linear-gradient(45deg, transparent 0 10px, {{ store.darkMode ? '#ffffff11' : '#00000011' }} 10px 20px);
      border: none;
    }
  vue-cal(
    :time-from="9 * 60"
    :time-to="14 * 60"
    :events="exEvents.events"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :views-bar="false"
    :dark="store.darkMode"
    style="height: 261px")

//- Example.
example(title="Timeless Events" anchor="timeless-events")
  template(#desc)
    p.
      When #[code time] is set to #[code false], the calendar and the events are timeless. The events can't be
      resized.
  template(#code-html).
    &lt;vue-cal :time="false" :events="events" /&gt;
  template(#code-js).
    const events = [
      {
        start: new Date(),
        end: new Date(),
        title: 'Salsa Dance Class',
        content: '&lt;i class="icon mdi mdi-dance-ballroom"&gt;&lt;/i&gt;',
        class: 'sport'
      },
      ...
    ]
  vue-cal(
    :dark="store.darkMode"
    :time="false"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :views-bar="false"
    :events="exTimelessEvents.events")

//- Example.
example(title="Open a Dialog on Event Click" anchor="open-dialog-on-event-click")
  template(#desc)
    p.mb2.
      You can attach whatever event listener you want to the events: it only needs to start with
      #[code @event-].#[br]
      For instance, let's open a dialog on event click #[code @event-click]. When it's called, your
      callback function will receive in parameter an object containing:
    ul
      li #[code event]: the clicked calendar event's object
      li #[code e]: the associated javascript DOM event
  template(#code-html).
    &lt;vue-cal :events="events" @event-click="openDialog" /&gt;

    &lt;!-- Using Wave UI - https://antoniandre.github.io/wave-ui --&gt;
    &lt;w-dialog
      v-if="demo.event"
      v-model="showDialog"
      :title="selectedEvent.title"
      width="300"&gt;
      &lt;w-flex align-center justify-end gap2&gt;
        &lt;w-icon class="grey"&gt;mdi mdi-calendar&lt;/w-icon&gt;
        &lt;small&gt;{{ '\{\{ selectedEvent.start.format() \}\}' }}&lt;/small&gt;
        &lt;w-icon class="grey ml2"&gt;mdi mdi-clock-outline&lt;/w-icon&gt;
        &lt;small&gt;
          {{ '\{\{ selectedEvent.start.formatTime() \}\}' }}
          - {{ '\{\{ selectedEvent.end.formatTime() \}\}' }}
        &lt;/small&gt;
      &lt;/w-flex&gt;
      &lt;w-flex
        class="align-center justify-center title1 mt6 mb4"
        v-html="selectedEvent.content"&gt;
      &lt;/w-flex&gt;
      &lt;p&gt;{{ '\{\{ selectedEvent.contentFull \}\}' }}&lt;/p&gt;
    &lt;/w-dialog&gt;
  template(#code-js).
    const showDialog = ref(false)
    const selectedEvent = ref(null)

    const events = [
      {
        start: new Date(new Date().setHours(10, 30, 0, 0)),
        end: new Date(new Date().setHours(11, 30, 0, 0)),
        title: 'Doctor Appt.',
        content: '&lt;i class="icon mdi mdi-stethoscope"&gt;&lt;/i&gt;',
        contentFull: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore expedita veniam deleniti, labore corporis quas, aspernatur praesentium quia nisi, omnis quod autem.'
        class: 'health'
      },
      ...
    ]

    const openDialog = ({ event }) => {
      selectedEvent.value = event
      showDialog.value = true
    }

  vue-cal.ex--open-dialog-on-event-click(
    :events="exOpenEventDetails.events"
    :time-from="9 * 60"
    :time-to="15 * 60"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :views-bar="false"
    :dark="store.darkMode"
    @event-click="exOpenEventDetails.openDialog"
    style="height: 301px")
//- Do not indent the w-dialog into the example:
//- It causes to re-render the whole example on open/close and so, the calendar cells as well.
w-dialog(
  v-if="exOpenEventDetails.event"
  v-model="exOpenEventDetails.showDialog"
  :title="exOpenEventDetails.event.title"
  width="380")
  .w-flex.align-center.justify-end.gap2
    w-icon.grey mdi mdi-calendar
    small {{ exOpenEventDetails.event.start.format() }}
    w-icon.grey.ml2 mdi mdi-clock-outline
    small {{ exOpenEventDetails.event.start.formatTime() }} - {{ exOpenEventDetails.event.end.formatTime() }}
  .w-flex.align-center.justify-center.title1.mt6.mb4(v-html="exOpenEventDetails.event.content")
  p.lh1.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore expedita veniam deleniti,
    labore corporis quas, aspernatur praesentium quia nisi, omnis quod autem.

//- Example.
example(title="Month View Events & Count" anchor="events-on-month-view")
  template(#desc)
    ul
      li.
        When #[code events-on-month-view] is set to true, the events will show in full on the month view
        (you can customize via CSS or #[code #event] slots).
      li.
        When #[code event-count] is set to true, the events count will be shown on every cell that has
        events (you can customize via CSS or via the #[code #event-count] slots). In this example you will
        see 3 different (random) options that you can achieve with CSS.
      li In order to keep the same cell height on this view, you can set a height in CSS.
    .w-flex.column.align-end.gap1
      w-switch(
        v-model="exEventsMonthView.showEvents"
        @update:model-value="exEventsMonthView.showEvents && (exEventsMonthView.showEventCount = false)"
        label-on-left) Show Events
      w-switch(
        v-model="exEventsMonthView.showEventCount"
        @update:model-value="exEventsMonthView.showEventCount && (exEventsMonthView.showEvents = false)"
        label-on-left) Show Events Count
      w-radios(
        v-model="exEventsMonthView.eventCountStyle"
        inline
        :items="exEventsMonthView.eventCountStyleOptions"
        :disabled="!exEventsMonthView.showEventCount") Events Count Style
      p.caption For illustration, the slot option will only count orange events (with the `leisure` class).
      w-switch(
        v-model="exEventsMonthView.highlightCells"
        label-on-left) Highlight Cells with Events
  template(#code-html)
    | &lt;vue-cal
    |   :events="events"{{ exEventsMonthView.showEvents ? '\n  events-on-month-view' : '' }}{{ exEventsMonthView.showEventCount ? '\n  event-count' : '' }}
    |   :views="{ days: { cols: 5, rows: 1 }, month: {} }"
    |   view="month"&gt;
    | &lt;/vue-cal&gt;
    |
    template(v-if="exEventsMonthView.showEventCount && exEventsMonthView.eventCountStyle === 'slot'")
      |
      | &lt;!-- Only count leisure class events. --&gt;
      | &lt;template #event-count="{ events }"&gt;
      |   &lt;span v-if="events.filter(event => event.class === 'leisure').length"&gt;
      |     {{ '\{\{ events.filter(event => event.class === \'leisure\').length \}\}' }}
      |   &lt;/span&gt;
      | &lt;/template&gt;
    template(v-else)

  template(#code-css)
    | .vuecal {
    |   height: 441px;
    |
    |   .vuecal__scrollable--month-view {
    |     .vuecal__cell {height: 50px;}
    |     .vuecal__event {height: 15px;margin-top: 1px;}
    |     .vuecal__event-details {
    |       font-size: 11px;
    |       white-space: nowrap;
    |       padding: 0;
    |     }
    |     .vuecal__cell--has-events {
    |       flex-direction: row-reverse;
    |       overflow: hidden;
    |       justify-content: flex-start;
    |     }
    |   }
    |
    template(v-if="!exEventsMonthView.showEventCount")
    template(v-else-if="exEventsMonthView.eventCountStyle === 'dot'")
      |   .event-count--dot .vuecal__cell-events-count {
      |     position: absolute;
      |     bottom: 14px;
      |     right: 15%;
      |     transform: translateX(-50%);
      |     text-align: center;
      |     width: 4px;
      |     aspect-ratio: 1;
      |     overflow: hidden;
      |     background-color: currentColor;
      |     opacity: 0.3;
      |     border-radius: 100%;
      |   }
      |
    template(v-else-if="exEventsMonthView.eventCountStyle === 'dash'")
      |   .event-count--dash .vuecal__cell-events-count {
      |     position: absolute;
      |     top: 24px;
      |     right: 12px;
      |     text-align: center;
      |     width: 10px;
      |     height: 2px;
      |     overflow: hidden;
      |     background-color: var(--vuecal-base-color);
      |     opacity: 0.5;
      |     border-radius: 100rem;
      |   }
      |
    template(v-else-if="exEventsMonthView.eventCountStyle === 'caption'")
      |   .event-count--caption .vuecal__cell-events-count {
      |     position: absolute;
      |     inset: auto 2px 2px;
      |     text-align: center;
      |     opacity: 0.3;
      |     font: italic 0.7rem monospace;
      |     word-spacing: -0.1rem;
      |
      |     &amp;:before {content: '- ';}
      |     &amp;:after {content: ' events -';}
      |   }
      |
    template(v-else)

    template(v-if="exEventsMonthView.highlightCells")
      |   .vuecal__cell--has-events {background-color: {{ store.darkMode ? '#00dbff1c' : '#fffacda8' }};}
      |
    template(v-else)
    | }
  vue-cal(
    :events="events"
    :events-on-month-view="exEventsMonthView.showEvents"
    :event-count="exEventsMonthView.showEventCount"
    :time-from="8 * 60"
    :time-to="18 * 60"
    :views="{ days: { cols: 5, rows: 1 }, month: { cols: 6, rows: 7 } }"
    view="month"
    :dark="store.darkMode"
    :class="exEventsMonthView.classes")
    template(
      v-if="exEventsMonthView.showEventCount && exEventsMonthView.eventCountStyle === 'slot'"
      #event-count="{ events }")
      span.warning--bg.bdrsr.w-icon.size--xs.pa2.mr-6.mb1.align-self-end(
        v-if="events.filter(event => event.class === 'leisure').length")
        | {{ events.filter(event => event.class === 'leisure').length }}

//- Example.
example(title="Overlapping Events" anchor="overlapping-events")
  template(#desc)
  .todo-tag.d-iflex.ml2 COMING SOON
  //- template(#desc)
    p.
      Overlapping, editable &amp; deletable events.#[br]
      Try to resize &amp; delete events to see the overlapping redrawn.

    .w-flex.mb3.align-center
      | Optionally you can set a min width (in percent) to the events:
      w-button.ml2(@click="minEventWidth = minEventWidth ? 0 : 50")
        w-icon.mr1 mdi mdi-{{ minEventWidth ? 'close' : 'plus' }}
        | {{ minEventWidth ? 'min-event-width="50"' : 'Add min-event-width' }}
    div(style="min-height: 40px")
      w-transition-expand(y)
        .grey(v-if="minEventWidth").
          #[code min-event-width="50"] will only apply a min width of 50% on simultaneous
          events that would be smaller than that (e.g. with 3 events side by side)
    alert.mb6.
      In some cases you may want to set the events overlaps calculation only per same time step
      (default time step is 1 hour), like in
      #[a(href="https://github.com/antoniandre/vue-cal/pull/182" target="_blank") this use case].#[br]
      You can achieve this event overlaps grouping with the option #[code overlaps-per-time-step].
  //- template(#code-html).
    &lt;vue-cal
      editable-events
      :min-event-width="minEventWidth"
      :events="events"&gt;
    &lt;/vue-cal&gt;
  //- template(#code-js).
    data: () => ({
      minEventWidth: 0,
      events: [
        {
          start: '2018-11-21 14:00',
          end: '2018-11-21 22:00',
          title: 'A big thing',
          content: '&lt;i class="icon mdi mdi-emoticon-outline"&gt;&lt;/i&gt;',
          class: 'health'
        },
        {
          start: '2018-11-21 16:00',
          end: '2018-11-21 19:00',
          title: 'Another thing',
          content: '&lt;i class="icon mdi mdi-thumb-up-outline"&gt;&lt;/i&gt;',
          class: 'blue-event'
        },
        {
          start: '2018-11-20 18:30',
          end: '2018-11-20 20:30',
          title: 'Cross-fit',
          content: '&lt;i class="icon mdi mdi-dumbbell"&gt;&lt;/i&gt;',
          class: 'sport'
        },
        ...
      ]
    })

  //- vue-cal(
    :events="exOverlappingEvents.events"
    editable-events
    :min-event-width="minEventWidth"
    :time-from="9 * 60"
    :time-to="15 * 60"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :views-bar="false"
    :dark="store.darkMode"
    style="height: 301px")

//- Example.
example(anchor="recurring-events")
  template(#title)
    | Recurring Events
    .todo-tag.d-iflex.ml2 COMING SOON
  //- template(#desc)
    .mt4.text-bold When it will be ready, this is how it will work.
    .mb2 You can repeat an event:
    ul
      li Every day - by providing a #[code every: "day"] property.
      li Every week - by providing a #[code every: "week"] property.
      li Every month - by providing a #[code every: "month"] property.
      li Every year - by providing a #[code every: "year"] property.
      li Every specific week days - by providing a #[code weekdays] array containing the weekdays numbers (1 to 7 for Sunday).
      li Every `x` days - by providing a #[code every: x] property, with #[code x] being an integer.
      li Forever; Or until an expiry date if you provide an #[code until: {String | Date}] property.
      li Whether it's single-day, multiple-day, background, all-day, with time or timeless.
  //- template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time-from="8 * 60"
      :time-to="23 * 60"
      hide-weekends
      events-count-on-year-view
      editable-events
      show-all-day-events
      :events="events"&gt;
    &lt;/vue-cal&gt;
  //- template(#code-js).
    // month view event count => OK.
    // @todo: check years/year views event counts.
    // @todo: repeated multiple-day events does not appear if the first day is not in view (e.g. hide weekend).
    // @todo: on month view with show events, occurrences don't appear on out of scope days.
    // @todo: overlapping does not work.
    // @todo: if 2 occurrences are in the same day (multiple-day events), only one is shown.
    // @todo: check all the above points one by one.

  //- template(#desc2)
    p.
      Recurring events work like a set of single day events linked together.#[br]
      That means, deleting, resizing or editing one of the day will apply to all the other days.
    w-card.my4.maa.py12.grey-light5.elevation-1
      .text-center.title1.grey Demo coming soon.

    ssh-pre(language="js" :dark="store.darkMode").
      data: () => ({
        events: [
          {
            start: '2018-11-19 22:00',
            end: '2018-11-20 11:00',
            title: 'Nightclub',
            content: '&lt;i class="icon mdi mdi-glass-cocktail"&gt;&lt;/i&gt;',
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
            content: '&lt;i class="icon mdi mdi-pizza"&gt;&lt;/i&gt;',
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
            content: '&lt;i class="icon mdi mdi-music"&gt;&lt;/i&gt;',
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
            content: '&lt;i class="icon mdi mdi-tennis"&gt;&lt;/i&gt;',
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
            content: '&lt;i class="icon mdi silverware-fork-knife"&gt;&lt;/i&gt;',
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
            content: '&lt;i class="icon mdi mdi-cake-variant-outline"&gt;&lt;/i&gt;&lt;br&gt;I am 4.',
            class: 'blue-event',
            allDay: true,
            repeat: {
              every: 'year'
            }
          }
        ]
      })

//- Example.
example(title="All Day Events" anchor="all-day-events")
  template(#desc)
    .todo-tag.d-iflex COMING SOON
  //- template(#desc)
    ul
      li.mb2.
        When the #[code showAllDayEvents] is set to #[code true] the events with an
        #[code allDay] attribute set to #[code true] will be displayed in a fixed top
        bar on the #[code week] &amp; #[code day] views.#[br]
        The all day events bar will only show up if the options #[code showAllDayEvents] &amp;
        #[code time] are set to #[code true].#[br]
        #[code time] is important since without time information every event is an all-day
        event there is no point in separating them then.
      li.mb2.
        When #[code showAllDayEvents] is set to #[code false], all the all day events
        (#[code allDay] attribute set to #[code true]), will show up as a normal
        #[strong background event].
      li.mb2.
        On month view, switching #[code showAllDayEvents] on and off will not have any impact
        since both should display the all day events.
      li.mb2.
        #[code showAllDayEvents] accepts a #[code Boolean] or the string
        #[code 'short'], to display only the event title.

    alert.
      Multiple-day events feature will be improved in a future version to display across
      multiple cells in the all day bar.

    w-button.ma1.code(@click="exAllDayEvents.showAllDayEvents = (exAllDayEvents.showAllDayEvents + 1) % 3")
      span.white :show-all-day-events="{{ ["'short'", 'true', 'false'][exAllDayEvents.showAllDayEvents] }}"
    w-button.ma1.code(@click="exAllDayEvents.shortEventsOnMonthView = !exAllDayEvents.shortEventsOnMonthView")
      span.white :events-on-month-views="{{ ['true', "'short'"][exAllDayEvents.shortEventsOnMonthView * 1] }}"
  //- template(#code-html).
    &lt;button @click="showAllDayEvents = (showAllDayEvents + 1) % 3"&gt;
      :show-all-day-events="{{ "\{\{ [\"'short'\", 'true', 'false'][showAllDayEvents] \}\}" }}"
    &lt;/button&gt;
    &lt;button @click="shortEventsOnMonthView = !shortEventsOnMonthView"&gt;
      :events-on-month-views="{{ "\{\{ ['true', \"'short'\"][shortEventsOnMonthView * 1] \}\}" }}"
    &lt;/button&gt;

    &lt;vue-cal
      :selected-date="stringToDate('2019-02-11')"
      :time-from="7 * 60"
      :views="['day', 'week', 'month']"
      hide-weekends
      :show-all-day-events="['short', true, false][showAllDayEvents]"
      :events-on-month-view="[true, 'short'][shortEventsOnMonthView * 1]"
      :events="events"&gt;
    &lt;/vue-cal&gt;
  //- template(#code-js).
    showAllDayEvents: 0,
    shortEventsOnMonthView: false,
    events: [
      {
        start: '2019-02-12',
        end: '2019-02-12',
        title: 'Day off!',
        content: '&lt;i class="icon mdi mdi-umbrella-beach-outline"&gt;&lt;/i&gt;',
        class: 'yellow-event',
        allDay: true
      },
      {
        start: '2019-02-14',
        end: '2019-02-14',
        title: 'Valentine\'s day',
        content: '&lt;i class="icon mdi mdi-heart-outline"&gt;&lt;/i&gt;',
        class: 'pink-event',
        allDay: true
      },
      ...
    ]
  //- template(#code-css).
    .vuecal__cell-content {align-self: flex-start;}
    .vuecal__cell-date {text-align: right;padding: 4px;}

    .vuecal--week-view .vuecal__scrollable .vuecal__event--all-day.pink-event,
    .vuecal--day-view .vuecal__scrollable .vuecal__event--all-day.pink-event {right: 50%;}
    .vuecal--week-view .vuecal__scrollable .vuecal__event--all-day.leisure,
    .vuecal--day-view .vuecal__scrollable .vuecal__event--all-day.leisure {left: 50%;}

  //- vue-cal.ex--all-day-events(
    :dark="store.darkMode"
    :selected-date="stringToDate('2019-02-11')"
    :time-from="7 * 60"
    :views="['day', 'week', 'month']"
    hide-weekends
    :show-all-day-events="['short', true, false][exAllDayEvents.showAllDayEvents]"
    :events-on-month-view="[true, 'short'][exAllDayEvents.shortEventsOnMonthView * 1]"
    :events="exAllDayEvents.events")

//- Example.
example(title="Multiple Day Events" anchor="multiple-day-events")
  template(#desc)
    .todo-tag.d-iflex COMING SOON
  //- template(#desc)
    p.
      Multiple day events work like a set of single day events linked together.#[br]
      Deleting one of the day of a multiple day event, will also delete all the other days.#[br]
      Updating the duration by dragging will also update on all the days.#[br]
      Try to resize, rename and delete the events.#[br]You can also resize horizontally thanks to
      the option #[code resize-x].
    strong Drag &amp; drop is not available on multiple day events for now.

    alert(tip).
      3 CSS classes are available to target the event first day, the last day and all the days in between:
      #[code event-start], #[code event-middle], #[code event-end].
  //- template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time-from="8 * 60"
      :time-to="23 * 60"
      :views="['day', 'week']"
      hide-weekends
      editable-events
      resize-x
      :events="events"&gt;
    &lt;/vue-cal&gt;
  //- template(#code-js).
    data: () => ({
      events: [
        {
          start: '2018-11-16 10:00',
          end: '2018-11-20 12:37',
          title: 'Running Marathon',
          content: '&lt;i class="icon mdi mdi-run"&gt;&lt;/i&gt;',
          class: 'sport'
        },
        {
          start: '2018-11-20 10:00',
          end: '2018-11-20 10:25',
          title: 'Drink water!',
          content: '&lt;i class="icon mdi mdi-glass-cocktail"&gt;&lt;/i&gt;',
          class: 'health'
        },
        {
          start: '2018-11-21 19:00',
          end: '2018-11-23 11:30',
          title: 'Trip to India',
          content: '&lt;i class="icon mdi mdi-airplane"&gt;&lt;/i&gt;',
          class: 'leisure'
        }
      ]
    })
  //- vue-cal.ex--multiple-day-events(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="8 * 60"
    :time-to="23 * 60"
    hide-weekends
    events-count-on-year-view
    editable-events
    resize-x
    :events="multipleDayEvents")
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, stringToDate } from '@/vue-cal'

const store = useAppStore()

const events = [
  {
    start: new Date(new Date().setHours(11, 0)).subtractDays(2),
    end: new Date(new Date().setHours(13, 0)).subtractDays(2),
    title: 'Salsa Dance Class',
    content: '<i class="w-icon mdi mdi-dance-ballroom"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    start: new Date(new Date().setHours(12, 30)),
    end: new Date(new Date().setHours(13, 30)),
    title: 'Doctor Appt.',
    content: '<i class="w-icon mdi mdi-stethoscope"></i>',
    class: 'health',
    schedule: 1
  },
  {
    start: new Date(new Date().setHours(11, 30)).addDays(1),
    end: new Date(new Date().setHours(12, 30)).addDays(1),
    title: 'Dentist Appt.',
    content: '<i class="w-icon mdi mdi-tooth"></i>',
    class: 'health',
    schedule: 2
  },
  {
    start: new Date(new Date().setHours(13, 0)).addDays(1),
    end: new Date(new Date().setHours(14, 0)).addDays(1),
    title: 'Cross-fit',
    content: '<i class="w-icon mdi mdi-dumbbell"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    start: new Date(new Date().setHours(10, 0)).addDays(3),
    end: new Date(new Date().setHours(11, 30)).addDays(3),
    title: 'Swimming Class',
    content: '<i class="w-icon mdi mdi-swim"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    start: new Date(new Date().setHours(11, 35)).addDays(3),
    end: new Date(new Date().setHours(12, 30)).addDays(3),
    title: 'Brunch with Jane',
    content: '<i class="w-icon mdi mdi-food-croissant"></i>',
    class: 'leisure',
    schedule: 1,
    background: false
  },
  {
    start: new Date(new Date().setHours(9, 0)).addDays(4),
    end: new Date(new Date().setHours(10, 0)).addDays(4),
    title: 'Doctor Appt.',
    content: '<i class="w-icon mdi mdi-stethoscope"></i>',
    class: 'health',
    schedule: 1
  },
  {
    start: new Date(new Date().setHours(11, 30)).addDays(4),
    end: new Date(new Date().setHours(12, 25)).addDays(4),
    title: 'BK with Mark',
    content: '<i class="w-icon mdi mdi-food"></i>',
    class: 'leisure',
    schedule: 2
  },
  {
    start: new Date(new Date().setHours(12, 30)).addDays(4),
    end: new Date(new Date().setHours(14, 30)).addDays(4),
    title: 'Movie Theater',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure',
    schedule: 1
  },
  {
    start: new Date(new Date().setHours(11, 30, 21, 0)).addDays(5),
    end: new Date(new Date().setHours(12, 30, 23, 30)).addDays(5),
    title: 'Movie Night',
    content: '<i class="w-icon mdi mdi-popcorn"></i>',
    class: 'leisure',
    schedule: 1
  },
  {
    start: new Date(new Date().setHours(10, 0)).addDays(7),
    end: new Date(new Date().setHours(11, 0)).addDays(7),
    title: 'Doctor Appt.',
    content: '<i class="w-icon mdi mdi-stethoscope"></i>',
    class: 'health',
    schedule: 1
  }
]

const exEvents = reactive({
  showBgEvents: ref(false),
  bgEvents: computed(() => Array(5).fill({}).map((event, i) => ({
    start: new Date(new Date().setHours(12, 0)).addDays(i),
    end: new Date(new Date().setHours(14, 0)).addDays(i),
    class: 'lunch',
    background: true
  }))),
  events: computed(() => [
    ...events,
    ...(exEvents.showBgEvents ? exEvents.bgEvents : [])
  ])
})

const exTimelessEvents = reactive({
  events: [
    {
      start: new Date(),
      end: new Date(),
      title: 'Salsa Dance Class',
      content: '<i class="w-icon mdi mdi-dance-ballroom"></i>',
      class: 'sport'
    },
    {
      start: new Date(),
      end: new Date(),
      title: 'Dentist Appt.',
      content: '<i class="w-icon mdi mdi-tooth"></i>',
      class: 'health'
    },
    {
      start: new Date().addDays(1),
      end: new Date().addDays(1),
      title: 'Golf with John',
      content: '<i class="w-icon mdi mdi-golf"></i>',
      class: 'sport'
    },
    {
      start: new Date().addDays(2),
      end: new Date().addDays(2),
      title: 'Grocery Shopping',
      content: '<i class="w-icon mdi mdi-cart-outline"></i>',
      class: 'leisure'
    },
    {
      start: new Date().addDays(2),
      end: new Date().addDays(2),
      title: 'Dad\'s Birthday!',
      content: '<i class="w-icon mdi mdi-cake-variant-outline"></i>',
      class: 'sport'
    },
    {
      start: new Date().addDays(3),
      end: new Date().addDays(3),
      title: 'Doctor Appt.',
      content: '<i class="w-icon mdi mdi-stethoscope"></i>',
      class: 'health'
    },
    {
      start: new Date().addDays(4),
      end: new Date().addDays(4),
      title: 'Burger King',
      content: '<i class="w-icon mdi mdi-food"></i>',
      class: 'leisure'
    }
  ]
})

const exOpenEventDetails = reactive({
  showDialog: false,
  openDialog: ({ event }) => {
    exOpenEventDetails.event = event
    exOpenEventDetails.showDialog = true
  },
  events: [...events]
})

const exEventsVModel = reactive({
  counter: 0,
  events: ref([]),
  onEventCreate: ({ event, resolve }) => resolve({ ...event, title: 'Event ' + ++exEventsVModel.counter }),
  addEvent: () => exEventsVModel.events.push({
    start: new Date(),
    end: new Date().addHours(1),
    title: 'Event ' + ++exEventsVModel.counter
  })
})

const exEventsMonthView = reactive({
  showEvents: ref(true),
  showEventCount: ref(false),
  highlightCells: ref(false),
  eventCountStyle: ref('dot'),
  eventCountStyleOptions: [
    { label: 'Dot', value: 'dot' },
    { label: 'Dash', value: 'dash' },
    { label: 'Caption', value: 'caption' },
    { label: 'Use slot', value: 'slot' }
  ],
  classes: computed(() => ({
    [`event-count--${exEventsMonthView.eventCountStyle}`]: exEventsMonthView.showEventCount,
    'vuecal--highlight-cells': exEventsMonthView.highlightCells
  }))
})

const exOverlappingEvents = reactive({
  events: [
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
  ],
  minEventWidth: ref(0)
})

const exRecurringEvents = reactive({

})

const exAllDayEvents = reactive({
  showAllDayEvents: ref(0),
  events: [
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
      title: 'Grocery Shopping',
      content: '<i class="w-icon mdi mdi-cart-outline"></i>',
      class: 'leisure',
      allDay: true
    },
    {
      start: '2019-02-11 10:35',
      end: '2019-02-11 11:30',
      title: 'Doctor Appt.',
      content: '<i class="w-icon mdi mdi-stethoscope"></i>',
      class: 'health',
      schedule: 1
    },
    {
      start: '2019-02-11 18:30',
      end: '2019-02-11 19:15',
      title: 'Dentist Appt.',
      content: '<i class="w-icon mdi mdi-tooth"></i>',
      class: 'health',
      schedule: 2
    },
    {
      start: '2019-02-12 18:30',
      end: '2019-02-12 20:30',
      title: 'Cross-fit',
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
      title: 'Swimming Class',
      content: '<i class="w-icon mdi mdi-swim"></i>',
      class: 'sport',
      schedule: 2
    },
    {
      start: '2019-02-15 12:30',
      end: '2019-02-15 13:00',
      title: 'BK with Mark',
      content: '<i class="w-icon mdi mdi-food"></i>',
      class: 'leisure',
      schedule: 2
    },
    {
      start: '2019-02-15 21:00',
      end: '2019-02-15 23:30',
      title: 'Movie Theater',
      content: '<i class="w-icon mdi mdi-ticket"></i>',
      class: 'leisure',
      schedule: 1
    }
  ],
  shortEventsOnMonthView: ref(false)
})

const exMultipleDayEvents = reactive({
  events: [
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
})
</script>

<style lang="scss">
.main--examples-events-display {
  .vuecal__event {
    text-align: center;

    &.leisure {background-color: #fd9c42d9;border-color: #e9882e;}
    &.health {background-color: #57cea9cc;border-color: #90d2be;}
    &.sport {background-color: #ff6666d9;border-color: #eb5252;}
    &.pink-event {background-color: #ff3a8fb3;border-color: #eb267b;}
    &.blue-event {background-color: #64c8ffcc;border-color: #50b4eb;}
    &.yellow-event {background-color: #ffc85abf;border-color: #ffc356;}

    &.lunch {
      background: repeating-linear-gradient(45deg, transparent, transparent 10px, color-mix(in srgb, var(--w-contrast-bg-color) 6%, transparent) 10px, color-mix(in srgb, var(--w-contrast-bg-color) 6%, transparent) 20px);
      border: none;
      z-index: -1;

      .vuecal__event-time {display: none;}
    }

    i {margin: 2px 0;font-size: 23px;}

    &-title {font-weight: bold;}
  }

  .example--events-on-month-view .vuecal.vuecal--default-theme {
    height: 441px;

    .vuecal__scrollable--month-view {
      .vuecal__cell {height: 50px;}
      .vuecal__event {height: 15px;margin-top: 1px;}
      .vuecal__event-details {
        font-size: 11px;
        white-space: nowrap;
        padding: 0;
      }
      .vuecal__cell--has-events {
        flex-direction: row-reverse;
        justify-content: flex-start;
        overflow: hidden;
      }
    }
    &.vuecal--highlight-cells .vuecal__scrollable--month-view .vuecal__cell--has-events {background-color: #fffacda8;}
    &.vuecal--highlight-cells.vuecal--dark .vuecal__scrollable--month-view .vuecal__cell--has-events {background-color: #00dbff1c;}

    &.event-count--caption .vuecal__cell-events-count {
      position: absolute;
      inset: auto 2px 2px;
      text-align: center;
      opacity: 0.3;
      font: italic 0.7rem monospace;
      word-spacing: -0.1rem;

      &:before {content: '- ';}
      &:after {content: ' events -';}
    }
    &.event-count--dot .vuecal__cell-events-count {
      position: absolute;
      top: 33px;
      right: 15px;
      text-align: center;
      width: 4px;
      aspect-ratio: 1;
      overflow: hidden;
      background-color: currentColor;
      opacity: 0.3;
      border-radius: 100%;
    }
    &.event-count--dash .vuecal__cell-events-count {
      position: absolute;
      top: 24px;
      right: 12px;
      text-align: center;
      width: 10px;
      height: 2px;
      overflow: hidden;
      background-color: var(--vuecal-base-color);
      opacity: 0.5;
      border-radius: 100rem;
    }
  }

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
    &.drink-water {font-size: 0.85em;line-height: 1;padding-top: 0.2em;}
  }

  .ex--all-day-events {
    .vuecal__cell-content {
      justify-content: flex-start;
    }

    .vuecal__cell-date {
      text-align: right;
      padding: 4px;
    }

    &.vuecal--week-view .vuecal__scrollable .vuecal__event--all-day.pink-event,
    &.vuecal--day-view .vuecal__scrollable .vuecal__event--all-day.pink-event {right: 50%;}
    &.vuecal--week-view .vuecal__scrollable .vuecal__event--all-day.leisure,
    &.vuecal--day-view .vuecal__scrollable .vuecal__event--all-day.leisure {left: 50%;}
  }
}
</style>
