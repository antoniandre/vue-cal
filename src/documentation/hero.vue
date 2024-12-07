<template lang="pug">
.hero
  .mb10.tagline
    .title2.grey-dark1 Go for the date picker...
    .title1.text-right.primary-dark1 or unleash the full potential!
  .w-flex.wrap.align-center.justify-center.hero-calendars
    .datepicker-wrap.ma4
      //- Date picker.
      vue-cal.vuecal--date-picker.demo(
        :dark="store.darkMode"
        date-picker
        v-model:view="month"
        v-model:selected-date="selectedDate"
        :views-bar="false"
        :transitions="false"
        :events="demoExample.events"
        @cell-click="selectedDate = $event")
      .code.base-color.transparent--bg.mt2.text-center(style="font-size: 12px").
        Selected date: {{ formatDate(selectedDate) }}

    .grow.mx2(style="max-width: 800px")
      //- Full-power calendar.
      vue-cal.demo.full-cal(
        :dark="store.darkMode"
        hide-weekends
        :selected-date="selectedDate"
        :time-from="9 * 60"
        :time-step="20"
        :time-to="18 * 60"
        :time-cell-height="25"
        :schedules="demoExample.schedules"
        :editable-events="demoExample.editable"
        :events="demoExample.events"
        @cell-focus="selectedDate = $event.date || $event"
        style="height: 450px")
        template(#schedule-label="{ schedule, view }")
          w-icon(:color="schedule.color" size="20") mdi mdi-account
          strong(:style="`color: ${schedule.color}`") {{ schedule.label }}
      .w-flex.justify-end.wrap.mt2
        a.w-flex.justify-end.grey-light1(
          href="https://github.com/antoniandre/vue-cal/blob/master/src/documentation/hero.vue"
          target="_blank")
          | View this example source code
          w-icon.ml1(color="grey lighten-1") mdi mdi-open-in-new
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, formatDate, addDays } from '@/vue-cal'

const store = useAppStore()

const demoExample = ref({
  schedules: [{ label: 'Dr. John', class: 'john' }, { label: 'Dr. Kate', class: 'kate' }],
  editable: { title: false, drag: true, resize: true, create: true, delete: true },
  events: []
})

const selectedDate = new Date()

// Get the Monday of the real time current week.
const previousFirstDayOfWeek = computed(() => {
  return new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7))
})

// Place all the events in the real time current week.
for (let i = 0; i < 5; i++) {
  const day = formatDate(addDays(previousFirstDayOfWeek.value, i))

  demoExample.value.events.push(
    {
      start: `${day} 12:00`,
      end: `${day} 13:00`,
      title: 'LUNCH',
      class: 'lunch',
      background: true,
      deletable: false,
      resizable: false,
      schedule: 1
    },
    {
      start: `${day} 12:00`,
      end: `${day} 13:00`,
      title: 'LUNCH',
      class: 'lunch',
      background: true,
      deletable: false,
      resizable: false,
      schedule: 2
    }
  )
}

const monday = formatDate(previousFirstDayOfWeek.value)
const tuesday = formatDate(addDays(previousFirstDayOfWeek.value, 1))
const thursday = formatDate(addDays(previousFirstDayOfWeek.value, 3))
const friday = formatDate(addDays(previousFirstDayOfWeek.value, 4))

demoExample.value.events.push(
  {
    start: `${monday} 15:30`,
    end: `${monday} 17:30`,
    title: 'Health Checkup',
    content: '<i class="w-icon mdi mdi-stethoscope mt1"></i>',
    resizable: false,
    schedule: 1
  },
  {
    start: `${monday} 14:30`,
    end: `${monday} 16:30`,
    title: 'Hip Surgery',
    content: '<i class="w-icon mdi mdi-knife mt1"></i>',
    resizable: false,
    schedule: 2
  },
  {
    start: `${tuesday} 08:00`,
    end: `${tuesday} 10:00`,
    title: 'Eye Surgery',
    content: '<i class="w-icon mdi mdi-knife mt1"></i>',
    resizable: false,
    schedule: 2
  },
  {
    start: `${thursday} 09:00`,
    end: `${thursday} 11:30`,
    title: 'Follow Up',
    content: '<i class="w-icon mdi mdi-stethoscope mt2"></i>',
    resizable: false,
    schedule: 1
  },
  {
    start: `${friday} 16:30`,
    end: `${friday} 18:30`,
    title: 'Eye Surgery',
    content: '<i class="w-icon mdi mdi-knife mt1"></i>',
    resizable: false,
    schedule: 2
  }
)
</script>

<style lang="scss">
@use 'sass:color';

$john: #40bfa8;
$kate: #406fbf;

.hero {
  position: relative;
  padding-bottom: 8rem;
  margin-bottom: 8rem;

  // Section separation at the bottom.
  &:before, &:after {
    content: '';
    position: absolute;
    bottom: 5px;
    left: 50%;
    width: 100%;
    max-width: 250px;
    border-bottom: 4px solid var(--w-primary-color);
    border-radius: 99em;
    transform: translateX(-50%);
  }
  &:after {
    bottom: 0;
    border-bottom: 2px solid color-mix(in srgb, var(--w-contrast-bg-color) 80%, transparent);
  }

  .tagline {
    max-width: 500px;
    margin: 0 auto 5rem;

    .title1 {letter-spacing: normal;}
  }

  .hero-calendars {position: relative;}
}

.demo {
  border-radius: 4px;

  // Date picker.
  &.vuecal--date-picker .vuecal__cell-events-count {
    width: 4px;
    height: 4px;
    min-width: 0;
    padding: 0;
    margin-top: 4px;
    color: transparent;
    background-color: $john;
  }
  &.vuecal--date-picker .vuecal__cell--selected .vuecal__cell-events-count {background-color: #fff;}

  // Both calendars.
  .vuecal__cell--out-of-scope {color: rgba(0, 0, 0, 0.15);}

  // Full power calendar.
  // ------------------------------------------------------
  &.full-cal .vuecal__menu {background-color: transparent;}
  .vuecal__view-btn {
    background: none;
    padding: 0 10px;
    margin: 4px 2px;
    border-radius: 30px;
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    text-transform: uppercase;
    border: none;
    color: inherit;

    &--active {
      background: rgb(66, 185, 130);
      color: #fff;
    }
  }
  &.full-cal .vuecal__weekday {
    color: color-mix(in srgb, var(--w-base-color) 50%, transparent);
    font-weight: 500;
  }
  .vuecal__weekday .w-icon {color: inherit;}

  .vuecal__event {
    border-color: color-mix(in srgb, currentColor 20%, transparent);
    text-align: center;
  }

  .vuecal__event-time {
    margin: 3px 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
    white-space: unset;
  }

  // John.
  .vuecal__body .john {background-color: rgba($john, 0.04);}
  .vuecal__weekday .john {color: $john;}
  .john .vuecal__event {
    background-color: color.adjust($john, $lightness: 40%);
    color: color.adjust($john, $lightness: -10%, $saturation: -20%);
  }
  .john .vuecal__event--background {
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($john, 0.06) 10px, rgba($john, 0.06) 20px);
    color: transparent;
  }

  // Kate.
  .vuecal__body .kate {background-color: rgba($kate, 0.04);}
  .vuecal__weekday .kate {color: $kate;}
  .kate .vuecal__event {
    background-color: color.adjust($kate, $lightness: 40%);
    color: color.adjust($kate, $lightness: -10%, $saturation: -20%);
  }
  .kate .vuecal__event--background {
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($kate, 0.06) 10px, rgba($kate, 0.06) 20px);
    color: transparent;
  }
  // ------------------------------------------------------

  [data-theme="dark"] & {
    .kate .vuecal__event:not(.vuecal__event--background) {
      background-color: rgba(139, 172, 229, 0.15);
      color: #b9cff5;
    }
    .john .vuecal__event:not(.vuecal__event--background) {
      background-color: rgba(131, 217, 201, 0.15);
      color: #a2dfd4;
    }
  }
}

// Media queries.
// --------------------------------------------------------
@media screen and (max-width: $sm) {
  .datepicker-wrap {
    position: absolute;
    z-index: 3;
    background-color: var(--w-base-bg-color);
    border-radius: 6px;
    bottom: -60px;
    left: -32px;

    .vuecal {box-shadow: 0 0 12px rgba(#000, 0.12);}
  }
}

@media screen and (max-width: 499px) {
  .datepicker-wrap {display: none;}
  .hero .schedule-header strong {display: none;}
}
</style>
