const businessMessages = require('../business/businessMessages');
const logger = require('../utils/logger');
const formatDate = require('../utils/formatDate')

module.exports = 
async socket =>  {
    let chat = await businessMessages.getAll();    

    logger.info('New user connected: ', socket.id)

    const message = {
        id: socket.id,
        message: 'Welcome to the app',
        chat
    }

    socket.emit('message-server', message)

    const chatMsg = {
        id: socket.id,
        chat
      }
      socket.on('add-msg', async data => {
        const msg = {...data, date: formatDate(new Date())}
        chat.push(msg)
        await businessMessages.save(msg)
        socket.emit( 'arrMsg' ,chatMsg)
      })
      socket.emit('arrMsg', chatMsg)

    socket.on('disconnect', () => {
        logger.info('usuario desconectado: ', socket.id)
    })
}