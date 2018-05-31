'use strict';
module.exports = (sequelize, DataTypes) => {
  var password_reset = sequelize.define('password_reset', {
    email: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [7, 50],
          msg: '邮箱长度为7至50个字符',
        },
      },
    },
    token: DataTypes.STRING(255)
  }, {
    timestamps: true,
    underscored: true,
  });
  password_reset.associate = function(models) {
    // associations can be defined here
  };
  return password_reset;
};