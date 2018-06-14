'use strict';
module.exports = (sequelize, DataTypes) => {
  var permission = sequelize.define('permission', {
    menu_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    resource: DataTypes.STRING,
    method: DataTypes.STRING,
  }, {
    timestamps: true,
    underscored: true,
  });
  permission.associate = function(models) {
    // associations can be defined here
  };
  return permission;
};