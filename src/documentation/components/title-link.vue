<template lang="pug">
component.title-link(:is="tag")
  a(:href="`#${anchor}`")
    slot
  a(:id="anchor")
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  h1: Boolean,
  h2: Boolean,
  h3: Boolean,
  h4: Boolean,
  h5: Boolean,
  h6: Boolean,
  div: Boolean,
  label: String,
  anchor: { type: String, required: true }
})

const tag = computed(() => {
  return (props.h1 && 'h1') ||
    (props.h2 && 'h2') ||
    (props.h3 && 'h3') ||
    (props.h4 && 'h4') ||
    (props.h5 && 'h5') ||
    (props.h6 && 'h6') ||
    'div'
})
</script>

<style lang="scss">
.title-link {
  position: relative;

  a {
    display: inline-flex;
    align-items: center;
  }

  a[id] {
    position: absolute;
    display: block;
    visibility: hidden;
    margin-top: -5.5rem;
  }
}
</style>
