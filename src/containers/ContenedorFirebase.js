const admin = require('firebase-admin')
const connectFire = require('../db/firebase/connection');
connectFire();

const db = admin.firestore();

class ContenedorFirebase {
    constructor(collName){
        this.coll = db.collection(collName)
    }

    async save(obj){
        try {
            const createdDoc = await this.coll.add(obj)
            return { ...obj, id: createdDoc.id};
        } catch (error) {
            console.log(error)            
        }        
    }

    async getById(id){
        try {
            const doc = await this.coll.doc(id).get();
            return doc.exists
            ? (console.log(doc), doc.data())
            : console.log("No se encuentra el objeto")
        } 
        catch (error) {
            console.log(error)
        }
    }

    async updateById(id, props){
        try {
            const updatedDoc = await this.coll.doc(id).update(props)
            console.log(updatedDoc)
        } catch (error) {
            console.log(error)            
        }
    }

    async getAll(){
        try {
            const result = []
            const snapshots = await this.coll.get();
            snapshots.forEach(doc => {
                result.push({ id: doc.id, ...doc.data()})
            })
            return result.length 
            ? (result)
            : console.log("No hay objetos")
        } 
        catch (error) {
            console.log(error);
        }
    }

    async deleteById(id){
        try {
            const doc = await this.coll.doc(id).get()
            console.log(doc.data())
            if(doc.data){
                await this.coll.doc(id).delete()
                console.log('Objeto eliminado')
            }
            else{
                console.log("El objeto no existe")
            }
        } 
        catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            const snapshots = await this.coll.get()
            if(snapshots.docs.length){
                await snapshots.docs.forEach(doc => {
                    this.coll.doc(doc.id).delete()
                })
                console.log(`Objetos eliminados`) 
            }
            else{
                console.log("No hay objetos para eliminar.")
            }
        } 
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = { ContenedorFirebase }