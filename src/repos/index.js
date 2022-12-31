const { productsFactory, cartsFactory, messagesFactory, ordersFactory } = require('../daos/factory');
const { ProductsRepository } = require('./products.repository');
const { CartsRepository } = require('./carts.repository');
const { MessagesRepository } = require('./messages.repository');
const { OrdersRepository } = require('./orders.repository');

const products = new ProductsRepository(new productsFactory());
const carts = new CartsRepository(new cartsFactory());
const messages = new MessagesRepository(new messagesFactory());
const orders = new OrdersRepository(new ordersFactory());

module.exports = { products, carts, messages, orders };