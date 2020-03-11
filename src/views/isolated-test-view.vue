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

  v-layout(style="min-height: 400px;max-height: 65vh")
    vue-cal.vuecal--blue-theme(
      small
      hide-view-selector
      hide-weekends
      :disable-views=['years', 'year', 'month', 'day']
      :time-from="8 * 60"
      :time-to="18 * 60"
      :selected-date="selectedDate"
      today-button
      :events="events"
      editable-events
      @event-drop="log")
    vue-cal.vuecal--green-theme(
      small
      hide-view-selector
      hide-weekends
      :disable-views=['years', 'year', 'month', 'day']
      :time-from="8 * 60"
      :time-to="18 * 60"
      :selected-date="selectedDate"
      today-button
      :events="events"
      editable-events
      @event-drop="log")
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
