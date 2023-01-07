const { users } = require('../repos/index');

module.exports = {
    async save(obj){
        return await users.save(obj);
    },
    async getById(id){
        return await users.getById(id);
    },
    async getAll(){
        return await users.getAll();
    },
    async updateById(id, props){
        return await users.updateById(id, props);
    },
    async deleteById(id){
        return await users.deleteById(id);
    },
    async deleteAll(){
        return await users.deleteAll();
    },
    async getByEmail(email){
        return await users.getByEmail(email);
    }
}