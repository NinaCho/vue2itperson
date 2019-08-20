Component({
  options: {
    multipleSlots: true
  },

  properties: {
    // 自定义类容
    customSlot: {
      type: Boolean,
      value: false
    }
  },

  data: {
    params: null
  },

  methods: {
    // 显示
    show(params) {
      const primary = {
        // 按钮是否显示
        status: {
          // 确定按钮是否显示
          confirmBtn: true,
          // 取消按钮是否显示
          cancelBtn: true
        },
        // 文字
        text: {
          // 取消按钮
          cancelText: '取消',
          // 确定
          confirmText: '确定',
          // 标题文字
          title: '',
          // 文字类容
          content: ''
        },
        // 样式
        style: {
          modalStyle: '',
          maskStyle: '',
          titleStyle: '',
          contentStyle: '',
          cancelBtnStyle: '',
          confirmBtnStyle: '',
          modalContentStyle: ''
        },
        confirm: null
      }
      for (const key in params) {
        const valve = params[key]
        if (typeof valve === 'object') {
          const primaryValue = primary[key]
          for (const innerKey in valve) {
            primaryValue[innerKey] = valve[innerKey]
          }
        } else {
          primary[key] = params[key]
        }
      }
      this.setData({
        params: primary,
        show: true
      })
    },

    // 关闭
    dismiss() {
      this.setData({
        show: false,
        params: null
      })
    },

    // 取消
    handleCancel() {
      this.dismiss()
    },

    // 确定
    handleConfirm() {
      const { params } = this.data
      if (params.confirm != null) {
        params.confirm()
      }
      this.dismiss()
    },

    touchMove() {}
  }
})
