'use strict';
module.exports = (sequelize, DataTypes) => {
  var reply = sequelize.define('reply', {
    user_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER,
    content: {
      type: DataTypes.STRING(200),
      validate: {
        len: {
          args: [5, 200],
          msg: '评论长度为5至200个字符',
        },
      },
    },
    date: DataTypes.DATE,
  }, {
    timestamps: true,
    paranoid: true, // 软删除
    underscored: true,
  });
  reply.associate = function(models) {
    // associations can be defined here
  };
  return reply;
};