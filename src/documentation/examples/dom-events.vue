<template lang="pug">
//- Example.
//- example(title="" anchor="")
  template(#desc)
  template(#code-html).




//- Example.
example(title="Vue Cal Emitted Events" anchor="emitted-events")
  template(#desc)
    p.mb0.
      Vue Cal emits events that you can listen to, to trigger an action outside of Vue Cal.#[br]
      If you are not familiar with Vue JS events, you should read about it here:
      #[a(href="https://vuejs.org/v2/guide/events.html" target="_blank") vuejs.org/v2/guide/events.html #[w-icon(color="primary") mdi mdi-open-in-new]]#[br]#[br]
      Here is the list of emitted events:
    h4.mt2 View-related
    ul
      li #[code ready]
      li #[code view-change]
      li #[code cell-*] - where star is any valid JavaScript DOM event
      li #[code cell-drag-start] - returns a JS native #[span.code Date] object
      li #[code cell-drag] - returns a JS native #[span.code Date] object
      li #[code cell-drag-end] - returns a JS native #[span.code Date] object
      li #[code cell-hold] - returns a JS native #[span.code Date] object
    alert(tip)
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

    alert
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

    h4.mt2 Events-related
    ul
      li.mt3 #[code.mr1 event-*] - where star is any valid JavaScript DOM event.
      li.mt3 #[code.mr1 event-create] - returns the associated calendar event object.
      li.mt3 #[code.mr1 event-hold] - returns the associated calendar event object.
      li.mt3 #[code.mr1 event-drag-start] - returns the associated calendar event object.
      li.mt3 #[code.mr1 event-drag] - returns the associated calendar event object.
      li.mt3 #[code.mr1 event-drag-end] - returns the associated calendar event object.
      li.mt3
        code.mr1 event-drag-create
        span.grey (only fired on mouseup after the event drag creation)
        p Returns the associated calendar event object.
      li.mt3 #[code.mr1 event-delete] - returns the associated calendar event object.
      li.mt2 #[code event-title-change] - returns an object containing:
        ul
          li #[span.code event], the calendar event object that was dropped
          li #[span.code oldTitle], the title of the event before it was edited

      //- li #[span.code event-content-change]
      li.mt2
        code.mr1 event-duration-change
        span.grey (only fired at the end of the event resizing)
        | #[br]Returns an object containing:
        ul
          li #[span.code event], the calendar event object that was resized
          li #[span.code oldDate], the Javascript Date the event was ending at before resize
          li #[span.code originalEvent], the same calendar event before the change
      li.mt2
        code.mr1 event-resizing
        span.grey Fired repeatedly while resizing
        | #[br]For performance while dragging, returns a lighter object containing:
        ul
          li #[span.code _eid], the calendar event internal id.
          li #[span.code end], the calendar event new end Date.
          li #[span.code endTimeMinutes], the calendar event new end time in minutes.
        alert(warning).
          You should only listen to this event if you have no choice. In most of cases you should
          listen to #[span.code event-duration-change] instead (fired only once at the end of the resizing).
      li.mt2
        code.mr1 event-drop
        | - returns an object containing:
        ul
          li #[span.code event], the calendar event object that was dropped
          li #[span.code oldDate], the Javascript Date the event was starting from before drag
          li #[span.code newDate], the Javascript Date the event is now starting from
          li #[span.code oldSchedule] only if schedules, the id of the schedule the event came from
          li #[span.code newSchedule] only if schedules, the id of the schedule the event is dropped into
      li.mt3 #[code.mr1 event-change] - returns an object containing:
        ul
          li #[span.code event], the calendar event object that was changed
          li.
            #[span.code originalEvent], the same calendar event before the change
            (#[span.code null] when creating event)

    alert(tip)
      ul
        li.
          The #[span.code event-change] emitted event groups all the events triggered on a calendar event property change:
          #[span.code event-title-change], #[span.code event-drop],
          #[span.code event-duration-change] and #[span.code event-create]. So you have the choice to listen to
          #[span.code event-change] to cover any calendar event change or listen to a specific action emitted event.
        li.mt3.
          To help you manipulate an event's date, Vue Cal returns native #[span.code Date]
          objects in the event properties #[span.code start] &amp; #[span.code end].#[br]
          So for instance, you can easily access the day of the week of an event with #[span.code event.start.getDay()].#[br]
          You can then use Vue Cal #[a(href="#date-prototypes") Date prototypes] to manipulate and format the Date as you want.

    p.mb0 Watch the list of emitted events (#[strong latest on top]) as you play with Vue Cal:
    pre.mt2.ssh-pre.mb2.logs-box
      .w-flex.wrap.align-center.justify-end
        .grey //&nbsp;
          strong event-name:&nbsp;
          span arguments-list
        .spacer
        w-button.my1(color="primary" outline @click="clearEventsLog")
          w-icon.mr1 mdi mdi-close
          | Clear log
        w-button.my1.ml2(color="primary" outline @click="logMouseEvents = !logMouseEvents")
          w-icon.mr1 mdi mdi-{{ logMouseEvents ? 'close' : 'plus' }}
          | {{ logMouseEvents ? 'Hide' : 'Track' }} mouse hover events
      .scrollable
        .mt1(v-for="(l, i) in reversedLogs" :key="i")
          .w-divider.mb1.grey-light2(v-if="i")
          strong.mr1 {{ l.name }}:
          span {{ l.args.replace(/,/g, m => ', ').replace(/":(?=["\w\[\{])/g, m => '": ') }}
    .example.mt6.mb2.mxa
      vue-cal(
        :dark="store.darkMode"
        :selected-date="stringToDate('2018-11-19')"
        :time-from="7 * 60"
        :time-to="23 * 60"
        :views="['day', 'week', 'month']"
        hide-weekends
        editable-events
        :events="events"
        cell-contextmenu
        @ready="logEvents('ready', $event)"
        @view-change="logEvents('view-change', $event)"
        @cell-click="logEvents('cell-click', $event)"
        @cell-dblclick="logEvents('cell-dblclick', $event)"
        @cell-contextmenu="logEvents('cell-contextmenu', $event)"
        @cell-focus="logEvents('cell-focus', $event)"
        @event-focus="logEvents('event-focus', $event)"
        @event-mouse-enter="logMouseEvents && logEvents('event-mouse-enter', $event)"
        @event-mouse-leave="logMouseEvents && logEvents('event-mouse-leave', $event)"
        @event-title-change="logEvents('event-title-change', $event)"
        @event-content-change="logEvents('event-content-change', $event)"
        @event-duration-change="logEvents('event-duration-change', $event)"
        @event-drop="logEvents('event-drop', $event)"
        @event-create="logEvents('event-create', $event)"
        @event-drag-create="logEvents('event-drag-create', $event)"
        @event-delete="logEvents('event-delete', $event)")

  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time-from="7 * 60"
      :time-to="23 * 60"
      :views="['day', 'week', 'month']"
      hide-weekends
      editable-events
      :events="events"
      cell-contextmenu
      @ready="logEvents('ready', $event)"
      @view-change="logEvents('view-change', $event)"
      @cell-click="logEvents('cell-click', $event)"
      @cell-dblclick="logEvents('cell-dblclick', $event)"
      @cell-contextmenu="logEvents('cell-contextmenu', $event)"
      @cell-focus="logEvents('cell-focus', $event)"
      @event-focus="logEvents('event-focus', $event)"
      @event-mouse-enter="logEvents('event-mouse-enter', $event)"
      @event-mouse-leave="logEvents('event-mouse-leave', $event)"
      @event-title-change="logEvents('event-title-change', $event)"
      @event-content-change="logEvents('event-content-change', $event)"
      @event-duration-change="logEvents('event-duration-change', $event)"
      @event-drop="logEvents('event-drop', $event)"
      @event-create="logEvents('event-create', $event)"
      @event-drag-create="logEvents('event-drag-create', $event)"
      @event-delete="logEvents('event-delete', $event)"&gt;
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
      small
      :time="false"
      :views-bar="false"
      view="week"
      :views="['day', 'week']"
      :selected-date="selectedDate"
      class="vuecal--blue-theme"
      style="max-width: 360px;height: 260px"&gt;
    &lt;/vue-cal&gt;
    &lt;vue-cal
      xs
      :time="false"
      :views-bar="false"
      view="month"
      :views="['month']"
      @cell-focus="selectedDate = $event"
      class="vuecal--blue-theme vuecal--rounded-theme"
      style="max-width: 270px;height: 290px"&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
      data: () => ({
        selectedDate: null
      })
  template(#desc2)
    .w-flex.align-center.justify-center.wrap
      vue-cal.vuecal--rounded-theme(
        :time="false"
        :views-bar="false"
        date-picker
        @cell-focus="selectedDate = $event"
        :dark="store.darkMode"
        xs
        style="max-width: 270px;height: 290px;transform: scale(0.9)")
      vue-cal(
        :time="false"
        :views-bar="false"
        view="week"
        :views="['day', 'week']"
        :selected-date="selectedDate"
        :dark="store.darkMode"
        small
        style="max-width: 360px;height: 260px")

//- Example.
example(title="Modifying the array of events outside of Vue Cal" anchor="modifying-events-from-outside")
  template(#desc)
    alert.mb4(tip).
      It is possible to modify the array of events like adding or removing an event
      after the first load, but be aware that by doing so all the events in Vue Cal
      will be replaced by the new array of events. You may lose your changes if you
      modified events within Vue Cal.
    w-button.ma1(@click="eventsCopy.push({ start: '2018-11-20 12:00', end: '2018-11-20 17:00', title: 'A new event', class: 'blue-event' })")
      w-icon.mr2 mdi mdi-plus
      | Add an event
    w-button.ma1(@click="eventsCopy.pop()")
      w-icon.mr2 mdi mdi-close
      | Remove last event
    p.mb0 Here is the live array of event titles:
    pre {{ eventsCopy.map(e => e.title) }}
  template(#code-html).
    &lt;button
      @click="events.push({
        start: '2018-11-20 12:00',
        end: '2018-11-20 17:00',
        title: 'A new event',
        class: 'blue-event'
      })"&gt;Add an event&lt;/button&gt;
    &lt;button @click="events.pop()"&gt;Remove last event&lt;/button&gt;

    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time-from="9 * 60"
      :time-to="23 * 60"
      :views="['day', 'week']"
      hide-weekends
      :events="events"&gt;
    &lt;/vue-cal&gt;

  template(#code-js).
      data: () => ({
        events: [
          {
            start: '2018-11-19 10:35',
            end: '2018-11-19 11:30',
            title: 'Doctor appointment',
            content: '&lt;i class="icon mdi mdi-hospital-box-outline"&gt;&lt;/i&gt;',
            class: 'health'
          },
          ...
        ]
      })
  vue-cal(
    :selected-date="stringToDate('2018-11-19')"
    :time-from="9 * 60"
    :time-to="23 * 60"
    :views="['day', 'week']"
    hide-weekends
    :events="eventsCopy"
    :dark="store.darkMode")
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, stringToDate } from '@/vue-cal'

const store = useAppStore()
const logs = ref([])
const view = ref('week')
const logMouseEvents = ref(false)
const selectedDate = ref(null)

// Computed.
const reversedLogs = computed(() => logs.value.slice(0).reverse())

// Methods.
const logEvents = (emittedEventName, params) => {
  if (!logMouseEvents && emittedEventName.includes('event-mouse')) return

  logs.value.push({ name: emittedEventName, args: JSON.stringify(params) })
}
const clearEventsLog = () => (logs.value = [])

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
</script>

<style lang="scss">
.main--examples-dom-events {
  .logs-box {white-space: pre-wrap;}
}
</style>
