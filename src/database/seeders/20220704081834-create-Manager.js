'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('User', [{
        name: 'Valeriano',
        email:'vfc@gmail.com',
        password:'banana',
        userType: 'manager',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
     }], {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('User',{where: {email: 'vfc@gmail.com'}});
     
  }
};
