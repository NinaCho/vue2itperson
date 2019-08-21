/**
 * StoreService
 *
 * @desc      门店信息
 * @author     sumy
 * @date      2019-07-15
 */
const location = require('../utils/location')
const { trimZeroString, roundString } = require('../utils/stringFormat')
const { HOST } = require('../../configs')
const { request } = require('../wechat')

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
