/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"], n = ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"], a = "Velg år", t = "År", s = "Måned", o = "Uke", d = "Dager", r = "Dag", c = "Idag", g = "Ingen hendelse", l = "Hele dagen", y = "Ta bort", M = "Ny hendelse", u = "dddd, D. MMMM YYYY", b = {
  weekDays: e,
  months: n,
  years: a,
  year: t,
  month: s,
  week: o,
  days: d,
  day: r,
  today: c,
  noEvent: g,
  allDay: l,
  deleteEvent: y,
  createEvent: M,
  dateFormat: u
};
export {
  l as allDay,
  M as createEvent,
  u as dateFormat,
  r as day,
  d as days,
  b as default,
  y as deleteEvent,
  s as month,
  n as months,
  g as noEvent,
  c as today,
  o as week,
  e as weekDays,
  t as year,
  a as years
};
