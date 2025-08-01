/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"], o = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], s = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"], n = "Годы", Y = "Год", e = "Месяц", c = "Неделя", h = "Дни", a = "День", d = "Сегодня", y = "Нет событий", r = "Весь день", l = "Удалить", D = "Создать событие", M = "dddd D MMMM YYYY", k = {
  weekDays: t,
  weekDaysShort: o,
  months: s,
  years: n,
  year: "Год",
  month: e,
  week: c,
  days: "Дни",
  day: a,
  today: d,
  noEvent: y,
  allDay: r,
  deleteEvent: l,
  createEvent: D,
  dateFormat: M
};
export {
  r as allDay,
  D as createEvent,
  M as dateFormat,
  a as day,
  h as days,
  k as default,
  l as deleteEvent,
  e as month,
  s as months,
  y as noEvent,
  d as today,
  c as week,
  t as weekDays,
  o as weekDaysShort,
  Y as year,
  n as years
};
