import{u as $,v as A,r as m,b as w,f as o,w as n,h as l,e as t,a as c,g as i,y as G,x as K,H as P,F as E,C as R,i as U,t as d,p as H,n as q,d as g,z as Q}from"./index-CClsObxK.js";import{s as B}from"./index-DtAEW5CA.js";import{_ as h}from"./index-JyEhHvpj.js";const X={class:"ml1",href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},Z={class:"w-flex column gap1"},_=["innerHTML"],ee={class:"w-flex gap2 mla no-grow"},te=["innerHTML"],le=["innerHTML"],ne={class:"orange-light2"},se={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},oe={key:0},ae={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},de={class:"mt6 subtitle-1 font-weight-medium"},ie={class:"mt6 subtitle-1 font-weight-medium"},re={key:0},ue={key:1},me={key:2},ve={key:3},pe={key:4},ce={key:5},fe={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},ge=["innerHTML"],be={class:"vuecal__event-time"},we={class:"title3 text-upper"},ye=["innerHTML"],ke={class:"w-flex justify-space-between mt4"},Me={class:"w-flex mt6"},Ve={__name:"customization",setup(he){const r=$(),a=A({todayButton:m(!1),prevNextButtons:m(!1),nextButton:m(!1),weekdayHeading:m(!1),timeCell:m(!1),cellContent:m(!1),header:m(!1),diy:m(!1),view:m("week")}),N=[{label:"John",color:"blue",class:"schedule1"},{label:"Tom",color:"green",class:"schedule2"},{label:"Kate",color:"orange",class:"schedule3"},{label:"Jess",color:"red",class:"schedule4"}];m(null);const u=m({}),D=m(!1),V=m(!1),J=m([{label:"leisure"},{label:"sport"},{label:"health"}]),x=[{start:"2018-10-30 10:30",end:"2018-10-30 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-16 10:30",end:"2018-11-16 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 10:35",end:"2018-11-19 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 18:30",end:"2018-11-19 19:15",title:"Dentist appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:2},{start:"2018-11-20 18:30",end:"2018-11-20 20:30",title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:"2018-11-21 11:00",end:"2018-11-21 13:00",title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-coffee-outline"></i>',class:"leisure",schedule:1,background:!1},{start:"2018-11-21 19:30",end:"2018-11-21 23:00",title:"Swimming lesson",content:'<i class="w-icon mdi mdi-pool"></i>',class:"sport",schedule:2},{start:"2018-11-23 12:30",end:"2018-11-23 13:00",title:"Macca's with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:"2018-11-23 21:00",end:"2018-11-23 23:30",title:"Movie time",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:"2018-11-30 21:00",end:"2018-11-30 23:30",title:"Another movie tonight",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1}],z=x.slice(0),I=()=>{closeCreationDialog()(deleteEventFunction.value||deleteDragEventFunction.value)()},j=C=>C?C.filter(e=>e.class==="leisure").length:0;return(C,e)=>{const v=c("w-icon"),y=c("alert"),b=c("w-switch"),k=c("w-button"),L=c("w-tooltip"),M=c("example"),p=c("ssh-pre"),S=c("w-dialog"),W=c("w-input"),F=c("w-textarea"),O=c("w-select");return g(),w(E,null,[o(y,{class:"mb2"},{default:n(()=>[e[17]||(e[17]=l("If you're not familiar with slots and scoped slots, first read about it in the")),t("a",X,[e[16]||(e[16]=t("strong",null,"official Vue documentation",-1)),o(v,{class:"primary ml1"},{default:n(()=>e[15]||(e[15]=[l("mdi mdi-open-in-new")])),_:1})]),e[18]||(e[18]=l("."))]),_:1}),o(y,null,{default:n(()=>e[19]||(e[19]=[l("Here is the list of available slots:"),t("ul",null,[t("li",null,[t("span",{class:"code"},"title")]),t("li",null,[t("span",{class:"code"},"previous-button")]),t("li",null,[t("span",{class:"code"},"next-button")]),t("li",null,[t("span",{class:"code"},"today-button")]),t("li",null,[t("span",{class:"code"},"weekday-heading")]),t("li",null,[t("span",{class:"code"},"schedule-heading")]),t("li",null,[t("span",{class:"code"},"time-cell")]),t("li",null,[t("span",{class:"code"},"week-number-cell")]),t("li",null,[t("span",{class:"code"},"cell-content")]),t("li",null,[t("span",{class:"code"},"events-count")]),t("li",null,[t("span",{class:"code"},"event")])],-1)])),_:1}),o(M,{title:"Simple Slots",anchor:"slots"},{desc:n(()=>[e[28]||(e[28]=t("p",null,[l(`Vue Cal is designed to be as flexible and customizable as possible, offering a variety of slots to
help you go beyond the standard features and tailor it to your needs.`),t("br"),l(`
This example highlights the simplest and most commonly used slots.
`)],-1)),t("div",Z,[o(b,{modelValue:a.title,"onUpdate:modelValue":e[0]||(e[0]=s=>a.title=s),disabled:a.header||a.diy},{default:n(()=>e[20]||(e[20]=[l("Custom title via "),t("code",{class:"mx1"},"title",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(b,{modelValue:a.prevNextButtons,"onUpdate:modelValue":e[1]||(e[1]=s=>a.prevNextButtons=s),disabled:a.header||a.diy},{default:n(()=>e[21]||(e[21]=[l("Custom arrows via "),t("code",{class:"mx1"},"previous-button",-1),l(" & "),t("code",{class:"mx1"},"next-button",-1),l(" slots")])),_:1},8,["modelValue","disabled"]),o(b,{modelValue:a.todayButton,"onUpdate:modelValue":e[2]||(e[2]=s=>a.todayButton=s),disabled:a.header||a.diy},{default:n(()=>e[22]||(e[22]=[l("Custom today button via "),t("code",{class:"mx1"},"today-button",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(b,{modelValue:a.weekdayHeading,"onUpdate:modelValue":e[3]||(e[3]=s=>a.weekdayHeading=s),disabled:a.header||a.diy},{default:n(()=>e[23]||(e[23]=[l("Custom weekday labels via "),t("code",{class:"mx1"},"weekday-heading",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(b,{modelValue:a.header,"onUpdate:modelValue":e[4]||(e[4]=s=>a.header=s),disabled:a.diy},{default:n(()=>e[24]||(e[24]=[l("Custom header via "),t("code",{class:"mx1"},"header",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(b,{modelValue:a.timeCell,"onUpdate:modelValue":e[5]||(e[5]=s=>a.timeCell=s),disabled:a.diy},{default:n(()=>e[25]||(e[25]=[l("time cell labels via "),t("code",{class:"mx1"},"time-cell",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(b,{modelValue:a.cellContent,"onUpdate:modelValue":e[6]||(e[6]=s=>a.cellContent=s),disabled:a.diy},{default:n(()=>e[26]||(e[26]=[l("Custom cell content via "),t("code",{class:"mx1"},"cell-content",-1),l(" slot")])),_:1},8,["modelValue","disabled"]),o(b,{modelValue:a.diy,"onUpdate:modelValue":e[7]||(e[7]=s=>a.diy=s)},{default:n(()=>e[27]||(e[27]=[l("DIY via "),t("code",{class:"mx1"},"diy",-1),l(" slot: you've got the power, build something nice!")])),_:1},8,["modelValue"])])]),"code-html":n(()=>e[29]||(e[29]=[l(`<vue-cal
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

  <template #title="{ title }">
    <code v-html="title"></code>
  </template>

  <template #previous-button>
    <i class="icon mdi mdi-arrow-left"></i>
  </template>

  <template #next-button>
    <i class="icon mdi mdi-arrow-right"></i>
  </template>

  <template #time-cell="{ format24 }">
    <strong>`+d("{{ format24 }}")+`</strong>
  </template>

  <template #cell-content>
    <i class="icon mdi mdi-party-popper"></i>
  </template>

  <template #diy="{ vuecal, view }">
    `+d("{{ view }}")),t("br",null,null,-1),t("br",null,null,-1),l(d("{{ vuecal }}")+`
  </template>
</vue-cal>
`)])),"code-js":n(()=>e[30]||(e[30]=[l(`data: () => ({
  // Default to next new year eve.
  selectedDate: new Date(new Date().getFullYear(), 11, 31)
})
`)])),default:n(()=>[o(i(h),{class:"grow",ref:"vuecal2",dark:i(r).darkMode,"time-from":9*60,"time-to":14*60,view:a.view,"onUpdate:view":e[8]||(e[8]=s=>a.view=s),style:{overflow:"auto"}},G({_:2},[a.todayButton?{name:"today-button",fn:n(({navigate:s,active:f})=>[o(L,{left:""},{activator:n(({on:T})=>[o(k,K(P({...T,click:s}),{onClick:s,disabled:f,color:"orange-light2",text:"",icon:"mdi mdi-calendar-today","icon-props":{size:"1.2rem"}}),null,16,["onClick","disabled"])]),default:n(()=>[e[31]||(e[31]=t("span",null,"Go to Today's date",-1))]),_:2},1024)]),key:"0"}:void 0,a.header?{name:"header",fn:n(({view:s,availableViews:f})=>[t("div",{class:U(["w-flex gap2 pa1 align-center",i(r).darkMode?"orange-dark3--bg":"orange-light5--bg"])},[o(k,{color:"base-color",icon:"wi-chevron-left"}),t("div",{class:"base-color",innerHTML:s.title},null,8,_),o(k,{color:"base-color",icon:"wi-chevron-right"}),t("div",ee,[(g(!0),w(E,null,R(f,(T,Y)=>(g(),Q(k,{class:"text-upper",onClick:Ce=>a.view=Y,color:"base-color",outline:s.id===Y,sm:""},{default:n(()=>[l(d(Y),1)]),_:2},1032,["onClick","outline"]))),256))])],2)]),key:"1"}:void 0,a.title?{name:"title",fn:n(({title:s})=>[t("code",{class:"orange-light2",innerHTML:s},null,8,te)]),key:"2"}:void 0,a.weekdayHeading?{name:"weekday-heading",fn:n(({label:s,id:f})=>[t("strong",{class:U(["orange-light2",f]),innerHTML:s},null,10,le)]),key:"3"}:void 0,a.prevNextButtons?{name:"previous-button",fn:n(()=>[o(v,{class:"orange-light2",md:""},{default:n(()=>e[32]||(e[32]=[l("mdi mdi-arrow-left")])),_:1})]),key:"4"}:void 0,a.prevNextButtons?{name:"next-button",fn:n(()=>[o(v,{class:"orange-light2",md:""},{default:n(()=>e[33]||(e[33]=[l("mdi mdi-arrow-right")])),_:1})]),key:"5"}:void 0,a.timeCell?{name:"time-cell",fn:n(({format24:s})=>[t("strong",ne,d(s),1)]),key:"6"}:void 0,a.cellContent?{name:"cell-content",fn:n(()=>[o(v,{class:"orange-light2",lg:""},{default:n(()=>e[34]||(e[34]=[l("mdi mdi-party-popper")])),_:1})]),key:"7"}:void 0,a.diy?{name:"diy",fn:n(({vuecal:s,view:f})=>[l(d(f),1),e[35]||(e[35]=t("br",null,null,-1)),e[36]||(e[36]=t("br",null,null,-1)),l(d(s),1)]),key:"8"}:void 0]),1032,["dark","view"])]),_:1}),o(M,{title:"Custom Events Count",anchor:"custom-events-count"},{desc:n(()=>[o(y,{tip:""},{default:n(()=>[e[39]||(e[39]=l("Using Vue.js scoped slots, you can also override the counting events method if you need.")),e[40]||(e[40]=t("br",null,null,-1)),e[41]||(e[41]=l(`
If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
`)),t("a",se,[e[38]||(e[38]=l("vuejs.org/guide/components/slots.htm ")),o(v,{color:"primary"},{default:n(()=>e[37]||(e[37]=[l("mdi mdi-open-in-new")])),_:1})])]),_:1}),e[42]||(e[42]=t("p",null,[l(`In the following example, we only count the events which have the custom
`),t("span",{class:"code"},"leisure"),l(" CSS class (orange color).")],-1))]),"code-html":n(()=>e[43]||(e[43]=[l(`<vue-cal
  :time-from="10 * 60"
  :time-step="2 * 60"
  date-picker
  events-count-on-year-view
  :events="events">
  <template #events-count="{ events, view }">
    <span v-if="customEventsCount(events)">
      `+d("{{ customEventsCount(events) }}")+`
    </span>
  </template>
</vue-cal>`)])),desc2:n(()=>[e[47]||(e[47]=t("p",null,[l("Alternatively, you could also use the "),t("span",{class:"code"},"cell-content"),l(` slot
instead of the `),t("span",{class:"code"},"events-count"),l(" slot to perform the same task:"),t("br"),l(`
(Refer to the next example to know more:
`),t("a",{href:"#ex--custom-title-and-cells"},"Custom title & cells"),l(")")],-1)),o(p,{class:"mt2",language:"html-vue",dark:i(r).darkMode},{default:n(()=>e[44]||(e[44]=[l(`<template #cell-content="{ cell, view, events }">
  <span class="vuecal__cell-date">
    `+d("{{ cell.content }}")+`
  </span>
  <span
    class="vuecal__cell-events-count"
    v-if="['years', 'year', 'month'].includes(view.id) && customEventsCount(events)">
    `+d("{{ customEventsCount(events) }}")+`
  </span>
</template>
`)])),_:1},8,["dark"]),o(p,{language:"js",dark:i(r).darkMode},{default:n(()=>e[45]||(e[45]=[l(`// In your Vue component.
methods: {
  customEventsCount: events => {
    return events ? events.filter(e => e.class === 'leisure').length : 0
  }
}
`)])),_:1},8,["dark"]),o(p,{language:"css",dark:i(r).darkMode},{default:n(()=>e[46]||(e[46]=[l(`.vuecal__cell-events-count {background: transparent;}
.vuecal__cell-events-count span {
  background: #fd9c42;
  height: 100%;
  min-width: 12px;
  padding: 0 3px;
  border-radius: 12px;
  display: block;
}
`)])),_:1},8,["dark"])]),default:n(()=>[o(i(h),{class:"ex--custom-events-count","selected-date":i(B)("2018-11-19"),"time-from":10*60,"time-step":2*60,"date-picker":"","events-count-on-year-view":"",dark:i(r).darkMode,events:x},{"events-count":n(({events:s,view:f})=>[j(s)?(g(),w("span",oe,d(j(s)),1)):H("",!0)]),_:1},8,["selected-date","dark"])]),_:1}),o(M,{title:"Custom Title & Cells",anchor:"custom-title-and-cells"},{desc:n(()=>[o(y,{tip:""},{default:n(()=>[e[50]||(e[50]=l("Using Vue.js scoped slots, you can override the calendar main date title and calendar cells.")),e[51]||(e[51]=t("br",null,null,-1)),e[52]||(e[52]=l(`
If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
`)),t("a",ae,[e[49]||(e[49]=l("vuejs.org/guide/components/slots.htm ")),o(v,{color:"primary"},{default:n(()=>e[48]||(e[48]=[l("mdi mdi-open-in-new")])),_:1})])]),_:1}),t("h5",de,[o(v,{size:"22"},{default:n(()=>e[53]||(e[53]=[l("mdi mdi-arrow-right")])),_:1}),e[54]||(e[54]=l("Custom title"))]),e[77]||(e[77]=t("p",{class:"ml2 mb2"},[l("2 arguments are available through the scoped slot: "),t("span",{class:"code"},'#title="{ title, view }"')],-1)),t("ul",null,[e[58]||(e[58]=t("li",null,[t("span",{class:"code"},"title"),l(", the formatted title (different on all the views). E.g."),t("em",{class:"ml2"},'"Week 2 (January 2019)"')],-1)),t("li",null,[e[56]||(e[56]=t("span",{class:"code"},"view",-1)),e[57]||(e[57]=l(", an object containing the active view info.")),o(p,{class:"mt2 mb3",language:"js",dark:i(r).darkMode},{default:n(()=>e[55]||(e[55]=[l(`{
  id: {String}, // Current view, one of: years, year, month, week, day.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  selectedDate: {Date} // JavaScript Date object.
}`)])),_:1},8,["dark"])])]),e[78]||(e[78]=t("p",null,[l("You can use one or the other to format the title as you wish."),t("br"),l(`
Using the pre-formatted `),t("span",{class:"code"},"title"),l(" will be easy but not very flexible."),t("br"),l(`
If you render the date yourself from `),t("span",{class:"code"},"view.start"),l(`, don't forget
the different formats for all the views: years, year, month, week, day.
`)],-1)),t("h5",ie,[o(v,{size:"22"},{default:n(()=>e[59]||(e[59]=[l("mdi mdi-arrow-right")])),_:1}),e[60]||(e[60]=l("Custom cells"))]),e[79]||(e[79]=t("p",{class:"ml2 mb2"},[l("In this example, only the cell number is clickable on month view."),t("br"),l(`
5 arguments are available through the scoped slot:`),t("br"),l(),t("span",{class:"code"},'#cell-content="{ cell, view, schedule, events, goNarrower }"')],-1)),t("ul",null,[t("li",null,[e[62]||(e[62]=t("span",{class:"code"},"cell",-1)),e[63]||(e[63]=l(", object containing the cell date.")),o(p,{class:"mt2 mb2",language:"js",dark:i(r).darkMode},{default:n(()=>e[61]||(e[61]=[l(`{
  content: {String}, // Pre-formatted cell content if any.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  formattedDate: {String}, // formatted start date. E.g. "2019-04-05".
  today: {Boolean}
}`)])),_:1},8,["dark"])]),t("li",null,[e[65]||(e[65]=t("span",{class:"code"},"view",-1)),e[66]||(e[66]=l(", object containing the active view info.")),o(p,{class:"mt2 mb2",language:"js",dark:i(r).darkMode},{default:n(()=>e[64]||(e[64]=[l(`{
  id: {String}, // Current view, one of: years, year, month, week, day.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  selectedDate: {Date} // JavaScript Date object.
}`)])),_:1},8,["dark"])]),e[67]||(e[67]=t("li",null,[t("span",{class:"code"},"schedule"),l(", when schedules, object containing the current schedule info.")],-1)),e[68]||(e[68]=t("li",null,[t("span",{class:"code"},"events"),l(", array containing all the events of the current cell or schedule.")],-1)),e[69]||(e[69]=t("li",null,[t("span",{class:"code"},"goNarrower"),l(", function to navigate to narrower view if possible.")],-1))]),o(y,{class:"my3",info:""},{default:n(()=>[e[73]||(e[73]=l("By default a cell is rendered as follows.")),e[74]||(e[74]=t("br",null,null,-1)),e[75]||(e[75]=l(`
It is a good idea to reuse the same CSS classes as the different elements have associated styles:`)),e[76]||(e[76]=t("br",null,null,-1)),o(p,{class:"mt3 mb1",language:"html-vue",dark:i(r).darkMode},{default:n(()=>e[70]||(e[70]=[l('<div class="vuecal__flex vuecal__cell-content">')])),_:1},8,["dark"]),o(p,{class:"my2 ml5",language:"html-vue",style:{"background-color":"rgba(0, 177, 255, 0.08)"},dark:i(r).darkMode},{default:n(()=>e[71]||(e[71]=[l(`Now this is the part you can customize:

<!-- Will be added if schedules are set -->
<div class="vuecal__schedule" />
<!-- Will be added on years, year & month view -->
<div class="vuecal__cell-date" />
<!-- Will be added on month view -->
<div class="vuecal__cell-events-count" />`)])),_:1},8,["dark"]),o(p,{class:"my1",language:"html-vue",dark:i(r).darkMode},{default:n(()=>e[72]||(e[72]=[l(`    <div class="vuecal__cell-events" />
</div>`)])),_:1},8,["dark"])]),_:1})]),"code-html":n(()=>e[80]||(e[80]=[l(`<vue-cal
  :time="false"
  :dblclick-to-navigate="false"
  view="month"
  :events="events">

  <!-- Custom title -->
  <template #title="view">
    🎉
    <span v-if="view.id === 'years'">Years</span>
    <!-- Using Vue Cal injected Date prototypes -->
    <span v-else-if="view.id === 'year'">`+d("{{ view.start.format('YYYY') }}")+`</span>
    <span v-else-if="view.id === 'month'">`+d("{{ view.start.format('MMMM YYYY') }}")+`</span>
    <span v-else-if="view.id === 'week'">w`+d("{{ view.start.getWeek() }} ({{ view.start.format('MMM YYYY') }}")+`)</span>
    <span v-else-if="view.id === 'days'">`+d("{{ view.start.format('D MMMM YYYY') }}")+" - "+d("{{ view.end.format('D MMMM YYYY') }}")+`</span>
    <span v-else-if="view.id === 'day'">`+d("{{ view.start.format('dddd D MMMM YYYY') }}")+`</span>
    🎉
  </template>

  <!-- Custom cells -->
  <template #cell-content="{ cell, view, events, goNarrower }">
    <span class="vuecal__cell-date" :class="view.id" v-if="view.id === 'day'" @click="goNarrower">
      `+d("{{ cell.date.getDate() }}")+`
    </span>
    <span class="vuecal__cell-events-count" v-if="view.id === 'month' && events.length">`+d("{{ events.length }}")+`</span>
    <span class="vuecal__no-event" v-if="['week', 'day'].includes(view.id) && !events.length">Nothing here 👌</span>
  </template>
</vue-cal>`)])),desc2:n(()=>e[81]||(e[81]=[])),default:n(()=>[o(i(h),{class:"ex--custom-title-and-cells",dark:i(r).darkMode,time:!1,"dblclick-to-navigate":!1,view:"month",events:x},{title:n(s=>[e[82]||(e[82]=l("🎉 ")),s.id==="years"?(g(),w("span",re,"Years")):s.id==="year"?(g(),w("span",ue,d(s.start.format("YYYY")),1)):s.id==="month"?(g(),w("span",me,d(s.start.format("MMMM YYYY")),1)):s.id==="week"?(g(),w("span",ve,"w"+d(s.start.getWeek())+" ("+d(s.start.format("MMM YYYY"))+")",1)):s.id==="days"?(g(),w("span",pe,d(s.start.format("D MMMM YYYY"))+" - "+d(s.end.format("D MMMM YYYY")),1)):s.id==="day"?(g(),w("span",ce,d(s.start.format("dddd D MMMM YYYY")),1)):H("",!0),e[83]||(e[83]=l(" 🎉"))]),_:1},8,["dark"])]),_:1}),o(M,{title:"Custom event Rendering",anchor:"custom-event-rendering"},{desc:n(()=>[e[95]||(e[95]=t("p",{class:"mb2"},"Using Vue.js scoped slots, you can override the events rendering.",-1)),o(y,{class:"my2",tip:""},{default:n(()=>[e[86]||(e[86]=l(`If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
`)),t("a",fe,[e[85]||(e[85]=l("vuejs.org/guide/components/slots.htm ")),o(v,{color:"primary"},{default:n(()=>e[84]||(e[84]=[l("mdi mdi-open-in-new")])),_:1})]),e[87]||(e[87]=l("."))]),_:1}),o(y,{class:"my3",info:""},{default:n(()=>[e[91]||(e[91]=l("By default an event is rendered as follows.")),e[92]||(e[92]=t("br",null,null,-1)),e[93]||(e[93]=l(`
It is a good idea to reuse the same CSS classes as the different elements have associated styles:`)),e[94]||(e[94]=t("br",null,null,-1)),o(p,{class:"mt3 mb1",language:"html-vue",dark:i(r).darkMode},{default:n(()=>e[88]||(e[88]=[l('<div class="vuecal__event">\n    <!-- Will be added if `editable-events` option is set to `true` -->\n    <div class="vuecal__event-delete" />')])),_:1},8,["dark"]),o(p,{class:"my2 ml5",language:"html-vue",style:{"background-color":"rgba(0, 177, 255, 0.08)"},dark:i(r).darkMode},{default:n(()=>e[89]||(e[89]=[l(`Now this is the part you can customize:

<!-- Will be added if a title is set -->
<div class="vuecal__event-title" />
<!-- or if title is set and \`editable-events\` option is set to \`true\` -->
<div class="vuecal__event-title vuecal__event-title--edit" contenteditable />

<!-- Will be added if \`time\` option is set to \`true\` -->
<div class="vuecal__event-time" />

<!-- Will be added if a content is set -->
<div class="vuecal__event-content" />`)])),_:1},8,["dark"]),o(p,{class:"my1",language:"html-vue",dark:i(r).darkMode},{default:n(()=>e[90]||(e[90]=[l('    <!-- Will be added if `editable-events` option is set to `true` -->\n    <div class="vuecal__event-resize-handle" />\n</div>')])),_:1},8,["dark"])]),_:1}),e[96]||(e[96]=t("p",{class:"mb2"},"Two parameters are passed through the scoped slot:",-1)),e[97]||(e[97]=t("ul",null,[t("li",null,[t("span",{class:"code"},"event"),l(": The event full object containing dates, time, title, content and custom attributes.")]),t("li",null,[t("span",{class:"code"},"view"),l(": The current selected view id.")])],-1)),e[98]||(e[98]=t("p",{class:"mt2"},[l("You can set any custom attribute you want on an event, they will then be accessible in your custom event renderer!"),t("br"),l(`
Note that `),t("span",{class:"code"},"_eid"),l(" is a reserved keyword.")],-1))]),"code-html":n(()=>e[99]||(e[99]=[l(`<vue-cal
  :selected-date="stringToDate('2018-11-19')"
  :time-from="9 * 60"
  :time-to="19 * 60"
  hide-weekends
  :events="events">
  <template #event="{ event, view }">
    <v-icon>`+d("{{ event.icon }}")+`</v-icon>

    <div class="vuecal__event-title" v-html="event.title" />
    <!-- Or if your events are editable: -->
    <div class="vuecal__event-title vuecal__event-title--edit"
          contenteditable
          @blur="event.title = $event.target.innerHTML"
          v-html="event.title" />

    <small class="vuecal__event-time">
      <!-- Using Vue Cal Date prototypes (activated by default) -->
      <strong>Event start:</strong> <span>`+d(`{{ event.start.formatTime("h O'clock") }}`)+`</span><br/>
      <strong>Event end:</strong> <span>`+d(`{{ event.end.formatTime("h O'clock") }}`)+`</span>
    </small>
  </template>
</vue-cal>`)])),"code-js":n(()=>e[100]||(e[100]=[l(`events: [
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
]`)])),desc2:n(()=>e[101]||(e[101]=[])),default:n(()=>[o(i(h),{class:"ex--custom-event-rendering",dark:i(r).darkMode,"selected-date":i(B)("2018-11-19"),"time-from":9*60,"time-to":19*60,"hide-weekends":"",events:i(z)},{event:n(({event:s,view:f})=>[o(v,{class:"mt2",color:"white",xl:""},{default:n(()=>[l(d(s.icon),1)]),_:2},1024),t("div",{class:"vuecal__event-title mb6",innerHTML:s.title},null,8,ge),t("small",be,[e[102]||(e[102]=t("strong",{class:"mr1"},"Event start:",-1)),t("span",null,d(s.start.formatTime("h O'clock")),1),e[103]||(e[103]=t("br",null,null,-1)),e[104]||(e[104]=t("strong",{class:"mr1"},"Event end:",-1)),t("span",null,d(s.end.formatTime("h O'clock")),1)])]),_:1},8,["dark","selected-date","events"])]),_:1}),o(M,{title:"Custom Day Schedules Headings",anchor:"custom-schedules-headings"},{desc:n(()=>e[105]||(e[105]=[t("p",{class:"mb6"},"You can define a custom schedule heading through slot.",-1)])),"code-html":n(()=>e[106]||(e[106]=[l(`<vue-cal
  :views="['day', 'week']"
  view="day"
  :schedules="schedules"
  :hide-weekdays="['fri', 'sat', 'sun']">
  <template #schedule-heading="{ schedule, view }">
    <i class="icon mdi mdi-account"></i>
    <strong :style="\`color: \${schedule.color}\`">`+d("{{ schedule.label }}")+`</strong>
  </template>
</vue-cal>`)])),"code-js":n(()=>e[107]||(e[107]=[l(`// In data.
customDayScheduleHeadings: [
  { label: 'John', color: 'blue', class: 'schedule1' },
  { label: 'Tom', color: 'green', class: 'schedule2' },
  { label: 'Kate', color: 'orange', class: 'schedule3' },
  { label: 'Jess', color: 'red', class: 'schedule4' }
]`)])),"code-css":n(()=>e[108]||(e[108]=[l(`.vuecal__schedule--heading {font-size: 11px;}
.vuecal__body .schedule1 {background-color: rgba(226, 242, 253, 0.7);}
.vuecal__body .schedule2 {background-color: rgba(232, 245, 233, 0.7);}
.vuecal__body .schedule3 {background-color: rgba(255, 243, 224, 0.7);}
.vuecal__body .schedule4 {background-color: rgba(255, 235, 238, 0.7);}
`)])),default:n(()=>[o(i(h),{dark:i(r).darkMode,views:["day","week"],view:"day",schedules:N,"hide-weekdays":["fri","sat","sun"]},{"schedule-heading":n(({schedule:s,view:f})=>[o(v,{color:s.color,size:"18"},{default:n(()=>e[109]||(e[109]=[l("mdi mdi-account")])),_:2},1032,["color"]),t("strong",{style:q(`color: ${s.color}`)},d(s.label),5)]),_:1},8,["dark"]),o(S,{modelValue:D.value,"onUpdate:modelValue":e[9]||(e[9]=s=>D.value=s),width:"600","dialog-class":"bdrs2","title-class":"primary--bg white py2"},{title:n(()=>[o(v,{class:"mr3"},{default:n(()=>[l(d(u.value.icon),1)]),_:1}),t("span",we,d(u.value.title),1),e[110]||(e[110]=t("div",{class:"spacer"},null,-1)),t("strong",null,d(u.value.start&&u.value.start.format("DD/MM/YYYY")),1)]),default:n(()=>[t("p",{innerHTML:u.value.contentFull},null,8,ye),e[111]||(e[111]=t("div",{class:"text-bold mt3"},"Event details:",-1)),t("ul",null,[t("li",null,"Event starts at: "+d(u.value.start&&u.value.start.formatTime()),1),t("li",null,"Event ends at: "+d(u.value.end&&u.value.end.formatTime()),1)])]),_:1},8,["modelValue"]),o(S,{modelValue:V.value,"onUpdate:modelValue":e[14]||(e[14]=s=>V.value=s),persistent:"",width:"420","title-class":"primary--bg white px5","content-class":"pa5"},{title:n(()=>[o(W,{class:"ma0 pa0",modelValue:u.value.title,"onUpdate:modelValue":e[10]||(e[10]=s=>u.value.title=s),placeholder:"Event Title",color:"white"},null,8,["modelValue"])]),default:n(()=>[t("div",null,[o(F,{class:"pa0",modelValue:u.value.content,"onUpdate:modelValue":e[11]||(e[11]=s=>u.value.content=s),placeholder:"Event Content",rows:"3"},null,8,["modelValue"]),t("div",ke,[o(O,{items:J.value,placeholder:"Event CSS Class",onInput:e[12]||(e[12]=s=>u.value.class=s),"model-value":u.value.class,style:{"max-width":"170px"}},null,8,["items","model-value"]),o(b,{class:"no-grow",modelValue:u.value.background,"onUpdate:modelValue":e[13]||(e[13]=s=>u.value.background=s),label:"Background Event","label-color":"grey"},null,8,["modelValue"])])]),t("div",Me,[e[114]||(e[114]=t("div",{class:"spacer"},null,-1)),o(k,{class:"ma1","bg-color":"light-grey",onClick:I},{default:n(()=>e[112]||(e[112]=[l("Cancel")])),_:1}),o(k,{class:"ma1",onClick:C.closeCreationDialog},{default:n(()=>e[113]||(e[113]=[l("Save")])),_:1},8,["onClick"])])]),_:1},8,["modelValue"])]),_:1})],64)}}};export{Ve as default};
