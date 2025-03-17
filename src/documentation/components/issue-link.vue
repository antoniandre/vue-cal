<template lang="pug">
a(:href="`https://github.com/antoniandre/vue-cal/issues/${number}`" target="_blank" v-text="`#${number}`")
</template>

<script setup>
import { ref, onMounted, useSlots } from 'vue'

const number = ref('')

onMounted(async () => {
  number.value = (useSlots().default?.() || [])[0]?.children || ''
})
</script>
