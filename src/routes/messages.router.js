const { Router } = require("express")
const { getMessages, postMessage } = require('../controllers/messages.controller')
// const { authMiddleware } = require('../middlewares/middlewares');

const routerMsgs = Router()

routerMsgs.get('/', getMessages)
routerMsgs.post('/', postMessage)

module.exports = routerMsgs