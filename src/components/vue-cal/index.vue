<template lang="pug">
.vuecal__flex.vuecal(column :class="cssClasses" ref="vuecal" :lang="locale")
  vuecal-header(
    :options="$props"
    :view-props="{ views, view, weekDaysInHeader }"
    :week-days="weekDays"
    :week-days-short="weekDaysShort"
    :switch-to-narrower-view="switchToNarrowerView")
    template(v-slot:arrow-prev)
      slot(name="arrow-prev")
        i.angle
    template(v-slot:arrow-next)
      slot(name="arrow-next")
        i.angle
    template(v-slot:today-button)
      slot(name="today-button")
        span.default {{ texts.today }}
    template(v-slot:title)
      slot(name="title" :title="viewTitle" :view="view") {{ viewTitle }}

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
              :cell-splits="hasSplits && splitDays || []")
              template(v-slot:event-renderer="{ event, view }")
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

            .vuecal__flex.vuecal__cells(:class="`${view.id}-view`" grow :wrap="!minCellWidth || view.id !== 'week'" :column="!!minCellWidth")
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

              .vuecal__flex(ref="cells" grow :wrap="!minCellWidth || view.id !== 'week'")
                vuecal-cell(
                  v-for="(cell, i) in viewCells"
                  :key="i"
                  :options="$props"
                  :data="cell"
                  :min-timestamp="minTimestamp"
                  :max-timestamp="maxTimestamp"
                  :cell-splits="hasSplits && splitDays || []")
                  template(v-slot:cell-content="{ events, split, selectCell }")
                    slot(name="cell-content" :cell="cell" :view="view" :go-narrower="selectCell" :events="events")
                      .split-label(v-if="split" v-html="split.label")
                      .vuecal__cell-date(v-if="cell.content" v-html="cell.content")
                      .vuecal__cell-events-count(v-if="((view.id === 'month' && !eventsOnMonthView) || (['years', 'year'].includes(view.id) && eventsCountOnYearView)) && events.length")
                        slot(name="events-count" :view="view" :events="events") {{ events.length }}
                      .vuecal__no-event(v-if="!events.length && ['week', 'day'].includes(view.id)")
                        slot(name="no-event") {{ texts.noEvent }}
                  template(v-slot:event-renderer="{ event, view }")
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
                        small.days-to-end(v-if="event.daysCount > 1") &nbsp;+{{ event.daysCount - 1 }}{{ (texts.day[0] || '').toLowerCase() }}
                      .vuecal__event-content(
                        v-if="event.content && !(view === 'month' && event.allDay && showAllDayEvents === 'short') && !isShortMonthView"
                        v-html="event.content")
                  slot(v-slot:no-event) {{ texts.noEvent }}
</template>

<script>
import { setTexts, now, isDateToday, getPreviousFirstDayOfWeek, formatDate, formatTime, stringToDate, countDays } from './date-utils'
import { eventDefaults, createAnEvent, createEventSegments, eventInRange } from './event-utils'
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
    dblclickToNavigate: {
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
    resizeX: {
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
      type: [Function, null],
      default: null
    },
    onEventDblclick: {
      type: [Function, null],
      default: null
    },
    onEventCreate: {
      type: [Function, null],
      default: null
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
        selectedDate: null,
        events: []
      },
      eventIdIncrement: 1,
      domEvents: {
        resizeAnEvent: {
          _eid: null, // Only one at a time.
          start: null,
          split: null,
          segment: null,
          originalEndTimeMinutes: 0,
          endTimeMinutes: 0,
          startCell: null
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
        },
        // A single click can trigger event creation if the user decides so.
        // But prevent this to happen on click & hold, on event click and on resize event.
        cancelClickEventCreation: false
      },
      mutableEvents: [], // An array of mutable events updated each time given events array changes.
      transitionDirection: 'right'
    }
  },

  methods: {
    loadLocale (locale) {
      import(/* webpackInclude: /\.json$/, webpackChunkName: "i18n/[request]" */ `./i18n/${locale}`)
        .then(response => (this.texts = response.default))
      setTexts(this.texts)
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
          break
        case 'year':
          this.view.startDate = new Date(date.getFullYear(), 0, 1)
          this.view.endDate = new Date(date.getFullYear() + 1, 0, 1)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.
          break
        case 'month':
          this.view.startDate = new Date(date.getFullYear(), date.getMonth(), 1)
          this.view.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.

          // If the first day of the month is not a FirstDayOfWeek (Monday or Sunday), prepend missing days to the days array.
          let startDate = new Date(this.view.startDate)
          if (startDate.getDay() !== (this.startWeekOnSunday ? 0 : 1)) {
            startDate = getPreviousFirstDayOfWeek(startDate, this.startWeekOnSunday)
          }

          // Used in viewCells computed array & returned in emitted events.
          this.view.firstCellDate = startDate
          this.view.lastCellDate = startDate.addDays(41)
          break
        case 'week':
          const weekDaysCount = this.hideWeekends ? 5 : 7
          this.view.startDate = this.hideWeekends && this.startWeekOnSunday ? date.addDays(1) : date
          this.view.endDate = date.addDays(weekDaysCount)
          this.view.endDate.setSeconds(-1) // End at 23:59:59.
          break
        case 'day':
          this.view.startDate = date
          this.view.endDate = new Date(date)
          this.view.endDate.setHours(23, 59, 59) // End at 23:59:59.
          break
      }

      this.addEventsToView()

      if (this.ready) {
        const params = {
          view,
          startDate: this.view.startDate,
          endDate: this.view.endDate,
          ...(this.view.id === 'month' ? {
            firstCellDate: this.view.firstCellDate,
            lastCellDate: this.view.lastCellDate,
            outOfScopeEvents: this.view.outOfScopeEvents.map(this.cleanupEvent)
          } : {}),
          events: this.view.events.map(this.cleanupEvent),
          ...(this.view.id === 'week' ? { week: this.view.startDate.getWeek() } : {})
        }
        this.$emit('view-change', params)
      }
    },

    addEventsToView (events = []) {
      const { id, startDate, endDate, firstCellDate, lastCellDate } = this.view
      if (!events.length) this.view.events = []
      events = events.length ? events : this.mutableEvents

      if (['month', 'week', 'day'].includes(id) && events) {
        this.view.events.push(
          ...events
            .filter(e => eventInRange(e, startDate, endDate))
            .map(e => {
              // If multiple-day events.
              return e.start.substr(0, 10) === e.end.substr(0, 10) ? e : createEventSegments(e, startDate, endDate)
            })
        )

        if (id === 'month') {
          // Save out of scope events into the view object separated from the array of in-scope events.
          this.view.outOfScopeEvents = []
          events.forEach(e => {
            if (eventInRange(e, firstCellDate, startDate) || eventInRange(e, endDate, lastCellDate)) {
              // Only add to the view events array if not already there (multiple-day events case).
              if (!this.view.events.some(e2 => e2._eid === e._eid)) this.view.outOfScopeEvents.push(e)
              // if (!this.view.events.some(e2 => e2._eid === e._eid)) this.view.events.push(e)
            }
          })
        }
      }

      else if (['years', 'year'].includes(id) && events && this.eventsCountOnYearView) {
        this.view.events.push(...events.filter(e => eventInRange(e, startDate, endDate)))
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
      let segment = event.segments && event.segments[resizeAnEvent.start]
      const { startTimeMinutes, cursorCoords } = this.minutesAtCursor(e)

      // Don't allow time above 24 hours.
      resizeAnEvent.endTimeMinutes = Math.min(startTimeMinutes, 24 * 60)

      if (segment) segment.endTimeMinutes = resizeAnEvent.endTimeMinutes
      event.endTimeMinutes = resizeAnEvent.endTimeMinutes

      // @todo: Find a way to make this more performant while dragging.
      // ------------------------------------------------------------------
      let mutableEvent = this.mutableEvents.find(e => e._eid === resizeAnEvent._eid)
      mutableEvent.endTimeMinutes = Math.round(event.endTimeMinutes)
      mutableEvent.end = event.end.substr(0, 11) + formatTime(event.endTimeMinutes)
      mutableEvent.endDate = new Date(event.end)
      event.endTimeMinutes = mutableEvent.endTimeMinutes
      event.end = mutableEvent.end
      event.endDate = mutableEvent.endDate
      event.daysCount = countDays(event.startDate, event.endDate)
      // ------------------------------------------------------------------

      // Resize events horizontally if resize-x is enabled (add/remove segments).
      if (this.resizeX && this.view.id === 'week') {
        let cellsWidth = this.$refs.cells.offsetWidth
        let cellWidth = cellsWidth / (this.hideWeekends ? 5 : 7)
        let currentCell = Math.floor(cursorCoords.x / cellWidth)
        if (!resizeAnEvent.startCell) resizeAnEvent.startCell = currentCell
        const startCell = resizeAnEvent.startCell || currentCell
        const daysDelta = currentCell - startCell

        if (1) {
          let mutableEvent = this.mutableEvents.find(e => e._eid === resizeAnEvent._eid) || { segments: {} }

          // Don't allow resizing event toward the past (= endDate before startDate).
          const eventDaysCount = Math.max(mutableEvent.daysCount + daysDelta, 1)

          // While resizing to a single day event, Make sure the end time is at least equal to start time + 5min.
          if (eventDaysCount === 1) event.endTimeMinutes = Math.max(event.endTimeMinutes, event.startTimeMinutes + 5)

          mutableEvent.endDate = mutableEvent.startDate.addDays(eventDaysCount - 1)
          // if (!mutableEvent.endDate.getHours() && !mutableEvent.endDate.getMinutes()) {
          //   mutableEvent.endDate = new Date(mutableEvent.endDate.getTime() - 1000)
          // }
          mutableEvent.end = formatDate(mutableEvent.endDate) + ' ' + formatTime(event.endTimeMinutes)

          // Modify the event in the current view.
          event.endDate = mutableEvent.endDate
          event.end = mutableEvent.end
          createEventSegments(mutableEvent, this.view.startDate, this.view.endDate)
        }
      }
    },

    // Mouseup can never cancel a click with preventDefault or stopPropagation.
    onMouseUp (e) {
      let { resizeAnEvent, clickHoldAnEvent, clickHoldACell } = this.domEvents

      // On event resize end, emit event if duration has changed.
      if (resizeAnEvent._eid) {
        this.domEvents.cancelClickEventCreation = true
        let event = this.view.events.find(e => e._eid === resizeAnEvent._eid)
        if (event && event.endTimeMinutes !== resizeAnEvent.originalEndTimeMinutes) {
          let mutableEvent = this.mutableEvents.find(e => e._eid === resizeAnEvent._eid)
          mutableEvent.endTimeMinutes = Math.round(event.endTimeMinutes)
          mutableEvent.end = event.end.substr(0, 11) + formatTime(event.endTimeMinutes)
          mutableEvent.endDate = new Date(event.end)
          event.endTimeMinutes = mutableEvent.endTimeMinutes
          event.end = mutableEvent.end
          event.endDate = mutableEvent.endDate
          event.daysCount = countDays(event.startDate, event.endDate)

          this.emitWithEvent('event-change', event)
          this.emitWithEvent('event-duration-change', event)
        }

        if (event) event.resizing = false
        resizeAnEvent._eid = null
        resizeAnEvent.start = null
        resizeAnEvent.split = null
        resizeAnEvent.segment = null
        resizeAnEvent.originalEndTimeMinutes = null
        resizeAnEvent.endTimeMinutes = null
        resizeAnEvent.startCell = null
      }

      if (this.isDOMElementAnEvent(e.target)) this.domEvents.cancelClickEventCreation = true

      // If not mouse up on an event, unfocus any event except if just dragged.
      else if (!resizeAnEvent._eid) this.unfocusEvent()

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
      this.mutableEvents = []

      // Group events into dates.
      this.events.forEach(event => {
        // Event Start, accept formatted string or Date object.
        let start, startDate, startDateF, startTime, hoursStart, minutesStart
        if (event.start) {
          !([startDateF, startTime = ''] = event.start.split(' '))
          !([hoursStart, minutesStart] = startTime.split(':'))
          startDate = new Date(event.start)
        }
        else if (event.startDate && event.startDate instanceof Date) {
          startDateF = formatDate(event.startDate)
          hoursStart = event.startDate.getHours()
          minutesStart = event.startDate.getMinutes()
          startDate = event.startDate
        }
        const startTimeMinutes = parseInt(hoursStart) * 60 + parseInt(minutesStart)
        start = event.start || startDateF + ' ' + formatTime(startTimeMinutes)

        // Event End, accept formatted string or Date object.
        let end, endDate, endDateF, endTime, hoursEnd, minutesEnd
        if (event.end) {
          !([endDateF, endTime = ''] = event.end.split(' '))
          !([hoursEnd, minutesEnd] = endTime.split(':'))
          endDate = new Date(event.end)
        }
        else if (event.endDate && event.endDate instanceof Date) {
          endDateF = formatDate(event.endDate)
          hoursEnd = event.endDate.getHours()
          minutesEnd = event.endDate.getMinutes()
          endDate = event.endDate
        }
        const endTimeMinutes = parseInt(hoursEnd) * 60 + parseInt(minutesEnd)
        end = event.end || endDateF + ' ' + formatTime(endTimeMinutes)

        const multipleDays = startDateF !== endDateF

        event = Object.assign({
          ...eventDefaults,
          // Keep the event ids scoped to this calendar instance.
          _eid: `${this._uid}_${this.eventIdIncrement++}`,
          segments: multipleDays ? {} : null,
          start,
          startDate,
          startTimeMinutes,
          end,
          endDate,
          endTimeMinutes,
          daysCount: multipleDays ? countDays(startDate, endDate) : 1,
          classes: (event.class || '').split(' ')
        }, event)

        this.mutableEvents.push(event)
      })
    },

    getPosition (e) {
      // @todo: Cache bounding box & update it on resize.
      const rect = this.$refs.cells.getBoundingClientRect()
      const { clientX, clientY } = 'ontouchstart' in window && e.touches ? e.touches[0] : e
      return { x: clientX - rect.left, y: clientY - rect.top }
    },

    minutesAtCursor (e) {
      let startTimeMinutes = 0
      let cursorCoords = {}

      if (typeof e === 'number') startTimeMinutes = e
      else if (typeof e === 'object') {
        cursorCoords = this.getPosition(e)
        startTimeMinutes = cursorCoords.y * this.timeStep / parseInt(this.timeCellHeight) + this.timeFrom
      }

      return { startTimeMinutes, cursorCoords }
    },

    // Allow call from cell click & hold or external call via $refs.
    createEvent (dateTime, eventOptions = {}) {
      return createAnEvent(dateTime, eventOptions, this)
    },

    // Prepare the event to return it with an emitted event.
    cleanupEvent (event) {
      event = { ...event }

      // Delete vue-cal specific props instead of returning a set of props so user
      // can place whatever they want inside an event and see it returned.
      const discardProps = [
        'height', 'top', 'classes', 'split', 'segments', 'deletable',
        'deleting', 'resizable', 'resizing', 'focused'
      ]
      for (let prop in event) if (discardProps.includes(prop)) delete event[prop]

      return event
    },

    emitWithEvent (eventName, event) {
      this.$emit(eventName, this.cleanupEvent(event))
    },

    updateSelectedDate (date) {
      if (date && typeof date === 'string') date = stringToDate(date)

      if (date && date instanceof Date) {
        let { selectedDate } = this.view
        if (selectedDate) this.transitionDirection = selectedDate.getTime() > date.getTime() ? 'left' : 'right'
        // Select the day at midnight in order to allow fetching events on whole day.
        date.setHours(0, 0, 0)

        if (!selectedDate || selectedDate.getTime() !== date.getTime()) this.view.selectedDate = date
        this.switchView(this.view.id)
      }
    },

    countDays
  },

  created () {
    if (this.locale !== 'en') this.loadLocale(this.locale)
    else setTexts(this.texts)

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
      return date ? date.getTime() : null
    },
    maxTimestamp () {
      let date = null
      if (this.maxDate && typeof this.maxDate === 'string') date = stringToDate(this.maxDate)
      else if (this.maxDate && this.minDate instanceof Date) date = this.maxDate
      return date ? date.getTime() : null
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
              formattedDate: formatDate(startDate),
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
              formattedDate: formatDate(startDate),
              endDate,
              content: this.xsmall ? this.months[i].label.substr(0, 3) : this.months[i].label,
              current: i === this.now.getMonth() && fromYear === this.now.getFullYear()
            }
          })
          break
        case 'month':
          const month = this.view.startDate.getMonth()
          const firstCellDate = new Date(this.view.firstCellDate)
          todayFound = false

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
              formattedDate: formatDate(startDate),
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
              formattedDate: formatDate(startDate),
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
            formattedDate: formatDate(startDate),
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
        this.addEventsToView()
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
