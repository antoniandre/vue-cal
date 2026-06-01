<template lang="pug">
.events-sync-test-view.pa4
  .w-flex.gap2.wrap.mb4
    w-button(sm @click="loadThree" data-testid="load-three") Load 3 events
    w-button(sm @click="refetchMerged" data-testid="refetch-merged") Refetch (merge)
    w-button(sm @click="partialProp" data-testid="partial-prop") Partial prop (id 1 only)
    w-button(sm @click="viewUpdate" data-testid="view-update") view.updateEvent
    w-button(sm @click="viewDelete" data-testid="view-delete") view.deleteEvent
  vue-cal.events-sync-cal(
    ref="cal"
    v-model:events="events"
    v-model:view-date="viewDate"
    view="week"
    :editable-events="{ drag: true, resize: true, create: true, delete: true }"
    @ready="onCalReady"
    data-testid="vue-cal")
    template(#event="{ event }")
      .w-flex.column.gap1
        strong {{ event.title }}
        w-button.patch-btn(
          v-if="event.id === 2"
          sm
          data-testid="patch-event-2"
          @click.stop="event.patch({ title: 'ViaPatch' })") Patch
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { VueCal } from '@/vue-cal'

const cal = ref(null)
const calView = ref(null)
const calConfig = ref(null)
const viewDate = ref(new Date())

const onCalReady = ({ view, config }) => {
  calView.value = view
  calConfig.value = config
}

const dayAt = (offset, hour = 10) => {
  const d = new Date(viewDate.value)
  d.setDate(d.getDate() + offset)
  d.setHours(hour, 0, 0, 0)
  return d
}

const baseThree = () => [
  { id: 1, start: dayAt(0), end: dayAt(0, 11), title: 'Event 1' },
  { id: 2, start: dayAt(1), end: dayAt(1, 11), title: 'Event 2' },
  { id: 3, start: dayAt(2), end: dayAt(2, 11), title: 'Event 3' }
]

const events = ref(baseThree())

const loadThree = () => { events.value = baseThree() }

const refetchMerged = () => {
  events.value = [
    { id: 1, start: dayAt(0), end: dayAt(0, 11), title: 'Event 1' },
    { id: 2, start: dayAt(1), end: dayAt(1, 11), title: 'Event 2 updated' },
    { id: 3, start: dayAt(2), end: dayAt(2, 11), title: 'Event 3' }
  ]
}

const partialProp = () => {
  events.value = [{ id: 1, start: dayAt(0), end: dayAt(0, 11), title: 'Event 1' }]
}

const viewUpdate = () => {
  const ev = calConfig.value?.events?.find(e => String(e.id) === '2')
  calView.value?.updateEvent(ev || { id: 2 }, { title: 'ViaView' })
}

const viewDelete = () => {
  calView.value?.deleteEvent({ id: 3 }, 3)
  events.value = events.value.filter(e => e.id !== 3)
}

onMounted(() => {
  window.__eventsSyncTest = { loadThree, refetchMerged, partialProp, viewUpdate, viewDelete, getEvents: () => events.value }
})
</script>

<style lang="scss">
.events-sync-test-view { min-height: 100vh; }
.events-sync-cal { height: 70vh; }
</style>
