'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    user_id: DataTypes.INTEGER, 
    category_id: DataTypes.INTEGER, 
    title: DataTypes.STRING,
    markdown_content: DataTypes.TEXT,
    content: DataTypes.TEXT, 
    images: DataTypes.STRING, 
    status: DataTypes.INTEGER, 
    is_delete: DataTypes.INTEGER, 
    view_count: DataTypes.INTEGER, 
    comment_count:  DataTypes.INTEGER, 
    like_count: DataTypes.INTEGER, 
    published_at: DataTypes.DATE, 
  }, {
    underscored: true
  });
  Article.associate = function(models) {
    // associations can be defined here
    Article.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    Article.belongsTo(models.Category, {
      foreignKey: 'category_id'
    });
    Article.belongsToMany(models.Tag, {
      through: 'ArticleTag'
    })
  };
  return Article;
};