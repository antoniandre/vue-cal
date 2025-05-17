/**
  * vue-cal v5.0.1-rc.25
  * (c) 2024-2025 Antoni Andre <antoniandre.web@gmail.com>
  * @license MIT
  */
const t = ["ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"], n = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"], o = "წლები", s = "წელი", e = "თვე", c = "კვირა", a = "დღეები", d = "დღე", y = "დღეს", r = "ღონისძიება არ არის", l = "მთელი დღე", M = "წაშლა", Y = "შექმენით ღონისძიება", k = "dddd D MMMM YYYY", m = {
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
  dateFormat: k
};
export {
  l as allDay,
  Y as createEvent,
  k as dateFormat,
  d as day,
  a as days,
  m as default,
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
