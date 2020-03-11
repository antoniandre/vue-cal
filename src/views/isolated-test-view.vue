<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  .external-event(
    v-for="(item, i) in draggables"
    :key="i"
    draggable="true"
    @dragstart="onDragStart($event, item)")
      strong.mr-2 {{ item.title }}
      | ({{ item.duration ? `${item.duration} min` : 'no duration' }})

  v-layout(style="height: 350px")
    vue-cal.mr-1.vuecal--blue-theme(
      small
      hide-view-selector
      hide-weekends
      :disable-views=['years', 'year', 'month', 'day']
      :time-from="9 * 60"
      :time-to="18 * 60"
      :selected-date="selectedDate"
      :events="events"
      editable-events
      @event-drop="onEventDrop")
    vue-cal.ml-1.vuecal--green-theme(
      small
      hide-view-selector
      hide-weekends
      :disable-views=['years', 'year', 'month', 'day']
      :time-from="9 * 60"
      :time-to="18 * 60"
      :selected-date="selectedDate"
      :events="events"
      editable-events
      @event-drop="onEventDrop")
</template>

<script>
import VueCal from '@/components/vue-cal'

const now = new Date()
export default {
  components: { VueCal },
  data: () => ({
    selectedDate: now,
    draggables: [
      {
        id: 1,
        title: 'Ext. Event 1',
        content: 'content 1',
        duration: 60
      },
      {
        id: 2,
        title: 'Ext. Event 2',
        content: 'content 2',
        duration: 30
      },
      {
        id: 3,
        title: 'Ext. Event 3',
        content: 'content 3'
      }
    ],
    events: [
      // {
      //   startDate: now.subtractDays(1),
      //   endDate: now.addDays(1),
      //   title: 'Event'
      // },
      {
        startDate: new Date(new Date(now).setHours(1, 0, 0)),
        endDate: new Date(new Date(now).setHours(3, 0, 0)),
        title: 'Event'
      },
      {
        startDate: new Date(new Date(now).setHours(1, 0, 0)),
        endDate: new Date(new Date(now).setHours(3, 0, 0)),
        title: 'Event'
      }
    ]
  }),

  methods: {
    log (params) {
      console.log(params)
    },
    onDragStart (e, draggable) {
      e.dataTransfer.setData('event', JSON.stringify(draggable))
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
.vuecal__event {
  background-color: rgba(160, 220, 255, 0.5);
  border: 1px solid rgba(0, 100, 150, 0.15);
}

.external-event {
  background-color: rgba(160, 220, 255, 0.5);
  border: 1px solid rgba(0, 100, 150, 0.15);
  width: 13em;
  margin: 0.3em 0;
  padding: 0.2em 0.4em;
}

.v-application--wrap {min-height: 0;}
footer {display: none !important;}
</style>
