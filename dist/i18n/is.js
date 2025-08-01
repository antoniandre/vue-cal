/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const a = ["Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur", "Sunnudagur"], t = ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"], y = "Ár", l = "Ár", n = "Mánuður", r = "Vika", e = "Dagar", s = "Dagur", u = "Í dag", o = "Enginn atburður", d = "Allan daginn", c = "Eyða", g = "Búðu til viðburð", i = "dddd D MMMM YYYY", M = {
  weekDays: a,
  months: t,
  years: "Ár",
  year: "Ár",
  month: n,
  week: r,
  days: e,
  day: s,
  today: u,
  noEvent: o,
  allDay: d,
  deleteEvent: c,
  createEvent: g,
  dateFormat: i
};
export {
  d as allDay,
  g as createEvent,
  i as dateFormat,
  s as day,
  e as days,
  M as default,
  c as deleteEvent,
  n as month,
  t as months,
  o as noEvent,
  u as today,
  r as week,
  a as weekDays,
  l as year,
  y as years
};
