<template lang="pug">
  #app
    img(alt="Vue logo" src="./assets/logo.png" height="80")
    p A Vue JS full calendar, no dependency, no BS. :metal:
    vue-cal
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
</style>
