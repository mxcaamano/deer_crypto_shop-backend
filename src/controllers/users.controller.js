const businessUsers = require('../business/businessUsers');
const businessCarts = require('../business/businessCarts')
const logger = require('../utils/logger');

const getUsers = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const userAdmin = await businessUsers.getById(req.session.passport.user)
    if(userAdmin.isAdmin){
        const users = await businessUsers.getAll();
        let state = null
        users.length ? state = true : state = false
        res.render('pages/users', {listExist: state, list: users });
    }
    else{
        res.render('pages/systemMessage', { message: 'No posee los suficientes privilegios para realizar ésta acción', success: false, href: `` });
    }
}

const getUserById = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`);
    const userAdmin = await businessUsers.getById(req.session.passport.user);
    if(userAdmin.isAdmin){
        const id = req.params.id;
        const user = await businessUsers.getById(id);
        user ? res.render('pages/user', { user: user }) : res.render('pages/systemMessage', { message: 'El usuario que intentas buscar no existe', success: false, href: `/usuarios` })
    }
    else{
        res.render('pages/systemMessage', { message: 'No posee los suficientes privilegios para realizar ésta acción.', success: false, href: `` });
    }
}

const deleteUser = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`);
    const user = await businessUsers.getById(req.session.passport.user);
    if(user.isAdmin){
        const id = req.params.id;
        const userDelete = await businessUsers.getById(req.params.id)
        const cartDelete = await businessCarts.getByEmail(userDelete.email)
        if(userDelete && user.id !== userDelete.id){
            cartDelete && await businessCarts.deleteById(cartDelete.id)
            await businessUsers.deleteById(id)
            res.redirect('/usuarios')
        }
        else{
            res.render('pages/systemMessage', { message: 'No es posible eliminar el usuario seleccionado, compruebe el ID de usuario que desea eliminar', success: false, href: `usuarios` }); 
        }
    }
    else{
        res.render('pages/systemMessage', { message: 'No posee los suficientes privilegios para realizar ésta acción', success: false, href: `` });

    }
}


module.exports = { getUsers, getUserById, deleteUser }