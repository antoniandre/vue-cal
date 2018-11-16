<template lang="pug">
  v-app.ma-0
    v-content.white
      img(alt="Vue logo" src="./assets/logo.png" width="50")
      p.
        A Vue JS full calendar, no dependency, no BS. :metal:
        #[br]#[em - under construction -]

      h2.mt-5 To do...
      p Support for scheddule events coming soon!

      h3.mt-5 # Demo 1
      p Given time range and time step, 24-hour format.
      v-card.my-2.ma-auto.main-content
        vue-cal(:click-to-navigate="false" :time-from="8 * 60" :time-to="22 * 60" :time-step="60")

      h3.mt-5 # Demo 2
      p.
        Smaller view, 12-hour time format, hidden header.#[br]
        Click cell to go narrower view, and view title to go broader view (clickToNavigate).
      v-card.my-2.ma-auto.main-content(style="width: 460px;height: 400px;")
        vue-cal(small hide-header 12-hour)

      h3.mt-5 # Demo 3
      p.
        Extra-small, no timeline.#[br]
      v-card.my-2.ma-auto.main-content(style="width: 260px;height: 260px;")
        vue-cal(hide-header :time="false" xsmall)
</template>

<script>
import VueCal from './components/vue-cal.vue'

export default {
  name: 'app',
  components: {
    VueCal
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-content {
  max-width: 800px;
  height: 650px;
}
</style>
