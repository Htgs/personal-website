const Me = require('../../models').me;
const {storeOrUpdate} = require('../../../utils/IQuery');
const {log} = require('./alogController');

module.exports = {
    store: async (ctx, next) => {
        let request = ctx.request.fields,
            me_id = -1,
            type = 3;
        if (request.id) { // 当请求对象存在id时，为编辑
            me_id = request.id;
            type = 4;
        }
        console.log(request);
        let me = await storeOrUpdate('me', request, me_id);
        // log(ctx, 'me', type, `id为${me.id}，用户名为${me.name}的用户`);
        ctx.body = me;
    },
    show: async (ctx, next) => {
        // id参数为当前用户的id
        let query = {
            where: {
                user_id: ctx.params.id,
            },
        };
        ctx.body = await Me.find(query);
    },
}
