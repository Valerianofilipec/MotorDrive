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
      DriverInfoId:{
        type: Sequelize.INTEGER,
        foreingKey: true,
        allowNull: true,
        defaultValue: null,
        references: {
          model: 'DriverInfo',
          key: 'id',
          as:'DriverInfoId'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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
        timestamps: true,
        freezeTableName: true,
      }
    );
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('Car');
  }
};
