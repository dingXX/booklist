const UserService = require('./UserService');
const DB = require('../sql/db');
const ThoughtDB = DB.models.tought;
class ThoughtService {
    constructor(uid) {
        this.uid = uid;
    }
    async isMyThouht(thoughtId){
        const user = await UserService.getUserById(this.uid);
        const myThought = await ThoughtDB.findOne({
            where: {
                id: thoughtId
            },
            attributes: ['id','uid']
        });
        if (!myThought || (user.uid !== myThought.uid)) {
            return false;
        }else{
            return true;
        }
    }
    async addThought(data) {
        const user = await UserService.getUserById(this.uid);
        const {
            type,
            name
        } = data;
        if (!type || !name) {
            throw new Error('type 或name 不能为空');
        }
        return await ThoughtDB.create(Object.assign({
            uid: user.uid
        }, data));
    }
    async deleteThought(thoughtId) {
        if (await this.isMyThouht(thoughtId)) {
            return  await ThoughtDB.destroy({
                where:{
                    id:thoughtId
                }
            });
        }else{
            throw Error('非本人操作，拒绝');
        }
        
    }
    async listThought(page=1,pageSize=20){
        const user = await UserService.getUserById(this.uid);
        const list = await ThoughtDB.findAll({
            where: {
                uid: user.uid
            },
            offset: (page - 1) * pageSize,
            limit: pageSize
        });
        return list;
    }
    async updateThought(data){
        const {thoughtId} = data;
        if (await this.isMyThouht(thoughtId)) {
            return await ThoughtDB.update(data,{
                where:{
                    id:thoughtId
                }
            });
        }else{
            throw Error('非本人操作，拒绝');
        }
    }
    async detailThought(thoughtId){
        if (await this.isMyThouht(thoughtId)) {
            return await ThoughtDB.findOne({
                where:{
                    uid:this.uid
                }
            });
        }else{
            throw Error('非本人操作，拒绝');

        }
    }
}
module.exports = ThoughtService;