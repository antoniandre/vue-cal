import{u as Z,x as T,i as v,h as X,G as _,a as i,c as d,d as o,w as l,b as n,f as t,e as p,y as Y,H as ee,A as te,p as U,F as u,t as g,I as S,j as J,z as ne,g as le,m as ae,r as k}from"./index-tKQo9wM6.js";import"./index-xMSaeq4U.js";import{_ as x}from"./index-BrB9lmwt.js";const oe={class:"no-bullet ml0"},se={class:"mt3"},re={class:"title3"},ie={class:"ml7"},de={class:"mt4"},ve={class:"title3"},ue={class:"mt4"},pe={class:"title3"},ge={class:"mt4"},me={class:"title3"},ce={class:"mt4"},we={class:"title3"},fe={class:"w-flex wrap gap3"},be={class:"w-flex justify-end gap2 mt2"},De={class:"w-flex align-center justify-end gap3 mt4 wrap"},ye={key:1},Ee={class:"w-flex justify-end mt2 gap2"},he={class:"w-flex mb3 justify-end"},ke={class:"w-flex align-start gap3 justify-end"},Ce={class:"w-flex gap2 d-iflex no-grow"},xe={class:"w-flex justify-end wrap gap2"},Ve=["innerHTML"],ze={class:"w-flex justify-space-between gap2 wrap mt4"},Te={class:"w-flex align-end no-grow gap1 mb1"},Me={class:"size--xs w-flex pa2 ova gap2 wrap bdrs2 bd1",style:{"min-height":"100px","background-color":"color-mix(in srgb, var(--w-base-color) 3%, transparent)"}},He={key:0,class:"w-flex column align-center justify-center"},Re={class:"bdrs2 bd1 w-flex column align-center justify-center pa1 no-grow blue--bg white"},Ie={class:"title3"},je={class:"size--xs"},Oe={class:"w-flex wrap gap3 justify-end mt8"},Ue={class:"w-flex mt4 wrap gap2 basis-zero"},Se=["onDragstart"],Be={class:"mr2"},Ae={class:"caption"},Ne={class:"w-flex wrap column gap3 align-end mt6"},Pe={__name:"calendar-events-interactions",setup(Fe){const E=Z(),K=X(()=>"/vue-cal/"),j=[{start:new Date(new Date().setHours(11,0)).subtractDays(2),end:new Date(new Date().setHours(13,0)).subtractDays(2),title:"Salsa Dance Class",content:'<i class="w-icon mdi mdi-dance-ballroom"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(12,30)),end:new Date(new Date().setHours(13,30)),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:new Date(new Date().setHours(11,30)).addDays(1),end:new Date(new Date().setHours(12,30)).addDays(1),title:"Dentist Appt.",content:'<i class="w-icon mdi mdi-tooth"></i>',class:"health",schedule:2},{start:new Date(new Date().setHours(13,0)).addDays(1),end:new Date(new Date().setHours(14,0)).addDays(1),title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(10,0)).addDays(3),end:new Date(new Date().setHours(11,30)).addDays(3),title:"Swimming Class",content:'<i class="w-icon mdi mdi-swim"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(11,35)).addDays(3),end:new Date(new Date().setHours(12,30)).addDays(3),title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-food-croissant"></i>',class:"leisure",schedule:1,background:!1},{start:new Date(new Date().setHours(9,0)).addDays(4),end:new Date(new Date().setHours(10,0)).addDays(4),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:new Date(new Date().setHours(11,30)).addDays(4),end:new Date(new Date().setHours(12,25)).addDays(4),title:"BK with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:new Date(new Date().setHours(12,30)).addDays(4),end:new Date(new Date().setHours(14,30)).addDays(4),title:"Movie Theater",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:new Date(new Date().setHours(11,30,21,0)).addDays(5),end:new Date(new Date().setHours(12,30,23,30)).addDays(5),title:"Movie Night",content:'<i class="w-icon mdi mdi-popcorn"></i>',class:"leisure",schedule:1},{start:new Date(new Date().setHours(10,0)).addDays(7),end:new Date(new Date().setHours(11,0)).addDays(7),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1}],B=v(null),s=T({createMethods:[{value:"event-create",label:"Click & Drag"},{value:"cell-dblclick",label:"Double Click"},{value:"cell-contextmenu",label:"Right Click"},{value:"cell-hold",label:"Click & Hold"}],createMethod:v("event-create"),createEvent:({e:r,event:e,cell:c,resolve:y,cursor:h,view:R})=>{r.preventDefault(),e={...e||{},title:"New Event! 🎉",start:(e==null?void 0:e.start)||h.date,end:(e==null?void 0:e.end)||h.date.addHours(1),class:"blue-event"},y=y||R.createEvent,s.skipCreationDialog?y(e):s.openCreationDialog({e:r,event:e,cell:c,resolve:y,cursor:h})},skipCreationDialog:v(!0),showCreationDialog:v(!1),snapToInterval:v(!1),eventCreateMinDrag:v(!1),resolve:null,events:v([]),newEvent:{title:"",background:!1,class:""},openCreationDialog:({event:r,resolve:e})=>{s.showCreationDialog=!0,s.newEvent=r,s.resolve=e},cancel:()=>{s.createMethod==="event-create"&&s.resolve(!1),s.showCreationDialog=!1},save:()=>{s.resolve(s.newEvent),s.showCreationDialog=!1}}),L=v(null),q=T({createEvent:()=>{L.value.view.createEvent({start:new Date,end:new Date().addHours(1),title:"New Event 🎉"})}}),w=T({events:[...j.map(r=>({...r}))],deleteEvent:({e:r,event:e})=>{W.value.view.deleteEvent(e._.id)},viewDate:new Date,editableEvents:v(!0),deleteMethod:v("dblclick"),deleteMethods:[{label:"dblclick"},{label:"hold"}],eventListeners:X(()=>{let r={"event-dblclick":e=>e.event.delete(w.skipDeleteButton?3:1)};return w.deleteMethod==="hold"&&(r={"event-hold":e=>e.event.delete(w.skipDeleteButton?3:1),"event-dblclick":()=>{}}),r}),skipDeleteButton:v(!1)}),W=v(null),m=T({events:[...j.map(r=>({...r})),{start:new Date(new Date().addDays(2).setHours(11,0,0,0)),end:new Date(new Date().addDays(2).setHours(13,0,0,0)),title:"Boring Event",content:'<i class="w-icon mdi mdi-cancel"></i><br>Can&rsquo;t drag, resize or delete me!',class:"blue-event",deletable:!1,resizable:!1,resizableX:!1,draggable:!1}],deletable:v(!1),resizable:v(!1),resizableX:v(!1),draggable:v(!1),creatable:v(!1)}),C=T({counter:1,events:v([{start:new Date,end:new Date().addHours(1),title:"Event 1"}]),onEventCreate:({event:r,resolve:e})=>e({...r,title:"Event "+ ++C.counter}),addEvent:()=>C.events.push({start:new Date,end:new Date().addHours(1),title:"Event "+ ++C.counter})}),f=T({events:j.map(r=>({...r})),onEventDrop:({e:r,event:e,cell:c,overlaps:y})=>!y.length||y.length&&f.overlappableEvents,draggableEvents:v(!0),overlappableEvents:v(!0)}),A=v(null),$=v(null),V=T({events:v([{id:1,title:"Ext. Event 1",duration:60},{id:2,title:"Ext. Event 2",duration:30},{id:3,title:"Ext. Event 3"}]),onEventDragStart:(r,e)=>{r.dataTransfer.setData("event",JSON.stringify(e)),r.dataTransfer.setData("cursor-grab-at",r.offsetY)},onEventDrop:({e:r,event:e,cell:c,overlaps:y,external:h})=>{if(h){const R=V.events.findIndex(O=>O.id===e.id);R>-1&&V.events.splice(R,1)}},onEventDropInBank:r=>{const e=JSON.parse(r.dataTransfer.getData("event")||"{}");V.events.push({...e,duration:e.end?(e.end-e.start)/6e4:60}),(document.querySelector(".vuecal--dragging-event").isSameNode(A.value.$el)?A:$).value.view.deleteEvent(e._.id,3)}}),D=T({events:j.map(r=>({...r})),preventOverlapOnDrop:v(!0),preventOverlapWhileResizing:v(!0),preventOverlapAfterResizing:v(!1),onEventDrop:({e:r,event:e,cell:c,overlaps:y})=>!y.length||y.length&&!D.preventOverlapOnDrop,onEventResize:({e:r,event:e,overlaps:c})=>!c.length||c.length&&!D.preventOverlapWhileResizing,onEventResizeEnd:({e:r,event:e,overlaps:c})=>!c.length||c.length&&!D.preventOverlapAfterResizing}),H=T({events:[{start:new Date(new Date().setHours(12,30)),end:new Date(new Date().setHours(13,30)),title:"Event 1"},{start:new Date(new Date().setHours(11,30)).addDays(1),end:new Date(new Date().setHours(12,30)).addDays(1),title:"Event 2"}],interval:null,onReady:()=>{H.interval=setInterval(()=>{const r=["crimson","cornflowerblue","darkgreen","blueviolet","darkmagenta","teal"];H.events[0].backgroundColor=r[Math.floor(Math.random()*r.length)],H.events[1].backgroundColor=r[Math.floor(Math.random()*r.length)]},1e3)}});return _(()=>{clearInterval(H.interval)}),(r,e)=>{const c=k("w-icon"),y=k("router-link"),h=k("alert"),R=k("w-image"),O=k("w-radios"),b=k("w-switch"),P=k("w-input"),I=k("w-button"),G=k("w-dialog"),z=k("example"),N=k("ssh-pre"),F=k("w-tooltip");return i(),d(u,null,[o(h,{class:"py3",info:""},{default:l(()=>[e[49]||(e[49]=n("p",{class:"mb2"},[t("The calendar allows you to interact with events in various ways."),n("br"),t(`
Here are some examples of how you can create, edit, delete, and drag & drop events.
`)],-1)),e[50]||(e[50]=n("p",{class:"text-bold mt4"},"There are 5 types of event interactions:",-1)),n("ul",oe,[n("li",se,[n("div",re,[o(c,{class:"mr2 success",md:""},{default:l(()=>[...e[32]||(e[32]=[t("wi-check",-1)])]),_:1}),e[33]||(e[33]=t("Read",-1))]),n("p",ie,[e[35]||(e[35]=t(`The events are displayed on the calendar and can show more details, usually on click,
like seen in the `,-1)),o(y,{to:"/examples/calendar-events--display#ex--open-dialog-on-event-click"},{default:l(()=>[...e[34]||(e[34]=[t("Open Dialog on Event Click",-1)])]),_:1}),e[36]||(e[36]=t(" example.",-1))])]),n("li",de,[n("div",ve,[o(c,{class:"mr2 success",md:""},{default:l(()=>[...e[37]||(e[37]=[t("wi-check",-1)])]),_:1}),e[38]||(e[38]=t("Create",-1))]),e[39]||(e[39]=n("p",{class:"ml7"},"Create an event by clicking and dragging on a cell, by default.",-1))]),n("li",ue,[n("div",pe,[o(c,{class:"mr2 success",md:""},{default:l(()=>[...e[40]||(e[40]=[t("wi-check",-1)])]),_:1}),e[41]||(e[41]=t("Delete",-1))]),e[42]||(e[42]=n("p",{class:"ml7"},"Delete an event by double clicking on it, by default.",-1))]),n("li",ge,[n("div",me,[o(c,{class:"mr2 success",md:""},{default:l(()=>[...e[43]||(e[43]=[t("wi-check",-1)])]),_:1}),e[44]||(e[44]=t("Resize",-1))]),e[45]||(e[45]=n("p",{class:"ml7"},"Resize an event by dragging its resizer handle.",-1))]),n("li",ce,[n("div",we,[o(c,{class:"mr2 success",md:""},{default:l(()=>[...e[46]||(e[46]=[t("wi-check",-1)])]),_:1}),e[47]||(e[47]=t("Drag",-1))]),e[48]||(e[48]=n("p",{class:"ml7"},"Drag and drop an event onto any cell that is not disabled.",-1))])])]),_:1}),o(z,{ref_key:"exCreateEventsExampleEl",ref:B,title:"Create Events",anchor:"create-events"},{desc:l(()=>[n("div",fe,[e[51]||(e[51]=n("div",{class:"grow xs7"},[n("p",null,[t("Events can be created in various ways: programmatically or through user interaction with a calendar cell."),n("br"),t(`
The default interaction is a click and drag gesture, but you can define the type of interaction you
want.`),n("br"),t(`
The event creation can then be completed by an edition dialog box or not.`)]),n("p",{class:"mt3"},[t("With the "),n("code",null,"snapToInterval"),t(` option, you can make sure the event starts and ends at specific
intervals of minutes.`),n("br"),t(`
E.g. `),n("code",null,':snap-to-interval="15"'),t(" will snap the event to the closest "),n("code",null,":00"),t(", "),n("code",null,":15"),t(`,
`),n("code",null,":30"),t(", "),n("code",null,":45"),t(" while dragging."),n("br"),t(`
This option also applies on event resizing after the drag-creation.`)]),n("p",{class:"mt3"},[t("With the "),n("code",null,"eventCreateMinDrag"),t(` option, you can define the minimum drag distance in pixels
before the event creation starts. This can be useful to prevent accidental event creation when
navigating the calendar.
`)])],-1)),o(R,{class:"bd1 bdrs2 sh2",src:`${K.value}images/click-and-drag.webp`,alt:"Create Events",width:"250",lazy:""},null,8,["src"])]),o(h,null,{default:l(()=>[...e[52]||(e[52]=[t("The event creation is only available on a day cell: not on year & years views.",-1)])]),_:1}),n("div",be,[e[54]||(e[54]=n("label",null,"Create Event On Cell",-1)),n("div",null,[o(O,{modelValue:s.createMethod,"onUpdate:modelValue":[e[0]||(e[0]=a=>s.createMethod=a),(B.value||{}).refreshHeight],items:s.createMethods},null,8,["modelValue","onUpdate:modelValue","items"]),e[53]||(e[53]=n("p",{class:"caption mt1"},"(Or however you want)",-1))])]),n("div",De,[o(b,{modelValue:s.skipCreationDialog,"onUpdate:modelValue":[e[1]||(e[1]=a=>s.skipCreationDialog=a),(B.value||{}).refreshHeight]},{default:l(()=>[...e[55]||(e[55]=[t("Skip Creation Dialog",-1)])]),_:1},8,["modelValue","onUpdate:modelValue"]),o(b,{modelValue:s.snapToInterval,"onUpdate:modelValue":e[2]||(e[2]=a=>s.snapToInterval=a)},{default:l(()=>[...e[56]||(e[56]=[t("Snap to Interval: ",-1),n("span",{class:"code transparent--bg inherit"},"15min",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:s.eventCreateMinDrag,"onUpdate:modelValue":e[3]||(e[3]=a=>s.eventCreateMinDrag=a)},{default:l(()=>[...e[57]||(e[57]=[t("Event Create Drag Min: ",-1),n("span",{class:"code transparent--bg inherit"},"15px",-1)])]),_:1},8,["modelValue"])])]),"code-html":l(()=>[t(`<vue-cal
  `+g(s.snapToInterval?`:snap-to-interval="15"
  `:"")+g(s.eventCreateMinDrag?`:event-create-min-drag="15"
  `:"")+g(s.createMethod==="event-create"?"editable-events":':editable-events="{ edit: true, resize: true, create: false, delete: true }"')+`
  @`+g(s.createMethod)+`="createEvent">
</vue-cal>`,1),s.skipCreationDialog?(i(),d("span",ye)):(i(),d(u,{key:0},[t(`

<!-- Using Wave UI - https://antoniandre.github.io/wave-ui -->
<w-dialog
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
</w-dialog>`)],64))]),"code-js":l(()=>[s.createMethod==="event-create"&&s.skipCreationDialog?(i(),d(u,{key:0},[t(`const createEvent = ({ event, resolve }) => {
  resolve({
    ...event,
    title: 'New Event! 🎉'
  })
}
`)],64)):s.createMethod==="event-create"?(i(),d(u,{key:1},[t(`const createEvent = ({ event, resolve }) => {
  openCreationDialog({ event, resolve })
}
`)],64)):s.createMethod!=="event-create"&&s.skipCreationDialog?(i(),d(u,{key:2},[t(`const createEvent = ({ cursor, view }) => {
  view.createEvent({
    start: cursor.date,
    end: cursor.date.addHours(1), // Uses Vue Cal's Date prototypes.
    title: 'New Event'
  })
}`)],64)):s.createMethod!=="event-create"?(i(),d(u,{key:3},[t(`const createEvent = ({ cursor, view }) => {
  openCreationDialog({ cursor, view })
}`)],64)):(i(),d(u,{key:4},[],64)),s.skipCreationDialog?(i(),d(u,{key:6},[],64)):(i(),d(u,{key:5},[e[58]||(e[58]=t(`
const showCreationDialog = ref(false)
const createEventFn = ref(null)`,-1)),s.createMethod!=="event-create"?(i(),d(u,{key:0},[t("const cursorDate = ref(null)")],64)):U("",!0),e[59]||(e[59]=t(`const newEvent = ref({
  title: '',
  background: false,
  class: ''
})
`,-1)),s.createMethod==="event-create"?(i(),d(u,{key:1},[t(`const openCreationDialog = ({ event, resolve }) => {
  showCreationDialog.value = true
  newEvent.value = event
  createEventFn.value = resolve
}`)],64)):(i(),d(u,{key:2},[t(`const openCreationDialog = ({ cursor, view }) => {
  showCreationDialog.value = true
  cursorDate.value = cursor.date
  createEventFn.value = view.createEvent
}`)],64)),e[60]||(e[60]=t(`
const cancelCreation = () => {`,-1)),s.createMethod==="event-create"?(i(),d(u,{key:3},[t(`
  createEventFn.value(false)`)],64)):U("",!0),e[61]||(e[61]=t(`
  showCreationDialog.value = false
}

const validateCreation = () => {`,-1)),s.createMethod!=="event-create"?(i(),d(u,{key:4},[t(`
  createEventFn.value({
    ...newEvent.value,
    start: cursorDate.value,
    end: cursorDate.value.addHours(1) // Uses Vue Cal's Date prototypes.
  })`)],64)):(i(),d(u,{key:5},[t(`
  createEventFn.value(newEvent.value)`)],64)),e[62]||(e[62]=t(`
  showCreationDialog.value = false
}`,-1))],64))]),default:l(()=>[o(p(x),Y({"editable-events":{edit:!0,resize:!0,create:s.createMethod==="event-create",delete:!0}},{[ee(s.createMethod)]:s.createEvent},{events:s.events,"snap-to-interval":s.snapToInterval?15:0,"event-create-min-drag":s.eventCreateMinDrag?15:0,"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode}),null,16,["editable-events","events","snap-to-interval","event-create-min-drag","dark"]),s.newEvent?(i(),te(G,{key:0,modelValue:s.showCreationDialog,"onUpdate:modelValue":e[7]||(e[7]=a=>s.showCreationDialog=a),width:"300",onClose:s.cancel},{default:l(()=>[o(P,{modelValue:s.newEvent.title,"onUpdate:modelValue":e[4]||(e[4]=a=>s.newEvent.title=a)},{default:l(()=>[...e[63]||(e[63]=[t("Event Title",-1)])]),_:1},8,["modelValue"]),o(P,{class:"my4",modelValue:s.newEvent.class,"onUpdate:modelValue":e[5]||(e[5]=a=>s.newEvent.class=a)},{default:l(()=>[...e[64]||(e[64]=[t("Event Class",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:s.newEvent.background,"onUpdate:modelValue":e[6]||(e[6]=a=>s.newEvent.background=a)},{default:l(()=>[...e[65]||(e[65]=[t("Background",-1)])]),_:1},8,["modelValue"]),n("div",Ee,[o(I,{onClick:s.cancel},{default:l(()=>[...e[66]||(e[66]=[t("Cancel",-1)])]),_:1},8,["onClick"]),o(I,{onClick:s.save},{default:l(()=>[...e[67]||(e[67]=[t("OK",-1)])]),_:1},8,["onClick"])])]),_:1},8,["modelValue","onClose"])):U("",!0)]),_:1},512),o(z,{title:"Create Events Programmatically",anchor:"create-events-programmatically"},{desc:l(()=>[e[70]||(e[70]=n("p",{class:"my2"},[t(`In order to create events programmatically, from an external button for instance, you need to call
the vue-cal `),n("code",null,"view.createEvent()"),t(" function from a Vue ref.")],-1)),n("div",he,[o(I,{sm:"",onClick:q.createEvent},{default:l(()=>[o(c,{class:"mr1"},{default:l(()=>[...e[68]||(e[68]=[t("mdi mdi-plus",-1)])]),_:1}),e[69]||(e[69]=t("Create Event",-1))]),_:1},8,["onClick"])])]),"code-html":l(()=>[...e[71]||(e[71]=[t(`<button @click="createEvent">Create Event</button>

<vue-cal
  ref="vuecalRef"
  editable-events>
</vue-cal>
`,-1)])]),"code-js":l(()=>[...e[72]||(e[72]=[t(`const vuecalRef = ref(null)

const createEvent = () => {
  vuecalRef.value.view.createEvent({
    start: new Date(),
    end: new Date().addHours(1), // Using Vue Cal's Date prototypes.
    title: 'New Event 🎉'
  })
}`,-1)])]),default:l(()=>[o(p(x),{ref_key:"exExternalEventCreateVuecalRef",ref:L,"editable-events":"",onReady:e[8]||(e[8]=({view:a})=>a.scrollToCurrentTime()),onEventCreated:e[9]||(e[9]=a=>a._.$el.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"})),views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode},null,8,["dark"])]),_:1}),o(z,{title:"Delete Events",anchor:"delete-events"},{desc:l(()=>[e[80]||(e[80]=n("h4",{class:"mt4 mb0"},"A. Deletion Rules",-1)),e[81]||(e[81]=n("p",{class:"mb2"},[t("The deletion of events is allowed or denied when the "),n("code",null,"editable-events"),t(` option is set to
`),n("code",null,"true"),t(" or "),n("code",null,"false"),t(" - or more granularly "),n("code",null,"editable-events.delete"),t(`, when
`),n("code",null,"editable-events"),t(" is provided as an object:")],-1)),o(N,{language:"js",dark:p(E).darkMode},{default:l(()=>[...e[73]||(e[73]=[t("{ drag: true, resize: true, delete: true, create: true }",-1)])]),_:1},8,["dark"]),o(h,null,{default:l(()=>[...e[74]||(e[74]=[t(`In addition to the global settings, you can override the deletion ability individually for each
event using the event attributes `,-1),n("code",null,"deletable: false",-1),t(`.
`,-1)])]),_:1}),e[82]||(e[82]=n("h4",{class:"mt4 mb0"},"B. Default Behavior & Flexibility",-1)),e[83]||(e[83]=n("p",null,[t("The deletion of an event is straightforward and extremely flexible."),n("br"),t(`
By default it is triggered by a double click/tap on the event, which displays a delete button.
On click/tap on this button, the event is deleted.`),n("br"),t(`
This gesture has the advantage of not interfering with the single click/tap event, which can be
used for other actions, and not interfering with the drag & drop gesture.
`)],-1)),e[84]||(e[84]=n("p",{class:"mt4"},"You can easily override this behavior by:",-1)),e[85]||(e[85]=n("ol",{class:"ml4"},[n("li",null,[t("Resetting the double-click event, only with "),n("code",null,'@double-click="false"'),t(`, or use
`),n("code",null,"@double-click"),t(" for another action.")]),n("li",null,[t("Optionally assigning a different interaction for the deletion with: "),n("code",null,'@event-xxx="$event.delete"'),t(`,
where `),n("code",null,"xxx"),t(" can be replaced with "),n("code",null,"click"),t(", "),n("code",null,"hold"),t(", "),n("code",null,"contextmenu"),t(`, or whatever
valid event you want.`),n("br")])],-1)),e[86]||(e[86]=n("h4",{class:"mt4 mb0"},"C. The Delete Function",-1)),n("div",null,[e[76]||(e[76]=t("Every event has a delete function that you can call from the event object itself:",-1)),o(N,{class:"d-iblock pr5 py0 ml1 mb0",language:"js",dark:p(E).darkMode},{default:l(()=>[...e[75]||(e[75]=[t("event.delete()",-1)])]),_:1},8,["dark"])]),e[87]||(e[87]=n("p",null,`For more flexibility, this function can receive an explicit "deletion stage" integer parameter,
so you can skip to the stage you want directly:`,-1)),e[88]||(e[88]=n("ul",null,[n("li",null,[n("code",null,"1"),t(`: The delete button will appear. On click, the event is deleted directly in the global
events array (source of truth) and visually from the cell.`)]),n("li",null,[n("code",null,"2"),t(":"),n("span",{class:"ml1"},[t(`The event is deleted visually from the cell but not in the global events array (source of truth) yet.
This has the advantage of not triggering an immediate Vue reactivity update cascade on all the
cells.`),n("br"),t(`
The rerendering cascade of the cells is completely avoided by deleting the event on the next view
change, when the cell is unmounted.`),n("br"),t(`
even though this stage is more optimized than the stage `),n("code",null,"3"),t(`, it can be non-obvious or confusing
for the developer that the event is still in the array at this stage until the view changes.
Especially if you use a v-model on the events. For this reason, the stage `),n("code",null,"3"),t(` is the default
behavior from the delete button.`)])]),n("li",null,[n("code",null,"3"),t(`: The event is deleted both visually and in the source of truth (automatically called on
cell unmount after using stage `),n("code",null,"2"),t(").")])],-1)),e[89]||(e[89]=n("p",{class:"mt4"},[t("For more flexibility, there is also a "),n("code",null,"view.deleteEvent(eventId, stage)"),t(" function:")],-1)),e[90]||(e[90]=n("ul",null,[n("li",null,[t("Which takes two arguments: the internal ID of the event (found in "),n("code",null,"event._.id"),t(') to delete and a "deletion stage" integer just as described.')]),n("li",null,[t("Can also delete an event by a specific custom event property, like "),n("code",null,"event.id"),t(" or "),n("code",null,"event.doctorId"),t(", etc. by passing a key-value pair as an object in the first argument. E.g. "),n("code",null,"view.deleteEvent({ id: 1 }, 3)"),t(".")])],-1)),e[91]||(e[91]=n("p",{class:"mt6"},"Now let's view all this in action!",-1)),n("div",ke,[o(b,{class:"no-grow",modelValue:w.editableEvents,"onUpdate:modelValue":e[10]||(e[10]=a=>w.editableEvents=a),"label-color":"base"},{default:l(()=>[...e[77]||(e[77]=[t("Editable Events",-1)])]),_:1},8,["modelValue"]),o(b,{class:"no-grow",modelValue:w.skipDeleteButton,"onUpdate:modelValue":e[11]||(e[11]=a=>w.skipDeleteButton=a),"label-color":"base"},{default:l(()=>[...e[78]||(e[78]=[t("Skip Delete Button",-1)])]),_:1},8,["modelValue"]),n("div",Ce,[e[79]||(e[79]=n("span",null,"Delete on:",-1)),o(O,{modelValue:w.deleteMethod,"onUpdate:modelValue":e[12]||(e[12]=a=>w.deleteMethod=a),items:w.deleteMethods,"label-color":"base"},null,8,["modelValue","items"])])])]),"code-html":l(()=>[t(`<vue-cal
  `+g(w.editableEvents?"editable-events":':editable-events="false"')+" "+g(w.deleteMethod==="hold"?`
  @event-dblclick="false"
  @event-hold="$event.delete${w.skipDeleteButton?"(3)":""}"`:`${w.skipDeleteButton?`
  @event-dblclick="$event.delete(3)"`:""}`)+`
  :events="events">
</vue-cal>
`,1)]),default:l(()=>[o(p(x),Y({events:w.events,"editable-events":w.editableEvents},S(w.eventListeners),{onEventDelete:e[13]||(e[13]=a=>console.log("Event deleted!",a)),"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","view-date":w.viewDate,"views-bar":!1,dark:p(E).darkMode}),null,16,["events","editable-events","view-date","dark"])]),_:1}),o(z,{title:"Edit Events",anchor:"edit-events"},{desc:l(()=>[e[99]||(e[99]=n("p",{class:"mb2"},[t("Editing events is allowed or denied when the "),n("code",null,"editable-events"),t(` option is set to
`),n("code",null,"true"),t(" or "),n("code",null,"false"),t(". But more granularly, "),n("code",null,"editable-events"),t(` can be provided
as an object:`)],-1)),o(N,{language:"js",dark:p(E).darkMode},{default:l(()=>[...e[92]||(e[92]=[t("{ create: true, resize: true, drag: true, delete: true }",-1)])]),_:1},8,["dark"]),e[100]||(e[100]=n("p",null,"With:",-1)),e[101]||(e[101]=n("ul",null,[n("li",null,[n("strong",{class:"code"},"create"),t(": Create a new event (by clicking and dragging by default).")]),n("li",null,[n("strong",{class:"code"},"resize"),t(`: Resize an event by dragging the resizer handle.
`),n("strong",null,"Not available if no timeline, not allowed on background events.")]),n("li",null,[n("strong",{class:"code"},"resizeX"),t(`: Allow horizontal resizing of an event by dragging the resizer handle.
This converts to adding or removing days to the event and possibly switch from a single day event
to a multi-day event and vice versa.
`),n("strong",null,"Not available if no timeline, not allowed on background events.")]),n("li",null,[n("strong",{class:"code"},"drag"),t(": Drag & drop an event (not allowed on background events).")]),n("li",null,[n("strong",{class:"code"},"delete"),t(": Delete an event (by double clicking an event by default).")])],-1)),o(h,null,{default:l(()=>[...e[93]||(e[93]=[t(`In addition to the global settings, you can override these actions individually for each
event using the event attributes, `,-1),n("code",null,"deletable: false",-1),t(", ",-1),n("code",null,"draggable: false",-1),t(` &
`,-1),n("code",null,"resizable: false",-1),t(`.
`,-1)])]),_:1}),n("div",xe,[o(b,{modelValue:m.creatable,"onUpdate:modelValue":e[14]||(e[14]=a=>m.creatable=a)},{default:l(()=>[...e[94]||(e[94]=[t("Create Events",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:m.resizable,"onUpdate:modelValue":e[15]||(e[15]=a=>m.resizable=a)},{default:l(()=>[...e[95]||(e[95]=[t("Resize Events",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:m.resizableX,"onUpdate:modelValue":e[16]||(e[16]=a=>m.resizableX=a)},{default:l(()=>[...e[96]||(e[96]=[t("Resize Events horizontally",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:m.draggable,"onUpdate:modelValue":e[17]||(e[17]=a=>m.draggable=a)},{default:l(()=>[...e[97]||(e[97]=[t("Drag Events",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:m.deletable,"onUpdate:modelValue":e[18]||(e[18]=a=>m.deletable=a)},{default:l(()=>[...e[98]||(e[98]=[t("Delete Events",-1)])]),_:1},8,["modelValue"])])]),"code-html":l(()=>[t(`<vue-cal
  :editable-events="{ create: `+g(m.creatable?"true":"false")+", resize: "+g(m.resizable?"true":"false")+", resizeX: "+g(m.resizableX?"true":"false")+",  drag: "+g(m.draggable?"true":"false")+", delete: "+g(m.deletable?"true":"false")+` }"
  :events="events">
</vue-cal>`,1)]),"code-js":l(()=>[...e[102]||(e[102]=[t(`const events = [
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
`,-1)])]),default:l(()=>[o(p(x),{ref_key:"exEditEventsVuecalRef",ref:W,"editable-events":{create:m.creatable,resize:m.resizable,resizeX:m.resizableX,drag:m.draggable,delete:m.deletable},events:m.events,"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode},{event:l(({event:a})=>[n("strong",null,g(a.title),1),n("p",null,g(a.start.formatTime())+" - "+g(a.end.formatTime()),1),n("p",{innerHTML:a.content},null,8,Ve)]),_:1},8,["editable-events","events","dark"])]),_:1}),o(z,{title:"Events v-model",anchor:"events-v-model"},{desc:l(()=>[e[110]||(e[110]=n("p",null,[t(`The good news is that the events prop is a two-way binding! So you can use it to read or write with
`),n("code",null,"v-model:events"),t("! But...")],-1)),o(h,{class:"mb4",tip:""},{default:l(()=>[...e[103]||(e[103]=[n("div",{class:"title4 mt-1"},"With great powers comes great responsibility",-1),n("p",null,[t("Be aware that modifying the array of events externally will always override the internal array."),n("br"),t(`
So you must be sure to save the changes that were made to events through the Vue Cal UI, or they
will be lost.
`)],-1)])]),_:1}),e[111]||(e[111]=n("p",{class:"mb2"},[t(`In this example, you can add or remove events from the array of events and they will be displayed in the
box below. You can also create events in the calendar with a click and drag, and resize or drag and drop
them.`),n("br"),t(`
The events in the list will accurately display the updated start and end times.`)],-1)),n("div",ze,[e[108]||(e[108]=n("div",{class:"title4"},"Current List of Events",-1)),n("div",Te,[o(I,{onClick:C.addEvent},{default:l(()=>[o(c,{class:"mr2"},{default:l(()=>[...e[104]||(e[104]=[t("mdi mdi-plus",-1)])]),_:1}),e[105]||(e[105]=t("Add Event",-1))]),_:1},8,["onClick"]),o(I,{onClick:e[19]||(e[19]=a=>C.events.pop())},{default:l(()=>[o(c,{class:"mr2"},{default:l(()=>[...e[106]||(e[106]=[t("mdi mdi-trash-can-outline",-1)])]),_:1}),e[107]||(e[107]=t("Remove Last Event",-1))]),_:1})])]),n("div",Me,[C.events.length?U("",!0):(i(),d("div",He,[...e[109]||(e[109]=[n("div",{class:"caption"},"No events yet.",-1)])])),(i(!0),d(u,null,J(C.events,a=>(i(),d("div",Re,[n("div",Ie,g(a.title),1),n("div",je,g(a.start.formatTime())+" - "+g(a.end.formatTime()),1)]))),256))])]),"code-html":l(()=>[...e[112]||(e[112]=[t(`<button
  @click="events.push({
    start: new Date(),
    end: new Date().addHours(1), // Using Vue Cal's Date prototypes.
    title: 'Event 1'
  })">Add Event</button>
<button @click="events.pop()">Remove last event</button>

<vue-cal v-model:events="events" />`,-1)])]),"code-js":l(()=>[...e[113]||(e[113]=[t(`const events = [
  {
    start: new Date(new Date().setHours(9, 0, 0, 0)),
    end: new Date(new Date().setHours(10, 0, 0, 0)),
    title: 'Event 1'
  },
  ...
]`,-1)])]),default:l(()=>[o(p(x),{ref:"exEventsVModelVuecalRef",events:C.events,"onUpdate:events":e[20]||(e[20]=a=>C.events=a),"editable-events":"",onReady:e[21]||(e[21]=({view:a})=>a.scrollToCurrentTime()),onEventCreate:C.onEventCreate,onEventDblclick:e[22]||(e[22]=({event:a})=>a.delete(2)),views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode},null,8,["events","onEventCreate","editable-events","dark"])]),_:1}),o(z,{title:"Event Drag & Drop",anchor:"drag-and-drop"},ne({desc:l(()=>[e[122]||(e[122]=n("div",{class:"todo-tag d-iflex"},"FINISH THIS EXAMPLE - DISABLE A DAY",-1)),e[123]||(e[123]=n("p",null,[t(`The drag & drop functionality is available for single-day foreground events only and is powered by
the native HTML5 drag & drop API (widely supports touch devices).`),n("br"),t(`
It allows you to move an event from one cell to another, or from an external source to the calendar
and vice-versa.`)],-1)),e[124]||(e[124]=n("div",{class:"title5 mt4"},"Good to Know:",-1)),e[125]||(e[125]=n("ul",null,[n("li",{class:"mt2"},[t("The drag & drop feature is enabled with "),n("code",null,"editable-events"),t(` set to true, but you can specifically
disable it by setting the `),n("code",null,"editable-events.drag"),t(" option to "),n("code",null,"false"),t("."),n("br"),t(`
You can also disable it for a specific event by setting the `),n("code",null,"draggable"),t(" attribute to "),n("code",null,"false"),t(`.
`)]),n("li",{class:"mt2"},[t("While dragging an event, the clone at cursor receives the "),n("code",null,".vuecal__event--dragging-ghost"),t(` CSS
class, while the original event receives the `),n("code",null,".vuecal__event--dragging-original"),t(` CSS class (the
original is hidden by default while dragging). You can override these styles with your own CSS.`)]),n("li",null,[t(`By default, when you drop the event it will start exactly where you dropped it,
but if you prefer you can use the `),n("code",null,"snapToInterval"),t(` option to dictate where it should
snap to (refer to `),n("code",null,"snapToInterval"),t(" in the "),n("a",{href:"#api"},"API section"),t(")."),n("br"),t(`
If you wonder why it does not represent the snapping while dragging, it's not possible to do it with
the native HTML5 drag & drop.
`)])],-1)),o(h,null,{default:l(()=>[...e[114]||(e[114]=[n("p",null,[t("If you listen for the "),n("code",null,"event-drop"),t(" event, you will receive an object with the following:")],-1),n("ul",null,[n("li",null,[n("code",null,"event"),t(": The event object that was dropped (contains the date and schedule where it was dropped).")]),n("li",null,[n("code",null,"cell"),t(": The cell object where the event was dropped.")]),n("li",null,[n("code",null,"e"),t(": The JavaScript native event object.")]),n("li",null,[n("code",null,"overlaps"),t(": An array of events that overlap the dropped event.")])],-1),n("p",null,[t("From the same event listener, you can "),n("strong",null,[t("reject the drop by returning "),n("code",null,"false")]),t(".")],-1)])]),_:1}),n("div",Oe,[o(b,{modelValue:f.draggableEvents,"onUpdate:modelValue":e[23]||(e[23]=a=>f.draggableEvents=a),"label-color":"base"},{default:l(()=>[...e[115]||(e[115]=[t("Draggable Events",-1)])]),_:1},8,["modelValue"]),o(F,{"align-right":""},{activator:l(({on:a})=>[n("div",S(a,!0),[o(b,{modelValue:f.overlappableEvents,"onUpdate:modelValue":e[24]||(e[24]=M=>f.overlappableEvents=M),"label-color":"base"},{default:l(()=>[...e[116]||(e[116]=[t("Overlappable Events",-1)])]),_:1},8,["modelValue"])],16)]),default:l(()=>[e[117]||(e[117]=t("Allow dropping events on top of other events",-1))]),_:1}),o(F,{"align-right":""},{activator:l(({on:a})=>[n("div",S(a,!0),[o(b,{modelValue:f.snapToInterval,"onUpdate:modelValue":e[25]||(e[25]=M=>f.snapToInterval=M),"label-color":"base"},{default:l(()=>[...e[118]||(e[118]=[t("Snap to Interval",-1)])]),_:1},8,["modelValue"])],16)]),default:l(()=>[e[119]||(e[119]=t("Snap the event to the closest round hour when dropped or resized",-1))]),_:1}),o(F,{"align-right":""},{activator:l(({on:a})=>[n("div",S(a,!0),[o(b,{modelValue:f.overrideDragCss,"onUpdate:modelValue":e[26]||(e[26]=M=>f.overrideDragCss=M),"label-color":"base"},{default:l(()=>[...e[120]||(e[120]=[t("Override Draggable CSS",-1)])]),_:1},8,["modelValue"])],16)]),default:l(()=>[e[121]||(e[121]=t("Override the default event dragging CSS styles",-1))]),_:1})])]),"code-html":l(()=>[t(`<vue-cal
  :events="events"
  :editable-events="{ drag: `+g(f.draggableEvents?"true":"false")+` }"
  `+g(f.snapToInterval?`:snap-to-interval="60"
  `:"")+`@event-drop="onEventDrop"
  :schedules="schedules">
</vue-cal>`,1)]),"code-js":l(()=>[e[126]||(e[126]=t(`const schedules = [{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]
`,-1)),f.overlappableEvents?(i(),d(u,{key:0},[t(`
const onEventDrop = ({ e, event, cell }) => {
  console.log('Event dropped!', event, cell)
  // Return false to reject the drop.
}`)],64)):(i(),d(u,{key:1},[t(`
const onEventDrop = ({ e, event, cell, overlaps }) => !overlaps.length

`)],64))]),default:l(()=>[o(p(x),{events:f.events,"editable-events":{drag:f.draggableEvents},onEventDrop:f.onEventDrop,schedules:[{id:1,label:"Dr 1"},{id:2,label:"Dr 2"}],"time-from":540,"time-to":900,"snap-to-interval":f.snapToInterval?60:0,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode,class:le({"override-drag-css":f.overrideDragCss}),style:{height:"327px"}},null,8,["events","editable-events","onEventDrop","snap-to-interval","dark","class"])]),_:2},[f.overrideDragCss?{name:"code-css",fn:l(()=>[e[127]||(e[127]=t(`.vuecal__event--dragging-ghost {
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
`,-1))]),key:"0"}:void 0]),1024),o(z,{title:"External Events Drag & Drop",anchor:"external-events-drag-and-drop"},{desc:l(()=>[e[129]||(e[129]=n("p",{class:"mb2"},[t("You can drag & drop events from an external source as long as they are HTML5 draggable (this will change when touch devices are supported)."),n("br"),t(`
It is also possible to move an event from one calendar to another.`),n("br"),n("br"),t(`
In the external event, you can set a `),n("code",null,"duration"),t(" property: it will be used to set the duration of the event when dropped in Vue Cal."),n("br"),t(`
If the `),n("code",null,"duration"),t(" is missing, the default duration will be equal to the time interval."),n("br"),t(`
Once the event is dropped into Vue Cal, it will be removed from the external source and its duration will be calculated in `),n("code",null,"event._.duration"),t(`.
`)],-1)),o(h,{tip:""},{default:l(()=>[...e[128]||(e[128]=[n("strong",null,"Important note when dragging external events into Vue Cal:",-1),n("div",null,[t(`It's important to understand that the native HTML5 drag & drop, does not move an element from its
source to the destination. It only creates a copy of the element that you drag.`),n("br"),t(`
When you drop a DOM element to another location, you have to code the actual move yourself:
delete from source and create in destination.`),n("br"),t(`
Learn how in the example source code below!`)],-1)])]),_:1}),e[130]||(e[130]=n("p",null,"In this example, you can drag the external events into the calendar and vice-versa.",-1))]),"code-html":l(()=>[...e[131]||(e[131]=[t(`<div
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
`,-1)])]),"code-js":l(()=>[...e[132]||(e[132]=[t(`export default {
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
`,-1)])]),default:l(()=>[n("div",Ue,[n("div",{class:"external-events w-flex column gap2",onDrop:e[27]||(e[27]=(...a)=>V.onEventDropInBank&&V.onEventDropInBank(...a)),onDragover:e[28]||(e[28]=ae(()=>{},["prevent"]))},[e[133]||(e[133]=n("div",{class:"title4 primary text-center"},"Ext. Events",-1)),(i(!0),d(u,null,J(V.events,(a,M)=>(i(),d("div",{class:"external-event",key:M,draggable:"true",onDragstart:Q=>V.onEventDragStart(Q,a)},[n("strong",Be,g(a.title),1),n("div",Ae,"("+g((a._||{}).duration||a.duration?`${(a._||{}).duration||a.duration} min`:"no duration")+")",1)],40,Se))),128))],32),o(p(x),{class:"grow",ref_key:"exExternalEventsDragDropEl1",ref:A,onEventDrop:V.onEventDrop,"editable-events":"","views-bar":!1,views:{days:{cols:3,rows:1}},view:"days","time-from":540,"time-to":900,"today-button":!1,dark:p(E).darkMode},null,8,["onEventDrop","dark"]),o(p(x),{class:"grow",ref_key:"exExternalEventsDragDropEl2",ref:$,onEventDrop:V.onEventDrop,"editable-events":"","views-bar":!1,views:{days:{cols:3,rows:1}},view:"days","time-from":540,"time-to":900,"today-button":!1,dark:p(E).darkMode},null,8,["onEventDrop","dark"])])]),_:1}),o(z,{title:"Reject Event Drag & Drop or Resizing",anchor:"reject-event-dnd-or-resizing"},{desc:l(()=>[e[137]||(e[137]=n("p",null,[t("The drag & drop and resizing of events can be rejected by returning "),n("code",null,"false"),t(` from the
`),n("code",null,"event-drop"),t(", "),n("code",null,"event-resize"),t(" and "),n("code",null,"event-resize-end"),t(" event listeners.")],-1)),e[138]||(e[138]=n("p",null,`This is useful when you want to prevent an event from being moved or resized in certain conditions.
For example, you can reject the drop of an event on top of another event, or prevent an event from
being resized if it's too close to another event.
`,-1)),n("div",Ne,[o(b,{modelValue:D.preventOverlapOnDrop,"onUpdate:modelValue":e[29]||(e[29]=a=>D.preventOverlapOnDrop=a),"label-color":"base"},{default:l(()=>[...e[134]||(e[134]=[t("Prevent Event Overlap On Drop",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:D.preventOverlapWhileResizing,"onUpdate:modelValue":e[30]||(e[30]=a=>D.preventOverlapWhileResizing=a),"label-color":"base"},{default:l(()=>[...e[135]||(e[135]=[t("Prevent Overlap WHILE Resizing",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:D.preventOverlapAfterResizing,"onUpdate:modelValue":e[31]||(e[31]=a=>D.preventOverlapAfterResizing=a),"label-color":"base"},{default:l(()=>[...e[136]||(e[136]=[t("Prevent Overlap AFTER Resizing",-1)])]),_:1},8,["modelValue"])])]),"code-html":l(()=>[...e[139]||(e[139]=[t(`<vue-cal
  :events="events"
  editable-events
  @event-drop="onEventDrop"
  @event-resize="onEventResize"
  @event-resize-end="onEventResizeEnd">
</vue-cal>`,-1)])]),"code-js":l(()=>[e[140]||(e[140]=t(`const events = [
  {
    start: new Date(new Date().setHours(11, 0, 0, 0)),
    end: new Date(new Date().setHours(13, 0, 0, 0)),
    title: 'Event 1'
  },
  ...
]
`,-1)),D.preventOverlapOnDrop?(i(),d(u,{key:0},[t(`
const onEventDrop = ({ e, event, cell, overlaps }) => {
 return !overlaps.length
}
`)],64)):(i(),d(u,{key:1},[],64)),D.preventOverlapWhileResizing?(i(),d(u,{key:2},[t(`
const onEventResize = ({ e, event, overlaps }) => {
 return !overlaps.length
}
`)],64)):(i(),d(u,{key:3},[],64)),D.preventOverlapAfterResizing?(i(),d(u,{key:4},[t(`
const onEventResizeEnd = ({ e, event, overlaps }) => {
 return !overlaps.length
}
`)],64)):(i(),d(u,{key:5},[],64))]),default:l(()=>[o(p(x),{events:D.events,"editable-events":"",onEventDrop:D.onEventDrop,onEventResize:D.onEventResize,onEventResizeEnd:D.onEventResizeEnd,"time-from":540,"time-to":900,dark:p(E).darkMode,style:{height:"331px"}},null,8,["events","onEventDrop","onEventResize","onEventResizeEnd","dark"])]),_:1}),o(z,{title:"Events Reactivity",anchor:"events-reactivity"},{desc:l(()=>[...e[141]||(e[141]=[n("p",null,[t("The events are reactive and will update when the external data changes."),n("br"),t(`
For instance, in this example, the events are changing their background color every second from
the external array and the calendar will keep the events up to date.`),n("br"),t(`
Note that `),n("code",null,"backgroundColor"),t(` is a special event property that Vue Cal parses to apply to
the events.`)],-1),n("p",null,null,-1)])]),"code-html":l(()=>[...e[142]||(e[142]=[t(`<vue-cal
  :events="events"
  editable-events
  @ready="onReady">
</vue-cal>`,-1)])]),"code-js":l(()=>[...e[143]||(e[143]=[t(`const events = [
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
`,-1)])]),"code-css":l(()=>[...e[144]||(e[144]=[t(`.vuecal__event {transition: background-color 1s;}
`,-1)])]),default:l(()=>[o(p(x),{views:{days:{cols:3,rows:1}},view:"days","views-bar":!1,events:H.events,"editable-events":"",onReady:H.onReady,"time-from":540,"time-to":900,dark:p(E).darkMode},null,8,["events","onReady","dark"])]),_:1})],64)}}};export{Pe as default};
