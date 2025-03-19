<template lang="pug">
h1.title1 Migration Guide

p
  | Welcome to the
  strong.mx1 Migration Guide
  | for transitioning to the latest version of Vue Cal. This guide is designed to help you smoothly upgrade your project by outlining the changes, enhancements, and potential breaking updates introduced in the new version.

p.mt4 In this document, you’ll find:
ul
  li
    strong Key Differences
    | : An overview of major updates and improvements.
  li
    strong Breaking Changes
    | : Details about deprecated features and necessary adjustments.

p.mt4 We recommend reading through this guide completely before beginning the migration process. Doing so will help ensure a seamless upgrade while taking full advantage of the new features and optimizations available in this version.

p Let’s get started! 🚀

title-link(h2 anchor="new") New Features &amp; Improvements
p.
  Vue Cal has been completely #[strong refactored from the ground up], using the Composition API and
  composables, while focusing on two key aspects: #[strong performance and flexibility].
  You will continue to benefit from all the features of previous versions, now enhanced with new functionality and improvements.
ul
  li #[strong Performance-oriented]: faster and more efficient than ever.
  li Highly adapted and practical for use with the Composition API.
  li #[strong Exposes the view] for external use.
  li #[strong Exposes all date utilities] for external use.
  li Take advantage of #[strong Date prototypes whenever and wherever] you want, even before the calendar is created or mounted.
  li #[strong Modernized default UI] for a more contemporary appearance, designed to save you time and effort in customization and usability.
  li #[strong Custom days view] to display a custom number of days with an adaptive grid layout.
  li #[strong Flexible grid-based layout] for enhanced customization.
  li #[strong Easy theming] with support for dark and light themes, plus CSS variables.
  li #[strong All-direction sticky headers]: Sticky headers and sticky time bars simultaneously - achieved purely with CSS.
  li Directly #[strong preload a locale externally] to avoid handling Promises.
  li Reworked options for #[strong more intuitive usage].
  li Fine-grain event deletion in 3 stages: 1. show the delete button, 2. delete the event from the view, 3. delete the event in the source of truth.
  li Events are deleted by their internal ID, or by a provided custom key-value pair (e.g. `{ id: 123 }`).
  li New animation on event deletion.
  li New event v-model for more control over events.
  li More intuitive and flexible event creation.
  li More events are emitted for more control and customization. E.g. #[code cell-drag-start], #[code cell-drag], #[code cell-drag-end], #[code cell-delayed-click], #[code cell-hold], #[code event-create], #[code event-delete], #[code event-delayed-click], #[code event-hold], #[code event-resize-start], #[code event-resize], #[code event-resize-end], #[code event-drag-start], #[code event-drag], #[code event-drag-end].
  li Any valid event listener will be forwarder to cells and events. E.g. #[code cell-click], #[code cell-dblclick], #[code cell-drag-start], #[code cell-drag], #[code cell-drag-end], #[code cell-hold], #[code cell-mousedown], #[code cell-touchstart], #[code cell-mouseenter], #[code cell-mouseleave], #[code cell-contextmenu], #[code event-create], #[code event-click], #[code event-dblclick], #[code event-drag-start], #[code event-drag], #[code event-drag-end], #[code event-drop], #[code event-resize-start], #[code event-resize], #[code event-resize-end], #[code event-mouseenter], #[code event-mouseleave], #[code event-contextmenu].
  li Ability to reject event creation.
  li Ability to reject event drag and drop and event resize.
  li Exposed event overlap detection for more external control.
  li Supports dynamic event colors.

title-link(h2 anchor="global-changes") Global Changes
ul
  li
    p The Date prototypes are not injected by default anymore, and very easy to add, you control when:
    ssh-pre(language="js" :dark="store.darkMode").
      import { addDatePrototypes } from '@/vue-cal'

      addDatePrototypes()
  li.
    No more header right margin to align with body if there is a scrollbar. Now the Vue Cal body is
    scrollable with sticky headers (weekdays and time column) in both axis.
  li.
    The selected date and view date are now 2 separated variables: #[code selectedDate] and
    #[code viewDate], so they can be updated distinctly without the side effect of the other.
  li
    p.
      You can now directly attach any valid DOM event you want to the events and cells.
      It only needs to start respectively with #[code event-] and #[code cell-] to be forwarded.#[br]
      Additionnally, new events are fired on more complex circumstances: #[code cell-drag-start],
      #[code cell-drag], #[code cell-drag-end], #[code cell-delayed-click], #[code cell-hold],
      #[code event-create], #[code event-delete], #[code event-delayed-click], #[code event-hold],
      #[code event-resize-start], #[code event-resize], #[code event-resize-end],
      #[code event-drag-start], #[code event-drag], #[code event-drag-end].
    p For instance:
    ssh-pre(language="html-vue" :dark="store.darkMode").
      &lt;vue-cal
        @cell-click="log('cell-click', $event)"
        @cell-dblclick="log('cell-dblclick', $event)"
        @cell-drag-start="log('cell-drag-start', $event)"
        @cell-drag="log('cell-drag', $event)"
        @cell-drag-end="log('cell-drag-end', $event)"
        @cell-hold="log('cell-hold', $event)"
        @cell-mousedown="log('cell-mousedown', $event)"
        @cell-touchstart="log('cell-touchstart', $event)"
        @cell-mouseenter="log('cell-mouseenter', $event)"
        @cell-mouseleave="log('cell-mouseleave', $event)"
        @cell-contextmenu="log('cell-contextmenu', $event)"
        @event-create="eventCreation.open"
        @event-click="log('event-click', $event)"
        @event-dblclick="log('event-dblclick', $event)"
        @event-drag-start="log('event-drag-start', $event)"
        @event-drag="log('event-drag', $event)"
        @event-drag-end="log('event-drag-end', $event)"
        @event-drop="log('event-drop', $event)"
        @event-resize-start="log('event-resize-start', $event)"
        @event-resize="log('event-resize', $event)"
        @event-resize-end="log('event-resize-end', $event)"
        @event-mouseenter="log('event-mouseenter', $event)"
        @event-mouseleave="log('event-mouseleave', $event)"
        @event-contextmenu="log('event-contextmenu', $event)"&gt;
      &lt;/vue-cal&gt;

  li.
    Navigation by clicking or double-clicking cell has been removed, you can add this yourself
    now that you can directly attach any valid DOM event to the cell.
  li.
    The default theme is used by default. No need to add the class anymore, but you can disable and
    style from scratch by setting the #[code theme] prop to false or a different class string.
  li
    | Scrolling to time is now built-in and accessible from the view object. 3 functions are available:
    ul
      li scrollTop()
      li scrollToTime(minutes)
      li scrollToCurrentTime()
  li #[code .vuecal--full-height-delete] class was removed
  li #[code #no-event] slot was removed
  li #[code #week-numbers-cell] slot was renamed #[code #week-number]
  li.
    D&amp;D CSS classes changed: #[code .vuecal__event--dragging] was renamed
    #[code .vuecal__event--ghost] (as commonly named), and #[code .vuecal__event--static]
    was renamed #[code .vuecal__event--original]

title-link(h2 anchor="slots-changes") Slots Changes
p Many slots payload have changed for more consistency and increased flexibility.
p.
  If some of your existing slots don't work as expected from V4, you should, review the list of slots
  and their payloads in the #[router-link(to="/documentation/api#slots") API documentation page].

title-link(h2 anchor="props-changes") Props Changes
ul
  li #[code activeView] was renamed #[code view].
  li #[code selectedDate] does not necessary control the view navigation anymore.
  li #[code hideBody] was removed as useless. With so much flexibility, there is no case where you only need the header without the calendar body.
  li #[code cellContextmenu] was removed, you can attach from outside.
  li #[code disableViews] was removed, replaced with #[code views] which is defining the available views instead.
  li #[code small] was renamed #[code sm].
  li #[code x-small] was renamed #[code xs].
  li #[code specialHours] was days indexes should now be provided as 3 letter strings like 'mon', 'tue', 'wed', etc.
  li #[code disableWeekdays] was days indexes should now be provided as 3 letter strings like 'mon', 'tue', 'wed', etc.
  li #[code hideViewsBar] was renamed #[code viewsBar], default true.
  li #[code hideTitleBar] was renamed #[code titleBar], default true.
  li #[code todayButton] now defaults to true, previously false.
  li #[code dblClickToNavigate] was removed, you can attach your own DOM events to cells if you need this specific behavior.
  li #[code day-splits] was renamed #[code schedules].
  li #[code onEventClick] was removed, you can attach from outside.
  li #[code onEventCreate] was removed, you can attach from outside and control whether to create the event or reject the creation.
  li #[code onEventDblclick] was removed, you can attach from outside.
  li #[code cellClickHold] was removed, you can attach from outside.
  li.
    #[code disableDatePrototypes] was removed: the prototypes are now disabled by default and you control whether you
    want to benefit from it or not.
  li #[code dblclickToNavigate] was removed: can be done externally if needed.
  li #[code dragToCreateEvent] was removed and replaced by the #[code editableEvents.create] which now controls the ability to drag to create an event and is on by default when events are editable.
  li #[code editableEvents.title] was removed: you can easily edit the title of an event with custom code using slots, or in a dialog.
  li #[code snapToTime] was renamed #[code snapToInterval].
  li #[code cellClickHold] was removed: can be done externally if needed.
  li #[code minCellWidth] was moved to a CSS variable: #[code --vuecal-min-cell-width: 0;].
  li #[code minSplitWidth] was renamed #[code min-schedule-width] and moved to a CSS variable: #[code --vuecal-min-schedule-width: 0;]
  li #[code allDayBarHeight] was moved to a CSS variable: #[code --vuecal-all-day-bar-height].
  li #[code showWeekNumbers] was renamed #[code weekNumbers].
  li #[code showAllDayEvents] was renamed #[code allDayEvents].
  li #[code showTimeInCells] was removed: if you need to render time in cells, you can use cells slots.
  li #[code dragToCreateThreshold] was renamed #[code eventCreateMinDrag].
  li #[code stickySplitLabels] was removed. Any provided schedule heading is now always positioned in the header.
  li #[code eventsCountOnYearView] was removed. If you need such a feature, you can request this feature in a Github issue with a use case explanation.
  li #[code eventCount] was added in order to toggle the event count display on the month view.
  li #[code transitions] was removed and moved to the CSS var #[code --vuecal-transition-duration].
</template>

<script setup>
import { useAppStore } from '@/store'
import { addDatePrototypes } from '@/vue-cal'

const store = useAppStore()
addDatePrototypes()
</script>

<style lang="scss">
</style>
