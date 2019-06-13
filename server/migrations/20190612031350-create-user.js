'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      real_name: { 
        type: Sequelize.STRING, 
        allowNull: true, 
        comment: '昵称'
      },
      username: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        unique: true,
        comment: '登录名'
      },
      email: { 
        type: Sequelize.STRING, 
        allowNull: true, 
        comment: '邮箱'
      },
      avator: Sequelize.TEXT,
      password: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        comment: '密码'
      },
      status: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 1, 
        comment: '是否可用'
      },
      is_admin: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0,
        comment: '是否管理员'
      }, 
      description: Sequelize.STRING, //描述
      email_notify_enabled: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0,
        comment: '是否开启邮箱提醒'
      }, 
      github_id: Sequelize.STRING,
      github_name: Sequelize.STRING,
      github_token: Sequelize.STRING,
      github_email: Sequelize.STRING,
      weibo_id: Sequelize.STRING,
      weibo_name: Sequelize.STRING,
      weibo_token: Sequelize.STRING,
      weibo_email: Sequelize.STRING,
      qq_id: Sequelize.STRING,
      qq_name: Sequelize.STRING,
      qq_token: Sequelize.STRING,
      qq_email: Sequelize.STRING,
      wechat_id: Sequelize.STRING,
      wechat_name: Sequelize.STRING,
      wechat_token: Sequelize.STRING,
      wechat_email: Sequelize.STRING,
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};