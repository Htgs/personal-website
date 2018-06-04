const User = require('../../models').user;
const {getHash, uploadFile} = require('../../../utils/utils');
const {setQueryText, pagination, storeOrUpdate} = require('../../../utils/IQuery');
const q = {
	attributes: {
		exclude: ['password']
	},
    order: [['id', 'DESC']],
    include: [
        // { model: Profile, required: true}
    ],
}
module.exports = {
    index: async (ctx, next) => {
        let query = setQueryText(ctx, ['name'], q);
        ctx.body = await pagination('user', ctx.request, query);
    },
    store: async (ctx, next) => {
        ctx.body = await storeOrUpdate('user', ctx.request.body);
    },
    show: async (ctx, next) => {
        ctx.body = await User.findById(ctx.params.id);
    },
    edit: async (ctx, next) => {
        ctx.body = await User.findById(ctx.params.id);
    },
    update: async (ctx, next) => {
        let request = ctx.request.fields;
            data = {};
        let avatar = await User.findById(ctx.params.id).avatar;
        Object.keys(request).forEach(field => {
            if (field === 'avatar') {
                data[field] = uploadFile(request[field][0], avatar);
            } else if (field === 'password') {
                data[field] = getHash(request[field]);
            } else {
                data[field] = request[field];
            }
        });
        // console.log(data);
        // ctx.body = await storeOrUpdate('user', ctx.request.body, ctx.params.id);
    },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let user = await User.findById(ctx.params.id);
        ctx.body = await user.destroy();
    },
}
