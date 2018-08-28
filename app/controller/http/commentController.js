const Comment = require('../../models').comment;
const Article = require('../../models').article;
const {setQueryText, setParanoid, pagination, storeOrUpdate} = require('../../../utils/IQuery');

const q = {
    order: [['id', 'DESC']],
    include: [
        {
            model: Comment,
        }
    ],
    raw: true, // 原生查询结果
};


module.exports = {
    index: async (ctx, next) => {
        let query = setQueryText(ctx, ['content'], q);
        query = setParanoid(ctx, query);
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
    // 根据文章id来获取评论
    getCommentByArticleId: async (ctx, next) => {
        const {article_id} = ctx.params;
        let query = {
            ...q,
            include: [
                {
                    model: Article,
                    attributes: ['id'],
                    where: {
                        id: article_id,
                    },
                },
            ],
        }
        ctx.body = await pagination('comment', ctx.request, query);
    },
}