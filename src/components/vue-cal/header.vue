<template lang="pug">
.vuecal__header
  ul.vuecal__flex.vuecal__menu(v-if="!vuecalProps.hideViewSelector")
    li(:class="{ active: viewProps.view.id === id }" v-for="(v, id) in viewProps.views" v-if="v.enabled" @click="$parent.switchView(id, null, true)") {{ v.label }}
  .vuecal__title(v-if="!vuecalProps.hideTitleBar")
    .vuecal__arrow.vuecal__arrow--prev(@click="previous")
      slot(name="arrowPrev")
    transition(:name="`slide-fade--${transitionDirection}`")
      div(:class="{ clickable: !!broaderView }" :key="vuecalProps.transitions ? `${viewProps.view.startDate}` : false" @click="switchToBroaderView" style="display: inline-block")
        slot(name="title")
    .vuecal__arrow.vuecal__arrow--next(@click="next")
      slot(name="arrowNext")
  .vuecal__flex.vuecal__weekdays-headings(v-if="viewProps.viewHeadings.length && !(viewProps.hasSplits && viewProps.view.id === 'week')")
    .vuecal__flex.vuecal__heading(:class="heading.class" v-for="(heading, i) in viewProps.viewHeadings" :key="i")
      transition(:name="`slide-fade--${transitionDirection}`" :appear="vuecalProps.transitions")
        span(:key="vuecalProps.transitions ? `${i}-${heading.label4}` : false")
          span(v-for="j in 3" :key="j") {{ heading['label' + j]}}
          span(v-if="heading.label4") &nbsp;
          span(v-if="heading.label4") {{ heading.label4 }}
</template>

<script>
import { getPreviousFirstDayOfWeek } from './date-utils'

export default {
  props: {
    vuecalProps: {
      type: Object,
      default: () => {}
    },
    viewProps: {
      type: Object,
      default: () => {}
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
    }
  },

  methods: {
    previous () {
      this.transitionDirection = 'left'

      switch (this.viewProps.view.id) {
        case 'years':
          this.$parent.switchView(this.viewProps.view.id, new Date(this.viewProps.view.startDate.getFullYear() - 25, 0, 1))
          break
        case 'year':
          const firstDayOfYear = new Date(this.viewProps.view.startDate.getFullYear() - 1, 1, 1)
          this.$parent.switchView(this.viewProps.view.id, firstDayOfYear)
          break
        case 'month':
          const firstDayOfMonth = new Date(this.viewProps.view.startDate.getFullYear(), this.viewProps.view.startDate.getMonth() - 1, 1)
          this.$parent.switchView(this.viewProps.view.id, firstDayOfMonth)
          break
        case 'week':
          const firstDayOfPrevWeek = getPreviousFirstDayOfWeek(this.viewProps.view.startDate, this.vuecalProps.startWeekOnSunday).subtractDays(7)
          this.$parent.switchView(this.viewProps.view.id, firstDayOfPrevWeek)
          break
        case 'day':
          const day = this.viewProps.view.startDate.subtractDays(1)
          this.$parent.switchView(this.viewProps.view.id, day)
          break
      }
    },

    next () {
      this.transitionDirection = 'right'

      switch (this.viewProps.view.id) {
        case 'years':
          this.$parent.switchView(this.viewProps.view.id, new Date(this.viewProps.view.startDate.getFullYear() + 25, 0, 1))
          break
        case 'year':
          const firstDayOfYear = new Date(this.viewProps.view.startDate.getFullYear() + 1, 0, 1)
          this.$parent.switchView(this.viewProps.view.id, firstDayOfYear)
          break
        case 'month':
          const firstDayOfMonth = new Date(this.viewProps.view.startDate.getFullYear(), this.viewProps.view.startDate.getMonth() + 1, 1)
          this.$parent.switchView(this.viewProps.view.id, firstDayOfMonth)
          break
        case 'week':
          const firstDayOfNextWeek = getPreviousFirstDayOfWeek(this.viewProps.view.startDate, this.startWeekOnSunday).addDays(7)
          this.$parent.switchView(this.viewProps.view.id, firstDayOfNextWeek)
          break
        case 'day':
          const day = this.viewProps.view.startDate.addDays(1)
          this.$parent.switchView(this.viewProps.view.id, day)
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
      let views = Object.keys(this.viewProps.views)
      views = views.slice(0, views.indexOf(this.viewProps.view.id))
      views.reverse()

      return views.find(v => this.viewProps.views[v].enabled)
    }
  }
}
</script>

<style lang="scss">
$time-column-width: 3em;
$time-column-width-12: 4em; // 12-hour clock shows am/pm.
$weekdays-headings-height: 2.8em;

.vuecal {
  &__menu {
    padding: 0;
    list-style-type: none;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.02);

    li {
      padding: 0.3em 1em;
      height: 2.2em;
      font-size: 1.3em;
      border-bottom: 0 solid currentColor;
      cursor: pointer;
      box-sizing: border-box;
      transition: 0.2s;
    }

    li.active {
      border-bottom-width: 2px;
      background: rgba(255, 255, 255, 0.15);
    }
  }

  &__title {
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    font-size: 1.4em;
    line-height: 1.3;
    min-height: 2em;
    position: relative;

    .vuecal--xsmall & {font-size: 1.3em;}
  }

  &__arrow {
    cursor: pointer;
    position: relative;
    z-index: 1;

    &--prev {padding-left: 0.6em;}
    &--next {padding-right: 0.6em;}

    i.angle {
      display: inline-block;
      border: solid currentColor;
      border-width: 0 2px 2px 0;
      padding: 0.25em;
      transform: rotate(-45deg);
    }

    &--prev i.angle {border-width: 2px 0 0 2px;}
  }

  &__weekdays-headings {
    border-bottom: 1px solid #ddd;
    margin-bottom: -1px;

    .vuecal--view-with-time & {
      padding-left: $time-column-width;
    }

    .vuecal--view-with-time.vuecal--time-12-hour & {
      font-size: 0.9em;
      padding-left: $time-column-width-12;
    }

    .vuecal--split-days.vuecal--view-with-time & {
      padding-left: 0;
    }
  }

  &__heading {
    width: 100%;
    height: $weekdays-headings-height;
    font-weight: 400;
    justify-content: center;
    text-align: center;
    align-items: center;
    position: relative;

    .vuecal--small & span:nth-child(3) {display: none;}

    .vuecal--xsmall & {flex-direction: column;padding-left: 0;padding-right: 0;}
    .vuecal--xsmall & span:nth-child(2),
    .vuecal--xsmall & span:nth-child(3),
    .vuecal--xsmall & span:nth-child(4) {display: none;}
  }
}
</style>
