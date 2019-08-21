/**
 * Popup - Component
 *
 * @desc
 * @author     sumy
 * @date      2019-07-31
 */

Component({
  options: {
    multipleSlots: true
  },

  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    showCancel: {
      type: Boolean,
      value: false
    },
    // 圆角
    isFilleted: {
      type: Boolean,
      value: true
    }
  },

  methods: {
    handleClickMask() {
      const { maskClosable } = this.properties

      if (!maskClosable) {
        return
      }

      this.handleClickClose()
    },

    handleClickClose() {
      this.triggerEvent('close')
    }
  }
})
