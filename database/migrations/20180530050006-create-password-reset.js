'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('password_resets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        comment: '邮箱'
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING(255),
        comment: '密令'
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
      comment: '密码重置表',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('password_resets');
  }
};