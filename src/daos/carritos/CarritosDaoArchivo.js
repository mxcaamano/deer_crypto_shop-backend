const { ContenedorArchivo } = require('../../containers/ContenedorArchivo')

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./src/db/carts.txt')
    }
}

module.exports = CarritosDaoArchivo