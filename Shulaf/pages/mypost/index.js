const utils=require("../../utils/util.js")
const app=getApp()
Page({
  data: {
    arr:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadData()
  },
  loadData:function(){
    var openId = app.globalData.userInfo.openId
    utils.showMypost(openId).then((data) => {
      this.setData({
        arr: data
      })
    })
  },
  onPullDownRefresh: function () {
    var openId = app.globalData.userInfo.openId
    wx.showNavigationBarLoading()
    utils.showMypost(openId).then((data)=>{
      this.setData({
        arr:data
      })
      setTimeout(function () {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }, 1500)
    })
  },
  changeState:function(e){
    var id=e.target.id
    utils.changePoststate(id).then((res)=>{
      if(res){
        var data = this.data.arr
        app.globalData.changed=true
        for(let i=0;i<data.length;i++){
          if(data[i].id==id){
            data[i].state="已找回"
            break
          }
        }
        this.setData({
          arr:data
        })
      }
      
    })
  },
  deletePost:function(e){
    const id = e.target.id
    utils.deletePost(id).then((res)=>{
      var data=this.data.arr
      app.globalData.changed = true
      for(let i=0;i<data.length;i++){
        if(data[i].id==id){
          data.splice(i,1)
          break
        }
      }
      this.setData({
        arr:data
      })
    })
  },
  onShow:function(){
    
    if (!app.globalData.isBind) {
      wx.showModal({
        title: '绑定账号提示',
        content: '检测到您没有绑定上海大学一卡通账号，不绑定会影响程序相应的功能，建议您前往绑定，绑定后不再弹出此信息',
        confirmText: "绑定",
        success: function (res) {
          if (res) {
            wx.navigateTo({
              url: '../login/index',
            })
          }
        }
      })
    }
    if(app.globalData.mychanged){
      this.loadData()
      app.globalData.mychanged=false
    }
  }

})