/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["월", "화", "수", "목", "금", "토", "일"], n = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], o = "년도", s = "연간", c = "월간", e = "주간", a = "일수", d = "일간", r = "오늘", y = "일정 없음", l = "하루 종일", M = "삭제", Y = "일정 추가", k = "YYYY년 MMMM D일 dddd요일", m = !1, u = {
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
  dateFormat: k,
  truncations: !1
};
export {
  l as allDay,
  Y as createEvent,
  k as dateFormat,
  d as day,
  a as days,
  u as default,
  M as deleteEvent,
  c as month,
  n as months,
  y as noEvent,
  r as today,
  m as truncations,
  e as week,
  t as weekDays,
  s as year,
  o as years
};
