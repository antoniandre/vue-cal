/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["دوشنبه", "سه شنبه", "چهار شنبه", "پنج شنبه", "جمعه", "شنبه", "یک شنبه"], n = ["د", "س", "چ", "پ", "ج", "ش", "ی"], o = ["ژانویه", "فوریه", "مارس", "آوریل", "می", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"], s = "سالها", c = "سال", e = "ماه", a = "هفته", d = "روزها", r = "روز", y = "امروز", l = "رویدادی نیست", D = "تمام روز", M = "حذف", Y = "ایجاد یک رویداد", f = "dddd D MMMM YYYY", h = !1, k = {
  weekDays: t,
  weekDaysShort: n,
  months: o,
  years: s,
  year: c,
  month: e,
  week: a,
  days: d,
  day: r,
  today: y,
  noEvent: l,
  allDay: D,
  deleteEvent: M,
  createEvent: Y,
  dateFormat: f,
  truncations: !1
};
export {
  D as allDay,
  Y as createEvent,
  f as dateFormat,
  r as day,
  d as days,
  k as default,
  M as deleteEvent,
  e as month,
  o as months,
  l as noEvent,
  y as today,
  h as truncations,
  a as week,
  t as weekDays,
  n as weekDaysShort,
  c as year,
  s as years
};
