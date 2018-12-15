const app = getApp();
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    groupId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    const _this = this;
    // this.$db
    this.getUserLogin().then(data =>{
      const { openid, groupId } = data.result;
      app.openid = openid;
      app.groupId = groupId;
      this.setData({
        openid,
        groupId
      });
      wx.hideNavigationBarLoading();
    })
  },
  getUserLogin() {
    return wx.cloud.callFunction({
      name: 'login',
      data: {}
    })
  },

  jumpToList() {
    wx.switchTab({ url: '/pages/tabBar/list/list' })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})