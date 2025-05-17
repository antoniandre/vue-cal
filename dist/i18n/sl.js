/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota", "Nedelja"], t = ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"], o = "Leta", n = "Leto", a = "Mesec", s = "Teden", d = "Dni", c = "Dan", r = "Danes", l = "Ni dogodkov", k = "Cel dan", i = "Odstrani", v = "Ustvari dogodek", y = "dddd MMMM D, YYYY", D = {
  weekDays: e,
  months: t,
  years: o,
  year: n,
  month: a,
  week: s,
  days: d,
  day: c,
  today: r,
  noEvent: l,
  allDay: k,
  deleteEvent: i,
  createEvent: v,
  dateFormat: y
};
export {
  k as allDay,
  v as createEvent,
  y as dateFormat,
  c as day,
  d as days,
  D as default,
  i as deleteEvent,
  a as month,
  t as months,
  l as noEvent,
  r as today,
  s as week,
  e as weekDays,
  n as year,
  o as years
};
