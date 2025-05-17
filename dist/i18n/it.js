/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"], o = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], t = "Anni", n = "Anno", a = "Mese", s = "Settimana", c = "Giorni", r = "Giorno", i = "Oggi", d = "Nessun evento", l = "Tutto il giorno", M = "Cancella", g = "Crea evento", m = "dddd D MMMM YYYY", b = {
  weekDays: e,
  months: o,
  years: t,
  year: n,
  month: a,
  week: s,
  days: c,
  day: r,
  today: i,
  noEvent: d,
  allDay: l,
  deleteEvent: M,
  createEvent: g,
  dateFormat: m
};
export {
  l as allDay,
  g as createEvent,
  m as dateFormat,
  r as day,
  c as days,
  b as default,
  M as deleteEvent,
  a as month,
  o as months,
  d as noEvent,
  i as today,
  s as week,
  e as weekDays,
  n as year,
  t as years
};
