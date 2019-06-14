'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        comment: '用户id'
      }, 
      category_id: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        comment: '分类id'
      }, 
      title: { 
        type: Sequelize.STRING, 
        allowNull: false, 
        comment: '标题'
      },
      markdown_content: Sequelize.TEXT, //markdown格式
      content: Sequelize.TEXT,  //显示内容
      images: Sequelize.STRING, // 图片
      status: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0,
        comment: '0:草稿 1:发布'
      }, 
      is_delete: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0,
        comment: '0:未删除 1:已删除'
      }, 
      view_count: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0,
        comment: '访问数'
      }, 
      comment_count:  { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0,
        comment: '评价数'
      }, 
      like_count: { 
        type: Sequelize.INTEGER, 
        allowNull: false, 
        defaultValue: 0,
        comment: '喜欢数或收藏数'
      }, 
      published_at: Sequelize.DATE, // 发布时间
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
    return queryInterface.dropTable('Articles');
  }
};