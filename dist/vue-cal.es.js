import { computed as E, reactive as Te, watch as me, toRefs as bt, ref as ce, onBeforeUnmount as Ne, nextTick as Re, inject as Le, createElementBlock as P, openBlock as V, renderSlot as L, createCommentVNode as Z, unref as T, Fragment as de, renderList as pe, normalizeClass as he, createElementVNode as ve, createVNode as je, Transition as Je, withCtx as R, createBlock as Se, resolveDynamicComponent as xe, mergeProps as re, toHandlers as Xe, normalizeProps as ne, onMounted as Ze, toDisplayString as ue, createTextVNode as qe, withModifiers as et, normalizeStyle as ke, TransitionGroup as tt, createSlots as Ce, useTemplateRef as Tt, useId as Mt, useAttrs as Et, provide as at, guardReactiveProps as se } from "vue";
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
}, Yt = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Ge = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], St = Ge.reduce((D, t, c) => (D[t] = c || 7, D), {}), Ct = (D, t, c) => {
  const { dateUtils: o } = D, p = !1, w = E(() => {
    if (A.value[t.view]) return t.view;
    const d = t.datePicker ? "month" : "week", m = t.view || d;
    return A.value[m] ? m : (console.warn(
      `Vue Cal: the provided or default view \`${m}\` is either invalid or not in the list of available views. The first available view will be chosen: \`${Object.keys(A.value)[0]}\`.`
    ), Object.keys(A.value)[0]);
  }), B = E(() => t.sm && !t.xs), f = E(() => t.xs || t.datePicker), F = E(() => t.clickToNavigate || t.datePicker && t.clickToNavigate !== !1), v = E(() => {
    const d = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, m = (M) => M.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [M, e] of Object.entries(c)) {
      const [S, z, Q] = M.match(/^on(Cell|Event)(.+)$/) || [];
      S && (d[z.toLowerCase()][m(Q).replace(/^-+|-+$/g, "")] = e);
    }
    return d;
  }), u = E(() => {
    var m;
    const d = {};
    return t.hideWeekends && (d[6] = !0) && (d[7] = !0), (m = t.hideWeekdays) != null && m.length && t.hideWeekdays.forEach((M) => d[St[M]] = !0), d;
  }), y = E(() => t.hideWeekends || u.value[6] && u.value[7]), A = E(() => {
    const d = t.datePicker;
    let m = 0, M = {};
    const e = t.views;
    return d && !e ? {
      month: { ...ge.availableViews.month },
      year: { ...ge.availableViews.year },
      years: { ...ge.availableViews.years }
    } : (e ? (Array.isArray(e) ? M = e.reduce((S, z) => (typeof z == "string" && ge.availableViews[z] ? S[z] = ge.availableViews[z] : m++, S), {}) : typeof e == "object" && (M = Object.entries(e).reduce((S, [z, Q]) => {
      const { cols: U, rows: oe } = ge.availableViews[z];
      return S[z] = { cols: Q.cols || U, rows: Q.rows || oe }, S;
    }, {})), m && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(M).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), M = { ...ge.availableViews })) : M = { ...ge.availableViews }, M);
  }), X = E(() => t.datePicker ? "month" : A.value.week ? "week" : Object.keys(A.value)[0]), a = E(() => {
    if (typeof t.selectedDate == "string") return o.stringToDate(t.selectedDate);
    if (t.selectedDate instanceof Date) return t.selectedDate;
    t.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", t.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), r = E(() => {
    if (!t.disableDays) return [];
    const d = [];
    if (Array.isArray(t.disableDays))
      for (let m of t.disableDays) {
        let M = m;
        typeof m == "string" ? M = o.stringToDate(m) : m instanceof Date && (m = o.formatDate(m, "YYYY-MM-DD")), M instanceof Date && !isNaN(M.getTime()) ? d.push(m) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", m);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", t.disableDays);
    return d;
  }), _ = E(() => {
    let d = null;
    return t.minDate && typeof t.minDate == "string" ? d = o.stringToDate(t.minDate) : t.minDate && t.minDate instanceof Date && (d = t.minDate), (d == null ? void 0 : d.getTime()) || null;
  }), n = E(() => {
    let d = null;
    return t.maxDate && typeof t.maxDate == "string" ? d = o.stringToDate(t.maxDate) : t.maxDate && t.maxDate instanceof Date && (d = t.maxDate), (d == null ? void 0 : d.getTime()) || null;
  }), j = E(() => {
    var M;
    const { view: d } = D;
    return t.schedules.length && (d.isDay || d.isDays || d.isWeek) && ((M = t.schedules) == null ? void 0 : M.map((e, S) => ({ ...e, id: e.id ?? S + 1 }))) || void 0;
  }), l = E(() => {
    const d = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return t.editableEvents === !0 ? d : t.editableEvents === !1 ? Object.keys(d).map((m) => d[m] = !1) : { ...d, ...t.editableEvents };
  }), N = E(() => {
    const { view: d } = D, { eventCount: m } = t;
    return (Array.isArray(m) ? m.includes(d.id) : m) && (d.isMonth && !t.eventsOnMonthView || d.isYear);
  }), k = E(() => t.allDayEvents && t.time !== !1 && !w.isMonth), H = E(() => t.timeAtCursor && t.time !== !1), O = async (d) => {
    var M;
    let m = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((e) => e.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((e) => e.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((e) => e.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((e) => e.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((e) => e.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((e) => e.default), "../i18n/da.json": () => import("./i18n/da.js").then((e) => e.default), "../i18n/de.json": () => import("./i18n/de.js").then((e) => e.default), "../i18n/el.json": () => import("./i18n/el.js").then((e) => e.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((e) => e.default), "../i18n/en-us.json": () => Promise.resolve().then(() => Ht).then((e) => e.default), "../i18n/es.json": () => import("./i18n/es.js").then((e) => e.default), "../i18n/et.json": () => import("./i18n/et.js").then((e) => e.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((e) => e.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((e) => e.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((e) => e.default), "../i18n/he.json": () => import("./i18n/he.js").then((e) => e.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((e) => e.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((e) => e.default), "../i18n/id.json": () => import("./i18n/id.js").then((e) => e.default), "../i18n/is.json": () => import("./i18n/is.js").then((e) => e.default), "../i18n/it.json": () => import("./i18n/it.js").then((e) => e.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((e) => e.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((e) => e.default), "../i18n/kaa.json": () => import("./i18n/kaa.js").then((e) => e.default), "../i18n/kk.json": () => import("./i18n/kk.js").then((e) => e.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((e) => e.default), "../i18n/ky.json": () => import("./i18n/ky.js").then((e) => e.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((e) => e.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((e) => e.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((e) => e.default), "../i18n/no.json": () => import("./i18n/no.js").then((e) => e.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((e) => e.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((e) => e.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((e) => e.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((e) => e.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((e) => e.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((e) => e.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((e) => e.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((e) => e.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((e) => e.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((e) => e.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((e) => e.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((e) => e.default), "../i18n/uz-cryl.json": () => import("./i18n/uz-cryl.js").then((e) => e.default), "../i18n/uz.json": () => import("./i18n/uz.js").then((e) => e.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((e) => e.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((e) => e.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((e) => e.default) });
    {
      if (!m[`../i18n/${d}.json`]) {
        console.warn(`Vue Cal: the locale \`${d}\` does not exist. Falling back to \`en-us\`.`), d = "en-us";
        return;
      }
      m = await ((M = m[`../i18n/${d}.json`]) == null ? void 0 : M.call(m));
    }
    D.texts = Object.assign(D.texts, Object.assign({ ...ge.texts }, m)), o.updateTexts(D.texts);
  }, K = Te(t.events || []);
  return me(() => t.events, (d) => K.splice(0, K.length, ...d)), me(() => t.locale, (d) => O(d || "en-us")), (t.locale || !D.texts.today) && O(t.locale || "en-us"), {
    ...bt(t),
    events: K,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: v,
    defaultView: X,
    availableViews: A,
    disableDays: r,
    ready: p,
    sm: B,
    xs: f,
    clickToNavigate: F,
    hideWeekdays: u,
    hideWeekends: y,
    minTimestamp: _,
    maxTimestamp: n,
    schedules: j,
    selectedDate: a,
    editableEvents: l,
    showCellEventCount: N,
    allDayEvents: k,
    timeAtCursor: H,
    view: w,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(u.value).length;
    },
    get size() {
      return f.value ? "xs" : B.value ? "sm" : "lg";
    },
    loadTexts: O
  };
}, Oe = (D, t) => {
  const c = t.timeTo - t.timeFrom;
  return (D - t.timeFrom) * 100 / c;
}, He = (D, t) => {
  const c = t.timeTo - t.timeFrom;
  return ~~(D * c / 100 + t.timeFrom);
}, Ke = (D, t) => {
  const c = t.clientHeight;
  return D * 100 / c;
}, Ie = Te({ id: null, date: null });
let nt = !1, Ue = !0;
const we = Te({ el: null, cell: null, timeout: null }), _e = Te({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function Vt(D) {
  const { config: t, view: c, eventsManager: o, emit: p, uid: w, dateUtils: B } = D, f = (_) => {
    var O;
    const { timeStep: n, timeCellHeight: j, timeFrom: l } = t, N = (((O = _.touches) == null ? void 0 : O[0]) || _).clientY, { top: k } = _.currentTarget.getBoundingClientRect(), H = N - k - ~~_.dataTransfer.getData("cursor-grab-at");
    return He(Ke(H, _.currentTarget), t);
  }, F = (_, n, j) => {
    const l = n.duration || v(n.start, n.end) || t.timeStep;
    let N = Math.max(f(_), 0);
    if (t.snapToInterval) {
      const K = N + t.snapToInterval / 2;
      N = K - K % t.snapToInterval;
    }
    const k = new Date(new Date(j).setMinutes(N)), H = Math.min(N + l, 1440), O = new Date(new Date(j).setMinutes(H));
    return { start: k, end: O };
  }, v = (_, n) => Math.round((n - _) / 6e4);
  return {
    eventDragStart: (_, n) => {
      if (_.target.nodeType === 3 || D.touch.isResizingEvent) return _.preventDefault();
      _.dataTransfer.effectAllowed = "move", _.dataTransfer.dropEffect = "move";
      const j = { ...n, _: { id: n._.id, duration: v(n.start, n.end) } };
      try {
        _.dataTransfer.setData("text/plain", ""), _.dataTransfer.setData("event", JSON.stringify(j)), _.dataTransfer.setData("cursor-grab-at", _.offsetY);
      } catch (N) {
        return console.warn("Vue Cal: Failed to set drag data:", N), _.preventDefault();
      }
      _e.eventId = n._.id, _e.fromVueCal = w, p("event-drag-start", {
        e: _,
        event: n
      });
      const l = _.target.closest(".vuecal__event");
      l.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        l.classList.add("vuecal__event--dragging-original"), l.classList.remove("vuecal__event--dragging-ghost");
      }, 0), nt = !1, Object.assign(Ie, { id: c.id, date: c.firstCellDate }), Ue = !0, D.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (_, n) => {
      _e.eventId = null, _.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: j, toVueCal: l } = _e;
      l && j !== l && o.deleteEvent(n._.id, 3), nt && Ue && Ie.id && c.switchView(Ie.id, Ie.date, !0), p("event-drag-end", {
        e: _,
        event: n,
        external: _e.fromVueCal !== w
      }), _e.fromVueCal = null, _e.toVueCal = null, D.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (_, n) => {
      const { start: j } = n, l = _.currentTarget;
      if (!_.currentTarget.contains(_.relatedTarget)) {
        if (l === we.el || !l.className.includes("vuecal__cell-content")) return !1;
        we.el && (we.cell.highlighted = !1), Object.assign(we, { el: l, cell: n, timeout: clearTimeout(we.timeout) }), n.highlighted = !0, ["years", "year", "month"].includes(c.id) && (we.timeout = setTimeout(() => D.switchToNarrowerView(j), 2e3));
      }
    },
    cellDragOver: (_, n) => {
      const { start: j, schedule: l } = n;
      _.preventDefault(), n.highlighted = !0, (l || l === 0) && (n.highlightedSchedule = l);
    },
    cellDragLeave: (_, n) => {
      _.preventDefault(), !_.currentTarget.contains(_.relatedTarget) && (n.highlightedSchedule = !1, we.cell === n && (clearTimeout(we.timeout), Object.assign(we, { el: null, cell: null, timeout: null }), n.highlighted = !1));
    },
    cellDragDrop: async (_, n, j = !1) => {
      var M, e, S;
      _.preventDefault(), clearTimeout(we.timeout), Object.assign(we, { el: null, cell: null, timeout: null });
      const l = JSON.parse(_.dataTransfer.getData("event") || "{}");
      l.start && (l.start = new Date(l.start)), l.end && (l.end = new Date(l.end));
      let N, k, H;
      j ? (k = new Date(n.start), H = new Date(n.end)) : { start: k, end: H } = F(_, l, n.start);
      const { schedule: O } = ((M = _.target.closest("[data-schedule]")) == null ? void 0 : M.dataset) || {};
      let K = () => {
      };
      _e.fromVueCal === w ? (N = o.getEvent(l._.id), N && (N._.dragging = !1, K = (z) => {
        if (N.start = k, N.end = H, N.allDay = j, O !== void 0 && (N.schedule = ~~O), z && typeof z == "object") {
          const { _: Q, ...U } = z;
          Object.assign(N, U);
        }
      })) : (N = {
        ...l,
        start: k,
        end: H,
        ...O !== void 0 && { schedule: ~~O },
        _: { id: ((e = l._) == null ? void 0 : e.id) || l.id, duration: v(k, H) },
        getOverlappingEvents: () => o.getEventsInRange(k, H, { schedule: ~~O })
      }, K = (z) => {
        if (N = o.createEvent(N), z && typeof z == "object") {
          const { _: Q, ...U } = z;
          Object.assign(N, U);
        }
      });
      let d = !0;
      const { drop: m } = (S = t.eventListeners) == null ? void 0 : S.event;
      m && (d = await m({
        e: _,
        event: { ...N, start: k, end: H, schedule: ~~O },
        overlaps: N.getOverlappingEvents({ start: k, end: H, schedule: ~~O }),
        cell: n,
        external: _e.fromVueCal !== w
      })), d !== !1 && K(d), n.highlighted = !1, n.highlightedSchedule = null, Ue = !1, _e.toVueCal = w, p("event-dropped", {
        e: _,
        cell: n,
        event: N,
        originalEvent: l,
        external: _e.fromVueCal !== w
      });
    }
  };
}
const lt = (D, t) => {
  let c, o, p, w = {}, B = {};
  const f = ce(D), F = () => {
    f.value.today || (f.value = t), Date.prototype.addDays = function(s) {
      return A(this, s || 0);
    }, Date.prototype.subtractDays = function(s) {
      return X(this, s || 0);
    }, Date.prototype.addHours = function(s) {
      return a(this, s || 0);
    }, Date.prototype.subtractHours = function(s) {
      return r(this, s || 0);
    }, Date.prototype.addMinutes = function(s) {
      return _(this, s || 0);
    }, Date.prototype.subtractMinutes = function(s) {
      return n(this, s || 0);
    }, Date.prototype.getWeek = function() {
      return l(this);
    }, Date.prototype.isToday = function() {
      return N(this);
    }, Date.prototype.isLeapYear = function() {
      return O(this);
    }, Date.prototype.format = function(s = "YYYY-MM-DD") {
      return z(this, s);
    }, Date.prototype.formatTime = function(s = "HH:mm") {
      return U(this, s);
    };
  }, v = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, u = (s) => {
    f.value = s, Date.prototype.subtractDays && F();
  }, y = () => (o !== (/* @__PURE__ */ new Date()).getDate() && (c = /* @__PURE__ */ new Date(), o = c.getDate(), p = `${c.getFullYear()}-${c.getMonth()}-${c.getDate()}`), p), A = (s, $) => {
    const h = new Date(s.valueOf());
    return h.setDate(h.getDate() + $), h;
  }, X = (s, $) => {
    const h = new Date(s.valueOf());
    return h.setDate(h.getDate() - $), h;
  }, a = (s, $) => {
    const h = new Date(s.valueOf());
    return h.setHours(h.getHours() + $), h;
  }, r = (s, $) => {
    const h = new Date(s.valueOf());
    return h.setHours(h.getHours() - $), h;
  }, _ = (s, $) => {
    const h = new Date(s.valueOf());
    return h.setMinutes(h.getMinutes() + $), h;
  }, n = (s, $) => {
    const h = new Date(s.valueOf());
    return h.setMinutes(h.getMinutes() - $), h;
  }, j = (s, $) => {
    const h = (G) => {
      const x = G % $;
      return x !== 0 && (G += x >= $ / 2 ? $ - x : -x), G;
    };
    if (typeof s == "number") return h(s);
    if (s instanceof Date) {
      let G = h(s.getMinutes());
      G >= 60 && (s.setHours(s.getHours() + 1), G = 0), s.setMinutes(G, 0, 0);
    }
  }, l = (s, $ = !1) => {
    const h = new Date(Date.UTC(s.getFullYear(), s.getMonth(), s.getDate())), G = h.getUTCDay() || 7;
    h.setUTCDate(h.getUTCDate() + 4 - G);
    const x = new Date(Date.UTC(h.getUTCFullYear(), 0, 1));
    return Math.ceil(((h - x) / 864e5 + 1) / 7) + ($ ? 1 : 0);
  }, N = (s) => `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}` === y(), k = (s, $) => {
    if (!s || !$) return console.warn(`Vue Cal: missing date${s ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (S(s)) {
      if (!S($)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${$}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${s}\`.`);
    return s.getFullYear() === $.getFullYear() && s.getMonth() === $.getMonth() && s.getDate() === $.getDate();
  }, H = (s, $, h) => S(s) ? s.getTime() >= $ && s.getTime() <= h : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${s}\`.`), O = (s) => {
    const $ = s.getFullYear();
    return !($ % 400) || $ % 100 && !($ % 4);
  }, K = (s = null, $) => {
    const h = s && new Date(s.valueOf()) || /* @__PURE__ */ new Date(), G = $ ? 7 : 6;
    return h.setDate(h.getDate() - (h.getDay() + G) % 7), h;
  }, d = (s) => s instanceof Date ? s : (s.length === 10 && (s += " 00:00"), new Date(s.replace(/-/g, "/"))), m = (s) => s.getHours() * 60 + s.getMinutes(), M = (s, $) => {
    typeof s == "string" && (s = s.replace(/-/g, "/")), typeof $ == "string" && ($ = $.replace(/-/g, "/")), s = new Date(s).setHours(0, 0, 0, 0), $ = new Date($).setHours(0, 0, 1, 0);
    const h = (new Date($).getTimezoneOffset() - new Date(s).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil(($ - s - h) / (24 * 3600 * 1e3));
  }, e = (s, $, h) => Math.abs(s.getTime() - $.getTime()) <= h * 60 * 1e3, S = (s) => s && s instanceof Date && !isNaN(s), z = (s, $ = "YYYY-MM-DD", h = null) => {
    if (h || (h = f.value), $ || ($ = "YYYY-MM-DD"), $ === "YYYY-MM-DD") return Q(s);
    w = {}, B = {};
    const G = {
      YYYY: () => ae(s, h).YYYY,
      YY: () => ae(s, h).YY(),
      M: () => ae(s, h).M,
      MM: () => ae(s, h).MM(),
      MMM: () => ae(s, h).MMM(),
      MMMM: () => ae(s, h).MMMM(),
      MMMMG: () => ae(s, h).MMMMG(),
      D: () => ae(s, h).D,
      DD: () => ae(s, h).DD(),
      S: () => ae(s, h).S(),
      d: () => ae(s, h).d,
      dd: () => ae(s, h).dd(),
      ddd: () => ae(s, h).ddd(),
      dddd: () => ae(s, h).dddd(),
      HH: () => ie(s, h).HH,
      H: () => ie(s, h).H,
      hh: () => ie(s, h).hh,
      h: () => ie(s, h).h,
      am: () => ie(s, h).am,
      AM: () => ie(s, h).AM,
      mm: () => ie(s, h).mm,
      m: () => ie(s, h).m,
      s: () => ie(s, h).s
    };
    return $.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (x, ye) => {
      const i = G[ye.replace(/\{|\}/g, "")];
      return i !== void 0 ? i() : ye;
    });
  }, Q = (s) => {
    const $ = s.getMonth() + 1, h = s.getDate();
    return `${s.getFullYear()}-${$ < 10 ? "0" : ""}${$}-${h < 10 ? "0" : ""}${h}`;
  }, U = (s, $ = "HH:mm", h = null, G = !1) => {
    let x = !1;
    if (G) {
      const [Y, C, b] = [s.getHours(), s.getMinutes(), s.getSeconds()];
      Y + C + b === 141 && (x = !0);
    }
    if (s instanceof Date && $ === "HH:mm") return x ? "24:00" : oe(s);
    B = {}, h || (h = f.value);
    const ye = ie(s, h), i = $.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (Y, C) => {
      const b = ye[C.replace(/\{|\}/g, "")];
      return b !== void 0 ? b : C;
    });
    return x ? i.replace("23:59", "24:00") : i;
  }, oe = (s) => {
    const $ = s.getHours(), h = s.getMinutes();
    return `${($ < 10 ? "0" : "") + $}:${(h < 10 ? "0" : "") + h}`;
  }, q = (s) => {
    const $ = Math.floor(s / 60).toString().padStart(2, 0), h = (s % 60).toString().padStart(2, 0);
    return `${$}:${h}`;
  }, $e = (s) => {
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
    if (w.D) return w;
    const h = s.getFullYear(), G = s.getMonth() + 1, x = s.getDate(), i = (s.getDay() - 1 + 7) % 7;
    return w = {
      // Year.
      YYYY: h,
      // 2024.
      YY: () => h.toString().substring(2),
      // 24.
      // Month.
      M: G,
      // 1 to 12.
      MM: () => G.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => $.months[G - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => $.months[G - 1],
      // January to December.
      MMMMG: () => ($.monthsGenitive || $.months)[G - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: x,
      // 1 to 31.
      DD: () => x.toString().padStart(2, 0),
      // 01 to 31.
      S: () => $e(x),
      // st, nd, rd, th.
      // Day of the week.
      d: i + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => $.weekDaysShort.length ? $.weekDaysShort[i] : $.weekDays[i][0],
      // M to S.
      ddd: () => $.weekDaysShort.length ? $.weekDaysShort[i] : $.weekDays[i].substr(0, 3),
      // Mon to Sun.
      dddd: () => $.weekDays[i]
      // Monday to Sunday.
    }, w;
  }, ie = (s, $) => {
    if (B.am) return B;
    let h, G, x;
    s instanceof Date ? (h = s.getHours(), G = s.getMinutes(), x = s.getSeconds()) : (h = Math.floor(s / 60), G = Math.floor(s % 60));
    const ye = h % 12 ? h % 12 : 12, i = ($ || { am: "am", pm: "pm" })[h === 24 || h < 12 ? "am" : "pm"];
    return B = {
      H: h,
      h: ye,
      HH: h.toString().padStart(2, 0),
      hh: ye.toString().padStart(2, 0),
      am: i,
      AM: i.toUpperCase(),
      m: G,
      mm: G.toString().padStart(2, 0),
      s: x
    }, B;
  };
  return {
    addDatePrototypes: F,
    removeDatePrototypes: v,
    updateTexts: u,
    addDays: A,
    subtractDays: X,
    addHours: a,
    subtractHours: r,
    addMinutes: _,
    subtractMinutes: n,
    snapToInterval: j,
    getWeek: l,
    isToday: N,
    isSameDate: k,
    isInRange: H,
    isLeapYear: O,
    getPreviousFirstDayOfWeek: K,
    stringToDate: d,
    dateToMinutes: m,
    countDays: M,
    datesInSameTimeStep: e,
    isValid: S,
    formatDate: z,
    formatDateLite: Q,
    formatTime: U,
    formatTimeLite: oe,
    formatMinutes: q
  };
}, Ot = (D) => {
  const { dateUtils: t, config: c } = D;
  let o = 0;
  const p = E(() => {
    var _, n, j, l, N;
    const a = {
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
    }, r = c.events.slice().sort((k, H) => k.start - H.start < 0 ? -1 : 1);
    for (let k of r) {
      const H = typeof k.start == "string" || typeof k.end == "string", O = !((_ = k._) != null && _.register) || !k.isOverlapping || !k.delete;
      let K = !1;
      if (!H && ((n = k._) != null && n.cachedStart) && ((j = k._) != null && j.cachedEnd) && (K = k.start.getTime() !== ((l = k._) == null ? void 0 : l.cachedStart) || k.end.getTime() !== ((N = k._) == null ? void 0 : N.cachedEnd)), H || O || K) {
        if (!w(k)) continue;
        B(k), k._.cachedStart = k.start.getTime(), k._.cachedEnd = k.end.getTime();
      }
      if (a.byId[k._.id] = k, k.recurring)
        a.recurring.push(k._.id);
      else if (!t.isSameDate(k.start, new Date(k.end.getTime() - 1)))
        k._.multiday = c.multidayEvents, c.multidayEvents ? a.multiday.push(k._.id) : (console.info("Vue Cal: Multi-day events provided without being enabled. Truncating event end to next midnight."), k.end = new Date(new Date(k.start).setHours(23, 59, 59, 999)), B(k)), a.byDate[k._.startFormatted] || (a.byDate[k._.startFormatted] = []), a.byDate[k._.startFormatted].push(k._.id);
      else {
        a.byDate[k._.startFormatted] || (a.byDate[k._.startFormatted] = []), a.byDate[k._.startFormatted].push(k._.id);
        const d = k._.startFormatted.substring(0, 4), m = k._.startFormatted.substring(5, 7), M = k._.startFormatted.substring(8, 10);
        a.byYear[d] || (a.byYear[d] = {}), a.byYear[d][m] || (a.byYear[d][m] = {}), a.byYear[d][m][M] || (a.byYear[d][m][M] = []), a.byYear[d][m][M].push(k._.id);
      }
    }
    return a;
  }), w = (a) => !a.start || !a.end ? (console.error("Vue Cal: Event is missing start or end date", a), !1) : (typeof a.start == "string" && (a.start = t.stringToDate(a.start)), typeof a.end == "string" && (a.end = t.stringToDate(a.end)), a.start.setSeconds(0, 0), a.end.getSeconds() === 59 ? a.end.setMinutes(a.end.getMinutes() + 1, 0, 0) : a.end.setSeconds(0, 0), isNaN(a.start) || isNaN(a.end) || a.end.getTime() < a.start.getTime() ? (isNaN(a.start) ? console.error(`Vue Cal: invalid start date for event "${a.title}".`, a.start) : isNaN(a.end) ? console.error(`Vue Cal: invalid end date for event "${a.title}".`, a.end) : console.error(`Vue Cal: invalid event dates for event "${a.title}". The event ends before it starts.`, a.start, a.end), !1) : !0), B = (a) => {
    a._ || (a._ = {}), a._.id = a._.id || ++o, a._.multiday = !t.isSameDate(a.start, new Date(a.end.getTime() - 1)), a._.startFormatted = t.formatDate(a.start), a._.endFormatted = t.formatDate(a.end), a._.startMinutes = ~~t.dateToMinutes(a.start), a._.endMinutes = ~~t.dateToMinutes(a.end);
    const r = a.start.getHours(), _ = a.start.getMinutes().toString().padStart(2, 0), n = a.end.getHours(), j = a.end.getMinutes().toString().padStart(2, 0);
    a._.startTimeFormatted24 = `${r.toString().padStart(2, 0)}:${_}`, a._.startTimeFormatted12 = `${r % 12 || 12}${_ ? `:${_}` : ""} ${r < 12 ? "AM" : "PM"}`, a._.endTimeFormatted24 = `${n.toString().padStart(2, 0)}:${j}`, a._.endTimeFormatted12 = `${n % 12 || 12}${j ? `:${j}` : ""} ${n < 12 ? "AM" : "PM"}`, a._.duration = Math.abs(~~((a.end - a.start) / 6e4)), a.delete || (a.delete = function(l) {
      return u(this._.id, l);
    }), a._.deleting === void 0 && (a._.deleting = !1), a._.deleted === void 0 && (a._.deleted = !1), a.isOverlapping || (a.isOverlapping = function(l = null) {
      return this.getOverlappingEvents(l).length;
    }), a.getOverlappingEvents || (a.getOverlappingEvents = function(l = null) {
      var O;
      const N = (l == null ? void 0 : l.start) || this.start, k = (l == null ? void 0 : l.end) || this.end, H = (O = c.schedules) != null && O.length ? ~~((l == null ? void 0 : l.schedule) || this.schedule) : null;
      return A(N, k, { excludeIds: [this._.id], schedule: H });
    }), a._.register || (a._.register = (l) => {
      a._.$el = l, a._.fireCreated && (D.emit("event-created", a), delete a._.fireCreated);
    }), a._.unregister || (a._.unregister = () => {
      a._.$el = null, a._.register = null, a.isOverlapping = null, a.getOverlappingEvents = null, a.delete = null;
    });
  }, f = (a) => p.value.byId[a], F = (a) => {
    const r = [];
    for (const { start: _, end: n } of a) {
      const j = A(_, n);
      j.length && r.push(...j);
    }
    return r;
  }, v = (a) => {
    if (!a.start || !a.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return c.snapToInterval && (t.snapToInterval(a.start, c.snapToInterval), t.snapToInterval(a.end, c.snapToInterval)), a = { ...a }, a._ || (a._ = {}), a._.id = ++o, a._.fireCreated = !0, c.events.push(a), a;
  }, u = async (a, r = 0) => {
    var N, k;
    if (!a) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let _ = typeof a == "string" || !isNaN(a) ? a : null;
    const n = typeof a == "object" ? Object.entries(a) : null;
    if (n) {
      const [H, O] = n[0];
      _ = (N = c.events.find((K) => K[H] === O)) == null ? void 0 : N._.id;
    }
    if (!c.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!_) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const j = c.events.findIndex((H) => H._.id === _);
    if (j === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${_}\`.`);
    const l = c.events[j];
    if (l.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${_}\` since it was explicitely set to \`delete: false\`.`);
    switch (r) {
      case 0:
        l._.deleting ? c.events.splice(j, 1) : l._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        l._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        l._.deleted = !0, c.events[j]._.deleted = !0, (k = l._.$el) == null || k.dispatchEvent(new CustomEvent("event-deleted", { detail: l._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        c.events.splice(j, 1), D.emit("update:events", c.events), D.emit("event-delete", l);
        break;
    }
    return !0;
  }, y = (a, r, _) => {
    const n = c.allDayEvents ? { allDay: _ } : {}, j = A(a, r, { background: !1, ...n });
    if (!j.length) return { cellOverlaps: {}, longestStreak: 0 };
    const l = {};
    let N = [], k = 0;
    j.sort((H, O) => H.start - O.start || H.end - H.start - (O.end - O.start));
    for (const H of j) {
      const O = H._.id;
      l[O] || (l[O] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), N = N.filter((e) => e.end > H.start);
      const K = N.filter((e) => {
        var z;
        return (!((z = c.schedules) != null && z.length) || H.schedule === e.schedule) && e.start < H.end;
      }), d = new Set(K.map((e) => {
        var S;
        return ((S = l[e._.id]) == null ? void 0 : S.position) ?? 0;
      }));
      let m = 0;
      for (; d.has(m); ) m++;
      l[O].position = m, N.push(H);
      const M = Math.max(1, ...K.map((e) => {
        var S;
        return ((S = l[e._.id]) == null ? void 0 : S.maxConcurrent) ?? 1;
      }));
      l[O].maxConcurrent = Math.max(K.length + 1, M);
      for (const e of K)
        l[e._.id].overlaps.add(O), l[O].overlaps.add(e._.id), l[e._.id].maxConcurrent = l[O].maxConcurrent;
      k = Math.max(k, l[O].maxConcurrent);
    }
    for (const H in l) l[H].overlaps = [...l[H].overlaps];
    return { cellOverlaps: l, longestStreak: k };
  }, A = (a, r, { excludeIds: _ = [], schedule: n = null, background: j = !0, allDay: l = !1 } = {}) => {
    if (!Object.keys(p.value.byId).length) return [];
    const N = a.getFullYear(), k = r.getFullYear(), H = a.getMonth() + 1, O = r.getMonth() + 1, K = a.getDate(), d = r.getDate();
    a.getTime(), r.getTime();
    const m = a.setHours(0, 0, 0, 0), M = r.setHours(23, 59, 59, 999), e = new Set(_), S = [];
    if (Object.keys(p.value.byId).length <= 100) {
      for (const z of Object.values(p.value.byId))
        !z || e.has(z._.id) || n !== null && n !== z.schedule || j === !1 && z.background || c.allDayEvents && (l && !z.allDay || !l && z.allDay) || z.start.getTime() < M && z.end.getTime() > m && S.push(z);
      return S;
    }
    for (let z = N; z <= k; z++) {
      const Q = `${z}`, U = p.value.byYear[Q];
      if (!U) continue;
      const oe = z === N ? H : 1, q = z === k ? O : 12;
      for (let $e = oe; $e <= q; $e++) {
        const ae = String($e).padStart(2, "0"), ie = U[ae];
        if (ie)
          for (const s in ie) {
            const $ = +s;
            if ($ > d || $ < K) continue;
            const h = ie[s];
            if (h != null && h.length)
              for (let G = 0; G < h.length; G++) {
                const x = p.value.byId[h[G]];
                !x || e.has(x._.id) || n !== null && n !== x.schedule || j === !1 && x.background || c.allDayEvents && (l && !x.allDay || !l && x.allDay) || x.start.getTime() < M && x.end.getTime() > m && S.push(x);
              }
          }
      }
    }
    return S;
  };
  return {
    events: p,
    getEvent: f,
    getViewEvents: F,
    getCellOverlappingEvents: y,
    getEventsInRange: A,
    createEvent: v,
    deleteEvent: u,
    isEventInRange: (a, r, _) => {
      const n = a.allDay || !c.time, j = n ? new Date(a.start).setHours(0, 0, 0, 0) : a.start.getTime(), l = n ? new Date(a.end).setHours(23, 59, 59, 999) : a.end.getTime(), N = n ? new Date(r).setHours(0, 0, 0, 0) : r.getTime(), k = n ? new Date(_).setHours(23, 59, 59, 999) : _.getTime();
      return l > N && j < k;
    }
  };
}, jt = ({ config: D, dateUtils: t, emit: c, texts: o, eventsManager: p }, w) => {
  const { availableViews: B } = D, f = ce(D.view && B[D.view] ? D.view : D.defaultView), F = ce(D.selectedDate || null), v = ce(/* @__PURE__ */ new Date()), u = ce(new Date(D.viewDate || v.value));
  u.value.setHours(0, 0, 0, 0);
  const y = ce(new Date(u));
  let A = null;
  const X = E(() => f.value === "month" ? y.value : O.value), a = E(() => f.value === "month" ? new Date(y.value.getFullYear(), y.value.getMonth() + 1, 0, 23, 59, 59, 999) : d.value), r = E(() => f.value === "week" ? t.getPreviousFirstDayOfWeek(O.value, D.startWeekOnSunday) : f.value === "month" ? O.value : X.value), _ = E(() => {
    if (f.value === "week") {
      const g = t.addDays(r.value, 7);
      return g.setMilliseconds(-1), g;
    }
    return f.value === "month" ? d.value : a.value;
  }), n = E(() => {
    const g = v.value.getTime();
    if (f.value === "week")
      return r.value.getTime() <= g && g <= _.value.getTime();
    const I = O.value.getTime(), te = d.value.getTime();
    return I <= g && g <= te;
  });
  function j() {
    v.value = /* @__PURE__ */ new Date(), A = setTimeout(j, 60 * 1e3);
  }
  function l() {
    A = setTimeout(j, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), j();
  }
  const N = E(() => {
    if (!D.availableViews[f.value]) return 1;
    let g = D.availableViews[f.value].cols;
    return D.hasHiddenDays && ["week", "month"].includes(f.value) && (g -= D.hasHiddenDays), g;
  }), k = E(() => {
    var g;
    return ((g = D.availableViews[f.value]) == null ? void 0 : g.rows) || 1;
  }), H = E(() => N.value * k.value), O = E(() => {
    if (f.value === "month") {
      let g = y.value.getDay() || 7;
      return D.startWeekOnSunday && !D.hideWeekdays[7] && (g += 1), D.viewDayOffset && (g -= D.viewDayOffset), t.subtractDays(y.value, g - 1);
    }
    if (f.value === "week") {
      const g = "1234567".split("").filter((te) => !Object.keys(D.hideWeekdays).includes(te));
      let I = Math.min(...g);
      return D.startWeekOnSunday && !D.hideWeekdays[7] && (I = 1), D.viewDayOffset && (I += D.viewDayOffset), t.addDays(y.value, I - 1);
    }
    return y.value;
  }), K = E(() => {
    const g = [], I = ["days", "week", "month"].includes(f.value);
    let te = 0;
    for (let ee = 0; ee < H.value + te; ee++)
      switch (f.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const fe = t.addDays(O.value, ee), Be = fe.getDay() || 7;
          if (I && D.hasHiddenDays && D.hideWeekdays[Be]) {
            te++;
            continue;
          }
          const Ve = new Date(fe);
          Ve.setHours(23, 59, 59, 999), g.push({ start: fe, startFormatted: t.formatDate(fe), end: Ve });
          break;
        }
        case "year":
          g.push({
            start: new Date(O.value.getFullYear(), ee, 1, 0, 0, 0, 0),
            end: new Date(O.value.getFullYear(), ee + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          g.push({
            start: new Date(O.value.getFullYear() + ee, 0, 1, 0, 0, 0, 0),
            end: new Date(O.value.getFullYear() + ee + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return g;
  }), d = E(() => K.value[K.value.length - 1].end), m = ce("right"), M = E(() => {
    const g = Object.keys(D.availableViews);
    return g[g.indexOf(f.value) + 1];
  }), e = E(() => {
    const g = Object.keys(D.availableViews);
    return g[g.indexOf(f.value) - 1];
  });
  function S(g, I, te = !1) {
    if (!I || !I[g]) return g + 1;
    const ee = I[g];
    return te && typeof ee == "string" ? ee.substring(0, 3) : ee;
  }
  function z(g, I, te) {
    const { monthsArray: ee, monthBeforeDay: fe, canTruncate: Be, xs: Ve } = te, Me = g.getMonth(), Ee = g.getFullYear(), Ye = I.getMonth(), ze = I.getFullYear(), We = Me !== Ye, $t = Ee !== ze, be = Be && (Ve || We), Pe = g.getDate(), Fe = I.getDate();
    return $t ? fe ? `${S(Me, ee, be)} ${Pe}, ${Ee} - ${S(Ye, ee, be)} ${Fe}, ${ze}` : `${Pe} ${S(Me, ee, be)} ${Ee} - ${Fe} ${S(Ye, ee, be)} ${ze}` : We ? fe ? `${S(Me, ee, be)} ${Pe} - ${S(Ye, ee, be)} ${Fe}, ${Ee}` : `${Pe} ${S(Me, ee, be)} - ${Fe} ${S(Ye, ee, be)} ${Ee}` : fe ? `${S(Me, ee, be)} ${Pe}-${Fe}, ${Ee}` : `${Pe}-${Fe} ${S(Me, ee, be)} ${Ee}`;
  }
  const Q = E(() => {
    const { dateFormat: g, months: I, monthsGenitive: te, week: ee, truncations: fe } = o, Be = D.locale, Ve = fe !== !1, Me = g.indexOf("M") < g.indexOf("D"), Ee = te && Be === "el" ? te : I;
    switch (f.value) {
      case "day":
        return t.formatDate(O.value, g);
      case "days":
      case "week": {
        const Ye = {
          monthsArray: Ee,
          monthBeforeDay: Me,
          canTruncate: Ve,
          xs: D.xs
        };
        let ze = z(O.value, d.value, Ye);
        if (f.value === "week") {
          const We = t.getWeek(
            O.value,
            D.startWeekOnSunday && !D.hideWeekdays[7]
          );
          ze += ` <small>${ee} ${We}</small>`;
        }
        return ze;
      }
      case "month": {
        const Ye = `${D.xs && Ve ? "MMM" : "MMMM"} YYYY`;
        return t.formatDate(X.value, Ye);
      }
      case "year":
        return O.value.getFullYear();
      case "years":
        return `${O.value.getFullYear()} - ${a.value.getFullYear()}`;
    }
  });
  async function U() {
    switch (y.value = new Date(u.value || v.value), y.value.setHours(0, 0, 0, 0), f.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        y.value = t.getPreviousFirstDayOfWeek(y.value, D.startWeekOnSunday && !D.hideWeekdays[7]);
        break;
      case "month":
        y.value = new Date(y.value.getFullYear(), y.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        y.value = new Date(y.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        y.value = new Date(y.value.getFullYear() - y.value.getFullYear() % H.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    v.value = /* @__PURE__ */ new Date(), D.ready && (await Re(), c("view-change", {
      id: f.value,
      title: Q.value,
      start: X.value,
      end: a.value,
      extendedStart: r.value,
      extendedEnd: _.value,
      cellDates: K.value,
      containsToday: n.value,
      events: J.value
    }));
  }
  function oe(g) {
    const I = f.value, te = D.availableViews[I];
    g[I] && JSON.stringify(g[I]) === JSON.stringify(te) || U();
  }
  function q(g, I = !0) {
    const te = Object.keys(D.availableViews);
    f.value !== g && (te.includes(g) ? (m.value = te.indexOf(g) < te.indexOf(f.value) ? "left" : "right", f.value = g, I && c("update:view", g), U()) : console.warn(`Vue Cal: the \`${g}\` view is not available.`));
  }
  function $e() {
    M.value ? q(M.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function ae() {
    e.value ? q(e.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function ie() {
    $(!1);
  }
  function s() {
    $(!0);
  }
  function $(g = !0) {
    let I = new Date(u.value);
    switch (f.value) {
      case "day":
      case "days":
        g ? I = t.addDays(d.value, 1) : I = t.subtractDays(O.value, H.value);
        break;
      case "week": {
        g ? (I = t.addDays(_.value, 1), I.setHours(0, 0, 0, 0)) : I = t.subtractDays(r.value, H.value);
        break;
      }
      case "month": {
        const te = g ? 1 : -1;
        I = new Date(I.getFullYear(), I.getMonth() + te, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const te = g ? 1 : -1;
        I = new Date(I.getFullYear() + te, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const te = g ? H.value : -H.value;
        I = new Date(I.getFullYear() + te, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    G(I);
  }
  function h() {
    const g = /* @__PURE__ */ new Date();
    g.setHours(0, 0, 0, 0), G(g);
  }
  function G(g, I = !0, te = !1) {
    if (!t.isValid(g)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [ee, fe] = [O.value, d.value];
    f.value === "month" && ([ee, fe] = [X.value, a.value]), (!t.isInRange(g, ee, fe) || te) && (g.setHours(0, 0, 0, 0), m.value = g.getTime() < ee.getTime() ? "left" : "right", u.value = g, I && c("update:viewDate", g), U());
  }
  function x(g, I = !0) {
    if (!t.isValid(g)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: te, isSameDate: ee } = t;
    (!F.value || !te(F.value) || !ee(g, F.value)) && (g.setHours(0, 0, 0, 0), F.value = g, I && c("update:selectedDate", g));
  }
  function ye(g) {
    !g && !y.value.getDay() ? G(t.addDays(y.value, 1), !0, !0) : (m.value = "left", U());
  }
  function i(g) {
    g && D.startWeekOnSunday && !y.value.getDay() ? G(t.addDays(y.value, 1), !0, !0) : !g && D.startWeekOnSunday && y.value.getDay() === 1 && G(t.subtractDays(y.value, 1), !0, !0);
  }
  function Y() {
    console.log("toggling weekdays", D.hideWeekdays), U();
  }
  function C(g) {
    var ee;
    const I = (ee = w.value) == null ? void 0 : ee.querySelector(".vuecal__scrollable"), te = g ? g * D.timeCellHeight / D.timeStep : 0;
    I == null || I.scrollTo({ top: te, behavior: "smooth" });
  }
  function b() {
    const g = /* @__PURE__ */ new Date();
    C(g.getHours() * 60 + g.getMinutes());
  }
  function W() {
    C(0);
  }
  const J = E(() => p.getViewEvents(K.value)), le = p.createEvent, De = p.deleteEvent;
  return me(() => D.view, (g) => q(g, !1)), me(() => D.availableViews, oe), me(() => D.datePicker, () => q("month")), me(() => D.viewDate, (g) => G(g, !1)), me(() => D.selectedDate, (g) => x(g, !1)), me(() => D.startWeekOnSunday, (g) => ye(g)), me(() => D.hideWeekends, (g) => i(g)), me(() => D.hideWeekdays, Y), me(() => H.value, () => {
    H.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), me(() => D.watchRealTime, (g) => {
    g && D.time ? l() : A = clearTimeout(A);
  }), U(), D.time && D.watchRealTime && l(), Ne(() => A = clearTimeout(A)), {
    now: v,
    id: f,
    broaderView: M,
    narrowerView: e,
    title: Q,
    viewDate: u,
    start: X,
    end: a,
    extendedStart: r,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: _,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: O,
    lastCellDate: d,
    containsToday: n,
    selectedDate: F,
    cellDates: K,
    cols: N,
    rows: k,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: J,
    transitionDirection: m,
    switch: q,
    broader: $e,
    narrower: ae,
    previous: ie,
    next: s,
    navigate: $,
    goToToday: h,
    updateViewDate: G,
    updateSelectedDate: x,
    scrollToCurrentTime: b,
    scrollToTime: C,
    scrollTop: W,
    createEvent: le,
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
}, Symbol.toStringTag, { value: "Module" })), Ae = Te({
  texts: { ...ge.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: lt(ge.texts, Qe)
  // Some Date utils functions need localized texts.
}), Lt = ({ props: D, emit: t, attrs: c, vuecalEl: o, uid: p }) => {
  const w = Te({
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
      isResizingEvent: !1
    }
  });
  return w.dateUtils = lt(Object.assign(ge.texts, w.texts), Qe), w.config = Ct(w, D, c), w.eventsManager = Ot(w), w.view = jt(w, o), w.dnd = Vt(w), w;
}, zt = 1440, Pt = {
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
  timeTo: { type: Number, default: zt },
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
}, Wt = { class: "vuecal__transition-wrap" }, It = ["disabled", "innerHTML"], Rt = {
  __name: "header",
  setup(D) {
    const t = Le("vuecal"), { view: c, config: o } = t, p = () => {
      o.clickToNavigate && c.broader();
    }, w = E(() => o.clickToNavigate ? { click: p } : {});
    return (B, f) => (V(), P("div", Ft, [
      L(B.$slots, "header", {
        view: T(c),
        availableViews: T(o).availableViews,
        vuecal: T(t)
      }),
      B.$slots.header ? Z("", !0) : (V(), P(de, { key: 0 }, [
        T(o).viewsBar ? (V(), P("div", At, [
          (V(!0), P(de, null, pe(T(o).availableViews, (F, v) => (V(), P("button", {
            class: he(["vuecal__view-button", { "vuecal__view-button--active": T(c).id === v }]),
            onClick: (u) => T(c).switch(v),
            innerHTML: T(t).texts[v],
            type: "button"
          }, null, 10, Nt))), 256))
        ])) : Z("", !0),
        T(o).titleBar ? (V(), P("nav", Bt, [
          ve("button", {
            class: he(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !B.$slots["previous-button"] }]),
            onClick: f[0] || (f[0] = (...F) => T(c).previous && T(c).previous(...F)),
            type: "button"
          }, [
            L(B.$slots, "previous-button")
          ], 2),
          ve("div", Wt, [
            je(Je, {
              name: `vuecal-slide-fade--${T(c).transitionDirection}`
            }, {
              default: R(() => [
                (V(), P("div", {
                  key: T(c).id + T(c).start.getTime()
                }, [
                  B.$slots.title || B.$slots[`title.${T(c).id}`] ? (V(), Se(xe(T(o).clickToNavigate && T(c).broaderView ? "button" : "div"), re({
                    key: 0,
                    class: "vuecal__title"
                  }, Xe(w.value)), {
                    default: R(() => [
                      B.$slots[`title.${T(c).id}`] ? L(B.$slots, `title.${T(c).id}`, ne(re({ key: 0 }, T(c)))) : L(B.$slots, "title", ne(re({ key: 1 }, T(c))))
                    ]),
                    _: 3
                  }, 16)) : (V(), Se(xe(T(o).clickToNavigate && T(c).broaderView ? "button" : "div"), re({
                    key: 1,
                    class: "vuecal__title"
                  }, Xe(w.value), {
                    innerHTML: T(c).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          T(o).todayButton ? (V(), P(de, { key: 0 }, [
            B.$slots["today-button"] ? L(B.$slots, "today-button", {
              key: 0,
              navigate: () => !T(c).containsToday && T(c).goToToday(),
              active: T(c).containsToday
            }) : (V(), P("button", {
              key: 1,
              class: he(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": T(c).containsToday }]),
              onClick: f[1] || (f[1] = (F) => !T(c).containsToday && T(c).goToToday()),
              disabled: !!T(c).containsToday,
              type: "button",
              innerHTML: T(t).texts.today
            }, null, 10, It))
          ], 64)) : Z("", !0),
          ve("button", {
            class: he(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !B.$slots["next-button"] }]),
            onClick: f[2] || (f[2] = (...F) => T(c).next && T(c).next(...F)),
            type: "button"
          }, [
            L(B.$slots, "next-button")
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
  setup(D, { emit: t }) {
    const { config: c, view: o, dnd: p, touch: w, dateUtils: B } = Le("vuecal"), f = D, F = ce(null), v = Te(f.event), u = Te({
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
    }), y = E(() => c.editableEvents.drag && v.draggable !== !1 && !v.background && u.canTouchAndDrag !== !1), A = E(() => o.isMonth || o.isYear || o.isYears || f.inAllDayBar || v._.multiday && !r.value ? !1 : c.time && c.editableEvents.resize && v.resizable !== !1 && !v.background);
    E(() => c.editableEvents.delete && v.deletable !== !1 && !v.background);
    const X = E(() => {
      var d, m, M, e, S;
      return {
        [`vuecal__event--${v._.id}`]: !0,
        [v.class]: !!v.class,
        "vuecal__event--recurring": !!v.recurring,
        "vuecal__event--background": !!v.background,
        "vuecal__event--all-day": v.allDay || ((d = v._) == null ? void 0 : d.startMinutes) === 0 && ((m = v._) == null ? void 0 : m.duration) === 1440,
        "vuecal__event--multiday": !!((M = v._) != null && M.multiday),
        "vuecal__event--cut-top": !f.inAllDayBar && (((e = v._) == null ? void 0 : e.startMinutes) < c.timeFrom || v._.multiday && !a.value),
        "vuecal__event--cut-bottom": !f.inAllDayBar && (((S = v._) == null ? void 0 : S.endMinutes) > c.timeTo || v._.multiday && !r.value),
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !v._.draggingGhost && v._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": v._.draggingGhost,
        "vuecal__event--resizing": u.resizing
      };
    }), a = E(() => v._.multiday ? new Date(v.start).setHours(0, 0, 0, 0) === f.cellStart.getTime() : !0), r = E(() => v._.multiday ? B.isSameDate(new Date(new Date(v.end).setMilliseconds(-1)), f.cellEnd) : !0), _ = E(() => v._.multiday ? Math.ceil((v.end - v.start) / (1e3 * 60 * 60 * 24)) : 1), n = E(() => {
      const d = (o.isDay || o.isDays || o.isWeek) && c.time && !f.inAllDayBar;
      if (!d && !v.backgroundColor && !v.color) return !1;
      const m = {
        backgroundColor: v.backgroundColor || null,
        color: v.color || null
      };
      if (d) {
        let M = v._.startMinutes, e = v._.endMinutes;
        v._.multiday && (a.value || (M = 0), r.value || (e = 1440));
        const S = Math.max(c.timeFrom, M), z = Math.min(c.timeTo, e) + (v._.duration && !e ? 1440 : 0), Q = Oe(S, c), U = Oe(z, c) - Q;
        m.top = `${Q}%`, m.height = `${U}%`;
      }
      return m;
    }), j = E(() => {
      const d = { ...c.eventListeners.event };
      for (const [e, S] of Object.entries(d))
        ["resize-end"].includes(e) || (d[e] = (z) => {
          z.type !== "drop" && S(z.type ? { e: z, event: v } : z);
        });
      const m = { ...d };
      d.touchstart = (e) => {
        var S;
        e.stopPropagation(), u.touchAndDragTimer = setTimeout(() => {
          u.canTouchAndDrag = !0;
        }, 500), l(e), (S = m.touchstart) == null || S.call(m, { e, event: v });
      }, d.mousedown = (e) => {
        var S;
        e.stopPropagation(), l(e), (S = m.mousedown) == null || S.call(m, { e, event: v });
      };
      let M = null;
      return d.click = (e) => {
        var S;
        (S = m.click) == null || S.call(m, { e, event: v }), M ? M = clearTimeout(M) : M = setTimeout(() => {
          var z;
          M = null, (z = m["delayed-click"]) == null || z.call(m, { e, event: v });
        }, 400);
      }, d.dblclick = (e) => {
        m.dblclick ? m.dblclick({ e, event: v }) : v.delete(1);
      }, d;
    }), l = (d) => {
      var e, S, z;
      const m = ((e = d.touches) == null ? void 0 : e[0]) || d;
      u.fromResizer = m.target.matches(".vuecal__event-resizer, .vuecal__event-resizer *");
      const M = F.value.getBoundingClientRect();
      u.startX = (((S = d.touches) == null ? void 0 : S[0]) || d).clientX - M.left, u.startY = (((z = d.touches) == null ? void 0 : z[0]) || d).clientY - M.top, u.startPercentageX = u.startX * 100 / M.width, u.startPercentageY = u.startY * 100 / M.height, u.cellEl = F.value.closest(".vuecal__cell"), u.resizeStartDate = v.start, K(d.type === "touchstart" ? "touchmove" : "mousemove", N, { passive: !u.fromResizer }), K(d.type === "touchstart" ? "touchend" : "mouseup", k, { once: !0 }), u.holdTimer = setTimeout(() => {
        var Q, U;
        u.holding = !0, (U = (Q = j.value).hold) == null || U.call(Q, { e: d, event: v });
      }, 1e3);
    }, N = async (d) => {
      var M, e, S, z;
      const m = ((M = d.touches) == null ? void 0 : M[0]) || d;
      if (u.fromResizer && !u.resizing && (u.resizing = !0, u.resizingOriginalEvent = { ...v, _: { ...v._ } }, w.isResizingEvent = !0, (S = (e = j.value)["resize-start"]) == null || S.call(e, { e: d, event: v })), u.holdTimer = clearTimeout(u.holdTimer), u.holding = !1, u.cellEl) {
        const { top: Q, left: U, width: oe, height: q } = u.cellEl.getBoundingClientRect();
        u.moveX = m.clientX - U, u.moveY = m.clientY - Q, u.movePercentageX = u.moveX * 100 / oe, u.movePercentageY = u.moveY * 100 / q;
      }
      if (u.fromResizer) {
        const { newStart: Q, newEnd: U } = H(v);
        let oe = !0;
        const { resize: q } = (z = c.eventListeners) == null ? void 0 : z.event;
        q && (oe = await q({
          e: d,
          event: { ...v, start: Q, end: U },
          overlaps: v.getOverlappingEvents({ start: Q, end: U })
        })), oe !== !1 ? (v.start = Q, v.end = U, u.resizingLastAcceptedEvent && (u.resizingLastAcceptedEvent = null), d.preventDefault()) : q && (u.resizingLastAcceptedEvent = { ...v, _: { ...v._ } });
      }
    }, k = async (d) => {
      var m, M;
      if (u.holdTimer = clearTimeout(u.holdTimer), u.holding = !1, u.resizing) {
        const { newStart: e, newEnd: S } = H(v);
        let z = !0;
        const Q = j.value["resize-end"];
        Q && (z = await Q({
          e: d,
          event: v,
          original: u.resizingOriginalEvent,
          // Original event details before resizing.
          overlaps: v.getOverlappingEvents({ start: e, end: S })
        })), v.start = z === !1 ? (u.resizingLastAcceptedEvent || u.resizingOriginalEvent).start : ((m = u.resizingLastAcceptedEvent) == null ? void 0 : m.start) || e, v.end = z === !1 ? (u.resizingLastAcceptedEvent || u.resizingOriginalEvent).end : ((M = u.resizingLastAcceptedEvent) == null ? void 0 : M.end) || S, v._.duration < 1 && (v.start = u.resizingOriginalEvent.start, v.end = u.resizingOriginalEvent.end), w.isResizingEvent = !1;
      }
      document.removeEventListener(d.type === "touchend" ? "touchmove" : "mousemove", N, { passive: !u.fromResizer }), u.resizing = !1, u.fromResizer = !1, u.dragging = !1, u.startX = 0, u.startY = 0, u.moveX = 0, u.moveY = 0, u.startPercentageX = 0, u.startPercentageY = 0, u.movePercentageX = 0, u.movePercentageY = 0, u.cellEl = null, u.resizeStartDate = null, u.resizingOriginalEvent = null, u.resizingLastAcceptedEvent = null, u.schedule = null;
    }, H = (d) => {
      let m = He(u.movePercentageY, c);
      if (m = Math.max(0, Math.min(m, 1440)), c.snapToInterval) {
        const S = m + c.snapToInterval / 2;
        m = S - S % c.snapToInterval;
      }
      let M = d.start, e = new Date(f.cellStart.getTime() + m * 6e4);
      return e < u.resizeStartDate && (M = e, e = u.resizeStartDate), { newStart: M, newEnd: e };
    }, O = [], K = (d, m, M) => {
      document.addEventListener(d, m, M), O.push({ event: d, handler: m, options: M });
    };
    return Ze(() => v._.register(F.value)), Ne(() => {
      v._.unregister();
      for (const { event: d, handler: m, options: M } of O)
        document.removeEventListener(d, m, M);
    }), (d, m) => (V(), P("div", re({ class: "vuecal__event" }, Xe(j.value, !0), {
      ref_key: "eventEl",
      ref: F,
      class: X.value,
      style: n.value,
      draggable: y.value ? "true" : void 0,
      onDragstart: m[2] || (m[2] = (M) => y.value && T(p).eventDragStart(M, v)),
      onDragend: m[3] || (m[3] = (M) => y.value && T(p).eventDragEnd(M, v))
    }), [
      ve("div", qt, [
        d.$slots["event.all-day"] ? L(d.$slots, "event.all-day", {
          key: 0,
          event: v
        }) : d.$slots[`event.${T(o).id}`] ? L(d.$slots, `event.${T(o).id}`, {
          key: 1,
          event: v
        }) : L(d.$slots, "event", {
          key: 2,
          event: v
        }, () => [
          ve("div", Gt, ue(v.title), 1),
          T(c).time && !D.inAllDayBar && !(v._.multiday && !a.value) ? (V(), P("div", Jt, [
            T(o).isMonth ? (V(), P("span", Ut, ",")) : Z("", !0),
            ve("span", Zt, ue(v._[`startTimeFormatted${T(c).twelveHour ? 12 : 24}`]), 1),
            T(o).isMonth ? Z("", !0) : (V(), P("span", Kt, [
              qe(" - " + ue(v._[`endTimeFormatted${T(c).twelveHour ? 12 : 24}`]), 1),
              v._.multiday && a.value ? (V(), P("span", Qt, "+" + ue(_.value - 1) + "d", 1)) : Z("", !0)
            ]))
          ])) : Z("", !0),
          D.inAllDayBar ? Z("", !0) : (V(), P("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: v.content
          }, null, 8, xt))
        ])
      ]),
      A.value ? (V(), P("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: m[0] || (m[0] = et(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : Z("", !0),
      je(Je, { name: "vuecal-delete-btn" }, {
        default: R(() => [
          v._.deleting ? (V(), P("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: m[1] || (m[1] = et((M) => v.delete(3), ["stop"]))
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
  setup(D) {
    const t = D, c = Le("vuecal"), { view: o, config: p, dateUtils: w, eventsManager: B, dnd: f, touch: F } = c, v = E(() => w.isToday(t.start)), u = ce(null), y = ce([]), A = ce(!1), X = (i) => {
      y.value.push(i.detail), A.value = !0;
    }, a = () => setTimeout(() => A.value = !1, 300), r = Te({
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
    }), _ = ce(!1), n = ce({ cellOverlaps: {}, longestStreak: 0 }), j = E(() => {
      let i = Math.min(r.startPercentageY, r.movePercentageY), Y = Math.max(r.startPercentageY, r.movePercentageY), C = He(i, p), b = He(Y, p);
      return p.snapToInterval && (C = w.snapToInterval(C, p.snapToInterval), b = w.snapToInterval(b, p.snapToInterval), i = Oe(C, p), Y = Oe(b, p)), {
        style: {
          top: `${i}%`,
          height: `${Math.abs(Y - i)}%`
        },
        startMinutes: C,
        endMinutes: b,
        start: w.formatMinutes(C),
        end: w.formatMinutes(b),
        ...r.schedule ? { schedule: r.schedule } : {}
      };
    }), l = E(() => {
      const i = p.editableEvents.create && (r.dragging || _.value), Y = p.eventCreateMinDrag && r.thresholdPassed || !p.eventCreateMinDrag, C = r.canTouchAndDrag !== !1;
      return i && Y && C;
    }), N = E(() => {
      var le;
      const i = /* @__PURE__ */ new Date(), Y = o.start.getFullYear(), C = o.start.getMonth(), b = t.start.getFullYear(), W = t.start.getMonth();
      return {
        [`vuecal__cell--${Ge[t.start.getDay()]}`]: o.isDay || o.isDays || o.isWeek || o.isMonth,
        [`vuecal__cell--${Yt[W]}`]: o.isYear,
        [`vuecal__cell--${b}`]: o.isYears,
        "vuecal__cell--today": v.value,
        "vuecal__cell--current-month": o.isYear && b === i.getFullYear() && W === i.getMonth(),
        "vuecal__cell--current-year": o.isYears && b === i.getFullYear(),
        "vuecal__cell--out-of-range": o.isMonth && (b !== Y || W !== C),
        "vuecal__cell--before-min": Q.value && S.value,
        "vuecal__cell--after-max": Q.value && z.value,
        "vuecal__cell--disabled": Q.value,
        "vuecal__cell--selected": o.selectedDate && o.selectedDate.getTime() >= t.start.getTime() && o.selectedDate.getTime() <= t.end.getTime(),
        "vuecal__cell--has-schedules": (le = p.schedules) == null ? void 0 : le.length,
        "vuecal__cell--dragging": r.dragging,
        "vuecal__cell--has-events": H.value.length
      };
    });
    E(() => w.formatDate(t.start));
    const k = E(() => {
      switch (o.id) {
        case "day":
          return "";
        case "days":
          return p.availableViews.days.rows > 1 && w.formatDate(t.start, "D"), "";
        case "week":
          return "";
        case "month":
          return w.formatDate(t.start, "D");
        case "year":
          return w.formatDate(t.start, p.xs ? "MMM" : "MMMM");
        case "years":
          return w.formatDate(t.start, "YYYY");
      }
    }), H = E(() => p.datePicker ? [] : B.getEventsInRange(
      t.start,
      t.end,
      { excludeIds: y.value, ...p.allDayEvents ? { allDay: t.allDay } : {} }
    )), O = E(() => H.value.filter((i) => !i.background)), K = E(() => {
      var i;
      return (i = p.schedules) == null ? void 0 : i.reduce((Y, C) => (Y[C.id] = H.value.filter((b) => b.schedule === C.id), Y), {});
    }), d = E(() => {
      if (o.isMonth || o.isYear || o.isYears || t.allDay) return {};
      const i = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", Y = {};
      for (const C of H.value) {
        const b = C._.id, { maxConcurrent: W = 1, position: J = 0 } = n.value.cellOverlaps[b] || {}, le = i ? "right" : "left";
        Y[b] = { [le]: `${100 / W * J}%` }, p.stackEvents ? Y[b].width = `${100 / W + (J === W - 1 ? 0 : 15)}%` : Y[b].width = `${100 / W}%`;
      }
      return Y;
    }), m = E(() => {
      const i = {};
      for (const Y of H.value) {
        const C = Y._.id, { maxConcurrent: b = 1, position: W = 0 } = n.value.cellOverlaps[C] || {};
        i[C] = `vuecal__event--stack-${W + 1}-${b}`;
      }
      return i;
    }), M = E(() => p.showCellEventCount && O.value.length), e = E(() => {
      var C;
      if (!p.specialHours || o.isMonth || o.isYear || o.isYears || t.allDay) return;
      const i = Ge[t.start.getDay()];
      let Y = (C = p.specialHours) == null ? void 0 : C[i];
      if (Y)
        return Array.isArray(Y) || (Y = [Y]), Y.map((b) => {
          let { from: W, to: J, class: le, label: De } = b;
          if (isNaN(W) || isNaN(J) || p.timeFrom >= J || p.timeTo <= W) return;
          W = Math.max(p.timeFrom, W), J = Math.min(p.timeTo, J);
          const g = Oe(W, p), I = Oe(J, p) - g;
          return {
            style: { top: `${g}%`, height: `${I}%` },
            label: De,
            class: le
          };
        }).filter((b) => !!b);
    }), S = E(() => p.minTimestamp !== null && p.minTimestamp > t.end.getTime()), z = E(() => p.maxTimestamp && p.maxTimestamp < t.start.getTime()), Q = E(() => {
      const { disableDays: i } = p, Y = o.isYear || o.isYears;
      return i.length && i.includes(w.formatDate(t.start)) && !Y ? !0 : S.value || z.value;
    }), U = Te({
      show: E(() => {
        if (!(!o.isDay && !o.isDays && !o.isWeek) && !(!v.value || !p.time || t.allDay) && !(p.timeFrom > w.dateToMinutes(o.now)) && !(w.dateToMinutes(o.now) > p.timeTo))
          return !0;
      }),
      nowInMinutes: E(() => w.dateToMinutes(o.now)),
      todaysTimePosition: E(() => Oe(U.nowInMinutes, p)),
      style: E(() => `top: ${U.todaysTimePosition}%`),
      currentTime: E(() => w.formatTime(o.now))
    }), oe = E(() => {
      if (Q.value) return {};
      const i = { ...p.eventListeners.cell };
      for (const [b, W] of Object.entries(i))
        i[b] = (J) => {
          var le, De, g;
          (g = (De = J.target || ((le = J.e) == null ? void 0 : le.target)).closest) != null && g.call(De, ".vuecal__event") || W(J.type ? { e: J, cell: q.value, cursor: ae.value } : J);
        };
      const Y = { ...i };
      let C = null;
      return i.click = (b) => {
        var J;
        ie();
        const W = $e(b);
        (J = Y.click) == null || J.call(Y, { e: b, cell: q.value, cursor: W }), C ? C = clearTimeout(C) : C = setTimeout(() => {
          var le;
          C = null, (le = Y["delayed-click"]) == null || le.call(Y, { e: b, cell: q.value, cursor: W });
        }, 400);
      }, (p.time && o.isDay || o.isDays || o.isWeek) && (i.touchstart = (b) => {
        var W;
        s(b.e || b), (W = Y.touchstart) == null || W.call(Y, { e: b, cell: q.value, cursor: ae.value });
      }, i.mousedown = (b) => {
        var W;
        s(b.e || b), (W = Y.mousedown) == null || W.call(Y, { e: b, cell: q.value, cursor: ae.value });
      }), Y.dblclick && (i.dblclick = (b) => {
        var W;
        (W = Y.dblclick) == null || W.call(Y, { e: b, cell: q.value, cursor: $e(b) });
      }), p.editableEvents.drag && (i.dragenter = (b) => f.cellDragEnter(b, q.value), i.dragover = (b) => {
        b.preventDefault(), f.cellDragOver(b, q.value);
      }, i.dragleave = (b) => f.cellDragLeave(b, q.value), i.drop = (b) => f.cellDragDrop(b, q.value, t.allDay)), i;
    }), q = E(() => ({
      start: t.start,
      end: t.end,
      events: H,
      ...r.schedule ? { schedule: r.schedule } : {},
      goNarrower: () => o.narrower(),
      goBroader: () => o.broader(),
      broader: o.broaderView,
      narrower: o.narrowerView
    })), $e = (i) => {
      var J;
      const Y = (((J = i.touches) == null ? void 0 : J[0]) || i).clientY, { top: C } = u.value.getBoundingClientRect(), b = Ke(Y - C, u.value), W = new Date(t.start);
      return W.setMinutes(He(b, p)), { y: b, date: W };
    }, ae = E(() => {
      const i = He(r.movePercentageY || r.startPercentageY, p), Y = new Date(t.start);
      return Y.setMinutes(i), {
        x: r.movePercentageX || r.startPercentageX,
        y: r.movePercentageY || r.startPercentageY,
        date: Y
      };
    }), ie = () => {
      o.updateSelectedDate(t.start), p.clickToNavigate && ((o.isMonth || o.isDays || o.isWeek) && p.availableViews.day ? o.switch("day") : o.isYear && p.availableViews.month ? o.switch("month") : o.isYears && p.availableViews.year && o.switch("year")), o.updateViewDate(t.start);
    }, s = (i) => {
      var b, W;
      const Y = i.type === "touchstart";
      Y ? (r.canTouchAndDrag = !1, r.touchAndDragTimer = setTimeout(() => {
        r.canTouchAndDrag = !0, (r.holding || r.dragging) && i.preventDefault();
      }, 500)) : r.canTouchAndDrag = !0, r.schedule = ~~i.target.dataset.schedule;
      const C = u.value.getBoundingClientRect();
      r.startX = (((b = i.touches) == null ? void 0 : b[0]) || i).clientX - C.left, r.startY = (((W = i.touches) == null ? void 0 : W[0]) || i).clientY - C.top, r.startPercentageX = r.startX * 100 / C.width, r.startPercentageY = r.startY * 100 / C.height, r.thresholdPassed = !1, document.addEventListener(Y ? "touchmove" : "mousemove", $, { passive: !Y }), document.addEventListener(Y ? "touchend" : "mouseup", h, { once: !0 }), r.holdTimer = setTimeout(() => {
        var J, le;
        r.holding = !0, (le = (J = oe.value).hold) == null || le.call(J, { e: i, cell: q.value, cursor: ae.value });
      }, 1e3);
    }, $ = (i) => {
      var b, W, J, le, De, g;
      const Y = i.type === "touchmove";
      if (Y && !r.canTouchAndDrag) {
        r.touchAndDragTimer && (clearTimeout(r.touchAndDragTimer), r.touchAndDragTimer = null), h(i);
        return;
      }
      Y && i.preventDefault(), r.dragging || (F.isDraggingCell = !0, (W = (b = oe.value)["drag-start"]) == null || W.call(b, { e: i, cell: q.value, cursor: ae.value })), r.dragging = !0, r.holdTimer = clearTimeout(r.holdTimer), r.holding = !1;
      const C = u.value.getBoundingClientRect();
      r.moveX = (((J = i.touches) == null ? void 0 : J[0]) || i).clientX - C.left, r.moveY = (((le = i.touches) == null ? void 0 : le[0]) || i).clientY - C.top, r.movePercentageX = r.moveX * 100 / C.width, r.movePercentageY = r.moveY * 100 / C.height, p.eventCreateMinDrag && Math.abs(r.startY - r.moveY) > p.eventCreateMinDrag && (r.thresholdPassed = !0), (g = (De = oe.value).drag) == null || g.call(De, { e: i, cell: q.value, cursor: ae.value });
    }, h = async (i) => {
      var C, b;
      const Y = i.type === "touchend";
      document.removeEventListener(Y ? "touchmove" : "mousemove", $, { passive: !1 }), r.touchAndDragTimer && (clearTimeout(r.touchAndDragTimer), r.touchAndDragTimer = null), r.dragging && ((b = (C = oe.value)["drag-end"]) == null || b.call(C, { e: i, cell: q.value, cursor: ae.value }), F.isDraggingCell = !1, p.editableEvents.create && r.canTouchAndDrag && (_.value = !0, await G(i), _.value = !1)), r.holdTimer = clearTimeout(r.holdTimer), r.holding = !1, r.dragging = !1, r.startX = 0, r.startY = 0, r.moveX = 0, r.moveY = 0, r.startPercentageX = 0, r.startPercentageY = 0, r.movePercentageX = 0, r.movePercentageY = 0, r.thresholdPassed = !1, r.schedule = null, r.canTouchAndDrag = null;
    }, G = async (i) => {
      var De;
      if (!l.value) return;
      let { start: Y, end: C, startMinutes: b, endMinutes: W } = j.value;
      Y = new Date(t.start), Y.setMinutes(b), C = new Date(t.start), C.setMinutes(W);
      let J = { ...j.value, start: Y, end: C };
      const { create: le } = p.eventListeners.event;
      if (typeof le == "function") {
        const g = J;
        J = await new Promise((I) => le({ e: i, event: J, cell: q.value, resolve: I, cursor: ae.value })), J && typeof J == "object" && o.createEvent(J), J && typeof J == "boolean" && o.createEvent(g);
      } else o.createEvent(J);
      (De = navigator.vibrate) == null || De.call(navigator, 200);
    }, x = () => {
      var i;
      for (const Y of Object.keys(oe.value))
        (i = u.value) == null || i.removeEventListener(Y, oe.value[Y]);
    }, ye = () => {
      n.value = B.getCellOverlappingEvents(t.start, t.end, t.allDay);
    };
    return me(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !o.isYears && !o.isYear && O.value.map((i) => `${i._.id}${i.start.getTime()}${i.end.getTime()}`).join(),
      async () => {
        await Re(), ye();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Ne(async () => {
      for (const i of y.value) B.deleteEvent(i, 3);
      x(), await Re();
    }), (i, Y) => (V(), P("div", re({
      class: ["vuecal__cell", N.value],
      ref_key: "cellEl",
      ref: u
    }, Xe(oe.value, !0)), [
      i.$slots.cell ? L(i.$slots, "cell", {
        key: 0,
        cell: q.value
      }) : Z("", !0),
      e.value ? (V(!0), P(de, { key: 1 }, pe(e.value, (C, b) => (V(), P("div", {
        class: he(["vuecal__special-hours", C.class]),
        style: ke(C.style),
        innerHTML: C.label || ""
      }, null, 14, ea))), 256)) : Z("", !0),
      !i.$slots.cell && T(p).schedules ? (V(!0), P(de, { key: 2 }, pe(T(p).schedules, (C) => (V(), P("div", {
        class: he(["vuecal__schedule vuecal__schedule--cell", C.class]),
        key: C.id,
        style: ke(C.style || null),
        "data-schedule": C.id
      }, [
        i.$slots["cell-events"] ? L(i.$slots, "cell-events", {
          key: 0,
          cell: q.value
        }) : Z("", !0),
        k.value || i.$slots["cell-date"] ? (V(), P("div", aa, [
          L(i.$slots, "cell-date", { cell: q.value }, () => [
            qe(ue(k.value), 1)
          ])
        ])) : Z("", !0),
        i.$slots["cell-content"] ? (V(), P("div", na, [
          L(i.$slots, "cell-content", { cell: q.value })
        ])) : Z("", !0),
        i.$slots["cell-events"] && H.value.length ? (V(), P("div", sa, [
          L(i.$slots, "cell-events", { cell: q.value })
        ])) : H.value.length || A.value ? (V(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: Y[0] || (Y[0] = (b) => A.value = !0),
          onAfterLeave: a,
          tag: "div"
        }, {
          default: R(() => [
            (V(!0), P(de, null, pe(K.value[C.id], (b) => (V(), Se(st, {
              key: b._.id,
              event: b,
              onEventDeleted: X,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              style: ke(d.value[b._.id])
            }, Ce({ _: 2 }, [
              i.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: R((W) => [
                  L(i.$slots, "event.all-day", re({ ref_for: !0 }, W))
                ]),
                key: "0"
              } : void 0,
              i.$slots[`event.${T(o).id}`] ? {
                name: `event.${T(o).id}`,
                fn: R((W) => [
                  L(i.$slots, `event.${T(o).id}`, re({ ref_for: !0 }, W))
                ]),
                key: "1"
              } : void 0,
              i.$slots.event ? {
                name: "event",
                fn: R((W) => [
                  L(i.$slots, "event", re({ ref_for: !0 }, W))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "style"]))), 128))
          ]),
          _: 2
        }, 1024)) : Z("", !0),
        l.value && r.schedule === C.id && !t.allDay ? (V(), P("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: ke(j.value.style)
        }, ue(j.value.start) + " - " + ue(j.value.end), 5)) : Z("", !0)
      ], 14, ta))), 128)) : Z("", !0),
      !i.$slots.cell && !T(p).schedules ? (V(), P(de, { key: 3 }, [
        i.$slots["cell-events"] ? L(i.$slots, "cell-events", {
          key: 0,
          cell: q.value
        }) : Z("", !0),
        k.value || i.$slots["cell-date"] ? (V(), P("div", la, [
          L(i.$slots, "cell-date", { cell: q.value }, () => [
            qe(ue(k.value), 1)
          ])
        ])) : Z("", !0),
        i.$slots["cell-content"] ? (V(), P("div", ra, [
          L(i.$slots, "cell-content", { cell: q.value })
        ])) : Z("", !0),
        i.$slots["cell-events"] && H.value.length ? (V(), P("div", oa, [
          L(i.$slots, "cell-events", { cell: q.value })
        ])) : !(T(o).isMonth && !T(p).eventsOnMonthView) && !T(o).isYear && !T(o).isYears && (H.value.length || A.value) ? (V(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: Y[1] || (Y[1] = (C) => A.value = !0),
          onAfterLeave: a,
          tag: "div"
        }, {
          default: R(() => [
            (V(!0), P(de, null, pe(H.value, (C) => (V(), Se(st, {
              key: C._.id,
              event: C,
              onEventDeleted: X,
              "in-all-day-bar": t.allDay,
              "cell-start": t.start,
              "cell-end": t.end,
              class: he(m.value[C._.id]),
              style: ke(d.value[C._.id])
            }, Ce({ _: 2 }, [
              i.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: R((b) => [
                  L(i.$slots, "event.all-day", re({ ref_for: !0 }, b))
                ]),
                key: "0"
              } : void 0,
              i.$slots[`event.${T(o).id}`] ? {
                name: `event.${T(o).id}`,
                fn: R((b) => [
                  L(i.$slots, `event.${T(o).id}`, re({ ref_for: !0 }, b))
                ]),
                key: "1"
              } : void 0,
              i.$slots.event ? {
                name: "event",
                fn: R((b) => [
                  L(i.$slots, "event", re({ ref_for: !0 }, b))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "cell-start", "cell-end", "class", "style"]))), 128))
          ]),
          _: 3
        })) : Z("", !0),
        l.value ? (V(), P("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: ke(j.value.style)
        }, ue(j.value.start) + " - " + ue(j.value.end), 5)) : Z("", !0)
      ], 64)) : Z("", !0),
      i.$slots["event-count"] ? L(i.$slots, "event-count", {
        key: 4,
        events: O.value
      }) : M.value ? (V(), P("div", ia, ue(O.value.length), 1)) : Z("", !0),
      U.show ? (V(), P("div", {
        key: 6,
        class: "vuecal__now-line",
        style: ke(U.style),
        title: U.currentTime
      }, [
        ve("span", null, ue(U.currentTime), 1)
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
  setup(D) {
    const t = Le("vuecal"), c = Le("$vuecalEl"), { view: o, config: p, dateUtils: w } = t, B = E(() => p.xs ? "day-xs" : p.sm || o.isDays || o.isMonth ? "day-sm" : "day"), f = E(() => (o.isDay || o.isDays || o.isWeek || o.isMonth) && !(o.isDay && !p.schedules && !p.allDayEvents)), F = E(() => o.cellDates.slice(0, o.cols).map(({ start: y }) => ({
      id: Ge[y.getDay()],
      date: y,
      dateNumber: y.getDate(),
      day: w.formatDate(y, "dddd"),
      "day-sm": w.formatDate(y, "ddd"),
      "day-xs": w.formatDate(y, "dd"),
      isToday: w.isToday(y)
    }))), v = {
      click: (y) => {
        (o.isDays || o.isWeek) && o.updateSelectedDate(y);
      }
    }, u = {
      isResizing: ce(!1),
      startY: ce(0),
      initialHeight: ce(0),
      defaultHeight: 25,
      // Default height in pixels.
      // Cleanup event listeners.
      cleanup() {
        typeof document < "u" && (document.removeEventListener("mousemove", u.handleMouseMove), document.removeEventListener("mouseup", u.cleanup), document.removeEventListener("touchmove", u.handleTouchMove, { passive: !1 }), document.removeEventListener("touchend", u.cleanup)), u.isResizing.value = !1;
      },
      startResize(y) {
        var X;
        this.isResizing.value = !0, this.startY.value = y;
        const A = (X = c.value) == null ? void 0 : X.querySelector(".vuecal__all-day");
        A && (this.initialHeight.value = A.offsetHeight), document.addEventListener("mousemove", u.handleMouseMove), document.addEventListener("mouseup", u.cleanup), document.addEventListener("touchmove", u.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", u.cleanup);
      },
      // Update height based on mouse/touch movement.
      updateHeight(y) {
        var a;
        if (!this.isResizing.value) return;
        const A = y - this.startY.value, X = Math.max(20, this.initialHeight.value + A);
        (a = c.value) == null || a.style.setProperty("--vuecal-all-day-bar-height", `${X}px`);
      },
      // Mouse event handlers.
      handleMouseDown(y) {
        this.startResize(y.clientY);
      },
      handleMouseMove(y) {
        u.updateHeight(y.clientY);
      },
      // Touch event handlers.
      handleTouchStart(y) {
        var A;
        (A = y.touches) != null && A[0] && this.startResize(y.touches[0].clientY);
      },
      handleTouchMove(y) {
        var A;
        (A = y.touches) != null && A[0] && (u.updateHeight(y.touches[0].clientY), y.preventDefault());
      }
    };
    return Ne(() => {
      u.cleanup();
    }), (y, A) => f.value ? (V(), P("div", ca, [
      T(o).isDay ? Z("", !0) : (V(), P("div", da, [
        (V(!0), P(de, null, pe(F.value, (X, a) => (V(), P("div", {
          class: he(["vuecal__weekday", { "vuecal__weekday--today": X.isToday }]),
          key: a,
          onClick: (r) => v.click(X.date)
        }, [
          L(y.$slots, "weekday-heading", {
            label: X[B.value],
            id: X.id,
            date: X.date
          }, () => [
            ve("span", fa, ue(X[B.value]), 1),
            T(o).isMonth ? Z("", !0) : (V(), P("strong", ma, ue(X.dateNumber), 1))
          ])
        ], 10, va))), 128))
      ])),
      T(p).schedules ? (V(), P("div", ga, [
        (V(!0), P(de, null, pe(F.value, (X, a) => (V(), P(de, { key: a }, [
          (V(!0), P(de, null, pe(T(p).schedules, (r, _) => (V(), P(de, { key: _ }, [
            y.$slots["schedule-heading"] ? (V(), P("div", {
              key: 0,
              class: he(["vuecal__schedule vuecal__schedule--heading", r.class])
            }, [
              L(y.$slots, "schedule-heading", {
                schedule: r,
                view: T(o)
              })
            ], 2)) : (V(), P("div", {
              key: 1,
              class: he(["vuecal__schedule vuecal__schedule--heading", r.class]),
              innerHTML: r.label
            }, null, 10, ha))
          ], 64))), 128))
        ], 64))), 128))
      ])) : Z("", !0),
      T(p).allDayEvents ? (V(), P("div", ya, [
        (V(!0), P(de, null, pe(F.value, (X, a) => (V(), Se(kt, {
          class: he(["vuecal__all-day-cell", { "vuecal__weekday--today": X.isToday }]),
          key: a,
          start: X.date,
          end: new Date(X.date.getTime() + 1440 * 60 * 1e3 - 1),
          index: a,
          "all-day": ""
        }, Ce({ _: 2 }, [
          y.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: R((r) => [
              L(y.$slots, "event.all-day", re({ ref_for: !0 }, r))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: R((r) => [
              L(y.$slots, "event", re({ ref_for: !0 }, r))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        ve("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: A[0] || (A[0] = (...X) => u.handleMouseDown && u.handleMouseDown(...X)),
          onTouchstart: A[1] || (A[1] = (...X) => u.handleTouchStart && u.handleTouchStart(...X))
        }, null, 32)
      ])) : Z("", !0)
    ])) : Z("", !0);
  }
}, pa = { class: "vuecal__time-column" }, wa = {
  key: 0,
  class: "vuecal__all-day-label"
}, _a = {
  __name: "time-column",
  setup(D) {
    const t = Le("vuecal"), { config: c, texts: o } = t, p = E(() => {
      const w = [];
      for (let f = c.timeFrom; f < c.timeTo; f += c.timeStep) {
        const F = f + c.timeStep > c.timeTo, v = ~~(f / 60), u = f % 60, y = o[f < 720 ? "am" : "pm"];
        let A = null;
        F && (A = `calc(var(--vuecal-time-cell-height) * ${(c.timeTo - f) / c.timeStep})`), w.push({
          minutesSum: f,
          // The sum of hours + minutes in minutes.
          hours: v,
          minutes: u,
          formatted12: `${v % 12 ? v % 12 : 12}${u ? `:${u.toString().padStart(2, 0)}` : ""}${y}`,
          formatted24: `${v.toString().padStart(2, 0)}:${u.toString().padStart(2, 0)}`,
          height: A
        });
      }
      return w;
    });
    return (w, B) => (V(), P("div", pa, [
      T(c).allDayEvents ? (V(), P("div", wa, [
        L(w.$slots, "all-day-label", {}, () => [
          qe(ue(T(t).texts.allDay), 1)
        ])
      ])) : Z("", !0),
      (V(!0), P(de, null, pe(p.value, (f, F) => (V(), P("div", {
        class: "vuecal__time-cell",
        key: F,
        style: ke({ height: f.height || null })
      }, [
        L(w.$slots, "time-cell", {
          index: F,
          minutes: f.minutes,
          hours: f.hours,
          minutesSum: f.minutesSum,
          format12: f.formatted12,
          format24: f.formatted24
        }, () => [
          ve("label", null, ue(T(c).twelveHour ? f.formatted12 : f.formatted24), 1)
        ])
      ], 4))), 128))
    ]));
  }
}, ka = {
  __name: "body",
  setup(D) {
    const t = Le("vuecal"), { view: c, config: o, dateUtils: p } = t, w = ce(null), B = ce(null), f = E(() => ({
      "--vuecal-grid-columns": c.cols,
      "--vuecal-grid-rows": c.rows,
      "--vuecal-body-max-height": o.time ? `${o.timeCellHeight * (o.timeTo - o.timeFrom) / o.timeStep}px` : null
    })), F = E(() => {
      const y = p.formatTime(He(B.value, o));
      return {
        style: { top: `${B.value}%` },
        time: y
      };
    }), v = (y) => {
      var a;
      if (c.isMonth || c.isYear || c.isYears) return;
      const A = (((a = y.touches) == null ? void 0 : a[0]) || y).clientY, { top: X } = w.value.getBoundingClientRect();
      B.value = Ke(A - X, w.value);
    }, u = () => {
      B.value = null;
    };
    return Ze(() => {
      w.value.addEventListener("mousemove", v), w.value.addEventListener("touchmove", v), w.value.addEventListener("mouseleave", u), w.value.addEventListener("touchend", u);
    }), Ne(() => {
      w.value && (w.value.removeEventListener("mousemove", v), w.value.removeEventListener("touchmove", v), w.value.removeEventListener("mouseleave", u), w.value.removeEventListener("touchend", u));
    }), (y, A) => (V(), P("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: w,
      style: ke(f.value)
    }, [
      je(Je, { name: "vuecal-shrink" }, {
        default: R(() => [
          T(o).timeAtCursor && B.value !== null ? (V(), P("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: ke(F.value.style)
          }, [
            ve("label", null, ue(F.value.time), 1)
          ], 4)) : Z("", !0)
        ]),
        _: 1
      }),
      (V(!0), P(de, null, pe(T(c).cellDates, (X, a) => (V(), Se(kt, {
        key: a,
        start: X.start,
        end: X.end,
        index: a
      }, Ce({ _: 2 }, [
        y.$slots.cell ? {
          name: "cell",
          fn: R((r) => [
            L(y.$slots, "cell", re({ ref_for: !0 }, r))
          ]),
          key: "0"
        } : void 0,
        y.$slots["cell-date"] ? {
          name: "cell-date",
          fn: R((r) => [
            L(y.$slots, "cell-date", re({ ref_for: !0 }, r))
          ]),
          key: "1"
        } : void 0,
        y.$slots["cell-content"] ? {
          name: "cell-content",
          fn: R((r) => [
            L(y.$slots, "cell-content", re({ ref_for: !0 }, r))
          ]),
          key: "2"
        } : void 0,
        y.$slots["cell-events"] ? {
          name: "cell-events",
          fn: R((r) => [
            L(y.$slots, "cell-events", re({ ref_for: !0 }, r))
          ]),
          key: "3"
        } : void 0,
        y.$slots[`event.${T(c).id}`] ? {
          name: `event.${T(c).id}`,
          fn: R((r) => [
            L(y.$slots, `event.${T(c).id}`, re({ ref_for: !0 }, r))
          ]),
          key: "4"
        } : void 0,
        y.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: R((r) => [
            L(y.$slots, "event.all-day", re({ ref_for: !0 }, r))
          ]),
          key: "5"
        } : void 0,
        y.$slots.event ? {
          name: "event",
          fn: R((r) => [
            L(y.$slots, "event", re({ ref_for: !0 }, r))
          ]),
          key: "6"
        } : void 0,
        y.$slots["event-count"] ? {
          name: "event-count",
          fn: R((r) => [
            L(y.$slots, "event-count", re({ ref_for: !0 }, r))
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
  setup(D, { expose: t, emit: c }) {
    const o = D, p = c, w = Tt("vuecal-el"), B = Lt({ props: o, emit: p, attrs: Et(), vuecalEl: w, uid: Mt() }), { config: f, view: F, dateUtils: v, touch: u } = B, y = E(() => f.time && (F.isDay || F.isDays || F.isWeek)), A = E(() => Array(F.rows).fill().map((n, j) => v.getWeek(v.addDays(F.firstCellDate, 7 * j)))), X = E(() => {
      var n;
      return {
        "vuecal--ready": f.ready,
        [`vuecal--${f.theme}-theme`]: f.theme,
        [`vuecal--${f.size}`]: !0,
        "vuecal--date-picker": f.datePicker,
        "vuecal--dark": f.dark,
        "vuecal--light": !f.dark,
        [`vuecal--${F.id}-view`]: !0,
        "vuecal--view-has-time": y.value,
        "vuecal--timeless": !f.time,
        "vuecal--dragging-cell": u.isDraggingCell,
        "vuecal--dragging-event": u.isDraggingEvent,
        "vuecal--resizing-event": u.isResizingEvent,
        "vuecal--has-schedules": (n = f.schedules) == null ? void 0 : n.length
      };
    }), a = E(() => ({
      "--vuecal-time-cell-height": f.timeCellHeight && `${f.timeCellHeight}px`
    })), r = E(() => {
      var n, j;
      return {
        "vuecal__scrollable--row": y.value || f.weekNumbers && F.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${F.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (n = f.schedules) == null ? void 0 : n.length,
        "vuecal__scrollable--no-schedules": !((j = f.schedules) != null && j.length),
        "vuecal__scrollable--no-all-day-bar": !f.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": f.allDayEvents
      };
    }), _ = (n) => {
      n.target.closest(".vuecal__cell") && n.preventDefault();
    };
    return Ze(async () => {
      typeof window < "u" && window.hasOwnProperty("ontouchstart") && w.value.addEventListener("contextmenu", _), await Re(), f.ready = !0, p("ready", { config: f, view: F });
    }), Ne(() => {
      var n;
      (n = w == null ? void 0 : w.value) == null || n.removeEventListener("contextmenu", _);
    }), at("vuecal", B), at("$vuecalEl", w), t({ view: B.view }), (n, j) => (V(), P("div", {
      class: he(["vuecal", X.value]),
      ref: "vuecal-el",
      "data-locale": n.locale,
      style: ke(a.value)
    }, [
      n.$slots.diy ? L(n.$slots, "diy", {
        key: 0,
        vuecal: T(B)
      }) : (V(), P(de, { key: 1 }, [
        je(Rt, null, Ce({ _: 2 }, [
          n.$slots.header ? {
            name: "header",
            fn: R((l) => [
              L(n.$slots, "header", ne(se(l)))
            ]),
            key: "0"
          } : void 0,
          !n.$slots.header && n.$slots["previous-button"] ? {
            name: "previous-button",
            fn: R((l) => [
              L(n.$slots, "previous-button", ne(se(l)))
            ]),
            key: "1"
          } : void 0,
          !n.$slots.header && n.$slots["next-button"] ? {
            name: "next-button",
            fn: R((l) => [
              L(n.$slots, "next-button", ne(se(l)))
            ]),
            key: "2"
          } : void 0,
          !n.$slots.header && n.$slots["today-button"] ? {
            name: "today-button",
            fn: R((l) => [
              L(n.$slots, "today-button", ne(se(l)))
            ]),
            key: "3"
          } : void 0,
          !n.$slots.header && n.$slots.title ? {
            name: "title",
            fn: R((l) => [
              L(n.$slots, "title", ne(se(l)))
            ]),
            key: "4"
          } : void 0,
          !n.$slots.header && n.$slots["title.day"] ? {
            name: "title.day",
            fn: R((l) => [
              L(n.$slots, "title.day", ne(se(l)))
            ]),
            key: "5"
          } : void 0,
          !n.$slots.header && n.$slots["title.days"] ? {
            name: "title.days",
            fn: R((l) => [
              L(n.$slots, "title.days", ne(se(l)))
            ]),
            key: "6"
          } : void 0,
          !n.$slots.header && n.$slots["title.week"] ? {
            name: "title.week",
            fn: R((l) => [
              L(n.$slots, "title.week", ne(se(l)))
            ]),
            key: "7"
          } : void 0,
          !n.$slots.header && n.$slots["title.month"] ? {
            name: "title.month",
            fn: R((l) => [
              L(n.$slots, "title.month", ne(se(l)))
            ]),
            key: "8"
          } : void 0,
          !n.$slots.header && n.$slots["title.year"] ? {
            name: "title.year",
            fn: R((l) => [
              L(n.$slots, "title.year", ne(se(l)))
            ]),
            key: "9"
          } : void 0,
          !n.$slots.header && n.$slots["title.years"] ? {
            name: "title.years",
            fn: R((l) => [
              L(n.$slots, "title.years", ne(se(l)))
            ]),
            key: "10"
          } : void 0,
          !n.$slots.header && n.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: R((l) => [
              L(n.$slots, "schedule-heading", ne(se(l)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        ve("div", ba, [
          je(Je, {
            name: `vuecal-slide-fade--${T(F).transitionDirection}`
          }, {
            default: R(() => [
              (V(), P("div", {
                class: he(["vuecal__scrollable", r.value]),
                key: T(F).id + T(F).start.getTime()
              }, [
                y.value ? (V(), Se(_a, { key: 0 }, Ce({ _: 2 }, [
                  n.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: R((l) => [
                      L(n.$slots, "time-cell", ne(se(l)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : Z("", !0),
                T(f).weekNumbers && T(F).isMonth ? (V(), P("div", Ta, [
                  (V(!0), P(de, null, pe(A.value, (l) => (V(), P("div", Ma, [
                    L(n.$slots, "week-number", {}, () => [
                      ve("small", null, ue(l), 1)
                    ])
                  ]))), 256))
                ])) : Z("", !0),
                ve("div", Ea, [
                  je(Da, null, Ce({ _: 2 }, [
                    n.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: R((l) => [
                        L(n.$slots, "weekday-heading", ne(se(l)))
                      ]),
                      key: "0"
                    } : void 0,
                    n.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: R((l) => [
                        L(n.$slots, "schedule-heading", ne(se(l)))
                      ]),
                      key: "1"
                    } : void 0,
                    n.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: R((l) => [
                        L(n.$slots, "event.all-day", ne(se(l)))
                      ]),
                      key: "2"
                    } : void 0,
                    n.$slots.event ? {
                      name: "event",
                      fn: R((l) => [
                        L(n.$slots, "event", ne(se(l)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  je(ka, null, Ce({ _: 2 }, [
                    n.$slots.cell ? {
                      name: "cell",
                      fn: R((l) => [
                        L(n.$slots, "cell", ne(se(l)))
                      ]),
                      key: "0"
                    } : void 0,
                    !n.$slots.cell && n.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: R((l) => [
                        L(n.$slots, "cell-date", ne(se(l)))
                      ]),
                      key: "1"
                    } : void 0,
                    !n.$slots.cell && n.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: R((l) => [
                        L(n.$slots, "cell-content", ne(se(l)))
                      ]),
                      key: "2"
                    } : void 0,
                    !n.$slots.cell && n.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: R((l) => [
                        L(n.$slots, "cell-events", ne(se(l)))
                      ]),
                      key: "3"
                    } : void 0,
                    !n.$slots.cell && !n.$slots["cell-events"] && n.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: R((l) => [
                        L(n.$slots, "event.all-day", ne(se(l)))
                      ]),
                      key: "4"
                    } : void 0,
                    !n.$slots.cell && !n.$slots["cell-events"] && n.$slots[`event.${T(F).id}`] ? {
                      name: `event.${T(F).id}`,
                      fn: R((l) => [
                        L(n.$slots, `event.${T(F).id}`, ne(se(l)))
                      ]),
                      key: "5"
                    } : void 0,
                    !n.$slots.cell && !n.$slots["cell-events"] && n.$slots.event ? {
                      name: "event",
                      fn: R((l) => [
                        L(n.$slots, "event", ne(se(l)))
                      ]),
                      key: "6"
                    } : void 0,
                    !n.$slots.cell && n.$slots["event-count"] ? {
                      name: "event-count",
                      fn: R((l) => [
                        L(n.$slots, "event-count", ne(se(l)))
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
}, Ca = (D) => {
  Ae.texts = { ...ge.texts, ...D }, Ae.dateUtils.updateTexts(Ae.texts);
}, {
  addDatePrototypes: Va,
  removeDatePrototypes: Oa,
  updateTexts: ja,
  addDays: Ha,
  subtractDays: La,
  addHours: za,
  subtractHours: Pa,
  addMinutes: Fa,
  subtractMinutes: Aa,
  getWeek: Na,
  isToday: Ba,
  isSameDate: Wa,
  isInRange: Ia,
  isLeapYear: Ra,
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
  Va as addDatePrototypes,
  Ha as addDays,
  za as addHours,
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
  Ia as isInRange,
  Ra as isLeapYear,
  Wa as isSameDate,
  Ba as isToday,
  Za as isValidDate,
  Oa as removeDatePrototypes,
  qa as stringToDate,
  La as subtractDays,
  Pa as subtractHours,
  Aa as subtractMinutes,
  ja as updateTexts,
  Ca as useLocale
};
