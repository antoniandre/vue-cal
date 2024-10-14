<template lang="pug">
component.title-link(:is="tag")
  a(:href="`#${anchor}`")
    slot
  a(:id="anchor")
</template>

<script setup>
defineProps({
  tag: { type: String, default: 'h2' },
  anchor: { type: String, required: true }
})
</script>

<style lang="scss">
.title-link {
  position: relative;

  a[id] {
    position: absolute;
    display: block;
    visibility: hidden;
    margin-top: -5.5rem;
  }
}
</style>
