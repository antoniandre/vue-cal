/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"], t = ["Dl", "Dt", "Dc", "Dj", "Dv", "Ds", "Dg"], s = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], n = "Anys", o = "Any", a = "Mes", c = "Setmana", r = "Dies", D = "Dia", i = "Avui", d = "No hi ha esdeveniments", m = "Tot el dia", l = "Eliminar", y = "Crear un esdeveniment", u = "dddd D MMMM YYYY", v = {
  weekDays: e,
  weekDaysShort: t,
  months: s,
  years: n,
  year: o,
  month: a,
  week: c,
  days: r,
  day: D,
  today: i,
  noEvent: d,
  allDay: m,
  deleteEvent: l,
  createEvent: y,
  dateFormat: u
};
export {
  m as allDay,
  y as createEvent,
  u as dateFormat,
  D as day,
  r as days,
  v as default,
  l as deleteEvent,
  a as month,
  s as months,
  d as noEvent,
  i as today,
  c as week,
  e as weekDays,
  t as weekDaysShort,
  o as year,
  n as years
};
