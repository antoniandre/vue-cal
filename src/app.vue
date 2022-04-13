<template lang="pug">
w-app(:class="{ ready }" v-scroll="onScroll")
  top-bar(:offset-top="offsetTop")
  router-view

  w-transition-twist
    w-button.go-top(
      v-show="!goTopHidden"
      bg-color="primary"
      icon="material-icons keyboard_arrow_up"
      fixed
      bottom
      right
      round
      href="'#top'")

  footer.px2
    w-flex.mx-auto.container.grey-dark1(row wrap align-center justify-center)
      .xs12.sm6.text-center.smu-text-left.copyright.
        Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
      .xs12.sm6.text-center.smu-text-right.made-with
        .mb1 This documentation is made with #[w-icon fab fa-vuejs], #[w-icon fab fa-html5], #[w-icon fab fa-css3], #[w-icon fab fa-sass] &amp; #[w-icon.heart favorite]
        | View project on #[a(href="https://github.com/antoniandre/vue-cal" target="_blank") #[w-icon fab fa-github] Github].
router-view
</template>

<script>
// Including the top bar from the documentation view and passing the
// offsetTop var slows down too much the top bar animation on scroll.
import TopBar from '@/documentation/components/top-bar.vue'

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

<style lang="scss">
$primary: #42b983;

* {margin: 0;padding: 0;}

html {font-size: 14px;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fff !important;
  color: #2c3e50;
  padding-top: 8em;
}

.w-application--wrap {
  padding-top: 14em;
  overflow-x: hidden;
}

.main-content {
  max-width: 800px;
  height: 650px;
}

a {
  text-decoration: none;
  color: $primary;

  &[name] {
    position: relative;
    top: -4em;
    display: block;
  }
}

.w-card {box-shadow: none;}

.footer {
  font-size: 0.9em;
  font-style: italic;
  margin: 3em 0 3.5em;

  .w-icon {
    font-size: 1.2em;

    &.heart {transition: 1s ease-out;cursor: pointer;}
    &.heart:hover {animation: pulse 1.8s ease-out infinite;}
  }
}

@keyframes pulse {
  0%, 20%, 30%, 35%, 45%, 100% {transform: scale(1);}
  25%, 40% {transform: scale(1.3);}
}
</style>
