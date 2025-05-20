<template lang="pug">
alert.py3(info)
  p.mb2.
    The calendar allows you to interact with events in various ways.#[br]
    Here are some examples of how you can create, edit, delete, and drag &amp; drop events.

  p.text-bold.mt4 There are 5 types of event interactions:
  ul.no-bullet.ml0
    li.mt3
      .title3
        w-icon.mr2.success(md) wi-check
        | Read
      p.ml7.
        The events are displayed on the calendar and can show more details, usually on click,
        like seen in the #[router-link(to="/examples/calendar-events--display#ex--open-dialog-on-event-click") Open Dialog on Event Click] example.
    li.mt4
      .title3
        w-icon.mr2.success(md) wi-check
        | Create
      p.ml7 Create an event by clicking and dragging on a cell, by default.
    li.mt4
      .title3
        w-icon.mr2.success(md) wi-check
        | Delete
      p.ml7 Delete an event by double clicking on it, by default.
    li.mt4
      .title3
        w-icon.mr2.success(md) wi-check
        | Resize
      p.ml7 Resize an event by dragging its resizer handle.
    li.mt4
      .title3
        w-icon.mr2.success(md) wi-check
        | Drag
      p.ml7 Drag and drop an event onto any cell that is not disabled.

//- Example.
example(ref="exCreateEventsExampleEl" title="Create Events" anchor="create-events")
  template(#desc)
    .w-flex.wrap.gap3
      .grow.xs7
        p.
          Events can be created in various ways: programmatically or through user interaction with a calendar cell.#[br]
          The default interaction is a click and drag gesture, but you can define the type of interaction you
          want.#[br]
          The event creation can then be completed by an edition dialog box or not.
        p.mt3.
          With the #[code snapToInterval] option, you can make sure the event starts and ends at specific
          intervals of minutes.#[br]
          E.g. #[code :snap-to-interval="15"] will snap the event to the closest #[code :00], #[code :15],
          #[code :30], #[code :45] while dragging.#[br]
          This option also applies on event resizing after the drag-creation.
        p.mt3.
          With the #[code eventCreateMinDrag] option, you can define the minimum drag distance in pixels
          before the event creation starts. This can be useful to prevent accidental event creation when
          navigating the calendar.

      w-image.bd1.bdrs2.sh2(
        :src="`${baseUrl}images/click-and-drag.webp`"
        alt="Create Events"
        width="250"
        lazy)
    alert The event creation is only available on a day cell: not on year &amp; years views.

    .w-flex.justify-end.gap2.mt2
      label Create Event On Cell
      div
        w-radios(
          v-model="exCreateEvents.createMethod"
          @update:model-value="(exCreateEventsExampleEl || {}).refreshHeight"
          :items="exCreateEvents.createMethods")
        p.caption.mt1 (Or however you want)
    .w-flex.align-center.justify-end.gap3.mt4.wrap
      w-switch(
        v-model="exCreateEvents.skipCreationDialog"
        @update:model-value="(exCreateEventsExampleEl || {}).refreshHeight") Skip Creation Dialog
      w-switch(v-model="exCreateEvents.snapToInterval") Snap to Interval: #[span.code.transparent--bg.inherit 15min]
      w-switch(v-model="exCreateEvents.eventCreateMinDrag") Event Create Drag Min: #[span.code.transparent--bg.inherit 15px]
  template(#code-html)
    | &lt;vue-cal
    |   {{ exCreateEvents.createMethod === 'event-create' ? '' : 'ref="exCreateEventsVueCalEl"\n  ' }}{{ exCreateEvents.snapToInterval ? ':snap-to-interval="15"\n  ' : '' }}{{ exCreateEvents.eventCreateMinDrag ? ':event-create-min-drag="15"\n  ' : '' }}editable-events
    |   @{{ exCreateEvents.createMethod }}="createEvent"&gt;
    | &lt;/vue-cal&gt;
    template(v-if="!exCreateEvents.skipCreationDialog")
      |
      |
      | &lt;!-- Using Wave UI - https://antoniandre.github.io/wave-ui --&gt;
      | &lt;w-dialog
      |   v-if="newEvent"
      |   v-model="showCreationDialog"
      |   width="300"
      |   @close="cancelCreation"&gt;
      |   &lt;w-input v-model="newEvent.title"&gt;Event Title&lt;/w-input&gt;
      |   &lt;w-input v-model="newEvent.class"&gt;Event Class&lt;/w-input&gt;
      |   &lt;w-switch v-model="newEvent.background"&gt;Background&lt;/w-switch&gt;
      |   &lt;div class="w-flex justify-end mt2 gap2"&gt;
      |     &lt;w-button @click="cancelCreation"&gt;Cancel&lt;/w-button&gt;
      |     &lt;w-button @click="validateCreation"&gt;OK&lt;/w-button&gt;
      |   &lt;/div&gt;
      | &lt;/w-dialog&gt;
    span(v-else)

  template(#code-js)
    template(v-if="exCreateEvents.createMethod === 'event-create'")
    template(v-else)
      | const exCreateEventsVueCalEl = ref(null)
      |

    template(v-if="exCreateEvents.createMethod === 'event-create' && exCreateEvents.skipCreationDialog")
      | const createEvent = ({ event, resolve }) => {
      |   resolve({
      |     ...event,
      |     title: 'New Event! 🎉'
      |   })
      | }
      |
    template(v-else-if="exCreateEvents.createMethod === 'event-create'")
      | const createEvent = ({ event, resolve }) => {
      |   openCreationDialog({ event, resolve })
      | }
      |
    template(v-else-if="exCreateEvents.createMethod !== 'event-create'")
      |
      | const createEvent = ({ event, cursor }) => {
      |   event.start = cursor.date
      |   event.end = cursor.date.addHours(1) // Uses Vue Cal's Date prototypes.
      |   exCreateEventsVueCalEl.value.view.createEvent(event)
      | }
    template(v-else)
      |

    template(v-if="!exCreateEvents.skipCreationDialog")
      |
      | const showCreationDialog = ref(false)
      | const createEventFn = ref(null)
      | const newEvent = ref({
      |   title: '',
      |   background: false,
      |   class: ''
      | })
      |
      | const openCreationDialog = ({ event, resolve }) => {
      |   showCreationDialog.value = true
      |   newEvent.value = event
      |   createEventFn.value = resolve
      | }
      |
      | const cancelCreation = () => {
      template(v-if="exCreateEvents.createMethod === 'event-create'")
        |
        |   createEventFn.value(false)
      template(v-else)
      |
      |   showCreationDialog.value = false
      | }
      |
      | const validateCreation = () => {
      template(v-if="exCreateEvents.createMethod !== 'event-create'")
        |
        |   exCreateEventsVueCalEl.value.view.createEvent({
        |     ...newEvent.value,
        |     start: cursor.date,
        |     end: cursor.date.addHours(1) // Uses Vue Cal's Date prototypes.
        |   })
      template(v-else)
        |
        |   createEventFn.value(newEvent.value)
      |
      |   showCreationDialog.value = false
      | }
    template(v-else)
  vue-cal(
    ref="exCreateEventsVueCalEl"
    :editable-events="{ edit: true, resize: true, create: exCreateEvents.createMethod === 'event-create', delete: true }"
    @[exCreateEvents.createMethod]="exCreateEvents.createEvent"
    :events="exCreateEvents.events"
    :snap-to-interval="exCreateEvents.snapToInterval ? 15 : 0"
    :event-create-min-drag="exCreateEvents.eventCreateMinDrag ? 15 : 0"
    :time-from="9 * 60"
    :time-to="15 * 60"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :views-bar="false"
    :dark="store.darkMode")
  w-dialog(
    v-if="exCreateEvents.newEvent"
    v-model="exCreateEvents.showCreationDialog"
    width="300"
    @close="exCreateEvents.cancel")
    w-input(v-model="exCreateEvents.newEvent.title") Event Title
    w-input.my4(v-model="exCreateEvents.newEvent.class") Event Class
    w-switch(v-model="exCreateEvents.newEvent.background") Background
    .w-flex.justify-end.mt2.gap2
      w-button(@click="exCreateEvents.cancel") Cancel
      w-button(@click="exCreateEvents.save") OK

//- Example.
example(title="Create Events Programmatically" anchor="create-events-programmatically")
  template(#desc)
    p.my2.
      In order to create events programmatically, from an external button for instance, you need to call
      the vue-cal #[code view.createEvent()] function from a Vue ref.
    .w-flex.mb3.justify-end
      w-button(sm @click="exExternalEventCreate.createEvent")
        w-icon.mr1 mdi mdi-plus
        | Create Event

  template(#code-html).
    &lt;button @click="createEvent"&gt;Create Event&lt;/button&gt;

    &lt;vue-cal
      ref="vuecalRef"
      editable-events&gt;
    &lt;/vue-cal&gt;

  template(#code-js).
    const vuecalRef = ref(null)

    const createEvent = () => {
      vuecalRef.value.view.createEvent({
        start: new Date(),
        end: new Date().addHours(1), // Using Vue Cal's Date prototypes.
        title: 'New Event 🎉'
      })
    }
  vue-cal(
    ref="exExternalEventCreateVuecalRef"
    editable-events
    @ready="({ view }) => view.scrollToCurrentTime()"
    @event-created="event => event._.$el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :views-bar="false"
    :dark="store.darkMode")

//- Example.
example(title="Delete Events" anchor="delete-events")
  template(#desc)
    h4.mt4.mb0 A. Deletion Rules
    p.mb2.
      The deletion of events is allowed or denied when the #[code editable-events] option is set to
      #[code true] or #[code false] - or more granularly #[code editable-events.delete], when
      #[code editable-events] is provided as an object:
    ssh-pre(language="js" :dark="store.darkMode").
      { drag: true, resize: true, delete: true, create: true }
    alert.
      In addition to the global settings, you can override the deletion ability individually for each
      event using the event attributes #[code deletable: false].

    h4.mt4.mb0 B. Default Behavior &amp; Flexibility
    p.
      The deletion of an event is straightforward and extremely flexible.#[br]
      By default it is triggered by a double click/tap on the event, which displays a delete button.
      On click/tap on this button, the event is deleted.#[br]
      This gesture has the advantage of not interfering with the single click/tap event, which can be
      used for other actions, and not interfering with the drag &amp; drop gesture.

    p.mt4 You can easily override this behavior by:
    ol.ml4
      li.
        Resetting the double-click event, only with #[code @double-click="false"], or use
        #[code @double-click] for another action.
      li.
        Optionally assigning a different interaction for the deletion with: #[code @event-xxx="$event.delete"],
        where #[code xxx] can be replaced with #[code click], #[code hold], #[code contextmenu], or whatever
        valid event you want.#[br]

    h4.mt4.mb0 C. The Delete Function
    div
      | Every event has a delete function that you can call from the event object itself:
      ssh-pre.d-iblock.pr5.py0.ml1.mb0(language="js" :dark="store.darkMode") event.delete()

    p.
      For more flexibility, this function can receive an explicit "deletion stage" integer parameter,
      so you can skip to the stage you want directly:
    ul
      li.
        #[code 1]: The delete button will appear. On click, the event is deleted directly in the global
        events array (source of truth) and visually from the cell.
      li
        | #[code 2]:
        span.ml1.
          The event is deleted visually from the cell but not in the global events array (source of truth) yet.
          This has the advantage of not triggering an immediate Vue reactivity update cascade on all the
          cells.#[br]
          The rerendering cascade of the cells is completely avoided by deleting the event on the next view
          change, when the cell is unmounted.#[br]
          even though this stage is more optimized than the stage #[code 3], it can be non-obvious or confusing
          for the developer that the event is still in the array at this stage until the view changes.
          Especially if you use a v-model on the events. For this reason, the stage #[code 3] is the default
          behavior from the delete button.
      li.
        #[code 3]: The event is deleted both visually and in the source of truth (automatically called on
        cell unmount after using stage #[code 2]).
    p.mt4.
      For more flexibility, there is also a #[code view.deleteEvent(eventId, stage)] function:
    ul
      li Which takes two arguments: the internal ID of the event (found in #[code event._.id]) to delete and a "deletion stage" integer just as described.
      li Can also delete an event by a specific custom event property, like #[code event.id] or #[code event.doctorId], etc. by passing a key-value pair as an object in the first argument. E.g. #[code view.deleteEvent({ id: 1 }, 3)].

    p.mt6 Now let's view all this in action!
    .w-flex.align-start.gap3.justify-end
      w-switch.no-grow(v-model="exDeleteEvents.editableEvents" label-color="base") Editable Events
      w-switch.no-grow(v-model="exDeleteEvents.skipDeleteButton" label-color="base") Skip Delete Button
      .w-flex.gap2.d-iflex.no-grow
        span Delete on:
        w-radios(
          v-model="exDeleteEvents.deleteMethod"
          :items="exDeleteEvents.deleteMethods"
          label-color="base")

  template(#code-html).
    &lt;vue-cal
      {{ exDeleteEvents.editableEvents ? 'editable-events' : ':editable-events="false"' }}
      {{ exDeleteEvents.deleteMethod === 'hold' ? `\n  @event-dblclick="false"\n  @event-hold="$event.delete${exDeleteEvents.skipDeleteButton ? '(3)' : ''}"` : `${exDeleteEvents.skipDeleteButton ? '\n  @event-dblclick="$event.delete(3)"' : ''}` }}
      :events="events"&gt;
    &lt;/vue-cal&gt;

  vue-cal(
    :events="exDeleteEvents.events"
    :editable-events="exDeleteEvents.editableEvents"
    v-on="exDeleteEvents.eventListeners"
    @event-delete="e => console.log('Event deleted!', e)"
    :time-from="9 * 60"
    :time-to="15 * 60"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :view-date="exDeleteEvents.viewDate"
    :views-bar="false"
    :dark="store.darkMode")

//- Example.
example(title="Edit Events" anchor="edit-events")
  template(#desc)
    p.mb2.
      Editing events is allowed or denied when the #[code editable-events] option is set to
      #[code true] or #[code false]. But more granularly, #[code editable-events] can be provided
      as an object:
    ssh-pre(language="js" :dark="store.darkMode").
      { create: true, resize: true, drag: true, delete: true }
    p With:
    ul
      li #[strong.code create]: Create a new event (by clicking and dragging by default).
      li.
        #[strong.code resize]: Resize an event by dragging the resizer handle.
        #[strong Not available if no timeline, not allowed on background events.]
      li.
        #[strong.code drag]: Drag &amp; drop an event (not allowed on background events).
      li #[strong.code delete]: Delete an event (by double clicking an event by default).

    alert.
      In addition to the global settings, you can override these actions individually for each
      event using the event attributes, #[code deletable: false], #[code draggable: false] &amp;
      #[code resizable: false].

    .w-flex.justify-end.wrap.gap2
      w-switch(v-model="exEditEvents.creatable") Create Events
      w-switch(v-model="exEditEvents.resizable") Resize Events
      w-switch(v-model="exEditEvents.draggable") Drag Events
      w-switch(v-model="exEditEvents.deletable") Delete Events

  template(#code-html).
    &lt;vue-cal
      :editable-events="{ create: {{ exEditEvents.creatable ? 'true' : 'false' }}, resize: {{ exEditEvents.resizable ? 'true' : 'false' }},  drag: {{ exEditEvents.draggable ? 'true' : 'false' }}, delete: {{ exEditEvents.deletable ? 'true' : 'false' }} }"
      :events="events"&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
    const events = [
      {
        start: new Date(new Date().addDays(2).setHours(11, 0, 0, 0)), // Using Vue Cal's Date prototypes.
        end: new Date(new Date().addDays(2).setHours(13, 0, 0, 0)), // Using Vue Cal's Date prototypes.
        title: 'Boring Event',
        content: '&lt;i class="icon mdi mdi-cancel"&gt;&lt;/i&gt;&lt;br&gt;Can&rsquo;t drag, resize or delete me!',
        class: 'blue-event',
        deletable: false,
        resizable: false,
        draggable: false
      },
      ...
    ]

  vue-cal(
    ref="exEditEventsVuecalRef"
    :editable-events="{ create: exEditEvents.creatable, resize: exEditEvents.resizable, drag: exEditEvents.draggable, delete: exEditEvents.deletable }"
    :events="exEditEvents.events"
    :time-from="9 * 60"
    :time-to="15 * 60"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :views-bar="false"
    :dark="store.darkMode")
    template(#event="{ event }")
      strong {{ event.title }}
      p {{ event.start.formatTime() }} - {{ event.end.formatTime() }}
      p(v-html="event.content")

//- Example.
example(title="Events v-model" anchor="events-v-model")
  template(#desc)
    p.
      The good news is that the events prop is a two-way binding! So you can use it to read or write with
      #[code v-model:events]! But...
    alert.mb4(tip)
      .title4.mt-1 With great powers comes great responsibility
      p.
        Be aware that modifying the array of events externally will always override the internal array.#[br]
        So you must be sure to save the changes that were made to events through the Vue Cal UI, or they
        will be lost.

    p.mb2.
      In this example, you can add or remove events from the array of events and they will be displayed in the
      box below. You can also create events in the calendar with a click and drag, and resize or drag and drop
      them.#[br]
      The events in the list will accurately display the updated start and end times.
    .w-flex.justify-space-between.gap2.wrap.mt4
      .title4 Current List of Events
      .w-flex.align-end.no-grow.gap1.mb1
        w-button(@click="exEventsVModel.addEvent")
          w-icon.mr2 mdi mdi-plus
          | Add Event
        w-button(@click="exEventsVModel.events.pop()")
          w-icon.mr2 mdi mdi-trash-can-outline
          | Remove Last Event
    .size--xs.w-flex.pa2.ova.gap2.wrap.bdrs2.bd1(style="min-height: 100px;background-color: color-mix(in srgb, var(--w-base-color) 3%, transparent);")
      .w-flex.column.align-center.justify-center(v-if="!exEventsVModel.events.length")
        .caption No events yet.
      .bdrs2.bd1.w-flex.column.align-center.justify-center.pa1.no-grow.blue--bg.white(v-for="event in exEventsVModel.events")
        .title3 {{ event.title }}
        .size--xs {{ event.start.formatTime() }} - {{ event.end.formatTime() }}

  template(#code-html).
    &lt;button
      @click="events.push({
        start: new Date(),
        end: new Date().addHours(1), // Using Vue Cal's Date prototypes.
        title: 'Event 1'
      })"&gt;Add Event&lt;/button&gt;
    &lt;button @click="events.pop()"&gt;Remove last event&lt;/button&gt;

    &lt;vue-cal v-model:events="events" /&gt;
  template(#code-js).
    const events = [
      {
        start: new Date(new Date().setHours(9, 0, 0, 0)),
        end: new Date(new Date().setHours(10, 0, 0, 0)),
        title: 'Event 1'
      },
      ...
    ]
  vue-cal(
    ref="exEventsVModelVuecalRef"
    v-model:events="exEventsVModel.events"
    editable-events
    @ready="({ view }) => view.scrollToCurrentTime()"
    @event-create="exEventsVModel.onEventCreate"
    @event-dblclick="({ event }) => event.delete(2)"
    :editable-events="exEventsVModel.editableEvents"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :views-bar="false"
    :dark="store.darkMode")

//- Example.
example(title="Event Drag & Drop" anchor="drag-and-drop")
  template(#desc)
    .todo-tag.d-iflex FINISH THIS EXAMPLE - DISABLE A DAY
    p.
      The drag &amp; drop functionality is available for single-day foreground events only and is powered by
      the native HTML5 drag &amp; drop API (widely supports touch devices).#[br]
      It allows you to move an event from one cell to another, or from an external source to the calendar
      and vice-versa.
    .title5.mt4 Good to Know:
    ul
      li.mt2.
        The drag &amp; drop feature is enabled with #[code editable-events] set to true, but you can specifically
        disable it by setting the #[code editable-events.drag] option to #[code false].#[br]
        You can also disable it for a specific event by setting the #[code draggable] attribute to #[code false].

      li.mt2.
        While dragging an event, the clone at cursor receives the #[code .vuecal__event--dragging-ghost] CSS
        class, while the original event receives the #[code .vuecal__event--dragging-original] CSS class (the
        original is hidden by default while dragging). You can override these styles with your own CSS.
      li.
        By default, when you drop the event it will start exactly where you dropped it,
        but if you prefer you can use the #[code snapToInterval] option to dictate where it should
        snap to (refer to #[code snapToInterval] in the #[a(href="#api") API section]).#[br]
        If you wonder why it does not represent the snapping while dragging, it's not possible to do it with
        the native HTML5 drag &amp; drop.

    //- @todo:
    //- h5 Dragging over header
    //- ul
      li.
        While you drag an event over the view selector buttons, the previous and next arrows,
        or even the today button, they will get into a highlighted state. If you hold over them for
        a few milliseconds, they will change the view so you can drop the event you are holding
        on another date of the calendar.
      li.
        While dragged over, the previous and next buttons will keep changing the view until you move
        away from the button.
      li.
        Dragging an event over the today button will take you to today's date. If you're in
        a #[code years] or #[code year] view, it will also go to the next available
        narrower view from #[code month] downwards.
    //- h5 Dragging over a cell
    //- ul
      li.
        If you drag an event over a cell or a day schedule
        (refer to #[a(href="#ex--schedules") schedules]), the cell/schedule gets into a
        highlighted state, showing you where the event would go if you drop it.
      li.
        You can drop an event in any cell. However, because it does not make much sense to drop it into a
        #[code years] or #[code year] view, if you hold over a cell
        in these views or in #[code month] view, it will go to the next available narrower
        view so you can at least see a day cell.
    //- h5 Dropping the event into a cell or somewhere not allowed
    //- ul
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

    //- h5 CSS styles
    //- ul
      li
        | You can change the highlighted style of the header buttons or cells through these CSS classes:
        ul
          li #[code .vuecal__view-btn--highlighted]
          li #[code .vuecal__today-btn--highlighted]
          li #[code .vuecal__arrow--highlighted]
          li #[code .vuecal__cell--highlighted]
          li #[code .vuecal__schedule--highlighted]
    alert
      p If you listen for the #[code event-drop] event, you will receive an object with the following:
      ul
        li #[code event]: The event object that was dropped (contains the date and schedule where it was dropped).
        li #[code cell]: The cell object where the event was dropped.
        li #[code e]: The JavaScript native event object.
        li #[code overlaps]: An array of events that overlap the dropped event.
      p From the same event listener, you can #[strong reject the drop by returning #[code false]].

    .w-flex.wrap.gap3.justify-end.mt8
      w-switch(v-model="exDragAndDrop.draggableEvents" label-color="base") Draggable Events
      w-tooltip(align-right)
        template(#activator="{ on }")
          div(v-on="on")
            w-switch(v-model="exDragAndDrop.overlappableEvents" label-color="base") Overlappable Events
        | Allow dropping events on top of other events
      w-tooltip(align-right)
        template(#activator="{ on }")
          div(v-on="on")
            w-switch(v-model="exDragAndDrop.snapToInterval" label-color="base") Snap to Interval
        | Snap the event to the closest round hour when dropped or resized
      w-tooltip(align-right)
        template(#activator="{ on }")
          div(v-on="on")
            w-switch(v-model="exDragAndDrop.overrideDragCss" label-color="base") Override Draggable CSS
        | Override the default event dragging CSS styles

  template(#code-html).
    &lt;vue-cal
      :events="events"
      :editable-events="{ drag: {{ exDragAndDrop.draggableEvents ? 'true' : 'false' }} }"
      {{ exDragAndDrop.snapToInterval ? `:snap-to-interval="60"\n  ` : '' }}@event-drop="onEventDrop"
      :schedules="schedules"&gt;
    &lt;/vue-cal&gt;
  template(#code-js)
    | const schedules = [{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]
    |
    template(v-if="exDragAndDrop.overlappableEvents")
      |
      | const onEventDrop = ({ e, event, cell }) => {
      |   console.log('Event dropped!', event, cell)
      |   // Return false to reject the drop.
      | }
    template(v-else)
      |
      | const onEventDrop = ({ e, event, cell, overlaps }) => !overlaps.length
      |
      |
  template(#code-css v-if="exDragAndDrop.overrideDragCss").
    .vuecal__event--dragging-ghost {
      opacity: 1;
      background-color: #adff2f;
      border: none;
      color: #000;
    }
    .vuecal__event--dragging-original {
      opacity: 0.8;
      border: 1px dashed var(--vuecal-event-border-color);
      transform: scale(0.8);
      transition: transform 0.2s ease-in-out;
    }

  vue-cal(
    :events="exDragAndDrop.events"
    :editable-events="{ drag: exDragAndDrop.draggableEvents }"
    @event-drop="exDragAndDrop.onEventDrop"
    :schedules="[{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]"
    :time-from="9 * 60"
    :time-to="15 * 60"
    :snap-to-interval="exDragAndDrop.snapToInterval ? 60 : 0"
    :views="{ days: { cols: 5, rows: 1 } }"
    view="days"
    :views-bar="false"
    :dark="store.darkMode"
    :class="{ 'override-drag-css': exDragAndDrop.overrideDragCss }"
    style="height: 327px")

//- Example.
example(title="External Events Drag & Drop" anchor="external-events-drag-and-drop")
  template(#desc)
    p.mb2.
      You can drag &amp; drop events from an external source as long as they are HTML5 draggable (this will change when touch devices are supported).#[br]
      It is also possible to move an event from one calendar to another.#[br]#[br]
      In the external event, you can set a #[code duration] property: it will be used to set the duration of the event when dropped in Vue Cal.#[br]
      If the #[code duration] is missing, the default duration will be equal to the time interval.#[br]
      Once the event is dropped into Vue Cal, it will be removed from the external source and its duration will be calculated in #[code event._.duration].

    alert(tip)
      strong Important note when dragging external events into Vue Cal:
      div.
        It's important to understand that the native HTML5 drag &amp; drop, does not move an element from its
        source to the destination. It only creates a copy of the element that you drag.#[br]
        When you drop a DOM element to another location, you have to code the actual move yourself:
        delete from source and create in destination.#[br]
        Learn how in the example source code below!
    p In this example, you can drag the external events into the calendar and vice-versa.
  template(#code-html).
    &lt;div
      class="external-event"
      v-for="(item, i) in draggables"
      :key="i"
      draggable="true"
      @dragstart="onEventDragStart($event, item)"&gt;
      &lt;strong&gt;{{ '\{\{ item.title \}\}' }}&lt;/strong&gt;
      ({{ "\{\{ (item._ || {}).duration || item.duration ? `${(item._ || {}).duration || item.duration} min` : 'no duration' \}\}" }})
    &lt;/div&gt;

    &lt;vue-cal
      :views-bar="false"
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
            duration: 60
          },
          {
            id: 2,
            title: 'Ext. Event 2',
            duration: 30
          },
          {
            id: 3,
            title: 'Ext. Event 3',
            // No defined duration: defaults to a time step on drop.
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

  .w-flex.mt4.wrap.gap2.basis-zero
    .external-events.w-flex.column.gap2(
      @drop="exExternalEventsDragDrop.onEventDropInBank"
      @dragover.prevent)
      .title4.primary.text-center Ext. Events
      .external-event(
        v-for="(item, i) in exExternalEventsDragDrop.events"
        :key="i"
        draggable="true"
        @dragstart="exExternalEventsDragDrop.onEventDragStart($event, item)")
        strong.mr2 {{ item.title }}
        .caption ({{ (item._ || {}).duration || item.duration ? `${(item._ || {}).duration || item.duration} min` : 'no duration' }})
    vue-cal.grow(
      ref="exExternalEventsDragDropEl1"
      @event-drop="exExternalEventsDragDrop.onEventDrop"
      editable-events
      :views-bar="false"
      :views="{ days: { cols: 3, rows: 1 } }"
      view="days"
      :time-from="9 * 60"
      :time-to="15 * 60"
      small
      :today-button="false"
      :dark="store.darkMode")
    vue-cal.grow(
      ref="exExternalEventsDragDropEl2"
      @event-drop="exExternalEventsDragDrop.onEventDrop"
      editable-events
      :views-bar="false"
      :views="{ days: { cols: 3, rows: 1 } }"
      view="days"
      :time-from="9 * 60"
      :time-to="15 * 60"
      small
      :today-button="false"
      :dark="store.darkMode")

//- Example.
example(title="Reject Event Drag & Drop or Resizing" anchor="reject-event-dnd-or-resizing")
  template(#desc)
    p.
      The drag &amp; drop and resizing of events can be rejected by returning #[code false] from the
      #[code event-drop], #[code event-resize] and #[code event-resize-end] event listeners.
    p.
      This is useful when you want to prevent an event from being moved or resized in certain conditions.
      For example, you can reject the drop of an event on top of another event, or prevent an event from
      being resized if it's too close to another event.

    .w-flex.wrap.column.gap3.align-end.mt6
      w-switch(v-model="exRejectDndOrResize.preventOverlapOnDrop" label-color="base") Prevent Event Overlap On Drop
      w-switch(
        v-model="exRejectDndOrResize.preventOverlapWhileResizing"
        label-color="base") Prevent Overlap WHILE Resizing
      w-switch(
        v-model="exRejectDndOrResize.preventOverlapAfterResizing"
        label-color="base") Prevent Overlap AFTER Resizing
  template(#code-html).
    &lt;vue-cal
      :events="events"
      editable-events
      @event-drop="onEventDrop"
      @event-resize="onEventResize"
      @event-resize-end="onEventResizeEnd"&gt;
    &lt;/vue-cal&gt;
  template(#code-js)
    | const events = [
    |   {
    |     start: new Date(new Date().setHours(11, 0, 0, 0)),
    |     end: new Date(new Date().setHours(13, 0, 0, 0)),
    |     title: 'Event 1'
    |   },
    |   ...
    | ]
    |
    template(v-if="exRejectDndOrResize.preventOverlapOnDrop")
      |
      | const onEventDrop = ({ e, event, cell, overlaps }) => {
      |  return !overlaps.length
      | }
      |
    template(v-else)
    template(v-if="exRejectDndOrResize.preventOverlapWhileResizing")
      |
      | const onEventResize = ({ e, event, overlaps }) => {
      |  return !overlaps.length
      | }
      |
    template(v-else)
    template(v-if="exRejectDndOrResize.preventOverlapAfterResizing")
      |
      | const onEventResizeEnd = ({ e, event, overlaps }) => {
      |  return !overlaps.length
      | }
      |
    template(v-else)

  vue-cal(
    :events="exRejectDndOrResize.events"
    editable-events
    @event-drop="exRejectDndOrResize.onEventDrop"
    @event-resize="exRejectDndOrResize.onEventResize"
    @event-resize-end="exRejectDndOrResize.onEventResizeEnd"
    :time-from="9 * 60"
    :time-to="15 * 60"
    :dark="store.darkMode"
    style="height: 331px")

//- Example.
example(title="Events Reactivity" anchor="events-reactivity")
  template(#desc)
    p.
      The events are reactive and will update when the external data changes.<br>
      For instance, in this example, the events are changing their background color every second from
      the external array and the calendar will keep the events up to date.<br>
      Note that #[code backgroundColor] is a special event property that Vue Cal parses to apply to
      the events.
    p.
  template(#code-html).
    &lt;vue-cal
      :events="events"
      editable-events
      @ready="onReady"&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
    const events = [
      {
        start: new Date(new Date().setHours(12, 30)),
        end: new Date(new Date().setHours(13, 30)),
        title: 'Event 1'
      },
      {
        start: new Date(new Date().setHours(11, 30)).addDays(1), // Using Vue Cal's Date prototypes.
        end: new Date(new Date().setHours(12, 30)).addDays(1), // Using Vue Cal's Date prototypes.
        title: 'Event 2'
      }
    ]
    const colors = ['crimson', 'cornflowerblue', 'darkgreen', 'blueviolet', 'darkmagenta', 'teal']
    const interval = null

    const onReady = () => {
      // Mutate the event objects externally, Vue Cal keeps them reactive.
      interval = setInterval(() => {
        events[0].backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        events[1].backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      }, 1000)
    }

  template(#code-css).
    .vuecal__event {transition: background-color 1s;}

  vue-cal(
    :views="{ days: { cols: 3, rows: 1 } }"
    view="days"
    :views-bar="false"
    :events="exEventsReactivity.events"
    editable-events
    @ready="exEventsReactivity.onReady"
    :time-from="9 * 60"
    :time-to="15 * 60"
    :dark="store.darkMode")
</template>

<script setup>
import { computed, reactive, ref, onBeforeUnmount } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, stringToDate } from '@/vue-cal'

const store = useAppStore()

const baseUrl = computed(() => import.meta.env.BASE_URL)
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

const exCreateEventsExampleEl = ref(null)
const exCreateEventsVueCalEl = ref(null)
const exCreateEvents = reactive({
  createMethods: [
    { value: 'event-create', label: 'Click & Drag' },
    { value: 'cell-dblclick', label: 'Double Click' },
    { value: 'cell-contextmenu', label: 'Right Click' },
    { value: 'cell-hold', label: 'Click & Hold' }
  ],
  createMethod: ref('event-create'),
  createEvent: ({ e, event, cell, resolve, cursor }) => {
    e.preventDefault()
    event = {
      ...(event || {}),
      title: 'New Event! 🎉',
      start: event?.start || cursor.date,
      end: event?.end || cursor.date.addHours(1),
      class: 'blue-event'
    }
    resolve = resolve || exCreateEventsVueCalEl.value.view.createEvent
    if (exCreateEvents.skipCreationDialog) resolve(event)
    else exCreateEvents.openCreationDialog({ e, event, cell, resolve, cursor })
  },
  skipCreationDialog: ref(true),
  showCreationDialog: ref(false),
  snapToInterval: ref(false),
  eventCreateMinDrag: ref(false),
  resolve: null,
  events: ref([]),
  newEvent: {
    title: '',
    background: false,
    class: ''
  },
  openCreationDialog: ({ event, resolve }) => {
    exCreateEvents.showCreationDialog = true
    exCreateEvents.newEvent = event
    exCreateEvents.resolve = resolve
  },
  cancel: () => {
    if (exCreateEvents.createMethod === 'event-create') exCreateEvents.resolve(false)
    exCreateEvents.showCreationDialog = false
  },
  save: () => {
    exCreateEvents.resolve(exCreateEvents.newEvent)
    exCreateEvents.showCreationDialog = false
  }
})

const exExternalEventCreateVuecalRef = ref(null)
const exExternalEventCreate = reactive({
  createEvent: () => {
    exExternalEventCreateVuecalRef.value.view.createEvent({
      start: new Date(),
      end: new Date().addHours(1),
      title: 'New Event 🎉'
    })
  }
})

const exDeleteEvents = reactive({
  events: [
    ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
  ],
  deleteEvent: ({ e, event }) => {
    exEditEventsVuecalRef.value.view.deleteEvent(event._.id)
  },
  viewDate: new Date(),
  editableEvents: ref(true),
  deleteMethod: ref('dblclick'),
  deleteMethods: [{ label: 'dblclick' }, { label: 'hold' }],
  eventListeners: computed(() => {
    let listeners = {
      'event-dblclick': event => event.event.delete(exDeleteEvents.skipDeleteButton ? 3 : 1)
    }
    if (exDeleteEvents.deleteMethod === 'hold') {
      listeners = {
        'event-hold': event => event.event.delete(exDeleteEvents.skipDeleteButton ? 3 : 1),
        'event-dblclick': () => {}
      }
    }
    return listeners
  }),
  skipDeleteButton: ref(false)
})

const exEditEventsVuecalRef = ref(null)
const exEditEvents = reactive({
  events: [
    ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
    {
      start: new Date(new Date().addDays(2).setHours(11, 0, 0, 0)), // Using Vue Cal's Date prototypes.
      end: new Date(new Date().addDays(2).setHours(13, 0, 0, 0)), // Using Vue Cal's Date prototypes.
      title: 'Boring Event',
      content: '<i class="w-icon mdi mdi-cancel"></i><br>Can&rsquo;t drag, resize or delete me!',
      class: 'blue-event',
      deletable: false,
      resizable: false,
      draggable: false
    }
  ],
  deletable: ref(false),
  resizable: ref(false),
  draggable: ref(false),
  creatable: ref(false)
})

const exEventsVModel = reactive({
  counter: 1,
  events: ref([
    {
      start: new Date(),
      end: new Date().addHours(1),
      title: 'Event 1'
    }
  ]),
  onEventCreate: ({ event, resolve }) => resolve({ ...event, title: 'Event ' + ++exEventsVModel.counter }),
  addEvent: () => exEventsVModel.events.push({
    start: new Date(),
    end: new Date().addHours(1),
    title: 'Event ' + ++exEventsVModel.counter
  })
})


const exDragAndDrop = reactive({
  events: events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
  onEventDrop: ({ e, event, cell, overlaps }) => {
    return !overlaps.length || (overlaps.length && exDragAndDrop.overlappableEvents)
  },
  draggableEvents: ref(true),
  overlappableEvents: ref(true)
})

const exExternalEventsDragDropEl1 = ref(null)
const exExternalEventsDragDropEl2 = ref(null)
const exExternalEventsDragDrop = reactive({
  events: ref([
    { id: 1, title: 'Ext. Event 1', duration: 60 },
    { id: 2, title: 'Ext. Event 2', duration: 30 },
    { id: 3, title: 'Ext. Event 3' }
  ]),
  onEventDragStart: (e, draggable) => {
    e.dataTransfer.setData('event', JSON.stringify(draggable))
    e.dataTransfer.setData('cursor-grab-at', e.offsetY)
  },
  onEventDrop: ({ e, event, cell, overlaps, external }) => {
    if (external) {
      // When dropping an external event into Vue Cal, remove it from the external events list.
      const extEventToDeletePos = exExternalEventsDragDrop.events.findIndex(item => item.id === event.id)
      if (extEventToDeletePos > -1) exExternalEventsDragDrop.events.splice(extEventToDeletePos, 1)
    }
  },
  onEventDropInBank: e => {
    const incomingEvent = JSON.parse(e.dataTransfer.getData('event') || '{}')
    exExternalEventsDragDrop.events.push({
      ...incomingEvent,
      duration: incomingEvent.end ? (incomingEvent.end - incomingEvent.start) / 60000 : 60
    })
    // When dropping a Vue Cal event into the external events bank, remove it from the Vue Cal events list.
    const srcCal = document.querySelector('.vuecal--dragging-event')
    const src = srcCal.isSameNode(exExternalEventsDragDropEl1.value.$el) ? exExternalEventsDragDropEl1 : exExternalEventsDragDropEl2
    src.value.view.deleteEvent(incomingEvent._.id, 3)
  }
})

const exRejectDndOrResize = reactive({
  events: events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
  preventOverlapOnDrop: ref(true),
  preventOverlapWhileResizing: ref(true),
  preventOverlapAfterResizing: ref(false),
  onEventDrop: ({ e, event, cell, overlaps }) => {
    return !overlaps.length || (overlaps.length && !exRejectDndOrResize.preventOverlapOnDrop)
  },
  onEventResize: ({ e, event, overlaps }) => {
    return !overlaps.length || (overlaps.length && !exRejectDndOrResize.preventOverlapWhileResizing)
  },
  onEventResizeEnd: ({ e, event, overlaps }) => {
    return !overlaps.length || (overlaps.length && !exRejectDndOrResize.preventOverlapAfterResizing)
  }
})

const exEventsReactivity = reactive({
  events: [
    {
      start: new Date(new Date().setHours(12, 30)),
      end: new Date(new Date().setHours(13, 30)),
      title: 'Event 1'
    },
    {
      start: new Date(new Date().setHours(11, 30)).addDays(1),
      end: new Date(new Date().setHours(12, 30)).addDays(1),
      title: 'Event 2'
    }
  ],
  interval: null,
  onReady: () => {
    exEventsReactivity.interval = setInterval(() => {
      const colors = ['crimson', 'cornflowerblue', 'darkgreen', 'blueviolet', 'darkmagenta', 'teal']
      exEventsReactivity.events[0].backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      exEventsReactivity.events[1].backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    }, 1000)
  }
})

onBeforeUnmount(() => {
  clearInterval(exEventsReactivity.interval)
})
</script>

<style lang="scss">
.main--examples-events-interactions {
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

  // Create events example.
  .ex--create-events {
    .vuecal__event {background-color: rgba(76, 172, 175, 0.35);}
  }

  .example--drag-and-drop .override-drag-css {
    .vuecal__event--dragging-ghost {
      opacity: 1;
      background-color: #adff2f;
      border: none;
      color: #000;
    }
    .vuecal__event--dragging-original {
      opacity: 0.8;
      border: 1px dashed var(--vuecal-event-border-color);
      transform: scale(0.8);
      transition: transform 0.2s ease-in-out;
    }
  }
  // External events drag and drop example.
  .example--external-events-drag-and-drop {
    flex-basis: 0 !important;
    min-width: 285px;
    --vuecal-primary-color: #316191;
    [data-theme="light"] & {--vuecal-primary-color: #1976D2;}

    .external-events {
      max-width: 150px;
      background-color: color-mix(in srgb, var(--w-contrast-bg-color) 3%, transparent);
      border: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 6%, transparent);
      padding: 4px;
      border-radius: 4px;
    }
    .external-event {
      background-color: var(--vuecal-primary-color);
      color: #fff;
      cursor: grab;
      border-radius: 4px;
      font-size: 13px;
      padding: 2px 4px;

      .caption {color: rgba(255, 255, 255, 0.7);}
    }
  }

  .example--events-reactivity {
    .vuecal__event {transition: background-color 1s;}
  }
}
</style>
