<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div.test-view
  .w-flex.align-center.gap6.no-grow
    w-select.mb4.no-grow(v-model="locale" :items="locales") Locale:

    w-radios.mb4(
      v-model="view"
      :items="views"
      return-values
      inline)

    w-radios.mb4(
      v-model="size"
      :items="sizes"
      return-values
      inline)

  VueCal.vuecal--default-theme.no-shrink(
    date-picker
    :xs="size === 'xs'"
    :sm="size === 'sm'"
    v-model:selected-date="selectedDate")

  VueCal.vuecal--default-theme.grow.no-shrink(
    v-model:view="view"
    :views="views.map(item => item.value)"
    v-model:selected-date="selectedDate"
    v-model:view-date="viewDate"
    :events="events"
    :locale="locale"
    startWeekOnSunday
    editable-events
    cell-contextmenu
    today-button
    :xs="size === 'xs'"
    :sm="size === 'sm'"
    :time-from="7 * 60"
    :time-to="20 * 60"
    :time-step="30")
    //- template(#title="view") {{ view }}
    //- template(#cell="{ date, index }") ({{ date }}, {{ index }})
    //- template(#diy="{ vuecal, view }") {{ view }}<br><br>{{ vuecal }}
    //- template(#header="{ view, availableViews, vuecal }")
      w-button.ma1(
        v-for="(grid, viewName) in availableViews"
        type="button"
        @click="vuecal.switchView(viewName)"
        :outline="view !== viewName") {{ viewName }}

  p selected Date: {{ selectedDate }}
  p View Date: {{ viewDate }}
</template>

<script setup>
import { ref } from 'vue'
import VueCal from '@/vue-cal/index.vue'

const locale = ref('en-us')
const locales = [
  { value: 'ko', label: 'ko' },
  { value: 'en-gb', label: 'en-gb' },
  { value: 'en-us', label: 'en-us' },
  { value: 'ja', label: 'ja' },
  { value: 'zh-cn', label: 'zh-cn' },
  { value: 'ar', label: 'ar' },
  { value: 'fr', label: 'fr' },
  { value: 'ca', label: 'ca' },
]
const views = [
  { value: 'day', label: 'Day' },
  { value: 'days', label: 'Days' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'year', label: 'Year' },
  { value: 'years', label: 'Years' }
]
const size = ref(null)
const sizes = [
  { value: null, label: 'Normal' },
  { value: 'sm', label: 'small' },
  { value: 'xs', label: 'Extra small' }
]

const view = ref('week')
const events = ref([])
const selectedDate = ref('')
const viewDate = ref(new Date(2023, 11, 1))

// `from` and `to` are expected in minutes.
const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours', label: 'Full day shift' }

const now = new Date()

// export default {
//   components: { VueCal },

//   data: () => ({
//     selectedDate: now,
//     view: 'week',
//     specialHours: {
//       1: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Full day shift</em>' },
//       2: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><br><em>Full day shift</em>' },
//       3: [
//         { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Morning shift</em>' },
//         { from: 14 * 60, to: 19 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><br><em>Afternoon shift</em>' }
//       ],
//       4: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Full day shift</em>' },
//       5: { from: 9 * 60, to: 18 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><br><em>Full day shift</em>' },
//       6: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><br><em>Full day shift</em>' },
//       7: { from: 7 * 60, to: 20 * 60, class: 'closed', label: '<strong>Closed</strong>' }
//     },
//     events: [
//       {
//         start: new Date(new Date(now).setHours(1, 0, 0)),
//         end: new Date(new Date(now).setHours(4, 0, 0)),
//         allDay: true,
//         title: 'Event 1',
//         split: 2
//       },
//       {
//         start: new Date(new Date(now).setHours(1, 0, 0)),
//         end: new Date(new Date(now).setHours(4, 0, 0)),
//         title: 'Event 2',
//         split: 1
//       },
//       {
//         start: new Date(new Date(now).setHours(3, 0, 0)),
//         end: new Date(new Date(now).setHours(5, 0, 0)),
//         title: 'Event 3',
//         split: 2
//       }
//     ],
//     daySplits: [
//       { label: 'Tom', color: 'green' },
//       { label: 'Kate', color: 'pink' }
//     ]
//   }),

//   methods: {
//     log (...params) {
//       // eslint-disable-next-line
//       console.log(...params)
//     }
//   }
// }
</script>

<style lang="scss">
.test-view {
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 4px;
}

// Global.
.w-app {margin: 0;padding: 0;}
.top-bar, footer {display: none !important;}

// Min cell width example.
// --------------------------------------------------------
// .vuecal__weekdays-bar {margin: auto;} // So it will fill up the whole available space.
// .vuecal__weekday,
// .vuecal--week-view .vuecal__cell,
// .vuecal--days-view .vuecal__cell {min-width: 300px;}
// .vuecal--week-view .vuecal__cell,
// .vuecal--days-view .vuecal__cell {min-height: 3000px;}
// --------------------------------------------------------

.vuecal__special-hours {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;

  em {font-size: 0.9em;color: #999;}
}

.doctor-1 {background-color: hsl(127, 100%, 97%);color: hsl(127, 50%, 67%);}
.doctor-2 {background-color: hsl(217, 100%, 97%);color: hsl(217, 80%, 67%);}
.doctor-3 {background-color: hsl(287, 100%, 97%);color: hsl(287, 80%, 67%);}
.closed {
  background: hsl(27, 100%, 97%) repeating-linear-gradient(-45deg, hsla(27, 100%, 67%, 0.25), hsla(27, 100%, 67%, 0.25) 5px, rgba(255, 255, 255, 0) 5px, rgba(255, 255, 255, 0) 15px);
  color: hsl(27, 90%, 63%);
}
</style>
