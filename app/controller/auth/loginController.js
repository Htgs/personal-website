const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../../config/config');
const User = require('../../models').user;
const {getHash, parseModel} = require('../../../utils/utils');

module.exports = {
    /**
     * 登录接口
     * ctx.request.fields:
     * name 或者 email 或者 phone 三选一 必须
     * password 必须
     * week：是否保持一周登录 可选
     */
    login: async (ctx, next) => {
        let request = ctx.request.fields,
            where = {},
            tokenAliveTime = '1h'; // jwt 默认存活时间 1h
        Object.keys(request).forEach(field => {
            if (field === 'password') {
                // 设置密码
                where[field] = getHash(request[field]);
            } else if (field === 'week') {
                if (request[field] === true) {
                    // 一周内保持登录
                    tokenAliveTime = '7d';
                }
            } else {
                // name || email || phone 字段
                where[field] = request[field];
            }
        });
        try {
            let user = await User.find({
                where: where,
                attributes: {
                    exclude: ['password']
                },
            });
            if (user) {
                user = parseModel(user);
                user['token'] = jwt.sign(user, jwtSecret, {expiresIn: tokenAliveTime});
                ctx.state.user = user;
                ctx.body = user;
            } else {
                ctx.status = 422;
                ctx.body = '账号不存在或者密码不正确';
            }
        } catch (err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err.message;
        }
    },
    // 登出
    logout: async (ctx, next) => {
        console.log(ctx);
        ctx.state = {};
        // if (ctx.state.user) {
        //     ctx.state = {}
        // } else {
        //     ctx.status = 401;
        // }
        ctx.body = 'logout';
    },
}
