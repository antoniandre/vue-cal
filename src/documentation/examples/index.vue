<template lang="pug">
h1.title1 Examples

p.title3.
  In addition to all the examples below, you can try these common use cases on Codepen.
p
  | If you have a doubt about the setup, check back the examples of the
  a.ml1(href="#installation") installation section
  | .

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

title-link(h2 anchor="view-examples")
  w-icon.mr2 mdi mdi-done
  | View Examples
view-examples

title-link(h2 anchor="events-examples")
  w-icon.mr2 mdi mdi-calendar
  | Calendar Events Examples
//- calendar-events-examples

title-link(h2 anchor="dom-events-examples")
  w-icon.mr2 mdi mdi-swap_horizontal
  | DOM Events Examples
//- dom-events-examples

title-link(h2 anchor="customization-examples")
  w-icon.mr2 mdi mdi-tune
  | Customization Examples
//- customization-examples
</template>

<script setup>
import { inject } from 'vue'
import { useAppStore } from '@/store'
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import EnUs from '@/vue-cal/i18n/en-us.json'
import { VueCal, addDatePrototypes, useLocale, stringToDate } from '@/vue-cal'
import TitleLink from '@/documentation/components/title-link.vue'
import HighlightMessage from '@/documentation/components/highlight-message.vue'
import ViewExamples from './view.vue'
import CustomizationExamples from './customization.vue'
import CalendarEventsExamples from './calendar-events.vue'
import DomEventsExamples from './dom-events.vue'

useLocale(EnUs)
addDatePrototypes()

const store = useAppStore()
const locales = inject('locales')
</script>

<style lang="scss">
.main--examples {
  h2 {
    position: relative;
    margin-top: 120px;
    padding: 16px 22px;
    background: color-mix(in srgb, var(--highlight-color) 60%, transparent);
  }
  h2:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    max-width: 400px;
    width: 4px;
    background: color-mix(in srgb, var(--w-primary-color) 50%, transparent);
  }

  h2 + .example h3 {margin-top: 20px;}

  h3.title-link {
    border-bottom: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 12%, transparent);
    margin-bottom: 12px;
  }
}
</style>
