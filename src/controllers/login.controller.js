const logger = require('../utils/logger')

const getLogin = (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.render('pages/login', { email: process.env.TEST_USER, password: process.env.TEST_PASS });
}

const getFailLogin = (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
  res.render('pages/loginError')
}
  
module.exports = { getLogin, getFailLogin };