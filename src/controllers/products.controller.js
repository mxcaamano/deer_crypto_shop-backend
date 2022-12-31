const businessProducts = require('../business/businessProducts');
const containerProds = businessProducts;
const logger = require('../utils/logger');
const crypto = require('crypto');
const userModel = require('../models/user.model');

// Variable de Permisos de Administrador
const isAdmin = true

const getProducts = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await userModel.findOne({_id: req.session.passport.user});
    const products = await containerProds.getAll();
    let state = null
    products.length ? state = true : state = false
    res.render('pages/products', {listExist: state, list: products, isAdmin: user.isAdmin, category: "Productos"} );
    // products 
    // ? res.json(products)
    // : res.status(400).json({ error: 'No se encuentran productos' });
}

const getProductsByCategory = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await userModel.findOne({_id: req.session.passport.user});
    const category = req.params.category
    const products = await containerProds.getByCategory(category)
    console.log(products)
    let state = null
    products.length ? state = true : state = false
    res.render('pages/products', {listExist: state, list: products, isAdmin: user.isAdmin, category: category} );
    // products 
    // ? res.json(products)
    // : res.status(400).json({ error: 'No se encuentran productos' });
}

const getProductById = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await userModel.findOne({_id: req.session.passport.user});
    const id = req.params.id;
    const product = await containerProds.getById(id)
    let state = null
    product ? state = true : state = false
    res.render('pages/productDetail', {exist: state, item: product, isAdmin: user.isAdmin} );
    // return product 
    // ? res.json(product) 
    // : res.status(400).json({ error: 'No se encuentra el producto' });
}

const addProduct = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    if(user.isAdmin){
        const product = req.body;
        product.title && product.price && !isNaN(product.price) && product.category && product.description && product.thumbnail && product.stock && !isNaN(product.stock)
        ? (product.price = parseFloat(product.price), product.timestamp = Date.now(), product.code = crypto.randomBytes(3).toString('hex'), await containerProds.save(product),
        res.redirect('/productos'))
        : res.status(400).json({ error: 'Se requiere titulo, precio(debe ser numero), descripción, url de imagen, codigo y stock(debe ser numero)' });
        // ? (product.price = parseFloat(product.price), product.timestamp = Date.now(), product.code = crypto.randomBytes(6).toString('hex'), res.json(await containerProds.save(product)))
        // : res.status(400).json({ error: 'Se requiere titulo, precio(debe ser numero), descripción, url de imagen, codigo y stock(debe ser numero)' });
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const updateProduct = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    if(user.isAdmin){
    const { id } = req.params
    const { title, price, description, category, thumbnail, code, stock  } = req.body
    title && price && !isNaN(price) && category && description && thumbnail && code && stock && !isNaN(stock)
    // ? res.json(await containerProds.updateById(id, {title, price, category, description, thumbnail, code, stock, timestamp: Date.now()}))
    ? (await containerProds.updateById(id, {title, price, category, description, thumbnail, code, stock, timestamp: Date.now()}), res.redirect('/productos'))
    : res.status(400).json({ error: 'Se requiere titulo, precio(debe ser numero), descripción, url de imagen, codigo y stock(debe ser numero)' });
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const deleteProduct = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    if(user.isAdmin){
    const id = req.params.id
    const found = await containerProds.getById(id)
    found
    ? (await containerProds.deleteById(id),
    res.redirect('/productos'))   
    : res.status(400).json({ message: 'El producto no existe' })
    // found
    // ? (await containerProds.deleteById(id),
    // res.status(200).json({ message: 'Producto eliminado' }))     
    // : res.status(400).json({ message: 'El producto no existe' })
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const deleteAllProducts = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    if(user.isAdmin){
    const products = await containerProds.deleteAll();
    products 
    // ? res.status(200).json({ message: 'Productos eliminados' })
    ? res.redirect('/productos')
    : res.status(400).json({ error: 'No se encuentran productos' })}
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

module.exports = {
    getProducts,
    getProductsByCategory,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    deleteAllProducts,
    containerProds
}