const Reply = require('../../models').reply;
const {setQueryText, setQueryFilter, pagination, storeOrUpdate} = require('../../../utils/IQuery');

module.exports = {
    index: async (ctx, next) => {
        let query = setQueryText(ctx, ['content']);
        ctx.body = await pagination('reply', ctx.request, query);
    },
    store: async (ctx, next) => {
        ctx.body = await storeOrUpdate('reply', ctx.request.fields);
    },
    show: async (ctx, next) => {
        ctx.body = await Reply.findById(ctx.params.id);
    },
    edit: async (ctx, next) => {
        ctx.body = await Reply.findById(ctx.params.id);
    },
    update: async (ctx, next) => {
        ctx.body = await storeOrUpdate('reply', ctx.request.fields, ctx.params.id);
    },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let reply = await Reply.findById(ctx.params.id);
        ctx.body = await reply.destroy();
    },
}
