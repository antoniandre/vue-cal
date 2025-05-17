/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"], n = ["ن", "ث", "ر", "خ", "ج", "س", "ح"], o = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", " ديسمبر"], s = "سنوات", c = "سنة", e = "شهر", a = "أسبوع", d = "أيام", r = "يوم", y = "اليوم", l = "لا حدث", D = "طوال اليوم", M = "حذف", Y = "إنشاء حدث", h = "dddd D MMMM YYYY", k = !1, m = {
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
  dateFormat: h,
  truncations: !1
};
export {
  D as allDay,
  Y as createEvent,
  h as dateFormat,
  r as day,
  d as days,
  m as default,
  M as deleteEvent,
  e as month,
  o as months,
  l as noEvent,
  y as today,
  k as truncations,
  a as week,
  t as weekDays,
  n as weekDaysShort,
  c as year,
  s as years
};
