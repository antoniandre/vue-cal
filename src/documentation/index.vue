<template lang="pug">
top-bar(v-if="routeReady && $route.name !== 'home'" fixed)
.page.w-flex.grow.page-container(
  :class="`page--${$route.name}`"
  v-scroll="onScroll"
  v-bind="$attrs")
  aside(v-if="routeReady && !['test', 'home'].includes($route.name)" :class="{ hide: $route.name === 'examples' }")
    nav.nav.mb12
      ul
        li(v-for="item in navItems" :key="item.path")
          router-link.nav__item(:to="item.path" @click="updateDataStreamPosition") {{ item.title }}
          w-transition-expand(y v-if="item.id === 'examples'")
            ul(v-if="$route.fullPath.includes(item.id)")
              li
                router-link.nav__item(to="/examples/introduction" @click="updateDataStreamPosition") Introduction
              li
                router-link.nav__item(to="/examples/view" @click="updateDataStreamPosition") View
              li
                router-link.nav__item(to="/examples/date-and-time" @click="updateDataStreamPosition") Date and Time
              li
                router-link.nav__item(to="/examples/schedules" @click="updateDataStreamPosition") Schedules
              li
                router-link.nav__item(to="/examples/calendar-events--display" @click="updateDataStreamPosition") Events Display
              li
                router-link.nav__item(to="/examples/calendar-events--interactions" @click="updateDataStreamPosition") Events Interactions
              li
                router-link.nav__item(to="/examples/dom-events" @click="updateDataStreamPosition") DOM Events
              li
                router-link.nav__item(to="/examples/customization" @click="updateDataStreamPosition") Customization
              li
                router-link.nav__item(to="/examples/playground" @click="updateDataStreamPosition") Playground

  router-view(v-if="$route.name === 'home'" :offset-top="offsetTop")
  main.main(v-else :class="`main--${$route.name}`" :style="dataStreamStyle" :key="animationKey")
    router-view

    w-transition-twist
      w-button.go-top.ma2(
        v-show="!goTopHidden"
        @click="scrollToTop"
        icon="wi-chevron-up"
        fixed
        bottom
        right
        round
        xl)

footer.page-container.grey-dark1.smd-column.smd-justify-center.gap4(v-if="routeReady")
  .w-flex.text-center.smu-text-left.copyright.align-end
    | Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
  .made-with.text-right.smd-text-center.no-grow
    .w-flex.gap1.mb1.justify-end.smd-justify-center
      | This documentation is made with
      w-tooltip(top)
        template(#activator="{ on }")
          w-icon.caption(v-on="on" size="1rem") mdi mdi-vuejs
        | Vue
      w-tooltip(top)
        template(#activator="{ on }")
          w-icon.caption(v-on="on" size="1rem") mdi mdi-language-html5
        | HTML5 &amp; Pug
      w-tooltip(top)
        template(#activator="{ on }")
          w-icon.caption(v-on="on" size="1rem") mdi mdi-language-css3
        | CSS3
      w-tooltip(top)
        template(#activator="{ on }")
          w-icon.caption(v-on="on" size="1rem") mdi mdi-sass
        | SCSS
      span &amp;
      w-tooltip(top align-right)
        template(#activator="{ on }")
          w-icon.caption(v-on="on" size="1rem").heart mdi mdi-heart
        | Love
    | View project on #[a(href="https://github.com/antoniandre/vue-cal" target="_blank") #[w-icon mdi mdi-github] Github].
</template>

<script setup>
import { provide, ref, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'
import { useSectionObserver } from '@/composables/section-observer'
import TopBar from '@/documentation/components/top-bar.vue'
import '@/scss/index.scss'

const route = useRoute()
const store = useAppStore()
const offsetTop = ref(0)
const goTopHidden = ref(true)
const dataStreamStyle = ref({})
const resetAnimation = ref(false)
const animationKey = ref(0)
const routeReady = ref(false)

const navItems = ref([
  { title: 'Getting Started', path: '/getting-started' },
  { title: 'API', path: '/api' },
  { title: 'Date Prototypes', path: '/date-prototypes' },
  { title: 'Examples', path: '/examples', id: 'examples' },
  { title: 'Migration Guide', path: '/migration-guide' },
  { title: 'Road Map', path: '/road-map' },
  { title: 'Release Notes', path: '/release-notes' }
])

// Initialize section observer.
useSectionObserver({
  onSectionChange: section => (store.activeSection = section)
})

// Update data stream position.
const updateDataStreamPosition = async () => {
  // Wait for DOM to update.
  await nextTick()

  // Find active nav item.
  const activeNavItem = document.querySelector('aside .nav .router-link-exact-active')
  if (activeNavItem) {
    // Get top position relative to viewport.
    const activeRect = activeNavItem.getBoundingClientRect()
    // Get the position relative to the document.
    const topPosition = activeRect.top + window.scrollY

    // Calculate the position relative to the main element.
    // Reference to the main element.
    const mainElement = document.querySelector('main.main')
    if (mainElement) {
      const mainRect = mainElement.getBoundingClientRect()
      const mainTop = mainRect.top + window.scrollY

      // Position relative to main element.
      const relativeTop = topPosition - mainTop + activeRect.height / 2

      // Set CSS variables for the data stream.
      dataStreamStyle.value = {
        '--data-stream-origin-top': `${relativeTop}px`
      }
    }
  }
}

// Function to restart animation - simply increment the animation key to force Vue to recreate the element.
const restartAnimation = () => {
  animationKey.value++
}

// Update position on route change.
// Wait a bit for navigation to complete.
watch(() => route.path, () => {
  setTimeout(() => {
    updateDataStreamPosition()
    restartAnimation() // Increment key to restart animation.
  }, 100)
})

onMounted(() => {
  updateDataStreamPosition() // Initial position update.
  setTimeout(() => (routeReady.value = true), 150)
})

const scrollToTop = () => document.querySelector('#top').scrollIntoView()

// Directives.
const vScroll = {
  mounted: (el, binding) => {
    const f = evt => {
      if (binding.value(evt, el)) window.removeEventListener('scroll', f)
    }
    window.addEventListener('scroll', f)
  }
}

const onScroll = () => {
  const { scrollTop, offsetHeight } = document.documentElement
  offsetTop.value = window.scrollY || scrollTop
  goTopHidden.value = offsetTop.value < 200

  updateDataStreamPosition() // Update data stream position while scrolling.
}

provide('locales', [
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
  { code: 'en-us', label: 'English' },
  { code: 'et', label: 'Estonian' },
  { code: 'fa', label: 'Farsi' },
  { code: 'fr', label: 'French' },
  { code: 'ka', label: 'Georgian' },
  { code: 'kaa', label: 'Qaraqalpaq' },
  { code: 'kk', label: 'Kazakh' },
  { code: 'ky', label: 'Kyrgyz' },
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
  { code: 'uz', label: 'Uzbek' },
  { code: 'vi', label: 'Vietnamese' }
])
</script>

<style lang="scss">
main.main {
  position: relative;

  // Before pseudo element for upward and downward stream.
  &:before, &:after {
    content: '';
    position: absolute;
    top: var(--data-stream-origin-top, 0);
    left: -1px;
    width: 1px;
    height: 35px;
    z-index: 10;
    opacity: 0;
    will-change: transform, opacity;
    pointer-events: none;
    box-shadow:
      0 0 3px color-mix(in srgb, var(--w-primary-color) 80%, transparent),
      0 0 6px color-mix(in srgb, var(--w-primary-color) 40%, transparent);
    transform: translateY(-120%) scaleY(0);
    transition: 0.2s;
    animation: data-stream-up 8s ease-in infinite;
  }
  [data-theme="light"] &:before,
  [data-theme="light"] &:after {box-shadow: none;}

  &:before {
    transform-origin: bottom;
    background: linear-gradient(to top, transparent, var(--w-primary-color));
  }
  &:after {
    transform-origin: top;
    transform: translateY(30%) scaleY(0);
    background: linear-gradient(to bottom, transparent, var(--w-primary-color));
    animation-name: data-stream-down;
  }
}

// Animation for upward stream.
@keyframes data-stream-up {
  0% {opacity: 0;transform: translateY(-120%) scaleY(0);animation-timing-function: ease-in;}
  4% {opacity: 1;transform: translateY(-90%) scaleY(1);animation-timing-function: linear;}
  15% {opacity: 1;}
  20%, 100% {opacity: 0;transform: translateY(-350px);}
}

// Animation for downward stream.
@keyframes data-stream-down {
  0% {opacity: 0;transform: translateY(30%) scaleY(0);animation-timing-function: ease-in;}
  4% {opacity: 1;transform: translateY(10%) scaleY(1);animation-timing-function: linear;}
  15% {opacity: 1;}
  25%, 100% {opacity: 0;transform: translateY(350px);}
}

// Media queries.
// --------------------------------------------------------
@media (max-width: 750px) {
  .main:before, .main:after {display: none;}
}
</style>
