<template lang="pug">
.vuecal__flex.vuecal__weekdays-headings
  .vuecal__flex.vuecal__heading(:class="heading.class" v-for="(heading, i) in headings" :key="i" :style="weekdayCellStyles")
    transition(:name="`slide-fade--${transitions.direction}`" :appear="transitions.active")
      span(:key="transitions.active ? `${i}-${heading.label4}` : false")
        //- span(v-for="j in 3" :key="j") {{ heading['label' + j]}}
        //- span(v-if="heading.label4") &nbsp;
        //- span(v-if="heading.label4") {{ heading.label4 }}
        span.full {{ heading.full }}
        span.small {{ heading.small }}
        span.xsmall {{ heading.xsmall }}
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
    weekDaysShort: {
      type: [Array, null],
      default: () => []
    },
    small: {
      type: Boolean,
      default: false
    },
    xsmall: {
      type: Boolean,
      default: false
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
              full: cell.label,
              small: this.weekDaysShort ? this.weekDaysShort[i].label : cell.label.substr(0, 3),
              xsmall: this.weekDaysShort ? this.weekDaysShort[i].label : cell.label.substr(0, 1),

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
    overflow: hidden;

    .vuecal--month-view &, .vuecal--week-view &, .vuecal--day-view & {width: 14.2857%;}
    .vuecal--hide-weekends.vuecal--month-view &,
    .vuecal--hide-weekends.vuecal--week-view &,
    .vuecal--hide-weekends.vuecal--day-view & {width: 20%;}
    .vuecal--years-view & {width: 20%;}
    .vuecal--year-view & {width: 33.33%;}

    & > span {flex-shrink: 0;display: flex;}

    // Full.
    .small, .xsmall {display: none;}

    // Small.
    .vuecal--small & .small {display: block;}
    .vuecal--small & .full, .vuecal--small & .xsmall {display: none;}

    // XSmall.
    .vuecal--xsmall & .xsmall {display: block;}
    .vuecal--xsmall & .full, .vuecal--xsmall & .small {display: none;}
  }
}

// Media queries.
//==================================//
@media screen and(max-width: 550px) {
  .vuecal__heading {
    line-height: 1.2;

    // .vuecal:not(.vuecal--xsmall):not(.vuecal--overflow-x) & .small {display: block;}
    // .vuecal:not(.vuecal--overflow-x) & .full,
    // .vuecal:not(.vuecal--xsmall) .xsmall {display: none;}

    // .vuecal--xsmall & .xsmall {display: block;}
    // .vuecal--xsmall & .full, .vuecal--xsmall & .small {display: none;}

    // Overflowing x.
    // .vuecal--overflow-x:not(.vuecal--small):not(.vuecal--xsmall) & .full {display: block;}
    // .vuecal--overflow-x:not(.vuecal--small):not(.vuecal--xsmall) & .small,
    // .vuecal--overflow-x:not(.vuecal--small):not(.vuecal--xsmall) & .xsmall {display: none;}
    // .vuecal--week-view & span:nth-child(3) {display: none;}
    // .vuecal--view-with-time.vuecal--week-view.vuecal--overflow-x & span:nth-child(3) {display: inline-block;}

    // Full.
    .small {display: block;}
    .full, .xsmall {display: none;}
    .vuecal--overflow-x & .full {display: block;}
    .vuecal--overflow-x & .small, .vuecal--overflow-x & .xsmall {display: none;}

    // Small.
    .vuecal--small & .small {display: block;}
    .vuecal--small & .full, .vuecal--small & .xsmall {display: none;}
    .vuecal--small.vuecal--overflow-x & .small {display: block;}
    .vuecal--small.vuecal--overflow-x & .full, .vuecal--small.vuecal--overflow-x & .xsmall {display: none;}

    // XSmall.
    .vuecal--xsmall & .xsmall {display: block;}
    .vuecal--xsmall & .full, .vuecal--xsmall & .small {display: none;}
    .vuecal--xsmall.vuecal--overflow-x & .xsmall {display: block;}
    .vuecal--xsmall.vuecal--overflow-x & .full, .vuecal--xsmall.vuecal--overflow-x & .small {display: none;}
  }
}

@media screen and(max-width: 450px) {
  .vuecal__heading {
    // .xsmall {display: block;}
    // .full {display: none !important;}
    // .small {display: none !important;}
    // .vuecal:not(.vuecal--xsmall):not(.vuecal--overflow-x) & .small {display: block;}
    // .vuecal:not(.vuecal--overflow-x) & .full,
    // .vuecal:not(.vuecal--xsmall) .xsmall {display: none;}

    // Full.
    .xsmall {display: block;}
    .full, .small {display: none;}

    // Small.
    .vuecal--small & .xsmall {display: block;}
    .vuecal--small & .full, .vuecal--small & .small {display: none;}
    .vuecal--small.vuecal--overflow-x & .small {display: block;}
    .vuecal--small.vuecal--overflow-x & .full, .vuecal--small.vuecal--overflow-x & .xsmall {display: none;}

    // XSmall.
    .vuecal--xsmall & .xsmall {display: block;}
    .vuecal--xsmall & .full, .vuecal--xsmall & .small {display: none;}
    .vuecal--xsmall.vuecal--overflow-x & .xsmall {display: block;}
    .vuecal--xsmall.vuecal--overflow-x & .full, .vuecal--xsmall.vuecal--overflow-x & .small {display: none;}
  }
}

@media screen and(max-width: 350px) {
  .vuecal__heading {
    flex-wrap: wrap;

    .vuecal--week-view:not(.vuecal--overflow-x) & {flex-direction: column;}

    // .vuecal--week-view & span:nth-child(2),
    // .vuecal--small & span:nth-child(2) {display: none;}

    // span:nth-child(3) {display: none;}

    // .vuecal--week-view & span:nth-child(4),
    // .vuecal--small & span:nth-child(4) {display: none;}

    // .vuecal--week-view.vuecal--overflow-x & span:nth-child(2),
    // .vuecal--week-view.vuecal--overflow-x & span:nth-child(3),
    // .vuecal--week-view.vuecal--overflow-x & span:nth-child(4) {display: inline-block;}

    // // Chinese language.
    // .vuecal--month-view.vuecal--zh-cn & span:nth-child(1),
    // .vuecal--week-view.vuecal--zh-cn & span:nth-child(1) {display: none;}
    // .vuecal--month-view.vuecal--zh-cn & span:nth-child(2),
    // .vuecal--week-view.vuecal--zh-cn & span:nth-child(2) {display: block;}
  }
}
</style>
