<template lang="pug">
  v-app(:class="{ ready }" v-scroll="onScroll")
    v-container
      component(:is="$route.path.includes('/v1') ? 'top-bar-v1' : 'top-bar-v2'" :offset-top="offsetTop")
      router-view

    v-fab-transition
      v-btn(color="primary" fixed bottom right fab v-show="!goTopHidden" small href="#top")
        v-icon(color="white" size="26") keyboard_arrow_up

    v-footer.px-2(color="white")
      v-layout.mx-auto.container.grey--text.text--darken-1(row wrap align-center justify-center)
        v-flex.xs12.sm6.text-center.text-sm-left.copyright.
          Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
        v-flex.xs12.sm6.text-center.text-sm-right.made-with
          .mb-1 This documentation is made with #[v-icon fab fa-vuejs], #[v-icon fab fa-html5], #[v-icon fab fa-css3], #[v-icon fab fa-sass] &amp; #[v-icon.heart favorite]
          | View project on #[a(href="https://github.com/antoniandre/vue-cal" target="_blank") #[v-icon fab fa-github] Github].
</template>

<script>
// Including the top bar from the documentation view and passing the
// offsetTop var slows down too much the top bar animation on scroll.
import TopBarV1 from '@/components/top-bar-v1'
import TopBarV2 from '@/components/top-bar-v2'

export default {
  name: 'app',
  components: { TopBarV1, TopBarV2 },
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

.v-application--wrap {
  padding-top: 12em;
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

.code {
  font-family: monospace, sans-serif;
}

.v-card {box-shadow: none;}

.v-footer {
  font-size: 0.9em;
  font-style: italic;
  margin: 3em 0 3.5em;

  .v-icon {
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
