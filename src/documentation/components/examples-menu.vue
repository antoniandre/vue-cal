<template lang="pug">
w-list.examples-menu(:items="filteredExamples" item-class="pa0")
  template(#item="{ item }")
    w-divider.grow.pa0(v-if="(item.class || '').startsWith('divider')" color="grey-light1")
    router-link.w-flex.grow.align-center.px5.py2(
      :to="item.route"
      :class="{ active: store.activeSection === item.route.hash }")
      w-icon.mr2(v-if="item.icon" lg) {{ item.icon }}
      span(v-html="item.label")
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'

const props = defineProps({
  onlyActivePage: { type: Boolean }
})

const route = useRoute()
const store = useAppStore()

const examples = [
  { class: 'heading', route: '/examples/view', label: 'VIEW', icon: 'mdi mdi-calendar-blank-outline' },
  { route: { name: 'examples-view', hash: '#ex--layouts' }, label: 'Layouts' },
  { route: { name: 'examples-view', hash: '#ex--views' }, label: 'Views' },
  { route: { name: 'examples-view', hash: '#ex--hide-elements' }, label: 'Hide Elements & Toggles' },
  { route: { name: 'examples-view', hash: '#ex--internationalization' }, label: 'Internationalization' },
  { route: { name: 'examples-view', hash: '#ex--themes' }, label: 'Themes' },
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

  { class: 'heading', route: '/examples/calendar-events--display', label: 'CALENDAR EVENTS - DISPLAY', icon: 'mdi mdi-calendar-today-outline' },
  { route: { name: 'examples-events-display', hash: '#ex--events' }, label: 'Events & Background Events' },
  { route: { name: 'examples-events-display', hash: '#ex--timeless-events' }, label: 'Timeless Events' },
  { route: { name: 'examples-events-display', hash: '#ex--open-dialog-on-event-click' }, label: 'Open a Dialog on Event Click' },
  { route: { name: 'examples-events-display', hash: '#ex--events-on-month-view' }, label: 'Events on Month View' },
  { route: { name: 'examples-events-display', hash: '#ex--overlapping-events' }, label: 'Overlapping Events' },
  { route: { name: 'examples-events-display', hash: '#ex--all-day-events' }, label: 'All Day Events' },
  { route: { name: 'examples-events-display', hash: '#ex--multiple-day-events' }, label: 'Multiple Day Events' },
  { route: { name: 'examples-events-display', hash: '#ex--recurring-events' }, label: 'Recurring Events' },

  { class: 'heading', route: '/examples/calendar-events--interactions', label: 'CALENDAR EVENTS - INTERACTIONS', icon: 'mdi mdi-calendar-today-outline' },
  { route: { name: 'examples-events-interactions', hash: '#ex--create-events' }, label: 'Create Events' },
  { route: { name: 'examples-events-interactions', hash: '#ex--create-events-programmatically' }, label: 'Create Events Programmatically' },
  { route: { name: 'examples-events-interactions', hash: '#ex--delete-events' }, label: 'Delete Events' },
  { route: { name: 'examples-events-interactions', hash: '#ex--edit-events' }, label: 'Edit Events' },
  { route: { name: 'examples-events-interactions', hash: '#ex--events-v-model' }, label: 'Events v-model' },
  { route: { name: 'examples-events-interactions', hash: '#ex--drag-and-drop' }, label: 'Event Drag &amp; Drop' },
  { route: { name: 'examples-events-interactions', hash: '#ex--external-events-drag-and-drop' }, label: 'External Events Drag &amp; Drop' },
  { route: { name: 'examples-events-interactions', hash: '#ex--reject-event-dnd-or-resizing' }, label: 'Reject Event D&amp;D or Resizing' },
  { route: { name: 'examples-events-interactions', hash: '#ex--events-reactivity' }, label: 'Events Reactivity' },

  { class: 'heading', route: '/examples/dom-events', label:'DOM EVENTS', icon: 'mdi mdi-gesture-double-tap' },
  { route: { name: 'examples-dom-events', hash: '#ex--emitted-events' }, label: 'Vue Cal Emitted Events' },
  { route: { name: 'examples-dom-events', hash: '#ex--loading-events-from-backend' }, label: 'Loading Events from a Backend' },
  { route: { name: 'examples-dom-events', hash: '#ex--external-controls' }, label: 'External Controls & View Methods' },
  { route: { name: 'examples-dom-events', hash: '#ex--sync-two-calendars' }, label: 'Sync Two Vue Cal Instances' },

  { class: 'heading', route: '/examples/customization', label:'CUSTOMIZATION', icon: 'mdi mdi-tune' },
  { route: { name: 'examples-customization', hash: '#ex--slots' }, label: 'Simple Slots' },
  { route: { name: 'examples-customization', hash: '#ex--custom-title-per-view' }, label: 'Custom Title Per View' },
  { route: { name: 'examples-customization', hash: '#ex--custom-cells' }, label: 'Custom Cells' },
  { route: { name: 'examples-customization', hash: '#ex--custom-event-rendering' }, label: 'Custom Event Rendering' },
  { route: { name: 'examples-customization', hash: '#ex--custom-schedules-headings' }, label: 'Custom Day Schedules Headings' },
  { route: { name: 'examples-customization', hash: '#ex--external-controls' }, label: 'External Controls' },
  { route: { name: 'examples-customization', hash: '#ex--events-on-month-view' }, label: 'Events on Month View' }

  // w-tag.ml2(color="primary" outline) NEW
  // w-tag.ml2(color="blue" outline) UPDATED
]

const filteredExamples = computed(() => {
  if (!props.onlyActivePage) return examples

  return examples.filter(item => item.class !== 'heading' && item.route.name === route.name)
})
</script>

<style lang="scss">
.examples-menu {
  li {font-size: 15px;}
  li a {color: inherit;}

  .router-link-active {
    font-weight: normal;

    &:before {display: none;}
    &.active {
      color: var(--w-primary-color);
      background: linear-gradient(90deg, var(--highlight-color), rgba(255, 255, 255, 0));
      font-weight: bold; // Optional emphasis.
    }
  }

  .heading {
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
  li:first-child .heading {margin-top: 0;}
}
</style>
