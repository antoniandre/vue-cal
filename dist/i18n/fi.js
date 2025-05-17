/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"], a = ["Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"], u = "Vuodet", o = "Vuosi", n = "Kuukausi", s = "Viikko", i = "Päivät", e = "Päivä", k = "Tänään", c = "Ei tapahtumia", d = "Koko päivä", m = "Poista tapahtuma", r = "Luo tapahtuma", y = "dddd, D MMMM YYYY", l = {
  weekDays: t,
  months: a,
  years: u,
  year: o,
  month: n,
  week: s,
  days: i,
  day: e,
  today: k,
  noEvent: c,
  allDay: d,
  deleteEvent: m,
  createEvent: r,
  dateFormat: y
};
export {
  d as allDay,
  r as createEvent,
  y as dateFormat,
  e as day,
  i as days,
  l as default,
  m as deleteEvent,
  n as month,
  a as months,
  c as noEvent,
  k as today,
  s as week,
  t as weekDays,
  o as year,
  u as years
};
