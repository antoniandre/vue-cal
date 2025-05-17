/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"], n = ["ב", "ג", "ד", "ה", "ו", "ש", "א"], o = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], s = "שנים", e = "שנה", c = "חודש", a = "שבוע", d = "ימים", r = "יום", y = "היום", l = "אין אירועים", h = "כל היום", D = "מחיקה", M = "צור אירוע", Y = "dddd D MMMM YYYY", k = !1, m = {
  weekDays: t,
  weekDaysShort: n,
  months: o,
  years: s,
  year: e,
  month: c,
  week: a,
  days: d,
  day: r,
  today: y,
  noEvent: l,
  allDay: h,
  deleteEvent: D,
  createEvent: M,
  dateFormat: Y,
  truncations: !1
};
export {
  h as allDay,
  M as createEvent,
  Y as dateFormat,
  r as day,
  d as days,
  m as default,
  D as deleteEvent,
  c as month,
  o as months,
  l as noEvent,
  y as today,
  k as truncations,
  a as week,
  t as weekDays,
  n as weekDaysShort,
  e as year,
  s as years
};
