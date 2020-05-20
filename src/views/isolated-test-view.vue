<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div.test-view
  div.text-center
    v-btn.ma-1(small @click="view = 'month'" color="primary" depressed :outlined="view !== 'month'") month view
    v-btn.ma-1(small @click="view = 'week'" color="primary" depressed :outlined="view !== 'week'") week view
    v-btn.ma-1(small @click="view = 'day'" color="primary" depressed :outlined="view !== 'day'") day view
  vue-cal.ml-2.mr-1.vuecal--blue-theme(
    selected-date="2019-10-29"
    :events="events"
    :active-view.sync="view"
    editable-events
    :time-from="8 * 60"
    :time-to="17 * 60"
    hide-weekends
    today-button
    @ready="fetchEvents"
    @view-change="fetchEvents"
    :on-event-click="log")
</template>

<script>
import VueCal from '@/components/vue-cal'

// Simulating 3 arrays of events coming from an API,
// one array for week 44, one for week 45, one for week 46 (week partinioning for convenience).
// If view changes to month view, return all the events of the 3 weeks.
const events = {
  44: [
    {
      title: 'Event 1',
      start: '2019-10-28 10:00',
      end: '2019-10-28 12:00'
    },
    {
      title: 'Event 2',
      start: '2019-10-28 11:00',
      end: '2019-10-28 12:30'
    }
  ],
  45: [
    {
      title: 'Event 3',
      start: '2019-11-05 10:00',
      end: '2019-11-05 12:00'
    },
    {
      title: 'Event 4',
      start: '2019-11-06 11:00',
      end: '2019-11-06 12:30'
    }
  ],
  46: [
    {
      title: 'Event 5',
      start: '2019-11-13 10:00',
      end: '2019-11-13 12:00'
    },
    {
      title: 'Event 6',
      start: '2019-11-13 11:00',
      end: '2019-11-13 12:30'
    },
    {
      title: 'Event 7',
      start: '2019-11-15 10:00',
      end: '2019-11-15 12:00'
    },
    {
      title: 'Event 8',
      start: '2019-11-15 11:00',
      end: '2019-11-15 12:30'
    }
  ]
}

const now = new Date()
export default {
  components: { VueCal },
  data: () => ({
    selectedDate: now,
    view: 'week',
    events: [
      {
        start: now.subtractDays(1),
        end: now.addDays(1),
        title: 'Event'
      },
      {
        start: new Date(new Date(now).setHours(1, 0, 0)),
        end: new Date(new Date(now).setHours(4, 0, 0)),
        title: 'Event 1'
      },
      {
        start: new Date(new Date(now).setHours(3, 0, 0)),
        end: new Date(new Date(now).setHours(5, 0, 0)),
        title: 'Event 2'
      }
    ]
  }),

  methods: {
    fetchEvents ({ view, startDate, endDate, week }) {
      console.log('Fetching events', { view, startDate, endDate, week })

      // Do an ajax call here with the given startDate & endDate.
      // Your API should return an array of events for this date range.
      // Here we pretend an API call with a Promise and the setTimeout simulates the payload time.
      new Promise((resolve, reject) => { setTimeout(resolve, 400) })
        .then(() => {
          switch (view) {
            case 'week':
              // If week view return the current week from API.
              this.events = events[week]
              break
            case 'month':
            case 'day':
              // If `month` or `day` view, return all the events from API.
              // (But your API should rather return events only for the given date range)
              this.events = [...events[44], ...events[45], ...events[46]]
              break
          }
        })
    },

    log (...params) {
      console.log(...params)
    },
    onDragStart (e, draggable) {
      e.dataTransfer.setData('event', JSON.stringify(draggable))
      e.dataTransfer.setData('cursor-grab-at', e.offsetY)
    },
    onEventDrop ({ event, originalEvent, external }) {
      if (external) {
        const extEventToDeletePos = this.draggables.findIndex(item => item.id === originalEvent.id)
        if (extEventToDeletePos > -1) this.draggables.splice(extEventToDeletePos, 1)
      }
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
