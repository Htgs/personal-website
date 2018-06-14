'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    pid: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
    user_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_website: DataTypes.STRING,
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
    comment.hasMany(comment, {foreignKey: 'pid'});
    comment.belongsTo(comment, {foreignKey: 'pid'});
    models.article.hasMany(comment, {foreignKey: 'article_id'});
    comment.belongsTo(models.article, {foreignKey: 'article_id'});
    models.user.hasMany(comment, {foreignKey: 'user_id'});
    comment.belongsTo(models.user, {foreignKey: 'user_id'});
  };
  return comment;
};