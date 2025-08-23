import{u as B,r as w,x as M,J as H,b as D,f as a,w as s,h as l,e as t,a as k,t as f,g as m,F as V,j as I,A as P,q as L,y as x,d as b}from"./index-3XXseF32.js";import{s as A,c as O}from"./index-BCYqmXg2.js";import{_ as h}from"./index-CFU_uC7z.js";const W={class:"ml1 text-bold",href:"https://https://vuejs.org/guide/essentials/event-handling.html",target:"_blank"},F={class:"logs-box bd1 bdrs2 ovh"},U={class:"w-flex wrap align-center justify-end ml2 mr1"},Y={class:"example mt6 mb2 mxa"},J={class:"example mt2 mb2 mxa"},G={class:"caption text-center"},q={class:"mxa my2",style:{"max-width":"500px"}},K={class:"w-flex gap2 basis-zero"},Q={class:"w-flex gap2 my2 basis-zero"},X={class:"code"},Z={class:"code"},_={class:"w-flex align-center justify-center wrap gap2"},oe={__name:"dom-events",setup(ee){const E=B(),i=w("week"),C=w(null),N=[{start:"2018-10-30 10:30",end:"2018-10-30 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-16 10:30",end:"2018-11-16 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 10:35",end:"2018-11-19 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 18:30",end:"2018-11-19 19:15",title:"Dentist appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:2},{start:"2018-11-20 18:30",end:"2018-11-20 20:30",title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:"2018-11-21 11:00",end:"2018-11-21 13:00",title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-coffee-outline"></i>',class:"leisure",schedule:1,background:!1},{start:"2018-11-21 19:30",end:"2018-11-21 23:00",title:"Swimming lesson",content:'<i class="w-icon mdi mdi-pool"></i>',class:"sport",schedule:2},{start:"2018-11-23 12:30",end:"2018-11-23 13:00",title:"Macca's with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:"2018-11-23 21:00",end:"2018-11-23 23:30",title:"Movie time",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:"2018-11-30 21:00",end:"2018-11-30 23:30",title:"Another movie tonight",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1}],S=w(null),o=M({expandedEmittedEvents:w(Array(30).fill(!1)),logs:w([]),clearEventsLog:()=>o.logs=[],logMouseEvents:w(!1),logEvents:(r,e)=>{var g;if(!o.logMouseEvents&&r.includes("-mouse"))return!0;e.cell&&(e.cell={...e.cell,events:e.cell.events.value}),e.e&&(e.e=`[${e.e.constructor.name}]`),o.logs.push({name:r,args:JSON.stringify(e,null,2)});const d=(g=S.value)==null?void 0:g.$el;return H(()=>{var p;return(p=d==null?void 0:d.scrollTo)==null?void 0:p.call(d,{top:d.scrollHeight,behavior:"smooth"})}),!0}}),u=M({loading:!1,events:[],eventsTotal:w(0),onReady:({view:{start:r,end:e}})=>{u.events.push({title:"NAVIGATE WEEKS TO LOAD EVENTS!",start:new Date(r.addDays(3).setHours(10,0,0,0)),end:new Date(r.addDays(3).setHours(14,0,0,0))})},onViewChange:async r=>{u.loading=!0,await z(r.start.format(),r.end.format()),u.loading=!1}});M({});const c=M({selectedDate:w(null),viewDate:w(null)}),z=async(r,e)=>{await new Promise(p=>setTimeout(p,400));const d=A(r),g=A(e);u.events=j(d,g),u.eventsTotal+=u.events.length},j=(r,e)=>{const d=O(r,e),g=[];let p=0;for(let v=0;v<d;v++)for(let $=0;$<10;$++){const y=new Date(r.addDays(v).setHours(Math.floor(Math.random()*8)+9,Math.floor(Math.random()*60),0,0)),T=y.addHours(1);g.push({title:`Event ${++p}`,start:y,end:T})}return g};return(r,e)=>{const d=k("w-icon"),g=k("alert"),p=k("router-link"),v=k("w-button"),$=k("ssh-pre"),y=k("example"),T=k("w-progress");return b(),D(V,null,[a(y,{title:"Vue Cal Emitted Events",anchor:"emitted-events"},{desc:s(()=>[e[52]||(e[52]=t("p",{class:"mb0"},[l("Vue Cal emits events that you can listen to, to trigger an action outside of Vue Cal."),t("br")],-1)),a(g,null,{default:s(()=>[e[44]||(e[44]=l("If you are not familiar with Vue JS events, you should read about it in the",-1)),t("a",W,[e[43]||(e[43]=l("official Vue documentation.",-1)),a(d,{class:"ml1",color:"primary"},{default:s(()=>e[42]||(e[42]=[l("mdi mdi-open-in-new",-1)])),_:1,__:[42]})])]),_:1,__:[44]}),t("p",null,[e[46]||(e[46]=l(`Here is a quick list of all the events that Vue Cal emits, but you can find more details in the
`,-1)),a(p,{to:"/api#emitted-events"},{default:s(()=>e[45]||(e[45]=[l("emitted events section",-1)])),_:1,__:[45]}),e[47]||(e[47]=l(".",-1))]),e[53]||(e[53]=t("ul",null,[t("li",null,[t("code",null,"ready")]),t("li",null,[t("code",null,"view-change")]),t("li",null,[t("code",null,"cell-*")]),t("li",null,[t("code",null,"cell-delayed-click")]),t("li",null,[t("code",null,"cell-drag-start")]),t("li",null,[t("code",null,"cell-drag")]),t("li",null,[t("code",null,"cell-drag-end")]),t("li",null,[t("code",null,"cell-hold")]),t("li",null,[t("code",null,"event-*")]),t("li",null,[t("code",null,"event-delayed-click")]),t("li",null,[t("code",null,"event-drag-start")]),t("li",null,[t("code",null,"event-drag")]),t("li",null,[t("code",null,"event-drag-end")]),t("li",null,[t("code",null,"event-hold")]),t("li",null,[t("code",null,"event-create")]),t("li",null,[t("code",null,"event-created")]),t("li",null,[t("code",null,"event-delete")]),t("li",null,[t("code",null,"event-resize")]),t("li",null,[t("code",null,"event-resize-end")]),t("li",null,[t("code",null,"event-drop")]),t("li",null,[t("code",null,"event-dropped")])],-1)),e[54]||(e[54]=t("p",{class:"mt4 mb0"},`Better than theory, try interacting with Vue Cal below and observe the emitted events in real-time
in this logs box:`,-1)),e[55]||(e[55]=t("div",{class:"caption lh0 my1"},[l("The "),t("span",{class:"code"},"event-drag"),l(" event logging is disabled for performance reasons (too many events).")],-1)),t("div",F,[t("div",U,[e[50]||(e[50]=t("div",{class:"grey"},[l("// "),t("strong",null,"event-name: "),t("span",null,"{ arguments }")],-1)),e[51]||(e[51]=t("div",{class:"spacer"},null,-1)),a(v,{class:"mt1 mr1",outline:"",sm:"",onClick:e[0]||(e[0]=n=>o.logMouseEvents=!o.logMouseEvents),tooltip:"Will also log events on<br><code>cell-mousemove</code>, <code>cell-mouseenter</code>, <code>cell-mouseleave</code>.","tooltip-props":{alignRight:!0}},{default:s(()=>[a(d,{class:"mr1"},{default:s(()=>[l("mdi mdi-"+f(o.logMouseEvents?"trash-can-outline":"plus"),1)]),_:1}),l(f(o.logMouseEvents?"remove":"Add")+" Mouse Move & Hover Events",1)]),_:1}),a(v,{class:"mt1",outline:"",sm:"",onClick:o.clearEventsLog},{default:s(()=>[a(d,{class:"mr1",xs:""},{default:s(()=>e[48]||(e[48]=[l("mdi mdi-trash-can-outline",-1)])),_:1,__:[48]}),e[49]||(e[49]=l("Clear Logs",-1))]),_:1,__:[49]},8,["onClick"])]),a($,{class:"ma0 py0 scrollable",ref_key:"logsBoxEl",ref:S,language:"js",dark:m(E).darkMode},{default:s(()=>[(b(!0),D(V,null,I(o.logs,(n,R)=>(b(),D("div",{class:"mt1",key:R},f(R?`

`:"")+f(n.name)+": "+f(n.args),1))),128))]),_:1},8,["dark"])]),t("div",Y,[a(m(h),{dark:m(E).darkMode,"time-from":420,"time-to":1380,views:["day","week","month"],"editable-events":"",events:N,onReady:e[1]||(e[1]=n=>o.logEvents("ready",n)),onViewChange:e[2]||(e[2]=n=>o.logEvents("view-change",n)),onEventCreate:o.open,onEventMousedown:e[3]||(e[3]=n=>o.logEvents("event-mousedown",n)),onEventMouseup:e[4]||(e[4]=n=>o.logEvents("event-mouseup",n)),onEventClick:e[5]||(e[5]=n=>o.logEvents("event-click",n)),onEventDblclick:e[6]||(e[6]=n=>o.logEvents("event-dblclick",n)),onEventHold:e[7]||(e[7]=n=>o.logEvents("event-hold",n)),onEventDragStart:e[8]||(e[8]=n=>o.logEvents("event-drag-start",n)),onEventDrag:n=>!0,onEventDragEnd:e[9]||(e[9]=n=>o.logEvents("event-drag-end",n)),onEventDrop:e[10]||(e[10]=n=>o.logEvents("event-drop",n)),onEventResize:e[11]||(e[11]=n=>o.logEvents("event-resize",n)),onEventResizeEnd:e[12]||(e[12]=n=>o.logEvents("event-resize-end",n)),onEventContextmenu:e[13]||(e[13]=n=>o.logEvents("event-contextmenu",n)),onCellClick:e[14]||(e[14]=n=>o.logEvents("cell-click",n)),onCellDblclick:e[15]||(e[15]=n=>o.logEvents("cell-dblclick",n)),onCellDragStart:e[16]||(e[16]=n=>o.logEvents("cell-drag-start",n)),onCellDrag:e[17]||(e[17]=n=>o.logEvents("cell-drag",n)),onCellDragEnd:e[18]||(e[18]=n=>o.logEvents("cell-drag-end",n)),onCellHold:e[19]||(e[19]=n=>o.logEvents("cell-hold",n)),onCellMousemove:e[20]||(e[20]=n=>o.logMouseEvents&&o.logEvents("cell-mousemove",n)),onCellMouseenter:e[21]||(e[21]=n=>o.logMouseEvents&&o.logEvents("cell-mouseenter",n)),onCellMouseleave:e[22]||(e[22]=n=>o.logMouseEvents&&o.logEvents("cell-mouseleave",n)),onCellMousedown:e[23]||(e[23]=n=>o.logEvents("cell-mousedown",n)),onCellMouseup:e[24]||(e[24]=n=>o.logEvents("cell-mouseup",n)),onCellTouchstart:e[25]||(e[25]=n=>o.logEvents("cell-touchstart",n)),onCellContextmenu:e[26]||(e[26]=n=>o.logEvents("cell-contextmenu",n))},null,8,["dark","onEventCreate"])])]),"code-html":s(()=>e[56]||(e[56]=[l(`<vue-cal
  :time-from="7 * 60"
  :time-to="23 * 60"
  :views="['day', 'week', 'month']"
  editable-events
  :events="events"
  @ready="logEvents('ready', $event)"
  @view-change="logEvents('view-change', $event)"
  @event-create="open"
  @event-mousedown="logEvents('event-mousedown', $event)"
  @event-mouseup="logEvents('event-mouseup', $event)"
  @event-click="logEvents('event-click', $event)"
  @event-dblclick="logEvents('event-dblclick', $event)"
  @event-hold="logEvents('event-hold', $event)"
  @event-drag-start="logEvents('event-drag-start', $event)"
  @event-drag="logEvents('event-drag', $event)"
  @event-drag-end="logEvents('event-drag-end', $event)"
  @event-drop="logEvents('event-drop', $event)"
  @event-resize="logEvents('event-resize', $event)"
  @event-resize-end="logEvents('event-resize-end', $event)"
  @event-contextmenu="logEvents('event-contextmenu', $event)"
  @cell-click="logEvents('cell-click', $event)"
  @cell-dblclick="logEvents('cell-dblclick', $event)"
  @cell-drag-start="logEvents('cell-drag-start', $event)"
  @cell-drag="logEvents('cell-drag', $event)"
  @cell-drag-end="logEvents('cell-drag-end', $event)"
  @cell-hold="logEvents('cell-hold', $event)"
  @cell-mousemove="logEvents('cell-mousemove', $event)"
  @cell-mouseenter="logEvents('cell-mouseenter', $event)"
  @cell-mouseleave="logEvents('cell-mouseleave', $event)"
  @cell-mousedown="logEvents('cell-mousedown', $event)"
  @cell-mouseup="logEvents('cell-mouseup', $event)"
  @cell-touchstart="logEvents('cell-touchstart', $event)"
  @cell-contextmenu="logEvents('cell-contextmenu', $event)">
</vue-cal>
`,-1)])),_:1}),a(y,{title:"Loading Events from a Backend",anchor:"loading-events-from-backend"},{desc:s(()=>e[57]||(e[57]=[t("p",null,[l(`Vue Cal can easily load events from a backend service whenever the view changes.
This is particularly useful when dealing with large datasets or remote data sources.`),t("br"),l(`
In this example, we'll simulate loading events from a backend by generating random events
for the current view's date range.`)],-1),t("p",{class:"mb2"},[l("The key to this approach is listening to the "),t("span",{class:"code"},"@view-change"),l(` event, which provides
the current view's start and end dates. We can then fetch events that fall within this date range.`)],-1),t("p",{class:"mb2"},[l(`In the example below, try navigating between the weeks and observe how new events are loaded for
each week. In a real application, you would replace the `),t("span",{class:"code"},"generateRandomEvents"),l(` function
with an actual API call to your backend.
`)],-1)])),"code-html":s(()=>e[58]||(e[58]=[l(`<vue-cal
  :events="events"
  @view-change="onViewChange">
</vue-cal>
`,-1)])),"code-js":s(()=>e[59]||(e[59]=[l(`import { ref } from 'vue'
import { stringToDate, countDays } from 'vue-cal'

const events = ref([])

// This function is called whenever the calendar view changes.
const onViewChange = view => {
  // \`.format()\` is an added Date prototype by vue-cal.
  fetchEvents(view.start.format(), view.end.format())
}

// Fetch events from a backend for the given date range.
const fetchEvents = async (start, end) => {
  // In a real application, you would make an API call here.
  // For this example, we're simulating a backend response with a delay.
  console.log('Fetching events from', start, 'to', end)
  await new Promise(resolve => setTimeout(resolve, 500))

  const startDate = stringToDate(start)
  const endDate = stringToDate(end)

  // Generate random events for demonstration.
  events.value = generateRandomEvents(startDate, endDate)
}

// Generate random events for a date range (simulating backend data).
const generateRandomEvents = (startDate, endDate) => {
  const daysRange = countDays(startDate, endDate)
  const events = []
  let eventNumber = 0

  for (let i = 0; i < daysRange; i++) {
    // Create 2-3 random events per day.
    const eventsPerDay = Math.floor(Math.random() * 2) + 2

    for (let j = 0; j < eventsPerDay; j++) {
      // Random time between 9am and 5pm, events last 1 hour
      const hourStart = Math.floor(Math.random() * 8) + 9
      const minuteStart = Math.floor(Math.random() * 60)

      const start = new Date(startDate.addDays(i).setHours(hourStart, minuteStart, 0, 0))
      const end = new Date(start.getTime() + 60 * 60 * 1000) // 1 hour later

      events.push({
        title: \`Event \${++eventNumber}\`,
        start,
        end,
        class: ['health', 'sport', 'leisure'][Math.floor(Math.random() * 3)]
      })
    }
  }

  return events
}
`,-1)])),default:s(()=>[t("div",J,[a(m(h),{dark:m(E).darkMode,"time-from":540,"time-to":1080,"views-bar":!1,events:u.events,onReady:u.onReady,onViewChange:u.onViewChange,style:{height:"421px"}},null,8,["dark","events","onReady","onViewChange"]),u.loading?(b(),P(T,{key:0,class:"mt-1"})):L("",!0),t("div",G,[u.loading?(b(),D(V,{key:0},[l("Loading events...")],64)):(b(),D(V,{key:1},[l(f(u.eventsTotal)+" events loaded.",1)],64))])])]),_:1}),a(y,{title:"External Controls & use of Vue Cal Methods",anchor:"external-controls"},{desc:s(()=>[e[76]||(e[76]=t("p",null,[l("You can access any "),t("strong",null,"Vue Cal"),l(" internal method through Vue refs."),t("br"),l(`
This example shows how to control the Previous, Next and Today functions and the view selections
from external buttons.`),t("br"),l(`
One important thing to notice is that you can use a v-model on the `),t("span",{class:"code"},"view"),l(" (or "),t("span",{class:"code"},":view.sync"),l(` for Vue 2)
in order to keep your variable updated when Vue Cal changes the view internally. For instance when you click the title to go
to a broader view.`),t("br"),l(`
A v-model can also be used on the `),t("span",{class:"code"},"selected-date"),l(" (or "),t("span",{class:"code"},":selected-date.sync"),l(` for Vue 2)
`)],-1)),t("div",q,[t("div",K,[a(v,x({class:"px2 grow"},i.value==="day"&&{"bg-color":"primary-dark1",color:"white"},{outline:i.value!=="day",onClick:e[27]||(e[27]=n=>i.value="day")}),{default:s(()=>e[60]||(e[60]=[l("Day",-1)])),_:1,__:[60]},16,["outline"]),a(v,x({class:"px2 grow"},i.value==="week"&&{"bg-color":"primary-dark1",color:"white"},{outline:i.value!=="week",onClick:e[28]||(e[28]=n=>i.value="week")}),{default:s(()=>e[61]||(e[61]=[l("Week",-1)])),_:1,__:[61]},16,["outline"]),a(v,x({class:"px2 grow"},i.value==="month"&&{"bg-color":"primary-dark1",color:"white"},{outline:i.value!=="month",onClick:e[29]||(e[29]=n=>i.value="month")}),{default:s(()=>e[62]||(e[62]=[l("Month",-1)])),_:1,__:[62]},16,["outline"]),a(v,x({class:"px2 grow"},i.value==="year"&&{"bg-color":"primary-dark1",color:"white"},{outline:i.value!=="year",onClick:e[30]||(e[30]=n=>i.value="year")}),{default:s(()=>e[63]||(e[63]=[l("Year",-1)])),_:1,__:[63]},16,["outline"]),a(v,x({class:"px2 grow"},i.value==="years"&&{"bg-color":"primary-dark1",color:"white"},{outline:i.value!=="years",onClick:e[31]||(e[31]=n=>i.value="years")}),{default:s(()=>e[64]||(e[64]=[l("Years",-1)])),_:1,__:[64]},16,["outline"])]),t("div",Q,[a(v,{class:"grow","bg-color":"primary",onClick:e[32]||(e[32]=n=>r.$refs.vuecal4.view.previous())},{default:s(()=>[a(d,{class:"mr1"},{default:s(()=>e[65]||(e[65]=[l("mdi mdi-arrow-left",-1)])),_:1,__:[65]}),e[66]||(e[66]=l("Previous",-1))]),_:1,__:[66]}),a(v,{class:"grow","bg-color":"primary",onClick:e[33]||(e[33]=n=>r.$refs.vuecal4.view.switch("day",new Date))},{default:s(()=>[a(d,{class:"mr1"},{default:s(()=>e[67]||(e[67]=[l("mdi mdi-map-marker-outline",-1)])),_:1,__:[67]}),e[68]||(e[68]=l("Today",-1))]),_:1,__:[68]}),a(v,{class:"grow","bg-color":"primary",onClick:e[34]||(e[34]=n=>r.$refs.vuecal4.view.next())},{default:s(()=>[e[70]||(e[70]=l("Next",-1)),a(d,{class:"ml1"},{default:s(()=>e[69]||(e[69]=[l("mdi mdi-arrow-right",-1)])),_:1,__:[69]})]),_:1,__:[70]})]),a(m(h),{ref:"vuecal4",view:i.value,"onUpdate:view":e[35]||(e[35]=n=>i.value=n),"selected-date":C.value,"onUpdate:selectedDate":e[36]||(e[36]=n=>C.value=n),time:!1,"views-bar":!1,dark:m(E).darkMode,small:""},null,8,["view","selected-date","dark"])]),e[77]||(e[77]=t("p",null,[t("strong",null,"Variables kept in sync thanks to v-model:")],-1)),t("ul",null,[t("li",null,[e[71]||(e[71]=t("code",null,"view",-1)),e[72]||(e[72]=l(": ",-1)),t("strong",X,f(i.value),1),e[73]||(e[73]=l(",",-1))]),t("li",null,[e[74]||(e[74]=t("code",null,"selectedDate",-1)),e[75]||(e[75]=l(": ",-1)),t("strong",Z,f(C.value&&C.value.format()),1)])])]),"code-html":s(()=>e[78]||(e[78]=[l(`<button @click="view = 'day'">Day</button>
<button @click="view = 'week'">Week</button>
<button @click="view = 'month'">Month</button>
<button @click="view = 'year'">Year</button>
<button @click="view = 'years'">Years</button>
<br />
<button @click="$refs.vuecal.view.previous()">Previous</button>
<button @click="$refs.vuecal.view.switch('day', new Date())">Today</button>
<button @click="$refs.vuecal.view.next()">Next</button>

<vue-cal
  ref="vuecal"
  v-model:view="view"
  v-model:selected-date="selectedDate"
  :time="false"
  :views-bar="false"
  small>
</vue-cal>
`,-1)])),desc2:s(()=>[e[80]||(e[80]=t("h5",{class:"subtitle-1 font-weight-bold"},"Other useful Vue Cal internal methods & Date prototypes",-1)),a(g,{tip:""},{default:s(()=>e[79]||(e[79]=[l(`Along with these Vue Cal internal methods that you can use externally,
you can also call other useful Vue Cal methods.`,-1),t("ul",null,[t("li",null,[t("code",null,"switchToNarrowerView()"),t("p",null,"Will drill down the current view on selected date if there is a narrower view available.")]),t("li",null,[t("code",null,"minutesAtCursor(e)"),t("p",null,"Will return the time (in minutes) at the cursor position when a DOM event occurs.\n`e` is the DOM event.\n")])],-1),t("strong",null,[l("Useful "),t("span",{class:"code"},"Date"),l(" prototypes")],-1),t("p",null,[l(`Don't miss out on these convenient functions! Read on in the
`),t("a",{href:"date-prototypes"},[t("span",{class:"code"},"Date"),l(" prototypes section")]),l(`.
`)],-1)])),_:1,__:[79]})]),_:1}),a(y,{title:"Sync Two Vue Cal Instances",anchor:"sync-two-calendars"},{desc:s(()=>e[81]||(e[81]=[t("p",null,[l(`In this example the right calendar is used as a date picker and the selected date is
updated on the left calendar via the `),t("span",{class:"code"},"@cell-focus"),l(" event listener."),t("br"),l(`
To know more about emitted events refer to the
`),t("a",{href:"#ex--emitted-events"},"emitted events example"),l(".")],-1)])),"code-html":s(()=>e[82]||(e[82]=[l(`<vue-cal
  date-picker
  :views-bar="false"
  v-model:selected-date="selectedDate"
  @update:selected-date="viewDate = $event"
  :view-date="viewDate">
</vue-cal>

<vue-cal
  v-model:view-date="exSyncTwoCalendars.viewDate"
  v-model:selected-date="exSyncTwoCalendars.selectedDate"
  @update:view-date="exSyncTwoCalendars.viewDate = $event"
  view="week"
  :views="['day', 'week']"
  :views-bar="false"
  sm>
</vue-cal>`,-1)])),"code-js":s(()=>e[83]||(e[83]=[l("const selectedDate = ref(null)",-1)])),desc2:s(()=>[t("div",_,[a(m(h),{"date-picker":"","views-bar":!1,"selected-date":c.selectedDate,"onUpdate:selectedDate":[e[37]||(e[37]=n=>c.selectedDate=n),e[38]||(e[38]=n=>c.viewDate=n)],"view-date":c.viewDate,dark:m(E).darkMode},null,8,["selected-date","view-date","dark"]),a(m(h),{class:"grow","view-date":c.viewDate,"onUpdate:viewDate":[e[39]||(e[39]=n=>c.viewDate=n),e[41]||(e[41]=n=>c.viewDate=n)],"selected-date":c.selectedDate,"onUpdate:selectedDate":e[40]||(e[40]=n=>c.selectedDate=n),view:"week",views:["day","week"],"views-bar":!1,dark:m(E).darkMode,sm:""},null,8,["view-date","selected-date","dark"])])]),_:1})],64)}}};export{oe as default};
