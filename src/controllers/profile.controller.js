const businessUsers = require('../business/businessUsers')
const logger = require('../utils/logger');

const getProfile = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await businessUsers.getById(req.session.passport.user);
    res.render('pages/profile', { user: user })
}

module.exports = getProfile