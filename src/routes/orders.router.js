const { Router } = require("express")
const { getOrders, getOrderById, updateOrder, deleteOrder } = require("../controllers/orders.controller")

const routerOrders = Router()

routerOrders.get('/', getOrders)
routerOrders.get('/:id', getOrderById)
routerOrders.put('/:id', updateOrder)
routerOrders.delete('/:id', deleteOrder)

module.exports = routerOrders