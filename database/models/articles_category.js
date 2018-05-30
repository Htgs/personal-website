'use strict';
module.exports = (sequelize, DataTypes) => {
  var articles_category = sequelize.define('articles_categories', {
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
    memo: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 200],
          msg: '备注长度最多为200字符',
        },
      },
    },
  }, {
    timestamps: true,
    paranoid: true, // 软删除
    underscored: true,
  });
  articles_category.associate = function(models) {
    // associations can be defined here
    articles_category.hasMany(articles_category, {foreignKey: 'pid'});
    articles_category.belongsTo(articles_category, {foreignKey: 'pid'});
  };
  return articles_category;
};