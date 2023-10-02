'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // bulkInsert: chèn nhiều rows nhiều bảng ghi vào database 1 lúc
    await queryInterface.bulkInsert('User', [
      {
        email: 'JohnDoe@gmail.com',
        username: 'Doe123',
        password: '123456',
        address: 'abc123',
        phone: '1234098763',
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
