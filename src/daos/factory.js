const logger = require('../utils/logger');
const { DATABASE, ENV} = require('../../config')

const ProductsDaoMongoDb = require('./products/ProductsDaoMongoDb.js');
const CartsDaoMongoDb = require('./carts/CartsDaoMongoDb.js');
const MessagesDaoMongoDb = require('./messages/MessagesDaoMongoDb')
const OrdersDaoMongoDb = require('./orders/OrdersDaoMongoDb.js');
const UsersDaoMongoDb = require('./users/UsersDaoMongoDb.js');

switch (DATABASE) {
    case 'mongodb':
        logger.info('Base de datos seleccionada: '+ DATABASE);
        exports.productsFactory = ProductsDaoMongoDb;
        exports.cartsFactory = CartsDaoMongoDb;
        exports.messagesFactory = MessagesDaoMongoDb;
        exports.ordersFactory = OrdersDaoMongoDb;
        exports.usersFactory = UsersDaoMongoDb;
        break
    //Los siguientes dos Case estan hechos a efectos de ilustrar como sería la persistencia si se añadieran otras bases de Datos.
    case 'firebase':
        if(ENV === 'development'){
            logger.info('Este es un placeholder donde se implementarían los Dao de Firebase');
            logger.info('Acá se implementarían los Dao de '+ DATABASE);
        }
        logger.info('Base de datos seleccionada: mongodb');
        exports.productsFactory = ProductsDaoMongoDb;
        exports.cartsFactory = CartsDaoMongoDb;
        exports.messagesFactory = MessagesDaoMongoDb;
        exports.ordersFactory = OrdersDaoMongoDb;
        exports.usersFactory = UsersDaoMongoDb;
        break

    case 'fs':
        if(ENV === 'development'){
            logger.info('Este es un placeholder donde se implementarían los Dao de Filesystem');
            logger.info('Acá se implementarían los Dao de Filesystem' + DATABASE);
        }
        logger.info('Base de datos seleccionada: mongodb');
        exports.productsFactory = ProductsDaoMongoDb;
        exports.cartsFactory = CartsDaoMongoDb;
        exports.messagesFactory = MessagesDaoMongoDb;
        exports.ordersFactory = OrdersDaoMongoDb;
        exports.usersFactory = UsersDaoMongoDb;
        break

    default:
        logger.info('No se seleccionó base de datos');
}