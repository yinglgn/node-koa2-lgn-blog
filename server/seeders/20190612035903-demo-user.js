'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      real_name: 'yinglgn-nan',
      username: 'yinglgn',
      email: '15989216113@163.com',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      avator: '/assets/images/user.png',
      is_admin: 1,
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
