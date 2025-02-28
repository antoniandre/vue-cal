<template lang="pug">
//- Example.
example(title="Special Hours (or Business Hours)" anchor="special-hours")
  template(#desc)
    .todo-tag.d-iflex MAKE THIS INTERACTIVE
    p.
      The special hours are visible on #[span.code week] and #[span.code day] views and allow
      you to highlight a particular time range on each day of the week individually.#[br]
      You can also add a label to each block to provide additional information.
    p.
      Note that you can provide an array of multiple blocks for the same day.

    .w-flex.justify-end.gap2
      label Show:
      w-radios(
        v-model="exSpecialHours.businessHoursType"
        :items="exSpecialHours.choices")
        w-icon.mr2 mdi mdi-{{ exSpecialHours.doctorHours ? 'close' : 'plus' }}
  template(#code-html).
    &lt;vue-cal
      :views="['day', 'week']"
      :time-from="7 * 60"
      :time-to="20 * 60"
      :special-hours="specialHours"
    /&gt;
  template(#code-js v-if="exSpecialHours.businessHoursType === 'simpleBusinessHours'").
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
  template(#code-js v-else-if="exSpecialHours.businessHoursType === 'doctorHours'").
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
    template(v-if="exSpecialHours.businessHoursType === 'doctorHours'")
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
      |   em {
      |     font-size: 0.9em;
      |     color: #999;
      |     line-height: 1.15;
      |   }
      | }
    template(v-else)
      | .business-hours {background-color: #00daff21;}

  vue-cal(
    :dark="store.darkMode"
    :views="['day', 'week']"
    :time-from="7 * 60"
    :time-to="20 * 60"
    :special-hours="exSpecialHours[exSpecialHours.businessHoursType]"
    style="height: 550px")

//- Example.
example(title="Schedules & Schedule Events" anchor="schedules")
  template(#desc)
    .todo-tag.d-iflex REDO COLORS
    .todo-tag.d-iflex.ml2 ADD MIN-WIDTH &amp; HIDE DAD
    alert.text-bold This example will be completed soon.
    //- .mb6
      | Split each day into multiple containers passing a CSS class &amp; a label per schedule, and allow schedule-specific events.
      br
      br
      | By default the body of the calendar will fit the container.#[br]
      | But with the options #[span.code min-cell-width] or #[span.code min-schedule-width], you can increase the calendar
      | body width and it will become scrollable horizontally.
      //- ul
        li #[span.code min-cell-width] will only be activated on week view, since there is only 1 cell in day view.
        li If both #[span.code min-cell-width] and #[span.code min-schedule-width] are set, #[span.code min-schedule-width] will be used.

      //- | You can toggle the schedules thanks to the #[span.code hide] property of each schedule in #[span.code schedules].#[br]#[br]

      //- | Refer to the #[span.code min-cell-width], #[span.code min-schedule-width] and #[span.code schedules] option in the #[a(href="#api") API] section.#[br]#[br]

      .w-flex.align-center.wrap
        w-button.px2.mr2.my1(
          :outline="!exSchedules.minCellWidth"
          @click="exSchedules.minCellWidth = exSchedules.minCellWidth ? 0 : 400")
          w-icon.mr2 mdi mdi-{{ exSchedules.minCellWidth ? 'close' : 'plus' }}
          | {{ exSchedules.minCellWidth ? `Min cell width: ${exSchedules.minCellWidth}px` : 'Add min cell width' }}

        w-button.px2.mr2.my1(
          :outline="!exSchedules.minScheduleWidth"
          @click="exSchedules.minScheduleWidth = exSchedules.minScheduleWidth ? 0 : 200")
          w-icon.mr2 mdi mdi-{{ exSchedules.minScheduleWidth ? 'close' : 'plus' }}
          | {{ exSchedules.minScheduleWidth ? `Min schedule width: ${exSchedules.minScheduleWidth}px` : 'Add min schedule width' }}

        w-button.px2.my1(
          :outline="exSchedules.schedules[1].hide"
          @click="exSchedules.schedules[1].hide = !exSchedules.schedules[1].hide")
          w-icon.mr2 mdi mdi-{{ exSchedules.schedules[1].hide ? 'plus' : 'close' }}
          | {{ exSchedules.schedules[1].hide ? 'Show' : 'Hide' }} Dad
  template(#code-html).
    &lt;button @click="minCellWidth = minCellWidth ? 0 : 400"&gt;
      {{ '\{\{ minCellWidth ? \'min cell width: 400px\' : \'Add min cell width\' \}\}' }}
    &lt;/button&gt;
    &lt;button @click="minScheduleWidth = minScheduleWidth ? 0 : 200"&gt;
      {{ '\{\{ minScheduleWidth ? \'min schedule width: 200px\' : \'Add min schedule width\' \}\}' }}
    &lt;/button&gt;
    &lt;button @click="schedules[1].hide = !schedules[1].hide"&gt;
      Show/Hide Dad
    &lt;/button&gt;

    &lt;vue-cal
      :selected-date="stringToDate('2018-11-19')"
      :time-from="8 * 60"
      :time-step="30"
      :views="['day', 'week']"
      editable-events
      :events="events"
      :schedules="schedules"
      :min-cell-width="minCellWidth"
      :min-schedule-width="minScheduleWidth"&gt;
    &lt;/vue-cal&gt;
  template(#code-js).
    data: () => ({
      minCellWidth: 400,
      minScheduleWidth: 0,
      schedules: [
        // The id property is added automatically if none (starting from 1), but you can set a custom one.
        // If you need to toggle the schedules, you must set the id explicitly.
        { id: 1, class: 'mom', label: 'Mom' },
        { id: 2, class: 'dad', label: 'Dad', hide: false },
        { id: 3, class: 'kid1', label: 'Kid 1' },
        { id: 4, class: 'kid2', label: 'Kid 2' },
        { id: 5, class: 'kid3', label: 'Kid 3' }
      ]
      events: [
        {
          start: '2018-11-19 10:35',
          end: '2018-11-19 11:30',
          title: 'Doctor appointment',
          content: '&lt;i class="icon mdi mdi-hospital-box-outline"&gt;&lt;/i&gt;',
          class: 'health',
          schedule: 1 // Has to match the id of the schedule you have set (or integers if none).
        },
        {
          start: '2018-11-19 18:30',
          end: '2018-11-19 19:15',
          title: 'Dentist appointment',
          content: '&lt;i class="icon mdi mdi-hospital-box-outline"&gt;&lt;/i&gt;',
          class: 'health',
          schedule: 2
        },
        {
          start: '2018-11-20 18:30',
          end: '2018-11-20 20:30',
          title: 'Cross-fit',
          content: '&lt;i class="icon mdi mdi-dumbbell"&gt;&lt;/i&gt;',
          class: 'sport',
          schedule: 1
        },
        ...
      ]
    })
  template(#code-css).
    /* You can easily set a different style for each schedule of your days. */
    .vuecal__schedule.dad {background-color: rgba(221, 238, 255, 0.5);}
    .vuecal__schedule.mom {background-color: rgba(255, 232, 251, 0.5);}
    .vuecal__schedule.kid1 {background-color: rgba(221, 255, 239, 0.5);}
    .vuecal__schedule.kid2 {background-color: rgba(255, 250, 196, 0.5);}
    .vuecal__schedule.kid3 {background-color: rgba(255, 206, 178, 0.5);}
    .vuecal__schedule--heading {color: rgba(0, 0, 0, 0.5);font-size: 26px;}

    .vuecal__event {color: #fff;border: 1px solid;}
    .vuecal__event.leisure {background-color: #fd9c42d9;border-color: #e9882e;}
    .vuecal__event.health {background-color: #57cea9cc;border-color: #90d2be;}
    .vuecal__event.sport {background-color: #ff6666d9;border-color: #eb5252;}

  vue-cal(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="8 * 60"
    :time-step="30"
    :views="['day', 'week', 'month']"
    editable-events
    :events="exSchedules.scheduleEvents"
    :schedules="exSchedules.schedules"
    :min-cell-width="exSchedules.minCellWidth"
    :min-schedule-width="exSchedules.minScheduleWidth")

.todo-tag.d-iflex.mt6 ADD EXAMPLE WITH SCHEDULE EVENTS
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, stringToDate } from '@/vue-cal'

const store = useAppStore()

const events = [
  {
    start: '2018-10-30 10:30',
    end: '2018-10-30 11:30',
    title: 'Doctor appointment',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 1
  },
  {
    start: '2018-11-16 10:30',
    end: '2018-11-16 11:30',
    title: 'Doctor appointment',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 1
  },
  {
    start: '2018-11-19 10:35',
    end: '2018-11-19 11:30',
    title: 'Doctor appointment',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 1
  },
  {
    start: '2018-11-19 18:30',
    end: '2018-11-19 19:15',
    title: 'Dentist appointment',
    content: '<i class="w-icon mdi mdi-hospital-box-outline"></i>',
    class: 'health',
    schedule: 2
  },
  {
    start: '2018-11-20 18:30',
    end: '2018-11-20 20:30',
    title: 'Cross-fit',
    content: '<i class="w-icon mdi mdi-dumbbell"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    start: '2018-11-21 11:00',
    end: '2018-11-21 13:00',
    title: 'Brunch with Jane',
    content: '<i class="w-icon mdi mdi-coffee-outline"></i>',
    class: 'leisure',
    schedule: 1,
    background: false
  },
  {
    start: '2018-11-21 19:30',
    end: '2018-11-21 23:00',
    title: 'Swimming lesson',
    content: '<i class="w-icon mdi mdi-pool"></i>',
    class: 'sport',
    schedule: 2
  },
  {
    start: '2018-11-23 12:30',
    end: '2018-11-23 13:00',
    title: 'Macca\'s with Mark',
    content: '<i class="w-icon mdi mdi-food"></i>',
    class: 'leisure',
    schedule: 2
  },
  {
    start: '2018-11-23 21:00',
    end: '2018-11-23 23:30',
    title: 'Movie time',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure',
    schedule: 1
  },
  {
    start: '2018-11-30 21:00',
    end: '2018-11-30 23:30',
    title: 'Another movie tonight',
    content: '<i class="w-icon mdi mdi-ticket"></i>',
    class: 'leisure',
    schedule: 1
  }
]

const exSpecialHours = reactive({
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
  },
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
  choices: [
    { value: 'simpleBusinessHours', label: 'Simple Business Hours' },
    { value: 'doctorHours', label: 'Doctor\'s Hours' }
  ],
  businessHoursType: ref('simpleBusinessHours')
})

const exSchedules = reactive({
  minCellWidth: 400,
  minScheduleWidth: 0,
  schedules: [
    { id: 1, class: 'mom', label: 'Mom' },
    { id: 2, class: 'dad', label: 'Dad', hide: false },
    { id: 3, class: 'kid1', label: 'Kid 1' },
    { id: 4, class: 'kid2', label: 'Kid 2' },
    { id: 5, class: 'kid3', label: 'Kid 3' }
  ],
  scheduleEvents: [
    ...events.map(e => ({ ...e })), // Clone events when reusing, so events are independent.
    {
      start: '2018-11-21 12:00',
      end: '2018-11-21 12:30',
      title: 'Recall Dave',
      content: '<i class="w-icon mdi mdi-coffee-outline"></i>',
      class: 'leisure',
      schedule: 1
    },
    {
      start: '2018-11-21 20:00',
      end: '2018-11-21 22:00',
      title: 'Salsa',
      content: '<i class="w-icon mdi mdi-walk"></i>',
      class: 'sport',
      schedule: 1
    },
    {
      start: '2018-11-23 21:00',
      end: '2018-11-23 23:30',
      title: 'Movie time',
      content: '<i class="w-icon mdi mdi-ticket"></i>',
      class: 'leisure',
      schedule: 2
    }
  ]
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

      em {
        font-size: 0.9em;
        color: #999;
        line-height: 1.15;
      }
    }
  }

  // Schedules example.
  .vuecal__schedule.dad {background-color: rgba(221, 238, 255, 0.5);}
  .vuecal__schedule.mom {background-color: rgba(255, 232, 251, 0.5);}
  .vuecal__schedule.kid1 {background-color: rgba(221, 255, 239, 0.5);}
  .vuecal__schedule.kid2 {background-color: rgba(255, 250, 196, 0.5);}
  .vuecal__schedule.kid3 {background-color: rgba(255, 206, 178, 0.5);}
  .vuecal__schedule--heading {color: rgba(0, 0, 0, 0.5);font-size: 14px;font-weight: 500;}

  .vuecal__time-cell-line.hours:before {border-color: var(--w-primary-color);}

  // Schedules headings example.
  .ex--custom-schedules-headings {
    .schedule-heading {font-size: 11px;}
    .vuecal__body .schedule1 {background-color: rgba(226, 242, 253, 0.7);}
    .vuecal__body .schedule2 {background-color: rgba(232, 245, 233, 0.7);}
    .vuecal__body .schedule3 {background-color: rgba(255, 243, 224, 0.7);}
    .vuecal__body .schedule4 {background-color: rgba(255, 235, 238, 0.7);}
  }
}

// Media queries.
// --------------------------------------------------------
@media screen and (max-width: 800px) {
  .main--examples-schedules {
    .vuecal--week-view.ex--custom-schedules-headings .vuecal__schedule--heading .w-icon {display: none;}
    .ex--custom-schedules-headings .vuecal__schedule--heading strong {
      overflow: hidden;
      width: 0.9em;
      font-size: 13px;
      letter-spacing: 10px;
    }
  }
}
</style>
