/**
 * Radio - Component
 *
 * @desc      单选组件
 * @author     sumy
 * @date      2019-07-26
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checked: Boolean,
    checkedImage: {
      type: String,
      value: '../../images/icon_checkbox_selected.png'
    },
    // 当为none时不显示图标
    unCheckedImage: {
      type: String,
      value: '../../images/icon_checkbox_normal.png'
    },
    width: {
      type: Number,
      value: 40
    },
    height: {
      type: Number,
      value: 40
    },
    disabled: Boolean,
    // 事件触发时，需要传递的参数，例如数组下标，id等
    args: Object
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    handleToggle() {
      const { args = {}, disabled } = this.properties

      if (disabled) {
        return
      }

      const { checked } = this.data
      const next = !checked

      this.setData({
        checked: next
      })

      this.triggerEvent('change', { checked: next, ...args })
    }
  }
})
