const userModel = require('../models/user.model');
const logger = require('../utils/logger')
const businessMessages = require('../business/businessMessages');
const formatDate = require('../utils/formatDate');

const getMessages = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await userModel.findOne({_id: req.session.passport.user});
    if(user.isAdmin){
      res.render('pages/messages', {sessionId: req.session.passport.user});
    }
    else{
      res.render('pages/messages', {sessionId: req.session.passport.user});
    }
  }

const getMsgsByEmail = async (req, res) => {
    logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
    const user = await userModel.findOne({_id: req.session.passport.user});
    const messages = await businessMessages.getByEmail(user.email);
    let state = null;
    messages.length ? state = true : state = false
    res.render('pages/userMessages', { listExist: state, list: messages });
  }

const getMsgsWS = async (io) => {
  const chat = await businessMessages.getAll();
  chat.length ? await io.emit('getMsgs', { chat }) : await io.emit('getMsgs', {})
}

const postMsgWS = async (data) => {
  const user = await userModel.findOne({_id: data.sessionId});
  user.isAdmin && (user.name += ' (Administrador)')
  const author = {id: user.email, alias: user.name, avatar: user.imgURL}
  const msg = {author: author, text: data.text, date: formatDate(new Date())}
  await businessMessages.save(msg)
  }

module.exports = { getMessages, getMsgsByEmail, getMsgsWS, postMsgWS }