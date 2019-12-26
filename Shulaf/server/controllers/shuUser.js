var request=require("request")
var cheerio =require('cheerio')
const {mysql}=require('../qcloud')
async function checkBind(ctx,next){
    try{
        let openId=ctx.request.body.openId
        var result=await mysql("users").select().limit(1).whereRaw("openId=?",[openId])
        if(result==""){
            ctx.state.data=false
        }else{
            ctx.state.data=true
        }
    }catch(e){
        ctx.state.code=-1
    }
}
async function userDetail(ctx,next){
    try{
        const openId=ctx.request.body.openId
        var result=await mysql("users").select('nickName','name','studentId','major').whereRaw("openId=?",[openId])
        if(result==""){
            ctx.state.data=false
        }else{
            ctx.state.data=result
        }
    }catch(e){
        ctx.state.code=-1
    }
}
async function bind(ctx,next){
    var data=ctx.request.body
    var cdata={
        userName:data.studentId,
        password:data.password
    }
    let opts={}
    let finalData={}
    await studentLogin(cdata).then(res=>{
        //console.log(res)
        if(res.result=="成功"){
            opts={
                url:"http://www.sz.shu.edu.cn/person.aspx",
                headers:{
                    Cookie:res.ck
                }
            }
            
        }else{
            ctx.state.data=false
        }
    })
    await studentInfo(opts,data).then((res)=>{
        finalData=res
    })
     
    //console.log(finalData)
    try{
        var res=await mysql("users").insert(
            finalData)
        console.log(res)
        if(res==''){
            ctx.state.data=false
        }else{
            ctx.state.data=true
        }
    }catch(e){
        ctx.state.code=-1
    }
    
}
async function studentInfo(opts,data){
    return new Promise((resolve,reject)=>{
        request(opts,(e,r,b)=>{
            var $=cheerio.load(b)
            var {studentId,password,openId,nickName}=data
            var name=$("#UserInfoUserControl_XingMing").text(),major=$("#lbZhuanYe").text()
            //console.log(data,name,major)
            var finalData={
                studentId,
                password,
                openId,
                nickName,
                name,
                major
            }
               resolve(finalData)             
        })
    })
}
async function studentLogin(data){
    return new Promise((resolve,reject)=>{
         request({
            url:"http://www.sz.shu.edu.cn/api/Sys/Users/Login",
            method:"POST",
            form:data
        },function(e,r,b){
            result=JSON.parse(b).message
            var ck=r.headers['set-cookie']
            resolve({result,ck})
        }
    )
    })
}
module.exports={
    checkBind,bind,userDetail
}