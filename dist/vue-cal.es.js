import { computed as b, reactive as be, watch as De, toRefs as bt, ref as ue, onBeforeUnmount as Re, nextTick as Xe, inject as He, createElementBlock as P, openBlock as V, renderSlot as O, createCommentVNode as x, unref as $, Fragment as de, renderList as we, normalizeClass as pe, createElementVNode as he, createVNode as Oe, Transition as Ue, withCtx as N, createBlock as Se, resolveDynamicComponent as xe, mergeProps as ie, toHandlers as Ie, normalizeProps as ne, onMounted as Ze, toDisplayString as ce, createTextVNode as qe, withModifiers as et, normalizeStyle as $e, TransitionGroup as tt, createSlots as Ce, useTemplateRef as Tt, useId as Mt, useAttrs as Et, provide as nt, guardReactiveProps as le } from "vue";
/**
  * vue-cal v5.0.1-rc.33
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const fe = {
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
}, Yt = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Ge = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], St = Ge.reduce((y, t, d) => (y[t] = d || 7, y), {}), Ct = (y, t, d) => {
  const { dateUtils: r } = y, h = !1, C = b(() => {
    if (E.value[t.view]) return t.view;
    const c = t.datePicker ? "month" : "week", u = t.view || c;
    return E.value[u] ? u : (console.warn(
      `Vue Cal: the provided or default view \`${u}\` is either invalid or not in the list of available views. The first available view will be chosen: \`${Object.keys(E.value)[0]}\`.`
    ), Object.keys(E.value)[0]);
  }), W = b(() => t.sm && !t.xs), v = b(() => t.xs || t.datePicker), A = b(() => t.clickToNavigate || t.datePicker && t.clickToNavigate !== !1), Z = b(() => {
    const c = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, u = (p) => p.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [p, n] of Object.entries(d)) {
      const [j, X, U] = p.match(/^on(Cell|Event)(.+)$/) || [];
      j && (c[X.toLowerCase()][u(U).replace(/^-+|-+$/g, "")] = n);
    }
    return c;
  }), L = b(() => {
    var u;
    const c = {};
    return t.hideWeekends && (c[6] = !0) && (c[7] = !0), (u = t.hideWeekdays) != null && u.length && t.hideWeekdays.forEach((p) => c[St[p]] = !0), c;
  }), l = b(() => t.hideWeekends || L.value[6] && L.value[7]), E = b(() => {
    const c = t.datePicker;
    let u = 0, p = {};
    const n = t.views;
    return c && !n ? {
      month: { ...fe.availableViews.month },
      year: { ...fe.availableViews.year },
      years: { ...fe.availableViews.years }
    } : t.horizontal && !n ? {
      days: { cols: fe.availableViews.days.rows, rows: fe.availableViews.days.cols },
      week: { cols: fe.availableViews.week.rows, rows: fe.availableViews.week.cols }
    } : (n ? (Array.isArray(n) ? p = n.reduce((j, X) => (typeof X == "string" && fe.availableViews[X] ? j[X] = fe.availableViews[X] : u++, j), {}) : typeof n == "object" && (p = Object.entries(n).reduce((j, [X, U]) => {
      const { cols: K, rows: te } = fe.availableViews[X];
      return j[X] = { cols: U.cols || K, rows: U.rows || te }, j;
    }, {})), u && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(p).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), p = { ...fe.availableViews })) : p = { ...fe.availableViews }, p);
  }), F = b(() => t.datePicker ? "month" : E.value.week ? "week" : Object.keys(E.value)[0]), m = b(() => {
    if (typeof t.selectedDate == "string") return r.stringToDate(t.selectedDate);
    if (t.selectedDate instanceof Date) return t.selectedDate;
    t.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", t.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), i = b(() => {
    if (!t.disableDays) return [];
    const c = [];
    if (Array.isArray(t.disableDays))
      for (let u of t.disableDays) {
        let p = u;
        typeof u == "string" ? p = r.stringToDate(u) : u instanceof Date && (u = r.formatDate(u, "YYYY-MM-DD")), p instanceof Date && !isNaN(p.getTime()) ? c.push(u) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", u);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", t.disableDays);
    return c;
  }), S = b(() => {
    let c = null;
    return t.minDate && typeof t.minDate == "string" ? c = r.stringToDate(t.minDate) : t.minDate && t.minDate instanceof Date && (c = t.minDate), (c == null ? void 0 : c.getTime()) || null;
  }), a = b(() => {
    let c = null;
    return t.maxDate && typeof t.maxDate == "string" ? c = r.stringToDate(t.maxDate) : t.maxDate && t.maxDate instanceof Date && (c = t.maxDate), (c == null ? void 0 : c.getTime()) || null;
  }), I = b(() => {
    var p;
    const { view: c } = y;
    return t.schedules.length && (c.isDay || c.isDays || c.isWeek) && ((p = t.schedules) == null ? void 0 : p.map((n, j) => ({ ...n, id: n.id ?? j + 1 }))) || void 0;
  }), e = b(() => {
    const c = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return t.editableEvents === !0 ? c : t.editableEvents === !1 ? Object.keys(c).map((u) => c[u] = !1) : { ...c, ...t.editableEvents };
  }), z = b(() => {
    const { view: c } = y, { eventCount: u } = t;
    return (Array.isArray(u) ? u.includes(c.id) : u) && (c.isMonth && !t.eventsOnMonthView || c.isYear);
  }), H = b(() => t.allDayEvents && t.time !== !1 && !C.isMonth), Y = b(() => t.timeAtCursor && t.time !== !1), _ = async (c) => {
    var p;
    let u = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((n) => n.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((n) => n.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((n) => n.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((n) => n.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((n) => n.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((n) => n.default), "../i18n/da.json": () => import("./i18n/da.js").then((n) => n.default), "../i18n/de.json": () => import("./i18n/de.js").then((n) => n.default), "../i18n/el.json": () => import("./i18n/el.js").then((n) => n.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((n) => n.default), "../i18n/en-us.json": () => Promise.resolve().then(() => jt).then((n) => n.default), "../i18n/es.json": () => import("./i18n/es.js").then((n) => n.default), "../i18n/et.json": () => import("./i18n/et.js").then((n) => n.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((n) => n.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((n) => n.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((n) => n.default), "../i18n/he.json": () => import("./i18n/he.js").then((n) => n.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((n) => n.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((n) => n.default), "../i18n/id.json": () => import("./i18n/id.js").then((n) => n.default), "../i18n/is.json": () => import("./i18n/is.js").then((n) => n.default), "../i18n/it.json": () => import("./i18n/it.js").then((n) => n.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((n) => n.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((n) => n.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((n) => n.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((n) => n.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((n) => n.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((n) => n.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((n) => n.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((n) => n.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((n) => n.default), "../i18n/no.json": () => import("./i18n/no.js").then((n) => n.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((n) => n.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((n) => n.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((n) => n.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((n) => n.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((n) => n.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((n) => n.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((n) => n.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((n) => n.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((n) => n.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((n) => n.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((n) => n.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((n) => n.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((n) => n.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((n) => n.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((n) => n.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((n) => n.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((n) => n.default) });
    {
      if (!u[`../i18n/${c}.json`]) {
        console.warn(`Vue Cal: the locale \`${c}\` does not exist. Falling back to \`en-us\`.`), c = "en-us";
        return;
      }
      u = await ((p = u[`../i18n/${c}.json`]) == null ? void 0 : p.call(u));
    }
    y.texts = Object.assign(y.texts, Object.assign({ ...fe.texts }, u)), r.updateTexts(y.texts);
  }, f = be(t.events || []);
  return De(() => t.events, (c) => f.splice(0, f.length, ...c)), De(() => t.locale, (c) => _(c || "en-us")), (t.locale || !y.texts.today) && _(t.locale || "en-us"), {
    ...bt(t),
    events: f,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: Z,
    defaultView: F,
    availableViews: E,
    disableDays: i,
    ready: h,
    sm: W,
    xs: v,
    clickToNavigate: A,
    hideWeekdays: L,
    hideWeekends: l,
    minTimestamp: S,
    maxTimestamp: a,
    schedules: I,
    selectedDate: m,
    editableEvents: e,
    showCellEventCount: z,
    allDayEvents: H,
    timeAtCursor: Y,
    view: C,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(L.value).length;
    },
    get size() {
      return v.value ? "xs" : W.value ? "sm" : "lg";
    },
    loadTexts: _
  };
}, Ve = (y, t) => {
  const d = t.timeTo - t.timeFrom;
  return (y - t.timeFrom) * 100 / d;
}, je = (y, t) => {
  const d = t.timeTo - t.timeFrom;
  return ~~(y * d / 100 + t.timeFrom);
}, Ke = (y, t) => {
  const d = t.clientHeight;
  return y * 100 / d;
}, We = be({ id: null, date: null });
let at = !1, Je = !0;
const _e = be({ el: null, cell: null, timeout: null }), ke = be({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function zt(y) {
  const { config: t, view: d, eventsManager: r, emit: h, uid: C, dateUtils: W } = y, v = (S) => {
    var _;
    const { timeStep: a, timeCellHeight: I, timeFrom: e } = t, z = (((_ = S.touches) == null ? void 0 : _[0]) || S).clientY, { top: H } = S.currentTarget.getBoundingClientRect(), Y = z - H - ~~S.dataTransfer.getData("cursor-grab-at");
    return je(Ke(Y, S.currentTarget), t);
  }, A = (S, a, I) => {
    const e = a.duration || Z(a.start, a.end) || t.timeStep;
    let z = Math.max(v(S), 0);
    if (t.snapToInterval) {
      const f = z + t.snapToInterval / 2;
      z = f - f % t.snapToInterval;
    }
    const H = new Date(new Date(I).setMinutes(z)), Y = Math.min(z + e, 1440), _ = new Date(new Date(I).setMinutes(Y));
    return { start: H, end: _ };
  }, Z = (S, a) => Math.round((a - S) / 6e4);
  return {
    eventDragStart: (S, a) => {
      if (S.target.nodeType === 3 || y.touch.isResizingEvent) return S.preventDefault();
      S.dataTransfer.effectAllowed = "move", S.dataTransfer.dropEffect = "move";
      const I = { ...a, _: { id: a._.id, duration: Z(a.start, a.end) } };
      try {
        S.dataTransfer.setData("text/plain", ""), S.dataTransfer.setData("event", JSON.stringify(I)), S.dataTransfer.setData("cursor-grab-at", S.offsetY);
      } catch (z) {
        return console.warn("Vue Cal: Failed to set drag data:", z), S.preventDefault();
      }
      ke.eventId = a._.id, ke.fromVueCal = C, h("event-drag-start", {
        e: S,
        event: a
      });
      const e = S.target.closest(".vuecal__event");
      e.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        e.classList.add("vuecal__event--dragging-original"), e.classList.remove("vuecal__event--dragging-ghost");
      }, 0), at = !1, Object.assign(We, { id: d.id, date: d.firstCellDate }), Je = !0, y.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (S, a) => {
      ke.eventId = null, S.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: I, toVueCal: e } = ke;
      e && I !== e && r.deleteEvent(a._.id, 3), at && Je && We.id && d.switchView(We.id, We.date, !0), h("event-drag-end", {
        e: S,
        event: a,
        external: ke.fromVueCal !== C
      }), ke.fromVueCal = null, ke.toVueCal = null, y.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (S, a) => {
      const { start: I } = a, e = S.currentTarget;
      if (!S.currentTarget.contains(S.relatedTarget)) {
        if (e === _e.el || !e.className.includes("vuecal__cell-content")) return !1;
        _e.el && (_e.cell.highlighted = !1), Object.assign(_e, { el: e, cell: a, timeout: clearTimeout(_e.timeout) }), a.highlighted = !0, ["years", "year", "month"].includes(d.id) && (_e.timeout = setTimeout(() => y.switchToNarrowerView(I), 2e3));
      }
    },
    cellDragOver: (S, a) => {
      const { start: I, schedule: e } = a;
      S.preventDefault(), a.highlighted = !0, (e || e === 0) && (a.highlightedSchedule = e);
    },
    cellDragLeave: (S, a) => {
      S.preventDefault(), !S.currentTarget.contains(S.relatedTarget) && (a.highlightedSchedule = !1, _e.cell === a && (clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null }), a.highlighted = !1));
    },
    cellDragDrop: async (S, a, I = !1) => {
      var p, n, j;
      S.preventDefault(), clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null });
      const e = JSON.parse(S.dataTransfer.getData("event") || "{}");
      e.start && (e.start = new Date(e.start)), e.end && (e.end = new Date(e.end));
      let z, H, Y;
      I ? (H = new Date(a.start), Y = new Date(a.end)) : { start: H, end: Y } = A(S, e, a.start);
      const { schedule: _ } = ((p = S.target.closest("[data-schedule]")) == null ? void 0 : p.dataset) || {};
      let f = () => {
      };
      ke.fromVueCal === C ? (z = r.getEvent(e._.id), z && (z._.dragging = !1, f = (X) => {
        if (z.start = H, z.end = Y, z.allDay = I, _ !== void 0 && (z.schedule = ~~_), X && typeof X == "object") {
          const { _: U, ...K } = X;
          Object.assign(z, K);
        }
      })) : (z = {
        ...e,
        start: H,
        end: Y,
        ..._ !== void 0 && { schedule: ~~_ },
        _: { id: ((n = e._) == null ? void 0 : n.id) || e.id, duration: Z(H, Y) },
        getOverlappingEvents: () => r.getEventsInRange(H, Y, { schedule: ~~_ })
      }, f = (X) => {
        if (z = r.createEvent(z), X && typeof X == "object") {
          const { _: U, ...K } = X;
          Object.assign(z, K);
        }
      });
      let c = !0;
      const { drop: u } = (j = t.eventListeners) == null ? void 0 : j.event;
      u && (c = await u({
        e: S,
        event: { ...z, start: H, end: Y, schedule: ~~_ },
        overlaps: z.getOverlappingEvents({ start: H, end: Y, schedule: ~~_ }),
        cell: a,
        external: ke.fromVueCal !== C
      })), c !== !1 && f(c), a.highlighted = !1, a.highlightedSchedule = null, Je = !1, ke.toVueCal = C, h("event-dropped", {
        e: S,
        cell: a,
        event: z,
        originalEvent: e,
        external: ke.fromVueCal !== C
      });
    }
  };
}
const lt = (y, t) => {
  let d, r, h, C = {}, W = {};
  const v = ue(y), A = () => {
    v.value.today || (v.value = t), Date.prototype.addDays = function(s) {
      return E(this, s || 0);
    }, Date.prototype.subtractDays = function(s) {
      return F(this, s || 0);
    }, Date.prototype.addHours = function(s) {
      return m(this, s || 0);
    }, Date.prototype.subtractHours = function(s) {
      return i(this, s || 0);
    }, Date.prototype.addMinutes = function(s) {
      return S(this, s || 0);
    }, Date.prototype.subtractMinutes = function(s) {
      return a(this, s || 0);
    }, Date.prototype.getWeek = function() {
      return e(this);
    }, Date.prototype.isToday = function() {
      return z(this);
    }, Date.prototype.isLeapYear = function() {
      return _(this);
    }, Date.prototype.format = function(s = "YYYY-MM-DD") {
      return X(this, s);
    }, Date.prototype.formatTime = function(s = "HH:mm") {
      return K(this, s);
    };
  }, Z = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, L = (s) => {
    v.value = s, Date.prototype.subtractDays && A();
  }, l = () => (r !== (/* @__PURE__ */ new Date()).getDate() && (d = /* @__PURE__ */ new Date(), r = d.getDate(), h = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`), h), E = (s, k) => {
    const D = new Date(s.valueOf());
    return D.setDate(D.getDate() + k), D;
  }, F = (s, k) => {
    const D = new Date(s.valueOf());
    return D.setDate(D.getDate() - k), D;
  }, m = (s, k) => {
    const D = new Date(s.valueOf());
    return D.setHours(D.getHours() + k), D;
  }, i = (s, k) => {
    const D = new Date(s.valueOf());
    return D.setHours(D.getHours() - k), D;
  }, S = (s, k) => {
    const D = new Date(s.valueOf());
    return D.setMinutes(D.getMinutes() + k), D;
  }, a = (s, k) => {
    const D = new Date(s.valueOf());
    return D.setMinutes(D.getMinutes() - k), D;
  }, I = (s, k) => {
    const D = (J) => {
      const se = J % k;
      return se !== 0 && (J += se >= k / 2 ? k - se : -se), J;
    };
    if (typeof s == "number") return D(s);
    if (s instanceof Date) {
      let J = D(s.getMinutes());
      J >= 60 && (s.setHours(s.getHours() + 1), J = 0), s.setMinutes(J, 0, 0);
    }
  }, e = (s, k = !1) => {
    const D = new Date(Date.UTC(s.getFullYear(), s.getMonth(), s.getDate())), J = D.getUTCDay() || 7;
    D.setUTCDate(D.getUTCDate() + 4 - J);
    const se = new Date(Date.UTC(D.getUTCFullYear(), 0, 1));
    return Math.ceil(((D - se) / 864e5 + 1) / 7) + (k ? 1 : 0);
  }, z = (s) => `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}` === l(), H = (s, k) => {
    if (!s || !k) return console.warn(`Vue Cal: missing date${s ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (j(s)) {
      if (!j(k)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${k}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${s}\`.`);
    return s.getFullYear() === k.getFullYear() && s.getMonth() === k.getMonth() && s.getDate() === k.getDate();
  }, Y = (s, k, D) => j(s) ? s.getTime() >= k && s.getTime() <= D : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${s}\`.`), _ = (s) => {
    const k = s.getFullYear();
    return !(k % 400) || k % 100 && !(k % 4);
  }, f = (s = null, k) => {
    const D = s && new Date(s.valueOf()) || /* @__PURE__ */ new Date(), J = k ? 7 : 6;
    return D.setDate(D.getDate() - (D.getDay() + J) % 7), D;
  }, c = (s) => s instanceof Date ? s : (s.length === 10 && (s += " 00:00"), new Date(s.replace(/-/g, "/"))), u = (s) => s.getHours() * 60 + s.getMinutes(), p = (s, k) => {
    typeof s == "string" && (s = s.replace(/-/g, "/")), typeof k == "string" && (k = k.replace(/-/g, "/")), s = new Date(s).setHours(0, 0, 0, 0), k = new Date(k).setHours(0, 0, 1, 0);
    const D = (new Date(k).getTimezoneOffset() - new Date(s).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((k - s - D) / (24 * 3600 * 1e3));
  }, n = (s, k, D) => Math.abs(s.getTime() - k.getTime()) <= D * 60 * 1e3, j = (s) => s && s instanceof Date && !isNaN(s), X = (s, k = "YYYY-MM-DD", D = null) => {
    if (D || (D = v.value), k || (k = "YYYY-MM-DD"), k === "YYYY-MM-DD") return U(s);
    C = {}, W = {};
    const J = {
      YYYY: () => ae(s, D).YYYY,
      YY: () => ae(s, D).YY(),
      M: () => ae(s, D).M,
      MM: () => ae(s, D).MM(),
      MMM: () => ae(s, D).MMM(),
      MMMM: () => ae(s, D).MMMM(),
      MMMMG: () => ae(s, D).MMMMG(),
      D: () => ae(s, D).D,
      DD: () => ae(s, D).DD(),
      S: () => ae(s, D).S(),
      d: () => ae(s, D).d,
      dd: () => ae(s, D).dd(),
      ddd: () => ae(s, D).ddd(),
      dddd: () => ae(s, D).dddd(),
      HH: () => ve(s, D).HH,
      H: () => ve(s, D).H,
      hh: () => ve(s, D).hh,
      h: () => ve(s, D).h,
      am: () => ve(s, D).am,
      AM: () => ve(s, D).AM,
      mm: () => ve(s, D).mm,
      m: () => ve(s, D).m,
      s: () => ve(s, D).s
    };
    return k.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (se, me) => {
      const o = J[me.replace(/\{|\}/g, "")];
      return o !== void 0 ? o() : me;
    });
  }, U = (s) => {
    const k = s.getMonth() + 1, D = s.getDate();
    return `${s.getFullYear()}-${k < 10 ? "0" : ""}${k}-${D < 10 ? "0" : ""}${D}`;
  }, K = (s, k = "HH:mm", D = null, J = !1) => {
    let se = !1;
    if (J) {
      const [T, M, w] = [s.getHours(), s.getMinutes(), s.getSeconds()];
      T + M + w === 141 && (se = !0);
    }
    if (s instanceof Date && k === "HH:mm") return se ? "24:00" : te(s);
    W = {}, D || (D = v.value);
    const me = ve(s, D), o = k.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (T, M) => {
      const w = me[M.replace(/\{|\}/g, "")];
      return w !== void 0 ? w : M;
    });
    return se ? o.replace("23:59", "24:00") : o;
  }, te = (s) => {
    const k = s.getHours(), D = s.getMinutes();
    return `${(k < 10 ? "0" : "") + k}:${(D < 10 ? "0" : "") + D}`;
  }, q = (s) => {
    const k = Math.floor(s / 60).toString().padStart(2, 0), D = (s % 60).toString().padStart(2, 0);
    return `${k}:${D}`;
  }, re = (s) => {
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
  }, ae = (s, k) => {
    if (C.D) return C;
    const D = s.getFullYear(), J = s.getMonth() + 1, se = s.getDate(), o = (s.getDay() - 1 + 7) % 7;
    return C = {
      // Year.
      YYYY: D,
      // 2024.
      YY: () => D.toString().substring(2),
      // 24.
      // Month.
      M: J,
      // 1 to 12.
      MM: () => J.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => k.months[J - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => k.months[J - 1],
      // January to December.
      MMMMG: () => (k.monthsGenitive || k.months)[J - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: se,
      // 1 to 31.
      DD: () => se.toString().padStart(2, 0),
      // 01 to 31.
      S: () => re(se),
      // st, nd, rd, th.
      // Day of the week.
      d: o + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => k.weekDaysShort.length ? k.weekDaysShort[o] : k.weekDays[o][0],
      // M to S.
      ddd: () => k.weekDaysShort.length ? k.weekDaysShort[o] : k.weekDays[o].substr(0, 3),
      // Mon to Sun.
      dddd: () => k.weekDays[o]
      // Monday to Sunday.
    }, C;
  }, ve = (s, k) => {
    if (W.am) return W;
    let D, J, se;
    s instanceof Date ? (D = s.getHours(), J = s.getMinutes(), se = s.getSeconds()) : (D = Math.floor(s / 60), J = Math.floor(s % 60));
    const me = D % 12 ? D % 12 : 12, o = (k || { am: "am", pm: "pm" })[D === 24 || D < 12 ? "am" : "pm"];
    return W = {
      H: D,
      h: me,
      HH: D.toString().padStart(2, 0),
      hh: me.toString().padStart(2, 0),
      am: o,
      AM: o.toUpperCase(),
      m: J,
      mm: J.toString().padStart(2, 0),
      s: se
    }, W;
  };
  return {
    addDatePrototypes: A,
    removeDatePrototypes: Z,
    updateTexts: L,
    addDays: E,
    subtractDays: F,
    addHours: m,
    subtractHours: i,
    addMinutes: S,
    subtractMinutes: a,
    snapToInterval: I,
    getWeek: e,
    isToday: z,
    isSameDate: H,
    isInRange: Y,
    isLeapYear: _,
    getPreviousFirstDayOfWeek: f,
    stringToDate: c,
    dateToMinutes: u,
    countDays: p,
    datesInSameTimeStep: n,
    isValid: j,
    formatDate: X,
    formatDateLite: U,
    formatTime: K,
    formatTimeLite: te,
    formatMinutes: q
  };
}, Vt = (y) => {
  const { dateUtils: t, config: d } = y;
  let r = 0;
  const h = b(() => {
    var H, Y, _, f, c;
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
    }, z = d.events.slice().sort((u, p) => u.start - p.start < 0 ? -1 : 1);
    for (let u of z) {
      const p = typeof u.start == "string" || typeof u.end == "string", n = !((H = u._) != null && H.register) || !u.isOverlapping || !u.delete;
      let j = !1;
      if (!p && ((Y = u._) != null && Y.cachedStart) && ((_ = u._) != null && _.cachedEnd) && (j = u.start.getTime() !== ((f = u._) == null ? void 0 : f.cachedStart) || u.end.getTime() !== ((c = u._) == null ? void 0 : c.cachedEnd)), p || n || j) {
        if (!C(u)) continue;
        W(u), u._.cachedStart = u.start.getTime(), u._.cachedEnd = u.end.getTime();
      }
      if (e.byId[u._.id] = u, u.recurring)
        e.recurring.push(u._.id);
      else if (!t.isSameDate(u.start, new Date(u.end.getTime() - 1)))
        u._.multiday = d.multidayEvents, d.multidayEvents ? e.multiday.push(u._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), u.end = new Date(new Date(u.start).setHours(23, 59, 59, 999)), W(u)), e.byDate[u._.startFormatted] || (e.byDate[u._.startFormatted] = []), e.byDate[u._.startFormatted].push(u._.id);
      else {
        e.byDate[u._.startFormatted] || (e.byDate[u._.startFormatted] = []), e.byDate[u._.startFormatted].push(u._.id);
        const X = u._.startFormatted.substring(0, 4), U = u._.startFormatted.substring(5, 7), K = u._.startFormatted.substring(8, 10);
        e.byYear[X] || (e.byYear[X] = {}), e.byYear[X][U] || (e.byYear[X][U] = {}), e.byYear[X][U][K] || (e.byYear[X][U][K] = []), e.byYear[X][U][K].push(u._.id);
      }
    }
    return e;
  }), C = (e) => !e.start || !e.end ? (console.error("Vue Cal: Event is missing start or end date", e), !1) : (typeof e.start == "string" && (e.start = t.stringToDate(e.start)), typeof e.end == "string" && (e.end = t.stringToDate(e.end)), e.start.setSeconds(0, 0), e.end.getSeconds() === 59 ? e.end.setMinutes(e.end.getMinutes() + 1, 0, 0) : e.end.setSeconds(0, 0), isNaN(e.start) || isNaN(e.end) || e.end.getTime() < e.start.getTime() ? (isNaN(e.start) ? console.error(`Vue Cal: invalid start date for event "${e.title}".`, e.start) : isNaN(e.end) ? console.error(`Vue Cal: invalid end date for event "${e.title}".`, e.end) : console.error(`Vue Cal: invalid event dates for event "${e.title}". The event ends before it starts.`, e.start, e.end), !1) : !0), W = (e) => {
    e._ || (e._ = {}), e._.id = e._.id || ++r, e._.multiday = !t.isSameDate(e.start, new Date(e.end.getTime() - 1)), e._.startFormatted = t.formatDate(e.start), e._.endFormatted = t.formatDate(e.end), e._.startMinutes = ~~t.dateToMinutes(e.start), e._.endMinutes = ~~t.dateToMinutes(e.end);
    const z = e.start.getHours(), H = e.start.getMinutes().toString().padStart(2, 0), Y = e.end.getHours(), _ = e.end.getMinutes().toString().padStart(2, 0);
    e._.startTimeFormatted24 = `${z.toString().padStart(2, 0)}:${H}`, e._.startTimeFormatted12 = `${z % 12 || 12}${H ? `:${H}` : ""} ${z < 12 ? "AM" : "PM"}`, e._.endTimeFormatted24 = `${Y.toString().padStart(2, 0)}:${_}`, e._.endTimeFormatted12 = `${Y % 12 || 12}${_ ? `:${_}` : ""} ${Y < 12 ? "AM" : "PM"}`, e._.duration = Math.abs(~~((e.end - e.start) / 6e4)), e.delete || (e.delete = function(f) {
      return L(this._.id, f);
    }), e._.deleting === void 0 && (e._.deleting = !1), e._.deleted === void 0 && (e._.deleted = !1), e.isOverlapping || (e.isOverlapping = function(f = null) {
      return this.getOverlappingEvents(f).length;
    }), e.getOverlappingEvents || (e.getOverlappingEvents = function(f = null) {
      var n;
      const c = (f == null ? void 0 : f.start) || this.start, u = (f == null ? void 0 : f.end) || this.end, p = (n = d.schedules) != null && n.length ? ~~((f == null ? void 0 : f.schedule) || this.schedule) : null;
      return E(c, u, { excludeIds: [this._.id], schedule: p });
    }), e._.register || (e._.register = (f) => {
      e._.$el = f, e._.fireCreated && (y.emit("event-created", e), delete e._.fireCreated);
    }), e._.unregister || (e._.unregister = () => {
      e._.$el = null, e._.register = null, e.isOverlapping = null, e.getOverlappingEvents = null, e.delete = null;
    });
  }, v = (e) => h.value.byId[e], A = (e) => {
    const z = [];
    for (const { start: H, end: Y } of e) {
      const _ = E(H, Y);
      _.length && z.push(..._);
    }
    return z;
  }, Z = (e) => {
    if (!e.start || !e.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return d.snapToInterval && (t.snapToInterval(e.start, d.snapToInterval), t.snapToInterval(e.end, d.snapToInterval)), e = { ...e }, e._ || (e._ = {}), e._.id = ++r, e._.fireCreated = !0, d.events.push(e), e;
  }, L = async (e, z = 0) => {
    var c, u;
    if (!e) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let H = typeof e == "string" || !isNaN(e) ? e : null;
    const Y = typeof e == "object" ? Object.entries(e) : null;
    if (Y) {
      const [p, n] = Y[0];
      H = (c = d.events.find((j) => j[p] === n)) == null ? void 0 : c._.id;
    }
    if (!d.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!H) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const _ = d.events.findIndex((p) => p._.id === H);
    if (_ === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${H}\`.`);
    const f = d.events[_];
    if (f.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${H}\` since it was explicitely set to \`delete: false\`.`);
    switch (z) {
      case 0:
        f._.deleting ? d.events.splice(_, 1) : f._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        f._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        f._.deleted = !0, d.events[_]._.deleted = !0, (u = f._.$el) == null || u.dispatchEvent(new CustomEvent("event-deleted", { detail: f._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        d.events.splice(_, 1), y.emit("update:events", d.events), y.emit("event-delete", f);
        break;
    }
    return !0;
  }, l = (e, z, H) => {
    const Y = d.allDayEvents ? { allDay: H } : {}, _ = E(e, z, { background: !1, ...Y });
    if (!_.length) return { cellOverlaps: {}, longestStreak: 0 };
    const f = {};
    let c = [], u = 0;
    _.sort((p, n) => p.start - n.start || p.end - p.start - (n.end - n.start));
    for (const p of _) {
      const n = p._.id;
      f[n] || (f[n] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), c = c.filter((te) => te.end > p.start);
      const j = c.filter((te) => {
        var re;
        return (!((re = d.schedules) != null && re.length) || p.schedule === te.schedule) && te.start < p.end;
      }), X = new Set(j.map((te) => {
        var q;
        return ((q = f[te._.id]) == null ? void 0 : q.position) ?? 0;
      }));
      let U = 0;
      for (; X.has(U); ) U++;
      f[n].position = U, c.push(p);
      const K = Math.max(1, ...j.map((te) => {
        var q;
        return ((q = f[te._.id]) == null ? void 0 : q.maxConcurrent) ?? 1;
      }));
      f[n].maxConcurrent = Math.max(j.length + 1, K);
      for (const te of j)
        f[te._.id].overlaps.add(n), f[n].overlaps.add(te._.id), f[te._.id].maxConcurrent = f[n].maxConcurrent;
      u = Math.max(u, f[n].maxConcurrent);
    }
    for (const p in f) f[p].overlaps = [...f[p].overlaps];
    return { cellOverlaps: f, longestStreak: u };
  }, E = (e, z, { excludeIds: H = [], schedule: Y = null, background: _ = !0, allDay: f = !1 } = {}) => {
    if (!Object.keys(h.value.byId).length) return [];
    const c = e.getFullYear(), u = z.getFullYear(), p = e.getMonth() + 1, n = z.getMonth() + 1, j = e.getDate(), X = z.getDate();
    e.getTime(), z.getTime();
    const U = new Date(e).setHours(0, 0, 0, 0), K = new Date(z).setHours(23, 59, 59, 999), te = new Set(H), q = [];
    if (Object.keys(h.value.byId).length <= 100) {
      for (const re of Object.values(h.value.byId))
        !re || te.has(re._.id) || Y !== null && Y !== re.schedule || _ === !1 && re.background || d.allDayEvents && (f && !re.allDay || !f && re.allDay) || re.start.getTime() < K && re.end.getTime() > U && q.push(re);
      return q;
    }
    for (let re = c; re <= u; re++) {
      const ae = `${re}`, ve = h.value.byYear[ae];
      if (!ve) continue;
      const s = re === c ? p : 1, k = re === u ? n : 12;
      for (let D = s; D <= k; D++) {
        const J = String(D).padStart(2, "0"), se = ve[J];
        if (se)
          for (const me in se) {
            const o = +me;
            if (o > X || o < j) continue;
            const T = se[me];
            if (T != null && T.length)
              for (let M = 0; M < T.length; M++) {
                const w = h.value.byId[T[M]];
                !w || te.has(w._.id) || Y !== null && Y !== w.schedule || _ === !1 && w.background || d.allDayEvents && (f && !w.allDay || !f && w.allDay) || w.start.getTime() < K && w.end.getTime() > U && q.push(w);
              }
          }
      }
    }
    return q;
  }, F = (e, z, H) => {
    const Y = e.allDay || !d.time, _ = Y ? new Date(e.start).setHours(0, 0, 0, 0) : e.start.getTime(), f = Y ? new Date(e.end).setHours(23, 59, 59, 999) : e.end.getTime(), c = Y ? new Date(z).setHours(0, 0, 0, 0) : z.getTime(), u = Y ? new Date(H).setHours(23, 59, 59, 999) : H.getTime();
    return f > c && _ < u;
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
  }), i = (e, z) => {
    var f;
    let H = je(m.movePercentageY, d);
    if (H = Math.max(0, Math.min(H, 1440)), d.snapToInterval) {
      const c = H + d.snapToInterval / 2;
      H = c - c % d.snapToInterval;
    }
    let Y = e.start, _ = new Date(z.getTime() + H * 6e4);
    return m.moveX && ((f = y.touch) != null && f.currentHoveredCell) && m.cellEl && new Date(y.touch.currentHoveredCell.__vueParentComponent.props.start), _ < m.resizeStartDate && (Y = _, _ = m.resizeStartDate), { newStart: Y, newEnd: _ };
  }, S = async (e) => {
    var Y, _, f, c, u;
    const { clientX: z, clientY: H } = ((Y = e.touches) == null ? void 0 : Y[0]) || e;
    if (m.fromResizer && !((_ = y.touch) != null && _.isResizingEvent)) {
      m.resizingOriginalEvent = { ...m.resizingEvent, _: { ...m.resizingEvent._ } }, y.touch.isResizingEvent = !0;
      const p = ((f = d.eventListeners) == null ? void 0 : f.event) || {};
      (c = p["resize-start"]) == null || c.call(p, { e, event: m.resizingEvent });
    }
    if (m.cellEl) {
      const { top: p, left: n, width: j, height: X } = m.cellEl.getBoundingClientRect();
      m.moveX = z - n, m.moveY = H - p, m.movePercentageX = m.moveX * 100 / j, m.movePercentageY = m.moveY * 100 / X;
    }
    if (m.documentMouseX = z, m.documentMouseY = H, m.fromResizer && m.resizingEvent) {
      const p = m.cellEl.__vueParentComponent.props.start, { newStart: n, newEnd: j } = i(m.resizingEvent, p);
      let X = !0;
      const { resize: U } = ((u = d.eventListeners) == null ? void 0 : u.event) || {};
      U && (X = await U({
        e,
        event: { ...m.resizingEvent, start: n, end: j },
        overlaps: m.resizingEvent.getOverlappingEvents({ start: n, end: j })
      })), X !== !1 ? (m.resizingEvent.start = n, m.resizingEvent.end = j, m.resizingLastAcceptedEvent && (m.resizingLastAcceptedEvent = null), e.preventDefault()) : U && (m.resizingLastAcceptedEvent = { ...m.resizingEvent, _: { ...m.resizingEvent._ } });
    }
  }, a = async (e) => {
    var z, H, Y, _;
    if ((z = y.touch) != null && z.isResizingEvent && m.resizingEvent) {
      const f = m.cellEl.__vueParentComponent.props.start, { newStart: c, newEnd: u } = i(m.resizingEvent, f);
      let p = !0;
      const j = (((H = d.eventListeners) == null ? void 0 : H.event) || {})["resize-end"];
      j && (p = await j({
        e,
        event: m.resizingEvent,
        original: m.resizingOriginalEvent,
        // Original event details before resizing.
        overlaps: m.resizingEvent.getOverlappingEvents({ start: c, end: u })
      })), m.resizingEvent.start = p === !1 ? (m.resizingLastAcceptedEvent || m.resizingOriginalEvent).start : ((Y = m.resizingLastAcceptedEvent) == null ? void 0 : Y.start) || c, m.resizingEvent.end = p === !1 ? (m.resizingLastAcceptedEvent || m.resizingOriginalEvent).end : ((_ = m.resizingLastAcceptedEvent) == null ? void 0 : _.end) || u, m.resizingEvent._.duration < 1 && (m.resizingEvent.start = m.resizingOriginalEvent.start, m.resizingEvent.end = m.resizingOriginalEvent.end), y.touch.isResizingEvent = !1, y.touch.currentHoveredCell = null;
    }
    document.removeEventListener(e.type === "touchend" ? "touchmove" : "mousemove", S, { passive: !m.fromResizer }), y.touch.isResizingEvent = !1, m.fromResizer = !1, m.resizingEvent = null, m.resizingOriginalEvent = null, m.resizingLastAcceptedEvent = null, m.startX = 0, m.startY = 0, m.moveX = 0, m.moveY = 0, m.startPercentageX = 0, m.startPercentageY = 0, m.movePercentageX = 0, m.movePercentageY = 0, m.documentMouseX = 0, m.documentMouseY = 0, m.cellEl = null, m.resizeStartDate = null, m.schedule = null;
  };
  return {
    events: h,
    resizeState: m,
    getEvent: v,
    getViewEvents: A,
    getCellOverlappingEvents: l,
    getEventsInRange: E,
    createEvent: Z,
    deleteEvent: L,
    isEventInRange: F,
    handleEventResize: (e, z, H) => {
      var _;
      const Y = ((_ = e.touches) == null ? void 0 : _[0]) || e;
      if (m.fromResizer = !!Y.target.closest(".vuecal__event-resizer"), m.fromResizer) {
        const f = H.getBoundingClientRect();
        m.startX = Y.clientX - f.left, m.startY = Y.clientY - f.top, m.startPercentageX = m.startX * 100 / f.width, m.startPercentageY = m.startY * 100 / f.height, m.cellEl = H.closest(".vuecal__cell"), m.resizeStartDate = z.start, m.resizingEvent = z, document.addEventListener(e.type === "touchstart" ? "touchmove" : "mousemove", S, { passive: !m.fromResizer }), document.addEventListener(e.type === "touchstart" ? "touchend" : "mouseup", a, { once: !0 });
      }
    }
  };
}, Ot = ({ config: y, dateUtils: t, emit: d, texts: r, eventsManager: h }, C) => {
  const { availableViews: W } = y, v = ue(y.view && W[y.view] ? y.view : y.defaultView), A = ue(y.selectedDate || null), Z = ue(/* @__PURE__ */ new Date()), L = ue(new Date(y.viewDate || Z.value));
  L.value.setHours(0, 0, 0, 0);
  const l = ue(new Date(L));
  let E = null;
  const F = b(() => v.value === "month" ? l.value : _.value), m = b(() => v.value === "month" ? new Date(l.value.getFullYear(), l.value.getMonth() + 1, 0, 23, 59, 59, 999) : c.value), i = b(() => v.value === "week" ? t.getPreviousFirstDayOfWeek(_.value, y.startWeekOnSunday) : v.value === "month" ? _.value : F.value), S = b(() => {
    if (v.value === "week") {
      const g = t.addDays(i.value, 7);
      return g.setMilliseconds(-1), g;
    }
    return v.value === "month" ? c.value : m.value;
  }), a = b(() => {
    const g = Z.value.getTime();
    if (v.value === "week")
      return i.value.getTime() <= g && g <= S.value.getTime();
    const R = _.value.getTime(), ee = c.value.getTime();
    return R <= g && g <= ee;
  });
  function I() {
    Z.value = /* @__PURE__ */ new Date(), E = setTimeout(I, 60 * 1e3);
  }
  function e() {
    E = setTimeout(I, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), I();
  }
  const z = b(() => {
    if (!y.availableViews[v.value]) return 1;
    let g = y.availableViews[v.value].cols;
    return y.hasHiddenDays && ["week", "month"].includes(v.value) && (g -= y.hasHiddenDays), g;
  }), H = b(() => {
    var g;
    return ((g = y.availableViews[v.value]) == null ? void 0 : g.rows) || 1;
  }), Y = b(() => z.value * H.value), _ = b(() => {
    if (v.value === "month") {
      let g = l.value.getDay() || 7;
      return y.startWeekOnSunday && !y.hideWeekdays[7] && (g += 1), y.viewDayOffset && (g -= y.viewDayOffset), t.subtractDays(l.value, g - 1);
    }
    if (v.value === "week") {
      const g = "1234567".split("").filter((ee) => !Object.keys(y.hideWeekdays).includes(ee));
      let R = Math.min(...g);
      return y.startWeekOnSunday && !y.hideWeekdays[7] && (R = 1), y.viewDayOffset && (R += y.viewDayOffset), t.addDays(l.value, R - 1);
    }
    return l.value;
  }), f = b(() => {
    const g = [], R = ["days", "week", "month"].includes(v.value);
    let ee = 0;
    for (let Q = 0; Q < Y.value + ee; Q++)
      switch (v.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const ye = t.addDays(_.value, Q), Ne = ye.getDay() || 7;
          if (R && y.hasHiddenDays && y.hideWeekdays[Ne]) {
            ee++;
            continue;
          }
          const ze = new Date(ye);
          ze.setHours(23, 59, 59, 999), g.push({ start: ye, startFormatted: t.formatDate(ye), end: ze });
          break;
        }
        case "year":
          g.push({
            start: new Date(_.value.getFullYear(), Q, 1, 0, 0, 0, 0),
            end: new Date(_.value.getFullYear(), Q + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          g.push({
            start: new Date(_.value.getFullYear() + Q, 0, 1, 0, 0, 0, 0),
            end: new Date(_.value.getFullYear() + Q + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return g;
  }), c = b(() => f.value[f.value.length - 1].end), u = ue("right"), p = b(() => {
    const g = Object.keys(y.availableViews);
    return g[g.indexOf(v.value) + 1];
  }), n = b(() => {
    const g = Object.keys(y.availableViews);
    return g[g.indexOf(v.value) - 1];
  });
  function j(g, R, ee = !1) {
    if (!R || !R[g]) return g + 1;
    const Q = R[g];
    return ee && typeof Q == "string" ? Q.substring(0, 3) : Q;
  }
  function X(g, R, ee) {
    const { monthsArray: Q, monthBeforeDay: ye, canTruncate: Ne, xs: ze } = ee, Me = g.getMonth(), Ee = g.getFullYear(), Ye = R.getMonth(), Pe = R.getFullYear(), Be = Me !== Ye, $t = Ee !== Pe, Te = Ne && (ze || Be), Le = g.getDate(), Ae = R.getDate();
    return $t ? ye ? `${j(Me, Q, Te)} ${Le}, ${Ee} - ${j(Ye, Q, Te)} ${Ae}, ${Pe}` : `${Le} ${j(Me, Q, Te)} ${Ee} - ${Ae} ${j(Ye, Q, Te)} ${Pe}` : Be ? ye ? `${j(Me, Q, Te)} ${Le} - ${j(Ye, Q, Te)} ${Ae}, ${Ee}` : `${Le} ${j(Me, Q, Te)} - ${Ae} ${j(Ye, Q, Te)} ${Ee}` : ye ? `${j(Me, Q, Te)} ${Le}-${Ae}, ${Ee}` : `${Le}-${Ae} ${j(Me, Q, Te)} ${Ee}`;
  }
  const U = b(() => {
    const { dateFormat: g, months: R, monthsGenitive: ee, week: Q, truncations: ye } = r, Ne = y.locale, ze = ye !== !1, Me = g.indexOf("M") < g.indexOf("D"), Ee = ee && Ne === "el" ? ee : R;
    switch (v.value) {
      case "day":
        return t.formatDate(_.value, g);
      case "days":
      case "week": {
        const Ye = {
          monthsArray: Ee,
          monthBeforeDay: Me,
          canTruncate: ze,
          xs: y.xs
        };
        let Pe = X(_.value, c.value, Ye);
        if (v.value === "week") {
          const Be = t.getWeek(
            _.value,
            y.startWeekOnSunday && !y.hideWeekdays[7]
          );
          Pe += ` <small>${Q} ${Be}</small>`;
        }
        return Pe;
      }
      case "month": {
        const Ye = `${y.xs && ze ? "MMM" : "MMMM"} YYYY`;
        return t.formatDate(F.value, Ye);
      }
      case "year":
        return _.value.getFullYear();
      case "years":
        return `${_.value.getFullYear()} - ${m.value.getFullYear()}`;
    }
  });
  async function K() {
    switch (l.value = new Date(L.value || Z.value), l.value.setHours(0, 0, 0, 0), v.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        l.value = t.getPreviousFirstDayOfWeek(l.value, y.startWeekOnSunday && !y.hideWeekdays[7]);
        break;
      case "month":
        l.value = new Date(l.value.getFullYear(), l.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        l.value = new Date(l.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        l.value = new Date(l.value.getFullYear() - l.value.getFullYear() % Y.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    Z.value = /* @__PURE__ */ new Date(), y.ready && (await Xe(), d("view-change", {
      id: v.value,
      title: U.value,
      start: F.value,
      end: m.value,
      extendedStart: i.value,
      extendedEnd: S.value,
      cellDates: f.value,
      containsToday: a.value,
      events: G.value
    }));
  }
  function te(g) {
    const R = v.value, ee = y.availableViews[R];
    g[R] && JSON.stringify(g[R]) === JSON.stringify(ee) || K();
  }
  function q(g, R = !0, ee = null) {
    const Q = Object.keys(y.availableViews);
    v.value === g && !ee || (Q.includes(g) ? (u.value = Q.indexOf(g) < Q.indexOf(v.value) ? "left" : "right", R && v.value !== g && d("update:view", g), v.value = g, ee ? J(ee) : K()) : console.warn(`Vue Cal: the \`${g}\` view is not available.`));
  }
  function re() {
    p.value ? q(p.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function ae() {
    n.value ? q(n.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function ve() {
    k(!1);
  }
  function s() {
    k(!0);
  }
  function k(g = !0) {
    let R = new Date(L.value);
    switch (v.value) {
      case "day":
      case "days":
        g ? R = t.addDays(c.value, 1) : R = t.subtractDays(_.value, Y.value);
        break;
      case "week": {
        g ? (R = t.addDays(S.value, 1), R.setHours(0, 0, 0, 0)) : R = t.subtractDays(i.value, Y.value);
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
        const ee = g ? Y.value : -Y.value;
        R = new Date(R.getFullYear() + ee, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    J(R);
  }
  function D() {
    const g = /* @__PURE__ */ new Date();
    g.setHours(0, 0, 0, 0), J(g);
  }
  function J(g, R = !0, ee = !1) {
    if (!t.isValid(g)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [Q, ye] = [_.value, c.value];
    v.value === "month" && ([Q, ye] = [F.value, m.value]), (!t.isInRange(g, Q, ye) || ee) && (g.setHours(0, 0, 0, 0), u.value = g.getTime() < Q.getTime() ? "left" : "right", L.value = g, R && d("update:viewDate", g), K());
  }
  function se(g, R = !0) {
    if (!t.isValid(g)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: ee, isSameDate: Q } = t;
    (!A.value || !ee(A.value) || !Q(g, A.value)) && (g.setHours(0, 0, 0, 0), A.value = g, R && d("update:selectedDate", g));
  }
  function me(g) {
    !g && !l.value.getDay() ? J(t.addDays(l.value, 1), !0, !0) : (u.value = "left", K());
  }
  function o(g) {
    g && y.startWeekOnSunday && !l.value.getDay() ? J(t.addDays(l.value, 1), !0, !0) : !g && y.startWeekOnSunday && l.value.getDay() === 1 && J(t.subtractDays(l.value, 1), !0, !0);
  }
  function T() {
    K();
  }
  function M(g) {
    var Q;
    const R = (Q = C.value) == null ? void 0 : Q.querySelector(".vuecal__scrollable"), ee = g ? g * y.timeCellHeight / y.timeStep : 0;
    R == null || R.scrollTo({ top: ee, behavior: "smooth" });
  }
  function w() {
    const g = /* @__PURE__ */ new Date();
    M(g.getHours() * 60 + g.getMinutes());
  }
  function B() {
    M(0);
  }
  const G = b(() => h.getViewEvents(f.value)), oe = h.createEvent, ge = h.deleteEvent;
  return De(() => y.view, (g) => q(g, !1)), De(() => y.availableViews, te), De(() => y.datePicker, () => q("month")), De(() => y.viewDate, (g) => J(g, !1)), De(() => y.selectedDate, (g) => se(g, !1)), De(() => y.startWeekOnSunday, (g) => me(g)), De(() => y.hideWeekends, (g) => o(g)), De(() => y.hideWeekdays, T), De(() => Y.value, () => {
    Y.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), De(() => y.watchRealTime, (g) => {
    g && y.time ? e() : E = clearTimeout(E);
  }), K(), y.time && y.watchRealTime && e(), Re(() => E = clearTimeout(E)), {
    now: Z,
    id: v,
    broaderView: p,
    narrowerView: n,
    title: U,
    viewDate: L,
    start: F,
    end: m,
    extendedStart: i,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: S,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: _,
    lastCellDate: c,
    containsToday: a,
    selectedDate: A,
    cellDates: f,
    cols: z,
    rows: H,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: G,
    transitionDirection: u,
    switch: (g, R) => q(g, !0, R),
    broader: re,
    narrower: ae,
    previous: ve,
    next: s,
    navigate: k,
    goToToday: D,
    updateViewDate: J,
    updateSelectedDate: se,
    scrollToCurrentTime: w,
    scrollToTime: M,
    scrollTop: B,
    createEvent: oe,
    deleteEvent: ge,
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
}, Symbol.toStringTag, { value: "Module" })), Fe = be({
  texts: { ...fe.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: lt(fe.texts, Qe)
  // Some Date utils functions need localized texts.
}), Ht = ({ props: y, emit: t, attrs: d, vuecalEl: r, uid: h }) => {
  const C = be({
    uid: h,
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
  return C.dateUtils = lt(Object.assign(fe.texts, C.texts), Qe), C.config = Ct(C, y, d), C.eventsManager = Vt(C), C.view = Ot(C, r), C.dnd = zt(C), C;
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
  // Temporarily disabled until fully implemented.
  // horizontal: { type: Boolean, default: false } // Show the calendar timeline horizontally.
  // TODO:
  // minEventWidth: { type: Number, default: 0 },
  // minScheduleWidth: { type: Number, default: 0 },
  // overlapsPerTimeStep: { type: Boolean, default: false },
}, At = { class: "vuecal__header" }, Ft = {
  key: 0,
  class: "vuecal__views-bar"
}, Rt = ["onClick", "innerHTML"], Nt = {
  key: 1,
  class: "vuecal__title-bar"
}, Bt = { class: "vuecal__transition-wrap" }, Wt = ["disabled", "innerHTML"], Xt = {
  __name: "header",
  setup(y) {
    const t = He("vuecal"), { view: d, config: r } = t, h = () => {
      r.clickToNavigate && d.broader();
    }, C = b(() => r.clickToNavigate ? { click: h } : {});
    return (W, v) => (V(), P("div", At, [
      O(W.$slots, "header", {
        view: $(d),
        availableViews: $(r).availableViews,
        vuecal: $(t)
      }),
      W.$slots.header ? x("", !0) : (V(), P(de, { key: 0 }, [
        $(r).viewsBar ? (V(), P("div", Ft, [
          (V(!0), P(de, null, we($(r).availableViews, (A, Z) => (V(), P("button", {
            class: pe(["vuecal__view-button", { "vuecal__view-button--active": $(d).id === Z }]),
            onClick: (L) => $(d).switch(Z),
            innerHTML: $(t).texts[Z],
            type: "button"
          }, null, 10, Rt))), 256))
        ])) : x("", !0),
        $(r).titleBar ? (V(), P("nav", Nt, [
          he("button", {
            class: pe(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !W.$slots["previous-button"] }]),
            onClick: v[0] || (v[0] = (...A) => $(d).previous && $(d).previous(...A)),
            type: "button"
          }, [
            O(W.$slots, "previous-button")
          ], 2),
          he("div", Bt, [
            Oe(Ue, {
              name: `vuecal-slide-fade--${$(d).transitionDirection}`
            }, {
              default: N(() => [
                (V(), P("div", {
                  key: $(d).id + $(d).start.getTime()
                }, [
                  W.$slots.title || W.$slots[`title.${$(d).id}`] ? (V(), Se(xe($(r).clickToNavigate && $(d).broaderView ? "button" : "div"), ie({
                    key: 0,
                    class: "vuecal__title"
                  }, Ie(C.value)), {
                    default: N(() => [
                      W.$slots[`title.${$(d).id}`] ? O(W.$slots, `title.${$(d).id}`, ne(ie({ key: 0 }, $(d)))) : O(W.$slots, "title", ne(ie({ key: 1 }, $(d))))
                    ]),
                    _: 3
                  }, 16)) : (V(), Se(xe($(r).clickToNavigate && $(d).broaderView ? "button" : "div"), ie({
                    key: 1,
                    class: "vuecal__title"
                  }, Ie(C.value), {
                    innerHTML: $(d).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          $(r).todayButton ? (V(), P(de, { key: 0 }, [
            W.$slots["today-button"] ? O(W.$slots, "today-button", {
              key: 0,
              navigate: () => !$(d).containsToday && $(d).goToToday(),
              active: $(d).containsToday
            }) : (V(), P("button", {
              key: 1,
              class: pe(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": $(d).containsToday }]),
              onClick: v[1] || (v[1] = (A) => !$(d).containsToday && $(d).goToToday()),
              disabled: !!$(d).containsToday,
              type: "button",
              innerHTML: $(t).texts.today
            }, null, 10, Wt))
          ], 64)) : x("", !0),
          he("button", {
            class: pe(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !W.$slots["next-button"] }]),
            onClick: v[2] || (v[2] = (...A) => $(d).next && $(d).next(...A)),
            type: "button"
          }, [
            O(W.$slots, "next-button")
          ], 2)
        ])) : x("", !0)
      ], 64))
    ]));
  }
}, It = ["draggable"], qt = { class: "vuecal__event-details" }, Gt = { class: "vuecal__event-title" }, Ut = {
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
    const d = y, { config: r, view: h, dnd: C, touch: W, dateUtils: v, eventsManager: A } = He("vuecal"), { handleEventResize: Z } = A, L = ue(null), l = be(d.event), E = be({
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
    }), F = b(() => r.editableEvents.drag && l.draggable !== !1 && !l.background && E.canTouchAndDrag !== !1), m = b(() => h.isMonth || h.isYear || h.isYears || d.inAllDayBar || l._.multiday && !a.value ? !1 : r.time && r.editableEvents.resize && l.resizable !== !1 && !l.background);
    b(() => r.editableEvents.delete && l.deletable !== !1 && !l.background);
    const i = b(() => {
      var c, u, p, n, j;
      const f = !!((c = l._) != null && c.multiday);
      return {
        [`vuecal__event--${l._.id}`]: !0,
        [l.class]: !!l.class,
        "vuecal__event--recurring": !!l.recurring,
        "vuecal__event--background": !!l.background,
        "vuecal__event--all-day": l.allDay || ((u = l._) == null ? void 0 : u.startMinutes) === 0 && ((p = l._) == null ? void 0 : p.duration) === 1440,
        "vuecal__event--multiday": f,
        "vuecal__event--cut-top": !d.inAllDayBar && (((n = l._) == null ? void 0 : n.startMinutes) < r.timeFrom || f && !S.value),
        "vuecal__event--cut-bottom": !d.inAllDayBar && (((j = l._) == null ? void 0 : j.endMinutes) > r.timeTo || f && !a.value),
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
    }), S = b(() => l._.multiday ? new Date(l.start).setHours(0, 0, 0, 0) === d.cellStart.getTime() : !0), a = b(() => l._.multiday ? v.isSameDate(new Date(new Date(l.end).setMilliseconds(-1)), d.cellEnd) : !0), I = b(() => {
      const f = new Date(l.start).setHours(0, 0, 0, 0), c = new Date(l.end).setHours(0, 0, 0, 0);
      return Math.ceil((c - f) / (1e3 * 60 * 60 * 24));
    }), e = b(() => {
      const f = (h.isDay || h.isDays || h.isWeek) && r.time && !d.inAllDayBar, c = r.horizontal;
      if (!f && !l.backgroundColor && !l.color) return !1;
      const u = {
        backgroundColor: l.backgroundColor || null,
        color: l.color || null
      };
      if (f) {
        let p = l._.startMinutes, n = l._.endMinutes;
        l._.multiday && (S.value || (p = 0), a.value || (n = 1440));
        const j = Math.max(r.timeFrom, p), X = Math.min(r.timeTo, n) + (l._.duration && !n ? 1440 : 0), U = Ve(j, r), K = Ve(X, r) - U;
        u[c ? "left" : "top"] = `${U}%`, u[c ? "width" : "height"] = `${K}%`;
      }
      return u;
    }), z = b(() => {
      const f = { ...r.eventListeners.event };
      for (const [p, n] of Object.entries(f))
        ["resize-end"].includes(p) || (f[p] = (j) => {
          j.type !== "drop" && n(j.type ? { e: j, event: l } : j);
        });
      const c = { ...f };
      f.touchstart = (p) => {
        var n;
        p.stopPropagation(), E.touchAndDragTimer = setTimeout(() => {
          E.canTouchAndDrag = !0;
        }, 500), _(p), (n = c.touchstart) == null || n.call(c, { e: p, event: l });
      }, f.mousedown = (p) => {
        var n;
        p.stopPropagation(), _(p), (n = c.mousedown) == null || n.call(c, { e: p, event: l });
      };
      let u = null;
      return f.click = (p) => {
        var n;
        (n = c.click) == null || n.call(c, { e: p, event: l }), u ? u = clearTimeout(u) : u = setTimeout(() => {
          var j;
          u = null, (j = c["delayed-click"]) == null || j.call(c, { e: p, event: l });
        }, 400);
      }, f.dblclick = (p) => {
        c.dblclick ? c.dblclick({ e: p, event: l }) : l.delete(1);
      }, f;
    });
    let H = null, Y = 0;
    const _ = (f) => {
      var n, j, X;
      const c = ((n = f.touches) == null ? void 0 : n[0]) || f;
      E.fromResizer = c.target.closest(".vuecal__event-resizer");
      const u = Date.now();
      (!H || u - Y > en) && (H = L.value.getBoundingClientRect(), Y = u);
      const p = H;
      E.startX = (((j = f.touches) == null ? void 0 : j[0]) || f).clientX - p.left, E.startY = (((X = f.touches) == null ? void 0 : X[0]) || f).clientY - p.top, E.startPercentageX = E.startX * 100 / p.width, E.startPercentageY = E.startY * 100 / p.height, E.cellEl = L.value.closest(".vuecal__cell"), E.resizeStartDate = l.start, E.fromResizer && Z(f, l, L.value), E.holdTimer = setTimeout(() => {
        var U, K;
        E.holding = !0, (K = (U = z.value).hold) == null || K.call(U, { e: f, event: l });
      }, 1e3);
    };
    return Ze(() => l._.register(L.value)), Re(() => {
      E.holdTimer && (E.holdTimer = clearTimeout(E.holdTimer)), E.touchAndDragTimer && (E.touchAndDragTimer = clearTimeout(E.touchAndDragTimer)), l._.unregister();
    }), (f, c) => (V(), P("div", ie({ class: "vuecal__event" }, Ie(z.value, !0), {
      ref_key: "eventEl",
      ref: L,
      class: i.value,
      style: e.value,
      draggable: F.value ? "true" : void 0,
      onDragstart: c[2] || (c[2] = (u) => F.value && $(C).eventDragStart(u, l)),
      onDragend: c[3] || (c[3] = (u) => F.value && $(C).eventDragEnd(u, l))
    }), [
      he("div", qt, [
        f.$slots["event.all-day"] ? O(f.$slots, "event.all-day", {
          key: 0,
          event: l
        }) : f.$slots[`event.${$(h).id}`] ? O(f.$slots, `event.${$(h).id}`, {
          key: 1,
          event: l
        }) : O(f.$slots, "event", {
          key: 2,
          event: l
        }, () => [
          he("div", Gt, ce(l.title), 1),
          $(r).time && !y.inAllDayBar && !(l._.multiday && !S.value) ? (V(), P("div", Ut, [
            $(h).isMonth ? (V(), P("span", Jt, ",")) : x("", !0),
            he("span", Zt, ce(l._[`startTimeFormatted${$(r).twelveHour ? 12 : 24}`]), 1),
            $(h).isMonth ? x("", !0) : (V(), P("span", Kt, [
              qe(" - " + ce(l._[`endTimeFormatted${$(r).twelveHour ? 12 : 24}`]), 1),
              l._.multiday && S.value ? (V(), P("span", Qt, "+" + ce(I.value) + "d", 1)) : x("", !0)
            ]))
          ])) : x("", !0),
          y.inAllDayBar ? x("", !0) : (V(), P("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: l.content
          }, null, 8, xt))
        ])
      ]),
      m.value ? (V(), P("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: c[0] || (c[0] = et(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : x("", !0),
      Oe(Ue, { name: "vuecal-delete-btn" }, {
        default: N(() => [
          l._.deleting ? (V(), P("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: c[1] || (c[1] = et((u) => l.delete(3), ["stop"]))
          }, "Delete")) : x("", !0)
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
    const t = y, d = He("vuecal"), { view: r, config: h, dateUtils: C, eventsManager: W, dnd: v, touch: A } = d, Z = b(() => C.isToday(t.start)), L = ue(null), l = ue([]), E = ue(!1), F = (o) => {
      l.value.push(o.detail), E.value = !0;
    }, m = () => setTimeout(() => E.value = !1, 300), i = be({
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
    }), S = ue(!1), a = ue({ cellOverlaps: {}, longestStreak: 0 }), I = b(() => {
      let o = Math.min(i.startPercentageY, i.movePercentageY), T = Math.max(i.startPercentageY, i.movePercentageY), M = je(o, h), w = je(T, h);
      return h.snapToInterval && (M = C.snapToInterval(M, h.snapToInterval), w = C.snapToInterval(w, h.snapToInterval), o = Ve(M, h), T = Ve(w, h)), {
        style: {
          top: `${o}%`,
          height: `${Math.abs(T - o)}%`
        },
        startMinutes: M,
        endMinutes: w,
        start: C.formatMinutes(M),
        end: C.formatMinutes(w),
        ...i.schedule ? { schedule: i.schedule } : {}
      };
    }), e = b(() => {
      const o = h.editableEvents.create && (i.dragging || S.value), T = h.eventCreateMinDrag && i.thresholdPassed || !h.eventCreateMinDrag, M = i.canTouchAndDrag !== !1;
      return o && T && M;
    }), z = b(() => {
      var oe;
      const o = /* @__PURE__ */ new Date(), T = r.start.getFullYear(), M = r.start.getMonth(), w = t.start.getFullYear(), B = t.start.getMonth();
      return {
        [`vuecal__cell--${Ge[t.start.getDay()]}`]: r.isDay || r.isDays || r.isWeek || r.isMonth,
        [`vuecal__cell--${Yt[B]}`]: r.isYear,
        [`vuecal__cell--${w}`]: r.isYears,
        "vuecal__cell--today": Z.value,
        "vuecal__cell--current-month": r.isYear && w === o.getFullYear() && B === o.getMonth(),
        "vuecal__cell--current-year": r.isYears && w === o.getFullYear(),
        "vuecal__cell--out-of-range": r.isMonth && (w !== T || B !== M),
        "vuecal__cell--before-min": U.value && j.value,
        "vuecal__cell--after-max": U.value && X.value,
        "vuecal__cell--disabled": U.value,
        "vuecal__cell--selected": r.selectedDate && r.selectedDate.getTime() >= t.start.getTime() && r.selectedDate.getTime() <= t.end.getTime(),
        "vuecal__cell--has-schedules": (oe = h.schedules) == null ? void 0 : oe.length,
        "vuecal__cell--dragging": i.dragging,
        "vuecal__cell--has-events": Y.value.length
      };
    });
    b(() => C.formatDate(t.start));
    const H = b(() => {
      switch (r.id) {
        case "day":
          return "";
        case "days":
          return h.availableViews.days.rows > 1 && C.formatDate(t.start, "D"), "";
        case "week":
          return "";
        case "month":
          return C.formatDate(t.start, "D");
        case "year":
          return C.formatDate(t.start, h.xs ? "MMM" : "MMMM");
        case "years":
          return C.formatDate(t.start, "YYYY");
      }
    }), Y = b(() => h.datePicker ? [] : W.getEventsInRange(
      t.start,
      t.end,
      { excludeIds: l.value, ...h.allDayEvents ? { allDay: t.allDay } : {} }
    )), _ = b(() => Y.value.filter((o) => !o.background)), f = b(() => {
      var o;
      return (o = h.schedules) == null ? void 0 : o.reduce((T, M) => (T[M.id] = Y.value.filter((w) => w.schedule === M.id), T), {});
    }), c = b(() => {
      if (r.isMonth || r.isYear || r.isYears || t.allDay) return {};
      const o = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", T = h.horizontal, M = {};
      for (const w of Y.value) {
        const B = w._.id, { maxConcurrent: G = 1, position: oe = 0 } = a.value.cellOverlaps[B] || {}, ge = o ? "right" : "left", g = T ? "height" : "width";
        M[B] = { [T ? "top" : ge]: `${100 / G * oe}%` }, h.stackEvents ? M[B][g] = `${100 / G + (oe === G - 1 ? 0 : 15)}%` : M[B][g] = `${100 / G}%`;
      }
      return M;
    }), u = b(() => {
      const o = {};
      for (const T of Y.value) {
        const M = T._.id, { maxConcurrent: w = 1, position: B = 0 } = a.value.cellOverlaps[M] || {};
        o[M] = `vuecal__event--stack-${B + 1}-${w}`;
      }
      return o;
    }), p = b(() => h.showCellEventCount && _.value.length), n = b(() => {
      var M;
      if (!h.specialHours || r.isMonth || r.isYear || r.isYears || t.allDay) return;
      const o = Ge[t.start.getDay()];
      let T = (M = h.specialHours) == null ? void 0 : M[o];
      if (T)
        return Array.isArray(T) || (T = [T]), T.map((w) => {
          let { from: B, to: G, class: oe, label: ge } = w;
          if (isNaN(B) || isNaN(G) || h.timeFrom >= G || h.timeTo <= B) return;
          B = Math.max(h.timeFrom, B), G = Math.min(h.timeTo, G);
          const g = Ve(B, h), R = Ve(G, h) - g;
          return {
            style: { top: `${g}%`, height: `${R}%` },
            label: ge,
            class: oe
          };
        }).filter((w) => !!w);
    }), j = b(() => h.minTimestamp !== null && h.minTimestamp > t.end.getTime()), X = b(() => h.maxTimestamp && h.maxTimestamp < t.start.getTime()), U = b(() => {
      const { disableDays: o } = h, T = r.isYear || r.isYears;
      return o.length && o.includes(C.formatDate(t.start)) && !T ? !0 : j.value || X.value;
    }), K = be({
      show: b(() => {
        if (!(!r.isDay && !r.isDays && !r.isWeek) && !(!Z.value || !h.time || t.allDay) && !(h.timeFrom > C.dateToMinutes(r.now)) && !(C.dateToMinutes(r.now) > h.timeTo))
          return !0;
      }),
      nowInMinutes: b(() => C.dateToMinutes(r.now)),
      todaysTimePosition: b(() => Ve(K.nowInMinutes, h)),
      style: b(() => `${h.horizontal ? "left" : "top"}: ${K.todaysTimePosition}%`),
      currentTime: b(() => C.formatTime(r.now, h.twelveHour ? "h:mm {am}" : "HH:mm"))
    }), te = b(() => {
      if (U.value) return {};
      const o = { ...h.eventListeners.cell };
      for (const [w, B] of Object.entries(o))
        o[w] = (G) => {
          var oe, ge, g;
          (g = (ge = G.target || ((oe = G.e) == null ? void 0 : oe.target)).closest) != null && g.call(ge, ".vuecal__event") || B(G.type ? { e: G, cell: q.value, cursor: ae.value } : G);
        };
      const T = { ...o };
      let M = null;
      return o.click = (w) => {
        var G;
        ve();
        const B = re(w);
        (G = T.click) == null || G.call(T, { e: w, cell: q.value, cursor: B }), M ? M = clearTimeout(M) : M = setTimeout(() => {
          var oe;
          M = null, (oe = T["delayed-click"]) == null || oe.call(T, { e: w, cell: q.value, cursor: B });
        }, 400);
      }, (h.time && r.isDay || r.isDays || r.isWeek) && (o.touchstart = (w) => {
        var B;
        s(w.e || w), (B = T.touchstart) == null || B.call(T, { e: w, cell: q.value, cursor: ae.value });
      }, o.mousedown = (w) => {
        var B;
        s(w.e || w), (B = T.mousedown) == null || B.call(T, { e: w, cell: q.value, cursor: ae.value });
      }), T.dblclick && (o.dblclick = (w) => {
        var B;
        (B = T.dblclick) == null || B.call(T, { e: w, cell: q.value, cursor: re(w) });
      }), h.editableEvents.drag && (o.dragenter = (w) => v.cellDragEnter(w, q.value), o.dragover = (w) => {
        w.preventDefault(), v.cellDragOver(w, q.value);
      }, o.dragleave = (w) => v.cellDragLeave(w, q.value), o.drop = (w) => v.cellDragDrop(w, q.value, t.allDay)), o;
    }), q = b(() => ({
      start: t.start,
      end: t.end,
      events: Y,
      ...i.schedule ? { schedule: i.schedule } : {},
      goNarrower: () => r.narrower(),
      goBroader: () => r.broader(),
      broader: r.broaderView,
      narrower: r.narrowerView
    })), re = (o) => {
      var G;
      const T = (((G = o.touches) == null ? void 0 : G[0]) || o).clientY, { top: M } = L.value.getBoundingClientRect(), w = Ke(T - M, L.value), B = new Date(t.start);
      return B.setMinutes(je(w, h)), { y: w, date: B };
    }, ae = b(() => {
      const o = je(i.movePercentageY || i.startPercentageY, h), T = new Date(t.start);
      return T.setMinutes(o), {
        x: i.movePercentageX || i.startPercentageX,
        y: i.movePercentageY || i.startPercentageY,
        date: T
      };
    }), ve = () => {
      r.updateSelectedDate(t.start), h.clickToNavigate && ((r.isMonth || r.isDays || r.isWeek) && h.availableViews.day ? r.switch("day") : r.isYear && h.availableViews.month ? r.switch("month") : r.isYears && h.availableViews.year && r.switch("year")), r.updateViewDate(t.start);
    }, s = (o) => {
      var w, B;
      const T = o.type === "touchstart";
      T ? (i.canTouchAndDrag = !1, i.touchAndDragTimer = setTimeout(() => {
        i.canTouchAndDrag = !0, (i.holding || i.dragging) && o.preventDefault();
      }, 500)) : i.canTouchAndDrag = !0, i.schedule = ~~o.target.dataset.schedule;
      const M = L.value.getBoundingClientRect();
      i.startX = (((w = o.touches) == null ? void 0 : w[0]) || o).clientX - M.left, i.startY = (((B = o.touches) == null ? void 0 : B[0]) || o).clientY - M.top, i.startPercentageX = i.startX * 100 / M.width, i.startPercentageY = i.startY * 100 / M.height, i.thresholdPassed = !1, document.addEventListener(T ? "touchmove" : "mousemove", k, { passive: !T }), document.addEventListener(T ? "touchend" : "mouseup", D, { once: !0 }), i.holdTimer = setTimeout(() => {
        var G, oe;
        i.holding = !0, (oe = (G = te.value).hold) == null || oe.call(G, { e: o, cell: q.value, cursor: ae.value });
      }, 1e3);
    }, k = (o) => {
      var w, B, G, oe, ge, g;
      const T = o.type === "touchmove";
      if (T && !i.canTouchAndDrag) {
        i.touchAndDragTimer && (clearTimeout(i.touchAndDragTimer), i.touchAndDragTimer = null), D(o);
        return;
      }
      T && o.preventDefault(), i.dragging || (A.isDraggingCell = !0, (B = (w = te.value)["drag-start"]) == null || B.call(w, { e: o, cell: q.value, cursor: ae.value })), i.dragging = !0, i.holdTimer = clearTimeout(i.holdTimer), i.holding = !1;
      const M = L.value.getBoundingClientRect();
      i.moveX = (((G = o.touches) == null ? void 0 : G[0]) || o).clientX - M.left, i.moveY = (((oe = o.touches) == null ? void 0 : oe[0]) || o).clientY - M.top, i.movePercentageX = i.moveX * 100 / M.width, i.movePercentageY = i.moveY * 100 / M.height, h.eventCreateMinDrag && Math.abs(i.startY - i.moveY) > h.eventCreateMinDrag && (i.thresholdPassed = !0), (g = (ge = te.value).drag) == null || g.call(ge, { e: o, cell: q.value, cursor: ae.value });
    }, D = async (o) => {
      var M, w;
      const T = o.type === "touchend";
      document.removeEventListener(T ? "touchmove" : "mousemove", k, { passive: !1 }), i.touchAndDragTimer && (clearTimeout(i.touchAndDragTimer), i.touchAndDragTimer = null), i.dragging && ((w = (M = te.value)["drag-end"]) == null || w.call(M, { e: o, cell: q.value, cursor: ae.value }), A.isDraggingCell = !1, h.editableEvents.create && i.canTouchAndDrag && (S.value = !0, await J(o), S.value = !1)), i.holdTimer = clearTimeout(i.holdTimer), i.holding = !1, i.dragging = !1, i.startX = 0, i.startY = 0, i.moveX = 0, i.moveY = 0, i.startPercentageX = 0, i.startPercentageY = 0, i.movePercentageX = 0, i.movePercentageY = 0, i.thresholdPassed = !1, i.schedule = null, i.canTouchAndDrag = null;
    }, J = async (o) => {
      var ge;
      if (!e.value) return;
      let { start: T, end: M, startMinutes: w, endMinutes: B } = I.value;
      T = new Date(t.start), T.setMinutes(w), M = new Date(t.start), M.setMinutes(B);
      let G = { ...I.value, start: T, end: M };
      const { create: oe } = h.eventListeners.event;
      if (typeof oe == "function") {
        const g = G;
        G = await new Promise((R) => oe({ e: o, event: G, cell: q.value, resolve: R, cursor: ae.value })), G && typeof G == "object" && r.createEvent(G), G && typeof G == "boolean" && r.createEvent(g);
      } else r.createEvent(G);
      (ge = navigator.vibrate) == null || ge.call(navigator, 200);
    }, se = () => {
      var o;
      for (const T of Object.keys(te.value))
        (o = L.value) == null || o.removeEventListener(T, te.value[T]);
    }, me = () => {
      a.value = W.getCellOverlappingEvents(t.start, t.end, t.allDay);
    };
    return De(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !r.isYears && !r.isYear && _.value.map((o) => `${o._.id}${o.start.getTime()}${o.end.getTime()}`).join(),
      async () => {
        await Xe(), me();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Re(async () => {
      for (const o of l.value) W.deleteEvent(o, 3);
      se(), await Xe();
    }), (o, T) => (V(), P("div", ie({
      class: ["vuecal__cell", z.value],
      ref_key: "cellEl",
      ref: L
    }, Ie(te.value, !0)), [
      o.$slots.cell ? O(o.$slots, "cell", {
        key: 0,
        cell: q.value
      }) : x("", !0),
      n.value ? (V(!0), P(de, { key: 1 }, we(n.value, (M, w) => (V(), P("div", {
        class: pe(["vuecal__special-hours", M.class]),
        style: $e(M.style),
        innerHTML: M.label || ""
      }, null, 14, tn))), 256)) : x("", !0),
      !o.$slots.cell && $(h).schedules ? (V(!0), P(de, { key: 2 }, we($(h).schedules, (M) => (V(), P("div", {
        class: pe(["vuecal__schedule vuecal__schedule--cell", M.class]),
        key: M.id,
        style: $e(M.style || null),
        "data-schedule": M.id
      }, [
        o.$slots["cell-events"] ? O(o.$slots, "cell-events", {
          key: 0,
          cell: q.value
        }) : x("", !0),
        H.value || o.$slots["cell-date"] ? (V(), P("div", an, [
          O(o.$slots, "cell-date", { cell: q.value }, () => [
            qe(ce(H.value), 1)
          ])
        ])) : x("", !0),
        o.$slots["cell-content"] ? (V(), P("div", sn, [
          O(o.$slots, "cell-content", { cell: q.value })
        ])) : x("", !0),
        o.$slots["cell-events"] && Y.value.length ? (V(), P("div", ln, [
          O(o.$slots, "cell-events", { cell: q.value })
        ])) : Y.value.length || E.value ? (V(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: T[0] || (T[0] = (w) => E.value = !0),
          onAfterLeave: m,
          tag: "div"
        }, {
          default: N(() => [
            (V(!0), P(de, null, we(f.value[M.id], (w) => (V(), Se(st, {
              key: w._.id,
              event: w,
              onEventDeleted: F,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              style: $e(c.value[w._.id])
            }, Ce({ _: 2 }, [
              o.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: N((B) => [
                  O(o.$slots, "event.all-day", ie({ ref_for: !0 }, B))
                ]),
                key: "0"
              } : void 0,
              o.$slots[`event.${$(r).id}`] ? {
                name: `event.${$(r).id}`,
                fn: N((B) => [
                  O(o.$slots, `event.${$(r).id}`, ie({ ref_for: !0 }, B))
                ]),
                key: "1"
              } : void 0,
              o.$slots.event ? {
                name: "event",
                fn: N((B) => [
                  O(o.$slots, "event", ie({ ref_for: !0 }, B))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "style"]))), 128))
          ]),
          _: 2
        }, 1024)) : x("", !0),
        e.value && i.schedule === M.id && !t.allDay ? (V(), P("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: $e(I.value.style)
        }, ce(I.value.start) + " - " + ce(I.value.end), 5)) : x("", !0)
      ], 14, nn))), 128)) : x("", !0),
      !o.$slots.cell && !$(h).schedules ? (V(), P(de, { key: 3 }, [
        o.$slots["cell-events"] ? O(o.$slots, "cell-events", {
          key: 0,
          cell: q.value
        }) : x("", !0),
        H.value || o.$slots["cell-date"] ? (V(), P("div", rn, [
          O(o.$slots, "cell-date", { cell: q.value }, () => [
            qe(ce(H.value), 1)
          ])
        ])) : x("", !0),
        o.$slots["cell-content"] ? (V(), P("div", on, [
          O(o.$slots, "cell-content", { cell: q.value })
        ])) : x("", !0),
        o.$slots["cell-events"] && Y.value.length ? (V(), P("div", un, [
          O(o.$slots, "cell-events", { cell: q.value })
        ])) : !($(r).isMonth && !$(h).eventsOnMonthView) && !$(r).isYear && !$(r).isYears && (Y.value.length || E.value) ? (V(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: T[1] || (T[1] = (M) => E.value = !0),
          onAfterLeave: m,
          tag: "div"
        }, {
          default: N(() => [
            (V(!0), P(de, null, we(Y.value, (M) => (V(), Se(st, {
              key: M._.id,
              event: M,
              onEventDeleted: F,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              class: pe(u.value[M._.id]),
              style: $e(c.value[M._.id])
            }, Ce({ _: 2 }, [
              o.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: N((w) => [
                  O(o.$slots, "event.all-day", ie({ ref_for: !0 }, w))
                ]),
                key: "0"
              } : void 0,
              o.$slots[`event.${$(r).id}`] ? {
                name: `event.${$(r).id}`,
                fn: N((w) => [
                  O(o.$slots, `event.${$(r).id}`, ie({ ref_for: !0 }, w))
                ]),
                key: "1"
              } : void 0,
              o.$slots.event ? {
                name: "event",
                fn: N((w) => [
                  O(o.$slots, "event", ie({ ref_for: !0 }, w))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "class", "style"]))), 128))
          ]),
          _: 3
        })) : x("", !0),
        e.value ? (V(), P("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: $e(I.value.style)
        }, ce(I.value.start) + " - " + ce(I.value.end), 5)) : x("", !0)
      ], 64)) : x("", !0),
      o.$slots["event-count"] ? O(o.$slots, "event-count", {
        key: 4,
        events: _.value
      }) : p.value ? (V(), P("div", cn, ce(_.value.length), 1)) : x("", !0),
      K.show ? (V(), P("div", {
        key: 6,
        class: "vuecal__now-line",
        style: $e(K.style),
        title: K.currentTime
      }, [
        O(o.$slots, "now-line", {
          now: $(r).now,
          timeFormatted: K.currentTime
        }, () => [
          he("span", null, ce(K.currentTime), 1)
        ])
      ], 12, dn)) : x("", !0)
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
  class: "vuecal__schedules-headings w-flex grow"
}, Dn = ["innerHTML"], pn = {
  key: 2,
  class: "vuecal__all-day w-flex grow"
}, wn = {
  __name: "headings-bar",
  setup(y) {
    const t = He("vuecal"), d = He("$vuecalEl"), { view: r, config: h, dateUtils: C } = t, W = b(() => h.xs ? "day-xs" : h.sm || r.isDays || r.isMonth ? "day-sm" : "day"), v = b(() => (r.isDay || r.isDays || r.isWeek || r.isMonth) && !(r.isDay && !h.schedules && !h.allDayEvents)), A = b(() => r.cellDates.slice(0, h.horizontal ? r.rows : r.cols).map(({ start: l }) => ({
      id: Ge[l.getDay()],
      date: l,
      dateNumber: l.getDate(),
      day: C.formatDate(l, "dddd"),
      "day-sm": C.formatDate(l, "ddd"),
      "day-xs": C.formatDate(l, "dd"),
      isToday: C.isToday(l)
    }))), Z = {
      click: (l) => {
        (r.isDays || r.isWeek) && r.updateSelectedDate(l);
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
      startResize(l, E) {
        var i;
        this.isResizing.value = !0;
        const F = h.horizontal;
        this[F ? "startX" : "startY"].value = F ? l : E;
        const m = (i = d.value) == null ? void 0 : i.querySelector(".vuecal__all-day");
        m && (this[F ? "initialWidth" : "initialHeight"].value = m[F ? "offsetWidth" : "offsetHeight"]), document.addEventListener("mousemove", L.handleMouseMove), document.addEventListener("mouseup", L.cleanup), document.addEventListener("touchmove", L.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", L.cleanup);
      },
      // Update height/width based on mouse/touch movement.
      updateSize(l, E) {
        var S;
        if (!this.isResizing.value) return;
        const F = h.horizontal, m = F ? l - this.startX.value : E - this.startY.value, i = Math.max(20, this[F ? "initialWidth" : "initialHeight"].value + m);
        (S = d.value) == null || S.style.setProperty("--vuecal-all-day-bar-height", `${i}px`);
      },
      // Mouse event handlers.
      handleMouseDown(l) {
        this.startResize(l.clientX, l.clientY);
      },
      handleMouseMove(l) {
        L.updateSize(l.clientX, l.clientY);
      },
      // Touch event handlers.
      handleTouchStart(l) {
        var E;
        (E = l.touches) != null && E[0] && this.startResize(l.touches[0].clientX, l.touches[0].clientY);
      },
      handleTouchMove(l) {
        var E;
        (E = l.touches) != null && E[0] && (L.updateSize(l.touches[0].clientX, l.touches[0].clientY), l.preventDefault());
      }
    };
    return Re(() => {
      L.cleanup();
    }), (l, E) => v.value ? (V(), P("div", vn, [
      $(r).isDay ? x("", !0) : (V(), P("div", fn, [
        (V(!0), P(de, null, we(A.value, (F, m) => (V(), P("div", {
          class: pe(["vuecal__weekday", { "vuecal__weekday--today": F.isToday }]),
          key: m,
          onClick: (i) => Z.click(F.date)
        }, [
          O(l.$slots, "weekday-heading", {
            label: F[W.value],
            id: F.id,
            date: F.date
          }, () => [
            he("span", gn, ce(F[W.value]), 1),
            $(r).isMonth ? x("", !0) : (V(), P("strong", hn, ce(F.dateNumber), 1))
          ])
        ], 10, mn))), 128))
      ])),
      $(h).schedules ? (V(), P("div", yn, [
        (V(!0), P(de, null, we(A.value, (F, m) => (V(), P(de, { key: m }, [
          (V(!0), P(de, null, we($(h).schedules, (i, S) => (V(), P(de, { key: S }, [
            l.$slots["schedule-heading"] ? (V(), P("div", {
              key: 0,
              class: pe(["vuecal__schedule vuecal__schedule--heading", i.class])
            }, [
              O(l.$slots, "schedule-heading", {
                schedule: i,
                view: $(r)
              })
            ], 2)) : (V(), P("div", {
              key: 1,
              class: pe(["vuecal__schedule vuecal__schedule--heading", i.class]),
              innerHTML: i.label
            }, null, 10, Dn))
          ], 64))), 128))
        ], 64))), 128))
      ])) : x("", !0),
      $(h).allDayEvents ? (V(), P("div", pn, [
        (V(!0), P(de, null, we(A.value, (F, m) => (V(), Se(kt, {
          class: pe(["vuecal__all-day-cell", { "vuecal__weekday--today": F.isToday }]),
          key: m,
          start: F.date,
          end: new Date(F.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: m,
          "all-day": ""
        }, Ce({ _: 2 }, [
          l.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: N((i) => [
              O(l.$slots, "event.all-day", ie({ ref_for: !0 }, i))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: N((i) => [
              O(l.$slots, "event", ie({ ref_for: !0 }, i))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        he("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: E[0] || (E[0] = (...F) => L.handleMouseDown && L.handleMouseDown(...F)),
          onTouchstart: E[1] || (E[1] = (...F) => L.handleTouchStart && L.handleTouchStart(...F))
        }, null, 32)
      ])) : x("", !0)
    ])) : x("", !0);
  }
}, _n = { class: "vuecal__time-column" }, kn = {
  key: 0,
  class: "vuecal__all-day-label"
}, $n = {
  __name: "time-column",
  setup(y) {
    const t = He("vuecal"), { config: d, texts: r } = t, h = b(() => {
      const C = [];
      for (let v = d.timeFrom; v < d.timeTo; v += d.timeStep) {
        const A = v + d.timeStep > d.timeTo, Z = ~~(v / 60), L = v % 60, l = r[v < 720 ? "am" : "pm"];
        let E = null;
        A && (E = `calc(var(--vuecal-time-cell-height) * ${(d.timeTo - v) / d.timeStep})`), C.push({
          minutesSum: v,
          // The sum of hours + minutes in minutes.
          hours: Z,
          minutes: L,
          formatted12: `${Z % 12 ? Z % 12 : 12}${L ? `:${L.toString().padStart(2, 0)}` : ""}${l}`,
          formatted24: `${Z.toString().padStart(2, 0)}:${L.toString().padStart(2, 0)}`,
          height: E
        });
      }
      return C;
    });
    return (C, W) => (V(), P("div", _n, [
      $(d).allDayEvents ? (V(), P("div", kn, [
        O(C.$slots, "all-day-label", {}, () => [
          qe(ce($(t).texts.allDay), 1)
        ])
      ])) : x("", !0),
      (V(!0), P(de, null, we(h.value, (v, A) => (V(), P("div", {
        class: "vuecal__time-cell",
        key: A,
        style: $e({ height: v.height || null })
      }, [
        O(C.$slots, "time-cell", {
          index: A,
          minutes: v.minutes,
          hours: v.hours,
          minutesSum: v.minutesSum,
          format12: v.formatted12,
          format24: v.formatted24
        }, () => [
          he("label", null, ce($(d).twelveHour ? v.formatted12 : v.formatted24), 1)
        ])
      ], 4))), 128))
    ]));
  }
}, bn = {
  __name: "body",
  setup(y) {
    const t = He("vuecal"), { view: d, config: r, dateUtils: h, touch: C, eventsManager: W } = t, v = ue(null), A = ue(null), { resizeState: Z } = W, L = b(() => ({
      "--vuecal-grid-columns": d.cols,
      "--vuecal-grid-rows": d.rows,
      "--vuecal-body-max-height": r.time ? `${r.timeCellHeight * (r.timeTo - r.timeFrom) / r.timeStep}px` : null
    })), l = b(() => {
      const i = h.formatTime(je(A.value, r));
      return {
        style: { top: `${A.value}%` },
        time: i
      };
    }), E = (i) => {
      var z;
      if (d.isMonth || d.isYear || d.isYears) return;
      const S = ((z = i.touches) == null ? void 0 : z[0]) || i, { clientX: a, clientY: I } = S, { top: e } = v.value.getBoundingClientRect();
      A.value = Ke(I - e, v.value), C.isResizingEvent && r.editableEvents.resizeX && (Z.cellEl = m(a, I));
    }, F = () => {
      A.value = null;
    }, m = (i, S) => {
      const a = document.elementFromPoint(i, S);
      return console.log(a == null ? void 0 : a.closest(".vuecal__cell")), (a == null ? void 0 : a.closest(".vuecal__cell")) || null;
    };
    return Ze(() => {
      v.value.addEventListener("mousemove", E), v.value.addEventListener("touchmove", E), v.value.addEventListener("mouseleave", F), v.value.addEventListener("touchend", F);
    }), Re(() => {
      v.value && (v.value.removeEventListener("mousemove", E), v.value.removeEventListener("touchmove", E), v.value.removeEventListener("mouseleave", F), v.value.removeEventListener("touchend", F));
    }), (i, S) => (V(), P("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: v,
      style: $e(L.value)
    }, [
      Oe(Ue, { name: "vuecal-shrink" }, {
        default: N(() => [
          $(r).timeAtCursor && A.value !== null ? (V(), P("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: $e(l.value.style)
          }, [
            he("label", null, ce(l.value.time), 1)
          ], 4)) : x("", !0)
        ]),
        _: 1
      }),
      (V(!0), P(de, null, we($(d).cellDates, (a, I) => (V(), Se(kt, {
        key: I,
        start: a.start,
        end: a.end,
        index: I
      }, Ce({ _: 2 }, [
        i.$slots.cell ? {
          name: "cell",
          fn: N((e) => [
            O(i.$slots, "cell", ie({ ref_for: !0 }, e))
          ]),
          key: "0"
        } : void 0,
        i.$slots["cell-date"] ? {
          name: "cell-date",
          fn: N((e) => [
            O(i.$slots, "cell-date", ie({ ref_for: !0 }, e))
          ]),
          key: "1"
        } : void 0,
        i.$slots["cell-content"] ? {
          name: "cell-content",
          fn: N((e) => [
            O(i.$slots, "cell-content", ie({ ref_for: !0 }, e))
          ]),
          key: "2"
        } : void 0,
        i.$slots["cell-events"] ? {
          name: "cell-events",
          fn: N((e) => [
            O(i.$slots, "cell-events", ie({ ref_for: !0 }, e))
          ]),
          key: "3"
        } : void 0,
        i.$slots[`event.${$(d).id}`] ? {
          name: `event.${$(d).id}`,
          fn: N((e) => [
            O(i.$slots, `event.${$(d).id}`, ie({ ref_for: !0 }, e))
          ]),
          key: "4"
        } : void 0,
        i.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: N((e) => [
            O(i.$slots, "event.all-day", ie({ ref_for: !0 }, e))
          ]),
          key: "5"
        } : void 0,
        i.$slots.event ? {
          name: "event",
          fn: N((e) => [
            O(i.$slots, "event", ie({ ref_for: !0 }, e))
          ]),
          key: "6"
        } : void 0,
        i.$slots["event-count"] ? {
          name: "event-count",
          fn: N((e) => [
            O(i.$slots, "event-count", ie({ ref_for: !0 }, e))
          ]),
          key: "7"
        } : void 0,
        i.$slots["now-line"] ? {
          name: "now-line",
          fn: N((e) => [
            O(i.$slots, "now-line", ie({ ref_for: !0 }, e))
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
  setup(y, { expose: t, emit: d }) {
    const r = y, h = d, C = Tt("vuecal-el"), W = Ht({ props: r, emit: h, attrs: Et(), vuecalEl: C, uid: Mt() }), { config: v, view: A, dateUtils: Z, touch: L } = W, l = b(() => v.time && (A.isDay || A.isDays || A.isWeek)), E = b(() => Array(A.rows).fill().map((a, I) => Z.getWeek(Z.addDays(A.firstCellDate, 7 * I)))), F = b(() => {
      var a;
      return {
        "vuecal--ready": v.ready,
        [`vuecal--${v.theme}-theme`]: v.theme,
        [`vuecal--${v.size}`]: !0,
        "vuecal--date-picker": v.datePicker,
        "vuecal--dark": v.dark,
        "vuecal--light": !v.dark,
        [`vuecal--${A.id}-view`]: !0,
        "vuecal--view-has-time": l.value,
        "vuecal--timeless": !v.time,
        "vuecal--dragging-cell": L.isDraggingCell,
        "vuecal--dragging-event": L.isDraggingEvent,
        "vuecal--resizing-event": L.isResizingEvent,
        "vuecal--has-schedules": (a = v.schedules) == null ? void 0 : a.length,
        "vuecal--horizontal": v.horizontal
      };
    }), m = b(() => ({
      "--vuecal-time-cell-height": v.timeCellHeight && `${v.timeCellHeight}px`
    })), i = b(() => {
      var a, I;
      return {
        "vuecal__scrollable--row": l.value || v.weekNumbers && A.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${A.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (a = v.schedules) == null ? void 0 : a.length,
        "vuecal__scrollable--no-schedules": !((I = v.schedules) != null && I.length),
        "vuecal__scrollable--no-all-day-bar": !v.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": v.allDayEvents
      };
    }), S = (a) => {
      a.target.closest(".vuecal__cell") && a.preventDefault();
    };
    return Ze(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && C.value.addEventListener("contextmenu", S), await Xe(), v.ready = !0, h("ready", { config: v, view: A });
    }), Re(() => {
      var a;
      (a = C == null ? void 0 : C.value) == null || a.removeEventListener("contextmenu", S);
    }), nt("vuecal", W), nt("$vuecalEl", C), t({ view: W.view }), (a, I) => (V(), P("div", {
      class: pe(["vuecal", F.value]),
      ref: "vuecal-el",
      "data-locale": a.locale,
      style: $e(m.value)
    }, [
      a.$slots.diy ? O(a.$slots, "diy", {
        key: 0,
        vuecal: $(W)
      }) : (V(), P(de, { key: 1 }, [
        Oe(Xt, null, Ce({ _: 2 }, [
          a.$slots.header ? {
            name: "header",
            fn: N((e) => [
              O(a.$slots, "header", ne(le(e)))
            ]),
            key: "0"
          } : void 0,
          !a.$slots.header && a.$slots["previous-button"] ? {
            name: "previous-button",
            fn: N((e) => [
              O(a.$slots, "previous-button", ne(le(e)))
            ]),
            key: "1"
          } : void 0,
          !a.$slots.header && a.$slots["next-button"] ? {
            name: "next-button",
            fn: N((e) => [
              O(a.$slots, "next-button", ne(le(e)))
            ]),
            key: "2"
          } : void 0,
          !a.$slots.header && a.$slots["today-button"] ? {
            name: "today-button",
            fn: N((e) => [
              O(a.$slots, "today-button", ne(le(e)))
            ]),
            key: "3"
          } : void 0,
          !a.$slots.header && a.$slots.title ? {
            name: "title",
            fn: N((e) => [
              O(a.$slots, "title", ne(le(e)))
            ]),
            key: "4"
          } : void 0,
          !a.$slots.header && a.$slots["title.day"] ? {
            name: "title.day",
            fn: N((e) => [
              O(a.$slots, "title.day", ne(le(e)))
            ]),
            key: "5"
          } : void 0,
          !a.$slots.header && a.$slots["title.days"] ? {
            name: "title.days",
            fn: N((e) => [
              O(a.$slots, "title.days", ne(le(e)))
            ]),
            key: "6"
          } : void 0,
          !a.$slots.header && a.$slots["title.week"] ? {
            name: "title.week",
            fn: N((e) => [
              O(a.$slots, "title.week", ne(le(e)))
            ]),
            key: "7"
          } : void 0,
          !a.$slots.header && a.$slots["title.month"] ? {
            name: "title.month",
            fn: N((e) => [
              O(a.$slots, "title.month", ne(le(e)))
            ]),
            key: "8"
          } : void 0,
          !a.$slots.header && a.$slots["title.year"] ? {
            name: "title.year",
            fn: N((e) => [
              O(a.$slots, "title.year", ne(le(e)))
            ]),
            key: "9"
          } : void 0,
          !a.$slots.header && a.$slots["title.years"] ? {
            name: "title.years",
            fn: N((e) => [
              O(a.$slots, "title.years", ne(le(e)))
            ]),
            key: "10"
          } : void 0,
          !a.$slots.header && a.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: N((e) => [
              O(a.$slots, "schedule-heading", ne(le(e)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        he("div", Mn, [
          Oe(Ue, {
            name: `vuecal-slide-fade--${$(A).transitionDirection}`
          }, {
            default: N(() => [
              (V(), P("div", {
                class: pe(["vuecal__scrollable", i.value]),
                key: $(A).id + $(A).start.getTime()
              }, [
                l.value ? (V(), Se($n, { key: 0 }, Ce({ _: 2 }, [
                  a.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: N((e) => [
                      O(a.$slots, "time-cell", ne(le(e)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : x("", !0),
                $(v).weekNumbers && $(A).isMonth ? (V(), P("div", En, [
                  (V(!0), P(de, null, we(E.value, (e) => (V(), P("div", Yn, [
                    O(a.$slots, "week-number", {}, () => [
                      he("small", null, ce(e), 1)
                    ])
                  ]))), 256))
                ])) : x("", !0),
                he("div", Sn, [
                  Oe(wn, null, Ce({ _: 2 }, [
                    a.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: N((e) => [
                        O(a.$slots, "weekday-heading", ne(le(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    a.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: N((e) => [
                        O(a.$slots, "schedule-heading", ne(le(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    a.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: N((e) => [
                        O(a.$slots, "event.all-day", ne(le(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    a.$slots.event ? {
                      name: "event",
                      fn: N((e) => [
                        O(a.$slots, "event", ne(le(e)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  Oe(bn, null, Ce({ _: 2 }, [
                    a.$slots.cell ? {
                      name: "cell",
                      fn: N((e) => [
                        O(a.$slots, "cell", ne(le(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: N((e) => [
                        O(a.$slots, "cell-date", ne(le(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: N((e) => [
                        O(a.$slots, "cell-content", ne(le(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    !a.$slots.cell && a.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: N((e) => [
                        O(a.$slots, "cell-events", ne(le(e)))
                      ]),
                      key: "3"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: N((e) => [
                        O(a.$slots, "event.all-day", ne(le(e)))
                      ]),
                      key: "4"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots[`event.${$(A).id}`] ? {
                      name: `event.${$(A).id}`,
                      fn: N((e) => [
                        O(a.$slots, `event.${$(A).id}`, ne(le(e)))
                      ]),
                      key: "5"
                    } : void 0,
                    !a.$slots.cell && !a.$slots["cell-events"] && a.$slots.event ? {
                      name: "event",
                      fn: N((e) => [
                        O(a.$slots, "event", ne(le(e)))
                      ]),
                      key: "6"
                    } : void 0,
                    !a.$slots.cell && a.$slots["event-count"] ? {
                      name: "event-count",
                      fn: N((e) => [
                        O(a.$slots, "event-count", ne(le(e)))
                      ]),
                      key: "7"
                    } : void 0,
                    a.$slots["now-line"] ? {
                      name: "now-line",
                      fn: N((e) => [
                        O(a.$slots, "now-line", ne(le(e)))
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
  Fe.texts = { ...fe.texts, ...y }, Fe.dateUtils.updateTexts(Fe.texts);
}, {
  addDatePrototypes: On,
  removeDatePrototypes: jn,
  updateTexts: Hn,
  addDays: Pn,
  subtractDays: Ln,
  addHours: An,
  subtractHours: Fn,
  addMinutes: Rn,
  subtractMinutes: Nn,
  getWeek: Bn,
  isToday: Wn,
  isSameDate: Xn,
  isInRange: In,
  isLeapYear: qn,
  getPreviousFirstDayOfWeek: Gn,
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
  Pn as addDays,
  An as addHours,
  Rn as addMinutes,
  Zn as countDays,
  Jn as dateToMinutes,
  Kn as datesInSameTimeStep,
  xn as formatDate,
  ea as formatDateLite,
  aa as formatMinutes,
  ta as formatTime,
  na as formatTimeLite,
  Gn as getPreviousFirstDayOfWeek,
  Bn as getWeek,
  In as isInRange,
  qn as isLeapYear,
  Xn as isSameDate,
  Wn as isToday,
  Qn as isValidDate,
  jn as removeDatePrototypes,
  Un as stringToDate,
  Ln as subtractDays,
  Fn as subtractHours,
  Nn as subtractMinutes,
  Hn as updateTexts,
  Vn as useLocale
};
