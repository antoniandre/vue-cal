<template lang="pug">
.vue-cal__body
  .vue-cal__cell(v-for="i in 42" :index="i") {{ i }}
</template>

<script setup>
</script>

<style lang="scss">
.vue-cal__body {
  display: grid;
  grid-template-columns: 6;
  grid-template-rows: 7;
  height: 100%;
}
</style>
