const { ContenedorFirebase } = require('../../containers/ContenedorFirebase')

class ProductosDaoFirebase extends ContenedorFirebase{
    constructor(){
        super('products')
    }
}

module.exports = ProductosDaoFirebase
