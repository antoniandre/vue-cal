<template lang="pug">
w-app(:class="{ ready }" v-scroll="onScroll")
  top-bar(:offset-top="offsetTop")
  router-view

  w-transition-twist
    w-button.go-top.ma2(
      v-show="!goTopHidden"
      icon="material-icons keyboard_arrow_up"
      fixed
      bottom
      right
      round
      xl
      route="#top")

  footer.page-container.w-flex.grey-dark1.wrap.justify-center.mt12.mb8
    .w-divider.fill-width.mb8
    .xs12.sm6.text-center.smu-text-left.copyright.
      Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
    .xs12.sm6.text-center.smu-text-right.made-with
      .mb1
        | This documentation is made with
        w-tooltip
          template(#activator="{ on }")
            w-icon(v-on="on") fab fa-vuejs
          | Vue
        w-tooltip
          template(#activator="{ on }")
            w-icon(v-on="on") fab fa-html5
          | HTML5 &amp; Pug
        w-tooltip
          template(#activator="{ on }")
            w-icon.ml1(v-on="on") fab fa-css3
          | CSS3
        w-tooltip
          template(#activator="{ on }")
            w-icon.ml1(v-on="on") fab fa-sass
          | SCSS
        span.ml2.mr1 &amp;
        w-tooltip
          template(#activator="{ on }")
            w-icon(v-on="on").heart material-icons favorite
          | Love
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
      this.goTopHidden = this.offsetTop < 200 ||
                         ((document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight) <= 100)
    }
  },
  directives: {
    scroll: {
      mounted: (el, binding) => {
        const f = evt => {
          if (binding.value(evt, el)) window.removeEventListener('scroll', f)
        }
        window.addEventListener('scroll', f)
      }
    }
  }
}
</script>
