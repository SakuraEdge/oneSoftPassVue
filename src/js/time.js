export function formatDate(date) {
  // 格式化时间为 YYYY-MM-DD HH:MM:SS
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds() // 判断是不是小于10 返回01 02 03
  function check(num) {
    if (num < 10) {
      // 如果数字小于10,前边拼接个0
      return '0' + num
    } else {
      return num
    }
  }
  let timeArry = {}
  // let timeText = `${check(year)}年${check(month)}月${check(day)}日  ${check(hours)}: ${check(minutes)}: ${check(seconds)}`
  let timeText = `${check(year)}-${check(month)}-${check(day)} ${check(hours)}:${check(minutes)}`
  let nowDay = date.getDay()
  let weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六')
  let week = weeks[nowDay] // let state = ``; // // 判断当前时间段 // if (hours >= 0 && hours <= 10) { //   state = `早上`; // } else if (hours > 10 && hours <= 14) { //   state = `中午`; // } else if (hours > 14 && hours <= 18) { //   state = `下午`; // } else if (hours > 18 && hours <= 24) { //   state = `晚上`; // }
  timeArry.timeText = timeText
  timeArry.week = week // timeArry.state = state;
  return timeArry // 时间展示 // return ` //         ${check(year)}年 //         ${check(month)}月 //         ${check(day)}日 //         ${check(hours)} : //         ${check(minutes)} : //         ${check(seconds)}`;
}
