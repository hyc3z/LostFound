const {mysql}=require('../qcloud')

async function showAllpost(ctx,next){
    try{
        const posts=await mysql('posts').select('*').orderBy('id','desc')
            ctx.state.data=posts
    }catch(e){
        ctx.state.code=-1
    }
}
async function showMypost(ctx,next){
    try{
        const openId=ctx.request.body.openId
        if(openId){
            const myposts=await mysql('posts').whereRaw('openId=?',[openId]).orderBy('id','desc')
            ctx.state.data=myposts
        }else{
            ctx.state.code=-1
        }
    }catch(e){
        ctx.state.code=-1
    }
    
}
async function changePoststate(ctx,next){
    try{
        const id=ctx.request.body.id
        if(id){
            const result=await mysql("posts").whereRaw("id=?",[id]).update({
                state:"已找回"
            })
            ctx.state.data=result
        }else{
            ctx.state.code=-1
        }
    }catch(e){
        ctx.state.code=-1
    }
}
async function deletePost(ctx,next){
    try{
        const id=ctx.request.body.id
        var result = await mysql("posts").whereRaw("id=?",[id]).del()
        if(result==''){
            ctx.state.data=false
        }else{
            ctx.state.data=true
        }
    }catch(e){
        ctx.state.code=-1
    }
}
async function addPost(ctx,next){
    const {openId,nickName,type,time,place,types,state,postTime,content,pic1,pic2,pic3,avatarUrl}=ctx.request.body
    try{
        var result=await mysql("posts").insert({openId,nickName,type,time,place,types,state,postTime,content,pic1,pic2,pic3,avatarUrl})
        ctx.state.data=result
    }catch(e){
        ctx.state.code=-1
    }
}
async function test(ctx,next){
    
    const result=await mysql("users").select().limit(1).whereRaw("openId=?",['oz6aG5HHsfn3M8rhdn3eJtTs6xPY'])
    ctx.state.data=result
}
module.exports={
    showAllpost,showMypost,changePoststate,deletePost,addPost,test
}