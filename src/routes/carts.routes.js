const { Router } = require("express")
const { createCart, deleteCart, getCart, updateCart, deleteCartProduct, sendCart } = require("../controllers/carts.controller")

const routerCarts = Router()

routerCarts.delete('/', deleteCart)
routerCarts.get('/', getCart, createCart)
routerCarts.put('/', updateCart)
routerCarts.delete('/:id_prod', deleteCartProduct)
routerCarts.post('/', sendCart)

module.exports = routerCarts