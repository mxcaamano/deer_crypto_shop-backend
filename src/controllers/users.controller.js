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
    // users 
    // ? res.json(users)
    // : res.status(400).json({ error: 'No posee los suficientes privilegios para realizar ésta acción' });
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
    // return user 
    // ? res.json(user) 
    // : res.status(400).json({ error: 'No posee los suficientes privilegios para realizar ésta acción' });
}

const deleteUser = async (req, res) => {
    const user = await businessUsers.getById(req.session.passport.user);
    if(user.isAdmin){
        const id = req.params.id;
        const userDelete = await businessUsers.getById(req.params.id)
        const cartDelete = await businessCarts.getByEmail(userDelete.email)
        if(userDelete && user.id !== userDelete.id){
            await businessUsers.deleteById(id)
            await businessCarts.deleteById(cartDelete.id)
            res.redirect('/usuarios') // res.status(200).json({ message: 'Producto eliminado' })
        }
        else{
            res.render('pages/systemMessage', { message: 'No es posible eliminar el usuario seleccionado, compruebe el ID de usuario que desea eliminar', success: false, href: `usuarios` }); 
            // res.status(400).json({ message: 'El producto que intentas eliminar no existe' })
        }
    }
    else{
        res.render('pages/systemMessage', { message: 'No posee los suficientes privilegios para realizar ésta acción', success: false, href: `` });
        // res.status(403).json({ error: 'No posee privilegios para realizar esta operación' });
    }
}


module.exports = { getUsers, getUserById, deleteUser }