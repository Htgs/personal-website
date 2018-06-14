'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      menu_id: {
        type: Sequelize.INTEGER,
        comment: '菜单id',
      },
      name: {
        type: Sequelize.STRING,
        comment: '权限名称',
      },
      display_name: {
        type: Sequelize.STRING,
        comment: '权限显示名称',
      },
      resource: {
        type: Sequelize.STRING,
        comment: '接口地址',
      },
      method: {
        type: Sequelize.STRING,
        comment: '请求方法',
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
      comment: '权限表',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('permissions');
  }
};