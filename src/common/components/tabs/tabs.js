/**
 * Tab组件
 *
 * @desc      仅实现切换效果，内容显示隐藏需自行处理
 * @author     sumy
 * @date      2019-06-10
 */

Component({
  properties: {
    data: {
      type: Array,
      value: [],
      observer(newVal, oldVal) {
        if ((!oldVal || oldVal.length === 0) && newVal) {
          this.setData({
            data: newVal
          })
        }
      }
    },

    current: {
      type: Number,
      value: 0,
      observer(newVal) {
        this.setData({
          current: newVal
        })
      }
    }
  },
  data: {},
  methods: {
    handleSwitch({
      currentTarget: {
        dataset: { index }
      }
    }) {
      const { data } = this.properties

      if (index !== this.data.current) {
        this.setData({
          current: index
        })
      }
      this.triggerEvent('onChange', { ...data[index], index })
    }
  }
})
