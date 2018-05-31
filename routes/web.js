const Router = require('koa-router');

const authController = require('../app/controller/auth/authController');
const registerController = require('../app/controller/auth/registerController');
const loginController = require('../app/controller/auth/loginController');

const web = new Router();

web.get('/auth', authController.auth);

web.post('/register', registerController.register);

web.post('/login', loginController.login);

module.exports = function (app) {
    app
        .use(web.routes())
        .use(web.allowedMethods())
};
