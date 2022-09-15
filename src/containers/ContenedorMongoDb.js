const mongoose = require('mongoose')
const connectMongo = require('../db/mongodb/connection');
connectMongo();

class ContenedorMongoDb {
    constructor(collName, schema){
        this.coll = mongoose.model(collName, schema)
    }

    async save(obj){
        try {
            const created = await this.coll.create(obj)
            return created;
        } catch (error) {
            console.log(error)            
        }
        
    }

    async getById(id){
        try {
            const found = await this.coll.findOne({_id: id}, {__v: 0});
            return found
            ? (console.log(found), found)
            : console.log("No se encuentra el objeto")
        } 
        catch (error) {
            console.log(error)
        }
    }

    async updateById(id, props){
        try {
            const updated = await this.coll.updateOne({_id: id}, { $set: props })
            console.log(updated)
        } catch (error) {
            console.log(error)            
        }
    }

    async getAll(){
        try {
            const found = await this.coll.find();
            return found.length 
            ? (console.log(found), found)
            : console.log("No hay objetos")
        } 
        catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            const deleted = await this.coll.deleteOne({_id: id})
            if (deleted.deletedCount > 0){
                console.log('Objeto eliminado');
            }
            else{
                console.log("No existe el objeto");
            }
            
        } 
        catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            const deleted = await this.coll.deleteMany()
            deleted.deletedCount 
            ? console.log(`${deleted.deletedCount} objetos eliminados`) 
            : console.log("No hay objetos para eliminar.")    
        } 
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = { ContenedorMongoDb }