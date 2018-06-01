const Router = require('koa-router');

const utilController = require('../app/controller/utilController');

const util = new Router();

util.post('/:model/check', utilController.check);

module.exports = function (app) {
    app
        .use(util.routes())
        .use(util.allowedMethods());
};

