const resource = {
    index: {
        method: 'get',
        path: '/',
    },
    store: {
        method: 'post',
        path: '/',
    },
    show: {
        method: 'get',
        path: '/:id',
    },
    edit: {
        method: 'get',
        path: '/:id/edit',
    },
    update: {
        method: 'put',
        path: '/:id',
    },
    destory: {
        method: 'delete',
        path: '/:id',
    },
};
module.exports = {
    resource: function(router, controller, filter = {}) {
        if (filter['only'] && filter['except']) {
            throw Error('只能接受only或者except数组');
        }
        let methods = Object.keys(resource);
        if (filter['only']) {
            methods = filter.only;
        } else if (filter['except']) {
            methods = methods.filter(m => !filter.except.includes(m));
        }
        methods.forEach(methodName => {
            let item = resource[methodName];
            router[item.method](item.path, controller[methodName]);
        });
    },
};
