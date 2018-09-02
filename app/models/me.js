'use strict';
module.exports = (sequelize, DataTypes) => {
  const Me = sequelize.define('me', {
    about: {
      type: DataTypes.STRING(255),
      validate: {
        len: {
          args: [5, 255],
          msg: '个人介绍长度为5~255',
        },
      },
    },
    skill: DataTypes.STRING,
    project: DataTypes.STRING,
  }, {
    timestamps: true,
    underscored: true,
  });
  Me.associate = function(models) {
    // associations can be defined here
    models.user.hasOne(Me, {foreignKey: 'user_id'});
    Me.belongsTo(models.user, {foreignKey: 'user_id'});
  };
  return Me;
};