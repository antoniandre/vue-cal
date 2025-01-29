<template lang="pug">
w-switch.theme-switch(
  :model-value="store.darkMode"
  @update:modelValue="store.toggleDarkMode")
  template(#thumb)
    w-icon mdi {{ store.darkMode ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}

w-toolbar.top-bar.pa0(:class="{ fixed }")
  .top-bar__title
    span.top-bar__title-line
    span.top-bar__title-line
    component.w-flex.align-center.primary.px5.mb0.title1(:is="$route.name === 'home' ? 'h1' : 'div'")
      router-link.top-bar__logo-link.w-flex.align-center.no-grow.gap4(:to="{ name: 'home', hash: '#top' }")
        .logo.top-bar__logo {{ todayDate < 10 ? `0${todayDate}` : todayDate }}
        .top-bar__logo-title
          | Vue Cal
          .version v. {{ version }}
      span.intro Vue.js full cal&nbsp; #[span.code --no-deps --no-bs]&nbsp; :metal:

  .top-bar__items.fill-height.mr3
    pre (({{activeSection}}))
    w-button(
      v-if="!isProduction"
      route="/test"
      text
      tile
      color="secondary"
      height="100%")
      w-icon.mr2.green(lg) mdi mdi-needle
      span.green TESTS
    w-menu(
      show-on-hover
      hide-on-menu-click
      align-right
      transition="slide-fade-down"
      menu-class="mt0 top-menu top-menu--doc"
      append-to=".top-bar__items"
      custom)
      template(#activator="{ on }")
        w-button.bd0(
          v-on="on"
          text
          tile
          color="secondary"
          height="100%")
          w-icon.mr2(lg) mdi mdi-school
          span DOC

      w-list.mt0.pa0.sh2.base-color--bg.bdrs1(
        nav
        :items="docs"
        item-class="pa0")
        template(#item="{ item }")
          w-divider.grow.pa0(v-if="(item.class || '').startsWith('divider')" color="grey-light1")
          router-link.w-flex.grow.align-center.px5.py2(v-else-if="item.route" :to="item.route")
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(v-html="item.label")
          .py2(v-else)
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(v-html="item.label")

    w-menu(
      show-on-hover
      hide-on-menu-click
      align-right
      transition="slide-fade-down"
      menu-class="mt0 top-menu top-menu--examples"
      append-to=".top-bar__items"
      custom)
      template(#activator="{ on }")
        w-button.bd0.mr10(
          v-on="on"
          text
          tile
          color="secondary"
          route="/examples"
          height="100%")
          w-icon.mr2(lg) mdi mdi-apps
          span EXAMPLES
      w-list.mt0.pa0.sh2.base-color--bg.bdrs1(
        :items="examples"
        item-class="pa0"
        style="max-height: 90vh;overflow: auto;white-space: nowrap")
        template(#item="{ item }")
          w-divider.grow.pa0(v-if="(item.class || '').startsWith('divider')" color="grey-light1")
          router-link.w-flex.grow.align-center.px5.py2(
            v-else-if="item.route"
            :to="item.route"
            :class="{ active: activeSection === item.route.hash }")
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(:class="{ ml8: !item.icon }" v-html="item.label")
          .w-flex.grow.align-center.px5.py2(v-else)
            w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
            span(:class="{ ml8: !item.icon }" v-html="item.label")
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed, nextTick } from 'vue'
import { useAppStore } from '@/store'

const props = defineProps({
  fixed: { type: Boolean }
})

const store = useAppStore()
const todayDate = ref((new Date()).getDate())
const isProduction = import.meta.env.PROD

// Define the active section ref.
const activeSection = ref('')
// Observer setup for tracking active sections.
let observer = null

// Example sections for the menu.
const docs = [
  { route: '/getting-started', label: 'Getting Started' },
  { class: 'divider pa0' },
  { route: '/api', label: 'API' },
  { route: '/date-prototypes', label: 'Date Prototypes' },
  { route: '/migration-guide', label: 'Migration Guide' },
  { route: '/road-map', label: 'Road Map' },
  { class: 'divider pa0' },
  { route: '/release-notes', label: 'Release Notes' }
]

const examples = [
  { class: 'heading', route: '/examples/view', label: 'VIEW', icon: 'mdi mdi-calendar-blank-outline' },
  { route: { name: 'examples-view', hash: '#ex--layouts' }, label: 'Layouts' },
  { route: { name: 'examples-view', hash: '#ex--views' }, label: 'Views' },
  { route: { name: 'examples-view', hash: '#ex--hide-elements' }, label: 'Hide Elements & Toggles' },
  { route: { name: 'examples-view', hash: '#ex--themes' }, label: 'Themes' },
  { route: { name: 'examples-view', hash: '#ex--internationalization' }, label: 'Internationalization' },
  { route: { name: 'examples-view', hash: '#ex--css-variables' }, label: 'CSS Control' },

  { class: 'heading', route: '/examples/date-and-time', label: 'DATE AND TIME', icon: 'mdi mdi-translate' },
  { route: { name: 'examples-date-and-time', hash: '#ex--timeline' }, label: 'Timeline' },
  { route: { name: 'examples-date-and-time', hash: '#ex--today-current-time' }, label: 'Today\'s Current Time' },
  { route: { name: 'examples-date-and-time', hash: '#ex--scroll-to-time' }, label: 'Scroll the View to a Particular Time' },
  { route: { name: 'examples-date-and-time', hash: '#ex--timeline-tweaking' }, label: 'Timeline Tweaking' },
  { route: { name: 'examples-date-and-time', hash: '#ex--min-max-dates' }, label: 'Minimum / Maximum Dates' },
  { route: { name: 'examples-date-and-time', hash: '#ex--disable-days' }, label: 'Disable Days' },
  { route: { name: 'examples-date-and-time', hash: '#ex--hiding-particular-week-days' }, label: 'Hide Particular Week Days' },

  { class: 'heading', route: '/examples/schedules', label: 'SCHEDULES', icon: 'mdi mdi-account-multiple' },
  { route: { name: 'examples-schedules', hash: '#ex--special-hours' }, label: 'Special / Business Hours' },
  { route: { name: 'examples-schedules', hash: '#ex--schedules' }, label: 'Schedules & Schedule Events' },

  { class: 'heading', route: '/examples/calendar-events', label:'CALENDAR EVENTS', icon: 'mdi mdi-calendar-today-outline' },
  { route: { name: 'examples-calendar-events', hash: '#ex--events' }, label: 'Events & Background Events' },
  { route: { name: 'examples-calendar-events', hash: '#ex--timeless-events' }, label: 'Timeless Events' },
  { route: { name: 'examples-calendar-events', hash: '#ex--open-dialog-on-event-click' }, label: 'Open a Dialog on Event Click' },
  { route: { name: 'examples-calendar-events', hash: '#ex--create-events' }, label: '  anchor="cr' },
  { route: { name: 'examples-calendar-events', hash: '#ex--create-events-programmatically' }, label: 'Create Events Programmatically' },
  { route: { name: 'examples-calendar-events', hash: '#ex--delete-events' }, label: 'Delete Events' },
  { route: { name: 'examples-calendar-events', hash: '#ex--edit-events' }, label: 'Edit Events' },
  { route: { name: 'examples-calendar-events', hash: '#ex--events-v-model' }, label: 'Events v-model' },
  { route: { name: 'examples-calendar-events', hash: '#ex--events-indicators' }, label: 'Events Indicators' },
  { route: { name: 'examples-calendar-events', hash: '#ex--events-on-month-view' }, label: 'Events on Month View' },
  { route: { name: 'examples-calendar-events', hash: '#ex--drag-and-drop' }, label: 'Event Drag &amp; Drop' },
  { route: { name: 'examples-calendar-events', hash: '#ex--external-events-drag-and-drop' }, label: 'External Events Drag &amp; Drop' },
  { route: { name: 'examples-calendar-events', hash: '#ex--multiple-day-events' }, label: 'Multiple Day Events' },
  { route: { name: 'examples-calendar-events', hash: '#ex--recurring-events' }, label: 'Recurring Events' },
  { route: { name: 'examples-calendar-events', hash: '#ex--overlapping-events' }, label: 'Overlapping Events' },
  { route: { name: 'examples-calendar-events', hash: '#ex--all-day-events' }, label: 'All Day Events' },

  { class: 'heading', route: '/examples/dom-events', label:'DOM EVENTS', icon: 'mdi mdi-gesture-double-tap' },
  { route: { name: 'examples-dom-events', hash: '#ex--emitted-events' }, label: 'Vue Cal Emitted Events' },
  { route: { name: 'examples-dom-events', hash: '#ex--external-controls' }, label: 'External Controls & View Methods' },
  { route: { name: 'examples-dom-events', hash: '#ex--sync-two-calendars' }, label: 'Sync two vue-cal instances' },

  { class: 'heading', route: '/examples/customization', label:'CUSTOMIZATION', icon: 'mdi mdi-tune' },
  { route: { name: 'examples-customization', hash: '#ex--slots' }, label: 'Simple Slots' },
  { route: { name: 'examples-customization', hash: '#ex--custom-events-count' }, label: 'Custom Events Count' },
  { route: { name: 'examples-customization', hash: '#ex--custom-title-and-cells' }, label: 'Custom Title & Cells' },
  { route: { name: 'examples-customization', hash: '#ex--custom-event-rendering' }, label: 'Custom event Rendering' },
  { route: { name: 'examples-customization', hash: '#ex--custom-schedules-headings' }, label: 'Custom Day Schedules Headings' },
  { route: { name: 'examples-customization', hash: '#ex--external-controls' }, label: 'External Controls' }

  // w-tag.ml2(color="primary" outline) NEW
  // w-tag.ml2(color="blue" outline) UPDATED
]

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 300))

  const sections = document.querySelectorAll('[id^="ex--"]')

  if (!sections.length) return console.info('No matching sections found in the DOM.')

  const minThreshold = window.innerHeight * 0.03 // 3% of viewport height.
  const maxThreshold = window.innerHeight * 0.47 // 47% of viewport height.

  observer = new IntersectionObserver(entries => {
    let topmostSection = null
    let nextVisibleSection = null

    entries.forEach(entry => {
      const { top } = entry.boundingClientRect

      // If section's top is between 3%-47% of viewport, consider it as the topmost candidate.
      if ((top >= minThreshold && top <= maxThreshold) && (!topmostSection || top < topmostSection.top)) {
        topmostSection = { id: entry.target.id, top }
      }

      // If section's top is between 0%-47% of viewport, consider it as the next visible section.
      if ((top >= 0 && top <= maxThreshold) && (!nextVisibleSection || top < nextVisibleSection.top)) {
        nextVisibleSection = { id: entry.target.id, top }
      }
    })

    // Highlight the correct section:
    // - If a section is within 3%-47%, highlight it.
    // - Otherwise, highlight the next visible section (whose top is in 0%-47% of viewport).
    if (topmostSection) activeSection.value = `#${topmostSection.id}`
    else if (nextVisibleSection) activeSection.value = `#${nextVisibleSection.id}`
  }, {
    root: null, // Uses the viewport as the root.
    threshold: 0.0, // Fires when any part of an element enters/exits the viewport.
    rootMargin: '-3% 0px -53%' // Keeps the 3%-47% detection range accurate.
  })

  sections.forEach(section => observer.observe(section)) // Observe all sections.
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})

// Compute version dynamically.
const version = computed(() => {
  return process.env.VITE_APP_VERSION.replace(
    /-(\w)(\w+)\.(\d+)/,
    (m0, m1, m2, m3) => ` <strong>${m1.toUpperCase()}${m2} ${m3}</strong>`
  )
})
</script>

<style lang="scss">
$secondary: #2c3e50;
$lighter-text: #ccc;

.theme-switch {
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 11;
}

.top-bar {
  position: absolute;
  border-bottom: 1px solid transparent;
  background: rgba(255, 255, 255, 0.1);
  transition: 0.3s ease-in-out all, 0.1s 0s ease-in-out border-color;
  top: 0;
  left: 0;
  right: 0;
  padding-right: 30px;
  box-sizing: content-box;
  background-color: rgba(#fff, 0.6);
  backdrop-filter: blur(6px);
  height: 40px;

  &.w-toolbar {border-color: transparent;}
  .w-app &.w-toolbar {z-index: 10;}

  h1 {height: 100%;}

  &__title {
    position: relative;
    overflow: visible;
    margin-left: auto;
    margin-right: auto;
    width: 15.5em;
    height: 100%;
    transition: 0.3s ease-in-out;
    font-size: 1em;
  }

  &__title-line {
    position: absolute;
    top: 50%;
    width: 130px;
    right: 100%;

    & + & {right: auto;left: 100%;}

    &:before, &:after {
      content: "";
      position: absolute;
      top: 0%;
      width: 100%;
      display: block;
      z-index: -1;
      border-left: none;
      border-right: none;
      border-radius: 99em;
    }

    &:before {
      margin-top: -1px;
      border: 2px solid var(--w-primary-color);
    }

    &:after {
      margin-top: 5px;
      border: 1px solid color-mix(in srgb, var(--w-primary-color) 100%, var(--w-contrast-bg-color) 50%);
    }
  }

  &__logo {
    position: relative;
    flex-shrink: 0;
    vertical-align: middle;
    box-sizing: border-box;
    transition: 0.2s 0s ease-in-out;
    background-color: var(--w-primary-color);
    width: 38px;
    height: 36px;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    opacity: 0.8;
    margin-top: -2px;
    padding-top: 9px;
    font-family: impact, arial black, arial, sans-serif;
    transition: 0.4s 0.4s ease-in-out;
    transform: translate(3px, 3px) scale(0.9);
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0);

    &:before, &:after {
      content: '';
      position: absolute;
      top: 5px;
      width: 5px;
      height: 5px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    &:before {left: 5px;}
    &:after {right: 5px;}

    .ready & {
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
      transform: translate(0, 0);
    }
    [data-theme="dark"] .ready & {box-shadow: 2px 2px 3px #000;}
  }

  &__logo-link {
    display: inline-flex;
    height: 100%;
    font-size: 0.7em;
  }

  &__logo-title {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    transition: 0.3s ease-in-out;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: 2px;
  }

  &__logo-title:after {
    content: "*";
    position: absolute;
    top: 0;
    left: 100%;
    margin-left: 4px;
    line-height: 1;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  .version {
    opacity: 0;
    color: #bbb;
    font-style: italic;
    font-size: 11px;
    position: absolute;
    bottom: -8px;
    right: 0;
  }

  &__items {
    position: absolute;
    right: 0;
    transition: 0.3s ease-in-out;
    transform: translateX(100%);
    opacity: 0;
  }

  .w-menu__content {max-height: 90vh;}

  .w-tag {
    height: 16px;
    line-height: 1;
    font-size: 0.8em;
    padding: 0 7px;
  }

  .intro {
    position: absolute;
    top: 3em;
    left: 76px;
    color: #888;
    opacity: 1;
    transform: translateY(0);
    transition: 0.3s .4s ease-in-out, 0s 0s top;
    font-size: 12px;
    font-weight: normal;
    border: none;
    text-align: left;
    white-space: nowrap;

    &:before {
      content: "* ";
      vertical-align: super;
    }

    em {
      padding-top: 3px;
      opacity: 0.6;
      transition: 0.3s;

      &:hover {opacity: 0.9;}
    }
  }

  // When scrolled: sticky top bar.
  &.fixed {
    transition: 0.6s ease-in-out all, 0.3s 0.5s ease-in-out border-color;
    border-bottom-color: rgba($lighter-text, 0.5);
    position: fixed;

    .top-bar__title {width: 100%;}
    .top-bar__logo {
      width: 32px;
      height: 30px;
      font-size: 0.8em;
      padding-top: 9px;
    }
    .top-bar__logo-title {
      font-size: 0.9em;
      font-weight: 600;
      letter-spacing: 0;
    }
    .top-bar__logo-title:after {opacity: 0;}
    .version {opacity: 1;}

    .top-bar__items {
      transition: 0.3s 0.3s ease-in-out all;
      transform: translateX(0%);
      opacity: 1;
    }

    .intro {
      transition: 0.2s 0s ease-in-out all, 0s 0.3s top;
      transform: translateY(-1em);
      opacity: 0;
      top: -5em;
    }
  }
}

.top-menu li {
  font-size: 15px;

  .router-link-active {
    font-weight: normal;
    // background: linear-gradient(90deg, var(--highlight-color), rgba(255, 255, 255, 0));

    &:before {display: none;}
  }

  &.active {
    color: red;
    font-weight: bold; // Optional emphasis.
  }
}

.top-menu li .heading {
  font-size: 14px;
  color: #888;
  margin-top: 20px;
  padding: 8px 0;
  border-top: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 10%, transparent);
  background: linear-gradient(90deg, var(--highlight-color), rgba(255, 255, 255, 0));

  &:before {background: inherit;}
  &:focus:before, &:hover:before {opacity: 1;}

  .router-link-exact-active {color: var(--w-primary-color);}
}

// Media queries.
// --------------------------------------------------------
@media screen and (max-width: $xs) {
  .fixed .top-bar__logo {transform: scale(0.8);}

  .top-bar.fixed,
  .top-bar.fixed .w-toolbar__content,
  .fixed .w-flex.top-bar__logo-link {
    height: 32px;
    gap: 8px;
  }

  .top-bar__items .w-button {padding: 0 10px;}
}

@media screen and (max-width: $xxs) {
  .theme-switch {top: 4px;right: 4px;}

  .top-bar.fixed .top-bar__items {margin-right: 0;}
  .top-bar.fixed .top-bar__title > .w-flex {padding-left: 8px;}
  .top-bar__title {width: 14.5em;}
  .top-bar .intro {
    font-size: 11px;
    left: 72px;
    letter-spacing: -0.3px;
  }
  .top-bar__items .w-button__content span {display: none;}
  .top-menu--examples li {font-size: 13px;}
  .top-menu--examples li .heading {
    margin-top: 12px;
    padding-top: 4px;
    padding-bottom: 4px;
    padding-left: 30px;
  }
  .top-menu--examples li .w-list__item-label > div {padding-left: 8px;}
}
</style>
