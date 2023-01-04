const businessProds = require('../business/businessProducts');
const logger = require('../utils/logger');
const crypto = require('crypto');
const userModel = require('../models/user.model');
const categories = ['GPUs', 'Fuentes', 'Motherboards', 'Coolers', 'Risers', 'Rigs', 'ASICs']

const getProducts = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    // const user = await userModel.findOne({_id: req.session.passport.user});
    const products = await businessProds.getAll();
    let state = null
    products.length ? state = true : state = false
    // res.render('pages/products', {listExist: state, list: products, isAdmin: user.isAdmin, category: "Productos"});
    if(req.session.passport !== undefined){
        const user = await userModel.findOne({_id: req.session.passport.user});
        res.render('pages/products', {listExist: state, list: products, isAdmin: user.isAdmin, category: "Productos"});
    }
    else{
        res.render('pages/productsGuest', {listExist: state, list: products, isAdmin: false, category: "Productos"});
    }
    // products 
    // ? res.json(products)
    // : res.status(400).json({ error: 'No se encuentran productos' });
}

const getProductsByCategory = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    // const user = await userModel.findOne({_id: req.session.passport.user});
    const category = req.params.category
    const products = await businessProds.getByCategory(category)
    let state = null
    products.length ? state = true : state = false
    if(req.session.passport !== undefined){
        const user = await userModel.findOne({_id: req.session.passport.user});
        res.render('pages/products', {listExist: state, list: products, isAdmin: user.isAdmin, category: category});
    }
    else{
        res.render('pages/productsGuest', {listExist: state, list: products, isAdmin: false, category: category});
    }
    // res.render('pages/products', {listExist: state, list: products, isAdmin: user.isAdmin, category: category} );
    // products 
    // ? res.json(products)
    // : res.status(400).json({ error: 'No se encuentran productos' });
}

const getProductById = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await userModel.findOne({_id: req.session.passport.user});
    const id = req.params.id;
    const product = await businessProds.getById(id)
    let state = null
    product ? state = true : state = false
    res.render('pages/product', {exist: state, item: product, isAdmin: user.isAdmin} );
    // return product 
    // ? res.json(product) 
    // : res.status(400).json({ error: 'No se encuentra el producto' });
}

const addProduct = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    if(user.isAdmin){
        const product = req.body;
        if(product.title && !isNaN(product.price) && product.price > 0 && product.category == categories.find(e => e.toUpperCase() === product.category.toUpperCase()) && product.description && product.thumbnail && product.stock > 0 ){
            await businessProds.save({...product, price: parseFloat(product.price), timestamp: Date.now(), code: crypto.randomBytes(3).toString('hex')});
            res.redirect('/productos');
        }
        else{
            res.render('pages/systemMessage', { message: 'Los datos del producto no fueron ingresados correctamente.', success: false, href: `productos` });
        }
    }
    else{
        res.render('pages/systemMessage', { message: 'No posee los suficientes privilegios para realizar ésta acción.', success: false, href: `productos` });
        // res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const updateProduct = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    if(user.isAdmin){
    const { id } = req.params
    const { title, price, description, category, thumbnail, code, stock  } = req.body
        if(title && price > 0 && category == categories.find(e => e.toUpperCase() === category.toUpperCase()) && description && thumbnail && code && stock > 0 ){
            await businessProds.updateById(id, {title, price, category, description, thumbnail, code, stock, timestamp: Date.now()})
            res.redirect('/productos');
        }
        else{
            res.render('pages/systemMessage', { message: 'Los datos del producto no fueron ingresados correctamente.', success: false, href: `productos` });
            // res.status(400).json({ error: 'Se requiere titulo, precio(debe ser numero), descripción, url de imagen, codigo y stock(debe ser numero)' });
        }
    }
    else{
        res.render('pages/systemMessage', { message: 'No posee los suficientes privilegios para realizar ésta acción', success: false, href: `productos` });
        // res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const deleteProduct = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    if(user.isAdmin){
        const id = req.params.id
        await businessProds.deleteById(id) === 1 
        ? res.redirect('/productos') // res.status(200).json({ message: 'Producto eliminado' })
        : res.render('pages/systemMessage', { message: 'El producto que intentas eliminar no existe.', success: false, href: `productos` }); 
        // res.status(400).json({ message: 'El producto que intentas eliminar no existe' })
    }
    else{
        res.render('pages/systemMessage', { message: 'No posee los suficientes privilegios para realizar ésta acción', success: false, href: `productos` });
        // res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const deleteAllProducts = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    if(user.isAdmin){
        !isNaN(await businessProds.deleteAll()) 
        ? res.redirect('/productos') // res.status(200).json({ message: 'Productos eliminados' })
        : res.render('pages/systemMessage', { message: 'Los productos que intentas eliminar no existen', success: false, href: `productos` }) // res.status(400).json({ error: 'No se encuentran productos' })
    }
    else{
        res.render('pages/systemMessage', { message: 'No posee los suficientes privilegios para realizar ésta acción', success: false, href: `productos` });
        // res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
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
    businessProds
}