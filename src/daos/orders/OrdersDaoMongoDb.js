const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb');
const ordersModel = require('../../models/orders.model')
const config = require('../../../config')

class OrdersDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super(config.DBURL, ordersModel)
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
