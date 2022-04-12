"use strict";(self["webpackChunkvue_cal"]=self["webpackChunkvue_cal"]||[]).push([[674],{53618:function(e,t,n){n.r(t),n.d(t,{DragAndDrop:function(){return p}});var i=n(4367);n(82526),n(47941);function a(e,t){if(null==e)return{};var n,i,a={},l=Object.keys(e);for(i=0;i<l.length;i++)n=l[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}function l(e,t){if(null==e)return{};var n,i,l=a(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var r=n(76133),u=n(92751),c=n(23796),s=(n(38862),n(26699),n(32023),n(69826),n(41539),n(74916),n(23123),n(57327),["_eid","start","end","duration"]),v=["start","end"],o=800,d=null,h=null,g={id:null,date:null},f=!1,_=!0,m={el:null,cell:null,timeout:null},T={_eid:null,fromVueCal:null,toVueCal:null},p=function(){function e(t){(0,r.Z)(this,e),(0,c.Z)(this,"_vuecal",void 0),this._vuecal=t}return(0,u.Z)(e,[{key:"_getEventStart",value:function(e){var t=this._vuecal,n=t.timeStep,i=t.timeCellHeight,a=t.timeFrom,l=t.utils,r=l.cell.getPosition(e),u=r.y;return u-=1*e.dataTransfer.getData("cursor-grab-at"),Math.round(u*n/parseInt(i)+a)}},{key:"_updateEventStartEnd",value:function(e,t,n,i){var a=1*n.duration||t.endTimeMinutes-t.startTimeMinutes,l=Math.max(this._getEventStart(e),0);if(this._vuecal.snapToTime){var r=l+this._vuecal.snapToTime/2;l=r-r%this._vuecal.snapToTime}t.startTimeMinutes=l,t.start=new Date(new Date(i).setMinutes(l)),t.endTimeMinutes=Math.min(l+a,1440),t.end=new Date(new Date(i).setMinutes(t.endTimeMinutes))}},{key:"eventDragStart",value:function(e,t){if(3===e.target.nodeType)return e.preventDefault();e.dataTransfer.dropEffect="move",e.dataTransfer.setData("event",JSON.stringify(t)),e.dataTransfer.setData("cursor-grab-at",e.offsetY);var n=this._vuecal.domEvents.clickHoldAnEvent;setTimeout((function(){n._eid=null,clearTimeout(n.timeoutId),t.deleting=!1}),0),this._vuecal.domEvents.dragAnEvent._eid=t._eid,T._eid=t._eid,T.fromVueCal=this._vuecal._uid,t.dragging=!0,setTimeout((function(){return t.draggingStatic=!0}),0),f=!1,g={id:this._vuecal.view.id,date:this._vuecal.view.startDate},_=!0}},{key:"eventDragEnd",value:function(e){this._vuecal.domEvents.dragAnEvent._eid=null,T._eid=null,e.dragging=!1,e.draggingStatic=!1;var t=T.fromVueCal,n=T.toVueCal;n&&t!==n&&this._vuecal.utils.event.deleteAnEvent(e),T.fromVueCal=null,T.toVueCal=null,f&&_&&g.id&&this._vuecal.switchView(g.id,g.date,!0)}},{key:"cellDragEnter",value:function(e,t,n){var i=this,a=e.currentTarget;if(!e.currentTarget.contains(e.relatedTarget)){if(a===m.el||!a.className.includes("vuecal__cell-content"))return!1;m.el&&(m.cell.highlighted=!1),m={el:a,cell:t,timeout:clearTimeout(m.timeout)},t.highlighted=!0,["years","year","month"].includes(this._vuecal.view.id)&&(m.timeout=setTimeout((function(){return i._vuecal.switchToNarrowerView(n)}),2e3))}}},{key:"cellDragOver",value:function(e,t,n,i){e.preventDefault(),t.highlighted=!0,(i||0===i)&&(t.highlightedSplit=i)}},{key:"cellDragLeave",value:function(e,t){e.preventDefault(),e.currentTarget.contains(e.relatedTarget)||(t.highlightedSplit=!1,m.cell===t&&(clearTimeout(m.timeout),m={el:null,cell:null,timeout:null},t.highlighted=!1))}},{key:"cellDragDrop",value:function(e,t,n,a){var r=this;e.preventDefault(),clearTimeout(m.timeout),m={el:null,cell:null,timeout:null};var u,c,o=JSON.parse(e.dataTransfer.getData("event")||"{}");if(T.fromVueCal!==this._vuecal._uid){o._eid,o.start,o.end;var d=o.duration,h=l(o,s);u=this._vuecal.utils.event.createAnEvent(n,d,(0,i.Z)((0,i.Z)({},h),{},{split:a}))}else if(u=this._vuecal.view.events.find((function(e){return e._eid===T._eid})),u||(u=this._vuecal.mutableEvents.find((function(e){return e._eid===T._eid})),c=!!u),!u){var g=o.endTimeMinutes-o.startTimeMinutes,f=(o.start,o.end,l(o,v));u=this._vuecal.utils.event.createAnEvent(n,g,(0,i.Z)((0,i.Z)({},f),{},{split:a}))}var p=u,w=p.start,D=p.split;this._updateEventStartEnd(e,u,o,n),c&&this._vuecal.addEventsToView([u]),u.dragging=!1,(a||0===a)&&(u.split=a),t.highlighted=!1,t.highlightedSplit=null,_=!1,T.toVueCal=this._vuecal._uid;var E=(0,i.Z)((0,i.Z)({event:this._vuecal.cleanupEvent(u),oldDate:w,newDate:u.start},(a||0===a)&&{oldSplit:D,newSplit:a}),{},{originalEvent:this._vuecal.cleanupEvent(o),external:!T.fromVueCal});this._vuecal.$emit("event-drop",E),this._vuecal.$emit("event-change",{event:E.event,originalEvent:E.originalEvent}),setTimeout((function(){T._eid&&r.eventDragEnd(u)}),300)}},{key:"viewSelectorDragEnter",value:function(e,t,n){var i=this;e.currentTarget.contains(e.relatedTarget)||(n.highlightedControl=t,clearTimeout(d),d=setTimeout((function(){if(["previous","next"].includes(t))i._vuecal[t](),clearInterval(h),h=setInterval(i._vuecal[t],o);else if("today"===t){var e;clearInterval(h),i._vuecal.view.id.includes("year")&&(e=i._vuecal.enabledViews.filter((function(e){return!e.includes("year")}))[0]),i._vuecal.switchView(e||i._vuecal.view.id,new Date((new Date).setHours(0,0,0,0)),!0)}else i._vuecal.switchView(t,null,!0);f=!0}),o))}},{key:"viewSelectorDragLeave",value:function(e,t,n){e.currentTarget.contains(e.relatedTarget)||n.highlightedControl===t&&(n.highlightedControl=null,d&&(d=clearTimeout(d)),h&&(h=clearInterval(h)))}}]),e}()}}]);