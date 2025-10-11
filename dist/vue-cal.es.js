import { computed as b, reactive as be, watch as De, toRefs as bt, ref as ue, onBeforeUnmount as Re, nextTick as Xe, inject as He, createElementBlock as P, openBlock as V, renderSlot as j, createCommentVNode as x, unref as $, Fragment as de, renderList as we, normalizeClass as pe, createElementVNode as he, createVNode as Oe, Transition as Ue, withCtx as B, createBlock as Se, resolveDynamicComponent as xe, mergeProps as ie, toHandlers as Ie, normalizeProps as se, onMounted as Ze, toDisplayString as ce, createTextVNode as qe, withModifiers as et, normalizeStyle as $e, TransitionGroup as tt, createSlots as Ce, useTemplateRef as Tt, useId as Mt, useAttrs as Et, provide as at, guardReactiveProps as re } from "vue";
/**
  * vue-cal v5.0.1-rc.31
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
    for (const [p, a] of Object.entries(d)) {
      const [O, X, U] = p.match(/^on(Cell|Event)(.+)$/) || [];
      O && (c[X.toLowerCase()][u(U).replace(/^-+|-+$/g, "")] = a);
    }
    return c;
  }), L = b(() => {
    var u;
    const c = {};
    return t.hideWeekends && (c[6] = !0) && (c[7] = !0), (u = t.hideWeekdays) != null && u.length && t.hideWeekdays.forEach((p) => c[St[p]] = !0), c;
  }), l = b(() => t.hideWeekends || L.value[6] && L.value[7]), E = b(() => {
    const c = t.datePicker;
    let u = 0, p = {};
    const a = t.views;
    return c && !a ? {
      month: { ...fe.availableViews.month },
      year: { ...fe.availableViews.year },
      years: { ...fe.availableViews.years }
    } : t.horizontal && !a ? {
      days: { cols: fe.availableViews.days.rows, rows: fe.availableViews.days.cols },
      week: { cols: fe.availableViews.week.rows, rows: fe.availableViews.week.cols }
    } : (a ? (Array.isArray(a) ? p = a.reduce((O, X) => (typeof X == "string" && fe.availableViews[X] ? O[X] = fe.availableViews[X] : u++, O), {}) : typeof a == "object" && (p = Object.entries(a).reduce((O, [X, U]) => {
      const { cols: Q, rows: te } = fe.availableViews[X];
      return O[X] = { cols: U.cols || Q, rows: U.rows || te }, O;
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
  }), n = b(() => {
    let c = null;
    return t.maxDate && typeof t.maxDate == "string" ? c = r.stringToDate(t.maxDate) : t.maxDate && t.maxDate instanceof Date && (c = t.maxDate), (c == null ? void 0 : c.getTime()) || null;
  }), I = b(() => {
    var p;
    const { view: c } = y;
    return t.schedules.length && (c.isDay || c.isDays || c.isWeek) && ((p = t.schedules) == null ? void 0 : p.map((a, O) => ({ ...a, id: a.id ?? O + 1 }))) || void 0;
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
    let u = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((a) => a.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((a) => a.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((a) => a.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((a) => a.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((a) => a.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((a) => a.default), "../i18n/da.json": () => import("./i18n/da.js").then((a) => a.default), "../i18n/de.json": () => import("./i18n/de.js").then((a) => a.default), "../i18n/el.json": () => import("./i18n/el.js").then((a) => a.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((a) => a.default), "../i18n/en-us.json": () => Promise.resolve().then(() => jt).then((a) => a.default), "../i18n/es.json": () => import("./i18n/es.js").then((a) => a.default), "../i18n/et.json": () => import("./i18n/et.js").then((a) => a.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((a) => a.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((a) => a.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((a) => a.default), "../i18n/he.json": () => import("./i18n/he.js").then((a) => a.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((a) => a.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((a) => a.default), "../i18n/id.json": () => import("./i18n/id.js").then((a) => a.default), "../i18n/is.json": () => import("./i18n/is.js").then((a) => a.default), "../i18n/it.json": () => import("./i18n/it.js").then((a) => a.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((a) => a.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((a) => a.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((a) => a.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((a) => a.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((a) => a.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((a) => a.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((a) => a.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((a) => a.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((a) => a.default), "../i18n/no.json": () => import("./i18n/no.js").then((a) => a.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((a) => a.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((a) => a.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((a) => a.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((a) => a.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((a) => a.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((a) => a.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((a) => a.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((a) => a.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((a) => a.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((a) => a.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((a) => a.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((a) => a.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((a) => a.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((a) => a.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((a) => a.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((a) => a.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((a) => a.default) });
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
    maxTimestamp: n,
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
let nt = !1, Je = !0;
const _e = be({ el: null, cell: null, timeout: null }), ke = be({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function zt(y) {
  const { config: t, view: d, eventsManager: r, emit: h, uid: C, dateUtils: W } = y, v = (S) => {
    var _;
    const { timeStep: n, timeCellHeight: I, timeFrom: e } = t, z = (((_ = S.touches) == null ? void 0 : _[0]) || S).clientY, { top: H } = S.currentTarget.getBoundingClientRect(), Y = z - H - ~~S.dataTransfer.getData("cursor-grab-at");
    return je(Ke(Y, S.currentTarget), t);
  }, A = (S, n, I) => {
    const e = n.duration || Z(n.start, n.end) || t.timeStep;
    let z = Math.max(v(S), 0);
    if (t.snapToInterval) {
      const f = z + t.snapToInterval / 2;
      z = f - f % t.snapToInterval;
    }
    const H = new Date(new Date(I).setMinutes(z)), Y = Math.min(z + e, 1440), _ = new Date(new Date(I).setMinutes(Y));
    return { start: H, end: _ };
  }, Z = (S, n) => Math.round((n - S) / 6e4);
  return {
    eventDragStart: (S, n) => {
      if (S.target.nodeType === 3 || y.touch.isResizingEvent) return S.preventDefault();
      S.dataTransfer.effectAllowed = "move", S.dataTransfer.dropEffect = "move";
      const I = { ...n, _: { id: n._.id, duration: Z(n.start, n.end) } };
      try {
        S.dataTransfer.setData("text/plain", ""), S.dataTransfer.setData("event", JSON.stringify(I)), S.dataTransfer.setData("cursor-grab-at", S.offsetY);
      } catch (z) {
        return console.warn("Vue Cal: Failed to set drag data:", z), S.preventDefault();
      }
      ke.eventId = n._.id, ke.fromVueCal = C, h("event-drag-start", {
        e: S,
        event: n
      });
      const e = S.target.closest(".vuecal__event");
      e.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        e.classList.add("vuecal__event--dragging-original"), e.classList.remove("vuecal__event--dragging-ghost");
      }, 0), nt = !1, Object.assign(We, { id: d.id, date: d.firstCellDate }), Je = !0, y.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (S, n) => {
      ke.eventId = null, S.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: I, toVueCal: e } = ke;
      e && I !== e && r.deleteEvent(n._.id, 3), nt && Je && We.id && d.switchView(We.id, We.date, !0), h("event-drag-end", {
        e: S,
        event: n,
        external: ke.fromVueCal !== C
      }), ke.fromVueCal = null, ke.toVueCal = null, y.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (S, n) => {
      const { start: I } = n, e = S.currentTarget;
      if (!S.currentTarget.contains(S.relatedTarget)) {
        if (e === _e.el || !e.className.includes("vuecal__cell-content")) return !1;
        _e.el && (_e.cell.highlighted = !1), Object.assign(_e, { el: e, cell: n, timeout: clearTimeout(_e.timeout) }), n.highlighted = !0, ["years", "year", "month"].includes(d.id) && (_e.timeout = setTimeout(() => y.switchToNarrowerView(I), 2e3));
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
      var p, a, O;
      S.preventDefault(), clearTimeout(_e.timeout), Object.assign(_e, { el: null, cell: null, timeout: null });
      const e = JSON.parse(S.dataTransfer.getData("event") || "{}");
      e.start && (e.start = new Date(e.start)), e.end && (e.end = new Date(e.end));
      let z, H, Y;
      I ? (H = new Date(n.start), Y = new Date(n.end)) : { start: H, end: Y } = A(S, e, n.start);
      const { schedule: _ } = ((p = S.target.closest("[data-schedule]")) == null ? void 0 : p.dataset) || {};
      let f = () => {
      };
      ke.fromVueCal === C ? (z = r.getEvent(e._.id), z && (z._.dragging = !1, f = (X) => {
        if (z.start = H, z.end = Y, z.allDay = I, _ !== void 0 && (z.schedule = ~~_), X && typeof X == "object") {
          const { _: U, ...Q } = X;
          Object.assign(z, Q);
        }
      })) : (z = {
        ...e,
        start: H,
        end: Y,
        ..._ !== void 0 && { schedule: ~~_ },
        _: { id: ((a = e._) == null ? void 0 : a.id) || e.id, duration: Z(H, Y) },
        getOverlappingEvents: () => r.getEventsInRange(H, Y, { schedule: ~~_ })
      }, f = (X) => {
        if (z = r.createEvent(z), X && typeof X == "object") {
          const { _: U, ...Q } = X;
          Object.assign(z, Q);
        }
      });
      let c = !0;
      const { drop: u } = (O = t.eventListeners) == null ? void 0 : O.event;
      u && (c = await u({
        e: S,
        event: { ...z, start: H, end: Y, schedule: ~~_ },
        overlaps: z.getOverlappingEvents({ start: H, end: Y, schedule: ~~_ }),
        cell: n,
        external: ke.fromVueCal !== C
      })), c !== !1 && f(c), n.highlighted = !1, n.highlightedSchedule = null, Je = !1, ke.toVueCal = C, h("event-dropped", {
        e: S,
        cell: n,
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
      return n(this, s || 0);
    }, Date.prototype.getWeek = function() {
      return e(this);
    }, Date.prototype.isToday = function() {
      return z(this);
    }, Date.prototype.isLeapYear = function() {
      return _(this);
    }, Date.prototype.format = function(s = "YYYY-MM-DD") {
      return X(this, s);
    }, Date.prototype.formatTime = function(s = "HH:mm") {
      return Q(this, s);
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
  }, n = (s, k) => {
    const D = new Date(s.valueOf());
    return D.setMinutes(D.getMinutes() - k), D;
  }, I = (s, k) => {
    const D = (J) => {
      const ne = J % k;
      return ne !== 0 && (J += ne >= k / 2 ? k - ne : -ne), J;
    };
    if (typeof s == "number") return D(s);
    if (s instanceof Date) {
      let J = D(s.getMinutes());
      J >= 60 && (s.setHours(s.getHours() + 1), J = 0), s.setMinutes(J, 0, 0);
    }
  }, e = (s, k = !1) => {
    const D = new Date(Date.UTC(s.getFullYear(), s.getMonth(), s.getDate())), J = D.getUTCDay() || 7;
    D.setUTCDate(D.getUTCDate() + 4 - J);
    const ne = new Date(Date.UTC(D.getUTCFullYear(), 0, 1));
    return Math.ceil(((D - ne) / 864e5 + 1) / 7) + (k ? 1 : 0);
  }, z = (s) => `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}` === l(), H = (s, k) => {
    if (!s || !k) return console.warn(`Vue Cal: missing date${s ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (O(s)) {
      if (!O(k)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${k}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${s}\`.`);
    return s.getFullYear() === k.getFullYear() && s.getMonth() === k.getMonth() && s.getDate() === k.getDate();
  }, Y = (s, k, D) => O(s) ? s.getTime() >= k && s.getTime() <= D : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${s}\`.`), _ = (s) => {
    const k = s.getFullYear();
    return !(k % 400) || k % 100 && !(k % 4);
  }, f = (s = null, k) => {
    const D = s && new Date(s.valueOf()) || /* @__PURE__ */ new Date(), J = k ? 7 : 6;
    return D.setDate(D.getDate() - (D.getDay() + J) % 7), D;
  }, c = (s) => s instanceof Date ? s : (s.length === 10 && (s += " 00:00"), new Date(s.replace(/-/g, "/"))), u = (s) => s.getHours() * 60 + s.getMinutes(), p = (s, k) => {
    typeof s == "string" && (s = s.replace(/-/g, "/")), typeof k == "string" && (k = k.replace(/-/g, "/")), s = new Date(s).setHours(0, 0, 0, 0), k = new Date(k).setHours(0, 0, 1, 0);
    const D = (new Date(k).getTimezoneOffset() - new Date(s).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil((k - s - D) / (24 * 3600 * 1e3));
  }, a = (s, k, D) => Math.abs(s.getTime() - k.getTime()) <= D * 60 * 1e3, O = (s) => s && s instanceof Date && !isNaN(s), X = (s, k = "YYYY-MM-DD", D = null) => {
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
    return k.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (ne, me) => {
      const o = J[me.replace(/\{|\}/g, "")];
      return o !== void 0 ? o() : me;
    });
  }, U = (s) => {
    const k = s.getMonth() + 1, D = s.getDate();
    return `${s.getFullYear()}-${k < 10 ? "0" : ""}${k}-${D < 10 ? "0" : ""}${D}`;
  }, Q = (s, k = "HH:mm", D = null, J = !1) => {
    let ne = !1;
    if (J) {
      const [T, M, w] = [s.getHours(), s.getMinutes(), s.getSeconds()];
      T + M + w === 141 && (ne = !0);
    }
    if (s instanceof Date && k === "HH:mm") return ne ? "24:00" : te(s);
    W = {}, D || (D = v.value);
    const me = ve(s, D), o = k.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (T, M) => {
      const w = me[M.replace(/\{|\}/g, "")];
      return w !== void 0 ? w : M;
    });
    return ne ? o.replace("23:59", "24:00") : o;
  }, te = (s) => {
    const k = s.getHours(), D = s.getMinutes();
    return `${(k < 10 ? "0" : "") + k}:${(D < 10 ? "0" : "") + D}`;
  }, q = (s) => {
    const k = Math.floor(s / 60).toString().padStart(2, 0), D = (s % 60).toString().padStart(2, 0);
    return `${k}:${D}`;
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
  }, ae = (s, k) => {
    if (C.D) return C;
    const D = s.getFullYear(), J = s.getMonth() + 1, ne = s.getDate(), o = (s.getDay() - 1 + 7) % 7;
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
      dd: () => k.weekDaysShort.length ? k.weekDaysShort[o] : k.weekDays[o][0],
      // M to S.
      ddd: () => k.weekDaysShort.length ? k.weekDaysShort[o] : k.weekDays[o].substr(0, 3),
      // Mon to Sun.
      dddd: () => k.weekDays[o]
      // Monday to Sunday.
    }, C;
  }, ve = (s, k) => {
    if (W.am) return W;
    let D, J, ne;
    s instanceof Date ? (D = s.getHours(), J = s.getMinutes(), ne = s.getSeconds()) : (D = Math.floor(s / 60), J = Math.floor(s % 60));
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
      s: ne
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
    subtractMinutes: n,
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
    datesInSameTimeStep: a,
    isValid: O,
    formatDate: X,
    formatDateLite: U,
    formatTime: Q,
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
      const p = typeof u.start == "string" || typeof u.end == "string", a = !((H = u._) != null && H.register) || !u.isOverlapping || !u.delete;
      let O = !1;
      if (!p && ((Y = u._) != null && Y.cachedStart) && ((_ = u._) != null && _.cachedEnd) && (O = u.start.getTime() !== ((f = u._) == null ? void 0 : f.cachedStart) || u.end.getTime() !== ((c = u._) == null ? void 0 : c.cachedEnd)), p || a || O) {
        if (!C(u)) continue;
        W(u), u._.cachedStart = u.start.getTime(), u._.cachedEnd = u.end.getTime();
      }
      if (e.byId[u._.id] = u, u.recurring)
        e.recurring.push(u._.id);
      else if (!t.isSameDate(u.start, new Date(u.end.getTime() - 1)))
        u._.multiday = d.multidayEvents, d.multidayEvents ? e.multiday.push(u._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), u.end = new Date(new Date(u.start).setHours(23, 59, 59, 999)), W(u)), e.byDate[u._.startFormatted] || (e.byDate[u._.startFormatted] = []), e.byDate[u._.startFormatted].push(u._.id);
      else {
        e.byDate[u._.startFormatted] || (e.byDate[u._.startFormatted] = []), e.byDate[u._.startFormatted].push(u._.id);
        const X = u._.startFormatted.substring(0, 4), U = u._.startFormatted.substring(5, 7), Q = u._.startFormatted.substring(8, 10);
        e.byYear[X] || (e.byYear[X] = {}), e.byYear[X][U] || (e.byYear[X][U] = {}), e.byYear[X][U][Q] || (e.byYear[X][U][Q] = []), e.byYear[X][U][Q].push(u._.id);
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
      var a;
      const c = (f == null ? void 0 : f.start) || this.start, u = (f == null ? void 0 : f.end) || this.end, p = (a = d.schedules) != null && a.length ? ~~((f == null ? void 0 : f.schedule) || this.schedule) : null;
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
      const [p, a] = Y[0];
      H = (c = d.events.find((O) => O[p] === a)) == null ? void 0 : c._.id;
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
    _.sort((p, a) => p.start - a.start || p.end - p.start - (a.end - a.start));
    for (const p of _) {
      const a = p._.id;
      f[a] || (f[a] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), c = c.filter((te) => te.end > p.start);
      const O = c.filter((te) => {
        var le;
        return (!((le = d.schedules) != null && le.length) || p.schedule === te.schedule) && te.start < p.end;
      }), X = new Set(O.map((te) => {
        var q;
        return ((q = f[te._.id]) == null ? void 0 : q.position) ?? 0;
      }));
      let U = 0;
      for (; X.has(U); ) U++;
      f[a].position = U, c.push(p);
      const Q = Math.max(1, ...O.map((te) => {
        var q;
        return ((q = f[te._.id]) == null ? void 0 : q.maxConcurrent) ?? 1;
      }));
      f[a].maxConcurrent = Math.max(O.length + 1, Q);
      for (const te of O)
        f[te._.id].overlaps.add(a), f[a].overlaps.add(te._.id), f[te._.id].maxConcurrent = f[a].maxConcurrent;
      u = Math.max(u, f[a].maxConcurrent);
    }
    for (const p in f) f[p].overlaps = [...f[p].overlaps];
    return { cellOverlaps: f, longestStreak: u };
  }, E = (e, z, { excludeIds: H = [], schedule: Y = null, background: _ = !0, allDay: f = !1 } = {}) => {
    if (!Object.keys(h.value.byId).length) return [];
    const c = e.getFullYear(), u = z.getFullYear(), p = e.getMonth() + 1, a = z.getMonth() + 1, O = e.getDate(), X = z.getDate();
    e.getTime(), z.getTime();
    const U = new Date(e).setHours(0, 0, 0, 0), Q = new Date(z).setHours(23, 59, 59, 999), te = new Set(H), q = [];
    if (Object.keys(h.value.byId).length <= 100) {
      for (const le of Object.values(h.value.byId))
        !le || te.has(le._.id) || Y !== null && Y !== le.schedule || _ === !1 && le.background || d.allDayEvents && (f && !le.allDay || !f && le.allDay) || le.start.getTime() < Q && le.end.getTime() > U && q.push(le);
      return q;
    }
    for (let le = c; le <= u; le++) {
      const ae = `${le}`, ve = h.value.byYear[ae];
      if (!ve) continue;
      const s = le === c ? p : 1, k = le === u ? a : 12;
      for (let D = s; D <= k; D++) {
        const J = String(D).padStart(2, "0"), ne = ve[J];
        if (ne)
          for (const me in ne) {
            const o = +me;
            if (o > X || o < O) continue;
            const T = ne[me];
            if (T != null && T.length)
              for (let M = 0; M < T.length; M++) {
                const w = h.value.byId[T[M]];
                !w || te.has(w._.id) || Y !== null && Y !== w.schedule || _ === !1 && w.background || d.allDayEvents && (f && !w.allDay || !f && w.allDay) || w.start.getTime() < Q && w.end.getTime() > U && q.push(w);
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
      const { top: p, left: a, width: O, height: X } = m.cellEl.getBoundingClientRect();
      m.moveX = z - a, m.moveY = H - p, m.movePercentageX = m.moveX * 100 / O, m.movePercentageY = m.moveY * 100 / X;
    }
    if (m.documentMouseX = z, m.documentMouseY = H, m.fromResizer && m.resizingEvent) {
      const p = m.cellEl.__vueParentComponent.props.start, { newStart: a, newEnd: O } = i(m.resizingEvent, p);
      let X = !0;
      const { resize: U } = ((u = d.eventListeners) == null ? void 0 : u.event) || {};
      U && (X = await U({
        e,
        event: { ...m.resizingEvent, start: a, end: O },
        overlaps: m.resizingEvent.getOverlappingEvents({ start: a, end: O })
      })), X !== !1 ? (m.resizingEvent.start = a, m.resizingEvent.end = O, m.resizingLastAcceptedEvent && (m.resizingLastAcceptedEvent = null), e.preventDefault()) : U && (m.resizingLastAcceptedEvent = { ...m.resizingEvent, _: { ...m.resizingEvent._ } });
    }
  }, n = async (e) => {
    var z, H, Y, _;
    if ((z = y.touch) != null && z.isResizingEvent && m.resizingEvent) {
      const f = m.cellEl.__vueParentComponent.props.start, { newStart: c, newEnd: u } = i(m.resizingEvent, f);
      let p = !0;
      const O = (((H = d.eventListeners) == null ? void 0 : H.event) || {})["resize-end"];
      O && (p = await O({
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
        m.startX = Y.clientX - f.left, m.startY = Y.clientY - f.top, m.startPercentageX = m.startX * 100 / f.width, m.startPercentageY = m.startY * 100 / f.height, m.cellEl = H.closest(".vuecal__cell"), m.resizeStartDate = z.start, m.resizingEvent = z, document.addEventListener(e.type === "touchstart" ? "touchmove" : "mousemove", S, { passive: !m.fromResizer }), document.addEventListener(e.type === "touchstart" ? "touchend" : "mouseup", n, { once: !0 });
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
  }), n = b(() => {
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
    for (let K = 0; K < Y.value + ee; K++)
      switch (v.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const ye = t.addDays(_.value, K), Ne = ye.getDay() || 7;
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
            start: new Date(_.value.getFullYear(), K, 1, 0, 0, 0, 0),
            end: new Date(_.value.getFullYear(), K + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          g.push({
            start: new Date(_.value.getFullYear() + K, 0, 1, 0, 0, 0, 0),
            end: new Date(_.value.getFullYear() + K + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return g;
  }), c = b(() => f.value[f.value.length - 1].end), u = ue("right"), p = b(() => {
    const g = Object.keys(y.availableViews);
    return g[g.indexOf(v.value) + 1];
  }), a = b(() => {
    const g = Object.keys(y.availableViews);
    return g[g.indexOf(v.value) - 1];
  });
  function O(g, R, ee = !1) {
    if (!R || !R[g]) return g + 1;
    const K = R[g];
    return ee && typeof K == "string" ? K.substring(0, 3) : K;
  }
  function X(g, R, ee) {
    const { monthsArray: K, monthBeforeDay: ye, canTruncate: Ne, xs: ze } = ee, Me = g.getMonth(), Ee = g.getFullYear(), Ye = R.getMonth(), Pe = R.getFullYear(), Be = Me !== Ye, $t = Ee !== Pe, Te = Ne && (ze || Be), Le = g.getDate(), Ae = R.getDate();
    return $t ? ye ? `${O(Me, K, Te)} ${Le}, ${Ee} - ${O(Ye, K, Te)} ${Ae}, ${Pe}` : `${Le} ${O(Me, K, Te)} ${Ee} - ${Ae} ${O(Ye, K, Te)} ${Pe}` : Be ? ye ? `${O(Me, K, Te)} ${Le} - ${O(Ye, K, Te)} ${Ae}, ${Ee}` : `${Le} ${O(Me, K, Te)} - ${Ae} ${O(Ye, K, Te)} ${Ee}` : ye ? `${O(Me, K, Te)} ${Le}-${Ae}, ${Ee}` : `${Le}-${Ae} ${O(Me, K, Te)} ${Ee}`;
  }
  const U = b(() => {
    const { dateFormat: g, months: R, monthsGenitive: ee, week: K, truncations: ye } = r, Ne = y.locale, ze = ye !== !1, Me = g.indexOf("M") < g.indexOf("D"), Ee = ee && Ne === "el" ? ee : R;
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
          Pe += ` <small>${K} ${Be}</small>`;
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
  async function Q() {
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
      containsToday: n.value,
      events: G.value
    }));
  }
  function te(g) {
    const R = v.value, ee = y.availableViews[R];
    g[R] && JSON.stringify(g[R]) === JSON.stringify(ee) || Q();
  }
  function q(g, R = !0, ee = null) {
    const K = Object.keys(y.availableViews);
    v.value === g && !ee || (K.includes(g) ? (u.value = K.indexOf(g) < K.indexOf(v.value) ? "left" : "right", R && v.value !== g && d("update:view", g), v.value = g, ee ? J(ee) : Q()) : console.warn(`Vue Cal: the \`${g}\` view is not available.`));
  }
  function le() {
    p.value ? q(p.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function ae() {
    a.value ? q(a.value) : console.warn("Vue Cal: no narrower view is available.");
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
    let [K, ye] = [_.value, c.value];
    v.value === "month" && ([K, ye] = [F.value, m.value]), (!t.isInRange(g, K, ye) || ee) && (g.setHours(0, 0, 0, 0), u.value = g.getTime() < K.getTime() ? "left" : "right", L.value = g, R && d("update:viewDate", g), Q());
  }
  function ne(g, R = !0) {
    if (!t.isValid(g)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: ee, isSameDate: K } = t;
    (!A.value || !ee(A.value) || !K(g, A.value)) && (g.setHours(0, 0, 0, 0), A.value = g, R && d("update:selectedDate", g));
  }
  function me(g) {
    !g && !l.value.getDay() ? J(t.addDays(l.value, 1), !0, !0) : (u.value = "left", Q());
  }
  function o(g) {
    g && y.startWeekOnSunday && !l.value.getDay() ? J(t.addDays(l.value, 1), !0, !0) : !g && y.startWeekOnSunday && l.value.getDay() === 1 && J(t.subtractDays(l.value, 1), !0, !0);
  }
  function T() {
    Q();
  }
  function M(g) {
    var K;
    const R = (K = C.value) == null ? void 0 : K.querySelector(".vuecal__scrollable"), ee = g ? g * y.timeCellHeight / y.timeStep : 0;
    R == null || R.scrollTo({ top: ee, behavior: "smooth" });
  }
  function w() {
    const g = /* @__PURE__ */ new Date();
    M(g.getHours() * 60 + g.getMinutes());
  }
  function N() {
    M(0);
  }
  const G = b(() => h.getViewEvents(f.value)), oe = h.createEvent, ge = h.deleteEvent;
  return De(() => y.view, (g) => q(g, !1)), De(() => y.availableViews, te), De(() => y.datePicker, () => q("month")), De(() => y.viewDate, (g) => J(g, !1)), De(() => y.selectedDate, (g) => ne(g, !1)), De(() => y.startWeekOnSunday, (g) => me(g)), De(() => y.hideWeekends, (g) => o(g)), De(() => y.hideWeekdays, T), De(() => Y.value, () => {
    Y.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), De(() => y.watchRealTime, (g) => {
    g && y.time ? e() : E = clearTimeout(E);
  }), Q(), y.time && y.watchRealTime && e(), Re(() => E = clearTimeout(E)), {
    now: Z,
    id: v,
    broaderView: p,
    narrowerView: a,
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
    containsToday: n,
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
    broader: le,
    narrower: ae,
    previous: ve,
    next: s,
    navigate: k,
    goToToday: D,
    updateViewDate: J,
    updateSelectedDate: ne,
    scrollToCurrentTime: w,
    scrollToTime: M,
    scrollTop: N,
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
      j(W.$slots, "header", {
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
            j(W.$slots, "previous-button")
          ], 2),
          he("div", Bt, [
            Oe(Ue, {
              name: `vuecal-slide-fade--${$(d).transitionDirection}`
            }, {
              default: B(() => [
                (V(), P("div", {
                  key: $(d).id + $(d).start.getTime()
                }, [
                  W.$slots.title || W.$slots[`title.${$(d).id}`] ? (V(), Se(xe($(r).clickToNavigate && $(d).broaderView ? "button" : "div"), ie({
                    key: 0,
                    class: "vuecal__title"
                  }, Ie(C.value)), {
                    default: B(() => [
                      W.$slots[`title.${$(d).id}`] ? j(W.$slots, `title.${$(d).id}`, se(ie({ key: 0 }, $(d)))) : j(W.$slots, "title", se(ie({ key: 1 }, $(d))))
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
            W.$slots["today-button"] ? j(W.$slots, "today-button", {
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
            j(W.$slots, "next-button")
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
}, Qt = { key: 0 }, xt = ["innerHTML"], ea = 16, st = {
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
    }), F = b(() => r.editableEvents.drag && l.draggable !== !1 && !l.background && E.canTouchAndDrag !== !1), m = b(() => h.isMonth || h.isYear || h.isYears || d.inAllDayBar || l._.multiday && !n.value ? !1 : r.time && r.editableEvents.resize && l.resizable !== !1 && !l.background);
    b(() => r.editableEvents.delete && l.deletable !== !1 && !l.background);
    const i = b(() => {
      var c, u, p, a, O;
      const f = !!((c = l._) != null && c.multiday);
      return {
        [`vuecal__event--${l._.id}`]: !0,
        [l.class]: !!l.class,
        "vuecal__event--recurring": !!l.recurring,
        "vuecal__event--background": !!l.background,
        "vuecal__event--all-day": l.allDay || ((u = l._) == null ? void 0 : u.startMinutes) === 0 && ((p = l._) == null ? void 0 : p.duration) === 1440,
        "vuecal__event--multiday": f,
        "vuecal__event--cut-top": !d.inAllDayBar && (((a = l._) == null ? void 0 : a.startMinutes) < r.timeFrom || f && !S.value),
        "vuecal__event--cut-bottom": !d.inAllDayBar && (((O = l._) == null ? void 0 : O.endMinutes) > r.timeTo || f && !n.value),
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
    }), S = b(() => l._.multiday ? new Date(l.start).setHours(0, 0, 0, 0) === d.cellStart.getTime() : !0), n = b(() => l._.multiday ? v.isSameDate(new Date(new Date(l.end).setMilliseconds(-1)), d.cellEnd) : !0), I = b(() => {
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
        let p = l._.startMinutes, a = l._.endMinutes;
        l._.multiday && (S.value || (p = 0), n.value || (a = 1440));
        const O = Math.max(r.timeFrom, p), X = Math.min(r.timeTo, a) + (l._.duration && !a ? 1440 : 0), U = Ve(O, r), Q = Ve(X, r) - U;
        u[c ? "left" : "top"] = `${U}%`, u[c ? "width" : "height"] = `${Q}%`;
      }
      return u;
    }), z = b(() => {
      const f = { ...r.eventListeners.event };
      for (const [p, a] of Object.entries(f))
        ["resize-end"].includes(p) || (f[p] = (O) => {
          O.type !== "drop" && a(O.type ? { e: O, event: l } : O);
        });
      const c = { ...f };
      f.touchstart = (p) => {
        var a;
        p.stopPropagation(), E.touchAndDragTimer = setTimeout(() => {
          E.canTouchAndDrag = !0;
        }, 500), _(p), (a = c.touchstart) == null || a.call(c, { e: p, event: l });
      }, f.mousedown = (p) => {
        var a;
        p.stopPropagation(), _(p), (a = c.mousedown) == null || a.call(c, { e: p, event: l });
      };
      let u = null;
      return f.click = (p) => {
        var a;
        (a = c.click) == null || a.call(c, { e: p, event: l }), u ? u = clearTimeout(u) : u = setTimeout(() => {
          var O;
          u = null, (O = c["delayed-click"]) == null || O.call(c, { e: p, event: l });
        }, 400);
      }, f.dblclick = (p) => {
        c.dblclick ? c.dblclick({ e: p, event: l }) : l.delete(1);
      }, f;
    });
    let H = null, Y = 0;
    const _ = (f) => {
      var a, O, X;
      const c = ((a = f.touches) == null ? void 0 : a[0]) || f;
      E.fromResizer = c.target.closest(".vuecal__event-resizer");
      const u = Date.now();
      (!H || u - Y > ea) && (H = L.value.getBoundingClientRect(), Y = u);
      const p = H;
      E.startX = (((O = f.touches) == null ? void 0 : O[0]) || f).clientX - p.left, E.startY = (((X = f.touches) == null ? void 0 : X[0]) || f).clientY - p.top, E.startPercentageX = E.startX * 100 / p.width, E.startPercentageY = E.startY * 100 / p.height, E.cellEl = L.value.closest(".vuecal__cell"), E.resizeStartDate = l.start, E.fromResizer && Z(f, l, L.value), E.holdTimer = setTimeout(() => {
        var U, Q;
        E.holding = !0, (Q = (U = z.value).hold) == null || Q.call(U, { e: f, event: l });
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
        f.$slots["event.all-day"] ? j(f.$slots, "event.all-day", {
          key: 0,
          event: l
        }) : f.$slots[`event.${$(h).id}`] ? j(f.$slots, `event.${$(h).id}`, {
          key: 1,
          event: l
        }) : j(f.$slots, "event", {
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
        default: B(() => [
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
}, ta = ["innerHTML"], aa = ["data-schedule"], na = {
  key: 1,
  class: "vuecal__cell-date"
}, sa = {
  key: 2,
  class: "vuecal__cell-content"
}, la = {
  key: 3,
  class: "vuecal__cell-events"
}, ra = {
  key: 1,
  class: "vuecal__cell-date"
}, oa = {
  key: 2,
  class: "vuecal__cell-content"
}, ia = {
  key: 3,
  class: "vuecal__cell-events"
}, ua = {
  key: 5,
  class: "vuecal__cell-events-count"
}, ca = ["title"], kt = {
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
    }), S = ue(!1), n = ue({ cellOverlaps: {}, longestStreak: 0 }), I = b(() => {
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
      const o = /* @__PURE__ */ new Date(), T = r.start.getFullYear(), M = r.start.getMonth(), w = t.start.getFullYear(), N = t.start.getMonth();
      return {
        [`vuecal__cell--${Ge[t.start.getDay()]}`]: r.isDay || r.isDays || r.isWeek || r.isMonth,
        [`vuecal__cell--${Yt[N]}`]: r.isYear,
        [`vuecal__cell--${w}`]: r.isYears,
        "vuecal__cell--today": Z.value,
        "vuecal__cell--current-month": r.isYear && w === o.getFullYear() && N === o.getMonth(),
        "vuecal__cell--current-year": r.isYears && w === o.getFullYear(),
        "vuecal__cell--out-of-range": r.isMonth && (w !== T || N !== M),
        "vuecal__cell--before-min": U.value && O.value,
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
        const N = w._.id, { maxConcurrent: G = 1, position: oe = 0 } = n.value.cellOverlaps[N] || {}, ge = o ? "right" : "left", g = T ? "height" : "width";
        M[N] = { [T ? "top" : ge]: `${100 / G * oe}%` }, h.stackEvents ? M[N][g] = `${100 / G + (oe === G - 1 ? 0 : 15)}%` : M[N][g] = `${100 / G}%`;
      }
      return M;
    }), u = b(() => {
      const o = {};
      for (const T of Y.value) {
        const M = T._.id, { maxConcurrent: w = 1, position: N = 0 } = n.value.cellOverlaps[M] || {};
        o[M] = `vuecal__event--stack-${N + 1}-${w}`;
      }
      return o;
    }), p = b(() => h.showCellEventCount && _.value.length), a = b(() => {
      var M;
      if (!h.specialHours || r.isMonth || r.isYear || r.isYears || t.allDay) return;
      const o = Ge[t.start.getDay()];
      let T = (M = h.specialHours) == null ? void 0 : M[o];
      if (T)
        return Array.isArray(T) || (T = [T]), T.map((w) => {
          let { from: N, to: G, class: oe, label: ge } = w;
          if (isNaN(N) || isNaN(G) || h.timeFrom >= G || h.timeTo <= N) return;
          N = Math.max(h.timeFrom, N), G = Math.min(h.timeTo, G);
          const g = Ve(N, h), R = Ve(G, h) - g;
          return {
            style: { top: `${g}%`, height: `${R}%` },
            label: ge,
            class: oe
          };
        }).filter((w) => !!w);
    }), O = b(() => h.minTimestamp !== null && h.minTimestamp > t.end.getTime()), X = b(() => h.maxTimestamp && h.maxTimestamp < t.start.getTime()), U = b(() => {
      const { disableDays: o } = h, T = r.isYear || r.isYears;
      return o.length && o.includes(C.formatDate(t.start)) && !T ? !0 : O.value || X.value;
    }), Q = be({
      show: b(() => {
        if (!(!r.isDay && !r.isDays && !r.isWeek) && !(!Z.value || !h.time || t.allDay) && !(h.timeFrom > C.dateToMinutes(r.now)) && !(C.dateToMinutes(r.now) > h.timeTo))
          return !0;
      }),
      nowInMinutes: b(() => C.dateToMinutes(r.now)),
      todaysTimePosition: b(() => Ve(Q.nowInMinutes, h)),
      style: b(() => `${h.horizontal ? "left" : "top"}: ${Q.todaysTimePosition}%`),
      currentTime: b(() => C.formatTime(r.now))
    }), te = b(() => {
      if (U.value) return {};
      const o = { ...h.eventListeners.cell };
      for (const [w, N] of Object.entries(o))
        o[w] = (G) => {
          var oe, ge, g;
          (g = (ge = G.target || ((oe = G.e) == null ? void 0 : oe.target)).closest) != null && g.call(ge, ".vuecal__event") || N(G.type ? { e: G, cell: q.value, cursor: ae.value } : G);
        };
      const T = { ...o };
      let M = null;
      return o.click = (w) => {
        var G;
        ve();
        const N = le(w);
        (G = T.click) == null || G.call(T, { e: w, cell: q.value, cursor: N }), M ? M = clearTimeout(M) : M = setTimeout(() => {
          var oe;
          M = null, (oe = T["delayed-click"]) == null || oe.call(T, { e: w, cell: q.value, cursor: N });
        }, 400);
      }, (h.time && r.isDay || r.isDays || r.isWeek) && (o.touchstart = (w) => {
        var N;
        s(w.e || w), (N = T.touchstart) == null || N.call(T, { e: w, cell: q.value, cursor: ae.value });
      }, o.mousedown = (w) => {
        var N;
        s(w.e || w), (N = T.mousedown) == null || N.call(T, { e: w, cell: q.value, cursor: ae.value });
      }), T.dblclick && (o.dblclick = (w) => {
        var N;
        (N = T.dblclick) == null || N.call(T, { e: w, cell: q.value, cursor: le(w) });
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
    })), le = (o) => {
      var G;
      const T = (((G = o.touches) == null ? void 0 : G[0]) || o).clientY, { top: M } = L.value.getBoundingClientRect(), w = Ke(T - M, L.value), N = new Date(t.start);
      return N.setMinutes(je(w, h)), { y: w, date: N };
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
      var w, N;
      const T = o.type === "touchstart";
      T ? (i.canTouchAndDrag = !1, i.touchAndDragTimer = setTimeout(() => {
        i.canTouchAndDrag = !0, (i.holding || i.dragging) && o.preventDefault();
      }, 500)) : i.canTouchAndDrag = !0, i.schedule = ~~o.target.dataset.schedule;
      const M = L.value.getBoundingClientRect();
      i.startX = (((w = o.touches) == null ? void 0 : w[0]) || o).clientX - M.left, i.startY = (((N = o.touches) == null ? void 0 : N[0]) || o).clientY - M.top, i.startPercentageX = i.startX * 100 / M.width, i.startPercentageY = i.startY * 100 / M.height, i.thresholdPassed = !1, document.addEventListener(T ? "touchmove" : "mousemove", k, { passive: !T }), document.addEventListener(T ? "touchend" : "mouseup", D, { once: !0 }), i.holdTimer = setTimeout(() => {
        var G, oe;
        i.holding = !0, (oe = (G = te.value).hold) == null || oe.call(G, { e: o, cell: q.value, cursor: ae.value });
      }, 1e3);
    }, k = (o) => {
      var w, N, G, oe, ge, g;
      const T = o.type === "touchmove";
      if (T && !i.canTouchAndDrag) {
        i.touchAndDragTimer && (clearTimeout(i.touchAndDragTimer), i.touchAndDragTimer = null), D(o);
        return;
      }
      T && o.preventDefault(), i.dragging || (A.isDraggingCell = !0, (N = (w = te.value)["drag-start"]) == null || N.call(w, { e: o, cell: q.value, cursor: ae.value })), i.dragging = !0, i.holdTimer = clearTimeout(i.holdTimer), i.holding = !1;
      const M = L.value.getBoundingClientRect();
      i.moveX = (((G = o.touches) == null ? void 0 : G[0]) || o).clientX - M.left, i.moveY = (((oe = o.touches) == null ? void 0 : oe[0]) || o).clientY - M.top, i.movePercentageX = i.moveX * 100 / M.width, i.movePercentageY = i.moveY * 100 / M.height, h.eventCreateMinDrag && Math.abs(i.startY - i.moveY) > h.eventCreateMinDrag && (i.thresholdPassed = !0), (g = (ge = te.value).drag) == null || g.call(ge, { e: o, cell: q.value, cursor: ae.value });
    }, D = async (o) => {
      var M, w;
      const T = o.type === "touchend";
      document.removeEventListener(T ? "touchmove" : "mousemove", k, { passive: !1 }), i.touchAndDragTimer && (clearTimeout(i.touchAndDragTimer), i.touchAndDragTimer = null), i.dragging && ((w = (M = te.value)["drag-end"]) == null || w.call(M, { e: o, cell: q.value, cursor: ae.value }), A.isDraggingCell = !1, h.editableEvents.create && i.canTouchAndDrag && (S.value = !0, await J(o), S.value = !1)), i.holdTimer = clearTimeout(i.holdTimer), i.holding = !1, i.dragging = !1, i.startX = 0, i.startY = 0, i.moveX = 0, i.moveY = 0, i.startPercentageX = 0, i.startPercentageY = 0, i.movePercentageX = 0, i.movePercentageY = 0, i.thresholdPassed = !1, i.schedule = null, i.canTouchAndDrag = null;
    }, J = async (o) => {
      var ge;
      if (!e.value) return;
      let { start: T, end: M, startMinutes: w, endMinutes: N } = I.value;
      T = new Date(t.start), T.setMinutes(w), M = new Date(t.start), M.setMinutes(N);
      let G = { ...I.value, start: T, end: M };
      const { create: oe } = h.eventListeners.event;
      if (typeof oe == "function") {
        const g = G;
        G = await new Promise((R) => oe({ e: o, event: G, cell: q.value, resolve: R, cursor: ae.value })), G && typeof G == "object" && r.createEvent(G), G && typeof G == "boolean" && r.createEvent(g);
      } else r.createEvent(G);
      (ge = navigator.vibrate) == null || ge.call(navigator, 200);
    }, ne = () => {
      var o;
      for (const T of Object.keys(te.value))
        (o = L.value) == null || o.removeEventListener(T, te.value[T]);
    }, me = () => {
      n.value = W.getCellOverlappingEvents(t.start, t.end, t.allDay);
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
      ne(), await Xe();
    }), (o, T) => (V(), P("div", ie({
      class: ["vuecal__cell", z.value],
      ref_key: "cellEl",
      ref: L
    }, Ie(te.value, !0)), [
      o.$slots.cell ? j(o.$slots, "cell", {
        key: 0,
        cell: q.value
      }) : x("", !0),
      a.value ? (V(!0), P(de, { key: 1 }, we(a.value, (M, w) => (V(), P("div", {
        class: pe(["vuecal__special-hours", M.class]),
        style: $e(M.style),
        innerHTML: M.label || ""
      }, null, 14, ta))), 256)) : x("", !0),
      !o.$slots.cell && $(h).schedules ? (V(!0), P(de, { key: 2 }, we($(h).schedules, (M) => (V(), P("div", {
        class: pe(["vuecal__schedule vuecal__schedule--cell", M.class]),
        key: M.id,
        style: $e(M.style || null),
        "data-schedule": M.id
      }, [
        o.$slots["cell-events"] ? j(o.$slots, "cell-events", {
          key: 0,
          cell: q.value
        }) : x("", !0),
        H.value || o.$slots["cell-date"] ? (V(), P("div", na, [
          j(o.$slots, "cell-date", { cell: q.value }, () => [
            qe(ce(H.value), 1)
          ])
        ])) : x("", !0),
        o.$slots["cell-content"] ? (V(), P("div", sa, [
          j(o.$slots, "cell-content", { cell: q.value })
        ])) : x("", !0),
        o.$slots["cell-events"] && Y.value.length ? (V(), P("div", la, [
          j(o.$slots, "cell-events", { cell: q.value })
        ])) : Y.value.length || E.value ? (V(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: T[0] || (T[0] = (w) => E.value = !0),
          onAfterLeave: m,
          tag: "div"
        }, {
          default: B(() => [
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
                fn: B((N) => [
                  j(o.$slots, "event.all-day", ie({ ref_for: !0 }, N))
                ]),
                key: "0"
              } : void 0,
              o.$slots[`event.${$(r).id}`] ? {
                name: `event.${$(r).id}`,
                fn: B((N) => [
                  j(o.$slots, `event.${$(r).id}`, ie({ ref_for: !0 }, N))
                ]),
                key: "1"
              } : void 0,
              o.$slots.event ? {
                name: "event",
                fn: B((N) => [
                  j(o.$slots, "event", ie({ ref_for: !0 }, N))
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
      ], 14, aa))), 128)) : x("", !0),
      !o.$slots.cell && !$(h).schedules ? (V(), P(de, { key: 3 }, [
        o.$slots["cell-events"] ? j(o.$slots, "cell-events", {
          key: 0,
          cell: q.value
        }) : x("", !0),
        H.value || o.$slots["cell-date"] ? (V(), P("div", ra, [
          j(o.$slots, "cell-date", { cell: q.value }, () => [
            qe(ce(H.value), 1)
          ])
        ])) : x("", !0),
        o.$slots["cell-content"] ? (V(), P("div", oa, [
          j(o.$slots, "cell-content", { cell: q.value })
        ])) : x("", !0),
        o.$slots["cell-events"] && Y.value.length ? (V(), P("div", ia, [
          j(o.$slots, "cell-events", { cell: q.value })
        ])) : !($(r).isMonth && !$(h).eventsOnMonthView) && !$(r).isYear && !$(r).isYears && (Y.value.length || E.value) ? (V(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: T[1] || (T[1] = (M) => E.value = !0),
          onAfterLeave: m,
          tag: "div"
        }, {
          default: B(() => [
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
                fn: B((w) => [
                  j(o.$slots, "event.all-day", ie({ ref_for: !0 }, w))
                ]),
                key: "0"
              } : void 0,
              o.$slots[`event.${$(r).id}`] ? {
                name: `event.${$(r).id}`,
                fn: B((w) => [
                  j(o.$slots, `event.${$(r).id}`, ie({ ref_for: !0 }, w))
                ]),
                key: "1"
              } : void 0,
              o.$slots.event ? {
                name: "event",
                fn: B((w) => [
                  j(o.$slots, "event", ie({ ref_for: !0 }, w))
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
      o.$slots["event-count"] ? j(o.$slots, "event-count", {
        key: 4,
        events: _.value
      }) : p.value ? (V(), P("div", ua, ce(_.value.length), 1)) : x("", !0),
      Q.show ? (V(), P("div", {
        key: 6,
        class: "vuecal__now-line",
        style: $e(Q.style),
        title: Q.currentTime
      }, [
        he("span", null, ce(Q.currentTime), 1)
      ], 12, ca)) : x("", !0)
    ], 16));
  }
}, da = {
  key: 0,
  class: "vuecal__headings"
}, va = {
  key: 0,
  class: "vuecal__weekdays-headings"
}, fa = ["onClick"], ma = { class: "vuecal__weekday-day" }, ga = {
  key: 0,
  class: "vuecal__weekday-date"
}, ha = {
  key: 1,
  class: "vuecal__schedules-headings w-flex grow"
}, ya = ["innerHTML"], Da = {
  key: 2,
  class: "vuecal__all-day w-flex grow"
}, pa = {
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
    }), (l, E) => v.value ? (V(), P("div", da, [
      $(r).isDay ? x("", !0) : (V(), P("div", va, [
        (V(!0), P(de, null, we(A.value, (F, m) => (V(), P("div", {
          class: pe(["vuecal__weekday", { "vuecal__weekday--today": F.isToday }]),
          key: m,
          onClick: (i) => Z.click(F.date)
        }, [
          j(l.$slots, "weekday-heading", {
            label: F[W.value],
            id: F.id,
            date: F.date
          }, () => [
            he("span", ma, ce(F[W.value]), 1),
            $(r).isMonth ? x("", !0) : (V(), P("strong", ga, ce(F.dateNumber), 1))
          ])
        ], 10, fa))), 128))
      ])),
      $(h).schedules ? (V(), P("div", ha, [
        (V(!0), P(de, null, we(A.value, (F, m) => (V(), P(de, { key: m }, [
          (V(!0), P(de, null, we($(h).schedules, (i, S) => (V(), P(de, { key: S }, [
            l.$slots["schedule-heading"] ? (V(), P("div", {
              key: 0,
              class: pe(["vuecal__schedule vuecal__schedule--heading", i.class])
            }, [
              j(l.$slots, "schedule-heading", {
                schedule: i,
                view: $(r)
              })
            ], 2)) : (V(), P("div", {
              key: 1,
              class: pe(["vuecal__schedule vuecal__schedule--heading", i.class]),
              innerHTML: i.label
            }, null, 10, ya))
          ], 64))), 128))
        ], 64))), 128))
      ])) : x("", !0),
      $(h).allDayEvents ? (V(), P("div", Da, [
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
            fn: B((i) => [
              j(l.$slots, "event.all-day", ie({ ref_for: !0 }, i))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: B((i) => [
              j(l.$slots, "event", ie({ ref_for: !0 }, i))
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
}, wa = { class: "vuecal__time-column" }, _a = {
  key: 0,
  class: "vuecal__all-day-label"
}, ka = {
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
    return (C, W) => (V(), P("div", wa, [
      $(d).allDayEvents ? (V(), P("div", _a, [
        j(C.$slots, "all-day-label", {}, () => [
          qe(ce($(t).texts.allDay), 1)
        ])
      ])) : x("", !0),
      (V(!0), P(de, null, we(h.value, (v, A) => (V(), P("div", {
        class: "vuecal__time-cell",
        key: A,
        style: $e({ height: v.height || null })
      }, [
        j(C.$slots, "time-cell", {
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
}, $a = {
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
      const S = ((z = i.touches) == null ? void 0 : z[0]) || i, { clientX: n, clientY: I } = S, { top: e } = v.value.getBoundingClientRect();
      A.value = Ke(I - e, v.value), C.isResizingEvent && r.editableEvents.resizeX && (Z.cellEl = m(n, I));
    }, F = () => {
      A.value = null;
    }, m = (i, S) => {
      const n = document.elementFromPoint(i, S);
      return console.log(n == null ? void 0 : n.closest(".vuecal__cell")), (n == null ? void 0 : n.closest(".vuecal__cell")) || null;
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
        default: B(() => [
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
      (V(!0), P(de, null, we($(d).cellDates, (n, I) => (V(), Se(kt, {
        key: I,
        start: n.start,
        end: n.end,
        index: I
      }, Ce({ _: 2 }, [
        i.$slots.cell ? {
          name: "cell",
          fn: B((e) => [
            j(i.$slots, "cell", ie({ ref_for: !0 }, e))
          ]),
          key: "0"
        } : void 0,
        i.$slots["cell-date"] ? {
          name: "cell-date",
          fn: B((e) => [
            j(i.$slots, "cell-date", ie({ ref_for: !0 }, e))
          ]),
          key: "1"
        } : void 0,
        i.$slots["cell-content"] ? {
          name: "cell-content",
          fn: B((e) => [
            j(i.$slots, "cell-content", ie({ ref_for: !0 }, e))
          ]),
          key: "2"
        } : void 0,
        i.$slots["cell-events"] ? {
          name: "cell-events",
          fn: B((e) => [
            j(i.$slots, "cell-events", ie({ ref_for: !0 }, e))
          ]),
          key: "3"
        } : void 0,
        i.$slots[`event.${$(d).id}`] ? {
          name: `event.${$(d).id}`,
          fn: B((e) => [
            j(i.$slots, `event.${$(d).id}`, ie({ ref_for: !0 }, e))
          ]),
          key: "4"
        } : void 0,
        i.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: B((e) => [
            j(i.$slots, "event.all-day", ie({ ref_for: !0 }, e))
          ]),
          key: "5"
        } : void 0,
        i.$slots.event ? {
          name: "event",
          fn: B((e) => [
            j(i.$slots, "event", ie({ ref_for: !0 }, e))
          ]),
          key: "6"
        } : void 0,
        i.$slots["event-count"] ? {
          name: "event-count",
          fn: B((e) => [
            j(i.$slots, "event-count", ie({ ref_for: !0 }, e))
          ]),
          key: "7"
        } : void 0
      ]), 1032, ["start", "end", "index"]))), 128))
    ], 4));
  }
}, ba = ["data-locale"], Ta = { class: "vuecal__scrollable-wrap" }, Ma = {
  key: 1,
  class: "vuecal__week-numbers"
}, Ea = { class: "vuecal__week-number" }, Ya = { class: "vuecal__body-wrap" }, Ca = {
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
    const r = y, h = d, C = Tt("vuecal-el"), W = Ht({ props: r, emit: h, attrs: Et(), vuecalEl: C, uid: Mt() }), { config: v, view: A, dateUtils: Z, touch: L } = W, l = b(() => v.time && (A.isDay || A.isDays || A.isWeek)), E = b(() => Array(A.rows).fill().map((n, I) => Z.getWeek(Z.addDays(A.firstCellDate, 7 * I)))), F = b(() => {
      var n;
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
        "vuecal--has-schedules": (n = v.schedules) == null ? void 0 : n.length,
        "vuecal--horizontal": v.horizontal
      };
    }), m = b(() => ({
      "--vuecal-time-cell-height": v.timeCellHeight && `${v.timeCellHeight}px`
    })), i = b(() => {
      var n, I;
      return {
        "vuecal__scrollable--row": l.value || v.weekNumbers && A.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${A.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (n = v.schedules) == null ? void 0 : n.length,
        "vuecal__scrollable--no-schedules": !((I = v.schedules) != null && I.length),
        "vuecal__scrollable--no-all-day-bar": !v.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": v.allDayEvents
      };
    }), S = (n) => {
      n.target.closest(".vuecal__cell") && n.preventDefault();
    };
    return Ze(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && C.value.addEventListener("contextmenu", S), await Xe(), v.ready = !0, h("ready", { config: v, view: A });
    }), Re(() => {
      var n;
      (n = C == null ? void 0 : C.value) == null || n.removeEventListener("contextmenu", S);
    }), at("vuecal", W), at("$vuecalEl", C), t({ view: W.view }), (n, I) => (V(), P("div", {
      class: pe(["vuecal", F.value]),
      ref: "vuecal-el",
      "data-locale": n.locale,
      style: $e(m.value)
    }, [
      n.$slots.diy ? j(n.$slots, "diy", {
        key: 0,
        vuecal: $(W)
      }) : (V(), P(de, { key: 1 }, [
        Oe(Xt, null, Ce({ _: 2 }, [
          n.$slots.header ? {
            name: "header",
            fn: B((e) => [
              j(n.$slots, "header", se(re(e)))
            ]),
            key: "0"
          } : void 0,
          !n.$slots.header && n.$slots["previous-button"] ? {
            name: "previous-button",
            fn: B((e) => [
              j(n.$slots, "previous-button", se(re(e)))
            ]),
            key: "1"
          } : void 0,
          !n.$slots.header && n.$slots["next-button"] ? {
            name: "next-button",
            fn: B((e) => [
              j(n.$slots, "next-button", se(re(e)))
            ]),
            key: "2"
          } : void 0,
          !n.$slots.header && n.$slots["today-button"] ? {
            name: "today-button",
            fn: B((e) => [
              j(n.$slots, "today-button", se(re(e)))
            ]),
            key: "3"
          } : void 0,
          !n.$slots.header && n.$slots.title ? {
            name: "title",
            fn: B((e) => [
              j(n.$slots, "title", se(re(e)))
            ]),
            key: "4"
          } : void 0,
          !n.$slots.header && n.$slots["title.day"] ? {
            name: "title.day",
            fn: B((e) => [
              j(n.$slots, "title.day", se(re(e)))
            ]),
            key: "5"
          } : void 0,
          !n.$slots.header && n.$slots["title.days"] ? {
            name: "title.days",
            fn: B((e) => [
              j(n.$slots, "title.days", se(re(e)))
            ]),
            key: "6"
          } : void 0,
          !n.$slots.header && n.$slots["title.week"] ? {
            name: "title.week",
            fn: B((e) => [
              j(n.$slots, "title.week", se(re(e)))
            ]),
            key: "7"
          } : void 0,
          !n.$slots.header && n.$slots["title.month"] ? {
            name: "title.month",
            fn: B((e) => [
              j(n.$slots, "title.month", se(re(e)))
            ]),
            key: "8"
          } : void 0,
          !n.$slots.header && n.$slots["title.year"] ? {
            name: "title.year",
            fn: B((e) => [
              j(n.$slots, "title.year", se(re(e)))
            ]),
            key: "9"
          } : void 0,
          !n.$slots.header && n.$slots["title.years"] ? {
            name: "title.years",
            fn: B((e) => [
              j(n.$slots, "title.years", se(re(e)))
            ]),
            key: "10"
          } : void 0,
          !n.$slots.header && n.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: B((e) => [
              j(n.$slots, "schedule-heading", se(re(e)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        he("div", Ta, [
          Oe(Ue, {
            name: `vuecal-slide-fade--${$(A).transitionDirection}`
          }, {
            default: B(() => [
              (V(), P("div", {
                class: pe(["vuecal__scrollable", i.value]),
                key: $(A).id + $(A).start.getTime()
              }, [
                l.value ? (V(), Se(ka, { key: 0 }, Ce({ _: 2 }, [
                  n.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: B((e) => [
                      j(n.$slots, "time-cell", se(re(e)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : x("", !0),
                $(v).weekNumbers && $(A).isMonth ? (V(), P("div", Ma, [
                  (V(!0), P(de, null, we(E.value, (e) => (V(), P("div", Ea, [
                    j(n.$slots, "week-number", {}, () => [
                      he("small", null, ce(e), 1)
                    ])
                  ]))), 256))
                ])) : x("", !0),
                he("div", Ya, [
                  Oe(pa, null, Ce({ _: 2 }, [
                    n.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: B((e) => [
                        j(n.$slots, "weekday-heading", se(re(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    n.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: B((e) => [
                        j(n.$slots, "schedule-heading", se(re(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    n.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: B((e) => [
                        j(n.$slots, "event.all-day", se(re(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    n.$slots.event ? {
                      name: "event",
                      fn: B((e) => [
                        j(n.$slots, "event", se(re(e)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  Oe($a, null, Ce({ _: 2 }, [
                    n.$slots.cell ? {
                      name: "cell",
                      fn: B((e) => [
                        j(n.$slots, "cell", se(re(e)))
                      ]),
                      key: "0"
                    } : void 0,
                    !n.$slots.cell && n.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: B((e) => [
                        j(n.$slots, "cell-date", se(re(e)))
                      ]),
                      key: "1"
                    } : void 0,
                    !n.$slots.cell && n.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: B((e) => [
                        j(n.$slots, "cell-content", se(re(e)))
                      ]),
                      key: "2"
                    } : void 0,
                    !n.$slots.cell && n.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: B((e) => [
                        j(n.$slots, "cell-events", se(re(e)))
                      ]),
                      key: "3"
                    } : void 0,
                    !n.$slots.cell && !n.$slots["cell-events"] && n.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: B((e) => [
                        j(n.$slots, "event.all-day", se(re(e)))
                      ]),
                      key: "4"
                    } : void 0,
                    !n.$slots.cell && !n.$slots["cell-events"] && n.$slots[`event.${$(A).id}`] ? {
                      name: `event.${$(A).id}`,
                      fn: B((e) => [
                        j(n.$slots, `event.${$(A).id}`, se(re(e)))
                      ]),
                      key: "5"
                    } : void 0,
                    !n.$slots.cell && !n.$slots["cell-events"] && n.$slots.event ? {
                      name: "event",
                      fn: B((e) => [
                        j(n.$slots, "event", se(re(e)))
                      ]),
                      key: "6"
                    } : void 0,
                    !n.$slots.cell && n.$slots["event-count"] ? {
                      name: "event-count",
                      fn: B((e) => [
                        j(n.$slots, "event-count", se(re(e)))
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
    ], 14, ba));
  }
}, za = (y) => {
  Fe.texts = { ...fe.texts, ...y }, Fe.dateUtils.updateTexts(Fe.texts);
}, {
  addDatePrototypes: Va,
  removeDatePrototypes: Oa,
  updateTexts: ja,
  addDays: Ha,
  subtractDays: Pa,
  addHours: La,
  subtractHours: Aa,
  addMinutes: Fa,
  subtractMinutes: Ra,
  getWeek: Na,
  isToday: Ba,
  isSameDate: Wa,
  isInRange: Xa,
  isLeapYear: Ia,
  getPreviousFirstDayOfWeek: qa,
  stringToDate: Ga,
  dateToMinutes: Ua,
  countDays: Ja,
  datesInSameTimeStep: Za,
  isValid: Ka,
  formatDate: Qa,
  formatDateLite: xa,
  formatTime: en,
  formatTimeLite: tn,
  formatMinutes: an
} = Fe.dateUtils;
export {
  Ca as VueCal,
  Va as addDatePrototypes,
  Ha as addDays,
  La as addHours,
  Fa as addMinutes,
  Ja as countDays,
  Ua as dateToMinutes,
  Za as datesInSameTimeStep,
  Qa as formatDate,
  xa as formatDateLite,
  an as formatMinutes,
  en as formatTime,
  tn as formatTimeLite,
  qa as getPreviousFirstDayOfWeek,
  Na as getWeek,
  Xa as isInRange,
  Ia as isLeapYear,
  Wa as isSameDate,
  Ba as isToday,
  Ka as isValidDate,
  Oa as removeDatePrototypes,
  Ga as stringToDate,
  Pa as subtractDays,
  Aa as subtractHours,
  Ra as subtractMinutes,
  ja as updateTexts,
  za as useLocale
};
