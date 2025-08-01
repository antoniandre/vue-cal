/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"], t = ["Dl", "Dt", "Dc", "Dj", "Dv", "Ds", "Dg"], s = ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"], n = "Anys", y = "Any", l = "Mes", o = "Setmana", a = "Dies", u = "Dia", r = "Avui", c = "No hi ha esdeveniments", D = "Tot el dia", i = "Eliminar", d = "Crear un esdeveniment", m = "dddd D MMMM YYYY", v = {
  weekDays: e,
  weekDaysShort: t,
  months: s,
  years: n,
  year: "Any",
  month: "Mes",
  week: o,
  days: a,
  day: "Dia",
  today: r,
  noEvent: c,
  allDay: D,
  deleteEvent: i,
  createEvent: d,
  dateFormat: m
};
export {
  D as allDay,
  d as createEvent,
  m as dateFormat,
  u as day,
  a as days,
  v as default,
  i as deleteEvent,
  l as month,
  s as months,
  c as noEvent,
  r as today,
  o as week,
  e as weekDays,
  t as weekDaysShort,
  y as year,
  n as years
};
