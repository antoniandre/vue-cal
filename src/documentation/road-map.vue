<template lang="pug">
h1.title1.mb4 Road Map

ul.kanban
  li.kanban__column.kanban__column--todo
    .title 🎯 To Do
    .w-flex.column.gap1.pa1
      .task All-day events
      .task Multiple day events
      .task Recurring events
        //- TODO:
          General
          - check overlaps only on the cell that has changed on event create/drag/background change
          Multiple-day events:
          - Fix event segments when dragging too fast on x axis.
          - multiple days on month view like google calendar
          - if more than 24 hour duration, consider as all-day
          - #events-count

  li.kanban__column.kanban__column--doing
    .title 🚧 Doing
    .w-flex.column.gap1.pa1
      .task Events overlap
      .task Events overlap with schedules
      .task Reject event resize/drag on condition (E.g. overlap)

  li.kanban__column.kanban__column--done.xs-hide
    .title ✅ Done
    .w-flex.column.gap1.pa1
      .task Drag &amp; drop events
      .task v-model:events
      .task custom days view
      .task view day offset
      .task accept/reject event creation
      .task view.deleteEvent(id)
      .task view.createEvent()
      .task default active view
      .task Enable / disable views
      .task Hide / show weekends
      .task Add timeline w/ time range &amp; increment
      .task Add timeline
      .task time format 12/24 h
      .task Support for i18n
      .task Day schedules
      .task Support events
      .task Background events
      .task Overlap events
      .task Keep only default style in CSS
      .task Allow custom arrows
      .task Default active date
      .task Double tap on touch devices
      .task 1st NPM Release!
      .task Built-in themes
      .task Resize events
      .task Delete events
      .task Emit DOM events
      .task Event indicator on month view
      .task Custom time format
      .task Highlight current time
      .task Show events on month view
      .task sync 2 vue-cal instances
      .task Add CSS transitions
      .task Multiple day events
      .task Custom events rendering
      .task Custom callback on event click
      .task Option to start week on Sunday
      .task All day events in top bar
      .task Custom cell rendering
      .task Events count on year(s) views
      .task Create new event
      .task min &amp; max dates
      .task Today button
      .task Externalize locales
      .task Support more simultaneous events
      .task Hide particular weekdays
      .task Optional week number
      .task Date prototypes
      .task Business hours
      .task Drag &amp; drop events
      .task Resize events Snap to interval
      .task Drag events Snap to interval
      .task Drag &amp; drop ext. events into Vue Cal
      .task Disable days
      .task Support Vue 3

  li.kanban__column.kanban__column--later.smd-hide
    .title 🕔 Later
    .w-flex.column.gap1.pa1
      .task Support timezones
      .task
        a(href="https://github.com/antoniandre/vue-cal/issues/168" target="_blank" style="text-decoration: underline;color: inherit") Full Typescript support
      .task Drag &amp; drop multiple day events
      .task Improve multiple day events Month view
      .task Horizontal timeline
</template>

<script setup>
</script>

<style lang="scss">
.page--road-map {
  height: calc(100dvh - 71px); // 71px = footer height + footer margins.
}

.main--road-map {
  display: flex;
  flex-direction: column;
}

.kanban {
  list-style-type: none;
  margin: 0;
  display: flex;
  flex-grow: 1;
  gap: 8px;
  overflow-y: auto;
  align-items: flex-start;

  &__column {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;
    border-radius: 8px;
    min-height: 100%;

    .title {
      font-size: 1.2rem;
      color: var(--w-base-color);
      padding: 4px 8px;
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1;
      border: 1px solid inherit;
      background-color: var(--w-base-bg-color);

      &:before {
        content: '';
        position: absolute;
        inset: 0;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: var(--w-base-bg-color);
        z-index: -1;
      }
    }
    .column {
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
      border: 1px solid;
    }

    &--todo .column, &--todo .title:before {background-color: hsla(0, 0%, 75%, 0.06);border-color: hsla(0, 0%, 75%, 0.12);}
    &--doing .column, &--doing .title:before {background-color: hsla(70, 100%, 75%, 0.08);border-color: hsla(70, 100%, 75%, 0.16);}
    &--done .column, &--done .title:before {background-color: hsla(140, 100%, 75%, 0.08);border-color: hsla(140, 100%, 75%, 0.16);}
    &--later .column, &--later .title:before {background-color: hsla(300, 100%, 75%, 0.06);border-color: hsla(300, 100%, 75%, 0.12);}
  }

  .task {
    padding: 6px 8px;
    border-radius: 6px;
    line-height: 1.2;
    font-size: 13px;
    border: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 5%, transparent);
    background-color: color-mix(in srgb, var(--w-base-bg-color) 90%, transparent);
  }
}
</style>
