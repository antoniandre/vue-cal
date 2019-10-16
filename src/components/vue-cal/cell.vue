<template lang="pug">
  transition-group.vuecal__cell(
    :class="cssClasses"
    :name="`slide-fade--${transitionDirection}`"
    tag="div"
    :appear="options.transitions"
    :style="cellStyles")
    .vuecal__flex.vuecal__cell-content(
      v-for="(split, i) in (splits.length ? splits : 1)"
      :key="options.transitions ? `${view}-${data.content}-${i}` : i"
      :class="splits.length && `vuecal__cell-split ${split.class}`"
      :data-split="splits.length ? i + 1 : false"
      column
      tabindex="0"
      :aria-label="data.content"
      @focus="onCellFocus($event)"
      @keypress.enter="$parent.switchToNarrowerView"
      @touchstart="!isDisabled && onCellTouchStart($event, splits.length ? i + 1 : null)"
      @mousedown="!isDisabled && onCellMouseDown($event, splits.length ? i + 1 : null)"
      @click="!isDisabled && selectCell($event)"
      @dblclick="!isDisabled && onCellDblClick($event)")
      slot(name="cell-content" :events="events" :select-cell="$event => selectCell($event, true)" :split="splits.length ? split : false")
      .vuecal__cell-events(
        v-if="events.length && (['week', 'day'].includes(view) || (view === 'month' && options.eventsOnMonthView))")
        event(
          v-for="(event, j) in (splits.length ? split.events : events)" :key="j"
          :vuecal="$parent"
          :cell-formatted-date="data.formattedDate"
          :event="event"
          :all-day="allDay"
          :cell-events="splits.length ? split.events : events"
          :overlaps="((splits.length ? split.overlaps[event._eid] : cellOverlaps[event._eid]) || []).overlaps"
          :event-position="((splits.length ? split.overlaps[event._eid] : cellOverlaps[event._eid]) || []).position"
          :overlaps-streak="splits.length ? split.overlapsStreak : cellOverlapsStreak")
          template(v-slot:event-renderer="{ event, view }")
            slot(name="event-renderer" :view="view" :event="event")
    .vuecal__now-line(
      v-if="timelineVisible"
      :style="`top: ${todaysTimePosition}px`"
      :key="options.transitions ? `${view}-now-line` : 'now-line'"
      :title="$parent.formatTime(nowInMinutes)")
</template>

<script>
import { selectCell } from './cell-utils'
import { updateEventPosition, checkCellOverlappingEvents, eventInRange } from './event-utils'
import Event from './event'

export default {
  components: { Event },
  props: {
    // Vue-cal main component options (props).
    options: { type: Object, default: () => ({}) },
    data: { type: Object, required: true },
    cellSplits: { type: Array, default: () => [] },
    minTimestamp: { type: [Number, null], default: null },
    maxTimestamp: { type: [Number, null], default: null },
    cellWidth: { type: [Number, Boolean], default: false },
    allDay: { type: Boolean, default: false }
  },

  data: () => ({
    cellOverlaps: {},
    cellOverlapsStreak: 1, // Largest amount of simultaneous events in cell.
    // On mouse down, save the time at cursor so it can be reused on cell focus event
    // where there is no cursor coords.
    timeAtCursor: null,
    now: new Date(),
    timeTickerIds: [null, null] // 2 timeouts: 1 to snap to round minutes, then 1 every minute.
  }),

  methods: {
    checkCellOverlappingEvents () {
      // If splits, checkCellOverlappingEvents() is called from within computed splits.
      if (this.options.time && this.events.length && !this.splits.length) {
        if (this.events.length === 1) {
          this.cellOverlaps = []
          this.cellOverlapsStreak = 1
        }
        // If only 1 event remains re-init the overlaps.
        else [this.cellOverlaps, this.cellOverlapsStreak] = checkCellOverlappingEvents(this.events, this.options)
      }
    },

    isDOMElementAnEvent (el) {
      return this.$parent.isDOMElementAnEvent(el)
    },

    selectCell (DOMEvent, force = false) {
      if (!this.selected) this.onCellFocus(DOMEvent)

      // If splitting days, also return the clicked split on cell click when emitting event.
      let split
      if (this.$parent.splitDays.length) {
        split = (DOMEvent.target.classList.contains('vuecal__cell-split') && DOMEvent.target) ||
          this.$parent.findAncestor(DOMEvent.target, 'vuecal__cell-split')
        if (split) split = split.attributes['data-split'].value
      }

      selectCell(force, this.$parent, this.timeAtCursor, split)
      this.timeAtCursor = null
    },

    /**
     * On cell focus, from tab key or from click, emit the cell-focus event with
     * the date of the cell start when focusing from tab or the date & time at cursor
     * if click/touch.
     */
    onCellFocus (DOMEvent) {
      if (!this.selected) {
        this.selected = this.data.startDate

        // If splitting days, also return the clicked split on cell click when emitting event.
        let split
        if (this.$parent.splitDays.length) {
          split = (DOMEvent.target.classList.contains('vuecal__cell-split') && DOMEvent.target) ||
            this.$parent.findAncestor(DOMEvent.target, 'vuecal__cell-split')
          if (split) split = split.attributes['data-split'].value
        }

        // Cell-focus event returns the cell start date (at midnight) if triggered from tab key,
        // or cursor coords time if clicked.
        const date = this.timeAtCursor || this.data.startDate
        this.$parent.$emit('cell-focus', split ? { date, split } : date)
      }
    },

    onCellMouseDown (DOMEvent, split = null, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false

      let { clickHoldACell, focusAnEvent } = this.domEvents
      // Reinit the click trigger on each mousedown.
      // In some cases we explicitly set this flag to prevent the click event to trigger,
      // and cancel event creation.
      this.domEvents.cancelClickEventCreation = false

      this.timeAtCursor = new Date(this.data.startDate)
      this.timeAtCursor.setMinutes(this.$parent.minutesAtCursor(DOMEvent).startTimeMinutes)

      // Unfocus an event if any is focused and clicking on cell outside of an event.
      if (!this.isDOMElementAnEvent(DOMEvent.target) && focusAnEvent._eid) {
        (this.$parent.view.events.find(e => e._eid === focusAnEvent._eid) || {}).focused = false
      }

      // If the cellClickHold option is true and not mousedown on an event, click & hold to create an event.
      if (this.options.editableEvents && this.options.cellClickHold &&
        ['month', 'week', 'day'].includes(this.view)) {
        clickHoldACell.cellId = `${this.$parent._uid}_${this.data.formattedDate}`
        clickHoldACell.split = split
        clickHoldACell.timeoutId = setTimeout(() => {
          if (clickHoldACell.cellId && !this.domEvents.cancelClickEventCreation) {
            this.$parent.createEvent(this.timeAtCursor, clickHoldACell.split ? { split: clickHoldACell.split } : {})
          }
        }, clickHoldACell.timeout)
      }
    },

    onCellTouchStart (DOMEvent, split = null) {
      // If not mousedown on an event.
      this.onCellMouseDown(DOMEvent, split, true)
    },

    onCellDblClick (DOMEvent) {
      const date = new Date(this.data.startDate)
      date.setMinutes(this.$parent.minutesAtCursor(DOMEvent).startTimeMinutes)

      // If splitting days, also return the clicked split on cell click when emitting event.
      let split
      if (this.$parent.splitDays.length) {
        split = (DOMEvent.target.classList.contains('vuecal__cell-split') && DOMEvent.target) ||
          this.$parent.findAncestor(DOMEvent.target, 'vuecal__cell-split')
        if (split) split = split.attributes['data-split'].value
      }

      this.$parent.$emit('cell-dblclick', split ? { date, split } : date)

      if (this.options.dblclickToNavigate) this.$parent.switchToNarrowerView()
    },

    timeTick () {
      // Updating `now` will re-trigger the computed `todaysTimePosition`.
      this.now = new Date()
      this.timeTickerIds[1] = setTimeout(this.timeTick, 60000) // Every minute.
    }
  },

  computed: {
    nowInMinutes () {
      return this.now.getHours() * 60 + this.now.getMinutes()
    },
    isBeforeMinDate () {
      return this.minTimestamp !== null && this.minTimestamp > this.data.endDate.getTime()
    },
    isAfterMaxDate () {
      return this.maxTimestamp && this.maxTimestamp < this.data.startDate.getTime()
    },
    isDisabled () {
      return this.isBeforeMinDate || this.isAfterMaxDate
    },
    cssClasses () {
      return {
        'vuecal__cell--has-splits': this.splits.length,
        'vuecal__cell--has-events': this.events.length,
        current: this.data.current,
        today: this.data.today,
        'out-of-scope': this.data.outOfScope,
        disabled: this.isDisabled,
        'before-min': this.isDisabled && this.isBeforeMinDate,
        'after-max': this.isDisabled && this.isAfterMaxDate,
        selected: this.selected
      }
    },
    selected: {
      get () {
        let selected = false
        const { selectedDate } = this.$parent.view

        if (this.view === 'years') {
          selected = selectedDate.getFullYear() === this.data.startDate.getFullYear()
        }
        else if (this.view === 'year') {
          selected = (selectedDate.getFullYear() === this.data.startDate.getFullYear() &&
            selectedDate.getMonth() === this.data.startDate.getMonth())
        }
        else selected = selectedDate.getTime() === this.data.startDate.getTime()

        return selected
      },
      set (date) {
        this.$parent.view.selectedDate = date
      }
    },
    domEvents: {
      get () {
        return this.$parent.domEvents
      },
      set (object) {
        this.$parent.domEvents = object
      }
    },
    texts () {
      return this.$parent.texts
    },
    view () {
      return this.$parent.view.id
    },
    transitionDirection () {
      return this.$parent.transitionDirection
    },
    cellStyles () {
      return {
        // cellWidth is only applied when hiding weekdays on month and week views.
        ...(this.cellWidth ? { width: `${this.cellWidth}%` } : {})
      }
    },
    events () {
      const { startDate: cellStart, endDate: cellEnd } = this.data
      let events = []

      // Calculate events on month/week/day views or years/year if eventsCountOnYearView.
      if (!(['years', 'year'].includes(this.view) && !this.options.eventsCountOnYearView)) {
        // Means that when $parent.view.events changes all the cells will be looking up new value. :/
        // Also clone array to prevent modifying original.
        events = this.$parent.view.events.slice(0)

        if (this.view === 'month') {
          events.push(...this.$parent.view.outOfScopeEvents)
        }

        // Only keep events in cell time range.
        events = events.filter(e => eventInRange(e, cellStart, cellEnd))

        if (this.options.showAllDayEvents && this.view !== 'month') events = events.filter(e => !!e.allDay === this.allDay)

        // From events in view, filter the ones that are out of time range in this cell.
        if (this.options.time && ['week', 'day'].includes(this.view) && !this.allDay) {
          const { timeFrom, timeTo } = this.options

          events = events.filter(e => {
            let segment = (e.daysCount > 1 && e.segments[this.data.formattedDate]) || {}
            return (
              e.allDay ||
              (e.daysCount === 1 && e.startTimeMinutes < timeTo && e.endTimeMinutes > timeFrom) ||
              (e.daysCount > 1 && (segment.startTimeMinutes < timeTo && segment.endTimeMinutes > timeFrom))
            )
          })
        }

        // Position events with time in the timeline when there is a timeline and not in allDay slot.
        if (this.options.time && ['week', 'day'].includes(this.view) && !(this.options.showAllDayEvents && this.allDay)) {
          events.forEach(event => {
            // all-day events are positionned via css: top-0 & bottom-0.
            // So they behave as background events if not in allDay slot.
            // @todo: Do we want this or not?
            const eventToUpdate = (event.segments && event.segments[this.data.formattedDate]) || event
            if ((event.startTimeMinutes || event.endTimeMinutes) && !event.allDay) updateEventPosition(eventToUpdate, this.$parent)
          })

          // Sort events in chronological order.
          events.sort((a, b) => a.start < b.start ? -1 : 1)
        }

        // If splits, checkCellOverlappingEvents() is called from within computed splits.
        if (!this.cellSplits.length) this.$nextTick(this.checkCellOverlappingEvents)
      }

      return events
    },
    splits () {
      return this.cellSplits.map((item, i) => {
        const events = this.events.filter(e => e.split === i + 1)
        const [overlaps, streak] = checkCellOverlappingEvents(events.filter(e => !e.background && !e.allDay), this.options)
        return {
          ...item,
          overlaps,
          overlapsStreak: streak,
          events
        }
      })
    },
    timelineVisible () {
      if (!this.data.today || !this.options.time || this.allDay || !['week', 'day'].includes(this.view)) return

      return (this.now.getHours() * 60 + this.now.getMinutes()) <= this.options.timeTo
    },
    todaysTimePosition () {
      // Skip the Maths if not relevant.
      if (!this.data.today || !this.options.time) return

      const startTimeMinutes = this.now.getHours() * 60 + this.now.getMinutes()
      const minutesFromTop = startTimeMinutes - this.options.timeFrom
      return Math.round(minutesFromTop * this.options.timeCellHeight / this.options.timeStep)
    }
  },

  created () {
    // Timers are expensive, this should only trigger on demand.
    if (this.data.today && this.options.time && this.options.watchRealTime) {
      const now = new Date()
      // Snap the time ticker on sharp minutes (when seconds = 0), so that we can set
      // the time ticker interval to 60 seconds and spare some function calls.
      this.timeTickerIds[0] = setTimeout(this.timeTick, (60 - now.getSeconds()) * 1000)
    }
  },

  beforeDestroy () {
    // Don't keep the ticking running if unused.
    if (this.timeTickerIds[0] || this.timeTickerIds[1]) {
      clearTimeout(this.timeTickerIds[0])
      clearTimeout(this.timeTickerIds[1])
      this.timeTickerIds = [null, null]
    }
  }
}
</script>

<style lang="scss">
.vuecal__cell {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  .vuecal__cells.month-view &,
  .vuecal__cells.week-view & {
    width: 14.2857%;
  }

  .vuecal--hide-weekends .vuecal__cells.month-view &,
  .vuecal--hide-weekends .vuecal__cells.week-view & {
    width: 20%;
  }

  .vuecal__cells.years-view & {width: 20%;}
  .vuecal__cells.year-view & {width: 33.33%;}
  .vuecal__cells.day-view & {flex: 1;}
  .vuecal--overflow-x.vuecal--day-view & {width: auto;}

  .vuecal--click-to-navigate & {cursor: pointer;}
  .vuecal--view-with-time &,
  .vuecal--week-view.vuecal--no-time &,
  .vuecal--day-view.vuecal--no-time & {display: block;}

  &.vuecal__cell--has-splits {
    flex-direction: row;
    display: flex;
  }

  &-content {
    position: relative;
    height: 100%;
    outline: none;
  }

  &-split {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  &:before {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0;
    left: 0;
    right: -1px;
    bottom: -1px;
    border: 1px solid #ddd;
  }
  .vuecal--overflow-x.vuecal--day-view &:before {bottom: 0;}

  &.today,
  &.current {
    background-color: rgba(240, 240, 255, 0.4);
    z-index: 1;
  }

  &.selected {
    background-color: rgba(235, 255, 245, 0.4);
    z-index: 2;

    // .vuecal--day-view &:before {background: none;border: 1px solid rgba(235, 255, 245, 0.4);}
    .vuecal--day-view & {background: none;}
  }

  &.out-of-scope {color: #ccc;}
  &.disabled {color: #ccc;cursor: not-allowed;}

  &-events-count {
    position: absolute;
    left: 50%;
    top: 65%;
    transform: translateX(-50%);
    min-width: 12px;
    height: 12px;
    line-height: 12px;
    padding: 0 3px;
    background: #999;
    color: #fff;
    border-radius: 12px;
    font-size: 10px;
    box-sizing: border-box;
  }

  &-content {
    width: 100%;

    .vuecal--years-view &,
    .vuecal--year-view &,
    .vuecal--month-view & {justify-content: center;}
  }

  &-events {width: 100%;}
}

.vuecal--overflow-x.vuecal--week-view .vuecal__cell, .vuecal__cell-split {
  overflow: hidden;
}

.vuecal__no-event {
  padding-top: 1em;
  color: #aaa;
  justify-self: flex-start;
  margin-bottom: auto; // Vertical align top within flex column and align center.
}

.vuecal__all-day .vuecal__no-event {display: none;}

.vuecal__now-line {
  position: absolute;
  left: 0;
  width: 100%;
  height: 0;
  color: red;
  border-top: 1px solid currentColor;
  opacity: 0.6;

  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: 0;
    border: 5px solid transparent;
    border-left-color: currentColor;
  }
}
</style>
