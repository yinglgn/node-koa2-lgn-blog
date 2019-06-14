'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    underscored: true,
  });
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsToMany(models.Article, {
      through: 'ArticleTag'
    })
  };
  return Tag;
};