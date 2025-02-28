<template lang="pug">
documentation(:class="{ prod: isProduction }")
</template>

<script setup>
import { onMounted, inject } from 'vue'
import { useAppStore } from '@/store'
import Documentation from '@/documentation/index.vue'

const $waveui = inject('$waveui')
const store = useAppStore()
const isProduction = import.meta.env.PROD

onMounted(() => store.applyTheme(localStorage.theme || $waveui.preferredTheme))
</script>
