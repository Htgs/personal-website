const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models');

module.exports = {
    /**
     * 检测是否唯一
     * ctx.request.body:
     * field: 字段  必须
     * value: 值    必须
     * 
     * ctx.params.model:
     * model: 当前模块 前端url请求包含
     */
    check: async (ctx, next) => {
        let request = ctx.request.fields;
        let field = request.field,
            value = request.value,
            id = request.id,
            Model;
        if (ctx.url === '/register/check') {
            // 注册时，验证用户信息是否重复
            Model = models['user'];
        } else {
            Model = models[ctx.params.model];
        }
        try {
            let where = {
                [field]: value
            };
            if (id) {
                where['id'] = {
                    [Op.ne]: id,
                }
            }
            let res = await Model.find({ where });
            if (res) {
                ctx.body = {
                    res: false,
                }
            } else {
                ctx.body = {
                    res: true,
                }
            }
        } catch (err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err.message;
        }
    },
}
