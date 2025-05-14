import { computed as E, reactive as Te, watch as me, toRefs as bt, ref as ie, onBeforeUnmount as Be, inject as ze, createElementBlock as L, openBlock as C, renderSlot as O, createCommentVNode as U, unref as b, Fragment as ue, renderList as pe, normalizeClass as ye, createElementVNode as ve, createVNode as je, Transition as Ge, withCtx as W, createBlock as Se, resolveDynamicComponent as xe, mergeProps as le, toHandlers as Re, normalizeProps as te, onMounted as Ze, toDisplayString as ce, withModifiers as et, nextTick as Je, normalizeStyle as _e, createTextVNode as Ue, TransitionGroup as tt, createSlots as Ce, useTemplateRef as Tt, useId as Mt, useAttrs as Yt, provide as at, guardReactiveProps as ne } from "vue";
/**
  * vue-cal v5.0.1-rc.24
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
}, Et = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], Xe = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"], St = Xe.reduce((p, t, u) => (p[t] = u || 7, p), {}), Ct = (p, t, u) => {
  const { dateUtils: o } = p, w = !1, _ = E(() => {
    if (P.value[t.view]) return t.view;
    const f = t.datePicker ? "month" : "week", T = t.view || f;
    return P.value[T] ? T : (console.warn(
      `Vue Cal: the provided or default view \`${T}\` is either invalid or not in the list of available views. The first available view will be chosen: \`${Object.keys(P.value)[0]}\`.`
    ), Object.keys(P.value)[0]);
  }), N = E(() => t.sm && !t.xs), d = E(() => t.xs || t.datePicker), H = E(() => t.clickToNavigate || t.datePicker && t.clickToNavigate !== !1), v = E(() => {
    const f = {
      cell: {},
      // All possible event listeners to attach to cells.
      event: {}
      // All possible event listeners to attach to calendar events.
    }, T = (S) => S.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    for (const [S, l] of Object.entries(u)) {
      const [X, J, ae] = S.match(/^on(Cell|Event)(.+)$/) || [];
      X && (f[J.toLowerCase()][T(ae).replace(/^-+|-+$/g, "")] = l);
    }
    return f;
  }), c = E(() => {
    var T;
    const f = {};
    return t.hideWeekends && (f[6] = !0) && (f[7] = !0), (T = t.hideWeekdays) != null && T.length && t.hideWeekdays.forEach((S) => f[St[S]] = !0), f;
  }), y = E(() => t.hideWeekends || c.value[6] && c.value[7]), P = E(() => {
    const f = t.datePicker;
    let T = 0, S = {};
    const l = t.views;
    return f && !l ? {
      month: { ...ge.availableViews.month },
      year: { ...ge.availableViews.year },
      years: { ...ge.availableViews.years }
    } : (l ? (Array.isArray(l) ? S = l.reduce((X, J) => (typeof J == "string" && ge.availableViews[J] ? X[J] = ge.availableViews[J] : T++, X), {}) : typeof l == "object" && (S = Object.entries(l).reduce((X, [J, ae]) => {
      const { cols: se, rows: de } = ge.availableViews[J];
      return X[J] = { cols: ae.cols || se, rows: ae.rows || de }, X;
    }, {})), T && console.warn("Vue Cal: the provided `views` prop contains invalid views that will be ignored."), Object.keys(S).length || (console.warn("Vue Cal: No valid view in the provided `views` prop. Falling back to default views."), S = { ...ge.availableViews })) : S = { ...ge.availableViews }, S);
  }), I = E(() => t.datePicker ? "month" : P.value.week ? "week" : Object.keys(P.value)[0]), a = E(() => {
    if (typeof t.selectedDate == "string") return o.stringToDate(t.selectedDate);
    if (t.selectedDate instanceof Date) return t.selectedDate;
    t.selectedDate ? console.warn("Vue Cal: The provided selected date is invalid:", t.selectedDate) : console.log("Vue Cal: Info - The provided selected date is undefined.");
  }), s = E(() => {
    if (!t.disableDays) return [];
    const f = [];
    if (Array.isArray(t.disableDays))
      for (let T of t.disableDays) {
        let S = T;
        typeof T == "string" ? S = o.stringToDate(T) : T instanceof Date && (T = o.formatDate(T, "YYYY-MM-DD")), S instanceof Date && !isNaN(S.getTime()) ? f.push(T) : console.warn("Vue Cal: The provided `disableDays` prop contains an invalid date:", T);
      }
    else console.warn("Vue Cal: The provided `disableDays` prop is invalid:", t.disableDays);
    return f;
  }), e = E(() => {
    let f = null;
    return t.minDate && typeof t.minDate == "string" ? f = o.stringToDate(t.minDate) : t.minDate && t.minDate instanceof Date && (f = t.minDate), (f == null ? void 0 : f.getTime()) || null;
  }), k = E(() => {
    let f = null;
    return t.maxDate && typeof t.maxDate == "string" ? f = o.stringToDate(t.maxDate) : t.maxDate && t.maxDate instanceof Date && (f = t.maxDate), (f == null ? void 0 : f.getTime()) || null;
  }), i = E(() => {
    var S;
    const { view: f } = p;
    return t.schedules.length && (f.isDay || f.isDays || f.isWeek) && ((S = t.schedules) == null ? void 0 : S.map((l, X) => ({ ...l, id: l.id ?? X + 1 }))) || void 0;
  }), V = E(() => {
    const f = {
      drag: !0,
      resize: !0,
      delete: !0,
      create: !0
    };
    return t.editableEvents === !0 ? f : t.editableEvents === !1 ? Object.keys(f).map((T) => f[T] = !1) : { ...f, ...t.editableEvents };
  }), F = E(() => {
    const { view: f } = p, { eventCount: T } = t;
    return (Array.isArray(T) ? T.includes(f.id) : T) && (f.isMonth && !t.eventsOnMonthView || f.isYear);
  }), A = E(() => t.allDayEvents && t.time !== !1 && !_.isMonth), m = E(() => t.timeAtCursor && t.time !== !1), h = async (f) => {
    var S;
    let T = /* @__PURE__ */ Object.assign({ "../i18n/ar.json": () => import("./i18n/ar.js").then((l) => l.default), "../i18n/bg.json": () => import("./i18n/bg.js").then((l) => l.default), "../i18n/bn.json": () => import("./i18n/bn.js").then((l) => l.default), "../i18n/bs.json": () => import("./i18n/bs.js").then((l) => l.default), "../i18n/ca.json": () => import("./i18n/ca.js").then((l) => l.default), "../i18n/cs.json": () => import("./i18n/cs.js").then((l) => l.default), "../i18n/da.json": () => import("./i18n/da.js").then((l) => l.default), "../i18n/de.json": () => import("./i18n/de.js").then((l) => l.default), "../i18n/el.json": () => import("./i18n/el.js").then((l) => l.default), "../i18n/en-gb.json": () => import("./i18n/en-gb.js").then((l) => l.default), "../i18n/en-us.json": () => Promise.resolve().then(() => Lt).then((l) => l.default), "../i18n/es.json": () => import("./i18n/es.js").then((l) => l.default), "../i18n/et.json": () => import("./i18n/et.js").then((l) => l.default), "../i18n/fa.json": () => import("./i18n/fa.js").then((l) => l.default), "../i18n/fi.json": () => import("./i18n/fi.js").then((l) => l.default), "../i18n/fr.json": () => import("./i18n/fr.js").then((l) => l.default), "../i18n/he.json": () => import("./i18n/he.js").then((l) => l.default), "../i18n/hr.json": () => import("./i18n/hr.js").then((l) => l.default), "../i18n/hu.json": () => import("./i18n/hu.js").then((l) => l.default), "../i18n/id.json": () => import("./i18n/id.js").then((l) => l.default), "../i18n/is.json": () => import("./i18n/is.js").then((l) => l.default), "../i18n/it.json": () => import("./i18n/it.js").then((l) => l.default), "../i18n/ja.json": () => import("./i18n/ja.js").then((l) => l.default), "../i18n/ka.json": () => import("./i18n/ka.js").then((l) => l.default), "../i18n/ko.json": () => import("./i18n/ko.js").then((l) => l.default), "../i18n/lt.json": () => import("./i18n/lt.js").then((l) => l.default), "../i18n/mn.json": () => import("./i18n/mn.js").then((l) => l.default), "../i18n/nl.json": () => import("./i18n/nl.js").then((l) => l.default), "../i18n/no.json": () => import("./i18n/no.js").then((l) => l.default), "../i18n/pl.json": () => import("./i18n/pl.js").then((l) => l.default), "../i18n/pt-br.json": () => import("./i18n/pt-br.js").then((l) => l.default), "../i18n/pt-pt.json": () => import("./i18n/pt-pt.js").then((l) => l.default), "../i18n/ro.json": () => import("./i18n/ro.js").then((l) => l.default), "../i18n/ru.json": () => import("./i18n/ru.js").then((l) => l.default), "../i18n/sk.json": () => import("./i18n/sk.js").then((l) => l.default), "../i18n/sl.json": () => import("./i18n/sl.js").then((l) => l.default), "../i18n/sq.json": () => import("./i18n/sq.js").then((l) => l.default), "../i18n/sr.json": () => import("./i18n/sr.js").then((l) => l.default), "../i18n/sv.json": () => import("./i18n/sv.js").then((l) => l.default), "../i18n/tr.json": () => import("./i18n/tr.js").then((l) => l.default), "../i18n/uk.json": () => import("./i18n/uk.js").then((l) => l.default), "../i18n/vi.json": () => import("./i18n/vi.js").then((l) => l.default), "../i18n/zh-cn.json": () => import("./i18n/zh-cn.js").then((l) => l.default), "../i18n/zh-hk.json": () => import("./i18n/zh-hk.js").then((l) => l.default) });
    {
      if (!T[`../i18n/${f}.json`]) {
        console.warn(`Vue Cal: the locale \`${f}\` does not exist. Falling back to \`en-us\`.`), f = "en-us";
        return;
      }
      T = await ((S = T[`../i18n/${f}.json`]) == null ? void 0 : S.call(T));
    }
    p.texts = Object.assign(p.texts, Object.assign({ ...ge.texts }, T)), o.updateTexts(p.texts);
  }, z = Te(t.events || []);
  return me(() => t.events, (f) => z.splice(0, z.length, ...f)), me(() => t.locale, (f) => h(f || "en-us")), (t.locale || !p.texts.today) && h(t.locale || "en-us"), {
    ...bt(t),
    events: z,
    // All the events listeners for cells and events that the end user may have attached to vue-cal.
    eventListeners: v,
    defaultView: I,
    availableViews: P,
    disableDays: s,
    ready: w,
    sm: N,
    xs: d,
    clickToNavigate: H,
    hideWeekdays: c,
    hideWeekends: y,
    minTimestamp: e,
    maxTimestamp: k,
    schedules: i,
    selectedDate: a,
    editableEvents: V,
    showCellEventCount: F,
    allDayEvents: A,
    timeAtCursor: m,
    view: _,
    // Getters.
    get hasHiddenDays() {
      return Object.keys(c.value).length;
    },
    get size() {
      return d.value ? "xs" : N.value ? "sm" : "lg";
    },
    loadTexts: h
  };
}, Oe = (p, t) => {
  const u = t.timeTo - t.timeFrom;
  return (p - t.timeFrom) * 100 / u;
}, Le = (p, t) => {
  const u = t.timeTo - t.timeFrom;
  return ~~(p * u / 100 + t.timeFrom);
}, Ke = (p, t) => {
  const u = t.clientHeight;
  return p * 100 / u;
}, Ie = Te({ id: null, date: null });
let nt = !1, qe = !0;
const ke = Te({ el: null, cell: null, timeout: null }), $e = Te({
  eventId: null,
  fromVueCal: null,
  toVueCal: null
});
function Vt(p) {
  const { config: t, view: u, eventsManager: o, emit: w, uid: _, dateUtils: N } = p, d = (e) => {
    var h;
    const { timeStep: k, timeCellHeight: i, timeFrom: V } = t, F = (((h = e.touches) == null ? void 0 : h[0]) || e).clientY, { top: A } = e.currentTarget.getBoundingClientRect(), m = F - A - ~~e.dataTransfer.getData("cursor-grab-at");
    return Le(Ke(m, e.currentTarget), t);
  }, H = (e, k, i) => {
    const V = k.duration || v(k.start, k.end) || t.timeStep;
    let F = Math.max(d(e), 0);
    if (t.snapToInterval) {
      const z = F + t.snapToInterval / 2;
      F = z - z % t.snapToInterval;
    }
    const A = new Date(new Date(i).setMinutes(F)), m = Math.min(F + V, 24 * 60), h = new Date(new Date(i).setMinutes(m));
    return { start: A, end: h };
  }, v = (e, k) => Math.round((k - e) / 6e4);
  return {
    eventDragStart: (e, k) => {
      if (e.target.nodeType === 3 || p.touch.isResizingEvent) return e.preventDefault();
      e.dataTransfer.effectAllowed = "move", e.dataTransfer.dropEffect = "move";
      const i = { ...k, _: { id: k._.id, duration: v(k.start, k.end) } };
      try {
        e.dataTransfer.setData("text/plain", ""), e.dataTransfer.setData("event", JSON.stringify(i)), e.dataTransfer.setData("cursor-grab-at", e.offsetY);
      } catch (F) {
        return console.warn("Vue Cal: Failed to set drag data:", F), e.preventDefault();
      }
      $e.eventId = k._.id, $e.fromVueCal = _, w("event-drag-start", {
        e,
        event: k
      });
      const V = e.target.closest(".vuecal__event");
      V.classList.add("vuecal__event--dragging-ghost"), setTimeout(() => {
        V.classList.add("vuecal__event--dragging-original"), V.classList.remove("vuecal__event--dragging-ghost");
      }, 0), nt = !1, Object.assign(Ie, { id: u.id, date: u.firstCellDate }), qe = !0, p.touch.isDraggingEvent = !0;
    },
    eventDragEnd: (e, k) => {
      $e.eventId = null, e.target.closest(".vuecal__event").classList.remove("vuecal__event--dragging-original");
      const { fromVueCal: i, toVueCal: V } = $e;
      V && i !== V && o.deleteEvent(k._.id, 3), nt && qe && Ie.id && u.switchView(Ie.id, Ie.date, !0), w("event-drag-end", {
        e,
        event: k,
        external: $e.fromVueCal !== _
      }), $e.fromVueCal = null, $e.toVueCal = null, p.touch.isDraggingEvent = !1;
    },
    cellDragEnter: (e, k) => {
      const { start: i } = k, V = e.currentTarget;
      if (!e.currentTarget.contains(e.relatedTarget)) {
        if (V === ke.el || !V.className.includes("vuecal__cell-content")) return !1;
        ke.el && (ke.cell.highlighted = !1), Object.assign(ke, { el: V, cell: k, timeout: clearTimeout(ke.timeout) }), k.highlighted = !0, ["years", "year", "month"].includes(u.id) && (ke.timeout = setTimeout(() => p.switchToNarrowerView(i), 2e3));
      }
    },
    cellDragOver: (e, k) => {
      const { start: i, schedule: V } = k;
      e.preventDefault(), k.highlighted = !0, (V || V === 0) && (k.highlightedSchedule = V);
    },
    cellDragLeave: (e, k) => {
      e.preventDefault(), !e.currentTarget.contains(e.relatedTarget) && (k.highlightedSchedule = !1, ke.cell === k && (clearTimeout(ke.timeout), Object.assign(ke, { el: null, cell: null, timeout: null }), k.highlighted = !1));
    },
    cellDragDrop: async (e, k, i = !1) => {
      var S, l, X;
      e.preventDefault(), clearTimeout(ke.timeout), Object.assign(ke, { el: null, cell: null, timeout: null });
      const V = JSON.parse(e.dataTransfer.getData("event") || "{}");
      V.start && (V.start = new Date(V.start)), V.end && (V.end = new Date(V.end));
      let F, A, m;
      i ? (A = new Date(k.start), m = new Date(k.end)) : { start: A, end: m } = H(e, V, k.start);
      const { schedule: h } = ((S = e.target.closest("[data-schedule]")) == null ? void 0 : S.dataset) || {};
      let z = () => {
      };
      $e.fromVueCal === _ ? (F = o.getEvent(V._.id), F && (F._.dragging = !1, z = (J) => {
        if (F.start = A, F.end = m, F.allDay = i, h !== void 0 && (F.schedule = ~~h), J && typeof J == "object") {
          const { _: ae, ...se } = J;
          Object.assign(F, se);
        }
      })) : (F = {
        ...V,
        start: A,
        end: m,
        ...h !== void 0 && { schedule: ~~h },
        _: { id: ((l = V._) == null ? void 0 : l.id) || V.id, duration: v(A, m) },
        getOverlappingEvents: () => o.getEventsInRange(A, m, { schedule: ~~h })
      }, z = (J) => {
        if (F = o.createEvent(F), J && typeof J == "object") {
          const { _: ae, ...se } = J;
          Object.assign(F, se);
        }
      });
      let f = !0;
      const { drop: T } = (X = t.eventListeners) == null ? void 0 : X.event;
      T && (f = await T({
        e,
        event: { ...F, start: A, end: m, schedule: ~~h },
        overlaps: F.getOverlappingEvents({ start: A, end: m, schedule: ~~h }),
        cell: k,
        external: $e.fromVueCal !== _
      })), f !== !1 && z(f), k.highlighted = !1, k.highlightedSchedule = null, qe = !1, $e.toVueCal = _, w("event-dropped", {
        e,
        cell: k,
        event: F,
        originalEvent: V,
        external: $e.fromVueCal !== _
      });
    }
  };
}
const lt = (p, t) => {
  let u, o, w, _ = {}, N = {};
  const d = ie(p), H = () => {
    d.value.today || (d.value = t), Date.prototype.addDays = function(n) {
      return P(this, n || 0);
    }, Date.prototype.subtractDays = function(n) {
      return I(this, n || 0);
    }, Date.prototype.addHours = function(n) {
      return a(this, n || 0);
    }, Date.prototype.subtractHours = function(n) {
      return s(this, n || 0);
    }, Date.prototype.addMinutes = function(n) {
      return e(this, n || 0);
    }, Date.prototype.subtractMinutes = function(n) {
      return k(this, n || 0);
    }, Date.prototype.getWeek = function() {
      return V(this);
    }, Date.prototype.isToday = function() {
      return F(this);
    }, Date.prototype.isLeapYear = function() {
      return h(this);
    }, Date.prototype.format = function(n = "YYYY-MM-DD") {
      return J(this, n);
    }, Date.prototype.formatTime = function(n = "HH:mm") {
      return se(this, n);
    };
  }, v = () => {
    delete Date.prototype.addDays, delete Date.prototype.subtractDays, delete Date.prototype.addHours, delete Date.prototype.subtractHours, delete Date.prototype.addMinutes, delete Date.prototype.subtractMinutes, delete Date.prototype.getWeek, delete Date.prototype.isToday, delete Date.prototype.isLeapYear, delete Date.prototype.format, delete Date.prototype.formatTime;
  }, c = (n) => {
    d.value = n, Date.prototype.subtractDays && H();
  }, y = () => (o !== (/* @__PURE__ */ new Date()).getDate() && (u = /* @__PURE__ */ new Date(), o = u.getDate(), w = `${u.getFullYear()}-${u.getMonth()}-${u.getDate()}`), w), P = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setDate(D.getDate() + $), D;
  }, I = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setDate(D.getDate() - $), D;
  }, a = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setHours(D.getHours() + $), D;
  }, s = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setHours(D.getHours() - $), D;
  }, e = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setMinutes(D.getMinutes() + $), D;
  }, k = (n, $) => {
    const D = new Date(n.valueOf());
    return D.setMinutes(D.getMinutes() - $), D;
  }, i = (n, $) => {
    const D = (G) => {
      const K = G % $;
      return K !== 0 && (G += K >= $ / 2 ? $ - K : -K), G;
    };
    if (typeof n == "number") return D(n);
    if (n instanceof Date) {
      let G = D(n.getMinutes());
      G >= 60 && (n.setHours(n.getHours() + 1), G = 0), n.setMinutes(G, 0, 0);
    }
  }, V = (n, $ = !1) => {
    const D = new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())), G = D.getUTCDay() || 7;
    D.setUTCDate(D.getUTCDate() + 4 - G);
    const K = new Date(Date.UTC(D.getUTCFullYear(), 0, 1));
    return Math.ceil(((D - K) / 864e5 + 1) / 7) + ($ ? 1 : 0);
  }, F = (n) => `${n.getFullYear()}-${n.getMonth()}-${n.getDate()}` === y(), A = (n, $) => {
    if (!n || !$) return console.warn(`Vue Cal: missing date${n ? "2" : "1"} parameter for comparison with \`isSameDate(date1, date2)\`.`);
    if (X(n)) {
      if (!X($)) return console.warn(`Vue Cal: invalid date2 provided for comparison with \`isSameDate(date1, date2)\`: \`${$}\`.`);
    } else return console.warn(`Vue Cal: invalid date1 provided for comparison with \`isSameDate(date1, date2)\`: \`${n}\`.`);
    return n.getFullYear() === $.getFullYear() && n.getMonth() === $.getMonth() && n.getDate() === $.getDate();
  }, m = (n, $, D) => X(n) ? n.getTime() >= $ && n.getTime() <= D : console.warn(`Vue Cal: invalid date provided to \`isInRange(date, rangeStart, rangeEnd)\`: \`${n}\`.`), h = (n) => {
    const $ = n.getFullYear();
    return !($ % 400) || $ % 100 && !($ % 4);
  }, z = (n = null, $) => {
    const D = n && new Date(n.valueOf()) || /* @__PURE__ */ new Date(), G = $ ? 7 : 6;
    return D.setDate(D.getDate() - (D.getDay() + G) % 7), D;
  }, f = (n) => n instanceof Date ? n : (n.length === 10 && (n += " 00:00"), new Date(n.replace(/-/g, "/"))), T = (n) => n.getHours() * 60 + n.getMinutes(), S = (n, $) => {
    typeof n == "string" && (n = n.replace(/-/g, "/")), typeof $ == "string" && ($ = $.replace(/-/g, "/")), n = new Date(n).setHours(0, 0, 0, 0), $ = new Date($).setHours(0, 0, 1, 0);
    const D = (new Date($).getTimezoneOffset() - new Date(n).getTimezoneOffset()) * 60 * 1e3;
    return Math.ceil(($ - n - D) / (24 * 3600 * 1e3));
  }, l = (n, $, D) => Math.abs(n.getTime() - $.getTime()) <= D * 60 * 1e3, X = (n) => n && n instanceof Date && !isNaN(n), J = (n, $ = "YYYY-MM-DD", D = null) => {
    if (D || (D = d.value), $ || ($ = "YYYY-MM-DD"), $ === "YYYY-MM-DD") return ae(n);
    _ = {}, N = {};
    const G = {
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
      const r = G[De.replace(/\{|\}/g, "")];
      return r !== void 0 ? r() : De;
    });
  }, ae = (n) => {
    const $ = n.getMonth() + 1, D = n.getDate();
    return `${n.getFullYear()}-${$ < 10 ? "0" : ""}${$}-${D < 10 ? "0" : ""}${D}`;
  }, se = (n, $ = "HH:mm", D = null, G = !1) => {
    let K = !1;
    if (G) {
      const [Y, j, M] = [n.getHours(), n.getMinutes(), n.getSeconds()];
      Y + j + M === 141 && (K = !0);
    }
    if (n instanceof Date && $ === "HH:mm") return K ? "24:00" : de(n);
    N = {}, D || (D = d.value);
    const De = oe(n, D), r = $.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (Y, j) => {
      const M = De[j.replace(/\{|\}/g, "")];
      return M !== void 0 ? M : j;
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
    if (_.D) return _;
    const D = n.getFullYear(), G = n.getMonth() + 1, K = n.getDate(), r = (n.getDay() - 1 + 7) % 7;
    return _ = {
      // Year.
      YYYY: D,
      // 2024.
      YY: () => D.toString().substring(2),
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
    }, _;
  }, oe = (n, $) => {
    if (N.am) return N;
    let D, G, K;
    n instanceof Date ? (D = n.getHours(), G = n.getMinutes(), K = n.getSeconds()) : (D = Math.floor(n / 60), G = Math.floor(n % 60));
    const De = D % 12 ? D % 12 : 12, r = ($ || { am: "am", pm: "pm" })[D === 24 || D < 12 ? "am" : "pm"];
    return N = {
      H: D,
      h: De,
      HH: D.toString().padStart(2, 0),
      hh: De.toString().padStart(2, 0),
      am: r,
      AM: r.toUpperCase(),
      m: G,
      mm: G.toString().padStart(2, 0),
      s: K
    }, N;
  };
  return {
    addDatePrototypes: H,
    removeDatePrototypes: v,
    updateTexts: c,
    addDays: P,
    subtractDays: I,
    addHours: a,
    subtractHours: s,
    addMinutes: e,
    subtractMinutes: k,
    snapToInterval: i,
    getWeek: V,
    isToday: F,
    isSameDate: A,
    isInRange: m,
    isLeapYear: h,
    getPreviousFirstDayOfWeek: z,
    stringToDate: f,
    dateToMinutes: T,
    countDays: S,
    datesInSameTimeStep: l,
    isValid: X,
    formatDate: J,
    formatDateLite: ae,
    formatTime: se,
    formatTimeLite: de,
    formatMinutes: Z
  };
}, Ot = (p) => {
  const { dateUtils: t, config: u } = p;
  let o = 0;
  const w = E(() => {
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
    }, s = u.events.sort((e, k) => e.start - k.start < 0 ? -1 : 1);
    for (const e of s)
      if (_(e), N(e), a.byId[e._.id] = e, e.recurring)
        a.recurring.push(e._.id);
      else if (e._.multiday)
        a.multiday.push(e._.id), a.byDate[e._.startFormatted] || (a.byDate[e._.startFormatted] = []), a.byDate[e._.startFormatted].push(e._.id);
      else {
        a.byDate[e._.startFormatted] || (a.byDate[e._.startFormatted] = []), a.byDate[e._.startFormatted].push(e._.id);
        const k = e._.startFormatted.substring(0, 4), i = e._.startFormatted.substring(5, 7), V = e._.startFormatted.substring(8, 10);
        a.byYear[k] || (a.byYear[k] = {}), a.byYear[k][i] || (a.byYear[k][i] = {}), a.byYear[k][i][V] || (a.byYear[k][i][V] = []), a.byYear[k][i][V].push(e._.id);
      }
    return a;
  }), _ = (a) => {
    if (typeof a.start == "string" && (a.start = t.stringToDate(a.start)), typeof a.end == "string" && (a.end = t.stringToDate(a.end)), a.start.setSeconds(0, 0), a.end.getSeconds() >= 59 ? a.end.setMinutes(60, 0, 0) : a.end.setSeconds(0, 0), isNaN(a.start) || isNaN(a.end) || a.end.getTime() < a.start.getTime()) {
      isNaN(a.start) ? console.error(`Vue Cal: invalid start date for event "${a.title}".`, a.start) : isNaN(a.end) ? console.error(`Vue Cal: invalid end date for event "${a.title}".`, a.end) : console.error(`Vue Cal: invalid event dates for event "${a.title}". The event ends before it starts.`, a.start, a.end);
      return;
    }
    a._ || (a._ = {}), a._.multiday = !t.isSameDate(a.start, new Date(a.end.getTime() - 1)), a._.startFormatted = t.formatDate(a.start), a._.startMinutes = ~~t.dateToMinutes(a.start), a._.endMinutes = ~~t.dateToMinutes(a.end);
    const s = a.start.getHours(), e = a.start.getMinutes().toString().padStart(2, 0), k = a.end.getHours(), i = a.end.getMinutes().toString().padStart(2, 0);
    a._.startTimeFormatted24 = `${s.toString().padStart(2, 0)}:${e}`, a._.startTimeFormatted12 = `${s % 12 || 12}${e ? `:${e}` : ""} ${s < 12 ? "AM" : "PM"}`, a._.endTimeFormatted24 = `${k.toString().padStart(2, 0)}:${i}`, a._.endTimeFormatted12 = `${k % 12 || 12}${i ? `:${i}` : ""} ${k < 12 ? "AM" : "PM"}`, a._.duration = Math.abs(~~((a.end - a.start) / 6e4));
  }, N = (a) => {
    a._ || (a._ = {}), a._.id = a._.id || ++o, a.delete || (a.delete = (s) => c(a._.id, s)), a._.deleting = !1, a._.deleted = !1, a.isOverlapping = (s = null) => a.getOverlappingEvents(s).length, a.getOverlappingEvents = (s = null) => {
      var e;
      return P(
        (s == null ? void 0 : s.start) || a.start,
        (s == null ? void 0 : s.end) || a.end,
        { excludeIds: [a._.id], schedule: (e = u.schedules) != null && e.length ? ~~((s == null ? void 0 : s.schedule) || a.schedule) : null }
      );
    }, a._.register = (s) => {
      a._.$el = s, a._.fireCreated && (p.emit("event-created", a), delete a._.fireCreated);
    }, a._.unregister = () => {
      a._.$el = null, a._.register = null, a.isOverlapping = null, a.getOverlappingEvents = null, a.delete = null;
    };
  }, d = (a) => w.value.byId[a], H = (a) => {
    const s = [];
    for (const { start: e, end: k } of a) {
      const i = P(e, k);
      i.length && s.push(...i);
    }
    return s;
  }, v = (a) => {
    if (!a.start || !a.end) {
      console.error("Vue Cal: Cannot create an event without valid start and end dates.");
      return;
    }
    return u.snapToInterval && (t.snapToInterval(a.start, u.snapToInterval), t.snapToInterval(a.end, u.snapToInterval)), a = { ...a }, a._ || (a._ = {}), a._.id = ++o, a._.fireCreated = !0, u.events.push(a), a;
  }, c = async (a, s = 0) => {
    var F, A;
    if (!a) return console.warn("Vue Cal: Cannot delete event without its ID or criteria.");
    let e = typeof a == "string" || !isNaN(a) ? a : null;
    const k = typeof a == "object" ? Object.entries(a) : null;
    if (k) {
      const [m, h] = k[0];
      e = (F = u.events.find((z) => z[m] === h)) == null ? void 0 : F._.id;
    }
    if (!u.editableEvents.delete)
      return console.info("Vue Cal: Event deletion is disabled. Enable it with the `editable-events` props.");
    if (!e) return console.warn("Vue Cal: Cannot delete event without its ID.");
    const i = u.events.findIndex((m) => m._.id === e);
    if (i === -1) return console.warn(`Vue Cal: Cannot delete unknown event \`${e}\`.`);
    const V = u.events[i];
    if (V.deletable === !1) return console.warn(`Vue Cal: Can't delete event \`${e}\` since it was explicitely set to \`delete: false\`.`);
    switch (s) {
      case 0:
        V._.deleting ? u.events.splice(i, 1) : V._.deleting = !0;
        break;
      // Display the delete button.
      case 1:
        V._.deleting = !0;
        break;
      // Visual deletion + external DOM event firing.
      // When explicitly using this stage, the event will be visually deleted but still present in the
      // source of truth until the cell is unmounted (by navigating away).
      case 2:
        V._.deleted = !0, u.events[i]._.deleted = !0, (A = V._.$el) == null || A.dispatchEvent(new CustomEvent("event-deleted", { detail: V._.id }));
        break;
      // Effective deletion from the source of truth (by default, when unmounting the cell).
      case 3:
        u.events.splice(i, 1), p.emit("update:events", u.events), p.emit("event-delete", V);
        break;
    }
    return !0;
  }, y = (a, s) => {
    const e = u.allDayEvents ? { allDay: !0 } : {}, k = P(a, s, { background: !1, ...e });
    if (!k.length) return { cellOverlaps: {}, longestStreak: 0 };
    const i = {};
    let V = [], F = 0;
    k.sort((A, m) => A.start - m.start || A.end - A.start - (m.end - m.start));
    for (const A of k) {
      const m = A._.id;
      i[m] || (i[m] = { overlaps: /* @__PURE__ */ new Set(), maxConcurrent: 1, position: 0 }), V = V.filter((S) => S.end > A.start);
      const h = V.filter((S) => {
        var X;
        return (!((X = u.schedules) != null && X.length) || A.schedule === S.schedule) && S.start < A.end;
      }), z = new Set(h.map((S) => {
        var l;
        return ((l = i[S._.id]) == null ? void 0 : l.position) ?? 0;
      }));
      let f = 0;
      for (; z.has(f); ) f++;
      i[m].position = f, V.push(A);
      const T = Math.max(1, ...h.map((S) => {
        var l;
        return ((l = i[S._.id]) == null ? void 0 : l.maxConcurrent) ?? 1;
      }));
      i[m].maxConcurrent = Math.max(h.length + 1, T);
      for (const S of h)
        i[S._.id].overlaps.add(m), i[m].overlaps.add(S._.id), i[S._.id].maxConcurrent = i[m].maxConcurrent;
      F = Math.max(F, i[m].maxConcurrent);
    }
    for (const A in i) i[A].overlaps = [...i[A].overlaps];
    return { cellOverlaps: i, longestStreak: F };
  }, P = (a, s, { excludeIds: e = [], schedule: k = null, background: i = !0, allDay: V = !1 } = {}) => {
    const F = a.getFullYear(), A = s.getFullYear(), m = a.getMonth() + 1, h = s.getMonth() + 1, z = a.getDate(), f = s.getDate(), T = a.getTime(), S = s.getTime(), l = [], X = new Set(e);
    for (let J = F; J <= A; J++) {
      const ae = `${J}`, se = w.value.byYear[ae];
      if (!se) continue;
      const de = J === F ? m : 1, Z = J === A ? h : 12;
      for (let he = de; he <= Z; he++) {
        const ee = String(he).padStart(2, "0"), oe = se[ee];
        if (oe)
          for (const n in oe) {
            const $ = +n;
            if (J === F && he === m && $ < z || J === A && he === h && $ > f) continue;
            const D = oe[n];
            for (let G = 0; G < D.length; G++) {
              const K = w.value.byId[D[G]];
              !K || X.has(K._.id) || k !== null && k !== K.schedule || i === !1 && K.background || u.allDayEvents && (V && !K.allDay || !V && K.allDay) || K.end.getTime() > T && K.start.getTime() < S && l.push(K);
            }
          }
      }
    }
    return l;
  };
  return {
    events: w,
    getEvent: d,
    getViewEvents: H,
    getCellOverlappingEvents: y,
    getEventsInRange: P,
    createEvent: v,
    deleteEvent: c,
    isEventInRange: (a, s, e) => {
      const k = a.allDay || !u.time, i = k ? new Date(a.start).setHours(0, 0, 0, 0) : a.start.getTime(), V = k ? new Date(a.end).setHours(23, 59, 59, 999) : a.end.getTime(), F = k ? new Date(s).setHours(0, 0, 0, 0) : s.getTime(), A = k ? new Date(e).setHours(23, 59, 59, 999) : e.getTime();
      return V > F && i < A;
    }
  };
}, jt = ({ config: p, dateUtils: t, emit: u, texts: o, eventsManager: w }, _) => {
  const { availableViews: N } = p, d = ie(p.view && N[p.view] ? p.view : p.defaultView), H = ie(p.selectedDate || null), v = ie(/* @__PURE__ */ new Date()), c = ie(new Date(p.viewDate || v.value));
  c.value.setHours(0, 0, 0, 0);
  const y = ie(new Date(c));
  let P = null;
  const I = E(() => d.value === "month" ? y.value : h.value), a = E(() => d.value === "month" ? new Date(y.value.getFullYear(), y.value.getMonth() + 1, 0, 23, 59, 59, 999) : f.value), s = E(() => d.value === "week" ? t.getPreviousFirstDayOfWeek(h.value, p.startWeekOnSunday) : d.value === "month" ? h.value : I.value), e = E(() => {
    if (d.value === "week") {
      const g = t.addDays(s.value, 7);
      return g.setMilliseconds(-1), g;
    }
    return d.value === "month" ? f.value : a.value;
  }), k = E(() => {
    const g = v.value.getTime();
    if (d.value === "week")
      return s.value.getTime() <= g && g <= e.value.getTime();
    const R = h.value.getTime(), x = f.value.getTime();
    return R <= g && g <= x;
  });
  function i() {
    v.value = /* @__PURE__ */ new Date(), P = setTimeout(i, 60 * 1e3);
  }
  function V() {
    P = setTimeout(i, (60 - (/* @__PURE__ */ new Date()).getSeconds()) * 1e3), i();
  }
  const F = E(() => {
    if (!p.availableViews[d.value]) return 1;
    let g = p.availableViews[d.value].cols;
    return p.hasHiddenDays && ["week", "month"].includes(d.value) && (g -= p.hasHiddenDays), g;
  }), A = E(() => {
    var g;
    return ((g = p.availableViews[d.value]) == null ? void 0 : g.rows) || 1;
  }), m = E(() => F.value * A.value), h = E(() => {
    if (d.value === "month") {
      let g = y.value.getDay() || 7;
      return p.startWeekOnSunday && !p.hideWeekdays[7] && (g += 1), p.viewDayOffset && (g -= p.viewDayOffset), t.subtractDays(y.value, g - 1);
    }
    if (d.value === "week") {
      const g = "1234567".split("").filter((x) => !Object.keys(p.hideWeekdays).includes(x));
      let R = Math.min(...g);
      return p.startWeekOnSunday && !p.hideWeekdays[7] && (R = 1), p.viewDayOffset && (R += p.viewDayOffset), t.addDays(y.value, R - 1);
    }
    return y.value;
  }), z = E(() => {
    const g = [], R = ["days", "week", "month"].includes(d.value);
    let x = 0;
    for (let Q = 0; Q < m.value + x; Q++)
      switch (d.value) {
        case "day":
        case "days":
        case "week":
        case "month": {
          const fe = t.addDays(h.value, Q), Ae = fe.getDay() || 7;
          if (R && p.hasHiddenDays && p.hideWeekdays[Ae]) {
            x++;
            continue;
          }
          const Ve = new Date(fe);
          Ve.setHours(23, 59, 59, 999), g.push({ start: fe, startFormatted: t.formatDate(fe), end: Ve });
          break;
        }
        case "year":
          g.push({
            start: new Date(h.value.getFullYear(), Q, 1, 0, 0, 0, 0),
            end: new Date(h.value.getFullYear(), Q + 1, 0, 23, 59, 59, 999)
          });
          break;
        case "years":
          g.push({
            start: new Date(h.value.getFullYear() + Q, 0, 1, 0, 0, 0, 0),
            end: new Date(h.value.getFullYear() + Q + 1, 0, 0, 23, 59, 59, 999)
          });
          break;
      }
    return g;
  }), f = E(() => z.value[z.value.length - 1].end), T = ie("right"), S = E(() => {
    const g = Object.keys(p.availableViews);
    return g[g.indexOf(d.value) + 1];
  }), l = E(() => {
    const g = Object.keys(p.availableViews);
    return g[g.indexOf(d.value) - 1];
  });
  function X(g, R, x = !1) {
    if (!R || !R[g]) return g + 1;
    const Q = R[g];
    return x && typeof Q == "string" ? Q.substring(0, 3) : Q;
  }
  function J(g, R, x) {
    const { monthsArray: Q, monthBeforeDay: fe, canTruncate: Ae, xs: Ve } = x, Me = g.getMonth(), Ye = g.getFullYear(), Ee = R.getMonth(), He = R.getFullYear(), We = Me !== Ee, _t = Ye !== He, be = Ae && (Ve || We), Pe = g.getDate(), Fe = R.getDate();
    return _t ? fe ? `${X(Me, Q, be)} ${Pe}, ${Ye} - ${X(Ee, Q, be)} ${Fe}, ${He}` : `${Pe} ${X(Me, Q, be)} ${Ye} - ${Fe} ${X(Ee, Q, be)} ${He}` : We ? fe ? `${X(Me, Q, be)} ${Pe} - ${X(Ee, Q, be)} ${Fe}, ${Ye}` : `${Pe} ${X(Me, Q, be)} - ${Fe} ${X(Ee, Q, be)} ${Ye}` : fe ? `${X(Me, Q, be)} ${Pe}-${Fe}, ${Ye}` : `${Pe}-${Fe} ${X(Me, Q, be)} ${Ye}`;
  }
  const ae = E(() => {
    const { dateFormat: g, months: R, monthsGenitive: x, week: Q, truncations: fe } = o, Ae = p.locale, Ve = fe !== !1, Me = g.indexOf("M") < g.indexOf("D"), Ye = x && Ae === "el" ? x : R;
    switch (d.value) {
      case "day":
        return t.formatDate(h.value, g);
      case "days":
      case "week": {
        const Ee = {
          monthsArray: Ye,
          monthBeforeDay: Me,
          canTruncate: Ve,
          xs: p.xs
        };
        let He = J(h.value, f.value, Ee);
        if (d.value === "week") {
          const We = t.getWeek(
            h.value,
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
        return h.value.getFullYear();
      case "years":
        return `${h.value.getFullYear()} - ${a.value.getFullYear()}`;
    }
  });
  function se() {
    switch (y.value = new Date(c.value || v.value), y.value.setHours(0, 0, 0, 0), d.value) {
      case "day":
        break;
      case "days":
        break;
      case "week":
        y.value = t.getPreviousFirstDayOfWeek(y.value, p.startWeekOnSunday && !p.hideWeekdays[7]);
        break;
      case "month":
        y.value = new Date(y.value.getFullYear(), y.value.getMonth(), 1, 0, 0, 0, 0);
        break;
      case "year":
        y.value = new Date(y.value.getFullYear(), 0, 1, 0, 0, 0, 0);
        break;
      case "years":
        y.value = new Date(y.value.getFullYear() - y.value.getFullYear() % m.value, 0, 1, 0, 0, 0, 0);
        break;
    }
    p.ready && u("view-change", {
      id: d.value,
      title: ae.value,
      start: I.value,
      end: a.value,
      extendedStart: s.value,
      extendedEnd: e.value,
      cellDates: z.value,
      containsToday: k.value,
      events: q.value
    }), v.value = /* @__PURE__ */ new Date();
  }
  function de(g) {
    const R = d.value, x = p.availableViews[R];
    g[R] && JSON.stringify(g[R]) === JSON.stringify(x) || se();
  }
  function Z(g, R = !0) {
    const x = Object.keys(p.availableViews);
    d.value !== g && (x.includes(g) ? (T.value = x.indexOf(g) < x.indexOf(d.value) ? "left" : "right", d.value = g, u("update:view", g), se()) : console.warn(`Vue Cal: the \`${g}\` view is not available.`));
  }
  function he() {
    S.value ? Z(S.value) : console.warn("Vue Cal: no broader view is available.");
  }
  function ee() {
    l.value ? Z(l.value) : console.warn("Vue Cal: no narrower view is available.");
  }
  function oe() {
    $(!1);
  }
  function n() {
    $(!0);
  }
  function $(g = !0) {
    let R = new Date(c.value);
    switch (d.value) {
      case "day":
      case "days":
        g ? R = t.addDays(f.value, 1) : R = t.subtractDays(h.value, m.value);
        break;
      case "week": {
        g ? (R = t.addDays(e.value, 1), R.setHours(0, 0, 0, 0)) : R = t.subtractDays(s.value, m.value);
        break;
      }
      case "month": {
        const x = g ? 1 : -1;
        R = new Date(R.getFullYear(), R.getMonth() + x, 1, 0, 0, 0, 0);
        break;
      }
      case "year": {
        const x = g ? 1 : -1;
        R = new Date(R.getFullYear() + x, 1, 1, 0, 0, 0, 0);
        break;
      }
      case "years": {
        const x = g ? m.value : -m.value;
        R = new Date(R.getFullYear() + x, 1, 1, 0, 0, 0, 0);
        break;
      }
    }
    G(R);
  }
  function D() {
    const g = /* @__PURE__ */ new Date();
    g.setHours(0, 0, 0, 0), G(g);
  }
  function G(g, R = !0, x = !1) {
    if (!t.isValid(g)) return console.warn("Vue Cal: can't navigate to the given date: invalid date provided to `updateViewDate(date)`.");
    let [Q, fe] = [h.value, f.value];
    d.value === "month" && ([Q, fe] = [I.value, a.value]), (!t.isInRange(g, Q, fe) || x) && (g.setHours(0, 0, 0, 0), T.value = g.getTime() < Q.getTime() ? "left" : "right", c.value = g, R && u("update:viewDate", g), se());
  }
  function K(g, R = !0) {
    if (!t.isValid(g)) return console.warn("Vue Cal: can't update the selected date: invalid date provided to `updateSelectedDate(date)`.");
    const { isValid: x, isSameDate: Q } = t;
    (!H.value || !x(H.value) || !Q(g, H.value)) && (g.setHours(0, 0, 0, 0), H.value = g, R && u("update:selectedDate", g));
  }
  function De(g) {
    !g && !y.value.getDay() ? G(t.addDays(y.value, 1), !0, !0) : (T.value = "left", se());
  }
  function r(g) {
    g && p.startWeekOnSunday && !y.value.getDay() ? G(t.addDays(y.value, 1), !0, !0) : !g && p.startWeekOnSunday && y.value.getDay() === 1 && G(t.subtractDays(y.value, 1), !0, !0);
  }
  function Y() {
    console.log("toggling weekdays", p.hideWeekdays);
  }
  function j(g) {
    var Q;
    const R = (Q = _.value) == null ? void 0 : Q.querySelector(".vuecal__scrollable"), x = g ? g * p.timeCellHeight / p.timeStep : 0;
    R == null || R.scrollTo({ top: x, behavior: "smooth" });
  }
  function M() {
    const g = /* @__PURE__ */ new Date();
    j(g.getHours() * 60 + g.getMinutes());
  }
  function B() {
    j(0);
  }
  const q = E(() => w.getViewEvents(z.value)), re = w.createEvent, we = w.deleteEvent;
  return me(() => p.view, (g) => Z(g, !1)), me(() => p.availableViews, de), me(() => p.datePicker, () => Z("month", !1)), me(() => p.viewDate, (g) => G(g, !1)), me(() => p.selectedDate, (g) => K(g, !1)), me(() => p.startWeekOnSunday, (g) => De(g)), me(() => p.hideWeekends, (g) => r(g)), me(() => p.hideWeekdays, Y), me(() => m.value, () => {
    m.value > 90 && console.warn("Vue Cal: high cell count detected. Performance may degrade when interactions are enabled.");
  }), me(() => p.watchRealTime, (g) => {
    g && p.time ? V() : P = clearTimeout(P);
  }), se(), p.time && p.watchRealTime && V(), Be(() => P = clearTimeout(P)), {
    now: v,
    id: d,
    broaderView: S,
    narrowerView: l,
    title: ae,
    viewDate: c,
    start: I,
    end: a,
    extendedStart: s,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    extendedEnd: e,
    // Full range, including out of scope month days, and hidden leading/trailing days.
    firstCellDate: h,
    lastCellDate: f,
    containsToday: k,
    selectedDate: H,
    cellDates: z,
    cols: F,
    rows: A,
    // All the events are stored and indexed in the events object of the eventsManager.
    // The following events array is only a subset of visible ones, plus any potential recurring
    // and multi-day events.
    events: q,
    transitionDirection: T,
    switch: Z,
    broader: he,
    narrower: ee,
    previous: oe,
    next: n,
    navigate: $,
    goToToday: D,
    updateViewDate: G,
    updateSelectedDate: K,
    scrollToCurrentTime: M,
    scrollToTime: j,
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
}), zt = ({ props: p, emit: t, attrs: u, vuecalEl: o, uid: w }) => {
  const _ = Te({
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
  return _.dateUtils = lt(Object.assign(ge.texts, _.texts), Qe), _.config = Ct(_, p, u), _.eventsManager = Ot(_), _.view = jt(_, o), _.dnd = Vt(_), _;
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
    const t = ze("vuecal"), { view: u, config: o } = t, w = () => {
      o.clickToNavigate && u.broader();
    }, _ = E(() => o.clickToNavigate ? { click: w } : {});
    return (N, d) => (C(), L("div", Ft, [
      O(N.$slots, "header", {
        view: b(u),
        availableViews: b(o).availableViews,
        vuecal: b(t)
      }),
      N.$slots.header ? U("", !0) : (C(), L(ue, { key: 0 }, [
        b(o).viewsBar ? (C(), L("div", Nt, [
          (C(!0), L(ue, null, pe(b(o).availableViews, (H, v) => (C(), L("button", {
            class: ye(["vuecal__view-button", { "vuecal__view-button--active": b(u).id === v }]),
            onClick: (c) => b(u).switch(v),
            innerHTML: b(t).texts[v],
            type: "button"
          }, null, 10, At))), 256))
        ])) : U("", !0),
        b(o).titleBar ? (C(), L("nav", Bt, [
          ve("button", {
            class: ye(["vuecal__nav vuecal__nav--prev", { "vuecal__nav--default": !N.$slots["previous-button"] }]),
            onClick: d[0] || (d[0] = (...H) => b(u).previous && b(u).previous(...H)),
            type: "button"
          }, [
            O(N.$slots, "previous-button")
          ], 2),
          ve("div", Wt, [
            je(Ge, {
              name: `vuecal-slide-fade--${b(u).transitionDirection}`
            }, {
              default: W(() => [
                (C(), L("div", {
                  key: b(u).id + b(u).start.getTime()
                }, [
                  N.$slots.title || N.$slots[`title.${b(u).id}`] ? (C(), Se(xe(b(o).clickToNavigate && b(u).broaderView ? "button" : "div"), le({
                    key: 0,
                    class: "vuecal__title"
                  }, Re(_.value)), {
                    default: W(() => [
                      N.$slots[`title.${b(u).id}`] ? O(N.$slots, `title.${b(u).id}`, te(le({ key: 0 }, b(u)))) : O(N.$slots, "title", te(le({ key: 1 }, b(u))))
                    ]),
                    _: 3
                  }, 16)) : (C(), Se(xe(b(o).clickToNavigate && b(u).broaderView ? "button" : "div"), le({
                    key: 1,
                    class: "vuecal__title"
                  }, Re(_.value), {
                    innerHTML: b(u).title
                  }), null, 16, ["innerHTML"]))
                ]))
              ]),
              _: 3
            }, 8, ["name"])
          ]),
          b(o).todayButton ? (C(), L(ue, { key: 0 }, [
            N.$slots["today-button"] ? O(N.$slots, "today-button", {
              key: 0,
              navigate: () => !b(u).containsToday && b(u).goToToday(),
              active: b(u).containsToday
            }) : (C(), L("button", {
              key: 1,
              class: ye(["vuecal__nav vuecal__nav--today vuecal__nav--default", { "vuecal__nav--active": b(u).containsToday }]),
              onClick: d[1] || (d[1] = (H) => !b(u).containsToday && b(u).goToToday()),
              disabled: !!b(u).containsToday,
              type: "button",
              innerHTML: b(t).texts.today
            }, null, 10, It))
          ], 64)) : U("", !0),
          ve("button", {
            class: ye(["vuecal__nav vuecal__nav--next", { "vuecal__nav--default": !N.$slots["next-button"] }]),
            onClick: d[2] || (d[2] = (...H) => b(u).next && b(u).next(...H)),
            type: "button"
          }, [
            O(N.$slots, "next-button")
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
    const { config: u, view: o, dnd: w, touch: _, dateUtils: N } = ze("vuecal"), d = p, H = ie(null), v = Te(d.event), c = Te({
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
    }), y = E(() => u.editableEvents.drag && v.draggable !== !1 && !v.background), P = E(() => o.isMonth || o.isYear || o.isYears || d.inAllDayBar ? !1 : u.time && u.editableEvents.resize && v.resizable !== !1 && !v.background);
    E(() => u.editableEvents.delete && v.deletable !== !1 && !v.background);
    const I = E(() => {
      var m, h, z, f, T;
      return {
        [`vuecal__event--${v._.id}`]: !0,
        [v.class]: !!v.class,
        "vuecal__event--recurring": !!v.recurring,
        "vuecal__event--background": !!v.background,
        "vuecal__event--all-day": v.allDay || ((m = v._) == null ? void 0 : m.startMinutes) === 0 && ((h = v._) == null ? void 0 : h.duration) === 24 * 60,
        "vuecal__event--multiday": !!((z = v._) != null && z.multiday),
        "vuecal__event--cut-top": !d.inAllDayBar && ((f = v._) == null ? void 0 : f.startMinutes) < u.timeFrom,
        "vuecal__event--cut-bottom": !d.inAllDayBar && ((T = v._) == null ? void 0 : T.endMinutes) > u.timeTo || v._.multiday,
        // Only apply the dragging class on the event copy that is being dragged.
        "vuecal__event--dragging": !v._.draggingGhost && v._.dragging,
        // Only apply the dragging-ghost class on the event original that remains fixed while a copy is being
        // dragged. Sometimes when dragging fast the dragging-ghost class would get stuck and events stays
        // invisible, so if dragging is false, disable the dragging-ghost class as well.
        // On event drop, if the new position of the event is approved, only remove the dragging-ghost class
        // after event deletion (event._.dragging is already false) so the event ghost does not flash in before
        // deletion.
        "vuecal__event--dragging-ghost": v._.draggingGhost,
        "vuecal__event--resizing": c.resizing
      };
    }), a = E(() => {
      const m = (o.isDay || o.isDays || o.isWeek) && u.time && !d.inAllDayBar;
      if (!m && !v.backgroundColor && !v.color) return !1;
      const h = {
        backgroundColor: v.backgroundColor || null,
        color: v.color || null
      };
      if (m) {
        const z = Math.max(u.timeFrom, v._.startMinutes), f = Math.min(u.timeTo, v._.endMinutes) + (v._.duration && !v._.endMinutes ? 24 * 60 : 0), T = Oe(z, u), S = Oe(f, u) - T;
        h.top = `${T}%`, h.height = `${S}%`;
      }
      return h;
    }), s = E(() => {
      const m = { ...u.eventListeners.event };
      for (const [f, T] of Object.entries(m))
        ["resize-end"].includes(f) || (m[f] = (S) => {
          S.type !== "drop" && T(S.type ? { e: S, event: v } : S);
        });
      const h = { ...m };
      m.touchstart = (f) => {
        var T;
        f.stopPropagation(), e(f), (T = h.touchstart) == null || T.call(h, { e: f, event: v });
      }, m.mousedown = (f) => {
        var T;
        f.stopPropagation(), e(f), (T = h.mousedown) == null || T.call(h, { e: f, event: v });
      };
      let z = null;
      return m.click = (f) => {
        var T;
        (T = h.click) == null || T.call(h, { e: f, event: v }), z ? z = clearTimeout(z) : z = setTimeout(() => {
          var S;
          z = null, (S = h["delayed-click"]) == null || S.call(h, { e: f, event: v });
        }, 400);
      }, m.dblclick = (f) => {
        h.dblclick ? h.dblclick({ e: f, event: v }) : v.delete(1);
      }, m;
    }), e = (m) => {
      var f, T, S;
      const h = ((f = m.touches) == null ? void 0 : f[0]) || m;
      c.fromResizer = h.target.matches(".vuecal__event-resizer, .vuecal__event-resizer *");
      const z = H.value.getBoundingClientRect();
      c.startX = (((T = m.touches) == null ? void 0 : T[0]) || m).clientX - z.left, c.startY = (((S = m.touches) == null ? void 0 : S[0]) || m).clientY - z.top, c.startPercentageX = c.startX * 100 / z.width, c.startPercentageY = c.startY * 100 / z.height, c.cellEl = H.value.closest(".vuecal__cell"), c.resizeStartDate = v.start, A(m.type === "touchstart" ? "touchmove" : "mousemove", k), A(m.type === "touchstart" ? "touchend" : "mouseup", i, { once: !0 }), c.holdTimer = setTimeout(() => {
        var l, X;
        c.holding = !0, (X = (l = s.value).hold) == null || X.call(l, { e: m, event: v });
      }, 1e3);
    }, k = async (m) => {
      var z, f, T, S;
      const h = ((z = m.touches) == null ? void 0 : z[0]) || m;
      if (c.fromResizer && !c.resizing && (c.resizing = !0, c.resizingOriginalEvent = { ...v, _: { ...v._ } }, _.isResizingEvent = !0, (T = (f = s.value)["resize-start"]) == null || T.call(f, { e: m, event: v })), c.holdTimer = clearTimeout(c.holdTimer), c.holding = !1, c.cellEl) {
        const { top: l, left: X, width: J, height: ae } = c.cellEl.getBoundingClientRect();
        c.moveX = h.clientX - X, c.moveY = h.clientY - l, c.movePercentageX = c.moveX * 100 / J, c.movePercentageY = c.moveY * 100 / ae;
      }
      if (c.fromResizer) {
        const { newStart: l, newEnd: X } = V(v);
        let J = !0;
        const { resize: ae } = (S = u.eventListeners) == null ? void 0 : S.event;
        ae && (J = await ae({
          e: m,
          event: { ...v, start: l, end: X },
          overlaps: v.getOverlappingEvents({ start: l, end: X })
        })), J !== !1 ? (v.start = l, v.end = X, c.resizingLastAcceptedEvent && (c.resizingLastAcceptedEvent = null)) : ae && (c.resizingLastAcceptedEvent = { ...v, _: { ...v._ } });
      }
    }, i = async (m) => {
      var h, z;
      if (c.holdTimer = clearTimeout(c.holdTimer), c.holding = !1, c.resizing) {
        const { newStart: f, newEnd: T } = V(v);
        let S = !0;
        const l = s.value["resize-end"];
        l && (S = await l({
          e: m,
          event: v,
          original: c.resizingOriginalEvent,
          // Original event details before resizing.
          overlaps: v.getOverlappingEvents({ start: f, end: T })
        })), v.start = S === !1 ? (c.resizingLastAcceptedEvent || c.resizingOriginalEvent).start : ((h = c.resizingLastAcceptedEvent) == null ? void 0 : h.start) || f, v.end = S === !1 ? (c.resizingLastAcceptedEvent || c.resizingOriginalEvent).end : ((z = c.resizingLastAcceptedEvent) == null ? void 0 : z.end) || T, v._.duration < 1 && (v.start = c.resizingOriginalEvent.start, v.end = c.resizingOriginalEvent.end), _.isResizingEvent = !1;
      }
      document.removeEventListener(m.type === "touchend" ? "touchmove" : "mousemove", k), c.resizing = !1, c.fromResizer = !1, c.dragging = !1, c.startX = 0, c.startY = 0, c.moveX = 0, c.moveY = 0, c.startPercentageX = 0, c.startPercentageY = 0, c.movePercentageX = 0, c.movePercentageY = 0, c.cellEl = null, c.resizeStartDate = null, c.resizingOriginalEvent = null, c.resizingLastAcceptedEvent = null, c.schedule = null;
    }, V = (m) => {
      const h = new Date(m.start.getFullYear(), m.start.getMonth(), m.start.getDate());
      new Date(h).setDate(h.getDate() + 1);
      let f = Le(c.movePercentageY, u);
      if (f = Math.max(0, Math.min(f, 24 * 60)), u.snapToInterval) {
        const l = f + u.snapToInterval / 2;
        f = l - l % u.snapToInterval;
      }
      let T = m.start, S = new Date(h.getTime() + f * 6e4);
      return S < c.resizeStartDate && (T = S, S = c.resizeStartDate), { newStart: T, newEnd: S };
    }, F = [], A = (m, h, z) => {
      document.addEventListener(m, h, z), F.push({ event: m, handler: h, options: z });
    };
    return Ze(() => v._.register(H.value)), Be(() => {
      v._.unregister();
      for (const { event: m, handler: h, options: z } of F)
        document.removeEventListener(m, h, z);
    }), (m, h) => (C(), L("div", le({ class: "vuecal__event" }, Re(s.value, !0), {
      ref_key: "eventEl",
      ref: H,
      class: I.value,
      style: a.value,
      draggable: y.value ? "true" : void 0,
      onDragstart: h[2] || (h[2] = (z) => y.value && b(w).eventDragStart(z, v)),
      onDragend: h[3] || (h[3] = (z) => y.value && b(w).eventDragEnd(z, v))
    }), [
      ve("div", Gt, [
        m.$slots["event.all-day"] ? O(m.$slots, "event.all-day", {
          key: 0,
          event: v
        }) : m.$slots[`event.${b(o).id}`] ? O(m.$slots, `event.${b(o).id}`, {
          key: 1,
          event: v
        }) : O(m.$slots, "event", {
          key: 2,
          event: v
        }, () => [
          ve("div", qt, ce(v.title), 1),
          b(u).time && !p.inAllDayBar ? (C(), L("div", Jt, [
            b(o).isMonth ? (C(), L("span", Ut, ",")) : U("", !0),
            ve("span", Zt, ce(v._[`startTimeFormatted${b(u).twelveHour ? 12 : 24}`]), 1),
            b(o).isMonth ? U("", !0) : (C(), L("span", Kt, " - " + ce(v._[`endTimeFormatted${b(u).twelveHour ? 12 : 24}`]), 1))
          ])) : U("", !0),
          p.inAllDayBar ? U("", !0) : (C(), L("div", {
            key: 1,
            class: "vuecal__event-content",
            innerHTML: v.content
          }, null, 8, Qt))
        ])
      ]),
      P.value ? (C(), L("div", {
        key: 0,
        class: "vuecal__event-resizer",
        onDragstart: h[0] || (h[0] = et(() => {
        }, ["prevent", "stop"]))
      }, null, 32)) : U("", !0),
      je(Ge, { name: "vuecal-delete-btn" }, {
        default: W(() => [
          v._.deleting ? (C(), L("div", {
            key: 0,
            class: "vuecal__event-delete",
            onClick: h[1] || (h[1] = et((z) => v.delete(3), ["stop"]))
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
    const t = p, u = ze("vuecal"), { view: o, config: w, dateUtils: _, eventsManager: N, dnd: d, touch: H } = u, v = E(() => _.isToday(t.start)), c = ie(null), y = ie([]), P = ie(!1), I = (r) => {
      y.value.push(r.detail), P.value = !0;
    }, a = () => setTimeout(() => P.value = !1, 300), s = Te({
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
    }), e = ie(!1), k = ie({ cellOverlaps: {}, longestStreak: 0 }), i = E(() => {
      let r = Math.min(s.startPercentageY, s.movePercentageY), Y = Math.max(s.startPercentageY, s.movePercentageY), j = Le(r, w), M = Le(Y, w);
      return w.snapToInterval && (j = _.snapToInterval(j, w.snapToInterval), M = _.snapToInterval(M, w.snapToInterval), r = Oe(j, w), Y = Oe(M, w)), {
        style: {
          top: `${r}%`,
          height: `${Math.abs(Y - r)}%`
        },
        startMinutes: j,
        endMinutes: M,
        start: _.formatMinutes(j),
        end: _.formatMinutes(M),
        ...s.schedule ? { schedule: s.schedule } : {}
      };
    }), V = E(() => {
      const r = w.editableEvents.create && (s.dragging || e.value), Y = w.eventCreateMinDrag && s.thresholdPassed || !w.eventCreateMinDrag;
      return r && Y;
    }), F = E(() => {
      var re;
      const r = /* @__PURE__ */ new Date(), Y = o.start.getFullYear(), j = o.start.getMonth(), M = t.start.getFullYear(), B = t.start.getMonth();
      return {
        [`vuecal__cell--${Xe[t.start.getDay()]}`]: o.isDay || o.isDays || o.isWeek || o.isMonth,
        [`vuecal__cell--${Et[B]}`]: o.isYear,
        [`vuecal__cell--${M}`]: o.isYears,
        "vuecal__cell--today": v.value,
        "vuecal__cell--current-month": o.isYear && M === r.getFullYear() && B === r.getMonth(),
        "vuecal__cell--current-year": o.isYears && M === r.getFullYear(),
        "vuecal__cell--out-of-range": o.isMonth && (M !== Y || B !== j),
        "vuecal__cell--before-min": ae.value && X.value,
        "vuecal__cell--after-max": ae.value && J.value,
        "vuecal__cell--disabled": ae.value,
        "vuecal__cell--selected": o.selectedDate && o.selectedDate.getTime() >= t.start.getTime() && o.selectedDate.getTime() <= t.end.getTime(),
        "vuecal__cell--has-schedules": (re = w.schedules) == null ? void 0 : re.length,
        "vuecal__cell--dragging": s.dragging,
        "vuecal__cell--has-events": m.value.length
      };
    });
    E(() => _.formatDate(t.start));
    const A = E(() => {
      switch (o.id) {
        case "day":
          return "";
        case "days":
          return w.availableViews.days.rows > 1 && _.formatDate(t.start, "D"), "";
        case "week":
          return "";
        case "month":
          return _.formatDate(t.start, "D");
        case "year":
          return _.formatDate(t.start, w.xs ? "MMM" : "MMMM");
        case "years":
          return _.formatDate(t.start, "YYYY");
      }
    }), m = E(() => w.datePicker ? [] : N.getEventsInRange(
      t.start,
      t.end,
      { excludeIds: y.value, ...w.allDayEvents ? { allDay: t.allDay } : {} }
    )), h = E(() => m.value.filter((r) => !r.background)), z = E(() => {
      var r;
      return (r = w.schedules) == null ? void 0 : r.reduce((Y, j) => (Y[j.id] = m.value.filter((M) => M.schedule === j.id), Y), {});
    }), f = E(() => {
      if (o.isMonth || o.isYear || o.isYears || t.allDay) return {};
      const r = typeof document < "u" && document.documentElement.getAttribute("dir") === "rtl", Y = {};
      for (const j of m.value) {
        const M = j._.id, { maxConcurrent: B = 1, position: q = 0 } = k.value.cellOverlaps[M] || {}, re = r ? "right" : "left";
        Y[M] = { [re]: `${100 / B * q}%` }, w.stackEvents ? Y[M].width = `${100 / B + (q === B - 1 ? 0 : 15)}%` : Y[M].width = `${100 / B}%`;
      }
      return Y;
    }), T = E(() => {
      const r = {};
      for (const Y of m.value) {
        const j = Y._.id, { maxConcurrent: M = 1, position: B = 0 } = k.value.cellOverlaps[j] || {};
        r[j] = `vuecal__event--stack-${B + 1}-${M}`;
      }
      return r;
    }), S = E(() => w.showCellEventCount && h.value.length), l = E(() => {
      var j;
      if (!w.specialHours || o.isMonth || o.isYear || o.isYears || t.allDay) return;
      const r = Xe[t.start.getDay()];
      let Y = (j = w.specialHours) == null ? void 0 : j[r];
      if (Y)
        return Array.isArray(Y) || (Y = [Y]), Y.map((M) => {
          let { from: B, to: q, class: re, label: we } = M;
          if (isNaN(B) || isNaN(q) || w.timeFrom >= q || w.timeTo <= B) return;
          B = Math.max(w.timeFrom, B), q = Math.min(w.timeTo, q);
          const g = Oe(B, w), R = Oe(q, w) - g;
          return {
            style: { top: `${g}%`, height: `${R}%` },
            label: we,
            class: re
          };
        }).filter((M) => !!M);
    }), X = E(() => w.minTimestamp !== null && w.minTimestamp > t.end.getTime()), J = E(() => w.maxTimestamp && w.maxTimestamp < t.start.getTime()), ae = E(() => {
      const { disableDays: r } = w, Y = o.isYear || o.isYears;
      return r.length && r.includes(_.formatDate(t.start)) && !Y ? !0 : X.value || J.value;
    }), se = Te({
      show: E(() => {
        if (!(!o.isDay && !o.isDays && !o.isWeek) && !(!v.value || !w.time || t.allDay) && !(w.timeFrom > _.dateToMinutes(o.now)) && !(_.dateToMinutes(o.now) > w.timeTo))
          return !0;
      }),
      nowInMinutes: E(() => _.dateToMinutes(o.now)),
      todaysTimePosition: E(() => Oe(se.nowInMinutes, w)),
      style: E(() => `top: ${se.todaysTimePosition}%`),
      currentTime: E(() => _.formatTime(o.now))
    }), de = E(() => {
      if (ae.value) return {};
      const r = { ...w.eventListeners.cell };
      for (const [M, B] of Object.entries(r))
        r[M] = (q) => {
          var re, we, g;
          (g = (we = q.target || ((re = q.e) == null ? void 0 : re.target)).closest) != null && g.call(we, ".vuecal__event") || B(q.type ? { e: q, cell: Z.value, cursor: ee.value } : q);
        };
      const Y = { ...r };
      let j = null;
      return r.click = (M) => {
        var q;
        oe();
        const B = he(M);
        (q = Y.click) == null || q.call(Y, { e: M, cell: Z.value, cursor: B }), j ? j = clearTimeout(j) : j = setTimeout(() => {
          var re;
          j = null, (re = Y["delayed-click"]) == null || re.call(Y, { e: M, cell: Z.value, cursor: B });
        }, 400);
      }, (w.time && o.isDay || o.isDays || o.isWeek) && (r.touchstart = (M) => {
        var B;
        n(M.e || M), (B = Y.touchstart) == null || B.call(Y, { e: M, cell: Z.value, cursor: ee.value });
      }, r.mousedown = (M) => {
        var B;
        n(M.e || M), (B = Y.mousedown) == null || B.call(Y, { e: M, cell: Z.value, cursor: ee.value });
      }), Y.dblclick && (r.dblclick = (M) => {
        var B;
        (B = Y.dblclick) == null || B.call(Y, { e: M, cell: Z.value, cursor: he(M) });
      }), w.editableEvents.drag && (r.dragenter = (M) => d.cellDragEnter(M, Z.value), r.dragover = (M) => {
        M.preventDefault(), d.cellDragOver(M, Z.value);
      }, r.dragleave = (M) => d.cellDragLeave(M, Z.value), r.drop = (M) => d.cellDragDrop(M, Z.value, t.allDay)), r;
    }), Z = E(() => ({
      start: t.start,
      end: t.end,
      events: m,
      ...s.schedule ? { schedule: s.schedule } : {},
      goNarrower: () => o.narrower(),
      goBroader: () => o.broader(),
      broader: o.broaderView,
      narrower: o.narrowerView
    })), he = (r) => {
      var q;
      const Y = (((q = r.touches) == null ? void 0 : q[0]) || r).clientY, { top: j } = c.value.getBoundingClientRect(), M = Ke(Y - j, c.value), B = new Date(t.start);
      return B.setMinutes(Le(M, w)), { y: M, date: B };
    }, ee = E(() => {
      const r = Le(s.movePercentageY || s.startPercentageY, w), Y = new Date(t.start);
      return Y.setMinutes(r), {
        x: s.movePercentageX || s.startPercentageX,
        y: s.movePercentageY || s.startPercentageY,
        date: Y
      };
    }), oe = () => {
      o.updateSelectedDate(t.start), w.clickToNavigate && ((o.isMonth || o.isDays || o.isWeek) && w.availableViews.day ? o.switch("day") : o.isYear && w.availableViews.month ? o.switch("month") : o.isYears && w.availableViews.year && o.switch("year")), o.updateViewDate(t.start);
    }, n = (r) => {
      var j, M;
      s.schedule = ~~r.target.dataset.schedule;
      const Y = c.value.getBoundingClientRect();
      s.startX = (((j = r.touches) == null ? void 0 : j[0]) || r).clientX - Y.left, s.startY = (((M = r.touches) == null ? void 0 : M[0]) || r).clientY - Y.top, s.startPercentageX = s.startX * 100 / Y.width, s.startPercentageY = s.startY * 100 / Y.height, s.thresholdPassed = !1, document.addEventListener(r.type === "touchstart" ? "touchmove" : "mousemove", $), document.addEventListener(r.type === "touchstart" ? "touchend" : "mouseup", D, { once: !0 }), s.holdTimer = setTimeout(() => {
        var B, q;
        s.holding = !0, (q = (B = de.value).hold) == null || q.call(B, { e: r, cell: Z.value, cursor: ee.value });
      }, 1e3);
    }, $ = (r) => {
      var j, M, B, q, re, we;
      s.dragging || (H.isDraggingCell = !0, (M = (j = de.value)["drag-start"]) == null || M.call(j, { e: r, cell: Z.value, cursor: ee.value })), s.dragging = !0, s.holdTimer = clearTimeout(s.holdTimer), s.holding = !1;
      const Y = c.value.getBoundingClientRect();
      s.moveX = (((B = r.touches) == null ? void 0 : B[0]) || r).clientX - Y.left, s.moveY = (((q = r.touches) == null ? void 0 : q[0]) || r).clientY - Y.top, s.movePercentageX = s.moveX * 100 / Y.width, s.movePercentageY = s.moveY * 100 / Y.height, w.eventCreateMinDrag && Math.abs(s.startY - s.moveY) > w.eventCreateMinDrag && (s.thresholdPassed = !0), (we = (re = de.value).drag) == null || we.call(re, { e: r, cell: Z.value, cursor: ee.value });
    }, D = async (r) => {
      var Y, j;
      document.removeEventListener(r.type === "touchend" ? "touchmove" : "mousemove", $, { passive: !1 }), s.dragging && ((j = (Y = de.value)["drag-end"]) == null || j.call(Y, { e: r, cell: Z.value, cursor: ee.value }), H.isDraggingCell = !1, w.editableEvents.create && (e.value = !0, await G(r), e.value = !1)), s.holdTimer = clearTimeout(s.holdTimer), s.holding = !1, s.dragging = !1, s.startX = 0, s.startY = 0, s.moveX = 0, s.moveY = 0, s.startPercentageX = 0, s.startPercentageY = 0, s.movePercentageX = 0, s.movePercentageY = 0, s.thresholdPassed = !1, s.schedule = null;
    }, G = async (r) => {
      if (!V.value) return;
      let { start: Y, end: j, startMinutes: M, endMinutes: B } = i.value;
      Y = new Date(t.start), Y.setMinutes(M), j = new Date(t.start), j.setMinutes(B);
      let q = { ...i.value, start: Y, end: j };
      const { create: re } = w.eventListeners.event;
      if (typeof re == "function") {
        const we = q;
        q = await new Promise((g) => re({ e: r, event: q, cell: Z.value, resolve: g, cursor: ee.value })), q && typeof q == "object" && o.createEvent(q), q && typeof q == "boolean" && o.createEvent(we);
      } else o.createEvent(q);
    }, K = () => {
      var r;
      for (const Y of Object.keys(de.value))
        (r = c.value) == null || r.removeEventListener(Y, de.value[Y]);
    }, De = () => {
      k.value = N.getCellOverlappingEvents(t.start, t.end);
    };
    return me(
      // Watch event IDs and start/end dates (only) to detect event resizing/dnd.
      () => !o.isYears && !o.isYear && h.value.map((r) => `${r._.id}${r.start.getTime()}${r.end.getTime()}`).join(),
      async () => {
        await Je(), De();
      },
      { immediate: !0, flush: "post" }
      // Use flush: 'post' to prevent infinite updates.
    ), Be(async () => {
      for (const r of y.value) N.deleteEvent(r, 3);
      K(), await Je();
    }), (r, Y) => (C(), L("div", le({
      class: ["vuecal__cell", F.value],
      ref_key: "cellEl",
      ref: c
    }, Re(de.value, !0)), [
      r.$slots.cell ? O(r.$slots, "cell", {
        key: 0,
        cell: Z.value
      }) : U("", !0),
      l.value ? (C(!0), L(ue, { key: 1 }, pe(l.value, (j, M) => (C(), L("div", {
        class: ye(["vuecal__special-hours", j.class]),
        style: _e(j.style),
        innerHTML: j.label || ""
      }, null, 14, xt))), 256)) : U("", !0),
      !r.$slots.cell && b(w).schedules ? (C(!0), L(ue, { key: 2 }, pe(b(w).schedules, (j) => (C(), L("div", {
        class: ye(["vuecal__schedule vuecal__schedule--cell", j.class]),
        key: j.id,
        style: _e(j.style || null),
        "data-schedule": j.id
      }, [
        r.$slots["cell-events"] ? O(r.$slots, "cell-events", {
          key: 0,
          cell: Z.value
        }) : U("", !0),
        A.value || r.$slots["cell-date"] ? (C(), L("div", ta, [
          O(r.$slots, "cell-date", { cell: Z.value }, () => [
            Ue(ce(A.value), 1)
          ])
        ])) : U("", !0),
        r.$slots["cell-content"] ? (C(), L("div", aa, [
          O(r.$slots, "cell-content", { cell: Z.value })
        ])) : U("", !0),
        r.$slots["cell-events"] && m.value.length ? (C(), L("div", na, [
          O(r.$slots, "cell-events", { cell: Z.value })
        ])) : m.value.length || P.value ? (C(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: Y[0] || (Y[0] = (M) => P.value = !0),
          onAfterLeave: a,
          tag: "div"
        }, {
          default: W(() => [
            (C(!0), L(ue, null, pe(z.value[j.id], (M) => (C(), Se(st, {
              key: M._.id,
              event: M,
              onEventDeleted: I,
              "in-all-day-bar": t.allDay,
              style: _e(f.value[M._.id])
            }, Ce({ _: 2 }, [
              r.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: W((B) => [
                  O(r.$slots, "event.all-day", le({ ref_for: !0 }, B))
                ]),
                key: "0"
              } : void 0,
              r.$slots[`event.${b(o).id}`] ? {
                name: `event.${b(o).id}`,
                fn: W((B) => [
                  O(r.$slots, `event.${b(o).id}`, le({ ref_for: !0 }, B))
                ]),
                key: "1"
              } : void 0,
              r.$slots.event ? {
                name: "event",
                fn: W((B) => [
                  O(r.$slots, "event", le({ ref_for: !0 }, B))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "style"]))), 128))
          ]),
          _: 2
        }, 1024)) : U("", !0),
        V.value && s.schedule === j.id && !t.allDay ? (C(), L("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: _e(i.value.style)
        }, ce(i.value.start) + " - " + ce(i.value.end), 5)) : U("", !0)
      ], 14, ea))), 128)) : U("", !0),
      !r.$slots.cell && !b(w).schedules ? (C(), L(ue, { key: 3 }, [
        r.$slots["cell-events"] ? O(r.$slots, "cell-events", {
          key: 0,
          cell: Z.value
        }) : U("", !0),
        A.value || r.$slots["cell-date"] ? (C(), L("div", sa, [
          O(r.$slots, "cell-date", { cell: Z.value }, () => [
            Ue(ce(A.value), 1)
          ])
        ])) : U("", !0),
        r.$slots["cell-content"] ? (C(), L("div", la, [
          O(r.$slots, "cell-content", { cell: Z.value })
        ])) : U("", !0),
        r.$slots["cell-events"] && m.value.length ? (C(), L("div", ra, [
          O(r.$slots, "cell-events", { cell: Z.value })
        ])) : !(b(o).isMonth && !b(w).eventsOnMonthView) && !b(o).isYear && !b(o).isYears && (m.value.length || P.value) ? (C(), Se(tt, {
          key: 4,
          class: "vuecal__cell-events",
          name: "vuecal-event-delete",
          onBeforeLeave: Y[1] || (Y[1] = (j) => P.value = !0),
          onAfterLeave: a,
          tag: "div"
        }, {
          default: W(() => [
            (C(!0), L(ue, null, pe(m.value, (j) => (C(), Se(st, {
              key: j._.id,
              event: j,
              onEventDeleted: I,
              "in-all-day-bar": t.allDay,
              class: ye(T.value[j._.id]),
              style: _e(f.value[j._.id])
            }, Ce({ _: 2 }, [
              r.$slots["event.all-day"] && t.allDay ? {
                name: "event.all-day",
                fn: W((M) => [
                  O(r.$slots, "event.all-day", le({ ref_for: !0 }, M))
                ]),
                key: "0"
              } : void 0,
              r.$slots[`event.${b(o).id}`] ? {
                name: `event.${b(o).id}`,
                fn: W((M) => [
                  O(r.$slots, `event.${b(o).id}`, le({ ref_for: !0 }, M))
                ]),
                key: "1"
              } : void 0,
              r.$slots.event ? {
                name: "event",
                fn: W((M) => [
                  O(r.$slots, "event", le({ ref_for: !0 }, M))
                ]),
                key: "2"
              } : void 0
            ]), 1032, ["event", "in-all-day-bar", "class", "style"]))), 128))
          ]),
          _: 3
        })) : U("", !0),
        V.value ? (C(), L("div", {
          key: 5,
          class: "vuecal__event-placeholder",
          style: _e(i.value.style)
        }, ce(i.value.start) + " - " + ce(i.value.end), 5)) : U("", !0)
      ], 64)) : U("", !0),
      r.$slots["event-count"] ? O(r.$slots, "event-count", {
        key: 4,
        events: h.value
      }) : S.value ? (C(), L("div", oa, ce(h.value.length), 1)) : U("", !0),
      se.show ? (C(), L("div", {
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
    const t = ze("vuecal"), u = ze("$vuecalEl"), { view: o, config: w, dateUtils: _ } = t, N = E(() => w.xs ? "day-xs" : w.sm || o.isDays || o.isMonth ? "day-sm" : "day"), d = E(() => (o.isDay || o.isDays || o.isWeek || o.isMonth) && !(o.isDay && !w.schedules && !w.allDayEvents)), H = E(() => o.cellDates.slice(0, o.cols).map(({ start: y }) => ({
      id: Xe[y.getDay()],
      date: y,
      dateNumber: y.getDate(),
      day: _.formatDate(y, "dddd"),
      "day-sm": _.formatDate(y, "ddd"),
      "day-xs": _.formatDate(y, "dd"),
      isToday: _.isToday(y)
    }))), v = {
      click: (y) => {
        (o.isDays || o.isWeek) && o.updateSelectedDate(y);
      }
    }, c = {
      isResizing: ie(!1),
      startY: ie(0),
      initialHeight: ie(0),
      defaultHeight: 25,
      // Default height in pixels.
      // Cleanup event listeners.
      cleanup() {
        typeof document < "u" && (document.removeEventListener("mousemove", c.handleMouseMove), document.removeEventListener("mouseup", c.cleanup), document.removeEventListener("touchmove", c.handleTouchMove, { passive: !1 }), document.removeEventListener("touchend", c.cleanup)), c.isResizing.value = !1;
      },
      startResize(y) {
        var I;
        this.isResizing.value = !0, this.startY.value = y;
        const P = (I = u.value) == null ? void 0 : I.querySelector(".vuecal__all-day");
        P && (this.initialHeight.value = P.offsetHeight), document.addEventListener("mousemove", c.handleMouseMove), document.addEventListener("mouseup", c.cleanup), document.addEventListener("touchmove", c.handleTouchMove, { passive: !1 }), document.addEventListener("touchend", c.cleanup);
      },
      // Update height based on mouse/touch movement.
      updateHeight(y) {
        var a;
        if (!this.isResizing.value) return;
        const P = y - this.startY.value, I = Math.max(20, this.initialHeight.value + P);
        (a = u.value) == null || a.style.setProperty("--vuecal-all-day-bar-height", `${I}px`);
      },
      // Mouse event handlers.
      handleMouseDown(y) {
        this.startResize(y.clientY);
      },
      handleMouseMove(y) {
        c.updateHeight(y.clientY);
      },
      // Touch event handlers.
      handleTouchStart(y) {
        var P;
        (P = y.touches) != null && P[0] && this.startResize(y.touches[0].clientY);
      },
      handleTouchMove(y) {
        var P;
        (P = y.touches) != null && P[0] && (c.updateHeight(y.touches[0].clientY), y.preventDefault());
      }
    };
    return Be(() => {
      c.cleanup();
    }), (y, P) => d.value ? (C(), L("div", ua, [
      b(o).isDay ? U("", !0) : (C(), L("div", ca, [
        (C(!0), L(ue, null, pe(H.value, (I, a) => (C(), L("div", {
          class: ye(["vuecal__weekday", { "vuecal__weekday--today": I.isToday }]),
          key: a,
          onClick: (s) => v.click(I.date)
        }, [
          O(y.$slots, "weekday-heading", {
            label: I[N.value],
            id: I.id,
            date: I.date
          }, () => [
            ve("span", va, ce(I[N.value]), 1),
            b(o).isMonth ? U("", !0) : (C(), L("strong", fa, ce(I.dateNumber), 1))
          ])
        ], 10, da))), 128))
      ])),
      b(w).schedules ? (C(), L("div", ma, [
        (C(!0), L(ue, null, pe(H.value, (I, a) => (C(), L(ue, { key: a }, [
          (C(!0), L(ue, null, pe(b(w).schedules, (s, e) => (C(), L(ue, { key: e }, [
            y.$slots["schedule-heading"] ? (C(), L("div", {
              key: 0,
              class: ye(["vuecal__schedule vuecal__schedule--heading", s.class])
            }, [
              O(y.$slots, "schedule-heading", {
                schedule: s,
                view: b(o)
              })
            ], 2)) : (C(), L("div", {
              key: 1,
              class: ye(["vuecal__schedule vuecal__schedule--heading", s.class]),
              innerHTML: s.label
            }, null, 10, ga))
          ], 64))), 128))
        ], 64))), 128))
      ])) : U("", !0),
      b(w).allDayEvents ? (C(), L("div", ya, [
        (C(!0), L(ue, null, pe(H.value, (I, a) => (C(), Se($t, {
          class: ye(["vuecal__all-day-cell", { "vuecal__weekday--today": I.isToday }]),
          key: a,
          start: I.date,
          end: new Date(I.date.getTime() + 24 * 60 * 60 * 1e3 - 1),
          index: a,
          "all-day": ""
        }, Ce({ _: 2 }, [
          y.$slots["event.all-day"] ? {
            name: "event.all-day",
            fn: W((s) => [
              O(y.$slots, "event.all-day", le({ ref_for: !0 }, s))
            ]),
            key: "0"
          } : {
            name: "event",
            fn: W((s) => [
              O(y.$slots, "event", le({ ref_for: !0 }, s))
            ]),
            key: "1"
          }
        ]), 1032, ["class", "start", "end", "index"]))), 128)),
        ve("div", {
          class: "vuecal__all-day-resizer",
          onMousedown: P[0] || (P[0] = (...I) => c.handleMouseDown && c.handleMouseDown(...I)),
          onTouchstart: P[1] || (P[1] = (...I) => c.handleTouchStart && c.handleTouchStart(...I))
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
    const t = ze("vuecal"), { config: u, texts: o } = t, w = E(() => {
      const _ = [];
      for (let d = u.timeFrom; d < u.timeTo; d += u.timeStep) {
        const H = d + u.timeStep > u.timeTo, v = ~~(d / 60), c = d % 60, y = o[d < 720 ? "am" : "pm"];
        let P = null;
        H && (P = `calc(var(--vuecal-time-cell-height) * ${(u.timeTo - d) / u.timeStep})`), _.push({
          minutesSum: d,
          // The sum of hours + minutes in minutes.
          hours: v,
          minutes: c,
          formatted12: `${v % 12 ? v % 12 : 12}${c ? `:${c.toString().padStart(2, 0)}` : ""}${y}`,
          formatted24: `${v.toString().padStart(2, 0)}:${c.toString().padStart(2, 0)}`,
          height: P
        });
      }
      return _;
    });
    return (_, N) => (C(), L("div", Da, [
      b(u).allDayEvents ? (C(), L("div", pa, [
        O(_.$slots, "all-day-label", {}, () => [
          Ue(ce(b(t).texts.allDay), 1)
        ])
      ])) : U("", !0),
      (C(!0), L(ue, null, pe(w.value, (d, H) => (C(), L("div", {
        class: "vuecal__time-cell",
        key: H,
        style: _e({ height: d.height || null })
      }, [
        O(_.$slots, "time-cell", {
          index: H,
          minutes: d.minutes,
          hours: d.hours,
          minutesSum: d.minutesSum,
          format12: d.formatted12,
          format24: d.formatted24
        }, () => [
          ve("label", null, ce(b(u).twelveHour ? d.formatted12 : d.formatted24), 1)
        ])
      ], 4))), 128))
    ]));
  }
}, ka = {
  __name: "body",
  setup(p) {
    const t = ze("vuecal"), { view: u, config: o, dateUtils: w } = t, _ = ie(null), N = ie(null), d = E(() => ({
      "--vuecal-grid-columns": u.cols,
      "--vuecal-grid-rows": u.rows
    })), H = E(() => {
      const y = w.formatTime(Le(N.value, o));
      return {
        style: { top: `${N.value}%` },
        time: y
      };
    }), v = (y) => {
      var a;
      if (u.isMonth || u.isYear || u.isYears) return;
      const P = (((a = y.touches) == null ? void 0 : a[0]) || y).clientY, { top: I } = _.value.getBoundingClientRect();
      N.value = Ke(P - I, _.value);
    }, c = () => {
      N.value = null;
    };
    return Ze(() => {
      _.value.addEventListener("mousemove", v), _.value.addEventListener("touchmove", v), _.value.addEventListener("mouseleave", c), _.value.addEventListener("touchend", c);
    }), Be(() => {
      _.value && (_.value.removeEventListener("mousemove", v), _.value.removeEventListener("touchmove", v), _.value.removeEventListener("mouseleave", c), _.value.removeEventListener("touchend", c));
    }), (y, P) => (C(), L("div", {
      class: "vuecal__body",
      ref_key: "bodyEl",
      ref: _,
      style: _e(d.value)
    }, [
      je(Ge, { name: "vuecal-shrink" }, {
        default: W(() => [
          b(o).timeAtCursor && N.value !== null ? (C(), L("div", {
            key: 0,
            class: "vuecal__time-at-cursor",
            style: _e(H.value.style)
          }, [
            ve("label", null, ce(H.value.time), 1)
          ], 4)) : U("", !0)
        ]),
        _: 1
      }),
      (C(!0), L(ue, null, pe(b(u).cellDates, (I, a) => (C(), Se($t, {
        key: a,
        start: I.start,
        end: I.end,
        index: a
      }, Ce({ _: 2 }, [
        y.$slots.cell ? {
          name: "cell",
          fn: W((s) => [
            O(y.$slots, "cell", le({ ref_for: !0 }, s))
          ]),
          key: "0"
        } : void 0,
        y.$slots["cell-date"] ? {
          name: "cell-date",
          fn: W((s) => [
            O(y.$slots, "cell-date", le({ ref_for: !0 }, s))
          ]),
          key: "1"
        } : void 0,
        y.$slots["cell-content"] ? {
          name: "cell-content",
          fn: W((s) => [
            O(y.$slots, "cell-content", le({ ref_for: !0 }, s))
          ]),
          key: "2"
        } : void 0,
        y.$slots["cell-events"] ? {
          name: "cell-events",
          fn: W((s) => [
            O(y.$slots, "cell-events", le({ ref_for: !0 }, s))
          ]),
          key: "3"
        } : void 0,
        y.$slots[`event.${b(u).id}`] ? {
          name: `event.${b(u).id}`,
          fn: W((s) => [
            O(y.$slots, `event.${b(u).id}`, le({ ref_for: !0 }, s))
          ]),
          key: "4"
        } : void 0,
        y.$slots["event.all-day"] ? {
          name: "event.all-day",
          fn: W((s) => [
            O(y.$slots, "event.all-day", le({ ref_for: !0 }, s))
          ]),
          key: "5"
        } : void 0,
        y.$slots.event ? {
          name: "event",
          fn: W((s) => [
            O(y.$slots, "event", le({ ref_for: !0 }, s))
          ]),
          key: "6"
        } : void 0,
        y.$slots["event-count"] ? {
          name: "event-count",
          fn: W((s) => [
            O(y.$slots, "event-count", le({ ref_for: !0 }, s))
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
  setup(p, { expose: t, emit: u }) {
    const o = p, w = u, _ = Tt("vuecal-el"), N = zt({ props: o, emit: w, attrs: Yt(), vuecalEl: _, uid: Mt() }), { config: d, view: H, dateUtils: v, touch: c } = N, y = E(() => d.time && (H.isDay || H.isDays || H.isWeek)), P = E(() => Array(H.rows).fill().map((e, k) => v.getWeek(v.addDays(H.firstCellDate, 7 * k)))), I = E(() => {
      var e;
      return {
        "vuecal--ready": d.ready,
        [`vuecal--${d.theme}-theme`]: d.theme,
        [`vuecal--${d.size}`]: !0,
        "vuecal--date-picker": d.datePicker,
        "vuecal--dark": d.dark,
        "vuecal--light": !d.dark,
        [`vuecal--${H.id}-view`]: !0,
        "vuecal--view-has-time": y.value,
        "vuecal--timeless": !d.time,
        "vuecal--dragging-cell": c.isDraggingCell,
        "vuecal--dragging-event": c.isDraggingEvent,
        "vuecal--resizing-event": c.isResizingEvent,
        "vuecal--has-schedules": (e = d.schedules) == null ? void 0 : e.length
      };
    }), a = E(() => ({
      "--vuecal-time-cell-height": d.timeCellHeight && `${d.timeCellHeight}px`
    })), s = E(() => {
      var e, k;
      return {
        "vuecal__scrollable--row": y.value || d.weekNumbers && H.isMonth,
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
    }), at("vuecal", N), at("$vuecalEl", _), t({ view: N.view }), (e, k) => (C(), L("div", {
      class: ye(["vuecal", I.value]),
      ref: "vuecal-el",
      "data-locale": e.locale,
      style: _e(a.value)
    }, [
      e.$slots.diy ? O(e.$slots, "diy", {
        key: 0,
        vuecal: b(N)
      }) : (C(), L(ue, { key: 1 }, [
        je(Rt, null, Ce({ _: 2 }, [
          e.$slots.header ? {
            name: "header",
            fn: W((i) => [
              O(e.$slots, "header", te(ne(i)))
            ]),
            key: "0"
          } : void 0,
          !e.$slots.header && e.$slots["previous-button"] ? {
            name: "previous-button",
            fn: W((i) => [
              O(e.$slots, "previous-button", te(ne(i)))
            ]),
            key: "1"
          } : void 0,
          !e.$slots.header && e.$slots["next-button"] ? {
            name: "next-button",
            fn: W((i) => [
              O(e.$slots, "next-button", te(ne(i)))
            ]),
            key: "2"
          } : void 0,
          !e.$slots.header && e.$slots["today-button"] ? {
            name: "today-button",
            fn: W((i) => [
              O(e.$slots, "today-button", te(ne(i)))
            ]),
            key: "3"
          } : void 0,
          !e.$slots.header && e.$slots.title ? {
            name: "title",
            fn: W((i) => [
              O(e.$slots, "title", te(ne(i)))
            ]),
            key: "4"
          } : void 0,
          !e.$slots.header && e.$slots["title.day"] ? {
            name: "title.day",
            fn: W((i) => [
              O(e.$slots, "title.day", te(ne(i)))
            ]),
            key: "5"
          } : void 0,
          !e.$slots.header && e.$slots["title.days"] ? {
            name: "title.days",
            fn: W((i) => [
              O(e.$slots, "title.days", te(ne(i)))
            ]),
            key: "6"
          } : void 0,
          !e.$slots.header && e.$slots["title.week"] ? {
            name: "title.week",
            fn: W((i) => [
              O(e.$slots, "title.week", te(ne(i)))
            ]),
            key: "7"
          } : void 0,
          !e.$slots.header && e.$slots["title.month"] ? {
            name: "title.month",
            fn: W((i) => [
              O(e.$slots, "title.month", te(ne(i)))
            ]),
            key: "8"
          } : void 0,
          !e.$slots.header && e.$slots["title.year"] ? {
            name: "title.year",
            fn: W((i) => [
              O(e.$slots, "title.year", te(ne(i)))
            ]),
            key: "9"
          } : void 0,
          !e.$slots.header && e.$slots["title.years"] ? {
            name: "title.years",
            fn: W((i) => [
              O(e.$slots, "title.years", te(ne(i)))
            ]),
            key: "10"
          } : void 0,
          !e.$slots.header && e.$slots["schedule-heading"] ? {
            name: "schedule-heading",
            fn: W((i) => [
              O(e.$slots, "schedule-heading", te(ne(i)))
            ]),
            key: "11"
          } : void 0
        ]), 1024),
        ve("div", _a, [
          je(Ge, {
            name: `vuecal-slide-fade--${b(H).transitionDirection}`
          }, {
            default: W(() => [
              (C(), L("div", {
                class: ye(["vuecal__scrollable", s.value]),
                key: b(H).id + b(H).start.getTime()
              }, [
                y.value ? (C(), Se(wa, { key: 0 }, Ce({ _: 2 }, [
                  e.$slots["time-cell"] ? {
                    name: "time-cell",
                    fn: W((i) => [
                      O(e.$slots, "time-cell", te(ne(i)))
                    ]),
                    key: "0"
                  } : void 0
                ]), 1024)) : U("", !0),
                b(d).weekNumbers && b(H).isMonth ? (C(), L("div", ba, [
                  (C(!0), L(ue, null, pe(P.value, (i) => (C(), L("div", Ta, [
                    O(e.$slots, "week-number", {}, () => [
                      ve("small", null, ce(i), 1)
                    ])
                  ]))), 256))
                ])) : U("", !0),
                ve("div", Ma, [
                  je(ha, null, Ce({ _: 2 }, [
                    e.$slots["weekday-heading"] ? {
                      name: "weekday-heading",
                      fn: W((i) => [
                        O(e.$slots, "weekday-heading", te(ne(i)))
                      ]),
                      key: "0"
                    } : void 0,
                    e.$slots["schedule-heading"] ? {
                      name: "schedule-heading",
                      fn: W((i) => [
                        O(e.$slots, "schedule-heading", te(ne(i)))
                      ]),
                      key: "1"
                    } : void 0,
                    e.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: W((i) => [
                        O(e.$slots, "event.all-day", te(ne(i)))
                      ]),
                      key: "2"
                    } : void 0,
                    e.$slots.event ? {
                      name: "event",
                      fn: W((i) => [
                        O(e.$slots, "event", te(ne(i)))
                      ]),
                      key: "3"
                    } : void 0
                  ]), 1024),
                  je(ka, null, Ce({ _: 2 }, [
                    e.$slots.cell ? {
                      name: "cell",
                      fn: W((i) => [
                        O(e.$slots, "cell", te(ne(i)))
                      ]),
                      key: "0"
                    } : void 0,
                    !e.$slots.cell && e.$slots["cell-date"] ? {
                      name: "cell-date",
                      fn: W((i) => [
                        O(e.$slots, "cell-date", te(ne(i)))
                      ]),
                      key: "1"
                    } : void 0,
                    !e.$slots.cell && e.$slots["cell-content"] ? {
                      name: "cell-content",
                      fn: W((i) => [
                        O(e.$slots, "cell-content", te(ne(i)))
                      ]),
                      key: "2"
                    } : void 0,
                    !e.$slots.cell && e.$slots["cell-events"] ? {
                      name: "cell-events",
                      fn: W((i) => [
                        O(e.$slots, "cell-events", te(ne(i)))
                      ]),
                      key: "3"
                    } : void 0,
                    !e.$slots.cell && !e.$slots["cell-events"] && e.$slots["event.all-day"] ? {
                      name: "event.all-day",
                      fn: W((i) => [
                        O(e.$slots, "event.all-day", te(ne(i)))
                      ]),
                      key: "4"
                    } : void 0,
                    !e.$slots.cell && !e.$slots["cell-events"] && e.$slots[`event.${b(H).id}`] ? {
                      name: `event.${b(H).id}`,
                      fn: W((i) => [
                        O(e.$slots, `event.${b(H).id}`, te(ne(i)))
                      ]),
                      key: "5"
                    } : void 0,
                    !e.$slots.cell && !e.$slots["cell-events"] && e.$slots.event ? {
                      name: "event",
                      fn: W((i) => [
                        O(e.$slots, "event", te(ne(i)))
                      ]),
                      key: "6"
                    } : void 0,
                    !e.$slots.cell && e.$slots["event-count"] ? {
                      name: "event-count",
                      fn: W((i) => [
                        O(e.$slots, "event-count", te(ne(i)))
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
