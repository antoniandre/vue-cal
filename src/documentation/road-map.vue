<template lang="pug">
h1.title1.mb4 Road Map

ul.kanban
  li.kanban__column.kanban__column--todo
    .title 🎯 To Do
    .w-flex.column.gap1.pa1
      .task Horizontal layout guidance
      .task Drag &amp; drop events on edges
      .task Drag &amp; drop events on disabled day
      .task Drag events over years/year/month views
      .task Drag &amp; drop timeless events
      .task Further optimize events recomputation
      .task Recurring events

  li.kanban__column.kanban__column--doing
    .title 🚧 Doing
    .w-flex.column.gap1.pa1
      .task Multiple day events

  li.kanban__column.kanban__column--done.xs-hide
    .title ✅ Done
    .w-flex.column.gap1.pa1
      .task Improve touch device UX (events VS scroll)
      .task All-day events
      .task Event count on year views
      .task Events overlap size option
      .task Support SSR
      .task Improve the event range accuracy while resizing upwards
      .task Events accept dynamic colors
      .task Events snap-to-interval while resizing
      .task Accept/reject event resizing while resizing
      .task Accept/reject event resizing after resizing and revert changes
      .task Expose overlapping events on resize and drag &amp; drop
      .task I/O drag &amp; drop events
      .task Accept/reject event drag &amp; drop and expose overlapping events
      .task Events overlap with schedules
      .task Events overlap
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
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;
    border-radius: 8px;
    min-height: 100%;

    .title {
      font-size: 1.2rem;
      color: var(--w-base-color);
      padding: 12px 8px 4px;
      display: flex;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: var(--w-base-bg-color);

      &:before {
        content: '';
        position: absolute;
        inset: 0;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: var(--w-base-bg-color);
        z-index: -1;
        border: 1px solid;
        border-width: 4px 1.5px 0;
      }
    }

    &--todo .column, &--todo .title:before {
      background-color: hsla(0, 0%, 75%, 0.06);
      border-color: hsla(0, 0%, 75%, 0.12);
      border-top: 4px solid hsla(0, 0%, 75%, 0.6);
    }
    &--doing .column, &--doing .title:before {
      background-color: hsla(50, 80%, 75%, 0.08);
      border-color: hsla(50, 80%, 75%, 0.2);
      border-top: 4px solid hsla(50, 100%, 80%, 0.6);
    }
    &--done .column, &--done .title:before {
      background-color: hsla(140, 100%, 75%, 0.08);
      border-color: hsla(140, 100%, 75%, 0.2);
      border-top: 4px solid hsla(140, 100%, 70%, 0.5);
    }
    &--later .column, &--later .title:before {
      background-color: hsla(300, 100%, 75%, 0.06);
      border-color: hsla(300, 100%, 75%, 0.2);
      border-top: 4px solid hsla(300, 100%, 75%, 0.6);
    }
    .column {
      border-bottom-left-radius: inherit;
      border-bottom-right-radius: inherit;
      border-style: solid;
      border-width: 4px 1px1px;
      border-top: none;
    }
  }

  .task {
    padding: 6px 8px;
    border-radius: 6px;
    line-height: 1.2;
    font-size: 13px;
    border: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 5%, transparent);
    background-color: rgba(#fff, 0.1);

    [data-theme="light"] & {background-color: rgba(#fff, 0.9);}
  }
  &__column--todo .task {border-left: 4px solid hsla(0, 0%, 75%, 0.62);}
  &__column--doing .task {border-left: 4px solid hsla(50, 100%, 80%, 0.8);}
  &__column--done .task {border-left: 4px solid hsla(140, 80%, 75%, 0.66);}
  &__column--later .task {border-left: 4px solid hsla(300, 80%, 75%, 0.62);}
}
</style>
