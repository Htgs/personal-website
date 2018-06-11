const Router = require('koa-router');

const utilController = require('../app/controller/utilController');

const util = new Router();

util.post('/api/:model/check', utilController.check);

util.post('/api/admin/:model/check', utilController.check);

module.exports = function (app) {
    app
        .use(util.routes())
        .use(util.allowedMethods());
};

