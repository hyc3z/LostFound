const app=getApp()
const utils=require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{
      nickname: "",
      name: "",
      studentId: "",
      major: ""
    }
  },
  onLoad: function (options) {
    var openId=app.globalData.userInfo.openId
    utils.checkBind(openId).then((res)=>{
      if(res){//已经绑定
        utils.userDetail(openId).then((res1) => {
          this.setData({
            userInfo: res1[0]
          })
        })
      }else if(res.code==-1){
        utils.showModel("获取数据失败", "请检查网络环境是否正确")
      }else{
        //没绑定
        utils.showModel("获取数据失败","请先登录一卡通账号进行绑定")
        wx.navigateTo({
          url: '../login/index',
        })
      }
    })
    
  }
})