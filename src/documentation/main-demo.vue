<template lang="pug">
div
  .text-center.headline.mb-8
    span.grey--text.darken-1 Go for the date picker...
    span.ml-8.primary--text.text--darken-1 or unleash the full potential!
  .layout.wrap.align-center.justify-center
    v-card.ma-2.main-content(style="width: 210px;height: 230px")
      vue-cal.vuecal--date-picker(
        xsmall
        hide-view-selector
        :time="false"
        :transitions="false"
        active-view="month"
        :disable-views="['week']")
    v-card.ma-2.main-content(style="width: 700px;height: 450px")
      vue-cal.vuecal--green-theme.demo.vuecal--full-height-delete(
        :time-from="8 * 60"
        :time-to="19 * 60"
        :split-days="demoExample.splits"
        editable-events
        hide-weekends
        :events="demoExample.events"
        sticky-split-labels)
        template(v-slot:split-label="{ split, view }")
          v-icon(:color="split.color") person
          strong(:style="`color: ${split.color}`") {{ split.label }}
</template>

<script>
import VueCal from '@/vue-cal'

const demoExample = {
  splits: [{ label: 'John', class: 'john' }, { label: 'Kate', class: 'kate' }],
  events: []
}

export default {
  components: { VueCal },
  data: () => ({
    demoExample
  }),

  computed: {
    previousFirstDayOfWeek () {
      return new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7))
    }
  },

  created () {
    for (let i = 0; i < 5; i++) {
      const day = this.previousFirstDayOfWeek.addDays(i).format()

      this.demoExample.events.push(
        {
          start: `${day} 12:00`,
          end: `${day} 13:00`,
          title: 'LUNCH',
          class: 'lunch',
          background: true,
          deletable: false,
          resizable: false,
          titleEditable: false,
          split: 1
        },
        {
          start: `${day} 12:00`,
          end: `${day} 13:00`,
          title: 'LUNCH',
          class: 'lunch',
          background: true,
          deletable: false,
          resizable: false,
          titleEditable: false,
          split: 2
        }
      )
    }
  }
}
</script>

<style lang="scss">
$john: #42b983;
$kate: #ff7fc8;

.demo {
  .vuecal__header .v-icon {color: inherit;}
  &:not(.vuecal--day-view) .vuecal__cell--selected {background-color: transparent;}

  // John.
  .vuecal__header .john {color: darken($john, 5);}
  .vuecal__body .john {background-color: rgba($john, 0.08);}
  .john .vuecal__event {background-color: rgba($john, 0.9);color: #fff;}
  .john .lunch {
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($john, 0.15) 10px, rgba($john, 0.15) 20px);
    color: transparentize(darken($john, 10), 0.4);
  }

  // Kate.
  .vuecal__header .kate {color: darken($kate, 5);}
  .vuecal__body .kate {background-color: rgba($kate, 0.08);}
  .kate .vuecal__event {background-color: rgba($kate, 0.9);color: #fff;}
  .kate .lunch {
    background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba($kate, 0.15) 10px, rgba($kate, 0.15) 20px);
    color: transparentize(darken($kate, 10), 0.4);
  }
}
</style>
