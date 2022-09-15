const { response } = require('express')
// const Products = require('../models/products.model')

// DAO Archivo
// const ProductosDaoArchivo = require('../daos/productos/ProductosDaoArchivo')
// const containerProds = new ProductosDaoArchivo()

//DAO MongoDB
// const ProductosDaoMongoDb = require('../daos/productos/ProductosDaoMongoDb')
// const containerProds = new ProductosDaoMongoDb()

//DAO Firebase
const ProductosDaoFirebase = require('../daos/productos/ProductosDaoFirebase')
const containerProds = new ProductosDaoFirebase()

// Variable de Permisos de Administrador
const isAdmin = true

const getProducts = async (req, res = response) => {
    const products = await containerProds.getAll();
    products 
    ? res.json(products)
    : res.status(400).json({ error: 'No se encuentran productos' });
}

const getProductById = async (req, res = response) => {
    const id = req.params.id;
    const product = await containerProds.getById(id)
    return product 
    ? res.json(product) 
    : res.status(400).json({ error: 'No se encuentra el producto' });
}

const addProduct = async (req, res = response) => {
    if(isAdmin){
        const product = req.body;
        product.title && product.price && !isNaN(product.price) && product.description && product.thumbnail && product.code && product.stock && !isNaN(product.stock)
        ? (product.price = parseFloat(product.price), product.timestamp = Date.now(), res.json(await containerProds.save(product)))
        : res.status(400).json({ error: 'Se requiere titulo, precio(debe ser numero), descripción, url de imagen, codigo y stock(debe ser numero)' });
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const updateProduct = async (req, res = response) => {
    if(isAdmin){
    const { id } = req.params
    const { title, price, description, thumbnail, code, stock  } = req.body
    title && price && !isNaN(price) && description && thumbnail && code && stock && !isNaN(stock)
    ? res.json(await containerProds.updateById(id, {title, price, description, thumbnail, code, stock, timestamp: Date.now()}))
    : res.status(400).json({ error: 'Se requiere titulo, precio(debe ser numero), descripción, url de imagen, codigo y stock(debe ser numero)' });
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const deleteProduct = async (req, res = response) => {
    if(isAdmin){
    const id = req.params.id
    const found = await containerProds.getById(id)
    found
    ? (await containerProds.deleteById(id),
    res.status(200).json({ message: 'Producto eliminado' }))     
    : res.status(400).json({ message: 'El producto no existe' })
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const deleteAllProducts = async (req, res = response) => {
    if(isAdmin){
    const products = await containerProds.deleteAll();
    products 
    ? res.status(200).json({ message: 'Productos eliminados' })
    : res.status(400).json({ error: 'No se encuentran productos' })}
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

module.exports = {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    containerProds
}