import{u as Z,c as Y,r as v,x as z,G as ee,b as d,f as o,w as l,e as t,h as n,a as k,A as te,q as _,g as p,y as J,H as ne,F as u,t as g,I as U,j as K,z as le,i as ae,m as oe,d as i}from"./index-3XXseF32.js";import"./index-BCYqmXg2.js";import{_ as x}from"./index-CFU_uC7z.js";const se={class:"no-bullet ml0"},re={class:"mt3"},ie={class:"title3"},de={class:"ml7"},ve={class:"mt4"},ue={class:"title3"},pe={class:"mt4"},ge={class:"title3"},me={class:"mt4"},ce={class:"title3"},we={class:"mt4"},fe={class:"title3"},be={class:"w-flex wrap gap3"},ye={class:"w-flex justify-end gap2 mt2"},De={class:"w-flex align-center justify-end gap3 mt4 wrap"},Ee={key:1},he={class:"w-flex justify-end mt2 gap2"},ke={class:"w-flex mb3 justify-end"},Ce={class:"w-flex align-start gap3 justify-end"},xe={class:"w-flex gap2 d-iflex no-grow"},Ve={class:"w-flex justify-end wrap gap2"},Te=["innerHTML"],ze={class:"w-flex justify-space-between gap2 wrap mt4"},Me={class:"w-flex align-end no-grow gap1 mb1"},He={class:"size--xs w-flex pa2 ova gap2 wrap bdrs2 bd1",style:{"min-height":"100px","background-color":"color-mix(in srgb, var(--w-base-color) 3%, transparent)"}},Re={key:0,class:"w-flex column align-center justify-center"},Ie={class:"bdrs2 bd1 w-flex column align-center justify-center pa1 no-grow blue--bg white"},je={class:"title3"},Oe={class:"size--xs"},Ue={class:"w-flex wrap gap3 justify-end mt8"},Se={class:"w-flex mt4 wrap gap2 basis-zero"},Be=["onDragstart"],Ae={class:"mr2"},Ne={class:"caption"},Fe={class:"w-flex wrap column gap3 align-end mt6"},Ye={__name:"calendar-events-interactions",setup(Le){const E=Z(),q=Y(()=>"/vue-cal/"),I=[{start:new Date(new Date().setHours(11,0)).subtractDays(2),end:new Date(new Date().setHours(13,0)).subtractDays(2),title:"Salsa Dance Class",content:'<i class="w-icon mdi mdi-dance-ballroom"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(12,30)),end:new Date(new Date().setHours(13,30)),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:new Date(new Date().setHours(11,30)).addDays(1),end:new Date(new Date().setHours(12,30)).addDays(1),title:"Dentist Appt.",content:'<i class="w-icon mdi mdi-tooth"></i>',class:"health",schedule:2},{start:new Date(new Date().setHours(13,0)).addDays(1),end:new Date(new Date().setHours(14,0)).addDays(1),title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(10,0)).addDays(3),end:new Date(new Date().setHours(11,30)).addDays(3),title:"Swimming Class",content:'<i class="w-icon mdi mdi-swim"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(11,35)).addDays(3),end:new Date(new Date().setHours(12,30)).addDays(3),title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-food-croissant"></i>',class:"leisure",schedule:1,background:!1},{start:new Date(new Date().setHours(9,0)).addDays(4),end:new Date(new Date().setHours(10,0)).addDays(4),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:new Date(new Date().setHours(11,30)).addDays(4),end:new Date(new Date().setHours(12,25)).addDays(4),title:"BK with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:new Date(new Date().setHours(12,30)).addDays(4),end:new Date(new Date().setHours(14,30)).addDays(4),title:"Movie Theater",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:new Date(new Date().setHours(11,30,21,0)).addDays(5),end:new Date(new Date().setHours(12,30,23,30)).addDays(5),title:"Movie Night",content:'<i class="w-icon mdi mdi-popcorn"></i>',class:"leisure",schedule:1},{start:new Date(new Date().setHours(10,0)).addDays(7),end:new Date(new Date().setHours(11,0)).addDays(7),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1}],S=v(null),F=v(null),s=z({createMethods:[{value:"event-create",label:"Click & Drag"},{value:"cell-dblclick",label:"Double Click"},{value:"cell-contextmenu",label:"Right Click"},{value:"cell-hold",label:"Click & Hold"}],createMethod:v("event-create"),createEvent:({e:r,event:e,cell:m,resolve:D,cursor:h})=>{r.preventDefault(),e={...e||{},title:"New Event! 🎉",start:(e==null?void 0:e.start)||h.date,end:(e==null?void 0:e.end)||h.date.addHours(1),class:"blue-event"},D=D||F.value.view.createEvent,s.skipCreationDialog?D(e):s.openCreationDialog({e:r,event:e,cell:m,resolve:D,cursor:h})},skipCreationDialog:v(!0),showCreationDialog:v(!1),snapToInterval:v(!1),eventCreateMinDrag:v(!1),resolve:null,events:v([]),newEvent:{title:"",background:!1,class:""},openCreationDialog:({event:r,resolve:e})=>{s.showCreationDialog=!0,s.newEvent=r,s.resolve=e},cancel:()=>{s.createMethod==="event-create"&&s.resolve(!1),s.showCreationDialog=!1},save:()=>{s.resolve(s.newEvent),s.showCreationDialog=!1}}),L=v(null),G=z({createEvent:()=>{L.value.view.createEvent({start:new Date,end:new Date().addHours(1),title:"New Event 🎉"})}}),c=z({events:[...I.map(r=>({...r}))],deleteEvent:({e:r,event:e})=>{W.value.view.deleteEvent(e._.id)},viewDate:new Date,editableEvents:v(!0),deleteMethod:v("dblclick"),deleteMethods:[{label:"dblclick"},{label:"hold"}],eventListeners:Y(()=>{let r={"event-dblclick":e=>e.event.delete(c.skipDeleteButton?3:1)};return c.deleteMethod==="hold"&&(r={"event-hold":e=>e.event.delete(c.skipDeleteButton?3:1),"event-dblclick":()=>{}}),r}),skipDeleteButton:v(!1)}),W=v(null),f=z({events:[...I.map(r=>({...r})),{start:new Date(new Date().addDays(2).setHours(11,0,0,0)),end:new Date(new Date().addDays(2).setHours(13,0,0,0)),title:"Boring Event",content:'<i class="w-icon mdi mdi-cancel"></i><br>Can&rsquo;t drag, resize or delete me!',class:"blue-event",deletable:!1,resizable:!1,draggable:!1}],deletable:v(!1),resizable:v(!1),draggable:v(!1),creatable:v(!1)}),C=z({counter:1,events:v([{start:new Date,end:new Date().addHours(1),title:"Event 1"}]),onEventCreate:({event:r,resolve:e})=>e({...r,title:"Event "+ ++C.counter}),addEvent:()=>C.events.push({start:new Date,end:new Date().addHours(1),title:"Event "+ ++C.counter})}),w=z({events:I.map(r=>({...r})),onEventDrop:({e:r,event:e,cell:m,overlaps:D})=>!D.length||D.length&&w.overlappableEvents,draggableEvents:v(!0),overlappableEvents:v(!0)}),B=v(null),$=v(null),V=z({events:v([{id:1,title:"Ext. Event 1",duration:60},{id:2,title:"Ext. Event 2",duration:30},{id:3,title:"Ext. Event 3"}]),onEventDragStart:(r,e)=>{r.dataTransfer.setData("event",JSON.stringify(e)),r.dataTransfer.setData("cursor-grab-at",r.offsetY)},onEventDrop:({e:r,event:e,cell:m,overlaps:D,external:h})=>{if(h){const j=V.events.findIndex(O=>O.id===e.id);j>-1&&V.events.splice(j,1)}},onEventDropInBank:r=>{const e=JSON.parse(r.dataTransfer.getData("event")||"{}");V.events.push({...e,duration:e.end?(e.end-e.start)/6e4:60}),(document.querySelector(".vuecal--dragging-event").isSameNode(B.value.$el)?B:$).value.view.deleteEvent(e._.id,3)}}),y=z({events:I.map(r=>({...r})),preventOverlapOnDrop:v(!0),preventOverlapWhileResizing:v(!0),preventOverlapAfterResizing:v(!1),onEventDrop:({e:r,event:e,cell:m,overlaps:D})=>!D.length||D.length&&!y.preventOverlapOnDrop,onEventResize:({e:r,event:e,overlaps:m})=>!m.length||m.length&&!y.preventOverlapWhileResizing,onEventResizeEnd:({e:r,event:e,overlaps:m})=>!m.length||m.length&&!y.preventOverlapAfterResizing}),H=z({events:[{start:new Date(new Date().setHours(12,30)),end:new Date(new Date().setHours(13,30)),title:"Event 1"},{start:new Date(new Date().setHours(11,30)).addDays(1),end:new Date(new Date().setHours(12,30)).addDays(1),title:"Event 2"}],interval:null,onReady:()=>{H.interval=setInterval(()=>{const r=["crimson","cornflowerblue","darkgreen","blueviolet","darkmagenta","teal"];H.events[0].backgroundColor=r[Math.floor(Math.random()*r.length)],H.events[1].backgroundColor=r[Math.floor(Math.random()*r.length)]},1e3)}});return ee(()=>{clearInterval(H.interval)}),(r,e)=>{const m=k("w-icon"),D=k("router-link"),h=k("alert"),j=k("w-image"),O=k("w-radios"),b=k("w-switch"),P=k("w-input"),R=k("w-button"),X=k("w-dialog"),T=k("example"),A=k("ssh-pre"),N=k("w-tooltip");return i(),d(u,null,[o(h,{class:"py3",info:""},{default:l(()=>[e[48]||(e[48]=t("p",{class:"mb2"},[n("The calendar allows you to interact with events in various ways."),t("br"),n(`
Here are some examples of how you can create, edit, delete, and drag & drop events.
`)],-1)),e[49]||(e[49]=t("p",{class:"text-bold mt4"},"There are 5 types of event interactions:",-1)),t("ul",se,[t("li",re,[t("div",ie,[o(m,{class:"mr2 success",md:""},{default:l(()=>e[31]||(e[31]=[n("wi-check",-1)])),_:1,__:[31]}),e[32]||(e[32]=n("Read",-1))]),t("p",de,[e[34]||(e[34]=n(`The events are displayed on the calendar and can show more details, usually on click,
like seen in the `,-1)),o(D,{to:"/examples/calendar-events--display#ex--open-dialog-on-event-click"},{default:l(()=>e[33]||(e[33]=[n("Open Dialog on Event Click",-1)])),_:1,__:[33]}),e[35]||(e[35]=n(" example.",-1))])]),t("li",ve,[t("div",ue,[o(m,{class:"mr2 success",md:""},{default:l(()=>e[36]||(e[36]=[n("wi-check",-1)])),_:1,__:[36]}),e[37]||(e[37]=n("Create",-1))]),e[38]||(e[38]=t("p",{class:"ml7"},"Create an event by clicking and dragging on a cell, by default.",-1))]),t("li",pe,[t("div",ge,[o(m,{class:"mr2 success",md:""},{default:l(()=>e[39]||(e[39]=[n("wi-check",-1)])),_:1,__:[39]}),e[40]||(e[40]=n("Delete",-1))]),e[41]||(e[41]=t("p",{class:"ml7"},"Delete an event by double clicking on it, by default.",-1))]),t("li",me,[t("div",ce,[o(m,{class:"mr2 success",md:""},{default:l(()=>e[42]||(e[42]=[n("wi-check",-1)])),_:1,__:[42]}),e[43]||(e[43]=n("Resize",-1))]),e[44]||(e[44]=t("p",{class:"ml7"},"Resize an event by dragging its resizer handle.",-1))]),t("li",we,[t("div",fe,[o(m,{class:"mr2 success",md:""},{default:l(()=>e[45]||(e[45]=[n("wi-check",-1)])),_:1,__:[45]}),e[46]||(e[46]=n("Drag",-1))]),e[47]||(e[47]=t("p",{class:"ml7"},"Drag and drop an event onto any cell that is not disabled.",-1))])])]),_:1,__:[48,49]}),o(T,{ref_key:"exCreateEventsExampleEl",ref:S,title:"Create Events",anchor:"create-events"},{desc:l(()=>[t("div",be,[e[50]||(e[50]=t("div",{class:"grow xs7"},[t("p",null,[n("Events can be created in various ways: programmatically or through user interaction with a calendar cell."),t("br"),n(`
The default interaction is a click and drag gesture, but you can define the type of interaction you
want.`),t("br"),n(`
The event creation can then be completed by an edition dialog box or not.`)]),t("p",{class:"mt3"},[n("With the "),t("code",null,"snapToInterval"),n(` option, you can make sure the event starts and ends at specific
intervals of minutes.`),t("br"),n(`
E.g. `),t("code",null,':snap-to-interval="15"'),n(" will snap the event to the closest "),t("code",null,":00"),n(", "),t("code",null,":15"),n(`,
`),t("code",null,":30"),n(", "),t("code",null,":45"),n(" while dragging."),t("br"),n(`
This option also applies on event resizing after the drag-creation.`)]),t("p",{class:"mt3"},[n("With the "),t("code",null,"eventCreateMinDrag"),n(` option, you can define the minimum drag distance in pixels
before the event creation starts. This can be useful to prevent accidental event creation when
navigating the calendar.
`)])],-1)),o(j,{class:"bd1 bdrs2 sh2",src:`${q.value}images/click-and-drag.webp`,alt:"Create Events",width:"250",lazy:""},null,8,["src"])]),o(h,null,{default:l(()=>e[51]||(e[51]=[n("The event creation is only available on a day cell: not on year & years views.",-1)])),_:1,__:[51]}),t("div",ye,[e[53]||(e[53]=t("label",null,"Create Event On Cell",-1)),t("div",null,[o(O,{modelValue:s.createMethod,"onUpdate:modelValue":[e[0]||(e[0]=a=>s.createMethod=a),(S.value||{}).refreshHeight],items:s.createMethods},null,8,["modelValue","onUpdate:modelValue","items"]),e[52]||(e[52]=t("p",{class:"caption mt1"},"(Or however you want)",-1))])]),t("div",De,[o(b,{modelValue:s.skipCreationDialog,"onUpdate:modelValue":[e[1]||(e[1]=a=>s.skipCreationDialog=a),(S.value||{}).refreshHeight]},{default:l(()=>e[54]||(e[54]=[n("Skip Creation Dialog",-1)])),_:1,__:[54]},8,["modelValue","onUpdate:modelValue"]),o(b,{modelValue:s.snapToInterval,"onUpdate:modelValue":e[2]||(e[2]=a=>s.snapToInterval=a)},{default:l(()=>e[55]||(e[55]=[n("Snap to Interval: ",-1),t("span",{class:"code transparent--bg inherit"},"15min",-1)])),_:1,__:[55]},8,["modelValue"]),o(b,{modelValue:s.eventCreateMinDrag,"onUpdate:modelValue":e[3]||(e[3]=a=>s.eventCreateMinDrag=a)},{default:l(()=>e[56]||(e[56]=[n("Event Create Drag Min: ",-1),t("span",{class:"code transparent--bg inherit"},"15px",-1)])),_:1,__:[56]},8,["modelValue"])])]),"code-html":l(()=>[n(`<vue-cal
  `+g(s.createMethod==="event-create"?"":`ref="exCreateEventsVueCalEl"
  `)+g(s.snapToInterval?`:snap-to-interval="15"
  `:"")+g(s.eventCreateMinDrag?`:event-create-min-drag="15"
  `:"")+`editable-events
  @`+g(s.createMethod)+`="createEvent">
</vue-cal>`,1),s.skipCreationDialog?(i(),d("span",Ee)):(i(),d(u,{key:0},[n(`

<!-- Using Wave UI - https://antoniandre.github.io/wave-ui -->
<w-dialog
  v-if="newEvent"
  v-model="showCreationDialog"
  width="300"
  @close="cancelCreation">
  <w-input v-model="newEvent.title">Event Title</w-input>
  <w-input v-model="newEvent.class">Event Class</w-input>
  <w-switch v-model="newEvent.background">Background</w-switch>
  <div class="w-flex justify-end mt2 gap2">
    <w-button @click="cancelCreation">Cancel</w-button>
    <w-button @click="validateCreation">OK</w-button>
  </div>
</w-dialog>`)],64))]),"code-js":l(()=>[s.createMethod==="event-create"?(i(),d(u,{key:0},[],64)):(i(),d(u,{key:1},[n(`const exCreateEventsVueCalEl = ref(null)
`)],64)),s.createMethod==="event-create"&&s.skipCreationDialog?(i(),d(u,{key:2},[n(`const createEvent = ({ event, resolve }) => {
  resolve({
    ...event,
    title: 'New Event! 🎉'
  })
}
`)],64)):s.createMethod==="event-create"?(i(),d(u,{key:3},[n(`const createEvent = ({ event, resolve }) => {
  openCreationDialog({ event, resolve })
}
`)],64)):s.createMethod!=="event-create"?(i(),d(u,{key:4},[n(`
const createEvent = ({ event, cursor }) => {
  event.start = cursor.date
  event.end = cursor.date.addHours(1) // Uses Vue Cal's Date prototypes.
  exCreateEventsVueCalEl.value.view.createEvent(event)
}`)],64)):(i(),d(u,{key:5},[],64)),s.skipCreationDialog?(i(),d(u,{key:7},[],64)):(i(),d(u,{key:6},[e[57]||(e[57]=n(`
const showCreationDialog = ref(false)
const createEventFn = ref(null)
const newEvent = ref({
  title: '',
  background: false,
  class: ''
})

const openCreationDialog = ({ event, resolve }) => {
  showCreationDialog.value = true
  newEvent.value = event
  createEventFn.value = resolve
}

const cancelCreation = () => {`,-1)),s.createMethod==="event-create"?(i(),d(u,{key:0},[n(`
  createEventFn.value(false)`)],64)):(i(),d(u,{key:1},[],64)),e[58]||(e[58]=n(`
  showCreationDialog.value = false
}

const validateCreation = () => {`,-1)),s.createMethod!=="event-create"?(i(),d(u,{key:2},[n(`
  exCreateEventsVueCalEl.value.view.createEvent({
    ...newEvent.value,
    start: cursor.date,
    end: cursor.date.addHours(1) // Uses Vue Cal's Date prototypes.
  })`)],64)):(i(),d(u,{key:3},[n(`
  createEventFn.value(newEvent.value)`)],64)),e[59]||(e[59]=n(`
  showCreationDialog.value = false
}`,-1))],64))]),default:l(()=>[o(p(x),J({ref_key:"exCreateEventsVueCalEl",ref:F,"editable-events":{edit:!0,resize:!0,create:s.createMethod==="event-create",delete:!0}},{[ne(s.createMethod)]:s.createEvent},{events:s.events,"snap-to-interval":s.snapToInterval?15:0,"event-create-min-drag":s.eventCreateMinDrag?15:0,"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode}),null,16,["editable-events","events","snap-to-interval","event-create-min-drag","dark"]),s.newEvent?(i(),te(X,{key:0,modelValue:s.showCreationDialog,"onUpdate:modelValue":e[7]||(e[7]=a=>s.showCreationDialog=a),width:"300",onClose:s.cancel},{default:l(()=>[o(P,{modelValue:s.newEvent.title,"onUpdate:modelValue":e[4]||(e[4]=a=>s.newEvent.title=a)},{default:l(()=>e[60]||(e[60]=[n("Event Title",-1)])),_:1,__:[60]},8,["modelValue"]),o(P,{class:"my4",modelValue:s.newEvent.class,"onUpdate:modelValue":e[5]||(e[5]=a=>s.newEvent.class=a)},{default:l(()=>e[61]||(e[61]=[n("Event Class",-1)])),_:1,__:[61]},8,["modelValue"]),o(b,{modelValue:s.newEvent.background,"onUpdate:modelValue":e[6]||(e[6]=a=>s.newEvent.background=a)},{default:l(()=>e[62]||(e[62]=[n("Background",-1)])),_:1,__:[62]},8,["modelValue"]),t("div",he,[o(R,{onClick:s.cancel},{default:l(()=>e[63]||(e[63]=[n("Cancel",-1)])),_:1,__:[63]},8,["onClick"]),o(R,{onClick:s.save},{default:l(()=>e[64]||(e[64]=[n("OK",-1)])),_:1,__:[64]},8,["onClick"])])]),_:1},8,["modelValue","onClose"])):_("",!0)]),_:1},512),o(T,{title:"Create Events Programmatically",anchor:"create-events-programmatically"},{desc:l(()=>[e[67]||(e[67]=t("p",{class:"my2"},[n(`In order to create events programmatically, from an external button for instance, you need to call
the vue-cal `),t("code",null,"view.createEvent()"),n(" function from a Vue ref.")],-1)),t("div",ke,[o(R,{sm:"",onClick:G.createEvent},{default:l(()=>[o(m,{class:"mr1"},{default:l(()=>e[65]||(e[65]=[n("mdi mdi-plus",-1)])),_:1,__:[65]}),e[66]||(e[66]=n("Create Event",-1))]),_:1,__:[66]},8,["onClick"])])]),"code-html":l(()=>e[68]||(e[68]=[n(`<button @click="createEvent">Create Event</button>

<vue-cal
  ref="vuecalRef"
  editable-events>
</vue-cal>
`,-1)])),"code-js":l(()=>e[69]||(e[69]=[n(`const vuecalRef = ref(null)

const createEvent = () => {
  vuecalRef.value.view.createEvent({
    start: new Date(),
    end: new Date().addHours(1), // Using Vue Cal's Date prototypes.
    title: 'New Event 🎉'
  })
}`,-1)])),default:l(()=>[o(p(x),{ref_key:"exExternalEventCreateVuecalRef",ref:L,"editable-events":"",onReady:e[8]||(e[8]=({view:a})=>a.scrollToCurrentTime()),onEventCreated:e[9]||(e[9]=a=>a._.$el.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"})),views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode},null,8,["dark"])]),_:1}),o(T,{title:"Delete Events",anchor:"delete-events"},{desc:l(()=>[e[77]||(e[77]=t("h4",{class:"mt4 mb0"},"A. Deletion Rules",-1)),e[78]||(e[78]=t("p",{class:"mb2"},[n("The deletion of events is allowed or denied when the "),t("code",null,"editable-events"),n(` option is set to
`),t("code",null,"true"),n(" or "),t("code",null,"false"),n(" - or more granularly "),t("code",null,"editable-events.delete"),n(`, when
`),t("code",null,"editable-events"),n(" is provided as an object:")],-1)),o(A,{language:"js",dark:p(E).darkMode},{default:l(()=>e[70]||(e[70]=[n("{ drag: true, resize: true, delete: true, create: true }",-1)])),_:1,__:[70]},8,["dark"]),o(h,null,{default:l(()=>e[71]||(e[71]=[n(`In addition to the global settings, you can override the deletion ability individually for each
event using the event attributes `,-1),t("code",null,"deletable: false",-1),n(`.
`,-1)])),_:1,__:[71]}),e[79]||(e[79]=t("h4",{class:"mt4 mb0"},"B. Default Behavior & Flexibility",-1)),e[80]||(e[80]=t("p",null,[n("The deletion of an event is straightforward and extremely flexible."),t("br"),n(`
By default it is triggered by a double click/tap on the event, which displays a delete button.
On click/tap on this button, the event is deleted.`),t("br"),n(`
This gesture has the advantage of not interfering with the single click/tap event, which can be
used for other actions, and not interfering with the drag & drop gesture.
`)],-1)),e[81]||(e[81]=t("p",{class:"mt4"},"You can easily override this behavior by:",-1)),e[82]||(e[82]=t("ol",{class:"ml4"},[t("li",null,[n("Resetting the double-click event, only with "),t("code",null,'@double-click="false"'),n(`, or use
`),t("code",null,"@double-click"),n(" for another action.")]),t("li",null,[n("Optionally assigning a different interaction for the deletion with: "),t("code",null,'@event-xxx="$event.delete"'),n(`,
where `),t("code",null,"xxx"),n(" can be replaced with "),t("code",null,"click"),n(", "),t("code",null,"hold"),n(", "),t("code",null,"contextmenu"),n(`, or whatever
valid event you want.`),t("br")])],-1)),e[83]||(e[83]=t("h4",{class:"mt4 mb0"},"C. The Delete Function",-1)),t("div",null,[e[73]||(e[73]=n("Every event has a delete function that you can call from the event object itself:",-1)),o(A,{class:"d-iblock pr5 py0 ml1 mb0",language:"js",dark:p(E).darkMode},{default:l(()=>e[72]||(e[72]=[n("event.delete()",-1)])),_:1,__:[72]},8,["dark"])]),e[84]||(e[84]=t("p",null,`For more flexibility, this function can receive an explicit "deletion stage" integer parameter,
so you can skip to the stage you want directly:`,-1)),e[85]||(e[85]=t("ul",null,[t("li",null,[t("code",null,"1"),n(`: The delete button will appear. On click, the event is deleted directly in the global
events array (source of truth) and visually from the cell.`)]),t("li",null,[t("code",null,"2"),n(":"),t("span",{class:"ml1"},[n(`The event is deleted visually from the cell but not in the global events array (source of truth) yet.
This has the advantage of not triggering an immediate Vue reactivity update cascade on all the
cells.`),t("br"),n(`
The rerendering cascade of the cells is completely avoided by deleting the event on the next view
change, when the cell is unmounted.`),t("br"),n(`
even though this stage is more optimized than the stage `),t("code",null,"3"),n(`, it can be non-obvious or confusing
for the developer that the event is still in the array at this stage until the view changes.
Especially if you use a v-model on the events. For this reason, the stage `),t("code",null,"3"),n(` is the default
behavior from the delete button.`)])]),t("li",null,[t("code",null,"3"),n(`: The event is deleted both visually and in the source of truth (automatically called on
cell unmount after using stage `),t("code",null,"2"),n(").")])],-1)),e[86]||(e[86]=t("p",{class:"mt4"},[n("For more flexibility, there is also a "),t("code",null,"view.deleteEvent(eventId, stage)"),n(" function:")],-1)),e[87]||(e[87]=t("ul",null,[t("li",null,[n("Which takes two arguments: the internal ID of the event (found in "),t("code",null,"event._.id"),n(') to delete and a "deletion stage" integer just as described.')]),t("li",null,[n("Can also delete an event by a specific custom event property, like "),t("code",null,"event.id"),n(" or "),t("code",null,"event.doctorId"),n(", etc. by passing a key-value pair as an object in the first argument. E.g. "),t("code",null,"view.deleteEvent({ id: 1 }, 3)"),n(".")])],-1)),e[88]||(e[88]=t("p",{class:"mt6"},"Now let's view all this in action!",-1)),t("div",Ce,[o(b,{class:"no-grow",modelValue:c.editableEvents,"onUpdate:modelValue":e[10]||(e[10]=a=>c.editableEvents=a),"label-color":"base"},{default:l(()=>e[74]||(e[74]=[n("Editable Events",-1)])),_:1,__:[74]},8,["modelValue"]),o(b,{class:"no-grow",modelValue:c.skipDeleteButton,"onUpdate:modelValue":e[11]||(e[11]=a=>c.skipDeleteButton=a),"label-color":"base"},{default:l(()=>e[75]||(e[75]=[n("Skip Delete Button",-1)])),_:1,__:[75]},8,["modelValue"]),t("div",xe,[e[76]||(e[76]=t("span",null,"Delete on:",-1)),o(O,{modelValue:c.deleteMethod,"onUpdate:modelValue":e[12]||(e[12]=a=>c.deleteMethod=a),items:c.deleteMethods,"label-color":"base"},null,8,["modelValue","items"])])])]),"code-html":l(()=>[n(`<vue-cal
  `+g(c.editableEvents?"editable-events":':editable-events="false"')+" "+g(c.deleteMethod==="hold"?`
  @event-dblclick="false"
  @event-hold="$event.delete${c.skipDeleteButton?"(3)":""}"`:`${c.skipDeleteButton?`
  @event-dblclick="$event.delete(3)"`:""}`)+`
  :events="events">
</vue-cal>
`,1)]),default:l(()=>[o(p(x),J({events:c.events,"editable-events":c.editableEvents},U(c.eventListeners),{onEventDelete:e[13]||(e[13]=a=>console.log("Event deleted!",a)),"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","view-date":c.viewDate,"views-bar":!1,dark:p(E).darkMode}),null,16,["events","editable-events","view-date","dark"])]),_:1}),o(T,{title:"Edit Events",anchor:"edit-events"},{desc:l(()=>[e[95]||(e[95]=t("p",{class:"mb2"},[n("Editing events is allowed or denied when the "),t("code",null,"editable-events"),n(` option is set to
`),t("code",null,"true"),n(" or "),t("code",null,"false"),n(". But more granularly, "),t("code",null,"editable-events"),n(` can be provided
as an object:`)],-1)),o(A,{language:"js",dark:p(E).darkMode},{default:l(()=>e[89]||(e[89]=[n("{ create: true, resize: true, drag: true, delete: true }",-1)])),_:1,__:[89]},8,["dark"]),e[96]||(e[96]=t("p",null,"With:",-1)),e[97]||(e[97]=t("ul",null,[t("li",null,[t("strong",{class:"code"},"create"),n(": Create a new event (by clicking and dragging by default).")]),t("li",null,[t("strong",{class:"code"},"resize"),n(`: Resize an event by dragging the resizer handle.
`),t("strong",null,"Not available if no timeline, not allowed on background events.")]),t("li",null,[t("strong",{class:"code"},"drag"),n(": Drag & drop an event (not allowed on background events).")]),t("li",null,[t("strong",{class:"code"},"delete"),n(": Delete an event (by double clicking an event by default).")])],-1)),o(h,null,{default:l(()=>e[90]||(e[90]=[n(`In addition to the global settings, you can override these actions individually for each
event using the event attributes, `,-1),t("code",null,"deletable: false",-1),n(", ",-1),t("code",null,"draggable: false",-1),n(` &
`,-1),t("code",null,"resizable: false",-1),n(`.
`,-1)])),_:1,__:[90]}),t("div",Ve,[o(b,{modelValue:f.creatable,"onUpdate:modelValue":e[14]||(e[14]=a=>f.creatable=a)},{default:l(()=>e[91]||(e[91]=[n("Create Events",-1)])),_:1,__:[91]},8,["modelValue"]),o(b,{modelValue:f.resizable,"onUpdate:modelValue":e[15]||(e[15]=a=>f.resizable=a)},{default:l(()=>e[92]||(e[92]=[n("Resize Events",-1)])),_:1,__:[92]},8,["modelValue"]),o(b,{modelValue:f.draggable,"onUpdate:modelValue":e[16]||(e[16]=a=>f.draggable=a)},{default:l(()=>e[93]||(e[93]=[n("Drag Events",-1)])),_:1,__:[93]},8,["modelValue"]),o(b,{modelValue:f.deletable,"onUpdate:modelValue":e[17]||(e[17]=a=>f.deletable=a)},{default:l(()=>e[94]||(e[94]=[n("Delete Events",-1)])),_:1,__:[94]},8,["modelValue"])])]),"code-html":l(()=>[n(`<vue-cal
  :editable-events="{ create: `+g(f.creatable?"true":"false")+", resize: "+g(f.resizable?"true":"false")+",  drag: "+g(f.draggable?"true":"false")+", delete: "+g(f.deletable?"true":"false")+` }"
  :events="events">
</vue-cal>`,1)]),"code-js":l(()=>e[98]||(e[98]=[n(`const events = [
  {
    start: new Date(new Date().addDays(2).setHours(11, 0, 0, 0)), // Using Vue Cal's Date prototypes.
    end: new Date(new Date().addDays(2).setHours(13, 0, 0, 0)), // Using Vue Cal's Date prototypes.
    title: 'Boring Event',
    content: '<i class="icon mdi mdi-cancel"></i><br>Can’t drag, resize or delete me!',
    class: 'blue-event',
    deletable: false,
    resizable: false,
    draggable: false
  },
  ...
]
`,-1)])),default:l(()=>[o(p(x),{ref_key:"exEditEventsVuecalRef",ref:W,"editable-events":{create:f.creatable,resize:f.resizable,drag:f.draggable,delete:f.deletable},events:f.events,"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode},{event:l(({event:a})=>[t("strong",null,g(a.title),1),t("p",null,g(a.start.formatTime())+" - "+g(a.end.formatTime()),1),t("p",{innerHTML:a.content},null,8,Te)]),_:1},8,["editable-events","events","dark"])]),_:1}),o(T,{title:"Events v-model",anchor:"events-v-model"},{desc:l(()=>[e[106]||(e[106]=t("p",null,[n(`The good news is that the events prop is a two-way binding! So you can use it to read or write with
`),t("code",null,"v-model:events"),n("! But...")],-1)),o(h,{class:"mb4",tip:""},{default:l(()=>e[99]||(e[99]=[t("div",{class:"title4 mt-1"},"With great powers comes great responsibility",-1),t("p",null,[n("Be aware that modifying the array of events externally will always override the internal array."),t("br"),n(`
So you must be sure to save the changes that were made to events through the Vue Cal UI, or they
will be lost.
`)],-1)])),_:1,__:[99]}),e[107]||(e[107]=t("p",{class:"mb2"},[n(`In this example, you can add or remove events from the array of events and they will be displayed in the
box below. You can also create events in the calendar with a click and drag, and resize or drag and drop
them.`),t("br"),n(`
The events in the list will accurately display the updated start and end times.`)],-1)),t("div",ze,[e[104]||(e[104]=t("div",{class:"title4"},"Current List of Events",-1)),t("div",Me,[o(R,{onClick:C.addEvent},{default:l(()=>[o(m,{class:"mr2"},{default:l(()=>e[100]||(e[100]=[n("mdi mdi-plus",-1)])),_:1,__:[100]}),e[101]||(e[101]=n("Add Event",-1))]),_:1,__:[101]},8,["onClick"]),o(R,{onClick:e[18]||(e[18]=a=>C.events.pop())},{default:l(()=>[o(m,{class:"mr2"},{default:l(()=>e[102]||(e[102]=[n("mdi mdi-trash-can-outline",-1)])),_:1,__:[102]}),e[103]||(e[103]=n("Remove Last Event",-1))]),_:1,__:[103]})])]),t("div",He,[C.events.length?_("",!0):(i(),d("div",Re,e[105]||(e[105]=[t("div",{class:"caption"},"No events yet.",-1)]))),(i(!0),d(u,null,K(C.events,a=>(i(),d("div",Ie,[t("div",je,g(a.title),1),t("div",Oe,g(a.start.formatTime())+" - "+g(a.end.formatTime()),1)]))),256))])]),"code-html":l(()=>e[108]||(e[108]=[n(`<button
  @click="events.push({
    start: new Date(),
    end: new Date().addHours(1), // Using Vue Cal's Date prototypes.
    title: 'Event 1'
  })">Add Event</button>
<button @click="events.pop()">Remove last event</button>

<vue-cal v-model:events="events" />`,-1)])),"code-js":l(()=>e[109]||(e[109]=[n(`const events = [
  {
    start: new Date(new Date().setHours(9, 0, 0, 0)),
    end: new Date(new Date().setHours(10, 0, 0, 0)),
    title: 'Event 1'
  },
  ...
]`,-1)])),default:l(()=>[o(p(x),{ref:"exEventsVModelVuecalRef",events:C.events,"onUpdate:events":e[19]||(e[19]=a=>C.events=a),"editable-events":"",onReady:e[20]||(e[20]=({view:a})=>a.scrollToCurrentTime()),onEventCreate:C.onEventCreate,onEventDblclick:e[21]||(e[21]=({event:a})=>a.delete(2)),views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode},null,8,["events","onEventCreate","editable-events","dark"])]),_:1}),o(T,{title:"Event Drag & Drop",anchor:"drag-and-drop"},le({desc:l(()=>[e[118]||(e[118]=t("div",{class:"todo-tag d-iflex"},"FINISH THIS EXAMPLE - DISABLE A DAY",-1)),e[119]||(e[119]=t("p",null,[n(`The drag & drop functionality is available for single-day foreground events only and is powered by
the native HTML5 drag & drop API (widely supports touch devices).`),t("br"),n(`
It allows you to move an event from one cell to another, or from an external source to the calendar
and vice-versa.`)],-1)),e[120]||(e[120]=t("div",{class:"title5 mt4"},"Good to Know:",-1)),e[121]||(e[121]=t("ul",null,[t("li",{class:"mt2"},[n("The drag & drop feature is enabled with "),t("code",null,"editable-events"),n(` set to true, but you can specifically
disable it by setting the `),t("code",null,"editable-events.drag"),n(" option to "),t("code",null,"false"),n("."),t("br"),n(`
You can also disable it for a specific event by setting the `),t("code",null,"draggable"),n(" attribute to "),t("code",null,"false"),n(`.
`)]),t("li",{class:"mt2"},[n("While dragging an event, the clone at cursor receives the "),t("code",null,".vuecal__event--dragging-ghost"),n(` CSS
class, while the original event receives the `),t("code",null,".vuecal__event--dragging-original"),n(` CSS class (the
original is hidden by default while dragging). You can override these styles with your own CSS.`)]),t("li",null,[n(`By default, when you drop the event it will start exactly where you dropped it,
but if you prefer you can use the `),t("code",null,"snapToInterval"),n(` option to dictate where it should
snap to (refer to `),t("code",null,"snapToInterval"),n(" in the "),t("a",{href:"#api"},"API section"),n(")."),t("br"),n(`
If you wonder why it does not represent the snapping while dragging, it's not possible to do it with
the native HTML5 drag & drop.
`)])],-1)),o(h,null,{default:l(()=>e[110]||(e[110]=[t("p",null,[n("If you listen for the "),t("code",null,"event-drop"),n(" event, you will receive an object with the following:")],-1),t("ul",null,[t("li",null,[t("code",null,"event"),n(": The event object that was dropped (contains the date and schedule where it was dropped).")]),t("li",null,[t("code",null,"cell"),n(": The cell object where the event was dropped.")]),t("li",null,[t("code",null,"e"),n(": The JavaScript native event object.")]),t("li",null,[t("code",null,"overlaps"),n(": An array of events that overlap the dropped event.")])],-1),t("p",null,[n("From the same event listener, you can "),t("strong",null,[n("reject the drop by returning "),t("code",null,"false")]),n(".")],-1)])),_:1,__:[110]}),t("div",Ue,[o(b,{modelValue:w.draggableEvents,"onUpdate:modelValue":e[22]||(e[22]=a=>w.draggableEvents=a),"label-color":"base"},{default:l(()=>e[111]||(e[111]=[n("Draggable Events",-1)])),_:1,__:[111]},8,["modelValue"]),o(N,{"align-right":""},{activator:l(({on:a})=>[t("div",U(a,!0),[o(b,{modelValue:w.overlappableEvents,"onUpdate:modelValue":e[23]||(e[23]=M=>w.overlappableEvents=M),"label-color":"base"},{default:l(()=>e[112]||(e[112]=[n("Overlappable Events",-1)])),_:1,__:[112]},8,["modelValue"])],16)]),default:l(()=>[e[113]||(e[113]=n("Allow dropping events on top of other events",-1))]),_:1,__:[113]}),o(N,{"align-right":""},{activator:l(({on:a})=>[t("div",U(a,!0),[o(b,{modelValue:w.snapToInterval,"onUpdate:modelValue":e[24]||(e[24]=M=>w.snapToInterval=M),"label-color":"base"},{default:l(()=>e[114]||(e[114]=[n("Snap to Interval",-1)])),_:1,__:[114]},8,["modelValue"])],16)]),default:l(()=>[e[115]||(e[115]=n("Snap the event to the closest round hour when dropped or resized",-1))]),_:1,__:[115]}),o(N,{"align-right":""},{activator:l(({on:a})=>[t("div",U(a,!0),[o(b,{modelValue:w.overrideDragCss,"onUpdate:modelValue":e[25]||(e[25]=M=>w.overrideDragCss=M),"label-color":"base"},{default:l(()=>e[116]||(e[116]=[n("Override Draggable CSS",-1)])),_:1,__:[116]},8,["modelValue"])],16)]),default:l(()=>[e[117]||(e[117]=n("Override the default event dragging CSS styles",-1))]),_:1,__:[117]})])]),"code-html":l(()=>[n(`<vue-cal
  :events="events"
  :editable-events="{ drag: `+g(w.draggableEvents?"true":"false")+` }"
  `+g(w.snapToInterval?`:snap-to-interval="60"
  `:"")+`@event-drop="onEventDrop"
  :schedules="schedules">
</vue-cal>`,1)]),"code-js":l(()=>[e[122]||(e[122]=n(`const schedules = [{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]
`,-1)),w.overlappableEvents?(i(),d(u,{key:0},[n(`
const onEventDrop = ({ e, event, cell }) => {
  console.log('Event dropped!', event, cell)
  // Return false to reject the drop.
}`)],64)):(i(),d(u,{key:1},[n(`
const onEventDrop = ({ e, event, cell, overlaps }) => !overlaps.length

`)],64))]),default:l(()=>[o(p(x),{events:w.events,"editable-events":{drag:w.draggableEvents},onEventDrop:w.onEventDrop,schedules:[{id:1,label:"Dr 1"},{id:2,label:"Dr 2"}],"time-from":540,"time-to":900,"snap-to-interval":w.snapToInterval?60:0,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode,class:ae({"override-drag-css":w.overrideDragCss}),style:{height:"327px"}},null,8,["events","editable-events","onEventDrop","snap-to-interval","dark","class"])]),_:2},[w.overrideDragCss?{name:"code-css",fn:l(()=>[e[123]||(e[123]=n(`.vuecal__event--dragging-ghost {
  opacity: 1;
  background-color: #adff2f;
  border: none;
  color: #000;
}
.vuecal__event--dragging-original {
  opacity: 0.8;
  border: 1px dashed var(--vuecal-event-border-color);
  transform: scale(0.8);
  transition: transform 0.2s ease-in-out;
}
`,-1))]),key:"0"}:void 0]),1024),o(T,{title:"External Events Drag & Drop",anchor:"external-events-drag-and-drop"},{desc:l(()=>[e[125]||(e[125]=t("p",{class:"mb2"},[n("You can drag & drop events from an external source as long as they are HTML5 draggable (this will change when touch devices are supported)."),t("br"),n(`
It is also possible to move an event from one calendar to another.`),t("br"),t("br"),n(`
In the external event, you can set a `),t("code",null,"duration"),n(" property: it will be used to set the duration of the event when dropped in Vue Cal."),t("br"),n(`
If the `),t("code",null,"duration"),n(" is missing, the default duration will be equal to the time interval."),t("br"),n(`
Once the event is dropped into Vue Cal, it will be removed from the external source and its duration will be calculated in `),t("code",null,"event._.duration"),n(`.
`)],-1)),o(h,{tip:""},{default:l(()=>e[124]||(e[124]=[t("strong",null,"Important note when dragging external events into Vue Cal:",-1),t("div",null,[n(`It's important to understand that the native HTML5 drag & drop, does not move an element from its
source to the destination. It only creates a copy of the element that you drag.`),t("br"),n(`
When you drop a DOM element to another location, you have to code the actual move yourself:
delete from source and create in destination.`),t("br"),n(`
Learn how in the example source code below!`)],-1)])),_:1,__:[124]}),e[126]||(e[126]=t("p",null,"In this example, you can drag the external events into the calendar and vice-versa.",-1))]),"code-html":l(()=>e[127]||(e[127]=[n(`<div
  class="external-event"
  v-for="(item, i) in draggables"
  :key="i"
  draggable="true"
  @dragstart="onEventDragStart($event, item)">
  <strong>`+g("{{ item.title }}")+`</strong>
  (`+g("{{ (item._ || {}).duration || item.duration ? `${(item._ || {}).duration || item.duration} min` : 'no duration' }}")+`)
</div>

<vue-cal
  :views-bar="false"
  editable-events
  @event-drop="onEventDrop">
</vue-cal>
`,-1)])),"code-js":l(()=>e[128]||(e[128]=[n(`export default {
  data: () => ({
    draggables: [
      {
        // The id (or however you name it), will help you find which event to delete
        // from the callback triggered on drop into Vue Cal.
        id: 1,
        title: 'Ext. Event 1',
        duration: 60
      },
      {
        id: 2,
        title: 'Ext. Event 2',
        duration: 30
      },
      {
        id: 3,
        title: 'Ext. Event 3',
        // No defined duration: defaults to a time step on drop.
      }
    ]
  }),
  methods: {
    onEventDragStart (e, draggable) {
      // Passing the event's data to Vue Cal through the DataTransfer object.
      e.dataTransfer.setData('event', JSON.stringify(draggable))
      e.dataTransfer.setData('cursor-grab-at', e.offsetY)
    },
    // The 3 parameters are destructured from the passed $event in @event-drop="onEventDrop".
    // \`event\` is the final event as Vue Cal understands it.
    // \`originalEvent\` is the event that was dragged into Vue Cal, it can come from the same
    //  Vue Cal instance, another one, or an external source.
    // \`external\` is a boolean that lets you know if the event is not coming from any Vue Cal.
    onEventDrop ({ event, originalEvent, external }) {
      // If the event is external, delete it from the data source on drop into Vue Cal.
      // If the event comes from another Vue Cal instance, it will be deleted automatically in there.
      if (external) {
        const extEventToDeletePos = this.draggables.findIndex(item => item.id === originalEvent.id)
        if (extEventToDeletePos > -1) this.draggables.splice(extEventToDeletePos, 1)
      }
    }
  }
}
`,-1)])),default:l(()=>[t("div",Se,[t("div",{class:"external-events w-flex column gap2",onDrop:e[26]||(e[26]=(...a)=>V.onEventDropInBank&&V.onEventDropInBank(...a)),onDragover:e[27]||(e[27]=oe(()=>{},["prevent"]))},[e[129]||(e[129]=t("div",{class:"title4 primary text-center"},"Ext. Events",-1)),(i(!0),d(u,null,K(V.events,(a,M)=>(i(),d("div",{class:"external-event",key:M,draggable:"true",onDragstart:Q=>V.onEventDragStart(Q,a)},[t("strong",Ae,g(a.title),1),t("div",Ne,"("+g((a._||{}).duration||a.duration?`${(a._||{}).duration||a.duration} min`:"no duration")+")",1)],40,Be))),128))],32),o(p(x),{class:"grow",ref_key:"exExternalEventsDragDropEl1",ref:B,onEventDrop:V.onEventDrop,"editable-events":"","views-bar":!1,views:{days:{cols:3,rows:1}},view:"days","time-from":540,"time-to":900,small:"","today-button":!1,dark:p(E).darkMode},null,8,["onEventDrop","dark"]),o(p(x),{class:"grow",ref_key:"exExternalEventsDragDropEl2",ref:$,onEventDrop:V.onEventDrop,"editable-events":"","views-bar":!1,views:{days:{cols:3,rows:1}},view:"days","time-from":540,"time-to":900,small:"","today-button":!1,dark:p(E).darkMode},null,8,["onEventDrop","dark"])])]),_:1}),o(T,{title:"Reject Event Drag & Drop or Resizing",anchor:"reject-event-dnd-or-resizing"},{desc:l(()=>[e[133]||(e[133]=t("p",null,[n("The drag & drop and resizing of events can be rejected by returning "),t("code",null,"false"),n(` from the
`),t("code",null,"event-drop"),n(", "),t("code",null,"event-resize"),n(" and "),t("code",null,"event-resize-end"),n(" event listeners.")],-1)),e[134]||(e[134]=t("p",null,`This is useful when you want to prevent an event from being moved or resized in certain conditions.
For example, you can reject the drop of an event on top of another event, or prevent an event from
being resized if it's too close to another event.
`,-1)),t("div",Fe,[o(b,{modelValue:y.preventOverlapOnDrop,"onUpdate:modelValue":e[28]||(e[28]=a=>y.preventOverlapOnDrop=a),"label-color":"base"},{default:l(()=>e[130]||(e[130]=[n("Prevent Event Overlap On Drop",-1)])),_:1,__:[130]},8,["modelValue"]),o(b,{modelValue:y.preventOverlapWhileResizing,"onUpdate:modelValue":e[29]||(e[29]=a=>y.preventOverlapWhileResizing=a),"label-color":"base"},{default:l(()=>e[131]||(e[131]=[n("Prevent Overlap WHILE Resizing",-1)])),_:1,__:[131]},8,["modelValue"]),o(b,{modelValue:y.preventOverlapAfterResizing,"onUpdate:modelValue":e[30]||(e[30]=a=>y.preventOverlapAfterResizing=a),"label-color":"base"},{default:l(()=>e[132]||(e[132]=[n("Prevent Overlap AFTER Resizing",-1)])),_:1,__:[132]},8,["modelValue"])])]),"code-html":l(()=>e[135]||(e[135]=[n(`<vue-cal
  :events="events"
  editable-events
  @event-drop="onEventDrop"
  @event-resize="onEventResize"
  @event-resize-end="onEventResizeEnd">
</vue-cal>`,-1)])),"code-js":l(()=>[e[136]||(e[136]=n(`const events = [
  {
    start: new Date(new Date().setHours(11, 0, 0, 0)),
    end: new Date(new Date().setHours(13, 0, 0, 0)),
    title: 'Event 1'
  },
  ...
]
`,-1)),y.preventOverlapOnDrop?(i(),d(u,{key:0},[n(`
const onEventDrop = ({ e, event, cell, overlaps }) => {
 return !overlaps.length
}
`)],64)):(i(),d(u,{key:1},[],64)),y.preventOverlapWhileResizing?(i(),d(u,{key:2},[n(`
const onEventResize = ({ e, event, overlaps }) => {
 return !overlaps.length
}
`)],64)):(i(),d(u,{key:3},[],64)),y.preventOverlapAfterResizing?(i(),d(u,{key:4},[n(`
const onEventResizeEnd = ({ e, event, overlaps }) => {
 return !overlaps.length
}
`)],64)):(i(),d(u,{key:5},[],64))]),default:l(()=>[o(p(x),{events:y.events,"editable-events":"",onEventDrop:y.onEventDrop,onEventResize:y.onEventResize,onEventResizeEnd:y.onEventResizeEnd,"time-from":540,"time-to":900,dark:p(E).darkMode,style:{height:"331px"}},null,8,["events","onEventDrop","onEventResize","onEventResizeEnd","dark"])]),_:1}),o(T,{title:"Events Reactivity",anchor:"events-reactivity"},{desc:l(()=>e[137]||(e[137]=[t("p",null,[n("The events are reactive and will update when the external data changes."),t("br"),n(`
For instance, in this example, the events are changing their background color every second from
the external array and the calendar will keep the events up to date.`),t("br"),n(`
Note that `),t("code",null,"backgroundColor"),n(` is a special event property that Vue Cal parses to apply to
the events.`)],-1),t("p",null,null,-1)])),"code-html":l(()=>e[138]||(e[138]=[n(`<vue-cal
  :events="events"
  editable-events
  @ready="onReady">
</vue-cal>`,-1)])),"code-js":l(()=>e[139]||(e[139]=[n(`const events = [
  {
    start: new Date(new Date().setHours(12, 30)),
    end: new Date(new Date().setHours(13, 30)),
    title: 'Event 1'
  },
  {
    start: new Date(new Date().setHours(11, 30)).addDays(1), // Using Vue Cal's Date prototypes.
    end: new Date(new Date().setHours(12, 30)).addDays(1), // Using Vue Cal's Date prototypes.
    title: 'Event 2'
  }
]
const colors = ['crimson', 'cornflowerblue', 'darkgreen', 'blueviolet', 'darkmagenta', 'teal']
const interval = null

const onReady = () => {
  // Mutate the event objects externally, Vue Cal keeps them reactive.
  interval = setInterval(() => {
    events[0].backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    events[1].backgroundColor = colors[Math.floor(Math.random() * colors.length)]
  }, 1000)
}
`,-1)])),"code-css":l(()=>e[140]||(e[140]=[n(`.vuecal__event {transition: background-color 1s;}
`,-1)])),default:l(()=>[o(p(x),{views:{days:{cols:3,rows:1}},view:"days","views-bar":!1,events:H.events,"editable-events":"",onReady:H.onReady,"time-from":540,"time-to":900,dark:p(E).darkMode},null,8,["events","onReady","dark"])]),_:1})],64)}}};export{Ye as default};
