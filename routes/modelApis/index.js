const fs        = require('fs');
const path      = require('path');
const basename  = path.basename(__filename);
const filepath = file => path.join(__dirname, file);
const apis        = {};

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        if (file !== basename) {
            apis[path.basename(filepath(file), '.js')] = require(filepath(file))
        }
    });

module.exports = apis;
