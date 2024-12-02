<template lang="pug">
.example(:class="`example--${anchor}`")
  title-link.mb2(h3 :anchor="`ex--${anchor}`")
    slot(name="title") {{ title }}
  .example__desc(v-if="$slots.desc")
    slot(name="desc")

  ssh-pre.example__source.mt3(
    v-if="$slots['code-html']"
    language="html-vue"
    data-label="HTML"
    :dark="store.darkMode")
    slot(name="code-html")
  ssh-pre.example__source.mt3(
    v-if="$slots['code-js']"
    language="js"
    data-label="JS"
    :dark="store.darkMode")
    slot(name="code-js")
  ssh-pre.example__source.mt3(
    v-if="$slots['code-css']"
    language="css"
    data-label="CSS"
    :dark="store.darkMode")
    slot(name="code-css")

  .example__render.w-flex.justify-center.mt2
    slot
  .example__desc
    slot(name="desc2")
    p.mt3 For all the options details, refer to the #[router-link(to="/api") API] section.
</template>

<script setup>
import { useAppStore } from '@/store'

const store = useAppStore()

defineProps({
  title: { type: String },
  anchor: { type: String, required: true }
})
</script>

<style lang="scss">
.example {
}
</style>
