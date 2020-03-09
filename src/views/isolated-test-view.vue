<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
div
  div(
    v-for="(item, i) in draggables"
    :key="i"
    draggable="true"
    @dragstart="onDragStart($event, item)") {{ item.title }} ({{ item.duration }} min)
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
    draggables: [
      {
        startDate: now.addDays(1),
        endDate: now.addDays(1).addHours(1),
        title: 'Ext. Event 1',
        content: 'content 1',
        duration: 60
      },
      {
        startDate: new Date(new Date(now).setHours(1, 0, 0)),
        endDate: new Date(new Date(now).setHours(3, 0, 0)),
        title: 'Ext. Event 2',
        content: 'content 2',
        duration: 30
      },
      {
        startDate: new Date(new Date(now).setHours(1, 0, 0)),
        endDate: new Date(new Date(now).setHours(3, 0, 0)),
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
    },
    onDragStart (e, draggable) {
      e.dataTransfer.setData('event', JSON.stringify(draggable))
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
