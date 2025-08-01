/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const a = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"], e = ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"], t = "Godine", n = "Godina", o = "Mjesec", s = "Sedmica", d = "Dana", m = "Dan", r = "Danas", c = "Nema događaja", j = "Cijeli dan", i = "Obriši", l = "Kreiraj događaj", b = "dddd D MMMM YYYY", y = {
  weekDays: a,
  months: e,
  years: t,
  year: n,
  month: o,
  week: s,
  days: d,
  day: "Dan",
  today: r,
  noEvent: c,
  allDay: j,
  deleteEvent: i,
  createEvent: l,
  dateFormat: b
};
export {
  j as allDay,
  l as createEvent,
  b as dateFormat,
  m as day,
  d as days,
  y as default,
  i as deleteEvent,
  o as month,
  e as months,
  c as noEvent,
  r as today,
  s as week,
  a as weekDays,
  n as year,
  t as years
};
