const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../../config/config');
const {getHash} = require('../../../utils/utils');
const User = require('../../models').user;

module.exports = {
    // 验证用户是否登录
    auth: async (ctx, next) => {
        // 步骤应该是:
        // 1.验证token是否过期
        // 2.验证token是否被修改或者伪造
        // 3.验证用户存在于数据库
        try {
            const token = ctx.headers.authorization,
                    sign = ctx.headers.sign;
            if (token && sign) {
                let payload = await jwt.verify(token.split(' ')[1], jwtSecret);
                let now = new Date().getTime();
                // UNIX时间与js的时间对比，是否过期
                if (now > (payload.iat * 1000) || now < (payload.exp * 1000)) {
                    // 未过期
                    // 处理payload的字段
                    let user = {};
                    for (let i in payload) {
                        if (i === 'iat' || i === 'exp' || i === 'sign') break;
                        user[i] = payload[i];
                    }
                    let n = getHash(JSON.stringify(user));
                    // 判断token是否伪造
                    if (sign === getHash(JSON.stringify(user)) && sign === payload.sign) {
                        let res = await User.find({
                            where: {
                                id: user.id,
                            },
                            attributes: {
                                exclude: ['password'],
                            },
                        });
                        ctx.state.user = res;
                        ctx.body = res;
                    } else {
                        ctx.status = 401;
                    }
                } else {
                    // 已经过期
                    ctx.status = 401;
                }
            } else {
                ctx.status = 401;
            }
        } catch (err) {
            if (err.message === 'jwt expired') {
                ctx.status = 401;
            } else {
                ctx.status = 500;
                ctx.body = err.message;
            }
        }
    },
}