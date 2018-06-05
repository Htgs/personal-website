const Router = require('koa-router');

const articleController = require('../../app/controller/http/articleController');

const {resource} = require('../../utils/route');

const article = new Router({
    prefix: '/article',
});

// article
//     .get('/all', articleController['all']);

resource(article, articleController, {
    // only: ['index'],
    // except: ['show', 'destory'],
});

module.exports = article;
