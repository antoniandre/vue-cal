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
    .vuecal__now-line(v-if="timelineVisible" :style="`top: ${todaysTimePosition}px`" :key="options.transitions ? `${view}-now-line` : 'now-line'")
</template>

<script>
import { selectCell } from './cell-utils'
import { updateEventPosition, checkCellOverlappingEvents, eventInRange } from './event-utils'
import Event from './event'

export default {
  components: { Event },
  props: {
    // Vue-cal main component options (props).
    options: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      required: true
    },
    cellSplits: {
      type: Array,
      default: () => []
    },
    minTimestamp: {
      type: [Number, null],
      default: null
    },
    maxTimestamp: {
      type: [Number, null],
      default: null
    },
    cellWidth: {
      type: [Number, Boolean],
      default: false
    },
    allDay: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    cellOverlaps: {},
    cellOverlapsStreak: 1 // Largest amount of simultaneous events in cell.
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
        else [this.cellOverlaps, this.cellOverlapsStreak] = checkCellOverlappingEvents(this.events)
      }
    },

    isDOMElementAnEvent (el) {
      return el.classList.contains('vuecal__event') || this.$parent.findAncestor(el, 'vuecal__event')
    },

    selectCell (DOMEvent, force = false) {
      const date = new Date(this.data.startDate)
      date.setMinutes(this.$parent.minutesAtCursor(DOMEvent).startTimeMinutes)

      selectCell(force, date, this.$parent)
    },

    onCellMouseDown (DOMEvent, split = null, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false

      let { clickHoldACell } = this.domEvents
      // Reinit the click trigger on each mousedown.
      // In some cases we explicitly set this flag to prevent the click event to trigger,
      // and cancel event creation.
      this.domEvents.cancelClickEventCreation = false

      // If the cellClickHold option is true and not mousedown on an event, click & hold to create an event.
      if (this.options.editableEvents && this.options.cellClickHold
        && !this.isDOMElementAnEvent(DOMEvent.target) && ['month', 'week', 'day'].includes(this.view)) {
        clickHoldACell.cellId = `${this.$parent._uid}_${this.data.formattedDate}`
        clickHoldACell.split = split
        clickHoldACell.timeoutId = setTimeout(() => {
          if (clickHoldACell.cellId) {
            const date = new Date(this.data.startDate)
            date.setMinutes(this.$parent.minutesAtCursor(DOMEvent).startTimeMinutes)

            if (!this.domEvents.cancelClickEventCreation) this.$parent.createEvent(date, clickHoldACell.split ? { split: clickHoldACell.split } : {})
          }
        }, clickHoldACell.timeout)
      }
    },

    onCellTouchStart (DOMEvent, split = null) {
      // If not mousedown on an event.
      if (!this.isDOMElementAnEvent(DOMEvent.target)) this.onCellMouseDown(DOMEvent, split, true)
    },

    onCellDblClick (DOMEvent) {
      const date = new Date(this.data.startDate)
      date.setMinutes(this.$parent.minutesAtCursor(DOMEvent).startTimeMinutes)
      this.$parent.$emit('cell-dblclick', date)

      if (this.options.dblclickToNavigate) this.$parent.switchToNarrowerView()
    }
  },

  computed: {
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
    selected () {
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
        ...(this.cellWidth ? { width: `${this.cellWidth}%` } : {}),
        minWidth: this.view === 'week' && this.$parent.minCellWidth ? `${this.$parent.minCellWidth}px` : null
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

        // Only keep events in view.
        events = events.filter(e => eventInRange(e, cellStart, cellEnd))

        if (this.options.showAllDayEvents && this.view !== 'month') events = events.filter(e => !!e.allDay === this.allDay)

        if (this.options.time && ['week', 'day'].includes(this.view) && !this.allDay) {
          events = events.filter(e => e.allDay || e.daysCount > 1 || (e.startTimeMinutes < this.options.timeTo && e.endTimeMinutes > this.options.timeFrom))
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

        // console.log('rechecking cell events', this.$parent._uid, cellStart)
        // If splits, checkCellOverlappingEvents() is called from within computed splits.
        if (!this.cellSplits.length) this.$nextTick(this.checkCellOverlappingEvents)
      }

      return events
    },
    splits () {
      return this.cellSplits.map((item, i) => {
        const events = this.events.filter(e => e.split === i + 1)
        const [overlaps, streak] = checkCellOverlappingEvents(events.filter(e => !e.background && !e.allDay))
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

      const now = new Date()
      return (now.getHours() * 60 + now.getMinutes()) <= this.options.timeTo
    },
    todaysTimePosition () {
      // Skip the Maths if not relevant.
      if (!this.data.today || !this.options.time) return

      const now = new Date()
      const startTimeMinutes = now.getHours() * 60 + now.getMinutes()
      const minutesFromTop = startTimeMinutes - this.options.timeFrom
      return Math.round(minutesFromTop * this.options.timeCellHeight / this.options.timeStep)
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
  .vuecal__cells.week-view &,
  .vuecal__cells.day-view & {
    width: 14.2857%;
  }

  .vuecal--hide-weekends .vuecal__cells.month-view &,
  .vuecal--hide-weekends .vuecal__cells.week-view &,
  .vuecal--hide-weekends .vuecal__cells.day-view & {
    width: 20%;
  }

  .vuecal__cells.years-view & {width: 20%;}
  .vuecal__cells.year-view & {width: 33.33%;}
  .vuecal__cells.day-view & {flex: 1;}

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
