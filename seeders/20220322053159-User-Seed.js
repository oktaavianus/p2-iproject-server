'use strict';
const { hashPassword } = require('../helper/bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', 
    [
      {
      email: 'User1@develop.com',
      password: hashPassword("12345"),
      name: "user1",
      address: "addres user 1",
      phoneNumber: "08112233",
      role: "User",
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      email: 'Admin@develop.com',
      password: hashPassword("12345"),
      name: "admin",
      address: "addres admin 1",
      phoneNumber: "112233",
      role: "Admin",
      createdAt: new Date(),
      updatedAt: new Date()
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete('People', null, {})
  }
};
