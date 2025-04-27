import{u as A,r as c,x as N,D as W,b as r,f as a,w as s,h as n,e as t,a as y,g as u,z as P,y as G,H as K,F as m,j as q,i as $,t as i,q as Q,n as X,d,A as Z}from"./index-jgOYyshl.js";import{c as _,s as E}from"./index-CcQty_zx.js";import{_ as C}from"./index-BaLs-PXP.js";const ee={class:"ml1",href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},te={class:"w-flex column gap1 mt2"},ne=["innerHTML"],le={class:"w-flex gap2 mla no-grow"},se=["innerHTML"],oe=["innerHTML"],ae={class:"orange-light2"},ie={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},de={key:0},re={key:1},ue={key:2},me={key:3},ve={key:4},ce={key:5},pe=["onClick"],we={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},ge=["innerHTML"],fe={class:"vuecal__event-time"},ye={class:"title3 text-upper"},be=["innerHTML"],ke={class:"w-flex justify-space-between mt4"},he={class:"w-flex mt6"},Ve={__name:"customization",setup(Me){const f=A(),S=c(null),o=N({title:c(!1),prevNextButtons:c(!1),nextButton:c(!1),todayButton:c(!1),weekdayHeading:c(!1),timeCell:c(!1),cellContent:c(!1),header:c(!1),diy:c(!1),view:c("week")});W(()=>`${o.title} ${o.prevNextButtons} ${o.nextButton} ${o.todayButton} ${o.weekdayHeading} ${o.timeCell} ${o.cellContent} ${o.header} ${o.diy}`,()=>{var p,e;return(e=(p=S.value)==null?void 0:p.refreshHeight)==null?void 0:e.call(p)});const I=[{label:"John",color:"blue",class:"schedule1"},{label:"Tom",color:"green",class:"schedule2"},{label:"Kate",color:"orange",class:"schedule3"},{label:"Jess",color:"red",class:"schedule4"}];c(null);const v=c({}),j=c(!1),H=c(!1),L=c([{label:"leisure"},{label:"sport"},{label:"health"}]),V=[{start:"2018-10-30 10:30",end:"2018-10-30 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-16 10:30",end:"2018-11-16 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 10:35",end:"2018-11-19 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 18:30",end:"2018-11-19 19:15",title:"Dentist appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:2},{start:"2018-11-20 18:30",end:"2018-11-20 20:30",title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:"2018-11-21 11:00",end:"2018-11-21 13:00",title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-coffee-outline"></i>',class:"leisure",schedule:1,background:!1},{start:"2018-11-21 19:30",end:"2018-11-21 23:00",title:"Swimming lesson",content:'<i class="w-icon mdi mdi-pool"></i>',class:"sport",schedule:2},{start:"2018-11-23 12:30",end:"2018-11-23 13:00",title:"Macca's with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:"2018-11-23 21:00",end:"2018-11-23 23:30",title:"Movie time",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:"2018-11-30 21:00",end:"2018-11-30 23:30",title:"Another movie tonight",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1}],J=V.slice(0),O=()=>{closeCreationDialog()(deleteEventFunction.value||deleteDragEventFunction.value)()},h=N({events:[...V],view:c("month"),onViewChange:p=>{h.fetchEvents(p.start.format(),p.end.format())},fetchEvents:async(p,e)=>{const w=E(p),b=E(e);h.events=h.generateRandomEvents(w,b)},generateRandomEvents:(p,e)=>{const w=_(p,e),b=[];for(let g=0;g<w;g++)for(let k=0;k<10;k++){const D=new Date(p.addDays(g).setHours(Math.floor(Math.random()*8)+9,Math.floor(Math.random()*60),0,0)),M=D.addHours(1);b.push({title:`Event ${k}`,start:D,end:M})}return b}});return(p,e)=>{const w=y("w-icon"),b=y("alert"),g=y("w-switch"),k=y("w-button"),D=y("w-tooltip"),M=y("example"),Y=y("ssh-pre"),B=y("w-dialog"),z=y("w-input"),F=y("w-textarea"),R=y("w-select");return d(),r(m,null,[a(b,{class:"mb2"},{default:s(()=>[e[19]||(e[19]=n("If you're not familiar with slots and scoped slots, first read about it in the")),t("a",ee,[e[18]||(e[18]=t("strong",null,"official Vue documentation",-1)),a(w,{class:"primary ml1"},{default:s(()=>e[17]||(e[17]=[n("mdi mdi-open-in-new")])),_:1})]),e[20]||(e[20]=n("."))]),_:1}),a(b,null,{default:s(()=>e[21]||(e[21]=[n("Here is the list of available slots:"),t("ul",null,[t("li",null,[t("span",{class:"code"},"title")]),t("li",null,[t("span",{class:"code"},"previous-button")]),t("li",null,[t("span",{class:"code"},"next-button")]),t("li",null,[t("span",{class:"code"},"today-button")]),t("li",null,[t("span",{class:"code"},"weekday-heading")]),t("li",null,[t("span",{class:"code"},"schedule-heading")]),t("li",null,[t("span",{class:"code"},"time-cell")]),t("li",null,[t("span",{class:"code"},"week-number-cell")]),t("li",null,[t("span",{class:"code"},"cell-content")]),t("li",null,[t("span",{class:"code"},"events-count")]),t("li",null,[t("span",{class:"code"},"event")])],-1)])),_:1}),a(M,{ref_key:"exSlotsExampleEl",ref:S,title:"Simple Slots",anchor:"slots"},{desc:s(()=>[e[30]||(e[30]=t("p",null,[n(`Vue Cal is designed to be as flexible and customizable as possible, offering a variety of slots to
help you go beyond the standard features and tailor it to your needs.`),t("br"),n(`
This example highlights the simplest and most commonly used slots.
`)],-1)),t("div",te,[a(g,{modelValue:o.title,"onUpdate:modelValue":e[0]||(e[0]=l=>o.title=l),disabled:o.header||o.diy},{default:s(()=>e[22]||(e[22]=[n("Custom title via "),t("code",{class:"mx1"},"title",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(g,{modelValue:o.prevNextButtons,"onUpdate:modelValue":e[1]||(e[1]=l=>o.prevNextButtons=l),disabled:o.header||o.diy},{default:s(()=>e[23]||(e[23]=[n("Custom arrows via "),t("code",{class:"mx1"},"previous-button",-1),n(" & "),t("code",{class:"mx1"},"next-button",-1),n(" slots")])),_:1},8,["modelValue","disabled"]),a(g,{modelValue:o.todayButton,"onUpdate:modelValue":e[2]||(e[2]=l=>o.todayButton=l),disabled:o.header||o.diy},{default:s(()=>e[24]||(e[24]=[n("Custom today button via "),t("code",{class:"mx1"},"today-button",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(g,{modelValue:o.weekdayHeading,"onUpdate:modelValue":e[3]||(e[3]=l=>o.weekdayHeading=l),disabled:o.header||o.diy},{default:s(()=>e[25]||(e[25]=[n("Custom weekday labels via "),t("code",{class:"mx1"},"weekday-heading",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(g,{modelValue:o.header,"onUpdate:modelValue":e[4]||(e[4]=l=>o.header=l),disabled:o.diy},{default:s(()=>e[26]||(e[26]=[n("Custom header via "),t("code",{class:"mx1"},"header",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(g,{modelValue:o.timeCell,"onUpdate:modelValue":e[5]||(e[5]=l=>o.timeCell=l),disabled:o.diy},{default:s(()=>e[27]||(e[27]=[n("time cell labels via "),t("code",{class:"mx1"},"time-cell",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(g,{modelValue:o.cellContent,"onUpdate:modelValue":e[6]||(e[6]=l=>o.cellContent=l),disabled:o.diy},{default:s(()=>e[28]||(e[28]=[n("Custom cell content via "),t("code",{class:"mx1"},"cell-content",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(g,{modelValue:o.diy,"onUpdate:modelValue":e[7]||(e[7]=l=>o.diy=l)},{default:s(()=>e[29]||(e[29]=[n("DIY via "),t("code",{class:"mx1"},"diy",-1),n(" slot: you've got the power, build something nice!")])),_:1},8,["modelValue"])])]),"code-html":s(()=>[e[35]||(e[35]=n('<vue-cal :time-from="9 * 60" :time-to="14 * 60">')),o.diy?(d(),r(m,{key:0},[e[31]||(e[31]=n(`

  <template #diy="{ vuecal, view }">
    `+i("{{ view }}"))),e[32]||(e[32]=t("br",null,null,-1)),e[33]||(e[33]=t("br",null,null,-1)),e[34]||(e[34]=n(i("{{ vuecal }}")+`
  </template>`))],64)):(d(),r(m,{key:1},[o.header?(d(),r(m,{key:0},[n(`

  <template #header="{ view, availableViews }">
    <i class="icon mdi mdi-chevron-left" @click="view.previous"></i>
    <div v-html="view.title"></div>
    <i class="icon mdi mdi-chevron-right" @click="view.next"></i>

    <button
      v-for="(grid, viewId) in availableViews"
      @click="view = viewId"
      :class="{ active: view.id === viewId }">
      `+i("{{ viewId }}")+`
    </button>
  </template>`)],64)):(d(),r(m,{key:1},[o.title?(d(),r(m,{key:0},[n(`

  <template #title="view">
    <code v-html="view.title"></code>
  </template>`)],64)):(d(),r(m,{key:1},[],64)),o.prevNextButtons?(d(),r(m,{key:2},[n(`

  <template #previous-button>
    <i class="icon mdi mdi-arrow-left"></i>
  </template>

  <template #next-button>
    <i class="icon mdi mdi-arrow-right"></i>
  </template>`)],64)):(d(),r(m,{key:3},[],64)),o.todayButton?(d(),r(m,{key:4},[n(`

  <template #today-button>
    <!-- Using Wave UI -->
    <w-tooltip>
      <template #activator="{ on }">
        <w-btn v-on="on" icon="mdi mdi-calendar-today">
        </w-btn>
        <span>Go to Today's date</span>
      </template>
    </w-tooltip>
  </template>`)],64)):(d(),r(m,{key:5},[],64)),o.weekdayHeading?(d(),r(m,{key:6},[n(`

  <template #weekday-heading="{ label, id }">
    <strong>`+i("{{ label }}")+`</strong>
  </template>`)],64)):(d(),r(m,{key:7},[],64))],64)),o.timeCell?(d(),r(m,{key:2},[n(`

  <template #time-cell="{ format24 }">
    <strong>`+i("{{ format24 }}")+`</strong>
  </template>`)],64)):(d(),r(m,{key:3},[],64)),o.cellContent?(d(),r(m,{key:4},[n(`

  <template #cell-content>
    <i class="icon mdi mdi-party-popper"></i>
  </template>`)],64)):(d(),r(m,{key:5},[],64))],64)),e[36]||(e[36]=n(`
</vue-cal>`))]),default:s(()=>[a(u(C),{class:"grow",view:o.view,"onUpdate:view":e[8]||(e[8]=l=>o.view=l),"time-from":9*60,"time-to":15*60,dark:u(f).darkMode,style:{height:"331px"}},P({_:2},[o.todayButton?{name:"today-button",fn:s(({navigate:l,active:x})=>[a(D,{left:""},{activator:s(({on:U})=>[a(k,G(K({...U,click:l}),{onClick:l,disabled:x,color:"orange-light2",text:"",icon:"mdi mdi-calendar-today","icon-props":{size:"1.2rem"}}),null,16,["onClick","disabled"])]),default:s(()=>[e[37]||(e[37]=t("span",null,"Go to Today's date",-1))]),_:2},1024)]),key:"0"}:void 0,o.header?{name:"header",fn:s(({view:l,availableViews:x})=>[t("div",{class:$(["w-flex gap2 pa1 align-center",u(f).darkMode?"orange-dark3--bg":"orange-light5--bg"])},[a(k,{color:"base-color",icon:"wi-chevron-left",onClick:l.previous},null,8,["onClick"]),t("div",{class:"base-color",innerHTML:l.title},null,8,ne),a(k,{color:"base-color",icon:"wi-chevron-right",onClick:l.next},null,8,["onClick"]),t("div",le,[(d(!0),r(m,null,q(x,(U,T)=>(d(),Z(k,{class:"text-upper",onClick:xe=>o.view=T,color:"base-color",outline:l.id===T,sm:""},{default:s(()=>[n(i(T),1)]),_:2},1032,["onClick","outline"]))),256))])],2)]),key:"1"}:void 0,o.title?{name:"title",fn:s(({title:l})=>[t("code",{class:"orange-light2",innerHTML:l},null,8,se)]),key:"2"}:void 0,o.weekdayHeading?{name:"weekday-heading",fn:s(({label:l,id:x})=>[t("strong",{class:$(["orange-light2",x]),innerHTML:l},null,10,oe)]),key:"3"}:void 0,o.prevNextButtons?{name:"previous-button",fn:s(()=>[a(w,{class:"orange-light2",md:""},{default:s(()=>e[38]||(e[38]=[n("mdi mdi-arrow-left")])),_:1})]),key:"4"}:void 0,o.prevNextButtons?{name:"next-button",fn:s(()=>[a(w,{class:"orange-light2",md:""},{default:s(()=>e[39]||(e[39]=[n("mdi mdi-arrow-right")])),_:1})]),key:"5"}:void 0,o.timeCell?{name:"time-cell",fn:s(({format24:l})=>[t("strong",ae,i(l),1)]),key:"6"}:void 0,o.cellContent?{name:"cell-content",fn:s(()=>[a(w,{class:"orange-light2",lg:""},{default:s(()=>e[40]||(e[40]=[n("mdi mdi-party-popper")])),_:1})]),key:"7"}:void 0,o.diy?{name:"diy",fn:s(({vuecal:l})=>[n(i(l),1)]),key:"8"}:void 0]),1032,["view","dark"])]),_:1},512),a(M,{title:"Custom Title Per View",anchor:"custom-title-per-view"},{desc:s(()=>e[41]||(e[41]=[t("p",null,[n(`If you need a custom title only on a specific view and want to keep it simple,
you can define a custom title for that view by using the `),t("code",{class:"mx1"},"title.[view]"),n(" slot where "),t("code",{class:"mx1"},"[view]"),n(" is the view id.")],-1),t("p",null,[n("The view object is available through the slot-scope, and you can use the "),t("code",{class:"mx1"},"view.id"),n(` property to
check the current view.
`)],-1)])),"code-html":s(()=>e[42]||(e[42]=[n(`<vue-cal>
  <template #title.day="view">
    `+i('{{ view.start.format("D MMMM YYYY") }}')+` ❤️
  </template>
</vue-cal>
`)])),default:s(()=>[a(u(C),{dark:u(f).darkMode,view:"day"},{"title.day":s(l=>[n(i(l.start.format("D MMMM YYYY"))+" ❤️",1)]),_:1},8,["dark"])]),_:1}),a(M,{title:"Custom Cells",anchor:"custom-cells"},{desc:s(()=>[e[64]||(e[64]=t("div",{class:"todo-tag d-iflex prod"},"TO BE UPDATED SOON",-1)),a(b,{tip:""},{default:s(()=>[e[45]||(e[45]=n("Using Vue.js scoped slots, you can override the calendar cells.")),e[46]||(e[46]=t("br",null,null,-1)),e[47]||(e[47]=n(`
If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
`)),t("a",ie,[e[44]||(e[44]=n("vuejs.org/guide/components/slots.htm ")),a(w,{color:"primary"},{default:s(()=>e[43]||(e[43]=[n("mdi mdi-open-in-new")])),_:1})])]),_:1}),e[65]||(e[65]=t("p",{class:"mt6 mb2"},[n("Accessible payload through the "),t("span",{class:"code"},"#cell-content"),n(" scoped slot:")],-1)),e[66]||(e[66]=t("ul",null,[t("li",null,[t("span",{class:"code"},"cell"),n(", object containing the cell date range and the cell events.")])],-1)),e[67]||(e[67]=t("p",null,[n("In this example, only the cell number is clickable on month view."),t("br"),n(`
5 arguments are available through the scoped slot:`),t("br"),n(),t("span",{class:"code"},'#cell-content="{ cell, view, schedule, events, goNarrower }"')],-1)),t("ul",null,[t("li",null,[e[49]||(e[49]=t("span",{class:"code"},"cell",-1)),e[50]||(e[50]=n(", object containing the cell date.")),a(Y,{class:"mt2 mb2",language:"js",dark:u(f).darkMode},{default:s(()=>e[48]||(e[48]=[n(`{
  content: {String}, // Pre-formatted cell content if any.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  formattedDate: {String}, // formatted start date. E.g. "2019-04-05".
  today: {Boolean}, // Whether the cell is today.
  broader: {Function}, // Function to navigate to broader view if possible.
  narrower: {Function}, // Function to navigate to narrower view if possible.
  broaderView: {String}, // String containing the broader view ID.
  narrowerView: {String}, // String containing the narrower view ID.
}`)])),_:1},8,["dark"])]),t("li",null,[e[52]||(e[52]=t("span",{class:"code"},"view",-1)),e[53]||(e[53]=n(", object containing the active view info.")),a(Y,{class:"mt2 mb2",language:"js",dark:u(f).darkMode},{default:s(()=>e[51]||(e[51]=[n(`{
  id: {String}, // Current view, one of: years, year, month, week, day.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  selectedDate: {Date} // JavaScript Date object.
}`)])),_:1},8,["dark"])]),e[54]||(e[54]=t("li",null,[t("span",{class:"code"},"schedule"),n(", when schedules, object containing the current schedule info.")],-1)),e[55]||(e[55]=t("li",null,[t("span",{class:"code"},"events"),n(", array containing all the events of the current cell or schedule.")],-1)),e[56]||(e[56]=t("li",null,[t("span",{class:"code"},"goNarrower"),n(", function to navigate to narrower view if possible.")],-1))]),a(b,{class:"my3",info:""},{default:s(()=>[e[60]||(e[60]=n("By default a cell is rendered as follows.")),e[61]||(e[61]=t("br",null,null,-1)),e[62]||(e[62]=n(`
It is a good idea to reuse the same CSS classes as the different elements have associated styles:`)),e[63]||(e[63]=t("br",null,null,-1)),a(Y,{class:"mt3 mb1",language:"html-vue",dark:u(f).darkMode},{default:s(()=>e[57]||(e[57]=[n('<div class="vuecal__flex vuecal__cell-content">')])),_:1},8,["dark"]),a(Y,{class:"my2 ml5",language:"html-vue",style:{"background-color":"rgba(0, 177, 255, 0.08)"},dark:u(f).darkMode},{default:s(()=>e[58]||(e[58]=[n(`Now this is the part you can customize:

<!-- Will be added if schedules are set -->
<div class="vuecal__schedule" />
<!-- Will be added on years, year & month view -->
<div class="vuecal__cell-date" />
<!-- Will be added on month view -->
<div class="vuecal__cell-events-count" />`)])),_:1},8,["dark"]),a(Y,{class:"my1",language:"html-vue",dark:u(f).darkMode},{default:s(()=>e[59]||(e[59]=[n(`    <div class="vuecal__cell-events" />
</div>`)])),_:1},8,["dark"])]),_:1})]),"code-html":s(()=>e[68]||(e[68]=[n(`<vue-cal
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
</vue-cal>`)])),desc2:s(()=>e[69]||(e[69]=[])),default:s(()=>[a(u(C),{class:"ex--custom-title-and-cells",dark:u(f).darkMode,time:!1,"dblclick-to-navigate":!1,view:"month",events:V},{title:s(l=>[e[70]||(e[70]=n("🎉 ")),l.id==="years"?(d(),r("span",de,"Years")):l.id==="year"?(d(),r("span",re,i(l.start.format("YYYY")),1)):l.id==="month"?(d(),r("span",ue,i(l.start.format("MMMM YYYY")),1)):l.id==="week"?(d(),r("span",me,"w"+i(l.start.getWeek())+" ("+i(l.start.format("MMM YYYY"))+")",1)):l.id==="days"?(d(),r("span",ve,i(l.start.format("D MMMM YYYY"))+" - "+i(l.end.format("D MMMM YYYY")),1)):l.id==="day"?(d(),r("span",ce,i(l.start.format("dddd D MMMM YYYY")),1)):Q("",!0),e[71]||(e[71]=n(" 🎉"))]),"cell-date":s(({cell:l})=>[t("button",{onClick:l.goBroader},i(l.start.format()),9,pe)]),_:1},8,["dark"])]),_:1}),a(M,{title:"Custom Event Rendering",anchor:"custom-event-rendering"},{desc:s(()=>[e[76]||(e[76]=t("div",{class:"todo-tag d-iflex prod"},"TO BE UPDATED SOON",-1)),e[77]||(e[77]=t("p",{class:"mb2"},"Using Vue.js scoped slots, you can override the events rendering.",-1)),a(b,{class:"my2",tip:""},{default:s(()=>[e[74]||(e[74]=n(`If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
`)),t("a",we,[e[73]||(e[73]=n("vuejs.org/guide/components/slots.htm ")),a(w,{color:"primary"},{default:s(()=>e[72]||(e[72]=[n("mdi mdi-open-in-new")])),_:1})]),e[75]||(e[75]=n("."))]),_:1}),e[78]||(e[78]=t("p",{class:"mb2"},"Two parameters are passed through the scoped slot:",-1)),e[79]||(e[79]=t("ul",null,[t("li",null,[t("span",{class:"code"},"event"),n(": The event full object containing dates, time, title, content and custom attributes.")]),t("li",null,[t("span",{class:"code"},"view"),n(": The current selected view id.")])],-1)),e[80]||(e[80]=t("p",{class:"mt2"},[n("You can set any custom attribute you want on an event, they will then be accessible in your custom event renderer!"),t("br"),n(`
Note that `),t("span",{class:"code"},"_eid"),n(" is a reserved keyword.")],-1))]),"code-html":s(()=>e[81]||(e[81]=[n(`<vue-cal
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
</vue-cal>`)])),"code-js":s(()=>e[82]||(e[82]=[n(`events: [
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
]`)])),desc2:s(()=>e[83]||(e[83]=[])),default:s(()=>[a(u(C),{class:"ex--custom-event-rendering",dark:u(f).darkMode,"selected-date":u(E)("2018-11-19"),"time-from":9*60,"time-to":19*60,"hide-weekends":"",events:u(J)},{event:s(({event:l,view:x})=>[a(w,{class:"mt2",color:"white",xl:""},{default:s(()=>[n(i(l.icon),1)]),_:2},1024),t("div",{class:"vuecal__event-title mb6",innerHTML:l.title},null,8,ge),t("small",fe,[e[84]||(e[84]=t("strong",{class:"mr1"},"Event start:",-1)),t("span",null,i(l.start.formatTime("h O'clock")),1),e[85]||(e[85]=t("br",null,null,-1)),e[86]||(e[86]=t("strong",{class:"mr1"},"Event end:",-1)),t("span",null,i(l.end.formatTime("h O'clock")),1)])]),_:1},8,["dark","selected-date","events"])]),_:1}),a(M,{title:"Custom Day Schedules Headings",anchor:"custom-schedules-headings"},{desc:s(()=>e[87]||(e[87]=[t("p",{class:"mb6"},"You can define a custom schedule heading through slot.",-1)])),"code-html":s(()=>e[88]||(e[88]=[n(`<vue-cal
  :views="['day', 'week']"
  view="day"
  :schedules="schedules"
  :hide-weekdays="['fri', 'sat', 'sun']">
  <template #schedule-heading="{ schedule, view }">
    <i class="icon mdi mdi-account"></i>
    <strong :style="\`color: \${schedule.color}\`">`+i("{{ schedule.label }}")+`</strong>
  </template>
</vue-cal>`)])),"code-js":s(()=>e[89]||(e[89]=[n(`customDayScheduleHeadings: [
  { label: 'John', color: 'blue', class: 'schedule1' },
  { label: 'Tom', color: 'green', class: 'schedule2' },
  { label: 'Kate', color: 'orange', class: 'schedule3' },
  { label: 'Jess', color: 'red', class: 'schedule4' }
]`)])),"code-css":s(()=>e[90]||(e[90]=[n(`.vuecal__schedule--heading {font-size: 11px;}
.vuecal__body .schedule1 {background-color: rgba(226, 242, 253, 0.7);}
.vuecal__body .schedule2 {background-color: rgba(232, 245, 233, 0.7);}
.vuecal__body .schedule3 {background-color: rgba(255, 243, 224, 0.7);}
.vuecal__body .schedule4 {background-color: rgba(255, 235, 238, 0.7);}
`)])),default:s(()=>[a(u(C),{dark:u(f).darkMode,views:["day","week"],view:"day",schedules:I,"hide-weekdays":["fri","sat","sun"]},{"schedule-heading":s(({schedule:l,view:x})=>[a(w,{color:l.color,size:"18"},{default:s(()=>e[91]||(e[91]=[n("mdi mdi-account")])),_:2},1032,["color"]),t("strong",{style:X(`color: ${l.color}`)},i(l.label),5)]),_:1},8,["dark"]),a(B,{modelValue:j.value,"onUpdate:modelValue":e[9]||(e[9]=l=>j.value=l),width:"600","dialog-class":"bdrs2","title-class":"primary--bg white py2"},{title:s(()=>[a(w,{class:"mr3"},{default:s(()=>[n(i(v.value.icon),1)]),_:1}),t("span",ye,i(v.value.title),1),e[92]||(e[92]=t("div",{class:"spacer"},null,-1)),t("strong",null,i(v.value.start&&v.value.start.format("DD/MM/YYYY")),1)]),default:s(()=>[t("p",{innerHTML:v.value.contentFull},null,8,be),e[93]||(e[93]=t("div",{class:"text-bold mt3"},"Event details:",-1)),t("ul",null,[t("li",null,"Event starts at: "+i(v.value.start&&v.value.start.formatTime()),1),t("li",null,"Event ends at: "+i(v.value.end&&v.value.end.formatTime()),1)])]),_:1},8,["modelValue"]),a(B,{modelValue:H.value,"onUpdate:modelValue":e[14]||(e[14]=l=>H.value=l),persistent:"",width:"420","title-class":"primary--bg white px5","content-class":"pa5"},{title:s(()=>[a(z,{class:"ma0 pa0",modelValue:v.value.title,"onUpdate:modelValue":e[10]||(e[10]=l=>v.value.title=l),placeholder:"Event Title",color:"white"},null,8,["modelValue"])]),default:s(()=>[t("div",null,[a(F,{class:"pa0",modelValue:v.value.content,"onUpdate:modelValue":e[11]||(e[11]=l=>v.value.content=l),placeholder:"Event Content",rows:"3"},null,8,["modelValue"]),t("div",ke,[a(R,{items:L.value,placeholder:"Event CSS Class",onInput:e[12]||(e[12]=l=>v.value.class=l),"model-value":v.value.class,style:{"max-width":"170px"}},null,8,["items","model-value"]),a(g,{class:"no-grow",modelValue:v.value.background,"onUpdate:modelValue":e[13]||(e[13]=l=>v.value.background=l),label:"Background Event","label-color":"grey"},null,8,["modelValue"])])]),t("div",he,[e[96]||(e[96]=t("div",{class:"spacer"},null,-1)),a(k,{class:"ma1","bg-color":"light-grey",onClick:O},{default:s(()=>e[94]||(e[94]=[n("Cancel")])),_:1}),a(k,{class:"ma1",onClick:p.closeCreationDialog},{default:s(()=>e[95]||(e[95]=[n("Save")])),_:1},8,["onClick"])])]),_:1},8,["modelValue"])]),_:1}),a(M,{title:"Events on Month View",anchor:"events-on-month-view"},{desc:s(()=>e[97]||(e[97]=[t("p",null,`You can define a custom schedule look when displaying a lot of events on the month view
with a little bit of CSS.
In this example, all the cells have the same adaptive height with an overflow: auto.
`,-1)])),"code-html":s(()=>e[98]||(e[98]=[n(`<vue-cal
  :events="events"
  v-model:view="view"
  :views="['day', 'days', 'week', 'month']"
  :time-from="9 * 60"
  :time-to="18 * 60"
  :time-cell-height="view === 'day' ? 59.4 : 56.6"
  events-on-month-view
  @ready="({ view }) => onViewChange(view)"
  @view-change="onViewChange"
  style="height: 600px">
</vue-cal>
`)])),"code-js":s(()=>e[99]||(e[99]=[n(`import { ref } from 'vue'
import { VueCal, countDays } from '@/vue-cal'

const events = ref([])
const view = ref('month')
const onViewChange = view => {
  events.value = generateRandomEvents(view.start, view.end)
}

/**
  * Generate random events for a given date range as if they were returned from a backend.
  *
  * @param {Date} startDate - The start date.
  * @param {Date} endDate - The end date.
  * @returns {Array} The events.
  */
const generateRandomEvents = (startDate, endDate) => {
  const daysRange = countDays(startDate, endDate)
  const events = []
  for (let i = 0; i < daysRange; i++) {
    for (let j = 0; j < 10; j++) {
      // Set random start and end time in the day, events last 1 hour.
      // The random start and end time is between 9am and 5pm.
      const start = new Date(startDate.addDays(i).setHours(Math.floor(Math.random() * 8) + 9, Math.floor(Math.random() * 60), 0, 0))
      const end = start.addHours(1)
      events.push({ title: \`Event \${j}\`, start, end })
    }
  }
  return events
}
`)])),"code-css":s(()=>e[100]||(e[100]=[n(`.vuecal__body-wrap {overflow: hidden;}
.vuecal__body {
  aspect-ratio: 13 / 9;
  overflow: auto;
}
.vuecal__cell {overflow: auto;}
.vuecal__event {padding: 0 2px;}
.vuecal__scrollable--month-view .vuecal__cell-date {
  font-size: 11px;
  margin: 1px;
  width: 1.7em;
}
`)])),default:s(()=>[a(u(C),{dark:u(f).darkMode,events:h.events,view:h.view,"onUpdate:view":e[15]||(e[15]=l=>h.view=l),views:["day","days","week","month"],"time-from":9*60,"time-to":18*60,"time-cell-height":h.view==="day"?59.4:56.6,"events-on-month-view":"",onReady:e[16]||(e[16]=({view:l})=>h.onViewChange(l)),onViewChange:h.onViewChange,style:{height:"600px"}},null,8,["dark","events","view","time-cell-height","onViewChange"])]),_:1})],64)}}};export{Ve as default};
