<template lang="pug">
  transition-group.vuecal__cell(:class="{ [cssClass]: true, splitted: splits.length, 'vuecal__cell--has-events': events.length }" :style="cellStyles" tag="div" :name="`slide-fade--${transitionDirection}`" :appear="transitions")
    .vuecal__flex.vuecal__cell-content(:class="splits.length && `vuecal__cell-split ${splits[i - 1].class}`" v-for="i in (splits.length || 1)" :key="transitions ? `${view}-${content}-${i}` : i" column)
      .split-label(v-if="splits.length" v-html="splits[i - 1].label")
      .vuecal__cell-date(v-if="content" v-html="content")
      .vuecal__no-event(v-if="!events.length && (['week', 'day'].indexOf(view) > -1 || (view === 'month' && eventsOnMonthView))")
        slot(name="no-event") {{ texts.noEvent }}
      .vuecal__cell-events(v-if="events.length && (['week', 'day'].indexOf(view) > -1 || (view === 'month' && eventsOnMonthView))")
        .vuecal__event(:class="eventClasses(event)"
                      v-for="(event, j) in (splits.length ? splitEvents[i] : events)" :key="j"
                      :style="eventStyles(event)"
                      @mouseenter="onMouseEnter($event, event)"
                      @mouseleave="onMouseLeave($event, event)"
                      @contextmenu="onContextMenu($event, event)"
                      @touchstart="onTouchStart($event, event)"
                      @mousedown="onMouseDown($event, event)"
                      @click="onClick($event, event)"
                      @dblclick="onDblClick($event, event)")
          .vuecal__event-delete(v-if="editableEvents"
                                @mousedown.stop.prevent="deleteEvent(event)"
                                @touchstart.stop.prevent="touchDeleteEvent(event)") {{ texts.deleteEvent }}
          slot(:event="event" :view="view" name="event-renderer")
          .vuecal__event-resize-handle(v-if="editableEvents && time && event.startTime && !allDayEvents && !event.multipleDays.start && !event.multipleDays.middle && view !== 'month'"
                                      @mousedown="editableEvents && time && onDragHandleMouseDown($event, event)"
                                      @touchstart="editableEvents && time && onDragHandleMouseDown($event, event)")
      slot(v-if="view === 'month' && !eventsOnMonthView && events.length && !allDayEvents" name="events-count-month-view" :events="events")
    .vuecal__now-line(v-if="timelineVisible" :style="`top: ${todaysTimePosition}px`" :key="transitions ? `${view}-now-line` : 'now-line'")
</template>

<script>
import { formatTime } from './date-utils'

export default {
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
  data: () => ({
    splitEvents: {}
  }),

  filters: {
    formatTime: (value, format) => (value && (formatTime(value, format) || ''))
  },

  methods: {
    updateEventPosition (event) {
      const src = (event.multipleDays.daysCount && event.multipleDays) || event
      const { startTimeMinutes, endTimeMinutes } = src

      let minutesFromTop = startTimeMinutes - this.timeFrom
      const top = Math.round(minutesFromTop * this.timeCellHeight / this.timeStep)

      minutesFromTop = Math.min(endTimeMinutes, this.timeTo) - this.timeFrom
      const bottom = Math.round(minutesFromTop * this.timeCellHeight / this.timeStep)

      event.top = Math.max(top, 0)
      event.height = bottom - event.top
    },

    eventStyles (event) {
      if (!event.startTime || this.view === 'month' || this.allDayEvents) return {}
      const resizeAnEvent = this.domEvents.resizeAnEvent

      return {
        top: `${event.top}px`,
        height: `${resizeAnEvent.newHeight && resizeAnEvent.eventId === event.id ? resizeAnEvent.newHeight : event.height}px`
      }
    },

    eventClasses (event) {
      const overlapping = Object.keys(event.overlapping).length
      const overlapped = Object.keys(event.overlapped).length
      let simultaneous = Object.keys(event.simultaneous).length + 1
      let forceLeft = false
      let deletable = this.domEvents.clickHoldAnEvent.eventId &&
                      (this.domEvents.clickHoldAnEvent.eventId === event.id ||
                      event.linked.find(e => e.id === this.domEvents.clickHoldAnEvent.eventId))

      if (simultaneous >= 3) {
        let split3 = simultaneous - 1
        Object.keys(event.simultaneous).forEach(eventId => {
          if (split3 && Object.keys(this.events.find(e => e.id === eventId).simultaneous).length + 1 < 3) {
            split3--
          }
        })
        if (!split3) simultaneous = 2
      }

      else if (simultaneous === 2) {
        const otherEvent = this.events.find(e => e.id === Object.keys(event.simultaneous)[0])

        if (otherEvent && Object.keys(otherEvent.overlapping).length && Object.keys(otherEvent.overlapped).length) {
          forceLeft = true
        }
      }

      return {
        ...event.classes,
        'vuecal__event--focus': this.domEvents.focusAnEvent.eventId === event.id,
        'vuecal__event--deletable': deletable,
        'vuecal__event--overlapped': overlapped,
        'vuecal__event--overlapping': overlapping,
        'vuecal__event--split2': simultaneous === 2,
        'vuecal__event--split3': simultaneous >= 3,
        'vuecal__event--split-middle': overlapped && overlapping && simultaneous >= 3,
        'vuecal__event--split-left': forceLeft,
        'vuecal__event--all-day': event.allDay,
        'vuecal__event--multiple-days': Object.keys(event.multipleDays).length
      }
    },

    // Will recalculate all the overlappings of the current cell or only of the given split if provided.
    checkCellOverlappingEvents (split = 0) {
      if (this.events) {
        const foregroundEventsList = this.events.filter(item => !item.background && (split ? item.split === split : 1))

        if (foregroundEventsList.length) {
          // Do the mapping outside of the next loop if not splitted cell.
          // If splitted need the whole event object to compare splits.
          const foregroundEventsIdList = foregroundEventsList.map(item => item.id)
          let comparisonArray = {}

          this.events.forEach(event => {
            if (!event.background) {
              let comparisonArrayKeys = Object.keys(comparisonArray)

              // Unique comparison of events.
              comparisonArray[event.id] = this.splits.length
                ? foregroundEventsList.filter(item => (
                  item.id !== event.id && comparisonArrayKeys.indexOf(item.id) === -1) && item.split === event.split
                ).map(item => item.id)
                : foregroundEventsIdList.filter(id => (id !== event.id && comparisonArrayKeys.indexOf(id) === -1))

              if (comparisonArray[event.id].length) this.checkOverlappingEvents(event, comparisonArray[event.id])
            }
          })
        }
      }
    },

    checkOverlappingEvents (event, comparisonArray) {
      const src = (event.multipleDays.daysCount && event.multipleDays) || event
      const { startTimeMinutes: startTimeMinE1, endTimeMinutes: endTimeMinE1 } = src

      comparisonArray.forEach((event2id, i) => {
        let event2 = this.events.find(item => item.id === event2id)
        const src2 = (event2.multipleDays.daysCount && event2.multipleDays) || event2
        const { startTimeMinutes: startTimeMinE2, endTimeMinutes: endTimeMinE2 } = src2

        const event1startsFirst = startTimeMinE1 < startTimeMinE2
        const event1overlapsEvent2 = !event1startsFirst && endTimeMinE2 > startTimeMinE1
        const event2overlapsEvent1 = event1startsFirst && endTimeMinE1 > startTimeMinE2

        if (event1overlapsEvent2) {
          this.$set(event.overlapping, event2.id, true)
          this.$set(event2.overlapped, event.id, true)
        }

        else {
          delete event.overlapping[event2.id]
          delete event2.overlapped[event.id]
        }

        if (event2overlapsEvent1) {
          this.$set(event2.overlapping, event.id, true)
          this.$set(event.overlapped, event2.id, true)
        }

        else {
          delete event2.overlapping[event.id]
          delete event.overlapped[event2.id]
        }

        // If up to 3 events start at the same time.
        if (startTimeMinE1 === startTimeMinE2 || (event1overlapsEvent2 || event2overlapsEvent1)) {
          this.$set(event.simultaneous, event2.id, true)
          this.$set(event2.simultaneous, event.id, true)
        }

        else {
          delete event.simultaneous[event2.id]
          delete event2.simultaneous[event.id]
        }

        if (this.splits.length) {
          this.splitEvents[event.split] = this.events.filter(e => e.split === event.split)
        }
      })
    },

    onResizeEvent () {
      let { eventId, newHeight } = this.$parent.domEvents.resizeAnEvent
      let event = this.events.filter(e => e.id === eventId)[0]

      if (event) {
        event.height = Math.max(newHeight, 10)
        this.updateEndTimeOnResize(event)

        if (!event.background) this.checkCellOverlappingEvents(event.split || 0)
      }
    },

    updateEndTimeOnResize (event) {
      const bottom = event.top + event.height
      const endTime = (bottom / this.timeCellHeight * this.timeStep + this.timeFrom) / 60
      const hours = parseInt(endTime)
      const minutes = parseInt((endTime - hours) * 60)

      event.endTimeMinutes = endTime * 60
      event.endTime = `${hours}:${(minutes < 10 ? '0' : '') + minutes}`
      event.end = event.end.split(' ')[0] + ` ${event.endTime}`

      if (event.multipleDays.daysCount) {
        event.multipleDays.endTimeMinutes = event.endTimeMinutes
        event.multipleDays.endTime = event.endTime
        event.multipleDays.end = event.end

        event.linked.forEach(e => {
          let dayToModify = this.$parent.mutableEvents[e.date]
          let eventToModify = dayToModify.find(e2 => e2.id === e.id)

          eventToModify.endTimeMinutes = event.endTimeMinutes
          eventToModify.endTime = event.endTime
          eventToModify.end = event.end
        })
      }
    },

    // On an event.
    onMouseDown (e, event, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false
      let { clickHoldAnEvent, resizeAnEvent } = this.domEvents

      // If the delete button is already out and event is on focus then delete event.
      if (this.domEvents.focusAnEvent.eventId === event.id && clickHoldAnEvent.eventId === event.id) {
        return true
      }

      // Focus the clicked event.
      this.focusEvent(event)

      clickHoldAnEvent.eventId = null // Reinit click hold on each click.

      // Don't show delete button if dragging event.
      if (!resizeAnEvent.start && this.editableEvents) {
        clickHoldAnEvent.timeoutId = setTimeout(() => {
          clickHoldAnEvent.eventId = event.id
        }, clickHoldAnEvent.timeout)
      }
    },

    onMouseEnter (e, event) {
      e.preventDefault()
      this.$parent.emitWithEvent('event-mouse-enter', event)
    },

    onMouseLeave (e, event) {
      e.preventDefault()
      this.$parent.emitWithEvent('event-mouse-leave', event)
    },

    onContextMenu (e, event) {
      e.preventDefault()
      return false
    },

    onTouchStart (e, event) {
      this.onMouseDown(e, event, true)
    },

    onClick (e, event) {
      if (typeof this.$parent.onEventClick === 'function') return this.$parent.onEventClick(event, e)
    },

    onDblClick (e, event) {
      if (typeof this.$parent.onEventDblclick === 'function') return this.$parent.onEventDblclick(event, e)
    },

    onDragHandleMouseDown (e, event) {
      const start = 'ontouchstart' in window && e.touches ? e.touches[0].clientY : e.clientY
      this.domEvents.resizeAnEvent = Object.assign(this.domEvents.resizeAnEvent, {
        start,
        originalHeight: event.height,
        newHeight: event.height,
        eventId: event.id,
        eventStartDate: event.startDate
      })
    },

    deleteEvent (event, touch = false) {
      // Prevent a double mouse down on touch devices.
      if ('ontouchstart' in window && !touch) return false

      this.$parent.emitWithEvent('event-delete', event)

      this.events = this.events.filter(e => e.id !== event.id)

      // If deleting a multiple-day event, delete all the events pieces (days).
      if (event.multipleDays.daysCount) {
        event.linked.forEach(e => {
          let dayToModify = this.$parent.mutableEvents[e.date]
          let eventToDelete = dayToModify.find(e2 => e2.id === e.id)
          this.$parent.mutableEvents[e.date] = dayToModify.filter(e2 => e2.id !== e.id)

          if (!e.background) {
            // Remove this event from possible other overlapping events of the same cell.
            Object.keys(eventToDelete.overlapped).forEach(id => (delete dayToModify.find(item => item.id === id).overlapping[eventToDelete.id]))
            Object.keys(eventToDelete.overlapping).forEach(id => (delete dayToModify.find(item => item.id === id).overlapped[eventToDelete.id]))
            Object.keys(eventToDelete.simultaneous).forEach(id => (delete dayToModify.find(item => item.id === id).simultaneous[eventToDelete.id]))
          }
        })
      }

      if (!event.background) {
        // Remove this event from possible other overlapping events of the same cell.
        Object.keys(event.overlapped).forEach(id => (delete this.events.find(item => item.id === id).overlapping[event.id]))
        Object.keys(event.overlapping).forEach(id => (delete this.events.find(item => item.id === id).overlapped[event.id]))
        Object.keys(event.simultaneous).forEach(id => (delete this.events.find(item => item.id === id).simultaneous[event.id]))

        this.checkCellOverlappingEvents(event.split || 0)
      }

      if (this.splits.length) this.splitEvents[event.split] = this.events.filter(e => e.id !== event.id && e.split === event.split)
    },

    touchDeleteEvent (event) {
      this.deleteEvent(event, true)
    },

    focusEvent (event) {
      this.$parent.emitWithEvent('event-focus', event)
      this.domEvents.focusAnEvent.eventId = event.id
    }
  },

  computed: {
    texts () {
      return this.$parent.texts
    },
    view () {
      return this.$parent.view.id
    },
    time () {
      return this.$parent.time
    },
    timeFormat () {
      return this.$parent.timeFormat || (this.$parent['12Hour'] ? 'h:mm{am}' : 'HH:mm')
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
    showAllDayEvents () {
      return this.$parent.showAllDayEvents
    },
    eventsOnMonthView () {
      return this.$parent.eventsOnMonthView
    },
    editableEvents () {
      return this.$parent.editableEvents
    },
    noEventOverlaps () {
      this.$nextTick(() => this.checkCellOverlappingEvents())
      return this.$parent.noEventOverlaps
    },
    transitions () {
      return this.$parent.transitions
    },
    transitionDirection () {
      return this.$parent.transitionDirection
    },
    domEvents: {
      get () {
        if (this.$parent.domEvents.resizeAnEvent.eventId) this.onResizeEvent()
        return this.$parent.domEvents
      },
      set (object) {
        this.$parent.domEvents = object
      }
    },
    cellStyles () {
      return { minWidth: this.view === 'week' && this.$parent.minCellWidth ? `${this.$parent.minCellWidth}px` : null, position: 'relative' }
    },
    events: {
      get () {
        const events = this.$parent.mutableEvents[this.formattedDate] || []
        // eslint-disable-next-line
        this.splitEvents = []

        events.forEach(event => {
          if (event.startTime && !(this.showAllDayEvents && this.allDayEvents)) this.updateEventPosition(event)

          // Only for splits.
          if (this.splits.length && event.split) {
            // eslint-disable-next-line
            if (!this.splitEvents[event.split]) this.$set(this.splitEvents, event.split, [])
            // eslint-disable-next-line
            this.splitEvents[event.split].push(event)
          }
        })

        // NextTick prevents a cyclic redundancy.
        this.$nextTick(this.checkCellOverlappingEvents)

        return this.showAllDayEvents ? events.filter(e => !!e.allDay === this.allDayEvents) : events
      },
      set (events) {
        this.$parent.mutableEvents[this.formattedDate] = events
      }
    },
    cellSplitEvents () {
      let splitsEventIndexes = {}

      this.events.forEach((e, i) => {
        if (!splitsEventIndexes[e.split || 0]) splitsEventIndexes[e.split || 0] = {}
        splitsEventIndexes[e.split || 0][e.id] = i
      })

      return splitsEventIndexes
    },
    timelineVisible () {
      if (!this.today || !this.time || this.allDayEvents || ['week', 'day'].indexOf(this.view) === -1) return

      const now = new Date()
      let startTimeMinutes = now.getHours() * 60 + now.getMinutes()
      return startTimeMinutes <= this.timeTo
    },
    todaysTimePosition () {
      // Make sure to skip the Maths if not relevant.
      if (!this.today || !this.time) return

      const now = new Date()
      let startTimeMinutes = now.getHours() * 60 + now.getMinutes()
      let minutesFromTop = startTimeMinutes - this.timeFrom
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

  &.splitted {
    flex-direction: row;
    display: flex;
  }

  .vuecal__cell-split {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    height: 100%;
    position: relative;
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
    margin-top: 13px;
    line-height: 12px;
    font-size: 10px;
  }

  &-content {
    width: 100%;
    height: 100%;
    align-items: center;

    .vuecal--years-view &,
    .vuecal--year-view &,
    .vuecal--month-view & {justify-content: center;}
  }

  &-events {width: 100%;}
}

.vuecal--split-days.vuecal--week-view .vuecal__cell.splitted {
  overflow: hidden;
}

.vuecal__no-event {
  padding-top: 1em;
  color: #aaa;
  justify-self: flex-start;
  margin-bottom: auto; // Vertical align top within flex column and align center.
}

.vuecal__all-day .vuecal__no-event {display: none;}

// EVENTS.
//======================================//
.vuecal__event {
  color: #666;
  background-color: #f8f8f8;
  position: relative;
  z-index: 1;
  transition: box-shadow 0.3s, left 0.3s, right 0.3s;
  overflow: hidden;// For sliding delete button.

  &:hover {z-index: 2;}

  // Reactivate user selection in events.
  .vuecal__cell & * {user-select: auto;}

  .vuecal--view-with-time &:not(&--all-day) {
    position: absolute;
    left: 0;
    right: 0;
  }

  &--overlapped {right: 20%;}
  &--overlapping:not(.vuecal__event--split2):not(.vuecal__event--split3) {left: 30%;box-shadow: 0 0 5px rgba(#000, 0.2);}
  &--overlapped.vuecal__event--split2 {right: 25%;}
  &--overlapping.vuecal__event--split2 {left: 25%;}
  &--overlapping.vuecal__event--split2.vuecal__event--split-left {left: 0;right: 25%;}
  &--overlapped.vuecal__event--overlapping.vuecal__event--split2 {left: 25%;right: 0;}
  &--overlapped.vuecal__event--split3 {right: 40%;}
  &--overlapping.vuecal__event--split3 {left: 40%;}
  &--overlapping.vuecal__event--split3.vuecal__event--split-middle {left: 20%;right: 20%;}

  .vuecal--no-event-overlaps &--overlapping:not(.vuecal__event--split2):not(.vuecal__event--split3) {left: 30%;box-shadow: 0 0 5px rgba(#000, 0.2);}
  .vuecal--no-event-overlaps &--overlapped.vuecal__event--split2 {right: 50%;}
  .vuecal--no-event-overlaps &--overlapping.vuecal__event--split2 {left: 50%;}
  .vuecal--no-event-overlaps &--overlapping.vuecal__event--split2.vuecal__event--split-left {left: 0;right: 50%;}
  .vuecal--no-event-overlaps &--overlapped.vuecal__event--overlapping.vuecal__event--split2 {left: 50%;right: 0;}
  .vuecal--no-event-overlaps &--overlapped.vuecal__event--split3 {right: 66.66%;}
  .vuecal--no-event-overlaps &--overlapping.vuecal__event--split3 {left: 66.66%;}
  .vuecal--no-event-overlaps &--overlapping.vuecal__event--split3.vuecal__event--split-middle {left: 33.33%;right: 33.33%;}

  &--background {z-index: 0;}
  &--focus {box-shadow: 1px 1px 6px rgba(0,0,0,0.2);z-index: 3;}
}

.vuecal__event-resize-handle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1em;
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  transform: translateY(110%);
  transition: 0.3s;
  cursor: ns-resize;

  .vuecal__event:hover &,
  .vuecal__event--focus & {opacity: 1;transform: translateY(0);}
}

.vuecal__event-delete {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 1.4em;
  line-height: 1.4em;
  background-color: rgba(221, 51, 51, 0.85);
  color: #fff;
  z-index: 0;
  cursor: pointer;
  transform: translateY(-110%);
  transition: 0.3s;

  .vuecal--full-height-delete & {
    height: auto;
    bottom: 0;

    &:before {
      content: '';
      width: 1.7em;
      height: 1.8em;
      display: block;
      background-image: url('data:image/svg+xml;utf8,<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="m256 33c-124 0-224 100-224 224 0 124 100 224 224 224 124 0 224-100 224-224 0-124-100-224-224-224z m108 300c2 1 3 3 3 5 0 2-1 4-3 6l-21 21c-2 2-4 3-6 3-2 0-4-1-5-3l-76-75-75 76c-2 1-4 2-6 2-2 0-4-1-6-2l-21-22c-2-2-2-4-2-6 0-2 0-4 2-5l76-76-76-75c-3-3-3-9 0-12l21-21c2-2 4-3 6-3 2 0 4 1 5 3l76 74 76-74c1-2 3-3 5-3 3 0 5 1 6 3l22 21c3 3 3 9 0 12l-76 75z" transform="scale(0.046875 0.046875)" fill="%23fff" opacity="0.9"/></svg>');
    }
  }
  .vuecal__event--deletable & {transform: translateY(0);z-index: 1;}
}

.vuecal--month-view .vuecal__event-title {
  font-size: 0.85em;
}

.vuecal--short-events .vuecal__event-title {
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 3px;
}

.vuecal__event-title,
.vuecal__event-content {
  hyphens: auto;
}

.vuecal__event-title--edit {
  border-bottom: 1px solid transparent;
  text-align: center;
  transition: 0.3s;
  color: inherit;
  background-image: url('data:image/svg+xml;utf8,<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="m163 440l-91-91 251-250 90 90z m309-352l-48-48c-12-11-32-11-45 2l-45 45 91 91 45-45c13-13 13-33 2-45z m-408 275l-32 117 117-32z" fill="%23000" opacity="0.4"/></svg>');
  background-repeat: no-repeat;
  background-position: 120% 0.15em;
  background-size: 0.4em;
  outline: none;
  width: 100%;

  &:hover, &:focus {
    border-color: rgba(0, 0, 0, 0.4);
    background-position: 99% 0.15em;
    background-size: 1.2em;
  }
}

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
