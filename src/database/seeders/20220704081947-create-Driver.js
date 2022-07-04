'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        name: "Another-One",
        email: "test_com_ndge66w5",
        home_location: "Lua",
        password: "banana",
        DriverInfo: {
          home_location:'Porto'
        },
        Car:[{
          name:'driverCar',
          brand: 'CarBrand',
          plate_number:'007-AGNT',
          Geolocation:{}
        }]
  }], {
    include:{
      DriverInfo,
      include:[Car]
    }
  });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {where:{userType:'driver'}});
  }
};
