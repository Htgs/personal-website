const http = require('http');
const fs = require('fs');

// 配置引用
const config = require('./config/config.js');

// 第三方引用
const Koa = require('koa');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const koaJwt = require('koa-jwt');
const koaBody = require('koa-body');

// 本地引用
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const utilRoutes = require('./routes/util');

const app = new Koa();

if (!fs.existsSync(config.uploadsPath)) { // 判断上传文件夹是否存在，不存在则自动添加
	fs.mkdirSync(config.uploadsPath);
}

app.use(helmet());
app.use(logger());
app.use(koaBody({
    formidable: {
        uploadDir: config.uploadsPath,
        keepExtensions: true,
    },
}));

app.use(function(ctx, next){
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
        } else {
            throw err;
        }
    });
});

webRoutes(app);

app.use(koaJwt({ secret: config.jwtSecret }));

apiRoutes(app);

utilRoutes(app);

// app.listen(3000);
let port = config.port || 3000;
http.createServer(app.callback()).listen(port);
console.log(`http server start in http://localhost:${port}`);
