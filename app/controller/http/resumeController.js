const Resume = require('../../models').resume;
const {setQueryText, setQueryFilter, pagination, storeOrUpdate} = require('../../../utils/IQuery');

module.exports = {
    index: async (ctx, next) => {
        // let query = setQueryText(ctx, ['title', 'content']);
        // query = setQueryFilter(ctx, ['category_id', 'is_public'], query);
        let query = {};
        ctx.body = await pagination('resume', ctx.request, query);
    },
    store: async (ctx, next) => {
        ctx.body = await storeOrUpdate('resume', ctx.request.fields);
    },
    show: async (ctx, next) => {
        ctx.body = await Resume.findById(ctx.params.id);
    },
    edit: async (ctx, next) => {
        ctx.body = await Resume.findById(ctx.params.id);
    },
    update: async (ctx, next) => {
        ctx.body = await storeOrUpdate('resume', ctx.request.fields, ctx.params.id);
    },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let resume = await Resume.findById(ctx.params.id);
        ctx.body = await resume.destroy();
    },
}
