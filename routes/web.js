const Router = require('koa-router');

const authController = require('../app/controller/auth/authController');
const registerController = require('../app/controller/auth/registerController');
const loginController = require('../app/controller/auth/loginController');
const utilController = require('../app/controller/utilController');
const articleController = require('../app/controller/http/articleController');
const articles_categoriesController = require('../app/controller/http/articles_categoriesController');
const commentController = require('../app/controller/http/commentController');

const web = new Router();

web.post('/register', registerController.register);

web.post('/register/check', utilController.check);

web.post('/admin/login', loginController.login);
// 不能获取到ctx的state
web.get('/admin/auth', authController.auth);
// web.get('/admin/logout', loginController.logout);

web.get('/home/articles-categories', articles_categoriesController['all']);// 获取所有文章分类
web.get('/home/article', articleController['index']);// 获取文章列表
web.get('/home/article/:id', articleController['show']);// 获取当前文章信息
web.get('/home/article/:article_id/comment', commentController['getCommentByArticleId']);// 获取当前文章的前10条评论
web.post('/home/article/:article_id/comment', commentController['store']);

module.exports = function (app) {
    app
        .use(web.routes())
        .use(web.allowedMethods())
};
