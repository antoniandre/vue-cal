import{u as M,r as y,b as A,e,f as s,w as n,h as l,a as p,t as r,g as a,l as E,F as C,d as I}from"./index-3XXseF32.js";import{b as z}from"./index-BCYqmXg2.js";const O={class:"w-flex justify-space-between mb2"},V={class:"code"},F={class:"w-flex justify-space-between mb2"},B={class:"w-flex justify-space-between mb2"},N={class:"w-flex justify-space-between mb2"},R={class:"code"},W={class:"mt2"},Y={class:"w-flex justify-space-between mb2"},U={class:"w-flex justify-space-between mb2"},Z={__name:"api",setup(J){z();const i=M(),S=E("locales"),b=[{label:"day",content:"Displays a given single day in a a single cell."},{label:"days",content:"Displays a given custom unlimited range of days, from 1 to x. Be aware that the more days displayed, the heavier work for the calendar and consumed API."},{label:"week",content:"Displays a given 7-day week in 7 cells by default and at most, starting from Monday by default.<br>Other options can modify the order or number of days."},{label:"month",content:"Displays a given month in a 6x7 cell grid by default and at most."},{label:"year",content:"Displays a given year's months in a 4x3 cell grid. Usually for a date picker.<br>No event can be displayed on this view by default - only events counter - but you could use slots to build a custom UI."},{label:"years",content:"Displays a range of 25 years in a 5x5 cell grid. Usually for date pickers."}],c=y([...b].fill(!1)),w=y(Array(10).fill(!1)),k=y(Array(15).fill(!1)),T=y(Array(99).fill(!1)),D=y(Array(50).fill(!1)),x=y(Array(50).fill(!1));return(H,t)=>{const v=p("title-link"),g=p("w-switch"),m=p("w-accordion"),d=p("ssh-pre"),o=p("w-accordion-item"),j=p("w-tag"),h=p("router-link"),f=p("alert");return I(),A(C,null,[t[394]||(t[394]=e("h1",{class:"title1"},"API",-1)),e("h2",O,[s(v,{div:"",anchor:"views"},{default:n(()=>t[12]||(t[12]=[l("Calendar Views",-1)])),_:1,__:[12]}),s(g,{class:"my1 body","onUpdate:modelValue":t[0]||(t[0]=u=>c.value=[...b].fill(u))},{default:n(()=>t[13]||(t[13]=[l("Expand All",-1)])),_:1,__:[13]})]),s(m,{modelValue:c.value,"onUpdate:modelValue":t[1]||(t[1]=u=>c.value=u),items:b,"expand-icon-rotate90":"","title-class":"pl0 bd0","content-class":"pt0 pb3"},{"item-title":n(({item:u})=>[e("strong",V,r(u.label),1)]),_:1},8,["modelValue"]),e("h2",F,[s(v,{div:"",anchor:"view"},{default:n(()=>t[14]||(t[14]=[l("The View Object",-1)])),_:1,__:[14]}),t[16]||(t[16]=e("div",{class:"todo-tag ml2 mra"},"TO REVIEW",-1)),s(g,{class:"my1 body","onUpdate:modelValue":t[2]||(t[2]=u=>w.value=Array(10).fill(u))},{default:n(()=>t[15]||(t[15]=[l("Expand All",-1)])),_:1,__:[15]})]),t[395]||(t[395]=e("p",{class:"caption size--md lh1"},[l("You can use the "),e("code",{class:"base-color"},"view"),l(` object to access accurate information about the current view at any time.
This is what it contains:`)],-1)),s(m,{class:"mt3",modelValue:w.value,"onUpdate:modelValue":t[3]||(t[3]=u=>w.value=u),"expand-icon-rotate90":"","title-class":"pl0 bd0","content-class":"pt1 pr0 pb6 pl7"},{default:n(()=>[s(o,null,{title:n(()=>t[17]||(t[17]=[e("h3",{class:"title4 mt0 pt0"},"ID, Title",-1)])),content:n(()=>[t[19]||(t[19]=e("p",null,[l("The ID of the current view, as well as its computed title that you may use in slots."),e("br"),l(`
Example:`)],-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[18]||(t[18]=[l(`{
  id: "month",
  title: "October 2024",
  ...
}
`,-1)])),_:1,__:[18]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[20]||(t[20]=[e("h3",{class:"title4 mt0 pt0"},"Ranges",-1)])),content:n(()=>[t[29]||(t[29]=e("p",null,"In order to be flexible, straightforward and not confusing, two ranges are available:",-1)),e("ul",null,[e("li",null,[t[22]||(t[22]=e("h4",{class:"mt2 mb0"},"Primary Range (Actual visible/active days):",-1)),t[23]||(t[23]=e("p",null,`What most users will need when fetching events from an API. It will ignore out-of-scope days in the month
view and trim the hidden days in the week.
`,-1)),t[24]||(t[24]=e("p",null,"Example:",-1)),s(d,{class:"mt0",language:"js",dark:a(i).darkMode},{default:n(()=>t[21]||(t[21]=[l(`{
  start: "2024-09-30T22:00:00.000Z", // Standard JS Date object.
  end: "2024-10-31T22:59:59.999Z", // Standard JS Date object.
  ...
}`,-1)])),_:1,__:[21]},8,["dark"])]),e("li",null,[t[26]||(t[26]=e("h4",{class:"mt2 mb0"},"Extended full range (including out-of-scope or hidden days):",-1)),t[27]||(t[27]=e("p",null,`It will include out-of-scope days in the month view (e.g., from the previous month or the next
month) and return a full 7-day week range in the week view regardless of the hidden days.
`,-1)),t[28]||(t[28]=e("p",null,"Example:",-1)),s(d,{class:"mt0",language:"js",dark:a(i).darkMode},{default:n(()=>t[25]||(t[25]=[l(`{
  fullRangeStart: "2024-09-29T22:00:00.000Z", // Standard JS Date object.
  fullRangeEnd: "2024-11-10T22:59:59.999Z", // Standard JS Date object.
  ...
}
`,-1)])),_:1,__:[25]},8,["dark"])])])]),_:1}),s(o,null,{title:n(()=>t[30]||(t[30]=[e("h3",{class:"title4 mt0 pt0"},"Cell Dates",-1)])),content:n(()=>[t[32]||(t[32]=e("p",null,[l("A complete list of all the visible cells dates (start and end)."),e("br"),l("Example:")],-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[31]||(t[31]=[l(`{
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
`,-1)])),_:1,__:[31]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[33]||(t[33]=[e("h3",{class:"title4 mt0 pt0"},"Events",-1)])),content:n(()=>[t[35]||(t[35]=e("p",null,[l("All the calendar events that the current view contains."),e("br"),l("Example:")],-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[34]||(t[34]=[l(`{
  events: [],
  ...
}
`,-1)])),_:1,__:[34]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[36]||(t[36]=[e("h3",{class:"title4 mt0 pt0"},"Methods",-1)])),content:n(()=>[t[41]||(t[41]=e("p",null,"Methods that you can use from the Vue Cal instance's view (you can use a template ref).",-1)),e("div",null,[t[38]||(t[38]=l("Example:",-1)),s(d,{class:"d-iblock pr5 py0 ml1 my0",language:"js",dark:a(i).darkMode},{default:n(()=>t[37]||(t[37]=[l("vuecalRef.value.view.next()",-1)])),_:1,__:[37]},8,["dark"]),t[39]||(t[39]=l(".",-1))]),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[40]||(t[40]=[l(`switch, // Switches to a different view given in param (day, days, month, year, years).
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
`,-1)])),_:1,__:[40]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[42]||(t[42]=[e("h3",{class:"title4 mt0 pt0"},"Other Utilities",-1)])),content:n(()=>[t[44]||(t[44]=e("p",null,"Other utilities that you may find useful.",-1)),t[45]||(t[45]=e("p",null,"Example:",-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[43]||(t[43]=[l(`{
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
`,-1)])),_:1,__:[43]},8,["dark"])]),_:1})]),_:1},8,["modelValue"]),e("h2",B,[s(v,{div:"",anchor:"view"},{default:n(()=>t[46]||(t[46]=[l("The Event Object",-1)])),_:1,__:[46]}),s(g,{class:"my1 body","onUpdate:modelValue":t[4]||(t[4]=u=>k.value=Array(15).fill(u))},{default:n(()=>t[47]||(t[47]=[l("Expand All",-1)])),_:1,__:[47]})]),t[396]||(t[396]=e("p",{class:"caption size--md lh1"},`The calendar event object contains all the information about a calendar event and is used to render
it in the calendar.`,-1)),t[397]||(t[397]=e("p",null,[l("Minimum required properties: "),e("span",{class:"code"},"start"),l(" and "),e("span",{class:"code"},"end"),l(".")],-1)),t[398]||(t[398]=e("p",null,"First look at an example of a complete event object and below the list of all the available properties:",-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[48]||(t[48]=[l(`{
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
`,-1)])),_:1,__:[48]},8,["dark"]),s(m,{class:"mt3",modelValue:k.value,"onUpdate:modelValue":t[5]||(t[5]=u=>k.value=u),"expand-icon-rotate90":"","title-class":"pl0 bd0","content-class":"pt1 pr0 pb6 pl7"},{default:n(()=>[s(o,null,{title:n(()=>[t[50]||(t[50]=e("strong",{class:"code title5"},"start",-1)),t[51]||(t[51]=e("div",{class:"type"},"[Date]",-1)),s(j,{class:"error--bg ml1",round:"",sm:""},{default:n(()=>t[49]||(t[49]=[l("REQUIRED",-1)])),_:1,__:[49]})]),content:n(()=>t[52]||(t[52]=[l("The start date and time of the event, given as a JavaScript Date.",-1)])),_:1}),s(o,null,{title:n(()=>[t[54]||(t[54]=e("strong",{class:"code title5"},"end",-1)),t[55]||(t[55]=e("div",{class:"type"},"[Date]",-1)),s(j,{class:"error--bg ml1",round:"",sm:""},{default:n(()=>t[53]||(t[53]=[l("REQUIRED",-1)])),_:1,__:[53]})]),content:n(()=>t[56]||(t[56]=[l("The end date and time of the event, given as a JavaScript Date.",-1)])),_:1}),s(o,null,{title:n(()=>t[57]||(t[57]=[e("strong",{class:"code title5"},"id",-1),e("div",{class:"type"},"[String]",-1)])),content:n(()=>t[58]||(t[58]=[l("The unique identifier of the event. If not provided, it will be internally identified by the key ",-1),e("span",{class:"code"},"_.id",-1),l(".",-1)])),_:1}),s(o,null,{title:n(()=>t[59]||(t[59]=[e("strong",{class:"code title5"},"title",-1),e("div",{class:"type"},"[String]",-1)])),content:n(()=>t[60]||(t[60]=[l("The title of the event. If not provided, no title will be displayed.",-1)])),_:1}),s(o,null,{title:n(()=>t[61]||(t[61]=[e("strong",{class:"code title5"},"draggable",-1),e("div",{class:"type"},"[Boolean]",-1)])),content:n(()=>t[62]||(t[62]=[l("Indicates if this specific event can be dragged and dropped. This property overrides the global setting.",-1)])),_:1}),s(o,null,{title:n(()=>t[63]||(t[63]=[e("strong",{class:"code title5"},"resizable",-1),e("div",{class:"type"},"[Boolean]",-1)])),content:n(()=>t[64]||(t[64]=[l("Indicates if this specific event can be resized. This property overrides the global setting.",-1)])),_:1}),s(o,null,{title:n(()=>t[65]||(t[65]=[e("strong",{class:"code title5"},"deletable",-1),e("div",{class:"type"},"[Boolean]",-1)])),content:n(()=>t[66]||(t[66]=[l("Indicates if this specific event can be deleted. This property overrides the global setting.",-1)])),_:1}),s(o,null,{title:n(()=>t[67]||(t[67]=[e("strong",{class:"code title5"},"allDay",-1),e("div",{class:"type"},"[Boolean]",-1)])),content:n(()=>t[68]||(t[68]=[l("Indicates if the event is an all-day event.",-1)])),_:1}),s(o,null,{title:n(()=>t[69]||(t[69]=[e("strong",{class:"code title5"},"background",-1),e("div",{class:"type"},"[Boolean]",-1)])),content:n(()=>t[70]||(t[70]=[l("Indicates if the event is a background event (allows no user interaction).",-1)])),_:1}),s(o,null,{title:n(()=>t[71]||(t[71]=[e("strong",{class:"code title5"},"schedule",-1),e("div",{class:"type"},"[Number]",-1)])),content:n(()=>t[72]||(t[72]=[l("Must be an integer of less than 10 digits.",-1),e("br",null,null,-1),l("The schedule ID the event belongs to, when multiple schedules are defined through the ",-1),e("code",null,"schedules",-1),l(" prop. Ignored if no schedules are defined.",-1)])),_:1}),s(o,null,{title:n(()=>[t[74]||(t[74]=e("strong",{class:"code title5"},"recurring",-1)),t[75]||(t[75]=e("div",{class:"type"},"[Number]",-1)),s(j,{class:"error--bg ml1",round:"",sm:""},{default:n(()=>t[73]||(t[73]=[l("COMING SOON",-1)])),_:1,__:[73]})]),content:n(()=>t[76]||(t[76]=[l("Indicates if the event is recurring and its recurrence rule.",-1)])),_:1}),s(o,null,{title:n(()=>t[77]||(t[77]=[e("strong",{class:"code title5"},"class",-1),e("div",{class:"type"},"[String]",-1)])),content:n(()=>t[78]||(t[78]=[l("The CSS class of the event.",-1)])),_:1}),s(o,null,{title:n(()=>t[79]||(t[79]=[e("strong",{class:"code title5"},"_",-1),e("div",{class:"type"},"[Object]",-1)])),content:n(()=>[t[81]||(t[81]=e("p",null,[l("Internal fields that are used by Vue Cal to manage the event. These fields are reserved and should not be modified."),e("br"),l(`
You may still access them for convenience or debugging purposes.`),e("br"),l(`
Example:`)],-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[80]||(t[80]=[l(`_: {
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
`,-1)])),_:1,__:[80]},8,["dark"])]),_:1})]),_:1},8,["modelValue"]),e("h2",N,[s(v,{div:"",anchor:"options"},{default:n(()=>t[82]||(t[82]=[l("Options",-1)])),_:1,__:[82]}),t[84]||(t[84]=e("div",{class:"todo-tag ml2 mra"},"TO REVIEW",-1)),s(g,{class:"my1 body","onUpdate:modelValue":t[6]||(t[6]=u=>T.value=Array(99).fill(u))},{default:n(()=>t[83]||(t[83]=[l("Expand All",-1)])),_:1,__:[83]})]),t[399]||(t[399]=e("p",{class:"caption size--md lh1"},[l("Options can be provided to <vue-cal> using a "),e("code",{class:"base-color"},'v-bind="configObject"'),l(" or added one by one."),e("br"),l(`
In the latter case, both `),e("code",{class:"base-color"},"camelCase"),l(" and "),e("code",{class:"base-color"},"kebab-case"),l(` will work.
`)],-1)),s(m,{class:"mt2",modelValue:T.value,"onUpdate:modelValue":t[7]||(t[7]=u=>T.value=u),"expand-icon-rotate90":"","title-class":"pl0 bd0","content-class":"pt1 pr0 pb6 pl7"},{default:n(()=>[s(o,null,{title:n(()=>t[85]||(t[85]=[e("strong",{class:"code title5"},"allDayEvents",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[86]||(t[86]=[e("ul",null,[e("li",{class:"mb2"},[l("When the "),e("span",{class:"code"},"allDayEvents"),l(" is set to "),e("span",{class:"code"},"true"),l(` the events with an
`),e("span",{class:"code"},"allDay"),l(" attribute set to "),e("span",{class:"code"},"true"),l(` will be displayed in a fixed top
bar on the `),e("span",{class:"code"},"day"),l(", "),e("span",{class:"code"},"days"),l(" & "),e("span",{class:"code"},"week"),l(" views."),e("br"),l(`
The all day events bar will only show up if the options `),e("span",{class:"code"},"allDayEvents"),l(` &
`),e("span",{class:"code"},"time"),l(" are set to "),e("span",{class:"code"},"true"),l("."),e("br"),l(`
If `),e("span",{class:"code"},"time"),l(" is set to "),e("span",{class:"code"},"false"),l(`, every event is an all-day
event.`)]),e("li",{class:"mb2"},[l("When "),e("span",{class:"code"},"allDayEvents"),l(" is set to "),e("span",{class:"code"},"false"),l(`, all the all-day events
(`),e("span",{class:"code"},"allDay"),l(" attribute set to "),e("span",{class:"code"},"true"),l(`), will show up as normal
events.
`)])],-1)])),_:1}),s(o,null,{title:n(()=>t[87]||(t[87]=[e("strong",{class:"code title5"},"clickToNavigate",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[88]||(t[88]=[e("p",null,[l("When set to "),e("span",{class:"code"},"true"),l(` a single click (or tap for touch devices) will take you to a
narrower view if available.`),e("br"),l(`
You can always go back to a broader view by clicking the view title or selecting another view
from the view selector if enabled.`),e("br"),l(`
The navigation to narrower view can be disabled by setting `),e("span",{class:"code"},"clickToNavigate"),l(`
to false.`)],-1),e("p",null,"Setting to false will force it off on date-picker where it is on by default.",-1)])),_:1}),s(o,null,{title:n(()=>t[89]||(t[89]=[e("strong",{class:"code title5"},"dark",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[90]||(t[90]=[e("p",null,"Dark theme.",-1)])),_:1}),s(o,null,{title:n(()=>t[91]||(t[91]=[e("strong",{class:"code title5"},"datePicker",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[92]||(t[92]=[e("p",null,[l(`Sets the date picker format CSS-wise and logic as well.
This option acts like a shorthand for:
`),e("code",null,"{ xs: true, views: ['month', 'year', 'years'], clickToNavigate: true }"),l(`.
`)],-1)])),_:1}),s(o,null,{title:n(()=>t[93]||(t[93]=[e("strong",{class:"code title5"},"disableDays",-1),e("div",{class:"type"},"[Array]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"() => []",-1)])),content:n(()=>[e("p",null,[t[94]||(t[94]=l("Accepts an array of formatted dates (e.g. ",-1)),e("span",R,r(new Date().format()),1),t[95]||(t[95]=l(") or JavaScript dates (where the time is useless) of days to disable.",-1))])]),_:1}),s(o,null,{title:n(()=>t[96]||(t[96]=[e("strong",{class:"code title5"},"editableEvents",-1),e("div",{class:"type"},"[Boolean, Object]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>[t[104]||(t[104]=e("p",null,[l("When set to "),e("span",{class:"code"},"true"),l(", it allows:")],-1)),e("ul",null,[t[100]||(t[100]=e("li",null,"Dragging and dropping events.",-1)),t[101]||(t[101]=e("li",null,[l("Resizing events by dragging their bottom handle, when "),e("span",{class:"code"},"time"),l(" is set to "),e("span",{class:"code"},"true"),l(".")],-1)),t[102]||(t[102]=e("li",null,"Deleting events by double click/tap by default.",-1)),e("li",null,[t[98]||(t[98]=l("Creating events by click and drag (refer to the ",-1)),s(h,{to:"/examples/calendar-events--interactions#ex--create-events"},{default:n(()=>t[97]||(t[97]=[l("Create events",-1)])),_:1,__:[97]}),t[99]||(t[99]=l(" example).",-1))])]),s(f,null,{default:n(()=>t[103]||(t[103]=[e("ul",null,[e("li",null,[l("You can set more accurately which edition you want to allow by passing an object."),e("br"),l(`
For instance, this object will allow all the above editions except the drag & drop:`),e("div",{class:"code base-color"},"{ drag: false, resize: true, delete: true, create: true }")]),e("li",null,[l("You can also set the "),e("span",{class:"code"},"deletable"),l(", "),e("span",{class:"code"},"resizable"),l(" and "),e("span",{class:"code"},"draggable"),l(` properties
directly in the event object to override the global setting.
`)])],-1)])),_:1,__:[103]})]),_:1}),s(o,null,{title:n(()=>t[105]||(t[105]=[e("strong",{class:"code title5"},"eventCount",-1),e("div",{class:"type"},"[Boolean, Array]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[106]||(t[106]=[e("p",null,[l("When set to "),e("code",null,"true"),l(", the events will be counted on the "),e("code",null,"month"),l(" views and a number will appear in each cell that contain one or more events."),e("br"),l(`
You can customize the events count via CSS or via the `),e("code",null,"#events-count"),l(" slot."),e("br"),l(`
You can also set the `),e("code",null,"eventCount"),l(" prop to an array of views to individually show the count in. E.g. "),e("code",null,`:event-count="['month', 'year']"`)],-1)])),_:1}),s(o,null,{title:n(()=>t[107]||(t[107]=[e("strong",{class:"code title5"},"events",-1),e("div",{class:"type"},"[Array]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"() => []",-1)])),content:n(()=>[t[120]||(t[120]=e("p",null,[l("Allows you to place events in the calendar."),e("br"),l(`
Accepts an array of event objects.`),e("br"),l(`
This is what an event object must look like:`)],-1)),e("div",null,[s(d,{class:"mt2",language:"js",dark:a(i).darkMode},{default:n(()=>t[108]||(t[108]=[l(`{
  start: '2018-11-19 12:00', // Required.
  end: '2018-11-19 14:00', // Required.
  // Instead of formatted dates, you can also provide JavaScript Date objects:
  // start: new Date(2018, 11 - 1, 19, 12, 0),
  // end: new Date(2018, 11 - 1, 19, 14, 0),
  title: {String}, // Optional.
  content: {String}, // Optional.
  class: {String}, // Optional - space-separated css classes.
  background: {Boolean} // Optional. (Event type not CSS property)
  schedule: {Number} // Optional.
  allDay: {Boolean} // Optional.
  deletable: false // optional - force undeletable when events are editable.
  resizable: false // optional - force unresizable when events are editable.
}`,-1)])),_:1,__:[108]},8,["dark"]),t[109]||(t[109]=e("ul",null,[e("li",null,[l("If no "),e("span",{class:"code"},"title"),l(" is provided, no title will be displayed.")]),e("li",null,[e("span",{class:"code"},"content"),l(` accepts free HTML, for instance:
'<i class="icon mdi mdi-hospital-box-outline"></i>'.`),e("br"),l(`
If no `),e("span",{class:"code"},"content"),l(" is provided, no content will be displayed.")]),e("li",null,[l("You may need an event CSS "),e("span",{class:"code"},"class"),l(` to handle different event types
for instance. With different classes you can apply different styles to the events.`),e("br"),l(`
E.g. backgrounds, images, borders, etc.`)]),e("li",null,[l("The "),e("span",{class:"code"},"background"),l(` attribute sets an event as a background event,
which allows overlapping and disable the ability to drag & resize.`)]),e("li",null,[l("When using "),e("span",{class:"code"},"schedules"),l(", the "),e("span",{class:"code"},"schedule"),l(` attribute accepts a number,
starting from 1, corresponding to the schedule you want the event to appear in.`),e("br"),l(`
Optionally, if you have set the `),e("span",{class:"code"},"id"),l(" property in "),e("span",{class:"code"},"schedules"),l(`,
you have to use the same `),e("span",{class:"code"},"id"),l(" here (Integer of less than 10 digits).")]),e("li",null,[l("When the "),e("span",{class:"code"},"allDayEvents"),l(" and "),e("span",{class:"code"},"time"),l(` options are set to
`),e("span",{class:"code"},"true"),l(", all the events with an attribute "),e("span",{class:"code"},"allDay"),l(` set to
`),e("span",{class:"code"},"true"),l(` will show up in a fixed bar (week & day views).
`)])],-1))]),s(f,{warning:""},{default:n(()=>[t[119]||(t[119]=e("strong",null,"Important notes",-1)),e("ul",null,[t[117]||(t[117]=e("li",null,[l("The events are internally identified by the key "),e("span",{class:"code"},"`_eid`"),l(`.
`),e("strong",null,"This is a reserved keyword.")],-1)),e("li",W,[t[110]||(t[110]=l("Correct date formats are ",-1)),e("code",null,r(new Date().format())+" "+r(new Date().formatTime()),1),t[111]||(t[111]=l(`,
or `,-1)),e("code",null,r(new Date().format()),1),t[112]||(t[112]=l(` if you don't want any time in the whole calendar,
or a JavaScript `,-1)),t[113]||(t[113]=e("code",null,"Date",-1)),t[114]||(t[114]=l(" object. Only these formats will work.",-1)),t[115]||(t[115]=e("br",null,null,-1)),t[116]||(t[116]=e("strong",null,[l("You can't mix events with time and events without, and you can only remove time if the "),e("span",{class:"code"},"time"),l(`
option is set to `),e("span",{class:"code"},"false"),l(".")],-1))]),t[118]||(t[118]=e("li",{class:"mt2"},[l("You can set an event end at "),e("span",{class:"code"},"24:00"),l(" or "),e("span",{class:"code"},"00:00"),l(` (for the next midnight),
`),e("strong",null,[l("but internally the date will be set at "),e("span",{class:"code"},"23:59:59")]),l(` so the date stays the same instead
of natural behavior of taking the next day at `),e("span",{class:"code"},"00:00:00"),l("."),e("br"),l(`
When returned from emitted events, this event `),e("span",{class:"code"},"end"),l(" will contain a date ending at "),e("span",{class:"code"},"23:59:59"),l(`.
`)],-1))])]),_:1,__:[119]})]),_:1}),s(o,null,{title:n(()=>t[121]||(t[121]=[e("strong",{class:"code title5"},"eventCreateMinDrag",-1),e("div",{class:"type"},"[Number]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"15",-1)])),content:n(()=>t[122]||(t[122]=[e("p",null,[l("When events are editable and "),e("span",{class:"code"},"time"),l(" and "),e("span",{class:"code"},"editableEvents.create"),l(` are set to
`),e("span",{class:"code"},"true"),l(", this option controls the minimum dragging distance before an event is created."),e("br"),l(`
This option might be useful to prevent unwanted event creation.`),e("br"),l(`
Setting it to `),e("span",{class:"code"},"0"),l(` disables it.
`)],-1)])),_:1}),s(o,null,{title:n(()=>t[123]||(t[123]=[e("strong",{class:"code title5"},"eventsOnMonthView",-1),e("div",{class:"type"},"[Boolean, String]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[124]||(t[124]=[e("p",null,[l("When set to "),e("span",{class:"code"},"true"),l(`, the events will also be displayed on month view
(excluding events of out-of-scope days).`),e("br"),l(`
When set to the string '`),e("span",{class:"code"},"short"),l(`', only the events titles will be displayed.
`)],-1)])),_:1}),s(o,null,{title:n(()=>t[125]||(t[125]=[e("strong",{class:"code title5"},"hideWeekdays",-1),e("div",{class:"type"},"[Array]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"() => []",-1)])),content:n(()=>t[126]||(t[126]=[e("p",null,"Accepts an array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.",-1),e("p",null,[l("Hide specific weekdays in "),e("span",{class:"code"},"month"),l(", "),e("span",{class:"code"},"week"),l(" and "),e("span",{class:"code"},"days"),l(" views.")],-1)])),_:1}),s(o,null,{title:n(()=>t[127]||(t[127]=[e("strong",{class:"code title5"},"hideWeekends",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[128]||(t[128]=[e("p",null,[l("Show or hide both Saturday and Sunday in "),e("span",{class:"code"},"days"),l(", "),e("span",{class:"code"},"week"),l(" and "),e("span",{class:"code"},"month"),l(" views.")],-1)])),_:1}),s(o,null,{title:n(()=>t[129]||(t[129]=[e("strong",{class:"code title5"},"locale",-1),e("div",{class:"type"},"[String]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:n(()=>[t[136]||(t[136]=e("p",null,"A language to use for all the texts.",-1)),t[137]||(t[137]=e("p",null,[l("Allow translation of the calendar texts in a given language."),e("br"),l(`
Use a 2 letter locale code
(`),e("a",{href:"https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes",target:"_blank"},"ISO 639-1"),l(`)
unless a distinction is needed. E.g. `),e("span",{class:"code"},"'pt-br'"),l(" for Portuguese-Brasilian.")],-1)),s(f,{info:""},{default:n(()=>[l("Currently available languages are "+r(a(S).map(u=>u.label).join(", "))+".",1),t[131]||(t[131]=e("br",null,null,-1)),t[132]||(t[132]=l(`
If you are interested in providing a language support please do a pull request with a json file
into the i18n directory.`,-1)),t[133]||(t[133]=e("br",null,null,-1)),t[134]||(t[134]=l(`
this is what a language json looks like.`,-1)),s(d,{class:"my2",language:"json",dark:a(i).darkMode},{default:n(()=>t[130]||(t[130]=[l(`{
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
}`,-1)])),_:1,__:[130]},8,["dark"]),t[135]||(t[135]=e("p",null,[l("Regarding the "),e("span",{class:"code"},"dateFormat"),l(` translation, this is the format of the full
date you can see in a single day view title.`),e("br"),l(),e("span",{class:"code"},"dddd"),l(" stands for the full-letter day of week, "),e("span",{class:"code"},"MMMM"),l(` stands for
full-letter month, `),e("span",{class:"code"},"D"),l(` stands for the date of the month (0-31),
`),e("span",{class:"code"},"YYYY"),l(" stands for full year, "),e("span",{class:"code"},"{S}"),l(` stands for st/nd/rd/th and only in English.
`)],-1))]),_:1,__:[131,132,133,134,135]})]),_:1}),s(o,null,{title:n(()=>t[138]||(t[138]=[e("strong",{class:"code title5"},"maxDate",-1),e("div",{class:"type"},"[String, Date]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:n(()=>t[139]||(t[139]=[e("p",null,[l("Accepts a formatted string or plain JavaScript Date object."),e("br"),l(`
Set a maximum date for the cells to be selectable.`),e("br"),l(`
By default the cell will be grayed out when out of range but CSS classes let you
customize this.
`)],-1)])),_:1}),s(o,null,{title:n(()=>t[140]||(t[140]=[e("strong",{class:"code title5"},"minDate",-1),e("div",{class:"type"},"[String, Date]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:n(()=>t[141]||(t[141]=[e("p",null,[l("Accepts a formatted string or plain JavaScript Date object."),e("br"),l(`
Set a minimum date for the cells to be selectable.`),e("br"),l(`
By default the cell will be grayed out when out of range but CSS classes let you customize this.
`)],-1)])),_:1}),s(o,null,{title:n(()=>t[142]||(t[142]=[e("strong",{class:"code title5"},"selectedDate",-1),e("div",{class:"type"},"[String, Date]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:n(()=>[e("p",null,[t[143]||(t[143]=l("Accepts a JavaScript Date or a formatted string like ",-1)),e("code",null,r(new Date().format())+" "+r(new Date().formatTime()),1),t[144]||(t[144]=l(".",-1)),t[145]||(t[145]=e("br",null,null,-1)),t[146]||(t[146]=l(`
Preselects a date and navigates to it on calendar load or whenever it changes.`,-1)),t[147]||(t[147]=e("br",null,null,-1)),t[148]||(t[148]=l(`
The selected date is a two-way binding: you can use it in a v-model to keep your variable
up to date.
`,-1))])]),_:1}),s(o,null,{title:n(()=>t[149]||(t[149]=[e("strong",{class:"code title5"},"sm",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>[e("p",null,[t[151]||(t[151]=l(`Small size (truncates texts + set specific styles).
When set to `,-1)),t[152]||(t[152]=e("span",{class:"code"},"true",-1)),t[153]||(t[153]=l(", the days of the week headings will be truncated to 3 letters.",-1)),t[154]||(t[154]=e("br",null,null,-1)),t[155]||(t[155]=l(`
Does not apply to the title of the day view.`,-1)),t[156]||(t[156]=e("br",null,null,-1)),t[157]||(t[157]=l(`
2 media queries are truncating the days of the week below 450px,
read on in the `,-1)),s(h,{to:"/getting-started#css-notes"},{default:n(()=>t[150]||(t[150]=[l("CSS Notes",-1)])),_:1,__:[150]}),t[158]||(t[158]=l(`.
`,-1))])]),_:1}),s(o,null,{title:n(()=>t[159]||(t[159]=[e("strong",{class:"code title5"},"specialHours",-1),e("div",{class:"type"},"[Object]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"() => ({})",-1)])),content:n(()=>[t[165]||(t[165]=e("p",null,"Highlight a particular time range on each day of the week, individually.",-1)),t[166]||(t[166]=e("p",null,[l("Allows an individual highlighted time range for each day of the week."),e("br"),l(`
For instance, it could represent the business hours.`),e("br"),l(`
The object must contain days definitions indexed by a 3-letter day ID in English, `),e("strong",null,[l("from "),e("code",null,"mon"),l(" to "),e("code",null,"sun")]),l(`, of the
days you want to highlight.`),e("br"),l(`
Each day must contain an object with a `),e("span",{class:"code"},"from"),l(" and "),e("span",{class:"code"},"to"),l(` properties
defining the beginning and the end of the time range `),e("strong",null,"in minutes"),l("."),e("br"),l(`
In addition, you can set a CSS class for each day of the week.`),e("br"),l(`
It is also possible to provide an array of special hours for the same day.`),e("br"),l(`
A `),e("span",{class:"code"},"label"),l(" can also be provided per special hour block, and styled via CSS."),e("br"),e("br")],-1)),t[167]||(t[167]=e("p",{class:"subtitle-1"},[l("Example for Wednesday: "),e("span",{class:"code"},':special-hours="specialHours"')],-1)),e("p",null,[t[162]||(t[162]=e("span",{class:"ml3"},"With a single range of special hours:",-1)),s(d,{class:"mt1 ml3",language:"js",dark:a(i).darkMode},{default:n(()=>t[160]||(t[160]=[l(`// In the component's data.
specialHours: {
  wed: { from: 8 * 60, to: 20 * 60, class: 'open' }
}`,-1)])),_:1,__:[160]},8,["dark"]),t[163]||(t[163]=e("br",null,null,-1)),t[164]||(t[164]=e("span",{class:"ml3"},"With multiple ranges of special hours:",-1)),s(d,{class:"mt1 ml3",language:"js",dark:a(i).darkMode},{default:n(()=>t[161]||(t[161]=[l(`// In the component's data.
specialHours: {
  wed: [
    { from: 8 * 60, to: 12 * 60, class: 'open' },
    { from: 14 * 60, to: 20 * 60, class: 'open' }
  ]
}
`,-1)])),_:1,__:[161]},8,["dark"])])]),_:1}),s(o,null,{title:n(()=>t[168]||(t[168]=[e("strong",{class:"code title5"},"schedules",-1),e("div",{class:"type"},"[Array]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"() => []",-1)])),content:n(()=>[t[170]||(t[170]=e("p",null,[l("Split a day and its events in different persons/rooms/locations schedules."),e("br"),l(`
Each calendar event is exclusively owned and displayed in one of them.
Accepts an array of objects defined like follows, where all attributes are optional:`),e("br")],-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[169]||(t[169]=[l(`{
  id: {Integer}, // All ids must be set if using \`hide\`.
  class: {String},
  label: {String},
  hide: {Boolean} // You can toggle the column on and of with this.
}
`,-1)])),_:1,__:[169]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[171]||(t[171]=[e("strong",{class:"code title5"},"snapToInterval",-1),e("div",{class:"type"},"[Number]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"0",-1)])),content:n(()=>t[172]||(t[172]=[e("p",null,[l("Accepts an integer number of minutes from 0 to snap a dropped event or an event end time while resizing."),e("br"),l(`
For instance, with a `),e("span",{class:"code"},"snapToInterval"),l(` of 15 min, an event dropped at 10:05,
will snap to 10:00, and if dropped at 10:11 it will snap to 10:15.`),e("br"),l(`
This option affects event resizing, event drag & dropping, and event drag-creation.
`)],-1)])),_:1}),s(o,null,{title:n(()=>t[173]||(t[173]=[e("strong",{class:"code title5"},"startWeekOnSunday",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[174]||(t[174]=[e("p",null,"Shows Sunday before Monday in days, week and month views. By default the week starts on Monday.",-1)])),_:1}),s(o,null,{title:n(()=>t[175]||(t[175]=[e("strong",{class:"code title5"},"stackEvents",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>[t[177]||(t[177]=e("p",null,"Stack events on top of each other when they overlap.",-1)),s(f,{tip:""},{default:n(()=>t[176]||(t[176]=[l(`Alternatively, you can use the event stacking class (based on the stack position and length) to override
the default stacking behavior to your liking via CSS (you will need to use `,-1),e("code",null,"!important",-1),l(").",-1),e("br",null,null,-1),l(`
Example of classes for three overlapping events: `,-1),e("code",null,"vuecal__event--stack-1-3",-1),l(", ",-1),e("code",null,"vuecal__event--stack-2-3",-1),l(", ",-1),e("code",null,"vuecal__event--stack-3-3",-1),l(`.
`,-1)])),_:1,__:[176]})]),_:1}),s(o,null,{title:n(()=>t[178]||(t[178]=[e("strong",{class:"code title5"},"theme",-1),e("div",{class:"type"},"[String, Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"'default'",-1)])),content:n(()=>t[179]||(t[179]=[e("p",null,"Only adds a CSS class when set to default.",-1)])),_:1}),s(o,null,{title:n(()=>t[180]||(t[180]=[e("strong",{class:"code title5"},"time",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"true",-1)])),content:n(()=>t[181]||(t[181]=[e("p",null,[l("Whether you want to display the timeline and handle events with time or only date."),e("br"),l(`
Note that time is made of `),e("span",{class:"code"},"hours:minutes"),l(),e("strong",{class:"ml2"},"and no second"),l(`.
`)],-1)])),_:1}),s(o,null,{title:n(()=>t[182]||(t[182]=[e("strong",{class:"code title5"},"timeCellHeight",-1),e("div",{class:"type"},"[Number]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"40",-1)])),content:n(()=>t[183]||(t[183]=[e("p",null,"In pixels.",-1)])),_:1}),s(o,null,{title:n(()=>t[184]||(t[184]=[e("strong",{class:"code title5"},"timeFormat",-1),e("div",{class:"type"},"[String]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:n(()=>t[185]||(t[185]=[e("p",{class:"mb2"},[l("When defined, overrides the default time format in time cells and events."),e("br"),l(`
Formatted time can contain any character but the following characters will be replaced:`)],-1),e("ul",{class:"ml3"},[e("li",null,[e("strong",{class:"code"},"H"),l(": Hours no leading zero, 24-hour format")]),e("li",null,[e("strong",{class:"code"},"HH"),l(": Hours with leading zero, 24-hour format")]),e("li",null,[e("strong",{class:"code"},"h"),l(": Hours no leading zero, 12-hour format")]),e("li",null,[e("strong",{class:"code"},"hh"),l(": Hours with leading zero, 12-hour format")]),e("li",null,[e("strong",{class:"code"},"m"),l(": Minutes no leading zero")]),e("li",null,[e("strong",{class:"code"},"mm"),l(": Minutes with leading zero")]),e("li",null,[e("strong",{class:"code"},"{am}"),l(": am or pm")]),e("li",null,[l("The characters `"),e("strong",{class:"code"},"{"),l("` and `"),e("strong",{class:"code"},"}"),l("` are removed and used only to\ndelimit keywords when there is no space."),e("br"),l(`
E.g. `),e("span",{class:"code"},'"h:mm{am}"'),l(`.
`)])],-1)])),_:1}),s(o,null,{title:n(()=>t[186]||(t[186]=[e("strong",{class:"code title5"},"timeFrom",-1),e("div",{class:"type"},"[Number]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"0",-1)])),content:n(()=>t[187]||(t[187]=[e("p",null,`Start time (in minutes) displayed in the timeline for each day in the schedule
view. By default it starts at midnight.
`,-1)])),_:1}),s(o,null,{title:n(()=>t[188]||(t[188]=[e("strong",{class:"code title5"},"timeStep",-1),e("div",{class:"type"},"[Number]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"60",-1)])),content:n(()=>t[189]||(t[189]=[e("p",null,`Granularity of the time intervals (in minutes) displayed in the timeline for each day in the
schedule view.
`,-1)])),_:1}),s(o,null,{title:n(()=>t[190]||(t[190]=[e("strong",{class:"code title5"},"timeTo",-1),e("div",{class:"type"},"[Number]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"24 * 60",-1)])),content:n(()=>t[191]||(t[191]=[e("p",null,`Final time (in minutes) displayed in the timeline for each day in the schedule
view. By default it ends at midnight.
`,-1)])),_:1}),s(o,null,{title:n(()=>t[192]||(t[192]=[e("strong",{class:"code title5"},"titleBar",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"true",-1)])),content:n(()=>t[193]||(t[193]=[e("p",null,"Show or hide the header title bar.",-1)])),_:1}),s(o,null,{title:n(()=>t[194]||(t[194]=[e("strong",{class:"code title5"},"todayButton",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"true",-1)])),content:n(()=>t[195]||(t[195]=[e("p",null,"Show or hide the header today button that allows to quickly navigate to Today's date.",-1)])),_:1}),s(o,null,{title:n(()=>t[196]||(t[196]=[e("strong",{class:"code title5"},"twelveHour",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[197]||(t[197]=[e("p",null,[l("12-hour or 24-hour formats are respectively written like 7am and 07:00 or like 1pm and 13:00."),e("br"),l(`
The default time format is 24-hour.
`)],-1)])),_:1}),s(o,null,{title:n(()=>t[198]||(t[198]=[e("strong",{class:"code title5"},"view",-1),e("div",{class:"type"},"[String]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"'week'",-1)])),content:n(()=>t[199]||(t[199]=[e("p",null,[l("Sets a default active view, for the first time you load the calendar."),e("br"),l(`
Then control the active view from outside of Vue Cal.`),e("br"),l(`
Accepts one of 'years', 'year', 'month', 'week', 'days', 'day'.`),e("br"),l(`
The active view has a two-way binding: you can use a v-model to keep your variable up to date.
`)],-1)])),_:1}),s(o,null,{title:n(()=>t[200]||(t[200]=[e("strong",{class:"code title5"},"viewDate",-1),e("div",{class:"type"},"[String, Date]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"''",-1)])),content:n(()=>t[201]||(t[201]=[e("p",null,"The view will automatically set its start and end to present this date.",-1)])),_:1}),s(o,null,{title:n(()=>t[202]||(t[202]=[e("strong",{class:"code title5"},"viewDayOffset",-1),e("div",{class:"type"},"[Number]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"0",-1)])),content:n(()=>t[203]||(t[203]=[e("p",null,null,-1)])),_:1}),s(o,null,{title:n(()=>t[204]||(t[204]=[e("strong",{class:"code title5"},"views",-1),e("div",{class:"type"},"[Array, Object]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"['day', 'days', 'week', 'month', 'year', 'years']",-1)])),content:n(()=>[t[206]||(t[206]=e("p",null,[l("Accepts an array of strings among these values: 'day', 'days', 'week', 'month', 'year', 'years'."),e("br"),l(`
It will dictate which view is available and can be navigated to.
You can also provide an object with the same keys ('day', 'days', 'week', 'month', 'year', 'years')
if you want to override its default grid layout.
For instance, this is the defaults:`)],-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[205]||(t[205]=[l(`availableViews: {
  day: { cols: 1, rows: 1 },
  days: { cols: 10, rows: 1 },
  week: { cols: 7, rows: 1 },
  month: { cols: 7, rows: 6 },
  year: { cols: 4, rows: 3 },
  years: { cols: 5, rows: 5 } // Arbitrary range of quarters of century (25y).
}
`,-1)])),_:1,__:[205]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[207]||(t[207]=[e("strong",{class:"code title5"},"viewsBar",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"true",-1)])),content:n(()=>t[208]||(t[208]=[e("p",null,"Show or hide the headers view selection bar.",-1)])),_:1}),s(o,null,{title:n(()=>t[209]||(t[209]=[e("strong",{class:"code title5"},"watchRealTime",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[210]||(t[210]=[e("p",null,[l("More expensive, so only trigger on demand."),e("br"),l(`
When set to `),e("span",{class:"code"},"true"),l(", the current time line in today's cell, on "),e("span",{class:"code"},"week"),l(` and
`),e("span",{class:"code"},"day"),l(" views, will stay in sync with real time."),e("br"),l(),e("span",{class:"grey"},[l("(This requires a "),e("span",{class:"code"},"setTimeout"),l(" every minute)")])],-1)])),_:1}),s(o,null,{title:n(()=>t[211]||(t[211]=[e("strong",{class:"code title5"},"weekNumbers",-1),e("div",{class:"type"},"[Boolean, String]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>[t[213]||(t[213]=e("p",null,[l("When set to "),e("span",{class:"code"},"true"),l(`, the weeks numbers will show in the first column on the
`),e("span",{class:"code"},"month"),l(" view (only)."),e("br"),l(`
You can also provide a custom renderer to the weeks numbers cells through the
`),e("span",{class:"code"},"week-number-cell"),l(" slot.")],-1)),s(f,null,{default:n(()=>t[212]||(t[212]=[e("a",{id:"there-can-be-53-weeks-in-a-year"},null,-1),e("strong",null,[l("Did you know there can be 53 weeks in the year?"),e("br")],-1),l(`This happens every time the year starts a Thursday, or starts a Wednesday of a leap year.
In this case the week number will be 53 instead of 1.`,-1)])),_:1,__:[212]})]),_:1}),s(o,null,{title:n(()=>t[214]||(t[214]=[e("strong",{class:"code title5"},"xs",-1),e("div",{class:"type"},"[Boolean]",-1),l(",",-1),e("div",{class:"body grey mx1"},"default:",-1),e("strong",{class:"default code"},"false",-1)])),content:n(()=>t[215]||(t[215]=[e("p",null,[l("Extra small size for date pickers (truncates texts + specific styles)."),e("br"),l(`
When set to `),e("span",{class:"code"},"true"),l(", the days of the week headings will be truncated to 1 letter."),e("br"),l(`
Does not apply to the title of the day view.`),e("br"),l(`
In Addition, the whole calendar gets applied a smaller font size
and the current view title size is also reduced.
`)],-1)])),_:1})]),_:1},8,["modelValue"]),e("h2",Y,[s(v,{div:"",anchor:"emitted-events"},{default:n(()=>t[216]||(t[216]=[l("Emitted Events",-1)])),_:1,__:[216]}),s(g,{class:"my1 body","onUpdate:modelValue":t[8]||(t[8]=u=>D.value=Array(50).fill(u))},{default:n(()=>t[217]||(t[217]=[l("Expand All",-1)])),_:1,__:[217]})]),s(m,{modelValue:D.value,"onUpdate:modelValue":t[9]||(t[9]=u=>D.value=u),"expand-icon-rotate90":"","title-class":"pa0 bd0 body","content-class":"pt1 pr0 pb6 pl7"},{default:n(()=>[t[290]||(t[290]=e("h5",{class:"mt2 base-color"},"Core Events",-1)),s(o,null,{title:n(()=>t[218]||(t[218]=[e("strong",{class:"code title5"},"ready",-1)])),content:n(()=>t[219]||(t[219]=[e("p",null,"Fired as soon as Vue Cal is mounted in the DOM and ready.",-1),e("p",null,"Returns an object containing:",-1),e("ul",null,[e("li",null,[e("code",null,"config"),l(": The Vue Cal configuration object.")]),e("li",null,[e("code",null,"view"),l(": The Vue Cal view object.")])],-1)])),_:1}),s(o,null,{title:n(()=>t[220]||(t[220]=[e("strong",{class:"code title5"},"view-change",-1)])),content:n(()=>t[221]||(t[221]=[e("p",null,"Fired on every view change, navigation, or when events are added/removed.",-1),e("p",null,"Returns an object containing:",-1),e("ul",null,[e("li",null,[e("code",null,"id"),l(),e("code",null,"{String}"),l(": The view ID. Possible values: 'day', 'days', 'week', 'month', 'year', 'years'.")]),e("li",null,[e("code",null,"title"),l(),e("code",null,"{String}"),l(': The view computed title, e.g. "October 2024".')]),e("li",null,[e("code",null,"start"),l(),e("code",null,"{Date}"),l(": The view primary start date (active days only).")]),e("li",null,[e("code",null,"end"),l(),e("code",null,"{Date}"),l(": The view primary end date (active days only).")]),e("li",null,[e("code",null,"fullRangeStart"),l(),e("code",null,"{Date}"),l(": The view extended start date including out-of-scope days.")]),e("li",null,[e("code",null,"fullRangeEnd"),l(),e("code",null,"{Date}"),l(": The view extended end date including out-of-scope days.")]),e("li",null,[e("code",null,"cellDates"),l(),e("code",null,"{Array}"),l(": An array of objects containing start and end dates for each cell in view.")]),e("li",null,[e("code",null,"containsToday"),l(),e("code",null,"{Boolean}"),l(": Whether the view contains the current date.")]),e("li",null,[e("code",null,"events"),l(),e("code",null,"{Array}"),l(": An array containing all the events in the current view.")]),e("li",null,[e("code",null,"viewDate"),l(),e("code",null,"{Date}"),l(": The reference date used to calculate the view.")]),e("li",null,[e("code",null,"selectedDate"),l(),e("code",null,"{Date}"),l(": The currently selected date (if any).")]),e("li",null,[e("code",null,"now"),l(),e("code",null,"{Date}"),l(": The current date and time.")]),e("li",null,[l("View-specific flags: "),e("code",null,"isDay"),l(", "),e("code",null,"isDays"),l(", "),e("code",null,"isWeek"),l(", "),e("code",null,"isMonth"),l(", "),e("code",null,"isYear"),l(", "),e("code",null,"isYears")])],-1)])),_:1}),s(o,null,{title:n(()=>t[222]||(t[222]=[e("strong",{class:"code title5"},"update:view",-1)])),content:n(()=>t[223]||(t[223]=[e("p",null,"Fired when the view changes. Part of v-model binding for the view property.",-1),e("p",null,[l("Returns: "),e("code",null,"{String}"),l(" The ID of the current view (e.g. 'day', 'week', 'month', etc.)")],-1)])),_:1}),s(o,null,{title:n(()=>t[224]||(t[224]=[e("strong",{class:"code title5"},"update:selectedDate",-1)])),content:n(()=>t[225]||(t[225]=[e("p",null,"Fired when a date is selected in the calendar. Part of v-model binding for the selectedDate property.",-1),e("p",null,[l("Returns: "),e("code",null,"{Date}"),l(" The selected date as a JavaScript Date object.")],-1)])),_:1}),s(o,null,{title:n(()=>t[226]||(t[226]=[e("strong",{class:"code title5"},"update:viewDate",-1)])),content:n(()=>t[227]||(t[227]=[e("p",null,"Fired when the view date changes (e.g., when navigating to different dates). Part of v-model binding for the viewDate property.",-1),e("p",null,[l("Returns: "),e("code",null,"{Date}"),l(" The new view date as a JavaScript Date object.")],-1)])),_:1}),s(o,null,{title:n(()=>t[228]||(t[228]=[e("strong",{class:"code title5"},"update:events",-1)])),content:n(()=>t[229]||(t[229]=[e("p",null,"Fired when events are created, modified, or deleted. Part of v-model binding for the events property.",-1),e("p",null,[l("Returns: "),e("code",null,"{Array}"),l(" The updated array of calendar events.")],-1)])),_:1}),t[291]||(t[291]=e("h5",{class:"mt2 base-color"},"Cell-related Events",-1)),s(o,null,{title:n(()=>t[230]||(t[230]=[e("strong",{class:"code title5"},"cell-*",-1)])),content:n(()=>t[231]||(t[231]=[e("p",null,"Vue Cal forwards any DOM event on cells, where * can be any valid DOM event name.",-1),e("p",null,"Returns: The native event object plus cell date information.",-1)])),_:1}),s(o,null,{title:n(()=>t[232]||(t[232]=[e("strong",{class:"code title5"},"cell-drag-start",-1)])),content:n(()=>t[233]||(t[233]=[e("p",null,"Fired when starting to drag on a cell (when creating events by dragging).",-1),e("p",null,[l("Returns: "),e("code",null,"{Date}"),l(" The cell's date with time at cursor position.")],-1)])),_:1}),s(o,null,{title:n(()=>t[234]||(t[234]=[e("strong",{class:"code title5"},"cell-drag",-1)])),content:n(()=>t[235]||(t[235]=[e("p",null,"Fired continuously while dragging on cells (when creating events by dragging).",-1),e("p",null,[l("Returns: "),e("code",null,"{Date}"),l(" The current cell's date with time at cursor position.")],-1)])),_:1}),s(o,null,{title:n(()=>t[236]||(t[236]=[e("strong",{class:"code title5"},"cell-drag-end",-1)])),content:n(()=>t[237]||(t[237]=[e("p",null,"Fired when ending a drag on cells (when creating events by dragging).",-1),e("p",null,[l("Returns: "),e("code",null,"{Date}"),l(" The final cell's date with time at cursor position.")],-1)])),_:1}),s(o,null,{title:n(()=>t[238]||(t[238]=[e("strong",{class:"code title5"},"cell-hold",-1)])),content:n(()=>t[239]||(t[239]=[e("p",null,"Fired when a cell is clicked and held for a specific duration.",-1),e("p",null,[l("Returns: "),e("code",null,"{Date}"),l(" The cell's date.")],-1)])),_:1}),t[292]||(t[292]=e("h5",{class:"mt2 base-color"},"Event-related Events",-1)),s(o,null,{title:n(()=>t[240]||(t[240]=[e("strong",{class:"code title5"},"event-*",-1)])),content:n(()=>t[241]||(t[241]=[e("p",null,"Vue Cal forwards any DOM event on events, where * can be any valid DOM event name.",-1),e("p",null,"Returns: The native event object plus the calendar event object.",-1)])),_:1}),s(o,null,{title:n(()=>t[242]||(t[242]=[e("strong",{class:"code title5"},"event-hold",-1)])),content:n(()=>t[243]||(t[243]=[e("p",null,"Fired when an event is clicked and held for a specific duration.",-1),e("p",null,[l("Returns: "),e("code",null,"{Object}"),l(" The associated calendar event object.")],-1)])),_:1}),s(o,null,{title:n(()=>t[244]||(t[244]=[e("strong",{class:"code title5"},"event-create",-1)])),content:n(()=>t[245]||(t[245]=[e("p",null,[l("Fired when an event is created via drag creation or programmatically via the Vue Cal "),e("code",null,"view.createEvent()"),l(" method.")],-1),e("p",null,[l("Returns: "),e("code",null,"{Object}"),l(" The newly created calendar event object.")],-1)])),_:1}),s(o,null,{title:n(()=>t[246]||(t[246]=[e("strong",{class:"code title5"},"event-created",-1)])),content:n(()=>[t[248]||(t[248]=e("p",null,"Fired after an event has been created and its DOM node has been mounted. Useful for UI operations like scrolling to the new event.",-1)),t[249]||(t[249]=e("p",null,"Example use:",-1)),s(d,{class:"mt1",language:"js",dark:a(i).darkMode},{default:n(()=>t[247]||(t[247]=[l(`@event-created="event => event._.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })")`,-1)])),_:1,__:[247]},8,["dark"]),t[250]||(t[250]=e("p",null,[l("Returns: "),e("code",null,"{Object}"),l(" The created calendar event object with its DOM node reference accessible via "),e("code",null,"event._.$el"),l(".")],-1))]),_:1}),s(o,null,{title:n(()=>t[251]||(t[251]=[e("strong",{class:"code title5"},"event-delete",-1)])),content:n(()=>t[252]||(t[252]=[e("p",null,"Fired when an event is being deleted.",-1),e("p",null,[l("Returns: "),e("code",null,"{Object}"),l(" The calendar event object being deleted.")],-1)])),_:1}),s(o,null,{title:n(()=>t[253]||(t[253]=[e("strong",{class:"code title5"},"event-drag-start",-1)])),content:n(()=>t[254]||(t[254]=[e("p",null,"Fired when starting to drag an existing event.",-1),e("p",null,[l("Returns: "),e("code",null,"{Object}"),l(" The calendar event object with current cursor position information.")],-1)])),_:1}),s(o,null,{title:n(()=>t[255]||(t[255]=[e("strong",{class:"code title5"},"event-drag",-1)])),content:n(()=>t[256]||(t[256]=[e("p",null,"Fired continuously while dragging an event.",-1),e("p",null,[l("Returns: "),e("code",null,"{Object}"),l(" The calendar event object with current cursor position information.")],-1)])),_:1}),s(o,null,{title:n(()=>t[257]||(t[257]=[e("strong",{class:"code title5"},"event-drag-end",-1)])),content:n(()=>t[258]||(t[258]=[e("p",null,"Fired when ending the drag of an event.",-1),e("p",null,[l("Returns: "),e("code",null,"{Object}"),l(" The calendar event object with final position information.")],-1)])),_:1}),s(o,null,{title:n(()=>t[259]||(t[259]=[e("strong",{class:"code title5"},"event-resize-start",-1)])),content:n(()=>t[260]||(t[260]=[e("p",null,"Fired when starting to resize an event.",-1),e("p",null,"Returns an object containing:",-1),e("ul",null,[e("li",null,[e("code",null,"e"),l(": The native DOM event object.")]),e("li",null,[e("code",null,"event"),l(": The calendar event object being resized.")])],-1)])),_:1}),s(o,null,{title:n(()=>t[261]||(t[261]=[e("strong",{class:"code title5"},"event-resize",-1)])),content:n(()=>[t[263]||(t[263]=e("p",null,"Fired repeatedly while resizing an event.",-1)),t[264]||(t[264]=e("p",{class:"grey"},"For performance reasons, returns a lighter object containing:",-1)),t[265]||(t[265]=e("ul",null,[e("li",null,[e("code",null,"_eid"),l(": The calendar event internal ID.")]),e("li",null,[e("code",null,"end"),l(": The calendar event new end Date.")]),e("li",null,[e("code",null,"endTimeMinutes"),l(": The calendar event new end time in minutes.")])],-1)),s(f,{warning:""},{default:n(()=>t[262]||(t[262]=[l(`You should only listen to this event if you have no choice. In most cases you should
listen to `,-1),e("code",null,"event-resize-end",-1),l(" instead (fired only once at the end of the resizing).",-1)])),_:1,__:[262]})]),_:1}),s(o,null,{title:n(()=>t[266]||(t[266]=[e("strong",{class:"code title5"},"event-resize-end",-1)])),content:n(()=>t[267]||(t[267]=[e("p",null,"Fired when the event resizing is ended.",-1),e("p",null,"Returns an object containing:",-1),e("ul",null,[e("li",null,[e("code",null,"e"),l(": The native DOM event object.")]),e("li",null,[e("code",null,"event"),l(": The calendar event object with updated start, end and schedule properties.")]),e("li",null,[e("code",null,"overlaps"),l(": An array of all the overlapping events, or empty array if none.")]),e("li",null,[e("code",null,"cell"),l(": The cell object where the event was resized.")]),e("li",null,[e("code",null,"external"),l(": Boolean indicating if the event is from an external Vue Cal instance.")])],-1)])),_:1}),s(o,null,{title:n(()=>t[268]||(t[268]=[e("strong",{class:"code title5"},"event-drop",-1)])),content:n(()=>t[269]||(t[269]=[e("p",null,`Fired as soon as the event is dropped. If there is a listener, it must return true or false to
accept or reject the event drop at the new position.`,-1),e("p",null,"Returns an object containing:",-1),e("ul",null,[e("li",null,[e("code",null,"e"),l(": The native DOM event object.")]),e("li",null,[e("code",null,"event"),l(": The calendar event object with updated start, end and schedule properties.")]),e("li",null,[e("code",null,"overlaps"),l(": An array of all the overlapping events, or empty array if none.")]),e("li",null,[e("code",null,"cell"),l(": The cell object where the event was dropped.")]),e("li",null,[e("code",null,"external"),l(": Boolean indicating if the event is from an external Vue Cal instance.")])],-1)])),_:1}),s(o,null,{title:n(()=>t[270]||(t[270]=[e("strong",{class:"code title5"},"event-dropped",-1)])),content:n(()=>t[271]||(t[271]=[e("p",null,[l("Fired after an event has been successfully dropped and the drop has been accepted. Unlike "),e("code",null,"event-drop"),l(`,
this event is purely informational and doesn't expect a return value.`)],-1),e("p",null,"Returns an object containing:",-1),e("ul",null,[e("li",null,[e("code",null,"e"),l(": The native DOM event object.")]),e("li",null,[e("code",null,"event"),l(": The updated calendar event object.")]),e("li",null,[e("code",null,"originalEvent"),l(": The original event object before it was dropped.")]),e("li",null,[e("code",null,"cell"),l(": The cell object where the event was dropped.")]),e("li",null,[e("code",null,"external"),l(": Boolean indicating if the event is from an external Vue Cal instance.")])],-1)])),_:1}),t[293]||(t[293]=e("h5",{class:"mt2 base-color"},"Event Payload Structure Details",-1)),s(o,null,{title:n(()=>t[272]||(t[272]=[e("strong",{class:"code title5"},"Cell Event Payload Structure",-1)])),content:n(()=>[t[274]||(t[274]=e("p",null,[l("All cell-related events (like "),e("code",null,"cell-click"),l(", "),e("code",null,"cell-drag"),l(", etc.) return a consistent payload with:")],-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[273]||(t[273]=[l(`{
  e: {Event}, // The native DOM event
  cell: {
    start: {Date}, // The cell start date & time
    end: {Date}, // The cell end date & time
    events: {ComputedRef}, // List of events in this cell
    schedule: {Number}, // (if applicable) The schedule ID
    // Navigation methods
    goNarrower: {Function},
    goBroader: {Function},
    broader: {String}, // ID of the broader view
    narrower: {String} // ID of the narrower view
  },
  cursor: {
    x: {Number}, // Cursor X position in percentage within cell
    y: {Number}, // Cursor Y position in percentage within cell
    date: {Date} // Date at cursor position (includes time)
  }
}`,-1)])),_:1,__:[273]},8,["dark"]),t[275]||(t[275]=e("p",null,[l("For events triggered by the cell's DOM events (like "),e("code",null,"cell-click"),l(", "),e("code",null,"cell-dblclick"),l(`, etc.), the cursor
position is calculated at the moment of the event, providing the exact time at the click position.`)],-1)),t[276]||(t[276]=e("p",null,[l("For drag events ("),e("code",null,"cell-drag-start"),l(", "),e("code",null,"cell-drag"),l(", "),e("code",null,"cell-drag-end"),l(`), the cursor position is
continuously tracked during the drag operation.
`)],-1))]),_:1}),s(o,null,{title:n(()=>t[277]||(t[277]=[e("strong",{class:"code title5"},"Event Event Payload Structure",-1)])),content:n(()=>[t[281]||(t[281]=e("p",null,[l("All event-related events (like "),e("code",null,"event-click"),l(", "),e("code",null,"event-drag"),l(", etc.) return a consistent payload with:")],-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[278]||(t[278]=[l(`{
  e: {Event}, // The native DOM event
  event: {Object} // The full calendar event object
}`,-1)])),_:1,__:[278]},8,["dark"]),t[282]||(t[282]=e("p",null,[l(`The event object contains all the properties of the calendar event, including both custom properties
and internal properties (accessible via the `),e("code",null,"_"),l(" property).")],-1)),t[283]||(t[283]=e("p",null,[l("For specialized events like "),e("code",null,"event-resize"),l(", the payload contains additional context:")],-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[279]||(t[279]=[l(`// event-resize-start and event-resize-end
{
  e: {Event}, // The native DOM event
  event: {Object}, // The event being resized
  original: {Object}, // For resize-end: Original event before resizing
  overlaps: {Array} // Events that overlap with the resized event
}

// event-resize (during resize)
{
  _eid: {Number}, // Internal event ID
  end: {Date}, // New end date during resize
  endTimeMinutes: {Number} // New end time in minutes
}
`,-1)])),_:1,__:[279]},8,["dark"]),t[284]||(t[284]=e("p",null,"For drag & drop operations, the payload includes context about the source and destination:",-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[280]||(t[280]=[l(`// event-drop
{
  e: {Event}, // The native DOM event
  event: {Object}, // The event being dropped with updated properties
  overlaps: {Array}, // Events that overlap with the dropped event
  cell: {Object}, // The cell where the event is being dropped
  external: {Boolean} // If the event comes from another Vue Cal instance
}
`,-1)])),_:1,__:[280]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[285]||(t[285]=[e("div",{class:"title5"},"Additional Notes About The Internal Manual Event Forwarding",-1)])),content:n(()=>[t[287]||(t[287]=e("p",null,`Vue Cal uses two different mechanisms for event handling: the standard Vue event emission system
and direct DOM event forwarding.`,-1)),t[288]||(t[288]=e("p",null,`For DOM events on cells and events (like click, dblclick, mousedown, etc.), Vue Cal automatically
forwards these events by adding listeners to the cell and event elements. When these events occur,
Vue Cal enriches them with additional context (cell info, event info, cursor position) before
passing them to your handlers.`,-1)),s(d,{language:"js",dark:a(i).darkMode},{default:n(()=>t[286]||(t[286]=[l(`// Example of what happens internally:
eventListeners.click = e => {
  // First process internal logic
  onCellClick();

  // Then forward to external handler with enriched context
  externalHandlers.click?.({
    e,
    cell: cellInfo.value,
    cursor: getTimeAtCursor(e)
  });
}`,-1)])),_:1,__:[286]},8,["dark"]),t[289]||(t[289]=e("p",null,`This approach allows Vue Cal to provide a consistent, rich API for all events while still
maintaining the natural DOM event behavior. It also enables advanced features like the
"delayed-click" event that waits to ensure it's not part of a double-click.
`,-1))]),_:1})]),_:1,__:[290,291,292,293]},8,["modelValue"]),e("h2",U,[s(v,{div:"",anchor:"slots"},{default:n(()=>t[294]||(t[294]=[l("Slots",-1)])),_:1,__:[294]}),s(g,{class:"my1 body","onUpdate:modelValue":t[10]||(t[10]=u=>x.value=Array(50).fill(u))},{default:n(()=>t[295]||(t[295]=[l("Expand All",-1)])),_:1,__:[295]})]),s(m,{modelValue:x.value,"onUpdate:modelValue":t[11]||(t[11]=u=>x.value=u),"expand-icon-rotate90":"","title-class":"pa0 bd0 body","content-class":"pt1 pr0 pb6 pl7"},{default:n(()=>[s(o,null,{title:n(()=>t[296]||(t[296]=[e("strong",{class:"code title5"},"diy",-1)])),content:n(()=>t[297]||(t[297]=[e("p",null,'The "Do It Yourself" slot allows complete customization of the calendar. When this slot is used, the default calendar structure is replaced entirely by your custom content.',-1),e("p",null,"This is useful for creating entirely custom calendar interfaces while still utilizing Vue Cal's core functionality.",-1),e("p",null,"Available parameters:",-1),e("ul",null,[e("li",null,[e("code",{class:"base-color"},"vuecal"),l(" - The core Vue Cal object with all methods and properties."),e("p",null,"The core Vue Cal object contains:"),e("ul",null,[e("li",null,[e("code",{class:"base-color"},"available-views"),l(" - An object containing all the available views")]),e("li",null,[e("code",{class:"base-color"},"config"),l(" - The calendar configuration object")]),e("li",null,[e("code",{class:"base-color"},"dateUtils"),l(" - The date utilities methods")]),e("li",null,[e("code",{class:"base-color"},"eventsManager"),l(" - The events manager object containing the events array and methods to manipulate it")]),e("li",null,[e("code",{class:"base-color"},"dnd"),l(" - The drag and drop manager object")]),e("li",null,[e("code",{class:"base-color"},"now"),l(" - The current date")]),e("li",null,[e("code",{class:"base-color"},"texts"),l(" - The localized texts")]),e("li",null,[e("code",{class:"base-color"},"touch"),l(" - The gestures and interactions manager object")]),e("li",null,[e("code",{class:"base-color"},"uid"),l(" - The unique identifier of the calendar instance")]),e("li",null,[e("code",{class:"base-color"},"view"),l(" - The current view object with all its properties")])])])],-1)])),_:1}),s(o,null,{title:n(()=>t[298]||(t[298]=[e("strong",{class:"code title5"},"header",-1)])),content:n(()=>[t[300]||(t[300]=e("p",null,"Allows complete customization of the calendar's header section, replacing the title bar and views bar.",-1)),t[301]||(t[301]=e("p",null,"Available parameters:",-1)),t[302]||(t[302]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"view"),l(" - The current view object")]),e("li",null,[e("code",{class:"base-color"},"available-views"),l(" - An object containing all the available views")]),e("li",null,[e("code",{class:"base-color"},"vuecal"),l(" - If you really need more, the Vue Cal object contains everything")])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[299]||(t[299]=[l(`<template #header="{ view, availableViews, vuecal }">
  <div class="custom-header">
    <h2>`+r("{{ view.title }}")+`</h2>
    <div class="view-buttons">
      <button
        v-for="(grid, viewId) in availableViews"
        @click="vuecal.view.switch(viewId)"
        :class="{ active: view.id === viewId }">
        `+r("{{ viewId }}")+`
      </button>
    </div>
  </div>
</template>
`,-1)])),_:1,__:[299]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[303]||(t[303]=[e("strong",{class:"code title5"},"title",-1)])),content:n(()=>[t[305]||(t[305]=e("p",null,"Customizes the title display in the calendar header. This slot is ignored if the header slot is used.",-1)),t[306]||(t[306]=e("p",null,"Available parameters:",-1)),t[307]||(t[307]=e("p",null,[l("This slot receives the full "),e("code",{class:"base-color"},"view"),l(" object which contains:")],-1)),t[308]||(t[308]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"title"),l(" - The formatted title string for the current view")]),e("li",null,[e("code",{class:"base-color"},"id"),l(" - The ID of the current view (e.g., 'day', 'week', 'month')")]),e("li",null,[e("code",{class:"base-color"},"start"),l(" - The start date of the view")]),e("li",null,[e("code",{class:"base-color"},"end"),l(" - The end date of the view")]),e("li",null,[l("View-specific flags like "),e("code",{class:"base-color"},"isDay"),l(", "),e("code",{class:"base-color"},"isWeek"),l(", etc.")])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[304]||(t[304]=[l(`<template #title="view">
  <code>`+r("{{ view.title }}")+`</code>
</template>
`,-1)])),_:1,__:[304]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[309]||(t[309]=[e("strong",{class:"code title5"},"title.[view]",-1)])),content:n(()=>[t[311]||(t[311]=e("p",null,`Customizes the title display in the calendar header for a specific view only.
This slot is ignored if the header slot is used.`,-1)),t[312]||(t[312]=e("p",null,"Available parameters:",-1)),t[313]||(t[313]=e("p",null,[l("This slot receives the full "),e("code",{class:"base-color"},"view"),l(" object which contains:")],-1)),t[314]||(t[314]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"title"),l(" - The formatted title string for the current view")]),e("li",null,[e("code",{class:"base-color"},"id"),l(" - The ID of the current view (e.g., 'day', 'week', 'month')")]),e("li",null,[e("code",{class:"base-color"},"start"),l(" - The start date of the view")]),e("li",null,[e("code",{class:"base-color"},"end"),l(" - The end date of the view")]),e("li",null,[l("View-specific flags like "),e("code",{class:"base-color"},"isDay"),l(", "),e("code",{class:"base-color"},"isWeek"),l(", etc.")])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[310]||(t[310]=[l(`<template #title.day="view">
  <em>`+r("{{ view.title }}")+` ❤️</em>
</template>

<template #title.month="view">
  <strong>`+r("{{ view.title }}")+` 📆</strong>
</template>
`,-1)])),_:1,__:[310]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[315]||(t[315]=[e("strong",{class:"code title5"},"previous-button",-1)])),content:n(()=>[t[317]||(t[317]=e("p",null,"Customizes the previous navigation button. This slot is ignored if the header slot is used.",-1)),t[318]||(t[318]=e("p",null,"Example:",-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[316]||(t[316]=[l(`<template #previous-button>
  <i class="icon mdi mdi-arrow-left"></i>
</template>
`,-1)])),_:1,__:[316]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[319]||(t[319]=[e("strong",{class:"code title5"},"next-button",-1)])),content:n(()=>[t[321]||(t[321]=e("p",null,"Customizes the next navigation button. This slot is ignored if the header slot is used.",-1)),t[322]||(t[322]=e("p",null,"Example:",-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[320]||(t[320]=[l(`<template #next-button>
  <i class="icon mdi mdi-arrow-right"></i>
</template>
`,-1)])),_:1,__:[320]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[323]||(t[323]=[e("strong",{class:"code title5"},"today-button",-1)])),content:n(()=>[t[325]||(t[325]=e("p",null,'Customizes the "Today" button. This slot is ignored if the header slot is used.',-1)),t[326]||(t[326]=e("p",null,"Available parameters:",-1)),t[327]||(t[327]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"navigate"),l(" - A function to navigate to today's date")]),e("li",null,[e("code",{class:"base-color"},"active"),l(" - Boolean indicating if the current view already contains today")])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[324]||(t[324]=[l(`<template #today-button="{ navigate, active }">
  <button @click="navigate" :disabled="active" class="custom-today-btn">
    Today
  </button>
</template>
`,-1)])),_:1,__:[324]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[328]||(t[328]=[e("strong",{class:"code title5"},"weekday-heading",-1)])),content:n(()=>[t[330]||(t[330]=e("p",null,"Customizes the weekday headings in day, days, week, and month views.",-1)),t[331]||(t[331]=e("p",null,"Available parameters:",-1)),t[332]||(t[332]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"label"),l(" - The day label (varies based on calendar size - full, abbreviated, or single letter)")]),e("li",null,[e("code",{class:"base-color"},"id"),l(" - The day identifier (mon, tue, wed, etc.)")]),e("li",null,[e("code",{class:"base-color"},"date"),l(" - The date of this particular day")])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[329]||(t[329]=[l(`<template #weekday-heading="{ label, id, date }">
  <strong :class="id">`+r("{{ label }}")+`</strong>
</template>
`,-1)])),_:1,__:[329]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[333]||(t[333]=[e("strong",{class:"code title5"},"schedule-heading",-1)])),content:n(()=>[t[335]||(t[335]=e("p",null,"Customizes the schedule headings when schedules are enabled.",-1)),t[336]||(t[336]=e("p",null,"Available parameters:",-1)),t[337]||(t[337]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"schedule"),l(" - The schedule object containing id, label, and class")]),e("li",null,[e("code",{class:"base-color"},"view"),l(" - The current view object")])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[334]||(t[334]=[l('<template #schedule-heading="{ schedule, view }">\n  <i class="icon mdi mdi-account"></i>\n  <strong :style="`color: ${schedule.color}`">'+r("{{ schedule.label }}")+`</strong>
</template>
`,-1)])),_:1,__:[334]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[338]||(t[338]=[e("strong",{class:"code title5"},"time-cell",-1)])),content:n(()=>[t[340]||(t[340]=e("p",null,"Customizes the time column cells in views that display time (day, days, week).",-1)),t[341]||(t[341]=e("p",null,"Available parameters:",-1)),t[342]||(t[342]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"index"),l(" - The index of the time cell")]),e("li",null,[e("code",{class:"base-color"},"minutes"),l(" - Minutes component of the time (0-59)")]),e("li",null,[e("code",{class:"base-color"},"hours"),l(" - Hours component of the time (0-23)")]),e("li",null,[e("code",{class:"base-color"},"minutesSum"),l(" - The total time in minutes")]),e("li",null,[e("code",{class:"base-color"},"format12"),l(' - Formatted 12-hour time string (e.g., "7am")')]),e("li",null,[e("code",{class:"base-color"},"format24"),l(' - Formatted 24-hour time string (e.g., "07:00")')])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[339]||(t[339]=[l(`<template #time-cell="{ format24, format12 }">
  <strong>`+r("{{ format24 }}")+`</strong>
</template>
`,-1)])),_:1,__:[339]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[343]||(t[343]=[e("strong",{class:"code title5"},"week-number-cell",-1)])),content:n(()=>[t[345]||(t[345]=e("p",null,"Customizes the week number cells when the weekNumbers option is enabled.",-1)),t[346]||(t[346]=e("p",null,"By default, this slot has no parameters and simply displays the week number.",-1)),t[347]||(t[347]=e("p",null,"Example:",-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[344]||(t[344]=[l(`<template #week-number-cell>
  <span class="custom-week-number">W`+r("{{ weekNumber }}")+`</span>
</template>
`,-1)])),_:1,__:[344]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[348]||(t[348]=[e("strong",{class:"code title5"},"cell",-1)])),content:n(()=>[t[350]||(t[350]=e("p",null,"Completely customizes a calendar cell. This is a powerful slot that replaces the entire cell content.",-1)),t[351]||(t[351]=e("p",null,"Available parameters:",-1)),t[352]||(t[352]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"cell"),l(" - The cell object containing date information and events")])],-1)),t[353]||(t[353]=e("p",null,"The cell object contains:",-1)),t[354]||(t[354]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"start"),l(" - Start date and time of the cell")]),e("li",null,[e("code",{class:"base-color"},"end"),l(" - End date and time of the cell")]),e("li",null,[e("code",{class:"base-color"},"events"),l(" - Array of events in this cell")]),e("li",null,[e("code",{class:"base-color"},"formattedDate"),l(" - Formatted date string")]),e("li",null,[e("code",{class:"base-color"},"view"),l(" - The current view object")])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[349]||(t[349]=[l(`<template #cell="{ cell }">
  <div class="custom-cell">
    <div class="date">`+r("{{ cell.formattedDate }}")+`</div>
    <div v-for="event in cell.events" class="event">
      `+r("{{ event.title }}")+`
    </div>
  </div>
</template>
`,-1)])),_:1,__:[349]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[355]||(t[355]=[e("strong",{class:"code title5"},"cell-date",-1)])),content:n(()=>[t[357]||(t[357]=e("p",null,"Customizes the date display in a calendar cell. This slot is ignored if the cell slot is used.",-1)),t[358]||(t[358]=e("p",null,"Available parameters:",-1)),t[359]||(t[359]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"cell"),l(" - The cell object with all its properties")])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[356]||(t[356]=[l(`<template #cell-date="{ cell }">
  <div class="custom-date-display">`+r("{{ cell.formattedDate }}")+`</div>
</template>
`,-1)])),_:1,__:[356]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[360]||(t[360]=[e("strong",{class:"code title5"},"cell-content",-1)])),content:n(()=>[t[362]||(t[362]=e("p",null,"Customizes additional content in a calendar cell. This slot is ignored if the cell slot is used.",-1)),t[363]||(t[363]=e("p",null,"Available parameters:",-1)),t[364]||(t[364]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"cell"),l(" - The cell object with all its properties")])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[361]||(t[361]=[l(`<template #cell-content="{ cell }">
  <div class="custom-content">
    <i class="icon mdi mdi-party-popper"></i>
  </div>
</template>
`,-1)])),_:1,__:[361]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[365]||(t[365]=[e("strong",{class:"code title5"},"cell-events",-1)])),content:n(()=>[t[367]||(t[367]=e("p",null,"Customizes how events are displayed within a cell. This slot is ignored if the cell slot is used.",-1)),t[368]||(t[368]=e("p",null,"Available parameters:",-1)),t[369]||(t[369]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"cell"),l(" - The cell object containing the events array")])],-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[366]||(t[366]=[l(`<template #cell-events="{ cell }">
  <div v-for="event in cell.events" class="custom-event">
    `+r("{{ event.title }}")+" ("+r("{{ event.start.formatTime() }}")+`)
  </div>
</template>
`,-1)])),_:1,__:[366]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[370]||(t[370]=[e("strong",{class:"code title5"},"event",-1)])),content:n(()=>[t[372]||(t[372]=e("p",null,"Customizes the display of individual events. This slot is ignored if the cell-events slot is used.",-1)),t[373]||(t[373]=e("p",null,"Available parameters:",-1)),t[374]||(t[374]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"event"),l(" - The full event object")])],-1)),t[375]||(t[375]=e("p",null,"This allows you to access any custom properties you've added to your events.",-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[371]||(t[371]=[l(`<template #event="{ event }">
  <div class="custom-event-content">
    <i v-if="event.icon" :class="event.icon"></i>
    <div class="title">`+r("{{ event.title }}")+`</div>
    <div v-if="event.location" class="location">
      <i class="mdi mdi-map-marker"></i> `+r("{{ event.location }}")+`
    </div>
  </div>
</template>
`,-1)])),_:1,__:[371]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[376]||(t[376]=[e("strong",{class:"code title5"},"event.all-day",-1)])),content:n(()=>[t[378]||(t[378]=e("p",null,"Customizes the display of all-day events. This slot is ignored if the cell-events slot is used.",-1)),t[379]||(t[379]=e("p",null,"Available parameters:",-1)),t[380]||(t[380]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"event"),l(" - The full event object")])],-1)),t[381]||(t[381]=e("p",null,"This allows you to access any custom properties you've added to your events.",-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[377]||(t[377]=[l(`<template #event.all-day="{ event }">
  <div class="custom-event-content">
    <i v-if="event.icon" :class="event.icon"></i>
    <div class="title">`+r("{{ event.title }}")+`</div>
    <div v-if="event.location" class="location">
      <i class="mdi mdi-map-marker"></i> `+r("{{ event.location }}")+`
    </div>
  </div>
</template>
`,-1)])),_:1,__:[377]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[382]||(t[382]=[e("strong",{class:"code title5"},"event.[view]",-1)])),content:n(()=>[t[384]||(t[384]=e("p",null,[l("Customizes the display of events in a specific view where "),e("code",null,"[view]"),l(" is one of: day, days, week, month, year, years."),e("br"),l("This slot is ignored if the cell-events slot is used.")],-1)),t[385]||(t[385]=e("p",null,"Available parameters:",-1)),t[386]||(t[386]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"event"),l(" - The full event object")])],-1)),t[387]||(t[387]=e("p",null,"This allows you to access any custom properties you've added to your events.",-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[383]||(t[383]=[l(`<template #event.day="{ event }">
  <div class="custom-event-content">
    <i v-if="event.icon" :class="event.icon"></i>
    <div class="title">`+r("{{ event.title }}")+`</div>
    <div v-if="event.location" class="location">
      <i class="mdi mdi-map-marker"></i> `+r("{{ event.location }}")+`
    </div>
  </div>
</template>
`,-1)])),_:1,__:[383]},8,["dark"])]),_:1}),s(o,null,{title:n(()=>t[388]||(t[388]=[e("strong",{class:"code title5"},"event-count",-1)])),content:n(()=>[t[390]||(t[390]=e("p",null,[l("Customizes the event count display when the "),e("code",null,"event-count"),l(" prop is enabled.")],-1)),t[391]||(t[391]=e("p",null,"Available parameters:",-1)),t[392]||(t[392]=e("ul",null,[e("li",null,[e("code",{class:"base-color"},"events"),l(" - Array of events in the cell")])],-1)),t[393]||(t[393]=e("p",null,"This allows you to modify how events are counted or displayed, such as counting only specific types of events.",-1)),s(d,{language:"html-vue",dark:a(i).darkMode},{default:n(()=>t[389]||(t[389]=[l(`<template #event-count="{ events }">
  <div v-if="events.length" class="custom-events-count">
    `+r("{{ events.filter(e => e.class === 'important').length }}")+` important
    /
    `+r("{{ events.length }}")+` total
  </div>
</template>`,-1)])),_:1,__:[389]},8,["dark"])]),_:1})]),_:1},8,["modelValue"])],64)}}};export{Z as default};
