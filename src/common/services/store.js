/**
 * StoreService
 *
 * @desc      门店信息
 * @author    黄代松(Dyson) <huangdaisong@rainbowcn.com>
 * @date      2019-07-15
 */
const location = require('../utils/location')
const { trimZeroString, roundString } = require('../utils/stringFormat')
const { HOST } = require('../../configs')
const { request } = require('../wechat')

// /// 扫码的门店编码（如果用户扫码进来，则固定门店编码，切换门店的时候需要清空）
// var scanStoreId = null
// module.exports.scanStoreId = scanStoreId

// /// 门店编码
// var storeId = null
// module.exports.storeId = storeId

// /// 门店名称
// var storeName = null
// module.exports.storeName = storeName

// /// 门店地址
// var storeAddress = null
// module.exports.storeAddress = storeAddress

// /// 门店类型（1为门店，2为便利店）
// var storeType = 1
// module.exports.storeType = storeType

// /// 城市编码
// var cityCode = null
// module.exports.cityCode = cityCode

// /// 城市名称
// var cityName = null
// module.exports.cityName = cityName

// /// 省份名称
// var provinceName = null
// module.exports.provinceName = provinceName

// /// 附近门店列表
// var nearbyStoreList = null
// module.exports.nearbyStoreList = nearbyStoreList

// /// 最近门店列表（附近门店列表中，400米（含）以内的门店和150米（含）以内的便利店）
// var nearestStoreList = null

class Store {
  fetchNearestStores(filterType) {
    const param = {
      longitude: location.bd09.longitude,
      latitude: location.bd09.latitude,
      limit: 20
    }

    // 拼团新增filterType参数使用
    // 过滤门店类型（默认0，支持门店/便利店，1只支持门店，2只支持便利店）
    if (filterType) {
      param.dataType = filterType
    }

    request({
      url: `${HOST.member}/selfcheck-ms/store/nearby/stores`,
      param
    }).then(({ data }) => {
      if (data && data.length > 0) {
        // 收取最近的门店/便利店
        const nearestStoreList = []

        // 格式化距离
        data.forEach(item => {
          item.distanceFmt = this.formatDistance(item.distance)

          if (item.storeType == 2 && item.distance <= 150) {
            // 便利店
            nearestStoreList.push(item)
          } else if (item.storeType == 1 && item.distance <= 400) {
            // 门店
            nearestStoreList.push(item)
          }
        })

        this.nearbyStoreList = data
        this.nearestStoreList = nearestStoreList
      }
    })
  }

  fetchStoreInfo(storeCode) {
    request({
      url: `${HOST.member}/selfcheck-ms/store/detail`,
      param: {
        storeCode
      }
    })
      .then(({ data }) => {
        console.log(data)
      })
      .catch(() => {
        // 请求网络失败，延时请求
        setTimeout(function() {
          if (this.scanStoreId != null) {
            this.fetchStoreInfo(storeCode)
          }
        }, 5000)
      })
  }

  formatDistance(distance) {
    if (distance > 1000.0) {
      return `${trimZeroString(roundString(distance / 1000.0))}千米`
    } else {
      let numberValue

      if (typeof distance === 'number') {
        numberValue = distance
      } else {
        // 转数字
        numberValue = parseFloat(distance)
      }

      const fixedNumber = numberValue.toFixed(0)

      return `${fixedNumber}米`
    }
  }
}

module.exports = new Store()
