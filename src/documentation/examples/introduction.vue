<template lang="pug">
title-link.mt4(h2 anchor="categories") Categories
w-grid.gap4.mt8(:columns="{ xs: 2, sm: 3, md: 3, lg: 4, xl: 5 }")
  router-link.category.highlight-box(to="/examples/view")
    w-icon(size="2.3rem") mdi mdi-calendar-blank-outline
    | View

  router-link.category.highlight-box(to="/examples/date-and-time")
    w-icon(size="2.3rem") mdi mdi-clock-outline
    | Date and Time

  router-link.category.highlight-box(to="/examples/schedules")
    w-icon(size="2.3rem") mdi mdi-account-multiple
    | Schedules

  router-link.category.highlight-box(to="/examples/calendar-events--display")
    w-icon(size="2.3rem") mdi mdi-calendar-today-outline
    | Events Display

  router-link.category.highlight-box(to="/examples/calendar-events--interactions")
    w-icon(size="2.3rem") mdi mdi-calendar-today-outline
    | Events Interactions

  router-link.category.highlight-box(to="/examples/dom-events")
    w-icon(size="2.6rem") mdi mdi-gesture-double-tap
    | DOM Events

  router-link.category.highlight-box(to="/examples/customization")
    w-icon(size="2.2rem") mdi mdi-tune
    | Customization

title-link(h2 anchor="playground") Playground &amp; Other Demos
p.
  In addition to all the documentation examples, you may want to test the playground for a good
  overview, or for reference when troubleshooting your app.#[br]
  you may want to explore these other use cases or user questions about usage of Vue Cal.#[br]

.w-flex.justify-center.my6
  router-link.category.highlight-box.no-grow.w-flex.align-center.px12.gap3(to="/examples/playground")
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
        a(href="https://stackblitz.com/edit/vuecal5?file=src%2FApp.vue" target="_blank")
          | Basic Calendar
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a(href="https://stackblitz.com/edit/vuecal5-events?file=src/App.vue" target="_blank")
          | Calendar with Events
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a(href="https://stackblitz.com/edit/vuecal5-events-fetching?file=src/App.vue" target="_blank")
          | Fetching Events from a Backend
          w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
      li
        w-icon wi-chevron-right
        a(href="https://stackblitz.com/edit/vuecal5-nuxt?file=pages/index.vue" target="_blank")
          | Vue Cal + Nuxt 3 - Full SSR support
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
import { onMounted } from 'vue'

onMounted(() => {
  const categories = document.querySelectorAll('.category')

  for (const category of categories) {
    let rect = {}
    let width = 0
    let height = 0

    // Track mouse movement on the card.
    category.addEventListener('mouseenter', () => {
      // Get dimensions on enter to handle possible resize.
      rect = category.getBoundingClientRect()
      width = rect.width
      height = rect.height

      // Add initial transition for smooth entry.
      category.style.transition = 'transform 2s ease-out, box-shadow 2s ease-out'

      // Add depth with shadow.
      category.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'
    })

    category.addEventListener('mousemove', e => {
      // Remove transition during movement for responsive tracking.
      category.style.transition = 'none'

      // Calculate mouse position relative to the card (0-1).
      const x = (e.clientX - rect.left) / width
      const y = (e.clientY - rect.top) / height

      // Convert to -20 to +20 degree range for tilt.
      const tiltX = (y - 0.5) * 20
      const tiltY = (0.5 - x) * 20

      // Apply transform with perspective.
      category.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`

      // Create subtle, consistent light reflection.
      const intensity = 0.06 + Math.min(0.08, (((x - 0.5) ** 2) + ((y - 0.5) ** 2)) * 0.5)

      // Add a spotlight effect at the mouse position.
      category.style.background = `
        radial-gradient(
          circle at ${x * 100}% ${y * 100}%,
          rgba(255, 255, 255, ${intensity + 0.05}),
          rgba(255, 255, 255, ${intensity}) 40%,
          rgba(255, 255, 255, 0.03) 80%
        )
      `

      // Create 3D effect for child elements.
      const childTransform = 'translateZ(10px)'
      const icon = category.querySelector('.w-icon')
      if (icon) icon.style.transform = childTransform
    })

    category.addEventListener('mouseleave', () => {
      // Reset transform and background on mouse leave.
      category.style.transition = 'transform 1.7s cubic-bezier(0.2, 0.8, 0.3, 1), background 0.7s ease, box-shadow 0.7s ease'
      category.style.transform = 'perspective(500px) rotateX(0) rotateY(0) scale(1) translateZ(0)'
      category.style.background = ''
      category.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)'

      // Reset icon transform.
      const icon = category.querySelector('.w-icon')
      if (icon) icon.style.transform = ''

      // Remove the transition after it's complete to prevent affecting future mousemove.
      setTimeout(() => {
        category.style.transition = ''
      }, 700)
    })
  }
})
</script>

<style lang="scss">
main.main--examples-intro {
  h2 {background: none;padding-left: 0;}
  h2:after {display: none;}

  .category {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform-style: preserve-3d;
    will-change: transform;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    min-height: 110px;
    overflow: hidden;
    transition: transform 1.3s ease, opacity 0.3s ease;
    gap: 12px;
    line-height: 1;
    text-align: center;

    .w-icon {
      width: 3rem;
      color: var(--w-base-color);
      opacity: 0.5;
      transition: 0.3s ease;
    }
    &:hover .w-icon {opacity: 0.8;}
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
