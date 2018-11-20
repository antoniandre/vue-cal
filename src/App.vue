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
      p Given time range (8 - 22) and time step (1 hour), 24-hour format, hide weekends. Double click cell to go narrower view.
      v-card.my-2.ma-auto.main-content
        vue-cal(:time-from="8 * 60" :time-to="22 * 60" :time-step="60" hide-weekends)

      h3.mt-5 # Demo 2
      p.
        Smaller view, 12-hour time format, hidden header, default month view.#[br]
        Simple click cell to go narrower view.
      v-card.my-2.ma-auto.main-content(style="width: 460px;height: 400px;")
        vue-cal(small hide-view-selector 12-hour default-view="month" click-to-navigate)

      h3.mt-5 # Demo 3
      p.
        Extra-small, no timeline.#[br]
      v-card.my-2.ma-auto.main-content(style="width: 260px;height: 260px;")
        vue-cal(hide-view-selector :time="false" xsmall)

      h3.mt-5 # Demo 4
      p.
        i18n.#[br]
      v-card.my-2.ma-auto.main-content(style="width: 460px;height: 320px;")
        vue-cal(hide-view-selector :time="false" xsmall locale="fr")

      h3.mt-5 # Demo 5
      p.
        Different layout. Week view disabled.
      v-card.my-2.ma-auto.main-content.round(style="width: 280px;height: 300px;")
        vue-cal(xsmall hide-view-selector 12-hour :time="false" default-view="month" :disable-views="['week']")

      h3.mt-5 # Demo 6
      p.
        Flat events (unmovable, uneditable) with custom HTML content and css class (for event types).#[br]
        Disabled views: years, year, month.
      v-card.my-2.ma-auto.main-content
        vue-cal(:time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="events")

      h3.mt-5 # Demo 7
      p.
        Split days passing a CSS class &amp; a label per split. Disabled views: years, year, month.#[br]
        Allow split-specific events.
      v-card.my-2.ma-auto.main-content
        vue-cal(:time-from="8 * 60" :time-step="30" :disable-views="['years', 'year', 'month']" :split-days="[{ class: 'him', label: 'Him'}, { class: 'her', label: 'Her'}]" :events="events")

      h3.mt-5 # Demo 8
      p.
        Overlapping events.
      v-card.my-2.ma-auto.main-content
        vue-cal(:time-from="7 * 60" :time-to="23 * 60" :time-step="60" :disable-views="['years', 'year', 'month']" hide-weekends :events="events")

    v-footer.justify-end.px-3(color="white")
      em 2018 &copy; Antoni Andre.
</template>

<script>
import VueCal from '@/components/vue-cal'

export default {
  name: 'app',
  components: {
    VueCal
  },
  data: () => ({
    events: [
      {
        start: '2018-11-16 10:30',
        end: '2018-11-16 11:30',
        title: 'Doctor appointment 1',
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: 'health',
        split: 1
      },
      {
        start: '2018-11-19 10:35',
        end: '2018-11-19 11:30',
        title: 'Doctor appointment',
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: 'health',
        split: 1
      },
      {
        start: '2018-11-19 20:30',
        end: '2018-11-19 21:30',
        title: 'Dentist appointment',
        content: '<i class="v-icon material-icons">local_hospital</i>',
        class: 'health',
        split: 1
      },
      {
        start: '2018-11-20 18:30',
        end: '2018-11-20 20:30',
        title: 'Crossfit',
        content: '<i class="v-icon material-icons">fitness_center</i>',
        class: 'sport',
        split: 1
      },
      {
        start: '2018-11-21 11:00',
        end: '2018-11-21 13:00',
        title: 'Brunch with Jane',
        content: '<i class="v-icon material-icons">local_cafe</i>',
        class: 'leisure',
        split: 1
      },
      {
        start: '2018-11-21 12:00',
        end: '2018-11-21 12:30',
        title: 'Call mum',
        content: '<i class="v-icon material-icons">local_cafe</i>',
        class: 'leisure',
        split: 1
      },
      {
        start: '2018-11-21 20:00',
        end: '2018-11-21 22:00',
        title: 'Salsa',
        content: '<i class="v-icon material-icons">directions_walk</i>',
        class: 'sport',
        split: 2
      },
      {
        start: '2018-11-22 19:30',
        end: '2018-11-22 21:00',
        title: 'Swimming lesson',
        content: '<i class="v-icon material-icons">pool</i>',
        class: 'sport',
        split: 1
      },
      {
        start: '2018-11-23 12:30',
        end: '2018-11-23 13:00',
        title: 'Macca\'s with Mark',
        content: '<i class="v-icon material-icons">fastfood</i>',
        class: 'leisure',
        split: 2
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Movie time',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure',
        split: 1
      },
      {
        start: '2018-11-23 21:00',
        end: '2018-11-23 23:30',
        title: 'Movie time',
        content: '<i class="v-icon material-icons">local_play</i>',
        class: 'leisure',
        split: 2
      }
    ]
  })
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

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
  .vuecal__weekdays-headings {border: none;}
  .vuecal__heading {font-size: 12px;}
  .vuecal__title {font-size: 1.3em;}
  .vuecal__cell, .vuecal__cell:before {background: none;border: none;}
  .vuecal__cell.out-of-scope {opacity: 0.4;}
  .selected .vuecal__cell-content {border-color: #42b983;}
  .vuecal__cell-content {
    width: 32px;
    height: 32px;
    font-size: 12px;
    background: #f1faf7;
    border: 1px solid transparent;
    color: #333;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .vuecal--day-view .vuecal__cell-content {width: auto;background: none;}
  .vuecal--year-view .vuecal__cell {width: 33.33%;}
  .vuecal--year-view .vuecal__cell-content {width: 85px;}
  .vuecal--years-view .vuecal__cell-content {width: 52px;}
}

// Split days example.
.vuecal--split-days .vuecal__heading,
.vuecal--split-days.vuecal--week-view .vuecal__,
.vuecal--split-days.vuecal--week-view .vuecal__cell,
.vuecal--split-days.vuecal--day-view .vuecal__cell {min-width: 400px;}

.vuecal__cell-split.him {background-color: rgba(221, 238, 255, 0.6);}
.vuecal__cell-split.him .split-label {color: rgba(0, 84, 194, 0.1);font-size: 30px;font-weight: 500;}
.vuecal__cell-split.her {background-color: rgba(255, 232, 251, 0.6);}
.vuecal__cell-split.her .split-label {color: rgba(255, 0, 106, 0.1);font-size: 30px;font-weight: 500;}

.vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.9);border: 1px solid rgb(233, 136, 46);color: #fff;}
.vuecal__event.health {background-color: rgba(164, 230, 210, 0.9);border: 1px solid rgb(144, 210, 190);}
.vuecal__event.sport {background-color: rgba(255, 102, 102, 0.9);border: 1px solid rgb(235, 82, 82);color: #fff;}
</style>
