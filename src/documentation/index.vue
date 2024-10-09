<template lang="pug">
top-bar(v-if="$route.name !== 'home'" fixed)

.page.w-flex.grow.page-container(:class="`page--${$route.name}`")
  aside(v-if="$route.name !== 'home'")
    nav.mb12
      ul.size--lg
        li
          router-link(to="/") Home
        li
          router-link(to="/getting-started") Getting Started
        li
          router-link(to="/api") API
        li
          router-link(to="/examples") Examples
        li
          router-link(to="/migration-guide") Migration Guide
        li
          router-link(to="/road-map") Road Map
        li
          router-link(to="/release-notes") Release Notes

  router-view(v-if="$route.name === 'home'" :locales="localesList" :dark-mode="store.darkMode")
  main.main(v-else :class="`main--${$route.name}`")
    router-view(:locales="localesList" :dark-mode="store.darkMode")

    w-transition-twist
      w-button.go-top.ma2(
        v-show="!goTopHidden"
        icon="wi-chevron-up"
        fixed
        bottom
        right
        round
        xl
        v-scroll-to="'#top'")

footer.page-container.grey-dark1.smd-column.smd-justify-center.gap4
  .text-center.smu-text-left.copyright
    | Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
  .made-with.text-right.smd-text-center.no-grow
    .w-flex.gap1.mb1.justify-end.smd-justify-center
      | This documentation is made with
      w-tooltip
        template(#activator="{ on }")
          w-icon(v-on="on") mdi mdi-vuejs
        | Vue
      w-tooltip
        template(#activator="{ on }")
          w-icon(v-on="on") mdi mdi-language-html5
        | HTML5 &amp; Pug
      w-tooltip
        template(#activator="{ on }")
          w-icon.ml1(v-on="on") mdi mdi-language-css3
        | CSS3
      w-tooltip
        template(#activator="{ on }")
          w-icon.ml1(v-on="on") mdi mdi-sass
        | SCSS
      span.ml2.mr1 &amp;
      w-tooltip
        template(#activator="{ on }")
          w-icon(v-on="on").heart mdi mdi-heart
        | Love
    | View project on #[a(href="https://github.com/antoniandre/vue-cal" target="_blank") #[w-icon mdi mdi-github] Github].
</template>

<script setup>
import { useAppStore } from '@/store'
import TopBar from '@/documentation/components/top-bar.vue'

const store = useAppStore()

const localesList = [
  { code: 'sq', label: 'Albanian' },
  { code: 'ar', label: 'Arabic' },
  { code: 'bn', label: 'Bangla' },
  { code: 'bs', label: 'Bosnian' },
  { code: 'bg', label: 'Bulgarian' },
  { code: 'ca', label: 'Catalan' },
  { code: 'cs', label: 'Czech' },
  { code: 'zh-cn', label: 'Chinese (Simplified)' },
  { code: 'zh-hk', label: 'Chinese (Traditional)' },
  { code: 'hr', label: 'Croatian' },
  { code: 'da', label: 'Danish' },
  { code: 'nl', label: 'Dutch' },
  { code: 'en', label: 'English' },
  { code: 'et', label: 'Estonian' },
  { code: 'fa', label: 'Farsi' },
  { code: 'fr', label: 'French' },
  { code: 'ka', label: 'Georgian' },
  { code: 'de', label: 'German' },
  { code: 'el', label: 'Greek' },
  { code: 'he', label: 'Hebrew' },
  { code: 'hu', label: 'Hungarian' },
  { code: 'is', label: 'Icelandic' },
  { code: 'it', label: 'Italian' },
  { code: 'id', label: 'Indonesian' },
  { code: 'ja', label: 'Japanese' },
  { code: 'ko', label: 'Korean' },
  { code: 'lt', label: 'Lithuanian' },
  { code: 'mn', label: 'Mongolian' },
  { code: 'no', label: 'Norwegian' },
  { code: 'pl', label: 'Polish' },
  { code: 'pt-br', label: 'Portuguese Brasilian' },
  { code: 'ro', label: 'Romanian' },
  { code: 'ru', label: 'Russian' },
  { code: 'sr', label: 'Serbian' },
  { code: 'sk', label: 'Slovak' },
  { code: 'sl', label: 'Slovenian' },
  { code: 'es', label: 'Spanish' },
  { code: 'sv', label: 'Swedish' },
  { code: 'tr', label: 'Turkish' },
  { code: 'uk', label: 'Ukrainian' },
  { code: 'vi', label: 'Vietnamese' }
]
</script>

<style lang="scss">
@import '@/scss/index.scss';
@import '@/scss/documentation.scss';
</style>
