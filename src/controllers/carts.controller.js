//DAO MongoDB
const CarritosDaoMongoDb = require('../daos/carritos/CarritosDaoMongoDb');
const containerCarts = new CarritosDaoMongoDb();
const { containerProds } = require('../controllers/products.controller');
const userModel = require('../models/user.model');

// Variable de Permisos de Administrador
const isAdmin = true

const createCart = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    const cart = await containerCarts.getByEmail(user.email)
    if(cart){
        console.log("El carrito ya existe")
    }
    else{
        const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
        await containerCarts.save(cart)
        console.log("Carrito creado")
    }
}

// const createCart = async (req, res) => {
//     const user = await userModel.findOne({_id: req.session.passport.user});
//     const carts = await containerCarts.getAll();
//     if(carts.find(e => e.email == user.email)){
//         res.status(200).json({ message: 'El carrito ya existe' })
//     }
//     else{
//         const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
//         cart
//         ? (await containerCarts.save(cart),
//         res.status(200).json({ message: 'Carrito creado' }))
//         : res.status(400).json({ message: 'No se pudo crear el carrito' })
//     }
// }

// const createCart = async (req, res) => {
//     const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
//     cart
//     ? (res.status(200).json({ message: 'Carrito creado' }),
//     res.json(await containerCarts.save(cart)))
//     : res.status(400).json({ message: 'No se pudo crear el carrito' })
// }

const deleteCart = async (req, res) => {
    const { id_cart } = req.body
    const cart = await containerCarts.getById(id_cart)
    cart
    ? (await containerCarts.deleteById(cart.id), 
    res.status(200).json({ message: 'Carrito eliminado' }))
    : res.status(400).json({ message: 'El carrito no existe' })
}

// const deleteCart = async (req, res) => {
//     const id = req.params.id
//     const found = await containerCarts.getById(id)
//     found
//     ? (await containerCarts.deleteById(id), 
//     res.status(200).json({ message: 'Carrito eliminado' }))
//     : res.status(400).json({ message: 'El carrito no existe' })
// }

const getCart = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    const cart = await containerCarts.getByEmail(user.email)
    if(cart){
        state = true;
        const qtyItems = cart.products.reduce((prev, curr) => prev + curr.qty, 0);
        const total = cart.products.reduce((prev, curr) => prev + curr.qty * curr.price, 0);
        res.render('pages/cart', {list: cart.products, total: total, qtyItems: qtyItems, id_cart: cart._id})
    }
    else{
        const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
        await containerCarts.save(cart)
        res.render('pages/cart', {list: cart.products})
    }
}

// const getCart = async (req, res) => {
//     const id = req.params.id
//     const cart = await containerCarts.getById(id)
//     cart
//     ? res.json(cart.products)
//     : res.status(400).json({ message: 'El carrito no existe' })
// }

const updateCart = async (req, res) => {
    const { id_prod, qty } = req.body
    const user = await userModel.findOne({_id: req.session.passport.user});
    let cart = await containerCarts.getByEmail(user.email)
    const product = await containerProds.getNative(id_prod)
    if(!cart){
        cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
        await containerCarts.save(cart)
    }
    if(product){
        product._id = id_prod
        product.id = cart.products.length + 1
        product.qty = parseInt(qty)
        cart.products.push(product)
        await containerCarts.updateById(cart._id, {products: cart.products, timestamp: cart.timestamp})
        res.status(200).json({ message: 'Producto añadido al carrito' })
    }
    else{
        res.status(400).json({ message: 'El producto no existe' })
    }
}

// const updateCart = async (req, res) => {
//     const id = req.params.id
//     const { id_prod } = req.body
//     const cart = await containerCarts.getById(id)
//     const product = await containerProds.getById(id_prod)
//     product 
//     ? (product._id = cart.products.length + 1, 
//     cart.products.push(product),
//     res.status(200).json({ message: 'Producto añadido al carrito' }),
//     res.json(await containerCarts.updateById(id, {products: cart.products, timestamp: cart.timestamp})))
//     : res.status(400).json({ message: 'El producto no existe' }) 
// }

const deleteCartProduct = async (req, res) => {
    const id = req.params.id
    const id_prod = req.params.id_prod
    const cart = await containerCarts.getById(id)
    const product = cart.products.find(p => p._id == id_prod)
    if(product){
    const productsArr = cart.products.filter(p => p !== product)
    console.log(productsArr)
    res.status(200).json({ message: 'Producto eliminado del carrito' })
    res.json(await containerCarts.updateById(id, {timestamp: cart.timestamp, products: productsArr}))
    }
    else{
        res.status(400).json({ message: 'El producto seleccionado no existe en el carrito' })
    }
}

module.exports = {
    createCart,
    deleteCart,
    getCart,
    updateCart,
    deleteCartProduct
}