/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const a = ["Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota", "Nedjelja"], n = ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"], e = "Godine", t = "Godina", o = "Mjesec", s = "Tjedan", d = "Dani", j = "Dan", c = "Današnji dan", i = "Nema događaja", r = "Cijeli dan", l = "Obriši", k = "Kreiraj događaj", v = "dddd D MMMM YYYY", y = {
  weekDays: a,
  months: n,
  years: e,
  year: t,
  month: o,
  week: s,
  days: d,
  day: j,
  today: c,
  noEvent: i,
  allDay: r,
  deleteEvent: l,
  createEvent: k,
  dateFormat: v
};
export {
  r as allDay,
  k as createEvent,
  v as dateFormat,
  j as day,
  d as days,
  y as default,
  l as deleteEvent,
  o as month,
  n as months,
  i as noEvent,
  c as today,
  s as week,
  a as weekDays,
  t as year,
  e as years
};
