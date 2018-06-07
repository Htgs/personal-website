const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../../config/config');

module.exports = {
    // 验证用户是否登录
    auth: async (ctx, next) => {
        try {
            console.log(ctx);
            const token = ctx.headers.authorization;
            if (token) {
                let payload = await jwt.verify(token.split(' ')[1], jwtSecret);
                let now = new Date().getTime()
                // UNIX时间与js的时间对比，是否过期
                if (now > (payload.iat * 1000) || now < (payload.exp * 1000)) {
                    // 未过期
                    ctx.body = payload
                } else {
                    // 已经过期
                    ctx.status = 401;
                }
            } else {
                ctx.status = 401;
            }
        } catch (err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err.message;
        }
    },
}