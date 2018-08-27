const User = require('../../models').user;
const {getHash, uploadFile} = require('../../../utils/utils');
const {setQueryText, setQueryOrder, setParanoid, pagination, storeOrUpdate} = require('../../../utils/IQuery');
const {isString, parseModel} = require('../../../utils/utils');
const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../../config/config');
const {log} = require('./alogController');

const q = {
	attributes: {
		exclude: ['password']
	},
    order: [['id', 'DESC']],
    // include: [
    //     { model: Profile, required: true}
    // ],
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
        let query = setQueryText(ctx, ['name'], q);
        query = setQueryOrder(ctx, ['birth_date'], query);
        query = setParanoid(ctx, query);
        console.log(ctx.state);
        ctx.body = await pagination('user', ctx.request, query);
    },
    store: async (ctx, next) => {
        let data = await userStoreOrUpdate(ctx.request.fields);
        let user = await storeOrUpdate('user', data);
        log(ctx, 'user', 3, `id为${user.id}，用户名为${user.name}的用户`);
        let query = {
            where: {
                id: user.id,
            },
            ...q,
        };
        ctx.body = await User.find(query);
    },
    show: async (ctx, next) => {
        let query = {
            where: {
                id: ctx.params.id,
            },
            ...q,
        };
        query = setParanoid(ctx, query);
        ctx.body = await User.find(query);
    },
    edit: async (ctx, next) => {
        let query = {
            where: {
                id: ctx.params.id,
            },
            ...q,
        };
        ctx.body = await User.find(query);
    },
    update: async (ctx, next) => {
        let data = await userStoreOrUpdate(ctx.request.fields, ctx.params.id);
        let user = await storeOrUpdate('user', data, ctx.params.id);
        log(ctx, 'user', 4, `id为${user.id}，用户名为${user.name}的用户`);
        let query = {
            where: {
                id: user.id,
            },
            ...q,
        };
        ctx.body = await User.find(query);
    },
    destory: async (ctx, next) => {
        // 前端判断关联关系，存在关联关系时不能删除
        let user = await User.findById(ctx.params.id);
        log(ctx, 'user', 5, `id为${user.id}，用户名为${user.name}的用户`);
        ctx.body = await user.destroy();
    },
    userinfo: async (ctx, next) => {
        // 处理auth的用户信息。
        let {user} = ctx.state,
            fields = {};
        //     sign = ctx.request.fields.sign;
        // for (let i in ctx.request.fields) {
        //     if (i === 'sign') break;
        //     fields[i] = ctx.request.fields[i];
        // }
        // if (sign === getHash(JSON.stringify(user))) {
        let data = await userStoreOrUpdate(fields, user.id);
        await storeOrUpdate('user', data, user.id);
        let query = {
            where: {
                id: user.id,
            },
            ...q,
        };
        let res = await User.find(query);
        res = parseModel(res);
        const sign = getHash(JSON.stringify(user));
        res['token'] = jwt.sign(res, jwtSecret + sign, {expiresIn: '1h'});
        res['sign'] = sign;
        ctx.state.user = {
            ...ctx.state.user,
            ...res,
        }
        ctx.body = res;
    },
}
