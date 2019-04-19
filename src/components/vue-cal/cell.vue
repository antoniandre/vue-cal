<template lang="pug">
  transition-group.vuecal__cell(
    :class="{ [cssClass]: true, 'vuecal__cell--has-splits': splits.length, 'vuecal__cell--has-events': events.length }"
    :style="cellStyles" tag="div" :name="`slide-fade--${transitionDirection}`"
    :appear="transitions")
    .vuecal__flex.vuecal__cell-content(
      :class="splits.length && `vuecal__cell-split ${splits[i - 1].class}`"
      :data-split="splits.length && i"
      v-for="i in (splits.length || 1)"
      :key="transitions ? `${view}-${content}-${i}` : i"
      column
      @touchstart="onCellTouchStart($event, splits.length ? i : null)"
      @mousedown="onCellMouseDown($event, splits.length ? i : null)"
      @click="selectCell()"
      @dblclick="$parent.dblClickToNavigate && $parent.switchToNarrowerView()")
      slot(name="cell-content" :events="events" :selectCell="() => {selectCell(true)}" :split="splits[i - 1]")
      .vuecal__cell-events(
        v-if="events.length && (['week', 'day'].includes(view) || (view === 'month' && eventsOnMonthView))")
        event(
          v-if="!time || (event.startTimeMinutes < timeTo && event.endTimeMinutes > timeFrom)"
          v-for="(event, j) in (splits.length ? splitEvents[i] : events)" :key="j"
          :vuecal="$parent"
          :event="event"
          :all-day-events="allDayEvents"
          :cell-events="splits.length ? splitEvents[i] : events"
          :split="splits.length ? i : 0")
          div(slot="event-renderer" slot-scope="{ event, view }")
            slot(name="event-renderer" :view="view" :event="event")
    .vuecal__now-line(v-if="timelineVisible" :style="`top: ${todaysTimePosition}px`" :key="transitions ? `${view}-now-line` : 'now-line'")
</template>

<script>
import { selectCell } from './cell-utils'
import { updateEventPosition, checkCellOverlappingEvents } from './event-utils'
import Event from './event'

export default {
  components: { Event },
  props: {
    cssClass: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      required: true
    },
    formattedDate: {
      type: String,
      default: ''
    },
    content: {
      type: [String, Number],
      default: ''
    },
    splits: {
      type: Array,
      default: () => []
    },
    today: {
      type: Boolean,
      default: false
    },
    allDayEvents: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    checkCellOverlappingEvents,

    isDOMElementAnEvent (el) {
      return el.classList.contains('vuecal__event') || this.$parent.findAncestor(el, 'vuecal__event')
    },

    selectCell () {
      selectCell(false, this.date, this.$parent)
    },

    onCellMouseDown (e, split = null, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false

      let { clickHoldACell } = this.domEvents

      // If not mousedown on an event, click & hold to create an event.
      if (this.editableEvents && !this.isDOMElementAnEvent(e.target) && ['month', 'week', 'day'].indexOf(this.view) > -1) {
        clickHoldACell.cellId = `${this.$parent._uid}_${this.formattedDate}`
        clickHoldACell.split = split
        clickHoldACell.timeoutId = setTimeout(() => {
          if (clickHoldACell.cellId) {
            this.$parent.createEvent(this.formattedDate, e, clickHoldACell.split ? { split: clickHoldACell.split } : {})
          }
        }, clickHoldACell.timeout)
      }
    },

    onCellTouchStart (e, split = null) {
      // If not mousedown on an event.
      if (!this.isDOMElementAnEvent(e.target)) this.onCellMouseDown(e, split, true)
    }
  },

  created () {
    if (this.time) {
      if (this.splits.length) {
        this.splits.forEach((s, i) => checkCellOverlappingEvents(this.splitEvents[i]))
      }
      else checkCellOverlappingEvents(this.events)
    }
  },

  computed: {
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
    time () {
      return this.$parent.time
    },
    timeCellHeight () {
      return parseInt(this.$parent.timeCellHeight)
    },
    timeFrom () {
      return parseInt(this.$parent.timeFrom)
    },
    timeTo () {
      return parseInt(this.$parent.timeTo)
    },
    timeStep () {
      return parseInt(this.$parent.timeStep)
    },
    editableEvents () {
      return this.$parent.editableEvents
    },
    clickToNavigate () {
      return this.$parent.clickToNavigate
    },
    dblClickToNavigate () {
      return this.$parent.dblClickToNavigate
    },
    showAllDayEvents () {
      return this.$parent.showAllDayEvents
    },
    eventsOnMonthView () {
      return this.$parent.eventsOnMonthView
    },
    transitions () {
      return this.$parent.transitions
    },
    transitionDirection () {
      return this.$parent.transitionDirection
    },
    cellStyles () {
      return { minWidth: this.view === 'week' && this.$parent.minCellWidth ? `${this.$parent.minCellWidth}px` : null, position: 'relative' }
    },
    events: {
      get () {
        let events = []

        // Events count on years/year view.
        if (['years', 'year'].includes(this.view) && (this.eventsCountOnYearView || 1)) {
          const cellStart = this.date.getTime()
          const cellEnd = (this.view === 'years'
            ? new Date(this.date.getFullYear() + 1, 0)
            : new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0)).getTime()
          events = this.$parent.events.filter(e => {
            const eventStart = new Date(e.start)
            const eventEnd = new Date(e.end)
            return eventStart >= cellStart && eventEnd <= cellEnd
          })
        }

        // All the other views.
        else events = this.$parent.mutableEvents[this.formattedDate] || []

        events.forEach(event => {
          if (this.$parent.time && event.startTime && !(this.showAllDayEvents && this.allDayEvents) && !['years', 'year'].includes(this.view)) {
            updateEventPosition(event, this.$parent)
          }
        })

        return (this.showAllDayEvents && this.view !== 'month'
          ? events.filter(e => !!e.allDay === this.allDayEvents)
          : events)
      },
      set (events) {
        this.$parent.mutableEvents[this.formattedDate] = events
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
      if (!this.today || !this.time || this.allDayEvents || ['week', 'day'].indexOf(this.view) === -1) return

      const now = new Date()
      return (now.getHours() * 60 + now.getMinutes()) <= this.timeTo
    },
    todaysTimePosition () {
      // Make sure to skip the Maths if not relevant.
      if (!this.today || !this.time) return

      const now = new Date()
      const startTimeMinutes = now.getHours() * 60 + now.getMinutes()
      const minutesFromTop = startTimeMinutes - this.timeFrom
      return Math.round(minutesFromTop * this.timeCellHeight / this.timeStep)
    }
  }
}
</script>

<style lang="scss">
.vuecal__cell {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
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

  &--has-splits {
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

  &-events-count {
    background: #999;
    color: #fff;
    position: absolute;
    border-radius: 12px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    margin-top: -1px;
    line-height: 12px;
    font-size: 10px;
  }

  &-content {
    width: 100%;

    .vuecal--years-view &,
    .vuecal--year-view &,
    .vuecal--month-view & {justify-content: center;}
  }

  &-events {width: 100%;}
}

.vuecal--split-days.vuecal--week-view .vuecal__cell--has-splits {
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
