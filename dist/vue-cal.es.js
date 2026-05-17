import { computed as O, reactive as $e, watch as pe, toRefs as Ct, ref as de, onBeforeUnmount as Ne, nextTick as qe, inject as Le, openBlock as F, createElementBlock as G, renderSlot as W, unref as T, Fragment as fe, renderList as be, normalizeClass as De, createCommentVNode as te, createElementVNode as he, createVNode as Pe, Transition as Ue, withCtx as Q, createBlock as He, resolveDynamicComponent as at, mergeProps as ue, toHandlers as Je, normalizeProps as oe, onMounted as tt, toDisplayString as ve, createTextVNode as Ze, withModifiers as lt, normalizeStyle as we, TransitionGroup as rt, createSlots as Ae, useTemplateRef as Ot, useId as Ht, useAttrs as Vt, provide as ot, guardReactiveProps as ie } from "vue";
/**
  * vue-cal v5.0.1-rc.43
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
}, At = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], We = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], ct = (r) => !r || typeof r != "object" || Array.isArray(r) ? !1 : ("from" in r || "to" in r) && ("class" in r || "label" in r || "allowEvents" in r), Ke = (r) => {
  if (!r) return [];
  const e = Array.isArray(r) ? r : [r], o = [];
  for (let n = 0; n < e.length; n++) {
    const v = e[n];
    ct(v) && o.push({ ...v });
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
    const v = Object.keys(n);
    o = v.length;
    for (let _ = 0; _ < v.length; _++) {
      const Y = v[_];
      e.schedules[Y] = Ke(n[Y]);
    }
  }
  return !e.default.length && !o ? null : e;
}, Pt = (r) => {
  const e = {};
  let o = !1;
  for (const n in r) {
    if (!Object.prototype.hasOwnProperty.call(r, n)) continue;
    const v = r[n];
    if (!v) continue;
    let _ = null, Y = null;
    const f = v.default;
    if (f && f.length)
      for (let L = 0; L < f.length; L++) {
        const E = f[L];
        E && E.allowEvents === !1 && typeof E.from == "number" && typeof E.to == "number" && (_ || (_ = []), _.push({ from: E.from, to: E.to }), o = !0);
      }
    const D = v.schedules;
    if (D && typeof D == "object")
      for (const L in D) {
        if (!Object.prototype.hasOwnProperty.call(D, L)) continue;
        const E = D[L];
        if (!E || !E.length) continue;
        const l = [];
        for (let A = 0; A < E.length; A++) {
          const M = E[A];
          M && M.allowEvents === !1 && typeof M.from == "number" && typeof M.to == "number" && (l.push({ from: M.from, to: M.to }), o = !0);
        }
        l.length && (Y || (Y = {}), Y[L] = l);
      }
    if (_ || Y) {
      const L = {};
      _ && (L.default = _), Y && (L.schedules = Y), e[n] = L;
    }
  }
  return { hasAny: o, byWeekday: e };
}, Lt = We.reduce((r, e, o) => (r[e] = o || 7, r), {}), Ft = (r, e, o) => {
  const { dateUtils: n } = r, v = !1, _ = O(() => {
    if (e.view && A.value[e.view]) return e.view;
    if (e.view && !A.value[e.view])
      return console.warn(
        `Vue Cal: the provided view \`${e.view}\` is not in the list of available views. The first available view will be chosen: \`${Object.keys(A.value)[0]}\`.`
      ), Object.keys(A.value)[0];
    const a = e.datePicker ? "month" : "week";
    return A.value[a] ? a : Object.keys(A.value)[0];
  }), Y = O(() => e.sm && !e.xs), f = O(() => e.xs || e.datePicker), D = O(() => e.clickToNavigate || e.datePicker && e.clickToNavigate !== !1), L = O(() => {
    const a = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, w = (H) => H.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [H, u] of Object.entries(o)) {
      const [J, ee, ne] = H.match(/^on(Cell|Event)(.+)$/) || [];
      J && (a[ee.toLowerCase()][w(ne).replace(/^-+|-+$/g, "")] = u);
    }
    return a;
  }), E = O(() => {
    var w;
    const a = {};
    return e.hideWeekends && (a[6] = !0) && (a[7] = !0), (w = e.hideWeekdays) != null && w.length && e.hideWeekdays.forEach((H) => a[Lt[H]] = !0), a;
  }), l = O(() => e.hideWeekends || E.value[6] && E.value[7]), A = O(() => {
    const a = e.datePicker;
    let w = 0, H = {};
    const u = e.views;
    if (a && !u) return {
      month: { ...ye.availableViews.month },
      year: { ...ye.availableViews.year },
      years: { ...ye.availableViews.years }
    };
    if (u)
      Array.isArray(u) ? H = u.reduce((J, ee) => (typeof ee == "string" && ye.availableViews[ee] ? J[ee] = ye.availableViews[ee] : w++, J), {}) : typeof u == "object" && (H = Object.entries(u).reduce((J, [ee, ne]) => {
        const { cols: R, rows: ae } = ye.availableViews[ee];
        return J[ee] = { cols: ne.cols || R, rows: ne.rows || ae }, J;
      }, {})), w && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(H).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), H = { ...ye.availableViews });
    else if (H = { ...ye.availableViews }, e.horizontal) {
      const { days: J, week: ee } = ye.availableViews;
      H.days = { cols: J.rows, rows: J.cols }, H.week = { cols: ee.rows, rows: ee.cols };
    }
    return H;
  }), M = O(() => e.datePicker ? "month" : A.value.week ? "week" : Object.keys(A.value)[0]), c = O(() => {
    if (typeof e.selectedDate == "string") return n.stringToDate(e.selectedDate);
    if (e.selectedDate instanceof Date) return e.selectedDate;
    e.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", e.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), h = O(() => {
    if (!e.disableDays) return [];
    const a = [];
    if (Array.isArray(e.disableDays))
      for (let w of e.disableDays) {
        let H = w;
        typeof w == "string" ? H = n.stringToDate(w) : w instanceof Date && (w = n.formatDate(w, "YYYY-MM-DD")), H instanceof Date && !isNaN(H.getTime()) ? a.push(w) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", w);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", e.disableDays);
    return a;
  }), p = O(() => {
    let a = null;
    return e.minDate && typeof e.minDate == "string" ? a = n.stringToDate(e.minDate) : e.minDate && e.minDate instanceof Date && (a = e.minDate), (a == null ? void 0 : a.getTime()) || null;
  }), s = O(() => {
    let a = null;
    return e.maxDate && typeof e.maxDate == "string" ? a = n.stringToDate(e.maxDate) : e.maxDate && e.maxDate instanceof Date && (a = e.maxDate), (a == null ? void 0 : a.getTime()) || null;
  }), U = O(() => {
    const { view: a } = r, w = e.schedules;
    if (!(w != null && w.length) || !(a.isDay || a.isDays || a.isWeek)) return;
    const H = [];
    for (let u = 0; u < w.length; u++) {
      const J = w[u];
      J.hide || H.push({ ...J, id: J.id ?? u + 1 });
    }
    return H.length ? H : void 0;
  }), y = O(() => {
    const a = e.specialHours, w = e.businessHours;
    return a && typeof a == "object" && !Array.isArray(a) && Object.keys(a).length ? a : w && typeof w == "object" && !Array.isArray(w) ? w : {};
  }), I = O(() => {
    const a = y.value;
    return !a || typeof a != "object" ? {} : Object.entries(a).reduce((w, [H, u]) => {
      if (!We.includes(H)) return w;
      const J = jt(u);
      return J && (w[H] = J), w;
    }, {});
  }), le = O(() => Pt(I.value)), t = O(() => {
    const a = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return e.editableEvents === !0 ? a : e.editableEvents === !1 ? Object.keys(a).map((w) => a[w] = !1) : { ...a, ...e.editableEvents };
  }), V = O(() => {
    const { view: a } = r, { eventCount: w } = e;
    return (Array.isArray(w) ? w.includes(a.id) : w) && (a.isMonth && !e.eventsOnMonthView || a.isYear);
  }), S = O(() => {
    const { view: a } = r;
    return e.allDayEvents && e.time && (a.isDay || a.isDays || a.isWeek);
  }), k = O(() => {
    const { view: a } = r;
    return e.horizontal && (a.isDay || a.isDays || a.isWeek);
  }), $ = O(() => e.timeAtCursor && e.time), g = async (a) => {
    var H;
    let w = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((u) => u.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((u) => u.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((u) => u.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((u) => u.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((u) => u.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((u) => u.default), "../i18n/da.json": () => import("./i18n/da.js").then((u) => u.default), "../i18n/de.json": () => import("./i18n/de.js").then((u) => u.default), "../i18n/el.json": () => import("./i18n/el.js").then((u) => u.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((u) => u.default), "../i18n/en-us.json": () => Promise.resolve().then(() => It).then((u) => u.default), "../i18n/es.json": () => import("./i18n/es.js").then((u) => u.default), "../i18n/et.json": () => import("./i18n/et.js").then((u) => u.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((u) => u.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((u) => u.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((u) => u.default), "../i18n/he.json": () => import("./i18n/he.js").then((u) => u.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((u) => u.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((u) => u.default), "../i18n/id.json": () => import("./i18n/id.js").then((u) => u.default), "../i18n/is.json": () => import("./i18n/is.js").then((u) => u.default), "../i18n/it.json": () => import("./i18n/it.js").then((u) => u.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((u) => u.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((u) => u.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((u) => u.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((u) => u.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((u) => u.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((u) => u.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((u) => u.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((u) => u.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((u) => u.default), "../i18n/no.json": () => import("./i18n/no.js").then((u) => u.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((u) => u.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((u) => u.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((u) => u.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((u) => u.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((u) => u.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((u) => u.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((u) => u.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((u) => u.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((u) => u.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((u) => u.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((u) => u.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((u) => u.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((u) => u.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((u) => u.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((u) => u.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((u) => u.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((u) => u.default) });
    {
      if (!w[`../i18n/${a}.json`]) {
        console.warn(`Vue Cal: the locale \`${a}\` does not exist. Falling back to \`en-us\`.`), a = "en-us";
        return;
      }
      w = await ((H = w[`../i18n/${a}.json`]) == null ? void 0 : H.call(w));
    }
    r.texts = Object.assign(r.texts, Object.assign({ ...ye.texts }, w)), n.updateTexts(r.texts);
  }, N = $e(e.events || []);
  return pe(
    [() => e.events, () => {
      var a;
      return (a = e.events) == null ? void 0 : a.length;
    }],
    ([a]) => N.splice(0, N.length, ...a || [])
  ), pe(() => e.locale, (a) => g(a || "en-us")), (e.locale || !r.texts.today) && g(e.locale || "en-us"), {
    ...Ct(e),
    events: N,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: L,
    defaultView: M,
    availableViews: A,
    disableDays: h,
    ready: v,
    sm: Y,
    xs: f,
    clickToNavigate: D,
    hideWeekdays: E,
    hideWeekends: l,
    minTimestamp: p,
    maxTimestamp: s,
    schedules: U,
    specialHours: I,
    specialHoursDisallowed: le,
    selectedDate: c,
    editableEvents: t,
    showCellEventCount: V,
    allDayEvents: S,
    horizontal: k,
    timeAtCursor: $,
    view: _,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(E.value).length;
    },
    get size() {
      return f.value ? "xs" : Y.value ? "sm" : "lg";
    },
    loadTexts: g
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
}, Ye = ({ start: r, end: e, schedule: o, disallowed: n, hasSchedules: v }) => {
  if (!(n != null && n.hasAny) || !r || !e) return !1;
  const _ = n.byWeekday, Y = r.getTime(), f = e.getTime();
  if (f <= Y) return !1;
  const D = new Date(r);
  D.setHours(0, 0, 0, 0);
  const L = new Date(e);
  for (L.setHours(0, 0, 0, 0); D.getTime() <= L.getTime(); ) {
    const E = We[D.getDay()], l = _[E];
    if (l) {
      let A = l.default;
      if (v && o !== void 0 && o !== null && l.schedules) {
        const c = String(o);
        Object.prototype.hasOwnProperty.call(l.schedules, c) && (A = l.schedules[c]);
      }
      if (!A || !A.length) {
        D.setDate(D.getDate() + 1);
        continue;
      }
      const M = D.getTime();
      for (let c = 0; c < A.length; c++) {
        const { from: h, to: p } = A[c], s = M + h * 6e4, U = M + p * 6e4;
        if (Y < U && f > s) return !0;
      }
    }
    D.setDate(D.getDate() + 1);
  }
  return !1;
}, dt = 6e4, xe = (r, e, o, n, v) => {
  if (!(n != null && n.hasAny)) return e;
  const _ = r.getTime(), Y = e.getTime();
  if (Y <= _ || !Ye({ start: r, end: e, schedule: o, disallowed: n, hasSchedules: v }))
    return e;
  let f = _ + dt, D = Y, L = _;
  for (; f <= D; ) {
    const E = Math.floor((f + D + 1) / 2);
    Ye({ start: r, end: new Date(E), schedule: o, disallowed: n, hasSchedules: v }) ? D = E - 1 : (L = E, f = E + 1);
  }
  return new Date(L);
}, et = (r, e, o, n, v) => {
  if (!(n != null && n.hasAny)) return e;
  const _ = r.getTime(), Y = e.getTime();
  if (_ <= Y || !Ye({ start: e, end: r, schedule: o, disallowed: n, hasSchedules: v }))
    return e;
  let f = Y, D = _ - dt, L = Y;
  for (; f <= D; ) {
    const E = Math.floor((f + D) / 2);
    Ye({ start: new Date(E), end: r, schedule: o, disallowed: n, hasSchedules: v }) ? f = E + 1 : (L = E, D = E - 1);
  }
  return new Date(L);
}, Rt = ({
  anchorDayMinutes: r,
  cursorDayMinutes: e,
  snappedLow: o,
  snappedHigh: n,
  cellDate: v,
  schedule: _,
  disallowed: Y,
  hasSchedules: f
}) => {
  let D = o, L = n;
  if (!(Y != null && Y.hasAny) || L <= D) return { low: D, high: L };
  const E = new Date(v);
  E.setHours(0, 0, 0, 0);
  const l = (p) => {
    const s = new Date(E);
    return s.setMinutes(p), s;
  }, A = l(D), M = l(L);
  if (!Ye({ start: A, end: M, schedule: _, disallowed: Y, hasSchedules: f })) return { low: D, high: L };
  const c = E.getTime(), h = (p) => Math.round((p.getTime() - c) / 6e4);
  if (r <= e) {
    const p = xe(A, M, _, Y, f);
    L = h(p);
  } else {
    const p = et(M, A, _, Y, f);
    D = h(p);
  }
  return { low: D, high: L };
}, Xt = ({
  proposedStart: r,
  proposedEnd: e,
  prevStart: o,
  prevEnd: n,
  schedule: v,
  disallowed: _,
  hasSchedules: Y
}) => {
  if (!(_ != null && _.hasAny)) return { start: r, end: e };
  let f = r, D = e;
  if (D.getTime() <= f.getTime()) return { start: f, end: D };
  if (!Ye({ start: f, end: D, schedule: v, disallowed: _, hasSchedules: Y })) return { start: f, end: D };
  const L = o.getTime(), E = n.getTime(), l = f.getTime(), M = D.getTime() !== E, c = l !== L;
  if (M && !c)
    return D = xe(f, D, v, _, Y), { start: f, end: D };
  if (c && !M)
    return f = et(D, f, v, _, Y), { start: f, end: D };
  const h = xe(f, D, v, _, Y);
  return Ye({ start: f, end: h, schedule: v, disallowed: _, hasSchedules: Y }) ? (f = et(D, f, v, _, Y), { start: f, end: D }) : { start: f, end: h };
}, Ge = $e({ id: null, date: null });
let it = !1, Qe = !0;
const ke = $e({ el: null, cell: null, timeout: null }), Te = $e({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function Bt(r) {
  const { config: e, view: o, eventsManager: n, emit: v, uid: _, dateUtils: Y } = r, f = (p) => {
    var V;
    const s = e.horizontal, { clientX: U, clientY: y } = ((V = p.touches) == null ? void 0 : V[0]) || p, { top: I, left: le } = p.currentTarget.getBoundingClientRect(), t = ~~p.dataTransfer.getData("cursor-grab-at");
    if (s) {
      const S = U - le - t;
      return Se(S * 100 / p.currentTarget.clientWidth, e);
    } else {
      const S = y - I - t;
      return Se(nt(S, p.currentTarget), e);
    }
  }, D = (p, s, U) => {
    const y = s.duration || L(s.start, s.end) || e.timeStep;
    let I = Math.max(f(p), 0);
    if (e.snapToInterval) {
      const S = I + e.snapToInterval / 2;
      I = S - S % e.snapToInterval;
    }
    const le = new Date(new Date(U).setMinutes(I)), t = Math.min(I + y, 1440), V = new Date(new Date(U).setMinutes(t));
    return { start: le, end: V };
  }, L = (p, s) => Math.round((s - p) / 6e4);
  return {
    eventDragStart: (p, s) => {
      if (p.target.nodeType === 3 || r.touch.isResizingEvent) return p.preventDefault();
      p.dataTransfer.effectAllowed = "move", p.dataTransfer.dropEffect = "move";
      const U = { ...s, _: { id: s._.id, duration: L(s.start, s.end) } };
      try {
        p.dataTransfer.setData("text/plain", ""), p.dataTransfer.setData("event", JSON.stringify(U)), p.dataTransfer.setData("cursor-grab-at", e.horizontal ? p.offsetX : p.offsetY);
      } catch (I) {
        return console.warn("Vue Cal: Failed to set drag data:", I), p.preventDefault();
      }
      Te.eventId = s._.id, Te.fromVueCal = _, v("event-drag-start", {
        e: p,
        event: s
      });
      const y = p.target.closest(".vuecal__event");
      y.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        y.classList.add("vuecal__event--dragging-original"), y.classList.remove("vuecal__event--dragging-ghost");
      }, 0), it = !1, Object.assign(Ge, { id: o.id, date: o.firstCellDate }), Qe = !0, r.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (p, s) => {
      Te.eventId = null, p.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: U, toVueCal: y } = Te;
      y && U !== y && n.deleteEvent(s._.id, 3), it && Qe && Ge.id && o.switchView(Ge.id, Ge.date, !0), v("event-drag-end", {
        e: p,
        event: s,
        external: Te.fromVueCal !== _
      }), Te.fromVueCal = null, Te.toVueCal = null, r.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (p, s) => {
      const { start: U } = s, y = p.currentTarget;
      if (!p.currentTarget.contains(p.relatedTarget)) {
        if (y === ke.el || !y.className.includes("vuecal__cell-content")) return !1;
        ke.el && (ke.cell.highlighted = !1), Object.assign(ke, { el: y, cell: s, timeout: clearTimeout(ke.timeout) }), s.highlighted = !0, ["years", "year", "month"].includes(o.id) && (ke.timeout = setTimeout(() => r.switchToNarrowerView(U), 2e3));
      }
    },
    cellDragOver: (p, s) => {
      const { start: U, schedule: y } = s;
      p.preventDefault(), s.highlighted = !0, (y || y === 0) && (s.highlightedSchedule = y);
    },
    cellDragLeave: (p, s) => {
      p.preventDefault(), !p.currentTarget.contains(p.relatedTarget) && (s.highlightedSchedule = !1, ke.cell === s && (clearTimeout(ke.timeout), Object.assign(ke, { el: null, cell: null, timeout: null }), s.highlighted = !1));
    },
    cellDragDrop: async (p, s, U = !1) => {
      var w, H, u, J, ee, ne;
      p.preventDefault(), clearTimeout(ke.timeout), Object.assign(ke, { el: null, cell: null, timeout: null });
      const y = JSON.parse(p.dataTransfer.getData("event") || "{}");
      y.start && (y.start = new Date(y.start)), y.end && (y.end = new Date(y.end));
      let I, le, t;
      U ? (le = new Date(s.start), t = new Date(s.end)) : { start: le, end: t } = D(p, y, s.start);
      let { schedule: V } = ((w = p.target.closest("[data-schedule]")) == null ? void 0 : w.dataset) || {}, S;
      V !== void 0 && String(V).length && (S = ((u = (H = e.schedules) == null ? void 0 : H.find((R) => String(R.id) === String(V))) == null ? void 0 : u.id) ?? V);
      let k = () => {
      };
      Te.fromVueCal === _ ? (I = n.getEvent(y._.id), I && (I._.dragging = !1, k = (R) => {
        if (I.start = le, I.end = t, I.allDay = U, S !== void 0 && (I.schedule = S), R && typeof R == "object") {
          const { _: ae, ...i } = R;
          Object.assign(I, i);
        }
      })) : (I = {
        ...y,
        start: le,
        end: t,
        ...S !== void 0 && { schedule: S },
        _: { id: ((J = y._) == null ? void 0 : J.id) || y.id, duration: L(le, t) },
        getOverlappingEvents: () => n.getEventsInRange(le, t, { schedule: S })
      }, k = (R) => {
        if (I = n.createEvent(I), R && typeof R == "object") {
          const { _: ae, ...i } = R;
          Object.assign(I, i);
        }
      });
      const $ = S !== void 0 ? S : (I == null ? void 0 : I.schedule) !== void 0 ? I.schedule : y == null ? void 0 : y.schedule, g = !!(e.schedules && e.schedules.length);
      let N = !0;
      const { drop: a } = (ee = e.eventListeners) == null ? void 0 : ee.event;
      !U && e.time && ((ne = e.specialHoursDisallowed) != null && ne.hasAny) && Ye({
        start: le,
        end: t,
        schedule: $,
        disallowed: e.specialHoursDisallowed,
        hasSchedules: g
      }) ? N = !1 : a && (N = await a({
        e: p,
        event: { ...I, start: le, end: t, schedule: S },
        overlaps: I.getOverlappingEvents({ start: le, end: t, schedule: S }),
        cell: s,
        external: Te.fromVueCal !== _
      })), N !== !1 && k(N), s.highlighted = !1, s.highlightedSchedule = null, Qe = !1, Te.toVueCal = _, v("event-dropped", {
        e: p,
        cell: s,
        event: I,
        originalEvent: y,
        external: Te.fromVueCal !== _
      });
    }
  };
}
const vt = (r, e) => {
  let o, n, v, _ = {}, Y = {};
  const f = de(r), D = () => {
    f.value.today || (f.value = e), Date.prototype.addDays = function(i) {
      return A(this, i || 0);
    }, Date.prototype.subtractDays = function(i) {
      return M(this, i || 0);
    }, Date.prototype.addHours = function(i) {
      return c(this, i || 0);
    }, Date.prototype.subtractHours = function(i) {
      return h(this, i || 0);
    }, Date.prototype.addMinutes = function(i) {
      return p(this, i || 0);
    }, Date.prototype.subtractMinutes = function(i) {
      return s(this, i || 0);
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
  }, E = (i) => {
    f.value = i, Date.prototype.subtractDays && D();
  }, l = () => (n !== (/* @__PURE__ */ new Date()).getDate() && (o = /* @__PURE__ */ new Date(), n = o.getDate(), v = `${o.getFullYear()}-${o.getMonth()}-${o.getDate()}`), v), A = (i, z) => {
    const b = new Date(i.valueOf());
    return b.setDate(b.getDate() + z), b;
  }, M = (i, z) => {
    const b = new Date(i.valueOf());
    return b.setDate(b.getDate() - z), b;
  }, c = (i, z) => {
    const b = new Date(i.valueOf());
    return b.setHours(b.getHours() + z), b;
  }, h = (i, z) => {
    const b = new Date(i.valueOf());
    return b.setHours(b.getHours() - z), b;
  }, p = (i, z) => {
    const b = new Date(i.valueOf());
    return b.setMinutes(b.getMinutes() + z), b;
  }, s = (i, z) => {
    const b = new Date(i.valueOf());
    return b.setMinutes(b.getMinutes() - z), b;
  }, U = (i, z) => {
    const b = (x) => {
      const se = x % z;
      return se !== 0 && (x += se >= z / 2 ? z - se : -se), x;
    };
    if (typeof i == "number") return b(i);
    if (i instanceof Date) {
      let x = b(i.getMinutes());
      x >= 60 && (i.setHours(i.getHours() + 1), x = 0), i.setMinutes(x, 0, 0);
    }
  }, y = (i, z = !1) => {
    const b = new Date(Date.UTC(i.getFullYear(), i.getMonth(), i.getDate())), x = b.getUTCDay() || 7;
    b.setUTCDate(b.getUTCDate() + 4 - x);
    const se = new Date(Date.UTC(b.getUTCFullYear(), 0, 1));
    return Math.ceil(((b - se) / 864e5 + 1) / 7) + (z ? 1 : 0);
  }, I = (i) => `${i.getFullYear()}-${i.getMonth()}-${i.getDate()}` === l(), le = (i, z) => {
    if (!i || !z) return console.warn(`Vue Cal: missing date${i ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (a(i)) {
      if (!a(z)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${z}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${i}\`.`);
    return i.getFullYear() === z.getFullYear() && i.getMonth() === z.getMonth() && i.getDate() === z.getDate();
  }, t = (i, z, b) => a(i) ? i.getTime() >= z && i.getTime() <= b : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${i}\`.`), V = (i) => {
    const z = i.getFullYear();
    return !(z % 400) || z % 100 && !(z % 4);
  }, S = (i = null, z) => {
    const b = i && new Date(i.valueOf()) || /* @__PURE__ */ new Date(), x = z ? 7 : 6;
    return b.setDate(b.getDate() - (b.getDay() + x) % 7), b;
  }, k = (i) => i instanceof Date ? i : (i.length === 10 && (i += " 00:00"), new Date(i.replace(/-/g, "/"))), $ = (i) => i.getHours() * 60 + i.getMinutes(), g = (i, z) => {
    typeof i == "string" && (i = i.replace(/-/g, "/")), typeof z == "string" && (z = z.replace(/-/g, "/")), i = new Date(i).setHours(0, 0, 0, 0), z = new Date(z).setHours(0, 0, 1, 0);
    const b = (new Date(z).getTimezoneOffset() - new Date(i).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((z - i - b) / (24 * 3600 * 1e3));
  }, N = (i, z, b) => Math.abs(i.getTime() - z.getTime()) <= b * 60 * 1e3, a = (i) => i && i instanceof Date && !isNaN(i), w = (i, z = "YYYY-MM-DD", b = null) => {
    if (b || (b = f.value), z || (z = "YYYY-MM-DD"), z === "YYYY-MM-DD") return H(i);
    _ = {}, Y = {};
    const x = {
      YYYY: () => R(i, b).YYYY,
      YY: () => R(i, b).YY(),
      M: () => R(i, b).M,
      MM: () => R(i, b).MM(),
      MMM: () => R(i, b).MMM(),
      MMMM: () => R(i, b).MMMM(),
      MMMMG: () => R(i, b).MMMMG(),
      D: () => R(i, b).D,
      DD: () => R(i, b).DD(),
      S: () => R(i, b).S(),
      d: () => R(i, b).d,
      dd: () => R(i, b).dd(),
      ddd: () => R(i, b).ddd(),
      dddd: () => R(i, b).dddd(),
      HH: () => ae(i, b).HH,
      H: () => ae(i, b).H,
      hh: () => ae(i, b).hh,
      h: () => ae(i, b).h,
      am: () => ae(i, b).am,
      AM: () => ae(i, b).AM,
      mm: () => ae(i, b).mm,
      m: () => ae(i, b).m,
      s: () => ae(i, b).s
    };
    return z.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (se, me) => {
      const ce = x[me.replace(/\{|\}/g, "")];
      return ce !== void 0 ? ce() : me;
    });
  }, H = (i) => {
    const z = i.getMonth() + 1, b = i.getDate();
    return `${i.getFullYear()}-${z < 10 ? "0" : ""}${z}-${b < 10 ? "0" : ""}${b}`;
  }, u = (i, z = "HH:mm", b = null, x = !1) => {
    let se = !1;
    if (x) {
      const [Ve, ge, m] = [i.getHours(), i.getMinutes(), i.getSeconds()];
      Ve + ge + m === 141 && (se = !0);
    }
    if (i instanceof Date && z === "HH:mm") return se ? "24:00" : J(i);
    Y = {}, b || (b = f.value);
    const me = ae(i, b), ce = z.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (Ve, ge) => {
      const m = me[ge.replace(/\{|\}/g, "")];
      return m !== void 0 ? m : ge;
    });
    return se ? ce.replace("23:59", "24:00") : ce;
  }, J = (i) => {
    const z = i.getHours(), b = i.getMinutes();
    return `${(z < 10 ? "0" : "") + z}:${(b < 10 ? "0" : "") + b}`;
  }, ee = (i) => {
    const z = Math.floor(i / 60).toString().padStart(2, 0), b = (i % 60).toString().padStart(2, 0);
    return `${z}:${b}`;
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
  }, R = (i, z) => {
    if (_.D) return _;
    const b = i.getFullYear(), x = i.getMonth() + 1, se = i.getDate(), ce = (i.getDay() - 1 + 7) % 7;
    return _ = {
      // Year.
      YYYY: b,
      // 2024.
      YY: () => b.toString().substring(2),
      // 24.
      // Month.
      M: x,
      // 1 to 12.
      MM: () => x.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => z.months[x - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => z.months[x - 1],
      // January to December.
      MMMMG: () => (z.monthsGenitive || z.months)[x - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: se,
      // 1 to 31.
      DD: () => se.toString().padStart(2, 0),
      // 01 to 31.
      S: () => ne(se),
      // st, nd, rd, th.
      // Day of the week.
      d: ce + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => z.weekDaysShort.length ? z.weekDaysShort[ce] : z.weekDays[ce][0],
      // M to S.
      ddd: () => z.weekDaysShort.length ? z.weekDaysShort[ce] : z.weekDays[ce].substr(0, 3),
      // Mon to Sun.
      dddd: () => z.weekDays[ce]
      // Monday to Sunday.
    }, _;
  }, ae = (i, z) => {
    if (Y.am) return Y;
    let b, x, se;
    i instanceof Date ? (b = i.getHours(), x = i.getMinutes(), se = i.getSeconds()) : (b = Math.floor(i / 60), x = Math.floor(i % 60));
    const me = b % 12 ? b % 12 : 12, ce = (z || { am: "am", pm: "pm" })[b === 24 || b < 12 ? "am" : "pm"];
    return Y = {
      H: b,
      h: me,
      HH: b.toString().padStart(2, 0),
      hh: me.toString().padStart(2, 0),
      am: ce,
      AM: ce.toUpperCase(),
      m: x,
      mm: x.toString().padStart(2, 0),
      s: se
    }, Y;
  };
  return {
    addDatePrototypes: D,
    removeDatePrototypes: L,
    updateTexts: E,
    addDays: A,
    subtractDays: M,
    addHours: c,
    subtractHours: h,
    addMinutes: p,
    subtractMinutes: s,
    snapToInterval: U,
    getWeek: y,
    isToday: I,
    isSameDate: le,
    isInRange: t,
    isLeapYear: V,
    getPreviousFirstDayOfWeek: S,
    stringToDate: k,
    dateToMinutes: $,
    countDays: g,
    datesInSameTimeStep: N,
    isValid: a,
    formatDate: w,
    formatDateLite: H,
    formatTime: u,
    formatTimeLite: J,
    formatMinutes: ee
  };
}, Wt = (r) => {
  const { dateUtils: e, config: o } = r;
  let n = 0;
  const v = O(() => {
    var S, k, $, g, N;
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
    }, V = o.events.slice().sort((a, w) => a.start - w.start < 0 ? -1 : 1);
    for (let a of V) {
      const w = typeof a.start == "string" || typeof a.end == "string", H = !((S = a._) != null && S.register) || !a.isOverlapping || !a.delete;
      let u = !1;
      if (!w && ((k = a._) != null && k.cachedStart) && (($ = a._) != null && $.cachedEnd) && (u = a.start.getTime() !== ((g = a._) == null ? void 0 : g.cachedStart) || a.end.getTime() !== ((N = a._) == null ? void 0 : N.cachedEnd)), w || H || u) {
        if (!_(a)) continue;
        Y(a), a._.cachedStart = a.start.getTime(), a._.cachedEnd = a.end.getTime();
      }
      if (t.byId[a._.id] = a, a.recurring)
        t.recurring.push(a._.id);
      else if (!e.isSameDate(a.start, new Date(a.end.getTime() - 1)))
        a._.multiday = o.multidayEvents, o.multidayEvents ? t.multiday.push(a._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), a.end = new Date(new Date(a.start).setHours(23, 59, 59, 999)), Y(a)), t.byDate[a._.startFormatted] || (t.byDate[a._.startFormatted] = []), t.byDate[a._.startFormatted].push(a._.id);
      else {
        t.byDate[a._.startFormatted] || (t.byDate[a._.startFormatted] = []), t.byDate[a._.startFormatted].push(a._.id);
        const J = a._.startFormatted.substring(0, 4), ee = a._.startFormatted.substring(5, 7), ne = a._.startFormatted.substring(8, 10);
        t.byYear[J] || (t.byYear[J] = {}), t.byYear[J][ee] || (t.byYear[J][ee] = {}), t.byYear[J][ee][ne] || (t.byYear[J][ee][ne] = []), t.byYear[J][ee][ne].push(a._.id);
      }
    }
    return t;
  }), _ = (t) => !t.start || !t.end ? (console.error("Vue Cal: Event is missing start or end date", t), !1) : (typeof t.start == "string" && (t.start = e.stringToDate(t.start)), typeof t.end == "string" && (t.end = e.stringToDate(t.end)), t.start.setSeconds(0, 0), t.end.getSeconds() === 59 ? t.end.setMinutes(t.end.getMinutes() + 1, 0, 0) : t.end.setSeconds(0, 0), isNaN(t.start) || isNaN(t.end) || t.end.getTime() < t.start.getTime() ? (isNaN(t.start) ? console.error(`Vue Cal: invalid start date for event "${t.title}".`, t.start) : isNaN(t.end) ? console.error(`Vue Cal: invalid end date for event "${t.title}".`, t.end) : console.error(`Vue Cal: invalid event dates for event "${t.title}". The event ends before it starts.`, t.start, t.end), !1) : !0), Y = (t) => {
    t._ || (t._ = {}), t._.id = t._.id || ++n, t._.multiday = !e.isSameDate(t.start, new Date(t.end.getTime() - 1)), t._.startFormatted = e.formatDate(t.start), t._.endFormatted = e.formatDate(t.end), t._.startMinutes = ~~e.dateToMinutes(t.start), t._.endMinutes = ~~e.dateToMinutes(t.end);
    const V = t.start.getHours(), S = t.start.getMinutes().toString().padStart(2, 0), k = t.end.getHours(), $ = t.end.getMinutes().toString().padStart(2, 0);
    t._.startTimeFormatted24 = `${V.toString().padStart(2, 0)}:${S}`, t._.startTimeFormatted12 = `${V % 12 || 12}${S ? `:${S}` : ""} ${V < 12 ? "AM" : "PM"}`, t._.endTimeFormatted24 = `${k.toString().padStart(2, 0)}:${$}`, t._.endTimeFormatted12 = `${k % 12 || 12}${$ ? `:${$}` : ""} ${k < 12 ? "AM" : "PM"}`, t._.duration = Math.abs(~~((t.end - t.start) / 6e4)), t.delete || (t.delete = function(g) {
      return E(this._.id, g);
    }), t._.deleting === void 0 && (t._.deleting = !1), t._.deleted === void 0 && (t._.deleted = !1), t.isOverlapping || (t.isOverlapping = function(g = null) {
      return this.getOverlappingEvents(g).length;
    }), t.getOverlappingEvents || (t.getOverlappingEvents = function(g = null) {
      var u;
      const N = (g == null ? void 0 : g.start) || this.start, a = (g == null ? void 0 : g.end) || this.end, w = (g == null ? void 0 : g.schedule) !== void 0 && (g == null ? void 0 : g.schedule) !== null ? g.schedule : this.schedule, H = (u = o.schedules) != null && u.length ? w : null;
      return A(N, a, { excludeIds: [this._.id], schedule: H });
    }), t._.register || (t._.register = (g) => {
      t._.$el = g, t._.fireCreated && (r.emit("event-created", t), delete t._.fireCreated);
    }), t._.unregister || (t._.unregister = () => {
      t._.$el = null, t._.register = null, t.isOverlapping = null, t.getOverlappingEvents = null, t.delete = null;
    });
  }, f = (t) => v.value.byId[t], D = (t) => {
    const V = [];
    for (const { start: S, end: k } of t) {
      const $ = A(S, k);
      $.length && V.push(...$);
    }
    return V;
  }, L = (t) => {
    var k;
    if (!t.start || !t.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    o.snapToInterval && (e.snapToInterval(t.start, o.snapToInterval), e.snapToInterval(t.end, o.snapToInterval)), t = { ...t };
    const V = typeof t.start == "string" ? e.stringToDate(t.start) : new Date(t.start), S = typeof t.end == "string" ? e.stringToDate(t.end) : new Date(t.end);
    if (!t.allDay && o.time && ((k = o.specialHoursDisallowed) != null && k.hasAny) && Ye({
      start: V,
      end: S,
      schedule: t.schedule,
      disallowed: o.specialHoursDisallowed,
      hasSchedules: !!(o.schedules && o.schedules.length)
    })) {
      console.warn("Vue Cal: Cannot create an event overlapping a time range where allowEvents is false.");
      return;
    }
    return t.start = V, t.end = S, t._ || (t._ = {}), t._.id = ++n, t._.fireCreated = !0, o.events.push(t), t;
  }, E = async (t, V = 0) => {
    var N, a;
    if (!t) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let S = typeof t == "string" || !isNaN(t) ? t : null;
    const k = typeof t == "object" ? Object.entries(t) : null;
    if (k) {
      const [w, H] = k[0];
      S = (N = o.events.find((u) => u[w] === H)) == null ? void 0 : N._.id;
    }
    if (!o.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!S) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const $ = o.events.findIndex((w) => w._.id === S);
    if ($ === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${S}\`.`);
    const g = o.events[$];
    if (g.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${S}\` since it was explicitely set to \`delete: false\`.`);
    switch (V) {
      case 0:
        g._.deleting ? o.events.splice($, 1) : g._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        g._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        g._.deleted = !0, o.events[$]._.deleted = !0, (a = g._.$el) == null || a.dispatchEvent(new CustomEvent("event-deleted", { detail: g._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        o.events.splice($, 1), r.emit("update:events", o.events), r.emit("event-delete", g);
        break;
    }
    return !0;
  }, l = (t, V, S) => {
    const k = o.allDayEvents ? { allDay: S } : {}, $ = A(t, V, { background: !1, ...k });
    if (!$.length) return { cellOverlaps: {}, longestStreak: 0 };
    const g = {};
    let N = [], a = 0;
    $.sort((w, H) => w.start - H.start || w.end - w.start - (H.end - H.start));
    for (const w of $) {
      const H = w._.id;
      g[H] || (g[H] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), N = N.filter((R) => R.end > w.start);
      const u = N.filter((R) => {
        var i;
        return (!((i = o.schedules) != null && i.length) || w.schedule === R.schedule) && R.start < w.end;
      }), J = new Set(u.map((R) => {
        var ae;
        return ((ae = g[R._.id]) == null ? void 0 : ae.position) ?? 0;
      }));
      let ee = 0;
      for (; J.has(ee); ) ee++;
      g[H].position = ee, N.push(w);
      const ne = Math.max(1, ...u.map((R) => {
        var ae;
        return ((ae = g[R._.id]) == null ? void 0 : ae.maxConcurrent) ?? 1;
      }));
      g[H].maxConcurrent = Math.max(u.length + 1, ne);
      for (const R of u)
        g[R._.id].overlaps.add(H), g[H].overlaps.add(R._.id), g[R._.id].maxConcurrent = g[H].maxConcurrent;
      a = Math.max(a, g[H].maxConcurrent);
    }
    for (const w in g) g[w].overlaps = [...g[w].overlaps];
    return { cellOverlaps: g, longestStreak: a };
  }, A = (t, V, { excludeIds: S = [], schedule: k = null, background: $ = !0, allDay: g = !1 } = {}) => {
    const { byId: N, byYear: a } = v.value, w = Object.keys(N).length;
    if (!w) return [];
    const H = t.getFullYear(), u = V.getFullYear(), J = t.getMonth() + 1, ee = V.getMonth() + 1, ne = t.getDate(), R = V.getDate(), ae = new Date(t).setHours(0, 0, 0, 0), i = new Date(V).setHours(23, 59, 59, 999), z = new Set(S), b = [];
    if (w <= 100) {
      for (const x of Object.values(N))
        !x || z.has(x._.id) || k !== null && k !== x.schedule || $ === !1 && x.background || o.allDayEvents && (g && !x.allDay || !g && x.allDay) || x.start.getTime() < i && x.end.getTime() > ae && b.push(x);
      return b;
    }
    for (let x = H; x <= u; x++) {
      const se = `${x}`, me = a[se];
      if (!me) continue;
      const ce = x === H ? J : 1, Ve = x === u ? ee : 12;
      for (let ge = ce; ge <= Ve; ge++) {
        const m = String(ge).padStart(2, "0"), j = me[m];
        if (j)
          for (const P in j) {
            const q = +P;
            if (x === H && ge === J && q < ne || x === u && ge === ee && q > R) continue;
            const K = j[P];
            if (K != null && K.length)
              for (let X = 0; X < K.length; X++) {
                const d = N[K[X]];
                !d || z.has(d._.id) || k !== null && k !== d.schedule || $ === !1 && d.background || o.allDayEvents && (g && !d.allDay || !g && d.allDay) || d.start.getTime() < i && d.end.getTime() > ae && b.push(d);
              }
          }
      }
    }
    return b;
  }, M = (t, V, S) => {
    const k = t.allDay || !o.time, $ = k ? new Date(t.start).setHours(0, 0, 0, 0) : t.start.getTime(), g = k ? new Date(t.end).setHours(23, 59, 59, 999) : t.end.getTime(), N = k ? new Date(V).setHours(0, 0, 0, 0) : V.getTime(), a = k ? new Date(S).setHours(23, 59, 59, 999) : S.getTime();
    return g > N && $ < a;
  }, c = $e({
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
  }), h = (t, V) => {
    var N;
    const S = c[o.horizontal ? "movePercentageX" : "movePercentageY"];
    let k = Se(S, o);
    if (k = Math.max(0, Math.min(k, 1440)), o.snapToInterval) {
      const a = k + o.snapToInterval / 2;
      k = a - a % o.snapToInterval;
    }
    let $ = t.start, g = new Date(V.getTime() + k * 6e4);
    return c.moveX && ((N = r.touch) != null && N.currentHoveredCell) && c.cellEl && new Date(parseInt(r.touch.currentHoveredCell.dataset.start)), g < c.resizeStartDate && ($ = g, g = c.resizeStartDate), { newStart: $, newEnd: g };
  }, p = 4, s = (t, V) => {
    if (!c.cellEl) return;
    const { top: S, left: k, width: $, height: g } = c.cellEl.getBoundingClientRect();
    c.moveX = t - k, c.moveY = V - S, c.movePercentageX = c.moveX * 100 / $, c.movePercentageY = c.moveY * 100 / g, c.documentMouseX = t, c.documentMouseY = V;
  }, U = (t, V) => {
    var a, w;
    const S = new Date(t.start), k = new Date(t.end);
    let { newStart: $, newEnd: g } = h(t, V);
    if (o.time && !t.allDay && ((a = o.specialHoursDisallowed) != null && a.hasAny)) {
      const H = Xt({
        proposedStart: $,
        proposedEnd: g,
        prevStart: S,
        prevEnd: k,
        schedule: t.schedule,
        disallowed: o.specialHoursDisallowed,
        hasSchedules: !!(o.schedules && o.schedules.length)
      });
      $ = H.start, g = H.end;
    }
    const N = !o.time || t.allDay || !((w = o.specialHoursDisallowed) != null && w.hasAny) || !Ye({
      start: $,
      end: g,
      schedule: t.schedule,
      disallowed: o.specialHoursDisallowed,
      hasSchedules: !!(o.schedules && o.schedules.length)
    });
    return { newStart: $, newEnd: g, internalOk: N };
  }, y = async (t) => {
    var g, N, a, w;
    const { clientX: V, clientY: S } = ((g = t.touches) == null ? void 0 : g[0]) || t, k = V - c.resizeAnchorClientX, $ = S - c.resizeAnchorClientY;
    if (!c.resizeSlopExceeded) {
      if (k * k + $ * $ <= p) return;
      c.resizeSlopExceeded = !0;
    }
    if (s(V, S), c.fromResizer && !c.resizingOriginalEvent) {
      c.resizingOriginalEvent = { ...c.resizingEvent, _: { ...c.resizingEvent._ } };
      const H = ((N = o.eventListeners) == null ? void 0 : N.event) || {};
      (a = H["resize-start"]) == null || a.call(H, { e: t, event: c.resizingEvent });
    }
    if (c.fromResizer && c.resizingEvent) {
      const H = new Date(parseInt(c.cellEl.dataset.start)), { newStart: u, newEnd: J, internalOk: ee } = U(c.resizingEvent, H);
      let ne = ee;
      const { resize: R } = ((w = o.eventListeners) == null ? void 0 : w.event) || {};
      ee && R && (ne = await R({
        e: t,
        event: { ...c.resizingEvent, start: u, end: J },
        overlaps: c.resizingEvent.getOverlappingEvents({ start: u, end: J })
      })), ne !== !1 ? (c.resizingEvent.start = u, c.resizingEvent.end = J, c.resizingLastAcceptedEvent && (c.resizingLastAcceptedEvent = null), t.preventDefault()) : R && (c.resizingLastAcceptedEvent = { ...c.resizingEvent, _: { ...c.resizingEvent._ } });
    }
  }, I = async (t) => {
    var V, S, k, $, g;
    if ((V = r.touch) != null && V.isResizingEvent && c.resizingEvent) {
      const { clientX: N, clientY: a } = ((S = t.changedTouches) == null ? void 0 : S[0]) || t;
      if (!c.resizeSlopExceeded)
        c.resizingEvent.start = new Date(c.resizeStartDate), c.resizingEvent.end = new Date(c.resizeBaselineEndMs);
      else {
        s(N, a);
        const w = new Date(parseInt(c.cellEl.dataset.start)), { newStart: H, newEnd: u, internalOk: J } = U(c.resizingEvent, w);
        let ee = J;
        const R = (((k = o.eventListeners) == null ? void 0 : k.event) || {})["resize-end"];
        J && R && (ee = await R({
          e: t,
          event: c.resizingEvent,
          original: c.resizingOriginalEvent,
          // Original event details before resizing.
          overlaps: c.resizingEvent.getOverlappingEvents({ start: H, end: u })
        })), c.resizingEvent.start = ee === !1 ? (c.resizingLastAcceptedEvent || c.resizingOriginalEvent).start : (($ = c.resizingLastAcceptedEvent) == null ? void 0 : $.start) || H, c.resizingEvent.end = ee === !1 ? (c.resizingLastAcceptedEvent || c.resizingOriginalEvent).end : ((g = c.resizingLastAcceptedEvent) == null ? void 0 : g.end) || u, c.resizingEvent._.duration < 1 && c.resizingOriginalEvent && (c.resizingEvent.start = c.resizingOriginalEvent.start, c.resizingEvent.end = c.resizingOriginalEvent.end);
      }
      r.touch.isResizingEvent = !1, r.touch.currentHoveredCell = null;
    }
    document.removeEventListener(t.type === "touchend" ? "touchmove" : "mousemove", y, { passive: !c.fromResizer }), r.touch.isResizingEvent = !1, c.fromResizer = !1, c.resizingEvent = null, c.resizingOriginalEvent = null, c.resizingLastAcceptedEvent = null, c.startX = 0, c.startY = 0, c.moveX = 0, c.moveY = 0, c.startPercentageX = 0, c.startPercentageY = 0, c.movePercentageX = 0, c.movePercentageY = 0, c.documentMouseX = 0, c.documentMouseY = 0, c.cellEl = null, c.resizeStartDate = null, c.resizeBaselineEndMs = null, c.schedule = null, c.resizeAnchorClientX = 0, c.resizeAnchorClientY = 0, c.resizeSlopExceeded = !1;
  };
  return {
    events: v,
    resizeState: c,
    getEvent: f,
    getViewEvents: D,
    getCellOverlappingEvents: l,
    getEventsInRange: A,
    createEvent: L,
    deleteEvent: E,
    isEventInRange: M,
    handleEventResize: (t, V, S) => {
      var $;
      const k = (($ = t.touches) == null ? void 0 : $[0]) || t;
      if (c.fromResizer = !!k.target.closest(".vuecal__event-resizer"), c.fromResizer) {
        r.touch.isResizingEvent = !0;
        const g = S.getBoundingClientRect();
        c.startX = k.clientX - g.left, c.startY = k.clientY - g.top, c.startPercentageX = c.startX * 100 / g.width, c.startPercentageY = c.startY * 100 / g.height, c.cellEl = S.closest(".vuecal__cell"), c.resizeStartDate = new Date(V.start.getTime()), c.resizeBaselineEndMs = V.end.getTime(), c.resizingEvent = V, c.resizeAnchorClientX = k.clientX, c.resizeAnchorClientY = k.clientY, c.resizeSlopExceeded = !1, document.addEventListener(t.type === "touchstart" ? "touchmove" : "mousemove", y, { passive: !c.fromResizer }), document.addEventListener(t.type === "touchstart" ? "touchend" : "mouseup", I, { once: !0 });
      }
    }
  };
}, Nt = ({ config: r, dateUtils: e, emit: o, texts: n, eventsManager: v }, _) => {
  const { availableViews: Y } = r, f = de(r.view && Y[r.view] ? r.view : r.defaultView), D = de(r.selectedDate || null), L = de(/* @__PURE__ */ new Date()), E = de(new Date(r.viewDate || L.value));
  E.value.setHours(0, 0, 0, 0);
  const l = de(new Date(E));
  let A = null;
  const M = O(() => f.value === "month" ? l.value : S.value), c = O(() => f.value === "month" ? new Date(l.value.getFullYear(), l.value.getMonth() + 1, 0, 23, 59, 59, 999) : $.value), h = O(() => f.value === "week" ? e.getPreviousFirstDayOfWeek(S.value, r.startWeekOnSunday) : f.value === "month" ? S.value : M.value), p = O(() => {
    if (f.value === "week") {
      const d = e.addDays(h.value, 7);
      return d.setMilliseconds(-1), d;
    }
    return f.value === "month" ? $.value : c.value;
  }), s = O(() => {
    const d = L.value.getTime();
    if (f.value === "week")
      return h.value.getTime() <= d && d <= p.value.getTime();
    const C = S.value.getTime(), B = $.value.getTime();
    return C <= d && d <= B;
  }), U = $e({
    show: O(() => {
      if (["day", "days", "week"].includes(f.value) && !(!s.value || !r.time || r.allDay) && !(r.timeFrom > e.dateToMinutes(L.value)) && !(e.dateToMinutes(L.value) > r.timeTo))
        return !0;
    }),
    nowInMinutes: O(() => e.dateToMinutes(L.value)),
    todaysTimePosition: O(() => Oe(U.nowInMinutes, r)),
    style: O(() => `${r.horizontal ? "left" : "top"}: ${U.todaysTimePosition}%`),
    currentTime: O(() => e.formatTime(L.value, r.twelveHour ? "h:mm {am}" : "HH:mm"))
  });
  function y() {
    L.value = /* @__PURE__ */ new Date(), A = setTimeout(y, 60 * 1e3);
  }
  function I() {
    A = setTimeout(y, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), y();
  }
  const le = O(() => {
    if (!r.availableViews[f.value]) return 1;
    let d = r.availableViews[f.value].cols;
    return r.hasHiddenDays && ["week", "month"].includes(f.value) && (d -= r.hasHiddenDays), d;
  }), t = O(() => {
    var d;
    return ((d = r.availableViews[f.value]) == null ? void 0 : d.rows) || 1;
  }), V = O(() => le.value * t.value), S = O(() => {
    if (f.value === "month") {
      let d = l.value.getDay() || 7;
      return r.startWeekOnSunday && !r.hideWeekdays[7] && (d += 1), r.viewDayOffset && (d -= r.viewDayOffset), e.subtractDays(l.value, d - 1);
    }
    if (f.value === "week") {
      const d = "1234567".split("").filter((B) => !Object.keys(r.hideWeekdays).includes(B));
      let C = Math.min(...d);
      return r.startWeekOnSunday && !r.hideWeekdays[7] && (C = 1), r.viewDayOffset && (C += r.viewDayOffset), e.addDays(l.value, C - 1);
    }
    return l.value;
  }), k = O(() => {
    const d = [], C = ["days", "week", "month"].includes(f.value);
    let B = 0;
    for (let Z = 0; Z < V.value + B; Z++)
      switch (f.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const re = e.addDays(S.value, Z), je = re.getDay() || 7;
          if (C && r.hasHiddenDays && r.hideWeekdays[je]) {
            B++;
            continue;
          }
          const Me = new Date(re);
          Me.setHours(23, 59, 59, 999), d.push({ start: re, startFormatted: e.formatDate(re), end: Me });
          break;
        }
        case "year":
          d.push({
            start: new Date(S.value.getFullYear(), Z, 1, 0, 0, 0, 0),
            end: new Date(S.value.getFullYear(), Z + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          d.push({
            start: new Date(S.value.getFullYear() + Z, 0, 1, 0, 0, 0, 0),
            end: new Date(S.value.getFullYear() + Z + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return d;
  }), $ = O(() => k.value[k.value.length - 1].end), g = de("right"), N = O(() => {
    const d = Object.keys(r.availableViews);
    return d[d.indexOf(f.value) + 1];
  }), a = O(() => {
    const d = Object.keys(r.availableViews);
    return d[d.indexOf(f.value) - 1];
  });
  function w(d, C, B = !1) {
    if (!C || !C[d]) return d + 1;
    const Z = C[d];
    return B && typeof Z == "string" ? Z.substring(0, 3) : Z;
  }
  function H(d, C, B) {
    const { monthsArray: Z, monthBeforeDay: re, canTruncate: je, xs: Me } = B, _e = d.getMonth(), ze = d.getFullYear(), Ce = C.getMonth(), Fe = C.getFullYear(), Ie = _e !== Ce, zt = ze !== Fe, Ee = je && (Me || Ie), Re = d.getDate(), Xe = C.getDate();
    return zt ? re ? `${w(_e, Z, Ee)} ${Re}, ${ze} - ${w(Ce, Z, Ee)} ${Xe}, ${Fe}` : `${Re} ${w(_e, Z, Ee)} ${ze} - ${Xe} ${w(Ce, Z, Ee)} ${Fe}` : Ie ? re ? `${w(_e, Z, Ee)} ${Re} - ${w(Ce, Z, Ee)} ${Xe}, ${ze}` : `${Re} ${w(_e, Z, Ee)} - ${Xe} ${w(Ce, Z, Ee)} ${ze}` : re ? `${w(_e, Z, Ee)} ${Re}-${Xe}, ${ze}` : `${Re}-${Xe} ${w(_e, Z, Ee)} ${ze}`;
  }
  const u = O(() => {
    const { dateFormat: d, months: C, monthsGenitive: B, week: Z, truncations: re } = n, je = r.locale, Me = re !== !1, _e = d.indexOf("M") < d.indexOf("D"), ze = B && je === "el" ? B : C;
    switch (f.value) {
      case "day":
        return e.formatDate(S.value, d);
      case "days":
      case "week": {
        const Ce = {
          monthsArray: ze,
          monthBeforeDay: _e,
          canTruncate: Me,
          xs: r.xs
        };
        let Fe = H(S.value, $.value, Ce);
        if (f.value === "week") {
          const Ie = e.getWeek(
            S.value,
            r.startWeekOnSunday && !r.hideWeekdays[7]
          );
          Fe += ` <small>${Z} ${Ie}</small>`;
        }
        return Fe;
      }
      case "month": {
        const Ce = `${r.xs && Me ? "MMM" : "MMMM"} YYYY`;
        return e.formatDate(M.value, Ce);
      }
      case "year":
        return S.value.getFullYear();
      case "years":
        return `${S.value.getFullYear()} - ${c.value.getFullYear()}`;
    }
  });
  async function J() {
    switch (l.value = new Date(E.value || L.value), l.value.setHours(0, 0, 0, 0), f.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        l.value = e.getPreviousFirstDayOfWeek(l.value, r.startWeekOnSunday && !r.hideWeekdays[7]);
        break;
      case "month":
        l.value = new Date(l.value.getFullYear(), l.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        l.value = new Date(l.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        l.value = new Date(l.value.getFullYear() - l.value.getFullYear() % V.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    L.value = /* @__PURE__ */ new Date(), r.ready && (await qe(), o("view-change", {
      id: f.value,
      title: u.value,
      start: M.value,
      end: c.value,
      extendedStart: h.value,
      extendedEnd: p.value,
      cellDates: k.value,
      containsToday: s.value,
      events: q.value
    }));
  }
  function ee(d) {
    const C = f.value, B = r.availableViews[C];
    d[C] && JSON.stringify(d[C]) === JSON.stringify(B) || J();
  }
  function ne(d, C = !0, B = null) {
    const Z = Object.keys(r.availableViews);
    f.value === d && !B || (Z.includes(d) ? (g.value = Z.indexOf(d) < Z.indexOf(f.value) ? "left" : "right", C && f.value !== d && o("update:view", d), f.value = d, B ? se(B) : J()) : console.warn(`Vue Cal: the \`${d}\` view is not available.`));
  }
  function R() {
    N.value ? ne(N.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function ae() {
    a.value ? ne(a.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function i() {
    b(!1);
  }
  function z() {
    b(!0);
  }
  function b(d = !0) {
    let C = new Date(E.value);
    switch (f.value) {
      case "day":
      case "days":
        d ? C = e.addDays($.value, 1) : C = e.subtractDays(S.value, V.value);
        break;
      case "week": {
        d ? (C = e.addDays(S.value, 7), C.setHours(0, 0, 0, 0)) : C = e.subtractDays(h.value, V.value);
        break;
      }
      case "month": {
        const B = d ? 1 : -1;
        C = new Date(C.getFullYear(), C.getMonth() + B, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const B = d ? 1 : -1;
        C = new Date(C.getFullYear() + B, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const B = d ? V.value : -V.value;
        C = new Date(C.getFullYear() + B, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    se(C);
  }
  function x() {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0), se(d);
  }
  function se(d, C = !0, B = !1) {
    if (!e.isValid(d)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [Z, re] = [S.value, $.value];
    f.value === "month" && ([Z, re] = [M.value, c.value]), d.setHours(0, 0, 0, 0), E.value = d, C && o("update:viewDate", d), (!e.isInRange(d, Z, re) || B) && (g.value = d.getTime() < Z.getTime() ? "left" : "right", J());
  }
  function me(d, C = !0) {
    if (!e.isValid(d)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: B, isSameDate: Z } = e;
    (!D.value || !B(D.value) || !Z(d, D.value)) && (d.setHours(0, 0, 0, 0), D.value = d, C && o("update:selectedDate", d));
  }
  function ce(d) {
    !d && !l.value.getDay() ? se(e.addDays(l.value, 1), !0, !0) : (g.value = "left", J());
  }
  function Ve(d) {
    d && r.startWeekOnSunday && !l.value.getDay() ? se(e.addDays(l.value, 1), !0, !0) : !d && r.startWeekOnSunday && l.value.getDay() === 1 && se(e.subtractDays(l.value, 1), !0, !0);
  }
  function ge() {
    J();
  }
  function m(d) {
    var re;
    const C = (re = _.value) == null ? void 0 : re.querySelector(".vuecal__scrollable"), B = d - r.timeFrom, Z = B > 0 ? B * r.timeCellHeight / r.timeStep : 0;
    C == null || C.scrollTo({ top: Z, behavior: "smooth" });
  }
  function j() {
    const d = /* @__PURE__ */ new Date();
    m(d.getHours() * 60 + d.getMinutes());
  }
  function P() {
    m(0);
  }
  const q = O(() => v.getViewEvents(k.value)), K = v.createEvent, X = v.deleteEvent;
  return pe(() => r.view, (d) => ne(d, !1)), pe(() => r.availableViews, ee), pe(() => r.datePicker, () => ne("month")), pe(() => r.viewDate, (d) => se(d, !1)), pe(() => r.selectedDate, (d) => me(d, !1)), pe(() => r.startWeekOnSunday, (d) => ce(d)), pe(() => r.hideWeekends, (d) => Ve(d)), pe(() => r.hideWeekdays, ge), pe(() => V.value, () => {
    V.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), pe(() => r.watchRealTime, (d) => {
    d && r.time ? I() : A = clearTimeout(A);
  }), J(), r.time && r.watchRealTime && I(), Ne(() => A = clearTimeout(A)), {
    now: L,
    id: f,
    broaderView: N,
    narrowerView: a,
    title: u,
    viewDate: E,
    start: M,
    end: c,
    extendedStart: h,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: p,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: S,
    lastCellDate: $,
    containsToday: s,
    nowLine: U,
    selectedDate: D,
    cellDates: k,
    cols: le,
    rows: t,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: q,
    transitionDirection: g,
    switch: (d, C) => ne(d, !0, C),
    broader: R,
    narrower: ae,
    previous: i,
    next: z,
    navigate: b,
    goToToday: x,
    updateViewDate: se,
    updateSelectedDate: me,
    scrollToCurrentTime: j,
    scrollToTime: m,
    scrollTop: P,
    createEvent: K,
    deleteEvent: X,
    // Getters.
    get isDay() {
      return f.value === "day";
    },
    get isDays() {
      return f.value === "days";
    },
    get isWeek() {
      return f.value === "week";
    },
    get isMonth() {
      return f.value === "month";
    },
    get isYear() {
      return f.value === "year";
    },
    get isYears() {
      return f.value === "years";
    }
  };
}, ft = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], mt = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ht = "Years", gt = "Year", yt = "Month", Dt = "Week", pt = "Days", wt = "Day", bt = "Today", _t = "No Event", kt = "All-day", Tt = "Delete", $t = "Create an event", Mt = "dddd, MMMM D, YYYY", Et = "am", St = "pm", st = {
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
  default: st,
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
  dateUtils: vt(ye.texts, st)
  // Some Date utils functions need localized texts.
}), Gt = ({ props: r, emit: e, attrs: o, vuecalEl: n, uid: v }) => {
  const _ = $e({
    uid: v,
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
  return _.dateUtils = vt(Object.assign(ye.texts, _.texts), st), _.config = Ft(_, r, o), _.eventsManager = Wt(_), _.view = Nt(_, n), _.dnd = Bt(_), _;
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
    const e = Le("vuecal"), { view: o, config: n } = e, v = () => {
      n.clickToNavigate && o.broader();
    }, _ = O(() => n.clickToNavigate ? { click: v } : {});
    return (Y, f) => (F(), G("div", Zt, [
      W(Y.$slots, "header", {
        view: T(o),
        availableViews: T(n).availableViews,
        vuecal: T(e)
      }),
      Y.$slots.header ? te("", !0) : (F(), G(fe, { key: 0 }, [
        T(n).viewsBar ? (F(), G("div", Ut, [
          (F(!0), G(fe, null, be(T(n).availableViews, (D, L) => (F(), G("button", {
            class: De(["vuecal__view-button", { "vuecal__view-button--active": T(o).id === L }]),
            onClick: (E) => T(o).switch(L),
            innerHTML: T(e).texts[L],
            type: "button"
          }, null, 10, Kt))), 256))
        ])) : te("", !0),
        T(n).titleBar ? (F(), G("nav", Qt, [
          he("button", {
            class: De(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !Y.$slots["previous-button"] }]),
            onClick: f[0] || (f[0] = (...D) => T(o).previous && T(o).previous(...D)),
            type: "button"
          }, [
            W(Y.$slots, "previous-button")
          ], 2),
          he("div", xt, [
            Pe(Ue, {
              name: `vuecal-slide-fade--${T(o).transitionDirection}`
            }, {
              default: Q(() => [
                (F(), G("div", {
                  key: T(o).id + T(o).start.getTime()
                }, [
                  Y.$slots.title || Y.$slots[`title.${T(o).id}`] ? (F(), He(at(T(n).clickToNavigate && T(o).broaderView ? "button" : "div"), ue({
                    key: 0,
                    class: "vuecal__title"
                  }, Je(_.value)), {
                    default: Q(() => [
                      Y.$slots[`title.${T(o).id}`] ? W(Y.$slots, `title.${T(o).id}`, oe(ue({ key: 0 }, T(o)))) : W(Y.$slots, "title", oe(ue({ key: 1 }, T(o))))
                    ]),
                    _: 3
                  }, 16)) : (F(), He(at(T(n).clickToNavigate && T(o).broaderView ? "button" : "div"), ue({
                    key: 1,
                    class: "vuecal__title"
                  }, Je(_.value), {
                    innerHTML: T(o).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          T(n).todayButton ? (F(), G(fe, { key: 0 }, [
            Y.$slots["today-button"] ? W(Y.$slots, "today-button", {
              key: 0,
              navigate: () => !T(o).containsToday && T(o).goToToday(),
              active: T(o).containsToday
            }) : (F(), G("button", {
              key: 1,
              class: De(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": T(o).containsToday }]),
              onClick: f[1] || (f[1] = (D) => !T(o).containsToday && T(o).goToToday()),
              disabled: !!T(o).containsToday,
              type: "button",
              innerHTML: T(e).texts.today
            }, null, 10, en))
          ], 64)) : te("", !0),
          he("button", {
            class: De(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !Y.$slots["next-button"] }]),
            onClick: f[2] || (f[2] = (...D) => T(o).next && T(o).next(...D)),
            type: "button"
          }, [
            W(Y.$slots, "next-button")
          ], 2)
        ])) : te("", !0)
      ], 64))
    ]));
  }
}, nn = ["draggable"], sn = { class: "vuecal__event-details" }, an = { class: "vuecal__event-title" }, ln = {
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
    const o = r, { config: n, view: v, dnd: _, touch: Y, dateUtils: f, eventsManager: D } = Le("vuecal"), { handleEventResize: L } = D, E = de(null), l = $e(o.event);
    let A = null;
    const M = $e({
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
    }), c = O(() => n.editableEvents.drag && l.draggable !== !1 && !l.background && M.canTouchAndDrag !== !1), h = O(() => v.isMonth || v.isYear || v.isYears || o.inAllDayBar || l._.multiday && !U.value ? !1 : n.time && n.editableEvents.resize && l.resizable !== !1 && !l.background);
    O(() => n.editableEvents.delete && l.deletable !== !1 && !l.background);
    const p = O(() => {
      var a, w, H, u, J;
      const k = !!((a = l._) != null && a.multiday), $ = n.horizontal, g = !o.inAllDayBar && (((w = l._) == null ? void 0 : w.startMinutes) < n.timeFrom || k && !s.value), N = !o.inAllDayBar && (((H = l._) == null ? void 0 : H.endMinutes) > n.timeTo || k && !U.value);
      return {
        [`vuecal__event--${l._.id}`]: !0,
        [l.class]: !!l.class,
        "vuecal__event--recurring": !!l.recurring,
        "vuecal__event--background": !!l.background,
        "vuecal__event--all-day": l.allDay || ((u = l._) == null ? void 0 : u.startMinutes) === 0 && ((J = l._) == null ? void 0 : J.duration) === 1440,
        "vuecal__event--multiday": k,
        // In horizontal mode, cut-top becomes cut-left and cut-bottom becomes cut-right.
        "vuecal__event--cut-top": !$ && g,
        "vuecal__event--cut-bottom": !$ && N,
        "vuecal__event--cut-left": $ && g,
        "vuecal__event--cut-right": $ && N,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !l._.draggingGhost && l._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": l._.draggingGhost,
        "vuecal__event--resizing": Y.isResizingEvent
      };
    }), s = O(() => l._.multiday ? new Date(l.start).setHours(0, 0, 0, 0) === o.cellStart.getTime() : !0), U = O(() => l._.multiday ? f.isSameDate(new Date(new Date(l.end).setMilliseconds(-1)), o.cellEnd) : !0), y = O(() => {
      const k = new Date(l.start).setHours(0, 0, 0, 0), $ = new Date(l.end).setHours(0, 0, 0, 0);
      return Math.ceil(($ - k) / (1e3 * 60 * 60 * 24));
    }), I = O(() => {
      const k = (v.isDay || v.isDays || v.isWeek) && n.time && !o.inAllDayBar, $ = n.horizontal;
      if (!k && !l.backgroundColor && !l.color) return !1;
      const g = {
        backgroundColor: l.backgroundColor || null,
        color: l.color || null
      };
      if (k) {
        let N = l._.startMinutes, a = l._.endMinutes;
        l._.multiday && (s.value || (N = 0), U.value || (a = 1440));
        const w = Math.max(n.timeFrom, N), H = Math.min(n.timeTo, a) + (l._.duration && !a ? 1440 : 0), u = Oe(w, n), J = Oe(H, n) - u;
        g[$ ? "left" : "top"] = `${u}%`, g[$ ? "width" : "height"] = `${J}%`;
      }
      return g;
    }), le = O(() => {
      const k = { ...n.eventListeners.event };
      for (const [g, N] of Object.entries(k))
        ["resize-end"].includes(g) || (k[g] = (a) => {
          a.type !== "drop" && N(a.type ? { e: a, event: l } : a);
        });
      const $ = { ...k };
      return k.touchstart = (g) => {
        var N;
        g.stopPropagation(), M.touchAndDragTimer = setTimeout(() => {
          M.canTouchAndDrag = !0;
        }, 500), S(g), (N = $.touchstart) == null || N.call($, { e: g, event: l });
      }, k.mousedown = (g) => {
        var N;
        g.stopPropagation(), S(g), (N = $.mousedown) == null || N.call($, { e: g, event: l });
      }, k.click = (g) => {
        var N;
        (N = $.click) == null || N.call($, { e: g, event: l }), A ? A = clearTimeout(A) : A = setTimeout(() => {
          var a;
          A = null, (a = $["delayed-click"]) == null || a.call($, { e: g, event: l });
        }, 400);
      }, k.dblclick = (g) => {
        $.dblclick ? $.dblclick({ e: g, event: l }) : l.delete(1);
      }, k;
    });
    let t = null, V = 0;
    const S = (k) => {
      var a, w, H, u;
      const $ = ((a = k.touches) == null ? void 0 : a[0]) || k;
      M.fromResizer = (w = $.target) == null ? void 0 : w.closest(".vuecal__event-resizer");
      const g = Date.now();
      (!t || g - V > vn) && (t = E.value.getBoundingClientRect(), V = g);
      const N = t;
      M.startX = (((H = k.touches) == null ? void 0 : H[0]) || k).clientX - N.left, M.startY = (((u = k.touches) == null ? void 0 : u[0]) || k).clientY - N.top, M.startPercentageX = M.startX * 100 / N.width, M.startPercentageY = M.startY * 100 / N.height, M.cellEl = E.value.closest(".vuecal__cell"), M.resizeStartDate = l.start, M.fromResizer && L(k, l, E.value), M.holdTimer = setTimeout(() => {
        var J, ee;
        M.holding = !0, (ee = (J = le.value).hold) == null || ee.call(J, { e: k, event: l });
      }, 1e3);
    };
    return tt(() => l._.register(E.value)), Ne(() => {
      M.holdTimer && (M.holdTimer = clearTimeout(M.holdTimer)), M.touchAndDragTimer && (M.touchAndDragTimer = clearTimeout(M.touchAndDragTimer)), A && (A = clearTimeout(A)), l._.unregister();
    }), (k, $) => (F(), G("div", ue({ class: "vuecal__event" }, Je(le.value, !0), {
      ref_key: "eventEl",
      ref: E,
      class: p.value,
      style: I.value,
      draggable: c.value ? "true" : void 0,
      onDragstart: $[2] || ($[2] = (g) => c.value && T(_).eventDragStart(g, l)),
      onDragend: $[3] || ($[3] = (g) => c.value && T(_).eventDragEnd(g, l))
    }), [
      he("div", sn, [
        k.$slots["event.all-day"] ? W(k.$slots, "event.all-day", {
          key: 0,
          event: l
        }) : k.$slots[`event.${T(v).id}`] ? W(k.$slots, `event.${T(v).id}`, {
          key: 1,
          event: l
        }) : W(k.$slots, "event", {
          key: 2,
          event: l
        }, () => [
          he("div", an, ve(l.title), 1),
          T(n).time && !r.inAllDayBar && !(l._.multiday && !s.value) ? (F(), G("div", ln, [
            T(v).isMonth ? (F(), G("span", rn, ",")) : te("", !0),
            he("span", on, ve(l._[`startTimeFormatted${T(n).twelveHour ? 12 : 24}`]), 1),
            T(v).isMonth ? te("", !0) : (F(), G("span", un, [
              Ze(" - " + ve(l._[`endTimeFormatted${T(n).twelveHour ? 12 : 24}`]), 1),
              l._.multiday && s.value ? (F(), G("span", cn, "+" + ve(y.value) + "d", 1)) : te("", !0)
            ]))
          ])) : te("", !0),
          r.inAllDayBar ? te("", !0) : (F(), G("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: l.content
          }, null, 8, dn))
        ])
      ]),
      h.value ? (F(), G("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: $[0] || ($[0] = lt(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : te("", !0),
      Pe(Ue, { name: "vuecal-delete-btn" }, {
        default: Q(() => [
          l._.deleting ? (F(), G("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: $[1] || ($[1] = lt((g) => l.delete(3), ["stop"]))
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
    const e = r, o = Le("vuecal"), { view: n, config: v, dateUtils: _, eventsManager: Y, dnd: f, touch: D } = o, L = O(() => _.isToday(e.start)), E = de(null), l = de([]), A = de(!1), M = (m) => {
      l.value.push(m.detail), A.value = !0;
    }, c = () => setTimeout(() => A.value = !1, 300), h = $e({
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
    }), p = de(!1);
    let s = null;
    const U = de({ cellOverlaps: {}, longestStreak: 0 }), y = O(() => {
      var Z;
      const m = v.horizontal, j = m ? h.startPercentageX : h.startPercentageY, P = m ? h.movePercentageX : h.movePercentageY, q = Se(j, v), K = Se(P, v);
      let X = Math.min(j, P), d = Math.max(j, P), C = Se(X, v), B = Se(d, v);
      if (v.snapToInterval && (C = _.snapToInterval(C, v.snapToInterval), B = _.snapToInterval(B, v.snapToInterval), X = Oe(C, v), d = Oe(B, v)), v.time && ((Z = v.specialHoursDisallowed) != null && Z.hasAny) && !e.allDay) {
        const re = Rt({
          anchorDayMinutes: q,
          cursorDayMinutes: K,
          snappedLow: C,
          snappedHigh: B,
          cellDate: e.start,
          schedule: h.schedule,
          disallowed: v.specialHoursDisallowed,
          hasSchedules: !!(v.schedules && v.schedules.length)
        });
        C = re.low, B = re.high, X = Oe(C, v), d = Oe(B, v);
      }
      return {
        style: {
          [m ? "left" : "top"]: `${X}%`,
          [m ? "width" : "height"]: `${Math.abs(d - X)}%`
        },
        startMinutes: C,
        endMinutes: B,
        start: _.formatMinutes(C),
        end: _.formatMinutes(B),
        ...h.schedule != null ? { schedule: h.schedule } : {}
      };
    }), I = O(() => {
      const m = v.editableEvents.create && (h.dragging || p.value), j = v.eventCreateMinDrag && h.thresholdPassed || !v.eventCreateMinDrag, P = h.canTouchAndDrag !== !1;
      return m && j && P;
    }), le = O(() => {
      var d;
      const m = /* @__PURE__ */ new Date(), j = n.start.getFullYear(), P = n.start.getMonth(), q = e.start.getFullYear(), K = e.start.getMonth();
      return {
        [`vuecal__cell--${We[e.start.getDay()]}`]: n.isDay || n.isDays || n.isWeek || n.isMonth,
        [`vuecal__cell--${At[K]}`]: n.isYear,
        [`vuecal__cell--${q}`]: n.isYears,
        "vuecal__cell--today": L.value,
        "vuecal__cell--current-month": n.isYear && q === m.getFullYear() && K === m.getMonth(),
        "vuecal__cell--current-year": n.isYears && q === m.getFullYear(),
        "vuecal__cell--out-of-range": n.isMonth && (q !== j || K !== P),
        "vuecal__cell--before-min": ee.value && u.value,
        "vuecal__cell--after-max": ee.value && J.value,
        "vuecal__cell--disabled": ee.value,
        "vuecal__cell--selected": n.selectedDate && n.selectedDate.getTime() >= e.start.getTime() && n.selectedDate.getTime() <= e.end.getTime(),
        "vuecal__cell--has-schedules": (d = v.schedules) == null ? void 0 : d.length,
        "vuecal__cell--dragging": h.dragging,
        "vuecal__cell--has-events": V.value.length
      };
    });
    O(() => _.formatDate(e.start));
    const t = O(() => {
      switch (n.id) {
        case "day":
          return "";
        case "days":
          return v.availableViews.days.rows > 1 && _.formatDate(e.start, "D"), "";
        case "week":
          return "";
        case "month":
          return _.formatDate(e.start, "D");
        case "year":
          return _.formatDate(e.start, v.xs ? "MMM" : "MMMM");
        case "years":
          return _.formatDate(e.start, "YYYY");
      }
    }), V = O(() => v.datePicker ? [] : Y.getEventsInRange(
      e.start,
      e.end,
      { excludeIds: l.value, ...v.allDayEvents ? { allDay: e.allDay } : {} }
    )), S = O(() => V.value.filter((m) => !m.background)), k = O(() => {
      var m;
      return (m = v.schedules) == null ? void 0 : m.reduce((j, P) => (j[P.id] = V.value.filter((q) => q.schedule === P.id), j), {});
    }), $ = O(() => {
      if (n.isMonth || n.isYear || n.isYears || e.allDay || !v.time) return {};
      const m = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", j = v.horizontal, P = {};
      for (const q of V.value) {
        const K = q._.id, { maxConcurrent: X = 1, position: d = 0 } = U.value.cellOverlaps[K] || {}, C = m ? "right" : "left", B = j ? "height" : "width";
        P[K] = { [j ? "top" : C]: `${100 / X * d}%` }, v.stackEvents ? P[K][B] = `${100 / X + (d === X - 1 ? 0 : 15)}%` : P[K][B] = `${100 / X}%`;
      }
      return P;
    }), g = O(() => {
      const m = {};
      for (const j of V.value) {
        const P = j._.id, { maxConcurrent: q = 1, position: K = 0 } = U.value.cellOverlaps[P] || {};
        m[P] = `vuecal__event--stack-${K + 1}-${q}`;
      }
      return m;
    }), N = O(() => v.showCellEventCount && S.value.length), a = (m) => {
      const j = m || [], P = v.horizontal, { timeFrom: q, timeTo: K } = v, X = [];
      for (let d = 0; d < j.length; d++) {
        const C = j[d];
        let { from: B, to: Z, class: re, label: je } = C;
        if (isNaN(B) || isNaN(Z) || q >= Z || K <= B) continue;
        B = Math.max(q, B), Z = Math.min(K, Z);
        const Me = Oe(B, v), _e = Oe(Z, v) - Me;
        X.push({
          style: {
            [P ? "left" : "top"]: `${Me}%`,
            [P ? "width" : "height"]: `${_e}%`
          },
          label: je,
          class: re
        });
      }
      return X;
    }, w = O(() => {
      var P;
      if (!v.specialHours || n.isMonth || n.isYear || n.isYears || e.allDay) return;
      const m = We[e.start.getDay()];
      let j = (P = v.specialHours) == null ? void 0 : P[m];
      if (j)
        return {
          default: a(j.default),
          schedules: Object.entries(j.schedules || {}).reduce((q, [K, X]) => (q[K] = a(X), q), {})
        };
    }), H = O(() => {
      const m = v.schedules;
      if (!(m != null && m.length)) return [];
      const j = w.value;
      if (!j) return m.map((K) => ({ schedule: K, ranges: [] }));
      const { default: P, schedules: q } = j;
      return m.map((K) => {
        const X = String(K.id), d = Object.prototype.hasOwnProperty.call(q, X) ? q[X] : P;
        return { schedule: K, ranges: d };
      });
    }), u = O(() => v.minTimestamp !== null && v.minTimestamp > e.end.getTime()), J = O(() => v.maxTimestamp && v.maxTimestamp < e.start.getTime()), ee = O(() => {
      const { disableDays: m } = v, j = n.isYear || n.isYears;
      return m.length && m.includes(_.formatDate(e.start)) && !j ? !0 : u.value || J.value;
    }), ne = O(() => {
      if (ee.value) return {};
      const m = { ...v.eventListeners.cell };
      for (const [P, q] of Object.entries(m))
        m[P] = (K) => {
          var X, d, C;
          (C = (d = K.target || ((X = K.e) == null ? void 0 : X.target)).closest) != null && C.call(d, ".vuecal__event") || q(K.type ? { e: K, cell: R.value, cursor: z.value, view: n } : K);
        };
      const j = { ...m };
      return m.click = (P) => {
        var K;
        b();
        const q = i(P);
        (K = j.click) == null || K.call(j, { e: P, cell: R.value, cursor: q, view: n }), s ? s = clearTimeout(s) : s = setTimeout(() => {
          var X;
          s = null, (X = j["delayed-click"]) == null || X.call(j, { e: P, cell: R.value, cursor: q, view: n });
        }, 400);
      }, (v.time && n.isDay || n.isDays || n.isWeek) && (m.touchstart = (P) => {
        var q;
        x(P.e || P), (q = j.touchstart) == null || q.call(j, { e: P, cell: R.value, cursor: z.value, view: n });
      }, m.mousedown = (P) => {
        var q;
        x(P.e || P), (q = j.mousedown) == null || q.call(j, { e: P, cell: R.value, cursor: z.value, view: n });
      }), j.dblclick && (m.dblclick = (P) => {
        var q;
        (q = j.dblclick) == null || q.call(j, { e: P, cell: R.value, cursor: i(P), view: n });
      }), v.editableEvents.drag && (m.dragenter = (P) => f.cellDragEnter(P, R.value), m.dragover = (P) => {
        P.preventDefault(), f.cellDragOver(P, R.value);
      }, m.dragleave = (P) => f.cellDragLeave(P, R.value), m.drop = (P) => f.cellDragDrop(P, R.value, e.allDay)), m;
    }), R = O(() => ({
      start: e.start,
      end: e.end,
      events: V,
      ...h.schedule !== null ? { schedule: h.schedule } : {},
      goNarrower: () => n.narrower(),
      goBroader: () => n.broader(),
      broader: n.broaderView,
      narrower: n.narrowerView
    })), ae = (m) => k.value[m.id] || [], i = (m) => {
      var B;
      const j = v.horizontal, { clientX: P, clientY: q } = ((B = m.touches) == null ? void 0 : B[0]) || m, { top: K, left: X } = E.value.getBoundingClientRect(), d = j ? (P - X) * 100 / E.value.clientWidth : nt(q - K, E.value), C = new Date(e.start);
      return C.setMinutes(Se(d, v)), { [j ? "x" : "y"]: d, date: C };
    }, z = O(() => {
      const j = v.horizontal ? h.movePercentageX || h.startPercentageX : h.movePercentageY || h.startPercentageY, P = Se(j, v), q = new Date(e.start);
      return q.setMinutes(P), {
        x: h.movePercentageX || h.startPercentageX,
        y: h.movePercentageY || h.startPercentageY,
        date: q
      };
    }), b = () => {
      n.updateSelectedDate(e.start), v.clickToNavigate && ((n.isMonth || n.isDays || n.isWeek) && v.availableViews.day ? n.switch("day") : n.isYear && v.availableViews.month ? n.switch("month") : n.isYears && v.availableViews.year && n.switch("year")), n.updateViewDate(e.start);
    }, x = (m) => {
      var K, X, d, C, B;
      const j = m.type === "touchstart";
      j ? (h.canTouchAndDrag = !1, h.touchAndDragTimer = setTimeout(() => {
        h.canTouchAndDrag = !0, (h.holding || h.dragging) && m.preventDefault();
      }, 500)) : h.canTouchAndDrag = !0;
      const P = (X = (K = m.target.closest("[data-schedule]")) == null ? void 0 : K.dataset) == null ? void 0 : X.schedule;
      if (P !== void 0 && ((d = v.schedules) != null && d.length)) {
        const Z = v.schedules.find((re) => String(re.id) === String(P));
        h.schedule = Z ? Z.id : P;
      } else h.schedule = null;
      const q = E.value.getBoundingClientRect();
      h.startX = (((C = m.touches) == null ? void 0 : C[0]) || m).clientX - q.left, h.startY = (((B = m.touches) == null ? void 0 : B[0]) || m).clientY - q.top, h.startPercentageX = h.startX * 100 / q.width, h.startPercentageY = h.startY * 100 / q.height, h.thresholdPassed = !1, document.addEventListener(j ? "touchmove" : "mousemove", se, { passive: !j }), document.addEventListener(j ? "touchend" : "mouseup", me, { once: !0 }), h.holdTimer = setTimeout(() => {
        var Z, re;
        h.holding = !0, (re = (Z = ne.value).hold) == null || re.call(Z, { e: m, cell: R.value, cursor: z.value, view: n });
      }, 1e3);
    }, se = (m) => {
      var X, d, C, B, Z, re;
      const j = m.type === "touchmove", P = v.horizontal;
      if (j && !h.canTouchAndDrag) {
        h.touchAndDragTimer && (clearTimeout(h.touchAndDragTimer), h.touchAndDragTimer = null), me(m);
        return;
      }
      j && m.preventDefault(), h.dragging || (D.isDraggingCell = !0, (d = (X = ne.value)["drag-start"]) == null || d.call(X, { e: m, cell: R.value, cursor: z.value, view: n })), h.dragging = !0, h.holdTimer = clearTimeout(h.holdTimer), h.holding = !1;
      const q = E.value.getBoundingClientRect();
      h.moveX = (((C = m.touches) == null ? void 0 : C[0]) || m).clientX - q.left, h.moveY = (((B = m.touches) == null ? void 0 : B[0]) || m).clientY - q.top, h.movePercentageX = h.moveX * 100 / q.width, h.movePercentageY = h.moveY * 100 / q.height;
      const K = Math.abs(P ? h.startX - h.moveX : h.startY - h.moveY);
      v.eventCreateMinDrag && K > v.eventCreateMinDrag && (h.thresholdPassed = !0), (re = (Z = ne.value).drag) == null || re.call(Z, { e: m, cell: R.value, cursor: z.value, view: n });
    }, me = async (m) => {
      var P, q;
      const j = m.type === "touchend";
      document.removeEventListener(j ? "touchmove" : "mousemove", se, { passive: !1 }), h.touchAndDragTimer && (clearTimeout(h.touchAndDragTimer), h.touchAndDragTimer = null), h.dragging && ((q = (P = ne.value)["drag-end"]) == null || q.call(P, { e: m, cell: R.value, cursor: z.value, view: n }), D.isDraggingCell = !1, v.editableEvents.create && h.canTouchAndDrag && (p.value = !0, await ce(m), p.value = !1)), h.holdTimer = clearTimeout(h.holdTimer), h.holding = !1, h.dragging = !1, h.startX = 0, h.startY = 0, h.moveX = 0, h.moveY = 0, h.startPercentageX = 0, h.startPercentageY = 0, h.movePercentageX = 0, h.movePercentageY = 0, h.thresholdPassed = !1, h.schedule = null, h.canTouchAndDrag = null;
    }, ce = async (m) => {
      var C;
      if (!I.value) return;
      let { start: j, end: P, startMinutes: q, endMinutes: K } = y.value;
      j = new Date(e.start), j.setMinutes(q), P = new Date(e.start), P.setMinutes(K);
      let X = { ...y.value, start: j, end: P };
      const { create: d } = v.eventListeners.event;
      if (typeof d == "function") {
        const B = X;
        X = await new Promise((Z) => d({ e: m, event: X, cell: R.value, resolve: Z, cursor: z.value, view: n })), X && typeof X == "object" && n.createEvent(X), X && typeof X == "boolean" && n.createEvent(B);
      } else n.createEvent(X);
      (C = navigator.vibrate) == null || C.call(navigator, 200);
    }, Ve = () => {
      var m;
      for (const j of Object.keys(ne.value))
        (m = E.value) == null || m.removeEventListener(j, ne.value[j]);
    }, ge = () => {
      U.value = Y.getCellOverlappingEvents(e.start, e.end, e.allDay);
    };
    return pe(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !n.isYears && !n.isYear && S.value.map((m) => `${m._.id}${m.start.getTime()}${m.end.getTime()}`).join(),
      async () => {
        await qe(), ge();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Ne(async () => {
      for (const m of l.value) Y.deleteEvent(m, 3);
      Ve(), s && (s = clearTimeout(s)), await qe();
    }), (m, j) => {
      var P, q, K;
      return F(), G("div", ue({
        class: "vuecal__cell",
        ref_key: "cellEl",
        ref: E
      }, Je(ne.value, !0), {
        "data-start": e.start.getTime(),
        class: le.value
      }), [
        m.$slots.cell ? W(m.$slots, "cell", {
          key: 0,
          cell: R.value
        }) : te("", !0),
        (q = (P = w.value) == null ? void 0 : P.default) != null && q.length && !((K = T(v).schedules) != null && K.length) ? (F(!0), G(fe, { key: 1 }, be(w.value.default, (X, d) => (F(), G("div", {
          class: De(["vuecal__special-hours", X.class]),
          style: we(X.style),
          innerHTML: X.label || ""
        }, null, 14, mn))), 256)) : te("", !0),
        !m.$slots.cell && T(v).schedules ? (F(!0), G(fe, { key: 2 }, be(H.value, ({ schedule: X, ranges: d }) => (F(), G("div", {
          class: De(["vuecal__schedule vuecal__schedule--cell", X.class]),
          key: X.id,
          style: we(X.style || null),
          "data-schedule": X.id
        }, [
          d.length ? (F(!0), G(fe, { key: 0 }, be(d, (C, B) => (F(), G("div", {
            class: De(["vuecal__special-hours", C.class]),
            key: `${X.id}-${B}`,
            style: we(C.style),
            innerHTML: C.label || ""
          }, null, 14, gn))), 128)) : te("", !0),
          t.value || m.$slots["cell-date"] ? (F(), G("div", yn, [
            W(m.$slots, "cell-date", {
              cell: R.value,
              view: T(n),
              schedule: X,
              events: ae(X)
            }, () => [
              Ze(ve(t.value), 1)
            ])
          ])) : te("", !0),
          m.$slots["cell-content"] ? (F(), G("div", Dn, [
            W(m.$slots, "cell-content", {
              cell: R.value,
              view: T(n),
              schedule: X,
              events: ae(X)
            })
          ])) : te("", !0),
          m.$slots["cell-events"] ? (F(), G("div", pn, [
            W(m.$slots, "cell-events", {
              cell: R.value,
              view: T(n),
              schedule: X,
              events: ae(X)
            })
          ])) : V.value.length || A.value ? (F(), He(rt, {
            key: 4,
            class: "vuecal__cell-events",
            name: "vuecal-event-delete",
            onBeforeLeave: j[0] || (j[0] = (C) => A.value = !0),
            onAfterLeave: c,
            tag: "div"
          }, {
            default: Q(() => [
              (F(!0), G(fe, null, be(k.value[X.id], (C) => (F(), He(ut, {
                key: C._.id,
                event: C,
                onEventDeleted: M,
                "in-all-day-bar": e.allDay,
                "cell-start": e.start,
                "cell-end": e.end,
                style: we($.value[C._.id])
              }, Ae({ _: 2 }, [
                m.$slots["event.all-day"] && e.allDay ? {
                  name: "event.all-day",
                  fn: Q((B) => [
                    W(m.$slots, "event.all-day", ue({ ref_for: !0 }, B))
                  ]),
                  key: "0"
                } : void 0,
                m.$slots[`event.${T(n).id}`] ? {
                  name: `event.${T(n).id}`,
                  fn: Q((B) => [
                    W(m.$slots, `event.${T(n).id}`, ue({ ref_for: !0 }, B))
                  ]),
                  key: "1"
                } : void 0,
                m.$slots.event ? {
                  name: "event",
                  fn: Q((B) => [
                    W(m.$slots, "event", ue({ ref_for: !0 }, B))
                  ]),
                  key: "2"
                } : void 0
              ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "style"]))), 128))
            ]),
            _: 2
          }, 1024)) : te("", !0),
          I.value && h.schedule === X.id && !e.allDay ? (F(), G("div", {
            key: 5,
            class: "vuecal__event-placeholder",
            style: we(y.value.style)
          }, ve(y.value.start) + " - " + ve(y.value.end), 5)) : te("", !0)
        ], 14, hn))), 128)) : te("", !0),
        !m.$slots.cell && !T(v).schedules ? (F(), G(fe, { key: 3 }, [
          t.value || m.$slots["cell-date"] ? (F(), G("div", wn, [
            W(m.$slots, "cell-date", {
              cell: R.value,
              view: T(n)
            }, () => [
              Ze(ve(t.value), 1)
            ])
          ])) : te("", !0),
          m.$slots["cell-content"] ? (F(), G("div", bn, [
            W(m.$slots, "cell-content", {
              cell: R.value,
              view: T(n)
            })
          ])) : te("", !0),
          m.$slots["cell-events"] && V.value.length ? (F(), G("div", _n, [
            W(m.$slots, "cell-events", {
              cell: R.value,
              view: T(n)
            })
          ])) : !(T(n).isMonth && !T(v).eventsOnMonthView) && !T(n).isYear && !T(n).isYears && (V.value.length || A.value) ? (F(), He(rt, {
            key: 3,
            class: "vuecal__cell-events",
            name: "vuecal-event-delete",
            onBeforeLeave: j[1] || (j[1] = (X) => A.value = !0),
            onAfterLeave: c,
            tag: "div"
          }, {
            default: Q(() => [
              (F(!0), G(fe, null, be(V.value, (X) => (F(), He(ut, {
                key: X._.id,
                event: X,
                onEventDeleted: M,
                "in-all-day-bar": e.allDay,
                "cell-start": e.start,
                "cell-end": e.end,
                class: De(g.value[X._.id]),
                style: we($.value[X._.id])
              }, Ae({ _: 2 }, [
                m.$slots["event.all-day"] && e.allDay ? {
                  name: "event.all-day",
                  fn: Q((d) => [
                    W(m.$slots, "event.all-day", ue({ ref_for: !0 }, d))
                  ]),
                  key: "0"
                } : void 0,
                m.$slots[`event.${T(n).id}`] ? {
                  name: `event.${T(n).id}`,
                  fn: Q((d) => [
                    W(m.$slots, `event.${T(n).id}`, ue({ ref_for: !0 }, d))
                  ]),
                  key: "1"
                } : void 0,
                m.$slots.event ? {
                  name: "event",
                  fn: Q((d) => [
                    W(m.$slots, "event", ue({ ref_for: !0 }, d))
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
        m.$slots["event-count"] ? W(m.$slots, "event-count", {
          key: 4,
          events: S.value
        }) : N.value ? (F(), G("div", kn, ve(S.value.length), 1)) : te("", !0),
        T(n).nowLine.show && L.value && !r.allDay ? (F(), G("div", {
          key: 6,
          class: "vuecal__now-line",
          style: we(T(n).nowLine.style),
          title: T(n).nowLine.currentTime
        }, [
          W(m.$slots, "now-line", {
            now: T(n).now,
            timeFormatted: T(n).nowLine.currentTime
          }, () => [
            he("span", null, ve(T(n).nowLine.currentTime), 1)
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
    const e = Le("vuecal"), o = Le("$vuecalEl"), { view: n, config: v, dateUtils: _ } = e, Y = O(() => v.xs ? "day-xs" : v.sm || n.isDays || n.isMonth ? "day-sm" : "day"), f = O(() => (n.isDay || n.isDays || n.isWeek || n.isMonth) && !(n.isDay && !v.schedules && !v.allDayEvents)), D = O(() => n.cellDates.slice(0, v.horizontal ? n.rows : n.cols).map(({ start: l }) => ({
      id: We[l.getDay()],
      date: l,
      dateNumber: l.getDate(),
      day: _.formatDate(l, "dddd"),
      "day-sm": _.formatDate(l, "ddd"),
      "day-xs": _.formatDate(l, "dd"),
      isToday: _.isToday(l)
    }))), L = {
      click: (l) => {
        (n.isDays || n.isWeek) && n.updateSelectedDate(l);
      }
    }, E = {
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
        typeof document < "u" && (document.removeEventListener("mousemove", E.handleMouseMove), document.removeEventListener("mouseup", E.cleanup), document.removeEventListener("touchmove", E.handleTouchMove, { passive: !1 }), document.removeEventListener("touchend", E.cleanup)), E.isResizing.value = !1;
      },
      startResize(l, A) {
        this.isResizing.value = !0;
        const M = v.horizontal;
        this[M ? "startX" : "startY"].value = M ? l : A;
        const c = getComputedStyle(o.value).getPropertyValue("--vuecal-all-day-bar-size"), h = document.createElement("div");
        h.style.position = "absolute", h.style.visibility = "hidden", h.style[M ? "width" : "height"] = c, document.body.appendChild(h);
        const p = h[M ? "offsetWidth" : "offsetHeight"];
        h.remove(), p > 0 && (this[M ? "initialWidth" : "initialHeight"].value = p), document.addEventListener("mousemove", E.handleMouseMove), document.addEventListener("mouseup", E.cleanup), document.addEventListener("touchmove", E.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", E.cleanup);
      },
      // Update height/width based on mouse/touch movement.
      updateSize(l, A) {
        var p;
        if (!this.isResizing.value) return;
        const M = v.horizontal, c = M ? l - this.startX.value : A - this.startY.value, h = Math.max(20, this[M ? "initialWidth" : "initialHeight"].value + c);
        (p = o.value) == null || p.style.setProperty("--vuecal-all-day-bar-size", `${h}px`);
      },
      // Mouse event handlers.
      handleMouseDown(l) {
        this.startResize(l.clientX, l.clientY);
      },
      handleMouseMove(l) {
        E.updateSize(l.clientX, l.clientY);
      },
      // Touch event handlers.
      handleTouchStart(l) {
        var A;
        (A = l.touches) != null && A[0] && this.startResize(l.touches[0].clientX, l.touches[0].clientY);
      },
      handleTouchMove(l) {
        var A;
        (A = l.touches) != null && A[0] && (E.updateSize(l.touches[0].clientX, l.touches[0].clientY), l.preventDefault());
      }
    };
    return Ne(() => {
      E.cleanup();
    }), (l, A) => f.value ? (F(), G("div", $n, [
      T(n).isDay ? te("", !0) : (F(), G("div", Mn, [
        (F(!0), G(fe, null, be(D.value, (M, c) => (F(), G("div", {
          class: De(["vuecal__weekday", { "vuecal__weekday--today": M.isToday }]),
          key: c,
          onClick: (h) => L.click(M.date)
        }, [
          W(l.$slots, "weekday-heading", {
            label: M[Y.value],
            id: M.id,
            date: M.date
          }, () => [
            he("span", Sn, ve(M[Y.value]), 1),
            T(n).isMonth ? te("", !0) : (F(), G("strong", Yn, ve(M.dateNumber), 1))
          ])
        ], 10, En))), 128))
      ])),
      T(v).schedules ? (F(), G("div", zn, [
        (F(!0), G(fe, null, be(D.value, (M, c) => (F(), G(fe, { key: c }, [
          (F(!0), G(fe, null, be(T(v).schedules, (h, p) => (F(), G(fe, { key: p }, [
            l.$slots["schedule-heading"] ? (F(), G("div", {
              key: 0,
              class: De(["vuecal__schedule vuecal__schedule--heading", h.class])
            }, [
              W(l.$slots, "schedule-heading", {
                schedule: h,
                view: T(n)
              })
            ], 2)) : (F(), G("div", {
              key: 1,
              class: De(["vuecal__schedule vuecal__schedule--heading", h.class]),
              innerHTML: h.label
            }, null, 10, Cn))
          ], 64))), 128))
        ], 64))), 128))
      ])) : te("", !0),
      T(v).allDayEvents ? (F(), G("div", On, [
        (F(!0), G(fe, null, be(D.value, (M, c) => (F(), He(Yt, {
          class: De(["vuecal__all-day-cell", { "vuecal__weekday--today": M.isToday }]),
          key: c,
          start: M.date,
          end: new Date(M.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: c,
          "all-day": ""
        }, Ae({ _: 2 }, [
          l.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: Q((h) => [
              W(l.$slots, "event.all-day", ue({ ref_for: !0 }, h))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: Q((h) => [
              W(l.$slots, "event", ue({ ref_for: !0 }, h))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        he("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: A[0] || (A[0] = (...M) => E.handleMouseDown && E.handleMouseDown(...M)),
          onTouchstart: A[1] || (A[1] = (...M) => E.handleTouchStart && E.handleTouchStart(...M))
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
    const e = Le("vuecal"), { config: o, texts: n, view: v } = e, _ = O(() => {
      const Y = [];
      for (let D = o.timeFrom; D < o.timeTo; D += o.timeStep) {
        const L = D + o.timeStep > o.timeTo, E = ~~(D / 60), l = D % 60, A = n[D < 720 ? "am" : "pm"];
        let M = null;
        L && (M = `calc(var(--vuecal-time-cell-size) * ${(o.timeTo - D) / o.timeStep})`), Y.push({
          minutesSum: D,
          // The sum of hours + minutes in minutes.
          hours: E,
          minutes: l,
          formatted12: `${E % 12 ? E % 12 : 12}${l ? `:${l.toString().padStart(2, 0)}` : ""}${A}`,
          formatted24: `${E.toString().padStart(2, 0)}:${l.toString().padStart(2, 0)}`,
          height: M
        });
      }
      return Y;
    });
    return (Y, f) => (F(), G("div", Vn, [
      he("div", An, [
        T(o).allDayEvents ? (F(), G("div", jn, [
          W(Y.$slots, "all-day-label", {}, () => [
            Ze(ve(T(e).texts.allDay), 1)
          ])
        ])) : te("", !0),
        (F(!0), G(fe, null, be(_.value, (D, L) => (F(), G("div", {
          class: "vuecal__time-cell",
          key: L,
          style: we({ height: D.height || null })
        }, [
          W(Y.$slots, "time-cell", {
            index: L,
            minutes: D.minutes,
            hours: D.hours,
            minutesSum: D.minutesSum,
            format12: D.formatted12,
            format24: D.formatted24
          }, () => [
            he("label", null, ve(T(o).twelveHour ? D.formatted12 : D.formatted24), 1)
          ])
        ], 4))), 128)),
        T(o).currentTimeLabel ? (F(), G("div", {
          key: 1,
          class: "vuecal__current-time",
          style: we(T(v).nowLine.style),
          title: T(v).nowLine.currentTime
        }, [
          W(Y.$slots, "current-time-label", {
            now: T(v).now,
            timeFormatted: T(v).nowLine.currentTime
          }, () => [
            he("span", null, ve(T(v).nowLine.currentTime), 1)
          ])
        ], 12, Pn)) : te("", !0)
      ])
    ]));
  }
}, Fn = {
  __name: "body",
  setup(r) {
    const e = Le("vuecal"), { view: o, config: n, dateUtils: v, touch: _, eventsManager: Y } = e, f = de(null), D = de(null), L = de(null), { resizeState: E } = Y, l = O(() => ({
      "--vuecal-grid-columns": o.cols,
      "--vuecal-grid-rows": o.rows,
      "--vuecal-body-max-height": n.time ? `${n.timeCellHeight * (n.timeTo - n.timeFrom) / n.timeStep}px` : null
    })), A = O(() => {
      const p = n.horizontal, s = p ? D.value : L.value, U = v.formatTime(Se(s, n), n.twelveHour ? "h:mm{am}" : "HH:mm");
      return {
        style: { [p ? "left" : "top"]: `${s}%` },
        time: U
      };
    }), M = (p) => {
      var le;
      if (o.isMonth || o.isYear || o.isYears) return;
      const s = _.isResizingEvent && n.editableEvents.resizeX;
      if (!n.timeAtCursor && !s) return;
      const U = ((le = p.touches) == null ? void 0 : le[0]) || p, { clientX: y, clientY: I } = U;
      if (s && (E.cellEl = h(y, I)), n.timeAtCursor) {
        const { top: t, left: V } = f.value.getBoundingClientRect();
        n.horizontal ? D.value = (y - V) * 100 / f.value.clientWidth : L.value = nt(I - t, f.value);
      }
    }, c = () => {
      D.value = null, L.value = null;
    }, h = (p, s) => {
      const U = document.elementFromPoint(p, s);
      return (U == null ? void 0 : U.closest(".vuecal__cell")) || null;
    };
    return tt(() => {
      f.value.addEventListener("mousemove", M), f.value.addEventListener("touchmove", M), f.value.addEventListener("mouseleave", c), f.value.addEventListener("touchend", c);
    }), Ne(() => {
      f.value && (f.value.removeEventListener("mousemove", M), f.value.removeEventListener("touchmove", M), f.value.removeEventListener("mouseleave", c), f.value.removeEventListener("touchend", c));
    }), (p, s) => (F(), G("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: f,
      style: we(l.value)
    }, [
      Pe(Ue, { name: "vuecal-shrink" }, {
        default: Q(() => [
          T(n).timeAtCursor && (D.value !== null || L.value !== null) ? (F(), G("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: we(A.value.style)
          }, [
            he("label", null, ve(A.value.time), 1)
          ], 4)) : te("", !0)
        ]),
        _: 1
      }),
      (F(!0), G(fe, null, be(T(o).cellDates, (U, y) => (F(), He(Yt, {
        key: y,
        start: U.start,
        end: U.end,
        index: y
      }, Ae({ _: 2 }, [
        p.$slots.cell ? {
          name: "cell",
          fn: Q((I) => [
            W(p.$slots, "cell", ue({ ref_for: !0 }, I))
          ]),
          key: "0"
        } : void 0,
        p.$slots["cell-date"] ? {
          name: "cell-date",
          fn: Q((I) => [
            W(p.$slots, "cell-date", ue({ ref_for: !0 }, I))
          ]),
          key: "1"
        } : void 0,
        p.$slots["cell-content"] ? {
          name: "cell-content",
          fn: Q((I) => [
            W(p.$slots, "cell-content", ue({ ref_for: !0 }, I))
          ]),
          key: "2"
        } : void 0,
        p.$slots["cell-events"] ? {
          name: "cell-events",
          fn: Q((I) => [
            W(p.$slots, "cell-events", ue({ ref_for: !0 }, I))
          ]),
          key: "3"
        } : void 0,
        p.$slots[`event.${T(o).id}`] ? {
          name: `event.${T(o).id}`,
          fn: Q((I) => [
            W(p.$slots, `event.${T(o).id}`, ue({ ref_for: !0 }, I))
          ]),
          key: "4"
        } : void 0,
        p.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: Q((I) => [
            W(p.$slots, "event.all-day", ue({ ref_for: !0 }, I))
          ]),
          key: "5"
        } : void 0,
        p.$slots.event ? {
          name: "event",
          fn: Q((I) => [
            W(p.$slots, "event", ue({ ref_for: !0 }, I))
          ]),
          key: "6"
        } : void 0,
        p.$slots["event-count"] ? {
          name: "event-count",
          fn: Q((I) => [
            W(p.$slots, "event-count", ue({ ref_for: !0 }, I))
          ]),
          key: "7"
        } : void 0,
        p.$slots["now-line"] ? {
          name: "now-line",
          fn: Q((I) => [
            W(p.$slots, "now-line", ue({ ref_for: !0 }, I))
          ]),
          key: "8"
        } : void 0
      ]), 1032, ["start", "end", "index"]))), 128))
    ], 4));
  }
}, Rn = ["data-locale"], Xn = { class: "vuecal__scrollable-wrap" }, Bn = {
  key: 1,
  class: "vuecal__week-numbers"
}, Wn = { class: "vuecal__week-number" }, Nn = { class: "vuecal__body-wrap" }, Gn = {
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
    const n = r, v = o, _ = Ot("vuecal-el"), Y = Gt({ props: n, emit: v, attrs: Vt(), vuecalEl: _, uid: Ht() }), { config: f, view: D, dateUtils: L, touch: E } = Y, l = O(() => f.time && (D.isDay || D.isDays || D.isWeek)), A = O(() => Array(D.rows).fill().map((s, U) => L.getWeek(L.addDays(D.firstCellDate, 7 * U)))), M = O(() => {
      var s;
      return {
        "vuecal--ready": f.ready,
        [`vuecal--${f.theme}-theme`]: f.theme,
        [`vuecal--${f.size}`]: !0,
        "vuecal--date-picker": f.datePicker,
        "vuecal--dark": f.dark,
        "vuecal--light": !f.dark,
        [`vuecal--${D.id}-view`]: !0,
        "vuecal--view-has-time": l.value,
        "vuecal--timeless": !f.time,
        "vuecal--dragging-cell": E.isDraggingCell,
        "vuecal--dragging-event": E.isDraggingEvent,
        "vuecal--resizing-event": E.isResizingEvent,
        "vuecal--has-schedules": (s = f.schedules) == null ? void 0 : s.length,
        "vuecal--horizontal": f.horizontal
      };
    }), c = O(() => {
      var s;
      return {
        "--vuecal-time-cell-size": f.timeCellHeight && `${f.timeCellHeight}px`,
        "--vuecal-schedules-count": ((s = f.schedules) == null ? void 0 : s.length) ?? 0
      };
    }), h = O(() => {
      var s, U;
      return {
        "vuecal__scrollable--row": l.value || f.weekNumbers && D.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${D.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (s = f.schedules) == null ? void 0 : s.length,
        "vuecal__scrollable--no-schedules": !((U = f.schedules) != null && U.length),
        "vuecal__scrollable--horizontal": f.horizontal,
        "vuecal__scrollable--no-all-day-bar": !f.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": f.allDayEvents
      };
    }), p = (s) => {
      s.target.closest(".vuecal__cell") && s.preventDefault();
    };
    return tt(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && _.value.addEventListener("contextmenu", p), await qe(), f.ready = !0, v("ready", { config: f, view: D });
    }), Ne(() => {
      var s;
      (s = _ == null ? void 0 : _.value) == null || s.removeEventListener("contextmenu", p);
    }), ot("vuecal", Y), ot("$vuecalEl", _), e({ view: Y.view }), (s, U) => (F(), G("div", {
      class: De(["vuecal", M.value]),
      ref: "vuecal-el",
      "data-locale": s.locale,
      style: we(c.value)
    }, [
      s.$slots.diy ? W(s.$slots, "diy", {
        key: 0,
        vuecal: T(Y)
      }) : (F(), G(fe, { key: 1 }, [
        Pe(tn, null, Ae({ _: 2 }, [
          s.$slots.header ? {
            name: "header",
            fn: Q((y) => [
              W(s.$slots, "header", oe(ie(y)))
            ]),
            key: "0"
          } : void 0,
          !s.$slots.header && s.$slots["previous-button"] ? {
            name: "previous-button",
            fn: Q((y) => [
              W(s.$slots, "previous-button", oe(ie(y)))
            ]),
            key: "1"
          } : void 0,
          !s.$slots.header && s.$slots["next-button"] ? {
            name: "next-button",
            fn: Q((y) => [
              W(s.$slots, "next-button", oe(ie(y)))
            ]),
            key: "2"
          } : void 0,
          !s.$slots.header && s.$slots["today-button"] ? {
            name: "today-button",
            fn: Q((y) => [
              W(s.$slots, "today-button", oe(ie(y)))
            ]),
            key: "3"
          } : void 0,
          !s.$slots.header && s.$slots.title ? {
            name: "title",
            fn: Q((y) => [
              W(s.$slots, "title", oe(ie(y)))
            ]),
            key: "4"
          } : void 0,
          !s.$slots.header && s.$slots["title.day"] ? {
            name: "title.day",
            fn: Q((y) => [
              W(s.$slots, "title.day", oe(ie(y)))
            ]),
            key: "5"
          } : void 0,
          !s.$slots.header && s.$slots["title.days"] ? {
            name: "title.days",
            fn: Q((y) => [
              W(s.$slots, "title.days", oe(ie(y)))
            ]),
            key: "6"
          } : void 0,
          !s.$slots.header && s.$slots["title.week"] ? {
            name: "title.week",
            fn: Q((y) => [
              W(s.$slots, "title.week", oe(ie(y)))
            ]),
            key: "7"
          } : void 0,
          !s.$slots.header && s.$slots["title.month"] ? {
            name: "title.month",
            fn: Q((y) => [
              W(s.$slots, "title.month", oe(ie(y)))
            ]),
            key: "8"
          } : void 0,
          !s.$slots.header && s.$slots["title.year"] ? {
            name: "title.year",
            fn: Q((y) => [
              W(s.$slots, "title.year", oe(ie(y)))
            ]),
            key: "9"
          } : void 0,
          !s.$slots.header && s.$slots["title.years"] ? {
            name: "title.years",
            fn: Q((y) => [
              W(s.$slots, "title.years", oe(ie(y)))
            ]),
            key: "10"
          } : void 0,
          !s.$slots.header && s.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: Q((y) => [
              W(s.$slots, "schedule-heading", oe(ie(y)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        he("div", Xn, [
          Pe(Ue, {
            name: `vuecal-slide-fade--${T(D).transitionDirection}`
          }, {
            default: Q(() => [
              (F(), G("div", {
                class: De(["vuecal__scrollable", h.value]),
                key: T(D).id + T(D).start.getTime()
              }, [
                l.value ? (F(), He(Ln, { key: 0 }, Ae({ _: 2 }, [
                  s.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: Q((y) => [
                      W(s.$slots, "time-cell", oe(ie(y)))
                    ]),
                    key: "0"
                  } : void 0,
                  s.$slots["current-time-label"] ? {
                    name: "current-time-label",
                    fn: Q((y) => [
                      W(s.$slots, "current-time-label", oe(ie(y)))
                    ]),
                    key: "1"
                  } : void 0
                ]), 1024)) : te("", !0),
                T(f).weekNumbers && T(D).isMonth ? (F(), G("div", Bn, [
                  (F(!0), G(fe, null, be(A.value, (y) => (F(), G("div", Wn, [
                    W(s.$slots, "week-number", {}, () => [
                      he("small", null, ve(y), 1)
                    ])
                  ]))), 256))
                ])) : te("", !0),
                he("div", Nn, [
                  Pe(Hn, null, Ae({ _: 2 }, [
                    s.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: Q((y) => [
                        W(s.$slots, "weekday-heading", oe(ie(y)))
                      ]),
                      key: "0"
                    } : void 0,
                    s.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: Q((y) => [
                        W(s.$slots, "schedule-heading", oe(ie(y)))
                      ]),
                      key: "1"
                    } : void 0,
                    s.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: Q((y) => [
                        W(s.$slots, "event.all-day", oe(ie(y)))
                      ]),
                      key: "2"
                    } : void 0,
                    s.$slots.event ? {
                      name: "event",
                      fn: Q((y) => [
                        W(s.$slots, "event", oe(ie(y)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  Pe(Fn, null, Ae({ _: 2 }, [
                    s.$slots.cell ? {
                      name: "cell",
                      fn: Q((y) => [
                        W(s.$slots, "cell", oe(ie(y)))
                      ]),
                      key: "0"
                    } : void 0,
                    !s.$slots.cell && s.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: Q((y) => [
                        W(s.$slots, "cell-date", oe(ie(y)))
                      ]),
                      key: "1"
                    } : void 0,
                    !s.$slots.cell && s.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: Q((y) => [
                        W(s.$slots, "cell-content", oe(ie(y)))
                      ]),
                      key: "2"
                    } : void 0,
                    !s.$slots.cell && s.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: Q((y) => [
                        W(s.$slots, "cell-events", oe(ie(y)))
                      ]),
                      key: "3"
                    } : void 0,
                    !s.$slots.cell && !s.$slots["cell-events"] && s.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: Q((y) => [
                        W(s.$slots, "event.all-day", oe(ie(y)))
                      ]),
                      key: "4"
                    } : void 0,
                    !s.$slots.cell && !s.$slots["cell-events"] && s.$slots[`event.${T(D).id}`] ? {
                      name: `event.${T(D).id}`,
                      fn: Q((y) => [
                        W(s.$slots, `event.${T(D).id}`, oe(ie(y)))
                      ]),
                      key: "5"
                    } : void 0,
                    !s.$slots.cell && !s.$slots["cell-events"] && s.$slots.event ? {
                      name: "event",
                      fn: Q((y) => [
                        W(s.$slots, "event", oe(ie(y)))
                      ]),
                      key: "6"
                    } : void 0,
                    !s.$slots.cell && s.$slots["event-count"] ? {
                      name: "event-count",
                      fn: Q((y) => [
                        W(s.$slots, "event-count", oe(ie(y)))
                      ]),
                      key: "7"
                    } : void 0,
                    s.$slots["now-line"] ? {
                      name: "now-line",
                      fn: Q((y) => [
                        W(s.$slots, "now-line", oe(ie(y)))
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
  subtractHours: es,
  addMinutes: ts,
  subtractMinutes: ns,
  getWeek: ss,
  isToday: as,
  isSameDate: ls,
  isInRange: rs,
  isLeapYear: os,
  getPreviousFirstDayOfWeek: is,
  stringToDate: us,
  dateToMinutes: cs,
  countDays: ds,
  datesInSameTimeStep: vs,
  isValid: fs,
  formatDate: ms,
  formatDateLite: hs,
  formatTime: gs,
  formatTimeLite: ys,
  formatMinutes: Ds
} = Be.dateUtils;
export {
  Gn as VueCal,
  Jn as addDatePrototypes,
  Kn as addDays,
  xn as addHours,
  ts as addMinutes,
  ds as countDays,
  cs as dateToMinutes,
  vs as datesInSameTimeStep,
  ms as formatDate,
  hs as formatDateLite,
  Ds as formatMinutes,
  gs as formatTime,
  ys as formatTimeLite,
  is as getPreviousFirstDayOfWeek,
  ss as getWeek,
  rs as isInRange,
  os as isLeapYear,
  ls as isSameDate,
  as as isToday,
  fs as isValidDate,
  Zn as removeDatePrototypes,
  us as stringToDate,
  Qn as subtractDays,
  es as subtractHours,
  ns as subtractMinutes,
  Un as updateTexts,
  qn as useLocale
};
