const businessOrders = require('../business/businessOrders');
const userModel = require('../models/user.model');
const logger = require('../utils/logger');

const getOrders = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await userModel.findOne({_id: req.session.passport.user});
    let orders
    user.isAdmin ? orders = await businessOrders.getAll() : orders = await businessOrders.getByEmail(user.email)
    let state = null
    orders.length ? state = true : state = false
    res.render('pages/orders', { listExist: state, list: orders, isAdmin: user.isAdmin } );
}

const getOrderById = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await userModel.findOne({_id: req.session.passport.user});
    const id = req.params.id;
    const order = await businessOrders.getById(id);
    if(order){
        if(order.buyer === user.email || user.isAdmin){
            const qtyItems = order.items.reduce((prev, curr) => prev + curr.qty, 0);
            res.render('pages/order', {list: order.items, order: order, qtyItems: qtyItems, id_cart: order.id, isAdmin: user.isAdmin});
        }
        else{
            res.render('pages/systemMessage', { message: 'La orden que intentas observar no corresponde a tu usuario', success: false, href: '/ordenes' });
        }
    }
    else{
        res.render('pages/systemMessage', { message: 'La orden que buscas no existe', success: false, href: '/ordenes' });
    }
}

const updateOrder = async (req, res) => {
    const id = req.params.id;
    const { state } = req.body;
    const states = ['Generada', 'Suspendida', 'Cancelada', 'Confirmada', 'En proceso de envio', 'Enviada', 'Pendiente de pago', 'Recibida por el cliente']
    if(state && state == states.find(e => e.toUpperCase() === state.toUpperCase())){
        await businessOrders.updateById(id, {state: state})
        res.render('pages/systemMessage', { message: 'Orden modificada', success: true, href: '/ordenes' });
    }
    else{
        res.render('pages/systemMessage', { message: 'Ingrese correctamente el campo de estado', success: false, href: `/ordenes/${id}` });
    }
}

const deleteOrder = async (req, res) => {
    const user = await userModel.findOne({_id: req.session.passport.user});
    const id = req.params.id;
    if(user.isAdmin){
        await businessOrders.deleteById(id);
        res.render('pages/systemMessage', { message: 'Orden eliminada', success: true, href: '/ordenes' });
    }
    else{
        res.render('pages/systemMessage', { message: 'No posee los suficientes privilegios para realizar ésta acción', success: false, href: '/ordenes' });
    }
}

module.exports = { getOrders, getOrderById, updateOrder, deleteOrder }