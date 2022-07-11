'use strict';

const { hash } = require("bcrypt");

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('User', [{
        name: 'Valeriano',
        email:'vfc@gmail.com',
        password: await hash('banana', 10),
        userType: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User',{where: {email: 'vfc@gmail.com'}});
  }
};
