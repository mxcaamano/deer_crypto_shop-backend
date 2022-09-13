// import { ContenedorArchivo } from "../ContenedorArchivo";
const { ContenedorArchivo } = require('../../containers/ContenedorArchivo')

class ProductosDaoArchivo extends ContenedorArchivo{
    constructor(){
        super('./src/db/products.txt')
    }
}

// export default ProductosDaoArchivo
module.exports = ProductosDaoArchivo
