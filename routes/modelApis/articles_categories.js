const Router = require('koa-router');

const articles_categoriesController = require('../../app/controller/http/articles_categoriesController');

const {resource} = require('../../utils/route');

const articles_categories = new Router({
    prefix: '/article-category',
});

articles_categories
    .get('/all', articles_categoriesController['all']);

resource(articles_categories, articles_categoriesController, {
    // only: ['index'],
    // except: ['show', 'destory'],
});

module.exports = articles_categories;
