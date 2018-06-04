const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
// 文件路径
const {uploadsPath} = require('../config/config.js');

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
    // 文件上传
    uploadFile(file, avatar) {
        console.log(avatar);
        // console.log(uploadsPath);
        console.log(file);
        let fileName = `${path.basename(file.path)}.${file.type.split('/')[1]}`,
            fileData = fs.readFileSync(file.path);
        console.log(fileName);
        console.log(fileData);
        fs.appendFile(path.join(uploadsPath, fileName), fileData, function(err) {
            if (err) {
                throw err;
            }
            fs.unlinkSync(file.path);
        });
        // fs.writeFileSync(path.join(uploadsPath, `${path.basename(file.path)}.${ext}`));
        // // 如果图片存在就添加乳品
        //     data['avatar'] = path.basename(files.avatar.path)
        //     IQuery.getDataById(req.params.id, {
        //         attributes: ['avatar'],
        //     })
        //     .then(res => {
        //         if (res.avatar !== null) {
        //             fs.unlinkSync(path.join(imgUploadPath, res.avatar))
        //         }
        //     })
    },
};
