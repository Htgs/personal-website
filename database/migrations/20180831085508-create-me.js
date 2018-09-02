'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('mes', {
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
      about: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '个人介绍',
      },
      skill: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '技能以及掌握程度 json',
      },
      project: {
        allowNull: false,
        type: Sequelize.STRING,
        comment: '项目名称、项目地址 json',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, {
      comment: '关于我',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('mes');
  }
};