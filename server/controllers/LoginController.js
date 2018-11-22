const request = require('../routers/request');
const weixinConfig = require('../config/weixin');
const WXBizDataCrypt = require('../lib/WXBizDataCrypt');
const UserDB = require('../sql/User.js');
const UserService = require('../services/UserService');
exports.actions = {
    index: {
        isAPI: false,
        method: 'get'
    },
};

exports.actionIndex = async function(ctx) {
    const {js_code,encryptedData,iv} = ctx.request.query;
    let reqData = Object.assign({
        js_code: '023S8b2y0fy3Lh18xy0y0mt72y0S8b2o',
    }, weixinConfig);
    try {
        let wxLoginRes = await request('https://api.weixin.qq.com/sns/jscode2session', {
            data: reqData
        });
        wxLoginRes = JSON.parse(wxLoginRes);
        if (wxLoginRes.errcode) {
            throw wxLoginRes;
        }

        
        // const wxLoginRes = {
        //     session_key: '8wMkVpEyewP0j6uarYqqVw==',
        //     openid: 'oBRJs5SD6gHd1pnTczSnkGDYQMdk'
        // };
        const {openid: openId,session_key} = wxLoginRes;
        let wxUser = {
            openId,

        };
        if (encryptedData && iv) {
            const pc = new WXBizDataCrypt(weixinConfig.addId, session_key);
            wxUser = pc.decryptData(encryptedData, iv);
        }
        const userService = new UserService();
        let user = await userService.getUser({
            type: 'weixin',
            unionId:wxUser.unionId || null,
            openId
        });
        if (!user) {
            user = await userService.createUserByWx(wxUser); 
        }
        if (wxUser.unionId) {
            userService.upDateWxBindInfo(user.uid,wxUser);
        }
        ctx.session = {uid:user.uid};
        return ctx.JsonResponse.success(user);
    } catch (err) {
        return ctx.JsonResponse.error(err);
    }

};
