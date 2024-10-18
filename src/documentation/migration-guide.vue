<template lang="pug">
h1.title1 Migration Guide

h2 Global
ul
  li
    p The Date prototypes are not injected by default anymore, and very easy to add, you control when:
    ssh-pre(language="js" :dark="store.darkMode").
      import { addDatePrototypes } from '@/vue-cal'

      addDatePrototypes()

h2 Props
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
