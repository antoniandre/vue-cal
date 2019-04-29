<template lang="pug">
.vuecal__flex.vuecal__weekdays-headings
  .vuecal__flex.vuecal__heading(
    :class="{ today: heading.today, clickable: cellHeadingsClickable }"
    v-for="(heading, i) in headings"
    :key="i"
    :style="weekdayCellStyles"
    @click="view.id === 'week' && selectCell(heading.date)"
    @dblclick="view.id === 'week' && vuecal.dblClickToNavigate && switchToNarrowerView()")
    transition(:name="`slide-fade--${transitionDirection}`" :appear="vuecal.transitions")
      span(:key="vuecal.transitions ? `${i}-${heading.dayOfMonth}` : false")
        //- For small/xsmall option. 3 media queries also truncate weekdays.
        span.full {{ heading.full }}
        span.small {{ heading.small }}
        span.xsmall {{ heading.xsmall }}
        span(v-if="heading.dayOfMonth") &nbsp;{{ heading.dayOfMonth }}
</template>

<script>
import { isDateToday } from './date-utils'
import { selectCell } from './cell-utils'

export default {
  props: {
    vuecal: {
      type: Object,
      default: () => ({})
    },
    view: {
      type: Object,
      default: () => ({})
    },
    transitionDirection: {
      type: String,
      default: 'right'
    },
    weekDays: {
      type: Array,
      default: () => []
    },
    // Will override default truncation of weekDays if this is defined in i18n file.
    weekDaysShort: {
      type: [Array, null],
      default: () => []
    },
    switchToNarrowerView: {
      type: Function,
      default: () => {}
    }
  },

  methods: {
    selectCell (date) {
      selectCell(null, date, this.vuecal)
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
            const date = this.view.startDate.addDays(i)

            return {
              full: cell.label,
              // If defined in i18n file, weekDaysShort overrides default truncation of
              // week days when does not fit on screen or with small/xsmall options.
              small: this.weekDaysShort ? this.weekDaysShort[i].label : cell.label.substr(0, 3),
              xsmall: this.weekDaysShort ? this.weekDaysShort[i].label : cell.label.substr(0, 1),

              // Only for week view.
              ...(this.view.id === 'week' ? {
                dayOfMonth: date.getDate(),
                date,
                today: !todayFound && isDateToday(date) && !todayFound++
              } : {})
            }
          })
          break
      }
      return headings
    },
    weekdayCellStyles () {
      return { minWidth: this.vuecal.minCellWidth ? `${this.vuecal.minCellWidth}px` : null }
    },
    cellHeadingsClickable () {
      return this.view.id === 'week' && (this.vuecal.clickToNavigate || this.vuecal.dblClickToNavigate)
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

    .vuecal--overflow-x.vuecal--view-with-time & {
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

    .vuecal--small & .small, .vuecal--xsmall & .xsmall {display: block;}
    .small, .xsmall,
    .vuecal--small & .full, .vuecal--small & .xsmall,
    .vuecal--xsmall & .full, .vuecal--xsmall & .small {display: none;}
  }
}

// Media queries.
//==================================//
@media screen and(max-width: 550px) {
  .vuecal__heading {
    line-height: 1.2;

    .small,
    .vuecal--small & .small,
    .vuecal--xsmall & .xsmall {display: block;}
    .full, .xsmall,
    .vuecal--small & .full, .vuecal--small & .xsmall,
    .vuecal--xsmall & .full, .vuecal--xsmall & .small {display: none;}

    .vuecal--overflow-x & .full,
    .vuecal--small.vuecal--overflow-x & .small,
    .vuecal--xsmall.vuecal--overflow-x & .xsmall {display: block;}
    .vuecal--overflow-x & .small, .vuecal--overflow-x & .xsmall,
    .vuecal--small.vuecal--overflow-x & .full, .vuecal--small.vuecal--overflow-x & .xsmall,
    .vuecal--xsmall.vuecal--overflow-x & .full, .vuecal--xsmall.vuecal--overflow-x & .small {display: none;}
  }
}

@media screen and(max-width: 450px) {
  .vuecal__heading {
    .xsmall,
    .vuecal--small & .xsmall,
    .vuecal--xsmall & .xsmall {display: block;}
    .full, .small,
    .vuecal--small & .full, .vuecal--small & .small,
    .vuecal--xsmall & .full, .vuecal--xsmall & .small {display: none;}

    .vuecal--small.vuecal--overflow-x & .small,
    .vuecal--xsmall.vuecal--overflow-x & .xsmall {display: block;}
    .vuecal--small.vuecal--overflow-x & .full, .vuecal--small.vuecal--overflow-x & .xsmall,
    .vuecal--xsmall.vuecal--overflow-x & .full, .vuecal--xsmall.vuecal--overflow-x & .small {display: none;}
  }
}
</style>
