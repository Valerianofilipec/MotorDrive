'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('cars', { 
      
     });   
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cars');
  }
};
