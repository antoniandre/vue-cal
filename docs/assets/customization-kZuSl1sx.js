import{u as O,r as v,x as V,D as I,b as r,f as a,w as s,h as n,e as t,a as k,g as u,z as J,y as z,H as R,F as m,j as L,i as E,t as i,q as A,n as F,d,A as W}from"./index-C-aN7HaR.js";import{c as P,s as N}from"./index-BbT8T2FX.js";import{_ as M}from"./index-CRH-0doI.js";const G={class:"ml1",href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},K={class:"w-flex column gap1 mt2"},q=["innerHTML"],Q={class:"w-flex gap2 mla no-grow"},X=["innerHTML"],Z=["innerHTML"],_={class:"orange-light2"},ee={class:"w-flex gap2 my2 justify-end"},te={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},ne={key:0},le={key:1},se={key:2},oe={key:3},ae={key:4},ie={key:5},de=["onClick"],re={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},ue=["innerHTML"],me={class:"mt2 w-flex wrap justify-center lh0"},ve={class:"mx1"},ce={class:"ml1"},he={__name:"customization",setup(pe){const p=O(),j=v(null),o=V({title:v(!1),prevNextButtons:v(!1),nextButton:v(!1),todayButton:v(!1),weekdayHeading:v(!1),timeCell:v(!1),cellContent:v(!1),header:v(!1),diy:v(!1),view:v("week")});I(()=>`${o.title} ${o.prevNextButtons} ${o.nextButton} ${o.todayButton} ${o.weekdayHeading} ${o.timeCell} ${o.cellContent} ${o.header} ${o.diy}`,()=>{var c,e;return(e=(c=j.value)==null?void 0:c.refreshHeight)==null?void 0:e.call(c)});const U=[{label:"John",color:"blue",class:"schedule1"},{label:"Tom",color:"green",class:"schedule2"},{label:"Kate",color:"orange",class:"schedule3"},{label:"Jess",color:"red",class:"schedule4"}];v(null),v({}),v([{label:"leisure"},{label:"sport"},{label:"health"}]);const S=[{start:"2018-10-30 10:30",end:"2018-10-30 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-16 10:30",end:"2018-11-16 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 10:35",end:"2018-11-19 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 18:30",end:"2018-11-19 19:15",title:"Dentist appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:2},{start:"2018-11-20 18:30",end:"2018-11-20 20:30",title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:"2018-11-21 11:00",end:"2018-11-21 13:00",title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-coffee-outline"></i>',class:"leisure",schedule:1,background:!1},{start:"2018-11-21 19:30",end:"2018-11-21 23:00",title:"Swimming lesson",content:'<i class="w-icon mdi mdi-pool"></i>',class:"sport",schedule:2},{start:"2018-11-23 12:30",end:"2018-11-23 13:00",title:"Macca's with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:"2018-11-23 21:00",end:"2018-11-23 23:30",title:"Movie time",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:"2018-11-30 21:00",end:"2018-11-30 23:30",title:"Another movie tonight",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1}];S.slice(0);const x=V({view:v("day")}),T=V({viewDate:new Date().subtractDays(2),events:[{start:new Date(new Date().subtractDays(1).setHours(9,0,0,0)),end:new Date(new Date().subtractDays(1).setHours(12,0,0,0)),title:"Golf with John",icon:"mdi mdi-golf",class:"text-center sport"},{start:new Date(new Date().addDays(1).setHours(12,0,0,0)),end:new Date(new Date().addDays(1).setHours(15,0,0,0)),title:"Shopping",icon:"mdi mdi-cart-outline",class:"text-center leisure"}]}),g=V({events:[...S],view:v("month"),onViewChange:c=>{g.fetchEvents(c.start.format(),c.end.format())},fetchEvents:async(c,e)=>{const w=N(c),y=N(e);g.events=g.generateRandomEvents(w,y)},generateRandomEvents:(c,e)=>{const w=P(c,e),y=[];for(let f=0;f<w;f++)for(let h=0;h<10;h++){const C=new Date(c.addDays(f).setHours(Math.floor(Math.random()*8)+9,Math.floor(Math.random()*60),0,0)),b=C.addHours(1);y.push({title:`Event ${h}`,start:C,end:b})}return y}});return(c,e)=>{const w=k("w-icon"),y=k("alert"),f=k("w-switch"),h=k("w-button"),C=k("w-tooltip"),b=k("example"),$=k("w-radios"),Y=k("ssh-pre");return d(),r(m,null,[a(y,{class:"mb2"},{default:s(()=>[e[14]||(e[14]=n("If you're not familiar with slots and scoped slots, first read about it in the")),t("a",G,[e[13]||(e[13]=t("strong",null,"official Vue documentation",-1)),a(w,{class:"primary ml1"},{default:s(()=>e[12]||(e[12]=[n("mdi mdi-open-in-new")])),_:1})]),e[15]||(e[15]=n("."))]),_:1}),a(y,null,{default:s(()=>e[16]||(e[16]=[n("Here is the list of available slots:"),t("ul",null,[t("li",null,[t("span",{class:"code"},"title")]),t("li",null,[t("span",{class:"code"},"previous-button")]),t("li",null,[t("span",{class:"code"},"next-button")]),t("li",null,[t("span",{class:"code"},"today-button")]),t("li",null,[t("span",{class:"code"},"weekday-heading")]),t("li",null,[t("span",{class:"code"},"schedule-heading")]),t("li",null,[t("span",{class:"code"},"time-cell")]),t("li",null,[t("span",{class:"code"},"week-number-cell")]),t("li",null,[t("span",{class:"code"},"cell-content")]),t("li",null,[t("span",{class:"code"},"events-count")]),t("li",null,[t("span",{class:"code"},"event")])],-1)])),_:1}),a(b,{ref_key:"exSlotsExampleEl",ref:j,title:"Simple Slots",anchor:"slots"},{desc:s(()=>[e[25]||(e[25]=t("p",null,[n(`Vue Cal is designed to be as flexible and customizable as possible, offering a variety of slots to
help you go beyond the standard features and tailor it to your needs.`),t("br"),n(`
This example highlights the simplest and most commonly used slots.
`)],-1)),t("div",K,[a(f,{modelValue:o.title,"onUpdate:modelValue":e[0]||(e[0]=l=>o.title=l),disabled:o.header||o.diy},{default:s(()=>e[17]||(e[17]=[n("Custom title via "),t("code",{class:"mx1"},"title",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(f,{modelValue:o.prevNextButtons,"onUpdate:modelValue":e[1]||(e[1]=l=>o.prevNextButtons=l),disabled:o.header||o.diy},{default:s(()=>e[18]||(e[18]=[n("Custom arrows via "),t("code",{class:"mx1"},"previous-button",-1),n(" & "),t("code",{class:"mx1"},"next-button",-1),n(" slots")])),_:1},8,["modelValue","disabled"]),a(f,{modelValue:o.todayButton,"onUpdate:modelValue":e[2]||(e[2]=l=>o.todayButton=l),disabled:o.header||o.diy},{default:s(()=>e[19]||(e[19]=[n("Custom today button via "),t("code",{class:"mx1"},"today-button",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(f,{modelValue:o.weekdayHeading,"onUpdate:modelValue":e[3]||(e[3]=l=>o.weekdayHeading=l),disabled:o.header||o.diy},{default:s(()=>e[20]||(e[20]=[n("Custom weekday labels via "),t("code",{class:"mx1"},"weekday-heading",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(f,{modelValue:o.header,"onUpdate:modelValue":e[4]||(e[4]=l=>o.header=l),disabled:o.diy},{default:s(()=>e[21]||(e[21]=[n("Custom header via "),t("code",{class:"mx1"},"header",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(f,{modelValue:o.timeCell,"onUpdate:modelValue":e[5]||(e[5]=l=>o.timeCell=l),disabled:o.diy},{default:s(()=>e[22]||(e[22]=[n("time cell labels via "),t("code",{class:"mx1"},"time-cell",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(f,{modelValue:o.cellContent,"onUpdate:modelValue":e[6]||(e[6]=l=>o.cellContent=l),disabled:o.diy},{default:s(()=>e[23]||(e[23]=[n("Custom cell content via "),t("code",{class:"mx1"},"cell-content",-1),n(" slot")])),_:1},8,["modelValue","disabled"]),a(f,{modelValue:o.diy,"onUpdate:modelValue":e[7]||(e[7]=l=>o.diy=l)},{default:s(()=>e[24]||(e[24]=[n("DIY via "),t("code",{class:"mx1"},"diy",-1),n(" slot: you've got the power, build something nice!")])),_:1},8,["modelValue"])])]),"code-html":s(()=>[e[30]||(e[30]=n('<vue-cal :time-from="9 * 60" :time-to="14 * 60">')),o.diy?(d(),r(m,{key:0},[e[26]||(e[26]=n(`

  <template #diy="{ vuecal, view }">
    `+i("{{ view }}"))),e[27]||(e[27]=t("br",null,null,-1)),e[28]||(e[28]=t("br",null,null,-1)),e[29]||(e[29]=n(i("{{ vuecal }}")+`
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
  </template>`)],64)):(d(),r(m,{key:5},[],64))],64)),e[31]||(e[31]=n(`
</vue-cal>`))]),default:s(()=>[a(u(M),{class:"grow",view:o.view,"onUpdate:view":e[8]||(e[8]=l=>o.view=l),"time-from":9*60,"time-to":15*60,dark:u(p).darkMode,style:{height:"331px"}},J({_:2},[o.todayButton?{name:"today-button",fn:s(({navigate:l,active:D})=>[a(C,{left:""},{activator:s(({on:B})=>[a(h,z(R({...B,click:l}),{onClick:l,disabled:D,color:"orange-light2",text:"",icon:"mdi mdi-calendar-today","icon-props":{size:"1.2rem"}}),null,16,["onClick","disabled"])]),default:s(()=>[e[32]||(e[32]=t("span",null,"Go to Today's date",-1))]),_:2},1024)]),key:"0"}:void 0,o.header?{name:"header",fn:s(({view:l,availableViews:D})=>[t("div",{class:E(["w-flex gap2 pa1 align-center",u(p).darkMode?"orange-dark3--bg":"orange-light5--bg"])},[a(h,{color:"base-color",icon:"wi-chevron-left",onClick:l.previous},null,8,["onClick"]),t("div",{class:"base-color",innerHTML:l.title},null,8,q),a(h,{color:"base-color",icon:"wi-chevron-right",onClick:l.next},null,8,["onClick"]),t("div",Q,[(d(!0),r(m,null,L(D,(B,H)=>(d(),W(h,{class:"text-upper",onClick:we=>o.view=H,color:"base-color",outline:l.id===H,sm:""},{default:s(()=>[n(i(H),1)]),_:2},1032,["onClick","outline"]))),256))])],2)]),key:"1"}:void 0,o.title?{name:"title",fn:s(({title:l})=>[t("code",{class:"orange-light2",innerHTML:l},null,8,X)]),key:"2"}:void 0,o.weekdayHeading?{name:"weekday-heading",fn:s(({label:l,id:D})=>[t("strong",{class:E(["orange-light2",D]),innerHTML:l},null,10,Z)]),key:"3"}:void 0,o.prevNextButtons?{name:"previous-button",fn:s(()=>[a(w,{class:"orange-light2",md:""},{default:s(()=>e[33]||(e[33]=[n("mdi mdi-arrow-left")])),_:1})]),key:"4"}:void 0,o.prevNextButtons?{name:"next-button",fn:s(()=>[a(w,{class:"orange-light2",md:""},{default:s(()=>e[34]||(e[34]=[n("mdi mdi-arrow-right")])),_:1})]),key:"5"}:void 0,o.timeCell?{name:"time-cell",fn:s(({format24:l})=>[t("strong",_,i(l),1)]),key:"6"}:void 0,o.cellContent?{name:"cell-content",fn:s(()=>[a(w,{class:"orange-light2",lg:""},{default:s(()=>e[35]||(e[35]=[n("mdi mdi-party-popper")])),_:1})]),key:"7"}:void 0,o.diy?{name:"diy",fn:s(({vuecal:l})=>[n(i(l),1)]),key:"8"}:void 0]),1032,["view","dark"])]),_:1},512),a(b,{title:"Custom Title Per View",anchor:"custom-title-per-view"},{desc:s(()=>[e[38]||(e[38]=t("p",null,[n(`If you need a custom title only on a specific view and want to keep it simple,
you can define a custom title for that view by using the `),t("code",{class:"mx1"},"title.[view]"),n(" slot where "),t("code",{class:"mx1"},"[view]"),n(" is the view id.")],-1)),e[39]||(e[39]=t("p",null,[n("The view object is available through the slot-scope, and you can use the "),t("code",{class:"mx1"},"view.id"),n(` property to
check the current view.
`)],-1)),t("div",ee,[e[36]||(e[36]=t("span",{class:"text-right"},"Override title only on:",-1)),a($,{modelValue:x.view,"onUpdate:modelValue":e[9]||(e[9]=l=>x.view=l),items:["day","days","week","month","year","years"].map(l=>({label:l,value:l})),inline:""},null,8,["modelValue","items"]),e[37]||(e[37]=t("span",null,"view.",-1))])]),"code-html":s(()=>[n(`<vue-cal>
  <template #title.`+i(x.view)+`="view">
    `+i('{{ view.start.format("D MMMM YYYY") }}')+` ❤️
  </template>
</vue-cal>
`,1)]),default:s(()=>[a(u(M),{dark:u(p).darkMode,view:x.view},{[`title.${x.view}`]:s(l=>[n(i(l.start.format("D MMMM YYYY"))+" ❤️",1)]),_:2},1032,["dark","view"])]),_:1}),a(b,{title:"Custom Cells",anchor:"custom-cells"},{desc:s(()=>[e[61]||(e[61]=t("div",{class:"todo-tag d-iflex prod"},"TO BE UPDATED SOON",-1)),a(y,{tip:""},{default:s(()=>[e[42]||(e[42]=n("Using Vue.js scoped slots, you can override the calendar cells.")),e[43]||(e[43]=t("br",null,null,-1)),e[44]||(e[44]=n(`
If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
`)),t("a",te,[e[41]||(e[41]=n("vuejs.org/guide/components/slots.htm ")),a(w,{color:"primary"},{default:s(()=>e[40]||(e[40]=[n("mdi mdi-open-in-new")])),_:1})])]),_:1}),e[62]||(e[62]=t("p",{class:"mt6 mb2"},[n("Accessible payload through the "),t("span",{class:"code"},"#cell-content"),n(" scoped slot:")],-1)),e[63]||(e[63]=t("ul",null,[t("li",null,[t("span",{class:"code"},"cell"),n(", object containing the cell date range and the cell events.")])],-1)),e[64]||(e[64]=t("p",null,[n("In this example, only the cell number is clickable on month view."),t("br"),n(`
5 arguments are available through the scoped slot:`),t("br"),n(),t("span",{class:"code"},'#cell-content="{ cell, view, schedule, events, goNarrower }"')],-1)),t("ul",null,[t("li",null,[e[46]||(e[46]=t("span",{class:"code"},"cell",-1)),e[47]||(e[47]=n(", object containing the cell date.")),a(Y,{class:"mt2 mb2",language:"js",dark:u(p).darkMode},{default:s(()=>e[45]||(e[45]=[n(`{
  content: {String}, // Pre-formatted cell content if any.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  formattedDate: {String}, // formatted start date. E.g. "2019-04-05".
  today: {Boolean}, // Whether the cell is today.
  broader: {Function}, // Function to navigate to broader view if possible.
  narrower: {Function}, // Function to navigate to narrower view if possible.
  broaderView: {String}, // String containing the broader view ID.
  narrowerView: {String}, // String containing the narrower view ID.
}`)])),_:1},8,["dark"])]),t("li",null,[e[49]||(e[49]=t("span",{class:"code"},"view",-1)),e[50]||(e[50]=n(", object containing the active view info.")),a(Y,{class:"mt2 mb2",language:"js",dark:u(p).darkMode},{default:s(()=>e[48]||(e[48]=[n(`{
  id: {String}, // Current view, one of: years, year, month, week, day.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  selectedDate: {Date} // JavaScript Date object.
}`)])),_:1},8,["dark"])]),e[51]||(e[51]=t("li",null,[t("span",{class:"code"},"schedule"),n(", when schedules, object containing the current schedule info.")],-1)),e[52]||(e[52]=t("li",null,[t("span",{class:"code"},"events"),n(", array containing all the events of the current cell or schedule.")],-1)),e[53]||(e[53]=t("li",null,[t("span",{class:"code"},"goNarrower"),n(", function to navigate to narrower view if possible.")],-1))]),a(y,{class:"my3",info:""},{default:s(()=>[e[57]||(e[57]=n("By default a cell is rendered as follows.")),e[58]||(e[58]=t("br",null,null,-1)),e[59]||(e[59]=n(`
It is a good idea to reuse the same CSS classes as the different elements have associated styles:`)),e[60]||(e[60]=t("br",null,null,-1)),a(Y,{class:"mt3 mb1",language:"html-vue",dark:u(p).darkMode},{default:s(()=>e[54]||(e[54]=[n('<div class="vuecal__flex vuecal__cell-content">')])),_:1},8,["dark"]),a(Y,{class:"my2 ml5",language:"html-vue",style:{"background-color":"rgba(0, 177, 255, 0.08)"},dark:u(p).darkMode},{default:s(()=>e[55]||(e[55]=[n(`Now this is the part you can customize:

<!-- Will be added if schedules are set -->
<div class="vuecal__schedule" />
<!-- Will be added on years, year & month view -->
<div class="vuecal__cell-date" />
<!-- Will be added on month view -->
<div class="vuecal__cell-events-count" />`)])),_:1},8,["dark"]),a(Y,{class:"my1",language:"html-vue",dark:u(p).darkMode},{default:s(()=>e[56]||(e[56]=[n(`    <div class="vuecal__cell-events" />
</div>`)])),_:1},8,["dark"])]),_:1})]),"code-html":s(()=>e[65]||(e[65]=[n(`<vue-cal
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
</vue-cal>`)])),desc2:s(()=>e[66]||(e[66]=[])),default:s(()=>[a(u(M),{dark:u(p).darkMode,time:!1,"dblclick-to-navigate":!1,view:"month",events:S},{title:s(l=>[e[67]||(e[67]=n("🎉 ")),l.id==="years"?(d(),r("span",ne,"Years")):l.id==="year"?(d(),r("span",le,i(l.start.format("YYYY")),1)):l.id==="month"?(d(),r("span",se,i(l.start.format("MMMM YYYY")),1)):l.id==="week"?(d(),r("span",oe,"w"+i(l.start.getWeek())+" ("+i(l.start.format("MMM YYYY"))+")",1)):l.id==="days"?(d(),r("span",ae,i(l.start.format("D MMMM YYYY"))+" - "+i(l.end.format("D MMMM YYYY")),1)):l.id==="day"?(d(),r("span",ie,i(l.start.format("dddd D MMMM YYYY")),1)):A("",!0),e[68]||(e[68]=n(" 🎉"))]),"cell-date":s(({cell:l})=>[t("button",{onClick:l.goBroader},i(l.start.format()),9,de)]),_:1},8,["dark"])]),_:1}),a(b,{title:"Custom Event Rendering",anchor:"custom-event-rendering"},{desc:s(()=>[e[73]||(e[73]=t("div",{class:"todo-tag d-iflex prod"},"TO BE UPDATED SOON",-1)),e[74]||(e[74]=t("p",{class:"mb2"},"Using Vue.js scoped slots, you can customize the event rendering through the following slots.",-1)),a(y,{class:"my2",tip:""},{default:s(()=>[e[71]||(e[71]=n(`If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it in the
`)),t("a",re,[e[70]||(e[70]=n("Vue.js official documentation ")),a(w,{color:"primary"},{default:s(()=>e[69]||(e[69]=[n("mdi mdi-open-in-new")])),_:1})]),e[72]||(e[72]=n("."))]),_:1}),e[75]||(e[75]=t("ul",null,[t("li",null,[t("span",{class:"code"},"event"),n(": Override the event rendering for all the cases.")]),t("li",null,[t("span",{class:"code"},"event.all-day"),n(": Override the event rendering when the event is all-day.")]),t("li",null,[t("span",{class:"code"},"event.day"),n(": Override the event rendering when the event is on day view.")]),t("li",null,[t("span",{class:"code"},"event.days"),n(": Override the event rendering when the event is on days view.")]),t("li",null,[t("span",{class:"code"},"event.week"),n(": Override the event rendering when the event is on week view.")]),t("li",null,[t("span",{class:"code"},"event.month"),n(": Override the event rendering when the event is on month view.")]),t("li",null,[t("span",{class:"code"},"event.year"),n(": Override the event rendering when the event is on year view.")]),t("li",null,[t("span",{class:"code"},"event.years"),n(": Override the event rendering when the event is on years view.")])],-1)),e[76]||(e[76]=t("p",{class:"mt2"},"You can set any custom attribute on an event, they will then be accessible in the custom event renderer.",-1))]),"code-html":s(()=>e[77]||(e[77]=[n(`<vue-cal
  :events="events">
  <template #event="{ event }">
    <pre>`+i("{{ event }}")+`</pre>
  </template>
</vue-cal>`)])),"code-js":s(()=>[n(`const events = [
  {
    start: new Date(new Date().subtractDays(1).setHours(9, 0, 0, 0)),
    end: new Date(new Date().subtractDays(1).setHours(12, 0, 0, 0)),
    title: 'Golf with John',
    icon: 'mdi mdi-golf',
    class: 'text-center sport'
  },
  {
    start: new Date(new Date().addDays(1).setHours(12, 0, 0, 0)),
    end: new Date(new Date().addDays(1).setHours(15, 0, 0, 0)),
    title: 'Shopping',
    icon: 'mdi mdi-cart-outline',
    class: 'text-center leisure'
  },
  {
    start: '`+i(new Date().format())+`',
    end: '`+i(new Date().addDays(1).format())+`',
    allDay: true,
    title: 'Day off!',
    content: '<i class="icon mdi mdi-umbrella-beach-outline"></i>',
    class: 'yellow-event'
  },
  {
    start: '`+i(new Date().addDays(1).format())+`',
    end: '`+i(new Date().addDays(2).format())+`',
    allDay: true,
    title: 'Anniversary ❤️',
    content: '<i class="icon mdi mdi-heart-outline"></i>',
    class: 'pink-event'
  }
]
`,1)]),default:s(()=>[a(u(M),{"time-from":9*60,"time-to":15*60,views:{days:{cols:5,rows:1}},view:"days","view-date":T.viewDate,"views-bar":!1,events:T.events,dark:u(p).darkMode},{event:s(({event:l})=>[a(w,{class:"ma2",color:"white",xl:""},{default:s(()=>[n(i(l.icon),1)]),_:2},1024),t("div",{class:"title3 mb2",innerHTML:l.title},null,8,ue),t("div",me,[e[78]||(e[78]=t("span",null,"From",-1)),t("strong",ve,i(l.start.formatTime("h{am}")),1),e[79]||(e[79]=t("span",null,"to",-1)),t("strong",ce,i(l.end.formatTime("h{am}")),1)])]),_:1},8,["view-date","events","dark"])]),_:1}),a(b,{title:"Custom Day Schedules Headings",anchor:"custom-schedules-headings"},{desc:s(()=>e[80]||(e[80]=[t("p",{class:"mb6"},"You can define a custom schedule heading through slot.",-1)])),"code-html":s(()=>e[81]||(e[81]=[n(`<vue-cal
  :views="['day', 'week']"
  view="day"
  :schedules="schedules"
  :hide-weekdays="['fri', 'sat', 'sun']">
  <template #schedule-heading="{ schedule, view }">
    <i class="icon mdi mdi-account"></i>
    <strong :style="\`color: \${schedule.color}\`">`+i("{{ schedule.label }}")+`</strong>
  </template>
</vue-cal>`)])),"code-js":s(()=>e[82]||(e[82]=[n(`customDayScheduleHeadings: [
  { label: 'John', color: 'blue', class: 'schedule1' },
  { label: 'Tom', color: 'green', class: 'schedule2' },
  { label: 'Kate', color: 'orange', class: 'schedule3' },
  { label: 'Jess', color: 'red', class: 'schedule4' }
]`)])),"code-css":s(()=>e[83]||(e[83]=[n(`.vuecal__schedule--heading {font-size: 11px;}
.vuecal__body .schedule1 {background-color: rgba(226, 242, 253, 0.7);}
.vuecal__body .schedule2 {background-color: rgba(232, 245, 233, 0.7);}
.vuecal__body .schedule3 {background-color: rgba(255, 243, 224, 0.7);}
.vuecal__body .schedule4 {background-color: rgba(255, 235, 238, 0.7);}
`)])),default:s(()=>[a(u(M),{dark:u(p).darkMode,views:["day","week"],view:"day",schedules:U,"hide-weekdays":["fri","sat","sun"]},{"schedule-heading":s(({schedule:l,view:D})=>[a(w,{color:l.color,size:"18"},{default:s(()=>e[84]||(e[84]=[n("mdi mdi-account")])),_:2},1032,["color"]),t("strong",{style:F(`color: ${l.color}`)},i(l.label),5)]),_:1},8,["dark"])]),_:1}),a(b,{title:"Events on Month View",anchor:"events-on-month-view"},{desc:s(()=>e[85]||(e[85]=[t("p",null,`You can define a custom schedule look when displaying a lot of events on the month view
with a little bit of CSS.
In this example, all the cells have the same adaptive height with an overflow: auto.
`,-1)])),"code-html":s(()=>e[86]||(e[86]=[n(`<vue-cal
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
`)])),"code-js":s(()=>e[87]||(e[87]=[n(`import { ref } from 'vue'
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
`)])),"code-css":s(()=>e[88]||(e[88]=[n(`.vuecal__body-wrap {overflow: hidden;}
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
`)])),default:s(()=>[a(u(M),{dark:u(p).darkMode,events:g.events,view:g.view,"onUpdate:view":e[10]||(e[10]=l=>g.view=l),views:["day","days","week","month"],"time-from":9*60,"time-to":18*60,"time-cell-height":g.view==="day"?59.4:56.6,"events-on-month-view":"",onReady:e[11]||(e[11]=({view:l})=>g.onViewChange(l)),onViewChange:g.onViewChange,style:{height:"600px"}},null,8,["dark","events","view","time-cell-height","onViewChange"])]),_:1})],64)}}};export{he as default};
