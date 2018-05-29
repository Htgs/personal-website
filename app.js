const http = require('http');
const Koa = require('koa');
const app = new Koa();

// x-response-time

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(async ctx => {
    ctx.body = 'Hello World';
    ctx; // 这是 Context
    ctx.req; // 这是 node Request
    ctx.request; // 这是 koa Request
    ctx.res; // 这是 node Response
    ctx.response; // 这是 koa Response
});

app.on('error', (err, ctx) => {
    log.error('server error', err, ctx);
});

// app.listen(3000);
http.createServer(app.callback()).listen(3000);
