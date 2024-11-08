<template lang="pug">
example(title="Basic view options" anchor="basic" v-bind="$attrs")
  template(#desc)
    p Let's first present some basic views options. Toggle options and view the result and the updated code.
    .w-flex.wrap.gap3.my2
      w-switch(v-model="exBasicView.startOnSunday") Start week on Sunday
      w-switch(v-model="exBasicView.hideWeekends") Hide weekends {{exBasicView.hideWeekends}}
      w-switch(v-model="exBasicView.time") Time
  template(#code).
    &lt;vue-cal{{ exBasicView.time ? '' : ' :time="false"' }}{{ exBasicView.hideWeekends ? ' hide-weekends' : '' }}{{ exBasicView.startOnSunday ? ' start-week-on-sunday' : '' }} /&gt;

  vue-cal(
    :time="exBasicView.time"
    :hide-weekends="exBasicView.hideWeekends"
    :start-week-on-sunday="exBasicView.startOnSunday"
    :dark="store.darkMode"
    style="height: 300px")

//- Example.
example(title="Layouts" anchor="layouts")
  template(#desc)
    .w-flex.wrap.gap3.my2
      w-radios(
        v-model="exLayouts.size"
        :items="[{ label: 'normal'}, { label: 'sm'}, { label: 'xs'}, { label: 'datePicker' }]"
        inline)
      p #[code datePicker] is a shorthand for xs: true, views: [month, year, years], clickToNavigate: true.
  template(#code).
    &lt;vue-cal{{ exLayouts.size === 'sm' ? ' sm' : '' }}{{ exLayouts.size === 'xs' ? ' xs' : '' }}{{ exLayouts.size === 'date-picker' ? ' date-picker' : '' }} /&gt;
  vue-cal.example.my2.mxa(
    v-bind="{ [exLayouts.size]: true }"
    :dark="store.darkMode")

</template>

<script setup>
import { reactive, ref } from 'vue'
import { useAppStore } from '@/store'
import 'simple-syntax-highlighter/dist/sshpre.css'
import { VueCal } from '@/vue-cal'
import Example from '@/documentation/components/example.vue'
import HighlightMessage from '@/documentation/components/highlight-message.vue'
import ViewExamples from './view.vue'

const store = useAppStore()

const exBasicView = ref({
  startOnSunday: false,
  hideWeekends: false,
  time: true
})

const exLayouts = ref({
  size: 'normal'
})
</script>
