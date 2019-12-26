// pages/mine/index.js
const app=getApp();
Page({
  data: {
    nickName:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      nickName: app.globalData.userInfo.nickName
    })
  },
  bindOut:function(e){
    wx.clearStorageSync()
    app.globalData.userInfo=null
    wx.navigateTo({
      url: '../wxlogin/index',
    })
  }
})