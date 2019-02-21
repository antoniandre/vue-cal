<template lang="pug">
.vuecal__header
  ul.vuecal__flex.vuecal__menu(v-if="!hideViewSelector")
    li(:class="{ active: view.id === id }" v-for="(v, id) in views" v-if="v.enabled" @click="$parent.switchView(id, null, true)") {{ v.label }}
  .vuecal__title(v-if="!hideTitleBar")
    .vuecal__arrow.vuecal__arrow--prev(@click="previous")
      slot(name="arrowPrev")
    transition(:class="{ clickable: !!broaderView }" :name="`slide-fade--${transitionDirection}`")
      span.d-inline-block(:key="transitions ? `${view.startDate}` : false" @click="switchToBroaderView")
        slot(name="title")
    .vuecal__arrow.vuecal__arrow--next(@click="next")
      slot(name="arrowNext")
  .vuecal__flex.vuecal__weekdays-headings(v-if="viewHeadings.length && !(hasSplits && view.id === 'week')")
    .vuecal__flex.vuecal__heading(:class="heading.class" v-for="(heading, i) in viewHeadings" :key="i")
      transition(:name="`slide-fade--${transitionDirection}`" :appear="transitions")
        span(:key="transitions ? `${i}-${heading.label4}` : false")
          span(v-for="j in 3" :key="j") {{ heading['label' + j]}}
          span(v-if="heading.label4") &nbsp;
          span(v-if="heading.label4") {{ heading.label4 }}
</template>

<script>
import { getPreviousFirstDayOfWeek } from './date-utils'
import Cell from './cell'

export default {
  components: { 'vuecal-cell': Cell },
  props: {
    hideViewSelector: {
      type: Boolean,
      default: false
    },
    hideTitleBar: {
      type: Boolean,
      default: false
    },
    showAllDayEvents: {
      type: Boolean,
      default: false
    },
    time: {
      type: Boolean,
      default: false
    },
    splitDays: {
      type: Array,
      default: () => []
    },
    hasSplits: {
      type: Boolean,
      default: false
    },
    editableEvents: {
      type: Boolean,
      default: false
    },
    transitions: {
      type: Boolean,
      default: true
    },
    texts: {
      type: Object,
      default: () => {}
    },
    months: {
      type: Array,
      default: () => []
    },
    weekDays: {
      type: Array,
      default: () => []
    },
    views: {
      type: Object,
      default: () => {}
    },
    view: {
      type: Object,
      default: () => {}
    },
    viewHeadings: {
      type: Array,
      default: () => []
    },
    viewCells: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    previous () {
      this.transitionDirection = 'left'

      switch (this.view.id) {
        case 'years':
          this.$parent.switchView(this.view.id, new Date(this.view.startDate.getFullYear() - 25, 0, 1))
          break
        case 'year':
          const firstDayOfYear = new Date(this.view.startDate.getFullYear() - 1, 1, 1)
          this.$parent.switchView(this.view.id, firstDayOfYear)
          break
        case 'month':
          const firstDayOfMonth = new Date(this.view.startDate.getFullYear(), this.view.startDate.getMonth() - 1, 1)
          this.$parent.switchView(this.view.id, firstDayOfMonth)
          break
        case 'week':
          const firstDayOfPrevWeek = getPreviousFirstDayOfWeek(this.view.startDate, this.startWeekOnSunday).subtractDays(7)
          this.$parent.switchView(this.view.id, firstDayOfPrevWeek)
          break
        case 'day':
          const day = this.view.startDate.subtractDays(1)
          this.$parent.switchView(this.view.id, day)
          break
      }
    },

    next () {
      this.transitionDirection = 'right'

      switch (this.view.id) {
        case 'years':
          this.$parent.switchView(this.view.id, new Date(this.view.startDate.getFullYear() + 25, 0, 1))
          break
        case 'year':
          const firstDayOfYear = new Date(this.view.startDate.getFullYear() + 1, 0, 1)
          this.$parent.switchView(this.view.id, firstDayOfYear)
          break
        case 'month':
          const firstDayOfMonth = new Date(this.view.startDate.getFullYear(), this.view.startDate.getMonth() + 1, 1)
          this.$parent.switchView(this.view.id, firstDayOfMonth)
          break
        case 'week':
          const firstDayOfNextWeek = getPreviousFirstDayOfWeek(this.view.startDate, this.startWeekOnSunday).addDays(7)
          this.$parent.switchView(this.view.id, firstDayOfNextWeek)
          break
        case 'day':
          const day = this.view.startDate.addDays(1)
          this.$parent.switchView(this.view.id, day)
          break
      }
    },

    switchToBroaderView () {
      this.transitionDirection = 'left'

      if (this.broaderView) this.$parent.switchView(this.broaderView)
    }
  },

  computed: {
    transitionDirection: {
      get () {
        return this.$parent.transitionDirection
      },
      set (direction) {
        this.$parent.transitionDirection = direction
      }
    },
    broaderView () {
      let views = Object.keys(this.views)
      views = views.slice(0, views.indexOf(this.view.id))
      views.reverse()

      return views.find(v => this.views[v].enabled)
    }
  }
}
</script>
