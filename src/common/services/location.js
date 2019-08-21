/**
 * LocationService
 *
 * @desc      定位信息
 * @author     sumy
 * @date      2019-07-15
 */
const gcoord = require('../vendors/gcoord/index')
const wechat = require('../wechat')

class Location {
  constructor() {
    // 定位服务是否可用
    this.locationEnabled = false

    // 经纬度（wgs84坐标系，高德、Google国外坐标系）
    this.wgs84 = {
      longitude: 0.0,
      latitude: 0.0
    }

    // 经纬度（gcj02坐标系，高德、Google国内坐标系）
    this.gcj02 = {
      longitude: 0.0,
      latitude: 0.0
    }

    // 经纬度（bd09坐标系，百度坐标系）
    this.bd09 = {
      longitude: 0.0,
      latitude: 0.0
    }
  }

  // 更新定位地址。在确认自己已经开启定位的情况下使用。
  updateLocation() {
    return wechat
      .getLocation({
        type: 'wgs84'
      })
      .then(({ longitude, latitude }) => {
        // 保存位置
        this.wgs84.longitude = longitude
        this.wgs84.latitude = latitude

        // 转gcj02坐标系
        const gcj02 = gcoord.transform(
          [longitude, latitude],
          gcoord.WGS84,
          gcoord.GCJ02
        )
        gcj02.longitude = gcj02[0]
        gcj02.latitude = gcj02[1]

        // 转bd09坐标系
        const bd09 = gcoord.transform(
          [longitude, latitude],
          gcoord.WGS84,
          gcoord.BD09
        )

        bd09.longitude = bd09[0]
        bd09.latitude = bd09[1]
      })
  }

  /**
   * 获取定位地址
   * 如果用户没有授权，或者定位失败，返回201，此时根据locationEnabled属性区分没授权还是定位失败。
   * 默认获取的是wgs84坐标系，再手动转gcj02和bd09，如果想知道当前是否已经定位，只要检测wgs84坐标系是否为{0,0}即可。
   */
  getLocation() {
    return wechat.getSetting().then(({ authSetting }) => {
      const authorized = authSetting['scope.userLocation']

      // 定位权限是打开的
      if (authorized) {
        // 设置服务可用
        this.locationEnabled = true

        // 更新位置
        return this.updateLocation()
      }

      return wechat
        .authorize({
          scope: 'scope.userLocation'
        })
        .then(() => {
          // 设置服务可用
          this.locationEnabled = true

          // 更新位置
          return this.updateLocation()
        })
    })
  }

  // 计算两个经纬度之间的距离（返回单位：公里）
  calculateDistionce(lat1, lng1, lat2, lng2) {
    const radLat1 = (lat1 * Math.PI) / 180.0
    const radLat2 = (lat2 * Math.PI) / 180.0
    const a = radLat1 - radLat2
    const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0
    let s =
      2 *
      Math.asin(
        Math.sqrt(
          Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
        )
      )
    s = s * 6378.137
    s = Math.round(s * 10000) / 10000

    return s
  }

  getWGS84() {
    return this.wgs84
  }

  getGCJ02() {
    return this.gcj02
  }

  getBD09() {
    return this.bd09
  }
}

module.exports = new Location()
