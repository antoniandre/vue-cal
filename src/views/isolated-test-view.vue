<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  v-btn(@click="selectedDate = new Date()") Select today
  v-btn(@click="splitDays[1].hide = !splitDays[1].hide") Toggle Doctor 2
  p {{splitDays}}
  vue-cal.vuecal--blue-theme(
    :selected-date="selectedDate"
    events-on-month-view
    default-view="month"
    :events="events"
    editable-events
    :split-days="splitDays"
    sticky-split-labels
    :time-from="6 * 60"
    :time-to="22 * 60"
    :time-step="30"
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
    splitDays: [
      { class: 'doctor1', label: 'Doctor 1', hide: false },
      { class: 'doctor2', label: 'Doctor 2', hide: false },
      { class: 'doctor3', label: 'Doctor 3', hide: false }
    ],
    events: [
      {
        startDate: now.subtractHours(6),
        endDate: now.subtractHours(4),
        title: 'Event 1',
        split: 1
      },
      {
        startDate: now.subtractHours(3),
        endDate: now.subtractHours(1),
        title: 'Event 2',
        split: 3
      }
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
