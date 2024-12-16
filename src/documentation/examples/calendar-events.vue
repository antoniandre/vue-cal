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
      date and time, resized and their content can be edited (externally). There's also a more granular
      control on what exactly should be editable.

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
    .vuecal__event.leisure {background-color: #fd9c42d9;border-color: #e9882e;}
    .vuecal__event.health {background-color: #57cea9cc;border-color: #90d2be;}
    .vuecal__event.sport {background-color: #ff6666d9;border-color: #eb5252;}
    .vuecal__event.lunch {background-color: repeating-linear-gradient(45deg, transparent, transparent 10px, {{ store.darkMode ? '#ffffff11' : '#00000011' }} 10px, {{ store.darkMode ? '#ffffff11' : '#00000011' }} 20px);border: none;}
  vue-cal(
    :time-from="9 * 60"
    :time-to="14 * 60"
    :events="exEvents.events"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :view-date="new Date()"
    :views-bar="false"
    :dark="store.darkMode"
    style="height: 260px")

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
    :view-date="new Date()"
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

    &lt;!-- Using Wave UI --&gt;
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
    :view-date="new Date()"
    :views-bar="false"
    :dark="store.darkMode"
    @event-click="exOpenEventDetails.openDialog")
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
example(title="Create Events" anchor="create-events")
  template(#desc)
    .todo-tag.d-iflex FINISH THIS EXAMPLE
    w-radios(
      v-model="exCreateEvents.createMethod"
      :items="exCreateEvents.createMethods"
      inline)
  template(#code-html).
  template(#code-js).
  template(#code-css).
  vue-cal(
    editable-events
    @[exCreateEvents.createMethod]="exCreateEvents.createEvent"
    :dark="store.darkMode")

//- Example.
example(title="Edit & Delete Events" anchor="edit-and-delete-events")
  template(#desc)
    .todo-tag.d-iflex FINISH THIS EXAMPLE
    p.mb2.
      The #[code editable-events] option allows or prevent all the following actions when set to
      #[code true] or #[code false]:
    ul
      li Edit the event title
      li.
        Resize an event by dragging the resizer handle.
        #[strong Not available if no timeline, not possible on background events.]
      li.
        Drag &amp; drop an event (not from the editable title text selection and not from the resizer).
        #[strong Not possible on background events.]
      li Delete an event (by clicking and holding an event)
      li.
        Create a new event (by clicking and dragging on a cell or clicking and holding on a cell)#[br]
        Learn more about event creation in the #[a(href="#ex---create-events") create events]
        example.

    div.mt4
      strong.
        The #[code editable-events] option also accept a more granular object as follows to specifically
        allow or deny any previously listed actions.
      ssh-pre(language="js" :dark="store.darkMode").
        { title: true, drag: true, resize: true, delete: true, create: true }
    alert(tip).
      On top of the global actions allowance, you can deny each of these actions individually for each event with the event
      attributes #[code titleEditable: false], #[code deletable: false],
      #[code draggable: false] &amp; #[code resizable: false].
    p In this example, the event creation and drag ability are disabled to focus on edition and deletion.
  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time-from="10 * 60"
      :time-to="23 * 60"
      :views="['day', 'week', 'month']"
      :views-bar="false"
      hide-weekends
      :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
      :events="events"&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
    // In data.
    events: [
      {
        start: '2018-11-20 14:00',
        end: '2018-11-20 17:30',
        title: 'Boring event',
        content: '&lt;i class="icon mdi mdi-cancel"&gt;&lt;/i&gt;&lt;br&gt;I am not draggable, not resizable and not deletable.',
        class: 'blue-event',
        deletable: false,
        resizable: false,
        draggable: false
      },
      // other events.
    ]

  vue-cal(
    ref="exEditEventsVuecalRef"
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="10 * 60"
    :time-to="23 * 60"
    :views="['day', 'week', 'month']"
    :views-bar="false"
    hide-weekends
    :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
    :events="exEditEvents.events"
    @event-dblclick="exEditEvents.deleteEvent")

//- Example.
//- example(title="Events Indicators" anchor="events-indicators")
  template(#desc)
    p.mb0.
      When #[code eventsCount] is set to #[code true], the events will be counted on #[code month],
      #[code year] &amp; #[code years] and a number will appear in each cell that contain one or more
      events.#[br]
      You can customize the events count via CSS or via the #[code #events-count] slot.
    p.my3.w-flex.align-center
      span.mr2 Choose an indicator style:
      w-radios.d-iblock(
        v-model="indicatorStyle"
        inline
        label-color="grey"
        :items="indicatorStyleOptions")
  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      xs
      :time-from="10 * 60"
      date-picker
      events-count-on-year-view
      view="month"
      :events="events"&gt;
  template(#code-css).
    /* Default indicator is count, but you can override it with one of the following rules. */

    /* Dash indicator */
    .vuecal__cell-events-count {
      width: 18px;
      height: 2px;
      color: transparent;
    }

    /* Dot indicator */
    .vuecal__cell-events-count {
      width: 4px;
      min-width: 0;
      height: 4px;
      padding: 0;
      color: transparent;
    }

    /* Cell background indicator */
    .vuecal__cell--has-events {background-color: #fffacd;}
    .vuecal__cell-events-count {display: none;}
  .w-flex.maa.justify-center.wrap.gap5
    vue-cal(
      :dark="store.darkMode"
      :class="'event-indicator--' + indicatorStyle"
      :selected-date="stringToDate('2018-11-19')"
      xs
      :time-from="10 * 60"
      view="month"
      date-picker
      events-count-on-year-view
      :events="events")
    vue-cal.vuecal--yellow-theme(
      :class="'event-indicator--' + indicatorStyle"
      :selected-date="stringToDate('2018-11-19')"
      xs
      :time-from="10 * 60"
      date-picker
      events-count-on-year-view
      view="month"
      :events="events"
      :dark="store.darkMode")

//- Example.
//- example(title="Events on Month View" anchor="events-on-month-view")
  template(#desc)
    p.
      With the option #[code events-on-month-view], you can choose whether to display the events on the month view or not.#[br]
      #[code events-on-month-view] accepts a Boolean to show or hide, or the string '#[code short]' to show only the event's title.#[br]
      If #[code events-on-month-view] is set to #[code true], all the information is displayed, you can then hide
      any event information via CSS.#[br]
      If you want all the cells to have the same height on this view, this is also your call, you can do it via CSS.
  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time-from="9 * 60"
      :views="['day', 'week', 'month']"
      view="month"
      hide-weekends
      events-on-month-view="short"
      :events="events"&gt;
    &lt;/vue-cal&gt;
  template(#code-css).
    .vuecal--month-view {height: 500px;}
    .vuecal--month-view .vuecal__cell {height: 80px;}

    .vuecal--month-view .vuecal__cell-content {
      justify-content: flex-start;
      height: 100%;
      align-items: flex-end;
    }

    .vuecal--month-view .vuecal__cell-date {padding: 4px;}
  vue-cal.ex--events-on-month-view(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="9 * 60"
    :views="['day', 'week', 'month']"
    view="month"
    hide-weekends
    events-on-month-view="short"
    :events="events")


.todo-tag.d-iflex.mt6 ADD ALL THE COMMENTED EXAMPLES
//- Example.
//- example(title="Create Events" anchor="create-events")
  template(#desc)
    p.
      The event creation is only possible on a day cell, so not on years &amp; year views.#[br]
      There are multiple ways to create an event, let's start with the default one.#[br]#[br]
      You may also want to observe the emitted events in the
      #[a(href="#ex--emitted-events") emitted events example].
    alert.
      With the #[code snapToTime] option, you can make sure the event starts and end at specific
      intervals of minutes.#[br]
      E.g. #[code :snap-to-time="15"] will snap the event to the closest :00, :15, :30, :45 while dragging.#[br]
      This option also applies on event resizing after the drag-creation.
    .w-flex.align-center.wrap
      | Click and drag a cell to create an event (downwards or upwards).
      .spacer
      w-button.mr1.my1(
        :outline="!snapToTime15"
        @click="snapToTime15 = !snapToTime15")
        | Snap to time: 15min
      w-button.my1(
        outline
        @click="$refs.vuecalCreateEx.mutableEvents = [];$refs.vuecalCreateEx.view.events = []")
        | Clear all the events
  template(#code-html).
    &lt;vue-cal
      :views-bar="false"
      :title-bar="false"
      hide-weekends
      :time-from="10 * 60"
      :time-to="16 * 60"
      :views="['week']"
      :editable-events="{ title: false, drag: false, resize: true, delete: true, create: true }"
      :drag-to-create-threshold="0"&gt;
    &lt;/vue-cal&gt;

  vue-cal.ex--create-events(
    :dark="store.darkMode"
    ref="vuecalCreateEx"
    :views-bar="false"
    :title-bar="false"
    hide-weekends
    :time-from="10 * 60"
    :time-to="16 * 60"
    :snap-to-time="snapToTime15 ? 15 : 0"
    :views="['week']"
    :editable-events="{ title: false, drag: false, create: false, resize: true, delete: true, create: true }"
    :drag-to-create-threshold="0")

  template(#desc2)
    p.mt6.
      This event creation method can cause difficulty when the calendar allows a click on a cell to
      navigate: a slightly slipping click would create an event instead of navigating.#[br]
      For this reason, the #[code dragToCreateThreshold] option default is 15 pixels.
      So if you try to click or double click, it will not create an event.
    p.mb1.
      In this example, the event "drag-creation" only starts after dragging 15 pixels, which allows navigating
      even with an accidental move while double-clicking.
    p try to double click on a cell to go to the day view with both #[code dragToCreateThreshold] to 15 and 0.
    .w-flex.wrap.align-center.justify-end
      span.subtitle-1.mr2 dragToCreateThreshold (px):
      w-radios.d-iblock(
        v-model="dragToCreateThreshold"
        inline
        label-color="grey"
        :items="dragToCreateThresholdOpts")
        template(#item="{ item }")
          code {{ item.label }}
    .example.grow.mt3(style="height: 280px")
      vue-cal.ex--create-events(
        :dark="store.darkMode"
        :time-from="10 * 60"
        :time-to="16 * 60"
        hide-weekends
        :views="['day', 'week']"
        :editable-events="{ title: false, drag: false, resize: true, delete: true, create: true }"
        :drag-to-create-threshold="dragToCreateThreshold")

//- Example.
//- example(title="Other Event Creation Methods" anchor="other-event-creation-methods")
  template(#desc)
    p.
      There are 3 other ways to create an event: on cell click &amp; hold, on cell single/double click,
      or programmatically.
    alert Event creation will not trigger with a single/double click or click &amp; hold #[strong if your cursor is on an event].
    p Let's see the 3 cases in order of complexity:
  template(#code-html).

  template(#desc2)
    ol.pl3
      li.mt3
        h5.subtitle-1.font-weight-bold On cell single or double click
        p.
          As the #[code cell-click] &amp; #[code cell-dblclick] emitted
          events return a date and time at cursor position (refer to the
          #[a(href="#ex--emitted-events") emitted events example]),
          you simply need to call the #[code createEvent()] function straight
          away from #[code cell-dblclick]:
        .w-flex.wrap
          .example.grow.my2.mr3(style="height: 280px")
            vue-cal(
              :dark="store.darkMode"
              ref="vuecal3"
              small
              :views-bar="false"
              :title-bar="false"
              hide-weekends
              :time-from="10 * 60"
              :time-to="16 * 60"
              :views="['week']"
              :cell-click-hold="false"
              :drag-to-create-event="false"
              editable-events
              @cell-dblclick="$refs.vuecal3.createEvent($event, 120, { title: 'New Event', class: 'blue-event' })")
          ssh-pre.my2(language="html-vue" style="font-size: 0.8em" :dark="store.darkMode").
            &lt;vue-cal
              ref="vuecal"
              small
              :views-bar="false"
              hide-weekends
              :title-bar="false"
              :time-from="10 * 60"
              :time-to="16 * 60"
              :views="['day', 'week', 'month']"
              :cell-click-hold="false"
              :drag-to-create-event="false"
              editable-events
              @cell-dblclick="$refs.vuecal.createEvent(
                $event,
                120,
                { title: 'New Event', class: 'blue-event' }
              )"&gt;
            &lt;/vue-cal&gt;
        p You may then want to disable the default event creation on cell click &amp; hold by setting #[code :cell-click-hold="false"]
      li.mt12
        h5.subtitle-1.font-weight-bold Programmatically &amp; externally
        p.my2.
          To allow an external button to create events, you will need to call the
          vue-cal #[code createEvent()] function from a Vue ref.
        .w-flex.mb3.align-center
          | This
          w-button.mx1(sm @click="customEventCreation") button
          | will prompt you to choose a date and time as the event start.

        .w-flex.align-top.wrap
          vue-cal(
            :dark="store.darkMode"
            ref="exEventCreateVuecalRef"
            small
            :time-from="10 * 60"
            :time-to="16 * 60"
            :views="['day', 'week', 'month']"
            :views-bar="false"
            :title-bar="false"
            hide-weekends
            editable-events
            :cell-click-hold="false"
            :drag-to-create-event="false")
          ssh-pre.my2(language="html-vue" style="font-size: 0.8em" :dark="store.darkMode").
            &lt;button @click="customEventCreation"&gt;
              button
            &lt;/button&gt;

            &lt;vue-cal
              ref="vuecal"
              small
              :time-from="10 * 60"
              :time-to="16 * 60"
              :views="['day', 'week', 'month']"
              :views-bar="false"
              :title-bar="false"
              hide-weekends
              editable-events
              :cell-click-hold="false"
              :drag-to-create-event="false"&gt;
            &lt;/vue-cal&gt;
        p Then you can give custom event attributes as you wish:
        ssh-pre.mt3(language="js" :dark="store.darkMode").
          // In methods.
          customEventCreation () {
              const dateTime = prompt('Create event on (YYYY-MM-DD HH:mm)', '{{ todayFormattedNotWeekend }}')

              // Check if date format is correct before creating event.
              if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateTime)) {
                this.$refs.vuecal.createEvent(
                  // Formatted start date and time or JavaScript Date object.
                  dateTime,
                  // Event duration in minutes (Integer).
                  120,
                  // Custom event props (optional).
                  { title: 'New Event', content: 'yay! 🎉', class: 'blue-event' }
                )
              } else if (dateTime) alert('Wrong date format.')
          }

      li.mt12
        h5.subtitle-1.font-weight-bold Adding a dialog box to the #[strong cell click &amp; hold] behavior
        p.mt3.
          By default, event will be created with these attributes:
        ssh-pre.mt0(language="js" :dark="store.darkMode").
          {
              start: {Date}, // Starting from the cursor position in the clicked day cell.
              end: {Date}, // Event start + 2 hours.
              title: '',
              content: '',
              schedule /* if any */: {Integer | String} // The current day schedule id that was clicked.
          }

        p.
          If you want to customize those attributes you can modify the event directly through
          the callback function that you provide to #[code :on-event-create] as follows:#[br]
        ssh-pre.mt6(language="js" :dark="store.darkMode").
          // :on-event-create="onEventCreate", in template.

          /**
          * @param event {Object} The newly created event that you can override.
          * @param deleteEventFunction {Function} Allows you to delete this event programmatically.
          * @return {Object | false} The event to be passed back to Vue Cal, or false to reject creation.
          */
          onEventCreate (event, deleteEventFunction) {
              // You can modify event here and return it.
              // You can also return false to reject the event creation.
              return event
          }

        p.
          In this example, we are adding a dialog box to the cell click &amp; hold.#[br]
          The dialog box will allow you to set all the event attributes.
        .w-flex.wrap
          .example.grow.my2.mr3(style="height: 280px")
            vue-cal.grow(
              :dark="store.darkMode"
              small
              :time-from="10 * 60"
              :time-to="16 * 60"
              :views="['day', 'week', 'month']"
              :views-bar="false"
              :title-bar="false"
              hide-weekends
              editable-events
              :drag-to-create-event="false"
              :on-event-create="onEventCreate")
          ssh-pre.my2(language="html-vue" style="font-size: 0.8em" :dark="store.darkMode").
            &lt;vue-cal
                small
                :time-from="10 * 60"
                :time-to="16 * 60"
                :views="['day', 'week', 'month']"
                :views-bar="false"
                :title-bar="false"
                hide-weekends
                editable-events
                :drag-to-create-event="false"
                :on-event-create="onEventCreate"&gt;
            &lt;/vue-cal&gt;
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;!-- Using Wave UI --&gt;
        &lt;w-dialog
          v-model="showEventCreationDialog"
          :persistent="true"
          max-width="420"&gt;
          &lt;template #title&gt;
            &lt;w-input v-model="selectedEvent.title" placeholder="Event Title" /&gt;
          &lt;/template&gt;

          &lt;w-textarea v-model="selectedEvent.content" placeholder="Event Content" /&gt;
          &lt;w-flex&gt;
            &lt;w-select
              :items="eventsCssClasses"
              placeholder="Event CSS Class"
              @change="selectedEvent.class = $event"
              :value="selectedEvent.class" /&gt;
            &lt;w-switch v-model="selectedEvent.background" label="background Event" /&gt;
          &lt;/w-flex&gt;
          &lt;w-flex&gt;
            &lt;w-btn @click="cancelEventCreation()"&gt;Cancel&lt;/w-btn&gt;
            &lt;w-btn @click="closeCreationDialog()"&gt;Save&lt;/w-btn&gt;
          &lt;/w-flex&gt;
        &lt;/w-dialog&gt;

      ssh-pre(language="js" :dark="store.darkMode").
        data: () => ({
          selectedEvent: null,
          showEventCreationDialog: false,
          eventsCssClasses: ['leisure', 'sport', 'health']
        }),
        methods: {
          onEventCreate (event, deleteEventFunction) {
            this.selectedEvent = event
            this.showEventCreationDialog = true
            this.deleteEventFunction = deleteEventFunction

            return event
          },
          cancelEventCreation () {
            this.closeCreationDialog()
            this.deleteEventFunction()
          },
          closeCreationDialog () {
            this.showEventCreationDialog = false
            this.selectedEvent = {}
          }
        }

      p With the same method, you can open a dialog at the end of the event drag-creation.
      .example.grow.my2(style="height: 280px")
        vue-cal(
          :dark="store.darkMode"
          small
          :time-from="10 * 60"
          :time-to="16 * 60"
          :views="['day', 'week', 'month']"
          :views-bar="false"
          :title-bar="false"
          hide-weekends
          editable-events
          :on-event-create="onEventDragStartCreate"
          @event-drag-create="showEventCreationDialog = true")
      p.
        This example uses the same dialog box and #[code cancelEventCreation] &amp;
        #[code closeCreationDialog] functions as the previous example.#[br]
        Note that #[code event-drag-create] gets fired on mouseup of the drag-create,
        whereas #[code onEventCreate] gets called as soon as the event appears on screen, while dragging.
      ssh-pre(language="html-vue" :dark="store.darkMode").
        &lt;vue-cal
          small
          :time-from="10 * 60"
          :time-to="16 * 60"
          :views="['day', 'week', 'month']"
          :views-bar="false"
          :title-bar="false"
          hide-weekends
          editable-events
          :on-event-create="onEventCreate"
          @event-drag-create="showEventCreationDialog = true"&gt;
        &lt;/vue-cal&gt;
      ssh-pre(language="js" :dark="store.darkMode").
        data: () => ({
          selectedEvent: null,
          showEventCreationDialog: false
        }),
        methods: {
          // Called when drag-create threshold is reached (when the event appears on screen),
          // but before releasing the drag; so, it should not open the dialog box yet.
          onEventCreate (event, deleteEventFunction) {
            this.selectedEvent = event
            this.deleteEventFunction = deleteEventFunction

            return event
          }
        }

//- Example.
//- example(title="Event Drag &amp; Drop" anchor="drag-and-drop")
  template(#desc)
    p.mb2.
      In addition to the obvious event dragging itself, there are quite a few things that are good
      to know about the drag &amp; drop.
    alert(warning)
      ul
        li.
          Drag &amp; drop is a module (to keep Vue Cal light weight).#[br]
          For Vue Cal versions that don't support ESM (prior 4.3.4 on Vue 3 or 3.11.0 on Vue 2),
          it must be loaded separately: #[br]#[code import 'vue-cal/dist/drag-and-drop.js'].
        li
          strong Drag &amp; drop is only available on single day events.
    h5 Dragging over header
    ul
      li.
        While you drag an event over the view selector buttons, or the previous and next arrows,
        or even the today button, they will get into a highlighted state and if you hold over for
        a few milliseconds they will change the view so you can drop the event you are holding
        on another date of the calendar.
      li.
        while dragged over, the previous and next buttons will keep changing the view until you go
        away from the button.
      li.
        Dragging an event over the today button will take you to Today's date, and if you're in
        a #[code years] or #[code year] view it will also go to the next available
        narrower view from #[code month] downwards.
    h5 Dragging over a cell
    ul
      li.
        If you drag an event over a cell or a day schedule
        (ref. #[a(href="#ex--schedules") schedules]), the cell/schedule gets into a
        highlighted state, showing you where the event would go if you drop it.
      li.
        You can drop an event in any cell. But because it does not make much sense to drop it into a
        #[code years] or #[code year] view, if you hold over a cell
        in these views or in #[code month] view, it will go to the next available narrower
        view so you can at least see a day cell.
    h5 Dropping the event into a cell or somewhere not allowed
    ul
      li.
        If you drop the event outside of the calendar or anywhere it's not possible,
        it will snap back to its original place and the original view will be restored if it
        was changed by navigating away.
      li.
        If you drop the event in a cell and it would start before midnight (00:00), it is placed at
        midnight, keeping its duration.
      li.
        If you drop the event in a cell and it would end after midnight (24:00), its duration will
        be truncated to end at midnight (24:00).
      li.
        By default, when you drop the event it will start exactly where you dropped it,
        but if you prefer you can use the #[code snapToTime] option to dictate where it should
          snap to (refer to #[code snapToTime] in the #[a(href="#api") API section]).#[br]
        If you wonder why it does not represent the snapping while dragging, it's not possible to do it with
        the native HTML5 drag &amp; drop.
    h5 Emitted events
    ul
      li
        | When dropping an event into a cell, the
        a.ml1(href="#ex--emitted-events") #[code event-drop] and #[code event-change] events are emitted.
    h5 CSS styles
    ul
      li
        | You can change the highlighted style of the header buttons or cells through these CSS classes:
        ul
          li #[code .vuecal__view-btn--highlighted]
          li #[code .vuecal__today-btn--highlighted]
          li #[code .vuecal__arrow--highlighted]
          li #[code .vuecal__cell--highlighted]
          li #[code .vuecal__schedule--highlighted]
      li.
        You can change the style of the event being dragged through the
        #[code .vuecal__event--dragging] CSS class.
      li.
        While dragging, a copy of the original event is made and that's what you drag
        (native HTML5 drag &amp; drop behavior). The original event receive the
        #[code .vuecal__event--static] CSS class which hides it with #[code opacity: 0].#[br]
        You can use that class to give it a different style.
  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      today-button
      :time-from="10 * 60"
      :time-to="23 * 60"
      hide-weekends
      :snap-to-time="15"
      editable-events
      :events="events"
      :schedules="[{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]"&gt;
    &lt;/vue-cal&gt;
  template(#code-css).
    .vuecal__event--dragging {background-color: rgba(60, 60, 60, 0.3);}

  vue-cal(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    today-button
    :time-from="10 * 60"
    :time-to="23 * 60"
    hide-weekends
    :snap-to-time="15"
    editable-events
    :events="exDragAndDrop.events"
    :schedules="[{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]")

//- Example.
//- example(title="External Events Drag &amp; Drop" anchor="external-events-drag-and-drop")
  template(#desc)
    p.mb2.
      You can drag &amp; drop events from an external source as long as they are HTML5 draggable (this will change when touch devices are supported).#[br]
      It is also possible to move an event from one calendar to another.#[br]#[br]
      In the external event, you can set a #[code duration] property: it will be used to represent the duration of the event on Vue Cal when it has no date.#[br]
      If the #[code duration] is missing, the default will be 2 hours.

    alert(tip)
      strong Important note when dragging external events into Vue Cal:
      div.
        With HTML5 drag &amp; drop, when you drop a DOM element to another location, you have to move
        the element yourself. Now especially because Vue is data driven and a DOM update does not
        modify the data, you will also have to remove the event from its original data source yourself
        - unless you want to create a copy.#[br]
        Learn how in the example source code below.
  template(#code-html).
    &lt;!-- Three HTML5 draggable events. --&gt;
    &lt;div
      class="external-event"
      v-for="(item, i) in draggables"
      :key="i"
      draggable="true"
      @dragstart="onEventDragStart($event, item)"&gt;
      &lt;strong&gt;{{ '\{\{ item.title \}\}' }}&lt;/strong&gt;
      ({{ "\{\{ item.duration ? `${item.duration} min` : 'no duration' \}\}" }})
      &lt;div&gt;{{ '\{\{ item.content \}\}' }}&lt;/div&gt;
    &lt;/div&gt;

    &lt;vue-cal
      small
      :views-bar="false"
      hide-weekends
      :views="['week']"
      :time-from="9 * 60"
      :time-to="16 * 60"
      editable-events
      @event-drop="onEventDrop"&gt;
    &lt;/vue-cal&gt;

  template(#code-js).
    export default {
      data: () => ({
        draggables: [
          {
            // The id (or however you name it), will help you find which event to delete
            // from the callback triggered on drop into Vue Cal.
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
            // No defined duration here: will default to 2 hours.
          }
        ]
      }),
      methods: {
        onEventDragStart (e, draggable) {
          // Passing the event's data to Vue Cal through the DataTransfer object.
          e.dataTransfer.setData('event', JSON.stringify(draggable))
          e.dataTransfer.setData('cursor-grab-at', e.offsetY)
        },
        // The 3 parameters are destructured from the passed $event in @event-drop="onEventDrop".
        // `event` is the final event as Vue Cal understands it.
        // `originalEvent` is the event that was dragged into Vue Cal, it can come from the same
        //  Vue Cal instance, another one, or an external source.
        // `external` is a boolean that lets you know if the event is not coming from any Vue Cal.
        onEventDrop ({ event, originalEvent, external }) {
          // If the event is external, delete it from the data source on drop into Vue Cal.
          // If the event comes from another Vue Cal instance, it will be deleted automatically in there.
          if (external) {
            const extEventToDeletePos = this.draggables.findIndex(item => item.id === originalEvent.id)
            if (extEventToDeletePos > -1) this.draggables.splice(extEventToDeletePos, 1)
          }
        }
      }
    }

  .w-flex.mt4.wrap
    div.mr2
      .external-event(
        v-for="(item, i) in draggables"
        :key="i"
        draggable="true"
        @dragstart="onEventDragStart($event, item)")
          strong.mr2 {{ item.title }}
          span ({{ item.duration ? `${item.duration} min` : 'no duration' }})
          div {{ item.content }}
    vue-cal.mr1.grow.external-events-drag-and-drop(
      small
      :views-bar="false"
      hide-weekends
      :views="['week']"
      :time-from="9 * 60"
      :time-to="16 * 60"
      editable-events
      @event-drop="onEventDrop"
      :dark="store.darkMode")
    vue-cal.ml1.grow.external-events-drag-and-drop(
      :dark="store.darkMode"
      small
      :views-bar="false"
      hide-weekends
      :views="['week']"
      :time-from="9 * 60"
      :time-to="16 * 60"
      editable-events
      @event-drop="onEventDrop")

//- Example.
//- example(title="Multiple Day Events" anchor="multiple-day-events")
  template(#desc)
    p.
      Multiple day events work like a set of single day events linked together.#[br]
      Deleting one of the day of a multiple day event, will also delete all the other days.#[br]
      Updating the duration by dragging or changing the title will also update on all the days.#[br]
      Try to resize, rename and delete the events.#[br]You can also resize horizontally thanks to
      the option #[code resize-x].
    strong Drag &amp; drop is not available on multiple day events for now.

    alert(tip).
      3 CSS classes are available to target the event first day, the last day and all the days in between:
      #[code event-start], #[code event-middle], #[code event-end].
  template(#code-html).
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
  template(#code-js).
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
  vue-cal.ex--multiple-day-events(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="8 * 60"
    :time-to="23 * 60"
    hide-weekends
    events-count-on-year-view
    editable-events
    resize-x
    :events="multipleDayEvents")

//- Example.
//- example(anchor="recurring-events")
  template(#title)
    | Recurring Events
    w-tag.ml2.white(bg-color="red-light1" round) COMING SOON
  template(#desc)
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
  template(#code-html).
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
  template(#code-js).
    // month view event count => OK.
    // @todo: check years/year views event counts.
    // @todo: repeated multiple-day events does not appear if the first day is not in view (e.g. hide weekend).
    // @todo: on month view with show events, occurrences don't appear on out of scope days.
    // @todo: overlapping does not work.
    // @todo: if 2 occurrences are in the same day (multiple-day events), only one is shown.
    // @todo: check all the above points one by one.

  template(#desc2)
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
//- example(title="Overlapping events" anchor="overlapping-events")
  template(#desc)
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
  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time-from="10 * 60"
      :time-to="23 * 60"
      :views="['day', 'week']"
      hide-weekends
      editable-events
      :min-event-width="minEventWidth"
      :events="events"&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
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

  vue-cal(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="10 * 60"
    :time-to="23 * 60"
    :views="['day', 'week']"
    hide-weekends
    editable-events
    :min-event-width="minEventWidth"
    :events="overlappingEvents")

//- Example.
//- example(title="All day events" anchor="all-day-events")
  template(#desc)
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
  template(#code-html).
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
  template(#code-js).
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
  template(#code-css).
    .vuecal__cell-content {align-self: flex-start;}
    .vuecal__cell-date {text-align: right;padding: 4px;}

    .vuecal--week-view .vuecal__scrollable .vuecal__event--all-day.pink-event,
    .vuecal--day-view .vuecal__scrollable .vuecal__event--all-day.pink-event {right: 50%;}
    .vuecal--week-view .vuecal__scrollable .vuecal__event--all-day.leisure,
    .vuecal--day-view .vuecal__scrollable .vuecal__event--all-day.leisure {left: 50%;}

  vue-cal.ex--all-day-events(
    :dark="store.darkMode"
    :selected-date="stringToDate('2019-02-11')"
    :time-from="7 * 60"
    :views="['day', 'week', 'month']"
    hide-weekends
    :show-all-day-events="['short', true, false][exAllDayEvents.showAllDayEvents]"
    :events-on-month-view="[true, 'short'][exAllDayEvents.shortEventsOnMonthView * 1]"
    :events="exAllDayEvents.events")
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

const exCreateEvents = reactive({
  createMethods: [
    { value: 'event-create', label: 'Click & Drag' },
    { value: 'cell-dblclick', label: 'Double Click' },
    { value: 'cell-contextmenu', label: 'Right Click' },
    { value: 'cell-hold', label: 'Click & Hold' }
  ],
  createMethod: ref('event-create'),
  createEvent: (...args) => {
    console.log(...args)
  }
})

const exEventsIndicators = reactive({
  indicatorStyle: ref('count'),
  indicatorStyleOptions: ref([
    { label: 'count (default)', value: 'count' },
    { label: 'dash', value: 'dash' },
    { label: 'dot', value: 'dot' },
    { label: 'cell background', value: 'cell' }
  ])
})

const exEventsOnMonthView = reactive({

})

const exEditAndDeleteEvents = reactive({

})

const exEditEventsVuecalRef = ref(null)
const exEditEvents = reactive({
  events: [
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
  ],
  deleteEvent: ({ e, event }) => {
    exEditEventsVuecalRef.value.view.deleteEvent(event._.id)
  }
})

const exEventCreateVuecalRef = ref(null)
const exEventCreate = reactive({
  onEventCreate: (event, deleteEventFunction) => {
    selectedEvent.value = event
    showEventCreationDialog.value = true
    deleteEventFunction.value = deleteEventFunction

    return event
  },
  snapToTime15: ref(false),
  dragToCreateThreshold: ref(15),
  dragToCreateThresholdOpts: ref([{ label: '0' }, { label: '15' }]),
  deleteEventFunction: ref(null),
  deleteDragEventFunction: ref(null),
  cancelEventCreation: () => {
    closeCreationDialog()
    (deleteEventFunction.value || deleteDragEventFunction.value)()
  },
  closeCreationDialog: () => {
    showEventCreationDialog.value = false
    selectedEvent.value = {}
  },
  onEventDragStartCreate: (event, deleteEventFunction) => {
    selectedEvent.value = event
    deleteEventFunction.value = deleteEventFunction

    return event
  },
  customEventCreation: () => {
    let today = new Date(new Date().setHours(13, 15))
    // If today is on weekend subtract 2 days for the event to always be visible with hidden weekends.
    if (!today.getDay() || today.getDay() > 5) today = today.subtractDays(2)
    const dateTime = prompt('Create event on (YYYY-MM-DD HH:mm)', today.format('YYYY-MM-DD HH:mm'))
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(dateTime)) {
      exEventCreateVuecalRef.value.createEvent(dateTime, 120, { title: 'New Event', content: 'yay! 🎉', class: 'blue-event' })
    }
    else if (dateTime) alert('Wrong date format.')
  },
  todayFormattedNotWeekend: computed(() => {
    let today = new Date(new Date().setHours(13, 15))
    // If today is on weekend subtract 2 days for the event to always be visible with hidden weekends.
    if (!today.getDay() || today.getDay() > 5) today = today.subtractDays(2)
    return today.format('YYYY-MM-DD HH:mm')
  }),
  eventsCssClasses: [{ label: 'leisure' }, { label: 'sport' }, { label: 'health' }]
})

const exDragAndDrop = reactive({
  events: [
    {
      start: '2018-11-21 14:00',
      end: '2018-11-21 16:30',
      title: 'Surgery',
      content: '<i class="w-icon mdi silverware-fork-knife"></i>',
      class: 'health',
      schedule: 2
    }
  ]
})

const exExternalEventsDragDrop = reactive({
  events: ref([
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
  ]),
  onEventDragStart: (e, draggable) => {
    e.dataTransfer.setData('event', JSON.stringify(draggable))
    e.dataTransfer.setData('cursor-grab-at', e.offsetY)
  },
  onEventDrop: ({ event, originalEvent, external }) => {
    if (external) {
      const extEventToDeletePos = exExternalEventsDragDrop.events.value.findIndex(item => item.id === originalEvent.id)
      if (extEventToDeletePos > -1) exExternalEventsDragDrop.events.value.splice(extEventToDeletePos, 1)
    }
  }
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

const exRecurringEvents = reactive({

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

const now = ref(new Date())
const showEventCreationDialog = ref(false)
const selectedEvent = ref({})
</script>

<style lang="scss">
.main--examples-calendar-events {
  .vuecal__event {
    text-align: center;
    color: #fff;
    border: 1px solid;

    i {margin: 2px 0;font-size: 23px;}
  }

  .vuecal__event.leisure {background-color: #fd9c42d9;border-color: #e9882e;}
  .vuecal__event.health {background-color: #57cea9cc;border-color: #90d2be;}
  .vuecal__event.sport {background-color: #ff6666d9;border-color: #eb5252;}
  .vuecal__event.pink-event {background-color: #ff3a8fb3;border-color: #eb267b;}
  .vuecal__event.blue-event {background-color: #64c8ffcc;border-color: #50b4eb;}
  .vuecal__event.yellow-event {background-color: #ffc85abf;border-color: #ffc356;}

  .vuecal__event.lunch {
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, color-mix(in srgb, var(--w-contrast-bg-color) 6%, transparent) 10px, color-mix(in srgb, var(--w-contrast-bg-color) 6%, transparent) 20px);
    border: none;
    z-index: -1;

    .vuecal__event-time {display: none;}
  }

  .vuecal__event--dragging {
    background-color: rgba(grey, 0.3) !important;
    border: none !important;
  }

  .vuecal__event-title {font-weight: bold;}

  // Create events example.
  .ex--create-events {
    .vuecal__event {background-color: rgba(76, 172, 175, 0.35);}
  }

  // External events drag and drop example.
  .external-events-drag-and-drop {
    flex-basis: 0 !important;
    min-width: 285px;
  }
  .external-events-drag-and-drop .vuecal__event, .external-event {
    background-color: rgba(160, 220, 255, 0.5);
    border: 1px solid rgba(0, 100, 150, 0.15);
    padding: 0.2em 0.4em;
    cursor: move;
    cursor: grab;
  }

  .external-event {
    margin-bottom: 0.5em;
    width: 12.5em;

    span {color: #777;font-size: 0.9em;}
  }

  // Events on month view example.
  .event-indicator--dash .vuecal__cell-events-count {
    top: 70%;
    width: 14px;
    height: 2px;
    color: transparent;
  }

  .event-indicator--dot .vuecal__cell-events-count {
    top: 70%;
    width: 4px;
    min-width: 0;
    height: 4px;
    padding: 0;
    color: transparent;
  }

  .ex--events-indicators {
    .vuecal__cell-events-count span {
      background: var(--w-primary-color);
      height: 100%;
      border-radius: 12px;
      display: block;
    }
  }

  .ex--custom-events-count {
    .vuecal__cell-events-count span {
      background-color: #fd9c42;
      height: 100%;
      min-width: 12px;
      padding: 0 3px;
      border-radius: 12px;
      display: block;
    }
    .vuecal__cell-events-count {background: transparent;}
  }

  .ex--events-on-month-view.vuecal--month-view {
    height: 500px;
    .vuecal__cell {height: 80px;}

    .vuecal__cell-content {
      justify-content: flex-start;
      height: 100%;
      align-items: flex-end;
    }

    .vuecal__cell-date {padding: 3px 4px;}
  }

  .event-indicator--cell .vuecal__cell--has-events:before {background-color: #fffacd;}
  .event-indicator--cell .vuecal__cell-events-count {display: none;}

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
