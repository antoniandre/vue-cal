<template lang="pug">
h1.title1 Road Map

w-accordion.todo-accordion(
  :model-value="[false, true]"
  :items="2"
  expand-icon-right
  expand-single)
  template(#item-title.1)
    w-icon.mr2.primary wi-check
    strong.mra Done
  template(#item-content.1)
    .w-flex.wrap.align-center
      todo-list-item default active view
      todo-list-item Enable / disable views
      todo-list-item Hide / show weekends
      todo-list-item Add timeline w/ time range &amp; increment
      todo-list-item Add timeline
      todo-list-item time format 12/24 h
      todo-list-item Support for i18n
      todo-list-item Day schedules
      todo-list-item Support events
      todo-list-item Background events
      todo-list-item Overlap events
      todo-list-item Keep only default style in CSS
      todo-list-item Allow custom arrows
      todo-list-item Default active date
      todo-list-item Double tap on touch devices
      todo-list-item 1st NPM Release!
      todo-list-item Built-in themes
      todo-list-item Resize events
      todo-list-item Delete events
      todo-list-item Emit DOM events
      todo-list-item Event indicator on month view
      todo-list-item Custom time format
      todo-list-item Highlight current time
      todo-list-item Show events on month view
      todo-list-item sync 2 vue-cal instances
      todo-list-item Add CSS transitions
      todo-list-item Multiple day events
      todo-list-item Custom events rendering
      todo-list-item Custom callback on event click
      todo-list-item Option to start week on Sunday
      todo-list-item All day events in top bar
      todo-list-item Custom cell rendering
      todo-list-item Events count on year(s) views
      todo-list-item Create new event
      todo-list-item min &amp; max dates
      todo-list-item Today button
      todo-list-item Externalize locales
      todo-list-item Support more simultaneous events
      todo-list-item Hide particular weekdays
      todo-list-item Optional week number
      todo-list-item Date prototypes
      todo-list-item Business hours
      todo-list-item Drag &amp; drop events
      todo-list-item Resize events snap to time
      todo-list-item Drag events snap to time
      todo-list-item Drag &amp; drop ext. events into Vue Cal
      todo-list-item Disable days
      todo-list-item Support Vue 3
  template(#item-title.2)
    w-icon.mr2.orange mdi mdi-clock-outline
    strong.mra Backlog
  template(#item-content.2)
    .w-flex.wrap
      todo-list-item(status="doing") Recurring events
      todo-list-item(status="todo") Drag &amp; drop multiple day events
      todo-list-item(status="todo") Drag &amp; drop events on touch devices
      todo-list-item(status="todo")
        a(href="https://github.com/antoniandre/vue-cal/issues/168" target="_blank" style="text-decoration: underline;color: inherit") Full Typescript support
      todo-list-item(status="todo")
        a(href="https://github.com/antoniandre/vue-cal/issues/127" target="_blank" style="text-decoration: underline;color: inherit") Full SSR support
      todo-list-item(status="todo") Improve multiple day events Month view
      todo-list-item(status="todo") Prevent event intersect. on drag/resize
      todo-list-item(status="todo") Horizontal timeline
      //- TODO:
        General
        - do all the @todo in the codebase
        - check overlaps only on the cell that has changed on event create/drag/background change
        Multiple-day events:
        - Fix event segments when dragging too fast on x axis.
        - multiple days on month view like google calendar
        - if more than 24 hour duration, consider as all-day
</template>

<script setup>
import TodoListItem from './components/todo-list-item.vue'
</script>

<style lang="scss">
.todo-accordion .w-tag__content {padding: 0 3px;}
</style>
