/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev", "Pühapäev"], t = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"], s = "Aastad", a = "Aasta", l = "Kuu", o = "Nädal", n = "Päeva", u = "Päev", c = "Täna", d = "Sündmus puudub", r = "Terve päev", v = "Kustuta", m = "Loo sündmus", p = "dddd D MMMM YYYY", y = {
  weekDays: e,
  months: t,
  years: s,
  year: a,
  month: "Kuu",
  week: o,
  days: n,
  day: u,
  today: c,
  noEvent: d,
  allDay: r,
  deleteEvent: v,
  createEvent: m,
  dateFormat: p
};
export {
  r as allDay,
  m as createEvent,
  p as dateFormat,
  u as day,
  n as days,
  y as default,
  v as deleteEvent,
  l as month,
  t as months,
  d as noEvent,
  c as today,
  o as week,
  e as weekDays,
  a as year,
  s as years
};
