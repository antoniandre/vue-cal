/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"], o = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], n = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"], s = "Годы", e = "Год", c = "Месяц", a = "Неделя", d = "Дни", y = "День", r = "Сегодня", l = "Нет событий", D = "Весь день", M = "Удалить", Y = "Создать событие", h = "dddd D MMMM YYYY", k = {
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
  noEvent: l,
  allDay: D,
  deleteEvent: M,
  createEvent: Y,
  dateFormat: h
};
export {
  D as allDay,
  Y as createEvent,
  h as dateFormat,
  y as day,
  d as days,
  k as default,
  M as deleteEvent,
  c as month,
  n as months,
  l as noEvent,
  r as today,
  a as week,
  t as weekDays,
  o as weekDaysShort,
  e as year,
  s as years
};
