/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota", "Nedeľa"], t = ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"], o = "Roky", n = "Rok", s = "Mesiac", a = "Týždeň", c = "Dni", r = "Deň", d = "Dnes", k = "Bez udalosti", l = "Celý deň", y = "Odstrániť", u = "Vytvoriť udalosť", D = "dddd D. MMMM YYYY", M = {
  weekDays: e,
  months: t,
  years: o,
  year: n,
  month: s,
  week: a,
  days: c,
  day: r,
  today: d,
  noEvent: k,
  allDay: l,
  deleteEvent: y,
  createEvent: u,
  dateFormat: D
};
export {
  l as allDay,
  u as createEvent,
  D as dateFormat,
  r as day,
  c as days,
  M as default,
  y as deleteEvent,
  s as month,
  t as months,
  k as noEvent,
  d as today,
  a as week,
  e as weekDays,
  n as year,
  o as years
};
