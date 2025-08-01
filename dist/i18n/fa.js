/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["دوشنبه", "سه شنبه", "چهار شنبه", "پنج شنبه", "جمعه", "شنبه", "یک شنبه"], n = ["د", "س", "چ", "پ", "ج", "ش", "ی"], o = ["ژانویه", "فوریه", "مارس", "آوریل", "می", "ژوئن", "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"], s = "سالها", h = "سال", m = "ماه", e = "هفته", a = "روزها", v = "روز", c = "امروز", d = "رویدادی نیست", y = "تمام روز", D = "حذف", r = "ایجاد یک رویداد", l = "dddd D MMMM YYYY", E = !1, M = {
  weekDays: t,
  weekDaysShort: n,
  months: o,
  years: s,
  year: "سال",
  month: "ماه",
  week: e,
  days: a,
  day: "روز",
  today: c,
  noEvent: d,
  allDay: y,
  deleteEvent: "حذف",
  createEvent: r,
  dateFormat: l,
  truncations: !1
};
export {
  y as allDay,
  r as createEvent,
  l as dateFormat,
  v as day,
  a as days,
  M as default,
  D as deleteEvent,
  m as month,
  o as months,
  d as noEvent,
  c as today,
  E as truncations,
  e as week,
  t as weekDays,
  n as weekDaysShort,
  h as year,
  s as years
};
