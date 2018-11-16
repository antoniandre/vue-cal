<template lang="pug">
  .vuecal__flex.vuecal(column :class="[view.id, hasTimeColumn ? 'view-with-time' : '', this['12Hour'] ? 'time-12-hour' : '', clickToNavigate ? 'click-to-navigate' : '', hideWeekends ? 'hide-weekends' : '', small ? 'vuecal--small' : '', xsmall ? 'vuecal--xsmall' : '']")
    .vuecal__header(v-if="!hideHeader")
      ul.vuecal__menu
        li(:class="{ active: view.id === id }" v-for="(v, id) in views" @click="switchView(id)") {{ v.label }}
    .vuecal__title
      .vuecal__arrow.vuecal__arrow--prev(@click="previous") &larr;
      span(@click="switchToBroaderView()") {{ view.title }}
      .vuecal__arrow.vuecal__arrow--next(@click="next") &rarr;

    .vuecal__flex.vuecal__weekdays-headings(v-if="view.headings.length")
      .vuecal__flex.vuecal__heading(:class="heading.class" v-for="(heading, i) in view.headings" :key="i") {{ heading.label }}

    .vuecal__flex.vuecal__body(grow)
      div(:class="{ vuecal__flex: !hasTimeColumn }" style="width: 100%" :data-test="hasTimeColumn ? 'true' : 'false'")
        .vuecal__flex.vuecal__bg(grow)
          .vuecal__time-column(v-if="time && ['week', 'day'].indexOf(view.id) > -1")
            .vuecal__time-cell(v-for="(cell, i) in view.timeCells" :key="i") {{ cell.label }}
          .vuecal__flex.vuecal__cells(grow)
            .vuecal__cell(:class="cell.class" v-for="(cell, i) in view.cells" :key="i" @click="selectCell(cell)" v-html="cell.content")
</template>

<script>
import { now, weekDays, months, isDateToday, getPreviousMonday, getDaysInMonth, formatDate, formatTime } from '@/date-utils'

export default {
  name: 'vue-cal',
  props: {
    time: {
      type: Boolean,
      default: true
    },
    timeFrom: {
      type: Number,
      default: 0 // In minutes.
    },
    timeTo: {
      type: Number,
      default: 24 * 60 // In minutes.
    },
    timeStep: {
      type: Number,
      default: 30 // In minutes.
    },
    small: {
      type: Boolean,
      default: false
    },
    xsmall: {
      type: Boolean,
      default: false
    },
    clickToNavigate: {
      type: Boolean,
      default: true
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    '12Hour': {
      type: Boolean,
      default: false
    },
    'hideWeekends': {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    views: {
      years: { label: 'Years' },
      year: { label: 'Year' },
      month: { label: 'Month' },
      week: { label: 'Week' },
      day: { label: 'Day' }
    },
    now: {
      Date: now,
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
      id: '',
      title: '',
      headings: [],
      cells: [],
      timeCells: [], // For week & day views.
      startDate: null
    }
  }),

  methods: {
    previous () {
      switch (this.view.id) {
        case 'years':
          this.switchView(this.view.id, this.view.startDate.getFullYear() - 25)
          break
        case 'year':
          const firstDayOfYear = new Date(this.view.startDate.getFullYear() - 1, 1, 1)
          this.switchView(this.view.id, firstDayOfYear)
          break
        case 'month':
          const firstDayOfMonth = new Date(this.view.startDate.getFullYear(), this.view.startDate.getMonth() - 1, 1)
          this.switchView(this.view.id, firstDayOfMonth)
          break
        case 'week':
          const firstDayOfPrevWeek = getPreviousMonday(this.view.startDate).subtractDays(7)
          this.switchView(this.view.id, firstDayOfPrevWeek)
          break
        case 'day':
          const day = this.view.startDate.subtractDays(1)
          this.switchView(this.view.id, day)
          break
      }
    },

    next () {
      switch (this.view.id) {
        case 'years':
          this.switchView(this.view.id, this.view.startDate.getFullYear() + 25)
          break
        case 'year':
          const firstDayOfYear = new Date(this.view.startDate.getFullYear() + 1, 0, 1)
          this.switchView(this.view.id, firstDayOfYear)
          break
        case 'month':
          const firstDayOfMonth = new Date(this.view.startDate.getFullYear(), this.view.startDate.getMonth() + 1, 1)
          this.switchView(this.view.id, firstDayOfMonth)
          break
        case 'week':
          const firstDayOfNextWeek = getPreviousMonday(this.view.startDate).addDays(7)
          this.switchView(this.view.id, firstDayOfNextWeek)
          break
        case 'day':
          const day = this.view.startDate.addDays(1)
          this.switchView(this.view.id, day)
          break
      }
    },

    switchToBroaderView () {
      const views = Object.keys(this.views)
      const view = views[views.indexOf(this.view.id) - 1]
      if (view) this.switchView(view)
    },

    switchToNarrowerView () {
      const views = Object.keys(this.views)
      const view = views[views.indexOf(this.view.id) + 1]
      if (view) this.switchView(view)
    },

    switchView (view, ...params) {
      this.view.id = view
      this['load' + this.view.id.replace(/\b\w/g, l => l.toUpperCase()) + 'View'](...params)
    },

    loadYearsView (fromYear = null) {
      fromYear = fromYear || 2000

      this.view.id = 'years'
      this.view.startDate = new Date(fromYear, 0, 1)
      this.view.title = 'Years'
      this.view.headings = []
      this.view.cells = Array.apply(null, Array(25)).map((cell, i) => {
        return {
          content: fromYear + i,
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

      this.view.id = 'year'
      this.view.startDate = new Date(year, 0, 1)
      this.view.title = year
      this.view.headings = []
      this.view.cells = Array.apply(null, Array(12)).map((cell, i) => {
        return {
          content: this.xsmall ? this.months[i].label.substr(0, 3) : this.months[i].label,
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

      this.view.id = 'month'
      this.view.startDate = new Date(year, month, 1)
      this.view.title = `${this.months[month].label} ${year}`
      this.view.headings = this.weekDays.slice(0, this.hideWeekends ? 5 : 7).map(cell => ({
        label: this.small || this.xsmall ? cell.label.substr(0, 3) : cell.label,
        class: {}
      }))

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
          content: cellDate.getDate(),
          date: cellDate,
          class: {
            today: isToday,
            outOfScope: cellDate.getMonth() !== month,
            selected: this.selectedDate && cellDate.getTime() === this.selectedDate.getTime()
          }
        }
      })

      if (this.hideWeekends) {
        this.view.cells = this.view.cells.filter(cell => cell.date.getDay() > 0 && cell.date.getDay() < 6)
      }
    },

    loadWeekView (firstDayOfWeek = null) {
      firstDayOfWeek = firstDayOfWeek || getPreviousMonday(this.selectedDate) || getPreviousMonday(this.view.startDate)

      this.view.id = 'week'
      this.view.startDate = firstDayOfWeek
      this.view.title = `Week ${firstDayOfWeek.getWeek()} (${formatDate(firstDayOfWeek, this.xsmall ? 'mmm yyyy' : 'mmmm yyyy')})`
      this.view.cells = this.weekDays.slice(0, this.hideWeekends ? 5 : 7).map((cell, i) => ({
        content: '<span class="vuecal__no-event">No event</span>',
        date: firstDayOfWeek.addDays(i),
        class: {
          today: false,
          selected: this.selectedDate && firstDayOfWeek.addDays(i).getTime() === this.selectedDate.getTime()
        }
      }))
      this.view.headings = this.weekDays.slice(0, this.hideWeekends ? 5 : 7).map((cell, i) => {
        const thisDay = firstDayOfWeek.addDays(i)
        const isToday = isDateToday(thisDay)
        const weekDayLabel = this.small || this.xsmall ? cell.label.substr(0, 3) : cell.label

        if (isToday) this.view.cells[i].class.today = true

        return {
          label: `${weekDayLabel} ${thisDay.getDate()}`,
          class: {}
        }
      })
    },

    loadDayView (date = null) {
      date = date || this.selectedDate || this.view.startDate

      this.view.id = 'day'
      this.view.startDate = date
      this.view.title = formatDate(date, 'DDDD mmmm dd{S}, yyyy')
      this.view.headings = []
      this.view.cells = [{ content: '<span class="vuecal__no-event">No event</span>', date, class: {} }]
    },

    selectCell (cell) {
      this.selectedDate = cell.date
      this.view.cells.forEach(cell => {
        if (cell.class.selected) cell.class.selected = false
        if (cell.date === this.selectedDate) cell.class.selected = true
      })

      if (this.clickToNavigate) this.switchToNarrowerView()
    }
  },

  created () {
    this.weekDays = this.weekDays.map(day => ({ label: day }))
    this.months = this.months.map(month => ({ label: month }))

    for (let i = this.timeFrom, max = this.timeTo; i <= max; i += this.timeStep) {
      this.view.timeCells.push({
        label: formatTime(i, this['12Hour'] ? 'h:mm{am}' : 'H:mm'),
        value: i
      })
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
      return this.time && ['week', 'day'].indexOf(this.view.id) > -1
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
$time-column-width-12: 4em;

.vuecal {
  height: 100%;
  overflow: hidden;

  &--xsmall {font-size: 0.9em;}

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

  &__title {
    background-color: #e4f5ef;
    min-height: 2.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.8em;

    .vuecal--xsmall & {font-size: 1.4em;}
  }

  &.click-to-navigate .vuecal__title span {
    cursor: pointer;
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

  &__bg {
    position: relative;
  }

  &__time-column {
    width: $time-column-width;
    height: 100%;
    border-right: 1px solid #eee;

    .time-12-hour & {
      width: $time-column-width-12;
      font-size: 0.9em;
    }

    .vuecal__time-cell {
      color: #999;
      height: 3em;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        border-top: 1px solid #eee;
      }
    }
  }

  &__weekdays-headings {
    .view-with-time & {
      padding-left: $time-column-width;
    }

    .view-with-time.time-12-hour & {
      font-size: 0.9em;
      padding-left: $time-column-width-12;
    }
  }

  &__heading {
    width: 100%;
    height: 3em;
    border: 1px solid #ddd;
    font-weight: bold;
    justify-content: center;
    align-items: center;

    .vuecal--xsmall & {padding: 0 0.2em;}
  }

  &__cells {
    flex-wrap: wrap;
  }

  &__cell {
    width: 100%;
    border: 1px solid #ddd;
    border-top: none;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    position: relative;

    .vuecal.month &,
    .vuecal.week &,
    .vuecal.day & {
      width: 14.2857%;
    }

    .hide-weekends.vuecal.month &,
    .hide-weekends.vuecal.week &,
    .hide-weekends.vuecal.day & {
      width: 20%;
    }

    .vuecal.years & {width: 20%;}
    .vuecal.year & {width: 25%;}
    // .vuecal.month & {}
    // .vuecal.week & {}
    .vuecal.day & {flex: 1;}

    .click-to-navigate & {cursor: pointer;}
    .view-with-time & {display: block;}
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

  &__no-event {
    position: sticky;
    top: 2em;
    color: #aaa;
    user-select: none;
  }
}
</style>
