'use strict';
module.exports = (sequelize, DataTypes) => {
  var article = sequelize.define('article', {
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [5, 50],
          msg: '文章标题字符范围为5至50',
        },
      },
    },
    content: DataTypes.TEXT,
    is_public: DataTypes.ENUM('0', '1'),
  }, {
    timestamps: true,
    paranoid: true, // 软删除
    underscored: true,
  });
  article.associate = function(models) {
    // associations can be defined here
  };
  return article;
};