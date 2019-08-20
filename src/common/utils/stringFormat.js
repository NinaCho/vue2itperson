/* eslint-disable */

// 四舍五入
const roundString = str => {
  var numberValue
  if (typeof str == 'number') {
    numberValue = str
  } else {
    // 转数字
    numberValue = parseFloat(str)
  }

  var fixedStr = numberValue.toFixed(2)
  return fixedStr
}

// 去小数0
const trimZeroString = str => {
  var stringValue
  if (typeof str == 'string') {
    stringValue = str
  } else {
    // 转字符串
    stringValue = str + ''
  }
  while (stringValue.indexOf('.') != -1) {
    var lastChar = stringValue.substring(stringValue.length - 1)
    if (lastChar == '0' || lastChar == '.') {
      stringValue = stringValue.substring(0, stringValue.length - 1)
    } else {
      break
    }
  }
  return stringValue
}

// 移除字符串中的空格
const removeWhitespace = str => {
  var plainText = ''
  for (var i = 0; i < str.length; i++) {
    var charStr = str.substring(i, i + 1)
    if (charStr != ' ') {
      plainText += charStr
    }
  }
  return plainText
}

const isMobileNumber = str => {
  var mobileFormat = /^(1[3,4,5,7,8]\d{9})$/
  return mobileFormat.test(str)
}

// 解析query参数
// url  可以是完整的网址，也可也是query字符串
// 返回参数键值对。
const parseQueryString = url => {
  var urlString
  if (typeof url == 'string') {
    urlString = url
  } else {
    // 转字符串
    urlString = url + ''
  }

  // 取问号后面那一串（如果没有问号，则取整个字符串）
  var wenIndex = urlString.indexOf('?')
  var queryString
  if (wenIndex >= 0) {
    // 有问号
    queryString = urlString.substring(wenIndex, wenIndex + 1)
  } else {
    queryString = urlString
  }

  if (queryString.indexOf('%') >= 0) {
    // URLDecoding
    queryString = decodeURIComponent(queryString)
  }

  // 提取键值对
  var keyAndValues = queryString.split('&')
  var params = {}
  for (var keyAndValue of keyAndValues) {
    var items = keyAndValue.split('=')
    if (items.length == 2) {
      params[items[0]] = items[1]
    }
  }

  return params
}

module.exports = {
  roundString,
  trimZeroString,
  removeWhitespace,
  isMobileNumber,
  parseQueryString
}
