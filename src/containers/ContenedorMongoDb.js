class ContenedorMongoDb {
    constructor(ruta){
        this.ruta = ruta
    }

    async save(coll, obj){
        try {
            const saved = await new coll(obj).save()
            console.log(saved);
        } catch (error) {
            console.log(error)            
        }
        
    }

    async getById(coll, id){
        try {
            const found = await coll.find({_id: id})
            return found
            ? (console.log(found), found)
            : console.log("No se encuentra el objeto")
        } 
        catch (error) {
            console.log(error)
        }
    }

    async updateById(coll, id, props){
        try {
            const updated = await coll.updateOne({_id: id}, { $set: props })
            console.log(updated)
        } catch (error) {
            console.log(error)            
        }
    }

    async getAll(coll){
        try {
            const found = await coll.find();
            return found.length 
            ? (console.log(found), found)
            : console.log("No hay objetos")
        } 
        catch (error) {
            console.log(error);
        }
    }

    async deleteById(coll, id){
        try {
            const deleted = await coll.deleteOne({_id: id})
            if (deleted.deletedCount > 0){
                console.log(deleted)
                console.log('Objeto eliminado');
            }
            else{
                console.log(deleted)
                console.log("No existe el objeto");
            }
            
        } 
        catch (error) {
            console.log(error)
        }
    }

    async deleteAll(coll){
        try {
            const deleted = await coll.deleteMany()
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