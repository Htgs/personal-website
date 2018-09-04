'use strict';
module.exports = (sequelize, DataTypes) => {
  var article = sequelize.define('article', {
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [2, 50],
          msg: '文章标题字符范围为2至50',
        },
      },
    },
    keywords: DataTypes.STRING(50),
    content: DataTypes.TEXT,
    is_public: DataTypes.ENUM('0', '1'),
  }, {
    timestamps: true,
    paranoid: true, // 软删除
    underscored: true,
  });
  article.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(article, {foreignKey: 'user_id'});
    article.belongsTo(models.user, {foreignKey: 'user_id'});
    models.articles_categories.hasMany(article, {foreignKey: 'category_id'});
    article.belongsTo(models.articles_categories, {foreignKey: 'category_id'});
  };
  return article;
};