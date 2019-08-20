
/**
 * SupplierList - Page
 *
 * @desc
 * @author    中文名(english_name) <xxx@xxx.com>
 * @date      2019-08-6
 */

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 供应商列表
    supplierList: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const supplierList = [
      {
        imageUrl: '/common/images/logo.png',
        title: '兰卓丽1',
        subtitle: '3945867',
        sell: '213.4万'
      },
      {
        imageUrl: '/common/images/logo.png',
        title: '兰卓丽2',
        subtitle: '3945868',
        sell: '153.4万'
      },
      {
        imageUrl: '/common/images/logo.png',
        title: '兰卓丽3',
        subtitle: '3945869',
        sell: '353.4万'
      },
      {
        imageUrl: '/common/images/logo.png',
        title: '兰卓丽3',
        subtitle: '3845869',
        sell: '353.4万'
      },
      {
        imageUrl: '/common/images/logo.png',
        title: '兰卓丽3',
        subtitle: '3745869',
        sell: '353.4万'
      },
      {
        imageUrl: '/common/images/logo.png',
        title: '兰卓丽3',
        subtitle: '3645869',
        sell: '353.4万'
      },
      {
        imageUrl: '/common/images/logo.png',
        title: '兰卓丽3',
        subtitle: '3545869',
        sell: '353.4万'
      }
    ]
    this.setData({
      supplierList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},

  handleTap() {}
})
