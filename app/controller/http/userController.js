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

/**
 * 新增或者更新的用户处理
 * @param {Object} request 前端请求数据
 * @param {Number||String} id 当前数据id
 */
async function userStoreOrUpdate(request, id) {
    let data = {},
        user = {};
    if (id) {
        user = await User.findById(id);
    }
    Object.keys(request).forEach(field => {
        if (field === 'avatar') {
            data[field] = uploadFile(request[field][0], user.avatar);
        } else if (field === 'password') {
            data[field] = getHash(request[field]);
        } else {
            data[field] = request[field];
        }
    });
    return data;
}

module.exports = {
    index: async (ctx, next) => {
        let query = setQueryText(ctx, ['name'], q);
        ctx.body = await pagination('user', ctx.request, query);
    },
    store: async (ctx, next) => {
        let data = await userStoreOrUpdate(ctx.request.fields);
        ctx.body = await storeOrUpdate('user', data);
    },
    show: async (ctx, next) => {
        ctx.body = await User.findById(ctx.params.id);
    },
    edit: async (ctx, next) => {
        ctx.body = await User.findById(ctx.params.id);
    },
    update: async (ctx, next) => {
        let data = await userStoreOrUpdate(ctx.request.fields, ctx.params.id);
        ctx.body = await storeOrUpdate('user', data, ctx.params.id);
    },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let user = await User.findById(ctx.params.id);
        ctx.body = await user.destroy();
    },
}