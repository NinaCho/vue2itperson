/**
 * WxPage
 *
 * @desc      Page中自动添加多语言和设备信息
 * @author    黄代松(Dyson) <huangdaisong@rainbowcn.com>
 * @date      2019-07-18
 */
const i18n = require('./utils/i18n')
const device = require('./utils/device')

const PageEnhancer = (props, options) => {
  const { data = {}, ...others } = props
  const hasI18N = options ? options.i18n : false
  const hasDevice = options ? options.device : false
  const property = { ...others }

  if (hasI18N) {
    const { locale } = options

    i18n.init(locale)
    data.lang = i18n.getResource()
  }

  if (hasDevice) {
    data.device = device.getDeviceInfo()
  }

  property.data = data

  return property
}

module.exports = PageEnhancer
