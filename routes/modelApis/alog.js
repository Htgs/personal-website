const Router = require('koa-router');

const alogController = require('../../app/controller/http/alogController');

const {resource} = require('../../utils/route');

const alog = new Router({
    prefix: '/alog',
});

resource(alog, alogController, {
    only: ['index'],
});

module.exports = alog;
