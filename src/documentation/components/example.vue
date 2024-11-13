<template lang="pug">
.example(:class="`example--${anchor}`")
  title-link.mb2(h3 :anchor="`ex--${anchor}`") {{ title }}
  .example__desc(v-if="$slots.desc")
    slot(name="desc")

  ssh-pre.example__source.mt3(
    v-if="$slots['code-html']"
    language="html-vue"
    :dark="store.darkMode")
    slot(name="code-html")
  ssh-pre.example__source.mt3(
    v-if="$slots['code-js']"
    language="js"
    :dark="store.darkMode")
    slot(name="code-js")
  ssh-pre.example__source.mt3(
    v-if="$slots['code-css']"
    language="js"
    :dark="store.darkMode")
    slot(name="code-css")

  .example__render.mt2
    slot
  .example__desc
    slot(name="desc2")
    p.mt3 For all the options details, refer to the #[router-link(to="/api") API] section.
</template>

<script setup>
import { useAppStore } from '@/store'

const store = useAppStore()

defineProps({
  title: { type: String, required: true },
  anchor: { type: String, required: true }
})
</script>

<style lang="scss">
.example {
}
</style>
