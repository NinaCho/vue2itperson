/**
 * DateTime format & parse tools
 *
 * @desc      时间、日期格式解析和处理工具
 * @author    黄代松(Dyson) <huangdaisong@rainbowcn.com>
 * @date      2019-06-19
 */

const STYLES = {
  'yyyy.MM.dd': 'yyyy.MM.dd',
  'yyyy-MM-dd': 'yyyy-MM-dd',
  'yyyy-MM-dd HH:mm:ss': 'yyyy-MM-dd HH:mm:ss'
}

function format(date = new Date(), fmt = STYLES['yyyy-MM-dd']) {
  if (typeof date == 'number') {
    date = new Date(date)
  }
  const obj = {
    y: date.getFullYear(), // 年份，注意必须用getFullYear
    M: date.getMonth() + 1, // 月份，注意是从0-11
    d: date.getDate(), // 日期
    w: date.getDay(), // 星期，注意是0-6
    H: date.getHours(), // 24小时制
    h: date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
    m: date.getMinutes(), // 分钟
    s: date.getSeconds(), // 秒
    S: date.getMilliseconds() // 毫秒
  }
  const week = ['日', '一', '二', '三', '四', '五', '六']

  for (const i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), m => {
      let val = `${obj[i]}`
      const mLength = m.length
      const vLength = val.length

      if (i == 'w') {
        return `${mLength > 2 ? '星期' : '周'}${week[val]}`
      }

      for (let j = 0; j < mLength - vLength; j++) {
        val = `0${val}`
      }

      return mLength == 1 ? val : val.substring(vLength - mLength)
    })
  }
  return fmt
}

/**
 * 将日期字符串解析成date对象
 * @param {日期字符串} str
 * @param {格式模板} fmt
 */
function parse(str, fmt = STYLES['yyyy-MM-dd']) {
  const obj = {
    y: 0,
    M: 1,
    d: 0,
    H: 0,
    h: 0,
    m: 0,
    s: 0,
    S: 0
  }

  fmt.replace(
    /([^yMdHmsS]*?)(([yMdHmsS])\3*)([^yMdHmsS]*?)/g,
    (m, $1, $2, $3, $4, idx, old) => {
      str = str.replace(
        new RegExp($1 + '(\\d{' + $2.length + '})' + $4),
        (_m, _$1) => {
          obj[$3] = parseInt(_$1)

          return ''
        }
      )

      return ''
    }
  )

  // 月份是从0开始的，所以要减去1
  obj.M--

  const date = new Date(obj.y, obj.M, obj.d, obj.H, obj.m, obj.s)

  // 如果设置了毫秒
  if (obj.S !== 0) {
    date.setMilliseconds(obj.S)
  }

  return date
}

module.exports = {
  STYLES,
  format,
  parse
}
