/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const a = ["Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur", "Sunnudagur"], t = ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"], n = "Ár", r = "Ár", e = "Mánuður", s = "Vika", u = "Dagar", o = "Dagur", d = "Í dag", c = "Enginn atburður", g = "Allan daginn", i = "Eyða", l = "Búðu til viðburð", M = "dddd D MMMM YYYY", m = {
  weekDays: a,
  months: t,
  years: n,
  year: r,
  month: e,
  week: s,
  days: u,
  day: o,
  today: d,
  noEvent: c,
  allDay: g,
  deleteEvent: i,
  createEvent: l,
  dateFormat: M
};
export {
  g as allDay,
  l as createEvent,
  M as dateFormat,
  o as day,
  u as days,
  m as default,
  i as deleteEvent,
  e as month,
  t as months,
  c as noEvent,
  d as today,
  s as week,
  a as weekDays,
  r as year,
  n as years
};
