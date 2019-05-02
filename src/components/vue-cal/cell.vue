<template lang="pug">
  transition-group.vuecal__cell(
    :class="cssClasses"
    :name="`slide-fade--${transitionDirection}`"
    tag="div"
    :appear="options.transitions"
    :style="cellStyles")
    .vuecal__flex.vuecal__cell-content(
      :class="splits.length && `vuecal__cell-split ${splits[i - 1].class}`"
      :data-split="splits.length && i"
      v-for="i in (splits.length || 1)"
      :key="options.transitions ? `${view}-${data.content}-${i}` : i"
      column
      @touchstart="!isDisabled && onCellTouchStart($event, splits.length ? i : null)"
      @mousedown="!isDisabled && onCellMouseDown($event, splits.length ? i : null)"
      @click="!isDisabled && selectCell()"
      @dblclick="!isDisabled && options.dblClickToNavigate && $parent.switchToNarrowerView()")
      slot(name="cell-content" :events="events" :selectCell="() => {selectCell(true)}" :split="splits[i - 1]")
      .vuecal__cell-events(
        v-if="events.length && (['week', 'day'].includes(view) || (view === 'month' && options.eventsOnMonthView))")
        event(
          v-for="(event, j) in (splits.length ? splitEvents[i] : events)" :key="j"
          :vuecal="$parent"
          :event="event"
          :all-day="allDay"
          :cell-events="splits.length ? splitEvents[i] : events"
          :split="splits.length ? i : 0")
          div(slot="event-renderer" slot-scope="{ event, view }")
            slot(name="event-renderer" :view="view" :event="event")
    .vuecal__now-line(v-if="timelineVisible" :style="`top: ${todaysTimePosition}px`" :key="options.transitions ? `${view}-now-line` : 'now-line'")
</template>

<script>
import { selectCell } from './cell-utils'
import { updateEventPosition, checkCellOverlappingEvents } from './event-utils'
import Event from './event'

export default {
  components: { Event },
  props: {
    // Vuecal main component options (props).
    options: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      required: true
    },
    splits: {
      type: Array,
      default: () => []
    },
    minTimestamp: {
      type: Number,
      default: 0
    },
    maxTimestamp: {
      type: Number,
      default: 0
    },
    allDay: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    checkCellOverlappingEvents () {
      if (this.options.time) {
        if (this.splits.length) {
          this.splits.forEach((s, i) => checkCellOverlappingEvents(this.splitEvents[i]))
        }
        else checkCellOverlappingEvents(this.events)
      }
    },

    isDOMElementAnEvent (el) {
      return el.classList.contains('vuecal__event') || this.$parent.findAncestor(el, 'vuecal__event')
    },

    selectCell (force = false) {
      selectCell(force, this.data.startDate, this.$parent)
    },

    onCellMouseDown (e, split = null, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false

      let { clickHoldACell } = this.domEvents

      // If not mousedown on an event, click & hold to create an event.
      if (this.options.editableEvents && !this.isDOMElementAnEvent(e.target) && ['month', 'week', 'day'].includes(this.view)) {
        clickHoldACell.cellId = `${this.$parent._uid}_${this.data.formattedDate}`
        clickHoldACell.split = split
        clickHoldACell.timeoutId = setTimeout(() => {
          if (clickHoldACell.cellId) {
            this.$parent.createEvent(this.data.formattedDate, e, clickHoldACell.split ? { split: clickHoldACell.split } : {})
          }
        }, clickHoldACell.timeout)
      }
    },

    onCellTouchStart (e, split = null) {
      // If not mousedown on an event.
      if (!this.isDOMElementAnEvent(e.target)) this.onCellMouseDown(e, split, true)
    }
  },

  computed: {
    isBeforeMinDate () {
      return this.minTimestamp > this.data.endDate.getTime()
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
        selected: this.$parent.selectedDateFormatted === this.data.formattedDate
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
        minWidth: this.view === 'week' && this.$parent.minCellWidth ? `${this.$parent.minCellWidth}px` : null
      }
    },
    events: {
      get () {
        let events = []

        // Events count on years/year view.
        if (['years', 'year'].includes(this.view) && (this.options.eventsCountOnYearView || 1)) {
          const cellStart = this.data.startDate.getTime()
          const cellEnd = this.data.endDate.getTime()
          events = this.$parent.events.filter(e => {
            const eventStart = new Date(e.start).getTime()
            const eventEnd = new Date(e.end).getTime()
            return eventStart >= cellStart && eventEnd <= cellEnd
          })
        }

        // All the other views.
        else {
          events = this.$parent.mutableEvents[this.data.formattedDate] || []

          // Position events with time in the timeline when there is a timeline and not in allDay slot.
          if (this.options.time && ['week', 'day'].includes(this.view) && !(this.options.showAllDayEvents && this.allDay)) {
            events.forEach(event => {
              // all-day events are positionned via css: top-0 & bottom-0.
              // So they behave as background events if not in allDay slot.
              // @todo: Do we want this or not?
              if (event.startTime && !event.allDay) updateEventPosition(event, this.$parent)
            })
          }

          this.$nextTick(this.checkCellOverlappingEvents)

          if (this.options.showAllDayEvents && this.view !== 'month') events = events.filter(e => !!e.allDay === this.allDay)

          if (this.options.time && ['week', 'day'].includes(this.view) && !this.allDay) {
            events = events.filter(e => e.allDay || (e.startTimeMinutes < this.options.timeTo && e.endTimeMinutes > this.options.timeFrom))
          }
        }

        return events
      },
      set (events) {
        this.$parent.mutableEvents[this.data.formattedDate] = events
      }
    },
    splitEvents () {
      let splitsEventIndexes = {}
      this.events.forEach(e => {
        if (e.split) {
          if (!splitsEventIndexes[e.split]) splitsEventIndexes[e.split] = []
          splitsEventIndexes[e.split].push(e)
        }
      })

      return splitsEventIndexes
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
    background: #999;
    color: #fff;
    position: absolute;
    border-radius: 12px;
    left: 50%;
    transform: translateX(-50%);
    min-width: 12px;
    padding: 0 3px;
    height: 12px;
    margin-top: -1px;
    line-height: 12px;
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
