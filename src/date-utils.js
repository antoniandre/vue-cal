const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const months = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"]
const now = new Date()

Date.prototype.addDays = function (days) {
  let newDate = new Date()
  newDate.setDate(this.getDate() + days)
  return newDate
}

Date.prototype.subtractDays = function (days) {
  let newDate = new Date()
  newDate.setDate(this.getDate() - days)
  return newDate
}

Date.prototype.getWeek = function () {
  let d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()))
  let dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  let yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}

export const isDateToday = (date) => {
  return formatDate(date) === formatDate(now)
}

export const getDateOfWeek = (w, y) => {
  var d = (1 + (w - 1) * 7); // 1st of January + 7 days for each week
  return new Date(y, 0, d);
}

const nth = (d) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

export const formatTime = (time, format = 'HH') => {
  time /= 60
  switch (format) {
    default:
    case 'HH':
      time = (time < 10 ? '0' : '') + time
      break
  }

  return time
}

export const formatDate = (date, format = 'yyyy-mm-dd') => {
  let d = date.getDate()
  let m = date.getMonth()
  let dateObj = {
    D: date.getDay(),// 0 to 6
    DDD: weekDays[date.getDay()].substr(0, 3),// Mon to Sun
    DDDD: weekDays[date.getDay()],// Monday to Sunday
    d: d,// 1 to 31
    dd: (d < 10 ? '0' : '') + d,// 01 to 31
    S: nth(d),// st, nd, rd, th
    m: date.getMonth(),// 1 to 12
    mm: (m < 10 ? '0' : '') + m,// 01 to 12
    mmm: months[m].substr(0, 3),// Jan to Dec
    mmmm: months[m],// January to December
    yyyy: date.getFullYear(),// 2018
    yy: date.getFullYear().toString().substr(2, 4)// 18
  }

  return format.replace(/(\{[a-zA-Z]+\}|[a-zA-Z]+)/g, (match, contents) => {
    return dateObj[contents.replace(/\{|\}/g, '')]
  })
}