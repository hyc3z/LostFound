const utils=require("../../utils/util.js")
const app=getApp()
Page({
  data: {
    userName:"",
    password:""
  },
  handleClick(e){
    utils.showBusy("正在登录")
    var userName=this.data.userName
    var password=this.data.password
    console.log(userName,password)
    if(!userName||!password){
      console.log(userName,password)
      utils.showModel("提交失败","您的账号或密码填写不完整，请填完整后提交")
      return 
    }
    var openId = app.globalData.userInfo.openId, nickName = app.globalData.userInfo.nickName
    var data={studentId:userName,password:password,openId:openId,nickName:nickName}
    utils.bind(data).then((res)=>{
      utils.showSuccess("绑定成功")
      if(res){
        setTimeout(()=>{
          app.globalData.isBind = true
          wx.switchTab({//绑定成功后跳转
            url: '/pages/index/index',
          })
        },1500)
        
      }else{
        utils.showModel("登录失败",'请检查网络环境以及账号密码是否正确')
      }

      
    })
   
  },
  onLoad:function(){

  },
  userNameinput:function(e){
    
    this.setData({
      userName: e.detail.detail.value
    })
  },
  passwordInput:function(e){
    this.setData({
      password: e.detail.detail.value
    })
  }


})