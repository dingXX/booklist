const request = require('../routers/request');
const weixinConfig = require('../config/weixin');
const WXBizDataCrypt = require('../lib/WXBizDataCrypt');
const UserDB = require('../sql/User.js');
exports.actions = {
    index: {
        isAPI: false,
        method: 'get'
    },
    setUserInfo: {
        isAPI: true,
        method: 'post'
    }
};

exports.actionIndex = async function(ctx) {
    const {js_code} = ctx.request.query;
    let reqData = Object.assign({
        js_code: '033NN2l22Y2H9Y0VeTl22NX0l22NN2lt',
    }, weixinConfig);
    try {
        let wxLoginRes = await request('https://api.weixin.qq.com/sns/jscode2session', {
            data:reqData
        });
        wxLoginRes = JSON.parse(wxLoginRes);
        if(wxLoginRes.errcode){
            throw wxLoginRes;
        }
        const {openId,session_key} = wxLoginRes;
        const user = await UserDB.findOrCreate({
            where: {
                openId,
            },
            defaults:{
                openId,
                create_time: Math.floor(Date.now() / 1000)
            }
        });
        ctx.cookies.set('openId',openId,{
            httpOnly:true,
            maxAge:1000*60*60*24*14
        });
        ctx.cookies.set('session_key',session_key,{
            httpOnly:true,
        });
        return ctx.JsonResponse.success();


    } catch (err) {
        console.log('error#######');
        return ctx.JsonResponse.error(err);
    }

};
exports.actionSetUserInfo = async function(ctx) {
    const session_key = ctx.cookies.get('session_key');
    const {encryptedData,iv} = ctx.request.body;
    const addId = 'wx4f4bc4dec97d474b';
    try{
        var pc = new WXBizDataCrypt(addId, session_key);
        var data = pc.decryptData(encryptedData , iv);
        const {openId,nickName,gender,avatarUrl,unionId} = data;
        let user = await UserDB.findOrCreate({
            where: {
                openId,
            },
            defaults:{
                openId,
                create_time: Math.floor(Date.now() / 1000)
            }
        });
        if (!user[0].unionId) {
            user = await UserDB.update({
                nickName,
                gender,
                avatarUrl,
                unionId,
                update_time:Math.floor(Date.now() / 1000)
            },{
                where:{
                    openId,
                }
            });
        }
        ctx.cookies.set('openId',openId,{
            httpOnly:true,
            maxAge:1000*60*60*24*14
        });
        return ctx.JsonResponse.success(user);
    }catch(err){
        return ctx.JsonResponse.error(err);
    }
};

