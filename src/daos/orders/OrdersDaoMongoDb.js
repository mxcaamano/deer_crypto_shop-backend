const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb');
const ordersModel = require('../../models/orders.model')
const config = require('../../../config')

class OrdersDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super(config.DBURL, ordersModel)
    }
}

module.exports = OrdersDaoMongoDb
