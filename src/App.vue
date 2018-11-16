<template lang="pug">
  v-app.ma-0
    v-content.white
      img(alt="Vue logo" src="./assets/logo.png" width="50")
      p.
        A Vue JS full calendar, no dependency, no BS. :metal:
        #[br]#[em - under construction -]
      v-card.my-5.ma-auto.main-content
        vue-cal

      v-card.my-5.ma-auto.main-content(style="width: 460px;height: 400px;")
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
