const request = require('../routers/request');
const weixinConfig = require('../config/weixin');
const query = require('../sql/asyncDB');
const WXBizDataCrypt = require('../lib/WXBizDataCrypt');
exports.actions = {
    index: {
        isAPI: false,
        method: 'get'
    },
    setUserInfo: {
        isAPI: true,
        method: 'post'
    },
    from:{
        isAPI:false,
        method:'get',
    },
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
        const {openid,session_key} = wxLoginRes;
        let sql = `INSERT INTO USER (openid, create_time) VALUES ('${openid}',CURTIME());`;
        const user = await query(sql);
        ctx.cookies.set('openid',openid,{
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
exports.actionFrom = async function(ctx){
    ctx.cookies.set('session_key','tiihtNczf5v6AKRyjwEUhQ==',{
        httpOnly:true,
    });
    let html = `
          <h1>koa2 request post demo</h1>
          <form method="POST" action="/api/login/setUserInfo">
            <p>encryptedData</p>
            <input name="encryptedData" value="CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZMQmRzooG2xrDcvSnxIMXFufNstNGTyaGS9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+3hVbJSRgv+4lGOETKUQz6OYStslQ142dNCuabNPGBzlooOmB231qMM85d2/fV6ChevvXvQP8Hkue1poOFtnEtpyxVLW1zAo6/1Xx1COxFvrc2d7UL/lmHInNlxuacJXwu0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn/Hz7saL8xz+W//FRAUid1OksQaQx4CMs8LOddcQhULW4ucetDf96JcR3g0gfRK4PC7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns/8wR2SiRS7MNACwTyrGvt9ts8p12PKFdlqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYVoKlaRv85IfVunYzO0IKXsyl7JCUjCpoG20f0a04COwfneQAGGwd5oa+T8yO5hzuyDb/XcxxmK01EpqOyuxINew==" /><br/>
            <p>nickName</p>
            <input name="iv" value="r7BXXKkLb8qrSNn05n0qiA==" /><br/>
            <button type="submit">submit</button>
          </form>`;
    ctx.body = html;
},
exports.actionSetUserInfo = async function(ctx) {
    const session_key = ctx.cookies.get('session_key');
    console.log(session_key);
    console.log(ctx.request.body);
    const {encryptedData,iv} = ctx.request.body;
    const addId = 'wx4f4bc4dec97d474b';
    var pc = new WXBizDataCrypt(addId, session_key);
    var data = pc.decryptData(encryptedData , iv);
    console.log(data);
    const {openId,nickName,gender,avatarUrl,unionId} = data;
    let selectSql = `select * from USER where openId = '${openId}'`;
    const user = await query(selectSql);
    console.log(user);
    if (!user.length) {
        let insertSql = `INSERT INTO USER (openId, unionId,nickName,gender,avatarUrl,create_time) VALUES ('${openid}','${unionId}','${nickName}','${gender}','${avatarUrl}',CURTIME());`;
        console.log(await query(insertSql));
    }else{
        let updateSql = `UPDATE USER set unionId='${unionId}',nickName='${nickName}',gender='${gender}',avatarUrl='${avatarUrl}',update_time= CURTIME() where openId='${openId}'`;
        console.log(updateSql,'updateSql');
        console.log(await query(updateSql));
    }
    return ctx.JsonResponse.success(data);
};

