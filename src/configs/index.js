/**
 * Configs
 *
 * @desc      系统配置信息
 * @author     sumy
 * @date      2019-07-18
 */

const ENV = {
  DEV: 0, // 开发
  TEST: 1, // 测试
  UAT: 2, // 预发布
  PROD: 3 // 生产, 上生产环境还要修改神策的配置文件
}

// app环境
const appEnv = ENV.TEST

// 版本号
const version = '1.5.9'

// 是否启用多语言
const enableI18N = false

// Api域名
let HOST

switch (appEnv) {
  // 测试地址
  case ENV.TEST:
    HOST = require('./host.test')
    break
  // 预发布地址
  case ENV.UAT:
    HOST = require('./host.uat')
    break
  // 正式地址
  case ENV.PROD:
    HOST = require('./host.prod')
    break
  // 开发环境
  case ENV.DEV:
  default:
    HOST = require('./host.dev')
    break
}

module.exports = { appEnv, version, ENV, enableI18N, HOST }
