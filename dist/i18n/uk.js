/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"], o = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"], n = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"], s = "Роки", e = "Рік", c = "Місяць", a = "Тиждень", d = "Дні", y = "День", r = "Сьогодні", k = "Немає подій", l = "Весь день", D = "Видалити", M = "Створити подію", Y = "dddd D MMMM YYYY", h = {
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
  noEvent: k,
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
  h as default,
  D as deleteEvent,
  c as month,
  n as months,
  k as noEvent,
  r as today,
  a as week,
  t as weekDays,
  o as weekDaysShort,
  e as year,
  s as years
};
