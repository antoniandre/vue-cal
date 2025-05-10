<template lang="pug">
.examples-container.w-flex.grow.gap12(:class="{ 'examples-container--has-aside': showAside }")
  .grow.w-flex.grow.column
    h1.title1
      | Examples
      template(v-if="$route.name !== 'examples-intro'")
        w-icon.caption.mx1(lg) wi-chevron-right
        span(v-html="$route.meta.title")

    .main--examples
      router-view

  aside.aside(v-if="showAside")
    .aside__content
      .title.grey ON THIS PAGE
      examples-menu(only-active-page)
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'
import { addDatePrototypes } from '@/vue-cal'
import ExamplesMenu from '@/documentation/components/examples-menu.vue'

addDatePrototypes()

const route = useRoute()
const $waveui = inject('$waveui')

const showAside = computed(() => {
  return !['examples-intro', 'playground'].includes(route.name) && $waveui.breakpoint.width >= 1400
})
</script>

<style lang="scss">
.main--playground .examples-container {
  &, > div {overflow: hidden;}
}

.main--examples {
  .example h2 {
    margin-top: 80px;
    padding: 10px 0 0;
    color: var(--w-base-color);
    font-weight: normal;

    a {
      font-size: 24px;
    }
    margin-bottom: 12px;
  }
  .example:first-child h2 {margin-top: 20px;}

  .example .vuecal:not(.vuecal--date-picker) {height: 301px;}
}

.examples-container .aside {
  position: relative;
  width: 200px;
  display: block;
  padding-top: 0;

  .aside__content {
    position: fixed;
    padding-bottom: 5rem; // For the left border effect.

    &:before {
      content: '';
      position: absolute;
      inset: 0;
      border-left: 0.5px solid var(--w-primary-color);
      mask: linear-gradient(0deg, transparent, black 100%);
    }
  }

  .title {
    padding-left: 20px;
    font-size: 0.9rem;
  }

  ul {
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-left: 0.5px;
  }

  .examples-menu a:hover {
    background-color: color-mix(in srgb, var(--w-primary-color) 10%, transparent);
  }
}
</style>
