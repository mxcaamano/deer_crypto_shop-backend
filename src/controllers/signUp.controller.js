const logger = require('../utils/logger');

const getSignUp = (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
  res.render('pages/signUp');
};

const getFailsignUp = (req, res) => {
  res.render('pages/signUpError')
}

module.exports = { getSignUp, getFailsignUp };