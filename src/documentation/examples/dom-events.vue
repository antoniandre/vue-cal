<template lang="pug">
//- Example.
example(title="Vue Cal Emitted Events" anchor="emitted-events")
  template(#desc)
    p.mb0.
      Vue Cal emits events that you can listen to, to trigger an action outside of Vue Cal.#[br]
    alert
      | If you are not familiar with Vue JS events, you should read about it in the
      a.ml1.text-bold(href="https://https://vuejs.org/guide/essentials/event-handling.html" target="_blank")
        | official Vue documentation.
        w-icon.ml1(color="primary") mdi mdi-open-in-new

    p.
      Here is a quick list of all the events that Vue Cal emits, but you can find more details in the
      #[router-link(to="/api#emitted-events") emitted events section].
    ul
      li #[code ready]
      li #[code view-change]
      li #[code cell-*]
      li #[code cell-delayed-click]
      li #[code cell-drag-start]
      li #[code cell-drag]
      li #[code cell-drag-end]
      li #[code cell-hold]
      li #[code event-*]
      li #[code event-delayed-click]
      li #[code event-drag-start]
      li #[code event-drag]
      li #[code event-drag-end]
      li #[code event-hold]
      li #[code event-create]
      li #[code event-created]
      li #[code event-delete]
      li #[code event-resize]
      li #[code event-resize-end]
      li #[code event-drop]
      li #[code event-dropped]
    p.mt4.mb0.
      Better than theory, try interacting with Vue Cal below and observe the emitted events in real-time
      in this logs box:
    .caption.lh0.my1 The #[span.code event-drag] event logging is disabled for performance reasons (too many events).
    .logs-box.bd1.bdrs2.ovh
      .w-flex.wrap.align-center.justify-end.ml2.mr1
        .grey //&nbsp;
          strong event-name:&nbsp;
          span { arguments }
        .spacer
        w-button.mt1.mr1(
          outline
          sm
          @click="exEmittedEvents.logMouseEvents = !exEmittedEvents.logMouseEvents"
          tooltip="Will also log events on<br><code>cell-mousemove</code>, <code>cell-mouseenter</code>, <code>cell-mouseleave</code>."
          :tooltip-props="{ alignRight: true }")
          w-icon.mr1 mdi mdi-{{ exEmittedEvents.logMouseEvents ? 'trash-can-outline' : 'plus' }}
          | {{ exEmittedEvents.logMouseEvents ? 'remove' : 'Add' }} Mouse Move &amp; Hover Events
        w-button.mt1(outline sm @click="exEmittedEvents.clearEventsLog")
          w-icon.mr1(xs) mdi mdi-trash-can-outline
          | Clear Logs

      ssh-pre.ma0.py0.scrollable(
        ref="logsBoxEl"
        language="js"
        :dark="store.darkMode")
        .mt1(v-for="(l, i) in exEmittedEvents.logs" :key="i")
          | {{ i ? "\n\n" : '' }}{{ l.name }}: {{ l.args }}

    .example.mt6.mb2.mxa
      vue-cal(
        :dark="store.darkMode"
        :time-from="7 * 60"
        :time-to="23 * 60"
        :views="['day', 'week', 'month']"
        editable-events
        :events="events"
        @ready="exEmittedEvents.logEvents('ready', $event)"
        @view-change="exEmittedEvents.logEvents('view-change', $event)"
        @event-create="exEmittedEvents.open"
        @event-mousedown="exEmittedEvents.logEvents('event-mousedown', $event)"
        @event-mouseup="exEmittedEvents.logEvents('event-mouseup', $event)"
        @event-click="exEmittedEvents.logEvents('event-click', $event)"
        @event-dblclick="exEmittedEvents.logEvents('event-dblclick', $event)"
        @event-hold="exEmittedEvents.logEvents('event-hold', $event)"
        @event-drag-start="exEmittedEvents.logEvents('event-drag-start', $event)"
        @event-drag="true/* exEmittedEvents.logEvents('event-drag', $event) // Disabled for performance. */"
        @event-drag-end="exEmittedEvents.logEvents('event-drag-end', $event)"
        @event-drop="exEmittedEvents.logEvents('event-drop', $event)"
        @event-resize="exEmittedEvents.logEvents('event-resize', $event)"
        @event-resize-end="exEmittedEvents.logEvents('event-resize-end', $event)"
        @event-contextmenu="exEmittedEvents.logEvents('event-contextmenu', $event)"
        @cell-click="exEmittedEvents.logEvents('cell-click', $event)"
        @cell-dblclick="exEmittedEvents.logEvents('cell-dblclick', $event)"
        @cell-drag-start="exEmittedEvents.logEvents('cell-drag-start', $event)"
        @cell-drag="exEmittedEvents.logEvents('cell-drag', $event)"
        @cell-drag-end="exEmittedEvents.logEvents('cell-drag-end', $event)"
        @cell-hold="exEmittedEvents.logEvents('cell-hold', $event)"
        @cell-mousemove="exEmittedEvents.logMouseEvents && exEmittedEvents.logEvents('cell-mousemove', $event)"
        @cell-mouseenter="exEmittedEvents.logMouseEvents && exEmittedEvents.logEvents('cell-mouseenter', $event)"
        @cell-mouseleave="exEmittedEvents.logMouseEvents && exEmittedEvents.logEvents('cell-mouseleave', $event)"
        @cell-mousedown="exEmittedEvents.logEvents('cell-mousedown', $event)"
        @cell-mouseup="exEmittedEvents.logEvents('cell-mouseup', $event)"
        @cell-touchstart="exEmittedEvents.logEvents('cell-touchstart', $event)"
        @cell-contextmenu="exEmittedEvents.logEvents('cell-contextmenu', $event)")

  template(#code-html).
    &lt;vue-cal
      :time-from="7 * 60"
      :time-to="23 * 60"
      :views="['day', 'week', 'month']"
      editable-events
      :events="events"
      @ready="logEvents('ready', $event)"
      @view-change="logEvents('view-change', $event)"
      @event-create="open"
      @event-mousedown="logEvents('event-mousedown', $event)"
      @event-mouseup="logEvents('event-mouseup', $event)"
      @event-click="logEvents('event-click', $event)"
      @event-dblclick="logEvents('event-dblclick', $event)"
      @event-hold="logEvents('event-hold', $event)"
      @event-drag-start="logEvents('event-drag-start', $event)"
      @event-drag="logEvents('event-drag', $event)"
      @event-drag-end="logEvents('event-drag-end', $event)"
      @event-drop="logEvents('event-drop', $event)"
      @event-resize="logEvents('event-resize', $event)"
      @event-resize-end="logEvents('event-resize-end', $event)"
      @event-contextmenu="logEvents('event-contextmenu', $event)"
      @cell-click="logEvents('cell-click', $event)"
      @cell-dblclick="logEvents('cell-dblclick', $event)"
      @cell-drag-start="logEvents('cell-drag-start', $event)"
      @cell-drag="logEvents('cell-drag', $event)"
      @cell-drag-end="logEvents('cell-drag-end', $event)"
      @cell-hold="logEvents('cell-hold', $event)"
      @cell-mousemove="logEvents('cell-mousemove', $event)"
      @cell-mouseenter="logEvents('cell-mouseenter', $event)"
      @cell-mouseleave="logEvents('cell-mouseleave', $event)"
      @cell-mousedown="logEvents('cell-mousedown', $event)"
      @cell-mouseup="logEvents('cell-mouseup', $event)"
      @cell-touchstart="logEvents('cell-touchstart', $event)"
      @cell-contextmenu="logEvents('cell-contextmenu', $event)"&gt;
    &lt;/vue-cal&gt;

//- Example.
example(title="Loading Events from a Backend" anchor="loading-events-from-backend")
  template(#desc)
    p.
      Vue Cal can easily load events from a backend service whenever the view changes.
      This is particularly useful when dealing with large datasets or remote data sources.#[br]
      In this example, we'll simulate loading events from a backend by generating random events
      for the current view's date range.
    p.mb2.
      The key to this approach is listening to the #[span.code @view-change] event, which provides
      the current view's start and end dates. We can then fetch events that fall within this date range.
    p.mb2.
      In the example below, try navigating between the weeks and observe how new events are loaded for
      each week. In a real application, you would replace the #[span.code generateRandomEvents] function
      with an actual API call to your backend.

  template(#code-html).
    &lt;vue-cal
      :events="events"
      @view-change="onViewChange"&gt;
    &lt;/vue-cal&gt;

  template(#code-js).
    import { ref } from 'vue'
    import { stringToDate, countDays } from 'vue-cal'

    const events = ref([])

    // This function is called whenever the calendar view changes.
    const onViewChange = view => {
      // `.format()` is an added Date prototype by vue-cal.
      fetchEvents(view.start.format(), view.end.format())
    }

    // Fetch events from a backend for the given date range.
    const fetchEvents = async (start, end) => {
      // In a real application, you would make an API call here.
      // For this example, we're simulating a backend response with a delay.
      console.log('Fetching events from', start, 'to', end)
      await new Promise(resolve => setTimeout(resolve, 500))

      const startDate = stringToDate(start)
      const endDate = stringToDate(end)

      // Generate random events for demonstration.
      events.value = generateRandomEvents(startDate, endDate)
    }

    // Generate random events for a date range (simulating backend data).
    const generateRandomEvents = (startDate, endDate) => {
      const daysRange = countDays(startDate, endDate)
      const events = []
      let eventNumber = 0

      for (let i = 0; i < daysRange; i++) {
        // Create 2-3 random events per day.
        const eventsPerDay = Math.floor(Math.random() * 2) + 2

        for (let j = 0; j < eventsPerDay; j++) {
          // Random time between 9am and 5pm, events last 1 hour
          const hourStart = Math.floor(Math.random() * 8) + 9
          const minuteStart = Math.floor(Math.random() * 60)

          const start = new Date(startDate.addDays(i).setHours(hourStart, minuteStart, 0, 0))
          const end = new Date(start.getTime() + 60 * 60 * 1000) // 1 hour later

          events.push({
            title: `Event ${++eventNumber}`,
            start,
            end,
            class: ['health', 'sport', 'leisure'][Math.floor(Math.random() * 3)]
          })
        }
      }

      return events
    }

  .example.mt2.mb2.mxa
    vue-cal(
      :dark="store.darkMode"
      :time-from="9 * 60"
      :time-to="18 * 60"
      :views-bar="false"
      :events="exBackendEvents.events"
      @ready="exBackendEvents.onReady"
      @view-change="exBackendEvents.onViewChange"
      style="height: 421px")

    w-progress.mt-1(v-if="exBackendEvents.loading")
    .caption.text-center
      template(v-if="exBackendEvents.loading") Loading events...
      template(v-else) {{ exBackendEvents.eventsTotal }} events loaded.

//- Example.
example(title="External Controls & use of Vue Cal Methods" anchor="external-controls")
  template(#desc)
    p.
      You can access any #[strong Vue Cal] internal method through Vue refs.#[br]
      This example shows how to control the Previous, Next and Today functions and the view selections
      from external buttons.#[br]
      One important thing to notice is that you can use a v-model on the #[span.code view] (or #[span.code :view.sync] for Vue 2)
      in order to keep your variable updated when Vue Cal changes the view internally. For instance when you click the title to go
      to a broader view.#[br]
      A v-model can also be used on the #[span.code selected-date] (or #[span.code :selected-date.sync] for Vue 2)

    .mxa.my2(style="max-width: 500px")
      .w-flex.gap2.basis-zero
        w-button.px2.grow(
          v-bind="view === 'day' && { 'bg-color': 'primary-dark1', color: 'white' }"
          :outline="view !== 'day'"
          @click="view = 'day'")
          | Day
        w-button.px2.grow(
          v-bind="view === 'week' && { 'bg-color': 'primary-dark1', color: 'white' }"
          :outline="view !== 'week'"
          @click="view = 'week'")
          | Week
        w-button.px2.grow(
          v-bind="view === 'month' && { 'bg-color': 'primary-dark1', color: 'white' }"
          :outline="view !== 'month'"
          @click="view = 'month'")
          | Month
        w-button.px2.grow(
          v-bind="view === 'year' && { 'bg-color': 'primary-dark1', color: 'white' }"
          :outline="view !== 'year'"
          @click="view = 'year'")
          | Year
        w-button.px2.grow(
          v-bind="view === 'years' && { 'bg-color': 'primary-dark1', color: 'white' }"
          :outline="view !== 'years'"
          @click="view = 'years'")
          | Years

      .w-flex.gap2.my2.basis-zero
        w-button.grow(bg-color="primary" @click="$refs.vuecal4.view.previous()")
          w-icon.mr1 mdi mdi-arrow-left
          | Previous
        w-button.grow(bg-color="primary" @click="$refs.vuecal4.view.switch('day', new Date())")
          w-icon.mr1 mdi mdi-map-marker-outline
          | Today
        w-button.grow(bg-color="primary" @click="$refs.vuecal4.view.next()")
          | Next
          w-icon.ml1 mdi mdi-arrow-right
      vue-cal(
        ref="vuecal4"
        v-model:view="view"
        v-model:selected-date="selectedDate"
        :time="false"
        :views-bar="false"
        :dark="store.darkMode"
        small)
    p
      strong Variables kept in sync thanks to v-model:
    ul
      li #[code view]: #[strong.code {{ view }} ],
      li #[code selectedDate]: #[strong.code {{ selectedDate && selectedDate.format() }} ]
  template(#code-html).
    &lt;button @click="view = 'day'"&gt;Day&lt;/button&gt;
    &lt;button @click="view = 'week'"&gt;Week&lt;/button&gt;
    &lt;button @click="view = 'month'"&gt;Month&lt;/button&gt;
    &lt;button @click="view = 'year'"&gt;Year&lt;/button&gt;
    &lt;button @click="view = 'years'"&gt;Years&lt;/button&gt;
    &lt;br /&gt;
    &lt;button @click="$refs.vuecal.view.previous()"&gt;Previous&lt;/button&gt;
    &lt;button @click="$refs.vuecal.view.switch('day', new Date())"&gt;Today&lt;/button&gt;
    &lt;button @click="$refs.vuecal.view.next()"&gt;Next&lt;/button&gt;

    &lt;vue-cal
      ref="vuecal"
      v-model:view="view"
      v-model:selected-date="selectedDate"
      :time="false"
      :views-bar="false"
      small&gt;
    &lt;/vue-cal&gt;

  template(#desc2)
    h5.subtitle-1.font-weight-bold Other useful Vue Cal internal methods &amp; Date prototypes
    alert(tip)
      | Along with these Vue Cal internal methods that you can use externally,
      | you can also call other useful Vue Cal methods.
      ul
        li
          code switchToNarrowerView()
          p Will drill down the current view on selected date if there is a narrower view available.
        li
          code minutesAtCursor(e)
          p.
            Will return the time (in minutes) at the cursor position when a DOM event occurs.
            `e` is the DOM event.

      strong Useful #[span.code Date] prototypes
      p.
        Don't miss out on these convenient functions! Read on in the
        #[a(href="date-prototypes") #[span.code Date] prototypes section].

//- Example.
example(title="Sync Two Vue Cal Instances" anchor="sync-two-calendars")
  template(#desc)
    p.
      In this example the right calendar is used as a date picker and the selected date is
      updated on the left calendar via the #[span.code @cell-focus] event listener.#[br]
      To know more about emitted events refer to the
      #[a(href="#ex--emitted-events") emitted events example].
  template(#code-html).
    &lt;vue-cal
      date-picker
      :views-bar="false"
      v-model:selected-date="selectedDate"
      @update:selected-date="viewDate = $event"
      :view-date="viewDate"&gt;
    &lt;/vue-cal&gt;

    &lt;vue-cal
      v-model:view-date="exSyncTwoCalendars.viewDate"
      v-model:selected-date="exSyncTwoCalendars.selectedDate"
      @update:view-date="exSyncTwoCalendars.viewDate = $event"
      view="week"
      :views="['day', 'week']"
      :views-bar="false"
      sm&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
    const selectedDate = ref(null)
  template(#desc2)
    .w-flex.align-center.justify-center.wrap.gap2
      vue-cal(
        date-picker
        :views-bar="false"
        v-model:selected-date="exSyncTwoCalendars.selectedDate"
        @update:selected-date="exSyncTwoCalendars.viewDate = $event"
        :view-date="exSyncTwoCalendars.viewDate"
        :dark="store.darkMode")
      vue-cal.grow(
        v-model:view-date="exSyncTwoCalendars.viewDate"
        v-model:selected-date="exSyncTwoCalendars.selectedDate"
        @update:view-date="exSyncTwoCalendars.viewDate = $event"
        view="week"
        :views="['day', 'week']"
        :views-bar="false"
        :dark="store.darkMode"
        sm)
</template>

<script setup>
import { computed, nextTick, reactive, ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, stringToDate, countDays } from '@/vue-cal'

const store = useAppStore()
const view = ref('week')
const selectedDate = ref(null)

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

const logsBoxEl = ref(null)
const exEmittedEvents = reactive({
  expandedEmittedEvents: ref(Array(30).fill(false)),
  logs: ref([]),
  clearEventsLog: () => (exEmittedEvents.logs = []),
  logMouseEvents: ref(false),
  logEvents: (eventName, params) => {
    // Filter out mouse move and mouseenter/leave events.
    if (!exEmittedEvents.logMouseEvents && eventName.includes('-mouse')) return true

    if (params.cell) params.cell = { ...params.cell, events: params.cell.events.value }
    if (params.e) params.e = `[${params.e.constructor.name}]`

    exEmittedEvents.logs.push({ name: eventName, args: JSON.stringify(params, null, 2) })
    const scrollableEl = logsBoxEl.value?.$el
    nextTick(() => scrollableEl?.scrollTo?.({ top: scrollableEl.scrollHeight, behavior: 'smooth' }))

    return true
  }
})

const exBackendEvents = reactive({
  loading: false,
  events: [],
  eventsTotal: ref(0),
  onReady: ({ view: { start, end } }) => {
    exBackendEvents.events.push({
      title: 'NAVIGATE WEEKS TO LOAD EVENTS!',
      start: new Date(start.addDays(3).setHours(10, 0, 0, 0)),
      end: new Date(start.addDays(3).setHours(14, 0, 0, 0))
    })
  },
  onViewChange: async view => {
    exBackendEvents.loading = true
    // Simulate fetching events from a backend for the given formatted date range
    // and return the events with a delay.
    await fetchEvents(view.start.format(), view.end.format())
    exBackendEvents.loading = false
  }
})

const exExternalControls = reactive({
})

const exSyncTwoCalendars = reactive({
  selectedDate: ref(null),
  viewDate: ref(null)
})

/*
 * Fetch events from a backend.
 *
 * @param {string} start - The start date.
 * @param {string} end - The end date.
 * @returns {Promise<void>}
 */
const fetchEvents = async (start, end) => {
  await new Promise(resolve => setTimeout(resolve, 400))
  const startDate = stringToDate(start)
  const endDate = stringToDate(end)
  exBackendEvents.events = generateRandomEvents(startDate, endDate)
  exBackendEvents.eventsTotal += exBackendEvents.events.length
}

/*
 * Generate random events for a given date range as if they were returned from a backend.
 *
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {Array} The events.
 */
const generateRandomEvents = (startDate, endDate) => {
  const daysRange = countDays(startDate, endDate)
  const events = []
  let eventNumber = 0
  for (let i = 0; i < daysRange; i++) {
    for (let j = 0; j < 10; j++) {
      // Set random start and end time in the day, events last 1 hour.
      // The random start and end time is between 9am and 5pm.
      const start = new Date(startDate.addDays(i).setHours(Math.floor(Math.random() * 8) + 9, Math.floor(Math.random() * 60), 0, 0))
      const end = start.addHours(1)
      events.push({ title: `Event ${++eventNumber}`, start, end })
    }
  }
  return events
}
</script>

<style lang="scss">
.main--examples-dom-events {
  .logs-box {
    background-color: color-mix(in srgb, var(--w-contrast-bg-color) 5%, var(--w-base-bg-color));

    .scrollable {
      border: none;
      overflow: auto;
      margin-top: 2px;
      padding-bottom: 4px;
    }
    .scrollable:before {display: none;}
  }
}
</style>
