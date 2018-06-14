'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pid: {
        allowNull: true,
        type: Sequelize.INTEGER,
        comment: '父级菜单id',
      },
      name: {
        type: Sequelize.STRING(50),
        comment: '菜单名 Admin-user',
      },
      display_name: {
        type: Sequelize.STRING(50),
        comment: '菜单显示名 用户管理',
      },
      resource: {
        allowNull: true,
        type: Sequelize.STRING(255),
        comment: '菜单地址',
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
      comment: '菜单表',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('menus');
  }
};