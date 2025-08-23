import{u as U,x as h,c as V,r as m,b as v,f as l,A as W,q as A,w as s,e as n,h as t,t as i,a as f,g as d,i as F,z as N,F as p,d as r}from"./index-3XXseF32.js";import"./index-BCYqmXg2.js";import{_ as k}from"./index-CFU_uC7z.js";const q={class:"w-flex justify-end my2"},J={key:0},I={key:1},L={class:"w-flex align-center justify-end gap2"},Y=["innerHTML"],G={class:"w-flex column align-end gap1"},R={key:0,class:"warning--bg bdrsr w-icon size--xs pa2 mr-6 mb1 align-self-end"},$={class:"w-flex justify-end mt8 mb3"},K={class:"w-flex column gap1 align-end"},ee={__name:"calendar-events-display",setup(X){const D=U(),C=[{start:new Date(new Date().setHours(11,0)).subtractDays(2),end:new Date(new Date().setHours(13,0)).subtractDays(2),title:"Salsa Dance Class",content:'<i class="w-icon mdi mdi-dance-ballroom"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(12,30)),end:new Date(new Date().setHours(13,30)),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:new Date(new Date().setHours(11,30)).addDays(1),end:new Date(new Date().setHours(12,30)).addDays(1),title:"Dentist Appt.",content:'<i class="w-icon mdi mdi-tooth"></i>',class:"health",schedule:2},{start:new Date(new Date().setHours(13,0)).addDays(1),end:new Date(new Date().setHours(14,0)).addDays(1),title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(10,0)).addDays(3),end:new Date(new Date().setHours(11,30)).addDays(3),title:"Swimming Class",content:'<i class="w-icon mdi mdi-swim"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(11,35)).addDays(3),end:new Date(new Date().setHours(12,30)).addDays(3),title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-food-croissant"></i>',class:"leisure",schedule:1,background:!1},{start:new Date(new Date().setHours(9,0)).addDays(4),end:new Date(new Date().setHours(10,0)).addDays(4),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:new Date(new Date().setHours(11,30)).addDays(4),end:new Date(new Date().setHours(12,25)).addDays(4),title:"BK with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:new Date(new Date().setHours(12,30)).addDays(4),end:new Date(new Date().setHours(14,30)).addDays(4),title:"Movie Theater",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:new Date(new Date().setHours(11,30,21,0)).addDays(5),end:new Date(new Date().setHours(12,30,23,30)).addDays(5),title:"Movie Night",content:'<i class="w-icon mdi mdi-popcorn"></i>',class:"leisure",schedule:1},{start:new Date(new Date().setHours(10,0)).addDays(7),end:new Date(new Date().setHours(11,0)).addDays(7),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1}],y=h({showBgEvents:m(!1),initEvents:()=>{const u=[...C,...Array(5).fill({}).map((e,x)=>({start:new Date(new Date().setHours(12,0)).addDays(x),end:new Date(new Date().setHours(14,0)).addDays(x),class:"lunch",background:!0}))];return u[2]={...u[2],backgroundColor:"rgb(158 199 237)",color:"#0e5597"},delete u[2].class,u},allEvents:[],events:V(()=>y.allEvents.filter(u=>y.showBgEvents||!u.background))});y.allEvents=y.initEvents();const O=h({events:[{start:new Date,end:new Date,title:"Salsa Dance Class",content:'<i class="w-icon mdi mdi-dance-ballroom"></i>',class:"sport"},{start:new Date,end:new Date,title:"Dentist Appt.",content:'<i class="w-icon mdi mdi-tooth"></i>',class:"health"},{start:new Date().addDays(1),end:new Date().addDays(1),title:"Golf with John",content:'<i class="w-icon mdi mdi-golf"></i>',class:"sport"},{start:new Date().addDays(2),end:new Date().addDays(2),title:"Grocery Shopping",content:'<i class="w-icon mdi mdi-cart-outline"></i>',class:"leisure"},{start:new Date().addDays(2),end:new Date().addDays(2),title:"Dad's Birthday!",content:'<i class="w-icon mdi mdi-cake-variant-outline"></i>',class:"sport"},{start:new Date().addDays(3),end:new Date().addDays(3),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health"},{start:new Date().addDays(4),end:new Date().addDays(4),title:"Burger King",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure"}]}),c=h({showDialog:!1,openDialog:({event:u})=>{c.event=u,c.showDialog=!0},events:[...C]}),S=h({counter:0,events:m([]),onEventCreate:({event:u,resolve:e})=>e({...u,title:"Event "+ ++S.counter}),addEvent:()=>S.events.push({start:new Date,end:new Date().addHours(1),title:"Event "+ ++S.counter})}),a=h({showEvents:m(!0),showEventCount:m(!1),highlightCells:m(!1),eventCountStyle:m("dot"),eventCountStyleOptions:[{label:"Dot",value:"dot"},{label:"Dash",value:"dash"},{label:"Caption",value:"caption"},{label:"Use slot",value:"slot"}],classes:V(()=>({[`event-count--${a.eventCountStyle}`]:a.showEventCount,"vuecal--highlight-cells":a.highlightCells}))}),E=h({events:m([...C.map(u=>({...u})),{start:new Date(new Date().setHours(12,0)).addDays(1),end:new Date(new Date().setHours(14,0)).addDays(1),title:"Event 1",class:"event-1"},{start:new Date(new Date().setHours(12,0)).addDays(1),end:new Date(new Date().setHours(14,0)).addDays(1),title:"Event 2",class:"event-2"},{start:new Date(new Date().setHours(11,0)).addDays(2),end:new Date(new Date().setHours(13,0)).addDays(2),title:"Event 3",class:"event-3"},{start:new Date(new Date().setHours(12,0)).addDays(2),end:new Date(new Date().setHours(14,0)).addDays(2),title:"Event 4",class:"event-4"}]),minEventWidth:m(0),stackEvents:m(!1)}),w=h({allDayEvents:m(0),allDayBarOn:m(!0),allDayEventsOn:m(!0),events:V(()=>[{start:new Date().format(),end:new Date().addDays(1).format(),title:"Day off!",content:'<i class="w-icon mdi mdi-umbrella-beach-outline"></i>',class:"yellow-event",allDay:w.allDayEventsOn},{start:new Date().addDays(1).format(),end:new Date().addDays(2).format(),title:"Anniversary ❤️",content:'<i class="w-icon mdi mdi-heart-outline"></i>',class:"pink-event",allDay:w.allDayEventsOn},{start:new Date().addDays(1).format(),end:new Date().addDays(2).format(),title:"Grocery Shopping",content:'<i class="w-icon mdi mdi-cart-outline"></i>',class:"leisure",allDay:w.allDayEventsOn},{start:new Date(new Date().addDays(1).setHours(10,35)),end:new Date(new Date().addDays(1).setHours(11,30)),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1}])}),B=h({events:[{start:new Date(new Date().setMinutes(0,0,0)),end:new Date(new Date().setHours(23,0,0,0)).addDays(1),title:"Running Marathon",content:'<i class="w-icon mdi mdi-run"></i>',class:"sport"},{start:new Date().addDays(1),end:new Date().addDays(1).addHours(1),title:"Drink water!",content:'<i class="w-icon mdi mdi-glass-cocktail"></i>',class:"health drink-water"},{start:new Date(new Date().setHours(6,0,0,0)).addDays(2),end:new Date(new Date().setHours(21,0,0,0)).addDays(4),title:"Trip to India",content:'<i class="w-icon mdi mdi-airplane"></i>',class:"leisure"}]});return h({}),(u,e)=>{const x=f("alert"),g=f("w-switch"),b=f("example"),M=f("w-icon"),T=f("w-dialog"),z=f("router-link"),j=f("w-radios"),_=f("w-image");return r(),v(p,null,[l(x,{info:""},{default:s(()=>[e[24]||(e[24]=n("h3",{class:"mt-2 mb2"},"Read First",-1)),e[25]||(e[25]=n("p",null,"Events are always rendered in cells, whether a time column is displayed or not.",-1)),n("ul",null,[e[22]||(e[22]=n("li",null,[t("Events are defined essentially with "),n("code",null,"start"),t(" and "),n("code",null,"end"),t(` attributes, but can contain a
lot more attributes, even custom ones.`)],-1)),n("li",null,[e[13]||(e[13]=n("code",null,"start",-1)),e[14]||(e[14]=t(" and ",-1)),e[15]||(e[15]=n("code",null,"end",-1)),e[16]||(e[16]=t(` can be defined (by you) as both a native JavaScript Date or a
Formatted date time such as `,-1)),n("code",null,i(new Date().format())+" "+i(new Date().formatTime()),1),e[17]||(e[17]=t(`.
But if given as a string, Vue Cal will automatically convert it to a JavaScript Date.
Thus, any time you access the event object, the `,-1)),e[18]||(e[18]=n("code",null,"start",-1)),e[19]||(e[19]=t(" and ",-1)),e[20]||(e[20]=n("code",null,"end",-1)),e[21]||(e[21]=t(` will always be
a JavaScript Date.`,-1))]),e[23]||(e[23]=n("li",null,`When the events are editable, they can be created, deleted, dragged and dropped to a different
date and time and resized. There's also a more granular control on what exactly should be editable.
`,-1))])]),_:1,__:[24,25]}),l(b,{title:"Events & Background Events",anchor:"events"},{desc:s(()=>[e[27]||(e[27]=n("p",null,[t("Events are defined by a "),n("code",null,"start"),t(" and "),n("code",null,"end"),t(` dates, provided as a JavaScript Date object
or a formatted date and time. Additionally, you can optionally add a title, content, and a CSS class.`),n("br")],-1)),e[28]||(e[28]=n("ul",null,[n("li",null,[t("Adding a "),n("code",null,"background: true"),t(` property to the event object will make it behave like a background event:
it can be overlapped without constraint (not affected by other events).`),n("br")]),n("li",null,[t("Events are best styled with CSS classes using the "),n("code",null,"class"),t(` property, but you can also provide
a `),n("code",null,"backgroundColor"),t(" and a "),n("code",null,"color"),t(` property to dynamically change the event's
background and text colors. Like in this example, the "Dentist Appointment" event has a dynamic
background color and text color.
`)])],-1)),n("div",q,[l(g,{modelValue:y.showBgEvents,"onUpdate:modelValue":e[0]||(e[0]=o=>y.showBgEvents=o)},{default:s(()=>e[26]||(e[26]=[t("Show Background Events",-1)])),_:1,__:[26]},8,["modelValue"])])]),"code-html":s(()=>e[29]||(e[29]=[t('<vue-cal :events="events" />',-1)])),"code-js":s(()=>[e[30]||(e[30]=t(`const events = [
  {
    start: new Date(new Date().setHours(10, 30, 0, 0)),
    end: new Date(new Date().setHours(11, 30, 0, 0)),
    title: 'Doctor Appt.',
    content: '<i class="icon mdi mdi-stethoscope"></i>',
    class: 'health' // Custom CSS class.
  },
  {
    start: new Date(new Date().setHours(9, 0)).addDays(4), // Using Vue Cal's Date prototypes.
    end: new Date(new Date().setHours(10, 0)).addDays(4), // Using Vue Cal's Date prototypes.
    title: 'Doctor Appt.',
    content: '<i class="w-icon mdi mdi-stethoscope"></i>',
    class: 'health',
    backgroundColor: 'rgb(158 199 237)', // Dynamic colors.
    color: '#0e5597' // Dynamic colors.
  },
`,-1)),y.showBgEvents?(r(),v("span",J,`  {
    start: new Date(new Date().setHours(12, 0, 0, 0)),
    end: new Date(new Date().setHours(14, 0, 0, 0)),
    class: 'lunch',
    background: true // Background event.
  },
`)):(r(),v("span",I)),e[31]||(e[31]=t(`  ...
]`,-1))]),"code-css":s(()=>[t(`.vuecal__event {color: #fff;border: 1px solid;}
.vuecal__event.leisure {background-color: #fd9c42d9;}
.vuecal__event.health {background-color: #57cea9cc;}
.vuecal__event.sport {background-color: #ff6666d9;}
.vuecal__event.lunch {
  background-color: repeating-linear-gradient(45deg, transparent 0 10px, `+i(d(D).darkMode?"#ffffff11":"#00000011")+` 10px 20px);
  border: none;
}`,1)]),default:s(()=>[l(d(k),{"time-from":540,"time-to":840,events:y.events,"onUpdate:events":e[1]||(e[1]=o=>y.events=o),views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:d(D).darkMode,style:{height:"261px"}},null,8,["events","dark"])]),_:1}),l(b,{title:"Timeless Events",anchor:"timeless-events"},{desc:s(()=>e[32]||(e[32]=[n("p",null,[t("When "),n("code",null,"time"),t(" is set to "),n("code",null,"false"),t(`, the calendar and the events are timeless. The events can't be
resized.`)],-1)])),"code-html":s(()=>e[33]||(e[33]=[t('<vue-cal :time="false" :events="events" />',-1)])),"code-js":s(()=>e[34]||(e[34]=[t(`const events = [
  {
    start: new Date(),
    end: new Date(),
    title: 'Salsa Dance Class',
    content: '<i class="icon mdi mdi-dance-ballroom"></i>',
    class: 'sport'
  },
  ...
]`,-1)])),default:s(()=>[l(d(k),{dark:d(D).darkMode,time:!1,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,events:O.events},null,8,["dark","events"])]),_:1}),l(b,{title:"Open a Dialog on Event Click",anchor:"open-dialog-on-event-click"},{desc:s(()=>e[35]||(e[35]=[n("p",{class:"mb2"},[t(`You can attach whatever event listener you want to the events: it only needs to start with
`),n("code",null,"@event-"),t("."),n("br"),t(`
For instance, let's open a dialog on event click `),n("code",null,"@event-click"),t(`. When it's called, your
callback function will receive in parameter an object containing:`)],-1),n("ul",null,[n("li",null,[n("code",null,"event"),t(": the clicked calendar event's object")]),n("li",null,[n("code",null,"e"),t(": the associated javascript DOM event")])],-1)])),"code-html":s(()=>e[36]||(e[36]=[t(`<vue-cal :events="events" @event-click="openDialog" />

<!-- Using Wave UI - https://antoniandre.github.io/wave-ui -->
<w-dialog
  v-if="demo.event"
  v-model="showDialog"
  :title="selectedEvent.title"
  width="300">
  <w-flex align-center justify-end gap2>
    <w-icon class="grey">mdi mdi-calendar</w-icon>
    <small>`+i("{{ selectedEvent.start.format() }}")+`</small>
    <w-icon class="grey ml2">mdi mdi-clock-outline</w-icon>
    <small>
      `+i("{{ selectedEvent.start.formatTime() }}")+`
      - `+i("{{ selectedEvent.end.formatTime() }}")+`
    </small>
  </w-flex>
  <w-flex
    class="align-center justify-center title1 mt6 mb4"
    v-html="selectedEvent.content">
  </w-flex>
  <p>`+i("{{ selectedEvent.contentFull }}")+`</p>
</w-dialog>`,-1)])),"code-js":s(()=>e[37]||(e[37]=[t(`const showDialog = ref(false)
const selectedEvent = ref(null)

const events = [
  {
    start: new Date(new Date().setHours(10, 30, 0, 0)),
    end: new Date(new Date().setHours(11, 30, 0, 0)),
    title: 'Doctor Appt.',
    content: '<i class="icon mdi mdi-stethoscope"></i>',
    contentFull: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore expedita veniam deleniti, labore corporis quas, aspernatur praesentium quia nisi, omnis quod autem.'
    class: 'health'
  },
  ...
]

const openDialog = ({ event }) => {
  selectedEvent.value = event
  showDialog.value = true
}
`,-1)])),default:s(()=>[l(d(k),{class:"ex--open-dialog-on-event-click",events:c.events,"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:d(D).darkMode,onEventClick:c.openDialog},null,8,["events","dark","onEventClick"])]),_:1}),c.event?(r(),W(T,{key:0,modelValue:c.showDialog,"onUpdate:modelValue":e[2]||(e[2]=o=>c.showDialog=o),title:c.event.title,width:"380"},{default:s(()=>[n("div",L,[l(M,{class:"grey"},{default:s(()=>e[38]||(e[38]=[t("mdi mdi-calendar",-1)])),_:1,__:[38]}),n("small",null,i(c.event.start.format()),1),l(M,{class:"grey ml2"},{default:s(()=>e[39]||(e[39]=[t("mdi mdi-clock-outline",-1)])),_:1,__:[39]}),n("small",null,i(c.event.start.formatTime())+" - "+i(c.event.end.formatTime()),1)]),n("div",{class:"w-flex align-center justify-center title1 mt6 mb4",innerHTML:c.event.content},null,8,Y),e[40]||(e[40]=n("p",{class:"lh1"},`Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore expedita veniam deleniti,
labore corporis quas, aspernatur praesentium quia nisi, omnis quod autem.
`,-1))]),_:1,__:[40]},8,["modelValue","title"])):A("",!0),l(b,{title:"Month View Events & Count",anchor:"events-on-month-view"},{desc:s(()=>[n("ul",null,[e[44]||(e[44]=n("li",null,[t("When "),n("code",null,"events-on-month-view"),t(` is set to true, the events will show in full on the month view
(you can customize via CSS or `),n("code",null,"#event"),t(" slots).")],-1)),e[45]||(e[45]=n("li",null,[t("When "),n("code",null,"event-count"),t(` is set to true, the events count will be shown on every cell that has
events (you can customize via CSS or via the `),n("code",null,"#event-count"),t(` slots). In this example you will
see 3 different (random) options that you can achieve with CSS.`)],-1)),e[46]||(e[46]=n("li",null,[t("For more precision, the "),n("code",null,"event-count"),t(` prop can also be set to an array of views to show the
count in. E.g. `),n("code",null,`:event-count="['month', 'year']"`)],-1)),n("li",null,[e[42]||(e[42]=t(`You can further customize the events display on month view by using a bit of CSS like in this example:
`,-1)),l(z,{to:"/examples/customization#ex--events-on-month-view"},{default:s(()=>e[41]||(e[41]=[t("Events on Month View Customization",-1)])),_:1,__:[41]}),e[43]||(e[43]=t(`.
`,-1))])]),n("div",G,[l(g,{modelValue:a.showEvents,"onUpdate:modelValue":[e[3]||(e[3]=o=>a.showEvents=o),e[4]||(e[4]=o=>a.showEvents&&(a.showEventCount=!1))],"label-on-left":""},{default:s(()=>e[47]||(e[47]=[t("Show Events",-1)])),_:1,__:[47]},8,["modelValue"]),l(g,{modelValue:a.showEventCount,"onUpdate:modelValue":[e[5]||(e[5]=o=>a.showEventCount=o),e[6]||(e[6]=o=>a.showEventCount&&(a.showEvents=!1))],"label-on-left":""},{default:s(()=>e[48]||(e[48]=[t("Show Event Count",-1)])),_:1,__:[48]},8,["modelValue"]),l(j,{modelValue:a.eventCountStyle,"onUpdate:modelValue":e[7]||(e[7]=o=>a.eventCountStyle=o),inline:"",items:a.eventCountStyleOptions,disabled:!a.showEventCount},{default:s(()=>e[49]||(e[49]=[t("Events Count Style",-1)])),_:1,__:[49]},8,["modelValue","items","disabled"]),e[51]||(e[51]=n("p",{class:"caption"},"For illustration, the slot option will only count orange events (with the `leisure` class).",-1)),l(g,{modelValue:a.highlightCells,"onUpdate:modelValue":e[8]||(e[8]=o=>a.highlightCells=o),"label-on-left":""},{default:s(()=>e[50]||(e[50]=[t("Highlight Cells with Events",-1)])),_:1,__:[50]},8,["modelValue"])])]),"code-html":s(()=>[t(`<vue-cal
  :events="events"`+i(a.showEvents?`
  events-on-month-view`:"")+i(a.showEventCount?`
  event-count`:"")+`
  :views="{ days: { cols: 5, rows: 1 }, month: {} }"
  view="month">
</vue-cal>
`,1),a.showEventCount&&a.eventCountStyle==="slot"?(r(),v(p,{key:0},[t(`
<!-- Only count leisure class events. -->
<template #event-count="{ events }">
  <span v-if="events.filter(event => event.class === 'leisure').length">
    `+i("{{ events.filter(event => event.class === 'leisure').length }}")+`
  </span>
</template>`)],64)):(r(),v(p,{key:1},[],64))]),"code-css":s(()=>[e[52]||(e[52]=t(`.vuecal {
  height: 506px;

  .vuecal__scrollable--month-view {
    .vuecal__event {height: 15px;margin-top: 1px;}
    .vuecal__event-details {
      font-size: 11px;
      white-space: nowrap;
      padding: 0;
    }

    .vuecal__cell--has-events {
      flex-direction: row-reverse;
      overflow: hidden;
      justify-content: flex-start;
    }

    .vuecal__cell--has-events .vuecal__cell-date {align-self: flex-start;}
  }
`,-1)),a.showEventCount?a.eventCountStyle==="dot"?(r(),v(p,{key:1},[t(`  .event-count--dot .vuecal__cell-events-count {
    position: absolute;
    bottom: 14px;
    right: 15%;
    transform: translateX(-50%);
    text-align: center;
    width: 4px;
    aspect-ratio: 1;
    overflow: hidden;
    background-color: currentColor;
    opacity: 0.3;
    border-radius: 100%;
  }
`)],64)):a.eventCountStyle==="dash"?(r(),v(p,{key:2},[t(`  .event-count--dash .vuecal__cell-events-count {
    position: absolute;
    top: 24px;
    right: 12px;
    text-align: center;
    width: 10px;
    height: 2px;
    overflow: hidden;
    background-color: var(--vuecal-base-color);
    opacity: 0.5;
    border-radius: 100rem;
  }
`)],64)):a.eventCountStyle==="caption"?(r(),v(p,{key:3},[t(`  .event-count--caption .vuecal__cell-events-count {
    position: absolute;
    inset: auto 2px 2px;
    text-align: center;
    opacity: 0.3;
    font: italic 0.7rem monospace;
    word-spacing: -0.1rem;

    &:before {content: '- ';}
    &:after {content: ' events -';}
  }
`)],64)):(r(),v(p,{key:4},[],64)):(r(),v(p,{key:0},[],64)),a.highlightCells?(r(),v(p,{key:5},[t("  .vuecal__cell--has-events {background-color: "+i(d(D).darkMode?"#00dbff1c":"#fffacda8")+`;}
`,1)],64)):(r(),v(p,{key:6},[],64)),e[53]||(e[53]=t("}",-1))]),default:s(()=>[l(d(k),{events:C,"events-on-month-view":a.showEvents,"event-count":a.showEventCount,"time-from":480,"time-to":1080,views:{days:{cols:5,rows:1},month:{},year:{}},view:"month",dark:d(D).darkMode,class:F(a.classes),style:{height:"506px"}},N({_:2},[a.showEventCount&&a.eventCountStyle==="slot"?{name:"event-count",fn:s(({events:o})=>[o.filter(H=>H.class==="leisure").length?(r(),v("span",R,i(o.filter(H=>H.class==="leisure").length),1)):A("",!0)]),key:"0"}:void 0]),1032,["events-on-month-view","event-count","dark","class"])]),_:1}),l(b,{title:"Overlapping Events",anchor:"overlapping-events"},{desc:s(()=>[e[56]||(e[56]=n("p",null,[t("Overlapping, editable & deletable events."),n("br"),t(`
Try to resize & delete events to see the overlapping redrawn.
`),n("br"),t(`
You can also stack events on top of each other by setting the `),n("code",null,"stack-events"),t(" prop to "),n("code",null,"true"),t(`.
`)],-1)),l(x,{tip:""},{default:s(()=>[e[54]||(e[54]=n("div",{class:"mb2"},[t(`Alternatively, you can use the event stacking class (based on the stack position and length) to override
the default stacking behavior to your liking via CSS (you will need to use `),n("code",null,"!important"),t(")."),n("br"),t(`
Example of classes for three overlapping events: `),n("code",null,"vuecal__event--stack-1-3"),t(", "),n("code",null,"vuecal__event--stack-2-3"),t(", "),n("code",null,"vuecal__event--stack-3-3"),t(".")],-1)),l(_,{src:"/images/calendar-events-display-overlapping-events.webp",lazy:"","aspect-ratio":1076/336,"max-width":"500px"})]),_:1,__:[54]}),n("div",$,[l(g,{modelValue:E.stackEvents,"onUpdate:modelValue":e[9]||(e[9]=o=>E.stackEvents=o),"label-on-left":""},{default:s(()=>e[55]||(e[55]=[t("Stack Events",-1)])),_:1,__:[55]},8,["modelValue"])])]),"code-html":s(()=>[t(`<vue-cal
  editable-events`+i(E.stackEvents?`
  stack-events`:"")+`
  :min-event-width="minEventWidth"
  :events="events">
</vue-cal>`,1)]),"code-js":s(()=>e[57]||(e[57]=[t(`data: () => ({
  minEventWidth: 0,
  events: [
    {
      start: '2018-11-21 14:00',
      end: '2018-11-21 22:00',
      title: 'A big thing',
      content: '<i class="icon mdi mdi-emoticon-outline"></i>',
      class: 'health'
    },
    {
      start: '2018-11-21 16:00',
      end: '2018-11-21 19:00',
      title: 'Another thing',
      content: '<i class="icon mdi mdi-thumb-up-outline"></i>',
      class: 'blue-event'
    },
    {
      start: '2018-11-20 18:30',
      end: '2018-11-20 20:30',
      title: 'Cross-fit',
      content: '<i class="icon mdi mdi-dumbbell"></i>',
      class: 'sport'
    },
    ...
  ]
})
`,-1)])),default:s(()=>[l(d(k),{events:E.events,"editable-events":"","stack-events":E.stackEvents,"min-event-width":E.minEventWidth,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,"time-from":540,"time-to":900,dark:d(D).darkMode},null,8,["events","stack-events","min-event-width","dark"])]),_:1}),l(b,{title:"All Day Events",anchor:"all-day-events"},{desc:s(()=>[e[60]||(e[60]=n("p",null,[t(`All-day events are events that span the whole day (from 00:00 to 23:59:59:999). They will be displayed in a fixed top bar
on the `),n("code",null,"day"),t(", "),n("code",null,"days"),t(" & "),n("code",null,"week"),t(" views when the "),n("code",null,"allDayEvents"),t(" prop is set to "),n("code",null,"true"),t(` and
`),n("code",null,"time"),t(" is set to "),n("code",null,"true"),t(".")],-1)),e[61]||(e[61]=n("p",null,[t("To set an event as all-day, set its "),n("code",null,"allDay"),t(" attribute to "),n("code",null,"true"),t(".")],-1)),e[62]||(e[62]=n("p",{class:"mb2"},[t("When "),n("code",null,"allDayEvents"),t(" is set to "),n("code",null,"false"),t(`, all the all-day events
will show up as normal events.`)],-1)),e[63]||(e[63]=n("p",{class:"mb2"},[t("You can also customize the all-day bar height via CSS using the "),n("code",null,"--vuecal-all-day-bar-height"),t(` CSS variable,
and you can also use the built-in bottom resizer to change the height dynamically.
`)],-1)),n("div",K,[l(g,{modelValue:w.allDayBarOn,"onUpdate:modelValue":e[10]||(e[10]=o=>w.allDayBarOn=o),"label-on-left":""},{default:s(()=>e[58]||(e[58]=[t("Show All-day Bar",-1)])),_:1,__:[58]},8,["modelValue"]),l(g,{modelValue:w.allDayEventsOn,"onUpdate:modelValue":e[11]||(e[11]=o=>w.allDayEventsOn=o),"label-on-left":""},{default:s(()=>e[59]||(e[59]=[t("Switch on all ",-1),n("code",{class:"ml1"},"event.allDay",-1)])),_:1,__:[59]},8,["modelValue"])])]),"code-html":s(()=>[t(`<vue-cal
  :events="events"`+i(w.allDayBarOn?`
  all-day-events`:"")+`
  :time-from="7 * 60">
</vue-cal>`,1)]),"code-js":s(()=>[t(`const allDayEvents = ref(true)
const events = [
  {
    start: '`+i(new Date().format())+`',
    end: '`+i(new Date().addDays(1).format())+`',
    allDay: `+i(w.allDayEventsOn?"true":"false")+`,
    title: 'Day off!',
    content: '<i class="icon mdi mdi-umbrella-beach-outline"></i>',
    class: 'yellow-event'
  },
  {
    start: '`+i(new Date().addDays(1).format())+`',
    end: '`+i(new Date().addDays(2).format())+`',
    allDay: `+i(w.allDayEventsOn?"true":"false")+`,
    title: 'Anniversary ❤️',
    content: '<i class="icon mdi mdi-heart-outline"></i>',
    class: 'pink-event'
  },
  ...
]`,1)]),"code-css":s(()=>e[64]||(e[64]=[t(`.vuecal__cell-content {align-self: flex-start;}
.vuecal__cell-date {text-align: right;padding: 4px;}

.vuecal--week-view .vuecal__scrollable .vuecal__event--all-day.pink-event,
.vuecal--day-view .vuecal__scrollable .vuecal__event--all-day.pink-event {right: 50%;}
.vuecal--week-view .vuecal__scrollable .vuecal__event--all-day.leisure,
.vuecal--day-view .vuecal__scrollable .vuecal__event--all-day.leisure {left: 50%;}
`,-1)])),default:s(()=>[l(d(k),{"time-from":420,view:"days",views:{day:{},days:{cols:5,rows:1},week:{},month:{}},"all-day-events":w.allDayBarOn,events:w.events,dark:d(D).darkMode},null,8,["all-day-events","events","dark"])]),_:1}),l(b,{title:"Multiple Day Events",anchor:"multiple-day-events"},{title:s(()=>e[65]||(e[65]=[t("Multiple Day Events",-1),n("div",{class:"todo-tag prod d-iflex ml2"},"COMING SOON",-1)])),desc:s(()=>[e[67]||(e[67]=n("p",null,[t("Multiple day events work like a set of single day events linked together."),n("br"),t(`
Deleting one of the day of a multiple day event, will also delete all the other days.`),n("br"),t(`
Updating the duration by dragging will also update on all the days.`),n("br"),t(`
Try to resize, rename and delete the events.`),n("br"),t(`You can also resize horizontally thanks to
the option `),n("code",null,"resize-x"),t(".")],-1)),e[68]||(e[68]=n("strong",null,"Drag & drop is not available on multiple day events for now.",-1)),l(x,{tip:""},{default:s(()=>e[66]||(e[66]=[t(`3 CSS classes are available to target the event first day, the last day and all the days in between:
`,-1),n("code",null,"event-start",-1),t(", ",-1),n("code",null,"event-middle",-1),t(", ",-1),n("code",null,"event-end",-1),t(".",-1)])),_:1,__:[66]})]),"code-html":s(()=>e[69]||(e[69]=[t(`<vue-cal
  :time-from="8 * 60"
  :time-to="23 * 60"
  :views="['day', 'week']"
  hide-weekends
  editable-events
  resize-x
  :events="events">
</vue-cal>`,-1)])),"code-js":s(()=>e[70]||(e[70]=[t(`data: () => ({
  events: [
    {
      start: '2018-11-16 10:00',
      end: '2018-11-20 12:37',
      title: 'Running Marathon',
      content: '<i class="icon mdi mdi-run"></i>',
      class: 'sport'
    },
    {
      start: '2018-11-20 10:00',
      end: '2018-11-20 10:25',
      title: 'Drink water!',
      content: '<i class="icon mdi mdi-glass-cocktail"></i>',
      class: 'health'
    },
    {
      start: '2018-11-21 19:00',
      end: '2018-11-23 11:30',
      title: 'Trip to India',
      content: '<i class="icon mdi mdi-airplane"></i>',
      class: 'leisure'
    }
  ]
})`,-1)])),default:s(()=>[l(d(k),{view:"days",views:{day:{},days:{cols:5,rows:1},week:{},month:{}},dark:d(D).darkMode,"events-count-on-year-view":"","editable-events":"","resize-x":"",events:B.events,onReady:e[12]||(e[12]=({view:o})=>o.scrollToCurrentTime()),style:{height:"506px"}},null,8,["dark","events"])]),_:1})],64)}}};export{ee as default};
