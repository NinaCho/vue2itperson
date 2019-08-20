/**
 * object-helper
 *
 * @desc      对象操作工具
 * @author    黄代松(Dyson) <huangdaisong@rainbowcn.com>
 * @date      2019-07-18
 */

const isObject = value => {
  const type = typeof value

  return value != null && (type == 'object' || type == 'function')
}

const isInvalid = x => x === null || typeof x === 'undefined'

const setter = (obj, path, value) => {
  const array = String(path).split('.')

  obj = obj || {}

  for (
    let i = 0, len = array.length, last = Math.max(len - 1, 0);
    i < len;
    i++
  ) {
    if (i < last) {
      obj = obj[array[i]] = obj[array[i]] || {}
    } else {
      obj[array[i]] = value
    }
  }

  return obj
}

/**
 * 设置对象某个路径上的值
 *
 * @example
 * let obj = {}
 *
 * Obj.set(obj , 'a.b.c' , 100)
 *
 * // obj = { a:{b:{c : 100}}}
 *
 * @param {object} obj 对象
 * @param {string} pathOrObj 路径
 * @param {*} value 值
 * @returns {object}
 *
 * @function set
 *
 * @todo 处理obj为非对象的情况 -- 数组,数字...
 */
const set = (obj, pathOrObj, value) => {
  if (!pathOrObj) {
    return null
  }

  if (isObject(pathOrObj)) {
    each(pathOrObj, (v, k) => {
      obj = setter(obj, k, v)
    })

    return obj
  } else {
    return setter(obj, pathOrObj, value)
  }
}

const get = (obj, path) => {
  if (!obj || !path) {
    return null
  }

  const names = String(path).split('.')

  for (let i = 0, len = names.length; i < len; i++) {
    obj = obj[names[i]]

    if (isInvalid(obj)) {
      return null
    }
  }

  return obj
}

module.exports = { set, get, isObject }
