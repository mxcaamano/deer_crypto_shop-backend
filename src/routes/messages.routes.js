const { Router } = require("express")
const { getMessages, getMsgsByEmail } = require('../controllers/messages.controller')
const routerMsgs = Router()

routerMsgs.get('/', getMessages)
routerMsgs.get('/mismensajes', getMsgsByEmail)

module.exports = routerMsgs