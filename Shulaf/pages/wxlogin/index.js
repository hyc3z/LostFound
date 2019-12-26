var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
const app=getApp()
Page({
  data: {
    logged:false,
    caniuse:false
  },
  bindLogin:function(e){
    if(this.data.logged) return
    util.showBusy("正在登录")
    const session=qcloud.Session.get()
    if(session){
      qcloud.loginWithCode({
        success:res=>{
          this.setData({logged:true})
          util.showSuccess("登录成功")
          let userInfo = {
            openId: res.openId,
            nickName: res.nickName,
            avatarUrl: res.avatarUrl
          }
          app.globalData.userInfo = userInfo
          wx.switchTab({
            url: '../index/index',
          })
        },
        fail:err=>{
          console.error(err)
          util.showModel("登录错误",err.errMsg)
        }
      })
    }else{
      qcloud.login({
        success:res=>{
          this.setData({userInfo:res,logged:true})
          util.showSuccess("登录成功")
          let userInfo={
            openId: res.openId,
            nickName:res.nickName,
            avatarUrl: res.avatarUrl
            }
          app.globalData.userInfo=userInfo
          wx.switchTab({
            url: '../index/index',
          })
        },
        fail:err=>{
          console.error(err)
          util.showModel("登录失败",err.errMsg)
        }
      })
    }
  },
  onLoad:function(){
    var caniuse = wx.canIUse('button.open-type.getUserInfo')
    this.setData({caniuse})
    if(!caniuse){
        util.showModel("请升级微信版本","您的微信版本过低导致小程序很多功能无法使用，请在应用商店下载最新的微信后使用。")
    }
    // if(wx.getStorageSync("UserInfo")){
    //   wx.switchTab({
    //     url: '../index/index',
    //   })
    // }
  },
})