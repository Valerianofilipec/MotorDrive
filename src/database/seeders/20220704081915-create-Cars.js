'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.bulkInsert('Car', [
      {
        brand:'BMW',
        model:'X5',
        plate_number:'LSD-420'
      },
      {
        brand:'Toyota',
        model:'Yaris',
        plate_number:'LSD-609',
        Geolocation:{}
      }
    ], {
      include:[Geolocation]
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Car', null, {});
  }
};
