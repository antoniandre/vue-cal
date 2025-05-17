/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"], n = ["一", "二", "三", "四", "五", "六", "日"], o = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], s = "年", e = "本年", c = "月", a = "周", d = "多日", y = "日", r = "今日", h = "暂无活动", l = "整天", D = "删除", M = "新建活动", Y = "YYYY MMMM D dddd", k = {
  weekDays: t,
  weekDaysShort: n,
  months: o,
  years: s,
  year: e,
  month: c,
  week: a,
  days: d,
  day: y,
  today: r,
  noEvent: h,
  allDay: l,
  deleteEvent: D,
  createEvent: M,
  dateFormat: Y
};
export {
  l as allDay,
  M as createEvent,
  Y as dateFormat,
  y as day,
  d as days,
  k as default,
  D as deleteEvent,
  c as month,
  o as months,
  h as noEvent,
  r as today,
  a as week,
  t as weekDays,
  n as weekDaysShort,
  e as year,
  s as years
};
