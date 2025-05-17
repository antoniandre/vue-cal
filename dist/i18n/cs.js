/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"], t = ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"], n = "Roky", o = "Rok", s = "Měsíc", c = "Týden", d = "Dny", a = "Den", r = "Dnes", y = "Bez událostí", l = "Celý den", v = "Odstranit", D = "Vytvořit událost", k = "dddd D. MMMM YYYY", M = {
  weekDays: e,
  months: t,
  years: n,
  year: o,
  month: s,
  week: c,
  days: d,
  day: a,
  today: r,
  noEvent: y,
  allDay: l,
  deleteEvent: v,
  createEvent: D,
  dateFormat: k
};
export {
  l as allDay,
  D as createEvent,
  k as dateFormat,
  a as day,
  d as days,
  M as default,
  v as deleteEvent,
  s as month,
  t as months,
  y as noEvent,
  r as today,
  c as week,
  e as weekDays,
  o as year,
  n as years
};
