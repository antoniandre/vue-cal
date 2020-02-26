<template lang="pug">
  v-app-bar.top-bar.elevation-0(absolute dense :class="{ scrolled: offsetTop > 104 }")
    v-toolbar-title.top-bar__title
      span.top-bar__title-line
      span.top-bar__title-line
      h1.layout.primary--text.px-6
        a.layout.align-center.top-bar__logo-link.shrink(href="#top" v-scroll-to="'#top'")
          .logo.top-bar__logo {{ todayDate < 10 ? `0${todayDate}` : todayDate }}
          div.top-bar__logo-title Vue Cal&nbsp;
        span.intro Vue.js full cal&nbsp; #[span.code --no-deps --no-bs]&nbsp; :metal:
    v-toolbar-items.top-bar__items
      v-menu(offset-y open-on-hover left attach transition="slide-y-transition")
        template(v-slot:activator="{ on }")
          v-btn(text color="secondary" v-on="on")
            v-icon.mr-2 school
            span Doc
        v-list.text-no-wrap(dense)
          v-list-item(href="#installation" v-scroll-to="'#installation'") Installation
          v-list-item(href="#how-to-use" v-scroll-to="'#how-to-use'") How to use
          v-list-item(href="#api" v-scroll-to="'#api'") API
          v-list-item(href="#date-prototypes" v-scroll-to="'#date-prototypes'")
            | #[span.code.mr-2 Date] prototypes
            v-chip.xsmall.ml-2(small color="primary" outlined) NEW
          v-list-item(href="#css-notes" v-scroll-to="'#css-notes'") CSS notes
          v-list-item(href="#release-notes" v-scroll-to="'#release-notes'") Release notes
      v-menu(offset-y open-on-hover left attach transition="slide-y-transition")
        template(v-slot:activator="{ on }")
          v-btn(text color="secondary" v-on="on")
            v-icon.mr-2 apps
            span Examples
        v-list.text-no-wrap(dense allow-overflow)
          v-list-item.heading(href="#ex--basic" v-scroll-to="'#ex--basic'")
            v-icon(small).mr-2 done
            | BASIC
          v-list-item(href="#ex--basic" v-scroll-to="'#ex--basic'") Basic, hide weekends
          v-list-item(href="#ex--small-cal" v-scroll-to="'#ex--small-cal'") Small calendar, no view selector, custom arrows
          v-list-item(href="#ex--disable-views" v-scroll-to="'#ex--disable-views'") Disable views, default view
          v-list-item(href="#ex--min-max-dates" v-scroll-to="'#ex--min-max-dates'") Min / max dates &amp; single click to navigate
          v-list-item(href="#ex--calendar-themes" v-scroll-to="'#ex--calendar-themes'") Calendar themes
          v-list-item(href="#ex--hiding-particular-week-days" v-scroll-to="'#ex--hiding-particular-week-days'") Hide particular weekdays &amp; show week numbers
          v-list-item.heading(href="#ex--internationalization" v-scroll-to="'#ex--internationalization'")
            v-icon(small).mr-2 translate
            | INTERNATIONALIZATION (I18N)
          v-list-item(href="#ex--internationalization" v-scroll-to="'#ex--internationalization'") Internationalization
          v-list-item.heading(href="#ex--timeline" v-scroll-to="'#ex--timeline'")
            v-icon(small).mr-2 access_time
            | TIMELINE, BUSINESS HOURS &amp; TODAY
          v-list-item(href="#ex--timeline" v-scroll-to="'#ex--timeline'") Timeline
          v-list-item(href="#ex--special-hours" v-scroll-to="'#ex--special-hours'")
            | Business Hours
            v-chip.xsmall.ml-2(small color="primary" outlined) NEW
          v-list-item(href="#ex--today-current-time" v-scroll-to="'#ex--today-current-time'") Today's current time
          v-list-item(href="#ex--adding-a-today-button" v-scroll-to="'#ex--adding-a-today-button'") Adding a Today button

          v-list-item.heading(href="#ex--timeless-events" v-scroll-to="'#ex--timeless-events'")
            v-icon(small).mr-2 event
            | EVENTS
          v-list-item(href="#ex--timeless-events" v-scroll-to="'#ex--timeless-events'") Timeless events
          v-list-item(href="#ex--events-with-time" v-scroll-to="'#ex--events-with-time'") Events with time information
          v-list-item(href="#ex--open-dialog-on-event-click" v-scroll-to="'#ex--open-dialog-on-event-click'") Open a dialog box on event click / dblclick
          v-list-item(href="#ex--events-indicators" v-scroll-to="'#ex--events-indicators'") Events indicators
          v-list-item(href="#ex--events-on-month-view" v-scroll-to="'#ex--events-on-month-view'") Display events on month view
          v-list-item(href="#ex--edit-delete-create-events" v-scroll-to="'#ex--edit-delete-create-events'") Edit, delete &amp; create events
          v-list-item(href="#ex--more-advanced-event-creation" v-scroll-to="'#ex--more-advanced-event-creation'") More advanced event creation
          v-list-item(href="#ex--multiple-day-events" v-scroll-to="'#ex--multiple-day-events'") Multiple day events
          v-list-item(href="#ex--recurring-events" v-scroll-to="'#ex--recurring-events'")
            | Recurring events
            v-chip.xsmall.ml-2(small color="red" outlined) DELAYED
          v-list-item(href="#ex--overlapping-events" v-scroll-to="'#ex--overlapping-events'") Overlapping events
          v-list-item(href="#ex--background-events" v-scroll-to="'#ex--background-events'") Background events
          v-list-item(href="#ex--all-day-events" v-scroll-to="'#ex--all-day-events'") All day events
          v-list-item(href="#ex--splitting-days" v-scroll-to="'#ex--splitting-days'") Splitting days

          v-list-item.heading(href="#ex--emitted-events" v-scroll-to="'#ex--emitted-events'")
            v-icon(small).mr-2 swap_horiz
            | COMMUNICATING WITH VUE CAL
          v-list-item(href="#ex--emitted-events" v-scroll-to="'#ex--emitted-events'") Vue Cal emitted events
          v-list-item(href="#ex--external-controls" v-scroll-to="'#ex--external-controls'") External controls &amp; use of Vue Cal methods
          v-list-item(href="#ex--sync-two-calendars" v-scroll-to="'#ex--sync-two-calendars'") Sync two vue-cal instances
          v-list-item(href="#ex--modifying-events-from-outside" v-scroll-to="'#ex--modifying-events-from-outside'") Modifying events from outside

          v-list-item.heading(href="#ex--timeline-tweaking" v-scroll-to="'#ex--timeline-tweaking'")
            v-icon(small).mr-2 tune
            | ADVANCED VUE CAL CUSTOMIZATION
          v-list-item(href="#ex--scroll-to-time" v-scroll-to="'#ex--scroll-to-time'") Scroll the view to a particular time
          v-list-item(href="#ex--timeline-tweaking" v-scroll-to="'#ex--timeline-tweaking'") Timeline tweaking
          v-list-item(href="#ex--custom-events-count" v-scroll-to="'#ex--custom-events-count'") Custom events count
          v-list-item(href="#ex--custom-title-and-cells" v-scroll-to="'#ex--custom-title-and-cells'") Custom title &amp; cells
          v-list-item(href="#ex--custom-event-rendering" v-scroll-to="'#ex--custom-event-rendering'") Custom event rendering
</template>

<script>
import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo)

export default {
  props: {
    offsetTop: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    todayDate: (new Date()).getDate()
  })
}
</script>

<style lang="scss">
$primary: #42b983;
$secondary: #2c3e50;
$lighter-text: #ccc;

.top-bar {
  z-index: 10 !important;
  position: absolute;
  background: linear-gradient(rgba(255, 255, 255, 0.7)) !important;
  border-bottom: 1px solid transparent !important;
  transition: 0.3s ease-in-out all, 0.1s 0s ease-in-out border-color;
  top: 0;
  box-sizing: content-box;

  .v-toolbar__content {padding: 0;}

  h1 {height: 100%;}

  &__title {
    position: relative;
    overflow: visible;
    margin-left: auto !important;
    margin-right: auto !important;
    width: 15.5em;
    height: 100%;
    transition: 0.3s ease-in-out;
    font-size: 1em;
  }

  &__title-line {
    position: absolute;
    top: 50%;
    width: 130px;
    right: 100%;

    & + & {right: auto;left: 100%;}

    &:before, &:after {
      content: "";
      position: absolute;
      top: 0%;
      width: 100%;
      display: block;
      z-index: -1;
      border-left: none !important;
      border-right: none !important;
    }

    &:before {
      margin-top: -1px;
      border: 2px solid $primary;
    }

    &:after {
      margin-top: 5px;
      border: 1px solid $secondary;
    }
  }

  &__logo {
    position: relative;
    flex-shrink: 0;
    margin-right: 15px;
    vertical-align: middle;
    box-sizing: border-box;
    transition: 0.2s 0s ease-in-out;
    background-color: $primary;
    width: 38px;
    height: 36px;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    opacity: 0.8;
    padding-top: 7px;
    font-family: impact, arial black, arial, sans-serif;
    transition: 0.4s 0.4s ease-in-out;
    transform: translate(3px, 3px) scale(0.9);
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0);

    &:before, &:after {
      content: '';
      position: absolute;
      top: 5px;
      width: 5px;
      height: 5px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    &:before {left: 5px;}
    &:after {right: 5px;}

    .ready & {
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.6);
      transform: translate(0, 0);
    }
  }

  &__logo-link {
    display: inline-flex;
    background-color: rgba(255, 255, 255, 0.7);
    height: 100%;
    font-size: 0.7em;
  }

  &__logo-title {
    display: inline-block;
    vertical-align: middle;
    transition: 0.3s ease-in-out;
    font-size: 32px;
  }

  &__logo-title:after {
    content: "*";
    position: absolute;
    top: 0;
    margin-left: -7px;
    line-height: 1;
    opacity: 1;
    transition: opacity 0.3s ease-in-out;
  }

  &__items {
    position: absolute;
    right: 0;
    transition: 0.3s ease-in-out;
    transform: translateX(100%);
    opacity: 0;
    background-color: rgba(255, 255, 255, 0.7);
  }

  .v-menu__content {max-height: 90vh;}
  .v-menu__content .v-list-item {
    height: 30px;
    font-size: 1em;
    padding-left: 32px;

    &.heading {padding-left: 8px;margin-top: 8px;color: #888 !important;}
  }

  .v-chip.xsmall {height: 18px;font-size: 0.85em;padding: 0 7px;}

  .intro {
    position: absolute;
    top: 3.4em;
    left: 86px;
    color: #999;
    opacity: 1;
    transform: translateY(0em);
    transition: 0.3s .4s ease-in-out, 0s 0s top;
    font: 12px Roboto, Tahoma, Geneva, sans-serif;
    border: none;
    text-align: left;
  }

  .intro:before {
    content: "* ";
    vertical-align: super;
  }

  .intro em {
    padding-top: 3px;
    opacity: 0.6;
    transition: 0.3s;

    &:hover {opacity: 0.9;}
  }

  &.scrolled {
    transition: 0.6s ease-in-out all, 0.3s 0.5s ease-in-out border-color;
    border-bottom-color: $lighter-text !important;
    position: fixed !important;

    & .top-bar__title {width: 100%;}
    & .top-bar__logo-title {font-size: 0.9em;}
    & .top-bar__logo-title:after {opacity: 0;}

    & .top-bar__items {
      transition: 0.3s 0.3s ease-in-out all;
      transform: translateX(0%);
      opacity: 1;
    }

    .intro {
      transition: 0.2s 0s ease-in-out all, 0s 0.3s top;
      transform: translateY(1em);
      opacity: 0;
      top: -5em;
    }
  }
}

@media screen and (max-width: 600px) {
  .scrolled .top-bar__logo {transform: scale(0.7);}

  .top-bar.scrolled,
  .top-bar.scrolled .v-toolbar__content,
  .scrolled .top-bar__logo-link {height: 32px !important;}

  .top-bar__items .v-btn {padding: 0 10px !important;}
}

@media screen and (max-width: 449px) {
  .top-bar__items .v-btn__content span {display: none;}
}
</style>
