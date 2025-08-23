import{u as $,r as c,x as V,D as I,b as r,f as o,w as s,h as n,e as t,a as k,g as u,z as J,y as O,I as z,F as m,j as R,i as B,t as i,q as L,n as A,d,A as F}from"./index-3XXseF32.js";import{c as W,s as E}from"./index-BCYqmXg2.js";import{_ as M}from"./index-CFU_uC7z.js";const G={class:"ml1",href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},P={class:"w-flex column gap1 mt2"},K=["innerHTML"],q={class:"w-flex gap2 mla no-grow"},Q=["innerHTML"],X=["innerHTML"],Z={class:"orange-light2"},ee={class:"w-flex gap2 my2 justify-end"},te={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},ne={key:0},le={key:1},se={key:2},ae={key:3},oe={key:4},ie={key:5},de=["onClick"],re={href:"https://vuejs.org/guide/components/slots.html#scoped-slots",target:"_blank"},ue=["innerHTML"],me={class:"mt2 w-flex wrap justify-center lh0"},ce={class:"mx1"},ve={class:"ml1"},he={__name:"customization",setup(pe){const p=$(),H=c(null),a=V({title:c(!1),prevNextButtons:c(!1),nextButton:c(!1),todayButton:c(!1),weekdayHeading:c(!1),timeCell:c(!1),cellContent:c(!1),header:c(!1),diy:c(!1),view:c("week")});I(()=>`${a.title} ${a.prevNextButtons} ${a.nextButton} ${a.todayButton} ${a.weekdayHeading} ${a.timeCell} ${a.cellContent} ${a.header} ${a.diy}`,()=>{var v,e;return(e=(v=H.value)==null?void 0:v.refreshHeight)==null?void 0:e.call(v)});const N=[{label:"John",color:"blue",class:"schedule1"},{label:"Tom",color:"green",class:"schedule2"},{label:"Kate",color:"orange",class:"schedule3"},{label:"Jess",color:"red",class:"schedule4"}];c(null),c({}),c([{label:"leisure"},{label:"sport"},{label:"health"}]);const _=[{start:"2018-10-30 10:30",end:"2018-10-30 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-16 10:30",end:"2018-11-16 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 10:35",end:"2018-11-19 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 18:30",end:"2018-11-19 19:15",title:"Dentist appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:2},{start:"2018-11-20 18:30",end:"2018-11-20 20:30",title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:"2018-11-21 11:00",end:"2018-11-21 13:00",title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-coffee-outline"></i>',class:"leisure",schedule:1,background:!1},{start:"2018-11-21 19:30",end:"2018-11-21 23:00",title:"Swimming lesson",content:'<i class="w-icon mdi mdi-pool"></i>',class:"sport",schedule:2},{start:"2018-11-23 12:30",end:"2018-11-23 13:00",title:"Macca's with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:"2018-11-23 21:00",end:"2018-11-23 23:30",title:"Movie time",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:"2018-11-30 21:00",end:"2018-11-30 23:30",title:"Another movie tonight",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1}];_.slice(0);const x=V({view:c("day")}),j=V({viewDate:new Date().subtractDays(2),events:[{start:new Date(new Date().subtractDays(1).setHours(9,0,0,0)),end:new Date(new Date().subtractDays(1).setHours(12,0,0,0)),title:"Golf with John",icon:"mdi mdi-golf",class:"text-center sport"},{start:new Date(new Date().addDays(1).setHours(12,0,0,0)),end:new Date(new Date().addDays(1).setHours(15,0,0,0)),title:"Shopping",icon:"mdi mdi-cart-outline",class:"text-center leisure"}]}),g=V({events:[..._],view:c("month"),onViewChange:v=>{g.fetchEvents(v.start.format(),v.end.format())},fetchEvents:async(v,e)=>{const w=E(v),f=E(e);g.events=g.generateRandomEvents(w,f)},generateRandomEvents:(v,e)=>{const w=W(v,e),f=[];for(let y=0;y<w;y++)for(let h=0;h<10;h++){const C=new Date(v.addDays(y).setHours(Math.floor(Math.random()*8)+9,Math.floor(Math.random()*60),0,0)),b=C.addHours(1);f.push({title:`Event ${h}`,start:C,end:b})}return f}});return(v,e)=>{const w=k("w-icon"),f=k("alert"),y=k("w-switch"),h=k("w-button"),C=k("w-tooltip"),b=k("example"),U=k("w-radios"),Y=k("ssh-pre");return d(),r(m,null,[o(f,{class:"mb2"},{default:s(()=>[e[14]||(e[14]=n("If you're not familiar with slots and scoped slots, first read about it in the",-1)),t("a",G,[e[13]||(e[13]=t("strong",null,"official Vue documentation",-1)),o(w,{class:"primary ml1"},{default:s(()=>e[12]||(e[12]=[n("mdi mdi-open-in-new",-1)])),_:1,__:[12]})]),e[15]||(e[15]=n(".",-1))]),_:1,__:[14,15]}),o(f,null,{default:s(()=>e[16]||(e[16]=[n("Here is the list of available slots:",-1),t("ul",null,[t("li",null,[t("span",{class:"code"},"title")]),t("li",null,[t("span",{class:"code"},"title.day")]),t("li",null,[t("span",{class:"code"},"title.days")]),t("li",null,[t("span",{class:"code"},"title.week")]),t("li",null,[t("span",{class:"code"},"title.month")]),t("li",null,[t("span",{class:"code"},"title.year")]),t("li",null,[t("span",{class:"code"},"title.years")]),t("li",null,[t("span",{class:"code"},"previous-button")]),t("li",null,[t("span",{class:"code"},"next-button")]),t("li",null,[t("span",{class:"code"},"today-button")]),t("li",null,[t("span",{class:"code"},"weekday-heading")]),t("li",null,[t("span",{class:"code"},"schedule-heading")]),t("li",null,[t("span",{class:"code"},"time-cell")]),t("li",null,[t("span",{class:"code"},"week-number-cell")]),t("li",null,[t("span",{class:"code"},"cell")]),t("li",null,[t("span",{class:"code"},"cell-content")]),t("li",null,[t("span",{class:"code"},"cell-events")]),t("li",null,[t("span",{class:"code"},"event")]),t("li",null,[t("span",{class:"code"},"event.all-day")]),t("li",null,[t("span",{class:"code"},"event.day")]),t("li",null,[t("span",{class:"code"},"event.days")]),t("li",null,[t("span",{class:"code"},"event.week")]),t("li",null,[t("span",{class:"code"},"event.month")]),t("li",null,[t("span",{class:"code"},"event.year")]),t("li",null,[t("span",{class:"code"},"event.years")]),t("li",null,[t("span",{class:"code"},"events-count")])],-1)])),_:1,__:[16]}),o(b,{ref_key:"exSlotsExampleEl",ref:H,title:"Simple Slots",anchor:"slots"},{desc:s(()=>[e[25]||(e[25]=t("p",null,[n(`Vue Cal is designed to be as flexible and customizable as possible, offering a variety of slots to
help you go beyond the standard features and tailor it to your needs.`),t("br"),n(`
This example highlights the simplest and most commonly used slots.
`)],-1)),t("div",P,[o(y,{modelValue:a.title,"onUpdate:modelValue":e[0]||(e[0]=l=>a.title=l),disabled:a.header||a.diy},{default:s(()=>e[17]||(e[17]=[n("Custom title via ",-1),t("code",{class:"mx1"},"title",-1),n(" slot",-1)])),_:1,__:[17]},8,["modelValue","disabled"]),o(y,{modelValue:a.prevNextButtons,"onUpdate:modelValue":e[1]||(e[1]=l=>a.prevNextButtons=l),disabled:a.header||a.diy},{default:s(()=>e[18]||(e[18]=[n("Custom arrows via ",-1),t("code",{class:"mx1"},"previous-button",-1),n(" & ",-1),t("code",{class:"mx1"},"next-button",-1),n(" slots",-1)])),_:1,__:[18]},8,["modelValue","disabled"]),o(y,{modelValue:a.todayButton,"onUpdate:modelValue":e[2]||(e[2]=l=>a.todayButton=l),disabled:a.header||a.diy},{default:s(()=>e[19]||(e[19]=[n("Custom today button via ",-1),t("code",{class:"mx1"},"today-button",-1),n(" slot",-1)])),_:1,__:[19]},8,["modelValue","disabled"]),o(y,{modelValue:a.weekdayHeading,"onUpdate:modelValue":e[3]||(e[3]=l=>a.weekdayHeading=l),disabled:a.header||a.diy},{default:s(()=>e[20]||(e[20]=[n("Custom weekday labels via ",-1),t("code",{class:"mx1"},"weekday-heading",-1),n(" slot",-1)])),_:1,__:[20]},8,["modelValue","disabled"]),o(y,{modelValue:a.header,"onUpdate:modelValue":e[4]||(e[4]=l=>a.header=l),disabled:a.diy},{default:s(()=>e[21]||(e[21]=[n("Custom header via ",-1),t("code",{class:"mx1"},"header",-1),n(" slot",-1)])),_:1,__:[21]},8,["modelValue","disabled"]),o(y,{modelValue:a.timeCell,"onUpdate:modelValue":e[5]||(e[5]=l=>a.timeCell=l),disabled:a.diy},{default:s(()=>e[22]||(e[22]=[n("time cell labels via ",-1),t("code",{class:"mx1"},"time-cell",-1),n(" slot",-1)])),_:1,__:[22]},8,["modelValue","disabled"]),o(y,{modelValue:a.cellContent,"onUpdate:modelValue":e[6]||(e[6]=l=>a.cellContent=l),disabled:a.diy},{default:s(()=>e[23]||(e[23]=[n("Custom cell content via ",-1),t("code",{class:"mx1"},"cell-content",-1),n(" slot",-1)])),_:1,__:[23]},8,["modelValue","disabled"]),o(y,{modelValue:a.diy,"onUpdate:modelValue":e[7]||(e[7]=l=>a.diy=l)},{default:s(()=>e[24]||(e[24]=[n("DIY via ",-1),t("code",{class:"mx1"},"diy",-1),n(" slot: you've got the power, build something nice!",-1)])),_:1,__:[24]},8,["modelValue"])])]),"code-html":s(()=>[e[30]||(e[30]=n('<vue-cal :time-from="9 * 60" :time-to="14 * 60">',-1)),a.diy?(d(),r(m,{key:0},[e[26]||(e[26]=n(`

  <template #diy="{ vuecal, view }">
    `+i("{{ view }}"),-1)),e[27]||(e[27]=t("br",null,null,-1)),e[28]||(e[28]=t("br",null,null,-1)),e[29]||(e[29]=n(i("{{ vuecal }}")+`
  </template>`,-1))],64)):(d(),r(m,{key:1},[a.header?(d(),r(m,{key:0},[n(`

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
  </template>`)],64)):(d(),r(m,{key:1},[a.title?(d(),r(m,{key:0},[n(`

  <template #title="view">
    <code v-html="view.title"></code>
  </template>`)],64)):(d(),r(m,{key:1},[],64)),a.prevNextButtons?(d(),r(m,{key:2},[n(`

  <template #previous-button>
    <i class="icon mdi mdi-arrow-left"></i>
  </template>

  <template #next-button>
    <i class="icon mdi mdi-arrow-right"></i>
  </template>`)],64)):(d(),r(m,{key:3},[],64)),a.todayButton?(d(),r(m,{key:4},[n(`

  <template #today-button>
    <!-- Using Wave UI -->
    <w-tooltip>
      <template #activator="{ on }">
        <w-btn v-on="on" icon="mdi mdi-calendar-today">
        </w-btn>
        <span>Go to Today's date</span>
      </template>
    </w-tooltip>
  </template>`)],64)):(d(),r(m,{key:5},[],64)),a.weekdayHeading?(d(),r(m,{key:6},[n(`

  <template #weekday-heading="{ label, id }">
    <strong>`+i("{{ label }}")+`</strong>
  </template>`)],64)):(d(),r(m,{key:7},[],64))],64)),a.timeCell?(d(),r(m,{key:2},[n(`

  <template #time-cell="{ format24 }">
    <strong>`+i("{{ format24 }}")+`</strong>
  </template>`)],64)):(d(),r(m,{key:3},[],64)),a.cellContent?(d(),r(m,{key:4},[n(`

  <template #cell-content>
    <i class="icon mdi mdi-party-popper"></i>
  </template>`)],64)):(d(),r(m,{key:5},[],64))],64)),e[31]||(e[31]=n(`
</vue-cal>`,-1))]),default:s(()=>[o(u(M),{class:"grow",view:a.view,"onUpdate:view":e[8]||(e[8]=l=>a.view=l),"time-from":540,"time-to":900,dark:u(p).darkMode,style:{height:"331px"}},J({_:2},[a.todayButton?{name:"today-button",fn:s(({navigate:l,active:D})=>[o(C,{left:""},{activator:s(({on:T})=>[o(h,O(z({...T,click:l}),{onClick:l,disabled:D,color:"orange-light2",text:"",icon:"mdi mdi-calendar-today","icon-props":{size:"1.2rem"}}),null,16,["onClick","disabled"])]),default:s(()=>[e[32]||(e[32]=t("span",null,"Go to Today's date",-1))]),_:2,__:[32]},1024)]),key:"0"}:void 0,a.header?{name:"header",fn:s(({view:l,availableViews:D})=>[t("div",{class:B(["w-flex gap2 pa1 align-center",u(p).darkMode?"orange-dark3--bg":"orange-light5--bg"])},[o(h,{color:"base-color",icon:"wi-chevron-left",onClick:l.previous},null,8,["onClick"]),t("div",{class:"base-color",innerHTML:l.title},null,8,K),o(h,{color:"base-color",icon:"wi-chevron-right",onClick:l.next},null,8,["onClick"]),t("div",q,[(d(!0),r(m,null,R(D,(T,S)=>(d(),F(h,{class:"text-upper",onClick:we=>a.view=S,color:"base-color",outline:l.id===S,sm:""},{default:s(()=>[n(i(S),1)]),_:2},1032,["onClick","outline"]))),256))])],2)]),key:"1"}:void 0,a.title?{name:"title",fn:s(({title:l})=>[t("code",{class:"orange-light2",innerHTML:l},null,8,Q)]),key:"2"}:void 0,a.weekdayHeading?{name:"weekday-heading",fn:s(({label:l,id:D})=>[t("strong",{class:B(["orange-light2",D]),innerHTML:l},null,10,X)]),key:"3"}:void 0,a.prevNextButtons?{name:"previous-button",fn:s(()=>[o(w,{class:"orange-light2",md:""},{default:s(()=>e[33]||(e[33]=[n("mdi mdi-arrow-left",-1)])),_:1,__:[33]})]),key:"4"}:void 0,a.prevNextButtons?{name:"next-button",fn:s(()=>[o(w,{class:"orange-light2",md:""},{default:s(()=>e[34]||(e[34]=[n("mdi mdi-arrow-right",-1)])),_:1,__:[34]})]),key:"5"}:void 0,a.timeCell?{name:"time-cell",fn:s(({format24:l})=>[t("strong",Z,i(l),1)]),key:"6"}:void 0,a.cellContent?{name:"cell-content",fn:s(()=>[o(w,{class:"orange-light2",lg:""},{default:s(()=>e[35]||(e[35]=[n("mdi mdi-party-popper",-1)])),_:1,__:[35]})]),key:"7"}:void 0,a.diy?{name:"diy",fn:s(({vuecal:l})=>[n(i(l),1)]),key:"8"}:void 0]),1032,["view","dark"])]),_:1},512),o(b,{title:"Custom Title Per View",anchor:"custom-title-per-view"},{desc:s(()=>[e[38]||(e[38]=t("p",null,[n(`If you need a custom title only on a specific view and want to keep it simple,
you can define a custom title for that view by using the `),t("code",{class:"mx1"},"title.[view]"),n(" slot where "),t("code",{class:"mx1"},"[view]"),n(" is the view id.")],-1)),e[39]||(e[39]=t("p",null,[n("The view object is available through the slot-scope, and you can use the "),t("code",{class:"mx1"},"view.id"),n(` property to
check the current view.
`)],-1)),t("div",ee,[e[36]||(e[36]=t("span",{class:"text-right"},"Override title only on:",-1)),o(U,{modelValue:x.view,"onUpdate:modelValue":e[9]||(e[9]=l=>x.view=l),items:["day","days","week","month","year","years"].map(l=>({label:l,value:l})),inline:""},null,8,["modelValue","items"]),e[37]||(e[37]=t("span",null,"view.",-1))])]),"code-html":s(()=>[n(`<vue-cal>
  <template #title.`+i(x.view)+`="view">
    `+i('{{ view.start.format("D MMMM YYYY") }}')+` ❤️
  </template>
</vue-cal>
`,1)]),default:s(()=>[o(u(M),{dark:u(p).darkMode,view:x.view},{[`title.${x.view}`]:s(l=>[n(i(l.start.format("D MMMM YYYY"))+" ❤️",1)]),_:2},1032,["dark","view"])]),_:1}),o(b,{title:"Custom Cells",anchor:"custom-cells"},{desc:s(()=>[e[61]||(e[61]=t("div",{class:"todo-tag d-iflex prod"},"TO BE UPDATED SOON",-1)),o(f,{tip:""},{default:s(()=>[e[42]||(e[42]=n("Using Vue.js scoped slots, you can override the calendar cells.",-1)),e[43]||(e[43]=t("br",null,null,-1)),e[44]||(e[44]=n(`
If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it:
`,-1)),t("a",te,[e[41]||(e[41]=n("vuejs.org/guide/components/slots.htm ",-1)),o(w,{color:"primary"},{default:s(()=>e[40]||(e[40]=[n("mdi mdi-open-in-new",-1)])),_:1,__:[40]})])]),_:1,__:[42,43,44]}),e[62]||(e[62]=t("p",{class:"mt6 mb2"},[n("Accessible payload through the "),t("span",{class:"code"},"#cell-content"),n(" scoped slot:")],-1)),e[63]||(e[63]=t("ul",null,[t("li",null,[t("span",{class:"code"},"cell"),n(", object containing the cell date range and the cell events.")])],-1)),e[64]||(e[64]=t("p",null,[n("In this example, only the cell number is clickable on month view."),t("br"),n(`
5 arguments are available through the scoped slot:`),t("br"),n(),t("span",{class:"code"},'#cell-content="{ cell, view, schedule, events, goNarrower }"')],-1)),t("ul",null,[t("li",null,[e[46]||(e[46]=t("span",{class:"code"},"cell",-1)),e[47]||(e[47]=n(", object containing the cell date.",-1)),o(Y,{class:"mt2 mb2",language:"js",dark:u(p).darkMode},{default:s(()=>e[45]||(e[45]=[n(`{
  content: {String}, // Pre-formatted cell content if any.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  formattedDate: {String}, // formatted start date. E.g. "2019-04-05".
  today: {Boolean}, // Whether the cell is today.
  broader: {Function}, // Function to navigate to broader view if possible.
  narrower: {Function}, // Function to navigate to narrower view if possible.
  broaderView: {String}, // String containing the broader view ID.
  narrowerView: {String}, // String containing the narrower view ID.
}`,-1)])),_:1,__:[45]},8,["dark"])]),t("li",null,[e[49]||(e[49]=t("span",{class:"code"},"view",-1)),e[50]||(e[50]=n(", object containing the active view info.",-1)),o(Y,{class:"mt2 mb2",language:"js",dark:u(p).darkMode},{default:s(()=>e[48]||(e[48]=[n(`{
  id: {String}, // Current view, one of: years, year, month, week, day.
  start: {Date}, // JavaScript Date object.
  end: {Date}, // JavaScript Date object.
  selectedDate: {Date} // JavaScript Date object.
}`,-1)])),_:1,__:[48]},8,["dark"])]),e[51]||(e[51]=t("li",null,[t("span",{class:"code"},"schedule"),n(", when schedules, object containing the current schedule info.")],-1)),e[52]||(e[52]=t("li",null,[t("span",{class:"code"},"events"),n(", array containing all the events of the current cell or schedule.")],-1)),e[53]||(e[53]=t("li",null,[t("span",{class:"code"},"goNarrower"),n(", function to navigate to narrower view if possible.")],-1))]),o(f,{class:"my3",info:""},{default:s(()=>[e[57]||(e[57]=n("By default a cell is rendered as follows.",-1)),e[58]||(e[58]=t("br",null,null,-1)),e[59]||(e[59]=n(`
It is a good idea to reuse the same CSS classes as the different elements have associated styles:`,-1)),e[60]||(e[60]=t("br",null,null,-1)),o(Y,{class:"mt3 mb1",language:"html-vue",dark:u(p).darkMode},{default:s(()=>e[54]||(e[54]=[n('<div class="vuecal__flex vuecal__cell-content">',-1)])),_:1,__:[54]},8,["dark"]),o(Y,{class:"my2 ml5",language:"html-vue",style:{"background-color":"rgba(0, 177, 255, 0.08)"},dark:u(p).darkMode},{default:s(()=>e[55]||(e[55]=[n(`Now this is the part you can customize:

<!-- Will be added if schedules are set -->
<div class="vuecal__schedule" />
<!-- Will be added on years, year & month view -->
<div class="vuecal__cell-date" />
<!-- Will be added on month view -->
<div class="vuecal__cell-events-count" />`,-1)])),_:1,__:[55]},8,["dark"]),o(Y,{class:"my1",language:"html-vue",dark:u(p).darkMode},{default:s(()=>e[56]||(e[56]=[n(`    <div class="vuecal__cell-events" />
</div>`,-1)])),_:1,__:[56]},8,["dark"])]),_:1,__:[57,58,59,60]})]),"code-html":s(()=>e[65]||(e[65]=[n(`<vue-cal
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
</vue-cal>`,-1)])),desc2:s(()=>e[66]||(e[66]=[])),default:s(()=>[o(u(M),{dark:u(p).darkMode,time:!1,"dblclick-to-navigate":!1,view:"month",events:_},{title:s(l=>[e[67]||(e[67]=n("🎉 ",-1)),l.id==="years"?(d(),r("span",ne,"Years")):l.id==="year"?(d(),r("span",le,i(l.start.format("YYYY")),1)):l.id==="month"?(d(),r("span",se,i(l.start.format("MMMM YYYY")),1)):l.id==="week"?(d(),r("span",ae,"w"+i(l.start.getWeek())+" ("+i(l.start.format("MMM YYYY"))+")",1)):l.id==="days"?(d(),r("span",oe,i(l.start.format("D MMMM YYYY"))+" - "+i(l.end.format("D MMMM YYYY")),1)):l.id==="day"?(d(),r("span",ie,i(l.start.format("dddd D MMMM YYYY")),1)):L("",!0),e[68]||(e[68]=n(" 🎉",-1))]),"cell-date":s(({cell:l})=>[t("button",{onClick:l.goBroader},i(l.start.format()),9,de)]),_:1},8,["dark"])]),_:1}),o(b,{title:"Custom Event Rendering",anchor:"custom-event-rendering"},{desc:s(()=>[e[73]||(e[73]=t("p",{class:"mb2"},"Using Vue.js scoped slots, you can customize the event rendering through the following slots.",-1)),o(f,{class:"my2",tip:""},{default:s(()=>[e[71]||(e[71]=n(`If you are not familiar with scoped slots and destructuring slot-scope, you should first read about it in the
`,-1)),t("a",re,[e[70]||(e[70]=n("Vue.js official documentation ",-1)),o(w,{color:"primary"},{default:s(()=>e[69]||(e[69]=[n("mdi mdi-open-in-new",-1)])),_:1,__:[69]})]),e[72]||(e[72]=n(".",-1))]),_:1,__:[71,72]}),e[74]||(e[74]=t("ul",null,[t("li",null,[t("span",{class:"code"},"event"),n(": Override the event rendering for all the cases.")]),t("li",null,[t("span",{class:"code"},"event.all-day"),n(": Override the event rendering when the event is all-day.")]),t("li",null,[t("span",{class:"code"},"event.day"),n(": Override the event rendering when the event is on day view.")]),t("li",null,[t("span",{class:"code"},"event.days"),n(": Override the event rendering when the event is on days view.")]),t("li",null,[t("span",{class:"code"},"event.week"),n(": Override the event rendering when the event is on week view.")]),t("li",null,[t("span",{class:"code"},"event.month"),n(": Override the event rendering when the event is on month view.")]),t("li",null,[t("span",{class:"code"},"event.year"),n(": Override the event rendering when the event is on year view.")]),t("li",null,[t("span",{class:"code"},"event.years"),n(": Override the event rendering when the event is on years view.")])],-1)),e[75]||(e[75]=t("p",{class:"mt2"},"You can set any custom attribute on an event, they will then be accessible in the custom event renderer.",-1))]),"code-html":s(()=>e[76]||(e[76]=[n(`<vue-cal
  :events="events">
  <template #event="{ event }">
    <pre>`+i("{{ event }}")+`</pre>
  </template>
</vue-cal>`,-1)])),"code-js":s(()=>[n(`const events = [
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
`,1)]),default:s(()=>[o(u(M),{"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","view-date":j.viewDate,"views-bar":!1,events:j.events,dark:u(p).darkMode},{event:s(({event:l})=>[o(w,{class:"ma2",color:"white",xl:""},{default:s(()=>[n(i(l.icon),1)]),_:2},1024),t("div",{class:"title3 mb2",innerHTML:l.title},null,8,ue),t("div",me,[e[77]||(e[77]=t("span",null,"From",-1)),t("strong",ce,i(l.start.formatTime("h{am}")),1),e[78]||(e[78]=t("span",null,"to",-1)),t("strong",ve,i(l.end.formatTime("h{am}")),1)])]),_:1},8,["view-date","events","dark"])]),_:1}),o(b,{title:"Custom Day Schedules Headings",anchor:"custom-schedules-headings"},{desc:s(()=>e[79]||(e[79]=[t("p",{class:"mb6"},"You can define a custom schedule heading through slot.",-1)])),"code-html":s(()=>e[80]||(e[80]=[n(`<vue-cal
  :views="['day', 'week']"
  view="day"
  :schedules="schedules"
  :hide-weekdays="['fri', 'sat', 'sun']">
  <template #schedule-heading="{ schedule, view }">
    <i class="icon mdi mdi-account"></i>
    <strong :style="\`color: \${schedule.color}\`">`+i("{{ schedule.label }}")+`</strong>
  </template>
</vue-cal>`,-1)])),"code-js":s(()=>e[81]||(e[81]=[n(`customDayScheduleHeadings: [
  { label: 'John', color: 'blue', class: 'schedule1' },
  { label: 'Tom', color: 'green', class: 'schedule2' },
  { label: 'Kate', color: 'orange', class: 'schedule3' },
  { label: 'Jess', color: 'red', class: 'schedule4' }
]`,-1)])),"code-css":s(()=>e[82]||(e[82]=[n(`.vuecal__schedule--heading {font-size: 11px;}
.vuecal__body .schedule1 {background-color: rgba(226, 242, 253, 0.7);}
.vuecal__body .schedule2 {background-color: rgba(232, 245, 233, 0.7);}
.vuecal__body .schedule3 {background-color: rgba(255, 243, 224, 0.7);}
.vuecal__body .schedule4 {background-color: rgba(255, 235, 238, 0.7);}
`,-1)])),default:s(()=>[o(u(M),{dark:u(p).darkMode,views:["day","week"],view:"day",schedules:N,"hide-weekdays":["fri","sat","sun"]},{"schedule-heading":s(({schedule:l,view:D})=>[o(w,{color:l.color,size:"18"},{default:s(()=>e[83]||(e[83]=[n("mdi mdi-account",-1)])),_:2,__:[83]},1032,["color"]),t("strong",{style:A(`color: ${l.color}`)},i(l.label),5)]),_:1},8,["dark"])]),_:1}),o(b,{title:"Events on Month View",anchor:"events-on-month-view"},{desc:s(()=>e[84]||(e[84]=[t("p",null,`You can define a custom schedule look when displaying a lot of events on the month view
with a little bit of CSS.
In this example, all the cells have the same adaptive height with an overflow: auto.
`,-1)])),"code-html":s(()=>e[85]||(e[85]=[n(`<vue-cal
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
`,-1)])),"code-js":s(()=>e[86]||(e[86]=[n(`import { ref } from 'vue'
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
`,-1)])),"code-css":s(()=>e[87]||(e[87]=[n(`.vuecal__body-wrap {overflow: hidden;}
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
`,-1)])),default:s(()=>[o(u(M),{dark:u(p).darkMode,events:g.events,view:g.view,"onUpdate:view":e[10]||(e[10]=l=>g.view=l),views:["day","days","week","month"],"time-from":540,"time-to":1080,"time-cell-height":g.view==="day"?59.4:56.6,"events-on-month-view":"",onReady:e[11]||(e[11]=({view:l})=>g.onViewChange(l)),onViewChange:g.onViewChange,style:{height:"600px"}},null,8,["dark","events","view","time-cell-height","onViewChange"])]),_:1})],64)}}};export{he as default};
