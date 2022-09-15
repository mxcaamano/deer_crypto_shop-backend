// let productosDao
// let carritosDao

// switch (process.env.PERS) {
//     case 'txt':
//         const { default: ProductosDaoArchivo } = require('./productos/ProductosDaoArchivo')
//         const { default: CarritosDaoArchivo } = require('./carritos/CarritosDaoArchivo')
//         productosDao = new ProductosDaoArchivo()
//         carritosDao = new CarritosDaoArchivo()
//         break;
//     case 'mongodb':
//         const { default: ProductosDaoMongoDb } = require('./productos/ProductosDaoMongoDb')
//         const { default: CarritosDaoMongoDb } = require('./carritos/CarritosDaoMongoDb')
//         productosDao = new ProductosDaoMongoDb()
//         carritosDao = new CarritosDaoMongoDb()
//         break;
//     case 'firebase':
//         const { default: ProductosDaoFirebase } = require('./productos/ProductosDaoFirebase')
//         const { default: CarritosDaoFirebase } = require('./carritos/CarritosDaoFirebase')
//         productosDao = new ProductosDaoFirebase()
//         carritosDao = new CarritosDaoFirebase()
//         break;

//     default:
//         // const { default: ProductosDaoMongoDb } = require('./productos/ProductosDaoMongoDb')
//         // const { default: CarritosDaoMongoDb } = require('./carritos/CarritosDaoMongoDb')
//         // productosDao = new ProductosDaoMongoDb()
//         // carritosDao = new CarritosDaoMongoDb()
//         break;
// }

// module.exports = { productosDao, carritosDao }   
