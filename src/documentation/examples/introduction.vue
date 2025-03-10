<template lang="pug">
title-link.mt4(h2 anchor="categories") Categories
w-grid.gap4.mt8(:columns="{ xs: 2, sm: 3, md: 3, lg: 6, xl: 6 }")
  .category.highlight-box
    router-link(to="/examples/view")
      w-icon(size="2.3rem") mdi mdi-calendar-blank-outline
      | View

  .category.highlight-box
    router-link(to="/examples/date-and-time")
      w-icon(size="2.3rem") mdi mdi-clock-outline
      | Date and Time

  .category.highlight-box
    router-link(to="/examples/schedules")
      w-icon(size="2.3rem") mdi mdi-account-multiple
      | Schedules

  .category.highlight-box
    router-link(to="/examples/calendar-events--display")
      w-icon(size="2.3rem") mdi mdi-calendar-today-outline
      | Events Display

  .category.highlight-box
    router-link(to="/examples/calendar-events--interactions")
      w-icon(size="2.3rem") mdi mdi-calendar-today-outline
      | Events Interactions

  .category.highlight-box
    router-link(to="/examples/dom-events")
      w-icon(size="2.6rem") mdi mdi-gesture-double-tap
      | DOM Events

  .category.highlight-box
    router-link(to="/examples/customization")
      w-icon(size="2.2rem") mdi mdi-tune
      | Customization

title-link(h2 anchor="playground") Playground &amp; Other Demos
p.
  In addition to all the documentation examples, you may want to test the playground for a good
  overview, or for reference when troubleshooting your app.#[br]
  you may want to explore these other use cases or user questions about usage of Vue Cal.#[br]

.w-flex.justify-center.my6
  router-link.highlight-box.no-grow.w-flex.align-center.pa12.gap3(to="/examples/playground")
    w-icon.mt-5.grey(size="2.5rem") mdi mdi-seesaw
    | PLAYGROUND

.highlight-box.grow.mt4
  .title2 #[strong V5] Demos on StackBlitz
  p.body.mb4.grey Try it yourself.
  .w-flex.align-center
    w-icon.ml3.mr2.bolt.pa6(color="grey-light2" size="3.2rem") mdi mdi-lightning-bolt
    ul.no-bullet
      li
        w-icon wi-chevron-right
        a.ml2(href="https://stackblitz.com/edit/vuecal5?file=src%2FApp.vue" target="_blank")
          | Basic Calendar
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a.ml2(href="https://stackblitz.com/edit/vuecal5-events?file=src/App.vue" target="_blank")
          | Calendar with Events
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new

.highlight-box.grow.mt4
  .title2 #[strong V4] Demos on Codepen
    .todo-tag.d-iflex.ml2 REVIEW EXAMPLES
  p.body.mb4.grey Try it yourself.
  .w-flex.align-center
    w-icon.ml3.mr2.bolt.pa6(color="grey-light2" size="2.8em") mdi mdi-codepen
    ul.no-bullet
      li
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/antoniandre/pen/pGJWjL?editors=1010" target="_blank")
          | Basic calendar
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/antoniandre/pen/xxWddyd?editors=1010" target="_blank")
          | Calendar with events (Vue 3)
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/antoniandre/pen/rPzWOJ?editors=1010" target="_blank")
          | Calendar with events (Vue 2)
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/antoniandre/pen/jJbygw?editors=1010" target="_blank")
          | Calendar with custom events on month view
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/antoniandre/pen/abbVQLy?editors=1010" target="_blank")
          | Calendar with custom title
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/antoniandre/pen/WWRLgG?editors=1010" target="_blank")
          | Calendar with custom cells
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/antoniandre/pen/dxXvwv?editors=1010" target="_blank")
          | Localized calendar (i18n)
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/antoniandre/pen/MWWbZgK" target="_blank")
          | 2 Vue Cal instances to show 2 weeks
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/antoniandre/pen/jOOmxzo" target="_blank")
          | 12 Vue Cal instances to show a full year view (slower - not recommended)
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/antoniandre/pen/rbpPab?editors=1010" target="_blank")
          | How to fetch events from a back-end
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li.mt2
        w-icon wi-chevron-right
        a.ml2(href="https://codepen.io/collection/AMvOgd" target="_blank")
          strong Browse the full Vue Cal Codepen collection
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
</template>

<script setup>
</script>

<style lang="scss">
main.main--examples-intro {
  h2 {background: none;padding-left: 0;}
  h2:after {display: none;}

  .category {
    display: flex;
    align-items: center;
    padding: 0;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1;
      flex-grow: 1;
      gap: 12px;
      z-index: 1;
      padding: 16px 3px;
      text-align: center;
    }

    .w-icon {
      width: 3rem;
      color: var(--w-base-color);
      opacity: 0.5;
    }
  }
}

@media screen and (max-width: $sm) {
  main.main--examples-intro {
    .category a {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }
  }
}
</style>
