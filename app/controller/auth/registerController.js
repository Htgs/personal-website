const User = require('../../models').user;

module.exports = {
    /**
     * 注册
     * ctx.request.body:
     * name :用户名
     * password :密码
     * email : 邮箱
     * phone : 电话
     * niname : 昵称
     */
    register: async (ctx, next) => {
        let data = {};
        Object.keys(ctx.request.body).forEach(field => {
            if (field === 'password') {
                password = getHash(ctx.request.body.password);
            } else {
                where[field] = ctx.request.body[field];
            }
        });
        let fields = {fields: Object.keys(data)};
        try {
            let user = await User.create(data, fields);
            if (user) {
                user = parseModel(user);
                user['token'] = jwt.sign(user, jwtSecret, {expiresIn: '1h'});
                ctx.state.user = user;
                ctx.body = user;
            } else {
                ctx.status = 500;
                ctx.body = '账号创建失败';
            }
        } catch (err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err.message;
        }
    },
}