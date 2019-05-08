<template lang="pug">
.vuecal__flex.vuecal(column :class="cssClasses" ref="vuecal" :lang="locale")
  vuecal-header(
    :options="$props"
    :view-props="{ views, view, weekDaysInHeader }"
    :months="months"
    :week-days="weekDays"
    :week-days-short="weekDaysShort"
    :switch-to-narrower-view="switchToNarrowerView")
    slot(slot="arrow-prev" name="arrow-prev")
      i.angle
    slot(slot="arrow-next" name="arrow-next")
      i.angle
    slot(slot="today-btn" name="today-button")
      span.default {{ texts.today }}
    slot(slot="title" name="title" :title="viewTitle" :view="view") {{ viewTitle }}

  .vuecal__flex.vuecal__body(v-if="!hideBody" grow)
    transition(:name="`slide-fade--${transitionDirection}`" :appear="transitions")
      .vuecal__flex(style="min-width: 100%" :key="transitions ? view.id : false" column)
        .vuecal__flex.vuecal__all-day(v-if="showAllDayEvents && hasTimeColumn")
          span(style="width: 3em")
            span {{ texts.allDay }}
          .vuecal__flex.vuecal__cells(:class="`${view.id}-view`" grow :wrap="!minCellWidth || view.id !== 'week'" :column="!!minCellWidth")
            vuecal-cell(
              v-for="(cell, i) in viewCells"
              :key="i"
              :options="$props"
              :data="cell"
              :all-day="true"
              :min-timestamp="minTimestamp"
              :max-timestamp="maxTimestamp"
              :splits="hasSplits && splitDays || []")
              div(slot="event-renderer" slot-scope="{ event, view }" :view="view" :event="event")
                slot(name="event-renderer" :view="view" :event="event")
                  .vuecal__event-title.vuecal__event-title--edit(
                    v-if="editableEvents && event.title"
                    contenteditable
                    @blur="onEventTitleBlur($event, event)"
                    v-html="event.title")
                  .vuecal__event-title(v-else-if="event.title" v-html="event.title")
                  .vuecal__event-content(
                    v-if="event.content && showAllDayEvents !== 'short' && !isShortMonthView"
                    v-html="event.content")
              slot(slot="no-event" name="no-event")
        .vuecal__bg(:class="{ vuecal__flex: !hasTimeColumn }" column)
          .vuecal__flex(row grow)
            .vuecal__time-column(v-if="hasTimeColumn")
              .vuecal__time-cell(v-for="(cell, i) in timeCells" :key="i" :style="`height: ${timeCellHeight}px`")
                slot(name="time-cell" :hours="cell.hours" :minutes="cell.minutes")
                  span.line {{ cell.label }}

            .vuecal__flex.vuecal__cells(:class="`${view.id}-view`" ref="cells" grow :wrap="!minCellWidth || view.id !== 'week'" :column="!!minCellWidth")
              //- Only for minCellWidth on week view.
              weekdays-headings(
                v-if="minCellWidth && view.id === 'week'"
                :vuecal="this"
                :transition-direction="transitionDirection"
                :view="view"
                :min-cell-width="minCellWidth"
                :week-days="weekDays"
                :week-days-short="weekDaysShort"
                :switch-to-narrower-view="switchToNarrowerView")

              .vuecal__flex(grow :wrap="!minCellWidth || view.id !== 'week'")
                vuecal-cell(
                  v-for="(cell, i) in viewCells"
                  :key="i"
                  :options="$props"
                  :data="cell"
                  :min-timestamp="minTimestamp"
                  :max-timestamp="maxTimestamp"
                  :splits="hasSplits && splitDays || []")
                  div(slot="cell-content" slot-scope="{ events, split, selectCell }")
                    slot(name="cell-content" :cell="cell" :view="view" :go-narrower="selectCell" :events="events")
                      .split-label(v-if="split" v-html="split.label")
                      .vuecal__cell-date(v-if="cell.content" v-html="cell.content")
                      .vuecal__cell-events-count(v-if="((view.id === 'month' && !eventsOnMonthView) || (['years', 'year'].includes(view.id) && eventsCountOnYearView)) && events.length")
                        slot(name="events-count" :view="view" :events="events") {{ events.length }}
                      .vuecal__no-event(v-if="!events.length && ['week', 'day'].includes(view.id)")
                        slot(name="no-event") {{ texts.noEvent }}
                  div(slot="event-renderer" slot-scope="{ event, view }" :view="view" :event="event")
                    slot(name="event-renderer" :view="view" :event="event")
                      .vuecal__event-title.vuecal__event-title--edit(
                        v-if="editableEvents && event.title"
                        contenteditable
                        @blur="onEventTitleBlur($event, event)"
                        v-html="event.title")
                      .vuecal__event-title(v-else-if="event.title" v-html="event.title")
                      .vuecal__event-time(v-if="(event.startTimeMinutes || event.endTimeMinutes) && !(view === 'month' && event.allDay && showAllDayEvents === 'short') && !isShortMonthView")
                        | {{ event.startTimeMinutes | formatTime(timeFormat || (twelveHour ? 'h:mm{am}' : 'HH:mm')) }}
                        span(v-if="event.endTimeMinutes") &nbsp;- {{ event.endTimeMinutes | formatTime(timeFormat || (twelveHour ? 'h:mm{am}' : 'HH:mm')) }}
                        small.days-to-end(v-if="event.segments") &nbsp;+{{ 'some' }}{{ (texts.day[0] || '').toLowerCase() }}
                      .vuecal__event-content(
                        v-if="event.content && !(view === 'month' && event.allDay && showAllDayEvents === 'short') && !isShortMonthView"
                        v-html="event.content")
                  slot(slot="no-event" name="no-event") {{ texts.noEvent }}
</template>

<script>
import { now, isDateToday, getPreviousFirstDayOfWeek, formatDate, formatTime, stringToDate } from './date-utils'
import { createAnEvent, eventDefaults, onResizeEvent, eventInRange } from './event-utils'
import Header from './header'
import WeekdaysHeadings from './weekdays-headings'
import Cell from './cell'
import './styles.scss'

export default {
  name: 'vue-cal',
  components: { 'vuecal-cell': Cell, 'vuecal-header': Header, WeekdaysHeadings },
  props: {
    locale: {
      type: String,
      default: 'en'
    },
    hideViewSelector: {
      type: Boolean,
      default: false
    },
    hideTitleBar: {
      type: Boolean,
      default: false
    },
    hideBody: {
      type: Boolean,
      default: false
    },
    hideWeekends: {
      type: Boolean,
      default: false
    },
    disableViews: {
      type: Array,
      default: () => []
    },
    defaultView: {
      type: String,
      default: 'week'
    },
    todayButton: {
      type: Boolean,
      default: false
    },
    showAllDayEvents: {
      type: [Boolean, String],
      default: false
    },
    selectedDate: {
      type: [String, Date],
      default: ''
    },
    minDate: {
      type: [String, Date],
      default: ''
    },
    maxDate: {
      type: [String, Date],
      default: ''
    },
    startWeekOnSunday: {
      type: Boolean,
      default: false
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
      default: 60 // In minutes.
    },
    timeCellHeight: {
      type: Number,
      default: 40 // In pixels.
    },
    twelveHour: {
      type: Boolean,
      default: false
    },
    timeFormat: {
      type: String,
      default: ''
    },
    minCellWidth: {
      type: Number,
      default: 0
    },
    splitDays: {
      type: Array,
      default: () => []
    },
    events: {
      type: Array,
      default: () => []
    },
    editableEvents: {
      type: Boolean,
      default: false
    },
    noEventOverlaps: {
      type: Boolean,
      default: false
    },
    eventsOnMonthView: {
      type: [Boolean, String],
      default: false
    },
    eventsCountOnYearView: {
      type: Boolean,
      default: false
    },
    onEventClick: {
      type: Function,
      default: () => {}
    },
    onEventDblclick: {
      type: Function,
      default: () => {}
    },
    onEventCreate: {
      type: Function,
      default: () => {}
    },
    transitions: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      texts: this.locale === 'en' ? require('./i18n/en.json') : {
        weekDays: Array(7).fill(''),
        months: Array(12).fill(''),
        years: '',
        year: '',
        month: '',
        week: '',
        day: '',
        today: '',
        noEvent: '',
        allDay: '',
        deleteEvent: '',
        createEvent: '',
        dateFormat: 'DDDD mmmm d, yyyy'
      },
      ready: false,
      now,
      view: {
        id: '',
        title: '',
        startDate: null,
        endDate: null,
        selectedDate: null
      },
      eventIdIncrement: 1,
      domEvents: {
        resizeAnEvent: {
          _eid: null, // Only one at a time.
          startDate: null,
          split: null,
          segment: null,
          originalEndTimeMinutes: 0,
          endTimeMinutes: 0
        },
        dragAnEvent: {
          _eid: null // Only one at a time.
        },
        focusAnEvent: {
          _eid: null // Only one at a time.
        },
        clickHoldAnEvent: {
          _eid: null, // Only one at a time.
          timeout: 1200, // Hold for 1.2s to delete an event.
          timeoutId: null
        },
        dblTapACell: {
          taps: 0,
          timeout: 500 // Allowed latency between first and second click.
        },
        clickHoldACell: {
          cellId: null,
          split: null,
          timeout: 1200, // Hold for 1.2s to create an event.
          timeoutId: null
        }
      },
      mutableEvents: {}, // An indexed array of mutable events updated each time given events array changes.
      transitionDirection: 'right'
    }
  },

  methods: {
    loadLocale (locale) {
      // import(/* webpackInclude: /\.json$/, webpackChunkName: "[request]" */ `./i18n/${locale}`)
      //   .then(response => (this.texts = response.default))
      this.texts = require(`./i18n/${locale}.json`)
    },

    switchToNarrowerView () {
      this.transitionDirection = 'right'

      let views = Object.keys(this.views)
      views = views.slice(views.indexOf(this.view.id) + 1)
      const view = views.find(v => this.views[v].enabled)

      if (view) this.switchView(view)
    },

    switchView (view, date = null, fromViewSelector = false) {
      if (this.transitions && fromViewSelector) {
        const views = Object.keys(this.views)
        this.transitionDirection = views.indexOf(this.view.id) > views.indexOf(view) ? 'left' : 'right'
      }

      this.view.events = []
      this.view.id = view
      this.view.firstCellDate = null // For month view, if filling cells before 1st of month.
      this.view.lastCellDate = null // For month view, if filling cells after current month.
      let dateTmp, endTime, formattedDate, dayEvents

      if (!date) {
        date = this.view.selectedDate || this.view.startDate
        if (view === 'week') date = getPreviousFirstDayOfWeek(date, this.startWeekOnSunday)
      }

      switch (view) {
        case 'years':
          // Always fill first cell with a multiple of 25 years, E.g. year 2000, or 2025.
          this.view.startDate = new Date(Math.floor(date.getFullYear() / 25) * 25 || 2000, 0, 1)
          this.view.endDate = new Date(this.view.startDate.getFullYear() + 25, 0, 1)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.
          if (this.eventsCountOnYearView) {
            this.view.events = this.events.filter(e => eventInRange(e, this.view.startDate, this.view.endDate))
          }
          break
        case 'year':
          this.view.startDate = new Date(date.getFullYear(), 0, 1)
          this.view.endDate = new Date(date.getFullYear() + 1, 0, 1)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.
          if (this.eventsCountOnYearView) {
            this.view.events = this.events.filter(e => eventInRange(e, this.view.startDate, this.view.endDate))
          }
          break
        case 'month':
          this.view.startDate = new Date(date.getFullYear(), date.getMonth(), 1)
          this.view.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.
          dateTmp = new Date(this.view.startDate)
          endTime = this.view.endDate.getTime()

          // If the first day of the month is not a FirstDayOfWeek (Monday or Sunday), prepend missing days to the days array.
          let startDate = new Date(this.view.startDate)
          if (startDate.getDay() !== (this.startWeekOnSunday ? 0 : 1)) {
            startDate = getPreviousFirstDayOfWeek(startDate, this.startWeekOnSunday)
          }

          // Used in viewCells computed array & returned in emitted events.
          this.view.firstCellDate = startDate
          this.view.lastCellDate = startDate.addDays(41)

          // Save out of scope events into the view object separated from the array of in-scope events.
          let currentMonth = this.view.startDate.getMonth()
          let cellDate = null
          this.view.outOfScopeEvents = []
          for (let i = 0; i < 42; i++) { // 42 cells (6 rows x 7 days).
            cellDate = startDate.addDays(i)

            if (currentMonth !== cellDate.getMonth()) {
              formattedDate = formatDate(cellDate, 'yyyy-mm-dd', this.texts)
              dayEvents = this.mutableEvents[formattedDate] || []
              if (dayEvents.length) this.view.outOfScopeEvents.push(...dayEvents)
            }
          }

          while (dateTmp.getTime() <= endTime) {
            dateTmp = dateTmp.addDays(1)
            formattedDate = formatDate(dateTmp, 'yyyy-mm-dd', this.texts)

            // Save the events of each day of the month into view object.
            dayEvents = this.mutableEvents[formattedDate] || []
            if (dayEvents.length) this.view.events.push(...dayEvents)
          }
          break
        case 'week':
          const weekDaysCount = this.hideWeekends ? 5 : 7
          this.view.startDate = this.hideWeekends && this.startWeekOnSunday ? date.addDays(1) : date
          this.view.endDate = date.addDays(weekDaysCount)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.
          dateTmp = new Date(date)
          for (let i = 0; i < weekDaysCount; i++) {
            formattedDate = formatDate(dateTmp.addDays(i), 'yyyy-mm-dd', this.texts)
            dayEvents = this.mutableEvents[formattedDate] || []
            if (dayEvents.length) this.view.events.push(...dayEvents)
          }
          break
        case 'day':
          this.view.startDate = date
          this.view.endDate = new Date(date)
          this.view.endDate.setHours(23, 59, 59) // End at 23:59:59.
          dayEvents = this.mutableEvents[formatDate(date, 'yyyy-mm-dd', this.texts)] || []
          if (dayEvents.length) this.view.events = dayEvents
          break
      }

      // If multiple-day events.
      if (['month', 'week', 'day'].includes(this.view.id) && this.mutableEvents['multiple-day']) {
        endTime = this.view.endDate.getTime()
        const dayMilliseconds = 24 * 3600 * 1000
        let startTimestamp = this.view.startDate.getTime()
        let endTimestamp = this.view.endDate.getTime()

        this.view.events.push(...this.mutableEvents['multiple-day'].filter(
          e => eventInRange(e, this.view.startDate, this.view.endDate)
        ).map(e => {
          for (let timestamp = startTimestamp; timestamp <= endTime; timestamp += dayMilliseconds) {
            const isFirstDay = timestamp === startTimestamp
            const isLastDay = (timestamp + dayMilliseconds) >= endTimestamp
            const startTimeMinutes = isFirstDay ? e.startTimeMinutes : 0
            const endTimeMinutes = isLastDay ? e.endTimeMinutes : (24 * 60)
            formattedDate = formatDate(new Date(timestamp), 'yyyy-mm-dd', this.texts)

            this.$set(e.segments, formattedDate, {
              startDate: formattedDate,
              startTimeMinutes,
              endTimeMinutes,
              startTime: isFirstDay ? e.startTime : '00:00',
              endTime: isLastDay ? e.endTime : '24:00',
              overlapping: {},
              overlapped: {},
              simultaneous: {},
              isFirstDay,
              isLastDay,
              height: 0,
              top: 0
            })
          }
          return e
        }))

        console.log(this.view.events)
      }

      if (this.ready) {
        const params = {
          view,
          startDate: this.view.startDate,
          endDate: this.view.endDate,
          ...(this.view.id === 'month' ? {
            firstCellDate: this.view.firstCellDate,
            lastCellDate: this.view.lastCellDate,
            outOfScopeEvents: this.view.outOfScopeEvents
          } : {}),
          events: this.view.events,
          ...(this.view.id === 'week' ? { week: this.view.startDate.getWeek() } : {})
        }
        this.$emit('view-change', params)
      }
    },

    findAncestor (el, Class) {
      while ((el = el.parentElement) && !el.classList.contains(Class)) {}
      return el
    },

    isDOMElementAnEvent (el) {
      return el.classList.contains('vuecal__event') || this.findAncestor(el, 'vuecal__event')
    },

    // Event resizing is started in cell component (onMouseDown) but place onMouseMove & onMouseUp
    // handlers in the single parent for performance.
    onMouseMove (e) {
      let { resizeAnEvent } = this.domEvents
      if (resizeAnEvent._eid === null) return

      e.preventDefault()
      let event = this.view.events.find(e => e._eid === resizeAnEvent._eid) || { segments: {} }
      let segment = event.segments && event.segments[resizeAnEvent.startDate]
      resizeAnEvent.endTimeMinutes = this.minutesAtCursor(e)

      if (segment) {
        segment.endTimeMinutes = resizeAnEvent.endTimeMinutes
      }
      else {
        event.endTimeMinutes = resizeAnEvent.endTimeMinutes
      }

      // @todo: handle splits?
      // if (this.hasSplits && this.splitDays) {
      //   event = event.find(e => e.split === resizeAnEvent.split)
      // }
      // onResizeEvent(event, resizeAnEvent.startDate, this)
    },

    onMouseUp (e) {
      let { resizeAnEvent, clickHoldAnEvent, clickHoldACell } = this.domEvents

      // On event resize end, emit event if duration has changed.
      if (resizeAnEvent._eid) {
        const event = this.view.events.find(e => e._eid === resizeAnEvent._eid)
        if (event && event.endTimeMinutes !== resizeAnEvent.originalEndTimeMinutes) {
          this.emitWithEvent('event-change', event)
          this.emitWithEvent('event-duration-change', event)
        }
        if (event) event.resizing = false
        resizeAnEvent._eid = null
        resizeAnEvent.startDate = null
        resizeAnEvent.split = null
        resizeAnEvent.segment = null
        resizeAnEvent.originalEndTimeMinutes = null
        resizeAnEvent.endTimeMinutes = null
      }

      // If not mouse up on an event, unfocus any event except if just dragged.
      if (!this.isDOMElementAnEvent(e.target) && !resizeAnEvent._eid) {
        this.unfocusEvent()
      }

      // Prevent showing delete button if click and hold was not long enough.
      // Click & hold timeout is initiated in onMouseDown() in event component.
      if (clickHoldAnEvent.timeoutId && !clickHoldAnEvent._eid) {
        clearTimeout(clickHoldAnEvent.timeoutId)
        clickHoldAnEvent.timeoutId = null
      }

      // Prevent creating an event if click and hold was not long enough.
      if (clickHoldACell.timeoutId) {
        clearTimeout(clickHoldACell.timeoutId)
        clickHoldACell.timeoutId = null
      }
    },

    onKeyUp (e) {
      // Escape key.
      if (e.keyCode === 27) {
        this.cancelDelete()
      }
    },

    unfocusEvent () {
      let { focusAnEvent, clickHoldAnEvent } = this.domEvents
      const event = this.view.events.find(e => e._eid === (focusAnEvent._eid || clickHoldAnEvent._eid))
      focusAnEvent._eid = null // Cancel event focus.
      clickHoldAnEvent._eid = null // Hide delete button.

      if (event) {
        event.focused = false
        event.deleting = false
      }
    },

    // Cancel an event deletion.
    cancelDelete () {
      let { clickHoldAnEvent } = this.domEvents
      if (clickHoldAnEvent._eid) {
        const event = this.view.events.find(e => e._eid === clickHoldAnEvent._eid)
        if (event) event.deleting = false

        clickHoldAnEvent._eid = null
        clickHoldAnEvent.timeoutId = null
      }
    },

    onEventTitleBlur (e, event) {
      // If no change cancel action.
      if (event.title === e.target.innerHTML) return

      event.title = e.target.innerHTML

      this.emitWithEvent('event-change', event)
      this.emitWithEvent('event-title-change', event)
    },

    // Object of arrays of events indexed by dates.
    updateMutableEvents () {
      // eslint-disable-next-line
      this.mutableEvents = {}

      // Group events into dates.
      this.events.forEach(event => {
        let [startDate, startTime = ''] = event.start.split(' ')
        const [hoursStart, minutesStart] = startTime.split(':')
        const startTimeMinutes = parseInt(hoursStart) * 60 + parseInt(minutesStart)

        let [endDate, endTime = ''] = event.end.split(' ')
        const [hoursEnd, minutesEnd] = endTime.split(':')
        const endTimeMinutes = parseInt(hoursEnd) * 60 + parseInt(minutesEnd)

        const startTimestamp = new Date(event.start).getTime()
        const endTimestamp = new Date(event.end).getTime()
        const multipleDays = startDate !== endDate

        // Keep the event ids scoped to this calendar instance.
        // eslint-disable-next-line
        let _eid = `${this._uid}_${this.eventIdIncrement++}`

        event = Object.assign({
          ...eventDefaults,
          _eid,
          overlapped: {},
          overlapping: {},
          simultaneous: {},
          segments: multipleDays ? {} : null,
          startDate,
          startTime,
          startTimeMinutes,
          endDate,
          endTime,
          endTimeMinutes,
          classes: (event.class || '').split(' ')
        }, event)

        // Make array reactive for future events creations & deletions.
        if (!(event.startDate in this.mutableEvents)) this.$set(this.mutableEvents, event.startDate, [])
        if (multipleDays && !('multiple-day' in this.mutableEvents)) this.$set(this.mutableEvents, 'multiple-day', [])
        // eslint-disable-next-line
        this.mutableEvents[multipleDays ? 'multiple-day' : event.startDate].push(event)
      })
    },

    getPosition (e) {
      // const rect = e.target.getBoundingClientRect()
      const rect = this.$refs.cells.getBoundingClientRect()
      console.log('get position of cursor', {...e.target})

      const { clientX, clientY } = 'ontouchstart' in window && e.touches ? e.touches[0] : e
      return { x: clientX - rect.left, y: clientY - rect.top }
    },

    minutesAtCursor (e) {
      let startTimeMinutes = 0
      if (typeof e === 'number') startTimeMinutes = e
      else if (typeof e === 'object') {
        const mouseY = this.getPosition(e).y
        startTimeMinutes = mouseY * this.timeStep / parseInt(this.timeCellHeight) + this.timeFrom
      }

      return startTimeMinutes
    },

    // Allow call from cell click & hold or external call via $refs.
    createEvent (formattedDate, e = null, eventOptions = {}) {
      return createAnEvent(formattedDate, this.minutesAtCursor(e), eventOptions, this)
    },

    // Prepare the event to return it with an emitted event.
    cleanupEvent (event) {
      event = { ...event }

      // Delete vue-cal specific props instead of returning a set of props so user
      // can place whatever they want inside an event and see it returned.
      const discardProps = ['height', 'top', 'overlapped', 'overlapping', 'simultaneous', 'classes', 'split']
      for (let prop in event) if (discardProps.includes(prop)) delete event[prop]
      if (!event.segments) delete event.segments

      // Return date objects for easy manipulation.
      const [date1, time1] = event.start.split(' ')
      const [y1, m1, d1] = (date1 && date1.split('-')) || [0, 0, 0]
      const [h1, min1] = (time1 && time1.split(':')) || [0, 0]
      event.startDate = new Date(y1, parseInt(m1) - 1, d1, h1, min1)

      const [date2, time2] = event.end.split(' ')
      const [y2, m2, d2] = (date2 && date2.split('-')) || [0, 0, 0]
      const [h2, min2] = (time2 && time2.split(':')) || [0, 0]
      event.endDate = new Date(y2, parseInt(m2) - 1, d2, h2, min2)

      return event
    },

    emitWithEvent (eventName, event) {
      this.$emit(eventName, this.cleanupEvent(event))
    },

    updateSelectedDate (date) {
      if (date && typeof date === 'string') date = stringToDate(date)

      if (date && date instanceof Date) {
        if (this.view.selectedDate) this.transitionDirection = this.view.selectedDate.getTime() > date.getTime() ? 'left' : 'right'
        // Select the day at midnight in order to allow fetching events on whole day.
        date.setHours(0, 0, 0)
        this.view.selectedDate = date
        this.switchView(this.view.id)
      }
    }
  },

  created () {
    if (this.locale !== 'en') this.loadLocale(this.locale)

    // Init the array of events, then keep listening for changes in watcher.
    this.updateMutableEvents(this.events)

    this.view.id = this.defaultView
    if (this.selectedDate) this.updateSelectedDate(this.selectedDate)
    else {
      this.view.selectedDate = this.now
      this.switchView(this.defaultView)
    }
  },

  mounted () {
    const hasTouch = 'ontouchstart' in window

    if (this.editableEvents) {
      window.addEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove, { passive: false })
      window.addEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
      window.addEventListener('keyup', this.onKeyUp)
    }

    // Disable context menu on touch devices on the whole vue-cal instance.
    if (hasTouch) {
      this.$refs.vuecal.oncontextmenu = function (e) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    const params = {
      view: this.view.id,
      startDate: this.view.startDate,
      endDate: this.view.endDate,
      ...(this.view.id === 'month' ? { firstCellDate: this.view.firstCellDate, lastCellDate: this.view.lastCellDate } : {}),
      events: this.view.events,
      ...(this.view.id === 'week' ? { week: this.view.startDate.getWeek() } : {})
    }

    this.$emit('ready', params)
    this.ready = true
  },

  beforeDestroy () {
    const hasTouch = 'ontouchstart' in window
    window.removeEventListener(hasTouch ? 'touchmove' : 'mousemove', this.onMouseMove, { passive: false })
    window.removeEventListener(hasTouch ? 'touchend' : 'mouseup', this.onMouseUp)
    window.removeEventListener('keyup', this.onKeyUp)
  },

  computed: {
    selectedDateFormatted () {
      return formatDate(this.view.selectedDate, 'yyyy-mm-dd', this.texts)
    },
    views () {
      return {
        years: { label: this.texts.years, enabled: !this.disableViews.includes('years') },
        year: { label: this.texts.year, enabled: !this.disableViews.includes('year') },
        month: { label: this.texts.month, enabled: !this.disableViews.includes('month') },
        week: { label: this.texts.week, enabled: !this.disableViews.includes('week') },
        day: { label: this.texts.day, enabled: !this.disableViews.includes('day') }
      }
    },
    hasTimeColumn () {
      return this.time && ['week', 'day'].includes(this.view.id)
    },
    isShortMonthView () {
      return this.view.id === 'month' && this.eventsOnMonthView === 'short'
    },
    // For week & day views.
    timeCells () {
      let timeCells = []
      console.log('here', this.$props)
      for (let i = this.timeFrom, max = this.timeTo; i < max; i += this.timeStep) {
        timeCells.push({
          hours: Math.floor(i / 60),
          minutes: i % 60,
          label: formatTime(i, this.timeFormat || (this.twelveHour ? 'h:mm{am}' : 'HH:mm')),
          value: i
        })
      }

      return timeCells
    },
    // Whether the current view has days splits.
    hasSplits () {
      return !!this.splitDays.length && ['week', 'day'].includes(this.view.id)
    },
    minTimestamp () {
      let date = null
      if (this.minDate && typeof this.minDate === 'string') date = stringToDate(this.minDate)
      else if (this.minDate && this.minDate instanceof Date) date = this.minDate
      return date ? date.getTime() : 0
    },
    maxTimestamp () {
      let date = null
      if (this.maxDate && typeof this.maxDate === 'string') date = stringToDate(this.maxDate)
      else if (this.maxDate && this.minDate instanceof Date) date = this.maxDate
      return date ? date.getTime() : 0
    },
    weekDays () {
      let { weekDays } = this.texts
      // Do not modify original for next instances.
      weekDays = weekDays.slice(0)

      if (this.startWeekOnSunday) weekDays.unshift(weekDays.pop())

      if (this.hideWeekends) {
        weekDays = this.startWeekOnSunday ? weekDays.slice(1, 6) : weekDays.slice(0, 5)
      }

      return weekDays.map(day => ({ label: day }))
    },
    weekDaysShort () {
      let { weekDaysShort = null } = this.texts

      if (weekDaysShort) {
        // Do not modify original for next instances.
        weekDaysShort = weekDaysShort.slice(0)

        if (this.startWeekOnSunday) weekDaysShort.unshift(weekDaysShort.pop())

        if (this.hideWeekends) {
          weekDaysShort = this.startWeekOnSunday ? weekDaysShort.slice(1, 6) : weekDaysShort.slice(0, 5)
        }
      }

      return weekDaysShort && weekDaysShort.map(day => ({ label: day }))
    },
    weekDaysInHeader () {
      return (this.view.id === 'month' || (this.view.id === 'week' && !this.minCellWidth))
    },
    months () {
      return this.texts.months.map(month => ({ label: month }))
    },
    viewTitle () {
      let title = ''
      const date = this.view.startDate
      const year = date.getFullYear()
      const month = date.getMonth()

      switch (this.view.id) {
        case 'years':
          title = this.texts.years
          break
        case 'year':
          title = year
          break
        case 'month':
          title = `${this.months[month].label} ${year}`
          break
        case 'week':
          const lastDayOfWeek = date.addDays(6)
          let formattedMonthYear = formatDate(date, this.xsmall ? 'mmm yyyy' : 'mmmm yyyy', this.texts)

          // If week is not ending in the same month it started in.
          if (lastDayOfWeek.getMonth() !== date.getMonth()) {
            let [m1, y1] = formattedMonthYear.split(' ')
            let [m2, y2] = formatDate(lastDayOfWeek, this.xsmall ? 'mmm yyyy' : 'mmmm yyyy', this.texts).split(' ')
            formattedMonthYear = y1 === y2 ? `${m1} - ${m2} ${y1}` : `${m1} ${y1} - ${m2} ${y2}`
          }
          title = `${this.texts.week} ${date.getWeek()} (${formattedMonthYear})`
          break
        case 'day':
          title = formatDate(date, this.texts.dateFormat, this.texts)
          break
      }

      return title
    },
    viewCells () {
      let cells = []
      let fromYear = null
      let todayFound = false

      switch (this.view.id) {
        case 'years':
          fromYear = this.view.startDate.getFullYear()
          cells = Array.apply(null, Array(25)).map((cell, i) => {
            const startDate = new Date(fromYear + i, 0, 1)
            const endDate = new Date(fromYear + i + 1, 0, 1)
            endDate.setSeconds(-1) // End at 23:59:59.

            return {
              startDate,
              formattedDate: formatDate(startDate, 'yyyy-mm-dd', this.texts),
              endDate,
              content: fromYear + i,
              current: fromYear + i === this.now.getFullYear()
            }
          })
          break
        case 'year':
          fromYear = this.view.startDate.getFullYear()
          cells = Array.apply(null, Array(12)).map((cell, i) => {
            const startDate = new Date(fromYear, i, 1)
            const endDate = new Date(fromYear, i + 1, 1)
            endDate.setSeconds(-1) // End at 23:59:59.

            return {
              startDate,
              formattedDate: formatDate(startDate, 'yyyy-mm-dd', this.texts),
              endDate,
              content: this.xsmall ? this.months[i].label.substr(0, 3) : this.months[i].label,
              current: i === this.now.getMonth() && fromYear === this.now.getFullYear()
            }
          })
          break
        case 'month':
          const month = this.view.startDate.getMonth()
          let selectedDateAtMidnight = new Date(this.view.selectedDate.getTime())
          selectedDateAtMidnight.setHours(0, 0, 0, 0)
          todayFound = false
          const firstCellDate = new Date(this.view.firstCellDate)

          // Create 42 cells (6 rows x 7 days) and populate them with days.
          cells = Array.apply(null, Array(42)).map((cell, i) => {
            const startDate = firstCellDate.addDays(i)
            const endDate = new Date(startDate)
            endDate.setHours(23, 59, 59) // End at 23:59:59.
            // To increase performance skip checking isToday if today already found.
            const isToday = !todayFound && startDate && startDate.getDate() === this.now.getDate() &&
                            startDate.getMonth() === this.now.getMonth() &&
                            startDate.getFullYear() === this.now.getFullYear() &&
                            !todayFound++

            return {
              startDate,
              formattedDate: formatDate(startDate, 'yyyy-mm-dd', this.texts),
              endDate,
              content: startDate.getDate(),
              today: isToday,
              outOfScope: startDate.getMonth() !== month
            }
          })

          if (this.hideWeekends) {
            cells = cells.filter(cell => cell.startDate.getDay() > 0 && cell.startDate.getDay() < 6)
          }
          break
        case 'week':
          todayFound = false
          let firstDayOfWeek = this.view.startDate

          cells = this.weekDays.map((cell, i) => {
            const startDate = firstDayOfWeek.addDays(i)
            const endDate = new Date(startDate)
            endDate.setHours(23, 59, 59) // End at 23:59:59.

            return {
              startDate,
              formattedDate: formatDate(startDate, 'yyyy-mm-dd', this.texts),
              endDate,
              today: !todayFound && isDateToday(startDate) && !todayFound++
            }
          })
          break
        case 'day':
          const startDate = this.view.startDate
          const endDate = new Date(this.view.startDate)
          endDate.setHours(23, 59, 59) // End at 23:59:59.

          cells = [{
            startDate,
            formattedDate: formatDate(startDate, 'yyyy-mm-dd', this.texts),
            endDate,
            today: isDateToday(startDate)
          }]
          break
      }
      return cells
    },
    cssClasses () {
      return {
        [`vuecal--${this.view.id}-view`]: true,
        [`vuecal--${this.locale}`]: this.locale,
        'vuecal--no-time': !this.time,
        'vuecal--view-with-time': this.hasTimeColumn,
        'vuecal--twelve-hour': this.twelveHour,
        'vuecal--click-to-navigate': this.clickToNavigate,
        'vuecal--hide-weekends': this.hideWeekends,
        'vuecal--split-days': this.hasSplits,
        'vuecal--overflow-x': this.minCellWidth,
        'vuecal--small': this.small,
        'vuecal--xsmall': this.xsmall,
        'vuecal--no-event-overlaps': this.noEventOverlaps,
        'vuecal--dragging-event': this.domEvents.resizeAnEvent.endTimeMinutes,
        'vuecal--events-on-month-view': this.eventsOnMonthView,
        'vuecal--short-events': this.view.id === 'month' && this.eventsOnMonthView === 'short'
      }
    }
  },

  filters: {
    formatTime (value, format) {
      return formatTime(value, format) || ''
    }
  },

  watch: {
    events: {
      handler (events, oldEvents) {
        this.updateMutableEvents(events)
      },
      deep: true
    },
    locale (locale) {
      this.loadLocale(locale)
    },
    selectedDate (date) {
      this.updateSelectedDate(date)
    }
  }
}
</script>
