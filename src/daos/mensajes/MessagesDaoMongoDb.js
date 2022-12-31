const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb');
const messagesModel = require('../../models/messages.model');
const config = require('../../../config');

class MessagesDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super(config.DBURL, messagesModel)
    }
}

module.exports = MessagesDaoMongoDb
