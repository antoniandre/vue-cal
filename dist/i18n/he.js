/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"], n = ["ב", "ג", "ד", "ה", "ו", "ש", "א"], o = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"], s = "שנים", M = "שנה", e = "חודש", c = "שבוע", a = "ימים", Y = "יום", d = "היום", y = "אין אירועים", r = "כל היום", l = "מחיקה", h = "צור אירוע", D = "dddd D MMMM YYYY", k = !1, m = {
  weekDays: t,
  weekDaysShort: n,
  months: o,
  years: s,
  year: "שנה",
  month: e,
  week: c,
  days: a,
  day: "יום",
  today: d,
  noEvent: y,
  allDay: r,
  deleteEvent: l,
  createEvent: h,
  dateFormat: D,
  truncations: !1
};
export {
  r as allDay,
  h as createEvent,
  D as dateFormat,
  Y as day,
  a as days,
  m as default,
  l as deleteEvent,
  e as month,
  o as months,
  y as noEvent,
  d as today,
  k as truncations,
  c as week,
  t as weekDays,
  n as weekDaysShort,
  M as year,
  s as years
};
