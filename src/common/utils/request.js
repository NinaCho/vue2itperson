/**
 * request helper
 *
 * @desc      网络请求处理
 * @author    黄代松(Dyson) <huangdaisong@rainbowcn.com>
 * @date      2019-07-15
 */

const user = require('../services/user')
// const device = require('./device')
const { version } = require('../../configs/index')

const METHODS = {
  POST: 'POST',
  GET: 'GET',
  DELETE: 'DELETE'
}
let timer = null

// 发送get请求
const request = ({ header, method, success, fail, complete, ...others }) => {
  let reqHeader = {
    // 系统信息
    'x-http-version': version,
    'Content-Type': 'application/json',
    'x-http-devicetype': 'miniapp'
  }

  if (user.accessToken) {
    reqHeader['x-http-token'] = user.accessToken
  }

  if (header) {
    reqHeader = {
      ...reqHeader,
      ...header
    }
  }

  wx.request({
    method: method ? method.toUpperCase() : METHODS.POST,
    header: reqHeader,
    ...others,
    success: res => {
      const {
        data,
        data: { code, message },
        header: resHeader
      } = res

      if (code == 40006 || code == 40003) {
        wx.showToast({
          title: message,
          icon: 'none',
          mask: true,
          duration: 3000
        })

        if (timer) {
          return
        }

        // 会话过期，清空用户信息
        timer = setTimeout(function() {
          // 隐藏loading
          wx.hideLoading()
          // 清空用户信息
          user.clean()
          wx.reLaunch({ url: '/home/pages/index/index' })
        }, 3000)

        fail && fail(new Error(message))
        return
      }

      if (resHeader['x-http-token']) {
        // 服务端返回最新的token，更新token
        const accessToken = resHeader['x-http-token']

        user.update({ accessToken })
      }

      success && success(data)
    },
    fail: error => {
      fail && fail(error)
    },
    complete: ({ data }) => {
      complete && complete(data)
    }
  })
}

// const get = params => request({ ...params, method: METHODS.GET })
// const post = params => request({ ...params, method: METHODS.POST })

module.exports = request
