const Sequelize = require('sequelize');
const Comment = require('../../models').comment;
const Article = require('../../models').article;
const {log} = require('./alogController');
const {parseModel} = require('../../../utils/utils');
const {setQueryText, setParanoid, pagination, storeOrUpdate, commonRecovery} = require('../../../utils/IQuery');

const q = {
    order: [['id', 'DESC']],
    // include: [
    //     {
    //         model: Comment,
    //     }
    // ],
    raw: true, // 原生查询结果
};


module.exports = {
    index: async (ctx, next) => {
        let query = setQueryText(ctx, ['content'], q);
        query = setParanoid(ctx, query);
        ctx.body = await pagination('comment', ctx.request, query);
    },
    store: async (ctx, next) => {
        let res = await storeOrUpdate('comment', ctx.request.fields);
        res = parseModel(res);
        delete res.user_email;
        ctx.body = res;
    },
    show: async (ctx, next) => {
        ctx.body = await Comment.findById(ctx.params.id);
    },
    // edit: async (ctx, next) => {
    //     ctx.body = await Comment.findById(ctx.params.id);
    // },
    // update: async (ctx, next) => {
    //     ctx.body = await storeOrUpdate('comment', ctx.request.fields, ctx.params.id);
    // },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let comment = await Comment.findById(ctx.params.id);
        ctx.body = await comment.destroy();
    },
    recovery: async (ctx, next) => {
        let res = await Comment.find({
            where: {
                id: ctx.params.id,
            },
            paranoid: false,
        });
        await commonRecovery('comments', ctx.params.id)
            .then(result => {
                log(ctx, 'comment', 6, `id为${res.id}，名称为${res.content}的文章分类`);
                if (result[0].changedRows > 0) {
                    ctx.body = 'true';
                } else {
                    ctx.body = 'false';
                }
            });
    },
    // 根据文章id来获取评论
    getCommentByArticleId: async (ctx, next) => {
        const {article_id} = ctx.params;
        let query = {
            ...q,
            attributes: {
                exclude: ['user_email'],
            },
            include: [
                {
                    model: Article,
                    attributes: ['id'],
                    where: {
                        id: article_id,
                    },
                },
            ],
            paranoid: false,
        };
        let res = await Comment.findAll(query);
        res = parseModel(res);
        ctx.body = res.map(item => {
            if (item.deleted_at) {
                item.content = '该评论已删除';
            }
            return item;
        });
    },
}