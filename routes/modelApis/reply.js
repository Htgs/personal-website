const Router = require('koa-router');

const replyController = require('../../app/controller/http/replyController');

const {resource} = require('../../utils/route');

const reply = new Router({
    prefix: '/reply',
});

// reply
//     .get('/all', replyController['all']);

resource(reply, replyController, {
    // only: ['index'],
    // except: ['show', 'destory'],
});

module.exports = reply;
