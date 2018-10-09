<template lang="pug">
  .vuecal(:class="this.current.view")
    .vuecal__header
      ul.vuecal__menu
        li(:class="{ active: current.view === 'month' }" @click="switchView('month')") Month
        li(:class="{ active: current.view === 'week' }" @click="switchView('week')") Week
        li(:class="{ active: current.view === 'day' }" @click="switchView('day')") Day

    .vuecal__body
      .vuecal__calendar
        .vuecal__title
          span {{ view.title }}

        .vuecal__flex-wrapper
          .vuecal__flex-wrapper(column)
            .vuecal__headings
              .vuecal__heading(v-for="(heading, i) in view.headings" :key="i" :class="heading.class") {{ heading.label }}
            .vuecal__cells
              .vuecal__cell(v-for="(cell, i) in view.cells" :key="i" :class="cell.class") {{ cell.label }}
</template>

<script>
export default {
  data: () => ({
    now: new Date(),
    current: {
      day: null,
      week: null,
      month: null,
      year: null,
      view: null,
    },
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    weekDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    monthDays: Array[31],
    view: {
      title: '',
      headings: [],
      cells: []
    }
  }),

  methods: {
    switchView (view) {
      this.current.view = view

      this.loadView()
    },

    loadView () {
      // Common code here.
      this['load' + this.current.view.replace(/\b\w/g, l => l.toUpperCase()) + 'View']()
    },

    loadMonthView () {
      this.view.title = this.months[this.current.month].label
      let days = this.getDaysInMonth(this.current.month, this.current.year)
      this.view.headings = this.weekDays

      let firstDayReached = 0
      this.view.cells = Array.apply(null, Array(35)).map((cell, i) => {
        if (!firstDayReached && days[0].getDay() === (i % 7) + 1) firstDayReached = true

        return {
          label: firstDayReached && days[i] ? days[i].getDate() : '',
          class: i ? 'empty' : ''
        }
      })

      console.log(this.view)
    },

    loadWeekView (week = null, year = null) {
      week = week || this.current.week
      year = year || this.current.year
      let firstDayOfweek = getDateOfWeek(week, year)
      this.view.title = 'Week ' + this.current.week

      this.view.cells = this.weekDays.map(cell => ({ label: 'No event' }))
      this.view.headings = this.weekDays.map((cell, i) => {
        let thisDay = new Date()
        thisDay.setDate(firstDayOfweek.getDate() + i)
        let isToday = this.isDateToday(thisDay)

        if (isToday) this.view.cells[i].class = 'today'

        return {
          label: `${cell.label} ${thisDay.getDate()}`,
          class: isToday ? 'today' : ''
        }
      })

    },

    loadDayView (date = null) {
      date = date || this.now
      this.view.title = this.formatDate(date, 'dddd dd mmmm yyyy')
      this.view.headings = []
      this.view.cells = [{ label: 'No event' }]

      console.log(this.view)
    },

    /**
     * @param {int} The month number, 0 based
     * @param {int} The year, not zero based, required to account for leap years
     * @return {Date[]} List with date objects for each day of the month
     */
    getDaysInMonth (month, year) {
      var date = new Date(year, month, 1)
      var days = []
      while (date.getMonth() === month) {
        days.push(new Date(date))
        date.setDate(date.getDate() + 1)
      }

      return days
    },

    isDateToday(date) {
      return this.formatDate(date) === this.formatDate(this.now)
    },

    formatDate(date, format = 'yyyy-mm-dd') {
      let d = date.getDate()
      let dd = (d < 10 ? '0' : '') + d
      let m = date.getMonth()
      let mm = (m < 10 ? '0' : '') + m
      let yyyy = date.getFullYear()

      switch (format) {
        default:
        case 'yyyy-mm-dd':
          date = `${yyyy}-${mm}-${dd}`
          break
        case 'dddd dd mmmm yyyy':
          let mmmm = this.months[m].label
          let dddd = this.weekDays[date.getDay()].label
          date = `${dddd} ${dd}, ${mmmm} ${yyyy}`
          break
      }

      return date
    }
  },

  created () {
    this.weekDays = this.weekDays.map(day => ({ label: day }))
    this.months = this.months.map(month => ({ label: month }))

    this.current.year = this.now.getFullYear()
    this.current.month = this.now.getMonth()
    this.current.week = this.now.getWeek()
    this.current.day = this.now.getDay()

    this.switchView('week')
  },

  computed: {

  }
}

Date.prototype.getWeek = function () {
  let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()))
  let dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}

const getDateOfWeek = (w, y) => {
  var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
  return new Date(y, 0, d);
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
    height: 100%;
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

    .vuecal.month & {}
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
