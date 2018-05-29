'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [2, 50],
          msg: '用户名长度为2至50个字符',
        },
      },
    },
    email: {
      type: DataTypes.STRING(50),
      validate: {
        isEmail: {
          msg: '电子邮箱格式不正确',
        },
        len: {
          args: [7, 50],
          msg: '电子邮箱长度最多为50个字符',
        },
      },
    },
    password: {
      type: DataTypes.STRING(255),
    },
    niname: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [2, 50],
          msg: '昵称长度为2至50个字符',
        },
      },
    },
    avatar: {
      type: DataTypes.STRING(255),
    },
    realname: {
      type: DataTypes.STRING(30),
      validate: {
        len: {
          args: [2, 30],
          msg: '真实姓名长度为2至30个字符',
        },
      },
    },
    gender: DataTypes.BOOLEAN,
    birth_date: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: {
          msg: '出生日期格式不正确',
        },
      },
    },
    phone: {
      type: DataTypes.STRING(50),
      validate: {
        isEven(phone) {
          if ((phone.length === 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(phone)) || (phone.length === 12 && /^(([0+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/.test(phone))) {
            throw new Error('电话号码格式不正确');
          }
        },
      },
    },
    memo: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [0, 200],
          msg: '备注长度最多为200字符',
        },
      },
    }
  }, {
    timestamps: true,
    paranoid: true, // 软删除
    underscored: true,
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};