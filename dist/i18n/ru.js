/**
  * vue-cal v5.0.1-rc.34
  * (c) 2024-2026 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"], n = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], o = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"], s = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"], e = "Годы", D = "Год", c = "Месяц", a = "Неделя", M = "Дни", d = "День", y = "Сегодня", r = "Нет событий", h = "Весь день", l = "Удалить", m = "Создать событие", v = "dddd D MMMM YYYY", Y = {
  weekDays: t,
  weekDaysShort: n,
  months: o,
  monthsGenitive: s,
  years: e,
  year: "Год",
  month: c,
  week: a,
  days: "Дни",
  day: d,
  today: y,
  noEvent: r,
  allDay: h,
  deleteEvent: l,
  createEvent: m,
  dateFormat: v
};
export {
  h as allDay,
  m as createEvent,
  v as dateFormat,
  d as day,
  M as days,
  Y as default,
  l as deleteEvent,
  c as month,
  o as months,
  s as monthsGenitive,
  r as noEvent,
  y as today,
  a as week,
  t as weekDays,
  n as weekDaysShort,
  D as year,
  e as years
};
