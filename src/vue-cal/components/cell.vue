<template lang="pug">
.vue-cal__cell(:class="classes") {{ index }}
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  index: { type: Number, required: true }
})
const classes = computed(() => ({
  [`vuecal__cell--${props.index}`]: true
}))
</script>

<style lang="scss">
.vue-cal__cell {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
