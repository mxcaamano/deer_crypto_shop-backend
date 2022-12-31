// Se comentaron los Dao no implementados no requeridos en la consigna

const ProductosDaoArchivo = require('./productos/ProductosDaoArchivo.js');
// const ProductosDaoMemoria = require('./productos/ProductosDaoMemoria.js');
const ProductosDaoMongodb = require('./productos/ProductosDaoMongodb.js');

const CarritosDaoArchivo = require('./carritos/CarritosDaoArchivo.js');
// const CarritosDaoMemoria = require('./carritos/CarritosDaoMemoria.js');
const CarritosDaoMongodb = require('./carritos/CarritosDaoMongodb.js');

const MessagesDaoArchivo = require('./mensajes/MessagesDaoArchivo.js');
// const MessagesDaoMemoria = require('./mensajes/MessagesDaoMemoria.js');
const MessagesDaoMongodb = require('./mensajes/MessagesDaoMongodb.js');

switch (process.env.DATABASE) {
    case 'mongodb':
        exports.productsFactory = ProductosDaoMongodb;
        exports.cartsFactory = CarritosDaoMongodb;
        exports.messagesFactory = MessagesDaoMongodb;
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