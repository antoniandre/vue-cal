<template lang="pug">
//- Example.
example(title="Timeline" anchor="timeline")
  template(#desc)
    p.
      Timelines are visible on #[span.code day], #[span.code days] and #[span.code week] views.#[br]
      #[code time-start], #[code time-end] &amp; #[code time-step] are expected in minutes.
    .mla.w-flex.mt8.mb4.gap4.xs8.justify-end
      | From
      w-slider.grow(
        v-model="exTimeline.timeFrom"
        min="0"
        max="12"
        step="1"
        thumb-label)
      | To
      w-slider.grow(
        v-model="exTimeline.timeTo"
        min="12"
        max="24"
        step="1"
        thumb-label)
      | Step
      w-slider.grow(
        v-model="exTimeline.timeStep"
        min="10"
        max="240"
        step="10"
        thumb-label)
  template(#code-html).
    &lt;vue-cal :time-from="{{ exTimeline.timeFrom }} * 60" :time-to="{{ exTimeline.timeTo }} * 60" :time-step="{{ exTimeline.timeStep }}" /&gt;

  vue-cal(
    :time-from="exTimeline.timeFrom * 60"
    :time-to="exTimeline.timeTo * 60"
    :time-step="exTimeline.timeStep"
    @ready="exTimeline.onReady"
    :view-date="new Date().subtractDays(2)"
    :views="{ day: {}, days: { cols: 5, rows: 1 }, week: {}, month: {}, year: {}, years: {} }"
    view="days"
    :dark="store.darkMode"
    style="height: auto;max-height: 400px;overflow: auto")

//- Example.
example(title="Today's Current Time" anchor="today-current-time")
  template(#desc)
    p.
      When the time column is visible, the current time of today's date will
      be marked with a line.#[br]
      The line position will be updated every time the calendar current view is re-rendered (by interacting)
      or following the real time if #[code watch-real-time] is set to true (uses an optimized nested
      setTimeout, but still more expensive than none).#[br]
      You can easily customize the now-line via CSS, for instance, changing the line and arrow color is as
      easy as:
    ssh-pre.my1.d-iblock.pr8(language="css" :dark="store.darkMode") .vuecal__now-line {border-color: #06c;}
    div
      p.d-iblock Or you can also hide it:
      ssh-pre.mt0.d-iblock.pr8(language="css" :dark="store.darkMode") .vuecal__now-line {display: none;}
    .w-flex.mb4.justify-end
      .text-right
        w-switch.mb1(v-model="exTodayCurrentTime.watchRealTime") Watch Real Time
        .caption(v-if="exTodayCurrentTime.watchRealTime") Will update the now line in {{ exTodayCurrentTime.timeBeforeUpdate }}s.
        .caption(v-else) Will update the now line when you switch view.

  template(#code-html).
    &lt;vue-cal{{ exTodayCurrentTime.watchRealTime ? ' watch-real-time' : '' }} /&gt;
  vue-cal(
    :views="['day']"
    view="day"
    :views-bar="false"
    :today-button="false"
    :time-cell-height="26"
    :watch-real-time="exTodayCurrentTime.watchRealTime"
    @ready="exTodayCurrentTime.onReady"
    :dark="store.darkMode"
    xs
    style="width: 320px;height: 200px")

//- Example.
example(title="Scroll the View to a Particular Time" anchor="scroll-to-time")
  template(#desc)
    p.mb0.
      It can be useful to scroll to the current time or a particular time in the calendar for a better
      user experience.
      3 view functions are available for that (you can get the #[code view] object from #[code @ready="({ view }) => {}"]):
    ul
      li.mt3
        code view.scrollTop()
        p Scrolls the calendar body to the top.
      li.mt3
        code view.scrollToTime(minutes)
        p Scrolls the calendar body to the given time in minutes. E.g. #[code view.scrollToCurrentTime(13 * 60)].
      li.mt3
        code view.scrollToCurrentTime()
        p Scrolls the calendar body to the current time.
    alert.mt2.d-iblock You can store the functions from #[code @ready] for later use.
    .w-flex.mb6.justify-end
      w-button.mt2.mr2(@click="exScrollToTime.scrollTop")
        w-icon mdi mdi-format-vertical-align-top
        | Scroll top
      w-button.mt2.mr2(@click="exScrollToTime.scrollToTime(12 * 60)")
        w-icon mdi mdi-format-vertical-align-center
        | Scroll to 12:00
      w-button.mt2.mr2(@click="exScrollToTime.scrollToCurrentTime")
        w-icon mdi mdi-format-vertical-align-bottom
        | Scroll to current time
  template(#code-html).
    &lt;vue-cal @ready="({ view }) =&#65310; view.scrollToCurrentTime()" /&gt;
  vue-cal.ex--scroll-to-time(
    :views="['day']"
    view="day"
    :views-bar="false"
    :today-button="false"
    :time-cell-height="exScrollToTime.timeCellHeight"
    @ready="exScrollToTime.onReady"
    :dark="store.darkMode"
    xs
    style="width: 320px;height: 200px")

//- Example.
example(title="Timeline Tweaking" anchor="timeline-tweaking")
  template(#desc)
    p.mb0.
      For more fancy time cells, you can set a #[code time-cell-height] (in pixels)
      and use the #[code #time-cell] slot.#[br]
      It will give you access to:
    ul
      li #[code hours]: the integer hours from #[code 0] to #[code 23].
      li #[code minutes]: the integer minutes from #[code 0] to #[code 59].
      li.
        #[code minutesSum]:
        the integer sum of minutes from #[code 0] to #[code 1439]. E.g. for 17:30 #[i.mdi.mdi-arrow-right] #[span.code 17 * 60 + 30 = 1050].

      li #[code format12]: the 12-hour formatted time. E.g. #[code 09:00] or #[code 23:45].
      li #[code format24]: the 24-hour formatted time. E.g. #[code 9am] or #[code 11:45pm].

  template(#code-html).
    &lt;vue-cal
      :time-from="5 * 60"
      :time-step="15"
      :time-cell-height="18"
      :views="['day']"&gt;
      &lt;template #time-cell="{ hours, minutes }"&gt;
        &lt;div style="margin-top: -8px"&gt;
          &lt;strong v-if="!minutes" style="font-size: 15px"&gt;{{ '\{\{ hours \}\}' }}&lt;/strong&gt;
          &lt;span v-else style="font-size: 11px;color: grey;"&gt;{{ '\{\{ minutes \}\}' }}&lt;/span&gt;
        &lt;/div&gt;
      &lt;/template&gt;
    &lt;/vue-cal&gt;
  template(#code-css).
    .vuecal__time-cell-line.hours:before {border-color: #42b983;}
  template(#desc2)
    alert.mt6(tip).
      If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it in the
      #[a(href="https://vuejs.org/guide/components/slots.html#scoped-slots" target="_blank") official Vue documentation #[w-icon(color="primary") mdi mdi-open-in-new]]

  vue-cal(
    :time-from="5 * 60"
    :time-step="15"
    :time-cell-height="18"
    :views="['day']"
    view="day"
    :views-bar="false"
    :today-button="false"
    :dark="store.darkMode"
    sm
    style="width: 320px;height: 200px")
    template(#time-cell="{ hours, minutes, index }")
      .mt-2(v-show="index" :class="{ hours: !minutes }")
        strong.primary.px2(v-if="!minutes" style="font-size: 15px;line-height: 18px") {{ hours }}
        span.grey.px2(v-else style="font-size: 11px;line-height: 18px") {{ minutes }}

//- Example.
example(title="Minimum / Maximum Dates" anchor="min-max-dates")
  template(#desc)
    p.
      With the options #[span.code minDate] &amp; #[span.code maxDate], you can set a
      time range of selectable cells. All the cells before and after are still visible but
      will be disabled and not selectable (you can still navigate through them with arrows).#[br]
      In this example, the minimum date is set to 10 days behind and the maximum date to
      10 days ahead of today's date.
    p #[strong Note:] This example uses Vue Cal's #[router-link(to="/date-prototypes") Date prototypes].

    alert.my4(tip)
      strong Notes
      ul
        li The min and max options accept a formatted string or plain Javascript Date object.
        li.
          2 different CSS class are available on out of range cells: #[span.code .before-min]
          &amp; #[span.code .after-max].
  template(#code-html).
    &lt;vue-cal date-picker :min-date="minDate" :max-date="maxDate" /&gt;
  template(#code-js).
    const minDate = new Date().subtractDays(10)
    const maxDate = new Date().addDays(10)
  template(#code-css).
    .vuecal__cell--disabled {text-decoration: line-through;}
    .vuecal__cell--before-min {color: #b6d6c7;}
    .vuecal__cell--after-max {color: #008b8b;}
  vue-cal(
    click-to-navigate
    :views="['day', 'month', 'year', 'years']"
    view="month"
    :views-bar="false"
    :min-date="exMinMaxDates.minDate"
    :max-date="exMinMaxDates.maxDate"
    xs
    :dark="store.darkMode")

//- Example.
example(title="Disable Days" anchor="disable-days")
  template(#desc)
    p.
      You can disable specific dates with the #[span.code disable-days] prop.#[br]
      Pass it an array of dates - strings in the format #[span.code YYYY-MM-DD]
      or Date objects.#[br]
      Disabled days will be visible but not selectable or clickable to navigate to. But you can still
      navigate through them in day view with the calendar arrows.
    .w-flex.my4.align-center
      w-switch.mr4(v-model="exDisableDays.disableDays") Disable Days
  template(#code-html)
    | &lt;vue-cal date-picker
    template(v-if="exDisableDays.disableDays").
       :disable-days="[
        new Date().subtractDays(2).format(), // Using Vue Cal's Date prototypes.
        new Date().format(), // Using Vue Cal's Date prototypes.
        new Date().addDays(2).format() // Using Vue Cal's Date prototypes.
      ]"
    template(v-else)
    | &nbsp;/&gt;
  template(#code-css).
    .vuecal__cell--disabled {text-decoration: line-through;color: #bbb;}

  vue-cal(
    :dark="store.darkMode"
    date-picker
    :views="['day', 'month', 'year', 'years']"
    :views-bar="false"
    :disable-days="exDisableDays.computedDisabledDays")

//- Example.
example(title="Hide Particular Week Days" anchor="hiding-particular-week-days")
  template(#desc)
    p.
      If you want to hide particular days of the week, you can provide an array through the
      #[code hide-weekdays] option. Possible values: #[code="['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']"].#[br]
      This option will apply on #[code days], #[code week] &amp; #[code month] views.#[br]

    .w-flex.justify-end.gap2.align-center
      label Days to Hide:
      w-select(
        v-model="exHideWeekDays.weekdaysToHide"
        :items="exHideWeekDays.weekdays.map(day => ({ label: day }))"
        multiple
        fit-to-content
        placeholder="Weekdays")
  template(#code-html).
    &lt;vue-cal {{ exHideWeekDays.weekdaysToHide.length ? `:hide-weekdays="['${exHideWeekDays.weekdaysToHide.join('\', \'')}']"` : '' }} /&gt;
  vue-cal(
    :hide-weekdays="exHideWeekDays.weekdaysToHide"
    :dark="store.darkMode")
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { useAppStore } from '@/store'
import { VueCal } from '@/vue-cal'

const store = useAppStore()

const exTimeline = reactive({
  timeFrom: ref(7),
  timeTo: ref(18),
  timeStep: ref(30),
  onReady: ({ view }) => setTimeout(() => view.scrollToCurrentTime(), 350)
})

const exTodayCurrentTime = reactive({
  watchRealTime: ref(false),
  now: ref(new Date()),
  timeBeforeUpdate: computed(() => 60 - exTodayCurrentTime.now.getSeconds()),
  timeTickerId: null,
  onReady: ({ view }) => {
    view.scrollToCurrentTime()
  },
  timeTick: () => {
    exTodayCurrentTime.now = new Date()
    exTodayCurrentTime.timeTickerId = setTimeout(exTodayCurrentTime.timeTick, 1000)
  }
})
watch(() => exTodayCurrentTime.watchRealTime, () => {
  if (exTodayCurrentTime.watchRealTime) exTodayCurrentTime.timeTick()
  else clearTimeout(exTodayCurrentTime.timeTickerId)
})

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

const exMinMaxDates = reactive({
  minDate: computed(() => new Date().subtractDays(10)),
  maxDate: computed(() => new Date().addDays(10))
})

const exDisableDays = reactive({
  disableDays: ref(true),
  disabledDates: [
    new Date().subtractDays(2).format(),
    new Date().format(),
    new Date().addDays(2).format()
  ],
  computedDisabledDays: computed(() => exDisableDays.disableDays ? exDisableDays.disabledDates : [])
})

const exHideWeekDays = reactive({
  weekdays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
  weekdaysToHide: ref(['tue', 'wed', 'fri'])
})
</script>

<style lang="scss">
// Today-current-time example.
.example--today-current-time {
  .vuecal__now-line {border-color: #06c;}
}

.example--disable-days {
  .vuecal__cell--disabled {text-decoration: line-through;color: #bbb;}
}

.example--min-max-dates {
  .vuecal__cell--disabled .vuecal__cell-date {text-decoration: line-through;opacity: 1;}
  .vuecal__cell--before-min {color: #b6d6c7;}
  .vuecal__cell--after-max {color: #008b8b;}
}
</style>
