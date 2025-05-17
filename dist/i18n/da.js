/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"], t = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], a = "År (flertal)", n = "År", s = "Måned", o = "Uge", d = "Dage", r = "Dag", c = "I dag", g = "Ingen begivenhed", l = "Hele dagen", M = "Slet", u = "Opret et event", y = "dddd D MMMM YYYY", b = {
  weekDays: e,
  months: t,
  years: a,
  year: n,
  month: s,
  week: o,
  days: d,
  day: r,
  today: c,
  noEvent: g,
  allDay: l,
  deleteEvent: M,
  createEvent: u,
  dateFormat: y
};
export {
  l as allDay,
  u as createEvent,
  y as dateFormat,
  r as day,
  d as days,
  b as default,
  M as deleteEvent,
  s as month,
  t as months,
  g as noEvent,
  c as today,
  o as week,
  e as weekDays,
  n as year,
  a as years
};
