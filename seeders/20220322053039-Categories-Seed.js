'use strict';
const fs = require('fs');
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
      let dataCategory = JSON.parse(fs.readFileSync("./data/categories.json"))
      dataCategory.forEach(el => {
        el.createdAt = new Date ();
        el.updatedAt = new Date ();
      });
      await queryInterface.bulkInsert("Categories", dataCategory)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
      await queryInterface.bulkDelete("Categories", null, {})
  }
};
