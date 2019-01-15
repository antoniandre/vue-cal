<template lang="pug">
  v-toolbar.top-bar(app light dense flat fixed align-center :class="{ scrolled: offsetTop > 104 }")
    v-toolbar-title.top-bar__title
      h1.primary--text
        a.top-bar__logo-link(href="#top")
          .logo.top-bar__logo {{ todayDate < 10 ? `0${todayDate}` : todayDate }}
            //- img(alt="Vue logo" src="../assets/logo.png" width="50")
            //- v-icon.calendar event
            //- v-icon.time access_time

          //- svg.top-bar__logo(xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 442 442")
            path(d="M166.6 225.2c4 16 27.3 26.3 59.5 26.3 24 0 39.3-8.8 45.6-17a19.7 19.7 0 0 0 3.5-18c-3.6-13-22.4-19.3-52.8-28.2l-8.5-2.5c-31-9-66.3-19.3-73.7-46.2a43.3 43.3 0 0 1 8.5-39.8 10 10 0 0 0-7.8-16.4h-35a10 10 0 0 0-7.7 3.5l-43 50a10 10 0 0 0 0 13l74.3 86.4a10 10 0 0 0 17.5-7.7 10 10 0 0 1 19.6-3.4zm-16.9-26.7c-6.9 1.7-12.7 5.7-16.8 11.1l-57-66.2 34.5-40h13a62.7 62.7 0 0 0-2.5 41.6c10.5 37.6 53.1 50 87.4 60l8.5 2.5c8.5 2.5 18.1 5.3 26 8.3a45.3 45.3 0 0 1 13 6.5c-2.8 3.7-13 9.2-29.7 9.2-27.2 0-39-8.3-40-11a30 30 0 0 0-36.4-22zM263.2 264.5a97 97 0 0 1-37.1 7c-18.8 0-35.8-3.2-49.1-9.3a10 10 0 0 0-11.8 15.6l48.2 56a10 10 0 0 0 15.2 0l46-53.5a10 10 0 0 0-11.4-15.8zM221 312l-19-22a167.4 167.4 0 0 0 37.2 1l-18.2 21z")
            path(d="M336.2 83.4h-36.6a10 10 0 0 0-7.5 16.6 44.8 44.8 0 0 1 11.4 30.3 10 10 0 0 1-20 0c0-25.3-34.2-36.6-68.1-36.6-27.3 0-44.7 10-51.8 19.5a23 23 0 0 0-4.1 21c4.1 15 27.5 23 60 32.4l8.5 2.5c30.6 9 59.6 17.4 66.4 42 1.6 5.6 2 11.1 1.2 16.6a10 10 0 0 0 17.5 7.9l73.7-85.6a10 10 0 0 0 0-13l-43-50a10 10 0 0 0-7.6-3.6zm-22.8 121.2c-10.3-34.5-47.2-45.2-79.8-54.7l-8.5-2.5c-10-2.9-21.2-6.2-30.7-10-12.5-4.9-15.3-8.1-15.7-8.7-.4-1.4-.3-2 .8-3.4 3-4 14.4-11.6 35.9-11.6 27.5 0 48.1 8.8 48.1 16.6a30 30 0 0 0 60 0c0-9.5-2-18.5-5.7-26.9h13.8l34.4 40-52.6 61.2z")
            path(d="M439.6 137L362 47a10 10 0 0 0-7.6-3.6h-267a10 10 0 0 0-7.6 3.5L2.4 137a10 10 0 0 0 0 13l211 245.2a10 10 0 0 0 15.2 0l211-245.1a10 10 0 0 0 0-13zM221 373.1L23.2 143.4l68.9-80h257.8l69 80L221 373.2z")
          div.top-bar__logo-title Vue Cal&nbsp;
        span.intro a Vue.js full cal&nbsp; #[span.code --no-deps --no-bs]&nbsp; :metal:
    v-toolbar-items.top-bar__items
      v-menu(offset-y open-on-hover left attach transition="slide-y-transition")
        v-btn(flat color="secondary" href="#api" slot="activator")
          v-icon school
          | &nbsp;
          span Doc
        v-list.no-wrap
          v-list-tile(href="#installation") Installation
          v-list-tile(href="#how-to-use") How To Use
          v-list-tile(href="#api") API
          v-list-tile(href="#css-notes") CSS Notes
          v-list-tile(href="#release-notes") Release Notes
      v-menu(offset-y open-on-hover left attach transition="slide-y-transition")
        v-btn(flat color="secondary" href="#examples" slot="activator")
          v-icon apps
          | &nbsp;
          span Examples
        v-list.no-wrap
          v-list-tile(href="#ex--basic") Basic, hide-weekends
          v-list-tile(href="#ex--small-cal") Small calendar, hide view selector &amp; custom arrows
          v-list-tile(href="#ex--calendar-themes") Calendar themes
          v-list-tile(href="#ex--internationalization") Internationalization
          v-list-tile(href="#ex--timeline") Timeline
          v-list-tile(href="#ex--timeline-tweaking") Timeline tweaking
          v-list-tile(href="#ex--today-current-time") Today's current time
          v-list-tile(href="#ex--disabled-views-and-calendar-events") Disable views &amp; calendar events
          v-list-tile(href="#ex--events-indicators-on-month-view") Events indicators on month view
          v-list-tile(href="#ex--custom-title") Custom vue-cal title
          v-list-tile(href="#ex--timeless-events") Timeless Events
          v-list-tile(href="#ex--editable-deletable-events") Editable / deletable events
          v-list-tile(href="#ex--overlapping-events") Overlapping events
          v-list-tile(href="#ex--background-events") Background events
          v-list-tile(href="#ex--splitting-days") Splitting days
          v-list-tile(href="#ex--modifying-events-from-outside") Modifying events from outside
          v-list-tile(href="#ex--emitted-events") Vue Cal emitted events
</template>

<script>
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
  z-index: 10;
  position: absolute;
  background: #fff !important;
  border-bottom: 1px solid transparent !important;
  transition: 0.3s ease-in-out all, 0.1s 0s ease-in-out border-color;
  top: 0;

  .v-toolbar__content {
    padding: 0;
  }

  &__title {
    position: relative;
    overflow: visible;
    margin-left: auto !important;
    margin-right: auto !important;
    width: 15.5em;
    transition: 0.3s ease-in-out;
    font-size: 1em;
    padding: 0 1.3em;
    background-color: #fff;

    &:before, &:after {
      content: "";
      position: absolute;
      top: 50%;
      left: -60%;
      right: -60%;
      display: block;
      z-index: -1;
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
    margin-right: 15px;
    vertical-align: middle;
    transition: 0.2s 0s ease-in-out;
    background-color: $primary;
    width: 36px;
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
    display: inline-block;
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

  .top-bar__items {
    position: absolute;
    right: 0;
    transition: 0.3s ease-in-out;
    transform: translateX(100%);
    opacity: 0;
  }

  .top-bar__items .v-menu__content .v-list__tile {
    height: 34px;
    font-size: 1.1em;
    color: inherit !important;
  }

  .intro {
    position: absolute;
    top: 3.4em;
    left: 70px;
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
  }

  .intro em:hover {
    opacity: 0.9;
  }

  &.scrolled {
    transition: 0.6s ease-in-out all, 0.3s 0.5s ease-in-out border-color;
    border-bottom-color: $lighter-text !important;
    position: fixed;

    & .v-toolbar__title {
      width: 100%;
      transition: 0.6s ease-in-out all, 0.3s 0.3s ease-in-out background-color;
    }

    & .top-bar__logo {
      width: 37px;
    }

    & .top-bar__logo-title {
      font-size: 0.7em;
    }

    & .top-bar__logo-title:after {
      opacity: 0;
    }

    & .top-bar__items {
      transition: 0.3s 0.3s ease-in-out all;
      transform: translateX(0%);
      opacity: 1;
    }

    .intro {
      transition: 0.2s 0s ease-in-out all, 0s 0.3s top;
      transform: translateY(1em);
      opacity: 0;
      top: 5em;
    }
  }
}

@media screen and (max-width: 449px) {
  .top-bar__items .v-btn {
    min-width: 50px;
  }

  .top-bar__items a .v-btn__content span {
    display: none;
  }
}
</style>
