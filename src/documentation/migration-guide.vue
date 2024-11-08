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
    It should only start respectively with #[code event-] or #[code cell-] to be forwarded.
  li.
    Navigation by clicking or double-clicking cell has been removed, you can add this yourself
    now that you can directly attach any valid DOM event to the cell.
  li.
    The default theme is used by default. No need to add the class anymore, but you can disable and
    style from scratch by setting the #[code theme] prop to false or a different class string.

h2.mt12 Props
ul
  li `activeView` renamed `view`
  li removed `hideBody` useless. With so much flexibility, there is no case where you only need the header without the calendar body
  li cellContextmenu -> removed, you can attach from outside
  li disableViews -> removed, replaced with `views` which is defining the available views instead
  li small renamed sm
  li x-small renamed xs
  li specialHours -> days indexes should now be provided as 3 letter strings like 'mon', 'tue', 'wed', etc.
  li disableWeekdays -> days indexes should now be provided as 3 letter strings like 'mon', 'tue', 'wed', etc.
  li hideViewsBar renamed viewsBar, default false
  li todayButton now defaults to true, previously false
  li clickToNavigate -> removed, you can attach your own DOM events to cells.
  li dblClickToNavigate -> removed, you can attach your own DOM events to cells.
  li day-splits -> renamed `schedules`
</template>

<script setup>
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import { useAppStore } from '@/store'
import TitleLink from '@/documentation/components/title-link.vue'
import { addDatePrototypes } from '@/vue-cal'

const store = useAppStore()
addDatePrototypes()
</script>

<style lang="scss">
</style>
