const Comment = require('../../models').comment;
const {setQueryText, pagination, storeOrUpdate} = require('../../../utils/IQuery');

module.exports = {
    index: async (ctx, next) => {
        let query = setQueryText(ctx, ['content']);
        ctx.body = await pagination('comment', ctx.request, query);
    },
    store: async (ctx, next) => {
        ctx.body = await storeOrUpdate('comment', ctx.request.fields);
    },
    show: async (ctx, next) => {
        ctx.body = await Comment.findById(ctx.params.id);
    },
    edit: async (ctx, next) => {
        ctx.body = await Comment.findById(ctx.params.id);
    },
    update: async (ctx, next) => {
        ctx.body = await storeOrUpdate('comment', ctx.request.fields, ctx.params.id);
    },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let comment = await Comment.findById(ctx.params.id);
        ctx.body = await comment.destroy();
    },
}