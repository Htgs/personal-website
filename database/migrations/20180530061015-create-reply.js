'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('replies', {
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
      comment_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '评论id'
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING(200),
        comment: '回复内容'
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '回复时间'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deteled_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
    }, {
      comment: '评论回复表',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('replies');
  }
};