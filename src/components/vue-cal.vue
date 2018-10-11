<template lang="pug">
  .vuecal(:class="this.selected.view")
    .vuecal__header
      ul.vuecal__menu
        li(:class="{ active: selected.view === 'year' }" @click="switchView('year')") Year
        li(:class="{ active: selected.view === 'month' }" @click="switchView('month')") Month
        li(:class="{ active: selected.view === 'week' }" @click="switchView('week')") Week
        li(:class="{ active: selected.view === 'day' }" @click="switchView('day')") Day

    .vuecal__body
      .vuecal__calendar
        .vuecal__title
          .vuecal__arrow.vuecal__arrow--prev(@click="previous") &larr;
          span {{ view.title }}
          .vuecal__arrow.vuecal__arrow--next(@click="next") &rarr;

        .vuecal__flex-wrapper
          .vuecal__time-column(v-if="showTimeColumn && ['week', 'day'].indexOf(selected.view) > -1")
            .vuecal__time-cell(v-for="(cell, i) in view.timeCells" :key="i") {{ cell.label }}
          .vuecal__flex-wrapper(column)
            .vuecal__headings
              .vuecal__heading(v-for="(heading, i) in view.headings" :key="i" :class="heading.class") {{ heading.label }}
            .vuecal__cells
              .vuecal__cell(v-for="(cell, i) in view.cells" :key="i" :class="cell.class") {{ cell.label }}
</template>

<script>
import { isDateToday, getPreviousMonday, getDaysInMonth, formatDate, formatTime } from '@/date-utils'

export default {
  name: 'vue-cal',
  props: {
    showTimeColumn: {
      type: Boolean,
      default: true
    },
    timeIncrement: {
      type: Number,
      default: 60 // In minutes.
    }
  },
  data: () => ({
    now: {
      Date: new Date(),
      day: null,
      week: null,
      weekFirstDay: null,
      month: null,
      year: null,
    },
    selected: {
      Date: null,
      day: null,
      week: null,
      weekFirstDay: null,
      month: null,
      year: null,
      view: null,
    },
    weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    months: ["January", "February", "March", "April", "May", "June",
             "July", "August", "September", "October", "November", "December"],
    monthDays: Array[31],
    view: {
      title: '',
      headings: [],
      cells: [],
      timeCells: []
    }
  }),

  methods: {
    previous () {
      switch(this.selected.view) {
        case 'week':
          let firstDayOfPrevWeek = this.selected.weekFirstDay.subtractDays(7)
          this.switchView(this.selected.view, firstDayOfPrevWeek)
          break
      }
    },

    next () {
      switch(this.selected.view) {
        case 'week':
          let firstDayOfNextWeek = this.selected.weekFirstDay.addDays(7)
          this.switchView(this.selected.view, firstDayOfNextWeek)
          break
      }
    },

    switchView (view, ...params) {
      this.selected.view = view

      this['load' + this.selected.view.replace(/\b\w/g, l => l.toUpperCase()) + 'View'](...params)
    },

    loadYearView (fromYear = null) {
      fromYear = fromYear || 2000
      this.view.title = 'Years'
      this.view.headings = []
      this.view.cells = Array.apply(null, Array(25)).map((cell, i) => {
        return {
          label: fromYear + i,
          class: fromYear + i === this.now.year ? 'current' : ''
        }
      })
    },

    loadMonthView (month = null, year = null) {
      month = month || this.now.month
      year = year || this.now.year
      this.view.title = this.months[month].label
      let days = getDaysInMonth(month, year)
      this.view.headings = this.weekDays

      let firstDayReached = 0
      this.view.cells = Array.apply(null, Array(35)).map((cell, i) => {
        if (!firstDayReached && days[0].getDay() === (i % 7) + 1) firstDayReached = true

        let isToday = firstDayReached && days[i] && isDateToday(days[i])

        return {
          label: firstDayReached && days[i] ? days[i].getDate() : '',
          class: {
            empty: !!i,
            today: isToday
          }
        }
      })
    },

    loadWeekView (firstDayOfWeek = null) {
      firstDayOfWeek = firstDayOfWeek || this.now.weekFirstDay

      this.selected.weekFirstDay = firstDayOfWeek
      this.selected.week = firstDayOfWeek.getWeek()
      this.selected.year = firstDayOfWeek.getFullYear()
      this.view.title = `Week ${this.selected.week} (${formatDate(firstDayOfWeek, 'mmmm yyyy')})`
      this.view.cells = this.weekDays.map(cell => ({ label: 'No event' }))
      this.view.headings = this.weekDays.map((cell, i) => {
        let thisDay = firstDayOfWeek.addDays(i)
        let isToday = isDateToday(thisDay)

        if (isToday) this.view.cells[i].class = 'today'

        return {
          label: `${cell.label} ${thisDay.getDate()}`,
          class: isToday ? 'today' : ''
        }
      })

    },

    loadDayView (date = null) {
      date = date || this.now.Date
      this.selected.week = date.getWeek()
      this.selected.year = date.getFullYear()
      this.selected.day = date.getDate()
      this.view.title = formatDate(date, 'DDDD mmmm dd{S}, yyyy')
      this.view.headings = []
      this.view.cells = [{ label: 'No event' }]
    }
  },

  created () {
    this.weekDays = this.weekDays.map(day => ({ label: day }))
    this.months = this.months.map(month => ({ label: month }))

    for (let i = 0, max = 24 * 60; i <= max; i += this.timeIncrement) {
      this.view.timeCells.push({ label: formatTime(i), value: i })
    }

    this.now.year = this.now.Date.getFullYear()
    this.now.month = this.now.Date.getMonth()
    this.now.week = this.now.Date.getWeek()
    this.now.weekFirstDay = getPreviousMonday(this.now.Date)
    this.now.day = this.now.Date.getDay()

    this.switchView('week')
  },

  computed: {

  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.vuecal {
  margin-top: 5em;
  border: 1px solid #eee;
  border-radius: 3px;

  &__header {
    background-color: #42b983;
  }

  &__menu {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;

    li {
      padding: 0.4em 1em;
      cursor: pointer;
      font-size: 1.3em;
      border-bottom: 3px solid transparent;
      color: #fff;
    }

    li.active {
      border-bottom-color: #fff;
    }
  }

  &__calendar {
    min-height: 200px;
    display: flex;
    flex-direction: column;
  }

  &__title {
    background-color: #e4f5ef;
    min-height: 2.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 2em;
  }

  &__arrow {
    font-family: sans-serif;
    cursor: pointer;
    padding: 0.3em;
  }

  &__flex-wrapper {
    display: flex;
    flex-direction: row;

    &[column] {
      flex-direction: column;
      flex: 1;
    }
  }

  &__time-column {
    margin-top: 2em;
    width: 3em;
    height: 100%;

    .vuecal__time-cell {
      border: 1px solid #eee;
    }
  }

  &__headings {
    display: flex;
  }

  &__heading {
    display: flex;
    width: 100%;
    height: 2em;
    border: 1px solid #ddd;
    font-weight: bold;
    justify-content: center;
    align-items: center;
  }

  &__cells {
    display: flex;
    height: 100%;
    flex-grow: 1;
    flex-wrap: wrap;
  }

  &__cell {
    width: 100%;
    border: 1px solid #ddd;
    border-top: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;


    .vuecal.month &,
    .vuecal.week &,
    .vuecal.day & {
      width: 14.2857%;
    }

    .vuecal.year & {width: 20%;min-height: 9em;}
    .vuecal.month & {min-height: 9em;}
    .vuecal.week & {min-height: 15em;}
    .vuecal.day & {flex: 1;}
  }

  &__heading.today,
  &__cell.today {
    border: 1px solid #faa;
  }

  &__cell.current {
    border: 1px solid #aaf;
  }
}
</style>
