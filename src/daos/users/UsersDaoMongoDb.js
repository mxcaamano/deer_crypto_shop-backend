const { ContainerMongoDb } = require('../../containers/ContainerMongoDb');
const userModel = require('../../models/user.model');
const { DBURL } = require('../../../config');
const logger = require('../../utils/logger');

class UsersDaoMongoDb extends ContainerMongoDb{
    constructor(){
        super(DBURL, userModel)
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