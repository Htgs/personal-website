const Router = require('koa-router');

const api = new Router();

// const authController = require('../app/controller/auth/authController');
const loginController = require('../app/controller/auth/loginController');
const menus = require('../app/controller/http/menusController');
const modelApis = require('./modelApis');

// Object.keys(modelApis).forEach(key => {
//     api.use('/api', modelApis[key].routes(), modelApis[key].allowedMethods());
// });

// 由于web的路由不能获取ctx.state
// api.get('/admin/auth', authController.auth);
api.get('/admin/logout', loginController.logout);

api.get('/api/:type/menu', menus['getMenus']);

Object.keys(modelApis).forEach(key => {
    api.use('/api/admin', modelApis[key].routes(), modelApis[key].allowedMethods());
});

module.exports = function (app) {
    app
        .use(api.routes())
        .use(api.allowedMethods());
};

