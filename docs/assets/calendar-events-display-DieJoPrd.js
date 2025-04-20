import{u as j,x as D,c as V,r as m,b as c,f as a,A as T,q as M,w as s,e as n,h as t,t as i,a as f,g as v,i as N,z as U,F as w,d}from"./index-BwmlsjOA.js";import"./index-BIG78sal.js";import{_ as E}from"./index-IM5Nmd4O.js";const W={class:"w-flex justify-end my2"},z={key:0},F={key:1},q={class:"w-flex align-center justify-end gap2"},I=["innerHTML"],J={class:"w-flex column align-end gap1"},G={key:0,class:"warning--bg bdrsr w-icon size--xs pa2 mr-6 mb1 align-self-end"},L={class:"w-flex justify-end mb3"},X={__name:"calendar-events-display",setup($){const y=j(),C=[{start:new Date(new Date().setHours(11,0)).subtractDays(2),end:new Date(new Date().setHours(13,0)).subtractDays(2),title:"Salsa Dance Class",content:'<i class="w-icon mdi mdi-dance-ballroom"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(12,30)),end:new Date(new Date().setHours(13,30)),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:new Date(new Date().setHours(11,30)).addDays(1),end:new Date(new Date().setHours(12,30)).addDays(1),title:"Dentist Appt.",content:'<i class="w-icon mdi mdi-tooth"></i>',class:"health",schedule:2},{start:new Date(new Date().setHours(13,0)).addDays(1),end:new Date(new Date().setHours(14,0)).addDays(1),title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(10,0)).addDays(3),end:new Date(new Date().setHours(11,30)).addDays(3),title:"Swimming Class",content:'<i class="w-icon mdi mdi-swim"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(11,35)).addDays(3),end:new Date(new Date().setHours(12,30)).addDays(3),title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-food-croissant"></i>',class:"leisure",schedule:1,background:!1},{start:new Date(new Date().setHours(9,0)).addDays(4),end:new Date(new Date().setHours(10,0)).addDays(4),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:new Date(new Date().setHours(11,30)).addDays(4),end:new Date(new Date().setHours(12,25)).addDays(4),title:"BK with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:new Date(new Date().setHours(12,30)).addDays(4),end:new Date(new Date().setHours(14,30)).addDays(4),title:"Movie Theater",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:new Date(new Date().setHours(11,30,21,0)).addDays(5),end:new Date(new Date().setHours(12,30,23,30)).addDays(5),title:"Movie Night",content:'<i class="w-icon mdi mdi-popcorn"></i>',class:"leisure",schedule:1},{start:new Date(new Date().setHours(10,0)).addDays(7),end:new Date(new Date().setHours(11,0)).addDays(7),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1}],p=D({showBgEvents:m(!1),initEvents:()=>{const r=[...C,...Array(5).fill({}).map((e,b)=>({start:new Date(new Date().setHours(12,0)).addDays(b),end:new Date(new Date().setHours(14,0)).addDays(b),class:"lunch",background:!0}))];return r[2]={...r[2],backgroundColor:"rgb(158 199 237)",color:"#0e5597"},delete r[2].class,r},allEvents:[],events:V(()=>p.allEvents.filter(r=>p.showBgEvents||!r.background))});p.allEvents=p.initEvents();const A=D({events:[{start:new Date,end:new Date,title:"Salsa Dance Class",content:'<i class="w-icon mdi mdi-dance-ballroom"></i>',class:"sport"},{start:new Date,end:new Date,title:"Dentist Appt.",content:'<i class="w-icon mdi mdi-tooth"></i>',class:"health"},{start:new Date().addDays(1),end:new Date().addDays(1),title:"Golf with John",content:'<i class="w-icon mdi mdi-golf"></i>',class:"sport"},{start:new Date().addDays(2),end:new Date().addDays(2),title:"Grocery Shopping",content:'<i class="w-icon mdi mdi-cart-outline"></i>',class:"leisure"},{start:new Date().addDays(2),end:new Date().addDays(2),title:"Dad's Birthday!",content:'<i class="w-icon mdi mdi-cake-variant-outline"></i>',class:"sport"},{start:new Date().addDays(3),end:new Date().addDays(3),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health"},{start:new Date().addDays(4),end:new Date().addDays(4),title:"Burger King",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure"}]}),u=D({showDialog:!1,openDialog:({event:r})=>{u.event=r,u.showDialog=!0},events:[...C]}),x=D({counter:0,events:m([]),onEventCreate:({event:r,resolve:e})=>e({...r,title:"Event "+ ++x.counter}),addEvent:()=>x.events.push({start:new Date,end:new Date().addHours(1),title:"Event "+ ++x.counter})}),l=D({showEvents:m(!0),showEventCount:m(!1),highlightCells:m(!1),eventCountStyle:m("dot"),eventCountStyleOptions:[{label:"Dot",value:"dot"},{label:"Dash",value:"dash"},{label:"Caption",value:"caption"},{label:"Use slot",value:"slot"}],classes:V(()=>({[`event-count--${l.eventCountStyle}`]:l.showEventCount,"vuecal--highlight-cells":l.highlightCells}))}),g=D({events:m([...C.map(r=>({...r})),{start:new Date(new Date().setHours(12,0)).addDays(1),end:new Date(new Date().setHours(14,0)).addDays(1),title:"Event 1",class:"event-1"},{start:new Date(new Date().setHours(12,0)).addDays(1),end:new Date(new Date().setHours(14,0)).addDays(1),title:"Event 2",class:"event-2"},{start:new Date(new Date().setHours(11,0)).addDays(2),end:new Date(new Date().setHours(13,0)).addDays(2),title:"Event 3",class:"event-3"},{start:new Date(new Date().setHours(12,0)).addDays(2),end:new Date(new Date().setHours(14,0)).addDays(2),title:"Event 4",class:"event-4"}]),minEventWidth:m(0),stackEvents:m(!1)});return D({}),D({showAllDayEvents:m(0),events:[{start:"2019-02-12",end:"2019-02-12",title:"Day off!",content:'<i class="w-icon mdi mdi-umbrella-beach-outline"></i>',class:"yellow-event",allDay:!0},{start:"2019-02-14",end:"2019-02-14",title:"Valentine's day",content:'<i class="w-icon mdi mdi-heart-outline"></i>',class:"pink-event",allDay:!0},{start:"2019-02-14",end:"2019-02-14",title:"Grocery Shopping",content:'<i class="w-icon mdi mdi-cart-outline"></i>',class:"leisure",allDay:!0},{start:"2019-02-11 10:35",end:"2019-02-11 11:30",title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:"2019-02-11 18:30",end:"2019-02-11 19:15",title:"Dentist Appt.",content:'<i class="w-icon mdi mdi-tooth"></i>',class:"health",schedule:2},{start:"2019-02-12 18:30",end:"2019-02-12 20:30",title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:1},{start:"2019-02-13 11:00",end:"2019-02-13 13:00",title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-coffee-outline"></i>',class:"leisure",schedule:1},{start:"2019-02-13 19:30",end:"2019-02-13 23:00",title:"Swimming Class",content:'<i class="w-icon mdi mdi-swim"></i>',class:"sport",schedule:2},{start:"2019-02-15 12:30",end:"2019-02-15 13:00",title:"BK with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:"2019-02-15 21:00",end:"2019-02-15 23:30",title:"Movie Theater",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1}],shortEventsOnMonthView:m(!1)}),D({events:[{start:"2018-11-16 10:00",end:"2018-11-20 12:37",title:"Running Marathon",content:'<i class="w-icon mdi mdi-run"></i>',class:"sport"},{start:"2018-11-20 10:00",end:"2018-11-20 10:25",title:"Drink water!",content:'<i class="w-icon mdi mdi-glass-cocktail"></i>',class:"health drink-water"},{start:"2018-11-21 19:00",end:"2018-11-23 11:30",title:"Trip to India",content:'<i class="w-icon mdi mdi-airplane"></i>',class:"leisure"}]}),(r,e)=>{const b=f("alert"),k=f("w-switch"),h=f("example"),H=f("w-icon"),B=f("w-dialog"),O=f("w-radios");return d(),c(w,null,[a(b,{info:""},{default:s(()=>[e[21]||(e[21]=n("h3",{class:"mt-2 mb2"},"Read First",-1)),e[22]||(e[22]=n("p",null,"Events are always rendered in cells, whether a time column is displayed or not.",-1)),n("ul",null,[e[19]||(e[19]=n("li",null,[t("Events are defined essentially with "),n("code",null,"start"),t(" and "),n("code",null,"end"),t(` attributes, but can contain a
lot more attributes, even custom ones.`)],-1)),n("li",null,[e[10]||(e[10]=n("code",null,"start",-1)),e[11]||(e[11]=t(" and ")),e[12]||(e[12]=n("code",null,"end",-1)),e[13]||(e[13]=t(` can be defined (by you) as both a native JavaScript Date or a
Formatted date time such as `)),n("code",null,i(new Date().format())+" "+i(new Date().formatTime()),1),e[14]||(e[14]=t(`.
But if given as a string, Vue Cal will automatically convert it to a JavaScript Date.
Thus, any time you access the event object, the `)),e[15]||(e[15]=n("code",null,"start",-1)),e[16]||(e[16]=t(" and ")),e[17]||(e[17]=n("code",null,"end",-1)),e[18]||(e[18]=t(` will always be
a JavaScript Date.`))]),e[20]||(e[20]=n("li",null,`When the events are editable, they can be created, deleted, dragged and dropped to a different
date and time and resized. There's also a more granular control on what exactly should be editable.
`,-1))])]),_:1}),a(h,{title:"Events & Background Events",anchor:"events"},{desc:s(()=>[e[24]||(e[24]=n("p",null,[t("Events are defined by a "),n("code",null,"start"),t(" and "),n("code",null,"end"),t(` dates, provided as a JavaScript Date object
or a formatted date and time. Additionally, you can optionally add a title, content, and a CSS class.`),n("br")],-1)),e[25]||(e[25]=n("ul",null,[n("li",null,[t("Adding a "),n("code",null,"background: true"),t(` property to the event object will make it behave like a background event:
it can be overlapped without constraint (not affected by other events).`),n("br")]),n("li",null,[t("Events are best styled with CSS classes using the "),n("code",null,"class"),t(` property, but you can also provide
a `),n("code",null,"backgroundColor"),t(" and a "),n("code",null,"color"),t(` property to dynamically change the event's
background and text colors. Like in this example, the "Dentist Appointment" event has a dynamic
background color and text color.
`)])],-1)),n("div",W,[a(k,{modelValue:p.showBgEvents,"onUpdate:modelValue":e[0]||(e[0]=o=>p.showBgEvents=o)},{default:s(()=>e[23]||(e[23]=[t("Show Background Events")])),_:1},8,["modelValue"])])]),"code-html":s(()=>e[26]||(e[26]=[t('<vue-cal :events="events" />')])),"code-js":s(()=>[e[27]||(e[27]=t(`const events = [
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
`)),p.showBgEvents?(d(),c("span",z,`  {
    start: new Date(new Date().setHours(12, 0, 0, 0)),
    end: new Date(new Date().setHours(14, 0, 0, 0)),
    class: 'lunch',
    background: true // Background event.
  },
`)):(d(),c("span",F)),e[28]||(e[28]=t(`  ...
]`))]),"code-css":s(()=>[t(`.vuecal__event {color: #fff;border: 1px solid;}
.vuecal__event.leisure {background-color: #fd9c42d9;}
.vuecal__event.health {background-color: #57cea9cc;}
.vuecal__event.sport {background-color: #ff6666d9;}
.vuecal__event.lunch {
  background-color: repeating-linear-gradient(45deg, transparent 0 10px, `+i(v(y).darkMode?"#ffffff11":"#00000011")+` 10px 20px);
  border: none;
}`,1)]),default:s(()=>[a(v(E),{"time-from":9*60,"time-to":14*60,events:p.events,"onUpdate:events":e[1]||(e[1]=o=>p.events=o),views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:v(y).darkMode,style:{height:"261px"}},null,8,["events","dark"])]),_:1}),a(h,{title:"Timeless Events",anchor:"timeless-events"},{desc:s(()=>e[29]||(e[29]=[n("p",null,[t("When "),n("code",null,"time"),t(" is set to "),n("code",null,"false"),t(`, the calendar and the events are timeless. The events can't be
resized.`)],-1)])),"code-html":s(()=>e[30]||(e[30]=[t('<vue-cal :time="false" :events="events" />')])),"code-js":s(()=>e[31]||(e[31]=[t(`const events = [
  {
    start: new Date(),
    end: new Date(),
    title: 'Salsa Dance Class',
    content: '<i class="icon mdi mdi-dance-ballroom"></i>',
    class: 'sport'
  },
  ...
]`)])),default:s(()=>[a(v(E),{dark:v(y).darkMode,time:!1,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,events:A.events},null,8,["dark","events"])]),_:1}),a(h,{title:"Open a Dialog on Event Click",anchor:"open-dialog-on-event-click"},{desc:s(()=>e[32]||(e[32]=[n("p",{class:"mb2"},[t(`You can attach whatever event listener you want to the events: it only needs to start with
`),n("code",null,"@event-"),t("."),n("br"),t(`
For instance, let's open a dialog on event click `),n("code",null,"@event-click"),t(`. When it's called, your
callback function will receive in parameter an object containing:`)],-1),n("ul",null,[n("li",null,[n("code",null,"event"),t(": the clicked calendar event's object")]),n("li",null,[n("code",null,"e"),t(": the associated javascript DOM event")])],-1)])),"code-html":s(()=>e[33]||(e[33]=[t(`<vue-cal :events="events" @event-click="openDialog" />

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
</w-dialog>`)])),"code-js":s(()=>e[34]||(e[34]=[t(`const showDialog = ref(false)
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
`)])),default:s(()=>[a(v(E),{class:"ex--open-dialog-on-event-click",events:u.events,"time-from":9*60,"time-to":15*60,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:v(y).darkMode,onEventClick:u.openDialog,style:{height:"301px"}},null,8,["events","dark","onEventClick"])]),_:1}),u.event?(d(),T(B,{key:0,modelValue:u.showDialog,"onUpdate:modelValue":e[2]||(e[2]=o=>u.showDialog=o),title:u.event.title,width:"380"},{default:s(()=>[n("div",q,[a(H,{class:"grey"},{default:s(()=>e[35]||(e[35]=[t("mdi mdi-calendar")])),_:1}),n("small",null,i(u.event.start.format()),1),a(H,{class:"grey ml2"},{default:s(()=>e[36]||(e[36]=[t("mdi mdi-clock-outline")])),_:1}),n("small",null,i(u.event.start.formatTime())+" - "+i(u.event.end.formatTime()),1)]),n("div",{class:"w-flex align-center justify-center title1 mt6 mb4",innerHTML:u.event.content},null,8,I),e[37]||(e[37]=n("p",{class:"lh1"},`Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil inventore expedita veniam deleniti,
labore corporis quas, aspernatur praesentium quia nisi, omnis quod autem.
`,-1))]),_:1},8,["modelValue","title"])):M("",!0),a(h,{title:"Month View Events & Count",anchor:"events-on-month-view"},{desc:s(()=>[e[43]||(e[43]=n("ul",null,[n("li",null,[t("When "),n("code",null,"events-on-month-view"),t(` is set to true, the events will show in full on the month view
(you can customize via CSS or `),n("code",null,"#event"),t(" slots).")]),n("li",null,[t("When "),n("code",null,"event-count"),t(` is set to true, the events count will be shown on every cell that has
events (you can customize via CSS or via the `),n("code",null,"#event-count"),t(` slots). In this example you will
see 3 different (random) options that you can achieve with CSS.`)]),n("li",null,"In order to keep the same cell height on this view, you can set a height in CSS.")],-1)),n("div",J,[a(k,{modelValue:l.showEvents,"onUpdate:modelValue":[e[3]||(e[3]=o=>l.showEvents=o),e[4]||(e[4]=o=>l.showEvents&&(l.showEventCount=!1))],"label-on-left":""},{default:s(()=>e[38]||(e[38]=[t("Show Events")])),_:1},8,["modelValue"]),a(k,{modelValue:l.showEventCount,"onUpdate:modelValue":[e[5]||(e[5]=o=>l.showEventCount=o),e[6]||(e[6]=o=>l.showEventCount&&(l.showEvents=!1))],"label-on-left":""},{default:s(()=>e[39]||(e[39]=[t("Show Events Count")])),_:1},8,["modelValue"]),a(O,{modelValue:l.eventCountStyle,"onUpdate:modelValue":e[7]||(e[7]=o=>l.eventCountStyle=o),inline:"",items:l.eventCountStyleOptions,disabled:!l.showEventCount},{default:s(()=>e[40]||(e[40]=[t("Events Count Style")])),_:1},8,["modelValue","items","disabled"]),e[42]||(e[42]=n("p",{class:"caption"},"For illustration, the slot option will only count orange events (with the `leisure` class).",-1)),a(k,{modelValue:l.highlightCells,"onUpdate:modelValue":e[8]||(e[8]=o=>l.highlightCells=o),"label-on-left":""},{default:s(()=>e[41]||(e[41]=[t("Highlight Cells with Events")])),_:1},8,["modelValue"])])]),"code-html":s(()=>[t(`<vue-cal
  :events="events"`+i(l.showEvents?`
  events-on-month-view`:"")+i(l.showEventCount?`
  event-count`:"")+`
  :views="{ days: { cols: 5, rows: 1 }, month: {} }"
  view="month">
</vue-cal>
`,1),l.showEventCount&&l.eventCountStyle==="slot"?(d(),c(w,{key:0},[t(`
<!-- Only count leisure class events. -->
<template #event-count="{ events }">
  <span v-if="events.filter(event => event.class === 'leisure').length">
    `+i("{{ events.filter(event => event.class === 'leisure').length }}")+`
  </span>
</template>`)],64)):(d(),c(w,{key:1},[],64))]),"code-css":s(()=>[e[44]||(e[44]=t(`.vuecal {
  height: 441px;

  .vuecal__scrollable--month-view {
    .vuecal__cell {height: 50px;}
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
  }
`)),l.showEventCount?l.eventCountStyle==="dot"?(d(),c(w,{key:1},[t(`  .event-count--dot .vuecal__cell-events-count {
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
`)],64)):l.eventCountStyle==="dash"?(d(),c(w,{key:2},[t(`  .event-count--dash .vuecal__cell-events-count {
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
`)],64)):l.eventCountStyle==="caption"?(d(),c(w,{key:3},[t(`  .event-count--caption .vuecal__cell-events-count {
    position: absolute;
    inset: auto 2px 2px;
    text-align: center;
    opacity: 0.3;
    font: italic 0.7rem monospace;
    word-spacing: -0.1rem;

    &:before {content: '- ';}
    &:after {content: ' events -';}
  }
`)],64)):(d(),c(w,{key:4},[],64)):(d(),c(w,{key:0},[],64)),l.highlightCells?(d(),c(w,{key:5},[t("  .vuecal__cell--has-events {background-color: "+i(v(y).darkMode?"#00dbff1c":"#fffacda8")+`;}
`,1)],64)):(d(),c(w,{key:6},[],64)),e[45]||(e[45]=t("}"))]),default:s(()=>[a(v(E),{events:C,"events-on-month-view":l.showEvents,"event-count":l.showEventCount,"time-from":8*60,"time-to":18*60,views:{days:{cols:5,rows:1},month:{cols:6,rows:7}},view:"month",dark:v(y).darkMode,class:N(l.classes)},U({_:2},[l.showEventCount&&l.eventCountStyle==="slot"?{name:"event-count",fn:s(({events:o})=>[o.filter(S=>S.class==="leisure").length?(d(),c("span",G,i(o.filter(S=>S.class==="leisure").length),1)):M("",!0)]),key:"0"}:void 0]),1032,["events-on-month-view","event-count","dark","class"])]),_:1}),a(h,{title:"Overlapping Events",anchor:"overlapping-events"},{desc:s(()=>[e[48]||(e[48]=n("p",null,[t("Overlapping, editable & deletable events."),n("br"),t(`
Try to resize & delete events to see the overlapping redrawn.
`),n("br"),t(`
You can also stack events on top of each other by setting the `),n("code",null,"stack-events"),t(" prop to "),n("code",null,"true"),t(`.
`)],-1)),n("div",L,[a(k,{modelValue:g.stackEvents,"onUpdate:modelValue":e[9]||(e[9]=o=>g.stackEvents=o),"label-on-left":""},{default:s(()=>e[46]||(e[46]=[t("Stack Events")])),_:1},8,["modelValue"])]),a(b,{class:"mb6",tip:""},{default:s(()=>e[47]||(e[47]=[t(`Alternatively, you can use the event stacking class (based on the stack position and length) to override
the default stacking behavior to your liking via CSS (you will need to use `),n("code",null,"!important",-1),t(")."),n("br",null,null,-1),t(`
Example of classes for three overlapping events: `),n("code",null,"vuecal__event--stack-1-3",-1),t(", "),n("code",null,"vuecal__event--stack-2-3",-1),t(", "),n("code",null,"vuecal__event--stack-3-3",-1),t(".")])),_:1})]),"code-html":s(()=>[t(`<vue-cal
  editable-events`+i(g.stackEvents?`
  stack-events`:"")+`
  :min-event-width="minEventWidth"
  :events="events">
</vue-cal>`,1)]),"code-js":s(()=>e[49]||(e[49]=[t(`data: () => ({
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
`)])),default:s(()=>[a(v(E),{events:g.events,"editable-events":"","stack-events":g.stackEvents,"min-event-width":g.minEventWidth,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,"time-from":9*60,"time-to":15*60,dark:v(y).darkMode,style:{height:"301px"}},null,8,["events","stack-events","min-event-width","dark"])]),_:1}),a(h,{title:"All Day Events",anchor:"all-day-events"},{title:s(()=>e[50]||(e[50]=[t("All Day Events"),n("div",{class:"todo-tag prod d-iflex ml2"},"COMING SOON",-1)])),_:1}),a(h,{title:"Multiple Day Events",anchor:"multiple-day-events"},{title:s(()=>e[51]||(e[51]=[t("Multiple Day Events"),n("div",{class:"todo-tag prod d-iflex ml2"},"COMING SOON",-1)])),_:1}),a(h,{anchor:"recurring-events"},{title:s(()=>e[52]||(e[52]=[t("Recurring Events"),n("div",{class:"todo-tag prod d-iflex ml2"},"COMING SOON",-1)])),_:1})],64)}}};export{X as default};
