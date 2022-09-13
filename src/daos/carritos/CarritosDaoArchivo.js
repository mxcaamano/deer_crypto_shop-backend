// import { ContenedorArchivo } from "../ContenedorArchivo";
const { ContenedorArchivo } = require('../../containers/ContenedorArchivo')

class CarritosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./src/db/carts.txt')
    }
}

// export default CarritosDaoArchivo
module.exports = CarritosDaoArchivo