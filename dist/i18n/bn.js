/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি", "রবি"], n = ["জানুয়ারি", "ফেব্ুয়ারী", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "অগাস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"], o = "বছর", s = "বছর", e = "মাস", c = "সপ্তাহ", a = "দিন", d = "দিন", y = "আজ", r = "কার্যসূচী", l = "সারাদিন", M = "মুছুন", Y = "কার্যসূচী তৈরি করুন", m = "dddd D MMMM YYYY", v = {
  weekDays: t,
  months: n,
  years: o,
  year: s,
  month: e,
  week: c,
  days: a,
  day: d,
  today: y,
  noEvent: r,
  allDay: l,
  deleteEvent: M,
  createEvent: Y,
  dateFormat: m
};
export {
  l as allDay,
  Y as createEvent,
  m as dateFormat,
  d as day,
  a as days,
  v as default,
  M as deleteEvent,
  e as month,
  n as months,
  r as noEvent,
  y as today,
  c as week,
  t as weekDays,
  s as year,
  o as years
};
