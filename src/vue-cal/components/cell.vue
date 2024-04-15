<template lang="pug">
.vue-cal__cell(:class="classes") {{ date }}
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: { type: Date, required: true },
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
