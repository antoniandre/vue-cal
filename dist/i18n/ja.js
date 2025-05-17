/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["月", "火", "水", "木", "金", "土", "日"], n = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], o = "年", s = "今年", c = "月", e = "週", a = "日々", d = "日", r = "今日", y = "イベントなし", l = "終日", M = "削除", Y = "イベント作成", m = "YYYY年 MMMM D日 (dddd)", u = !1, v = {
  weekDays: t,
  months: n,
  years: o,
  year: s,
  month: c,
  week: e,
  days: a,
  day: d,
  today: r,
  noEvent: y,
  allDay: l,
  deleteEvent: M,
  createEvent: Y,
  dateFormat: m,
  truncations: !1
};
export {
  l as allDay,
  Y as createEvent,
  m as dateFormat,
  d as day,
  a as days,
  v as default,
  M as deleteEvent,
  c as month,
  n as months,
  y as noEvent,
  r as today,
  u as truncations,
  e as week,
  t as weekDays,
  s as year,
  o as years
};
