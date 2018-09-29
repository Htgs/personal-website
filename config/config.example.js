const path = require('path');

module.exports = {
    port: 3000, // 端口
    jwtSecret: '123456RentH5@_1~!zbw290*-=',
    dbconfig: path.join(process.cwd(), 'config', 'dbConfig.js'), // 数据配置路径
    uploadsPath: path.join(process.cwd(), 'uploads'), // 文件保存路径
    staticPath: path.join(process.cwd(), 'static'), // 静态文件
    // logsPath: path.join(process.cwd(), 'logs'), // 日志文件
    // gz: false, // 是否启动gz
    isServer: false, // 是否为服务端，设置为true时，默认返回前端页面。自动启用gz；设置为false时，不返回前端页面。不启用gz
}
