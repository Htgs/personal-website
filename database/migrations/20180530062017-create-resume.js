'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('resumes', {
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
      title: {
        allowNull: false,
        type: Sequelize.STRING(50),
        comment: '简历名称'
      },
      forward_to_job: {
        allowNull: true,
        type: Sequelize.STRING(50),
        comment: '求职意向'
      },
      education: {
        allowNull: true,
        type: Sequelize.TEXT,
        comment: '教育背景'
      },
      work: {
        allowNull: false,
        type: Sequelize.TEXT,
        comment: '工作经历 使用json格式字符串'
      },
      project: {
        allowNull: false,
        type: Sequelize.TEXT,
        comment: '项目经验 使用json格式字符串'
      },
      introduction: {
        allowNull: false,
        type: Sequelize.TEXT,
        comment: '自我评价'
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
      comment: '简历表',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('resumes');
  }
};