<template lang="pug">
h1.title1 Release Notes

ul.history.ml2
  li.patch
    strong.version 5.0.1-rc.28
    ul
      li Added Kazakh, Uzbek (Latin &amp; Cyrillic), Qaraqalpaq and Kyrgyz locales. #[issue-link 68] &amp;#[issue-link 76]

  li.patch
    strong.version 5.0.1-rc.27
    ul
      li Prevent natural scrolling while resizing event.
      li Allow touch panning on calendar for scrolling and event creation on long press on touch devices. #[issue-link 53]

  li.patch
    strong.version 5.0.1-rc.26
    ul
      li Added a body dynamic max-height so the events are never stretched out. #[issue-link 60]

  li.patch
    strong.version 5.0.1-rc.25
    ul
      li Fix the display of overlapped events if allDayEvents is true. #[issue-link 59]

  li.patch
    strong.version 5.0.1-rc.24
    ul
      li Added RTL support. #[issue-link 50]

  li.patch
    strong.version 5.0.1-rc.23
    ul
      li Fix emitting the #[code event-resize-start] event.

  li.patch
    strong.version 5.0.1-rc.22
    ul
      li Fix invisible time lines on day view when cell is today or selected. #[issue-link 58]

  li.patch
    strong.version 5.0.1-rc.21
    ul
      li Added support for all-day events. #[issue-link 44]
      li Added the #[code event.[view]] slot to specifically customize the event per view.
      li Added the #[code event.all-day] slot to specifically customize the all-day event.
      li Minor UI improvements.

  li.patch
    strong.version 5.0.1-rc.20
    ul
      li Improve the default month view events layout.
      li Allow events to be fully overridden on drop after drag. #[issue-link 55]

  li.patch
    strong.version 5.0.1-rc.19
    ul
      li Added the #[code title.[view]] slot to customize the title per view.
      li Added support for the #[code event-count] prop on the year view. #[issue-link 43]
      li Fixed display of events on the month view. #[issue-link 43]
  li.patch
    strong.version 5.0.1-rc.18
    ul
      li Fixed emitting the #[code event-drag-end] and #[code cell-drag-end] events. #[issue-link 42]
  li.patch
    strong.version 5.0.1-rc.16
    ul
      li.
        Added the #[code stackEvents] prop to stack overlapping events on top of each other.<br>
        Additionally, each event receives an event stacking class based on the stack position and length
        in order to give the user full control on event stacking style. #[issue-link 49]
  li.patch
    strong.version 5.0.1-rc.15
    ul
      li Fix the events positioning when the last time cell is truncated. #[issue-link 48]
  li.patch
    strong.version 5.0.1-rc.14
    ul
      li Correct the time at cursor value on #[code cell-click]. #[issue-link 38]
  li.patch
    strong.version 5.0.1-rc.13
    ul
      li Convert all raw JSON i18n files to ES modules (JS). Fixes a Nuxt issue. #[issue-link 35]
  li.patch
    strong.version 5.0.1-rc.11
    ul
      li Bring events to front on hover, but under the headings bar. #[issue-link 37]
  li.patch
    strong.version 5.0.1-rc.10
    ul
      li Add ability to delete an event by custom event property. #[issue-link 39]
  li.patch
    strong.version 5.0.1-rc.9
    ul
      li Fix the time cell background when using the #[code --vuecal-min-cell-width] CSS variable. #[issue-link 29]
  li.patch
    strong.version 5.0.1-rc.8
    ul
      li Updated the #[code diy] payload: only keep the Vue Cal instance that contains everything you need.
      li Updated the #[code cell]-related slots payloads for consistency, providing the cell object to all of them.
      li Added #[code goNarrower] and #[code goBroader] methods and #[code broader] and #[code narrower] properties to the cell object.
      li Added more browser compatibility checks and catches for the event drag &amp; drop.

  li.patch
    strong.version 5.0.1-rc.7
    ul
      li Always localize texts before using prototypes, or default to #[code en-us].
      li Fix the time cell background when using the #[code --vuecal-min-cell-width] CSS variable. #[issue-link 28]

  li.patch
    strong.version 5.0.1-rc.6
    ul
      li Prevent emitting the #[code view-change] event before the calendar is ready.
      li Updated the #[code event-dropped] payload for consistency.
      li Removed the obsolete #[code event-change] event.

  li.patch
    strong.version 5.0.1-rc.4
    ul
      li Fixed event resizing on touch devices.
      li Optimized and improved the calendar title range formatting to handle locale specific formats.

  li.patch
    strong.version 5.0.1-rc.3
    ul
      li Fixed event drag-and-drop on Firefox.

  li.patch
    strong.version 5.0.1-rc.2
    ul
      li Fixed a memory leak happening on Firefox while recalculating the events' overlaps.
      li Default to deletion stage 3 instead of 2 when deleting an event from its delete button.

  li.major
    title-link.title2.mt12.version.mb4(h2 anchor="v5") Version 5.0.0 - RC
    p.
      Vue Cal has been completely #[strong refactored from the ground up], using the Composition API and
      composables, while focusing on two key aspects: #[strong performance and flexibility].
      You will continue to benefit from all the features of previous versions, now enhanced with new functionality and improvements.
    ul
      li #[strong Performance-oriented]: faster and more efficient than ever.
      li Highly adapted and practical for use with the Composition API.
      li #[strong Exposes the view] for external use.
      li #[strong Exposes all date utilities] for external use.
      li Take advantage of #[strong Date prototypes whenever and wherever] you want, even before the calendar is created or mounted.
      li #[strong Modernized default UI] for a more contemporary appearance, designed to save you time and effort in customization and usability.
      li #[strong Custom days view] to display a custom number of days with an adaptive grid layout.
      li #[strong Flexible grid-based layout] for enhanced customization.
      li #[strong Easy theming] with support for dark and light themes, plus CSS variables.
      li #[strong All-direction sticky headers]: Sticky headers and sticky time bars simultaneously - achieved purely with CSS.
      li Directly #[strong preload a locale externally] to avoid handling Promises.
      li #[strong All the DOM events you can dream about are emitted] and many more!
      li Reworked options for #[strong more intuitive usage].
    br

  li.patch.mb-5.view-more
    //- Older release notes.
    .w-flex.align-center
      .w-divider.primary--bg.px3
      w-button(round outline @click="seeOldReleaseNotes = !seeOldReleaseNotes")
        strong {{ seeOldReleaseNotes ? 'Hide' : 'View' }} older release notes
        w-icon.ml2(:rotate90a="!seeOldReleaseNotes") wi-arrow-down
      .w-divider.primary--bg.grow

w-transition-expand(y)
  ul.history.history--more.ml-2.pl4(v-if="seeOldReleaseNotes")
    li
      br

    li.minor
      strong.version Version 4.9.0
      p Added the Portuguese (Portugal) and Finnish locale.

    li.minor
      strong.version Version 4.8.0
      p Added the Estonian locale.

    li.minor
      strong.version Version 4.6.0
      p.
        Skip the hidden days on #[code day] view (days listed in #[code hideWeekends]
        and #[code hideWeekdays]).

    li.patch
      strong.version Version 4.5.1
      p.
        Fix wrong starting day on week view when the week starts on sunday
        &amp; #[code hideWeekends] is true.

    li.minor
      strong.version Version 4.5.0
      p Added option to display time labels in cells.

    li.patch
      strong.version Version 4.4.3
      p Fix headings misalignments on certain views, when OS sets fixed scrollbars.

    li.minor
      strong.version Version 4.4.0
      p Added a v-model on the #[code selected-date].

    li.patch
      strong.version Version 4.3.4
      p New ESM build by default.

    li.minor
      strong.version Version 4.0.0
      p Supports and only works on Vue 3.

    li.patch
      strong.version Version 3.10.1
      p Prevent focusing cells when they are disabled.

    li.minor
      strong.version Version 3.10.0
      p Allow multiple ranges in daily special hours.

    li.patch
      strong.version Version 3.9.1
      p Fix: Prevent disabling full month or year when using #[code disable-days].

    li.minor
      strong.version Version 3.9.0
      p Allow full custom locale.

    li.patch
      strong.version Version 3.8.4
      p Fix showing events ending at 24:00 on Safari.

    li.patch
      strong.version Version 3.8.3
      p Return the full original DOM event from #[code cell-contextmenu].

    li.patch
      strong.version Version 3.8.2
      p Add #[code active-view] validations and raise warning if incorrect.

    li.patch
      strong.version Version 3.8.1
      p Fix all-day events when no time information is provided.

    li.minor
      strong.version Version 3.8.0
      p Add Mongolian language.

    li.minor
      strong.version Version 3.7.0
      p Add a new #[code disable-days] option.

    li.patch
      strong.version Version 3.6.5
      p Call the on-event-click function (if any) on event single tap. Also add a 30px threshold to not call the handler if the event was tapped and dragged.

    li.patch
      strong.version Version 3.6.4
      ul
        li Fix events ending at 00:00, now ends at 23.59.59 of the previous day or of the same day if time is false.
        li When #[code time] is #[code true], keep 23:59:59 internally, but format string to 24:00.
        li Fix previous / next navigation on day view when date prototypes are disabled.
        li Add shortWeekDays to the #[code uk] locale.

    li.patch
      strong.version Version 3.6.3
      | Return the correct event on out-of-scope event click on month view.

    li.patch
      strong.version Version 3.6.2
      | Fix all-day events not showing up and fix error when using #[code hide-body].

    li.patch
      strong.version Version 3.6.1
      | Fix timeless events not showing up.

    li.minor
      strong.version Version 3.6.0
      | Added Albanian language and short days in Russian language

    li.patch
      strong.version Version 3.5.6
      | Fix multiple day events display across days when #[code time] is false

    li.patch
      strong.version Version 3.5.4
      | Add mouseup event listener when deletable but not resizable

    li.patch
      strong.version 3.5.3
      ul
        li Provide the split (if any) to event creation from cell click &amp; hold.
        li.
          Add mousemove &amp; mouseup event handlers if drag-creation is allowed but
          #[code editableEvents.resize] is set to false.

    li.patch
      strong.version 3.5.1
      ul
        li Don't fire cell-click when clicking on an event
        li Focus and highlight cell on mousedown rather than click

    li.minor
      strong.version 3.5.0
      p.
        Create events with click &amp; drag
        Refer to the #[a(href="#ex--create-events") Create events] example.

    li.patch
      strong.version 3.4.1
      p.
        Also return the original event from the emitted
        #[code event-duration-change] event

    li.minor
      strong.version 3.4.0
      p.
        Add a #[code split-label] slot for day splits labels.
        Refer to the #[a(href="#ex--custom-day-split-labels") Custom day split labels] example.

    li.patch #[strong.version 3.3.1] Add custom event renderer back in all-day bar events

    li.minor
      strong.version 3.3.0
      p.
        Added the #[code allDayBarHeight] option and fix the all-day
        bar layout when using #[code minCellWidth] or day splits &amp; #[code minSplitWidth]
    li.patch
      strong.version 3.2.8
      p.
        Call #[code onEventClick()] (if any) on event click if events
        are not editable or on event creation
    li.patch #[strong.version 3.2.7] Don't call #[code onEventClick()] (if any) on event click &amp; hold
    li.patch #[strong.version 3.2.6] Display the no-event slot accurately per slot if there are
    li.patch
      strong.version 3.2.5
      p.
        Fix emitting #[code view-change] between #[code week]
        &amp; #[code day] views
    li.patch #[strong.version 3.2.4] Prevent calling onEventClick after event resize &amp; focus event on resize
    li.minor
      strong.version 3.2.0
      p.
        The new two way binding #[code active-view] prop replaces the #[code default-view] prop.#[br]
        Refer to the #[a(href="#ex--external-controls") external controls] example.
    li.patch
      strong.version 3.1.1
      p Allow disabling event #[code titleEditable] individually
    li.minor
      strong.version 3.1.0
      alert(warning).
        The event properties #[code startDate] and #[code endDate] have been merged into
        #[code start] and #[code end] which now accept both a String and a Javascript Date.#[br]
        #[strong Vue Cal always returns the Date object and not the string, even if you defined it as a string],
        but Vue Cal offers Date prototype functions to easily format the date how you want.
      ul
        li Fixed multiple day events resizing on x and y axis.
        li Allow disabling Date prototypes
        li Emit an #[code event-resizing] repeatedly while resizing an event

    li.major
      strong.version 3.0.0
      h3.mt0.pt0 The arrival of the drag &amp; drop feature marks a new milestone for Vue Cal!
      p.mb0.
        Many subsequent features to come, progressively building the most intuitive full-featured and flexible calendar
        on Vue.js, 100% designed for Vue, and still no dependency!
      alert.mb0(warning)
        h3.mt0.pt0.
          Like the native HTML5 drag &amp; drop it's built with, Vue Cal's drag &amp; drop is not
          available on touch screens
        p.mb0 Vue Cal will support touch screen drag &amp; drop later on, using an alternative technology.

      alert.mb6(success)
        h3.mt0.pt0 New Features
        ul
          li
            h4.mt2.pt0 Events drag &amp; drop
            p.
              Drag &amp; drop is a module (to keep Vue Cal light weight) and must be loaded
              separately: #[br]#[code import 'vue-cal/dist/drag-and-drop.js']

          li
            h4.mt0 Drop an external (HTML5 draggable) event into Vue Cal or between 2 Vue Cal instances
          li
            h4.mt0 #[code snapToTime] option on event drop and event resize
            p Refer to the #[code snapToTime] option in the #[a(href="#api") API section].
          li
            h4.mt0 The #[code editableEvents] option now also accept an object to precisely allow specific edition
            p Refer to the #[code editableEvents] option in the #[a(href="#api") API section].
        h3.mt0.mb2 Big changes
        ul
          li.error
            strong In the coming version 3.1:
            p.
              Now that Vue Cal has Date prototypes and it is so easy to format a date,
              the event properties #[code startDate] and #[code endDate] will be removed
              and the start and end of event will be exlusively defined through #[code start]
              and #[code end]. It will accept both a String and a Javascript Date.#[br]
              Vue Cal will always return the Date object and not the string, even if you defined it
              as a string.
          li.
            The #[code event-change] emitted event now returns an object containing the
            #[code event] and the #[code originalEvent].
          li.
            the #[code event-title-change] and #[code event-duration-change] events now return an object
            containing the #[code event] and the #[code oldTitle] or #[code oldDate].
          li.
            Vue Cal's #[code createEvent()] function now accepts a duration parameter to easily override
            the default 2 hours.
            (ref. #[a(href="#ex--create-events") Create events] example)
          li.
            The internal event #[code classes] property is replaced with
            #[code class] like in the external event definition. This means you can now
            update the #[code class] property seemlessly like the initial event definition.
            (From your component methods called from Vue Cal fired events or from #[code onEventCreate])

          li
            h4.mt3.pt0 Renamed slot
            p The #[code event-renderer] slot is renamed into #[code event]
          li
            h4.mt3.pt0 Huge code refactoring
            p.
              Introducing Vue dependency injections, Utils classes, and a couple of improvements on
              event resize.

        h3.mt0.mb2 Other noticeable changes
        ul
          li.
            When creating an event with a given #[code endDate], the required
            #[code endTimeMinutes] is automatically add.
          li
            h4.mt3.pt0 You don't need to call #[code alignAllDayBar()] anymore
            p.
              Previously, in some cases you would need to call this function to realign the
              all-day bar with the scrollbar when the scrollbar is fixed (E.g. on Windows).#[br]
              Now the function (renamed to #[code alignWithScrollbar]) is triggered automatically
              and in all the cases, once, in mounted.#[br]
              It will now also align the weekdays headings if needed.
          li
            h4.mt3.pt0 Renamed CSS classes
            p.
              If you use them in your own CSS (or if you have a custom color theme)
              you might want to update them:#[br]
            strong Cells
            ul
              li #[code .current] becomes #[code .vuecal__cell--current]
              li #[code .today] becomes #[code .vuecal__cell--today]
              li #[code .out-of-scope] becomes #[code .vuecal__cell--out-of-scope]
              li #[code .before-min] becomes #[code .vuecal__cell--before-min]
              li #[code .after-max] becomes #[code .vuecal__cell--after-max]
              li #[code .disabled] becomes #[code .vuecal__cell--disabled]
              li #[code .selected] becomes #[code .vuecal__cell--selected]
              li #[code .vuecal__cell--has-splits] &amp; #[code .vuecal__cell--has-events] remain the same
            strong View selector buttons
            ul
              li Added class: #[code .vuecal__view-btn]
              li #[code .active] becomes #[code .vuecal__view-btn--active]

          li
            h4.mt0 New CSS classes when an event is dragged
            ul
              li Over a cell: #[code .vuecal__cell--highlighted]
              li Over a menu arrow (previous &amp; next): #[code .vuecal__arrow--highlighted]
              li Over a menu view button: #[code .vuecal__view-btn--highlighted]
              li Event dragging class: #[code .vuecal__event-dragging]
          li
            h4.mt0 Updated color theme
            p.
              If you have a custom color theme, these new classes should be added:
              #[code .vuecal__view-btn--highlighted],
              #[code .vuecal__arrow--highlighted],
              #[code .vuecal__cell--highlighted].#[br]
              Refer to the #[a(href="#css-notes") CSS Notes].

    li.patch #[strong.version 2.24.4] Fire `event-focus` only once, always return a date from `cell-click`
    li.patch #[strong.version 2.24.3] Fix the all-day bar label cell horizontal alignment
    li.patch #[strong.version 2.24.1] Disable special hours in the all-day bar
    li.minor #[strong.version 2.24.0] Allow toggling day splits
    li.minor #[strong.version 2.23.0] Added #[code special-hours] option
    li.patch #[strong.version 2.22.1] Fix the selected cell CSS class not added on selectedDate change.
    li.minor.
      #[strong.version 2.22.0] Added the #[code addHours], #[code subtractHours],
      #[code addMinutes], #[code subtractMinutes] Date prototypes
    li.minor #[strong.version 2.21.0] Align the all-day bar on devices with fixed scrollbar width
    li.patch #[strong.version 2.20.1] Fix wrong week number with #[code startWeekOnSunday]
    li.minor #[strong.version 2.20.0] Added Icelandic language
    li.minor #[strong.version 2.19.0] Emit an event on #[code cell-keypress-enter]
    li.minor #[strong.version 2.18.0] Added a #[code cell-contextmenu] option and emitted event
    li.minor #[strong.version 2.17.0] Added Lithuanian language
    li.minor #[strong.version 2.16.0]
      ul
        li New Date prototype functions, refer to: #[a(href="#date-prototypes") Date prototypes]
        li Scroll the view to a particular time: #[a(href="#ex--scroll-to-time") see the example]
        li Fix bug where timeless and all-day events were displaying time
      alert.mb2(warning)
        ul
          li.
            #[strong The big "recurring event" feature is coming soon!]#[br]
            In this release, lots of refactored code is merged back into the master branch
            from the recurring-event branch to support the new feature.
          li
            strong.
              To allow formatting both date and time in the same Date prototype function,
              the formatting keywords have changed, since the month and minutes keywords were
              both #[strong.code.base-color mm] but in 2 different functions.#[br]
              The new formatting keywords are more commonly used, the default format is now
              #[code `YYYY-MM-DD`].#[br]
              Ref. #[a(href="#date-prototypes") Date prototypes]

    li.minor
      strong.version 2.15.0
      ul
        li Allow ending an event at #[code 00:00] both from #[code event.end] and #[code event.endDate]
        li Prevent resizing an event below a 1 minute duration or a minimum height of 5px.
    li.minor #[strong.version 2.14.0] Allow custom weekday render (#[code month] &amp; #[code week] views)
    li.minor #[strong.version 2.13.0] Added Indonesian language
    li.minor #[strong.version 2.12.0] Added the #[code overlapsPerTimeStep] option
    li.minor #[strong.version 2.11.0] Added Greek language
    li.minor #[strong.version 2.10.0] Added the #[code watchRealTime] option
    li.minor #[strong.version 2.9.0] Added the #[code minEventWidth] option
    li.minor #[strong.version 2.8.0] Added the #[code showWeekNumbers] option
    li.minor #[strong.version 2.7.0] Added #[code minSplitWidth] option for #[code splitDays]
    li.minor #[strong.version 2.6.0] Added Bangla language
    li.minor #[strong.version 2.5.0] Control Previous &amp; Next externally
    li.minor #[strong.version 2.4.0] Added Korean language
    li.minor #[strong.version 2.3.0] Added Turkish language
    li.minor #[strong.version 2.2.0] Allow rejecting event creation through #[code on-event-create]
    li.minor
      strong.version 2.1.0
      p.
        Added clicked split id in #[code cell-click], #[code cell-dblclick]
        &amp; #[code cell-focus] emitted events

    li.major #[strong.version 2.0.0]
      alert(warning) Due to the new scoped slots syntax, Vue Cal now requires Vue@2.6.0+
      alert(success)
        h3.mt0.pt0 New features
        ul
          li
            | Added an option to hide particular days of the week
            em.grey.ml1 (ref. #[code hideWeekdays] in the #[a(href="#api") API] section)
          li
            | Added new emitted event #[code cell-dblclick]
            em.grey.ml1 (ref. #[a(href="#ex--emitted-events") Emitted events] example)
          li
            | Added ability to resize horizontally
            em.grey.ml1 (ref. #[code resizeX] in the #[a(href="#api") API] section)
          li
            | Added ability to create events on cell single/double click
            em.grey.ml1 (ref. #[a(href="#ex--create-events") Create events] example)
          li
            | Added function to get minutes at cursor (on click of a cell)
            em.grey.ml1 (ref. #[a(href="#ex--emitted-events") Emitted events] example)
          li
            | Now support displaying more than 3 overlapping events!
          li
            | Events start &amp; end can now also be defined with Date objects through #[code startDate] &amp; #[code endDate]
            em.grey.ml1 (ref. #[code events] in the #[a(href="#api") API] section)
          li
            | Added an option to display day splits labels in the header
            em.grey.ml1 (ref. #[code stickySplitLabels] in the #[a(href="#api") API] section)
          li
            | Added #[code deletable], #[code resizable] attributes on events to override globals
            em.grey.ml1 (ref. #[a(href="#ex--edit-and-delete-events") Edit &amp; delete events] example)
          li.
            Vue Cal is now more accessible (WAI-ARIA). You can now navigate through the calendar with the keyboard.#[br]
            Select or focus a cell or an event with the #[kbd tab] key.#[br]
            Pressing #[kbd enter] on a cell will go to a narrower view if any, and pressing
            #[kbd enter] on an event will act like a click.

        h3.mt3 Big changes
        ul
          li New scoped slots syntax #[em.grey.ml1 (internal change - requires Vue 2.6+)]
          li the #[code no-event-overlaps] option is now useless and removed
          li.
            Externalize all locales from main library
            #[em.grey.ml1 (ref. #[a(href="#ex--internationalization") Internationalization] example)]#[br]
            Now, only the locale you need will be loaded on demand (as a separate request).#[br]
            This will ensure Vue Cal keeps its file size as light as possible.
          li.
            If you have a custom color theme, you need to edit #[code .vuecal__menu li] to
            #[code .vuecal__menu button]. #[em.grey.ml1 (ref. #[a(href="#css-notes") CSS Notes])].#[br]
            This is for accessibility purpose.

        h3.mt3 Other noticeable changes
        ul
          li #[code event-duration-change] is now only fired after resizing an event
          li Added a resizing class on events being resized
          li A click on a cell (outside of events) removes the focus state of event
          li Cancel event deletion with escape key
          li Focus a multiple day event highlights all the segments
          li Calculate event segments within current view only (great performance gain on long events)
          li Improve rendering performances on event resizing
          li Improve resizing events logic
          li Week view returned date range (through emitted events) takes #[code hideWeekends] in consideration
          li.
            Renamed the option #[code dblClickToNavigate] to #[code dblclickToNavigate]
            for consistency.
          li.
            Renamed the option #[code 12-hour] (invalid HTML attribute) to
            #[code twelve-hour] and the corresponding css class to
            #[code .vuecal--twelve-hour].
          li Fix bug: allow date selection before the Epoch time!
          li Fix bug: days count calculation when multiple-day event crosses a daylight saving change
          li.
            On month view, out of scope events returned by emitted events don't include
            events that are already in the events array of the current month.
            (may happen with multiple-day events)
          li
            | Internal events structure has changed:
            ul
              li Refactored multiple day events &amp; save 'segments' inside events
              li.
                #[code startDate]/#[code endDate] previously containing strings are now Date Objects.#[br]
                If you want formatted strings, use #[code start]/#[code end] instead
              li.
                #[code startTime] &amp; #[code endTime] are removed as redundant,
                use #[code start]/#[code end] or #[code startDate]/#[code endDate] instead
              li.
                Due to accessibility, multiple elements of the headers are converted to #[code button]#[br]
              li Few nesting levels were removed from html markup by using #[code &lt;template&gt;] tags

    li.minor #[strong.version 1.63.0] Added Japanese language
    li.minor #[strong.version 1.62.0] Added Arabic &amp; Farsi languages
    li.minor #[strong.version 1.61.0] Added Traditional Chinese language
    li.minor #[strong.version 1.60.0] Added Danish language
    li.minor #[strong.version 1.59.0] Added Czech language
    li.minor #[strong.version 1.58.0] Added Ukrainian language
    li.minor #[strong.version 1.57.0] Added an option to display a Today button
      alert(success).
        The CSS class of the title bar has changed from #[code .vuecal__title] to #[code .vuecal__title-bar].#[br]
        The class #[code .vuecal__title] is now only wrapping the title, inside the #[code .vuecal__title-bar].#[br]
      alert(tip).
        If you have a custom theme, you will need to update it as per the theme example in the #[a(href="#css-notes") CSS Notes].
    li.minor #[strong.version 1.56.0] Allow #[code minCellWidth] independently of #[code splitDays]
    li.minor #[strong.version 1.55.0] Set view and cells end dates to 23:59:59
      alert(success)
        ul
          li This update ensures the coverage of the full range of days when fetching your events from an AJAX call.
          li.
            The #[code day-click] &amp; #[code day-focus] emitted events are renamed to
            #[code cell-click] &amp; #[code cell-focus] as they are also triggered on
            #[code years] &amp; #[code year] views.
          li Adaptive width on events-count (for count numbers on more than 1 digit)
          li On month view, removed redundant css classes from events (classes related to event overlaps)
    li.minor #[strong.version 1.54.0] Added min &amp; max dates for cell selection
      alert(success)
        ul
          li.
            The CSS class #[code .splitted] (appearing on the #[code .vuecal__cell] element
            when the cell is split) is renamed to #[code .vuecal__cell--has-splits].
          li.
            The #[code selectedDate] option, like min &amp; max dates, now also accept a
            plain JS Date Object.
    li.minor #[strong.version 1.53.0] Added click/dblclick ability on weekdays headings on week view
    li.minor #[strong.version 1.52.0] Separate #[code outOfScopeEvents] &amp; #[code events] in month view
      alert(success).
        In month view only, the emitted events #[code ready] &amp; #[code view-change]
        now return an object containing a new #[code outOfScopeEvents] array separated from the events array
    li.minor #[strong.version 1.51.0] Added Bosnian &amp; Serbian languages
    li.minor #[strong.version 1.50.0] Create a new event on cell click &amp; hold
    li.minor #[strong.version 1.49.0] Added Hebrew language
    li.minor #[strong.version 1.48.0] Added Bulgarian language
    li.minor #[strong.version 1.47.0] Added events count on #[code years] &amp; #[code year] views
      alert(success).
        As it can now be used on #[code years] &amp; #[code year] views, the former
        #[code events-count-month-view] slot is now renamed to #[code events-count].
    li.minor #[strong.version 1.46.0] Allow cell customization
      alert(success).
        For consistency, the slots #[code arrowPrev] &amp; #[code arrowNext]
        are now renamed to #[code arrow-prev] &amp; #[code arrow-next].

    li.minor #[strong.version 1.45.0] Added #[code cell-click] emitted event
    li.minor #[strong.version 1.44.0] Added Slovenian &amp; Hungarian languages
    li.minor #[strong.version 1.43.0] Added Catalan language
    li.minor #[strong.version 1.42.0] Added Norwegian language
    li.minor #[strong.version 1.41.0] Added Romanian language
    li.minor #[strong.version 1.39.0] Added Vietnamese language
    li.minor #[strong.version 1.38.0] #[code showAllDayEvents] now also accepts string 'short'
    li.minor #[strong.version 1.37.0] Added text 'All day' in all i18n files
    li.minor #[strong.version 1.36.0] Added out of scope events in month view
      alert(success).
        On a month view, the events from the out of scope days
        (cells before and after the current month) are now also be displayed when using
        the #[code eventsOnMonthView] option, and returned in the array of events in
        the #[code ready] &amp; #[code view-change] emited events.
    li.minor #[strong.version 1.35.0] Allow displaying all-day events in fixed top bar
    li.minor #[strong.version 1.34.0] Allow starting week on Sunday
    li.minor
      strong.version 1.33.0
      p Minor internal structure improvements
      alert(success).
        In order to make the internal structure less verbose, the #[code events-count] slot
        use has been simplified.#[br]
        Refer to the #[a(href="#ex--events-indicators") Month view with events indicators] example.
        A few default CSS rules have also been updated.#[br]
    li.minor
      strong.version 1.32.0
      p Allow Syncing 2 vue-cal instances
      alert(success).
        The #[code selected-date] option now also accepts a native Javascript Date object.#[br]
        Refer to the #[code selectedDate] option in the #[a(href="#api") API] section.
    li.minor #[strong.version 1.31.0] Added CSS transitions option
    li.minor #[strong.version 1.30.0] Allow custom event rendering
    li.minor #[strong.version 1.29.0] Accept a callback function on event click / dblclick
    li.minor #[strong.version 1.28.0] Added Polish language
    li.minor
      strong.version 1.27.0
      p Allow overriding 'No event' text
      alert(success).
        The #[code events-on-month-view] option now also accepts the string '#[code short]'.#[br]
        Refer to the #[a(href="#ex--events-on-month-view") Display events on month view] example.
    li.minor #[strong.version 1.26.0] Emitted events #[code ready] &amp; #[code view-change] return events
    li.minor #[strong.version 1.25.0] Support multiple day events
    li.minor
      strong.version 1.24.0
      p Allow hiding the calendar body
      alert(success) Week days headings now have a today CSS class when equals to today's date.
    li.minor #[strong.version 1.22.0] Added Slovak language
    li.minor #[strong.version 1.21.0] Added Georgian language
    li.minor #[strong.version 1.20.0] Allow displaying events on month view
    li.minor #[strong.version 1.19.0] Emit events on mouse-enter &amp; mouse-leave an event
    li.minor #[strong.version 1.18.0] Allow overriding indicators in month view
    li.minor #[strong.version 1.17.0] Allow overriding time cells &amp; title
    li.minor #[strong.version 1.16.0] Highlight Today's current time
    li.minor #[strong.version 1.15.0] Added German language
    li.minor
      strong.version 1.14.0
      p Added custom time format &amp; emit event on #[code cell-focus]
      alert(success)
        ul
          li The emitted #[code view-change] event now returns an object with a view name and startDate.
          li The emitted events-related events now also return native JS Date objects.
          li Refer to the #[a(href="#ex--emitted-events") emitted events example].
    li.minor #[strong.version 1.13.0] Added Swedish language
    li.minor #[strong.version 1.12.0] Added Croatian language
    li.minor
      strong.version 1.11.0
      p Added events indicators in month view
      alert(tip).
        If you have created a custom theme, you will need to update it adding the new indicator
        #[code .vuecal__cell-events-count], as per the theme example in the #[a(href="#css-notes") CSS Notes].
      alert(success).
        The default #[code time-step] option value is now 60 minutes (previously 30).
    li.minor #[strong.version 1.10.0] Allow no event overlaps
    li.minor #[strong.version 1.9.0] Added Dutch language
    li.minor #[strong.version 1.8.0] Display up to 3 simultaneous events &amp; redraw overlaps on event resize &amp; delete
    li.minor #[strong.version 1.7.0] Vue Cal emits events
    li.minor #[strong.version 1.6.0] Allow event deletion on touch devices
    li.minor #[strong.version 1.5.0] Added Russian language
    li.minor
      strong.version 1.4.0
      p Allow editing events title
      alert(success)
        ul
          li The delete button now appears on click and hold.
          li All the events are now read-only by default you can add the option #[code editableEvents] to allow edition.
          li.
            The #[code editableEvents] option triggers all the editing features on and off.#[br]
            Refer to the #[code editableEvents] option in the #[a(href="#api") API] section.
    li.minor #[strong.version 1.3.0] Added Simplified Chinese language &amp; bug fixes
    li.minor
      strong.version 1.2.0
      p Allow event deletion
      alert(success).
        You now have the ability to select an event independently of a cell.#[br]
        On event focus the event z-index is increased and a delete button appears to delete the event.#[br]
        Hovering an event also increases its z-index so you can see the event more easily in case of overlaps.
    li.minor #[strong.version 1.1.0] Allow event resizing + Spanish &amp; Portuguese-Brasil languages.
    li.major #[strong.version 1.0.0] First public release
</template>

<script setup>
import { ref } from 'vue'
import IssueLink from './components/issue-link.vue'

const seeOldReleaseNotes = ref(false)
</script>

<style lang="scss">
.main--release-notes {
  .history {
    > li {padding-left: 24px;}
    > li + li {margin-top: 28px;}

    li {
      position: relative;
      list-style-type: none;
    }
    h2 {margin-top: 0;}
    .view-more > div {bottom: 2px;position: relative;}

    // Bullet.
    > li:before {
      content: '';
      position: absolute;
      top: 11px;
      left: 0;
      background-color: var(--w-base-bg-color);
      border-radius: 1em;
      border: 1px solid currentColor;
      width: 1em;
      aspect-ratio: 1;
      transform: translate(-50%, -50%);
      z-index: 1;
    }

    &.history--more > li:first-child:before {display: none;}

    // Left border.
    > li:after {
      content: '';
      position: absolute;
      top: 11px;
      bottom: -39px; // 11px top + 28px margin between each li.
      left: -0.5px;
      border-left: 1px solid var(--w-base-color);
      opacity: 0.25;
    }

    > li:last-child:after {display: none;}
    > li.dashed:after {border-left-style: dashed;}
    > li.patch:before {
      font-size: 7px;
      border-style: dashed;
      width: 1.1rem;
      animation: spin 10s linear infinite;
    }
    > li.minor:before {
      font-size: 11px;
      width: 1.1rem;
      animation: pulse 3s ease-in-out infinite;
    }
    > li.major:before {
      font-size: 14px;
      box-shadow: 0 0 0 0 #09c;
      border-color: var(--w-primary-color);
      animation: pulse-sonar 3s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .version {
      font: bold 1.2rem monospace;
      display: block;
    }

    > li.patch:before,
    > li.patch .version {
      color: color-mix(in srgb, var(--w-base-color) 40%, transparent);
    }
    > li.minor:before,
    > li.minor .version {
      color: color-mix(in srgb, var(--w-base-color) 60%, transparent);
    }
    > li.major:before,
    > li.major .version {
      color: #09c;
      font-size: 1.4rem;
    }

    ul {margin-left: -2px;}

    li li {
      padding-left: 20px;
      margin-top: 2px;
    }

    // Bullet.
    li li:before {
      content: '\e002';
      font-family: "wave-ui" !important;
      font-style: normal !important;
      font-weight: normal !important;
      font-variant: normal !important;
      text-transform: none !important;
      speak: none;
      line-height: 1;
      -webkit-font-smoothing: antialiased;
      position: absolute;
      top: 3px;
      left: 0;
      width: 1em;
      aspect-ratio: 1;
    }

    li li li:before {content: '\e007';}

    p {
      margin: 0.2em 0 0;
      line-height: 1.2;
    }

    code {padding: 0 4px;}

    strong.code:first-child:not(.black) {
      color: var(--w-primary-color);
      font-size: 1.1em;
    }
  }

  .vue-green {color: #42b883;}
  .vue-green--bg {background-color: #42b883;}

  span.tag {
    border-radius: 99em;
    padding: 2px 5px;
    color: #fff;
    font-weight: bold;
    font-size: 9px;
    position: relative;
    top: -1px;
  }

  span.new {background-color: #3698e5;}
  span.new:before {content: 'NEW';}
  span.deprecated {background-color: #000;}
  span.deprecated:before {content: 'DEPRECATED';}
  span.removed {background-color: #f02c2c;}
  span.removed:before {content: 'REMOVED';}

  @keyframes spin {
    from {transform: translate(-50%, -50%) rotate(0deg);}
    to {transform: translate(-50%, -50%) rotate(360deg);}
  }
  @keyframes pulse {
    0% {transform: translate(-50%, -50%) scale(1);}
    50% {transform: translate(-50%, -50%) scale(1.1);}
    100% {transform: translate(-50%, -50%) scale(1);}
  }
  @keyframes pulse-sonar {
    0% {
      box-shadow: 0 0 0 0 #09c;
      transform: translate(-50%, -50%) scale(1);
      border-color: var(--w-primary-color);
      opacity: 0.5;
    }
    50% {
      box-shadow: 0 0 0 15px rgba(9, 204, 204, 0);
      transform: translate(-50%, -50%) scale(1.05);
      border-color: #09c;
    }
    100% {
      box-shadow: 0 0 0 0 rgba(9, 204, 204, 0);
      transform: translate(-50%, -50%) scale(1);
      border-color: var(--w-primary-color);
    }
  }
}
</style>
