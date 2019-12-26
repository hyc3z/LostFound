const app = getApp()
const config=require("../../config.js")
const utils=require("../../utils/util.js")
Page({
  data: {
    arr:null
  },
  add:function(){
    wx.navigateTo({
      url:"../add/index"
    });
  },
  onLoad:function(){
    this.loadData()
    var openId=app.globalData.userInfo.openId;
    utils.checkBind(openId).then((res)=>{
      if(!res){
        wx.showModal({
          title: '绑定账号提示',
          content: '检测到您没有绑定上海大学一卡通账号，不绑定会影响程序相应的功能，建议您前往绑定，绑定后不再弹出此信息',
          confirmText:"绑定",
          success:function(res){
            if(res){
              wx.navigateTo({
                url: '../login/index',
              })
            }
          }
        })
      }else{
        app.globalData.isBind=true
      }
    })
  },
  loadData:function(){
    utils.showAllpost().then((res) => {
      this.setData({
        arr: res
      })
    })
  }
  ,
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    utils.showAllpost().then((res) => {
      this.setData({
        arr: res
      })
      setTimeout(function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }, 1500)
    })
  },
  onShow:function(){
    if(app.globalData.changed){
      this.loadData()
      app.globalData.changed=false
    }
  }
  
})
