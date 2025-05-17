/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const e = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"], t = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"], a = "Lata", o = "Rok", i = "Miesiąc", n = "Tydzień", s = "Dni", c = "Dzień", d = "Dzisiaj", r = "Brak wydarzeń", z = "Cały dzień", y = "Usuń", k = "Utwórz wydarzenie", w = "dddd, D MMMM YYYY", M = {
  weekDays: e,
  months: t,
  years: a,
  year: o,
  month: i,
  week: n,
  days: s,
  day: c,
  today: d,
  noEvent: r,
  allDay: z,
  deleteEvent: y,
  createEvent: k,
  dateFormat: w
};
export {
  z as allDay,
  k as createEvent,
  w as dateFormat,
  c as day,
  s as days,
  M as default,
  y as deleteEvent,
  i as month,
  t as months,
  r as noEvent,
  d as today,
  n as week,
  e as weekDays,
  o as year,
  a as years
};
