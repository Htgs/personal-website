const Alog = require('../../models').alog;
const {setQueryFilter, pagination, storeOrUpdate} = require('../../../utils/IQuery');

const models = {
    'user': '用户',
    'articles_category': '文章分类',
    'article': '文章',
    'comment': '评论',
    'reply': '回复',
    'resume': '简历',
};
const operation = {
    '登录': 1,
    '登出': 2,
    '新增': 3,
    '更新': 4,
    '删除': 5,
};

function setContent(model, type, content) {
    if (type === 1 || type === 2) {
        return `${operation[type]}成功`;
    } else {
        return `在${models[model]}模块中${operation[type]}了${content}`;
    }
}

module.exports = {
    index: async (ctx, next) => {
        let query = setQueryFilter(ctx, ['model', 'type']);
        ctx.body = await pagination('alog', ctx.request, query);
    },
    /**
     * 保存日志
     * ctx：koa上下文
     * model: 模块的英文名
     * type: 操作类型的中文名
     * content: 每个模块的文本内容
     */
    log: async (ctx, model, type, content) => {
        let user = ctx.state.user,
            ip = ctx.request.ip;
        let data = {
            user_id: user.id,
            model: model,
            type: operation[type],
            ip: ip,
            content: `${user.name}${setContent(model, type, content)}`,
        }
        console.log(ctx);
        await storeOrUpdate('alog', data);
    },
}
