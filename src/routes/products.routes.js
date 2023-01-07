const { Router } = require("express")
const { getProducts, getProductsByCategory, getProductById, addProduct, updateProduct, deleteProduct, deleteAllProducts } = require('../controllers/products.controller')
const { authMiddleware } = require('../middlewares/middlewares');

const routerProducts = Router()

routerProducts.get('/', getProducts)
routerProducts.get('/:id', getProductById)
routerProducts.get('/categorias/:category', getProductsByCategory)
routerProducts.post('/', authMiddleware, addProduct)
routerProducts.put('/:id', authMiddleware, updateProduct)
routerProducts.delete('/:id', authMiddleware, deleteProduct)
routerProducts.delete('/', authMiddleware, deleteAllProducts)

module.exports = routerProducts