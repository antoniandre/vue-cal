<template lang="pug">
h1.title1 Migration Guide

ul
  li `activeView` renamed `view`
  li removed `hideBody` useless. With so much flexibility, there is no case where you only need the header without the calendar body
  li cellContextmenu -> removed, you can attach from outside
  li disableViews -> removed, replaced with `views` which is defining the available views instead
  li small renamed sm
  li x-small renamed xs
  li specialHours -> days indexes should now be provided as 3 letter strings like 'mon', 'tue', 'wed', etc.
  li disableWeekdays -> days indexes should now be provided as 3 letter strings like 'mon', 'tue', 'wed', etc.
  li
</template>

<script setup>
</script>

<style lang="scss">
</style>
