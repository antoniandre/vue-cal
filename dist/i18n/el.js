/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή"], n = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"], o = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"], s = "Έτη", e = "Έτος", c = "Μήνας", a = "Εβδομάδα", d = "Ημέρες", y = "Ημέρα", m = "Σήμερα", l = "Κανένα συμβάν", r = "Ημερήσιο συμβάν", v = "Διαγραφή", M = "Δημιουργία συμβάντος", Y = "dddd D MMMMG YYYY", h = "π.μ.", D = "μ.μ.", E = {
  weekDays: t,
  months: n,
  monthsGenitive: o,
  years: s,
  year: e,
  month: c,
  week: a,
  days: d,
  day: y,
  today: m,
  noEvent: l,
  allDay: r,
  deleteEvent: v,
  createEvent: M,
  dateFormat: Y,
  am: h,
  pm: D
};
export {
  r as allDay,
  h as am,
  M as createEvent,
  Y as dateFormat,
  y as day,
  d as days,
  E as default,
  v as deleteEvent,
  c as month,
  n as months,
  o as monthsGenitive,
  l as noEvent,
  D as pm,
  m as today,
  a as week,
  t as weekDays,
  e as year,
  s as years
};
