'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
    content: {
      type: DataTypes.STRING(200),
      validate: {
        len: {
          args: [5, 200],
          msg: '评论长度为5至200个字符',
        },
      },
    },
  }, {
    timestamps: true,
    paranoid: true, // 软删除
    underscored: true,
  });
  comment.associate = function(models) {
    // associations can be defined here
  };
  return comment;
};