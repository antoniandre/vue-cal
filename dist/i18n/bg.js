/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"], n = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"], o = "Години", s = "Година", e = "Месец", c = "Седмица", a = "Дни", d = "Ден", y = "Днес", r = "Няма събития", l = "Цял ден", M = "Изтрий", Y = "Създай събитие", m = "dddd D MMMM YYYY", v = {
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
