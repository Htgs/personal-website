const User = require('../../models').user;

module.exports = {
    index: async (ctx, next) => {
        // let users = await User.findAll();
        // ctx.body = users;
        ctx.body = 'index';
        // console.log(User.findAll());
        // try {
        //     await User.findAll();
        //     ctx.body = User.findAll();
        // } catch (err) {
        //     console.log(err)
        //     ctx.status = err.statusCode || err.status || 500;
        //     ctx.body = {
        //         message: err.message
        //     };
        // }
        // User.findAll()
        //     .then(user => {
        //         console.log(user);
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
    },
    store: async (ctx, next) => {
        ctx.body = 'store';
    },
    show: async (ctx, next) => {
        ctx.body = 'show';
    },
    edit: async (ctx, next) => {
        ctx.body = 'edit';
    },
    update: async (ctx, next) => {
        ctx.body = 'update';
    },
    destory: async (ctx, next) => {
        ctx.body = 'destory';
    },
}
