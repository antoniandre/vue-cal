<template lang="pug">
.vuecal__flex.vuecal__weekdays-headings
  .vuecal__flex.vuecal__heading(:class="heading.class" v-for="(heading, i) in headings" :key="i" :style="weekdayCellStyles")
    transition(:name="`slide-fade--${transitions.direction}`" :appear="transitions.active")
      span(:key="transitions.active ? `${i}-${heading.label4}` : false")
        span(v-for="j in 3" :key="j") {{ heading['label' + j]}}
        span(v-if="heading.label4") &nbsp;
        span(v-if="heading.label4") {{ heading.label4 }}
</template>

<script>
import { isDateToday } from './date-utils'

export default {
  props: {
    view: {
      type: Object,
      default: () => ({})
    },
    minCellWidth: {
      type: Number,
      default: 0
    },
    transitions: {
      type: Object,
      default: () => ({ active: true, direction: 'right' })
    },
    weekDays: {
      type: Array,
      default: () => []
    },
    locale: {
      type: String,
      default: 'en'
    }
  },
  computed: {
    headings () {
      let headings = []

      switch (this.view.id) {
        case 'month':
        case 'week':
          let todayFound = false
          headings = this.weekDays.map((cell, i) => {
            let date = this.view.startDate.addDays(i)
            // Only for week view.
            let isToday = this.view.id === 'week' && !todayFound && isDateToday(date) && !todayFound++

            return {
              // Chinese language has a particular format.
              label1: this.locale === 'zh-cn' ? cell.label.substr(0, 2) : cell.label[0],
              label2: this.locale === 'zh-cn' ? cell.label.substr(2) : cell.label.substr(1, 2),
              label3: this.locale === 'zh-cn' ? '' : cell.label.substr(3),
              // Only for week view:
              ...(this.view.id === 'week' ? { label4: date.getDate() } : {}),
              ...(this.view.id === 'week' ? { today: isToday } : {}),
              class: {
                today: isToday // Doesn't need condition cz if class object is false it doesn't show up.
              }
            }
          })
          break
      }
      return headings
    },
    weekdayCellStyles () {
      return { minWidth: this.minCellWidth ? `${this.minCellWidth}px` : null }
    }
  }
}
</script>

<style lang="scss">
$time-column-width: 3em;
$time-column-width-12: 4em; // 12-hour clock shows am/pm.
$weekdays-headings-height: 2.8em;

.vuecal {
  &__weekdays-headings {
    border-bottom: 1px solid #ddd;
    margin-bottom: -1px;

    .vuecal--view-with-time & {
      padding-left: $time-column-width;
    }

    .vuecal--view-with-time.vuecal--time-12-hour & {
      font-size: 0.9em;
      padding-left: $time-column-width-12;
    }

    .vuecal--split-days.vuecal--view-with-time & {
      padding-left: 0;
    }
  }

  &__heading {
    width: 100%;
    height: $weekdays-headings-height;
    font-weight: 400;
    justify-content: center;
    text-align: center;
    align-items: center;
    position: relative;

    .vuecal--small & span:nth-child(3) {display: none;}
    .vuecal--xsmall & {flex-direction: column;padding-left: 0;padding-right: 0;}
    .vuecal--xsmall & span:nth-child(2),
    .vuecal--xsmall & span:nth-child(3),
    .vuecal--xsmall & span:nth-child(4) {display: none;}
  }
}

// Media queries.
//==================================//
@media screen and(max-width: 550px) {
  .vuecal__heading {
    padding-left: 1.5em;
    padding-right: 1.5em;
    line-height: 1.2;

    .vuecal--week-view & span:nth-child(3) {display: none;}
    .vuecal--view-with-time.vuecal--week-view.vuecal--overflow-x & span:nth-child(3) {display: inline-block;}

    // Chinese language.
    .vuecal--month-view.vuecal--zh-cn & {padding: 0;}
    .vuecal--week-view.vuecal--zh-cn & span span:nth-child(1) {display: none;}
  }
}

@media screen and(max-width: 450px) {
  .vuecal__heading {
    padding-left: 1.4em;
    padding-right: 1.4em;

    span:nth-child(3) {display: none;}
  }
}

@media screen and(max-width: 350px) {
  .vuecal__heading {
    flex-wrap: wrap;
    padding-left: 0.2em;
    padding-right: 0.2em;

    .vuecal--week-view:not(.vuecal--overflow-x) & {
      flex-direction: column;
      padding-left: 0;
      padding-right: 0;
    }

    .vuecal--week-view & span:nth-child(2),
    .vuecal--small & span:nth-child(2) {display: none;}

    span:nth-child(3) {display: none;}

    .vuecal--week-view & span:nth-child(4),
    .vuecal--small & span:nth-child(4) {display: none;}

    .vuecal--week-view.vuecal--overflow-x & span:nth-child(2),
    .vuecal--week-view.vuecal--overflow-x & span:nth-child(3),
    .vuecal--week-view.vuecal--overflow-x & span:nth-child(4) {display: inline-block;}

    // Chinese language.
    .vuecal--month-view.vuecal--zh-cn & span:nth-child(1),
    .vuecal--week-view.vuecal--zh-cn & span:nth-child(1) {display: none;}
    .vuecal--month-view.vuecal--zh-cn & span:nth-child(2),
    .vuecal--week-view.vuecal--zh-cn & span:nth-child(2) {display: block;}
  }
}
</style>
