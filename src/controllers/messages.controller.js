const userModel = require('../models/user.model');
const logger = require('../utils/logger')

const getMessages = async (req, res) => {
  try {
    const id = req.session.passport.user
    const user = await userModel.findOne({_id: id});
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.render('pages/messages', {name: user.name, email: user.email, imgURL: user.imgURL});
  } catch(error){
    logger.error(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.status(401).json({error: error.message})
  }
}


module.exports = { getMessages }