const DB = require('../sql/db');
const UserDB = DB.models.USER;
const ThirdBindDB = DB.models.THIRD_BIND;
class User{
    constructor(session){
        this.session = session || {};
    }
    async getUser(opts={}){
        let uid = this.session.uid;
        const {type,openId,unionId} = opts;
        let user = null;
        console.log(uid,'uid');
        if (!uid && type && openId) {
            // 如果有openId的话，根据openId 查一下用户存不存在
            user = await ThirdBindDB.findOne({
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
            console.log(user);
        }
        if (user) {
             user = await UserDB.findOne({
                where:{
                    uid:user.uid
                },
                attributes:['uid','nickName','avatarUrl']
            });
        }
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
    static async getUserById(uid){
        if (!uid) {
            throw new Error('用户未登录');
        }
        const user = await UserDB.findOne({
            where: {
                uid: uid
            }
        });
        if (!user.uid) {
            throw new Error('无该用户');
        }
        return user;
    }

}
module.exports = User;