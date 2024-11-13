<template lang="pug">
//- Example.
//- example(title="" anchor="")
  template(#desc)
  template(#code-html).




//- Example.
example(title="Timeless events" anchor="timeless-events")
  template(#desc)
    p.
      The events have associated dates but no time information.#[br]
      Timeless events cannot be resized as they have no time or duration information.#[br]
      Refer to the #[span.code events] option in the #[a(href="#api") API] section.
  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time="false"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="events"&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
    data: () => ({
      events: [
        {
          start: '2018-11-21',
          end: '2018-11-21',
          title: 'Need to go shopping',
          content: '&lt;i class="icon mdi mdi-cart-outline"&gt;&lt;/i&gt;',
          class: 'leisure'
        },
        {
          start: '2018-11-21',
          end: '2018-11-21',
          title: 'Golf with John',
          content: '&lt;i class="icon mdi mdi-golf"&gt;&lt;/i&gt;',
          class: 'sport'
        },
        {
          start: '2018-11-22',
          end: '2018-11-22',
          title: 'Dad\'s birthday!',
          content: '&lt;i class="icon mdi mdi-cake-variant-outline"&gt;&lt;/i&gt;',
          class: 'sport'
        }
      ]
  template(#code-css).
    /* Different color for different event types. */
    .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
    .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
  vue-cal(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time="false"
    :disable-views="['years', 'year', 'month']"
    hide-weekends
    :events="timelessEvents")

//- Example.
example(title="Events with time information" anchor="events-with-time")
  template(#desc)
    p.
      Read-only events (by default events are not editable) with custom HTML content and css class (for event types).#[br]
      Note that the events are always selectable (drop shadow and higher z-index), even when uneditable.
      The difference with timeless events is that a time is set in the #[span.code start] and #[span.code end] attributes of the events.
  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time-from="9 * 60"
      :time-to="23 * 60"
      :disable-views="['years', 'year', 'month']"
      hide-weekends
      :events="events"&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
    events: [
      {
        start: '2018-11-16 10:30',
        end: '2018-11-16 11:30',
        // You can also define event dates with Javascript Date objects:
        // start: new Date(2018, 11 - 1, 16, 10, 30),
        // end: new Date(2018, 11 - 1, 16, 11, 30),
        title: 'Doctor appointment',
        content: '&lt;i class="icon mdi mdi-hospital-box-outline"&gt;&lt;/i&gt;',
        class: 'health'
      },
      ...
    ]
  vue-cal(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="9 * 60"
    :time-to="23 * 60"
    :disable-views="['years', 'year', 'month']"
    hide-weekends
    :events="events")

//- Example.
example(title="Open a dialog box on event click / dblclick" anchor="open-dialog-on-event-click")
  template(#desc)
    p.mb2.
      By passing a function to the option #[span.code on-event-click] or #[span.code on-event-dblclick],
      you can control what happens when you click or double click an event - on any view where the events are displayed.#[br]
      The callback function you provide will receive 2 arguments:
    ul
      li #[span.code event]: the clicked calendar event's object
      li #[span.code e]: the associated javascript DOM event
    alert.mt3(tip) You can set any custom attribute you want on an event, you will then be able to access it in the dialog box!#[br]
  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time-from="9 * 60"
      :time-to="19 * 60"
      :disable-views="['years', 'year']"
      hide-weekends
      :events="events"
      :on-event-click="onEventClick"&gt;
    &lt;/vue-cal&gt;

    &lt;!-- Using Vuetify (but we prefer Wave UI 🤘) --&gt;
    &lt;v-dialog v-model="showDialog"&gt;
      &lt;v-card&gt;
        &lt;v-card-title&gt;
          &lt;v-icon&gt;{{ '\{\{ selectedEvent.icon \}\}' }}&lt;/v-icon&gt;
          &lt;span&gt;{{ '\{\{ selectedEvent.title \}\}' }}&lt;/span&gt;
          &lt;v-spacer/&gt;
          &lt;strong&gt;{{ "\{\{ selectedEvent.start && selectedEvent.start.format('DD/MM/YYYY') \}\}" }}&lt;/strong&gt;
        &lt;/v-card-title&gt;
        &lt;v-card-text&gt;
          &lt;p v-html="selectedEvent.contentFull"/&gt;
          &lt;strong&gt;Event details:&lt;/strong&gt;
          &lt;ul&gt;
            &lt;li&gt;Event starts at: {{ '\{\{ selectedEvent.start && selectedEvent.start.formatTime() \}\}' }}&lt;/li&gt;
            &lt;li&gt;Event ends at: {{ '\{\{ selectedEvent.end && selectedEvent.end.formatTime() \}\}' }}&lt;/li&gt;
          &lt;/ul&gt;
        &lt;/v-card-text&gt;
      &lt;/v-card&gt;
    &lt;/v-dialog&gt;
  template(#code-js).
    data: () => ({
      selectedEvent: {},
      showDialog: false,
      events: [
        {
          start: '2018-11-20 14:00',
          end: '2018-11-20 18:00',
          title: 'Need to go shopping',
          icon: 'mdi mdi-cart-outline', // Custom attribute.
          content: 'Click to see my shopping list',
          contentFull: 'My shopping list is rather long:&lt;br&gt;&lt;ul&gt;&lt;li&gt;Avocados&lt;/li&gt;&lt;li&gt;Tomatoes&lt;/li&gt;&lt;li&gt;Potatoes&lt;/li&gt;&lt;li&gt;Mangoes&lt;/li&gt;&lt;/ul&gt;', // Custom attribute.
          class: 'leisure'
        },
        {
          start: '2018-11-22 10:00',
          end: '2018-11-22 15:00',
          title: 'Golf with John',
          icon: 'mdi mdi-golf', // Custom attribute.
          content: 'Do I need to tell how many holes?',
          contentFull: 'Okay.&lt;br&gt;It will be a 18 hole golf course.', // Custom attribute.
          class: 'sport'
        }
      ]
    }),
    methods: {
      onEventClick (event, e) {
        this.selectedEvent = event
        this.showDialog = true

        // Prevent navigating to narrower view (default vue-cal behavior).
        e.stopPropagation()
      }
    }
  template(#code-css).
    .vuecal__event {cursor: pointer;}

    .vuecal__event-title {
      font-size: 1.2em;
      font-weight: bold;
      margin: 4px 0 8px;
    }

    .vuecal__event-time {
      display: inline-block;
      margin-bottom: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    }

    .vuecal__event-content {font-style: italic;}

  vue-cal.ex--open-dialog-on-event-click(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="9 * 60"
    :time-to="19 * 60"
    :disable-views="['years', 'year']"
    hide-weekends
    :events="eventsToPop"
    :on-event-click="onEventClick")

//- Example.
example(title="Events indicators - #[span.code years], #[span.code year] &amp; #[span.code month] views" anchor="events-indicators")
  template(#desc)
    p.mb0.
      When you define events the #[span.code month] view will display an events count per day.#[br]
      You can use the option #[span.code eventsCountOnYearView] to show the events count on
      #[span.code years] &amp; #[span.code year] views as well.#[br]
      You can customize the events count as you wish via CSS.
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
  .w-flex.maa.justify-center.wrap
    .example.ma2.my2(style="width: 300px;height: 360px")
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
    .example.ma2.my2(style="width: 300px;height: 360px")
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
example(title="Display events on month view" anchor="events-on-month-view")
  template(#desc)
    p.
      With the option #[span.code events-on-month-view], you can choose whether to display the events on the month view or not.#[br]
      #[span.code events-on-month-view] accepts a Boolean to show or hide, or the string '#[span.code short]' to show only the event's title.#[br]
      If #[span.code events-on-month-view] is set to #[span.code true], all the informations are displayed, you can then hide
      any event information via CSS.#[br]
      If you want all the cells to have the same height on this view, this is also your call, you can do it via CSS.
  template(#code-html).
  vue-cal.vuecal--full-height-delete.ex--events-on-month-view(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="9 * 60"
    :disable-views="['years', 'year']"
    view="month"
    hide-weekends
    events-on-month-view="short"
    :events="events"
    style="height: 600px")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    :selected-date="stringToDate('2018-11-19')"
    :time-from="9 * 60"
    :disable-views="['years', 'year']"
    view="month"
    hide-weekends
    events-on-month-view="short"
    :events="events"
    style="height: 600px"&gt;
  &lt;/vue-cal&gt;
ssh-pre(language="css" label="CSS" :dark="store.darkMode").
  .vuecal--month-view .vuecal__cell {height: 80px;}

  .vuecal--month-view .vuecal__cell-content {
    justify-content: flex-start;
    height: 100%;
    align-items: flex-end;
  }

  .vuecal--month-view .vuecal__cell-date {padding: 4px;}
  .vuecal--month-view .vuecal__no-event {display: none;}

//- Example.
example(title="Edit &amp; delete events" anchor="edit-and-delete-events")
  template(#desc)
  template(#code-html).
p.mb2.
  The #[span.code editable-events] option allows or prevent all these actions when it is set to
  #[span.code true] or #[span.code false]:
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
    But the #[span.code editable-events] option also accept an object to specifically allow or deny any of the
    previously listed actions.
  div For instance this object only denies the drag action:
ssh-pre.mt1(language="js" :dark="store.darkMode").
  { title: true, drag: false, resize: true, delete: true, create: true }
alert(tip)
  ul
    li.mb2.
      On top of the global actions allowance, you can deny each of these actions individually for each event with the event
      attributes #[span.code titleEditable: false], #[span.code deletable: false],
      #[span.code draggable: false] &amp; #[span.code resizable: false].
    li.
      By default the delete button only appears at the top of the event with a set height (1.4em).
      If you want a full-height delete button like in this example, you can apply the CSS class
      #[span.code .vuecal--full-height-delete] to your &lt;vue-cal&gt; tag.

p In this example, the event creation and drag ability are disabled to focus on edition and deletion.
.example.my2.mxa
  vue-cal.vuecal--full-height-delete(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="10 * 60"
    :time-to="23 * 60"
    :disable-views="['years', 'year']"
    :views-bar="false"
    hide-weekends
    :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
    :events="editableEvents")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal :selected-date="stringToDate('2018-11-19')"
            :time-from="10 * 60"
            :time-to="23 * 60"
            :disable-views="['years', 'year']"
            :views-bar="false"
            hide-weekends
            :editable-events="{ title: true, drag: false, resize: true, delete: true, create: false }"
            :events="events"
            class="vuecal--full-height-delete"&gt;
  &lt;/vue-cal&gt;
ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
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
ssh-pre(language="css" label="CSS" :dark="store.darkMode").
  .vuecal__event {background-color: rgba(76, 172, 175, 0.35);}

//- Example.
example(title="Create events" anchor="create-events")
  template(#desc)
  template(#code-html).

p.
  The event creation is only possible on a day cell, so not on years &amp; year views.#[br]
  There are multiple ways to create an event, let's start with the default one.#[br]#[br]
  You may also want to observe the emitted events in the
  #[a(href="#ex--emitted-events") emitted events example].
alert.
  With the #[span.code snapToTime] option, you can make sure the event starts and end at specific
  intervals of minutes.#[br]
  E.g. #[span.code :snap-to-time="15"] will snap the event to the closest :00, :15, :30, :45 while dragging.#[br]
  This option also applies on event resizing after the drag-creation.
.w-flex.align-center.wrap
  | Click and drag on a cell to create an event, downwards or upwards.
  .spacer
  w-button.mr1.my1(
    :outline="!snapToTime15"
    @click="snapToTime15 = !snapToTime15")
    | Snap to time: 15min
  w-button.my1(
    outline
    @click="$refs.vuecalCreateEx.mutableEvents = [];$refs.vuecalCreateEx.view.events = []")
    | Clear all the events
.example.mxa.mt3(style="height: 280px")
  vue-cal.ex--create-events.vuecal--full-height-delete(
    :dark="store.darkMode"
    ref="vuecalCreateEx"
    :views-bar="false"
    hide-title-bar
    hide-weekends
    :time-from="10 * 60"
    :time-to="16 * 60"
    :snap-to-time="snapToTime15 ? 15 : 0"
    :disable-views="['years', 'year', 'month', 'day']"
    :editable-events="{ title: false, drag: false, resize: true, delete: true, create: true }"
    :drag-to-create-threshold="0")
ssh-pre.my2(language="html-vue" :dark="store.darkMode").
  &lt;vue-cal
    :views-bar="false"
    hide-title-bar
    hide-weekends
    :time-from="10 * 60"
    :time-to="16 * 60"
    :disable-views="['years', 'year', 'month', 'day']"
    :editable-events="{ title: false, drag: false, resize: true, delete: true, create: true }"
    :drag-to-create-threshold="0"&gt;
  &lt;/vue-cal&gt;

p.mt6.
  This event creation method can cause difficulty when the calendar allows a click on a cell to
  navigate: a slightly slipping click would create an event instead of navigating.#[br]
  For this reason, the #[span.code dragToCreateThreshold] option default is 15 pixels.
  So if you try to click or double click, it will not create an event.
p.mb1.
  In this example, the event "drag-creation" only starts after dragging 15 pixels, which allows navigating
  even with an accidental move while double-clicking.
p try to double click on a cell to go to the day view with both #[span.code dragToCreateThreshold] to 15 and 0.
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
  vue-cal.ex--create-events.vuecal--full-height-delete(
    :dark="store.darkMode"
    :time-from="10 * 60"
    :time-to="16 * 60"
    hide-weekends
    :disable-views="['years', 'year', 'month']"
    :editable-events="{ title: false, drag: false, resize: true, delete: true, create: true }"
    :drag-to-create-threshold="dragToCreateThreshold")

//- Example.
example(title="Other event creation methods" anchor="other-event-creation-methods")
  template(#desc)
  template(#code-html).

p.
  There are 3 other ways to create an event: on cell click &amp; hold, on cell single/double click,
  or programmatically.
alert Event creation will not trigger with a single/double click or click &amp; hold #[strong if your cursor is on an event].
p Let's see the 3 cases in order of complexity:

ol.pl3
  li.mt3
    h5.subtitle-1.font-weight-bold On cell single or double click
    p.
      As the #[span.code cell-click] &amp; #[span.code cell-dblclick] emitted
      events return a date and time at cursor position (refer to the
      #[a(href="#ex--emitted-events") emitted events example]),
      you simply need to call the #[span.code createEvent()] function straight
      away from #[span.code cell-dblclick]:
    .w-flex.wrap
      .example.grow.my2.mr3(style="height: 280px")
        vue-cal.vuecal--full-height-delete(
          :dark="store.darkMode"
          ref="vuecal3"
          small
          :views-bar="false"
          hide-title-bar
          hide-weekends
          :time-from="10 * 60"
          :time-to="16 * 60"
          :disable-views="['years', 'year', 'month', 'day']"
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
          hide-title-bar
          :time-from="10 * 60"
          :time-to="16 * 60"
          :disable-views="['years', 'year']"
          :cell-click-hold="false"
          :drag-to-create-event="false"
          editable-events
          @cell-dblclick="$refs.vuecal.createEvent(
            $event,
            120,
            { title: 'New Event', class: 'blue-event' }
          )"&gt;
        &lt;/vue-cal&gt;
    p You may then want to disable the default event creation on cell click &amp; hold by setting #[span.code :cell-click-hold="false"]
  li.mt12
    h5.subtitle-1.font-weight-bold Programmatically &amp; externally
    p.my2.
      To allow an external button to create events, you will need to call the
      vue-cal #[span.code createEvent()] function from a Vue ref.
    .w-flex.mb3.align-center
      | This
      w-button.mx1(sm @click="customEventCreation") button
      | will prompt you to choose a date and time as the event start.

    .w-flex.align-top.wrap
      .example.grow.my2.mr3(style="height: 280px")
        vue-cal.vuecal--full-height-delete(
          :dark="store.darkMode"
          ref="vuecalEl"
          small
          :time-from="10 * 60"
          :time-to="16 * 60"
          :disable-views="['years', 'year']"
          :views-bar="false"
          hide-title-bar
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
          :disable-views="['years', 'year']"
          :views-bar="false"
          hide-title-bar
          hide-weekends
          editable-events
          :cell-click-hold="false"
          :drag-to-create-event="false"&gt;
        &lt;/vue-cal&gt;
    p Then you can give custom event attributes as you wish:
    ssh-pre.mt3(language="js" label="Javascript" :dark="store.darkMode").
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
    ssh-pre.mt0(language="js" label="Javascript" :dark="store.darkMode").
      {
          start: {Date}, // Starting from the cursor position in the clicked day cell.
          end: {Date}, // Event start + 2 hours.
          title: '',
          content: '',
          schedule /* if any */: {Integer | String} // The current day schedule id that was clicked.
      }

    p.
      If you want to customize those attributes you can modify the event directly through
      the callback function that you provide to #[span.code :on-event-create] as follows:#[br]
    ssh-pre.mt6(language="js" label="Javascript" :dark="store.darkMode").
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
        vue-cal.grow.vuecal--full-height-delete(
          :dark="store.darkMode"
          small
          :time-from="10 * 60"
          :time-to="16 * 60"
          :disable-views="['years', 'year']"
          :views-bar="false"
          hide-title-bar
          hide-weekends
          editable-events
          :drag-to-create-event="false"
          :on-event-create="onEventCreate")
      ssh-pre.my2(language="html-vue" style="font-size: 0.8em" :dark="store.darkMode").
        &lt;vue-cal
            small
            :time-from="10 * 60"
            :time-to="16 * 60"
            :disable-views="['years', 'year']"
            :views-bar="false"
            hide-title-bar
            hide-weekends
            editable-events
            :drag-to-create-event="false"
            :on-event-create="onEventCreate"&gt;
        &lt;/vue-cal&gt;
  ssh-pre(language="html-vue" label="Vue Template - dialog box" :dark="store.darkMode").
    &lt;!-- Using Vuetify (but we prefer Wave UI 🤘) --&gt;
    &lt;v-dialog v-model="showEventCreationDialog" :persistent="true" max-width="420"&gt;
      &lt;v-card&gt;
        &lt;v-card-title&gt;
          &lt;v-input v-model="selectedEvent.title" placeholder="Event Title" /&gt;
        &lt;/v-card-title&gt;
        &lt;v-card-text&gt;
          &lt;v-textarea v-model="selectedEvent.content" placeholder="Event Content" /&gt;
          &lt;v-flex&gt;
            &lt;v-select
              :items="eventsCssClasses"
              placeholder="Event CSS Class"
              @change="selectedEvent.class = $event"
              :value="selectedEvent.class" /&gt;
            &lt;v-switch v-model="selectedEvent.background" label="background Event" /&gt;
          &lt;/v-flex&gt;
          &lt;v-flex&gt;
            &lt;v-btn @click="cancelEventCreation()"&gt;Cancel&lt;/v-btn&gt;
            &lt;v-btn @click="closeCreationDialog()"&gt;Save&lt;/v-btn&gt;
          &lt;/v-flex&gt;
        &lt;/v-card-text&gt;
      &lt;/v-card&gt;

  ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
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
    vue-cal.vuecal--full-height-delete(
      :dark="store.darkMode"
      small
      :time-from="10 * 60"
      :time-to="16 * 60"
      :disable-views="['years', 'year']"
      :views-bar="false"
      hide-title-bar
      hide-weekends
      editable-events
      :on-event-create="onEventDragStartCreate"
      @event-drag-create="showEventCreationDialog = true")
  p.
    This example uses the same dialog box and #[span.code cancelEventCreation] &amp;
    #[span.code closeCreationDialog] functions as the previous example.#[br]
    Note that #[span.code event-drag-create] gets fired on mouseup of the drag-create,
    whereas #[span.code onEventCreate] gets called as soon as the event appears on screen, while dragging.
  ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
    &lt;vue-cal
      small
      :time-from="10 * 60"
      :time-to="16 * 60"
      :disable-views="['years', 'year']"
      :views-bar="false"
      hide-title-bar
      hide-weekends
      editable-events
      :on-event-create="onEventCreate"
      @event-drag-create="showEventCreationDialog = true"&gt;
    &lt;/vue-cal&gt;
  ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
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
example(title="Event drag &amp; drop" anchor="drag-and-drop")
  template(#desc)
  template(#code-html).
  a#ex--drag-and-drop(name="ex--drag-and-drop")
p.mb2.
  In addition to the obvious event dragging itself, there are quite a few things that are good
  to know about the drag &amp; drop.

alert(warning)
  ul
    li.
      Drag &amp; drop is a module (to keep Vue Cal light weight).#[br]
      For Vue Cal versions that don't support ESM (prior 4.3.4 on Vue 3 or 3.11.0 on Vue 2),
      it must be loaded separately: #[br]#[span.code import 'vue-cal/dist/drag-and-drop.js'].
    li
      strong Drag &amp; drop is only available on single day events for now.
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
    a #[span.code years] or #[span.code year] view it will also go to the next available
    narrower view from #[span.code month] downwards.
h5 Dragging over a cell
ul
  li.
    If you drag an event over a cell or a day schedule
    (ref. #[a(href="#ex--schedules") schedules]), the cell/schedule gets into a
    highlighted state, showing you where the event would go if you drop it.
  li.
    You can drop an event in any cell. But because it does not make much sense to drop it into a
    #[span.code years] or #[span.code year] view, if you hold over a cell
    in these views or in #[span.code month] view, it will go to the next available narrower
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
    but if you prefer you can use the #[span.code snapToTime] option to dictate where it should
      snap to (refer to #[span.code snapToTime] in the #[a(href="#api") API section]).#[br]
    If you wonder why it does not represent the snapping while dragging, it's not possible to do it with
    the native HTML5 drag &amp; drop.
h5 Emitted events
ul
  li
    | When dropping an event into a cell, the
    a.ml1(href="#ex--emitted-events") #[span.code event-drop] and #[span.code event-change] events are emitted.
h5 CSS styles
ul
  li
    | You can change the highlighted style of the header buttons or cells through these CSS classes:
    ul
      li #[span.code .vuecal__view-btn--highlighted]
      li #[span.code .vuecal__today-btn--highlighted]
      li #[span.code .vuecal__arrow--highlighted]
      li #[span.code .vuecal__cell--highlighted]
      li #[span.code .vuecal__cell-schedule--highlighted]
  li.
    You can change the style of the event being dragged through the
    #[span.code .vuecal__event--dragging] CSS class.
  li.
    While dragging, a copy of the original event is made and that's what you drag
    (native HTML5 drag &amp; drop behavior). The original event receive the
    #[span.code .vuecal__event--static] CSS class which hides it with #[span.code opacity: 0].#[br]
    You can use that class to give it a different style.

.example.my4.mxa
  vue-cal.vuecal--full-height-delete(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    today-button
    :time-from="10 * 60"
    :time-to="23 * 60"
    hide-weekends
    :snap-to-time="15"
    editable-events
    :events="eventsToDrag"
    :schedules="[{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    :selected-date="stringToDate('2018-11-19')"
    today-button
    :time-from="10 * 60"
    :time-to="23 * 60"
    hide-weekends
    :snap-to-time="15"
    editable-events
    :events="events"
    :schedules="[{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]"
    class="vuecal--full-height-delete"&gt;
  &lt;/vue-cal&gt;
ssh-pre(language="css" label="CSS" :dark="store.darkMode").
  .vuecal__event--dragging {background-color: rgba(60, 60, 60, 0.3);}

//- Example.
example(title="External events drag &amp; drop" anchor="external-events-drag-and-drop")
  template(#desc)
  template(#code-html).
  a#ex--external-events-drag-and-drop(name="ex--external-events-drag-and-drop")
p.mb2.
  You can drag &amp; drop events from an external source as long as they are HTML5 draggable (this will change when touch devices are supported).#[br]
  It is also possible to move an event from one calendar to another.#[br]#[br]
  In the external event, you can set a #[span.code duration] property: it will be used to represent the duration of the event on Vue Cal when it has no date.#[br]
  If the #[span.code duration] is missing, the default will be 2 hours.

alert(tip)
  strong Important note when dragging external events into Vue Cal:
  div.
    With HTML5 drag &amp; drop, when you drop a DOM element to another location, you have to move
    the element yourself. Now especially because Vue is data driven and a DOM update does not
    modify the data, you will also have to remove the event from its original data source yourself
    - unless you want to create a copy.#[br]
    Learn how in the example source code below.
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
    :disable-views="['years', 'year', 'month', 'day']"
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
    :disable-views="['years', 'year', 'month', 'day']"
    :time-from="9 * 60"
    :time-to="16 * 60"
    editable-events
    @event-drop="onEventDrop")

ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;!-- Three HTML5 draggable events. --&gt;
  &lt;div class="external-event"
        v-for="(item, i) in draggables"
        :key="i"
        draggable="true"
        @dragstart="onEventDragStart($event, item)"&gt;
        &lt;strong&gt;{{ '\{\{ item.title \}\}' }}&lt;/strong&gt;
        ({{ "\{\{ item.duration ? `${item.duration} min` : 'no duration' \}\}" }})
    &lt;div&gt;{{ '\{\{ item.content \}\}' }}&lt;/div&gt;
  &lt;/div&gt;

  &lt;vue-cal small
            :views-bar="false"
            hide-weekends
            :disable-views="['years', 'year', 'month', 'day']"
            :time-from="9 * 60"
            :time-to="16 * 60"
            editable-events
            @event-drop="onEventDrop"&gt;
  &lt;/vue-cal&gt;
ssh-pre(language="js" label="Javascript - Vue Component" :dark="store.darkMode").
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

//- Example.
example(title="Multiple day events" anchor="multiple-day-events")
  template(#desc)
  template(#code-html).
p.
  Multiple day events work like a set of single day events linked together.#[br]
  Deleting one of the day of a multiple day event, will also delete all the other days.#[br]
  Updating the duration by dragging or changing the title will also update on all the days.#[br]
  Try to resize, rename and delete the events.#[br]You can also resize horizontally thanks to
  the option #[span.code resize-x].
strong Drag &amp; drop is not available on multiple day events for now.

alert(tip).
  3 CSS classes are available to target the event first day, the last day and all the days in between:
  #[span.code event-start], #[span.code event-middle], #[span.code event-end].
.example.my2.mxa
  vue-cal.ex--multiple-day-events.vuecal--full-height-delete(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="8 * 60"
    :time-to="23 * 60"
    hide-weekends
    events-count-on-year-view
    editable-events
    resize-x
    :events="multipleDayEvents")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    :selected-date="stringToDate('2018-11-19')"
    :time-from="8 * 60"
    :time-to="23 * 60"
    :disable-views="['years', 'year', 'month']"
    hide-weekends
    editable-events
    resize-x
    :events="events"&gt;
  &lt;/vue-cal&gt;

ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
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

//- Example.
example(anchor="ex--recurring-events")
  w-tag.ml2.white(bg-color="red-light1" round) COMING SOON
  | ex--recurring-events
.mt4 #[strong When it will be ready, this is how it will work.]
.mb2 You can repeat an event:
ul
  li Every day - by providing a #[span.code every: "day"] property.
  li Every week - by providing a #[span.code every: "week"] property.
  li Every month - by providing a #[span.code every: "month"] property.
  li Every year - by providing a #[span.code every: "year"] property.
  li Every specific week days - by providing a #[span.code weekdays] array containing the weekdays numbers (1 to 7 for Sunday).
  li Every `x` days - by providing a #[span.code every: x] property, with #[span.code x] being an integer.
  li Forever; Or until an expiry date if you provide an #[span.code until: {String | Date}] property.
  li Whether it's single-day, multiple-day, background, all-day, with time or timeless.
ssh-pre(language="js" label="Still to do..." :dark="store.darkMode").
  // month view event count => OK.
  // @todo: check years/year views event counts.
  // @todo: repeated multiple-day events does not appear if the first day is not in view (e.g. hide weekend).
  // @todo: on month view with show events, occurrences don't appear on out of scope days.
  // @todo: overlapping does not work.
  // @todo: if 2 occurences are in the same day (multiple-day events), only one is shown.
  // @todo: check all the above points one by one.

p.
  Recurrring events work like a set of single day events linked together.#[br]
  That means, deleting, resizing or editing one of the day will apply to all the other days.
w-card.my4.maa.py12.grey-light5.elevation-1
  .text-center.title1.grey Demo coming soon.
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
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

ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
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
example(title="Overlapping events" anchor="overlapping-events")
  template(#desc)
  template(#code-html).
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
      #[span.code min-event-width="50"] will only apply a min width of 50% on simultaneous
      events that would be smaller than that (e.g. with 3 events side by side)
alert.mb6.
  In some cases you may want to set the events overlaps calculation only per same time step
  (default time step is 1 hour), like in
  #[a(href="https://github.com/antoniandre/vue-cal/pull/182" target="_blank") this use case].#[br]
  You can achieve this event overlaps grouping with the option #[span.code overlaps-per-time-step].

.example.my2.mxa
  vue-cal.vuecal--full-height-delete(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="10 * 60"
    :time-to="23 * 60"
    :disable-views="['years', 'year', 'month']"
    hide-weekends
    editable-events
    :min-event-width="minEventWidth"
    :events="overlappingEvents")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    :selected-date="stringToDate('2018-11-19')"
    :time-from="10 * 60"
    :time-to="23 * 60"
    :disable-views="['years', 'year', 'month']"
    hide-weekends
    editable-events
    :min-event-width="minEventWidth"
    :events="events"&gt;
  &lt;/vue-cal&gt;

ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
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
        title: 'Crossfit',
        content: '&lt;i class="icon mdi mdi-dumbbell"&gt;&lt;/i&gt;',
        class: 'sport'
      },
      ...
    ]
  })

//- Example.
example(title="Background events" anchor="background-events")
  template(#desc)
  template(#code-html).
p.
  Just add the property #[span.code background: true] to your events.#[br]
  The particularity of the background events is that they can fully be overlapped but not overlapping.#[br]
  They are not affected by other events: they stay in the background occupying the whole cell/schedule width.#[br]
  Note that you can still temporarily raise a background event on top of others (z-index) by hovering it or clicking it.
  Refer to the #[span.code events] option in the #[a(href="#api") API] section.
.example.my2.mxa
  vue-cal(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="7 * 60"
    :time-to="23 * 60"
    :disable-views="['years', 'year', 'month']"
    hide-weekends
    :events="backgroundEvents")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;vue-cal
    :selected-date="stringToDate('2018-11-19')"
    :time-from="7 * 60"
    :time-to="23 * 60"
    :disable-views="['years', 'year', 'month']"
    hide-weekends
    :events="events"&gt;
  &lt;/vue-cal&gt;

ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
  data: () => ({
    events: [
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
      ...
    ]
  })

ssh-pre(language="css" label="CSS" :dark="store.darkMode").
  .vuecal__event.lunch {
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, #f2f2f2 10px, #f2f2f2 20px);/* IE 10+ */
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vuecal__event.lunch .vuecal__event-time {display: none;align-items: center;}

//- Example.
example(title="All day events" anchor="all-day-events")
  template(#desc)
  template(#code-html).

ul
  li.mb2.
    When the #[span.code showAllDayEvents] is set to #[span.code true] the events with an
    #[span.code allDay] attribute set to #[span.code true] will be displayed in a fixed top
    bar on the #[span.code week] &amp; #[span.code day] views.#[br]
    The all day events bar will only show up if the options #[span.code showAllDayEvents] &amp;
    #[span.code time] are set to #[span.code true].#[br]
    #[span.code time] is important since without time information every event is an all-day
    event there is no point in separating them then.
  li.mb2.
    When #[span.code showAllDayEvents] is set to #[span.code false], all the all day events
    (#[span.code allDay] attribute set to #[span.code true]), will show up as a normal
    #[strong background event].
  li.mb2.
    On month view, switching #[span.code showAllDayEvents] on and off will not have any impact
    since both should display the all day events.
  li.mb2.
    #[span.code showAllDayEvents] accepts a #[span.code Boolean] or the string
    #[span.code 'short'], to display only the event title.

alert.
  Multiple-day events feature will be improved in a future version to display across
  multiple cells in the all day bar.

w-button.ma1.code(@click="showAllDayEvents = (showAllDayEvents + 1) % 3")
  span.white :show-all-day-events="{{ ["'short'", 'true', 'false'][showAllDayEvents] }}"
w-button.ma1.code(@click="shortEventsOnMonthView = !shortEventsOnMonthView")
  span.white :events-on-month-views="{{ ['true', "'short'"][shortEventsOnMonthView * 1] }}"

.example.my2.mxa
  vue-cal.ex--all-day-events(
    :dark="store.darkMode"
    :selected-date="stringToDate('2019-02-11')"
    :time-from="7 * 60"
    :disable-views="['years', 'year']"
    hide-weekends
    :show-all-day-events="['short', true, false][showAllDayEvents]"
    :events-on-month-view="[true, 'short'][shortEventsOnMonthView * 1]"
    :events="allDayEvents")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;button @click="showAllDayEvents = (showAllDayEvents + 1) % 3"&gt;
    :show-all-day-events="{{ "\{\{ [\"'short'\", 'true', 'false'][showAllDayEvents] \}\}" }}"
  &lt;/button&gt;
  &lt;button @click="shortEventsOnMonthView = !shortEventsOnMonthView"&gt;
    :events-on-month-views="{{ "\{\{ ['true', \"'short'\"][shortEventsOnMonthView * 1] \}\}" }}"
  &lt;/button&gt;

  &lt;vue-cal
    :selected-date="stringToDate('2019-02-11')"
    :time-from="7 * 60"
    :disable-views="['years', 'year']"
    hide-weekends
    :show-all-day-events="['short', true, false][showAllDayEvents]"
    :events-on-month-view="[true, 'short'][shortEventsOnMonthView * 1]"
    :events="events"&gt;
  &lt;/vue-cal&gt;
ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
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

ssh-pre(language="css" label="CSS" :dark="store.darkMode").
  .vuecal__cell-content {align-self: flex-start;}
  .vuecal__cell-date {text-align: right;padding: 4px;}

  .vuecal--week-view .vuecal__scrollable .vuecal__event--all-day.pink-event,
  .vuecal--day-view .vuecal__scrollable .vuecal__event--all-day.pink-event {right: 50%;}
  .vuecal--week-view .vuecal__scrollable .vuecal__event--all-day.leisure,
  .vuecal--day-view .vuecal__scrollable .vuecal__event--all-day.leisure {left: 50%;}

//- Example.
example(title="schedules &amp; schedule events" anchor="schedules")
  template(#desc)
  template(#code-html).
.mb6
  | Split each day into multiple containers passing a CSS class &amp; a label per schedule, and allow schedule-specific events.
  br
  br
  | By default the body of the calendar will fit the container.#[br]
  | But with the options #[span.code min-cell-width] or #[span.code min-schedule-width], you can increase the calendar
  | body width and it will become scrollable horizontally.
  ul
    li #[span.code min-cell-width] will only be activated on week view, since there is only 1 cell in day view.
    li If both #[span.code min-cell-width] and #[span.code min-schedule-width] are set, #[span.code min-schedule-width] will be used.

  | #[br]You can also use the option #[span.code sticky-schedule-labels] to place the schedule labels in the header.#[br]#[br]

  | You can toggle the schedules thanks to the #[span.code hide] property of each schedule in #[span.code schedules].#[br]#[br]

  | Refer to the #[span.code min-cell-width], #[span.code min-schedule-width] and #[span.code schedules] option in the #[a(href="#api") API] section.#[br]#[br]

  .w-flex.align-center.wrap
    w-button.px2.mr2.my1(
      :outline="!schedulesExample.minCellWidth"
      @click="schedulesExample.minCellWidth = schedulesExample.minCellWidth ? 0 : 400")
      w-icon.mr2 mdi mdi-{{ schedulesExample.minCellWidth ? 'close' : 'plus' }}
      | {{ schedulesExample.minCellWidth ? `Min cell width: ${schedulesExample.minCellWidth}px` : 'Add min cell width' }}

    w-button.px2.mr2.my1(
      :outline="!schedulesExample.minScheduleWidth"
      @click="schedulesExample.minScheduleWidth = schedulesExample.minScheduleWidth ? 0 : 200")
      w-icon.mr2 mdi mdi-{{ schedulesExample.minScheduleWidth ? 'close' : 'plus' }}
      | {{ schedulesExample.minScheduleWidth ? `Min schedule width: ${schedulesExample.minScheduleWidth}px` : 'Add min schedule width' }}

    w-button.px2.mr2.my1(
      :outline="!schedulesExample.stickyScheduleLabels"
      @click="schedulesExample.stickyScheduleLabels = !schedulesExample.stickyScheduleLabels")
      w-icon.mr2 mdi mdi-{{ schedulesExample.stickyScheduleLabels ? 'close' : 'plus' }}
      | Sticky Schedule Labels

    w-button.px2.my1(
      :outline="schedulesExample.schedules[1].hide"
      @click="schedulesExample.schedules[1].hide = !schedulesExample.schedules[1].hide")
      w-icon.mr2 mdi mdi-{{ schedulesExample.schedules[1].hide ? 'plus' : 'close' }}
      | {{ schedulesExample.schedules[1].hide ? 'Show' : 'Hide' }} Dad

.example.grow.my2(style="height: 600px")
  vue-cal(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="8 * 60"
    :time-step="30"
    :disable-views="['years', 'year']"
    editable-events
    :events="scheduleEvents"
    :schedules="schedulesExample.schedules"
    :sticky-schedule-labels="schedulesExample.stickyScheduleLabels"
    :min-cell-width="schedulesExample.minCellWidth"
    :min-schedule-width="schedulesExample.minScheduleWidth")
ssh-pre(language="html-vue" label="Vue Template" :dark="store.darkMode").
  &lt;button @click="minCellWidth = minCellWidth ? 0 : 400"&gt;
    {{ '\{\{ minCellWidth ? \'min cell width: 400px\' : \'Add min cell width\' \}\}' }}
  &lt;/button&gt;
  &lt;button @click="minScheduleWidth = minScheduleWidth ? 0 : 200"&gt;
    {{ '\{\{ minScheduleWidth ? \'min schedule width: 200px\' : \'Add min schedule width\' \}\}' }}
  &lt;/button&gt;
  &lt;button @click="stickyScheduleLabels = !stickyScheduleLabels"&gt;
    Sticky Schedule Labels
  &lt;/button&gt;
  &lt;button @click="schedules[1].hide = !schedules[1].hide"&gt;
    Show/Hide Dad
  &lt;/button&gt;

  &lt;vue-cal
    :selected-date="stringToDate('2018-11-19')"
    :time-from="8 * 60"
    :time-step="30"
    :disable-views="['years', 'year', 'month']"
    editable-events
    :events="events"
    :schedules="schedules"
    :sticky-schedule-labels="stickyScheduleLabels"
    :min-cell-width="minCellWidth"
    :min-schedule-width="minScheduleWidth"&gt;
  &lt;/vue-cal&gt;

ssh-pre(language="js" label="Javascript" :dark="store.darkMode").
  data: () => ({
    stickyScheduleLabels: false,
    minCellWidth: 400,
    minScheduleWidth: 0,
    schedules: [
      // The id property is added automatically if none (starting from 1), but you can set a custom one.
      // If you need to toggle the schedules, you must set the id explicitly.
      { id: 1, class: 'mom', label: 'Mom' },
      { id: 2, class: 'dad', label: 'Dad', hide: false },
      { id: 3, class: 'kid1', label: 'Kid 1' },
      { id: 4, class: 'kid2', label: 'Kid 2' },
      { id: 5, class: 'kid3', label: 'Kid 3' }
    ]
    events: [
      {
        start: '2018-11-19 10:35',
        end: '2018-11-19 11:30',
        title: 'Doctor appointment',
        content: '&lt;i class="icon mdi mdi-hospital-box-outline"&gt;&lt;/i&gt;',
        class: 'health',
        schedule: 1 // Has to match the id of the schedule you have set (or integers if none).
      },
      {
        start: '2018-11-19 18:30',
        end: '2018-11-19 19:15',
        title: 'Dentist appointment',
        content: '&lt;i class="icon mdi mdi-hospital-box-outline"&gt;&lt;/i&gt;',
        class: 'health',
        schedule: 2
      },
      {
        start: '2018-11-20 18:30',
        end: '2018-11-20 20:30',
        title: 'Crossfit',
        content: '&lt;i class="icon mdi mdi-dumbbell"&gt;&lt;/i&gt;',
        class: 'sport',
        schedule: 1
      },
      ...
    ]
  })

ssh-pre(language="css" label="CSS" :dark="store.darkMode").
  /* You can easily set a different style for each schedule of your days. */
  .vuecal__cell-schedule.dad {background-color: rgba(221, 238, 255, 0.5);}
  .vuecal__cell-schedule.mom {background-color: rgba(255, 232, 251, 0.5);}
  .vuecal__cell-schedule.kid1 {background-color: rgba(221, 255, 239, 0.5);}
  .vuecal__cell-schedule.kid2 {background-color: rgba(255, 250, 196, 0.5);}
  .vuecal__cell-schedule.kid3 {background-color: rgba(255, 206, 178, 0.5);}
  .vuecal__cell-schedule .schedule-label {color: rgba(0, 0, 0, 0.1);font-size: 26px;}

  /* Different color for different event types. */
  .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
  .vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
  .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'
import ViewExamples from './view.vue'

const store = useAppStore()

const ex = ref({
})
</script>

<style lang="scss" scoped>
</style>
