import { computed as E, reactive as be, watch as De, toRefs as bt, ref as de, onBeforeUnmount as Xe, nextTick as Be, inject as je, openBlock as V, createElementBlock as P, renderSlot as H, unref as T, Fragment as me, renderList as we, normalizeClass as pe, createCommentVNode as ee, createElementVNode as ye, createVNode as He, Transition as qe, withCtx as N, createBlock as Se, resolveDynamicComponent as xe, mergeProps as ie, toHandlers as Ie, normalizeProps as se, onMounted as Ze, toDisplayString as fe, createTextVNode as Ge, withModifiers as et, normalizeStyle as $e, TransitionGroup as tt, createSlots as Ce, useTemplateRef as Tt, useId as Mt, useAttrs as Et, provide as nt, guardReactiveProps as re } from "vue";
/**
  * vue-cal v5.0.1-rc.40
  * (c) 2024-2026 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const he = {
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
}, Yt = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Ue = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], St = Ue.reduce((h, t, c) => (h[t] = c || 7, h), {}), Ct = (h, t, c) => {
  const { dateUtils: r } = h, m = !1, C = E(() => {
    if (t.view && j.value[t.view]) return t.view;
    if (t.view && !j.value[t.view])
      return console.warn(
        `Vue Cal: the provided view \`${t.view}\` is not in the list of available views. The first available view will be chosen: \`${Object.keys(j.value)[0]}\`.`
      ), Object.keys(j.value)[0];
    const n = t.datePicker ? "month" : "week";
    return j.value[n] ? n : Object.keys(j.value)[0];
  }), G = E(() => t.sm && !t.xs), d = E(() => t.xs || t.datePicker), X = E(() => t.clickToNavigate || t.datePicker && t.clickToNavigate !== !1), J = E(() => {
    const n = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, g = ($) => $.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [$, a] of Object.entries(c)) {
      const [R, U, Z] = $.match(/^on(Cell|Event)(.+)$/) || [];
      R && (n[U.toLowerCase()][g(Z).replace(/^-+|-+$/g, "")] = a);
    }
    return n;
  }), A = E(() => {
    var g;
    const n = {};
    return t.hideWeekends && (n[6] = !0) && (n[7] = !0), (g = t.hideWeekdays) != null && g.length && t.hideWeekdays.forEach(($) => n[St[$]] = !0), n;
  }), o = E(() => t.hideWeekends || A.value[6] && A.value[7]), j = E(() => {
    const n = t.datePicker;
    let g = 0, $ = {};
    const a = t.views;
    if (n && !a) return {
      month: { ...he.availableViews.month },
      year: { ...he.availableViews.year },
      years: { ...he.availableViews.years }
    };
    if (a)
      Array.isArray(a) ? $ = a.reduce((R, U) => (typeof U == "string" && he.availableViews[U] ? R[U] = he.availableViews[U] : g++, R), {}) : typeof a == "object" && ($ = Object.entries(a).reduce((R, [U, Z]) => {
        const { cols: x, rows: ae } = he.availableViews[U];
        return R[U] = { cols: Z.cols || x, rows: Z.rows || ae }, R;
      }, {})), g && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys($).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), $ = { ...he.availableViews });
    else if ($ = { ...he.availableViews }, t.horizontal) {
      const { days: R, week: U } = he.availableViews;
      $.days = { cols: R.rows, rows: R.cols }, $.week = { cols: U.rows, rows: U.cols };
    }
    return $;
  }), z = E(() => t.datePicker ? "month" : j.value.week ? "week" : Object.keys(j.value)[0]), u = E(() => {
    if (typeof t.selectedDate == "string") return r.stringToDate(t.selectedDate);
    if (t.selectedDate instanceof Date) return t.selectedDate;
    t.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", t.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), v = E(() => {
    if (!t.disableDays) return [];
    const n = [];
    if (Array.isArray(t.disableDays))
      for (let g of t.disableDays) {
        let $ = g;
        typeof g == "string" ? $ = r.stringToDate(g) : g instanceof Date && (g = r.formatDate(g, "YYYY-MM-DD")), $ instanceof Date && !isNaN($.getTime()) ? n.push(g) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", g);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", t.disableDays);
    return n;
  }), D = E(() => {
    let n = null;
    return t.minDate && typeof t.minDate == "string" ? n = r.stringToDate(t.minDate) : t.minDate && t.minDate instanceof Date && (n = t.minDate), (n == null ? void 0 : n.getTime()) || null;
  }), l = E(() => {
    let n = null;
    return t.maxDate && typeof t.maxDate == "string" ? n = r.stringToDate(t.maxDate) : t.maxDate && t.maxDate instanceof Date && (n = t.maxDate), (n == null ? void 0 : n.getTime()) || null;
  }), I = E(() => {
    var $;
    const { view: n } = h;
    return t.schedules.length && (n.isDay || n.isDays || n.isWeek) && (($ = t.schedules) == null ? void 0 : $.map((a, R) => ({ ...a, id: a.id ?? R + 1 }))) || void 0;
  }), e = E(() => {
    const n = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return t.editableEvents === !0 ? n : t.editableEvents === !1 ? Object.keys(n).map((g) => n[g] = !1) : { ...n, ...t.editableEvents };
  }), _ = E(() => {
    const { view: n } = h, { eventCount: g } = t;
    return (Array.isArray(g) ? g.includes(n.id) : g) && (n.isMonth && !t.eventsOnMonthView || n.isYear);
  }), L = E(() => {
    const { view: n } = h;
    return t.allDayEvents && t.time && (n.isDay || n.isDays || n.isWeek);
  }), Y = E(() => {
    const { view: n } = h;
    return t.horizontal && (n.isDay || n.isDays || n.isWeek);
  }), k = E(() => t.timeAtCursor && t.time), p = async (n) => {
    var $;
    let g = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((a) => a.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((a) => a.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((a) => a.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((a) => a.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((a) => a.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((a) => a.default), "../i18n/da.json": () => import("./i18n/da.js").then((a) => a.default), "../i18n/de.json": () => import("./i18n/de.js").then((a) => a.default), "../i18n/el.json": () => import("./i18n/el.js").then((a) => a.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((a) => a.default), "../i18n/en-us.json": () => Promise.resolve().then(() => Ht).then((a) => a.default), "../i18n/es.json": () => import("./i18n/es.js").then((a) => a.default), "../i18n/et.json": () => import("./i18n/et.js").then((a) => a.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((a) => a.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((a) => a.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((a) => a.default), "../i18n/he.json": () => import("./i18n/he.js").then((a) => a.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((a) => a.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((a) => a.default), "../i18n/id.json": () => import("./i18n/id.js").then((a) => a.default), "../i18n/is.json": () => import("./i18n/is.js").then((a) => a.default), "../i18n/it.json": () => import("./i18n/it.js").then((a) => a.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((a) => a.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((a) => a.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((a) => a.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((a) => a.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((a) => a.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((a) => a.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((a) => a.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((a) => a.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((a) => a.default), "../i18n/no.json": () => import("./i18n/no.js").then((a) => a.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((a) => a.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((a) => a.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((a) => a.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((a) => a.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((a) => a.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((a) => a.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((a) => a.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((a) => a.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((a) => a.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((a) => a.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((a) => a.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((a) => a.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((a) => a.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((a) => a.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((a) => a.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((a) => a.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((a) => a.default) });
    {
      if (!g[`../i18n/${n}.json`]) {
        console.warn(`Vue Cal: the locale \`${n}\` does not exist. Falling back to \`en-us\`.`), n = "en-us";
        return;
      }
      g = await (($ = g[`../i18n/${n}.json`]) == null ? void 0 : $.call(g));
    }
    h.texts = Object.assign(h.texts, Object.assign({ ...he.texts }, g)), r.updateTexts(h.texts);
  }, M = be(t.events || []);
  return De(
    [() => t.events, () => {
      var n;
      return (n = t.events) == null ? void 0 : n.length;
    }],
    ([n]) => M.splice(0, M.length, ...n || [])
  ), De(() => t.locale, (n) => p(n || "en-us")), (t.locale || !h.texts.today) && p(t.locale || "en-us"), {
    ...bt(t),
    events: M,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: J,
    defaultView: z,
    availableViews: j,
    disableDays: v,
    ready: m,
    sm: G,
    xs: d,
    clickToNavigate: X,
    hideWeekdays: A,
    hideWeekends: o,
    minTimestamp: D,
    maxTimestamp: l,
    schedules: I,
    selectedDate: u,
    editableEvents: e,
    showCellEventCount: _,
    allDayEvents: L,
    horizontal: Y,
    timeAtCursor: k,
    view: C,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(A.value).length;
    },
    get size() {
      return d.value ? "xs" : G.value ? "sm" : "lg";
    },
    loadTexts: p
  };
}, Oe = (h, t) => {
  const c = t.timeTo - t.timeFrom;
  return (h - t.timeFrom) * 100 / c;
}, ze = (h, t) => {
  const c = t.timeTo - t.timeFrom;
  return ~~(h * c / 100 + t.timeFrom);
}, Ke = (h, t) => {
  const c = t.clientHeight;
  return h * 100 / c;
}, Ne = be({ id: null, date: null });
let at = !1, Je = !0;
const _e = be({ el: null, cell: null, timeout: null }), ke = be({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function zt(h) {
  const { config: t, view: c, eventsManager: r, emit: m, uid: C, dateUtils: G } = h, d = (D) => {
    var k;
    const l = t.horizontal, { clientX: I, clientY: e } = ((k = D.touches) == null ? void 0 : k[0]) || D, { top: _, left: L } = D.currentTarget.getBoundingClientRect(), Y = ~~D.dataTransfer.getData("cursor-grab-at");
    if (l) {
      const p = I - L - Y;
      return ze(p * 100 / D.currentTarget.clientWidth, t);
    } else {
      const p = e - _ - Y;
      return ze(Ke(p, D.currentTarget), t);
    }
  }, X = (D, l, I) => {
    const e = l.duration || J(l.start, l.end) || t.timeStep;
    let _ = Math.max(d(D), 0);
    if (t.snapToInterval) {
      const p = _ + t.snapToInterval / 2;
      _ = p - p % t.snapToInterval;
    }
    const L = new Date(new Date(I).setMinutes(_)), Y = Math.min(_ + e, 1440), k = new Date(new Date(I).setMinutes(Y));
    return { start: L, end: k };
  }, J = (D, l) => Math.round((l - D) / 6e4);
  return {
    eventDragStart: (D, l) => {
      if (D.target.nodeType === 3 || h.touch.isResizingEvent) return D.preventDefault();
      D.dataTransfer.effectAllowed = "move", D.dataTransfer.dropEffect = "move";
      const I = { ...l, _: { id: l._.id, duration: J(l.start, l.end) } };
      try {
        D.dataTransfer.setData("text/plain", ""), D.dataTransfer.setData("event", JSON.stringify(I)), D.dataTransfer.setData("cursor-grab-at", t.horizontal ? D.offsetX : D.offsetY);
      } catch (_) {
        return console.warn("Vue Cal: Failed to set drag data:", _), D.preventDefault();
      }
      ke.eventId = l._.id, ke.fromVueCal = C, m("event-drag-start", {
        e: D,
        event: l
      });
      const e = D.target.closest(".vuecal__event");
      e.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        e.classList.add("vuecal__event--dragging-original"), e.classList.remove("vuecal__event--dragging-ghost");
      }, 0), at = !1, Object.assign(Ne, { id: c.id, date: c.firstCellDate }), Je = !0, h.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (D, l) => {
      ke.eventId = null, D.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: I, toVueCal: e } = ke;
      e && I !== e && r.deleteEvent(l._.id, 3), at && Je && Ne.id && c.switchView(Ne.id, Ne.date, !0), m("event-drag-end", {
        e: D,
        event: l,
        external: ke.fromVueCal !== C
      }), ke.fromVueCal = null, ke.toVueCal = null, h.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (D, l) => {
      const { start: I } = l, e = D.currentTarget;
      if (!D.currentTarget.contains(D.relatedTarget)) {
        if (e === _e.el || !e.className.includes("vuecal__cell-content")) return !1;
        _e.el && (_e.cell.highlighted = !1), Object.assign(_e, { el: e, cell: l, timeout: clearTimeout(_e.timeout) }), l.highlighted = !0, ["years", "year", "month"].includes(c.id) && (_e.timeout = setTimeout(() => h.switchToNarrowerView(I), 2e3));
      }
    },
    cellDragOver: (D, l) => {
      const { start: I, schedule: e } = l;
      D.preventDefault(), l.highlighted = !0, (e || e === 0) && (l.highlightedSchedule = e);
    },
    cellDragLeave: (D, l) => {
      D.preventDefault(), !D.currentTarget.contains(D.relatedTarget) && (l.highlightedSchedule = !1, _e.cell === l && (clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null }), l.highlighted = !1));
    },
    cellDragDrop: async (D, l, I = !1) => {
      var g, $, a;
      D.preventDefault(), clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null });
      const e = JSON.parse(D.dataTransfer.getData("event") || "{}");
      e.start && (e.start = new Date(e.start)), e.end && (e.end = new Date(e.end));
      let _, L, Y;
      I ? (L = new Date(l.start), Y = new Date(l.end)) : { start: L, end: Y } = X(D, e, l.start);
      const { schedule: k } = ((g = D.target.closest("[data-schedule]")) == null ? void 0 : g.dataset) || {};
      let p = () => {
      };
      ke.fromVueCal === C ? (_ = r.getEvent(e._.id), _ && (_._.dragging = !1, p = (R) => {
        if (_.start = L, _.end = Y, _.allDay = I, k !== void 0 && (_.schedule = ~~k), R && typeof R == "object") {
          const { _: U, ...Z } = R;
          Object.assign(_, Z);
        }
      })) : (_ = {
        ...e,
        start: L,
        end: Y,
        ...k !== void 0 && { schedule: ~~k },
        _: { id: (($ = e._) == null ? void 0 : $.id) || e.id, duration: J(L, Y) },
        getOverlappingEvents: () => r.getEventsInRange(L, Y, { schedule: ~~k })
      }, p = (R) => {
        if (_ = r.createEvent(_), R && typeof R == "object") {
          const { _: U, ...Z } = R;
          Object.assign(_, Z);
        }
      });
      let M = !0;
      const { drop: n } = (a = t.eventListeners) == null ? void 0 : a.event;
      n && (M = await n({
        e: D,
        event: { ..._, start: L, end: Y, schedule: ~~k },
        overlaps: _.getOverlappingEvents({ start: L, end: Y, schedule: ~~k }),
        cell: l,
        external: ke.fromVueCal !== C
      })), M !== !1 && p(M), l.highlighted = !1, l.highlightedSchedule = null, Je = !1, ke.toVueCal = C, m("event-dropped", {
        e: D,
        cell: l,
        event: _,
        originalEvent: e,
        external: ke.fromVueCal !== C
      });
    }
  };
}
const lt = (h, t) => {
  let c, r, m, C = {}, G = {};
  const d = de(h), X = () => {
    d.value.today || (d.value = t), Date.prototype.addDays = function(s) {
      return j(this, s || 0);
    }, Date.prototype.subtractDays = function(s) {
      return z(this, s || 0);
    }, Date.prototype.addHours = function(s) {
      return u(this, s || 0);
    }, Date.prototype.subtractHours = function(s) {
      return v(this, s || 0);
    }, Date.prototype.addMinutes = function(s) {
      return D(this, s || 0);
    }, Date.prototype.subtractMinutes = function(s) {
      return l(this, s || 0);
    }, Date.prototype.getWeek = function() {
      return e(this);
    }, Date.prototype.isToday = function() {
      return _(this);
    }, Date.prototype.isLeapYear = function() {
      return k(this);
    }, Date.prototype.format = function(s = "YYYY-MM-DD") {
      return R(this, s);
    }, Date.prototype.formatTime = function(s = "HH:mm") {
      return Z(this, s);
    };
  }, J = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, A = (s) => {
    d.value = s, Date.prototype.subtractDays && X();
  }, o = () => (r !== (/* @__PURE__ */ new Date()).getDate() && (c = /* @__PURE__ */ new Date(), r = c.getDate(), m = `${c.getFullYear()}-${c.getMonth()}-${c.getDate()}`), m), j = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setDate(y.getDate() + b), y;
  }, z = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setDate(y.getDate() - b), y;
  }, u = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setHours(y.getHours() + b), y;
  }, v = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setHours(y.getHours() - b), y;
  }, D = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setMinutes(y.getMinutes() + b), y;
  }, l = (s, b) => {
    const y = new Date(s.valueOf());
    return y.setMinutes(y.getMinutes() - b), y;
  }, I = (s, b) => {
    const y = (K) => {
      const oe = K % b;
      return oe !== 0 && (K += oe >= b / 2 ? b - oe : -oe), K;
    };
    if (typeof s == "number") return y(s);
    if (s instanceof Date) {
      let K = y(s.getMinutes());
      K >= 60 && (s.setHours(s.getHours() + 1), K = 0), s.setMinutes(K, 0, 0);
    }
  }, e = (s, b = !1) => {
    const y = new Date(Date.UTC(s.getFullYear(), s.getMonth(), s.getDate())), K = y.getUTCDay() || 7;
    y.setUTCDate(y.getUTCDate() + 4 - K);
    const oe = new Date(Date.UTC(y.getUTCFullYear(), 0, 1));
    return Math.ceil(((y - oe) / 864e5 + 1) / 7) + (b ? 1 : 0);
  }, _ = (s) => `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}` === o(), L = (s, b) => {
    if (!s || !b) return console.warn(`Vue Cal: missing date${s ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (a(s)) {
      if (!a(b)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${b}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${s}\`.`);
    return s.getFullYear() === b.getFullYear() && s.getMonth() === b.getMonth() && s.getDate() === b.getDate();
  }, Y = (s, b, y) => a(s) ? s.getTime() >= b && s.getTime() <= y : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${s}\`.`), k = (s) => {
    const b = s.getFullYear();
    return !(b % 400) || b % 100 && !(b % 4);
  }, p = (s = null, b) => {
    const y = s && new Date(s.valueOf()) || /* @__PURE__ */ new Date(), K = b ? 7 : 6;
    return y.setDate(y.getDate() - (y.getDay() + K) % 7), y;
  }, M = (s) => s instanceof Date ? s : (s.length === 10 && (s += " 00:00"), new Date(s.replace(/-/g, "/"))), n = (s) => s.getHours() * 60 + s.getMinutes(), g = (s, b) => {
    typeof s == "string" && (s = s.replace(/-/g, "/")), typeof b == "string" && (b = b.replace(/-/g, "/")), s = new Date(s).setHours(0, 0, 0, 0), b = new Date(b).setHours(0, 0, 1, 0);
    const y = (new Date(b).getTimezoneOffset() - new Date(s).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((b - s - y) / (24 * 3600 * 1e3));
  }, $ = (s, b, y) => Math.abs(s.getTime() - b.getTime()) <= y * 60 * 1e3, a = (s) => s && s instanceof Date && !isNaN(s), R = (s, b = "YYYY-MM-DD", y = null) => {
    if (y || (y = d.value), b || (b = "YYYY-MM-DD"), b === "YYYY-MM-DD") return U(s);
    C = {}, G = {};
    const K = {
      YYYY: () => ue(s, y).YYYY,
      YY: () => ue(s, y).YY(),
      M: () => ue(s, y).M,
      MM: () => ue(s, y).MM(),
      MMM: () => ue(s, y).MMM(),
      MMMM: () => ue(s, y).MMMM(),
      MMMMG: () => ue(s, y).MMMMG(),
      D: () => ue(s, y).D,
      DD: () => ue(s, y).DD(),
      S: () => ue(s, y).S(),
      d: () => ue(s, y).d,
      dd: () => ue(s, y).dd(),
      ddd: () => ue(s, y).ddd(),
      dddd: () => ue(s, y).dddd(),
      HH: () => le(s, y).HH,
      H: () => le(s, y).H,
      hh: () => le(s, y).hh,
      h: () => le(s, y).h,
      am: () => le(s, y).am,
      AM: () => le(s, y).AM,
      mm: () => le(s, y).mm,
      m: () => le(s, y).m,
      s: () => le(s, y).s
    };
    return b.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (oe, ve) => {
      const ce = K[ve.replace(/\{|\}/g, "")];
      return ce !== void 0 ? ce() : ve;
    });
  }, U = (s) => {
    const b = s.getMonth() + 1, y = s.getDate();
    return `${s.getFullYear()}-${b < 10 ? "0" : ""}${b}-${y < 10 ? "0" : ""}${y}`;
  }, Z = (s, b = "HH:mm", y = null, K = !1) => {
    let oe = !1;
    if (K) {
      const [i, S, w] = [s.getHours(), s.getMinutes(), s.getSeconds()];
      i + S + w === 141 && (oe = !0);
    }
    if (s instanceof Date && b === "HH:mm") return oe ? "24:00" : x(s);
    G = {}, y || (y = d.value);
    const ve = le(s, y), ce = b.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (i, S) => {
      const w = ve[S.replace(/\{|\}/g, "")];
      return w !== void 0 ? w : S;
    });
    return oe ? ce.replace("23:59", "24:00") : ce;
  }, x = (s) => {
    const b = s.getHours(), y = s.getMinutes();
    return `${(b < 10 ? "0" : "") + b}:${(y < 10 ? "0" : "") + y}`;
  }, ae = (s) => {
    const b = Math.floor(s / 60).toString().padStart(2, 0), y = (s % 60).toString().padStart(2, 0);
    return `${b}:${y}`;
  }, te = (s) => {
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
  }, ue = (s, b) => {
    if (C.D) return C;
    const y = s.getFullYear(), K = s.getMonth() + 1, oe = s.getDate(), ce = (s.getDay() - 1 + 7) % 7;
    return C = {
      // Year.
      YYYY: y,
      // 2024.
      YY: () => y.toString().substring(2),
      // 24.
      // Month.
      M: K,
      // 1 to 12.
      MM: () => K.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => b.months[K - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => b.months[K - 1],
      // January to December.
      MMMMG: () => (b.monthsGenitive || b.months)[K - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: oe,
      // 1 to 31.
      DD: () => oe.toString().padStart(2, 0),
      // 01 to 31.
      S: () => te(oe),
      // st, nd, rd, th.
      // Day of the week.
      d: ce + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => b.weekDaysShort.length ? b.weekDaysShort[ce] : b.weekDays[ce][0],
      // M to S.
      ddd: () => b.weekDaysShort.length ? b.weekDaysShort[ce] : b.weekDays[ce].substr(0, 3),
      // Mon to Sun.
      dddd: () => b.weekDays[ce]
      // Monday to Sunday.
    }, C;
  }, le = (s, b) => {
    if (G.am) return G;
    let y, K, oe;
    s instanceof Date ? (y = s.getHours(), K = s.getMinutes(), oe = s.getSeconds()) : (y = Math.floor(s / 60), K = Math.floor(s % 60));
    const ve = y % 12 ? y % 12 : 12, ce = (b || { am: "am", pm: "pm" })[y === 24 || y < 12 ? "am" : "pm"];
    return G = {
      H: y,
      h: ve,
      HH: y.toString().padStart(2, 0),
      hh: ve.toString().padStart(2, 0),
      am: ce,
      AM: ce.toUpperCase(),
      m: K,
      mm: K.toString().padStart(2, 0),
      s: oe
    }, G;
  };
  return {
    addDatePrototypes: X,
    removeDatePrototypes: J,
    updateTexts: A,
    addDays: j,
    subtractDays: z,
    addHours: u,
    subtractHours: v,
    addMinutes: D,
    subtractMinutes: l,
    snapToInterval: I,
    getWeek: e,
    isToday: _,
    isSameDate: L,
    isInRange: Y,
    isLeapYear: k,
    getPreviousFirstDayOfWeek: p,
    stringToDate: M,
    dateToMinutes: n,
    countDays: g,
    datesInSameTimeStep: $,
    isValid: a,
    formatDate: R,
    formatDateLite: U,
    formatTime: Z,
    formatTimeLite: x,
    formatMinutes: ae
  };
}, Vt = (h) => {
  const { dateUtils: t, config: c } = h;
  let r = 0;
  const m = E(() => {
    var L, Y, k, p, M;
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
    }, _ = c.events.slice().sort((n, g) => n.start - g.start < 0 ? -1 : 1);
    for (let n of _) {
      const g = typeof n.start == "string" || typeof n.end == "string", $ = !((L = n._) != null && L.register) || !n.isOverlapping || !n.delete;
      let a = !1;
      if (!g && ((Y = n._) != null && Y.cachedStart) && ((k = n._) != null && k.cachedEnd) && (a = n.start.getTime() !== ((p = n._) == null ? void 0 : p.cachedStart) || n.end.getTime() !== ((M = n._) == null ? void 0 : M.cachedEnd)), g || $ || a) {
        if (!C(n)) continue;
        G(n), n._.cachedStart = n.start.getTime(), n._.cachedEnd = n.end.getTime();
      }
      if (e.byId[n._.id] = n, n.recurring)
        e.recurring.push(n._.id);
      else if (!t.isSameDate(n.start, new Date(n.end.getTime() - 1)))
        n._.multiday = c.multidayEvents, c.multidayEvents ? e.multiday.push(n._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), n.end = new Date(new Date(n.start).setHours(23, 59, 59, 999)), G(n)), e.byDate[n._.startFormatted] || (e.byDate[n._.startFormatted] = []), e.byDate[n._.startFormatted].push(n._.id);
      else {
        e.byDate[n._.startFormatted] || (e.byDate[n._.startFormatted] = []), e.byDate[n._.startFormatted].push(n._.id);
        const R = n._.startFormatted.substring(0, 4), U = n._.startFormatted.substring(5, 7), Z = n._.startFormatted.substring(8, 10);
        e.byYear[R] || (e.byYear[R] = {}), e.byYear[R][U] || (e.byYear[R][U] = {}), e.byYear[R][U][Z] || (e.byYear[R][U][Z] = []), e.byYear[R][U][Z].push(n._.id);
      }
    }
    return e;
  }), C = (e) => !e.start || !e.end ? (console.error("Vue Cal: Event is missing start or end date", e), !1) : (typeof e.start == "string" && (e.start = t.stringToDate(e.start)), typeof e.end == "string" && (e.end = t.stringToDate(e.end)), e.start.setSeconds(0, 0), e.end.getSeconds() === 59 ? e.end.setMinutes(e.end.getMinutes() + 1, 0, 0) : e.end.setSeconds(0, 0), isNaN(e.start) || isNaN(e.end) || e.end.getTime() < e.start.getTime() ? (isNaN(e.start) ? console.error(`Vue Cal: invalid start date for event "${e.title}".`, e.start) : isNaN(e.end) ? console.error(`Vue Cal: invalid end date for event "${e.title}".`, e.end) : console.error(`Vue Cal: invalid event dates for event "${e.title}". The event ends before it starts.`, e.start, e.end), !1) : !0), G = (e) => {
    e._ || (e._ = {}), e._.id = e._.id || ++r, e._.multiday = !t.isSameDate(e.start, new Date(e.end.getTime() - 1)), e._.startFormatted = t.formatDate(e.start), e._.endFormatted = t.formatDate(e.end), e._.startMinutes = ~~t.dateToMinutes(e.start), e._.endMinutes = ~~t.dateToMinutes(e.end);
    const _ = e.start.getHours(), L = e.start.getMinutes().toString().padStart(2, 0), Y = e.end.getHours(), k = e.end.getMinutes().toString().padStart(2, 0);
    e._.startTimeFormatted24 = `${_.toString().padStart(2, 0)}:${L}`, e._.startTimeFormatted12 = `${_ % 12 || 12}${L ? `:${L}` : ""} ${_ < 12 ? "AM" : "PM"}`, e._.endTimeFormatted24 = `${Y.toString().padStart(2, 0)}:${k}`, e._.endTimeFormatted12 = `${Y % 12 || 12}${k ? `:${k}` : ""} ${Y < 12 ? "AM" : "PM"}`, e._.duration = Math.abs(~~((e.end - e.start) / 6e4)), e.delete || (e.delete = function(p) {
      return A(this._.id, p);
    }), e._.deleting === void 0 && (e._.deleting = !1), e._.deleted === void 0 && (e._.deleted = !1), e.isOverlapping || (e.isOverlapping = function(p = null) {
      return this.getOverlappingEvents(p).length;
    }), e.getOverlappingEvents || (e.getOverlappingEvents = function(p = null) {
      var $;
      const M = (p == null ? void 0 : p.start) || this.start, n = (p == null ? void 0 : p.end) || this.end, g = ($ = c.schedules) != null && $.length ? ~~((p == null ? void 0 : p.schedule) || this.schedule) : null;
      return j(M, n, { excludeIds: [this._.id], schedule: g });
    }), e._.register || (e._.register = (p) => {
      e._.$el = p, e._.fireCreated && (h.emit("event-created", e), delete e._.fireCreated);
    }), e._.unregister || (e._.unregister = () => {
      e._.$el = null, e._.register = null, e.isOverlapping = null, e.getOverlappingEvents = null, e.delete = null;
    });
  }, d = (e) => m.value.byId[e], X = (e) => {
    const _ = [];
    for (const { start: L, end: Y } of e) {
      const k = j(L, Y);
      k.length && _.push(...k);
    }
    return _;
  }, J = (e) => {
    if (!e.start || !e.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return c.snapToInterval && (t.snapToInterval(e.start, c.snapToInterval), t.snapToInterval(e.end, c.snapToInterval)), e = { ...e }, e._ || (e._ = {}), e._.id = ++r, e._.fireCreated = !0, c.events.push(e), e;
  }, A = async (e, _ = 0) => {
    var M, n;
    if (!e) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let L = typeof e == "string" || !isNaN(e) ? e : null;
    const Y = typeof e == "object" ? Object.entries(e) : null;
    if (Y) {
      const [g, $] = Y[0];
      L = (M = c.events.find((a) => a[g] === $)) == null ? void 0 : M._.id;
    }
    if (!c.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!L) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const k = c.events.findIndex((g) => g._.id === L);
    if (k === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${L}\`.`);
    const p = c.events[k];
    if (p.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${L}\` since it was explicitely set to \`delete: false\`.`);
    switch (_) {
      case 0:
        p._.deleting ? c.events.splice(k, 1) : p._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        p._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        p._.deleted = !0, c.events[k]._.deleted = !0, (n = p._.$el) == null || n.dispatchEvent(new CustomEvent("event-deleted", { detail: p._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        c.events.splice(k, 1), h.emit("update:events", c.events), h.emit("event-delete", p);
        break;
    }
    return !0;
  }, o = (e, _, L) => {
    const Y = c.allDayEvents ? { allDay: L } : {}, k = j(e, _, { background: !1, ...Y });
    if (!k.length) return { cellOverlaps: {}, longestStreak: 0 };
    const p = {};
    let M = [], n = 0;
    k.sort((g, $) => g.start - $.start || g.end - g.start - ($.end - $.start));
    for (const g of k) {
      const $ = g._.id;
      p[$] || (p[$] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), M = M.filter((x) => x.end > g.start);
      const a = M.filter((x) => {
        var te;
        return (!((te = c.schedules) != null && te.length) || g.schedule === x.schedule) && x.start < g.end;
      }), R = new Set(a.map((x) => {
        var ae;
        return ((ae = p[x._.id]) == null ? void 0 : ae.position) ?? 0;
      }));
      let U = 0;
      for (; R.has(U); ) U++;
      p[$].position = U, M.push(g);
      const Z = Math.max(1, ...a.map((x) => {
        var ae;
        return ((ae = p[x._.id]) == null ? void 0 : ae.maxConcurrent) ?? 1;
      }));
      p[$].maxConcurrent = Math.max(a.length + 1, Z);
      for (const x of a)
        p[x._.id].overlaps.add($), p[$].overlaps.add(x._.id), p[x._.id].maxConcurrent = p[$].maxConcurrent;
      n = Math.max(n, p[$].maxConcurrent);
    }
    for (const g in p) p[g].overlaps = [...p[g].overlaps];
    return { cellOverlaps: p, longestStreak: n };
  }, j = (e, _, { excludeIds: L = [], schedule: Y = null, background: k = !0, allDay: p = !1 } = {}) => {
    const { byId: M, byYear: n } = m.value, g = Object.keys(M).length;
    if (!g) return [];
    const $ = e.getFullYear(), a = _.getFullYear(), R = e.getMonth() + 1, U = _.getMonth() + 1, Z = e.getDate(), x = _.getDate(), ae = new Date(e).setHours(0, 0, 0, 0), te = new Date(_).setHours(23, 59, 59, 999), ue = new Set(L), le = [];
    if (g <= 100) {
      for (const s of Object.values(M))
        !s || ue.has(s._.id) || Y !== null && Y !== s.schedule || k === !1 && s.background || c.allDayEvents && (p && !s.allDay || !p && s.allDay) || s.start.getTime() < te && s.end.getTime() > ae && le.push(s);
      return le;
    }
    for (let s = $; s <= a; s++) {
      const b = `${s}`, y = n[b];
      if (!y) continue;
      const K = s === $ ? R : 1, oe = s === a ? U : 12;
      for (let ve = K; ve <= oe; ve++) {
        const ce = String(ve).padStart(2, "0"), i = y[ce];
        if (i)
          for (const S in i) {
            const w = +S;
            if (s === $ && ve === R && w < Z || s === a && ve === U && w > x) continue;
            const O = i[S];
            if (O != null && O.length)
              for (let B = 0; B < O.length; B++) {
                const W = M[O[B]];
                !W || ue.has(W._.id) || Y !== null && Y !== W.schedule || k === !1 && W.background || c.allDayEvents && (p && !W.allDay || !p && W.allDay) || W.start.getTime() < te && W.end.getTime() > ae && le.push(W);
              }
          }
      }
    }
    return le;
  }, z = (e, _, L) => {
    const Y = e.allDay || !c.time, k = Y ? new Date(e.start).setHours(0, 0, 0, 0) : e.start.getTime(), p = Y ? new Date(e.end).setHours(23, 59, 59, 999) : e.end.getTime(), M = Y ? new Date(_).setHours(0, 0, 0, 0) : _.getTime(), n = Y ? new Date(L).setHours(23, 59, 59, 999) : L.getTime();
    return p > M && k < n;
  }, u = be({
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
  }), v = (e, _) => {
    var M;
    const L = u[c.horizontal ? "movePercentageX" : "movePercentageY"];
    let Y = ze(L, c);
    if (Y = Math.max(0, Math.min(Y, 1440)), c.snapToInterval) {
      const n = Y + c.snapToInterval / 2;
      Y = n - n % c.snapToInterval;
    }
    let k = e.start, p = new Date(_.getTime() + Y * 6e4);
    return u.moveX && ((M = h.touch) != null && M.currentHoveredCell) && u.cellEl && new Date(parseInt(h.touch.currentHoveredCell.dataset.start)), p < u.resizeStartDate && (k = p, p = u.resizeStartDate), { newStart: k, newEnd: p };
  }, D = async (e) => {
    var Y, k, p, M;
    const { clientX: _, clientY: L } = ((Y = e.touches) == null ? void 0 : Y[0]) || e;
    if (u.fromResizer && !u.resizingOriginalEvent) {
      u.resizingOriginalEvent = { ...u.resizingEvent, _: { ...u.resizingEvent._ } };
      const n = ((k = c.eventListeners) == null ? void 0 : k.event) || {};
      (p = n["resize-start"]) == null || p.call(n, { e, event: u.resizingEvent });
    }
    if (u.cellEl) {
      const { top: n, left: g, width: $, height: a } = u.cellEl.getBoundingClientRect();
      u.moveX = _ - g, u.moveY = L - n, u.movePercentageX = u.moveX * 100 / $, u.movePercentageY = u.moveY * 100 / a;
    }
    if (u.documentMouseX = _, u.documentMouseY = L, u.fromResizer && u.resizingEvent) {
      const n = new Date(parseInt(u.cellEl.dataset.start)), { newStart: g, newEnd: $ } = v(u.resizingEvent, n);
      let a = !0;
      const { resize: R } = ((M = c.eventListeners) == null ? void 0 : M.event) || {};
      R && (a = await R({
        e,
        event: { ...u.resizingEvent, start: g, end: $ },
        overlaps: u.resizingEvent.getOverlappingEvents({ start: g, end: $ })
      })), a !== !1 ? (u.resizingEvent.start = g, u.resizingEvent.end = $, u.resizingLastAcceptedEvent && (u.resizingLastAcceptedEvent = null), e.preventDefault()) : R && (u.resizingLastAcceptedEvent = { ...u.resizingEvent, _: { ...u.resizingEvent._ } });
    }
  }, l = async (e) => {
    var _, L, Y, k;
    if ((_ = h.touch) != null && _.isResizingEvent && u.resizingEvent) {
      const p = new Date(parseInt(u.cellEl.dataset.start)), { newStart: M, newEnd: n } = v(u.resizingEvent, p);
      let g = !0;
      const a = (((L = c.eventListeners) == null ? void 0 : L.event) || {})["resize-end"];
      a && (g = await a({
        e,
        event: u.resizingEvent,
        original: u.resizingOriginalEvent,
        // Original event details before resizing.
        overlaps: u.resizingEvent.getOverlappingEvents({ start: M, end: n })
      })), u.resizingEvent.start = g === !1 ? (u.resizingLastAcceptedEvent || u.resizingOriginalEvent).start : ((Y = u.resizingLastAcceptedEvent) == null ? void 0 : Y.start) || M, u.resizingEvent.end = g === !1 ? (u.resizingLastAcceptedEvent || u.resizingOriginalEvent).end : ((k = u.resizingLastAcceptedEvent) == null ? void 0 : k.end) || n, u.resizingEvent._.duration < 1 && (u.resizingEvent.start = u.resizingOriginalEvent.start, u.resizingEvent.end = u.resizingOriginalEvent.end), h.touch.isResizingEvent = !1, h.touch.currentHoveredCell = null;
    }
    document.removeEventListener(e.type === "touchend" ? "touchmove" : "mousemove", D, { passive: !u.fromResizer }), h.touch.isResizingEvent = !1, u.fromResizer = !1, u.resizingEvent = null, u.resizingOriginalEvent = null, u.resizingLastAcceptedEvent = null, u.startX = 0, u.startY = 0, u.moveX = 0, u.moveY = 0, u.startPercentageX = 0, u.startPercentageY = 0, u.movePercentageX = 0, u.movePercentageY = 0, u.documentMouseX = 0, u.documentMouseY = 0, u.cellEl = null, u.resizeStartDate = null, u.schedule = null;
  };
  return {
    events: m,
    resizeState: u,
    getEvent: d,
    getViewEvents: X,
    getCellOverlappingEvents: o,
    getEventsInRange: j,
    createEvent: J,
    deleteEvent: A,
    isEventInRange: z,
    handleEventResize: (e, _, L) => {
      var k;
      const Y = ((k = e.touches) == null ? void 0 : k[0]) || e;
      if (u.fromResizer = !!Y.target.closest(".vuecal__event-resizer"), u.fromResizer) {
        h.touch.isResizingEvent = !0;
        const p = L.getBoundingClientRect();
        u.startX = Y.clientX - p.left, u.startY = Y.clientY - p.top, u.startPercentageX = u.startX * 100 / p.width, u.startPercentageY = u.startY * 100 / p.height, u.cellEl = L.closest(".vuecal__cell"), u.resizeStartDate = _.start, u.resizingEvent = _, document.addEventListener(e.type === "touchstart" ? "touchmove" : "mousemove", D, { passive: !u.fromResizer }), document.addEventListener(e.type === "touchstart" ? "touchend" : "mouseup", l, { once: !0 });
      }
    }
  };
}, Ot = ({ config: h, dateUtils: t, emit: c, texts: r, eventsManager: m }, C) => {
  const { availableViews: G } = h, d = de(h.view && G[h.view] ? h.view : h.defaultView), X = de(h.selectedDate || null), J = de(/* @__PURE__ */ new Date()), A = de(new Date(h.viewDate || J.value));
  A.value.setHours(0, 0, 0, 0);
  const o = de(new Date(A));
  let j = null;
  const z = E(() => d.value === "month" ? o.value : k.value), u = E(() => d.value === "month" ? new Date(o.value.getFullYear(), o.value.getMonth() + 1, 0, 23, 59, 59, 999) : M.value), v = E(() => d.value === "week" ? t.getPreviousFirstDayOfWeek(k.value, h.startWeekOnSunday) : d.value === "month" ? k.value : z.value), D = E(() => {
    if (d.value === "week") {
      const f = t.addDays(v.value, 7);
      return f.setMilliseconds(-1), f;
    }
    return d.value === "month" ? M.value : u.value;
  }), l = E(() => {
    const f = J.value.getTime();
    if (d.value === "week")
      return v.value.getTime() <= f && f <= D.value.getTime();
    const F = k.value.getTime(), Q = M.value.getTime();
    return F <= f && f <= Q;
  });
  function I() {
    J.value = /* @__PURE__ */ new Date(), j = setTimeout(I, 60 * 1e3);
  }
  function e() {
    j = setTimeout(I, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), I();
  }
  const _ = E(() => {
    if (!h.availableViews[d.value]) return 1;
    let f = h.availableViews[d.value].cols;
    return h.hasHiddenDays && ["week", "month"].includes(d.value) && (f -= h.hasHiddenDays), f;
  }), L = E(() => {
    var f;
    return ((f = h.availableViews[d.value]) == null ? void 0 : f.rows) || 1;
  }), Y = E(() => _.value * L.value), k = E(() => {
    if (d.value === "month") {
      let f = o.value.getDay() || 7;
      return h.startWeekOnSunday && !h.hideWeekdays[7] && (f += 1), h.viewDayOffset && (f -= h.viewDayOffset), t.subtractDays(o.value, f - 1);
    }
    if (d.value === "week") {
      const f = "1234567".split("").filter((Q) => !Object.keys(h.hideWeekdays).includes(Q));
      let F = Math.min(...f);
      return h.startWeekOnSunday && !h.hideWeekdays[7] && (F = 1), h.viewDayOffset && (F += h.viewDayOffset), t.addDays(o.value, F - 1);
    }
    return o.value;
  }), p = E(() => {
    const f = [], F = ["days", "week", "month"].includes(d.value);
    let Q = 0;
    for (let q = 0; q < Y.value + Q; q++)
      switch (d.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const ge = t.addDays(k.value, q), Re = ge.getDay() || 7;
          if (F && h.hasHiddenDays && h.hideWeekdays[Re]) {
            Q++;
            continue;
          }
          const Ve = new Date(ge);
          Ve.setHours(23, 59, 59, 999), f.push({ start: ge, startFormatted: t.formatDate(ge), end: Ve });
          break;
        }
        case "year":
          f.push({
            start: new Date(k.value.getFullYear(), q, 1, 0, 0, 0, 0),
            end: new Date(k.value.getFullYear(), q + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          f.push({
            start: new Date(k.value.getFullYear() + q, 0, 1, 0, 0, 0, 0),
            end: new Date(k.value.getFullYear() + q + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return f;
  }), M = E(() => p.value[p.value.length - 1].end), n = de("right"), g = E(() => {
    const f = Object.keys(h.availableViews);
    return f[f.indexOf(d.value) + 1];
  }), $ = E(() => {
    const f = Object.keys(h.availableViews);
    return f[f.indexOf(d.value) - 1];
  });
  function a(f, F, Q = !1) {
    if (!F || !F[f]) return f + 1;
    const q = F[f];
    return Q && typeof q == "string" ? q.substring(0, 3) : q;
  }
  function R(f, F, Q) {
    const { monthsArray: q, monthBeforeDay: ge, canTruncate: Re, xs: Ve } = Q, Me = f.getMonth(), Ee = f.getFullYear(), Ye = F.getMonth(), Pe = F.getFullYear(), We = Me !== Ye, $t = Ee !== Pe, Te = Re && (Ve || We), Ae = f.getDate(), Le = F.getDate();
    return $t ? ge ? `${a(Me, q, Te)} ${Ae}, ${Ee} - ${a(Ye, q, Te)} ${Le}, ${Pe}` : `${Ae} ${a(Me, q, Te)} ${Ee} - ${Le} ${a(Ye, q, Te)} ${Pe}` : We ? ge ? `${a(Me, q, Te)} ${Ae} - ${a(Ye, q, Te)} ${Le}, ${Ee}` : `${Ae} ${a(Me, q, Te)} - ${Le} ${a(Ye, q, Te)} ${Ee}` : ge ? `${a(Me, q, Te)} ${Ae}-${Le}, ${Ee}` : `${Ae}-${Le} ${a(Me, q, Te)} ${Ee}`;
  }
  const U = E(() => {
    const { dateFormat: f, months: F, monthsGenitive: Q, week: q, truncations: ge } = r, Re = h.locale, Ve = ge !== !1, Me = f.indexOf("M") < f.indexOf("D"), Ee = Q && Re === "el" ? Q : F;
    switch (d.value) {
      case "day":
        return t.formatDate(k.value, f);
      case "days":
      case "week": {
        const Ye = {
          monthsArray: Ee,
          monthBeforeDay: Me,
          canTruncate: Ve,
          xs: h.xs
        };
        let Pe = R(k.value, M.value, Ye);
        if (d.value === "week") {
          const We = t.getWeek(
            k.value,
            h.startWeekOnSunday && !h.hideWeekdays[7]
          );
          Pe += ` <small>${q} ${We}</small>`;
        }
        return Pe;
      }
      case "month": {
        const Ye = `${h.xs && Ve ? "MMM" : "MMMM"} YYYY`;
        return t.formatDate(z.value, Ye);
      }
      case "year":
        return k.value.getFullYear();
      case "years":
        return `${k.value.getFullYear()} - ${u.value.getFullYear()}`;
    }
  });
  async function Z() {
    switch (o.value = new Date(A.value || J.value), o.value.setHours(0, 0, 0, 0), d.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        o.value = t.getPreviousFirstDayOfWeek(o.value, h.startWeekOnSunday && !h.hideWeekdays[7]);
        break;
      case "month":
        o.value = new Date(o.value.getFullYear(), o.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        o.value = new Date(o.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        o.value = new Date(o.value.getFullYear() - o.value.getFullYear() % Y.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    J.value = /* @__PURE__ */ new Date(), h.ready && (await Be(), c("view-change", {
      id: d.value,
      title: U.value,
      start: z.value,
      end: u.value,
      extendedStart: v.value,
      extendedEnd: D.value,
      cellDates: p.value,
      containsToday: l.value,
      events: B.value
    }));
  }
  function x(f) {
    const F = d.value, Q = h.availableViews[F];
    f[F] && JSON.stringify(f[F]) === JSON.stringify(Q) || Z();
  }
  function ae(f, F = !0, Q = null) {
    const q = Object.keys(h.availableViews);
    d.value === f && !Q || (q.includes(f) ? (n.value = q.indexOf(f) < q.indexOf(d.value) ? "left" : "right", F && d.value !== f && c("update:view", f), d.value = f, Q ? K(Q) : Z()) : console.warn(`Vue Cal: the \`${f}\` view is not available.`));
  }
  function te() {
    g.value ? ae(g.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function ue() {
    $.value ? ae($.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function le() {
    b(!1);
  }
  function s() {
    b(!0);
  }
  function b(f = !0) {
    let F = new Date(A.value);
    switch (d.value) {
      case "day":
      case "days":
        f ? F = t.addDays(M.value, 1) : F = t.subtractDays(k.value, Y.value);
        break;
      case "week": {
        f ? (F = t.addDays(D.value, 1), F.setHours(0, 0, 0, 0)) : F = t.subtractDays(v.value, Y.value);
        break;
      }
      case "month": {
        const Q = f ? 1 : -1;
        F = new Date(F.getFullYear(), F.getMonth() + Q, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const Q = f ? 1 : -1;
        F = new Date(F.getFullYear() + Q, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const Q = f ? Y.value : -Y.value;
        F = new Date(F.getFullYear() + Q, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    K(F);
  }
  function y() {
    const f = /* @__PURE__ */ new Date();
    f.setHours(0, 0, 0, 0), K(f);
  }
  function K(f, F = !0, Q = !1) {
    if (!t.isValid(f)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [q, ge] = [k.value, M.value];
    d.value === "month" && ([q, ge] = [z.value, u.value]), f.setHours(0, 0, 0, 0), A.value = f, F && c("update:viewDate", f), (!t.isInRange(f, q, ge) || Q) && (n.value = f.getTime() < q.getTime() ? "left" : "right", Z());
  }
  function oe(f, F = !0) {
    if (!t.isValid(f)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: Q, isSameDate: q } = t;
    (!X.value || !Q(X.value) || !q(f, X.value)) && (f.setHours(0, 0, 0, 0), X.value = f, F && c("update:selectedDate", f));
  }
  function ve(f) {
    !f && !o.value.getDay() ? K(t.addDays(o.value, 1), !0, !0) : (n.value = "left", Z());
  }
  function ce(f) {
    f && h.startWeekOnSunday && !o.value.getDay() ? K(t.addDays(o.value, 1), !0, !0) : !f && h.startWeekOnSunday && o.value.getDay() === 1 && K(t.subtractDays(o.value, 1), !0, !0);
  }
  function i() {
    Z();
  }
  function S(f) {
    var ge;
    const F = (ge = C.value) == null ? void 0 : ge.querySelector(".vuecal__scrollable"), Q = f - h.timeFrom, q = Q > 0 ? Q * h.timeCellHeight / h.timeStep : 0;
    F == null || F.scrollTo({ top: q, behavior: "smooth" });
  }
  function w() {
    const f = /* @__PURE__ */ new Date();
    S(f.getHours() * 60 + f.getMinutes());
  }
  function O() {
    S(0);
  }
  const B = E(() => m.getViewEvents(p.value)), W = m.createEvent, ne = m.deleteEvent;
  return De(() => h.view, (f) => ae(f, !1)), De(() => h.availableViews, x), De(() => h.datePicker, () => ae("month")), De(() => h.viewDate, (f) => K(f, !1)), De(() => h.selectedDate, (f) => oe(f, !1)), De(() => h.startWeekOnSunday, (f) => ve(f)), De(() => h.hideWeekends, (f) => ce(f)), De(() => h.hideWeekdays, i), De(() => Y.value, () => {
    Y.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), De(() => h.watchRealTime, (f) => {
    f && h.time ? e() : j = clearTimeout(j);
  }), Z(), h.time && h.watchRealTime && e(), Xe(() => j = clearTimeout(j)), {
    now: J,
    id: d,
    broaderView: g,
    narrowerView: $,
    title: U,
    viewDate: A,
    start: z,
    end: u,
    extendedStart: v,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: D,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: k,
    lastCellDate: M,
    containsToday: l,
    selectedDate: X,
    cellDates: p,
    cols: _,
    rows: L,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: B,
    transitionDirection: n,
    switch: (f, F) => ae(f, !0, F),
    broader: te,
    narrower: ue,
    previous: le,
    next: s,
    navigate: b,
    goToToday: y,
    updateViewDate: K,
    updateSelectedDate: oe,
    scrollToCurrentTime: w,
    scrollToTime: S,
    scrollTop: O,
    createEvent: W,
    deleteEvent: ne,
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
  texts: { ...he.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: lt(he.texts, Qe)
  // Some Date utils functions need localized texts.
}), jt = ({ props: h, emit: t, attrs: c, vuecalEl: r, uid: m }) => {
  const C = be({
    uid: m,
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
  return C.dateUtils = lt(Object.assign(he.texts, C.texts), Qe), C.config = Ct(C, h, c), C.eventsManager = Vt(C), C.view = Ot(C, r), C.dnd = zt(C), C;
}, Pt = 1440, At = {
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
  xs: { type: Boolean, default: !1 },
  // Extra small size for date pickers (truncates texts + specific styles).
  horizontal: { type: Boolean, default: !1 }
  // Show the calendar timeline horizontally.
  // TODO:
  // minEventWidth: { type: Number, default: 0 },
  // minScheduleWidth: { type: Number, default: 0 },
  // overlapsPerTimeStep: { type: Boolean, default: false },
}, Lt = { class: "vuecal__header" }, Ft = {
  key: 0,
  class: "vuecal__views-bar"
}, Xt = ["onClick", "innerHTML"], Rt = {
  key: 1,
  class: "vuecal__title-bar"
}, Wt = { class: "vuecal__transition-wrap" }, Nt = ["disabled", "innerHTML"], Bt = {
  __name: "header",
  setup(h) {
    const t = je("vuecal"), { view: c, config: r } = t, m = () => {
      r.clickToNavigate && c.broader();
    }, C = E(() => r.clickToNavigate ? { click: m } : {});
    return (G, d) => (V(), P("div", Lt, [
      H(G.$slots, "header", {
        view: T(c),
        availableViews: T(r).availableViews,
        vuecal: T(t)
      }),
      G.$slots.header ? ee("", !0) : (V(), P(me, { key: 0 }, [
        T(r).viewsBar ? (V(), P("div", Ft, [
          (V(!0), P(me, null, we(T(r).availableViews, (X, J) => (V(), P("button", {
            class: pe(["vuecal__view-button", { "vuecal__view-button--active": T(c).id === J }]),
            onClick: (A) => T(c).switch(J),
            innerHTML: T(t).texts[J],
            type: "button"
          }, null, 10, Xt))), 256))
        ])) : ee("", !0),
        T(r).titleBar ? (V(), P("nav", Rt, [
          ye("button", {
            class: pe(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !G.$slots["previous-button"] }]),
            onClick: d[0] || (d[0] = (...X) => T(c).previous && T(c).previous(...X)),
            type: "button"
          }, [
            H(G.$slots, "previous-button")
          ], 2),
          ye("div", Wt, [
            He(qe, {
              name: `vuecal-slide-fade--${T(c).transitionDirection}`
            }, {
              default: N(() => [
                (V(), P("div", {
                  key: T(c).id + T(c).start.getTime()
                }, [
                  G.$slots.title || G.$slots[`title.${T(c).id}`] ? (V(), Se(xe(T(r).clickToNavigate && T(c).broaderView ? "button" : "div"), ie({
                    key: 0,
                    class: "vuecal__title"
                  }, Ie(C.value)), {
                    default: N(() => [
                      G.$slots[`title.${T(c).id}`] ? H(G.$slots, `title.${T(c).id}`, se(ie({ key: 0 }, T(c)))) : H(G.$slots, "title", se(ie({ key: 1 }, T(c))))
                    ]),
                    _: 3
                  }, 16)) : (V(), Se(xe(T(r).clickToNavigate && T(c).broaderView ? "button" : "div"), ie({
                    key: 1,
                    class: "vuecal__title"
                  }, Ie(C.value), {
                    innerHTML: T(c).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          T(r).todayButton ? (V(), P(me, { key: 0 }, [
            G.$slots["today-button"] ? H(G.$slots, "today-button", {
              key: 0,
              navigate: () => !T(c).containsToday && T(c).goToToday(),
              active: T(c).containsToday
            }) : (V(), P("button", {
              key: 1,
              class: pe(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": T(c).containsToday }]),
              onClick: d[1] || (d[1] = (X) => !T(c).containsToday && T(c).goToToday()),
              disabled: !!T(c).containsToday,
              type: "button",
              innerHTML: T(t).texts.today
            }, null, 10, Nt))
          ], 64)) : ee("", !0),
          ye("button", {
            class: pe(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !G.$slots["next-button"] }]),
            onClick: d[2] || (d[2] = (...X) => T(c).next && T(c).next(...X)),
            type: "button"
          }, [
            H(G.$slots, "next-button")
          ], 2)
        ])) : ee("", !0)
      ], 64))
    ]));
  }
}, It = ["draggable"], Gt = { class: "vuecal__event-details" }, Ut = { class: "vuecal__event-title" }, qt = {
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
  setup(h, { emit: t }) {
    const c = h, { config: r, view: m, dnd: C, touch: G, dateUtils: d, eventsManager: X } = je("vuecal"), { handleEventResize: J } = X, A = de(null), o = be(c.event);
    let j = null;
    const z = be({
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
    }), u = E(() => r.editableEvents.drag && o.draggable !== !1 && !o.background && z.canTouchAndDrag !== !1), v = E(() => m.isMonth || m.isYear || m.isYears || c.inAllDayBar || o._.multiday && !I.value ? !1 : r.time && r.editableEvents.resize && o.resizable !== !1 && !o.background);
    E(() => r.editableEvents.delete && o.deletable !== !1 && !o.background);
    const D = E(() => {
      var a, R, U, Z, x;
      const M = !!((a = o._) != null && a.multiday), n = r.horizontal, g = !c.inAllDayBar && (((R = o._) == null ? void 0 : R.startMinutes) < r.timeFrom || M && !l.value), $ = !c.inAllDayBar && (((U = o._) == null ? void 0 : U.endMinutes) > r.timeTo || M && !I.value);
      return {
        [`vuecal__event--${o._.id}`]: !0,
        [o.class]: !!o.class,
        "vuecal__event--recurring": !!o.recurring,
        "vuecal__event--background": !!o.background,
        "vuecal__event--all-day": o.allDay || ((Z = o._) == null ? void 0 : Z.startMinutes) === 0 && ((x = o._) == null ? void 0 : x.duration) === 1440,
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
        "vuecal__event--resizing": G.isResizingEvent
      };
    }), l = E(() => o._.multiday ? new Date(o.start).setHours(0, 0, 0, 0) === c.cellStart.getTime() : !0), I = E(() => o._.multiday ? d.isSameDate(new Date(new Date(o.end).setMilliseconds(-1)), c.cellEnd) : !0), e = E(() => {
      const M = new Date(o.start).setHours(0, 0, 0, 0), n = new Date(o.end).setHours(0, 0, 0, 0);
      return Math.ceil((n - M) / (1e3 * 60 * 60 * 24));
    }), _ = E(() => {
      const M = (m.isDay || m.isDays || m.isWeek) && r.time && !c.inAllDayBar, n = r.horizontal;
      if (!M && !o.backgroundColor && !o.color) return !1;
      const g = {
        backgroundColor: o.backgroundColor || null,
        color: o.color || null
      };
      if (M) {
        let $ = o._.startMinutes, a = o._.endMinutes;
        o._.multiday && (l.value || ($ = 0), I.value || (a = 1440));
        const R = Math.max(r.timeFrom, $), U = Math.min(r.timeTo, a) + (o._.duration && !a ? 1440 : 0), Z = Oe(R, r), x = Oe(U, r) - Z;
        g[n ? "left" : "top"] = `${Z}%`, g[n ? "width" : "height"] = `${x}%`;
      }
      return g;
    }), L = E(() => {
      const M = { ...r.eventListeners.event };
      for (const [g, $] of Object.entries(M))
        ["resize-end"].includes(g) || (M[g] = (a) => {
          a.type !== "drop" && $(a.type ? { e: a, event: o } : a);
        });
      const n = { ...M };
      return M.touchstart = (g) => {
        var $;
        g.stopPropagation(), z.touchAndDragTimer = setTimeout(() => {
          z.canTouchAndDrag = !0;
        }, 500), p(g), ($ = n.touchstart) == null || $.call(n, { e: g, event: o });
      }, M.mousedown = (g) => {
        var $;
        g.stopPropagation(), p(g), ($ = n.mousedown) == null || $.call(n, { e: g, event: o });
      }, M.click = (g) => {
        var $;
        ($ = n.click) == null || $.call(n, { e: g, event: o }), j ? j = clearTimeout(j) : j = setTimeout(() => {
          var a;
          j = null, (a = n["delayed-click"]) == null || a.call(n, { e: g, event: o });
        }, 400);
      }, M.dblclick = (g) => {
        n.dblclick ? n.dblclick({ e: g, event: o }) : o.delete(1);
      }, M;
    });
    let Y = null, k = 0;
    const p = (M) => {
      var a, R, U, Z;
      const n = ((a = M.touches) == null ? void 0 : a[0]) || M;
      z.fromResizer = (R = n.target) == null ? void 0 : R.closest(".vuecal__event-resizer");
      const g = Date.now();
      (!Y || g - k > en) && (Y = A.value.getBoundingClientRect(), k = g);
      const $ = Y;
      z.startX = (((U = M.touches) == null ? void 0 : U[0]) || M).clientX - $.left, z.startY = (((Z = M.touches) == null ? void 0 : Z[0]) || M).clientY - $.top, z.startPercentageX = z.startX * 100 / $.width, z.startPercentageY = z.startY * 100 / $.height, z.cellEl = A.value.closest(".vuecal__cell"), z.resizeStartDate = o.start, z.fromResizer && J(M, o, A.value), z.holdTimer = setTimeout(() => {
        var x, ae;
        z.holding = !0, (ae = (x = L.value).hold) == null || ae.call(x, { e: M, event: o });
      }, 1e3);
    };
    return Ze(() => o._.register(A.value)), Xe(() => {
      z.holdTimer && (z.holdTimer = clearTimeout(z.holdTimer)), z.touchAndDragTimer && (z.touchAndDragTimer = clearTimeout(z.touchAndDragTimer)), j && (j = clearTimeout(j)), o._.unregister();
    }), (M, n) => (V(), P("div", ie({ class: "vuecal__event" }, Ie(L.value, !0), {
      ref_key: "eventEl",
      ref: A,
      class: D.value,
      style: _.value,
      draggable: u.value ? "true" : void 0,
      onDragstart: n[2] || (n[2] = (g) => u.value && T(C).eventDragStart(g, o)),
      onDragend: n[3] || (n[3] = (g) => u.value && T(C).eventDragEnd(g, o))
    }), [
      ye("div", Gt, [
        M.$slots["event.all-day"] ? H(M.$slots, "event.all-day", {
          key: 0,
          event: o
        }) : M.$slots[`event.${T(m).id}`] ? H(M.$slots, `event.${T(m).id}`, {
          key: 1,
          event: o
        }) : H(M.$slots, "event", {
          key: 2,
          event: o
        }, () => [
          ye("div", Ut, fe(o.title), 1),
          T(r).time && !h.inAllDayBar && !(o._.multiday && !l.value) ? (V(), P("div", qt, [
            T(m).isMonth ? (V(), P("span", Jt, ",")) : ee("", !0),
            ye("span", Zt, fe(o._[`startTimeFormatted${T(r).twelveHour ? 12 : 24}`]), 1),
            T(m).isMonth ? ee("", !0) : (V(), P("span", Kt, [
              Ge(" - " + fe(o._[`endTimeFormatted${T(r).twelveHour ? 12 : 24}`]), 1),
              o._.multiday && l.value ? (V(), P("span", Qt, "+" + fe(e.value) + "d", 1)) : ee("", !0)
            ]))
          ])) : ee("", !0),
          h.inAllDayBar ? ee("", !0) : (V(), P("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: o.content
          }, null, 8, xt))
        ])
      ]),
      v.value ? (V(), P("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: n[0] || (n[0] = et(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : ee("", !0),
      He(qe, { name: "vuecal-delete-btn" }, {
        default: N(() => [
          o._.deleting ? (V(), P("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: n[1] || (n[1] = et((g) => o.delete(3), ["stop"]))
          }, "Delete")) : ee("", !0)
        ]),
        _: 1
      })
    ], 16, It));
  }
}, tn = ["data-start"], nn = ["innerHTML"], an = ["data-schedule"], sn = {
  key: 1,
  class: "vuecal__cell-date"
}, ln = {
  key: 2,
  class: "vuecal__cell-content"
}, rn = {
  key: 3,
  class: "vuecal__cell-events"
}, on = {
  key: 1,
  class: "vuecal__cell-date"
}, un = {
  key: 2,
  class: "vuecal__cell-content"
}, cn = {
  key: 3,
  class: "vuecal__cell-events"
}, dn = {
  key: 5,
  class: "vuecal__cell-events-count"
}, vn = ["title"], kt = {
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
    const t = h, c = je("vuecal"), { view: r, config: m, dateUtils: C, eventsManager: G, dnd: d, touch: X } = c, J = E(() => C.isToday(t.start)), A = de(null), o = de([]), j = de(!1), z = (i) => {
      o.value.push(i.detail), j.value = !0;
    }, u = () => setTimeout(() => j.value = !1, 300), v = be({
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
    }), D = de(!1);
    let l = null;
    const I = de({ cellOverlaps: {}, longestStreak: 0 }), e = E(() => {
      const i = m.horizontal, S = i ? v.startPercentageX : v.startPercentageY, w = i ? v.movePercentageX : v.movePercentageY;
      let O = Math.min(S, w), B = Math.max(S, w), W = ze(O, m), ne = ze(B, m);
      return m.snapToInterval && (W = C.snapToInterval(W, m.snapToInterval), ne = C.snapToInterval(ne, m.snapToInterval), O = Oe(W, m), B = Oe(ne, m)), {
        style: {
          [i ? "left" : "top"]: `${O}%`,
          [i ? "width" : "height"]: `${Math.abs(B - O)}%`
        },
        startMinutes: W,
        endMinutes: ne,
        start: C.formatMinutes(W),
        end: C.formatMinutes(ne),
        ...v.schedule ? { schedule: v.schedule } : {}
      };
    }), _ = E(() => {
      const i = m.editableEvents.create && (v.dragging || D.value), S = m.eventCreateMinDrag && v.thresholdPassed || !m.eventCreateMinDrag, w = v.canTouchAndDrag !== !1;
      return i && S && w;
    }), L = E(() => {
      var ne;
      const i = /* @__PURE__ */ new Date(), S = r.start.getFullYear(), w = r.start.getMonth(), O = t.start.getFullYear(), B = t.start.getMonth();
      return {
        [`vuecal__cell--${Ue[t.start.getDay()]}`]: r.isDay || r.isDays || r.isWeek || r.isMonth,
        [`vuecal__cell--${Yt[B]}`]: r.isYear,
        [`vuecal__cell--${O}`]: r.isYears,
        "vuecal__cell--today": J.value,
        "vuecal__cell--current-month": r.isYear && O === i.getFullYear() && B === i.getMonth(),
        "vuecal__cell--current-year": r.isYears && O === i.getFullYear(),
        "vuecal__cell--out-of-range": r.isMonth && (O !== S || B !== w),
        "vuecal__cell--before-min": Z.value && R.value,
        "vuecal__cell--after-max": Z.value && U.value,
        "vuecal__cell--disabled": Z.value,
        "vuecal__cell--selected": r.selectedDate && r.selectedDate.getTime() >= t.start.getTime() && r.selectedDate.getTime() <= t.end.getTime(),
        "vuecal__cell--has-schedules": (ne = m.schedules) == null ? void 0 : ne.length,
        "vuecal__cell--dragging": v.dragging,
        "vuecal__cell--has-events": k.value.length
      };
    });
    E(() => C.formatDate(t.start));
    const Y = E(() => {
      switch (r.id) {
        case "day":
          return "";
        case "days":
          return m.availableViews.days.rows > 1 && C.formatDate(t.start, "D"), "";
        case "week":
          return "";
        case "month":
          return C.formatDate(t.start, "D");
        case "year":
          return C.formatDate(t.start, m.xs ? "MMM" : "MMMM");
        case "years":
          return C.formatDate(t.start, "YYYY");
      }
    }), k = E(() => m.datePicker ? [] : G.getEventsInRange(
      t.start,
      t.end,
      { excludeIds: o.value, ...m.allDayEvents ? { allDay: t.allDay } : {} }
    )), p = E(() => k.value.filter((i) => !i.background)), M = E(() => {
      var i;
      return (i = m.schedules) == null ? void 0 : i.reduce((S, w) => (S[w.id] = k.value.filter((O) => O.schedule === w.id), S), {});
    }), n = E(() => {
      if (r.isMonth || r.isYear || r.isYears || t.allDay) return {};
      const i = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", S = m.horizontal, w = {};
      for (const O of k.value) {
        const B = O._.id, { maxConcurrent: W = 1, position: ne = 0 } = I.value.cellOverlaps[B] || {}, f = i ? "right" : "left", F = S ? "height" : "width";
        w[B] = { [S ? "top" : f]: `${100 / W * ne}%` }, m.stackEvents ? w[B][F] = `${100 / W + (ne === W - 1 ? 0 : 15)}%` : w[B][F] = `${100 / W}%`;
      }
      return w;
    }), g = E(() => {
      const i = {};
      for (const S of k.value) {
        const w = S._.id, { maxConcurrent: O = 1, position: B = 0 } = I.value.cellOverlaps[w] || {};
        i[w] = `vuecal__event--stack-${B + 1}-${O}`;
      }
      return i;
    }), $ = E(() => m.showCellEventCount && p.value.length), a = E(() => {
      var O;
      if (!m.specialHours || r.isMonth || r.isYear || r.isYears || t.allDay) return;
      const i = Ue[t.start.getDay()], S = m.horizontal;
      let w = (O = m.specialHours) == null ? void 0 : O[i];
      if (w)
        return Array.isArray(w) || (w = [w]), w.map((B) => {
          let { from: W, to: ne, class: f, label: F } = B;
          if (isNaN(W) || isNaN(ne) || m.timeFrom >= ne || m.timeTo <= W) return;
          W = Math.max(m.timeFrom, W), ne = Math.min(m.timeTo, ne);
          const Q = Oe(W, m), q = Oe(ne, m) - Q;
          return {
            style: {
              [S ? "left" : "top"]: `${Q}%`,
              [S ? "width" : "height"]: `${q}%`
            },
            label: F,
            class: f
          };
        }).filter((B) => !!B);
    }), R = E(() => m.minTimestamp !== null && m.minTimestamp > t.end.getTime()), U = E(() => m.maxTimestamp && m.maxTimestamp < t.start.getTime()), Z = E(() => {
      const { disableDays: i } = m, S = r.isYear || r.isYears;
      return i.length && i.includes(C.formatDate(t.start)) && !S ? !0 : R.value || U.value;
    }), x = be({
      show: E(() => {
        if (!(!r.isDay && !r.isDays && !r.isWeek) && !(!J.value || !m.time || t.allDay) && !(m.timeFrom > C.dateToMinutes(r.now)) && !(C.dateToMinutes(r.now) > m.timeTo))
          return !0;
      }),
      nowInMinutes: E(() => C.dateToMinutes(r.now)),
      todaysTimePosition: E(() => Oe(x.nowInMinutes, m)),
      style: E(() => `${m.horizontal ? "left" : "top"}: ${x.todaysTimePosition}%`),
      currentTime: E(() => C.formatTime(r.now, m.twelveHour ? "h:mm {am}" : "HH:mm"))
    }), ae = E(() => {
      if (Z.value) return {};
      const i = { ...m.eventListeners.cell };
      for (const [w, O] of Object.entries(i))
        i[w] = (B) => {
          var W, ne, f;
          (f = (ne = B.target || ((W = B.e) == null ? void 0 : W.target)).closest) != null && f.call(ne, ".vuecal__event") || O(B.type ? { e: B, cell: te.value, cursor: le.value, view: r } : B);
        };
      const S = { ...i };
      return i.click = (w) => {
        var B;
        s();
        const O = ue(w);
        (B = S.click) == null || B.call(S, { e: w, cell: te.value, cursor: O, view: r }), l ? l = clearTimeout(l) : l = setTimeout(() => {
          var W;
          l = null, (W = S["delayed-click"]) == null || W.call(S, { e: w, cell: te.value, cursor: O, view: r });
        }, 400);
      }, (m.time && r.isDay || r.isDays || r.isWeek) && (i.touchstart = (w) => {
        var O;
        b(w.e || w), (O = S.touchstart) == null || O.call(S, { e: w, cell: te.value, cursor: le.value, view: r });
      }, i.mousedown = (w) => {
        var O;
        b(w.e || w), (O = S.mousedown) == null || O.call(S, { e: w, cell: te.value, cursor: le.value, view: r });
      }), S.dblclick && (i.dblclick = (w) => {
        var O;
        (O = S.dblclick) == null || O.call(S, { e: w, cell: te.value, cursor: ue(w), view: r });
      }), m.editableEvents.drag && (i.dragenter = (w) => d.cellDragEnter(w, te.value), i.dragover = (w) => {
        w.preventDefault(), d.cellDragOver(w, te.value);
      }, i.dragleave = (w) => d.cellDragLeave(w, te.value), i.drop = (w) => d.cellDragDrop(w, te.value, t.allDay)), i;
    }), te = E(() => ({
      start: t.start,
      end: t.end,
      events: k,
      ...v.schedule ? { schedule: v.schedule } : {},
      goNarrower: () => r.narrower(),
      goBroader: () => r.broader(),
      broader: r.broaderView,
      narrower: r.narrowerView
    })), ue = (i) => {
      var F;
      const S = m.horizontal, { clientX: w, clientY: O } = ((F = i.touches) == null ? void 0 : F[0]) || i, { top: B, left: W } = A.value.getBoundingClientRect(), ne = S ? (w - W) * 100 / A.value.clientWidth : Ke(O - B, A.value), f = new Date(t.start);
      return f.setMinutes(ze(ne, m)), { [S ? "x" : "y"]: ne, date: f };
    }, le = E(() => {
      const S = m.horizontal ? v.movePercentageX || v.startPercentageX : v.movePercentageY || v.startPercentageY, w = ze(S, m), O = new Date(t.start);
      return O.setMinutes(w), {
        x: v.movePercentageX || v.startPercentageX,
        y: v.movePercentageY || v.startPercentageY,
        date: O
      };
    }), s = () => {
      r.updateSelectedDate(t.start), m.clickToNavigate && ((r.isMonth || r.isDays || r.isWeek) && m.availableViews.day ? r.switch("day") : r.isYear && m.availableViews.month ? r.switch("month") : r.isYears && m.availableViews.year && r.switch("year")), r.updateViewDate(t.start);
    }, b = (i) => {
      var O, B;
      const S = i.type === "touchstart";
      S ? (v.canTouchAndDrag = !1, v.touchAndDragTimer = setTimeout(() => {
        v.canTouchAndDrag = !0, (v.holding || v.dragging) && i.preventDefault();
      }, 500)) : v.canTouchAndDrag = !0, v.schedule = ~~i.target.dataset.schedule;
      const w = A.value.getBoundingClientRect();
      v.startX = (((O = i.touches) == null ? void 0 : O[0]) || i).clientX - w.left, v.startY = (((B = i.touches) == null ? void 0 : B[0]) || i).clientY - w.top, v.startPercentageX = v.startX * 100 / w.width, v.startPercentageY = v.startY * 100 / w.height, v.thresholdPassed = !1, document.addEventListener(S ? "touchmove" : "mousemove", y, { passive: !S }), document.addEventListener(S ? "touchend" : "mouseup", K, { once: !0 }), v.holdTimer = setTimeout(() => {
        var W, ne;
        v.holding = !0, (ne = (W = ae.value).hold) == null || ne.call(W, { e: i, cell: te.value, cursor: le.value, view: r });
      }, 1e3);
    }, y = (i) => {
      var W, ne, f, F, Q, q;
      const S = i.type === "touchmove", w = m.horizontal;
      if (S && !v.canTouchAndDrag) {
        v.touchAndDragTimer && (clearTimeout(v.touchAndDragTimer), v.touchAndDragTimer = null), K(i);
        return;
      }
      S && i.preventDefault(), v.dragging || (X.isDraggingCell = !0, (ne = (W = ae.value)["drag-start"]) == null || ne.call(W, { e: i, cell: te.value, cursor: le.value, view: r })), v.dragging = !0, v.holdTimer = clearTimeout(v.holdTimer), v.holding = !1;
      const O = A.value.getBoundingClientRect();
      v.moveX = (((f = i.touches) == null ? void 0 : f[0]) || i).clientX - O.left, v.moveY = (((F = i.touches) == null ? void 0 : F[0]) || i).clientY - O.top, v.movePercentageX = v.moveX * 100 / O.width, v.movePercentageY = v.moveY * 100 / O.height;
      const B = Math.abs(w ? v.startX - v.moveX : v.startY - v.moveY);
      m.eventCreateMinDrag && B > m.eventCreateMinDrag && (v.thresholdPassed = !0), (q = (Q = ae.value).drag) == null || q.call(Q, { e: i, cell: te.value, cursor: le.value, view: r });
    }, K = async (i) => {
      var w, O;
      const S = i.type === "touchend";
      document.removeEventListener(S ? "touchmove" : "mousemove", y, { passive: !1 }), v.touchAndDragTimer && (clearTimeout(v.touchAndDragTimer), v.touchAndDragTimer = null), v.dragging && ((O = (w = ae.value)["drag-end"]) == null || O.call(w, { e: i, cell: te.value, cursor: le.value, view: r }), X.isDraggingCell = !1, m.editableEvents.create && v.canTouchAndDrag && (D.value = !0, await oe(i), D.value = !1)), v.holdTimer = clearTimeout(v.holdTimer), v.holding = !1, v.dragging = !1, v.startX = 0, v.startY = 0, v.moveX = 0, v.moveY = 0, v.startPercentageX = 0, v.startPercentageY = 0, v.movePercentageX = 0, v.movePercentageY = 0, v.thresholdPassed = !1, v.schedule = null, v.canTouchAndDrag = null;
    }, oe = async (i) => {
      var f;
      if (!_.value) return;
      let { start: S, end: w, startMinutes: O, endMinutes: B } = e.value;
      S = new Date(t.start), S.setMinutes(O), w = new Date(t.start), w.setMinutes(B);
      let W = { ...e.value, start: S, end: w };
      const { create: ne } = m.eventListeners.event;
      if (typeof ne == "function") {
        const F = W;
        W = await new Promise((Q) => ne({ e: i, event: W, cell: te.value, resolve: Q, cursor: le.value, view: r })), W && typeof W == "object" && r.createEvent(W), W && typeof W == "boolean" && r.createEvent(F);
      } else r.createEvent(W);
      (f = navigator.vibrate) == null || f.call(navigator, 200);
    }, ve = () => {
      var i;
      for (const S of Object.keys(ae.value))
        (i = A.value) == null || i.removeEventListener(S, ae.value[S]);
    }, ce = () => {
      I.value = G.getCellOverlappingEvents(t.start, t.end, t.allDay);
    };
    return De(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !r.isYears && !r.isYear && p.value.map((i) => `${i._.id}${i.start.getTime()}${i.end.getTime()}`).join(),
      async () => {
        await Be(), ce();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Xe(async () => {
      for (const i of o.value) G.deleteEvent(i, 3);
      ve(), l && (l = clearTimeout(l)), await Be();
    }), (i, S) => (V(), P("div", ie({
      class: "vuecal__cell",
      ref_key: "cellEl",
      ref: A
    }, Ie(ae.value, !0), {
      "data-start": t.start.getTime(),
      class: L.value
    }), [
      i.$slots.cell ? H(i.$slots, "cell", {
        key: 0,
        cell: te.value
      }) : ee("", !0),
      a.value ? (V(!0), P(me, { key: 1 }, we(a.value, (w, O) => (V(), P("div", {
        class: pe(["vuecal__special-hours", w.class]),
        style: $e(w.style),
        innerHTML: w.label || ""
      }, null, 14, nn))), 256)) : ee("", !0),
      !i.$slots.cell && T(m).schedules ? (V(!0), P(me, { key: 2 }, we(T(m).schedules, (w) => (V(), P("div", {
        class: pe(["vuecal__schedule vuecal__schedule--cell", w.class]),
        key: w.id,
        style: $e(w.style || null),
        "data-schedule": w.id
      }, [
        i.$slots["cell-events"] ? H(i.$slots, "cell-events", {
          key: 0,
          cell: te.value
        }) : ee("", !0),
        Y.value || i.$slots["cell-date"] ? (V(), P("div", sn, [
          H(i.$slots, "cell-date", { cell: te.value }, () => [
            Ge(fe(Y.value), 1)
          ])
        ])) : ee("", !0),
        i.$slots["cell-content"] ? (V(), P("div", ln, [
          H(i.$slots, "cell-content", { cell: te.value })
        ])) : ee("", !0),
        i.$slots["cell-events"] && k.value.length ? (V(), P("div", rn, [
          H(i.$slots, "cell-events", { cell: te.value })
        ])) : k.value.length || j.value ? (V(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: S[0] || (S[0] = (O) => j.value = !0),
          onAfterLeave: u,
          tag: "div"
        }, {
          default: N(() => [
            (V(!0), P(me, null, we(M.value[w.id], (O) => (V(), Se(st, {
              key: O._.id,
              event: O,
              onEventDeleted: z,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              style: $e(n.value[O._.id])
            }, Ce({ _: 2 }, [
              i.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: N((B) => [
                  H(i.$slots, "event.all-day", ie({ ref_for: !0 }, B))
                ]),
                key: "0"
              } : void 0,
              i.$slots[`event.${T(r).id}`] ? {
                name: `event.${T(r).id}`,
                fn: N((B) => [
                  H(i.$slots, `event.${T(r).id}`, ie({ ref_for: !0 }, B))
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
        }, 1024)) : ee("", !0),
        _.value && v.schedule === w.id && !t.allDay ? (V(), P("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: $e(e.value.style)
        }, fe(e.value.start) + " - " + fe(e.value.end), 5)) : ee("", !0)
      ], 14, an))), 128)) : ee("", !0),
      !i.$slots.cell && !T(m).schedules ? (V(), P(me, { key: 3 }, [
        i.$slots["cell-events"] ? H(i.$slots, "cell-events", {
          key: 0,
          cell: te.value
        }) : ee("", !0),
        Y.value || i.$slots["cell-date"] ? (V(), P("div", on, [
          H(i.$slots, "cell-date", { cell: te.value }, () => [
            Ge(fe(Y.value), 1)
          ])
        ])) : ee("", !0),
        i.$slots["cell-content"] ? (V(), P("div", un, [
          H(i.$slots, "cell-content", { cell: te.value })
        ])) : ee("", !0),
        i.$slots["cell-events"] && k.value.length ? (V(), P("div", cn, [
          H(i.$slots, "cell-events", { cell: te.value })
        ])) : !(T(r).isMonth && !T(m).eventsOnMonthView) && !T(r).isYear && !T(r).isYears && (k.value.length || j.value) ? (V(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: S[1] || (S[1] = (w) => j.value = !0),
          onAfterLeave: u,
          tag: "div"
        }, {
          default: N(() => [
            (V(!0), P(me, null, we(k.value, (w) => (V(), Se(st, {
              key: w._.id,
              event: w,
              onEventDeleted: z,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              class: pe(g.value[w._.id]),
              style: $e(n.value[w._.id])
            }, Ce({ _: 2 }, [
              i.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: N((O) => [
                  H(i.$slots, "event.all-day", ie({ ref_for: !0 }, O))
                ]),
                key: "0"
              } : void 0,
              i.$slots[`event.${T(r).id}`] ? {
                name: `event.${T(r).id}`,
                fn: N((O) => [
                  H(i.$slots, `event.${T(r).id}`, ie({ ref_for: !0 }, O))
                ]),
                key: "1"
              } : void 0,
              i.$slots.event ? {
                name: "event",
                fn: N((O) => [
                  H(i.$slots, "event", ie({ ref_for: !0 }, O))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "class", "style"]))), 128))
          ]),
          _: 3
        })) : ee("", !0),
        _.value ? (V(), P("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: $e(e.value.style)
        }, fe(e.value.start) + " - " + fe(e.value.end), 5)) : ee("", !0)
      ], 64)) : ee("", !0),
      i.$slots["event-count"] ? H(i.$slots, "event-count", {
        key: 4,
        events: p.value
      }) : $.value ? (V(), P("div", dn, fe(p.value.length), 1)) : ee("", !0),
      x.show ? (V(), P("div", {
        key: 6,
        class: "vuecal__now-line",
        style: $e(x.style),
        title: x.currentTime
      }, [
        H(i.$slots, "now-line", {
          now: T(r).now,
          timeFormatted: x.currentTime
        }, () => [
          ye("span", null, fe(x.currentTime), 1)
        ])
      ], 12, vn)) : ee("", !0)
    ], 16, tn));
  }
}, fn = {
  key: 0,
  class: "vuecal__headings"
}, mn = {
  key: 0,
  class: "vuecal__weekdays-headings"
}, gn = ["onClick"], hn = { class: "vuecal__weekday-day" }, yn = {
  key: 0,
  class: "vuecal__weekday-date"
}, Dn = {
  key: 1,
  class: "vuecal__schedules-headings"
}, pn = ["innerHTML"], wn = {
  key: 2,
  class: "vuecal__all-day"
}, _n = {
  __name: "headings-bar",
  setup(h) {
    const t = je("vuecal"), c = je("$vuecalEl"), { view: r, config: m, dateUtils: C } = t, G = E(() => m.xs ? "day-xs" : m.sm || r.isDays || r.isMonth ? "day-sm" : "day"), d = E(() => (r.isDay || r.isDays || r.isWeek || r.isMonth) && !(r.isDay && !m.schedules && !m.allDayEvents)), X = E(() => r.cellDates.slice(0, m.horizontal ? r.rows : r.cols).map(({ start: o }) => ({
      id: Ue[o.getDay()],
      date: o,
      dateNumber: o.getDate(),
      day: C.formatDate(o, "dddd"),
      "day-sm": C.formatDate(o, "ddd"),
      "day-xs": C.formatDate(o, "dd"),
      isToday: C.isToday(o)
    }))), J = {
      click: (o) => {
        (r.isDays || r.isWeek) && r.updateSelectedDate(o);
      }
    }, A = {
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
        typeof document < "u" && (document.removeEventListener("mousemove", A.handleMouseMove), document.removeEventListener("mouseup", A.cleanup), document.removeEventListener("touchmove", A.handleTouchMove, { passive: !1 }), document.removeEventListener("touchend", A.cleanup)), A.isResizing.value = !1;
      },
      startResize(o, j) {
        this.isResizing.value = !0;
        const z = m.horizontal;
        this[z ? "startX" : "startY"].value = z ? o : j;
        const u = getComputedStyle(c.value).getPropertyValue("--vuecal-all-day-bar-size"), v = document.createElement("div");
        v.style.position = "absolute", v.style.visibility = "hidden", v.style[z ? "width" : "height"] = u, document.body.appendChild(v);
        const D = v[z ? "offsetWidth" : "offsetHeight"];
        v.remove(), D > 0 && (this[z ? "initialWidth" : "initialHeight"].value = D), document.addEventListener("mousemove", A.handleMouseMove), document.addEventListener("mouseup", A.cleanup), document.addEventListener("touchmove", A.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", A.cleanup);
      },
      // Update height/width based on mouse/touch movement.
      updateSize(o, j) {
        var D;
        if (!this.isResizing.value) return;
        const z = m.horizontal, u = z ? o - this.startX.value : j - this.startY.value, v = Math.max(20, this[z ? "initialWidth" : "initialHeight"].value + u);
        (D = c.value) == null || D.style.setProperty("--vuecal-all-day-bar-size", `${v}px`);
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
        var j;
        (j = o.touches) != null && j[0] && this.startResize(o.touches[0].clientX, o.touches[0].clientY);
      },
      handleTouchMove(o) {
        var j;
        (j = o.touches) != null && j[0] && (A.updateSize(o.touches[0].clientX, o.touches[0].clientY), o.preventDefault());
      }
    };
    return Xe(() => {
      A.cleanup();
    }), (o, j) => d.value ? (V(), P("div", fn, [
      T(r).isDay ? ee("", !0) : (V(), P("div", mn, [
        (V(!0), P(me, null, we(X.value, (z, u) => (V(), P("div", {
          class: pe(["vuecal__weekday", { "vuecal__weekday--today": z.isToday }]),
          key: u,
          onClick: (v) => J.click(z.date)
        }, [
          H(o.$slots, "weekday-heading", {
            label: z[G.value],
            id: z.id,
            date: z.date
          }, () => [
            ye("span", hn, fe(z[G.value]), 1),
            T(r).isMonth ? ee("", !0) : (V(), P("strong", yn, fe(z.dateNumber), 1))
          ])
        ], 10, gn))), 128))
      ])),
      T(m).schedules ? (V(), P("div", Dn, [
        (V(!0), P(me, null, we(X.value, (z, u) => (V(), P(me, { key: u }, [
          (V(!0), P(me, null, we(T(m).schedules, (v, D) => (V(), P(me, { key: D }, [
            o.$slots["schedule-heading"] ? (V(), P("div", {
              key: 0,
              class: pe(["vuecal__schedule vuecal__schedule--heading", v.class])
            }, [
              H(o.$slots, "schedule-heading", {
                schedule: v,
                view: T(r)
              })
            ], 2)) : (V(), P("div", {
              key: 1,
              class: pe(["vuecal__schedule vuecal__schedule--heading", v.class]),
              innerHTML: v.label
            }, null, 10, pn))
          ], 64))), 128))
        ], 64))), 128))
      ])) : ee("", !0),
      T(m).allDayEvents ? (V(), P("div", wn, [
        (V(!0), P(me, null, we(X.value, (z, u) => (V(), Se(kt, {
          class: pe(["vuecal__all-day-cell", { "vuecal__weekday--today": z.isToday }]),
          key: u,
          start: z.date,
          end: new Date(z.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: u,
          "all-day": ""
        }, Ce({ _: 2 }, [
          o.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: N((v) => [
              H(o.$slots, "event.all-day", ie({ ref_for: !0 }, v))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: N((v) => [
              H(o.$slots, "event", ie({ ref_for: !0 }, v))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        ye("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: j[0] || (j[0] = (...z) => A.handleMouseDown && A.handleMouseDown(...z)),
          onTouchstart: j[1] || (j[1] = (...z) => A.handleTouchStart && A.handleTouchStart(...z))
        }, null, 32)
      ])) : ee("", !0)
    ])) : ee("", !0);
  }
}, kn = { class: "vuecal__time-column" }, $n = {
  key: 0,
  class: "vuecal__all-day-label"
}, bn = {
  __name: "time-column",
  setup(h) {
    const t = je("vuecal"), { config: c, texts: r } = t, m = E(() => {
      const C = [];
      for (let d = c.timeFrom; d < c.timeTo; d += c.timeStep) {
        const X = d + c.timeStep > c.timeTo, J = ~~(d / 60), A = d % 60, o = r[d < 720 ? "am" : "pm"];
        let j = null;
        X && (j = `calc(var(--vuecal-time-cell-size) * ${(c.timeTo - d) / c.timeStep})`), C.push({
          minutesSum: d,
          // The sum of hours + minutes in minutes.
          hours: J,
          minutes: A,
          formatted12: `${J % 12 ? J % 12 : 12}${A ? `:${A.toString().padStart(2, 0)}` : ""}${o}`,
          formatted24: `${J.toString().padStart(2, 0)}:${A.toString().padStart(2, 0)}`,
          height: j
        });
      }
      return C;
    });
    return (C, G) => (V(), P("div", kn, [
      T(c).allDayEvents ? (V(), P("div", $n, [
        H(C.$slots, "all-day-label", {}, () => [
          Ge(fe(T(t).texts.allDay), 1)
        ])
      ])) : ee("", !0),
      (V(!0), P(me, null, we(m.value, (d, X) => (V(), P("div", {
        class: "vuecal__time-cell",
        key: X,
        style: $e({ height: d.height || null })
      }, [
        H(C.$slots, "time-cell", {
          index: X,
          minutes: d.minutes,
          hours: d.hours,
          minutesSum: d.minutesSum,
          format12: d.formatted12,
          format24: d.formatted24
        }, () => [
          ye("label", null, fe(T(c).twelveHour ? d.formatted12 : d.formatted24), 1)
        ])
      ], 4))), 128))
    ]));
  }
}, Tn = {
  __name: "body",
  setup(h) {
    const t = je("vuecal"), { view: c, config: r, dateUtils: m, touch: C, eventsManager: G } = t, d = de(null), X = de(null), J = de(null), { resizeState: A } = G, o = E(() => ({
      "--vuecal-grid-columns": c.cols,
      "--vuecal-grid-rows": c.rows,
      "--vuecal-body-max-height": r.time ? `${r.timeCellHeight * (r.timeTo - r.timeFrom) / r.timeStep}px` : null
    })), j = E(() => {
      const D = r.horizontal, l = D ? X.value : J.value, I = m.formatTime(ze(l, r), r.twelveHour ? "h:mm{am}" : "HH:mm");
      return {
        style: { [D ? "left" : "top"]: `${l}%` },
        time: I
      };
    }), z = (D) => {
      var L;
      if (c.isMonth || c.isYear || c.isYears) return;
      const l = C.isResizingEvent && r.editableEvents.resizeX;
      if (!r.timeAtCursor && !l) return;
      const I = ((L = D.touches) == null ? void 0 : L[0]) || D, { clientX: e, clientY: _ } = I;
      if (l && (A.cellEl = v(e, _)), r.timeAtCursor) {
        const { top: Y, left: k } = d.value.getBoundingClientRect();
        r.horizontal ? X.value = (e - k) * 100 / d.value.clientWidth : J.value = Ke(_ - Y, d.value);
      }
    }, u = () => {
      X.value = null, J.value = null;
    }, v = (D, l) => {
      const I = document.elementFromPoint(D, l);
      return (I == null ? void 0 : I.closest(".vuecal__cell")) || null;
    };
    return Ze(() => {
      d.value.addEventListener("mousemove", z), d.value.addEventListener("touchmove", z), d.value.addEventListener("mouseleave", u), d.value.addEventListener("touchend", u);
    }), Xe(() => {
      d.value && (d.value.removeEventListener("mousemove", z), d.value.removeEventListener("touchmove", z), d.value.removeEventListener("mouseleave", u), d.value.removeEventListener("touchend", u));
    }), (D, l) => (V(), P("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: d,
      style: $e(o.value)
    }, [
      He(qe, { name: "vuecal-shrink" }, {
        default: N(() => [
          T(r).timeAtCursor && (X.value !== null || J.value !== null) ? (V(), P("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: $e(j.value.style)
          }, [
            ye("label", null, fe(j.value.time), 1)
          ], 4)) : ee("", !0)
        ]),
        _: 1
      }),
      (V(!0), P(me, null, we(T(c).cellDates, (I, e) => (V(), Se(kt, {
        key: e,
        start: I.start,
        end: I.end,
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
        D.$slots[`event.${T(c).id}`] ? {
          name: `event.${T(c).id}`,
          fn: N((_) => [
            H(D.$slots, `event.${T(c).id}`, ie({ ref_for: !0 }, _))
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
}, Mn = ["data-locale"], En = { class: "vuecal__scrollable-wrap" }, Yn = {
  key: 1,
  class: "vuecal__week-numbers"
}, Sn = { class: "vuecal__week-number" }, Cn = { class: "vuecal__body-wrap" }, Vn = {
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
  setup(h, { expose: t, emit: c }) {
    const r = h, m = c, C = Tt("vuecal-el"), G = jt({ props: r, emit: m, attrs: Et(), vuecalEl: C, uid: Mt() }), { config: d, view: X, dateUtils: J, touch: A } = G, o = E(() => d.time && (X.isDay || X.isDays || X.isWeek)), j = E(() => Array(X.rows).fill().map((l, I) => J.getWeek(J.addDays(X.firstCellDate, 7 * I)))), z = E(() => {
      var l;
      return {
        "vuecal--ready": d.ready,
        [`vuecal--${d.theme}-theme`]: d.theme,
        [`vuecal--${d.size}`]: !0,
        "vuecal--date-picker": d.datePicker,
        "vuecal--dark": d.dark,
        "vuecal--light": !d.dark,
        [`vuecal--${X.id}-view`]: !0,
        "vuecal--view-has-time": o.value,
        "vuecal--timeless": !d.time,
        "vuecal--dragging-cell": A.isDraggingCell,
        "vuecal--dragging-event": A.isDraggingEvent,
        "vuecal--resizing-event": A.isResizingEvent,
        "vuecal--has-schedules": (l = d.schedules) == null ? void 0 : l.length,
        "vuecal--horizontal": d.horizontal
      };
    }), u = E(() => {
      var l;
      return {
        "--vuecal-time-cell-size": d.timeCellHeight && `${d.timeCellHeight}px`,
        "--vuecal-schedules-count": ((l = d.schedules) == null ? void 0 : l.length) ?? 0
      };
    }), v = E(() => {
      var l, I;
      return {
        "vuecal__scrollable--row": o.value || d.weekNumbers && X.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${X.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (l = d.schedules) == null ? void 0 : l.length,
        "vuecal__scrollable--no-schedules": !((I = d.schedules) != null && I.length),
        "vuecal__scrollable--no-all-day-bar": !d.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": d.allDayEvents
      };
    }), D = (l) => {
      l.target.closest(".vuecal__cell") && l.preventDefault();
    };
    return Ze(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && C.value.addEventListener("contextmenu", D), await Be(), d.ready = !0, m("ready", { config: d, view: X });
    }), Xe(() => {
      var l;
      (l = C == null ? void 0 : C.value) == null || l.removeEventListener("contextmenu", D);
    }), nt("vuecal", G), nt("$vuecalEl", C), t({ view: G.view }), (l, I) => (V(), P("div", {
      class: pe(["vuecal", z.value]),
      ref: "vuecal-el",
      "data-locale": l.locale,
      style: $e(u.value)
    }, [
      l.$slots.diy ? H(l.$slots, "diy", {
        key: 0,
        vuecal: T(G)
      }) : (V(), P(me, { key: 1 }, [
        He(Bt, null, Ce({ _: 2 }, [
          l.$slots.header ? {
            name: "header",
            fn: N((e) => [
              H(l.$slots, "header", se(re(e)))
            ]),
            key: "0"
          } : void 0,
          !l.$slots.header && l.$slots["previous-button"] ? {
            name: "previous-button",
            fn: N((e) => [
              H(l.$slots, "previous-button", se(re(e)))
            ]),
            key: "1"
          } : void 0,
          !l.$slots.header && l.$slots["next-button"] ? {
            name: "next-button",
            fn: N((e) => [
              H(l.$slots, "next-button", se(re(e)))
            ]),
            key: "2"
          } : void 0,
          !l.$slots.header && l.$slots["today-button"] ? {
            name: "today-button",
            fn: N((e) => [
              H(l.$slots, "today-button", se(re(e)))
            ]),
            key: "3"
          } : void 0,
          !l.$slots.header && l.$slots.title ? {
            name: "title",
            fn: N((e) => [
              H(l.$slots, "title", se(re(e)))
            ]),
            key: "4"
          } : void 0,
          !l.$slots.header && l.$slots["title.day"] ? {
            name: "title.day",
            fn: N((e) => [
              H(l.$slots, "title.day", se(re(e)))
            ]),
            key: "5"
          } : void 0,
          !l.$slots.header && l.$slots["title.days"] ? {
            name: "title.days",
            fn: N((e) => [
              H(l.$slots, "title.days", se(re(e)))
            ]),
            key: "6"
          } : void 0,
          !l.$slots.header && l.$slots["title.week"] ? {
            name: "title.week",
            fn: N((e) => [
              H(l.$slots, "title.week", se(re(e)))
            ]),
            key: "7"
          } : void 0,
          !l.$slots.header && l.$slots["title.month"] ? {
            name: "title.month",
            fn: N((e) => [
              H(l.$slots, "title.month", se(re(e)))
            ]),
            key: "8"
          } : void 0,
          !l.$slots.header && l.$slots["title.year"] ? {
            name: "title.year",
            fn: N((e) => [
              H(l.$slots, "title.year", se(re(e)))
            ]),
            key: "9"
          } : void 0,
          !l.$slots.header && l.$slots["title.years"] ? {
            name: "title.years",
            fn: N((e) => [
              H(l.$slots, "title.years", se(re(e)))
            ]),
            key: "10"
          } : void 0,
          !l.$slots.header && l.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: N((e) => [
              H(l.$slots, "schedule-heading", se(re(e)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        ye("div", En, [
          He(qe, {
            name: `vuecal-slide-fade--${T(X).transitionDirection}`
          }, {
            default: N(() => [
              (V(), P("div", {
                class: pe(["vuecal__scrollable", v.value]),
                key: T(X).id + T(X).start.getTime()
              }, [
                o.value ? (V(), Se(bn, { key: 0 }, Ce({ _: 2 }, [
                  l.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: N((e) => [
                      H(l.$slots, "time-cell", se(re(e)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : ee("", !0),
                T(d).weekNumbers && T(X).isMonth ? (V(), P("div", Yn, [
                  (V(!0), P(me, null, we(j.value, (e) => (V(), P("div", Sn, [
                    H(l.$slots, "week-number", {}, () => [
                      ye("small", null, fe(e), 1)
                    ])
                  ]))), 256))
                ])) : ee("", !0),
                ye("div", Cn, [
                  He(_n, null, Ce({ _: 2 }, [
                    l.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: N((e) => [
                        H(l.$slots, "weekday-heading", se(re(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    l.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: N((e) => [
                        H(l.$slots, "schedule-heading", se(re(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    l.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: N((e) => [
                        H(l.$slots, "event.all-day", se(re(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    l.$slots.event ? {
                      name: "event",
                      fn: N((e) => [
                        H(l.$slots, "event", se(re(e)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  He(Tn, null, Ce({ _: 2 }, [
                    l.$slots.cell ? {
                      name: "cell",
                      fn: N((e) => [
                        H(l.$slots, "cell", se(re(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    !l.$slots.cell && l.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: N((e) => [
                        H(l.$slots, "cell-date", se(re(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    !l.$slots.cell && l.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: N((e) => [
                        H(l.$slots, "cell-content", se(re(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    !l.$slots.cell && l.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: N((e) => [
                        H(l.$slots, "cell-events", se(re(e)))
                      ]),
                      key: "3"
                    } : void 0,
                    !l.$slots.cell && !l.$slots["cell-events"] && l.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: N((e) => [
                        H(l.$slots, "event.all-day", se(re(e)))
                      ]),
                      key: "4"
                    } : void 0,
                    !l.$slots.cell && !l.$slots["cell-events"] && l.$slots[`event.${T(X).id}`] ? {
                      name: `event.${T(X).id}`,
                      fn: N((e) => [
                        H(l.$slots, `event.${T(X).id}`, se(re(e)))
                      ]),
                      key: "5"
                    } : void 0,
                    !l.$slots.cell && !l.$slots["cell-events"] && l.$slots.event ? {
                      name: "event",
                      fn: N((e) => [
                        H(l.$slots, "event", se(re(e)))
                      ]),
                      key: "6"
                    } : void 0,
                    !l.$slots.cell && l.$slots["event-count"] ? {
                      name: "event-count",
                      fn: N((e) => [
                        H(l.$slots, "event-count", se(re(e)))
                      ]),
                      key: "7"
                    } : void 0,
                    l.$slots["now-line"] ? {
                      name: "now-line",
                      fn: N((e) => [
                        H(l.$slots, "now-line", se(re(e)))
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
    ], 14, Mn));
  }
}, On = (h) => {
  Fe.texts = { ...he.texts, ...h }, Fe.dateUtils.updateTexts(Fe.texts);
}, {
  addDatePrototypes: Hn,
  removeDatePrototypes: jn,
  updateTexts: Pn,
  addDays: An,
  subtractDays: Ln,
  addHours: Fn,
  subtractHours: Xn,
  addMinutes: Rn,
  subtractMinutes: Wn,
  getWeek: Nn,
  isToday: Bn,
  isSameDate: In,
  isInRange: Gn,
  isLeapYear: Un,
  getPreviousFirstDayOfWeek: qn,
  stringToDate: Jn,
  dateToMinutes: Zn,
  countDays: Kn,
  datesInSameTimeStep: Qn,
  isValid: xn,
  formatDate: ea,
  formatDateLite: ta,
  formatTime: na,
  formatTimeLite: aa,
  formatMinutes: sa
} = Fe.dateUtils;
export {
  Vn as VueCal,
  Hn as addDatePrototypes,
  An as addDays,
  Fn as addHours,
  Rn as addMinutes,
  Kn as countDays,
  Zn as dateToMinutes,
  Qn as datesInSameTimeStep,
  ea as formatDate,
  ta as formatDateLite,
  sa as formatMinutes,
  na as formatTime,
  aa as formatTimeLite,
  qn as getPreviousFirstDayOfWeek,
  Nn as getWeek,
  Gn as isInRange,
  Un as isLeapYear,
  In as isSameDate,
  Bn as isToday,
  xn as isValidDate,
  jn as removeDatePrototypes,
  Jn as stringToDate,
  Ln as subtractDays,
  Xn as subtractHours,
  Wn as subtractMinutes,
  Pn as updateTexts,
  On as useLocale
};
