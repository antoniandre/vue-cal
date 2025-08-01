/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"], n = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"], o = "Години", s = "Година", e = "Месец", c = "Седмица", Y = "Дни", m = "Ден", a = "Днес", d = "Няма събития", y = "Цял ден", r = "Изтрий", l = "Създай събитие", M = "dddd D MMMM YYYY", v = {
  weekDays: t,
  months: n,
  years: o,
  year: s,
  month: e,
  week: c,
  days: "Дни",
  day: "Ден",
  today: a,
  noEvent: d,
  allDay: y,
  deleteEvent: r,
  createEvent: l,
  dateFormat: M
};
export {
  y as allDay,
  l as createEvent,
  M as dateFormat,
  m as day,
  Y as days,
  v as default,
  r as deleteEvent,
  e as month,
  n as months,
  d as noEvent,
  a as today,
  c as week,
  t as weekDays,
  s as year,
  o as years
};
