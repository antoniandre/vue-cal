<template lang="pug">
h1.title1 Migration Guide

h2 Global
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
  li.
    You can now directly attach any valid DOM event you want to the events and cells.
    It only needs to start respectively with #[code event-] and #[code cell-] to be forwarded.
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

h2.mt12 Props
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
  li #[code clickToNavigate] was removed, you can attach your own DOM events to cells.
  li #[code dblClickToNavigate] was removed, you can attach your own DOM events to cells.
  li #[code day-splits] was renamed #[code schedules].
  li #[code onEventClick] was removed, you can attach from outside.
  li #[code onEventCreate] was removed, you can attach from outside and control whether to create the event or reject the creation.
  li #[code onEventDblclick] was removed, you can attach from outside.
  li #[code cellClickHold] was removed, you can attach from outside.
  li.
    #[code disableDatePrototypes] was removed: the prototypes are now disabled by default and you control whether you
    want to benefit from it or not.
  li #[code dblclickToNavigate] was removed: can be done externally if needed.
  li #[code dragToCreateEvent] was removed and replaced by the #[code editableEvents.create] which now controls the ability to drag to create an event and is on by default when events are editable
  li #[code cellClickHold] was removed: can be done externally if needed.
  li #[code minCellWidth] was moved to a CSS variable: #[code --vuecal-min-cell-width: 0;].
  li #[code minSplitWidth] was renamed min-schedule-width and moved to a CSS variable: #[code --vuecal-min-schedule-width: 0;]
  li #[code allDayBarHeight] was moved to a CSS variable: #[code --vuecal-all-day-bar-height].
  li #[code showWeekNumbers] was renamed #[code weekNumbers].
  li #[code showAllDayEvents] was renamed #[code allDayEvents].
  li #[code showTimeInCells] was removed: if you need to render time in cells, you can use cells slots.
  li #[code eventsCountOnYearView] was renamed #[code eventsCount].
</template>

<script setup>
import { useAppStore } from '@/store'
import { addDatePrototypes } from '@/vue-cal'

const store = useAppStore()
addDatePrototypes()
</script>

<style lang="scss">
</style>
