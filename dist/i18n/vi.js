/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const n = ["Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy", "Chủ nhật"], t = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"], T = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"], h = "Năm", o = "Năm nay", s = "Tháng", e = "Tuần", a = "Vài ngày", c = "Ngày", g = "Hôm nay", y = "NKhông có Event", d = "Cả ngày", m = "Xóa", r = "Tạo event", v = "dddd MMMM D YYYY", N = {
  weekDays: n,
  weekDaysShort: t,
  months: T,
  years: h,
  year: o,
  month: s,
  week: e,
  days: a,
  day: c,
  today: g,
  noEvent: y,
  allDay: d,
  deleteEvent: m,
  createEvent: r,
  dateFormat: v
};
export {
  d as allDay,
  r as createEvent,
  v as dateFormat,
  c as day,
  a as days,
  N as default,
  m as deleteEvent,
  s as month,
  T as months,
  y as noEvent,
  g as today,
  e as week,
  n as weekDays,
  t as weekDaysShort,
  o as year,
  h as years
};
