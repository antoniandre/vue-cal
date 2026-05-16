import{u as E,a as h,c as b,d as t,z as _,w as l,f as s,e as c,F as f,b as o,n as V,x as v,h as g,r as p}from"./index-C3PSdz4w.js";import{s as z}from"./index-faCIKxOq.js";import{_ as w}from"./index-CuEst4GI.js";const B={class:"w-flex wrap gap4 align-start"},F={class:"w-flex column gap2 no-grow"},T={class:"w-flex wrap gap4 align-start"},W={class:"w-flex column gap2 no-grow"},A={class:"w-flex column gap3"},N={__name:"schedules",setup(U){const d=E(),r=v({variant:"simpleBusinessHours",choices:[{value:"simpleBusinessHours",label:"Simple Business Hours"},{value:"doctorHours",label:"Doctor Shifts"}],simpleBusinessHours:{mon:{from:540,to:1080,class:"business-hours"},tue:{from:540,to:1080,class:"business-hours"},wed:[{from:540,to:720,class:"business-hours"},{from:840,to:1080,class:"business-hours"}],thu:{from:540,to:1080,class:"business-hours"},fri:{from:540,to:1080,class:"business-hours"}},doctorHours:{mon:{from:480,to:1020,class:"doctor-1",label:"<strong>Doctor 1</strong><br><em>Full day shift</em>"},tue:{from:540,to:1080,class:"doctor-2",label:"<strong>Doctor 2</strong><br><em>Full day shift</em>"},wed:[{from:480,to:720,class:"doctor-1",label:"<strong>Doctor 1</strong><br><em>Morning shift</em>"},{from:840,to:1140,class:"doctor-3",label:"<strong>Doctor 3</strong><br><em>Afternoon shift</em>"}],thu:{from:480,to:1020,class:"doctor-1",label:"<strong>Doctor 1</strong><br><em>Full day shift</em>"},fri:{from:540,to:1080,class:"doctor-3",label:"<strong>Doctor 3</strong><br><em>Full day shift</em>"},sat:{from:540,to:1080,class:"doctor-2",label:"<strong>Doctor 2</strong><br><em>Full day shift</em>"},sun:{from:420,to:1200,class:"closed",label:"<strong>Closed</strong>"}}}),k=g(()=>r[r.variant]),y=[{start:"2026-05-19 08:30",end:"2026-05-19 10:00",title:"Rounds",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:"dr-lee"},{start:"2026-05-19 11:00",end:"2026-05-19 12:00",title:"Consultation",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:"dr-kim"},{start:"2026-05-19 14:00",end:"2026-05-19 17:00",title:"Tests",content:'<i class="w-icon mdi mdi-flask-outline"></i>',class:"leisure",schedule:"lab"},{start:"2026-05-20 09:00",end:"2026-05-20 10:30",title:"Ward round",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:"dr-lee"},{start:"2026-05-20 13:00",end:"2026-05-20 15:00",title:"Urgent care",content:'<i class="w-icon mdi mdi-ambulance"></i>',class:"health",schedule:"dr-kim"},{start:"2026-05-21 10:00",end:"2026-05-21 12:30",title:"Screening",content:'<i class="w-icon mdi mdi-microscope"></i>',class:"leisure",schedule:"lab"},{start:"2026-05-22 13:30",end:"2026-05-22 16:00",title:"Check-up",content:'<i class="w-icon mdi mdi-heart-pulse"></i>',class:"health",schedule:"dr-lee"},{start:"2026-05-23 18:00",end:"2026-05-23 20:00",title:"Late consultation",content:'<i class="w-icon mdi mdi-clock-outline"></i>',class:"health",schedule:"dr-kim"}],D={mon:{from:480,to:1080,class:"clinic-hours",label:"Clinic open"},tue:{from:480,to:1080,class:"clinic-hours",label:"Clinic open"},wed:[{from:480,to:720,class:"clinic-hours",label:"Clinic open"},{from:780,to:1080,class:"clinic-hours",label:"Clinic open"}],thu:{from:480,to:1080,class:"clinic-hours",label:"Clinic open"},fri:{from:480,to:960,class:"clinic-hours",label:"Clinic closes early"}},S={mon:{default:{from:480,to:1080,class:"clinic-hours",label:"Clinic open"},schedules:{"dr-lee":[{from:480,to:720,class:"doctor-1",label:"<strong>Dr Lee</strong><br><em>Morning clinic</em>"},{from:780,to:1020,class:"doctor-1",label:"<strong>Dr Lee</strong><br><em>Afternoon clinic</em>"}],"dr-kim":{from:600,to:1140,class:"doctor-2",label:"<strong>Dr Kim</strong><br><em>Late shift</em>"}}},tue:{default:{from:480,to:1080,class:"clinic-hours",label:"Clinic open"},schedules:{"dr-lee":{from:480,to:840,class:"doctor-1",label:"<strong>Dr Lee</strong><br><em>Half day</em>"}}},wed:{default:[{from:480,to:720,class:"clinic-hours",label:"Clinic open"},{from:780,to:1080,class:"clinic-hours",label:"Clinic open"}],schedules:{lab:[{from:420,to:660,class:"doctor-3",label:"<strong>Lab</strong><br><em>Prep</em>"},{from:720,to:1020,class:"doctor-3",label:"<strong>Lab</strong><br><em>Testing</em>"}]}},thu:{default:{from:480,to:1080,class:"clinic-hours",label:"Clinic open"}},fri:{default:{from:480,to:960,class:"clinic-hours",label:"Clinic closes early"},schedules:{"dr-kim":{from:720,to:1200,class:"doctor-2",label:"<strong>Dr Kim</strong><br><em>Extended shift</em>"}}}},n=v({hoursMode:"perSchedule",widthMode:"wideSchedules",hoursChoices:[{value:"none",label:"Off"},{value:"shared",label:"Shared Hours"},{value:"perSchedule",label:"Per Schedule"}],widthChoices:[{value:"fit",label:"Fit"},{value:"wideCells",label:"Wider Day"},{value:"wideSchedules",label:"Wider Schedules"}],schedules:[{id:"dr-lee",class:"doctor doctor--lee",label:"Dr Lee"},{id:"dr-kim",class:"doctor doctor--kim",label:"Dr Kim",hide:!1},{id:"lab",class:"doctor doctor--lab",label:"Lab"}]}),C=g(()=>n.hoursMode==="none"?{}:n.hoursMode==="shared"?D:S),x=g(()=>{const i={height:"620px"};return n.widthMode==="wideCells"&&(i["--vuecal-min-cell-size"]="24rem"),n.widthMode==="wideSchedules"&&(i["--vuecal-min-schedule-size"]="13rem"),i}),H={wed:[{from:540,to:720,class:"open-hours",label:"<strong>Open</strong>"},{from:720,to:780,class:"lunch-break",allowEvents:!1,label:"<strong>Lunch</strong> (no bookings)"},{from:780,to:1080,class:"open-hours",label:"<strong>Open</strong>"}]},L=[{start:"2026-05-21 10:00",end:"2026-05-21 11:00",title:"Try drag / resize over lunch",content:'<i class="w-icon mdi mdi-gesture-tap-hold"></i>',class:"health"}];return(i,e)=>{const u=p("w-radios"),m=p("example"),M=p("w-switch");return h(),b(f,null,[t(m,{title:"Special Hours (or Business Hours)",anchor:"special-hours"},_({desc:l(()=>[o("div",B,[e[5]||(e[5]=o("div",{class:"grow xs7"},[o("p",null,[s("The "),o("code",null,"specialHours"),s(" prop highlights one or more time ranges per weekday on day and week views."),o("br"),s(`
It works well for business hours, team shifts, or any recurring availability window.`)]),o("p",{class:"mt3"},[s("Each weekday can contain a single block or an array of blocks."),o("br"),s(`
Each block can also carry a `),o("code",null,"label"),s(" that you can style freely with CSS.")])],-1)),o("div",F,[e[4]||(e[4]=o("label",null,"Show",-1)),t(u,{modelValue:r.variant,"onUpdate:modelValue":e[0]||(e[0]=a=>r.variant=a),items:r.choices},null,8,["modelValue","items"])])])]),"code-html":l(()=>[e[6]||(e[6]=s(`<vue-cal
  :views="['day', 'week']"
  :time-from="7 * 60"
  :time-to="20 * 60"
  :special-hours="specialHours"
/>`,-1))]),"code-css":l(()=>[r.variant==="doctorHours"?(h(),b(f,{key:0},[s(`.vuecal__special-hours {
  text-align: center;

  &.doctor-1 {background-color: hsl(127deg 43% 60% / 15%);color: hsl(127, 50%, 67%);}
  &.doctor-2 {background-color: hsl(217deg 43% 60% / 15%);color: hsl(217, 80%, 67%);}
  &.doctor-3 {background-color: hsl(287deg 43% 60% / 15%);color: hsl(287, 80%, 67%);}
  &.closed {
    background: repeating-linear-gradient(-45deg, rgba(#fff, 0) 0 6px, rgba(#ffa257, 0.15) 6px 20px);
    color: hsl(27, 90%, 63%);
  }
  em {font-size: 0.9em;color: #999;line-height: 1.15;}
}`)],64)):(h(),b(f,{key:1},[s(".business-hours {background-color: #00daff21;}")],64))]),default:l(()=>[t(c(w),{dark:c(d).darkMode,views:["day","week"],"time-from":420,"time-to":1200,"special-hours":k.value,style:{height:"550px"}},null,8,["dark","special-hours"])]),_:2},[r.variant==="simpleBusinessHours"?{name:"code-js",fn:l(()=>[e[7]||(e[7]=s(`const specialHours = {
  mon: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  tue: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  wed: [
    { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
    { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
  ],
  thu: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  fri: { from: 9 * 60, to: 18 * 60, class: 'business-hours' }
}`,-1))]),key:"0"}:{name:"code-js",fn:l(()=>[e[8]||(e[8]=s(`const specialHours = {
  mon: {
    from: 8 * 60,
    to: 17 * 60,
    class: 'doctor-1',
    label: '<strong>Doctor 1</strong><br><em>Full day shift</em>'
  },
  tue: {
    from: 9 * 60,
    to: 18 * 60,
    class: 'doctor-2',
    label: '<strong>Doctor 2</strong><br><em>Full day shift</em>'
  },
  wed: [
    {
      from: 8 * 60,
      to: 12 * 60,
      class: 'doctor-1',
      label: '<strong>Doctor 1</strong><br><em>Morning shift</em>'
    },
    {
      from: 14 * 60,
      to: 19 * 60,
      class: 'doctor-3',
      label: '<strong>Doctor 3</strong><br><em>Afternoon shift</em>'
    }
  ],
  thu: {
    from: 8 * 60,
    to: 17 * 60,
    class: 'doctor-1',
    label: '<strong>Doctor 1</strong><br><em>Full day shift</em>'
  },
  fri: {
    from: 9 * 60,
    to: 18 * 60,
    class: 'doctor-3',
    label: '<strong>Doctor 3</strong><br><em>Full day shift</em>'
  },
  sat: {
    from: 9 * 60,
    to: 18 * 60,
    class: 'doctor-2',
    label: '<strong>Doctor 2</strong><br><em>Full day shift</em>'
  },
  sun: {
    from: 7 * 60,
    to: 20 * 60,
    class: 'closed',
    label: '<strong>Closed</strong>'
  }
}`,-1))]),key:"1"}]),1024),t(m,{title:"Schedules & Schedule Events",anchor:"schedules"},{desc:l(()=>[o("div",T,[e[12]||(e[12]=o("div",{class:"grow xs7"},[o("p",null,[s(`Schedules split each day into dedicated columns for people, rooms, or resources, while events keep using
their `),o("code",null,"schedule"),s(" id."),o("br"),s(`
This example also shows how `),o("code",null,"specialHours"),s(" can now target those same schedule ids.")]),o("p",{class:"mt3"},[s("Each weekday can define a shared "),o("code",null,"default"),s(" range and optional overrides in "),o("code",null,"schedules"),s("."),o("br"),s(`
Any schedule without an override falls back to `),o("code",null,"default"),s(".")]),o("p",{class:"mt3"},[s("Use the CSS variables "),o("code",null,"--vuecal-min-cell-size"),s(" and "),o("code",null,"--vuecal-min-schedule-size"),s(` when you need
a wider, scrollable layout.`)])],-1)),o("div",W,[e[10]||(e[10]=o("label",null,"Special Hours",-1)),t(u,{modelValue:n.hoursMode,"onUpdate:modelValue":e[1]||(e[1]=a=>n.hoursMode=a),items:n.hoursChoices},null,8,["modelValue","items"]),t(M,{modelValue:n.schedules[1].hide,"onUpdate:modelValue":e[2]||(e[2]=a=>n.schedules[1].hide=a)},{default:l(()=>[...e[9]||(e[9]=[s("Hide Dr Kim",-1)])]),_:1},8,["modelValue"]),e[11]||(e[11]=o("label",null,"Layout",-1)),t(u,{modelValue:n.widthMode,"onUpdate:modelValue":e[3]||(e[3]=a=>n.widthMode=a),items:n.widthChoices},null,8,["modelValue","items"])])])]),"code-html":l(()=>[...e[13]||(e[13]=[s(`<vue-cal
  :view-date="stringToDate('2026-05-19')"
  :views="['day', 'week']"
  :time-from="7 * 60"
  :time-to="21 * 60"
  :events="events"
  :schedules="schedules"
  :special-hours="specialHours"
  :style="{
    '--vuecal-min-cell-size': '24rem',
    '--vuecal-min-schedule-size': '13rem'
  }"
/>`,-1)])]),"code-js":l(()=>[...e[14]||(e[14]=[s(`const schedules = [
  { id: 'dr-lee', label: 'Dr Lee', class: 'doctor doctor--lee' },
  { id: 'dr-kim', label: 'Dr Kim', class: 'doctor doctor--kim' },
  { id: 'lab', label: 'Lab', class: 'doctor doctor--lab' }
]
const events = [
  { start: '2026-05-19 08:30', end: '2026-05-19 10:00', title: 'Rounds', class: 'health', schedule: 'dr-lee' },
  { start: '2026-05-19 11:00', end: '2026-05-19 12:00', title: 'Consultation', class: 'health', schedule: 'dr-kim' },
  { start: '2026-05-19 14:00', end: '2026-05-19 17:00', title: 'Tests', class: 'leisure', schedule: 'lab' }
]
const specialHours = {
  mon: {
    default: { from: 8 * 60, to: 18 * 60, class: 'clinic-hours', label: 'Clinic open' },
    schedules: {
      'dr-lee': [
        { from: 8 * 60, to: 12 * 60, class: 'doctor-1', label: 'Dr Lee AM' },
        { from: 13 * 60, to: 17 * 60, class: 'doctor-1', label: 'Dr Lee PM' }
      ],
      'dr-kim': { from: 10 * 60, to: 19 * 60, class: 'doctor-2', label: 'Late shift' }
    }
  }
}`,-1)])]),"code-css":l(()=>[...e[15]||(e[15]=[s(`.vuecal__schedule.doctor--lee {background-color: rgba(192, 235, 255, 0.32);}
.vuecal__schedule.doctor--kim {background-color: rgba(255, 221, 235, 0.28);}
.vuecal__schedule.doctor--lab {background-color: rgba(222, 255, 229, 0.28);}
.vuecal__schedule--heading {font-size: 14px;font-weight: 600;}
.vuecal__special-hours.clinic-hours {background-color: rgba(255, 235, 59, 0.18);}
.vuecal__special-hours.doctor-1 {background-color: rgba(76, 175, 80, 0.18);}
.vuecal__special-hours.doctor-2 {background-color: rgba(63, 81, 181, 0.18);}
.vuecal__special-hours.doctor-3 {background-color: rgba(156, 39, 176, 0.18);}
.vuecal__event.health {background-color: rgba(87, 206, 169, 0.82);border-color: rgba(76, 175, 80, 0.45);}
.vuecal__event.leisure {background-color: rgba(253, 156, 66, 0.85);border-color: rgba(233, 136, 46, 0.55);}
`,-1)])]),default:l(()=>[t(c(w),{dark:c(d).darkMode,"view-date":c(z)("2026-05-19"),views:["day","week"],"time-from":420,"time-to":1260,"editable-events":"",events:y,schedules:n.schedules,"special-hours":C.value,style:V(x.value)},null,8,["dark","view-date","schedules","special-hours","style"])]),_:1}),t(m,{title:"Blocked time (allowEvents) & businessHours alias",anchor:"allow-events-hours"},{desc:l(()=>[...e[16]||(e[16]=[o("p",null,[s("The first calendar uses "),o("code",null,"allowEvents: false"),s(" on Wednesday lunch (12:00–13:00). Try dragging, resizing, or creating an event across that band — it snaps back or is not created."),o("br"),s(`
The second calendar passes the same shape via `),o("code",null,":business-hours"),s(" while "),o("code",null,"special-hours"),s(" stays empty (alias behavior).")],-1)])]),"code-html":l(()=>[...e[17]||(e[17]=[s(`<vue-cal
  :views="['week']"
  :time-from="7 * 60"
  :time-to="20 * 60"
  editable-events
  :special-hours="hoursWithLunchBlock"
  :events="allowEventsDemoEvents"
/>`,-1)])]),"code-js":l(()=>[...e[18]||(e[18]=[s(`const hoursWithLunchBlock = {
  wed: [
    { from: 9 * 60, to: 12 * 60, class: 'open-hours', label: 'Open' },
    { from: 12 * 60, to: 13 * 60, class: 'lunch-break', allowEvents: false, label: 'Lunch' },
    { from: 13 * 60, to: 18 * 60, class: 'open-hours', label: 'Open' }
  ]
}
const allowEventsDemoEvents = [
  { start: '2026-05-21 10:00', end: '2026-05-21 11:00', title: 'Drag / resize over lunch', class: 'health' }
]`,-1)])]),default:l(()=>[o("div",A,[t(c(w),{class:"allow-events-demo-cal",dark:c(d).darkMode,views:["week"],"time-from":420,"time-to":1200,"editable-events":"","special-hours":H,events:L,style:{height:"380px"}},null,8,["dark"])])]),_:1})],64)}}};export{N as default};
