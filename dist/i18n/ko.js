/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["월", "화", "수", "목", "금", "토", "일"], n = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"], c = "년도", d = "연간", y = "월간", r = "주간", l = "일수", k = "일간", m = "오늘", o = "일정 없음", e = "하루 종일", v = "삭제", s = "일정 추가", a = "YYYY년 MMMM D일 dddd요일", E = !1, M = {
  weekDays: t,
  months: n,
  years: "년도",
  year: "연간",
  month: "월간",
  week: "주간",
  days: "일수",
  day: "일간",
  today: "오늘",
  noEvent: o,
  allDay: e,
  deleteEvent: "삭제",
  createEvent: s,
  dateFormat: a,
  truncations: !1
};
export {
  e as allDay,
  s as createEvent,
  a as dateFormat,
  k as day,
  l as days,
  M as default,
  v as deleteEvent,
  y as month,
  n as months,
  o as noEvent,
  m as today,
  E as truncations,
  r as week,
  t as weekDays,
  d as year,
  c as years
};
