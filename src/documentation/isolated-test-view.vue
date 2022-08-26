<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div.test-view
  vue-cal.ml2.mr1.vuecal--blue-theme(
    show-all-day-events
    :events="events"
    editable-events
    :split-days="daySplits"
    sticky-split-labels
    cell-contextmenu
    today-button
    v-model:selectedDate="selectedDate"
    @cell-contextmenu="log")
  p selectedDate: {{ selectedDate }}
</template>

<script>
import VueCal from '@/vue-cal/index.vue'

const now = new Date()

export default {
  components: { VueCal },

  data: () => ({
    selectedDate: now,
    view: 'week',
    events: [
      {
        start: new Date(new Date(now).setHours(1, 0, 0)),
        end: new Date(new Date(now).setHours(4, 0, 0)),
        allDay: true,
        title: 'Event 1',
        split: 2
      },
      {
        start: new Date(new Date(now).setHours(1, 0, 0)),
        end: new Date(new Date(now).setHours(4, 0, 0)),
        title: 'Event 2',
        split: 1
      },
      {
        start: new Date(new Date(now).setHours(3, 0, 0)),
        end: new Date(new Date(now).setHours(5, 0, 0)),
        title: 'Event 3',
        split: 2
      }
    ],
    daySplits: [
      { label: 'Tom', color: 'green' },
      { label: 'Kate', color: 'pink' }
    ]
  }),

  methods: {
    log (...params) {
      // eslint-disable-next-line
      console.log(...params)
    }
  }
}
</script>

<style lang="scss">
.test-view {
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  .vuecal {height: 400px;}
  .vuecal__event {
    background-color: rgba(160, 220, 255, 0.5);
    border: 1px solid rgba(0, 100, 150, 0.15);
  }
}

// Global.
.w-app {margin: 0;padding: 0;}
.top-bar, footer {display: none !important;}
</style>
