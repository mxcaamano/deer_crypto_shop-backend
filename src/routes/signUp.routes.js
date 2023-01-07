const Router = require('express');
const { getSignUp, getFailsignUp, postsignUp } = require('../controllers/signUp.controller');
const { userMiddleware } = require('../middlewares/middlewares.js');
const upload = require('../middlewares/uploadMiddleware');


const routerSignUp = Router();

routerSignUp.get('/', getSignUp);
routerSignUp.post('/', upload.single('image'), userMiddleware, postsignUp);
routerSignUp.get('/error', getFailsignUp);

module.exports = routerSignUp;