const { ContainerMongoDb } = require('../../containers/ContainerMongoDb')
const cartModel = require('../../models/cart.model')
const { DBURL } = require('../../../config')
const logger = require('../../utils/logger')

class CartsDaoMongoDb extends ContainerMongoDb{
    constructor(){
        super(DBURL, cartModel)
    }
    async getByEmail(email){
        try {
            const found = await this.schema.findOne({email: email}, {__v: 0});
            return found
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = CartsDaoMongoDb