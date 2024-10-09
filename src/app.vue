<template lang="pug">
documentation
</template>

<script setup>
import { onMounted, inject } from 'vue'
import { useAppStore } from '@/store'
import Documentation from '@/documentation/index.vue'

const $waveui = inject('$waveui')
const store = useAppStore()

onMounted(() => store.applyTheme(localStorage.theme || $waveui.preferredTheme))
</script>
