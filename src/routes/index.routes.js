const Router = require('express')
const router = Router();
const routerProducts = require('./products.routes');
const routerCarts = require('./carts.routes');
const routerMsgs = require('./messages.routes');
const routerLogin = require('./login.routes');
const routerLogout = require('./logout.routes');
const routerSignUp = require('./signUp.routes');
const routerProfile = require('./profile.routes');
const routerOrders = require('./orders.routes');
const routerUsers = require('./users.routes')
const logger = require('../utils/logger');
const { authMiddleware } = require('../middlewares/middlewares');

router.use('/productos', routerProducts);
router.get('/', (req, res) => {
  logger.info(`Ruta: ${req.originalUrl}, Método: ${req.method}`)
  res.redirect('/productos')
});
router.use('/carrito', authMiddleware, routerCarts);
router.use('/chat', authMiddleware, routerMsgs);
router.use('/login', routerLogin);
router.use('/logout', routerLogout);
router.use('/signUp', routerSignUp);
router.use('/perfil', authMiddleware, routerProfile);
router.use('/ordenes', authMiddleware, routerOrders);
router.use('/usuarios', authMiddleware, routerUsers);
router.get("*", authMiddleware, (req, res) => {
  logger.warn(`La ruta ${req.path} ${req.method} no está implementada`);
  res.render('pages/404error')
  // res.status(404).json({message: `La ruta ${req.method} ${req.url} no está implementada`})
})

module.exports = router


