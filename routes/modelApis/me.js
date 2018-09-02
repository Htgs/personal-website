const Router = require('koa-router');

const meController = require('../../app/controller/http/meController');

const {resource} = require('../../utils/route');

const me = new Router({
    prefix: '/me',
});

me
    // .post('/user-info', userController['userinfo']);

resource(me, meController, {
    only: ['store', 'show'],
    // except: ['show', 'destory'],
});

module.exports = me;
