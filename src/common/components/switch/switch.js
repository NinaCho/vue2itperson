/**
 * Switch - Component
 *
 * @desc
 * @author     sumy
 * @date      2019-07-26
 */

Component({
  properties: {
    checkedImage: String,
    unCheckedImage: String,
    width: {
      type: Number,
      value: 65
    },
    height: {
      type: Number,
      value: 45
    },
    type: {
      type: String,
      value: 'white'
    }
  },

  data: {
    configs: {
      white: {
        width: 65,
        height: 45,
        checkedImage: '../../images/icon_switch_on.png',
        unCheckedImage: '../../images/icon_switch_off.png'
      },
      black: {
        width: 30,
        height: 20,
        checkedImage: '../../images/icon_switch_small_on.png',
        unCheckedImage: '../../images/icon_switch_small.off.png'
      }
    }
  },

  methods: {
    handleChange(checked, args = {}) {
      this.triggerEvent('change', { checked, ...args })
    }
  }
})
