const Router = require('koa-router');

const api = new Router();

const menus = require('../app/controller/http/menusController');
const permission = require('../app/middleware/permission');
const modelApis = require('./modelApis');

// Object.keys(modelApis).forEach(key => {
//     api.use('/api', modelApis[key].routes(), modelApis[key].allowedMethods());
// });

// api.use(permission);

api.get('/api/:type/menu', menus['getMenus']);

Object.keys(modelApis).forEach(key => {
    api.use('/api/admin', modelApis[key].routes(), modelApis[key].allowedMethods());
});

module.exports = function (app) {
    app
        .use(api.routes())
        .use(api.allowedMethods());
};

