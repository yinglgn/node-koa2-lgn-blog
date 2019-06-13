'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    real_name: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    avator: DataTypes.TEXT,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
    is_admin: DataTypes.INTEGER, 
    description: DataTypes.STRING,
    email_notify_enabled: DataTypes.INTEGER, 
    github_id: DataTypes.STRING,
    github_name: DataTypes.STRING,
    github_token: DataTypes.STRING,
    github_email: DataTypes.STRING,
    weibo_id: DataTypes.STRING,
    weibo_name: DataTypes.STRING,
    weibo_token: DataTypes.STRING,
    weibo_email: DataTypes.STRING,
    qq_id: DataTypes.STRING,
    qq_name: DataTypes.STRING,
    qq_token: DataTypes.STRING,
    qq_email: DataTypes.STRING,
    wechat_id: DataTypes.STRING,
    wechat_name: DataTypes.STRING,
    wechat_token: DataTypes.STRING,
    wechat_email: DataTypes.STRING,
  }, {
    underscored: true,
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};