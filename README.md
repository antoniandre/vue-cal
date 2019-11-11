# vue-cal

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-cal.svg)](https://npmjs.com/package/vue-cal)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vue-cal.svg)](https://www.npmjs.com/package/vue-cal)
[![npm](https://img.shields.io/npm/dw/vue-cal.svg)](https://www.npmjs.com/package/vue-cal)
> A Vue JS full calendar, no dependency, no BS. :metal:

## Installation

```
npm i --S vue-cal
```
___

## Demo & Documentation
> [https://antoniandre.github.io/vue-cal](//antoniandre.github.io/vue-cal)

___

## Browser Support
![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 10+ ✔ |


___


## Donation

If you want to support &amp; boost up the development of this library, you can buy me a beer!

[![paypal](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif)](https://www.paypal.me/antoniandre1)
Thank you!

___

## Contributing

If you have any idea, feel free to fork Vue Cal and submit your changes back to me.

___

## Release Notes

- __Version 2.14.0__ Allow custom weekday render (`month` &amp; `week` views)
- __Version 2.13.0__ Added Indonesian language
- __Version 2.12.0__ Added the `overlapsPerTimeStep` option
- __Version 2.11.0__ Added Greek language
- __Version 2.10.0__ Added the `watchRealTime` option
- __Version 2.9.0__ Added the `minEventWidth` option
- __Version 2.8.0__ Added the `showWeekNumbers` option
- __Version 2.7.0__ Added `minSplitWidth` option for `splitDays`
- __Version 2.6.0__ Added Bangla language
- __Version 2.5.0__ Control Previous &amp; Next externally
- __Version 2.4.0__ Added Korean language
- __Version 2.3.0__ Added Turkish language
- __Version 2.2.0__ Allow rejecting event creation through `on-event-create`
- __Version 2.1.0__ Added split id in `cell-click`, `cell-dblclick` &amp; `cell-focus` emitted events
- __Version 2.0.0__ Many new features - check the Release Notes in the documentation
- __Version 1.63.0__ Added Japanese language
- __Version 1.62.0__ Added Arabic &amp; Farsi languages
- __Version 1.61.0__ Added Traditional Chinese language
- __Version 1.60.0__ Added Danish language
- __Version 1.59.0__ Added Czech language
- __Version 1.58.0__ Added Ukrainian language
- __Version 1.57.0__ Added an option to display a Today button
- __Version 1.56.0__ Allow `minCellWidth` independently of `splitDays`
- __Version 1.55.0__ Set view and cells end dates to 23:59:59
- __Version 1.54.0__ Added min &amp; max dates for cell selection
- __Version 1.53.0__ Added click/dblclick ability on weekdays headings on week view
- __Version 1.52.0__ Separate `outOfScopeEvents` &amp; `events` in month view
- __Version 1.51.0__ Added Bosnian &amp; Serbian languages
- __Version 1.50.0__ Create a new event on cell click &amp; hold
- __Version 1.49.0__ Added Hebrew language
- __Version 1.48.0__ Added Bulgarian language
- __Version 1.47.0__ Added events count on `years` &amp; `year` views
- __Version 1.46.0__ Allow cell customization
- __Version 1.45.0__ Added `cell-click` emitted event
- __Version 1.44.0__ Added Slovenian &amp; Hungarian languages
- __Version 1.43.0__ Added Catalan language
- __Version 1.42.0__ Added Norwegian language
- __Version 1.41.0__ Added Romanian language
- __Version 1.39.0__ Added Vietnamese language
- __Version 1.38.0__ `showAllDayEvents` now also accepts string `short`
- __Version 1.36.0__ Added out of scope events in month view
- __Version 1.35.0__ Allow displaying all-day events in fixed top bar
- __Version 1.34.0__ Allow starting week on Sunday
- __Version 1.33.0__ Minor internal structure improvements
- __Version 1.32.0__ Allow Syncing 2 vue-cal instances
- __Version 1.31.0__ Added CSS transitions option
- __Version 1.30.0__ Allow custom event rendering
- __Version 1.29.0__ Accept a callback function on event click / dblclick
- __Version 1.28.0__ Added Polish language
- __Version 1.27.0__ Allow overriding 'No event' text
- __Version 1.26.0__ Emitted events ready &amp; view-change return events
- __Version 1.25.0__ Support multiple day events
- __Version 1.24.0__ Allow hiding the calendar body
- __Version 1.22.0__ Added Slovak language
- __Version 1.21.0__ Added Georgian language
- __Version 1.20.0__ Allow displaying events on month view
- __Version 1.19.0__ Emit events on mouse-enter &amp; mouse-leave an event
- __Version 1.18.0__ Allow overriding indicators in month view
- __Version 1.17.0__ Allow overriding time cells &amp; title
- __Version 1.16.0__ Highlight Today's current time
- __Version 1.15.0__ Added German language
- __Version 1.14.0__ Added custom time format &amp; emit an event on day-focus
- __Version 1.13.0__ Added Swedish language
- __Version 1.12.0__ Added Croatian language
- __Version 1.11.0__ Added events indicators in month view
- __Version 1.10.0__ Allow no event overlaps
- __Version 1.9.0__ Added Dutch language
- __Version 1.8.0__ Display simultaneous events &amp; redraw overlaps on event resize &amp; delete
- __Version 1.7.0__ Vue Cal emits events
- __Version 1.6.0__ Allow event deletion on touch devices
- __Version 1.5.0__ Added Russian language
- __Version 1.4.0__ Allow edition of event title + click &amp; hold to delete
- __Version 1.3.0__ Added Simplified Chinese language &amp; bug fixes
- __Version 1.2.0__ Allow events deletion
- __Version 1.1.0__ Allow events resizing + add Spanish &amp; Portuguese-Brasil languages
- __Version 1.0.0__ First public release
