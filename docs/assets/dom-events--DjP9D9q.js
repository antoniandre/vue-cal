import{u as A,r as m,x as C,I as B,b as $,f as i,w as s,h as n,e as t,a as p,t as g,g as v,F as z,j as N,y as k,d as D}from"./index-CO4Yi1Hg.js";import"./index-Gu1HK7zW.js";import{_ as y}from"./index-Ci46mqR3.js";const j={class:"ml1 text-bold",href:"https://https://vuejs.org/guide/essentials/event-handling.html",target:"_blank"},U={class:"logs-box bd1 bdrs2 ovh"},H={class:"w-flex wrap align-center justify-end ml2 mr1"},O={class:"example mt6 mb2 mxa"},R={class:"mxa my2",style:{"max-width":"500px"}},W={class:"w-flex gap2 basis-zero"},Y={class:"w-flex gap2 my2 basis-zero"},L={class:"code"},P={class:"code"},F={class:"w-flex align-center justify-center wrap gap2"},K={__name:"dom-events",setup(I){const c=A(),d=m("week"),E=m(null),T=[{start:"2018-10-30 10:30",end:"2018-10-30 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-16 10:30",end:"2018-11-16 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 10:35",end:"2018-11-19 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 18:30",end:"2018-11-19 19:15",title:"Dentist appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:2},{start:"2018-11-20 18:30",end:"2018-11-20 20:30",title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:"2018-11-21 11:00",end:"2018-11-21 13:00",title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-coffee-outline"></i>',class:"leisure",schedule:1,background:!1},{start:"2018-11-21 19:30",end:"2018-11-21 23:00",title:"Swimming lesson",content:'<i class="w-icon mdi mdi-pool"></i>',class:"sport",schedule:2},{start:"2018-11-23 12:30",end:"2018-11-23 13:00",title:"Macca's with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:"2018-11-23 21:00",end:"2018-11-23 23:30",title:"Movie time",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:"2018-11-30 21:00",end:"2018-11-30 23:30",title:"Another movie tonight",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1}],M=m(null),o=C({expandedEmittedEvents:m(Array(30).fill(!1)),logs:m([]),clearEventsLog:()=>o.logs=[],logMouseEvents:m(!1),logEvents:(w,e)=>{var f;if(!o.logMouseEvents&&w.includes("-mouse"))return!0;e.cell&&(e.cell={...e.cell,events:e.cell.events.value}),e.e&&(e.e=`[${e.e.constructor.name}]`),o.logs.push({name:w,args:JSON.stringify(e,null,2)});const r=(f=M.value)==null?void 0:f.$el;return B(()=>{var b;return(b=r==null?void 0:r.scrollTo)==null?void 0:b.call(r,{top:r.scrollHeight,behavior:"smooth"})}),!0}});C({});const u=C({selectedDate:m(null),viewDate:m(null)});return(w,e)=>{const r=p("w-icon"),f=p("alert"),b=p("router-link"),a=p("w-button"),S=p("ssh-pre"),x=p("example");return D(),$(z,null,[i(x,{title:"Vue Cal Emitted Events",anchor:"emitted-events"},{desc:s(()=>[e[52]||(e[52]=t("p",{class:"mb0"},[n("Vue Cal emits events that you can listen to, to trigger an action outside of Vue Cal."),t("br")],-1)),i(f,null,{default:s(()=>[e[44]||(e[44]=n("If you are not familiar with Vue JS events, you should read about it in the")),t("a",j,[e[43]||(e[43]=n("official Vue documentation.")),i(r,{class:"ml1",color:"primary"},{default:s(()=>e[42]||(e[42]=[n("mdi mdi-open-in-new")])),_:1})])]),_:1}),t("p",null,[e[46]||(e[46]=n(`Here is a quick list of all the events that Vue Cal emits, but you can find more details in the
`)),i(b,{to:"/api#emitted-events"},{default:s(()=>e[45]||(e[45]=[n("emitted events section")])),_:1}),e[47]||(e[47]=n("."))]),e[53]||(e[53]=t("ul",null,[t("li",null,[t("code",null,"ready")]),t("li",null,[t("code",null,"view-change")]),t("li",null,[t("code",null,"cell-*")]),t("li",null,[t("code",null,"cell-delayed-click")]),t("li",null,[t("code",null,"cell-drag-start")]),t("li",null,[t("code",null,"cell-drag")]),t("li",null,[t("code",null,"cell-drag-end")]),t("li",null,[t("code",null,"cell-hold")]),t("li",null,[t("code",null,"event-*")]),t("li",null,[t("code",null,"event-delayed-click")]),t("li",null,[t("code",null,"event-drag-start")]),t("li",null,[t("code",null,"event-drag")]),t("li",null,[t("code",null,"event-drag-end")]),t("li",null,[t("code",null,"event-hold")]),t("li",null,[t("code",null,"event-create")]),t("li",null,[t("code",null,"event-created")]),t("li",null,[t("code",null,"event-delete")]),t("li",null,[t("code",null,"event-resize")]),t("li",null,[t("code",null,"event-resize-end")]),t("li",null,[t("code",null,"event-drop")]),t("li",null,[t("code",null,"event-dropped")])],-1)),e[54]||(e[54]=t("p",{class:"mt4 mb0"},`Better than theory, try interacting with Vue Cal below and observe the emitted events in real-time
in this logs box:`,-1)),e[55]||(e[55]=t("div",{class:"caption lh0 my1"},[n("The "),t("span",{class:"code"},"event-drag"),n(" event logging is disabled for performance reasons (too many events).")],-1)),t("div",U,[t("div",H,[e[50]||(e[50]=t("div",{class:"grey"},[n("// "),t("strong",null,"event-name: "),t("span",null,"{ arguments }")],-1)),e[51]||(e[51]=t("div",{class:"spacer"},null,-1)),i(a,{class:"mt1 mr1",outline:"",sm:"",onClick:e[0]||(e[0]=l=>o.logMouseEvents=!o.logMouseEvents),tooltip:"Will also log events on<br><code>cell-mousemove</code>, <code>cell-mouseenter</code>, <code>cell-mouseleave</code>.","tooltip-props":{alignRight:!0}},{default:s(()=>[i(r,{class:"mr1"},{default:s(()=>[n("mdi mdi-"+g(o.logMouseEvents?"trash-can-outline":"plus"),1)]),_:1}),n(g(o.logMouseEvents?"remove":"Add")+" Mouse Move & Hover Events",1)]),_:1}),i(a,{class:"mt1",outline:"",sm:"",onClick:o.clearEventsLog},{default:s(()=>[i(r,{class:"mr1",xs:""},{default:s(()=>e[48]||(e[48]=[n("mdi mdi-trash-can-outline")])),_:1}),e[49]||(e[49]=n("Clear Logs"))]),_:1},8,["onClick"])]),i(S,{class:"ma0 py0 scrollable",ref_key:"logsBoxEl",ref:M,language:"js",dark:v(c).darkMode},{default:s(()=>[(D(!0),$(z,null,N(o.logs,(l,V)=>(D(),$("div",{class:"mt1",key:V},g(V?`

`:"")+g(l.name)+": "+g(l.args),1))),128))]),_:1},8,["dark"])]),t("div",O,[i(v(y),{dark:v(c).darkMode,"time-from":7*60,"time-to":23*60,views:["day","week","month"],"editable-events":"",events:T,onReady:e[1]||(e[1]=l=>o.logEvents("ready",l)),onViewChange:e[2]||(e[2]=l=>o.logEvents("view-change",l)),onEventCreate:o.open,onEventMousedown:e[3]||(e[3]=l=>o.logEvents("event-mousedown",l)),onEventMouseup:e[4]||(e[4]=l=>o.logEvents("event-mouseup",l)),onEventClick:e[5]||(e[5]=l=>o.logEvents("event-click",l)),onEventDblclick:e[6]||(e[6]=l=>o.logEvents("event-dblclick",l)),onEventHold:e[7]||(e[7]=l=>o.logEvents("event-hold",l)),onEventDragStart:e[8]||(e[8]=l=>o.logEvents("event-drag-start",l)),onEventDrag:l=>!0,onEventDragEnd:e[9]||(e[9]=l=>o.logEvents("event-drag-end",l)),onEventDrop:e[10]||(e[10]=l=>o.logEvents("event-drop",l)),onEventResize:e[11]||(e[11]=l=>o.logEvents("event-resize",l)),onEventResizeEnd:e[12]||(e[12]=l=>o.logEvents("event-resize-end",l)),onEventContextmenu:e[13]||(e[13]=l=>o.logEvents("event-contextmenu",l)),onCellClick:e[14]||(e[14]=l=>o.logEvents("cell-click",l)),onCellDblclick:e[15]||(e[15]=l=>o.logEvents("cell-dblclick",l)),onCellDragStart:e[16]||(e[16]=l=>o.logEvents("cell-drag-start",l)),onCellDrag:e[17]||(e[17]=l=>o.logEvents("cell-drag",l)),onCellDragEnd:e[18]||(e[18]=l=>o.logEvents("cell-drag-end",l)),onCellHold:e[19]||(e[19]=l=>o.logEvents("cell-hold",l)),onCellMousemove:e[20]||(e[20]=l=>o.logMouseEvents&&o.logEvents("cell-mousemove",l)),onCellMouseenter:e[21]||(e[21]=l=>o.logMouseEvents&&o.logEvents("cell-mouseenter",l)),onCellMouseleave:e[22]||(e[22]=l=>o.logMouseEvents&&o.logEvents("cell-mouseleave",l)),onCellMousedown:e[23]||(e[23]=l=>o.logEvents("cell-mousedown",l)),onCellMouseup:e[24]||(e[24]=l=>o.logEvents("cell-mouseup",l)),onCellTouchstart:e[25]||(e[25]=l=>o.logEvents("cell-touchstart",l)),onCellContextmenu:e[26]||(e[26]=l=>o.logEvents("cell-contextmenu",l))},null,8,["dark","onEventCreate"])])]),"code-html":s(()=>e[56]||(e[56]=[n(`<vue-cal
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
`)])),_:1}),i(x,{title:"External Controls & use of Vue Cal Methods",anchor:"external-controls"},{desc:s(()=>[e[73]||(e[73]=t("p",null,[n("You can access any "),t("strong",null,"Vue Cal"),n(" internal method through Vue refs."),t("br"),n(`
This example shows how to control the Previous, Next and Today functions and the view selections
from external buttons.`),t("br"),n(`
One important thing to notice is that you can use a v-model on the `),t("span",{class:"code"},"view"),n(" (or "),t("span",{class:"code"},":view.sync"),n(` for Vue 2)
in order to keep your variable updated when Vue Cal changes the view internally. For instance when you click the title to go
to a broader view.`),t("br"),n(`
A v-model can also be used on the `),t("span",{class:"code"},"selected-date"),n(" (or "),t("span",{class:"code"},":selected-date.sync"),n(` for Vue 2)
`)],-1)),t("div",R,[t("div",W,[i(a,k({class:"px2 grow"},{[d.value==="day"?"bg-color":"color"]:"primary-dark1"},{outline:d.value!=="day",onClick:e[27]||(e[27]=l=>d.value="day")}),{default:s(()=>e[57]||(e[57]=[n("Day")])),_:1},16,["outline"]),i(a,k({class:"px2 grow"},{[d.value==="week"?"bg-color":"color"]:"primary-dark1"},{outline:d.value!=="week",onClick:e[28]||(e[28]=l=>d.value="week")}),{default:s(()=>e[58]||(e[58]=[n("Week")])),_:1},16,["outline"]),i(a,k({class:"px2 grow"},{[d.value==="month"?"bg-color":"color"]:"primary-dark1"},{outline:d.value!=="month",onClick:e[29]||(e[29]=l=>d.value="month")}),{default:s(()=>e[59]||(e[59]=[n("Month")])),_:1},16,["outline"]),i(a,k({class:"px2 grow"},{[d.value==="year"?"bg-color":"color"]:"primary-dark1"},{outline:d.value!=="year",onClick:e[30]||(e[30]=l=>d.value="year")}),{default:s(()=>e[60]||(e[60]=[n("Year")])),_:1},16,["outline"]),i(a,k({class:"px2 grow"},{[d.value==="years"?"bg-color":"color"]:"primary-dark1"},{outline:d.value!=="years",onClick:e[31]||(e[31]=l=>d.value="years")}),{default:s(()=>e[61]||(e[61]=[n("Years")])),_:1},16,["outline"])]),t("div",Y,[i(a,{class:"grow","bg-color":"primary",onClick:e[32]||(e[32]=l=>w.$refs.vuecal4.view.previous())},{default:s(()=>[i(r,{class:"mr1"},{default:s(()=>e[62]||(e[62]=[n("mdi mdi-arrow-left")])),_:1}),e[63]||(e[63]=n("Previous"))]),_:1}),i(a,{class:"grow","bg-color":"primary",onClick:e[33]||(e[33]=l=>w.$refs.vuecal4.view.switch("day",new Date))},{default:s(()=>[i(r,{class:"mr1"},{default:s(()=>e[64]||(e[64]=[n("mdi mdi-map-marker-outline")])),_:1}),e[65]||(e[65]=n("Today"))]),_:1}),i(a,{class:"grow","bg-color":"primary",onClick:e[34]||(e[34]=l=>w.$refs.vuecal4.view.next())},{default:s(()=>[e[67]||(e[67]=n("Next")),i(r,{class:"ml1"},{default:s(()=>e[66]||(e[66]=[n("mdi mdi-arrow-right")])),_:1})]),_:1})]),i(v(y),{ref:"vuecal4",view:d.value,"onUpdate:view":e[35]||(e[35]=l=>d.value=l),"selected-date":E.value,"onUpdate:selectedDate":e[36]||(e[36]=l=>E.value=l),time:!1,"views-bar":!1,dark:v(c).darkMode,small:""},null,8,["view","selected-date","dark"])]),e[74]||(e[74]=t("p",null,[t("strong",null,"Variables kept in sync thanks to v-model:")],-1)),t("ul",null,[t("li",null,[e[68]||(e[68]=t("code",null,"view",-1)),e[69]||(e[69]=n(": ")),t("strong",L,g(d.value),1),e[70]||(e[70]=n(","))]),t("li",null,[e[71]||(e[71]=t("code",null,"selectedDate",-1)),e[72]||(e[72]=n(": ")),t("strong",P,g(E.value&&E.value.format()),1)])])]),"code-html":s(()=>e[75]||(e[75]=[n(`<button @click="view = 'day'">Day</button>
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
`)])),desc2:s(()=>[e[77]||(e[77]=t("h5",{class:"subtitle-1 font-weight-bold"},"Other useful Vue Cal internal methods & Date prototypes",-1)),i(f,{tip:""},{default:s(()=>e[76]||(e[76]=[n(`Along with these Vue Cal internal methods that you can use externally,
you can also call other useful Vue Cal methods.`),t("ul",null,[t("li",null,[t("code",null,"switchToNarrowerView()"),t("p",null,"Will drilldown the current view on selected date if there is a narrower view available.")]),t("li",null,[t("code",null,"minutesAtCursor(e)"),t("p",null,"Will return the time (in minutes) at the cursor position when a DOM event occurs.\n`e` is the DOM event.\n")])],-1),t("strong",null,[n("Useful "),t("span",{class:"code"},"Date"),n(" prototypes")],-1),t("p",null,[n(`Don't miss out on these convenient functions! Read on in the
`),t("a",{href:"date-prototypes"},[t("span",{class:"code"},"Date"),n(" prototypes section")]),n(`.
`)],-1)])),_:1})]),_:1}),i(x,{title:"Sync two vue-cal instances",anchor:"sync-two-calendars"},{desc:s(()=>e[78]||(e[78]=[t("p",null,[n(`In this example the right calendar is used as a date picker and the selected date is
updated on the left calendar via the `),t("span",{class:"code"},"@cell-focus"),n(" event listener."),t("br"),n(`
To know more about emitted events refer to the
`),t("a",{href:"#ex--emitted-events"},"emitted events example"),n(".")],-1)])),"code-html":s(()=>e[79]||(e[79]=[n(`<vue-cal
  date-picker
  :views-bar="false"
  hide-weekends
  @cell-focus="selectedDate = $event">
</vue-cal>
<vue-cal
  sm
  :time="false"
  :views-bar="false"
  view="week"
  :views="['day', 'week']"
  hide-weekends
  :selected-date="selectedDate"
  class="vuecal--blue-theme">
</vue-cal>`)])),"code-js":s(()=>e[80]||(e[80]=[n(`data: () => ({
  selectedDate: null
})`)])),desc2:s(()=>[t("div",F,[i(v(y),{"views-bar":!1,"date-picker":"","selected-date":u.selectedDate,"onUpdate:selectedDate":[e[37]||(e[37]=l=>u.selectedDate=l),e[38]||(e[38]=l=>u.viewDate=l)],"view-date":u.viewDate,dark:v(c).darkMode},null,8,["selected-date","view-date","dark"]),i(v(y),{class:"grow","view-date":u.viewDate,"onUpdate:viewDate":[e[39]||(e[39]=l=>u.viewDate=l),e[41]||(e[41]=l=>u.viewDate=l)],"selected-date":u.selectedDate,"onUpdate:selectedDate":e[40]||(e[40]=l=>u.selectedDate=l),view:"week",views:["day","week"],"views-bar":!1,dark:v(c).darkMode,sm:""},null,8,["view-date","selected-date","dark"])])]),_:1})],64)}}};export{K as default};
