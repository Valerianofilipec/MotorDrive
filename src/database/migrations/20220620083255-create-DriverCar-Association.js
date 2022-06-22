'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('Cars', 'driverId', { 
      type: Sequelize.INTEGER,
      defaultValue: null,
      allowNull: true,
      references: {
        model: 'Drivers',
        key: 'id',
        as: 'driverId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    }, {
      after: 'available',
    });
/*
    await queryInterface.addColumn('Drivers', 'cars', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
      notEmpty: true,
      constraints: false,
      references: {
        model: 'Cars',
        key: 'id',
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE',
    }, {
      after: 'home_location',
    });*/
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeColumn('Cars', 'driverId', { /* query options */ });
  }
};
