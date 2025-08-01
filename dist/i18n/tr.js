/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"], a = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"], e = "Yıllar", d = "Yıl", y = "Ay", n = "Hafta", s = "Günler", k = "Gün", o = "Bugün", c = "Etkinlik Yok", l = "Tüm gün", i = "Sil", r = "Etkinlik ekle", m = "dddd D MMMM YYYY", E = {
  weekDays: t,
  months: a,
  years: e,
  year: "Yıl",
  month: "Ay",
  week: n,
  days: s,
  day: "Gün",
  today: o,
  noEvent: c,
  allDay: l,
  deleteEvent: "Sil",
  createEvent: r,
  dateFormat: m
};
export {
  l as allDay,
  r as createEvent,
  m as dateFormat,
  k as day,
  s as days,
  E as default,
  i as deleteEvent,
  y as month,
  a as months,
  c as noEvent,
  o as today,
  n as week,
  t as weekDays,
  d as year,
  e as years
};
