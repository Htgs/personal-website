const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Models = require('../app/models');
module.exports = {
    /**
     * 设置搜索条件
     * ctx: koa的ctx,
     * fields: 字段的数组 ['name']
     * query: 其他查询条件
     */
    setQueryText: function(ctx, fields, query = {}) {
        let where = {};
        if (ctx.query.query_text) {
            let or = []
            fields.forEach(field => {
                or.push({
                    [field]: {
                        [Op.like]: `%${ctx.query.query_text}%`,
                    },
                });
            });
            where = {
                [Op.or]: or,
            };
        }
        return Object.assign({}, query, {where});;
    },
    /**
     * 分页函数
     * model: 模型
     * request: ctx.request
     * query: 除了offset和limit之外的查询条件
     *        {where: {}, attributes: {}, order:[], include: []}
     */
    pagination: async function(model, request, query = {}) {
        let page = request.query.page ? request.query.page : 1,
            pageSize = request.query.pageSize ? request.query.pageSize : 10;
        let res = await Models[model].findAndCountAll({
            ...query,
            offset: (page - 1) * pageSize,
            limit: pageSize,
        });
        return {
            data: res.rows,
            total: res.count,
            page: page,
            pageSize: pageSize,
        };
    },
    /**
     * 插入或者更新数据
     * model: 模型
     * data: 前端传到后台的数据
     * id: 数据库id值
     */
    storeOrUpdate: async function(model, data, id = -1) {
        let res;
        if (id === -1) {
            res = await Models[model].build(data);
        } else {
            res = await Models[model].findById(id);
            Object.keys(data).forEach(field => {
                res[field] = data[field];
            });
        }
        return await res.save();
    },
};
