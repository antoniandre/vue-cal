<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div.test-view
  //- vue-cal.ml-2.mr-1.vuecal--blue-theme(
    selected-date="2019-10-29"
    :time-from="7 * 60"
    :time-to="23 * 60"
    :disable-views="['years', 'year']"
    hide-weekends
    editable-events
    :events="events"
    :active-view.sync="view"
    @view-change="log"
    :on-event-click="log")
  vue-cal.ml-2.mr-1.vuecal--blue-theme(
    show-all-day-events
    :disable-views="['years', 'year']"
    :editable-events="{ title: false, drag: false, resize: false, delete: true, create: true }"
    :events="events"
    :drag-to-create-event="false"
    :split-days="daySplits"
    @event-drag-create="log($event)"
    :min-split-width="150"
    sticky-split-labels)
    template(v-slot:split-label="{ split, view }")
      v-icon(:color="split.color") person
      strong(:style="`color: ${split.color}`") {{ split.label }}
</template>

<script>
import VueCal from '@/vue-cal'

const now = new Date()
export default {
  components: { VueCal },
  data: () => ({
    selectedDate: now,
    view: 'week',
    events: [
      // {
      //   start: now.subtractDays(1),
      //   end: now.addDays(1),
      //   title: 'Event',
      //   split: 1
      // },
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
.vuecal {}
.vuecal__event {
  background-color: rgba(160, 220, 255, 0.5);
  border: 1px solid rgba(0, 100, 150, 0.15);
}

// Global.
html, body, #app, .v-application--wrap, .container {height: 100%;}
#app {padding-top: 2em;}
.v-application--wrap {min-height: 0;padding-top: 7em;}
.test-view {
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
footer {display: none !important;}
</style>
