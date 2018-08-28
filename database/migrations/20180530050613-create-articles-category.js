'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('articles_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pid: {
        allowNull: true,
        type: Sequelize.INTEGER,
        comment: '父级分类id'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(30),
        comment: '分类名称',
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
        allowNull: true,
        type: Sequelize.DATE
      }
    }, {
      comment: '文章分类表',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('articles_categories');
  }
};