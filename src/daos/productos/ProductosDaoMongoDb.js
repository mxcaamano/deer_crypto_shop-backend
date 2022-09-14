const { ContenedorMongoDb } = require('../../containers/ContenedorMongoDb')

class ProductosDaoMongoDb extends ContenedorMongoDb{
    constructor(){
        super('products', {
            title: {
                type: String,
                required: true,
                max: 200,
                unique: true
            },
            price: {
                type: Number,
                required: true,
                min: 1
            },
            description: {
                type: String,
                required: true
            },
            thumbnail: {
                type: String,
                required: true,
                trim: true,
            },
            code: {
                type: String,
                required: true,
                trim: true,
            },
            stock: {
                type: Number,
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

module.exports = ProductosDaoMongoDb
