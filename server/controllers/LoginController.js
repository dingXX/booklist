const request = require('../routers/request');
const weixinConfig = require('../config/weixin');
exports.actions = {
    index: {
        isAPI: false,
        method: 'get'
    },
    participate: {
        isAPI: true,
        method: 'get'
    }
};

exports.actionIndex = async function(ctx) {
    let reqData = Object.assign({
        js_code: '033mDI711FwCMY1y5a711rSQ711mDI7f',
    }, weixinConfig);
    try {
        let wxLoginRes = await request('https://api.weixin.qq.com/sns/jscode2session', {
            data:reqData
        });
        wxLoginRes = JSON.parse(wxLoginRes);
        if(wxLoginRes.errcode){
            throw wxLoginRes;
        }
        return ctx.JsonResponse.success(wxLoginRes);


    } catch (err) {
        console.log(err,'############');
        return ctx.JsonResponse.error(err);
    }

};

exports.actionParticipate = async function(ctx) {
    ctx.body = 'actionParticipate';
};
