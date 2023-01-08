const { ContainerMongoDb } = require('../../containers/ContainerMongoDb');
const ordersModel = require('../../models/orders.model')
const { DBURL } = require('../../../config')

class OrdersDaoMongoDb extends ContainerMongoDb{
    constructor(){
        super(DBURL, ordersModel)
    }
    async getByEmail(email){
        try {
            const found = await this.schema.find({buyer: email}, {__v: 0});
            return found
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = OrdersDaoMongoDb
