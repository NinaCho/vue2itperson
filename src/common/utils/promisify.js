/**
 * Promise Factory Function
 *
 * @description: Make a wx Api into Promise
 * @author:  
 * @date: 2019-04-02 16:10:43
 */

const promisify = wxFn => options =>
  new Promise((resolve, reject) => {
    wxFn({
      ...options,
      success: resolve,
      fail: reject
    })
  })

module.exports = promisify
