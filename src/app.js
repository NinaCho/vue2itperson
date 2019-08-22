/**
 * APP
 *
 * @desc      小程序启动入口文件
 * @author     sumy
 * @date      2019-07-22
 */
// const user = require('./common/services/user')
// const network = require('./common/utils/network')
// const device = require('./common/utils/device')
// const { showModal } = require('./common/wechat')

App({
  onLaunch(options) {
    // 检测新版本
    this.startUpdateListener()

    // 初始化用户信息
    // user.init()
    // device.init()

    // 监听网络状态
    // network.startListener()
  },

  onShow(option) {},

  startUpdateListener() {
    const updateManager = wx.getUpdateManager()

    updateManager.onUpdateReady(() => {
      showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？'
      }).then(({ confirm }) => {
        if (confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      })
    })
  }
})
