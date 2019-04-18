<template lang="pug">
.vuecal__header
  ul.vuecal__flex.vuecal__menu(v-if="!options.hideViewSelector")
    li(
      v-if="v.enabled"
      :class="{ active: viewProps.view.id === id }"
      v-for="(v, id) in viewProps.views"
      @click="$parent.switchView(id, null, true)") {{ v.label }}
  .vuecal__title(v-if="!options.hideTitleBar")
    .vuecal__arrow.vuecal__arrow--prev(@click="previous")
      slot(name="arrow-prev")
    transition(:name="`slide-fade--${transitionDirection}`")
      div(
        :class="{ clickable: !!broaderView }"
        :key="options.transitions ? `${viewProps.view.id}${viewProps.view.startDate}` : false"
        @click="switchToBroaderView"
        style="display: inline-block")
        slot(name="title")
    .vuecal__arrow.vuecal__arrow--next(@click="next")
      slot(name="arrow-next")
  weekdays-headings(
    v-if="['month', 'week'].indexOf(viewProps.view.id) > -1 && !(viewProps.hasSplits && viewProps.view.id === 'week')"
    :vuecal="$parent"
    :view="viewProps.view"
    :week-days="weekDays"
    :week-days-short="weekDaysShort"
    :transition-direction="transitionDirection"
    :switch-to-narrower-view="switchToNarrowerView"
  )
</template>

<script>
import { getPreviousFirstDayOfWeek } from './date-utils'
import WeekdaysHeadings from './weekdays-headings'

export default {
  components: { WeekdaysHeadings },
  props: {
    // Vuecal main component options (props).
    options: {
      type: Object,
      default: () => ({})
    },
    viewProps: {
      type: Object,
      default: () => ({})
    },
    weekDays: {
      type: Array,
      default: () => []
    },
    weekDaysShort: {
      type: [Array, null],
      default: () => []
    },
    switchToNarrowerView: {
      type: Function,
      default: () => {}
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
          const firstDayOfPrevWeek = getPreviousFirstDayOfWeek(this.viewProps.view.startDate, this.options.startWeekOnSunday).subtractDays(7)
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
          const firstDayOfNextWeek = getPreviousFirstDayOfWeek(this.viewProps.view.startDate, this.options.startWeekOnSunday).addDays(7)
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
}

// Media queries.
//==================================//
@media screen and(max-width: 450px) {
  .vuecal__menu li {padding-left: 0.3em;padding-right: 0.3em;}
}

@media screen and(max-width: 350px) {
  .vuecal__menu li {font-size: 1.1em;}
}
</style>
