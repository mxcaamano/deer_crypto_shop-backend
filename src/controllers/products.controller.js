const { response } = require('express')

// const { Contenedor } = require('../contenedor')
// const contenedor = new Contenedor('./products.txt')

const ProductosDaoArchivo = require('../daos/productos/ProductosDaoArchivo')
const contenedor = new ProductosDaoArchivo()

// Variable de Permisos de Administrador
const isAdmin = true

const getProducts = async (req, res = response) => {
    const products = await contenedor.getAll();
    products 
    ? res.json(products)
    : res.status(400).json({ error: 'No se encuentran productos' });
}

const getProductById = async (req, res = response) => {
    const id = parseInt(req.params.id);
    const product = await contenedor.getById(id)
    product 
    ? res.json(product) 
    : res.status(400).json({ error: 'No se encuentra el producto' });
}

const addProduct = async (req, res = response) => {
    if(isAdmin){
        const product = req.body;
        product.title && product.price && !isNaN(product.price) && product.description && product.thumbnail && product.code && product.stock && !isNaN(product.stock)
        ? (product.price = parseFloat(product.price), res.json(await contenedor.save(product)))
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
    ? res.json(await contenedor.updateById({title, price, description, thumbnail, code, stock, id: parseInt(id), timestamp: Date.now()}))
    : res.status(400).json({ error: 'Se requiere titulo, precio(debe ser numero), descripción, url de imagen, codigo y stock(debe ser numero)' });
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const deleteProduct = async (req, res = response) => {
    if(isAdmin){
    const id = parseInt(req.params.id)
    await contenedor.getById(id)
    ? (await contenedor.deleteById(id),
    res.status(200).json({ message: 'Producto eliminado' }))     
    : res.status(400).json({ message: 'El producto no existe' })
    }
    else{
        res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}

const deleteAllProducts = async (req, res = response) => {
    if(isAdmin){
    const products = await contenedor.deleteAll();
    products 
    ? res.status(400).json({ error: 'No se encuentran productos' })
    : res.status(200).json({ message: 'Producto eliminado' })}
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
    deleteAllProducts
}