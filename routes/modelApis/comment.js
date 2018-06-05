const Router = require('koa-router');

const commentController = require('../../app/controller/http/commentController');

const {resource} = require('../../utils/route');

const comment = new Router({
    prefix: '/comment',
});

// comment
//     .get('/all', commentController['all']);

resource(comment, commentController, {
    // only: ['index'],
    // except: ['show', 'destory'],
});

module.exports = comment;
