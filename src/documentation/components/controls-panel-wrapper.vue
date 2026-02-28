<template lang="pug">
w-drawer(
  v-if="$waveui.breakpoint.xs"
  :model-value="drawerOpen"
  @update:model-value="$emit('update:drawer-open', $event)"
  right
  width="350"
  drawer-class="controls-panel ova d-block"
  data-testid="controls-drawer")
  slot
.controls-panel(v-else)
  slot
</template>

<script setup>
defineProps({
  drawerOpen: { type: Boolean, required: true }
})
defineEmits(['update:drawer-open'])
</script>
