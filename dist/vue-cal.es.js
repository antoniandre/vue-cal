import { computed as M, reactive as $e, watch as fe, toRefs as wt, ref as ue, onBeforeUnmount as Xe, inject as Ne, createElementBlock as O, openBlock as C, renderSlot as F, createCommentVNode as q, unref as V, Fragment as oe, renderList as ke, normalizeClass as ye, createElementVNode as ve, createVNode as Oe, Transition as Ge, withCtx as J, createBlock as Se, resolveDynamicComponent as Qe, mergeProps as de, toHandlers as Be, normalizeProps as te, toDisplayString as ie, normalizeStyle as _e, onMounted as qe, withModifiers as xe, nextTick as Ue, createTextVNode as et, TransitionGroup as tt, createSlots as je, useTemplateRef as _t, useId as kt, useAttrs as bt, provide as $t, guardReactiveProps as ae } from "vue";
/**
  * vue-cal v5.0.1-rc.20
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
}, Tt = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Re = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], Mt = Re.reduce((y, s, r) => (y[s] = r || 7, y), {}), Yt = (y, s, r) => {
  const { dateUtils: d } = y, w = !1, $ = M(() => {
    if (I.value[s.view]) return s.view;
    const l = s.datePicker ? "month" : "week", p = s.view || l;
    return I.value[p] ? p : (console.warn(
      `Vue Cal: the provided or default view \`${p}\` is either invalid or not in the list of available views. The first available view will be chosen: \`${Object.keys(I.value)[0]}\`.`
    ), Object.keys(I.value)[0]);
  }), z = M(() => s.sm && !s.xs), f = M(() => s.xs || s.datePicker), P = M(() => s.clickToNavigate || s.datePicker && s.clickToNavigate !== !1), u = M(() => {
    const l = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, p = (b) => b.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [b, a] of Object.entries(r)) {
      const [j, R, N] = b.match(/^on(Cell|Event)(.+)$/) || [];
      j && (l[R.toLowerCase()][p(N).replace(/^-+|-+$/g, "")] = a);
    }
    return l;
  }), m = M(() => {
    var p;
    const l = {};
    return s.hideWeekends && (l[6] = !0) && (l[7] = !0), (p = s.hideWeekdays) != null && p.length && s.hideWeekdays.forEach((b) => l[Mt[b]] = !0), l;
  }), Y = M(() => s.hideWeekends || m.value[6] && m.value[7]), I = M(() => {
    const l = s.datePicker;
    let p = 0, b = {};
    const a = s.views;
    return l && !a ? {
      month: { ...ge.availableViews.month },
      year: { ...ge.availableViews.year },
      years: { ...ge.availableViews.years }
    } : (a ? (Array.isArray(a) ? b = a.reduce((j, R) => (typeof R == "string" && ge.availableViews[R] ? j[R] = ge.availableViews[R] : p++, j), {}) : typeof a == "object" && (b = Object.entries(a).reduce((j, [R, N]) => {
      const { cols: se, rows: x } = ge.availableViews[R];
      return j[R] = { cols: N.cols || se, rows: N.rows || x }, j;
    }, {})), p && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(b).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), b = { ...ge.availableViews })) : b = { ...ge.availableViews }, b);
  }), Z = M(() => s.datePicker ? "month" : I.value.week ? "week" : Object.keys(I.value)[0]), t = M(() => {
    if (typeof s.selectedDate == "string") return d.stringToDate(s.selectedDate);
    if (s.selectedDate instanceof Date) return s.selectedDate;
    s.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", s.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), o = M(() => {
    if (!s.disableDays) return [];
    const l = [];
    if (Array.isArray(s.disableDays))
      for (let p of s.disableDays) {
        let b = p;
        typeof p == "string" ? b = d.stringToDate(p) : p instanceof Date && (p = d.formatDate(p, "YYYY-MM-DD")), b instanceof Date && !isNaN(b.getTime()) ? l.push(p) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", p);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", s.disableDays);
    return l;
  }), e = M(() => {
    let l = null;
    return s.minDate && typeof s.minDate == "string" ? l = d.stringToDate(s.minDate) : s.minDate && s.minDate instanceof Date && (l = s.minDate), (l == null ? void 0 : l.getTime()) || null;
  }), h = M(() => {
    let l = null;
    return s.maxDate && typeof s.maxDate == "string" ? l = d.stringToDate(s.maxDate) : s.maxDate && s.maxDate instanceof Date && (l = s.maxDate), (l == null ? void 0 : l.getTime()) || null;
  }), c = M(() => {
    var b;
    const { view: l } = y;
    return s.schedules.length && (l.isDay || l.isDays || l.isWeek) && ((b = s.schedules) == null ? void 0 : b.map((a, j) => ({ ...a, id: a.id ?? j + 1 }))) || void 0;
  }), E = M(() => {
    const l = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return s.editableEvents === !0 ? l : s.editableEvents === !1 ? Object.keys(l).map((p) => l[p] = !1) : { ...l, ...s.editableEvents };
  }), L = M(() => {
    const { view: l } = y, { eventCount: p } = s;
    return (Array.isArray(p) ? p.includes(l.id) : p) && (l.isMonth && !s.eventsOnMonthView || l.isYear);
  }), H = async (l) => {
    var b;
    let p = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((a) => a.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((a) => a.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((a) => a.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((a) => a.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((a) => a.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((a) => a.default), "../i18n/da.json": () => import("./i18n/da.js").then((a) => a.default), "../i18n/de.json": () => import("./i18n/de.js").then((a) => a.default), "../i18n/el.json": () => import("./i18n/el.js").then((a) => a.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((a) => a.default), "../i18n/en-us.json": () => Promise.resolve().then(() => Vt).then((a) => a.default), "../i18n/es.json": () => import("./i18n/es.js").then((a) => a.default), "../i18n/et.json": () => import("./i18n/et.js").then((a) => a.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((a) => a.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((a) => a.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((a) => a.default), "../i18n/he.json": () => import("./i18n/he.js").then((a) => a.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((a) => a.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((a) => a.default), "../i18n/id.json": () => import("./i18n/id.js").then((a) => a.default), "../i18n/is.json": () => import("./i18n/is.js").then((a) => a.default), "../i18n/it.json": () => import("./i18n/it.js").then((a) => a.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((a) => a.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((a) => a.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((a) => a.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((a) => a.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((a) => a.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((a) => a.default), "../i18n/no.json": () => import("./i18n/no.js").then((a) => a.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((a) => a.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((a) => a.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((a) => a.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((a) => a.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((a) => a.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((a) => a.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((a) => a.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((a) => a.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((a) => a.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((a) => a.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((a) => a.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((a) => a.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((a) => a.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((a) => a.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((a) => a.default) });
    {
      if (!p[`../i18n/${l}.json`]) {
        console.warn(`Vue Cal: the locale \`${l}\` does not exist. Falling back to \`en-us\`.`), l = "en-us";
        return;
      }
      p = await ((b = p[`../i18n/${l}.json`]) == null ? void 0 : b.call(p));
    }
    y.texts = Object.assign(y.texts, Object.assign({ ...ge.texts }, p)), d.updateTexts(y.texts);
  }, D = $e(s.events || []);
  return fe(() => s.events, (l) => D.splice(0, D.length, ...l)), fe(() => s.locale, (l) => H(l || "en-us")), (s.locale || !y.texts.today) && H(s.locale || "en-us"), {
    ...wt(s),
    events: D,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: u,
    defaultView: Z,
    availableViews: I,
    disableDays: o,
    ready: w,
    sm: z,
    xs: f,
    clickToNavigate: P,
    hideWeekdays: m,
    hideWeekends: Y,
    minTimestamp: e,
    maxTimestamp: h,
    schedules: c,
    selectedDate: t,
    editableEvents: E,
    showCellEventCount: L,
    view: $,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(m.value).length;
    },
    get size() {
      return f.value ? "xs" : z.value ? "sm" : "lg";
    },
    loadTexts: H
  };
}, Ve = (y, s) => {
  const r = s.timeTo - s.timeFrom;
  return (y - s.timeFrom) * 100 / r;
}, Pe = (y, s) => {
  const r = s.timeTo - s.timeFrom;
  return ~~(y * r / 100 + s.timeFrom);
}, Ze = (y, s) => {
  const r = s.clientHeight;
  return y * 100 / r;
}, Ie = $e({ id: null, date: null });
let at = !1, Je = !0;
const pe = $e({ el: null, cell: null, timeout: null }), we = $e({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function Et(y) {
  const { config: s, view: r, eventsManager: d, emit: w, uid: $, dateUtils: z } = y, f = (e) => {
    var l;
    const { timeStep: h, timeCellHeight: c, timeFrom: E } = s, L = (((l = e.touches) == null ? void 0 : l[0]) || e).clientY, { top: H } = e.currentTarget.getBoundingClientRect(), D = L - H - ~~e.dataTransfer.getData("cursor-grab-at");
    return Pe(Ze(D, e.currentTarget), s);
  }, P = (e, h, c) => {
    const E = h.duration || u(h.start, h.end) || s.timeStep;
    let L = Math.max(f(e), 0);
    if (s.snapToInterval) {
      const p = L + s.snapToInterval / 2;
      L = p - p % s.snapToInterval;
    }
    const H = new Date(new Date(c).setMinutes(L)), D = Math.min(L + E, 24 * 60), l = new Date(new Date(c).setMinutes(D));
    return { start: H, end: l };
  }, u = (e, h) => Math.round((h - e) / 6e4);
  return {
    eventDragStart: (e, h) => {
      if (e.target.nodeType === 3 || y.touch.isResizingEvent) return e.preventDefault();
      e.dataTransfer.effectAllowed = "move", e.dataTransfer.dropEffect = "move";
      const c = { ...h, _: { id: h._.id, duration: u(h.start, h.end) } };
      try {
        e.dataTransfer.setData("text/plain", ""), e.dataTransfer.setData("event", JSON.stringify(c)), e.dataTransfer.setData("cursor-grab-at", e.offsetY);
      } catch (L) {
        return console.warn("Vue Cal: Failed to set drag data:", L), e.preventDefault();
      }
      we.eventId = h._.id, we.fromVueCal = $, w("event-drag-start", {
        e,
        event: h
      });
      const E = e.target.closest(".vuecal__event");
      E.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        E.classList.add("vuecal__event--dragging-original"), E.classList.remove("vuecal__event--dragging-ghost");
      }, 0), at = !1, Object.assign(Ie, { id: r.id, date: r.firstCellDate }), Je = !0, y.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (e, h) => {
      we.eventId = null, e.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: c, toVueCal: E } = we;
      E && c !== E && d.deleteEvent(h._.id, 3), at && Je && Ie.id && r.switchView(Ie.id, Ie.date, !0), w("event-drag-end", {
        e,
        event: h,
        external: we.fromVueCal !== $
      }), we.fromVueCal = null, we.toVueCal = null, y.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (e, h) => {
      const { start: c } = h, E = e.currentTarget;
      if (!e.currentTarget.contains(e.relatedTarget)) {
        if (E === pe.el || !E.className.includes("vuecal__cell-content")) return !1;
        pe.el && (pe.cell.highlighted = !1), Object.assign(pe, { el: E, cell: h, timeout: clearTimeout(pe.timeout) }), h.highlighted = !0, ["years", "year", "month"].includes(r.id) && (pe.timeout = setTimeout(() => y.switchToNarrowerView(c), 2e3));
      }
    },
    cellDragOver: (e, h) => {
      const { start: c, schedule: E } = h;
      e.preventDefault(), h.highlighted = !0, (E || E === 0) && (h.highlightedSchedule = E);
    },
    cellDragLeave: (e, h) => {
      e.preventDefault(), !e.currentTarget.contains(e.relatedTarget) && (h.highlightedSchedule = !1, pe.cell === h && (clearTimeout(pe.timeout), Object.assign(pe, { el: null, cell: null, timeout: null }), h.highlighted = !1));
    },
    cellDragDrop: async (e, h) => {
      var a, j, R;
      e.preventDefault(), clearTimeout(pe.timeout), Object.assign(pe, { el: null, cell: null, timeout: null });
      const c = JSON.parse(e.dataTransfer.getData("event") || "{}");
      c.start && (c.start = new Date(c.start)), c.end && (c.end = new Date(c.end));
      let E;
      const { start: L, end: H } = P(e, c, h.start), { schedule: D } = ((a = e.target.closest("[data-schedule]")) == null ? void 0 : a.dataset) || {};
      let l = () => {
      };
      we.fromVueCal === $ ? (E = d.getEvent(c._.id), E && (E._.dragging = !1, l = (N) => {
        if (E.start = L, E.end = H, D !== void 0 && (E.schedule = ~~D), N && typeof N == "object") {
          const { _: se, ...x } = N;
          Object.assign(E, x);
        }
      })) : (E = {
        ...c,
        start: L,
        end: H,
        ...D !== void 0 && { schedule: ~~D },
        _: { id: ((j = c._) == null ? void 0 : j.id) || c.id, duration: u(L, H) },
        getOverlappingEvents: () => d.getEventsInRange(L, H, { schedule: ~~D })
      }, l = (N) => {
        if (E = d.createEvent(E), N && typeof N == "object") {
          const { _: se, ...x } = N;
          Object.assign(E, x);
        }
      });
      let p = !0;
      const { drop: b } = (R = s.eventListeners) == null ? void 0 : R.event;
      b && (p = await b({
        e,
        event: { ...E, start: L, end: H, schedule: ~~D },
        overlaps: E.getOverlappingEvents({ start: L, end: H, schedule: ~~D }),
        cell: h,
        external: we.fromVueCal !== $
      })), p !== !1 && l(p), h.highlighted = !1, h.highlightedSchedule = null, Je = !1, we.toVueCal = $, w("event-dropped", {
        e,
        cell: h,
        event: E,
        originalEvent: c,
        external: we.fromVueCal !== $
      });
    }
  };
}
const st = (y, s) => {
  let r, d, w, $ = {}, z = {};
  const f = ue(y), P = () => {
    f.value.today || (f.value = s), Date.prototype.addDays = function(n) {
      return I(this, n || 0);
    }, Date.prototype.subtractDays = function(n) {
      return Z(this, n || 0);
    }, Date.prototype.addHours = function(n) {
      return t(this, n || 0);
    }, Date.prototype.subtractHours = function(n) {
      return o(this, n || 0);
    }, Date.prototype.addMinutes = function(n) {
      return e(this, n || 0);
    }, Date.prototype.subtractMinutes = function(n) {
      return h(this, n || 0);
    }, Date.prototype.getWeek = function() {
      return E(this);
    }, Date.prototype.isToday = function() {
      return L(this);
    }, Date.prototype.isLeapYear = function() {
      return l(this);
    }, Date.prototype.format = function(n = "YYYY-MM-DD") {
      return se(this, n);
    }, Date.prototype.formatTime = function(n = "HH:mm") {
      return le(this, n);
    };
  }, u = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, m = (n) => {
    f.value = n, Date.prototype.subtractDays && P();
  }, Y = () => (d !== (/* @__PURE__ */ new Date()).getDate() && (r = /* @__PURE__ */ new Date(), d = r.getDate(), w = `${r.getFullYear()}-${r.getMonth()}-${r.getDate()}`), w), I = (n, _) => {
    const g = new Date(n.valueOf());
    return g.setDate(g.getDate() + _), g;
  }, Z = (n, _) => {
    const g = new Date(n.valueOf());
    return g.setDate(g.getDate() - _), g;
  }, t = (n, _) => {
    const g = new Date(n.valueOf());
    return g.setHours(g.getHours() + _), g;
  }, o = (n, _) => {
    const g = new Date(n.valueOf());
    return g.setHours(g.getHours() - _), g;
  }, e = (n, _) => {
    const g = new Date(n.valueOf());
    return g.setMinutes(g.getMinutes() + _), g;
  }, h = (n, _) => {
    const g = new Date(n.valueOf());
    return g.setMinutes(g.getMinutes() - _), g;
  }, c = (n, _) => {
    const g = (B) => {
      const ee = B % _;
      return ee !== 0 && (B += ee >= _ / 2 ? _ - ee : -ee), B;
    };
    if (typeof n == "number") return g(n);
    if (n instanceof Date) {
      let B = g(n.getMinutes());
      B >= 60 && (n.setHours(n.getHours() + 1), B = 0), n.setMinutes(B, 0, 0);
    }
  }, E = (n, _ = !1) => {
    const g = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())), B = g.getUTCDay() || 7;
    g.setUTCDate(g.getUTCDate() + 4 - B);
    const ee = new Date(Date.UTC(g.getUTCFullYear(), 0, 1));
    return Math.ceil(((g - ee) / 864e5 + 1) / 7) + (_ ? 1 : 0);
  }, L = (n) => `${n.getFullYear()}-${n.getMonth()}-${n.getDate()}` === Y(), H = (n, _) => {
    if (!n || !_) return console.warn(`Vue Cal: missing date${n ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (N(n)) {
      if (!N(_)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${_}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${n}\`.`);
    return n.getFullYear() === _.getFullYear() && n.getMonth() === _.getMonth() && n.getDate() === _.getDate();
  }, D = (n, _, g) => N(n) ? n.getTime() >= _ && n.getTime() <= g : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${n}\`.`), l = (n) => {
    const _ = n.getFullYear();
    return !(_ % 400) || _ % 100 && !(_ % 4);
  }, p = (n = null, _) => {
    const g = n && new Date(n.valueOf()) || /* @__PURE__ */ new Date(), B = _ ? 7 : 6;
    return g.setDate(g.getDate() - (g.getDay() + B) % 7), g;
  }, b = (n) => n instanceof Date ? n : (n.length === 10 && (n += " 00:00"), new Date(n.replace(/-/g, "/"))), a = (n) => n.getHours() * 60 + n.getMinutes(), j = (n, _) => {
    typeof n == "string" && (n = n.replace(/-/g, "/")), typeof _ == "string" && (_ = _.replace(/-/g, "/")), n = new Date(n).setHours(0, 0, 0, 0), _ = new Date(_).setHours(0, 0, 1, 0);
    const g = (new Date(_).getTimezoneOffset() - new Date(n).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((_ - n - g) / (24 * 3600 * 1e3));
  }, R = (n, _, g) => Math.abs(n.getTime() - _.getTime()) <= g * 60 * 1e3, N = (n) => n && n instanceof Date && !isNaN(n), se = (n, _ = "YYYY-MM-DD", g = null) => {
    if (g || (g = f.value), _ || (_ = "YYYY-MM-DD"), _ === "YYYY-MM-DD") return x(n);
    $ = {}, z = {};
    const B = {
      YYYY: () => Q(n, g).YYYY,
      YY: () => Q(n, g).YY(),
      M: () => Q(n, g).M,
      MM: () => Q(n, g).MM(),
      MMM: () => Q(n, g).MMM(),
      MMMM: () => Q(n, g).MMMM(),
      MMMMG: () => Q(n, g).MMMMG(),
      D: () => Q(n, g).D,
      DD: () => Q(n, g).DD(),
      S: () => Q(n, g).S(),
      d: () => Q(n, g).d,
      dd: () => Q(n, g).dd(),
      ddd: () => Q(n, g).ddd(),
      dddd: () => Q(n, g).dddd(),
      HH: () => re(n, g).HH,
      H: () => re(n, g).H,
      hh: () => re(n, g).hh,
      h: () => re(n, g).h,
      am: () => re(n, g).am,
      AM: () => re(n, g).AM,
      mm: () => re(n, g).mm,
      m: () => re(n, g).m,
      s: () => re(n, g).s
    };
    return _.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (ee, he) => {
      const i = B[he.replace(/\{|\}/g, "")];
      return i !== void 0 ? i() : he;
    });
  }, x = (n) => {
    const _ = n.getMonth() + 1, g = n.getDate();
    return `${n.getFullYear()}-${_ < 10 ? "0" : ""}${_}-${g < 10 ? "0" : ""}${g}`;
  }, le = (n, _ = "HH:mm", g = null, B = !1) => {
    let ee = !1;
    if (B) {
      const [k, S, T] = [n.getHours(), n.getMinutes(), n.getSeconds()];
      k + S + T === 141 && (ee = !0);
    }
    if (n instanceof Date && _ === "HH:mm") return ee ? "24:00" : ce(n);
    z = {}, g || (g = f.value);
    const he = re(n, g), i = _.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (k, S) => {
      const T = he[S.replace(/\{|\}/g, "")];
      return T !== void 0 ? T : S;
    });
    return ee ? i.replace("23:59", "24:00") : i;
  }, ce = (n) => {
    const _ = n.getHours(), g = n.getMinutes();
    return `${(_ < 10 ? "0" : "") + _}:${(g < 10 ? "0" : "") + g}`;
  }, G = (n) => {
    const _ = Math.floor(n / 60).toString().padStart(2, 0), g = (n % 60).toString().padStart(2, 0);
    return `${_}:${g}`;
  }, Ee = (n) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }, Q = (n, _) => {
    if ($.D) return $;
    const g = n.getFullYear(), B = n.getMonth() + 1, ee = n.getDate(), i = (n.getDay() - 1 + 7) % 7;
    return $ = {
      // Year.
      YYYY: g,
      // 2024.
      YY: () => g.toString().substring(2),
      // 24.
      // Month.
      M: B,
      // 1 to 12.
      MM: () => B.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => _.months[B - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => _.months[B - 1],
      // January to December.
      MMMMG: () => (_.monthsGenitive || _.months)[B - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: ee,
      // 1 to 31.
      DD: () => ee.toString().padStart(2, 0),
      // 01 to 31.
      S: () => Ee(ee),
      // st, nd, rd, th.
      // Day of the week.
      d: i + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => _.weekDaysShort.length ? _.weekDaysShort[i] : _.weekDays[i][0],
      // M to S.
      ddd: () => _.weekDaysShort.length ? _.weekDaysShort[i] : _.weekDays[i].substr(0, 3),
      // Mon to Sun.
      dddd: () => _.weekDays[i]
      // Monday to Sunday.
    }, $;
  }, re = (n, _) => {
    if (z.am) return z;
    let g, B, ee;
    n instanceof Date ? (g = n.getHours(), B = n.getMinutes(), ee = n.getSeconds()) : (g = Math.floor(n / 60), B = Math.floor(n % 60));
    const he = g % 12 ? g % 12 : 12, i = (_ || { am: "am", pm: "pm" })[g === 24 || g < 12 ? "am" : "pm"];
    return z = {
      H: g,
      h: he,
      HH: g.toString().padStart(2, 0),
      hh: he.toString().padStart(2, 0),
      am: i,
      AM: i.toUpperCase(),
      m: B,
      mm: B.toString().padStart(2, 0),
      s: ee
    }, z;
  };
  return {
    addDatePrototypes: P,
    removeDatePrototypes: u,
    updateTexts: m,
    addDays: I,
    subtractDays: Z,
    addHours: t,
    subtractHours: o,
    addMinutes: e,
    subtractMinutes: h,
    snapToInterval: c,
    getWeek: E,
    isToday: L,
    isSameDate: H,
    isInRange: D,
    isLeapYear: l,
    getPreviousFirstDayOfWeek: p,
    stringToDate: b,
    dateToMinutes: a,
    countDays: j,
    datesInSameTimeStep: R,
    isValid: N,
    formatDate: se,
    formatDateLite: x,
    formatTime: le,
    formatTimeLite: ce,
    formatMinutes: G
  };
}, St = (y) => {
  const { dateUtils: s, config: r } = y;
  let d = 0;
  const w = M(() => {
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
    }, o = r.events.sort((e, h) => e.start - h.start < 0 ? -1 : 1);
    for (const e of o)
      if ($(e), z(e), t.byId[e._.id] = e, e.recurring)
        t.recurring.push(e._.id);
      else if (e._.multiday)
        t.multiday.push(e._.id), t.byDate[e._.startFormatted] || (t.byDate[e._.startFormatted] = []), t.byDate[e._.startFormatted].push(e._.id);
      else {
        t.byDate[e._.startFormatted] || (t.byDate[e._.startFormatted] = []), t.byDate[e._.startFormatted].push(e._.id);
        const h = e._.startFormatted.substring(0, 4), c = e._.startFormatted.substring(5, 7), E = e._.startFormatted.substring(8, 10);
        t.byYear[h] || (t.byYear[h] = {}), t.byYear[h][c] || (t.byYear[h][c] = {}), t.byYear[h][c][E] || (t.byYear[h][c][E] = []), t.byYear[h][c][E].push(e._.id);
      }
    return t;
  }), $ = (t) => {
    if (typeof t.start == "string" && (t.start = s.stringToDate(t.start)), typeof t.end == "string" && (t.end = s.stringToDate(t.end)), t.start.setSeconds(0, 0), t.end.getSeconds() >= 59 ? t.end.setMinutes(60, 0, 0) : t.end.setSeconds(0, 0), isNaN(t.start) || isNaN(t.end) || t.end.getTime() < t.start.getTime()) {
      isNaN(t.start) ? console.error(`Vue Cal: invalid start date for event "${t.title}".`, t.start) : isNaN(t.end) ? console.error(`Vue Cal: invalid end date for event "${t.title}".`, t.end) : console.error(`Vue Cal: invalid event dates for event "${t.title}". The event ends before it starts.`, t.start, t.end);
      return;
    }
    t._ || (t._ = {}), t._.multiday = !s.isSameDate(t.start, new Date(t.end.getTime() - 1)), t._.startFormatted = s.formatDate(t.start), t._.startMinutes = ~~s.dateToMinutes(t.start), t._.endMinutes = ~~s.dateToMinutes(t.end);
    const o = t.start.getHours(), e = t.start.getMinutes().toString().padStart(2, 0), h = t.end.getHours(), c = t.end.getMinutes().toString().padStart(2, 0);
    t._.startTimeFormatted24 = `${o.toString().padStart(2, 0)}:${e}`, t._.startTimeFormatted12 = `${o % 12 || 12}${e ? `:${e}` : ""} ${o < 12 ? "AM" : "PM"}`, t._.endTimeFormatted24 = `${h.toString().padStart(2, 0)}:${c}`, t._.endTimeFormatted12 = `${h % 12 || 12}${c ? `:${c}` : ""} ${h < 12 ? "AM" : "PM"}`, t._.duration = Math.abs(~~((t.end - t.start) / 6e4));
  }, z = (t) => {
    t._ || (t._ = {}), t._.id = t._.id || ++d, t.delete || (t.delete = (o) => m(t._.id, o)), t._.deleting = !1, t._.deleted = !1, t.isOverlapping = (o = null) => t.getOverlappingEvents(o).length, t.getOverlappingEvents = (o = null) => {
      var e;
      return I(
        (o == null ? void 0 : o.start) || t.start,
        (o == null ? void 0 : o.end) || t.end,
        { excludeIds: [t._.id], schedule: (e = r.schedules) != null && e.length ? ~~((o == null ? void 0 : o.schedule) || t.schedule) : null }
      );
    }, t._.register = (o) => {
      t._.$el = o, t._.fireCreated && (y.emit("event-created", t), delete t._.fireCreated);
    }, t._.unregister = () => {
      t._.$el = null, t._.register = null, t.isOverlapping = null, t.getOverlappingEvents = null, t.delete = null;
    };
  }, f = (t) => w.value.byId[t], P = (t) => {
    const o = [];
    for (const { start: e, end: h } of t) {
      const c = I(e, h);
      c.length && o.push(...c);
    }
    return o;
  }, u = (t) => {
    if (!t.start || !t.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return r.snapToInterval && (s.snapToInterval(t.start, r.snapToInterval), s.snapToInterval(t.end, r.snapToInterval)), t = { ...t }, t._ || (t._ = {}), t._.id = ++d, t._.fireCreated = !0, r.events.push(t), t;
  }, m = async (t, o = 0) => {
    var L, H;
    if (!t) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let e = typeof t == "string" || !isNaN(t) ? t : null;
    const h = typeof t == "object" ? Object.entries(t) : null;
    if (h) {
      const [D, l] = h[0];
      e = (L = r.events.find((p) => p[D] === l)) == null ? void 0 : L._.id;
    }
    if (!r.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!e) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const c = r.events.findIndex((D) => D._.id === e);
    if (c === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${e}\`.`);
    const E = r.events[c];
    if (E.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${e}\` since it was explicitely set to \`delete: false\`.`);
    switch (o) {
      case 0:
        E._.deleting ? r.events.splice(c, 1) : E._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        E._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        E._.deleted = !0, r.events[c]._.deleted = !0, (H = E._.$el) == null || H.dispatchEvent(new CustomEvent("event-deleted", { detail: E._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        r.events.splice(c, 1), y.emit("update:events", r.events), y.emit("event-delete", E);
        break;
    }
    return !0;
  }, Y = (t, o) => {
    const e = I(t, o);
    if (!e.length) return { cellOverlaps: {}, longestStreak: 0 };
    const h = {};
    let c = [], E = 0;
    e.sort((L, H) => L.start - H.start || L.end - L.start - (H.end - H.start));
    for (const L of e) {
      const H = L._.id;
      h[H] || (h[H] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), c = c.filter((a) => a.end > L.start);
      const D = c.filter((a) => {
        var R;
        return (!((R = r.schedules) != null && R.length) || L.schedule === a.schedule) && a.start < L.end;
      }), l = new Set(D.map((a) => {
        var j;
        return ((j = h[a._.id]) == null ? void 0 : j.position) ?? 0;
      }));
      let p = 0;
      for (; l.has(p); ) p++;
      h[H].position = p, c.push(L);
      const b = Math.max(1, ...D.map((a) => {
        var j;
        return ((j = h[a._.id]) == null ? void 0 : j.maxConcurrent) ?? 1;
      }));
      h[H].maxConcurrent = Math.max(D.length + 1, b);
      for (const a of D)
        h[a._.id].overlaps.add(H), h[H].overlaps.add(a._.id), h[a._.id].maxConcurrent = h[H].maxConcurrent;
      E = Math.max(E, h[H].maxConcurrent);
    }
    for (const L in h) h[L].overlaps = [...h[L].overlaps];
    return { cellOverlaps: h, longestStreak: E };
  }, I = (t, o, { excludeIds: e = [], schedule: h = null, background: c = !0 } = {}) => {
    const E = t.getFullYear(), L = o.getFullYear(), H = t.getMonth() + 1, D = o.getMonth() + 1, l = t.getDate(), p = o.getDate(), b = t.getTime(), a = o.getTime(), j = [], R = new Set(e);
    for (let N = E; N <= L; N++) {
      const se = `${N}`, x = w.value.byYear[se];
      if (!x) continue;
      const le = N === E ? H : 1, ce = N === L ? D : 12;
      for (let G = le; G <= ce; G++) {
        const Ee = String(G).padStart(2, "0"), Q = x[Ee];
        if (Q)
          for (const re in Q) {
            const n = +re;
            if (N === E && G === H && n < l || N === L && G === D && n > p) continue;
            const _ = Q[re];
            for (let g = 0; g < _.length; g++) {
              const B = w.value.byId[_[g]];
              !B || R.has(B._.id) || h !== null && h !== B.schedule || c === !1 && B.background || B.end.getTime() > b && B.start.getTime() < a && j.push(B);
            }
          }
      }
    }
    return j;
  };
  return {
    events: w,
    getEvent: f,
    getViewEvents: P,
    getCellOverlappingEvents: Y,
    getEventsInRange: I,
    createEvent: u,
    deleteEvent: m,
    isEventInRange: (t, o, e) => {
      const h = t.allDay || !r.time, c = h ? new Date(t.start).setHours(0, 0, 0, 0) : t.start.getTime(), E = h ? new Date(t.end).setHours(23, 59, 59, 999) : t.end.getTime(), L = h ? new Date(o).setHours(0, 0, 0, 0) : o.getTime(), H = h ? new Date(e).setHours(23, 59, 59, 999) : e.getTime();
      return E > L && c < H;
    }
  };
}, Ct = ({ config: y, dateUtils: s, emit: r, texts: d, eventsManager: w }, $) => {
  const { availableViews: z } = y, f = ue(y.view && z[y.view] ? y.view : y.defaultView), P = ue(y.selectedDate || null), u = ue(/* @__PURE__ */ new Date()), m = ue(new Date(y.viewDate || u.value));
  m.value.setHours(0, 0, 0, 0);
  const Y = ue(new Date(m));
  let I = null;
  const Z = M(() => f.value === "month" ? Y.value : l.value), t = M(() => f.value === "month" ? new Date(Y.value.getFullYear(), Y.value.getMonth() + 1, 0, 23, 59, 59, 999) : b.value), o = M(() => f.value === "week" ? s.getPreviousFirstDayOfWeek(l.value, y.startWeekOnSunday) : f.value === "month" ? l.value : Z.value), e = M(() => {
    if (f.value === "week") {
      const v = s.addDays(o.value, 7);
      return v.setMilliseconds(-1), v;
    }
    return f.value === "month" ? b.value : t.value;
  }), h = M(() => {
    const v = u.value.getTime();
    if (f.value === "week")
      return o.value.getTime() <= v && v <= e.value.getTime();
    const W = l.value.getTime(), K = b.value.getTime();
    return W <= v && v <= K;
  });
  function c() {
    u.value = /* @__PURE__ */ new Date(), I = setTimeout(c, 60 * 1e3);
  }
  function E() {
    I = setTimeout(c, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), c();
  }
  const L = M(() => {
    if (!y.availableViews[f.value]) return 1;
    let v = y.availableViews[f.value].cols;
    return y.hasHiddenDays && ["week", "month"].includes(f.value) && (v -= y.hasHiddenDays), v;
  }), H = M(() => {
    var v;
    return ((v = y.availableViews[f.value]) == null ? void 0 : v.rows) || 1;
  }), D = M(() => L.value * H.value), l = M(() => {
    if (f.value === "month") {
      let v = Y.value.getDay() || 7;
      return y.startWeekOnSunday && !y.hideWeekdays[7] && (v += 1), y.viewDayOffset && (v -= y.viewDayOffset), s.subtractDays(Y.value, v - 1);
    }
    if (f.value === "week") {
      const v = "1234567".split("").filter((K) => !Object.keys(y.hideWeekdays).includes(K));
      let W = Math.min(...v);
      return y.startWeekOnSunday && !y.hideWeekdays[7] && (W = 1), y.viewDayOffset && (W += y.viewDayOffset), s.addDays(Y.value, W - 1);
    }
    return Y.value;
  }), p = M(() => {
    const v = [], W = ["days", "week", "month"].includes(f.value);
    let K = 0;
    for (let U = 0; U < D.value + K; U++)
      switch (f.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const me = s.addDays(l.value, U), We = me.getDay() || 7;
          if (W && y.hasHiddenDays && y.hideWeekdays[We]) {
            K++;
            continue;
          }
          const Ce = new Date(me);
          Ce.setHours(23, 59, 59, 999), v.push({ start: me, startFormatted: s.formatDate(me), end: Ce });
          break;
        }
        case "year":
          v.push({
            start: new Date(l.value.getFullYear(), U, 1, 0, 0, 0, 0),
            end: new Date(l.value.getFullYear(), U + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          v.push({
            start: new Date(l.value.getFullYear() + U, 0, 1, 0, 0, 0, 0),
            end: new Date(l.value.getFullYear() + U + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return v;
  }), b = M(() => p.value[p.value.length - 1].end), a = ue("right"), j = M(() => {
    const v = Object.keys(y.availableViews);
    return v[v.indexOf(f.value) + 1];
  }), R = M(() => {
    const v = Object.keys(y.availableViews);
    return v[v.indexOf(f.value) - 1];
  });
  function N(v, W, K = !1) {
    if (!W || !W[v]) return v + 1;
    const U = W[v];
    return K && typeof U == "string" ? U.substring(0, 3) : U;
  }
  function se(v, W, K) {
    const { monthsArray: U, monthBeforeDay: me, canTruncate: We, xs: Ce } = K, Te = v.getMonth(), Me = v.getFullYear(), Ye = W.getMonth(), Fe = W.getFullYear(), Ae = Te !== Ye, pt = Me !== Fe, be = We && (Ce || Ae), Le = v.getDate(), ze = W.getDate();
    return pt ? me ? `${N(Te, U, be)} ${Le}, ${Me} - ${N(Ye, U, be)} ${ze}, ${Fe}` : `${Le} ${N(Te, U, be)} ${Me} - ${ze} ${N(Ye, U, be)} ${Fe}` : Ae ? me ? `${N(Te, U, be)} ${Le} - ${N(Ye, U, be)} ${ze}, ${Me}` : `${Le} ${N(Te, U, be)} - ${ze} ${N(Ye, U, be)} ${Me}` : me ? `${N(Te, U, be)} ${Le}-${ze}, ${Me}` : `${Le}-${ze} ${N(Te, U, be)} ${Me}`;
  }
  const x = M(() => {
    const { dateFormat: v, months: W, monthsGenitive: K, week: U, truncations: me } = d, We = y.locale, Ce = me !== !1, Te = v.indexOf("M") < v.indexOf("D"), Me = K && We === "el" ? K : W;
    switch (f.value) {
      case "day":
        return s.formatDate(l.value, v);
      case "days":
      case "week": {
        const Ye = {
          monthsArray: Me,
          monthBeforeDay: Te,
          canTruncate: Ce,
          xs: y.xs
        };
        let Fe = se(l.value, b.value, Ye);
        if (f.value === "week") {
          const Ae = s.getWeek(
            l.value,
            y.startWeekOnSunday && !y.hideWeekdays[7]
          );
          Fe += ` <small>${U} ${Ae}</small>`;
        }
        return Fe;
      }
      case "month": {
        const Ye = `${y.xs && Ce ? "MMM" : "MMMM"} YYYY`;
        return s.formatDate(Z.value, Ye);
      }
      case "year":
        return l.value.getFullYear();
      case "years":
        return `${l.value.getFullYear()} - ${t.value.getFullYear()}`;
    }
  });
  function le() {
    switch (Y.value = new Date(m.value || u.value), Y.value.setHours(0, 0, 0, 0), f.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        Y.value = s.getPreviousFirstDayOfWeek(Y.value, y.startWeekOnSunday && !y.hideWeekdays[7]);
        break;
      case "month":
        Y.value = new Date(Y.value.getFullYear(), Y.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        Y.value = new Date(Y.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        Y.value = new Date(Y.value.getFullYear() - Y.value.getFullYear() % D.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    y.ready && r("view-change", {
      id: f.value,
      title: x.value,
      start: Z.value,
      end: t.value,
      extendedStart: o.value,
      extendedEnd: e.value,
      cellDates: p.value,
      containsToday: h.value,
      events: X.value
    }), u.value = /* @__PURE__ */ new Date();
  }
  function ce(v) {
    const W = f.value, K = y.availableViews[W];
    v[W] && JSON.stringify(v[W]) === JSON.stringify(K) || le();
  }
  function G(v, W = !0) {
    const K = Object.keys(y.availableViews);
    f.value !== v && (K.includes(v) ? (a.value = K.indexOf(v) < K.indexOf(f.value) ? "left" : "right", f.value = v, r("update:view", v), le()) : console.warn(`Vue Cal: the \`${v}\` view is not available.`));
  }
  function Ee() {
    j.value ? G(j.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function Q() {
    R.value ? G(R.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function re() {
    _(!1);
  }
  function n() {
    _(!0);
  }
  function _(v = !0) {
    let W = new Date(m.value);
    switch (f.value) {
      case "day":
      case "days":
        v ? W = s.addDays(b.value, 1) : W = s.subtractDays(l.value, D.value);
        break;
      case "week": {
        v ? (W = s.addDays(e.value, 1), W.setHours(0, 0, 0, 0)) : W = s.subtractDays(o.value, D.value);
        break;
      }
      case "month": {
        const K = v ? 1 : -1;
        W = new Date(W.getFullYear(), W.getMonth() + K, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const K = v ? 1 : -1;
        W = new Date(W.getFullYear() + K, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const K = v ? D.value : -D.value;
        W = new Date(W.getFullYear() + K, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    B(W);
  }
  function g() {
    const v = /* @__PURE__ */ new Date();
    v.setHours(0, 0, 0, 0), B(v);
  }
  function B(v, W = !0, K = !1) {
    if (!s.isValid(v)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [U, me] = [l.value, b.value];
    f.value === "month" && ([U, me] = [Z.value, t.value]), (!s.isInRange(v, U, me) || K) && (v.setHours(0, 0, 0, 0), a.value = v.getTime() < U.getTime() ? "left" : "right", m.value = v, W && r("update:viewDate", v), le());
  }
  function ee(v, W = !0) {
    if (!s.isValid(v)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: K, isSameDate: U } = s;
    (!P.value || !K(P.value) || !U(v, P.value)) && (v.setHours(0, 0, 0, 0), P.value = v, W && r("update:selectedDate", v));
  }
  function he(v) {
    !v && !Y.value.getDay() ? B(s.addDays(Y.value, 1), !0, !0) : (a.value = "left", le());
  }
  function i(v) {
    v && y.startWeekOnSunday && !Y.value.getDay() ? B(s.addDays(Y.value, 1), !0, !0) : !v && y.startWeekOnSunday && Y.value.getDay() === 1 && B(s.subtractDays(Y.value, 1), !0, !0);
  }
  function k() {
    console.log("toggling weekdays", y.hideWeekdays);
  }
  function S(v) {
    var U;
    const W = (U = $.value) == null ? void 0 : U.querySelector(".vuecal__scrollable"), K = v ? v * y.timeCellHeight / y.timeStep : 0;
    W == null || W.scrollTo({ top: K, behavior: "smooth" });
  }
  function T() {
    const v = /* @__PURE__ */ new Date();
    S(v.getHours() * 60 + v.getMinutes());
  }
  function A() {
    S(0);
  }
  const X = M(() => w.getViewEvents(p.value)), ne = w.createEvent, De = w.deleteEvent;
  return fe(() => y.view, (v) => G(v, !1)), fe(() => y.availableViews, ce), fe(() => y.datePicker, () => G("month", !1)), fe(() => y.viewDate, (v) => B(v, !1)), fe(() => y.selectedDate, (v) => ee(v, !1)), fe(() => y.startWeekOnSunday, (v) => he(v)), fe(() => y.hideWeekends, (v) => i(v)), fe(() => y.hideWeekdays, k), fe(() => D.value, () => {
    D.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), fe(() => y.watchRealTime, (v) => {
    v && y.time ? E() : I = clearTimeout(I);
  }), le(), y.time && y.watchRealTime && E(), Xe(() => I = clearTimeout(I)), {
    now: u,
    id: f,
    broaderView: j,
    narrowerView: R,
    title: x,
    viewDate: m,
    start: Z,
    end: t,
    extendedStart: o,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: e,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: l,
    lastCellDate: b,
    containsToday: h,
    selectedDate: P,
    cellDates: p,
    cols: L,
    rows: H,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: X,
    transitionDirection: a,
    switch: G,
    broader: Ee,
    narrower: Q,
    previous: re,
    next: n,
    navigate: _,
    goToToday: g,
    updateViewDate: B,
    updateSelectedDate: ee,
    scrollToCurrentTime: T,
    scrollToTime: S,
    scrollTop: A,
    createEvent: ne,
    deleteEvent: De,
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
}, lt = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], rt = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], ot = "Years", it = "Year", ut = "Month", ct = "Week", dt = "Days", vt = "Day", mt = "Today", ft = "No Event", gt = "All day", ht = "Delete", yt = "Create an event", Dt = "dddd, MMMM D, YYYY", Ke = {
  weekDays: lt,
  months: rt,
  years: ot,
  year: it,
  month: ut,
  week: ct,
  days: dt,
  day: vt,
  today: mt,
  noEvent: ft,
  allDay: gt,
  deleteEvent: ht,
  createEvent: yt,
  dateFormat: Dt
}, Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allDay: gt,
  createEvent: yt,
  dateFormat: Dt,
  day: vt,
  days: dt,
  default: Ke,
  deleteEvent: ht,
  month: ut,
  months: rt,
  noEvent: ft,
  today: mt,
  week: ct,
  weekDays: lt,
  year: it,
  years: ot
}, Symbol.toStringTag, { value: "Module" })), He = $e({
  texts: { ...ge.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: st(ge.texts, Ke)
  // Some Date utils functions need localized texts.
}), Ot = ({ props: y, emit: s, attrs: r, vuecalEl: d, uid: w }) => {
  const $ = $e({
    uid: w,
    // The Vuecal instance unique ID, used for dnd source-target identification.
    emit: s,
    texts: { ...He.texts },
    // Make texts reactive before a locale is loaded.
    // The date utils composable.
    // A class/composable is needed in order to access the user locale in all the methods, and
    // independently of other potential Vue Cal instances on the same page.
    dateUtils: { ...He.dateUtils },
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
  return $.dateUtils = st(Object.assign(ge.texts, $.texts), Ke), $.config = Yt($, y, r), $.eventsManager = St($), $.view = Ct($, d), $.dnd = Et($), $;
}, jt = 24 * 60, Pt = {
  allDayEvents: { type: [Boolean, String], default: !1 },
  // Coming soon.
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
  xs: { type: Boolean, default: !1 }
  // Extra small size for date pickers (truncates texts + specific styles).
  // TODO:
  // minEventWidth: { type: Number, default: 0 },
  // minScheduleWidth: { type: Number, default: 0 },
  // overlapsPerTimeStep: { type: Boolean, default: false },
  // resizeX: { type: Boolean, default: false },
}, Ft = { class: "vuecal__header" }, Lt = {
  key: 0,
  class: "vuecal__views-bar"
}, zt = ["onClick", "innerHTML"], Ht = {
  key: 1,
  class: "vuecal__title-bar"
}, Nt = { class: "vuecal__transition-wrap" }, Wt = ["disabled", "innerHTML"], At = {
  __name: "header",
  setup(y) {
    const s = Ne("vuecal"), { view: r, config: d } = s, w = () => {
      d.clickToNavigate && r.broader();
    }, $ = M(() => d.clickToNavigate ? { click: w } : {});
    return (z, f) => (C(), O("div", Ft, [
      F(z.$slots, "header", {
        view: V(r),
        availableViews: V(d).availableViews,
        vuecal: V(s)
      }),
      z.$slots.header ? q("", !0) : (C(), O(oe, { key: 0 }, [
        V(d).viewsBar ? (C(), O("div", Lt, [
          (C(!0), O(oe, null, ke(V(d).availableViews, (P, u) => (C(), O("button", {
            class: ye(["vuecal__view-button", { "vuecal__view-button--active": V(r).id === u }]),
            onClick: (m) => V(r).switch(u),
            innerHTML: V(s).texts[u],
            type: "button"
          }, null, 10, zt))), 256))
        ])) : q("", !0),
        V(d).titleBar ? (C(), O("nav", Ht, [
          ve("button", {
            class: ye(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !z.$slots["previous-button"] }]),
            onClick: f[0] || (f[0] = (...P) => V(r).previous && V(r).previous(...P)),
            type: "button"
          }, [
            F(z.$slots, "previous-button")
          ], 2),
          ve("div", Nt, [
            Oe(Ge, {
              name: `vuecal-slide-fade--${V(r).transitionDirection}`
            }, {
              default: J(() => [
                (C(), O("div", {
                  key: V(r).id + V(r).start.getTime()
                }, [
                  z.$slots.title || z.$slots[`title.${V(r).id}`] ? (C(), Se(Qe(V(d).clickToNavigate && V(r).broaderView ? "button" : "div"), de({
                    key: 0,
                    class: "vuecal__title"
                  }, Be($.value)), {
                    default: J(() => [
                      z.$slots[`title.${V(r).id}`] ? F(z.$slots, `title.${V(r).id}`, te(de({ key: 0 }, V(r)))) : F(z.$slots, "title", te(de({ key: 1 }, V(r))))
                    ]),
                    _: 3
                  }, 16)) : (C(), Se(Qe(V(d).clickToNavigate && V(r).broaderView ? "button" : "div"), de({
                    key: 1,
                    class: "vuecal__title"
                  }, Be($.value), {
                    innerHTML: V(r).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          V(d).todayButton ? (C(), O(oe, { key: 0 }, [
            z.$slots["today-button"] ? F(z.$slots, "today-button", {
              key: 0,
              navigate: () => !V(r).containsToday && V(r).goToToday(),
              active: V(r).containsToday
            }) : (C(), O("button", {
              key: 1,
              class: ye(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": V(r).containsToday }]),
              onClick: f[1] || (f[1] = (P) => !V(r).containsToday && V(r).goToToday()),
              disabled: !!V(r).containsToday,
              type: "button",
              innerHTML: V(s).texts.today
            }, null, 10, Wt))
          ], 64)) : q("", !0),
          ve("button", {
            class: ye(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !z.$slots["next-button"] }]),
            onClick: f[2] || (f[2] = (...P) => V(r).next && V(r).next(...P)),
            type: "button"
          }, [
            F(z.$slots, "next-button")
          ], 2)
        ])) : q("", !0)
      ], 64))
    ]));
  }
}, It = {
  key: 0,
  class: "vuecal__headings"
}, Bt = {
  key: 0,
  class: "vuecal__weekdays-headings"
}, Rt = ["onClick"], Xt = { class: "vuecal__weekday-day" }, Gt = {
  key: 0,
  class: "vuecal__weekday-date"
}, Jt = {
  key: 1,
  class: "vuecal__schedules-headings w-flex grow"
}, Ut = ["innerHTML"], qt = {
  __name: "headings-bar",
  setup(y) {
    const s = Ne("vuecal"), { view: r, config: d, dateUtils: w } = s, $ = M(() => d.xs ? "day-xs" : d.sm || r.isDays || r.isMonth ? "day-sm" : "day"), z = M(() => (r.isDay || r.isDays || r.isWeek || r.isMonth) && !(r.isDay && !d.schedules)), f = M(() => r.cellDates.slice(0, r.cols).map(({ start: u }) => ({
      id: Re[u.getDay()],
      date: u,
      dateNumber: u.getDate(),
      day: w.formatDate(u, "dddd"),
      "day-sm": w.formatDate(u, "ddd"),
      "day-xs": w.formatDate(u, "dd"),
      isToday: w.isToday(u)
    }))), P = {
      click: (u) => {
        (r.isDays || r.isWeek) && r.updateSelectedDate(u);
      }
    };
    return (u, m) => z.value ? (C(), O("div", It, [
      V(r).isDay ? q("", !0) : (C(), O("div", Bt, [
        (C(!0), O(oe, null, ke(f.value, (Y, I) => (C(), O("div", {
          class: ye(["vuecal__weekday", { "vuecal__weekday--today": Y.isToday }]),
          key: I,
          onClick: (Z) => P.click(Y.date)
        }, [
          F(u.$slots, "weekday-heading", {
            label: Y[$.value],
            id: Y.id,
            date: Y.date
          }, () => [
            ve("span", Xt, ie(Y[$.value]), 1),
            V(r).isMonth ? q("", !0) : (C(), O("strong", Gt, ie(Y.dateNumber), 1))
          ])
        ], 10, Rt))), 128))
      ])),
      V(d).schedules ? (C(), O("div", Jt, [
        (C(!0), O(oe, null, ke(f.value, (Y, I) => (C(), O(oe, { key: I }, [
          (C(!0), O(oe, null, ke(V(d).schedules, (Z, t) => (C(), O(oe, { key: t }, [
            u.$slots["schedule-heading"] ? (C(), O("div", {
              key: 0,
              class: ye(["vuecal__schedule vuecal__schedule--heading", Z.class])
            }, [
              F(u.$slots, "schedule-heading", {
                schedule: Z,
                view: V(r)
              })
            ], 2)) : (C(), O("div", {
              key: 1,
              class: ye(["vuecal__schedule vuecal__schedule--heading", Z.class]),
              innerHTML: Z.label
            }, null, 10, Ut))
          ], 64))), 128))
        ], 64))), 128))
      ])) : q("", !0)
    ])) : q("", !0);
  }
}, Zt = { class: "vuecal__time-column" }, Kt = {
  __name: "time-column",
  setup(y) {
    const s = Ne("vuecal"), { config: r, texts: d } = s, w = M(() => {
      const $ = [];
      for (let f = r.timeFrom; f < r.timeTo; f += r.timeStep) {
        const P = f + r.timeStep > r.timeTo, u = ~~(f / 60), m = f % 60, Y = d[f < 720 ? "am" : "pm"];
        let I = null;
        P && (I = `calc(var(--vuecal-time-cell-height) * ${(r.timeTo - f) / r.timeStep})`), $.push({
          minutesSum: f,
          // The sum of hours + minutes in minutes.
          hours: u,
          minutes: m,
          formatted12: `${u % 12 ? u % 12 : 12}${m ? `:${m.toString().padStart(2, 0)}` : ""}${Y}`,
          formatted24: `${u.toString().padStart(2, 0)}:${m.toString().padStart(2, 0)}`,
          height: I
        });
      }
      return $;
    });
    return ($, z) => (C(), O("div", Zt, [
      (C(!0), O(oe, null, ke(w.value, (f, P) => (C(), O("div", {
        class: "vuecal__time-cell",
        key: P,
        style: _e({ height: f.height || null })
      }, [
        F($.$slots, "time-cell", {
          index: P,
          minutes: f.minutes,
          hours: f.hours,
          minutesSum: f.minutesSum,
          format12: f.formatted12,
          format24: f.formatted24
        }, () => [
          ve("label", null, ie(V(r).twelveHour ? f.formatted12 : f.formatted24), 1)
        ])
      ], 4))), 128))
    ]));
  }
}, Qt = ["draggable"], xt = { class: "vuecal__event-details" }, ea = { class: "vuecal__event-title" }, ta = {
  key: 0,
  class: "vuecal__event-time"
}, aa = {
  key: 0,
  class: "vuecal__event-comma"
}, na = { class: "vuecal__event-start" }, sa = {
  key: 1,
  class: "vuecal__event-end"
}, la = ["innerHTML"], nt = {
  __name: "event",
  props: {
    event: { type: Object, required: !0 }
  },
  emits: ["event-drag-start", "event-drag-end", "event-resize-start", "event-resize-end"],
  setup(y, { emit: s }) {
    const { config: r, view: d, dnd: w, touch: $, dateUtils: z } = Ne("vuecal"), f = y, P = ue(null), u = $e(f.event), m = $e({
      dragging: !1,
      resizing: !1,
      fromResizer: !1,
      // If the drag originates from the resizer element.
      holding: !1,
      // When the event is clicked and hold for a certain amount of time.
      holdTimer: null,
      // event click and hold detection.
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
    }), Y = M(() => r.editableEvents.drag && u.draggable !== !1 && !u.background), I = M(() => d.isMonth || d.isYear || d.isYears ? !1 : r.time && r.editableEvents.resize && u.resizable !== !1 && !u.background);
    M(() => r.editableEvents.delete && u.deletable !== !1 && !u.background);
    const Z = M(() => {
      var D, l, p;
      return {
        [`vuecal__event--${u._.id}`]: !0,
        [u.class]: !!u.class,
        "vuecal__event--recurring": !!u.recurring,
        "vuecal__event--background": !!u.background,
        "vuecal__event--multiday": !!((D = u._) != null && D.multiday),
        "vuecal__event--cut-top": ((l = u._) == null ? void 0 : l.startMinutes) < r.timeFrom,
        "vuecal__event--cut-bottom": ((p = u._) == null ? void 0 : p.endMinutes) > r.timeTo || u._.multiday,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !u._.draggingGhost && u._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": u._.draggingGhost,
        "vuecal__event--resizing": m.resizing
      };
    }), t = M(() => {
      const D = (d.isDay || d.isDays || d.isWeek) && r.time;
      if (!D && !u.backgroundColor && !u.color) return !1;
      const l = {
        backgroundColor: u.backgroundColor || null,
        color: u.color || null
      };
      if (D) {
        const p = Math.max(r.timeFrom, u._.startMinutes), b = Math.min(r.timeTo, u._.endMinutes) + (u._.duration && !u._.endMinutes ? 24 * 60 : 0), a = Ve(p, r), j = Ve(b, r) - a;
        l.top = `${a}%`, l.height = `${j}%`;
      }
      return l;
    }), o = M(() => {
      const D = { ...r.eventListeners.event };
      for (const [b, a] of Object.entries(D))
        ["resize-end"].includes(b) || (D[b] = (j) => {
          j.type !== "drop" && a(j.type ? { e: j, event: u } : j);
        });
      const l = { ...D };
      D.touchstart = (b) => {
        var a;
        b.stopPropagation(), e(b), (a = l.touchstart) == null || a.call(l, { e: b, event: u });
      }, D.mousedown = (b) => {
        var a;
        b.stopPropagation(), e(b), (a = l.mousedown) == null || a.call(l, { e: b, event: u });
      };
      let p = null;
      return D.click = (b) => {
        var a;
        (a = l.click) == null || a.call(l, { e: b, event: u }), p ? p = clearTimeout(p) : p = setTimeout(() => {
          var j;
          p = null, (j = l["delayed-click"]) == null || j.call(l, { e: b, event: u });
        }, 400);
      }, D.dblclick = (b) => {
        l.dblclick ? l.dblclick({ e: b, event: u }) : u.delete(1);
      }, D;
    }), e = (D) => {
      var b, a, j;
      const l = ((b = D.touches) == null ? void 0 : b[0]) || D;
      m.fromResizer = l.target.matches(".vuecal__event-resizer, .vuecal__event-resizer *");
      const p = P.value.getBoundingClientRect();
      m.startX = (((a = D.touches) == null ? void 0 : a[0]) || D).clientX - p.left, m.startY = (((j = D.touches) == null ? void 0 : j[0]) || D).clientY - p.top, m.startPercentageX = m.startX * 100 / p.width, m.startPercentageY = m.startY * 100 / p.height, m.cellEl = P.value.closest(".vuecal__cell"), m.resizeStartDate = u.start, H(D.type === "touchstart" ? "touchmove" : "mousemove", h), H(D.type === "touchstart" ? "touchend" : "mouseup", c, { once: !0 }), m.holdTimer = setTimeout(() => {
        var R, N;
        m.holding = !0, (N = (R = o.value).hold) == null || N.call(R, { e: D, event: u });
      }, 1e3);
    }, h = async (D) => {
      var p, b, a, j;
      const l = ((p = D.touches) == null ? void 0 : p[0]) || D;
      if (m.fromResizer && !m.resizing && (m.resizing = !0, m.resizingOriginalEvent = { ...u, _: { ...u._ } }, $.isResizingEvent = !0, (a = (b = o.value).resizeStart) == null || a.call(b, { e: D, event: u })), m.holdTimer = clearTimeout(m.holdTimer), m.holding = !1, m.cellEl) {
        const { top: R, left: N, width: se, height: x } = m.cellEl.getBoundingClientRect();
        m.moveX = l.clientX - N, m.moveY = l.clientY - R, m.movePercentageX = m.moveX * 100 / se, m.movePercentageY = m.moveY * 100 / x;
      }
      if (m.fromResizer) {
        const { newStart: R, newEnd: N } = E(u);
        let se = !0;
        const { resize: x } = (j = r.eventListeners) == null ? void 0 : j.event;
        x && (se = await x({
          e: D,
          event: { ...u, start: R, end: N },
          overlaps: u.getOverlappingEvents({ start: R, end: N })
        })), se !== !1 ? (u.start = R, u.end = N, m.resizingLastAcceptedEvent && (m.resizingLastAcceptedEvent = null)) : x && (m.resizingLastAcceptedEvent = { ...u, _: { ...u._ } });
      }
    }, c = async (D) => {
      var l, p;
      if (m.holdTimer = clearTimeout(m.holdTimer), m.holding = !1, m.resizing) {
        const { newStart: b, newEnd: a } = E(u);
        let j = !0;
        const R = o.value["resize-end"];
        R && (j = await R({
          e: D,
          event: u,
          original: m.resizingOriginalEvent,
          // Original event details before resizing.
          overlaps: u.getOverlappingEvents({ start: b, end: a })
        })), u.start = j === !1 ? (m.resizingLastAcceptedEvent || m.resizingOriginalEvent).start : ((l = m.resizingLastAcceptedEvent) == null ? void 0 : l.start) || b, u.end = j === !1 ? (m.resizingLastAcceptedEvent || m.resizingOriginalEvent).end : ((p = m.resizingLastAcceptedEvent) == null ? void 0 : p.end) || a, u._.duration < 1 && (u.start = m.resizingOriginalEvent.start, u.end = m.resizingOriginalEvent.end), $.isResizingEvent = !1;
      }
      document.removeEventListener(D.type === "touchend" ? "touchmove" : "mousemove", h), m.resizing = !1, m.fromResizer = !1, m.dragging = !1, m.startX = 0, m.startY = 0, m.moveX = 0, m.moveY = 0, m.startPercentageX = 0, m.startPercentageY = 0, m.movePercentageX = 0, m.movePercentageY = 0, m.cellEl = null, m.resizeStartDate = null, m.resizingOriginalEvent = null, m.resizingLastAcceptedEvent = null, m.schedule = null;
    }, E = (D) => {
      const l = new Date(D.start.getFullYear(), D.start.getMonth(), D.start.getDate());
      new Date(l).setDate(l.getDate() + 1);
      let b = Pe(m.movePercentageY, r);
      if (b = Math.max(0, Math.min(b, 24 * 60)), r.snapToInterval) {
        const R = b + r.snapToInterval / 2;
        b = R - R % r.snapToInterval;
      }
      let a = D.start, j = new Date(l.getTime() + b * 6e4);
      return j < m.resizeStartDate && (a = j, j = m.resizeStartDate), { newStart: a, newEnd: j };
    };
    qe(() => u._.register(P.value));
    const L = [], H = (D, l, p) => {
      document.addEventListener(D, l, p), L.push({ event: D, handler: l, options: p });
    };
    return Xe(() => {
      u._.unregister();
      for (const { event: D, handler: l, options: p } of L)
        document.removeEventListener(D, l, p);
    }), (D, l) => (C(), O("div", de({ class: "vuecal__event" }, Be(o.value, !0), {
      ref_key: "eventEl",
      ref: P,
      class: Z.value,
      style: t.value,
      draggable: Y.value ? "true" : void 0,
      onDragstart: l[2] || (l[2] = (p) => Y.value && V(w).eventDragStart(p, u)),
      onDragend: l[3] || (l[3] = (p) => Y.value && V(w).eventDragEnd(p, u))
    }), [
      ve("div", xt, [
        F(D.$slots, "event", { event: u }, () => [
          ve("div", ea, ie(u.title), 1),
          V(r).time && !(V(r).allDayEvents && u.allDay) ? (C(), O("div", ta, [
            V(d).isMonth ? (C(), O("span", aa, ",")) : q("", !0),
            ve("span", na, ie(u._[`startTimeFormatted${V(r).twelveHour ? 12 : 24}`]), 1),
            V(d).isMonth ? q("", !0) : (C(), O("span", sa, "- " + ie(u._[`endTimeFormatted${V(r).twelveHour ? 12 : 24}`]), 1))
          ])) : q("", !0),
          ve("div", {
            class: "vuecal__event-content",
            innerHTML: u.content
          }, null, 8, la)
        ])
      ]),
      I.value ? (C(), O("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: l[0] || (l[0] = xe(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : q("", !0),
      Oe(Ge, { name: "vuecal-delete-btn" }, {
        default: J(() => [
          u._.deleting ? (C(), O("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: l[1] || (l[1] = xe((p) => u.delete(3), ["stop"]))
          }, "Delete")) : q("", !0)
        ]),
        _: 1
      })
    ], 16, Qt));
  }
}, ra = ["innerHTML"], oa = ["data-schedule"], ia = {
  key: 1,
  class: "vuecal__cell-date"
}, ua = {
  key: 2,
  class: "vuecal__cell-content"
}, ca = {
  key: 3,
  class: "vuecal__cell-events"
}, da = {
  key: 1,
  class: "vuecal__cell-date"
}, va = {
  key: 2,
  class: "vuecal__cell-content"
}, ma = {
  key: 3,
  class: "vuecal__cell-events"
}, fa = {
  key: 5,
  class: "vuecal__cell-events-count"
}, ga = ["title"], ha = {
  __name: "cell",
  props: {
    // Even with time=false, the date of the cell will still be provided in order to attach
    // events to a specific date.
    start: { type: Date, required: !0 },
    end: { type: Date, required: !0 },
    index: { type: Number, required: !0 }
  },
  setup(y) {
    const s = y, r = Ne("vuecal"), { view: d, config: w, dateUtils: $, eventsManager: z, dnd: f, touch: P } = r, u = M(() => $.isToday(s.start)), m = ue(null), Y = ue([]), I = ue(!1), Z = (i) => {
      Y.value.push(i.detail), I.value = !0;
    }, t = () => setTimeout(() => I.value = !1, 300), o = $e({
      dragging: !1,
      holding: !1,
      // When the cell is clicked and hold for a certain amount of time.
      holdTimer: null,
      // Cell click and hold detection.
      thresholdPassed: !1,
      // If the drag threshold has been passed.
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
    }), e = ue(!1), h = ue({ cellOverlaps: {}, longestStreak: 0 }), c = M(() => {
      let i = Math.min(o.startPercentageY, o.movePercentageY), k = Math.max(o.startPercentageY, o.movePercentageY), S = Pe(i, w), T = Pe(k, w);
      return w.snapToInterval && (S = $.snapToInterval(S, w.snapToInterval), T = $.snapToInterval(T, w.snapToInterval), i = Ve(S, w), k = Ve(T, w)), {
        style: {
          top: `${i}%`,
          height: `${Math.abs(k - i)}%`
        },
        startMinutes: S,
        endMinutes: T,
        start: $.formatMinutes(S),
        end: $.formatMinutes(T),
        ...o.schedule ? { schedule: o.schedule } : {}
      };
    }), E = M(() => {
      const i = w.editableEvents.create && (o.dragging || e.value), k = w.eventCreateMinDrag && o.thresholdPassed || !w.eventCreateMinDrag;
      return i && k;
    }), L = M(() => {
      var ne;
      const i = /* @__PURE__ */ new Date(), k = d.start.getFullYear(), S = d.start.getMonth(), T = s.start.getFullYear(), A = s.start.getMonth();
      return {
        [`vuecal__cell--${Re[s.start.getDay()]}`]: d.isDay || d.isDays || d.isWeek || d.isMonth,
        [`vuecal__cell--${Tt[A]}`]: d.isYear,
        [`vuecal__cell--${T}`]: d.isYears,
        "vuecal__cell--today": u.value,
        "vuecal__cell--current-month": d.isYear && T === i.getFullYear() && A === i.getMonth(),
        "vuecal__cell--current-year": d.isYears && T === i.getFullYear(),
        "vuecal__cell--out-of-range": d.isMonth && (T !== k || A !== S),
        "vuecal__cell--before-min": x.value && N.value,
        "vuecal__cell--after-max": x.value && se.value,
        "vuecal__cell--disabled": x.value,
        "vuecal__cell--selected": d.selectedDate && d.selectedDate.getTime() >= s.start.getTime() && d.selectedDate.getTime() <= s.end.getTime(),
        "vuecal__cell--has-schedules": (ne = w.schedules) == null ? void 0 : ne.length,
        "vuecal__cell--dragging": o.dragging,
        "vuecal__cell--has-events": D.value.length
      };
    });
    M(() => $.formatDate(s.start));
    const H = M(() => {
      switch (d.id) {
        case "day":
          return "";
        case "days":
          return w.availableViews.days.rows > 1 && $.formatDate(s.start, "D"), "";
        case "week":
          return "";
        case "month":
          return $.formatDate(s.start, "D");
        case "year":
          return $.formatDate(s.start, w.xs ? "MMM" : "MMMM");
        case "years":
          return $.formatDate(s.start, "YYYY");
      }
    }), D = M(() => w.datePicker ? [] : z.getEventsInRange(s.start, s.end, { excludeIds: Y.value })), l = M(() => D.value.filter((i) => !i.background)), p = M(() => {
      var i;
      return (i = w.schedules) == null ? void 0 : i.reduce((k, S) => (k[S.id] = D.value.filter((T) => T.schedule === S.id), k), {});
    }), b = M(() => {
      if (d.isMonth || d.isYear || d.isYears) return {};
      const i = document.documentElement.getAttribute("dir") === "rtl", k = {};
      for (const S of D.value) {
        const T = S._.id, { maxConcurrent: A = 1, position: X = 0 } = h.value.cellOverlaps[T] || {}, ne = i ? "right" : "left";
        k[T] = { [ne]: `${100 / A * X}%` }, w.stackEvents ? k[T].width = `${100 / A + (X === A - 1 ? 0 : 15)}%` : k[T].width = `${100 / A}%`;
      }
      return k;
    }), a = M(() => {
      const i = {};
      for (const k of D.value) {
        const S = k._.id, { maxConcurrent: T = 1, position: A = 0 } = h.value.cellOverlaps[S] || {};
        i[S] = `vuecal__event--stack-${A + 1}-${T}`;
      }
      return i;
    }), j = M(() => w.showCellEventCount && l.value.length), R = M(() => {
      var S;
      if (!w.specialHours || d.isMonth || d.isYear || d.isYears) return;
      const i = Re[s.start.getDay()];
      let k = (S = w.specialHours) == null ? void 0 : S[i];
      if (k)
        return Array.isArray(k) || (k = [k]), k.map((T) => {
          let { from: A, to: X, class: ne, label: De } = T;
          if (isNaN(A) || isNaN(X) || w.timeFrom >= X || w.timeTo <= A) return;
          A = Math.max(w.timeFrom, A), X = Math.min(w.timeTo, X);
          const v = Ve(A, w), W = Ve(X, w) - v;
          return {
            style: { top: `${v}%`, height: `${W}%` },
            label: De,
            class: ne
          };
        }).filter((T) => !!T);
    }), N = M(() => w.minTimestamp !== null && w.minTimestamp > s.end.getTime()), se = M(() => w.maxTimestamp && w.maxTimestamp < s.start.getTime()), x = M(() => {
      const { disableDays: i } = w, k = d.isYear || d.isYears;
      return i.length && i.includes($.formatDate(s.start)) && !k ? !0 : N.value || se.value;
    }), le = $e({
      show: M(() => {
        if (!(!d.isDay && !d.isDays && !d.isWeek) && !(!u.value || !w.time) && !(w.timeFrom > $.dateToMinutes(d.now)) && !($.dateToMinutes(d.now) > w.timeTo))
          return !0;
      }),
      nowInMinutes: M(() => $.dateToMinutes(d.now)),
      todaysTimePosition: M(() => Ve(le.nowInMinutes, w)),
      style: M(() => `top: ${le.todaysTimePosition}%`),
      currentTime: M(() => $.formatTime(d.now))
    }), ce = M(() => {
      if (x.value) return {};
      const i = { ...w.eventListeners.cell };
      for (const [T, A] of Object.entries(i))
        i[T] = (X) => {
          var ne, De, v;
          (v = (De = X.target || ((ne = X.e) == null ? void 0 : ne.target)).closest) != null && v.call(De, ".vuecal__event") || A(X.type ? { e: X, cell: G.value, cursor: Q.value } : X);
        };
      const k = { ...i };
      let S = null;
      return i.click = (T) => {
        var X;
        re();
        const A = Ee(T);
        (X = k.click) == null || X.call(k, { e: T, cell: G.value, cursor: A }), S ? S = clearTimeout(S) : S = setTimeout(() => {
          var ne;
          S = null, (ne = k["delayed-click"]) == null || ne.call(k, { e: T, cell: G.value, cursor: A });
        }, 400);
      }, (w.time && d.isDay || d.isDays || d.isWeek) && (i.touchstart = (T) => {
        var A;
        n(T.e || T), (A = k.touchstart) == null || A.call(k, { e: T, cell: G.value, cursor: Q.value });
      }, i.mousedown = (T) => {
        var A;
        n(T.e || T), (A = k.mousedown) == null || A.call(k, { e: T, cell: G.value, cursor: Q.value });
      }), k.dblclick && (i.dblclick = (T) => {
        var A;
        (A = k.dblclick) == null || A.call(k, { e: T, cell: G.value, cursor: Ee(T) });
      }), w.editableEvents.drag && (i.dragenter = (T) => f.cellDragEnter(T, G.value), i.dragover = (T) => {
        T.preventDefault(), f.cellDragOver(T, G.value);
      }, i.dragleave = (T) => f.cellDragLeave(T, G.value), i.drop = (T) => f.cellDragDrop(T, G.value)), i;
    }), G = M(() => ({
      start: s.start,
      end: s.end,
      events: D,
      ...o.schedule ? { schedule: o.schedule } : {},
      goNarrower: () => d.narrower(),
      goBroader: () => d.broader(),
      broader: d.broaderView,
      narrower: d.narrowerView
    })), Ee = (i) => {
      var X;
      const k = (((X = i.touches) == null ? void 0 : X[0]) || i).clientY, { top: S } = m.value.getBoundingClientRect(), T = Ze(k - S, m.value), A = new Date(s.start);
      return A.setMinutes(Pe(T, w)), { y: T, date: A };
    }, Q = M(() => {
      const i = Pe(o.movePercentageY || o.startPercentageY, w), k = new Date(s.start);
      return k.setMinutes(i), {
        x: o.movePercentageX || o.startPercentageX,
        y: o.movePercentageY || o.startPercentageY,
        date: k
      };
    }), re = () => {
      d.updateSelectedDate(s.start), w.clickToNavigate && ((d.isMonth || d.isDays || d.isWeek) && w.availableViews.day ? d.switch("day") : d.isYear && w.availableViews.month ? d.switch("month") : d.isYears && w.availableViews.year && d.switch("year")), d.updateViewDate(s.start);
    }, n = (i) => {
      var S, T;
      o.schedule = ~~i.target.dataset.schedule;
      const k = m.value.getBoundingClientRect();
      o.startX = (((S = i.touches) == null ? void 0 : S[0]) || i).clientX - k.left, o.startY = (((T = i.touches) == null ? void 0 : T[0]) || i).clientY - k.top, o.startPercentageX = o.startX * 100 / k.width, o.startPercentageY = o.startY * 100 / k.height, o.thresholdPassed = !1, document.addEventListener(i.type === "touchstart" ? "touchmove" : "mousemove", _), document.addEventListener(i.type === "touchstart" ? "touchend" : "mouseup", g, { once: !0 }), o.holdTimer = setTimeout(() => {
        var A, X;
        o.holding = !0, (X = (A = ce.value).hold) == null || X.call(A, { e: i, cell: G.value, cursor: Q.value });
      }, 1e3);
    }, _ = (i) => {
      var S, T, A, X, ne, De;
      o.dragging || (P.isDraggingCell = !0, (T = (S = ce.value)["drag-start"]) == null || T.call(S, { e: i, cell: G.value, cursor: Q.value })), o.dragging = !0, o.holdTimer = clearTimeout(o.holdTimer), o.holding = !1;
      const k = m.value.getBoundingClientRect();
      o.moveX = (((A = i.touches) == null ? void 0 : A[0]) || i).clientX - k.left, o.moveY = (((X = i.touches) == null ? void 0 : X[0]) || i).clientY - k.top, o.movePercentageX = o.moveX * 100 / k.width, o.movePercentageY = o.moveY * 100 / k.height, w.eventCreateMinDrag && Math.abs(o.startY - o.moveY) > w.eventCreateMinDrag && (o.thresholdPassed = !0), (De = (ne = ce.value).drag) == null || De.call(ne, { e: i, cell: G.value, cursor: Q.value });
    }, g = async (i) => {
      var k, S;
      document.removeEventListener(i.type === "touchend" ? "touchmove" : "mousemove", _, { passive: !1 }), o.dragging && ((S = (k = ce.value)["drag-end"]) == null || S.call(k, { e: i, cell: G.value, cursor: Q.value }), P.isDraggingCell = !1, w.editableEvents.create && (e.value = !0, await B(i), e.value = !1)), o.holdTimer = clearTimeout(o.holdTimer), o.holding = !1, o.dragging = !1, o.startX = 0, o.startY = 0, o.moveX = 0, o.moveY = 0, o.startPercentageX = 0, o.startPercentageY = 0, o.movePercentageX = 0, o.movePercentageY = 0, o.thresholdPassed = !1, o.schedule = null;
    }, B = async (i) => {
      if (!E.value) return;
      let { start: k, end: S, startMinutes: T, endMinutes: A } = c.value;
      k = new Date(s.start), k.setMinutes(T), S = new Date(s.start), S.setMinutes(A);
      let X = { ...c.value, start: k, end: S };
      const { create: ne } = w.eventListeners.event;
      if (typeof ne == "function") {
        const De = X;
        X = await new Promise((v) => ne({ e: i, event: X, cell: G.value, resolve: v, cursor: Q.value })), X && typeof X == "object" && d.createEvent(X), X && typeof X == "boolean" && d.createEvent(De);
      } else d.createEvent(X);
    }, ee = () => {
      var i;
      for (const k of Object.keys(ce.value))
        (i = m.value) == null || i.removeEventListener(k, ce.value[k]);
    }, he = () => {
      h.value = z.getCellOverlappingEvents(s.start, s.end);
    };
    return fe(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !d.isYears && !d.isYear && l.value.map((i) => `${i._.id}${i.start.getTime()}${i.end.getTime()}`).join(),
      async () => {
        await Ue(), he();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Xe(async () => {
      for (const i of Y.value) z.deleteEvent(i, 3);
      ee(), await Ue();
    }), (i, k) => (C(), O("div", de({
      class: ["vuecal__cell", L.value],
      ref_key: "cellEl",
      ref: m
    }, Be(ce.value, !0)), [
      i.$slots.cell ? F(i.$slots, "cell", {
        key: 0,
        cell: G.value
      }) : q("", !0),
      R.value ? (C(!0), O(oe, { key: 1 }, ke(R.value, (S, T) => (C(), O("div", {
        class: ye(["vuecal__special-hours", S.class]),
        style: _e(S.style),
        innerHTML: S.label || ""
      }, null, 14, ra))), 256)) : q("", !0),
      !i.$slots.cell && V(w).schedules ? (C(!0), O(oe, { key: 2 }, ke(V(w).schedules, (S) => (C(), O("div", {
        class: ye(["vuecal__schedule vuecal__schedule--cell", S.class]),
        key: S.id,
        style: _e(S.style || null),
        "data-schedule": S.id
      }, [
        i.$slots["cell-events"] ? F(i.$slots, "cell-events", {
          key: 0,
          cell: G.value
        }) : q("", !0),
        H.value || i.$slots["cell-date"] ? (C(), O("div", ia, [
          F(i.$slots, "cell-date", { cell: G.value }, () => [
            et(ie(H.value), 1)
          ])
        ])) : q("", !0),
        i.$slots["cell-content"] ? (C(), O("div", ua, [
          F(i.$slots, "cell-content", { cell: G.value })
        ])) : q("", !0),
        i.$slots["cell-events"] && D.value.length ? (C(), O("div", ca, [
          F(i.$slots, "cell-events", { cell: G.value })
        ])) : D.value.length || I.value ? (C(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: k[0] || (k[0] = (T) => I.value = !0),
          onAfterLeave: t,
          tag: "div"
        }, {
          default: J(() => [
            (C(!0), O(oe, null, ke(p.value[S.id], (T) => (C(), Se(nt, {
              key: T._.id,
              event: T,
              onEventDeleted: Z,
              style: _e(b.value[T._.id])
            }, je({ _: 2 }, [
              i.$slots.event ? {
                name: "event",
                fn: J((A) => [
                  F(i.$slots, "event", de({ ref_for: !0 }, A))
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["event", "style"]))), 128))
          ]),
          _: 2
        }, 1024)) : q("", !0),
        E.value && o.schedule === S.id ? (C(), O("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: _e(c.value.style)
        }, ie(c.value.start) + " - " + ie(c.value.end), 5)) : q("", !0)
      ], 14, oa))), 128)) : q("", !0),
      !i.$slots.cell && !V(w).schedules ? (C(), O(oe, { key: 3 }, [
        i.$slots["cell-events"] ? F(i.$slots, "cell-events", {
          key: 0,
          cell: G.value
        }) : q("", !0),
        H.value || i.$slots["cell-date"] ? (C(), O("div", da, [
          F(i.$slots, "cell-date", { cell: G.value }, () => [
            et(ie(H.value), 1)
          ])
        ])) : q("", !0),
        i.$slots["cell-content"] ? (C(), O("div", va, [
          F(i.$slots, "cell-content", { cell: G.value })
        ])) : q("", !0),
        i.$slots["cell-events"] && D.value.length ? (C(), O("div", ma, [
          F(i.$slots, "cell-events", { cell: G.value })
        ])) : !(V(d).isMonth && !V(w).eventsOnMonthView) && !V(d).isYear && !V(d).isYears && (D.value.length || I.value) ? (C(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: k[1] || (k[1] = (S) => I.value = !0),
          onAfterLeave: t,
          tag: "div"
        }, {
          default: J(() => [
            (C(!0), O(oe, null, ke(D.value, (S) => (C(), Se(nt, {
              key: S._.id,
              event: S,
              onEventDeleted: Z,
              class: ye(a.value[S._.id]),
              style: _e(b.value[S._.id])
            }, je({ _: 2 }, [
              i.$slots.event ? {
                name: "event",
                fn: J((T) => [
                  F(i.$slots, "event", de({ ref_for: !0 }, T))
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["event", "class", "style"]))), 128))
          ]),
          _: 3
        })) : q("", !0),
        E.value ? (C(), O("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: _e(c.value.style)
        }, ie(c.value.start) + " - " + ie(c.value.end), 5)) : q("", !0)
      ], 64)) : q("", !0),
      i.$slots["event-count"] ? F(i.$slots, "event-count", {
        key: 4,
        events: l.value
      }) : j.value ? (C(), O("div", fa, ie(l.value.length), 1)) : q("", !0),
      le.show ? (C(), O("div", {
        key: 6,
        class: "vuecal__now-line",
        style: _e(le.style),
        title: le.currentTime
      }, [
        ve("span", null, ie(le.currentTime), 1)
      ], 12, ga)) : q("", !0)
    ], 16));
  }
}, ya = {
  __name: "body",
  setup(y) {
    const s = Ne("vuecal"), { view: r, config: d, dateUtils: w } = s, $ = ue(null), z = ue(null), f = M(() => ({
      "--vuecal-grid-columns": r.cols,
      "--vuecal-grid-rows": r.rows
    })), P = M(() => {
      const Y = w.formatTime(Pe(z.value, d));
      return {
        style: { top: `${z.value}%` },
        time: Y
      };
    }), u = (Y) => {
      var t;
      if (r.isMonth || r.isYear || r.isYears) return;
      const I = (((t = Y.touches) == null ? void 0 : t[0]) || Y).clientY, { top: Z } = $.value.getBoundingClientRect();
      z.value = Ze(I - Z, $.value);
    }, m = () => {
      z.value = null;
    };
    return qe(() => {
      $.value.addEventListener("mousemove", u), $.value.addEventListener("touchmove", u), $.value.addEventListener("mouseleave", m), $.value.addEventListener("touchend", m);
    }), Xe(() => {
      $.value && ($.value.removeEventListener("mousemove", u), $.value.removeEventListener("touchmove", u), $.value.removeEventListener("mouseleave", m), $.value.removeEventListener("touchend", m));
    }), (Y, I) => (C(), O("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: $,
      style: _e(f.value)
    }, [
      Oe(Ge, { name: "vuecal-shrink" }, {
        default: J(() => [
          V(d).timeAtCursor && z.value !== null ? (C(), O("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: _e(P.value.style)
          }, [
            ve("label", null, ie(P.value.time), 1)
          ], 4)) : q("", !0)
        ]),
        _: 1
      }),
      (C(!0), O(oe, null, ke(V(r).cellDates, (Z, t) => (C(), Se(ha, {
        key: t,
        start: Z.start,
        end: Z.end,
        index: t
      }, je({ _: 2 }, [
        Y.$slots.cell ? {
          name: "cell",
          fn: J((o) => [
            F(Y.$slots, "cell", de({ ref_for: !0 }, o))
          ]),
          key: "0"
        } : void 0,
        Y.$slots["cell-date"] ? {
          name: "cell-date",
          fn: J((o) => [
            F(Y.$slots, "cell-date", de({ ref_for: !0 }, o))
          ]),
          key: "1"
        } : void 0,
        Y.$slots["cell-content"] ? {
          name: "cell-content",
          fn: J((o) => [
            F(Y.$slots, "cell-content", de({ ref_for: !0 }, o))
          ]),
          key: "2"
        } : void 0,
        Y.$slots["cell-events"] ? {
          name: "cell-events",
          fn: J((o) => [
            F(Y.$slots, "cell-events", de({ ref_for: !0 }, o))
          ]),
          key: "3"
        } : Y.$slots.event ? {
          name: "event",
          fn: J((o) => [
            F(Y.$slots, "event", de({ ref_for: !0 }, o))
          ]),
          key: "4"
        } : Y.$slots["event-count"] ? {
          name: "event-count",
          fn: J((o) => [
            F(Y.$slots, "event-count", de({ ref_for: !0 }, o))
          ]),
          key: "5"
        } : void 0
      ]), 1032, ["start", "end", "index"]))), 128))
    ], 4));
  }
}, Da = ["data-locale"], pa = { class: "vuecal__scrollable-wrap" }, wa = {
  key: 1,
  class: "vuecal__week-numbers"
}, _a = { class: "vuecal__week-number" }, ka = { class: "vuecal__body-wrap" }, $a = {
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
  setup(y, { expose: s, emit: r }) {
    const d = y, w = r, $ = _t("vuecal-el"), z = Ot({ props: d, emit: w, attrs: bt(), vuecalEl: $, uid: kt() }), { config: f, view: P, dateUtils: u, touch: m } = z, Y = M(() => f.time && (P.isDay || P.isDays || P.isWeek)), I = M(() => Array(P.rows).fill().map((e, h) => u.getWeek(u.addDays(P.firstCellDate, 7 * h)))), Z = M(() => {
      var e;
      return {
        "vuecal--ready": f.ready,
        [`vuecal--${f.theme}-theme`]: f.theme,
        [`vuecal--${f.size}`]: !0,
        "vuecal--date-picker": f.datePicker,
        "vuecal--dark": f.dark,
        "vuecal--light": !f.dark,
        [`vuecal--${P.id}-view`]: !0,
        "vuecal--view-has-time": Y.value,
        "vuecal--timeless": !f.time,
        "vuecal--dragging-cell": m.isDraggingCell,
        "vuecal--dragging-event": m.isDraggingEvent,
        "vuecal--resizing-event": m.isResizingEvent,
        "vuecal--has-schedules": (e = f.schedules) == null ? void 0 : e.length
      };
    }), t = M(() => ({
      "--vuecal-time-cell-height": f.timeCellHeight && `${f.timeCellHeight}px`
    })), o = M(() => {
      var e, h;
      return {
        "vuecal__scrollable--row": Y.value || f.weekNumbers && P.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${P.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (e = f.schedules) == null ? void 0 : e.length,
        "vuecal__scrollable--no-schedules": !((h = f.schedules) != null && h.length)
      };
    });
    return qe(async () => {
      await Ue(), f.ready = !0, w("ready", { config: f, view: P });
    }), $t("vuecal", z), s({ view: z.view }), (e, h) => (C(), O("div", {
      class: ye(["vuecal", Z.value]),
      ref: "vuecal-el",
      "data-locale": e.locale,
      style: _e(t.value)
    }, [
      e.$slots.diy ? F(e.$slots, "diy", {
        key: 0,
        vuecal: V(z)
      }) : (C(), O(oe, { key: 1 }, [
        Oe(At, null, je({ _: 2 }, [
          e.$slots.header ? {
            name: "header",
            fn: J((c) => [
              F(e.$slots, "header", te(ae(c)))
            ]),
            key: "0"
          } : void 0,
          !e.$slots.header && e.$slots["previous-button"] ? {
            name: "previous-button",
            fn: J((c) => [
              F(e.$slots, "previous-button", te(ae(c)))
            ]),
            key: "1"
          } : void 0,
          !e.$slots.header && e.$slots["next-button"] ? {
            name: "next-button",
            fn: J((c) => [
              F(e.$slots, "next-button", te(ae(c)))
            ]),
            key: "2"
          } : void 0,
          !e.$slots.header && e.$slots["today-button"] ? {
            name: "today-button",
            fn: J((c) => [
              F(e.$slots, "today-button", te(ae(c)))
            ]),
            key: "3"
          } : void 0,
          !e.$slots.header && e.$slots.title ? {
            name: "title",
            fn: J((c) => [
              F(e.$slots, "title", te(ae(c)))
            ]),
            key: "4"
          } : void 0,
          !e.$slots.header && e.$slots["title.day"] ? {
            name: "title.day",
            fn: J((c) => [
              F(e.$slots, "title.day", te(ae(c)))
            ]),
            key: "5"
          } : void 0,
          !e.$slots.header && e.$slots["title.days"] ? {
            name: "title.days",
            fn: J((c) => [
              F(e.$slots, "title.days", te(ae(c)))
            ]),
            key: "6"
          } : void 0,
          !e.$slots.header && e.$slots["title.week"] ? {
            name: "title.week",
            fn: J((c) => [
              F(e.$slots, "title.week", te(ae(c)))
            ]),
            key: "7"
          } : void 0,
          !e.$slots.header && e.$slots["title.month"] ? {
            name: "title.month",
            fn: J((c) => [
              F(e.$slots, "title.month", te(ae(c)))
            ]),
            key: "8"
          } : void 0,
          !e.$slots.header && e.$slots["title.year"] ? {
            name: "title.year",
            fn: J((c) => [
              F(e.$slots, "title.year", te(ae(c)))
            ]),
            key: "9"
          } : void 0,
          !e.$slots.header && e.$slots["title.years"] ? {
            name: "title.years",
            fn: J((c) => [
              F(e.$slots, "title.years", te(ae(c)))
            ]),
            key: "10"
          } : void 0,
          !e.$slots.header && e.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: J((c) => [
              F(e.$slots, "schedule-heading", te(ae(c)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        ve("div", pa, [
          Oe(Ge, {
            name: `vuecal-slide-fade--${V(P).transitionDirection}`
          }, {
            default: J(() => [
              (C(), O("div", {
                class: ye(["vuecal__scrollable", o.value]),
                key: V(P).id + V(P).start.getTime()
              }, [
                Y.value ? (C(), Se(Kt, { key: 0 }, je({ _: 2 }, [
                  e.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: J((c) => [
                      F(e.$slots, "time-cell", te(ae(c)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : q("", !0),
                V(f).weekNumbers && V(P).isMonth ? (C(), O("div", wa, [
                  (C(!0), O(oe, null, ke(I.value, (c) => (C(), O("div", _a, [
                    F(e.$slots, "week-number", {}, () => [
                      ve("small", null, ie(c), 1)
                    ])
                  ]))), 256))
                ])) : q("", !0),
                ve("div", ka, [
                  Oe(qt, null, je({ _: 2 }, [
                    e.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: J((c) => [
                        F(e.$slots, "weekday-heading", te(ae(c)))
                      ]),
                      key: "0"
                    } : void 0,
                    e.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: J((c) => [
                        F(e.$slots, "schedule-heading", te(ae(c)))
                      ]),
                      key: "1"
                    } : void 0
                  ]), 1024),
                  Oe(ya, null, je({ _: 2 }, [
                    e.$slots.cell ? {
                      name: "cell",
                      fn: J((c) => [
                        F(e.$slots, "cell", te(ae(c)))
                      ]),
                      key: "0"
                    } : void 0,
                    !e.$slots.cell && e.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: J((c) => [
                        F(e.$slots, "cell-date", te(ae(c)))
                      ]),
                      key: "1"
                    } : void 0,
                    !e.$slots.cell && e.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: J((c) => [
                        F(e.$slots, "cell-content", te(ae(c)))
                      ]),
                      key: "2"
                    } : void 0,
                    !e.$slots.cell && e.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: J((c) => [
                        F(e.$slots, "cell-events", te(ae(c)))
                      ]),
                      key: "3"
                    } : void 0,
                    !e.$slots.cell && e.$slots.event ? {
                      name: "event",
                      fn: J((c) => [
                        F(e.$slots, "event", te(ae(c)))
                      ]),
                      key: "4"
                    } : void 0,
                    !e.$slots.cell && e.$slots["event-count"] ? {
                      name: "event-count",
                      fn: J((c) => [
                        F(e.$slots, "event-count", te(ae(c)))
                      ]),
                      key: "5"
                    } : void 0
                  ]), 1024)
                ])
              ], 2))
            ]),
            _: 3
          }, 8, ["name"])
        ])
      ], 64))
    ], 14, Da));
  }
}, Ta = (y) => {
  He.texts = { ...ge.texts, ...y }, He.dateUtils.updateTexts(He.texts);
}, {
  addDatePrototypes: Ma,
  removeDatePrototypes: Ya,
  updateTexts: Ea,
  addDays: Sa,
  subtractDays: Ca,
  addHours: Va,
  subtractHours: Oa,
  addMinutes: ja,
  subtractMinutes: Pa,
  getWeek: Fa,
  isToday: La,
  isSameDate: za,
  isInRange: Ha,
  isLeapYear: Na,
  getPreviousFirstDayOfWeek: Wa,
  stringToDate: Aa,
  dateToMinutes: Ia,
  countDays: Ba,
  datesInSameTimeStep: Ra,
  isValid: Xa,
  formatDate: Ga,
  formatDateLite: Ja,
  formatTime: Ua,
  formatTimeLite: qa,
  formatMinutes: Za
} = He.dateUtils;
export {
  $a as VueCal,
  Ma as addDatePrototypes,
  Sa as addDays,
  Va as addHours,
  ja as addMinutes,
  Ba as countDays,
  Ia as dateToMinutes,
  Ra as datesInSameTimeStep,
  Ga as formatDate,
  Ja as formatDateLite,
  Za as formatMinutes,
  Ua as formatTime,
  qa as formatTimeLite,
  Wa as getPreviousFirstDayOfWeek,
  Fa as getWeek,
  Ha as isInRange,
  Na as isLeapYear,
  za as isSameDate,
  La as isToday,
  Xa as isValidDate,
  Ya as removeDatePrototypes,
  Aa as stringToDate,
  Ca as subtractDays,
  Oa as subtractHours,
  Pa as subtractMinutes,
  Ea as updateTexts,
  Ta as useLocale
};
