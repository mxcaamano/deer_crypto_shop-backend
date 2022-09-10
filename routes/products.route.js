const express = require('express')
const { getProducts, addProduct, updateProduct, deleteProduct, deleteAllProducts } = require('../controllers/products.controller')
const { Router } = express

const routerProducts = Router()

routerProducts.get('/', getProducts)
routerProducts.post('/', addProduct)
routerProducts.put('/:id', updateProduct)
routerProducts.delete('/:id', deleteProduct)
routerProducts.delete('/', deleteAllProducts)

module.exports = routerProducts