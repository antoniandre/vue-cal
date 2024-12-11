<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
.test-view
  .w-flex.gap2
    w-button(@click="addEventFromOutside") Add event
    w-button(@click="addEventFromVueCal") Add event

  .w-flex.gap2.mt4.ovh
    //- aside.no-shrink.no-grow
      vue-cal.no-shrink.no-grow(
        v-model:selected-date="pickerConfig.selectedDate"
        v-bind="pickerConfig")

      .w-flex.align-center.gap1.body.wrap.no-grow
        span View Date:
        template(v-if="mainVuecalConfig.viewDate")
          span.code {{ mainVuecalConfig.viewDate.format('DD/MM/YYYY') }}
          w-icon.grey.mx-1(xs) mdi mdi-clock-outline
          span.code {{ mainVuecalConfig.viewDate.formatTime() }}
        .grey(v-else) N/A
      .w-flex.align-center.gap1.wrap.size--sm.no-grow
        span Selected Date:
        template(v-if="mainVuecalConfig.selectedDate")
          span.code {{ mainVuecalConfig.selectedDate.format('DD/MM/YYYY') }}
          w-icon.grey.mx-1(xs) mdi mdi-clock-outline
          span.code {{ mainVuecalConfig.selectedDate.formatTime() }}
        .grey(v-else) N/A

    vue-cal.grow(
      ref="vueCalRef"
      v-model:view="mainVuecalConfig.view"
      v-model:selected-date="mainVuecalConfig.selectedDate"
      v-model:view-date="mainVuecalConfig.viewDate"
      v-bind="mainVuecalConfig"
      @event-create="log('event-create', $event)"
      @event-click="log('event-click', $event)"
      @event-drag="log('event-drag', $event)"
      @event-drag-end="log('event-drag', $event)"
      @event-drop="log('event-drop', $event)"
      @event-resize="log('event-resize', $event)"
      @event-resize-end="log('event-resize-end', $event)"
      @cell-drag="log('cell-drag', $event)"
      @cell-drag-end="log('cell-drag-end', $event)")
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { VueCal, addDatePrototypes } from '@/vue-cal'
import { useAppStore } from '@/store'

addDatePrototypes()

const store = useAppStore()
const vueCalRef = ref(null)

const pickerConfig = reactive({
  datePicker: true,
  dark: computed(() => store.darkMode),
  selectedDate: computed(() => mainVuecalConfig.selectedDate),
  locale: computed(() => mainVuecalConfig.locale)
})

const mainVuecalConfig = reactive({
  view: ref('week'),
  dark: computed(() => store.darkMode),
  selectedDate: ref(null),
  viewDate: ref(new Date()),
  locale: ref(''),
  startWeekOnSunday: ref(false),
  todayButton: ref(true),
  xs: ref(false),
  sm: ref(false),
  // timeFrom: 7 * 60,
  // timeTo: 20 * 60,
  timeStep: 60,
  twelveHour: ref(false),
  hideWeekends: ref(false),
  hideWeekdays: ref([]),
  viewDayOffset: ref(0),
  clickToNavigate: ref(false),
  watchRealTime: ref(true),
  events: ref([]),
  schedules: [{ label: 'Dr 1', class: 'dr-1' }, { label: 'Dr 2', class: 'dr-2' }],
  eventsOnMonthView: true,
  // specialHours: {
  //   mon: { from: 0 * 60, to: 23 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><em>Full day shift</em>' },
  //   tue: { from: 4 * 60, to: 5 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><em>Full day shift</em>' },
  //   wed: [
  //     { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><em>Morning shift</em>' },
  //     { from: 14 * 60, to: 19 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><em>Afternoon shift</em>' }
  //   ],
  //   thu: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><em>Full day shift</em>' },
  //   fri: { from: 9 * 60, to: 18 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><em>Full day shift</em>' },
  //   sat: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><em>Full day shift</em>' },
  //   sun: { from: 7 * 60, to: 20 * 60, class: 'closed', label: '<strong>Closed</strong>' }
  // },
  editableEvents: ref(false)
})

// Pretend a call to a backend.
setTimeout(() => {
  mainVuecalConfig.events = [
    {
      title: 'Event 1',
      start: new Date(new Date().setHours(10, 0, 0, 0)),
      end: new Date(new Date().setHours(10, 30, 0, 0)),
      schedule: 1
    },
    {
      title: 'Event 2',
      start: new Date(new Date().addDays(1).setHours(11, 0, 0, 0)),
      end: new Date(new Date().addDays(1).setHours(11, 30, 0, 0)),
      schedule: 2
    }
  ]
}, 1000)

const addEventFromOutside = () => {
  mainVuecalConfig.events.push({
    title: `Event ${mainVuecalConfig.events.length}`,
    start: new Date().subtractHours(4),
    end: new Date().subtractHours(3),
    schedule: 2
  })
}

const addEventFromVueCal = () => {
  vueCalRef.value.view.createEvent({
    title: 'New Event!',
    start: new Date().subtractHours(2),
    end: new Date().subtractHours(1),
    schedule: 1
  })
}

const log = (...args) => console.log(...args)
</script>

<style lang="scss">
.page--test {
  padding-top: 60px;
  padding-left: 12px;
  padding-right: 12px;
  border-left: none;
  overflow: hidden;
  max-width: none;

  // Global.
  ~ footer, aside {display: none;}

  main {
    overflow: auto;
    display: flex;
    flex-direction: column;
    border: none;
    padding: 0;
    flex-grow: 1;
  }

  main aside {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 215px;
    padding: 0;
  }

  .test-view {
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  // Global.
  .w-app {margin: 0;padding: 0;}
  footer {display: none !important;}
}
</style>
