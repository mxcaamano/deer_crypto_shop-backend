const { ContainerMongoDb } = require('../../containers/ContainerMongoDb');
const messagesModel = require('../../models/messages.model');
const { DBURL } = require('../../../config');
const logger = require('../../utils/logger');

class MessagesDaoMongoDb extends ContainerMongoDb{
    constructor(){
        super(DBURL, messagesModel)
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
