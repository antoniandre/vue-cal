<template lang="pug">
  .vuecal__flex.vuecal(column :class="[this.view.name, hasTimeColumn ? 'view-with-time' : '' ]")
    .vuecal__header
      ul.vuecal__menu
        li(:class="{ active: view.name === 'years' }" @click="switchView('years')") Years
        li(:class="{ active: view.name === 'year' }" @click="switchView('year')") Year
        li(:class="{ active: view.name === 'month' }" @click="switchView('month')") Month
        li(:class="{ active: view.name === 'week' }" @click="switchView('week')") Week
        li(:class="{ active: view.name === 'day' }" @click="switchView('day')") Day

    .vuecal__title
      .vuecal__arrow.vuecal__arrow--prev(@click="previous") &larr;
      span {{ view.title }}
      .vuecal__arrow.vuecal__arrow--next(@click="next") &rarr;

    .vuecal__flex.vuecal__weekdays-headings(v-if="view.headings.length")
      .vuecal__flex.vuecal__heading(v-for="(heading, i) in view.headings" :key="i" :class="heading.class") {{ heading.label }}

    .vuecal__flex.vuecal__body(grow)
      div(style="width: 100%" :class="{ vuecal__flex: !hasTimeColumn }" :data-test="hasTimeColumn ? 'true' : 'false'")
        .vuecal__flex(grow)
          .vuecal__time-column(v-if="showTimeColumn && ['week', 'day'].indexOf(view.name) > -1")
            .vuecal__time-cell(v-for="(cell, i) in view.timeCells" :key="i") {{ cell.label }}
          .vuecal__flex.vuecal__cells(grow)
            .vuecal__cell(v-for="(cell, i) in view.cells" :key="i" :class="cell.class" @click="selectCell(cell)") {{ cell.label }}
</template>

<script>
import { weekDays, months, isDateToday, getPreviousMonday, getDaysInMonth, formatDate, formatTime } from '@/date-utils'

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
      year: null
    },
    selectedDate: null,
    weekDays,
    months,
    monthDays: Array[31],
    view: {
      name: '',
      title: '',
      headings: [],
      cells: [],
      timeCells: [], // For week & day views.
      startDate: null
    }
  }),

  methods: {
    previous () {
      switch (this.view.name) {
        case 'years':
          this.switchView(this.view.name, this.view.startDate.getFullYear() - 25)
          break
        case 'year':
          const firstDayOfYear = new Date(this.view.startDate.getFullYear() - 1, 1, 1)
          this.switchView(this.view.name, firstDayOfYear)
          break
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
      switch (this.view.name) {
        case 'years':
          this.switchView(this.view.name, this.view.startDate.getFullYear() + 25)
          break
        case 'year':
          const firstDayOfYear = new Date(this.view.startDate.getFullYear() + 1, 0, 1)
          this.switchView(this.view.name, firstDayOfYear)
          break
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

    loadYearsView (fromYear = null) {
      fromYear = fromYear || 2000

      this.view.name = 'years'
      this.view.startDate = new Date(fromYear, 0, 1)
      this.view.title = 'Years'
      this.view.headings = []
      this.view.cells = Array.apply(null, Array(25)).map((cell, i) => {
        return {
          label: fromYear + i,
          date: new Date(fromYear + i, 0, 1),
          class: {
            current: fromYear + i === this.now.year,
            selected: this.selectedDate && (fromYear + i) === this.selectedDate.getFullYear()
          }
        }
      })
    },

    loadYearView (date) {
      date = date || this.selectedDate || this.view.startDate
      let year = date.getFullYear()

      this.view.name = 'year'
      this.view.startDate = new Date(year, 0, 1)
      this.view.title = year
      this.view.headings = []
      this.view.cells = Array.apply(null, Array(12)).map((cell, i) => {
        return {
          label: this.months[i].label,
          date: new Date(year, i, 1),
          class: {
            current: i === this.now.month && year === this.now.year,
            selected: i === date.getMonth() && year === date.getFullYear()
          }
        }
      })
    },

    loadMonthView (date) {
      date = date || this.selectedDate || this.view.startDate
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
      this.view.title = `${this.months[month].label} ${year}`
      this.view.headings = this.weekDays

      let todayFound = false
      let nextMonthDays = 0
      // Create 42 cells (6 x 7 days) and populate them with days.
      this.view.cells = Array.apply(null, Array(42)).map((cell, i) => {
        const cellDate = days[i] || new Date(year, month + 1, ++nextMonthDays)
        const isToday = cellDate && !todayFound && cellDate.getDate() === this.now.Date.getDate() &&
                        cellDate.getMonth() === this.now.month &&
                        cellDate.getFullYear() === this.now.year
        // To increase performance skip checking isToday if today already found.
        if (isToday) todayFound = true

        return {
          label: cellDate.getDate(),
          date: cellDate,
          class: {
            today: isToday,
            outOfScope: cellDate.getMonth() !== month,
            selected: this.selectedDate && cellDate.getTime() === this.selectedDate.getTime()
          }
        }
      })
    },

    loadWeekView (firstDayOfWeek = null) {
      firstDayOfWeek = firstDayOfWeek || getPreviousMonday(this.selectedDate) || getPreviousMonday(this.view.startDate)

      this.view.name = 'week'
      this.view.startDate = firstDayOfWeek
      this.view.title = `Week ${firstDayOfWeek.getWeek()} (${formatDate(firstDayOfWeek, 'mmmm yyyy')})`
      this.view.cells = this.weekDays.map((cell, i) => ({
        label: 'No event',
        date: firstDayOfWeek.addDays(i),
        class: {
          today: false,
          selected: this.selectedDate && firstDayOfWeek.addDays(i).getTime() === this.selectedDate.getTime()
        }
      }))
      this.view.headings = this.weekDays.map((cell, i) => {
        const thisDay = firstDayOfWeek.addDays(i)
        const isToday = isDateToday(thisDay)

        if (isToday) this.view.cells[i].class.today = true

        return {
          label: `${cell.label} ${thisDay.getDate()}`,
          class: {}
        }
      })
    },

    loadDayView (date = null) {
      date = date || this.selectedDate || this.view.startDate

      this.view.name = 'day'
      this.view.startDate = date
      this.view.title = formatDate(date, 'DDDD mmmm dd{S}, yyyy')
      this.view.headings = []
      this.view.cells = [{ label: 'No event', date, class: {} }]
    },

    selectCell (cell) {
      this.selectedDate = cell.date
      this.view.cells.forEach(cell => {
        if (cell.class.selected) cell.class.selected = false
        if (cell.date === this.selectedDate) cell.class.selected = true
      })
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

    this.selectedDate = new Date(this.now.year, this.now.month, this.now.Date.getDate())

    this.loadWeekView()
  },

  computed: {
    hasTimeColumn () {
      return this.showTimeColumn && ['week', 'day'].indexOf(this.view.name) > -1
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

$time-column-width: 3em;

.vuecal {
  height: 100%;
  overflow: hidden;

  &__header {
    background-color: #42b983;
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

  &__body {
    overflow: auto;
    flex-basis: 0;
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

  &__flex {
    display: flex;
    flex-direction: row;

    &[column] {
      flex-direction: column;
      flex: 1;
    }

    &[grow] {
      flex-grow: 1;
    }
  }

  &__time-column {
    width: $time-column-width;
    height: 100%;

    .vuecal__time-cell {
      border: 1px solid #eee;
      color: #999;
      height: 3em;
    }
  }

  .view-with-time &__weekdays-headings {
    padding-left: $time-column-width;
  }

  &__heading {
    width: 100%;
    height: 3em;
    border: 1px solid #ddd;
    font-weight: bold;
    justify-content: center;
    align-items: center;
  }

  &__cells {
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

    .vuecal.years & {width: 20%;}
    .vuecal.year & {width: 25%;}
    // .vuecal.month & {}
    // .vuecal.week & {}
    .vuecal.day & {flex: 1;}
  }

  &__cell.today,
  &__cell.current {
    background-color: #f8f8ff;
  }

  &__cell.selected {
    background-color: #f6fffb;
  }

  &__cell.outOfScope {
    color: #ccc;
  }
}
</style>
