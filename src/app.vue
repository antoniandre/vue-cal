<template lang="pug">
  v-app.white(:class="{ ready: ready }" v-scroll="onScroll")
    v-container
      component(:is="$route.path.indexOf('/v1') > -1 ? 'top-bar-v1' : 'top-bar-v2'" :offset-top="offsetTop")
      router-view

    v-footer.mt-5.pa-2.pb-4(color="white")
      v-layout.max-widthed(row wrap align-center justify-center)
        v-flex.xs12.sm6.text-xs-center.text-sm-left.copyright.
          Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
        v-flex.xs12.sm6.text-xs-center.text-sm-right.made-with
          div.mb-1 This documentation is made with #[v-icon fab fa-vuejs], #[v-icon fab fa-html5], #[v-icon fab fa-css3], #[v-icon fab fa-sass] &amp; #[v-icon.heart favorite]
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

* {
  margin: 0;
  padding: 0;
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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 8em;
}

.application--wrap {
  padding-top: 12em;
  overflow-x: hidden;
}

.main-content {
  max-width: 800px;
  height: 650px;
}

.code {
  font-family: monospace, sans-serif;
}

.v-card {box-shadow: none;}

.v-footer {
  font-size: 0.9em;
  height: auto !important;

  .v-icon {
    font-size: 1.2em;
  }
}
</style>
