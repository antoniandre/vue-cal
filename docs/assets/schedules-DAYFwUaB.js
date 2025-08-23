import{u as x,x as p,r as H,b as r,f as l,e as t,z as S,w as s,h as o,g as i,F as c,a,t as u,d as m}from"./index-3XXseF32.js";import{s as _}from"./index-BCYqmXg2.js";import{_ as g}from"./index-CFU_uC7z.js";const T={class:"w-flex justify-end gap2"},A={__name:"schedules",setup(C){const h=x(),w=[{start:"2018-10-30 10:30",end:"2018-10-30 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-16 10:30",end:"2018-11-16 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 10:35",end:"2018-11-19 11:30",title:"Doctor appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:1},{start:"2018-11-19 18:30",end:"2018-11-19 19:15",title:"Dentist appointment",content:'<i class="w-icon mdi mdi-hospital-box-outline"></i>',class:"health",schedule:2},{start:"2018-11-20 18:30",end:"2018-11-20 20:30",title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:"2018-11-21 11:00",end:"2018-11-21 13:00",title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-coffee-outline"></i>',class:"leisure",schedule:1,background:!1},{start:"2018-11-21 19:30",end:"2018-11-21 23:00",title:"Swimming lesson",content:'<i class="w-icon mdi mdi-pool"></i>',class:"sport",schedule:2},{start:"2018-11-23 12:30",end:"2018-11-23 13:00",title:"Macca's with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:"2018-11-23 21:00",end:"2018-11-23 23:30",title:"Movie time",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:"2018-11-30 21:00",end:"2018-11-30 23:30",title:"Another movie tonight",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1}],n=p({doctorHours:{mon:{from:480,to:1020,class:"doctor-1",label:"<strong>Doctor 1</strong><br><em>Full day shift</em>"},tue:{from:540,to:1080,class:"doctor-2",label:"<strong>Doctor 2</strong><br><em>Full day shift</em>"},wed:[{from:480,to:720,class:"doctor-1",label:"<strong>Doctor 1</strong><br><em>Morning shift</em>"},{from:840,to:1140,class:"doctor-3",label:"<strong>Doctor 3</strong><br><em>Afternoon shift</em>"}],thu:{from:480,to:1020,class:"doctor-1",label:"<strong>Doctor 1</strong><br><em>Full day shift</em>"},fri:{from:540,to:1080,class:"doctor-3",label:"<strong>Doctor 3</strong><br><em>Full day shift</em>"},sat:{from:540,to:1080,class:"doctor-2",label:"<strong>Doctor 2</strong><br><em>Full day shift</em>"},sun:{from:420,to:1200,class:"closed",label:"<strong>Closed</strong>"}},simpleBusinessHours:{mon:{from:540,to:1080,class:"business-hours"},tue:{from:540,to:1080,class:"business-hours"},wed:[{from:540,to:720,class:"business-hours"},{from:840,to:1080,class:"business-hours"}],thu:{from:540,to:1080,class:"business-hours"},fri:{from:540,to:1080,class:"business-hours"}},choices:[{value:"simpleBusinessHours",label:"Simple Business Hours"},{value:"doctorHours",label:"Doctor's Hours"}],businessHoursType:H("simpleBusinessHours")}),d=p({minCellWidth:400,minScheduleWidth:0,schedules:[{id:1,class:"mom",label:"Mom"},{id:2,class:"dad",label:"Dad",hide:!1},{id:3,class:"kid1",label:"Kid 1"},{id:4,class:"kid2",label:"Kid 2"},{id:5,class:"kid3",label:"Kid 3"}],scheduleEvents:[...w.map(b=>({...b})),{start:"2018-11-21 12:00",end:"2018-11-21 12:30",title:"Recall Dave",content:'<i class="w-icon mdi mdi-coffee-outline"></i>',class:"leisure",schedule:1},{start:"2018-11-21 20:00",end:"2018-11-21 22:00",title:"Salsa",content:'<i class="w-icon mdi mdi-walk"></i>',class:"sport",schedule:1},{start:"2018-11-23 21:00",end:"2018-11-23 23:30",title:"Movie time",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:2}]});return(b,e)=>{const v=a("w-icon"),k=a("w-radios"),f=a("example"),y=a("alert");return m(),r(c,null,[l(f,{title:"Special Hours (or Business Hours)",anchor:"special-hours"},S({desc:s(()=>[e[2]||(e[2]=t("div",{class:"todo-tag d-iflex"},"MAKE THIS INTERACTIVE",-1)),e[3]||(e[3]=t("p",null,[o("The special hours are visible on "),t("span",{class:"code"},"week"),o(" and "),t("span",{class:"code"},"day"),o(` views and allow
you to highlight a particular time range on each day of the week individually.`),t("br"),o(`
You can also add a label to each block to provide additional information.`)],-1)),e[4]||(e[4]=t("p",null,`Note that you can provide an array of multiple blocks for the same day.
`,-1)),t("div",T,[e[1]||(e[1]=t("label",null,"Show:",-1)),l(k,{modelValue:n.businessHoursType,"onUpdate:modelValue":e[0]||(e[0]=D=>n.businessHoursType=D),items:n.choices},{default:s(()=>[l(v,{class:"mr2"},{default:s(()=>[o("mdi mdi-"+u(n.doctorHours?"close":"plus"),1)]),_:1})]),_:1},8,["modelValue","items"])])]),"code-html":s(()=>[e[5]||(e[5]=o(`<vue-cal
  :views="['day', 'week']"
  :time-from="7 * 60"
  :time-to="20 * 60"
  :special-hours="specialHours"
/>`,-1))]),"code-css":s(()=>[n.businessHoursType==="doctorHours"?(m(),r(c,{key:0},[o(`.vuecal__special-hours {
  text-align: center;

  &.doctor-1 {background-color: hsl(127deg 43% 60% / 15%);color: hsl(127, 50%, 67%);}
  &.doctor-2 {background-color: hsl(217deg 43% 60% / 15%);color: hsl(217, 80%, 67%);}
  &.doctor-3 {background-color: hsl(287deg 43% 60% / 15%);color: hsl(287, 80%, 67%);}
  &.closed {
    background: repeating-linear-gradient(-45deg, rgba(#fff, 0) 0 6px, rgba(#ffa257, 0.15) 6px 20px);
    color: hsl(27, 90%, 63%);
  }
  em {
    font-size: 0.9em;
    color: #999;
    line-height: 1.15;
  }
}`)],64)):(m(),r(c,{key:1},[o(".business-hours {background-color: #00daff21;}")],64))]),default:s(()=>[l(i(g),{dark:i(h).darkMode,views:["day","week"],"time-from":420,"time-to":1200,"special-hours":n[n.businessHoursType],style:{height:"550px"}},null,8,["dark","special-hours"])]),_:2},[n.businessHoursType==="simpleBusinessHours"?{name:"code-js",fn:s(()=>[e[6]||(e[6]=o(`const specialHours = {
  mon: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  tue: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  wed: [
    { from: 9 * 60, to: 12 * 60, class: 'business-hours' },
    { from: 14 * 60, to: 18 * 60, class: 'business-hours' }
  ],
  thu: { from: 9 * 60, to: 18 * 60, class: 'business-hours' },
  fri: { from: 9 * 60, to: 18 * 60, class: 'business-hours' }
}`,-1))]),key:"0"}:n.businessHoursType==="doctorHours"?{name:"code-js",fn:s(()=>[e[7]||(e[7]=o(`const specialHours = {
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
}`,-1))]),key:"1"}:void 0]),1024),l(f,{title:"Schedules & Schedule Events",anchor:"schedules"},{desc:s(()=>[e[9]||(e[9]=t("div",{class:"todo-tag d-iflex"},"REDO COLORS",-1)),e[10]||(e[10]=t("div",{class:"todo-tag d-iflex ml2"},"ADD MIN-WIDTH & HIDE DAD",-1)),l(y,{class:"text-bold"},{default:s(()=>e[8]||(e[8]=[o("This example will be completed soon.",-1)])),_:1,__:[8]})]),"code-html":s(()=>e[11]||(e[11]=[o(`<button @click="minCellWidth = minCellWidth ? 0 : 400">
  `+u("{{ minCellWidth ? 'min cell width: 400px' : 'Add min cell width' }}")+`
</button>
<button @click="minScheduleWidth = minScheduleWidth ? 0 : 200">
  `+u("{{ minScheduleWidth ? 'min schedule width: 200px' : 'Add min schedule width' }}")+`
</button>
<button @click="schedules[1].hide = !schedules[1].hide">
  Show/Hide Dad
</button>

<vue-cal
  :selected-date="stringToDate('2018-11-19')"
  :time-from="8 * 60"
  :time-step="30"
  :views="['day', 'week']"
  editable-events
  :events="events"
  :schedules="schedules"
  :min-cell-width="minCellWidth"
  :min-schedule-width="minScheduleWidth">
</vue-cal>`,-1)])),"code-js":s(()=>e[12]||(e[12]=[o(`data: () => ({
  minCellWidth: 400,
  minScheduleWidth: 0,
  schedules: [
    // The id property is added automatically if none (starting from 1), but you can set a custom one.
    // If you need to toggle the schedules, you must set the id explicitly.
    { id: 1, class: 'mom', label: 'Mom' },
    { id: 2, class: 'dad', label: 'Dad', hide: false },
    { id: 3, class: 'kid1', label: 'Kid 1' },
    { id: 4, class: 'kid2', label: 'Kid 2' },
    { id: 5, class: 'kid3', label: 'Kid 3' }
  ]
  events: [
    {
      start: '2018-11-19 10:35',
      end: '2018-11-19 11:30',
      title: 'Doctor appointment',
      content: '<i class="icon mdi mdi-hospital-box-outline"></i>',
      class: 'health',
      schedule: 1 // Has to match the id of the schedule you have set (or integers if none).
    },
    {
      start: '2018-11-19 18:30',
      end: '2018-11-19 19:15',
      title: 'Dentist appointment',
      content: '<i class="icon mdi mdi-hospital-box-outline"></i>',
      class: 'health',
      schedule: 2
    },
    {
      start: '2018-11-20 18:30',
      end: '2018-11-20 20:30',
      title: 'Cross-fit',
      content: '<i class="icon mdi mdi-dumbbell"></i>',
      class: 'sport',
      schedule: 1
    },
    ...
  ]
})`,-1)])),"code-css":s(()=>e[13]||(e[13]=[o(`/* You can easily set a different style for each schedule of your days. */
.vuecal__schedule.dad {background-color: rgba(221, 238, 255, 0.5);}
.vuecal__schedule.mom {background-color: rgba(255, 232, 251, 0.5);}
.vuecal__schedule.kid1 {background-color: rgba(221, 255, 239, 0.5);}
.vuecal__schedule.kid2 {background-color: rgba(255, 250, 196, 0.5);}
.vuecal__schedule.kid3 {background-color: rgba(255, 206, 178, 0.5);}
.vuecal__schedule--heading {color: rgba(0, 0, 0, 0.5);font-size: 26px;}

.vuecal__event {color: #fff;border: 1px solid;}
.vuecal__event.leisure {background-color: #fd9c42d9;border-color: #e9882e;}
.vuecal__event.health {background-color: #57cea9cc;border-color: #90d2be;}
.vuecal__event.sport {background-color: #ff6666d9;border-color: #eb5252;}
`,-1)])),default:s(()=>[l(i(g),{dark:i(h).darkMode,"selected-date":i(_)("2018-11-19"),"time-from":480,"time-step":30,views:["day","week","month"],"editable-events":"",events:d.scheduleEvents,schedules:d.schedules,"min-cell-width":d.minCellWidth,"min-schedule-width":d.minScheduleWidth},null,8,["dark","selected-date","events","schedules","min-cell-width","min-schedule-width"])]),_:1}),e[14]||(e[14]=t("div",{class:"todo-tag d-iflex mt6"},"ADD EXAMPLE WITH SCHEDULE EVENTS",-1))],64)}}};export{A as default};
