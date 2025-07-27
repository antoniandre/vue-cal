import { computed as E, reactive as Te, watch as me, toRefs as bt, ref as ie, onBeforeUnmount as Ne, nextTick as Ie, inject as ze, createElementBlock as H, openBlock as V, renderSlot as j, createCommentVNode as U, unref as Y, Fragment as ue, renderList as we, normalizeClass as he, createElementVNode as ve, createVNode as je, Transition as qe, withCtx as I, createBlock as Se, resolveDynamicComponent as xe, mergeProps as re, toHandlers as Xe, normalizeProps as te, onMounted as Ze, toDisplayString as ce, withModifiers as et, normalizeStyle as $e, createTextVNode as Ue, TransitionGroup as tt, createSlots as Ce, useTemplateRef as Tt, useId as Mt, useAttrs as Yt, provide as at, guardReactiveProps as se } from "vue";
/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
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
}, Et = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Ge = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], St = Ge.reduce((p, e, c) => (p[e] = c || 7, p), {}), Ct = (p, e, c) => {
  const { dateUtils: o } = p, w = !1, $ = E(() => {
    if (F.value[e.view]) return e.view;
    const f = e.datePicker ? "month" : "week", k = e.view || f;
    return F.value[k] ? k : (console.warn(
      `Vue Cal: the provided or default view \`${k}\` is either invalid or not in the list of available views. The first available view will be chosen: \`${Object.keys(F.value)[0]}\`.`
    ), Object.keys(F.value)[0]);
  }), N = E(() => e.sm && !e.xs), m = E(() => e.xs || e.datePicker), P = E(() => e.clickToNavigate || e.datePicker && e.clickToNavigate !== !1), g = E(() => {
    const f = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, k = (O) => O.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [O, n] of Object.entries(c)) {
      const [B, G, ae] = O.match(/^on(Cell|Event)(.+)$/) || [];
      B && (f[G.toLowerCase()][k(ae).replace(/^-+|-+$/g, "")] = n);
    }
    return f;
  }), u = E(() => {
    var k;
    const f = {};
    return e.hideWeekends && (f[6] = !0) && (f[7] = !0), (k = e.hideWeekdays) != null && k.length && e.hideWeekdays.forEach((O) => f[St[O]] = !0), f;
  }), D = E(() => e.hideWeekends || u.value[6] && u.value[7]), F = E(() => {
    const f = e.datePicker;
    let k = 0, O = {};
    const n = e.views;
    return f && !n ? {
      month: { ...ge.availableViews.month },
      year: { ...ge.availableViews.year },
      years: { ...ge.availableViews.years }
    } : (n ? (Array.isArray(n) ? O = n.reduce((B, G) => (typeof G == "string" && ge.availableViews[G] ? B[G] = ge.availableViews[G] : k++, B), {}) : typeof n == "object" && (O = Object.entries(n).reduce((B, [G, ae]) => {
      const { cols: ne, rows: de } = ge.availableViews[G];
      return B[G] = { cols: ae.cols || ne, rows: ae.rows || de }, B;
    }, {})), k && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(O).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), O = { ...ge.availableViews })) : O = { ...ge.availableViews }, O);
  }), X = E(() => e.datePicker ? "month" : F.value.week ? "week" : Object.keys(F.value)[0]), t = E(() => {
    if (typeof e.selectedDate == "string") return o.stringToDate(e.selectedDate);
    if (e.selectedDate instanceof Date) return e.selectedDate;
    e.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", e.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), r = E(() => {
    if (!e.disableDays) return [];
    const f = [];
    if (Array.isArray(e.disableDays))
      for (let k of e.disableDays) {
        let O = k;
        typeof k == "string" ? O = o.stringToDate(k) : k instanceof Date && (k = o.formatDate(k, "YYYY-MM-DD")), O instanceof Date && !isNaN(O.getTime()) ? f.push(k) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", k);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", e.disableDays);
    return f;
  }), _ = E(() => {
    let f = null;
    return e.minDate && typeof e.minDate == "string" ? f = o.stringToDate(e.minDate) : e.minDate && e.minDate instanceof Date && (f = e.minDate), (f == null ? void 0 : f.getTime()) || null;
  }), a = E(() => {
    let f = null;
    return e.maxDate && typeof e.maxDate == "string" ? f = o.stringToDate(e.maxDate) : e.maxDate && e.maxDate instanceof Date && (f = e.maxDate), (f == null ? void 0 : f.getTime()) || null;
  }), z = E(() => {
    var O;
    const { view: f } = p;
    return e.schedules.length && (f.isDay || f.isDays || f.isWeek) && ((O = e.schedules) == null ? void 0 : O.map((n, B) => ({ ...n, id: n.id ?? B + 1 }))) || void 0;
  }), l = E(() => {
    const f = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return e.editableEvents === !0 ? f : e.editableEvents === !1 ? Object.keys(f).map((k) => f[k] = !1) : { ...f, ...e.editableEvents };
  }), A = E(() => {
    const { view: f } = p, { eventCount: k } = e;
    return (Array.isArray(k) ? k.includes(f.id) : k) && (f.isMonth && !e.eventsOnMonthView || f.isYear);
  }), M = E(() => e.allDayEvents && e.time !== !1 && !$.isMonth), d = E(() => e.timeAtCursor && e.time !== !1), v = async (f) => {
    var O;
    let k = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((n) => n.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((n) => n.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((n) => n.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((n) => n.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((n) => n.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((n) => n.default), "../i18n/da.json": () => import("./i18n/da.js").then((n) => n.default), "../i18n/de.json": () => import("./i18n/de.js").then((n) => n.default), "../i18n/el.json": () => import("./i18n/el.js").then((n) => n.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((n) => n.default), "../i18n/en-us.json": () => Promise.resolve().then(() => Lt).then((n) => n.default), "../i18n/es.json": () => import("./i18n/es.js").then((n) => n.default), "../i18n/et.json": () => import("./i18n/et.js").then((n) => n.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((n) => n.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((n) => n.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((n) => n.default), "../i18n/he.json": () => import("./i18n/he.js").then((n) => n.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((n) => n.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((n) => n.default), "../i18n/id.json": () => import("./i18n/id.js").then((n) => n.default), "../i18n/is.json": () => import("./i18n/is.js").then((n) => n.default), "../i18n/it.json": () => import("./i18n/it.js").then((n) => n.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((n) => n.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((n) => n.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((n) => n.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((n) => n.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((n) => n.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((n) => n.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((n) => n.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((n) => n.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((n) => n.default), "../i18n/no.json": () => import("./i18n/no.js").then((n) => n.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((n) => n.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((n) => n.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((n) => n.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((n) => n.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((n) => n.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((n) => n.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((n) => n.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((n) => n.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((n) => n.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((n) => n.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((n) => n.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((n) => n.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((n) => n.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((n) => n.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((n) => n.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((n) => n.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((n) => n.default) });
    {
      if (!k[`../i18n/${f}.json`]) {
        console.warn(`Vue Cal: the locale \`${f}\` does not exist. Falling back to \`en-us\`.`), f = "en-us";
        return;
      }
      k = await ((O = k[`../i18n/${f}.json`]) == null ? void 0 : O.call(k));
    }
    p.texts = Object.assign(p.texts, Object.assign({ ...ge.texts }, k)), o.updateTexts(p.texts);
  }, L = Te(e.events || []);
  return me(() => e.events, (f) => L.splice(0, L.length, ...f)), me(() => e.locale, (f) => v(f || "en-us")), (e.locale || !p.texts.today) && v(e.locale || "en-us"), {
    ...bt(e),
    events: L,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: g,
    defaultView: X,
    availableViews: F,
    disableDays: r,
    ready: w,
    sm: N,
    xs: m,
    clickToNavigate: P,
    hideWeekdays: u,
    hideWeekends: D,
    minTimestamp: _,
    maxTimestamp: a,
    schedules: z,
    selectedDate: t,
    editableEvents: l,
    showCellEventCount: A,
    allDayEvents: M,
    timeAtCursor: d,
    view: $,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(u.value).length;
    },
    get size() {
      return m.value ? "xs" : N.value ? "sm" : "lg";
    },
    loadTexts: v
  };
}, Oe = (p, e) => {
  const c = e.timeTo - e.timeFrom;
  return (p - e.timeFrom) * 100 / c;
}, Le = (p, e) => {
  const c = e.timeTo - e.timeFrom;
  return ~~(p * c / 100 + e.timeFrom);
}, Ke = (p, e) => {
  const c = e.clientHeight;
  return p * 100 / c;
}, Re = Te({ id: null, date: null });
let nt = !1, Je = !0;
const ke = Te({ el: null, cell: null, timeout: null }), _e = Te({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function Vt(p) {
  const { config: e, view: c, eventsManager: o, emit: w, uid: $, dateUtils: N } = p, m = (_) => {
    var v;
    const { timeStep: a, timeCellHeight: z, timeFrom: l } = e, A = (((v = _.touches) == null ? void 0 : v[0]) || _).clientY, { top: M } = _.currentTarget.getBoundingClientRect(), d = A - M - ~~_.dataTransfer.getData("cursor-grab-at");
    return Le(Ke(d, _.currentTarget), e);
  }, P = (_, a, z) => {
    const l = a.duration || g(a.start, a.end) || e.timeStep;
    let A = Math.max(m(_), 0);
    if (e.snapToInterval) {
      const L = A + e.snapToInterval / 2;
      A = L - L % e.snapToInterval;
    }
    const M = new Date(new Date(z).setMinutes(A)), d = Math.min(A + l, 1440), v = new Date(new Date(z).setMinutes(d));
    return { start: M, end: v };
  }, g = (_, a) => Math.round((a - _) / 6e4);
  return {
    eventDragStart: (_, a) => {
      if (_.target.nodeType === 3 || p.touch.isResizingEvent) return _.preventDefault();
      _.dataTransfer.effectAllowed = "move", _.dataTransfer.dropEffect = "move";
      const z = { ...a, _: { id: a._.id, duration: g(a.start, a.end) } };
      try {
        _.dataTransfer.setData("text/plain", ""), _.dataTransfer.setData("event", JSON.stringify(z)), _.dataTransfer.setData("cursor-grab-at", _.offsetY);
      } catch (A) {
        return console.warn("Vue Cal: Failed to set drag data:", A), _.preventDefault();
      }
      _e.eventId = a._.id, _e.fromVueCal = $, w("event-drag-start", {
        e: _,
        event: a
      });
      const l = _.target.closest(".vuecal__event");
      l.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        l.classList.add("vuecal__event--dragging-original"), l.classList.remove("vuecal__event--dragging-ghost");
      }, 0), nt = !1, Object.assign(Re, { id: c.id, date: c.firstCellDate }), Je = !0, p.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (_, a) => {
      _e.eventId = null, _.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: z, toVueCal: l } = _e;
      l && z !== l && o.deleteEvent(a._.id, 3), nt && Je && Re.id && c.switchView(Re.id, Re.date, !0), w("event-drag-end", {
        e: _,
        event: a,
        external: _e.fromVueCal !== $
      }), _e.fromVueCal = null, _e.toVueCal = null, p.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (_, a) => {
      const { start: z } = a, l = _.currentTarget;
      if (!_.currentTarget.contains(_.relatedTarget)) {
        if (l === ke.el || !l.className.includes("vuecal__cell-content")) return !1;
        ke.el && (ke.cell.highlighted = !1), Object.assign(ke, { el: l, cell: a, timeout: clearTimeout(ke.timeout) }), a.highlighted = !0, ["years", "year", "month"].includes(c.id) && (ke.timeout = setTimeout(() => p.switchToNarrowerView(z), 2e3));
      }
    },
    cellDragOver: (_, a) => {
      const { start: z, schedule: l } = a;
      _.preventDefault(), a.highlighted = !0, (l || l === 0) && (a.highlightedSchedule = l);
    },
    cellDragLeave: (_, a) => {
      _.preventDefault(), !_.currentTarget.contains(_.relatedTarget) && (a.highlightedSchedule = !1, ke.cell === a && (clearTimeout(ke.timeout), Object.assign(ke, { el: null, cell: null, timeout: null }), a.highlighted = !1));
    },
    cellDragDrop: async (_, a, z = !1) => {
      var O, n, B;
      _.preventDefault(), clearTimeout(ke.timeout), Object.assign(ke, { el: null, cell: null, timeout: null });
      const l = JSON.parse(_.dataTransfer.getData("event") || "{}");
      l.start && (l.start = new Date(l.start)), l.end && (l.end = new Date(l.end));
      let A, M, d;
      z ? (M = new Date(a.start), d = new Date(a.end)) : { start: M, end: d } = P(_, l, a.start);
      const { schedule: v } = ((O = _.target.closest("[data-schedule]")) == null ? void 0 : O.dataset) || {};
      let L = () => {
      };
      _e.fromVueCal === $ ? (A = o.getEvent(l._.id), A && (A._.dragging = !1, L = (G) => {
        if (A.start = M, A.end = d, A.allDay = z, v !== void 0 && (A.schedule = ~~v), G && typeof G == "object") {
          const { _: ae, ...ne } = G;
          Object.assign(A, ne);
        }
      })) : (A = {
        ...l,
        start: M,
        end: d,
        ...v !== void 0 && { schedule: ~~v },
        _: { id: ((n = l._) == null ? void 0 : n.id) || l.id, duration: g(M, d) },
        getOverlappingEvents: () => o.getEventsInRange(M, d, { schedule: ~~v })
      }, L = (G) => {
        if (A = o.createEvent(A), G && typeof G == "object") {
          const { _: ae, ...ne } = G;
          Object.assign(A, ne);
        }
      });
      let f = !0;
      const { drop: k } = (B = e.eventListeners) == null ? void 0 : B.event;
      k && (f = await k({
        e: _,
        event: { ...A, start: M, end: d, schedule: ~~v },
        overlaps: A.getOverlappingEvents({ start: M, end: d, schedule: ~~v }),
        cell: a,
        external: _e.fromVueCal !== $
      })), f !== !1 && L(f), a.highlighted = !1, a.highlightedSchedule = null, Je = !1, _e.toVueCal = $, w("event-dropped", {
        e: _,
        cell: a,
        event: A,
        originalEvent: l,
        external: _e.fromVueCal !== $
      });
    }
  };
}
const lt = (p, e) => {
  let c, o, w, $ = {}, N = {};
  const m = ie(p), P = () => {
    m.value.today || (m.value = e), Date.prototype.addDays = function(s) {
      return F(this, s || 0);
    }, Date.prototype.subtractDays = function(s) {
      return X(this, s || 0);
    }, Date.prototype.addHours = function(s) {
      return t(this, s || 0);
    }, Date.prototype.subtractHours = function(s) {
      return r(this, s || 0);
    }, Date.prototype.addMinutes = function(s) {
      return _(this, s || 0);
    }, Date.prototype.subtractMinutes = function(s) {
      return a(this, s || 0);
    }, Date.prototype.getWeek = function() {
      return l(this);
    }, Date.prototype.isToday = function() {
      return A(this);
    }, Date.prototype.isLeapYear = function() {
      return v(this);
    }, Date.prototype.format = function(s = "YYYY-MM-DD") {
      return G(this, s);
    }, Date.prototype.formatTime = function(s = "HH:mm") {
      return ne(this, s);
    };
  }, g = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, u = (s) => {
    m.value = s, Date.prototype.subtractDays && P();
  }, D = () => (o !== (/* @__PURE__ */ new Date()).getDate() && (c = /* @__PURE__ */ new Date(), o = c.getDate(), w = `${c.getFullYear()}-${c.getMonth()}-${c.getDate()}`), w), F = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setDate(y.getDate() + b), y;
  }, X = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setDate(y.getDate() - b), y;
  }, t = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setHours(y.getHours() + b), y;
  }, r = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setHours(y.getHours() - b), y;
  }, _ = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setMinutes(y.getMinutes() + b), y;
  }, a = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setMinutes(y.getMinutes() - b), y;
  }, z = (s, b) => {
    const y = (q) => {
      const K = q % b;
      return K !== 0 && (q += K >= b / 2 ? b - K : -K), q;
    };
    if (typeof s == "number") return y(s);
    if (s instanceof Date) {
      let q = y(s.getMinutes());
      q >= 60 && (s.setHours(s.getHours() + 1), q = 0), s.setMinutes(q, 0, 0);
    }
  }, l = (s, b = !1) => {
    const y = new Date(Date.UTC(s.getFullYear(), s.getMonth(), s.getDate())), q = y.getUTCDay() || 7;
    y.setUTCDate(y.getUTCDate() + 4 - q);
    const K = new Date(Date.UTC(y.getUTCFullYear(), 0, 1));
    return Math.ceil(((y - K) / 864e5 + 1) / 7) + (b ? 1 : 0);
  }, A = (s) => `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}` === D(), M = (s, b) => {
    if (!s || !b) return console.warn(`Vue Cal: missing date${s ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (B(s)) {
      if (!B(b)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${b}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${s}\`.`);
    return s.getFullYear() === b.getFullYear() && s.getMonth() === b.getMonth() && s.getDate() === b.getDate();
  }, d = (s, b, y) => B(s) ? s.getTime() >= b && s.getTime() <= y : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${s}\`.`), v = (s) => {
    const b = s.getFullYear();
    return !(b % 400) || b % 100 && !(b % 4);
  }, L = (s = null, b) => {
    const y = s && new Date(s.valueOf()) || /* @__PURE__ */ new Date(), q = b ? 7 : 6;
    return y.setDate(y.getDate() - (y.getDay() + q) % 7), y;
  }, f = (s) => s instanceof Date ? s : (s.length === 10 && (s += " 00:00"), new Date(s.replace(/-/g, "/"))), k = (s) => s.getHours() * 60 + s.getMinutes(), O = (s, b) => {
    typeof s == "string" && (s = s.replace(/-/g, "/")), typeof b == "string" && (b = b.replace(/-/g, "/")), s = new Date(s).setHours(0, 0, 0, 0), b = new Date(b).setHours(0, 0, 1, 0);
    const y = (new Date(b).getTimezoneOffset() - new Date(s).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((b - s - y) / (24 * 3600 * 1e3));
  }, n = (s, b, y) => Math.abs(s.getTime() - b.getTime()) <= y * 60 * 1e3, B = (s) => s && s instanceof Date && !isNaN(s), G = (s, b = "YYYY-MM-DD", y = null) => {
    if (y || (y = m.value), b || (b = "YYYY-MM-DD"), b === "YYYY-MM-DD") return ae(s);
    $ = {}, N = {};
    const q = {
      YYYY: () => ee(s, y).YYYY,
      YY: () => ee(s, y).YY(),
      M: () => ee(s, y).M,
      MM: () => ee(s, y).MM(),
      MMM: () => ee(s, y).MMM(),
      MMMM: () => ee(s, y).MMMM(),
      MMMMG: () => ee(s, y).MMMMG(),
      D: () => ee(s, y).D,
      DD: () => ee(s, y).DD(),
      S: () => ee(s, y).S(),
      d: () => ee(s, y).d,
      dd: () => ee(s, y).dd(),
      ddd: () => ee(s, y).ddd(),
      dddd: () => ee(s, y).dddd(),
      HH: () => oe(s, y).HH,
      H: () => oe(s, y).H,
      hh: () => oe(s, y).hh,
      h: () => oe(s, y).h,
      am: () => oe(s, y).am,
      AM: () => oe(s, y).AM,
      mm: () => oe(s, y).mm,
      m: () => oe(s, y).m,
      s: () => oe(s, y).s
    };
    return b.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (K, De) => {
      const i = q[De.replace(/\{|\}/g, "")];
      return i !== void 0 ? i() : De;
    });
  }, ae = (s) => {
    const b = s.getMonth() + 1, y = s.getDate();
    return `${s.getFullYear()}-${b < 10 ? "0" : ""}${b}-${y < 10 ? "0" : ""}${y}`;
  }, ne = (s, b = "HH:mm", y = null, q = !1) => {
    let K = !1;
    if (q) {
      const [S, C, T] = [s.getHours(), s.getMinutes(), s.getSeconds()];
      S + C + T === 141 && (K = !0);
    }
    if (s instanceof Date && b === "HH:mm") return K ? "24:00" : de(s);
    N = {}, y || (y = m.value);
    const De = oe(s, y), i = b.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (S, C) => {
      const T = De[C.replace(/\{|\}/g, "")];
      return T !== void 0 ? T : C;
    });
    return K ? i.replace("23:59", "24:00") : i;
  }, de = (s) => {
    const b = s.getHours(), y = s.getMinutes();
    return `${(b < 10 ? "0" : "") + b}:${(y < 10 ? "0" : "") + y}`;
  }, Z = (s) => {
    const b = Math.floor(s / 60).toString().padStart(2, 0), y = (s % 60).toString().padStart(2, 0);
    return `${b}:${y}`;
  }, ye = (s) => {
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
  }, ee = (s, b) => {
    if ($.D) return $;
    const y = s.getFullYear(), q = s.getMonth() + 1, K = s.getDate(), i = (s.getDay() - 1 + 7) % 7;
    return $ = {
      // Year.
      YYYY: y,
      // 2024.
      YY: () => y.toString().substring(2),
      // 24.
      // Month.
      M: q,
      // 1 to 12.
      MM: () => q.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => b.months[q - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => b.months[q - 1],
      // January to December.
      MMMMG: () => (b.monthsGenitive || b.months)[q - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: K,
      // 1 to 31.
      DD: () => K.toString().padStart(2, 0),
      // 01 to 31.
      S: () => ye(K),
      // st, nd, rd, th.
      // Day of the week.
      d: i + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => b.weekDaysShort.length ? b.weekDaysShort[i] : b.weekDays[i][0],
      // M to S.
      ddd: () => b.weekDaysShort.length ? b.weekDaysShort[i] : b.weekDays[i].substr(0, 3),
      // Mon to Sun.
      dddd: () => b.weekDays[i]
      // Monday to Sunday.
    }, $;
  }, oe = (s, b) => {
    if (N.am) return N;
    let y, q, K;
    s instanceof Date ? (y = s.getHours(), q = s.getMinutes(), K = s.getSeconds()) : (y = Math.floor(s / 60), q = Math.floor(s % 60));
    const De = y % 12 ? y % 12 : 12, i = (b || { am: "am", pm: "pm" })[y === 24 || y < 12 ? "am" : "pm"];
    return N = {
      H: y,
      h: De,
      HH: y.toString().padStart(2, 0),
      hh: De.toString().padStart(2, 0),
      am: i,
      AM: i.toUpperCase(),
      m: q,
      mm: q.toString().padStart(2, 0),
      s: K
    }, N;
  };
  return {
    addDatePrototypes: P,
    removeDatePrototypes: g,
    updateTexts: u,
    addDays: F,
    subtractDays: X,
    addHours: t,
    subtractHours: r,
    addMinutes: _,
    subtractMinutes: a,
    snapToInterval: z,
    getWeek: l,
    isToday: A,
    isSameDate: M,
    isInRange: d,
    isLeapYear: v,
    getPreviousFirstDayOfWeek: L,
    stringToDate: f,
    dateToMinutes: k,
    countDays: O,
    datesInSameTimeStep: n,
    isValid: B,
    formatDate: G,
    formatDateLite: ae,
    formatTime: ne,
    formatTimeLite: de,
    formatMinutes: Z
  };
}, Ot = (p) => {
  const { dateUtils: e, config: c } = p;
  let o = 0;
  const w = E(() => {
    var _, a, z, l, A;
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
    }, r = c.events.slice().sort((M, d) => M.start - d.start < 0 ? -1 : 1);
    for (const M of r) {
      const d = typeof M.start == "string" || typeof M.end == "string", v = !((_ = M._) != null && _.register) || !M.isOverlapping || !M.delete;
      let L = !1;
      if (!d && ((a = M._) != null && a.cachedStart) && ((z = M._) != null && z.cachedEnd) && (L = M.start.getTime() !== ((l = M._) == null ? void 0 : l.cachedStart) || M.end.getTime() !== ((A = M._) == null ? void 0 : A.cachedEnd)), d || v || L) {
        if (!$(M)) continue;
        N(M), M._.cachedStart = M.start.getTime(), M._.cachedEnd = M.end.getTime();
      }
      if (t.byId[M._.id] = M, M.recurring)
        t.recurring.push(M._.id);
      else if (M._.multiday)
        t.multiday.push(M._.id), t.byDate[M._.startFormatted] || (t.byDate[M._.startFormatted] = []), t.byDate[M._.startFormatted].push(M._.id);
      else {
        t.byDate[M._.startFormatted] || (t.byDate[M._.startFormatted] = []), t.byDate[M._.startFormatted].push(M._.id);
        const f = M._.startFormatted.substring(0, 4), k = M._.startFormatted.substring(5, 7), O = M._.startFormatted.substring(8, 10);
        t.byYear[f] || (t.byYear[f] = {}), t.byYear[f][k] || (t.byYear[f][k] = {}), t.byYear[f][k][O] || (t.byYear[f][k][O] = []), t.byYear[f][k][O].push(M._.id);
      }
    }
    return t;
  }), $ = (t) => !t.start || !t.end ? (console.error("Vue Cal: Event is missing start or end date", t), !1) : (typeof t.start == "string" && (t.start = e.stringToDate(t.start)), typeof t.end == "string" && (t.end = e.stringToDate(t.end)), t.start.setSeconds(0, 0), t.end.getSeconds() >= 59 ? t.end.setMinutes(t.end.getMinutes() + 1, 0, 0) : t.end.setSeconds(0, 0), isNaN(t.start) || isNaN(t.end) || t.end.getTime() < t.start.getTime() ? (isNaN(t.start) ? console.error(`Vue Cal: invalid start date for event "${t.title}".`, t.start) : isNaN(t.end) ? console.error(`Vue Cal: invalid end date for event "${t.title}".`, t.end) : console.error(`Vue Cal: invalid event dates for event "${t.title}". The event ends before it starts.`, t.start, t.end), !1) : !0), N = (t) => {
    t._ || (t._ = {}), t._.id = t._.id || ++o, t._.multiday = !e.isSameDate(t.start, new Date(t.end.getTime() - 1)), t._.startFormatted = e.formatDate(t.start), t._.startMinutes = ~~e.dateToMinutes(t.start), t._.endMinutes = ~~e.dateToMinutes(t.end);
    const r = t.start.getHours(), _ = t.start.getMinutes().toString().padStart(2, 0), a = t.end.getHours(), z = t.end.getMinutes().toString().padStart(2, 0);
    t._.startTimeFormatted24 = `${r.toString().padStart(2, 0)}:${_}`, t._.startTimeFormatted12 = `${r % 12 || 12}${_ ? `:${_}` : ""} ${r < 12 ? "AM" : "PM"}`, t._.endTimeFormatted24 = `${a.toString().padStart(2, 0)}:${z}`, t._.endTimeFormatted12 = `${a % 12 || 12}${z ? `:${z}` : ""} ${a < 12 ? "AM" : "PM"}`, t._.duration = Math.abs(~~((t.end - t.start) / 6e4)), t.delete || (t.delete = function(l) {
      return u(this._.id, l);
    }), t._.deleting === void 0 && (t._.deleting = !1), t._.deleted === void 0 && (t._.deleted = !1), t.isOverlapping || (t.isOverlapping = function(l = null) {
      return this.getOverlappingEvents(l).length;
    }), t.getOverlappingEvents || (t.getOverlappingEvents = function(l = null) {
      var v;
      const A = (l == null ? void 0 : l.start) || this.start, M = (l == null ? void 0 : l.end) || this.end, d = (v = c.schedules) != null && v.length ? ~~((l == null ? void 0 : l.schedule) || this.schedule) : null;
      return F(A, M, { excludeIds: [this._.id], schedule: d });
    }), t._.register || (t._.register = (l) => {
      t._.$el = l, t._.fireCreated && (p.emit("event-created", t), delete t._.fireCreated);
    }), t._.unregister || (t._.unregister = () => {
      t._.$el = null, t._.register = null, t.isOverlapping = null, t.getOverlappingEvents = null, t.delete = null;
    });
  }, m = (t) => w.value.byId[t], P = (t) => {
    const r = [];
    for (const { start: _, end: a } of t) {
      const z = F(_, a);
      z.length && r.push(...z);
    }
    return r;
  }, g = (t) => {
    if (!t.start || !t.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return c.snapToInterval && (e.snapToInterval(t.start, c.snapToInterval), e.snapToInterval(t.end, c.snapToInterval)), t = { ...t }, t._ || (t._ = {}), t._.id = ++o, t._.fireCreated = !0, c.events.push(t), t;
  }, u = async (t, r = 0) => {
    var A, M;
    if (!t) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let _ = typeof t == "string" || !isNaN(t) ? t : null;
    const a = typeof t == "object" ? Object.entries(t) : null;
    if (a) {
      const [d, v] = a[0];
      _ = (A = c.events.find((L) => L[d] === v)) == null ? void 0 : A._.id;
    }
    if (!c.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!_) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const z = c.events.findIndex((d) => d._.id === _);
    if (z === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${_}\`.`);
    const l = c.events[z];
    if (l.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${_}\` since it was explicitely set to \`delete: false\`.`);
    switch (r) {
      case 0:
        l._.deleting ? c.events.splice(z, 1) : l._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        l._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        l._.deleted = !0, c.events[z]._.deleted = !0, (M = l._.$el) == null || M.dispatchEvent(new CustomEvent("event-deleted", { detail: l._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        c.events.splice(z, 1), p.emit("update:events", c.events), p.emit("event-delete", l);
        break;
    }
    return !0;
  }, D = (t, r, _) => {
    const a = c.allDayEvents ? { allDay: _ } : {}, z = F(t, r, { background: !1, ...a });
    if (!z.length) return { cellOverlaps: {}, longestStreak: 0 };
    const l = {};
    let A = [], M = 0;
    z.sort((d, v) => d.start - v.start || d.end - d.start - (v.end - v.start));
    for (const d of z) {
      const v = d._.id;
      l[v] || (l[v] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), A = A.filter((n) => n.end > d.start);
      const L = A.filter((n) => {
        var G;
        return (!((G = c.schedules) != null && G.length) || d.schedule === n.schedule) && n.start < d.end;
      }), f = new Set(L.map((n) => {
        var B;
        return ((B = l[n._.id]) == null ? void 0 : B.position) ?? 0;
      }));
      let k = 0;
      for (; f.has(k); ) k++;
      l[v].position = k, A.push(d);
      const O = Math.max(1, ...L.map((n) => {
        var B;
        return ((B = l[n._.id]) == null ? void 0 : B.maxConcurrent) ?? 1;
      }));
      l[v].maxConcurrent = Math.max(L.length + 1, O);
      for (const n of L)
        l[n._.id].overlaps.add(v), l[v].overlaps.add(n._.id), l[n._.id].maxConcurrent = l[v].maxConcurrent;
      M = Math.max(M, l[v].maxConcurrent);
    }
    for (const d in l) l[d].overlaps = [...l[d].overlaps];
    return { cellOverlaps: l, longestStreak: M };
  }, F = (t, r, { excludeIds: _ = [], schedule: a = null, background: z = !0, allDay: l = !1 } = {}) => {
    if (!Object.keys(w.value.byId).length) return [];
    const A = t.getFullYear(), M = r.getFullYear(), d = t.getMonth() + 1, v = r.getMonth() + 1, L = t.getDate(), f = r.getDate(), k = t.getTime(), O = r.getTime(), n = [], B = new Set(_);
    for (let G = A; G <= M; G++) {
      const ae = `${G}`, ne = w.value.byYear[ae];
      if (!ne) continue;
      const de = G === A ? d : 1, Z = G === M ? v : 12;
      for (let ye = de; ye <= Z; ye++) {
        const ee = String(ye).padStart(2, "0"), oe = ne[ee];
        if (oe)
          for (const s in oe) {
            const b = +s;
            if (G === A && ye === d && b < L || G === M && ye === v && b > f) continue;
            const y = oe[s];
            if (y != null && y.length)
              for (let q = 0; q < y.length; q++) {
                const K = w.value.byId[y[q]];
                !K || B.has(K._.id) || a !== null && a !== K.schedule || z === !1 && K.background || c.allDayEvents && (l && !K.allDay || !l && K.allDay) || K.end.getTime() > k && K.start.getTime() < O && n.push(K);
              }
          }
      }
    }
    return n;
  };
  return {
    events: w,
    getEvent: m,
    getViewEvents: P,
    getCellOverlappingEvents: D,
    getEventsInRange: F,
    createEvent: g,
    deleteEvent: u,
    isEventInRange: (t, r, _) => {
      const a = t.allDay || !c.time, z = a ? new Date(t.start).setHours(0, 0, 0, 0) : t.start.getTime(), l = a ? new Date(t.end).setHours(23, 59, 59, 999) : t.end.getTime(), A = a ? new Date(r).setHours(0, 0, 0, 0) : r.getTime(), M = a ? new Date(_).setHours(23, 59, 59, 999) : _.getTime();
      return l > A && z < M;
    }
  };
}, jt = ({ config: p, dateUtils: e, emit: c, texts: o, eventsManager: w }, $) => {
  const { availableViews: N } = p, m = ie(p.view && N[p.view] ? p.view : p.defaultView), P = ie(p.selectedDate || null), g = ie(/* @__PURE__ */ new Date()), u = ie(new Date(p.viewDate || g.value));
  u.value.setHours(0, 0, 0, 0);
  const D = ie(new Date(u));
  let F = null;
  const X = E(() => m.value === "month" ? D.value : v.value), t = E(() => m.value === "month" ? new Date(D.value.getFullYear(), D.value.getMonth() + 1, 0, 23, 59, 59, 999) : f.value), r = E(() => m.value === "week" ? e.getPreviousFirstDayOfWeek(v.value, p.startWeekOnSunday) : m.value === "month" ? v.value : X.value), _ = E(() => {
    if (m.value === "week") {
      const h = e.addDays(r.value, 7);
      return h.setMilliseconds(-1), h;
    }
    return m.value === "month" ? f.value : t.value;
  }), a = E(() => {
    const h = g.value.getTime();
    if (m.value === "week")
      return r.value.getTime() <= h && h <= _.value.getTime();
    const R = v.value.getTime(), x = f.value.getTime();
    return R <= h && h <= x;
  });
  function z() {
    g.value = /* @__PURE__ */ new Date(), F = setTimeout(z, 60 * 1e3);
  }
  function l() {
    F = setTimeout(z, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), z();
  }
  const A = E(() => {
    if (!p.availableViews[m.value]) return 1;
    let h = p.availableViews[m.value].cols;
    return p.hasHiddenDays && ["week", "month"].includes(m.value) && (h -= p.hasHiddenDays), h;
  }), M = E(() => {
    var h;
    return ((h = p.availableViews[m.value]) == null ? void 0 : h.rows) || 1;
  }), d = E(() => A.value * M.value), v = E(() => {
    if (m.value === "month") {
      let h = D.value.getDay() || 7;
      return p.startWeekOnSunday && !p.hideWeekdays[7] && (h += 1), p.viewDayOffset && (h -= p.viewDayOffset), e.subtractDays(D.value, h - 1);
    }
    if (m.value === "week") {
      const h = "1234567".split("").filter((x) => !Object.keys(p.hideWeekdays).includes(x));
      let R = Math.min(...h);
      return p.startWeekOnSunday && !p.hideWeekdays[7] && (R = 1), p.viewDayOffset && (R += p.viewDayOffset), e.addDays(D.value, R - 1);
    }
    return D.value;
  }), L = E(() => {
    const h = [], R = ["days", "week", "month"].includes(m.value);
    let x = 0;
    for (let Q = 0; Q < d.value + x; Q++)
      switch (m.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const fe = e.addDays(v.value, Q), Be = fe.getDay() || 7;
          if (R && p.hasHiddenDays && p.hideWeekdays[Be]) {
            x++;
            continue;
          }
          const Ve = new Date(fe);
          Ve.setHours(23, 59, 59, 999), h.push({ start: fe, startFormatted: e.formatDate(fe), end: Ve });
          break;
        }
        case "year":
          h.push({
            start: new Date(v.value.getFullYear(), Q, 1, 0, 0, 0, 0),
            end: new Date(v.value.getFullYear(), Q + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          h.push({
            start: new Date(v.value.getFullYear() + Q, 0, 1, 0, 0, 0, 0),
            end: new Date(v.value.getFullYear() + Q + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return h;
  }), f = E(() => L.value[L.value.length - 1].end), k = ie("right"), O = E(() => {
    const h = Object.keys(p.availableViews);
    return h[h.indexOf(m.value) + 1];
  }), n = E(() => {
    const h = Object.keys(p.availableViews);
    return h[h.indexOf(m.value) - 1];
  });
  function B(h, R, x = !1) {
    if (!R || !R[h]) return h + 1;
    const Q = R[h];
    return x && typeof Q == "string" ? Q.substring(0, 3) : Q;
  }
  function G(h, R, x) {
    const { monthsArray: Q, monthBeforeDay: fe, canTruncate: Be, xs: Ve } = x, Me = h.getMonth(), Ye = h.getFullYear(), Ee = R.getMonth(), He = R.getFullYear(), We = Me !== Ee, $t = Ye !== He, be = Be && (Ve || We), Pe = h.getDate(), Fe = R.getDate();
    return $t ? fe ? `${B(Me, Q, be)} ${Pe}, ${Ye} - ${B(Ee, Q, be)} ${Fe}, ${He}` : `${Pe} ${B(Me, Q, be)} ${Ye} - ${Fe} ${B(Ee, Q, be)} ${He}` : We ? fe ? `${B(Me, Q, be)} ${Pe} - ${B(Ee, Q, be)} ${Fe}, ${Ye}` : `${Pe} ${B(Me, Q, be)} - ${Fe} ${B(Ee, Q, be)} ${Ye}` : fe ? `${B(Me, Q, be)} ${Pe}-${Fe}, ${Ye}` : `${Pe}-${Fe} ${B(Me, Q, be)} ${Ye}`;
  }
  const ae = E(() => {
    const { dateFormat: h, months: R, monthsGenitive: x, week: Q, truncations: fe } = o, Be = p.locale, Ve = fe !== !1, Me = h.indexOf("M") < h.indexOf("D"), Ye = x && Be === "el" ? x : R;
    switch (m.value) {
      case "day":
        return e.formatDate(v.value, h);
      case "days":
      case "week": {
        const Ee = {
          monthsArray: Ye,
          monthBeforeDay: Me,
          canTruncate: Ve,
          xs: p.xs
        };
        let He = G(v.value, f.value, Ee);
        if (m.value === "week") {
          const We = e.getWeek(
            v.value,
            p.startWeekOnSunday && !p.hideWeekdays[7]
          );
          He += ` <small>${Q} ${We}</small>`;
        }
        return He;
      }
      case "month": {
        const Ee = `${p.xs && Ve ? "MMM" : "MMMM"} YYYY`;
        return e.formatDate(X.value, Ee);
      }
      case "year":
        return v.value.getFullYear();
      case "years":
        return `${v.value.getFullYear()} - ${t.value.getFullYear()}`;
    }
  });
  async function ne() {
    switch (D.value = new Date(u.value || g.value), D.value.setHours(0, 0, 0, 0), m.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        D.value = e.getPreviousFirstDayOfWeek(D.value, p.startWeekOnSunday && !p.hideWeekdays[7]);
        break;
      case "month":
        D.value = new Date(D.value.getFullYear(), D.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        D.value = new Date(D.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        D.value = new Date(D.value.getFullYear() - D.value.getFullYear() % d.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    g.value = /* @__PURE__ */ new Date(), p.ready && (await Ie(), c("view-change", {
      id: m.value,
      title: ae.value,
      start: X.value,
      end: t.value,
      extendedStart: r.value,
      extendedEnd: _.value,
      cellDates: L.value,
      containsToday: a.value,
      events: J.value
    }));
  }
  function de(h) {
    const R = m.value, x = p.availableViews[R];
    h[R] && JSON.stringify(h[R]) === JSON.stringify(x) || ne();
  }
  function Z(h, R = !0) {
    const x = Object.keys(p.availableViews);
    m.value !== h && (x.includes(h) ? (k.value = x.indexOf(h) < x.indexOf(m.value) ? "left" : "right", m.value = h, R && c("update:view", h), ne()) : console.warn(`Vue Cal: the \`${h}\` view is not available.`));
  }
  function ye() {
    O.value ? Z(O.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function ee() {
    n.value ? Z(n.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function oe() {
    b(!1);
  }
  function s() {
    b(!0);
  }
  function b(h = !0) {
    let R = new Date(u.value);
    switch (m.value) {
      case "day":
      case "days":
        h ? R = e.addDays(f.value, 1) : R = e.subtractDays(v.value, d.value);
        break;
      case "week": {
        h ? (R = e.addDays(_.value, 1), R.setHours(0, 0, 0, 0)) : R = e.subtractDays(r.value, d.value);
        break;
      }
      case "month": {
        const x = h ? 1 : -1;
        R = new Date(R.getFullYear(), R.getMonth() + x, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const x = h ? 1 : -1;
        R = new Date(R.getFullYear() + x, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const x = h ? d.value : -d.value;
        R = new Date(R.getFullYear() + x, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    q(R);
  }
  function y() {
    const h = /* @__PURE__ */ new Date();
    h.setHours(0, 0, 0, 0), q(h);
  }
  function q(h, R = !0, x = !1) {
    if (!e.isValid(h)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [Q, fe] = [v.value, f.value];
    m.value === "month" && ([Q, fe] = [X.value, t.value]), (!e.isInRange(h, Q, fe) || x) && (h.setHours(0, 0, 0, 0), k.value = h.getTime() < Q.getTime() ? "left" : "right", u.value = h, R && c("update:viewDate", h), ne());
  }
  function K(h, R = !0) {
    if (!e.isValid(h)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: x, isSameDate: Q } = e;
    (!P.value || !x(P.value) || !Q(h, P.value)) && (h.setHours(0, 0, 0, 0), P.value = h, R && c("update:selectedDate", h));
  }
  function De(h) {
    !h && !D.value.getDay() ? q(e.addDays(D.value, 1), !0, !0) : (k.value = "left", ne());
  }
  function i(h) {
    h && p.startWeekOnSunday && !D.value.getDay() ? q(e.addDays(D.value, 1), !0, !0) : !h && p.startWeekOnSunday && D.value.getDay() === 1 && q(e.subtractDays(D.value, 1), !0, !0);
  }
  function S() {
    console.log("toggling weekdays", p.hideWeekdays), ne();
  }
  function C(h) {
    var Q;
    const R = (Q = $.value) == null ? void 0 : Q.querySelector(".vuecal__scrollable"), x = h ? h * p.timeCellHeight / p.timeStep : 0;
    R == null || R.scrollTo({ top: x, behavior: "smooth" });
  }
  function T() {
    const h = /* @__PURE__ */ new Date();
    C(h.getHours() * 60 + h.getMinutes());
  }
  function W() {
    C(0);
  }
  const J = E(() => w.getViewEvents(L.value)), le = w.createEvent, pe = w.deleteEvent;
  return me(() => p.view, (h) => Z(h, !1)), me(() => p.availableViews, de), me(() => p.datePicker, () => Z("month")), me(() => p.viewDate, (h) => q(h, !1)), me(() => p.selectedDate, (h) => K(h, !1)), me(() => p.startWeekOnSunday, (h) => De(h)), me(() => p.hideWeekends, (h) => i(h)), me(() => p.hideWeekdays, S), me(() => d.value, () => {
    d.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), me(() => p.watchRealTime, (h) => {
    h && p.time ? l() : F = clearTimeout(F);
  }), ne(), p.time && p.watchRealTime && l(), Ne(() => F = clearTimeout(F)), {
    now: g,
    id: m,
    broaderView: O,
    narrowerView: n,
    title: ae,
    viewDate: u,
    start: X,
    end: t,
    extendedStart: r,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: _,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: v,
    lastCellDate: f,
    containsToday: a,
    selectedDate: P,
    cellDates: L,
    cols: A,
    rows: M,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: J,
    transitionDirection: k,
    switch: Z,
    broader: ye,
    narrower: ee,
    previous: oe,
    next: s,
    navigate: b,
    goToToday: y,
    updateViewDate: q,
    updateSelectedDate: K,
    scrollToCurrentTime: T,
    scrollToTime: C,
    scrollTop: W,
    createEvent: le,
    deleteEvent: pe,
    // Getters.
    get isDay() {
      return m.value === "day";
    },
    get isDays() {
      return m.value === "days";
    },
    get isWeek() {
      return m.value === "week";
    },
    get isMonth() {
      return m.value === "month";
    },
    get isYear() {
      return m.value === "year";
    },
    get isYears() {
      return m.value === "years";
    }
  };
}, rt = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], ot = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], it = "Years", ut = "Year", ct = "Month", dt = "Week", vt = "Days", ft = "Day", mt = "Today", gt = "No Event", ht = "All-day", yt = "Delete", Dt = "Create an event", pt = "dddd, MMMM D, YYYY", wt = "am", kt = "pm", Qe = {
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
  pm: kt
}, Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  pm: kt,
  today: mt,
  week: dt,
  weekDays: rt,
  year: ut,
  years: it
}, Symbol.toStringTag, { value: "Module" })), Ae = Te({
  texts: { ...ge.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: lt(ge.texts, Qe)
  // Some Date utils functions need localized texts.
}), zt = ({ props: p, emit: e, attrs: c, vuecalEl: o, uid: w }) => {
  const $ = Te({
    uid: w,
    // The Vuecal instance unique ID, used for dnd source-target identification.
    emit: e,
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
      isResizingEvent: !1
    }
  });
  return $.dateUtils = lt(Object.assign(ge.texts, $.texts), Qe), $.config = Ct($, p, c), $.eventsManager = Ot($), $.view = jt($, o), $.dnd = Vt($), $;
}, Ht = 1440, Pt = {
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
  // { drag: bool, resize: bool, create: bool, delete: bool }
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
  timeTo: { type: Number, default: Ht },
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
  // resizeX: { type: Boolean, default: false },
}, Ft = { class: "vuecal__header" }, At = {
  key: 0,
  class: "vuecal__views-bar"
}, Nt = ["onClick", "innerHTML"], Bt = {
  key: 1,
  class: "vuecal__title-bar"
}, Wt = { class: "vuecal__transition-wrap" }, Rt = ["disabled", "innerHTML"], It = {
  __name: "header",
  setup(p) {
    const e = ze("vuecal"), { view: c, config: o } = e, w = () => {
      o.clickToNavigate && c.broader();
    }, $ = E(() => o.clickToNavigate ? { click: w } : {});
    return (N, m) => (V(), H("div", Ft, [
      j(N.$slots, "header", {
        view: Y(c),
        availableViews: Y(o).availableViews,
        vuecal: Y(e)
      }),
      N.$slots.header ? U("", !0) : (V(), H(ue, { key: 0 }, [
        Y(o).viewsBar ? (V(), H("div", At, [
          (V(!0), H(ue, null, we(Y(o).availableViews, (P, g) => (V(), H("button", {
            class: he(["vuecal__view-button", { "vuecal__view-button--active": Y(c).id === g }]),
            onClick: (u) => Y(c).switch(g),
            innerHTML: Y(e).texts[g],
            type: "button"
          }, null, 10, Nt))), 256))
        ])) : U("", !0),
        Y(o).titleBar ? (V(), H("nav", Bt, [
          ve("button", {
            class: he(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !N.$slots["previous-button"] }]),
            onClick: m[0] || (m[0] = (...P) => Y(c).previous && Y(c).previous(...P)),
            type: "button"
          }, [
            j(N.$slots, "previous-button")
          ], 2),
          ve("div", Wt, [
            je(qe, {
              name: `vuecal-slide-fade--${Y(c).transitionDirection}`
            }, {
              default: I(() => [
                (V(), H("div", {
                  key: Y(c).id + Y(c).start.getTime()
                }, [
                  N.$slots.title || N.$slots[`title.${Y(c).id}`] ? (V(), Se(xe(Y(o).clickToNavigate && Y(c).broaderView ? "button" : "div"), re({
                    key: 0,
                    class: "vuecal__title"
                  }, Xe($.value)), {
                    default: I(() => [
                      N.$slots[`title.${Y(c).id}`] ? j(N.$slots, `title.${Y(c).id}`, te(re({ key: 0 }, Y(c)))) : j(N.$slots, "title", te(re({ key: 1 }, Y(c))))
                    ]),
                    _: 3
                  }, 16)) : (V(), Se(xe(Y(o).clickToNavigate && Y(c).broaderView ? "button" : "div"), re({
                    key: 1,
                    class: "vuecal__title"
                  }, Xe($.value), {
                    innerHTML: Y(c).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          Y(o).todayButton ? (V(), H(ue, { key: 0 }, [
            N.$slots["today-button"] ? j(N.$slots, "today-button", {
              key: 0,
              navigate: () => !Y(c).containsToday && Y(c).goToToday(),
              active: Y(c).containsToday
            }) : (V(), H("button", {
              key: 1,
              class: he(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": Y(c).containsToday }]),
              onClick: m[1] || (m[1] = (P) => !Y(c).containsToday && Y(c).goToToday()),
              disabled: !!Y(c).containsToday,
              type: "button",
              innerHTML: Y(e).texts.today
            }, null, 10, Rt))
          ], 64)) : U("", !0),
          ve("button", {
            class: he(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !N.$slots["next-button"] }]),
            onClick: m[2] || (m[2] = (...P) => Y(c).next && Y(c).next(...P)),
            type: "button"
          }, [
            j(N.$slots, "next-button")
          ], 2)
        ])) : U("", !0)
      ], 64))
    ]));
  }
}, Xt = ["draggable"], Gt = { class: "vuecal__event-details" }, qt = { class: "vuecal__event-title" }, Jt = {
  key: 0,
  class: "vuecal__event-time"
}, Ut = {
  key: 0,
  class: "vuecal__event-comma"
}, Zt = { class: "vuecal__event-start" }, Kt = {
  key: 1,
  class: "vuecal__event-end"
}, Qt = ["innerHTML"], st = {
  __name: "event",
  props: {
    event: { type: Object, required: !0 },
    inAllDayBar: { type: Boolean, default: !1 }
  },
  emits: ["event-drag-start", "event-drag-end", "event-resize-start", "event-resize-end"],
  setup(p, { emit: e }) {
    const { config: c, view: o, dnd: w, touch: $, dateUtils: N } = ze("vuecal"), m = p, P = ie(null), g = Te(m.event), u = Te({
      dragging: !1,
      resizing: !1,
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
      resizeStartDate: null,
      // When resizing and going above the start date (end before start) update the start instead of the end.
      resizingOriginalEvent: null,
      // Store the original event details while resizing.
      resizingLastAcceptedEvent: null,
      // Store the last accepted event details while resizing.
      cellEl: null,
      // Store the cell DOM node for a more efficient resizing calc in mousemove/touchmove.
      schedule: null
    }), D = E(() => c.editableEvents.drag && g.draggable !== !1 && !g.background && u.canTouchAndDrag !== !1), F = E(() => o.isMonth || o.isYear || o.isYears || m.inAllDayBar ? !1 : c.time && c.editableEvents.resize && g.resizable !== !1 && !g.background);
    E(() => c.editableEvents.delete && g.deletable !== !1 && !g.background);
    const X = E(() => {
      var d, v, L, f, k;
      return {
        [`vuecal__event--${g._.id}`]: !0,
        [g.class]: !!g.class,
        "vuecal__event--recurring": !!g.recurring,
        "vuecal__event--background": !!g.background,
        "vuecal__event--all-day": g.allDay || ((d = g._) == null ? void 0 : d.startMinutes) === 0 && ((v = g._) == null ? void 0 : v.duration) === 1440,
        "vuecal__event--multiday": !!((L = g._) != null && L.multiday),
        "vuecal__event--cut-top": !m.inAllDayBar && ((f = g._) == null ? void 0 : f.startMinutes) < c.timeFrom,
        "vuecal__event--cut-bottom": !m.inAllDayBar && ((k = g._) == null ? void 0 : k.endMinutes) > c.timeTo || g._.multiday,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !g._.draggingGhost && g._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": g._.draggingGhost,
        "vuecal__event--resizing": u.resizing
      };
    }), t = E(() => {
      const d = (o.isDay || o.isDays || o.isWeek) && c.time && !m.inAllDayBar;
      if (!d && !g.backgroundColor && !g.color) return !1;
      const v = {
        backgroundColor: g.backgroundColor || null,
        color: g.color || null
      };
      if (d) {
        const L = Math.max(c.timeFrom, g._.startMinutes), f = Math.min(c.timeTo, g._.endMinutes) + (g._.duration && !g._.endMinutes ? 1440 : 0), k = Oe(L, c), O = Oe(f, c) - k;
        v.top = `${k}%`, v.height = `${O}%`;
      }
      return v;
    }), r = E(() => {
      const d = { ...c.eventListeners.event };
      for (const [f, k] of Object.entries(d))
        ["resize-end"].includes(f) || (d[f] = (O) => {
          O.type !== "drop" && k(O.type ? { e: O, event: g } : O);
        });
      const v = { ...d };
      d.touchstart = (f) => {
        var k;
        f.stopPropagation(), u.touchAndDragTimer = setTimeout(() => {
          u.canTouchAndDrag = !0;
        }, 500), _(f), (k = v.touchstart) == null || k.call(v, { e: f, event: g });
      }, d.mousedown = (f) => {
        var k;
        f.stopPropagation(), _(f), (k = v.mousedown) == null || k.call(v, { e: f, event: g });
      };
      let L = null;
      return d.click = (f) => {
        var k;
        (k = v.click) == null || k.call(v, { e: f, event: g }), L ? L = clearTimeout(L) : L = setTimeout(() => {
          var O;
          L = null, (O = v["delayed-click"]) == null || O.call(v, { e: f, event: g });
        }, 400);
      }, d.dblclick = (f) => {
        v.dblclick ? v.dblclick({ e: f, event: g }) : g.delete(1);
      }, d;
    }), _ = (d) => {
      var f, k, O;
      const v = ((f = d.touches) == null ? void 0 : f[0]) || d;
      u.fromResizer = v.target.matches(".vuecal__event-resizer, .vuecal__event-resizer *");
      const L = P.value.getBoundingClientRect();
      u.startX = (((k = d.touches) == null ? void 0 : k[0]) || d).clientX - L.left, u.startY = (((O = d.touches) == null ? void 0 : O[0]) || d).clientY - L.top, u.startPercentageX = u.startX * 100 / L.width, u.startPercentageY = u.startY * 100 / L.height, u.cellEl = P.value.closest(".vuecal__cell"), u.resizeStartDate = g.start, M(d.type === "touchstart" ? "touchmove" : "mousemove", a, { passive: !u.fromResizer }), M(d.type === "touchstart" ? "touchend" : "mouseup", z, { once: !0 }), u.holdTimer = setTimeout(() => {
        var n, B;
        u.holding = !0, (B = (n = r.value).hold) == null || B.call(n, { e: d, event: g });
      }, 1e3);
    }, a = async (d) => {
      var L, f, k, O;
      const v = ((L = d.touches) == null ? void 0 : L[0]) || d;
      if (u.fromResizer && !u.resizing && (u.resizing = !0, u.resizingOriginalEvent = { ...g, _: { ...g._ } }, $.isResizingEvent = !0, (k = (f = r.value)["resize-start"]) == null || k.call(f, { e: d, event: g })), u.holdTimer = clearTimeout(u.holdTimer), u.holding = !1, u.cellEl) {
        const { top: n, left: B, width: G, height: ae } = u.cellEl.getBoundingClientRect();
        u.moveX = v.clientX - B, u.moveY = v.clientY - n, u.movePercentageX = u.moveX * 100 / G, u.movePercentageY = u.moveY * 100 / ae;
      }
      if (u.fromResizer) {
        const { newStart: n, newEnd: B } = l(g);
        let G = !0;
        const { resize: ae } = (O = c.eventListeners) == null ? void 0 : O.event;
        ae && (G = await ae({
          e: d,
          event: { ...g, start: n, end: B },
          overlaps: g.getOverlappingEvents({ start: n, end: B })
        })), G !== !1 ? (g.start = n, g.end = B, u.resizingLastAcceptedEvent && (u.resizingLastAcceptedEvent = null), d.preventDefault()) : ae && (u.resizingLastAcceptedEvent = { ...g, _: { ...g._ } });
      }
    }, z = async (d) => {
      var v, L;
      if (u.holdTimer = clearTimeout(u.holdTimer), u.holding = !1, u.resizing) {
        const { newStart: f, newEnd: k } = l(g);
        let O = !0;
        const n = r.value["resize-end"];
        n && (O = await n({
          e: d,
          event: g,
          original: u.resizingOriginalEvent,
          // Original event details before resizing.
          overlaps: g.getOverlappingEvents({ start: f, end: k })
        })), g.start = O === !1 ? (u.resizingLastAcceptedEvent || u.resizingOriginalEvent).start : ((v = u.resizingLastAcceptedEvent) == null ? void 0 : v.start) || f, g.end = O === !1 ? (u.resizingLastAcceptedEvent || u.resizingOriginalEvent).end : ((L = u.resizingLastAcceptedEvent) == null ? void 0 : L.end) || k, g._.duration < 1 && (g.start = u.resizingOriginalEvent.start, g.end = u.resizingOriginalEvent.end), $.isResizingEvent = !1;
      }
      document.removeEventListener(d.type === "touchend" ? "touchmove" : "mousemove", a, { passive: !u.fromResizer }), u.resizing = !1, u.fromResizer = !1, u.dragging = !1, u.startX = 0, u.startY = 0, u.moveX = 0, u.moveY = 0, u.startPercentageX = 0, u.startPercentageY = 0, u.movePercentageX = 0, u.movePercentageY = 0, u.cellEl = null, u.resizeStartDate = null, u.resizingOriginalEvent = null, u.resizingLastAcceptedEvent = null, u.schedule = null;
    }, l = (d) => {
      const v = new Date(d.start.getFullYear(), d.start.getMonth(), d.start.getDate());
      new Date(v).setDate(v.getDate() + 1);
      let f = Le(u.movePercentageY, c);
      if (f = Math.max(0, Math.min(f, 1440)), c.snapToInterval) {
        const n = f + c.snapToInterval / 2;
        f = n - n % c.snapToInterval;
      }
      let k = d.start, O = new Date(v.getTime() + f * 6e4);
      return O < u.resizeStartDate && (k = O, O = u.resizeStartDate), { newStart: k, newEnd: O };
    }, A = [], M = (d, v, L) => {
      document.addEventListener(d, v, L), A.push({ event: d, handler: v, options: L });
    };
    return Ze(() => g._.register(P.value)), Ne(() => {
      g._.unregister();
      for (const { event: d, handler: v, options: L } of A)
        document.removeEventListener(d, v, L);
    }), (d, v) => (V(), H("div", re({ class: "vuecal__event" }, Xe(r.value, !0), {
      ref_key: "eventEl",
      ref: P,
      class: X.value,
      style: t.value,
      draggable: D.value ? "true" : void 0,
      onDragstart: v[2] || (v[2] = (L) => D.value && Y(w).eventDragStart(L, g)),
      onDragend: v[3] || (v[3] = (L) => D.value && Y(w).eventDragEnd(L, g))
    }), [
      ve("div", Gt, [
        d.$slots["event.all-day"] ? j(d.$slots, "event.all-day", {
          key: 0,
          event: g
        }) : d.$slots[`event.${Y(o).id}`] ? j(d.$slots, `event.${Y(o).id}`, {
          key: 1,
          event: g
        }) : j(d.$slots, "event", {
          key: 2,
          event: g
        }, () => [
          ve("div", qt, ce(g.title), 1),
          Y(c).time && !p.inAllDayBar ? (V(), H("div", Jt, [
            Y(o).isMonth ? (V(), H("span", Ut, ",")) : U("", !0),
            ve("span", Zt, ce(g._[`startTimeFormatted${Y(c).twelveHour ? 12 : 24}`]), 1),
            Y(o).isMonth ? U("", !0) : (V(), H("span", Kt, " - " + ce(g._[`endTimeFormatted${Y(c).twelveHour ? 12 : 24}`]), 1))
          ])) : U("", !0),
          p.inAllDayBar ? U("", !0) : (V(), H("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: g.content
          }, null, 8, Qt))
        ])
      ]),
      F.value ? (V(), H("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: v[0] || (v[0] = et(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : U("", !0),
      je(qe, { name: "vuecal-delete-btn" }, {
        default: I(() => [
          g._.deleting ? (V(), H("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: v[1] || (v[1] = et((L) => g.delete(3), ["stop"]))
          }, "Delete")) : U("", !0)
        ]),
        _: 1
      })
    ], 16, Xt));
  }
}, xt = ["innerHTML"], ea = ["data-schedule"], ta = {
  key: 1,
  class: "vuecal__cell-date"
}, aa = {
  key: 2,
  class: "vuecal__cell-content"
}, na = {
  key: 3,
  class: "vuecal__cell-events"
}, sa = {
  key: 1,
  class: "vuecal__cell-date"
}, la = {
  key: 2,
  class: "vuecal__cell-content"
}, ra = {
  key: 3,
  class: "vuecal__cell-events"
}, oa = {
  key: 5,
  class: "vuecal__cell-events-count"
}, ia = ["title"], _t = {
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
  setup(p) {
    const e = p, c = ze("vuecal"), { view: o, config: w, dateUtils: $, eventsManager: N, dnd: m, touch: P } = c, g = E(() => $.isToday(e.start)), u = ie(null), D = ie([]), F = ie(!1), X = (i) => {
      D.value.push(i.detail), F.value = !0;
    }, t = () => setTimeout(() => F.value = !1, 300), r = Te({
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
    }), _ = ie(!1), a = ie({ cellOverlaps: {}, longestStreak: 0 }), z = E(() => {
      let i = Math.min(r.startPercentageY, r.movePercentageY), S = Math.max(r.startPercentageY, r.movePercentageY), C = Le(i, w), T = Le(S, w);
      return w.snapToInterval && (C = $.snapToInterval(C, w.snapToInterval), T = $.snapToInterval(T, w.snapToInterval), i = Oe(C, w), S = Oe(T, w)), {
        style: {
          top: `${i}%`,
          height: `${Math.abs(S - i)}%`
        },
        startMinutes: C,
        endMinutes: T,
        start: $.formatMinutes(C),
        end: $.formatMinutes(T),
        ...r.schedule ? { schedule: r.schedule } : {}
      };
    }), l = E(() => {
      const i = w.editableEvents.create && (r.dragging || _.value), S = w.eventCreateMinDrag && r.thresholdPassed || !w.eventCreateMinDrag, C = r.canTouchAndDrag !== !1;
      return i && S && C;
    }), A = E(() => {
      var le;
      const i = /* @__PURE__ */ new Date(), S = o.start.getFullYear(), C = o.start.getMonth(), T = e.start.getFullYear(), W = e.start.getMonth();
      return {
        [`vuecal__cell--${Ge[e.start.getDay()]}`]: o.isDay || o.isDays || o.isWeek || o.isMonth,
        [`vuecal__cell--${Et[W]}`]: o.isYear,
        [`vuecal__cell--${T}`]: o.isYears,
        "vuecal__cell--today": g.value,
        "vuecal__cell--current-month": o.isYear && T === i.getFullYear() && W === i.getMonth(),
        "vuecal__cell--current-year": o.isYears && T === i.getFullYear(),
        "vuecal__cell--out-of-range": o.isMonth && (T !== S || W !== C),
        "vuecal__cell--before-min": ae.value && B.value,
        "vuecal__cell--after-max": ae.value && G.value,
        "vuecal__cell--disabled": ae.value,
        "vuecal__cell--selected": o.selectedDate && o.selectedDate.getTime() >= e.start.getTime() && o.selectedDate.getTime() <= e.end.getTime(),
        "vuecal__cell--has-schedules": (le = w.schedules) == null ? void 0 : le.length,
        "vuecal__cell--dragging": r.dragging,
        "vuecal__cell--has-events": d.value.length
      };
    });
    E(() => $.formatDate(e.start));
    const M = E(() => {
      switch (o.id) {
        case "day":
          return "";
        case "days":
          return w.availableViews.days.rows > 1 && $.formatDate(e.start, "D"), "";
        case "week":
          return "";
        case "month":
          return $.formatDate(e.start, "D");
        case "year":
          return $.formatDate(e.start, w.xs ? "MMM" : "MMMM");
        case "years":
          return $.formatDate(e.start, "YYYY");
      }
    }), d = E(() => w.datePicker ? [] : N.getEventsInRange(
      e.start,
      e.end,
      { excludeIds: D.value, ...w.allDayEvents ? { allDay: e.allDay } : {} }
    )), v = E(() => d.value.filter((i) => !i.background)), L = E(() => {
      var i;
      return (i = w.schedules) == null ? void 0 : i.reduce((S, C) => (S[C.id] = d.value.filter((T) => T.schedule === C.id), S), {});
    }), f = E(() => {
      if (o.isMonth || o.isYear || o.isYears || e.allDay) return {};
      const i = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", S = {};
      for (const C of d.value) {
        const T = C._.id, { maxConcurrent: W = 1, position: J = 0 } = a.value.cellOverlaps[T] || {}, le = i ? "right" : "left";
        S[T] = { [le]: `${100 / W * J}%` }, w.stackEvents ? S[T].width = `${100 / W + (J === W - 1 ? 0 : 15)}%` : S[T].width = `${100 / W}%`;
      }
      return S;
    }), k = E(() => {
      const i = {};
      for (const S of d.value) {
        const C = S._.id, { maxConcurrent: T = 1, position: W = 0 } = a.value.cellOverlaps[C] || {};
        i[C] = `vuecal__event--stack-${W + 1}-${T}`;
      }
      return i;
    }), O = E(() => w.showCellEventCount && v.value.length), n = E(() => {
      var C;
      if (!w.specialHours || o.isMonth || o.isYear || o.isYears || e.allDay) return;
      const i = Ge[e.start.getDay()];
      let S = (C = w.specialHours) == null ? void 0 : C[i];
      if (S)
        return Array.isArray(S) || (S = [S]), S.map((T) => {
          let { from: W, to: J, class: le, label: pe } = T;
          if (isNaN(W) || isNaN(J) || w.timeFrom >= J || w.timeTo <= W) return;
          W = Math.max(w.timeFrom, W), J = Math.min(w.timeTo, J);
          const h = Oe(W, w), R = Oe(J, w) - h;
          return {
            style: { top: `${h}%`, height: `${R}%` },
            label: pe,
            class: le
          };
        }).filter((T) => !!T);
    }), B = E(() => w.minTimestamp !== null && w.minTimestamp > e.end.getTime()), G = E(() => w.maxTimestamp && w.maxTimestamp < e.start.getTime()), ae = E(() => {
      const { disableDays: i } = w, S = o.isYear || o.isYears;
      return i.length && i.includes($.formatDate(e.start)) && !S ? !0 : B.value || G.value;
    }), ne = Te({
      show: E(() => {
        if (!(!o.isDay && !o.isDays && !o.isWeek) && !(!g.value || !w.time || e.allDay) && !(w.timeFrom > $.dateToMinutes(o.now)) && !($.dateToMinutes(o.now) > w.timeTo))
          return !0;
      }),
      nowInMinutes: E(() => $.dateToMinutes(o.now)),
      todaysTimePosition: E(() => Oe(ne.nowInMinutes, w)),
      style: E(() => `top: ${ne.todaysTimePosition}%`),
      currentTime: E(() => $.formatTime(o.now))
    }), de = E(() => {
      if (ae.value) return {};
      const i = { ...w.eventListeners.cell };
      for (const [T, W] of Object.entries(i))
        i[T] = (J) => {
          var le, pe, h;
          (h = (pe = J.target || ((le = J.e) == null ? void 0 : le.target)).closest) != null && h.call(pe, ".vuecal__event") || W(J.type ? { e: J, cell: Z.value, cursor: ee.value } : J);
        };
      const S = { ...i };
      let C = null;
      return i.click = (T) => {
        var J;
        oe();
        const W = ye(T);
        (J = S.click) == null || J.call(S, { e: T, cell: Z.value, cursor: W }), C ? C = clearTimeout(C) : C = setTimeout(() => {
          var le;
          C = null, (le = S["delayed-click"]) == null || le.call(S, { e: T, cell: Z.value, cursor: W });
        }, 400);
      }, (w.time && o.isDay || o.isDays || o.isWeek) && (i.touchstart = (T) => {
        var W;
        s(T.e || T), (W = S.touchstart) == null || W.call(S, { e: T, cell: Z.value, cursor: ee.value });
      }, i.mousedown = (T) => {
        var W;
        s(T.e || T), (W = S.mousedown) == null || W.call(S, { e: T, cell: Z.value, cursor: ee.value });
      }), S.dblclick && (i.dblclick = (T) => {
        var W;
        (W = S.dblclick) == null || W.call(S, { e: T, cell: Z.value, cursor: ye(T) });
      }), w.editableEvents.drag && (i.dragenter = (T) => m.cellDragEnter(T, Z.value), i.dragover = (T) => {
        T.preventDefault(), m.cellDragOver(T, Z.value);
      }, i.dragleave = (T) => m.cellDragLeave(T, Z.value), i.drop = (T) => m.cellDragDrop(T, Z.value, e.allDay)), i;
    }), Z = E(() => ({
      start: e.start,
      end: e.end,
      events: d,
      ...r.schedule ? { schedule: r.schedule } : {},
      goNarrower: () => o.narrower(),
      goBroader: () => o.broader(),
      broader: o.broaderView,
      narrower: o.narrowerView
    })), ye = (i) => {
      var J;
      const S = (((J = i.touches) == null ? void 0 : J[0]) || i).clientY, { top: C } = u.value.getBoundingClientRect(), T = Ke(S - C, u.value), W = new Date(e.start);
      return W.setMinutes(Le(T, w)), { y: T, date: W };
    }, ee = E(() => {
      const i = Le(r.movePercentageY || r.startPercentageY, w), S = new Date(e.start);
      return S.setMinutes(i), {
        x: r.movePercentageX || r.startPercentageX,
        y: r.movePercentageY || r.startPercentageY,
        date: S
      };
    }), oe = () => {
      o.updateSelectedDate(e.start), w.clickToNavigate && ((o.isMonth || o.isDays || o.isWeek) && w.availableViews.day ? o.switch("day") : o.isYear && w.availableViews.month ? o.switch("month") : o.isYears && w.availableViews.year && o.switch("year")), o.updateViewDate(e.start);
    }, s = (i) => {
      var T, W;
      const S = i.type === "touchstart";
      S ? (r.canTouchAndDrag = !1, r.touchAndDragTimer = setTimeout(() => {
        r.canTouchAndDrag = !0, (r.holding || r.dragging) && i.preventDefault();
      }, 500)) : r.canTouchAndDrag = !0, r.schedule = ~~i.target.dataset.schedule;
      const C = u.value.getBoundingClientRect();
      r.startX = (((T = i.touches) == null ? void 0 : T[0]) || i).clientX - C.left, r.startY = (((W = i.touches) == null ? void 0 : W[0]) || i).clientY - C.top, r.startPercentageX = r.startX * 100 / C.width, r.startPercentageY = r.startY * 100 / C.height, r.thresholdPassed = !1, document.addEventListener(S ? "touchmove" : "mousemove", b, { passive: !S }), document.addEventListener(S ? "touchend" : "mouseup", y, { once: !0 }), r.holdTimer = setTimeout(() => {
        var J, le;
        r.holding = !0, (le = (J = de.value).hold) == null || le.call(J, { e: i, cell: Z.value, cursor: ee.value });
      }, 1e3);
    }, b = (i) => {
      var T, W, J, le, pe, h;
      const S = i.type === "touchmove";
      if (S && !r.canTouchAndDrag) {
        r.touchAndDragTimer && (clearTimeout(r.touchAndDragTimer), r.touchAndDragTimer = null), y(i);
        return;
      }
      S && i.preventDefault(), r.dragging || (P.isDraggingCell = !0, (W = (T = de.value)["drag-start"]) == null || W.call(T, { e: i, cell: Z.value, cursor: ee.value })), r.dragging = !0, r.holdTimer = clearTimeout(r.holdTimer), r.holding = !1;
      const C = u.value.getBoundingClientRect();
      r.moveX = (((J = i.touches) == null ? void 0 : J[0]) || i).clientX - C.left, r.moveY = (((le = i.touches) == null ? void 0 : le[0]) || i).clientY - C.top, r.movePercentageX = r.moveX * 100 / C.width, r.movePercentageY = r.moveY * 100 / C.height, w.eventCreateMinDrag && Math.abs(r.startY - r.moveY) > w.eventCreateMinDrag && (r.thresholdPassed = !0), (h = (pe = de.value).drag) == null || h.call(pe, { e: i, cell: Z.value, cursor: ee.value });
    }, y = async (i) => {
      var C, T;
      const S = i.type === "touchend";
      document.removeEventListener(S ? "touchmove" : "mousemove", b, { passive: !1 }), r.touchAndDragTimer && (clearTimeout(r.touchAndDragTimer), r.touchAndDragTimer = null), r.dragging && ((T = (C = de.value)["drag-end"]) == null || T.call(C, { e: i, cell: Z.value, cursor: ee.value }), P.isDraggingCell = !1, w.editableEvents.create && r.canTouchAndDrag && (_.value = !0, await q(i), _.value = !1)), r.holdTimer = clearTimeout(r.holdTimer), r.holding = !1, r.dragging = !1, r.startX = 0, r.startY = 0, r.moveX = 0, r.moveY = 0, r.startPercentageX = 0, r.startPercentageY = 0, r.movePercentageX = 0, r.movePercentageY = 0, r.thresholdPassed = !1, r.schedule = null, r.canTouchAndDrag = null;
    }, q = async (i) => {
      var pe;
      if (!l.value) return;
      let { start: S, end: C, startMinutes: T, endMinutes: W } = z.value;
      S = new Date(e.start), S.setMinutes(T), C = new Date(e.start), C.setMinutes(W);
      let J = { ...z.value, start: S, end: C };
      const { create: le } = w.eventListeners.event;
      if (typeof le == "function") {
        const h = J;
        J = await new Promise((R) => le({ e: i, event: J, cell: Z.value, resolve: R, cursor: ee.value })), J && typeof J == "object" && o.createEvent(J), J && typeof J == "boolean" && o.createEvent(h);
      } else o.createEvent(J);
      (pe = navigator.vibrate) == null || pe.call(navigator, 200);
    }, K = () => {
      var i;
      for (const S of Object.keys(de.value))
        (i = u.value) == null || i.removeEventListener(S, de.value[S]);
    }, De = () => {
      a.value = N.getCellOverlappingEvents(e.start, e.end, e.allDay);
    };
    return me(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !o.isYears && !o.isYear && v.value.map((i) => `${i._.id}${i.start.getTime()}${i.end.getTime()}`).join(),
      async () => {
        await Ie(), De();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Ne(async () => {
      for (const i of D.value) N.deleteEvent(i, 3);
      K(), await Ie();
    }), (i, S) => (V(), H("div", re({
      class: ["vuecal__cell", A.value],
      ref_key: "cellEl",
      ref: u
    }, Xe(de.value, !0)), [
      i.$slots.cell ? j(i.$slots, "cell", {
        key: 0,
        cell: Z.value
      }) : U("", !0),
      n.value ? (V(!0), H(ue, { key: 1 }, we(n.value, (C, T) => (V(), H("div", {
        class: he(["vuecal__special-hours", C.class]),
        style: $e(C.style),
        innerHTML: C.label || ""
      }, null, 14, xt))), 256)) : U("", !0),
      !i.$slots.cell && Y(w).schedules ? (V(!0), H(ue, { key: 2 }, we(Y(w).schedules, (C) => (V(), H("div", {
        class: he(["vuecal__schedule vuecal__schedule--cell", C.class]),
        key: C.id,
        style: $e(C.style || null),
        "data-schedule": C.id
      }, [
        i.$slots["cell-events"] ? j(i.$slots, "cell-events", {
          key: 0,
          cell: Z.value
        }) : U("", !0),
        M.value || i.$slots["cell-date"] ? (V(), H("div", ta, [
          j(i.$slots, "cell-date", { cell: Z.value }, () => [
            Ue(ce(M.value), 1)
          ])
        ])) : U("", !0),
        i.$slots["cell-content"] ? (V(), H("div", aa, [
          j(i.$slots, "cell-content", { cell: Z.value })
        ])) : U("", !0),
        i.$slots["cell-events"] && d.value.length ? (V(), H("div", na, [
          j(i.$slots, "cell-events", { cell: Z.value })
        ])) : d.value.length || F.value ? (V(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: S[0] || (S[0] = (T) => F.value = !0),
          onAfterLeave: t,
          tag: "div"
        }, {
          default: I(() => [
            (V(!0), H(ue, null, we(L.value[C.id], (T) => (V(), Se(st, {
              key: T._.id,
              event: T,
              onEventDeleted: X,
              "in-all-day-bar": e.allDay,
              style: $e(f.value[T._.id])
            }, Ce({ _: 2 }, [
              i.$slots["event.all-day"] && e.allDay ? {
                name: "event.all-day",
                fn: I((W) => [
                  j(i.$slots, "event.all-day", re({ ref_for: !0 }, W))
                ]),
                key: "0"
              } : void 0,
              i.$slots[`event.${Y(o).id}`] ? {
                name: `event.${Y(o).id}`,
                fn: I((W) => [
                  j(i.$slots, `event.${Y(o).id}`, re({ ref_for: !0 }, W))
                ]),
                key: "1"
              } : void 0,
              i.$slots.event ? {
                name: "event",
                fn: I((W) => [
                  j(i.$slots, "event", re({ ref_for: !0 }, W))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "style"]))), 128))
          ]),
          _: 2
        }, 1024)) : U("", !0),
        l.value && r.schedule === C.id && !e.allDay ? (V(), H("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: $e(z.value.style)
        }, ce(z.value.start) + " - " + ce(z.value.end), 5)) : U("", !0)
      ], 14, ea))), 128)) : U("", !0),
      !i.$slots.cell && !Y(w).schedules ? (V(), H(ue, { key: 3 }, [
        i.$slots["cell-events"] ? j(i.$slots, "cell-events", {
          key: 0,
          cell: Z.value
        }) : U("", !0),
        M.value || i.$slots["cell-date"] ? (V(), H("div", sa, [
          j(i.$slots, "cell-date", { cell: Z.value }, () => [
            Ue(ce(M.value), 1)
          ])
        ])) : U("", !0),
        i.$slots["cell-content"] ? (V(), H("div", la, [
          j(i.$slots, "cell-content", { cell: Z.value })
        ])) : U("", !0),
        i.$slots["cell-events"] && d.value.length ? (V(), H("div", ra, [
          j(i.$slots, "cell-events", { cell: Z.value })
        ])) : !(Y(o).isMonth && !Y(w).eventsOnMonthView) && !Y(o).isYear && !Y(o).isYears && (d.value.length || F.value) ? (V(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: S[1] || (S[1] = (C) => F.value = !0),
          onAfterLeave: t,
          tag: "div"
        }, {
          default: I(() => [
            (V(!0), H(ue, null, we(d.value, (C) => (V(), Se(st, {
              key: C._.id,
              event: C,
              onEventDeleted: X,
              "in-all-day-bar": e.allDay,
              class: he(k.value[C._.id]),
              style: $e(f.value[C._.id])
            }, Ce({ _: 2 }, [
              i.$slots["event.all-day"] && e.allDay ? {
                name: "event.all-day",
                fn: I((T) => [
                  j(i.$slots, "event.all-day", re({ ref_for: !0 }, T))
                ]),
                key: "0"
              } : void 0,
              i.$slots[`event.${Y(o).id}`] ? {
                name: `event.${Y(o).id}`,
                fn: I((T) => [
                  j(i.$slots, `event.${Y(o).id}`, re({ ref_for: !0 }, T))
                ]),
                key: "1"
              } : void 0,
              i.$slots.event ? {
                name: "event",
                fn: I((T) => [
                  j(i.$slots, "event", re({ ref_for: !0 }, T))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "class", "style"]))), 128))
          ]),
          _: 3
        })) : U("", !0),
        l.value ? (V(), H("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: $e(z.value.style)
        }, ce(z.value.start) + " - " + ce(z.value.end), 5)) : U("", !0)
      ], 64)) : U("", !0),
      i.$slots["event-count"] ? j(i.$slots, "event-count", {
        key: 4,
        events: v.value
      }) : O.value ? (V(), H("div", oa, ce(v.value.length), 1)) : U("", !0),
      ne.show ? (V(), H("div", {
        key: 6,
        class: "vuecal__now-line",
        style: $e(ne.style),
        title: ne.currentTime
      }, [
        ve("span", null, ce(ne.currentTime), 1)
      ], 12, ia)) : U("", !0)
    ], 16));
  }
}, ua = {
  key: 0,
  class: "vuecal__headings"
}, ca = {
  key: 0,
  class: "vuecal__weekdays-headings"
}, da = ["onClick"], va = { class: "vuecal__weekday-day" }, fa = {
  key: 0,
  class: "vuecal__weekday-date"
}, ma = {
  key: 1,
  class: "vuecal__schedules-headings w-flex grow"
}, ga = ["innerHTML"], ha = {
  key: 2,
  class: "vuecal__all-day w-flex grow"
}, ya = {
  __name: "headings-bar",
  setup(p) {
    const e = ze("vuecal"), c = ze("$vuecalEl"), { view: o, config: w, dateUtils: $ } = e, N = E(() => w.xs ? "day-xs" : w.sm || o.isDays || o.isMonth ? "day-sm" : "day"), m = E(() => (o.isDay || o.isDays || o.isWeek || o.isMonth) && !(o.isDay && !w.schedules && !w.allDayEvents)), P = E(() => o.cellDates.slice(0, o.cols).map(({ start: D }) => ({
      id: Ge[D.getDay()],
      date: D,
      dateNumber: D.getDate(),
      day: $.formatDate(D, "dddd"),
      "day-sm": $.formatDate(D, "ddd"),
      "day-xs": $.formatDate(D, "dd"),
      isToday: $.isToday(D)
    }))), g = {
      click: (D) => {
        (o.isDays || o.isWeek) && o.updateSelectedDate(D);
      }
    }, u = {
      isResizing: ie(!1),
      startY: ie(0),
      initialHeight: ie(0),
      defaultHeight: 25,
      // Default height in pixels.
      // Cleanup event listeners.
      cleanup() {
        typeof document < "u" && (document.removeEventListener("mousemove", u.handleMouseMove), document.removeEventListener("mouseup", u.cleanup), document.removeEventListener("touchmove", u.handleTouchMove, { passive: !1 }), document.removeEventListener("touchend", u.cleanup)), u.isResizing.value = !1;
      },
      startResize(D) {
        var X;
        this.isResizing.value = !0, this.startY.value = D;
        const F = (X = c.value) == null ? void 0 : X.querySelector(".vuecal__all-day");
        F && (this.initialHeight.value = F.offsetHeight), document.addEventListener("mousemove", u.handleMouseMove), document.addEventListener("mouseup", u.cleanup), document.addEventListener("touchmove", u.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", u.cleanup);
      },
      // Update height based on mouse/touch movement.
      updateHeight(D) {
        var t;
        if (!this.isResizing.value) return;
        const F = D - this.startY.value, X = Math.max(20, this.initialHeight.value + F);
        (t = c.value) == null || t.style.setProperty("--vuecal-all-day-bar-height", `${X}px`);
      },
      // Mouse event handlers.
      handleMouseDown(D) {
        this.startResize(D.clientY);
      },
      handleMouseMove(D) {
        u.updateHeight(D.clientY);
      },
      // Touch event handlers.
      handleTouchStart(D) {
        var F;
        (F = D.touches) != null && F[0] && this.startResize(D.touches[0].clientY);
      },
      handleTouchMove(D) {
        var F;
        (F = D.touches) != null && F[0] && (u.updateHeight(D.touches[0].clientY), D.preventDefault());
      }
    };
    return Ne(() => {
      u.cleanup();
    }), (D, F) => m.value ? (V(), H("div", ua, [
      Y(o).isDay ? U("", !0) : (V(), H("div", ca, [
        (V(!0), H(ue, null, we(P.value, (X, t) => (V(), H("div", {
          class: he(["vuecal__weekday", { "vuecal__weekday--today": X.isToday }]),
          key: t,
          onClick: (r) => g.click(X.date)
        }, [
          j(D.$slots, "weekday-heading", {
            label: X[N.value],
            id: X.id,
            date: X.date
          }, () => [
            ve("span", va, ce(X[N.value]), 1),
            Y(o).isMonth ? U("", !0) : (V(), H("strong", fa, ce(X.dateNumber), 1))
          ])
        ], 10, da))), 128))
      ])),
      Y(w).schedules ? (V(), H("div", ma, [
        (V(!0), H(ue, null, we(P.value, (X, t) => (V(), H(ue, { key: t }, [
          (V(!0), H(ue, null, we(Y(w).schedules, (r, _) => (V(), H(ue, { key: _ }, [
            D.$slots["schedule-heading"] ? (V(), H("div", {
              key: 0,
              class: he(["vuecal__schedule vuecal__schedule--heading", r.class])
            }, [
              j(D.$slots, "schedule-heading", {
                schedule: r,
                view: Y(o)
              })
            ], 2)) : (V(), H("div", {
              key: 1,
              class: he(["vuecal__schedule vuecal__schedule--heading", r.class]),
              innerHTML: r.label
            }, null, 10, ga))
          ], 64))), 128))
        ], 64))), 128))
      ])) : U("", !0),
      Y(w).allDayEvents ? (V(), H("div", ha, [
        (V(!0), H(ue, null, we(P.value, (X, t) => (V(), Se(_t, {
          class: he(["vuecal__all-day-cell", { "vuecal__weekday--today": X.isToday }]),
          key: t,
          start: X.date,
          end: new Date(X.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: t,
          "all-day": ""
        }, Ce({ _: 2 }, [
          D.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: I((r) => [
              j(D.$slots, "event.all-day", re({ ref_for: !0 }, r))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: I((r) => [
              j(D.$slots, "event", re({ ref_for: !0 }, r))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        ve("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: F[0] || (F[0] = (...X) => u.handleMouseDown && u.handleMouseDown(...X)),
          onTouchstart: F[1] || (F[1] = (...X) => u.handleTouchStart && u.handleTouchStart(...X))
        }, null, 32)
      ])) : U("", !0)
    ])) : U("", !0);
  }
}, Da = { class: "vuecal__time-column" }, pa = {
  key: 0,
  class: "vuecal__all-day-label"
}, wa = {
  __name: "time-column",
  setup(p) {
    const e = ze("vuecal"), { config: c, texts: o } = e, w = E(() => {
      const $ = [];
      for (let m = c.timeFrom; m < c.timeTo; m += c.timeStep) {
        const P = m + c.timeStep > c.timeTo, g = ~~(m / 60), u = m % 60, D = o[m < 720 ? "am" : "pm"];
        let F = null;
        P && (F = `calc(var(--vuecal-time-cell-height) * ${(c.timeTo - m) / c.timeStep})`), $.push({
          minutesSum: m,
          // The sum of hours + minutes in minutes.
          hours: g,
          minutes: u,
          formatted12: `${g % 12 ? g % 12 : 12}${u ? `:${u.toString().padStart(2, 0)}` : ""}${D}`,
          formatted24: `${g.toString().padStart(2, 0)}:${u.toString().padStart(2, 0)}`,
          height: F
        });
      }
      return $;
    });
    return ($, N) => (V(), H("div", Da, [
      Y(c).allDayEvents ? (V(), H("div", pa, [
        j($.$slots, "all-day-label", {}, () => [
          Ue(ce(Y(e).texts.allDay), 1)
        ])
      ])) : U("", !0),
      (V(!0), H(ue, null, we(w.value, (m, P) => (V(), H("div", {
        class: "vuecal__time-cell",
        key: P,
        style: $e({ height: m.height || null })
      }, [
        j($.$slots, "time-cell", {
          index: P,
          minutes: m.minutes,
          hours: m.hours,
          minutesSum: m.minutesSum,
          format12: m.formatted12,
          format24: m.formatted24
        }, () => [
          ve("label", null, ce(Y(c).twelveHour ? m.formatted12 : m.formatted24), 1)
        ])
      ], 4))), 128))
    ]));
  }
}, ka = {
  __name: "body",
  setup(p) {
    const e = ze("vuecal"), { view: c, config: o, dateUtils: w } = e, $ = ie(null), N = ie(null), m = E(() => ({
      "--vuecal-grid-columns": c.cols,
      "--vuecal-grid-rows": c.rows,
      "--vuecal-body-max-height": o.time ? `${o.timeCellHeight * (o.timeTo - o.timeFrom) / o.timeStep}px` : null
    })), P = E(() => {
      const D = w.formatTime(Le(N.value, o));
      return {
        style: { top: `${N.value}%` },
        time: D
      };
    }), g = (D) => {
      var t;
      if (c.isMonth || c.isYear || c.isYears) return;
      const F = (((t = D.touches) == null ? void 0 : t[0]) || D).clientY, { top: X } = $.value.getBoundingClientRect();
      N.value = Ke(F - X, $.value);
    }, u = () => {
      N.value = null;
    };
    return Ze(() => {
      $.value.addEventListener("mousemove", g), $.value.addEventListener("touchmove", g), $.value.addEventListener("mouseleave", u), $.value.addEventListener("touchend", u);
    }), Ne(() => {
      $.value && ($.value.removeEventListener("mousemove", g), $.value.removeEventListener("touchmove", g), $.value.removeEventListener("mouseleave", u), $.value.removeEventListener("touchend", u));
    }), (D, F) => (V(), H("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: $,
      style: $e(m.value)
    }, [
      je(qe, { name: "vuecal-shrink" }, {
        default: I(() => [
          Y(o).timeAtCursor && N.value !== null ? (V(), H("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: $e(P.value.style)
          }, [
            ve("label", null, ce(P.value.time), 1)
          ], 4)) : U("", !0)
        ]),
        _: 1
      }),
      (V(!0), H(ue, null, we(Y(c).cellDates, (X, t) => (V(), Se(_t, {
        key: t,
        start: X.start,
        end: X.end,
        index: t
      }, Ce({ _: 2 }, [
        D.$slots.cell ? {
          name: "cell",
          fn: I((r) => [
            j(D.$slots, "cell", re({ ref_for: !0 }, r))
          ]),
          key: "0"
        } : void 0,
        D.$slots["cell-date"] ? {
          name: "cell-date",
          fn: I((r) => [
            j(D.$slots, "cell-date", re({ ref_for: !0 }, r))
          ]),
          key: "1"
        } : void 0,
        D.$slots["cell-content"] ? {
          name: "cell-content",
          fn: I((r) => [
            j(D.$slots, "cell-content", re({ ref_for: !0 }, r))
          ]),
          key: "2"
        } : void 0,
        D.$slots["cell-events"] ? {
          name: "cell-events",
          fn: I((r) => [
            j(D.$slots, "cell-events", re({ ref_for: !0 }, r))
          ]),
          key: "3"
        } : void 0,
        D.$slots[`event.${Y(c).id}`] ? {
          name: `event.${Y(c).id}`,
          fn: I((r) => [
            j(D.$slots, `event.${Y(c).id}`, re({ ref_for: !0 }, r))
          ]),
          key: "4"
        } : void 0,
        D.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: I((r) => [
            j(D.$slots, "event.all-day", re({ ref_for: !0 }, r))
          ]),
          key: "5"
        } : void 0,
        D.$slots.event ? {
          name: "event",
          fn: I((r) => [
            j(D.$slots, "event", re({ ref_for: !0 }, r))
          ]),
          key: "6"
        } : void 0,
        D.$slots["event-count"] ? {
          name: "event-count",
          fn: I((r) => [
            j(D.$slots, "event-count", re({ ref_for: !0 }, r))
          ]),
          key: "7"
        } : void 0
      ]), 1032, ["start", "end", "index"]))), 128))
    ], 4));
  }
}, _a = ["data-locale"], $a = { class: "vuecal__scrollable-wrap" }, ba = {
  key: 1,
  class: "vuecal__week-numbers"
}, Ta = { class: "vuecal__week-number" }, Ma = { class: "vuecal__body-wrap" }, Ea = {
  __name: "index",
  props: Pt,
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
  setup(p, { expose: e, emit: c }) {
    const o = p, w = c, $ = Tt("vuecal-el"), N = zt({ props: o, emit: w, attrs: Yt(), vuecalEl: $, uid: Mt() }), { config: m, view: P, dateUtils: g, touch: u } = N, D = E(() => m.time && (P.isDay || P.isDays || P.isWeek)), F = E(() => Array(P.rows).fill().map((a, z) => g.getWeek(g.addDays(P.firstCellDate, 7 * z)))), X = E(() => {
      var a;
      return {
        "vuecal--ready": m.ready,
        [`vuecal--${m.theme}-theme`]: m.theme,
        [`vuecal--${m.size}`]: !0,
        "vuecal--date-picker": m.datePicker,
        "vuecal--dark": m.dark,
        "vuecal--light": !m.dark,
        [`vuecal--${P.id}-view`]: !0,
        "vuecal--view-has-time": D.value,
        "vuecal--timeless": !m.time,
        "vuecal--dragging-cell": u.isDraggingCell,
        "vuecal--dragging-event": u.isDraggingEvent,
        "vuecal--resizing-event": u.isResizingEvent,
        "vuecal--has-schedules": (a = m.schedules) == null ? void 0 : a.length
      };
    }), t = E(() => ({
      "--vuecal-time-cell-height": m.timeCellHeight && `${m.timeCellHeight}px`
    })), r = E(() => {
      var a, z;
      return {
        "vuecal__scrollable--row": D.value || m.weekNumbers && P.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${P.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (a = m.schedules) == null ? void 0 : a.length,
        "vuecal__scrollable--no-schedules": !((z = m.schedules) != null && z.length),
        "vuecal__scrollable--no-all-day-bar": !m.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": m.allDayEvents
      };
    }), _ = (a) => {
      a.target.closest(".vuecal__cell") && a.preventDefault();
    };
    return Ze(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && $.value.addEventListener("contextmenu", _), await Ie(), m.ready = !0, w("ready", { config: m, view: P });
    }), Ne(() => {
      var a;
      (a = $ == null ? void 0 : $.value) == null || a.removeEventListener("contextmenu", _);
    }), at("vuecal", N), at("$vuecalEl", $), e({ view: N.view }), (a, z) => (V(), H("div", {
      class: he(["vuecal", X.value]),
      ref: "vuecal-el",
      "data-locale": a.locale,
      style: $e(t.value)
    }, [
      a.$slots.diy ? j(a.$slots, "diy", {
        key: 0,
        vuecal: Y(N)
      }) : (V(), H(ue, { key: 1 }, [
        je(It, null, Ce({ _: 2 }, [
          a.$slots.header ? {
            name: "header",
            fn: I((l) => [
              j(a.$slots, "header", te(se(l)))
            ]),
            key: "0"
          } : void 0,
          !a.$slots.header && a.$slots["previous-button"] ? {
            name: "previous-button",
            fn: I((l) => [
              j(a.$slots, "previous-button", te(se(l)))
            ]),
            key: "1"
          } : void 0,
          !a.$slots.header && a.$slots["next-button"] ? {
            name: "next-button",
            fn: I((l) => [
              j(a.$slots, "next-button", te(se(l)))
            ]),
            key: "2"
          } : void 0,
          !a.$slots.header && a.$slots["today-button"] ? {
            name: "today-button",
            fn: I((l) => [
              j(a.$slots, "today-button", te(se(l)))
            ]),
            key: "3"
          } : void 0,
          !a.$slots.header && a.$slots.title ? {
            name: "title",
            fn: I((l) => [
              j(a.$slots, "title", te(se(l)))
            ]),
            key: "4"
          } : void 0,
          !a.$slots.header && a.$slots["title.day"] ? {
            name: "title.day",
            fn: I((l) => [
              j(a.$slots, "title.day", te(se(l)))
            ]),
            key: "5"
          } : void 0,
          !a.$slots.header && a.$slots["title.days"] ? {
            name: "title.days",
            fn: I((l) => [
              j(a.$slots, "title.days", te(se(l)))
            ]),
            key: "6"
          } : void 0,
          !a.$slots.header && a.$slots["title.week"] ? {
            name: "title.week",
            fn: I((l) => [
              j(a.$slots, "title.week", te(se(l)))
            ]),
            key: "7"
          } : void 0,
          !a.$slots.header && a.$slots["title.month"] ? {
            name: "title.month",
            fn: I((l) => [
              j(a.$slots, "title.month", te(se(l)))
            ]),
            key: "8"
          } : void 0,
          !a.$slots.header && a.$slots["title.year"] ? {
            name: "title.year",
            fn: I((l) => [
              j(a.$slots, "title.year", te(se(l)))
            ]),
            key: "9"
          } : void 0,
          !a.$slots.header && a.$slots["title.years"] ? {
            name: "title.years",
            fn: I((l) => [
              j(a.$slots, "title.years", te(se(l)))
            ]),
            key: "10"
          } : void 0,
          !a.$slots.header && a.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: I((l) => [
              j(a.$slots, "schedule-heading", te(se(l)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        ve("div", $a, [
          je(qe, {
            name: `vuecal-slide-fade--${Y(P).transitionDirection}`
          }, {
            default: I(() => [
              (V(), H("div", {
                class: he(["vuecal__scrollable", r.value]),
                key: Y(P).id + Y(P).start.getTime()
              }, [
                D.value ? (V(), Se(wa, { key: 0 }, Ce({ _: 2 }, [
                  a.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: I((l) => [
                      j(a.$slots, "time-cell", te(se(l)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : U("", !0),
                Y(m).weekNumbers && Y(P).isMonth ? (V(), H("div", ba, [
                  (V(!0), H(ue, null, we(F.value, (l) => (V(), H("div", Ta, [
                    j(a.$slots, "week-number", {}, () => [
                      ve("small", null, ce(l), 1)
                    ])
                  ]))), 256))
                ])) : U("", !0),
                ve("div", Ma, [
                  je(ya, null, Ce({ _: 2 }, [
                    a.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: I((l) => [
                        j(a.$slots, "weekday-heading", te(se(l)))
                      ]),
                      key: "0"
                    } : void 0,
                    a.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: I((l) => [
                        j(a.$slots, "schedule-heading", te(se(l)))
                      ]),
                      key: "1"
                    } : void 0,
                    a.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: I((l) => [
                        j(a.$slots, "event.all-day", te(se(l)))
                      ]),
                      key: "2"
                    } : void 0,
                    a.$slots.event ? {
                      name: "event",
                      fn: I((l) => [
                        j(a.$slots, "event", te(se(l)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  je(ka, null, Ce({ _: 2 }, [
                    a.$slots.cell ? {
                      name: "cell",
                      fn: I((l) => [
                        j(a.$slots, "cell", te(se(l)))
                      ]),
                      key: "0"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: I((l) => [
                        j(a.$slots, "cell-date", te(se(l)))
                      ]),
                      key: "1"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: I((l) => [
                        j(a.$slots, "cell-content", te(se(l)))
                      ]),
                      key: "2"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: I((l) => [
                        j(a.$slots, "cell-events", te(se(l)))
                      ]),
                      key: "3"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: I((l) => [
                        j(a.$slots, "event.all-day", te(se(l)))
                      ]),
                      key: "4"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots[`event.${Y(P).id}`] ? {
                      name: `event.${Y(P).id}`,
                      fn: I((l) => [
                        j(a.$slots, `event.${Y(P).id}`, te(se(l)))
                      ]),
                      key: "5"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots.event ? {
                      name: "event",
                      fn: I((l) => [
                        j(a.$slots, "event", te(se(l)))
                      ]),
                      key: "6"
                    } : void 0,
                    !a.$slots.cell && a.$slots["event-count"] ? {
                      name: "event-count",
                      fn: I((l) => [
                        j(a.$slots, "event-count", te(se(l)))
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
    ], 14, _a));
  }
}, Sa = (p) => {
  Ae.texts = { ...ge.texts, ...p }, Ae.dateUtils.updateTexts(Ae.texts);
}, {
  addDatePrototypes: Ca,
  removeDatePrototypes: Va,
  updateTexts: Oa,
  addDays: ja,
  subtractDays: La,
  addHours: za,
  subtractHours: Ha,
  addMinutes: Pa,
  subtractMinutes: Fa,
  getWeek: Aa,
  isToday: Na,
  isSameDate: Ba,
  isInRange: Wa,
  isLeapYear: Ra,
  getPreviousFirstDayOfWeek: Ia,
  stringToDate: Xa,
  dateToMinutes: Ga,
  countDays: qa,
  datesInSameTimeStep: Ja,
  isValid: Ua,
  formatDate: Za,
  formatDateLite: Ka,
  formatTime: Qa,
  formatTimeLite: xa,
  formatMinutes: en
} = Ae.dateUtils;
export {
  Ea as VueCal,
  Ca as addDatePrototypes,
  ja as addDays,
  za as addHours,
  Pa as addMinutes,
  qa as countDays,
  Ga as dateToMinutes,
  Ja as datesInSameTimeStep,
  Za as formatDate,
  Ka as formatDateLite,
  en as formatMinutes,
  Qa as formatTime,
  xa as formatTimeLite,
  Ia as getPreviousFirstDayOfWeek,
  Aa as getWeek,
  Wa as isInRange,
  Ra as isLeapYear,
  Ba as isSameDate,
  Na as isToday,
  Ua as isValidDate,
  Va as removeDatePrototypes,
  Xa as stringToDate,
  La as subtractDays,
  Ha as subtractHours,
  Fa as subtractMinutes,
  Oa as updateTexts,
  Sa as useLocale
};
