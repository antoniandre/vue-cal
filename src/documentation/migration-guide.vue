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
  li .vuecal--full-height-delete class is removed

h2.mt12 Props
ul
  li `activeView` renamed `view`
  li the selectedDate does not necessary control the view navigation anymore,
  li removed `hideBody` useless. With so much flexibility, there is no case where you only need the header without the calendar body
  li cellContextmenu -> removed, you can attach from outside
  li disableViews -> removed, replaced with `views` which is defining the available views instead
  li small renamed sm
  li x-small renamed xs
  li specialHours -> days indexes should now be provided as 3 letter strings like 'mon', 'tue', 'wed', etc.
  li disableWeekdays -> days indexes should now be provided as 3 letter strings like 'mon', 'tue', 'wed', etc.
  li hideViewsBar renamed viewsBar, default true
  li hideTitleBar renamed titleBar, default true
  li todayButton now defaults to true, previously false
  li clickToNavigate -> removed, you can attach your own DOM events to cells.
  li dblClickToNavigate -> removed, you can attach your own DOM events to cells.
  li day-splits -> renamed `schedules`
  li onEventClick -> removed, you can attach from outside
  li onEventDblclick -> removed, you can attach from outside
  li cellClickHold -> removed, you can attach from outside
  li.
    disableDatePrototypes -> removed: the prototypes are now disabled by default and you control whether you
    want to benefit from it or not.
  li dblclickToNavigate -> removed: can be done externally if needed
  li dragToCreateEvent -> moved into the editableEvents object definition, allowed by default when events are editable
  li cellClickHold -> removed: can be done externally if needed
  li minCellWidth -> moved to a CSS variable: --vuecal-min-cell-width: 0;
  li minSplitWidth -> renamed min-schedule-width and moved to a CSS variable: --vuecal-min-schedule-width: 0;
  li allDayBarHeight -> moved to a CSS variable: --vuecal-all-day-bar-height.
</template>

<script setup>
import { useAppStore } from '@/store'
import { addDatePrototypes } from '@/vue-cal'

const store = useAppStore()
addDatePrototypes()
</script>

<style lang="scss">
</style>
