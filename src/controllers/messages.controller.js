const userModel = require('../models/user.model');
const messagesModel = require('../models/messages.model');
const logger = require('../utils/logger')

// const businessMessages = require('../business/businessMessages');
// const containerChats = businessMessages;

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

const postMessage = async (req, res) => {
  try {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const { name, email, text, avatar } = req.body
    const message = {author: {id: email, alias: name, avatar: avatar}, text: text}
    await messagesModel.create(message)
    res.status(200).json({message: "Mensaje enviado"})
  } catch(error){
    logger.error(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    res.status(404).json({error: error.message})
  }
}

module.exports = { getMessages, postMessage }