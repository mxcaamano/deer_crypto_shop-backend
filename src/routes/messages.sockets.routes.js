const logger = require('../utils/logger');
const { getMsgsWS, postMsgWS }= require('../controllers/messages.controller');

chats = async (socket,io) =>{
    logger.info('Usuario conectado: '+ socket.id);
    await getMsgsWS(io);

    socket.on('postMsg', async (data) => {
        await postMsgWS(data);
        await getMsgsWS(io);        
      })

    socket.on('disconnect', () => {
        logger.info('Usuario desconectado: '+ socket.id)
    })
}

module.exports = chats
