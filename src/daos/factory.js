const logger = require('../utils/logger')

const ProductosDaoMongoDb = require('./productos/ProductosDaoMongoDb.js');
const CarritosDaoMongoDb = require('./carritos/CarritosDaoMongoDb.js');
const MessagesDaoMongoDb = require('./mensajes/MessagesDaoMongoDb.js');
const OrdersDaoMongoDb = require('./orders/OrdersDaoMongoDb.js');
const UsersDaoMongoDb = require('./users/UsersDaoMongoDb.js');

switch (process.env.DATABASE) {
    case 'mongodb':
        logger.info('Base de datos: '+ process.env.DATABASE);
        exports.productsFactory = ProductosDaoMongoDb;
        exports.cartsFactory = CarritosDaoMongoDb;
        exports.messagesFactory = MessagesDaoMongoDb;
        exports.ordersFactory = OrdersDaoMongoDb;
        exports.usersFactory = UsersDaoMongoDb;
        break

    case 'firebase':
        logger.info('Este es un placeholder donde se implementarían los Dao de Firebase');
        logger.info('Acá se implementarían los Dao de '+ process.env.DATABASE);
        break

    case 'fs':
        logger.info('Este es un placeholder donde se implementarían los Dao de Filesystem');
        logger.info('Acá se implementarían los Dao de Filesystem' + process.env.DATABASE);
        break

    default:
        logger.info('No se seleccionó base de datos');
}