const { Router } = require("express")
const { createCart, deleteCart, getCart, updateCart, deleteCartProduct } = require("../controllers/carts.controller")

const routerCarts = Router()

routerCarts.post('/', createCart)
routerCarts.delete('/:id', deleteCart)
// routerCarts.get('/:id/productos', getCart)
routerCarts.get('/', getCart)
// routerCarts.put('/:id/productos', updateCart)
routerCarts.put('/', updateCart)
routerCarts.delete('/:id/productos/:id_prod', deleteCartProduct)

module.exports = routerCarts