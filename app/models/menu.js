'use strict';
module.exports = (sequelize, DataTypes) => {
  var menu = sequelize.define('menu', {
    pid: DataTypes.INTEGER,
    name: DataTypes.STRING,
    display_name: DataTypes.STRING,
    resource: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true,
  });
  menu.associate = function(models) {
    // associations can be defined here
    menu.hasMany(menu, {foreignKey: 'pid'});
    menu.belongsTo(menu, {foreignKey: 'pid'});
  };
  return menu;
};