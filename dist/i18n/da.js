/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"], t = ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"], a = "År (flertal)", y = "År", n = "Måned", M = "Uge", s = "Dage", u = "Dag", o = "I dag", d = "Ingen begivenhed", r = "Hele dagen", c = "Slet", g = "Opret et event", l = "dddd D MMMM YYYY", b = {
  weekDays: e,
  months: t,
  years: a,
  year: "År",
  month: n,
  week: "Uge",
  days: s,
  day: "Dag",
  today: o,
  noEvent: d,
  allDay: r,
  deleteEvent: c,
  createEvent: g,
  dateFormat: l
};
export {
  r as allDay,
  g as createEvent,
  l as dateFormat,
  u as day,
  s as days,
  b as default,
  c as deleteEvent,
  n as month,
  t as months,
  d as noEvent,
  o as today,
  M as week,
  e as weekDays,
  y as year,
  a as years
};
