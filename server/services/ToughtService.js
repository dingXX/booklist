const UserDB = require('../sql/User');
const ToughtDB =require('../sql/Tought');
class ThoughtService{
    constructor(openId){
        this.openId = openId;
    }
    async getUser(){
        const user = await UserDB.findOne({
            where:{
                openId: this.openId
            }
        });
        if (!user.id) {
            throw new Error('无该用户');
        }
        return user;
    }
    async addThought(data){
        const user = await this.getUser();
        const {type,name} = data;
        if(!type || !name){
            throw new Error('type 或name 不能为空');
        } 
        const myThought = await ToughtDB.create(Object.assign({
            create_time: Math.floor(Date.now() / 1000),
            openId:user.openId
        },data));
        return myThought;
    }
    async deleteThought(thoughtId){
        const user = await this.getUser();
        const myThought = await ToughtDB.findOne({
            where:{
                id: thoughtId
            },
            attributes:['id','openId']
        });
        if (user.openId !== myThought.openId) {
            throw new Error('非本人操作，拒绝');
        }
        return await ToughtDB.destroy({
            where 
        });

    }
}
module.exports = ThoughtService;