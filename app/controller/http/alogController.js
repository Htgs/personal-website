const Alog = require('../../models').alog;
const {setQueryText, setQueryFilter, pagination, storeOrUpdate} = require('../../../utils/IQuery');

module.exports = {
    log: async (ctx, next) => {
        ctx.body = 'log';
        // let query = setQueryText(ctx, ['title', 'content']);
        // query = setQueryFilter(ctx, ['category_id', 'is_public'], query);
        // ctx.body = await pagination('article', ctx.request, query);
    },
}
