<template lang="pug">
.documentation.page-container
  nav.mb12(v-if="$route.fullPath !== '/'")
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

  router-view(:locales="localesList" :dark-mode="store.darkMode")
</template>

<script setup>
import '@/scss/documentation.scss'
import { useAppStore } from '@/store'

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
.w-tabs__content-wrap {flex-grow: 1;}

.highlight-box {
  background: linear-gradient(45deg, #ecf8f1, rgba(#fff, 0));
  padding: 16px;
  border-radius: 8px;

  .w-icon.bolt {
    width: 68px;
    height: 68px;
    background-color: rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

@media screen and (max-width: 830px) {
  .w-app .vs-d-block {display: block;}
}
</style>
