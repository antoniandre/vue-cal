import { computed as S, reactive as Te, watch as me, toRefs as bt, ref as ie, onBeforeUnmount as Be, inject as ze, createElementBlock as z, openBlock as C, renderSlot as V, createCommentVNode as U, unref as T, Fragment as ue, renderList as pe, normalizeClass as ye, createElementVNode as ve, createVNode as je, Transition as Ge, withCtx as W, createBlock as Se, resolveDynamicComponent as xe, mergeProps as le, toHandlers as Re, normalizeProps as te, onMounted as Ze, toDisplayString as ce, withModifiers as et, nextTick as Je, normalizeStyle as _e, createTextVNode as Ue, TransitionGroup as tt, createSlots as Ce, useTemplateRef as Tt, useId as Mt, useAttrs as Yt, provide as at, guardReactiveProps as ne } from "vue";
/**
  * vue-cal v5.0.1-rc.25
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
}, Et = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Xe = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], St = Xe.reduce((p, t, i) => (p[t] = i || 7, p), {}), Ct = (p, t, i) => {
  const { dateUtils: o } = p, w = !1, b = S(() => {
    if (P.value[t.view]) return t.view;
    const g = t.datePicker ? "month" : "week", _ = t.view || g;
    return P.value[_] ? _ : (console.warn(
      `Vue Cal: the provided or default view \`${_}\` is either invalid or not in the list of available views. The first available view will be chosen: \`${Object.keys(P.value)[0]}\`.`
    ), Object.keys(P.value)[0]);
  }), N = S(() => t.sm && !t.xs), d = S(() => t.xs || t.datePicker), H = S(() => t.clickToNavigate || t.datePicker && t.clickToNavigate !== !1), v = S(() => {
    const g = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, _ = (j) => j.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [j, s] of Object.entries(i)) {
      const [A, X, ae] = j.match(/^on(Cell|Event)(.+)$/) || [];
      A && (g[X.toLowerCase()][_(ae).replace(/^-+|-+$/g, "")] = s);
    }
    return g;
  }), u = S(() => {
    var _;
    const g = {};
    return t.hideWeekends && (g[6] = !0) && (g[7] = !0), (_ = t.hideWeekdays) != null && _.length && t.hideWeekdays.forEach((j) => g[St[j]] = !0), g;
  }), h = S(() => t.hideWeekends || u.value[6] && u.value[7]), P = S(() => {
    const g = t.datePicker;
    let _ = 0, j = {};
    const s = t.views;
    return g && !s ? {
      month: { ...ge.availableViews.month },
      year: { ...ge.availableViews.year },
      years: { ...ge.availableViews.years }
    } : (s ? (Array.isArray(s) ? j = s.reduce((A, X) => (typeof X == "string" && ge.availableViews[X] ? A[X] = ge.availableViews[X] : _++, A), {}) : typeof s == "object" && (j = Object.entries(s).reduce((A, [X, ae]) => {
      const { cols: se, rows: de } = ge.availableViews[X];
      return A[X] = { cols: ae.cols || se, rows: ae.rows || de }, A;
    }, {})), _ && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(j).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), j = { ...ge.availableViews })) : j = { ...ge.availableViews }, j);
  }), I = S(() => t.datePicker ? "month" : P.value.week ? "week" : Object.keys(P.value)[0]), a = S(() => {
    if (typeof t.selectedDate == "string") return o.stringToDate(t.selectedDate);
    if (t.selectedDate instanceof Date) return t.selectedDate;
    t.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", t.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), l = S(() => {
    if (!t.disableDays) return [];
    const g = [];
    if (Array.isArray(t.disableDays))
      for (let _ of t.disableDays) {
        let j = _;
        typeof _ == "string" ? j = o.stringToDate(_) : _ instanceof Date && (_ = o.formatDate(_, "YYYY-MM-DD")), j instanceof Date && !isNaN(j.getTime()) ? g.push(_) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", _);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", t.disableDays);
    return g;
  }), e = S(() => {
    let g = null;
    return t.minDate && typeof t.minDate == "string" ? g = o.stringToDate(t.minDate) : t.minDate && t.minDate instanceof Date && (g = t.minDate), (g == null ? void 0 : g.getTime()) || null;
  }), k = S(() => {
    let g = null;
    return t.maxDate && typeof t.maxDate == "string" ? g = o.stringToDate(t.maxDate) : t.maxDate && t.maxDate instanceof Date && (g = t.maxDate), (g == null ? void 0 : g.getTime()) || null;
  }), c = S(() => {
    var j;
    const { view: g } = p;
    return t.schedules.length && (g.isDay || g.isDays || g.isWeek) && ((j = t.schedules) == null ? void 0 : j.map((s, A) => ({ ...s, id: s.id ?? A + 1 }))) || void 0;
  }), M = S(() => {
    const g = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return t.editableEvents === !0 ? g : t.editableEvents === !1 ? Object.keys(g).map((_) => g[_] = !1) : { ...g, ...t.editableEvents };
  }), F = S(() => {
    const { view: g } = p, { eventCount: _ } = t;
    return (Array.isArray(_) ? _.includes(g.id) : _) && (g.isMonth && !t.eventsOnMonthView || g.isYear);
  }), G = S(() => t.allDayEvents && t.time !== !1 && !b.isMonth), m = S(() => t.timeAtCursor && t.time !== !1), f = async (g) => {
    var j;
    let _ = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((s) => s.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((s) => s.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((s) => s.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((s) => s.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((s) => s.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((s) => s.default), "../i18n/da.json": () => import("./i18n/da.js").then((s) => s.default), "../i18n/de.json": () => import("./i18n/de.js").then((s) => s.default), "../i18n/el.json": () => import("./i18n/el.js").then((s) => s.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((s) => s.default), "../i18n/en-us.json": () => Promise.resolve().then(() => Lt).then((s) => s.default), "../i18n/es.json": () => import("./i18n/es.js").then((s) => s.default), "../i18n/et.json": () => import("./i18n/et.js").then((s) => s.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((s) => s.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((s) => s.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((s) => s.default), "../i18n/he.json": () => import("./i18n/he.js").then((s) => s.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((s) => s.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((s) => s.default), "../i18n/id.json": () => import("./i18n/id.js").then((s) => s.default), "../i18n/is.json": () => import("./i18n/is.js").then((s) => s.default), "../i18n/it.json": () => import("./i18n/it.js").then((s) => s.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((s) => s.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((s) => s.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((s) => s.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((s) => s.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((s) => s.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((s) => s.default), "../i18n/no.json": () => import("./i18n/no.js").then((s) => s.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((s) => s.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((s) => s.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((s) => s.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((s) => s.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((s) => s.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((s) => s.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((s) => s.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((s) => s.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((s) => s.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((s) => s.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((s) => s.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((s) => s.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((s) => s.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((s) => s.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((s) => s.default) });
    {
      if (!_[`../i18n/${g}.json`]) {
        console.warn(`Vue Cal: the locale \`${g}\` does not exist. Falling back to \`en-us\`.`), g = "en-us";
        return;
      }
      _ = await ((j = _[`../i18n/${g}.json`]) == null ? void 0 : j.call(_));
    }
    p.texts = Object.assign(p.texts, Object.assign({ ...ge.texts }, _)), o.updateTexts(p.texts);
  }, L = Te(t.events || []);
  return me(() => t.events, (g) => L.splice(0, L.length, ...g)), me(() => t.locale, (g) => f(g || "en-us")), (t.locale || !p.texts.today) && f(t.locale || "en-us"), {
    ...bt(t),
    events: L,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: v,
    defaultView: I,
    availableViews: P,
    disableDays: l,
    ready: w,
    sm: N,
    xs: d,
    clickToNavigate: H,
    hideWeekdays: u,
    hideWeekends: h,
    minTimestamp: e,
    maxTimestamp: k,
    schedules: c,
    selectedDate: a,
    editableEvents: M,
    showCellEventCount: F,
    allDayEvents: G,
    timeAtCursor: m,
    view: b,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(u.value).length;
    },
    get size() {
      return d.value ? "xs" : N.value ? "sm" : "lg";
    },
    loadTexts: f
  };
}, Oe = (p, t) => {
  const i = t.timeTo - t.timeFrom;
  return (p - t.timeFrom) * 100 / i;
}, Le = (p, t) => {
  const i = t.timeTo - t.timeFrom;
  return ~~(p * i / 100 + t.timeFrom);
}, Ke = (p, t) => {
  const i = t.clientHeight;
  return p * 100 / i;
}, Ie = Te({ id: null, date: null });
let nt = !1, qe = !0;
const ke = Te({ el: null, cell: null, timeout: null }), $e = Te({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function Vt(p) {
  const { config: t, view: i, eventsManager: o, emit: w, uid: b, dateUtils: N } = p, d = (e) => {
    var f;
    const { timeStep: k, timeCellHeight: c, timeFrom: M } = t, F = (((f = e.touches) == null ? void 0 : f[0]) || e).clientY, { top: G } = e.currentTarget.getBoundingClientRect(), m = F - G - ~~e.dataTransfer.getData("cursor-grab-at");
    return Le(Ke(m, e.currentTarget), t);
  }, H = (e, k, c) => {
    const M = k.duration || v(k.start, k.end) || t.timeStep;
    let F = Math.max(d(e), 0);
    if (t.snapToInterval) {
      const L = F + t.snapToInterval / 2;
      F = L - L % t.snapToInterval;
    }
    const G = new Date(new Date(c).setMinutes(F)), m = Math.min(F + M, 24 * 60), f = new Date(new Date(c).setMinutes(m));
    return { start: G, end: f };
  }, v = (e, k) => Math.round((k - e) / 6e4);
  return {
    eventDragStart: (e, k) => {
      if (e.target.nodeType === 3 || p.touch.isResizingEvent) return e.preventDefault();
      e.dataTransfer.effectAllowed = "move", e.dataTransfer.dropEffect = "move";
      const c = { ...k, _: { id: k._.id, duration: v(k.start, k.end) } };
      try {
        e.dataTransfer.setData("text/plain", ""), e.dataTransfer.setData("event", JSON.stringify(c)), e.dataTransfer.setData("cursor-grab-at", e.offsetY);
      } catch (F) {
        return console.warn("Vue Cal: Failed to set drag data:", F), e.preventDefault();
      }
      $e.eventId = k._.id, $e.fromVueCal = b, w("event-drag-start", {
        e,
        event: k
      });
      const M = e.target.closest(".vuecal__event");
      M.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        M.classList.add("vuecal__event--dragging-original"), M.classList.remove("vuecal__event--dragging-ghost");
      }, 0), nt = !1, Object.assign(Ie, { id: i.id, date: i.firstCellDate }), qe = !0, p.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (e, k) => {
      $e.eventId = null, e.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: c, toVueCal: M } = $e;
      M && c !== M && o.deleteEvent(k._.id, 3), nt && qe && Ie.id && i.switchView(Ie.id, Ie.date, !0), w("event-drag-end", {
        e,
        event: k,
        external: $e.fromVueCal !== b
      }), $e.fromVueCal = null, $e.toVueCal = null, p.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (e, k) => {
      const { start: c } = k, M = e.currentTarget;
      if (!e.currentTarget.contains(e.relatedTarget)) {
        if (M === ke.el || !M.className.includes("vuecal__cell-content")) return !1;
        ke.el && (ke.cell.highlighted = !1), Object.assign(ke, { el: M, cell: k, timeout: clearTimeout(ke.timeout) }), k.highlighted = !0, ["years", "year", "month"].includes(i.id) && (ke.timeout = setTimeout(() => p.switchToNarrowerView(c), 2e3));
      }
    },
    cellDragOver: (e, k) => {
      const { start: c, schedule: M } = k;
      e.preventDefault(), k.highlighted = !0, (M || M === 0) && (k.highlightedSchedule = M);
    },
    cellDragLeave: (e, k) => {
      e.preventDefault(), !e.currentTarget.contains(e.relatedTarget) && (k.highlightedSchedule = !1, ke.cell === k && (clearTimeout(ke.timeout), Object.assign(ke, { el: null, cell: null, timeout: null }), k.highlighted = !1));
    },
    cellDragDrop: async (e, k, c = !1) => {
      var j, s, A;
      e.preventDefault(), clearTimeout(ke.timeout), Object.assign(ke, { el: null, cell: null, timeout: null });
      const M = JSON.parse(e.dataTransfer.getData("event") || "{}");
      M.start && (M.start = new Date(M.start)), M.end && (M.end = new Date(M.end));
      let F, G, m;
      c ? (G = new Date(k.start), m = new Date(k.end)) : { start: G, end: m } = H(e, M, k.start);
      const { schedule: f } = ((j = e.target.closest("[data-schedule]")) == null ? void 0 : j.dataset) || {};
      let L = () => {
      };
      $e.fromVueCal === b ? (F = o.getEvent(M._.id), F && (F._.dragging = !1, L = (X) => {
        if (F.start = G, F.end = m, F.allDay = c, f !== void 0 && (F.schedule = ~~f), X && typeof X == "object") {
          const { _: ae, ...se } = X;
          Object.assign(F, se);
        }
      })) : (F = {
        ...M,
        start: G,
        end: m,
        ...f !== void 0 && { schedule: ~~f },
        _: { id: ((s = M._) == null ? void 0 : s.id) || M.id, duration: v(G, m) },
        getOverlappingEvents: () => o.getEventsInRange(G, m, { schedule: ~~f })
      }, L = (X) => {
        if (F = o.createEvent(F), X && typeof X == "object") {
          const { _: ae, ...se } = X;
          Object.assign(F, se);
        }
      });
      let g = !0;
      const { drop: _ } = (A = t.eventListeners) == null ? void 0 : A.event;
      _ && (g = await _({
        e,
        event: { ...F, start: G, end: m, schedule: ~~f },
        overlaps: F.getOverlappingEvents({ start: G, end: m, schedule: ~~f }),
        cell: k,
        external: $e.fromVueCal !== b
      })), g !== !1 && L(g), k.highlighted = !1, k.highlightedSchedule = null, qe = !1, $e.toVueCal = b, w("event-dropped", {
        e,
        cell: k,
        event: F,
        originalEvent: M,
        external: $e.fromVueCal !== b
      });
    }
  };
}
const lt = (p, t) => {
  let i, o, w, b = {}, N = {};
  const d = ie(p), H = () => {
    d.value.today || (d.value = t), Date.prototype.addDays = function(n) {
      return P(this, n || 0);
    }, Date.prototype.subtractDays = function(n) {
      return I(this, n || 0);
    }, Date.prototype.addHours = function(n) {
      return a(this, n || 0);
    }, Date.prototype.subtractHours = function(n) {
      return l(this, n || 0);
    }, Date.prototype.addMinutes = function(n) {
      return e(this, n || 0);
    }, Date.prototype.subtractMinutes = function(n) {
      return k(this, n || 0);
    }, Date.prototype.getWeek = function() {
      return M(this);
    }, Date.prototype.isToday = function() {
      return F(this);
    }, Date.prototype.isLeapYear = function() {
      return f(this);
    }, Date.prototype.format = function(n = "YYYY-MM-DD") {
      return X(this, n);
    }, Date.prototype.formatTime = function(n = "HH:mm") {
      return se(this, n);
    };
  }, v = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, u = (n) => {
    d.value = n, Date.prototype.subtractDays && H();
  }, h = () => (o !== (/* @__PURE__ */ new Date()).getDate() && (i = /* @__PURE__ */ new Date(), o = i.getDate(), w = `${i.getFullYear()}-${i.getMonth()}-${i.getDate()}`), w), P = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setDate(D.getDate() + $), D;
  }, I = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setDate(D.getDate() - $), D;
  }, a = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setHours(D.getHours() + $), D;
  }, l = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setHours(D.getHours() - $), D;
  }, e = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setMinutes(D.getMinutes() + $), D;
  }, k = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setMinutes(D.getMinutes() - $), D;
  }, c = (n, $) => {
    const D = (q) => {
      const K = q % $;
      return K !== 0 && (q += K >= $ / 2 ? $ - K : -K), q;
    };
    if (typeof n == "number") return D(n);
    if (n instanceof Date) {
      let q = D(n.getMinutes());
      q >= 60 && (n.setHours(n.getHours() + 1), q = 0), n.setMinutes(q, 0, 0);
    }
  }, M = (n, $ = !1) => {
    const D = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())), q = D.getUTCDay() || 7;
    D.setUTCDate(D.getUTCDate() + 4 - q);
    const K = new Date(Date.UTC(D.getUTCFullYear(), 0, 1));
    return Math.ceil(((D - K) / 864e5 + 1) / 7) + ($ ? 1 : 0);
  }, F = (n) => `${n.getFullYear()}-${n.getMonth()}-${n.getDate()}` === h(), G = (n, $) => {
    if (!n || !$) return console.warn(`Vue Cal: missing date${n ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (A(n)) {
      if (!A($)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${$}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${n}\`.`);
    return n.getFullYear() === $.getFullYear() && n.getMonth() === $.getMonth() && n.getDate() === $.getDate();
  }, m = (n, $, D) => A(n) ? n.getTime() >= $ && n.getTime() <= D : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${n}\`.`), f = (n) => {
    const $ = n.getFullYear();
    return !($ % 400) || $ % 100 && !($ % 4);
  }, L = (n = null, $) => {
    const D = n && new Date(n.valueOf()) || /* @__PURE__ */ new Date(), q = $ ? 7 : 6;
    return D.setDate(D.getDate() - (D.getDay() + q) % 7), D;
  }, g = (n) => n instanceof Date ? n : (n.length === 10 && (n += " 00:00"), new Date(n.replace(/-/g, "/"))), _ = (n) => n.getHours() * 60 + n.getMinutes(), j = (n, $) => {
    typeof n == "string" && (n = n.replace(/-/g, "/")), typeof $ == "string" && ($ = $.replace(/-/g, "/")), n = new Date(n).setHours(0, 0, 0, 0), $ = new Date($).setHours(0, 0, 1, 0);
    const D = (new Date($).getTimezoneOffset() - new Date(n).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil(($ - n - D) / (24 * 3600 * 1e3));
  }, s = (n, $, D) => Math.abs(n.getTime() - $.getTime()) <= D * 60 * 1e3, A = (n) => n && n instanceof Date && !isNaN(n), X = (n, $ = "YYYY-MM-DD", D = null) => {
    if (D || (D = d.value), $ || ($ = "YYYY-MM-DD"), $ === "YYYY-MM-DD") return ae(n);
    b = {}, N = {};
    const q = {
      YYYY: () => ee(n, D).YYYY,
      YY: () => ee(n, D).YY(),
      M: () => ee(n, D).M,
      MM: () => ee(n, D).MM(),
      MMM: () => ee(n, D).MMM(),
      MMMM: () => ee(n, D).MMMM(),
      MMMMG: () => ee(n, D).MMMMG(),
      D: () => ee(n, D).D,
      DD: () => ee(n, D).DD(),
      S: () => ee(n, D).S(),
      d: () => ee(n, D).d,
      dd: () => ee(n, D).dd(),
      ddd: () => ee(n, D).ddd(),
      dddd: () => ee(n, D).dddd(),
      HH: () => oe(n, D).HH,
      H: () => oe(n, D).H,
      hh: () => oe(n, D).hh,
      h: () => oe(n, D).h,
      am: () => oe(n, D).am,
      AM: () => oe(n, D).AM,
      mm: () => oe(n, D).mm,
      m: () => oe(n, D).m,
      s: () => oe(n, D).s
    };
    return $.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (K, De) => {
      const r = q[De.replace(/\{|\}/g, "")];
      return r !== void 0 ? r() : De;
    });
  }, ae = (n) => {
    const $ = n.getMonth() + 1, D = n.getDate();
    return `${n.getFullYear()}-${$ < 10 ? "0" : ""}${$}-${D < 10 ? "0" : ""}${D}`;
  }, se = (n, $ = "HH:mm", D = null, q = !1) => {
    let K = !1;
    if (q) {
      const [E, O, Y] = [n.getHours(), n.getMinutes(), n.getSeconds()];
      E + O + Y === 141 && (K = !0);
    }
    if (n instanceof Date && $ === "HH:mm") return K ? "24:00" : de(n);
    N = {}, D || (D = d.value);
    const De = oe(n, D), r = $.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (E, O) => {
      const Y = De[O.replace(/\{|\}/g, "")];
      return Y !== void 0 ? Y : O;
    });
    return K ? r.replace("23:59", "24:00") : r;
  }, de = (n) => {
    const $ = n.getHours(), D = n.getMinutes();
    return `${($ < 10 ? "0" : "") + $}:${(D < 10 ? "0" : "") + D}`;
  }, Z = (n) => {
    const $ = Math.floor(n / 60).toString().padStart(2, 0), D = (n % 60).toString().padStart(2, 0);
    return `${$}:${D}`;
  }, he = (n) => {
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
  }, ee = (n, $) => {
    if (b.D) return b;
    const D = n.getFullYear(), q = n.getMonth() + 1, K = n.getDate(), r = (n.getDay() - 1 + 7) % 7;
    return b = {
      // Year.
      YYYY: D,
      // 2024.
      YY: () => D.toString().substring(2),
      // 24.
      // Month.
      M: q,
      // 1 to 12.
      MM: () => q.toString().padStart(2, 0),
      // 01 to 12.
      MMM: () => $.months[q - 1].substring(0, 3),
      // Jan to Dec.
      MMMM: () => $.months[q - 1],
      // January to December.
      MMMMG: () => ($.monthsGenitive || $.months)[q - 1],
      // January to December in genitive form (Greek...)
      // Day.
      D: K,
      // 1 to 31.
      DD: () => K.toString().padStart(2, 0),
      // 01 to 31.
      S: () => he(K),
      // st, nd, rd, th.
      // Day of the week.
      d: r + 1,
      // 1 to 7 with 7 = Sunday.
      // Some locales have same start for all the days, so they have specific abbrev in weekDaysShort.
      dd: () => $.weekDaysShort.length ? $.weekDaysShort[r] : $.weekDays[r][0],
      // M to S.
      ddd: () => $.weekDaysShort.length ? $.weekDaysShort[r] : $.weekDays[r].substr(0, 3),
      // Mon to Sun.
      dddd: () => $.weekDays[r]
      // Monday to Sunday.
    }, b;
  }, oe = (n, $) => {
    if (N.am) return N;
    let D, q, K;
    n instanceof Date ? (D = n.getHours(), q = n.getMinutes(), K = n.getSeconds()) : (D = Math.floor(n / 60), q = Math.floor(n % 60));
    const De = D % 12 ? D % 12 : 12, r = ($ || { am: "am", pm: "pm" })[D === 24 || D < 12 ? "am" : "pm"];
    return N = {
      H: D,
      h: De,
      HH: D.toString().padStart(2, 0),
      hh: De.toString().padStart(2, 0),
      am: r,
      AM: r.toUpperCase(),
      m: q,
      mm: q.toString().padStart(2, 0),
      s: K
    }, N;
  };
  return {
    addDatePrototypes: H,
    removeDatePrototypes: v,
    updateTexts: u,
    addDays: P,
    subtractDays: I,
    addHours: a,
    subtractHours: l,
    addMinutes: e,
    subtractMinutes: k,
    snapToInterval: c,
    getWeek: M,
    isToday: F,
    isSameDate: G,
    isInRange: m,
    isLeapYear: f,
    getPreviousFirstDayOfWeek: L,
    stringToDate: g,
    dateToMinutes: _,
    countDays: j,
    datesInSameTimeStep: s,
    isValid: A,
    formatDate: X,
    formatDateLite: ae,
    formatTime: se,
    formatTimeLite: de,
    formatMinutes: Z
  };
}, Ot = (p) => {
  const { dateUtils: t, config: i } = p;
  let o = 0;
  const w = S(() => {
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
    }, l = i.events.sort((e, k) => e.start - k.start < 0 ? -1 : 1);
    for (const e of l)
      if (b(e), N(e), a.byId[e._.id] = e, e.recurring)
        a.recurring.push(e._.id);
      else if (e._.multiday)
        a.multiday.push(e._.id), a.byDate[e._.startFormatted] || (a.byDate[e._.startFormatted] = []), a.byDate[e._.startFormatted].push(e._.id);
      else {
        a.byDate[e._.startFormatted] || (a.byDate[e._.startFormatted] = []), a.byDate[e._.startFormatted].push(e._.id);
        const k = e._.startFormatted.substring(0, 4), c = e._.startFormatted.substring(5, 7), M = e._.startFormatted.substring(8, 10);
        a.byYear[k] || (a.byYear[k] = {}), a.byYear[k][c] || (a.byYear[k][c] = {}), a.byYear[k][c][M] || (a.byYear[k][c][M] = []), a.byYear[k][c][M].push(e._.id);
      }
    return a;
  }), b = (a) => {
    if (typeof a.start == "string" && (a.start = t.stringToDate(a.start)), typeof a.end == "string" && (a.end = t.stringToDate(a.end)), a.start.setSeconds(0, 0), a.end.getSeconds() >= 59 ? a.end.setMinutes(60, 0, 0) : a.end.setSeconds(0, 0), isNaN(a.start) || isNaN(a.end) || a.end.getTime() < a.start.getTime()) {
      isNaN(a.start) ? console.error(`Vue Cal: invalid start date for event "${a.title}".`, a.start) : isNaN(a.end) ? console.error(`Vue Cal: invalid end date for event "${a.title}".`, a.end) : console.error(`Vue Cal: invalid event dates for event "${a.title}". The event ends before it starts.`, a.start, a.end);
      return;
    }
    a._ || (a._ = {}), a._.multiday = !t.isSameDate(a.start, new Date(a.end.getTime() - 1)), a._.startFormatted = t.formatDate(a.start), a._.startMinutes = ~~t.dateToMinutes(a.start), a._.endMinutes = ~~t.dateToMinutes(a.end);
    const l = a.start.getHours(), e = a.start.getMinutes().toString().padStart(2, 0), k = a.end.getHours(), c = a.end.getMinutes().toString().padStart(2, 0);
    a._.startTimeFormatted24 = `${l.toString().padStart(2, 0)}:${e}`, a._.startTimeFormatted12 = `${l % 12 || 12}${e ? `:${e}` : ""} ${l < 12 ? "AM" : "PM"}`, a._.endTimeFormatted24 = `${k.toString().padStart(2, 0)}:${c}`, a._.endTimeFormatted12 = `${k % 12 || 12}${c ? `:${c}` : ""} ${k < 12 ? "AM" : "PM"}`, a._.duration = Math.abs(~~((a.end - a.start) / 6e4));
  }, N = (a) => {
    a._ || (a._ = {}), a._.id = a._.id || ++o, a.delete || (a.delete = (l) => u(a._.id, l)), a._.deleting = !1, a._.deleted = !1, a.isOverlapping = (l = null) => a.getOverlappingEvents(l).length, a.getOverlappingEvents = (l = null) => {
      var e;
      return P(
        (l == null ? void 0 : l.start) || a.start,
        (l == null ? void 0 : l.end) || a.end,
        { excludeIds: [a._.id], schedule: (e = i.schedules) != null && e.length ? ~~((l == null ? void 0 : l.schedule) || a.schedule) : null }
      );
    }, a._.register = (l) => {
      a._.$el = l, a._.fireCreated && (p.emit("event-created", a), delete a._.fireCreated);
    }, a._.unregister = () => {
      a._.$el = null, a._.register = null, a.isOverlapping = null, a.getOverlappingEvents = null, a.delete = null;
    };
  }, d = (a) => w.value.byId[a], H = (a) => {
    const l = [];
    for (const { start: e, end: k } of a) {
      const c = P(e, k);
      c.length && l.push(...c);
    }
    return l;
  }, v = (a) => {
    if (!a.start || !a.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return i.snapToInterval && (t.snapToInterval(a.start, i.snapToInterval), t.snapToInterval(a.end, i.snapToInterval)), a = { ...a }, a._ || (a._ = {}), a._.id = ++o, a._.fireCreated = !0, i.events.push(a), a;
  }, u = async (a, l = 0) => {
    var F, G;
    if (!a) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let e = typeof a == "string" || !isNaN(a) ? a : null;
    const k = typeof a == "object" ? Object.entries(a) : null;
    if (k) {
      const [m, f] = k[0];
      e = (F = i.events.find((L) => L[m] === f)) == null ? void 0 : F._.id;
    }
    if (!i.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!e) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const c = i.events.findIndex((m) => m._.id === e);
    if (c === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${e}\`.`);
    const M = i.events[c];
    if (M.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${e}\` since it was explicitely set to \`delete: false\`.`);
    switch (l) {
      case 0:
        M._.deleting ? i.events.splice(c, 1) : M._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        M._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        M._.deleted = !0, i.events[c]._.deleted = !0, (G = M._.$el) == null || G.dispatchEvent(new CustomEvent("event-deleted", { detail: M._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        i.events.splice(c, 1), p.emit("update:events", i.events), p.emit("event-delete", M);
        break;
    }
    return !0;
  }, h = (a, l, e) => {
    const k = i.allDayEvents ? { allDay: e } : {}, c = P(a, l, { background: !1, ...k });
    if (!c.length) return { cellOverlaps: {}, longestStreak: 0 };
    const M = {};
    let F = [], G = 0;
    c.sort((m, f) => m.start - f.start || m.end - m.start - (f.end - f.start));
    for (const m of c) {
      const f = m._.id;
      M[f] || (M[f] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), F = F.filter((s) => s.end > m.start);
      const L = F.filter((s) => {
        var X;
        return (!((X = i.schedules) != null && X.length) || m.schedule === s.schedule) && s.start < m.end;
      }), g = new Set(L.map((s) => {
        var A;
        return ((A = M[s._.id]) == null ? void 0 : A.position) ?? 0;
      }));
      let _ = 0;
      for (; g.has(_); ) _++;
      M[f].position = _, F.push(m);
      const j = Math.max(1, ...L.map((s) => {
        var A;
        return ((A = M[s._.id]) == null ? void 0 : A.maxConcurrent) ?? 1;
      }));
      M[f].maxConcurrent = Math.max(L.length + 1, j);
      for (const s of L)
        M[s._.id].overlaps.add(f), M[f].overlaps.add(s._.id), M[s._.id].maxConcurrent = M[f].maxConcurrent;
      G = Math.max(G, M[f].maxConcurrent);
    }
    for (const m in M) M[m].overlaps = [...M[m].overlaps];
    return { cellOverlaps: M, longestStreak: G };
  }, P = (a, l, { excludeIds: e = [], schedule: k = null, background: c = !0, allDay: M = !1 } = {}) => {
    const F = a.getFullYear(), G = l.getFullYear(), m = a.getMonth() + 1, f = l.getMonth() + 1, L = a.getDate(), g = l.getDate(), _ = a.getTime(), j = l.getTime(), s = [], A = new Set(e);
    for (let X = F; X <= G; X++) {
      const ae = `${X}`, se = w.value.byYear[ae];
      if (!se) continue;
      const de = X === F ? m : 1, Z = X === G ? f : 12;
      for (let he = de; he <= Z; he++) {
        const ee = String(he).padStart(2, "0"), oe = se[ee];
        if (oe)
          for (const n in oe) {
            const $ = +n;
            if (X === F && he === m && $ < L || X === G && he === f && $ > g) continue;
            const D = oe[n];
            for (let q = 0; q < D.length; q++) {
              const K = w.value.byId[D[q]];
              !K || A.has(K._.id) || k !== null && k !== K.schedule || c === !1 && K.background || i.allDayEvents && (M && !K.allDay || !M && K.allDay) || K.end.getTime() > _ && K.start.getTime() < j && s.push(K);
            }
          }
      }
    }
    return s;
  };
  return {
    events: w,
    getEvent: d,
    getViewEvents: H,
    getCellOverlappingEvents: h,
    getEventsInRange: P,
    createEvent: v,
    deleteEvent: u,
    isEventInRange: (a, l, e) => {
      const k = a.allDay || !i.time, c = k ? new Date(a.start).setHours(0, 0, 0, 0) : a.start.getTime(), M = k ? new Date(a.end).setHours(23, 59, 59, 999) : a.end.getTime(), F = k ? new Date(l).setHours(0, 0, 0, 0) : l.getTime(), G = k ? new Date(e).setHours(23, 59, 59, 999) : e.getTime();
      return M > F && c < G;
    }
  };
}, jt = ({ config: p, dateUtils: t, emit: i, texts: o, eventsManager: w }, b) => {
  const { availableViews: N } = p, d = ie(p.view && N[p.view] ? p.view : p.defaultView), H = ie(p.selectedDate || null), v = ie(/* @__PURE__ */ new Date()), u = ie(new Date(p.viewDate || v.value));
  u.value.setHours(0, 0, 0, 0);
  const h = ie(new Date(u));
  let P = null;
  const I = S(() => d.value === "month" ? h.value : f.value), a = S(() => d.value === "month" ? new Date(h.value.getFullYear(), h.value.getMonth() + 1, 0, 23, 59, 59, 999) : g.value), l = S(() => d.value === "week" ? t.getPreviousFirstDayOfWeek(f.value, p.startWeekOnSunday) : d.value === "month" ? f.value : I.value), e = S(() => {
    if (d.value === "week") {
      const y = t.addDays(l.value, 7);
      return y.setMilliseconds(-1), y;
    }
    return d.value === "month" ? g.value : a.value;
  }), k = S(() => {
    const y = v.value.getTime();
    if (d.value === "week")
      return l.value.getTime() <= y && y <= e.value.getTime();
    const R = f.value.getTime(), x = g.value.getTime();
    return R <= y && y <= x;
  });
  function c() {
    v.value = /* @__PURE__ */ new Date(), P = setTimeout(c, 60 * 1e3);
  }
  function M() {
    P = setTimeout(c, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), c();
  }
  const F = S(() => {
    if (!p.availableViews[d.value]) return 1;
    let y = p.availableViews[d.value].cols;
    return p.hasHiddenDays && ["week", "month"].includes(d.value) && (y -= p.hasHiddenDays), y;
  }), G = S(() => {
    var y;
    return ((y = p.availableViews[d.value]) == null ? void 0 : y.rows) || 1;
  }), m = S(() => F.value * G.value), f = S(() => {
    if (d.value === "month") {
      let y = h.value.getDay() || 7;
      return p.startWeekOnSunday && !p.hideWeekdays[7] && (y += 1), p.viewDayOffset && (y -= p.viewDayOffset), t.subtractDays(h.value, y - 1);
    }
    if (d.value === "week") {
      const y = "1234567".split("").filter((x) => !Object.keys(p.hideWeekdays).includes(x));
      let R = Math.min(...y);
      return p.startWeekOnSunday && !p.hideWeekdays[7] && (R = 1), p.viewDayOffset && (R += p.viewDayOffset), t.addDays(h.value, R - 1);
    }
    return h.value;
  }), L = S(() => {
    const y = [], R = ["days", "week", "month"].includes(d.value);
    let x = 0;
    for (let Q = 0; Q < m.value + x; Q++)
      switch (d.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const fe = t.addDays(f.value, Q), Ae = fe.getDay() || 7;
          if (R && p.hasHiddenDays && p.hideWeekdays[Ae]) {
            x++;
            continue;
          }
          const Ve = new Date(fe);
          Ve.setHours(23, 59, 59, 999), y.push({ start: fe, startFormatted: t.formatDate(fe), end: Ve });
          break;
        }
        case "year":
          y.push({
            start: new Date(f.value.getFullYear(), Q, 1, 0, 0, 0, 0),
            end: new Date(f.value.getFullYear(), Q + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          y.push({
            start: new Date(f.value.getFullYear() + Q, 0, 1, 0, 0, 0, 0),
            end: new Date(f.value.getFullYear() + Q + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return y;
  }), g = S(() => L.value[L.value.length - 1].end), _ = ie("right"), j = S(() => {
    const y = Object.keys(p.availableViews);
    return y[y.indexOf(d.value) + 1];
  }), s = S(() => {
    const y = Object.keys(p.availableViews);
    return y[y.indexOf(d.value) - 1];
  });
  function A(y, R, x = !1) {
    if (!R || !R[y]) return y + 1;
    const Q = R[y];
    return x && typeof Q == "string" ? Q.substring(0, 3) : Q;
  }
  function X(y, R, x) {
    const { monthsArray: Q, monthBeforeDay: fe, canTruncate: Ae, xs: Ve } = x, Me = y.getMonth(), Ye = y.getFullYear(), Ee = R.getMonth(), He = R.getFullYear(), We = Me !== Ee, _t = Ye !== He, be = Ae && (Ve || We), Pe = y.getDate(), Fe = R.getDate();
    return _t ? fe ? `${A(Me, Q, be)} ${Pe}, ${Ye} - ${A(Ee, Q, be)} ${Fe}, ${He}` : `${Pe} ${A(Me, Q, be)} ${Ye} - ${Fe} ${A(Ee, Q, be)} ${He}` : We ? fe ? `${A(Me, Q, be)} ${Pe} - ${A(Ee, Q, be)} ${Fe}, ${Ye}` : `${Pe} ${A(Me, Q, be)} - ${Fe} ${A(Ee, Q, be)} ${Ye}` : fe ? `${A(Me, Q, be)} ${Pe}-${Fe}, ${Ye}` : `${Pe}-${Fe} ${A(Me, Q, be)} ${Ye}`;
  }
  const ae = S(() => {
    const { dateFormat: y, months: R, monthsGenitive: x, week: Q, truncations: fe } = o, Ae = p.locale, Ve = fe !== !1, Me = y.indexOf("M") < y.indexOf("D"), Ye = x && Ae === "el" ? x : R;
    switch (d.value) {
      case "day":
        return t.formatDate(f.value, y);
      case "days":
      case "week": {
        const Ee = {
          monthsArray: Ye,
          monthBeforeDay: Me,
          canTruncate: Ve,
          xs: p.xs
        };
        let He = X(f.value, g.value, Ee);
        if (d.value === "week") {
          const We = t.getWeek(
            f.value,
            p.startWeekOnSunday && !p.hideWeekdays[7]
          );
          He += ` <small>${Q} ${We}</small>`;
        }
        return He;
      }
      case "month": {
        const Ee = `${p.xs && Ve ? "MMM" : "MMMM"} YYYY`;
        return t.formatDate(I.value, Ee);
      }
      case "year":
        return f.value.getFullYear();
      case "years":
        return `${f.value.getFullYear()} - ${a.value.getFullYear()}`;
    }
  });
  function se() {
    switch (h.value = new Date(u.value || v.value), h.value.setHours(0, 0, 0, 0), d.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        h.value = t.getPreviousFirstDayOfWeek(h.value, p.startWeekOnSunday && !p.hideWeekdays[7]);
        break;
      case "month":
        h.value = new Date(h.value.getFullYear(), h.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        h.value = new Date(h.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        h.value = new Date(h.value.getFullYear() - h.value.getFullYear() % m.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    p.ready && i("view-change", {
      id: d.value,
      title: ae.value,
      start: I.value,
      end: a.value,
      extendedStart: l.value,
      extendedEnd: e.value,
      cellDates: L.value,
      containsToday: k.value,
      events: J.value
    }), v.value = /* @__PURE__ */ new Date();
  }
  function de(y) {
    const R = d.value, x = p.availableViews[R];
    y[R] && JSON.stringify(y[R]) === JSON.stringify(x) || se();
  }
  function Z(y, R = !0) {
    const x = Object.keys(p.availableViews);
    d.value !== y && (x.includes(y) ? (_.value = x.indexOf(y) < x.indexOf(d.value) ? "left" : "right", d.value = y, i("update:view", y), se()) : console.warn(`Vue Cal: the \`${y}\` view is not available.`));
  }
  function he() {
    j.value ? Z(j.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function ee() {
    s.value ? Z(s.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function oe() {
    $(!1);
  }
  function n() {
    $(!0);
  }
  function $(y = !0) {
    let R = new Date(u.value);
    switch (d.value) {
      case "day":
      case "days":
        y ? R = t.addDays(g.value, 1) : R = t.subtractDays(f.value, m.value);
        break;
      case "week": {
        y ? (R = t.addDays(e.value, 1), R.setHours(0, 0, 0, 0)) : R = t.subtractDays(l.value, m.value);
        break;
      }
      case "month": {
        const x = y ? 1 : -1;
        R = new Date(R.getFullYear(), R.getMonth() + x, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const x = y ? 1 : -1;
        R = new Date(R.getFullYear() + x, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const x = y ? m.value : -m.value;
        R = new Date(R.getFullYear() + x, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    q(R);
  }
  function D() {
    const y = /* @__PURE__ */ new Date();
    y.setHours(0, 0, 0, 0), q(y);
  }
  function q(y, R = !0, x = !1) {
    if (!t.isValid(y)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [Q, fe] = [f.value, g.value];
    d.value === "month" && ([Q, fe] = [I.value, a.value]), (!t.isInRange(y, Q, fe) || x) && (y.setHours(0, 0, 0, 0), _.value = y.getTime() < Q.getTime() ? "left" : "right", u.value = y, R && i("update:viewDate", y), se());
  }
  function K(y, R = !0) {
    if (!t.isValid(y)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: x, isSameDate: Q } = t;
    (!H.value || !x(H.value) || !Q(y, H.value)) && (y.setHours(0, 0, 0, 0), H.value = y, R && i("update:selectedDate", y));
  }
  function De(y) {
    !y && !h.value.getDay() ? q(t.addDays(h.value, 1), !0, !0) : (_.value = "left", se());
  }
  function r(y) {
    y && p.startWeekOnSunday && !h.value.getDay() ? q(t.addDays(h.value, 1), !0, !0) : !y && p.startWeekOnSunday && h.value.getDay() === 1 && q(t.subtractDays(h.value, 1), !0, !0);
  }
  function E() {
    console.log("toggling weekdays", p.hideWeekdays);
  }
  function O(y) {
    var Q;
    const R = (Q = b.value) == null ? void 0 : Q.querySelector(".vuecal__scrollable"), x = y ? y * p.timeCellHeight / p.timeStep : 0;
    R == null || R.scrollTo({ top: x, behavior: "smooth" });
  }
  function Y() {
    const y = /* @__PURE__ */ new Date();
    O(y.getHours() * 60 + y.getMinutes());
  }
  function B() {
    O(0);
  }
  const J = S(() => w.getViewEvents(L.value)), re = w.createEvent, we = w.deleteEvent;
  return me(() => p.view, (y) => Z(y, !1)), me(() => p.availableViews, de), me(() => p.datePicker, () => Z("month", !1)), me(() => p.viewDate, (y) => q(y, !1)), me(() => p.selectedDate, (y) => K(y, !1)), me(() => p.startWeekOnSunday, (y) => De(y)), me(() => p.hideWeekends, (y) => r(y)), me(() => p.hideWeekdays, E), me(() => m.value, () => {
    m.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), me(() => p.watchRealTime, (y) => {
    y && p.time ? M() : P = clearTimeout(P);
  }), se(), p.time && p.watchRealTime && M(), Be(() => P = clearTimeout(P)), {
    now: v,
    id: d,
    broaderView: j,
    narrowerView: s,
    title: ae,
    viewDate: u,
    start: I,
    end: a,
    extendedStart: l,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: e,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: f,
    lastCellDate: g,
    containsToday: k,
    selectedDate: H,
    cellDates: L,
    cols: F,
    rows: G,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: J,
    transitionDirection: _,
    switch: Z,
    broader: he,
    narrower: ee,
    previous: oe,
    next: n,
    navigate: $,
    goToToday: D,
    updateViewDate: q,
    updateSelectedDate: K,
    scrollToCurrentTime: Y,
    scrollToTime: O,
    scrollTop: B,
    createEvent: re,
    deleteEvent: we,
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
}, rt = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], ot = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], it = "Years", ut = "Year", ct = "Month", dt = "Week", vt = "Days", ft = "Day", mt = "Today", gt = "No Event", yt = "All-day", ht = "Delete", Dt = "Create an event", pt = "dddd, MMMM D, YYYY", wt = "am", kt = "pm", Qe = {
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
  allDay: yt,
  deleteEvent: ht,
  createEvent: Dt,
  dateFormat: pt,
  am: wt,
  pm: kt
}, Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  allDay: yt,
  am: wt,
  createEvent: Dt,
  dateFormat: pt,
  day: ft,
  days: vt,
  default: Qe,
  deleteEvent: ht,
  month: ct,
  months: ot,
  noEvent: gt,
  pm: kt,
  today: mt,
  week: dt,
  weekDays: rt,
  year: ut,
  years: it
}, Symbol.toStringTag, { value: "Module" })), Ne = Te({
  texts: { ...ge.texts },
  // Make texts reactive before a locale is loaded.
  dateUtils: lt(ge.texts, Qe)
  // Some Date utils functions need localized texts.
}), zt = ({ props: p, emit: t, attrs: i, vuecalEl: o, uid: w }) => {
  const b = Te({
    uid: w,
    // The Vuecal instance unique ID, used for dnd source-target identification.
    emit: t,
    texts: { ...Ne.texts },
    // Make texts reactive before a locale is loaded.
    // The date utils composable.
    // A class/composable is needed in order to access the user locale in all the methods, and
    // independently of other potential Vue Cal instances on the same page.
    dateUtils: { ...Ne.dateUtils },
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
  return b.dateUtils = lt(Object.assign(ge.texts, b.texts), Qe), b.config = Ct(b, p, i), b.eventsManager = Ot(b), b.view = jt(b, o), b.dnd = Vt(b), b;
}, Ht = 24 * 60, Pt = {
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
}, Ft = { class: "vuecal__header" }, Nt = {
  key: 0,
  class: "vuecal__views-bar"
}, At = ["onClick", "innerHTML"], Bt = {
  key: 1,
  class: "vuecal__title-bar"
}, Wt = { class: "vuecal__transition-wrap" }, It = ["disabled", "innerHTML"], Rt = {
  __name: "header",
  setup(p) {
    const t = ze("vuecal"), { view: i, config: o } = t, w = () => {
      o.clickToNavigate && i.broader();
    }, b = S(() => o.clickToNavigate ? { click: w } : {});
    return (N, d) => (C(), z("div", Ft, [
      V(N.$slots, "header", {
        view: T(i),
        availableViews: T(o).availableViews,
        vuecal: T(t)
      }),
      N.$slots.header ? U("", !0) : (C(), z(ue, { key: 0 }, [
        T(o).viewsBar ? (C(), z("div", Nt, [
          (C(!0), z(ue, null, pe(T(o).availableViews, (H, v) => (C(), z("button", {
            class: ye(["vuecal__view-button", { "vuecal__view-button--active": T(i).id === v }]),
            onClick: (u) => T(i).switch(v),
            innerHTML: T(t).texts[v],
            type: "button"
          }, null, 10, At))), 256))
        ])) : U("", !0),
        T(o).titleBar ? (C(), z("nav", Bt, [
          ve("button", {
            class: ye(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !N.$slots["previous-button"] }]),
            onClick: d[0] || (d[0] = (...H) => T(i).previous && T(i).previous(...H)),
            type: "button"
          }, [
            V(N.$slots, "previous-button")
          ], 2),
          ve("div", Wt, [
            je(Ge, {
              name: `vuecal-slide-fade--${T(i).transitionDirection}`
            }, {
              default: W(() => [
                (C(), z("div", {
                  key: T(i).id + T(i).start.getTime()
                }, [
                  N.$slots.title || N.$slots[`title.${T(i).id}`] ? (C(), Se(xe(T(o).clickToNavigate && T(i).broaderView ? "button" : "div"), le({
                    key: 0,
                    class: "vuecal__title"
                  }, Re(b.value)), {
                    default: W(() => [
                      N.$slots[`title.${T(i).id}`] ? V(N.$slots, `title.${T(i).id}`, te(le({ key: 0 }, T(i)))) : V(N.$slots, "title", te(le({ key: 1 }, T(i))))
                    ]),
                    _: 3
                  }, 16)) : (C(), Se(xe(T(o).clickToNavigate && T(i).broaderView ? "button" : "div"), le({
                    key: 1,
                    class: "vuecal__title"
                  }, Re(b.value), {
                    innerHTML: T(i).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          T(o).todayButton ? (C(), z(ue, { key: 0 }, [
            N.$slots["today-button"] ? V(N.$slots, "today-button", {
              key: 0,
              navigate: () => !T(i).containsToday && T(i).goToToday(),
              active: T(i).containsToday
            }) : (C(), z("button", {
              key: 1,
              class: ye(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": T(i).containsToday }]),
              onClick: d[1] || (d[1] = (H) => !T(i).containsToday && T(i).goToToday()),
              disabled: !!T(i).containsToday,
              type: "button",
              innerHTML: T(t).texts.today
            }, null, 10, It))
          ], 64)) : U("", !0),
          ve("button", {
            class: ye(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !N.$slots["next-button"] }]),
            onClick: d[2] || (d[2] = (...H) => T(i).next && T(i).next(...H)),
            type: "button"
          }, [
            V(N.$slots, "next-button")
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
  setup(p, { emit: t }) {
    const { config: i, view: o, dnd: w, touch: b, dateUtils: N } = ze("vuecal"), d = p, H = ie(null), v = Te(d.event), u = Te({
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
    }), h = S(() => i.editableEvents.drag && v.draggable !== !1 && !v.background), P = S(() => o.isMonth || o.isYear || o.isYears || d.inAllDayBar ? !1 : i.time && i.editableEvents.resize && v.resizable !== !1 && !v.background);
    S(() => i.editableEvents.delete && v.deletable !== !1 && !v.background);
    const I = S(() => {
      var m, f, L, g, _;
      return {
        [`vuecal__event--${v._.id}`]: !0,
        [v.class]: !!v.class,
        "vuecal__event--recurring": !!v.recurring,
        "vuecal__event--background": !!v.background,
        "vuecal__event--all-day": v.allDay || ((m = v._) == null ? void 0 : m.startMinutes) === 0 && ((f = v._) == null ? void 0 : f.duration) === 24 * 60,
        "vuecal__event--multiday": !!((L = v._) != null && L.multiday),
        "vuecal__event--cut-top": !d.inAllDayBar && ((g = v._) == null ? void 0 : g.startMinutes) < i.timeFrom,
        "vuecal__event--cut-bottom": !d.inAllDayBar && ((_ = v._) == null ? void 0 : _.endMinutes) > i.timeTo || v._.multiday,
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
    }), a = S(() => {
      const m = (o.isDay || o.isDays || o.isWeek) && i.time && !d.inAllDayBar;
      if (!m && !v.backgroundColor && !v.color) return !1;
      const f = {
        backgroundColor: v.backgroundColor || null,
        color: v.color || null
      };
      if (m) {
        const L = Math.max(i.timeFrom, v._.startMinutes), g = Math.min(i.timeTo, v._.endMinutes) + (v._.duration && !v._.endMinutes ? 24 * 60 : 0), _ = Oe(L, i), j = Oe(g, i) - _;
        f.top = `${_}%`, f.height = `${j}%`;
      }
      return f;
    }), l = S(() => {
      const m = { ...i.eventListeners.event };
      for (const [g, _] of Object.entries(m))
        ["resize-end"].includes(g) || (m[g] = (j) => {
          j.type !== "drop" && _(j.type ? { e: j, event: v } : j);
        });
      const f = { ...m };
      m.touchstart = (g) => {
        var _;
        g.stopPropagation(), e(g), (_ = f.touchstart) == null || _.call(f, { e: g, event: v });
      }, m.mousedown = (g) => {
        var _;
        g.stopPropagation(), e(g), (_ = f.mousedown) == null || _.call(f, { e: g, event: v });
      };
      let L = null;
      return m.click = (g) => {
        var _;
        (_ = f.click) == null || _.call(f, { e: g, event: v }), L ? L = clearTimeout(L) : L = setTimeout(() => {
          var j;
          L = null, (j = f["delayed-click"]) == null || j.call(f, { e: g, event: v });
        }, 400);
      }, m.dblclick = (g) => {
        f.dblclick ? f.dblclick({ e: g, event: v }) : v.delete(1);
      }, m;
    }), e = (m) => {
      var g, _, j;
      const f = ((g = m.touches) == null ? void 0 : g[0]) || m;
      u.fromResizer = f.target.matches(".vuecal__event-resizer, .vuecal__event-resizer *");
      const L = H.value.getBoundingClientRect();
      u.startX = (((_ = m.touches) == null ? void 0 : _[0]) || m).clientX - L.left, u.startY = (((j = m.touches) == null ? void 0 : j[0]) || m).clientY - L.top, u.startPercentageX = u.startX * 100 / L.width, u.startPercentageY = u.startY * 100 / L.height, u.cellEl = H.value.closest(".vuecal__cell"), u.resizeStartDate = v.start, G(m.type === "touchstart" ? "touchmove" : "mousemove", k), G(m.type === "touchstart" ? "touchend" : "mouseup", c, { once: !0 }), u.holdTimer = setTimeout(() => {
        var s, A;
        u.holding = !0, (A = (s = l.value).hold) == null || A.call(s, { e: m, event: v });
      }, 1e3);
    }, k = async (m) => {
      var L, g, _, j;
      const f = ((L = m.touches) == null ? void 0 : L[0]) || m;
      if (u.fromResizer && !u.resizing && (u.resizing = !0, u.resizingOriginalEvent = { ...v, _: { ...v._ } }, b.isResizingEvent = !0, (_ = (g = l.value)["resize-start"]) == null || _.call(g, { e: m, event: v })), u.holdTimer = clearTimeout(u.holdTimer), u.holding = !1, u.cellEl) {
        const { top: s, left: A, width: X, height: ae } = u.cellEl.getBoundingClientRect();
        u.moveX = f.clientX - A, u.moveY = f.clientY - s, u.movePercentageX = u.moveX * 100 / X, u.movePercentageY = u.moveY * 100 / ae;
      }
      if (u.fromResizer) {
        const { newStart: s, newEnd: A } = M(v);
        let X = !0;
        const { resize: ae } = (j = i.eventListeners) == null ? void 0 : j.event;
        ae && (X = await ae({
          e: m,
          event: { ...v, start: s, end: A },
          overlaps: v.getOverlappingEvents({ start: s, end: A })
        })), X !== !1 ? (v.start = s, v.end = A, u.resizingLastAcceptedEvent && (u.resizingLastAcceptedEvent = null)) : ae && (u.resizingLastAcceptedEvent = { ...v, _: { ...v._ } });
      }
    }, c = async (m) => {
      var f, L;
      if (u.holdTimer = clearTimeout(u.holdTimer), u.holding = !1, u.resizing) {
        const { newStart: g, newEnd: _ } = M(v);
        let j = !0;
        const s = l.value["resize-end"];
        s && (j = await s({
          e: m,
          event: v,
          original: u.resizingOriginalEvent,
          // Original event details before resizing.
          overlaps: v.getOverlappingEvents({ start: g, end: _ })
        })), v.start = j === !1 ? (u.resizingLastAcceptedEvent || u.resizingOriginalEvent).start : ((f = u.resizingLastAcceptedEvent) == null ? void 0 : f.start) || g, v.end = j === !1 ? (u.resizingLastAcceptedEvent || u.resizingOriginalEvent).end : ((L = u.resizingLastAcceptedEvent) == null ? void 0 : L.end) || _, v._.duration < 1 && (v.start = u.resizingOriginalEvent.start, v.end = u.resizingOriginalEvent.end), b.isResizingEvent = !1;
      }
      document.removeEventListener(m.type === "touchend" ? "touchmove" : "mousemove", k), u.resizing = !1, u.fromResizer = !1, u.dragging = !1, u.startX = 0, u.startY = 0, u.moveX = 0, u.moveY = 0, u.startPercentageX = 0, u.startPercentageY = 0, u.movePercentageX = 0, u.movePercentageY = 0, u.cellEl = null, u.resizeStartDate = null, u.resizingOriginalEvent = null, u.resizingLastAcceptedEvent = null, u.schedule = null;
    }, M = (m) => {
      const f = new Date(m.start.getFullYear(), m.start.getMonth(), m.start.getDate());
      new Date(f).setDate(f.getDate() + 1);
      let g = Le(u.movePercentageY, i);
      if (g = Math.max(0, Math.min(g, 24 * 60)), i.snapToInterval) {
        const s = g + i.snapToInterval / 2;
        g = s - s % i.snapToInterval;
      }
      let _ = m.start, j = new Date(f.getTime() + g * 6e4);
      return j < u.resizeStartDate && (_ = j, j = u.resizeStartDate), { newStart: _, newEnd: j };
    }, F = [], G = (m, f, L) => {
      document.addEventListener(m, f, L), F.push({ event: m, handler: f, options: L });
    };
    return Ze(() => v._.register(H.value)), Be(() => {
      v._.unregister();
      for (const { event: m, handler: f, options: L } of F)
        document.removeEventListener(m, f, L);
    }), (m, f) => (C(), z("div", le({ class: "vuecal__event" }, Re(l.value, !0), {
      ref_key: "eventEl",
      ref: H,
      class: I.value,
      style: a.value,
      draggable: h.value ? "true" : void 0,
      onDragstart: f[2] || (f[2] = (L) => h.value && T(w).eventDragStart(L, v)),
      onDragend: f[3] || (f[3] = (L) => h.value && T(w).eventDragEnd(L, v))
    }), [
      ve("div", Gt, [
        m.$slots["event.all-day"] ? V(m.$slots, "event.all-day", {
          key: 0,
          event: v
        }) : m.$slots[`event.${T(o).id}`] ? V(m.$slots, `event.${T(o).id}`, {
          key: 1,
          event: v
        }) : V(m.$slots, "event", {
          key: 2,
          event: v
        }, () => [
          ve("div", qt, ce(v.title), 1),
          T(i).time && !p.inAllDayBar ? (C(), z("div", Jt, [
            T(o).isMonth ? (C(), z("span", Ut, ",")) : U("", !0),
            ve("span", Zt, ce(v._[`startTimeFormatted${T(i).twelveHour ? 12 : 24}`]), 1),
            T(o).isMonth ? U("", !0) : (C(), z("span", Kt, " - " + ce(v._[`endTimeFormatted${T(i).twelveHour ? 12 : 24}`]), 1))
          ])) : U("", !0),
          p.inAllDayBar ? U("", !0) : (C(), z("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: v.content
          }, null, 8, Qt))
        ])
      ]),
      P.value ? (C(), z("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: f[0] || (f[0] = et(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : U("", !0),
      je(Ge, { name: "vuecal-delete-btn" }, {
        default: W(() => [
          v._.deleting ? (C(), z("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: f[1] || (f[1] = et((L) => v.delete(3), ["stop"]))
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
}, ia = ["title"], $t = {
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
    const t = p, i = ze("vuecal"), { view: o, config: w, dateUtils: b, eventsManager: N, dnd: d, touch: H } = i, v = S(() => b.isToday(t.start)), u = ie(null), h = ie([]), P = ie(!1), I = (r) => {
      h.value.push(r.detail), P.value = !0;
    }, a = () => setTimeout(() => P.value = !1, 300), l = Te({
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
    }), e = ie(!1), k = ie({ cellOverlaps: {}, longestStreak: 0 }), c = S(() => {
      let r = Math.min(l.startPercentageY, l.movePercentageY), E = Math.max(l.startPercentageY, l.movePercentageY), O = Le(r, w), Y = Le(E, w);
      return w.snapToInterval && (O = b.snapToInterval(O, w.snapToInterval), Y = b.snapToInterval(Y, w.snapToInterval), r = Oe(O, w), E = Oe(Y, w)), {
        style: {
          top: `${r}%`,
          height: `${Math.abs(E - r)}%`
        },
        startMinutes: O,
        endMinutes: Y,
        start: b.formatMinutes(O),
        end: b.formatMinutes(Y),
        ...l.schedule ? { schedule: l.schedule } : {}
      };
    }), M = S(() => {
      const r = w.editableEvents.create && (l.dragging || e.value), E = w.eventCreateMinDrag && l.thresholdPassed || !w.eventCreateMinDrag;
      return r && E;
    }), F = S(() => {
      var re;
      const r = /* @__PURE__ */ new Date(), E = o.start.getFullYear(), O = o.start.getMonth(), Y = t.start.getFullYear(), B = t.start.getMonth();
      return {
        [`vuecal__cell--${Xe[t.start.getDay()]}`]: o.isDay || o.isDays || o.isWeek || o.isMonth,
        [`vuecal__cell--${Et[B]}`]: o.isYear,
        [`vuecal__cell--${Y}`]: o.isYears,
        "vuecal__cell--today": v.value,
        "vuecal__cell--current-month": o.isYear && Y === r.getFullYear() && B === r.getMonth(),
        "vuecal__cell--current-year": o.isYears && Y === r.getFullYear(),
        "vuecal__cell--out-of-range": o.isMonth && (Y !== E || B !== O),
        "vuecal__cell--before-min": ae.value && A.value,
        "vuecal__cell--after-max": ae.value && X.value,
        "vuecal__cell--disabled": ae.value,
        "vuecal__cell--selected": o.selectedDate && o.selectedDate.getTime() >= t.start.getTime() && o.selectedDate.getTime() <= t.end.getTime(),
        "vuecal__cell--has-schedules": (re = w.schedules) == null ? void 0 : re.length,
        "vuecal__cell--dragging": l.dragging,
        "vuecal__cell--has-events": m.value.length
      };
    });
    S(() => b.formatDate(t.start));
    const G = S(() => {
      switch (o.id) {
        case "day":
          return "";
        case "days":
          return w.availableViews.days.rows > 1 && b.formatDate(t.start, "D"), "";
        case "week":
          return "";
        case "month":
          return b.formatDate(t.start, "D");
        case "year":
          return b.formatDate(t.start, w.xs ? "MMM" : "MMMM");
        case "years":
          return b.formatDate(t.start, "YYYY");
      }
    }), m = S(() => w.datePicker ? [] : N.getEventsInRange(
      t.start,
      t.end,
      { excludeIds: h.value, ...w.allDayEvents ? { allDay: t.allDay } : {} }
    )), f = S(() => m.value.filter((r) => !r.background)), L = S(() => {
      var r;
      return (r = w.schedules) == null ? void 0 : r.reduce((E, O) => (E[O.id] = m.value.filter((Y) => Y.schedule === O.id), E), {});
    }), g = S(() => {
      if (o.isMonth || o.isYear || o.isYears || t.allDay) return {};
      const r = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", E = {};
      for (const O of m.value) {
        const Y = O._.id, { maxConcurrent: B = 1, position: J = 0 } = k.value.cellOverlaps[Y] || {}, re = r ? "right" : "left";
        E[Y] = { [re]: `${100 / B * J}%` }, w.stackEvents ? E[Y].width = `${100 / B + (J === B - 1 ? 0 : 15)}%` : E[Y].width = `${100 / B}%`;
      }
      return E;
    }), _ = S(() => {
      const r = {};
      for (const E of m.value) {
        const O = E._.id, { maxConcurrent: Y = 1, position: B = 0 } = k.value.cellOverlaps[O] || {};
        r[O] = `vuecal__event--stack-${B + 1}-${Y}`;
      }
      return r;
    }), j = S(() => w.showCellEventCount && f.value.length), s = S(() => {
      var O;
      if (!w.specialHours || o.isMonth || o.isYear || o.isYears || t.allDay) return;
      const r = Xe[t.start.getDay()];
      let E = (O = w.specialHours) == null ? void 0 : O[r];
      if (E)
        return Array.isArray(E) || (E = [E]), E.map((Y) => {
          let { from: B, to: J, class: re, label: we } = Y;
          if (isNaN(B) || isNaN(J) || w.timeFrom >= J || w.timeTo <= B) return;
          B = Math.max(w.timeFrom, B), J = Math.min(w.timeTo, J);
          const y = Oe(B, w), R = Oe(J, w) - y;
          return {
            style: { top: `${y}%`, height: `${R}%` },
            label: we,
            class: re
          };
        }).filter((Y) => !!Y);
    }), A = S(() => w.minTimestamp !== null && w.minTimestamp > t.end.getTime()), X = S(() => w.maxTimestamp && w.maxTimestamp < t.start.getTime()), ae = S(() => {
      const { disableDays: r } = w, E = o.isYear || o.isYears;
      return r.length && r.includes(b.formatDate(t.start)) && !E ? !0 : A.value || X.value;
    }), se = Te({
      show: S(() => {
        if (!(!o.isDay && !o.isDays && !o.isWeek) && !(!v.value || !w.time || t.allDay) && !(w.timeFrom > b.dateToMinutes(o.now)) && !(b.dateToMinutes(o.now) > w.timeTo))
          return !0;
      }),
      nowInMinutes: S(() => b.dateToMinutes(o.now)),
      todaysTimePosition: S(() => Oe(se.nowInMinutes, w)),
      style: S(() => `top: ${se.todaysTimePosition}%`),
      currentTime: S(() => b.formatTime(o.now))
    }), de = S(() => {
      if (ae.value) return {};
      const r = { ...w.eventListeners.cell };
      for (const [Y, B] of Object.entries(r))
        r[Y] = (J) => {
          var re, we, y;
          (y = (we = J.target || ((re = J.e) == null ? void 0 : re.target)).closest) != null && y.call(we, ".vuecal__event") || B(J.type ? { e: J, cell: Z.value, cursor: ee.value } : J);
        };
      const E = { ...r };
      let O = null;
      return r.click = (Y) => {
        var J;
        oe();
        const B = he(Y);
        (J = E.click) == null || J.call(E, { e: Y, cell: Z.value, cursor: B }), O ? O = clearTimeout(O) : O = setTimeout(() => {
          var re;
          O = null, (re = E["delayed-click"]) == null || re.call(E, { e: Y, cell: Z.value, cursor: B });
        }, 400);
      }, (w.time && o.isDay || o.isDays || o.isWeek) && (r.touchstart = (Y) => {
        var B;
        n(Y.e || Y), (B = E.touchstart) == null || B.call(E, { e: Y, cell: Z.value, cursor: ee.value });
      }, r.mousedown = (Y) => {
        var B;
        n(Y.e || Y), (B = E.mousedown) == null || B.call(E, { e: Y, cell: Z.value, cursor: ee.value });
      }), E.dblclick && (r.dblclick = (Y) => {
        var B;
        (B = E.dblclick) == null || B.call(E, { e: Y, cell: Z.value, cursor: he(Y) });
      }), w.editableEvents.drag && (r.dragenter = (Y) => d.cellDragEnter(Y, Z.value), r.dragover = (Y) => {
        Y.preventDefault(), d.cellDragOver(Y, Z.value);
      }, r.dragleave = (Y) => d.cellDragLeave(Y, Z.value), r.drop = (Y) => d.cellDragDrop(Y, Z.value, t.allDay)), r;
    }), Z = S(() => ({
      start: t.start,
      end: t.end,
      events: m,
      ...l.schedule ? { schedule: l.schedule } : {},
      goNarrower: () => o.narrower(),
      goBroader: () => o.broader(),
      broader: o.broaderView,
      narrower: o.narrowerView
    })), he = (r) => {
      var J;
      const E = (((J = r.touches) == null ? void 0 : J[0]) || r).clientY, { top: O } = u.value.getBoundingClientRect(), Y = Ke(E - O, u.value), B = new Date(t.start);
      return B.setMinutes(Le(Y, w)), { y: Y, date: B };
    }, ee = S(() => {
      const r = Le(l.movePercentageY || l.startPercentageY, w), E = new Date(t.start);
      return E.setMinutes(r), {
        x: l.movePercentageX || l.startPercentageX,
        y: l.movePercentageY || l.startPercentageY,
        date: E
      };
    }), oe = () => {
      o.updateSelectedDate(t.start), w.clickToNavigate && ((o.isMonth || o.isDays || o.isWeek) && w.availableViews.day ? o.switch("day") : o.isYear && w.availableViews.month ? o.switch("month") : o.isYears && w.availableViews.year && o.switch("year")), o.updateViewDate(t.start);
    }, n = (r) => {
      var O, Y;
      l.schedule = ~~r.target.dataset.schedule;
      const E = u.value.getBoundingClientRect();
      l.startX = (((O = r.touches) == null ? void 0 : O[0]) || r).clientX - E.left, l.startY = (((Y = r.touches) == null ? void 0 : Y[0]) || r).clientY - E.top, l.startPercentageX = l.startX * 100 / E.width, l.startPercentageY = l.startY * 100 / E.height, l.thresholdPassed = !1, document.addEventListener(r.type === "touchstart" ? "touchmove" : "mousemove", $), document.addEventListener(r.type === "touchstart" ? "touchend" : "mouseup", D, { once: !0 }), l.holdTimer = setTimeout(() => {
        var B, J;
        l.holding = !0, (J = (B = de.value).hold) == null || J.call(B, { e: r, cell: Z.value, cursor: ee.value });
      }, 1e3);
    }, $ = (r) => {
      var O, Y, B, J, re, we;
      l.dragging || (H.isDraggingCell = !0, (Y = (O = de.value)["drag-start"]) == null || Y.call(O, { e: r, cell: Z.value, cursor: ee.value })), l.dragging = !0, l.holdTimer = clearTimeout(l.holdTimer), l.holding = !1;
      const E = u.value.getBoundingClientRect();
      l.moveX = (((B = r.touches) == null ? void 0 : B[0]) || r).clientX - E.left, l.moveY = (((J = r.touches) == null ? void 0 : J[0]) || r).clientY - E.top, l.movePercentageX = l.moveX * 100 / E.width, l.movePercentageY = l.moveY * 100 / E.height, w.eventCreateMinDrag && Math.abs(l.startY - l.moveY) > w.eventCreateMinDrag && (l.thresholdPassed = !0), (we = (re = de.value).drag) == null || we.call(re, { e: r, cell: Z.value, cursor: ee.value });
    }, D = async (r) => {
      var E, O;
      document.removeEventListener(r.type === "touchend" ? "touchmove" : "mousemove", $, { passive: !1 }), l.dragging && ((O = (E = de.value)["drag-end"]) == null || O.call(E, { e: r, cell: Z.value, cursor: ee.value }), H.isDraggingCell = !1, w.editableEvents.create && (e.value = !0, await q(r), e.value = !1)), l.holdTimer = clearTimeout(l.holdTimer), l.holding = !1, l.dragging = !1, l.startX = 0, l.startY = 0, l.moveX = 0, l.moveY = 0, l.startPercentageX = 0, l.startPercentageY = 0, l.movePercentageX = 0, l.movePercentageY = 0, l.thresholdPassed = !1, l.schedule = null;
    }, q = async (r) => {
      if (!M.value) return;
      let { start: E, end: O, startMinutes: Y, endMinutes: B } = c.value;
      E = new Date(t.start), E.setMinutes(Y), O = new Date(t.start), O.setMinutes(B);
      let J = { ...c.value, start: E, end: O };
      const { create: re } = w.eventListeners.event;
      if (typeof re == "function") {
        const we = J;
        J = await new Promise((y) => re({ e: r, event: J, cell: Z.value, resolve: y, cursor: ee.value })), J && typeof J == "object" && o.createEvent(J), J && typeof J == "boolean" && o.createEvent(we);
      } else o.createEvent(J);
    }, K = () => {
      var r;
      for (const E of Object.keys(de.value))
        (r = u.value) == null || r.removeEventListener(E, de.value[E]);
    }, De = () => {
      k.value = N.getCellOverlappingEvents(t.start, t.end, t.allDay);
    };
    return me(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !o.isYears && !o.isYear && f.value.map((r) => `${r._.id}${r.start.getTime()}${r.end.getTime()}`).join(),
      async () => {
        await Je(), De();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Be(async () => {
      for (const r of h.value) N.deleteEvent(r, 3);
      K(), await Je();
    }), (r, E) => (C(), z("div", le({
      class: ["vuecal__cell", F.value],
      ref_key: "cellEl",
      ref: u
    }, Re(de.value, !0)), [
      r.$slots.cell ? V(r.$slots, "cell", {
        key: 0,
        cell: Z.value
      }) : U("", !0),
      s.value ? (C(!0), z(ue, { key: 1 }, pe(s.value, (O, Y) => (C(), z("div", {
        class: ye(["vuecal__special-hours", O.class]),
        style: _e(O.style),
        innerHTML: O.label || ""
      }, null, 14, xt))), 256)) : U("", !0),
      !r.$slots.cell && T(w).schedules ? (C(!0), z(ue, { key: 2 }, pe(T(w).schedules, (O) => (C(), z("div", {
        class: ye(["vuecal__schedule vuecal__schedule--cell", O.class]),
        key: O.id,
        style: _e(O.style || null),
        "data-schedule": O.id
      }, [
        r.$slots["cell-events"] ? V(r.$slots, "cell-events", {
          key: 0,
          cell: Z.value
        }) : U("", !0),
        G.value || r.$slots["cell-date"] ? (C(), z("div", ta, [
          V(r.$slots, "cell-date", { cell: Z.value }, () => [
            Ue(ce(G.value), 1)
          ])
        ])) : U("", !0),
        r.$slots["cell-content"] ? (C(), z("div", aa, [
          V(r.$slots, "cell-content", { cell: Z.value })
        ])) : U("", !0),
        r.$slots["cell-events"] && m.value.length ? (C(), z("div", na, [
          V(r.$slots, "cell-events", { cell: Z.value })
        ])) : m.value.length || P.value ? (C(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: E[0] || (E[0] = (Y) => P.value = !0),
          onAfterLeave: a,
          tag: "div"
        }, {
          default: W(() => [
            (C(!0), z(ue, null, pe(L.value[O.id], (Y) => (C(), Se(st, {
              key: Y._.id,
              event: Y,
              onEventDeleted: I,
              "in-all-day-bar": t.allDay,
              style: _e(g.value[Y._.id])
            }, Ce({ _: 2 }, [
              r.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: W((B) => [
                  V(r.$slots, "event.all-day", le({ ref_for: !0 }, B))
                ]),
                key: "0"
              } : void 0,
              r.$slots[`event.${T(o).id}`] ? {
                name: `event.${T(o).id}`,
                fn: W((B) => [
                  V(r.$slots, `event.${T(o).id}`, le({ ref_for: !0 }, B))
                ]),
                key: "1"
              } : void 0,
              r.$slots.event ? {
                name: "event",
                fn: W((B) => [
                  V(r.$slots, "event", le({ ref_for: !0 }, B))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "style"]))), 128))
          ]),
          _: 2
        }, 1024)) : U("", !0),
        M.value && l.schedule === O.id && !t.allDay ? (C(), z("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: _e(c.value.style)
        }, ce(c.value.start) + " - " + ce(c.value.end), 5)) : U("", !0)
      ], 14, ea))), 128)) : U("", !0),
      !r.$slots.cell && !T(w).schedules ? (C(), z(ue, { key: 3 }, [
        r.$slots["cell-events"] ? V(r.$slots, "cell-events", {
          key: 0,
          cell: Z.value
        }) : U("", !0),
        G.value || r.$slots["cell-date"] ? (C(), z("div", sa, [
          V(r.$slots, "cell-date", { cell: Z.value }, () => [
            Ue(ce(G.value), 1)
          ])
        ])) : U("", !0),
        r.$slots["cell-content"] ? (C(), z("div", la, [
          V(r.$slots, "cell-content", { cell: Z.value })
        ])) : U("", !0),
        r.$slots["cell-events"] && m.value.length ? (C(), z("div", ra, [
          V(r.$slots, "cell-events", { cell: Z.value })
        ])) : !(T(o).isMonth && !T(w).eventsOnMonthView) && !T(o).isYear && !T(o).isYears && (m.value.length || P.value) ? (C(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: E[1] || (E[1] = (O) => P.value = !0),
          onAfterLeave: a,
          tag: "div"
        }, {
          default: W(() => [
            (C(!0), z(ue, null, pe(m.value, (O) => (C(), Se(st, {
              key: O._.id,
              event: O,
              onEventDeleted: I,
              "in-all-day-bar": t.allDay,
              class: ye(_.value[O._.id]),
              style: _e(g.value[O._.id])
            }, Ce({ _: 2 }, [
              r.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: W((Y) => [
                  V(r.$slots, "event.all-day", le({ ref_for: !0 }, Y))
                ]),
                key: "0"
              } : void 0,
              r.$slots[`event.${T(o).id}`] ? {
                name: `event.${T(o).id}`,
                fn: W((Y) => [
                  V(r.$slots, `event.${T(o).id}`, le({ ref_for: !0 }, Y))
                ]),
                key: "1"
              } : void 0,
              r.$slots.event ? {
                name: "event",
                fn: W((Y) => [
                  V(r.$slots, "event", le({ ref_for: !0 }, Y))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "class", "style"]))), 128))
          ]),
          _: 3
        })) : U("", !0),
        M.value ? (C(), z("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: _e(c.value.style)
        }, ce(c.value.start) + " - " + ce(c.value.end), 5)) : U("", !0)
      ], 64)) : U("", !0),
      r.$slots["event-count"] ? V(r.$slots, "event-count", {
        key: 4,
        events: f.value
      }) : j.value ? (C(), z("div", oa, ce(f.value.length), 1)) : U("", !0),
      se.show ? (C(), z("div", {
        key: 6,
        class: "vuecal__now-line",
        style: _e(se.style),
        title: se.currentTime
      }, [
        ve("span", null, ce(se.currentTime), 1)
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
}, ga = ["innerHTML"], ya = {
  key: 2,
  class: "vuecal__all-day w-flex grow"
}, ha = {
  __name: "headings-bar",
  setup(p) {
    const t = ze("vuecal"), i = ze("$vuecalEl"), { view: o, config: w, dateUtils: b } = t, N = S(() => w.xs ? "day-xs" : w.sm || o.isDays || o.isMonth ? "day-sm" : "day"), d = S(() => (o.isDay || o.isDays || o.isWeek || o.isMonth) && !(o.isDay && !w.schedules && !w.allDayEvents)), H = S(() => o.cellDates.slice(0, o.cols).map(({ start: h }) => ({
      id: Xe[h.getDay()],
      date: h,
      dateNumber: h.getDate(),
      day: b.formatDate(h, "dddd"),
      "day-sm": b.formatDate(h, "ddd"),
      "day-xs": b.formatDate(h, "dd"),
      isToday: b.isToday(h)
    }))), v = {
      click: (h) => {
        (o.isDays || o.isWeek) && o.updateSelectedDate(h);
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
      startResize(h) {
        var I;
        this.isResizing.value = !0, this.startY.value = h;
        const P = (I = i.value) == null ? void 0 : I.querySelector(".vuecal__all-day");
        P && (this.initialHeight.value = P.offsetHeight), document.addEventListener("mousemove", u.handleMouseMove), document.addEventListener("mouseup", u.cleanup), document.addEventListener("touchmove", u.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", u.cleanup);
      },
      // Update height based on mouse/touch movement.
      updateHeight(h) {
        var a;
        if (!this.isResizing.value) return;
        const P = h - this.startY.value, I = Math.max(20, this.initialHeight.value + P);
        (a = i.value) == null || a.style.setProperty("--vuecal-all-day-bar-height", `${I}px`);
      },
      // Mouse event handlers.
      handleMouseDown(h) {
        this.startResize(h.clientY);
      },
      handleMouseMove(h) {
        u.updateHeight(h.clientY);
      },
      // Touch event handlers.
      handleTouchStart(h) {
        var P;
        (P = h.touches) != null && P[0] && this.startResize(h.touches[0].clientY);
      },
      handleTouchMove(h) {
        var P;
        (P = h.touches) != null && P[0] && (u.updateHeight(h.touches[0].clientY), h.preventDefault());
      }
    };
    return Be(() => {
      u.cleanup();
    }), (h, P) => d.value ? (C(), z("div", ua, [
      T(o).isDay ? U("", !0) : (C(), z("div", ca, [
        (C(!0), z(ue, null, pe(H.value, (I, a) => (C(), z("div", {
          class: ye(["vuecal__weekday", { "vuecal__weekday--today": I.isToday }]),
          key: a,
          onClick: (l) => v.click(I.date)
        }, [
          V(h.$slots, "weekday-heading", {
            label: I[N.value],
            id: I.id,
            date: I.date
          }, () => [
            ve("span", va, ce(I[N.value]), 1),
            T(o).isMonth ? U("", !0) : (C(), z("strong", fa, ce(I.dateNumber), 1))
          ])
        ], 10, da))), 128))
      ])),
      T(w).schedules ? (C(), z("div", ma, [
        (C(!0), z(ue, null, pe(H.value, (I, a) => (C(), z(ue, { key: a }, [
          (C(!0), z(ue, null, pe(T(w).schedules, (l, e) => (C(), z(ue, { key: e }, [
            h.$slots["schedule-heading"] ? (C(), z("div", {
              key: 0,
              class: ye(["vuecal__schedule vuecal__schedule--heading", l.class])
            }, [
              V(h.$slots, "schedule-heading", {
                schedule: l,
                view: T(o)
              })
            ], 2)) : (C(), z("div", {
              key: 1,
              class: ye(["vuecal__schedule vuecal__schedule--heading", l.class]),
              innerHTML: l.label
            }, null, 10, ga))
          ], 64))), 128))
        ], 64))), 128))
      ])) : U("", !0),
      T(w).allDayEvents ? (C(), z("div", ya, [
        (C(!0), z(ue, null, pe(H.value, (I, a) => (C(), Se($t, {
          class: ye(["vuecal__all-day-cell", { "vuecal__weekday--today": I.isToday }]),
          key: a,
          start: I.date,
          end: new Date(I.date.getTime() + 24 * 60 * 60 * 1e3 - 1),
          index: a,
          "all-day": ""
        }, Ce({ _: 2 }, [
          h.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: W((l) => [
              V(h.$slots, "event.all-day", le({ ref_for: !0 }, l))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: W((l) => [
              V(h.$slots, "event", le({ ref_for: !0 }, l))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        ve("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: P[0] || (P[0] = (...I) => u.handleMouseDown && u.handleMouseDown(...I)),
          onTouchstart: P[1] || (P[1] = (...I) => u.handleTouchStart && u.handleTouchStart(...I))
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
    const t = ze("vuecal"), { config: i, texts: o } = t, w = S(() => {
      const b = [];
      for (let d = i.timeFrom; d < i.timeTo; d += i.timeStep) {
        const H = d + i.timeStep > i.timeTo, v = ~~(d / 60), u = d % 60, h = o[d < 720 ? "am" : "pm"];
        let P = null;
        H && (P = `calc(var(--vuecal-time-cell-height) * ${(i.timeTo - d) / i.timeStep})`), b.push({
          minutesSum: d,
          // The sum of hours + minutes in minutes.
          hours: v,
          minutes: u,
          formatted12: `${v % 12 ? v % 12 : 12}${u ? `:${u.toString().padStart(2, 0)}` : ""}${h}`,
          formatted24: `${v.toString().padStart(2, 0)}:${u.toString().padStart(2, 0)}`,
          height: P
        });
      }
      return b;
    });
    return (b, N) => (C(), z("div", Da, [
      T(i).allDayEvents ? (C(), z("div", pa, [
        V(b.$slots, "all-day-label", {}, () => [
          Ue(ce(T(t).texts.allDay), 1)
        ])
      ])) : U("", !0),
      (C(!0), z(ue, null, pe(w.value, (d, H) => (C(), z("div", {
        class: "vuecal__time-cell",
        key: H,
        style: _e({ height: d.height || null })
      }, [
        V(b.$slots, "time-cell", {
          index: H,
          minutes: d.minutes,
          hours: d.hours,
          minutesSum: d.minutesSum,
          format12: d.formatted12,
          format24: d.formatted24
        }, () => [
          ve("label", null, ce(T(i).twelveHour ? d.formatted12 : d.formatted24), 1)
        ])
      ], 4))), 128))
    ]));
  }
}, ka = {
  __name: "body",
  setup(p) {
    const t = ze("vuecal"), { view: i, config: o, dateUtils: w } = t, b = ie(null), N = ie(null), d = S(() => ({
      "--vuecal-grid-columns": i.cols,
      "--vuecal-grid-rows": i.rows
    })), H = S(() => {
      const h = w.formatTime(Le(N.value, o));
      return {
        style: { top: `${N.value}%` },
        time: h
      };
    }), v = (h) => {
      var a;
      if (i.isMonth || i.isYear || i.isYears) return;
      const P = (((a = h.touches) == null ? void 0 : a[0]) || h).clientY, { top: I } = b.value.getBoundingClientRect();
      N.value = Ke(P - I, b.value);
    }, u = () => {
      N.value = null;
    };
    return Ze(() => {
      b.value.addEventListener("mousemove", v), b.value.addEventListener("touchmove", v), b.value.addEventListener("mouseleave", u), b.value.addEventListener("touchend", u);
    }), Be(() => {
      b.value && (b.value.removeEventListener("mousemove", v), b.value.removeEventListener("touchmove", v), b.value.removeEventListener("mouseleave", u), b.value.removeEventListener("touchend", u));
    }), (h, P) => (C(), z("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: b,
      style: _e(d.value)
    }, [
      je(Ge, { name: "vuecal-shrink" }, {
        default: W(() => [
          T(o).timeAtCursor && N.value !== null ? (C(), z("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: _e(H.value.style)
          }, [
            ve("label", null, ce(H.value.time), 1)
          ], 4)) : U("", !0)
        ]),
        _: 1
      }),
      (C(!0), z(ue, null, pe(T(i).cellDates, (I, a) => (C(), Se($t, {
        key: a,
        start: I.start,
        end: I.end,
        index: a
      }, Ce({ _: 2 }, [
        h.$slots.cell ? {
          name: "cell",
          fn: W((l) => [
            V(h.$slots, "cell", le({ ref_for: !0 }, l))
          ]),
          key: "0"
        } : void 0,
        h.$slots["cell-date"] ? {
          name: "cell-date",
          fn: W((l) => [
            V(h.$slots, "cell-date", le({ ref_for: !0 }, l))
          ]),
          key: "1"
        } : void 0,
        h.$slots["cell-content"] ? {
          name: "cell-content",
          fn: W((l) => [
            V(h.$slots, "cell-content", le({ ref_for: !0 }, l))
          ]),
          key: "2"
        } : void 0,
        h.$slots["cell-events"] ? {
          name: "cell-events",
          fn: W((l) => [
            V(h.$slots, "cell-events", le({ ref_for: !0 }, l))
          ]),
          key: "3"
        } : void 0,
        h.$slots[`event.${T(i).id}`] ? {
          name: `event.${T(i).id}`,
          fn: W((l) => [
            V(h.$slots, `event.${T(i).id}`, le({ ref_for: !0 }, l))
          ]),
          key: "4"
        } : void 0,
        h.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: W((l) => [
            V(h.$slots, "event.all-day", le({ ref_for: !0 }, l))
          ]),
          key: "5"
        } : void 0,
        h.$slots.event ? {
          name: "event",
          fn: W((l) => [
            V(h.$slots, "event", le({ ref_for: !0 }, l))
          ]),
          key: "6"
        } : void 0,
        h.$slots["event-count"] ? {
          name: "event-count",
          fn: W((l) => [
            V(h.$slots, "event-count", le({ ref_for: !0 }, l))
          ]),
          key: "7"
        } : void 0
      ]), 1032, ["start", "end", "index"]))), 128))
    ], 4));
  }
}, $a = ["data-locale"], _a = { class: "vuecal__scrollable-wrap" }, ba = {
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
  setup(p, { expose: t, emit: i }) {
    const o = p, w = i, b = Tt("vuecal-el"), N = zt({ props: o, emit: w, attrs: Yt(), vuecalEl: b, uid: Mt() }), { config: d, view: H, dateUtils: v, touch: u } = N, h = S(() => d.time && (H.isDay || H.isDays || H.isWeek)), P = S(() => Array(H.rows).fill().map((e, k) => v.getWeek(v.addDays(H.firstCellDate, 7 * k)))), I = S(() => {
      var e;
      return {
        "vuecal--ready": d.ready,
        [`vuecal--${d.theme}-theme`]: d.theme,
        [`vuecal--${d.size}`]: !0,
        "vuecal--date-picker": d.datePicker,
        "vuecal--dark": d.dark,
        "vuecal--light": !d.dark,
        [`vuecal--${H.id}-view`]: !0,
        "vuecal--view-has-time": h.value,
        "vuecal--timeless": !d.time,
        "vuecal--dragging-cell": u.isDraggingCell,
        "vuecal--dragging-event": u.isDraggingEvent,
        "vuecal--resizing-event": u.isResizingEvent,
        "vuecal--has-schedules": (e = d.schedules) == null ? void 0 : e.length
      };
    }), a = S(() => ({
      "--vuecal-time-cell-height": d.timeCellHeight && `${d.timeCellHeight}px`
    })), l = S(() => {
      var e, k;
      return {
        "vuecal__scrollable--row": h.value || d.weekNumbers && H.isMonth,
        // Keep the states inside the Vue transition wrapper for smooth CSS transitions.
        [`vuecal__scrollable--${H.id}-view`]: !0,
        "vuecal__scrollable--has-schedules": (e = d.schedules) == null ? void 0 : e.length,
        "vuecal__scrollable--no-schedules": !((k = d.schedules) != null && k.length),
        "vuecal__scrollable--no-all-day-bar": !d.allDayEvents,
        "vuecal__scrollable--has-all-day-bar": d.allDayEvents
      };
    });
    return Ze(async () => {
      await Je(), d.ready = !0, w("ready", { config: d, view: H });
    }), at("vuecal", N), at("$vuecalEl", b), t({ view: N.view }), (e, k) => (C(), z("div", {
      class: ye(["vuecal", I.value]),
      ref: "vuecal-el",
      "data-locale": e.locale,
      style: _e(a.value)
    }, [
      e.$slots.diy ? V(e.$slots, "diy", {
        key: 0,
        vuecal: T(N)
      }) : (C(), z(ue, { key: 1 }, [
        je(Rt, null, Ce({ _: 2 }, [
          e.$slots.header ? {
            name: "header",
            fn: W((c) => [
              V(e.$slots, "header", te(ne(c)))
            ]),
            key: "0"
          } : void 0,
          !e.$slots.header && e.$slots["previous-button"] ? {
            name: "previous-button",
            fn: W((c) => [
              V(e.$slots, "previous-button", te(ne(c)))
            ]),
            key: "1"
          } : void 0,
          !e.$slots.header && e.$slots["next-button"] ? {
            name: "next-button",
            fn: W((c) => [
              V(e.$slots, "next-button", te(ne(c)))
            ]),
            key: "2"
          } : void 0,
          !e.$slots.header && e.$slots["today-button"] ? {
            name: "today-button",
            fn: W((c) => [
              V(e.$slots, "today-button", te(ne(c)))
            ]),
            key: "3"
          } : void 0,
          !e.$slots.header && e.$slots.title ? {
            name: "title",
            fn: W((c) => [
              V(e.$slots, "title", te(ne(c)))
            ]),
            key: "4"
          } : void 0,
          !e.$slots.header && e.$slots["title.day"] ? {
            name: "title.day",
            fn: W((c) => [
              V(e.$slots, "title.day", te(ne(c)))
            ]),
            key: "5"
          } : void 0,
          !e.$slots.header && e.$slots["title.days"] ? {
            name: "title.days",
            fn: W((c) => [
              V(e.$slots, "title.days", te(ne(c)))
            ]),
            key: "6"
          } : void 0,
          !e.$slots.header && e.$slots["title.week"] ? {
            name: "title.week",
            fn: W((c) => [
              V(e.$slots, "title.week", te(ne(c)))
            ]),
            key: "7"
          } : void 0,
          !e.$slots.header && e.$slots["title.month"] ? {
            name: "title.month",
            fn: W((c) => [
              V(e.$slots, "title.month", te(ne(c)))
            ]),
            key: "8"
          } : void 0,
          !e.$slots.header && e.$slots["title.year"] ? {
            name: "title.year",
            fn: W((c) => [
              V(e.$slots, "title.year", te(ne(c)))
            ]),
            key: "9"
          } : void 0,
          !e.$slots.header && e.$slots["title.years"] ? {
            name: "title.years",
            fn: W((c) => [
              V(e.$slots, "title.years", te(ne(c)))
            ]),
            key: "10"
          } : void 0,
          !e.$slots.header && e.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: W((c) => [
              V(e.$slots, "schedule-heading", te(ne(c)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        ve("div", _a, [
          je(Ge, {
            name: `vuecal-slide-fade--${T(H).transitionDirection}`
          }, {
            default: W(() => [
              (C(), z("div", {
                class: ye(["vuecal__scrollable", l.value]),
                key: T(H).id + T(H).start.getTime()
              }, [
                h.value ? (C(), Se(wa, { key: 0 }, Ce({ _: 2 }, [
                  e.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: W((c) => [
                      V(e.$slots, "time-cell", te(ne(c)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : U("", !0),
                T(d).weekNumbers && T(H).isMonth ? (C(), z("div", ba, [
                  (C(!0), z(ue, null, pe(P.value, (c) => (C(), z("div", Ta, [
                    V(e.$slots, "week-number", {}, () => [
                      ve("small", null, ce(c), 1)
                    ])
                  ]))), 256))
                ])) : U("", !0),
                ve("div", Ma, [
                  je(ha, null, Ce({ _: 2 }, [
                    e.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: W((c) => [
                        V(e.$slots, "weekday-heading", te(ne(c)))
                      ]),
                      key: "0"
                    } : void 0,
                    e.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: W((c) => [
                        V(e.$slots, "schedule-heading", te(ne(c)))
                      ]),
                      key: "1"
                    } : void 0,
                    e.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: W((c) => [
                        V(e.$slots, "event.all-day", te(ne(c)))
                      ]),
                      key: "2"
                    } : void 0,
                    e.$slots.event ? {
                      name: "event",
                      fn: W((c) => [
                        V(e.$slots, "event", te(ne(c)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  je(ka, null, Ce({ _: 2 }, [
                    e.$slots.cell ? {
                      name: "cell",
                      fn: W((c) => [
                        V(e.$slots, "cell", te(ne(c)))
                      ]),
                      key: "0"
                    } : void 0,
                    !e.$slots.cell && e.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: W((c) => [
                        V(e.$slots, "cell-date", te(ne(c)))
                      ]),
                      key: "1"
                    } : void 0,
                    !e.$slots.cell && e.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: W((c) => [
                        V(e.$slots, "cell-content", te(ne(c)))
                      ]),
                      key: "2"
                    } : void 0,
                    !e.$slots.cell && e.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: W((c) => [
                        V(e.$slots, "cell-events", te(ne(c)))
                      ]),
                      key: "3"
                    } : void 0,
                    !e.$slots.cell && !e.$slots["cell-events"] && e.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: W((c) => [
                        V(e.$slots, "event.all-day", te(ne(c)))
                      ]),
                      key: "4"
                    } : void 0,
                    !e.$slots.cell && !e.$slots["cell-events"] && e.$slots[`event.${T(H).id}`] ? {
                      name: `event.${T(H).id}`,
                      fn: W((c) => [
                        V(e.$slots, `event.${T(H).id}`, te(ne(c)))
                      ]),
                      key: "5"
                    } : void 0,
                    !e.$slots.cell && !e.$slots["cell-events"] && e.$slots.event ? {
                      name: "event",
                      fn: W((c) => [
                        V(e.$slots, "event", te(ne(c)))
                      ]),
                      key: "6"
                    } : void 0,
                    !e.$slots.cell && e.$slots["event-count"] ? {
                      name: "event-count",
                      fn: W((c) => [
                        V(e.$slots, "event-count", te(ne(c)))
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
}, Sa = (p) => {
  Ne.texts = { ...ge.texts, ...p }, Ne.dateUtils.updateTexts(Ne.texts);
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
  getWeek: Na,
  isToday: Aa,
  isSameDate: Ba,
  isInRange: Wa,
  isLeapYear: Ia,
  getPreviousFirstDayOfWeek: Ra,
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
} = Ne.dateUtils;
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
  Ra as getPreviousFirstDayOfWeek,
  Na as getWeek,
  Wa as isInRange,
  Ia as isLeapYear,
  Ba as isSameDate,
  Aa as isToday,
  Ua as isValidDate,
  Va as removeDatePrototypes,
  Xa as stringToDate,
  La as subtractDays,
  Ha as subtractHours,
  Fa as subtractMinutes,
  Oa as updateTexts,
  Sa as useLocale
};
