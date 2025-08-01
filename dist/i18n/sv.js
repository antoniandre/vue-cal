/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const a = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"], e = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"], l = "År", M = "År", n = "Månad", t = "Vecka", s = "Dagar", i = "Dag", o = "Idag", d = "Ingen händelse", r = "Heldag", c = "Ta bort", g = "Skapa händelse", y = "dddd den D MMMM YYYY", u = {
  weekDays: a,
  months: e,
  years: "År",
  year: "År",
  month: n,
  week: t,
  days: s,
  day: "Dag",
  today: o,
  noEvent: d,
  allDay: r,
  deleteEvent: c,
  createEvent: g,
  dateFormat: y
};
export {
  r as allDay,
  g as createEvent,
  y as dateFormat,
  i as day,
  s as days,
  u as default,
  c as deleteEvent,
  n as month,
  e as months,
  d as noEvent,
  o as today,
  t as week,
  a as weekDays,
  M as year,
  l as years
};
