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
    .w-flex.wrap.gap3.justify-end.my2
      span Views:
      w-checkboxes(v-model="exViews.enabledViews" :items="exViews.views" inline round)
  template(#code-html).
    &lt;vue-cal view="month" :views="['{{ exViews.enabledViews.join('\', \'') }}']" /&gt;

  vue-cal.ex--disable-views(
    :dark="store.darkMode"
    view="month"
    :views="exViews.enabledViews")

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
    p.
      But if you prefer to do your own styles from scratch, you can disable the default theme: it will
      only set the critical layout styles.
    .w-flex.wrap.gap3.mt2
      w-switch(
        v-model="exThemes.default"
        @update:model-value="exThemes.onDefaultThemeSwitch") Default Theme
      w-switch(v-model="exThemes.dark" :disabled="!exThemes.default") Dark Mode
      .mla.w-flex.align-center
        w-switch.mr1(
          v-model="exThemes.pickColorSwitch"
          @update:model-value="exThemes.onColorPickSwitch"
          :disabled="!exThemes.default")
        .w-flex.align-center(:class="{ disabled: !exThemes.default || !exThemes.pickColorSwitch }")
          .primary Or even pick a color!
          input.ml2(
            @input="e => exThemes.setThemeColor(e.target.value, true)"
            v-model="exThemes.color"
            type="color")

  template(#code-html).
    &lt;vue-cal{{ exThemes.default ? '' : ' :theme="false"' }}{{ exThemes.dark && exThemes.default ? ' dark' : '' }} /&gt;

  template(#code-css v-if="exThemes.pickColorSwitch").
    .vuecal {
      --vuecal-primary-color: {{ exThemes.color }};
    }
  vue-cal.mxa(
    ref="vuecalEl"
    :theme="exThemes.default && 'default'"
    :dark="exThemes.dark")

//- Example.
example(title="Internationalization" anchor="internationalization")
  template(#desc)
    p.
      Translate your calendar in any of the {{ exI18n.locales.length }} existing locales.#[br]
      You can raise a PR if you don't find the locale translation you want in this list.
    .text-right
      .w-flex.no-grow.align-center.justify-end
        w-icon.mr2.caption(sm) mdi mdi-translate
        span.mr2 Locale:
        w-select.no-grow(
          v-model="exI18n.locale"
          :items="exI18n.locales"
          item-value-key="code"
          style="max-width: 200px"
          :menu-props="{ alignRight: true }")
          template(#selection="{ item }")
            span.mr2 {{ item.label }}
            w-tag.code.ma0(round sm) {{ item.code }}
          template(#item="{ item }")
            span.mr2 {{ item.label }}
            w-tag.code.ma0(round sm) {{ item.code }}
      .w-flex.no-grow.align-center.justify-end.mt2
        w-icon.mr2.caption(sm) mdi mdi-clock-outline
        span.mr2 Request:
        w-radios(
          v-model="exI18n.preload"
          :items="[{ value: 'preload', label: 'Preload' }, { value: '', label: 'On the Fly' }]"
          inline)

  template(#code-html).
    &lt;vue-cal locale="{{ exI18n.locale }}" /&gt;
  template(#code-js v-if="exI18n.preload").
    import { VueCal, useLocale } from '@/vue-cal'
    import Translations from '@/vue-cal/i18n/{{ exI18n.locale }}.json'

    useLocale(Translations)
  alert(v-if="exI18n.preload")
    | When preloading, the locale is loaded upfront, so we don't need to preload the default English
    | locale first. No big deal, but:
    ul
      li Saves 1 request of less than ~1kb
      li.
        Can potentially avoid a blink of texts while switching locales when Vue Cal renders and
        your locale file is not yet loaded.

  vue-cal(
    :locale="exI18n.locale"
    @ready="exI18n.updateDateTexts"
    :dark="store.darkMode")

  template(#desc2)
    .w-flex.justify-end.mt1
      a(href="https://codepen.io/antoniandre/pen/dxXvwv" target="_blank")
        | Try it in Codepen
        w-icon.ml1(sm) mdi mdi-open-in-new

//- Example.
example(title="CSS Control" anchor="css-variables")
  template(#desc)
    p When you're using the default theme, a few CSS variables will help you easily customize the calendar.
  template(#code-css).
    --vuecal-primary-color: #1976D2;
    --vuecal-secondary-color: #fff;
    --vuecal-base-color: #000;
    --vuecal-contrast-color: #fff;
    --vuecal-border-color: color-mix(in srgb, var(--vuecal-base-color) 8%, transparent);
    --vuecal-header-color: var(--vuecal-secondary-color);
    --vuecal-events-color: var(--vuecal-contrast-color);
    --vuecal-events-border-color: currentColor;
    --vuecal-border-radius: 6px;
    --vuecal-height: 500px;
    --vuecal-min-schedule-width: 0;
    --vuecal-min-cell-width: 1em;
</template>

<script setup>
import { inject, reactive, ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'

const store = useAppStore()

const exLayouts = ref({
  size: 'normal'
})

const exViews = reactive({
  views: [{ value: 'day', label: 'Day' }, { value: 'days', label: 'Days' }, { value: 'month', label: 'Month' }, { value: 'year', label: 'Year' }, { value: 'years', label: 'Years' }],
  enabledViews: ref(['day', 'month'])
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
  pickColorSwitch: ref(false),
  defaultColor: ref(store.darkMode ? '#316191' : '#1976d2'),
  color: ref(store.darkMode ? '#316191' : '#1976d2'),
  setThemeColor: (color, switchOn = false) => {
    vuecalEl.value.$el.style.setProperty('--vuecal-primary-color', color)
    if (switchOn) exThemes.pickColorSwitch = true
  },
  onDefaultThemeSwitch: bool => {
    if (bool) {
      exThemes.setThemeColor(exThemes.defaultColor)
    }
    else {
      exThemes.setThemeColor(exThemes.defaultColor)
      exThemes.pickColorSwitch = false
    }
  },
  onColorPickSwitch: () => {
    // if (!exThemes.pickColorSwitch) exThemes.color = exThemes.defaultColor
    exThemes.setThemeColor(exThemes.pickColorSwitch ? exThemes.color : exThemes.defaultColor)
  }
})
const vuecalEl = ref(null)

const exI18n = reactive({
  locales: inject('locales'),
  locale: ref('zh-cn'),
  preload: ref(''),
  updateDateTexts: () => {
    // In Vue Cal documentation Chinese texts are loaded last.
    // Override Date texts with english for prototype formatting functions.
    setTimeout(vuecalEl.value.updateTexts, 3000)
  }
})
</script>

<style lang="scss" scoped>
.example--themes .disabled input {opacity: 0.5;}
</style>
