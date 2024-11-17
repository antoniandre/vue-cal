<template lang="pug">
p.lh1.
  In this section, you will find all the examples about possible usage of Vue Cal.#[br]
  Let's start by mentioning some common use cases on Codepen.

.highlight-box.grow.mt4
  .title2 Demos on Codepen
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

title-link.mt12(h2 anchor="categories") Categories
ul.w-flex.gap4.basis-zero.ml0.mt12.wrap
  li.category.highlight-box
    router-link(to="/examples/view")
      w-icon(size="2.3rem") mdi mdi-calendar-blank-outline
      | View

  li.category.highlight-box
    router-link(to="/examples/date-and-time")
      w-icon(size="2.3rem") mdi mdi-clock-outline
      | Date and Time

  li.category.highlight-box
    router-link(to="/examples/calendar-events")
      w-icon(size="2.3rem") mdi mdi-calendar-today-outline
      | Calendar Events

  li.category.highlight-box.md-break
    router-link(to="/examples/dom-events")
      w-icon(size="2.6rem") mdi mdi-gesture-double-tap
      | DOM Events

  li.category.highlight-box
    router-link(to="/examples/customization")
      w-icon(size="2.2rem") mdi mdi-tune
      | Customization
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
    .md-break,
    .md-break + li {flex-basis: 48%;}

    .category a {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 6px;
    }
  }
}
</style>
