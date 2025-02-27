<template lang="pug">
.example(:class="`example--${anchor}`")
  title-link.mb2(h2 :anchor="`ex--${anchor}`")
    slot(name="title") {{ title }}
  .example__desc(v-if="$slots.desc")
    slot(name="desc")

  .source-wrap.w-flex.column.gap3.mt3(
    v-if="$slots['code-html'] || $slots['code-js'] || $slots['code-css']"
    :class="{ expanded, 'no-scroll': sourceInnerNoScroll, [codeClass]: !!codeClass }")
    .source-inner.w-flex.column.gap3(ref="sourceInnerEl")
      ssh-pre.example__source(
        v-if="$slots['code-html']"
        language="html-vue"
        data-label="HTML"
        :dark="store.darkMode")
        slot(name="code-html")
      ssh-pre.example__source(
        v-if="$slots['code-js']"
        language="js"
        data-label="JS"
        :dark="store.darkMode")
        slot(name="code-js")
      ssh-pre.example__source(
        v-if="$slots['code-css']"
        language="css"
        data-label="CSS"
        :dark="store.darkMode")
        slot(name="code-css")
    w-button.example__source-expand(v-if="!sourceInnerNoScroll" sm round @click="onExpandClick")
      w-icon.mr1 mdi mdi-unfold-{{ expanded ? 'less' : 'more' }}-horizontal
      | {{ expanded ? 'Collapse' : 'Expand' }} Source Code

  .example__render.mt2.mxa
    slot
  .example__desc
    slot(name="desc2")
    p.caption.mt1 For all the options details, refer to the #[router-link(to="/api") API] section.
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { useAppStore } from '@/store'

const store = useAppStore()

defineProps({
  title: { type: String },
  codeClass: { type: String },
  anchor: { type: String, required: true }
})

const expanded = ref(false)
const sourceInnerEl = ref(null)
const sourceInnerNoScroll = ref(false)

// If the example source code is dynamic, the height of the source-wrap will change,
// so we need to refresh it for the expand button to show up correctly.
const refreshSourceInnerHeight = async () => {
  await nextTick()
  if (!sourceInnerEl.value) return
  sourceInnerNoScroll.value = !expanded.value && (sourceInnerEl.value.scrollHeight <= sourceInnerEl.value.clientHeight)
}
const onExpandClick = () => {
  expanded.value = !expanded.value
  sourceInnerEl.value.scrollTop = 0 // Scroll to top when toggling.
}

onMounted(() => {
  refreshSourceInnerHeight()
})

defineExpose({ refreshHeight: refreshSourceInnerHeight })
</script>

<style lang="scss">
.example {
  .source-wrap {
    position: relative;
    border: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 10%, transparent);
    border-radius: 6px;
    overflow: hidden;

    &:after {
      content: '';
      position: sticky;
      inset: auto 0 0;
      height: 80px;
      margin-top: -92px; // Counteracts the gap on parent 12px + the height 80px.
      flex-shrink: 0;
      background-image: linear-gradient(0deg, var(--w-base-bg-color) 40%, rgba(#fff, 0));
      z-index: 1;
      pointer-events: none;
      transition: 0.35s ease-in-out;
    }
    &.expanded:after, &.no-scroll:after {opacity: 0;}
  }

  .source-inner {
    overflow-y: hidden;
    max-height: 250px;
    transition: 0.25s ease-out;
  }

  .source-wrap.expanded .source-inner {
    overflow-y: auto;
    max-height: 1200px; // Should stay bigger than likely height.
    transition: 0.35s ease-in-out;
  }

  .w-app &__source-expand {
    position: absolute;
    bottom: 8px;
    background-color: color-mix(in srgb, var(--w-contrast-bg-color) 5%, transparent);
    backdrop-filter: blur(5px);
    color: var(--w-base-color);
    z-index: 2;
  }
  .w-app &__source[data-label] {
    margin: 0;
    border-width: 1px 0;
  }
  .w-app &__source[data-label]:first-child {border-top: none;}
  .w-app &__source[data-label]:last-of-type {
    border-bottom: none;
    padding-bottom: 24px; // Leave some space for the expand button.
  }
  .w-app .source-wrap.no-scroll &__source[data-label]:last-of-type {padding-bottom: 8px;}

  .vuecal {margin-left: auto;margin-right: auto;}
}
</style>
