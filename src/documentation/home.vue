<template lang="pug">
div(:class="{ ready }")
  top-bar(:fixed="offsetTop > 130")

hero

.w-flex
  aside
    nav.nav
      ul
        li(v-for="item in navItems" :key="item.path")
          router-link.nav__item(:to="item.path") {{ item.title }}

  main
    .get-started-cta
      .cta-wrap
        .w-flex.align-center.justify-center.column
          h2.title1.mt0.mb6 Ready to Create Amazing Calendars?
          p.subtitle.mb10 Vue Cal makes it easy to build powerful, flexible calendars for your Vue.js applications.
          w-button.cta-button(xl round color="primary" route="/getting-started")
            w-icon.mr3(size="1.4rem") mdi mdi-rocket-launch-outline
            | Get Started
            w-icon.ml3(size="1.4rem") mdi mdi-arrow-right

    //- Github project.
    title-link.mt0.mb4(h2 anchor="github-and-notes") Github project &nbsp;&amp;&nbsp; important notes
    .announcement.announcement--github.w-flex.align-center
      w-icon.mr5.lightgrey(size="46") mdi mdi-github
      a.title4(href="https://github.com/antoniandre/vue-cal" target="_blank")
        | github.com/antoniandre/vue-cal
        w-icon.ml2(color="primary" sm) mdi mdi-open-in-new

    .announcement.w-flex.align-center
      w-icon.ml-1.mr4(size="50" color="amber-light3") mdi mdi-information-outline
      w-alert.message-box.important-notes(border-left color="orange-dark1" bg-color="yellow-light5")
        ul
          li.mb2
            strong Always check the #[router-link(to="/release-notes") Release Notes] when you upgrade
          li
            strong Philosophy: separate logic &amp; styles
            p.
              For performance and ease to override with in CSS, Vue Cal prefers to keep layouts and cosmetics
              in the CSS, as much as possible. Whatever can be achieved via CSS should be done there and not
              in the JavaScript. Vue Cal uses clean and not too specific CSS using BEM naming convention.
              It should be a breeze to override, without any #[code !important]!

    .announcement.w-flex.align-center
      w-icon.ml-1.mr4(size="50" color="pink-light3") mdi mdi-heart
      w-alert.message-box(border-left color="pink")
        | If you like Vue Cal, you can
        a.pink.mx2(
          href="https://github.com/sponsors/antoniandre"
          target="_blank"
          style="text-decoration: underline") #[strong Sponsor me]
        | or
        a.pink.ml2(
          href="https://www.paypal.me/antoniandre1"
          target="_blank"
          style="text-decoration: underline") #[strong buy me a coffee]
        | !
        div Thank you so much to all the backers! #[span.title3.ml1 🙏]

    .announcement.w-flex.align-center
      svg.mr4.blue-light1(viewBox="0 0 725 477" style="width: 50px;stroke: #497ca2;stroke-width: 5px")
        path(fill="#497ca2" d="M449 0c-78 5-152 39-217 82-19 13-37 26-54 40-39 1-77 15-110 34-34 21-53 60-61 99-11 52-8 108 6 159 7 23 16 46 33 63 4-4 13-4 13-11-1-5-7-8-9-14-27-48-32-108-11-159 13-32 36-63 68-77 19-9 42-7 58 6 6 7 18 4 24-2 6-4 11-10 19-10-24 25-39 60-38 95 1 15 3 31 8 45 16 36 41 69 76 89 5 2 10 6 16 7 5-2 14-5 14-12-4-9-14-12-21-18-27-23-56-48-67-82-9-29-1-60 8-88 7-15 21-32 39-29 15 1 28 13 43 8 11-5 13-17 16-27 5-17 3-38-10-51-16-18-40-23-62-25l-11-2c23-19 53-26 81-31 21-3 43-5 64-2 18 3 28 21 42 31-33 47-57 102-56 159a170 170 0 0086 149c6-1 13-7 10-14-5-11-17-16-25-25-33-30-52-75-50-121 1-29 11-58 24-84 12-25 25-52 47-71 9-8 22-13 33-7 20 8 42 14 63 13-35 27-55 70-64 113-9 44-7 91 12 133 15 37 45 68 81 85 32 16 67 24 101 27 18 1 36 2 53-4 4-1 6-7 2-9-13-6-28-4-42-6-45-5-92-16-127-45-34-28-54-71-60-114-5-47 7-97 34-137 11-15 26-31 45-34 14-1 25 12 31 23 6 12 16 24 29 28 20-10 40-26 43-50 2-17-6-34-14-49-15-25-40-43-69-48-20-5-41-2-61-6-22-21-54-24-83-24zm6 21c22 0 48 5 62 25 4 7 8 16 8 24-1 10-10 22-21 19-9-7-18-14-30-16-14-4-31-1-43 8-6 6-17 8-24 2-9-6-17-15-28-17-27-7-54 1-81 6a364 364 0 01157-51zm117 29c33 0 66 25 72 58 3 12 3 28-8 35-3 2-6 4-8 1-8-12-12-27-23-37-3-7-12-8-19-9-13-2-26 0-39-4 7-7 6-17 4-25l-3-16 24-3zm-372 92l46 2c18 2 33 16 34 34 1 7 1 17-6 21-6 0-12-4-18-6-21-8-46-14-67-3-6 2-11 9-17 5-10-4-18-14-30-12-30 1-56 21-77 42-16 17-30 37-43 56 0-39 17-80 49-104 26-22 61-30 94-34l35-1z")
      w-alert.message-box.ml-1(border-left color="pale-blue")
        .text-bold
          | Do you need a super flexible Vue UI framework by the same awesome author? 🤭#[br]
          | Checkout
          a.title3.ml3.w-flex.d-iflex.align-center(
            href="https://antoniandre.github.io/wave-ui"
            target="_blank"
            style="color: #1471b8")
            strong Wave UI
            w-icon.ml2(sm) mdi mdi-open-in-new
          div
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TopBar from '@/documentation/components/top-bar.vue'
import Hero from './hero.vue'

defineProps({
  offsetTop: { type: Number }
})

const ready = ref(false)
const navItems = ref([
  { title: 'Getting Started', path: '/getting-started' },
  { title: 'API', path: '/api' },
  { title: 'Date Prototypes', path: '/date-prototypes' },
  { title: 'Examples', path: '/examples' },
  { title: 'Migration Guide', path: '/migration-guide' },
  { title: 'Road Map', path: '/road-map' },
  { title: 'Release Notes', path: '/release-notes' }
])

onMounted(() => setTimeout(() => (ready.value = true), 300))
</script>

<style lang="scss">
.page--home {
  flex-direction: column;
  padding-top: 8rem;
  overflow: hidden;

  .hero {margin-top: 8rem;}

  aside, nav {padding-top: 0;}
  aside nav {position: static;}
  main {padding-top: 0;}

  .pale-blue {color: #1471b8;}

  .get-started-cta {
    margin-bottom: 4rem;

    .cta-wrap {
      max-width: 800px;
      padding: 4rem 3rem;
      border-radius: 12px;
      background: linear-gradient(135deg, rgba(66, 184, 131, 0.1) 0%, rgba(20, 113, 184, 0.1) 100%);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
      text-align: center;
    }

    .subtitle {
      font-size: 1.2rem;
      opacity: 0.8;
      max-width: 520px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-button {
      font-size: 1.1rem;
      text-transform: uppercase;
      padding: 1.5rem 2rem;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

      [data-theme="light"] & {background: #fff;}
      [data-theme="light"] &:hover:before {display: none;}

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      }
    }
  }
}

// Media queries.
// --------------------------------------------------------
@media screen and (max-width: 499px) {
  .page--home {
    .announcement {
      margin-bottom: 16px;

      > .w-icon {
        font-size: 35px;
        width: 1em;
        margin-right: 2px;
      }
      > svg {
        font-size: 35px;
        width: 0.9em;
        margin-right: 8px;
      }

      &--github {
        > .w-icon {margin-right: 6px;font-size: 30px;}
        a {font-size: 14px;}
      }
    }
  }
}
</style>
