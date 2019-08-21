/**
 * Number
 *
 * Event:
 * add      => 点击+按钮的事件
 * subtract => 点击-按钮的事件
 * input    => 手动录入数量触发
 *
 * <Number value="" bind:add="handleAdd" bind:subtract="handleSubtract" bind:input="handleUpdateNum" />
 *
 * @desc      +-商品按钮组件，完全受控组件
 * @author     sumy
 * @date      2019-07-26
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: Number,
    min: Number,
    max: Number,
    showBoundaryToast: {
      type: Boolean,
      value: true
    },
    upperLimitMessage: String,
    lowerLimitMessage: String,
    // 事件触发时，需要传递的参数，例如数组下标，id等
    args: Object,
    // 是否可以手动输入
    editable: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleAdd() {
      const {
        max,
        value,
        showBoundaryToast,
        upperLimitMessage,
        args
      } = this.properties

      if (max && value == max && showBoundaryToast) {
        this._showToast(upperLimitMessage || `至多可选${max}件`)
        return
      }

      this.triggerEvent('add', args)
    },

    handleSubtract() {
      const {
        min = 0,
        value,
        showBoundaryToast,
        lowerLimitMessage,
        args
      } = this.properties

      if (value == min && showBoundaryToast) {
        this._showToast(lowerLimitMessage || `至少选${min}件`)
        return
      }

      this.triggerEvent('subtract', args)
    },

    handleInput({ detail: { value } }) {
      this.triggerEvent('input', value)
    },

    _showToast(message) {
      wx.showToast({
        title: message,
        icon: 'none',
        duration: 3000,
        mask: false
      })
    }
  }
})
