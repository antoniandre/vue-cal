<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
vue-cal.vuecal--blue-theme(
  :selected-date="selectedDate"
  today-button
  :events="events"
  editable-events
  @event-drop="log"
  :snap-to-time="20"
  :split-days="[{ id: 1, label: 'doctor 1' }, { id: 2, label: 'doctor 2' }]"
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
      // {
      //   startDate: now.subtractDays(1),
      //   endDate: now.addDays(1),
      //   title: 'Event'
      // },
      {
        startDate: new Date(new Date(now).setHours(1, 0, 0)),
        endDate: new Date(new Date(now).setHours(3, 0, 0)),
        title: 'Event',
        split: 1
      },
      {
        startDate: new Date(new Date(now).setHours(1, 0, 0)),
        endDate: new Date(new Date(now).setHours(3, 0, 0)),
        title: 'Event',
        split: 2
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
.vuecal__event {
  background-color: rgba(160, 220, 255, 0.5);
  border: 1px solid rgba(0, 100, 150, 0.15);
}

.v-application--wrap {min-height: 0;}
footer {display: none !important;}
</style>
