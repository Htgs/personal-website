const Articles_categories = require('../../models').articles_categories;
const {setQueryText, setParanoid, pagination, storeOrUpdate} = require('../../../utils/IQuery');

module.exports = {
    index: async (ctx, next) => {
        let query = setQueryText(ctx, ['name']);
        query = setParanoid(ctx, query);
        ctx.body = await pagination('articles_categories', ctx.request, query);
    },
    store: async (ctx, next) => {
        ctx.body = await storeOrUpdate('articles_categories', ctx.request.fields);
    },
    show: async (ctx, next) => {
        ctx.body = await Articles_categories.findById(ctx.params.id);
    },
    edit: async (ctx, next) => {
        ctx.body = await Articles_categories.findById(ctx.params.id);
    },
    update: async (ctx, next) => {
        ctx.body = await storeOrUpdate('articles_categories', ctx.request.fields, ctx.params.id);
    },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let articles_categories = await Articles_categories.findById(ctx.params.id);
        ctx.body = await articles_categories.destroy();
    },
    all: async (ctx, next) => {
        ctx.body = await Articles_categories.findAll();
    },
}
