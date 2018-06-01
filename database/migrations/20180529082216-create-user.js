'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(50),
        comment: '用户名'
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        comment: '邮箱'
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255),
        comment: '密码'
      },
      niname: {
        allowNull: false,
        type: Sequelize.STRING(50),
        comment: '昵称'
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING(255),
        comment: '头像'
      },
      realname: {
        allowNull: true,
        type: Sequelize.STRING(30),
        comment: '真实姓名'
      },
      gender: {
        allowNull: false,
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        comment: '性别，0为无，1为男性，2为女性，默认为0'
      },
      birth_date: {
        allowNull: true,
        type: Sequelize.DATEONLY,
        comment: '出生日期'
      },
      phone: {
        allowNull: true,
        type: Sequelize.STRING(50),
        comment: '手机号码'
      },
      memo: {
        allowNull: true,
        type: Sequelize.TEXT,
        comment: '备注',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    }, {
      comment: '用户表',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};