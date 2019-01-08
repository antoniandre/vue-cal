<template lang="pug">
  v-app.white(:class="{ ready: ready }")
    v-container
      .text-xs-center
        .logo
          img(alt="Vue logo" src="./assets/logo.png" width="50")
          v-icon.calendar event
          v-icon.time access_time

        p
          .headline Vue Cal#[br]
          | A Vue JS full calendar, no dependency, no BS. :metal:

      documentation

    v-footer.mt-5.pa-2.pb-4(color="white")
      v-layout.max-widthed(row wrap align-center justify-center)
        v-flex.xs12.sm6.text-xs-center.text-sm-left.copyright.
          Copyright © {{ (new Date()).getFullYear() }} Antoni André, all rights reserved.
        v-flex.xs12.sm6.text-xs-center.text-sm-right.made-with
          div.mb-1 This documentation is made with #[v-icon fab fa-vuejs], #[v-icon fab fa-html5], #[v-icon fab fa-css3], #[v-icon fab fa-sass] &amp; #[v-icon.heart favorite]
          | View project on #[a(href="https://github.com/antoniandre/vue-cal" target="_blank") #[v-icon fab fa-github] Github].
</template>

<script>
import Documentation from '@/documentation'

export default {
  name: 'app',
  components: { Documentation },
  data: () => ({
    ready: false
  }),
  created () {
    setTimeout(() => (this.ready = true), 500)
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
  color: $primary !important;

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
}

.logo {
  position: relative;
  display: inline-block;

  img {z-index: 1;position: relative;}

  .v-icon {
    position: absolute;
    left: 50%;
    font-size: 3em;
    opacity: 0;
    transition: 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    transform: rotate(0deg) scale(0.3);
    z-index: 0;
    color: #ddd;
  }

  .v-icon.calendar {
    margin-left: -25px;
    transform-origin: 75% 100%;

    .ready & {
      transform: translateX(-75%) rotate(-30deg) scale(0.8);
    }
  }

  .v-icon.time {
    margin-left: -19px;
    transform-origin: 25% 100%;

    .ready & {
      transform: translateX(75%) rotate(30deg) scale(0.8);
    }
  }

  .ready & .v-icon {
    opacity: 1;
  }
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

  .v-icon {
    font-size: 1.2em;
  }
}
</style>
