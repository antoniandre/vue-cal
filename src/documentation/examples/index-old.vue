<template lang="pug">


//- Example.
example(title="Internationalization" anchor="internationalization")
  template(#desc)
    p.
      Let you translate the calendar texts into your own language (#[span.code locale]).#[br]
      Refer to the #[span.code locale] option in the #[a(href="#api") API] section to know more or if you want to provide a translation.#[br]
      Try it in Codepen: #[a(href="https://codepen.io/antoniandre/pen/dxXvwv" target="_blank") Vue Cal - Internationalization].
    .w-flex.no-grow.align-center.wrap
      w-icon.mr2(color="primary") mdi mdi-translate
      span.mr2 Current language:
      w-select.pa0.mla.no-grow(
        v-model="locale"
        :items="locales"
        item-value-key="code"
        style="width: 200px")
        template(#selection="{ item }")
          span.mr2 {{ item.label }}
          w-tag.code.ma0(bg-color="grey-light5" round) {{ item.code }}

  template(#code-html).
    &lt;vue-cal :time="false" small view="year" locale="{{ locale }}" /&gt;

  vue-cal(
    :time="false"
    small
    view="year"
    :locale="locale"
    @ready="overrideDateTexts"
    :dark="store.darkMode"
    style="width: 500px;height: 340px;max-width: 100%")

  template(#desc2)
    h4 Alternative
    p.
      If you need full control on the texts, you can alternatively provide an object containing all the
      texts (start from the locale JSON file matching your language).#[br]
      Keep in mind this is not the recommended way: texts may be added / modified / removed in the library
      and your provided custom texts may not work anymore.#[br]
      Always prefer the standard locales!



//- Example.
example(title="Timeline & Business Hours" anchor="timeline")
  template(#desc)
    p.
      Timelines are only visible on #[span.code week] and #[span.code day] views.#[br]
      This example has a set time range from #[code 08:00] to #[code 19:00], time step of #[code 30] minutes (1 hour by default),
      24-hour format, and hidden weekends.

  template(#code-html).
    &lt;!-- Time-start time-end &amp; time-step are expected in minutes. --&gt;
    &lt;vue-cal
      :time-from="8 * 60"
      :time-to="19 * 60"
      :time-step="30"
      hide-weekends /&gt;

  vue-cal(
    :dark="store.darkMode"
    :time-from="8 * 60"
    :time-to="19 * 60"
    :time-step="30"
    hide-weekends
    style="height: 450px")

//- Example.
example(title="Showing Time Labels in Cells" anchor="show-time-in-cells")
  template(#desc)
    p.
      You can choose to display the time labels in every cells by enabling the
      #[span.code showTimeInCells] option.

  template(#code-html).
    &lt;vue-cal
      :time-from="8 * 60"
      :time-to="19 * 60"
      :time-step="30"
      hide-weekends
      show-time-in-cells /&gt;

  vue-cal(
    :dark="store.darkMode"
    :time-from="8 * 60"
    :time-to="19 * 60"
    :time-step="30"
    show-time-in-cells
    hide-weekends
    style="height: 450px")
    template(#no-event) &nbsp;


//- Example.
example(title="Special hours (or business hours)" anchor="special-hours")
  template(#desc)
    p.
      The special hours are visible on #[span.code week] and #[span.code day] views and allow
      you to highlight a particular time range on each day of the week individually.#[br]
    alert.
      Refer to the #[a(href="#api") API] section to read more about the
      #[span.code special-hours] option.

  template(#code-html).
    &lt;vue-cal
      :views="['day', 'week']"
      :time-from="8 * 60"
      :time-to="20 * 60"
      :special-hours="specialHours" /&gt;
  template(#code-js).
    // `from` and `to` are expected in minutes.
    const dailyHours = { from: 9 * 60, to: 18 * 60, class: 'business-hours' }

    // In your component's data, special hours from Monday to Friday.
    // Note that you can provide an array of multiple blocks for the same day.
    specialHours: {
      mon: dailyHours,
      tue: dailyHours,
      wed: [
        { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
        { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
      ],
      thu: dailyHours,
      fri: dailyHours
    }
  template(#code-css).
    .business-hours {
      background-color: rgba(255, 255, 0, 0.15);
      border: solid rgba(255, 210, 0, 0.3);
      border-width: 2px 0;
    }

  vue-cal.ex--special-hours(
    :dark="store.darkMode"
    :time-from="8 * 60"
    :time-to="20 * 60"
    :views="['day', 'week']"
    :special-hours="specialHours"
    style="height: 450px")

  template(#desc2)
    p With the same principle, you could also build a lot more complex layout such as the following one.
    vue-cal.ex--doctor-hours(
      :dark="store.darkMode"
      :views="['day', 'week']"
      :time-from="7 * 60"
      :time-to="20 * 60"
      :special-hours="specialDoctorHours"
      style="height: 550px")
    ssh-pre(language="html-vue" :dark="store.darkMode").
      &lt;vue-cal
        :views="['day', 'week']"
        :time-from="7 * 60"
        :time-to="20 * 60"
        :special-hours="specialHours" /&gt;
    ssh-pre(language="js" :dark="store.darkMode").
      // In your component's data, special hours from Monday to Sunday (1 to 7).
      // Note that you can provide an array of multiple blocks for the same day.
      specialHours: {
        mon: {
          from: 8 * 60,
          to: 17 * 60,
          class: 'doctor-1',
          label: '<strong>Doctor 1</strong><br><em>Full day shift</em>'
        },
        tue: {
          from: 9 * 60,
          to: 18 * 60,
          class: 'doctor-2',
          label: '<strong>Doctor 2</strong><br><em>Full day shift</em>'
        },
        wed: [
          {
            from: 8 * 60,
            to: 12 * 60,
            class: 'doctor-1',
            label: '<strong>Doctor 1</strong><br><em>Morning shift</em>'
          },
          {
            from: 14 * 60,
            to: 19 * 60,
            class: 'doctor-3',
            label: '<strong>Doctor 3</strong><br><em>Afternoon shift</em>'
          }
        ],
        thu: {
          from: 8 * 60,
          to: 17 * 60,
          class: 'doctor-1',
          label: '<strong>Doctor 1</strong><br><em>Full day shift</em>'
        },
        fri: {
          from: 9 * 60,
          to: 18 * 60,
          class: 'doctor-3',
          label: '<strong>Doctor 3</strong><br><em>Full day shift</em>'
        },
        sat: {
          from: 9 * 60,
          to: 18 * 60,
          class: 'doctor-2',
          label: '<strong>Doctor 2</strong><br><em>Full day shift</em>'
        },
        sun: {
          from: 7 * 60,
          to: 20 * 60,
          class: 'closed',
          label: '<strong>Closed</strong>'
        }
      }
    ssh-pre(language="css" :dark="store.darkMode").
      .vuecal__special-hours {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px;

        em {font-size: 0.9em;color: #999;}
      }

      .doctor-1 {background-color: #f0fff1;color: #81d58b;}
      .doctor-2 {background-color: #f0f6ff;color: #689bee;}
      .doctor-3 {background-color: #fcf0ff;color: #d168ee;}
      .closed {
        background:
          #fff7f0
          repeating-linear-gradient(
            -45deg,
            rgba(255, 162, 87, 0.25),
            rgba(255, 162, 87, 0.25) 5px,
            rgba(255, 255, 255, 0) 5px,
            rgba(255, 255, 255, 0) 15px
          );
        color: #f6984c;
      }
</template>

const overrideDateTexts = () => {
  // In Vue Cal documentation Chinese texts are loaded last.
  // Override Date texts with english for prototype formatting functions.
  setTimeout(vuecalEl.value.updateDateTexts, 3000)
}

const specialHours = computed(() => ({
  mon: dailyHours,
  tue: dailyHours,
  wed: [
    { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
    { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
  ],
  thu: dailyHours,
  fri: dailyHours
}))

const specialDoctorHours = {
  mon: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Full day shift</em>' },
  tue: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><br><em>Full day shift</em>' },
  wed: [
    { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Morning shift</em>' },
    { from: 14 * 60, to: 19 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><br><em>Afternoon shift</em>' }
  ],
  thu: { from: 8 * 60, to: 17 * 60, class: 'doctor-1', label: '<strong>Doctor 1</strong><br><em>Full day shift</em>' },
  fri: { from: 9 * 60, to: 18 * 60, class: 'doctor-3', label: '<strong>Doctor 3</strong><br><em>Full day shift</em>' },
  sat: { from: 9 * 60, to: 18 * 60, class: 'doctor-2', label: '<strong>Doctor 2</strong><br><em>Full day shift</em>' },
  sun: { from: 7 * 60, to: 20 * 60, class: 'closed', label: '<strong>Closed</strong>' }
}
