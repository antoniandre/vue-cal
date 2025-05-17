/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"], a = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"], n = "Yıllar", s = "Yıl", e = "Ay", o = "Hafta", c = "Günler", l = "Gün", r = "Bugün", m = "Etkinlik Yok", k = "Tüm gün", d = "Sil", i = "Etkinlik ekle", y = "dddd D MMMM YYYY", u = {
  weekDays: t,
  months: a,
  years: n,
  year: s,
  month: e,
  week: o,
  days: c,
  day: l,
  today: r,
  noEvent: m,
  allDay: k,
  deleteEvent: d,
  createEvent: i,
  dateFormat: y
};
export {
  k as allDay,
  i as createEvent,
  y as dateFormat,
  l as day,
  c as days,
  u as default,
  d as deleteEvent,
  e as month,
  a as months,
  m as noEvent,
  r as today,
  o as week,
  t as weekDays,
  s as year,
  n as years
};
