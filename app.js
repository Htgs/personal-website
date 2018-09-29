const http = require('http');
const fs = require('fs');

// 配置引用
const config = require('./config/config.js');

// 第三方引用
const Koa = require('koa');
const helmet = require('koa-helmet');
const logger = require('koa-logger');
const koaJwt = require('koa-jwt');
const koaBetterBody = require('koa-better-body');
const Router = require('koa-router');

// 本地引用
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const utilRoutes = require('./routes/util');

const app = new Koa();

// 判断上传文件夹是否存在，不存在则自动添加
if (!fs.existsSync(config.uploadsPath)) { 
	fs.mkdirSync(config.uploadsPath);
}
// if (!fs.existsSync(config.logsPath)) {
//     fs.mkdirSync(config.logsPath);
// }

app.use(require('koa-static')(config.staticPath));
app.use(require('koa-static')(config.uploadsPath));

app.use(helmet());
app.use(logger());
app.use(koaBetterBody());

app.use(function(ctx, next){
    return next().catch((err) => {
        console.log(err);
        if (401 == err.status) {
            ctx.status = 401;
        } else {
            throw err;
        }
    });
});

if (config.isServer) {
    const page = new Router();
    page.get('/', async (ctx, next) => {
        let index = fs.readFileSync('./static/index.html');
        ctx.set('Content-Type', 'text/html');
        ctx.body = index;
    });
    app
        .use(page.routes())
        .use(page.allowedMethods());
}

webRoutes(app);

app.use(koaJwt({ secret: config.jwtSecret }).unless({ path: [/^\/uploads/, /^\//] }));

apiRoutes(app);

utilRoutes(app);

// app.listen(3000);
let port = config.port || 3000;
http.createServer(app.callback()).listen(port);
console.log(`http server start in http://localhost:${port}`);
