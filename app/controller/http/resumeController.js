const Resume = require('../../models').resume;
const {setQueryText, setQueryFilter, pagination, storeOrUpdate} = require('../../../utils/IQuery');

module.exports = {
    index: async (ctx, next) => {
        ctx.body = 'index';
        // let query = setQueryText(ctx, ['title', 'content']);
        // query = setQueryFilter(ctx, ['category_id', 'is_public'], query);
        // ctx.body = await pagination('article', ctx.request, query);
    },
    store: async (ctx, next) => {
        ctx.body = 'store';
        // let request = ctx.request.fields;
        // request['content'] = htmlEncode(request['content']);
        // ctx.body = await storeOrUpdate('article', request);
    },
    show: async (ctx, next) => {
        ctx.body = 'show';
        // ctx.body = await Article.findById(ctx.params.id);
    },
    edit: async (ctx, next) => {
        ctx.body = 'edit';
        // ctx.body = await Article.findById(ctx.params.id);
    },
    update: async (ctx, next) => {
        ctx.body = 'update';
        // let request = ctx.request.fields;
        // request['content'] = htmlEncode(request['content']);
        // ctx.body = await storeOrUpdate('article', ctx.request.fields, ctx.params.id);
    },
    destory: async (ctx, next) => {
        ctx.body = 'destory';
        // // 前端判断关联关系，存在关联关系时不能删除
        // let article = await Article.findById(ctx.params.id);
        // ctx.body = await article.destroy();
    },
}
