<template lang="pug">
  .vuecal__flex.vuecal(column :class="cssClasses")
    .vuecal__header
      ul.vuecal__flex.vuecal__menu(v-if="!hideViewSelector")
        li(:class="{ active: view.id === id }" v-for="(v, id) in views" v-if="v.enabled" @click="switchView(id)") {{ v.label }}
      .vuecal__title
        .vuecal__arrow.vuecal__arrow--prev(@click="previous") &larr;
        span(:class="{ clickable: !!broaderView }" @click="switchToBroaderView()") {{ view.title }}
        .vuecal__arrow.vuecal__arrow--next(@click="next") &rarr;
      .vuecal__flex.vuecal__weekdays-headings(v-if="view.headings.length && !(hasSplits && view.id === 'week')")
        .vuecal__flex.vuecal__heading(:class="heading.class" v-for="(heading, i) in view.headings" :key="i") {{ heading.label }}

    .vuecal__flex.vuecal__body(grow)
      div(:class="{ vuecal__flex: !hasTimeColumn }" style="min-width: 100%")
        .vuecal__flex.vuecal__bg(grow)
          .vuecal__time-column(v-if="time && ['week', 'day'].indexOf(view.id) > -1")
            .vuecal__time-cell(v-for="(cell, i) in view.timeCells" :key="i") {{ cell.label }}

          .vuecal__flex.vuecal__cells(grow :column="hasSplits && view.id === 'week'")
            //- Only for splitDays.
            .vuecal__flex.vuecal__weekdays-headings(v-if="hasSplits && view.id === 'week'")
              .vuecal__flex.vuecal__heading(:class="heading.class" v-for="(heading, i) in view.headings" :key="i") {{ heading.label }}
            //- Only for splitDays.
            .vuecal__flex(v-if="hasSplits" grow)
              .vuecal__cell(:class="cell.class" v-for="(cell, i) in view.cells" :key="i" @click="selectCell(cell)" @dblclick="dblClickToNavigate && switchToNarrowerView()")
                .vuecal__cell-content(:class="splitDays[i - 1].class" v-for="i in (hasSplits ? splitDays.length : 1)")
                  .split-label(v-html="splitDays[i - 1].label")
                  div(v-html="cell.content")
            //- Only for not splitDays.
            .vuecal__cell(:class="cell.class" v-else v-for="(cell, i) in view.cells" :key="i" @click="selectCell(cell)" @dblclick="dblClickToNavigate && switchToNarrowerView()")
              .vuecal__cell-content(v-for="i in (hasSplits ? splitDays.length : 1)" v-html="cell.content")
</template>

<script>
import { setLocale, now, texts, isDateToday, getPreviousMonday, getDaysInMonth, formatDate, formatTime } from './date-utils'

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
      default: false
    },
    dblClickToNavigate: {
      type: Boolean,
      default: true
    },
    hideViewSelector: {
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
    },
    'defaultView': {
      type: String,
      default: 'week'
    },
    'splitDays': {
      type: Array,
      default: () => []
    },
    locale: {
      type: String,
      default: 'en'
    },
    disableViews: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    now: {
      Date: now,
      day: null,
      week: null,
      weekFirstDay: null,
      month: null,
      year: null
    },
    selectedDate: null,
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
      if (this.broaderView) this.switchView(this.broaderView)
    },

    switchToNarrowerView () {
      let views = Object.keys(this.views)
      views = views.slice(views.indexOf(this.view.id) + 1)
      const view = views.find(v => this.views[v].enabled)

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
      this.view.title = this.texts.years
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
            'out-of-scope': cellDate.getMonth() !== month,
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
      this.view.title = `${this.texts.week} ${firstDayOfWeek.getWeek()} (${formatDate(firstDayOfWeek, this.xsmall ? 'mmm yyyy' : 'mmmm yyyy', this.locale)})`
      this.view.cells = this.weekDays.slice(0, this.hideWeekends ? 5 : 7).map((cell, i) => ({
        content: `<div class="vuecal__no-event">${this.texts.noEvent}</div>`,
        date: firstDayOfWeek.addDays(i),
        class: {
          today: false,
          selected: this.selectedDate && firstDayOfWeek.addDays(i).getTime() === this.selectedDate.getTime(),
          splitted: this.hasSplits
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
      let cellContent = `<div class="vuecal__no-event">${this.texts.noEvent}</div>`

      this.view.id = 'day'
      this.view.startDate = date
      this.view.title = formatDate(date, this.texts.dateFormat, this.locale)
      this.view.headings = []
      this.view.cells = [
        {
          content: `<div class="vuecal__no-event">${this.texts.noEvent}</div>`,
          date,
          class: {
            splitted: this.hasSplits
          }
        }
      ]
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
    if (this.locale !== 'en') setLocale(this.locale)

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

    this.switchView(this.defaultView)
  },

  computed: {
    texts () {
      return texts[this.locale]
    },
    views () {
      return {
        years: { label: 'Years', enabled: this.disableViews.indexOf('years') === -1 },
        year: { label: 'Year', enabled: this.disableViews.indexOf('year') === -1 },
        month: { label: 'Month', enabled: this.disableViews.indexOf('month') === -1 },
        week: { label: 'Week', enabled: this.disableViews.indexOf('week') === -1 },
        day: { label: 'Day', enabled: this.disableViews.indexOf('day') === -1 }
      }
    },
    broaderView () {
      let views = Object.keys(this.views)
      views = views.slice(0, views.indexOf(this.view.id))
      views.reverse()

      return views.find(v => this.views[v].enabled)
    },
    hasTimeColumn () {
      return this.time && ['week', 'day'].indexOf(this.view.id) > -1
    },
    // Whether the current view has days splits.
    hasSplits () {
      return !!this.splitDays.length && ['week', 'day'].indexOf(this.view.id) > -1
    },
    weekDays () {
      return this.texts.weekDays.map(day => ({ label: day }))
    },
    months () {
      return this.texts.months.map(month => ({ label: month }))
    },
    cssClasses () {
      return {
        [`vuecal--${this.view.id}-view`]: true,
        'view-with-time': this.hasTimeColumn,
        'vuecal--time-12-hour': this['12Hour'],
        'click-to-navigate': this.clickToNavigate,
        'vuecal--hide-weekends': this.hideWeekends,
        'vuecal--split-days': this.splitDays.length,
        'vuecal--small': this.small,
        'vuecal--xsmall': this.xsmall
      }
    }
  }
}
</script>

<style lang="scss">
$time-column-width: 3em;
$time-column-width-12: 4em; // 12-hour clock has am/pm.
$weekdays-headings-height: 3em;

.vuecal {
  height: 100%;
  overflow: hidden;

  // General.
  //==================================//
  .clickable {cursor: pointer;}

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

  // Header.
  //==================================//
  &__header {
    user-select: none;
  }

  &__menu {
    list-style-type: none;
    background-color: #42b983;
    justify-content: center;

    li {
      padding: 0.3em 1em;
      height: 2.2em;
      font-size: 1.3em;
      border-bottom: 0 solid #fff;
      color: #fff;
      cursor: pointer;
      transition: 0.2s;
    }

    li.active {
      border-bottom-width: 2px;
      background: rgba(255, 255, 255, 0.15);
    }
  }

  &__title {
    background-color: #e4f5ef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 1.8em;

    .vuecal--xsmall & {font-size: 1.4em;}
  }

  &__arrow {
    font-family: sans-serif;
    cursor: pointer;
    padding: 0.3em;
  }

  &__weekdays-headings {
    border-bottom: 1px solid #ddd;
    margin-bottom: -1px;

    .view-with-time & {
      padding-left: $time-column-width;
    }

    .view-with-time.vuecal--time-12-hour & {
      font-size: 0.9em;
      padding-left: $time-column-width-12;
    }

    .vuecal--split-days.view-with-time & {
      padding-left: 0;
    }
  }

  &__heading {
    width: 100%;
    height: $weekdays-headings-height;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    user-select: none;

    .vuecal--xsmall & {padding: 0 0.2em;}
  }

  // Calendar body.
  //==================================//
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
    margin-right: -1px;

    .vuecal--time-12-hour & {
      width: $time-column-width-12;
      font-size: 0.9em;
    }

    .vuecal--split-days.vuecal--week-view & {
      margin-top: $weekdays-headings-height;
    }

    .vuecal__time-cell {
      color: #999;
      height: 3em;
      user-select: none;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        border-top: 1px solid #eee;
      }
    }
  }

  // Calendar cells.
  //==================================//
  &__cells {
    flex-wrap: wrap;
    overflow: hidden;

    .vuecal--split-days.vuecal--week-view & {
      flex-wrap: nowrap;
      overflow: auto hidden;
    }
  }

  &__cell {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    .vuecal--month-view &,
    .vuecal--week-view &,
    .vuecal--day-view & {
      width: 14.2857%;
    }

    .vuecal--hide-weekends.vuecal--month-view &,
    .vuecal--hide-weekends.vuecal--week-view &,
    .vuecal--hide-weekends.vuecal--day-view & {
      width: 20%;
    }

    .vuecal--years-view & {width: 20%;}
    .vuecal--year-view & {width: 33.33%;}
    // .vuecal--month-view & {}
    // .vuecal--week-view & {}
    .vuecal--day-view & {flex: 1;}

    .click-to-navigate & {cursor: pointer;}
    .view-with-time & {display: block;}

    &.splitted {
      flex-direction: row;
      display: flex;
    }

    &.splitted &-content {
      display: flex;
      flex-grow: 1;
      flex-direction: column;
      height: 100%;
    }

    &:before {
      position: absolute;
      top: 0;
      left: 0;
      right: -1px;
      bottom: -1px;
      border: 1px solid #ddd;
      content: '';
    }
  }
  &__cell.today,
  &__cell.current {
    background-color: rgba(240, 240, 255, 0.4);
    z-index: 1;
  }

  &__cell.selected {
    background-color: rgba(235, 255, 245, 0.4);
    z-index: 2;

    &:before {
      border-color: rgba(66, 185, 131, 0.5);
    }
  }

  &__cell.out-of-scope {
    color: #ccc;
  }

  &__no-event {
    padding-top: 1em;
    color: #aaa;
    user-select: none;
  }
}
</style>
