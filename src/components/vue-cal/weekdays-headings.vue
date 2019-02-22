<template lang="pug">
.vuecal__flex.vuecal__weekdays-headings
  |{{$parent.transitionDirection}}|{{transitionDirection}}
  .vuecal__flex.vuecal__heading(:class="heading.class" v-for="(heading, i) in headings" :key="i")
    transition(:name="`slide-fade--${transitionDirection}`" :appear="transitions")
      span(:key="transitions ? `${i}-${heading.label4}` : false")
        span(v-for="j in 3" :key="j") {{ heading['label' + j]}}
        span(v-if="heading.label4") &nbsp;
        span(v-if="heading.label4") {{ heading.label4 }}
</template>

<script>
export default {
  props: {
    headings: {
      type: Array,
      default: () => []
    },
    transitions: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">

</style>
