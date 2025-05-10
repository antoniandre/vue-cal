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

  vue-cal(
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
      w-switch(v-model="exHideElements.hideWeekends") Hide Weekends
      w-switch(v-model="exHideElements.time") Time
      w-tooltip
        template(#activator="{ on }")
          .d-iflex(@mouseenter="on.mouseenter" @mouseleave="on.mouseleave")
            w-switch(v-model="exHideElements.timeAtCursor") Time At Cursor
        | Show the time at the cursor on hover on day, days and month views.
      w-tooltip(align-left)
        template(#activator="{ on }")
          .d-iflex(@mouseenter="on.mouseenter" @mouseleave="on.mouseleave")
            w-switch.mr3(v-model="exHideElements.weekNumbers") Show Week Numbers
        | Visible on month view

  template(#code-html).
    &lt;vue-cal{{ exHideElements.todayButton ? '' : '\n  :today-button="false"' }}{{ exHideElements.viewsBar ? '' : '\n  :views-bar="false"' }}{{ exHideElements.titleBar ? '' : '\n  :title-bar="false"' }}{{ exHideElements.time ? '' : '\n  :time="false"' }}{{ exHideElements.timeAtCursor ? '\n  time-at-cursor' : '' }}{{ exHideElements.hideWeekends ? '\n  hide-weekends' : '' }}{{ exHideElements.startOnSunday ? '\n  start-week-on-sunday' : '' }}{{ exHideElements.weekNumbers ? '\n  week-numbers' : '' }} /&gt;
  vue-cal.mxa(
    :views-bar="exHideElements.viewsBar"
    :today-button="exHideElements.todayButton"
    :title-bar="exHideElements.titleBar"
    :time="exHideElements.time"
    :time-at-cursor="exHideElements.timeAtCursor"
    :hide-weekends="exHideElements.hideWeekends"
    :start-week-on-sunday="exHideElements.startOnSunday"
    :week-numbers="exHideElements.weekNumbers"
    :dark="store.darkMode")

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
    import Translations from '@/vue-cal/i18n/{{ exI18n.locale }}'

    useLocale(Translations)
  alert(v-if="exI18n.preload")
    | When preloading, the locale is loaded upfront. No big deal, but it:
    ul
      li Saves 1 request of less than ~1kb
      li.
        Can potentially avoid a blink of texts if Vue Cal renders before the locale file is loaded.

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
example(title="CSS Control" anchor="css-variables")
  template(#desc)
    p.
      When you're using the default theme, a few CSS variables will help you easily customize the
      calendar, while the rest of the styles remain easy to override.
    p.mt2.
      In the following code, #[strong you can directly edit the values] of the CSS variables used by
      Vue Cal and view the result in real-time.

    .ssh-pre.ssh-pre--custom(:class="{ 'ssh-pre--dark': store.darkMode }" data-type="css")
      pre.ssh-pre__content
        span.selector .vuecal
        span.punctuation.ml1 {
        .ml4(v-for="variable in exCssControl.variables")
          span.variable {{ variable.name }}
          span.punctuation :
          input.ml2.number(
            v-if="variable.type === 'number'"
            v-model="variable.value"
            type="number"
            step="5"
            min="0")
          span.unit {{ variable.unit || '' }}
          .color-picker.ml2(v-if="variable.type === 'color'")
            input(
              @input="e => variable.value = e.target.value"
              :value="isHexColor(variable.value) ? variable.value : '#000000'"
              type="color")
            ssh-pre.ma0.pa0.d-iflex(:dark="store.darkMode" language="css")
              | {{ variable.value }}{{ variable.unit || '' }}
          span.punctuation ;
        span.punctuation }

  template(#code-html) &lt;vue-cal /&gt;
  vue-cal(
    @ready="({ view }) => view.scrollToCurrentTime()"
    :events="exCssControl.events"
    :dark="store.darkMode"
    :style="exCssControl.style")
</template>

<script setup>
import { computed, inject, reactive, ref, onMounted } from 'vue'
import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'

const store = useAppStore()

// Simplified hex color check and conversion
const isHexColor = val => typeof val === 'string' && /^#([0-9A-F]{3}){1,2}$/i.test(val)
const formatHex = hex => {
  if (!isHexColor(hex)) return hex
  return hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex
}

const exLayouts = ref({
  size: 'normal'
})

const exViews = reactive({
  views: [{ value: 'day', label: 'Day' }, { value: 'days', label: 'Days' }, { value: 'month', label: 'Month' }, { value: 'year', label: 'Year' }, { value: 'years', label: 'Years' }],
  enabledViews: ref(['day', 'month'])
})

const exHideElements = reactive({
  todayButton: ref(true),
  viewsBar: ref(true),
  titleBar: ref(true),
  startOnSunday: ref(false),
  hideWeekends: ref(false),
  time: ref(true),
  timeAtCursor: ref(false),
  weekNumbers: ref(false)
})

const defaultColor = formatHex(store.darkMode ? '#316191' : '#1976d2')
const exThemes = reactive({
  default: true,
  dark: store.darkMode,
  pickColorSwitch: ref(false),
  defaultColor,
  color: defaultColor,
  setThemeColor: (color, switchOn = false) => {
    vuecalEl.value?.$el?.style.setProperty('--vuecal-primary-color', color)
    if (switchOn) exThemes.pickColorSwitch = true
  },
  onDefaultThemeSwitch: bool => {
    exThemes.setThemeColor(exThemes.defaultColor)
    if (!bool) exThemes.pickColorSwitch = false
  },
  onColorPickSwitch: () => {
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

const exCssControl = reactive({
  events: [
    { start: new Date(), end: new Date().addHours(1), title: 'Event 1' },
    { start: new Date().addDays(1).addHours(1), end: new Date().addDays(1).addHours(2), title: 'Event 2' }
  ],
  variables: [
    { name: '--vuecal-primary-color', value: store.darkMode ? '#316191' : '#1976d2', type: 'color' },
    { name: '--vuecal-secondary-color', value: store.darkMode ? '#2e2e2e' : '#ffffff', type: 'color' },
    { name: '--vuecal-base-color', value: store.darkMode ? '#ffffff' : '#000000', type: 'color' },
    { name: '--vuecal-contrast-color', value: store.darkMode ? '#000000' : '#ffffff', type: 'color' },
    { name: '--vuecal-border-color', value: 'color-mix(in srgb, var(--vuecal-base-color) 8%, transparent)', type: 'color' },
    { name: '--vuecal-header-color', value: store.darkMode ? 'var(--vuecal-base-color)' : 'var(--vuecal-secondary-color)', type: 'color' },
    { name: '--vuecal-event-color', value: store.darkMode ? 'var(--vuecal-base-color)' : 'var(--vuecal-contrast-color)', type: 'color' },
    { name: '--vuecal-event-border-color', value: 'currentColor', type: 'color' },
    { name: '--vuecal-border-radius', value: 6, type: 'number', unit: 'px' },
    { name: '--vuecal-height', value: 500, type: 'number', unit: 'px' },
    { name: '--vuecal-min-schedule-width', value: 0, type: 'number', unit: 'px' },
    { name: '--vuecal-min-cell-width', value: 0, type: 'number', unit: 'px' },
    { name: '--vuecal-transition-duration', value: 0.25, type: 'number', unit: 's' }
  ],
  style: computed(() => exCssControl.variables.map(v => `${v.name}: ${v.value}${v.unit || ''};`).join('\n'))
})

// Initialize theme color.
onMounted(() => exThemes.setThemeColor(exThemes.color))
</script>

<style lang="scss" scoped>
.example--css-variables {
  div.vuecal:not(.vuecal--date-picker) {height: var(--vuecal-height);}
  .color-picker {
    position: relative;
    display: inline-flex;

    input {
      position: absolute;
      inset: 0;
      z-index: 1;
      opacity: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  input[type="number"] {
    background-color: color-mix(in srgb, var(--w-contrast-bg-color) 10%, transparent);
    border: 1px solid color-mix(in srgb, var(--w-contrast-bg-color) 8%, transparent);
    border-radius: 4px;
    max-width: 45px;
    padding: 1px 1px 1px 3px;
  }
  .ssh-pre--custom .ssh-pre:before {display: none;}
}
</style>
