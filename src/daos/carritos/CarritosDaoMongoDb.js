const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb')

class CarritosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('carts', {
            products: {
                type: Array,
                required: true,
                min: 0
            },
            timestamp: {
                type: Number,
                required: true,
                min: 0
            }
        })
    }
}

module.exports = CarritosDaoMongoDb