const Router = require('koa-router');

const api = new Router();

const modelApis = require('./modelApis');

// Object.keys(modelApis).forEach(key => {
//     api.use('/api', modelApis[key].routes(), modelApis[key].allowedMethods());
// });

Object.keys(modelApis).forEach(key => {
    api.use('/api/admin', modelApis[key].routes(), modelApis[key].allowedMethods());
});

module.exports = function (app) {
    app
        .use(api.routes())
        .use(api.allowedMethods());
};

