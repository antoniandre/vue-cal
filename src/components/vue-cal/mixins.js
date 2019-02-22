import Vue from 'vue'

Vue.mixin({
  data: () => ({
    transitionDirection: 'right'
  }),

  methods: {
  },

  watch: {
    transitionDirection (trs) {
      console.log('transition direction changed', trs, this.transitionDirection)
    }
  }
})