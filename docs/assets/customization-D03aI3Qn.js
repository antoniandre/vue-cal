import{u as W,x as P,r as m,b as f,f as o,w as n,h as l,e as t,a as v,g as d,z as R,y as $,H as G,F as j,j as K,i as U,t as i,q as H,n as q,d as p,A as X}from"./index-BvM_WQDN.js";import{s as B}from"./index-Dwq12mQ1.js";import{_ as x}from"./index-CTpGNbK6.js";const Q={class:"ml1",href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},Z={class:"w-flex column gap1"},_=["innerHTML"],ee={class:"w-flex gap2 mla no-grow"},te=["innerHTML"],le=["innerHTML"],ne={class:"orange-light2"},se={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},oe={key:0},ae={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},ie={class:"title3 mt6"},de={class:"title3 mt6"},re={key:0},ue={key:1},me={key:2},ce={key:3},ve={key:4},pe={key:5},ge=["onClick"],fe={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},we=["innerHTML"],be={class:"vuecal__event-time"},ye={class:"title3 text-upper"},ke=["innerHTML"],he={class:"w-flex justify-space-between mt4"},xe={class:"w-flex mt6"},Te={__name:"customization",setup(Me){const u=W(),a=P({todayButton:m(!1),prevNextButtons:m(!1),nextButton:m(!1),weekdayHeading:m(!1),timeCell:m(!1),cellContent:m(!1),header:m(!1),diy:m(!1),view:m("week")}),N=[{label:"John",color:"blue",class:"schedule1"},{label:"Tom",color:"green",class:"schedule2"},{label:"Kate",color:"orange",class:"schedule3"},{label:"Jess",color:"red",class:"schedule4"}];m(null);const r=m({}),V=m(!1),D=m(!1),I=m([{label:"leisure"},{label:"sport"},{label:"health"}]),C=[{start:"2018-10-30 10:30",end:"2018-10-30 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-16 10:30",end:"2018-11-16 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 10:35",end:"2018-11-19 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 18:30",end:"2018-11-19 19:15",title:"Dentist appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:2},{start:"2018-11-20 18:30",end:"2018-11-20 20:30",title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:"2018-11-21 11:00",end:"2018-11-21 13:00",title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-coffee-outline"></i>',class:"leisure",schedule:1,background:!1},{start:"2018-11-21 19:30",end:"2018-11-21 23:00",title:"Swimming lesson",content:'<i class="w-icon mdi mdi-pool"></i>',class:"sport",schedule:2},{start:"2018-11-23 12:30",end:"2018-11-23 13:00",title:"Macca's with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:"2018-11-23 21:00",end:"2018-11-23 23:30",title:"Movie time",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:"2018-11-30 21:00",end:"2018-11-30 23:30",title:"Another movie tonight",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1}],L=C.slice(0),O=()=>{closeCreationDialog()(deleteEventFunction.value||deleteDragEventFunction.value)()},T=M=>M?M.filter(e=>e.class==="leisure").length:0;return(M,e)=>{const c=v("w-icon"),y=v("alert"),g=v("w-switch"),k=v("w-button"),z=v("w-tooltip"),h=v("example"),w=v("ssh-pre"),E=v("w-dialog"),J=v("w-input"),F=v("w-textarea"),A=v("w-select");return p(),f(j,null,[o(y,{class:"mb2"},{default:n(()=>[e[17]||(e[17]=l("If you're not familiar with slots and scoped slots, first read about it in the")),t("a",Q,[e[16]||(e[16]=t("strong",null,"official Vue documentation",-1)),o(c,{class:"primary ml1"},{default:n(()=>e[15]||(e[15]=[l("mdi mdi-open-in-new")])),_:1})]),e[18]||(e[18]=l("."))]),_:1}),o(y,null,{default:n(()=>e[19]||(e[19]=[l("Here is the list of available slots:"),t("ul",null,[t("li",null,[t("span",{class:"code"},"title")]),t("li",null,[t("span",{class:"code"},"previous-button")]),t("li",null,[t("span",{class:"code"},"next-button")]),t("li",null,[t("span",{class:"code"},"today-button")]),t("li",null,[t("span",{class:"code"},"weekday-heading")]),t("li",null,[t("span",{class:"code"},"schedule-heading")]),t("li",null,[t("span",{class:"code"},"time-cell")]),t("li",null,[t("span",{class:"code"},"week-number-cell")]),t("li",null,[t("span",{class:"code"},"cell-content")]),t("li",null,[t("span",{class:"code"},"events-count")]),t("li",null,[t("span",{class:"code"},"event")])],-1)])),_:1}),o(h,{title:"Simple Slots",anchor:"slots"},{desc:n(()=>[e[28]||(e[28]=t("div",{class:"todo-tag d-iflex"},"UPDATE THE EXAMPLE SOURCE CODE",-1)),e[29]||(e[29]=t("p",null,[l(`Vue Cal is designed to be as flexible and customizable as possible, offering a variety of slots to
help you go beyond the standard features and tailor it to your needs.`),t("br"),l(`
This example highlights the simplest and most commonly used slots.
`)],-1)),t("div",Z,[o(g,{modelValue:a.title,"onUpdate:modelValue":e[0]||(e[0]=s=>a.title=s),disabled:a.header||a.diy},{default:n(()=>e[20]||(e[20]=[l("Custom title via "),t("code",{class:"mx1"},"title",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(g,{modelValue:a.prevNextButtons,"onUpdate:modelValue":e[1]||(e[1]=s=>a.prevNextButtons=s),disabled:a.header||a.diy},{default:n(()=>e[21]||(e[21]=[l("Custom arrows via "),t("code",{class:"mx1"},"previous-button",-1),l(" & "),t("code",{class:"mx1"},"next-button",-1),l(" slots")])),_:1},8,["modelValue","disabled"]),o(g,{modelValue:a.todayButton,"onUpdate:modelValue":e[2]||(e[2]=s=>a.todayButton=s),disabled:a.header||a.diy},{default:n(()=>e[22]||(e[22]=[l("Custom today button via "),t("code",{class:"mx1"},"today-button",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(g,{modelValue:a.weekdayHeading,"onUpdate:modelValue":e[3]||(e[3]=s=>a.weekdayHeading=s),disabled:a.header||a.diy},{default:n(()=>e[23]||(e[23]=[l("Custom weekday labels via "),t("code",{class:"mx1"},"weekday-heading",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(g,{modelValue:a.header,"onUpdate:modelValue":e[4]||(e[4]=s=>a.header=s),disabled:a.diy},{default:n(()=>e[24]||(e[24]=[l("Custom header via "),t("code",{class:"mx1"},"header",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(g,{modelValue:a.timeCell,"onUpdate:modelValue":e[5]||(e[5]=s=>a.timeCell=s),disabled:a.diy},{default:n(()=>e[25]||(e[25]=[l("time cell labels via "),t("code",{class:"mx1"},"time-cell",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(g,{modelValue:a.cellContent,"onUpdate:modelValue":e[6]||(e[6]=s=>a.cellContent=s),disabled:a.diy},{default:n(()=>e[26]||(e[26]=[l("Custom cell content via "),t("code",{class:"mx1"},"cell-content",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(g,{modelValue:a.diy,"onUpdate:modelValue":e[7]||(e[7]=s=>a.diy=s)},{default:n(()=>e[27]||(e[27]=[l("DIY via "),t("code",{class:"mx1"},"diy",-1),l(" slot: you've got the power, build something nice!")])),_:1},8,["modelValue"])])]),"code-html":n(()=>e[30]||(e[30]=[l(`<vue-cal
  ref="vuecal"
  xs
  :views="['day', 'month', 'year']"
  today-button
  date-picker
  :selected-date="selectedDate">
  <!-- Optional slot for the custom button. -->
  <template #today-button>
    <!-- Using Wave UI -->
    <w-tooltip>
      <template #activator="{ on }">
        <w-btn v-on="on" icon="mdi mdi-calendar-today">
        </w-btn>
        <span>Go to Today's date</span>
      </template>
    </w-tooltip>
  </template>

  <template #title="view">
    <code v-html="view.title"></code>
  </template>

  <template #previous-button>
    <i class="icon mdi mdi-arrow-left"></i>
  </template>

  <template #next-button>
    <i class="icon mdi mdi-arrow-right"></i>
  </template>

  <template #time-cell="{ format24 }">
    <strong>`+i("{{ format24 }}")+`</strong>
  </template>

  <template #cell-content>
    <i class="icon mdi mdi-party-popper"></i>
  </template>

  <template #diy="{ vuecal, view }">
    `+i("{{ view }}")),t("br",null,null,-1),t("br",null,null,-1),l(i("{{ vuecal }}")+`
  </template>
</vue-cal>
`)])),"code-js":n(()=>e[31]||(e[31]=[l(`data: () => ({
  // Default to next new year eve.
  selectedDate: new Date(new Date().getFullYear(), 11, 31)
})
`)])),default:n(()=>[o(d(x),{class:"grow",ref:"vuecal2",dark:d(u).darkMode,"time-from":9*60,"time-to":14*60,view:a.view,"onUpdate:view":e[8]||(e[8]=s=>a.view=s),style:{overflow:"auto"}},R({_:2},[a.todayButton?{name:"today-button",fn:n(({navigate:s,active:b})=>[o(z,{left:""},{activator:n(({on:S})=>[o(k,$(G({...S,click:s}),{onClick:s,disabled:b,color:"orange-light2",text:"",icon:"mdi mdi-calendar-today","icon-props":{size:"1.2rem"}}),null,16,["onClick","disabled"])]),default:n(()=>[e[32]||(e[32]=t("span",null,"Go to Today's date",-1))]),_:2},1024)]),key:"0"}:void 0,a.header?{name:"header",fn:n(({view:s,availableViews:b})=>[t("div",{class:U(["w-flex gap2 pa1 align-center",d(u).darkMode?"orange-dark3--bg":"orange-light5--bg"])},[o(k,{color:"base-color",icon:"wi-chevron-left"}),t("div",{class:"base-color",innerHTML:s.title},null,8,_),o(k,{color:"base-color",icon:"wi-chevron-right"}),t("div",ee,[(p(!0),f(j,null,K(b,(S,Y)=>(p(),X(k,{class:"text-upper",onClick:Ce=>a.view=Y,color:"base-color",outline:s.id===Y,sm:""},{default:n(()=>[l(i(Y),1)]),_:2},1032,["onClick","outline"]))),256))])],2)]),key:"1"}:void 0,a.title?{name:"title",fn:n(({title:s})=>[t("code",{class:"orange-light2",innerHTML:s},null,8,te)]),key:"2"}:void 0,a.weekdayHeading?{name:"weekday-heading",fn:n(({label:s,id:b})=>[t("strong",{class:U(["orange-light2",b]),innerHTML:s},null,10,le)]),key:"3"}:void 0,a.prevNextButtons?{name:"previous-button",fn:n(()=>[o(c,{class:"orange-light2",md:""},{default:n(()=>e[33]||(e[33]=[l("mdi mdi-arrow-left")])),_:1})]),key:"4"}:void 0,a.prevNextButtons?{name:"next-button",fn:n(()=>[o(c,{class:"orange-light2",md:""},{default:n(()=>e[34]||(e[34]=[l("mdi mdi-arrow-right")])),_:1})]),key:"5"}:void 0,a.timeCell?{name:"time-cell",fn:n(({format24:s})=>[t("strong",ne,i(s),1)]),key:"6"}:void 0,a.cellContent?{name:"cell-content",fn:n(()=>[o(c,{class:"orange-light2",lg:""},{default:n(()=>e[35]||(e[35]=[l("mdi mdi-party-popper")])),_:1})]),key:"7"}:void 0,a.diy?{name:"diy",fn:n(({vuecal:s})=>[l(i(s),1)]),key:"8"}:void 0]),1032,["dark","view"])]),_:1}),o(h,{title:"Custom Events Count",anchor:"custom-events-count"},{desc:n(()=>[o(y,{tip:""},{default:n(()=>[e[38]||(e[38]=l("Using Vue.js scoped slots, you can also override the counting events method if you need.")),e[39]||(e[39]=t("br",null,null,-1)),e[40]||(e[40]=l(`
If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
`)),t("a",se,[e[37]||(e[37]=l("vuejs.org/guide/components/slots.htm ")),o(c,{color:"primary"},{default:n(()=>e[36]||(e[36]=[l("mdi mdi-open-in-new")])),_:1})])]),_:1}),e[41]||(e[41]=t("p",null,[l(`In the following example, we only count the events which have the custom
`),t("span",{class:"code"},"leisure"),l(" CSS class (orange color).")],-1))]),"code-html":n(()=>e[42]||(e[42]=[l(`<vue-cal
  :time-from="10 * 60"
  :time-step="2 * 60"
  date-picker
  events-count-on-year-view
  :events="events">
  <template #events-count="{ events, view }">
    <span v-if="customEventsCount(events)">
      `+i("{{ customEventsCount(events) }}")+`
    </span>
  </template>
</vue-cal>`)])),desc2:n(()=>[e[46]||(e[46]=t("p",null,[l("Alternatively, you could also use the "),t("span",{class:"code"},"cell-content"),l(` slot
instead of the `),t("span",{class:"code"},"events-count"),l(" slot to perform the same task:"),t("br"),l(`
(Refer to the next example to know more:
`),t("a",{href:"#ex--custom-title-and-cells"},"Custom title & cells"),l(")")],-1)),o(w,{class:"mt2",language:"html-vue",dark:d(u).darkMode},{default:n(()=>e[43]||(e[43]=[l(`<template #cell-content="{ cell, view, events }">
  <span class="vuecal__cell-date">
    `+i("{{ cell.content }}")+`
  </span>
  <span
    class="vuecal__cell-events-count"
    v-if="['years', 'year', 'month'].includes(view.id) && customEventsCount(events)">
    `+i("{{ customEventsCount(events) }}")+`
  </span>
</template>
`)])),_:1},8,["dark"]),o(w,{language:"js",dark:d(u).darkMode},{default:n(()=>e[44]||(e[44]=[l(`// In your Vue component.
methods: {
  customEventsCount: events => {
    return events ? events.filter(e => e.class === 'leisure').length : 0
  }
}
`)])),_:1},8,["dark"]),o(w,{language:"css",dark:d(u).darkMode},{default:n(()=>e[45]||(e[45]=[l(`.vuecal__cell-events-count {background: transparent;}
.vuecal__cell-events-count span {
  background: #fd9c42;
  height: 100%;
  min-width: 12px;
  padding: 0 3px;
  border-radius: 12px;
  display: block;
}
`)])),_:1},8,["dark"])]),default:n(()=>[o(d(x),{class:"ex--custom-events-count","selected-date":d(B)("2018-11-19"),"time-from":10*60,"time-step":2*60,"date-picker":"","events-count-on-year-view":"",dark:d(u).darkMode,events:C},{"events-count":n(({events:s,view:b})=>[T(s)?(p(),f("span",oe,i(T(s)),1)):H("",!0)]),_:1},8,["selected-date","dark"])]),_:1}),o(h,{title:"Custom Title & Cells",anchor:"custom-title-and-cells"},{desc:n(()=>[e[72]||(e[72]=t("div",{class:"todo-tag d-iflex"},"TO REVIEW",-1)),o(y,{tip:""},{default:n(()=>[e[49]||(e[49]=l("Using Vue.js scoped slots, you can override the calendar main date title and calendar cells.")),e[50]||(e[50]=t("br",null,null,-1)),e[51]||(e[51]=l(`
If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
`)),t("a",ae,[e[48]||(e[48]=l("vuejs.org/guide/components/slots.htm ")),o(c,{color:"primary"},{default:n(()=>e[47]||(e[47]=[l("mdi mdi-open-in-new")])),_:1})])]),_:1}),t("h3",ie,[o(c,{size:"22"},{default:n(()=>e[52]||(e[52]=[l("wi-chevron-right")])),_:1}),e[53]||(e[53]=l("Custom Title"))]),e[73]||(e[73]=t("p",{class:"ml2 mb2"},[l("Accessible payload through the "),t("span",{class:"code"},"#title"),l(" scoped slot:")],-1)),e[74]||(e[74]=t("ul",null,[t("li",null,[t("strong",{class:"code"},"view"),l(`:
the object containing the active view info, the precomputed formatted title, the start and end dates.`)])],-1)),e[75]||(e[75]=t("p",null,[l("If you plan a custom title, you can use the pre-formatted "),t("span",{class:"code"},"view.title"),l(" or build your own."),t("br"),l(`
The Vue Cal's Date prototypes will help you go faster.`),t("br"),l(`
Remember to handle all the different views: `),t("code",{class:"mx1"},"day"),l(", "),t("code",{class:"mx1"},"days"),l(", "),t("code",{class:"mx1"},"week"),l(`,
`),t("code",{class:"mx1"},"month"),l(", "),t("code",{class:"mx1"},"year"),l(", "),t("code",{class:"mx1"},"years"),l("."),t("br"),l(`
In the view object, you can use the `),t("code",{class:"mx1"},"view.isDay"),l(", "),t("code",{class:"mx1"},"view.isWeek"),l(`, etc. properties to
check the current view, or use `),t("code",{class:"mx1"},"view.id"),l(`.
`)],-1)),t("h3",de,[o(c,{size:"22"},{default:n(()=>e[54]||(e[54]=[l("wi-chevron-right")])),_:1}),e[55]||(e[55]=l("Custom Cells"))]),e[76]||(e[76]=t("p",{class:"ml2 mb2"},[l("Accessible payload through the "),t("span",{class:"code"},"#cell-content"),l(" scoped slot:")],-1)),e[77]||(e[77]=t("ul",null,[t("li",null,[t("span",{class:"code"},"cell"),l(", object containing the cell date range and the cell events.")])],-1)),e[78]||(e[78]=t("p",null,[l("In this example, only the cell number is clickable on month view."),t("br"),l(`
5 arguments are available through the scoped slot:`),t("br"),l(),t("span",{class:"code"},'#cell-content="{ cell, view, schedule, events, goNarrower }"')],-1)),t("ul",null,[t("li",null,[e[57]||(e[57]=t("span",{class:"code"},"cell",-1)),e[58]||(e[58]=l(", object containing the cell date.")),o(w,{class:"mt2 mb2",language:"js",dark:d(u).darkMode},{default:n(()=>e[56]||(e[56]=[l(`{
  content: {String}, // Pre-formatted cell content if any.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  formattedDate: {String}, // formatted start date. E.g. "2019-04-05".
  today: {Boolean}, // Whether the cell is today.
  broader: {Function}, // Function to navigate to broader view if possible.
  narrower: {Function}, // Function to navigate to narrower view if possible.
  broaderView: {String}, // String containing the broader view ID.
  narrowerView: {String}, // String containing the narrower view ID.
}`)])),_:1},8,["dark"])]),t("li",null,[e[60]||(e[60]=t("span",{class:"code"},"view",-1)),e[61]||(e[61]=l(", object containing the active view info.")),o(w,{class:"mt2 mb2",language:"js",dark:d(u).darkMode},{default:n(()=>e[59]||(e[59]=[l(`{
  id: {String}, // Current view, one of: years, year, month, week, day.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  selectedDate: {Date} // JavaScript Date object.
}`)])),_:1},8,["dark"])]),e[62]||(e[62]=t("li",null,[t("span",{class:"code"},"schedule"),l(", when schedules, object containing the current schedule info.")],-1)),e[63]||(e[63]=t("li",null,[t("span",{class:"code"},"events"),l(", array containing all the events of the current cell or schedule.")],-1)),e[64]||(e[64]=t("li",null,[t("span",{class:"code"},"goNarrower"),l(", function to navigate to narrower view if possible.")],-1))]),o(y,{class:"my3",info:""},{default:n(()=>[e[68]||(e[68]=l("By default a cell is rendered as follows.")),e[69]||(e[69]=t("br",null,null,-1)),e[70]||(e[70]=l(`
It is a good idea to reuse the same CSS classes as the different elements have associated styles:`)),e[71]||(e[71]=t("br",null,null,-1)),o(w,{class:"mt3 mb1",language:"html-vue",dark:d(u).darkMode},{default:n(()=>e[65]||(e[65]=[l('<div class="vuecal__flex vuecal__cell-content">')])),_:1},8,["dark"]),o(w,{class:"my2 ml5",language:"html-vue",style:{"background-color":"rgba(0, 177, 255, 0.08)"},dark:d(u).darkMode},{default:n(()=>e[66]||(e[66]=[l(`Now this is the part you can customize:

<!-- Will be added if schedules are set -->
<div class="vuecal__schedule" />
<!-- Will be added on years, year & month view -->
<div class="vuecal__cell-date" />
<!-- Will be added on month view -->
<div class="vuecal__cell-events-count" />`)])),_:1},8,["dark"]),o(w,{class:"my1",language:"html-vue",dark:d(u).darkMode},{default:n(()=>e[67]||(e[67]=[l(`    <div class="vuecal__cell-events" />
</div>`)])),_:1},8,["dark"])]),_:1})]),"code-html":n(()=>e[79]||(e[79]=[l(`<vue-cal
  :time="false"
  :dblclick-to-navigate="false"
  view="month"
  :events="events">

  <!-- Custom title -->
  <template #title="view">
    🎉
    <span v-if="view.id === 'years'">Years</span>
    <!-- Using Vue Cal injected Date prototypes -->
    <span v-else-if="view.id === 'year'">`+i("{{ view.start.format('YYYY') }}")+`</span>
    <span v-else-if="view.id === 'month'">`+i("{{ view.start.format('MMMM YYYY') }}")+`</span>
    <span v-else-if="view.id === 'week'">w`+i("{{ view.start.getWeek() }} ({{ view.start.format('MMM YYYY') }}")+`)</span>
    <span v-else-if="view.id === 'days'">`+i("{{ view.start.format('D MMMM YYYY') }}")+" - "+i("{{ view.end.format('D MMMM YYYY') }}")+`</span>
    <span v-else-if="view.id === 'day'">`+i("{{ view.start.format('dddd D MMMM YYYY') }}")+`</span>
    🎉
  </template>

  <!-- Custom cells -->
  <template #cell-content="{ cell, view, events, goNarrower }">
    <span class="vuecal__cell-date" :class="view.id" v-if="view.id === 'day'" @click="goNarrower">
      `+i("{{ cell.date.getDate() }}")+`
    </span>
    <span class="vuecal__cell-events-count" v-if="view.id === 'month' && events.length">`+i("{{ events.length }}")+`</span>
    <span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) && !events.length">Nothing here 👌</span>
  </template>
</vue-cal>`)])),desc2:n(()=>e[80]||(e[80]=[])),default:n(()=>[o(d(x),{class:"ex--custom-title-and-cells",dark:d(u).darkMode,time:!1,"dblclick-to-navigate":!1,view:"month",events:C},{title:n(s=>[e[81]||(e[81]=l("🎉 ")),s.id==="years"?(p(),f("span",re,"Years")):s.id==="year"?(p(),f("span",ue,i(s.start.format("YYYY")),1)):s.id==="month"?(p(),f("span",me,i(s.start.format("MMMM YYYY")),1)):s.id==="week"?(p(),f("span",ce,"w"+i(s.start.getWeek())+" ("+i(s.start.format("MMM YYYY"))+")",1)):s.id==="days"?(p(),f("span",ve,i(s.start.format("D MMMM YYYY"))+" - "+i(s.end.format("D MMMM YYYY")),1)):s.id==="day"?(p(),f("span",pe,i(s.start.format("dddd D MMMM YYYY")),1)):H("",!0),e[82]||(e[82]=l(" 🎉"))]),"cell-date":n(({cell:s})=>[t("button",{onClick:s.goBroader},i(s.start.format()),9,ge)]),_:1},8,["dark"])]),_:1}),o(h,{title:"Custom event Rendering",anchor:"custom-event-rendering"},{desc:n(()=>[e[87]||(e[87]=t("div",{class:"todo-tag d-iflex prod"},"TO BE UPDATED SOON",-1)),e[88]||(e[88]=t("p",{class:"mb2"},"Using Vue.js scoped slots, you can override the events rendering.",-1)),o(y,{class:"my2",tip:""},{default:n(()=>[e[85]||(e[85]=l(`If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
`)),t("a",fe,[e[84]||(e[84]=l("vuejs.org/guide/components/slots.htm ")),o(c,{color:"primary"},{default:n(()=>e[83]||(e[83]=[l("mdi mdi-open-in-new")])),_:1})]),e[86]||(e[86]=l("."))]),_:1}),e[89]||(e[89]=t("p",{class:"mb2"},"Two parameters are passed through the scoped slot:",-1)),e[90]||(e[90]=t("ul",null,[t("li",null,[t("span",{class:"code"},"event"),l(": The event full object containing dates, time, title, content and custom attributes.")]),t("li",null,[t("span",{class:"code"},"view"),l(": The current selected view id.")])],-1)),e[91]||(e[91]=t("p",{class:"mt2"},[l("You can set any custom attribute you want on an event, they will then be accessible in your custom event renderer!"),t("br"),l(`
Note that `),t("span",{class:"code"},"_eid"),l(" is a reserved keyword.")],-1))]),"code-html":n(()=>e[92]||(e[92]=[l(`<vue-cal
  :selected-date="stringToDate('2018-11-19')"
  :time-from="9 * 60"
  :time-to="19 * 60"
  hide-weekends
  :events="events">
  <template #event="{ event, view }">
    <v-icon>`+i("{{ event.icon }}")+`</v-icon>

    <div class="vuecal__event-title" v-html="event.title" />
    <!-- Or if your events are editable: -->
    <div class="vuecal__event-title vuecal__event-title--edit"
          contenteditable
          @blur="event.title = $event.target.innerHTML"
          v-html="event.title" />

    <small class="vuecal__event-time">
      <!-- Using Vue Cal Date prototypes (activated by default) -->
      <strong>Event start:</strong> <span>`+i(`{{ event.start.formatTime("h O'clock") }}`)+`</span><br/>
      <strong>Event end:</strong> <span>`+i(`{{ event.end.formatTime("h O'clock") }}`)+`</span>
    </small>
  </template>
</vue-cal>`)])),"code-js":n(()=>e[93]||(e[93]=[l(`events: [
  {
    start: '2018-11-20 14:00',
    end: '2018-11-20 18:00',
    title: 'Need to go shopping',
    icon: 'mdi mdi-cart-outline', // Custom attribute.
    class: 'leisure'
  },
  {
    start: '2018-11-22 10:00',
    end: '2018-11-22 15:00',
    title: 'Golf with John',
    icon: 'mdi mdi-golf', // Custom attribute.
    class: 'sport'
  }
]`)])),desc2:n(()=>e[94]||(e[94]=[])),default:n(()=>[o(d(x),{class:"ex--custom-event-rendering",dark:d(u).darkMode,"selected-date":d(B)("2018-11-19"),"time-from":9*60,"time-to":19*60,"hide-weekends":"",events:d(L)},{event:n(({event:s,view:b})=>[o(c,{class:"mt2",color:"white",xl:""},{default:n(()=>[l(i(s.icon),1)]),_:2},1024),t("div",{class:"vuecal__event-title mb6",innerHTML:s.title},null,8,we),t("small",be,[e[95]||(e[95]=t("strong",{class:"mr1"},"Event start:",-1)),t("span",null,i(s.start.formatTime("h O'clock")),1),e[96]||(e[96]=t("br",null,null,-1)),e[97]||(e[97]=t("strong",{class:"mr1"},"Event end:",-1)),t("span",null,i(s.end.formatTime("h O'clock")),1)])]),_:1},8,["dark","selected-date","events"])]),_:1}),o(h,{title:"Custom Day Schedules Headings",anchor:"custom-schedules-headings"},{desc:n(()=>e[98]||(e[98]=[t("p",{class:"mb6"},"You can define a custom schedule heading through slot.",-1)])),"code-html":n(()=>e[99]||(e[99]=[l(`<vue-cal
  :views="['day', 'week']"
  view="day"
  :schedules="schedules"
  :hide-weekdays="['fri', 'sat', 'sun']">
  <template #schedule-heading="{ schedule, view }">
    <i class="icon mdi mdi-account"></i>
    <strong :style="\`color: \${schedule.color}\`">`+i("{{ schedule.label }}")+`</strong>
  </template>
</vue-cal>`)])),"code-js":n(()=>e[100]||(e[100]=[l(`// In data.
customDayScheduleHeadings: [
  { label: 'John', color: 'blue', class: 'schedule1' },
  { label: 'Tom', color: 'green', class: 'schedule2' },
  { label: 'Kate', color: 'orange', class: 'schedule3' },
  { label: 'Jess', color: 'red', class: 'schedule4' }
]`)])),"code-css":n(()=>e[101]||(e[101]=[l(`.vuecal__schedule--heading {font-size: 11px;}
.vuecal__body .schedule1 {background-color: rgba(226, 242, 253, 0.7);}
.vuecal__body .schedule2 {background-color: rgba(232, 245, 233, 0.7);}
.vuecal__body .schedule3 {background-color: rgba(255, 243, 224, 0.7);}
.vuecal__body .schedule4 {background-color: rgba(255, 235, 238, 0.7);}
`)])),default:n(()=>[o(d(x),{dark:d(u).darkMode,views:["day","week"],view:"day",schedules:N,"hide-weekdays":["fri","sat","sun"]},{"schedule-heading":n(({schedule:s,view:b})=>[o(c,{color:s.color,size:"18"},{default:n(()=>e[102]||(e[102]=[l("mdi mdi-account")])),_:2},1032,["color"]),t("strong",{style:q(`color: ${s.color}`)},i(s.label),5)]),_:1},8,["dark"]),o(E,{modelValue:V.value,"onUpdate:modelValue":e[9]||(e[9]=s=>V.value=s),width:"600","dialog-class":"bdrs2","title-class":"primary--bg white py2"},{title:n(()=>[o(c,{class:"mr3"},{default:n(()=>[l(i(r.value.icon),1)]),_:1}),t("span",ye,i(r.value.title),1),e[103]||(e[103]=t("div",{class:"spacer"},null,-1)),t("strong",null,i(r.value.start&&r.value.start.format("DD/MM/YYYY")),1)]),default:n(()=>[t("p",{innerHTML:r.value.contentFull},null,8,ke),e[104]||(e[104]=t("div",{class:"text-bold mt3"},"Event details:",-1)),t("ul",null,[t("li",null,"Event starts at: "+i(r.value.start&&r.value.start.formatTime()),1),t("li",null,"Event ends at: "+i(r.value.end&&r.value.end.formatTime()),1)])]),_:1},8,["modelValue"]),o(E,{modelValue:D.value,"onUpdate:modelValue":e[14]||(e[14]=s=>D.value=s),persistent:"",width:"420","title-class":"primary--bg white px5","content-class":"pa5"},{title:n(()=>[o(J,{class:"ma0 pa0",modelValue:r.value.title,"onUpdate:modelValue":e[10]||(e[10]=s=>r.value.title=s),placeholder:"Event Title",color:"white"},null,8,["modelValue"])]),default:n(()=>[t("div",null,[o(F,{class:"pa0",modelValue:r.value.content,"onUpdate:modelValue":e[11]||(e[11]=s=>r.value.content=s),placeholder:"Event Content",rows:"3"},null,8,["modelValue"]),t("div",he,[o(A,{items:I.value,placeholder:"Event CSS Class",onInput:e[12]||(e[12]=s=>r.value.class=s),"model-value":r.value.class,style:{"max-width":"170px"}},null,8,["items","model-value"]),o(g,{class:"no-grow",modelValue:r.value.background,"onUpdate:modelValue":e[13]||(e[13]=s=>r.value.background=s),label:"Background Event","label-color":"grey"},null,8,["modelValue"])])]),t("div",xe,[e[107]||(e[107]=t("div",{class:"spacer"},null,-1)),o(k,{class:"ma1","bg-color":"light-grey",onClick:O},{default:n(()=>e[105]||(e[105]=[l("Cancel")])),_:1}),o(k,{class:"ma1",onClick:M.closeCreationDialog},{default:n(()=>e[106]||(e[106]=[l("Save")])),_:1},8,["onClick"])])]),_:1},8,["modelValue"])]),_:1})],64)}}};export{Te as default};
