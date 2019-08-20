/**
 * wx api wrappered by promisify
 *
 * @desc      export callback functions with promise formats
 * @author    黄代松(Dyson) <huangdaisong@rainbowcn.com>
 * @date      2019-04-02
 */
const promisify = require('./utils/promisify')
const request = require('./utils/request')

const requestify = fn => options => {
  return promisify(fn)(options).then(res => {
    const isSuccess = res.statusCode == 200

    if (isSuccess && res.data && res.data.code == 200) {
      return Promise.resolve(res.data)
    }

    return Promise.reject(isSuccess ? res.data : res)
  })
}

module.exports = {
  // request
  request: requestify(request),
  // pay
  requestPayment: requestify(wx.requestPayment),
  // upload
  uploadFile: promisify(wx.uploadFile),

  chooseImage: promisify(wx.chooseImage),
  showModal: promisify(wx.showModal),

  getSystemInfo: promisify(wx.getSystemInfo),
  getLocation: promisify(wx.getLocation),
  getNetworkType: promisify(wx.getNetworkType),

  // auth
  getSetting: promisify(wx.getSetting),
  authorize: promisify(wx.authorize),
  openSetting: promisify(wx.openSetting),
  getUserInfo: promisify(wx.getUserInfo)
}
