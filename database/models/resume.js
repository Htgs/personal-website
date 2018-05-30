'use strict';
module.exports = (sequelize, DataTypes) => {
  var resume = sequelize.define('resume', {
    user_id: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [2, 50],
          msg: '简历标题长度为2至50个字符',
        },
      },
    },
    forward_to_job: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [2, 50],
          msg: '求职意向长度为2至50个字符',
        },
      },
    },
    education: DataTypes.TEXT,
    work: DataTypes.TEXT,
    project: DataTypes.TEXT,
    introduction: DataTypes.TEXT,
  }, {
    timestamps: true,
    paranoid: true, // 软删除
    underscored: true,
  });
  resume.associate = function(models) {
    // associations can be defined here
  };
  return resume;
};