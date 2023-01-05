const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb');
const messagesModel = require('../../models/messages.model');
const config = require('../../../config');
const logger = require('../../utils/logger');

class MessagesDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super(config.DBURL, messagesModel)
    }
    async getByEmail(email){
        try {
            const found = await this.schema.find({'author.id': email}, {__v: 0});
            return found
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = MessagesDaoMongoDb
