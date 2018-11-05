<template lang="pug">
  .vuecal(:class="this.view.name")
    .vuecal__header
      ul.vuecal__menu
        li(:class="{ active: view.name === 'year' }" @click="switchView('year')") Year
        li(:class="{ active: view.name === 'month' }" @click="switchView('month')") Month
        li(:class="{ active: view.name === 'week' }" @click="switchView('week')") Week
        li(:class="{ active: view.name === 'day' }" @click="switchView('day')") Day

    .vuecal__body
      .vuecal__calendar
        .vuecal__title
          .vuecal__arrow.vuecal__arrow--prev(@click="previous") &larr;
          span {{ view.title }}
          .vuecal__arrow.vuecal__arrow--next(@click="next") &rarr;

        .vuecal__flex-wrapper
          .vuecal__time-column(v-if="showTimeColumn && ['week', 'day'].indexOf(view.name) > -1")
            .vuecal__time-cell(v-for="(cell, i) in view.timeCells" :key="i") {{ cell.label }}
          .vuecal__flex-wrapper(column)
            .vuecal__headings
              .vuecal__heading(v-for="(heading, i) in view.headings" :key="i" :class="heading.class") {{ heading.label }}
            .vuecal__cells
              .vuecal__cell(v-for="(cell, i) in view.cells" :key="i" :class="cell.class") {{ cell.label }}
</template>

<script>
import { weekDays, months, isDateToday, getPreviousMonday, getDaysInMonth, getDaysInWeek, formatDate, formatTime } from '@/date-utils'

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
    selectedDate: {
      Date: null,
      day: null,
      week: null,
      weekFirstDay: null,
      month: null,
      year: null,
    },
    weekDays,
    months,
    monthDays: Array[31],
    view: {
      name: '',
      title: '',
      headings: [],
      cells: [],
      timeCells: [],// For week & day views.
      startDate: null
    }
  }),

  methods: {
    previous () {
      switch(this.view.name) {
        case 'month':
          const firstDayOfMonth = new Date(this.view.startDate.getFullYear(), this.view.startDate.getMonth() - 1, 1)
          this.switchView(this.view.name, firstDayOfMonth)
          break
        case 'week':
          const firstDayOfPrevWeek = getPreviousMonday(this.view.startDate).subtractDays(7)
          this.switchView(this.view.name, firstDayOfPrevWeek)
          break
        case 'day':
          const day = this.view.startDate.subtractDays(1)
          this.switchView(this.view.name, day)
          break
      }
    },

    next () {
      switch(this.view.name) {
        case 'month':
          const firstDayOfMonth = new Date(this.view.startDate.getFullYear(), this.view.startDate.getMonth() + 1, 1)
          this.switchView(this.view.name, firstDayOfMonth)
          break
        case 'week':
          const firstDayOfNextWeek = getPreviousMonday(this.view.startDate).addDays(7)
          this.switchView(this.view.name, firstDayOfNextWeek)
          break
        case 'day':
          const day = this.view.startDate.addDays(1)
          this.switchView(this.view.name, day)
          break
      }
    },

    switchView (view, ...params) {
      this.view.name = view

      this['load' + this.view.name.replace(/\b\w/g, l => l.toUpperCase()) + 'View'](...params)
    },

    loadYearView (fromYear = null) {
      fromYear = fromYear || 2000

      this.view.name = 'year'
      this.view.title = 'Years'
      this.view.headings = []
      this.view.cells = Array.apply(null, Array(25)).map((cell, i) => {
        return {
          label: fromYear + i,
          class: fromYear + i === this.now.year ? 'current' : ''
        }
      })
    },

    loadMonthView (date) {
      date = date || this.view.startDate
      const month = date.getMonth()
      const year = date.getFullYear()
      let days = getDaysInMonth(month, year)
      const firstOfMonthDayOfWeek = days[0].getDay()

      // If the first day of the month is not a Monday, prepend missing days to the days array.
      if (days[0].getDay() !== 1) {
        let d = getPreviousMonday(days[0])
        let prevWeek = []
        for (let i = 0; i < 7; i++) {
          prevWeek.push(new Date(d))
          d.setDate(d.getDate() + 1)

          if (d.getDay() === firstOfMonthDayOfWeek) break
        }

        days.unshift(...prevWeek)
      }

      this.view.name = 'month'
      this.view.startDate = new Date(year, month, 1)
      this.view.title = this.months[month].label
      this.view.headings = this.weekDays

      // Create 35 cells (5 x 7 days) and populate them with days.
      let todayFound = false
      this.view.cells = Array.apply(null, Array(35)).map((cell, i) => {
        const isToday = days[i] && !todayFound && days[i].getDate() === this.now.Date.getDate()
                        && days[i].getMonth() === this.now.month
                        && days[i].getFullYear() === this.now.year
        // To increase performance skip checking isToday if today already found.
        if (isToday) todayFound = true

        return {
          label: days[i] ? days[i].getDate() : '',
          class: {
            empty: !!i,
            today: isToday,
            outOfScope: days[i] && days[i].getMonth() !== month
          }
        }
      })
    },

    loadWeekView (firstDayOfWeek = null) {
      firstDayOfWeek = firstDayOfWeek || getPreviousMonday(this.view.startDate)

      this.view.name = 'week'
      this.view.startDate = firstDayOfWeek
      this.view.title = `Week ${firstDayOfWeek.getWeek()} (${formatDate(firstDayOfWeek, 'mmmm yyyy')})`
      this.view.cells = this.weekDays.map(cell => ({ label: 'No event' }))
      this.view.headings = this.weekDays.map((cell, i) => {
        const thisDay = firstDayOfWeek.addDays(i)
        const isToday = isDateToday(thisDay)

        if (isToday) this.view.cells[i].class = 'today'

        return {
          label: `${cell.label} ${thisDay.getDate()}`,
          class: isToday ? 'today' : ''
        }
      })

    },

    loadDayView (date = null) {
      date = date || this.view.startDate

      this.view.name = 'day'
      this.view.startDate = date
      this.view.title = formatDate(date, 'DDDD mmmm dd{S}, yyyy')
      this.view.headings = []
      this.view.cells = [{ label: 'No event' }]
    }
  },

  // selectDate (date) {
  //   this.selectedDate.week = date.getWeek()
  //   this.selectedDate.year = date.getFullYear()
  //   this.selectedDate.day = date.getDate()
  //   this.selectedDate.Date = date
  // },

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

    this.selectedDate = this.now

    this.loadWeekView(this.now.weekFirstDay)
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

  &__cell.outOfScope {
    color: #ccc;
  }
}
</style>
