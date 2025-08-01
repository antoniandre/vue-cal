/**
  * vue-cal v5.0.1-rc.28
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"], n = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"], o = "წლები", s = "წელი", M = "თვე", e = "კვირა", c = "დღეები", Y = "დღე", a = "დღეს", d = "ღონისძიება არ არის", y = "მთელი დღე", r = "წაშლა", l = "შექმენით ღონისძიება", m = "dddd D MMMM YYYY", h = {
  weekDays: t,
  months: n,
  years: o,
  year: s,
  month: "თვე",
  week: e,
  days: c,
  day: "დღე",
  today: a,
  noEvent: d,
  allDay: y,
  deleteEvent: r,
  createEvent: l,
  dateFormat: m
};
export {
  y as allDay,
  l as createEvent,
  m as dateFormat,
  Y as day,
  c as days,
  h as default,
  r as deleteEvent,
  M as month,
  n as months,
  d as noEvent,
  a as today,
  e as week,
  t as weekDays,
  s as year,
  o as years
};
