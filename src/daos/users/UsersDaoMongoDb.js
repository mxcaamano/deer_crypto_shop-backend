const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb');
const userModel = require('../../models/user.model');
const config = require('../../../config');
const logger = require('../../utils/logger');

class UsersDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super(config.DBURL, userModel)
    }
    async getByEmail(email){
        try {
            const found = await this.schema.findOne({'email': email}, {__v: 0});
            return found
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = UsersDaoMongoDb