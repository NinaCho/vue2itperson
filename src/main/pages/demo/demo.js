
/**
 * demo - Page
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
    images: [],
    tag: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // this.imgEditor = this.selectComponent("#imgEditor")
  },

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

  handleTap() {},
  submit(e) {
    console.info(e.detail)
  },
  tagChange(e) {
    this.setData({
      tag: e.target.dataset.key
    })
  }
})
