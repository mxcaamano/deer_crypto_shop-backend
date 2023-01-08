const { ContainerMongoDb } = require('../../containers/ContainerMongoDb');
const productModel = require('../../models/product.model')
const { DBURL } = require('../../../config')
const logger = require('../../utils/logger')

class ProductsDaoMongoDb extends ContainerMongoDb{
    constructor(){
        super(DBURL, productModel)
    }
    async getNative(id){
        try {
            const found = await (await this.schema.findOne({_id: id}, {__v: 0})).toObject();
            return found
        } 
        catch (error) {
            logger.error(error)
        }
    }
    async getByCategory(category){
        try {
            const found = await (await this.schema.find({category: category}, {__v: 0}));
            return found
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ProductsDaoMongoDb
