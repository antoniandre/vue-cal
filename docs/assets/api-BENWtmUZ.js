import{u as h,r as b,b as E,e,f as l,w as s,h as n,a as u,t as p,g as d,k as j,F as A,d as I}from"./index-B51Azlyj.js";import M from"./fr-GKuwB6u6.js";import{u as B,b as O}from"./index-C3JoaaGD.js";const N={class:"w-flex justify-space-between mb2"},W={class:"code"},C={class:"w-flex justify-space-between mb2"},V={class:"w-flex justify-space-between mb2"},z={class:"w-flex justify-space-between mb2"},Y={class:"mt2"},q={__name:"api",setup(F){B(M),O();const i=h(),T=j("locales"),w=[{label:"day",content:"Displays a given single day in a a single cell."},{label:"days",content:"Displays a given custom unlimited range of days, from 1 to x. Be aware that the more days displayed, the heavier work for the calendar and consumed API."},{label:"week",content:"Displays a given 7-day week in 7 cells by default and at most, starting from Monday by default.<br>Other options can modify the order or number of days."},{label:"month",content:"Displays a given month in a 6x7 cell grid by default and at most."},{label:"year",content:"Displays a given year's months in a 4x3 cell grid. Usually for a date picker.<br>No event can be displayed on this view by default - only events counter - but you could use slots to build a custom UI."},{label:"years",content:"Displays a range of 25 years in a 5x5 cell grid. Usually for date pickers."}],c=b([...w].fill(!1)),k=b(Array(10).fill(!1)),S=b(Array(15).fill(!1)),x=b(Array(99).fill(!1));return(J,t)=>{const g=u("title-link"),m=u("w-switch"),f=u("w-accordion"),r=u("ssh-pre"),a=u("w-accordion-item"),v=u("w-tag"),y=u("alert"),D=u("router-link");return I(),E(A,null,[t[225]||(t[225]=e("h1",{class:"title1"},"API",-1)),e("h2",N,[l(g,{div:"",anchor:"views"},{default:s(()=>t[8]||(t[8]=[n("Calendar Views")])),_:1}),l(m,{class:"my1 body","onUpdate:modelValue":t[0]||(t[0]=o=>c.value=[...w].fill(o))},{default:s(()=>t[9]||(t[9]=[n("Expand All")])),_:1})]),l(f,{modelValue:c.value,"onUpdate:modelValue":t[1]||(t[1]=o=>c.value=o),items:w,"expand-icon-rotate90":"","title-class":"pl0 bd0","content-class":"pt0 pb3"},{"item-title":s(({item:o})=>[e("strong",W,p(o.label),1)]),_:1},8,["modelValue"]),e("h2",C,[l(g,{div:"",anchor:"view"},{default:s(()=>t[10]||(t[10]=[n("The View Object")])),_:1}),t[12]||(t[12]=e("div",{class:"todo-tag ml2 mra"},"TO REVIEW",-1)),l(m,{class:"my1 body","onUpdate:modelValue":t[2]||(t[2]=o=>k.value=Array(10).fill(o))},{default:s(()=>t[11]||(t[11]=[n("Expand All")])),_:1})]),t[226]||(t[226]=e("p",{class:"caption size--md lh1"},[n("You can use the "),e("code",{class:"base-color"},"view"),n(` object to access accurate information about the current view at any time.
This is what it contains:`)],-1)),l(f,{class:"mt3",modelValue:k.value,"onUpdate:modelValue":t[3]||(t[3]=o=>k.value=o),"expand-icon-rotate90":"","title-class":"pl0 bd0","content-class":"pt1 pr0 pb6 pl7"},{default:s(()=>[l(a,null,{title:s(()=>t[13]||(t[13]=[e("h3",{class:"title4 mt0 pt0"},"ID, Title",-1)])),content:s(()=>[t[15]||(t[15]=e("p",null,[n("The ID of the current view, as well as its computed title that you may use in slots."),e("br"),n(`
Example:`)],-1)),l(r,{language:"js",dark:d(i).darkMode},{default:s(()=>t[14]||(t[14]=[n(`{
  id: "month",
  title: "October 2024",
  ...
}
`)])),_:1},8,["dark"])]),_:1}),l(a,null,{title:s(()=>t[16]||(t[16]=[e("h3",{class:"title4 mt0 pt0"},"Ranges",-1)])),content:s(()=>[t[25]||(t[25]=e("p",null,"In order to be flexible, straightforward and not confusing, two ranges are available:",-1)),e("ul",null,[e("li",null,[t[18]||(t[18]=e("h4",{class:"mt2 mb0"},"Primary Range (Actual visible/active days):",-1)),t[19]||(t[19]=e("p",null,`What most users will need when fetching events from an API. It will ignore out-of-scope days in the month
view and trim the hidden days in the week.
`,-1)),t[20]||(t[20]=e("p",null,"Example:",-1)),l(r,{class:"mt0",language:"js",dark:d(i).darkMode},{default:s(()=>t[17]||(t[17]=[n(`{
  start: "2024-09-30T22:00:00.000Z", // Standard JS Date object.
  end: "2024-10-31T22:59:59.999Z", // Standard JS Date object.
  ...
}`)])),_:1},8,["dark"])]),e("li",null,[t[22]||(t[22]=e("h4",{class:"mt2 mb0"},"Extended full range (including out-of-scope or hidden days):",-1)),t[23]||(t[23]=e("p",null,`It will include out-of-scope days in the month view (e.g., from the previous month or the next
month) and return a full 7-day week range in the week view regardless of the hidden days.
`,-1)),t[24]||(t[24]=e("p",null,"Example:",-1)),l(r,{class:"mt0",language:"js",dark:d(i).darkMode},{default:s(()=>t[21]||(t[21]=[n(`{
  fullRangeStart: "2024-09-29T22:00:00.000Z", // Standard JS Date object.
  fullRangeEnd: "2024-11-10T22:59:59.999Z", // Standard JS Date object.
  ...
}
`)])),_:1},8,["dark"])])])]),_:1}),l(a,null,{title:s(()=>t[26]||(t[26]=[e("h3",{class:"title4 mt0 pt0"},"Cell Dates",-1)])),content:s(()=>[t[28]||(t[28]=e("p",null,[n("A complete list of all the visible cells dates (start and end)."),e("br"),n("Example:")],-1)),l(r,{language:"js",dark:d(i).darkMode},{default:s(()=>t[27]||(t[27]=[n(`{
  cellDates: [
    {
      start: "2024-09-29T22:00:00.000Z", // Standard JS Date object.
      startFormatted: "2024-09-30", // Standard JS Date object.
      end: "2024-09-30T21:59:59.999Z" // Standard JS Date object.
    },
    ...
  ],
  ...
}
`)])),_:1},8,["dark"])]),_:1}),l(a,null,{title:s(()=>t[29]||(t[29]=[e("h3",{class:"title4 mt0 pt0"},"Events",-1)])),content:s(()=>[t[31]||(t[31]=e("p",null,[n("All the calendar events that the current view contains."),e("br"),n("Example:")],-1)),l(r,{language:"js",dark:d(i).darkMode},{default:s(()=>t[30]||(t[30]=[n(`{
  events: [],
  ...
}
`)])),_:1},8,["dark"])]),_:1}),l(a,null,{title:s(()=>t[32]||(t[32]=[e("h3",{class:"title4 mt0 pt0"},"Methods",-1)])),content:s(()=>[t[37]||(t[37]=e("p",null,"Methods that you can use from the Vue Cal instance's view (you can use a template ref).",-1)),e("div",null,[t[34]||(t[34]=n("Example:")),l(r,{class:"d-iblock pr5 py0 ml1 my0",language:"js",dark:d(i).darkMode},{default:s(()=>t[33]||(t[33]=[n("vuecalRef.value.view.next()")])),_:1},8,["dark"]),t[35]||(t[35]=n("."))]),l(r,{language:"js",dark:d(i).darkMode},{default:s(()=>t[36]||(t[36]=[n(`switch, // Switches to a different view given in param (day, days, month, year, years).
broader, // Navigates to the next available broader view.
narrower, // Navigates to the next available narrower view.
previous, // Navigates to the previous range of the same view.
next, // Navigates to the next range of the same view.
goToToday, // Goes to today.
updateViewDate, // Updates the view date to the date given in param.
updateSelectedDate, // Updates the selected date to the date given in param.
createEvent, // Creates an event given in params (requires \`start\`, \`end\`).
deleteEvent, // Deletes an event given its ID and a deletion stage (1, 2, 3).
scrollToCurrentTime, // Scrolls the calendar body to the current time.
scrollToTime, // Scrolls the calendar body to the given time in minutes.
scrollTop // Scrolls the calendar body to the top.
`)])),_:1},8,["dark"])]),_:1}),l(a,null,{title:s(()=>t[38]||(t[38]=[e("h3",{class:"title4 mt0 pt0"},"Other Utilities",-1)])),content:s(()=>[t[40]||(t[40]=e("p",null,"Other utilities that you may find useful.",-1)),t[41]||(t[41]=e("p",null,"Example:",-1)),l(r,{language:"js",dark:d(i).darkMode},{default:s(()=>t[39]||(t[39]=[n(`{
  viewDate: "2024-09-30T22:00:00.000Z", // Standard JS Date object.
  selectedDate: "2024-10-22T19:56:41.104Z", // Standard JS Date object.
  now: "2024-10-22T19:56:41.107Z", // Standard JS Date object.
  broaderView: "year",
  containsToday: true,
  cols: 7,
  rows: 6,
  isDay: false,
  isDays: false,
  isWeek: false,
  isMonth: true,
  isYear: false,
  isYears: false
}
`)])),_:1},8,["dark"])]),_:1})]),_:1},8,["modelValue"]),e("h2",V,[l(g,{div:"",anchor:"view"},{default:s(()=>t[42]||(t[42]=[n("The Event Object")])),_:1}),l(m,{class:"my1 body","onUpdate:modelValue":t[4]||(t[4]=o=>S.value=Array(15).fill(o))},{default:s(()=>t[43]||(t[43]=[n("Expand All")])),_:1})]),t[227]||(t[227]=e("p",{class:"caption size--md lh1"},"The event object contains all the information about a calendar event and is used to render it in the calendar.",-1)),t[228]||(t[228]=e("p",null,[n("Minimum required properties: "),e("span",{class:"code"},"start"),n(" and "),e("span",{class:"code"},"end"),n(".")],-1)),t[229]||(t[229]=e("p",null,"Example of a complete event object:",-1)),l(r,{language:"js",dark:d(i).darkMode},{default:s(()=>t[44]||(t[44]=[n(`{
  start: new Date(),
  end: new Date().addHours(1), // Using Vue Cal's Date prototypes.
  id: 'event-1',
  title: 'Meeting with Alice',
  draggable: true,
  resizable: true,
  deletable: true,
  allDay: false,
  recurring: { frequency: 'week', amount: 1, start: new Date() },
  schedule: 1,
  background: false,
  class: 'meeting',

  customField: '...', // Your custom fields.
  _: { ... } // Internal Fields.
}
`)])),_:1},8,["dark"]),l(f,{class:"mt3",modelValue:S.value,"onUpdate:modelValue":t[5]||(t[5]=o=>S.value=o),"expand-icon-rotate90":"","title-class":"pl0 bd0","content-class":"pt1 pr0 pb6 pl7"},{default:s(()=>[l(a,null,{title:s(()=>[t[46]||(t[46]=e("strong",{class:"code"},"start",-1)),t[47]||(t[47]=e("div",{class:"type"},"[Date]",-1)),l(v,{class:"error--bg ml1",round:"",sm:""},{default:s(()=>t[45]||(t[45]=[n("REQUIRED")])),_:1})]),content:s(()=>t[48]||(t[48]=[n("The start date and time of the event, given as a JavaScript Date.")])),_:1}),l(a,null,{title:s(()=>[t[50]||(t[50]=e("strong",{class:"code"},"end",-1)),t[51]||(t[51]=e("div",{class:"type"},"[Date]",-1)),l(v,{class:"error--bg ml1",round:"",sm:""},{default:s(()=>t[49]||(t[49]=[n("REQUIRED")])),_:1})]),content:s(()=>t[52]||(t[52]=[n("The end date and time of the event, given as a JavaScript Date.")])),_:1}),l(a,null,{title:s(()=>t[53]||(t[53]=[e("strong",{class:"code"},"id",-1),e("div",{class:"type"},"[String]",-1)])),content:s(()=>t[54]||(t[54]=[n("The unique identifier of the event. If not provided, it will be internally identified by the key "),e("span",{class:"code"},"_.id",-1),n(".")])),_:1}),l(a,null,{title:s(()=>t[55]||(t[55]=[e("strong",{class:"code"},"title",-1),e("div",{class:"type"},"[String]",-1)])),content:s(()=>t[56]||(t[56]=[n("The title of the event. If not provided, no title will be displayed.")])),_:1}),l(a,null,{title:s(()=>t[57]||(t[57]=[e("strong",{class:"code"},"draggable",-1),e("div",{class:"type"},"[Boolean]",-1)])),content:s(()=>t[58]||(t[58]=[n("Indicates if this specific event can be dragged and dropped. This property overrides the global setting.")])),_:1}),l(a,null,{title:s(()=>t[59]||(t[59]=[e("strong",{class:"code"},"resizable",-1),e("div",{class:"type"},"[Boolean]",-1)])),content:s(()=>t[60]||(t[60]=[n("Indicates if this specific event can be resized. This property overrides the global setting.")])),_:1}),l(a,null,{title:s(()=>t[61]||(t[61]=[e("strong",{class:"code"},"deletable",-1),e("div",{class:"type"},"[Boolean]",-1)])),content:s(()=>t[62]||(t[62]=[n("Indicates if this specific event can be deleted. This property overrides the global setting.")])),_:1}),l(a,null,{title:s(()=>[t[64]||(t[64]=e("strong",{class:"code"},"allDay",-1)),t[65]||(t[65]=e("div",{class:"type"},"[Boolean]",-1)),l(v,{class:"error--bg ml1",round:"",sm:""},{default:s(()=>t[63]||(t[63]=[n("COMING SOON")])),_:1})]),content:s(()=>t[66]||(t[66]=[n("Indicates if the event is an all-day event.")])),_:1}),l(a,null,{title:s(()=>t[67]||(t[67]=[e("strong",{class:"code"},"background",-1),e("div",{class:"type"},"[Boolean]",-1)])),content:s(()=>t[68]||(t[68]=[n("Indicates if the event is a background event (allows no user interaction).")])),_:1}),l(a,null,{title:s(()=>t[69]||(t[69]=[e("strong",{class:"code"},"schedule",-1),e("div",{class:"type"},"[Number]",-1)])),content:s(()=>t[70]||(t[70]=[n("The schedule ID the event belongs to, when multiple schedules are defined through the "),e("code",null,"schedules",-1),n(" prop. Ignored if no schedules are defined.")])),_:1}),l(a,null,{title:s(()=>[t[72]||(t[72]=e("strong",{class:"code"},"recurring",-1)),t[73]||(t[73]=e("div",{class:"type"},"[Number]",-1)),l(v,{class:"error--bg ml1",round:"",sm:""},{default:s(()=>t[71]||(t[71]=[n("COMING SOON")])),_:1})]),content:s(()=>t[74]||(t[74]=[n("Indicates if the event is recurring and its recurrence rule.")])),_:1}),l(a,null,{title:s(()=>t[75]||(t[75]=[e("strong",{class:"code"},"class",-1),e("div",{class:"type"},"[String]",-1)])),content:s(()=>t[76]||(t[76]=[n("The CSS class of the event.")])),_:1}),l(a,null,{title:s(()=>t[77]||(t[77]=[e("strong",{class:"code"},"_",-1),e("div",{class:"type"},"[Object]",-1)])),content:s(()=>[t[79]||(t[79]=e("p",null,[n("Internal fields that are used by Vue Cal to manage the event. These fields are reserved and should not be modified."),e("br"),n(`
You may still access them for convenience or debugging purposes.`),e("br"),n(`
Example:`)],-1)),l(r,{language:"js",dark:d(i).darkMode},{default:s(()=>t[78]||(t[78]=[n(`_: {
  id, // Number.
  startMinutes, // Number.
  endMinutes, // Number.
  multiday, // Boolean.
  startFormatted, // String.
  startTimeFormatted12, // String.
  startTimeFormatted24, // String.
  endTimeFormatted12, // String.
  endTimeFormatted24, // String.
  duration, // Number.
  deleting, // Boolean.
  deleted // Boolean.
}
`)])),_:1},8,["dark"])]),_:1})]),_:1},8,["modelValue"]),e("h2",z,[l(g,{div:"",anchor:"options"},{default:s(()=>t[80]||(t[80]=[n("Options")])),_:1}),t[82]||(t[82]=e("div",{class:"todo-tag ml2 mra"},"TO REVIEW",-1)),l(m,{class:"my1 body","onUpdate:modelValue":t[6]||(t[6]=o=>x.value=Array(99).fill(o))},{default:s(()=>t[81]||(t[81]=[n("Expand All")])),_:1})]),t[230]||(t[230]=e("p",{class:"caption size--md lh1"},[n("Options can be provided to <vue-cal> using a "),e("code",{class:"base-color"},'v-bind="configObject"'),n(" or added one by one."),e("br"),n(`
In the latter case, both `),e("code",{class:"base-color"},"camelCase"),n(" and "),e("code",{class:"base-color"},"kebab-case"),n(` will work.
`)],-1)),l(f,{class:"mt2",modelValue:x.value,"onUpdate:modelValue":t[7]||(t[7]=o=>x.value=o),"expand-icon-rotate90":"","title-class":"pl0 bd0","content-class":"pt1 pr0 pb6 pl7"},{default:s(()=>[l(a,null,{title:s(()=>t[83]||(t[83]=[e("strong",{class:"code"},"clickToNavigate",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[84]||(t[84]=[e("p",null,[n("When set to "),e("span",{class:"code"},"true"),n(` a single click (or tap for touch devices) will take you to a
narrower view if available.`),e("br"),n(`
You can always go back to a broader view by clicking the view title or selecting another view
from the view selector if enabled.`),e("br"),n(`
The navigation to narrower view can be disabled by setting `),e("span",{class:"code"},"clickToNavigate"),n(`
to false.`)],-1),e("p",null,"Setting to false will force it off on date-picker where it is on by default.",-1)])),_:1}),l(a,null,{title:s(()=>t[85]||(t[85]=[e("strong",{class:"code"},"dark",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[86]||(t[86]=[e("p",null,"Dark theme.",-1)])),_:1}),l(a,null,{title:s(()=>t[87]||(t[87]=[e("strong",{class:"code"},"datePicker",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[88]||(t[88]=[e("p",null,[n(`Sets the date picker format CSS-wise and logic as well.
This option acts like a shorthand for:
`),e("code",null,"{ xs: true, views: ['month', 'year', 'years'], clickToNavigate: true }"),n(`.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[89]||(t[89]=[e("strong",{class:"code"},"events",-1),e("div",{class:"type"},"[Array]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"() => []",-1)])),content:s(()=>[t[102]||(t[102]=e("p",null,[n("Allows you to place events in the calendar."),e("br"),n(`
Accepts an array of event objects.`),e("br"),n(`
This is what an event object must look like:`)],-1)),e("div",null,[l(r,{class:"mt2",language:"js",dark:d(i).darkMode},{default:s(()=>t[90]||(t[90]=[n(`{
  start: '2018-11-19 12:00', // Required.
  end: '2018-11-19 14:00', // Required.
  // Instead of formatted dates, you can also provide JavaScript Date objects:
  // start: new Date(2018, 11 - 1, 19, 12, 0),
  // end: new Date(2018, 11 - 1, 19, 14, 0),
  title: {String}, // Optional.
  content: {String}, // Optional.
  class: {String}, // Optional - space-separated css classes.
  background: {Boolean} // Optional. (Event type not CSS property)
  schedule: {Number|String} // Optional.
  allDay: {Boolean} // Optional.
  deletable: false // optional - force undeletable when events are editable.
  resizable: false // optional - force unresizable when events are editable.
}`)])),_:1},8,["dark"]),t[91]||(t[91]=e("ul",null,[e("li",null,[n("If no "),e("span",{class:"code"},"title"),n(" is provided, no title will be displayed.")]),e("li",null,[e("span",{class:"code"},"content"),n(` accepts free HTML, for instance:
'<i class="icon mdi mdi-hospital-box-outline"></i>'.`),e("br"),n(`
If no `),e("span",{class:"code"},"content"),n(" is provided, no content will be displayed.")]),e("li",null,[n("You may need an event CSS "),e("span",{class:"code"},"class"),n(` to handle different event types
for instance. With different classes you can apply different styles to the events.`),e("br"),n(`
E.g. backgrounds, images, borders, etc.`)]),e("li",null,[n("The "),e("span",{class:"code"},"background"),n(` attribute sets an event as a background event,
which allows overlapping and disable the ability to drag & resize.`)]),e("li",null,[n("When using "),e("span",{class:"code"},"schedules"),n(", the "),e("span",{class:"code"},"schedule"),n(` attribute accepts a number,
starting from 1, corresponding to the schedule you want the event to appear in.`),e("br"),n(`
Optionally, if you have set the `),e("span",{class:"code"},"id"),n(" property in "),e("span",{class:"code"},"schedules"),n(`,
you have to use the same `),e("span",{class:"code"},"id"),n(" here (Integer or String).")]),e("li",null,[n("When the "),e("span",{class:"code"},"showAllDayEvents"),n(" and "),e("span",{class:"code"},"time"),n(` options are set to
`),e("span",{class:"code"},"true"),n(", all the events with an attribute "),e("span",{class:"code"},"allDay"),n(` set to
`),e("span",{class:"code"},"true"),n(` will show up in a fixed bar (week & day views).
`)])],-1))]),l(y,{warning:""},{default:s(()=>[t[101]||(t[101]=e("strong",null,"Important notes",-1)),e("ul",null,[t[99]||(t[99]=e("li",null,[n("The events are internally identified by the key "),e("span",{class:"code"},"`_eid`"),n(`.
`),e("strong",null,"This is a reserved keyword.")],-1)),e("li",Y,[t[92]||(t[92]=n("Correct date formats are ")),e("code",null,p(new Date().format())+" "+p(new Date().formatTime()),1),t[93]||(t[93]=n(`,
or `)),e("code",null,p(new Date().format()),1),t[94]||(t[94]=n(` if you don't want any time in the whole calendar,
or a JavaScript `)),t[95]||(t[95]=e("code",null,"Date",-1)),t[96]||(t[96]=n(" object. Only these formats will work.")),t[97]||(t[97]=e("br",null,null,-1)),t[98]||(t[98]=e("strong",null,[n("You can't mix events with time and events without, and you can only remove time if the "),e("span",{class:"code"},"time"),n(`
option is set to `),e("span",{class:"code"},"false"),n(".")],-1))]),t[100]||(t[100]=e("li",{class:"mt2"},[n("You can set an event end at "),e("span",{class:"code"},"24:00"),n(" or "),e("span",{class:"code"},"00:00"),n(` (for the next midnight),
`),e("strong",null,[n("but internally the date will be set at "),e("span",{class:"code"},"23:59:59")]),n(` so the date stays the same instead
of natural behavior of taking the next day at `),e("span",{class:"code"},"00:00:00"),n("."),e("br"),n(`
When returned from emitted events, this event `),e("span",{class:"code"},"end"),n(" will contain a date ending at "),e("span",{class:"code"},"23:59:59"),n(`.
`)],-1))])]),_:1})]),_:1}),l(a,null,{title:s(()=>t[103]||(t[103]=[e("strong",{class:"code"},"eventsOnMonthView",-1),e("div",{class:"type"},"[Boolean, String]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[104]||(t[104]=[e("p",null,[n("When set to "),e("span",{class:"code"},"true"),n(`, the events will also be displayed on month view
(excluding events of out-of-scope days).`),e("br"),n(`
When set to the string '`),e("span",{class:"code"},"short"),n(`', only the events titles will be displayed.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[105]||(t[105]=[e("strong",{class:"code"},"hideWeekdays",-1),e("div",{class:"type"},"[Array]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"() => []",-1)])),content:s(()=>t[106]||(t[106]=[e("p",null,"Accepts an array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.",-1),e("p",null,"Hide specific weekdays in month, week and days views.",-1)])),_:1}),l(a,null,{title:s(()=>t[107]||(t[107]=[e("strong",{class:"code"},"hideWeekends",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[108]||(t[108]=[e("p",null,"Show or hide both Saturday and Sunday in days, week and month views.",-1)])),_:1}),l(a,null,{title:s(()=>t[109]||(t[109]=[e("strong",{class:"code"},"locale",-1),e("div",{class:"type"},"[String]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:s(()=>[t[121]||(t[121]=e("p",null,"A language to use for all the texts.",-1)),t[122]||(t[122]=e("p",null,[n("Allow translation of the calendar texts in a given language."),e("br"),n(`
Use a 2 letter locale code
(`),e("a",{href:"https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes",target:"_blank"},"ISO 639-1"),n(`)
unless a distinction is needed. E.g. `),e("span",{class:"code"},"'pt-br'"),n(" for Portuguese-Brasilian.")],-1)),l(y,{info:""},{default:s(()=>[n("Currently available languages are "+p(d(T).map(o=>o.label).join(", "))+".",1),t[111]||(t[111]=e("br",null,null,-1)),t[112]||(t[112]=n(`
If you are interested in providing a language support please do a pull request with a json file
into the i18n directory.`)),t[113]||(t[113]=e("br",null,null,-1)),t[114]||(t[114]=n(`
this is what a language json looks like.`)),l(r,{class:"my2",language:"json",dark:d(i).darkMode},{default:s(()=>t[110]||(t[110]=[n(`{
  "weekDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  "years": "Years",
  "year": "Year",
  "month": "Month",
  "week": "Week",
  "day": "Day",
  "today": "Today",
  "noEvent": "No Event",
  "allDay": "All day",
  "deleteEvent": "Delete",
  "createEvent": "Create an event",
  "dateFormat": "dddd D MMMM YYYY"
}`)])),_:1},8,["dark"]),t[115]||(t[115]=e("p",null,[n("Regarding the "),e("span",{class:"code"},"dateFormat"),n(` translation, this is the format of the full
date you can see in a single day view title.`),e("br"),n(),e("span",{class:"code"},"dddd"),n(" stands for the full-letter day of week, "),e("span",{class:"code"},"MMMM"),n(` stands for
full-letter month, `),e("span",{class:"code"},"D"),n(` stands for the date of the month (0-31),
`),e("span",{class:"code"},"YYYY"),n(" stands for full year, "),e("span",{class:"code"},"{S}"),n(` stands for st/nd/rd/th and only in English.
`)],-1))]),_:1}),l(y,{tip:""},{default:s(()=>[t[117]||(t[117]=n(`Note that 2 media queries will shorten the days of the week to 3 letters then 1 letter when it does not fit.
`)),t[118]||(t[118]=e("br",null,null,-1)),t[119]||(t[119]=n(`You can read more about it in the # Responsiveness & Media Queries section in the
`)),l(D,{to:"/getting-started#css-notes"},{default:s(()=>t[116]||(t[116]=[n("CSS Notes")])),_:1}),t[120]||(t[120]=n(`.
`))]),_:1})]),_:1}),l(a,null,{title:s(()=>t[123]||(t[123]=[e("strong",{class:"code"},"maxDate",-1),e("div",{class:"type"},"[String, Date]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:s(()=>t[124]||(t[124]=[e("p",null,[n("Accepts a formatted string or plain JavaScript Date object."),e("br"),n(`
Set a maximum date for the cells to be selectable.`),e("br"),n(`
By default the cell will be grayed out when out of range but CSS classes let you
customize this.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[125]||(t[125]=[e("strong",{class:"code"},"minDate",-1),e("div",{class:"type"},"[String, Date]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:s(()=>t[126]||(t[126]=[e("p",null,[n("Accepts a formatted string or plain JavaScript Date object."),e("br"),n(`
Set a minimum date for the cells to be selectable.`),e("br"),n(`
By default the cell will be grayed out when out of range but CSS classes let you customize this.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[127]||(t[127]=[e("strong",{class:"code"},"selectedDate",-1),e("div",{class:"type"},"[String, Date]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:s(()=>[e("p",null,[t[128]||(t[128]=n("Accepts a JavaScript Date or a formatted string like ")),e("code",null,p(new Date().format())+" "+p(new Date().formatTime()),1),t[129]||(t[129]=n(".")),t[130]||(t[130]=e("br",null,null,-1)),t[131]||(t[131]=n(`
Preselects a date and navigates to it on calendar load or whenever it changes.`)),t[132]||(t[132]=e("br",null,null,-1)),t[133]||(t[133]=n(`
The selected date is a two-way binding: you can use it in a v-model to keep your variable
up to date.
`))])]),_:1}),l(a,null,{title:s(()=>t[134]||(t[134]=[e("strong",{class:"code"},"sm",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>[e("p",null,[t[136]||(t[136]=n(`Small size (truncates texts + specific styles).
When set to `)),t[137]||(t[137]=e("span",{class:"code"},"true",-1)),t[138]||(t[138]=n(", the days of the week headings will be truncated to 3 letters.")),t[139]||(t[139]=e("br",null,null,-1)),t[140]||(t[140]=n(`
Does not apply to the title of the day view.`)),t[141]||(t[141]=e("br",null,null,-1)),t[142]||(t[142]=n(`
2 media queries are truncating the days of the week below 450px,
read on in the `)),l(D,{to:"/getting-started#css-notes"},{default:s(()=>t[135]||(t[135]=[n("CSS Notes")])),_:1}),t[143]||(t[143]=n(`.
`))])]),_:1}),l(a,null,{title:s(()=>t[144]||(t[144]=[e("strong",{class:"code"},"specialHours",-1),e("div",{class:"type"},"[Object]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"() => ({})",-1)])),content:s(()=>[t[150]||(t[150]=e("p",null,"Highlight a particular time range on each day of the week, individually.",-1)),t[151]||(t[151]=e("p",null,[n("Allows an individual highlighted time range for each day of the week."),e("br"),n(`
For instance, it could represent the business hours.`),e("br"),n(`
The object must contain days definitions indexed by a 3-letter day ID in English, `),e("strong",null,[n("from "),e("code",null,"mon"),n(" to "),e("code",null,"sun")]),n(`, of the
days you want to highlight.`),e("br"),n(`
Each day must contain an object with a `),e("span",{class:"code"},"from"),n(" and "),e("span",{class:"code"},"to"),n(` properties
defining the beginning and the end of the time range `),e("strong",null,"in minutes"),n("."),e("br"),n(`
In addition, you can set a CSS class for each day of the week.`),e("br"),n(`
It is also possible to provide an array of special hours for the same day.`),e("br"),n(`
A `),e("span",{class:"code"},"label"),n(" can also be provided per special hour block, and styled via CSS."),e("br"),e("br")],-1)),t[152]||(t[152]=e("p",{class:"subtitle-1"},[n("Example for Wednesday: "),e("span",{class:"code"},':special-hours="specialHours"')],-1)),e("p",null,[t[147]||(t[147]=e("span",{class:"ml3"},"With a single range of special hours:",-1)),l(r,{class:"mt1 ml3",language:"js",dark:d(i).darkMode},{default:s(()=>t[145]||(t[145]=[n(`// In the component's data.
specialHours: {
  wed: { from: 8 * 60, to: 20 * 60, class: 'open' }
}`)])),_:1},8,["dark"]),t[148]||(t[148]=e("br",null,null,-1)),t[149]||(t[149]=e("span",{class:"ml3"},"With multiple ranges of special hours:",-1)),l(r,{class:"mt1 ml3",language:"js",dark:d(i).darkMode},{default:s(()=>t[146]||(t[146]=[n(`// In the component's data.
specialHours: {
  wed: [
    { from: 8 * 60, to: 12 * 60, class: 'open' },
    { from: 14 * 60, to: 20 * 60, class: 'open' }
  ]
}
`)])),_:1},8,["dark"])])]),_:1}),l(a,null,{title:s(()=>t[153]||(t[153]=[e("strong",{class:"code"},"schedules",-1),e("div",{class:"type"},"[Array]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"() => []",-1)])),content:s(()=>[t[155]||(t[155]=e("p",null,[n("Split a day and its events in different persons/rooms/locations schedules."),e("br"),n(`
Each calendar event is exclusively owned and displayed in one of them.
Accepts an array of objects defined like follows, where all attributes are optional:`),e("br")],-1)),l(r,{language:"js",dark:d(i).darkMode},{default:s(()=>t[154]||(t[154]=[n(`{
  id: {Integer | String}, // All ids must be set if using \`hide\`.
  class: {String},
  label: {String},
  hide: {Boolean} // You can toggle the column on and of with this.
}
`)])),_:1},8,["dark"])]),_:1}),l(a,null,{title:s(()=>t[156]||(t[156]=[e("strong",{class:"code"},"startWeekOnSunday",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[157]||(t[157]=[e("p",null,"Shows Sunday before Monday in days, week and month views. By default the week starts on Monday.",-1)])),_:1}),l(a,null,{title:s(()=>t[158]||(t[158]=[e("strong",{class:"code"},"theme",-1),e("div",{class:"type"},"[String, Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"'default'",-1)])),content:s(()=>t[159]||(t[159]=[e("p",null,"Only adds a CSS class when set to default.",-1)])),_:1}),l(a,null,{title:s(()=>t[160]||(t[160]=[e("strong",{class:"code"},"time",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"true",-1)])),content:s(()=>t[161]||(t[161]=[e("p",null,[n("Whether you want to display the timeline and handle events with time or only date."),e("br"),n(`
Note that time is made of `),e("span",{class:"code"},"hours:minutes"),n(),e("strong",{class:"ml2"},"and no second"),n(`.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[162]||(t[162]=[e("strong",{class:"code"},"timeCellHeight",-1),e("div",{class:"type"},"[Number]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"40",-1)])),content:s(()=>t[163]||(t[163]=[e("p",null,"In pixels.",-1)])),_:1}),l(a,null,{title:s(()=>t[164]||(t[164]=[e("strong",{class:"code"},"timeFormat",-1),e("div",{class:"type"},"[String]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:s(()=>t[165]||(t[165]=[e("p",{class:"mb2"},[n("When defined, overrides the default time format in time cells and events."),e("br"),n(`
Formatted time can contain any character but the following characters will be replaced:`)],-1),e("ul",{class:"ml3"},[e("li",null,[e("strong",{class:"code"},"H"),n(": Hours no leading zero, 24-hour format")]),e("li",null,[e("strong",{class:"code"},"HH"),n(": Hours with leading zero, 24-hour format")]),e("li",null,[e("strong",{class:"code"},"h"),n(": Hours no leading zero, 12-hour format")]),e("li",null,[e("strong",{class:"code"},"hh"),n(": Hours with leading zero, 12-hour format")]),e("li",null,[e("strong",{class:"code"},"m"),n(": Minutes no leading zero")]),e("li",null,[e("strong",{class:"code"},"mm"),n(": Minutes with leading zero")]),e("li",null,[e("strong",{class:"code"},"{am}"),n(": am or pm")]),e("li",null,[n("The characters `"),e("strong",{class:"code"},"{"),n("` and `"),e("strong",{class:"code"},"}"),n("` are removed and used only to\ndelimit keywords when there is no space."),e("br"),n(`
E.g. `),e("span",{class:"code"},'"h:mm{am}"'),n(`.
`)])],-1)])),_:1}),l(a,null,{title:s(()=>t[166]||(t[166]=[e("strong",{class:"code"},"timeFrom",-1),e("div",{class:"type"},"[Number]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"0",-1)])),content:s(()=>t[167]||(t[167]=[e("p",null,`Start time (in minutes) displayed in the timeline for each day in the schedule
view. By default it starts at midnight.
`,-1)])),_:1}),l(a,null,{title:s(()=>t[168]||(t[168]=[e("strong",{class:"code"},"timeStep",-1),e("div",{class:"type"},"[Number]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"60",-1)])),content:s(()=>t[169]||(t[169]=[e("p",null,`Granularity of the time intervals (in minutes) displayed in the timeline for each day in the
schedule view.
`,-1)])),_:1}),l(a,null,{title:s(()=>t[170]||(t[170]=[e("strong",{class:"code"},"timeTo",-1),e("div",{class:"type"},"[Number]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"24 * 60",-1)])),content:s(()=>t[171]||(t[171]=[e("p",null,`Final time (in minutes) displayed in the timeline for each day in the schedule
view. By default it ends at midnight.
`,-1)])),_:1}),l(a,null,{title:s(()=>t[172]||(t[172]=[e("strong",{class:"code"},"titleBar",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"true",-1)])),content:s(()=>t[173]||(t[173]=[e("p",null,"Show or hide the header title bar.",-1)])),_:1}),l(a,null,{title:s(()=>t[174]||(t[174]=[e("strong",{class:"code"},"todayButton",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"true",-1)])),content:s(()=>t[175]||(t[175]=[e("p",null,"Show or hide the header today button that allows to quickly navigate to Today's date.",-1)])),_:1}),l(a,null,{title:s(()=>t[176]||(t[176]=[e("strong",{class:"code"},"transitions",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"true",-1)])),content:s(()=>t[177]||(t[177]=[e("p",null,"Enables/disables the navigation CSS transitions between all the views and view states.",-1)])),_:1}),l(a,null,{title:s(()=>t[178]||(t[178]=[e("strong",{class:"code"},"twelveHour",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[179]||(t[179]=[e("p",null,[n("12-hour or 24-hour formats are respectively written like 7am and 07:00 or like 1pm and 13:00."),e("br"),n(`
The default time format is 24-hour.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[180]||(t[180]=[e("strong",{class:"code"},"view",-1),e("div",{class:"type"},"[String]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"'week'",-1)])),content:s(()=>t[181]||(t[181]=[e("p",null,[n("Sets a default active view, for the first time you load the calendar."),e("br"),n(`
Then control the active view from outside of Vue Cal.`),e("br"),n(`
Accepts one of 'years', 'year', 'month', 'week', 'days', 'day'.`),e("br"),n(`
The active view has a two-way binding: you can use a v-model to keep your variable up to date.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[182]||(t[182]=[e("strong",{class:"code"},"viewDate",-1),e("div",{class:"type"},"[String, Date]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:s(()=>t[183]||(t[183]=[e("p",null,"The view will automatically set its start and end to present this date.",-1)])),_:1}),l(a,null,{title:s(()=>t[184]||(t[184]=[e("strong",{class:"code"},"viewDayOffset",-1),e("div",{class:"type"},"[Number]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"0",-1)])),content:s(()=>t[185]||(t[185]=[e("p",null,null,-1)])),_:1}),l(a,null,{title:s(()=>t[186]||(t[186]=[e("strong",{class:"code"},"views",-1),e("div",{class:"type"},"[Array, Object]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"['day', 'days', 'week', 'month', 'year', 'years']",-1)])),content:s(()=>[t[188]||(t[188]=e("p",null,[n("Accepts an array of strings among these values: 'day', 'days', 'week', 'month', 'year', 'years'."),e("br"),n(`
It will dictate which view is available and can be navigated to.
You can also provide an object with the same keys ('day', 'days', 'week', 'month', 'year', 'years')
if you want to override its default grid layout.
For instance, this is the defaults:`)],-1)),l(r,{language:"js",dark:d(i).darkMode},{default:s(()=>t[187]||(t[187]=[n(`availableViews: {
  day: { cols: 1, rows: 1 },
  days: { cols: 10, rows: 1 },
  week: { cols: 7, rows: 1 },
  month: { cols: 7, rows: 6 },
  year: { cols: 4, rows: 3 },
  years: { cols: 5, rows: 5 } // Arbitrary range of quarters of century (25y).
}
`)])),_:1},8,["dark"])]),_:1}),l(a,null,{title:s(()=>t[189]||(t[189]=[e("strong",{class:"code"},"viewsBar",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"true",-1)])),content:s(()=>t[190]||(t[190]=[e("p",null,"Show or hide the headers view selection bar.",-1)])),_:1}),l(a,null,{title:s(()=>t[191]||(t[191]=[e("strong",{class:"code"},"watchRealTime",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[192]||(t[192]=[e("p",null,[n("More expensive, so only trigger on demand."),e("br"),n(`
When set to `),e("span",{class:"code"},"true"),n(", the current time line in today's cell, on "),e("span",{class:"code"},"week"),n(` and
`),e("span",{class:"code"},"day"),n(" views, will stay in sync with real time."),e("br"),n(),e("span",{class:"grey"},[n("(This requires a "),e("span",{class:"code"},"setTimeout"),n(" every minute)")])],-1)])),_:1}),l(a,null,{title:s(()=>t[193]||(t[193]=[e("strong",{class:"code"},"xs",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[194]||(t[194]=[e("p",null,[n("Extra small size for date pickers (truncates texts + specific styles)."),e("br"),n(`
When set to `),e("span",{class:"code"},"true"),n(", the days of the week headings will be truncated to 1 letter."),e("br"),n(`
Does not apply to the title of the day view.`),e("br"),n(`
In Addition, the whole calendar gets applied a smaller font size
and the current view title size is also reduced.










`)],-1)])),_:1}),l(a,null,{title:s(()=>t[195]||(t[195]=[e("strong",{class:"code"},"disableDays",-1),e("div",{class:"type"},"[Array]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"() => []",-1)])),content:s(()=>t[196]||(t[196]=[e("p",null,[n("Accepts an array of formatted dates (e.g. "),e("span",{class:"code"},"2024-09-18"),n(") of days to disable.")],-1)])),_:1}),l(a,null,{title:s(()=>t[197]||(t[197]=[e("strong",{class:"code"},"eventCreateMinDrag",-1),e("div",{class:"type"},"[Number]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"15",-1)])),content:s(()=>t[198]||(t[198]=[e("p",null,[n("When events are editable and "),e("span",{class:"code"},"time"),n(" and "),e("span",{class:"code"},"editableEvents.create"),n(` are set to
`),e("span",{class:"code"},"true"),n(", this option controls the minimum dragging distance before an event is created."),e("br"),n(`
This option might be useful when you can navigate with cell click to prevent unwanted event creation in
case of slipping cursor while clicking.`),e("br"),n(`
With option gets to a positive integer, and you can set it to `),e("span",{class:"code"},"0"),n(` to disable it.
Refer to the `),e("a",{href:"#ex--create-events"},"Create events"),n(` example.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[199]||(t[199]=[e("strong",{class:"code"},"editableEvents",-1),e("div",{class:"type"},"[Boolean, Object]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>[t[207]||(t[207]=e("p",null,[n("When set to "),e("span",{class:"code"},"true"),n(", it allows:")],-1)),e("ul",null,[t[203]||(t[203]=e("li",null,"Dragging and dropping events.",-1)),t[204]||(t[204]=e("li",null,[n("Resizing events by dragging the handle showing at the bottom of each event if "),e("span",{class:"code"},"time"),n(" is set to "),e("span",{class:"code"},"true")],-1)),t[205]||(t[205]=e("li",null,"Deleting events by click and hold an event.",-1)),e("li",null,[t[201]||(t[201]=n("Creating events by click and drag (refer to the ")),l(D,{to:"/examples/calendar-events--interactions#ex--create-events"},{default:s(()=>t[200]||(t[200]=[n("Create events")])),_:1}),t[202]||(t[202]=n(" example)."))])]),l(y,null,{default:s(()=>t[206]||(t[206]=[e("ul",null,[e("li",null,[n("You can set more accurately which edition you want to allow by passing an object."),e("br"),n(`
For instance, this object will allow all the above editions except the drag & drop:`),e("div",{class:"code base-color"},"{ drag: false, resize: true, delete: true, create: true }")]),e("li",null,[n("You can still force an event to be undeletable or unresizable from the "),e("span",{class:"code"},"deletable"),n(" & "),e("span",{class:"code"},"resizable"),n(` event attributes.
`)])],-1)])),_:1})]),_:1}),l(a,null,{title:s(()=>t[208]||(t[208]=[e("strong",{class:"code"},"onEventCreate",-1),e("div",{class:"type"},"[Function, null]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"null",-1)])),content:s(()=>t[209]||(t[209]=[e("p",null,[n("A callback function to execute when an event is created."),e("br"),n(`
This function receives 2 parameters: `),e("span",{class:"code"},"event"),n(`, the created event,
and `),e("span",{class:"code"},"deleteEvent"),n(", a function to delete the created event."),e("br"),n(`
You can modify and override the received `),e("span",{class:"code"},"event"),n(" and return it to vue-cal."),e("br"),n(`
If this function returns `),e("span",{class:"code"},"false"),n(`, the event creation will be cancelled.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[210]||(t[210]=[e("strong",{class:"code"},"showWeekNumbers",-1),e("div",{class:"type"},"[Boolean, String]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>[t[212]||(t[212]=e("p",null,[n("When set to "),e("span",{class:"code"},"true"),n(`, the weeks numbers will show in the first column on the
`),e("span",{class:"code"},"month"),n(" view (only)."),e("br"),n(`
You can also provide a custom renderer to the weeks numbers cells through the
`),e("span",{class:"code"},"week-number-cell"),n(" slot.")],-1)),l(y,null,{default:s(()=>t[211]||(t[211]=[e("a",{id:"there-can-be-53-weeks-in-a-year"},null,-1),e("strong",null,[n("Did you know there can be 53 weeks in the year?"),e("br")],-1),n(`This happens every time the year starts a Thursday, or starts a Wednesday of a leap year.
In this case the week number will be 53 instead of 1.`)])),_:1})]),_:1}),l(a,null,{title:s(()=>t[213]||(t[213]=[e("strong",{class:"code"},"snapToInterval",-1),e("div",{class:"type"},"[Number]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"0",-1)])),content:s(()=>t[214]||(t[214]=[e("p",null,[n("Accepts a number of minutes from 0 to 60 to snap a dropped event or an event end time while resizing."),e("br"),n(`
For instance, with a `),e("span",{class:"code"},"snapToInterval"),n(` of 15 min, an event dropped at a start of 10:05,
will snap to 10:00, and dropped at 10:11 will snap to 10:15.`),e("br"),n(`
This option affects event resizing, event drag & dropping, and event drag-creation.







`)],-1)])),_:1}),l(a,null,{title:s(()=>t[215]||(t[215]=[e("strong",{class:"code"},"eventsCount",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[216]||(t[216]=[e("p",null,[n("When set to "),e("code",null,"true"),n(", the events will be counted on "),e("code",null,"month"),n(", "),e("code",null,"year"),n(` &
`),e("code",null,"years"),n(" views and a number will appear in each cell that contain one or more events."),e("br"),n(`
You can customize the events count via CSS or via the `),e("code",null,"#events-count"),n(` slot.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[217]||(t[217]=[e("strong",{class:"code"},"minEventWidth",-1),e("div",{class:"type"},"[Number]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"0",-1)])),content:s(()=>t[218]||(t[218]=[e("p",null,[n("When a number is set, in percent, each event within a cell will have a minimum width."),e("br"),n(`
If the provided percentage is bigger than what it would naturally be, the events will partially overlap.

`)],-1)])),_:1}),l(a,null,{title:s(()=>t[219]||(t[219]=[e("strong",{class:"code"},"overlapsPerTimeStep",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[220]||(t[220]=[e("p",null,[n("When set to "),e("span",{class:"code"},"true"),n(`, each event of the same cell will have a width of
`),e("span",{class:"code"},"100% / [number of simultaneous events"),n("] only if these events are within the same time step."),e("br"),n(`
Refer to `),e("a",{href:"https://github.com/antoniandre/vue-cal/pull/182",target:"_blank"},"this use case"),n(`.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[221]||(t[221]=[e("strong",{class:"code"},"resizeX",-1),e("div",{class:"type"},"[Boolean]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[222]||(t[222]=[e("p",null,[n("When set to "),e("span",{class:"code"},"true"),n(", allows resizing an event across multiple days."),e("br"),n(`
Resizing on the X axis is only available on `),e("span",{class:"code"},"week"),n(` view.
`)],-1)])),_:1}),l(a,null,{title:s(()=>t[223]||(t[223]=[e("strong",{class:"code"},"showAllDayEvents",-1),e("div",{class:"type"},"[Boolean, String]",-1),n(","),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:s(()=>t[224]||(t[224]=[e("ul",null,[e("li",{class:"mb2"},[n("When the "),e("span",{class:"code"},"showAllDayEvents"),n(" is set to "),e("span",{class:"code"},"true"),n(` the events with an
`),e("span",{class:"code"},"allDay"),n(" attribute set to "),e("span",{class:"code"},"true"),n(` will be displayed in a fixed top
bar on the `),e("span",{class:"code"},"week"),n(" & "),e("span",{class:"code"},"day"),n(" views."),e("br"),n(`
The all day events bar will only show up if the options `),e("span",{class:"code"},"showAllDayEvents"),n(` &
`),e("span",{class:"code"},"time"),n(" are set to "),e("span",{class:"code"},"true"),n("."),e("br"),n(),e("span",{class:"code"},"time"),n(` is important since without time information every event is an all-day
event there is no point in separating them then.`)]),e("li",{class:"mb2"},[n("When "),e("span",{class:"code"},"showAllDayEvents"),n(" is set to "),e("span",{class:"code"},"false"),n(`, all the all day events
(`),e("span",{class:"code"},"allDay"),n(" attribute set to "),e("span",{class:"code"},"true"),n(`), will show up as a normal
background event.`)]),e("li",{class:"mb2"},[n("On month view, switching "),e("span",{class:"code"},"showAllDayEvents"),n(` on and off will not have any impact
since both should display the all day events.`)]),e("li",{class:"mb2"},[e("span",{class:"code"},"showAllDayEvents"),n(" accepts a "),e("span",{class:"code"},"Boolean"),n(` or the string
`),e("span",{class:"code"},"'short'"),n(`, to display only the event title.
`)])],-1)])),_:1})]),_:1},8,["modelValue"]),t[231]||(t[231]=e("div",{class:"todo-tag d-iflex mt6"},"ADD SLOTS & EMITTED EVENTS?",-1))],64)}}};export{q as default};
