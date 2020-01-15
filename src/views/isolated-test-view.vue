<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
vue-cal(
  :selected-date="selectedDate"
  :events="events"
  editable-events
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
        endDate: now.addDays(0),
        title: 'Event'
      }
    ]
  }),

  methods: {
  }
}
</script>

<style lang="scss">
.v-application--wrap {min-height: 0;}
footer {display: none !important;}
</style>
