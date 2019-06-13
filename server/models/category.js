'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    icon: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    underscored: true
  });
  Category.associate = function(models) {
    // associations can be defined here
  };
  return Category;
};