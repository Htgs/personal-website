const crypto = require('crypto');
module.exports = {
    // 加密方法
    getHash(password) {
        return crypto.createHash('md5')
            .update(password)
            .digest('hex');
    },
    // 对象化模型
    parseModel(model) {
        return JSON.parse(JSON.stringify(model));
    },
};
