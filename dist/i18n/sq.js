/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["E Hënë", "E Martë", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë", "E Diel"], n = ["Hë", "Ma", "Mr", "Enj", "Pr", "Sh", "D"], e = ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"], o = "Vitet", s = "Viti", a = "Muaji", r = "Java", c = "Ditë", i = "Dita", E = "Sot", d = "Nuk ka event", h = "Tërë ditën", M = "Fshijë", D = "Krijo një event", j = "dddd D MMMM YYYY", k = {
  weekDays: t,
  weekDaysShort: n,
  months: e,
  years: o,
  year: s,
  month: a,
  week: r,
  days: c,
  day: i,
  today: E,
  noEvent: d,
  allDay: h,
  deleteEvent: M,
  createEvent: D,
  dateFormat: j
};
export {
  h as allDay,
  D as createEvent,
  j as dateFormat,
  i as day,
  c as days,
  k as default,
  M as deleteEvent,
  a as month,
  e as months,
  d as noEvent,
  E as today,
  r as week,
  t as weekDays,
  n as weekDaysShort,
  s as year,
  o as years
};
