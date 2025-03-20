<template lang="pug">
h1.title1 Getting Started

//- Installation
title-link(h2 anchor="installation") Installation
p.mt2 You have 2 options: using #[strong NPM] or #[strong.code &lt;script&gt;] tag.
ul.ml4
  li
    h3.mt4 Via NPM
    p Vue Cal is currently available as a pre-release version, so you need to install it from the next tag.
    .w-flex.align-center.mt2.xs-column.xs-align-start
      ssh-pre.my0(language="shell" :dark="store.darkMode") npm i vue-cal@next

    p.mt6.mb3 Then import Vue Cal in your Vue component and use it.
    .w-flex.gap6.smd-column.wrap
      w-tabs.w-flex.column.bdrs2(:items="2" content-class="pa0 fill-height")
        template(#item-title.1) Composition API
        template(#item-content.1)
          ssh-pre.fill-height.ma0.bd0(language="js" :dark="store.darkMode").
            import { VueCal } from 'vue-cal'
            import 'vue-cal/style'

        template(#item-title.2) Options API
        template(#item-content.2)
          ssh-pre.fill-height.ma0.bd0(language="js" :dark="store.darkMode").
            import { VueCal } from 'vue-cal'
            import 'vue-cal/style'

            export default {
              components: { VueCal },
              ...
            }

      .highlight-box.grow
        .title2 Demos on StackBlitz
        p.body.mb4.grey Check the different setups for bundlers
        .w-flex.align-center
          w-icon.ml3.mr2.bolt(color="grey-light2" size="3.2rem") mdi mdi-lightning-bolt
          ul.no-bullet
            li
              w-icon wi-chevron-right
              a(href="https://stackblitz.com/edit/vuecal5?file=src%2FApp.vue" target="_blank")
                | Vue Cal #[strong 5] (Vue 3 + Vite)
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
            li
              w-icon wi-chevron-right
              a(href="https://stackblitz.com/edit/vuecal5-events?file=src/App.vue" target="_blank")
                | Vue Cal #[strong 5] with Events (Vue 3 + Vite)
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
            li
              w-icon wi-chevron-right
              a(href="https://stackblitz.com/edit/vuecal5-events-fetching?file=src/App.vue" target="_blank")
                | Fetching Events from a Backend
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
            li
              w-icon wi-chevron-right
              a(href="https://stackblitz.com/edit/vuecal5-nuxt?file=pages/index.vue" target="_blank")
                | Vue Cal + Nuxt 3 - Full SSR support
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
            li
              w-divider.my4
            li
              w-icon wi-chevron-right
              a(href="https://stackblitz.com/edit/vuecal-vuecli?file=src%2FApp.vue" target="_blank")
                | Vue Cal #[strong 4] + Vue 3 + Vue CLI
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
            li
              w-icon wi-chevron-right
              a(href="https://stackblitz.com/edit/vuecal-vite?file=src%2FApp.vue" target="_blank")
                | Vue Cal #[strong 4] + Vue 3 + Vite
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
            li
              w-icon wi-chevron-right
              a(href="https://stackblitz.com/edit/vuecal-vite-composition-api?file=src%2FApp.vue" target="_blank")
                | Vue Cal #[strong 4] + Vue 3 &amp; composition API + Vite
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new

            li
              w-icon wi-chevron-right
              a(href="https://stackblitz.com/edit/vuecal-vue2?file=src%2FApp.vue" target="_blank")
                | Vue Cal #[strong 4] + Vue 2 + Vue CLI
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new

  li.mt8
    h3.mt4 Or via #[span.code &lt;script&gt;] tag
    .title5.mt3.mb1 Currently Deprecated
    p.mb4 This method is currently deprecated, but support may be added for users who need it.
    //- p Include the Vue Cal script in your document #[span.code &lt;head&gt;] as follows:
    //- w-tabs.my4(:items="2" content-class="pa0")
      template(#item-title.1) Vue 3
      template(#item-content.1)
        ssh-pre.ma0(language="html" :dark="store.darkMode").
          &lt;head&gt;
            ...
            &lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
            &lt;script src="https://unpkg.com/vue-cal"&gt;&lt;/script&gt;
            &lt;link href="https://unpkg.com/vue-cal/dist/vuecal.css" rel="stylesheet"&gt;
          &lt;/head&gt;

      template(#item-title.2) Vue 2
      template(#item-content.2)
        ssh-pre.ma0(language="html" :dark="store.darkMode").
          &lt;head&gt;
            ...
            &lt;script src="https://unpkg.com/vue@legacy"&gt;&lt;/script&gt;
            &lt;script src="https://unpkg.com/vue-cal@legacy"&gt;&lt;/script&gt;
            &lt;link href="https://unpkg.com/vue-cal@legacy/dist/vuecal.css" rel="stylesheet"&gt;
          &lt;/head&gt;

    //- p.
      Then define the component to use in your template if you are not using the Vue composition
      API:
    //- .w-flex.gap6.smd-column.wrap.mt4
      ssh-pre.grow.ma0.pa3.bdrs2(language="js" :dark="store.darkMode").
        // In your Vue.js component.
        export default {
          components: { VueCal: vuecal },
          ...
        }
      .highlight-box.grow
        .title2 Demos on Codepen
        p.body.mb4.grey Check the different setups for direct browser use
        .w-flex.align-center
          w-icon.ml3.mr2.bolt.pa6(color="grey-light2" size="2.8em") mdi mdi-codepen
          ul.no-bullet
            li
              w-icon.mr2 wi-chevron-right
              a.ml1(href="https://codepen.io/antoniandre/pen/XWEgLxg?editors=1010" target="_blank")
                | Vue Cal + Vue 3 (IIFE build)
                w-icon.ml2(sm style="margin-top: -2px") mdi mdi-open-in-new
            li
              w-icon.mr2 wi-chevron-right
              a.ml1(href="https://codepen.io/antoniandre/pen/pGJWjL" target="_blank")
                | Vue Cal + Vue 2 (UMD build)
                w-icon.ml1(sm style="margin-top: -2px") mdi mdi-open-in-new

title-link(h2 anchor="how-to-use") How to Use
p Once you've imported the Vue Cal component, it's super simple. In your template just use:
ssh-pre.my2(language="html-vue" :dark="store.darkMode").
  &lt;vue-cal ... /&gt;
p.
  Without any options, Vue Cal will not do much things for you apart from being a calendar.
  You may choose to provide options:
.w-flex.gap4.smd-column
  div
    p &bull; As direct props like this:
    ssh-pre.my2.ml3.pt4(language="html-vue" :dark="store.darkMode").
      &lt;vue-cal hide-weekends time ... /&gt;
  div
    p &bull; Or bind all the props via v-bind like this:
    ssh-pre.my2.ml3(language="html-vue" :dark="store.darkMode").
      &lt;vue-cal v-bind="config" /&gt;

      const config = {
        hideWeekends: true,
        time: true
        ...
      }

alert
  .title3 That's it! You're up and running.
  p.mt1 Vue Cal comes with a default height of 500px, you can override this via CSS.

vue-cal(small :dark="store.darkMode")

//- CSS notes.
title-link(h2 anchor="css-notes") CSS Notes
p You can easily change the calendar design with CSS.

p.mt1 Vue Cal comes with default styles scoped in the #[code vuecal--default-theme] class (which is used by default) and a height of 500px, you can override this via CSS.


title-link.mt6(h3 anchor="themes") Themes
p.
  Currently 2 color themes (light &amp; dark) are available.#[br]
  Setting the #[code dark] prop to #[code true] will switch to dark mode, while the light mode is the default.
p.
  By default, the calendar is blue, but you can easily change the primary color with the CSS variables.#[br]
  If you'd rather start the CSS from a clean cheat, you can decide to not use the default theme and do
  everything yourself in your own CSS.#[br]
  Checkout the #[router-link(to="examples/view#ex--themes") Themes Example] for a demo.

title-link.mt6(h3 anchor="css-variables") CSS Variables
p.
  Vue Cal uses CSS variables for easy customization.#[br]
  Checkout the #[router-link(to="examples/view#ex--css-variables") CSS Control Example] for a demo.
</template>

<script setup>
import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'

const store = useAppStore()
</script>

<style lang="scss">
.main--getting-started {
  .w-tabs__content-wrap {flex-grow: 1;}
}
</style>
