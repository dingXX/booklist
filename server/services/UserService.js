const UserDB = require('../sql/User');
const ThirdBindDB = require('../sql/ThirdBind');
class User{
    constructor(session){
        console.log(session,'session');
        this.session = session || {};
    }
    async getUser(opts={}){
        let uid = this.session.uid;
        const {type,openId,unionId} = opts;
        let user = null;
        if (!uid && type && openId) {
            // 如果有openId的话，根据openId 查一下用户存不存在
            uid = await ThirdBindDB.findOne({
                where:{
                    type,
                    openId,
                    unionId:{
                        $or:{
                            $eq: null,
                            $eq: unionId
                        }
                    }
                },
                attributes:['uid']
            });
            console.log(uid,'uid');
        }
        if (uid) {
             user = await UserDB.findOne({
                where:{
                    uid
                },
                attributes:['uid','nickName','avatarUrl']
            });
        }
        console.log(user,'user');
        return user;
        
    }
    async createUser(opts={}){
        const user = await UserDB.create(Object.assign({
        },opts));
        return user;
    }
    async createUserByWx(opt = {}){
        const user = await this.createUser(opt);
        await ThirdBindDB.create(Object.assign({},opt,{
            uid:user.uid,
            type:'weixin'
        }));
        return user;
    }
    async upDateWxBindInfo(uid,info){
        if (!uid) {
            return;
        }
        await ThirdBindDB.update(info,{
            where:{
                type:'weixin',
                uid:uid,
                openId:info.openId
            }
        });
    }

}
module.exports = User;