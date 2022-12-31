const { Router } = require("express")
const { getProducts, getProductsByCategory, getProductById, addProduct, updateProduct, deleteProduct, deleteAllProducts } = require('../controllers/products.controller')

const routerProducts = Router()

routerProducts.get('/', getProducts)
routerProducts.get('/:id', getProductById)
routerProducts.get('/categorias/:category', getProductsByCategory)
routerProducts.post('/', addProduct)
routerProducts.put('/:id', updateProduct)
routerProducts.delete('/:id', deleteProduct)
routerProducts.delete('/', deleteAllProducts)

module.exports = routerProducts