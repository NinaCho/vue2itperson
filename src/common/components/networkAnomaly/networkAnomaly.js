/**
 * Networkanomaly - Component
 *
 * @desc      网络异常
 * @author     sumy
 * @date      2019-07-29
 */

const { networkAnomaly, networkWeak } = require('../../texts')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    statusCode: {
      type: Number,
      value: 1
    },
    // 优先展示
    message: String,
    height: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    mappings: {
      0: networkAnomaly,
      1: networkWeak
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleReload() {
      this.triggerEvent('reload')
    }
  }
})
