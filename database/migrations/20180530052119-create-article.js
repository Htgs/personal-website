'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '发表者id'
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        comment: '文章分类id'
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(50),
        comment: '文章标题'
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT,
        comment: '文章内容'
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: '文章发表日期'
      },
      is_public: {
        allowNull: false,
        defaultValue: true,
        type: Sequelize.BOOLEAN,
        comment: '是否公开，0为不公开，1为公开，默认为1'
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
      },
    }, {
      comment: '文章表',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('articles');
  }
};