const {jwtSecret} = require('../../../config/config');
const User = require('../../models').user;

module.exports = {
    login: async (ctx, next) => {
        console.log(ctx.request);
        const user = ctx.request.body;
        
    },
}
