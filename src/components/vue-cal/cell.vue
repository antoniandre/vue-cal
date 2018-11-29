<template lang="pug">
  .vuecal__cell(:class="[cssClass, splits.length ? 'splitted' : '']" :style="cellStyles")
    .vuecal__cell-content(:class="splits.length && `vuecal__cell-split ${splits[i - 1].class}`" v-for="i in (splits.length || 1)")
      .split-label(v-if="splits.length" v-html="splits[i - 1].label")
      div(v-if="content" v-html="content")
      div(v-else)
        .vuecal__no-event(v-if="!Object.keys(cellEvents).length") {{ texts.noEvent }}
        .vuecal__event(:class="eventClasses(event)"
                       v-else
                       v-for="(event, j) in (splits.length ? splitEvents[i] : cellEvents)" :key="j"
                       :style="eventStyles(event)")
          .vuecal__event-title(v-if="event.title") {{ event.title }}
          .vuecal__event-time(v-if="event.startTime")
            | {{ event.startTime }}
            span(v-if="event.endTime") &nbsp;- {{ event.endTime }}
          .vuecal__event-content(v-if="event.content" v-html="event.content")
          .vuecal__event-resize-handle(v-if="event.startTime && $parent.resizableEvents"
                                       @mousedown="$parent.resizableEvents && $parent.time && onMouseDown($event, event)"
                                       @touchstart="$parent.resizableEvents && $parent.time && onMouseDown($event, event)")
</template>

<script>
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
    events: {
      type: Object,
      default: () => {}
    },
    content: {
      type: [String, Number],
      default: ''
    },
    splits: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    splitEvents: [],
    comparisonArray: {}
  }),

  methods: {
    updateEventPosition (event) {
      let minutesFromTop = event.startTimeMinutes - this.$parent.timeFrom
      const top = Math.round(minutesFromTop * this.timeCellHeight / this.timeStep)

      minutesFromTop = event.endTimeMinutes - this.$parent.timeFrom
      const bottom = Math.round(minutesFromTop * this.timeCellHeight / this.timeStep)

      event.top = top
      event.height = bottom - top
    },

    eventStyles (event) {
      if (!event.startTime) return {}

      return {
        top: `${event.top}px`,
        height: `${this.resizeEvent.newHeight && this.resizeEvent.eventId === event.id ? this.resizeEvent.newHeight : event.height}px`
      }
    },

    eventClasses (event) {
      if (this.comparisonArray[event.id].length) this.checkOverlappingEvents(event)

      return {
        ...event.classes,
        overlapping: event.overlapping > 0,
        overlapped: event.overlapped > 0
      }
    },

    checkOverlappingEvents (event) {
      this.comparisonArray[event.id].forEach((event2, i) => {
        const event1startsFirst = event.startTimeMinutes < event2.startTimeMinutes
        const event1overlapsEvent2 = (event1startsFirst && event.endTimeMinutes > event2.startTimeMinutes) * 1
        const event2overlapsEvent1 = (!event1startsFirst && event2.endTimeMinutes > event.startTimeMinutes) * 1
        console.log('comparing event ' + event.title + ' with ', event2.title)

        if (event1overlapsEvent2 || event2overlapsEvent1) {
          event.classes.overlapped += (event1startsFirst ? 1 : 0)
          event.classes.overlapping += (!event1startsFirst ? 1 : 0)

          event2.classes.overlapped += (!event1startsFirst ? 1 : 0)
          event2.classes.overlapping += (event1startsFirst ? 1 : 0)

          // If up to 3 events start at the same time.
          // if (event.classes.startTimeMinutes === event2.classes.startTimeMinutes) {
          //   event.classes.split3 = event.classes.split2
          //   event.classes.split2 = true
          //   event2.classes.split3 = event2.classes.split2
          //   event2.classes.split2 = true
          //   event2.classes.splitm = event.classes.split2 && !event2.classes.middle
          // }
        } else {
          event.classes.overlapped--
          event.classes.overlapping--
          event2.classes.overlapped--
          event2.classes.overlapping--
        }
        console.log({event1startsFirst, event1overlapsEvent2, event2overlapsEvent1, overlapping: event.classes.overlapping, overlapped: event.classes.overlapped})
      })
    },

    onResizeEvent (eventId, newHeight) {
      let event = this.events[eventId]
      if (event) {
        event.height = Math.max(newHeight, 10)
        this.updateEndTimeOnResize(event)

        // if (!event.background) {
        //   this.checkOverlappingEvents(event)
        // }
      }
    },

    updateEndTimeOnResize (event) {
      const bottom = event.top + event.height
      const endTime = bottom / this.timeCellHeight + this.timeFrom / 60
      const hours = parseInt(endTime)
      const minutes = parseInt((endTime - hours) * 60)
      event.endTimeMinutes = endTime * 60
      event.endTime = `${hours}:${(minutes < 10 ? '0' : '') + minutes}`
    },

    onMouseDown (e, event) {
      const start = 'ontouchstart' in window ? e.touches[0].clientY : e.clientY
      this.$parent.resizeEvent = Object.assign(this.$parent.resizeEvent, { start, originalHeight: event.height, newHeight: event.height, eventId: event.id })
    }
  },

  computed: {
    texts () {
      return this.$parent.texts
    },
    timeCellHeight () {
      return parseInt(this.$parent.timeCellHeight)
    },
    timeFrom () {
      return parseInt(this.$parent.timeFrom)
    },
    timeStep () {
      return parseInt(this.$parent.timeStep)
    },
    cellStyles () {
      return { minWidth: `${this.$parent.minCellWidth}px` || null }
    },
    resizeEvent () {
      if (this.$parent.resizeEvent.eventId) {
        this.onResizeEvent(this.$parent.resizeEvent.eventId, this.$parent.resizeEvent.newHeight)
      }
      return this.$parent.resizeEvent
    },
    cellEvents () {
      let cellEvents = {}
      // eslint-disable-next-line
      this.splitEvents = []

      Object.values(this.events).forEach((event, i) => {
        this.$set(event, Object.assign(event, {
          height: 0,
          top: 0,
          classes: {
            [event.class]: true,
            overlapping: 0,
            overlapped: 0,
            split1: false,
            split2: false,
            split3: false,
            splitm: false,
            background: event.background
          }
        }))

        // Only for splits.
        // if (this.splits.length && event.split) {
        //   // eslint-disable-next-line
        //   if (!this.splitEvents[event.split]) this.splitEvents[event.split] = []
        //   // eslint-disable-next-line
        //   this.splitEvents[event.split].push(event)
        // }

        if (event.startTime) {
          this.updateEventPosition(event)

          if (!event.background) {
            // Unique comparison of events.
            this.comparisonArray[event.id] = Object.values(this.events).filter(item => (item.id !== event.id && Object.keys(this.comparisonArray).indexOf(item.id) === -1))
          }
        }

        cellEvents[event.id] = event
      })

      return cellEvents
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
  .vuecal--day-view & {flex: 1;}

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

    .vuecal--day-view & {left: 1px;right: 0;bottom: 0;}
    .vuecal--view-with-time.vuecal--day-view & {left: 0;}
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

  &.out-of-scope {
    color: #ccc;
  }
}

.vuecal--split-days.vuecal--week-view .vuecal__cell.splitted {
  overflow: hidden;
}

.vuecal__no-event {
  padding-top: 1em;
  color: #aaa;
  user-select: none;
}

.vuecal__event {
  color: #666;
  background-color: #f8f8f8;
  position: relative;
  z-index: 1;

  // Reactivate user selection in events.
  .vuecal__cell & * {user-select: auto;}

  .vuecal--view-with-time & {
    position: absolute;
    left: 0;
    right: 0;
    overflow: hidden;

    // &:hover {height: auto !important;}
  }

  &.overlapped {right: 20%;}
  &.overlapping:not(.split2):not(.split3) {left: 30%;box-shadow: 0 0 5px rgba(#000, 0.2);}
  &.overlapped.split2 {right: 50%;}
  &.overlapping.split2 {left: 50%;}
  &.overlapped.split3 {right: 66.66%;}
  &.overlapping.split3 {left: 66.66%;}
  &.overlapping.split3.split-middle {left: 33.33%;right: 33.33%;}
  &.background {z-index: 0;}
}

.vuecal__event-resize-handle {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1em;
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 0;
  transition: 0.3s;
  cursor: ns-resize;

  .vuecal__event:hover & {opacity: 1;}
}
</style>
