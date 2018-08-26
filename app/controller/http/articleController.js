const Article = require('../../models').article;
const User = require('../../models').user;
const {log} = require('./alogController');
const {htmlEncode} = require('../../../utils/utils');
const {setQueryText, setQueryFilter, setParanoid, pagination, storeOrUpdate} = require('../../../utils/IQuery');

const q = {
    order: [['id', 'DESC']],
    include: [
        {
            model: User,
            attributes: ['id', 'name', 'niname'],
        }
    ],
    raw: true, // 原生查询结果
};

module.exports = {
    index: async (ctx, next) => {
        let query = setQueryText(ctx, ['title', 'content'], q);
        query = setQueryFilter(ctx, ['category_id', 'is_public'], query);
        query = setParanoid(ctx, query);
        ctx.body = await pagination('article', ctx.request, query);
    },
    store: async (ctx, next) => {
        let request = ctx.request.fields;
        request['user_id'] = ctx.state.user.id;
        request['content'] = htmlEncode(request['content']);
        let res = await storeOrUpdate('article', request);
        log(ctx, 'article', 3, `id为${res.id}，名称为${res.title}的文章`);
        ctx.body = res;
    },
    show: async (ctx, next) => {
        let query = {
            where: {
                id: ctx.params.id,
            },
            ...q,
        };
        query = setParanoid(ctx, query);
        ctx.body = await Article.find(query);
    },
    edit: async (ctx, next) => {
        ctx.body = await Article.findById(ctx.params.id);
    },
    update: async (ctx, next) => {
        let request = ctx.request.fields;
        request['content'] = htmlEncode(request['content']);
        let res = await storeOrUpdate('article', request, ctx.params.id);
        log(ctx, 'article', 4, `id为${res.id}，名称为${res.title}的文章`);
        ctx.body = res;
    },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let article = await Article.findById(ctx.params.id);
        log(ctx, 'article', 5, `id为${article.id}，名称为${article.title}的文章`);
        ctx.body = await article.destroy();
    },
}
