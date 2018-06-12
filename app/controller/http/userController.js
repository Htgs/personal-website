const User = require('../../models').user;
const {getHash, uploadFile} = require('../../../utils/utils');
const {setQueryText, pagination, storeOrUpdate} = require('../../../utils/IQuery');
const {isString} = require('../../../utils/utils');
const q = {
	attributes: {
		exclude: ['password']
	},
    order: [['id', 'DESC']],
    include: [
        // { model: Profile, required: true}
    ],
};

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
    } else {
        data['password'] = getHash('000000');
    }
    Object.keys(request).forEach(field => {
        if (field === 'avatar' && request[field]) {
            if (isString(request[field])) {
                data[field] = request[field];
            } else {
                data[field] = uploadFile(request[field][0], user.avatar);
            }
        } else {
            data[field] = request[field];
        }
    });
    return data;
}

module.exports = {
    index: async (ctx, next) => {
        console.log(q);
        let query = setQueryText(ctx, ['name'], q);
        console.log(q);
        console.log(query);
        ctx.body = await pagination('user', ctx.request, query);
    },
    store: async (ctx, next) => {
        let data = await userStoreOrUpdate(ctx.request.fields);
        let user = await storeOrUpdate('user', data);
        let query = {
            where: {
                id: user.id,
            },
            ...q,
        }
        ctx.body = await User.find(query);
    },
    show: async (ctx, next) => {
        let query = {
            where: {
                id: ctx.params.id,
            },
            ...q,
        }
        ctx.body = await User.find(query);
    },
    edit: async (ctx, next) => {
        let query = {
            where: {
                id: ctx.params.id,
            },
            ...q,
        }
        ctx.body = await User.find(query);
    },
    update: async (ctx, next) => {
        let data = await userStoreOrUpdate(ctx.request.fields, ctx.params.id);
        let user = await storeOrUpdate('user', data, ctx.params.id);
        let query = {
            where: {
                id: user.id,
            },
            ...q,
        }
        ctx.body = await User.find(query);
    },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let user = await User.findById(ctx.params.id);
        ctx.body = await user.destroy();
    },
}
