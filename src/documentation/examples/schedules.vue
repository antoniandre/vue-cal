<template lang="pug">
//- Example.
example(title="Special Hours (or Business Hours)" anchor="special-hours")
  template(#desc)
    .w-flex.wrap.gap4.align-start
      .grow.xs7
        p.
          The #[code specialHours] prop highlights one or more time ranges per weekday on day and week views.#[br]
          It works well for business hours, team shifts, or any recurring availability window.
        p.mt3.
          Each weekday can contain a single block or an array of blocks.#[br]
          Each block can also carry a #[code label] that you can style freely with CSS.
      .w-flex.column.gap2.no-grow
        label Show
        w-radios(
          v-model="exSpecialHours.variant"
          :items="exSpecialHours.choices")
  template(#code-html).
    &lt;vue-cal
      :views="['day', 'week']"
      :time-from="7 * 60"
      :time-to="20 * 60"
      :special-hours="specialHours"
    /&gt;
  template(#code-js v-if="exSpecialHours.variant === 'simpleBusinessHours'").
    const specialHours = {
      mon: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
      tue: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
      wed: [
        { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
        { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
      ],
      thu: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
      fri: { from: 9 * 60, to: 18 * 60, class: 'business-hours' }
    }
  template(#code-js v-else).
    const specialHours = {
      mon: {
        from: 8 * 60,
        to: 17 * 60,
        class: 'doctor-1',
        label: '&lt;strong&gt;Doctor 1&lt;/strong&gt;&lt;br&gt;&lt;em&gt;Full day shift&lt;/em&gt;'
      },
      tue: {
        from: 9 * 60,
        to: 18 * 60,
        class: 'doctor-2',
        label: '&lt;strong&gt;Doctor 2&lt;/strong&gt;&lt;br&gt;&lt;em&gt;Full day shift&lt;/em&gt;'
      },
      wed: [
        {
          from: 8 * 60,
          to: 12 * 60,
          class: 'doctor-1',
          label: '&lt;strong&gt;Doctor 1&lt;/strong&gt;&lt;br&gt;&lt;em&gt;Morning shift&lt;/em&gt;'
        },
        {
          from: 14 * 60,
          to: 19 * 60,
          class: 'doctor-3',
          label: '&lt;strong&gt;Doctor 3&lt;/strong&gt;&lt;br&gt;&lt;em&gt;Afternoon shift&lt;/em&gt;'
        }
      ],
      thu: {
        from: 8 * 60,
        to: 17 * 60,
        class: 'doctor-1',
        label: '&lt;strong&gt;Doctor 1&lt;/strong&gt;&lt;br&gt;&lt;em&gt;Full day shift&lt;/em&gt;'
      },
      fri: {
        from: 9 * 60,
        to: 18 * 60,
        class: 'doctor-3',
        label: '&lt;strong&gt;Doctor 3&lt;/strong&gt;&lt;br&gt;&lt;em&gt;Full day shift&lt;/em&gt;'
      },
      sat: {
        from: 9 * 60,
        to: 18 * 60,
        class: 'doctor-2',
        label: '&lt;strong&gt;Doctor 2&lt;/strong&gt;&lt;br&gt;&lt;em&gt;Full day shift&lt;/em&gt;'
      },
      sun: {
        from: 7 * 60,
        to: 20 * 60,
        class: 'closed',
        label: '&lt;strong&gt;Closed&lt;/strong&gt;'
      }
    }
  template(#code-css)
    template(v-if="exSpecialHours.variant === 'doctorHours'")
      | .vuecal__special-hours {
      |   text-align: center;
      |
      |   &amp;.doctor-1 {background-color: hsl(127deg 43% 60% / 15%);color: hsl(127, 50%, 67%);}
      |   &amp;.doctor-2 {background-color: hsl(217deg 43% 60% / 15%);color: hsl(217, 80%, 67%);}
      |   &amp;.doctor-3 {background-color: hsl(287deg 43% 60% / 15%);color: hsl(287, 80%, 67%);}
      |   &amp;.closed {
      |     background: repeating-linear-gradient(-45deg, rgba(#fff, 0) 0 6px, rgba(#ffa257, 0.15) 6px 20px);
      |     color: hsl(27, 90%, 63%);
      |   }
      |   em {font-size: 0.9em;color: #999;line-height: 1.15;}
      | }
    template(v-else)
      | .business-hours {background-color: #00daff21;}

  vue-cal(
    :dark="store.darkMode"
    :views="['day', 'week']"
    :time-from="7 * 60"
    :time-to="20 * 60"
    :special-hours="currentSpecialHours"
    style="height: 550px")

//- Example.
example(title="Schedules & Schedule Events" anchor="schedules")
  template(#desc)
    .w-flex.wrap.gap4.align-start
      .grow.xs7
        p.
          Schedules split each day into dedicated columns for people, rooms, or resources, while events keep using
          their #[code schedule] id.#[br]
          This example also shows how #[code specialHours] can now target those same schedule ids.
        p.mt3.
          Each weekday can define a shared #[code default] range and optional overrides in #[code schedules].#[br]
          Any schedule without an override falls back to #[code default].
        p.mt3.
          Use the CSS variables #[code --vuecal-min-cell-size] and #[code --vuecal-min-schedule-size] when you need
          a wider, scrollable layout.
      .w-flex.column.gap2.no-grow
        label Special Hours
        w-radios(
          v-model="exSchedules.hoursMode"
          :items="exSchedules.hoursChoices")
        w-switch(v-model="exSchedules.schedules[1].hide")
          | Hide Dr Kim
        label Layout
        w-radios(
          v-model="exSchedules.widthMode"
          :items="exSchedules.widthChoices")
  template(#code-html).
    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :views="['day', 'week']"
      :time-from="7 * 60"
      :time-to="21 * 60"
      :events="events"
      :schedules="schedules"
      :special-hours="specialHours"
      :style="{
        '--vuecal-min-cell-size': '24rem',
        '--vuecal-min-schedule-size': '13rem'
      }"
    /&gt;
  template(#code-js).
    const schedules = [
      { id: 'dr-lee', label: 'Dr Lee', class: 'doctor doctor--lee' },
      { id: 'dr-kim', label: 'Dr Kim', class: 'doctor doctor--kim' },
      { id: 'lab', label: 'Lab', class: 'doctor doctor--lab' }
    ]
    const events = [
      { start: '2018-11-19 08:30', end: '2018-11-19 10:00', title: 'Rounds', class: 'health', schedule: 'dr-lee' },
      { start: '2018-11-19 11:00', end: '2018-11-19 12:00', title: 'Consultation', class: 'health', schedule: 'dr-kim' },
      { start: '2018-11-19 14:00', end: '2018-11-19 17:00', title: 'Tests', class: 'leisure', schedule: 'lab' }
    ]
    const specialHours = {
      mon: {
        default: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: 'Clinic open' },
        schedules: {
          'dr-lee': [
            { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: 'Dr Lee AM' },
            { from: 13 * 60, to: 17 * 60, class: 'doctor-1', label: 'Dr Lee PM' }
          ],
          'dr-kim': { from: 10 * 60, to: 19 * 60, class: 'doctor-2', label: 'Late shift' }
        }
      }
    }
  template(#code-css).
    .vuecal__schedule.doctor--lee {background-color: rgba(192, 235, 255, 0.32);}
    .vuecal__schedule.doctor--kim {background-color: rgba(255, 221, 235, 0.28);}
    .vuecal__schedule.doctor--lab {background-color: rgba(222, 255, 229, 0.28);}
    .vuecal__schedule--heading {font-size: 14px;font-weight: 600;}
    .vuecal__special-hours.clinic-hours {background-color: rgba(255, 235, 59, 0.18);}
    .vuecal__special-hours.doctor-1 {background-color: rgba(76, 175, 80, 0.18);}
    .vuecal__special-hours.doctor-2 {background-color: rgba(63, 81, 181, 0.18);}
    .vuecal__special-hours.doctor-3 {background-color: rgba(156, 39, 176, 0.18);}
    .vuecal__event.health {background-color: rgba(87, 206, 169, 0.82);border-color: rgba(76, 175, 80, 0.45);}
    .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.85);border-color: rgba(233, 136, 46, 0.55);}

  vue-cal(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :views="['day', 'week']"
    :time-from="7 * 60"
    :time-to="21 * 60"
    editable-events
    :events="scheduleEvents"
    :schedules="exSchedules.schedules"
    :special-hours="currentScheduleSpecialHours"
    :style="scheduleCalendarStyles")
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, stringToDate } from '@/vue-cal'

const store = useAppStore()

const exSpecialHours = reactive({
  variant: 'simpleBusinessHours',
  choices: [
    { value: 'simpleBusinessHours', label: 'Simple Business Hours' },
    { value: 'doctorHours', label: 'Doctor Shifts' }
  ],
  simpleBusinessHours: {
    mon: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
    tue: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
    wed: [
      { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
      { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
    ],
    thu: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
    fri: { from: 9 * 60, to: 18 * 60, class: 'business-hours' }
  },
  doctorHours: {
    mon: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Full day shift</em>' },
    tue: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><br><em>Full day shift</em>' },
    wed: [
      { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Morning shift</em>' },
      { from: 14 * 60, to: 19 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><br><em>Afternoon shift</em>' }
    ],
    thu: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Full day shift</em>' },
    fri: { from: 9 * 60, to: 18 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><br><em>Full day shift</em>' },
    sat: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><br><em>Full day shift</em>' },
    sun: { from: 7 * 60, to: 20 * 60, class: 'closed', label: '<strong>Closed</strong>' }
  }
})

const currentSpecialHours = computed(() => exSpecialHours[exSpecialHours.variant])

const scheduleEvents = [
  {
    start: '2018-11-19 08:30',
    end: '2018-11-19 10:00',
    title: 'Rounds',
    content: '<i class="w-icon mdi mdi-stethoscope"></i>',
    class: 'health',
    schedule: 'dr-lee'
  },
  {
    start: '2018-11-19 11:00',
    end: '2018-11-19 12:00',
    title: 'Consultation',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 'dr-kim'
  },
  {
    start: '2018-11-19 14:00',
    end: '2018-11-19 17:00',
    title: 'Tests',
    content: '<i class="w-icon mdi mdi-flask-outline"></i>',
    class: 'leisure',
    schedule: 'lab'
  },
  {
    start: '2018-11-20 09:00',
    end: '2018-11-20 10:30',
    title: 'Ward round',
    content: '<i class="w-icon mdi mdi-stethoscope"></i>',
    class: 'health',
    schedule: 'dr-lee'
  },
  {
    start: '2018-11-20 13:00',
    end: '2018-11-20 15:00',
    title: 'Urgent care',
    content: '<i class="w-icon mdi mdi-ambulance"></i>',
    class: 'health',
    schedule: 'dr-kim'
  },
  {
    start: '2018-11-21 10:00',
    end: '2018-11-21 12:30',
    title: 'Screening',
    content: '<i class="w-icon mdi mdi-microscope"></i>',
    class: 'leisure',
    schedule: 'lab'
  },
  {
    start: '2018-11-22 13:30',
    end: '2018-11-22 16:00',
    title: 'Check-up',
    content: '<i class="w-icon mdi mdi-heart-pulse"></i>',
    class: 'health',
    schedule: 'dr-lee'
  },
  {
    start: '2018-11-23 18:00',
    end: '2018-11-23 20:00',
    title: 'Late consultation',
    content: '<i class="w-icon mdi mdi-clock-outline"></i>',
    class: 'health',
    schedule: 'dr-kim'
  }
]

const sharedScheduleHours = {
  mon: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: 'Clinic open' },
  tue: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: 'Clinic open' },
  wed: [
    { from: 8 * 60, to: 12 * 60, class: 'clinic-hours', label: 'Clinic open' },
    { from: 13 * 60, to: 18 * 60, class: 'clinic-hours', label: 'Clinic open' }
  ],
  thu: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: 'Clinic open' },
  fri: { from: 8 * 60, to: 16 * 60, class: 'clinic-hours', label: 'Clinic closes early' }
}

const scheduleSpecificHours = {
  mon: {
    default: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: 'Clinic open' },
    schedules: {
      'dr-lee': [
        { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: '<strong>Dr Lee</strong><br><em>Morning clinic</em>' },
        { from: 13 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Dr Lee</strong><br><em>Afternoon clinic</em>' }
      ],
      'dr-kim': { from: 10 * 60, to: 19 * 60, class: 'doctor-2', label: '<strong>Dr Kim</strong><br><em>Late shift</em>' }
    }
  },
  tue: {
    default: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: 'Clinic open' },
    schedules: {
      'dr-lee': { from: 8 * 60, to: 14 * 60, class: 'doctor-1', label: '<strong>Dr Lee</strong><br><em>Half day</em>' }
    }
  },
  wed: {
    default: [
      { from: 8 * 60, to: 12 * 60, class: 'clinic-hours', label: 'Clinic open' },
      { from: 13 * 60, to: 18 * 60, class: 'clinic-hours', label: 'Clinic open' }
    ],
    schedules: {
      lab: [
        { from: 7 * 60, to: 11 * 60, class: 'doctor-3', label: '<strong>Lab</strong><br><em>Prep</em>' },
        { from: 12 * 60, to: 17 * 60, class: 'doctor-3', label: '<strong>Lab</strong><br><em>Testing</em>' }
      ]
    }
  },
  thu: { default: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: 'Clinic open' } },
  fri: {
    default: { from: 8 * 60, to: 16 * 60, class: 'clinic-hours', label: 'Clinic closes early' },
    schedules: {
      'dr-kim': { from: 12 * 60, to: 20 * 60, class: 'doctor-2', label: '<strong>Dr Kim</strong><br><em>Extended shift</em>' }
    }
  }
}

const exSchedules = reactive({
  hoursMode: 'perSchedule',
  widthMode: 'wideSchedules',
  hoursChoices: [
    { value: 'none', label: 'Off' },
    { value: 'shared', label: 'Shared Hours' },
    { value: 'perSchedule', label: 'Per Schedule' }
  ],
  widthChoices: [
    { value: 'fit', label: 'Fit' },
    { value: 'wideCells', label: 'Wider Day' },
    { value: 'wideSchedules', label: 'Wider Schedules' }
  ],
  schedules: [
    { id: 'dr-lee', class: 'doctor doctor--lee', label: 'Dr Lee' },
    { id: 'dr-kim', class: 'doctor doctor--kim', label: 'Dr Kim', hide: false },
    { id: 'lab', class: 'doctor doctor--lab', label: 'Lab' }
  ]
})

const currentScheduleSpecialHours = computed(() => {
  if (exSchedules.hoursMode === 'none') return {}
  if (exSchedules.hoursMode === 'shared') return sharedScheduleHours
  return scheduleSpecificHours
})

const scheduleCalendarStyles = computed(() => {
  const styles = { height: '620px' }

  if (exSchedules.widthMode === 'wideCells') styles['--vuecal-min-cell-size'] = '24rem'
  if (exSchedules.widthMode === 'wideSchedules') styles['--vuecal-min-schedule-size'] = '13rem'

  return styles
})
</script>

<style lang="scss">
.main--examples-schedules {
  .example--special-hours {
    .business-hours {background-color: #00daff21;}

    .vuecal__special-hours {
      text-align: center;

      &.doctor-1 {background-color: hsl(127deg 43% 60% / 15%);color: hsl(127, 50%, 67%);}
      &.doctor-2 {background-color: hsl(217deg 43% 60% / 15%);color: hsl(217, 80%, 67%);}
      &.doctor-3 {background-color: hsl(287deg 43% 60% / 15%);color: hsl(287, 80%, 67%);}
      &.closed {
        background: repeating-linear-gradient(-45deg, rgba(#fff, 0) 0 6px, rgba(#ffa257, 0.15) 6px 20px);
        color: hsl(27, 90%, 63%);
      }

      em {font-size: 0.9em;color: #999;line-height: 1.15;}
    }
  }

  .example--schedules {
    .vuecal__schedule.doctor--lee {background-color: rgba(192, 235, 255, 0.32);}
    .vuecal__schedule.doctor--kim {background-color: rgba(255, 221, 235, 0.28);}
    .vuecal__schedule.doctor--lab {background-color: rgba(222, 255, 229, 0.28);}
    .vuecal__schedule--heading {color: rgba(0, 0, 0, 0.55);font-size: 14px;font-weight: 600;}
    .vuecal__special-hours {text-align: center;}
    .vuecal__special-hours.clinic-hours {background-color: rgba(255, 235, 59, 0.18);}
    .vuecal__special-hours.doctor-1 {background-color: rgba(76, 175, 80, 0.18);color: #2f7d32;}
    .vuecal__special-hours.doctor-2 {background-color: rgba(63, 81, 181, 0.18);color: #3146a6;}
    .vuecal__special-hours.doctor-3 {background-color: rgba(156, 39, 176, 0.18);color: #7b1fa2;}
    .vuecal__special-hours em {font-size: 0.82em;color: rgba(0, 0, 0, 0.6);}
    .vuecal__event {color: #fff;border: 1px solid transparent;}
    .vuecal__event.health {background-color: rgba(87, 206, 169, 0.82);border-color: rgba(76, 175, 80, 0.45);}
    .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.85);border-color: rgba(233, 136, 46, 0.55);}
  }
}
</style>
