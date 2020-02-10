<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  v-btn(@click="selectedDate = new Date()") Select today
  vue-cal(
    :selected-date="selectedDate"
    events-on-month-view
    default-view="month"
    :events="events"
    editable-events
    :time-from="6 * 60"
    :time-to="22 * 60"
    :time-step="30"
    :special-hours="specialHours"
    style="min-height: 400px;max-height: 65vh")
</template>

<script>
import VueCal from '@/components/vue-cal'

const now = new Date()
const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' }

export default {
  components: { VueCal },
  data: () => ({
    selectedDate: now,
    specialHours: Array(5).fill('').reduce((obj, item, i) => (obj[i + 1] = dailyHours) && obj, {}),
    events: [
      // {
      //   startDate: now.subtractDays(1),
      //   endDate: now.addDays(1),
      //   title: 'Event'
      // },
      // {
      //   start: '2019-12-31 18:00',
      //   end: '2019-12-31 22:00',
      //   title: 'Event'
      // }
    ]
  }),

  methods: {
    log (params) {
      console.log(params)
    }
  }
}
</script>

<style lang="scss">
.business-hours {background-color: rgba(255, 255, 0, 0.2);}
.v-application--wrap {min-height: 0;}
footer {display: none !important;}
</style>
