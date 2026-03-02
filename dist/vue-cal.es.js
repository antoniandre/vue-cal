import { computed as Y, reactive as be, watch as De, toRefs as bt, ref as ue, onBeforeUnmount as Xe, nextTick as Be, inject as Pe, openBlock as O, createElementBlock as j, renderSlot as H, unref as M, Fragment as de, renderList as we, normalizeClass as pe, createCommentVNode as te, createElementVNode as he, createVNode as He, Transition as Ue, withCtx as N, createBlock as Se, resolveDynamicComponent as xe, mergeProps as ie, toHandlers as Ie, normalizeProps as ae, onMounted as Ze, toDisplayString as ce, createTextVNode as Ge, withModifiers as et, normalizeStyle as $e, TransitionGroup as tt, createSlots as Ce, useTemplateRef as Tt, useId as Mt, useAttrs as Et, provide as nt, guardReactiveProps as re } from "vue";
/**
  * vue-cal v5.0.1-rc.36
  * (c) 2024-2026 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const ge = {
  texts: {
    weekDays: Array(7).fill(""),
    weekDaysShort: [],
    months: Array(12).fill(""),
    years: "",
    year: "",
    month: "",
    week: "",
    day: "",
    today: "",
    noEvent: "",
    allDay: "",
    deleteEvent: "",
    createEvent: "",
    dateFormat: "dddd MMMM D, YYYY",
    am: "am",
    pm: "pm",
    truncations: !0
  },
  availableViews: {
    day: { cols: 1, rows: 1 },
    days: { cols: 10, rows: 1 },
    week: { cols: 7, rows: 1 },
    month: { cols: 7, rows: 6 },
    year: { cols: 4, rows: 3 },
    years: { cols: 5, rows: 5 }
    // Arbitrary range of quarters of century (25y).
  }
}, Yt = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], qe = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], St = qe.reduce((y, t, c) => (y[t] = c || 7, y), {}), Ct = (y, t, c) => {
  const { dateUtils: r } = y, g = !1, V = Y(() => {
    if (C.value[t.view]) return t.view;
    const a = t.datePicker ? "month" : "week", h = t.view || a;
    return C.value[h] ? h : (console.warn(
      `Vue Cal: the provided or default view \`${h}\` is either invalid or not in the list of available views. The first available view will be chosen: \`${Object.keys(C.value)[0]}\`.`
    ), Object.keys(C.value)[0]);
  }), I = Y(() => t.sm && !t.xs), d = Y(() => t.xs || t.datePicker), A = Y(() => t.clickToNavigate || t.datePicker && t.clickToNavigate !== !1), Z = Y(() => {
    const a = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, h = (k) => k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [k, n] of Object.entries(c)) {
      const [W, G, J] = k.match(/^on(Cell|Event)(.+)$/) || [];
      W && (a[G.toLowerCase()][h(J).replace(/^-+|-+$/g, "")] = n);
    }
    return a;
  }), L = Y(() => {
    var h;
    const a = {};
    return t.hideWeekends && (a[6] = !0) && (a[7] = !0), (h = t.hideWeekdays) != null && h.length && t.hideWeekdays.forEach((k) => a[St[k]] = !0), a;
  }), o = Y(() => t.hideWeekends || L.value[6] && L.value[7]), C = Y(() => {
    const a = t.datePicker;
    let h = 0, k = {};
    const n = t.views;
    if (a && !n) return {
      month: { ...ge.availableViews.month },
      year: { ...ge.availableViews.year },
      years: { ...ge.availableViews.years }
    };
    if (n)
      Array.isArray(n) ? k = n.reduce((W, G) => (typeof G == "string" && ge.availableViews[G] ? W[G] = ge.availableViews[G] : h++, W), {}) : typeof n == "object" && (k = Object.entries(n).reduce((W, [G, J]) => {
        const { cols: ne, rows: U } = ge.availableViews[G];
        return W[G] = { cols: J.cols || ne, rows: J.rows || U }, W;
      }, {})), h && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(k).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), k = { ...ge.availableViews });
    else if (k = { ...ge.availableViews }, t.horizontal) {
      const { days: W, week: G } = ge.availableViews;
      k.days = { cols: W.rows, rows: W.cols }, k.week = { cols: G.rows, rows: G.cols };
    }
    return k;
  }), X = Y(() => t.datePicker ? "month" : C.value.week ? "week" : Object.keys(C.value)[0]), v = Y(() => {
    if (typeof t.selectedDate == "string") return r.stringToDate(t.selectedDate);
    if (t.selectedDate instanceof Date) return t.selectedDate;
    t.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", t.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), f = Y(() => {
    if (!t.disableDays) return [];
    const a = [];
    if (Array.isArray(t.disableDays))
      for (let h of t.disableDays) {
        let k = h;
        typeof h == "string" ? k = r.stringToDate(h) : h instanceof Date && (h = r.formatDate(h, "YYYY-MM-DD")), k instanceof Date && !isNaN(k.getTime()) ? a.push(h) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", h);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", t.disableDays);
    return a;
  }), D = Y(() => {
    let a = null;
    return t.minDate && typeof t.minDate == "string" ? a = r.stringToDate(t.minDate) : t.minDate && t.minDate instanceof Date && (a = t.minDate), (a == null ? void 0 : a.getTime()) || null;
  }), s = Y(() => {
    let a = null;
    return t.maxDate && typeof t.maxDate == "string" ? a = r.stringToDate(t.maxDate) : t.maxDate && t.maxDate instanceof Date && (a = t.maxDate), (a == null ? void 0 : a.getTime()) || null;
  }), R = Y(() => {
    var k;
    const { view: a } = y;
    return t.schedules.length && (a.isDay || a.isDays || a.isWeek) && ((k = t.schedules) == null ? void 0 : k.map((n, W) => ({ ...n, id: n.id ?? W + 1 }))) || void 0;
  }), e = Y(() => {
    const a = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return t.editableEvents === !0 ? a : t.editableEvents === !1 ? Object.keys(a).map((h) => a[h] = !1) : { ...a, ...t.editableEvents };
  }), _ = Y(() => {
    const { view: a } = y, { eventCount: h } = t;
    return (Array.isArray(h) ? h.includes(a.id) : h) && (a.isMonth && !t.eventsOnMonthView || a.isYear);
  }), P = Y(() => {
    const { view: a } = y;
    return t.allDayEvents && t.time && (a.isDay || a.isDays || a.isWeek);
  }), $ = Y(() => {
    const { view: a } = y;
    return t.horizontal && (a.isDay || a.isDays || a.isWeek);
  }), E = Y(() => t.timeAtCursor && t.time), u = async (a) => {
    var k;
    let h = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((n) => n.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((n) => n.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((n) => n.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((n) => n.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((n) => n.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((n) => n.default), "../i18n/da.json": () => import("./i18n/da.js").then((n) => n.default), "../i18n/de.json": () => import("./i18n/de.js").then((n) => n.default), "../i18n/el.json": () => import("./i18n/el.js").then((n) => n.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((n) => n.default), "../i18n/en-us.json": () => Promise.resolve().then(() => Ht).then((n) => n.default), "../i18n/es.json": () => import("./i18n/es.js").then((n) => n.default), "../i18n/et.json": () => import("./i18n/et.js").then((n) => n.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((n) => n.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((n) => n.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((n) => n.default), "../i18n/he.json": () => import("./i18n/he.js").then((n) => n.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((n) => n.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((n) => n.default), "../i18n/id.json": () => import("./i18n/id.js").then((n) => n.default), "../i18n/is.json": () => import("./i18n/is.js").then((n) => n.default), "../i18n/it.json": () => import("./i18n/it.js").then((n) => n.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((n) => n.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((n) => n.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((n) => n.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((n) => n.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((n) => n.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((n) => n.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((n) => n.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((n) => n.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((n) => n.default), "../i18n/no.json": () => import("./i18n/no.js").then((n) => n.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((n) => n.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((n) => n.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((n) => n.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((n) => n.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((n) => n.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((n) => n.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((n) => n.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((n) => n.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((n) => n.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((n) => n.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((n) => n.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((n) => n.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((n) => n.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((n) => n.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((n) => n.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((n) => n.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((n) => n.default) });
    {
      if (!h[`../i18n/${a}.json`]) {
        console.warn(`Vue Cal: the locale \`${a}\` does not exist. Falling back to \`en-us\`.`), a = "en-us";
        return;
      }
      h = await ((k = h[`../i18n/${a}.json`]) == null ? void 0 : k.call(h));
    }
    y.texts = Object.assign(y.texts, Object.assign({ ...ge.texts }, h)), r.updateTexts(y.texts);
  }, b = be(t.events || []);
  return De(
    [() => t.events, () => {
      var a;
      return (a = t.events) == null ? void 0 : a.length;
    }],
    ([a]) => b.splice(0, b.length, ...a || [])
  ), De(() => t.locale, (a) => u(a || "en-us")), (t.locale || !y.texts.today) && u(t.locale || "en-us"), {
    ...bt(t),
    events: b,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: Z,
    defaultView: X,
    availableViews: C,
    disableDays: f,
    ready: g,
    sm: I,
    xs: d,
    clickToNavigate: A,
    hideWeekdays: L,
    hideWeekends: o,
    minTimestamp: D,
    maxTimestamp: s,
    schedules: R,
    selectedDate: v,
    editableEvents: e,
    showCellEventCount: _,
    allDayEvents: P,
    horizontal: $,
    timeAtCursor: E,
    view: V,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(L.value).length;
    },
    get size() {
      return d.value ? "xs" : I.value ? "sm" : "lg";
    },
    loadTexts: u
  };
}, Oe = (y, t) => {
  const c = t.timeTo - t.timeFrom;
  return (y - t.timeFrom) * 100 / c;
}, ze = (y, t) => {
  const c = t.timeTo - t.timeFrom;
  return ~~(y * c / 100 + t.timeFrom);
}, Ke = (y, t) => {
  const c = t.clientHeight;
  return y * 100 / c;
}, Ne = be({ id: null, date: null });
let at = !1, Je = !0;
const _e = be({ el: null, cell: null, timeout: null }), ke = be({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function zt(y) {
  const { config: t, view: c, eventsManager: r, emit: g, uid: V, dateUtils: I } = y, d = (D) => {
    var E;
    const s = t.horizontal, { clientX: R, clientY: e } = ((E = D.touches) == null ? void 0 : E[0]) || D, { top: _, left: P } = D.currentTarget.getBoundingClientRect(), $ = ~~D.dataTransfer.getData("cursor-grab-at");
    if (s) {
      const u = R - P - $;
      return ze(u * 100 / D.currentTarget.clientWidth, t);
    } else {
      const u = e - _ - $;
      return ze(Ke(u, D.currentTarget), t);
    }
  }, A = (D, s, R) => {
    const e = s.duration || Z(s.start, s.end) || t.timeStep;
    let _ = Math.max(d(D), 0);
    if (t.snapToInterval) {
      const u = _ + t.snapToInterval / 2;
      _ = u - u % t.snapToInterval;
    }
    const P = new Date(new Date(R).setMinutes(_)), $ = Math.min(_ + e, 1440), E = new Date(new Date(R).setMinutes($));
    return { start: P, end: E };
  }, Z = (D, s) => Math.round((s - D) / 6e4);
  return {
    eventDragStart: (D, s) => {
      if (D.target.nodeType === 3 || y.touch.isResizingEvent) return D.preventDefault();
      D.dataTransfer.effectAllowed = "move", D.dataTransfer.dropEffect = "move";
      const R = { ...s, _: { id: s._.id, duration: Z(s.start, s.end) } };
      try {
        D.dataTransfer.setData("text/plain", ""), D.dataTransfer.setData("event", JSON.stringify(R)), D.dataTransfer.setData("cursor-grab-at", t.horizontal ? D.offsetX : D.offsetY);
      } catch (_) {
        return console.warn("Vue Cal: Failed to set drag data:", _), D.preventDefault();
      }
      ke.eventId = s._.id, ke.fromVueCal = V, g("event-drag-start", {
        e: D,
        event: s
      });
      const e = D.target.closest(".vuecal__event");
      e.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        e.classList.add("vuecal__event--dragging-original"), e.classList.remove("vuecal__event--dragging-ghost");
      }, 0), at = !1, Object.assign(Ne, { id: c.id, date: c.firstCellDate }), Je = !0, y.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (D, s) => {
      ke.eventId = null, D.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: R, toVueCal: e } = ke;
      e && R !== e && r.deleteEvent(s._.id, 3), at && Je && Ne.id && c.switchView(Ne.id, Ne.date, !0), g("event-drag-end", {
        e: D,
        event: s,
        external: ke.fromVueCal !== V
      }), ke.fromVueCal = null, ke.toVueCal = null, y.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (D, s) => {
      const { start: R } = s, e = D.currentTarget;
      if (!D.currentTarget.contains(D.relatedTarget)) {
        if (e === _e.el || !e.className.includes("vuecal__cell-content")) return !1;
        _e.el && (_e.cell.highlighted = !1), Object.assign(_e, { el: e, cell: s, timeout: clearTimeout(_e.timeout) }), s.highlighted = !0, ["years", "year", "month"].includes(c.id) && (_e.timeout = setTimeout(() => y.switchToNarrowerView(R), 2e3));
      }
    },
    cellDragOver: (D, s) => {
      const { start: R, schedule: e } = s;
      D.preventDefault(), s.highlighted = !0, (e || e === 0) && (s.highlightedSchedule = e);
    },
    cellDragLeave: (D, s) => {
      D.preventDefault(), !D.currentTarget.contains(D.relatedTarget) && (s.highlightedSchedule = !1, _e.cell === s && (clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null }), s.highlighted = !1));
    },
    cellDragDrop: async (D, s, R = !1) => {
      var h, k, n;
      D.preventDefault(), clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null });
      const e = JSON.parse(D.dataTransfer.getData("event") || "{}");
      e.start && (e.start = new Date(e.start)), e.end && (e.end = new Date(e.end));
      let _, P, $;
      R ? (P = new Date(s.start), $ = new Date(s.end)) : { start: P, end: $ } = A(D, e, s.start);
      const { schedule: E } = ((h = D.target.closest("[data-schedule]")) == null ? void 0 : h.dataset) || {};
      let u = () => {
      };
      ke.fromVueCal === V ? (_ = r.getEvent(e._.id), _ && (_._.dragging = !1, u = (W) => {
        if (_.start = P, _.end = $, _.allDay = R, E !== void 0 && (_.schedule = ~~E), W && typeof W == "object") {
          const { _: G, ...J } = W;
          Object.assign(_, J);
        }
      })) : (_ = {
        ...e,
        start: P,
        end: $,
        ...E !== void 0 && { schedule: ~~E },
        _: { id: ((k = e._) == null ? void 0 : k.id) || e.id, duration: Z(P, $) },
        getOverlappingEvents: () => r.getEventsInRange(P, $, { schedule: ~~E })
      }, u = (W) => {
        if (_ = r.createEvent(_), W && typeof W == "object") {
          const { _: G, ...J } = W;
          Object.assign(_, J);
        }
      });
      let b = !0;
      const { drop: a } = (n = t.eventListeners) == null ? void 0 : n.event;
      a && (b = await a({
        e: D,
        event: { ..._, start: P, end: $, schedule: ~~E },
        overlaps: _.getOverlappingEvents({ start: P, end: $, schedule: ~~E }),
        cell: s,
        external: ke.fromVueCal !== V
      })), b !== !1 && u(b), s.highlighted = !1, s.highlightedSchedule = null, Je = !1, ke.toVueCal = V, g("event-dropped", {
        e: D,
        cell: s,
        event: _,
        originalEvent: e,
        external: ke.fromVueCal !== V
      });
    }
  };
}
const lt = (y, t) => {
  let c, r, g, V = {}, I = {};
  const d = ue(y), A = () => {
    d.value.today || (d.value = t), Date.prototype.addDays = function(l) {
      return C(this, l || 0);
    }, Date.prototype.subtractDays = function(l) {
      return X(this, l || 0);
    }, Date.prototype.addHours = function(l) {
      return v(this, l || 0);
    }, Date.prototype.subtractHours = function(l) {
      return f(this, l || 0);
    }, Date.prototype.addMinutes = function(l) {
      return D(this, l || 0);
    }, Date.prototype.subtractMinutes = function(l) {
      return s(this, l || 0);
    }, Date.prototype.getWeek = function() {
      return e(this);
    }, Date.prototype.isToday = function() {
      return _(this);
    }, Date.prototype.isLeapYear = function() {
      return E(this);
    }, Date.prototype.format = function(l = "YYYY-MM-DD") {
      return W(this, l);
    }, Date.prototype.formatTime = function(l = "HH:mm") {
      return J(this, l);
    };
  }, Z = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, L = (l) => {
    d.value = l, Date.prototype.subtractDays && A();
  }, o = () => (r !== (/* @__PURE__ */ new Date()).getDate() && (c = /* @__PURE__ */ new Date(), r = c.getDate(), g = `${c.getFullYear()}-${c.getMonth()}-${c.getDate()}`), g), C = (l, T) => {
    const p = new Date(l.valueOf());
    return p.setDate(p.getDate() + T), p;
  }, X = (l, T) => {
    const p = new Date(l.valueOf());
    return p.setDate(p.getDate() - T), p;
  }, v = (l, T) => {
    const p = new Date(l.valueOf());
    return p.setHours(p.getHours() + T), p;
  }, f = (l, T) => {
    const p = new Date(l.valueOf());
    return p.setHours(p.getHours() - T), p;
  }, D = (l, T) => {
    const p = new Date(l.valueOf());
    return p.setMinutes(p.getMinutes() + T), p;
  }, s = (l, T) => {
    const p = new Date(l.valueOf());
    return p.setMinutes(p.getMinutes() - T), p;
  }, R = (l, T) => {
    const p = (K) => {
      const le = K % T;
      return le !== 0 && (K += le >= T / 2 ? T - le : -le), K;
    };
    if (typeof l == "number") return p(l);
    if (l instanceof Date) {
      let K = p(l.getMinutes());
      K >= 60 && (l.setHours(l.getHours() + 1), K = 0), l.setMinutes(K, 0, 0);
    }
  }, e = (l, T = !1) => {
    const p = new Date(Date.UTC(l.getFullYear(), l.getMonth(), l.getDate())), K = p.getUTCDay() || 7;
    p.setUTCDate(p.getUTCDate() + 4 - K);
    const le = new Date(Date.UTC(p.getUTCFullYear(), 0, 1));
    return Math.ceil(((p - le) / 864e5 + 1) / 7) + (T ? 1 : 0);
  }, _ = (l) => `${l.getFullYear()}-${l.getMonth()}-${l.getDate()}` === o(), P = (l, T) => {
    if (!l || !T) return console.warn(`Vue Cal: missing date${l ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (n(l)) {
      if (!n(T)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${T}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${l}\`.`);
    return l.getFullYear() === T.getFullYear() && l.getMonth() === T.getMonth() && l.getDate() === T.getDate();
  }, $ = (l, T, p) => n(l) ? l.getTime() >= T && l.getTime() <= p : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${l}\`.`), E = (l) => {
    const T = l.getFullYear();
    return !(T % 400) || T % 100 && !(T % 4);
  }, u = (l = null, T) => {
    const p = l && new Date(l.valueOf()) || /* @__PURE__ */ new Date(), K = T ? 7 : 6;
    return p.setDate(p.getDate() - (p.getDay() + K) % 7), p;
  }, b = (l) => l instanceof Date ? l : (l.length === 10 && (l += " 00:00"), new Date(l.replace(/-/g, "/"))), a = (l) => l.getHours() * 60 + l.getMinutes(), h = (l, T) => {
    typeof l == "string" && (l = l.replace(/-/g, "/")), typeof T == "string" && (T = T.replace(/-/g, "/")), l = new Date(l).setHours(0, 0, 0, 0), T = new Date(T).setHours(0, 0, 1, 0);
    const p = (new Date(T).getTimezoneOffset() - new Date(l).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((T - l - p) / (24 * 3600 * 1e3));
  }, k = (l, T, p) => Math.abs(l.getTime() - T.getTime()) <= p * 60 * 1e3, n = (l) => l && l instanceof Date && !isNaN(l), W = (l, T = "YYYY-MM-DD", p = null) => {
    if (p || (p = d.value), T || (T = "YYYY-MM-DD"), T === "YYYY-MM-DD") return G(l);
    V = {}, I = {};
    const K = {
      YYYY: () => se(l, p).YYYY,
      YY: () => se(l, p).YY(),
      M: () => se(l, p).M,
      MM: () => se(l, p).MM(),
      MMM: () => se(l, p).MMM(),
      MMMM: () => se(l, p).MMMM(),
      MMMMG: () => se(l, p).MMMMG(),
      D: () => se(l, p).D,
      DD: () => se(l, p).DD(),
      S: () => se(l, p).S(),
      d: () => se(l, p).d,
      dd: () => se(l, p).dd(),
      ddd: () => se(l, p).ddd(),
      dddd: () => se(l, p).dddd(),
      HH: () => ve(l, p).HH,
      H: () => ve(l, p).H,
      hh: () => ve(l, p).hh,
      h: () => ve(l, p).h,
      am: () => ve(l, p).am,
      AM: () => ve(l, p).AM,
      mm: () => ve(l, p).mm,
      m: () => ve(l, p).m,
      s: () => ve(l, p).s
    };
    return T.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (le, me) => {
      const i = K[me.replace(/\{|\}/g, "")];
      return i !== void 0 ? i() : me;
    });
  }, G = (l) => {
    const T = l.getMonth() + 1, p = l.getDate();
    return `${l.getFullYear()}-${T < 10 ? "0" : ""}${T}-${p < 10 ? "0" : ""}${p}`;
  }, J = (l, T = "HH:mm", p = null, K = !1) => {
    let le = !1;
    if (K) {
      const [z, S, w] = [l.getHours(), l.getMinutes(), l.getSeconds()];
      z + S + w === 141 && (le = !0);
    }
    if (l instanceof Date && T === "HH:mm") return le ? "24:00" : ne(l);
    I = {}, p || (p = d.value);
    const me = ve(l, p), i = T.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (z, S) => {
      const w = me[S.replace(/\{|\}/g, "")];
      return w !== void 0 ? w : S;
    });
    return le ? i.replace("23:59", "24:00") : i;
  }, ne = (l) => {
    const T = l.getHours(), p = l.getMinutes();
    return `${(T < 10 ? "0" : "") + T}:${(p < 10 ? "0" : "") + p}`;
  }, U = (l) => {
    const T = Math.floor(l / 60).toString().padStart(2, 0), p = (l % 60).toString().padStart(2, 0);
    return `${T}:${p}`;
  }, oe = (l) => {
    if (l > 3 && l < 21) return "th";
    switch (l % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }, se = (l, T) => {
    if (V.D) return V;
    const p = l.getFullYear(), K = l.getMonth() + 1, le = l.getDate(), i = (l.getDay() - 1 + 7) % 7;
    return V = {
      // Year.
      YYYY: p,
      // 2024.
      YY: () => p.toString().substring(2),
      // 24.
      // Month.
      M: K,
      // 1 to 12.
      MM: () => K.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => T.months[K - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => T.months[K - 1],
      // January to December.
      MMMMG: () => (T.monthsGenitive || T.months)[K - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: le,
      // 1 to 31.
      DD: () => le.toString().padStart(2, 0),
      // 01 to 31.
      S: () => oe(le),
      // st, nd, rd, th.
      // Day of the week.
      d: i + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => T.weekDaysShort.length ? T.weekDaysShort[i] : T.weekDays[i][0],
      // M to S.
      ddd: () => T.weekDaysShort.length ? T.weekDaysShort[i] : T.weekDays[i].substr(0, 3),
      // Mon to Sun.
      dddd: () => T.weekDays[i]
      // Monday to Sunday.
    }, V;
  }, ve = (l, T) => {
    if (I.am) return I;
    let p, K, le;
    l instanceof Date ? (p = l.getHours(), K = l.getMinutes(), le = l.getSeconds()) : (p = Math.floor(l / 60), K = Math.floor(l % 60));
    const me = p % 12 ? p % 12 : 12, i = (T || { am: "am", pm: "pm" })[p === 24 || p < 12 ? "am" : "pm"];
    return I = {
      H: p,
      h: me,
      HH: p.toString().padStart(2, 0),
      hh: me.toString().padStart(2, 0),
      am: i,
      AM: i.toUpperCase(),
      m: K,
      mm: K.toString().padStart(2, 0),
      s: le
    }, I;
  };
  return {
    addDatePrototypes: A,
    removeDatePrototypes: Z,
    updateTexts: L,
    addDays: C,
    subtractDays: X,
    addHours: v,
    subtractHours: f,
    addMinutes: D,
    subtractMinutes: s,
    snapToInterval: R,
    getWeek: e,
    isToday: _,
    isSameDate: P,
    isInRange: $,
    isLeapYear: E,
    getPreviousFirstDayOfWeek: u,
    stringToDate: b,
    dateToMinutes: a,
    countDays: h,
    datesInSameTimeStep: k,
    isValid: n,
    formatDate: W,
    formatDateLite: G,
    formatTime: J,
    formatTimeLite: ne,
    formatMinutes: U
  };
}, Vt = (y) => {
  const { dateUtils: t, config: c } = y;
  let r = 0;
  const g = Y(() => {
    var P, $, E, u, b;
    const e = {
      // A map of events indexed by { YYYY: { MM: { DD: [] } } }.
      // Each year contains a map of 12 months starting from 1, each containing a map of days starting from 1, each containing an array of event IDs.
      byYear: {},
      byDate: {},
      // A map of single-day events indexed by date.
      recurring: [],
      // An array of events IDs that are recurring.
      multiday: [],
      // An array of events IDs that are multiday.
      byId: {}
      // A map of all the events indexed by ID for fast lookup. Each event is the original full event object.
    }, _ = c.events.slice().sort((a, h) => a.start - h.start < 0 ? -1 : 1);
    for (let a of _) {
      const h = typeof a.start == "string" || typeof a.end == "string", k = !((P = a._) != null && P.register) || !a.isOverlapping || !a.delete;
      let n = !1;
      if (!h && (($ = a._) != null && $.cachedStart) && ((E = a._) != null && E.cachedEnd) && (n = a.start.getTime() !== ((u = a._) == null ? void 0 : u.cachedStart) || a.end.getTime() !== ((b = a._) == null ? void 0 : b.cachedEnd)), h || k || n) {
        if (!V(a)) continue;
        I(a), a._.cachedStart = a.start.getTime(), a._.cachedEnd = a.end.getTime();
      }
      if (e.byId[a._.id] = a, a.recurring)
        e.recurring.push(a._.id);
      else if (!t.isSameDate(a.start, new Date(a.end.getTime() - 1)))
        a._.multiday = c.multidayEvents, c.multidayEvents ? e.multiday.push(a._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), a.end = new Date(new Date(a.start).setHours(23, 59, 59, 999)), I(a)), e.byDate[a._.startFormatted] || (e.byDate[a._.startFormatted] = []), e.byDate[a._.startFormatted].push(a._.id);
      else {
        e.byDate[a._.startFormatted] || (e.byDate[a._.startFormatted] = []), e.byDate[a._.startFormatted].push(a._.id);
        const W = a._.startFormatted.substring(0, 4), G = a._.startFormatted.substring(5, 7), J = a._.startFormatted.substring(8, 10);
        e.byYear[W] || (e.byYear[W] = {}), e.byYear[W][G] || (e.byYear[W][G] = {}), e.byYear[W][G][J] || (e.byYear[W][G][J] = []), e.byYear[W][G][J].push(a._.id);
      }
    }
    return e;
  }), V = (e) => !e.start || !e.end ? (console.error("Vue Cal: Event is missing start or end date", e), !1) : (typeof e.start == "string" && (e.start = t.stringToDate(e.start)), typeof e.end == "string" && (e.end = t.stringToDate(e.end)), e.start.setSeconds(0, 0), e.end.getSeconds() === 59 ? e.end.setMinutes(e.end.getMinutes() + 1, 0, 0) : e.end.setSeconds(0, 0), isNaN(e.start) || isNaN(e.end) || e.end.getTime() < e.start.getTime() ? (isNaN(e.start) ? console.error(`Vue Cal: invalid start date for event "${e.title}".`, e.start) : isNaN(e.end) ? console.error(`Vue Cal: invalid end date for event "${e.title}".`, e.end) : console.error(`Vue Cal: invalid event dates for event "${e.title}". The event ends before it starts.`, e.start, e.end), !1) : !0), I = (e) => {
    e._ || (e._ = {}), e._.id = e._.id || ++r, e._.multiday = !t.isSameDate(e.start, new Date(e.end.getTime() - 1)), e._.startFormatted = t.formatDate(e.start), e._.endFormatted = t.formatDate(e.end), e._.startMinutes = ~~t.dateToMinutes(e.start), e._.endMinutes = ~~t.dateToMinutes(e.end);
    const _ = e.start.getHours(), P = e.start.getMinutes().toString().padStart(2, 0), $ = e.end.getHours(), E = e.end.getMinutes().toString().padStart(2, 0);
    e._.startTimeFormatted24 = `${_.toString().padStart(2, 0)}:${P}`, e._.startTimeFormatted12 = `${_ % 12 || 12}${P ? `:${P}` : ""} ${_ < 12 ? "AM" : "PM"}`, e._.endTimeFormatted24 = `${$.toString().padStart(2, 0)}:${E}`, e._.endTimeFormatted12 = `${$ % 12 || 12}${E ? `:${E}` : ""} ${$ < 12 ? "AM" : "PM"}`, e._.duration = Math.abs(~~((e.end - e.start) / 6e4)), e.delete || (e.delete = function(u) {
      return L(this._.id, u);
    }), e._.deleting === void 0 && (e._.deleting = !1), e._.deleted === void 0 && (e._.deleted = !1), e.isOverlapping || (e.isOverlapping = function(u = null) {
      return this.getOverlappingEvents(u).length;
    }), e.getOverlappingEvents || (e.getOverlappingEvents = function(u = null) {
      var k;
      const b = (u == null ? void 0 : u.start) || this.start, a = (u == null ? void 0 : u.end) || this.end, h = (k = c.schedules) != null && k.length ? ~~((u == null ? void 0 : u.schedule) || this.schedule) : null;
      return C(b, a, { excludeIds: [this._.id], schedule: h });
    }), e._.register || (e._.register = (u) => {
      e._.$el = u, e._.fireCreated && (y.emit("event-created", e), delete e._.fireCreated);
    }), e._.unregister || (e._.unregister = () => {
      e._.$el = null, e._.register = null, e.isOverlapping = null, e.getOverlappingEvents = null, e.delete = null;
    });
  }, d = (e) => g.value.byId[e], A = (e) => {
    const _ = [];
    for (const { start: P, end: $ } of e) {
      const E = C(P, $);
      E.length && _.push(...E);
    }
    return _;
  }, Z = (e) => {
    if (!e.start || !e.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return c.snapToInterval && (t.snapToInterval(e.start, c.snapToInterval), t.snapToInterval(e.end, c.snapToInterval)), e = { ...e }, e._ || (e._ = {}), e._.id = ++r, e._.fireCreated = !0, c.events.push(e), e;
  }, L = async (e, _ = 0) => {
    var b, a;
    if (!e) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let P = typeof e == "string" || !isNaN(e) ? e : null;
    const $ = typeof e == "object" ? Object.entries(e) : null;
    if ($) {
      const [h, k] = $[0];
      P = (b = c.events.find((n) => n[h] === k)) == null ? void 0 : b._.id;
    }
    if (!c.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!P) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const E = c.events.findIndex((h) => h._.id === P);
    if (E === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${P}\`.`);
    const u = c.events[E];
    if (u.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${P}\` since it was explicitely set to \`delete: false\`.`);
    switch (_) {
      case 0:
        u._.deleting ? c.events.splice(E, 1) : u._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        u._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        u._.deleted = !0, c.events[E]._.deleted = !0, (a = u._.$el) == null || a.dispatchEvent(new CustomEvent("event-deleted", { detail: u._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        c.events.splice(E, 1), y.emit("update:events", c.events), y.emit("event-delete", u);
        break;
    }
    return !0;
  }, o = (e, _, P) => {
    const $ = c.allDayEvents ? { allDay: P } : {}, E = C(e, _, { background: !1, ...$ });
    if (!E.length) return { cellOverlaps: {}, longestStreak: 0 };
    const u = {};
    let b = [], a = 0;
    E.sort((h, k) => h.start - k.start || h.end - h.start - (k.end - k.start));
    for (const h of E) {
      const k = h._.id;
      u[k] || (u[k] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), b = b.filter((ne) => ne.end > h.start);
      const n = b.filter((ne) => {
        var oe;
        return (!((oe = c.schedules) != null && oe.length) || h.schedule === ne.schedule) && ne.start < h.end;
      }), W = new Set(n.map((ne) => {
        var U;
        return ((U = u[ne._.id]) == null ? void 0 : U.position) ?? 0;
      }));
      let G = 0;
      for (; W.has(G); ) G++;
      u[k].position = G, b.push(h);
      const J = Math.max(1, ...n.map((ne) => {
        var U;
        return ((U = u[ne._.id]) == null ? void 0 : U.maxConcurrent) ?? 1;
      }));
      u[k].maxConcurrent = Math.max(n.length + 1, J);
      for (const ne of n)
        u[ne._.id].overlaps.add(k), u[k].overlaps.add(ne._.id), u[ne._.id].maxConcurrent = u[k].maxConcurrent;
      a = Math.max(a, u[k].maxConcurrent);
    }
    for (const h in u) u[h].overlaps = [...u[h].overlaps];
    return { cellOverlaps: u, longestStreak: a };
  }, C = (e, _, { excludeIds: P = [], schedule: $ = null, background: E = !0, allDay: u = !1 } = {}) => {
    if (!Object.keys(g.value.byId).length) return [];
    const b = e.getFullYear(), a = _.getFullYear(), h = e.getMonth() + 1, k = _.getMonth() + 1, n = e.getDate(), W = _.getDate();
    e.getTime(), _.getTime();
    const G = new Date(e).setHours(0, 0, 0, 0), J = new Date(_).setHours(23, 59, 59, 999), ne = new Set(P), U = [];
    if (Object.keys(g.value.byId).length <= 100) {
      for (const oe of Object.values(g.value.byId))
        !oe || ne.has(oe._.id) || $ !== null && $ !== oe.schedule || E === !1 && oe.background || c.allDayEvents && (u && !oe.allDay || !u && oe.allDay) || oe.start.getTime() < J && oe.end.getTime() > G && U.push(oe);
      return U;
    }
    for (let oe = b; oe <= a; oe++) {
      const se = `${oe}`, ve = g.value.byYear[se];
      if (!ve) continue;
      const l = oe === b ? h : 1, T = oe === a ? k : 12;
      for (let p = l; p <= T; p++) {
        const K = String(p).padStart(2, "0"), le = ve[K];
        if (le)
          for (const me in le) {
            const i = +me;
            if (i > W || i < n) continue;
            const z = le[me];
            if (z != null && z.length)
              for (let S = 0; S < z.length; S++) {
                const w = g.value.byId[z[S]];
                !w || ne.has(w._.id) || $ !== null && $ !== w.schedule || E === !1 && w.background || c.allDayEvents && (u && !w.allDay || !u && w.allDay) || w.start.getTime() < J && w.end.getTime() > G && U.push(w);
              }
          }
      }
    }
    return U;
  }, X = (e, _, P) => {
    const $ = e.allDay || !c.time, E = $ ? new Date(e.start).setHours(0, 0, 0, 0) : e.start.getTime(), u = $ ? new Date(e.end).setHours(23, 59, 59, 999) : e.end.getTime(), b = $ ? new Date(_).setHours(0, 0, 0, 0) : _.getTime(), a = $ ? new Date(P).setHours(23, 59, 59, 999) : P.getTime();
    return u > b && E < a;
  }, v = be({
    isResizing: !1,
    fromResizer: !1,
    resizingEvent: null,
    resizingOriginalEvent: null,
    resizingLastAcceptedEvent: null,
    startX: 0,
    startY: 0,
    startPercentageX: 0,
    startPercentageY: 0,
    moveX: 0,
    moveY: 0,
    movePercentageX: 0,
    movePercentageY: 0,
    documentMouseX: 0,
    documentMouseY: 0,
    resizeStartDate: null,
    cellEl: null,
    schedule: null
  }), f = (e, _) => {
    var b;
    const P = v[c.horizontal ? "movePercentageX" : "movePercentageY"];
    let $ = ze(P, c);
    if ($ = Math.max(0, Math.min($, 1440)), c.snapToInterval) {
      const a = $ + c.snapToInterval / 2;
      $ = a - a % c.snapToInterval;
    }
    let E = e.start, u = new Date(_.getTime() + $ * 6e4);
    return v.moveX && ((b = y.touch) != null && b.currentHoveredCell) && v.cellEl && new Date(y.touch.currentHoveredCell.__vueParentComponent.props.start), u < v.resizeStartDate && (E = u, u = v.resizeStartDate), { newStart: E, newEnd: u };
  }, D = async (e) => {
    var $, E, u, b;
    const { clientX: _, clientY: P } = (($ = e.touches) == null ? void 0 : $[0]) || e;
    if (v.fromResizer && !v.resizingOriginalEvent) {
      v.resizingOriginalEvent = { ...v.resizingEvent, _: { ...v.resizingEvent._ } };
      const a = ((E = c.eventListeners) == null ? void 0 : E.event) || {};
      (u = a["resize-start"]) == null || u.call(a, { e, event: v.resizingEvent });
    }
    if (v.cellEl) {
      const { top: a, left: h, width: k, height: n } = v.cellEl.getBoundingClientRect();
      v.moveX = _ - h, v.moveY = P - a, v.movePercentageX = v.moveX * 100 / k, v.movePercentageY = v.moveY * 100 / n;
    }
    if (v.documentMouseX = _, v.documentMouseY = P, v.fromResizer && v.resizingEvent) {
      const a = v.cellEl.__vueParentComponent.props.start, { newStart: h, newEnd: k } = f(v.resizingEvent, a);
      let n = !0;
      const { resize: W } = ((b = c.eventListeners) == null ? void 0 : b.event) || {};
      W && (n = await W({
        e,
        event: { ...v.resizingEvent, start: h, end: k },
        overlaps: v.resizingEvent.getOverlappingEvents({ start: h, end: k })
      })), n !== !1 ? (v.resizingEvent.start = h, v.resizingEvent.end = k, v.resizingLastAcceptedEvent && (v.resizingLastAcceptedEvent = null), e.preventDefault()) : W && (v.resizingLastAcceptedEvent = { ...v.resizingEvent, _: { ...v.resizingEvent._ } });
    }
  }, s = async (e) => {
    var _, P, $, E;
    if ((_ = y.touch) != null && _.isResizingEvent && v.resizingEvent) {
      const u = v.cellEl.__vueParentComponent.props.start, { newStart: b, newEnd: a } = f(v.resizingEvent, u);
      let h = !0;
      const n = (((P = c.eventListeners) == null ? void 0 : P.event) || {})["resize-end"];
      n && (h = await n({
        e,
        event: v.resizingEvent,
        original: v.resizingOriginalEvent,
        // Original event details before resizing.
        overlaps: v.resizingEvent.getOverlappingEvents({ start: b, end: a })
      })), v.resizingEvent.start = h === !1 ? (v.resizingLastAcceptedEvent || v.resizingOriginalEvent).start : (($ = v.resizingLastAcceptedEvent) == null ? void 0 : $.start) || b, v.resizingEvent.end = h === !1 ? (v.resizingLastAcceptedEvent || v.resizingOriginalEvent).end : ((E = v.resizingLastAcceptedEvent) == null ? void 0 : E.end) || a, v.resizingEvent._.duration < 1 && (v.resizingEvent.start = v.resizingOriginalEvent.start, v.resizingEvent.end = v.resizingOriginalEvent.end), y.touch.isResizingEvent = !1, y.touch.currentHoveredCell = null;
    }
    document.removeEventListener(e.type === "touchend" ? "touchmove" : "mousemove", D, { passive: !v.fromResizer }), y.touch.isResizingEvent = !1, v.fromResizer = !1, v.resizingEvent = null, v.resizingOriginalEvent = null, v.resizingLastAcceptedEvent = null, v.startX = 0, v.startY = 0, v.moveX = 0, v.moveY = 0, v.startPercentageX = 0, v.startPercentageY = 0, v.movePercentageX = 0, v.movePercentageY = 0, v.documentMouseX = 0, v.documentMouseY = 0, v.cellEl = null, v.resizeStartDate = null, v.schedule = null;
  };
  return {
    events: g,
    resizeState: v,
    getEvent: d,
    getViewEvents: A,
    getCellOverlappingEvents: o,
    getEventsInRange: C,
    createEvent: Z,
    deleteEvent: L,
    isEventInRange: X,
    handleEventResize: (e, _, P) => {
      var E;
      const $ = ((E = e.touches) == null ? void 0 : E[0]) || e;
      if (v.fromResizer = !!$.target.closest(".vuecal__event-resizer"), v.fromResizer) {
        y.touch.isResizingEvent = !0;
        const u = P.getBoundingClientRect();
        v.startX = $.clientX - u.left, v.startY = $.clientY - u.top, v.startPercentageX = v.startX * 100 / u.width, v.startPercentageY = v.startY * 100 / u.height, v.cellEl = P.closest(".vuecal__cell"), v.resizeStartDate = _.start, v.resizingEvent = _, document.addEventListener(e.type === "touchstart" ? "touchmove" : "mousemove", D, { passive: !v.fromResizer }), document.addEventListener(e.type === "touchstart" ? "touchend" : "mouseup", s, { once: !0 });
      }
    }
  };
}, Ot = ({ config: y, dateUtils: t, emit: c, texts: r, eventsManager: g }, V) => {
  const { availableViews: I } = y, d = ue(y.view && I[y.view] ? y.view : y.defaultView), A = ue(y.selectedDate || null), Z = ue(/* @__PURE__ */ new Date()), L = ue(new Date(y.viewDate || Z.value));
  L.value.setHours(0, 0, 0, 0);
  const o = ue(new Date(L));
  let C = null;
  const X = Y(() => d.value === "month" ? o.value : E.value), v = Y(() => d.value === "month" ? new Date(o.value.getFullYear(), o.value.getMonth() + 1, 0, 23, 59, 59, 999) : b.value), f = Y(() => d.value === "week" ? t.getPreviousFirstDayOfWeek(E.value, y.startWeekOnSunday) : d.value === "month" ? E.value : X.value), D = Y(() => {
    if (d.value === "week") {
      const m = t.addDays(f.value, 7);
      return m.setMilliseconds(-1), m;
    }
    return d.value === "month" ? b.value : v.value;
  }), s = Y(() => {
    const m = Z.value.getTime();
    if (d.value === "week")
      return f.value.getTime() <= m && m <= D.value.getTime();
    const F = E.value.getTime(), ee = b.value.getTime();
    return F <= m && m <= ee;
  });
  function R() {
    Z.value = /* @__PURE__ */ new Date(), C = setTimeout(R, 60 * 1e3);
  }
  function e() {
    C = setTimeout(R, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), R();
  }
  const _ = Y(() => {
    if (!y.availableViews[d.value]) return 1;
    let m = y.availableViews[d.value].cols;
    return y.hasHiddenDays && ["week", "month"].includes(d.value) && (m -= y.hasHiddenDays), m;
  }), P = Y(() => {
    var m;
    return ((m = y.availableViews[d.value]) == null ? void 0 : m.rows) || 1;
  }), $ = Y(() => _.value * P.value), E = Y(() => {
    if (d.value === "month") {
      let m = o.value.getDay() || 7;
      return y.startWeekOnSunday && !y.hideWeekdays[7] && (m += 1), y.viewDayOffset && (m -= y.viewDayOffset), t.subtractDays(o.value, m - 1);
    }
    if (d.value === "week") {
      const m = "1234567".split("").filter((ee) => !Object.keys(y.hideWeekdays).includes(ee));
      let F = Math.min(...m);
      return y.startWeekOnSunday && !y.hideWeekdays[7] && (F = 1), y.viewDayOffset && (F += y.viewDayOffset), t.addDays(o.value, F - 1);
    }
    return o.value;
  }), u = Y(() => {
    const m = [], F = ["days", "week", "month"].includes(d.value);
    let ee = 0;
    for (let x = 0; x < $.value + ee; x++)
      switch (d.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const ye = t.addDays(E.value, x), Re = ye.getDay() || 7;
          if (F && y.hasHiddenDays && y.hideWeekdays[Re]) {
            ee++;
            continue;
          }
          const Ve = new Date(ye);
          Ve.setHours(23, 59, 59, 999), m.push({ start: ye, startFormatted: t.formatDate(ye), end: Ve });
          break;
        }
        case "year":
          m.push({
            start: new Date(E.value.getFullYear(), x, 1, 0, 0, 0, 0),
            end: new Date(E.value.getFullYear(), x + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          m.push({
            start: new Date(E.value.getFullYear() + x, 0, 1, 0, 0, 0, 0),
            end: new Date(E.value.getFullYear() + x + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return m;
  }), b = Y(() => u.value[u.value.length - 1].end), a = ue("right"), h = Y(() => {
    const m = Object.keys(y.availableViews);
    return m[m.indexOf(d.value) + 1];
  }), k = Y(() => {
    const m = Object.keys(y.availableViews);
    return m[m.indexOf(d.value) - 1];
  });
  function n(m, F, ee = !1) {
    if (!F || !F[m]) return m + 1;
    const x = F[m];
    return ee && typeof x == "string" ? x.substring(0, 3) : x;
  }
  function W(m, F, ee) {
    const { monthsArray: x, monthBeforeDay: ye, canTruncate: Re, xs: Ve } = ee, Me = m.getMonth(), Ee = m.getFullYear(), Ye = F.getMonth(), je = F.getFullYear(), We = Me !== Ye, $t = Ee !== je, Te = Re && (Ve || We), Le = m.getDate(), Ae = F.getDate();
    return $t ? ye ? `${n(Me, x, Te)} ${Le}, ${Ee} - ${n(Ye, x, Te)} ${Ae}, ${je}` : `${Le} ${n(Me, x, Te)} ${Ee} - ${Ae} ${n(Ye, x, Te)} ${je}` : We ? ye ? `${n(Me, x, Te)} ${Le} - ${n(Ye, x, Te)} ${Ae}, ${Ee}` : `${Le} ${n(Me, x, Te)} - ${Ae} ${n(Ye, x, Te)} ${Ee}` : ye ? `${n(Me, x, Te)} ${Le}-${Ae}, ${Ee}` : `${Le}-${Ae} ${n(Me, x, Te)} ${Ee}`;
  }
  const G = Y(() => {
    const { dateFormat: m, months: F, monthsGenitive: ee, week: x, truncations: ye } = r, Re = y.locale, Ve = ye !== !1, Me = m.indexOf("M") < m.indexOf("D"), Ee = ee && Re === "el" ? ee : F;
    switch (d.value) {
      case "day":
        return t.formatDate(E.value, m);
      case "days":
      case "week": {
        const Ye = {
          monthsArray: Ee,
          monthBeforeDay: Me,
          canTruncate: Ve,
          xs: y.xs
        };
        let je = W(E.value, b.value, Ye);
        if (d.value === "week") {
          const We = t.getWeek(
            E.value,
            y.startWeekOnSunday && !y.hideWeekdays[7]
          );
          je += ` <small>${x} ${We}</small>`;
        }
        return je;
      }
      case "month": {
        const Ye = `${y.xs && Ve ? "MMM" : "MMMM"} YYYY`;
        return t.formatDate(X.value, Ye);
      }
      case "year":
        return E.value.getFullYear();
      case "years":
        return `${E.value.getFullYear()} - ${v.value.getFullYear()}`;
    }
  });
  async function J() {
    switch (o.value = new Date(L.value || Z.value), o.value.setHours(0, 0, 0, 0), d.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        o.value = t.getPreviousFirstDayOfWeek(o.value, y.startWeekOnSunday && !y.hideWeekdays[7]);
        break;
      case "month":
        o.value = new Date(o.value.getFullYear(), o.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        o.value = new Date(o.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        o.value = new Date(o.value.getFullYear() - o.value.getFullYear() % $.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    Z.value = /* @__PURE__ */ new Date(), y.ready && (await Be(), c("view-change", {
      id: d.value,
      title: G.value,
      start: X.value,
      end: v.value,
      extendedStart: f.value,
      extendedEnd: D.value,
      cellDates: u.value,
      containsToday: s.value,
      events: q.value
    }));
  }
  function ne(m) {
    const F = d.value, ee = y.availableViews[F];
    m[F] && JSON.stringify(m[F]) === JSON.stringify(ee) || J();
  }
  function U(m, F = !0, ee = null) {
    const x = Object.keys(y.availableViews);
    d.value === m && !ee || (x.includes(m) ? (a.value = x.indexOf(m) < x.indexOf(d.value) ? "left" : "right", F && d.value !== m && c("update:view", m), d.value = m, ee ? K(ee) : J()) : console.warn(`Vue Cal: the \`${m}\` view is not available.`));
  }
  function oe() {
    h.value ? U(h.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function se() {
    k.value ? U(k.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function ve() {
    T(!1);
  }
  function l() {
    T(!0);
  }
  function T(m = !0) {
    let F = new Date(L.value);
    switch (d.value) {
      case "day":
      case "days":
        m ? F = t.addDays(b.value, 1) : F = t.subtractDays(E.value, $.value);
        break;
      case "week": {
        m ? (F = t.addDays(D.value, 1), F.setHours(0, 0, 0, 0)) : F = t.subtractDays(f.value, $.value);
        break;
      }
      case "month": {
        const ee = m ? 1 : -1;
        F = new Date(F.getFullYear(), F.getMonth() + ee, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const ee = m ? 1 : -1;
        F = new Date(F.getFullYear() + ee, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const ee = m ? $.value : -$.value;
        F = new Date(F.getFullYear() + ee, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    K(F);
  }
  function p() {
    const m = /* @__PURE__ */ new Date();
    m.setHours(0, 0, 0, 0), K(m);
  }
  function K(m, F = !0, ee = !1) {
    if (!t.isValid(m)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [x, ye] = [E.value, b.value];
    d.value === "month" && ([x, ye] = [X.value, v.value]), m.setHours(0, 0, 0, 0), L.value = m, F && c("update:viewDate", m), (!t.isInRange(m, x, ye) || ee) && (a.value = m.getTime() < x.getTime() ? "left" : "right", J());
  }
  function le(m, F = !0) {
    if (!t.isValid(m)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: ee, isSameDate: x } = t;
    (!A.value || !ee(A.value) || !x(m, A.value)) && (m.setHours(0, 0, 0, 0), A.value = m, F && c("update:selectedDate", m));
  }
  function me(m) {
    !m && !o.value.getDay() ? K(t.addDays(o.value, 1), !0, !0) : (a.value = "left", J());
  }
  function i(m) {
    m && y.startWeekOnSunday && !o.value.getDay() ? K(t.addDays(o.value, 1), !0, !0) : !m && y.startWeekOnSunday && o.value.getDay() === 1 && K(t.subtractDays(o.value, 1), !0, !0);
  }
  function z() {
    J();
  }
  function S(m) {
    var x;
    const F = (x = V.value) == null ? void 0 : x.querySelector(".vuecal__scrollable"), ee = m ? m * y.timeCellHeight / y.timeStep : 0;
    F == null || F.scrollTo({ top: ee, behavior: "smooth" });
  }
  function w() {
    const m = /* @__PURE__ */ new Date();
    S(m.getHours() * 60 + m.getMinutes());
  }
  function B() {
    S(0);
  }
  const q = Y(() => g.getViewEvents(u.value)), Q = g.createEvent, fe = g.deleteEvent;
  return De(() => y.view, (m) => U(m, !1)), De(() => y.availableViews, ne), De(() => y.datePicker, () => U("month")), De(() => y.viewDate, (m) => K(m, !1)), De(() => y.selectedDate, (m) => le(m, !1)), De(() => y.startWeekOnSunday, (m) => me(m)), De(() => y.hideWeekends, (m) => i(m)), De(() => y.hideWeekdays, z), De(() => $.value, () => {
    $.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), De(() => y.watchRealTime, (m) => {
    m && y.time ? e() : C = clearTimeout(C);
  }), J(), y.time && y.watchRealTime && e(), Xe(() => C = clearTimeout(C)), {
    now: Z,
    id: d,
    broaderView: h,
    narrowerView: k,
    title: G,
    viewDate: L,
    start: X,
    end: v,
    extendedStart: f,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: D,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: E,
    lastCellDate: b,
    containsToday: s,
    selectedDate: A,
    cellDates: u,
    cols: _,
    rows: P,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: q,
    transitionDirection: a,
    switch: (m, F) => U(m, !0, F),
    broader: oe,
    narrower: se,
    previous: ve,
    next: l,
    navigate: T,
    goToToday: p,
    updateViewDate: K,
    updateSelectedDate: le,
    scrollToCurrentTime: w,
    scrollToTime: S,
    scrollTop: B,
    createEvent: Q,
    deleteEvent: fe,
    // Getters.
    get isDay() {
      return d.value === "day";
    },
    get isDays() {
      return d.value === "days";
    },
    get isWeek() {
      return d.value === "week";
    },
    get isMonth() {
      return d.value === "month";
    },
    get isYear() {
      return d.value === "year";
    },
    get isYears() {
      return d.value === "years";
    }
  };
}, rt = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], ot = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], it = "Years", ut = "Year", ct = "Month", dt = "Week", vt = "Days", ft = "Day", mt = "Today", gt = "No Event", ht = "All-day", yt = "Delete", Dt = "Create an event", pt = "dddd, MMMM D, YYYY", wt = "am", _t = "pm", Qe = {
  weekDays: rt,
  months: ot,
  years: it,
  year: ut,
  month: ct,
  week: dt,
  days: vt,
  day: ft,
  today: mt,
  noEvent: gt,
  allDay: ht,
  deleteEvent: yt,
  createEvent: Dt,
  dateFormat: pt,
  am: wt,
  pm: _t
}, Ht = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allDay: ht,
  am: wt,
  createEvent: Dt,
  dateFormat: pt,
  day: ft,
  days: vt,
  default: Qe,
  deleteEvent: yt,
  month: ct,
  months: ot,
  noEvent: gt,
  pm: _t,
  today: mt,
  week: dt,
  weekDays: rt,
  year: ut,
  years: it
}, Symbol.toStringTag, { value: "Module" })), Fe = be({
  texts: { ...ge.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: lt(ge.texts, Qe)
  // Some Date utils functions need localized texts.
}), Pt = ({ props: y, emit: t, attrs: c, vuecalEl: r, uid: g }) => {
  const V = be({
    uid: g,
    // The Vuecal instance unique ID, used for dnd source-target identification.
    emit: t,
    texts: { ...Fe.texts },
    // Make texts reactive before a locale is loaded.
    // The date utils composable.
    // A class/composable is needed in order to access the user locale in all the methods, and
    // independently of other potential Vue Cal instances on the same page.
    dateUtils: { ...Fe.dateUtils },
    now: /* @__PURE__ */ new Date(),
    config: {},
    eventsManager: {},
    view: {},
    // At any time this object will be filled with current view details and visible events.
    dnd: {},
    // Drag and drop module.
    // stores the gesture related states. E.g. dragging event, resizing event, etc.
    touch: {
      isDraggingCell: !1,
      isDraggingEvent: !1,
      isResizingEvent: !1,
      currentHoveredCell: null
      // Track the cell currently being hovered during event resizing.
    }
  });
  return V.dateUtils = lt(Object.assign(ge.texts, V.texts), Qe), V.config = Ct(V, y, c), V.eventsManager = Vt(V), V.view = Ot(V, r), V.dnd = zt(V), V;
}, jt = 1440, Lt = {
  allDayEvents: { type: Boolean, default: !1 },
  // Display all-day events in a fixed top bar on the day, days & week views.
  stackEvents: { type: Boolean, default: !1 },
  clickToNavigate: { type: Boolean, default: void 0 },
  // Setting to false will force it off on date-picker.
  dark: { type: Boolean, default: !1 },
  // Dark theme.
  datePicker: { type: Boolean, default: !1 },
  // Shorthand for xs: true, views: [month, year, years], clickToNavigate: true.
  disableDays: { type: Array, default: () => [] },
  // Array of specific dates to disable.
  // Can be true false or a finer grain permissions object like:
  // { drag: bool, resize: bool, resizeX: bool, create: bool, delete: bool }
  editableEvents: { type: [Boolean, Object], default: !1 },
  // Minimum drag distance in pixels to create an event (prevents accidental event creation when trying to navigate).
  eventCreateMinDrag: { type: Number, default: 15 },
  // The minimum drag distance in pixels to create an event.
  // The array of events to display in Vue Cal.
  // Can hold just the view events and be updated or the full array of all events available.
  events: { type: Array, default: () => [] },
  // Displays an events counter in each cell on month view or year view.
  // Can be a boolean or an array of views to display the event count on.
  eventCount: { type: [Boolean, Array], default: !1 },
  eventsOnMonthView: { type: Boolean, default: !1 },
  // Displays events in full on month view.
  hideWeekdays: { type: Array, default: () => [] },
  // An array of strings. Possible values: 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'.
  hideWeekends: { type: Boolean, default: !1 },
  // Show or hide both Saturday and Sunday in days, week and month views.
  // en-us is the default and fallback if locale is not supported.
  // The locale can also be provided externally to avoid using Promises.
  locale: { type: String, default: "" },
  // A language to use for all the texts.
  maxDate: { type: [String, Date], default: "" },
  // Mostly for date pickers, sets a maximum date for cell interactions.
  minDate: { type: [String, Date], default: "" },
  // Mostly for date pickers, sets a minimum date for cell interactions.
  multidayEvents: { type: Boolean, default: !0 },
  // Allow events to span multiple days.
  // A 2-way binding that highlights the selected date in the calendar but does not navigate to it.
  selectedDate: { type: [String, Date], default: "" },
  // The selected date in the calendar !== viewDate.
  sm: { type: Boolean, default: !1 },
  // Small size (truncates texts + specific styles).
  specialHours: { type: Object, default: () => ({}) },
  // Highlight a particular time range on each day of the week, individually.
  schedules: { type: Array, default: () => [] },
  // Split a day in different persons/rooms/locations schedules.
  snapToInterval: { type: Number, default: 0 },
  // Snap the event start and end to a specific interval in minutes.
  startWeekOnSunday: { type: Boolean, default: !1 },
  // Shows Sunday before Monday in days, week and month views.
  theme: { type: [String, Boolean], default: "default" },
  // Only adds a CSS class when set to default.
  time: { type: Boolean, default: !0 },
  // Show or hide the time column.
  timeAtCursor: { type: Boolean, default: !1 },
  // Show or hide the "time at cursor" line.
  timeCellHeight: { type: Number, default: 40 },
  // In pixels.
  timeFormat: { type: String, default: "" },
  // Overrides the default time format.
  timeFrom: { type: Number, default: 0 },
  // Start time of the time column, in minutes.
  timeStep: { type: Number, default: 60 },
  // Step amount for the time in the time column, in minutes.
  timeTo: { type: Number, default: jt },
  // End time of the time column, in minutes.
  titleBar: { type: Boolean, default: !0 },
  // Show or hide the header title bar.
  todayButton: { type: Boolean, default: !0 },
  // Show or hide the header today button.
  twelveHour: { type: Boolean, default: !1 },
  // 12 or 24 hour format are respectively written like 1pm and 13:00.
  // Sets the calendar view to one of: 'day', 'days', 'week', 'month', 'year', 'years'. Default 'week' or 'month' if datePicker.
  // Gets updated on view navigation.
  view: { type: String, default: "" },
  viewDate: { type: [String, Date], default: "" },
  // The view will automatically set its start and end to present this date.
  // Only available for month and day views, this will shift the start of the view (left or right) by x days (signed integer).
  viewDayOffset: { type: Number, default: 0 },
  // The list of all the view that will be available in this calendar.
  // Default for normal layout: ['day', 'days', 'week', 'month', 'year', 'years'] }.
  // Default for date picker layout: ['month', 'year', 'years'].
  views: { type: [Array, Object] },
  viewsBar: { type: Boolean, default: !0 },
  // Show or hide the headers view selection bar.
  watchRealTime: { type: Boolean, default: !1 },
  // More expensive, so only trigger on demand.
  weekNumbers: { type: Boolean, default: !1 },
  // Show the weeks numbers in a column on month view.
  xs: { type: Boolean, default: !1 },
  // Extra small size for date pickers (truncates texts + specific styles).
  horizontal: { type: Boolean, default: !1 }
  // Show the calendar timeline horizontally.
  // TODO:
  // minEventWidth: { type: Number, default: 0 },
  // minScheduleWidth: { type: Number, default: 0 },
  // overlapsPerTimeStep: { type: Boolean, default: false },
}, At = { class: "vuecal__header" }, Ft = {
  key: 0,
  class: "vuecal__views-bar"
}, Xt = ["onClick", "innerHTML"], Rt = {
  key: 1,
  class: "vuecal__title-bar"
}, Wt = { class: "vuecal__transition-wrap" }, Nt = ["disabled", "innerHTML"], Bt = {
  __name: "header",
  setup(y) {
    const t = Pe("vuecal"), { view: c, config: r } = t, g = () => {
      r.clickToNavigate && c.broader();
    }, V = Y(() => r.clickToNavigate ? { click: g } : {});
    return (I, d) => (O(), j("div", At, [
      H(I.$slots, "header", {
        view: M(c),
        availableViews: M(r).availableViews,
        vuecal: M(t)
      }),
      I.$slots.header ? te("", !0) : (O(), j(de, { key: 0 }, [
        M(r).viewsBar ? (O(), j("div", Ft, [
          (O(!0), j(de, null, we(M(r).availableViews, (A, Z) => (O(), j("button", {
            class: pe(["vuecal__view-button", { "vuecal__view-button--active": M(c).id === Z }]),
            onClick: (L) => M(c).switch(Z),
            innerHTML: M(t).texts[Z],
            type: "button"
          }, null, 10, Xt))), 256))
        ])) : te("", !0),
        M(r).titleBar ? (O(), j("nav", Rt, [
          he("button", {
            class: pe(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !I.$slots["previous-button"] }]),
            onClick: d[0] || (d[0] = (...A) => M(c).previous && M(c).previous(...A)),
            type: "button"
          }, [
            H(I.$slots, "previous-button")
          ], 2),
          he("div", Wt, [
            He(Ue, {
              name: `vuecal-slide-fade--${M(c).transitionDirection}`
            }, {
              default: N(() => [
                (O(), j("div", {
                  key: M(c).id + M(c).start.getTime()
                }, [
                  I.$slots.title || I.$slots[`title.${M(c).id}`] ? (O(), Se(xe(M(r).clickToNavigate && M(c).broaderView ? "button" : "div"), ie({
                    key: 0,
                    class: "vuecal__title"
                  }, Ie(V.value)), {
                    default: N(() => [
                      I.$slots[`title.${M(c).id}`] ? H(I.$slots, `title.${M(c).id}`, ae(ie({ key: 0 }, M(c)))) : H(I.$slots, "title", ae(ie({ key: 1 }, M(c))))
                    ]),
                    _: 3
                  }, 16)) : (O(), Se(xe(M(r).clickToNavigate && M(c).broaderView ? "button" : "div"), ie({
                    key: 1,
                    class: "vuecal__title"
                  }, Ie(V.value), {
                    innerHTML: M(c).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          M(r).todayButton ? (O(), j(de, { key: 0 }, [
            I.$slots["today-button"] ? H(I.$slots, "today-button", {
              key: 0,
              navigate: () => !M(c).containsToday && M(c).goToToday(),
              active: M(c).containsToday
            }) : (O(), j("button", {
              key: 1,
              class: pe(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": M(c).containsToday }]),
              onClick: d[1] || (d[1] = (A) => !M(c).containsToday && M(c).goToToday()),
              disabled: !!M(c).containsToday,
              type: "button",
              innerHTML: M(t).texts.today
            }, null, 10, Nt))
          ], 64)) : te("", !0),
          he("button", {
            class: pe(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !I.$slots["next-button"] }]),
            onClick: d[2] || (d[2] = (...A) => M(c).next && M(c).next(...A)),
            type: "button"
          }, [
            H(I.$slots, "next-button")
          ], 2)
        ])) : te("", !0)
      ], 64))
    ]));
  }
}, It = ["draggable"], Gt = { class: "vuecal__event-details" }, qt = { class: "vuecal__event-title" }, Ut = {
  key: 0,
  class: "vuecal__event-time"
}, Jt = {
  key: 0,
  class: "vuecal__event-comma"
}, Zt = { class: "vuecal__event-start" }, Kt = {
  key: 1,
  class: "vuecal__event-end"
}, Qt = { key: 0 }, xt = ["innerHTML"], en = 16, st = {
  __name: "event",
  props: {
    event: { type: Object, required: !0 },
    inAllDayBar: { type: Boolean, default: !1 },
    cellStart: { type: Date, required: !0 },
    cellEnd: { type: Date, required: !0 }
  },
  emits: ["event-drag-start", "event-drag-end", "event-resize-start", "event-resize-end"],
  setup(y, { emit: t }) {
    const c = y, { config: r, view: g, dnd: V, touch: I, dateUtils: d, eventsManager: A } = Pe("vuecal"), { handleEventResize: Z } = A, L = ue(null), o = be(c.event), C = be({
      dragging: !1,
      fromResizer: !1,
      // If the drag originates from the resizer element.
      holding: !1,
      // When the event is clicked and hold for a certain amount of time.
      holdTimer: null,
      // event click and hold detection.
      canTouchAndDrag: null,
      // Wait for 500ms before allowing an event to be dragged after touchstart.
      touchAndDragTimer: null,
      // Timer for canTouchAndDrag.
      startX: 0,
      // The X coords at the start of the drag.
      startY: 0,
      // The Y coords at the start of the drag.
      startPercentageX: 0,
      // The X coords in percentage at the start of the drag.
      startPercentageY: 0,
      // The Y coords in percentage at the start of the drag.
      moveX: 0,
      // The X coords while dragging.
      moveY: 0,
      // The Y coords while dragging.
      movePercentageX: 0,
      // The X coords in percentage while dragging.
      movePercentageY: 0,
      // The Y coords in percentage while dragging.
      documentMouseX: 0,
      // Document mouse X position for horizontal resizing
      documentMouseY: 0,
      // Document mouse Y position for horizontal resizing
      resizeStartDate: null,
      // When resizing and going above the start date (end before start) update the start instead of the end.
      resizingOriginalEvent: null,
      // Store the original event details while resizing.
      resizingLastAcceptedEvent: null,
      // Store the last accepted event details while resizing.
      cellEl: null,
      // Store the cell DOM node for a more efficient resizing calc in mousemove/touchmove.
      schedule: null
    }), X = Y(() => r.editableEvents.drag && o.draggable !== !1 && !o.background && C.canTouchAndDrag !== !1), v = Y(() => g.isMonth || g.isYear || g.isYears || c.inAllDayBar || o._.multiday && !s.value ? !1 : r.time && r.editableEvents.resize && o.resizable !== !1 && !o.background);
    Y(() => r.editableEvents.delete && o.deletable !== !1 && !o.background);
    const f = Y(() => {
      var k, n, W, G, J;
      const u = !!((k = o._) != null && k.multiday), b = r.horizontal, a = !c.inAllDayBar && (((n = o._) == null ? void 0 : n.startMinutes) < r.timeFrom || u && !D.value), h = !c.inAllDayBar && (((W = o._) == null ? void 0 : W.endMinutes) > r.timeTo || u && !s.value);
      return {
        [`vuecal__event--${o._.id}`]: !0,
        [o.class]: !!o.class,
        "vuecal__event--recurring": !!o.recurring,
        "vuecal__event--background": !!o.background,
        "vuecal__event--all-day": o.allDay || ((G = o._) == null ? void 0 : G.startMinutes) === 0 && ((J = o._) == null ? void 0 : J.duration) === 1440,
        "vuecal__event--multiday": u,
        // In horizontal mode, cut-top becomes cut-left and cut-bottom becomes cut-right.
        "vuecal__event--cut-top": !b && a,
        "vuecal__event--cut-bottom": !b && h,
        "vuecal__event--cut-left": b && a,
        "vuecal__event--cut-right": b && h,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !o._.draggingGhost && o._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": o._.draggingGhost,
        "vuecal__event--resizing": I.isResizingEvent
      };
    }), D = Y(() => o._.multiday ? new Date(o.start).setHours(0, 0, 0, 0) === c.cellStart.getTime() : !0), s = Y(() => o._.multiday ? d.isSameDate(new Date(new Date(o.end).setMilliseconds(-1)), c.cellEnd) : !0), R = Y(() => {
      const u = new Date(o.start).setHours(0, 0, 0, 0), b = new Date(o.end).setHours(0, 0, 0, 0);
      return Math.ceil((b - u) / (1e3 * 60 * 60 * 24));
    }), e = Y(() => {
      const u = (g.isDay || g.isDays || g.isWeek) && r.time && !c.inAllDayBar, b = r.horizontal;
      if (!u && !o.backgroundColor && !o.color) return !1;
      const a = {
        backgroundColor: o.backgroundColor || null,
        color: o.color || null
      };
      if (u) {
        let h = o._.startMinutes, k = o._.endMinutes;
        o._.multiday && (D.value || (h = 0), s.value || (k = 1440));
        const n = Math.max(r.timeFrom, h), W = Math.min(r.timeTo, k) + (o._.duration && !k ? 1440 : 0), G = Oe(n, r), J = Oe(W, r) - G;
        a[b ? "left" : "top"] = `${G}%`, a[b ? "width" : "height"] = `${J}%`;
      }
      return a;
    }), _ = Y(() => {
      const u = { ...r.eventListeners.event };
      for (const [h, k] of Object.entries(u))
        ["resize-end"].includes(h) || (u[h] = (n) => {
          n.type !== "drop" && k(n.type ? { e: n, event: o } : n);
        });
      const b = { ...u };
      u.touchstart = (h) => {
        var k;
        h.stopPropagation(), C.touchAndDragTimer = setTimeout(() => {
          C.canTouchAndDrag = !0;
        }, 500), E(h), (k = b.touchstart) == null || k.call(b, { e: h, event: o });
      }, u.mousedown = (h) => {
        var k;
        h.stopPropagation(), E(h), (k = b.mousedown) == null || k.call(b, { e: h, event: o });
      };
      let a = null;
      return u.click = (h) => {
        var k;
        (k = b.click) == null || k.call(b, { e: h, event: o }), a ? a = clearTimeout(a) : a = setTimeout(() => {
          var n;
          a = null, (n = b["delayed-click"]) == null || n.call(b, { e: h, event: o });
        }, 400);
      }, u.dblclick = (h) => {
        b.dblclick ? b.dblclick({ e: h, event: o }) : o.delete(1);
      }, u;
    });
    let P = null, $ = 0;
    const E = (u) => {
      var k, n, W, G;
      const b = ((k = u.touches) == null ? void 0 : k[0]) || u;
      C.fromResizer = (n = b.target) == null ? void 0 : n.closest(".vuecal__event-resizer");
      const a = Date.now();
      (!P || a - $ > en) && (P = L.value.getBoundingClientRect(), $ = a);
      const h = P;
      C.startX = (((W = u.touches) == null ? void 0 : W[0]) || u).clientX - h.left, C.startY = (((G = u.touches) == null ? void 0 : G[0]) || u).clientY - h.top, C.startPercentageX = C.startX * 100 / h.width, C.startPercentageY = C.startY * 100 / h.height, C.cellEl = L.value.closest(".vuecal__cell"), C.resizeStartDate = o.start, C.fromResizer && Z(u, o, L.value), C.holdTimer = setTimeout(() => {
        var J, ne;
        C.holding = !0, (ne = (J = _.value).hold) == null || ne.call(J, { e: u, event: o });
      }, 1e3);
    };
    return Ze(() => o._.register(L.value)), Xe(() => {
      C.holdTimer && (C.holdTimer = clearTimeout(C.holdTimer)), C.touchAndDragTimer && (C.touchAndDragTimer = clearTimeout(C.touchAndDragTimer)), o._.unregister();
    }), (u, b) => (O(), j("div", ie({ class: "vuecal__event" }, Ie(_.value, !0), {
      ref_key: "eventEl",
      ref: L,
      class: f.value,
      style: e.value,
      draggable: X.value ? "true" : void 0,
      onDragstart: b[2] || (b[2] = (a) => X.value && M(V).eventDragStart(a, o)),
      onDragend: b[3] || (b[3] = (a) => X.value && M(V).eventDragEnd(a, o))
    }), [
      he("div", Gt, [
        u.$slots["event.all-day"] ? H(u.$slots, "event.all-day", {
          key: 0,
          event: o
        }) : u.$slots[`event.${M(g).id}`] ? H(u.$slots, `event.${M(g).id}`, {
          key: 1,
          event: o
        }) : H(u.$slots, "event", {
          key: 2,
          event: o
        }, () => [
          he("div", qt, ce(o.title), 1),
          M(r).time && !y.inAllDayBar && !(o._.multiday && !D.value) ? (O(), j("div", Ut, [
            M(g).isMonth ? (O(), j("span", Jt, ",")) : te("", !0),
            he("span", Zt, ce(o._[`startTimeFormatted${M(r).twelveHour ? 12 : 24}`]), 1),
            M(g).isMonth ? te("", !0) : (O(), j("span", Kt, [
              Ge(" - " + ce(o._[`endTimeFormatted${M(r).twelveHour ? 12 : 24}`]), 1),
              o._.multiday && D.value ? (O(), j("span", Qt, "+" + ce(R.value) + "d", 1)) : te("", !0)
            ]))
          ])) : te("", !0),
          y.inAllDayBar ? te("", !0) : (O(), j("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: o.content
          }, null, 8, xt))
        ])
      ]),
      v.value ? (O(), j("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: b[0] || (b[0] = et(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : te("", !0),
      He(Ue, { name: "vuecal-delete-btn" }, {
        default: N(() => [
          o._.deleting ? (O(), j("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: b[1] || (b[1] = et((a) => o.delete(3), ["stop"]))
          }, "Delete")) : te("", !0)
        ]),
        _: 1
      })
    ], 16, It));
  }
}, tn = ["innerHTML"], nn = ["data-schedule"], an = {
  key: 1,
  class: "vuecal__cell-date"
}, sn = {
  key: 2,
  class: "vuecal__cell-content"
}, ln = {
  key: 3,
  class: "vuecal__cell-events"
}, rn = {
  key: 1,
  class: "vuecal__cell-date"
}, on = {
  key: 2,
  class: "vuecal__cell-content"
}, un = {
  key: 3,
  class: "vuecal__cell-events"
}, cn = {
  key: 5,
  class: "vuecal__cell-events-count"
}, dn = ["title"], kt = {
  __name: "cell",
  props: {
    // Even with time=false, the date of the cell will still be provided in order to attach
    // events to a specific date.
    start: { type: Date, required: !0 },
    end: { type: Date, required: !0 },
    index: { type: Number, required: !0 },
    allDay: { type: Boolean, default: !1 }
    // True when the cell is an all-day cell.
  },
  setup(y) {
    const t = y, c = Pe("vuecal"), { view: r, config: g, dateUtils: V, eventsManager: I, dnd: d, touch: A } = c, Z = Y(() => V.isToday(t.start)), L = ue(null), o = ue([]), C = ue(!1), X = (i) => {
      o.value.push(i.detail), C.value = !0;
    }, v = () => setTimeout(() => C.value = !1, 300), f = be({
      dragging: !1,
      holding: !1,
      // When the cell is clicked and hold for a certain amount of time.
      holdTimer: null,
      // Cell click and hold detection.
      thresholdPassed: !1,
      // If the drag threshold has been passed.
      canTouchAndDrag: null,
      // Wait for 500ms before allowing an event to be dragged after touchstart.
      touchAndDragTimer: null,
      // Timer for canTouchAndDrag.
      startX: 0,
      // The x position at the start of the drag (mousedown or touchstart).
      startY: 0,
      // The y position at the start of the drag (mousedown or touchstart).
      moveX: 0,
      moveY: 0,
      startPercentageX: 0,
      // The x position in percentage at the start of the drag (mousedown or touchstart).
      startPercentageY: 0,
      // The y position in percentage at the start of the drag (mousedown or touchstart).
      movePercentageX: 0,
      movePercentageY: 0,
      schedule: null
    }), D = ue(!1), s = ue({ cellOverlaps: {}, longestStreak: 0 }), R = Y(() => {
      const i = g.horizontal, z = i ? f.startPercentageX : f.startPercentageY, S = i ? f.movePercentageX : f.movePercentageY;
      let w = Math.min(z, S), B = Math.max(z, S), q = ze(w, g), Q = ze(B, g);
      return g.snapToInterval && (q = V.snapToInterval(q, g.snapToInterval), Q = V.snapToInterval(Q, g.snapToInterval), w = Oe(q, g), B = Oe(Q, g)), {
        style: {
          [i ? "left" : "top"]: `${w}%`,
          [i ? "width" : "height"]: `${Math.abs(B - w)}%`
        },
        startMinutes: q,
        endMinutes: Q,
        start: V.formatMinutes(q),
        end: V.formatMinutes(Q),
        ...f.schedule ? { schedule: f.schedule } : {}
      };
    }), e = Y(() => {
      const i = g.editableEvents.create && (f.dragging || D.value), z = g.eventCreateMinDrag && f.thresholdPassed || !g.eventCreateMinDrag, S = f.canTouchAndDrag !== !1;
      return i && z && S;
    }), _ = Y(() => {
      var Q;
      const i = /* @__PURE__ */ new Date(), z = r.start.getFullYear(), S = r.start.getMonth(), w = t.start.getFullYear(), B = t.start.getMonth();
      return {
        [`vuecal__cell--${qe[t.start.getDay()]}`]: r.isDay || r.isDays || r.isWeek || r.isMonth,
        [`vuecal__cell--${Yt[B]}`]: r.isYear,
        [`vuecal__cell--${w}`]: r.isYears,
        "vuecal__cell--today": Z.value,
        "vuecal__cell--current-month": r.isYear && w === i.getFullYear() && B === i.getMonth(),
        "vuecal__cell--current-year": r.isYears && w === i.getFullYear(),
        "vuecal__cell--out-of-range": r.isMonth && (w !== z || B !== S),
        "vuecal__cell--before-min": G.value && n.value,
        "vuecal__cell--after-max": G.value && W.value,
        "vuecal__cell--disabled": G.value,
        "vuecal__cell--selected": r.selectedDate && r.selectedDate.getTime() >= t.start.getTime() && r.selectedDate.getTime() <= t.end.getTime(),
        "vuecal__cell--has-schedules": (Q = g.schedules) == null ? void 0 : Q.length,
        "vuecal__cell--dragging": f.dragging,
        "vuecal__cell--has-events": $.value.length
      };
    });
    Y(() => V.formatDate(t.start));
    const P = Y(() => {
      switch (r.id) {
        case "day":
          return "";
        case "days":
          return g.availableViews.days.rows > 1 && V.formatDate(t.start, "D"), "";
        case "week":
          return "";
        case "month":
          return V.formatDate(t.start, "D");
        case "year":
          return V.formatDate(t.start, g.xs ? "MMM" : "MMMM");
        case "years":
          return V.formatDate(t.start, "YYYY");
      }
    }), $ = Y(() => g.datePicker ? [] : I.getEventsInRange(
      t.start,
      t.end,
      { excludeIds: o.value, ...g.allDayEvents ? { allDay: t.allDay } : {} }
    )), E = Y(() => $.value.filter((i) => !i.background)), u = Y(() => {
      var i;
      return (i = g.schedules) == null ? void 0 : i.reduce((z, S) => (z[S.id] = $.value.filter((w) => w.schedule === S.id), z), {});
    }), b = Y(() => {
      if (r.isMonth || r.isYear || r.isYears || t.allDay) return {};
      const i = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", z = g.horizontal, S = {};
      for (const w of $.value) {
        const B = w._.id, { maxConcurrent: q = 1, position: Q = 0 } = s.value.cellOverlaps[B] || {}, fe = i ? "right" : "left", m = z ? "height" : "width";
        S[B] = { [z ? "top" : fe]: `${100 / q * Q}%` }, g.stackEvents ? S[B][m] = `${100 / q + (Q === q - 1 ? 0 : 15)}%` : S[B][m] = `${100 / q}%`;
      }
      return S;
    }), a = Y(() => {
      const i = {};
      for (const z of $.value) {
        const S = z._.id, { maxConcurrent: w = 1, position: B = 0 } = s.value.cellOverlaps[S] || {};
        i[S] = `vuecal__event--stack-${B + 1}-${w}`;
      }
      return i;
    }), h = Y(() => g.showCellEventCount && E.value.length), k = Y(() => {
      var w;
      if (!g.specialHours || r.isMonth || r.isYear || r.isYears || t.allDay) return;
      const i = qe[t.start.getDay()], z = g.horizontal;
      let S = (w = g.specialHours) == null ? void 0 : w[i];
      if (S)
        return Array.isArray(S) || (S = [S]), S.map((B) => {
          let { from: q, to: Q, class: fe, label: m } = B;
          if (isNaN(q) || isNaN(Q) || g.timeFrom >= Q || g.timeTo <= q) return;
          q = Math.max(g.timeFrom, q), Q = Math.min(g.timeTo, Q);
          const F = Oe(q, g), ee = Oe(Q, g) - F;
          return {
            style: {
              [z ? "left" : "top"]: `${F}%`,
              [z ? "width" : "height"]: `${ee}%`
            },
            label: m,
            class: fe
          };
        }).filter((B) => !!B);
    }), n = Y(() => g.minTimestamp !== null && g.minTimestamp > t.end.getTime()), W = Y(() => g.maxTimestamp && g.maxTimestamp < t.start.getTime()), G = Y(() => {
      const { disableDays: i } = g, z = r.isYear || r.isYears;
      return i.length && i.includes(V.formatDate(t.start)) && !z ? !0 : n.value || W.value;
    }), J = be({
      show: Y(() => {
        if (!(!r.isDay && !r.isDays && !r.isWeek) && !(!Z.value || !g.time || t.allDay) && !(g.timeFrom > V.dateToMinutes(r.now)) && !(V.dateToMinutes(r.now) > g.timeTo))
          return !0;
      }),
      nowInMinutes: Y(() => V.dateToMinutes(r.now)),
      todaysTimePosition: Y(() => Oe(J.nowInMinutes, g)),
      style: Y(() => `${g.horizontal ? "left" : "top"}: ${J.todaysTimePosition}%`),
      currentTime: Y(() => V.formatTime(r.now, g.twelveHour ? "h:mm {am}" : "HH:mm"))
    }), ne = Y(() => {
      if (G.value) return {};
      const i = { ...g.eventListeners.cell };
      for (const [w, B] of Object.entries(i))
        i[w] = (q) => {
          var Q, fe, m;
          (m = (fe = q.target || ((Q = q.e) == null ? void 0 : Q.target)).closest) != null && m.call(fe, ".vuecal__event") || B(q.type ? { e: q, cell: U.value, cursor: se.value } : q);
        };
      const z = { ...i };
      let S = null;
      return i.click = (w) => {
        var q;
        ve();
        const B = oe(w);
        (q = z.click) == null || q.call(z, { e: w, cell: U.value, cursor: B }), S ? S = clearTimeout(S) : S = setTimeout(() => {
          var Q;
          S = null, (Q = z["delayed-click"]) == null || Q.call(z, { e: w, cell: U.value, cursor: B });
        }, 400);
      }, (g.time && r.isDay || r.isDays || r.isWeek) && (i.touchstart = (w) => {
        var B;
        l(w.e || w), (B = z.touchstart) == null || B.call(z, { e: w, cell: U.value, cursor: se.value });
      }, i.mousedown = (w) => {
        var B;
        l(w.e || w), (B = z.mousedown) == null || B.call(z, { e: w, cell: U.value, cursor: se.value });
      }), z.dblclick && (i.dblclick = (w) => {
        var B;
        (B = z.dblclick) == null || B.call(z, { e: w, cell: U.value, cursor: oe(w) });
      }), g.editableEvents.drag && (i.dragenter = (w) => d.cellDragEnter(w, U.value), i.dragover = (w) => {
        w.preventDefault(), d.cellDragOver(w, U.value);
      }, i.dragleave = (w) => d.cellDragLeave(w, U.value), i.drop = (w) => d.cellDragDrop(w, U.value, t.allDay)), i;
    }), U = Y(() => ({
      start: t.start,
      end: t.end,
      events: $,
      ...f.schedule ? { schedule: f.schedule } : {},
      goNarrower: () => r.narrower(),
      goBroader: () => r.broader(),
      broader: r.broaderView,
      narrower: r.narrowerView
    })), oe = (i) => {
      var m;
      const z = g.horizontal, { clientX: S, clientY: w } = ((m = i.touches) == null ? void 0 : m[0]) || i, { top: B, left: q } = L.value.getBoundingClientRect(), Q = z ? (S - q) * 100 / L.value.clientWidth : Ke(w - B, L.value), fe = new Date(t.start);
      return fe.setMinutes(ze(Q, g)), { [z ? "x" : "y"]: Q, date: fe };
    }, se = Y(() => {
      const z = g.horizontal ? f.movePercentageX || f.startPercentageX : f.movePercentageY || f.startPercentageY, S = ze(z, g), w = new Date(t.start);
      return w.setMinutes(S), {
        x: f.movePercentageX || f.startPercentageX,
        y: f.movePercentageY || f.startPercentageY,
        date: w
      };
    }), ve = () => {
      r.updateSelectedDate(t.start), g.clickToNavigate && ((r.isMonth || r.isDays || r.isWeek) && g.availableViews.day ? r.switch("day") : r.isYear && g.availableViews.month ? r.switch("month") : r.isYears && g.availableViews.year && r.switch("year")), r.updateViewDate(t.start);
    }, l = (i) => {
      var w, B;
      const z = i.type === "touchstart";
      z ? (f.canTouchAndDrag = !1, f.touchAndDragTimer = setTimeout(() => {
        f.canTouchAndDrag = !0, (f.holding || f.dragging) && i.preventDefault();
      }, 500)) : f.canTouchAndDrag = !0, f.schedule = ~~i.target.dataset.schedule;
      const S = L.value.getBoundingClientRect();
      f.startX = (((w = i.touches) == null ? void 0 : w[0]) || i).clientX - S.left, f.startY = (((B = i.touches) == null ? void 0 : B[0]) || i).clientY - S.top, f.startPercentageX = f.startX * 100 / S.width, f.startPercentageY = f.startY * 100 / S.height, f.thresholdPassed = !1, document.addEventListener(z ? "touchmove" : "mousemove", T, { passive: !z }), document.addEventListener(z ? "touchend" : "mouseup", p, { once: !0 }), f.holdTimer = setTimeout(() => {
        var q, Q;
        f.holding = !0, (Q = (q = ne.value).hold) == null || Q.call(q, { e: i, cell: U.value, cursor: se.value });
      }, 1e3);
    }, T = (i) => {
      var q, Q, fe, m, F, ee;
      const z = i.type === "touchmove", S = g.horizontal;
      if (z && !f.canTouchAndDrag) {
        f.touchAndDragTimer && (clearTimeout(f.touchAndDragTimer), f.touchAndDragTimer = null), p(i);
        return;
      }
      z && i.preventDefault(), f.dragging || (A.isDraggingCell = !0, (Q = (q = ne.value)["drag-start"]) == null || Q.call(q, { e: i, cell: U.value, cursor: se.value })), f.dragging = !0, f.holdTimer = clearTimeout(f.holdTimer), f.holding = !1;
      const w = L.value.getBoundingClientRect();
      f.moveX = (((fe = i.touches) == null ? void 0 : fe[0]) || i).clientX - w.left, f.moveY = (((m = i.touches) == null ? void 0 : m[0]) || i).clientY - w.top, f.movePercentageX = f.moveX * 100 / w.width, f.movePercentageY = f.moveY * 100 / w.height;
      const B = Math.abs(S ? f.startX - f.moveX : f.startY - f.moveY);
      g.eventCreateMinDrag && B > g.eventCreateMinDrag && (f.thresholdPassed = !0), (ee = (F = ne.value).drag) == null || ee.call(F, { e: i, cell: U.value, cursor: se.value });
    }, p = async (i) => {
      var S, w;
      const z = i.type === "touchend";
      document.removeEventListener(z ? "touchmove" : "mousemove", T, { passive: !1 }), f.touchAndDragTimer && (clearTimeout(f.touchAndDragTimer), f.touchAndDragTimer = null), f.dragging && ((w = (S = ne.value)["drag-end"]) == null || w.call(S, { e: i, cell: U.value, cursor: se.value }), A.isDraggingCell = !1, g.editableEvents.create && f.canTouchAndDrag && (D.value = !0, await K(i), D.value = !1)), f.holdTimer = clearTimeout(f.holdTimer), f.holding = !1, f.dragging = !1, f.startX = 0, f.startY = 0, f.moveX = 0, f.moveY = 0, f.startPercentageX = 0, f.startPercentageY = 0, f.movePercentageX = 0, f.movePercentageY = 0, f.thresholdPassed = !1, f.schedule = null, f.canTouchAndDrag = null;
    }, K = async (i) => {
      var fe;
      if (!e.value) return;
      let { start: z, end: S, startMinutes: w, endMinutes: B } = R.value;
      z = new Date(t.start), z.setMinutes(w), S = new Date(t.start), S.setMinutes(B);
      let q = { ...R.value, start: z, end: S };
      const { create: Q } = g.eventListeners.event;
      if (typeof Q == "function") {
        const m = q;
        q = await new Promise((F) => Q({ e: i, event: q, cell: U.value, resolve: F, cursor: se.value })), q && typeof q == "object" && r.createEvent(q), q && typeof q == "boolean" && r.createEvent(m);
      } else r.createEvent(q);
      (fe = navigator.vibrate) == null || fe.call(navigator, 200);
    }, le = () => {
      var i;
      for (const z of Object.keys(ne.value))
        (i = L.value) == null || i.removeEventListener(z, ne.value[z]);
    }, me = () => {
      s.value = I.getCellOverlappingEvents(t.start, t.end, t.allDay);
    };
    return De(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !r.isYears && !r.isYear && E.value.map((i) => `${i._.id}${i.start.getTime()}${i.end.getTime()}`).join(),
      async () => {
        await Be(), me();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Xe(async () => {
      for (const i of o.value) I.deleteEvent(i, 3);
      le(), await Be();
    }), (i, z) => (O(), j("div", ie({
      class: ["vuecal__cell", _.value],
      ref_key: "cellEl",
      ref: L
    }, Ie(ne.value, !0)), [
      i.$slots.cell ? H(i.$slots, "cell", {
        key: 0,
        cell: U.value
      }) : te("", !0),
      k.value ? (O(!0), j(de, { key: 1 }, we(k.value, (S, w) => (O(), j("div", {
        class: pe(["vuecal__special-hours", S.class]),
        style: $e(S.style),
        innerHTML: S.label || ""
      }, null, 14, tn))), 256)) : te("", !0),
      !i.$slots.cell && M(g).schedules ? (O(!0), j(de, { key: 2 }, we(M(g).schedules, (S) => (O(), j("div", {
        class: pe(["vuecal__schedule vuecal__schedule--cell", S.class]),
        key: S.id,
        style: $e(S.style || null),
        "data-schedule": S.id
      }, [
        i.$slots["cell-events"] ? H(i.$slots, "cell-events", {
          key: 0,
          cell: U.value
        }) : te("", !0),
        P.value || i.$slots["cell-date"] ? (O(), j("div", an, [
          H(i.$slots, "cell-date", { cell: U.value }, () => [
            Ge(ce(P.value), 1)
          ])
        ])) : te("", !0),
        i.$slots["cell-content"] ? (O(), j("div", sn, [
          H(i.$slots, "cell-content", { cell: U.value })
        ])) : te("", !0),
        i.$slots["cell-events"] && $.value.length ? (O(), j("div", ln, [
          H(i.$slots, "cell-events", { cell: U.value })
        ])) : $.value.length || C.value ? (O(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: z[0] || (z[0] = (w) => C.value = !0),
          onAfterLeave: v,
          tag: "div"
        }, {
          default: N(() => [
            (O(!0), j(de, null, we(u.value[S.id], (w) => (O(), Se(st, {
              key: w._.id,
              event: w,
              onEventDeleted: X,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              style: $e(b.value[w._.id])
            }, Ce({ _: 2 }, [
              i.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: N((B) => [
                  H(i.$slots, "event.all-day", ie({ ref_for: !0 }, B))
                ]),
                key: "0"
              } : void 0,
              i.$slots[`event.${M(r).id}`] ? {
                name: `event.${M(r).id}`,
                fn: N((B) => [
                  H(i.$slots, `event.${M(r).id}`, ie({ ref_for: !0 }, B))
                ]),
                key: "1"
              } : void 0,
              i.$slots.event ? {
                name: "event",
                fn: N((B) => [
                  H(i.$slots, "event", ie({ ref_for: !0 }, B))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "style"]))), 128))
          ]),
          _: 2
        }, 1024)) : te("", !0),
        e.value && f.schedule === S.id && !t.allDay ? (O(), j("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: $e(R.value.style)
        }, ce(R.value.start) + " - " + ce(R.value.end), 5)) : te("", !0)
      ], 14, nn))), 128)) : te("", !0),
      !i.$slots.cell && !M(g).schedules ? (O(), j(de, { key: 3 }, [
        i.$slots["cell-events"] ? H(i.$slots, "cell-events", {
          key: 0,
          cell: U.value
        }) : te("", !0),
        P.value || i.$slots["cell-date"] ? (O(), j("div", rn, [
          H(i.$slots, "cell-date", { cell: U.value }, () => [
            Ge(ce(P.value), 1)
          ])
        ])) : te("", !0),
        i.$slots["cell-content"] ? (O(), j("div", on, [
          H(i.$slots, "cell-content", { cell: U.value })
        ])) : te("", !0),
        i.$slots["cell-events"] && $.value.length ? (O(), j("div", un, [
          H(i.$slots, "cell-events", { cell: U.value })
        ])) : !(M(r).isMonth && !M(g).eventsOnMonthView) && !M(r).isYear && !M(r).isYears && ($.value.length || C.value) ? (O(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: z[1] || (z[1] = (S) => C.value = !0),
          onAfterLeave: v,
          tag: "div"
        }, {
          default: N(() => [
            (O(!0), j(de, null, we($.value, (S) => (O(), Se(st, {
              key: S._.id,
              event: S,
              onEventDeleted: X,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              class: pe(a.value[S._.id]),
              style: $e(b.value[S._.id])
            }, Ce({ _: 2 }, [
              i.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: N((w) => [
                  H(i.$slots, "event.all-day", ie({ ref_for: !0 }, w))
                ]),
                key: "0"
              } : void 0,
              i.$slots[`event.${M(r).id}`] ? {
                name: `event.${M(r).id}`,
                fn: N((w) => [
                  H(i.$slots, `event.${M(r).id}`, ie({ ref_for: !0 }, w))
                ]),
                key: "1"
              } : void 0,
              i.$slots.event ? {
                name: "event",
                fn: N((w) => [
                  H(i.$slots, "event", ie({ ref_for: !0 }, w))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "class", "style"]))), 128))
          ]),
          _: 3
        })) : te("", !0),
        e.value ? (O(), j("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: $e(R.value.style)
        }, ce(R.value.start) + " - " + ce(R.value.end), 5)) : te("", !0)
      ], 64)) : te("", !0),
      i.$slots["event-count"] ? H(i.$slots, "event-count", {
        key: 4,
        events: E.value
      }) : h.value ? (O(), j("div", cn, ce(E.value.length), 1)) : te("", !0),
      J.show ? (O(), j("div", {
        key: 6,
        class: "vuecal__now-line",
        style: $e(J.style),
        title: J.currentTime
      }, [
        H(i.$slots, "now-line", {
          now: M(r).now,
          timeFormatted: J.currentTime
        }, () => [
          he("span", null, ce(J.currentTime), 1)
        ])
      ], 12, dn)) : te("", !0)
    ], 16));
  }
}, vn = {
  key: 0,
  class: "vuecal__headings"
}, fn = {
  key: 0,
  class: "vuecal__weekdays-headings"
}, mn = ["onClick"], gn = { class: "vuecal__weekday-day" }, hn = {
  key: 0,
  class: "vuecal__weekday-date"
}, yn = {
  key: 1,
  class: "vuecal__schedules-headings"
}, Dn = ["innerHTML"], pn = {
  key: 2,
  class: "vuecal__all-day"
}, wn = {
  __name: "headings-bar",
  setup(y) {
    const t = Pe("vuecal"), c = Pe("$vuecalEl"), { view: r, config: g, dateUtils: V } = t, I = Y(() => g.xs ? "day-xs" : g.sm || r.isDays || r.isMonth ? "day-sm" : "day"), d = Y(() => (r.isDay || r.isDays || r.isWeek || r.isMonth) && !(r.isDay && !g.schedules && !g.allDayEvents)), A = Y(() => r.cellDates.slice(0, g.horizontal ? r.rows : r.cols).map(({ start: o }) => ({
      id: qe[o.getDay()],
      date: o,
      dateNumber: o.getDate(),
      day: V.formatDate(o, "dddd"),
      "day-sm": V.formatDate(o, "ddd"),
      "day-xs": V.formatDate(o, "dd"),
      isToday: V.isToday(o)
    }))), Z = {
      click: (o) => {
        (r.isDays || r.isWeek) && r.updateSelectedDate(o);
      }
    }, L = {
      isResizing: ue(!1),
      startY: ue(0),
      initialHeight: ue(0),
      defaultHeight: 25,
      // Default height in pixels.
      // Or in the case of horizontal layout.
      startX: ue(0),
      initialWidth: ue(0),
      defaultWidth: 25,
      // Default width in pixels.
      // Cleanup event listeners.
      cleanup() {
        typeof document < "u" && (document.removeEventListener("mousemove", L.handleMouseMove), document.removeEventListener("mouseup", L.cleanup), document.removeEventListener("touchmove", L.handleTouchMove, { passive: !1 }), document.removeEventListener("touchend", L.cleanup)), L.isResizing.value = !1;
      },
      startResize(o, C) {
        this.isResizing.value = !0;
        const X = g.horizontal;
        this[X ? "startX" : "startY"].value = X ? o : C;
        const v = getComputedStyle(c.value).getPropertyValue("--vuecal-all-day-bar-size"), f = document.createElement("div");
        f.style.position = "absolute", f.style.visibility = "hidden", f.style[X ? "width" : "height"] = v, document.body.appendChild(f);
        const D = f[X ? "offsetWidth" : "offsetHeight"];
        f.remove(), D > 0 && (this[X ? "initialWidth" : "initialHeight"].value = D), document.addEventListener("mousemove", L.handleMouseMove), document.addEventListener("mouseup", L.cleanup), document.addEventListener("touchmove", L.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", L.cleanup);
      },
      // Update height/width based on mouse/touch movement.
      updateSize(o, C) {
        var D;
        if (!this.isResizing.value) return;
        const X = g.horizontal, v = X ? o - this.startX.value : C - this.startY.value, f = Math.max(20, this[X ? "initialWidth" : "initialHeight"].value + v);
        (D = c.value) == null || D.style.setProperty("--vuecal-all-day-bar-size", `${f}px`);
      },
      // Mouse event handlers.
      handleMouseDown(o) {
        this.startResize(o.clientX, o.clientY);
      },
      handleMouseMove(o) {
        L.updateSize(o.clientX, o.clientY);
      },
      // Touch event handlers.
      handleTouchStart(o) {
        var C;
        (C = o.touches) != null && C[0] && this.startResize(o.touches[0].clientX, o.touches[0].clientY);
      },
      handleTouchMove(o) {
        var C;
        (C = o.touches) != null && C[0] && (L.updateSize(o.touches[0].clientX, o.touches[0].clientY), o.preventDefault());
      }
    };
    return Xe(() => {
      L.cleanup();
    }), (o, C) => d.value ? (O(), j("div", vn, [
      M(r).isDay ? te("", !0) : (O(), j("div", fn, [
        (O(!0), j(de, null, we(A.value, (X, v) => (O(), j("div", {
          class: pe(["vuecal__weekday", { "vuecal__weekday--today": X.isToday }]),
          key: v,
          onClick: (f) => Z.click(X.date)
        }, [
          H(o.$slots, "weekday-heading", {
            label: X[I.value],
            id: X.id,
            date: X.date
          }, () => [
            he("span", gn, ce(X[I.value]), 1),
            M(r).isMonth ? te("", !0) : (O(), j("strong", hn, ce(X.dateNumber), 1))
          ])
        ], 10, mn))), 128))
      ])),
      M(g).schedules ? (O(), j("div", yn, [
        (O(!0), j(de, null, we(A.value, (X, v) => (O(), j(de, { key: v }, [
          (O(!0), j(de, null, we(M(g).schedules, (f, D) => (O(), j(de, { key: D }, [
            o.$slots["schedule-heading"] ? (O(), j("div", {
              key: 0,
              class: pe(["vuecal__schedule vuecal__schedule--heading", f.class])
            }, [
              H(o.$slots, "schedule-heading", {
                schedule: f,
                view: M(r)
              })
            ], 2)) : (O(), j("div", {
              key: 1,
              class: pe(["vuecal__schedule vuecal__schedule--heading", f.class]),
              innerHTML: f.label
            }, null, 10, Dn))
          ], 64))), 128))
        ], 64))), 128))
      ])) : te("", !0),
      M(g).allDayEvents ? (O(), j("div", pn, [
        (O(!0), j(de, null, we(A.value, (X, v) => (O(), Se(kt, {
          class: pe(["vuecal__all-day-cell", { "vuecal__weekday--today": X.isToday }]),
          key: v,
          start: X.date,
          end: new Date(X.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: v,
          "all-day": ""
        }, Ce({ _: 2 }, [
          o.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: N((f) => [
              H(o.$slots, "event.all-day", ie({ ref_for: !0 }, f))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: N((f) => [
              H(o.$slots, "event", ie({ ref_for: !0 }, f))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        he("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: C[0] || (C[0] = (...X) => L.handleMouseDown && L.handleMouseDown(...X)),
          onTouchstart: C[1] || (C[1] = (...X) => L.handleTouchStart && L.handleTouchStart(...X))
        }, null, 32)
      ])) : te("", !0)
    ])) : te("", !0);
  }
}, _n = { class: "vuecal__time-column" }, kn = {
  key: 0,
  class: "vuecal__all-day-label"
}, $n = {
  __name: "time-column",
  setup(y) {
    const t = Pe("vuecal"), { config: c, texts: r } = t, g = Y(() => {
      const V = [];
      for (let d = c.timeFrom; d < c.timeTo; d += c.timeStep) {
        const A = d + c.timeStep > c.timeTo, Z = ~~(d / 60), L = d % 60, o = r[d < 720 ? "am" : "pm"];
        let C = null;
        A && (C = `calc(var(--vuecal-time-cell-size) * ${(c.timeTo - d) / c.timeStep})`), V.push({
          minutesSum: d,
          // The sum of hours + minutes in minutes.
          hours: Z,
          minutes: L,
          formatted12: `${Z % 12 ? Z % 12 : 12}${L ? `:${L.toString().padStart(2, 0)}` : ""}${o}`,
          formatted24: `${Z.toString().padStart(2, 0)}:${L.toString().padStart(2, 0)}`,
          height: C
        });
      }
      return V;
    });
    return (V, I) => (O(), j("div", _n, [
      M(c).allDayEvents ? (O(), j("div", kn, [
        H(V.$slots, "all-day-label", {}, () => [
          Ge(ce(M(t).texts.allDay), 1)
        ])
      ])) : te("", !0),
      (O(!0), j(de, null, we(g.value, (d, A) => (O(), j("div", {
        class: "vuecal__time-cell",
        key: A,
        style: $e({ height: d.height || null })
      }, [
        H(V.$slots, "time-cell", {
          index: A,
          minutes: d.minutes,
          hours: d.hours,
          minutesSum: d.minutesSum,
          format12: d.formatted12,
          format24: d.formatted24
        }, () => [
          he("label", null, ce(M(c).twelveHour ? d.formatted12 : d.formatted24), 1)
        ])
      ], 4))), 128))
    ]));
  }
}, bn = {
  __name: "body",
  setup(y) {
    const t = Pe("vuecal"), { view: c, config: r, dateUtils: g, touch: V, eventsManager: I } = t, d = ue(null), A = ue(null), Z = ue(null), { resizeState: L } = I, o = Y(() => ({
      "--vuecal-grid-columns": c.cols,
      "--vuecal-grid-rows": c.rows,
      "--vuecal-body-max-height": r.time ? `${r.timeCellHeight * (r.timeTo - r.timeFrom) / r.timeStep}px` : null
    })), C = Y(() => {
      const D = r.horizontal, s = D ? A.value : Z.value, R = g.formatTime(ze(s, r), r.twelveHour ? "h:mm{am}" : "HH:mm");
      return {
        style: { [D ? "left" : "top"]: `${s}%` },
        time: R
      };
    }), X = (D) => {
      var $;
      if (c.isMonth || c.isYear || c.isYears) return;
      const s = (($ = D.touches) == null ? void 0 : $[0]) || D, { clientX: R, clientY: e } = s, { top: _, left: P } = d.value.getBoundingClientRect();
      r.horizontal ? A.value = (R - P) * 100 / d.value.clientWidth : Z.value = Ke(e - _, d.value), V.isResizingEvent && r.editableEvents.resizeX && (L.cellEl = f(R, e));
    }, v = () => {
      A.value = null, Z.value = null;
    }, f = (D, s) => {
      const R = document.elementFromPoint(D, s);
      return (R == null ? void 0 : R.closest(".vuecal__cell")) || null;
    };
    return Ze(() => {
      d.value.addEventListener("mousemove", X), d.value.addEventListener("touchmove", X), d.value.addEventListener("mouseleave", v), d.value.addEventListener("touchend", v);
    }), Xe(() => {
      d.value && (d.value.removeEventListener("mousemove", X), d.value.removeEventListener("touchmove", X), d.value.removeEventListener("mouseleave", v), d.value.removeEventListener("touchend", v));
    }), (D, s) => (O(), j("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: d,
      style: $e(o.value)
    }, [
      He(Ue, { name: "vuecal-shrink" }, {
        default: N(() => [
          M(r).timeAtCursor && (A.value !== null || Z.value !== null) ? (O(), j("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: $e(C.value.style)
          }, [
            he("label", null, ce(C.value.time), 1)
          ], 4)) : te("", !0)
        ]),
        _: 1
      }),
      (O(!0), j(de, null, we(M(c).cellDates, (R, e) => (O(), Se(kt, {
        key: e,
        start: R.start,
        end: R.end,
        index: e
      }, Ce({ _: 2 }, [
        D.$slots.cell ? {
          name: "cell",
          fn: N((_) => [
            H(D.$slots, "cell", ie({ ref_for: !0 }, _))
          ]),
          key: "0"
        } : void 0,
        D.$slots["cell-date"] ? {
          name: "cell-date",
          fn: N((_) => [
            H(D.$slots, "cell-date", ie({ ref_for: !0 }, _))
          ]),
          key: "1"
        } : void 0,
        D.$slots["cell-content"] ? {
          name: "cell-content",
          fn: N((_) => [
            H(D.$slots, "cell-content", ie({ ref_for: !0 }, _))
          ]),
          key: "2"
        } : void 0,
        D.$slots["cell-events"] ? {
          name: "cell-events",
          fn: N((_) => [
            H(D.$slots, "cell-events", ie({ ref_for: !0 }, _))
          ]),
          key: "3"
        } : void 0,
        D.$slots[`event.${M(c).id}`] ? {
          name: `event.${M(c).id}`,
          fn: N((_) => [
            H(D.$slots, `event.${M(c).id}`, ie({ ref_for: !0 }, _))
          ]),
          key: "4"
        } : void 0,
        D.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: N((_) => [
            H(D.$slots, "event.all-day", ie({ ref_for: !0 }, _))
          ]),
          key: "5"
        } : void 0,
        D.$slots.event ? {
          name: "event",
          fn: N((_) => [
            H(D.$slots, "event", ie({ ref_for: !0 }, _))
          ]),
          key: "6"
        } : void 0,
        D.$slots["event-count"] ? {
          name: "event-count",
          fn: N((_) => [
            H(D.$slots, "event-count", ie({ ref_for: !0 }, _))
          ]),
          key: "7"
        } : void 0,
        D.$slots["now-line"] ? {
          name: "now-line",
          fn: N((_) => [
            H(D.$slots, "now-line", ie({ ref_for: !0 }, _))
          ]),
          key: "8"
        } : void 0
      ]), 1032, ["start", "end", "index"]))), 128))
    ], 4));
  }
}, Tn = ["data-locale"], Mn = { class: "vuecal__scrollable-wrap" }, En = {
  key: 1,
  class: "vuecal__week-numbers"
}, Yn = { class: "vuecal__week-number" }, Sn = { class: "vuecal__body-wrap" }, zn = {
  __name: "index",
  props: Lt,
  emits: [
    "ready",
    "view-change",
    "update:view",
    "update:selectedDate",
    "update:viewDate",
    "update:events",
    "event-delete",
    "event-created",
    "event-dropped",
    "event-drag-start",
    "event-drag-end"
  ],
  setup(y, { expose: t, emit: c }) {
    const r = y, g = c, V = Tt("vuecal-el"), I = Pt({ props: r, emit: g, attrs: Et(), vuecalEl: V, uid: Mt() }), { config: d, view: A, dateUtils: Z, touch: L } = I, o = Y(() => d.time && (A.isDay || A.isDays || A.isWeek)), C = Y(() => Array(A.rows).fill().map((s, R) => Z.getWeek(Z.addDays(A.firstCellDate, 7 * R)))), X = Y(() => {
      var s;
      return {
        "vuecal--ready": d.ready,
        [`vuecal--${d.theme}-theme`]: d.theme,
        [`vuecal--${d.size}`]: !0,
        "vuecal--date-picker": d.datePicker,
        "vuecal--dark": d.dark,
        "vuecal--light": !d.dark,
        [`vuecal--${A.id}-view`]: !0,
        "vuecal--view-has-time": o.value,
        "vuecal--timeless": !d.time,
        "vuecal--dragging-cell": L.isDraggingCell,
        "vuecal--dragging-event": L.isDraggingEvent,
        "vuecal--resizing-event": L.isResizingEvent,
        "vuecal--has-schedules": (s = d.schedules) == null ? void 0 : s.length,
        "vuecal--horizontal": d.horizontal
      };
    }), v = Y(() => {
      var s;
      return {
        "--vuecal-time-cell-size": d.timeCellHeight && `${d.timeCellHeight}px`,
        "--vuecal-schedules-count": (s = d.schedules) == null ? void 0 : s.length
      };
    }), f = Y(() => {
      var s, R;
      return {
        "vuecal__scrollable--row": o.value || d.weekNumbers && A.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${A.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (s = d.schedules) == null ? void 0 : s.length,
        "vuecal__scrollable--no-schedules": !((R = d.schedules) != null && R.length),
        "vuecal__scrollable--no-all-day-bar": !d.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": d.allDayEvents
      };
    }), D = (s) => {
      s.target.closest(".vuecal__cell") && s.preventDefault();
    };
    return Ze(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && V.value.addEventListener("contextmenu", D), await Be(), d.ready = !0, g("ready", { config: d, view: A });
    }), Xe(() => {
      var s;
      (s = V == null ? void 0 : V.value) == null || s.removeEventListener("contextmenu", D);
    }), nt("vuecal", I), nt("$vuecalEl", V), t({ view: I.view }), (s, R) => (O(), j("div", {
      class: pe(["vuecal", X.value]),
      ref: "vuecal-el",
      "data-locale": s.locale,
      style: $e(v.value)
    }, [
      s.$slots.diy ? H(s.$slots, "diy", {
        key: 0,
        vuecal: M(I)
      }) : (O(), j(de, { key: 1 }, [
        He(Bt, null, Ce({ _: 2 }, [
          s.$slots.header ? {
            name: "header",
            fn: N((e) => [
              H(s.$slots, "header", ae(re(e)))
            ]),
            key: "0"
          } : void 0,
          !s.$slots.header && s.$slots["previous-button"] ? {
            name: "previous-button",
            fn: N((e) => [
              H(s.$slots, "previous-button", ae(re(e)))
            ]),
            key: "1"
          } : void 0,
          !s.$slots.header && s.$slots["next-button"] ? {
            name: "next-button",
            fn: N((e) => [
              H(s.$slots, "next-button", ae(re(e)))
            ]),
            key: "2"
          } : void 0,
          !s.$slots.header && s.$slots["today-button"] ? {
            name: "today-button",
            fn: N((e) => [
              H(s.$slots, "today-button", ae(re(e)))
            ]),
            key: "3"
          } : void 0,
          !s.$slots.header && s.$slots.title ? {
            name: "title",
            fn: N((e) => [
              H(s.$slots, "title", ae(re(e)))
            ]),
            key: "4"
          } : void 0,
          !s.$slots.header && s.$slots["title.day"] ? {
            name: "title.day",
            fn: N((e) => [
              H(s.$slots, "title.day", ae(re(e)))
            ]),
            key: "5"
          } : void 0,
          !s.$slots.header && s.$slots["title.days"] ? {
            name: "title.days",
            fn: N((e) => [
              H(s.$slots, "title.days", ae(re(e)))
            ]),
            key: "6"
          } : void 0,
          !s.$slots.header && s.$slots["title.week"] ? {
            name: "title.week",
            fn: N((e) => [
              H(s.$slots, "title.week", ae(re(e)))
            ]),
            key: "7"
          } : void 0,
          !s.$slots.header && s.$slots["title.month"] ? {
            name: "title.month",
            fn: N((e) => [
              H(s.$slots, "title.month", ae(re(e)))
            ]),
            key: "8"
          } : void 0,
          !s.$slots.header && s.$slots["title.year"] ? {
            name: "title.year",
            fn: N((e) => [
              H(s.$slots, "title.year", ae(re(e)))
            ]),
            key: "9"
          } : void 0,
          !s.$slots.header && s.$slots["title.years"] ? {
            name: "title.years",
            fn: N((e) => [
              H(s.$slots, "title.years", ae(re(e)))
            ]),
            key: "10"
          } : void 0,
          !s.$slots.header && s.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: N((e) => [
              H(s.$slots, "schedule-heading", ae(re(e)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        he("div", Mn, [
          He(Ue, {
            name: `vuecal-slide-fade--${M(A).transitionDirection}`
          }, {
            default: N(() => [
              (O(), j("div", {
                class: pe(["vuecal__scrollable", f.value]),
                key: M(A).id + M(A).start.getTime()
              }, [
                o.value ? (O(), Se($n, { key: 0 }, Ce({ _: 2 }, [
                  s.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: N((e) => [
                      H(s.$slots, "time-cell", ae(re(e)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : te("", !0),
                M(d).weekNumbers && M(A).isMonth ? (O(), j("div", En, [
                  (O(!0), j(de, null, we(C.value, (e) => (O(), j("div", Yn, [
                    H(s.$slots, "week-number", {}, () => [
                      he("small", null, ce(e), 1)
                    ])
                  ]))), 256))
                ])) : te("", !0),
                he("div", Sn, [
                  He(wn, null, Ce({ _: 2 }, [
                    s.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: N((e) => [
                        H(s.$slots, "weekday-heading", ae(re(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    s.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: N((e) => [
                        H(s.$slots, "schedule-heading", ae(re(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    s.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: N((e) => [
                        H(s.$slots, "event.all-day", ae(re(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    s.$slots.event ? {
                      name: "event",
                      fn: N((e) => [
                        H(s.$slots, "event", ae(re(e)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  He(bn, null, Ce({ _: 2 }, [
                    s.$slots.cell ? {
                      name: "cell",
                      fn: N((e) => [
                        H(s.$slots, "cell", ae(re(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    !s.$slots.cell && s.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: N((e) => [
                        H(s.$slots, "cell-date", ae(re(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    !s.$slots.cell && s.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: N((e) => [
                        H(s.$slots, "cell-content", ae(re(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    !s.$slots.cell && s.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: N((e) => [
                        H(s.$slots, "cell-events", ae(re(e)))
                      ]),
                      key: "3"
                    } : void 0,
                    !s.$slots.cell && !s.$slots["cell-events"] && s.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: N((e) => [
                        H(s.$slots, "event.all-day", ae(re(e)))
                      ]),
                      key: "4"
                    } : void 0,
                    !s.$slots.cell && !s.$slots["cell-events"] && s.$slots[`event.${M(A).id}`] ? {
                      name: `event.${M(A).id}`,
                      fn: N((e) => [
                        H(s.$slots, `event.${M(A).id}`, ae(re(e)))
                      ]),
                      key: "5"
                    } : void 0,
                    !s.$slots.cell && !s.$slots["cell-events"] && s.$slots.event ? {
                      name: "event",
                      fn: N((e) => [
                        H(s.$slots, "event", ae(re(e)))
                      ]),
                      key: "6"
                    } : void 0,
                    !s.$slots.cell && s.$slots["event-count"] ? {
                      name: "event-count",
                      fn: N((e) => [
                        H(s.$slots, "event-count", ae(re(e)))
                      ]),
                      key: "7"
                    } : void 0,
                    s.$slots["now-line"] ? {
                      name: "now-line",
                      fn: N((e) => [
                        H(s.$slots, "now-line", ae(re(e)))
                      ]),
                      key: "8"
                    } : void 0
                  ]), 1024)
                ])
              ], 2))
            ]),
            _: 3
          }, 8, ["name"])
        ])
      ], 64))
    ], 14, Tn));
  }
}, Vn = (y) => {
  Fe.texts = { ...ge.texts, ...y }, Fe.dateUtils.updateTexts(Fe.texts);
}, {
  addDatePrototypes: On,
  removeDatePrototypes: Hn,
  updateTexts: Pn,
  addDays: jn,
  subtractDays: Ln,
  addHours: An,
  subtractHours: Fn,
  addMinutes: Xn,
  subtractMinutes: Rn,
  getWeek: Wn,
  isToday: Nn,
  isSameDate: Bn,
  isInRange: In,
  isLeapYear: Gn,
  getPreviousFirstDayOfWeek: qn,
  stringToDate: Un,
  dateToMinutes: Jn,
  countDays: Zn,
  datesInSameTimeStep: Kn,
  isValid: Qn,
  formatDate: xn,
  formatDateLite: ea,
  formatTime: ta,
  formatTimeLite: na,
  formatMinutes: aa
} = Fe.dateUtils;
export {
  zn as VueCal,
  On as addDatePrototypes,
  jn as addDays,
  An as addHours,
  Xn as addMinutes,
  Zn as countDays,
  Jn as dateToMinutes,
  Kn as datesInSameTimeStep,
  xn as formatDate,
  ea as formatDateLite,
  aa as formatMinutes,
  ta as formatTime,
  na as formatTimeLite,
  qn as getPreviousFirstDayOfWeek,
  Wn as getWeek,
  In as isInRange,
  Gn as isLeapYear,
  Bn as isSameDate,
  Nn as isToday,
  Qn as isValidDate,
  Hn as removeDatePrototypes,
  Un as stringToDate,
  Ln as subtractDays,
  Fn as subtractHours,
  Rn as subtractMinutes,
  Pn as updateTexts,
  Vn as useLocale
};
