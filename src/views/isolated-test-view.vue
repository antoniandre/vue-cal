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
    twelve-hour
    style="min-height: 400px;max-height: 65vh")
</template>

<script>
import VueCal from '@/components/vue-cal'

const now = new Date()
export default {
  components: { VueCal },
  data: () => ({
    selectedDate: now,
    events: [
      {
        startDate: now.subtractDays(1),
        endDate: now.addDays(1),
        title: 'Event'
      },
      {
        start: '2019-12-31 18:00',
        end: '2019-12-31 22:00',
        title: 'Event'
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
.v-application--wrap {min-height: 0;}
footer {display: none !important;}
</style>
