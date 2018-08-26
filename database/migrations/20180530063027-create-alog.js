'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('alogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '用户id'
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING(50),
        comment: '模块，基于后台的模块'
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING(50),
        comment: '操作类型 1为登录，2为登出，3为新增，4为更新，5为删除'
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(255),
        comment: '内容'
      },
      ip: {
        allowNull: false,
        type: Sequelize.STRING(50),
        comment: 'ip地址'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
    }, {
      comment: '日志表',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('alogs');
  }
};