// pages/add/index.js
const app= getApp()
const utils=require("../../utils/util.js")
const config=require("../../config.js")
Page({
  data: {
    current:"寻物启事",
    src1:"",
    src2:"",
    src3:"",
    time:"",
    place:"",
    types:"",
    content:"",
  },
  handleFruitChange({detail={}}){
    //console.log(detail)
    this.setData({
       current:detail.value
    })
  },
  bindDateChange(e){
    this.setData({
      time:e.detail.value
    })
  },
  loadImage(e){
    var that=this;
    wx.chooseImage({
      success: function(res) {
        switch(e.target.id){
          case 'src1':
            utils.upLoad(res.tempFilePaths[0], 0)
            that.setData({
              src1: res.tempFilePaths[0]
            })
            break
          case 'src2':
            utils.upLoad(res.tempFilePaths[0], 1)
            that.setData({
              src2: res.tempFilePaths[0]
            })
            
            break
          case 'src3':
            utils.upLoad(res.tempFilePaths[0], 2)
            that.setData({
              src3: res.tempFilePaths[0]
            })
            
            break
        }
      },
      count:1,
      sizeType: ['compressed']
    })
  },
submit(e){
  var openId = app.globalData.userInfo.openId, nickName = app.globalData.userInfo.nickName, postTime = Date.parse(new Date()), state = "未找回", avatarUrl = app.globalData.userInfo.avatarUrl, time = this.data.time, place = this.data.place, content = this.data.content,type=this.data.current,types=this.data.types
  if(!time||!place||!content){
    utils.showModel("提交失败","请将表单填写完整后再提交")
    return 
  }
  var data = {
    openId,
    nickName,
    type: type,
    time: time,
    place: place,
    types: types,
    state: state,
    postTime: postTime,
    content: content,
    pic1: app.globalData.upImgurl[0],
    pic2: app.globalData.upImgurl[1],
    pic3: app.globalData.upImgurl[2],
    avatarUrl: avatarUrl
  }

  utils.addPost(data).then((res)=>{
      if(res){
        app.globalData.changed=true
        app.globalData.mychanged=true
        wx.switchTab({
          url: '../index/index',
        })
      }else{
        utils.showModel("提交失败","当前网络状况较差，请稍后再试")
      }
  })

  },
  placeInput:function(e){

    this.setData({
      place: e.detail.detail.value
    })
  },
  typesInput:function(e){
    this.setData({
      types: e.detail.detail.value
    })
  },
  contentInput:function(e){
    this.setData({
      content: e.detail.detail.value
    })
  },
  onShow:function(){
    app.globalData.upImgurl = ['', '', '']
  }
})