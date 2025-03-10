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

    h4.w-flex.justify-space-between.mb0.mt4
      title-link(div anchor="emitted-events-list")
        .title3 Emitted Events List
      w-switch.my1.body(@update:model-value="exEmittedEvents.expandedEmittedEvents = Array(30).fill($event)") Expand All
    w-divider.mb2

    w-accordion(
      v-model="exEmittedEvents.expandedEmittedEvents"
      expand-icon-rotate90
      title-class="pa0 bd0 body"
      content-class="pt0 pb3")
      .todo-tag.d-iflex REVIEW &amp; COMPLETE
      h5.mt2 View-related
      w-accordion-item
        template(#title)
          code ready
        template(#content) Fired as soon as Vue Cal is mounted in the DOM and ready.
      w-accordion-item
        template(#title)
          code view-change
        template(#content)
          p Fired on every view change.
          p Returns an object containing:
          ul
            li #[code id] #[code {String}]: The view ID. Possible values: 'day', 'days', 'week', 'month', 'year', 'years'.
            li #[code title] #[code {String}]: The view computed title.
            li #[code start] #[code {Date}]: The view start date as a navite JavaScript Date.
            li #[code end] #[code {Date}]: The view end date as a navite JavaScript Date.
            li #[code extendedStart] #[code {Date}]: The view extended start date as a navite JavaScript Date.
            li #[code extendedEnd] #[code {Date}]: The view extended end date as a navite JavaScript Date.
            li #[code cellDates] #[code {Array}]: An array containing all the view cells.
            li #[code containsToday] #[code {Bool}]: Whether the view contains the current date or not.
            li #[code events] #[code {Array}]: An array containing all the events that are currently in view.

      h5.mt2 Cell-related
      w-accordion-item
        template(#title)
          code cell-*
        template(#content) where star is any valid JavaScript DOM event that your app is listening for.
      w-accordion-item
        template(#title)
          code cell-delayed-click
        template(#content) returns a JS native #[span.code Date] object.
      w-accordion-item
        template(#title)
          code cell-drag-start
        template(#content) returns a JS native #[span.code Date] object.
      w-accordion-item
        template(#title)
          code cell-drag
        template(#content) returns a JS native #[span.code Date] object.
      w-accordion-item
        template(#title)
          code cell-drag-end
        template(#content) returns a JS native #[span.code Date] object.
      w-accordion-item
        template(#title)
          code cell-hold
        template(#content) returns a JS native #[span.code Date] object.

      h5.mt2 Event-related
      w-accordion-item
        template(#title)
          code event-*
        template(#content) where star is any valid JavaScript DOM event that your app is listening for.
      w-accordion-item
        template(#title)
          code event-delayed-click
        template(#content) returns a JS native #[span.code Date] object.
      w-accordion-item
        template(#title)
          code event-drag-start
        template(#content) returns a JS native #[span.code Date] object.
      w-accordion-item
        template(#title)
          code event-drag
        template(#content) returns a JS native #[span.code Date] object.
      w-accordion-item
        template(#title)
          code event-drag-end
        template(#content) returns a JS native #[span.code Date] object.
      w-accordion-item
        template(#title)
          code event-hold
        template(#content) returns a JS native #[span.code Date] object.
      w-accordion-item
        template(#title)
          code event-create
        template(#content)
          p.
            Fired on mouseup after the event drag creation or programmatic creation via the Vue Cal
            #[code view.createEvent()] method.
          p Returns the associated calendar event object.
      w-accordion-item
        template(#title)
          code event-created
        template(#content)
          p.
            Fired on first mounted after an event is created via drag creation or programmatically
            via the Vue Cal #[code view.createEvent()] method. Can be used to trigger an event
            scroll into view for instance:
          ssh-pre.mt1(language="js" :dark="store.darkMode").
            @event-created="event => event._.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })")
          p Returns the associated calendar event object.
      w-accordion-item
        template(#title)
          code event-delete
        template(#content) returns the associated calendar event object.
      w-accordion-item
        template(#title)
          code event-resize
        template(#content)
          span.grey Fired repeatedly while resizing#[br]
          | For performance while dragging, returns a lighter object containing:
          ul
            li #[span.code _eid], the calendar event internal id.
            li #[span.code end], the calendar event new end Date.
            li #[span.code endTimeMinutes], the calendar event new end time in minutes.
          alert(warning).
            You should only listen to this event if you have no choice. In most of cases you should
            listen to #[span.code event-duration-change] instead (fired only once at the end of the resizing).
      w-accordion-item
        template(#title)
          code event-resize-end
        template(#content)
          span.grey Fired when the event resizing is ended.
          | #[br]Returns an object containing:
          ul
            li #[span.code e], the native DOM event object
            li #[span.code event], the calendar event object with updated start, end and schedule properties
            li #[span.code overlaps], an array of all the overlapping events, or empty array if none
            li #[span.code cell], the cell object where the event was resized
            li #[span.code external], true if the event is not coming from this Vue Cal instance
      w-accordion-item
        template(#title)
          code event-drop
        template(#content)
          p.
            Fired as soon as the event is dropped. If there is a listener, it must return true or false to
            accept or reject the event drop at the new position.
            Returns an object containing:
          ul
            li #[span.code e], the native DOM event object
            li #[span.code event], the calendar event object with updated start, end and schedule properties
            li #[span.code overlaps], an array of all the overlapping events, or empty array if none
            li #[span.code cell], the cell object where the event was dropped
            li #[span.code external], true if the event is not coming from this Vue Cal instance
      w-accordion-item
        template(#title)
          code event-dropped
        template(#content)
          p Fired on event drop after the drop has been validated (not denied). Returns an object containing:
          ul
            li #[span.code e], the native DOM event object
            li #[span.code cell], the cell object where the event was dropped
            li #[span.code event], the calendar event object that was dropped
            li #[span.code originalEvent], the calendar original event object before the drag and drop
            li #[span.code external], true if the event is not coming from this Vue Cal instance
      //- alert(tip)
        ul
          li.
            #[span.code cell-click] is fired every time you click a day, whereas
            #[span.code cell-focus] is fired only when the selected day changes.
          li.
            #[span.code cell-click], #[span.code cell-dblclick], #[span.code cell-contextmenu]
            and #[span.code cell-focus] return the time at cursor position, unless the cell
            was focused from tab key.
            It would then return the cell start date (at midnight).
          li.
            If schedules is provided, #[span.code cell-click], #[span.code cell-dblclick], #[span.code cell-keypress-enter]
            and #[span.code cell-focus] emitted events will return an object containing the date and the clicked schedule id.

      //- alert
        | The emitted events #[span.code ready] &amp; #[span.code view-change] return an object:#[br]
        ssh-pre.mt2(language="js" :dark="store.darkMode").
          {
            view: [String],
            start: [Date], // View start - JS native Date object.
            end: [Date], // View end - JS native Date object.
            firstCellDate: [Date], // Month view only, in case cell is out of current month - JS native Date object.
            lastCellDate: [Date], // Month view only, in case cell is out of current month - JS native Date object.
            outOfScopeEvents: [Array], // Month view only, all the events that are out of the current month.
            events: [Array], // All the events in the current view.
            week: [Integer] // Week number. Only returned if view is 'week'.
          }
        strong.
          Note that on a month view, the events from the out of scope days
          (cells before and after the current month) are also returned in the array.

      //- alert(tip)
        ul
          li.mt3.
            To help you manipulate an event's date, Vue Cal returns native #[span.code Date]
            objects in the event properties #[span.code start] &amp; #[span.code end].#[br]
            So for instance, you can easily access the day of the week of an event with #[span.code event.start.getDay()].#[br]
            You can then use Vue Cal #[a(href="#date-prototypes") Date prototypes] to manipulate and format the Date as you want.

    p.mt4.mb0 Better than theory, observe the events real-time in this logs box while interacting with Vue Cal:
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
          v-bind="{ [view === 'day' ? 'bg-color' : 'color']: 'primary-dark1' }"
          :outline="view !== 'day'"
          @click="view = 'day'")
          | Day
        w-button.px2.grow(
          v-bind="{ [view === 'week' ? 'bg-color' : 'color']: 'primary-dark1' }"
          :outline="view !== 'week'"
          @click="view = 'week'")
          | Week
        w-button.px2.grow(
          v-bind="{ [view === 'month' ? 'bg-color' : 'color']: 'primary-dark1' }"
          :outline="view !== 'month'"
          @click="view = 'month'")
          | Month
        w-button.px2.grow(
          v-bind="{ [view === 'year' ? 'bg-color' : 'color']: 'primary-dark1' }"
          :outline="view !== 'year'"
          @click="view = 'year'")
          | Year
        w-button.px2.grow(
          v-bind="{ [view === 'years' ? 'bg-color' : 'color']: 'primary-dark1' }"
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
          p Will drilldown the current view on selected date if there is a narrower view available.
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
example(title="Sync two vue-cal instances" anchor="sync-two-calendars")
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
      hide-weekends
      @cell-focus="selectedDate = $event"&gt;
    &lt;/vue-cal&gt;
    &lt;vue-cal
      sm
      :time="false"
      :views-bar="false"
      view="week"
      :views="['day', 'week']"
      hide-weekends
      :selected-date="selectedDate"
      class="vuecal--blue-theme"&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
      data: () => ({
        selectedDate: null
      })
  template(#desc2)
    .w-flex.align-center.justify-center.wrap.gap2
      vue-cal(
        :views-bar="false"
        date-picker
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
import { VueCal, stringToDate } from '@/vue-cal'

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

const exExternalControls = reactive({

})

const exSyncTwoCalendars = reactive({
  selectedDate: ref(null),
  viewDate: ref(null)
})
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
