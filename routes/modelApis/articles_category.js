const Router = require('koa-router');

const articles_categoryController = require('../../app/controller/http/articles_categoryController');

const {resource} = require('../../utils/route');

const articles_category = new Router({
    prefix: '/articles_category',
});

// articles_category
//     .get('/all', articles_categoryController['all']);

resource(articles_category, articles_categoryController, {
    // only: ['index'],
    // except: ['show', 'destory'],
});

module.exports = articles_category;
