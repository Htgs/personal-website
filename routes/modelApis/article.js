const Router = require('koa-router');

const articleController = require('../../app/controller/http/articleController');

const {resource} = require('../../utils/route');

const article = new Router({
    prefix: '/article',
});

article
    .post('/image', articleController['uploadImage'])
    .post('/image/delete', articleController['deleteImage']);

resource(article, articleController, {
    // only: ['index'],
    // except: ['show', 'destory'],
});

module.exports = article;
