const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb')

class ProductosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('products')
    }
}

module.exports = ProductosDaoMongoDb
