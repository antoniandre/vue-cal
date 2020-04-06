<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  vue-cal.ml-2.mr-1.vuecal--blue-theme(
    :disable-views="['years', 'year', 'month', 'day']"
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
    log (params) {
      console.log(params)
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
.vuecal {max-height: 65vh;}
.vuecal__event {
  background-color: rgba(160, 220, 255, 0.5);
  border: 1px solid rgba(0, 100, 150, 0.15);
}

.v-application--wrap {min-height: 0;}
footer {display: none !important;}
</style>
