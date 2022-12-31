const { messages } = require('../repos/index');

module.exports = {
    async save(obj){
        return await messages.save(obj);
    },
    async getById(id){
        return await messages.getById(id);
    },
    async getAll(){
        return await messages.getAll();
    },
    async deleteById(id){
        return await messages.deleteById(id);
    },
    async deleteAll(){
        return await messages.deleteAll();
    }
}