<template lang="pug">
h1.title1
  | Examples
  template(v-if="$route.name !== 'introduction'")
    w-icon.caption.mx1(lg) wi-chevron-right
    span(v-html="$route.meta.title")

router-view
</template>

<script setup>
import { inject } from 'vue'
import { useAppStore } from '@/store'
import EnUs from '@/vue-cal/i18n/en-us.json'
import { addDatePrototypes, useLocale, stringToDate } from '@/vue-cal'

useLocale(EnUs)
addDatePrototypes()

const store = useAppStore()
const locales = inject('locales')
</script>

<style lang="scss">
.main--examples {
  h2 {
    position: relative;
    margin-top: 120px;
    padding: 16px 22px;
    line-height: 1;
    background: color-mix(in srgb, var(--highlight-color) 60%, transparent);
  }
  h2:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    max-width: 400px;
    width: 4px;
    background: color-mix(in srgb, var(--w-primary-color) 50%, transparent);
  }

  h2 + .example h3 {margin-top: 20px;}

  h3.title-link {
    border-bottom: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 12%, transparent);
    margin-bottom: 12px;
  }
}
</style>
