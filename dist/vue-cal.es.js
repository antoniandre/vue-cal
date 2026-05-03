import { computed as b, reactive as Te, watch as we, toRefs as Tt, ref as ie, onBeforeUnmount as Re, nextTick as Ie, inject as Le, openBlock as z, createElementBlock as P, renderSlot as O, unref as _, Fragment as fe, renderList as ke, normalizeClass as pe, createCommentVNode as Q, createElementVNode as ye, createVNode as He, Transition as Ue, withCtx as B, createBlock as Ce, resolveDynamicComponent as et, mergeProps as oe, toHandlers as Ge, normalizeProps as se, onMounted as Ke, toDisplayString as me, createTextVNode as qe, withModifiers as tt, normalizeStyle as _e, TransitionGroup as nt, createSlots as ze, useTemplateRef as Mt, useId as Et, useAttrs as Yt, provide as at, guardReactiveProps as re } from "vue";
/**
  * vue-cal v5.0.1-rc.41
  * (c) 2024-2026 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const De = {
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
}, St = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Je = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], Ct = Je.reduce((m, t, c) => (m[t] = c || 7, m), {}), zt = (m, t, c) => {
  const { dateUtils: r } = m, h = !1, j = b(() => {
    if (t.view && L.value[t.view]) return t.view;
    if (t.view && !L.value[t.view])
      return console.warn(
        `Vue Cal: the provided view \`${t.view}\` is not in the list of available views. The first available view will be chosen: \`${Object.keys(L.value)[0]}\`.`
      ), Object.keys(L.value)[0];
    const n = t.datePicker ? "month" : "week";
    return L.value[n] ? n : Object.keys(L.value)[0];
  }), N = b(() => t.sm && !t.xs), y = b(() => t.xs || t.datePicker), H = b(() => t.clickToNavigate || t.datePicker && t.clickToNavigate !== !1), Z = b(() => {
    const n = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, g = ($) => $.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [$, s] of Object.entries(c)) {
      const [X, K, ee] = $.match(/^on(Cell|Event)(.+)$/) || [];
      X && (n[K.toLowerCase()][g(ee).replace(/^-+|-+$/g, "")] = s);
    }
    return n;
  }), A = b(() => {
    var g;
    const n = {};
    return t.hideWeekends && (n[6] = !0) && (n[7] = !0), (g = t.hideWeekdays) != null && g.length && t.hideWeekdays.forEach(($) => n[Ct[$]] = !0), n;
  }), o = b(() => t.hideWeekends || A.value[6] && A.value[7]), L = b(() => {
    const n = t.datePicker;
    let g = 0, $ = {};
    const s = t.views;
    if (n && !s) return {
      month: { ...De.availableViews.month },
      year: { ...De.availableViews.year },
      years: { ...De.availableViews.years }
    };
    if (s)
      Array.isArray(s) ? $ = s.reduce((X, K) => (typeof K == "string" && De.availableViews[K] ? X[K] = De.availableViews[K] : g++, X), {}) : typeof s == "object" && ($ = Object.entries(s).reduce((X, [K, ee]) => {
        const { cols: W, rows: J } = De.availableViews[K];
        return X[K] = { cols: ee.cols || W, rows: ee.rows || J }, X;
      }, {})), g && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys($).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), $ = { ...De.availableViews });
    else if ($ = { ...De.availableViews }, t.horizontal) {
      const { days: X, week: K } = De.availableViews;
      $.days = { cols: X.rows, rows: X.cols }, $.week = { cols: K.rows, rows: K.cols };
    }
    return $;
  }), S = b(() => t.datePicker ? "month" : L.value.week ? "week" : Object.keys(L.value)[0]), u = b(() => {
    if (typeof t.selectedDate == "string") return r.stringToDate(t.selectedDate);
    if (t.selectedDate instanceof Date) return t.selectedDate;
    t.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", t.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), d = b(() => {
    if (!t.disableDays) return [];
    const n = [];
    if (Array.isArray(t.disableDays))
      for (let g of t.disableDays) {
        let $ = g;
        typeof g == "string" ? $ = r.stringToDate(g) : g instanceof Date && (g = r.formatDate(g, "YYYY-MM-DD")), $ instanceof Date && !isNaN($.getTime()) ? n.push(g) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", g);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", t.disableDays);
    return n;
  }), w = b(() => {
    let n = null;
    return t.minDate && typeof t.minDate == "string" ? n = r.stringToDate(t.minDate) : t.minDate && t.minDate instanceof Date && (n = t.minDate), (n == null ? void 0 : n.getTime()) || null;
  }), a = b(() => {
    let n = null;
    return t.maxDate && typeof t.maxDate == "string" ? n = r.stringToDate(t.maxDate) : t.maxDate && t.maxDate instanceof Date && (n = t.maxDate), (n == null ? void 0 : n.getTime()) || null;
  }), G = b(() => {
    var $;
    const { view: n } = m;
    return t.schedules.length && (n.isDay || n.isDays || n.isWeek) && (($ = t.schedules) == null ? void 0 : $.map((s, X) => ({ ...s, id: s.id ?? X + 1 }))) || void 0;
  }), e = b(() => {
    const n = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return t.editableEvents === !0 ? n : t.editableEvents === !1 ? Object.keys(n).map((g) => n[g] = !1) : { ...n, ...t.editableEvents };
  }), k = b(() => {
    const { view: n } = m, { eventCount: g } = t;
    return (Array.isArray(g) ? g.includes(n.id) : g) && (n.isMonth && !t.eventsOnMonthView || n.isYear);
  }), F = b(() => {
    const { view: n } = m;
    return t.allDayEvents && t.time && (n.isDay || n.isDays || n.isWeek);
  }), V = b(() => {
    const { view: n } = m;
    return t.horizontal && (n.isDay || n.isDays || n.isWeek);
  }), E = b(() => t.timeAtCursor && t.time), v = async (n) => {
    var $;
    let g = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((s) => s.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((s) => s.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((s) => s.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((s) => s.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((s) => s.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((s) => s.default), "../i18n/da.json": () => import("./i18n/da.js").then((s) => s.default), "../i18n/de.json": () => import("./i18n/de.js").then((s) => s.default), "../i18n/el.json": () => import("./i18n/el.js").then((s) => s.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((s) => s.default), "../i18n/en-us.json": () => Promise.resolve().then(() => jt).then((s) => s.default), "../i18n/es.json": () => import("./i18n/es.js").then((s) => s.default), "../i18n/et.json": () => import("./i18n/et.js").then((s) => s.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((s) => s.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((s) => s.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((s) => s.default), "../i18n/he.json": () => import("./i18n/he.js").then((s) => s.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((s) => s.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((s) => s.default), "../i18n/id.json": () => import("./i18n/id.js").then((s) => s.default), "../i18n/is.json": () => import("./i18n/is.js").then((s) => s.default), "../i18n/it.json": () => import("./i18n/it.js").then((s) => s.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((s) => s.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((s) => s.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((s) => s.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((s) => s.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((s) => s.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((s) => s.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((s) => s.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((s) => s.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((s) => s.default), "../i18n/no.json": () => import("./i18n/no.js").then((s) => s.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((s) => s.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((s) => s.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((s) => s.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((s) => s.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((s) => s.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((s) => s.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((s) => s.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((s) => s.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((s) => s.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((s) => s.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((s) => s.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((s) => s.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((s) => s.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((s) => s.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((s) => s.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((s) => s.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((s) => s.default) });
    {
      if (!g[`../i18n/${n}.json`]) {
        console.warn(`Vue Cal: the locale \`${n}\` does not exist. Falling back to \`en-us\`.`), n = "en-us";
        return;
      }
      g = await (($ = g[`../i18n/${n}.json`]) == null ? void 0 : $.call(g));
    }
    m.texts = Object.assign(m.texts, Object.assign({ ...De.texts }, g)), r.updateTexts(m.texts);
  }, M = Te(t.events || []);
  return we(
    [() => t.events, () => {
      var n;
      return (n = t.events) == null ? void 0 : n.length;
    }],
    ([n]) => M.splice(0, M.length, ...n || [])
  ), we(() => t.locale, (n) => v(n || "en-us")), (t.locale || !m.texts.today) && v(t.locale || "en-us"), {
    ...Tt(t),
    events: M,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: Z,
    defaultView: S,
    availableViews: L,
    disableDays: d,
    ready: h,
    sm: N,
    xs: y,
    clickToNavigate: H,
    hideWeekdays: A,
    hideWeekends: o,
    minTimestamp: w,
    maxTimestamp: a,
    schedules: G,
    selectedDate: u,
    editableEvents: e,
    showCellEventCount: k,
    allDayEvents: F,
    horizontal: V,
    timeAtCursor: E,
    view: j,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(A.value).length;
    },
    get size() {
      return y.value ? "xs" : N.value ? "sm" : "lg";
    },
    loadTexts: v
  };
}, je = (m, t) => {
  const c = t.timeTo - t.timeFrom;
  return (m - t.timeFrom) * 100 / c;
}, Ve = (m, t) => {
  const c = t.timeTo - t.timeFrom;
  return ~~(m * c / 100 + t.timeFrom);
}, Qe = (m, t) => {
  const c = t.clientHeight;
  return m * 100 / c;
}, Be = Te({ id: null, date: null });
let st = !1, Ze = !0;
const $e = Te({ el: null, cell: null, timeout: null }), be = Te({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function Vt(m) {
  const { config: t, view: c, eventsManager: r, emit: h, uid: j, dateUtils: N } = m, y = (w) => {
    var E;
    const a = t.horizontal, { clientX: G, clientY: e } = ((E = w.touches) == null ? void 0 : E[0]) || w, { top: k, left: F } = w.currentTarget.getBoundingClientRect(), V = ~~w.dataTransfer.getData("cursor-grab-at");
    if (a) {
      const v = G - F - V;
      return Ve(v * 100 / w.currentTarget.clientWidth, t);
    } else {
      const v = e - k - V;
      return Ve(Qe(v, w.currentTarget), t);
    }
  }, H = (w, a, G) => {
    const e = a.duration || Z(a.start, a.end) || t.timeStep;
    let k = Math.max(y(w), 0);
    if (t.snapToInterval) {
      const v = k + t.snapToInterval / 2;
      k = v - v % t.snapToInterval;
    }
    const F = new Date(new Date(G).setMinutes(k)), V = Math.min(k + e, 1440), E = new Date(new Date(G).setMinutes(V));
    return { start: F, end: E };
  }, Z = (w, a) => Math.round((a - w) / 6e4);
  return {
    eventDragStart: (w, a) => {
      if (w.target.nodeType === 3 || m.touch.isResizingEvent) return w.preventDefault();
      w.dataTransfer.effectAllowed = "move", w.dataTransfer.dropEffect = "move";
      const G = { ...a, _: { id: a._.id, duration: Z(a.start, a.end) } };
      try {
        w.dataTransfer.setData("text/plain", ""), w.dataTransfer.setData("event", JSON.stringify(G)), w.dataTransfer.setData("cursor-grab-at", t.horizontal ? w.offsetX : w.offsetY);
      } catch (k) {
        return console.warn("Vue Cal: Failed to set drag data:", k), w.preventDefault();
      }
      be.eventId = a._.id, be.fromVueCal = j, h("event-drag-start", {
        e: w,
        event: a
      });
      const e = w.target.closest(".vuecal__event");
      e.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        e.classList.add("vuecal__event--dragging-original"), e.classList.remove("vuecal__event--dragging-ghost");
      }, 0), st = !1, Object.assign(Be, { id: c.id, date: c.firstCellDate }), Ze = !0, m.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (w, a) => {
      be.eventId = null, w.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: G, toVueCal: e } = be;
      e && G !== e && r.deleteEvent(a._.id, 3), st && Ze && Be.id && c.switchView(Be.id, Be.date, !0), h("event-drag-end", {
        e: w,
        event: a,
        external: be.fromVueCal !== j
      }), be.fromVueCal = null, be.toVueCal = null, m.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (w, a) => {
      const { start: G } = a, e = w.currentTarget;
      if (!w.currentTarget.contains(w.relatedTarget)) {
        if (e === $e.el || !e.className.includes("vuecal__cell-content")) return !1;
        $e.el && ($e.cell.highlighted = !1), Object.assign($e, { el: e, cell: a, timeout: clearTimeout($e.timeout) }), a.highlighted = !0, ["years", "year", "month"].includes(c.id) && ($e.timeout = setTimeout(() => m.switchToNarrowerView(G), 2e3));
      }
    },
    cellDragOver: (w, a) => {
      const { start: G, schedule: e } = a;
      w.preventDefault(), a.highlighted = !0, (e || e === 0) && (a.highlightedSchedule = e);
    },
    cellDragLeave: (w, a) => {
      w.preventDefault(), !w.currentTarget.contains(w.relatedTarget) && (a.highlightedSchedule = !1, $e.cell === a && (clearTimeout($e.timeout), Object.assign($e, { el: null, cell: null, timeout: null }), a.highlighted = !1));
    },
    cellDragDrop: async (w, a, G = !1) => {
      var $, s, X, K, ee;
      w.preventDefault(), clearTimeout($e.timeout), Object.assign($e, { el: null, cell: null, timeout: null });
      const e = JSON.parse(w.dataTransfer.getData("event") || "{}");
      e.start && (e.start = new Date(e.start)), e.end && (e.end = new Date(e.end));
      let k, F, V;
      G ? (F = new Date(a.start), V = new Date(a.end)) : { start: F, end: V } = H(w, e, a.start);
      let { schedule: E } = (($ = w.target.closest("[data-schedule]")) == null ? void 0 : $.dataset) || {}, v;
      E !== void 0 && String(E).length && (v = ((X = (s = t.schedules) == null ? void 0 : s.find((W) => String(W.id) === String(E))) == null ? void 0 : X.id) ?? E);
      let M = () => {
      };
      be.fromVueCal === j ? (k = r.getEvent(e._.id), k && (k._.dragging = !1, M = (W) => {
        if (k.start = F, k.end = V, k.allDay = G, v !== void 0 && (k.schedule = v), W && typeof W == "object") {
          const { _: J, ...ue } = W;
          Object.assign(k, ue);
        }
      })) : (k = {
        ...e,
        start: F,
        end: V,
        ...v !== void 0 && { schedule: v },
        _: { id: ((K = e._) == null ? void 0 : K.id) || e.id, duration: Z(F, V) },
        getOverlappingEvents: () => r.getEventsInRange(F, V, { schedule: v })
      }, M = (W) => {
        if (k = r.createEvent(k), W && typeof W == "object") {
          const { _: J, ...ue } = W;
          Object.assign(k, ue);
        }
      });
      let n = !0;
      const { drop: g } = (ee = t.eventListeners) == null ? void 0 : ee.event;
      g && (n = await g({
        e: w,
        event: { ...k, start: F, end: V, schedule: v },
        overlaps: k.getOverlappingEvents({ start: F, end: V, schedule: v }),
        cell: a,
        external: be.fromVueCal !== j
      })), n !== !1 && M(n), a.highlighted = !1, a.highlightedSchedule = null, Ze = !1, be.toVueCal = j, h("event-dropped", {
        e: w,
        cell: a,
        event: k,
        originalEvent: e,
        external: be.fromVueCal !== j
      });
    }
  };
}
const rt = (m, t) => {
  let c, r, h, j = {}, N = {};
  const y = ie(m), H = () => {
    y.value.today || (y.value = t), Date.prototype.addDays = function(l) {
      return L(this, l || 0);
    }, Date.prototype.subtractDays = function(l) {
      return S(this, l || 0);
    }, Date.prototype.addHours = function(l) {
      return u(this, l || 0);
    }, Date.prototype.subtractHours = function(l) {
      return d(this, l || 0);
    }, Date.prototype.addMinutes = function(l) {
      return w(this, l || 0);
    }, Date.prototype.subtractMinutes = function(l) {
      return a(this, l || 0);
    }, Date.prototype.getWeek = function() {
      return e(this);
    }, Date.prototype.isToday = function() {
      return k(this);
    }, Date.prototype.isLeapYear = function() {
      return E(this);
    }, Date.prototype.format = function(l = "YYYY-MM-DD") {
      return X(this, l);
    }, Date.prototype.formatTime = function(l = "HH:mm") {
      return ee(this, l);
    };
  }, Z = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, A = (l) => {
    y.value = l, Date.prototype.subtractDays && H();
  }, o = () => (r !== (/* @__PURE__ */ new Date()).getDate() && (c = /* @__PURE__ */ new Date(), r = c.getDate(), h = `${c.getFullYear()}-${c.getMonth()}-${c.getDate()}`), h), L = (l, T) => {
    const D = new Date(l.valueOf());
    return D.setDate(D.getDate() + T), D;
  }, S = (l, T) => {
    const D = new Date(l.valueOf());
    return D.setDate(D.getDate() - T), D;
  }, u = (l, T) => {
    const D = new Date(l.valueOf());
    return D.setHours(D.getHours() + T), D;
  }, d = (l, T) => {
    const D = new Date(l.valueOf());
    return D.setHours(D.getHours() - T), D;
  }, w = (l, T) => {
    const D = new Date(l.valueOf());
    return D.setMinutes(D.getMinutes() + T), D;
  }, a = (l, T) => {
    const D = new Date(l.valueOf());
    return D.setMinutes(D.getMinutes() - T), D;
  }, G = (l, T) => {
    const D = (te) => {
      const ae = te % T;
      return ae !== 0 && (te += ae >= T / 2 ? T - ae : -ae), te;
    };
    if (typeof l == "number") return D(l);
    if (l instanceof Date) {
      let te = D(l.getMinutes());
      te >= 60 && (l.setHours(l.getHours() + 1), te = 0), l.setMinutes(te, 0, 0);
    }
  }, e = (l, T = !1) => {
    const D = new Date(Date.UTC(l.getFullYear(), l.getMonth(), l.getDate())), te = D.getUTCDay() || 7;
    D.setUTCDate(D.getUTCDate() + 4 - te);
    const ae = new Date(Date.UTC(D.getUTCFullYear(), 0, 1));
    return Math.ceil(((D - ae) / 864e5 + 1) / 7) + (T ? 1 : 0);
  }, k = (l) => `${l.getFullYear()}-${l.getMonth()}-${l.getDate()}` === o(), F = (l, T) => {
    if (!l || !T) return console.warn(`Vue Cal: missing date${l ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (s(l)) {
      if (!s(T)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${T}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${l}\`.`);
    return l.getFullYear() === T.getFullYear() && l.getMonth() === T.getMonth() && l.getDate() === T.getDate();
  }, V = (l, T, D) => s(l) ? l.getTime() >= T && l.getTime() <= D : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${l}\`.`), E = (l) => {
    const T = l.getFullYear();
    return !(T % 400) || T % 100 && !(T % 4);
  }, v = (l = null, T) => {
    const D = l && new Date(l.valueOf()) || /* @__PURE__ */ new Date(), te = T ? 7 : 6;
    return D.setDate(D.getDate() - (D.getDay() + te) % 7), D;
  }, M = (l) => l instanceof Date ? l : (l.length === 10 && (l += " 00:00"), new Date(l.replace(/-/g, "/"))), n = (l) => l.getHours() * 60 + l.getMinutes(), g = (l, T) => {
    typeof l == "string" && (l = l.replace(/-/g, "/")), typeof T == "string" && (T = T.replace(/-/g, "/")), l = new Date(l).setHours(0, 0, 0, 0), T = new Date(T).setHours(0, 0, 1, 0);
    const D = (new Date(T).getTimezoneOffset() - new Date(l).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((T - l - D) / (24 * 3600 * 1e3));
  }, $ = (l, T, D) => Math.abs(l.getTime() - T.getTime()) <= D * 60 * 1e3, s = (l) => l && l instanceof Date && !isNaN(l), X = (l, T = "YYYY-MM-DD", D = null) => {
    if (D || (D = y.value), T || (T = "YYYY-MM-DD"), T === "YYYY-MM-DD") return K(l);
    j = {}, N = {};
    const te = {
      YYYY: () => le(l, D).YYYY,
      YY: () => le(l, D).YY(),
      M: () => le(l, D).M,
      MM: () => le(l, D).MM(),
      MMM: () => le(l, D).MMM(),
      MMMM: () => le(l, D).MMMM(),
      MMMMG: () => le(l, D).MMMMG(),
      D: () => le(l, D).D,
      DD: () => le(l, D).DD(),
      S: () => le(l, D).S(),
      d: () => le(l, D).d,
      dd: () => le(l, D).dd(),
      ddd: () => le(l, D).ddd(),
      dddd: () => le(l, D).dddd(),
      HH: () => de(l, D).HH,
      H: () => de(l, D).H,
      hh: () => de(l, D).hh,
      h: () => de(l, D).h,
      am: () => de(l, D).am,
      AM: () => de(l, D).AM,
      mm: () => de(l, D).mm,
      m: () => de(l, D).m,
      s: () => de(l, D).s
    };
    return T.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (ae, ve) => {
      const i = te[ve.replace(/\{|\}/g, "")];
      return i !== void 0 ? i() : ve;
    });
  }, K = (l) => {
    const T = l.getMonth() + 1, D = l.getDate();
    return `${l.getFullYear()}-${T < 10 ? "0" : ""}${T}-${D < 10 ? "0" : ""}${D}`;
  }, ee = (l, T = "HH:mm", D = null, te = !1) => {
    let ae = !1;
    if (te) {
      const [C, p, Y] = [l.getHours(), l.getMinutes(), l.getSeconds()];
      C + p + Y === 141 && (ae = !0);
    }
    if (l instanceof Date && T === "HH:mm") return ae ? "24:00" : W(l);
    N = {}, D || (D = y.value);
    const ve = de(l, D), i = T.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (C, p) => {
      const Y = ve[p.replace(/\{|\}/g, "")];
      return Y !== void 0 ? Y : p;
    });
    return ae ? i.replace("23:59", "24:00") : i;
  }, W = (l) => {
    const T = l.getHours(), D = l.getMinutes();
    return `${(T < 10 ? "0" : "") + T}:${(D < 10 ? "0" : "") + D}`;
  }, J = (l) => {
    const T = Math.floor(l / 60).toString().padStart(2, 0), D = (l % 60).toString().padStart(2, 0);
    return `${T}:${D}`;
  }, ue = (l) => {
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
  }, le = (l, T) => {
    if (j.D) return j;
    const D = l.getFullYear(), te = l.getMonth() + 1, ae = l.getDate(), i = (l.getDay() - 1 + 7) % 7;
    return j = {
      // Year.
      YYYY: D,
      // 2024.
      YY: () => D.toString().substring(2),
      // 24.
      // Month.
      M: te,
      // 1 to 12.
      MM: () => te.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => T.months[te - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => T.months[te - 1],
      // January to December.
      MMMMG: () => (T.monthsGenitive || T.months)[te - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: ae,
      // 1 to 31.
      DD: () => ae.toString().padStart(2, 0),
      // 01 to 31.
      S: () => ue(ae),
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
    }, j;
  }, de = (l, T) => {
    if (N.am) return N;
    let D, te, ae;
    l instanceof Date ? (D = l.getHours(), te = l.getMinutes(), ae = l.getSeconds()) : (D = Math.floor(l / 60), te = Math.floor(l % 60));
    const ve = D % 12 ? D % 12 : 12, i = (T || { am: "am", pm: "pm" })[D === 24 || D < 12 ? "am" : "pm"];
    return N = {
      H: D,
      h: ve,
      HH: D.toString().padStart(2, 0),
      hh: ve.toString().padStart(2, 0),
      am: i,
      AM: i.toUpperCase(),
      m: te,
      mm: te.toString().padStart(2, 0),
      s: ae
    }, N;
  };
  return {
    addDatePrototypes: H,
    removeDatePrototypes: Z,
    updateTexts: A,
    addDays: L,
    subtractDays: S,
    addHours: u,
    subtractHours: d,
    addMinutes: w,
    subtractMinutes: a,
    snapToInterval: G,
    getWeek: e,
    isToday: k,
    isSameDate: F,
    isInRange: V,
    isLeapYear: E,
    getPreviousFirstDayOfWeek: v,
    stringToDate: M,
    dateToMinutes: n,
    countDays: g,
    datesInSameTimeStep: $,
    isValid: s,
    formatDate: X,
    formatDateLite: K,
    formatTime: ee,
    formatTimeLite: W,
    formatMinutes: J
  };
}, Ot = (m) => {
  const { dateUtils: t, config: c } = m;
  let r = 0;
  const h = b(() => {
    var F, V, E, v, M;
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
    }, k = c.events.slice().sort((n, g) => n.start - g.start < 0 ? -1 : 1);
    for (let n of k) {
      const g = typeof n.start == "string" || typeof n.end == "string", $ = !((F = n._) != null && F.register) || !n.isOverlapping || !n.delete;
      let s = !1;
      if (!g && ((V = n._) != null && V.cachedStart) && ((E = n._) != null && E.cachedEnd) && (s = n.start.getTime() !== ((v = n._) == null ? void 0 : v.cachedStart) || n.end.getTime() !== ((M = n._) == null ? void 0 : M.cachedEnd)), g || $ || s) {
        if (!j(n)) continue;
        N(n), n._.cachedStart = n.start.getTime(), n._.cachedEnd = n.end.getTime();
      }
      if (e.byId[n._.id] = n, n.recurring)
        e.recurring.push(n._.id);
      else if (!t.isSameDate(n.start, new Date(n.end.getTime() - 1)))
        n._.multiday = c.multidayEvents, c.multidayEvents ? e.multiday.push(n._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), n.end = new Date(new Date(n.start).setHours(23, 59, 59, 999)), N(n)), e.byDate[n._.startFormatted] || (e.byDate[n._.startFormatted] = []), e.byDate[n._.startFormatted].push(n._.id);
      else {
        e.byDate[n._.startFormatted] || (e.byDate[n._.startFormatted] = []), e.byDate[n._.startFormatted].push(n._.id);
        const X = n._.startFormatted.substring(0, 4), K = n._.startFormatted.substring(5, 7), ee = n._.startFormatted.substring(8, 10);
        e.byYear[X] || (e.byYear[X] = {}), e.byYear[X][K] || (e.byYear[X][K] = {}), e.byYear[X][K][ee] || (e.byYear[X][K][ee] = []), e.byYear[X][K][ee].push(n._.id);
      }
    }
    return e;
  }), j = (e) => !e.start || !e.end ? (console.error("Vue Cal: Event is missing start or end date", e), !1) : (typeof e.start == "string" && (e.start = t.stringToDate(e.start)), typeof e.end == "string" && (e.end = t.stringToDate(e.end)), e.start.setSeconds(0, 0), e.end.getSeconds() === 59 ? e.end.setMinutes(e.end.getMinutes() + 1, 0, 0) : e.end.setSeconds(0, 0), isNaN(e.start) || isNaN(e.end) || e.end.getTime() < e.start.getTime() ? (isNaN(e.start) ? console.error(`Vue Cal: invalid start date for event "${e.title}".`, e.start) : isNaN(e.end) ? console.error(`Vue Cal: invalid end date for event "${e.title}".`, e.end) : console.error(`Vue Cal: invalid event dates for event "${e.title}". The event ends before it starts.`, e.start, e.end), !1) : !0), N = (e) => {
    e._ || (e._ = {}), e._.id = e._.id || ++r, e._.multiday = !t.isSameDate(e.start, new Date(e.end.getTime() - 1)), e._.startFormatted = t.formatDate(e.start), e._.endFormatted = t.formatDate(e.end), e._.startMinutes = ~~t.dateToMinutes(e.start), e._.endMinutes = ~~t.dateToMinutes(e.end);
    const k = e.start.getHours(), F = e.start.getMinutes().toString().padStart(2, 0), V = e.end.getHours(), E = e.end.getMinutes().toString().padStart(2, 0);
    e._.startTimeFormatted24 = `${k.toString().padStart(2, 0)}:${F}`, e._.startTimeFormatted12 = `${k % 12 || 12}${F ? `:${F}` : ""} ${k < 12 ? "AM" : "PM"}`, e._.endTimeFormatted24 = `${V.toString().padStart(2, 0)}:${E}`, e._.endTimeFormatted12 = `${V % 12 || 12}${E ? `:${E}` : ""} ${V < 12 ? "AM" : "PM"}`, e._.duration = Math.abs(~~((e.end - e.start) / 6e4)), e.delete || (e.delete = function(v) {
      return A(this._.id, v);
    }), e._.deleting === void 0 && (e._.deleting = !1), e._.deleted === void 0 && (e._.deleted = !1), e.isOverlapping || (e.isOverlapping = function(v = null) {
      return this.getOverlappingEvents(v).length;
    }), e.getOverlappingEvents || (e.getOverlappingEvents = function(v = null) {
      var s;
      const M = (v == null ? void 0 : v.start) || this.start, n = (v == null ? void 0 : v.end) || this.end, g = (v == null ? void 0 : v.schedule) !== void 0 && (v == null ? void 0 : v.schedule) !== null ? v.schedule : this.schedule, $ = (s = c.schedules) != null && s.length ? g : null;
      return L(M, n, { excludeIds: [this._.id], schedule: $ });
    }), e._.register || (e._.register = (v) => {
      e._.$el = v, e._.fireCreated && (m.emit("event-created", e), delete e._.fireCreated);
    }), e._.unregister || (e._.unregister = () => {
      e._.$el = null, e._.register = null, e.isOverlapping = null, e.getOverlappingEvents = null, e.delete = null;
    });
  }, y = (e) => h.value.byId[e], H = (e) => {
    const k = [];
    for (const { start: F, end: V } of e) {
      const E = L(F, V);
      E.length && k.push(...E);
    }
    return k;
  }, Z = (e) => {
    if (!e.start || !e.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return c.snapToInterval && (t.snapToInterval(e.start, c.snapToInterval), t.snapToInterval(e.end, c.snapToInterval)), e = { ...e }, e._ || (e._ = {}), e._.id = ++r, e._.fireCreated = !0, c.events.push(e), e;
  }, A = async (e, k = 0) => {
    var M, n;
    if (!e) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let F = typeof e == "string" || !isNaN(e) ? e : null;
    const V = typeof e == "object" ? Object.entries(e) : null;
    if (V) {
      const [g, $] = V[0];
      F = (M = c.events.find((s) => s[g] === $)) == null ? void 0 : M._.id;
    }
    if (!c.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!F) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const E = c.events.findIndex((g) => g._.id === F);
    if (E === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${F}\`.`);
    const v = c.events[E];
    if (v.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${F}\` since it was explicitely set to \`delete: false\`.`);
    switch (k) {
      case 0:
        v._.deleting ? c.events.splice(E, 1) : v._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        v._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        v._.deleted = !0, c.events[E]._.deleted = !0, (n = v._.$el) == null || n.dispatchEvent(new CustomEvent("event-deleted", { detail: v._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        c.events.splice(E, 1), m.emit("update:events", c.events), m.emit("event-delete", v);
        break;
    }
    return !0;
  }, o = (e, k, F) => {
    const V = c.allDayEvents ? { allDay: F } : {}, E = L(e, k, { background: !1, ...V });
    if (!E.length) return { cellOverlaps: {}, longestStreak: 0 };
    const v = {};
    let M = [], n = 0;
    E.sort((g, $) => g.start - $.start || g.end - g.start - ($.end - $.start));
    for (const g of E) {
      const $ = g._.id;
      v[$] || (v[$] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), M = M.filter((W) => W.end > g.start);
      const s = M.filter((W) => {
        var ue;
        return (!((ue = c.schedules) != null && ue.length) || g.schedule === W.schedule) && W.start < g.end;
      }), X = new Set(s.map((W) => {
        var J;
        return ((J = v[W._.id]) == null ? void 0 : J.position) ?? 0;
      }));
      let K = 0;
      for (; X.has(K); ) K++;
      v[$].position = K, M.push(g);
      const ee = Math.max(1, ...s.map((W) => {
        var J;
        return ((J = v[W._.id]) == null ? void 0 : J.maxConcurrent) ?? 1;
      }));
      v[$].maxConcurrent = Math.max(s.length + 1, ee);
      for (const W of s)
        v[W._.id].overlaps.add($), v[$].overlaps.add(W._.id), v[W._.id].maxConcurrent = v[$].maxConcurrent;
      n = Math.max(n, v[$].maxConcurrent);
    }
    for (const g in v) v[g].overlaps = [...v[g].overlaps];
    return { cellOverlaps: v, longestStreak: n };
  }, L = (e, k, { excludeIds: F = [], schedule: V = null, background: E = !0, allDay: v = !1 } = {}) => {
    const { byId: M, byYear: n } = h.value, g = Object.keys(M).length;
    if (!g) return [];
    const $ = e.getFullYear(), s = k.getFullYear(), X = e.getMonth() + 1, K = k.getMonth() + 1, ee = e.getDate(), W = k.getDate(), J = new Date(e).setHours(0, 0, 0, 0), ue = new Date(k).setHours(23, 59, 59, 999), le = new Set(F), de = [];
    if (g <= 100) {
      for (const l of Object.values(M))
        !l || le.has(l._.id) || V !== null && V !== l.schedule || E === !1 && l.background || c.allDayEvents && (v && !l.allDay || !v && l.allDay) || l.start.getTime() < ue && l.end.getTime() > J && de.push(l);
      return de;
    }
    for (let l = $; l <= s; l++) {
      const T = `${l}`, D = n[T];
      if (!D) continue;
      const te = l === $ ? X : 1, ae = l === s ? K : 12;
      for (let ve = te; ve <= ae; ve++) {
        const i = String(ve).padStart(2, "0"), C = D[i];
        if (C)
          for (const p in C) {
            const Y = +p;
            if (l === $ && ve === X && Y < ee || l === s && ve === K && Y > W) continue;
            const I = C[p];
            if (I != null && I.length)
              for (let q = 0; q < I.length; q++) {
                const U = M[I[q]];
                !U || le.has(U._.id) || V !== null && V !== U.schedule || E === !1 && U.background || c.allDayEvents && (v && !U.allDay || !v && U.allDay) || U.start.getTime() < ue && U.end.getTime() > J && de.push(U);
              }
          }
      }
    }
    return de;
  }, S = (e, k, F) => {
    const V = e.allDay || !c.time, E = V ? new Date(e.start).setHours(0, 0, 0, 0) : e.start.getTime(), v = V ? new Date(e.end).setHours(23, 59, 59, 999) : e.end.getTime(), M = V ? new Date(k).setHours(0, 0, 0, 0) : k.getTime(), n = V ? new Date(F).setHours(23, 59, 59, 999) : F.getTime();
    return v > M && E < n;
  }, u = Te({
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
  }), d = (e, k) => {
    var M;
    const F = u[c.horizontal ? "movePercentageX" : "movePercentageY"];
    let V = Ve(F, c);
    if (V = Math.max(0, Math.min(V, 1440)), c.snapToInterval) {
      const n = V + c.snapToInterval / 2;
      V = n - n % c.snapToInterval;
    }
    let E = e.start, v = new Date(k.getTime() + V * 6e4);
    return u.moveX && ((M = m.touch) != null && M.currentHoveredCell) && u.cellEl && new Date(parseInt(m.touch.currentHoveredCell.dataset.start)), v < u.resizeStartDate && (E = v, v = u.resizeStartDate), { newStart: E, newEnd: v };
  }, w = async (e) => {
    var V, E, v, M;
    const { clientX: k, clientY: F } = ((V = e.touches) == null ? void 0 : V[0]) || e;
    if (u.fromResizer && !u.resizingOriginalEvent) {
      u.resizingOriginalEvent = { ...u.resizingEvent, _: { ...u.resizingEvent._ } };
      const n = ((E = c.eventListeners) == null ? void 0 : E.event) || {};
      (v = n["resize-start"]) == null || v.call(n, { e, event: u.resizingEvent });
    }
    if (u.cellEl) {
      const { top: n, left: g, width: $, height: s } = u.cellEl.getBoundingClientRect();
      u.moveX = k - g, u.moveY = F - n, u.movePercentageX = u.moveX * 100 / $, u.movePercentageY = u.moveY * 100 / s;
    }
    if (u.documentMouseX = k, u.documentMouseY = F, u.fromResizer && u.resizingEvent) {
      const n = new Date(parseInt(u.cellEl.dataset.start)), { newStart: g, newEnd: $ } = d(u.resizingEvent, n);
      let s = !0;
      const { resize: X } = ((M = c.eventListeners) == null ? void 0 : M.event) || {};
      X && (s = await X({
        e,
        event: { ...u.resizingEvent, start: g, end: $ },
        overlaps: u.resizingEvent.getOverlappingEvents({ start: g, end: $ })
      })), s !== !1 ? (u.resizingEvent.start = g, u.resizingEvent.end = $, u.resizingLastAcceptedEvent && (u.resizingLastAcceptedEvent = null), e.preventDefault()) : X && (u.resizingLastAcceptedEvent = { ...u.resizingEvent, _: { ...u.resizingEvent._ } });
    }
  }, a = async (e) => {
    var k, F, V, E;
    if ((k = m.touch) != null && k.isResizingEvent && u.resizingEvent) {
      const v = new Date(parseInt(u.cellEl.dataset.start)), { newStart: M, newEnd: n } = d(u.resizingEvent, v);
      let g = !0;
      const s = (((F = c.eventListeners) == null ? void 0 : F.event) || {})["resize-end"];
      s && (g = await s({
        e,
        event: u.resizingEvent,
        original: u.resizingOriginalEvent,
        // Original event details before resizing.
        overlaps: u.resizingEvent.getOverlappingEvents({ start: M, end: n })
      })), u.resizingEvent.start = g === !1 ? (u.resizingLastAcceptedEvent || u.resizingOriginalEvent).start : ((V = u.resizingLastAcceptedEvent) == null ? void 0 : V.start) || M, u.resizingEvent.end = g === !1 ? (u.resizingLastAcceptedEvent || u.resizingOriginalEvent).end : ((E = u.resizingLastAcceptedEvent) == null ? void 0 : E.end) || n, u.resizingEvent._.duration < 1 && (u.resizingEvent.start = u.resizingOriginalEvent.start, u.resizingEvent.end = u.resizingOriginalEvent.end), m.touch.isResizingEvent = !1, m.touch.currentHoveredCell = null;
    }
    document.removeEventListener(e.type === "touchend" ? "touchmove" : "mousemove", w, { passive: !u.fromResizer }), m.touch.isResizingEvent = !1, u.fromResizer = !1, u.resizingEvent = null, u.resizingOriginalEvent = null, u.resizingLastAcceptedEvent = null, u.startX = 0, u.startY = 0, u.moveX = 0, u.moveY = 0, u.startPercentageX = 0, u.startPercentageY = 0, u.movePercentageX = 0, u.movePercentageY = 0, u.documentMouseX = 0, u.documentMouseY = 0, u.cellEl = null, u.resizeStartDate = null, u.schedule = null;
  };
  return {
    events: h,
    resizeState: u,
    getEvent: y,
    getViewEvents: H,
    getCellOverlappingEvents: o,
    getEventsInRange: L,
    createEvent: Z,
    deleteEvent: A,
    isEventInRange: S,
    handleEventResize: (e, k, F) => {
      var E;
      const V = ((E = e.touches) == null ? void 0 : E[0]) || e;
      if (u.fromResizer = !!V.target.closest(".vuecal__event-resizer"), u.fromResizer) {
        m.touch.isResizingEvent = !0;
        const v = F.getBoundingClientRect();
        u.startX = V.clientX - v.left, u.startY = V.clientY - v.top, u.startPercentageX = u.startX * 100 / v.width, u.startPercentageY = u.startY * 100 / v.height, u.cellEl = F.closest(".vuecal__cell"), u.resizeStartDate = k.start, u.resizingEvent = k, document.addEventListener(e.type === "touchstart" ? "touchmove" : "mousemove", w, { passive: !u.fromResizer }), document.addEventListener(e.type === "touchstart" ? "touchend" : "mouseup", a, { once: !0 });
      }
    }
  };
}, Ht = ({ config: m, dateUtils: t, emit: c, texts: r, eventsManager: h }, j) => {
  const { availableViews: N } = m, y = ie(m.view && N[m.view] ? m.view : m.defaultView), H = ie(m.selectedDate || null), Z = ie(/* @__PURE__ */ new Date()), A = ie(new Date(m.viewDate || Z.value));
  A.value.setHours(0, 0, 0, 0);
  const o = ie(new Date(A));
  let L = null;
  const S = b(() => y.value === "month" ? o.value : v.value), u = b(() => y.value === "month" ? new Date(o.value.getFullYear(), o.value.getMonth() + 1, 0, 23, 59, 59, 999) : n.value), d = b(() => y.value === "week" ? t.getPreviousFirstDayOfWeek(v.value, m.startWeekOnSunday) : y.value === "month" ? v.value : S.value), w = b(() => {
    if (y.value === "week") {
      const f = t.addDays(d.value, 7);
      return f.setMilliseconds(-1), f;
    }
    return y.value === "month" ? n.value : u.value;
  }), a = b(() => {
    const f = Z.value.getTime();
    if (y.value === "week")
      return d.value.getTime() <= f && f <= w.value.getTime();
    const R = v.value.getTime(), ne = n.value.getTime();
    return R <= f && f <= ne;
  }), G = Te({
    show: b(() => {
      if (["day", "days", "week"].includes(y.value) && !(!a.value || !m.time || m.allDay) && !(m.timeFrom > t.dateToMinutes(Z.value)) && !(t.dateToMinutes(Z.value) > m.timeTo))
        return !0;
    }),
    nowInMinutes: b(() => t.dateToMinutes(Z.value)),
    todaysTimePosition: b(() => je(G.nowInMinutes, m)),
    style: b(() => `${m.horizontal ? "left" : "top"}: ${G.todaysTimePosition}%`),
    currentTime: b(() => t.formatTime(Z.value, m.twelveHour ? "h:mm {am}" : "HH:mm"))
  });
  function e() {
    Z.value = /* @__PURE__ */ new Date(), L = setTimeout(e, 60 * 1e3);
  }
  function k() {
    L = setTimeout(e, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), e();
  }
  const F = b(() => {
    if (!m.availableViews[y.value]) return 1;
    let f = m.availableViews[y.value].cols;
    return m.hasHiddenDays && ["week", "month"].includes(y.value) && (f -= m.hasHiddenDays), f;
  }), V = b(() => {
    var f;
    return ((f = m.availableViews[y.value]) == null ? void 0 : f.rows) || 1;
  }), E = b(() => F.value * V.value), v = b(() => {
    if (y.value === "month") {
      let f = o.value.getDay() || 7;
      return m.startWeekOnSunday && !m.hideWeekdays[7] && (f += 1), m.viewDayOffset && (f -= m.viewDayOffset), t.subtractDays(o.value, f - 1);
    }
    if (y.value === "week") {
      const f = "1234567".split("").filter((ne) => !Object.keys(m.hideWeekdays).includes(ne));
      let R = Math.min(...f);
      return m.startWeekOnSunday && !m.hideWeekdays[7] && (R = 1), m.viewDayOffset && (R += m.viewDayOffset), t.addDays(o.value, R - 1);
    }
    return o.value;
  }), M = b(() => {
    const f = [], R = ["days", "week", "month"].includes(y.value);
    let ne = 0;
    for (let x = 0; x < E.value + ne; x++)
      switch (y.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const ge = t.addDays(v.value, x), Ne = ge.getDay() || 7;
          if (R && m.hasHiddenDays && m.hideWeekdays[Ne]) {
            ne++;
            continue;
          }
          const Oe = new Date(ge);
          Oe.setHours(23, 59, 59, 999), f.push({ start: ge, startFormatted: t.formatDate(ge), end: Oe });
          break;
        }
        case "year":
          f.push({
            start: new Date(v.value.getFullYear(), x, 1, 0, 0, 0, 0),
            end: new Date(v.value.getFullYear(), x + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          f.push({
            start: new Date(v.value.getFullYear() + x, 0, 1, 0, 0, 0, 0),
            end: new Date(v.value.getFullYear() + x + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return f;
  }), n = b(() => M.value[M.value.length - 1].end), g = ie("right"), $ = b(() => {
    const f = Object.keys(m.availableViews);
    return f[f.indexOf(y.value) + 1];
  }), s = b(() => {
    const f = Object.keys(m.availableViews);
    return f[f.indexOf(y.value) - 1];
  });
  function X(f, R, ne = !1) {
    if (!R || !R[f]) return f + 1;
    const x = R[f];
    return ne && typeof x == "string" ? x.substring(0, 3) : x;
  }
  function K(f, R, ne) {
    const { monthsArray: x, monthBeforeDay: ge, canTruncate: Ne, xs: Oe } = ne, Ee = f.getMonth(), Ye = f.getFullYear(), Se = R.getMonth(), Pe = R.getFullYear(), We = Ee !== Se, bt = Ye !== Pe, Me = Ne && (Oe || We), Ae = f.getDate(), Fe = R.getDate();
    return bt ? ge ? `${X(Ee, x, Me)} ${Ae}, ${Ye} - ${X(Se, x, Me)} ${Fe}, ${Pe}` : `${Ae} ${X(Ee, x, Me)} ${Ye} - ${Fe} ${X(Se, x, Me)} ${Pe}` : We ? ge ? `${X(Ee, x, Me)} ${Ae} - ${X(Se, x, Me)} ${Fe}, ${Ye}` : `${Ae} ${X(Ee, x, Me)} - ${Fe} ${X(Se, x, Me)} ${Ye}` : ge ? `${X(Ee, x, Me)} ${Ae}-${Fe}, ${Ye}` : `${Ae}-${Fe} ${X(Ee, x, Me)} ${Ye}`;
  }
  const ee = b(() => {
    const { dateFormat: f, months: R, monthsGenitive: ne, week: x, truncations: ge } = r, Ne = m.locale, Oe = ge !== !1, Ee = f.indexOf("M") < f.indexOf("D"), Ye = ne && Ne === "el" ? ne : R;
    switch (y.value) {
      case "day":
        return t.formatDate(v.value, f);
      case "days":
      case "week": {
        const Se = {
          monthsArray: Ye,
          monthBeforeDay: Ee,
          canTruncate: Oe,
          xs: m.xs
        };
        let Pe = K(v.value, n.value, Se);
        if (y.value === "week") {
          const We = t.getWeek(
            v.value,
            m.startWeekOnSunday && !m.hideWeekdays[7]
          );
          Pe += ` <small>${x} ${We}</small>`;
        }
        return Pe;
      }
      case "month": {
        const Se = `${m.xs && Oe ? "MMM" : "MMMM"} YYYY`;
        return t.formatDate(S.value, Se);
      }
      case "year":
        return v.value.getFullYear();
      case "years":
        return `${v.value.getFullYear()} - ${u.value.getFullYear()}`;
    }
  });
  async function W() {
    switch (o.value = new Date(A.value || Z.value), o.value.setHours(0, 0, 0, 0), y.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        o.value = t.getPreviousFirstDayOfWeek(o.value, m.startWeekOnSunday && !m.hideWeekdays[7]);
        break;
      case "month":
        o.value = new Date(o.value.getFullYear(), o.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        o.value = new Date(o.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        o.value = new Date(o.value.getFullYear() - o.value.getFullYear() % E.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    Z.value = /* @__PURE__ */ new Date(), m.ready && (await Ie(), c("view-change", {
      id: y.value,
      title: ee.value,
      start: S.value,
      end: u.value,
      extendedStart: d.value,
      extendedEnd: w.value,
      cellDates: M.value,
      containsToday: a.value,
      events: U.value
    }));
  }
  function J(f) {
    const R = y.value, ne = m.availableViews[R];
    f[R] && JSON.stringify(f[R]) === JSON.stringify(ne) || W();
  }
  function ue(f, R = !0, ne = null) {
    const x = Object.keys(m.availableViews);
    y.value === f && !ne || (x.includes(f) ? (g.value = x.indexOf(f) < x.indexOf(y.value) ? "left" : "right", R && y.value !== f && c("update:view", f), y.value = f, ne ? ae(ne) : W()) : console.warn(`Vue Cal: the \`${f}\` view is not available.`));
  }
  function le() {
    $.value ? ue($.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function de() {
    s.value ? ue(s.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function l() {
    D(!1);
  }
  function T() {
    D(!0);
  }
  function D(f = !0) {
    let R = new Date(A.value);
    switch (y.value) {
      case "day":
      case "days":
        f ? R = t.addDays(n.value, 1) : R = t.subtractDays(v.value, E.value);
        break;
      case "week": {
        f ? (R = t.addDays(v.value, 7), R.setHours(0, 0, 0, 0)) : R = t.subtractDays(d.value, E.value);
        break;
      }
      case "month": {
        const ne = f ? 1 : -1;
        R = new Date(R.getFullYear(), R.getMonth() + ne, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const ne = f ? 1 : -1;
        R = new Date(R.getFullYear() + ne, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const ne = f ? E.value : -E.value;
        R = new Date(R.getFullYear() + ne, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    ae(R);
  }
  function te() {
    const f = /* @__PURE__ */ new Date();
    f.setHours(0, 0, 0, 0), ae(f);
  }
  function ae(f, R = !0, ne = !1) {
    if (!t.isValid(f)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [x, ge] = [v.value, n.value];
    y.value === "month" && ([x, ge] = [S.value, u.value]), f.setHours(0, 0, 0, 0), A.value = f, R && c("update:viewDate", f), (!t.isInRange(f, x, ge) || ne) && (g.value = f.getTime() < x.getTime() ? "left" : "right", W());
  }
  function ve(f, R = !0) {
    if (!t.isValid(f)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: ne, isSameDate: x } = t;
    (!H.value || !ne(H.value) || !x(f, H.value)) && (f.setHours(0, 0, 0, 0), H.value = f, R && c("update:selectedDate", f));
  }
  function i(f) {
    !f && !o.value.getDay() ? ae(t.addDays(o.value, 1), !0, !0) : (g.value = "left", W());
  }
  function C(f) {
    f && m.startWeekOnSunday && !o.value.getDay() ? ae(t.addDays(o.value, 1), !0, !0) : !f && m.startWeekOnSunday && o.value.getDay() === 1 && ae(t.subtractDays(o.value, 1), !0, !0);
  }
  function p() {
    W();
  }
  function Y(f) {
    var ge;
    const R = (ge = j.value) == null ? void 0 : ge.querySelector(".vuecal__scrollable"), ne = f - m.timeFrom, x = ne > 0 ? ne * m.timeCellHeight / m.timeStep : 0;
    R == null || R.scrollTo({ top: x, behavior: "smooth" });
  }
  function I() {
    const f = /* @__PURE__ */ new Date();
    Y(f.getHours() * 60 + f.getMinutes());
  }
  function q() {
    Y(0);
  }
  const U = b(() => h.getViewEvents(M.value)), ce = h.createEvent, he = h.deleteEvent;
  return we(() => m.view, (f) => ue(f, !1)), we(() => m.availableViews, J), we(() => m.datePicker, () => ue("month")), we(() => m.viewDate, (f) => ae(f, !1)), we(() => m.selectedDate, (f) => ve(f, !1)), we(() => m.startWeekOnSunday, (f) => i(f)), we(() => m.hideWeekends, (f) => C(f)), we(() => m.hideWeekdays, p), we(() => E.value, () => {
    E.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), we(() => m.watchRealTime, (f) => {
    f && m.time ? k() : L = clearTimeout(L);
  }), W(), m.time && m.watchRealTime && k(), Re(() => L = clearTimeout(L)), {
    now: Z,
    id: y,
    broaderView: $,
    narrowerView: s,
    title: ee,
    viewDate: A,
    start: S,
    end: u,
    extendedStart: d,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: w,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: v,
    lastCellDate: n,
    containsToday: a,
    nowLine: G,
    selectedDate: H,
    cellDates: M,
    cols: F,
    rows: V,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: U,
    transitionDirection: g,
    switch: (f, R) => ue(f, !0, R),
    broader: le,
    narrower: de,
    previous: l,
    next: T,
    navigate: D,
    goToToday: te,
    updateViewDate: ae,
    updateSelectedDate: ve,
    scrollToCurrentTime: I,
    scrollToTime: Y,
    scrollTop: q,
    createEvent: ce,
    deleteEvent: he,
    // Getters.
    get isDay() {
      return y.value === "day";
    },
    get isDays() {
      return y.value === "days";
    },
    get isWeek() {
      return y.value === "week";
    },
    get isMonth() {
      return y.value === "month";
    },
    get isYear() {
      return y.value === "year";
    },
    get isYears() {
      return y.value === "years";
    }
  };
}, ot = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], it = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ut = "Years", ct = "Year", dt = "Month", vt = "Week", mt = "Days", ft = "Day", ht = "Today", gt = "No Event", yt = "All-day", Dt = "Delete", wt = "Create an event", pt = "dddd, MMMM D, YYYY", _t = "am", kt = "pm", xe = {
  weekDays: ot,
  months: it,
  years: ut,
  year: ct,
  month: dt,
  week: vt,
  days: mt,
  day: ft,
  today: ht,
  noEvent: gt,
  allDay: yt,
  deleteEvent: Dt,
  createEvent: wt,
  dateFormat: pt,
  am: _t,
  pm: kt
}, jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allDay: yt,
  am: _t,
  createEvent: wt,
  dateFormat: pt,
  day: ft,
  days: mt,
  default: xe,
  deleteEvent: Dt,
  month: dt,
  months: it,
  noEvent: gt,
  pm: kt,
  today: ht,
  week: vt,
  weekDays: ot,
  year: ct,
  years: ut
}, Symbol.toStringTag, { value: "Module" })), Xe = Te({
  texts: { ...De.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: rt(De.texts, xe)
  // Some Date utils functions need localized texts.
}), Lt = ({ props: m, emit: t, attrs: c, vuecalEl: r, uid: h }) => {
  const j = Te({
    uid: h,
    // The Vuecal instance unique ID, used for dnd source-target identification.
    emit: t,
    texts: { ...Xe.texts },
    // Make texts reactive before a locale is loaded.
    // The date utils composable.
    // A class/composable is needed in order to access the user locale in all the methods, and
    // independently of other potential Vue Cal instances on the same page.
    dateUtils: { ...Xe.dateUtils },
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
  return j.dateUtils = rt(Object.assign(De.texts, j.texts), xe), j.config = zt(j, m, c), j.eventsManager = Ot(j), j.view = Ht(j, r), j.dnd = Vt(j), j;
}, Pt = 1440, At = {
  allDayEvents: { type: Boolean, default: !1 },
  // Display all-day events in a fixed top bar on the day, days & week views.
  stackEvents: { type: Boolean, default: !1 },
  clickToNavigate: { type: Boolean, default: void 0 },
  // Setting to false will force it off on date-picker.
  currentTimeLabel: { type: Boolean, default: !1 },
  // Show or hide the current time label in the time column.
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
  horizontal: { type: Boolean, default: !1 },
  // Show the calendar timeline horizontally.
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
  timeTo: { type: Number, default: Pt },
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
  xs: { type: Boolean, default: !1 }
  // Extra small size for date pickers (truncates texts + specific styles).
  // TODO:
  // minEventWidth: { type: Number, default: 0 },
  // minScheduleWidth: { type: Number, default: 0 },
  // overlapsPerTimeStep: { type: Boolean, default: false },
}, Ft = { class: "vuecal__header" }, Xt = {
  key: 0,
  class: "vuecal__views-bar"
}, Rt = ["onClick", "innerHTML"], Nt = {
  key: 1,
  class: "vuecal__title-bar"
}, Wt = { class: "vuecal__transition-wrap" }, Bt = ["disabled", "innerHTML"], It = {
  __name: "header",
  setup(m) {
    const t = Le("vuecal"), { view: c, config: r } = t, h = () => {
      r.clickToNavigate && c.broader();
    }, j = b(() => r.clickToNavigate ? { click: h } : {});
    return (N, y) => (z(), P("div", Ft, [
      O(N.$slots, "header", {
        view: _(c),
        availableViews: _(r).availableViews,
        vuecal: _(t)
      }),
      N.$slots.header ? Q("", !0) : (z(), P(fe, { key: 0 }, [
        _(r).viewsBar ? (z(), P("div", Xt, [
          (z(!0), P(fe, null, ke(_(r).availableViews, (H, Z) => (z(), P("button", {
            class: pe(["vuecal__view-button", { "vuecal__view-button--active": _(c).id === Z }]),
            onClick: (A) => _(c).switch(Z),
            innerHTML: _(t).texts[Z],
            type: "button"
          }, null, 10, Rt))), 256))
        ])) : Q("", !0),
        _(r).titleBar ? (z(), P("nav", Nt, [
          ye("button", {
            class: pe(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !N.$slots["previous-button"] }]),
            onClick: y[0] || (y[0] = (...H) => _(c).previous && _(c).previous(...H)),
            type: "button"
          }, [
            O(N.$slots, "previous-button")
          ], 2),
          ye("div", Wt, [
            He(Ue, {
              name: `vuecal-slide-fade--${_(c).transitionDirection}`
            }, {
              default: B(() => [
                (z(), P("div", {
                  key: _(c).id + _(c).start.getTime()
                }, [
                  N.$slots.title || N.$slots[`title.${_(c).id}`] ? (z(), Ce(et(_(r).clickToNavigate && _(c).broaderView ? "button" : "div"), oe({
                    key: 0,
                    class: "vuecal__title"
                  }, Ge(j.value)), {
                    default: B(() => [
                      N.$slots[`title.${_(c).id}`] ? O(N.$slots, `title.${_(c).id}`, se(oe({ key: 0 }, _(c)))) : O(N.$slots, "title", se(oe({ key: 1 }, _(c))))
                    ]),
                    _: 3
                  }, 16)) : (z(), Ce(et(_(r).clickToNavigate && _(c).broaderView ? "button" : "div"), oe({
                    key: 1,
                    class: "vuecal__title"
                  }, Ge(j.value), {
                    innerHTML: _(c).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          _(r).todayButton ? (z(), P(fe, { key: 0 }, [
            N.$slots["today-button"] ? O(N.$slots, "today-button", {
              key: 0,
              navigate: () => !_(c).containsToday && _(c).goToToday(),
              active: _(c).containsToday
            }) : (z(), P("button", {
              key: 1,
              class: pe(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": _(c).containsToday }]),
              onClick: y[1] || (y[1] = (H) => !_(c).containsToday && _(c).goToToday()),
              disabled: !!_(c).containsToday,
              type: "button",
              innerHTML: _(t).texts.today
            }, null, 10, Bt))
          ], 64)) : Q("", !0),
          ye("button", {
            class: pe(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !N.$slots["next-button"] }]),
            onClick: y[2] || (y[2] = (...H) => _(c).next && _(c).next(...H)),
            type: "button"
          }, [
            O(N.$slots, "next-button")
          ], 2)
        ])) : Q("", !0)
      ], 64))
    ]));
  }
}, Gt = ["draggable"], qt = { class: "vuecal__event-details" }, Jt = { class: "vuecal__event-title" }, Ut = {
  key: 0,
  class: "vuecal__event-time"
}, Zt = {
  key: 0,
  class: "vuecal__event-comma"
}, Kt = { class: "vuecal__event-start" }, Qt = {
  key: 1,
  class: "vuecal__event-end"
}, xt = { key: 0 }, en = ["innerHTML"], tn = 16, lt = {
  __name: "event",
  props: {
    event: { type: Object, required: !0 },
    inAllDayBar: { type: Boolean, default: !1 },
    cellStart: { type: Date, required: !0 },
    cellEnd: { type: Date, required: !0 }
  },
  emits: ["event-drag-start", "event-drag-end", "event-resize-start", "event-resize-end"],
  setup(m, { emit: t }) {
    const c = m, { config: r, view: h, dnd: j, touch: N, dateUtils: y, eventsManager: H } = Le("vuecal"), { handleEventResize: Z } = H, A = ie(null), o = Te(c.event);
    let L = null;
    const S = Te({
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
    }), u = b(() => r.editableEvents.drag && o.draggable !== !1 && !o.background && S.canTouchAndDrag !== !1), d = b(() => h.isMonth || h.isYear || h.isYears || c.inAllDayBar || o._.multiday && !G.value ? !1 : r.time && r.editableEvents.resize && o.resizable !== !1 && !o.background);
    b(() => r.editableEvents.delete && o.deletable !== !1 && !o.background);
    const w = b(() => {
      var s, X, K, ee, W;
      const M = !!((s = o._) != null && s.multiday), n = r.horizontal, g = !c.inAllDayBar && (((X = o._) == null ? void 0 : X.startMinutes) < r.timeFrom || M && !a.value), $ = !c.inAllDayBar && (((K = o._) == null ? void 0 : K.endMinutes) > r.timeTo || M && !G.value);
      return {
        [`vuecal__event--${o._.id}`]: !0,
        [o.class]: !!o.class,
        "vuecal__event--recurring": !!o.recurring,
        "vuecal__event--background": !!o.background,
        "vuecal__event--all-day": o.allDay || ((ee = o._) == null ? void 0 : ee.startMinutes) === 0 && ((W = o._) == null ? void 0 : W.duration) === 1440,
        "vuecal__event--multiday": M,
        // In horizontal mode, cut-top becomes cut-left and cut-bottom becomes cut-right.
        "vuecal__event--cut-top": !n && g,
        "vuecal__event--cut-bottom": !n && $,
        "vuecal__event--cut-left": n && g,
        "vuecal__event--cut-right": n && $,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !o._.draggingGhost && o._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": o._.draggingGhost,
        "vuecal__event--resizing": N.isResizingEvent
      };
    }), a = b(() => o._.multiday ? new Date(o.start).setHours(0, 0, 0, 0) === c.cellStart.getTime() : !0), G = b(() => o._.multiday ? y.isSameDate(new Date(new Date(o.end).setMilliseconds(-1)), c.cellEnd) : !0), e = b(() => {
      const M = new Date(o.start).setHours(0, 0, 0, 0), n = new Date(o.end).setHours(0, 0, 0, 0);
      return Math.ceil((n - M) / (1e3 * 60 * 60 * 24));
    }), k = b(() => {
      const M = (h.isDay || h.isDays || h.isWeek) && r.time && !c.inAllDayBar, n = r.horizontal;
      if (!M && !o.backgroundColor && !o.color) return !1;
      const g = {
        backgroundColor: o.backgroundColor || null,
        color: o.color || null
      };
      if (M) {
        let $ = o._.startMinutes, s = o._.endMinutes;
        o._.multiday && (a.value || ($ = 0), G.value || (s = 1440));
        const X = Math.max(r.timeFrom, $), K = Math.min(r.timeTo, s) + (o._.duration && !s ? 1440 : 0), ee = je(X, r), W = je(K, r) - ee;
        g[n ? "left" : "top"] = `${ee}%`, g[n ? "width" : "height"] = `${W}%`;
      }
      return g;
    }), F = b(() => {
      const M = { ...r.eventListeners.event };
      for (const [g, $] of Object.entries(M))
        ["resize-end"].includes(g) || (M[g] = (s) => {
          s.type !== "drop" && $(s.type ? { e: s, event: o } : s);
        });
      const n = { ...M };
      return M.touchstart = (g) => {
        var $;
        g.stopPropagation(), S.touchAndDragTimer = setTimeout(() => {
          S.canTouchAndDrag = !0;
        }, 500), v(g), ($ = n.touchstart) == null || $.call(n, { e: g, event: o });
      }, M.mousedown = (g) => {
        var $;
        g.stopPropagation(), v(g), ($ = n.mousedown) == null || $.call(n, { e: g, event: o });
      }, M.click = (g) => {
        var $;
        ($ = n.click) == null || $.call(n, { e: g, event: o }), L ? L = clearTimeout(L) : L = setTimeout(() => {
          var s;
          L = null, (s = n["delayed-click"]) == null || s.call(n, { e: g, event: o });
        }, 400);
      }, M.dblclick = (g) => {
        n.dblclick ? n.dblclick({ e: g, event: o }) : o.delete(1);
      }, M;
    });
    let V = null, E = 0;
    const v = (M) => {
      var s, X, K, ee;
      const n = ((s = M.touches) == null ? void 0 : s[0]) || M;
      S.fromResizer = (X = n.target) == null ? void 0 : X.closest(".vuecal__event-resizer");
      const g = Date.now();
      (!V || g - E > tn) && (V = A.value.getBoundingClientRect(), E = g);
      const $ = V;
      S.startX = (((K = M.touches) == null ? void 0 : K[0]) || M).clientX - $.left, S.startY = (((ee = M.touches) == null ? void 0 : ee[0]) || M).clientY - $.top, S.startPercentageX = S.startX * 100 / $.width, S.startPercentageY = S.startY * 100 / $.height, S.cellEl = A.value.closest(".vuecal__cell"), S.resizeStartDate = o.start, S.fromResizer && Z(M, o, A.value), S.holdTimer = setTimeout(() => {
        var W, J;
        S.holding = !0, (J = (W = F.value).hold) == null || J.call(W, { e: M, event: o });
      }, 1e3);
    };
    return Ke(() => o._.register(A.value)), Re(() => {
      S.holdTimer && (S.holdTimer = clearTimeout(S.holdTimer)), S.touchAndDragTimer && (S.touchAndDragTimer = clearTimeout(S.touchAndDragTimer)), L && (L = clearTimeout(L)), o._.unregister();
    }), (M, n) => (z(), P("div", oe({ class: "vuecal__event" }, Ge(F.value, !0), {
      ref_key: "eventEl",
      ref: A,
      class: w.value,
      style: k.value,
      draggable: u.value ? "true" : void 0,
      onDragstart: n[2] || (n[2] = (g) => u.value && _(j).eventDragStart(g, o)),
      onDragend: n[3] || (n[3] = (g) => u.value && _(j).eventDragEnd(g, o))
    }), [
      ye("div", qt, [
        M.$slots["event.all-day"] ? O(M.$slots, "event.all-day", {
          key: 0,
          event: o
        }) : M.$slots[`event.${_(h).id}`] ? O(M.$slots, `event.${_(h).id}`, {
          key: 1,
          event: o
        }) : O(M.$slots, "event", {
          key: 2,
          event: o
        }, () => [
          ye("div", Jt, me(o.title), 1),
          _(r).time && !m.inAllDayBar && !(o._.multiday && !a.value) ? (z(), P("div", Ut, [
            _(h).isMonth ? (z(), P("span", Zt, ",")) : Q("", !0),
            ye("span", Kt, me(o._[`startTimeFormatted${_(r).twelveHour ? 12 : 24}`]), 1),
            _(h).isMonth ? Q("", !0) : (z(), P("span", Qt, [
              qe(" - " + me(o._[`endTimeFormatted${_(r).twelveHour ? 12 : 24}`]), 1),
              o._.multiday && a.value ? (z(), P("span", xt, "+" + me(e.value) + "d", 1)) : Q("", !0)
            ]))
          ])) : Q("", !0),
          m.inAllDayBar ? Q("", !0) : (z(), P("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: o.content
          }, null, 8, en))
        ])
      ]),
      d.value ? (z(), P("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: n[0] || (n[0] = tt(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : Q("", !0),
      He(Ue, { name: "vuecal-delete-btn" }, {
        default: B(() => [
          o._.deleting ? (z(), P("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: n[1] || (n[1] = tt((g) => o.delete(3), ["stop"]))
          }, "Delete")) : Q("", !0)
        ]),
        _: 1
      })
    ], 16, Gt));
  }
}, nn = ["data-start"], an = ["innerHTML"], sn = ["data-schedule"], ln = {
  key: 1,
  class: "vuecal__cell-date"
}, rn = {
  key: 2,
  class: "vuecal__cell-content"
}, on = {
  key: 3,
  class: "vuecal__cell-events"
}, un = {
  key: 1,
  class: "vuecal__cell-date"
}, cn = {
  key: 2,
  class: "vuecal__cell-content"
}, dn = {
  key: 3,
  class: "vuecal__cell-events"
}, vn = {
  key: 5,
  class: "vuecal__cell-events-count"
}, mn = ["title"], $t = {
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
  setup(m) {
    const t = m, c = Le("vuecal"), { view: r, config: h, dateUtils: j, eventsManager: N, dnd: y, touch: H } = c, Z = b(() => j.isToday(t.start)), A = ie(null), o = ie([]), L = ie(!1), S = (i) => {
      o.value.push(i.detail), L.value = !0;
    }, u = () => setTimeout(() => L.value = !1, 300), d = Te({
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
    }), w = ie(!1);
    let a = null;
    const G = ie({ cellOverlaps: {}, longestStreak: 0 }), e = b(() => {
      const i = h.horizontal, C = i ? d.startPercentageX : d.startPercentageY, p = i ? d.movePercentageX : d.movePercentageY;
      let Y = Math.min(C, p), I = Math.max(C, p), q = Ve(Y, h), U = Ve(I, h);
      return h.snapToInterval && (q = j.snapToInterval(q, h.snapToInterval), U = j.snapToInterval(U, h.snapToInterval), Y = je(q, h), I = je(U, h)), {
        style: {
          [i ? "left" : "top"]: `${Y}%`,
          [i ? "width" : "height"]: `${Math.abs(I - Y)}%`
        },
        startMinutes: q,
        endMinutes: U,
        start: j.formatMinutes(q),
        end: j.formatMinutes(U),
        ...d.schedule != null ? { schedule: d.schedule } : {}
      };
    }), k = b(() => {
      const i = h.editableEvents.create && (d.dragging || w.value), C = h.eventCreateMinDrag && d.thresholdPassed || !h.eventCreateMinDrag, p = d.canTouchAndDrag !== !1;
      return i && C && p;
    }), F = b(() => {
      var U;
      const i = /* @__PURE__ */ new Date(), C = r.start.getFullYear(), p = r.start.getMonth(), Y = t.start.getFullYear(), I = t.start.getMonth();
      return {
        [`vuecal__cell--${Je[t.start.getDay()]}`]: r.isDay || r.isDays || r.isWeek || r.isMonth,
        [`vuecal__cell--${St[I]}`]: r.isYear,
        [`vuecal__cell--${Y}`]: r.isYears,
        "vuecal__cell--today": Z.value,
        "vuecal__cell--current-month": r.isYear && Y === i.getFullYear() && I === i.getMonth(),
        "vuecal__cell--current-year": r.isYears && Y === i.getFullYear(),
        "vuecal__cell--out-of-range": r.isMonth && (Y !== C || I !== p),
        "vuecal__cell--before-min": ee.value && X.value,
        "vuecal__cell--after-max": ee.value && K.value,
        "vuecal__cell--disabled": ee.value,
        "vuecal__cell--selected": r.selectedDate && r.selectedDate.getTime() >= t.start.getTime() && r.selectedDate.getTime() <= t.end.getTime(),
        "vuecal__cell--has-schedules": (U = h.schedules) == null ? void 0 : U.length,
        "vuecal__cell--dragging": d.dragging,
        "vuecal__cell--has-events": E.value.length
      };
    });
    b(() => j.formatDate(t.start));
    const V = b(() => {
      switch (r.id) {
        case "day":
          return "";
        case "days":
          return h.availableViews.days.rows > 1 && j.formatDate(t.start, "D"), "";
        case "week":
          return "";
        case "month":
          return j.formatDate(t.start, "D");
        case "year":
          return j.formatDate(t.start, h.xs ? "MMM" : "MMMM");
        case "years":
          return j.formatDate(t.start, "YYYY");
      }
    }), E = b(() => h.datePicker ? [] : N.getEventsInRange(
      t.start,
      t.end,
      { excludeIds: o.value, ...h.allDayEvents ? { allDay: t.allDay } : {} }
    )), v = b(() => E.value.filter((i) => !i.background)), M = b(() => {
      var i;
      return (i = h.schedules) == null ? void 0 : i.reduce((C, p) => (C[p.id] = E.value.filter((Y) => Y.schedule === p.id), C), {});
    }), n = b(() => {
      if (r.isMonth || r.isYear || r.isYears || t.allDay || !h.time) return {};
      const i = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", C = h.horizontal, p = {};
      for (const Y of E.value) {
        const I = Y._.id, { maxConcurrent: q = 1, position: U = 0 } = G.value.cellOverlaps[I] || {}, ce = i ? "right" : "left", he = C ? "height" : "width";
        p[I] = { [C ? "top" : ce]: `${100 / q * U}%` }, h.stackEvents ? p[I][he] = `${100 / q + (U === q - 1 ? 0 : 15)}%` : p[I][he] = `${100 / q}%`;
      }
      return p;
    }), g = b(() => {
      const i = {};
      for (const C of E.value) {
        const p = C._.id, { maxConcurrent: Y = 1, position: I = 0 } = G.value.cellOverlaps[p] || {};
        i[p] = `vuecal__event--stack-${I + 1}-${Y}`;
      }
      return i;
    }), $ = b(() => h.showCellEventCount && v.value.length), s = b(() => {
      var Y;
      if (!h.specialHours || r.isMonth || r.isYear || r.isYears || t.allDay) return;
      const i = Je[t.start.getDay()], C = h.horizontal;
      let p = (Y = h.specialHours) == null ? void 0 : Y[i];
      if (p)
        return Array.isArray(p) || (p = [p]), p.map((I) => {
          let { from: q, to: U, class: ce, label: he } = I;
          if (isNaN(q) || isNaN(U) || h.timeFrom >= U || h.timeTo <= q) return;
          q = Math.max(h.timeFrom, q), U = Math.min(h.timeTo, U);
          const f = je(q, h), R = je(U, h) - f;
          return {
            style: {
              [C ? "left" : "top"]: `${f}%`,
              [C ? "width" : "height"]: `${R}%`
            },
            label: he,
            class: ce
          };
        }).filter((I) => !!I);
    }), X = b(() => h.minTimestamp !== null && h.minTimestamp > t.end.getTime()), K = b(() => h.maxTimestamp && h.maxTimestamp < t.start.getTime()), ee = b(() => {
      const { disableDays: i } = h, C = r.isYear || r.isYears;
      return i.length && i.includes(j.formatDate(t.start)) && !C ? !0 : X.value || K.value;
    }), W = b(() => {
      if (ee.value) return {};
      const i = { ...h.eventListeners.cell };
      for (const [p, Y] of Object.entries(i))
        i[p] = (I) => {
          var q, U, ce;
          (ce = (U = I.target || ((q = I.e) == null ? void 0 : q.target)).closest) != null && ce.call(U, ".vuecal__event") || Y(I.type ? { e: I, cell: J.value, cursor: le.value, view: r } : I);
        };
      const C = { ...i };
      return i.click = (p) => {
        var I;
        de();
        const Y = ue(p);
        (I = C.click) == null || I.call(C, { e: p, cell: J.value, cursor: Y, view: r }), a ? a = clearTimeout(a) : a = setTimeout(() => {
          var q;
          a = null, (q = C["delayed-click"]) == null || q.call(C, { e: p, cell: J.value, cursor: Y, view: r });
        }, 400);
      }, (h.time && r.isDay || r.isDays || r.isWeek) && (i.touchstart = (p) => {
        var Y;
        l(p.e || p), (Y = C.touchstart) == null || Y.call(C, { e: p, cell: J.value, cursor: le.value, view: r });
      }, i.mousedown = (p) => {
        var Y;
        l(p.e || p), (Y = C.mousedown) == null || Y.call(C, { e: p, cell: J.value, cursor: le.value, view: r });
      }), C.dblclick && (i.dblclick = (p) => {
        var Y;
        (Y = C.dblclick) == null || Y.call(C, { e: p, cell: J.value, cursor: ue(p), view: r });
      }), h.editableEvents.drag && (i.dragenter = (p) => y.cellDragEnter(p, J.value), i.dragover = (p) => {
        p.preventDefault(), y.cellDragOver(p, J.value);
      }, i.dragleave = (p) => y.cellDragLeave(p, J.value), i.drop = (p) => y.cellDragDrop(p, J.value, t.allDay)), i;
    }), J = b(() => ({
      start: t.start,
      end: t.end,
      events: E,
      ...d.schedule !== null ? { schedule: d.schedule } : {},
      goNarrower: () => r.narrower(),
      goBroader: () => r.broader(),
      broader: r.broaderView,
      narrower: r.narrowerView
    })), ue = (i) => {
      var he;
      const C = h.horizontal, { clientX: p, clientY: Y } = ((he = i.touches) == null ? void 0 : he[0]) || i, { top: I, left: q } = A.value.getBoundingClientRect(), U = C ? (p - q) * 100 / A.value.clientWidth : Qe(Y - I, A.value), ce = new Date(t.start);
      return ce.setMinutes(Ve(U, h)), { [C ? "x" : "y"]: U, date: ce };
    }, le = b(() => {
      const C = h.horizontal ? d.movePercentageX || d.startPercentageX : d.movePercentageY || d.startPercentageY, p = Ve(C, h), Y = new Date(t.start);
      return Y.setMinutes(p), {
        x: d.movePercentageX || d.startPercentageX,
        y: d.movePercentageY || d.startPercentageY,
        date: Y
      };
    }), de = () => {
      r.updateSelectedDate(t.start), h.clickToNavigate && ((r.isMonth || r.isDays || r.isWeek) && h.availableViews.day ? r.switch("day") : r.isYear && h.availableViews.month ? r.switch("month") : r.isYears && h.availableViews.year && r.switch("year")), r.updateViewDate(t.start);
    }, l = (i) => {
      var I, q, U, ce, he;
      const C = i.type === "touchstart";
      C ? (d.canTouchAndDrag = !1, d.touchAndDragTimer = setTimeout(() => {
        d.canTouchAndDrag = !0, (d.holding || d.dragging) && i.preventDefault();
      }, 500)) : d.canTouchAndDrag = !0;
      const p = (q = (I = i.target.closest("[data-schedule]")) == null ? void 0 : I.dataset) == null ? void 0 : q.schedule;
      if (p !== void 0 && ((U = h.schedules) != null && U.length)) {
        const f = h.schedules.find((R) => String(R.id) === String(p));
        d.schedule = f ? f.id : p;
      } else d.schedule = null;
      const Y = A.value.getBoundingClientRect();
      d.startX = (((ce = i.touches) == null ? void 0 : ce[0]) || i).clientX - Y.left, d.startY = (((he = i.touches) == null ? void 0 : he[0]) || i).clientY - Y.top, d.startPercentageX = d.startX * 100 / Y.width, d.startPercentageY = d.startY * 100 / Y.height, d.thresholdPassed = !1, document.addEventListener(C ? "touchmove" : "mousemove", T, { passive: !C }), document.addEventListener(C ? "touchend" : "mouseup", D, { once: !0 }), d.holdTimer = setTimeout(() => {
        var f, R;
        d.holding = !0, (R = (f = W.value).hold) == null || R.call(f, { e: i, cell: J.value, cursor: le.value, view: r });
      }, 1e3);
    }, T = (i) => {
      var q, U, ce, he, f, R;
      const C = i.type === "touchmove", p = h.horizontal;
      if (C && !d.canTouchAndDrag) {
        d.touchAndDragTimer && (clearTimeout(d.touchAndDragTimer), d.touchAndDragTimer = null), D(i);
        return;
      }
      C && i.preventDefault(), d.dragging || (H.isDraggingCell = !0, (U = (q = W.value)["drag-start"]) == null || U.call(q, { e: i, cell: J.value, cursor: le.value, view: r })), d.dragging = !0, d.holdTimer = clearTimeout(d.holdTimer), d.holding = !1;
      const Y = A.value.getBoundingClientRect();
      d.moveX = (((ce = i.touches) == null ? void 0 : ce[0]) || i).clientX - Y.left, d.moveY = (((he = i.touches) == null ? void 0 : he[0]) || i).clientY - Y.top, d.movePercentageX = d.moveX * 100 / Y.width, d.movePercentageY = d.moveY * 100 / Y.height;
      const I = Math.abs(p ? d.startX - d.moveX : d.startY - d.moveY);
      h.eventCreateMinDrag && I > h.eventCreateMinDrag && (d.thresholdPassed = !0), (R = (f = W.value).drag) == null || R.call(f, { e: i, cell: J.value, cursor: le.value, view: r });
    }, D = async (i) => {
      var p, Y;
      const C = i.type === "touchend";
      document.removeEventListener(C ? "touchmove" : "mousemove", T, { passive: !1 }), d.touchAndDragTimer && (clearTimeout(d.touchAndDragTimer), d.touchAndDragTimer = null), d.dragging && ((Y = (p = W.value)["drag-end"]) == null || Y.call(p, { e: i, cell: J.value, cursor: le.value, view: r }), H.isDraggingCell = !1, h.editableEvents.create && d.canTouchAndDrag && (w.value = !0, await te(i), w.value = !1)), d.holdTimer = clearTimeout(d.holdTimer), d.holding = !1, d.dragging = !1, d.startX = 0, d.startY = 0, d.moveX = 0, d.moveY = 0, d.startPercentageX = 0, d.startPercentageY = 0, d.movePercentageX = 0, d.movePercentageY = 0, d.thresholdPassed = !1, d.schedule = null, d.canTouchAndDrag = null;
    }, te = async (i) => {
      var ce;
      if (!k.value) return;
      let { start: C, end: p, startMinutes: Y, endMinutes: I } = e.value;
      C = new Date(t.start), C.setMinutes(Y), p = new Date(t.start), p.setMinutes(I);
      let q = { ...e.value, start: C, end: p };
      const { create: U } = h.eventListeners.event;
      if (typeof U == "function") {
        const he = q;
        q = await new Promise((f) => U({ e: i, event: q, cell: J.value, resolve: f, cursor: le.value, view: r })), q && typeof q == "object" && r.createEvent(q), q && typeof q == "boolean" && r.createEvent(he);
      } else r.createEvent(q);
      (ce = navigator.vibrate) == null || ce.call(navigator, 200);
    }, ae = () => {
      var i;
      for (const C of Object.keys(W.value))
        (i = A.value) == null || i.removeEventListener(C, W.value[C]);
    }, ve = () => {
      G.value = N.getCellOverlappingEvents(t.start, t.end, t.allDay);
    };
    return we(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !r.isYears && !r.isYear && v.value.map((i) => `${i._.id}${i.start.getTime()}${i.end.getTime()}`).join(),
      async () => {
        await Ie(), ve();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Re(async () => {
      for (const i of o.value) N.deleteEvent(i, 3);
      ae(), a && (a = clearTimeout(a)), await Ie();
    }), (i, C) => (z(), P("div", oe({
      class: "vuecal__cell",
      ref_key: "cellEl",
      ref: A
    }, Ge(W.value, !0), {
      "data-start": t.start.getTime(),
      class: F.value
    }), [
      i.$slots.cell ? O(i.$slots, "cell", {
        key: 0,
        cell: J.value
      }) : Q("", !0),
      s.value ? (z(!0), P(fe, { key: 1 }, ke(s.value, (p, Y) => (z(), P("div", {
        class: pe(["vuecal__special-hours", p.class]),
        style: _e(p.style),
        innerHTML: p.label || ""
      }, null, 14, an))), 256)) : Q("", !0),
      !i.$slots.cell && _(h).schedules ? (z(!0), P(fe, { key: 2 }, ke(_(h).schedules, (p) => (z(), P("div", {
        class: pe(["vuecal__schedule vuecal__schedule--cell", p.class]),
        key: p.id,
        style: _e(p.style || null),
        "data-schedule": p.id
      }, [
        i.$slots["cell-events"] ? O(i.$slots, "cell-events", {
          key: 0,
          cell: J.value
        }) : Q("", !0),
        V.value || i.$slots["cell-date"] ? (z(), P("div", ln, [
          O(i.$slots, "cell-date", { cell: J.value }, () => [
            qe(me(V.value), 1)
          ])
        ])) : Q("", !0),
        i.$slots["cell-content"] ? (z(), P("div", rn, [
          O(i.$slots, "cell-content", { cell: J.value })
        ])) : Q("", !0),
        i.$slots["cell-events"] && E.value.length ? (z(), P("div", on, [
          O(i.$slots, "cell-events", { cell: J.value })
        ])) : E.value.length || L.value ? (z(), Ce(nt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: C[0] || (C[0] = (Y) => L.value = !0),
          onAfterLeave: u,
          tag: "div"
        }, {
          default: B(() => [
            (z(!0), P(fe, null, ke(M.value[p.id], (Y) => (z(), Ce(lt, {
              key: Y._.id,
              event: Y,
              onEventDeleted: S,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              style: _e(n.value[Y._.id])
            }, ze({ _: 2 }, [
              i.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: B((I) => [
                  O(i.$slots, "event.all-day", oe({ ref_for: !0 }, I))
                ]),
                key: "0"
              } : void 0,
              i.$slots[`event.${_(r).id}`] ? {
                name: `event.${_(r).id}`,
                fn: B((I) => [
                  O(i.$slots, `event.${_(r).id}`, oe({ ref_for: !0 }, I))
                ]),
                key: "1"
              } : void 0,
              i.$slots.event ? {
                name: "event",
                fn: B((I) => [
                  O(i.$slots, "event", oe({ ref_for: !0 }, I))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "style"]))), 128))
          ]),
          _: 2
        }, 1024)) : Q("", !0),
        k.value && d.schedule === p.id && !t.allDay ? (z(), P("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: _e(e.value.style)
        }, me(e.value.start) + " - " + me(e.value.end), 5)) : Q("", !0)
      ], 14, sn))), 128)) : Q("", !0),
      !i.$slots.cell && !_(h).schedules ? (z(), P(fe, { key: 3 }, [
        i.$slots["cell-events"] ? O(i.$slots, "cell-events", {
          key: 0,
          cell: J.value
        }) : Q("", !0),
        V.value || i.$slots["cell-date"] ? (z(), P("div", un, [
          O(i.$slots, "cell-date", { cell: J.value }, () => [
            qe(me(V.value), 1)
          ])
        ])) : Q("", !0),
        i.$slots["cell-content"] ? (z(), P("div", cn, [
          O(i.$slots, "cell-content", { cell: J.value })
        ])) : Q("", !0),
        i.$slots["cell-events"] && E.value.length ? (z(), P("div", dn, [
          O(i.$slots, "cell-events", { cell: J.value })
        ])) : !(_(r).isMonth && !_(h).eventsOnMonthView) && !_(r).isYear && !_(r).isYears && (E.value.length || L.value) ? (z(), Ce(nt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: C[1] || (C[1] = (p) => L.value = !0),
          onAfterLeave: u,
          tag: "div"
        }, {
          default: B(() => [
            (z(!0), P(fe, null, ke(E.value, (p) => (z(), Ce(lt, {
              key: p._.id,
              event: p,
              onEventDeleted: S,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              class: pe(g.value[p._.id]),
              style: _e(n.value[p._.id])
            }, ze({ _: 2 }, [
              i.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: B((Y) => [
                  O(i.$slots, "event.all-day", oe({ ref_for: !0 }, Y))
                ]),
                key: "0"
              } : void 0,
              i.$slots[`event.${_(r).id}`] ? {
                name: `event.${_(r).id}`,
                fn: B((Y) => [
                  O(i.$slots, `event.${_(r).id}`, oe({ ref_for: !0 }, Y))
                ]),
                key: "1"
              } : void 0,
              i.$slots.event ? {
                name: "event",
                fn: B((Y) => [
                  O(i.$slots, "event", oe({ ref_for: !0 }, Y))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "class", "style"]))), 128))
          ]),
          _: 3
        })) : Q("", !0),
        k.value ? (z(), P("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: _e(e.value.style)
        }, me(e.value.start) + " - " + me(e.value.end), 5)) : Q("", !0)
      ], 64)) : Q("", !0),
      i.$slots["event-count"] ? O(i.$slots, "event-count", {
        key: 4,
        events: v.value
      }) : $.value ? (z(), P("div", vn, me(v.value.length), 1)) : Q("", !0),
      _(r).nowLine.show && Z.value && !m.allDay ? (z(), P("div", {
        key: 6,
        class: "vuecal__now-line",
        style: _e(_(r).nowLine.style),
        title: _(r).nowLine.currentTime
      }, [
        O(i.$slots, "now-line", {
          now: _(r).now,
          timeFormatted: _(r).nowLine.currentTime
        }, () => [
          ye("span", null, me(_(r).nowLine.currentTime), 1)
        ])
      ], 12, mn)) : Q("", !0)
    ], 16, nn));
  }
}, fn = {
  key: 0,
  class: "vuecal__headings"
}, hn = {
  key: 0,
  class: "vuecal__weekdays-headings"
}, gn = ["onClick"], yn = { class: "vuecal__weekday-day" }, Dn = {
  key: 0,
  class: "vuecal__weekday-date"
}, wn = {
  key: 1,
  class: "vuecal__schedules-headings"
}, pn = ["innerHTML"], _n = {
  key: 2,
  class: "vuecal__all-day"
}, kn = {
  __name: "headings-bar",
  setup(m) {
    const t = Le("vuecal"), c = Le("$vuecalEl"), { view: r, config: h, dateUtils: j } = t, N = b(() => h.xs ? "day-xs" : h.sm || r.isDays || r.isMonth ? "day-sm" : "day"), y = b(() => (r.isDay || r.isDays || r.isWeek || r.isMonth) && !(r.isDay && !h.schedules && !h.allDayEvents)), H = b(() => r.cellDates.slice(0, h.horizontal ? r.rows : r.cols).map(({ start: o }) => ({
      id: Je[o.getDay()],
      date: o,
      dateNumber: o.getDate(),
      day: j.formatDate(o, "dddd"),
      "day-sm": j.formatDate(o, "ddd"),
      "day-xs": j.formatDate(o, "dd"),
      isToday: j.isToday(o)
    }))), Z = {
      click: (o) => {
        (r.isDays || r.isWeek) && r.updateSelectedDate(o);
      }
    }, A = {
      isResizing: ie(!1),
      startY: ie(0),
      initialHeight: ie(0),
      defaultHeight: 25,
      // Default height in pixels.
      // Or in the case of horizontal layout.
      startX: ie(0),
      initialWidth: ie(0),
      defaultWidth: 25,
      // Default width in pixels.
      // Cleanup event listeners.
      cleanup() {
        typeof document < "u" && (document.removeEventListener("mousemove", A.handleMouseMove), document.removeEventListener("mouseup", A.cleanup), document.removeEventListener("touchmove", A.handleTouchMove, { passive: !1 }), document.removeEventListener("touchend", A.cleanup)), A.isResizing.value = !1;
      },
      startResize(o, L) {
        this.isResizing.value = !0;
        const S = h.horizontal;
        this[S ? "startX" : "startY"].value = S ? o : L;
        const u = getComputedStyle(c.value).getPropertyValue("--vuecal-all-day-bar-size"), d = document.createElement("div");
        d.style.position = "absolute", d.style.visibility = "hidden", d.style[S ? "width" : "height"] = u, document.body.appendChild(d);
        const w = d[S ? "offsetWidth" : "offsetHeight"];
        d.remove(), w > 0 && (this[S ? "initialWidth" : "initialHeight"].value = w), document.addEventListener("mousemove", A.handleMouseMove), document.addEventListener("mouseup", A.cleanup), document.addEventListener("touchmove", A.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", A.cleanup);
      },
      // Update height/width based on mouse/touch movement.
      updateSize(o, L) {
        var w;
        if (!this.isResizing.value) return;
        const S = h.horizontal, u = S ? o - this.startX.value : L - this.startY.value, d = Math.max(20, this[S ? "initialWidth" : "initialHeight"].value + u);
        (w = c.value) == null || w.style.setProperty("--vuecal-all-day-bar-size", `${d}px`);
      },
      // Mouse event handlers.
      handleMouseDown(o) {
        this.startResize(o.clientX, o.clientY);
      },
      handleMouseMove(o) {
        A.updateSize(o.clientX, o.clientY);
      },
      // Touch event handlers.
      handleTouchStart(o) {
        var L;
        (L = o.touches) != null && L[0] && this.startResize(o.touches[0].clientX, o.touches[0].clientY);
      },
      handleTouchMove(o) {
        var L;
        (L = o.touches) != null && L[0] && (A.updateSize(o.touches[0].clientX, o.touches[0].clientY), o.preventDefault());
      }
    };
    return Re(() => {
      A.cleanup();
    }), (o, L) => y.value ? (z(), P("div", fn, [
      _(r).isDay ? Q("", !0) : (z(), P("div", hn, [
        (z(!0), P(fe, null, ke(H.value, (S, u) => (z(), P("div", {
          class: pe(["vuecal__weekday", { "vuecal__weekday--today": S.isToday }]),
          key: u,
          onClick: (d) => Z.click(S.date)
        }, [
          O(o.$slots, "weekday-heading", {
            label: S[N.value],
            id: S.id,
            date: S.date
          }, () => [
            ye("span", yn, me(S[N.value]), 1),
            _(r).isMonth ? Q("", !0) : (z(), P("strong", Dn, me(S.dateNumber), 1))
          ])
        ], 10, gn))), 128))
      ])),
      _(h).schedules ? (z(), P("div", wn, [
        (z(!0), P(fe, null, ke(H.value, (S, u) => (z(), P(fe, { key: u }, [
          (z(!0), P(fe, null, ke(_(h).schedules, (d, w) => (z(), P(fe, { key: w }, [
            o.$slots["schedule-heading"] ? (z(), P("div", {
              key: 0,
              class: pe(["vuecal__schedule vuecal__schedule--heading", d.class])
            }, [
              O(o.$slots, "schedule-heading", {
                schedule: d,
                view: _(r)
              })
            ], 2)) : (z(), P("div", {
              key: 1,
              class: pe(["vuecal__schedule vuecal__schedule--heading", d.class]),
              innerHTML: d.label
            }, null, 10, pn))
          ], 64))), 128))
        ], 64))), 128))
      ])) : Q("", !0),
      _(h).allDayEvents ? (z(), P("div", _n, [
        (z(!0), P(fe, null, ke(H.value, (S, u) => (z(), Ce($t, {
          class: pe(["vuecal__all-day-cell", { "vuecal__weekday--today": S.isToday }]),
          key: u,
          start: S.date,
          end: new Date(S.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: u,
          "all-day": ""
        }, ze({ _: 2 }, [
          o.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: B((d) => [
              O(o.$slots, "event.all-day", oe({ ref_for: !0 }, d))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: B((d) => [
              O(o.$slots, "event", oe({ ref_for: !0 }, d))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        ye("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: L[0] || (L[0] = (...S) => A.handleMouseDown && A.handleMouseDown(...S)),
          onTouchstart: L[1] || (L[1] = (...S) => A.handleTouchStart && A.handleTouchStart(...S))
        }, null, 32)
      ])) : Q("", !0)
    ])) : Q("", !0);
  }
}, $n = { class: "vuecal__time-column" }, bn = { class: "vuecal__time-column-inner" }, Tn = {
  key: 0,
  class: "vuecal__all-day-label"
}, Mn = ["title"], En = {
  __name: "time-column",
  setup(m) {
    const t = Le("vuecal"), { config: c, texts: r, view: h } = t, j = b(() => {
      const N = [];
      for (let H = c.timeFrom; H < c.timeTo; H += c.timeStep) {
        const Z = H + c.timeStep > c.timeTo, A = ~~(H / 60), o = H % 60, L = r[H < 720 ? "am" : "pm"];
        let S = null;
        Z && (S = `calc(var(--vuecal-time-cell-size) * ${(c.timeTo - H) / c.timeStep})`), N.push({
          minutesSum: H,
          // The sum of hours + minutes in minutes.
          hours: A,
          minutes: o,
          formatted12: `${A % 12 ? A % 12 : 12}${o ? `:${o.toString().padStart(2, 0)}` : ""}${L}`,
          formatted24: `${A.toString().padStart(2, 0)}:${o.toString().padStart(2, 0)}`,
          height: S
        });
      }
      return N;
    });
    return (N, y) => (z(), P("div", $n, [
      ye("div", bn, [
        _(c).allDayEvents ? (z(), P("div", Tn, [
          O(N.$slots, "all-day-label", {}, () => [
            qe(me(_(t).texts.allDay), 1)
          ])
        ])) : Q("", !0),
        (z(!0), P(fe, null, ke(j.value, (H, Z) => (z(), P("div", {
          class: "vuecal__time-cell",
          key: Z,
          style: _e({ height: H.height || null })
        }, [
          O(N.$slots, "time-cell", {
            index: Z,
            minutes: H.minutes,
            hours: H.hours,
            minutesSum: H.minutesSum,
            format12: H.formatted12,
            format24: H.formatted24
          }, () => [
            ye("label", null, me(_(c).twelveHour ? H.formatted12 : H.formatted24), 1)
          ])
        ], 4))), 128)),
        _(c).currentTimeLabel ? (z(), P("div", {
          key: 1,
          class: "vuecal__current-time",
          style: _e(_(h).nowLine.style),
          title: _(h).nowLine.currentTime
        }, [
          O(N.$slots, "current-time-label", {
            now: _(h).now,
            timeFormatted: _(h).nowLine.currentTime
          }, () => [
            ye("span", null, me(_(h).nowLine.currentTime), 1)
          ])
        ], 12, Mn)) : Q("", !0)
      ])
    ]));
  }
}, Yn = {
  __name: "body",
  setup(m) {
    const t = Le("vuecal"), { view: c, config: r, dateUtils: h, touch: j, eventsManager: N } = t, y = ie(null), H = ie(null), Z = ie(null), { resizeState: A } = N, o = b(() => ({
      "--vuecal-grid-columns": c.cols,
      "--vuecal-grid-rows": c.rows,
      "--vuecal-body-max-height": r.time ? `${r.timeCellHeight * (r.timeTo - r.timeFrom) / r.timeStep}px` : null
    })), L = b(() => {
      const w = r.horizontal, a = w ? H.value : Z.value, G = h.formatTime(Ve(a, r), r.twelveHour ? "h:mm{am}" : "HH:mm");
      return {
        style: { [w ? "left" : "top"]: `${a}%` },
        time: G
      };
    }), S = (w) => {
      var F;
      if (c.isMonth || c.isYear || c.isYears) return;
      const a = j.isResizingEvent && r.editableEvents.resizeX;
      if (!r.timeAtCursor && !a) return;
      const G = ((F = w.touches) == null ? void 0 : F[0]) || w, { clientX: e, clientY: k } = G;
      if (a && (A.cellEl = d(e, k)), r.timeAtCursor) {
        const { top: V, left: E } = y.value.getBoundingClientRect();
        r.horizontal ? H.value = (e - E) * 100 / y.value.clientWidth : Z.value = Qe(k - V, y.value);
      }
    }, u = () => {
      H.value = null, Z.value = null;
    }, d = (w, a) => {
      const G = document.elementFromPoint(w, a);
      return (G == null ? void 0 : G.closest(".vuecal__cell")) || null;
    };
    return Ke(() => {
      y.value.addEventListener("mousemove", S), y.value.addEventListener("touchmove", S), y.value.addEventListener("mouseleave", u), y.value.addEventListener("touchend", u);
    }), Re(() => {
      y.value && (y.value.removeEventListener("mousemove", S), y.value.removeEventListener("touchmove", S), y.value.removeEventListener("mouseleave", u), y.value.removeEventListener("touchend", u));
    }), (w, a) => (z(), P("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: y,
      style: _e(o.value)
    }, [
      He(Ue, { name: "vuecal-shrink" }, {
        default: B(() => [
          _(r).timeAtCursor && (H.value !== null || Z.value !== null) ? (z(), P("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: _e(L.value.style)
          }, [
            ye("label", null, me(L.value.time), 1)
          ], 4)) : Q("", !0)
        ]),
        _: 1
      }),
      (z(!0), P(fe, null, ke(_(c).cellDates, (G, e) => (z(), Ce($t, {
        key: e,
        start: G.start,
        end: G.end,
        index: e
      }, ze({ _: 2 }, [
        w.$slots.cell ? {
          name: "cell",
          fn: B((k) => [
            O(w.$slots, "cell", oe({ ref_for: !0 }, k))
          ]),
          key: "0"
        } : void 0,
        w.$slots["cell-date"] ? {
          name: "cell-date",
          fn: B((k) => [
            O(w.$slots, "cell-date", oe({ ref_for: !0 }, k))
          ]),
          key: "1"
        } : void 0,
        w.$slots["cell-content"] ? {
          name: "cell-content",
          fn: B((k) => [
            O(w.$slots, "cell-content", oe({ ref_for: !0 }, k))
          ]),
          key: "2"
        } : void 0,
        w.$slots["cell-events"] ? {
          name: "cell-events",
          fn: B((k) => [
            O(w.$slots, "cell-events", oe({ ref_for: !0 }, k))
          ]),
          key: "3"
        } : void 0,
        w.$slots[`event.${_(c).id}`] ? {
          name: `event.${_(c).id}`,
          fn: B((k) => [
            O(w.$slots, `event.${_(c).id}`, oe({ ref_for: !0 }, k))
          ]),
          key: "4"
        } : void 0,
        w.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: B((k) => [
            O(w.$slots, "event.all-day", oe({ ref_for: !0 }, k))
          ]),
          key: "5"
        } : void 0,
        w.$slots.event ? {
          name: "event",
          fn: B((k) => [
            O(w.$slots, "event", oe({ ref_for: !0 }, k))
          ]),
          key: "6"
        } : void 0,
        w.$slots["event-count"] ? {
          name: "event-count",
          fn: B((k) => [
            O(w.$slots, "event-count", oe({ ref_for: !0 }, k))
          ]),
          key: "7"
        } : void 0,
        w.$slots["now-line"] ? {
          name: "now-line",
          fn: B((k) => [
            O(w.$slots, "now-line", oe({ ref_for: !0 }, k))
          ]),
          key: "8"
        } : void 0
      ]), 1032, ["start", "end", "index"]))), 128))
    ], 4));
  }
}, Sn = ["data-locale"], Cn = { class: "vuecal__scrollable-wrap" }, zn = {
  key: 1,
  class: "vuecal__week-numbers"
}, Vn = { class: "vuecal__week-number" }, On = { class: "vuecal__body-wrap" }, jn = {
  __name: "index",
  props: At,
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
  setup(m, { expose: t, emit: c }) {
    const r = m, h = c, j = Mt("vuecal-el"), N = Lt({ props: r, emit: h, attrs: Yt(), vuecalEl: j, uid: Et() }), { config: y, view: H, dateUtils: Z, touch: A } = N, o = b(() => y.time && (H.isDay || H.isDays || H.isWeek)), L = b(() => Array(H.rows).fill().map((a, G) => Z.getWeek(Z.addDays(H.firstCellDate, 7 * G)))), S = b(() => {
      var a;
      return {
        "vuecal--ready": y.ready,
        [`vuecal--${y.theme}-theme`]: y.theme,
        [`vuecal--${y.size}`]: !0,
        "vuecal--date-picker": y.datePicker,
        "vuecal--dark": y.dark,
        "vuecal--light": !y.dark,
        [`vuecal--${H.id}-view`]: !0,
        "vuecal--view-has-time": o.value,
        "vuecal--timeless": !y.time,
        "vuecal--dragging-cell": A.isDraggingCell,
        "vuecal--dragging-event": A.isDraggingEvent,
        "vuecal--resizing-event": A.isResizingEvent,
        "vuecal--has-schedules": (a = y.schedules) == null ? void 0 : a.length,
        "vuecal--horizontal": y.horizontal
      };
    }), u = b(() => {
      var a;
      return {
        "--vuecal-time-cell-size": y.timeCellHeight && `${y.timeCellHeight}px`,
        "--vuecal-schedules-count": ((a = y.schedules) == null ? void 0 : a.length) ?? 0
      };
    }), d = b(() => {
      var a, G;
      return {
        "vuecal__scrollable--row": o.value || y.weekNumbers && H.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${H.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (a = y.schedules) == null ? void 0 : a.length,
        "vuecal__scrollable--no-schedules": !((G = y.schedules) != null && G.length),
        "vuecal__scrollable--no-all-day-bar": !y.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": y.allDayEvents
      };
    }), w = (a) => {
      a.target.closest(".vuecal__cell") && a.preventDefault();
    };
    return Ke(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && j.value.addEventListener("contextmenu", w), await Ie(), y.ready = !0, h("ready", { config: y, view: H });
    }), Re(() => {
      var a;
      (a = j == null ? void 0 : j.value) == null || a.removeEventListener("contextmenu", w);
    }), at("vuecal", N), at("$vuecalEl", j), t({ view: N.view }), (a, G) => (z(), P("div", {
      class: pe(["vuecal", S.value]),
      ref: "vuecal-el",
      "data-locale": a.locale,
      style: _e(u.value)
    }, [
      a.$slots.diy ? O(a.$slots, "diy", {
        key: 0,
        vuecal: _(N)
      }) : (z(), P(fe, { key: 1 }, [
        He(It, null, ze({ _: 2 }, [
          a.$slots.header ? {
            name: "header",
            fn: B((e) => [
              O(a.$slots, "header", se(re(e)))
            ]),
            key: "0"
          } : void 0,
          !a.$slots.header && a.$slots["previous-button"] ? {
            name: "previous-button",
            fn: B((e) => [
              O(a.$slots, "previous-button", se(re(e)))
            ]),
            key: "1"
          } : void 0,
          !a.$slots.header && a.$slots["next-button"] ? {
            name: "next-button",
            fn: B((e) => [
              O(a.$slots, "next-button", se(re(e)))
            ]),
            key: "2"
          } : void 0,
          !a.$slots.header && a.$slots["today-button"] ? {
            name: "today-button",
            fn: B((e) => [
              O(a.$slots, "today-button", se(re(e)))
            ]),
            key: "3"
          } : void 0,
          !a.$slots.header && a.$slots.title ? {
            name: "title",
            fn: B((e) => [
              O(a.$slots, "title", se(re(e)))
            ]),
            key: "4"
          } : void 0,
          !a.$slots.header && a.$slots["title.day"] ? {
            name: "title.day",
            fn: B((e) => [
              O(a.$slots, "title.day", se(re(e)))
            ]),
            key: "5"
          } : void 0,
          !a.$slots.header && a.$slots["title.days"] ? {
            name: "title.days",
            fn: B((e) => [
              O(a.$slots, "title.days", se(re(e)))
            ]),
            key: "6"
          } : void 0,
          !a.$slots.header && a.$slots["title.week"] ? {
            name: "title.week",
            fn: B((e) => [
              O(a.$slots, "title.week", se(re(e)))
            ]),
            key: "7"
          } : void 0,
          !a.$slots.header && a.$slots["title.month"] ? {
            name: "title.month",
            fn: B((e) => [
              O(a.$slots, "title.month", se(re(e)))
            ]),
            key: "8"
          } : void 0,
          !a.$slots.header && a.$slots["title.year"] ? {
            name: "title.year",
            fn: B((e) => [
              O(a.$slots, "title.year", se(re(e)))
            ]),
            key: "9"
          } : void 0,
          !a.$slots.header && a.$slots["title.years"] ? {
            name: "title.years",
            fn: B((e) => [
              O(a.$slots, "title.years", se(re(e)))
            ]),
            key: "10"
          } : void 0,
          !a.$slots.header && a.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: B((e) => [
              O(a.$slots, "schedule-heading", se(re(e)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        ye("div", Cn, [
          He(Ue, {
            name: `vuecal-slide-fade--${_(H).transitionDirection}`
          }, {
            default: B(() => [
              (z(), P("div", {
                class: pe(["vuecal__scrollable", d.value]),
                key: _(H).id + _(H).start.getTime()
              }, [
                o.value ? (z(), Ce(En, { key: 0 }, ze({ _: 2 }, [
                  a.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: B((e) => [
                      O(a.$slots, "time-cell", se(re(e)))
                    ]),
                    key: "0"
                  } : void 0,
                  a.$slots["current-time-label"] ? {
                    name: "current-time-label",
                    fn: B((e) => [
                      O(a.$slots, "current-time-label", se(re(e)))
                    ]),
                    key: "1"
                  } : void 0
                ]), 1024)) : Q("", !0),
                _(y).weekNumbers && _(H).isMonth ? (z(), P("div", zn, [
                  (z(!0), P(fe, null, ke(L.value, (e) => (z(), P("div", Vn, [
                    O(a.$slots, "week-number", {}, () => [
                      ye("small", null, me(e), 1)
                    ])
                  ]))), 256))
                ])) : Q("", !0),
                ye("div", On, [
                  He(kn, null, ze({ _: 2 }, [
                    a.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: B((e) => [
                        O(a.$slots, "weekday-heading", se(re(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    a.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: B((e) => [
                        O(a.$slots, "schedule-heading", se(re(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    a.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: B((e) => [
                        O(a.$slots, "event.all-day", se(re(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    a.$slots.event ? {
                      name: "event",
                      fn: B((e) => [
                        O(a.$slots, "event", se(re(e)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  He(Yn, null, ze({ _: 2 }, [
                    a.$slots.cell ? {
                      name: "cell",
                      fn: B((e) => [
                        O(a.$slots, "cell", se(re(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: B((e) => [
                        O(a.$slots, "cell-date", se(re(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: B((e) => [
                        O(a.$slots, "cell-content", se(re(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: B((e) => [
                        O(a.$slots, "cell-events", se(re(e)))
                      ]),
                      key: "3"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: B((e) => [
                        O(a.$slots, "event.all-day", se(re(e)))
                      ]),
                      key: "4"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots[`event.${_(H).id}`] ? {
                      name: `event.${_(H).id}`,
                      fn: B((e) => [
                        O(a.$slots, `event.${_(H).id}`, se(re(e)))
                      ]),
                      key: "5"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots.event ? {
                      name: "event",
                      fn: B((e) => [
                        O(a.$slots, "event", se(re(e)))
                      ]),
                      key: "6"
                    } : void 0,
                    !a.$slots.cell && a.$slots["event-count"] ? {
                      name: "event-count",
                      fn: B((e) => [
                        O(a.$slots, "event-count", se(re(e)))
                      ]),
                      key: "7"
                    } : void 0,
                    a.$slots["now-line"] ? {
                      name: "now-line",
                      fn: B((e) => [
                        O(a.$slots, "now-line", se(re(e)))
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
    ], 14, Sn));
  }
}, Ln = (m) => {
  Xe.texts = { ...De.texts, ...m }, Xe.dateUtils.updateTexts(Xe.texts);
}, {
  addDatePrototypes: Pn,
  removeDatePrototypes: An,
  updateTexts: Fn,
  addDays: Xn,
  subtractDays: Rn,
  addHours: Nn,
  subtractHours: Wn,
  addMinutes: Bn,
  subtractMinutes: In,
  getWeek: Gn,
  isToday: qn,
  isSameDate: Jn,
  isInRange: Un,
  isLeapYear: Zn,
  getPreviousFirstDayOfWeek: Kn,
  stringToDate: Qn,
  dateToMinutes: xn,
  countDays: ea,
  datesInSameTimeStep: ta,
  isValid: na,
  formatDate: aa,
  formatDateLite: sa,
  formatTime: la,
  formatTimeLite: ra,
  formatMinutes: oa
} = Xe.dateUtils;
export {
  jn as VueCal,
  Pn as addDatePrototypes,
  Xn as addDays,
  Nn as addHours,
  Bn as addMinutes,
  ea as countDays,
  xn as dateToMinutes,
  ta as datesInSameTimeStep,
  aa as formatDate,
  sa as formatDateLite,
  oa as formatMinutes,
  la as formatTime,
  ra as formatTimeLite,
  Kn as getPreviousFirstDayOfWeek,
  Gn as getWeek,
  Un as isInRange,
  Zn as isLeapYear,
  Jn as isSameDate,
  qn as isToday,
  na as isValidDate,
  An as removeDatePrototypes,
  Qn as stringToDate,
  Rn as subtractDays,
  Wn as subtractHours,
  In as subtractMinutes,
  Fn as updateTexts,
  Ln as useLocale
};
