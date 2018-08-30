const Articles_categories = require('../../models').articles_categories;
const {log} = require('./alogController');
const {setQueryText, setParanoid, pagination, storeOrUpdate, commonRecovery} = require('../../../utils/IQuery');

module.exports = {
    index: async (ctx, next) => {
        let query = setQueryText(ctx, ['name']);
        query = setParanoid(ctx, query);
        ctx.body = await pagination('articles_categories', ctx.request, query);
    },
    store: async (ctx, next) => {
        let res = await storeOrUpdate('articles_categories', ctx.request.fields);
        log(ctx, 'articles_category', 3, `id为${res.id}，名称为${res.name}的文章分类`);
        ctx.body = res;
    },
    show: async (ctx, next) => {
        ctx.body = await Articles_categories.findById(ctx.params.id);
    },
    edit: async (ctx, next) => {
        ctx.body = await Articles_categories.findById(ctx.params.id);
    },
    update: async (ctx, next) => {
        let res = await storeOrUpdate('articles_categories', ctx.request.fields, ctx.params.id);
        log(ctx, 'articles_category', 4, `id为${res.id}，名称为${res.name}的文章分类`);
        ctx.body = res;
    },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let articles_categories = await Articles_categories.findById(ctx.params.id);
        log(ctx, 'articles_category', 5, `id为${articles_categories.id}，名称为${articles_categories.name}的文章分类`);
        ctx.body = await articles_categories.destroy();
    },
    recovery: async (ctx, next) => {
        let res = await Articles_categories.find({
            where: {
                id: ctx.params.id,
            },
            paranoid: false,
        });
        await commonRecovery('articles_categories', ctx.params.id)
            .then(result => {
                log(ctx, 'articles_category', 6, `id为${res.id}，名称为${res.name}的文章分类`);
                if (result[0].changedRows > 0) {
                    ctx.body = 'true';
                } else {
                    ctx.body = 'false';
                }
            });
    },
    all: async (ctx, next) => {
        ctx.body = await Articles_categories.findAll();
    },
}
