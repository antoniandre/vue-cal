<template lang="pug">
//- Example.
example(title="Scroll the View to a Particular Time" anchor="scroll-to-time")
  template(#desc)
    p.mb0.
      It is quite easy to scroll the calendar view to a particular time from outside of Vue Cal.
    w-button.mt2.mr2(@click="scrollToCurrentTime('.ex--scroll-to-time')")
      w-icon mdi mdi-format-vertical-align-bottom
      | Scroll to current time
    w-button.mt2.mr2(@click="scrollToTop('.ex--scroll-to-time')")
      w-icon mdi mdi-format-vertical-align-top
      | Scroll top
  template(#code-html).
    &lt;vue-cal
      id="vuecal"
      :time-cell-height="timeCellHeight"
      @ready="scrollToCurrentTime"&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
    // `timeCellHeight` is set to 26 in the component data.
    scrollToCurrentTime () {
      const calendar = document.querySelector('#vuecal .vuecal__bg')
      const hours = this.now.getHours() + this.now.getMinutes() / 60
      calendar.scrollTo({ top: hours * this.timeCellHeight, behavior: 'smooth' })
    },
    scrollToTop () {
      const calendar = document.querySelector('#vuecal .vuecal__bg')
      calendar.scrollTo({ top: 0, behavior: 'smooth' })
    }
  template(#desc2)
      vue-cal.ex--scroll-to-time(
        :dark="store.darkMode"
        small
        view="day"
        :disable-views="['years', 'year', 'month', 'week']"
        :views-bar="false"
        :time-cell-height="timeCellHeight"
        @ready="scrollToCurrentTime('.ex--scroll-to-time')"
        style="width: 360px;height: 360px;max-width: 100%")

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
      small
      :time-from="5 * 60"
      :time-step="15"
      :time-cell-height="18"
      view="day"
      :disable-views="['years', 'year', 'month']"
      hide-weekends&gt;
      &lt;template #time-cell="{ hours, minutes }"&gt;
        &lt;div :class="{ 'vuecal__time-cell-line': true, hours: !minutes }"&gt;
          &lt;strong v-if="!minutes" style="font-size: 15px"&gt;{{ '\{\{ hours \}\}' }}&lt;/strong&gt;
          &lt;span v-else style="font-size: 11px"&gt;{{ '\{\{ minutes \}\}' }}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;
  template(#desc2)
    highlight-message.mt6(type="tips").
      If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
      #[a(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank") vuejs.org/guide/components/slots.htm #[w-icon(color="primary") mdi mdi-open-in-new]]

    ssh-pre.mt6(language="css" label="CSS" :dark="store.darkMode").
      .vuecal__time-cell-line.hours:before {border-color: #42b983;}

  vue-cal(
    style="width: 360px;height: 360px;max-width: 100%"
    :dark="store.darkMode"
    small
    :time-from="5 * 60"
    :time-step="15"
    :time-cell-height="18"
    view="day"
    :disable-views="['years', 'year', 'month']"
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

//- Example.
//- example(title="" anchor="")
  template(#desc)
  template(#code-html).
    &lt;vue-cal{{}} /&gt;
  vue-cal()

//- Example.
//- example(title="" anchor="")
  template(#desc)
  template(#code-html).
    &lt;vue-cal{{}} /&gt;
  vue-cal()

//- Example.
//- example(title="" anchor="")
  template(#desc)
  template(#code-html).
    &lt;vue-cal{{}} /&gt;
  vue-cal()

//- Example.
//- example(title="" anchor="")
  template(#desc)
  template(#code-html).
    &lt;vue-cal{{}} /&gt;
  vue-cal()

//- Example.
//- example(title="" anchor="")
  template(#desc)
  template(#code-html).
    &lt;vue-cal{{}} /&gt;
  vue-cal()
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAppStore } from '@/store'
import 'simple-syntax-highlighter/dist/sshpre.css'
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
</script>

<style lang="scss" scoped>
.example .vuecal:not(.vuecal--date-picker) {height: 300px;}
</style>
