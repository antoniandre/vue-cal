<template lang="pug">
w-app(:class="{ ready }" v-scroll="onScroll")
  top-bar(:offset-top="offsetTop")
  router-view

  w-transition-twist
    w-button.go-top(
      v-show="!goTopHidden"
      icon="material-icons keyboard_arrow_up"
      fixed
      bottom
      right
      round
      href="'#top'")

  footer.page-container.w-flex.grey-dark1.wrap.justify-center.mt12.mb8
    .w-divider.fill-width.mb8
    .xs12.sm6.text-center.smu-text-left.copyright.
      Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
    .xs12.sm6.text-center.smu-text-right.made-with
      .mb1 This documentation is made with #[w-icon fab fa-vuejs], #[w-icon fab fa-html5], #[w-icon fab fa-css3], #[w-icon fab fa-sass] &amp; #[w-icon.heart material-icons favorite]
      | View project on #[a(href="https://github.com/antoniandre/vue-cal" target="_blank") #[w-icon fab fa-github] Github].
</template>

<script>
// Including the top bar from the documentation view and passing the
// offsetTop var slows down too much the top bar animation on scroll.
import TopBar from '@/documentation/components/top-bar.vue'
import '@/scss/index.scss'

export default {
  name: 'app',
  components: { TopBar },
  data: () => ({
    ready: false,
    offsetTop: 0,
    goTopHidden: true
  }),
  created () {
    setTimeout(() => (this.ready = true), 500)
  },
  methods: {
    onScroll () {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.goTopHidden = this.offsetTop < 200
    }
  },
  directives: {
    scroll: {
      inserted: (el, binding) => {
        const f = evt => {
          if (binding.value(evt, el)) window.removeEventListener('scroll', f)
        }
        window.addEventListener('scroll', f)
      }
    }
  }
}
</script>
