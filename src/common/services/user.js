/**
 * UserService
 *
 * @desc      用户信息
 * @author    黄代松(Dyson) <huangdaisong@rainbowcn.com>
 * @date      2019-07-15
 */
const { getSetting, authorize, request } = require('../wechat')
const { STORE_KEY_USERINFO } = require('../constants')
const { HOST } = require('../../configs/index')

class User {
  constructor() {
    this.data = {
      // 是否为虹领巾会员
      isVip: false,
      // 登录钥匙串
      accessToken: null,

      // 登录成功之后的code
      loginCode: null,

      // 获取手机号码要使用的iv和encryptedData
      mobileIv: null,
      mobileEncryptedData: null,

      // 用户openid（可能为空）
      openId: null,

      // 用户unionId（登录的时候返回，可能为空）
      unionId: null,

      // 用户id（登录的时候不会赋值，只有在统计的时候需要，如果为空可以调用fetchMemberId方法获取）
      memberId: null
    }
  }

  init() {
    const userInfo = this.getUserInfoByStore()

    if (!userInfo) {
      return
    }

    this.data = userInfo
  }

  get(key) {
    return key ? this.data[key] : this.data
  }

  geteUserInfo() {
    return this.get()
  }

  getMemberId() {
    const { memberId } = this.data

    if (memberId) {
      return memberId
    }

    const userInfo = this.getUserInfoByStore()

    return userInfo.memberId
  }

  getAccessToken() {
    const { accessToken } = this.data

    if (accessToken) {
      return accessToken
    }

    const userInfo = this.getUserInfoByStore()

    return userInfo.accessToken
  }

  // 检测是否授权
  checkAuth() {
    getSetting().then(({ authSetting }) => {
      const authorized = authSetting['scope.userInfo']

      if (authorized) {
        return
      }

      authorize({
        scope: 'scope.userInfo'
      })
      // .then(() => getUserInfo())
    })
  }

  // 保存信息
  save(data) {
    wx.setStorage({
      key: STORE_KEY_USERINFO,
      data
    })
  }

  update(data) {
    if (!data) {
      return
    }

    this.data = { ...this.data, ...data }
    this.save(this.data)
  }

  // 读取信息
  getUserInfoByStore() {
    const userInfo = wx.getStorageSync(STORE_KEY_USERINFO)

    return userInfo
  }

  // 清理用户信息
  clean() {
    this.data = null

    wx.removeStorage({
      key: STORE_KEY_USERINFO
    })
  }

  fetchOpenid() {
    const { accessToken } = this.data

    if (!accessToken) {
      return Promise.reject(new Error('AccessToken不存在'))
    }

    return request({
      url: `${HOST.member}/member-ms-app/info/fetchMemberOpenid`
    }).then(({ data: openid }) => {
      this.data.openid = openid
    })
  }

  fetchMemberId() {
    const { accessToken } = this.data

    if (!accessToken) {
      return Promise.reject(new Error('AccessToken不存在'))
    }

    return request({
      url: `${HOST.member}/member-ms-app/info/fetchMember`
    }).then(({ data: { memberId } }) => {
      this.data.memberId = memberId
    })
  }
}

module.exports = new User()
