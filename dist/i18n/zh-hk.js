/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"], o = ["一", "二", "三", "四", "五", "六", "日"], n = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], s = "年", e = "本年", c = "月", a = "周", d = "多日", y = "日", r = "今日", h = "暫無活動", k = "整天", l = "刪除", D = "新建活動", M = "YYYY MMMM D dddd", Y = {
  weekDays: t,
  weekDaysShort: o,
  months: n,
  years: s,
  year: e,
  month: c,
  week: a,
  days: d,
  day: y,
  today: r,
  noEvent: h,
  allDay: k,
  deleteEvent: l,
  createEvent: D,
  dateFormat: M
};
export {
  k as allDay,
  D as createEvent,
  M as dateFormat,
  y as day,
  d as days,
  Y as default,
  l as deleteEvent,
  c as month,
  n as months,
  h as noEvent,
  r as today,
  a as week,
  t as weekDays,
  o as weekDaysShort,
  e as year,
  s as years
};
