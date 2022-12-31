const { Router } = require("express")
const { getMessages } = require('../controllers/messages.controller')
const routerMsgs = Router()

routerMsgs.get('/', getMessages)

module.exports = routerMsgs