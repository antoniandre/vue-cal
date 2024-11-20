<template lang="pug">
//- Example.
example(title="Internationalization" anchor="internationalization")
  template(#desc)
    p.
      Let you translate the calendar texts into your own language (#[span.code locale]).#[br]
      Refer to the #[span.code locale] option in the #[a(href="#api") API] section to know more or if you want to provide a translation.#[br]
      Try it in Codepen: #[a(href="https://codepen.io/antoniandre/pen/dxXvwv" target="_blank") Vue Cal - Internationalization].
    .w-flex.no-grow.align-center.wrap
      w-icon.mr2(color="primary") mdi mdi-translate
      span.mr2 Current language:
      w-select.pa0.mla.no-grow(
        v-model="locale"
        :items="locales"
        item-value-key="code"
        style="width: 200px")
        template(#selection="{ item }")
          span.mr2 {{ item.label }}
          w-tag.code.ma0(bg-color="grey-light5" round) {{ item.code }}

  template(#code-html).
    &lt;vue-cal :time="false" small view="year" locale="{{ locale }}" /&gt;

  vue-cal(
    :time="false"
    small
    view="year"
    :locale="locale"
    @ready="overrideDateTexts"
    :dark="store.darkMode"
    style="width: 500px;height: 340px;max-width: 100%")

  template(#desc2)
    h4 Alternative
    p.
      If you need full control on the texts, you can alternatively provide an object containing all the
      texts (start from the locale JSON file matching your language).#[br]
      Keep in mind this is not the recommended way: texts may be added / modified / removed in the library
      and your provided custom texts may not work anymore.#[br]
      Always prefer the standard locales!



//- Example.
example(title="Timeline & Business Hours" anchor="timeline")
  template(#desc)
    p.
      Timelines are only visible on #[span.code week] and #[span.code day] views.#[br]
      This example has a set time range from #[code 08:00] to #[code 19:00], time step of #[code 30] minutes (1 hour by default),
      24-hour format, and hidden weekends.

  template(#code-html).
    &lt;!-- Time-start time-end &amp; time-step are expected in minutes. --&gt;
    &lt;vue-cal
      :time-from="8 * 60"
      :time-to="19 * 60"
      :time-step="30"
      hide-weekends /&gt;

  vue-cal(
    :dark="store.darkMode"
    :time-from="8 * 60"
    :time-to="19 * 60"
    :time-step="30"
    hide-weekends
    style="height: 450px")

//- Example.
example(title="Special Hours (or Business Hours)" anchor="special-hours")
  template(#desc)
    p.
      The special hours are visible on #[span.code week] and #[span.code day] views and allow
      you to highlight a particular time range on each day of the week individually.#[br]
    alert.
      Refer to the #[a(href="#api") API] section to read more about the
      #[span.code special-hours] option.

  template(#code-html).
    &lt;vue-cal
      :views="['day', 'week']"
      :time-from="8 * 60"
      :time-to="20 * 60"
      :special-hours="specialHours" /&gt;
  template(#code-js).
    // `from` and `to` are expected in minutes.
    const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' }

    // In your component's data, special hours from Monday to Friday.
    // Note that you can provide an array of multiple blocks for the same day.
    specialHours: {
      mon: dailyHours,
      tue: dailyHours,
      wed: [
        { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
        { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
      ],
      thu: dailyHours,
      fri: dailyHours
    }
  template(#code-css).
    .business-hours {
      background-color: rgba(255, 255, 0, 0.15);
      border: solid rgba(255, 210, 0, 0.3);
      border-width: 2px 0;
    }

  vue-cal.ex--special-hours(
    :dark="store.darkMode"
    :time-from="8 * 60"
    :time-to="20 * 60"
    :views="['day', 'week']"
    :special-hours="specialHours"
    style="height: 450px")

  template(#desc2)
    p With the same principle, you could also build a lot more complex layout such as the following one.
    vue-cal.ex--doctor-hours(
      :dark="store.darkMode"
      :views="['day', 'week']"
      :time-from="7 * 60"
      :time-to="20 * 60"
      :special-hours="specialDoctorHours"
      style="height: 550px")
    ssh-pre(language="html-vue" :dark="store.darkMode").
      &lt;vue-cal
        :views="['day', 'week']"
        :time-from="7 * 60"
        :time-to="20 * 60"
        :special-hours="specialHours" /&gt;
    ssh-pre(language="js" :dark="store.darkMode").
      // In your component's data, special hours from Monday to Sunday (1 to 7).
      // Note that you can provide an array of multiple blocks for the same day.
      specialHours: {
        mon: {
          from: 8 * 60,
          to: 17 * 60,
          class: 'doctor-1',
          label: '<strong>Doctor 1</strong><br><em>Full day shift</em>'
        },
        tue: {
          from: 9 * 60,
          to: 18 * 60,
          class: 'doctor-2',
          label: '<strong>Doctor 2</strong><br><em>Full day shift</em>'
        },
        wed: [
          {
            from: 8 * 60,
            to: 12 * 60,
            class: 'doctor-1',
            label: '<strong>Doctor 1</strong><br><em>Morning shift</em>'
          },
          {
            from: 14 * 60,
            to: 19 * 60,
            class: 'doctor-3',
            label: '<strong>Doctor 3</strong><br><em>Afternoon shift</em>'
          }
        ],
        thu: {
          from: 8 * 60,
          to: 17 * 60,
          class: 'doctor-1',
          label: '<strong>Doctor 1</strong><br><em>Full day shift</em>'
        },
        fri: {
          from: 9 * 60,
          to: 18 * 60,
          class: 'doctor-3',
          label: '<strong>Doctor 3</strong><br><em>Full day shift</em>'
        },
        sat: {
          from: 9 * 60,
          to: 18 * 60,
          class: 'doctor-2',
          label: '<strong>Doctor 2</strong><br><em>Full day shift</em>'
        },
        sun: {
          from: 7 * 60,
          to: 20 * 60,
          class: 'closed',
          label: '<strong>Closed</strong>'
        }
      }
    ssh-pre(language="css" :dark="store.darkMode").
      .vuecal__special-hours {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;

        em {font-size: 0.9em;color: #999;}
      }

      .doctor-1 {background-color: #f0fff1;color: #81d58b;}
      .doctor-2 {background-color: #f0f6ff;color: #689bee;}
      .doctor-3 {background-color: #fcf0ff;color: #d168ee;}
      .closed {
        background:
          #fff7f0
          repeating-linear-gradient(
            -45deg,
            rgba(255, 162, 87, 0.25),
            rgba(255, 162, 87, 0.25) 5px,
            rgba(255, 255, 255, 0) 5px,
            rgba(255, 255, 255, 0) 15px
          );
        color: #f6984c;
      }


//- Example.
example(title="schedules &amp; schedule events" anchor="schedules")
  template(#desc)
  template(#code-html).
.mb6
  | Split each day into multiple containers passing a CSS class &amp; a label per schedule, and allow schedule-specific events.
  br
  br
  | By default the body of the calendar will fit the container.#[br]
  | But with the options #[span.code min-cell-width] or #[span.code min-schedule-width], you can increase the calendar
  | body width and it will become scrollable horizontally.
  ul
    li #[span.code min-cell-width] will only be activated on week view, since there is only 1 cell in day view.
    li If both #[span.code min-cell-width] and #[span.code min-schedule-width] are set, #[span.code min-schedule-width] will be used.

  | #[br]You can also use the option #[span.code sticky-schedule-labels] to place the schedule labels in the header.#[br]#[br]

  | You can toggle the schedules thanks to the #[span.code hide] property of each schedule in #[span.code schedules].#[br]#[br]

  | Refer to the #[span.code min-cell-width], #[span.code min-schedule-width] and #[span.code schedules] option in the #[a(href="#api") API] section.#[br]#[br]

  .w-flex.align-center.wrap
    w-button.px2.mr2.my1(
      :outline="!schedulesExample.minCellWidth"
      @click="schedulesExample.minCellWidth = schedulesExample.minCellWidth ? 0 : 400")
      w-icon.mr2 mdi mdi-{{ schedulesExample.minCellWidth ? 'close' : 'plus' }}
      | {{ schedulesExample.minCellWidth ? `Min cell width: ${schedulesExample.minCellWidth}px` : 'Add min cell width' }}

    w-button.px2.mr2.my1(
      :outline="!schedulesExample.minScheduleWidth"
      @click="schedulesExample.minScheduleWidth = schedulesExample.minScheduleWidth ? 0 : 200")
      w-icon.mr2 mdi mdi-{{ schedulesExample.minScheduleWidth ? 'close' : 'plus' }}
      | {{ schedulesExample.minScheduleWidth ? `Min schedule width: ${schedulesExample.minScheduleWidth}px` : 'Add min schedule width' }}

    w-button.px2.mr2.my1(
      :outline="!schedulesExample.stickyScheduleLabels"
      @click="schedulesExample.stickyScheduleLabels = !schedulesExample.stickyScheduleLabels")
      w-icon.mr2 mdi mdi-{{ schedulesExample.stickyScheduleLabels ? 'close' : 'plus' }}
      | Sticky Schedule Labels

    w-button.px2.my1(
      :outline="schedulesExample.schedules[1].hide"
      @click="schedulesExample.schedules[1].hide = !schedulesExample.schedules[1].hide")
      w-icon.mr2 mdi mdi-{{ schedulesExample.schedules[1].hide ? 'plus' : 'close' }}
      | {{ schedulesExample.schedules[1].hide ? 'Show' : 'Hide' }} Dad

.example.grow.my2(style="height: 600px")
  vue-cal(
    :dark="store.darkMode"
    :selected-date="stringToDate('2018-11-19')"
    :time-from="8 * 60"
    :time-step="30"
    :views="['day', 'week', 'month']"
    editable-events
    :events="scheduleEvents"
    :schedules="schedulesExample.schedules"
    :sticky-schedule-labels="schedulesExample.stickyScheduleLabels"
    :min-cell-width="schedulesExample.minCellWidth"
    :min-schedule-width="schedulesExample.minScheduleWidth")
ssh-pre(language="html-vue" :dark="store.darkMode").
  &lt;button @click="minCellWidth = minCellWidth ? 0 : 400"&gt;
    {{ '\{\{ minCellWidth ? \'min cell width: 400px\' : \'Add min cell width\' \}\}' }}
  &lt;/button&gt;
  &lt;button @click="minScheduleWidth = minScheduleWidth ? 0 : 200"&gt;
    {{ '\{\{ minScheduleWidth ? \'min schedule width: 200px\' : \'Add min schedule width\' \}\}' }}
  &lt;/button&gt;
  &lt;button @click="stickyScheduleLabels = !stickyScheduleLabels"&gt;
    Sticky Schedule Labels
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
    :sticky-schedule-labels="stickyScheduleLabels"
    :min-cell-width="minCellWidth"
    :min-schedule-width="minScheduleWidth"&gt;
  &lt;/vue-cal&gt;

ssh-pre(language="js" :dark="store.darkMode").
  data: () => ({
    stickyScheduleLabels: false,
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

ssh-pre(language="css" :dark="store.darkMode").
  /* You can easily set a different style for each schedule of your days. */
  .vuecal__cell-schedule.dad {background-color: rgba(221, 238, 255, 0.5);}
  .vuecal__cell-schedule.mom {background-color: rgba(255, 232, 251, 0.5);}
  .vuecal__cell-schedule.kid1 {background-color: rgba(221, 255, 239, 0.5);}
  .vuecal__cell-schedule.kid2 {background-color: rgba(255, 250, 196, 0.5);}
  .vuecal__cell-schedule.kid3 {background-color: rgba(255, 206, 178, 0.5);}
  .vuecal__cell-schedule .schedule-label {color: rgba(0, 0, 0, 0.1);font-size: 26px;}

  /* Different color for different event types. */
  .vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
  .vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
  .vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, stringToDate } from '@/vue-cal'

const store = useAppStore()

// import EnUs from '@/vue-cal/i18n/en-us.json'
// addDatePrototypes()
const locales = inject('locales')
const locale = ref('zh-cn')
const vuecalEl = ref(null)

const overrideDateTexts = () => {
  // In Vue Cal documentation Chinese texts are loaded last.
  // Override Date texts with english for prototype formatting functions.
  setTimeout(vuecalEl.value.updateDateTexts, 3000)
}

const schedulesExample = ref({
  minCellWidth: 400,
  minScheduleWidth: 0,
  stickyScheduleLabels: false,
  schedules: [
    { id: 1, class: 'mom', label: 'Mom' },
    { id: 2, class: 'dad', label: 'Dad', hide: false },
    { id: 3, class: 'kid1', label: 'Kid 1' },
    { id: 4, class: 'kid2', label: 'Kid 2' },
    { id: 5, class: 'kid3', label: 'Kid 3' }
  ]
})

const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' }
const specialHours = computed(() => ({
  mon: dailyHours,
  tue: dailyHours,
  wed: [
    { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
    { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
  ],
  thu: dailyHours,
  fri: dailyHours
}))

const specialDoctorHours = {
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

const scheduleEvents = [
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
</script>
