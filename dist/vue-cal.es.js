import { computed as C, reactive as $e, watch as pe, toRefs as Ct, ref as de, onBeforeUnmount as We, nextTick as qe, inject as Le, openBlock as F, createElementBlock as G, renderSlot as N, unref as k, Fragment as fe, renderList as be, normalizeClass as De, createCommentVNode as te, createElementVNode as he, createVNode as Pe, Transition as Ue, withCtx as Q, createBlock as He, resolveDynamicComponent as st, mergeProps as ue, toHandlers as Je, normalizeProps as oe, onMounted as tt, toDisplayString as ve, createTextVNode as Ze, withModifiers as lt, normalizeStyle as we, TransitionGroup as rt, createSlots as Ae, useTemplateRef as Ot, useId as Ht, useAttrs as Vt, provide as ot, guardReactiveProps as ie } from "vue";
/**
  * vue-cal v5.0.1-rc.44
  * (c) 2024-2026 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const ye = {
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
}, At = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Ne = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], ct = (r) => !r || typeof r != "object" || Array.isArray(r) ? !1 : ("from" in r || "to" in r) && ("class" in r || "label" in r || "allowEvents" in r), Ke = (r) => {
  if (!r) return [];
  const e = Array.isArray(r) ? r : [r], o = [];
  for (let n = 0; n < e.length; n++) {
    const d = e[n];
    ct(d) && o.push({ ...d });
  }
  return o;
}, jt = (r) => {
  if (!r) return null;
  if (Array.isArray(r) || ct(r))
    return {
      default: Ke(r),
      schedules: {}
    };
  if (typeof r != "object") return null;
  const e = {
    default: Ke(r.default),
    schedules: {}
  };
  let o = 0;
  const n = r.schedules;
  if (n && typeof n == "object") {
    const d = Object.keys(n);
    o = d.length;
    for (let T = 0; T < d.length; T++) {
      const S = d[T];
      e.schedules[S] = Ke(n[S]);
    }
  }
  return !e.default.length && !o ? null : e;
}, Pt = (r) => {
  const e = {};
  let o = !1;
  for (const n in r) {
    if (!Object.prototype.hasOwnProperty.call(r, n)) continue;
    const d = r[n];
    if (!d) continue;
    let T = null, S = null;
    const v = d.default;
    if (v && v.length)
      for (let L = 0; L < v.length; L++) {
        const P = v[L];
        P && P.allowEvents === !1 && typeof P.from == "number" && typeof P.to == "number" && (T || (T = []), T.push({ from: P.from, to: P.to }), o = !0);
      }
    const p = d.schedules;
    if (p && typeof p == "object")
      for (const L in p) {
        if (!Object.prototype.hasOwnProperty.call(p, L)) continue;
        const P = p[L];
        if (!P || !P.length) continue;
        const f = [];
        for (let b = 0; b < P.length; b++) {
          const H = P[b];
          H && H.allowEvents === !1 && typeof H.from == "number" && typeof H.to == "number" && (f.push({ from: H.from, to: H.to }), o = !0);
        }
        f.length && (S || (S = {}), S[L] = f);
      }
    if (T || S) {
      const L = {};
      T && (L.default = T), S && (L.schedules = S), e[n] = L;
    }
  }
  return { hasAny: o, byWeekday: e };
}, Lt = Ne.reduce((r, e, o) => (r[e] = o || 7, r), {}), Ft = (r, e, o) => {
  const { dateUtils: n } = r, d = !1, T = C(() => {
    if (e.view && b.value[e.view]) return e.view;
    if (e.view && !b.value[e.view])
      return console.warn(
        `Vue Cal: the provided view \`${e.view}\` is not in the list of available views. The first available view will be chosen: \`${Object.keys(b.value)[0]}\`.`
      ), Object.keys(b.value)[0];
    const s = e.datePicker ? "month" : "week";
    return b.value[s] ? s : Object.keys(b.value)[0];
  }), S = C(() => e.sm && !e.xs), v = C(() => e.xs || e.datePicker), p = C(() => e.clickToNavigate || e.datePicker && e.clickToNavigate !== !1), L = C(() => {
    const s = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, w = (O) => O.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [O, u] of Object.entries(o)) {
      const [J, ee, ne] = O.match(/^on(Cell|Event)(.+)$/) || [];
      J && (s[ee.toLowerCase()][w(ne).replace(/^-+|-+$/g, "")] = u);
    }
    return s;
  }), P = C(() => {
    var w;
    const s = {};
    return e.hideWeekends && (s[6] = !0) && (s[7] = !0), (w = e.hideWeekdays) != null && w.length && e.hideWeekdays.forEach((O) => s[Lt[O]] = !0), s;
  }), f = C(() => e.hideWeekends || P.value[6] && P.value[7]), b = C(() => {
    const s = e.datePicker;
    let w = 0, O = {};
    const u = e.views;
    if (s && !u) return {
      month: { ...ye.availableViews.month },
      year: { ...ye.availableViews.year },
      years: { ...ye.availableViews.years }
    };
    if (u)
      Array.isArray(u) ? O = u.reduce((J, ee) => (typeof ee == "string" && ye.availableViews[ee] ? J[ee] = ye.availableViews[ee] : w++, J), {}) : typeof u == "object" && (O = Object.entries(u).reduce((J, [ee, ne]) => {
        const { cols: R, rows: se } = ye.availableViews[ee];
        return J[ee] = { cols: ne.cols || R, rows: ne.rows || se }, J;
      }, {})), w && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(O).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), O = { ...ye.availableViews });
    else if (O = { ...ye.availableViews }, e.horizontal) {
      const { days: J, week: ee } = ye.availableViews;
      O.days = { cols: J.rows, rows: J.cols }, O.week = { cols: ee.rows, rows: ee.cols };
    }
    return O;
  }), H = C(() => e.datePicker ? "month" : b.value.week ? "week" : Object.keys(b.value)[0]), l = C(() => {
    if (typeof e.selectedDate == "string") return n.stringToDate(e.selectedDate);
    if (e.selectedDate instanceof Date) return e.selectedDate;
    e.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", e.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), D = C(() => {
    if (!e.disableDays) return [];
    const s = [];
    if (Array.isArray(e.disableDays))
      for (let w of e.disableDays) {
        let O = w;
        typeof w == "string" ? O = n.stringToDate(w) : w instanceof Date && (w = n.formatDate(w, "YYYY-MM-DD")), O instanceof Date && !isNaN(O.getTime()) ? s.push(w) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", w);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", e.disableDays);
    return s;
  }), g = C(() => {
    let s = null;
    return e.minDate && typeof e.minDate == "string" ? s = n.stringToDate(e.minDate) : e.minDate && e.minDate instanceof Date && (s = e.minDate), (s == null ? void 0 : s.getTime()) || null;
  }), a = C(() => {
    let s = null;
    return e.maxDate && typeof e.maxDate == "string" ? s = n.stringToDate(e.maxDate) : e.maxDate && e.maxDate instanceof Date && (s = e.maxDate), (s == null ? void 0 : s.getTime()) || null;
  }), U = C(() => {
    const { view: s } = r, w = e.schedules;
    if (!(w != null && w.length) || !(s.isDay || s.isDays || s.isWeek)) return;
    const O = [];
    for (let u = 0; u < w.length; u++) {
      const J = w[u];
      J.hide || O.push({ ...J, id: J.id ?? u + 1 });
    }
    return O.length ? O : void 0;
  }), y = C(() => {
    const s = e.specialHours, w = e.businessHours;
    return s && typeof s == "object" && !Array.isArray(s) && Object.keys(s).length ? s : w && typeof w == "object" && !Array.isArray(w) ? w : {};
  }), I = C(() => {
    const s = y.value;
    return !s || typeof s != "object" ? {} : Object.entries(s).reduce((w, [O, u]) => {
      if (!Ne.includes(O)) return w;
      const J = jt(u);
      return J && (w[O] = J), w;
    }, {});
  }), le = C(() => Pt(I.value)), t = C(() => {
    const s = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return e.editableEvents === !0 ? s : e.editableEvents === !1 ? Object.keys(s).map((w) => s[w] = !1) : { ...s, ...e.editableEvents };
  }), V = C(() => {
    const { view: s } = r, { eventCount: w } = e;
    return (Array.isArray(w) ? w.includes(s.id) : w) && (s.isMonth && !e.eventsOnMonthView || s.isYear);
  }), E = C(() => {
    const { view: s } = r;
    return e.allDayEvents && e.time && (s.isDay || s.isDays || s.isWeek);
  }), $ = C(() => {
    const { view: s } = r;
    return e.horizontal && (s.isDay || s.isDays || s.isWeek);
  }), M = C(() => e.timeAtCursor && e.time), h = async (s) => {
    var O;
    let w = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((u) => u.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((u) => u.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((u) => u.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((u) => u.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((u) => u.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((u) => u.default), "../i18n/da.json": () => import("./i18n/da.js").then((u) => u.default), "../i18n/de.json": () => import("./i18n/de.js").then((u) => u.default), "../i18n/el.json": () => import("./i18n/el.js").then((u) => u.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((u) => u.default), "../i18n/en-us.json": () => Promise.resolve().then(() => It).then((u) => u.default), "../i18n/es.json": () => import("./i18n/es.js").then((u) => u.default), "../i18n/et.json": () => import("./i18n/et.js").then((u) => u.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((u) => u.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((u) => u.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((u) => u.default), "../i18n/he.json": () => import("./i18n/he.js").then((u) => u.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((u) => u.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((u) => u.default), "../i18n/id.json": () => import("./i18n/id.js").then((u) => u.default), "../i18n/is.json": () => import("./i18n/is.js").then((u) => u.default), "../i18n/it.json": () => import("./i18n/it.js").then((u) => u.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((u) => u.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((u) => u.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((u) => u.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((u) => u.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((u) => u.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((u) => u.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((u) => u.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((u) => u.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((u) => u.default), "../i18n/no.json": () => import("./i18n/no.js").then((u) => u.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((u) => u.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((u) => u.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((u) => u.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((u) => u.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((u) => u.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((u) => u.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((u) => u.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((u) => u.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((u) => u.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((u) => u.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((u) => u.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((u) => u.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((u) => u.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((u) => u.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((u) => u.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((u) => u.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((u) => u.default) });
    {
      if (!w[`../i18n/${s}.json`]) {
        console.warn(`Vue Cal: the locale \`${s}\` does not exist. Falling back to \`en-us\`.`), s = "en-us";
        return;
      }
      w = await ((O = w[`../i18n/${s}.json`]) == null ? void 0 : O.call(w));
    }
    r.texts = Object.assign(r.texts, Object.assign({ ...ye.texts }, w)), n.updateTexts(r.texts);
  }, W = $e(e.events || []);
  return pe(
    [() => e.events, () => {
      var s;
      return (s = e.events) == null ? void 0 : s.length;
    }],
    ([s]) => W.splice(0, W.length, ...s || [])
  ), pe(() => e.locale, (s) => h(s || "en-us")), (e.locale || !r.texts.today) && h(e.locale || "en-us"), {
    ...Ct(e),
    events: W,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: L,
    defaultView: H,
    availableViews: b,
    disableDays: D,
    ready: d,
    sm: S,
    xs: v,
    clickToNavigate: p,
    hideWeekdays: P,
    hideWeekends: f,
    minTimestamp: g,
    maxTimestamp: a,
    schedules: U,
    specialHours: I,
    specialHoursDisallowed: le,
    selectedDate: l,
    editableEvents: t,
    showCellEventCount: V,
    allDayEvents: E,
    horizontal: $,
    timeAtCursor: M,
    view: T,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(P.value).length;
    },
    get size() {
      return v.value ? "xs" : S.value ? "sm" : "lg";
    },
    loadTexts: h
  };
}, Oe = (r, e) => {
  const o = e.timeTo - e.timeFrom;
  return (r - e.timeFrom) * 100 / o;
}, Se = (r, e) => {
  const o = e.timeTo - e.timeFrom;
  return ~~(r * o / 100 + e.timeFrom);
}, nt = (r, e) => {
  const o = e.clientHeight;
  return r * 100 / o;
}, Ye = ({ start: r, end: e, schedule: o, disallowed: n, hasSchedules: d }) => {
  if (!(n != null && n.hasAny) || !r || !e) return !1;
  const T = n.byWeekday, S = r.getTime(), v = e.getTime();
  if (v <= S) return !1;
  const p = new Date(r);
  p.setHours(0, 0, 0, 0);
  const L = new Date(e);
  for (L.setHours(0, 0, 0, 0); p.getTime() <= L.getTime(); ) {
    const P = Ne[p.getDay()], f = T[P];
    if (f) {
      let b = f.default;
      if (d && o !== void 0 && o !== null && f.schedules) {
        const l = String(o);
        Object.prototype.hasOwnProperty.call(f.schedules, l) && (b = f.schedules[l]);
      }
      if (!b || !b.length) {
        p.setDate(p.getDate() + 1);
        continue;
      }
      const H = p.getTime();
      for (let l = 0; l < b.length; l++) {
        const { from: D, to: g } = b[l], a = H + D * 6e4, U = H + g * 6e4;
        if (S < U && v > a) return !0;
      }
    }
    p.setDate(p.getDate() + 1);
  }
  return !1;
}, dt = 6e4, xe = (r, e, o, n, d) => {
  if (!(n != null && n.hasAny)) return e;
  const T = r.getTime(), S = e.getTime();
  if (S <= T || !Ye({ start: r, end: e, schedule: o, disallowed: n, hasSchedules: d }))
    return e;
  let v = T + dt, p = S, L = T;
  for (; v <= p; ) {
    const P = Math.floor((v + p + 1) / 2);
    Ye({ start: r, end: new Date(P), schedule: o, disallowed: n, hasSchedules: d }) ? p = P - 1 : (L = P, v = P + 1);
  }
  return new Date(L);
}, et = (r, e, o, n, d) => {
  if (!(n != null && n.hasAny)) return e;
  const T = r.getTime(), S = e.getTime();
  if (T <= S || !Ye({ start: e, end: r, schedule: o, disallowed: n, hasSchedules: d }))
    return e;
  let v = S, p = T - dt, L = S;
  for (; v <= p; ) {
    const P = Math.floor((v + p) / 2);
    Ye({ start: new Date(P), end: r, schedule: o, disallowed: n, hasSchedules: d }) ? v = P + 1 : (L = P, p = P - 1);
  }
  return new Date(L);
}, Rt = ({
  anchorDayMinutes: r,
  cursorDayMinutes: e,
  snappedLow: o,
  snappedHigh: n,
  cellDate: d,
  schedule: T,
  disallowed: S,
  hasSchedules: v
}) => {
  let p = o, L = n;
  if (!(S != null && S.hasAny) || L <= p) return { low: p, high: L };
  const P = new Date(d);
  P.setHours(0, 0, 0, 0);
  const f = (g) => {
    const a = new Date(P);
    return a.setMinutes(g), a;
  }, b = f(p), H = f(L);
  if (!Ye({ start: b, end: H, schedule: T, disallowed: S, hasSchedules: v })) return { low: p, high: L };
  const l = P.getTime(), D = (g) => Math.round((g.getTime() - l) / 6e4);
  if (r <= e) {
    const g = xe(b, H, T, S, v);
    L = D(g);
  } else {
    const g = et(H, b, T, S, v);
    p = D(g);
  }
  return { low: p, high: L };
}, Xt = ({
  proposedStart: r,
  proposedEnd: e,
  prevStart: o,
  prevEnd: n,
  schedule: d,
  disallowed: T,
  hasSchedules: S
}) => {
  if (!(T != null && T.hasAny)) return { start: r, end: e };
  let v = r, p = e;
  if (p.getTime() <= v.getTime()) return { start: v, end: p };
  if (!Ye({ start: v, end: p, schedule: d, disallowed: T, hasSchedules: S })) return { start: v, end: p };
  const L = o.getTime(), P = n.getTime(), f = v.getTime(), H = p.getTime() !== P, l = f !== L;
  if (H && !l)
    return p = xe(v, p, d, T, S), { start: v, end: p };
  if (l && !H)
    return v = et(p, v, d, T, S), { start: v, end: p };
  const D = xe(v, p, d, T, S);
  return Ye({ start: v, end: D, schedule: d, disallowed: T, hasSchedules: S }) ? (v = et(p, v, d, T, S), { start: v, end: p }) : { start: v, end: D };
}, Ge = $e({ id: null, date: null });
let it = !1, Qe = !0;
const ke = $e({ el: null, cell: null, timeout: null }), Te = $e({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function Bt(r) {
  const { config: e, view: o, eventsManager: n, emit: d, uid: T, dateUtils: S } = r, v = (g) => {
    var V;
    const a = e.horizontal, { clientX: U, clientY: y } = ((V = g.touches) == null ? void 0 : V[0]) || g, { top: I, left: le } = g.currentTarget.getBoundingClientRect(), t = ~~g.dataTransfer.getData("cursor-grab-at");
    if (a) {
      const E = U - le - t;
      return Se(E * 100 / g.currentTarget.clientWidth, e);
    } else {
      const E = y - I - t;
      return Se(nt(E, g.currentTarget), e);
    }
  }, p = (g, a, U) => {
    const y = a.duration || L(a.start, a.end) || e.timeStep;
    let I = Math.max(v(g), 0);
    if (e.snapToInterval) {
      const E = I + e.snapToInterval / 2;
      I = E - E % e.snapToInterval;
    }
    const le = new Date(new Date(U).setMinutes(I)), t = Math.min(I + y, 1440), V = new Date(new Date(U).setMinutes(t));
    return { start: le, end: V };
  }, L = (g, a) => Math.round((a - g) / 6e4);
  return {
    eventDragStart: (g, a) => {
      if (g.target.nodeType === 3 || r.touch.isResizingEvent) return g.preventDefault();
      g.dataTransfer.effectAllowed = "move", g.dataTransfer.dropEffect = "move";
      const U = { ...a, _: { id: a._.id, duration: L(a.start, a.end) } };
      try {
        g.dataTransfer.setData("text/plain", ""), g.dataTransfer.setData("event", JSON.stringify(U)), g.dataTransfer.setData("cursor-grab-at", e.horizontal ? g.offsetX : g.offsetY);
      } catch (I) {
        return console.warn("Vue Cal: Failed to set drag data:", I), g.preventDefault();
      }
      Te.eventId = a._.id, Te.fromVueCal = T, d("event-drag-start", {
        e: g,
        event: a
      });
      const y = g.target.closest(".vuecal__event");
      y.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        y.classList.add("vuecal__event--dragging-original"), y.classList.remove("vuecal__event--dragging-ghost");
      }, 0), it = !1, Object.assign(Ge, { id: o.id, date: o.firstCellDate }), Qe = !0, r.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (g, a) => {
      Te.eventId = null, g.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: U, toVueCal: y } = Te;
      y && U !== y && n.deleteEvent(a._.id, 3), it && Qe && Ge.id && o.switchView(Ge.id, Ge.date, !0), d("event-drag-end", {
        e: g,
        event: a,
        external: Te.fromVueCal !== T
      }), Te.fromVueCal = null, Te.toVueCal = null, r.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (g, a) => {
      const { start: U } = a, y = g.currentTarget;
      if (!g.currentTarget.contains(g.relatedTarget)) {
        if (y === ke.el || !y.className.includes("vuecal__cell-content")) return !1;
        ke.el && (ke.cell.highlighted = !1), Object.assign(ke, { el: y, cell: a, timeout: clearTimeout(ke.timeout) }), a.highlighted = !0, ["years", "year", "month"].includes(o.id) && (ke.timeout = setTimeout(() => r.switchToNarrowerView(U), 2e3));
      }
    },
    cellDragOver: (g, a) => {
      const { start: U, schedule: y } = a;
      g.preventDefault(), a.highlighted = !0, (y || y === 0) && (a.highlightedSchedule = y);
    },
    cellDragLeave: (g, a) => {
      g.preventDefault(), !g.currentTarget.contains(g.relatedTarget) && (a.highlightedSchedule = !1, ke.cell === a && (clearTimeout(ke.timeout), Object.assign(ke, { el: null, cell: null, timeout: null }), a.highlighted = !1));
    },
    cellDragDrop: async (g, a, U = !1) => {
      var w, O, u, J, ee, ne;
      g.preventDefault(), clearTimeout(ke.timeout), Object.assign(ke, { el: null, cell: null, timeout: null });
      const y = JSON.parse(g.dataTransfer.getData("event") || "{}");
      y.start && (y.start = new Date(y.start)), y.end && (y.end = new Date(y.end));
      let I, le, t;
      U ? (le = new Date(a.start), t = new Date(a.end)) : { start: le, end: t } = p(g, y, a.start);
      let { schedule: V } = ((w = g.target.closest("[data-schedule]")) == null ? void 0 : w.dataset) || {}, E;
      V !== void 0 && String(V).length && (E = ((u = (O = e.schedules) == null ? void 0 : O.find((R) => String(R.id) === String(V))) == null ? void 0 : u.id) ?? V);
      let $ = () => {
      };
      Te.fromVueCal === T ? (I = n.getEvent(y._.id), I && (I._.dragging = !1, $ = (R) => {
        if (I.start = le, I.end = t, I.allDay = U, E !== void 0 && (I.schedule = E), R && typeof R == "object") {
          const { _: se, ...i } = R;
          Object.assign(I, i);
        }
      })) : (I = {
        ...y,
        start: le,
        end: t,
        ...E !== void 0 && { schedule: E },
        _: { id: ((J = y._) == null ? void 0 : J.id) || y.id, duration: L(le, t) },
        getOverlappingEvents: () => n.getEventsInRange(le, t, { schedule: E })
      }, $ = (R) => {
        if (I = n.createEvent(I), R && typeof R == "object") {
          const { _: se, ...i } = R;
          Object.assign(I, i);
        }
      });
      const M = E !== void 0 ? E : (I == null ? void 0 : I.schedule) !== void 0 ? I.schedule : y == null ? void 0 : y.schedule, h = !!(e.schedules && e.schedules.length);
      let W = !0;
      const { drop: s } = (ee = e.eventListeners) == null ? void 0 : ee.event;
      !U && e.time && ((ne = e.specialHoursDisallowed) != null && ne.hasAny) && Ye({
        start: le,
        end: t,
        schedule: M,
        disallowed: e.specialHoursDisallowed,
        hasSchedules: h
      }) ? W = !1 : s && (W = await s({
        e: g,
        event: { ...I, start: le, end: t, schedule: E },
        overlaps: I.getOverlappingEvents({ start: le, end: t, schedule: E }),
        cell: a,
        external: Te.fromVueCal !== T
      })), W !== !1 && $(W), a.highlighted = !1, a.highlightedSchedule = null, Qe = !1, Te.toVueCal = T, d("event-dropped", {
        e: g,
        cell: a,
        event: I,
        originalEvent: y,
        external: Te.fromVueCal !== T
      });
    }
  };
}
const vt = (r, e) => {
  let o, n, d, T = {}, S = {};
  const v = de(r), p = () => {
    v.value.today || (v.value = e), Date.prototype.addDays = function(i) {
      return b(this, i || 0);
    }, Date.prototype.subtractDays = function(i) {
      return H(this, i || 0);
    }, Date.prototype.addHours = function(i) {
      return l(this, i || 0);
    }, Date.prototype.subtractHours = function(i) {
      return D(this, i || 0);
    }, Date.prototype.addMinutes = function(i) {
      return g(this, i || 0);
    }, Date.prototype.subtractMinutes = function(i) {
      return a(this, i || 0);
    }, Date.prototype.getWeek = function() {
      return y(this);
    }, Date.prototype.isToday = function() {
      return I(this);
    }, Date.prototype.isLeapYear = function() {
      return V(this);
    }, Date.prototype.format = function(i = "YYYY-MM-DD") {
      return w(this, i);
    }, Date.prototype.formatTime = function(i = "HH:mm") {
      return u(this, i);
    };
  }, L = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, P = (i) => {
    v.value = i, Date.prototype.subtractDays && p();
  }, f = () => (n !== (/* @__PURE__ */ new Date()).getDate() && (o = /* @__PURE__ */ new Date(), n = o.getDate(), d = `${o.getFullYear()}-${o.getMonth()}-${o.getDate()}`), d), b = (i, Y) => {
    const _ = new Date(i.valueOf());
    return _.setDate(_.getDate() + Y), _;
  }, H = (i, Y) => {
    const _ = new Date(i.valueOf());
    return _.setDate(_.getDate() - Y), _;
  }, l = (i, Y) => {
    const _ = new Date(i.valueOf());
    return _.setHours(_.getHours() + Y), _;
  }, D = (i, Y) => {
    const _ = new Date(i.valueOf());
    return _.setHours(_.getHours() - Y), _;
  }, g = (i, Y) => {
    const _ = new Date(i.valueOf());
    return _.setMinutes(_.getMinutes() + Y), _;
  }, a = (i, Y) => {
    const _ = new Date(i.valueOf());
    return _.setMinutes(_.getMinutes() - Y), _;
  }, U = (i, Y) => {
    const _ = (x) => {
      const ae = x % Y;
      return ae !== 0 && (x += ae >= Y / 2 ? Y - ae : -ae), x;
    };
    if (typeof i == "number") return _(i);
    if (i instanceof Date) {
      let x = _(i.getMinutes());
      x >= 60 && (i.setHours(i.getHours() + 1), x = 0), i.setMinutes(x, 0, 0);
    }
  }, y = (i, Y = !1) => {
    const _ = new Date(Date.UTC(i.getFullYear(), i.getMonth(), i.getDate())), x = _.getUTCDay() || 7;
    _.setUTCDate(_.getUTCDate() + 4 - x);
    const ae = new Date(Date.UTC(_.getUTCFullYear(), 0, 1));
    return Math.ceil(((_ - ae) / 864e5 + 1) / 7) + (Y ? 1 : 0);
  }, I = (i) => `${i.getFullYear()}-${i.getMonth()}-${i.getDate()}` === f(), le = (i, Y) => {
    if (!i || !Y) return console.warn(`Vue Cal: missing date${i ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (s(i)) {
      if (!s(Y)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${Y}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${i}\`.`);
    return i.getFullYear() === Y.getFullYear() && i.getMonth() === Y.getMonth() && i.getDate() === Y.getDate();
  }, t = (i, Y, _) => s(i) ? i.getTime() >= Y && i.getTime() <= _ : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${i}\`.`), V = (i) => {
    const Y = i.getFullYear();
    return !(Y % 400) || Y % 100 && !(Y % 4);
  }, E = (i = null, Y) => {
    const _ = i && new Date(i.valueOf()) || /* @__PURE__ */ new Date(), x = Y ? 7 : 6;
    return _.setDate(_.getDate() - (_.getDay() + x) % 7), _;
  }, $ = (i) => i instanceof Date ? i : (i.length === 10 && (i += " 00:00"), new Date(i.replace(/-/g, "/"))), M = (i) => i.getHours() * 60 + i.getMinutes(), h = (i, Y) => {
    typeof i == "string" && (i = i.replace(/-/g, "/")), typeof Y == "string" && (Y = Y.replace(/-/g, "/")), i = new Date(i).setHours(0, 0, 0, 0), Y = new Date(Y).setHours(0, 0, 1, 0);
    const _ = (new Date(Y).getTimezoneOffset() - new Date(i).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((Y - i - _) / (24 * 3600 * 1e3));
  }, W = (i, Y, _) => Math.abs(i.getTime() - Y.getTime()) <= _ * 60 * 1e3, s = (i) => i && i instanceof Date && !isNaN(i), w = (i, Y = "YYYY-MM-DD", _ = null) => {
    if (_ || (_ = v.value), Y || (Y = "YYYY-MM-DD"), Y === "YYYY-MM-DD") return O(i);
    T = {}, S = {};
    const x = {
      YYYY: () => R(i, _).YYYY,
      YY: () => R(i, _).YY(),
      M: () => R(i, _).M,
      MM: () => R(i, _).MM(),
      MMM: () => R(i, _).MMM(),
      MMMM: () => R(i, _).MMMM(),
      MMMMG: () => R(i, _).MMMMG(),
      D: () => R(i, _).D,
      DD: () => R(i, _).DD(),
      S: () => R(i, _).S(),
      d: () => R(i, _).d,
      dd: () => R(i, _).dd(),
      ddd: () => R(i, _).ddd(),
      dddd: () => R(i, _).dddd(),
      HH: () => se(i, _).HH,
      H: () => se(i, _).H,
      hh: () => se(i, _).hh,
      h: () => se(i, _).h,
      am: () => se(i, _).am,
      AM: () => se(i, _).AM,
      mm: () => se(i, _).mm,
      m: () => se(i, _).m,
      s: () => se(i, _).s
    };
    return Y.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (ae, me) => {
      const ce = x[me.replace(/\{|\}/g, "")];
      return ce !== void 0 ? ce() : me;
    });
  }, O = (i) => {
    const Y = i.getMonth() + 1, _ = i.getDate();
    return `${i.getFullYear()}-${Y < 10 ? "0" : ""}${Y}-${_ < 10 ? "0" : ""}${_}`;
  }, u = (i, Y = "HH:mm", _ = null, x = !1) => {
    let ae = !1;
    if (x) {
      const [Ve, ge, m] = [i.getHours(), i.getMinutes(), i.getSeconds()];
      Ve + ge + m === 141 && (ae = !0);
    }
    if (i instanceof Date && Y === "HH:mm") return ae ? "24:00" : J(i);
    S = {}, _ || (_ = v.value);
    const me = se(i, _), ce = Y.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (Ve, ge) => {
      const m = me[ge.replace(/\{|\}/g, "")];
      return m !== void 0 ? m : ge;
    });
    return ae ? ce.replace("23:59", "24:00") : ce;
  }, J = (i) => {
    const Y = i.getHours(), _ = i.getMinutes();
    return `${(Y < 10 ? "0" : "") + Y}:${(_ < 10 ? "0" : "") + _}`;
  }, ee = (i) => {
    const Y = Math.floor(i / 60).toString().padStart(2, 0), _ = (i % 60).toString().padStart(2, 0);
    return `${Y}:${_}`;
  }, ne = (i) => {
    if (i > 3 && i < 21) return "th";
    switch (i % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }, R = (i, Y) => {
    if (T.D) return T;
    const _ = i.getFullYear(), x = i.getMonth() + 1, ae = i.getDate(), ce = (i.getDay() - 1 + 7) % 7;
    return T = {
      // Year.
      YYYY: _,
      // 2024.
      YY: () => _.toString().substring(2),
      // 24.
      // Month.
      M: x,
      // 1 to 12.
      MM: () => x.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => Y.months[x - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => Y.months[x - 1],
      // January to December.
      MMMMG: () => (Y.monthsGenitive || Y.months)[x - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: ae,
      // 1 to 31.
      DD: () => ae.toString().padStart(2, 0),
      // 01 to 31.
      S: () => ne(ae),
      // st, nd, rd, th.
      // Day of the week.
      d: ce + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => Y.weekDaysShort.length ? Y.weekDaysShort[ce] : Y.weekDays[ce][0],
      // M to S.
      ddd: () => Y.weekDaysShort.length ? Y.weekDaysShort[ce] : Y.weekDays[ce].substr(0, 3),
      // Mon to Sun.
      dddd: () => Y.weekDays[ce]
      // Monday to Sunday.
    }, T;
  }, se = (i, Y) => {
    if (S.am) return S;
    let _, x, ae;
    i instanceof Date ? (_ = i.getHours(), x = i.getMinutes(), ae = i.getSeconds()) : (_ = Math.floor(i / 60), x = Math.floor(i % 60));
    const me = _ % 12 ? _ % 12 : 12, ce = (Y || { am: "am", pm: "pm" })[_ === 24 || _ < 12 ? "am" : "pm"];
    return S = {
      H: _,
      h: me,
      HH: _.toString().padStart(2, 0),
      hh: me.toString().padStart(2, 0),
      am: ce,
      AM: ce.toUpperCase(),
      m: x,
      mm: x.toString().padStart(2, 0),
      s: ae
    }, S;
  };
  return {
    addDatePrototypes: p,
    removeDatePrototypes: L,
    updateTexts: P,
    addDays: b,
    subtractDays: H,
    addHours: l,
    subtractHours: D,
    addMinutes: g,
    subtractMinutes: a,
    snapToInterval: U,
    getWeek: y,
    isToday: I,
    isSameDate: le,
    isInRange: t,
    isLeapYear: V,
    getPreviousFirstDayOfWeek: E,
    stringToDate: $,
    dateToMinutes: M,
    countDays: h,
    datesInSameTimeStep: W,
    isValid: s,
    formatDate: w,
    formatDateLite: O,
    formatTime: u,
    formatTimeLite: J,
    formatMinutes: ee
  };
}, Nt = (r) => {
  const { dateUtils: e, config: o } = r;
  let n = 0;
  const d = C(() => {
    var E, $, M, h, W;
    const t = {
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
    }, V = o.events.slice().sort((s, w) => s.start - w.start < 0 ? -1 : 1);
    for (let s of V) {
      const w = typeof s.start == "string" || typeof s.end == "string", O = !((E = s._) != null && E.register) || !s.isOverlapping || !s.delete;
      let u = !1;
      if (!w && (($ = s._) != null && $.cachedStart) && ((M = s._) != null && M.cachedEnd) && (u = s.start.getTime() !== ((h = s._) == null ? void 0 : h.cachedStart) || s.end.getTime() !== ((W = s._) == null ? void 0 : W.cachedEnd)), w || O || u) {
        if (!T(s)) continue;
        S(s), s._.cachedStart = s.start.getTime(), s._.cachedEnd = s.end.getTime();
      }
      if (t.byId[s._.id] = s, s.recurring)
        t.recurring.push(s._.id);
      else if (!e.isSameDate(s.start, new Date(s.end.getTime() - 1)))
        s._.multiday = o.multidayEvents, o.multidayEvents ? t.multiday.push(s._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), s.end = new Date(new Date(s.start).setHours(23, 59, 59, 999)), S(s)), t.byDate[s._.startFormatted] || (t.byDate[s._.startFormatted] = []), t.byDate[s._.startFormatted].push(s._.id);
      else {
        t.byDate[s._.startFormatted] || (t.byDate[s._.startFormatted] = []), t.byDate[s._.startFormatted].push(s._.id);
        const J = s._.startFormatted.substring(0, 4), ee = s._.startFormatted.substring(5, 7), ne = s._.startFormatted.substring(8, 10);
        t.byYear[J] || (t.byYear[J] = {}), t.byYear[J][ee] || (t.byYear[J][ee] = {}), t.byYear[J][ee][ne] || (t.byYear[J][ee][ne] = []), t.byYear[J][ee][ne].push(s._.id);
      }
    }
    return t;
  }), T = (t) => !t.start || !t.end ? (console.error("Vue Cal: Event is missing start or end date", t), !1) : (typeof t.start == "string" && (t.start = e.stringToDate(t.start)), typeof t.end == "string" && (t.end = e.stringToDate(t.end)), t.start.setSeconds(0, 0), t.end.getSeconds() === 59 ? t.end.setMinutes(t.end.getMinutes() + 1, 0, 0) : t.end.setSeconds(0, 0), isNaN(t.start) || isNaN(t.end) || t.end.getTime() < t.start.getTime() ? (isNaN(t.start) ? console.error(`Vue Cal: invalid start date for event "${t.title}".`, t.start) : isNaN(t.end) ? console.error(`Vue Cal: invalid end date for event "${t.title}".`, t.end) : console.error(`Vue Cal: invalid event dates for event "${t.title}". The event ends before it starts.`, t.start, t.end), !1) : !0), S = (t) => {
    t._ || (t._ = {}), t._.id = t._.id || ++n, t._.multiday = !e.isSameDate(t.start, new Date(t.end.getTime() - 1)), t._.startFormatted = e.formatDate(t.start), t._.endFormatted = e.formatDate(t.end), t._.startMinutes = ~~e.dateToMinutes(t.start), t._.endMinutes = ~~e.dateToMinutes(t.end);
    const V = t.start.getHours(), E = t.start.getMinutes().toString().padStart(2, 0), $ = t.end.getHours(), M = t.end.getMinutes().toString().padStart(2, 0);
    t._.startTimeFormatted24 = `${V.toString().padStart(2, 0)}:${E}`, t._.startTimeFormatted12 = `${V % 12 || 12}${E ? `:${E}` : ""} ${V < 12 ? "AM" : "PM"}`, t._.endTimeFormatted24 = `${$.toString().padStart(2, 0)}:${M}`, t._.endTimeFormatted12 = `${$ % 12 || 12}${M ? `:${M}` : ""} ${$ < 12 ? "AM" : "PM"}`, t._.duration = Math.abs(~~((t.end - t.start) / 6e4)), t.delete || (t.delete = function(h) {
      return P(this._.id, h);
    }), t._.deleting === void 0 && (t._.deleting = !1), t._.deleted === void 0 && (t._.deleted = !1), t.isOverlapping || (t.isOverlapping = function(h = null) {
      return this.getOverlappingEvents(h).length;
    }), t.getOverlappingEvents || (t.getOverlappingEvents = function(h = null) {
      var u;
      const W = (h == null ? void 0 : h.start) || this.start, s = (h == null ? void 0 : h.end) || this.end, w = (h == null ? void 0 : h.schedule) !== void 0 && (h == null ? void 0 : h.schedule) !== null ? h.schedule : this.schedule, O = (u = o.schedules) != null && u.length ? w : null;
      return b(W, s, { excludeIds: [this._.id], schedule: O });
    }), t._.register || (t._.register = (h) => {
      t._.$el = h, t._.fireCreated && (r.emit("event-created", t), delete t._.fireCreated);
    }), t._.unregister || (t._.unregister = () => {
      t._.$el = null, t._.register = null, t.isOverlapping = null, t.getOverlappingEvents = null, t.delete = null;
    });
  }, v = (t) => d.value.byId[t], p = (t) => {
    const V = [];
    for (const { start: E, end: $ } of t) {
      const M = b(E, $);
      M.length && V.push(...M);
    }
    return V;
  }, L = (t) => {
    var $;
    if (!t.start || !t.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    o.snapToInterval && (e.snapToInterval(t.start, o.snapToInterval), e.snapToInterval(t.end, o.snapToInterval)), t = { ...t };
    const V = typeof t.start == "string" ? e.stringToDate(t.start) : new Date(t.start), E = typeof t.end == "string" ? e.stringToDate(t.end) : new Date(t.end);
    if (!t.allDay && o.time && (($ = o.specialHoursDisallowed) != null && $.hasAny) && Ye({
      start: V,
      end: E,
      schedule: t.schedule,
      disallowed: o.specialHoursDisallowed,
      hasSchedules: !!(o.schedules && o.schedules.length)
    })) {
      console.warn("Vue Cal: Cannot create an event overlapping a time range where allowEvents is false.");
      return;
    }
    return t.start = V, t.end = E, t._ || (t._ = {}), t._.id = ++n, t._.fireCreated = !0, o.events.push(t), t;
  }, P = async (t, V = 0) => {
    var W, s;
    if (!t) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let E = typeof t == "string" || !isNaN(t) ? t : null;
    const $ = typeof t == "object" ? Object.entries(t) : null;
    if ($) {
      const [w, O] = $[0];
      E = (W = o.events.find((u) => u[w] === O)) == null ? void 0 : W._.id;
    }
    if (!o.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!E) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const M = o.events.findIndex((w) => w._.id === E);
    if (M === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${E}\`.`);
    const h = o.events[M];
    if (h.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${E}\` since it was explicitely set to \`delete: false\`.`);
    switch (V) {
      case 0:
        h._.deleting ? o.events.splice(M, 1) : h._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        h._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        h._.deleted = !0, o.events[M]._.deleted = !0, (s = h._.$el) == null || s.dispatchEvent(new CustomEvent("event-deleted", { detail: h._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        o.events.splice(M, 1), r.emit("update:events", o.events), r.emit("event-delete", h);
        break;
    }
    return !0;
  }, f = (t, V, E) => {
    const $ = o.allDayEvents ? { allDay: E } : {}, M = b(t, V, { background: !1, ...$ });
    if (!M.length) return { cellOverlaps: {}, longestStreak: 0 };
    const h = {};
    let W = [], s = 0;
    M.sort((w, O) => w.start - O.start || w.end - w.start - (O.end - O.start));
    for (const w of M) {
      const O = w._.id;
      h[O] || (h[O] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), W = W.filter((R) => R.end > w.start);
      const u = W.filter((R) => {
        var i;
        return (!((i = o.schedules) != null && i.length) || w.schedule === R.schedule) && R.start < w.end;
      }), J = new Set(u.map((R) => {
        var se;
        return ((se = h[R._.id]) == null ? void 0 : se.position) ?? 0;
      }));
      let ee = 0;
      for (; J.has(ee); ) ee++;
      h[O].position = ee, W.push(w);
      const ne = Math.max(1, ...u.map((R) => {
        var se;
        return ((se = h[R._.id]) == null ? void 0 : se.maxConcurrent) ?? 1;
      }));
      h[O].maxConcurrent = Math.max(u.length + 1, ne);
      for (const R of u)
        h[R._.id].overlaps.add(O), h[O].overlaps.add(R._.id), h[R._.id].maxConcurrent = h[O].maxConcurrent;
      s = Math.max(s, h[O].maxConcurrent);
    }
    for (const w in h) h[w].overlaps = [...h[w].overlaps];
    return { cellOverlaps: h, longestStreak: s };
  }, b = (t, V, { excludeIds: E = [], schedule: $ = null, background: M = !0, allDay: h = !1 } = {}) => {
    const { byId: W, byYear: s } = d.value, w = Object.keys(W).length;
    if (!w) return [];
    const O = t.getFullYear(), u = V.getFullYear(), J = t.getMonth() + 1, ee = V.getMonth() + 1, ne = t.getDate(), R = V.getDate(), se = new Date(t).setHours(0, 0, 0, 0), i = new Date(V).setHours(23, 59, 59, 999), Y = new Set(E), _ = [];
    if (w <= 100) {
      for (const x of Object.values(W))
        !x || Y.has(x._.id) || $ !== null && $ !== x.schedule || M === !1 && x.background || o.allDayEvents && (h && !x.allDay || !h && x.allDay) || x.start.getTime() < i && x.end.getTime() > se && _.push(x);
      return _;
    }
    for (let x = O; x <= u; x++) {
      const ae = `${x}`, me = s[ae];
      if (!me) continue;
      const ce = x === O ? J : 1, Ve = x === u ? ee : 12;
      for (let ge = ce; ge <= Ve; ge++) {
        const m = String(ge).padStart(2, "0"), A = me[m];
        if (A)
          for (const j in A) {
            const q = +j;
            if (x === O && ge === J && q < ne || x === u && ge === ee && q > R) continue;
            const K = A[j];
            if (K != null && K.length)
              for (let X = 0; X < K.length; X++) {
                const c = W[K[X]];
                !c || Y.has(c._.id) || $ !== null && $ !== c.schedule || M === !1 && c.background || o.allDayEvents && (h && !c.allDay || !h && c.allDay) || c.start.getTime() < i && c.end.getTime() > se && _.push(c);
              }
          }
      }
    }
    return _;
  }, H = (t, V, E) => {
    const $ = t.allDay || !o.time, M = $ ? new Date(t.start).setHours(0, 0, 0, 0) : t.start.getTime(), h = $ ? new Date(t.end).setHours(23, 59, 59, 999) : t.end.getTime(), W = $ ? new Date(V).setHours(0, 0, 0, 0) : V.getTime(), s = $ ? new Date(E).setHours(23, 59, 59, 999) : E.getTime();
    return h > W && M < s;
  }, l = $e({
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
    resizeBaselineEndMs: null,
    cellEl: null,
    schedule: null,
    resizeAnchorClientX: 0,
    resizeAnchorClientY: 0,
    resizeSlopExceeded: !1
  }), D = (t, V) => {
    var W;
    const E = l[o.horizontal ? "movePercentageX" : "movePercentageY"];
    let $ = Se(E, o);
    if ($ = Math.max(0, Math.min($, 1440)), o.snapToInterval) {
      const s = $ + o.snapToInterval / 2;
      $ = s - s % o.snapToInterval;
    }
    let M = t.start, h = new Date(V.getTime() + $ * 6e4);
    return l.moveX && ((W = r.touch) != null && W.currentHoveredCell) && l.cellEl && new Date(parseInt(r.touch.currentHoveredCell.dataset.start)), h < l.resizeStartDate && (M = h, h = l.resizeStartDate), { newStart: M, newEnd: h };
  }, g = 4, a = (t, V) => {
    if (!l.cellEl) return;
    const { top: E, left: $, width: M, height: h } = l.cellEl.getBoundingClientRect();
    l.moveX = t - $, l.moveY = V - E, l.movePercentageX = l.moveX * 100 / M, l.movePercentageY = l.moveY * 100 / h, l.documentMouseX = t, l.documentMouseY = V;
  }, U = (t, V) => {
    var s, w;
    const E = new Date(t.start), $ = new Date(t.end);
    let { newStart: M, newEnd: h } = D(t, V);
    if (o.time && !t.allDay && ((s = o.specialHoursDisallowed) != null && s.hasAny)) {
      const O = Xt({
        proposedStart: M,
        proposedEnd: h,
        prevStart: E,
        prevEnd: $,
        schedule: t.schedule,
        disallowed: o.specialHoursDisallowed,
        hasSchedules: !!(o.schedules && o.schedules.length)
      });
      M = O.start, h = O.end;
    }
    const W = !o.time || t.allDay || !((w = o.specialHoursDisallowed) != null && w.hasAny) || !Ye({
      start: M,
      end: h,
      schedule: t.schedule,
      disallowed: o.specialHoursDisallowed,
      hasSchedules: !!(o.schedules && o.schedules.length)
    });
    return { newStart: M, newEnd: h, internalOk: W };
  }, y = async (t) => {
    var h, W, s, w;
    const { clientX: V, clientY: E } = ((h = t.touches) == null ? void 0 : h[0]) || t, $ = V - l.resizeAnchorClientX, M = E - l.resizeAnchorClientY;
    if (!l.resizeSlopExceeded) {
      if ($ * $ + M * M <= g) return;
      l.resizeSlopExceeded = !0;
    }
    if (a(V, E), l.fromResizer && !l.resizingOriginalEvent) {
      l.resizingOriginalEvent = { ...l.resizingEvent, _: { ...l.resizingEvent._ } };
      const O = ((W = o.eventListeners) == null ? void 0 : W.event) || {};
      (s = O["resize-start"]) == null || s.call(O, { e: t, event: l.resizingEvent });
    }
    if (l.fromResizer && l.resizingEvent) {
      const O = new Date(parseInt(l.cellEl.dataset.start)), { newStart: u, newEnd: J, internalOk: ee } = U(l.resizingEvent, O);
      let ne = ee;
      const { resize: R } = ((w = o.eventListeners) == null ? void 0 : w.event) || {};
      ee && R && (ne = await R({
        e: t,
        event: { ...l.resizingEvent, start: u, end: J },
        overlaps: l.resizingEvent.getOverlappingEvents({ start: u, end: J })
      })), ne !== !1 ? (l.resizingEvent.start = u, l.resizingEvent.end = J, l.resizingLastAcceptedEvent && (l.resizingLastAcceptedEvent = null), t.preventDefault()) : R && (l.resizingLastAcceptedEvent = { ...l.resizingEvent, _: { ...l.resizingEvent._ } });
    }
  }, I = async (t) => {
    var V, E, $, M, h;
    if ((V = r.touch) != null && V.isResizingEvent && l.resizingEvent) {
      const { clientX: W, clientY: s } = ((E = t.changedTouches) == null ? void 0 : E[0]) || t;
      if (!l.resizeSlopExceeded)
        l.resizingEvent.start = new Date(l.resizeStartDate), l.resizingEvent.end = new Date(l.resizeBaselineEndMs);
      else {
        a(W, s);
        const w = new Date(parseInt(l.cellEl.dataset.start)), { newStart: O, newEnd: u, internalOk: J } = U(l.resizingEvent, w);
        let ee = J;
        const R = ((($ = o.eventListeners) == null ? void 0 : $.event) || {})["resize-end"];
        J && R && (ee = await R({
          e: t,
          event: l.resizingEvent,
          original: l.resizingOriginalEvent,
          // Original event details before resizing.
          overlaps: l.resizingEvent.getOverlappingEvents({ start: O, end: u })
        })), l.resizingEvent.start = ee === !1 ? (l.resizingLastAcceptedEvent || l.resizingOriginalEvent).start : ((M = l.resizingLastAcceptedEvent) == null ? void 0 : M.start) || O, l.resizingEvent.end = ee === !1 ? (l.resizingLastAcceptedEvent || l.resizingOriginalEvent).end : ((h = l.resizingLastAcceptedEvent) == null ? void 0 : h.end) || u, l.resizingEvent._.duration < 1 && l.resizingOriginalEvent && (l.resizingEvent.start = l.resizingOriginalEvent.start, l.resizingEvent.end = l.resizingOriginalEvent.end);
      }
      r.touch.isResizingEvent = !1, r.touch.currentHoveredCell = null;
    }
    document.removeEventListener(t.type === "touchend" ? "touchmove" : "mousemove", y, { passive: !l.fromResizer }), r.touch.isResizingEvent = !1, l.fromResizer = !1, l.resizingEvent = null, l.resizingOriginalEvent = null, l.resizingLastAcceptedEvent = null, l.startX = 0, l.startY = 0, l.moveX = 0, l.moveY = 0, l.startPercentageX = 0, l.startPercentageY = 0, l.movePercentageX = 0, l.movePercentageY = 0, l.documentMouseX = 0, l.documentMouseY = 0, l.cellEl = null, l.resizeStartDate = null, l.resizeBaselineEndMs = null, l.schedule = null, l.resizeAnchorClientX = 0, l.resizeAnchorClientY = 0, l.resizeSlopExceeded = !1;
  };
  return {
    events: d,
    resizeState: l,
    getEvent: v,
    getViewEvents: p,
    getCellOverlappingEvents: f,
    getEventsInRange: b,
    createEvent: L,
    deleteEvent: P,
    isEventInRange: H,
    handleEventResize: (t, V, E) => {
      var M;
      const $ = ((M = t.touches) == null ? void 0 : M[0]) || t;
      if (l.fromResizer = !!$.target.closest(".vuecal__event-resizer"), l.fromResizer) {
        r.touch.isResizingEvent = !0;
        const h = E.getBoundingClientRect();
        l.startX = $.clientX - h.left, l.startY = $.clientY - h.top, l.startPercentageX = l.startX * 100 / h.width, l.startPercentageY = l.startY * 100 / h.height, l.cellEl = E.closest(".vuecal__cell"), l.resizeStartDate = new Date(V.start.getTime()), l.resizeBaselineEndMs = V.end.getTime(), l.resizingEvent = V, l.resizeAnchorClientX = $.clientX, l.resizeAnchorClientY = $.clientY, l.resizeSlopExceeded = !1, document.addEventListener(t.type === "touchstart" ? "touchmove" : "mousemove", y, { passive: !l.fromResizer }), document.addEventListener(t.type === "touchstart" ? "touchend" : "mouseup", I, { once: !0 });
      }
    }
  };
}, Wt = ({ config: r, dateUtils: e, emit: o, texts: n, eventsManager: d }, T) => {
  const { availableViews: S } = r, v = de(r.view && S[r.view] ? r.view : r.defaultView), p = de(r.selectedDate || null), L = de(/* @__PURE__ */ new Date()), P = de(new Date(r.viewDate || L.value));
  P.value.setHours(0, 0, 0, 0);
  const f = de(new Date(P));
  let b = null;
  const H = C(() => v.value === "month" ? f.value : E.value), l = C(() => v.value === "month" ? new Date(f.value.getFullYear(), f.value.getMonth() + 1, 0, 23, 59, 59, 999) : M.value), D = C(() => v.value === "week" ? e.getPreviousFirstDayOfWeek(E.value, r.startWeekOnSunday) : v.value === "month" ? E.value : H.value), g = C(() => {
    if (v.value === "week") {
      const c = e.addDays(D.value, 7);
      return c.setMilliseconds(-1), c;
    }
    return v.value === "month" ? M.value : l.value;
  }), a = C(() => {
    const c = L.value.getTime();
    if (v.value === "week")
      return D.value.getTime() <= c && c <= g.value.getTime();
    const z = E.value.getTime(), B = M.value.getTime();
    return z <= c && c <= B;
  }), U = $e({
    show: C(() => {
      if (["day", "days", "week"].includes(v.value) && !(!a.value || !r.time || r.allDay) && !(r.timeFrom > e.dateToMinutes(L.value)) && !(e.dateToMinutes(L.value) > r.timeTo))
        return !0;
    }),
    nowInMinutes: C(() => e.dateToMinutes(L.value)),
    todaysTimePosition: C(() => Oe(U.nowInMinutes, r)),
    style: C(() => `${r.horizontal ? "left" : "top"}: ${U.todaysTimePosition}%`),
    currentTime: C(() => e.formatTime(L.value, r.twelveHour ? "h:mm {am}" : "HH:mm"))
  });
  function y() {
    L.value = /* @__PURE__ */ new Date(), b = setTimeout(y, 60 * 1e3);
  }
  function I() {
    b = setTimeout(y, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), y();
  }
  const le = C(() => {
    if (!r.availableViews[v.value]) return 1;
    let c = r.availableViews[v.value].cols;
    return r.hasHiddenDays && ["week", "month"].includes(v.value) && (c -= r.hasHiddenDays), c;
  }), t = C(() => {
    var c;
    return ((c = r.availableViews[v.value]) == null ? void 0 : c.rows) || 1;
  }), V = C(() => le.value * t.value), E = C(() => {
    if (v.value === "month") {
      let c = f.value.getDay() || 7;
      return r.startWeekOnSunday && !r.hideWeekdays[7] && (c += 1), r.viewDayOffset && (c -= r.viewDayOffset), e.subtractDays(f.value, c - 1);
    }
    if (v.value === "week") {
      const c = "1234567".split("").filter((B) => !Object.keys(r.hideWeekdays).includes(B));
      let z = Math.min(...c);
      return r.startWeekOnSunday && !r.hideWeekdays[7] && (z = 1), r.viewDayOffset && (z += r.viewDayOffset), e.addDays(f.value, z - 1);
    }
    return f.value;
  }), $ = C(() => {
    const c = [], z = ["days", "week", "month"].includes(v.value);
    let B = 0;
    for (let Z = 0; Z < V.value + B; Z++)
      switch (v.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const re = e.addDays(E.value, Z), je = re.getDay() || 7;
          if (z && r.hasHiddenDays && r.hideWeekdays[je]) {
            B++;
            continue;
          }
          const Me = new Date(re);
          Me.setHours(23, 59, 59, 999), c.push({ start: re, startFormatted: e.formatDate(re), end: Me });
          break;
        }
        case "year":
          c.push({
            start: new Date(E.value.getFullYear(), Z, 1, 0, 0, 0, 0),
            end: new Date(E.value.getFullYear(), Z + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          c.push({
            start: new Date(E.value.getFullYear() + Z, 0, 1, 0, 0, 0, 0),
            end: new Date(E.value.getFullYear() + Z + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return c;
  }), M = C(() => $.value[$.value.length - 1].end), h = de("right"), W = C(() => {
    const c = Object.keys(r.availableViews);
    return c[c.indexOf(v.value) + 1];
  }), s = C(() => {
    const c = Object.keys(r.availableViews);
    return c[c.indexOf(v.value) - 1];
  });
  function w(c, z, B = !1) {
    if (!z || !z[c]) return c + 1;
    const Z = z[c];
    return B && typeof Z == "string" ? Z.substring(0, 3) : Z;
  }
  function O(c, z, B) {
    const { monthsArray: Z, monthBeforeDay: re, canTruncate: je, xs: Me } = B, _e = c.getMonth(), ze = c.getFullYear(), Ce = z.getMonth(), Fe = z.getFullYear(), Ie = _e !== Ce, zt = ze !== Fe, Ee = je && (Me || Ie), Re = c.getDate(), Xe = z.getDate();
    return zt ? re ? `${w(_e, Z, Ee)} ${Re}, ${ze} - ${w(Ce, Z, Ee)} ${Xe}, ${Fe}` : `${Re} ${w(_e, Z, Ee)} ${ze} - ${Xe} ${w(Ce, Z, Ee)} ${Fe}` : Ie ? re ? `${w(_e, Z, Ee)} ${Re} - ${w(Ce, Z, Ee)} ${Xe}, ${ze}` : `${Re} ${w(_e, Z, Ee)} - ${Xe} ${w(Ce, Z, Ee)} ${ze}` : re ? `${w(_e, Z, Ee)} ${Re}-${Xe}, ${ze}` : `${Re}-${Xe} ${w(_e, Z, Ee)} ${ze}`;
  }
  const u = C(() => {
    const { dateFormat: c, months: z, monthsGenitive: B, week: Z, truncations: re } = n, je = r.locale, Me = re !== !1, _e = c.indexOf("M") < c.indexOf("D"), ze = B && je === "el" ? B : z;
    switch (v.value) {
      case "day":
        return e.formatDate(E.value, c);
      case "days":
      case "week": {
        const Ce = {
          monthsArray: ze,
          monthBeforeDay: _e,
          canTruncate: Me,
          xs: r.xs
        };
        let Fe = O(E.value, M.value, Ce);
        if (v.value === "week") {
          const Ie = e.getWeek(
            E.value,
            r.startWeekOnSunday && !r.hideWeekdays[7]
          );
          Fe += ` <small>${Z} ${Ie}</small>`;
        }
        return Fe;
      }
      case "month": {
        const Ce = `${r.xs && Me ? "MMM" : "MMMM"} YYYY`;
        return e.formatDate(H.value, Ce);
      }
      case "year":
        return E.value.getFullYear();
      case "years":
        return `${E.value.getFullYear()} - ${l.value.getFullYear()}`;
    }
  });
  async function J() {
    switch (f.value = new Date(P.value || L.value), f.value.setHours(0, 0, 0, 0), v.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        f.value = e.getPreviousFirstDayOfWeek(f.value, r.startWeekOnSunday && !r.hideWeekdays[7]);
        break;
      case "month":
        f.value = new Date(f.value.getFullYear(), f.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        f.value = new Date(f.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        f.value = new Date(f.value.getFullYear() - f.value.getFullYear() % V.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    L.value = /* @__PURE__ */ new Date(), r.ready && (await qe(), o("view-change", {
      id: v.value,
      title: u.value,
      start: H.value,
      end: l.value,
      extendedStart: D.value,
      extendedEnd: g.value,
      cellDates: $.value,
      containsToday: a.value,
      events: q.value
    }));
  }
  function ee(c) {
    const z = v.value, B = r.availableViews[z];
    c[z] && JSON.stringify(c[z]) === JSON.stringify(B) || J();
  }
  function ne(c, z = !0, B = null) {
    const Z = Object.keys(r.availableViews);
    v.value === c && !B || (Z.includes(c) ? (h.value = Z.indexOf(c) < Z.indexOf(v.value) ? "left" : "right", z && v.value !== c && o("update:view", c), v.value = c, B ? ae(B) : J()) : console.warn(`Vue Cal: the \`${c}\` view is not available.`));
  }
  function R() {
    W.value ? ne(W.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function se() {
    s.value ? ne(s.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function i() {
    _(!1);
  }
  function Y() {
    _(!0);
  }
  function _(c = !0) {
    let z = new Date(P.value);
    switch (v.value) {
      case "day":
      case "days":
        c ? z = e.addDays(M.value, 1) : z = e.subtractDays(E.value, V.value);
        break;
      case "week": {
        c ? (z = e.addDays(E.value, 7), z.setHours(0, 0, 0, 0)) : z = e.subtractDays(D.value, V.value);
        break;
      }
      case "month": {
        const B = c ? 1 : -1;
        z = new Date(z.getFullYear(), z.getMonth() + B, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const B = c ? 1 : -1;
        z = new Date(z.getFullYear() + B, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const B = c ? V.value : -V.value;
        z = new Date(z.getFullYear() + B, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    ae(z);
  }
  function x() {
    const c = /* @__PURE__ */ new Date();
    c.setHours(0, 0, 0, 0), ae(c);
  }
  function ae(c, z = !0, B = !1) {
    if (!e.isValid(c)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [Z, re] = [E.value, M.value];
    v.value === "month" && ([Z, re] = [H.value, l.value]), c.setHours(0, 0, 0, 0), P.value = c, z && o("update:viewDate", c), (!e.isInRange(c, Z, re) || B) && (h.value = c.getTime() < Z.getTime() ? "left" : "right", J());
  }
  function me(c, z = !0) {
    if (!e.isValid(c)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: B, isSameDate: Z } = e;
    (!p.value || !B(p.value) || !Z(c, p.value)) && (c.setHours(0, 0, 0, 0), p.value = c, z && o("update:selectedDate", c));
  }
  function ce(c) {
    !c && !f.value.getDay() ? ae(e.addDays(f.value, 1), !0, !0) : (h.value = "left", J());
  }
  function Ve(c) {
    c && r.startWeekOnSunday && !f.value.getDay() ? ae(e.addDays(f.value, 1), !0, !0) : !c && r.startWeekOnSunday && f.value.getDay() === 1 && ae(e.subtractDays(f.value, 1), !0, !0);
  }
  function ge() {
    J();
  }
  function m(c) {
    var re;
    const z = (re = T.value) == null ? void 0 : re.querySelector(".vuecal__scrollable"), B = c - r.timeFrom, Z = B > 0 ? B * r.timeCellHeight / r.timeStep : 0;
    z == null || z.scrollTo({ top: Z, behavior: "smooth" });
  }
  function A() {
    const c = /* @__PURE__ */ new Date();
    m(c.getHours() * 60 + c.getMinutes());
  }
  function j() {
    m(0);
  }
  const q = C(() => d.getViewEvents($.value)), K = d.createEvent, X = d.deleteEvent;
  return pe(() => r.view, (c) => ne(c, !1)), pe(() => r.availableViews, ee), pe(() => r.datePicker, () => ne("month")), pe(() => r.viewDate, (c) => ae(c, !1)), pe(() => r.selectedDate, (c) => me(c, !1)), pe(() => r.startWeekOnSunday, (c) => ce(c)), pe(() => r.hideWeekends, (c) => Ve(c)), pe(() => r.hideWeekdays, ge), pe(() => V.value, () => {
    V.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), pe(() => r.watchRealTime, (c) => {
    c && r.time ? I() : b = clearTimeout(b);
  }), J(), r.time && r.watchRealTime && I(), We(() => b = clearTimeout(b)), {
    now: L,
    id: v,
    broaderView: W,
    narrowerView: s,
    title: u,
    viewDate: P,
    start: H,
    end: l,
    extendedStart: D,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: g,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: E,
    lastCellDate: M,
    containsToday: a,
    nowLine: U,
    selectedDate: p,
    cellDates: $,
    cols: le,
    rows: t,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: q,
    transitionDirection: h,
    switch: (c, z) => ne(c, !0, z),
    broader: R,
    narrower: se,
    previous: i,
    next: Y,
    navigate: _,
    goToToday: x,
    updateViewDate: ae,
    updateSelectedDate: me,
    scrollToCurrentTime: A,
    scrollToTime: m,
    scrollTop: j,
    createEvent: K,
    deleteEvent: X,
    // Getters.
    get isDay() {
      return v.value === "day";
    },
    get isDays() {
      return v.value === "days";
    },
    get isWeek() {
      return v.value === "week";
    },
    get isMonth() {
      return v.value === "month";
    },
    get isYear() {
      return v.value === "year";
    },
    get isYears() {
      return v.value === "years";
    }
  };
}, ft = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], mt = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ht = "Years", gt = "Year", yt = "Month", Dt = "Week", pt = "Days", wt = "Day", bt = "Today", _t = "No Event", kt = "All-day", Tt = "Delete", $t = "Create an event", Mt = "dddd, MMMM D, YYYY", Et = "am", St = "pm", at = {
  weekDays: ft,
  months: mt,
  years: ht,
  year: gt,
  month: yt,
  week: Dt,
  days: pt,
  day: wt,
  today: bt,
  noEvent: _t,
  allDay: kt,
  deleteEvent: Tt,
  createEvent: $t,
  dateFormat: Mt,
  am: Et,
  pm: St
}, It = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allDay: kt,
  am: Et,
  createEvent: $t,
  dateFormat: Mt,
  day: wt,
  days: pt,
  default: at,
  deleteEvent: Tt,
  month: yt,
  months: mt,
  noEvent: _t,
  pm: St,
  today: bt,
  week: Dt,
  weekDays: ft,
  year: gt,
  years: ht
}, Symbol.toStringTag, { value: "Module" })), Be = $e({
  texts: { ...ye.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: vt(ye.texts, at)
  // Some Date utils functions need localized texts.
}), Gt = ({ props: r, emit: e, attrs: o, vuecalEl: n, uid: d }) => {
  const T = $e({
    uid: d,
    // The Vuecal instance unique ID, used for dnd source-target identification.
    emit: e,
    texts: { ...Be.texts },
    // Make texts reactive before a locale is loaded.
    // The date utils composable.
    // A class/composable is needed in order to access the user locale in all the methods, and
    // independently of other potential Vue Cal instances on the same page.
    dateUtils: { ...Be.dateUtils },
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
  return T.dateUtils = vt(Object.assign(ye.texts, T.texts), at), T.config = Ft(T, r, o), T.eventsManager = Nt(T), T.view = Wt(T, n), T.dnd = Bt(T), T;
}, qt = 1440, Jt = {
  allDayEvents: { type: Boolean, default: !1 },
  // Display all-day events in a fixed top bar on the day, days & week views.
  stackEvents: { type: Boolean, default: !1 },
  // Alias for specialHours when specialHours is empty; same shape. Kept as separate prop for clearer naming (e.g. business hours).
  businessHours: { type: Object, default: () => ({}) },
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
  // Highlight special time ranges per weekday, with optional schedule-specific overrides.
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
  timeTo: { type: Number, default: qt },
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
}, Zt = { class: "vuecal__header" }, Ut = {
  key: 0,
  class: "vuecal__views-bar"
}, Kt = ["onClick", "innerHTML"], Qt = {
  key: 1,
  class: "vuecal__title-bar"
}, xt = { class: "vuecal__transition-wrap" }, en = ["disabled", "innerHTML"], tn = {
  __name: "header",
  setup(r) {
    const e = Le("vuecal"), { view: o, config: n } = e, d = () => {
      n.clickToNavigate && o.broader();
    }, T = C(() => n.clickToNavigate ? { click: d } : {});
    return (S, v) => (F(), G("div", Zt, [
      N(S.$slots, "header", {
        view: k(o),
        availableViews: k(n).availableViews,
        vuecal: k(e)
      }),
      S.$slots.header ? te("", !0) : (F(), G(fe, { key: 0 }, [
        k(n).viewsBar ? (F(), G("div", Ut, [
          (F(!0), G(fe, null, be(k(n).availableViews, (p, L) => (F(), G("button", {
            class: De(["vuecal__view-button", { "vuecal__view-button--active": k(o).id === L }]),
            onClick: (P) => k(o).switch(L),
            innerHTML: k(e).texts[L],
            type: "button"
          }, null, 10, Kt))), 256))
        ])) : te("", !0),
        k(n).titleBar ? (F(), G("nav", Qt, [
          he("button", {
            class: De(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !S.$slots["previous-button"] }]),
            onClick: v[0] || (v[0] = (...p) => k(o).previous && k(o).previous(...p)),
            type: "button"
          }, [
            N(S.$slots, "previous-button")
          ], 2),
          he("div", xt, [
            Pe(Ue, {
              name: `vuecal-slide-fade--${k(o).transitionDirection}`
            }, {
              default: Q(() => [
                (F(), G("div", {
                  key: k(o).id + k(o).start.getTime()
                }, [
                  S.$slots.title || S.$slots[`title.${k(o).id}`] ? (F(), He(st(k(n).clickToNavigate && k(o).broaderView ? "button" : "div"), ue({
                    key: 0,
                    class: "vuecal__title"
                  }, Je(T.value)), {
                    default: Q(() => [
                      S.$slots[`title.${k(o).id}`] ? N(S.$slots, `title.${k(o).id}`, oe(ue({ key: 0 }, k(o)))) : N(S.$slots, "title", oe(ue({ key: 1 }, k(o))))
                    ]),
                    _: 3
                  }, 16)) : (F(), He(st(k(n).clickToNavigate && k(o).broaderView ? "button" : "div"), ue({
                    key: 1,
                    class: "vuecal__title"
                  }, Je(T.value), {
                    innerHTML: k(o).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          k(n).todayButton ? (F(), G(fe, { key: 0 }, [
            S.$slots["today-button"] ? N(S.$slots, "today-button", {
              key: 0,
              navigate: () => !k(o).containsToday && k(o).goToToday(),
              active: k(o).containsToday
            }) : (F(), G("button", {
              key: 1,
              class: De(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": k(o).containsToday }]),
              onClick: v[1] || (v[1] = (p) => !k(o).containsToday && k(o).goToToday()),
              disabled: !!k(o).containsToday,
              type: "button",
              innerHTML: k(e).texts.today
            }, null, 10, en))
          ], 64)) : te("", !0),
          he("button", {
            class: De(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !S.$slots["next-button"] }]),
            onClick: v[2] || (v[2] = (...p) => k(o).next && k(o).next(...p)),
            type: "button"
          }, [
            N(S.$slots, "next-button")
          ], 2)
        ])) : te("", !0)
      ], 64))
    ]));
  }
}, nn = ["draggable"], an = { class: "vuecal__event-details" }, sn = { class: "vuecal__event-title" }, ln = {
  key: 0,
  class: "vuecal__event-time"
}, rn = {
  key: 0,
  class: "vuecal__event-comma"
}, on = { class: "vuecal__event-start" }, un = {
  key: 1,
  class: "vuecal__event-end"
}, cn = { key: 0 }, dn = ["innerHTML"], vn = 16, ut = {
  __name: "event",
  props: {
    event: { type: Object, required: !0 },
    inAllDayBar: { type: Boolean, default: !1 },
    cellStart: { type: Date, required: !0 },
    cellEnd: { type: Date, required: !0 }
  },
  emits: ["event-drag-start", "event-drag-end", "event-resize-start", "event-resize-end"],
  setup(r, { emit: e }) {
    const o = r, { config: n, view: d, dnd: T, touch: S, dateUtils: v, eventsManager: p } = Le("vuecal"), { handleEventResize: L } = p, P = de(null), f = $e(o.event);
    let b = null;
    const H = $e({
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
    }), l = C(() => n.editableEvents.drag && f.draggable !== !1 && !f.background && H.canTouchAndDrag !== !1), D = C(() => d.isMonth || d.isYear || d.isYears || o.inAllDayBar || f._.multiday && !U.value ? !1 : n.time && n.editableEvents.resize && f.resizable !== !1 && !f.background);
    C(() => n.editableEvents.delete && f.deletable !== !1 && !f.background);
    const g = C(() => {
      var s, w, O, u, J;
      const $ = !!((s = f._) != null && s.multiday), M = n.horizontal, h = !o.inAllDayBar && (((w = f._) == null ? void 0 : w.startMinutes) < n.timeFrom || $ && !a.value), W = !o.inAllDayBar && (((O = f._) == null ? void 0 : O.endMinutes) > n.timeTo || $ && !U.value);
      return {
        [`vuecal__event--${f._.id}`]: !0,
        [f.class]: !!f.class,
        "vuecal__event--recurring": !!f.recurring,
        "vuecal__event--background": !!f.background,
        "vuecal__event--all-day": f.allDay || ((u = f._) == null ? void 0 : u.startMinutes) === 0 && ((J = f._) == null ? void 0 : J.duration) === 1440,
        "vuecal__event--multiday": $,
        // In horizontal mode, cut-top becomes cut-left and cut-bottom becomes cut-right.
        "vuecal__event--cut-top": !M && h,
        "vuecal__event--cut-bottom": !M && W,
        "vuecal__event--cut-left": M && h,
        "vuecal__event--cut-right": M && W,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !f._.draggingGhost && f._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": f._.draggingGhost,
        "vuecal__event--resizing": S.isResizingEvent
      };
    }), a = C(() => f._.multiday ? new Date(f.start).setHours(0, 0, 0, 0) === o.cellStart.getTime() : !0), U = C(() => f._.multiday ? v.isSameDate(new Date(new Date(f.end).setMilliseconds(-1)), o.cellEnd) : !0), y = C(() => {
      const $ = new Date(f.start).setHours(0, 0, 0, 0), M = new Date(f.end).setHours(0, 0, 0, 0);
      return Math.ceil((M - $) / (1e3 * 60 * 60 * 24));
    }), I = C(() => {
      const $ = (d.isDay || d.isDays || d.isWeek) && n.time && !o.inAllDayBar, M = n.horizontal;
      if (!$ && !f.backgroundColor && !f.color) return !1;
      const h = {
        backgroundColor: f.backgroundColor || null,
        color: f.color || null
      };
      if ($) {
        let W = f._.startMinutes, s = f._.endMinutes;
        f._.multiday && (a.value || (W = 0), U.value || (s = 1440));
        const w = Math.max(n.timeFrom, W), O = Math.min(n.timeTo, s) + (f._.duration && !s ? 1440 : 0), u = Oe(w, n), J = Oe(O, n) - u;
        h[M ? "left" : "top"] = `${u}%`, h[M ? "width" : "height"] = `${J}%`;
      }
      return h;
    }), le = C(() => {
      const $ = { ...n.eventListeners.event };
      for (const [h, W] of Object.entries($))
        ["resize-end"].includes(h) || ($[h] = (s) => {
          s.type !== "drop" && W(s.type ? { e: s, event: f } : s);
        });
      const M = { ...$ };
      return $.touchstart = (h) => {
        var W;
        h.stopPropagation(), H.touchAndDragTimer = setTimeout(() => {
          H.canTouchAndDrag = !0;
        }, 500), E(h), (W = M.touchstart) == null || W.call(M, { e: h, event: f });
      }, $.mousedown = (h) => {
        var W;
        h.stopPropagation(), E(h), (W = M.mousedown) == null || W.call(M, { e: h, event: f });
      }, $.click = (h) => {
        var W;
        (W = M.click) == null || W.call(M, { e: h, event: f }), b ? b = clearTimeout(b) : b = setTimeout(() => {
          var s;
          b = null, (s = M["delayed-click"]) == null || s.call(M, { e: h, event: f });
        }, 400);
      }, $.dblclick = (h) => {
        M.dblclick ? M.dblclick({ e: h, event: f }) : f.delete(1);
      }, $;
    });
    let t = null, V = 0;
    const E = ($) => {
      var s, w, O, u;
      const M = ((s = $.touches) == null ? void 0 : s[0]) || $;
      H.fromResizer = (w = M.target) == null ? void 0 : w.closest(".vuecal__event-resizer");
      const h = Date.now();
      (!t || h - V > vn) && (t = P.value.getBoundingClientRect(), V = h);
      const W = t;
      H.startX = (((O = $.touches) == null ? void 0 : O[0]) || $).clientX - W.left, H.startY = (((u = $.touches) == null ? void 0 : u[0]) || $).clientY - W.top, H.startPercentageX = H.startX * 100 / W.width, H.startPercentageY = H.startY * 100 / W.height, H.cellEl = P.value.closest(".vuecal__cell"), H.resizeStartDate = f.start, H.fromResizer && L($, f, P.value), H.holdTimer = setTimeout(() => {
        var J, ee;
        H.holding = !0, (ee = (J = le.value).hold) == null || ee.call(J, { e: $, event: f });
      }, 1e3);
    };
    return tt(() => f._.register(P.value)), We(() => {
      H.holdTimer && (H.holdTimer = clearTimeout(H.holdTimer)), H.touchAndDragTimer && (H.touchAndDragTimer = clearTimeout(H.touchAndDragTimer)), b && (b = clearTimeout(b)), f._.unregister();
    }), ($, M) => (F(), G("div", ue({ class: "vuecal__event" }, Je(le.value, !0), {
      ref_key: "eventEl",
      ref: P,
      class: g.value,
      style: I.value,
      draggable: l.value ? "true" : void 0,
      onDragstart: M[2] || (M[2] = (h) => l.value && k(T).eventDragStart(h, f)),
      onDragend: M[3] || (M[3] = (h) => l.value && k(T).eventDragEnd(h, f))
    }), [
      he("div", an, [
        $.$slots["event.all-day"] ? N($.$slots, "event.all-day", {
          key: 0,
          event: f
        }) : $.$slots[`event.${k(d).id}`] ? N($.$slots, `event.${k(d).id}`, {
          key: 1,
          event: f
        }) : N($.$slots, "event", {
          key: 2,
          event: f
        }, () => [
          he("div", sn, ve(f.title), 1),
          k(n).time && !r.inAllDayBar && !(f._.multiday && !a.value) ? (F(), G("div", ln, [
            k(d).isMonth ? (F(), G("span", rn, ",")) : te("", !0),
            he("span", on, ve(f._[`startTimeFormatted${k(n).twelveHour ? 12 : 24}`]), 1),
            k(d).isMonth ? te("", !0) : (F(), G("span", un, [
              Ze(" - " + ve(f._[`endTimeFormatted${k(n).twelveHour ? 12 : 24}`]), 1),
              f._.multiday && a.value ? (F(), G("span", cn, "+" + ve(y.value) + "d", 1)) : te("", !0)
            ]))
          ])) : te("", !0),
          r.inAllDayBar ? te("", !0) : (F(), G("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: f.content
          }, null, 8, dn))
        ])
      ]),
      D.value ? (F(), G("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: M[0] || (M[0] = lt(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : te("", !0),
      Pe(Ue, { name: "vuecal-delete-btn" }, {
        default: Q(() => [
          f._.deleting ? (F(), G("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: M[1] || (M[1] = lt((h) => f.delete(3), ["stop"]))
          }, "Delete")) : te("", !0)
        ]),
        _: 1
      })
    ], 16, nn));
  }
}, fn = ["data-start"], mn = ["innerHTML"], hn = ["data-schedule"], gn = ["innerHTML"], yn = {
  key: 1,
  class: "vuecal__cell-date"
}, Dn = {
  key: 2,
  class: "vuecal__cell-content"
}, pn = {
  key: 3,
  class: "vuecal__cell-events"
}, wn = {
  key: 0,
  class: "vuecal__cell-date"
}, bn = {
  key: 1,
  class: "vuecal__cell-content"
}, _n = {
  key: 2,
  class: "vuecal__cell-events"
}, kn = {
  key: 5,
  class: "vuecal__cell-events-count"
}, Tn = ["title"], Yt = {
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
  setup(r) {
    const e = r, o = Le("vuecal"), { view: n, config: d, dateUtils: T, eventsManager: S, dnd: v, touch: p } = o, L = C(() => T.isToday(e.start)), P = de(null), f = de([]), b = de(!1), H = (m) => {
      f.value.push(m.detail), b.value = !0;
    }, l = () => setTimeout(() => b.value = !1, 300), D = $e({
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
    }), g = de(!1);
    let a = null;
    const U = de({ cellOverlaps: {}, longestStreak: 0 }), y = C(() => {
      var Z;
      const m = d.horizontal, A = m ? D.startPercentageX : D.startPercentageY, j = m ? D.movePercentageX : D.movePercentageY, q = Se(A, d), K = Se(j, d);
      let X = Math.min(A, j), c = Math.max(A, j), z = Se(X, d), B = Se(c, d);
      if (d.snapToInterval && (z = T.snapToInterval(z, d.snapToInterval), B = T.snapToInterval(B, d.snapToInterval), X = Oe(z, d), c = Oe(B, d)), d.time && ((Z = d.specialHoursDisallowed) != null && Z.hasAny) && !e.allDay) {
        const re = Rt({
          anchorDayMinutes: q,
          cursorDayMinutes: K,
          snappedLow: z,
          snappedHigh: B,
          cellDate: e.start,
          schedule: D.schedule,
          disallowed: d.specialHoursDisallowed,
          hasSchedules: !!(d.schedules && d.schedules.length)
        });
        z = re.low, B = re.high, X = Oe(z, d), c = Oe(B, d);
      }
      return {
        style: {
          [m ? "left" : "top"]: `${X}%`,
          [m ? "width" : "height"]: `${Math.abs(c - X)}%`
        },
        startMinutes: z,
        endMinutes: B,
        start: T.formatMinutes(z),
        end: T.formatMinutes(B),
        ...D.schedule != null ? { schedule: D.schedule } : {}
      };
    }), I = C(() => {
      const m = d.editableEvents.create && (D.dragging || g.value), A = d.eventCreateMinDrag && D.thresholdPassed || !d.eventCreateMinDrag, j = D.canTouchAndDrag !== !1;
      return m && A && j;
    }), le = C(() => {
      var c;
      const m = /* @__PURE__ */ new Date(), A = n.start.getFullYear(), j = n.start.getMonth(), q = e.start.getFullYear(), K = e.start.getMonth();
      return {
        [`vuecal__cell--${Ne[e.start.getDay()]}`]: n.isDay || n.isDays || n.isWeek || n.isMonth,
        [`vuecal__cell--${At[K]}`]: n.isYear,
        [`vuecal__cell--${q}`]: n.isYears,
        "vuecal__cell--today": L.value,
        "vuecal__cell--current-month": n.isYear && q === m.getFullYear() && K === m.getMonth(),
        "vuecal__cell--current-year": n.isYears && q === m.getFullYear(),
        "vuecal__cell--out-of-range": n.isMonth && (q !== A || K !== j),
        "vuecal__cell--before-min": ee.value && u.value,
        "vuecal__cell--after-max": ee.value && J.value,
        "vuecal__cell--disabled": ee.value,
        "vuecal__cell--selected": n.selectedDate && n.selectedDate.getTime() >= e.start.getTime() && n.selectedDate.getTime() <= e.end.getTime(),
        "vuecal__cell--has-schedules": (c = d.schedules) == null ? void 0 : c.length,
        "vuecal__cell--dragging": D.dragging,
        "vuecal__cell--has-events": V.value.length
      };
    });
    C(() => T.formatDate(e.start));
    const t = C(() => {
      switch (n.id) {
        case "day":
          return "";
        case "days":
          return d.availableViews.days.rows > 1 && T.formatDate(e.start, "D"), "";
        case "week":
          return "";
        case "month":
          return T.formatDate(e.start, "D");
        case "year":
          return T.formatDate(e.start, d.xs ? "MMM" : "MMMM");
        case "years":
          return T.formatDate(e.start, "YYYY");
      }
    }), V = C(() => d.datePicker ? [] : S.getEventsInRange(
      e.start,
      e.end,
      { excludeIds: f.value, ...d.allDayEvents ? { allDay: e.allDay } : {} }
    )), E = C(() => V.value.filter((m) => !m.background)), $ = C(() => {
      var m;
      return (m = d.schedules) == null ? void 0 : m.reduce((A, j) => (A[j.id] = V.value.filter((q) => q.schedule === j.id), A), {});
    }), M = C(() => {
      if (n.isMonth || n.isYear || n.isYears || e.allDay || !d.time) return {};
      const m = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", A = d.horizontal, j = {};
      for (const q of V.value) {
        const K = q._.id, { maxConcurrent: X = 1, position: c = 0 } = U.value.cellOverlaps[K] || {}, z = m ? "right" : "left", B = A ? "height" : "width";
        j[K] = { [A ? "top" : z]: `${100 / X * c}%` }, d.stackEvents ? j[K][B] = `${100 / X + (c === X - 1 ? 0 : 15)}%` : j[K][B] = `${100 / X}%`;
      }
      return j;
    }), h = C(() => {
      const m = {};
      for (const A of V.value) {
        const j = A._.id, { maxConcurrent: q = 1, position: K = 0 } = U.value.cellOverlaps[j] || {};
        m[j] = `vuecal__event--stack-${K + 1}-${q}`;
      }
      return m;
    }), W = C(() => d.showCellEventCount && E.value.length), s = (m) => {
      const A = m || [], j = d.horizontal, { timeFrom: q, timeTo: K } = d, X = [];
      for (let c = 0; c < A.length; c++) {
        const z = A[c];
        let { from: B, to: Z, class: re, label: je } = z;
        if (isNaN(B) || isNaN(Z) || q >= Z || K <= B) continue;
        B = Math.max(q, B), Z = Math.min(K, Z);
        const Me = Oe(B, d), _e = Oe(Z, d) - Me;
        X.push({
          style: {
            [j ? "left" : "top"]: `${Me}%`,
            [j ? "width" : "height"]: `${_e}%`
          },
          label: je,
          class: re
        });
      }
      return X;
    }, w = C(() => {
      var j;
      if (!d.specialHours || n.isMonth || n.isYear || n.isYears || e.allDay) return;
      const m = Ne[e.start.getDay()];
      let A = (j = d.specialHours) == null ? void 0 : j[m];
      if (A)
        return {
          default: s(A.default),
          schedules: Object.entries(A.schedules || {}).reduce((q, [K, X]) => (q[K] = s(X), q), {})
        };
    }), O = C(() => {
      const m = d.schedules;
      if (!(m != null && m.length)) return [];
      const A = w.value;
      if (!A) return m.map((K) => ({ schedule: K, ranges: [] }));
      const { default: j, schedules: q } = A;
      return m.map((K) => {
        const X = String(K.id), c = Object.prototype.hasOwnProperty.call(q, X) ? q[X] : j;
        return { schedule: K, ranges: c };
      });
    }), u = C(() => d.minTimestamp !== null && d.minTimestamp > e.end.getTime()), J = C(() => d.maxTimestamp && d.maxTimestamp < e.start.getTime()), ee = C(() => {
      const { disableDays: m } = d, A = n.isYear || n.isYears;
      return m.length && m.includes(T.formatDate(e.start)) && !A ? !0 : u.value || J.value;
    }), ne = C(() => {
      if (ee.value) return {};
      const m = { ...d.eventListeners.cell };
      for (const [j, q] of Object.entries(m))
        m[j] = (K) => {
          var X, c, z;
          (z = (c = K.target || ((X = K.e) == null ? void 0 : X.target)).closest) != null && z.call(c, ".vuecal__event") || q(K.type ? { e: K, cell: R.value, cursor: Y.value, view: n } : K);
        };
      const A = { ...m };
      return m.click = (j) => {
        var K;
        _();
        const q = i(j);
        (K = A.click) == null || K.call(A, { e: j, cell: R.value, cursor: q, view: n }), a ? a = clearTimeout(a) : a = setTimeout(() => {
          var X;
          a = null, (X = A["delayed-click"]) == null || X.call(A, { e: j, cell: R.value, cursor: q, view: n });
        }, 400);
      }, (d.time && n.isDay || n.isDays || n.isWeek) && (m.touchstart = (j) => {
        var q;
        x(j.e || j), (q = A.touchstart) == null || q.call(A, { e: j, cell: R.value, cursor: Y.value, view: n });
      }, m.mousedown = (j) => {
        var q;
        x(j.e || j), (q = A.mousedown) == null || q.call(A, { e: j, cell: R.value, cursor: Y.value, view: n });
      }), A.dblclick && (m.dblclick = (j) => {
        var q;
        (q = A.dblclick) == null || q.call(A, { e: j, cell: R.value, cursor: i(j), view: n });
      }), d.editableEvents.drag && (m.dragenter = (j) => v.cellDragEnter(j, R.value), m.dragover = (j) => {
        j.preventDefault(), v.cellDragOver(j, R.value);
      }, m.dragleave = (j) => v.cellDragLeave(j, R.value), m.drop = (j) => v.cellDragDrop(j, R.value, e.allDay)), m;
    }), R = C(() => ({
      start: e.start,
      end: e.end,
      events: V,
      ...D.schedule !== null ? { schedule: D.schedule } : {},
      goNarrower: () => n.narrower(),
      goBroader: () => n.broader(),
      broader: n.broaderView,
      narrower: n.narrowerView
    })), se = (m) => $.value[m.id] || [], i = (m) => {
      var B;
      const A = d.horizontal, { clientX: j, clientY: q } = ((B = m.touches) == null ? void 0 : B[0]) || m, { top: K, left: X } = P.value.getBoundingClientRect(), c = A ? (j - X) * 100 / P.value.clientWidth : nt(q - K, P.value), z = new Date(e.start);
      return z.setMinutes(Se(c, d)), { [A ? "x" : "y"]: c, date: z };
    }, Y = C(() => {
      const A = d.horizontal ? D.movePercentageX || D.startPercentageX : D.movePercentageY || D.startPercentageY, j = Se(A, d), q = new Date(e.start);
      return q.setMinutes(j), {
        x: D.movePercentageX || D.startPercentageX,
        y: D.movePercentageY || D.startPercentageY,
        date: q
      };
    }), _ = () => {
      n.updateSelectedDate(e.start), d.clickToNavigate && ((n.isMonth || n.isDays || n.isWeek) && d.availableViews.day ? n.switch("day") : n.isYear && d.availableViews.month ? n.switch("month") : n.isYears && d.availableViews.year && n.switch("year")), n.updateViewDate(e.start);
    }, x = (m) => {
      var K, X, c, z, B;
      const A = m.type === "touchstart";
      A ? (D.canTouchAndDrag = !1, D.touchAndDragTimer = setTimeout(() => {
        D.canTouchAndDrag = !0, (D.holding || D.dragging) && m.preventDefault();
      }, 500)) : D.canTouchAndDrag = !0;
      const j = (X = (K = m.target.closest("[data-schedule]")) == null ? void 0 : K.dataset) == null ? void 0 : X.schedule;
      if (j !== void 0 && ((c = d.schedules) != null && c.length)) {
        const Z = d.schedules.find((re) => String(re.id) === String(j));
        D.schedule = Z ? Z.id : j;
      } else D.schedule = null;
      const q = P.value.getBoundingClientRect();
      D.startX = (((z = m.touches) == null ? void 0 : z[0]) || m).clientX - q.left, D.startY = (((B = m.touches) == null ? void 0 : B[0]) || m).clientY - q.top, D.startPercentageX = D.startX * 100 / q.width, D.startPercentageY = D.startY * 100 / q.height, D.thresholdPassed = !1, document.addEventListener(A ? "touchmove" : "mousemove", ae, { passive: !A }), document.addEventListener(A ? "touchend" : "mouseup", me, { once: !0 }), D.holdTimer = setTimeout(() => {
        var Z, re;
        D.holding = !0, (re = (Z = ne.value).hold) == null || re.call(Z, { e: m, cell: R.value, cursor: Y.value, view: n });
      }, 1e3);
    }, ae = (m) => {
      var X, c, z, B, Z, re;
      const A = m.type === "touchmove", j = d.horizontal;
      if (A && !D.canTouchAndDrag) {
        D.touchAndDragTimer && (clearTimeout(D.touchAndDragTimer), D.touchAndDragTimer = null), me(m);
        return;
      }
      A && m.preventDefault(), D.dragging || (p.isDraggingCell = !0, (c = (X = ne.value)["drag-start"]) == null || c.call(X, { e: m, cell: R.value, cursor: Y.value, view: n })), D.dragging = !0, D.holdTimer = clearTimeout(D.holdTimer), D.holding = !1;
      const q = P.value.getBoundingClientRect();
      D.moveX = (((z = m.touches) == null ? void 0 : z[0]) || m).clientX - q.left, D.moveY = (((B = m.touches) == null ? void 0 : B[0]) || m).clientY - q.top, D.movePercentageX = D.moveX * 100 / q.width, D.movePercentageY = D.moveY * 100 / q.height;
      const K = Math.abs(j ? D.startX - D.moveX : D.startY - D.moveY);
      d.eventCreateMinDrag && K > d.eventCreateMinDrag && (D.thresholdPassed = !0), (re = (Z = ne.value).drag) == null || re.call(Z, { e: m, cell: R.value, cursor: Y.value, view: n });
    }, me = async (m) => {
      var j, q;
      const A = m.type === "touchend";
      document.removeEventListener(A ? "touchmove" : "mousemove", ae, { passive: !1 }), D.touchAndDragTimer && (clearTimeout(D.touchAndDragTimer), D.touchAndDragTimer = null), D.dragging && ((q = (j = ne.value)["drag-end"]) == null || q.call(j, { e: m, cell: R.value, cursor: Y.value, view: n }), p.isDraggingCell = !1, d.editableEvents.create && D.canTouchAndDrag && (g.value = !0, await ce(m), g.value = !1)), D.holdTimer = clearTimeout(D.holdTimer), D.holding = !1, D.dragging = !1, D.startX = 0, D.startY = 0, D.moveX = 0, D.moveY = 0, D.startPercentageX = 0, D.startPercentageY = 0, D.movePercentageX = 0, D.movePercentageY = 0, D.thresholdPassed = !1, D.schedule = null, D.canTouchAndDrag = null;
    }, ce = async (m) => {
      var z;
      if (!I.value) return;
      let { start: A, end: j, startMinutes: q, endMinutes: K } = y.value;
      A = new Date(e.start), A.setMinutes(q), j = new Date(e.start), j.setMinutes(K);
      let X = { ...y.value, start: A, end: j };
      const { create: c } = d.eventListeners.event;
      if (typeof c == "function") {
        const B = X;
        X = await new Promise((Z) => c({ e: m, event: X, cell: R.value, resolve: Z, cursor: Y.value, view: n })), X && typeof X == "object" && n.createEvent(X), X && typeof X == "boolean" && n.createEvent(B);
      } else n.createEvent(X);
      (z = navigator.vibrate) == null || z.call(navigator, 200);
    }, Ve = () => {
      var m;
      for (const A of Object.keys(ne.value))
        (m = P.value) == null || m.removeEventListener(A, ne.value[A]);
    }, ge = () => {
      U.value = S.getCellOverlappingEvents(e.start, e.end, e.allDay);
    };
    return pe(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !n.isYears && !n.isYear && E.value.map((m) => `${m._.id}${m.start.getTime()}${m.end.getTime()}`).join(),
      async () => {
        await qe(), ge();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), We(async () => {
      for (const m of f.value) S.deleteEvent(m, 3);
      Ve(), a && (a = clearTimeout(a)), await qe();
    }), (m, A) => {
      var j, q, K;
      return F(), G("div", ue({
        class: "vuecal__cell",
        ref_key: "cellEl",
        ref: P
      }, Je(ne.value, !0), {
        "data-start": e.start.getTime(),
        class: le.value
      }), [
        m.$slots.cell ? N(m.$slots, "cell", {
          key: 0,
          cell: R.value
        }) : te("", !0),
        (q = (j = w.value) == null ? void 0 : j.default) != null && q.length && !((K = k(d).schedules) != null && K.length) ? (F(!0), G(fe, { key: 1 }, be(w.value.default, (X, c) => (F(), G("div", {
          class: De(["vuecal__special-hours", X.class]),
          style: we(X.style),
          innerHTML: X.label || ""
        }, null, 14, mn))), 256)) : te("", !0),
        !m.$slots.cell && k(d).schedules ? (F(!0), G(fe, { key: 2 }, be(O.value, ({ schedule: X, ranges: c }) => (F(), G("div", {
          class: De(["vuecal__schedule vuecal__schedule--cell", X.class]),
          key: X.id,
          style: we(X.style || null),
          "data-schedule": X.id
        }, [
          c.length ? (F(!0), G(fe, { key: 0 }, be(c, (z, B) => (F(), G("div", {
            class: De(["vuecal__special-hours", z.class]),
            key: `${X.id}-${B}`,
            style: we(z.style),
            innerHTML: z.label || ""
          }, null, 14, gn))), 128)) : te("", !0),
          t.value || m.$slots["cell-date"] ? (F(), G("div", yn, [
            N(m.$slots, "cell-date", {
              cell: R.value,
              view: k(n),
              schedule: X,
              events: se(X)
            }, () => [
              Ze(ve(t.value), 1)
            ])
          ])) : te("", !0),
          m.$slots["cell-content"] ? (F(), G("div", Dn, [
            N(m.$slots, "cell-content", {
              cell: R.value,
              view: k(n),
              schedule: X,
              events: se(X)
            })
          ])) : te("", !0),
          m.$slots["cell-events"] ? (F(), G("div", pn, [
            N(m.$slots, "cell-events", {
              cell: R.value,
              view: k(n),
              schedule: X,
              events: se(X)
            })
          ])) : V.value.length || b.value ? (F(), He(rt, {
            key: 4,
            class: "vuecal__cell-events",
            name: "vuecal-event-delete",
            onBeforeLeave: A[0] || (A[0] = (z) => b.value = !0),
            onAfterLeave: l,
            tag: "div"
          }, {
            default: Q(() => [
              (F(!0), G(fe, null, be($.value[X.id], (z) => (F(), He(ut, {
                key: z._.id,
                event: z,
                onEventDeleted: H,
                "in-all-day-bar": e.allDay,
                "cell-start": e.start,
                "cell-end": e.end,
                style: we(M.value[z._.id])
              }, Ae({ _: 2 }, [
                m.$slots["event.all-day"] && e.allDay ? {
                  name: "event.all-day",
                  fn: Q((B) => [
                    N(m.$slots, "event.all-day", ue({ ref_for: !0 }, B))
                  ]),
                  key: "0"
                } : void 0,
                m.$slots[`event.${k(n).id}`] ? {
                  name: `event.${k(n).id}`,
                  fn: Q((B) => [
                    N(m.$slots, `event.${k(n).id}`, ue({ ref_for: !0 }, B))
                  ]),
                  key: "1"
                } : void 0,
                m.$slots.event ? {
                  name: "event",
                  fn: Q((B) => [
                    N(m.$slots, "event", ue({ ref_for: !0 }, B))
                  ]),
                  key: "2"
                } : void 0
              ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "style"]))), 128))
            ]),
            _: 2
          }, 1024)) : te("", !0),
          I.value && D.schedule === X.id && !e.allDay ? (F(), G("div", {
            key: 5,
            class: "vuecal__event-placeholder",
            style: we(y.value.style)
          }, ve(y.value.start) + " - " + ve(y.value.end), 5)) : te("", !0)
        ], 14, hn))), 128)) : te("", !0),
        !m.$slots.cell && !k(d).schedules ? (F(), G(fe, { key: 3 }, [
          t.value || m.$slots["cell-date"] ? (F(), G("div", wn, [
            N(m.$slots, "cell-date", {
              cell: R.value,
              view: k(n)
            }, () => [
              Ze(ve(t.value), 1)
            ])
          ])) : te("", !0),
          m.$slots["cell-content"] ? (F(), G("div", bn, [
            N(m.$slots, "cell-content", {
              cell: R.value,
              view: k(n)
            })
          ])) : te("", !0),
          m.$slots["cell-events"] && V.value.length ? (F(), G("div", _n, [
            N(m.$slots, "cell-events", {
              cell: R.value,
              view: k(n)
            })
          ])) : !(k(n).isMonth && !k(d).eventsOnMonthView) && !k(n).isYear && !k(n).isYears && (V.value.length || b.value) ? (F(), He(rt, {
            key: 3,
            class: "vuecal__cell-events",
            name: "vuecal-event-delete",
            onBeforeLeave: A[1] || (A[1] = (X) => b.value = !0),
            onAfterLeave: l,
            tag: "div"
          }, {
            default: Q(() => [
              (F(!0), G(fe, null, be(V.value, (X) => (F(), He(ut, {
                key: X._.id,
                event: X,
                onEventDeleted: H,
                "in-all-day-bar": e.allDay,
                "cell-start": e.start,
                "cell-end": e.end,
                class: De(h.value[X._.id]),
                style: we(M.value[X._.id])
              }, Ae({ _: 2 }, [
                m.$slots["event.all-day"] && e.allDay ? {
                  name: "event.all-day",
                  fn: Q((c) => [
                    N(m.$slots, "event.all-day", ue({ ref_for: !0 }, c))
                  ]),
                  key: "0"
                } : void 0,
                m.$slots[`event.${k(n).id}`] ? {
                  name: `event.${k(n).id}`,
                  fn: Q((c) => [
                    N(m.$slots, `event.${k(n).id}`, ue({ ref_for: !0 }, c))
                  ]),
                  key: "1"
                } : void 0,
                m.$slots.event ? {
                  name: "event",
                  fn: Q((c) => [
                    N(m.$slots, "event", ue({ ref_for: !0 }, c))
                  ]),
                  key: "2"
                } : void 0
              ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "class", "style"]))), 128))
            ]),
            _: 3
          })) : te("", !0),
          I.value ? (F(), G("div", {
            key: 4,
            class: "vuecal__event-placeholder",
            style: we(y.value.style)
          }, ve(y.value.start) + " - " + ve(y.value.end), 5)) : te("", !0)
        ], 64)) : te("", !0),
        m.$slots["event-count"] ? N(m.$slots, "event-count", {
          key: 4,
          events: E.value
        }) : W.value ? (F(), G("div", kn, ve(E.value.length), 1)) : te("", !0),
        k(n).nowLine.show && L.value && !r.allDay ? (F(), G("div", {
          key: 6,
          class: "vuecal__now-line",
          style: we(k(n).nowLine.style),
          title: k(n).nowLine.currentTime
        }, [
          N(m.$slots, "now-line", {
            now: k(n).now,
            timeFormatted: k(n).nowLine.currentTime
          }, () => [
            he("span", null, ve(k(n).nowLine.currentTime), 1)
          ])
        ], 12, Tn)) : te("", !0)
      ], 16, fn);
    };
  }
}, $n = {
  key: 0,
  class: "vuecal__headings"
}, Mn = {
  key: 0,
  class: "vuecal__weekdays-headings"
}, En = ["onClick"], Sn = { class: "vuecal__weekday-day" }, Yn = {
  key: 0,
  class: "vuecal__weekday-date"
}, zn = {
  key: 1,
  class: "vuecal__schedules-headings"
}, Cn = ["innerHTML"], On = {
  key: 2,
  class: "vuecal__all-day"
}, Hn = {
  __name: "headings-bar",
  setup(r) {
    const e = Le("vuecal"), o = Le("$vuecalEl"), { view: n, config: d, dateUtils: T } = e, S = C(() => d.xs ? "day-xs" : d.sm || n.isDays || n.isMonth ? "day-sm" : "day"), v = C(() => (n.isDay || n.isDays || n.isWeek || n.isMonth) && !(n.isDay && !d.schedules && !d.allDayEvents)), p = C(() => n.cellDates.slice(0, d.horizontal ? n.rows : n.cols).map(({ start: b }) => ({
      id: Ne[b.getDay()],
      date: b,
      dateNumber: b.getDate(),
      day: T.formatDate(b, "dddd"),
      "day-sm": T.formatDate(b, "ddd"),
      "day-xs": T.formatDate(b, "dd"),
      isToday: T.isToday(b)
    }))), L = (b) => ({
      start: b.date,
      end: new Date(b.date.getTime() + 1440 * 60 * 1e3 - 1),
      isToday: b.isToday,
      goNarrower: () => n.narrower(),
      goBroader: () => n.broader(),
      broader: n.broaderView,
      narrower: n.narrowerView
    }), P = {
      click: (b) => {
        (n.isDays || n.isWeek) && n.updateSelectedDate(b);
      }
    }, f = {
      isResizing: de(!1),
      startY: de(0),
      initialHeight: de(0),
      defaultHeight: 25,
      // Default height in pixels.
      // Or in the case of horizontal layout.
      startX: de(0),
      initialWidth: de(0),
      defaultWidth: 25,
      // Default width in pixels.
      // Cleanup event listeners.
      cleanup() {
        typeof document < "u" && (document.removeEventListener("mousemove", f.handleMouseMove), document.removeEventListener("mouseup", f.cleanup), document.removeEventListener("touchmove", f.handleTouchMove, { passive: !1 }), document.removeEventListener("touchend", f.cleanup)), f.isResizing.value = !1;
      },
      startResize(b, H) {
        this.isResizing.value = !0;
        const l = d.horizontal;
        this[l ? "startX" : "startY"].value = l ? b : H;
        const D = getComputedStyle(o.value).getPropertyValue("--vuecal-all-day-bar-size"), g = document.createElement("div");
        g.style.position = "absolute", g.style.visibility = "hidden", g.style[l ? "width" : "height"] = D, document.body.appendChild(g);
        const a = g[l ? "offsetWidth" : "offsetHeight"];
        g.remove(), a > 0 && (this[l ? "initialWidth" : "initialHeight"].value = a), document.addEventListener("mousemove", f.handleMouseMove), document.addEventListener("mouseup", f.cleanup), document.addEventListener("touchmove", f.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", f.cleanup);
      },
      // Update height/width based on mouse/touch movement.
      updateSize(b, H) {
        var a;
        if (!this.isResizing.value) return;
        const l = d.horizontal, D = l ? b - this.startX.value : H - this.startY.value, g = Math.max(20, this[l ? "initialWidth" : "initialHeight"].value + D);
        (a = o.value) == null || a.style.setProperty("--vuecal-all-day-bar-size", `${g}px`);
      },
      // Mouse event handlers.
      handleMouseDown(b) {
        this.startResize(b.clientX, b.clientY);
      },
      handleMouseMove(b) {
        f.updateSize(b.clientX, b.clientY);
      },
      // Touch event handlers.
      handleTouchStart(b) {
        var H;
        (H = b.touches) != null && H[0] && this.startResize(b.touches[0].clientX, b.touches[0].clientY);
      },
      handleTouchMove(b) {
        var H;
        (H = b.touches) != null && H[0] && (f.updateSize(b.touches[0].clientX, b.touches[0].clientY), b.preventDefault());
      }
    };
    return We(() => {
      f.cleanup();
    }), (b, H) => v.value ? (F(), G("div", $n, [
      k(n).isDay ? te("", !0) : (F(), G("div", Mn, [
        (F(!0), G(fe, null, be(p.value, (l, D) => (F(), G("div", {
          class: De(["vuecal__weekday", { "vuecal__weekday--today": l.isToday }]),
          key: D,
          onClick: (g) => P.click(l.date)
        }, [
          N(b.$slots, "weekday-heading", {
            label: l[S.value],
            id: l.id,
            date: l.date,
            view: k(n)
          }, () => [
            he("span", Sn, ve(l[S.value]), 1),
            k(n).isMonth ? te("", !0) : (F(), G("strong", Yn, ve(l.dateNumber), 1))
          ])
        ], 10, En))), 128))
      ])),
      k(d).schedules ? (F(), G("div", zn, [
        (F(!0), G(fe, null, be(p.value, (l, D) => (F(), G(fe, { key: D }, [
          (F(!0), G(fe, null, be(k(d).schedules, (g, a) => (F(), G(fe, { key: a }, [
            b.$slots["schedule-heading"] ? (F(), G("div", {
              key: 0,
              class: De(["vuecal__schedule vuecal__schedule--heading", g.class])
            }, [
              N(b.$slots, "schedule-heading", {
                schedule: g,
                view: k(n),
                cell: L(l)
              })
            ], 2)) : (F(), G("div", {
              key: 1,
              class: De(["vuecal__schedule vuecal__schedule--heading", g.class]),
              innerHTML: g.label
            }, null, 10, Cn))
          ], 64))), 128))
        ], 64))), 128))
      ])) : te("", !0),
      k(d).allDayEvents ? (F(), G("div", On, [
        (F(!0), G(fe, null, be(p.value, (l, D) => (F(), He(Yt, {
          class: De(["vuecal__all-day-cell", { "vuecal__weekday--today": l.isToday }]),
          key: D,
          start: l.date,
          end: new Date(l.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: D,
          "all-day": ""
        }, Ae({ _: 2 }, [
          b.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: Q((g) => [
              N(b.$slots, "event.all-day", ue({ ref_for: !0 }, g))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: Q((g) => [
              N(b.$slots, "event", ue({ ref_for: !0 }, g))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        he("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: H[0] || (H[0] = (...l) => f.handleMouseDown && f.handleMouseDown(...l)),
          onTouchstart: H[1] || (H[1] = (...l) => f.handleTouchStart && f.handleTouchStart(...l))
        }, null, 32)
      ])) : te("", !0)
    ])) : te("", !0);
  }
}, Vn = { class: "vuecal__time-column" }, An = { class: "vuecal__time-column-inner" }, jn = {
  key: 0,
  class: "vuecal__all-day-label"
}, Pn = ["title"], Ln = {
  __name: "time-column",
  setup(r) {
    const e = Le("vuecal"), { config: o, texts: n, view: d } = e, T = C(() => {
      const S = [];
      for (let p = o.timeFrom; p < o.timeTo; p += o.timeStep) {
        const L = p + o.timeStep > o.timeTo, P = ~~(p / 60), f = p % 60, b = n[p < 720 ? "am" : "pm"];
        let H = null;
        L && (H = `calc(var(--vuecal-time-cell-size) * ${(o.timeTo - p) / o.timeStep})`), S.push({
          minutesSum: p,
          // The sum of hours + minutes in minutes.
          hours: P,
          minutes: f,
          formatted12: `${P % 12 ? P % 12 : 12}${f ? `:${f.toString().padStart(2, 0)}` : ""}${b}`,
          formatted24: `${P.toString().padStart(2, 0)}:${f.toString().padStart(2, 0)}`,
          height: H
        });
      }
      return S;
    });
    return (S, v) => (F(), G("div", Vn, [
      he("div", An, [
        k(o).allDayEvents ? (F(), G("div", jn, [
          N(S.$slots, "all-day-label", {}, () => [
            Ze(ve(k(e).texts.allDay), 1)
          ])
        ])) : te("", !0),
        (F(!0), G(fe, null, be(T.value, (p, L) => (F(), G("div", {
          class: "vuecal__time-cell",
          key: L,
          style: we({ height: p.height || null })
        }, [
          N(S.$slots, "time-cell", {
            index: L,
            minutes: p.minutes,
            hours: p.hours,
            minutesSum: p.minutesSum,
            format12: p.formatted12,
            format24: p.formatted24
          }, () => [
            he("label", null, ve(k(o).twelveHour ? p.formatted12 : p.formatted24), 1)
          ])
        ], 4))), 128)),
        k(o).currentTimeLabel ? (F(), G("div", {
          key: 1,
          class: "vuecal__current-time",
          style: we(k(d).nowLine.style),
          title: k(d).nowLine.currentTime
        }, [
          N(S.$slots, "current-time-label", {
            now: k(d).now,
            timeFormatted: k(d).nowLine.currentTime
          }, () => [
            he("span", null, ve(k(d).nowLine.currentTime), 1)
          ])
        ], 12, Pn)) : te("", !0)
      ])
    ]));
  }
}, Fn = {
  __name: "body",
  setup(r) {
    const e = Le("vuecal"), { view: o, config: n, dateUtils: d, touch: T, eventsManager: S } = e, v = de(null), p = de(null), L = de(null), { resizeState: P } = S, f = C(() => ({
      "--vuecal-grid-columns": o.cols,
      "--vuecal-grid-rows": o.rows,
      "--vuecal-body-max-height": n.time ? `${n.timeCellHeight * (n.timeTo - n.timeFrom) / n.timeStep}px` : null
    })), b = C(() => {
      const g = n.horizontal, a = g ? p.value : L.value, U = d.formatTime(Se(a, n), n.twelveHour ? "h:mm{am}" : "HH:mm");
      return {
        style: { [g ? "left" : "top"]: `${a}%` },
        time: U
      };
    }), H = (g) => {
      var le;
      if (o.isMonth || o.isYear || o.isYears) return;
      const a = T.isResizingEvent && n.editableEvents.resizeX;
      if (!n.timeAtCursor && !a) return;
      const U = ((le = g.touches) == null ? void 0 : le[0]) || g, { clientX: y, clientY: I } = U;
      if (a && (P.cellEl = D(y, I)), n.timeAtCursor) {
        const { top: t, left: V } = v.value.getBoundingClientRect();
        n.horizontal ? p.value = (y - V) * 100 / v.value.clientWidth : L.value = nt(I - t, v.value);
      }
    }, l = () => {
      p.value = null, L.value = null;
    }, D = (g, a) => {
      const U = document.elementFromPoint(g, a);
      return (U == null ? void 0 : U.closest(".vuecal__cell")) || null;
    };
    return tt(() => {
      v.value.addEventListener("mousemove", H), v.value.addEventListener("touchmove", H), v.value.addEventListener("mouseleave", l), v.value.addEventListener("touchend", l);
    }), We(() => {
      v.value && (v.value.removeEventListener("mousemove", H), v.value.removeEventListener("touchmove", H), v.value.removeEventListener("mouseleave", l), v.value.removeEventListener("touchend", l));
    }), (g, a) => (F(), G("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: v,
      style: we(f.value)
    }, [
      Pe(Ue, { name: "vuecal-shrink" }, {
        default: Q(() => [
          k(n).timeAtCursor && (p.value !== null || L.value !== null) ? (F(), G("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: we(b.value.style)
          }, [
            he("label", null, ve(b.value.time), 1)
          ], 4)) : te("", !0)
        ]),
        _: 1
      }),
      (F(!0), G(fe, null, be(k(o).cellDates, (U, y) => (F(), He(Yt, {
        key: y,
        start: U.start,
        end: U.end,
        index: y
      }, Ae({ _: 2 }, [
        g.$slots.cell ? {
          name: "cell",
          fn: Q((I) => [
            N(g.$slots, "cell", ue({ ref_for: !0 }, I))
          ]),
          key: "0"
        } : void 0,
        g.$slots["cell-date"] ? {
          name: "cell-date",
          fn: Q((I) => [
            N(g.$slots, "cell-date", ue({ ref_for: !0 }, I))
          ]),
          key: "1"
        } : void 0,
        g.$slots["cell-content"] ? {
          name: "cell-content",
          fn: Q((I) => [
            N(g.$slots, "cell-content", ue({ ref_for: !0 }, I))
          ]),
          key: "2"
        } : void 0,
        g.$slots["cell-events"] ? {
          name: "cell-events",
          fn: Q((I) => [
            N(g.$slots, "cell-events", ue({ ref_for: !0 }, I))
          ]),
          key: "3"
        } : void 0,
        g.$slots[`event.${k(o).id}`] ? {
          name: `event.${k(o).id}`,
          fn: Q((I) => [
            N(g.$slots, `event.${k(o).id}`, ue({ ref_for: !0 }, I))
          ]),
          key: "4"
        } : void 0,
        g.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: Q((I) => [
            N(g.$slots, "event.all-day", ue({ ref_for: !0 }, I))
          ]),
          key: "5"
        } : void 0,
        g.$slots.event ? {
          name: "event",
          fn: Q((I) => [
            N(g.$slots, "event", ue({ ref_for: !0 }, I))
          ]),
          key: "6"
        } : void 0,
        g.$slots["event-count"] ? {
          name: "event-count",
          fn: Q((I) => [
            N(g.$slots, "event-count", ue({ ref_for: !0 }, I))
          ]),
          key: "7"
        } : void 0,
        g.$slots["now-line"] ? {
          name: "now-line",
          fn: Q((I) => [
            N(g.$slots, "now-line", ue({ ref_for: !0 }, I))
          ]),
          key: "8"
        } : void 0
      ]), 1032, ["start", "end", "index"]))), 128))
    ], 4));
  }
}, Rn = ["data-locale"], Xn = { class: "vuecal__scrollable-wrap" }, Bn = {
  key: 1,
  class: "vuecal__week-numbers"
}, Nn = { class: "vuecal__week-number" }, Wn = { class: "vuecal__body-wrap" }, Gn = {
  __name: "index",
  props: Jt,
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
  setup(r, { expose: e, emit: o }) {
    const n = r, d = o, T = Ot("vuecal-el"), S = Gt({ props: n, emit: d, attrs: Vt(), vuecalEl: T, uid: Ht() }), { config: v, view: p, dateUtils: L, touch: P } = S, f = C(() => v.time && (p.isDay || p.isDays || p.isWeek)), b = C(() => Array(p.rows).fill().map((a, U) => L.getWeek(L.addDays(p.firstCellDate, 7 * U)))), H = C(() => {
      var a;
      return {
        "vuecal--ready": v.ready,
        [`vuecal--${v.theme}-theme`]: v.theme,
        [`vuecal--${v.size}`]: !0,
        "vuecal--date-picker": v.datePicker,
        "vuecal--dark": v.dark,
        "vuecal--light": !v.dark,
        [`vuecal--${p.id}-view`]: !0,
        "vuecal--view-has-time": f.value,
        "vuecal--timeless": !v.time,
        "vuecal--dragging-cell": P.isDraggingCell,
        "vuecal--dragging-event": P.isDraggingEvent,
        "vuecal--resizing-event": P.isResizingEvent,
        "vuecal--has-schedules": (a = v.schedules) == null ? void 0 : a.length,
        "vuecal--horizontal": v.horizontal
      };
    }), l = C(() => {
      var a;
      return {
        "--vuecal-time-cell-size": v.timeCellHeight && `${v.timeCellHeight}px`,
        "--vuecal-schedules-count": ((a = v.schedules) == null ? void 0 : a.length) ?? 0
      };
    }), D = C(() => {
      var a, U;
      return {
        "vuecal__scrollable--row": f.value || v.weekNumbers && p.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${p.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (a = v.schedules) == null ? void 0 : a.length,
        "vuecal__scrollable--no-schedules": !((U = v.schedules) != null && U.length),
        "vuecal__scrollable--horizontal": v.horizontal,
        "vuecal__scrollable--no-all-day-bar": !v.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": v.allDayEvents
      };
    }), g = (a) => {
      a.target.closest(".vuecal__cell") && a.preventDefault();
    };
    return tt(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && T.value.addEventListener("contextmenu", g), await qe(), v.ready = !0, d("ready", { config: v, view: p });
    }), We(() => {
      var a;
      (a = T == null ? void 0 : T.value) == null || a.removeEventListener("contextmenu", g);
    }), ot("vuecal", S), ot("$vuecalEl", T), e({ view: S.view }), (a, U) => (F(), G("div", {
      class: De(["vuecal", H.value]),
      ref: "vuecal-el",
      "data-locale": a.locale,
      style: we(l.value)
    }, [
      a.$slots.diy ? N(a.$slots, "diy", {
        key: 0,
        vuecal: k(S)
      }) : (F(), G(fe, { key: 1 }, [
        Pe(tn, null, Ae({ _: 2 }, [
          a.$slots.header ? {
            name: "header",
            fn: Q((y) => [
              N(a.$slots, "header", oe(ie(y)))
            ]),
            key: "0"
          } : void 0,
          !a.$slots.header && a.$slots["previous-button"] ? {
            name: "previous-button",
            fn: Q((y) => [
              N(a.$slots, "previous-button", oe(ie(y)))
            ]),
            key: "1"
          } : void 0,
          !a.$slots.header && a.$slots["next-button"] ? {
            name: "next-button",
            fn: Q((y) => [
              N(a.$slots, "next-button", oe(ie(y)))
            ]),
            key: "2"
          } : void 0,
          !a.$slots.header && a.$slots["today-button"] ? {
            name: "today-button",
            fn: Q((y) => [
              N(a.$slots, "today-button", oe(ie(y)))
            ]),
            key: "3"
          } : void 0,
          !a.$slots.header && a.$slots.title ? {
            name: "title",
            fn: Q((y) => [
              N(a.$slots, "title", oe(ie(y)))
            ]),
            key: "4"
          } : void 0,
          !a.$slots.header && a.$slots["title.day"] ? {
            name: "title.day",
            fn: Q((y) => [
              N(a.$slots, "title.day", oe(ie(y)))
            ]),
            key: "5"
          } : void 0,
          !a.$slots.header && a.$slots["title.days"] ? {
            name: "title.days",
            fn: Q((y) => [
              N(a.$slots, "title.days", oe(ie(y)))
            ]),
            key: "6"
          } : void 0,
          !a.$slots.header && a.$slots["title.week"] ? {
            name: "title.week",
            fn: Q((y) => [
              N(a.$slots, "title.week", oe(ie(y)))
            ]),
            key: "7"
          } : void 0,
          !a.$slots.header && a.$slots["title.month"] ? {
            name: "title.month",
            fn: Q((y) => [
              N(a.$slots, "title.month", oe(ie(y)))
            ]),
            key: "8"
          } : void 0,
          !a.$slots.header && a.$slots["title.year"] ? {
            name: "title.year",
            fn: Q((y) => [
              N(a.$slots, "title.year", oe(ie(y)))
            ]),
            key: "9"
          } : void 0,
          !a.$slots.header && a.$slots["title.years"] ? {
            name: "title.years",
            fn: Q((y) => [
              N(a.$slots, "title.years", oe(ie(y)))
            ]),
            key: "10"
          } : void 0,
          !a.$slots.header && a.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: Q((y) => [
              N(a.$slots, "schedule-heading", oe(ie(y)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        he("div", Xn, [
          Pe(Ue, {
            name: `vuecal-slide-fade--${k(p).transitionDirection}`
          }, {
            default: Q(() => [
              (F(), G("div", {
                class: De(["vuecal__scrollable", D.value]),
                key: k(p).id + k(p).start.getTime()
              }, [
                f.value ? (F(), He(Ln, { key: 0 }, Ae({ _: 2 }, [
                  a.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: Q((y) => [
                      N(a.$slots, "time-cell", oe(ie(y)))
                    ]),
                    key: "0"
                  } : void 0,
                  a.$slots["current-time-label"] ? {
                    name: "current-time-label",
                    fn: Q((y) => [
                      N(a.$slots, "current-time-label", oe(ie(y)))
                    ]),
                    key: "1"
                  } : void 0
                ]), 1024)) : te("", !0),
                k(v).weekNumbers && k(p).isMonth ? (F(), G("div", Bn, [
                  (F(!0), G(fe, null, be(b.value, (y) => (F(), G("div", Nn, [
                    N(a.$slots, "week-number", {}, () => [
                      he("small", null, ve(y), 1)
                    ])
                  ]))), 256))
                ])) : te("", !0),
                he("div", Wn, [
                  Pe(Hn, null, Ae({ _: 2 }, [
                    a.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: Q((y) => [
                        N(a.$slots, "weekday-heading", oe(ie(y)))
                      ]),
                      key: "0"
                    } : void 0,
                    a.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: Q((y) => [
                        N(a.$slots, "schedule-heading", oe(ie(y)))
                      ]),
                      key: "1"
                    } : void 0,
                    a.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: Q((y) => [
                        N(a.$slots, "event.all-day", oe(ie(y)))
                      ]),
                      key: "2"
                    } : void 0,
                    a.$slots.event ? {
                      name: "event",
                      fn: Q((y) => [
                        N(a.$slots, "event", oe(ie(y)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  Pe(Fn, null, Ae({ _: 2 }, [
                    a.$slots.cell ? {
                      name: "cell",
                      fn: Q((y) => [
                        N(a.$slots, "cell", oe(ie(y)))
                      ]),
                      key: "0"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: Q((y) => [
                        N(a.$slots, "cell-date", oe(ie(y)))
                      ]),
                      key: "1"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: Q((y) => [
                        N(a.$slots, "cell-content", oe(ie(y)))
                      ]),
                      key: "2"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: Q((y) => [
                        N(a.$slots, "cell-events", oe(ie(y)))
                      ]),
                      key: "3"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: Q((y) => [
                        N(a.$slots, "event.all-day", oe(ie(y)))
                      ]),
                      key: "4"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots[`event.${k(p).id}`] ? {
                      name: `event.${k(p).id}`,
                      fn: Q((y) => [
                        N(a.$slots, `event.${k(p).id}`, oe(ie(y)))
                      ]),
                      key: "5"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots.event ? {
                      name: "event",
                      fn: Q((y) => [
                        N(a.$slots, "event", oe(ie(y)))
                      ]),
                      key: "6"
                    } : void 0,
                    !a.$slots.cell && a.$slots["event-count"] ? {
                      name: "event-count",
                      fn: Q((y) => [
                        N(a.$slots, "event-count", oe(ie(y)))
                      ]),
                      key: "7"
                    } : void 0,
                    a.$slots["now-line"] ? {
                      name: "now-line",
                      fn: Q((y) => [
                        N(a.$slots, "now-line", oe(ie(y)))
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
    ], 14, Rn));
  }
}, qn = (r) => {
  Be.texts = { ...ye.texts, ...r }, Be.dateUtils.updateTexts(Be.texts);
}, {
  addDatePrototypes: Jn,
  removeDatePrototypes: Zn,
  updateTexts: Un,
  addDays: Kn,
  subtractDays: Qn,
  addHours: xn,
  subtractHours: ea,
  addMinutes: ta,
  subtractMinutes: na,
  getWeek: aa,
  isToday: sa,
  isSameDate: la,
  isInRange: ra,
  isLeapYear: oa,
  getPreviousFirstDayOfWeek: ia,
  stringToDate: ua,
  dateToMinutes: ca,
  countDays: da,
  datesInSameTimeStep: va,
  isValid: fa,
  formatDate: ma,
  formatDateLite: ha,
  formatTime: ga,
  formatTimeLite: ya,
  formatMinutes: Da
} = Be.dateUtils;
export {
  Gn as VueCal,
  Jn as addDatePrototypes,
  Kn as addDays,
  xn as addHours,
  ta as addMinutes,
  da as countDays,
  ca as dateToMinutes,
  va as datesInSameTimeStep,
  ma as formatDate,
  ha as formatDateLite,
  Da as formatMinutes,
  ga as formatTime,
  ya as formatTimeLite,
  ia as getPreviousFirstDayOfWeek,
  aa as getWeek,
  ra as isInRange,
  oa as isLeapYear,
  la as isSameDate,
  sa as isToday,
  fa as isValidDate,
  Zn as removeDatePrototypes,
  ua as stringToDate,
  Qn as subtractDays,
  ea as subtractHours,
  na as subtractMinutes,
  Un as updateTexts,
  qn as useLocale
};
