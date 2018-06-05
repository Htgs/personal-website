'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comments', {
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
      article_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '文章id'
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '评论内容'
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
      comment: '评论表',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comments');
  }
};