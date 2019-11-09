<template lang="pug">
//- This is an isolated test view. Just for testing purpose.
vue-cal(
  :selected-date="selectedDate"
  :events="events"
  :hide-weekdays="[1,2,3,4,5]"
  editable-events
  style="min-height: 400px;max-height: 65vh")
  template(v-slot:weekday-renderer="{ heading, view }")
    table.myheaders(
      v-if="view.view.id === 'week'")
      tr.headingrow
        td
          span.dateCircle {{ (heading.heading.dayOfMonth) }}
        td.headingcell
          span.headingmonth {{ getMonth(heading.heading.date) }}
          br
          span.headingday {{ heading.heading.full }}
</template>

<script>
import VueCal from '@/components/vue-cal'

export default {
  components: { VueCal },
  data: () => ({
    selectedDate: '2020-04-05',
    events: [
      // {
      //   startDate: new Date(new Date(now).setHours(9, 0, 0, 0)),
      //   endDate: new Date(new Date(now).setHours(12, 0, 0, 0)),
      //   title: 'Event'
      // },
      {
        start: '2020-04-04 00:00',
        end: '2020-04-05 08:00',
        title: 'Event'
      }
    ]
  }),

  methods: {
    getMonth (datestring) {
      return datestring.toString().split(' ')[1]
    },
    bar (heading) {
      return heading.heading.full
    }
  }
}
</script>

<style lang="scss">

  .dateCircle {
    border: 1px solid black;
    border-radius: 30px;
    text-align:right;
    margin-right:10px;
    padding-right: 5px;
    padding-left: 5px;
  }
  .myheaders {
  }
  .headingrow {
  }
  .headingcell {
    text-align:left;
  }
  .headingmonth {
    text-align: left;
  }
  .headingday {
    text-align: left;
  }

  .v-application--wrap {min-height: 0;}
  footer {display: none !important;}
</style>
