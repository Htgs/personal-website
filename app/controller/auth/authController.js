const User = require('../../models').user;

module.exports = {
    auth: async (ctx, next) => {
        ctx.body = 'auth';
    },
}