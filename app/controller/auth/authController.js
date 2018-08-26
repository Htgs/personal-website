const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../../../config/config');

module.exports = {
    // 验证用户是否登录
    auth: async (ctx, next) => {
        console.log(ctx.state.user);
        try {
            const token = ctx.headers.authorization;
            if (token) {
                let payload = await jwt.verify(token.split(' ')[1], jwtSecret);
                let now = new Date().getTime()
                // UNIX时间与js的时间对比，是否过期
                if (now > (payload.iat * 1000) || now < (payload.exp * 1000)) {
                    // 未过期
                    ctx.state.user = payload;
                    ctx.body = payload;
                    // if (ctx.state.user === payload) {
                    //     // 服务器需要用state来判断用户登录信息是否正确
                    //     ctx.body = payload;
                    // } else {
                    //     ctx.body = 401;
                    // }
                } else {
                    // 已经过期
                    ctx.status = 401;
                }
            } else {
                ctx.status = 401;
            }
        } catch (err) {
            console.log(err);
            if (err.message === 'jwt expired') {
                ctx.status = 401;
            } else {
                ctx.status = 500;
                ctx.body = err.message;
            }
        }
    },
}