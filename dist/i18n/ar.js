/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"], n = ["ن", "ث", "ر", "خ", "ج", "س", "ح"], o = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", " ديسمبر"], s = "سنوات", h = "سنة", m = "شهر", e = "أسبوع", a = "أيام", v = "يوم", c = "اليوم", d = "لا حدث", r = "طوال اليوم", D = "حذف", y = "إنشاء حدث", l = "dddd D MMMM YYYY", E = !1, M = {
  weekDays: t,
  weekDaysShort: n,
  months: o,
  years: s,
  year: "سنة",
  month: "شهر",
  week: e,
  days: a,
  day: "يوم",
  today: c,
  noEvent: d,
  allDay: r,
  deleteEvent: "حذف",
  createEvent: y,
  dateFormat: l,
  truncations: !1
};
export {
  r as allDay,
  y as createEvent,
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
