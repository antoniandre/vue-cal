/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev", "Pühapäev"], t = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"], s = "Aastad", a = "Aasta", o = "Kuu", n = "Nädal", u = "Päeva", c = "Päev", d = "Täna", r = "Sündmus puudub", v = "Terve päev", p = "Kustuta", l = "Loo sündmus", m = "dddd D MMMM YYYY", y = {
  weekDays: e,
  months: t,
  years: s,
  year: a,
  month: o,
  week: n,
  days: u,
  day: c,
  today: d,
  noEvent: r,
  allDay: v,
  deleteEvent: p,
  createEvent: l,
  dateFormat: m
};
export {
  v as allDay,
  l as createEvent,
  m as dateFormat,
  c as day,
  u as days,
  y as default,
  p as deleteEvent,
  o as month,
  t as months,
  r as noEvent,
  d as today,
  n as week,
  e as weekDays,
  a as year,
  s as years
};
