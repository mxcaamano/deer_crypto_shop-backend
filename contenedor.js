const fs = require('fs').promises;

class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    }

    async #readFileFunction(ruta){
        let archivo = await fs.readFile(ruta, 'utf8')
        let archivoParseado = await JSON.parse(archivo)
        return archivoParseado
    }

    async save(obj){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            dataParse.length 
            ? await fs.writeFile(this.ruta, JSON.stringify([...dataParse, { ...obj, id: dataParse[dataParse.length - 1].id + 1, timestamp: Date.now() }], null, 2)) 
            : await fs.writeFile(this.ruta, JSON.stringify([{...obj, id: 1, timestamp: Date.now()}], null, 2));
            console.log(`El Objeto tiene el ID: ${dataParse.length + 1}`);
        } catch (error) {
            console.log(error)            
        }
        
    }

    async getById(number){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            let found = dataParse.find(found => found.id === number )
            if (found){
                console.log(found);
                return found
            }
            else{
                console.log("No se encuentra el objeto");
                return null;
            }
            
        } 
        catch (error) {
            console.log(error)
        }
    }

    async updateById(obj){
        try {
            let data = await this.#readFileFunction(this.ruta);
            console.log(data)
            const objIndex = data.findIndex(prod => prod.id === obj.id)
            if(objIndex !== -1){
                data[objIndex] = obj
                await fs.writeFile(this.ruta, JSON.stringify(data, null, 2)) 
                return {mensaje: 'Objeto actualizado' }
            }
            else {
                return {error: 'No existe el objeto'}
            }
        } catch (error) {
            console.log(error)            
        }
    }

    async getAll(){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            return dataParse.length 
            ? dataParse
            : console.log("No hay objetos")
        } 
        catch (error) {
            console.log(error);
        }
    }

    async deleteById(number){
        try {
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            let found = dataParse.find(found => found.id === number )
            if (found){
                let dataParseFilter = dataParse.filter(found => found.id !== number)
                await fs.writeFile(this.ruta, JSON.stringify(dataParseFilter, null, 2), 'utf8')
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
            let data = await fs.readFile(this.ruta, 'utf8');
            let dataParse = JSON.parse(data);
            dataParse.length 
            ? (await fs.writeFile(this.ruta, JSON.stringify([])), console.log(`${dataParse.length} Objetos eliminados`)) 
            : console.log("No hay objetos para eliminar.")    
        } 
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor;