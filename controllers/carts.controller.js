const { response } = require('express')

const { Contenedor } = require('../contenedor')
const contenedor = new Contenedor('./carts.txt')
const contenedorProducts = new Contenedor('./products.txt')

// Variable de Permisos de Administrador
const isAdmin = true

const createCart = async (req, res= response) => {
    const cart = {products: []}
    res.status(200).json({ message: 'Carrito creado' })
    res.json(await contenedor.save(cart))
}

const deleteCart = async (req, res= response) => {
    const id = parseInt(req.params.id)
    await contenedor.getById(id)
    ? (await contenedor.deleteById(id), 
    res.status(200).json({ message: 'Carrito eliminado' }))
    : res.status(400).json({ message: 'El carrito no existe' })
}

const getCart = async (req, res= response) => {
    const id = parseInt(req.params.id)
    const cart = await contenedor.getById(id)
    res.json(cart.products)
}

const updateCart = async (req, res= response) => {
    const id = parseInt(req.params.id)
    const { id_prod } = req.body
    const cart = await contenedor.getById(id)
    const product = await contenedorProducts.getById(id_prod)
    product 
    ? (product.id = cart.products.length + 1, 
    cart.products.push(product),
    res.status(200).json({ message: 'Producto añadido al carrito' }),
    res.json(await contenedor.updateById({timestamp: cart.timestamp, products: cart.products, id: parseInt(id)})))
    : res.status(400).json({ message: 'El producto no existe' }) 
}

const deleteCartProduct = async (req, res= response) => {
    const id = parseInt(req.params.id)
    const id_prod = parseInt(req.params.id_prod)
    const cart = await contenedor.getById(id)
    const product = cart.products.find(p => p.id == id_prod)
    if(product){
    const productsArr = cart.products.filter(p => p !== product)
    res.status(200).json({ message: 'Producto eliminado del carrito' })
    res.json(await contenedor.updateById({timestamp: cart.timestamp, products: productsArr, id: parseInt(id)}))
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