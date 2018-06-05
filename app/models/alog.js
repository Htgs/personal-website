'use strict';
module.exports = (sequelize, DataTypes) => {
  var alog = sequelize.define('alog', {
    user_id: DataTypes.INTEGER,
    model: DataTypes.STRING(50),
    type: DataTypes.BOOLEAN,
    content: DataTypes.STRING(255),
    ip: DataTypes.STRING(50),
  }, {
    timestamps: true,
    underscored: true,
  });
  alog.associate = function(models) {
    // associations can be defined here
  };
  return alog;
};