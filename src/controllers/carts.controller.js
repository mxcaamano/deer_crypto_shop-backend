const businessCarts = require('../business/businessCarts');
const businessOrders = require('../business/businessOrders');
const businessProds = require('../business/businessProducts');
const businessUsers = require('../business/businessUsers');
const logger = require('../utils/logger');
const crypto = require('crypto');
const formatDate = require('../utils/formatDate')

// Variable de Permisos de Administrador
const isAdmin = true

//nodemailer
const mail = 'shirley99@ethereal.email'
const transporter = require('../utils/nodemailer.config')

//twilio
// const sendMsg = require('../utils/twilio.config')

const createCart = async (req, res) => {
    const user = await businessUsers.getById(req.session.passport.user);
    const cart = await businessCarts.getByEmail(user.email)
    if(!cart){
        const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
        await businessCarts.save(cart)
    }
}

// const createCart = async (req, res) => {
//     const user = await businessUsers.getById(req.session.passport.user);
//     const carts = await businessCarts.getAll();
//     if(carts.find(e => e.email == user.email)){
//         res.status(200).json({ message: 'El carrito ya existe' })
//     }
//     else{
//         const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
//         cart
//         ? (await businessCarts.save(cart),
//         res.status(200).json({ message: 'Carrito creado' }))
//         : res.status(400).json({ message: 'No se pudo crear el carrito' })
//     }
// }

// const createCart = async (req, res) => {
//     const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
//     cart
//     ? (res.status(200).json({ message: 'Carrito creado' }),
//     res.json(await businessCarts.save(cart)))
//     : res.status(400).json({ message: 'No se pudo crear el carrito' })
// }

const deleteCart = async (req, res) => {
    const { id_cart } = req.body;
    await businessCarts.deleteById(id_cart);
    res.redirect('/carrito');
    // res.status(200).json({ message: 'Carrito eliminado' }))
    // : res.status(400).json({ message: 'El carrito no existe' })
}

// const deleteCart = async (req, res) => {
//     const id = req.params.id
//     const found = await businessCarts.getById(id)
//     found
//     ? (await businessCarts.deleteById(id), 
//     res.status(200).json({ message: 'Carrito eliminado' }))
//     : res.status(400).json({ message: 'El carrito no existe' })
// }

const getCart = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await businessUsers.getById(req.session.passport.user);
    const cart = await businessCarts.getByEmail(user.email)
    if(cart){
        state = true;
        const qtyItems = cart.products.reduce((prev, curr) => prev + curr.qty, 0);
        const total = cart.products.reduce((prev, curr) => prev + curr.qty * curr.price, 0);
        res.render('pages/cart', {list: cart.products, total: total, qtyItems: qtyItems, id_cart: cart.id})
    }
    else{
        const cart = {email: user.email, address: user.address, products: [], timestamp: Date.now()}
        await businessCarts.save(cart)
        res.render('pages/cart', {list: cart.products})
    }
}

// const getCart = async (req, res) => {
//     const id = req.params.id
//     const cart = await businessCarts.getById(id)
//     cart
//     ? res.json(cart.products)
//     : res.status(400).json({ message: 'El carrito no existe' })
// }

const updateCart = async (req, res) => {
    const { id_prod, qty } = req.body
    const user = await businessUsers.getById(req.session.passport.user);
    await createCart(req)
    let cart = await businessCarts.getByEmail(user.email);
    if(qty>0){
    let product
    process.env.DATABASE === 'file' 
    ? product = await businessProds.getById(id_prod)
    : product = await businessProds.getNative(id_prod)
        if(product){
            product._id = id_prod
            const prodCart = cart.products.find(p => p._id == id_prod)
            cart.products = cart.products.filter(p => p !== prodCart)
            product.id = crypto.randomBytes(10).toString('hex');
            product.qty = parseInt(qty)
            delete product.stock
            cart.products.push(product)
            await businessCarts.updateById(cart.id, {products: cart.products, timestamp: cart.timestamp})
            // res.status(200).json({ message: 'Producto añadido al carrito' })
            res.redirect('/carrito')
        }
        else{
            res.render('pages/systemMessage', { message: 'El producto que intentas agregar al carrito no existe', success: false, href: 'productos' });
            // res.status(400).json({ message: 'El producto no existe' })
        }
    }
    else{
        res.render('pages/systemMessage', { message: 'La cantidad a agregar del producto debe ser mayor a 0', success: false, href: 'productos' });
    }
}

// const updateCart = async (req, res) => {
//     const id = req.params.id
//     const { id_prod } = req.body
//     const cart = await businessCarts.getById(id)
//     const product = await businessProds.getById(id_prod)
//     product 
//     ? (product._id = cart.products.length + 1, 
//     cart.products.push(product),
//     res.status(200).json({ message: 'Producto añadido al carrito' }),
//     res.json(await businessCarts.updateById(id, {products: cart.products, timestamp: cart.timestamp})))
//     : res.status(400).json({ message: 'El producto no existe' }) 
// }

const deleteCartProduct = async (req, res) => {
    const id_prod = req.params.id_prod
    const { id_cart } = req.body
    const cart = await businessCarts.getById(id_cart)
    const product = cart.products.find(p => p.id == id_prod)
    if(product){
    const productsArr = cart.products.filter(p => p !== product)
    await businessCarts.updateById(id_cart, {timestamp: cart.timestamp, products: productsArr})
    res.redirect('/carrito')
    }
    else{
        res.render('pages/systemMessage', { message: 'El producto seleccionado no existe en el carrito', success: false, href: 'carrito' });
        // res.status(400).json({ message: 'El producto seleccionado no existe en el carrito' })
    }
}

// const deleteCartProduct = async (req, res) => {
//     const id = req.params.id
//     const id_prod = req.params.id_prod
//     const cart = await businessCarts.getById(id)
//     const product = cart.products.find(p => p._id == id_prod)
//     if(product){
//     const productsArr = cart.products.filter(p => p !== product)
//     res.status(200).json({ message: 'Producto eliminado del carrito' })
//     res.json(await businessCarts.updateById(id, {timestamp: cart.timestamp, products: productsArr}))
//     }
//     else{
//         res.status(400).json({ message: 'El producto seleccionado no existe en el carrito' })
//     }
// }

const sendCart = async (req, res) => {
    const { id_cart, total } = req.body
    const user = await businessUsers.getById(req.session.passport.user);
    const cart = await businessCarts.getById(id_cart)
    if(cart){
        const order = { items: cart.products, total: total, date: formatDate(new Date()), state: 'Generada', buyer: cart.email }
        let arrayItems = "";
        let arrayItemsMsg = "";
        let n;
        for (n in cart.products) {
        arrayItems += `<div style="color: #2bf8bb;">
                            <strong><u><p style="color: #2bf8bb;">${cart.products[n].title}</p></u></strong>            
                            <img src=${cart.products[n].thumbnail} width="50" height="50" style="color: #2bf8bb;" alt="Imagen Producto"/><br>
                            <span style="color: #4eaa93;">Cantidad: ${cart.products[n].qty}</span>
                            <h5 style="color: #4eaa93;">Precio Unitario: ${cart.products[n].price} U$S</h5>
                            <h4 style="color: #2bf8bb;">Total Producto: ${cart.products[n].qty * cart.products[n].price} U$S</h4>
                            <br>
                        </div>`;
        arrayItemsMsg += `
        • ${cart.products[n].title}           
        Cantidad: ${cart.products[n].qty}
        Precio Unitario: ${cart.products[n].price} U$S
        Total Producto: ${cart.products[n].qty * cart.products[n].price} U$S\n`;
        }
        const mailOptions =  {
            from: `${user.email}`,
            to: mail,
            subject: `Nueva orden de compra de: ${user.name}`,
            html: `<div style="background-color:black;"><br>
                    <h1 style="color: #2bf8bb;">&nbsp&nbsp&nbsp Pedido de ${user.name}:</h1>
                    <ul>${arrayItems}</ul>
                    <h2 style="color: #2bf8bb;">&nbsp&nbsp&nbspTotal: ${total} U$S</h2><br>
                    </div><br>`
        }
        // await transporter.sendMail(mailOptions)
        // await sendMsg(`Hola ${user.name}!, tu pedido N° ${cart.timestamp} fue recibido y se encuentra en proceso!`,'+14793365162',process.env.PHONE)
        // await sendMsg(`Pedido de ${user.name}\n ${arrayItemsMsg}\n Total: ${total} U$S `,'whatsapp:+14155238886',`whatsapp:${process.env.WHATSAPP_PHONE}`)
        await businessOrders.save(order)
        await businessCarts.deleteById(id_cart)
        res.render('pages/systemMessage', { message: `Se ha enviado tu orden de compra, podés consultar su estado en /ordenes`, success: true, href: 'productos' });
        // res.status(200).json({ message: 'Pedido enviado' })
    }
    else{
        res.render('pages/systemMessage', { message: `Ha surgido un error al intentar enviar tu orden, ingresa a tu carrito e intentalo nuevamente`, success: false, href: 'carrito' });
    }
}

module.exports = {
    createCart,
    deleteCart,
    getCart,
    updateCart,
    deleteCartProduct,
    sendCart
}