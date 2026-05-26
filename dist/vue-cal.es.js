import { computed as C, reactive as ke, watch as De, toRefs as Ct, ref as de, onBeforeUnmount as We, nextTick as qe, inject as Le, openBlock as R, createElementBlock as G, renderSlot as N, unref as T, Fragment as fe, renderList as we, normalizeClass as ye, createCommentVNode as ae, createElementVNode as he, createVNode as Pe, Transition as Ue, withCtx as K, createBlock as He, resolveDynamicComponent as st, mergeProps as ue, toHandlers as Je, normalizeProps as oe, onMounted as tt, toDisplayString as ve, createTextVNode as Ze, withModifiers as lt, normalizeStyle as pe, TransitionGroup as rt, createSlots as Ae, useTemplateRef as Ot, useId as Ht, useAttrs as Vt, provide as ot, guardReactiveProps as ie } from "vue";
/**
  * vue-cal v5.0.1-rc.46
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
}, At = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Ne = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], ct = (r) => !r || typeof r != "object" || Array.isArray(r) ? !1 : ("from" in r || "to" in r) && ("class" in r || "label" in r || "allowEvents" in r), Ke = (r) => {
  if (!r) return [];
  const e = Array.isArray(r) ? r : [r], o = [];
  for (let n = 0; n < e.length; n++) {
    const c = e[n];
    ct(c) && o.push({ ...c });
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
    const c = Object.keys(n);
    o = c.length;
    for (let k = 0; k < c.length; k++) {
      const Y = c[k];
      e.schedules[Y] = Ke(n[Y]);
    }
  }
  return !e.default.length && !o ? null : e;
}, Pt = (r) => {
  const e = {};
  let o = !1;
  for (const n in r) {
    if (!Object.prototype.hasOwnProperty.call(r, n)) continue;
    const c = r[n];
    if (!c) continue;
    let k = null, Y = null;
    const v = c.default;
    if (v && v.length)
      for (let F = 0; F < v.length; F++) {
        const j = v[F];
        j && j.allowEvents === !1 && typeof j.from == "number" && typeof j.to == "number" && (k || (k = []), k.push({ from: j.from, to: j.to }), o = !0);
      }
    const p = c.schedules;
    if (p && typeof p == "object")
      for (const F in p) {
        if (!Object.prototype.hasOwnProperty.call(p, F)) continue;
        const j = p[F];
        if (!j || !j.length) continue;
        const f = [];
        for (let b = 0; b < j.length; b++) {
          const V = j[b];
          V && V.allowEvents === !1 && typeof V.from == "number" && typeof V.to == "number" && (f.push({ from: V.from, to: V.to }), o = !0);
        }
        f.length && (Y || (Y = {}), Y[F] = f);
      }
    if (k || Y) {
      const F = {};
      k && (F.default = k), Y && (F.schedules = Y), e[n] = F;
    }
  }
  return { hasAny: o, byWeekday: e };
}, Lt = Ne.reduce((r, e, o) => (r[e] = o || 7, r), {}), Ft = (r, e, o) => {
  const { dateUtils: n } = r, c = !1, k = C(() => {
    if (e.view && b.value[e.view]) return e.view;
    if (e.view && !b.value[e.view])
      return console.warn(
        `Vue Cal: the provided view \`${e.view}\` is not in the list of available views. The first available view will be chosen: \`${Object.keys(b.value)[0]}\`.`
      ), Object.keys(b.value)[0];
    const s = e.datePicker ? "month" : "week";
    return b.value[s] ? s : Object.keys(b.value)[0];
  }), Y = C(() => e.sm && !e.xs), v = C(() => e.xs || e.datePicker), p = C(() => e.clickToNavigate || e.datePicker && e.clickToNavigate !== !1), F = C(() => {
    const s = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, w = (H) => H.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [H, u] of Object.entries(o)) {
      const [J, ee, te] = H.match(/^on(Cell|Event)(.+)$/) || [];
      J && (s[ee.toLowerCase()][w(te).replace(/^-+|-+$/g, "")] = u);
    }
    return s;
  }), j = C(() => {
    var w;
    const s = {};
    return e.hideWeekends && (s[6] = !0) && (s[7] = !0), (w = e.hideWeekdays) != null && w.length && e.hideWeekdays.forEach((H) => s[Lt[H]] = !0), s;
  }), f = C(() => e.hideWeekends || j.value[6] && j.value[7]), b = C(() => {
    const s = e.datePicker;
    let w = 0, H = {};
    const u = e.views;
    if (s && !u) return {
      month: { ...ge.availableViews.month },
      year: { ...ge.availableViews.year },
      years: { ...ge.availableViews.years }
    };
    if (u)
      Array.isArray(u) ? H = u.reduce((J, ee) => (typeof ee == "string" && ge.availableViews[ee] ? J[ee] = ge.availableViews[ee] : w++, J), {}) : typeof u == "object" && (H = Object.entries(u).reduce((J, [ee, te]) => {
        const { cols: X, rows: le } = ge.availableViews[ee];
        return J[ee] = { cols: te.cols || X, rows: te.rows || le }, J;
      }, {})), w && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(H).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), H = { ...ge.availableViews });
    else if (H = { ...ge.availableViews }, e.horizontal) {
      const { days: J, week: ee } = ge.availableViews;
      H.days = { cols: J.rows, rows: J.cols }, H.week = { cols: ee.rows, rows: ee.cols };
    }
    return H;
  }), V = C(() => e.datePicker ? "month" : b.value.week ? "week" : Object.keys(b.value)[0]), l = C(() => {
    if (typeof e.selectedDate == "string") return n.stringToDate(e.selectedDate);
    if (e.selectedDate instanceof Date) return e.selectedDate;
    e.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", e.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), D = C(() => {
    if (!e.disableDays) return [];
    const s = [];
    if (Array.isArray(e.disableDays))
      for (let w of e.disableDays) {
        let H = w;
        typeof w == "string" ? H = n.stringToDate(w) : w instanceof Date && (w = n.formatDate(w, "YYYY-MM-DD")), H instanceof Date && !isNaN(H.getTime()) ? s.push(w) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", w);
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
    const H = [];
    for (let u = 0; u < w.length; u++) {
      const J = w[u];
      J.hide || H.push({ ...J, id: J.id ?? u + 1 });
    }
    return H.length ? H : void 0;
  }), y = C(() => {
    const s = e.specialHours, w = e.businessHours;
    return s && typeof s == "object" && !Array.isArray(s) && Object.keys(s).length ? s : w && typeof w == "object" && !Array.isArray(w) ? w : {};
  }), W = C(() => {
    const s = y.value;
    return !s || typeof s != "object" ? {} : Object.entries(s).reduce((w, [H, u]) => {
      if (!Ne.includes(H)) return w;
      const J = jt(u);
      return J && (w[H] = J), w;
    }, {});
  }), se = C(() => Pt(W.value)), t = C(() => {
    const s = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return e.editableEvents === !0 ? s : e.editableEvents === !1 ? Object.keys(s).map((w) => s[w] = !1) : { ...s, ...e.editableEvents };
  }), O = C(() => {
    const { view: s } = r, { eventCount: w } = e;
    return (Array.isArray(w) ? w.includes(s.id) : w) && (s.isMonth && !e.eventsOnMonthView || s.isYear);
  }), S = C(() => {
    const { view: s } = r;
    return e.allDayEvents && e.time && (s.isDay || s.isDays || s.isWeek);
  }), $ = C(() => {
    const { view: s } = r;
    return e.horizontal && (s.isDay || s.isDays || s.isWeek);
  }), M = C(() => e.timeAtCursor && e.time), h = async (s) => {
    var H;
    let w = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((u) => u.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((u) => u.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((u) => u.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((u) => u.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((u) => u.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((u) => u.default), "../i18n/da.json": () => import("./i18n/da.js").then((u) => u.default), "../i18n/de.json": () => import("./i18n/de.js").then((u) => u.default), "../i18n/el.json": () => import("./i18n/el.js").then((u) => u.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((u) => u.default), "../i18n/en-us.json": () => Promise.resolve().then(() => It).then((u) => u.default), "../i18n/es.json": () => import("./i18n/es.js").then((u) => u.default), "../i18n/et.json": () => import("./i18n/et.js").then((u) => u.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((u) => u.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((u) => u.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((u) => u.default), "../i18n/he.json": () => import("./i18n/he.js").then((u) => u.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((u) => u.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((u) => u.default), "../i18n/id.json": () => import("./i18n/id.js").then((u) => u.default), "../i18n/is.json": () => import("./i18n/is.js").then((u) => u.default), "../i18n/it.json": () => import("./i18n/it.js").then((u) => u.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((u) => u.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((u) => u.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((u) => u.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((u) => u.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((u) => u.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((u) => u.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((u) => u.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((u) => u.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((u) => u.default), "../i18n/no.json": () => import("./i18n/no.js").then((u) => u.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((u) => u.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((u) => u.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((u) => u.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((u) => u.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((u) => u.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((u) => u.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((u) => u.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((u) => u.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((u) => u.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((u) => u.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((u) => u.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((u) => u.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((u) => u.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((u) => u.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((u) => u.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((u) => u.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((u) => u.default) });
    {
      if (!w[`../i18n/${s}.json`]) {
        console.warn(`Vue Cal: the locale \`${s}\` does not exist. Falling back to \`en-us\`.`), s = "en-us";
        return;
      }
      w = await ((H = w[`../i18n/${s}.json`]) == null ? void 0 : H.call(w));
    }
    r.texts = Object.assign(r.texts, Object.assign({ ...ge.texts }, w)), n.updateTexts(r.texts);
  }, I = ke(e.events || []);
  return De(
    [() => e.events, () => {
      var s;
      return (s = e.events) == null ? void 0 : s.length;
    }],
    ([s]) => I.splice(0, I.length, ...s || [])
  ), De(() => e.locale, (s) => h(s || "en-us")), (e.locale || !r.texts.today) && h(e.locale || "en-us"), {
    ...Ct(e),
    events: I,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: F,
    defaultView: V,
    availableViews: b,
    disableDays: D,
    ready: c,
    sm: Y,
    xs: v,
    clickToNavigate: p,
    hideWeekdays: j,
    hideWeekends: f,
    minTimestamp: g,
    maxTimestamp: a,
    schedules: U,
    specialHours: W,
    specialHoursDisallowed: se,
    selectedDate: l,
    editableEvents: t,
    showCellEventCount: O,
    allDayEvents: S,
    horizontal: $,
    timeAtCursor: M,
    view: k,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(j.value).length;
    },
    get size() {
      return v.value ? "xs" : Y.value ? "sm" : "lg";
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
}, Ye = ({ start: r, end: e, schedule: o, disallowed: n, hasSchedules: c }) => {
  if (!(n != null && n.hasAny) || !r || !e) return !1;
  const k = n.byWeekday, Y = r.getTime(), v = e.getTime();
  if (v <= Y) return !1;
  const p = new Date(r);
  p.setHours(0, 0, 0, 0);
  const F = new Date(e);
  for (F.setHours(0, 0, 0, 0); p.getTime() <= F.getTime(); ) {
    const j = Ne[p.getDay()], f = k[j];
    if (f) {
      let b = f.default;
      if (c && o !== void 0 && o !== null && f.schedules) {
        const l = String(o);
        Object.prototype.hasOwnProperty.call(f.schedules, l) && (b = f.schedules[l]);
      }
      if (!b || !b.length) {
        p.setDate(p.getDate() + 1);
        continue;
      }
      const V = p.getTime();
      for (let l = 0; l < b.length; l++) {
        const { from: D, to: g } = b[l], a = V + D * 6e4, U = V + g * 6e4;
        if (Y < U && v > a) return !0;
      }
    }
    p.setDate(p.getDate() + 1);
  }
  return !1;
}, dt = 6e4, xe = (r, e, o, n, c) => {
  if (!(n != null && n.hasAny)) return e;
  const k = r.getTime(), Y = e.getTime();
  if (Y <= k || !Ye({ start: r, end: e, schedule: o, disallowed: n, hasSchedules: c }))
    return e;
  let v = k + dt, p = Y, F = k;
  for (; v <= p; ) {
    const j = Math.floor((v + p + 1) / 2);
    Ye({ start: r, end: new Date(j), schedule: o, disallowed: n, hasSchedules: c }) ? p = j - 1 : (F = j, v = j + 1);
  }
  return new Date(F);
}, et = (r, e, o, n, c) => {
  if (!(n != null && n.hasAny)) return e;
  const k = r.getTime(), Y = e.getTime();
  if (k <= Y || !Ye({ start: e, end: r, schedule: o, disallowed: n, hasSchedules: c }))
    return e;
  let v = Y, p = k - dt, F = Y;
  for (; v <= p; ) {
    const j = Math.floor((v + p) / 2);
    Ye({ start: new Date(j), end: r, schedule: o, disallowed: n, hasSchedules: c }) ? v = j + 1 : (F = j, p = j - 1);
  }
  return new Date(F);
}, Rt = ({
  anchorDayMinutes: r,
  cursorDayMinutes: e,
  snappedLow: o,
  snappedHigh: n,
  cellDate: c,
  schedule: k,
  disallowed: Y,
  hasSchedules: v
}) => {
  let p = o, F = n;
  if (!(Y != null && Y.hasAny) || F <= p) return { low: p, high: F };
  const j = new Date(c);
  j.setHours(0, 0, 0, 0);
  const f = (g) => {
    const a = new Date(j);
    return a.setMinutes(g), a;
  }, b = f(p), V = f(F);
  if (!Ye({ start: b, end: V, schedule: k, disallowed: Y, hasSchedules: v })) return { low: p, high: F };
  const l = j.getTime(), D = (g) => Math.round((g.getTime() - l) / 6e4);
  if (r <= e) {
    const g = xe(b, V, k, Y, v);
    F = D(g);
  } else {
    const g = et(V, b, k, Y, v);
    p = D(g);
  }
  return { low: p, high: F };
}, Xt = ({
  proposedStart: r,
  proposedEnd: e,
  prevStart: o,
  prevEnd: n,
  schedule: c,
  disallowed: k,
  hasSchedules: Y
}) => {
  if (!(k != null && k.hasAny)) return { start: r, end: e };
  let v = r, p = e;
  if (p.getTime() <= v.getTime()) return { start: v, end: p };
  if (!Ye({ start: v, end: p, schedule: c, disallowed: k, hasSchedules: Y })) return { start: v, end: p };
  const F = o.getTime(), j = n.getTime(), f = v.getTime(), V = p.getTime() !== j, l = f !== F;
  if (V && !l)
    return p = xe(v, p, c, k, Y), { start: v, end: p };
  if (l && !V)
    return v = et(p, v, c, k, Y), { start: v, end: p };
  const D = xe(v, p, c, k, Y);
  return Ye({ start: v, end: D, schedule: c, disallowed: k, hasSchedules: Y }) ? (v = et(p, v, c, k, Y), { start: v, end: p }) : { start: v, end: D };
}, Ge = ke({ id: null, date: null });
let it = !1, Qe = !0;
const _e = ke({ el: null, cell: null, timeout: null }), Te = ke({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function Bt(r) {
  const { config: e, view: o, eventsManager: n, emit: c, uid: k, dateUtils: Y } = r, v = (g) => {
    var O;
    const a = e.horizontal, { clientX: U, clientY: y } = ((O = g.touches) == null ? void 0 : O[0]) || g, { top: W, left: se } = g.currentTarget.getBoundingClientRect(), t = ~~g.dataTransfer.getData("cursor-grab-at");
    if (a) {
      const S = U - se - t;
      return Se(S * 100 / g.currentTarget.clientWidth, e);
    } else {
      const S = y - W - t;
      return Se(nt(S, g.currentTarget), e);
    }
  }, p = (g, a, U) => {
    const y = a.duration || F(a.start, a.end) || e.timeStep;
    let W = Math.max(v(g), 0);
    if (e.snapToInterval) {
      const S = W + e.snapToInterval / 2;
      W = S - S % e.snapToInterval;
    }
    const se = new Date(new Date(U).setMinutes(W)), t = Math.min(W + y, 1440), O = new Date(new Date(U).setMinutes(t));
    return { start: se, end: O };
  }, F = (g, a) => Math.round((a - g) / 6e4);
  return {
    eventDragStart: (g, a) => {
      if (g.target.nodeType === 3 || r.touch.isResizingEvent) return g.preventDefault();
      g.dataTransfer.effectAllowed = "move", g.dataTransfer.dropEffect = "move";
      const U = { ...a, _: { id: a._.id, duration: F(a.start, a.end) } };
      try {
        g.dataTransfer.setData("text/plain", ""), g.dataTransfer.setData("event", JSON.stringify(U)), g.dataTransfer.setData("cursor-grab-at", e.horizontal ? g.offsetX : g.offsetY);
      } catch (W) {
        return console.warn("Vue Cal: Failed to set drag data:", W), g.preventDefault();
      }
      Te.eventId = a._.id, Te.fromVueCal = k, c("event-drag-start", {
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
      y && U !== y && n.deleteEvent(a._.id, 3), it && Qe && Ge.id && o.switchView(Ge.id, Ge.date, !0), c("event-drag-end", {
        e: g,
        event: a,
        external: Te.fromVueCal !== k
      }), Te.fromVueCal = null, Te.toVueCal = null, r.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (g, a) => {
      const { start: U } = a, y = g.currentTarget;
      if (!g.currentTarget.contains(g.relatedTarget)) {
        if (y === _e.el || !y.className.includes("vuecal__cell-content")) return !1;
        _e.el && (_e.cell.highlighted = !1), Object.assign(_e, { el: y, cell: a, timeout: clearTimeout(_e.timeout) }), a.highlighted = !0, ["years", "year", "month"].includes(o.id) && (_e.timeout = setTimeout(() => r.switchToNarrowerView(U), 2e3));
      }
    },
    cellDragOver: (g, a) => {
      const { start: U, schedule: y } = a;
      g.preventDefault(), a.highlighted = !0, (y || y === 0) && (a.highlightedSchedule = y);
    },
    cellDragLeave: (g, a) => {
      g.preventDefault(), !g.currentTarget.contains(g.relatedTarget) && (a.highlightedSchedule = !1, _e.cell === a && (clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null }), a.highlighted = !1));
    },
    cellDragDrop: async (g, a, U = !1) => {
      var w, H, u, J, ee, te;
      g.preventDefault(), clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null });
      const y = JSON.parse(g.dataTransfer.getData("event") || "{}");
      y.start && (y.start = new Date(y.start)), y.end && (y.end = new Date(y.end));
      let W, se, t;
      U ? (se = new Date(a.start), t = new Date(a.end)) : { start: se, end: t } = p(g, y, a.start);
      let { schedule: O } = ((w = g.target.closest("[data-schedule]")) == null ? void 0 : w.dataset) || {}, S;
      O !== void 0 && String(O).length && (S = ((u = (H = e.schedules) == null ? void 0 : H.find((X) => String(X.id) === String(O))) == null ? void 0 : u.id) ?? O);
      let $ = () => {
      };
      Te.fromVueCal === k ? (W = n.getEvent(y._.id), W && (W._.dragging = !1, $ = (X) => {
        if (W.start = se, W.end = t, W.allDay = U, S !== void 0 && (W.schedule = S), X && typeof X == "object") {
          const { _: le, ...i } = X;
          Object.assign(W, i);
        }
      })) : (W = {
        ...y,
        start: se,
        end: t,
        ...S !== void 0 && { schedule: S },
        _: { id: ((J = y._) == null ? void 0 : J.id) || y.id, duration: F(se, t) },
        getOverlappingEvents: () => n.getEventsInRange(se, t, { schedule: S, exactTime: !0 })
      }, $ = (X) => {
        if (W = n.createEvent(W), X && typeof X == "object") {
          const { _: le, ...i } = X;
          Object.assign(W, i);
        }
      });
      const M = S !== void 0 ? S : (W == null ? void 0 : W.schedule) !== void 0 ? W.schedule : y == null ? void 0 : y.schedule, h = !!(e.schedules && e.schedules.length);
      let I = !0;
      const { drop: s } = (ee = e.eventListeners) == null ? void 0 : ee.event;
      !U && e.time && ((te = e.specialHoursDisallowed) != null && te.hasAny) && Ye({
        start: se,
        end: t,
        schedule: M,
        disallowed: e.specialHoursDisallowed,
        hasSchedules: h
      }) ? I = !1 : s && (I = await s({
        e: g,
        event: { ...W, start: se, end: t, schedule: S },
        overlaps: W.getOverlappingEvents({ start: se, end: t, schedule: S }),
        cell: a,
        external: Te.fromVueCal !== k
      })), I !== !1 && $(I), a.highlighted = !1, a.highlightedSchedule = null, Qe = !1, Te.toVueCal = k, c("event-dropped", {
        e: g,
        cell: a,
        event: W,
        originalEvent: y,
        external: Te.fromVueCal !== k
      });
    }
  };
}
const vt = (r, e) => {
  let o, n, c, k = {}, Y = {};
  const v = de(r), p = () => {
    v.value.today || (v.value = e), Date.prototype.addDays = function(i) {
      return b(this, i || 0);
    }, Date.prototype.subtractDays = function(i) {
      return V(this, i || 0);
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
      return W(this);
    }, Date.prototype.isLeapYear = function() {
      return O(this);
    }, Date.prototype.format = function(i = "YYYY-MM-DD") {
      return w(this, i);
    }, Date.prototype.formatTime = function(i = "HH:mm") {
      return u(this, i);
    };
  }, F = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, j = (i) => {
    v.value = i, Date.prototype.subtractDays && p();
  }, f = () => (n !== (/* @__PURE__ */ new Date()).getDate() && (o = /* @__PURE__ */ new Date(), n = o.getDate(), c = `${o.getFullYear()}-${o.getMonth()}-${o.getDate()}`), c), b = (i, z) => {
    const _ = new Date(i.valueOf());
    return _.setDate(_.getDate() + z), _;
  }, V = (i, z) => {
    const _ = new Date(i.valueOf());
    return _.setDate(_.getDate() - z), _;
  }, l = (i, z) => {
    const _ = new Date(i.valueOf());
    return _.setHours(_.getHours() + z), _;
  }, D = (i, z) => {
    const _ = new Date(i.valueOf());
    return _.setHours(_.getHours() - z), _;
  }, g = (i, z) => {
    const _ = new Date(i.valueOf());
    return _.setMinutes(_.getMinutes() + z), _;
  }, a = (i, z) => {
    const _ = new Date(i.valueOf());
    return _.setMinutes(_.getMinutes() - z), _;
  }, U = (i, z) => {
    const _ = (ne) => {
      const Q = ne % z;
      return Q !== 0 && (ne += Q >= z / 2 ? z - Q : -Q), ne;
    };
    if (typeof i == "number") return _(i);
    if (i instanceof Date) {
      let ne = _(i.getMinutes());
      ne >= 60 && (i.setHours(i.getHours() + 1), ne = 0), i.setMinutes(ne, 0, 0);
    }
  }, y = (i, z = !1) => {
    const _ = new Date(Date.UTC(i.getFullYear(), i.getMonth(), i.getDate())), ne = _.getUTCDay() || 7;
    _.setUTCDate(_.getUTCDate() + 4 - ne);
    const Q = new Date(Date.UTC(_.getUTCFullYear(), 0, 1));
    return Math.ceil(((_ - Q) / 864e5 + 1) / 7) + (z ? 1 : 0);
  }, W = (i) => `${i.getFullYear()}-${i.getMonth()}-${i.getDate()}` === f(), se = (i, z) => {
    if (!i || !z) return console.warn(`Vue Cal: missing date${i ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (s(i)) {
      if (!s(z)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${z}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${i}\`.`);
    return i.getFullYear() === z.getFullYear() && i.getMonth() === z.getMonth() && i.getDate() === z.getDate();
  }, t = (i, z, _) => s(i) ? i.getTime() >= z && i.getTime() <= _ : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${i}\`.`), O = (i) => {
    const z = i.getFullYear();
    return !(z % 400) || z % 100 && !(z % 4);
  }, S = (i = null, z) => {
    const _ = i && new Date(i.valueOf()) || /* @__PURE__ */ new Date(), ne = z ? 7 : 6;
    return _.setDate(_.getDate() - (_.getDay() + ne) % 7), _;
  }, $ = (i) => i instanceof Date ? i : (i.length === 10 && (i += " 00:00"), new Date(i.replace(/-/g, "/"))), M = (i) => i.getHours() * 60 + i.getMinutes(), h = (i, z) => {
    typeof i == "string" && (i = i.replace(/-/g, "/")), typeof z == "string" && (z = z.replace(/-/g, "/")), i = new Date(i).setHours(0, 0, 0, 0), z = new Date(z).setHours(0, 0, 1, 0);
    const _ = (new Date(z).getTimezoneOffset() - new Date(i).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((z - i - _) / (24 * 3600 * 1e3));
  }, I = (i, z, _) => Math.abs(i.getTime() - z.getTime()) <= _ * 60 * 1e3, s = (i) => i && i instanceof Date && !isNaN(i), w = (i, z = "YYYY-MM-DD", _ = null) => {
    if (_ || (_ = v.value), z || (z = "YYYY-MM-DD"), z === "YYYY-MM-DD") return H(i);
    k = {}, Y = {};
    const ne = {
      YYYY: () => X(i, _).YYYY,
      YY: () => X(i, _).YY(),
      M: () => X(i, _).M,
      MM: () => X(i, _).MM(),
      MMM: () => X(i, _).MMM(),
      MMMM: () => X(i, _).MMMM(),
      MMMMG: () => X(i, _).MMMMG(),
      D: () => X(i, _).D,
      DD: () => X(i, _).DD(),
      S: () => X(i, _).S(),
      d: () => X(i, _).d,
      dd: () => X(i, _).dd(),
      ddd: () => X(i, _).ddd(),
      dddd: () => X(i, _).dddd(),
      HH: () => le(i, _).HH,
      H: () => le(i, _).H,
      hh: () => le(i, _).hh,
      h: () => le(i, _).h,
      am: () => le(i, _).am,
      AM: () => le(i, _).AM,
      mm: () => le(i, _).mm,
      m: () => le(i, _).m,
      s: () => le(i, _).s
    };
    return z.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (Q, me) => {
      const ce = ne[me.replace(/\{|\}/g, "")];
      return ce !== void 0 ? ce() : me;
    });
  }, H = (i) => {
    const z = i.getMonth() + 1, _ = i.getDate();
    return `${i.getFullYear()}-${z < 10 ? "0" : ""}${z}-${_ < 10 ? "0" : ""}${_}`;
  }, u = (i, z = "HH:mm", _ = null, ne = !1) => {
    let Q = !1;
    if (ne) {
      const [Ve, $e, m] = [i.getHours(), i.getMinutes(), i.getSeconds()];
      Ve + $e + m === 141 && (Q = !0);
    }
    if (i instanceof Date && z === "HH:mm") return Q ? "24:00" : J(i);
    Y = {}, _ || (_ = v.value);
    const me = le(i, _), ce = z.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (Ve, $e) => {
      const m = me[$e.replace(/\{|\}/g, "")];
      return m !== void 0 ? m : $e;
    });
    return Q ? ce.replace("23:59", "24:00") : ce;
  }, J = (i) => {
    const z = i.getHours(), _ = i.getMinutes();
    return `${(z < 10 ? "0" : "") + z}:${(_ < 10 ? "0" : "") + _}`;
  }, ee = (i) => {
    const z = Math.floor(i / 60).toString().padStart(2, 0), _ = (i % 60).toString().padStart(2, 0);
    return `${z}:${_}`;
  }, te = (i) => {
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
  }, X = (i, z) => {
    if (k.D) return k;
    const _ = i.getFullYear(), ne = i.getMonth() + 1, Q = i.getDate(), ce = (i.getDay() - 1 + 7) % 7;
    return k = {
      // Year.
      YYYY: _,
      // 2024.
      YY: () => _.toString().substring(2),
      // 24.
      // Month.
      M: ne,
      // 1 to 12.
      MM: () => ne.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => z.months[ne - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => z.months[ne - 1],
      // January to December.
      MMMMG: () => (z.monthsGenitive || z.months)[ne - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: Q,
      // 1 to 31.
      DD: () => Q.toString().padStart(2, 0),
      // 01 to 31.
      S: () => te(Q),
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
    }, k;
  }, le = (i, z) => {
    if (Y.am) return Y;
    let _, ne, Q;
    i instanceof Date ? (_ = i.getHours(), ne = i.getMinutes(), Q = i.getSeconds()) : (_ = Math.floor(i / 60), ne = Math.floor(i % 60));
    const me = _ % 12 ? _ % 12 : 12, ce = (z || { am: "am", pm: "pm" })[_ === 24 || _ < 12 ? "am" : "pm"];
    return Y = {
      H: _,
      h: me,
      HH: _.toString().padStart(2, 0),
      hh: me.toString().padStart(2, 0),
      am: ce,
      AM: ce.toUpperCase(),
      m: ne,
      mm: ne.toString().padStart(2, 0),
      s: Q
    }, Y;
  };
  return {
    addDatePrototypes: p,
    removeDatePrototypes: F,
    updateTexts: j,
    addDays: b,
    subtractDays: V,
    addHours: l,
    subtractHours: D,
    addMinutes: g,
    subtractMinutes: a,
    snapToInterval: U,
    getWeek: y,
    isToday: W,
    isSameDate: se,
    isInRange: t,
    isLeapYear: O,
    getPreviousFirstDayOfWeek: S,
    stringToDate: $,
    dateToMinutes: M,
    countDays: h,
    datesInSameTimeStep: I,
    isValid: s,
    formatDate: w,
    formatDateLite: H,
    formatTime: u,
    formatTimeLite: J,
    formatMinutes: ee
  };
}, Nt = (r) => {
  const { dateUtils: e, config: o } = r;
  let n = 0;
  const c = C(() => {
    var S, $, M, h, I;
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
    }, O = o.events.slice().sort((s, w) => s.start - w.start < 0 ? -1 : 1);
    for (let s of O) {
      const w = typeof s.start == "string" || typeof s.end == "string", H = !((S = s._) != null && S.register) || !s.isOverlapping || !s.delete;
      let u = !1;
      if (!w && (($ = s._) != null && $.cachedStart) && ((M = s._) != null && M.cachedEnd) && (u = s.start.getTime() !== ((h = s._) == null ? void 0 : h.cachedStart) || s.end.getTime() !== ((I = s._) == null ? void 0 : I.cachedEnd)), w || H || u) {
        if (!k(s)) continue;
        Y(s), s._.cachedStart = s.start.getTime(), s._.cachedEnd = s.end.getTime();
      }
      if (t.byId[s._.id] = s, s.recurring)
        t.recurring.push(s._.id);
      else if (!e.isSameDate(s.start, new Date(s.end.getTime() - 1)))
        s._.multiday = o.multidayEvents, o.multidayEvents ? t.multiday.push(s._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), s.end = new Date(new Date(s.start).setHours(23, 59, 59, 999)), Y(s)), t.byDate[s._.startFormatted] || (t.byDate[s._.startFormatted] = []), t.byDate[s._.startFormatted].push(s._.id);
      else {
        t.byDate[s._.startFormatted] || (t.byDate[s._.startFormatted] = []), t.byDate[s._.startFormatted].push(s._.id);
        const J = s._.startFormatted.substring(0, 4), ee = s._.startFormatted.substring(5, 7), te = s._.startFormatted.substring(8, 10);
        t.byYear[J] || (t.byYear[J] = {}), t.byYear[J][ee] || (t.byYear[J][ee] = {}), t.byYear[J][ee][te] || (t.byYear[J][ee][te] = []), t.byYear[J][ee][te].push(s._.id);
      }
    }
    return t;
  }), k = (t) => !t.start || !t.end ? (console.error("Vue Cal: Event is missing start or end date", t), !1) : (typeof t.start == "string" && (t.start = e.stringToDate(t.start)), typeof t.end == "string" && (t.end = e.stringToDate(t.end)), t.start.setSeconds(0, 0), t.end.getSeconds() === 59 ? t.end.setMinutes(t.end.getMinutes() + 1, 0, 0) : t.end.setSeconds(0, 0), isNaN(t.start) || isNaN(t.end) || t.end.getTime() < t.start.getTime() ? (isNaN(t.start) ? console.error(`Vue Cal: invalid start date for event "${t.title}".`, t.start) : isNaN(t.end) ? console.error(`Vue Cal: invalid end date for event "${t.title}".`, t.end) : console.error(`Vue Cal: invalid event dates for event "${t.title}". The event ends before it starts.`, t.start, t.end), !1) : !0), Y = (t) => {
    t._ || (t._ = {}), t._.id = t._.id || ++n, t._.multiday = !e.isSameDate(t.start, new Date(t.end.getTime() - 1)), t._.startFormatted = e.formatDate(t.start), t._.endFormatted = e.formatDate(t.end), t._.startMinutes = ~~e.dateToMinutes(t.start), t._.endMinutes = ~~e.dateToMinutes(t.end);
    const O = t.start.getHours(), S = t.start.getMinutes().toString().padStart(2, 0), $ = t.end.getHours(), M = t.end.getMinutes().toString().padStart(2, 0);
    t._.startTimeFormatted24 = `${O.toString().padStart(2, 0)}:${S}`, t._.startTimeFormatted12 = `${O % 12 || 12}${S ? `:${S}` : ""} ${O < 12 ? "AM" : "PM"}`, t._.endTimeFormatted24 = `${$.toString().padStart(2, 0)}:${M}`, t._.endTimeFormatted12 = `${$ % 12 || 12}${M ? `:${M}` : ""} ${$ < 12 ? "AM" : "PM"}`, t._.duration = Math.abs(~~((t.end - t.start) / 6e4)), t.delete || (t.delete = function(h) {
      return j(this._.id, h);
    }), t._.deleting === void 0 && (t._.deleting = !1), t._.deleted === void 0 && (t._.deleted = !1), t.isOverlapping || (t.isOverlapping = function(h = null) {
      return this.getOverlappingEvents(h).length;
    }), t.getOverlappingEvents || (t.getOverlappingEvents = function(h = null) {
      var u;
      const I = (h == null ? void 0 : h.start) || this.start, s = (h == null ? void 0 : h.end) || this.end, w = (h == null ? void 0 : h.schedule) !== void 0 && (h == null ? void 0 : h.schedule) !== null ? h.schedule : this.schedule, H = (u = o.schedules) != null && u.length ? w : null;
      return b(I, s, { excludeIds: [this._.id], schedule: H, exactTime: !0 });
    }), t._.register || (t._.register = (h) => {
      t._.$el = h, t._.fireCreated && (r.emit("event-created", t), delete t._.fireCreated);
    }), t._.unregister || (t._.unregister = () => {
      t._.$el = null, t._.register = null, t.isOverlapping = null, t.getOverlappingEvents = null, t.delete = null;
    });
  }, v = (t) => c.value.byId[t], p = (t) => {
    const O = [];
    for (const { start: S, end: $ } of t) {
      const M = b(S, $);
      M.length && O.push(...M);
    }
    return O;
  }, F = (t) => {
    var $;
    if (!t.start || !t.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    o.snapToInterval && (e.snapToInterval(t.start, o.snapToInterval), e.snapToInterval(t.end, o.snapToInterval)), t = { ...t };
    const O = typeof t.start == "string" ? e.stringToDate(t.start) : new Date(t.start), S = typeof t.end == "string" ? e.stringToDate(t.end) : new Date(t.end);
    if (!t.allDay && o.time && (($ = o.specialHoursDisallowed) != null && $.hasAny) && Ye({
      start: O,
      end: S,
      schedule: t.schedule,
      disallowed: o.specialHoursDisallowed,
      hasSchedules: !!(o.schedules && o.schedules.length)
    })) {
      console.warn("Vue Cal: Cannot create an event overlapping a time range where allowEvents is false.");
      return;
    }
    return t.start = O, t.end = S, t._ || (t._ = {}), t._.id = ++n, t._.fireCreated = !0, o.events.push(t), t;
  }, j = async (t, O = 0) => {
    var I, s;
    if (!t) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let S = typeof t == "string" || !isNaN(t) ? t : null;
    const $ = typeof t == "object" ? Object.entries(t) : null;
    if ($) {
      const [w, H] = $[0];
      S = (I = o.events.find((u) => u[w] === H)) == null ? void 0 : I._.id;
    }
    if (!o.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!S) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const M = o.events.findIndex((w) => w._.id === S);
    if (M === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${S}\`.`);
    const h = o.events[M];
    if (h.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${S}\` since it was explicitely set to \`delete: false\`.`);
    switch (O) {
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
  }, f = (t, O, S) => {
    const $ = o.allDayEvents ? { allDay: S } : {}, M = b(t, O, { background: !1, ...$ });
    if (!M.length) return { cellOverlaps: {}, longestStreak: 0 };
    const h = {};
    let I = [], s = 0;
    M.sort((w, H) => w.start - H.start || w.end - w.start - (H.end - H.start));
    for (const w of M) {
      const H = w._.id;
      h[H] || (h[H] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), I = I.filter((X) => X.end > w.start);
      const u = I.filter((X) => {
        var i;
        return (!((i = o.schedules) != null && i.length) || w.schedule === X.schedule) && X.start < w.end;
      }), J = new Set(u.map((X) => {
        var le;
        return ((le = h[X._.id]) == null ? void 0 : le.position) ?? 0;
      }));
      let ee = 0;
      for (; J.has(ee); ) ee++;
      h[H].position = ee, I.push(w);
      const te = Math.max(1, ...u.map((X) => {
        var le;
        return ((le = h[X._.id]) == null ? void 0 : le.maxConcurrent) ?? 1;
      }));
      h[H].maxConcurrent = Math.max(u.length + 1, te);
      for (const X of u)
        h[X._.id].overlaps.add(H), h[H].overlaps.add(X._.id), h[X._.id].maxConcurrent = h[H].maxConcurrent;
      s = Math.max(s, h[H].maxConcurrent);
    }
    for (const w in h) h[w].overlaps = [...h[w].overlaps];
    return { cellOverlaps: h, longestStreak: s };
  }, b = (t, O, { excludeIds: S = [], schedule: $ = null, background: M = !0, allDay: h = !1, exactTime: I = !1 } = {}) => {
    const { byId: s, byYear: w } = c.value, H = Object.keys(s).length;
    if (!H) return [];
    const u = t.getFullYear(), J = O.getFullYear(), ee = t.getMonth() + 1, te = O.getMonth() + 1, X = t.getDate(), le = O.getDate(), i = I ? t.getTime() : new Date(t).setHours(0, 0, 0, 0), z = I ? O.getTime() : new Date(O).setHours(23, 59, 59, 999), _ = new Set(S), ne = [];
    if (H <= 100) {
      for (const Q of Object.values(s))
        !Q || _.has(Q._.id) || $ !== null && $ !== Q.schedule || M === !1 && Q.background || o.allDayEvents && (h && !Q.allDay || !h && Q.allDay) || Q.start.getTime() < z && Q.end.getTime() > i && ne.push(Q);
      return ne;
    }
    for (let Q = u; Q <= J; Q++) {
      const me = `${Q}`, ce = w[me];
      if (!ce) continue;
      const Ve = Q === u ? ee : 1, $e = Q === J ? te : 12;
      for (let m = Ve; m <= $e; m++) {
        const P = String(m).padStart(2, "0"), A = ce[P];
        if (A)
          for (const q in A) {
            const x = +q;
            if (Q === u && m === ee && x < X || Q === J && m === te && x > le) continue;
            const L = A[q];
            if (L != null && L.length)
              for (let d = 0; d < L.length; d++) {
                const E = s[L[d]];
                !E || _.has(E._.id) || $ !== null && $ !== E.schedule || M === !1 && E.background || o.allDayEvents && (h && !E.allDay || !h && E.allDay) || E.start.getTime() < z && E.end.getTime() > i && ne.push(E);
              }
          }
      }
    }
    return ne;
  }, V = (t, O, S) => {
    const $ = t.allDay || !o.time, M = $ ? new Date(t.start).setHours(0, 0, 0, 0) : t.start.getTime(), h = $ ? new Date(t.end).setHours(23, 59, 59, 999) : t.end.getTime(), I = $ ? new Date(O).setHours(0, 0, 0, 0) : O.getTime(), s = $ ? new Date(S).setHours(23, 59, 59, 999) : S.getTime();
    return h > I && M < s;
  }, l = ke({
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
  }), D = (t, O) => {
    var I;
    const S = l[o.horizontal ? "movePercentageX" : "movePercentageY"];
    let $ = Se(S, o);
    if ($ = Math.max(0, Math.min($, 1440)), o.snapToInterval) {
      const s = $ + o.snapToInterval / 2;
      $ = s - s % o.snapToInterval;
    }
    let M = t.start, h = new Date(O.getTime() + $ * 6e4);
    return l.moveX && ((I = r.touch) != null && I.currentHoveredCell) && l.cellEl && new Date(parseInt(r.touch.currentHoveredCell.dataset.start)), h < l.resizeStartDate && (M = h, h = l.resizeStartDate), { newStart: M, newEnd: h };
  }, g = 4, a = (t, O) => {
    if (!l.cellEl) return;
    const { top: S, left: $, width: M, height: h } = l.cellEl.getBoundingClientRect();
    l.moveX = t - $, l.moveY = O - S, l.movePercentageX = l.moveX * 100 / M, l.movePercentageY = l.moveY * 100 / h, l.documentMouseX = t, l.documentMouseY = O;
  }, U = (t, O) => {
    var s, w;
    const S = new Date(t.start), $ = new Date(t.end);
    let { newStart: M, newEnd: h } = D(t, O);
    if (o.time && !t.allDay && ((s = o.specialHoursDisallowed) != null && s.hasAny)) {
      const H = Xt({
        proposedStart: M,
        proposedEnd: h,
        prevStart: S,
        prevEnd: $,
        schedule: t.schedule,
        disallowed: o.specialHoursDisallowed,
        hasSchedules: !!(o.schedules && o.schedules.length)
      });
      M = H.start, h = H.end;
    }
    const I = !o.time || t.allDay || !((w = o.specialHoursDisallowed) != null && w.hasAny) || !Ye({
      start: M,
      end: h,
      schedule: t.schedule,
      disallowed: o.specialHoursDisallowed,
      hasSchedules: !!(o.schedules && o.schedules.length)
    });
    return { newStart: M, newEnd: h, internalOk: I };
  }, y = async (t) => {
    var h, I, s, w;
    const { clientX: O, clientY: S } = ((h = t.touches) == null ? void 0 : h[0]) || t, $ = O - l.resizeAnchorClientX, M = S - l.resizeAnchorClientY;
    if (!l.resizeSlopExceeded) {
      if ($ * $ + M * M <= g) return;
      l.resizeSlopExceeded = !0;
    }
    if (a(O, S), l.fromResizer && !l.resizingOriginalEvent) {
      l.resizingOriginalEvent = { ...l.resizingEvent, _: { ...l.resizingEvent._ } };
      const H = ((I = o.eventListeners) == null ? void 0 : I.event) || {};
      (s = H["resize-start"]) == null || s.call(H, { e: t, event: l.resizingEvent });
    }
    if (l.fromResizer && l.resizingEvent) {
      const H = new Date(parseInt(l.cellEl.dataset.start)), { newStart: u, newEnd: J, internalOk: ee } = U(l.resizingEvent, H);
      let te = ee;
      const { resize: X } = ((w = o.eventListeners) == null ? void 0 : w.event) || {};
      ee && X && (te = await X({
        e: t,
        event: { ...l.resizingEvent, start: u, end: J },
        overlaps: l.resizingEvent.getOverlappingEvents({ start: u, end: J })
      })), te !== !1 ? (l.resizingEvent.start = u, l.resizingEvent.end = J, l.resizingLastAcceptedEvent && (l.resizingLastAcceptedEvent = null), t.preventDefault()) : X && (l.resizingLastAcceptedEvent = { ...l.resizingEvent, _: { ...l.resizingEvent._ } });
    }
  }, W = async (t) => {
    var O, S, $, M, h;
    if ((O = r.touch) != null && O.isResizingEvent && l.resizingEvent) {
      const { clientX: I, clientY: s } = ((S = t.changedTouches) == null ? void 0 : S[0]) || t;
      if (!l.resizeSlopExceeded)
        l.resizingEvent.start = new Date(l.resizeStartDate), l.resizingEvent.end = new Date(l.resizeBaselineEndMs);
      else {
        a(I, s);
        const w = new Date(parseInt(l.cellEl.dataset.start)), { newStart: H, newEnd: u, internalOk: J } = U(l.resizingEvent, w);
        let ee = J;
        const X = ((($ = o.eventListeners) == null ? void 0 : $.event) || {})["resize-end"];
        J && X && (ee = await X({
          e: t,
          event: l.resizingEvent,
          original: l.resizingOriginalEvent,
          // Original event details before resizing.
          overlaps: l.resizingEvent.getOverlappingEvents({ start: H, end: u })
        })), l.resizingEvent.start = ee === !1 ? (l.resizingLastAcceptedEvent || l.resizingOriginalEvent).start : ((M = l.resizingLastAcceptedEvent) == null ? void 0 : M.start) || H, l.resizingEvent.end = ee === !1 ? (l.resizingLastAcceptedEvent || l.resizingOriginalEvent).end : ((h = l.resizingLastAcceptedEvent) == null ? void 0 : h.end) || u, l.resizingEvent._.duration < 1 && l.resizingOriginalEvent && (l.resizingEvent.start = l.resizingOriginalEvent.start, l.resizingEvent.end = l.resizingOriginalEvent.end);
      }
      r.touch.isResizingEvent = !1, r.touch.currentHoveredCell = null;
    }
    document.removeEventListener(t.type === "touchend" ? "touchmove" : "mousemove", y, { passive: !l.fromResizer }), r.touch.isResizingEvent = !1, l.fromResizer = !1, l.resizingEvent = null, l.resizingOriginalEvent = null, l.resizingLastAcceptedEvent = null, l.startX = 0, l.startY = 0, l.moveX = 0, l.moveY = 0, l.startPercentageX = 0, l.startPercentageY = 0, l.movePercentageX = 0, l.movePercentageY = 0, l.documentMouseX = 0, l.documentMouseY = 0, l.cellEl = null, l.resizeStartDate = null, l.resizeBaselineEndMs = null, l.schedule = null, l.resizeAnchorClientX = 0, l.resizeAnchorClientY = 0, l.resizeSlopExceeded = !1;
  };
  return {
    events: c,
    resizeState: l,
    getEvent: v,
    getViewEvents: p,
    getCellOverlappingEvents: f,
    getEventsInRange: b,
    createEvent: F,
    deleteEvent: j,
    isEventInRange: V,
    handleEventResize: (t, O, S) => {
      var M;
      const $ = ((M = t.touches) == null ? void 0 : M[0]) || t;
      if (l.fromResizer = !!$.target.closest(".vuecal__event-resizer"), l.fromResizer) {
        r.touch.isResizingEvent = !0;
        const h = S.getBoundingClientRect();
        l.startX = $.clientX - h.left, l.startY = $.clientY - h.top, l.startPercentageX = l.startX * 100 / h.width, l.startPercentageY = l.startY * 100 / h.height, l.cellEl = S.closest(".vuecal__cell"), l.resizeStartDate = new Date(O.start.getTime()), l.resizeBaselineEndMs = O.end.getTime(), l.resizingEvent = O, l.resizeAnchorClientX = $.clientX, l.resizeAnchorClientY = $.clientY, l.resizeSlopExceeded = !1, document.addEventListener(t.type === "touchstart" ? "touchmove" : "mousemove", y, { passive: !l.fromResizer }), document.addEventListener(t.type === "touchstart" ? "touchend" : "mouseup", W, { once: !0 });
      }
    }
  };
}, Wt = ({ config: r, dateUtils: e, emit: o, texts: n, eventsManager: c }, k) => {
  const { availableViews: Y } = r, v = de(r.view && Y[r.view] ? r.view : r.defaultView), p = de(r.selectedDate || null), F = de(/* @__PURE__ */ new Date()), j = de(new Date(r.viewDate || F.value));
  j.value.setHours(0, 0, 0, 0);
  const f = de(new Date(j));
  let b = null;
  const V = C(() => v.value === "month" ? f.value : S.value), l = C(() => v.value === "month" ? new Date(f.value.getFullYear(), f.value.getMonth() + 1, 0, 23, 59, 59, 999) : M.value), D = C(() => v.value === "week" ? e.getPreviousFirstDayOfWeek(S.value, r.startWeekOnSunday) : v.value === "month" ? S.value : V.value), g = C(() => {
    if (v.value === "week") {
      const d = e.addDays(D.value, 7);
      return d.setMilliseconds(-1), d;
    }
    return v.value === "month" ? M.value : l.value;
  }), a = C(() => {
    const d = F.value.getTime();
    if (v.value === "week")
      return D.value.getTime() <= d && d <= g.value.getTime();
    const E = S.value.getTime(), B = M.value.getTime();
    return E <= d && d <= B;
  }), U = ke({
    show: C(() => {
      if (["day", "days", "week"].includes(v.value) && !(!a.value || !r.time || r.allDay) && !(r.timeFrom > e.dateToMinutes(F.value)) && !(e.dateToMinutes(F.value) > r.timeTo))
        return !0;
    }),
    nowInMinutes: C(() => e.dateToMinutes(F.value)),
    todaysTimePosition: C(() => Oe(U.nowInMinutes, r)),
    style: C(() => `${r.horizontal ? "left" : "top"}: ${U.todaysTimePosition}%`),
    currentTime: C(() => e.formatTime(F.value, r.twelveHour ? "h:mm {am}" : "HH:mm"))
  });
  function y() {
    F.value = /* @__PURE__ */ new Date(), b = setTimeout(y, 60 * 1e3);
  }
  function W() {
    b = setTimeout(y, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), y();
  }
  const se = C(() => {
    if (!r.availableViews[v.value]) return 1;
    let d = r.availableViews[v.value].cols;
    return r.hasHiddenDays && ["week", "month"].includes(v.value) && (d -= r.hasHiddenDays), d;
  }), t = C(() => {
    var d;
    return ((d = r.availableViews[v.value]) == null ? void 0 : d.rows) || 1;
  }), O = C(() => se.value * t.value), S = C(() => {
    if (v.value === "month") {
      let d = f.value.getDay() || 7;
      return r.startWeekOnSunday && !r.hideWeekdays[7] && (d += 1), r.viewDayOffset && (d -= r.viewDayOffset), e.subtractDays(f.value, d - 1);
    }
    if (v.value === "week") {
      const d = "1234567".split("").filter((B) => !Object.keys(r.hideWeekdays).includes(B));
      let E = Math.min(...d);
      return r.startWeekOnSunday && !r.hideWeekdays[7] && (E = 1), r.viewDayOffset && (E += r.viewDayOffset), e.addDays(f.value, E - 1);
    }
    return f.value;
  }), $ = C(() => {
    const d = [], E = ["days", "week", "month"].includes(v.value);
    let B = 0;
    for (let Z = 0; Z < O.value + B; Z++)
      switch (v.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const re = e.addDays(S.value, Z), je = re.getDay() || 7;
          if (E && r.hasHiddenDays && r.hideWeekdays[je]) {
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
  }), M = C(() => $.value[$.value.length - 1].end), h = de("right"), I = C(() => {
    const d = Object.keys(r.availableViews);
    return d[d.indexOf(v.value) + 1];
  }), s = C(() => {
    const d = Object.keys(r.availableViews);
    return d[d.indexOf(v.value) - 1];
  });
  function w(d, E, B = !1) {
    if (!E || !E[d]) return d + 1;
    const Z = E[d];
    return B && typeof Z == "string" ? Z.substring(0, 3) : Z;
  }
  function H(d, E, B) {
    const { monthsArray: Z, monthBeforeDay: re, canTruncate: je, xs: Me } = B, be = d.getMonth(), ze = d.getFullYear(), Ce = E.getMonth(), Fe = E.getFullYear(), Ie = be !== Ce, zt = ze !== Fe, Ee = je && (Me || Ie), Re = d.getDate(), Xe = E.getDate();
    return zt ? re ? `${w(be, Z, Ee)} ${Re}, ${ze} - ${w(Ce, Z, Ee)} ${Xe}, ${Fe}` : `${Re} ${w(be, Z, Ee)} ${ze} - ${Xe} ${w(Ce, Z, Ee)} ${Fe}` : Ie ? re ? `${w(be, Z, Ee)} ${Re} - ${w(Ce, Z, Ee)} ${Xe}, ${ze}` : `${Re} ${w(be, Z, Ee)} - ${Xe} ${w(Ce, Z, Ee)} ${ze}` : re ? `${w(be, Z, Ee)} ${Re}-${Xe}, ${ze}` : `${Re}-${Xe} ${w(be, Z, Ee)} ${ze}`;
  }
  const u = C(() => {
    const { dateFormat: d, months: E, monthsGenitive: B, week: Z, truncations: re } = n, je = r.locale, Me = re !== !1, be = d.indexOf("M") < d.indexOf("D"), ze = B && je === "el" ? B : E;
    switch (v.value) {
      case "day":
        return e.formatDate(S.value, d);
      case "days":
      case "week": {
        const Ce = {
          monthsArray: ze,
          monthBeforeDay: be,
          canTruncate: Me,
          xs: r.xs
        };
        let Fe = H(S.value, M.value, Ce);
        if (v.value === "week") {
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
        return e.formatDate(V.value, Ce);
      }
      case "year":
        return S.value.getFullYear();
      case "years":
        return `${S.value.getFullYear()} - ${l.value.getFullYear()}`;
    }
  });
  async function J() {
    switch (f.value = new Date(j.value || F.value), f.value.setHours(0, 0, 0, 0), v.value) {
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
        f.value = new Date(f.value.getFullYear() - f.value.getFullYear() % O.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    F.value = /* @__PURE__ */ new Date(), r.ready && (await qe(), o("view-change", {
      id: v.value,
      title: u.value,
      start: V.value,
      end: l.value,
      extendedStart: D.value,
      extendedEnd: g.value,
      cellDates: $.value,
      containsToday: a.value,
      events: q.value
    }));
  }
  function ee(d) {
    const E = v.value, B = r.availableViews[E];
    d[E] && JSON.stringify(d[E]) === JSON.stringify(B) || J();
  }
  function te(d, E = !0, B = null) {
    const Z = Object.keys(r.availableViews);
    v.value === d && !B || (Z.includes(d) ? (h.value = Z.indexOf(d) < Z.indexOf(v.value) ? "left" : "right", E && v.value !== d && o("update:view", d), v.value = d, B ? Q(B) : J()) : console.warn(`Vue Cal: the \`${d}\` view is not available.`));
  }
  function X() {
    I.value ? te(I.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function le() {
    s.value ? te(s.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function i() {
    _(!1);
  }
  function z() {
    _(!0);
  }
  function _(d = !0) {
    let E = new Date(j.value);
    switch (v.value) {
      case "day":
      case "days":
        d ? E = e.addDays(M.value, 1) : E = e.subtractDays(S.value, O.value);
        break;
      case "week": {
        d ? (E = e.addDays(S.value, 7), E.setHours(0, 0, 0, 0)) : E = e.subtractDays(D.value, O.value);
        break;
      }
      case "month": {
        const B = d ? 1 : -1;
        E = new Date(E.getFullYear(), E.getMonth() + B, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const B = d ? 1 : -1;
        E = new Date(E.getFullYear() + B, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const B = d ? O.value : -O.value;
        E = new Date(E.getFullYear() + B, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    Q(E);
  }
  function ne() {
    const d = /* @__PURE__ */ new Date();
    d.setHours(0, 0, 0, 0), Q(d);
  }
  function Q(d, E = !0, B = !1) {
    if (!e.isValid(d)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [Z, re] = [S.value, M.value];
    v.value === "month" && ([Z, re] = [V.value, l.value]), d.setHours(0, 0, 0, 0), j.value = d, E && o("update:viewDate", d), (!e.isInRange(d, Z, re) || B) && (h.value = d.getTime() < Z.getTime() ? "left" : "right", J());
  }
  function me(d, E = !0) {
    if (!e.isValid(d)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: B, isSameDate: Z } = e;
    (!p.value || !B(p.value) || !Z(d, p.value)) && (d.setHours(0, 0, 0, 0), p.value = d, E && o("update:selectedDate", d));
  }
  function ce(d) {
    !d && !f.value.getDay() ? Q(e.addDays(f.value, 1), !0, !0) : (h.value = "left", J());
  }
  function Ve(d) {
    d && r.startWeekOnSunday && !f.value.getDay() ? Q(e.addDays(f.value, 1), !0, !0) : !d && r.startWeekOnSunday && f.value.getDay() === 1 && Q(e.subtractDays(f.value, 1), !0, !0);
  }
  function $e() {
    J();
  }
  function m(d) {
    var re;
    const E = (re = k.value) == null ? void 0 : re.querySelector(".vuecal__scrollable"), B = d - r.timeFrom, Z = B > 0 ? B * r.timeCellHeight / r.timeStep : 0;
    E == null || E.scrollTo({ top: Z, behavior: "smooth" });
  }
  function P() {
    const d = /* @__PURE__ */ new Date();
    m(d.getHours() * 60 + d.getMinutes());
  }
  function A() {
    m(0);
  }
  const q = C(() => c.getViewEvents($.value)), x = c.createEvent, L = c.deleteEvent;
  return De(() => r.view, (d) => te(d, !1)), De(() => r.availableViews, ee), De(() => r.datePicker, () => te("month")), De(() => r.viewDate, (d) => Q(d, !1)), De(() => r.selectedDate, (d) => me(d, !1)), De(() => r.startWeekOnSunday, (d) => ce(d)), De(() => r.hideWeekends, (d) => Ve(d)), De(() => r.hideWeekdays, $e), De(() => O.value, () => {
    O.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), De(() => r.watchRealTime, (d) => {
    d && r.time ? W() : b = clearTimeout(b);
  }), J(), r.time && r.watchRealTime && W(), We(() => b = clearTimeout(b)), {
    now: F,
    id: v,
    broaderView: I,
    narrowerView: s,
    title: u,
    viewDate: j,
    start: V,
    end: l,
    extendedStart: D,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: g,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: S,
    lastCellDate: M,
    containsToday: a,
    nowLine: U,
    selectedDate: p,
    cellDates: $,
    cols: se,
    rows: t,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: q,
    transitionDirection: h,
    switch: (d, E) => te(d, !0, E),
    broader: X,
    narrower: le,
    previous: i,
    next: z,
    navigate: _,
    goToToday: ne,
    updateViewDate: Q,
    updateSelectedDate: me,
    scrollToCurrentTime: P,
    scrollToTime: m,
    scrollTop: A,
    createEvent: x,
    deleteEvent: L,
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
}, ft = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], mt = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ht = "Years", gt = "Year", yt = "Month", Dt = "Week", pt = "Days", wt = "Day", bt = "Today", _t = "No Event", Tt = "All-day", kt = "Delete", $t = "Create an event", Mt = "dddd, MMMM D, YYYY", Et = "am", St = "pm", at = {
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
  allDay: Tt,
  deleteEvent: kt,
  createEvent: $t,
  dateFormat: Mt,
  am: Et,
  pm: St
}, It = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allDay: Tt,
  am: Et,
  createEvent: $t,
  dateFormat: Mt,
  day: wt,
  days: pt,
  default: at,
  deleteEvent: kt,
  month: yt,
  months: mt,
  noEvent: _t,
  pm: St,
  today: bt,
  week: Dt,
  weekDays: ft,
  year: gt,
  years: ht
}, Symbol.toStringTag, { value: "Module" })), Be = ke({
  texts: { ...ge.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: vt(ge.texts, at)
  // Some Date utils functions need localized texts.
}), Gt = ({ props: r, emit: e, attrs: o, vuecalEl: n, uid: c }) => {
  const k = ke({
    uid: c,
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
  return k.dateUtils = vt(Object.assign(ge.texts, k.texts), at), k.config = Ft(k, r, o), k.eventsManager = Nt(k), k.view = Wt(k, n), k.dnd = Bt(k), k;
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
    const e = Le("vuecal"), { view: o, config: n } = e, c = () => {
      n.clickToNavigate && o.broader();
    }, k = C(() => n.clickToNavigate ? { click: c } : {});
    return (Y, v) => (R(), G("div", Zt, [
      N(Y.$slots, "header", {
        view: T(o),
        availableViews: T(n).availableViews,
        vuecal: T(e)
      }),
      Y.$slots.header ? ae("", !0) : (R(), G(fe, { key: 0 }, [
        T(n).viewsBar ? (R(), G("div", Ut, [
          (R(!0), G(fe, null, we(T(n).availableViews, (p, F) => (R(), G("button", {
            class: ye(["vuecal__view-button", { "vuecal__view-button--active": T(o).id === F }]),
            onClick: (j) => T(o).switch(F),
            innerHTML: T(e).texts[F],
            type: "button"
          }, null, 10, Kt))), 256))
        ])) : ae("", !0),
        T(n).titleBar ? (R(), G("nav", Qt, [
          he("button", {
            class: ye(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !Y.$slots["previous-button"] }]),
            onClick: v[0] || (v[0] = (...p) => T(o).previous && T(o).previous(...p)),
            type: "button"
          }, [
            N(Y.$slots, "previous-button")
          ], 2),
          he("div", xt, [
            Pe(Ue, {
              name: `vuecal-slide-fade--${T(o).transitionDirection}`
            }, {
              default: K(() => [
                (R(), G("div", {
                  key: T(o).id + T(o).start.getTime()
                }, [
                  Y.$slots.title || Y.$slots[`title.${T(o).id}`] ? (R(), He(st(T(n).clickToNavigate && T(o).broaderView ? "button" : "div"), ue({
                    key: 0,
                    class: "vuecal__title"
                  }, Je(k.value)), {
                    default: K(() => [
                      Y.$slots[`title.${T(o).id}`] ? N(Y.$slots, `title.${T(o).id}`, oe(ue({ key: 0 }, T(o)))) : N(Y.$slots, "title", oe(ue({ key: 1 }, T(o))))
                    ]),
                    _: 3
                  }, 16)) : (R(), He(st(T(n).clickToNavigate && T(o).broaderView ? "button" : "div"), ue({
                    key: 1,
                    class: "vuecal__title"
                  }, Je(k.value), {
                    innerHTML: T(o).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          T(n).todayButton ? (R(), G(fe, { key: 0 }, [
            Y.$slots["today-button"] ? N(Y.$slots, "today-button", {
              key: 0,
              navigate: () => !T(o).containsToday && T(o).goToToday(),
              active: T(o).containsToday
            }) : (R(), G("button", {
              key: 1,
              class: ye(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": T(o).containsToday }]),
              onClick: v[1] || (v[1] = (p) => !T(o).containsToday && T(o).goToToday()),
              disabled: !!T(o).containsToday,
              type: "button",
              innerHTML: T(e).texts.today
            }, null, 10, en))
          ], 64)) : ae("", !0),
          he("button", {
            class: ye(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !Y.$slots["next-button"] }]),
            onClick: v[2] || (v[2] = (...p) => T(o).next && T(o).next(...p)),
            type: "button"
          }, [
            N(Y.$slots, "next-button")
          ], 2)
        ])) : ae("", !0)
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
    const o = r, { config: n, view: c, dnd: k, touch: Y, dateUtils: v, eventsManager: p } = Le("vuecal"), { handleEventResize: F } = p, j = de(null), f = ke(o.event);
    let b = null;
    const V = ke({
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
    }), l = C(() => n.editableEvents.drag && f.draggable !== !1 && !f.background && V.canTouchAndDrag !== !1), D = C(() => c.isMonth || c.isYear || c.isYears || o.inAllDayBar || f._.multiday && !U.value ? !1 : n.time && n.editableEvents.resize && f.resizable !== !1 && !f.background);
    C(() => n.editableEvents.delete && f.deletable !== !1 && !f.background);
    const g = C(() => {
      var s, w, H, u, J;
      const $ = !!((s = f._) != null && s.multiday), M = n.horizontal, h = !o.inAllDayBar && (((w = f._) == null ? void 0 : w.startMinutes) < n.timeFrom || $ && !a.value), I = !o.inAllDayBar && (((H = f._) == null ? void 0 : H.endMinutes) > n.timeTo || $ && !U.value);
      return {
        [`vuecal__event--${f._.id}`]: !0,
        [f.class]: !!f.class,
        "vuecal__event--recurring": !!f.recurring,
        "vuecal__event--background": !!f.background,
        "vuecal__event--all-day": f.allDay || ((u = f._) == null ? void 0 : u.startMinutes) === 0 && ((J = f._) == null ? void 0 : J.duration) === 1440,
        "vuecal__event--multiday": $,
        // In horizontal mode, cut-top becomes cut-left and cut-bottom becomes cut-right.
        "vuecal__event--cut-top": !M && h,
        "vuecal__event--cut-bottom": !M && I,
        "vuecal__event--cut-left": M && h,
        "vuecal__event--cut-right": M && I,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !f._.draggingGhost && f._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": f._.draggingGhost,
        "vuecal__event--resizing": Y.isResizingEvent
      };
    }), a = C(() => f._.multiday ? new Date(f.start).setHours(0, 0, 0, 0) === o.cellStart.getTime() : !0), U = C(() => f._.multiday ? v.isSameDate(new Date(new Date(f.end).setMilliseconds(-1)), o.cellEnd) : !0), y = C(() => {
      const $ = new Date(f.start).setHours(0, 0, 0, 0), M = new Date(f.end).setHours(0, 0, 0, 0);
      return Math.ceil((M - $) / (1e3 * 60 * 60 * 24));
    }), W = C(() => {
      const $ = (c.isDay || c.isDays || c.isWeek) && n.time && !o.inAllDayBar, M = n.horizontal;
      if (!$ && !f.backgroundColor && !f.color) return !1;
      const h = {
        backgroundColor: f.backgroundColor || null,
        color: f.color || null
      };
      if ($) {
        let I = f._.startMinutes, s = f._.endMinutes;
        f._.multiday && (a.value || (I = 0), U.value || (s = 1440));
        const w = Math.max(n.timeFrom, I), H = Math.min(n.timeTo, s) + (f._.duration && !s ? 1440 : 0), u = Oe(w, n), J = Oe(H, n) - u;
        h[M ? "left" : "top"] = `${u}%`, h[M ? "width" : "height"] = `${J}%`;
      }
      return h;
    }), se = C(() => {
      const $ = { ...n.eventListeners.event };
      for (const [h, I] of Object.entries($))
        ["resize-end"].includes(h) || ($[h] = (s) => {
          s.type !== "drop" && I(s.type ? { e: s, event: f } : s);
        });
      const M = { ...$ };
      return $.touchstart = (h) => {
        var I;
        h.stopPropagation(), V.touchAndDragTimer = setTimeout(() => {
          V.canTouchAndDrag = !0;
        }, 500), S(h), (I = M.touchstart) == null || I.call(M, { e: h, event: f });
      }, $.mousedown = (h) => {
        var I;
        h.stopPropagation(), S(h), (I = M.mousedown) == null || I.call(M, { e: h, event: f });
      }, $.click = (h) => {
        var I;
        (I = M.click) == null || I.call(M, { e: h, event: f }), b ? b = clearTimeout(b) : b = setTimeout(() => {
          var s;
          b = null, (s = M["delayed-click"]) == null || s.call(M, { e: h, event: f });
        }, 400);
      }, $.dblclick = (h) => {
        M.dblclick ? M.dblclick({ e: h, event: f }) : f.delete(1);
      }, $;
    });
    let t = null, O = 0;
    const S = ($) => {
      var s, w, H, u;
      const M = ((s = $.touches) == null ? void 0 : s[0]) || $;
      V.fromResizer = (w = M.target) == null ? void 0 : w.closest(".vuecal__event-resizer");
      const h = Date.now();
      (!t || h - O > vn) && (t = j.value.getBoundingClientRect(), O = h);
      const I = t;
      V.startX = (((H = $.touches) == null ? void 0 : H[0]) || $).clientX - I.left, V.startY = (((u = $.touches) == null ? void 0 : u[0]) || $).clientY - I.top, V.startPercentageX = V.startX * 100 / I.width, V.startPercentageY = V.startY * 100 / I.height, V.cellEl = j.value.closest(".vuecal__cell"), V.resizeStartDate = f.start, V.fromResizer && F($, f, j.value), V.holdTimer = setTimeout(() => {
        var J, ee;
        V.holding = !0, (ee = (J = se.value).hold) == null || ee.call(J, { e: $, event: f });
      }, 1e3);
    };
    return tt(() => f._.register(j.value)), We(() => {
      V.holdTimer && (V.holdTimer = clearTimeout(V.holdTimer)), V.touchAndDragTimer && (V.touchAndDragTimer = clearTimeout(V.touchAndDragTimer)), b && (b = clearTimeout(b)), f._.unregister();
    }), ($, M) => (R(), G("div", ue({ class: "vuecal__event" }, Je(se.value, !0), {
      ref_key: "eventEl",
      ref: j,
      class: g.value,
      style: W.value,
      draggable: l.value ? "true" : void 0,
      onDragstart: M[2] || (M[2] = (h) => l.value && T(k).eventDragStart(h, f)),
      onDragend: M[3] || (M[3] = (h) => l.value && T(k).eventDragEnd(h, f))
    }), [
      he("div", an, [
        $.$slots["event.all-day"] ? N($.$slots, "event.all-day", {
          key: 0,
          event: f
        }) : $.$slots[`event.${T(c).id}`] ? N($.$slots, `event.${T(c).id}`, {
          key: 1,
          event: f
        }) : N($.$slots, "event", {
          key: 2,
          event: f
        }, () => [
          he("div", sn, ve(f.title), 1),
          T(n).time && !r.inAllDayBar && !(f._.multiday && !a.value) ? (R(), G("div", ln, [
            T(c).isMonth ? (R(), G("span", rn, ",")) : ae("", !0),
            he("span", on, ve(f._[`startTimeFormatted${T(n).twelveHour ? 12 : 24}`]), 1),
            T(c).isMonth ? ae("", !0) : (R(), G("span", un, [
              Ze(" - " + ve(f._[`endTimeFormatted${T(n).twelveHour ? 12 : 24}`]), 1),
              f._.multiday && a.value ? (R(), G("span", cn, "+" + ve(y.value) + "d", 1)) : ae("", !0)
            ]))
          ])) : ae("", !0),
          r.inAllDayBar ? ae("", !0) : (R(), G("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: f.content
          }, null, 8, dn))
        ])
      ]),
      D.value ? (R(), G("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: M[0] || (M[0] = lt(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : ae("", !0),
      Pe(Ue, { name: "vuecal-delete-btn" }, {
        default: K(() => [
          f._.deleting ? (R(), G("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: M[1] || (M[1] = lt((h) => f.delete(3), ["stop"]))
          }, "Delete")) : ae("", !0)
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
}, Tn = {
  key: 5,
  class: "vuecal__cell-events-count"
}, kn = ["title"], Yt = {
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
    const e = r, o = Le("vuecal"), { view: n, config: c, dateUtils: k, eventsManager: Y, dnd: v, touch: p } = o, F = C(() => k.isToday(e.start)), j = de(null), f = de([]), b = de(!1), V = (m) => {
      f.value.push(m.detail), b.value = !0;
    }, l = () => setTimeout(() => b.value = !1, 300), D = ke({
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
      const m = c.horizontal, P = m ? D.startPercentageX : D.startPercentageY, A = m ? D.movePercentageX : D.movePercentageY, q = Se(P, c), x = Se(A, c);
      let L = Math.min(P, A), d = Math.max(P, A), E = Se(L, c), B = Se(d, c);
      if (c.snapToInterval && (E = k.snapToInterval(E, c.snapToInterval), B = k.snapToInterval(B, c.snapToInterval), L = Oe(E, c), d = Oe(B, c)), c.time && ((Z = c.specialHoursDisallowed) != null && Z.hasAny) && !e.allDay) {
        const re = Rt({
          anchorDayMinutes: q,
          cursorDayMinutes: x,
          snappedLow: E,
          snappedHigh: B,
          cellDate: e.start,
          schedule: D.schedule,
          disallowed: c.specialHoursDisallowed,
          hasSchedules: !!(c.schedules && c.schedules.length)
        });
        E = re.low, B = re.high, L = Oe(E, c), d = Oe(B, c);
      }
      return {
        style: {
          [m ? "left" : "top"]: `${L}%`,
          [m ? "width" : "height"]: `${Math.abs(d - L)}%`
        },
        startMinutes: E,
        endMinutes: B,
        start: k.formatMinutes(E),
        end: k.formatMinutes(B),
        ...D.schedule != null ? { schedule: D.schedule } : {}
      };
    }), W = C(() => {
      const m = c.editableEvents.create && (D.dragging || g.value), P = c.eventCreateMinDrag && D.thresholdPassed || !c.eventCreateMinDrag, A = D.canTouchAndDrag !== !1;
      return m && P && A;
    }), se = C(() => {
      var d;
      const m = /* @__PURE__ */ new Date(), P = n.start.getFullYear(), A = n.start.getMonth(), q = e.start.getFullYear(), x = e.start.getMonth();
      return {
        [`vuecal__cell--${Ne[e.start.getDay()]}`]: n.isDay || n.isDays || n.isWeek || n.isMonth,
        [`vuecal__cell--${At[x]}`]: n.isYear,
        [`vuecal__cell--${q}`]: n.isYears,
        "vuecal__cell--today": F.value,
        "vuecal__cell--current-month": n.isYear && q === m.getFullYear() && x === m.getMonth(),
        "vuecal__cell--current-year": n.isYears && q === m.getFullYear(),
        "vuecal__cell--out-of-range": n.isMonth && (q !== P || x !== A),
        "vuecal__cell--before-min": ee.value && u.value,
        "vuecal__cell--after-max": ee.value && J.value,
        "vuecal__cell--disabled": ee.value,
        "vuecal__cell--selected": n.selectedDate && n.selectedDate.getTime() >= e.start.getTime() && n.selectedDate.getTime() <= e.end.getTime(),
        "vuecal__cell--has-schedules": (d = c.schedules) == null ? void 0 : d.length,
        "vuecal__cell--dragging": D.dragging,
        "vuecal__cell--has-events": O.value.length
      };
    });
    C(() => k.formatDate(e.start));
    const t = C(() => {
      switch (n.id) {
        case "day":
          return "";
        case "days":
          return c.availableViews.days.rows > 1 && k.formatDate(e.start, "D"), "";
        case "week":
          return "";
        case "month":
          return k.formatDate(e.start, "D");
        case "year":
          return k.formatDate(e.start, c.xs ? "MMM" : "MMMM");
        case "years":
          return k.formatDate(e.start, "YYYY");
      }
    }), O = C(() => c.datePicker ? [] : Y.getEventsInRange(
      e.start,
      e.end,
      { excludeIds: f.value, ...c.allDayEvents ? { allDay: e.allDay } : {} }
    )), S = C(() => O.value.filter((m) => !m.background)), $ = C(() => {
      var m;
      return (m = c.schedules) == null ? void 0 : m.reduce((P, A) => (P[A.id] = O.value.filter((q) => q.schedule === A.id), P), {});
    }), M = C(() => {
      if (n.isMonth || n.isYear || n.isYears || e.allDay || !c.time) return {};
      const m = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", P = c.horizontal, A = {};
      for (const q of O.value) {
        const x = q._.id, { maxConcurrent: L = 1, position: d = 0 } = U.value.cellOverlaps[x] || {}, E = m ? "right" : "left", B = P ? "height" : "width";
        A[x] = { [P ? "top" : E]: `${100 / L * d}%` }, c.stackEvents ? A[x][B] = `${100 / L + (d === L - 1 ? 0 : 15)}%` : A[x][B] = `${100 / L}%`;
      }
      return A;
    }), h = C(() => {
      const m = {};
      for (const P of O.value) {
        const A = P._.id, { maxConcurrent: q = 1, position: x = 0 } = U.value.cellOverlaps[A] || {};
        m[A] = `vuecal__event--stack-${x + 1}-${q}`;
      }
      return m;
    }), I = C(() => c.showCellEventCount && S.value.length), s = (m) => {
      const P = m || [], A = c.horizontal, { timeFrom: q, timeTo: x } = c, L = [];
      for (let d = 0; d < P.length; d++) {
        const E = P[d];
        let { from: B, to: Z, class: re, label: je } = E;
        if (isNaN(B) || isNaN(Z) || q >= Z || x <= B) continue;
        B = Math.max(q, B), Z = Math.min(x, Z);
        const Me = Oe(B, c), be = Oe(Z, c) - Me;
        L.push({
          style: {
            [A ? "left" : "top"]: `${Me}%`,
            [A ? "width" : "height"]: `${be}%`
          },
          label: je,
          class: re
        });
      }
      return L;
    }, w = C(() => {
      var A;
      if (!c.specialHours || n.isMonth || n.isYear || n.isYears || e.allDay) return;
      const m = Ne[e.start.getDay()];
      let P = (A = c.specialHours) == null ? void 0 : A[m];
      if (P)
        return {
          default: s(P.default),
          schedules: Object.entries(P.schedules || {}).reduce((q, [x, L]) => (q[x] = s(L), q), {})
        };
    }), H = C(() => {
      const m = c.schedules;
      if (!(m != null && m.length)) return [];
      const P = w.value;
      if (!P) return m.map((x) => ({ schedule: x, ranges: [] }));
      const { default: A, schedules: q } = P;
      return m.map((x) => {
        const L = String(x.id), d = Object.prototype.hasOwnProperty.call(q, L) ? q[L] : A;
        return { schedule: x, ranges: d };
      });
    }), u = C(() => c.minTimestamp !== null && c.minTimestamp > e.end.getTime()), J = C(() => c.maxTimestamp && c.maxTimestamp < e.start.getTime()), ee = C(() => {
      const { disableDays: m } = c, P = n.isYear || n.isYears;
      return m.length && m.includes(k.formatDate(e.start)) && !P ? !0 : u.value || J.value;
    }), te = C(() => {
      if (ee.value) return {};
      const m = { ...c.eventListeners.cell };
      for (const [A, q] of Object.entries(m))
        m[A] = (x) => {
          var L, d, E;
          (E = (d = x.target || ((L = x.e) == null ? void 0 : L.target)).closest) != null && E.call(d, ".vuecal__event") || q(x.type ? { e: x, cell: X.value, cursor: z.value, view: n } : x);
        };
      const P = { ...m };
      return m.click = (A) => {
        var x;
        _();
        const q = i(A);
        (x = P.click) == null || x.call(P, { e: A, cell: X.value, cursor: q, view: n }), a ? a = clearTimeout(a) : a = setTimeout(() => {
          var L;
          a = null, (L = P["delayed-click"]) == null || L.call(P, { e: A, cell: X.value, cursor: q, view: n });
        }, 400);
      }, (c.time && n.isDay || n.isDays || n.isWeek) && (m.touchstart = (A) => {
        var q;
        ne(A.e || A), (q = P.touchstart) == null || q.call(P, { e: A, cell: X.value, cursor: z.value, view: n });
      }, m.mousedown = (A) => {
        var q;
        ne(A.e || A), (q = P.mousedown) == null || q.call(P, { e: A, cell: X.value, cursor: z.value, view: n });
      }), P.dblclick && (m.dblclick = (A) => {
        var q;
        (q = P.dblclick) == null || q.call(P, { e: A, cell: X.value, cursor: i(A), view: n });
      }), c.editableEvents.drag && (m.dragenter = (A) => v.cellDragEnter(A, X.value), m.dragover = (A) => {
        A.preventDefault(), v.cellDragOver(A, X.value);
      }, m.dragleave = (A) => v.cellDragLeave(A, X.value), m.drop = (A) => v.cellDragDrop(A, X.value, e.allDay)), m;
    }), X = C(() => ({
      start: e.start,
      end: e.end,
      events: O,
      ...D.schedule !== null ? { schedule: D.schedule } : {},
      goNarrower: () => n.narrower(),
      goBroader: () => n.broader(),
      broader: n.broaderView,
      narrower: n.narrowerView
    })), le = (m) => $.value[m.id] || [], i = (m) => {
      var B;
      const P = c.horizontal, { clientX: A, clientY: q } = ((B = m.touches) == null ? void 0 : B[0]) || m, { top: x, left: L } = j.value.getBoundingClientRect(), d = P ? (A - L) * 100 / j.value.clientWidth : nt(q - x, j.value), E = new Date(e.start);
      return E.setMinutes(Se(d, c)), { [P ? "x" : "y"]: d, date: E };
    }, z = C(() => {
      const P = c.horizontal ? D.movePercentageX || D.startPercentageX : D.movePercentageY || D.startPercentageY, A = Se(P, c), q = new Date(e.start);
      return q.setMinutes(A), {
        x: D.movePercentageX || D.startPercentageX,
        y: D.movePercentageY || D.startPercentageY,
        date: q
      };
    }), _ = () => {
      n.updateSelectedDate(e.start), c.clickToNavigate && ((n.isMonth || n.isDays || n.isWeek) && c.availableViews.day ? n.switch("day") : n.isYear && c.availableViews.month ? n.switch("month") : n.isYears && c.availableViews.year && n.switch("year")), n.updateViewDate(e.start);
    }, ne = (m) => {
      var x, L, d, E, B;
      const P = m.type === "touchstart";
      P ? (D.canTouchAndDrag = !1, D.touchAndDragTimer = setTimeout(() => {
        D.canTouchAndDrag = !0, (D.holding || D.dragging) && m.preventDefault();
      }, 500)) : D.canTouchAndDrag = !0;
      const A = (L = (x = m.target.closest("[data-schedule]")) == null ? void 0 : x.dataset) == null ? void 0 : L.schedule;
      if (A !== void 0 && ((d = c.schedules) != null && d.length)) {
        const Z = c.schedules.find((re) => String(re.id) === String(A));
        D.schedule = Z ? Z.id : A;
      } else D.schedule = null;
      const q = j.value.getBoundingClientRect();
      D.startX = (((E = m.touches) == null ? void 0 : E[0]) || m).clientX - q.left, D.startY = (((B = m.touches) == null ? void 0 : B[0]) || m).clientY - q.top, D.startPercentageX = D.startX * 100 / q.width, D.startPercentageY = D.startY * 100 / q.height, D.thresholdPassed = !1, document.addEventListener(P ? "touchmove" : "mousemove", Q, { passive: !P }), document.addEventListener(P ? "touchend" : "mouseup", me, { once: !0 }), D.holdTimer = setTimeout(() => {
        var Z, re;
        D.holding = !0, (re = (Z = te.value).hold) == null || re.call(Z, { e: m, cell: X.value, cursor: z.value, view: n });
      }, 1e3);
    }, Q = (m) => {
      var L, d, E, B, Z, re;
      const P = m.type === "touchmove", A = c.horizontal;
      if (P && !D.canTouchAndDrag) {
        D.touchAndDragTimer && (clearTimeout(D.touchAndDragTimer), D.touchAndDragTimer = null), me(m);
        return;
      }
      P && m.preventDefault(), D.dragging || (p.isDraggingCell = !0, (d = (L = te.value)["drag-start"]) == null || d.call(L, { e: m, cell: X.value, cursor: z.value, view: n })), D.dragging = !0, D.holdTimer = clearTimeout(D.holdTimer), D.holding = !1;
      const q = j.value.getBoundingClientRect();
      D.moveX = (((E = m.touches) == null ? void 0 : E[0]) || m).clientX - q.left, D.moveY = (((B = m.touches) == null ? void 0 : B[0]) || m).clientY - q.top, D.movePercentageX = D.moveX * 100 / q.width, D.movePercentageY = D.moveY * 100 / q.height;
      const x = Math.abs(A ? D.startX - D.moveX : D.startY - D.moveY);
      c.eventCreateMinDrag && x > c.eventCreateMinDrag && (D.thresholdPassed = !0), (re = (Z = te.value).drag) == null || re.call(Z, { e: m, cell: X.value, cursor: z.value, view: n });
    }, me = async (m) => {
      var A, q;
      const P = m.type === "touchend";
      document.removeEventListener(P ? "touchmove" : "mousemove", Q, { passive: !1 }), D.touchAndDragTimer && (clearTimeout(D.touchAndDragTimer), D.touchAndDragTimer = null), D.dragging && ((q = (A = te.value)["drag-end"]) == null || q.call(A, { e: m, cell: X.value, cursor: z.value, view: n }), p.isDraggingCell = !1, c.editableEvents.create && D.canTouchAndDrag && (g.value = !0, await ce(m), g.value = !1)), D.holdTimer = clearTimeout(D.holdTimer), D.holding = !1, D.dragging = !1, D.startX = 0, D.startY = 0, D.moveX = 0, D.moveY = 0, D.startPercentageX = 0, D.startPercentageY = 0, D.movePercentageX = 0, D.movePercentageY = 0, D.thresholdPassed = !1, D.schedule = null, D.canTouchAndDrag = null;
    }, ce = async (m) => {
      var E;
      if (!W.value) return;
      let { start: P, end: A, startMinutes: q, endMinutes: x } = y.value;
      P = new Date(e.start), P.setMinutes(q), A = new Date(e.start), A.setMinutes(x);
      let L = { ...y.value, start: P, end: A };
      const { create: d } = c.eventListeners.event;
      if (typeof d == "function") {
        const B = L;
        L = await new Promise((Z) => d({ e: m, event: L, cell: X.value, resolve: Z, cursor: z.value, view: n })), L && typeof L == "object" && n.createEvent(L), L && typeof L == "boolean" && n.createEvent(B);
      } else n.createEvent(L);
      (E = navigator.vibrate) == null || E.call(navigator, 200);
    }, Ve = () => {
      var m;
      for (const P of Object.keys(te.value))
        (m = j.value) == null || m.removeEventListener(P, te.value[P]);
    }, $e = () => {
      U.value = Y.getCellOverlappingEvents(e.start, e.end, e.allDay);
    };
    return De(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !n.isYears && !n.isYear && S.value.map((m) => `${m._.id}${m.start.getTime()}${m.end.getTime()}`).join(),
      async () => {
        await qe(), $e();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), We(async () => {
      for (const m of f.value) Y.deleteEvent(m, 3);
      Ve(), a && (a = clearTimeout(a)), await qe();
    }), (m, P) => {
      var A, q, x;
      return R(), G("div", ue({
        class: "vuecal__cell",
        ref_key: "cellEl",
        ref: j
      }, Je(te.value, !0), {
        "data-start": e.start.getTime(),
        class: se.value
      }), [
        m.$slots.cell ? N(m.$slots, "cell", {
          key: 0,
          cell: X.value
        }) : ae("", !0),
        (q = (A = w.value) == null ? void 0 : A.default) != null && q.length && !((x = T(c).schedules) != null && x.length) ? (R(!0), G(fe, { key: 1 }, we(w.value.default, (L, d) => (R(), G("div", {
          class: ye(["vuecal__special-hours", L.class]),
          style: pe(L.style),
          innerHTML: L.label || ""
        }, null, 14, mn))), 256)) : ae("", !0),
        !m.$slots.cell && T(c).schedules ? (R(!0), G(fe, { key: 2 }, we(H.value, ({ schedule: L, ranges: d }) => (R(), G("div", {
          class: ye(["vuecal__schedule vuecal__schedule--cell", L.class]),
          key: L.id,
          style: pe(L.style || null),
          "data-schedule": L.id
        }, [
          d.length ? (R(!0), G(fe, { key: 0 }, we(d, (E, B) => (R(), G("div", {
            class: ye(["vuecal__special-hours", E.class]),
            key: `${L.id}-${B}`,
            style: pe(E.style),
            innerHTML: E.label || ""
          }, null, 14, gn))), 128)) : ae("", !0),
          t.value || m.$slots["cell-date"] ? (R(), G("div", yn, [
            N(m.$slots, "cell-date", {
              cell: X.value,
              view: T(n),
              schedule: L,
              events: le(L)
            }, () => [
              Ze(ve(t.value), 1)
            ])
          ])) : ae("", !0),
          m.$slots["cell-content"] ? (R(), G("div", Dn, [
            N(m.$slots, "cell-content", {
              cell: X.value,
              view: T(n),
              schedule: L,
              events: le(L)
            })
          ])) : ae("", !0),
          m.$slots["cell-events"] ? (R(), G("div", pn, [
            N(m.$slots, "cell-events", {
              cell: X.value,
              view: T(n),
              schedule: L,
              events: le(L)
            })
          ])) : O.value.length || b.value ? (R(), He(rt, {
            key: 4,
            class: "vuecal__cell-events",
            name: "vuecal-event-delete",
            onBeforeLeave: P[0] || (P[0] = (E) => b.value = !0),
            onAfterLeave: l,
            tag: "div"
          }, {
            default: K(() => [
              (R(!0), G(fe, null, we($.value[L.id], (E) => (R(), He(ut, {
                key: E._.id,
                event: E,
                onEventDeleted: V,
                "in-all-day-bar": e.allDay,
                "cell-start": e.start,
                "cell-end": e.end,
                style: pe(M.value[E._.id])
              }, Ae({ _: 2 }, [
                m.$slots["event.all-day"] && e.allDay ? {
                  name: "event.all-day",
                  fn: K((B) => [
                    N(m.$slots, "event.all-day", ue({ ref_for: !0 }, B))
                  ]),
                  key: "0"
                } : void 0,
                m.$slots[`event.${T(n).id}`] ? {
                  name: `event.${T(n).id}`,
                  fn: K((B) => [
                    N(m.$slots, `event.${T(n).id}`, ue({ ref_for: !0 }, B))
                  ]),
                  key: "1"
                } : void 0,
                m.$slots.event ? {
                  name: "event",
                  fn: K((B) => [
                    N(m.$slots, "event", ue({ ref_for: !0 }, B))
                  ]),
                  key: "2"
                } : void 0
              ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "style"]))), 128))
            ]),
            _: 2
          }, 1024)) : ae("", !0),
          W.value && D.schedule === L.id && !e.allDay ? (R(), G("div", {
            key: 5,
            class: "vuecal__event-placeholder",
            style: pe(y.value.style)
          }, ve(y.value.start) + " - " + ve(y.value.end), 5)) : ae("", !0)
        ], 14, hn))), 128)) : ae("", !0),
        !m.$slots.cell && !T(c).schedules ? (R(), G(fe, { key: 3 }, [
          t.value || m.$slots["cell-date"] ? (R(), G("div", wn, [
            N(m.$slots, "cell-date", {
              cell: X.value,
              view: T(n)
            }, () => [
              Ze(ve(t.value), 1)
            ])
          ])) : ae("", !0),
          m.$slots["cell-content"] ? (R(), G("div", bn, [
            N(m.$slots, "cell-content", {
              cell: X.value,
              view: T(n)
            })
          ])) : ae("", !0),
          m.$slots["cell-events"] && O.value.length ? (R(), G("div", _n, [
            N(m.$slots, "cell-events", {
              cell: X.value,
              view: T(n)
            })
          ])) : !(T(n).isMonth && !T(c).eventsOnMonthView) && !T(n).isYear && !T(n).isYears && (O.value.length || b.value) ? (R(), He(rt, {
            key: 3,
            class: "vuecal__cell-events",
            name: "vuecal-event-delete",
            onBeforeLeave: P[1] || (P[1] = (L) => b.value = !0),
            onAfterLeave: l,
            tag: "div"
          }, {
            default: K(() => [
              (R(!0), G(fe, null, we(O.value, (L) => (R(), He(ut, {
                key: L._.id,
                event: L,
                onEventDeleted: V,
                "in-all-day-bar": e.allDay,
                "cell-start": e.start,
                "cell-end": e.end,
                class: ye(h.value[L._.id]),
                style: pe(M.value[L._.id])
              }, Ae({ _: 2 }, [
                m.$slots["event.all-day"] && e.allDay ? {
                  name: "event.all-day",
                  fn: K((d) => [
                    N(m.$slots, "event.all-day", ue({ ref_for: !0 }, d))
                  ]),
                  key: "0"
                } : void 0,
                m.$slots[`event.${T(n).id}`] ? {
                  name: `event.${T(n).id}`,
                  fn: K((d) => [
                    N(m.$slots, `event.${T(n).id}`, ue({ ref_for: !0 }, d))
                  ]),
                  key: "1"
                } : void 0,
                m.$slots.event ? {
                  name: "event",
                  fn: K((d) => [
                    N(m.$slots, "event", ue({ ref_for: !0 }, d))
                  ]),
                  key: "2"
                } : void 0
              ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "class", "style"]))), 128))
            ]),
            _: 3
          })) : ae("", !0),
          W.value ? (R(), G("div", {
            key: 4,
            class: "vuecal__event-placeholder",
            style: pe(y.value.style)
          }, ve(y.value.start) + " - " + ve(y.value.end), 5)) : ae("", !0)
        ], 64)) : ae("", !0),
        m.$slots["event-count"] ? N(m.$slots, "event-count", {
          key: 4,
          events: S.value
        }) : I.value ? (R(), G("div", Tn, ve(S.value.length), 1)) : ae("", !0),
        T(n).nowLine.show && F.value && !r.allDay ? (R(), G("div", {
          key: 6,
          class: "vuecal__now-line",
          style: pe(T(n).nowLine.style),
          title: T(n).nowLine.currentTime
        }, [
          N(m.$slots, "now-line", {
            now: T(n).now,
            timeFormatted: T(n).nowLine.currentTime
          }, () => [
            he("span", null, ve(T(n).nowLine.currentTime), 1)
          ])
        ], 12, kn)) : ae("", !0)
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
    const e = Le("vuecal"), o = Le("$vuecalEl"), { view: n, config: c, dateUtils: k } = e, Y = C(() => c.xs ? "day-xs" : c.sm || n.isDays || n.isMonth ? "day-sm" : "day"), v = C(() => (n.isDay || n.isDays || n.isWeek || n.isMonth) && !(n.isDay && !c.schedules && !c.allDayEvents)), p = C(() => n.cellDates.slice(0, c.horizontal ? n.rows : n.cols).map(({ start: b }) => ({
      id: Ne[b.getDay()],
      date: b,
      dateNumber: b.getDate(),
      day: k.formatDate(b, "dddd"),
      "day-sm": k.formatDate(b, "ddd"),
      "day-xs": k.formatDate(b, "dd"),
      isToday: k.isToday(b)
    }))), F = (b) => ({
      start: b.date,
      end: new Date(b.date.getTime() + 1440 * 60 * 1e3 - 1),
      isToday: b.isToday,
      goNarrower: () => n.narrower(),
      goBroader: () => n.broader(),
      broader: n.broaderView,
      narrower: n.narrowerView
    }), j = {
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
      startResize(b, V) {
        this.isResizing.value = !0;
        const l = c.horizontal;
        this[l ? "startX" : "startY"].value = l ? b : V;
        const D = getComputedStyle(o.value).getPropertyValue("--vuecal-all-day-bar-size"), g = document.createElement("div");
        g.style.position = "absolute", g.style.visibility = "hidden", g.style[l ? "width" : "height"] = D, document.body.appendChild(g);
        const a = g[l ? "offsetWidth" : "offsetHeight"];
        g.remove(), a > 0 && (this[l ? "initialWidth" : "initialHeight"].value = a), document.addEventListener("mousemove", f.handleMouseMove), document.addEventListener("mouseup", f.cleanup), document.addEventListener("touchmove", f.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", f.cleanup);
      },
      // Update height/width based on mouse/touch movement.
      updateSize(b, V) {
        var a;
        if (!this.isResizing.value) return;
        const l = c.horizontal, D = l ? b - this.startX.value : V - this.startY.value, g = Math.max(20, this[l ? "initialWidth" : "initialHeight"].value + D);
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
        var V;
        (V = b.touches) != null && V[0] && this.startResize(b.touches[0].clientX, b.touches[0].clientY);
      },
      handleTouchMove(b) {
        var V;
        (V = b.touches) != null && V[0] && (f.updateSize(b.touches[0].clientX, b.touches[0].clientY), b.preventDefault());
      }
    };
    return We(() => {
      f.cleanup();
    }), (b, V) => v.value ? (R(), G("div", $n, [
      T(n).isDay ? ae("", !0) : (R(), G("div", Mn, [
        (R(!0), G(fe, null, we(p.value, (l, D) => (R(), G("div", {
          class: ye(["vuecal__weekday", { "vuecal__weekday--today": l.isToday }]),
          key: D,
          onClick: (g) => j.click(l.date)
        }, [
          N(b.$slots, "weekday-heading", {
            label: l[Y.value],
            id: l.id,
            date: l.date,
            view: T(n)
          }, () => [
            he("span", Sn, ve(l[Y.value]), 1),
            T(n).isMonth ? ae("", !0) : (R(), G("strong", Yn, ve(l.dateNumber), 1))
          ])
        ], 10, En))), 128))
      ])),
      T(c).schedules ? (R(), G("div", zn, [
        (R(!0), G(fe, null, we(p.value, (l, D) => (R(), G(fe, { key: D }, [
          (R(!0), G(fe, null, we(T(c).schedules, (g, a) => (R(), G(fe, { key: a }, [
            b.$slots["schedule-heading"] ? (R(), G("div", {
              key: 0,
              class: ye(["vuecal__schedule vuecal__schedule--heading", g.class])
            }, [
              N(b.$slots, "schedule-heading", {
                schedule: g,
                view: T(n),
                cell: F(l)
              })
            ], 2)) : (R(), G("div", {
              key: 1,
              class: ye(["vuecal__schedule vuecal__schedule--heading", g.class]),
              innerHTML: g.label
            }, null, 10, Cn))
          ], 64))), 128))
        ], 64))), 128))
      ])) : ae("", !0),
      T(c).allDayEvents ? (R(), G("div", On, [
        (R(!0), G(fe, null, we(p.value, (l, D) => (R(), He(Yt, {
          class: ye(["vuecal__all-day-cell", { "vuecal__weekday--today": l.isToday }]),
          key: D,
          start: l.date,
          end: new Date(l.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: D,
          "all-day": ""
        }, Ae({ _: 2 }, [
          b.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: K((g) => [
              N(b.$slots, "event.all-day", ue({ ref_for: !0 }, g))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: K((g) => [
              N(b.$slots, "event", ue({ ref_for: !0 }, g))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        he("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: V[0] || (V[0] = (...l) => f.handleMouseDown && f.handleMouseDown(...l)),
          onTouchstart: V[1] || (V[1] = (...l) => f.handleTouchStart && f.handleTouchStart(...l))
        }, null, 32)
      ])) : ae("", !0)
    ])) : ae("", !0);
  }
}, Vn = { class: "vuecal__time-column" }, An = { class: "vuecal__time-column-inner" }, jn = {
  key: 0,
  class: "vuecal__all-day-label"
}, Pn = ["title"], Ln = {
  __name: "time-column",
  setup(r) {
    const e = Le("vuecal"), { config: o, texts: n, view: c } = e, k = C(() => {
      const Y = [];
      for (let p = o.timeFrom; p < o.timeTo; p += o.timeStep) {
        const F = p + o.timeStep > o.timeTo, j = ~~(p / 60), f = p % 60, b = n[p < 720 ? "am" : "pm"];
        let V = null;
        F && (V = `calc(var(--vuecal-time-cell-size) * ${(o.timeTo - p) / o.timeStep})`), Y.push({
          minutesSum: p,
          // The sum of hours + minutes in minutes.
          hours: j,
          minutes: f,
          formatted12: `${j % 12 ? j % 12 : 12}${f ? `:${f.toString().padStart(2, 0)}` : ""}${b}`,
          formatted24: `${j.toString().padStart(2, 0)}:${f.toString().padStart(2, 0)}`,
          height: V
        });
      }
      return Y;
    });
    return (Y, v) => (R(), G("div", Vn, [
      he("div", An, [
        T(o).allDayEvents ? (R(), G("div", jn, [
          N(Y.$slots, "all-day-label", {}, () => [
            Ze(ve(T(e).texts.allDay), 1)
          ])
        ])) : ae("", !0),
        (R(!0), G(fe, null, we(k.value, (p, F) => (R(), G("div", {
          class: "vuecal__time-cell",
          key: F,
          style: pe({ height: p.height || null })
        }, [
          N(Y.$slots, "time-cell", {
            index: F,
            minutes: p.minutes,
            hours: p.hours,
            minutesSum: p.minutesSum,
            format12: p.formatted12,
            format24: p.formatted24
          }, () => [
            he("label", null, ve(T(o).twelveHour ? p.formatted12 : p.formatted24), 1)
          ])
        ], 4))), 128)),
        T(o).currentTimeLabel ? (R(), G("div", {
          key: 1,
          class: "vuecal__current-time",
          style: pe(T(c).nowLine.style),
          title: T(c).nowLine.currentTime
        }, [
          N(Y.$slots, "current-time-label", {
            now: T(c).now,
            timeFormatted: T(c).nowLine.currentTime
          }, () => [
            he("span", null, ve(T(c).nowLine.currentTime), 1)
          ])
        ], 12, Pn)) : ae("", !0)
      ])
    ]));
  }
}, Fn = {
  __name: "body",
  setup(r) {
    const e = Le("vuecal"), { view: o, config: n, dateUtils: c, touch: k, eventsManager: Y } = e, v = de(null), p = de(null), F = de(null), { resizeState: j } = Y, f = C(() => ({
      "--vuecal-grid-columns": o.cols,
      "--vuecal-grid-rows": o.rows,
      "--vuecal-body-max-height": n.time ? `${n.timeCellHeight * (n.timeTo - n.timeFrom) / n.timeStep}px` : null
    })), b = C(() => {
      const g = n.horizontal, a = g ? p.value : F.value, U = c.formatTime(Se(a, n), n.twelveHour ? "h:mm{am}" : "HH:mm");
      return {
        style: { [g ? "left" : "top"]: `${a}%` },
        time: U
      };
    }), V = (g) => {
      var se;
      if (o.isMonth || o.isYear || o.isYears) return;
      const a = k.isResizingEvent && n.editableEvents.resizeX;
      if (!n.timeAtCursor && !a) return;
      const U = ((se = g.touches) == null ? void 0 : se[0]) || g, { clientX: y, clientY: W } = U;
      if (a && (j.cellEl = D(y, W)), n.timeAtCursor) {
        const { top: t, left: O } = v.value.getBoundingClientRect();
        n.horizontal ? p.value = (y - O) * 100 / v.value.clientWidth : F.value = nt(W - t, v.value);
      }
    }, l = () => {
      p.value = null, F.value = null;
    }, D = (g, a) => {
      const U = document.elementFromPoint(g, a);
      return (U == null ? void 0 : U.closest(".vuecal__cell")) || null;
    };
    return tt(() => {
      v.value.addEventListener("mousemove", V), v.value.addEventListener("touchmove", V), v.value.addEventListener("mouseleave", l), v.value.addEventListener("touchend", l);
    }), We(() => {
      v.value && (v.value.removeEventListener("mousemove", V), v.value.removeEventListener("touchmove", V), v.value.removeEventListener("mouseleave", l), v.value.removeEventListener("touchend", l));
    }), (g, a) => (R(), G("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: v,
      style: pe(f.value)
    }, [
      Pe(Ue, { name: "vuecal-shrink" }, {
        default: K(() => [
          T(n).timeAtCursor && (p.value !== null || F.value !== null) ? (R(), G("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: pe(b.value.style)
          }, [
            he("label", null, ve(b.value.time), 1)
          ], 4)) : ae("", !0)
        ]),
        _: 1
      }),
      (R(!0), G(fe, null, we(T(o).cellDates, (U, y) => (R(), He(Yt, {
        key: y,
        start: U.start,
        end: U.end,
        index: y
      }, Ae({ _: 2 }, [
        g.$slots.cell ? {
          name: "cell",
          fn: K((W) => [
            N(g.$slots, "cell", ue({ ref_for: !0 }, W))
          ]),
          key: "0"
        } : void 0,
        g.$slots["cell-date"] ? {
          name: "cell-date",
          fn: K((W) => [
            N(g.$slots, "cell-date", ue({ ref_for: !0 }, W))
          ]),
          key: "1"
        } : void 0,
        g.$slots["cell-content"] ? {
          name: "cell-content",
          fn: K((W) => [
            N(g.$slots, "cell-content", ue({ ref_for: !0 }, W))
          ]),
          key: "2"
        } : void 0,
        g.$slots["cell-events"] ? {
          name: "cell-events",
          fn: K((W) => [
            N(g.$slots, "cell-events", ue({ ref_for: !0 }, W))
          ]),
          key: "3"
        } : void 0,
        g.$slots[`event.${T(o).id}`] ? {
          name: `event.${T(o).id}`,
          fn: K((W) => [
            N(g.$slots, `event.${T(o).id}`, ue({ ref_for: !0 }, W))
          ]),
          key: "4"
        } : void 0,
        g.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: K((W) => [
            N(g.$slots, "event.all-day", ue({ ref_for: !0 }, W))
          ]),
          key: "5"
        } : void 0,
        g.$slots.event ? {
          name: "event",
          fn: K((W) => [
            N(g.$slots, "event", ue({ ref_for: !0 }, W))
          ]),
          key: "6"
        } : void 0,
        g.$slots["event-count"] ? {
          name: "event-count",
          fn: K((W) => [
            N(g.$slots, "event-count", ue({ ref_for: !0 }, W))
          ]),
          key: "7"
        } : void 0,
        g.$slots["now-line"] ? {
          name: "now-line",
          fn: K((W) => [
            N(g.$slots, "now-line", ue({ ref_for: !0 }, W))
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
    const n = r, c = o, k = Ot("vuecal-el"), Y = Gt({ props: n, emit: c, attrs: Vt(), vuecalEl: k, uid: Ht() }), { config: v, view: p, dateUtils: F, touch: j } = Y, f = C(() => v.time && (p.isDay || p.isDays || p.isWeek)), b = C(() => Array(p.rows).fill().map((a, U) => F.getWeek(F.addDays(p.firstCellDate, 7 * U)))), V = C(() => {
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
        "vuecal--dragging-cell": j.isDraggingCell,
        "vuecal--dragging-event": j.isDraggingEvent,
        "vuecal--resizing-event": j.isResizingEvent,
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
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && k.value.addEventListener("contextmenu", g), await qe(), v.ready = !0, c("ready", { config: v, view: p });
    }), We(() => {
      var a;
      (a = k == null ? void 0 : k.value) == null || a.removeEventListener("contextmenu", g);
    }), ot("vuecal", Y), ot("$vuecalEl", k), e({ view: Y.view }), (a, U) => (R(), G("div", {
      class: ye(["vuecal", V.value]),
      ref: "vuecal-el",
      "data-locale": a.locale,
      style: pe(l.value)
    }, [
      a.$slots.diy ? N(a.$slots, "diy", {
        key: 0,
        vuecal: T(Y)
      }) : (R(), G(fe, { key: 1 }, [
        Pe(tn, null, Ae({ _: 2 }, [
          a.$slots.header ? {
            name: "header",
            fn: K((y) => [
              N(a.$slots, "header", oe(ie(y)))
            ]),
            key: "0"
          } : void 0,
          !a.$slots.header && a.$slots["previous-button"] ? {
            name: "previous-button",
            fn: K((y) => [
              N(a.$slots, "previous-button", oe(ie(y)))
            ]),
            key: "1"
          } : void 0,
          !a.$slots.header && a.$slots["next-button"] ? {
            name: "next-button",
            fn: K((y) => [
              N(a.$slots, "next-button", oe(ie(y)))
            ]),
            key: "2"
          } : void 0,
          !a.$slots.header && a.$slots["today-button"] ? {
            name: "today-button",
            fn: K((y) => [
              N(a.$slots, "today-button", oe(ie(y)))
            ]),
            key: "3"
          } : void 0,
          !a.$slots.header && a.$slots.title ? {
            name: "title",
            fn: K((y) => [
              N(a.$slots, "title", oe(ie(y)))
            ]),
            key: "4"
          } : void 0,
          !a.$slots.header && a.$slots["title.day"] ? {
            name: "title.day",
            fn: K((y) => [
              N(a.$slots, "title.day", oe(ie(y)))
            ]),
            key: "5"
          } : void 0,
          !a.$slots.header && a.$slots["title.days"] ? {
            name: "title.days",
            fn: K((y) => [
              N(a.$slots, "title.days", oe(ie(y)))
            ]),
            key: "6"
          } : void 0,
          !a.$slots.header && a.$slots["title.week"] ? {
            name: "title.week",
            fn: K((y) => [
              N(a.$slots, "title.week", oe(ie(y)))
            ]),
            key: "7"
          } : void 0,
          !a.$slots.header && a.$slots["title.month"] ? {
            name: "title.month",
            fn: K((y) => [
              N(a.$slots, "title.month", oe(ie(y)))
            ]),
            key: "8"
          } : void 0,
          !a.$slots.header && a.$slots["title.year"] ? {
            name: "title.year",
            fn: K((y) => [
              N(a.$slots, "title.year", oe(ie(y)))
            ]),
            key: "9"
          } : void 0,
          !a.$slots.header && a.$slots["title.years"] ? {
            name: "title.years",
            fn: K((y) => [
              N(a.$slots, "title.years", oe(ie(y)))
            ]),
            key: "10"
          } : void 0,
          !a.$slots.header && a.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: K((y) => [
              N(a.$slots, "schedule-heading", oe(ie(y)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        he("div", Xn, [
          Pe(Ue, {
            name: `vuecal-slide-fade--${T(p).transitionDirection}`
          }, {
            default: K(() => [
              (R(), G("div", {
                class: ye(["vuecal__scrollable", D.value]),
                key: T(p).id + T(p).start.getTime()
              }, [
                f.value ? (R(), He(Ln, { key: 0 }, Ae({ _: 2 }, [
                  a.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: K((y) => [
                      N(a.$slots, "time-cell", oe(ie(y)))
                    ]),
                    key: "0"
                  } : void 0,
                  a.$slots["current-time-label"] ? {
                    name: "current-time-label",
                    fn: K((y) => [
                      N(a.$slots, "current-time-label", oe(ie(y)))
                    ]),
                    key: "1"
                  } : void 0
                ]), 1024)) : ae("", !0),
                T(v).weekNumbers && T(p).isMonth ? (R(), G("div", Bn, [
                  (R(!0), G(fe, null, we(b.value, (y) => (R(), G("div", Nn, [
                    N(a.$slots, "week-number", {}, () => [
                      he("small", null, ve(y), 1)
                    ])
                  ]))), 256))
                ])) : ae("", !0),
                he("div", Wn, [
                  Pe(Hn, null, Ae({ _: 2 }, [
                    a.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: K((y) => [
                        N(a.$slots, "weekday-heading", oe(ie(y)))
                      ]),
                      key: "0"
                    } : void 0,
                    a.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: K((y) => [
                        N(a.$slots, "schedule-heading", oe(ie(y)))
                      ]),
                      key: "1"
                    } : void 0,
                    a.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: K((y) => [
                        N(a.$slots, "event.all-day", oe(ie(y)))
                      ]),
                      key: "2"
                    } : void 0,
                    a.$slots.event ? {
                      name: "event",
                      fn: K((y) => [
                        N(a.$slots, "event", oe(ie(y)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  Pe(Fn, null, Ae({ _: 2 }, [
                    a.$slots.cell ? {
                      name: "cell",
                      fn: K((y) => [
                        N(a.$slots, "cell", oe(ie(y)))
                      ]),
                      key: "0"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: K((y) => [
                        N(a.$slots, "cell-date", oe(ie(y)))
                      ]),
                      key: "1"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: K((y) => [
                        N(a.$slots, "cell-content", oe(ie(y)))
                      ]),
                      key: "2"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: K((y) => [
                        N(a.$slots, "cell-events", oe(ie(y)))
                      ]),
                      key: "3"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: K((y) => [
                        N(a.$slots, "event.all-day", oe(ie(y)))
                      ]),
                      key: "4"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots[`event.${T(p).id}`] ? {
                      name: `event.${T(p).id}`,
                      fn: K((y) => [
                        N(a.$slots, `event.${T(p).id}`, oe(ie(y)))
                      ]),
                      key: "5"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots.event ? {
                      name: "event",
                      fn: K((y) => [
                        N(a.$slots, "event", oe(ie(y)))
                      ]),
                      key: "6"
                    } : void 0,
                    !a.$slots.cell && a.$slots["event-count"] ? {
                      name: "event-count",
                      fn: K((y) => [
                        N(a.$slots, "event-count", oe(ie(y)))
                      ]),
                      key: "7"
                    } : void 0,
                    a.$slots["now-line"] ? {
                      name: "now-line",
                      fn: K((y) => [
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
  Be.texts = { ...ge.texts, ...r }, Be.dateUtils.updateTexts(Be.texts);
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
