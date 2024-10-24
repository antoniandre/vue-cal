<template lang="pug">
.hero
  .mb10.tagline
    .title2.grey-dark1 Go for the date picker...
    .title1.text-right.primary-dark1 or unleash the full potential!
  .w-flex.wrap.align-center.justify-center
    .ma4
      //- Date picker.
      vue-cal.vuecal--date-picker.demo(
        ref="vuecalEl"
        :dark="store.darkMode"
        date-picker
        v-model:view="month"
        v-model:selected-date="selectedDate"
        :views-bar="false"
        :transitions="false"
        :events="demoExample.events"
        @cell-click="selectedDate = $event")
      .code.base-color.transparent--bg.mt2.text-center(style="font-size: 12px").
        Selected date: {{ selectedDate.format() }}

    .grow.mx2(style="max-width: 800px")
      //- Full-power calendar.
      vue-cal.demo.full-cal.vuecal--full-height-delete(
        ref="vuecal2El"
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
      .w-flex.align-center.wrap.mt3
        p Pick your favorite color:
        input.ml1(type="color" @input="e => setThemeColor(e.target.value)" value="#ff0000")
        a.mla.w-flex.justify-end.grey-light1(
          href="https://github.com/antoniandre/vue-cal/blob/master/src/documentation/hero.vue"
          target="_blank")
          | View this example source code
          w-icon.ml1(color="grey lighten-1") mdi mdi-open-in-new
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAppStore } from '@/store'
import EnUs from '@/vue-cal/i18n/fr.json'
import { VueCal, useLocale, addDatePrototypes } from '@/vue-cal'

const store = useAppStore()

useLocale(EnUs)
addDatePrototypes()

const demoExample = ref({
  schedules: [{ label: 'Dr. John', class: 'john' }, { label: 'Dr. Kate', class: 'kate' }],
  editable: { title: false, drag: true, resize: true, create: true, delete: true },
  events: []
})
const vuecalEl = ref(null)
const vuecal2El = ref(null)

const selectedDate = new Date()

// Get the Monday of the real time current week.
const previousFirstDayOfWeek = computed(() => {
  return new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7))
})

// Place all the events in the real time current week.
for (let i = 0; i < 5; i++) {
  const day = previousFirstDayOfWeek.value.addDays(i).format()

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

// Date.format() and Date.addDays() are helper methods added by Vue Cal.
const monday = previousFirstDayOfWeek.value.format()
const tuesday = previousFirstDayOfWeek.value.addDays(1).format()
const thursday = previousFirstDayOfWeek.value.addDays(3).format()
const friday = previousFirstDayOfWeek.value.addDays(4).format()

demoExample.value.events.push(
  {
    start: `${monday} 15:30`,
    end: `${monday} 17:30`,
    title: 'Tennis',
    content: '<i class="w-icon mdi mdi-tennis mt1"></i>',
    resizable: false,
    schedule: 1
  },
  {
    start: `${monday} 15:30`,
    end: `${monday} 17:30`,
    title: 'Tennis',
    content: '<i class="w-icon mdi mdi-tennis mt1"></i>',
    resizable: false,
    schedule: 2
  },
  {
    start: `${tuesday} 08:00`,
    end: `${tuesday} 10:00`,
    title: 'Volleyball',
    content: '<i class="w-icon mdi mdi-volleyball mt1"></i>',
    resizable: false,
    schedule: 2
  },
  {
    start: `${thursday} 09:00`,
    end: `${thursday} 11:30`,
    title: 'Golf',
    content: '<i class="w-icon mdi mdi-golf mt2"></i>',
    resizable: false,
    schedule: 1
  },
  {
    start: `${friday} 16:45`,
    end: `${friday} 18:45`,
    title: 'Movie',
    content: '<i class="w-icon mdi mdi-ticket mt1"></i>',
    resizable: false,
    schedule: 2
  }
)

const setThemeColor = color => {
  vuecalEl.value.$el.style.setProperty('--vuecal-primary-color', color)
  vuecal2El.value.$el.style.setProperty('--vuecal-primary-color', color)
}
</script>

<style lang="scss">
@use 'sass:color';

$john: #a3d0c8;
$kate: #bac8e0;

.hero {
  position: relative;
  height: 850px;
  margin-bottom: 8rem;

  &:before, &:after {
    content: '';
    position: absolute;
    inset: auto 15% 5px;
    border-bottom: 4px solid var(--w-primary-color);
  }
  &:after {
    bottom: 0;
    border-bottom: 2px solid rgba(var(--w-contrast-bg-color-rgb), 0.8);
  }

  .tagline {
    max-width: 500px;
    margin: 0 auto 5rem;

    .title1 {letter-spacing: normal;}
  }
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
  &.full-cal .weekday-label {opacity: 0.4;font-weight: 500;}
  .vuecal__header .w-icon {color: inherit;}
  &:not(.vuecal--day-view) .vuecal__cell--selected {background-color: transparent;}
  &:not(.vuecal--day-view).full-cal .vuecal__cell--selected:before {border: 1px solid rgba($john, 0.8);}

  .vuecal__event {border-color: color-mix(in srgb, currentColor 30%, transparent);}
  .vuecal__event-time {
    margin: 3px 0;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
  }

  // John.
  .vuecal__header .john {color: color.adjust($john, $lightness: -5%);}
  .vuecal__body .john {background-color: rgba($john, 0.08);}
  .john .vuecal__event {
    background-color: color.adjust($john, $lightness: 5%);
    color: color.adjust($john, $lightness: -35%, $saturation: -15%);
  }
  .john .vuecal__event--background {
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($john, 0.15) 10px, rgba($john, 0.15) 20px);
    border: none;
    color: transparent;
  }

  // Kate.
  .vuecal__header .kate {color: color.adjust($kate, $lightness: -5%);}
  .vuecal__body .kate {background-color: rgba($kate, 0.08);}
  .kate .vuecal__event {
    background-color: color.adjust($kate, $lightness: 5%);
    color: color.adjust($kate, $lightness: -35%, $saturation: -15%);
  }
  .kate .vuecal__event--background {
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($kate, 0.15) 10px, rgba($kate, 0.15) 20px);
    border: none;
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
@media screen and (max-width: 499px) {
  .hero .schedule-header strong {display: none;}
}
</style>
