const { productsFactory, cartsFactory, messagesFactory } = require('../daos/factory');
const { ProductsRepository } = require('./products.repository');
const { CartsRepository } = require('./carts.repository');
const { MessagesRepository } = require('./messages.repository');

const products = new ProductsRepository(new productsFactory());
const carts = new CartsRepository(new cartsFactory());
const messages = new MessagesRepository(new messagesFactory());

module.exports = { products, carts, messages };