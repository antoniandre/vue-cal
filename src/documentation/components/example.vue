<template lang="pug">
.example
  title-link(h3 :anchor="`ex--${anchor}`") {{ title }}
  .example__desc(v-if="$slots.desc")
    slot(name="desc")

  ssh-pre.example__source.mt3(language="html-vue" :dark="store.darkMode")
    slot(name="code")

  .example__render.mt2
    slot
  .example__desc
    slot(name="desc2")
    p.mt3 For all the options details, refer to the #[a(href="#api") API] section.
</template>

<script setup>
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import { useAppStore } from '@/store'
import TitleLink from '@/documentation/components/title-link.vue'

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
