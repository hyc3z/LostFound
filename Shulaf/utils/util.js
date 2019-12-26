var config=require("../config.js")
var qcloud = require('../vendor/wafer2-client-sdk/index')
var host=config.service.host
const app=getApp()
const showAllpost=function(){
  return new Promise((resolve,reject)=>{
    qcloud.request({
      url: host + "/weapp/showAllpost",
      success: function (res) {
        var data=res.data.data
        for(let index in data){
          data[index].postTime=timeAgo(data[index].postTime)
          //console.log(data[index].postTime)
        }
        resolve(data)
      }
      // fail: function (err) {
      //   console.error(err)
      // }
    })
  })    
}

const showMypost=function(openId){
  //console.log(openId)
  return new Promise((resolve,rejiect)=>{
      qcloud.request({
        url:host+"/weapp/showMypost",
        data:{openId:openId},
        method:"POST",
        success:function(res){
          var data=res.data.data
          for(let index in data){
            data[index].postTime=timeAgo(data[index].postTime)
          }
          resolve(data)
        }
      })
  })
}
const addPost=function(data){
  console.log(data)//1111111
  return new Promise((resolve,reject)=>{
    qcloud.request({
      url:host+"/weapp/addPost",
      method:"POST",
      data:data,
      success:function(res){
        resolve(res.data.data)
        console.log(res)//222222222
        if(res.data.data){
          showSuccess("添加成功")
        }else{
          showBusy("添加失败")
        }
      }
    })
  })
}
const changePoststate=function(id){
    return new Promise((resolve,reject)=>{
      wx.request({
        url:host+"/weapp/changePoststate",
        method:"POST",
        data:{id},
        success:function(res){
          var result=res.data.data
          resolve(result)
          if(result){
            showSuccess("找回成功")
          }else{
            showBusy("提交失败")
          }
        }
      })
    })
}
const bind=function(data){
  return new Promise((resolve,reject)=>{
    qcloud.request({
      url:host+"/weapp/bind",
      method:"POST",
      data:data,
      success:function(res){
        resolve(res.data.data)
        console.log(res.data.data)
      }
    })
  })
}
const checkBind = function (openId) {
  console.log(openId)
  return new Promise((resolve, reject) => {
    qcloud.request({
      url: host + "/weapp/checkBind",
      method: "POST",
      data: {openId:openId},
      success: function (res) {
        resolve(res.data.data)
      }
    })
  })
}
const userDetail=function(openId){
  return new Promise((resolve,reject)=>{
    qcloud.request({
      url:host+"/weapp/userDetail",
      method:"POST",
      data:{openId},
      success:function(res){
        resolve(res.data.data)
      }
    })
  })
}
const deletePost=function(id){
  return new Promise((resolve,reject)=>{
    qcloud.request({
      url:host+"/weapp/deletePost",
      method:"POST",
      data:{id},
      success:function(res){
        var result=res.data.data
        resolve(result)
        if(result){
          showSuccess("删除成功")
        }else{
          showBusy("删除失败")
        }
        
      }
    })
  })
}
const timeAgo=function(o) {
  var n = new Date().getTime()
  var f = n - o
  var bs = (f >= 0 ? '前' : '后');//判断时间点是在当前时间的 之前 还是 之后
  f = Math.abs(f);
  if (f < 6e4) { return '刚刚' }//小于60秒,刚刚
  if (f < 36e5) { return parseInt(f / 6e4) + '分钟' + bs }//小于1小时,按分钟
  if (f < 864e5) { return parseInt(f / 36e5) + '小时' + bs  }
  if (f < 2592e6) { return parseInt(f / 864e5) + '天' + bs }//小于1个月(30天),按天数
  if (f < 31536e6) { return parseInt(f / 2592e6) + '个月' + bs }//小于1年(365天),按月数
  return parseInt(f / 31536e6) + '年' + bs;//大于365天,按年算
}
// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}
const upLoad=function(filePath,id){
  return new Promise((resolve,reject)=>{
    wx.uploadFile({
      url: config.service.uploadUrl,
      filePath: filePath,
      name: 'file',
      success: function (res) {
        res = JSON.parse(res.data)
        //console.log(res.data.imgUrl)
        app.globalData.upImgurl[id] = res.data.imgUrl
        //console.log(app.globalData.upImgurl[id])
        resolve(app.globalData.upImgurl[id])
      },

      fail: function (e) {
        utils.showModel('上传图片失败')
      }
    })
  })
}
module.exports = {
  showAllpost, showMypost, addPost, timeAgo, showBusy, showSuccess, showModel, changePoststate, deletePost, bind, checkBind, userDetail, upLoad
}