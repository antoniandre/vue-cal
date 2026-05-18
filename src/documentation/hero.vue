<template lang="pug">
.hero(:class="{ ready }")
  .mb10.tagline
    .title2.grey-dark1 Go for the date picker...
    .title1.text-right.shiny-text.ml12.mt3.lh0 or unleash the full potential!
  .w-flex.wrap.align-center.justify-center.hero-calendars
    .datepicker-wrap.ma4
      //- Date picker.
      vue-cal.vuecal--date-picker.demo(
        date-picker
        view="month"
        v-model:selected-date="selectedDate"
        @update:selected-date="viewDate = $event"
        :view-date="viewDate"
        :views-bar="false"
        :dark="store.darkMode"
        style="height: 225px")
      .code.base-color.transparent--bg.mt2.text-center(style="font-size: 12px").
        Selected date: {{ formatDate(selectedDate) }}

    .grow.mx2(style="max-width: 800px")
      //- Full-power calendar.
      vue-cal.demo.full-cal(
        v-model:selected-date="selectedDate"
        v-model:view-date="viewDate"
        :time-from="9 * 60"
        :time-step="20"
        :time-to="18 * 60"
        :time-cell-height="25"
        :schedules="demoExample.schedules"
        :editable-events="demoExample.editable"
        :events="demoExample.events"
        :dark="store.darkMode"
        style="height: 450px")
        template(#schedule-heading="{ schedule, view }")
          w-icon.mr1(:color="schedule.color" size="15") mdi mdi-account
          strong(:style="`color: ${schedule.color}`") {{ schedule.label }}
      .w-flex.justify-end.wrap.mt2
        a.w-flex.justify-end.grey-light1(
          href="https://github.com/antoniandre/vue-cal/blob/master/src/documentation/hero.vue"
          target="_blank")
          | View this example source code
          w-icon.ml1(color="grey lighten-1") mdi mdi-open-in-new
  .bg
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAppStore } from '@/store'
import { VueCal, formatDate, addDays } from '@/vue-cal'

const store = useAppStore()
const ready = ref(false)

const demoExample = ref({
  schedules: [{ label: 'Dr. John', class: 'john' }, { label: 'Dr. Kate', class: 'kate' }],
  editable: { drag: true, resize: true, create: true, delete: true },
  events: []
})

const selectedDate = ref(new Date())
const viewDate = ref(new Date())

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

onMounted(() => setTimeout(() => (ready.value = ready), 400))
</script>

<style lang="scss">
@use 'sass:color';

$john: #40bfa8;
$kate: #406fbf;

.page--home {
  .top-bar {
    transform: scale(1.2);
    opacity: 0;
    filter: blur(50px);
    transition: 1.5s ease-in-out;
  }

  .ready .top-bar {
    transform: none;
    opacity: 1;
    filter: none;
  }
}

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
    opacity: 0;
    transform: translateX(-0.5rem);
    filter: blur(20px);
    transform-origin: left;
    transition: 0.5s 1s ease-in-out, transform 2s 1s ease-in-out;

    .title1 {
      letter-spacing: normal;
      opacity: 0;
      transition: 1s 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      transform: translateY(0.4rem) scale(0.9);
      color: color-mix(in srgb, var(--w-primary-color) 85%, transparent);
    }
    [data-theme="light"] & .title1 {color: color-mix(in srgb, var(--w-primary-color) 55%, white 30%);}
  }

  .hero-calendars {
    position: relative;
    opacity: 0;
    transform: scale(1.5);
    filter: blur(40px);
    transition: 1s 2s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .bg {
    position: absolute;
    inset: 0;
    background-image: conic-gradient(from 180deg at 50% 50%, #83afff 130deg, 270deg, #00ebeb);
    filter: blur(80px);
    border-radius: 1000em;
    transform: scale(0.5);
    opacity: 0;
    transition: 1s 2.2s ease-in-out;
    z-index: -1;
  }
  [data-theme="light"] .bg {
    background-image: conic-gradient(from 180deg at 50% 50%, #6db8ff 130deg, 270deg, #00ffff);
    filter: blur(80px);
  }
}

.hero.ready {
  .tagline {
    filter: none;
    opacity: 1;
    transform: translateX(0);

    .title1 {opacity: 1;transform: translateY(0);}
  }

  .hero-calendars {
    opacity: 1;
    transform: scale(1);
    filter: none;
  }

  .bg {transform: scale(0.75);opacity: 0.15;}
  [data-theme="light"] .bg {opacity: 0.25;}
}

.demo {
  border-radius: 6px;
  background: var(--w-base-bg-color);

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
  &.full-cal .vuecal__schedule--heading {
    color: color-mix(in srgb, var(--w-base-color) 50%, transparent);
    font-weight: 500;
    opacity: 0.8;
  }
  .vuecal__schedule--heading .w-icon {color: inherit;}

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
  .vuecal__schedule--heading.john {color: $john;}
  .john .vuecal__event {
    background-color: color.adjust($john, $lightness: 40%);
    color: color.adjust($john, $lightness: -10%, $saturation: -20%);
  }
  .john .vuecal__event--background {
    background: repeating-linear-gradient(45deg, transparent 0 10px, rgba($john, 0.06) 10px 20px);
    color: transparent;
  }

  // Kate.
  .vuecal__body .kate {background-color: rgba($kate, 0.04);}
  .vuecal__schedule--heading.kate {color: $kate;}
  .kate .vuecal__event {
    background-color: color.adjust($kate, $lightness: 40%);
    color: color.adjust($kate, $lightness: -10%, $saturation: -20%);
  }
  .kate .vuecal__event--background {
    background: repeating-linear-gradient(45deg, transparent 0 10px, rgba($kate, 0.06) 10px 20px);
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

.shiny-text {
  position: relative;
  display: inline-flex;
  color: transparent;
  background: linear-gradient(90deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
  background-size: 200% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  animation: shiny-text 10s infinite linear;
}

@keyframes shiny-text {
  0% {background-position: 0% 50%;}
  100% {background-position: 200% 50%;}
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
  .hero .vuecal__schedule--heading strong {display: none;}
}
</style>
