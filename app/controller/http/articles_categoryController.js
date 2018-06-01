const Articles_category = require('../../models').articles_category;

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
        let where = ctx.request.body;
        let fields = Object.keys(data);
        try {
            let res = await Articles_category.create({where, fields});
        } catch (err) {
            console.log(err);
            ctx.status = 500;
            ctx.body = err.message;
        }
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
