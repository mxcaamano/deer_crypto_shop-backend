const mongoose = require('mongoose')
const logger = require('../utils/logger')
let instance = null

class ContainerMongoDb {
    constructor(dbUrl, schema){
        this.db = dbUrl 
        this.schema = schema
        this.getInstance();
    }

    async getInstance(){
        if(instance){
            logger.info('MongoDB already connected')
            return instance;
        }
        instance = mongoose.connect(this.db ,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        logger.info('MongoDB connected')
        return instance;
    }

    async save(obj){
        try {
            const created = await this.schema.create(obj)
            return created;
        } catch (error) {
            logger.error(error)            
        }
        
    }

    async getById(id){
        try {
            const found = await this.schema.findOne({_id: id}, {__v: 0});
            return found
            ? found
            : logger.info("No se encuentra el objeto")
        } 
        catch (error) {
            logger.error(error)
        }
    }

    async updateById(id, props){
        try {
            const updated = await this.schema.updateOne({_id: id}, { $set: props })
            return logger.info(updated)
        } catch (error) {
            logger.error(error)            
        }
    }

    async getAll(){
        try {
            const found = await this.schema.find();
            return found.length 
            ? found
            : logger.info("No hay objetos")
        } 
        catch (error) {
            logger.error(error);
        }
    }

    async deleteById(id){
        try {
            const deleted = await this.schema.deleteOne({_id: id})
            if (deleted.deletedCount > 0){
                logger.info('Objeto eliminado');
                return deleted.deletedCount
            }
            else{
                logger.info("No existe el objeto");
            }
            
        } 
        catch (error) {
            logger.error(error)
        }
    }

    async deleteAll(){
        try {
            const deleted = await this.schema.deleteMany()
            if (deleted.deletedCount > 0){
                logger.info(`${deleted.deletedCount} objetos eliminados`)
                return deleted.deletedCount
            }
            else{
                logger.info("No hay objetos para eliminar.") 
            }
        } 
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = { ContainerMongoDb }