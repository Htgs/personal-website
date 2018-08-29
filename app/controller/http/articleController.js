const Article = require('../../models').article;
const User = require('../../models').user;
const Articles_categories = require('../../models').articles_categories;
const {log} = require('./alogController');
const {htmlEncode, uploadFile, deleteFile} = require('../../../utils/utils');
const {setQueryText, setQueryFilter, setParanoid, pagination, storeOrUpdate} = require('../../../utils/IQuery');

const q = {
    order: [['id', 'DESC']],
    include: [
        {
            model: User,
            attributes: ['id', 'name', 'niname'],
        },
        {
            model: Articles_categories,
            attributes: ['id', 'name'],
        },
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
    // 文章图片上传处理
    uploadImage: async (ctx, next) => {
        const {fields} = ctx.request;
        let res = {};
        for (let i in fields) {
            const url = await uploadFile(fields[i][0]);
            res[i] = url;
        }
        ctx.body = res;
    },
    // 处理需要删除的图片
    deleteImage: async (ctx, next) => {
        const {images} = ctx.request.fields;
        console.log(images);
        ctx.body = await deleteFile(images);
    },
}
