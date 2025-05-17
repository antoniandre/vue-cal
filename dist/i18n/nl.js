/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const a = ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"], e = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"], n = "Jaren", t = "Jaar", o = "Maand", s = "Week", r = "Dagen", d = "Dag", c = "Vandaag", g = "Geen afspraken", i = "Hele dag", u = "Verwijderen", l = "Nieuwe afspraak aanmaken", D = "dddd D MMMM YYYY", M = {
  weekDays: a,
  months: e,
  years: n,
  year: t,
  month: o,
  week: s,
  days: r,
  day: d,
  today: c,
  noEvent: g,
  allDay: i,
  deleteEvent: u,
  createEvent: l,
  dateFormat: D
};
export {
  i as allDay,
  l as createEvent,
  D as dateFormat,
  d as day,
  r as days,
  M as default,
  u as deleteEvent,
  o as month,
  e as months,
  g as noEvent,
  c as today,
  s as week,
  a as weekDays,
  t as year,
  n as years
};
