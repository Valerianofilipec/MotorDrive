'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Car', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      brand: {
          type: Sequelize.STRING,
          notEmpty: true,
          allowNull: false
      },
      model: {
          type: Sequelize.STRING,
          notEmpty: true,
          allowNull: false
      },
      plate_number: {
          type: Sequelize.STRING,
          allowNull: false,
          notEmpty: true,
          unique: true,
      },
      geolocation: {
          type: Sequelize.GEOMETRY('POINT'),
          allowNull: false,
          notEmpty: true,
      },
      driverId:{
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: true,
        references: {
          model: 'DriverInfo',
          key: 'userId',
          as: 'driverId',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt:{
          type: Sequelize.DATE,
          allowNull: false
      },
      updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
      }
      },
      {
        timestamps: true
      }
    );
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('Car');
  }
};
