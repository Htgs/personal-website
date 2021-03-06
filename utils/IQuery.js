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
        let where = {},
            q = {};
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
        q = {
            ...query,
            where,
        };
        return q;
    },
    /**
     * 设置排序条件
     * ctx: koa的ctx,
     * fields: 字段的数组 ['birth_date'] 如果字段数组中存在前端发送排序的值，则可以覆盖排序
     * query: 其他查询条件
     */
    setQueryOrder: function(ctx, fields, query = {}) {
        let q = {
            ...query,
        };
        if (ctx.query._order && ctx.query._sort) {
            if (fields.includes(ctx.query._sort)) {
                let order = [[`${ctx.query._sort}`, `${ctx.query._order}`]];
                q['order'] = order;
            }
        }
        return q;
    },
    /**
     * 设置过滤条件
     * ctx: koa的ctx,
     * fields: 字段的数组 ['name']
     * query: 其他查询条件
     */
    setQueryFilter: function(ctx, fields, query = {}) {
        let where = {},
            q = {};
        fields.forEach(field => {
            if (ctx.query[field]) {
                where[field] = ctx.query[field];
            }
        });
        q = {
            ...query,
            where,
        };
        return q;
    },
    /**
     * 判断是否是后台接口，如果是后台接口增加paranoid参数
     */
    setParanoid: function(ctx, query) {
        if (ctx.path.indexOf('admin')) {
            query['paranoid'] = false;
            if (query['include']) {
                query['include'].forEach(item => {
                    item['paranoid'] = false;
                });
            }
            return query;
        } else {
            return query;
        }
        // paranoid: false,
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
            page: parseInt(page),
            pageSize: parseInt(pageSize),
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
            if (res) {
                Object.keys(data).forEach(field => {
                    res[field] = data[field];
                });
            } else {
                return false;
            }
        }
        return await res.save();
    },
    /**
     * 恢复数据
     * table: 表名
     * id: 数据库id值
     */
    commonRecovery: (table, id) => {
        const sequelize = Models.sequelize;
        return sequelize.query(`UPDATE ${table} SET deleted_at = null WHERE id = ${id}`);
    },
};
