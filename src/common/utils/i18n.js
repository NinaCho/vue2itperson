/**
 * i18n
 *
 * @desc      i18n 国际化插件
 * @author     sumy
 * @date      2019-07-18
 */

const { get } = require('./object')
const { STORE_KEY_LANGUAGE } = require('../constants')

const LANGS = ['zh', 'en']
const getResource = (path, resources) => get(resources, path)

/**
 * 使用单例模式
 */
class LocaleProvider {
  static getInstance() {
    if (!this.instance) {
      this.instance = new LocaleProvider()
    }

    return this.instance
  }

  constructor() {
    let language = this.getLanguageFromStore()

    // 实例
    this.instance = null
    // 语言资源文件
    this.resources = {}

    if (!language) {
      language = wx.getSystemInfoSync().language
    }

    this.language = language
    this.storeLanguage(language)
  }

  getLanguage() {
    return this.language
  }

  setLanguage(language) {
    // 检查标识是否有效
    const isExist = LANGS.find(l => l == language)

    if (isExist) {
      this.language = language
      this.storeLanguage(language)
    } else {
      throw new Error(`The language: ${language} is invalid! please check`)
    }
  }

  getResource(path, data) {
    if (!this.resources || JSON.stringify(this.resources) == '{}') {
      return ''
    }

    const resource = path ? getResource(path, this.resources) : this.resources

    // 解析模板字符串： parse(resource, data)
    return resource
  }

  storeLanguage(language) {
    wx.setStorage({
      key: STORE_KEY_LANGUAGE,
      data: language
    })
  }

  getLanguageFromStore() {
    return wx.getStorageSync(STORE_KEY_LANGUAGE)
  }

  /**
   * 传入语言包
   * locale = { zh: {}, en: {}, jp: {} }
   */
  init(locale) {
    this.resources = locale[this.language]
    this.updateCurrentPages(this.resources)
  }

  updateCurrentPages() {
    const pages = getCurrentPages()

    pages.forEach(page => {
      page.setData({
        lang: this.resources
      })
    })
  }
}

const localeProvider = LocaleProvider.getInstance()

module.exports = localeProvider
