const path = require('path');

module.exports = {
    port: 3000, // 端口
    jwtSecret: 'jwt test',
    dbconfig: path.join(process.cwd(), 'config', 'dbConfig.js'), // 数据配置路径
    uploadsPath: path.join(process.cwd(), 'uploads'), // 文件保存路径
    gz: false, // 是否启动gz
}
