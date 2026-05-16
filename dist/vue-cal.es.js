import { computed as C, reactive as Te, watch as pe, toRefs as Ct, ref as de, onBeforeUnmount as Ne, nextTick as qe, inject as Le, openBlock as R, createElementBlock as I, renderSlot as X, unref as $, Fragment as fe, renderList as be, normalizeClass as De, createCommentVNode as ne, createElementVNode as ge, createVNode as Pe, Transition as Ue, withCtx as U, createBlock as He, resolveDynamicComponent as at, mergeProps as ue, toHandlers as Je, normalizeProps as oe, onMounted as tt, toDisplayString as ve, createTextVNode as Ze, withModifiers as lt, normalizeStyle as we, TransitionGroup as rt, createSlots as je, useTemplateRef as Ot, useId as Ht, useAttrs as Vt, provide as ot, guardReactiveProps as ie } from "vue";
/**
  * vue-cal v5.0.1-rc.42
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
}, At = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], We = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], ct = (o) => !o || typeof o != "object" || Array.isArray(o) ? !1 : ("from" in o || "to" in o) && ("class" in o || "label" in o || "allowEvents" in o), Ke = (o) => {
  if (!o) return [];
  const e = Array.isArray(o) ? o : [o], i = [];
  for (let n = 0; n < e.length; n++) {
    const d = e[n];
    ct(d) && i.push({ ...d });
  }
  return i;
}, jt = (o) => {
  if (!o) return null;
  if (Array.isArray(o) || ct(o))
    return {
      default: Ke(o),
      schedules: {}
    };
  if (typeof o != "object") return null;
  const e = {
    default: Ke(o.default),
    schedules: {}
  };
  let i = 0;
  const n = o.schedules;
  if (n && typeof n == "object") {
    const d = Object.keys(n);
    i = d.length;
    for (let _ = 0; _ < d.length; _++) {
      const Y = d[_];
      e.schedules[Y] = Ke(n[Y]);
    }
  }
  return !e.default.length && !i ? null : e;
}, Pt = (o) => {
  const e = {};
  let i = !1;
  for (const n in o) {
    if (!Object.prototype.hasOwnProperty.call(o, n)) continue;
    const d = o[n];
    if (!d) continue;
    let _ = null, Y = null;
    const f = d.default;
    if (f && f.length)
      for (let F = 0; F < f.length; F++) {
        const E = f[F];
        E && E.allowEvents === !1 && typeof E.from == "number" && typeof E.to == "number" && (_ || (_ = []), _.push({ from: E.from, to: E.to }), i = !0);
      }
    const D = d.schedules;
    if (D && typeof D == "object")
      for (const F in D) {
        if (!Object.prototype.hasOwnProperty.call(D, F)) continue;
        const E = D[F];
        if (!E || !E.length) continue;
        const r = [];
        for (let j = 0; j < E.length; j++) {
          const M = E[j];
          M && M.allowEvents === !1 && typeof M.from == "number" && typeof M.to == "number" && (r.push({ from: M.from, to: M.to }), i = !0);
        }
        r.length && (Y || (Y = {}), Y[F] = r);
      }
    if (_ || Y) {
      const F = {};
      _ && (F.default = _), Y && (F.schedules = Y), e[n] = F;
    }
  }
  return { hasAny: i, byWeekday: e };
}, Lt = We.reduce((o, e, i) => (o[e] = i || 7, o), {}), Ft = (o, e, i) => {
  const { dateUtils: n } = o, d = !1, _ = C(() => {
    if (e.view && j.value[e.view]) return e.view;
    if (e.view && !j.value[e.view])
      return console.warn(
        `Vue Cal: the provided view \`${e.view}\` is not in the list of available views. The first available view will be chosen: \`${Object.keys(j.value)[0]}\`.`
      ), Object.keys(j.value)[0];
    const a = e.datePicker ? "month" : "week";
    return j.value[a] ? a : Object.keys(j.value)[0];
  }), Y = C(() => e.sm && !e.xs), f = C(() => e.xs || e.datePicker), D = C(() => e.clickToNavigate || e.datePicker && e.clickToNavigate !== !1), F = C(() => {
    const a = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, w = (O) => O.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [O, u] of Object.entries(i)) {
      const [q, ee, se] = O.match(/^on(Cell|Event)(.+)$/) || [];
      q && (a[ee.toLowerCase()][w(se).replace(/^-+|-+$/g, "")] = u);
    }
    return a;
  }), E = C(() => {
    var w;
    const a = {};
    return e.hideWeekends && (a[6] = !0) && (a[7] = !0), (w = e.hideWeekdays) != null && w.length && e.hideWeekdays.forEach((O) => a[Lt[O]] = !0), a;
  }), r = C(() => e.hideWeekends || E.value[6] && E.value[7]), j = C(() => {
    const a = e.datePicker;
    let w = 0, O = {};
    const u = e.views;
    if (a && !u) return {
      month: { ...ye.availableViews.month },
      year: { ...ye.availableViews.year },
      years: { ...ye.availableViews.years }
    };
    if (u)
      Array.isArray(u) ? O = u.reduce((q, ee) => (typeof ee == "string" && ye.availableViews[ee] ? q[ee] = ye.availableViews[ee] : w++, q), {}) : typeof u == "object" && (O = Object.entries(u).reduce((q, [ee, se]) => {
        const { cols: L, rows: re } = ye.availableViews[ee];
        return q[ee] = { cols: se.cols || L, rows: se.rows || re }, q;
      }, {})), w && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(O).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), O = { ...ye.availableViews });
    else if (O = { ...ye.availableViews }, e.horizontal) {
      const { days: q, week: ee } = ye.availableViews;
      O.days = { cols: q.rows, rows: q.cols }, O.week = { cols: ee.rows, rows: ee.cols };
    }
    return O;
  }), M = C(() => e.datePicker ? "month" : j.value.week ? "week" : Object.keys(j.value)[0]), c = C(() => {
    if (typeof e.selectedDate == "string") return n.stringToDate(e.selectedDate);
    if (e.selectedDate instanceof Date) return e.selectedDate;
    e.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", e.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), h = C(() => {
    if (!e.disableDays) return [];
    const a = [];
    if (Array.isArray(e.disableDays))
      for (let w of e.disableDays) {
        let O = w;
        typeof w == "string" ? O = n.stringToDate(w) : w instanceof Date && (w = n.formatDate(w, "YYYY-MM-DD")), O instanceof Date && !isNaN(O.getTime()) ? a.push(w) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", w);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", e.disableDays);
    return a;
  }), p = C(() => {
    let a = null;
    return e.minDate && typeof e.minDate == "string" ? a = n.stringToDate(e.minDate) : e.minDate && e.minDate instanceof Date && (a = e.minDate), (a == null ? void 0 : a.getTime()) || null;
  }), s = C(() => {
    let a = null;
    return e.maxDate && typeof e.maxDate == "string" ? a = n.stringToDate(e.maxDate) : e.maxDate && e.maxDate instanceof Date && (a = e.maxDate), (a == null ? void 0 : a.getTime()) || null;
  }), J = C(() => {
    const { view: a } = o, w = e.schedules;
    if (!(w != null && w.length) || !(a.isDay || a.isDays || a.isWeek)) return;
    const O = [];
    for (let u = 0; u < w.length; u++) {
      const q = w[u];
      q.hide || O.push({ ...q, id: q.id ?? u + 1 });
    }
    return O.length ? O : void 0;
  }), y = C(() => {
    const a = e.specialHours, w = e.businessHours;
    return a && typeof a == "object" && !Array.isArray(a) && Object.keys(a).length ? a : w && typeof w == "object" && !Array.isArray(w) ? w : {};
  }), N = C(() => {
    const a = y.value;
    return !a || typeof a != "object" ? {} : Object.entries(a).reduce((w, [O, u]) => {
      if (!We.includes(O)) return w;
      const q = jt(u);
      return q && (w[O] = q), w;
    }, {});
  }), le = C(() => Pt(N.value)), t = C(() => {
    const a = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return e.editableEvents === !0 ? a : e.editableEvents === !1 ? Object.keys(a).map((w) => a[w] = !1) : { ...a, ...e.editableEvents };
  }), V = C(() => {
    const { view: a } = o, { eventCount: w } = e;
    return (Array.isArray(w) ? w.includes(a.id) : w) && (a.isMonth && !e.eventsOnMonthView || a.isYear);
  }), S = C(() => {
    const { view: a } = o;
    return e.allDayEvents && e.time && (a.isDay || a.isDays || a.isWeek);
  }), k = C(() => {
    const { view: a } = o;
    return e.horizontal && (a.isDay || a.isDays || a.isWeek);
  }), T = C(() => e.timeAtCursor && e.time), g = async (a) => {
    var O;
    let w = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((u) => u.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((u) => u.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((u) => u.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((u) => u.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((u) => u.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((u) => u.default), "../i18n/da.json": () => import("./i18n/da.js").then((u) => u.default), "../i18n/de.json": () => import("./i18n/de.js").then((u) => u.default), "../i18n/el.json": () => import("./i18n/el.js").then((u) => u.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((u) => u.default), "../i18n/en-us.json": () => Promise.resolve().then(() => It).then((u) => u.default), "../i18n/es.json": () => import("./i18n/es.js").then((u) => u.default), "../i18n/et.json": () => import("./i18n/et.js").then((u) => u.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((u) => u.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((u) => u.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((u) => u.default), "../i18n/he.json": () => import("./i18n/he.js").then((u) => u.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((u) => u.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((u) => u.default), "../i18n/id.json": () => import("./i18n/id.js").then((u) => u.default), "../i18n/is.json": () => import("./i18n/is.js").then((u) => u.default), "../i18n/it.json": () => import("./i18n/it.js").then((u) => u.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((u) => u.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((u) => u.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((u) => u.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((u) => u.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((u) => u.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((u) => u.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((u) => u.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((u) => u.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((u) => u.default), "../i18n/no.json": () => import("./i18n/no.js").then((u) => u.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((u) => u.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((u) => u.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((u) => u.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((u) => u.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((u) => u.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((u) => u.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((u) => u.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((u) => u.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((u) => u.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((u) => u.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((u) => u.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((u) => u.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((u) => u.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((u) => u.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((u) => u.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((u) => u.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((u) => u.default) });
    {
      if (!w[`../i18n/${a}.json`]) {
        console.warn(`Vue Cal: the locale \`${a}\` does not exist. Falling back to \`en-us\`.`), a = "en-us";
        return;
      }
      w = await ((O = w[`../i18n/${a}.json`]) == null ? void 0 : O.call(w));
    }
    o.texts = Object.assign(o.texts, Object.assign({ ...ye.texts }, w)), n.updateTexts(o.texts);
  }, W = Te(e.events || []);
  return pe(
    [() => e.events, () => {
      var a;
      return (a = e.events) == null ? void 0 : a.length;
    }],
    ([a]) => W.splice(0, W.length, ...a || [])
  ), pe(() => e.locale, (a) => g(a || "en-us")), (e.locale || !o.texts.today) && g(e.locale || "en-us"), {
    ...Ct(e),
    events: W,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: F,
    defaultView: M,
    availableViews: j,
    disableDays: h,
    ready: d,
    sm: Y,
    xs: f,
    clickToNavigate: D,
    hideWeekdays: E,
    hideWeekends: r,
    minTimestamp: p,
    maxTimestamp: s,
    schedules: J,
    specialHours: N,
    specialHoursDisallowed: le,
    selectedDate: c,
    editableEvents: t,
    showCellEventCount: V,
    allDayEvents: S,
    horizontal: k,
    timeAtCursor: T,
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
}, Oe = (o, e) => {
  const i = e.timeTo - e.timeFrom;
  return (o - e.timeFrom) * 100 / i;
}, Me = (o, e) => {
  const i = e.timeTo - e.timeFrom;
  return ~~(o * i / 100 + e.timeFrom);
}, nt = (o, e) => {
  const i = e.clientHeight;
  return o * 100 / i;
}, Ee = ({ start: o, end: e, schedule: i, disallowed: n, hasSchedules: d }) => {
  if (!(n != null && n.hasAny) || !o || !e) return !1;
  const _ = n.byWeekday, Y = o.getTime(), f = e.getTime();
  if (f <= Y) return !1;
  const D = new Date(o);
  D.setHours(0, 0, 0, 0);
  const F = new Date(e);
  for (F.setHours(0, 0, 0, 0); D.getTime() <= F.getTime(); ) {
    const E = We[D.getDay()], r = _[E];
    if (r) {
      let j = r.default;
      if (d && i !== void 0 && i !== null && r.schedules) {
        const c = String(i);
        Object.prototype.hasOwnProperty.call(r.schedules, c) && (j = r.schedules[c]);
      }
      if (!j || !j.length) {
        D.setDate(D.getDate() + 1);
        continue;
      }
      const M = D.getTime();
      for (let c = 0; c < j.length; c++) {
        const { from: h, to: p } = j[c], s = M + h * 6e4, J = M + p * 6e4;
        if (Y < J && f > s) return !0;
      }
    }
    D.setDate(D.getDate() + 1);
  }
  return !1;
}, dt = 6e4, xe = (o, e, i, n, d) => {
  if (!(n != null && n.hasAny)) return e;
  const _ = o.getTime(), Y = e.getTime();
  if (Y <= _ || !Ee({ start: o, end: e, schedule: i, disallowed: n, hasSchedules: d }))
    return e;
  let f = _ + dt, D = Y, F = _;
  for (; f <= D; ) {
    const E = Math.floor((f + D + 1) / 2);
    Ee({ start: o, end: new Date(E), schedule: i, disallowed: n, hasSchedules: d }) ? D = E - 1 : (F = E, f = E + 1);
  }
  return new Date(F);
}, et = (o, e, i, n, d) => {
  if (!(n != null && n.hasAny)) return e;
  const _ = o.getTime(), Y = e.getTime();
  if (_ <= Y || !Ee({ start: e, end: o, schedule: i, disallowed: n, hasSchedules: d }))
    return e;
  let f = Y, D = _ - dt, F = Y;
  for (; f <= D; ) {
    const E = Math.floor((f + D) / 2);
    Ee({ start: new Date(E), end: o, schedule: i, disallowed: n, hasSchedules: d }) ? f = E + 1 : (F = E, D = E - 1);
  }
  return new Date(F);
}, Rt = ({
  anchorDayMinutes: o,
  cursorDayMinutes: e,
  snappedLow: i,
  snappedHigh: n,
  cellDate: d,
  schedule: _,
  disallowed: Y,
  hasSchedules: f
}) => {
  let D = i, F = n;
  if (!(Y != null && Y.hasAny) || F <= D) return { low: D, high: F };
  const E = new Date(d);
  E.setHours(0, 0, 0, 0);
  const r = (p) => {
    const s = new Date(E);
    return s.setMinutes(p), s;
  }, j = r(D), M = r(F);
  if (!Ee({ start: j, end: M, schedule: _, disallowed: Y, hasSchedules: f })) return { low: D, high: F };
  const c = E.getTime(), h = (p) => Math.round((p.getTime() - c) / 6e4);
  if (o <= e) {
    const p = xe(j, M, _, Y, f);
    F = h(p);
  } else {
    const p = et(M, j, _, Y, f);
    D = h(p);
  }
  return { low: D, high: F };
}, Xt = ({
  proposedStart: o,
  proposedEnd: e,
  prevStart: i,
  prevEnd: n,
  schedule: d,
  disallowed: _,
  hasSchedules: Y
}) => {
  if (!(_ != null && _.hasAny)) return { start: o, end: e };
  let f = o, D = e;
  if (D.getTime() <= f.getTime()) return { start: f, end: D };
  if (!Ee({ start: f, end: D, schedule: d, disallowed: _, hasSchedules: Y })) return { start: f, end: D };
  const F = i.getTime(), E = n.getTime(), r = f.getTime(), M = D.getTime() !== E, c = r !== F;
  if (M && !c)
    return D = xe(f, D, d, _, Y), { start: f, end: D };
  if (c && !M)
    return f = et(D, f, d, _, Y), { start: f, end: D };
  const h = xe(f, D, d, _, Y);
  return Ee({ start: f, end: h, schedule: d, disallowed: _, hasSchedules: Y }) ? (f = et(D, f, d, _, Y), { start: f, end: D }) : { start: f, end: h };
}, Ge = Te({ id: null, date: null });
let it = !1, Qe = !0;
const _e = Te({ el: null, cell: null, timeout: null }), ke = Te({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function Bt(o) {
  const { config: e, view: i, eventsManager: n, emit: d, uid: _, dateUtils: Y } = o, f = (p) => {
    var V;
    const s = e.horizontal, { clientX: J, clientY: y } = ((V = p.touches) == null ? void 0 : V[0]) || p, { top: N, left: le } = p.currentTarget.getBoundingClientRect(), t = ~~p.dataTransfer.getData("cursor-grab-at");
    if (s) {
      const S = J - le - t;
      return Me(S * 100 / p.currentTarget.clientWidth, e);
    } else {
      const S = y - N - t;
      return Me(nt(S, p.currentTarget), e);
    }
  }, D = (p, s, J) => {
    const y = s.duration || F(s.start, s.end) || e.timeStep;
    let N = Math.max(f(p), 0);
    if (e.snapToInterval) {
      const S = N + e.snapToInterval / 2;
      N = S - S % e.snapToInterval;
    }
    const le = new Date(new Date(J).setMinutes(N)), t = Math.min(N + y, 1440), V = new Date(new Date(J).setMinutes(t));
    return { start: le, end: V };
  }, F = (p, s) => Math.round((s - p) / 6e4);
  return {
    eventDragStart: (p, s) => {
      if (p.target.nodeType === 3 || o.touch.isResizingEvent) return p.preventDefault();
      p.dataTransfer.effectAllowed = "move", p.dataTransfer.dropEffect = "move";
      const J = { ...s, _: { id: s._.id, duration: F(s.start, s.end) } };
      try {
        p.dataTransfer.setData("text/plain", ""), p.dataTransfer.setData("event", JSON.stringify(J)), p.dataTransfer.setData("cursor-grab-at", e.horizontal ? p.offsetX : p.offsetY);
      } catch (N) {
        return console.warn("Vue Cal: Failed to set drag data:", N), p.preventDefault();
      }
      ke.eventId = s._.id, ke.fromVueCal = _, d("event-drag-start", {
        e: p,
        event: s
      });
      const y = p.target.closest(".vuecal__event");
      y.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        y.classList.add("vuecal__event--dragging-original"), y.classList.remove("vuecal__event--dragging-ghost");
      }, 0), it = !1, Object.assign(Ge, { id: i.id, date: i.firstCellDate }), Qe = !0, o.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (p, s) => {
      ke.eventId = null, p.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: J, toVueCal: y } = ke;
      y && J !== y && n.deleteEvent(s._.id, 3), it && Qe && Ge.id && i.switchView(Ge.id, Ge.date, !0), d("event-drag-end", {
        e: p,
        event: s,
        external: ke.fromVueCal !== _
      }), ke.fromVueCal = null, ke.toVueCal = null, o.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (p, s) => {
      const { start: J } = s, y = p.currentTarget;
      if (!p.currentTarget.contains(p.relatedTarget)) {
        if (y === _e.el || !y.className.includes("vuecal__cell-content")) return !1;
        _e.el && (_e.cell.highlighted = !1), Object.assign(_e, { el: y, cell: s, timeout: clearTimeout(_e.timeout) }), s.highlighted = !0, ["years", "year", "month"].includes(i.id) && (_e.timeout = setTimeout(() => o.switchToNarrowerView(J), 2e3));
      }
    },
    cellDragOver: (p, s) => {
      const { start: J, schedule: y } = s;
      p.preventDefault(), s.highlighted = !0, (y || y === 0) && (s.highlightedSchedule = y);
    },
    cellDragLeave: (p, s) => {
      p.preventDefault(), !p.currentTarget.contains(p.relatedTarget) && (s.highlightedSchedule = !1, _e.cell === s && (clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null }), s.highlighted = !1));
    },
    cellDragDrop: async (p, s, J = !1) => {
      var w, O, u, q, ee, se;
      p.preventDefault(), clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null });
      const y = JSON.parse(p.dataTransfer.getData("event") || "{}");
      y.start && (y.start = new Date(y.start)), y.end && (y.end = new Date(y.end));
      let N, le, t;
      J ? (le = new Date(s.start), t = new Date(s.end)) : { start: le, end: t } = D(p, y, s.start);
      let { schedule: V } = ((w = p.target.closest("[data-schedule]")) == null ? void 0 : w.dataset) || {}, S;
      V !== void 0 && String(V).length && (S = ((u = (O = e.schedules) == null ? void 0 : O.find((L) => String(L.id) === String(V))) == null ? void 0 : u.id) ?? V);
      let k = () => {
      };
      ke.fromVueCal === _ ? (N = n.getEvent(y._.id), N && (N._.dragging = !1, k = (L) => {
        if (N.start = le, N.end = t, N.allDay = J, S !== void 0 && (N.schedule = S), L && typeof L == "object") {
          const { _: re, ...l } = L;
          Object.assign(N, l);
        }
      })) : (N = {
        ...y,
        start: le,
        end: t,
        ...S !== void 0 && { schedule: S },
        _: { id: ((q = y._) == null ? void 0 : q.id) || y.id, duration: F(le, t) },
        getOverlappingEvents: () => n.getEventsInRange(le, t, { schedule: S })
      }, k = (L) => {
        if (N = n.createEvent(N), L && typeof L == "object") {
          const { _: re, ...l } = L;
          Object.assign(N, l);
        }
      });
      const T = S !== void 0 ? S : (N == null ? void 0 : N.schedule) !== void 0 ? N.schedule : y == null ? void 0 : y.schedule, g = !!(e.schedules && e.schedules.length);
      let W = !0;
      const { drop: a } = (ee = e.eventListeners) == null ? void 0 : ee.event;
      !J && e.time && ((se = e.specialHoursDisallowed) != null && se.hasAny) && Ee({
        start: le,
        end: t,
        schedule: T,
        disallowed: e.specialHoursDisallowed,
        hasSchedules: g
      }) ? W = !1 : a && (W = await a({
        e: p,
        event: { ...N, start: le, end: t, schedule: S },
        overlaps: N.getOverlappingEvents({ start: le, end: t, schedule: S }),
        cell: s,
        external: ke.fromVueCal !== _
      })), W !== !1 && k(W), s.highlighted = !1, s.highlightedSchedule = null, Qe = !1, ke.toVueCal = _, d("event-dropped", {
        e: p,
        cell: s,
        event: N,
        originalEvent: y,
        external: ke.fromVueCal !== _
      });
    }
  };
}
const vt = (o, e) => {
  let i, n, d, _ = {}, Y = {};
  const f = de(o), D = () => {
    f.value.today || (f.value = e), Date.prototype.addDays = function(l) {
      return j(this, l || 0);
    }, Date.prototype.subtractDays = function(l) {
      return M(this, l || 0);
    }, Date.prototype.addHours = function(l) {
      return c(this, l || 0);
    }, Date.prototype.subtractHours = function(l) {
      return h(this, l || 0);
    }, Date.prototype.addMinutes = function(l) {
      return p(this, l || 0);
    }, Date.prototype.subtractMinutes = function(l) {
      return s(this, l || 0);
    }, Date.prototype.getWeek = function() {
      return y(this);
    }, Date.prototype.isToday = function() {
      return N(this);
    }, Date.prototype.isLeapYear = function() {
      return V(this);
    }, Date.prototype.format = function(l = "YYYY-MM-DD") {
      return w(this, l);
    }, Date.prototype.formatTime = function(l = "HH:mm") {
      return u(this, l);
    };
  }, F = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, E = (l) => {
    f.value = l, Date.prototype.subtractDays && D();
  }, r = () => (n !== (/* @__PURE__ */ new Date()).getDate() && (i = /* @__PURE__ */ new Date(), n = i.getDate(), d = `${i.getFullYear()}-${i.getMonth()}-${i.getDate()}`), d), j = (l, A) => {
    const b = new Date(l.valueOf());
    return b.setDate(b.getDate() + A), b;
  }, M = (l, A) => {
    const b = new Date(l.valueOf());
    return b.setDate(b.getDate() - A), b;
  }, c = (l, A) => {
    const b = new Date(l.valueOf());
    return b.setHours(b.getHours() + A), b;
  }, h = (l, A) => {
    const b = new Date(l.valueOf());
    return b.setHours(b.getHours() - A), b;
  }, p = (l, A) => {
    const b = new Date(l.valueOf());
    return b.setMinutes(b.getMinutes() + A), b;
  }, s = (l, A) => {
    const b = new Date(l.valueOf());
    return b.setMinutes(b.getMinutes() - A), b;
  }, J = (l, A) => {
    const b = (K) => {
      const ae = K % A;
      return ae !== 0 && (K += ae >= A / 2 ? A - ae : -ae), K;
    };
    if (typeof l == "number") return b(l);
    if (l instanceof Date) {
      let K = b(l.getMinutes());
      K >= 60 && (l.setHours(l.getHours() + 1), K = 0), l.setMinutes(K, 0, 0);
    }
  }, y = (l, A = !1) => {
    const b = new Date(Date.UTC(l.getFullYear(), l.getMonth(), l.getDate())), K = b.getUTCDay() || 7;
    b.setUTCDate(b.getUTCDate() + 4 - K);
    const ae = new Date(Date.UTC(b.getUTCFullYear(), 0, 1));
    return Math.ceil(((b - ae) / 864e5 + 1) / 7) + (A ? 1 : 0);
  }, N = (l) => `${l.getFullYear()}-${l.getMonth()}-${l.getDate()}` === r(), le = (l, A) => {
    if (!l || !A) return console.warn(`Vue Cal: missing date${l ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (a(l)) {
      if (!a(A)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${A}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${l}\`.`);
    return l.getFullYear() === A.getFullYear() && l.getMonth() === A.getMonth() && l.getDate() === A.getDate();
  }, t = (l, A, b) => a(l) ? l.getTime() >= A && l.getTime() <= b : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${l}\`.`), V = (l) => {
    const A = l.getFullYear();
    return !(A % 400) || A % 100 && !(A % 4);
  }, S = (l = null, A) => {
    const b = l && new Date(l.valueOf()) || /* @__PURE__ */ new Date(), K = A ? 7 : 6;
    return b.setDate(b.getDate() - (b.getDay() + K) % 7), b;
  }, k = (l) => l instanceof Date ? l : (l.length === 10 && (l += " 00:00"), new Date(l.replace(/-/g, "/"))), T = (l) => l.getHours() * 60 + l.getMinutes(), g = (l, A) => {
    typeof l == "string" && (l = l.replace(/-/g, "/")), typeof A == "string" && (A = A.replace(/-/g, "/")), l = new Date(l).setHours(0, 0, 0, 0), A = new Date(A).setHours(0, 0, 1, 0);
    const b = (new Date(A).getTimezoneOffset() - new Date(l).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((A - l - b) / (24 * 3600 * 1e3));
  }, W = (l, A, b) => Math.abs(l.getTime() - A.getTime()) <= b * 60 * 1e3, a = (l) => l && l instanceof Date && !isNaN(l), w = (l, A = "YYYY-MM-DD", b = null) => {
    if (b || (b = f.value), A || (A = "YYYY-MM-DD"), A === "YYYY-MM-DD") return O(l);
    _ = {}, Y = {};
    const K = {
      YYYY: () => L(l, b).YYYY,
      YY: () => L(l, b).YY(),
      M: () => L(l, b).M,
      MM: () => L(l, b).MM(),
      MMM: () => L(l, b).MMM(),
      MMMM: () => L(l, b).MMMM(),
      MMMMG: () => L(l, b).MMMMG(),
      D: () => L(l, b).D,
      DD: () => L(l, b).DD(),
      S: () => L(l, b).S(),
      d: () => L(l, b).d,
      dd: () => L(l, b).dd(),
      ddd: () => L(l, b).ddd(),
      dddd: () => L(l, b).dddd(),
      HH: () => re(l, b).HH,
      H: () => re(l, b).H,
      hh: () => re(l, b).hh,
      h: () => re(l, b).h,
      am: () => re(l, b).am,
      AM: () => re(l, b).AM,
      mm: () => re(l, b).mm,
      m: () => re(l, b).m,
      s: () => re(l, b).s
    };
    return A.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (ae, he) => {
      const ce = K[he.replace(/\{|\}/g, "")];
      return ce !== void 0 ? ce() : he;
    });
  }, O = (l) => {
    const A = l.getMonth() + 1, b = l.getDate();
    return `${l.getFullYear()}-${A < 10 ? "0" : ""}${A}-${b < 10 ? "0" : ""}${b}`;
  }, u = (l, A = "HH:mm", b = null, K = !1) => {
    let ae = !1;
    if (K) {
      const [Ve, m, H] = [l.getHours(), l.getMinutes(), l.getSeconds()];
      Ve + m + H === 141 && (ae = !0);
    }
    if (l instanceof Date && A === "HH:mm") return ae ? "24:00" : q(l);
    Y = {}, b || (b = f.value);
    const he = re(l, b), ce = A.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (Ve, m) => {
      const H = he[m.replace(/\{|\}/g, "")];
      return H !== void 0 ? H : m;
    });
    return ae ? ce.replace("23:59", "24:00") : ce;
  }, q = (l) => {
    const A = l.getHours(), b = l.getMinutes();
    return `${(A < 10 ? "0" : "") + A}:${(b < 10 ? "0" : "") + b}`;
  }, ee = (l) => {
    const A = Math.floor(l / 60).toString().padStart(2, 0), b = (l % 60).toString().padStart(2, 0);
    return `${A}:${b}`;
  }, se = (l) => {
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
  }, L = (l, A) => {
    if (_.D) return _;
    const b = l.getFullYear(), K = l.getMonth() + 1, ae = l.getDate(), ce = (l.getDay() - 1 + 7) % 7;
    return _ = {
      // Year.
      YYYY: b,
      // 2024.
      YY: () => b.toString().substring(2),
      // 24.
      // Month.
      M: K,
      // 1 to 12.
      MM: () => K.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => A.months[K - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => A.months[K - 1],
      // January to December.
      MMMMG: () => (A.monthsGenitive || A.months)[K - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: ae,
      // 1 to 31.
      DD: () => ae.toString().padStart(2, 0),
      // 01 to 31.
      S: () => se(ae),
      // st, nd, rd, th.
      // Day of the week.
      d: ce + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => A.weekDaysShort.length ? A.weekDaysShort[ce] : A.weekDays[ce][0],
      // M to S.
      ddd: () => A.weekDaysShort.length ? A.weekDaysShort[ce] : A.weekDays[ce].substr(0, 3),
      // Mon to Sun.
      dddd: () => A.weekDays[ce]
      // Monday to Sunday.
    }, _;
  }, re = (l, A) => {
    if (Y.am) return Y;
    let b, K, ae;
    l instanceof Date ? (b = l.getHours(), K = l.getMinutes(), ae = l.getSeconds()) : (b = Math.floor(l / 60), K = Math.floor(l % 60));
    const he = b % 12 ? b % 12 : 12, ce = (A || { am: "am", pm: "pm" })[b === 24 || b < 12 ? "am" : "pm"];
    return Y = {
      H: b,
      h: he,
      HH: b.toString().padStart(2, 0),
      hh: he.toString().padStart(2, 0),
      am: ce,
      AM: ce.toUpperCase(),
      m: K,
      mm: K.toString().padStart(2, 0),
      s: ae
    }, Y;
  };
  return {
    addDatePrototypes: D,
    removeDatePrototypes: F,
    updateTexts: E,
    addDays: j,
    subtractDays: M,
    addHours: c,
    subtractHours: h,
    addMinutes: p,
    subtractMinutes: s,
    snapToInterval: J,
    getWeek: y,
    isToday: N,
    isSameDate: le,
    isInRange: t,
    isLeapYear: V,
    getPreviousFirstDayOfWeek: S,
    stringToDate: k,
    dateToMinutes: T,
    countDays: g,
    datesInSameTimeStep: W,
    isValid: a,
    formatDate: w,
    formatDateLite: O,
    formatTime: u,
    formatTimeLite: q,
    formatMinutes: ee
  };
}, Wt = (o) => {
  const { dateUtils: e, config: i } = o;
  let n = 0;
  const d = C(() => {
    var S, k, T, g, W;
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
    }, V = i.events.slice().sort((a, w) => a.start - w.start < 0 ? -1 : 1);
    for (let a of V) {
      const w = typeof a.start == "string" || typeof a.end == "string", O = !((S = a._) != null && S.register) || !a.isOverlapping || !a.delete;
      let u = !1;
      if (!w && ((k = a._) != null && k.cachedStart) && ((T = a._) != null && T.cachedEnd) && (u = a.start.getTime() !== ((g = a._) == null ? void 0 : g.cachedStart) || a.end.getTime() !== ((W = a._) == null ? void 0 : W.cachedEnd)), w || O || u) {
        if (!_(a)) continue;
        Y(a), a._.cachedStart = a.start.getTime(), a._.cachedEnd = a.end.getTime();
      }
      if (t.byId[a._.id] = a, a.recurring)
        t.recurring.push(a._.id);
      else if (!e.isSameDate(a.start, new Date(a.end.getTime() - 1)))
        a._.multiday = i.multidayEvents, i.multidayEvents ? t.multiday.push(a._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), a.end = new Date(new Date(a.start).setHours(23, 59, 59, 999)), Y(a)), t.byDate[a._.startFormatted] || (t.byDate[a._.startFormatted] = []), t.byDate[a._.startFormatted].push(a._.id);
      else {
        t.byDate[a._.startFormatted] || (t.byDate[a._.startFormatted] = []), t.byDate[a._.startFormatted].push(a._.id);
        const q = a._.startFormatted.substring(0, 4), ee = a._.startFormatted.substring(5, 7), se = a._.startFormatted.substring(8, 10);
        t.byYear[q] || (t.byYear[q] = {}), t.byYear[q][ee] || (t.byYear[q][ee] = {}), t.byYear[q][ee][se] || (t.byYear[q][ee][se] = []), t.byYear[q][ee][se].push(a._.id);
      }
    }
    return t;
  }), _ = (t) => !t.start || !t.end ? (console.error("Vue Cal: Event is missing start or end date", t), !1) : (typeof t.start == "string" && (t.start = e.stringToDate(t.start)), typeof t.end == "string" && (t.end = e.stringToDate(t.end)), t.start.setSeconds(0, 0), t.end.getSeconds() === 59 ? t.end.setMinutes(t.end.getMinutes() + 1, 0, 0) : t.end.setSeconds(0, 0), isNaN(t.start) || isNaN(t.end) || t.end.getTime() < t.start.getTime() ? (isNaN(t.start) ? console.error(`Vue Cal: invalid start date for event "${t.title}".`, t.start) : isNaN(t.end) ? console.error(`Vue Cal: invalid end date for event "${t.title}".`, t.end) : console.error(`Vue Cal: invalid event dates for event "${t.title}". The event ends before it starts.`, t.start, t.end), !1) : !0), Y = (t) => {
    t._ || (t._ = {}), t._.id = t._.id || ++n, t._.multiday = !e.isSameDate(t.start, new Date(t.end.getTime() - 1)), t._.startFormatted = e.formatDate(t.start), t._.endFormatted = e.formatDate(t.end), t._.startMinutes = ~~e.dateToMinutes(t.start), t._.endMinutes = ~~e.dateToMinutes(t.end);
    const V = t.start.getHours(), S = t.start.getMinutes().toString().padStart(2, 0), k = t.end.getHours(), T = t.end.getMinutes().toString().padStart(2, 0);
    t._.startTimeFormatted24 = `${V.toString().padStart(2, 0)}:${S}`, t._.startTimeFormatted12 = `${V % 12 || 12}${S ? `:${S}` : ""} ${V < 12 ? "AM" : "PM"}`, t._.endTimeFormatted24 = `${k.toString().padStart(2, 0)}:${T}`, t._.endTimeFormatted12 = `${k % 12 || 12}${T ? `:${T}` : ""} ${k < 12 ? "AM" : "PM"}`, t._.duration = Math.abs(~~((t.end - t.start) / 6e4)), t.delete || (t.delete = function(g) {
      return E(this._.id, g);
    }), t._.deleting === void 0 && (t._.deleting = !1), t._.deleted === void 0 && (t._.deleted = !1), t.isOverlapping || (t.isOverlapping = function(g = null) {
      return this.getOverlappingEvents(g).length;
    }), t.getOverlappingEvents || (t.getOverlappingEvents = function(g = null) {
      var u;
      const W = (g == null ? void 0 : g.start) || this.start, a = (g == null ? void 0 : g.end) || this.end, w = (g == null ? void 0 : g.schedule) !== void 0 && (g == null ? void 0 : g.schedule) !== null ? g.schedule : this.schedule, O = (u = i.schedules) != null && u.length ? w : null;
      return j(W, a, { excludeIds: [this._.id], schedule: O });
    }), t._.register || (t._.register = (g) => {
      t._.$el = g, t._.fireCreated && (o.emit("event-created", t), delete t._.fireCreated);
    }), t._.unregister || (t._.unregister = () => {
      t._.$el = null, t._.register = null, t.isOverlapping = null, t.getOverlappingEvents = null, t.delete = null;
    });
  }, f = (t) => d.value.byId[t], D = (t) => {
    const V = [];
    for (const { start: S, end: k } of t) {
      const T = j(S, k);
      T.length && V.push(...T);
    }
    return V;
  }, F = (t) => {
    var k;
    if (!t.start || !t.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    i.snapToInterval && (e.snapToInterval(t.start, i.snapToInterval), e.snapToInterval(t.end, i.snapToInterval)), t = { ...t };
    const V = typeof t.start == "string" ? e.stringToDate(t.start) : new Date(t.start), S = typeof t.end == "string" ? e.stringToDate(t.end) : new Date(t.end);
    if (!t.allDay && i.time && ((k = i.specialHoursDisallowed) != null && k.hasAny) && Ee({
      start: V,
      end: S,
      schedule: t.schedule,
      disallowed: i.specialHoursDisallowed,
      hasSchedules: !!(i.schedules && i.schedules.length)
    })) {
      console.warn("Vue Cal: Cannot create an event overlapping a time range where allowEvents is false.");
      return;
    }
    return t.start = V, t.end = S, t._ || (t._ = {}), t._.id = ++n, t._.fireCreated = !0, i.events.push(t), t;
  }, E = async (t, V = 0) => {
    var W, a;
    if (!t) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let S = typeof t == "string" || !isNaN(t) ? t : null;
    const k = typeof t == "object" ? Object.entries(t) : null;
    if (k) {
      const [w, O] = k[0];
      S = (W = i.events.find((u) => u[w] === O)) == null ? void 0 : W._.id;
    }
    if (!i.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!S) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const T = i.events.findIndex((w) => w._.id === S);
    if (T === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${S}\`.`);
    const g = i.events[T];
    if (g.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${S}\` since it was explicitely set to \`delete: false\`.`);
    switch (V) {
      case 0:
        g._.deleting ? i.events.splice(T, 1) : g._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        g._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        g._.deleted = !0, i.events[T]._.deleted = !0, (a = g._.$el) == null || a.dispatchEvent(new CustomEvent("event-deleted", { detail: g._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        i.events.splice(T, 1), o.emit("update:events", i.events), o.emit("event-delete", g);
        break;
    }
    return !0;
  }, r = (t, V, S) => {
    const k = i.allDayEvents ? { allDay: S } : {}, T = j(t, V, { background: !1, ...k });
    if (!T.length) return { cellOverlaps: {}, longestStreak: 0 };
    const g = {};
    let W = [], a = 0;
    T.sort((w, O) => w.start - O.start || w.end - w.start - (O.end - O.start));
    for (const w of T) {
      const O = w._.id;
      g[O] || (g[O] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), W = W.filter((L) => L.end > w.start);
      const u = W.filter((L) => {
        var l;
        return (!((l = i.schedules) != null && l.length) || w.schedule === L.schedule) && L.start < w.end;
      }), q = new Set(u.map((L) => {
        var re;
        return ((re = g[L._.id]) == null ? void 0 : re.position) ?? 0;
      }));
      let ee = 0;
      for (; q.has(ee); ) ee++;
      g[O].position = ee, W.push(w);
      const se = Math.max(1, ...u.map((L) => {
        var re;
        return ((re = g[L._.id]) == null ? void 0 : re.maxConcurrent) ?? 1;
      }));
      g[O].maxConcurrent = Math.max(u.length + 1, se);
      for (const L of u)
        g[L._.id].overlaps.add(O), g[O].overlaps.add(L._.id), g[L._.id].maxConcurrent = g[O].maxConcurrent;
      a = Math.max(a, g[O].maxConcurrent);
    }
    for (const w in g) g[w].overlaps = [...g[w].overlaps];
    return { cellOverlaps: g, longestStreak: a };
  }, j = (t, V, { excludeIds: S = [], schedule: k = null, background: T = !0, allDay: g = !1 } = {}) => {
    const { byId: W, byYear: a } = d.value, w = Object.keys(W).length;
    if (!w) return [];
    const O = t.getFullYear(), u = V.getFullYear(), q = t.getMonth() + 1, ee = V.getMonth() + 1, se = t.getDate(), L = V.getDate(), re = new Date(t).setHours(0, 0, 0, 0), l = new Date(V).setHours(23, 59, 59, 999), A = new Set(S), b = [];
    if (w <= 100) {
      for (const K of Object.values(W))
        !K || A.has(K._.id) || k !== null && k !== K.schedule || T === !1 && K.background || i.allDayEvents && (g && !K.allDay || !g && K.allDay) || K.start.getTime() < l && K.end.getTime() > re && b.push(K);
      return b;
    }
    for (let K = O; K <= u; K++) {
      const ae = `${K}`, he = a[ae];
      if (!he) continue;
      const ce = K === O ? q : 1, Ve = K === u ? ee : 12;
      for (let m = ce; m <= Ve; m++) {
        const H = String(m).padStart(2, "0"), P = he[H];
        if (P)
          for (const G in P) {
            const Q = +G;
            if (K === O && m === q && Q < se || K === u && m === ee && Q > L) continue;
            const B = P[G];
            if (B != null && B.length)
              for (let te = 0; te < B.length; te++) {
                const v = W[B[te]];
                !v || A.has(v._.id) || k !== null && k !== v.schedule || T === !1 && v.background || i.allDayEvents && (g && !v.allDay || !g && v.allDay) || v.start.getTime() < l && v.end.getTime() > re && b.push(v);
              }
          }
      }
    }
    return b;
  }, M = (t, V, S) => {
    const k = t.allDay || !i.time, T = k ? new Date(t.start).setHours(0, 0, 0, 0) : t.start.getTime(), g = k ? new Date(t.end).setHours(23, 59, 59, 999) : t.end.getTime(), W = k ? new Date(V).setHours(0, 0, 0, 0) : V.getTime(), a = k ? new Date(S).setHours(23, 59, 59, 999) : S.getTime();
    return g > W && T < a;
  }, c = Te({
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
    var W;
    const S = c[i.horizontal ? "movePercentageX" : "movePercentageY"];
    let k = Me(S, i);
    if (k = Math.max(0, Math.min(k, 1440)), i.snapToInterval) {
      const a = k + i.snapToInterval / 2;
      k = a - a % i.snapToInterval;
    }
    let T = t.start, g = new Date(V.getTime() + k * 6e4);
    return c.moveX && ((W = o.touch) != null && W.currentHoveredCell) && c.cellEl && new Date(parseInt(o.touch.currentHoveredCell.dataset.start)), g < c.resizeStartDate && (T = g, g = c.resizeStartDate), { newStart: T, newEnd: g };
  }, p = 4, s = (t, V) => {
    if (!c.cellEl) return;
    const { top: S, left: k, width: T, height: g } = c.cellEl.getBoundingClientRect();
    c.moveX = t - k, c.moveY = V - S, c.movePercentageX = c.moveX * 100 / T, c.movePercentageY = c.moveY * 100 / g, c.documentMouseX = t, c.documentMouseY = V;
  }, J = (t, V) => {
    var a, w;
    const S = new Date(t.start), k = new Date(t.end);
    let { newStart: T, newEnd: g } = h(t, V);
    if (i.time && !t.allDay && ((a = i.specialHoursDisallowed) != null && a.hasAny)) {
      const O = Xt({
        proposedStart: T,
        proposedEnd: g,
        prevStart: S,
        prevEnd: k,
        schedule: t.schedule,
        disallowed: i.specialHoursDisallowed,
        hasSchedules: !!(i.schedules && i.schedules.length)
      });
      T = O.start, g = O.end;
    }
    const W = !i.time || t.allDay || !((w = i.specialHoursDisallowed) != null && w.hasAny) || !Ee({
      start: T,
      end: g,
      schedule: t.schedule,
      disallowed: i.specialHoursDisallowed,
      hasSchedules: !!(i.schedules && i.schedules.length)
    });
    return { newStart: T, newEnd: g, internalOk: W };
  }, y = async (t) => {
    var g, W, a, w;
    const { clientX: V, clientY: S } = ((g = t.touches) == null ? void 0 : g[0]) || t, k = V - c.resizeAnchorClientX, T = S - c.resizeAnchorClientY;
    if (!c.resizeSlopExceeded) {
      if (k * k + T * T <= p) return;
      c.resizeSlopExceeded = !0;
    }
    if (s(V, S), c.fromResizer && !c.resizingOriginalEvent) {
      c.resizingOriginalEvent = { ...c.resizingEvent, _: { ...c.resizingEvent._ } };
      const O = ((W = i.eventListeners) == null ? void 0 : W.event) || {};
      (a = O["resize-start"]) == null || a.call(O, { e: t, event: c.resizingEvent });
    }
    if (c.fromResizer && c.resizingEvent) {
      const O = new Date(parseInt(c.cellEl.dataset.start)), { newStart: u, newEnd: q, internalOk: ee } = J(c.resizingEvent, O);
      let se = ee;
      const { resize: L } = ((w = i.eventListeners) == null ? void 0 : w.event) || {};
      ee && L && (se = await L({
        e: t,
        event: { ...c.resizingEvent, start: u, end: q },
        overlaps: c.resizingEvent.getOverlappingEvents({ start: u, end: q })
      })), se !== !1 ? (c.resizingEvent.start = u, c.resizingEvent.end = q, c.resizingLastAcceptedEvent && (c.resizingLastAcceptedEvent = null), t.preventDefault()) : L && (c.resizingLastAcceptedEvent = { ...c.resizingEvent, _: { ...c.resizingEvent._ } });
    }
  }, N = async (t) => {
    var V, S, k, T, g;
    if ((V = o.touch) != null && V.isResizingEvent && c.resizingEvent) {
      const { clientX: W, clientY: a } = ((S = t.changedTouches) == null ? void 0 : S[0]) || t;
      if (!c.resizeSlopExceeded)
        c.resizingEvent.start = new Date(c.resizeStartDate), c.resizingEvent.end = new Date(c.resizeBaselineEndMs);
      else {
        s(W, a);
        const w = new Date(parseInt(c.cellEl.dataset.start)), { newStart: O, newEnd: u, internalOk: q } = J(c.resizingEvent, w);
        let ee = q;
        const L = (((k = i.eventListeners) == null ? void 0 : k.event) || {})["resize-end"];
        q && L && (ee = await L({
          e: t,
          event: c.resizingEvent,
          original: c.resizingOriginalEvent,
          // Original event details before resizing.
          overlaps: c.resizingEvent.getOverlappingEvents({ start: O, end: u })
        })), c.resizingEvent.start = ee === !1 ? (c.resizingLastAcceptedEvent || c.resizingOriginalEvent).start : ((T = c.resizingLastAcceptedEvent) == null ? void 0 : T.start) || O, c.resizingEvent.end = ee === !1 ? (c.resizingLastAcceptedEvent || c.resizingOriginalEvent).end : ((g = c.resizingLastAcceptedEvent) == null ? void 0 : g.end) || u, c.resizingEvent._.duration < 1 && c.resizingOriginalEvent && (c.resizingEvent.start = c.resizingOriginalEvent.start, c.resizingEvent.end = c.resizingOriginalEvent.end);
      }
      o.touch.isResizingEvent = !1, o.touch.currentHoveredCell = null;
    }
    document.removeEventListener(t.type === "touchend" ? "touchmove" : "mousemove", y, { passive: !c.fromResizer }), o.touch.isResizingEvent = !1, c.fromResizer = !1, c.resizingEvent = null, c.resizingOriginalEvent = null, c.resizingLastAcceptedEvent = null, c.startX = 0, c.startY = 0, c.moveX = 0, c.moveY = 0, c.startPercentageX = 0, c.startPercentageY = 0, c.movePercentageX = 0, c.movePercentageY = 0, c.documentMouseX = 0, c.documentMouseY = 0, c.cellEl = null, c.resizeStartDate = null, c.resizeBaselineEndMs = null, c.schedule = null, c.resizeAnchorClientX = 0, c.resizeAnchorClientY = 0, c.resizeSlopExceeded = !1;
  };
  return {
    events: d,
    resizeState: c,
    getEvent: f,
    getViewEvents: D,
    getCellOverlappingEvents: r,
    getEventsInRange: j,
    createEvent: F,
    deleteEvent: E,
    isEventInRange: M,
    handleEventResize: (t, V, S) => {
      var T;
      const k = ((T = t.touches) == null ? void 0 : T[0]) || t;
      if (c.fromResizer = !!k.target.closest(".vuecal__event-resizer"), c.fromResizer) {
        o.touch.isResizingEvent = !0;
        const g = S.getBoundingClientRect();
        c.startX = k.clientX - g.left, c.startY = k.clientY - g.top, c.startPercentageX = c.startX * 100 / g.width, c.startPercentageY = c.startY * 100 / g.height, c.cellEl = S.closest(".vuecal__cell"), c.resizeStartDate = new Date(V.start.getTime()), c.resizeBaselineEndMs = V.end.getTime(), c.resizingEvent = V, c.resizeAnchorClientX = k.clientX, c.resizeAnchorClientY = k.clientY, c.resizeSlopExceeded = !1, document.addEventListener(t.type === "touchstart" ? "touchmove" : "mousemove", y, { passive: !c.fromResizer }), document.addEventListener(t.type === "touchstart" ? "touchend" : "mouseup", N, { once: !0 });
      }
    }
  };
}, Nt = ({ config: o, dateUtils: e, emit: i, texts: n, eventsManager: d }, _) => {
  const { availableViews: Y } = o, f = de(o.view && Y[o.view] ? o.view : o.defaultView), D = de(o.selectedDate || null), F = de(/* @__PURE__ */ new Date()), E = de(new Date(o.viewDate || F.value));
  E.value.setHours(0, 0, 0, 0);
  const r = de(new Date(E));
  let j = null;
  const M = C(() => f.value === "month" ? r.value : S.value), c = C(() => f.value === "month" ? new Date(r.value.getFullYear(), r.value.getMonth() + 1, 0, 23, 59, 59, 999) : T.value), h = C(() => f.value === "week" ? e.getPreviousFirstDayOfWeek(S.value, o.startWeekOnSunday) : f.value === "month" ? S.value : M.value), p = C(() => {
    if (f.value === "week") {
      const v = e.addDays(h.value, 7);
      return v.setMilliseconds(-1), v;
    }
    return f.value === "month" ? T.value : c.value;
  }), s = C(() => {
    const v = F.value.getTime();
    if (f.value === "week")
      return h.value.getTime() <= v && v <= p.value.getTime();
    const z = S.value.getTime(), Z = T.value.getTime();
    return z <= v && v <= Z;
  }), J = Te({
    show: C(() => {
      if (["day", "days", "week"].includes(f.value) && !(!s.value || !o.time || o.allDay) && !(o.timeFrom > e.dateToMinutes(F.value)) && !(e.dateToMinutes(F.value) > o.timeTo))
        return !0;
    }),
    nowInMinutes: C(() => e.dateToMinutes(F.value)),
    todaysTimePosition: C(() => Oe(J.nowInMinutes, o)),
    style: C(() => `${o.horizontal ? "left" : "top"}: ${J.todaysTimePosition}%`),
    currentTime: C(() => e.formatTime(F.value, o.twelveHour ? "h:mm {am}" : "HH:mm"))
  });
  function y() {
    F.value = /* @__PURE__ */ new Date(), j = setTimeout(y, 60 * 1e3);
  }
  function N() {
    j = setTimeout(y, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), y();
  }
  const le = C(() => {
    if (!o.availableViews[f.value]) return 1;
    let v = o.availableViews[f.value].cols;
    return o.hasHiddenDays && ["week", "month"].includes(f.value) && (v -= o.hasHiddenDays), v;
  }), t = C(() => {
    var v;
    return ((v = o.availableViews[f.value]) == null ? void 0 : v.rows) || 1;
  }), V = C(() => le.value * t.value), S = C(() => {
    if (f.value === "month") {
      let v = r.value.getDay() || 7;
      return o.startWeekOnSunday && !o.hideWeekdays[7] && (v += 1), o.viewDayOffset && (v -= o.viewDayOffset), e.subtractDays(r.value, v - 1);
    }
    if (f.value === "week") {
      const v = "1234567".split("").filter((Z) => !Object.keys(o.hideWeekdays).includes(Z));
      let z = Math.min(...v);
      return o.startWeekOnSunday && !o.hideWeekdays[7] && (z = 1), o.viewDayOffset && (z += o.viewDayOffset), e.addDays(r.value, z - 1);
    }
    return r.value;
  }), k = C(() => {
    const v = [], z = ["days", "week", "month"].includes(f.value);
    let Z = 0;
    for (let x = 0; x < V.value + Z; x++)
      switch (f.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const me = e.addDays(S.value, x), Ae = me.getDay() || 7;
          if (z && o.hasHiddenDays && o.hideWeekdays[Ae]) {
            Z++;
            continue;
          }
          const Se = new Date(me);
          Se.setHours(23, 59, 59, 999), v.push({ start: me, startFormatted: e.formatDate(me), end: Se });
          break;
        }
        case "year":
          v.push({
            start: new Date(S.value.getFullYear(), x, 1, 0, 0, 0, 0),
            end: new Date(S.value.getFullYear(), x + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          v.push({
            start: new Date(S.value.getFullYear() + x, 0, 1, 0, 0, 0, 0),
            end: new Date(S.value.getFullYear() + x + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return v;
  }), T = C(() => k.value[k.value.length - 1].end), g = de("right"), W = C(() => {
    const v = Object.keys(o.availableViews);
    return v[v.indexOf(f.value) + 1];
  }), a = C(() => {
    const v = Object.keys(o.availableViews);
    return v[v.indexOf(f.value) - 1];
  });
  function w(v, z, Z = !1) {
    if (!z || !z[v]) return v + 1;
    const x = z[v];
    return Z && typeof x == "string" ? x.substring(0, 3) : x;
  }
  function O(v, z, Z) {
    const { monthsArray: x, monthBeforeDay: me, canTruncate: Ae, xs: Se } = Z, Ye = v.getMonth(), ze = v.getFullYear(), Ce = z.getMonth(), Fe = z.getFullYear(), Ie = Ye !== Ce, zt = ze !== Fe, $e = Ae && (Se || Ie), Re = v.getDate(), Xe = z.getDate();
    return zt ? me ? `${w(Ye, x, $e)} ${Re}, ${ze} - ${w(Ce, x, $e)} ${Xe}, ${Fe}` : `${Re} ${w(Ye, x, $e)} ${ze} - ${Xe} ${w(Ce, x, $e)} ${Fe}` : Ie ? me ? `${w(Ye, x, $e)} ${Re} - ${w(Ce, x, $e)} ${Xe}, ${ze}` : `${Re} ${w(Ye, x, $e)} - ${Xe} ${w(Ce, x, $e)} ${ze}` : me ? `${w(Ye, x, $e)} ${Re}-${Xe}, ${ze}` : `${Re}-${Xe} ${w(Ye, x, $e)} ${ze}`;
  }
  const u = C(() => {
    const { dateFormat: v, months: z, monthsGenitive: Z, week: x, truncations: me } = n, Ae = o.locale, Se = me !== !1, Ye = v.indexOf("M") < v.indexOf("D"), ze = Z && Ae === "el" ? Z : z;
    switch (f.value) {
      case "day":
        return e.formatDate(S.value, v);
      case "days":
      case "week": {
        const Ce = {
          monthsArray: ze,
          monthBeforeDay: Ye,
          canTruncate: Se,
          xs: o.xs
        };
        let Fe = O(S.value, T.value, Ce);
        if (f.value === "week") {
          const Ie = e.getWeek(
            S.value,
            o.startWeekOnSunday && !o.hideWeekdays[7]
          );
          Fe += ` <small>${x} ${Ie}</small>`;
        }
        return Fe;
      }
      case "month": {
        const Ce = `${o.xs && Se ? "MMM" : "MMMM"} YYYY`;
        return e.formatDate(M.value, Ce);
      }
      case "year":
        return S.value.getFullYear();
      case "years":
        return `${S.value.getFullYear()} - ${c.value.getFullYear()}`;
    }
  });
  async function q() {
    switch (r.value = new Date(E.value || F.value), r.value.setHours(0, 0, 0, 0), f.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        r.value = e.getPreviousFirstDayOfWeek(r.value, o.startWeekOnSunday && !o.hideWeekdays[7]);
        break;
      case "month":
        r.value = new Date(r.value.getFullYear(), r.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        r.value = new Date(r.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        r.value = new Date(r.value.getFullYear() - r.value.getFullYear() % V.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    F.value = /* @__PURE__ */ new Date(), o.ready && (await qe(), i("view-change", {
      id: f.value,
      title: u.value,
      start: M.value,
      end: c.value,
      extendedStart: h.value,
      extendedEnd: p.value,
      cellDates: k.value,
      containsToday: s.value,
      events: Q.value
    }));
  }
  function ee(v) {
    const z = f.value, Z = o.availableViews[z];
    v[z] && JSON.stringify(v[z]) === JSON.stringify(Z) || q();
  }
  function se(v, z = !0, Z = null) {
    const x = Object.keys(o.availableViews);
    f.value === v && !Z || (x.includes(v) ? (g.value = x.indexOf(v) < x.indexOf(f.value) ? "left" : "right", z && f.value !== v && i("update:view", v), f.value = v, Z ? ae(Z) : q()) : console.warn(`Vue Cal: the \`${v}\` view is not available.`));
  }
  function L() {
    W.value ? se(W.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function re() {
    a.value ? se(a.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function l() {
    b(!1);
  }
  function A() {
    b(!0);
  }
  function b(v = !0) {
    let z = new Date(E.value);
    switch (f.value) {
      case "day":
      case "days":
        v ? z = e.addDays(T.value, 1) : z = e.subtractDays(S.value, V.value);
        break;
      case "week": {
        v ? (z = e.addDays(S.value, 7), z.setHours(0, 0, 0, 0)) : z = e.subtractDays(h.value, V.value);
        break;
      }
      case "month": {
        const Z = v ? 1 : -1;
        z = new Date(z.getFullYear(), z.getMonth() + Z, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const Z = v ? 1 : -1;
        z = new Date(z.getFullYear() + Z, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const Z = v ? V.value : -V.value;
        z = new Date(z.getFullYear() + Z, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    ae(z);
  }
  function K() {
    const v = /* @__PURE__ */ new Date();
    v.setHours(0, 0, 0, 0), ae(v);
  }
  function ae(v, z = !0, Z = !1) {
    if (!e.isValid(v)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [x, me] = [S.value, T.value];
    f.value === "month" && ([x, me] = [M.value, c.value]), v.setHours(0, 0, 0, 0), E.value = v, z && i("update:viewDate", v), (!e.isInRange(v, x, me) || Z) && (g.value = v.getTime() < x.getTime() ? "left" : "right", q());
  }
  function he(v, z = !0) {
    if (!e.isValid(v)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: Z, isSameDate: x } = e;
    (!D.value || !Z(D.value) || !x(v, D.value)) && (v.setHours(0, 0, 0, 0), D.value = v, z && i("update:selectedDate", v));
  }
  function ce(v) {
    !v && !r.value.getDay() ? ae(e.addDays(r.value, 1), !0, !0) : (g.value = "left", q());
  }
  function Ve(v) {
    v && o.startWeekOnSunday && !r.value.getDay() ? ae(e.addDays(r.value, 1), !0, !0) : !v && o.startWeekOnSunday && r.value.getDay() === 1 && ae(e.subtractDays(r.value, 1), !0, !0);
  }
  function m() {
    q();
  }
  function H(v) {
    var me;
    const z = (me = _.value) == null ? void 0 : me.querySelector(".vuecal__scrollable"), Z = v - o.timeFrom, x = Z > 0 ? Z * o.timeCellHeight / o.timeStep : 0;
    z == null || z.scrollTo({ top: x, behavior: "smooth" });
  }
  function P() {
    const v = /* @__PURE__ */ new Date();
    H(v.getHours() * 60 + v.getMinutes());
  }
  function G() {
    H(0);
  }
  const Q = C(() => d.getViewEvents(k.value)), B = d.createEvent, te = d.deleteEvent;
  return pe(() => o.view, (v) => se(v, !1)), pe(() => o.availableViews, ee), pe(() => o.datePicker, () => se("month")), pe(() => o.viewDate, (v) => ae(v, !1)), pe(() => o.selectedDate, (v) => he(v, !1)), pe(() => o.startWeekOnSunday, (v) => ce(v)), pe(() => o.hideWeekends, (v) => Ve(v)), pe(() => o.hideWeekdays, m), pe(() => V.value, () => {
    V.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), pe(() => o.watchRealTime, (v) => {
    v && o.time ? N() : j = clearTimeout(j);
  }), q(), o.time && o.watchRealTime && N(), Ne(() => j = clearTimeout(j)), {
    now: F,
    id: f,
    broaderView: W,
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
    lastCellDate: T,
    containsToday: s,
    nowLine: J,
    selectedDate: D,
    cellDates: k,
    cols: le,
    rows: t,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: Q,
    transitionDirection: g,
    switch: (v, z) => se(v, !0, z),
    broader: L,
    narrower: re,
    previous: l,
    next: A,
    navigate: b,
    goToToday: K,
    updateViewDate: ae,
    updateSelectedDate: he,
    scrollToCurrentTime: P,
    scrollToTime: H,
    scrollTop: G,
    createEvent: B,
    deleteEvent: te,
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
}, Symbol.toStringTag, { value: "Module" })), Be = Te({
  texts: { ...ye.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: vt(ye.texts, st)
  // Some Date utils functions need localized texts.
}), Gt = ({ props: o, emit: e, attrs: i, vuecalEl: n, uid: d }) => {
  const _ = Te({
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
  return _.dateUtils = vt(Object.assign(ye.texts, _.texts), st), _.config = Ft(_, o, i), _.eventsManager = Wt(_), _.view = Nt(_, n), _.dnd = Bt(_), _;
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
  setup(o) {
    const e = Le("vuecal"), { view: i, config: n } = e, d = () => {
      n.clickToNavigate && i.broader();
    }, _ = C(() => n.clickToNavigate ? { click: d } : {});
    return (Y, f) => (R(), I("div", Zt, [
      X(Y.$slots, "header", {
        view: $(i),
        availableViews: $(n).availableViews,
        vuecal: $(e)
      }),
      Y.$slots.header ? ne("", !0) : (R(), I(fe, { key: 0 }, [
        $(n).viewsBar ? (R(), I("div", Ut, [
          (R(!0), I(fe, null, be($(n).availableViews, (D, F) => (R(), I("button", {
            class: De(["vuecal__view-button", { "vuecal__view-button--active": $(i).id === F }]),
            onClick: (E) => $(i).switch(F),
            innerHTML: $(e).texts[F],
            type: "button"
          }, null, 10, Kt))), 256))
        ])) : ne("", !0),
        $(n).titleBar ? (R(), I("nav", Qt, [
          ge("button", {
            class: De(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !Y.$slots["previous-button"] }]),
            onClick: f[0] || (f[0] = (...D) => $(i).previous && $(i).previous(...D)),
            type: "button"
          }, [
            X(Y.$slots, "previous-button")
          ], 2),
          ge("div", xt, [
            Pe(Ue, {
              name: `vuecal-slide-fade--${$(i).transitionDirection}`
            }, {
              default: U(() => [
                (R(), I("div", {
                  key: $(i).id + $(i).start.getTime()
                }, [
                  Y.$slots.title || Y.$slots[`title.${$(i).id}`] ? (R(), He(at($(n).clickToNavigate && $(i).broaderView ? "button" : "div"), ue({
                    key: 0,
                    class: "vuecal__title"
                  }, Je(_.value)), {
                    default: U(() => [
                      Y.$slots[`title.${$(i).id}`] ? X(Y.$slots, `title.${$(i).id}`, oe(ue({ key: 0 }, $(i)))) : X(Y.$slots, "title", oe(ue({ key: 1 }, $(i))))
                    ]),
                    _: 3
                  }, 16)) : (R(), He(at($(n).clickToNavigate && $(i).broaderView ? "button" : "div"), ue({
                    key: 1,
                    class: "vuecal__title"
                  }, Je(_.value), {
                    innerHTML: $(i).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          $(n).todayButton ? (R(), I(fe, { key: 0 }, [
            Y.$slots["today-button"] ? X(Y.$slots, "today-button", {
              key: 0,
              navigate: () => !$(i).containsToday && $(i).goToToday(),
              active: $(i).containsToday
            }) : (R(), I("button", {
              key: 1,
              class: De(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": $(i).containsToday }]),
              onClick: f[1] || (f[1] = (D) => !$(i).containsToday && $(i).goToToday()),
              disabled: !!$(i).containsToday,
              type: "button",
              innerHTML: $(e).texts.today
            }, null, 10, en))
          ], 64)) : ne("", !0),
          ge("button", {
            class: De(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !Y.$slots["next-button"] }]),
            onClick: f[2] || (f[2] = (...D) => $(i).next && $(i).next(...D)),
            type: "button"
          }, [
            X(Y.$slots, "next-button")
          ], 2)
        ])) : ne("", !0)
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
  setup(o, { emit: e }) {
    const i = o, { config: n, view: d, dnd: _, touch: Y, dateUtils: f, eventsManager: D } = Le("vuecal"), { handleEventResize: F } = D, E = de(null), r = Te(i.event);
    let j = null;
    const M = Te({
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
    }), c = C(() => n.editableEvents.drag && r.draggable !== !1 && !r.background && M.canTouchAndDrag !== !1), h = C(() => d.isMonth || d.isYear || d.isYears || i.inAllDayBar || r._.multiday && !J.value ? !1 : n.time && n.editableEvents.resize && r.resizable !== !1 && !r.background);
    C(() => n.editableEvents.delete && r.deletable !== !1 && !r.background);
    const p = C(() => {
      var a, w, O, u, q;
      const k = !!((a = r._) != null && a.multiday), T = n.horizontal, g = !i.inAllDayBar && (((w = r._) == null ? void 0 : w.startMinutes) < n.timeFrom || k && !s.value), W = !i.inAllDayBar && (((O = r._) == null ? void 0 : O.endMinutes) > n.timeTo || k && !J.value);
      return {
        [`vuecal__event--${r._.id}`]: !0,
        [r.class]: !!r.class,
        "vuecal__event--recurring": !!r.recurring,
        "vuecal__event--background": !!r.background,
        "vuecal__event--all-day": r.allDay || ((u = r._) == null ? void 0 : u.startMinutes) === 0 && ((q = r._) == null ? void 0 : q.duration) === 1440,
        "vuecal__event--multiday": k,
        // In horizontal mode, cut-top becomes cut-left and cut-bottom becomes cut-right.
        "vuecal__event--cut-top": !T && g,
        "vuecal__event--cut-bottom": !T && W,
        "vuecal__event--cut-left": T && g,
        "vuecal__event--cut-right": T && W,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !r._.draggingGhost && r._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": r._.draggingGhost,
        "vuecal__event--resizing": Y.isResizingEvent
      };
    }), s = C(() => r._.multiday ? new Date(r.start).setHours(0, 0, 0, 0) === i.cellStart.getTime() : !0), J = C(() => r._.multiday ? f.isSameDate(new Date(new Date(r.end).setMilliseconds(-1)), i.cellEnd) : !0), y = C(() => {
      const k = new Date(r.start).setHours(0, 0, 0, 0), T = new Date(r.end).setHours(0, 0, 0, 0);
      return Math.ceil((T - k) / (1e3 * 60 * 60 * 24));
    }), N = C(() => {
      const k = (d.isDay || d.isDays || d.isWeek) && n.time && !i.inAllDayBar, T = n.horizontal;
      if (!k && !r.backgroundColor && !r.color) return !1;
      const g = {
        backgroundColor: r.backgroundColor || null,
        color: r.color || null
      };
      if (k) {
        let W = r._.startMinutes, a = r._.endMinutes;
        r._.multiday && (s.value || (W = 0), J.value || (a = 1440));
        const w = Math.max(n.timeFrom, W), O = Math.min(n.timeTo, a) + (r._.duration && !a ? 1440 : 0), u = Oe(w, n), q = Oe(O, n) - u;
        g[T ? "left" : "top"] = `${u}%`, g[T ? "width" : "height"] = `${q}%`;
      }
      return g;
    }), le = C(() => {
      const k = { ...n.eventListeners.event };
      for (const [g, W] of Object.entries(k))
        ["resize-end"].includes(g) || (k[g] = (a) => {
          a.type !== "drop" && W(a.type ? { e: a, event: r } : a);
        });
      const T = { ...k };
      return k.touchstart = (g) => {
        var W;
        g.stopPropagation(), M.touchAndDragTimer = setTimeout(() => {
          M.canTouchAndDrag = !0;
        }, 500), S(g), (W = T.touchstart) == null || W.call(T, { e: g, event: r });
      }, k.mousedown = (g) => {
        var W;
        g.stopPropagation(), S(g), (W = T.mousedown) == null || W.call(T, { e: g, event: r });
      }, k.click = (g) => {
        var W;
        (W = T.click) == null || W.call(T, { e: g, event: r }), j ? j = clearTimeout(j) : j = setTimeout(() => {
          var a;
          j = null, (a = T["delayed-click"]) == null || a.call(T, { e: g, event: r });
        }, 400);
      }, k.dblclick = (g) => {
        T.dblclick ? T.dblclick({ e: g, event: r }) : r.delete(1);
      }, k;
    });
    let t = null, V = 0;
    const S = (k) => {
      var a, w, O, u;
      const T = ((a = k.touches) == null ? void 0 : a[0]) || k;
      M.fromResizer = (w = T.target) == null ? void 0 : w.closest(".vuecal__event-resizer");
      const g = Date.now();
      (!t || g - V > vn) && (t = E.value.getBoundingClientRect(), V = g);
      const W = t;
      M.startX = (((O = k.touches) == null ? void 0 : O[0]) || k).clientX - W.left, M.startY = (((u = k.touches) == null ? void 0 : u[0]) || k).clientY - W.top, M.startPercentageX = M.startX * 100 / W.width, M.startPercentageY = M.startY * 100 / W.height, M.cellEl = E.value.closest(".vuecal__cell"), M.resizeStartDate = r.start, M.fromResizer && F(k, r, E.value), M.holdTimer = setTimeout(() => {
        var q, ee;
        M.holding = !0, (ee = (q = le.value).hold) == null || ee.call(q, { e: k, event: r });
      }, 1e3);
    };
    return tt(() => r._.register(E.value)), Ne(() => {
      M.holdTimer && (M.holdTimer = clearTimeout(M.holdTimer)), M.touchAndDragTimer && (M.touchAndDragTimer = clearTimeout(M.touchAndDragTimer)), j && (j = clearTimeout(j)), r._.unregister();
    }), (k, T) => (R(), I("div", ue({ class: "vuecal__event" }, Je(le.value, !0), {
      ref_key: "eventEl",
      ref: E,
      class: p.value,
      style: N.value,
      draggable: c.value ? "true" : void 0,
      onDragstart: T[2] || (T[2] = (g) => c.value && $(_).eventDragStart(g, r)),
      onDragend: T[3] || (T[3] = (g) => c.value && $(_).eventDragEnd(g, r))
    }), [
      ge("div", sn, [
        k.$slots["event.all-day"] ? X(k.$slots, "event.all-day", {
          key: 0,
          event: r
        }) : k.$slots[`event.${$(d).id}`] ? X(k.$slots, `event.${$(d).id}`, {
          key: 1,
          event: r
        }) : X(k.$slots, "event", {
          key: 2,
          event: r
        }, () => [
          ge("div", an, ve(r.title), 1),
          $(n).time && !o.inAllDayBar && !(r._.multiday && !s.value) ? (R(), I("div", ln, [
            $(d).isMonth ? (R(), I("span", rn, ",")) : ne("", !0),
            ge("span", on, ve(r._[`startTimeFormatted${$(n).twelveHour ? 12 : 24}`]), 1),
            $(d).isMonth ? ne("", !0) : (R(), I("span", un, [
              Ze(" - " + ve(r._[`endTimeFormatted${$(n).twelveHour ? 12 : 24}`]), 1),
              r._.multiday && s.value ? (R(), I("span", cn, "+" + ve(y.value) + "d", 1)) : ne("", !0)
            ]))
          ])) : ne("", !0),
          o.inAllDayBar ? ne("", !0) : (R(), I("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: r.content
          }, null, 8, dn))
        ])
      ]),
      h.value ? (R(), I("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: T[0] || (T[0] = lt(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : ne("", !0),
      Pe(Ue, { name: "vuecal-delete-btn" }, {
        default: U(() => [
          r._.deleting ? (R(), I("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: T[1] || (T[1] = lt((g) => r.delete(3), ["stop"]))
          }, "Delete")) : ne("", !0)
        ]),
        _: 1
      })
    ], 16, nn));
  }
}, fn = ["data-start"], mn = ["innerHTML"], hn = ["data-schedule"], gn = ["innerHTML"], yn = {
  key: 2,
  class: "vuecal__cell-date"
}, Dn = {
  key: 3,
  class: "vuecal__cell-content"
}, pn = {
  key: 4,
  class: "vuecal__cell-events"
}, wn = {
  key: 1,
  class: "vuecal__cell-date"
}, bn = {
  key: 2,
  class: "vuecal__cell-content"
}, _n = {
  key: 3,
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
  setup(o) {
    const e = o, i = Le("vuecal"), { view: n, config: d, dateUtils: _, eventsManager: Y, dnd: f, touch: D } = i, F = C(() => _.isToday(e.start)), E = de(null), r = de([]), j = de(!1), M = (m) => {
      r.value.push(m.detail), j.value = !0;
    }, c = () => setTimeout(() => j.value = !1, 300), h = Te({
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
    const J = de({ cellOverlaps: {}, longestStreak: 0 }), y = C(() => {
      var Z;
      const m = d.horizontal, H = m ? h.startPercentageX : h.startPercentageY, P = m ? h.movePercentageX : h.movePercentageY, G = Me(H, d), Q = Me(P, d);
      let B = Math.min(H, P), te = Math.max(H, P), v = Me(B, d), z = Me(te, d);
      if (d.snapToInterval && (v = _.snapToInterval(v, d.snapToInterval), z = _.snapToInterval(z, d.snapToInterval), B = Oe(v, d), te = Oe(z, d)), d.time && ((Z = d.specialHoursDisallowed) != null && Z.hasAny) && !e.allDay) {
        const x = Rt({
          anchorDayMinutes: G,
          cursorDayMinutes: Q,
          snappedLow: v,
          snappedHigh: z,
          cellDate: e.start,
          schedule: h.schedule,
          disallowed: d.specialHoursDisallowed,
          hasSchedules: !!(d.schedules && d.schedules.length)
        });
        v = x.low, z = x.high, B = Oe(v, d), te = Oe(z, d);
      }
      return {
        style: {
          [m ? "left" : "top"]: `${B}%`,
          [m ? "width" : "height"]: `${Math.abs(te - B)}%`
        },
        startMinutes: v,
        endMinutes: z,
        start: _.formatMinutes(v),
        end: _.formatMinutes(z),
        ...h.schedule != null ? { schedule: h.schedule } : {}
      };
    }), N = C(() => {
      const m = d.editableEvents.create && (h.dragging || p.value), H = d.eventCreateMinDrag && h.thresholdPassed || !d.eventCreateMinDrag, P = h.canTouchAndDrag !== !1;
      return m && H && P;
    }), le = C(() => {
      var te;
      const m = /* @__PURE__ */ new Date(), H = n.start.getFullYear(), P = n.start.getMonth(), G = e.start.getFullYear(), Q = e.start.getMonth();
      return {
        [`vuecal__cell--${We[e.start.getDay()]}`]: n.isDay || n.isDays || n.isWeek || n.isMonth,
        [`vuecal__cell--${At[Q]}`]: n.isYear,
        [`vuecal__cell--${G}`]: n.isYears,
        "vuecal__cell--today": F.value,
        "vuecal__cell--current-month": n.isYear && G === m.getFullYear() && Q === m.getMonth(),
        "vuecal__cell--current-year": n.isYears && G === m.getFullYear(),
        "vuecal__cell--out-of-range": n.isMonth && (G !== H || Q !== P),
        "vuecal__cell--before-min": ee.value && u.value,
        "vuecal__cell--after-max": ee.value && q.value,
        "vuecal__cell--disabled": ee.value,
        "vuecal__cell--selected": n.selectedDate && n.selectedDate.getTime() >= e.start.getTime() && n.selectedDate.getTime() <= e.end.getTime(),
        "vuecal__cell--has-schedules": (te = d.schedules) == null ? void 0 : te.length,
        "vuecal__cell--dragging": h.dragging,
        "vuecal__cell--has-events": V.value.length
      };
    });
    C(() => _.formatDate(e.start));
    const t = C(() => {
      switch (n.id) {
        case "day":
          return "";
        case "days":
          return d.availableViews.days.rows > 1 && _.formatDate(e.start, "D"), "";
        case "week":
          return "";
        case "month":
          return _.formatDate(e.start, "D");
        case "year":
          return _.formatDate(e.start, d.xs ? "MMM" : "MMMM");
        case "years":
          return _.formatDate(e.start, "YYYY");
      }
    }), V = C(() => d.datePicker ? [] : Y.getEventsInRange(
      e.start,
      e.end,
      { excludeIds: r.value, ...d.allDayEvents ? { allDay: e.allDay } : {} }
    )), S = C(() => V.value.filter((m) => !m.background)), k = C(() => {
      var m;
      return (m = d.schedules) == null ? void 0 : m.reduce((H, P) => (H[P.id] = V.value.filter((G) => G.schedule === P.id), H), {});
    }), T = C(() => {
      if (n.isMonth || n.isYear || n.isYears || e.allDay || !d.time) return {};
      const m = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", H = d.horizontal, P = {};
      for (const G of V.value) {
        const Q = G._.id, { maxConcurrent: B = 1, position: te = 0 } = J.value.cellOverlaps[Q] || {}, v = m ? "right" : "left", z = H ? "height" : "width";
        P[Q] = { [H ? "top" : v]: `${100 / B * te}%` }, d.stackEvents ? P[Q][z] = `${100 / B + (te === B - 1 ? 0 : 15)}%` : P[Q][z] = `${100 / B}%`;
      }
      return P;
    }), g = C(() => {
      const m = {};
      for (const H of V.value) {
        const P = H._.id, { maxConcurrent: G = 1, position: Q = 0 } = J.value.cellOverlaps[P] || {};
        m[P] = `vuecal__event--stack-${Q + 1}-${G}`;
      }
      return m;
    }), W = C(() => d.showCellEventCount && S.value.length), a = (m) => {
      const H = m || [], P = d.horizontal, { timeFrom: G, timeTo: Q } = d, B = [];
      for (let te = 0; te < H.length; te++) {
        const v = H[te];
        let { from: z, to: Z, class: x, label: me } = v;
        if (isNaN(z) || isNaN(Z) || G >= Z || Q <= z) continue;
        z = Math.max(G, z), Z = Math.min(Q, Z);
        const Ae = Oe(z, d), Se = Oe(Z, d) - Ae;
        B.push({
          style: {
            [P ? "left" : "top"]: `${Ae}%`,
            [P ? "width" : "height"]: `${Se}%`
          },
          label: me,
          class: x
        });
      }
      return B;
    }, w = C(() => {
      var P;
      if (!d.specialHours || n.isMonth || n.isYear || n.isYears || e.allDay) return;
      const m = We[e.start.getDay()];
      let H = (P = d.specialHours) == null ? void 0 : P[m];
      if (H)
        return {
          default: a(H.default),
          schedules: Object.entries(H.schedules || {}).reduce((G, [Q, B]) => (G[Q] = a(B), G), {})
        };
    }), O = C(() => {
      const m = d.schedules;
      if (!(m != null && m.length)) return [];
      const H = w.value;
      if (!H) return m.map((Q) => ({ schedule: Q, ranges: [] }));
      const { default: P, schedules: G } = H;
      return m.map((Q) => {
        const B = String(Q.id), te = Object.prototype.hasOwnProperty.call(G, B) ? G[B] : P;
        return { schedule: Q, ranges: te };
      });
    }), u = C(() => d.minTimestamp !== null && d.minTimestamp > e.end.getTime()), q = C(() => d.maxTimestamp && d.maxTimestamp < e.start.getTime()), ee = C(() => {
      const { disableDays: m } = d, H = n.isYear || n.isYears;
      return m.length && m.includes(_.formatDate(e.start)) && !H ? !0 : u.value || q.value;
    }), se = C(() => {
      if (ee.value) return {};
      const m = { ...d.eventListeners.cell };
      for (const [P, G] of Object.entries(m))
        m[P] = (Q) => {
          var B, te, v;
          (v = (te = Q.target || ((B = Q.e) == null ? void 0 : B.target)).closest) != null && v.call(te, ".vuecal__event") || G(Q.type ? { e: Q, cell: L.value, cursor: l.value, view: n } : Q);
        };
      const H = { ...m };
      return m.click = (P) => {
        var Q;
        A();
        const G = re(P);
        (Q = H.click) == null || Q.call(H, { e: P, cell: L.value, cursor: G, view: n }), s ? s = clearTimeout(s) : s = setTimeout(() => {
          var B;
          s = null, (B = H["delayed-click"]) == null || B.call(H, { e: P, cell: L.value, cursor: G, view: n });
        }, 400);
      }, (d.time && n.isDay || n.isDays || n.isWeek) && (m.touchstart = (P) => {
        var G;
        b(P.e || P), (G = H.touchstart) == null || G.call(H, { e: P, cell: L.value, cursor: l.value, view: n });
      }, m.mousedown = (P) => {
        var G;
        b(P.e || P), (G = H.mousedown) == null || G.call(H, { e: P, cell: L.value, cursor: l.value, view: n });
      }), H.dblclick && (m.dblclick = (P) => {
        var G;
        (G = H.dblclick) == null || G.call(H, { e: P, cell: L.value, cursor: re(P), view: n });
      }), d.editableEvents.drag && (m.dragenter = (P) => f.cellDragEnter(P, L.value), m.dragover = (P) => {
        P.preventDefault(), f.cellDragOver(P, L.value);
      }, m.dragleave = (P) => f.cellDragLeave(P, L.value), m.drop = (P) => f.cellDragDrop(P, L.value, e.allDay)), m;
    }), L = C(() => ({
      start: e.start,
      end: e.end,
      events: V,
      ...h.schedule !== null ? { schedule: h.schedule } : {},
      goNarrower: () => n.narrower(),
      goBroader: () => n.broader(),
      broader: n.broaderView,
      narrower: n.narrowerView
    })), re = (m) => {
      var z;
      const H = d.horizontal, { clientX: P, clientY: G } = ((z = m.touches) == null ? void 0 : z[0]) || m, { top: Q, left: B } = E.value.getBoundingClientRect(), te = H ? (P - B) * 100 / E.value.clientWidth : nt(G - Q, E.value), v = new Date(e.start);
      return v.setMinutes(Me(te, d)), { [H ? "x" : "y"]: te, date: v };
    }, l = C(() => {
      const H = d.horizontal ? h.movePercentageX || h.startPercentageX : h.movePercentageY || h.startPercentageY, P = Me(H, d), G = new Date(e.start);
      return G.setMinutes(P), {
        x: h.movePercentageX || h.startPercentageX,
        y: h.movePercentageY || h.startPercentageY,
        date: G
      };
    }), A = () => {
      n.updateSelectedDate(e.start), d.clickToNavigate && ((n.isMonth || n.isDays || n.isWeek) && d.availableViews.day ? n.switch("day") : n.isYear && d.availableViews.month ? n.switch("month") : n.isYears && d.availableViews.year && n.switch("year")), n.updateViewDate(e.start);
    }, b = (m) => {
      var Q, B, te, v, z;
      const H = m.type === "touchstart";
      H ? (h.canTouchAndDrag = !1, h.touchAndDragTimer = setTimeout(() => {
        h.canTouchAndDrag = !0, (h.holding || h.dragging) && m.preventDefault();
      }, 500)) : h.canTouchAndDrag = !0;
      const P = (B = (Q = m.target.closest("[data-schedule]")) == null ? void 0 : Q.dataset) == null ? void 0 : B.schedule;
      if (P !== void 0 && ((te = d.schedules) != null && te.length)) {
        const Z = d.schedules.find((x) => String(x.id) === String(P));
        h.schedule = Z ? Z.id : P;
      } else h.schedule = null;
      const G = E.value.getBoundingClientRect();
      h.startX = (((v = m.touches) == null ? void 0 : v[0]) || m).clientX - G.left, h.startY = (((z = m.touches) == null ? void 0 : z[0]) || m).clientY - G.top, h.startPercentageX = h.startX * 100 / G.width, h.startPercentageY = h.startY * 100 / G.height, h.thresholdPassed = !1, document.addEventListener(H ? "touchmove" : "mousemove", K, { passive: !H }), document.addEventListener(H ? "touchend" : "mouseup", ae, { once: !0 }), h.holdTimer = setTimeout(() => {
        var Z, x;
        h.holding = !0, (x = (Z = se.value).hold) == null || x.call(Z, { e: m, cell: L.value, cursor: l.value, view: n });
      }, 1e3);
    }, K = (m) => {
      var B, te, v, z, Z, x;
      const H = m.type === "touchmove", P = d.horizontal;
      if (H && !h.canTouchAndDrag) {
        h.touchAndDragTimer && (clearTimeout(h.touchAndDragTimer), h.touchAndDragTimer = null), ae(m);
        return;
      }
      H && m.preventDefault(), h.dragging || (D.isDraggingCell = !0, (te = (B = se.value)["drag-start"]) == null || te.call(B, { e: m, cell: L.value, cursor: l.value, view: n })), h.dragging = !0, h.holdTimer = clearTimeout(h.holdTimer), h.holding = !1;
      const G = E.value.getBoundingClientRect();
      h.moveX = (((v = m.touches) == null ? void 0 : v[0]) || m).clientX - G.left, h.moveY = (((z = m.touches) == null ? void 0 : z[0]) || m).clientY - G.top, h.movePercentageX = h.moveX * 100 / G.width, h.movePercentageY = h.moveY * 100 / G.height;
      const Q = Math.abs(P ? h.startX - h.moveX : h.startY - h.moveY);
      d.eventCreateMinDrag && Q > d.eventCreateMinDrag && (h.thresholdPassed = !0), (x = (Z = se.value).drag) == null || x.call(Z, { e: m, cell: L.value, cursor: l.value, view: n });
    }, ae = async (m) => {
      var P, G;
      const H = m.type === "touchend";
      document.removeEventListener(H ? "touchmove" : "mousemove", K, { passive: !1 }), h.touchAndDragTimer && (clearTimeout(h.touchAndDragTimer), h.touchAndDragTimer = null), h.dragging && ((G = (P = se.value)["drag-end"]) == null || G.call(P, { e: m, cell: L.value, cursor: l.value, view: n }), D.isDraggingCell = !1, d.editableEvents.create && h.canTouchAndDrag && (p.value = !0, await he(m), p.value = !1)), h.holdTimer = clearTimeout(h.holdTimer), h.holding = !1, h.dragging = !1, h.startX = 0, h.startY = 0, h.moveX = 0, h.moveY = 0, h.startPercentageX = 0, h.startPercentageY = 0, h.movePercentageX = 0, h.movePercentageY = 0, h.thresholdPassed = !1, h.schedule = null, h.canTouchAndDrag = null;
    }, he = async (m) => {
      var v;
      if (!N.value) return;
      let { start: H, end: P, startMinutes: G, endMinutes: Q } = y.value;
      H = new Date(e.start), H.setMinutes(G), P = new Date(e.start), P.setMinutes(Q);
      let B = { ...y.value, start: H, end: P };
      const { create: te } = d.eventListeners.event;
      if (typeof te == "function") {
        const z = B;
        B = await new Promise((Z) => te({ e: m, event: B, cell: L.value, resolve: Z, cursor: l.value, view: n })), B && typeof B == "object" && n.createEvent(B), B && typeof B == "boolean" && n.createEvent(z);
      } else n.createEvent(B);
      (v = navigator.vibrate) == null || v.call(navigator, 200);
    }, ce = () => {
      var m;
      for (const H of Object.keys(se.value))
        (m = E.value) == null || m.removeEventListener(H, se.value[H]);
    }, Ve = () => {
      J.value = Y.getCellOverlappingEvents(e.start, e.end, e.allDay);
    };
    return pe(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !n.isYears && !n.isYear && S.value.map((m) => `${m._.id}${m.start.getTime()}${m.end.getTime()}`).join(),
      async () => {
        await qe(), Ve();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Ne(async () => {
      for (const m of r.value) Y.deleteEvent(m, 3);
      ce(), s && (s = clearTimeout(s)), await qe();
    }), (m, H) => {
      var P, G, Q;
      return R(), I("div", ue({
        class: "vuecal__cell",
        ref_key: "cellEl",
        ref: E
      }, Je(se.value, !0), {
        "data-start": e.start.getTime(),
        class: le.value
      }), [
        m.$slots.cell ? X(m.$slots, "cell", {
          key: 0,
          cell: L.value
        }) : ne("", !0),
        (G = (P = w.value) == null ? void 0 : P.default) != null && G.length && !((Q = $(d).schedules) != null && Q.length) ? (R(!0), I(fe, { key: 1 }, be(w.value.default, (B, te) => (R(), I("div", {
          class: De(["vuecal__special-hours", B.class]),
          style: we(B.style),
          innerHTML: B.label || ""
        }, null, 14, mn))), 256)) : ne("", !0),
        !m.$slots.cell && $(d).schedules ? (R(!0), I(fe, { key: 2 }, be(O.value, ({ schedule: B, ranges: te }) => (R(), I("div", {
          class: De(["vuecal__schedule vuecal__schedule--cell", B.class]),
          key: B.id,
          style: we(B.style || null),
          "data-schedule": B.id
        }, [
          te.length ? (R(!0), I(fe, { key: 0 }, be(te, (v, z) => (R(), I("div", {
            class: De(["vuecal__special-hours", v.class]),
            key: `${B.id}-${z}`,
            style: we(v.style),
            innerHTML: v.label || ""
          }, null, 14, gn))), 128)) : ne("", !0),
          m.$slots["cell-events"] ? X(m.$slots, "cell-events", {
            key: 1,
            cell: L.value
          }) : ne("", !0),
          t.value || m.$slots["cell-date"] ? (R(), I("div", yn, [
            X(m.$slots, "cell-date", { cell: L.value }, () => [
              Ze(ve(t.value), 1)
            ])
          ])) : ne("", !0),
          m.$slots["cell-content"] ? (R(), I("div", Dn, [
            X(m.$slots, "cell-content", { cell: L.value })
          ])) : ne("", !0),
          m.$slots["cell-events"] && V.value.length ? (R(), I("div", pn, [
            X(m.$slots, "cell-events", { cell: L.value })
          ])) : V.value.length || j.value ? (R(), He(rt, {
            key: 5,
            class: "vuecal__cell-events",
            name: "vuecal-event-delete",
            onBeforeLeave: H[0] || (H[0] = (v) => j.value = !0),
            onAfterLeave: c,
            tag: "div"
          }, {
            default: U(() => [
              (R(!0), I(fe, null, be(k.value[B.id], (v) => (R(), He(ut, {
                key: v._.id,
                event: v,
                onEventDeleted: M,
                "in-all-day-bar": e.allDay,
                "cell-start": e.start,
                "cell-end": e.end,
                style: we(T.value[v._.id])
              }, je({ _: 2 }, [
                m.$slots["event.all-day"] && e.allDay ? {
                  name: "event.all-day",
                  fn: U((z) => [
                    X(m.$slots, "event.all-day", ue({ ref_for: !0 }, z))
                  ]),
                  key: "0"
                } : void 0,
                m.$slots[`event.${$(n).id}`] ? {
                  name: `event.${$(n).id}`,
                  fn: U((z) => [
                    X(m.$slots, `event.${$(n).id}`, ue({ ref_for: !0 }, z))
                  ]),
                  key: "1"
                } : void 0,
                m.$slots.event ? {
                  name: "event",
                  fn: U((z) => [
                    X(m.$slots, "event", ue({ ref_for: !0 }, z))
                  ]),
                  key: "2"
                } : void 0
              ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "style"]))), 128))
            ]),
            _: 2
          }, 1024)) : ne("", !0),
          N.value && h.schedule === B.id && !e.allDay ? (R(), I("div", {
            key: 6,
            class: "vuecal__event-placeholder",
            style: we(y.value.style)
          }, ve(y.value.start) + " - " + ve(y.value.end), 5)) : ne("", !0)
        ], 14, hn))), 128)) : ne("", !0),
        !m.$slots.cell && !$(d).schedules ? (R(), I(fe, { key: 3 }, [
          m.$slots["cell-events"] ? X(m.$slots, "cell-events", {
            key: 0,
            cell: L.value
          }) : ne("", !0),
          t.value || m.$slots["cell-date"] ? (R(), I("div", wn, [
            X(m.$slots, "cell-date", { cell: L.value }, () => [
              Ze(ve(t.value), 1)
            ])
          ])) : ne("", !0),
          m.$slots["cell-content"] ? (R(), I("div", bn, [
            X(m.$slots, "cell-content", { cell: L.value })
          ])) : ne("", !0),
          m.$slots["cell-events"] && V.value.length ? (R(), I("div", _n, [
            X(m.$slots, "cell-events", { cell: L.value })
          ])) : !($(n).isMonth && !$(d).eventsOnMonthView) && !$(n).isYear && !$(n).isYears && (V.value.length || j.value) ? (R(), He(rt, {
            key: 4,
            class: "vuecal__cell-events",
            name: "vuecal-event-delete",
            onBeforeLeave: H[1] || (H[1] = (B) => j.value = !0),
            onAfterLeave: c,
            tag: "div"
          }, {
            default: U(() => [
              (R(!0), I(fe, null, be(V.value, (B) => (R(), He(ut, {
                key: B._.id,
                event: B,
                onEventDeleted: M,
                "in-all-day-bar": e.allDay,
                "cell-start": e.start,
                "cell-end": e.end,
                class: De(g.value[B._.id]),
                style: we(T.value[B._.id])
              }, je({ _: 2 }, [
                m.$slots["event.all-day"] && e.allDay ? {
                  name: "event.all-day",
                  fn: U((te) => [
                    X(m.$slots, "event.all-day", ue({ ref_for: !0 }, te))
                  ]),
                  key: "0"
                } : void 0,
                m.$slots[`event.${$(n).id}`] ? {
                  name: `event.${$(n).id}`,
                  fn: U((te) => [
                    X(m.$slots, `event.${$(n).id}`, ue({ ref_for: !0 }, te))
                  ]),
                  key: "1"
                } : void 0,
                m.$slots.event ? {
                  name: "event",
                  fn: U((te) => [
                    X(m.$slots, "event", ue({ ref_for: !0 }, te))
                  ]),
                  key: "2"
                } : void 0
              ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "class", "style"]))), 128))
            ]),
            _: 3
          })) : ne("", !0),
          N.value ? (R(), I("div", {
            key: 5,
            class: "vuecal__event-placeholder",
            style: we(y.value.style)
          }, ve(y.value.start) + " - " + ve(y.value.end), 5)) : ne("", !0)
        ], 64)) : ne("", !0),
        m.$slots["event-count"] ? X(m.$slots, "event-count", {
          key: 4,
          events: S.value
        }) : W.value ? (R(), I("div", kn, ve(S.value.length), 1)) : ne("", !0),
        $(n).nowLine.show && F.value && !o.allDay ? (R(), I("div", {
          key: 6,
          class: "vuecal__now-line",
          style: we($(n).nowLine.style),
          title: $(n).nowLine.currentTime
        }, [
          X(m.$slots, "now-line", {
            now: $(n).now,
            timeFormatted: $(n).nowLine.currentTime
          }, () => [
            ge("span", null, ve($(n).nowLine.currentTime), 1)
          ])
        ], 12, Tn)) : ne("", !0)
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
  setup(o) {
    const e = Le("vuecal"), i = Le("$vuecalEl"), { view: n, config: d, dateUtils: _ } = e, Y = C(() => d.xs ? "day-xs" : d.sm || n.isDays || n.isMonth ? "day-sm" : "day"), f = C(() => (n.isDay || n.isDays || n.isWeek || n.isMonth) && !(n.isDay && !d.schedules && !d.allDayEvents)), D = C(() => n.cellDates.slice(0, d.horizontal ? n.rows : n.cols).map(({ start: r }) => ({
      id: We[r.getDay()],
      date: r,
      dateNumber: r.getDate(),
      day: _.formatDate(r, "dddd"),
      "day-sm": _.formatDate(r, "ddd"),
      "day-xs": _.formatDate(r, "dd"),
      isToday: _.isToday(r)
    }))), F = {
      click: (r) => {
        (n.isDays || n.isWeek) && n.updateSelectedDate(r);
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
      startResize(r, j) {
        this.isResizing.value = !0;
        const M = d.horizontal;
        this[M ? "startX" : "startY"].value = M ? r : j;
        const c = getComputedStyle(i.value).getPropertyValue("--vuecal-all-day-bar-size"), h = document.createElement("div");
        h.style.position = "absolute", h.style.visibility = "hidden", h.style[M ? "width" : "height"] = c, document.body.appendChild(h);
        const p = h[M ? "offsetWidth" : "offsetHeight"];
        h.remove(), p > 0 && (this[M ? "initialWidth" : "initialHeight"].value = p), document.addEventListener("mousemove", E.handleMouseMove), document.addEventListener("mouseup", E.cleanup), document.addEventListener("touchmove", E.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", E.cleanup);
      },
      // Update height/width based on mouse/touch movement.
      updateSize(r, j) {
        var p;
        if (!this.isResizing.value) return;
        const M = d.horizontal, c = M ? r - this.startX.value : j - this.startY.value, h = Math.max(20, this[M ? "initialWidth" : "initialHeight"].value + c);
        (p = i.value) == null || p.style.setProperty("--vuecal-all-day-bar-size", `${h}px`);
      },
      // Mouse event handlers.
      handleMouseDown(r) {
        this.startResize(r.clientX, r.clientY);
      },
      handleMouseMove(r) {
        E.updateSize(r.clientX, r.clientY);
      },
      // Touch event handlers.
      handleTouchStart(r) {
        var j;
        (j = r.touches) != null && j[0] && this.startResize(r.touches[0].clientX, r.touches[0].clientY);
      },
      handleTouchMove(r) {
        var j;
        (j = r.touches) != null && j[0] && (E.updateSize(r.touches[0].clientX, r.touches[0].clientY), r.preventDefault());
      }
    };
    return Ne(() => {
      E.cleanup();
    }), (r, j) => f.value ? (R(), I("div", $n, [
      $(n).isDay ? ne("", !0) : (R(), I("div", Mn, [
        (R(!0), I(fe, null, be(D.value, (M, c) => (R(), I("div", {
          class: De(["vuecal__weekday", { "vuecal__weekday--today": M.isToday }]),
          key: c,
          onClick: (h) => F.click(M.date)
        }, [
          X(r.$slots, "weekday-heading", {
            label: M[Y.value],
            id: M.id,
            date: M.date
          }, () => [
            ge("span", Sn, ve(M[Y.value]), 1),
            $(n).isMonth ? ne("", !0) : (R(), I("strong", Yn, ve(M.dateNumber), 1))
          ])
        ], 10, En))), 128))
      ])),
      $(d).schedules ? (R(), I("div", zn, [
        (R(!0), I(fe, null, be(D.value, (M, c) => (R(), I(fe, { key: c }, [
          (R(!0), I(fe, null, be($(d).schedules, (h, p) => (R(), I(fe, { key: p }, [
            r.$slots["schedule-heading"] ? (R(), I("div", {
              key: 0,
              class: De(["vuecal__schedule vuecal__schedule--heading", h.class])
            }, [
              X(r.$slots, "schedule-heading", {
                schedule: h,
                view: $(n)
              })
            ], 2)) : (R(), I("div", {
              key: 1,
              class: De(["vuecal__schedule vuecal__schedule--heading", h.class]),
              innerHTML: h.label
            }, null, 10, Cn))
          ], 64))), 128))
        ], 64))), 128))
      ])) : ne("", !0),
      $(d).allDayEvents ? (R(), I("div", On, [
        (R(!0), I(fe, null, be(D.value, (M, c) => (R(), He(Yt, {
          class: De(["vuecal__all-day-cell", { "vuecal__weekday--today": M.isToday }]),
          key: c,
          start: M.date,
          end: new Date(M.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: c,
          "all-day": ""
        }, je({ _: 2 }, [
          r.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: U((h) => [
              X(r.$slots, "event.all-day", ue({ ref_for: !0 }, h))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: U((h) => [
              X(r.$slots, "event", ue({ ref_for: !0 }, h))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        ge("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: j[0] || (j[0] = (...M) => E.handleMouseDown && E.handleMouseDown(...M)),
          onTouchstart: j[1] || (j[1] = (...M) => E.handleTouchStart && E.handleTouchStart(...M))
        }, null, 32)
      ])) : ne("", !0)
    ])) : ne("", !0);
  }
}, Vn = { class: "vuecal__time-column" }, An = { class: "vuecal__time-column-inner" }, jn = {
  key: 0,
  class: "vuecal__all-day-label"
}, Pn = ["title"], Ln = {
  __name: "time-column",
  setup(o) {
    const e = Le("vuecal"), { config: i, texts: n, view: d } = e, _ = C(() => {
      const Y = [];
      for (let D = i.timeFrom; D < i.timeTo; D += i.timeStep) {
        const F = D + i.timeStep > i.timeTo, E = ~~(D / 60), r = D % 60, j = n[D < 720 ? "am" : "pm"];
        let M = null;
        F && (M = `calc(var(--vuecal-time-cell-size) * ${(i.timeTo - D) / i.timeStep})`), Y.push({
          minutesSum: D,
          // The sum of hours + minutes in minutes.
          hours: E,
          minutes: r,
          formatted12: `${E % 12 ? E % 12 : 12}${r ? `:${r.toString().padStart(2, 0)}` : ""}${j}`,
          formatted24: `${E.toString().padStart(2, 0)}:${r.toString().padStart(2, 0)}`,
          height: M
        });
      }
      return Y;
    });
    return (Y, f) => (R(), I("div", Vn, [
      ge("div", An, [
        $(i).allDayEvents ? (R(), I("div", jn, [
          X(Y.$slots, "all-day-label", {}, () => [
            Ze(ve($(e).texts.allDay), 1)
          ])
        ])) : ne("", !0),
        (R(!0), I(fe, null, be(_.value, (D, F) => (R(), I("div", {
          class: "vuecal__time-cell",
          key: F,
          style: we({ height: D.height || null })
        }, [
          X(Y.$slots, "time-cell", {
            index: F,
            minutes: D.minutes,
            hours: D.hours,
            minutesSum: D.minutesSum,
            format12: D.formatted12,
            format24: D.formatted24
          }, () => [
            ge("label", null, ve($(i).twelveHour ? D.formatted12 : D.formatted24), 1)
          ])
        ], 4))), 128)),
        $(i).currentTimeLabel ? (R(), I("div", {
          key: 1,
          class: "vuecal__current-time",
          style: we($(d).nowLine.style),
          title: $(d).nowLine.currentTime
        }, [
          X(Y.$slots, "current-time-label", {
            now: $(d).now,
            timeFormatted: $(d).nowLine.currentTime
          }, () => [
            ge("span", null, ve($(d).nowLine.currentTime), 1)
          ])
        ], 12, Pn)) : ne("", !0)
      ])
    ]));
  }
}, Fn = {
  __name: "body",
  setup(o) {
    const e = Le("vuecal"), { view: i, config: n, dateUtils: d, touch: _, eventsManager: Y } = e, f = de(null), D = de(null), F = de(null), { resizeState: E } = Y, r = C(() => ({
      "--vuecal-grid-columns": i.cols,
      "--vuecal-grid-rows": i.rows,
      "--vuecal-body-max-height": n.time ? `${n.timeCellHeight * (n.timeTo - n.timeFrom) / n.timeStep}px` : null
    })), j = C(() => {
      const p = n.horizontal, s = p ? D.value : F.value, J = d.formatTime(Me(s, n), n.twelveHour ? "h:mm{am}" : "HH:mm");
      return {
        style: { [p ? "left" : "top"]: `${s}%` },
        time: J
      };
    }), M = (p) => {
      var le;
      if (i.isMonth || i.isYear || i.isYears) return;
      const s = _.isResizingEvent && n.editableEvents.resizeX;
      if (!n.timeAtCursor && !s) return;
      const J = ((le = p.touches) == null ? void 0 : le[0]) || p, { clientX: y, clientY: N } = J;
      if (s && (E.cellEl = h(y, N)), n.timeAtCursor) {
        const { top: t, left: V } = f.value.getBoundingClientRect();
        n.horizontal ? D.value = (y - V) * 100 / f.value.clientWidth : F.value = nt(N - t, f.value);
      }
    }, c = () => {
      D.value = null, F.value = null;
    }, h = (p, s) => {
      const J = document.elementFromPoint(p, s);
      return (J == null ? void 0 : J.closest(".vuecal__cell")) || null;
    };
    return tt(() => {
      f.value.addEventListener("mousemove", M), f.value.addEventListener("touchmove", M), f.value.addEventListener("mouseleave", c), f.value.addEventListener("touchend", c);
    }), Ne(() => {
      f.value && (f.value.removeEventListener("mousemove", M), f.value.removeEventListener("touchmove", M), f.value.removeEventListener("mouseleave", c), f.value.removeEventListener("touchend", c));
    }), (p, s) => (R(), I("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: f,
      style: we(r.value)
    }, [
      Pe(Ue, { name: "vuecal-shrink" }, {
        default: U(() => [
          $(n).timeAtCursor && (D.value !== null || F.value !== null) ? (R(), I("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: we(j.value.style)
          }, [
            ge("label", null, ve(j.value.time), 1)
          ], 4)) : ne("", !0)
        ]),
        _: 1
      }),
      (R(!0), I(fe, null, be($(i).cellDates, (J, y) => (R(), He(Yt, {
        key: y,
        start: J.start,
        end: J.end,
        index: y
      }, je({ _: 2 }, [
        p.$slots.cell ? {
          name: "cell",
          fn: U((N) => [
            X(p.$slots, "cell", ue({ ref_for: !0 }, N))
          ]),
          key: "0"
        } : void 0,
        p.$slots["cell-date"] ? {
          name: "cell-date",
          fn: U((N) => [
            X(p.$slots, "cell-date", ue({ ref_for: !0 }, N))
          ]),
          key: "1"
        } : void 0,
        p.$slots["cell-content"] ? {
          name: "cell-content",
          fn: U((N) => [
            X(p.$slots, "cell-content", ue({ ref_for: !0 }, N))
          ]),
          key: "2"
        } : void 0,
        p.$slots["cell-events"] ? {
          name: "cell-events",
          fn: U((N) => [
            X(p.$slots, "cell-events", ue({ ref_for: !0 }, N))
          ]),
          key: "3"
        } : void 0,
        p.$slots[`event.${$(i).id}`] ? {
          name: `event.${$(i).id}`,
          fn: U((N) => [
            X(p.$slots, `event.${$(i).id}`, ue({ ref_for: !0 }, N))
          ]),
          key: "4"
        } : void 0,
        p.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: U((N) => [
            X(p.$slots, "event.all-day", ue({ ref_for: !0 }, N))
          ]),
          key: "5"
        } : void 0,
        p.$slots.event ? {
          name: "event",
          fn: U((N) => [
            X(p.$slots, "event", ue({ ref_for: !0 }, N))
          ]),
          key: "6"
        } : void 0,
        p.$slots["event-count"] ? {
          name: "event-count",
          fn: U((N) => [
            X(p.$slots, "event-count", ue({ ref_for: !0 }, N))
          ]),
          key: "7"
        } : void 0,
        p.$slots["now-line"] ? {
          name: "now-line",
          fn: U((N) => [
            X(p.$slots, "now-line", ue({ ref_for: !0 }, N))
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
  setup(o, { expose: e, emit: i }) {
    const n = o, d = i, _ = Ot("vuecal-el"), Y = Gt({ props: n, emit: d, attrs: Vt(), vuecalEl: _, uid: Ht() }), { config: f, view: D, dateUtils: F, touch: E } = Y, r = C(() => f.time && (D.isDay || D.isDays || D.isWeek)), j = C(() => Array(D.rows).fill().map((s, J) => F.getWeek(F.addDays(D.firstCellDate, 7 * J)))), M = C(() => {
      var s;
      return {
        "vuecal--ready": f.ready,
        [`vuecal--${f.theme}-theme`]: f.theme,
        [`vuecal--${f.size}`]: !0,
        "vuecal--date-picker": f.datePicker,
        "vuecal--dark": f.dark,
        "vuecal--light": !f.dark,
        [`vuecal--${D.id}-view`]: !0,
        "vuecal--view-has-time": r.value,
        "vuecal--timeless": !f.time,
        "vuecal--dragging-cell": E.isDraggingCell,
        "vuecal--dragging-event": E.isDraggingEvent,
        "vuecal--resizing-event": E.isResizingEvent,
        "vuecal--has-schedules": (s = f.schedules) == null ? void 0 : s.length,
        "vuecal--horizontal": f.horizontal
      };
    }), c = C(() => {
      var s;
      return {
        "--vuecal-time-cell-size": f.timeCellHeight && `${f.timeCellHeight}px`,
        "--vuecal-schedules-count": ((s = f.schedules) == null ? void 0 : s.length) ?? 0
      };
    }), h = C(() => {
      var s, J;
      return {
        "vuecal__scrollable--row": r.value || f.weekNumbers && D.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${D.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (s = f.schedules) == null ? void 0 : s.length,
        "vuecal__scrollable--no-schedules": !((J = f.schedules) != null && J.length),
        "vuecal__scrollable--horizontal": f.horizontal,
        "vuecal__scrollable--no-all-day-bar": !f.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": f.allDayEvents
      };
    }), p = (s) => {
      s.target.closest(".vuecal__cell") && s.preventDefault();
    };
    return tt(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && _.value.addEventListener("contextmenu", p), await qe(), f.ready = !0, d("ready", { config: f, view: D });
    }), Ne(() => {
      var s;
      (s = _ == null ? void 0 : _.value) == null || s.removeEventListener("contextmenu", p);
    }), ot("vuecal", Y), ot("$vuecalEl", _), e({ view: Y.view }), (s, J) => (R(), I("div", {
      class: De(["vuecal", M.value]),
      ref: "vuecal-el",
      "data-locale": s.locale,
      style: we(c.value)
    }, [
      s.$slots.diy ? X(s.$slots, "diy", {
        key: 0,
        vuecal: $(Y)
      }) : (R(), I(fe, { key: 1 }, [
        Pe(tn, null, je({ _: 2 }, [
          s.$slots.header ? {
            name: "header",
            fn: U((y) => [
              X(s.$slots, "header", oe(ie(y)))
            ]),
            key: "0"
          } : void 0,
          !s.$slots.header && s.$slots["previous-button"] ? {
            name: "previous-button",
            fn: U((y) => [
              X(s.$slots, "previous-button", oe(ie(y)))
            ]),
            key: "1"
          } : void 0,
          !s.$slots.header && s.$slots["next-button"] ? {
            name: "next-button",
            fn: U((y) => [
              X(s.$slots, "next-button", oe(ie(y)))
            ]),
            key: "2"
          } : void 0,
          !s.$slots.header && s.$slots["today-button"] ? {
            name: "today-button",
            fn: U((y) => [
              X(s.$slots, "today-button", oe(ie(y)))
            ]),
            key: "3"
          } : void 0,
          !s.$slots.header && s.$slots.title ? {
            name: "title",
            fn: U((y) => [
              X(s.$slots, "title", oe(ie(y)))
            ]),
            key: "4"
          } : void 0,
          !s.$slots.header && s.$slots["title.day"] ? {
            name: "title.day",
            fn: U((y) => [
              X(s.$slots, "title.day", oe(ie(y)))
            ]),
            key: "5"
          } : void 0,
          !s.$slots.header && s.$slots["title.days"] ? {
            name: "title.days",
            fn: U((y) => [
              X(s.$slots, "title.days", oe(ie(y)))
            ]),
            key: "6"
          } : void 0,
          !s.$slots.header && s.$slots["title.week"] ? {
            name: "title.week",
            fn: U((y) => [
              X(s.$slots, "title.week", oe(ie(y)))
            ]),
            key: "7"
          } : void 0,
          !s.$slots.header && s.$slots["title.month"] ? {
            name: "title.month",
            fn: U((y) => [
              X(s.$slots, "title.month", oe(ie(y)))
            ]),
            key: "8"
          } : void 0,
          !s.$slots.header && s.$slots["title.year"] ? {
            name: "title.year",
            fn: U((y) => [
              X(s.$slots, "title.year", oe(ie(y)))
            ]),
            key: "9"
          } : void 0,
          !s.$slots.header && s.$slots["title.years"] ? {
            name: "title.years",
            fn: U((y) => [
              X(s.$slots, "title.years", oe(ie(y)))
            ]),
            key: "10"
          } : void 0,
          !s.$slots.header && s.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: U((y) => [
              X(s.$slots, "schedule-heading", oe(ie(y)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        ge("div", Xn, [
          Pe(Ue, {
            name: `vuecal-slide-fade--${$(D).transitionDirection}`
          }, {
            default: U(() => [
              (R(), I("div", {
                class: De(["vuecal__scrollable", h.value]),
                key: $(D).id + $(D).start.getTime()
              }, [
                r.value ? (R(), He(Ln, { key: 0 }, je({ _: 2 }, [
                  s.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: U((y) => [
                      X(s.$slots, "time-cell", oe(ie(y)))
                    ]),
                    key: "0"
                  } : void 0,
                  s.$slots["current-time-label"] ? {
                    name: "current-time-label",
                    fn: U((y) => [
                      X(s.$slots, "current-time-label", oe(ie(y)))
                    ]),
                    key: "1"
                  } : void 0
                ]), 1024)) : ne("", !0),
                $(f).weekNumbers && $(D).isMonth ? (R(), I("div", Bn, [
                  (R(!0), I(fe, null, be(j.value, (y) => (R(), I("div", Wn, [
                    X(s.$slots, "week-number", {}, () => [
                      ge("small", null, ve(y), 1)
                    ])
                  ]))), 256))
                ])) : ne("", !0),
                ge("div", Nn, [
                  Pe(Hn, null, je({ _: 2 }, [
                    s.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: U((y) => [
                        X(s.$slots, "weekday-heading", oe(ie(y)))
                      ]),
                      key: "0"
                    } : void 0,
                    s.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: U((y) => [
                        X(s.$slots, "schedule-heading", oe(ie(y)))
                      ]),
                      key: "1"
                    } : void 0,
                    s.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: U((y) => [
                        X(s.$slots, "event.all-day", oe(ie(y)))
                      ]),
                      key: "2"
                    } : void 0,
                    s.$slots.event ? {
                      name: "event",
                      fn: U((y) => [
                        X(s.$slots, "event", oe(ie(y)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  Pe(Fn, null, je({ _: 2 }, [
                    s.$slots.cell ? {
                      name: "cell",
                      fn: U((y) => [
                        X(s.$slots, "cell", oe(ie(y)))
                      ]),
                      key: "0"
                    } : void 0,
                    !s.$slots.cell && s.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: U((y) => [
                        X(s.$slots, "cell-date", oe(ie(y)))
                      ]),
                      key: "1"
                    } : void 0,
                    !s.$slots.cell && s.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: U((y) => [
                        X(s.$slots, "cell-content", oe(ie(y)))
                      ]),
                      key: "2"
                    } : void 0,
                    !s.$slots.cell && s.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: U((y) => [
                        X(s.$slots, "cell-events", oe(ie(y)))
                      ]),
                      key: "3"
                    } : void 0,
                    !s.$slots.cell && !s.$slots["cell-events"] && s.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: U((y) => [
                        X(s.$slots, "event.all-day", oe(ie(y)))
                      ]),
                      key: "4"
                    } : void 0,
                    !s.$slots.cell && !s.$slots["cell-events"] && s.$slots[`event.${$(D).id}`] ? {
                      name: `event.${$(D).id}`,
                      fn: U((y) => [
                        X(s.$slots, `event.${$(D).id}`, oe(ie(y)))
                      ]),
                      key: "5"
                    } : void 0,
                    !s.$slots.cell && !s.$slots["cell-events"] && s.$slots.event ? {
                      name: "event",
                      fn: U((y) => [
                        X(s.$slots, "event", oe(ie(y)))
                      ]),
                      key: "6"
                    } : void 0,
                    !s.$slots.cell && s.$slots["event-count"] ? {
                      name: "event-count",
                      fn: U((y) => [
                        X(s.$slots, "event-count", oe(ie(y)))
                      ]),
                      key: "7"
                    } : void 0,
                    s.$slots["now-line"] ? {
                      name: "now-line",
                      fn: U((y) => [
                        X(s.$slots, "now-line", oe(ie(y)))
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
}, qn = (o) => {
  Be.texts = { ...ye.texts, ...o }, Be.dateUtils.updateTexts(Be.texts);
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
