const { productsFactory, cartsFactory, messagesFactory, ordersFactory, usersFactory } = require('../daos/factory');
const { ProductsRepository } = require('./products.repository');
const { CartsRepository } = require('./carts.repository');
const { MessagesRepository } = require('./messages.repository');
const { OrdersRepository } = require('./orders.repository');
const { UsersRepository } = require('./users.repository');

const products = new ProductsRepository(new productsFactory());
const carts = new CartsRepository(new cartsFactory());
const messages = new MessagesRepository(new messagesFactory());
const orders = new OrdersRepository(new ordersFactory());
const users = new UsersRepository(new usersFactory());

module.exports = { products, carts, messages, orders, users };