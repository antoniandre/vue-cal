import{u as Z,x as T,i as v,h as P,G as _,a as i,c as d,d as o,w as l,b as t,f as n,e as p,y as X,H as ee,A as te,p as O,F as u,t as g,I as U,j as Y,z as ne,g as le,m as ae,r as k}from"./index-D2xXVexl.js";import"./index-CxdLDf1L.js";import{_ as x}from"./index-BCyhwvzl.js";const oe={class:"no-bullet ml0"},se={class:"mt3"},re={class:"title3"},ie={class:"ml7"},de={class:"mt4"},ve={class:"title3"},ue={class:"mt4"},pe={class:"title3"},ge={class:"mt4"},ce={class:"title3"},me={class:"mt4"},we={class:"title3"},fe={class:"w-flex wrap gap3"},be={class:"w-flex justify-end gap2 mt2"},De={class:"w-flex align-center justify-end gap3 mt4 wrap"},ye={key:1},Ee={class:"w-flex justify-end mt2 gap2"},he={class:"w-flex mb3 justify-end"},ke={class:"w-flex align-start gap3 justify-end"},Ce={class:"w-flex gap2 d-iflex no-grow"},xe={class:"w-flex justify-end wrap gap2"},Ve=["innerHTML"],ze={class:"w-flex justify-space-between gap2 wrap mt4"},Te={class:"w-flex align-end no-grow gap1 mb1"},Me={class:"size--xs w-flex pa2 ova gap2 wrap bdrs2 bd1",style:{"min-height":"100px","background-color":"color-mix(in srgb, var(--w-base-color) 3%, transparent)"}},He={key:0,class:"w-flex column align-center justify-center"},Re={class:"bdrs2 bd1 w-flex column align-center justify-center pa1 no-grow blue--bg white"},Ie={class:"title3"},je={class:"size--xs"},Oe={class:"w-flex wrap gap3 justify-end mt8"},Ue={class:"w-flex mt4 wrap gap2 basis-zero"},Se=["onDragstart"],Be={class:"mr2"},Ae={class:"caption"},Ne={class:"w-flex wrap column gap3 align-end mt6"},Pe={__name:"calendar-events-interactions",setup(Fe){const E=Z(),J=P(()=>"/vue-cal/"),I=[{start:new Date(new Date().setHours(11,0)).subtractDays(2),end:new Date(new Date().setHours(13,0)).subtractDays(2),title:"Salsa Dance Class",content:'<i class="w-icon mdi mdi-dance-ballroom"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(12,30)),end:new Date(new Date().setHours(13,30)),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:new Date(new Date().setHours(11,30)).addDays(1),end:new Date(new Date().setHours(12,30)).addDays(1),title:"Dentist Appt.",content:'<i class="w-icon mdi mdi-tooth"></i>',class:"health",schedule:2},{start:new Date(new Date().setHours(13,0)).addDays(1),end:new Date(new Date().setHours(14,0)).addDays(1),title:"Cross-fit",content:'<i class="w-icon mdi mdi-dumbbell"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(10,0)).addDays(3),end:new Date(new Date().setHours(11,30)).addDays(3),title:"Swimming Class",content:'<i class="w-icon mdi mdi-swim"></i>',class:"sport",schedule:2},{start:new Date(new Date().setHours(11,35)).addDays(3),end:new Date(new Date().setHours(12,30)).addDays(3),title:"Brunch with Jane",content:'<i class="w-icon mdi mdi-food-croissant"></i>',class:"leisure",schedule:1,background:!1},{start:new Date(new Date().setHours(9,0)).addDays(4),end:new Date(new Date().setHours(10,0)).addDays(4),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1},{start:new Date(new Date().setHours(11,30)).addDays(4),end:new Date(new Date().setHours(12,25)).addDays(4),title:"BK with Mark",content:'<i class="w-icon mdi mdi-food"></i>',class:"leisure",schedule:2},{start:new Date(new Date().setHours(12,30)).addDays(4),end:new Date(new Date().setHours(14,30)).addDays(4),title:"Movie Theater",content:'<i class="w-icon mdi mdi-ticket"></i>',class:"leisure",schedule:1},{start:new Date(new Date().setHours(11,30,21,0)).addDays(5),end:new Date(new Date().setHours(12,30,23,30)).addDays(5),title:"Movie Night",content:'<i class="w-icon mdi mdi-popcorn"></i>',class:"leisure",schedule:1},{start:new Date(new Date().setHours(10,0)).addDays(7),end:new Date(new Date().setHours(11,0)).addDays(7),title:"Doctor Appt.",content:'<i class="w-icon mdi mdi-stethoscope"></i>',class:"health",schedule:1}],S=v(null),s=T({createMethods:[{value:"event-create",label:"Click & Drag"},{value:"cell-dblclick",label:"Double Click"},{value:"cell-contextmenu",label:"Right Click"},{value:"cell-hold",label:"Click & Hold"}],createMethod:v("event-create"),createEvent:({e:r,event:e,cell:m,resolve:y,cursor:h,view:H})=>{r.preventDefault(),e={...e||{},title:"New Event! 🎉",start:(e==null?void 0:e.start)||h.date,end:(e==null?void 0:e.end)||h.date.addHours(1),class:"blue-event"},y=y||H.createEvent,s.skipCreationDialog?y(e):s.openCreationDialog({e:r,event:e,cell:m,resolve:y,cursor:h})},skipCreationDialog:v(!0),showCreationDialog:v(!1),snapToInterval:v(!1),eventCreateMinDrag:v(!1),resolve:null,events:v([]),newEvent:{title:"",background:!1,class:""},openCreationDialog:({event:r,resolve:e})=>{s.showCreationDialog=!0,s.newEvent=r,s.resolve=e},cancel:()=>{s.createMethod==="event-create"&&s.resolve(!1),s.showCreationDialog=!1},save:()=>{s.resolve(s.newEvent),s.showCreationDialog=!1}}),F=v(null),K=T({createEvent:()=>{F.value.view.createEvent({start:new Date,end:new Date().addHours(1),title:"New Event 🎉"})}}),w=T({events:[...I.map(r=>({...r}))],deleteEvent:({e:r,event:e})=>{L.value.view.deleteEvent(e._.id)},viewDate:new Date,editableEvents:v(!0),deleteMethod:v("dblclick"),deleteMethods:[{label:"dblclick"},{label:"hold"}],eventListeners:P(()=>{let r={"event-dblclick":e=>e.event.delete(w.skipDeleteButton?3:1)};return w.deleteMethod==="hold"&&(r={"event-hold":e=>e.event.delete(w.skipDeleteButton?3:1),"event-dblclick":()=>{}}),r}),skipDeleteButton:v(!1)}),L=v(null),c=T({events:[...I.map(r=>({...r})),{start:new Date(new Date().addDays(2).setHours(11,0,0,0)),end:new Date(new Date().addDays(2).setHours(13,0,0,0)),title:"Boring Event",content:'<i class="w-icon mdi mdi-cancel"></i><br>Can&rsquo;t drag, resize or delete me!',class:"blue-event",deletable:!1,resizable:!1,resizableX:!1,draggable:!1}],deletable:v(!1),resizable:v(!1),resizableX:v(!1),draggable:v(!1),creatable:v(!1)}),C=T({counter:1,events:v([{start:new Date,end:new Date().addHours(1),title:"Event 1"}]),onEventCreate:({event:r,resolve:e})=>e({...r,title:"Event "+ ++C.counter}),addEvent:()=>C.events.push({start:new Date,end:new Date().addHours(1),title:"Event "+ ++C.counter})}),f=T({events:I.map(r=>({...r})),onEventDrop:({e:r,event:e,cell:m,overlaps:y})=>!y.length||y.length&&f.overlappableEvents,draggableEvents:v(!0),overlappableEvents:v(!0)}),B=v(null),W=v(null),V=T({events:v([{id:1,title:"Ext. Event 1",duration:60},{id:2,title:"Ext. Event 2",duration:30},{id:3,title:"Ext. Event 3"}]),onEventDragStart:(r,e)=>{r.dataTransfer.setData("event",JSON.stringify(e)),r.dataTransfer.setData("cursor-grab-at",r.offsetY)},onEventDrop:({e:r,event:e,cell:m,overlaps:y,external:h})=>{if(h){const H=V.events.findIndex(j=>j.id===e.id);H>-1&&V.events.splice(H,1)}},onEventDropInBank:r=>{const e=JSON.parse(r.dataTransfer.getData("event")||"{}");V.events.push({...e,duration:e.end?(e.end-e.start)/6e4:60}),(document.querySelector(".vuecal--dragging-event").isSameNode(B.value.$el)?B:W).value.view.deleteEvent(e._.id,3)}}),D=T({events:I.map(r=>({...r})),preventOverlapOnDrop:v(!0),preventOverlapWhileResizing:v(!0),preventOverlapAfterResizing:v(!1),onEventDrop:({e:r,event:e,cell:m,overlaps:y})=>!y.length||y.length&&!D.preventOverlapOnDrop,onEventResize:({e:r,event:e,overlaps:m})=>!m.length||m.length&&!D.preventOverlapWhileResizing,onEventResizeEnd:({e:r,event:e,overlaps:m})=>!m.length||m.length&&!D.preventOverlapAfterResizing}),M=T({events:[{start:new Date(new Date().setHours(12,30)),end:new Date(new Date().setHours(13,30)),title:"Event 1"},{start:new Date(new Date().setHours(11,30)).addDays(1),end:new Date(new Date().setHours(12,30)).addDays(1),title:"Event 2"}],interval:null,onReady:()=>{M.interval=setInterval(()=>{const r=["crimson","cornflowerblue","darkgreen","blueviolet","darkmagenta","teal"];M.events[0].backgroundColor=r[Math.floor(Math.random()*r.length)],M.events[1].backgroundColor=r[Math.floor(Math.random()*r.length)]},1e3)}});return _(()=>{clearInterval(M.interval)}),(r,e)=>{const m=k("w-icon"),y=k("router-link"),h=k("alert"),H=k("w-image"),j=k("w-radios"),b=k("w-switch"),$=k("w-input"),R=k("w-button"),q=k("w-dialog"),z=k("example"),A=k("ssh-pre"),N=k("w-tooltip");return i(),d(u,null,[o(h,{class:"py3",info:""},{default:l(()=>[e[49]||(e[49]=t("p",{class:"mb2"},[n("The calendar allows you to interact with events in various ways."),t("br"),n(`
Here are some examples of how you can create, edit, delete, and drag & drop events.
`)],-1)),e[50]||(e[50]=t("p",{class:"text-bold mt4"},"There are 5 types of event interactions:",-1)),t("ul",oe,[t("li",se,[t("div",re,[o(m,{class:"mr2 success",md:""},{default:l(()=>[...e[32]||(e[32]=[n("wi-check",-1)])]),_:1}),e[33]||(e[33]=n("Read",-1))]),t("p",ie,[e[35]||(e[35]=n(`The events are displayed on the calendar and can show more details, usually on click,
like seen in the `,-1)),o(y,{to:"/examples/calendar-events--display#ex--open-dialog-on-event-click"},{default:l(()=>[...e[34]||(e[34]=[n("Open Dialog on Event Click",-1)])]),_:1}),e[36]||(e[36]=n(" example.",-1))])]),t("li",de,[t("div",ve,[o(m,{class:"mr2 success",md:""},{default:l(()=>[...e[37]||(e[37]=[n("wi-check",-1)])]),_:1}),e[38]||(e[38]=n("Create",-1))]),e[39]||(e[39]=t("p",{class:"ml7"},"Create an event by clicking and dragging on a cell, by default.",-1))]),t("li",ue,[t("div",pe,[o(m,{class:"mr2 success",md:""},{default:l(()=>[...e[40]||(e[40]=[n("wi-check",-1)])]),_:1}),e[41]||(e[41]=n("Delete",-1))]),e[42]||(e[42]=t("p",{class:"ml7"},"Delete an event by double clicking on it, by default.",-1))]),t("li",ge,[t("div",ce,[o(m,{class:"mr2 success",md:""},{default:l(()=>[...e[43]||(e[43]=[n("wi-check",-1)])]),_:1}),e[44]||(e[44]=n("Resize",-1))]),e[45]||(e[45]=t("p",{class:"ml7"},"Resize an event by dragging its resizer handle.",-1))]),t("li",me,[t("div",we,[o(m,{class:"mr2 success",md:""},{default:l(()=>[...e[46]||(e[46]=[n("wi-check",-1)])]),_:1}),e[47]||(e[47]=n("Drag",-1))]),e[48]||(e[48]=t("p",{class:"ml7"},"Drag and drop an event onto any cell that is not disabled.",-1))])])]),_:1}),o(z,{ref_key:"exCreateEventsExampleEl",ref:S,title:"Create Events",anchor:"create-events"},{desc:l(()=>[t("div",fe,[e[51]||(e[51]=t("div",{class:"grow xs7"},[t("p",null,[n("Events can be created in various ways: programmatically or through user interaction with a calendar cell."),t("br"),n(`
The default interaction is a click and drag gesture, but you can define the type of interaction you
want.`),t("br"),n(`
The event creation can then be completed by an edition dialog box or not.`)]),t("p",{class:"mt3"},[n("With the "),t("code",null,"snapToInterval"),n(` option, you can make sure the event starts and ends at specific
intervals of minutes.`),t("br"),n(`
E.g. `),t("code",null,':snap-to-interval="15"'),n(" will snap the event to the closest "),t("code",null,":00"),n(", "),t("code",null,":15"),n(`,
`),t("code",null,":30"),n(", "),t("code",null,":45"),n(" while dragging."),t("br"),n(`
This option also applies on event resizing after the drag-creation.`)]),t("p",{class:"mt3"},[n("With the "),t("code",null,"eventCreateMinDrag"),n(` option, you can define the minimum drag distance in pixels
before the event creation starts. This can be useful to prevent accidental event creation when
navigating the calendar.
`)])],-1)),o(H,{class:"bd1 bdrs2 sh2",src:`${J.value}images/click-and-drag.webp`,alt:"Create Events",width:"250",lazy:""},null,8,["src"])]),o(h,null,{default:l(()=>[...e[52]||(e[52]=[n("The event creation is only available on a day cell: not on year & years views.",-1)])]),_:1}),t("div",be,[e[54]||(e[54]=t("label",null,"Create Event On Cell",-1)),t("div",null,[o(j,{modelValue:s.createMethod,"onUpdate:modelValue":[e[0]||(e[0]=a=>s.createMethod=a),(S.value||{}).refreshHeight],items:s.createMethods},null,8,["modelValue","onUpdate:modelValue","items"]),e[53]||(e[53]=t("p",{class:"caption mt1"},"(Or however you want)",-1))])]),t("div",De,[o(b,{modelValue:s.skipCreationDialog,"onUpdate:modelValue":[e[1]||(e[1]=a=>s.skipCreationDialog=a),(S.value||{}).refreshHeight]},{default:l(()=>[...e[55]||(e[55]=[n("Skip Creation Dialog",-1)])]),_:1},8,["modelValue","onUpdate:modelValue"]),o(b,{modelValue:s.snapToInterval,"onUpdate:modelValue":e[2]||(e[2]=a=>s.snapToInterval=a)},{default:l(()=>[...e[56]||(e[56]=[n("Snap to Interval: ",-1),t("span",{class:"code transparent--bg inherit"},"15min",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:s.eventCreateMinDrag,"onUpdate:modelValue":e[3]||(e[3]=a=>s.eventCreateMinDrag=a)},{default:l(()=>[...e[57]||(e[57]=[n("Event Create Drag Min: ",-1),t("span",{class:"code transparent--bg inherit"},"15px",-1)])]),_:1},8,["modelValue"])])]),"code-html":l(()=>[n(`<vue-cal
  `+g(s.snapToInterval?`:snap-to-interval="15"
  `:"")+g(s.eventCreateMinDrag?`:event-create-min-drag="15"
  `:"")+g(s.createMethod==="event-create"?"editable-events":':editable-events="{ edit: true, resize: true, create: false, delete: true }"')+`
  @`+g(s.createMethod)+`="createEvent">
</vue-cal>`,1),s.skipCreationDialog?(i(),d("span",ye)):(i(),d(u,{key:0},[n(`

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
</w-dialog>`)],64))]),"code-js":l(()=>[s.createMethod==="event-create"&&s.skipCreationDialog?(i(),d(u,{key:0},[n(`const createEvent = ({ event, resolve }) => {
  resolve({
    ...event,
    title: 'New Event! 🎉'
  })
}
`)],64)):s.createMethod==="event-create"?(i(),d(u,{key:1},[n(`const createEvent = ({ event, resolve }) => {
  openCreationDialog({ event, resolve })
}
`)],64)):s.createMethod!=="event-create"&&s.skipCreationDialog?(i(),d(u,{key:2},[n(`const createEvent = ({ cursor, view }) => {
  view.createEvent({
    start: cursor.date,
    end: cursor.date.addHours(1), // Uses Vue Cal's Date prototypes.
    title: 'New Event'
  })
}`)],64)):s.createMethod!=="event-create"?(i(),d(u,{key:3},[n(`const createEvent = ({ cursor, view }) => {
  openCreationDialog({ cursor, view })
}`)],64)):(i(),d(u,{key:4},[],64)),s.skipCreationDialog?(i(),d(u,{key:6},[],64)):(i(),d(u,{key:5},[e[58]||(e[58]=n(`
const showCreationDialog = ref(false)
const createEventFn = ref(null)`,-1)),s.createMethod!=="event-create"?(i(),d(u,{key:0},[n("const cursorDate = ref(null)")],64)):O("",!0),e[59]||(e[59]=n(`const newEvent = ref({
  title: '',
  background: false,
  class: ''
})
`,-1)),s.createMethod==="event-create"?(i(),d(u,{key:1},[n(`const openCreationDialog = ({ event, resolve }) => {
  showCreationDialog.value = true
  newEvent.value = event
  createEventFn.value = resolve
}`)],64)):(i(),d(u,{key:2},[n(`const openCreationDialog = ({ cursor, view }) => {
  showCreationDialog.value = true
  cursorDate.value = cursor.date
  createEventFn.value = view.createEvent
}`)],64)),e[60]||(e[60]=n(`
const cancelCreation = () => {`,-1)),s.createMethod==="event-create"?(i(),d(u,{key:3},[n(`
  createEventFn.value(false)`)],64)):O("",!0),e[61]||(e[61]=n(`
  showCreationDialog.value = false
}

const validateCreation = () => {`,-1)),s.createMethod!=="event-create"?(i(),d(u,{key:4},[n(`
  createEventFn.value({
    ...newEvent.value,
    start: cursorDate.value,
    end: cursorDate.value.addHours(1) // Uses Vue Cal's Date prototypes.
  })`)],64)):(i(),d(u,{key:5},[n(`
  createEventFn.value(newEvent.value)`)],64)),e[62]||(e[62]=n(`
  showCreationDialog.value = false
}`,-1))],64))]),default:l(()=>[o(p(x),X({"editable-events":{edit:!0,resize:!0,create:s.createMethod==="event-create",delete:!0}},{[ee(s.createMethod)]:s.createEvent},{events:s.events,"snap-to-interval":s.snapToInterval?15:0,"event-create-min-drag":s.eventCreateMinDrag?15:0,"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode}),null,16,["editable-events","events","snap-to-interval","event-create-min-drag","dark"]),s.newEvent?(i(),te(q,{key:0,modelValue:s.showCreationDialog,"onUpdate:modelValue":e[7]||(e[7]=a=>s.showCreationDialog=a),width:"300",onClose:s.cancel},{default:l(()=>[o($,{modelValue:s.newEvent.title,"onUpdate:modelValue":e[4]||(e[4]=a=>s.newEvent.title=a)},{default:l(()=>[...e[63]||(e[63]=[n("Event Title",-1)])]),_:1},8,["modelValue"]),o($,{class:"my4",modelValue:s.newEvent.class,"onUpdate:modelValue":e[5]||(e[5]=a=>s.newEvent.class=a)},{default:l(()=>[...e[64]||(e[64]=[n("Event Class",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:s.newEvent.background,"onUpdate:modelValue":e[6]||(e[6]=a=>s.newEvent.background=a)},{default:l(()=>[...e[65]||(e[65]=[n("Background",-1)])]),_:1},8,["modelValue"]),t("div",Ee,[o(R,{onClick:s.cancel},{default:l(()=>[...e[66]||(e[66]=[n("Cancel",-1)])]),_:1},8,["onClick"]),o(R,{onClick:s.save},{default:l(()=>[...e[67]||(e[67]=[n("OK",-1)])]),_:1},8,["onClick"])])]),_:1},8,["modelValue","onClose"])):O("",!0)]),_:1},512),o(z,{title:"Create Events Programmatically",anchor:"create-events-programmatically"},{desc:l(()=>[e[70]||(e[70]=t("p",{class:"my2"},[n(`In order to create events programmatically, from an external button for instance, you need to call
the vue-cal `),t("code",null,"view.createEvent()"),n(" function from a Vue ref.")],-1)),t("div",he,[o(R,{sm:"",onClick:K.createEvent},{default:l(()=>[o(m,{class:"mr1"},{default:l(()=>[...e[68]||(e[68]=[n("mdi mdi-plus",-1)])]),_:1}),e[69]||(e[69]=n("Create Event",-1))]),_:1},8,["onClick"])])]),"code-html":l(()=>[...e[71]||(e[71]=[n(`<button @click="createEvent">Create Event</button>

<vue-cal
  ref="vuecalRef"
  editable-events>
</vue-cal>
`,-1)])]),"code-js":l(()=>[...e[72]||(e[72]=[n(`const vuecalRef = ref(null)

const createEvent = () => {
  vuecalRef.value.view.createEvent({
    start: new Date(),
    end: new Date().addHours(1), // Using Vue Cal's Date prototypes.
    title: 'New Event 🎉'
  })
}`,-1)])]),default:l(()=>[o(p(x),{ref_key:"exExternalEventCreateVuecalRef",ref:F,"editable-events":"",onReady:e[8]||(e[8]=({view:a})=>a.scrollToCurrentTime()),onEventCreated:e[9]||(e[9]=a=>a._.$el.scrollIntoView({behavior:"smooth",block:"center",inline:"nearest"})),views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode},null,8,["dark"])]),_:1}),o(z,{title:"Delete Events",anchor:"delete-events"},{desc:l(()=>[e[80]||(e[80]=t("h4",{class:"mt4 mb0"},"A. Deletion Rules",-1)),e[81]||(e[81]=t("p",{class:"mb2"},[n("The deletion of events is allowed or denied when the "),t("code",null,"editable-events"),n(` option is set to
`),t("code",null,"true"),n(" or "),t("code",null,"false"),n(" - or more granularly "),t("code",null,"editable-events.delete"),n(`, when
`),t("code",null,"editable-events"),n(" is provided as an object:")],-1)),o(A,{language:"js",dark:p(E).darkMode},{default:l(()=>[...e[73]||(e[73]=[n("{ drag: true, resize: true, delete: true, create: true }",-1)])]),_:1},8,["dark"]),o(h,null,{default:l(()=>[...e[74]||(e[74]=[n(`In addition to the global settings, you can override the deletion ability individually for each
event using the event attributes `,-1),t("code",null,"deletable: false",-1),n(`.
`,-1)])]),_:1}),e[82]||(e[82]=t("h4",{class:"mt4 mb0"},"B. Default Behavior & Flexibility",-1)),e[83]||(e[83]=t("p",null,[n("The deletion of an event is straightforward and extremely flexible."),t("br"),n(`
By default it is triggered by a double click/tap on the event, which displays a delete button.
On click/tap on this button, the event is deleted.`),t("br"),n(`
This gesture has the advantage of not interfering with the single click/tap event, which can be
used for other actions, and not interfering with the drag & drop gesture.
`)],-1)),e[84]||(e[84]=t("p",{class:"mt4"},"You can easily override this behavior by:",-1)),e[85]||(e[85]=t("ol",{class:"ml4"},[t("li",null,[n("Resetting the double-click event, only with "),t("code",null,'@double-click="false"'),n(`, or use
`),t("code",null,"@double-click"),n(" for another action.")]),t("li",null,[n("Optionally assigning a different interaction for the deletion with: "),t("code",null,'@event-xxx="$event.delete"'),n(`,
where `),t("code",null,"xxx"),n(" can be replaced with "),t("code",null,"click"),n(", "),t("code",null,"hold"),n(", "),t("code",null,"contextmenu"),n(`, or whatever
valid event you want.`),t("br")])],-1)),e[86]||(e[86]=t("h4",{class:"mt4 mb0"},"C. The Delete Function",-1)),t("div",null,[e[76]||(e[76]=n("Every event has a delete function that you can call from the event object itself:",-1)),o(A,{class:"d-iblock pr5 py0 ml1 mb0",language:"js",dark:p(E).darkMode},{default:l(()=>[...e[75]||(e[75]=[n("event.delete()",-1)])]),_:1},8,["dark"])]),e[87]||(e[87]=t("p",null,`For more flexibility, this function can receive an explicit "deletion stage" integer parameter,
so you can skip to the stage you want directly:`,-1)),e[88]||(e[88]=t("ul",null,[t("li",null,[t("code",null,"1"),n(`: The delete button will appear. On click, the event is deleted directly in the global
events array (source of truth) and visually from the cell.`)]),t("li",null,[t("code",null,"2"),n(":"),t("span",{class:"ml1"},[n(`The event is deleted visually from the cell but not in the global events array (source of truth) yet.
This has the advantage of not triggering an immediate Vue reactivity update cascade on all the
cells.`),t("br"),n(`
The rerendering cascade of the cells is completely avoided by deleting the event on the next view
change, when the cell is unmounted.`),t("br"),n(`
even though this stage is more optimized than the stage `),t("code",null,"3"),n(`, it can be non-obvious or confusing
for the developer that the event is still in the array at this stage until the view changes.
Especially if you use a v-model on the events. For this reason, the stage `),t("code",null,"3"),n(` is the default
behavior from the delete button.`)])]),t("li",null,[t("code",null,"3"),n(`: The event is deleted both visually and in the source of truth (automatically called on
cell unmount after using stage `),t("code",null,"2"),n(").")])],-1)),e[89]||(e[89]=t("p",{class:"mt4"},[n("For more flexibility, there is also a "),t("code",null,"view.deleteEvent(eventId, stage)"),n(" function:")],-1)),e[90]||(e[90]=t("ul",null,[t("li",null,[n("Which takes two arguments: the internal ID of the event (found in "),t("code",null,"event._.id"),n(') to delete and a "deletion stage" integer just as described.')]),t("li",null,[n("Can also delete an event by a specific custom event property, like "),t("code",null,"event.id"),n(" or "),t("code",null,"event.doctorId"),n(", etc. by passing a key-value pair as an object in the first argument. E.g. "),t("code",null,"view.deleteEvent({ id: 1 }, 3)"),n(".")])],-1)),e[91]||(e[91]=t("p",{class:"mt6"},"Now let's view all this in action!",-1)),t("div",ke,[o(b,{class:"no-grow",modelValue:w.editableEvents,"onUpdate:modelValue":e[10]||(e[10]=a=>w.editableEvents=a),"label-color":"base"},{default:l(()=>[...e[77]||(e[77]=[n("Editable Events",-1)])]),_:1},8,["modelValue"]),o(b,{class:"no-grow",modelValue:w.skipDeleteButton,"onUpdate:modelValue":e[11]||(e[11]=a=>w.skipDeleteButton=a),"label-color":"base"},{default:l(()=>[...e[78]||(e[78]=[n("Skip Delete Button",-1)])]),_:1},8,["modelValue"]),t("div",Ce,[e[79]||(e[79]=t("span",null,"Delete on:",-1)),o(j,{modelValue:w.deleteMethod,"onUpdate:modelValue":e[12]||(e[12]=a=>w.deleteMethod=a),items:w.deleteMethods,"label-color":"base"},null,8,["modelValue","items"])])])]),"code-html":l(()=>[n(`<vue-cal
  `+g(w.editableEvents?"editable-events":':editable-events="false"')+" "+g(w.deleteMethod==="hold"?`
  @event-dblclick="false"
  @event-hold="$event.delete${w.skipDeleteButton?"(3)":""}"`:`${w.skipDeleteButton?`
  @event-dblclick="$event.delete(3)"`:""}`)+`
  :events="events">
</vue-cal>
`,1)]),default:l(()=>[o(p(x),X({events:w.events,"editable-events":w.editableEvents},U(w.eventListeners),{onEventDelete:e[13]||(e[13]=a=>console.log("Event deleted!",a)),"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","view-date":w.viewDate,"views-bar":!1,dark:p(E).darkMode}),null,16,["events","editable-events","view-date","dark"])]),_:1}),o(z,{title:"Edit Events",anchor:"edit-events"},{desc:l(()=>[e[99]||(e[99]=t("p",{class:"mb2"},[n("Editing events is allowed or denied when the "),t("code",null,"editable-events"),n(` option is set to
`),t("code",null,"true"),n(" or "),t("code",null,"false"),n(". But more granularly, "),t("code",null,"editable-events"),n(` can be provided
as an object:`)],-1)),o(A,{language:"js",dark:p(E).darkMode},{default:l(()=>[...e[92]||(e[92]=[n("{ create: true, resize: true, drag: true, delete: true }",-1)])]),_:1},8,["dark"]),e[100]||(e[100]=t("p",null,"With:",-1)),e[101]||(e[101]=t("ul",null,[t("li",null,[t("strong",{class:"code"},"create"),n(": Create a new event (by clicking and dragging by default).")]),t("li",null,[t("strong",{class:"code"},"resize"),n(`: Resize an event by dragging the resizer handle.
`),t("strong",null,"Not available if no timeline, not allowed on background events.")]),t("li",null,[t("strong",{class:"code"},"resizeX"),n(`: Allow horizontal resizing of an event by dragging the resizer handle.
This converts to adding or removing days to the event and possibly switch from a single day event
to a multi-day event and vice versa.
`),t("strong",null,"Not available if no timeline, not allowed on background events.")]),t("li",null,[t("strong",{class:"code"},"drag"),n(": Drag & drop an event (not allowed on background events).")]),t("li",null,[t("strong",{class:"code"},"delete"),n(": Delete an event (by double clicking an event by default).")])],-1)),o(h,null,{default:l(()=>[...e[93]||(e[93]=[n(`In addition to the global settings, you can override these actions individually for each
event using the event attributes, `,-1),t("code",null,"deletable: false",-1),n(", ",-1),t("code",null,"draggable: false",-1),n(` &
`,-1),t("code",null,"resizable: false",-1),n(`.
`,-1)])]),_:1}),t("div",xe,[o(b,{modelValue:c.creatable,"onUpdate:modelValue":e[14]||(e[14]=a=>c.creatable=a)},{default:l(()=>[...e[94]||(e[94]=[n("Create Events",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:c.resizable,"onUpdate:modelValue":e[15]||(e[15]=a=>c.resizable=a)},{default:l(()=>[...e[95]||(e[95]=[n("Resize Events",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:c.resizableX,"onUpdate:modelValue":e[16]||(e[16]=a=>c.resizableX=a)},{default:l(()=>[...e[96]||(e[96]=[n("Resize Events horizontally",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:c.draggable,"onUpdate:modelValue":e[17]||(e[17]=a=>c.draggable=a)},{default:l(()=>[...e[97]||(e[97]=[n("Drag Events",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:c.deletable,"onUpdate:modelValue":e[18]||(e[18]=a=>c.deletable=a)},{default:l(()=>[...e[98]||(e[98]=[n("Delete Events",-1)])]),_:1},8,["modelValue"])])]),"code-html":l(()=>[n(`<vue-cal
  :editable-events="{ create: `+g(c.creatable?"true":"false")+", resize: "+g(c.resizable?"true":"false")+", resizeX: "+g(c.resizableX?"true":"false")+",  drag: "+g(c.draggable?"true":"false")+", delete: "+g(c.deletable?"true":"false")+` }"
  :events="events">
</vue-cal>`,1)]),"code-js":l(()=>[...e[102]||(e[102]=[n(`const events = [
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
`,-1)])]),default:l(()=>[o(p(x),{ref_key:"exEditEventsVuecalRef",ref:L,"editable-events":{create:c.creatable,resize:c.resizable,resizeX:c.resizableX,drag:c.draggable,delete:c.deletable},events:c.events,"time-from":540,"time-to":900,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode},{event:l(({event:a})=>[t("strong",null,g(a.title),1),t("p",null,g(a.start.formatTime())+" - "+g(a.end.formatTime()),1),t("p",{innerHTML:a.content},null,8,Ve)]),_:1},8,["editable-events","events","dark"])]),_:1}),o(z,{title:"Events v-model",anchor:"events-v-model"},{desc:l(()=>[e[110]||(e[110]=t("p",null,[n(`The good news is that the events prop is a two-way binding! So you can use it to read or write with
`),t("code",null,"v-model:events"),n("! But...")],-1)),o(h,{class:"mb4",tip:""},{default:l(()=>[...e[103]||(e[103]=[t("div",{class:"title4 mt-1"},"With great powers comes great responsibility",-1),t("p",null,[n("Be aware that modifying the array of events externally will always override the internal array."),t("br"),n(`
So you must be sure to save the changes that were made to events through the Vue Cal UI, or they
will be lost.
`)],-1)])]),_:1}),e[111]||(e[111]=t("p",{class:"mb2"},[n(`In this example, you can add or remove events from the array of events and they will be displayed in the
box below. You can also create events in the calendar with a click and drag, and resize or drag and drop
them.`),t("br"),n(`
The events in the list will accurately display the updated start and end times.`)],-1)),t("div",ze,[e[108]||(e[108]=t("div",{class:"title4"},"Current List of Events",-1)),t("div",Te,[o(R,{onClick:C.addEvent},{default:l(()=>[o(m,{class:"mr2"},{default:l(()=>[...e[104]||(e[104]=[n("mdi mdi-plus",-1)])]),_:1}),e[105]||(e[105]=n("Add Event",-1))]),_:1},8,["onClick"]),o(R,{onClick:e[19]||(e[19]=a=>C.events.pop())},{default:l(()=>[o(m,{class:"mr2"},{default:l(()=>[...e[106]||(e[106]=[n("mdi mdi-trash-can-outline",-1)])]),_:1}),e[107]||(e[107]=n("Remove Last Event",-1))]),_:1})])]),t("div",Me,[C.events.length?O("",!0):(i(),d("div",He,[...e[109]||(e[109]=[t("div",{class:"caption"},"No events yet.",-1)])])),(i(!0),d(u,null,Y(C.events,a=>(i(),d("div",Re,[t("div",Ie,g(a.title),1),t("div",je,g(a.start.formatTime())+" - "+g(a.end.formatTime()),1)]))),256))])]),"code-html":l(()=>[...e[112]||(e[112]=[n(`<button
  @click="events.push({
    start: new Date(),
    end: new Date().addHours(1), // Using Vue Cal's Date prototypes.
    title: 'Event 1'
  })">Add Event</button>
<button @click="events.pop()">Remove last event</button>

<vue-cal v-model:events="events" />`,-1)])]),"code-js":l(()=>[...e[113]||(e[113]=[n(`const events = [
  {
    start: new Date(new Date().setHours(9, 0, 0, 0)),
    end: new Date(new Date().setHours(10, 0, 0, 0)),
    title: 'Event 1'
  },
  ...
]`,-1)])]),default:l(()=>[o(p(x),{ref:"exEventsVModelVuecalRef",events:C.events,"onUpdate:events":e[20]||(e[20]=a=>C.events=a),"editable-events":"",onReady:e[21]||(e[21]=({view:a})=>a.scrollToCurrentTime()),onEventCreate:C.onEventCreate,onEventDblclick:e[22]||(e[22]=({event:a})=>a.delete(2)),views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode},null,8,["events","onEventCreate","editable-events","dark"])]),_:1}),o(z,{title:"Event Drag & Drop",anchor:"drag-and-drop"},ne({desc:l(()=>[e[119]||(e[119]=t("div",{class:"todo-tag d-iflex"},"FINISH THIS EXAMPLE - DISABLE A DAY",-1)),e[120]||(e[120]=t("p",null,[n(`The drag & drop functionality is available for single-day foreground events only and is powered by
the native HTML5 drag & drop API (widely supports touch devices).`),t("br"),n(`
It allows you to move an event from one cell to another, or from an external source to the calendar
and vice-versa.`)],-1)),e[121]||(e[121]=t("div",{class:"title5 mt4"},"Good to Know:",-1)),e[122]||(e[122]=t("ul",null,[t("li",{class:"mt2"},[n("The drag & drop feature is enabled with "),t("code",null,"editable-events"),n(` set to true, but you can specifically
disable it by setting the `),t("code",null,"editable-events.drag"),n(" option to "),t("code",null,"false"),n("."),t("br"),n(`
You can also disable it for a specific event by setting the `),t("code",null,"draggable"),n(" attribute to "),t("code",null,"false"),n(`.
`)]),t("li",{class:"mt2"},[n("While dragging an event, the clone at cursor receives the "),t("code",null,".vuecal__event--dragging-ghost"),n(` CSS
class, while the original event receives the `),t("code",null,".vuecal__event--dragging-original"),n(` CSS class (the
original is hidden by default while dragging). You can override these styles with your own CSS.`)]),t("li",null,[n(`By default, when you drop the event it will start exactly where you dropped it,
but if you prefer you can use the `),t("code",null,"snapToInterval"),n(` option to dictate where it should
snap to (refer to `),t("code",null,"snapToInterval"),n(" in the "),t("a",{href:"#api"},"API section"),n(")."),t("br"),n(`
If you wonder why it does not represent the snapping while dragging, it's not possible to do it with
the native HTML5 drag & drop.
`)])],-1)),o(h,null,{default:l(()=>[...e[114]||(e[114]=[t("p",null,[n("If you listen for the "),t("code",null,"event-drop"),n(" event, you will receive an object with the following:")],-1),t("ul",null,[t("li",null,[t("code",null,"event"),n(": The event object that was dropped (contains the date and schedule where it was dropped).")]),t("li",null,[t("code",null,"cell"),n(": The cell object where the event was dropped.")]),t("li",null,[t("code",null,"e"),n(": The JavaScript native event object.")]),t("li",null,[t("code",null,"overlaps"),n(": An array of events that overlap the dropped event.")])],-1),t("p",null,[n("From the same event listener, you can "),t("strong",null,[n("reject the drop by returning "),t("code",null,"false")]),n(".")],-1)])]),_:1}),t("div",Oe,[o(b,{modelValue:f.draggableEvents,"onUpdate:modelValue":e[23]||(e[23]=a=>f.draggableEvents=a),"label-color":"base"},{default:l(()=>[...e[115]||(e[115]=[n("Draggable Events",-1)])]),_:1},8,["modelValue"]),o(N,{"align-right":"",tooltip:"Allow dropping events on top of other events"},{default:l(()=>[t("div",U(r.on,!0),[o(b,{modelValue:f.overlappableEvents,"onUpdate:modelValue":e[24]||(e[24]=a=>f.overlappableEvents=a),"label-color":"base"},{default:l(()=>[...e[116]||(e[116]=[n("Overlappable Events",-1)])]),_:1},8,["modelValue"])],16)]),_:1}),o(N,{"align-right":"",tooltip:"Snap the event to the closest round hour when dropped or resized"},{default:l(()=>[t("div",U(r.on,!0),[o(b,{modelValue:f.snapToInterval,"onUpdate:modelValue":e[25]||(e[25]=a=>f.snapToInterval=a),"label-color":"base"},{default:l(()=>[...e[117]||(e[117]=[n("Snap to Interval",-1)])]),_:1},8,["modelValue"])],16)]),_:1}),o(N,{"align-right":"",tooltip:"Override the default event dragging CSS styles"},{default:l(()=>[t("div",U(r.on,!0),[o(b,{modelValue:f.overrideDragCss,"onUpdate:modelValue":e[26]||(e[26]=a=>f.overrideDragCss=a),"label-color":"base"},{default:l(()=>[...e[118]||(e[118]=[n("Override Draggable CSS",-1)])]),_:1},8,["modelValue"])],16)]),_:1})])]),"code-html":l(()=>[n(`<vue-cal
  :events="events"
  :editable-events="{ drag: `+g(f.draggableEvents?"true":"false")+` }"
  `+g(f.snapToInterval?`:snap-to-interval="60"
  `:"")+`@event-drop="onEventDrop"
  :schedules="schedules">
</vue-cal>`,1)]),"code-js":l(()=>[e[123]||(e[123]=n(`const schedules = [{ id: 1, label: 'Dr 1' }, { id: 2, label: 'Dr 2' }]
`,-1)),f.overlappableEvents?(i(),d(u,{key:0},[n(`
const onEventDrop = ({ e, event, cell }) => {
  console.log('Event dropped!', event, cell)
  // Return false to reject the drop.
}`)],64)):(i(),d(u,{key:1},[n(`
const onEventDrop = ({ e, event, cell, overlaps }) => !overlaps.length

`)],64))]),default:l(()=>[o(p(x),{events:f.events,"editable-events":{drag:f.draggableEvents},onEventDrop:f.onEventDrop,schedules:[{id:1,label:"Dr 1"},{id:2,label:"Dr 2"}],"time-from":540,"time-to":900,"snap-to-interval":f.snapToInterval?60:0,views:{days:{cols:5,rows:1}},view:"days","views-bar":!1,dark:p(E).darkMode,class:le({"override-drag-css":f.overrideDragCss}),style:{height:"327px"}},null,8,["events","editable-events","onEventDrop","snap-to-interval","dark","class"])]),_:2},[f.overrideDragCss?{name:"code-css",fn:l(()=>[e[124]||(e[124]=n(`.vuecal__event--dragging-ghost {
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
`,-1))]),key:"0"}:void 0]),1024),o(z,{title:"External Events Drag & Drop",anchor:"external-events-drag-and-drop"},{desc:l(()=>[e[126]||(e[126]=t("p",{class:"mb2"},[n("You can drag & drop events from an external source as long as they are HTML5 draggable (this will change when touch devices are supported)."),t("br"),n(`
It is also possible to move an event from one calendar to another.`),t("br"),t("br"),n(`
In the external event, you can set a `),t("code",null,"duration"),n(" property: it will be used to set the duration of the event when dropped in Vue Cal."),t("br"),n(`
If the `),t("code",null,"duration"),n(" is missing, the default duration will be equal to the time interval."),t("br"),n(`
Once the event is dropped into Vue Cal, it will be removed from the external source and its duration will be calculated in `),t("code",null,"event._.duration"),n(`.
`)],-1)),o(h,{tip:""},{default:l(()=>[...e[125]||(e[125]=[t("strong",null,"Important note when dragging external events into Vue Cal:",-1),t("div",null,[n(`It's important to understand that the native HTML5 drag & drop, does not move an element from its
source to the destination. It only creates a copy of the element that you drag.`),t("br"),n(`
When you drop a DOM element to another location, you have to code the actual move yourself:
delete from source and create in destination.`),t("br"),n(`
Learn how in the example source code below!`)],-1)])]),_:1}),e[127]||(e[127]=t("p",null,"In this example, you can drag the external events into the calendar and vice-versa.",-1))]),"code-html":l(()=>[...e[128]||(e[128]=[n(`<div
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
`,-1)])]),"code-js":l(()=>[...e[129]||(e[129]=[n(`export default {
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
`,-1)])]),default:l(()=>[t("div",Ue,[t("div",{class:"external-events w-flex column gap2",onDrop:e[27]||(e[27]=(...a)=>V.onEventDropInBank&&V.onEventDropInBank(...a)),onDragover:e[28]||(e[28]=ae(()=>{},["prevent"]))},[e[130]||(e[130]=t("div",{class:"title4 primary text-center"},"Ext. Events",-1)),(i(!0),d(u,null,Y(V.events,(a,G)=>(i(),d("div",{class:"external-event",key:G,draggable:"true",onDragstart:Q=>V.onEventDragStart(Q,a)},[t("strong",Be,g(a.title),1),t("div",Ae,"("+g((a._||{}).duration||a.duration?`${(a._||{}).duration||a.duration} min`:"no duration")+")",1)],40,Se))),128))],32),o(p(x),{class:"grow",ref_key:"exExternalEventsDragDropEl1",ref:B,onEventDrop:V.onEventDrop,"editable-events":"","views-bar":!1,views:{days:{cols:3,rows:1}},view:"days","time-from":540,"time-to":900,"today-button":!1,dark:p(E).darkMode},null,8,["onEventDrop","dark"]),o(p(x),{class:"grow",ref_key:"exExternalEventsDragDropEl2",ref:W,onEventDrop:V.onEventDrop,"editable-events":"","views-bar":!1,views:{days:{cols:3,rows:1}},view:"days","time-from":540,"time-to":900,"today-button":!1,dark:p(E).darkMode},null,8,["onEventDrop","dark"])])]),_:1}),o(z,{title:"Reject Event Drag & Drop or Resizing",anchor:"reject-event-dnd-or-resizing"},{desc:l(()=>[e[134]||(e[134]=t("p",null,[n("The drag & drop and resizing of events can be rejected by returning "),t("code",null,"false"),n(` from the
`),t("code",null,"event-drop"),n(", "),t("code",null,"event-resize"),n(" and "),t("code",null,"event-resize-end"),n(" event listeners.")],-1)),e[135]||(e[135]=t("p",null,`This is useful when you want to prevent an event from being moved or resized in certain conditions.
For example, you can reject the drop of an event on top of another event, or prevent an event from
being resized if it's too close to another event.
`,-1)),t("div",Ne,[o(b,{modelValue:D.preventOverlapOnDrop,"onUpdate:modelValue":e[29]||(e[29]=a=>D.preventOverlapOnDrop=a),"label-color":"base"},{default:l(()=>[...e[131]||(e[131]=[n("Prevent Event Overlap On Drop",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:D.preventOverlapWhileResizing,"onUpdate:modelValue":e[30]||(e[30]=a=>D.preventOverlapWhileResizing=a),"label-color":"base"},{default:l(()=>[...e[132]||(e[132]=[n("Prevent Overlap WHILE Resizing",-1)])]),_:1},8,["modelValue"]),o(b,{modelValue:D.preventOverlapAfterResizing,"onUpdate:modelValue":e[31]||(e[31]=a=>D.preventOverlapAfterResizing=a),"label-color":"base"},{default:l(()=>[...e[133]||(e[133]=[n("Prevent Overlap AFTER Resizing",-1)])]),_:1},8,["modelValue"])])]),"code-html":l(()=>[...e[136]||(e[136]=[n(`<vue-cal
  :events="events"
  editable-events
  @event-drop="onEventDrop"
  @event-resize="onEventResize"
  @event-resize-end="onEventResizeEnd">
</vue-cal>`,-1)])]),"code-js":l(()=>[e[137]||(e[137]=n(`const events = [
  {
    start: new Date(new Date().setHours(11, 0, 0, 0)),
    end: new Date(new Date().setHours(13, 0, 0, 0)),
    title: 'Event 1'
  },
  ...
]
`,-1)),D.preventOverlapOnDrop?(i(),d(u,{key:0},[n(`
const onEventDrop = ({ e, event, cell, overlaps }) => {
 return !overlaps.length
}
`)],64)):(i(),d(u,{key:1},[],64)),D.preventOverlapWhileResizing?(i(),d(u,{key:2},[n(`
const onEventResize = ({ e, event, overlaps }) => {
 return !overlaps.length
}
`)],64)):(i(),d(u,{key:3},[],64)),D.preventOverlapAfterResizing?(i(),d(u,{key:4},[n(`
const onEventResizeEnd = ({ e, event, overlaps }) => {
 return !overlaps.length
}
`)],64)):(i(),d(u,{key:5},[],64))]),default:l(()=>[o(p(x),{events:D.events,"editable-events":"",onEventDrop:D.onEventDrop,onEventResize:D.onEventResize,onEventResizeEnd:D.onEventResizeEnd,"time-from":540,"time-to":900,dark:p(E).darkMode,style:{height:"331px"}},null,8,["events","onEventDrop","onEventResize","onEventResizeEnd","dark"])]),_:1}),o(z,{title:"Events Reactivity",anchor:"events-reactivity"},{desc:l(()=>[...e[138]||(e[138]=[t("p",null,[n("The events are reactive and will update when the external data changes."),t("br"),n(`
For instance, in this example, the events are changing their background color every second from
the external array and the calendar will keep the events up to date.`),t("br"),n(`
Note that `),t("code",null,"backgroundColor"),n(` is a special event property that Vue Cal parses to apply to
the events.`)],-1),t("p",null,null,-1)])]),"code-html":l(()=>[...e[139]||(e[139]=[n(`<vue-cal
  :events="events"
  editable-events
  @ready="onReady">
</vue-cal>`,-1)])]),"code-js":l(()=>[...e[140]||(e[140]=[n(`const events = [
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
`,-1)])]),"code-css":l(()=>[...e[141]||(e[141]=[n(`.vuecal__event {transition: background-color 1s;}
`,-1)])]),default:l(()=>[o(p(x),{views:{days:{cols:3,rows:1}},view:"days","views-bar":!1,events:M.events,"editable-events":"",onReady:M.onReady,"time-from":540,"time-to":900,dark:p(E).darkMode},null,8,["events","onReady","dark"])]),_:1})],64)}}};export{Pe as default};
