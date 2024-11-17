<template lang="pug">
//- Example.
example(title="Layouts" anchor="layouts")
  template(#desc)
    p Let's first present the different layouts. Toggle the options and view the updated code and result.
    .w-flex.wrap.gap3.my2
      w-radios(
        v-model="exLayouts.size"
        :items="[{ label: 'normal'}, { label: 'sm'}, { label: 'xs'}, { label: 'datePicker' }]"
        inline)
      p #[code datePicker] is a shorthand for xs: true, views: [month, year, years], clickToNavigate: true.
  template(#code-html).
    &lt;vue-cal{{ exLayouts.size === 'sm' ? ' sm' : '' }}{{ exLayouts.size === 'xs' ? ' xs' : '' }}{{ exLayouts.size === 'datePicker' ? ' date-picker' : '' }} /&gt;
  vue-cal.mxa(v-bind="{ [exLayouts.size]: true }" :dark="store.darkMode")

//- Example.
example(title="Views" anchor="views")
  template(#desc)
    p.
      To specify which view should be available, you can use the #[code views] option and provide an
      array of strings.#[br]
      To set a view by default, use the #[code view] option and provide a string.
      By default all the views are visible and the default active view is the #[code week] view.

  template(#code-html).
    &lt;vue-cal view="month" :views="['day', 'month']" /&gt;

  vue-cal.ex--disable-views(
    :dark="store.darkMode"
    :time="false"
    view="month"
    :views="['day', 'month']"
    style="height: 350px")

//- Example.
example(title="Hide Elements & Toggles" anchor="hide-elements")
  template(#desc)
    p.caption Toggle options and view the updated code and result.
    .w-flex.wrap.gap3.my2
      w-switch(v-model="exHideElements.todayButton") Show Today Button
      w-switch(v-model="exHideElements.viewsBar") Show Views Bar
      w-switch(v-model="exHideElements.titleBar") Show Title bar
    .w-flex.wrap.gap3.my2
      w-switch(v-model="exHideElements.startOnSunday") Start week on Sunday
      w-switch(v-model="exHideElements.hideWeekends") Hide weekends
      w-switch(v-model="exHideElements.time") Time
  template(#code-html).
    &lt;vue-cal{{ exHideElements.todayButton ? '' : '\n  :today-button="false"' }}{{ exHideElements.viewsBar ? '' : '\n  :views-bar="false"' }}{{ exHideElements.titleBar ? '' : '\n  :title-bar="false"' }}{{ exHideElements.time ? '' : '\n  :time="false"' }}{{ exHideElements.hideWeekends ? '\n  hide-weekends' : '' }}{{ exHideElements.startOnSunday ? '\n  start-week-on-sunday' : '' }} /&gt;
  vue-cal.mxa(
    :views-bar="exHideElements.viewsBar"
    :today-button="exHideElements.todayButton"
    :title-bar="exHideElements.titleBar"
    :time="exHideElements.time"
    :hide-weekends="exHideElements.hideWeekends"
    :start-week-on-sunday="exHideElements.startOnSunday"
    :dark="store.darkMode")

//- Example.
example(title="Themes" anchor="themes")
  template(#desc)
    p.
      You have already seen the default theme. It comes with a bunch of CSS rules and variables that
      you can easily override, and it also offers a light and dark mode.
    p But if you prefer to do your own styles from scratch, you can disable the default theme.
    .w-flex.wrap.gap3.mt2
      w-switch(v-model="exThemes.default") Default Theme
      w-switch(v-model="exThemes.dark" :disabled="!exThemes.default") Dark Mode
  template(#code-html).
    &lt;vue-cal{{ exThemes.default ? '' : ' :theme="false"' }}{{ exThemes.dark && exThemes.default ? ' dark' : '' }} /&gt;
  vue-cal.mxa(
    ref="vuecalEl"
    :theme="exThemes.default && 'default'"
    :dark="exThemes.dark")
  template(#desc2)
    .mt2
      | You can change the whole color theme by only setting the #[code --vuecal-primary-color] CSS variable.#[br]
      | Look, pick your favorite color:
      input.ml1(
        @input="e => exThemes.setThemeColor(e.target.value)"
        :value="store.darkMode ? '#316191' : '#1976d2'"
        type="color" )
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'
import ViewExamples from './view.vue'

const store = useAppStore()

const exLayouts = ref({
  size: 'normal'
})

const exHideElements = ref({
  todayButton: true,
  viewsBar: true,
  titleBar: true,
  startOnSunday: false,
  hideWeekends: false,
  time: true
})

const exThemes = reactive({
  default: true,
  dark: store.darkMode,
  setThemeColor: color => {
    vuecalEl.value.$el.style.setProperty('--vuecal-primary-color', color)
  }
})
const vuecalEl = ref(null)
</script>

<style lang="scss" scoped>
.example .vuecal:not(.vuecal--date-picker) {height: 300px;}
</style>
