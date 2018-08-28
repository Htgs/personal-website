'use strict';
module.exports = (sequelize, DataTypes) => {
  var articles_categories = sequelize.define('articles_categories', {
    pid: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING(30),
      validate: {
        len: {
          args: [2, 30],
          msg: '分类名称长度最多为30字符',
        },
      },
    },
  }, {
    timestamps: true,
    paranoid: true, // 软删除
    underscored: true,
  });
  articles_categories.associate = function(models) {
    // associations can be defined here
    articles_categories.hasMany(articles_categories, {foreignKey: 'pid'});
    articles_categories.belongsTo(articles_categories, {foreignKey: 'pid'});
  };
  return articles_categories;
};