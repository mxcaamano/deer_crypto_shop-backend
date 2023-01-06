// Se comentaron los Dao no implementados no requeridos en la consigna

const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo.js');
// const ProductosDaoMemoria = require('./productos/ProductosDaoMemoria.js');
const ProductosDaoMongoDb = require('./productos/ProductosDaoMongoDb.js');

const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo.js');
// const CarritosDaoMemoria = require('./carritos/CarritosDaoMemoria.js');
const CarritosDaoMongoDb = require('./carritos/CarritosDaoMongoDb.js');

const MessagesDaoArchivo = require('./mensajes/MessagesDaoArchivo.js');
// const MessagesDaoMemoria = require('./mensajes/MessagesDaoMemoria.js');
const MessagesDaoMongoDb = require('./mensajes/MessagesDaoMongoDb.js');

const OrdersDaoMongoDb = require('./orders/OrdersDaoMongoDb.js');

switch (process.env.DATABASE) {
    case 'mongodb':
        exports.productsFactory = ProductosDaoMongoDb;
        exports.cartsFactory = CarritosDaoMongoDb;
        exports.messagesFactory = MessagesDaoMongoDb;
        exports.ordersFactory = OrdersDaoMongoDb;
        break

    case 'file':
        exports.productsFactory = ProductosDaoArchivo;
        exports.cartsFactory = CarritosDaoArchivo;
        exports.messagesFactory = MessagesDaoArchivo;
        break

    case 'mem':
        // exports.productsFactory = ProductosDaoMemoria;
        // exports.cartsFactory = CarritosDaoMemoria;
        break

    default:
        console.log('No se seleccionó base de datos')
}