<template lang="pug">
//- Example.
example(title="Today's current time" anchor="today-current-time")
  template(#desc)
    p.
      When you choose to show the time in vue-cal, the current time of today's date will
      be marked with a line (scroll to the current time to see it).#[br]
      The line position will be updated every time the calendar current view is re-rendered (by interacting).#[br]
      You can easily customize the now-line as you wish via CSS.
      Changing the line and arrow color is as easy as:
    ssh-pre.mt6(language="css" label="CSS" :dark="store.darkMode") .vuecal__now-line {border-color: #06c;}
    p.mt4.
      If you don't want this feature you can simply hide it: #[span.code .vuecal__now-line {display: none}].#[br]
      This feature has no impact on performance.
    p.
      If you want the now line to keep accurate position even while your calendar is idle, you can use the option
      #[span.code watchRealTime] (see more in the #[a(href="#api") API] section).
  template(#code-html).
    &lt;vue-cal xs view="day" :disable-views="['years', 'year', 'month']" /&gt;

  vue-cal(
    :time-cell-height="26"
    view="day"
    :views="['day']"
    :views-bar="false"
    :today-button="false"
    @ready="$event.view && $event.view.scrollToCurrentTime"
    :dark="store.darkMode"
    xs)

//- Example.
example(title="Scroll the View to a Particular Time" anchor="scroll-to-time")
  template(#desc)
    p.mb0.
      It is quite easy to scroll the calendar view to a particular time from outside of Vue Cal.
    w-button.mt2.mr2(@click="exScrollToTime.scrollToCurrentTime")
      w-icon mdi mdi-format-vertical-align-bottom
      | Scroll to current time
    w-button.mt2.mr2(@click="exScrollToTime.scrollTop")
      w-icon mdi mdi-format-vertical-align-top
      | Scroll top
    w-button.mt2.mr2(@click="exScrollToTime.scrollToTime(12 * 60)")
      w-icon mdi mdi-format-vertical-align-center
      | Scroll to 12:00
  template(#desc2)
    vue-cal.ex--scroll-to-time(
      :dark="store.darkMode"
      view="day"
      :views="['day']"
      :views-bar="false"
      :today-button="false"
      :time-cell-height="exScrollToTime.timeCellHeight"
      @ready="exScrollToTime.onReady"
      xs)
    ssh-pre(language="html-vue" :dark="store.darkMode").
      &lt;vue-cal @ready="scrollToCurrentTime"&gt;
      &lt;/vue-cal&gt;

//- Example.
example(title="Timeline Tweaking" anchor="timeline-tweaking")
  template(#desc)
    p.mb0.
      If you want to have more fancy time cells, you can override them with the
      #[span.code time-cell-height] option (in pixels) and scoped slots.#[br]
      For even more flexibility, the horizontal lines are painted when you set the CSS class #[span.code line] on the tag you choose.
      So if you don't set this class you are free to paint the lines yourself or not.
  template(#code-html).
    &lt;vue-cal
      :time-from="5 * 60"
      :time-step="15"
      :time-cell-height="18"
      :disable-views="['years', 'year', 'month']"
      hide-weekends&gt;
      &lt;template #time-cell="{ hours, minutes }"&gt;
        &lt;div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }"&gt;
          &lt;strong v-if="!minutes" style="font-size: 15px"&gt;{{ '\{\{ hours \}\}' }}&lt;/strong&gt;
          &lt;span v-else style="font-size: 11px"&gt;{{ '\{\{ minutes \}\}' }}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;
  template(#code-css).
    .vuecal__time-cell-line.hours:before {border-color: #42b983;}
  template(#desc2)
    highlight-message.mt6(type="tips").
      If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
      #[a(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank") vuejs.org/guide/components/slots.htm #[w-icon(color="primary") mdi mdi-open-in-new]]

  vue-cal(
    :dark="store.darkMode"
    sm
    :time-from="5 * 60"
    :time-step="15"
    :time-cell-height="18"
    view="day"
    :disable-views="['years', 'year', 'month']"
    style="width: 360px;height: 360px;max-width: 100%"
    hide-weekends)
    template(#time-cell="{ hours, minutes }")
      .vuecal__time-cell-line(:class="{ hours: !minutes }")
        strong.primary(v-if="!minutes" style="font-size: 15px;line-height: 18px") {{ hours }}
        span(v-else style="font-size: 11px;line-height: 18px") {{ minutes }}


//- Example.
//- example(title="" anchor="")
  template(#desc)
  template(#code-html).
    &lt;vue-cal{{}} /&gt;
  vue-cal()
</template>

<script setup>
import { reactive, ref } from 'vue'
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'
import Example from '@/documentation/components/example.vue'
import HighlightMessage from '@/documentation/components/highlight-message.vue'
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

const exScrollToTime = reactive({
  timeCellHeight: 26,
  scrollTop: null,
  scrollToTime: null,
  scrollToCurrentTime: null,
  onReady: ({ view }) => {
    exScrollToTime.scrollTop = view.scrollTop
    exScrollToTime.scrollToTime = view.scrollToTime
    exScrollToTime.scrollToCurrentTime = view.scrollToCurrentTime
    view.scrollToCurrentTime()
  }
})
</script>

<style lang="scss">
// Today-current-time example.
.example--today-current-time {
  .vuecal__now-line {border-color: #06c;}
}
</style>

<style lang="scss" scoped>
.example .vuecal:not(.vuecal--date-picker) {height: 300px;}
</style>
