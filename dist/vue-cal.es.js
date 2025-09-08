import { computed as M, reactive as be, watch as he, toRefs as bt, ref as ce, onBeforeUnmount as Ne, nextTick as Ie, inject as He, createElementBlock as H, openBlock as O, renderSlot as V, createCommentVNode as Z, unref as T, Fragment as de, renderList as we, normalizeClass as De, createElementVNode as me, createVNode as Ve, Transition as Je, withCtx as B, createBlock as Se, resolveDynamicComponent as xe, mergeProps as ie, toHandlers as Xe, normalizeProps as se, onMounted as Ze, toDisplayString as ue, createTextVNode as qe, withModifiers as et, normalizeStyle as $e, TransitionGroup as tt, createSlots as Ce, useTemplateRef as Tt, useId as Mt, useAttrs as Et, provide as at, guardReactiveProps as re } from "vue";
/**
  * vue-cal v5.0.1-rc.29
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
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
}, Yt = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Ge = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], St = Ge.reduce((h, t, c) => (h[t] = c || 7, h), {}), Ct = (h, t, c) => {
  const { dateUtils: r } = h, p = !1, Y = M(() => {
    if (z.value[t.view]) return t.view;
    const d = t.datePicker ? "month" : "week", i = t.view || d;
    return z.value[i] ? i : (console.warn(
      `Vue Cal: the provided or default view \`${i}\` is either invalid or not in the list of available views. The first available view will be chosen: \`${Object.keys(z.value)[0]}\`.`
    ), Object.keys(z.value)[0]);
  }), W = M(() => t.sm && !t.xs), f = M(() => t.xs || t.datePicker), L = M(() => t.clickToNavigate || t.datePicker && t.clickToNavigate !== !1), U = M(() => {
    const d = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, i = (k) => k.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [k, a] of Object.entries(c)) {
      const [F, q, K] = k.match(/^on(Cell|Event)(.+)$/) || [];
      F && (d[q.toLowerCase()][i(K).replace(/^-+|-+$/g, "")] = a);
    }
    return d;
  }), P = M(() => {
    var i;
    const d = {};
    return t.hideWeekends && (d[6] = !0) && (d[7] = !0), (i = t.hideWeekdays) != null && i.length && t.hideWeekdays.forEach((k) => d[St[k]] = !0), d;
  }), l = M(() => t.hideWeekends || P.value[6] && P.value[7]), z = M(() => {
    const d = t.datePicker;
    let i = 0, k = {};
    const a = t.views;
    return d && !a ? {
      month: { ...ye.availableViews.month },
      year: { ...ye.availableViews.year },
      years: { ...ye.availableViews.years }
    } : (a ? (Array.isArray(a) ? k = a.reduce((F, q) => (typeof q == "string" && ye.availableViews[q] ? F[q] = ye.availableViews[q] : i++, F), {}) : typeof a == "object" && (k = Object.entries(a).reduce((F, [q, K]) => {
      const { cols: x, rows: te } = ye.availableViews[q];
      return F[q] = { cols: K.cols || x, rows: K.rows || te }, F;
    }, {})), i && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(k).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), k = { ...ye.availableViews })) : k = { ...ye.availableViews }, k);
  }), A = M(() => t.datePicker ? "month" : z.value.week ? "week" : Object.keys(z.value)[0]), m = M(() => {
    if (typeof t.selectedDate == "string") return r.stringToDate(t.selectedDate);
    if (t.selectedDate instanceof Date) return t.selectedDate;
    t.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", t.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), u = M(() => {
    if (!t.disableDays) return [];
    const d = [];
    if (Array.isArray(t.disableDays))
      for (let i of t.disableDays) {
        let k = i;
        typeof i == "string" ? k = r.stringToDate(i) : i instanceof Date && (i = r.formatDate(i, "YYYY-MM-DD")), k instanceof Date && !isNaN(k.getTime()) ? d.push(i) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", i);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", t.disableDays);
    return d;
  }), S = M(() => {
    let d = null;
    return t.minDate && typeof t.minDate == "string" ? d = r.stringToDate(t.minDate) : t.minDate && t.minDate instanceof Date && (d = t.minDate), (d == null ? void 0 : d.getTime()) || null;
  }), n = M(() => {
    let d = null;
    return t.maxDate && typeof t.maxDate == "string" ? d = r.stringToDate(t.maxDate) : t.maxDate && t.maxDate instanceof Date && (d = t.maxDate), (d == null ? void 0 : d.getTime()) || null;
  }), I = M(() => {
    var k;
    const { view: d } = h;
    return t.schedules.length && (d.isDay || d.isDays || d.isWeek) && ((k = t.schedules) == null ? void 0 : k.map((a, F) => ({ ...a, id: a.id ?? F + 1 }))) || void 0;
  }), e = M(() => {
    const d = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return t.editableEvents === !0 ? d : t.editableEvents === !1 ? Object.keys(d).map((i) => d[i] = !1) : { ...d, ...t.editableEvents };
  }), C = M(() => {
    const { view: d } = h, { eventCount: i } = t;
    return (Array.isArray(i) ? i.includes(d.id) : i) && (d.isMonth && !t.eventsOnMonthView || d.isYear);
  }), j = M(() => t.allDayEvents && t.time !== !1 && !Y.isMonth), y = M(() => t.timeAtCursor && t.time !== !1), v = async (d) => {
    var k;
    let i = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((a) => a.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((a) => a.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((a) => a.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((a) => a.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((a) => a.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((a) => a.default), "../i18n/da.json": () => import("./i18n/da.js").then((a) => a.default), "../i18n/de.json": () => import("./i18n/de.js").then((a) => a.default), "../i18n/el.json": () => import("./i18n/el.js").then((a) => a.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((a) => a.default), "../i18n/en-us.json": () => Promise.resolve().then(() => jt).then((a) => a.default), "../i18n/es.json": () => import("./i18n/es.js").then((a) => a.default), "../i18n/et.json": () => import("./i18n/et.js").then((a) => a.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((a) => a.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((a) => a.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((a) => a.default), "../i18n/he.json": () => import("./i18n/he.js").then((a) => a.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((a) => a.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((a) => a.default), "../i18n/id.json": () => import("./i18n/id.js").then((a) => a.default), "../i18n/is.json": () => import("./i18n/is.js").then((a) => a.default), "../i18n/it.json": () => import("./i18n/it.js").then((a) => a.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((a) => a.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((a) => a.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((a) => a.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((a) => a.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((a) => a.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((a) => a.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((a) => a.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((a) => a.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((a) => a.default), "../i18n/no.json": () => import("./i18n/no.js").then((a) => a.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((a) => a.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((a) => a.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((a) => a.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((a) => a.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((a) => a.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((a) => a.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((a) => a.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((a) => a.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((a) => a.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((a) => a.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((a) => a.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((a) => a.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((a) => a.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((a) => a.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((a) => a.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((a) => a.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((a) => a.default) });
    {
      if (!i[`../i18n/${d}.json`]) {
        console.warn(`Vue Cal: the locale \`${d}\` does not exist. Falling back to \`en-us\`.`), d = "en-us";
        return;
      }
      i = await ((k = i[`../i18n/${d}.json`]) == null ? void 0 : k.call(i));
    }
    h.texts = Object.assign(h.texts, Object.assign({ ...ye.texts }, i)), r.updateTexts(h.texts);
  }, D = be(t.events || []);
  return he(() => t.events, (d) => D.splice(0, D.length, ...d)), he(() => t.locale, (d) => v(d || "en-us")), (t.locale || !h.texts.today) && v(t.locale || "en-us"), {
    ...bt(t),
    events: D,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: U,
    defaultView: A,
    availableViews: z,
    disableDays: u,
    ready: p,
    sm: W,
    xs: f,
    clickToNavigate: L,
    hideWeekdays: P,
    hideWeekends: l,
    minTimestamp: S,
    maxTimestamp: n,
    schedules: I,
    selectedDate: m,
    editableEvents: e,
    showCellEventCount: C,
    allDayEvents: j,
    timeAtCursor: y,
    view: Y,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(P.value).length;
    },
    get size() {
      return f.value ? "xs" : W.value ? "sm" : "lg";
    },
    loadTexts: v
  };
}, Oe = (h, t) => {
  const c = t.timeTo - t.timeFrom;
  return (h - t.timeFrom) * 100 / c;
}, je = (h, t) => {
  const c = t.timeTo - t.timeFrom;
  return ~~(h * c / 100 + t.timeFrom);
}, Ke = (h, t) => {
  const c = t.clientHeight;
  return h * 100 / c;
}, We = be({ id: null, date: null });
let nt = !1, Ue = !0;
const _e = be({ el: null, cell: null, timeout: null }), ke = be({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function zt(h) {
  const { config: t, view: c, eventsManager: r, emit: p, uid: Y, dateUtils: W } = h, f = (S) => {
    var v;
    const { timeStep: n, timeCellHeight: I, timeFrom: e } = t, C = (((v = S.touches) == null ? void 0 : v[0]) || S).clientY, { top: j } = S.currentTarget.getBoundingClientRect(), y = C - j - ~~S.dataTransfer.getData("cursor-grab-at");
    return je(Ke(y, S.currentTarget), t);
  }, L = (S, n, I) => {
    const e = n.duration || U(n.start, n.end) || t.timeStep;
    let C = Math.max(f(S), 0);
    if (t.snapToInterval) {
      const D = C + t.snapToInterval / 2;
      C = D - D % t.snapToInterval;
    }
    const j = new Date(new Date(I).setMinutes(C)), y = Math.min(C + e, 1440), v = new Date(new Date(I).setMinutes(y));
    return { start: j, end: v };
  }, U = (S, n) => Math.round((n - S) / 6e4);
  return {
    eventDragStart: (S, n) => {
      if (S.target.nodeType === 3 || h.touch.isResizingEvent) return S.preventDefault();
      S.dataTransfer.effectAllowed = "move", S.dataTransfer.dropEffect = "move";
      const I = { ...n, _: { id: n._.id, duration: U(n.start, n.end) } };
      try {
        S.dataTransfer.setData("text/plain", ""), S.dataTransfer.setData("event", JSON.stringify(I)), S.dataTransfer.setData("cursor-grab-at", S.offsetY);
      } catch (C) {
        return console.warn("Vue Cal: Failed to set drag data:", C), S.preventDefault();
      }
      ke.eventId = n._.id, ke.fromVueCal = Y, p("event-drag-start", {
        e: S,
        event: n
      });
      const e = S.target.closest(".vuecal__event");
      e.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        e.classList.add("vuecal__event--dragging-original"), e.classList.remove("vuecal__event--dragging-ghost");
      }, 0), nt = !1, Object.assign(We, { id: c.id, date: c.firstCellDate }), Ue = !0, h.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (S, n) => {
      ke.eventId = null, S.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: I, toVueCal: e } = ke;
      e && I !== e && r.deleteEvent(n._.id, 3), nt && Ue && We.id && c.switchView(We.id, We.date, !0), p("event-drag-end", {
        e: S,
        event: n,
        external: ke.fromVueCal !== Y
      }), ke.fromVueCal = null, ke.toVueCal = null, h.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (S, n) => {
      const { start: I } = n, e = S.currentTarget;
      if (!S.currentTarget.contains(S.relatedTarget)) {
        if (e === _e.el || !e.className.includes("vuecal__cell-content")) return !1;
        _e.el && (_e.cell.highlighted = !1), Object.assign(_e, { el: e, cell: n, timeout: clearTimeout(_e.timeout) }), n.highlighted = !0, ["years", "year", "month"].includes(c.id) && (_e.timeout = setTimeout(() => h.switchToNarrowerView(I), 2e3));
      }
    },
    cellDragOver: (S, n) => {
      const { start: I, schedule: e } = n;
      S.preventDefault(), n.highlighted = !0, (e || e === 0) && (n.highlightedSchedule = e);
    },
    cellDragLeave: (S, n) => {
      S.preventDefault(), !S.currentTarget.contains(S.relatedTarget) && (n.highlightedSchedule = !1, _e.cell === n && (clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null }), n.highlighted = !1));
    },
    cellDragDrop: async (S, n, I = !1) => {
      var k, a, F;
      S.preventDefault(), clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null });
      const e = JSON.parse(S.dataTransfer.getData("event") || "{}");
      e.start && (e.start = new Date(e.start)), e.end && (e.end = new Date(e.end));
      let C, j, y;
      I ? (j = new Date(n.start), y = new Date(n.end)) : { start: j, end: y } = L(S, e, n.start);
      const { schedule: v } = ((k = S.target.closest("[data-schedule]")) == null ? void 0 : k.dataset) || {};
      let D = () => {
      };
      ke.fromVueCal === Y ? (C = r.getEvent(e._.id), C && (C._.dragging = !1, D = (q) => {
        if (C.start = j, C.end = y, C.allDay = I, v !== void 0 && (C.schedule = ~~v), q && typeof q == "object") {
          const { _: K, ...x } = q;
          Object.assign(C, x);
        }
      })) : (C = {
        ...e,
        start: j,
        end: y,
        ...v !== void 0 && { schedule: ~~v },
        _: { id: ((a = e._) == null ? void 0 : a.id) || e.id, duration: U(j, y) },
        getOverlappingEvents: () => r.getEventsInRange(j, y, { schedule: ~~v })
      }, D = (q) => {
        if (C = r.createEvent(C), q && typeof q == "object") {
          const { _: K, ...x } = q;
          Object.assign(C, x);
        }
      });
      let d = !0;
      const { drop: i } = (F = t.eventListeners) == null ? void 0 : F.event;
      i && (d = await i({
        e: S,
        event: { ...C, start: j, end: y, schedule: ~~v },
        overlaps: C.getOverlappingEvents({ start: j, end: y, schedule: ~~v }),
        cell: n,
        external: ke.fromVueCal !== Y
      })), d !== !1 && D(d), n.highlighted = !1, n.highlightedSchedule = null, Ue = !1, ke.toVueCal = Y, p("event-dropped", {
        e: S,
        cell: n,
        event: C,
        originalEvent: e,
        external: ke.fromVueCal !== Y
      });
    }
  };
}
const lt = (h, t) => {
  let c, r, p, Y = {}, W = {};
  const f = ce(h), L = () => {
    f.value.today || (f.value = t), Date.prototype.addDays = function(s) {
      return z(this, s || 0);
    }, Date.prototype.subtractDays = function(s) {
      return A(this, s || 0);
    }, Date.prototype.addHours = function(s) {
      return m(this, s || 0);
    }, Date.prototype.subtractHours = function(s) {
      return u(this, s || 0);
    }, Date.prototype.addMinutes = function(s) {
      return S(this, s || 0);
    }, Date.prototype.subtractMinutes = function(s) {
      return n(this, s || 0);
    }, Date.prototype.getWeek = function() {
      return e(this);
    }, Date.prototype.isToday = function() {
      return C(this);
    }, Date.prototype.isLeapYear = function() {
      return v(this);
    }, Date.prototype.format = function(s = "YYYY-MM-DD") {
      return q(this, s);
    }, Date.prototype.formatTime = function(s = "HH:mm") {
      return x(this, s);
    };
  }, U = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, P = (s) => {
    f.value = s, Date.prototype.subtractDays && L();
  }, l = () => (r !== (/* @__PURE__ */ new Date()).getDate() && (c = /* @__PURE__ */ new Date(), r = c.getDate(), p = `${c.getFullYear()}-${c.getMonth()}-${c.getDate()}`), p), z = (s, $) => {
    const w = new Date(s.valueOf());
    return w.setDate(w.getDate() + $), w;
  }, A = (s, $) => {
    const w = new Date(s.valueOf());
    return w.setDate(w.getDate() - $), w;
  }, m = (s, $) => {
    const w = new Date(s.valueOf());
    return w.setHours(w.getHours() + $), w;
  }, u = (s, $) => {
    const w = new Date(s.valueOf());
    return w.setHours(w.getHours() - $), w;
  }, S = (s, $) => {
    const w = new Date(s.valueOf());
    return w.setMinutes(w.getMinutes() + $), w;
  }, n = (s, $) => {
    const w = new Date(s.valueOf());
    return w.setMinutes(w.getMinutes() - $), w;
  }, I = (s, $) => {
    const w = (J) => {
      const ne = J % $;
      return ne !== 0 && (J += ne >= $ / 2 ? $ - ne : -ne), J;
    };
    if (typeof s == "number") return w(s);
    if (s instanceof Date) {
      let J = w(s.getMinutes());
      J >= 60 && (s.setHours(s.getHours() + 1), J = 0), s.setMinutes(J, 0, 0);
    }
  }, e = (s, $ = !1) => {
    const w = new Date(Date.UTC(s.getFullYear(), s.getMonth(), s.getDate())), J = w.getUTCDay() || 7;
    w.setUTCDate(w.getUTCDate() + 4 - J);
    const ne = new Date(Date.UTC(w.getUTCFullYear(), 0, 1));
    return Math.ceil(((w - ne) / 864e5 + 1) / 7) + ($ ? 1 : 0);
  }, C = (s) => `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}` === l(), j = (s, $) => {
    if (!s || !$) return console.warn(`Vue Cal: missing date${s ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (F(s)) {
      if (!F($)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${$}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${s}\`.`);
    return s.getFullYear() === $.getFullYear() && s.getMonth() === $.getMonth() && s.getDate() === $.getDate();
  }, y = (s, $, w) => F(s) ? s.getTime() >= $ && s.getTime() <= w : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${s}\`.`), v = (s) => {
    const $ = s.getFullYear();
    return !($ % 400) || $ % 100 && !($ % 4);
  }, D = (s = null, $) => {
    const w = s && new Date(s.valueOf()) || /* @__PURE__ */ new Date(), J = $ ? 7 : 6;
    return w.setDate(w.getDate() - (w.getDay() + J) % 7), w;
  }, d = (s) => s instanceof Date ? s : (s.length === 10 && (s += " 00:00"), new Date(s.replace(/-/g, "/"))), i = (s) => s.getHours() * 60 + s.getMinutes(), k = (s, $) => {
    typeof s == "string" && (s = s.replace(/-/g, "/")), typeof $ == "string" && ($ = $.replace(/-/g, "/")), s = new Date(s).setHours(0, 0, 0, 0), $ = new Date($).setHours(0, 0, 1, 0);
    const w = (new Date($).getTimezoneOffset() - new Date(s).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil(($ - s - w) / (24 * 3600 * 1e3));
  }, a = (s, $, w) => Math.abs(s.getTime() - $.getTime()) <= w * 60 * 1e3, F = (s) => s && s instanceof Date && !isNaN(s), q = (s, $ = "YYYY-MM-DD", w = null) => {
    if (w || (w = f.value), $ || ($ = "YYYY-MM-DD"), $ === "YYYY-MM-DD") return K(s);
    Y = {}, W = {};
    const J = {
      YYYY: () => ae(s, w).YYYY,
      YY: () => ae(s, w).YY(),
      M: () => ae(s, w).M,
      MM: () => ae(s, w).MM(),
      MMM: () => ae(s, w).MMM(),
      MMMM: () => ae(s, w).MMMM(),
      MMMMG: () => ae(s, w).MMMMG(),
      D: () => ae(s, w).D,
      DD: () => ae(s, w).DD(),
      S: () => ae(s, w).S(),
      d: () => ae(s, w).d,
      dd: () => ae(s, w).dd(),
      ddd: () => ae(s, w).ddd(),
      dddd: () => ae(s, w).dddd(),
      HH: () => ve(s, w).HH,
      H: () => ve(s, w).H,
      hh: () => ve(s, w).hh,
      h: () => ve(s, w).h,
      am: () => ve(s, w).am,
      AM: () => ve(s, w).AM,
      mm: () => ve(s, w).mm,
      m: () => ve(s, w).m,
      s: () => ve(s, w).s
    };
    return $.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (ne, fe) => {
      const o = J[fe.replace(/\{|\}/g, "")];
      return o !== void 0 ? o() : fe;
    });
  }, K = (s) => {
    const $ = s.getMonth() + 1, w = s.getDate();
    return `${s.getFullYear()}-${$ < 10 ? "0" : ""}${$}-${w < 10 ? "0" : ""}${w}`;
  }, x = (s, $ = "HH:mm", w = null, J = !1) => {
    let ne = !1;
    if (J) {
      const [b, E, _] = [s.getHours(), s.getMinutes(), s.getSeconds()];
      b + E + _ === 141 && (ne = !0);
    }
    if (s instanceof Date && $ === "HH:mm") return ne ? "24:00" : te(s);
    W = {}, w || (w = f.value);
    const fe = ve(s, w), o = $.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (b, E) => {
      const _ = fe[E.replace(/\{|\}/g, "")];
      return _ !== void 0 ? _ : E;
    });
    return ne ? o.replace("23:59", "24:00") : o;
  }, te = (s) => {
    const $ = s.getHours(), w = s.getMinutes();
    return `${($ < 10 ? "0" : "") + $}:${(w < 10 ? "0" : "") + w}`;
  }, X = (s) => {
    const $ = Math.floor(s / 60).toString().padStart(2, 0), w = (s % 60).toString().padStart(2, 0);
    return `${$}:${w}`;
  }, le = (s) => {
    if (s > 3 && s < 21) return "th";
    switch (s % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }, ae = (s, $) => {
    if (Y.D) return Y;
    const w = s.getFullYear(), J = s.getMonth() + 1, ne = s.getDate(), o = (s.getDay() - 1 + 7) % 7;
    return Y = {
      // Year.
      YYYY: w,
      // 2024.
      YY: () => w.toString().substring(2),
      // 24.
      // Month.
      M: J,
      // 1 to 12.
      MM: () => J.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => $.months[J - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => $.months[J - 1],
      // January to December.
      MMMMG: () => ($.monthsGenitive || $.months)[J - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: ne,
      // 1 to 31.
      DD: () => ne.toString().padStart(2, 0),
      // 01 to 31.
      S: () => le(ne),
      // st, nd, rd, th.
      // Day of the week.
      d: o + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => $.weekDaysShort.length ? $.weekDaysShort[o] : $.weekDays[o][0],
      // M to S.
      ddd: () => $.weekDaysShort.length ? $.weekDaysShort[o] : $.weekDays[o].substr(0, 3),
      // Mon to Sun.
      dddd: () => $.weekDays[o]
      // Monday to Sunday.
    }, Y;
  }, ve = (s, $) => {
    if (W.am) return W;
    let w, J, ne;
    s instanceof Date ? (w = s.getHours(), J = s.getMinutes(), ne = s.getSeconds()) : (w = Math.floor(s / 60), J = Math.floor(s % 60));
    const fe = w % 12 ? w % 12 : 12, o = ($ || { am: "am", pm: "pm" })[w === 24 || w < 12 ? "am" : "pm"];
    return W = {
      H: w,
      h: fe,
      HH: w.toString().padStart(2, 0),
      hh: fe.toString().padStart(2, 0),
      am: o,
      AM: o.toUpperCase(),
      m: J,
      mm: J.toString().padStart(2, 0),
      s: ne
    }, W;
  };
  return {
    addDatePrototypes: L,
    removeDatePrototypes: U,
    updateTexts: P,
    addDays: z,
    subtractDays: A,
    addHours: m,
    subtractHours: u,
    addMinutes: S,
    subtractMinutes: n,
    snapToInterval: I,
    getWeek: e,
    isToday: C,
    isSameDate: j,
    isInRange: y,
    isLeapYear: v,
    getPreviousFirstDayOfWeek: D,
    stringToDate: d,
    dateToMinutes: i,
    countDays: k,
    datesInSameTimeStep: a,
    isValid: F,
    formatDate: q,
    formatDateLite: K,
    formatTime: x,
    formatTimeLite: te,
    formatMinutes: X
  };
}, Ot = (h) => {
  const { dateUtils: t, config: c } = h;
  let r = 0;
  const p = M(() => {
    var j, y, v, D, d;
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
    }, C = c.events.slice().sort((i, k) => i.start - k.start < 0 ? -1 : 1);
    for (let i of C) {
      const k = typeof i.start == "string" || typeof i.end == "string", a = !((j = i._) != null && j.register) || !i.isOverlapping || !i.delete;
      let F = !1;
      if (!k && ((y = i._) != null && y.cachedStart) && ((v = i._) != null && v.cachedEnd) && (F = i.start.getTime() !== ((D = i._) == null ? void 0 : D.cachedStart) || i.end.getTime() !== ((d = i._) == null ? void 0 : d.cachedEnd)), k || a || F) {
        if (!Y(i)) continue;
        W(i), i._.cachedStart = i.start.getTime(), i._.cachedEnd = i.end.getTime();
      }
      if (e.byId[i._.id] = i, i.recurring)
        e.recurring.push(i._.id);
      else if (!t.isSameDate(i.start, new Date(i.end.getTime() - 1)))
        i._.multiday = c.multidayEvents, c.multidayEvents ? e.multiday.push(i._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), i.end = new Date(new Date(i.start).setHours(23, 59, 59, 999)), W(i)), e.byDate[i._.startFormatted] || (e.byDate[i._.startFormatted] = []), e.byDate[i._.startFormatted].push(i._.id);
      else {
        e.byDate[i._.startFormatted] || (e.byDate[i._.startFormatted] = []), e.byDate[i._.startFormatted].push(i._.id);
        const q = i._.startFormatted.substring(0, 4), K = i._.startFormatted.substring(5, 7), x = i._.startFormatted.substring(8, 10);
        e.byYear[q] || (e.byYear[q] = {}), e.byYear[q][K] || (e.byYear[q][K] = {}), e.byYear[q][K][x] || (e.byYear[q][K][x] = []), e.byYear[q][K][x].push(i._.id);
      }
    }
    return e;
  }), Y = (e) => !e.start || !e.end ? (console.error("Vue Cal: Event is missing start or end date", e), !1) : (typeof e.start == "string" && (e.start = t.stringToDate(e.start)), typeof e.end == "string" && (e.end = t.stringToDate(e.end)), e.start.setSeconds(0, 0), e.end.getSeconds() === 59 ? e.end.setMinutes(e.end.getMinutes() + 1, 0, 0) : e.end.setSeconds(0, 0), isNaN(e.start) || isNaN(e.end) || e.end.getTime() < e.start.getTime() ? (isNaN(e.start) ? console.error(`Vue Cal: invalid start date for event "${e.title}".`, e.start) : isNaN(e.end) ? console.error(`Vue Cal: invalid end date for event "${e.title}".`, e.end) : console.error(`Vue Cal: invalid event dates for event "${e.title}". The event ends before it starts.`, e.start, e.end), !1) : !0), W = (e) => {
    e._ || (e._ = {}), e._.id = e._.id || ++r, e._.multiday = !t.isSameDate(e.start, new Date(e.end.getTime() - 1)), e._.startFormatted = t.formatDate(e.start), e._.endFormatted = t.formatDate(e.end), e._.startMinutes = ~~t.dateToMinutes(e.start), e._.endMinutes = ~~t.dateToMinutes(e.end);
    const C = e.start.getHours(), j = e.start.getMinutes().toString().padStart(2, 0), y = e.end.getHours(), v = e.end.getMinutes().toString().padStart(2, 0);
    e._.startTimeFormatted24 = `${C.toString().padStart(2, 0)}:${j}`, e._.startTimeFormatted12 = `${C % 12 || 12}${j ? `:${j}` : ""} ${C < 12 ? "AM" : "PM"}`, e._.endTimeFormatted24 = `${y.toString().padStart(2, 0)}:${v}`, e._.endTimeFormatted12 = `${y % 12 || 12}${v ? `:${v}` : ""} ${y < 12 ? "AM" : "PM"}`, e._.duration = Math.abs(~~((e.end - e.start) / 6e4)), e.delete || (e.delete = function(D) {
      return P(this._.id, D);
    }), e._.deleting === void 0 && (e._.deleting = !1), e._.deleted === void 0 && (e._.deleted = !1), e.isOverlapping || (e.isOverlapping = function(D = null) {
      return this.getOverlappingEvents(D).length;
    }), e.getOverlappingEvents || (e.getOverlappingEvents = function(D = null) {
      var a;
      const d = (D == null ? void 0 : D.start) || this.start, i = (D == null ? void 0 : D.end) || this.end, k = (a = c.schedules) != null && a.length ? ~~((D == null ? void 0 : D.schedule) || this.schedule) : null;
      return z(d, i, { excludeIds: [this._.id], schedule: k });
    }), e._.register || (e._.register = (D) => {
      e._.$el = D, e._.fireCreated && (h.emit("event-created", e), delete e._.fireCreated);
    }), e._.unregister || (e._.unregister = () => {
      e._.$el = null, e._.register = null, e.isOverlapping = null, e.getOverlappingEvents = null, e.delete = null;
    });
  }, f = (e) => p.value.byId[e], L = (e) => {
    const C = [];
    for (const { start: j, end: y } of e) {
      const v = z(j, y);
      v.length && C.push(...v);
    }
    return C;
  }, U = (e) => {
    if (!e.start || !e.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return c.snapToInterval && (t.snapToInterval(e.start, c.snapToInterval), t.snapToInterval(e.end, c.snapToInterval)), e = { ...e }, e._ || (e._ = {}), e._.id = ++r, e._.fireCreated = !0, c.events.push(e), e;
  }, P = async (e, C = 0) => {
    var d, i;
    if (!e) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let j = typeof e == "string" || !isNaN(e) ? e : null;
    const y = typeof e == "object" ? Object.entries(e) : null;
    if (y) {
      const [k, a] = y[0];
      j = (d = c.events.find((F) => F[k] === a)) == null ? void 0 : d._.id;
    }
    if (!c.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!j) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const v = c.events.findIndex((k) => k._.id === j);
    if (v === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${j}\`.`);
    const D = c.events[v];
    if (D.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${j}\` since it was explicitely set to \`delete: false\`.`);
    switch (C) {
      case 0:
        D._.deleting ? c.events.splice(v, 1) : D._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        D._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        D._.deleted = !0, c.events[v]._.deleted = !0, (i = D._.$el) == null || i.dispatchEvent(new CustomEvent("event-deleted", { detail: D._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        c.events.splice(v, 1), h.emit("update:events", c.events), h.emit("event-delete", D);
        break;
    }
    return !0;
  }, l = (e, C, j) => {
    const y = c.allDayEvents ? { allDay: j } : {}, v = z(e, C, { background: !1, ...y });
    if (!v.length) return { cellOverlaps: {}, longestStreak: 0 };
    const D = {};
    let d = [], i = 0;
    v.sort((k, a) => k.start - a.start || k.end - k.start - (a.end - a.start));
    for (const k of v) {
      const a = k._.id;
      D[a] || (D[a] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), d = d.filter((te) => te.end > k.start);
      const F = d.filter((te) => {
        var le;
        return (!((le = c.schedules) != null && le.length) || k.schedule === te.schedule) && te.start < k.end;
      }), q = new Set(F.map((te) => {
        var X;
        return ((X = D[te._.id]) == null ? void 0 : X.position) ?? 0;
      }));
      let K = 0;
      for (; q.has(K); ) K++;
      D[a].position = K, d.push(k);
      const x = Math.max(1, ...F.map((te) => {
        var X;
        return ((X = D[te._.id]) == null ? void 0 : X.maxConcurrent) ?? 1;
      }));
      D[a].maxConcurrent = Math.max(F.length + 1, x);
      for (const te of F)
        D[te._.id].overlaps.add(a), D[a].overlaps.add(te._.id), D[te._.id].maxConcurrent = D[a].maxConcurrent;
      i = Math.max(i, D[a].maxConcurrent);
    }
    for (const k in D) D[k].overlaps = [...D[k].overlaps];
    return { cellOverlaps: D, longestStreak: i };
  }, z = (e, C, { excludeIds: j = [], schedule: y = null, background: v = !0, allDay: D = !1 } = {}) => {
    if (!Object.keys(p.value.byId).length) return [];
    const d = e.getFullYear(), i = C.getFullYear(), k = e.getMonth() + 1, a = C.getMonth() + 1, F = e.getDate(), q = C.getDate();
    e.getTime(), C.getTime();
    const K = e.setHours(0, 0, 0, 0), x = C.setHours(23, 59, 59, 999), te = new Set(j), X = [];
    if (Object.keys(p.value.byId).length <= 100) {
      for (const le of Object.values(p.value.byId))
        !le || te.has(le._.id) || y !== null && y !== le.schedule || v === !1 && le.background || c.allDayEvents && (D && !le.allDay || !D && le.allDay) || le.start.getTime() < x && le.end.getTime() > K && X.push(le);
      return X;
    }
    for (let le = d; le <= i; le++) {
      const ae = `${le}`, ve = p.value.byYear[ae];
      if (!ve) continue;
      const s = le === d ? k : 1, $ = le === i ? a : 12;
      for (let w = s; w <= $; w++) {
        const J = String(w).padStart(2, "0"), ne = ve[J];
        if (ne)
          for (const fe in ne) {
            const o = +fe;
            if (o > q || o < F) continue;
            const b = ne[fe];
            if (b != null && b.length)
              for (let E = 0; E < b.length; E++) {
                const _ = p.value.byId[b[E]];
                !_ || te.has(_._.id) || y !== null && y !== _.schedule || v === !1 && _.background || c.allDayEvents && (D && !_.allDay || !D && _.allDay) || _.start.getTime() < x && _.end.getTime() > K && X.push(_);
              }
          }
      }
    }
    return X;
  }, A = (e, C, j) => {
    const y = e.allDay || !c.time, v = y ? new Date(e.start).setHours(0, 0, 0, 0) : e.start.getTime(), D = y ? new Date(e.end).setHours(23, 59, 59, 999) : e.end.getTime(), d = y ? new Date(C).setHours(0, 0, 0, 0) : C.getTime(), i = y ? new Date(j).setHours(23, 59, 59, 999) : j.getTime();
    return D > d && v < i;
  }, m = be({
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
  }), u = (e, C) => {
    var D;
    let j = je(m.movePercentageY, c);
    if (j = Math.max(0, Math.min(j, 1440)), c.snapToInterval) {
      const d = j + c.snapToInterval / 2;
      j = d - d % c.snapToInterval;
    }
    let y = e.start, v = new Date(C.getTime() + j * 6e4);
    return m.moveX && ((D = h.touch) != null && D.currentHoveredCell) && m.cellEl && new Date(h.touch.currentHoveredCell.__vueParentComponent.props.start), v < m.resizeStartDate && (y = v, v = m.resizeStartDate), { newStart: y, newEnd: v };
  }, S = async (e) => {
    var y, v, D, d, i;
    const { clientX: C, clientY: j } = ((y = e.touches) == null ? void 0 : y[0]) || e;
    if (m.fromResizer && !((v = h.touch) != null && v.isResizingEvent)) {
      m.resizingOriginalEvent = { ...m.resizingEvent, _: { ...m.resizingEvent._ } }, h.touch.isResizingEvent = !0;
      const k = ((D = c.eventListeners) == null ? void 0 : D.event) || {};
      (d = k["resize-start"]) == null || d.call(k, { e, event: m.resizingEvent });
    }
    if (m.cellEl) {
      const { top: k, left: a, width: F, height: q } = m.cellEl.getBoundingClientRect();
      m.moveX = C - a, m.moveY = j - k, m.movePercentageX = m.moveX * 100 / F, m.movePercentageY = m.moveY * 100 / q;
    }
    if (m.documentMouseX = C, m.documentMouseY = j, m.fromResizer && m.resizingEvent) {
      const k = m.cellEl.__vueParentComponent.props.start, { newStart: a, newEnd: F } = u(m.resizingEvent, k);
      let q = !0;
      const { resize: K } = ((i = c.eventListeners) == null ? void 0 : i.event) || {};
      K && (q = await K({
        e,
        event: { ...m.resizingEvent, start: a, end: F },
        overlaps: m.resizingEvent.getOverlappingEvents({ start: a, end: F })
      })), q !== !1 ? (m.resizingEvent.start = a, m.resizingEvent.end = F, m.resizingLastAcceptedEvent && (m.resizingLastAcceptedEvent = null), e.preventDefault()) : K && (m.resizingLastAcceptedEvent = { ...m.resizingEvent, _: { ...m.resizingEvent._ } });
    }
  }, n = async (e) => {
    var C, j, y, v;
    if ((C = h.touch) != null && C.isResizingEvent && m.resizingEvent) {
      const D = m.cellEl.__vueParentComponent.props.start, { newStart: d, newEnd: i } = u(m.resizingEvent, D);
      let k = !0;
      const F = (((j = c.eventListeners) == null ? void 0 : j.event) || {})["resize-end"];
      F && (k = await F({
        e,
        event: m.resizingEvent,
        original: m.resizingOriginalEvent,
        // Original event details before resizing.
        overlaps: m.resizingEvent.getOverlappingEvents({ start: d, end: i })
      })), m.resizingEvent.start = k === !1 ? (m.resizingLastAcceptedEvent || m.resizingOriginalEvent).start : ((y = m.resizingLastAcceptedEvent) == null ? void 0 : y.start) || d, m.resizingEvent.end = k === !1 ? (m.resizingLastAcceptedEvent || m.resizingOriginalEvent).end : ((v = m.resizingLastAcceptedEvent) == null ? void 0 : v.end) || i, m.resizingEvent._.duration < 1 && (m.resizingEvent.start = m.resizingOriginalEvent.start, m.resizingEvent.end = m.resizingOriginalEvent.end), h.touch.isResizingEvent = !1, h.touch.currentHoveredCell = null;
    }
    document.removeEventListener(e.type === "touchend" ? "touchmove" : "mousemove", S, { passive: !m.fromResizer }), h.touch.isResizingEvent = !1, m.fromResizer = !1, m.resizingEvent = null, m.resizingOriginalEvent = null, m.resizingLastAcceptedEvent = null, m.startX = 0, m.startY = 0, m.moveX = 0, m.moveY = 0, m.startPercentageX = 0, m.startPercentageY = 0, m.movePercentageX = 0, m.movePercentageY = 0, m.documentMouseX = 0, m.documentMouseY = 0, m.cellEl = null, m.resizeStartDate = null, m.schedule = null;
  };
  return {
    events: p,
    resizeState: m,
    getEvent: f,
    getViewEvents: L,
    getCellOverlappingEvents: l,
    getEventsInRange: z,
    createEvent: U,
    deleteEvent: P,
    isEventInRange: A,
    handleEventResize: (e, C, j) => {
      var v;
      const y = ((v = e.touches) == null ? void 0 : v[0]) || e;
      if (m.fromResizer = !!y.target.closest(".vuecal__event-resizer"), m.fromResizer) {
        const D = j.getBoundingClientRect();
        m.startX = y.clientX - D.left, m.startY = y.clientY - D.top, m.startPercentageX = m.startX * 100 / D.width, m.startPercentageY = m.startY * 100 / D.height, m.cellEl = j.closest(".vuecal__cell"), m.resizeStartDate = C.start, m.resizingEvent = C, document.addEventListener(e.type === "touchstart" ? "touchmove" : "mousemove", S, { passive: !m.fromResizer }), document.addEventListener(e.type === "touchstart" ? "touchend" : "mouseup", n, { once: !0 });
      }
    }
  };
}, Vt = ({ config: h, dateUtils: t, emit: c, texts: r, eventsManager: p }, Y) => {
  const { availableViews: W } = h, f = ce(h.view && W[h.view] ? h.view : h.defaultView), L = ce(h.selectedDate || null), U = ce(/* @__PURE__ */ new Date()), P = ce(new Date(h.viewDate || U.value));
  P.value.setHours(0, 0, 0, 0);
  const l = ce(new Date(P));
  let z = null;
  const A = M(() => f.value === "month" ? l.value : v.value), m = M(() => f.value === "month" ? new Date(l.value.getFullYear(), l.value.getMonth() + 1, 0, 23, 59, 59, 999) : d.value), u = M(() => f.value === "week" ? t.getPreviousFirstDayOfWeek(v.value, h.startWeekOnSunday) : f.value === "month" ? v.value : A.value), S = M(() => {
    if (f.value === "week") {
      const g = t.addDays(u.value, 7);
      return g.setMilliseconds(-1), g;
    }
    return f.value === "month" ? d.value : m.value;
  }), n = M(() => {
    const g = U.value.getTime();
    if (f.value === "week")
      return u.value.getTime() <= g && g <= S.value.getTime();
    const R = v.value.getTime(), ee = d.value.getTime();
    return R <= g && g <= ee;
  });
  function I() {
    U.value = /* @__PURE__ */ new Date(), z = setTimeout(I, 60 * 1e3);
  }
  function e() {
    z = setTimeout(I, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), I();
  }
  const C = M(() => {
    if (!h.availableViews[f.value]) return 1;
    let g = h.availableViews[f.value].cols;
    return h.hasHiddenDays && ["week", "month"].includes(f.value) && (g -= h.hasHiddenDays), g;
  }), j = M(() => {
    var g;
    return ((g = h.availableViews[f.value]) == null ? void 0 : g.rows) || 1;
  }), y = M(() => C.value * j.value), v = M(() => {
    if (f.value === "month") {
      let g = l.value.getDay() || 7;
      return h.startWeekOnSunday && !h.hideWeekdays[7] && (g += 1), h.viewDayOffset && (g -= h.viewDayOffset), t.subtractDays(l.value, g - 1);
    }
    if (f.value === "week") {
      const g = "1234567".split("").filter((ee) => !Object.keys(h.hideWeekdays).includes(ee));
      let R = Math.min(...g);
      return h.startWeekOnSunday && !h.hideWeekdays[7] && (R = 1), h.viewDayOffset && (R += h.viewDayOffset), t.addDays(l.value, R - 1);
    }
    return l.value;
  }), D = M(() => {
    const g = [], R = ["days", "week", "month"].includes(f.value);
    let ee = 0;
    for (let Q = 0; Q < y.value + ee; Q++)
      switch (f.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const ge = t.addDays(v.value, Q), Re = ge.getDay() || 7;
          if (R && h.hasHiddenDays && h.hideWeekdays[Re]) {
            ee++;
            continue;
          }
          const ze = new Date(ge);
          ze.setHours(23, 59, 59, 999), g.push({ start: ge, startFormatted: t.formatDate(ge), end: ze });
          break;
        }
        case "year":
          g.push({
            start: new Date(v.value.getFullYear(), Q, 1, 0, 0, 0, 0),
            end: new Date(v.value.getFullYear(), Q + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          g.push({
            start: new Date(v.value.getFullYear() + Q, 0, 1, 0, 0, 0, 0),
            end: new Date(v.value.getFullYear() + Q + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return g;
  }), d = M(() => D.value[D.value.length - 1].end), i = ce("right"), k = M(() => {
    const g = Object.keys(h.availableViews);
    return g[g.indexOf(f.value) + 1];
  }), a = M(() => {
    const g = Object.keys(h.availableViews);
    return g[g.indexOf(f.value) - 1];
  });
  function F(g, R, ee = !1) {
    if (!R || !R[g]) return g + 1;
    const Q = R[g];
    return ee && typeof Q == "string" ? Q.substring(0, 3) : Q;
  }
  function q(g, R, ee) {
    const { monthsArray: Q, monthBeforeDay: ge, canTruncate: Re, xs: ze } = ee, Me = g.getMonth(), Ee = g.getFullYear(), Ye = R.getMonth(), Pe = R.getFullYear(), Be = Me !== Ye, $t = Ee !== Pe, Te = Re && (ze || Be), Le = g.getDate(), Fe = R.getDate();
    return $t ? ge ? `${F(Me, Q, Te)} ${Le}, ${Ee} - ${F(Ye, Q, Te)} ${Fe}, ${Pe}` : `${Le} ${F(Me, Q, Te)} ${Ee} - ${Fe} ${F(Ye, Q, Te)} ${Pe}` : Be ? ge ? `${F(Me, Q, Te)} ${Le} - ${F(Ye, Q, Te)} ${Fe}, ${Ee}` : `${Le} ${F(Me, Q, Te)} - ${Fe} ${F(Ye, Q, Te)} ${Ee}` : ge ? `${F(Me, Q, Te)} ${Le}-${Fe}, ${Ee}` : `${Le}-${Fe} ${F(Me, Q, Te)} ${Ee}`;
  }
  const K = M(() => {
    const { dateFormat: g, months: R, monthsGenitive: ee, week: Q, truncations: ge } = r, Re = h.locale, ze = ge !== !1, Me = g.indexOf("M") < g.indexOf("D"), Ee = ee && Re === "el" ? ee : R;
    switch (f.value) {
      case "day":
        return t.formatDate(v.value, g);
      case "days":
      case "week": {
        const Ye = {
          monthsArray: Ee,
          monthBeforeDay: Me,
          canTruncate: ze,
          xs: h.xs
        };
        let Pe = q(v.value, d.value, Ye);
        if (f.value === "week") {
          const Be = t.getWeek(
            v.value,
            h.startWeekOnSunday && !h.hideWeekdays[7]
          );
          Pe += ` <small>${Q} ${Be}</small>`;
        }
        return Pe;
      }
      case "month": {
        const Ye = `${h.xs && ze ? "MMM" : "MMMM"} YYYY`;
        return t.formatDate(A.value, Ye);
      }
      case "year":
        return v.value.getFullYear();
      case "years":
        return `${v.value.getFullYear()} - ${m.value.getFullYear()}`;
    }
  });
  async function x() {
    switch (l.value = new Date(P.value || U.value), l.value.setHours(0, 0, 0, 0), f.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        l.value = t.getPreviousFirstDayOfWeek(l.value, h.startWeekOnSunday && !h.hideWeekdays[7]);
        break;
      case "month":
        l.value = new Date(l.value.getFullYear(), l.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        l.value = new Date(l.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        l.value = new Date(l.value.getFullYear() - l.value.getFullYear() % y.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    U.value = /* @__PURE__ */ new Date(), h.ready && (await Ie(), c("view-change", {
      id: f.value,
      title: K.value,
      start: A.value,
      end: m.value,
      extendedStart: u.value,
      extendedEnd: S.value,
      cellDates: D.value,
      containsToday: n.value,
      events: G.value
    }));
  }
  function te(g) {
    const R = f.value, ee = h.availableViews[R];
    g[R] && JSON.stringify(g[R]) === JSON.stringify(ee) || x();
  }
  function X(g, R = !0) {
    const ee = Object.keys(h.availableViews);
    f.value !== g && (ee.includes(g) ? (i.value = ee.indexOf(g) < ee.indexOf(f.value) ? "left" : "right", f.value = g, R && c("update:view", g), x()) : console.warn(`Vue Cal: the \`${g}\` view is not available.`));
  }
  function le() {
    k.value ? X(k.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function ae() {
    a.value ? X(a.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function ve() {
    $(!1);
  }
  function s() {
    $(!0);
  }
  function $(g = !0) {
    let R = new Date(P.value);
    switch (f.value) {
      case "day":
      case "days":
        g ? R = t.addDays(d.value, 1) : R = t.subtractDays(v.value, y.value);
        break;
      case "week": {
        g ? (R = t.addDays(S.value, 1), R.setHours(0, 0, 0, 0)) : R = t.subtractDays(u.value, y.value);
        break;
      }
      case "month": {
        const ee = g ? 1 : -1;
        R = new Date(R.getFullYear(), R.getMonth() + ee, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const ee = g ? 1 : -1;
        R = new Date(R.getFullYear() + ee, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const ee = g ? y.value : -y.value;
        R = new Date(R.getFullYear() + ee, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    J(R);
  }
  function w() {
    const g = /* @__PURE__ */ new Date();
    g.setHours(0, 0, 0, 0), J(g);
  }
  function J(g, R = !0, ee = !1) {
    if (!t.isValid(g)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [Q, ge] = [v.value, d.value];
    f.value === "month" && ([Q, ge] = [A.value, m.value]), (!t.isInRange(g, Q, ge) || ee) && (g.setHours(0, 0, 0, 0), i.value = g.getTime() < Q.getTime() ? "left" : "right", P.value = g, R && c("update:viewDate", g), x());
  }
  function ne(g, R = !0) {
    if (!t.isValid(g)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: ee, isSameDate: Q } = t;
    (!L.value || !ee(L.value) || !Q(g, L.value)) && (g.setHours(0, 0, 0, 0), L.value = g, R && c("update:selectedDate", g));
  }
  function fe(g) {
    !g && !l.value.getDay() ? J(t.addDays(l.value, 1), !0, !0) : (i.value = "left", x());
  }
  function o(g) {
    g && h.startWeekOnSunday && !l.value.getDay() ? J(t.addDays(l.value, 1), !0, !0) : !g && h.startWeekOnSunday && l.value.getDay() === 1 && J(t.subtractDays(l.value, 1), !0, !0);
  }
  function b() {
    console.log("toggling weekdays", h.hideWeekdays), x();
  }
  function E(g) {
    var Q;
    const R = (Q = Y.value) == null ? void 0 : Q.querySelector(".vuecal__scrollable"), ee = g ? g * h.timeCellHeight / h.timeStep : 0;
    R == null || R.scrollTo({ top: ee, behavior: "smooth" });
  }
  function _() {
    const g = /* @__PURE__ */ new Date();
    E(g.getHours() * 60 + g.getMinutes());
  }
  function N() {
    E(0);
  }
  const G = M(() => p.getViewEvents(D.value)), oe = p.createEvent, pe = p.deleteEvent;
  return he(() => h.view, (g) => X(g, !1)), he(() => h.availableViews, te), he(() => h.datePicker, () => X("month")), he(() => h.viewDate, (g) => J(g, !1)), he(() => h.selectedDate, (g) => ne(g, !1)), he(() => h.startWeekOnSunday, (g) => fe(g)), he(() => h.hideWeekends, (g) => o(g)), he(() => h.hideWeekdays, b), he(() => y.value, () => {
    y.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), he(() => h.watchRealTime, (g) => {
    g && h.time ? e() : z = clearTimeout(z);
  }), x(), h.time && h.watchRealTime && e(), Ne(() => z = clearTimeout(z)), {
    now: U,
    id: f,
    broaderView: k,
    narrowerView: a,
    title: K,
    viewDate: P,
    start: A,
    end: m,
    extendedStart: u,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: S,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: v,
    lastCellDate: d,
    containsToday: n,
    selectedDate: L,
    cellDates: D,
    cols: C,
    rows: j,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: G,
    transitionDirection: i,
    switch: X,
    broader: le,
    narrower: ae,
    previous: ve,
    next: s,
    navigate: $,
    goToToday: w,
    updateViewDate: J,
    updateSelectedDate: ne,
    scrollToCurrentTime: _,
    scrollToTime: E,
    scrollTop: N,
    createEvent: oe,
    deleteEvent: pe,
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
}, jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
}, Symbol.toStringTag, { value: "Module" })), Ae = be({
  texts: { ...ye.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: lt(ye.texts, Qe)
  // Some Date utils functions need localized texts.
}), Ht = ({ props: h, emit: t, attrs: c, vuecalEl: r, uid: p }) => {
  const Y = be({
    uid: p,
    // The Vuecal instance unique ID, used for dnd source-target identification.
    emit: t,
    texts: { ...Ae.texts },
    // Make texts reactive before a locale is loaded.
    // The date utils composable.
    // A class/composable is needed in order to access the user locale in all the methods, and
    // independently of other potential Vue Cal instances on the same page.
    dateUtils: { ...Ae.dateUtils },
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
  return Y.dateUtils = lt(Object.assign(ye.texts, Y.texts), Qe), Y.config = Ct(Y, h, c), Y.eventsManager = Ot(Y), Y.view = Vt(Y, r), Y.dnd = zt(Y), Y;
}, Pt = 1440, Lt = {
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
}, Ft = { class: "vuecal__header" }, At = {
  key: 0,
  class: "vuecal__views-bar"
}, Nt = ["onClick", "innerHTML"], Rt = {
  key: 1,
  class: "vuecal__title-bar"
}, Bt = { class: "vuecal__transition-wrap" }, Wt = ["disabled", "innerHTML"], It = {
  __name: "header",
  setup(h) {
    const t = He("vuecal"), { view: c, config: r } = t, p = () => {
      r.clickToNavigate && c.broader();
    }, Y = M(() => r.clickToNavigate ? { click: p } : {});
    return (W, f) => (O(), H("div", Ft, [
      V(W.$slots, "header", {
        view: T(c),
        availableViews: T(r).availableViews,
        vuecal: T(t)
      }),
      W.$slots.header ? Z("", !0) : (O(), H(de, { key: 0 }, [
        T(r).viewsBar ? (O(), H("div", At, [
          (O(!0), H(de, null, we(T(r).availableViews, (L, U) => (O(), H("button", {
            class: De(["vuecal__view-button", { "vuecal__view-button--active": T(c).id === U }]),
            onClick: (P) => T(c).switch(U),
            innerHTML: T(t).texts[U],
            type: "button"
          }, null, 10, Nt))), 256))
        ])) : Z("", !0),
        T(r).titleBar ? (O(), H("nav", Rt, [
          me("button", {
            class: De(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !W.$slots["previous-button"] }]),
            onClick: f[0] || (f[0] = (...L) => T(c).previous && T(c).previous(...L)),
            type: "button"
          }, [
            V(W.$slots, "previous-button")
          ], 2),
          me("div", Bt, [
            Ve(Je, {
              name: `vuecal-slide-fade--${T(c).transitionDirection}`
            }, {
              default: B(() => [
                (O(), H("div", {
                  key: T(c).id + T(c).start.getTime()
                }, [
                  W.$slots.title || W.$slots[`title.${T(c).id}`] ? (O(), Se(xe(T(r).clickToNavigate && T(c).broaderView ? "button" : "div"), ie({
                    key: 0,
                    class: "vuecal__title"
                  }, Xe(Y.value)), {
                    default: B(() => [
                      W.$slots[`title.${T(c).id}`] ? V(W.$slots, `title.${T(c).id}`, se(ie({ key: 0 }, T(c)))) : V(W.$slots, "title", se(ie({ key: 1 }, T(c))))
                    ]),
                    _: 3
                  }, 16)) : (O(), Se(xe(T(r).clickToNavigate && T(c).broaderView ? "button" : "div"), ie({
                    key: 1,
                    class: "vuecal__title"
                  }, Xe(Y.value), {
                    innerHTML: T(c).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          T(r).todayButton ? (O(), H(de, { key: 0 }, [
            W.$slots["today-button"] ? V(W.$slots, "today-button", {
              key: 0,
              navigate: () => !T(c).containsToday && T(c).goToToday(),
              active: T(c).containsToday
            }) : (O(), H("button", {
              key: 1,
              class: De(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": T(c).containsToday }]),
              onClick: f[1] || (f[1] = (L) => !T(c).containsToday && T(c).goToToday()),
              disabled: !!T(c).containsToday,
              type: "button",
              innerHTML: T(t).texts.today
            }, null, 10, Wt))
          ], 64)) : Z("", !0),
          me("button", {
            class: De(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !W.$slots["next-button"] }]),
            onClick: f[2] || (f[2] = (...L) => T(c).next && T(c).next(...L)),
            type: "button"
          }, [
            V(W.$slots, "next-button")
          ], 2)
        ])) : Z("", !0)
      ], 64))
    ]));
  }
}, Xt = ["draggable"], qt = { class: "vuecal__event-details" }, Gt = { class: "vuecal__event-title" }, Jt = {
  key: 0,
  class: "vuecal__event-time"
}, Ut = {
  key: 0,
  class: "vuecal__event-comma"
}, Zt = { class: "vuecal__event-start" }, Kt = {
  key: 1,
  class: "vuecal__event-end"
}, Qt = { key: 0 }, xt = ["innerHTML"], st = {
  __name: "event",
  props: {
    event: { type: Object, required: !0 },
    inAllDayBar: { type: Boolean, default: !1 },
    cellStart: { type: Date, required: !0 },
    cellEnd: { type: Date, required: !0 }
  },
  emits: ["event-drag-start", "event-drag-end", "event-resize-start", "event-resize-end"],
  setup(h, { emit: t }) {
    const c = h, { config: r, view: p, dnd: Y, touch: W, dateUtils: f, eventsManager: L } = He("vuecal"), { handleEventResize: U } = L, P = ce(null), l = be(c.event), z = be({
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
    }), A = M(() => r.editableEvents.drag && l.draggable !== !1 && !l.background && z.canTouchAndDrag !== !1), m = M(() => p.isMonth || p.isYear || p.isYears || c.inAllDayBar || l._.multiday && !n.value ? !1 : r.time && r.editableEvents.resize && l.resizable !== !1 && !l.background);
    M(() => r.editableEvents.delete && l.deletable !== !1 && !l.background);
    const u = M(() => {
      var y, v, D, d, i;
      return {
        [`vuecal__event--${l._.id}`]: !0,
        [l.class]: !!l.class,
        "vuecal__event--recurring": !!l.recurring,
        "vuecal__event--background": !!l.background,
        "vuecal__event--all-day": l.allDay || ((y = l._) == null ? void 0 : y.startMinutes) === 0 && ((v = l._) == null ? void 0 : v.duration) === 1440,
        "vuecal__event--multiday": !!((D = l._) != null && D.multiday),
        "vuecal__event--cut-top": !c.inAllDayBar && (((d = l._) == null ? void 0 : d.startMinutes) < r.timeFrom || l._.multiday && !S.value),
        "vuecal__event--cut-bottom": !c.inAllDayBar && (((i = l._) == null ? void 0 : i.endMinutes) > r.timeTo || l._.multiday && !n.value),
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !l._.draggingGhost && l._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": l._.draggingGhost,
        "vuecal__event--resizing": W.isResizingEvent
      };
    }), S = M(() => l._.multiday ? new Date(l.start).setHours(0, 0, 0, 0) === c.cellStart.getTime() : !0), n = M(() => l._.multiday ? f.isSameDate(new Date(new Date(l.end).setMilliseconds(-1)), c.cellEnd) : !0), I = M(() => {
      const y = new Date(l.start).setHours(0, 0, 0, 0), v = new Date(l.end).setHours(0, 0, 0, 0);
      return Math.ceil((v - y) / (1e3 * 60 * 60 * 24));
    }), e = M(() => {
      const y = (p.isDay || p.isDays || p.isWeek) && r.time && !c.inAllDayBar;
      if (!y && !l.backgroundColor && !l.color) return !1;
      const v = {
        backgroundColor: l.backgroundColor || null,
        color: l.color || null
      };
      if (y) {
        let D = l._.startMinutes, d = l._.endMinutes;
        l._.multiday && (S.value || (D = 0), n.value || (d = 1440));
        const i = Math.max(r.timeFrom, D), k = Math.min(r.timeTo, d) + (l._.duration && !d ? 1440 : 0), a = Oe(i, r), F = Oe(k, r) - a;
        v.top = `${a}%`, v.height = `${F}%`;
      }
      return v;
    }), C = M(() => {
      const y = { ...r.eventListeners.event };
      for (const [d, i] of Object.entries(y))
        ["resize-end"].includes(d) || (y[d] = (k) => {
          k.type !== "drop" && i(k.type ? { e: k, event: l } : k);
        });
      const v = { ...y };
      y.touchstart = (d) => {
        var i;
        d.stopPropagation(), z.touchAndDragTimer = setTimeout(() => {
          z.canTouchAndDrag = !0;
        }, 500), j(d), (i = v.touchstart) == null || i.call(v, { e: d, event: l });
      }, y.mousedown = (d) => {
        var i;
        d.stopPropagation(), j(d), (i = v.mousedown) == null || i.call(v, { e: d, event: l });
      };
      let D = null;
      return y.click = (d) => {
        var i;
        (i = v.click) == null || i.call(v, { e: d, event: l }), D ? D = clearTimeout(D) : D = setTimeout(() => {
          var k;
          D = null, (k = v["delayed-click"]) == null || k.call(v, { e: d, event: l });
        }, 400);
      }, y.dblclick = (d) => {
        v.dblclick ? v.dblclick({ e: d, event: l }) : l.delete(1);
      }, y;
    }), j = (y) => {
      var d, i, k;
      const v = ((d = y.touches) == null ? void 0 : d[0]) || y;
      z.fromResizer = v.target.matches(".vuecal__event-resizer, .vuecal__event-resizer *");
      const D = P.value.getBoundingClientRect();
      z.startX = (((i = y.touches) == null ? void 0 : i[0]) || y).clientX - D.left, z.startY = (((k = y.touches) == null ? void 0 : k[0]) || y).clientY - D.top, z.startPercentageX = z.startX * 100 / D.width, z.startPercentageY = z.startY * 100 / D.height, z.cellEl = P.value.closest(".vuecal__cell"), z.resizeStartDate = l.start, z.fromResizer && U(y, l, P.value), z.holdTimer = setTimeout(() => {
        var a, F;
        z.holding = !0, (F = (a = C.value).hold) == null || F.call(a, { e: y, event: l });
      }, 1e3);
    };
    return Ze(() => l._.register(P.value)), Ne(() => {
      l._.unregister();
    }), (y, v) => (O(), H("div", ie({ class: "vuecal__event" }, Xe(C.value, !0), {
      ref_key: "eventEl",
      ref: P,
      class: u.value,
      style: e.value,
      draggable: A.value ? "true" : void 0,
      onDragstart: v[2] || (v[2] = (D) => A.value && T(Y).eventDragStart(D, l)),
      onDragend: v[3] || (v[3] = (D) => A.value && T(Y).eventDragEnd(D, l))
    }), [
      me("div", qt, [
        y.$slots["event.all-day"] ? V(y.$slots, "event.all-day", {
          key: 0,
          event: l
        }) : y.$slots[`event.${T(p).id}`] ? V(y.$slots, `event.${T(p).id}`, {
          key: 1,
          event: l
        }) : V(y.$slots, "event", {
          key: 2,
          event: l
        }, () => [
          me("div", Gt, ue(l.title), 1),
          T(r).time && !h.inAllDayBar && !(l._.multiday && !S.value) ? (O(), H("div", Jt, [
            T(p).isMonth ? (O(), H("span", Ut, ",")) : Z("", !0),
            me("span", Zt, ue(l._[`startTimeFormatted${T(r).twelveHour ? 12 : 24}`]), 1),
            T(p).isMonth ? Z("", !0) : (O(), H("span", Kt, [
              qe(" - " + ue(l._[`endTimeFormatted${T(r).twelveHour ? 12 : 24}`]), 1),
              l._.multiday && S.value ? (O(), H("span", Qt, "+" + ue(I.value) + "d", 1)) : Z("", !0)
            ]))
          ])) : Z("", !0),
          h.inAllDayBar ? Z("", !0) : (O(), H("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: l.content
          }, null, 8, xt))
        ])
      ]),
      m.value ? (O(), H("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: v[0] || (v[0] = et(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : Z("", !0),
      Ve(Je, { name: "vuecal-delete-btn" }, {
        default: B(() => [
          l._.deleting ? (O(), H("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: v[1] || (v[1] = et((D) => l.delete(3), ["stop"]))
          }, "Delete")) : Z("", !0)
        ]),
        _: 1
      })
    ], 16, Xt));
  }
}, ea = ["innerHTML"], ta = ["data-schedule"], aa = {
  key: 1,
  class: "vuecal__cell-date"
}, na = {
  key: 2,
  class: "vuecal__cell-content"
}, sa = {
  key: 3,
  class: "vuecal__cell-events"
}, la = {
  key: 1,
  class: "vuecal__cell-date"
}, ra = {
  key: 2,
  class: "vuecal__cell-content"
}, oa = {
  key: 3,
  class: "vuecal__cell-events"
}, ia = {
  key: 5,
  class: "vuecal__cell-events-count"
}, ua = ["title"], kt = {
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
  setup(h) {
    const t = h, c = He("vuecal"), { view: r, config: p, dateUtils: Y, eventsManager: W, dnd: f, touch: L } = c, U = M(() => Y.isToday(t.start)), P = ce(null), l = ce([]), z = ce(!1), A = (o) => {
      l.value.push(o.detail), z.value = !0;
    }, m = () => setTimeout(() => z.value = !1, 300), u = be({
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
    }), S = ce(!1), n = ce({ cellOverlaps: {}, longestStreak: 0 }), I = M(() => {
      let o = Math.min(u.startPercentageY, u.movePercentageY), b = Math.max(u.startPercentageY, u.movePercentageY), E = je(o, p), _ = je(b, p);
      return p.snapToInterval && (E = Y.snapToInterval(E, p.snapToInterval), _ = Y.snapToInterval(_, p.snapToInterval), o = Oe(E, p), b = Oe(_, p)), {
        style: {
          top: `${o}%`,
          height: `${Math.abs(b - o)}%`
        },
        startMinutes: E,
        endMinutes: _,
        start: Y.formatMinutes(E),
        end: Y.formatMinutes(_),
        ...u.schedule ? { schedule: u.schedule } : {}
      };
    }), e = M(() => {
      const o = p.editableEvents.create && (u.dragging || S.value), b = p.eventCreateMinDrag && u.thresholdPassed || !p.eventCreateMinDrag, E = u.canTouchAndDrag !== !1;
      return o && b && E;
    }), C = M(() => {
      var oe;
      const o = /* @__PURE__ */ new Date(), b = r.start.getFullYear(), E = r.start.getMonth(), _ = t.start.getFullYear(), N = t.start.getMonth();
      return {
        [`vuecal__cell--${Ge[t.start.getDay()]}`]: r.isDay || r.isDays || r.isWeek || r.isMonth,
        [`vuecal__cell--${Yt[N]}`]: r.isYear,
        [`vuecal__cell--${_}`]: r.isYears,
        "vuecal__cell--today": U.value,
        "vuecal__cell--current-month": r.isYear && _ === o.getFullYear() && N === o.getMonth(),
        "vuecal__cell--current-year": r.isYears && _ === o.getFullYear(),
        "vuecal__cell--out-of-range": r.isMonth && (_ !== b || N !== E),
        "vuecal__cell--before-min": K.value && F.value,
        "vuecal__cell--after-max": K.value && q.value,
        "vuecal__cell--disabled": K.value,
        "vuecal__cell--selected": r.selectedDate && r.selectedDate.getTime() >= t.start.getTime() && r.selectedDate.getTime() <= t.end.getTime(),
        "vuecal__cell--has-schedules": (oe = p.schedules) == null ? void 0 : oe.length,
        "vuecal__cell--dragging": u.dragging,
        "vuecal__cell--has-events": y.value.length
      };
    });
    M(() => Y.formatDate(t.start));
    const j = M(() => {
      switch (r.id) {
        case "day":
          return "";
        case "days":
          return p.availableViews.days.rows > 1 && Y.formatDate(t.start, "D"), "";
        case "week":
          return "";
        case "month":
          return Y.formatDate(t.start, "D");
        case "year":
          return Y.formatDate(t.start, p.xs ? "MMM" : "MMMM");
        case "years":
          return Y.formatDate(t.start, "YYYY");
      }
    }), y = M(() => p.datePicker ? [] : W.getEventsInRange(
      t.start,
      t.end,
      { excludeIds: l.value, ...p.allDayEvents ? { allDay: t.allDay } : {} }
    )), v = M(() => y.value.filter((o) => !o.background)), D = M(() => {
      var o;
      return (o = p.schedules) == null ? void 0 : o.reduce((b, E) => (b[E.id] = y.value.filter((_) => _.schedule === E.id), b), {});
    }), d = M(() => {
      if (r.isMonth || r.isYear || r.isYears || t.allDay) return {};
      const o = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", b = {};
      for (const E of y.value) {
        const _ = E._.id, { maxConcurrent: N = 1, position: G = 0 } = n.value.cellOverlaps[_] || {}, oe = o ? "right" : "left";
        b[_] = { [oe]: `${100 / N * G}%` }, p.stackEvents ? b[_].width = `${100 / N + (G === N - 1 ? 0 : 15)}%` : b[_].width = `${100 / N}%`;
      }
      return b;
    }), i = M(() => {
      const o = {};
      for (const b of y.value) {
        const E = b._.id, { maxConcurrent: _ = 1, position: N = 0 } = n.value.cellOverlaps[E] || {};
        o[E] = `vuecal__event--stack-${N + 1}-${_}`;
      }
      return o;
    }), k = M(() => p.showCellEventCount && v.value.length), a = M(() => {
      var E;
      if (!p.specialHours || r.isMonth || r.isYear || r.isYears || t.allDay) return;
      const o = Ge[t.start.getDay()];
      let b = (E = p.specialHours) == null ? void 0 : E[o];
      if (b)
        return Array.isArray(b) || (b = [b]), b.map((_) => {
          let { from: N, to: G, class: oe, label: pe } = _;
          if (isNaN(N) || isNaN(G) || p.timeFrom >= G || p.timeTo <= N) return;
          N = Math.max(p.timeFrom, N), G = Math.min(p.timeTo, G);
          const g = Oe(N, p), R = Oe(G, p) - g;
          return {
            style: { top: `${g}%`, height: `${R}%` },
            label: pe,
            class: oe
          };
        }).filter((_) => !!_);
    }), F = M(() => p.minTimestamp !== null && p.minTimestamp > t.end.getTime()), q = M(() => p.maxTimestamp && p.maxTimestamp < t.start.getTime()), K = M(() => {
      const { disableDays: o } = p, b = r.isYear || r.isYears;
      return o.length && o.includes(Y.formatDate(t.start)) && !b ? !0 : F.value || q.value;
    }), x = be({
      show: M(() => {
        if (!(!r.isDay && !r.isDays && !r.isWeek) && !(!U.value || !p.time || t.allDay) && !(p.timeFrom > Y.dateToMinutes(r.now)) && !(Y.dateToMinutes(r.now) > p.timeTo))
          return !0;
      }),
      nowInMinutes: M(() => Y.dateToMinutes(r.now)),
      todaysTimePosition: M(() => Oe(x.nowInMinutes, p)),
      style: M(() => `top: ${x.todaysTimePosition}%`),
      currentTime: M(() => Y.formatTime(r.now))
    }), te = M(() => {
      if (K.value) return {};
      const o = { ...p.eventListeners.cell };
      for (const [_, N] of Object.entries(o))
        o[_] = (G) => {
          var oe, pe, g;
          (g = (pe = G.target || ((oe = G.e) == null ? void 0 : oe.target)).closest) != null && g.call(pe, ".vuecal__event") || N(G.type ? { e: G, cell: X.value, cursor: ae.value } : G);
        };
      const b = { ...o };
      let E = null;
      return o.click = (_) => {
        var G;
        ve();
        const N = le(_);
        (G = b.click) == null || G.call(b, { e: _, cell: X.value, cursor: N }), E ? E = clearTimeout(E) : E = setTimeout(() => {
          var oe;
          E = null, (oe = b["delayed-click"]) == null || oe.call(b, { e: _, cell: X.value, cursor: N });
        }, 400);
      }, (p.time && r.isDay || r.isDays || r.isWeek) && (o.touchstart = (_) => {
        var N;
        s(_.e || _), (N = b.touchstart) == null || N.call(b, { e: _, cell: X.value, cursor: ae.value });
      }, o.mousedown = (_) => {
        var N;
        s(_.e || _), (N = b.mousedown) == null || N.call(b, { e: _, cell: X.value, cursor: ae.value });
      }), b.dblclick && (o.dblclick = (_) => {
        var N;
        (N = b.dblclick) == null || N.call(b, { e: _, cell: X.value, cursor: le(_) });
      }), p.editableEvents.drag && (o.dragenter = (_) => f.cellDragEnter(_, X.value), o.dragover = (_) => {
        _.preventDefault(), f.cellDragOver(_, X.value);
      }, o.dragleave = (_) => f.cellDragLeave(_, X.value), o.drop = (_) => f.cellDragDrop(_, X.value, t.allDay)), o;
    }), X = M(() => ({
      start: t.start,
      end: t.end,
      events: y,
      ...u.schedule ? { schedule: u.schedule } : {},
      goNarrower: () => r.narrower(),
      goBroader: () => r.broader(),
      broader: r.broaderView,
      narrower: r.narrowerView
    })), le = (o) => {
      var G;
      const b = (((G = o.touches) == null ? void 0 : G[0]) || o).clientY, { top: E } = P.value.getBoundingClientRect(), _ = Ke(b - E, P.value), N = new Date(t.start);
      return N.setMinutes(je(_, p)), { y: _, date: N };
    }, ae = M(() => {
      const o = je(u.movePercentageY || u.startPercentageY, p), b = new Date(t.start);
      return b.setMinutes(o), {
        x: u.movePercentageX || u.startPercentageX,
        y: u.movePercentageY || u.startPercentageY,
        date: b
      };
    }), ve = () => {
      r.updateSelectedDate(t.start), p.clickToNavigate && ((r.isMonth || r.isDays || r.isWeek) && p.availableViews.day ? r.switch("day") : r.isYear && p.availableViews.month ? r.switch("month") : r.isYears && p.availableViews.year && r.switch("year")), r.updateViewDate(t.start);
    }, s = (o) => {
      var _, N;
      const b = o.type === "touchstart";
      b ? (u.canTouchAndDrag = !1, u.touchAndDragTimer = setTimeout(() => {
        u.canTouchAndDrag = !0, (u.holding || u.dragging) && o.preventDefault();
      }, 500)) : u.canTouchAndDrag = !0, u.schedule = ~~o.target.dataset.schedule;
      const E = P.value.getBoundingClientRect();
      u.startX = (((_ = o.touches) == null ? void 0 : _[0]) || o).clientX - E.left, u.startY = (((N = o.touches) == null ? void 0 : N[0]) || o).clientY - E.top, u.startPercentageX = u.startX * 100 / E.width, u.startPercentageY = u.startY * 100 / E.height, u.thresholdPassed = !1, document.addEventListener(b ? "touchmove" : "mousemove", $, { passive: !b }), document.addEventListener(b ? "touchend" : "mouseup", w, { once: !0 }), u.holdTimer = setTimeout(() => {
        var G, oe;
        u.holding = !0, (oe = (G = te.value).hold) == null || oe.call(G, { e: o, cell: X.value, cursor: ae.value });
      }, 1e3);
    }, $ = (o) => {
      var _, N, G, oe, pe, g;
      const b = o.type === "touchmove";
      if (b && !u.canTouchAndDrag) {
        u.touchAndDragTimer && (clearTimeout(u.touchAndDragTimer), u.touchAndDragTimer = null), w(o);
        return;
      }
      b && o.preventDefault(), u.dragging || (L.isDraggingCell = !0, (N = (_ = te.value)["drag-start"]) == null || N.call(_, { e: o, cell: X.value, cursor: ae.value })), u.dragging = !0, u.holdTimer = clearTimeout(u.holdTimer), u.holding = !1;
      const E = P.value.getBoundingClientRect();
      u.moveX = (((G = o.touches) == null ? void 0 : G[0]) || o).clientX - E.left, u.moveY = (((oe = o.touches) == null ? void 0 : oe[0]) || o).clientY - E.top, u.movePercentageX = u.moveX * 100 / E.width, u.movePercentageY = u.moveY * 100 / E.height, p.eventCreateMinDrag && Math.abs(u.startY - u.moveY) > p.eventCreateMinDrag && (u.thresholdPassed = !0), (g = (pe = te.value).drag) == null || g.call(pe, { e: o, cell: X.value, cursor: ae.value });
    }, w = async (o) => {
      var E, _;
      const b = o.type === "touchend";
      document.removeEventListener(b ? "touchmove" : "mousemove", $, { passive: !1 }), u.touchAndDragTimer && (clearTimeout(u.touchAndDragTimer), u.touchAndDragTimer = null), u.dragging && ((_ = (E = te.value)["drag-end"]) == null || _.call(E, { e: o, cell: X.value, cursor: ae.value }), L.isDraggingCell = !1, p.editableEvents.create && u.canTouchAndDrag && (S.value = !0, await J(o), S.value = !1)), u.holdTimer = clearTimeout(u.holdTimer), u.holding = !1, u.dragging = !1, u.startX = 0, u.startY = 0, u.moveX = 0, u.moveY = 0, u.startPercentageX = 0, u.startPercentageY = 0, u.movePercentageX = 0, u.movePercentageY = 0, u.thresholdPassed = !1, u.schedule = null, u.canTouchAndDrag = null;
    }, J = async (o) => {
      var pe;
      if (!e.value) return;
      let { start: b, end: E, startMinutes: _, endMinutes: N } = I.value;
      b = new Date(t.start), b.setMinutes(_), E = new Date(t.start), E.setMinutes(N);
      let G = { ...I.value, start: b, end: E };
      const { create: oe } = p.eventListeners.event;
      if (typeof oe == "function") {
        const g = G;
        G = await new Promise((R) => oe({ e: o, event: G, cell: X.value, resolve: R, cursor: ae.value })), G && typeof G == "object" && r.createEvent(G), G && typeof G == "boolean" && r.createEvent(g);
      } else r.createEvent(G);
      (pe = navigator.vibrate) == null || pe.call(navigator, 200);
    }, ne = () => {
      var o;
      for (const b of Object.keys(te.value))
        (o = P.value) == null || o.removeEventListener(b, te.value[b]);
    }, fe = () => {
      n.value = W.getCellOverlappingEvents(t.start, t.end, t.allDay);
    };
    return he(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !r.isYears && !r.isYear && v.value.map((o) => `${o._.id}${o.start.getTime()}${o.end.getTime()}`).join(),
      async () => {
        await Ie(), fe();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Ne(async () => {
      for (const o of l.value) W.deleteEvent(o, 3);
      ne(), await Ie();
    }), (o, b) => (O(), H("div", ie({
      class: ["vuecal__cell", C.value],
      ref_key: "cellEl",
      ref: P
    }, Xe(te.value, !0)), [
      o.$slots.cell ? V(o.$slots, "cell", {
        key: 0,
        cell: X.value
      }) : Z("", !0),
      a.value ? (O(!0), H(de, { key: 1 }, we(a.value, (E, _) => (O(), H("div", {
        class: De(["vuecal__special-hours", E.class]),
        style: $e(E.style),
        innerHTML: E.label || ""
      }, null, 14, ea))), 256)) : Z("", !0),
      !o.$slots.cell && T(p).schedules ? (O(!0), H(de, { key: 2 }, we(T(p).schedules, (E) => (O(), H("div", {
        class: De(["vuecal__schedule vuecal__schedule--cell", E.class]),
        key: E.id,
        style: $e(E.style || null),
        "data-schedule": E.id
      }, [
        o.$slots["cell-events"] ? V(o.$slots, "cell-events", {
          key: 0,
          cell: X.value
        }) : Z("", !0),
        j.value || o.$slots["cell-date"] ? (O(), H("div", aa, [
          V(o.$slots, "cell-date", { cell: X.value }, () => [
            qe(ue(j.value), 1)
          ])
        ])) : Z("", !0),
        o.$slots["cell-content"] ? (O(), H("div", na, [
          V(o.$slots, "cell-content", { cell: X.value })
        ])) : Z("", !0),
        o.$slots["cell-events"] && y.value.length ? (O(), H("div", sa, [
          V(o.$slots, "cell-events", { cell: X.value })
        ])) : y.value.length || z.value ? (O(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: b[0] || (b[0] = (_) => z.value = !0),
          onAfterLeave: m,
          tag: "div"
        }, {
          default: B(() => [
            (O(!0), H(de, null, we(D.value[E.id], (_) => (O(), Se(st, {
              key: _._.id,
              event: _,
              onEventDeleted: A,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              style: $e(d.value[_._.id])
            }, Ce({ _: 2 }, [
              o.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: B((N) => [
                  V(o.$slots, "event.all-day", ie({ ref_for: !0 }, N))
                ]),
                key: "0"
              } : void 0,
              o.$slots[`event.${T(r).id}`] ? {
                name: `event.${T(r).id}`,
                fn: B((N) => [
                  V(o.$slots, `event.${T(r).id}`, ie({ ref_for: !0 }, N))
                ]),
                key: "1"
              } : void 0,
              o.$slots.event ? {
                name: "event",
                fn: B((N) => [
                  V(o.$slots, "event", ie({ ref_for: !0 }, N))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "style"]))), 128))
          ]),
          _: 2
        }, 1024)) : Z("", !0),
        e.value && u.schedule === E.id && !t.allDay ? (O(), H("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: $e(I.value.style)
        }, ue(I.value.start) + " - " + ue(I.value.end), 5)) : Z("", !0)
      ], 14, ta))), 128)) : Z("", !0),
      !o.$slots.cell && !T(p).schedules ? (O(), H(de, { key: 3 }, [
        o.$slots["cell-events"] ? V(o.$slots, "cell-events", {
          key: 0,
          cell: X.value
        }) : Z("", !0),
        j.value || o.$slots["cell-date"] ? (O(), H("div", la, [
          V(o.$slots, "cell-date", { cell: X.value }, () => [
            qe(ue(j.value), 1)
          ])
        ])) : Z("", !0),
        o.$slots["cell-content"] ? (O(), H("div", ra, [
          V(o.$slots, "cell-content", { cell: X.value })
        ])) : Z("", !0),
        o.$slots["cell-events"] && y.value.length ? (O(), H("div", oa, [
          V(o.$slots, "cell-events", { cell: X.value })
        ])) : !(T(r).isMonth && !T(p).eventsOnMonthView) && !T(r).isYear && !T(r).isYears && (y.value.length || z.value) ? (O(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: b[1] || (b[1] = (E) => z.value = !0),
          onAfterLeave: m,
          tag: "div"
        }, {
          default: B(() => [
            (O(!0), H(de, null, we(y.value, (E) => (O(), Se(st, {
              key: E._.id,
              event: E,
              onEventDeleted: A,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              class: De(i.value[E._.id]),
              style: $e(d.value[E._.id])
            }, Ce({ _: 2 }, [
              o.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: B((_) => [
                  V(o.$slots, "event.all-day", ie({ ref_for: !0 }, _))
                ]),
                key: "0"
              } : void 0,
              o.$slots[`event.${T(r).id}`] ? {
                name: `event.${T(r).id}`,
                fn: B((_) => [
                  V(o.$slots, `event.${T(r).id}`, ie({ ref_for: !0 }, _))
                ]),
                key: "1"
              } : void 0,
              o.$slots.event ? {
                name: "event",
                fn: B((_) => [
                  V(o.$slots, "event", ie({ ref_for: !0 }, _))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "class", "style"]))), 128))
          ]),
          _: 3
        })) : Z("", !0),
        e.value ? (O(), H("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: $e(I.value.style)
        }, ue(I.value.start) + " - " + ue(I.value.end), 5)) : Z("", !0)
      ], 64)) : Z("", !0),
      o.$slots["event-count"] ? V(o.$slots, "event-count", {
        key: 4,
        events: v.value
      }) : k.value ? (O(), H("div", ia, ue(v.value.length), 1)) : Z("", !0),
      x.show ? (O(), H("div", {
        key: 6,
        class: "vuecal__now-line",
        style: $e(x.style),
        title: x.currentTime
      }, [
        me("span", null, ue(x.currentTime), 1)
      ], 12, ua)) : Z("", !0)
    ], 16));
  }
}, ca = {
  key: 0,
  class: "vuecal__headings"
}, da = {
  key: 0,
  class: "vuecal__weekdays-headings"
}, va = ["onClick"], fa = { class: "vuecal__weekday-day" }, ma = {
  key: 0,
  class: "vuecal__weekday-date"
}, ga = {
  key: 1,
  class: "vuecal__schedules-headings w-flex grow"
}, ha = ["innerHTML"], ya = {
  key: 2,
  class: "vuecal__all-day w-flex grow"
}, Da = {
  __name: "headings-bar",
  setup(h) {
    const t = He("vuecal"), c = He("$vuecalEl"), { view: r, config: p, dateUtils: Y } = t, W = M(() => p.xs ? "day-xs" : p.sm || r.isDays || r.isMonth ? "day-sm" : "day"), f = M(() => (r.isDay || r.isDays || r.isWeek || r.isMonth) && !(r.isDay && !p.schedules && !p.allDayEvents)), L = M(() => r.cellDates.slice(0, r.cols).map(({ start: l }) => ({
      id: Ge[l.getDay()],
      date: l,
      dateNumber: l.getDate(),
      day: Y.formatDate(l, "dddd"),
      "day-sm": Y.formatDate(l, "ddd"),
      "day-xs": Y.formatDate(l, "dd"),
      isToday: Y.isToday(l)
    }))), U = {
      click: (l) => {
        (r.isDays || r.isWeek) && r.updateSelectedDate(l);
      }
    }, P = {
      isResizing: ce(!1),
      startY: ce(0),
      initialHeight: ce(0),
      defaultHeight: 25,
      // Default height in pixels.
      // Cleanup event listeners.
      cleanup() {
        typeof document < "u" && (document.removeEventListener("mousemove", P.handleMouseMove), document.removeEventListener("mouseup", P.cleanup), document.removeEventListener("touchmove", P.handleTouchMove, { passive: !1 }), document.removeEventListener("touchend", P.cleanup)), P.isResizing.value = !1;
      },
      startResize(l) {
        var A;
        this.isResizing.value = !0, this.startY.value = l;
        const z = (A = c.value) == null ? void 0 : A.querySelector(".vuecal__all-day");
        z && (this.initialHeight.value = z.offsetHeight), document.addEventListener("mousemove", P.handleMouseMove), document.addEventListener("mouseup", P.cleanup), document.addEventListener("touchmove", P.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", P.cleanup);
      },
      // Update height based on mouse/touch movement.
      updateHeight(l) {
        var m;
        if (!this.isResizing.value) return;
        const z = l - this.startY.value, A = Math.max(20, this.initialHeight.value + z);
        (m = c.value) == null || m.style.setProperty("--vuecal-all-day-bar-height", `${A}px`);
      },
      // Mouse event handlers.
      handleMouseDown(l) {
        this.startResize(l.clientY);
      },
      handleMouseMove(l) {
        P.updateHeight(l.clientY);
      },
      // Touch event handlers.
      handleTouchStart(l) {
        var z;
        (z = l.touches) != null && z[0] && this.startResize(l.touches[0].clientY);
      },
      handleTouchMove(l) {
        var z;
        (z = l.touches) != null && z[0] && (P.updateHeight(l.touches[0].clientY), l.preventDefault());
      }
    };
    return Ne(() => {
      P.cleanup();
    }), (l, z) => f.value ? (O(), H("div", ca, [
      T(r).isDay ? Z("", !0) : (O(), H("div", da, [
        (O(!0), H(de, null, we(L.value, (A, m) => (O(), H("div", {
          class: De(["vuecal__weekday", { "vuecal__weekday--today": A.isToday }]),
          key: m,
          onClick: (u) => U.click(A.date)
        }, [
          V(l.$slots, "weekday-heading", {
            label: A[W.value],
            id: A.id,
            date: A.date
          }, () => [
            me("span", fa, ue(A[W.value]), 1),
            T(r).isMonth ? Z("", !0) : (O(), H("strong", ma, ue(A.dateNumber), 1))
          ])
        ], 10, va))), 128))
      ])),
      T(p).schedules ? (O(), H("div", ga, [
        (O(!0), H(de, null, we(L.value, (A, m) => (O(), H(de, { key: m }, [
          (O(!0), H(de, null, we(T(p).schedules, (u, S) => (O(), H(de, { key: S }, [
            l.$slots["schedule-heading"] ? (O(), H("div", {
              key: 0,
              class: De(["vuecal__schedule vuecal__schedule--heading", u.class])
            }, [
              V(l.$slots, "schedule-heading", {
                schedule: u,
                view: T(r)
              })
            ], 2)) : (O(), H("div", {
              key: 1,
              class: De(["vuecal__schedule vuecal__schedule--heading", u.class]),
              innerHTML: u.label
            }, null, 10, ha))
          ], 64))), 128))
        ], 64))), 128))
      ])) : Z("", !0),
      T(p).allDayEvents ? (O(), H("div", ya, [
        (O(!0), H(de, null, we(L.value, (A, m) => (O(), Se(kt, {
          class: De(["vuecal__all-day-cell", { "vuecal__weekday--today": A.isToday }]),
          key: m,
          start: A.date,
          end: new Date(A.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: m,
          "all-day": ""
        }, Ce({ _: 2 }, [
          l.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: B((u) => [
              V(l.$slots, "event.all-day", ie({ ref_for: !0 }, u))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: B((u) => [
              V(l.$slots, "event", ie({ ref_for: !0 }, u))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        me("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: z[0] || (z[0] = (...A) => P.handleMouseDown && P.handleMouseDown(...A)),
          onTouchstart: z[1] || (z[1] = (...A) => P.handleTouchStart && P.handleTouchStart(...A))
        }, null, 32)
      ])) : Z("", !0)
    ])) : Z("", !0);
  }
}, pa = { class: "vuecal__time-column" }, wa = {
  key: 0,
  class: "vuecal__all-day-label"
}, _a = {
  __name: "time-column",
  setup(h) {
    const t = He("vuecal"), { config: c, texts: r } = t, p = M(() => {
      const Y = [];
      for (let f = c.timeFrom; f < c.timeTo; f += c.timeStep) {
        const L = f + c.timeStep > c.timeTo, U = ~~(f / 60), P = f % 60, l = r[f < 720 ? "am" : "pm"];
        let z = null;
        L && (z = `calc(var(--vuecal-time-cell-height) * ${(c.timeTo - f) / c.timeStep})`), Y.push({
          minutesSum: f,
          // The sum of hours + minutes in minutes.
          hours: U,
          minutes: P,
          formatted12: `${U % 12 ? U % 12 : 12}${P ? `:${P.toString().padStart(2, 0)}` : ""}${l}`,
          formatted24: `${U.toString().padStart(2, 0)}:${P.toString().padStart(2, 0)}`,
          height: z
        });
      }
      return Y;
    });
    return (Y, W) => (O(), H("div", pa, [
      T(c).allDayEvents ? (O(), H("div", wa, [
        V(Y.$slots, "all-day-label", {}, () => [
          qe(ue(T(t).texts.allDay), 1)
        ])
      ])) : Z("", !0),
      (O(!0), H(de, null, we(p.value, (f, L) => (O(), H("div", {
        class: "vuecal__time-cell",
        key: L,
        style: $e({ height: f.height || null })
      }, [
        V(Y.$slots, "time-cell", {
          index: L,
          minutes: f.minutes,
          hours: f.hours,
          minutesSum: f.minutesSum,
          format12: f.formatted12,
          format24: f.formatted24
        }, () => [
          me("label", null, ue(T(c).twelveHour ? f.formatted12 : f.formatted24), 1)
        ])
      ], 4))), 128))
    ]));
  }
}, ka = {
  __name: "body",
  setup(h) {
    const t = He("vuecal"), { view: c, config: r, dateUtils: p, touch: Y, eventsManager: W } = t, f = ce(null), L = ce(null), { resizeState: U } = W, P = M(() => ({
      "--vuecal-grid-columns": c.cols,
      "--vuecal-grid-rows": c.rows,
      "--vuecal-body-max-height": r.time ? `${r.timeCellHeight * (r.timeTo - r.timeFrom) / r.timeStep}px` : null
    })), l = M(() => {
      const u = p.formatTime(je(L.value, r));
      return {
        style: { top: `${L.value}%` },
        time: u
      };
    }), z = (u) => {
      var C;
      if (c.isMonth || c.isYear || c.isYears) return;
      const S = ((C = u.touches) == null ? void 0 : C[0]) || u, { clientX: n, clientY: I } = S, { top: e } = f.value.getBoundingClientRect();
      L.value = Ke(I - e, f.value), Y.isResizingEvent && r.editableEvents.resizeX && (U.cellEl = m(n, I));
    }, A = () => {
      L.value = null;
    }, m = (u, S) => {
      const n = document.elementFromPoint(u, S);
      return console.log(n == null ? void 0 : n.closest(".vuecal__cell")), (n == null ? void 0 : n.closest(".vuecal__cell")) || null;
    };
    return Ze(() => {
      f.value.addEventListener("mousemove", z), f.value.addEventListener("touchmove", z), f.value.addEventListener("mouseleave", A), f.value.addEventListener("touchend", A);
    }), Ne(() => {
      f.value && (f.value.removeEventListener("mousemove", z), f.value.removeEventListener("touchmove", z), f.value.removeEventListener("mouseleave", A), f.value.removeEventListener("touchend", A));
    }), (u, S) => (O(), H("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: f,
      style: $e(P.value)
    }, [
      Ve(Je, { name: "vuecal-shrink" }, {
        default: B(() => [
          T(r).timeAtCursor && L.value !== null ? (O(), H("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: $e(l.value.style)
          }, [
            me("label", null, ue(l.value.time), 1)
          ], 4)) : Z("", !0)
        ]),
        _: 1
      }),
      (O(!0), H(de, null, we(T(c).cellDates, (n, I) => (O(), Se(kt, {
        key: I,
        start: n.start,
        end: n.end,
        index: I
      }, Ce({ _: 2 }, [
        u.$slots.cell ? {
          name: "cell",
          fn: B((e) => [
            V(u.$slots, "cell", ie({ ref_for: !0 }, e))
          ]),
          key: "0"
        } : void 0,
        u.$slots["cell-date"] ? {
          name: "cell-date",
          fn: B((e) => [
            V(u.$slots, "cell-date", ie({ ref_for: !0 }, e))
          ]),
          key: "1"
        } : void 0,
        u.$slots["cell-content"] ? {
          name: "cell-content",
          fn: B((e) => [
            V(u.$slots, "cell-content", ie({ ref_for: !0 }, e))
          ]),
          key: "2"
        } : void 0,
        u.$slots["cell-events"] ? {
          name: "cell-events",
          fn: B((e) => [
            V(u.$slots, "cell-events", ie({ ref_for: !0 }, e))
          ]),
          key: "3"
        } : void 0,
        u.$slots[`event.${T(c).id}`] ? {
          name: `event.${T(c).id}`,
          fn: B((e) => [
            V(u.$slots, `event.${T(c).id}`, ie({ ref_for: !0 }, e))
          ]),
          key: "4"
        } : void 0,
        u.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: B((e) => [
            V(u.$slots, "event.all-day", ie({ ref_for: !0 }, e))
          ]),
          key: "5"
        } : void 0,
        u.$slots.event ? {
          name: "event",
          fn: B((e) => [
            V(u.$slots, "event", ie({ ref_for: !0 }, e))
          ]),
          key: "6"
        } : void 0,
        u.$slots["event-count"] ? {
          name: "event-count",
          fn: B((e) => [
            V(u.$slots, "event-count", ie({ ref_for: !0 }, e))
          ]),
          key: "7"
        } : void 0
      ]), 1032, ["start", "end", "index"]))), 128))
    ], 4));
  }
}, $a = ["data-locale"], ba = { class: "vuecal__scrollable-wrap" }, Ta = {
  key: 1,
  class: "vuecal__week-numbers"
}, Ma = { class: "vuecal__week-number" }, Ea = { class: "vuecal__body-wrap" }, Sa = {
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
  setup(h, { expose: t, emit: c }) {
    const r = h, p = c, Y = Tt("vuecal-el"), W = Ht({ props: r, emit: p, attrs: Et(), vuecalEl: Y, uid: Mt() }), { config: f, view: L, dateUtils: U, touch: P } = W, l = M(() => f.time && (L.isDay || L.isDays || L.isWeek)), z = M(() => Array(L.rows).fill().map((n, I) => U.getWeek(U.addDays(L.firstCellDate, 7 * I)))), A = M(() => {
      var n;
      return {
        "vuecal--ready": f.ready,
        [`vuecal--${f.theme}-theme`]: f.theme,
        [`vuecal--${f.size}`]: !0,
        "vuecal--date-picker": f.datePicker,
        "vuecal--dark": f.dark,
        "vuecal--light": !f.dark,
        [`vuecal--${L.id}-view`]: !0,
        "vuecal--view-has-time": l.value,
        "vuecal--timeless": !f.time,
        "vuecal--dragging-cell": P.isDraggingCell,
        "vuecal--dragging-event": P.isDraggingEvent,
        "vuecal--resizing-event": P.isResizingEvent,
        "vuecal--has-schedules": (n = f.schedules) == null ? void 0 : n.length
      };
    }), m = M(() => ({
      "--vuecal-time-cell-height": f.timeCellHeight && `${f.timeCellHeight}px`
    })), u = M(() => {
      var n, I;
      return {
        "vuecal__scrollable--row": l.value || f.weekNumbers && L.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${L.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (n = f.schedules) == null ? void 0 : n.length,
        "vuecal__scrollable--no-schedules": !((I = f.schedules) != null && I.length),
        "vuecal__scrollable--no-all-day-bar": !f.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": f.allDayEvents
      };
    }), S = (n) => {
      n.target.closest(".vuecal__cell") && n.preventDefault();
    };
    return Ze(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && Y.value.addEventListener("contextmenu", S), await Ie(), f.ready = !0, p("ready", { config: f, view: L });
    }), Ne(() => {
      var n;
      (n = Y == null ? void 0 : Y.value) == null || n.removeEventListener("contextmenu", S);
    }), at("vuecal", W), at("$vuecalEl", Y), t({ view: W.view }), (n, I) => (O(), H("div", {
      class: De(["vuecal", A.value]),
      ref: "vuecal-el",
      "data-locale": n.locale,
      style: $e(m.value)
    }, [
      n.$slots.diy ? V(n.$slots, "diy", {
        key: 0,
        vuecal: T(W)
      }) : (O(), H(de, { key: 1 }, [
        Ve(It, null, Ce({ _: 2 }, [
          n.$slots.header ? {
            name: "header",
            fn: B((e) => [
              V(n.$slots, "header", se(re(e)))
            ]),
            key: "0"
          } : void 0,
          !n.$slots.header && n.$slots["previous-button"] ? {
            name: "previous-button",
            fn: B((e) => [
              V(n.$slots, "previous-button", se(re(e)))
            ]),
            key: "1"
          } : void 0,
          !n.$slots.header && n.$slots["next-button"] ? {
            name: "next-button",
            fn: B((e) => [
              V(n.$slots, "next-button", se(re(e)))
            ]),
            key: "2"
          } : void 0,
          !n.$slots.header && n.$slots["today-button"] ? {
            name: "today-button",
            fn: B((e) => [
              V(n.$slots, "today-button", se(re(e)))
            ]),
            key: "3"
          } : void 0,
          !n.$slots.header && n.$slots.title ? {
            name: "title",
            fn: B((e) => [
              V(n.$slots, "title", se(re(e)))
            ]),
            key: "4"
          } : void 0,
          !n.$slots.header && n.$slots["title.day"] ? {
            name: "title.day",
            fn: B((e) => [
              V(n.$slots, "title.day", se(re(e)))
            ]),
            key: "5"
          } : void 0,
          !n.$slots.header && n.$slots["title.days"] ? {
            name: "title.days",
            fn: B((e) => [
              V(n.$slots, "title.days", se(re(e)))
            ]),
            key: "6"
          } : void 0,
          !n.$slots.header && n.$slots["title.week"] ? {
            name: "title.week",
            fn: B((e) => [
              V(n.$slots, "title.week", se(re(e)))
            ]),
            key: "7"
          } : void 0,
          !n.$slots.header && n.$slots["title.month"] ? {
            name: "title.month",
            fn: B((e) => [
              V(n.$slots, "title.month", se(re(e)))
            ]),
            key: "8"
          } : void 0,
          !n.$slots.header && n.$slots["title.year"] ? {
            name: "title.year",
            fn: B((e) => [
              V(n.$slots, "title.year", se(re(e)))
            ]),
            key: "9"
          } : void 0,
          !n.$slots.header && n.$slots["title.years"] ? {
            name: "title.years",
            fn: B((e) => [
              V(n.$slots, "title.years", se(re(e)))
            ]),
            key: "10"
          } : void 0,
          !n.$slots.header && n.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: B((e) => [
              V(n.$slots, "schedule-heading", se(re(e)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        me("div", ba, [
          Ve(Je, {
            name: `vuecal-slide-fade--${T(L).transitionDirection}`
          }, {
            default: B(() => [
              (O(), H("div", {
                class: De(["vuecal__scrollable", u.value]),
                key: T(L).id + T(L).start.getTime()
              }, [
                l.value ? (O(), Se(_a, { key: 0 }, Ce({ _: 2 }, [
                  n.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: B((e) => [
                      V(n.$slots, "time-cell", se(re(e)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : Z("", !0),
                T(f).weekNumbers && T(L).isMonth ? (O(), H("div", Ta, [
                  (O(!0), H(de, null, we(z.value, (e) => (O(), H("div", Ma, [
                    V(n.$slots, "week-number", {}, () => [
                      me("small", null, ue(e), 1)
                    ])
                  ]))), 256))
                ])) : Z("", !0),
                me("div", Ea, [
                  Ve(Da, null, Ce({ _: 2 }, [
                    n.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: B((e) => [
                        V(n.$slots, "weekday-heading", se(re(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    n.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: B((e) => [
                        V(n.$slots, "schedule-heading", se(re(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    n.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: B((e) => [
                        V(n.$slots, "event.all-day", se(re(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    n.$slots.event ? {
                      name: "event",
                      fn: B((e) => [
                        V(n.$slots, "event", se(re(e)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  Ve(ka, null, Ce({ _: 2 }, [
                    n.$slots.cell ? {
                      name: "cell",
                      fn: B((e) => [
                        V(n.$slots, "cell", se(re(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    !n.$slots.cell && n.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: B((e) => [
                        V(n.$slots, "cell-date", se(re(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    !n.$slots.cell && n.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: B((e) => [
                        V(n.$slots, "cell-content", se(re(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    !n.$slots.cell && n.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: B((e) => [
                        V(n.$slots, "cell-events", se(re(e)))
                      ]),
                      key: "3"
                    } : void 0,
                    !n.$slots.cell && !n.$slots["cell-events"] && n.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: B((e) => [
                        V(n.$slots, "event.all-day", se(re(e)))
                      ]),
                      key: "4"
                    } : void 0,
                    !n.$slots.cell && !n.$slots["cell-events"] && n.$slots[`event.${T(L).id}`] ? {
                      name: `event.${T(L).id}`,
                      fn: B((e) => [
                        V(n.$slots, `event.${T(L).id}`, se(re(e)))
                      ]),
                      key: "5"
                    } : void 0,
                    !n.$slots.cell && !n.$slots["cell-events"] && n.$slots.event ? {
                      name: "event",
                      fn: B((e) => [
                        V(n.$slots, "event", se(re(e)))
                      ]),
                      key: "6"
                    } : void 0,
                    !n.$slots.cell && n.$slots["event-count"] ? {
                      name: "event-count",
                      fn: B((e) => [
                        V(n.$slots, "event-count", se(re(e)))
                      ]),
                      key: "7"
                    } : void 0
                  ]), 1024)
                ])
              ], 2))
            ]),
            _: 3
          }, 8, ["name"])
        ])
      ], 64))
    ], 14, $a));
  }
}, Ca = (h) => {
  Ae.texts = { ...ye.texts, ...h }, Ae.dateUtils.updateTexts(Ae.texts);
}, {
  addDatePrototypes: za,
  removeDatePrototypes: Oa,
  updateTexts: Va,
  addDays: ja,
  subtractDays: Ha,
  addHours: Pa,
  subtractHours: La,
  addMinutes: Fa,
  subtractMinutes: Aa,
  getWeek: Na,
  isToday: Ra,
  isSameDate: Ba,
  isInRange: Wa,
  isLeapYear: Ia,
  getPreviousFirstDayOfWeek: Xa,
  stringToDate: qa,
  dateToMinutes: Ga,
  countDays: Ja,
  datesInSameTimeStep: Ua,
  isValid: Za,
  formatDate: Ka,
  formatDateLite: Qa,
  formatTime: xa,
  formatTimeLite: en,
  formatMinutes: tn
} = Ae.dateUtils;
export {
  Sa as VueCal,
  za as addDatePrototypes,
  ja as addDays,
  Pa as addHours,
  Fa as addMinutes,
  Ja as countDays,
  Ga as dateToMinutes,
  Ua as datesInSameTimeStep,
  Ka as formatDate,
  Qa as formatDateLite,
  tn as formatMinutes,
  xa as formatTime,
  en as formatTimeLite,
  Xa as getPreviousFirstDayOfWeek,
  Na as getWeek,
  Wa as isInRange,
  Ia as isLeapYear,
  Ba as isSameDate,
  Ra as isToday,
  Za as isValidDate,
  Oa as removeDatePrototypes,
  qa as stringToDate,
  Ha as subtractDays,
  La as subtractHours,
  Aa as subtractMinutes,
  Va as updateTexts,
  Ca as useLocale
};
