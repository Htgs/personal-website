const Router = require('koa-router');

const userController = require('../../app/controller/http/userController');

const {resource} = require('../../utils/route');

const user = new Router({
    prefix: '/user',
});

user
    .post('/user-info', userController['userinfo']);

resource(user, userController, {
    // only: ['index'],
    // except: ['show', 'destory'],
});

module.exports = user;
