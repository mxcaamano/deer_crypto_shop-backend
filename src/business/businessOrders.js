const { orders } = require('../repos/index');

module.exports = {
    async save(obj){
        return await orders.save(obj);
    },
    async getById(id){
        return await orders.getById(id);
    },
    async getAll(){
        return await orders.getAll();
    },
    async updateById(id, props){
        return await orders.updateById(id, props);
    },
    async deleteById(id){
        return await orders.deleteById(id);
    },
    async deleteAll(){
        return await orders.deleteAll();
    }
}