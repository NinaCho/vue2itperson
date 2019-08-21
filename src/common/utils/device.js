/**
 * Device
 *
 * 使用首次加载使用wx.getSystemInfo方法，异步获取设备信息，并计算remainHeight作为屏幕底部的适配参数
 * get时，没有数据，则同步获取后返回
 *
 * @desc      系统设备信息
 * @author     sumy
 * @date      2019-07-18
 */
const wechat = require('../wechat')

class Device {
  constructor() {
    this.data = null

    this.init()
  }

  // 异步初始化
  init() {
    console.log(wechat)

    return wechat.getSystemInfo().then(data => this.set(data))
  }

  // 同步初始化
  initSync() {
    const data = wx.getSystemInfoSync()

    this.set(data)
  }

  get(field) {
    if (!this.data) {
      this.initSync()
    }

    return field ? this.data[field] : this.data
  }

  set(data) {
    let { environment, model } = data
    let remainHeight = 0

    if (!environment) {
      if (wx.qy != null) {
        environment = 'wxwork'
      } else {
        environment = 'wx'
      }
    }

    if (model.indexOf('iPhone X') === 0) {
      remainHeight = 34
    } else {
      const { screenHeight, windowHeight, statusBarHeight } = data

      remainHeight = Math.max(
        screenHeight - windowHeight - statusBarHeight - 44 - 49,
        0
      )
    }

    this.data = {
      ...data,
      environment,
      remainHeight
    }
  }

  getDeviceInfo() {
    return this.get()
  }

  getEnvironment() {
    return this.get('environment')
  }
}

module.exports = new Device()
