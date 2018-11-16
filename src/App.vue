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
      p Click cell to go narrower view, and view title to go broader view.
      v-card.my-2.ma-auto.main-content
        vue-cal

      h3.mt-5 # Demo 2
      p Smaller view, 12-hour time convention, hidden header.
      v-card.my-2.ma-auto.main-content(style="width: 460px;height: 400px;")
        vue-cal(small hide-header 12-hour)
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
