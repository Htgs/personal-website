const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
// 文件路径
const {uploadsPath} = require('../config/config.js');

const utils = {
    // 通用公共方法 -----------------------------------------------
	isString: function(StringToCheck) {
		return Object.prototype.toString.call(StringToCheck) === '[object String]';
	},
	isBoolean: function(BooleanToCheck) {
		return Object.prototype.toString.call(BooleanToCheck) === '[object Boolean]';
	},
	isNumber: function(NumberToCheck) {
		return Object.prototype.toString.call(NumberToCheck) === '[object Number]';
	},
	isObject: function(objectToCheck) {
		return Object.prototype.toString.call(objectToCheck) === '[object Object]';
	},
	isArray: function(ArrayToCheck) {
		return Object.prototype.toString.call(ArrayToCheck) === '[object Array]';
	},
	isFunction: function(FunctionToCheck) {
		return Object.prototype.toString.call(FunctionToCheck) === '[object Function]';
	},
    /**
     * 加密方法
     * @param {String} password 密码
     */
    getHash(password) {
        return crypto.createHash('md5')
            .update(password)
            .digest('hex');
    },
    /**
     * 对象化实例
     * @param {Class} model sequelize实例
     */
    parseModel(model) {
        return JSON.parse(JSON.stringify(model));
    },
    /**
     * 文件上传
     * @param {file} file 新文件
     * @param {String} oldFilePath 旧文件路径
     */
    uploadFile(file, oldFilePath) {
        try {
            let fileName = `${path.basename(file.path)}.${file.type.split('/')[1]}`,
            fileData = fs.readFileSync(file.path);
            fs.appendFileSync(path.join(uploadsPath, fileName), fileData);
            fs.unlinkSync(file.path);
            if (oldFilePath) {
                fs.unlinkSync(path.join(uploadsPath, oldFilePath));
            }
            return fileName;
        } catch (err) {
            throw err;
        }
    },
    /**
     * 删除后台上传的文件
     * @param {String|Array} fileName 
     */
    deleteFile(fileName) {
        try {
            if (this.isString(fileName)) {
                fs.unlinkSync(path.join(uploadsPath, fileName));
                return true;
            } else if (this.isArray(fileName)) {
                fileName.forEach(filename => {
                    fs.unlinkSync(path.join(uploadsPath, filename));
                });
                return true;
            } else {
                return false;
            }
        } catch (err) {
            throw err;
        }
    },
    /**
     * html文本转义 xss防护
     * @param {String} html 富文本编辑器文本
     */
    htmlEncode (html){
        return String(html)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
            .replace(/ /g, "&nbsp;");
    },
};

module.exports = utils;
