'use strict';
require('dotenv/config');
const { hash } = require("bcrypt");


module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('User', [{
        name: 'Valeriano',
        email:'vfc@gmail.com',
        password: await hash('banana', Number(process.env.BCRYPT_SALT)),
        userType: 'manager',
        createdAt: new Date(),
        updatedAt: new Date()
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User',{where: {email: 'vfc@gmail.com'}});
  }
};
