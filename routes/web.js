const Router = require('koa-router');

const authController = require('../app/controller/auth/authController');
const registerController = require('../app/controller/auth/registerController');
const loginController = require('../app/controller/auth/loginController');
const utilController = require('../app/controller/utilController');

const web = new Router();

web.post('/register', registerController.register);

web.post('/register/check', utilController.check);

web.get('/admin/auth', authController.auth);
web.post('/admin/login', loginController.login);
web.get('/admin/logout', loginController.logout);

module.exports = function (app) {
    app
        .use(web.routes())
        .use(web.allowedMethods())
};
