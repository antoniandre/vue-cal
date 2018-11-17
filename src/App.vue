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
      p Given time range and time step, 24-hour format, hide weekends.
      v-card.my-2.ma-auto.main-content
        vue-cal(:click-to-navigate="false" :time-from="8 * 60" :time-to="22 * 60" :time-step="60" hide-weekends)

      h3.mt-5 # Demo 2
      p.
        Smaller view, 12-hour time format, hidden header, default month view.#[br]
        Click cell to go narrower view, and view title to go broader view (clickToNavigate).
      v-card.my-2.ma-auto.main-content(style="width: 460px;height: 400px;")
        vue-cal(small hide-header 12-hour default-view="month")

      h3.mt-5 # Demo 3
      p.
        Extra-small, no timeline.#[br]
      v-card.my-2.ma-auto.main-content(style="width: 260px;height: 260px;")
        vue-cal(hide-header :time="false" xsmall)

      h3.mt-5 # Demo 4
      p.
        I18n.#[br]
      v-card.my-2.ma-auto.main-content(style="width: 460px;height: 320px;")
        vue-cal(hide-header :time="false" xsmall locale="fr")

      h3.mt-5 # Demo 5
      p.
        Different layout. Week view disabled.
      v-card.my-2.ma-auto.main-content.round(style="width: 280px;height: 300px;")
        vue-cal(xsmall hide-header 12-hour :time="false" default-view="month" :disable-views="['week']")
</template>

<script>
import VueCal from '@/components/vue-cal'

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

.round {
  .vuecal__heading {border: 0;font-size: 12px;}
  .vuecal__title {font-size: 1.3em;}
  .vuecal__cell {background: none;border: none;}
  .vuecal__cell.out-of-scope {opacity: 0.4;}
  .vuecal__cell-content {
    width: 32px;
    height: 32px;
    font-size: 12px;
    background: #f1faf7;
    color: #333;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vuecal--year-view .vuecal__cell {width: 33.33%;}
  .vuecal--year-view .vuecal__cell-content {width: 85px;}
  .vuecal--years-view .vuecal__cell-content {width: 52px;}
}
</style>
