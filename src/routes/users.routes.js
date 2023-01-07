const { Router } = require("express");
const { getUsers, getUserById, deleteUser } = require("../controllers/users.controller");

const routerUsers = Router()

// routerCarts.post('/', createCart)
routerUsers.get('/', getUsers)
routerUsers.get('/:id', getUserById)
routerUsers.delete('/:id', deleteUser)

module.exports = routerUsers